/**
 * Toast Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderToast, createToast, showToast } from '../../../../components/toast/src/ToastProvider';
import type { ToastOptions } from '../../../../components/toast/src/types/ToastOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/toast/src/styles/toast.css';
import '../../../../components/button/src/styles/button.css';

const meta: Meta<ToastOptions> = {
	title: 'Feedback/Toast',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Toast UBITS para mostrar notificaciones flotantes. Se posiciona en la parte superior central, tiene auto-cierre, pausa en hover, apilado máximo de 3, y soporta título, cuerpo y botón de acción opcional.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-toast',
			api: {
				create: 'window.UBITS.Toast.create',
				show: 'window.UBITS.Toast.show',
				tag: '<ubits-toast>',
			},
			dependsOn: {
				required: [], // Toast no depende de otros componentes
				optional: ['🧩-ux-button'], // Botón de acción es opcional
			},
			internals: [], // Toast no tiene componentes internos privados
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-feedback-bg-success-subtle-default',
				'--modifiers-normal-color-light-feedback-bg-info-subtle-default',
				'--modifiers-normal-color-light-feedback-bg-warning-subtle-default',
				'--modifiers-normal-color-light-feedback-bg-error-subtle-default',
				'--modifiers-normal-color-light-fg-1-high',
				'--p-spacing-mode-1-lg',
				'--p-spacing-mode-1-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['message'],
			},
		}),
	},
	args: {
		type: 'success',
		title: 'Operación completada',
		message: 'Los cambios se han guardado correctamente.',
		duration: 3500,
		noClose: false,
		pauseOnHover: true,
	},
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['success', 'info', 'warning', 'error'],
			description: 'Tipo de toast',
			table: {
				type: { summary: 'success | info | warning | error' },
				defaultValue: { summary: 'info' },
				category: 'Apariencia',
			},
		},
		title: {
			control: { type: 'text' },
			description: 'Título del toast (opcional, se muestra arriba alineado con el botón X)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		message: {
			control: { type: 'text' },
			description: 'Mensaje del toast (cuerpo, requerido)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		duration: {
			control: { type: 'number' },
			description:
				'Duración en milisegundos antes de auto-cerrar (0 = persistente). Por defecto: success/info (3500ms), warning (5000ms), error (6500ms)',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '3500 (success/info), 5000 (warning), 6500 (error)' },
				category: 'Comportamiento',
			},
		},
		noClose: {
			control: { type: 'boolean' },
			description: 'Si el toast NO tiene botón de cerrar',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Comportamiento',
			},
		},
		pauseOnHover: {
			control: { type: 'boolean' },
			description: 'Si el timer se pausa cuando el usuario hace hover o focus',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Comportamiento',
			},
		},
		action: {
			control: { type: 'object' },
			description: 'Botón de acción opcional dentro del toast',
			table: {
				type: {
					summary: `{
  label: string;
  onClick: () => void;
}`,
				},
				category: 'Acciones',
			},
		},
		onClose: {
			action: 'closed',
			description: 'Callback llamado cuando el toast se cierra',
			table: {
				disable: true,
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
			table: {
				type: { summary: 'string' },
				category: 'Avanzado',
			},
		},
	},
};

export default meta;
type Story = StoryObj<ToastOptions>;

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		type: 'success',
		title: 'Operación completada',
		message: 'Los cambios se han guardado correctamente.',
		duration: 3500,
		noClose: false,
		pauseOnHover: true,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// Opción 1: Usar showToast (recomendado - maneja contenedor automáticamente)
window.UBITS.Toast.show('success', 'Los cambios se han guardado correctamente.', {
  title: 'Operación completada',
  duration: 3500,
  noClose: false,
  pauseOnHover: true
});

// Opción 2: Usar createToast (control manual del contenedor)
const toastElement = window.UBITS.Toast.create({
  type: 'success',
  title: 'Operación completada',
  message: 'Los cambios se han guardado correctamente.',
  duration: 3500,
  noClose: false,
  pauseOnHover: true
});
const container = document.getElementById('ubits-toast-container') || document.body;
container.appendChild(toastElement);`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-toast');
		container.setAttribute('data-ubits-component', 'Toast');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '800px';
		container.style.minHeight = '200px';

		// Asegurar que el contenedor de toasts existe
		const toastContainerId = args.containerId || 'ubits-toast-container';
		let toastContainer = document.getElementById(toastContainerId);
		if (!toastContainer) {
			toastContainer = document.createElement('div');
			toastContainer.id = toastContainerId;
			toastContainer.style.cssText = `
        position: fixed;
        top: var(--p-spacing-mode-1-lg, 16px);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--p-spacing-mode-1-md, 12px);
        width: 100%;
        max-width: 560px;
        min-width: 320px;
        padding: 0 var(--p-spacing-mode-1-lg, 16px);
        box-sizing: border-box;
        z-index: 10000;
        pointer-events: none;
      `;
			document.body.appendChild(toastContainer);
		}

		// Crear botón para mostrar toast
		const button = document.createElement('button');
		button.textContent = 'Mostrar Toast';
		button.className = 'ubits-button ubits-button--primary ubits-button--md';
		button.style.marginBottom = '20px';
		button.addEventListener('click', () => {
			showToast(args.type || 'success', args.message, {
				title: args.title,
				duration: args.duration,
				noClose: args.noClose,
				pauseOnHover: args.pauseOnHover,
				action: args.action,
				onClose: args.onClose,
			});
		});
		container.appendChild(button);

		// Información
		const info = document.createElement('div');
		info.style.padding = '16px';
		info.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		info.style.borderRadius = '8px';
		info.style.fontSize = '14px';
		info.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
		info.innerHTML = `
      <strong>Tipo:</strong> ${args.type}<br>
      <strong>Título:</strong> ${args.title || '(sin título)'}<br>
      <strong>Mensaje:</strong> ${args.message}<br>
      <strong>Duración:</strong> ${args.duration || 'auto'}ms<br>
      <strong>Cierre:</strong> ${args.noClose ? 'Sin botón' : 'Con botón'}
    `;
		container.appendChild(info);

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		type: 'success',
		title: 'Operación completada',
		message:
			'Los cambios se han guardado correctamente. Este ejemplo de texto es más largo para demostrar cómo funciona el espaciado y el botón de acción debajo del texto.',
		duration: 3500,
		noClose: false,
		pauseOnHover: true,
	},
	render: (args) => {
		// Asegurar que el contenedor existe
		const toastContainerId = args.containerId || 'ubits-toast-container';
		let toastContainer = document.getElementById(toastContainerId);
		if (!toastContainer) {
			toastContainer = document.createElement('div');
			toastContainer.id = toastContainerId;
			toastContainer.style.cssText = `
        position: fixed;
        top: var(--p-spacing-mode-1-lg, 16px);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--p-spacing-mode-1-md, 12px);
        width: 100%;
        max-width: 560px;
        min-width: 320px;
        padding: 0 var(--p-spacing-mode-1-lg, 16px);
        box-sizing: border-box;
        z-index: 10000;
        pointer-events: none;
      `;
			document.body.appendChild(toastContainer);
		}

		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.borderRadius = '8px';
		container.style.width = '100%';
		container.style.maxWidth = '800px';

		// Botones para mostrar toast
		const buttonContainer = document.createElement('div');
		buttonContainer.style.display = 'flex';
		buttonContainer.style.gap = '12px';
		buttonContainer.style.marginBottom = '20px';

		const showButton = document.createElement('button');
		showButton.textContent = 'Mostrar Toast';
		showButton.className = 'ubits-button ubits-button--primary ubits-button--md';
		showButton.addEventListener('click', () => {
			showToast(args.type || 'success', args.message, {
				title: args.title,
				duration: args.duration,
				noClose: args.noClose,
				pauseOnHover: args.pauseOnHover,
				action: args.action,
				onClose: args.onClose,
			});
		});

		const clearButton = document.createElement('button');
		clearButton.textContent = 'Limpiar Toasts';
		clearButton.className = 'ubits-button ubits-button--secondary ubits-button--md';
		clearButton.addEventListener('click', () => {
			const toasts = toastContainer.querySelectorAll('.ubits-toast');
			toasts.forEach((toast) => {
				const element = toast as HTMLElement;
				element.classList.add('ubits-toast--exit');
				setTimeout(() => {
					if (element.parentNode) {
						element.parentNode.removeChild(element);
					}
				}, 180);
			});
		});

		buttonContainer.appendChild(showButton);
		buttonContainer.appendChild(clearButton);
		container.appendChild(buttonContainer);

		return container;
	},
};
