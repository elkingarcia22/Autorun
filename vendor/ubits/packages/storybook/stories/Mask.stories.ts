import type { Meta, StoryObj } from '@storybook/html';
import { createMask } from '../../components/mask/src/MaskProvider';
import type { MaskOptions } from '../../components/mask/src/types/MaskOptions';
import { createButton } from '../../components/button/src/ButtonProvider';
import '../../components/mask/src/styles/mask.css';
import '../../components/popover/src/styles/popover.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<MaskOptions & {
  'popover.footerButtons.tertiary.enabled'?: boolean;
  'popover.footerButtons.secondary.enabled'?: boolean;
  'popover.footerButtons.primary.enabled'?: boolean;
}> = {
  title: 'Feedback/Mask',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Mask UBITS para onboarding. Crea un overlay oscuro con un "agujero" que destaca un elemento específico de la interfaz. Incluye un Popover integrado para mostrar información o instrucciones. Ideal para guías de usuario, tutoriales y flujos de onboarding.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    targetElement: {
      control: { type: 'text' },
      description: 'Selector CSS o elemento HTML que se quiere destacar.',
      table: {
        type: { summary: 'string | HTMLElement' },
        category: 'Configuración',
      },
    },
    'popover.title': {
      control: { type: 'text' },
      name: 'Título del Popover',
      description: 'Título del popover que se muestra en la máscara.',
      table: { category: 'Popover' },
    },
    'popover.bodyContent': {
      control: { type: 'text' },
      name: 'Contenido del Popover',
      description: 'Contenido HTML del popover.',
      table: { category: 'Popover' },
    },
    'popover.width': {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      name: 'Ancho del Popover',
      description: 'Ancho del popover.',
      table: { category: 'Popover' },
    },
    popoverPosition: {
      control: { type: 'select' },
      options: ['auto', 'top', 'bottom', 'left', 'right'],
      description: 'Posición del popover relativa al elemento destacado.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
        category: 'Configuración',
      },
    },
    popoverOffset: {
      control: { type: 'number' },
      description: 'Offset del popover desde el elemento destacado (en píxeles).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '12' },
        category: 'Configuración',
      },
    },
    padding: {
      control: { type: 'number' },
      description: 'Padding adicional alrededor del elemento destacado (en píxeles).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
        category: 'Configuración',
      },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: 'Si se debe cerrar al hacer clic en el overlay.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Si la máscara está abierta inicialmente.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Comportamiento',
      },
    },
  },
};

export default meta;
type Story = StoryObj<MaskOptions>;

/**
 * Ejemplo básico de Mask destacando un botón
 */
export const Default: Story = {
  render: (args) => {
    // Crear contenido de ejemplo
    const container = document.createElement('div');
    container.style.cssText = `
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    `;

    // Contenedor para los botones
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-md);
      margin-top: 200px;
    `;

    // Crear máscara después de que el elemento esté en el DOM
    let maskInstance: ReturnType<typeof createMask> | null = null;

    // Usar requestAnimationFrame para crear los botones y la máscara
    requestAnimationFrame(() => {
      try {
        // Botón para abrir la máscara usando componente UBITS
        const openButton = createButton({
          variant: 'secondary',
          size: 'md',
          text: 'Abrir Máscara',
          onClick: () => {
            if (maskInstance) {
              maskInstance.open();
            }
          },
        });
        buttonsContainer.appendChild(openButton);

        // Crear botón objetivo usando componente UBITS
        const targetButton = createButton({
          variant: 'primary',
          size: 'md',
          text: 'Botón Destacado',
        });
        targetButton.id = 'target-button';
        buttonsContainer.appendChild(targetButton);

        container.appendChild(buttonsContainer);

        // Crear máscara después de que los botones estén en el DOM
        requestAnimationFrame(() => {
          maskInstance = createMask({
            targetElement: '#target-button',
            popover: {
              title: args['popover.title'] || 'PASO 1',
              bodyContent: args['popover.bodyContent'] || 'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
              width: args['popover.width'] || 'md',
              footerButtons: {
                primary: {
                  label: 'Siguiente',
                  onClick: () => {
                    if (maskInstance) {
                      maskInstance.close();
                    }
                  },
                },
              },
            },
            popoverPosition: args.popoverPosition || 'auto',
            popoverOffset: args.popoverOffset || 12,
            padding: args.padding || 8,
            closeOnOverlayClick: args.closeOnOverlayClick !== false,
            open: args.open || false,
          });
        });
      } catch (error) {
        console.error('❌ Error creando botones:', error);
      }
    });

    return container;
  },
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
};


