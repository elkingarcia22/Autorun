/**
 * Welcome Test Template Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para aplicar el template de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { WELCOME_IMAGES, getImageById, getImageOptions, getImageLabels } from './welcomeImages';
import { createUBITSContract } from '../../_shared/ubitsContract';

const meta: Meta<{
	layout: 'image-right' | 'image-left' | 'no-image';
	textAlignment: 'left' | 'center';
	buttonAlignment: 'left' | 'center' | 'right';
	showBanner: boolean;
	showInfoBox: boolean;
	imageSize: 'small' | 'medium' | 'large';
	containerStyle: 'default' | 'compact' | 'wide' | 'minimal';
	selectedImage: string;
}> = {
	title: 'Templates/Welcome Test',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Página de bienvenida para tests de prototipos UBITS. Incluye múltiples variaciones de diseño con diferentes layouts, posiciones de imagen, alineaciones y estilos. Este es un template completo que usa componentes UBITS internamente.',
			},
		},
		layout: 'fullscreen',
		// ⭐ CONTRATO UBITS PARA AUTORUN (TEMPLATE)
		ubits: createUBITSContract({
			componentId: '📄-template-welcome-test',
			api: {
				apply: 'loadWelcomeTestTemplate', // Función para aplicar el template
				templatePath: '/templates/template-welcome-test.html', // Ruta al archivo HTML del template
			},
			dependsOn: {
				required: [
					'🧩-ux-button', // Button usado en el template
				],
				optional: [],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-accent-brand',
				'--ubits-spacing-xs',
				'--ubits-spacing-sm',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
				'--ubits-spacing-xl',
				'--ubits-spacing-2xl',
				'--ubits-border-radius-sm',
				'--font-family-noto-sans-font-family',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [],
			},
			isTemplate: true, // Indica que es un template, no un componente individual
			templateComponents: [
				'🧩-ux-button', // Componentes UBITS que el template usa internamente
			],
		}),
	},
	argTypes: {
		layout: {
			control: { type: 'select' },
			options: ['image-right', 'image-left', 'no-image'],
			description: 'Posición de la imagen en el layout',
			table: {
				defaultValue: { summary: 'no-image' },
				type: { summary: 'image-right | image-left | no-image' },
			},
		},
		textAlignment: {
			control: { type: 'select' },
			options: ['left', 'center'],
			description: 'Alineación del texto',
			table: {
				defaultValue: { summary: 'left' },
				type: { summary: 'left | center' },
			},
		},
		buttonAlignment: {
			control: { type: 'select' },
			options: ['left', 'center', 'right'],
			description: 'Alineación del botón',
			table: {
				defaultValue: { summary: 'left' },
				type: { summary: 'left | center | right' },
			},
		},
		showBanner: {
			control: { type: 'boolean' },
			description: 'Mostrar banner superior',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
		showInfoBox: {
			control: { type: 'boolean' },
			description: 'Mostrar caja de información',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
		imageSize: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Tamaño de la imagen',
			table: {
				defaultValue: { summary: 'medium' },
				type: { summary: 'small | medium | large' },
			},
		},
		containerStyle: {
			control: { type: 'select' },
			options: ['default', 'compact', 'wide', 'minimal'],
			description: 'Estilo del contenedor',
			table: {
				defaultValue: { summary: 'default' },
				type: { summary: 'default | compact | wide | minimal' },
			},
		},
		selectedImage: {
			control: {
				type: 'select',
				labels: getImageLabels(),
			},
			options: getImageOptions(),
			description: 'Seleccionar imagen de la galería (50 imágenes disponibles)',
			table: {
				defaultValue: { summary: '1' },
				type: { summary: 'string' },
				category: 'Imagen',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Función helper para obtener la ruta del template
function getTemplatePath(): string {
	return '/templates/template-welcome-test.html';
}

// Map para rastrear el estado de cada instancia
const welcomeInstances = new Map<
	string,
	{
		iframe: HTMLIFrameElement;
		currentConfig: any;
	}
>();

export const WelcomePage: Story = {
	args: {
		layout: 'no-image',
		textAlignment: 'left',
		buttonAlignment: 'left',
		showBanner: true,
		showInfoBox: true,
		imageSize: 'medium',
		containerStyle: 'default',
		selectedImage: '1',
	},
	render: (args) => {
		const instanceId = `welcome-instance-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

		const container = document.createElement('div');
		container.id = 'welcome-story-container';
		container.setAttribute('data-instance-id', instanceId);
		container.style.cssText = `
      width: 100%;
      height: 100vh;
      position: relative;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
    `;

		const iframe = document.createElement('iframe');
		iframe.id = `welcome-iframe-${instanceId}`;
		iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    `;
		iframe.setAttribute(
			'sandbox',
			'allow-same-origin allow-scripts allow-forms allow-popups allow-modals',
		);

		welcomeInstances.set(instanceId, {
			iframe,
			currentConfig: null,
		});

		const loadTemplate = () => {
			const instance = welcomeInstances.get(instanceId);
			if (!instance) return;

			const templatePath = getTemplatePath();

			if (!iframe.src || !iframe.src.includes(templatePath)) {
				iframe.src = templatePath;
			}

			// Función para sincronizar el tema del iframe con Storybook
			const syncThemeToIframe = () => {
				try {
					const iframeWindow = iframe.contentWindow as any;
					const iframeDoc = iframeWindow?.document;
					if (iframeDoc) {
						const currentTheme = document.body.getAttribute('data-theme') || 'light';
						iframeDoc.body.setAttribute('data-theme', currentTheme);
						iframeDoc.documentElement.setAttribute('data-theme', currentTheme);
					}
				} catch (e) {
					// Ignorar errores de CORS
				}
			};

			// Observar cambios de tema en Storybook y propagarlos al iframe
			const themeObserver = new MutationObserver(() => {
				syncThemeToIframe();
			});

			themeObserver.observe(document.body, {
				attributes: true,
				attributeFilter: ['data-theme'],
			});

			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['data-theme'],
			});

			iframe.onload = () => {
				// Sincronizar tema inmediatamente al cargar
				syncThemeToIframe();

				// Configurar el template cuando se carga
				setTimeout(() => {
					try {
						const iframeWindow = iframe.contentWindow as any;
						if (iframeWindow && iframeWindow.WelcomePageConfig) {
							const config = iframeWindow.WelcomePageConfig;

							// Aplicar configuración según los args
							config.banner.show = args.showBanner;
							config.infoBox.show = args.showInfoBox;
							config.image.size = args.imageSize;

							// Layout e Imagen
							const selectedImageData = getImageById(args.selectedImage || '1');
							const imageUrl =
								selectedImageData?.url ||
								'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1200&fit=crop&auto=format';
							const imageAlt = selectedImageData?.name || 'Prototipo UBITS';

							if (args.layout === 'image-right') {
								config.layout.imagePosition = 'right';
								config.image.show = true;
								config.image.src = imageUrl;
								config.image.alt = imageAlt;
							} else if (args.layout === 'image-left') {
								config.layout.imagePosition = 'left';
								config.image.show = true;
								config.image.src = imageUrl;
								config.image.alt = imageAlt;
							} else {
								config.layout.imagePosition = 'none';
								config.image.show = false;
							}

							config.layout.textAlignment = args.textAlignment;
							config.layout.buttonAlignment = args.buttonAlignment;

							// Container style
							const containerElement = iframeWindow.document.getElementById('welcome-container');
							if (containerElement) {
								containerElement.className = 'welcome-container';
								if (args.containerStyle === 'compact') {
									containerElement.classList.add('welcome-container--compact');
								} else if (args.containerStyle === 'wide') {
									containerElement.classList.add('welcome-container--wide');
								} else if (args.containerStyle === 'minimal') {
									containerElement.classList.add('welcome-container--minimal');
								}
							}

							// Reinicializar con nueva configuración
							if (iframeWindow.initializeWelcomePage) {
								iframeWindow.initializeWelcomePage(config);
							}
						}
					} catch (e) {
						console.error('Error configuring welcome page:', e);
					}
				}, 500);
			};

			iframe.onerror = () => {
				console.error('Error cargando template de bienvenida');
				iframe.srcdoc = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Error</title>
              <style>
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                  background: #f5f5f5;
                  color: #333;
                }
                .error-container {
                  text-align: center;
                  padding: 2rem;
                }
                h1 { color: #d32f2f; margin-bottom: 1rem; }
                p { color: #666; }
              </style>
            </head>
            <body>
              <div class="error-container">
                <h1>⚠️ Error al cargar el template</h1>
                <p>No se pudo cargar el template de bienvenida.</p>
              </div>
            </body>
          </html>
        `;
			};
		};

		loadTemplate();

		container.appendChild(iframe);

		const originalRemove = container.remove;
		container.remove = function () {
			const instance = welcomeInstances.get(instanceId);
			if (instance) {
				// Cleanup si es necesario
			}
			welcomeInstances.delete(instanceId);
			originalRemove.call(this);
		};

		container.setAttribute('data-ubits-component', 'WelcomeTestTemplate');
		container.setAttribute('data-ubits-id', `welcome-test-${instanceId}`);

		return container;
	},
};

export const Implementation: Story = {
	args: {
		layout: 'no-image',
		textAlignment: 'left',
		buttonAlignment: 'center',
		showBanner: true,
		showInfoBox: true,
		imageSize: 'medium',
		containerStyle: 'default',
		selectedImage: '1',
	},
	render: (args) => {
		// Misma implementación que WelcomePage pero con snippet para aplicar el template
		return WelcomePage.render!(args);
	},
	parameters: {
		docs: {
			source: {
				code: `
// Función para aplicar el template Welcome Test
function loadWelcomeTestTemplate(options) {
  const {
    layout = 'no-image',
    textAlignment = 'left',
    buttonAlignment = 'center',
    showBanner = true,
    showInfoBox = true,
    imageSize = 'medium',
    containerStyle = 'default',
    selectedImage = '1'
  } = options;

  // 1. Cargar el template HTML desde /templates/template-welcome-test.html
  // El template es un archivo HTML completo que incluye:
  // - Estilos UBITS (tokens, typography, component styles)
  // - Estructura HTML del template
  // - JavaScript para configuración dinámica
  
  // 2. Opción A: Cargar en iframe (recomendado para Storybook)
  const iframe = document.createElement('iframe');
  iframe.src = '/templates/template-welcome-test.html';
  iframe.style.cssText = 'width: 100%; height: 100vh; border: none;';
  iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups allow-modals');
  
  const container = document.getElementById('welcome-container') || document.body;
  container.appendChild(iframe);
  
  // 3. Configurar el template cuando se carga
  iframe.onload = () => {
    try {
      const iframeWindow = iframe.contentWindow;
      if (iframeWindow && iframeWindow.WelcomePageConfig) {
        const config = iframeWindow.WelcomePageConfig;
        
        // Aplicar configuración
        config.banner.show = showBanner;
        config.infoBox.show = showInfoBox;
        config.image.size = imageSize;
        config.layout.imagePosition = layout === 'image-right' ? 'right' : layout === 'image-left' ? 'left' : 'none';
        config.layout.textAlignment = textAlignment;
        config.layout.buttonAlignment = buttonAlignment;
        
        // Reinicializar con nueva configuración
        if (iframeWindow.initializeWelcomePage) {
          iframeWindow.initializeWelcomePage(config);
        }
      }
    } catch (e) {
      console.error('Error configuring welcome page:', e);
    }
  };
  
  // 4. Opción B: Cargar HTML directamente (si no usas iframe)
  // fetch('/templates/template-welcome-test.html')
  //   .then(response => response.text())
  //   .then(html => {
  //     const container = document.getElementById('welcome-container');
  //     container.innerHTML = html;
  //     // Inicializar configuración después de cargar
  //   });
}

// Nota: Este template usa internamente:
// - 🧩-ux-button (Button component)
// - Tokens UBITS para colores, tipografía y espaciado
// - Estilos personalizados del template

// Ejemplo de uso:
loadWelcomeTestTemplate({
  layout: 'no-image',
  textAlignment: 'left',
  buttonAlignment: 'center',
  showBanner: true,
  showInfoBox: true,
  imageSize: 'medium',
  containerStyle: 'default',
  selectedImage: '1'
});
				`,
			},
		},
	},
};

