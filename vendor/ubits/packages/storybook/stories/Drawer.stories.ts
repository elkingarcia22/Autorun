import type { Meta, StoryObj } from '@storybook/html';
import { createDrawer } from '../../addons/drawer/src/DrawerProvider';
import type { DrawerOptions } from '../../addons/drawer/src/types/DrawerOptions';
import { renderButton } from '../../addons/button/src/ButtonProvider';
import '../../addons/drawer/src/styles/drawer.css';
import '../../addons/button/src/styles/button.css';

const meta: Meta<DrawerOptions> = {
  title: 'Feedback/Drawer Navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Drawer Navigation UBITS que se desliza desde la derecha de la pantalla. Ideal para formularios, filtros o vistas de detalle. Soporta diferentes anchos, un header con título y texto complementario, un body con contenido scrollable y un footer con botones de acción.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título principal del drawer.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Crear dato demográfico' },
        category: 'Contenido',
      },
    },
    complementaryText: {
      control: { type: 'text' },
      description: 'Texto secundario opcional que aparece debajo del título.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'select' },
      options: [100, 80, 60, 50, 40, 30],
      description: 'Ancho del drawer como porcentaje del viewport (100, 80, 60, 50, 40, 30). En móvil siempre es 100%.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 40 },
        category: 'Apariencia',
      },
    },
    bodyContent: {
      control: { type: 'text' },
      description: 'Contenido HTML del cuerpo del drawer. Puede ser una cadena HTML o una función que devuelve HTML.',
      table: {
        type: { summary: 'string | (() => string)' },
        defaultValue: { summary: '...' },
        category: 'Contenido',
      },
    },
    'footerButtons.tertiary.label': {
      control: { type: 'text' },
      name: 'Label Botón Terciario',
      description: 'Label del botón terciario (izquierda del footer).',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.tertiary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Terciario',
      description: 'Controla la visibilidad del botón terciario.',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.secondary.label': {
      control: { type: 'text' },
      name: 'Label Botón Secundario',
      description: 'Label del botón secundario (derecha del footer).',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.secondary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Secundario',
      description: 'Controla la visibilidad del botón secundario.',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.primary.label': {
      control: { type: 'text' },
      name: 'Label Botón Primario',
      description: 'Label del botón primario (derecha del footer).',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.primary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Primario',
      description: 'Controla la visibilidad del botón primario.',
      table: { category: 'Footer Buttons' },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: 'Si el drawer se cierra al hacer clic fuera de él.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
        category: 'Comportamiento',
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback que se ejecuta cuando el drawer se cierra.',
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DrawerOptions>;

export const Default: Story = {
  args: {
    title: 'Crear dato demográfico',
    complementaryText: '',
    width: 40,
    bodyContent: `
      <div style="padding: 16px;">
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--modifiers-normal-color-light-fg-1-medium); margin-bottom: 8px;">Pregunta</label>
          <textarea placeholder="Escribe tu pregunta aquí..." style="width: 100%; min-height: 100px; padding: 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); resize: vertical; box-sizing: border-box;"></textarea>
        </div>
        <div style="margin-bottom: 16px; padding: 12px; background: var(--modifiers-normal-color-light-feedback-bg-info-subtle-default); border-radius: 8px; display: flex; align-items: flex-start; gap: 8px;">
          <i class="far fa-info-circle" style="color: var(--modifiers-normal-color-light-feedback-fg-info-subtle-default); font-size: 16px; margin-top: 2px;"></i>
          <p style="margin: 0; font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);">Debes tener al menos dos opciones de respuesta</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium); min-width: 20px;">1</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); box-sizing: border-box;">
            ${renderButton({
              variant: 'tertiary',
              size: 'sm',
              icon: 'trash',
              iconStyle: 'regular',
              iconOnly: true
            })}
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium); min-width: 20px;">2</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); box-sizing: border-box;">
            ${renderButton({
              variant: 'tertiary',
              size: 'sm',
              icon: 'trash',
              iconStyle: 'regular',
              iconOnly: true
            })}
          </div>
        </div>
        <button style="margin-top: 16px; padding: 10px 12px; border: 1px dashed var(--modifiers-normal-color-light-border-1); background: transparent; border-radius: 8px; color: var(--modifiers-normal-color-light-fg-1-medium); font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); cursor: pointer; display: flex; align-items: center; gap: 8px; width: 100%;">
          <i class="far fa-plus"></i>
          <span>Añadir opción de respuesta</span>
        </button>
      </div>
    `,
    'footerButtons.tertiary.label': 'Cancelar',
    'footerButtons.tertiary.enabled': true,
    'footerButtons.secondary.label': 'Guardar',
    'footerButtons.secondary.enabled': true,
    'footerButtons.primary.label': 'Crear',
    'footerButtons.primary.enabled': true,
    closeOnOverlayClick: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.id = 'drawer-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';
    
    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.innerHTML = '<span>Abrir Drawer</span>';
    openButton.style.width = 'auto';
    openButton.style.minWidth = 'auto';
    
    let drawerInstance: ReturnType<typeof createDrawer> | null = null;
    
    const handleOpenDrawer = () => {
      if (!drawerInstance) {
        // Construir footerButtons desde los args individuales
        const footerButtons: any = {};
        
        if (args['footerButtons.tertiary.enabled']) {
          footerButtons['tertiary'] = {
            label: args['footerButtons.tertiary.label'] || 'Cancelar',
            onClick: () => {
              // Botón Tertiary clickeado
            },
          };
        }
        
        if (args['footerButtons.secondary.enabled']) {
          footerButtons['secondary'] = {
            label: args['footerButtons.secondary.label'] || 'Guardar',
            onClick: () => {
              // Botón Secondary clickeado
            },
          };
        }
        
        if (args['footerButtons.primary.enabled']) {
          footerButtons['primary'] = {
            label: args['footerButtons.primary.label'] || 'Crear',
            onClick: () => {
              // Botón Primary clickeado
            },
          };
        }
        
        drawerInstance = createDrawer({
          title: args.title,
          complementaryText: args.complementaryText,
          width: args.width,
          bodyContent: args.bodyContent,
          footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined,
          containerId: undefined, // Añadir al body, no al contenedor
          closeOnOverlayClick: args.closeOnOverlayClick,
          onClose: () => {
            if (args.onClose) {
              args.onClose();
            }
            // Limpiar la instancia
            if (drawerInstance && drawerInstance.element) {
              drawerInstance.element.remove();
            }
            drawerInstance = null;
            // Restaurar el botón
            openButton.style.display = 'flex';
            openButton.style.visibility = 'visible';
          },
          open: true,
        });
        
        // Ocultar el botón
        openButton.style.display = 'none';
        openButton.style.visibility = 'hidden';
      }
    };
    
    openButton.addEventListener('click', handleOpenDrawer);
    
    container.appendChild(openButton);
    
    return container;
  },
};

