import type { Meta, StoryObj } from '@storybook/html';
import { createDrawer, renderDrawer } from '../../addons/drawer/src/DrawerProvider';
import type { DrawerOptions } from '../../addons/drawer/src/types/DrawerOptions';
import '../../addons/drawer/src/styles/drawer.css';
import '../../addons/button/src/styles/button.css';

const meta: Meta<DrawerOptions> = {
  title: 'Components/Drawer Navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Drawer Navigation UBITS que sale de izquierda a derecha con overlay. Se usa para vistas de elementos, filtros en tablas, etc. Tiene diferentes tamaños horizontalmente (100%, 80%, 60%, 50%, 40%, 30%). Incluye header con título y botón de cerrar, body con contenido scrollable y footer con botones primario, secundario y terciario.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del drawer (requerido)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Título del drawer' },
        category: 'Contenido',
      },
    },
    complementaryText: {
      control: { type: 'text' },
      description: 'Text complementario opcional debajo del título',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'select' },
      options: [100, 80, 60, 50, 40, 30],
      description: 'Ancho del drawer como porcentaje del viewport (100%, 80%, 60%, 50%, 40%, 30%)',
      table: {
        defaultValue: { summary: 40 },
        type: { summary: '100 | 80 | 60 | 50 | 40 | 30' },
        category: 'Apariencia',
      },
    },
    bodyContent: {
      control: { type: 'text' },
      description: 'Contenido del body del drawer (HTML string)',
      table: {
        type: { summary: 'string | (() => string)' },
        defaultValue: { summary: '<p>Contenido del drawer</p>' },
        category: 'Contenido',
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Si el drawer está abierto inicialmente',
      table: {
        defaultValue: { summary: false },
        category: 'Comportamiento',
      },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: 'Si se debe cerrar al hacer clic en el overlay',
      table: {
        defaultValue: { summary: true },
        category: 'Comportamiento',
      },
    },
    footerButtons: {
      control: { type: 'object' },
      description: 'Configuración de botones del footer',
      table: {
        type: { summary: 'object' },
        category: 'Footer',
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback cuando se hace clic en el botón de cerrar',
      table: {
        disable: true,
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Avanzado',
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
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--ubits-fg-1-medium); margin-bottom: 8px;">Pregunta</label>
          <textarea placeholder="Escribe tu pregunta aquí..." style="width: 100%; min-height: 100px; padding: 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); resize: vertical; box-sizing: border-box;"></textarea>
        </div>
        <div style="margin-bottom: 16px; padding: 12px; background: var(--ubits-feedback-bg-info-subtle); border-radius: 8px; display: flex; align-items: flex-start; gap: 8px;">
          <i class="far fa-info-circle" style="color: var(--ubits-feedback-fg-info-subtle); font-size: 16px; margin-top: 2px;"></i>
          <p style="margin: 0; font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium);">Debes tener al menos dos opciones de respuesta</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium); min-width: 20px;">1</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); box-sizing: border-box;">
            <button style="padding: 8px; border: none; background: transparent; color: var(--ubits-fg-1-medium); cursor: pointer; border-radius: 4px;">
              <i class="far fa-trash"></i>
            </button>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--font-body-sm-size, 13px); color: var(--ubits-fg-1-medium); min-width: 20px;">2</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--ubits-border-1); border-radius: 8px; font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); box-sizing: border-box;">
            <button style="padding: 8px; border: none; background: transparent; color: var(--ubits-fg-1-medium); cursor: pointer; border-radius: 4px;">
              <i class="far fa-trash"></i>
            </button>
          </div>
        </div>
        <button style="margin-top: 16px; padding: 10px 12px; border: 1px dashed var(--ubits-border-1); background: transparent; border-radius: 8px; color: var(--ubits-fg-1-medium); font-family: var(--font-sans); font-size: var(--font-body-sm-size, 13px); cursor: pointer; display: flex; align-items: center; gap: 8px; width: 100%;">
          <i class="far fa-plus"></i>
          <span>Añadir opción de respuesta</span>
        </button>
      </div>
    `,
    footerButtons: {
      tertiary: {
        label: 'Cancelar',
        onClick: () => {
          console.log('Botón Tertiary clickeado');
        },
      },
      secondary: {
        label: 'Guardar',
        onClick: () => {
          console.log('Botón Secondary clickeado');
        },
      },
      primary: {
        label: 'Crear',
        onClick: () => {
          console.log('Botón Primary clickeado');
        },
      },
    },
    open: false,
    closeOnOverlayClick: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.id = 'drawer-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--ubits-bg-2, #f9fafb)';
    
    // Crear botón para abrir el drawer
    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.style.position = 'absolute';
    openButton.style.top = '50%';
    openButton.style.left = '50%';
    openButton.style.transform = 'translate(-50%, -50%)';
    openButton.style.zIndex = '100';
    openButton.innerHTML = '<span>Abrir Drawer</span>';
    
    let drawerInstance: ReturnType<typeof createDrawer> | null = null;
    
    openButton.addEventListener('click', () => {
      if (!drawerInstance) {
        drawerInstance = createDrawer({
          ...args,
          containerId: container.id,
          onClose: () => {
            if (args.onClose) {
              args.onClose();
            }
            drawerInstance = null;
          },
        });
        drawerInstance.open();
        openButton.style.display = 'none';
      }
    });
    
    container.appendChild(openButton);
    
    return container;
  },
};

