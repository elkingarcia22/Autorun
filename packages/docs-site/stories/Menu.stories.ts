import type { Meta, StoryObj } from '@storybook/html';
import { renderMenu, createMenu } from '../../addons/menu/src/MenuProvider';
import type { MenuOptions, MenuSection, MenuItem, MenuUserInfo } from '../../addons/menu/src/types/MenuOptions';
import '../../addons/menu/src/styles/menu.css';
import '../../addons/badge/src/styles/badge.css';

// Tipos extendidos para Storybook con controles individuales
interface MenuStoryArgs {
  logoImage?: string;
  appName?: string;
  logoHref?: string;
  width?: number | string;
  // Sección 1
  section1Title?: string;
  section1Item1Label?: string;
  section1Item1Icon?: string;
  section1Item1IconStyle?: 'regular' | 'solid';
  section1Item1Active?: boolean;
  section1Item1Disabled?: boolean;
  section1Item2Label?: string;
  section1Item2Icon?: string;
  section1Item2IconStyle?: 'regular' | 'solid';
  section1Item2Active?: boolean;
  section1Item2Disabled?: boolean;
  // Sección 2
  section2Title?: string;
  section2Item1Label?: string;
  section2Item1Icon?: string;
  section2Item1IconStyle?: 'regular' | 'solid';
  section2Item1Active?: boolean;
  section2Item1Disabled?: boolean;
  section2Item2Label?: string;
  section2Item2Icon?: string;
  section2Item2IconStyle?: 'regular' | 'solid';
  section2Item2Badge?: number;
  section2Item2BadgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  section2Item2Active?: boolean;
  section2Item2Disabled?: boolean;
  section2Item3Label?: string;
  section2Item3Icon?: string;
  section2Item3IconStyle?: 'regular' | 'solid';
  section2Item3Active?: boolean;
  section2Item3Disabled?: boolean;
  // Usuario
  userAvatarImage?: string;
  userName?: string;
  userRole?: string;
}

