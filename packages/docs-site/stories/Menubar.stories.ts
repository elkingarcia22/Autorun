import type { Meta, StoryObj } from '@storybook/html';
import { renderMenubar, createMenubar } from '../../addons/menubar/src/MenubarProvider';
import type { MenubarOptions, MenubarItem } from '../../addons/menubar/src/types/MenubarOptions';
import '../../addons/menubar/src/styles/menubar.css';

/**
 * Menubar Component Stories
 * 
 * Componente de menubar horizontal con soporte para dropdowns y submenús anidados.
 * Usa tokens UBITS para colores, tipografía y espaciado.
 */
const meta: Meta<MenubarOptions & {
  itemCount?: number;
  showIcons?: boolean;
  hasDropdowns?: boolean;
  hasNestedSubmenus?: boolean;
  activeItemId?: string;
}> = {
  title: 'Components/Menubar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Menubar UBITS de navegación horizontal con soporte para dropdowns y submenús anidados. Usa tokens UBITS para colores, tipografía y espaciado. Soporta iconos, estados activos, deshabilitados y menús de múltiples niveles. El estado active usa el mismo color que el botón en modo active.',
      },
    },
  },
  argTypes: {
    itemCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de items en el menubar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    hasDropdowns: {
      control: { type: 'boolean' },
      description: 'Incluir items con dropdowns',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    hasNestedSubmenus: {
      control: { type: 'boolean' },
      description: 'Incluir submenús anidados (nivel 3)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    activeItemId: {
      control: { type: 'text' },
      description: 'ID del item activo (ej: home, features, projects, contact, components, blocks, ui-kit, templates)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'projects' },
      },
    },
    items: {
      control: false,
      description: 'Items del menubar (configurado automáticamente)',
    },
  },
};

export default meta;
type Story = StoryObj<MenubarOptions & {
  itemCount?: number;
  showIcons?: boolean;
  hasDropdowns?: boolean;
  hasNestedSubmenus?: boolean;
  activeItemId?: string;
}>;

