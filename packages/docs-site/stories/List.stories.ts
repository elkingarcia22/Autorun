import type { Meta, StoryObj } from '@storybook/html';
import { renderList, createList } from '../../addons/list/src/ListProvider';
import type { ListOptions, ListItem, ListItemState } from '../../addons/list/src/types/ListOptions';

const meta: Meta<ListOptions & { 
  item1State?: ListItemState;
  item2State?: ListItemState;
  item3State?: ListItemState;
  item4State?: ListItemState;
  showScrollbar?: boolean;
}> = {
  title: 'Components/List',
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
    multiple: {
      control: { type: 'boolean' },
      description: 'Si la lista permite selección múltiple',
      table: {
        defaultValue: { summary: 'false' },
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
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item3State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 3',
      table: {
        defaultValue: { summary: 'default' },
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
type Story = StoryObj<ListOptions & { 
  item1State?: ListItemState;
  item2State?: ListItemState;
  item3State?: ListItemState;
  item4State?: ListItemState;
  showScrollbar?: boolean;
}>;

// Helper para crear items con estados individuales (10 items para scroll)
function createItems(item1State: ListItemState = 'default', item2State: ListItemState = 'default', item3State: ListItemState = 'default', item4State: ListItemState = 'default'): ListItem[] {
  return [
    { label: 'Item 1', state: item1State, value: 'item-1', selected: item1State === 'active' },
    { label: 'Item 2', state: item2State, value: 'item-2', selected: item2State === 'active' },
    { label: 'Item 3', state: item3State, value: 'item-3', selected: item3State === 'active' },
    { label: 'Item 4', state: item4State, value: 'item-4', selected: item4State === 'active' },
    { label: 'Item 5', state: 'default', value: 'item-5', selected: false },
    { label: 'Item 6', state: 'default', value: 'item-6', selected: false },
    { label: 'Item 7', state: 'default', value: 'item-7', selected: false },
    { label: 'Item 8', state: 'default', value: 'item-8', selected: false },
    { label: 'Item 9', state: 'default', value: 'item-9', selected: false },
    { label: 'Item 10', state: 'default', value: 'item-10', selected: false },
  ];
}

export const Default: Story = {
  args: {
    containerId: 'list-story-container',
    size: 'md',
    maxHeight: '400px',
    multiple: false,
    showScrollbar: true,
    item1State: 'default',
    item2State: 'default',
    item3State: 'default',
    item4State: 'default',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    // Preview container
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    
    // Info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.padding = '16px';
    infoPanel.style.background = 'var(--ubits-bg-2, #f9fafb)';
    infoPanel.style.borderRadius = '8px';
    infoPanel.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    infoPanel.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong style="color: var(--ubits-fg-1-high, #303a47); font-size: 14px;">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--ubits-fg-1-medium, #5c646f);">
        <div><strong>Tamaño:</strong> ${args.size || 'md'}</div>
        <div><strong>Altura máxima:</strong> ${args.maxHeight || '400px'}</div>
        <div><strong>Selección múltiple:</strong> ${args.multiple ? 'Sí' : 'No'}</div>
        <div><strong>Scrollbar UBITS:</strong> ${args.showScrollbar ? 'Sí' : 'No'}</div>
        <div><strong>Item 1:</strong> ${args.item1State || 'default'}</div>
        <div><strong>Item 2:</strong> ${args.item2State || 'default'}</div>
        <div><strong>Item 3:</strong> ${args.item3State || 'default'}</div>
        <div><strong>Item 4:</strong> ${args.item4State || 'default'}</div>
      </div>
    `;
    
    // List container
    const listContainer = document.createElement('div');
    listContainer.id = args.containerId || 'list-story-container';
    listContainer.style.width = '100%';
    listContainer.style.maxWidth = '400px';
    
    // Si showScrollbar está activado, crear estructura con scrollbar UBITS
    if (args.showScrollbar) {
      listContainer.style.position = 'relative';
      
      // Crear contenedor interno para la lista
      const listWrapper = document.createElement('div');
      listWrapper.style.position = 'relative';
      listWrapper.style.width = '100%';
      
      const listInner = document.createElement('div');
      listInner.id = `${listContainer.id}-inner`;
      listInner.style.maxHeight = args.maxHeight || '400px';
      listInner.style.overflowY = 'auto';
      listInner.style.overflowX = 'hidden';
      listInner.style.msOverflowStyle = 'none';
      listInner.style.scrollbarWidth = 'none';
      listInner.style.paddingRight = '8px';
      
      // Contenedor para scrollbar UBITS
      const scrollbarContainer = document.createElement('div');
      scrollbarContainer.id = `${listContainer.id}-scrollbar`;
      scrollbarContainer.style.position = 'absolute';
      scrollbarContainer.style.top = '0';
      scrollbarContainer.style.right = '0';
      scrollbarContainer.style.width = '8px';
      scrollbarContainer.style.height = args.maxHeight || '400px'; // Misma altura que listInner
      scrollbarContainer.style.pointerEvents = 'none';
      
      listWrapper.appendChild(listInner);
      listWrapper.appendChild(scrollbarContainer);
      listContainer.appendChild(listWrapper);
      
      // Crear items con estados individuales
      const items = createItems(
        args.item1State || 'default',
        args.item2State || 'default',
        args.item3State || 'default',
        args.item4State || 'default'
      );
      
      // Crear lista directamente con HTML como en index.html
      // Generar 10 items para asegurar scroll
      const allItems = [
        ...items,
        { label: 'Item 5', state: 'default' as const },
        { label: 'Item 6', state: 'default' as const },
        { label: 'Item 7', state: 'default' as const },
        { label: 'Item 8', state: 'default' as const },
        { label: 'Item 9', state: 'default' as const },
        { label: 'Item 10', state: 'default' as const }
      ];
      
      const listId = `${listInner.id}-list`;
      const listHTML = renderList({
        containerId: listId,
        items: allItems,
        size: args.size || 'md',
        maxHeight: 'none',
        attributes: { id: listId } // Asegurar que el elemento tenga el ID
      });
      
      // Insertar el HTML directamente
      listInner.innerHTML = listHTML;
      
      // Asegurar que listInner tenga altura fija para que el scroll funcione
      const maxHeightValue = parseInt(args.maxHeight || '400px');
      listInner.style.height = `${maxHeightValue}px`;
      
      // Agregar estilo para ocultar scrollbar nativo
      const style = document.createElement('style');
      style.id = `scrollbar-hide-${listId}`;
      style.textContent = `#${listId}::-webkit-scrollbar { display: none; }`;
      document.head.appendChild(style);
      
      // Asegurar que el elemento .ubits-list tenga el ID correcto y estilos
      const listElementTemp = listInner.querySelector('.ubits-list') as HTMLElement;
      if (listElementTemp) {
        if (!listElementTemp.id) {
          listElementTemp.id = listId;
        }
        // Asegurar estilos de scroll
        listElementTemp.style.maxHeight = `${maxHeightValue}px`;
        listElementTemp.style.overflowY = 'auto';
        listElementTemp.style.overflowX = 'hidden';
        listElementTemp.style.paddingRight = '8px';
      }
      
      // Crear scrollbar UBITS después de que el DOM esté listo (como en index.html)
      setTimeout(async () => {
        console.log('📋 [List Storybook] ========== CREANDO SCROLLBAR ==========');
        // Buscar por ID primero, si no existe buscar por clase
        let listElement = document.getElementById(listId) as HTMLElement;
        if (!listElement) {
          listElement = listInner.querySelector('.ubits-list') as HTMLElement;
          if (listElement) {
            listElement.id = listId;
          }
        }
        console.log('📋 [List Storybook] listElement encontrado:', !!listElement, listId);
        console.log('📋 [List Storybook] scrollbarContainer:', scrollbarContainer.id);
        
        if (!listElement) {
          console.error('❌ [List Storybook] No se encontró el elemento con id:', listId);
          return;
        }
        
        console.log('📋 [List Storybook] listElement scrollHeight:', listElement.scrollHeight);
        console.log('📋 [List Storybook] listElement clientHeight:', listElement.clientHeight);
        console.log('📋 [List Storybook] listInner clientHeight:', listInner.clientHeight);
        console.log('📋 [List Storybook] Necesita scroll?', listElement.scrollHeight > listElement.clientHeight);
        
        // Comparar directamente como en index.html
        if (listElement.scrollHeight > listElement.clientHeight) {
          try {
            console.log('📋 [List Storybook] ✅ Scroll necesario, creando scrollbar UBITS...');
            
            // Usar createScrollbarLocal si está disponible (como en index.html), sino importar ScrollProvider
            let scrollbarInstance: any = null;
            
            if (typeof (window as any).createScrollbarLocal === 'function') {
              console.log('📋 [List Storybook] Usando createScrollbarLocal global');
              scrollbarInstance = (window as any).createScrollbarLocal(listElement, scrollbarContainer, 'vertical');
            } else {
              console.log('📋 [List Storybook] Importando ScrollProvider...');
              const { createScrollbar } = await import('../../addons/scroll/src/ScrollProvider');
              scrollbarInstance = createScrollbar({
                orientation: 'vertical',
                targetId: listElement.id,
                containerId: scrollbarContainer.id
              });
            }
            
            console.log('📋 [List Storybook] scrollbarInstance creada:', !!scrollbarInstance);
            
            if (scrollbarInstance) {
              scrollbarContainer.style.pointerEvents = 'auto';
              scrollbarContainer.style.height = `${listElement.clientHeight}px`;
              listElement._scrollbarInstance = scrollbarInstance;
              
              // Forzar que el scrollbar sea visible (como en index.html)
              setTimeout(() => {
                const scrollbarEl = scrollbarContainer.querySelector('.ubits-scrollbar');
                const barEl = scrollbarContainer.querySelector('.ubits-scrollbar__bar');
                if (scrollbarEl && barEl) {
                  (scrollbarEl as HTMLElement).style.display = 'flex';
                  (barEl as HTMLElement).style.opacity = '0.6';
                  (barEl as HTMLElement).style.pointerEvents = 'auto';
                  console.log('📋 [List Storybook] ✅ Scrollbar visible');
                }
              }, 50);
            }
          } catch (error) {
            console.error('❌ [List Storybook] Error creando scrollbar:', error);
          }
        } else {
          console.log('📋 [List Storybook] ⚠️ No se necesita scroll');
        }
        console.log('📋 [List Storybook] ========== FIN CREACIÓN SCROLLBAR ==========');
      }, 100); // Esperar 100ms como en index.html
    } else {
      // Sin scrollbar UBITS, solo scroll nativo (oculto)
      listContainer.style.maxHeight = args.maxHeight || '400px';
      listContainer.style.overflowY = 'auto';
      listContainer.style.msOverflowStyle = 'none';
      listContainer.style.scrollbarWidth = 'none';
      listContainer.style.setProperty('-webkit-scrollbar', 'display: none', 'important');
      
      // Crear items con estados individuales
      const items = createItems(
        args.item1State || 'default',
        args.item2State || 'default',
        args.item3State || 'default',
        args.item4State || 'default'
      );
      
      // Crear lista usando createList para funcionalidad completa
      try {
        const listOptions: ListOptions = {
          containerId: listContainer.id,
          items,
          size: args.size || 'md',
          maxHeight: 'none', // El scroll lo maneja el contenedor
          multiple: args.multiple || false,
          onSelectionChange: (selectedItem, index) => {
            console.log('List item selected:', { selectedItem, index });
          },
        };
        
        createList(listOptions);
      } catch (error) {
        // Si falla createList (porque el contenedor no está en DOM), usar renderList
        console.warn('Using renderList fallback:', error);
        const listHTML = renderList({
          containerId: listContainer.id,
          items,
          size: args.size || 'md',
          maxHeight: 'none',
        });
        listContainer.innerHTML = listHTML;
      }
    }
    
    preview.appendChild(infoPanel);
    preview.appendChild(listContainer);
    container.appendChild(preview);
    
    // Re-inicializar cuando cambian los argumentos (Storybook re-renderiza)
    const updateList = () => {
      try {
        const existingList = document.getElementById(listContainer.id);
        if (!existingList) return;
        
        // Limpiar y recrear completamente
        existingList.innerHTML = '';
        existingList.style.cssText = 'width: 100%; max-width: 400px;';
        
        // Recrear la estructura según showScrollbar
        if (args.showScrollbar) {
          existingList.style.position = 'relative';
          
          const listWrapper = document.createElement('div');
          listWrapper.style.position = 'relative';
          listWrapper.style.width = '100%';
          
          const listInner = document.createElement('div');
          listInner.id = `${listContainer.id}-inner`;
          listInner.style.maxHeight = args.maxHeight || '400px';
          listInner.style.overflowY = 'auto';
          listInner.style.overflowX = 'hidden';
          listInner.style.msOverflowStyle = 'none';
          listInner.style.scrollbarWidth = 'none';
          listInner.style.paddingRight = '8px';
          
          // Agregar estilo para ocultar scrollbar nativo
          const hideStyle = document.createElement('style');
          hideStyle.id = `scrollbar-hide-${listInner.id}`;
          hideStyle.textContent = `#${listInner.id}::-webkit-scrollbar { display: none; }`;
          document.head.appendChild(hideStyle);
          
          const scrollbarContainer = document.createElement('div');
          scrollbarContainer.id = `${listContainer.id}-scrollbar`;
          scrollbarContainer.style.position = 'absolute';
          scrollbarContainer.style.top = '0';
          scrollbarContainer.style.right = '0';
          scrollbarContainer.style.width = '8px';
          scrollbarContainer.style.height = '100%';
          scrollbarContainer.style.pointerEvents = 'none';
          
          listWrapper.appendChild(listInner);
          listWrapper.appendChild(scrollbarContainer);
          existingList.appendChild(listWrapper);
          
          const items = createItems(
            args.item1State || 'default',
            args.item2State || 'default',
            args.item3State || 'default',
            args.item4State || 'default'
          );
          
          const listOptions: ListOptions = {
            containerId: listInner.id,
            items,
            size: args.size || 'md',
            maxHeight: 'none',
            multiple: args.multiple || false,
            onSelectionChange: (selectedItem, index) => {
              console.log('List item selected:', { selectedItem, index });
            },
          };
          
          createList(listOptions);
          
          // Crear scrollbar UBITS
          setTimeout(async () => {
            console.log('📋 [List Storybook Update] ========== CREANDO SCROLLBAR ==========');
            const listElement = listInner.querySelector('.ubits-list') as HTMLElement;
            console.log('📋 [List Storybook Update] listElement encontrado:', !!listElement);
            
            if (!listElement) {
              console.error('❌ [List Storybook Update] No se encontró el elemento .ubits-list');
              return;
            }
            
            // Asignar un ID único al elemento de la lista si no lo tiene
            if (!listElement.id) {
              listElement.id = `${listContainer.id}-list-${Date.now()}`;
            }
            console.log('📋 [List Storybook Update] listElement.id:', listElement.id);
            console.log('📋 [List Storybook Update] scrollHeight:', listElement.scrollHeight);
            console.log('📋 [List Storybook Update] clientHeight:', listElement.clientHeight);
            
            if (listElement.scrollHeight > listElement.clientHeight) {
              try {
                console.log('📋 [List Storybook Update] ✅ Scroll necesario, creando scrollbar UBITS...');
                
                const { createScrollbar } = await import('../../addons/scroll/src/ScrollProvider');
                console.log('📋 [List Storybook Update] ScrollProvider importado:', !!createScrollbar);
                
                const scrollbarInstance = createScrollbar({
                  orientation: 'vertical',
                  targetId: listElement.id,
                  containerId: scrollbarContainer.id
                });
                
                console.log('📋 [List Storybook Update] scrollbarInstance creada:', !!scrollbarInstance);
                
                if (scrollbarInstance) {
                  scrollbarContainer.style.pointerEvents = 'auto';
                  scrollbarContainer.style.height = `${listElement.clientHeight}px`;
                  console.log('📋 [List Storybook Update] Altura del scrollbar container:', listElement.clientHeight);
                  
                  // Forzar que el scrollbar sea visible
                  setTimeout(() => {
                    const scrollbarEl = scrollbarContainer.querySelector('.ubits-scrollbar');
                    const barEl = scrollbarContainer.querySelector('.ubits-scrollbar__bar');
                    console.log('📋 [List Storybook Update] scrollbarEl encontrado:', !!scrollbarEl);
                    console.log('📋 [List Storybook Update] barEl encontrado:', !!barEl);
                    
                    if (scrollbarEl && barEl) {
                      const computed = window.getComputedStyle(scrollbarEl);
                      console.log('📋 [List Storybook Update] scrollbarEl computed styles:', {
                        display: computed.display,
                        opacity: computed.opacity,
                        width: computed.width,
                        height: computed.height
                      });
                      
                      // Forzar que el scrollbar sea visible con !important
                      (scrollbarEl as HTMLElement).style.cssText += 'display: flex !important; opacity: 1 !important; visibility: visible !important; width: 8px !important; height: 100% !important;';
                      (barEl as HTMLElement).style.cssText += 'opacity: 0.6 !important; pointer-events: auto !important; visibility: visible !important;';
                      
                      // Asegurar que el scrollbar container también sea visible
                      scrollbarContainer.style.cssText += 'opacity: 1 !important; visibility: visible !important;';
                      
                      // Llamar a updateScrollbar manualmente para asegurar que se actualice
                      if (scrollbarInstance && typeof scrollbarInstance.update === 'function') {
                        scrollbarInstance.update();
                        console.log('📋 [List Storybook Update] updateScrollbar llamado');
                      }
                      
                      console.log('📋 [List Storybook Update] ✅ Estilos inline aplicados');
                    } else {
                      console.error('❌ [List Storybook Update] No se encontraron elementos del scrollbar');
                    }
                  }, 100);
                }
              } catch (error) {
                console.error('❌ [List Storybook Update] Error:', error);
                console.error('❌ [List Storybook Update] Stack:', (error as Error).stack);
              }
            } else {
              console.log('📋 [List Storybook Update] ⚠️ No se necesita scroll');
            }
            console.log('📋 [List Storybook Update] ========== FIN ==========');
          }, 200);
        } else {
          existingList.style.maxHeight = args.maxHeight || '400px';
          existingList.style.overflowY = 'auto';
          existingList.style.msOverflowStyle = 'none';
          existingList.style.scrollbarWidth = 'none';
          
          const items = createItems(
            args.item1State || 'default',
            args.item2State || 'default',
            args.item3State || 'default',
            args.item4State || 'default'
          );
          
          const listOptions: ListOptions = {
            containerId: listContainer.id,
            items,
            size: args.size || 'md',
            maxHeight: 'none',
            multiple: args.multiple || false,
            onSelectionChange: (selectedItem, index) => {
              console.log('List item selected:', { selectedItem, index });
            },
          };
          
          createList(listOptions);
        }
      } catch (error) {
        console.warn('Could not initialize list:', error);
      }
    };
    
    // Esperar a que se monte en DOM para inicializar
    setTimeout(updateList, 100);
    
    // Re-inicializar cuando cambien los args (para Storybook)
    if (typeof window !== 'undefined') {
      const observer = new MutationObserver(() => {
        const existingList = document.getElementById(listContainer.id);
        if (existingList && !existingList.querySelector('.ubits-list')) {
          updateList();
        }
      });
      
      setTimeout(() => {
        const existingList = document.getElementById(listContainer.id);
        if (existingList) {
          observer.observe(existingList, { childList: true, subtree: true });
        }
      }, 200);
    }
    
    return container;
  },
};


