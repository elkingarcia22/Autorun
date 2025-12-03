import type { ButtonFeedbackOptions } from './types/ButtonFeedbackOptions';
import './styles/button-feedback.css';

/**
 * ButtonFeedback Provider
 * Botón flotante para obtener feedback de clientes con modal de formulario
 * Adaptado para usar componentes locales del proyecto Autorun
 */

/**
 * Helper para renderizar iconos
 */
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
	const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
	const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
	return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Helper para mostrar notificaciones (toast/alert)
 */
function showNotification(type: 'success' | 'error' | 'warning' | 'info', message: string): void {
	if (typeof window === 'undefined') return;

	// Intentar usar showAlert o showToast si están disponibles
	const showAlert = (window as any).showAlert || (window as any).AUTORUN?.Alert?.show;
	const showToast = (window as any).showToast || (window as any).AUTORUN?.Toast?.show;

	if (showAlert) {
		showAlert(type, message, { duration: 4000, closable: true });
		return;
	}

	if (showToast) {
		showToast(type, message, { duration: 4000 });
		return;
	}

	// Fallback: crear notificación básica
	const notification = document.createElement('div');
	notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    z-index: 10001;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
  `;
	notification.textContent = message;
	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = 'slideOut 0.3s ease-out';
		setTimeout(() => {
			if (notification.parentNode) {
				notification.parentNode.removeChild(notification);
			}
		}, 300);
	}, 4000);
}

/**
 * Crea un modal básico si no hay componente Modal disponible
 */
function createBasicModal(options: {
	title: string;
	bodyContent: string;
	footerButtons?: {
		primary?: { label: string; onClick: () => void };
		tertiary?: { label: string; onClick: () => void };
	};
	onClose?: () => void;
}): { element: HTMLElement; close: () => void } {
	const overlay = document.createElement('div');
	overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

	const modal = document.createElement('div');
	modal.style.cssText = `
    background: white;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  `;

	const header = document.createElement('div');
	header.style.cssText = `
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
	header.innerHTML = `
    <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600;">${options.title}</h2>
    <button style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280;">&times;</button>
  `;

	const body = document.createElement('div');
	body.style.cssText = `padding: 20px;`;
	body.innerHTML = options.bodyContent;

	const footer = document.createElement('div');
	footer.style.cssText = `
    padding: 20px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  `;

	if (options.footerButtons?.tertiary) {
		const cancelBtn = document.createElement('button');
		cancelBtn.textContent = options.footerButtons.tertiary.label;
		cancelBtn.style.cssText = `
      padding: 8px 16px;
      border: 1px solid #d1d5db;
      background: white;
      border-radius: 6px;
      cursor: pointer;
    `;
		cancelBtn.onclick = options.footerButtons.tertiary.onClick;
		footer.appendChild(cancelBtn);
	}

	if (options.footerButtons?.primary) {
		const submitBtn = document.createElement('button');
		submitBtn.textContent = options.footerButtons.primary.label;
		submitBtn.style.cssText = `
      padding: 8px 16px;
      border: none;
      background: #3b82f6;
      color: white;
      border-radius: 6px;
      cursor: pointer;
    `;
		submitBtn.onclick = options.footerButtons.primary.onClick;
		footer.appendChild(submitBtn);
	}

	const closeBtn = header.querySelector('button');
	const close = () => {
		if (overlay.parentNode) {
			overlay.parentNode.removeChild(overlay);
		}
		if (options.onClose) {
			options.onClose();
		}
	};

	if (closeBtn) {
		closeBtn.onclick = close;
	}

	overlay.onclick = (e) => {
		if (e.target === overlay) {
			close();
		}
	};

	modal.appendChild(header);
	modal.appendChild(body);
	modal.appendChild(footer);
	overlay.appendChild(modal);
	document.body.appendChild(overlay);

	return { element: overlay, close };
}

/**
 * Crea un input básico (select o textarea)
 */
