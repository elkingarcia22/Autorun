import type { Meta, StoryObj } from '@storybook/html';
import { createScrollbar } from '../../../../components/scroll/src/ScrollProvider';
import type { ScrollOptions } from '../../../../components/scroll/src/types/ScrollOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente
import '../../../../components/scroll/src/styles/scroll.css';

const meta: Meta<ScrollOptions> = {
	title: 'Básicos/Scrollbar',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Scrollbar personalizado UBITS. Se usa para crear scrollbars personalizados en elementos scrollable. Soporta orientación vertical y horizontal. Se sincroniza automáticamente con el elemento scrollable asociado. Aparece en hover y se adapta al tamaño del contenido. Soporta arrastrar y clic para navegar.',
			},
		},
		layout: 'fullscreen',
		ubits: createUBITSContract({
			componentId: '⚙️-functional-scroll',
			api: {
				create: 'window.createScrollbar',
				// También disponible como función importada directamente
			},
			dependsOn: {
				required: [],
				optional: [],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--ubits-border-radius-full',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [],
			},
		}),
	},
	argTypes: {
		containerId: {
			control: { type: 'text' },
			description: 'ID del contenedor donde se renderizará el scrollbar.',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		targetId: {
			control: { type: 'text' },
			description: 'ID del elemento scrollable al que está asociado el scrollbar.',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		orientation: {
			control: { type: 'select' },
			options: ['vertical', 'horizontal'],
			description: 'Orientación del scrollbar (vertical u horizontal).',
			table: {
				type: { summary: 'vertical | horizontal' },
				defaultValue: { summary: 'vertical' },
				category: 'Apariencia',
			},
		},
		state: {
			control: { type: 'select' },
			options: ['default'],
			description: 'Estado del scrollbar.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'default' },
				category: 'Estado',
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clase CSS adicional.',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
	},
};

export default meta;
type Story = StoryObj<ScrollOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		orientation: 'vertical',
		state: 'default',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear elemento scrollable
<div id="scrollable-container" style="
  width: 400px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  background: var(--modifiers-normal-color-light-bg-2);
  border-radius: 8px;
  border: 1px solid var(--modifiers-normal-color-light-border-1);
">
  <!-- Contenido largo que requiere scroll -->
  <div style="height: 1200px; padding: 16px;">
    <p>Contenido largo...</p>
    <!-- Más contenido -->
  </div>
</div>

// 2. Crear contenedor para el scrollbar
<div id="scrollbar-container" style="
  height: 300px;
"></div>

// 3. Crear Scrollbar
const scrollbarInstance = window.createScrollbar({
  containerId: 'scrollbar-container',
  targetId: 'scrollable-container',
  orientation: 'vertical', // 'vertical' | 'horizontal'
  state: 'default',
  className: ''
});

// Nota: createScrollbar retorna un objeto con:
// - scrollbarInstance.element: El elemento DOM del scrollbar
// - scrollbarInstance.update(): Actualizar el scrollbar manualmente
// - scrollbarInstance.destroy(): Destruir el scrollbar y limpiar recursos

// Ejemplo con orientación horizontal:
const scrollbarHorizontal = window.createScrollbar({
  containerId: 'scrollbar-container-horizontal',
  targetId: 'scrollable-container-horizontal',
  orientation: 'horizontal',
  state: 'default'
});

// Nota: El scrollbar se sincroniza automáticamente con el elemento scrollable.
// Aparece en hover y se adapta al tamaño del contenido.
// Soporta arrastrar y clic para navegar.`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '⚙️-functional-scroll');
		container.setAttribute('data-ubits-component', 'Scrollbar');
		container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      display: flex;
      align-items: stretch;
      gap: 8px;
      width: 600px;
      height: 400px;
    `;

		// Crear elemento scrollable
		const scrollableContainer = document.createElement('div');
		scrollableContainer.id = `scrollbar-target-${Date.now()}`;
		scrollableContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      -ms-overflow-style: none;
      scrollbar-width: none;
    `;
		scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
		scrollableContainer.style.setProperty('scrollbar-width', 'none');

		// Ocultar scrollbar nativo de WebKit
		const styleId = `scrollbar-style-${Date.now()}`;
		const styleElement = document.createElement('style');
		styleElement.id = styleId;
		styleElement.textContent = `
      #${scrollableContainer.id}::-webkit-scrollbar {
        display: none;
      }
    `;
		document.head.appendChild(styleElement);

		// Contenido largo
		const content = document.createElement('div');
		content.style.cssText = `
      height: 1200px;
      padding: 16px;
    `;

		const title = document.createElement('p');
		title.textContent = 'Scrollbar Personalizado';
		title.style.cssText = `
      margin: 0 0 16px 0;
      color: var(--modifiers-normal-color-light-fg-1-high);
      font-size: 16px;
      font-weight: 700;
    `;

		const description = document.createElement('p');
		description.textContent =
			'Este es un ejemplo de contenido largo que requiere scroll vertical. El scrollbar aparecerá a la derecha cuando pases el mouse sobre el contenedor.';
		description.style.cssText = `
      margin: 0 0 24px 0;
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: 13px;
    `;

		content.appendChild(title);
		content.appendChild(description);
		scrollableContainer.appendChild(content);

		// Contenedor del scrollbar
		const scrollbarContainer = document.createElement('div');
		scrollbarContainer.id = `scrollbar-container-${Date.now()}`;
		scrollbarContainer.style.cssText = `
      height: 100%;
    `;

		wrapper.appendChild(scrollableContainer);
		wrapper.appendChild(scrollbarContainer);
		container.appendChild(wrapper);

		// Crear scrollbar después de que el DOM esté listo
		setTimeout(() => {
			try {
				const scrollbarInstance = createScrollbar({
					orientation: args.orientation || 'vertical',
					state: args.state || 'default',
					targetId: scrollableContainer.id,
					containerId: scrollbarContainer.id,
					className: args.className,
				});
			} catch (error) {
				console.error('Error al crear scrollbar:', error);
				const errorDiv = document.createElement('div');
				errorDiv.textContent = `Error: ${error}`;
				errorDiv.style.color = 'red';
				container.appendChild(errorDiv);
			}
		}, 100);

		return container;
	},
};

