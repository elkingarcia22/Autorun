import type { Meta, StoryObj } from '@storybook/html';
import { renderSidebar, createSidebar } from '../../addons/sidebar/src/SidebarProvider';
import { getSidebarConfig } from '../../addons/sidebar/src/configs/sidebarVariants';
import type { SidebarOptions, SidebarVariant } from '../../addons/sidebar/src/types/SidebarOptions';

const meta: Meta<SidebarOptions & { 
  variant?: SidebarVariant;
  activeButton?: string;
}> = {
  title: 'Navegación/Sidebar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Sidebar UBITS de navegación lateral con 2 variantes (colaborador y admin). Incluye tooltips, menú de perfil, dark mode toggle y ajuste dinámico de altura. Ancho fijo 96px, colores fijos (no cambian con tema).'
}
},
    layout: 'fullscreen'
},
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['colaborador', 'admin'],
      description: 'Variante del sidebar: colaborador o admin',
      table: {
        defaultValue: { summary: 'colaborador' },
        type: { summary: 'colaborador | admin' }
}
},
    activeButton: {
      control: { type: 'select' },
      options: ['', 'admin', 'aprendizaje', 'diagnóstico', 'desempeño', 'encuestas', 'reclutamiento', 'tareas', 'ubits-ai', 'inicio', 'empresa'],
      description: 'Sección activa del sidebar (depende de la variante)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' }
}
},
    darkModeEnabled: {
      control: { type: 'boolean' },
      description: 'Si el dark mode toggle está habilitado',
      table: {
        defaultValue: { summary: 'true' }
}
}
}
};

export default meta;
type Story = StoryObj<SidebarOptions & { variant?: SidebarVariant; activeButton?: string }>;

// Función helper para obtener configuración según variante
function getSidebarButtons(variant: SidebarVariant) {
  const config = getSidebarConfig(variant);
  return {
    bodyButtons: config.bodyButtons,
    footerButtons: config.footerButtons,
    profileMenuItems: config.profileMenuItems
  };
}

// Función para actualizar botón activo
function updateActiveButton(buttons: any[], activeButton: string) {
  return buttons.map(btn => ({
    ...btn,
    state: btn.section === activeButton ? 'active' as const : 'default' as const
  }));
}

export const Default: Story = {
  args: {
    containerId: 'sidebar-story-container',
    variant: 'colaborador',
    activeButton: '',
    darkModeEnabled: true,
    logoImage: '/images/Ubits-logo.svg',
    avatarImage: '/images/Profile-image.jpg'
} as SidebarOptions & { variant?: SidebarVariant; activeButton?: string },
  render: (args) => {
    // Crear un wrapper más amplio para el sidebar y la info (horizontal)
    let wrapper = document.getElementById('sidebar-story-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'sidebar-story-wrapper';
      wrapper.style.cssText = `
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      `;
      document.body.appendChild(wrapper);
    } else {
      wrapper.innerHTML = '';
      wrapper.style.cssText = `
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      `;
    }
    
    // Contenedor solo para el sidebar
    const container = document.createElement('div');
    container.id = args.containerId || 'sidebar-story-container';
    container.style.cssText = `
      position: relative;
      width: 96px;
      height: 650px;
      flex-shrink: 0;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

    // Agregar el contenedor al wrapper ANTES de crear el sidebar
    wrapper.appendChild(container);

    const variant = args.variant || 'colaborador';
    const activeButton = args.activeButton || '';
    const config = getSidebarButtons(variant);
    
    // Actualizar botones con estado activo
    const bodyButtons = updateActiveButton(config.bodyButtons, activeButton);
    const footerButtons = activeButton ? updateActiveButton(config.footerButtons || [], activeButton) : config.footerButtons || [];

    const sidebarOptions: SidebarOptions = {
      containerId: container.id,
      variant: variant,
      bodyButtons: bodyButtons,
      footerButtons: footerButtons,
      profileMenuItems: config.profileMenuItems,
      logoHref: variant === 'admin' ? 'admin.html' : 'index.html',
      logoImage: args.logoImage || '/images/Ubits-logo.svg',
      avatarImage: args.avatarImage || '/images/Profile-image.jpg',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650,
      onActiveButtonChange: (section) => {
        // Active button changed
      },
      onDarkModeToggle: (isDark) => {
        // Dark mode toggled
        // NO actualizar el body/document, solo el contenedor (ya se hace en initDarkModeToggle)
      },
      onAvatarClick: () => {
        // Avatar clicked
      }
    };

    try {
      // El contenedor ya está en el DOM, ahora podemos crear el sidebar
      createSidebar(sidebarOptions);
    } catch (error) {
      console.error('Error creating sidebar:', error);
      // Fallback: renderizar HTML estático
      const sidebarHTML = renderSidebar(sidebarOptions);
      container.innerHTML = sidebarHTML;
    }

    // Agregar información del sidebar (formato horizontal con CSS Grid) - AL LADO del sidebar
    const info = document.createElement('div');
    info.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-2);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      line-height: 1.6;
      flex: 1;
      min-width: 400px;
      max-width: 600px;
      font-family: var(--font-family-noto-sans-font-family);
      margin-top: 80px;
    `;
    
    // Crear el contenedor de información usando CSS Grid
    const infoGrid = document.createElement('div');
    infoGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 12px 32px;
      margin-bottom: 12px;
      align-items: baseline;
    `;
    
    infoGrid.innerHTML = `
      <div style="white-space: nowrap;"><strong>Variante:</strong> <span style="font-weight: 400;">${variant === 'colaborador' ? 'Colaborador' : 'Admin'}</span></div>
      <div style="white-space: nowrap;"><strong>Botón activo:</strong> <span style="font-weight: 400;">${activeButton || 'Ninguno'}</span></div>
      <div style="white-space: nowrap;"><strong>Dark mode:</strong> <span style="font-weight: 400;">${args.darkModeEnabled !== false ? 'Habilitado' : 'Deshabilitado'}</span></div>
    `;
    
    info.appendChild(infoGrid);
    
    // Agregar el texto de instrucciones
    const instructions = document.createElement('div');
    instructions.style.cssText = `
      border-top: 1px solid var(--modifiers-normal-color-light-border-1);
      font-style: italic;
    `;
    instructions.textContent = 'Haz hover sobre los botones para ver los tooltips. Haz hover sobre el avatar para ver el menú de perfil. Haz clic en el botón de dark mode para cambiar el tema.';
    info.appendChild(instructions);
    
    wrapper.appendChild(info);

    return wrapper;
  }
};

