import type { Meta, StoryObj } from '@storybook/html';
import { renderAlert } from '../../addons/alert/src/AlertProvider';
import type { AlertOptions } from '../../addons/alert/src/types/AlertOptions';

const meta: Meta<AlertOptions> = {
  title: 'Feedback/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Alert UBITS para mostrar notificaciones del sistema. Soporta múltiples variantes (success, info, warning, error), botón cerrar opcional y animaciones.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Tipo de alert',
      table: {
        defaultValue: { summary: 'success' },
        type: { summary: 'success | info | warning | error' },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Mensaje del alert (puede incluir HTML básico)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Si el alert tiene botón de cerrar',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    duration: {
      control: { type: 'number' },
      description: 'Duración en milisegundos antes de auto-cerrar (0 = no auto-close)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertOptions>;

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    type: 'success',
    message: 'Los cambios se han guardado correctamente.',
    closable: true,
    duration: 0,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    
    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.marginBottom = '20px';
    
    // Generar el HTML del alert
    const alertHTML = renderAlert(args);
    preview.innerHTML = alertHTML;
    
    // Agregar funcionalidad al botón cerrar si existe
    const alertElement = preview.querySelector('.ubits-alert');
    if (alertElement && args.closable) {
      const closeButton = alertElement.querySelector('.ubits-alert__close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          // Agregar animación de cierre
          alertElement.classList.add('ubits-alert--closing');
          setTimeout(() => {
            if (alertElement.parentNode) {
              alertElement.parentNode.removeChild(alertElement);
            }
          }, 300);
        });
      }
    }
    
    // Configurar auto-close si duration > 0
    if (args.duration && args.duration > 0 && alertElement) {
      setTimeout(() => {
        const closeBtn = alertElement.querySelector('.ubits-alert__close') as HTMLButtonElement;
        if (closeBtn) {
          closeBtn.click();
        } else {
          // Si no hay botón cerrar, simplemente remover con animación
          alertElement.classList.add('ubits-alert--closing');
          setTimeout(() => {
            if (alertElement.parentNode) {
              alertElement.parentNode.removeChild(alertElement);
            }
          }, 300);
        }
      }, args.duration);
    }
    
    container.appendChild(preview);
    
    // Agregar información adicional sobre el alert
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    info.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    info.innerHTML = `
      <strong>Tipo:</strong> ${args.type}<br>
      <strong>Cierre:</strong> ${args.closable ? 'Con botón' : 'Sin botón'}<br>
      ${args.duration > 0 ? `<strong>Auto-cierre:</strong> ${args.duration}ms` : ''}
    `;
    container.appendChild(info);
    
    return container;
  },
};