export const Default: Story = {
	args: {
		orientation: 'vertical',
		state: 'default',
	},
	render: (args, { updateArgs }) => {
		// Crear contenedor fullscreen
		const container = document.createElement('div');
		container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

		// Contenedor principal
		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-1);
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

		let scrollbarInstance: any = null;
		let currentWrapper: HTMLElement | null = null;

		const createScrollbarContent = (orientation: 'vertical' | 'horizontal') => {
			// Limpiar contenido anterior
			if (scrollbarInstance) {
				scrollbarInstance.destroy();
				scrollbarInstance = null;
			}
			if (currentWrapper) {
				currentWrapper.remove();
			}

			currentWrapper = document.createElement('div');

			if (orientation === 'vertical') {
				currentWrapper.style.cssText = `
          display: flex;
          align-items: stretch;
          gap: 8px;
          width: 600px;
          height: 400px;
        `;

				const scrollableContainer = document.createElement('div');
				scrollableContainer.id = `scrollbar-target-vertical-${Date.now()}`;
				scrollableContainer.style.cssText = `
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px;
          background: var(--modifiers-normal-color-light-bg-2);
          border-radius: 8px;
          border: 1px solid var(--modifiers-normal-color-light-border-1);
          -ms-overflow-style: none;
          scrollbar-width: none;
        `;
				scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
				scrollableContainer.style.setProperty('scrollbar-width', 'none');

				// Estilo para ocultar scrollbar nativo de WebKit
				const styleId = `scrollbar-style-vertical-${Date.now()}`;
				let styleElement = document.getElementById(styleId);
				if (!styleElement) {
					styleElement = document.createElement('style');
					styleElement.id = styleId;
					styleElement.textContent = `
            #${scrollableContainer.id}::-webkit-scrollbar {
              display: none;
            }
          `;
					document.head.appendChild(styleElement);
				}

				// Contenido largo
				const content = document.createElement('div');
				content.style.cssText = `
          height: 1200px;
          padding: 16px;
        `;

				const title = document.createElement('p');
				title.textContent = 'Scrollbar Vertical';
				title.style.cssText = `
          margin: 0 0 16px 0;
          color: var(--modifiers-normal-color-light-fg-1-high);
          font-size: 16px;
          font-weight: 700;
        `;

				const description = document.createElement('p');
				description.textContent =
					'Este es un ejemplo de contenido largo que requiere scroll vertical. El scrollbar aparecerá a la derecha cuando pases el mouse sobre el contenedor.';
				description.style.cssText = `
          margin: 0 0 24px 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          font-size: 13px;
        `;

				const itemsContainer = document.createElement('div');
				itemsContainer.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 12px;
        `;

				for (let i = 1; i <= 30; i++) {
					const item = document.createElement('div');
					item.style.cssText = `
            padding: 12px;
            background: var(--modifiers-normal-color-light-bg-1);
            border-radius: 8px;
            border: 1px solid var(--modifiers-normal-color-light-border-1);
          `;
					const itemText = document.createElement('p');
					itemText.textContent = `Elemento ${i}`;
					itemText.style.cssText = `
            margin: 0;
            color: var(--modifiers-normal-color-light-fg-1-high);
            font-size: 13px;
          `;
					item.appendChild(itemText);
					itemsContainer.appendChild(item);
				}

				content.appendChild(title);
				content.appendChild(description);
				content.appendChild(itemsContainer);
				scrollableContainer.appendChild(content);

				const scrollbarContainer = document.createElement('div');
				scrollbarContainer.id = `scrollbar-container-vertical-${Date.now()}`;
				scrollbarContainer.style.cssText = `
          height: 100%;
        `;

				currentWrapper.appendChild(scrollableContainer);
				currentWrapper.appendChild(scrollbarContainer);

				// Crear scrollbar después de que el DOM esté listo
				setTimeout(() => {
					try {
						scrollbarInstance = createScrollbar({
							orientation: 'vertical',
							state: args.state,
							targetId: scrollableContainer.id,
							containerId: scrollbarContainer.id,
						});
					} catch (error) {
						console.error('Error al crear scrollbar:', error);
					}
				}, 100);
			} else {
				// Horizontal (similar pero con overflow-x)
				currentWrapper.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 600px;
          height: 300px;
        `;

				const scrollableContainer = document.createElement('div');
				scrollableContainer.id = `scrollbar-target-horizontal-${Date.now()}`;
				scrollableContainer.style.cssText = `
          flex: 1;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 16px;
          background: var(--modifiers-normal-color-light-bg-2);
          border-radius: 8px;
          border: 1px solid var(--modifiers-normal-color-light-border-1);
          -ms-overflow-style: none;
          scrollbar-width: none;
        `;
				scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
				scrollableContainer.style.setProperty('scrollbar-width', 'none');

				// Estilo para ocultar scrollbar nativo de WebKit
				const styleId = `scrollbar-style-horizontal-${Date.now()}`;
				let styleElement = document.getElementById(styleId);
				if (!styleElement) {
					styleElement = document.createElement('style');
					styleElement.id = styleId;
					styleElement.textContent = `
            #${scrollableContainer.id}::-webkit-scrollbar {
              display: none;
            }
          `;
					document.head.appendChild(styleElement);
				}

				// Contenido ancho
				const content = document.createElement('div');
				content.style.cssText = `
          width: 1800px;
          padding: 16px;
        `;

				const title = document.createElement('p');
				title.textContent = 'Scrollbar Horizontal';
				title.style.cssText = `
          margin: 0 0 16px 0;
          color: var(--modifiers-normal-color-light-fg-1-high);
          font-size: 16px;
          font-weight: 700;
        `;

				const description = document.createElement('p');
				description.textContent =
					'Este es un ejemplo de contenido ancho que requiere scroll horizontal. El scrollbar aparecerá abajo cuando pases el mouse sobre el contenedor.';
				description.style.cssText = `
          margin: 0 0 24px 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          font-size: 13px;
        `;

				const itemsContainer = document.createElement('div');
				itemsContainer.style.cssText = `
          display: flex;
          gap: 12px;
        `;

				for (let i = 1; i <= 20; i++) {
					const item = document.createElement('div');
					item.style.cssText = `
            min-width: 200px;
            padding: 12px;
            background: var(--modifiers-normal-color-light-bg-1);
            border-radius: 8px;
            border: 1px solid var(--modifiers-normal-color-light-border-1);
          `;
					const itemText = document.createElement('p');
					itemText.textContent = `Elemento ${i}`;
					itemText.style.cssText = `
            margin: 0;
            color: var(--modifiers-normal-color-light-fg-1-high);
            font-size: 13px;
          `;
					item.appendChild(itemText);
					itemsContainer.appendChild(item);
				}

				content.appendChild(title);
				content.appendChild(description);
				content.appendChild(itemsContainer);
				scrollableContainer.appendChild(content);

				const scrollbarContainer = document.createElement('div');
				scrollbarContainer.id = `scrollbar-container-horizontal-${Date.now()}`;
				scrollbarContainer.style.cssText = `
          width: 100%;
        `;

				currentWrapper.appendChild(scrollableContainer);
				currentWrapper.appendChild(scrollbarContainer);

				// Crear scrollbar después de que el DOM esté listo
				setTimeout(() => {
					try {
						scrollbarInstance = createScrollbar({
							orientation: 'horizontal',
							state: args.state,
							targetId: scrollableContainer.id,
							containerId: scrollbarContainer.id,
						});
					} catch (error) {
						console.error('Error al crear scrollbar:', error);
					}
				}, 100);
			}

			wrapper.appendChild(currentWrapper);
		};

		// Crear contenido inicial
		createScrollbarContent(args.orientation || 'vertical');

		// Observar cambios en args
		let lastOrientation = args.orientation || 'vertical';
		const checkInterval = setInterval(() => {
			if (args.orientation !== lastOrientation) {
				lastOrientation = args.orientation || 'vertical';
				createScrollbarContent(lastOrientation);
			}
		}, 100);

		// Limpiar al desmontar
		container.addEventListener('DOMNodeRemoved', () => {
			clearInterval(checkInterval);
			if (scrollbarInstance) {
				scrollbarInstance.destroy();
			}
		});

		container.appendChild(wrapper);
		return container;
	},
};