function createBasicInput(options: {
	containerId: string;
	label: string;
	type: 'select' | 'textarea';
	value?: string;
	placeholder?: string;
	selectOptions?: Array<{ value: string; text: string }>;
	onChange?: (value: string) => void;
}): void {
	const container = document.getElementById(options.containerId);
	if (!container) return;

	const labelEl = document.createElement('label');
	labelEl.textContent = options.label;
	labelEl.style.cssText = `
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #374151;
  `;

	let input: HTMLSelectElement | HTMLTextAreaElement;

	if (options.type === 'select') {
		input = document.createElement('select');
		input.style.cssText = `
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
    `;
		if (options.selectOptions) {
			options.selectOptions.forEach((opt) => {
				const option = document.createElement('option');
				option.value = opt.value;
				option.textContent = opt.text;
				input.appendChild(option);
			});
		}
		if (options.value) {
			input.value = options.value;
		}
		if (options.onChange) {
			input.onchange = () => {
				if (options.onChange) {
					options.onChange(input.value);
				}
			};
		}
	} else {
		input = document.createElement('textarea');
		input.style.cssText = `
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      resize: vertical;
      min-height: 120px;
      font-family: inherit;
    `;
		if (options.placeholder) {
			input.placeholder = options.placeholder;
		}
		if (options.value) {
			input.value = options.value;
		}
		if (options.onChange) {
			input.oninput = () => {
				if (options.onChange) {
					options.onChange(input.value);
				}
			};
		}
	}

	container.appendChild(labelEl);
	container.appendChild(input);
}

/**
 * Crea y renderiza un ButtonFeedback en el DOM
 */
