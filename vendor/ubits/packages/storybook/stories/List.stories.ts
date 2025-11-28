import type { Meta, StoryObj } from '@storybook/html';
import type { ListItemState } from '../../addons/list/src/types/ListOptions';

const meta: Meta<{
  size?: 'xs' | 'sm' | 'md' | 'lg';
  maxHeight?: string;
  item1State?: ListItemState;
  item2State?: ListItemState;
  item3State?: ListItemState;
  item4State?: ListItemState;
  showScrollbar?: boolean;
}> = {
  title: 'Data/List',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente List UBITS para mostrar listas de items con estados (default, hover, active, disabled). Soporta 4 tamaños (xs, sm, md, lg), scrollbar personalizado UBITS, navegación por teclado y selección simple o múltiple.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño de los items de la lista',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Altura máxima de la lista (para scroll)',
      table: {
        defaultValue: { summary: '400px' },
        type: { summary: 'string' },
      },
    },
    showScrollbar: {
      control: { type: 'boolean' },
      description: 'Mostrar scrollbar UBITS personalizado',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    item1State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 1',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item2State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 2',
      table: {
        defaultValue: { summary: 'active' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item3State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 3',
      table: {
        defaultValue: { summary: 'disabled' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item4State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 4',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Función para renderizar List (replicando exactamente la implementación de Autoframe)
function renderListSimple(args: {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  maxHeight?: string;
  item1State?: ListItemState;
  item2State?: ListItemState;
  item3State?: ListItemState;
  item4State?: ListItemState;
  showScrollbar?: boolean;
}): string {
  const { size = 'md', item1State = 'default', item2State = 'active', item3State = 'disabled', item4State = 'default', maxHeight = '400px', showScrollbar = false } = args;
  
  // Crear más items para que tenga scroll (10 items)
  const items = [
    { label: 'Item 1', state: item1State },
    { label: 'Item 2', state: item2State },
    { label: 'Item 3', state: item3State },
    { label: 'Item 4', state: item4State },
    { label: 'Item 5', state: 'default' as const },
    { label: 'Item 6', state: 'default' as const },
    { label: 'Item 7', state: 'default' as const },
    { label: 'Item 8', state: 'default' as const },
    { label: 'Item 9', state: 'default' as const },
    { label: 'Item 10', state: 'default' as const }
  ];
  
  const listContainerId = `list-container-${Date.now()}`;
  const listId = `list-${Date.now()}`;
  const scrollbarContainerId = `list-scrollbar-${Date.now()}`;
  
  // Si showScrollbar está activado, usar estructura con scrollbar UBITS
  if (showScrollbar) {
    let listHTML = `
      <div id="${listContainerId}" style="position: relative; width: 100%;">
        <div id="${listId}" class="ubits-list" role="list" style="max-height: ${maxHeight}; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 8px;">
    `;
    
    items.forEach((item) => {
      const itemState = item.state || 'default';
      const itemClasses = [
        'ubits-list-item',
        `ubits-list-item--${size}`,
        itemState !== 'default' ? `ubits-list-item--${itemState}` : ''
      ].filter(Boolean).join(' ');
      
      const itemAttrs = [];
      if (itemState === 'active') {
        itemAttrs.push('aria-selected="true"');
      }
      if (itemState === 'disabled') {
        itemAttrs.push('aria-disabled="true"');
      } else {
        itemAttrs.push('tabindex="0"');
      }
      
      listHTML += `
        <div class="${itemClasses}" role="listitem" ${itemAttrs.join(' ')}>
          ${item.label}
        </div>
      `;
    });
    
    listHTML += `
        </div>
        <div id="${scrollbarContainerId}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; pointer-events: none;"></div>
      </div>
      <style>
        #${listId}::-webkit-scrollbar { display: none; }
      </style>
    `;
    
    // Crear scrollbar UBITS después de que el DOM esté listo (igual que en Autoframe)
    setTimeout(() => {
      const listElement = document.getElementById(listId);
      const scrollbarContainer = document.getElementById(scrollbarContainerId);
      
      if (listElement && scrollbarContainer) {
        // Intentar usar createScrollbarLocal si está disponible (como en Autoframe)
        if (typeof (window as any).createScrollbarLocal === 'function') {
          if (listElement.scrollHeight > listElement.clientHeight) {
            const scrollbarInstance = (window as any).createScrollbarLocal(listElement, scrollbarContainer, 'vertical');
            if (scrollbarInstance) {
              scrollbarContainer.style.pointerEvents = 'auto';
              // Guardar referencia
              (listElement as any)._scrollbarInstance = scrollbarInstance;
              
              // Forzar que el scrollbar sea visible (igual que en Autoframe)
              setTimeout(() => {
                const scrollbarElement = scrollbarContainer.querySelector('.ubits-scrollbar') as HTMLElement;
                const barElement = scrollbarContainer.querySelector('.ubits-scrollbar__bar') as HTMLElement;
                if (scrollbarElement && barElement) {
                  scrollbarElement.style.display = 'flex';
                  barElement.style.opacity = '0.6';
                  barElement.style.pointerEvents = 'auto';
                }
              }, 50);
            }
          }
        } else {
          // Fallback: importar ScrollProvider dinámicamente
          import('../../addons/scroll/src/ScrollProvider').then(({ createScrollbar }) => {
            if (listElement.scrollHeight > listElement.clientHeight) {
              const scrollbarInstance = createScrollbar({
                orientation: 'vertical',
                targetId: listId,
                containerId: scrollbarContainerId
              });
              
              if (scrollbarInstance) {
                scrollbarContainer.style.pointerEvents = 'auto';
                (listElement as any)._scrollbarInstance = scrollbarInstance;
                
                // Forzar que el scrollbar sea visible
                setTimeout(() => {
                  const scrollbarElement = scrollbarContainer.querySelector('.ubits-scrollbar') as HTMLElement;
                  const barElement = scrollbarContainer.querySelector('.ubits-scrollbar__bar') as HTMLElement;
                  if (scrollbarElement && barElement) {
                    scrollbarElement.style.display = 'flex';
                    barElement.style.opacity = '0.6';
                    barElement.style.pointerEvents = 'auto';
                  }
                }, 50);
              }
            }
          }).catch((error) => {
            console.error('Error al importar ScrollProvider:', error);
          });
        }
      }
    }, 100);
    
    return listHTML;
  } else {
    // Sin scrollbar UBITS, ocultar scrollbar nativo también
    let listHTML = `<div class="ubits-list" role="list" style="max-height: ${maxHeight}; overflow-y: auto; -ms-overflow-style: none; scrollbar-width: none;">`;
    
    items.forEach((item) => {
      const itemState = item.state || 'default';
      const itemClasses = [
        'ubits-list-item',
        `ubits-list-item--${size}`,
        itemState !== 'default' ? `ubits-list-item--${itemState}` : ''
      ].filter(Boolean).join(' ');
      
      const itemAttrs = [];
      if (itemState === 'active') {
        itemAttrs.push('aria-selected="true"');
      }
      if (itemState === 'disabled') {
        itemAttrs.push('aria-disabled="true"');
      } else {
        itemAttrs.push('tabindex="0"');
      }
      
      listHTML += `
        <div class="${itemClasses}" role="listitem" ${itemAttrs.join(' ')}>
          ${item.label}
        </div>
      `;
    });
    
    listHTML += '</div>';
    listHTML += `<style>
      .ubits-list::-webkit-scrollbar { display: none; }
    </style>`;
    return listHTML;
  }
}

export const Default: Story = {
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'default',
    item2State: 'active',
    item3State: 'disabled',
    item4State: 'default',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    // Preview container
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    
    // Info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.padding = '16px';
    infoPanel.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    infoPanel.style.borderRadius = '8px';
    infoPanel.style.border = '1px solid var(--modifiers-normal-color-light-border-1, #e5e7eb)';
    infoPanel.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong style="color: var(--modifiers-normal-color-light-fg-1-high, #303a47); font-size: 14px;">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);">
        <div><strong>Tamaño:</strong> ${args.size || 'md'}</div>
        <div><strong>Altura máxima:</strong> ${args.maxHeight || '400px'}</div>
        <div><strong>Scrollbar UBITS:</strong> ${args.showScrollbar ? 'Sí' : 'No'}</div>
        <div><strong>Item 1:</strong> ${args.item1State || 'default'}</div>
        <div><strong>Item 2:</strong> ${args.item2State || 'active'}</div>
        <div><strong>Item 3:</strong> ${args.item3State || 'disabled'}</div>
        <div><strong>Item 4:</strong> ${args.item4State || 'default'}</div>
      </div>
    `;
    
    // List container
    const listContainer = document.createElement('div');
    listContainer.id = `list-preview-${Date.now()}`;
    listContainer.style.width = '100%';
    listContainer.style.maxWidth = '400px';
    
    // Renderizar lista usando la misma función que Autoframe
    const listHTML = renderListSimple(args);
    listContainer.innerHTML = listHTML;
    
    // Cargar CSS del scrollbar siempre (para que esté disponible cuando se active)
    const scrollbarCSSId = 'ubits-scrollbar-css';
    if (!document.getElementById(scrollbarCSSId)) {
      const link = document.createElement('link');
      link.id = scrollbarCSSId;
      link.rel = 'stylesheet';
      link.href = '../../components/scroll/src/styles/scroll.css';
      document.head.appendChild(link);
    }
    
    preview.appendChild(infoPanel);
    preview.appendChild(listContainer);
    container.appendChild(preview);
    
    return container;
  },
};