const meta: Meta<MenuStoryArgs> = {
  title: 'Components/Menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Menu UBITS de navegación lateral con secciones, items, shortcuts, badges e información de usuario. Usa tokens UBITS para colores, tipografía y espaciado.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    // Header
    logoImage: {
      control: { type: 'text' },
      description: 'URL de la imagen del logo',
      table: {
        category: 'Header',
        type: { summary: 'string' },
      },
    },
    appName: {
      control: { type: 'text' },
      description: 'Nombre de la aplicación',
      table: {
        category: 'Header',
        type: { summary: 'string' },
      },
    },
    logoHref: {
      control: { type: 'text' },
      description: 'URL a la que redirige el logo',
      table: {
        category: 'Header',
        type: { summary: 'string' },
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Ancho del menú en píxeles',
      table: {
        category: 'Layout',
        type: { summary: 'number' },
        defaultValue: { summary: 280 },
      },
    },
    // Sección 1
    section1Title: {
      control: { type: 'text' },
      description: 'Título de la primera sección',
      table: {
        category: 'Sección 1',
        type: { summary: 'string' },
      },
    },
    section1Item1Label: {
      control: { type: 'text' },
      description: 'Label del primer item de la sección 1',
      table: {
        category: 'Sección 1 - Item 1',
      },
    },
    section1Item1Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 1 - Item 1',
      },
    },
    section1Item1IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 1 - Item 1',
        defaultValue: { summary: 'regular' },
      },
    },
    section1Item1Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 1 - Item 1',
        defaultValue: { summary: false },
      },
    },
    section1Item1Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 1 - Item 1',
        defaultValue: { summary: false },
      },
    },
    section1Item2Label: {
      control: { type: 'text' },
      description: 'Label del segundo item de la sección 1',
      table: {
        category: 'Sección 1 - Item 2',
      },
    },
    section1Item2Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 1 - Item 2',
      },
    },
    section1Item2IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 1 - Item 2',
        defaultValue: { summary: 'regular' },
      },
    },
    section1Item2Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 1 - Item 2',
        defaultValue: { summary: false },
      },
    },
    section1Item2Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 1 - Item 2',
        defaultValue: { summary: false },
      },
    },
    // Sección 2
    section2Title: {
      control: { type: 'text' },
      description: 'Título de la segunda sección',
      table: {
        category: 'Sección 2',
        type: { summary: 'string' },
      },
    },
    section2Item1Label: {
      control: { type: 'text' },
      description: 'Label del primer item de la sección 2',
      table: {
        category: 'Sección 2 - Item 1',
      },
    },
    section2Item1Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 2 - Item 1',
      },
    },
    section2Item1IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 2 - Item 1',
        defaultValue: { summary: 'regular' },
      },
    },
    section2Item1Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 2 - Item 1',
        defaultValue: { summary: false },
      },
    },
    section2Item1Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 2 - Item 1',
        defaultValue: { summary: false },
      },
    },
    section2Item2Label: {
      control: { type: 'text' },
      description: 'Label del segundo item de la sección 2',
      table: {
        category: 'Sección 2 - Item 2',
      },
    },
    section2Item2Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 2 - Item 2',
      },
    },
    section2Item2IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: 'regular' },
      },
    },
    section2Item2Badge: {
      control: { type: 'number' },
      description: 'Número del badge (0 para ocultar)',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: 0 },
      },
    },
    section2Item2BadgeVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Variante del badge',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: 'primary' },
      },
    },
    section2Item2Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: false },
      },
    },
    section2Item2Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: false },
      },
    },
    section2Item3Label: {
      control: { type: 'text' },
      description: 'Label del tercer item de la sección 2',
      table: {
        category: 'Sección 2 - Item 3',
      },
    },
    section2Item3Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 2 - Item 3',
      },
    },
    section2Item3IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 2 - Item 3',
        defaultValue: { summary: 'regular' },
      },
    },
    section2Item3Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 2 - Item 3',
        defaultValue: { summary: false },
      },
    },
    section2Item3Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 2 - Item 3',
        defaultValue: { summary: false },
      },
    },
    // Usuario
    userAvatarImage: {
      control: { type: 'text' },
      description: 'URL de la imagen del avatar',
      table: {
        category: 'Usuario',
        type: { summary: 'string' },
      },
    },
    userName: {
      control: { type: 'text' },
      description: 'Nombre del usuario',
      table: {
        category: 'Usuario',
        type: { summary: 'string' },
      },
    },
    userRole: {
      control: { type: 'text' },
      description: 'Rol del usuario',
      table: {
        category: 'Usuario',
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<MenuStoryArgs>;

// Función helper para construir secciones desde los args
function buildSectionsFromArgs(args: MenuStoryArgs): MenuSection[] {
  const sections: MenuSection[] = [];

  // Sección 1
  if (args.section1Title) {
    const section1Items: MenuItem[] = [];
    
    if (args.section1Item1Label) {
      section1Items.push({
        id: 'section1-item1',
        label: args.section1Item1Label,
        icon: args.section1Item1Icon,
        iconStyle: args.section1Item1IconStyle || 'regular',
        active: args.section1Item1Active || false,
        disabled: args.section1Item1Disabled || false,
      });
    }
    
    if (args.section1Item2Label) {
      section1Items.push({
        id: 'section1-item2',
        label: args.section1Item2Label,
        icon: args.section1Item2Icon,
        iconStyle: args.section1Item2IconStyle || 'regular',
        active: args.section1Item2Active || false,
        disabled: args.section1Item2Disabled || false,
      });
    }

    if (section1Items.length > 0) {
      sections.push({
        id: 'section1',
        title: args.section1Title,
        items: section1Items,
      });
    }
  }

  // Sección 2
  if (args.section2Title) {
    const section2Items: MenuItem[] = [];
    
    if (args.section2Item1Label) {
      section2Items.push({
        id: 'section2-item1',
        label: args.section2Item1Label,
        icon: args.section2Item1Icon,
        iconStyle: args.section2Item1IconStyle || 'regular',
        active: args.section2Item1Active || false,
        disabled: args.section2Item1Disabled || false,
      });
    }
    
    if (args.section2Item2Label) {
      section2Items.push({
        id: 'section2-item2',
        label: args.section2Item2Label,
        icon: args.section2Item2Icon,
        iconStyle: args.section2Item2IconStyle || 'regular',
        badge: args.section2Item2Badge && args.section2Item2Badge > 0 
          ? { content: args.section2Item2Badge, variant: args.section2Item2BadgeVariant || 'primary' }
          : undefined,
        active: args.section2Item2Active || false,
        disabled: args.section2Item2Disabled || false,
      });
    }
    
    if (args.section2Item3Label) {
      section2Items.push({
        id: 'section2-item3',
        label: args.section2Item3Label,
        icon: args.section2Item3Icon,
        iconStyle: args.section2Item3IconStyle || 'regular',
        active: args.section2Item3Active || false,
        disabled: args.section2Item3Disabled || false,
      });
    }

    if (section2Items.length > 0) {
      sections.push({
        id: 'section2',
        title: args.section2Title,
        items: section2Items,
      });
    }
  }

  return sections;
}

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    // Header
    logoImage: '/images/autoframe-logo-light.svg',
    appName: 'AUTOFROME',
    logoHref: '#',
    width: 280,
    // Sección 1
    section1Title: 'Documents',
    section1Item1Label: 'New',
    section1Item1Icon: 'plus',
    section1Item1IconStyle: 'regular',
    section1Item1Active: false,
    section1Item1Disabled: false,
    section1Item2Label: 'Search',
    section1Item2Icon: 'search',
    section1Item2IconStyle: 'regular',
    section1Item2Active: false,
    section1Item2Disabled: false,
    // Sección 2
    section2Title: 'Profile',
    section2Item1Label: 'Settings',
    section2Item1Icon: 'gear',
    section2Item1IconStyle: 'regular',
    section2Item1Active: true,
    section2Item1Disabled: false,
    section2Item2Label: 'Messages',
    section2Item2Icon: 'envelope',
    section2Item2IconStyle: 'regular',
    section2Item2Badge: 2,
    section2Item2BadgeVariant: 'primary',
    section2Item2Active: false,
    section2Item2Disabled: false,
    section2Item3Label: 'Logout',
    section2Item3Icon: 'sign-out',
    section2Item3IconStyle: 'regular',
    section2Item3Active: false,
    section2Item3Disabled: false,
    // Usuario
    userAvatarImage: '/images/Profile-image.jpg',
    userName: 'Amy Elsner',
    userRole: 'Admin',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      min-height: 600px;
      background: var(--ubits-bg-2, #f3f3f4);
      border-radius: 8px;
      overflow: hidden;
    `;

    // Construir opciones del menú desde los args
    const sections = buildSectionsFromArgs(args);
    const userInfo: MenuUserInfo | undefined = args.userAvatarImage && args.userName && args.userRole
      ? {
          avatarImage: args.userAvatarImage,
          name: args.userName,
          role: args.userRole,
        }
      : undefined;

    const menuOptions: MenuOptions = {
      containerId: 'menu-story-container',
      logoImage: args.logoImage,
      appName: args.appName,
      logoHref: args.logoHref,
      width: args.width || 280,
      sections: sections,
      userInfo: userInfo,
      onActiveItemChange: (itemId, sectionId) => {
        // Handler para cambio de item activo
      },
      onAvatarClick: () => {
        // Handler para click en avatar
      },
    };

    // Contenedor del menú
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu-story-container';
    menuContainer.style.cssText = `
      position: relative;
      height: 600px;
      min-height: 600px;
      background: var(--ubits-bg-1, #ffffff);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;

    // Renderizar HTML directamente (sin containerId para evitar el error)
    const menuOptionsWithoutContainer: Omit<MenuOptions, 'containerId'> = {
      ...menuOptions,
    };
    delete (menuOptionsWithoutContainer as any).containerId;
    
    menuContainer.innerHTML = renderMenu(menuOptionsWithoutContainer);
    container.appendChild(menuContainer);

    // Inicializar eventos después de que el contenedor esté en el DOM
    requestAnimationFrame(() => {
      const menuEl = menuContainer.querySelector('.ubits-menu') as HTMLElement;
      if (menuEl) {
        // Inicializar eventos básicos
        const menuItems = menuEl.querySelectorAll('.ubits-menu-item');
        menuItems.forEach((itemElement) => {
          const itemId = itemElement.getAttribute('data-item-id');
          const sectionId = itemElement.getAttribute('data-section-id');
          
          if (!itemId || !sectionId) return;

          const section = menuOptions.sections.find(s => s.id === sectionId);
          const item = section?.items.find(i => i.id === itemId);
          
          if (!item) return;

          itemElement.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (item.disabled) return;

            menuItems.forEach(btn => btn.classList.remove('ubits-menu-item--active'));
            itemElement.classList.add('ubits-menu-item--active');

            if (menuOptions.onActiveItemChange) {
              menuOptions.onActiveItemChange(itemId, sectionId);
            }

            if (item.onClick) {
              item.onClick(e as MouseEvent, item);
            } else if (item.href) {
              window.location.href = item.href;
            }
          });
        });

        // Click en logo
        const logoElement = menuEl.querySelector('.ubits-menu-logo');
        if (logoElement && menuOptions.logoHref) {
          logoElement.addEventListener('click', () => {
            window.location.href = menuOptions.logoHref!;
          });
        }

        // Click en avatar
        const avatarElement = menuEl.querySelector('.ubits-menu-user-avatar');
        if (avatarElement && menuOptions.userInfo?.onAvatarClick) {
          avatarElement.addEventListener('click', (e) => {
            e.preventDefault();
            menuOptions.userInfo!.onAvatarClick!();
          });
        }
      }
    });

    // Panel de información (opcional, para mostrar detalles)
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      flex: 1;
      padding: 24px;
      background: var(--ubits-bg-1, #ffffff);
      border-left: 1px solid var(--ubits-border-1);
      overflow-y: auto;
    `;

    const infoContent = document.createElement('div');
    infoContent.style.cssText = `
      font-family: var(--font-sans);
      color: var(--ubits-fg-1-medium);
      font-size: 14px;
      line-height: 1.6;
    `;

    infoContent.innerHTML = `
      <h3 style="margin: 0 0 16px 0; color: var(--ubits-fg-1-high); font-weight: 600;">Componente Menu</h3>
      <p style="margin: 0 0 12px 0;">Este componente muestra un menú lateral con:</p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li>Logo de Autoframe y nombre de la aplicación</li>
        <li>Secciones con títulos</li>
        <li>Items con iconos, texto y badges</li>
        <li>Información del usuario al final</li>
      </ul>
      <p style="margin: 0 0 12px 0; font-weight: 600;">Características:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Usa tokens UBITS para colores, tipografía y espaciado</li>
        <li>Soporta items activos, deshabilitados</li>
        <li>Badges de UBITS con diferentes variantes</li>
        <li>Responsive design</li>
      </ul>
      <p style="margin: 16px 0 0 0; padding-top: 16px; border-top: 1px solid var(--ubits-border-1);">
        <strong>Nota:</strong> Usa los controles en el panel lateral para personalizar todos los aspectos del menú.
      </p>
    `;

    infoPanel.appendChild(infoContent);
    container.appendChild(infoPanel);

    return container;
  },
};