export function createButtonFeedback(options: ButtonFeedbackOptions): {
	element: HTMLElement;
	show: () => void;
	hide: () => void;
	open: () => void;
	close: () => void;
	destroy: () => void;
} {
	const {
		containerId,
		text = '',
		icon = 'comment-dots',
		position = 'bottom-right',
		offset = 24,
		modalTitle = 'Deja tu Feedback',
		sectionOptions = [
			{ value: 'home', text: 'Home' },
			{ value: 'encuestas', text: 'Encuestas' },
		],
		defaultSection = '',
		commentPlaceholder = '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?',
		n8nWebhookUrl,
		onFeedbackSent,
		onCancel,
		onClose,
		visible = true,
		className = '',
	} = options;

	// Crear contenedor si no existe
	let container: HTMLElement;
	if (containerId) {
		container = document.getElementById(containerId) || document.body;
	} else {
		container = document.body;
	}

	// Estado del formulario
	let sectionValue = defaultSection || (sectionOptions.length > 0 ? sectionOptions[0].value : '');
	let commentValue = '';
	let modalInstance: ReturnType<typeof createBasicModal> | null = null;
	let formContainerId = '';

	// Crear contenido del modal
	const createModalContent = (): string => {
		formContainerId = `autorun-button-feedback-form-${Math.random().toString(36).substr(2, 9)}`;

		// Intentar usar Button de AUTORUN si está disponible
		const createButton = (window as any).createButton || (window as any).AUTORUN?.Button?.create;
		let closeButtonHTML = '';

		if (createButton) {
			try {
				const closeBtn = createButton({
					variant: 'secondary',
					size: 'sm',
					icon: 'times',
					iconStyle: 'regular',
					iconOnly: true,
				});
				closeButtonHTML = closeBtn.outerHTML;
			} catch (e) {
				closeButtonHTML = `<button style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>`;
			}
		} else {
			closeButtonHTML = `<button style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>`;
		}

		const headerHTML = `
      <div class="autorun-button-feedback-modal__header">
        <div class="autorun-button-feedback-modal__header-content">
          <div class="autorun-button-feedback-modal__header-icon">
            ${renderIconHelper('comment-dots', 'regular')}
          </div>
          <h2 class="autorun-heading-h2 autorun-button-feedback-modal__header-title">${modalTitle}</h2>
        </div>
        ${closeButtonHTML}
      </div>
    `;

		const formHTML = `
      <div class="autorun-button-feedback-form" id="${formContainerId}">
        <div class="autorun-button-feedback-form__field">
          <div id="${formContainerId}-section"></div>
        </div>
        <div class="autorun-button-feedback-form__field">
          <div id="${formContainerId}-comment"></div>
        </div>
      </div>
    `;

		return headerHTML + formHTML;
	};

	// Función para abrir/cerrar el modal
	const toggleModal = () => {
		if (modalInstance) {
			closeModal();
			return;
		}

		// Intentar usar Modal de AUTORUN si está disponible
		const createModal = (window as any).createModal || (window as any).AUTORUN?.Modal?.create;

		if (createModal) {
			// Usar componente Modal de AUTORUN
			modalInstance = createModal({
				title: '',
				bodyContent: createModalContent(),
				size: 'md',
				open: true,
				containerId: containerId,
				closeOnOverlayClick: false,
				className: 'autorun-button-feedback-modal',
				footerButtons: {
					tertiary: {
						label: 'Cancelar',
						onClick: () => {
							if (onCancel) {
								onCancel();
							}
							closeModal();
						},
					},
					primary: {
						label: 'Enviar Feedback',
						onClick: async () => {
							const sectionContainer = document.getElementById(`${formContainerId}-section`);
							const commentContainer = document.getElementById(`${formContainerId}-comment`);

							if (sectionContainer) {
								const sectionElement = sectionContainer.querySelector(
									'select',
								) as HTMLSelectElement;
								if (sectionElement) {
									sectionValue = sectionElement.value;
								}
							}

							if (commentContainer) {
								const commentElement = commentContainer.querySelector(
									'textarea',
								) as HTMLTextAreaElement;
								if (commentElement) {
									commentValue = commentElement.value;
								}
							}

							if (!commentValue.trim()) {
								showNotification('warning', 'Por favor, ingresa un comentario');
								return;
							}

							if (n8nWebhookUrl) {
								try {
									const response = await fetch(n8nWebhookUrl, {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											section: sectionValue,
											comment: commentValue,
											timestamp: new Date().toISOString(),
											url: window.location.href,
										}),
									});

									if (!response.ok) {
										throw new Error('Error al enviar feedback');
									}

									if (onFeedbackSent) {
										onFeedbackSent({
											section: sectionValue,
											comment: commentValue,
										});
									}

									closeModal();
									showNotification('success', '¡Gracias por tu feedback!');
								} catch (error) {
									console.error('Error enviando feedback:', error);
									showNotification(
										'error',
										'Error al enviar el feedback. Por favor, intenta de nuevo.',
									);
								}
							} else {
								if (onFeedbackSent) {
									onFeedbackSent({
										section: sectionValue,
										comment: commentValue,
									});
								}
								closeModal();
							}
						},
					},
				},
				onClose: () => {
					button.classList.remove('autorun-button--active');
					if (onClose) {
						onClose();
					}
					modalInstance = null;
				},
			}) as any;
		} else {
			// Usar modal básico
			modalInstance = createBasicModal({
				title: modalTitle,
				bodyContent: createModalContent(),
				footerButtons: {
					tertiary: {
						label: 'Cancelar',
						onClick: () => {
							if (onCancel) {
								onCancel();
							}
							closeModal();
						},
					},
					primary: {
						label: 'Enviar Feedback',
						onClick: async () => {
							const sectionContainer = document.getElementById(`${formContainerId}-section`);
							const commentContainer = document.getElementById(`${formContainerId}-comment`);

							if (sectionContainer) {
								const sectionElement = sectionContainer.querySelector(
									'select',
								) as HTMLSelectElement;
								if (sectionElement) {
									sectionValue = sectionElement.value;
								}
							}

							if (commentContainer) {
								const commentElement = commentContainer.querySelector(
									'textarea',
								) as HTMLTextAreaElement;
								if (commentElement) {
									commentValue = commentElement.value;
								}
							}

							if (!commentValue.trim()) {
								showNotification('warning', 'Por favor, ingresa un comentario');
								return;
							}

							if (n8nWebhookUrl) {
								try {
									const response = await fetch(n8nWebhookUrl, {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											section: sectionValue,
											comment: commentValue,
											timestamp: new Date().toISOString(),
											url: window.location.href,
										}),
									});

									if (!response.ok) {
										throw new Error('Error al enviar feedback');
									}

									if (onFeedbackSent) {
										onFeedbackSent({
											section: sectionValue,
											comment: commentValue,
										});
									}

									closeModal();
									showNotification('success', '¡Gracias por tu feedback!');
								} catch (error) {
									console.error('Error enviando feedback:', error);
									showNotification(
										'error',
										'Error al enviar el feedback. Por favor, intenta de nuevo.',
									);
								}
							} else {
								if (onFeedbackSent) {
									onFeedbackSent({
										section: sectionValue,
										comment: commentValue,
									});
								}
								closeModal();
							}
						},
					},
				},
				onClose: () => {
					button.classList.remove('autorun-button--active');
					if (onClose) {
						onClose();
					}
					modalInstance = null;
				},
			});
		}

		// Inicializar inputs después de que el modal se renderice
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const sectionContainer = document.getElementById(`${formContainerId}-section`);
				const commentContainer = document.getElementById(`${formContainerId}-comment`);

				// Intentar usar Input de AUTORUN si está disponible
				const createInput = (window as any).createInput || (window as any).AUTORUN?.Input?.create;

				if (sectionContainer) {
					if (createInput) {
						try {
							createInput({
								containerId: `${formContainerId}-section`,
								label: 'Sección actual:',
								type: 'select',
								size: 'md',
								value: sectionValue,
								selectOptions: sectionOptions.map((opt) => ({ value: opt.value, text: opt.text })),
								showLabel: true,
								onChange: (value: string) => {
									sectionValue = value;
								},
							});
						} catch (error) {
							console.error('Error creando select de sección:', error);
							createBasicInput({
								containerId: `${formContainerId}-section`,
								label: 'Sección actual:',
								type: 'select',
								value: sectionValue,
								selectOptions: sectionOptions,
								onChange: (value) => {
									sectionValue = value;
								},
							});
						}
					} else {
						createBasicInput({
							containerId: `${formContainerId}-section`,
							label: 'Sección actual:',
							type: 'select',
							value: sectionValue,
							selectOptions: sectionOptions,
							onChange: (value) => {
								sectionValue = value;
							},
						});
					}
				}

				if (commentContainer) {
					if (createInput) {
						try {
							createInput({
								containerId: `${formContainerId}-comment`,
								label: 'Tu comentario:',
								type: 'textarea',
								size: 'md',
								value: commentValue,
								placeholder: commentPlaceholder,
								showLabel: true,
								onChange: (value: string) => {
									commentValue = value;
								},
							});
						} catch (error) {
							console.error('Error creando textarea de comentario:', error);
							createBasicInput({
								containerId: `${formContainerId}-comment`,
								label: 'Tu comentario:',
								type: 'textarea',
								value: commentValue,
								placeholder: commentPlaceholder,
								onChange: (value) => {
									commentValue = value;
								},
							});
						}
					} else {
						createBasicInput({
							containerId: `${formContainerId}-comment`,
							label: 'Tu comentario:',
							type: 'textarea',
							value: commentValue,
							placeholder: commentPlaceholder,
							onChange: (value) => {
								commentValue = value;
							},
						});
					}
				}
			});
		});
	};

	// Función para cerrar el modal
	const closeModal = () => {
		if (modalInstance) {
			const instance = modalInstance;
			modalInstance = null;
			instance.close();
			button.classList.remove('autorun-button--active');
		}
	};

	// Crear botón flotante usando componente Button de AUTORUN si está disponible
	const createButton = (window as any).createButton || (window as any).AUTORUN?.Button?.create;
	let button: HTMLElement;

	if (createButton) {
		try {
			button = createButton({
				variant: 'primary',
				size: 'md',
				text: text,
				icon: icon,
				iconStyle: 'regular',
				floating: true,
				iconOnly: !text && !!icon,
				className: `autorun-button-feedback--${position} ${className}`.trim(),
				attributes: {
					'aria-label': 'Deja tu feedback',
				},
				onClick: () => {
					toggleModal();
				},
			});
		} catch (error) {
			console.error('Error creando botón con AUTORUN Button:', error);
			// Fallback a botón básico
			button = document.createElement('button');
			button.textContent = text || icon;
			button.className = `autorun-button-feedback--${position} ${className}`.trim();
			button.setAttribute('aria-label', 'Deja tu feedback');
			button.onclick = () => toggleModal();
		}
	} else {
		// Fallback a botón básico
		button = document.createElement('button');
		button.textContent = text || icon;
		button.className = `autorun-button-feedback--${position} ${className}`.trim();
		button.setAttribute('aria-label', 'Deja tu feedback');
		button.onclick = () => toggleModal();
	}

	// Aplicar posicionamiento fijo y offset personalizado
	button.style.position = 'fixed';
	button.style.zIndex = '9998';

	if (position === 'bottom-right') {
		button.style.bottom = `${offset}px`;
		button.style.right = `${offset}px`;
	} else if (position === 'bottom-left') {
		button.style.bottom = `${offset}px`;
		button.style.left = `${offset}px`;
	} else if (position === 'top-right') {
		button.style.top = `${offset}px`;
		button.style.right = `${offset}px`;
	} else if (position === 'top-left') {
		button.style.top = `${offset}px`;
		button.style.left = `${offset}px`;
	}

	// Funciones de control
	const show = () => {
		button.classList.remove('autorun-button-feedback--hidden');
	};

	const hide = () => {
		button.classList.add('autorun-button-feedback--hidden');
	};

	const open = () => {
		toggleModal();
	};

	const destroy = () => {
		closeModal();
		if (button.parentElement) {
			button.parentElement.removeChild(button);
		}
	};

	// Agregar al DOM
	container.appendChild(button);

	// Configurar visibilidad inicial
	if (!visible) {
		hide();
	}

	return {
		element: button,
		show,
		hide,
		open,
		close: closeModal,
		destroy,
	};
}
