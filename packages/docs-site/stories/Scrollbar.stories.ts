import type { Meta, StoryObj } from '@storybook/html';
import { createScrollbar } from '../../addons/scroll/src/ScrollProvider';
import type { ScrollOptions } from '../../addons/scroll/src/types/ScrollOptions';
import '../../addons/scroll/src/styles/scroll.css';

const meta: Meta<ScrollOptions> = {
  title: 'Components/Scrollbar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Scrollbar personalizado UBITS. Se usa para crear scrollbars personalizados en elementos scrollable. Soporta orientación vertical y horizontal. Se sincroniza automáticamente con el elemento scrollable asociado. Aparece en hover y se adapta al tamaño del contenido.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Orientación del scrollbar (vertical u horizontal).',
      table: {
        type: { summary: 'string' },
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
    targetId: {
      control: { type: 'text' },
      description: 'ID del elemento scrollable al que está asociado el scrollbar.',
      table: {
        type: { summary: 'string' },
        category: 'Configuración',
      },
    },
    containerId: {
      control: { type: 'text' },
      description: 'ID del contenedor donde se renderizará el scrollbar.',
      table: {
        type: { summary: 'string' },
        category: 'Configuración',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ScrollOptions>;

export const Default: Story = {
  args: {
    orientation: 'vertical',
    state: 'default',
  },
  render: (args) => {
    // Crear contenedor fullscreen
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    `;

    // Crear contenedor scrollable según orientación
    const wrapper = document.createElement('div');
    
    if (args.orientation === 'vertical') {
      wrapper.style.cssText = `
        display: flex;
        align-items: stretch;
        gap: 8px;
        width: 600px;
        height: 400px;
        background: var(--ubits-bg-1, #ffffff);
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      `;

      const scrollableContainer = document.createElement('div');
      scrollableContainer.id = 'scrollbar-target-vertical';
      scrollableContainer.style.cssText = `
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 16px;
        background: var(--ubits-bg-2, #f3f3f4);
        border-radius: 8px;
        border: 1px solid var(--ubits-border-1, #d0d2d5);
        -ms-overflow-style: none;
        scrollbar-width: none;
      `;
      scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
      scrollableContainer.style.setProperty('scrollbar-width', 'none');
      
      // Estilo para ocultar scrollbar nativo de WebKit
      const style = document.createElement('style');
      style.textContent = `
        #scrollbar-target-vertical::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);

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
        color: var(--ubits-fg-1-high, #303a47);
        font-size: var(--font-body-md-size, 16px);
        font-weight: var(--weight-bold, 700);
      `;
      
      const description = document.createElement('p');
      description.textContent = 'Este es un ejemplo de contenido largo que requiere scroll vertical. El scrollbar aparecerá a la derecha cuando pases el mouse sobre el contenedor.';
      description.style.cssText = `
        margin: 0 0 24px 0;
        color: var(--ubits-fg-1-medium, #5c646f);
        font-size: var(--font-body-sm-size, 13px);
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
          background: var(--ubits-bg-1, #ffffff);
          border-radius: 8px;
          border: 1px solid var(--ubits-border-1, #d0d2d5);
        `;
        const itemText = document.createElement('p');
        itemText.textContent = `Elemento ${i}`;
        itemText.style.cssText = `
          margin: 0;
          color: var(--ubits-fg-1-high, #303a47);
          font-size: var(--font-body-sm-size, 13px);
        `;
        item.appendChild(itemText);
        itemsContainer.appendChild(item);
      }
      
      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(itemsContainer);
      scrollableContainer.appendChild(content);
      
      const scrollbarContainer = document.createElement('div');
      scrollbarContainer.id = 'scrollbar-container-vertical';
      scrollbarContainer.style.cssText = `
        height: 100%;
      `;
      
      wrapper.appendChild(scrollableContainer);
      wrapper.appendChild(scrollbarContainer);
      
      // Crear scrollbar después de que el DOM esté listo
      setTimeout(() => {
        try {
          const scrollbarInstance = createScrollbar({
            ...args,
            targetId: 'scrollbar-target-vertical',
            containerId: 'scrollbar-container-vertical',
          });
        } catch (error) {
          console.error('Error al crear scrollbar:', error);
        }
      }, 100);
    } else {
      wrapper.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 600px;
        height: 300px;
        background: var(--ubits-bg-1, #ffffff);
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      `;

      const scrollableContainer = document.createElement('div');
      scrollableContainer.id = 'scrollbar-target-horizontal';
      scrollableContainer.style.cssText = `
        flex: 1;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 16px;
        background: var(--ubits-bg-2, #f3f3f4);
        border-radius: 8px;
        border: 1px solid var(--ubits-border-1, #d0d2d5);
        -ms-overflow-style: none;
        scrollbar-width: none;
      `;
      scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
      scrollableContainer.style.setProperty('scrollbar-width', 'none');
      
      // Estilo para ocultar scrollbar nativo de WebKit
      const style = document.createElement('style');
      style.textContent = `
        #scrollbar-target-horizontal::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);

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
        color: var(--ubits-fg-1-high, #303a47);
        font-size: var(--font-body-md-size, 16px);
        font-weight: var(--weight-bold, 700);
      `;
      
      const description = document.createElement('p');
      description.textContent = 'Este es un ejemplo de contenido ancho que requiere scroll horizontal. El scrollbar aparecerá abajo cuando pases el mouse sobre el contenedor.';
      description.style.cssText = `
        margin: 0 0 24px 0;
        color: var(--ubits-fg-1-medium, #5c646f);
        font-size: var(--font-body-sm-size, 13px);
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
          background: var(--ubits-bg-1, #ffffff);
          border-radius: 8px;
          border: 1px solid var(--ubits-border-1, #d0d2d5);
        `;
        const itemText = document.createElement('p');
        itemText.textContent = `Elemento ${i}`;
        itemText.style.cssText = `
          margin: 0;
          color: var(--ubits-fg-1-high, #303a47);
          font-size: var(--font-body-sm-size, 13px);
        `;
        item.appendChild(itemText);
        itemsContainer.appendChild(item);
      }
      
      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(itemsContainer);
      scrollableContainer.appendChild(content);
      
      const scrollbarContainer = document.createElement('div');
      scrollbarContainer.id = 'scrollbar-container-horizontal';
      scrollbarContainer.style.cssText = `
        width: 100%;
      `;
      
      wrapper.appendChild(scrollableContainer);
      wrapper.appendChild(scrollbarContainer);
      
      // Crear scrollbar después de que el DOM esté listo
      setTimeout(() => {
        try {
          const scrollbarInstance = createScrollbar({
            ...args,
            targetId: 'scrollbar-target-horizontal',
            containerId: 'scrollbar-container-horizontal',
          });
        } catch (error) {
          console.error('Error al crear scrollbar:', error);
        }
      }, 100);
    }

    container.appendChild(wrapper);
    return container;
  },
};

