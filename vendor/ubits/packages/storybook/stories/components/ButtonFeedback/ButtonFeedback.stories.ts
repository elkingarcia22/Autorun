import type { Meta, StoryObj } from '@storybook/html';
import { createButtonFeedback } from '../../../../components/button-feedback/src/ButtonFeedbackProvider';
import type { ButtonFeedbackOptions } from '../../../../components/button-feedback/src/types/ButtonFeedbackOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/button-feedback/src/styles/button-feedback.css';
import '../../../../components/button/src/styles/button.css';
import '../../../../components/modal/src/styles/modal.css';
import '../../../../components/input/src/styles/input.css';

const meta: Meta<ButtonFeedbackOptions> = {
	title: 'Feedback/Button Feedback',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Botón flotante para obtener feedback de clientes. Al hacer clic, abre un modal con un formulario que permite seleccionar la sección actual y dejar un comentario. El feedback se puede enviar a un webhook de n8n.',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-button-feedback',
			api: {
				create: 'createButtonFeedback', // Función importada directamente
			},
			dependsOn: {
				required: [
					'🧩-ux-button', // Botón flotante
					'🧩-ux-modal', // Modal con formulario
					'🧩-ux-input', // Input para select de sección y textarea de comentarios
				],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-active',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-accent-brand',
				'--ubits-spacing-sm',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
				'--ubits-body-md-font-size',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [],
			},
		}),
	},
	argTypes: {
		text: {
			control: { type: 'text' },
			description: 'Texto del botón flotante (opcional)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' },
				category: 'Contenido',
			},
		},
		icon: {
			control: { type: 'text' },
			description: 'Icono del botón flotante',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'comment-dots' },
				category: 'Contenido',
			},
		},
		position: {
			control: { type: 'select' },
			options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
			description: 'Posición del botón flotante',
			table: {
				type: { summary: 'bottom-right | bottom-left | top-right | top-left' },
				defaultValue: { summary: 'bottom-right' },
				category: 'Apariencia',
			},
		},
		offset: {
			control: { type: 'number' },
			description: 'Offset desde el borde (en píxeles)',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '24' },
				category: 'Apariencia',
			},
		},
		modalTitle: {
			control: { type: 'text' },
			description: 'Título del modal de feedback',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Deja tu Feedback' },
				category: 'Contenido',
			},
		},
		sectionOptions: {
			control: { type: 'object' },
			description: 'Opciones para el select de sección',
			table: {
				type: { summary: 'Array<{value: string, text: string}>' },
				category: 'Contenido',
			},
		},
		defaultSection: {
			control: { type: 'text' },
			description: 'Valor por defecto del select de sección',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		commentPlaceholder: {
			control: { type: 'text' },
			description: 'Placeholder del textarea de comentarios',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		n8nWebhookUrl: {
			control: { type: 'text' },
			description: 'URL del endpoint de n8n para enviar el feedback',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		visible: {
			control: { type: 'boolean' },
			description: 'Si el botón está visible inicialmente',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Visibilidad',
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		onFeedbackSent: {
			control: false,
			description: 'Callback cuando se envía el feedback exitosamente',
			table: {
				type: { summary: '(data: {section: string, comment: string}) => void' },
				category: 'Eventos',
			},
		},
		onCancel: {
			control: false,
			description: 'Callback cuando se cancela el feedback',
			table: {
				type: { summary: '() => void' },
				category: 'Eventos',
			},
		},
		onClose: {
			control: false,
			description: 'Callback cuando se cierra el modal',
			table: {
				type: { summary: '() => void' },
				category: 'Eventos',
			},
		},
	},
};

export default meta;
type Story = StoryObj<ButtonFeedbackOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		text: '',
		icon: 'comment-dots',
		position: 'bottom-right',
		offset: 24,
		modalTitle: 'Deja tu Feedback',
		sectionOptions: [
			{ value: 'home', text: 'Home' },
			{ value: 'encuestas', text: 'Encuestas' },
			{ value: 'aprendizaje', text: 'Aprendizaje' },
		],
		defaultSection: 'home',
		commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
		n8nWebhookUrl: '',
		visible: true,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Importar función (si usas módulos)
// import { createButtonFeedback } from '@ubits/button-feedback';

// 2. Crear ButtonFeedback
const feedbackButtonInstance = createButtonFeedback({
  text: '', // Opcional: texto del botón flotante
  icon: 'comment-dots', // Icono del botón flotante
  position: 'bottom-right', // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  offset: 24, // Offset desde el borde (en píxeles)
  modalTitle: 'Deja tu Feedback',
  sectionOptions: [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' },
    { value: 'aprendizaje', text: 'Aprendizaje' }
  ],
  defaultSection: 'home', // Valor por defecto del select
  commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
  n8nWebhookUrl: 'https://tu-webhook-n8n.com/webhook', // Opcional: URL del webhook de n8n
  visible: true, // Si el botón está visible inicialmente
  onFeedbackSent: (data) => {
    console.log('Feedback enviado:', data);
    // data = { section: 'home', comment: 'Comentario del usuario' }
  },
  onCancel: () => {
    console.log('Feedback cancelado');
  },
  onClose: () => {
    console.log('Modal cerrado');
  }
});

// Nota: createButtonFeedback retorna un objeto con:
// - feedbackButtonInstance.element: El elemento HTML del botón flotante
// - feedbackButtonInstance.show(): Muestra el botón flotante
// - feedbackButtonInstance.hide(): Oculta el botón flotante
// - feedbackButtonInstance.open(): Abre el modal de feedback
// - feedbackButtonInstance.close(): Cierra el modal de feedback
// - feedbackButtonInstance.destroy(): Destruye el componente y limpia los recursos

// Ejemplo: Ocultar el botón
feedbackButtonInstance.hide();

// Ejemplo: Mostrar el botón
feedbackButtonInstance.show();

// Ejemplo: Abrir el modal programáticamente
feedbackButtonInstance.open();

// Ejemplo: Cerrar el modal programáticamente
feedbackButtonInstance.close();

// Ejemplo: Destruir el componente
feedbackButtonInstance.destroy();`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-button-feedback');
		container.setAttribute('data-ubits-component', 'ButtonFeedback');
		container.style.cssText = `
      min-height: 100vh;
      padding: var(--ubits-spacing-8);
      background-color: var(--modifiers-normal-color-light-bg-1);
      color: var(--modifiers-normal-color-light-fg-1-high);
    `;

		// Crear contenido de ejemplo
		const content = document.createElement('div');
		content.style.cssText = `
      max-width: 800px;
      margin: 0 auto;
      padding: var(--ubits-spacing-8);
    `;
		content.innerHTML = `
      <h1 class="ubits-heading-h1">Página de Ejemplo</h1>
      <p class="ubits-body-lg">Este es un ejemplo de página con el botón de feedback flotante. Haz clic en el botón azul en la esquina inferior derecha para dejar tu feedback.</p>
      <p class="ubits-body-md">El botón de feedback permite a los usuarios enviar comentarios sobre la aplicación directamente desde cualquier página.</p>
    `;
		container.appendChild(content);

		// Variable para mantener la instancia del botón
		let feedbackButtonInstance: ReturnType<typeof createButtonFeedback> | null = null;

		// Crear botón de feedback
		requestAnimationFrame(() => {
			try {
				feedbackButtonInstance = createButtonFeedback({
					...args,
					onFeedbackSent: args.onFeedbackSent || ((data) => {
						console.log('Feedback enviado:', data);
					}),
					onCancel: args.onCancel || (() => {
						console.log('Feedback cancelado');
					}),
					onClose: args.onClose || (() => {
						console.log('Modal cerrado');
					}),
				});
			} catch (error) {
				console.error('Error creando ButtonFeedback:', error);
				const errorDiv = document.createElement('div');
				errorDiv.textContent = `Error: ${error}`;
				errorDiv.style.color = 'red';
				container.appendChild(errorDiv);
			}
		});

		return container;
	},
};

export const Default: Story = {
	args: {
		text: '',
		icon: 'comment-dots',
		position: 'bottom-right',
		offset: 24,
		modalTitle: 'Deja tu Feedback',
		sectionOptions: [
			{ value: 'home', text: 'Home' },
			{ value: 'encuestas', text: 'Encuestas' },
			{ value: 'aprendizaje', text: 'Aprendizaje' },
			{ value: 'desempeno', text: 'Desempeño' },
			{ value: 'diagnostico', text: 'Diagnóstico' },
		],
		defaultSection: 'home',
		commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?',
		n8nWebhookUrl: '',
		visible: true,
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      min-height: 100vh;
      padding: var(--ubits-spacing-8);
      background-color: var(--modifiers-normal-color-light-bg-1);
      color: var(--modifiers-normal-color-light-fg-1-high);
    `;

		// Aplicar estilos para dark mode
		const updateTheme = () => {
			const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			if (isDark) {
				container.style.backgroundColor = 'var(--modifiers-normal-color-dark-bg-1)';
				container.style.color = 'var(--modifiers-normal-color-dark-fg-1-high)';
			} else {
				container.style.backgroundColor = 'var(--modifiers-normal-color-light-bg-1)';
				container.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
			}
		};

		// Observar cambios de tema
		const observer = new MutationObserver(updateTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});
		updateTheme();

		// Crear contenido de ejemplo
		const content = document.createElement('div');
		content.style.cssText = `
      max-width: 800px;
      margin: 0 auto;
      padding: var(--ubits-spacing-8);
    `;
		content.innerHTML = `
      <h1 class="ubits-heading-h1">Página de Ejemplo</h1>
      <p class="ubits-body-lg">Este es un ejemplo de página con el botón de feedback flotante. Haz clic en el botón azul en la esquina inferior derecha para dejar tu feedback.</p>
      <p class="ubits-body-md">El botón de feedback permite a los usuarios enviar comentarios sobre la aplicación directamente desde cualquier página.</p>
    `;
		container.appendChild(content);

		// Variable para mantener la instancia del botón
		let feedbackButtonInstance: ReturnType<typeof createButtonFeedback> | null = null;

		// Función para destruir el botón anterior si existe
		const destroyPreviousButton = () => {
			if (feedbackButtonInstance) {
				feedbackButtonInstance.destroy();
				feedbackButtonInstance = null;
			}
			// También buscar y eliminar cualquier botón flotante que pueda quedar en el body
			const existingButtons = document.body.querySelectorAll(
				'.ubits-button-feedback--bottom-right, .ubits-button-feedback--bottom-left, .ubits-button-feedback--top-right, .ubits-button-feedback--top-left',
			);
			existingButtons.forEach((btn) => {
				if (btn.parentElement) {
					btn.parentElement.removeChild(btn);
				}
			});
		};

		// Crear botón de feedback
		requestAnimationFrame(() => {
			try {
				// Destruir botón anterior si existe
				destroyPreviousButton();

				// Crear nuevo botón
				feedbackButtonInstance = createButtonFeedback({
					...args,
					onFeedbackSent: (data) => {
						// Feedback enviado
					},
					onCancel: () => {
						// Feedback cancelado
					},
					onClose: () => {
						// Modal cerrado
					},
				});
			} catch (error) {
				console.error('Error creando botón de feedback:', error);
			}
		});

		return container;
	},
};