// Función helper para crear items de ejemplo
function createExampleItems(
  itemCount: number = 4,
  showIcons: boolean = true,
  hasDropdowns: boolean = true,
  hasNestedSubmenus: boolean = false,
  activeItemId: string = 'projects'
): MenubarItem[] {
  const items: MenubarItem[] = [];
  
  // Item Home (sin dropdown)
  items.push({
    id: 'home',
    label: 'Home',
    icon: showIcons ? 'house' : undefined,
    iconStyle: 'regular',
    href: '#',
    active: activeItemId === 'home',
  });

  // Item Features (sin dropdown)
  if (itemCount > 1) {
    items.push({
      id: 'features',
      label: 'Features',
      icon: showIcons ? 'star' : undefined,
      iconStyle: 'regular',
      href: '#',
      active: activeItemId === 'features',
    });
  }

  // Item Projects (con dropdown)
  if (itemCount > 2 && hasDropdowns) {
    items.push({
      id: 'projects',
      label: 'Projects',
      icon: showIcons ? 'magnifying-glass' : undefined,
      iconStyle: 'regular',
      active: activeItemId === 'projects',
      submenu: [
        {
          id: 'components',
          label: 'Components',
          icon: showIcons ? 'bolt' : undefined,
          iconStyle: 'regular',
          href: '#',
          active: activeItemId === 'components',
          ...(hasNestedSubmenus ? {
            submenu: [
              {
                id: 'button',
                label: 'Button',
                icon: showIcons ? 'circle' : undefined,
                iconStyle: 'regular',
                href: '#',
              },
              {
                id: 'input',
                label: 'Input',
                icon: showIcons ? 'square' : undefined,
                iconStyle: 'regular',
                href: '#',
              },
            ],
          } : {}),
        },
        {
          id: 'blocks',
          label: 'Blocks',
          icon: showIcons ? 'grid-2' : undefined,
          iconStyle: 'regular',
          href: '#',
          active: activeItemId === 'blocks',
        },
        {
          id: 'ui-kit',
          label: 'UI Kit',
          icon: showIcons ? 'pencil' : undefined,
          iconStyle: 'regular',
          href: '#',
          active: activeItemId === 'ui-kit',
        },
        {
          id: 'templates',
          label: 'Templates',
          icon: showIcons ? 'palette' : undefined,
          iconStyle: 'regular',
          ...(hasNestedSubmenus ? {
            submenu: [
              {
                id: 'admin',
                label: 'Admin',
                icon: showIcons ? 'user-shield' : undefined,
                iconStyle: 'regular',
                href: '#',
              },
              {
                id: 'colaborador',
                label: 'Colaborador',
                icon: showIcons ? 'user' : undefined,
                iconStyle: 'regular',
                href: '#',
              },
            ],
          } : {
            href: '#',
          }),
        },
      ],
    });
  } else if (itemCount > 2) {
    items.push({
      id: 'projects',
      label: 'Projects',
      icon: showIcons ? 'magnifying-glass' : undefined,
      iconStyle: 'regular',
      href: '#',
      active: activeItemId === 'projects',
    });
  }

  // Item Contact (sin dropdown)
  if (itemCount > 3) {
    items.push({
      id: 'contact',
      label: 'Contact',
      icon: showIcons ? 'envelope' : undefined,
      iconStyle: 'regular',
      href: '#',
      active: activeItemId === 'contact',
    });
  }

  // Items adicionales si itemCount > 4
  for (let i = 4; i < itemCount; i++) {
    items.push({
      id: `item-${i}`,
      label: `Item ${i}`,
      icon: showIcons ? 'circle' : undefined,
      iconStyle: 'regular',
      href: '#',
      active: activeItemId === `item-${i}`,
    });
  }

  return items;
}

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    itemCount: 4,
    showIcons: true,
    hasDropdowns: true,
    hasNestedSubmenus: false,
    activeItemId: 'projects',
    items: createExampleItems(4, true, true, false, 'projects'),
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: var(--ubits-spacing-lg, 24px);
      padding: var(--ubits-spacing-lg, 24px);
      background: var(--ubits-bg-2, #f3f3f4);
      border-radius: var(--ubits-border-radius-md, 8px);
      min-height: 200px;
    `;

    // Contenedor del menubar
    const menubarContainer = document.createElement('div');
    menubarContainer.id = 'menubar-story-container';
    menubarContainer.style.cssText = `
      position: relative;
      background: var(--ubits-bg-1, #ffffff);
      border-radius: var(--ubits-border-radius-md, 8px);
      padding: var(--ubits-spacing-md, 16px);
    `;

    // Agregar el contenedor al DOM primero
    container.appendChild(menubarContainer);

    // Crear items dinámicamente basados en los controles
    const items = createExampleItems(
      args.itemCount || 4,
      args.showIcons !== false,
      args.hasDropdowns !== false,
      args.hasNestedSubmenus === true,
      args.activeItemId || 'projects'
    );

    // Renderizar menubar después de que el contenedor esté en el DOM
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const existingContainer = document.getElementById('menubar-story-container');
      if (!existingContainer) return;

      // Limpiar contenedor antes de renderizar
      existingContainer.innerHTML = '';

      try {
        const menubarElement = createMenubar({
          items,
          containerId: 'menubar-story-container',
          onActiveItemChange: (itemId, parentId) => {
            console.log('Active item changed:', { itemId, parentId });
          },
          onItemClick: (itemId, item) => {
            console.log('Item clicked:', { itemId, item });
          },
        });

        // Aplicar estado active basado en los items
        items.forEach(item => {
          if (item.active) {
            const itemElement = menubarElement.querySelector(`.ubits-menubar-item[data-item-id="${item.id}"]`);
            if (itemElement) {
              itemElement.classList.add('ubits-menubar-item--active');
            }
          }
          // También verificar subitems
          if (item.submenu) {
            item.submenu.forEach(subItem => {
              if (subItem.active) {
                const subItemElement = menubarElement.querySelector(`[data-item-id="${subItem.id}"][data-parent-id="${item.id}"]`);
                if (subItemElement) {
                  subItemElement.classList.add('ubits-menubar-submenu-item--active');
                }
              }
              // Verificar submenús anidados
              if (subItem.submenu) {
                subItem.submenu.forEach(nestedItem => {
                  if (nestedItem.active) {
                    const nestedElement = menubarElement.querySelector(`[data-item-id="${nestedItem.id}"]`);
                    if (nestedElement) {
                      nestedElement.classList.add('ubits-menubar-submenu-item--active');
                    }
                  }
                });
              }
            });
          }
        });
      } catch (error) {
        console.error('Error creating menubar:', error);
        // Fallback: renderizar HTML estático
        existingContainer.innerHTML = renderMenubar({
          items,
          containerId: 'menubar-story-container',
        });
      }
    });

    // Panel de información (opcional, para mostrar detalles)
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      padding: var(--ubits-spacing-md, 16px);
      background: var(--ubits-bg-1, #ffffff);
      border-radius: var(--ubits-border-radius-md, 8px);
      border: 1px solid var(--ubits-border-1);
    `;

    const infoContent = document.createElement('div');
    infoContent.style.cssText = `
      font-family: var(--font-sans);
      color: var(--ubits-fg-1-medium);
      font-size: var(--font-body-sm-size);
      line-height: var(--font-body-sm-line);
    `;

    infoContent.innerHTML = `
      <h3 style="margin: 0 0 12px 0; color: var(--ubits-fg-1-high); font-weight: 600; font-size: var(--font-body-md-size);">Componente Menubar</h3>
      <p style="margin: 0 0 12px 0;">Este componente muestra un menubar horizontal con:</p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li>Items de navegación con iconos opcionales</li>
        <li>Dropdowns con submenús</li>
        <li>Soporte para submenús anidados (nivel 3)</li>
        <li>Estados activos y deshabilitados</li>
        <li>Navegación por URL o callbacks</li>
      </ul>
      <p style="margin: 0 0 12px 0; font-weight: 600;">Características:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Usa tokens UBITS para colores, tipografía y espaciado</li>
        <li>Soporta iconos FontAwesome (regular/solid)</li>
        <li>Dropdowns con animaciones suaves</li>
        <li>Submenús anidados con posicionamiento inteligente</li>
        <li>Responsive design</li>
        <li>Accesibilidad (ARIA attributes)</li>
      </ul>
    `;

    infoPanel.appendChild(infoContent);
    container.appendChild(infoPanel);

    return container;
  },
};

