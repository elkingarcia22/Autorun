import type { Meta, StoryObj } from '@storybook/html';
import { renderToast, showToast } from '../../addons/toast/src/ToastProvider';
import type { ToastOptions } from '../../addons/toast/src/types/ToastOptions';
import { createButton } from '../../components/button/src/ButtonProvider';
import type { ButtonOptions } from '../../components/button/src/types/ButtonOptions';
import '../../components/button/src/styles/button.css';

const meta: Meta<ToastOptions> = {
  title: 'Feedback/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Toast UBITS para mostrar notificaciones flotantes. Se posiciona en la parte superior central, tiene auto-cierre, pausa en hover, apilado máximo de 3, y soporta título, cuerpo y botón de acción opcional.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Tipo de toast',
      table: {
        defaultValue: { summary: 'info' },
        type: { summary: 'success | info | warning | error' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Título del toast (opcional, se muestra arriba alineado con el botón X)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Mensaje del toast (cuerpo)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    duration: {
      control: { type: 'number' },
      description: 'Duración en milisegundos antes de auto-cerrar (0 = persistente). Por defecto: success/info (3500ms), warning (5000ms), error (6500ms)',
      table: {
        defaultValue: { summary: '3500 (success/info), 5000 (warning), 6500 (error)' },
        type: { summary: 'number' },
      },
    },
    noClose: {
      control: { type: 'boolean' },
      description: 'Si el toast NO tiene botón de cerrar',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    pauseOnHover: {
      control: { type: 'boolean' },
      description: 'Si el timer se pausa cuando el usuario hace hover o focus',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    action: {
      control: { type: 'boolean' },
      description: 'Si el toast tiene botón de acción',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ToastOptions & { action?: boolean }>;

// Función helper para asegurar que el contenedor existe
function ensureToastContainer(): HTMLElement {
  const containerId = 'ubits-toast-container';
  let container = document.getElementById(containerId);
  
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.cssText = `
      position: fixed;
      top: var(--p-spacing-mode-1-lg, 16px);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--p-spacing-mode-1-md, 12px);
      width: 100%;
      max-width: 560px;
      min-width: 320px;
      padding: 0 var(--p-spacing-mode-1-lg, 16px);
      box-sizing: border-box;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }
  
  return container;
}

// Función helper para limpiar toasts anteriores
function clearToasts(): void {
  const container = ensureToastContainer();
  const toasts = container.querySelectorAll('.ubits-toast');
  toasts.forEach(toast => {
    const element = toast as HTMLElement;
    element.classList.add('ubits-toast--exit');
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 180);
  });
}

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    type: 'success',
    title: 'Operación completada',
    message: 'Los cambios se han guardado correctamente. Este ejemplo de texto es más largo para demostrar cómo funciona el espaciado y el botón de acción debajo del texto.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
    action: undefined,
  } as ToastOptions & { action?: boolean },
  render: (args) => {
    // Asegurar que el contenedor existe
    ensureToastContainer();
    
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    
    // Botones para mostrar toast
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = 'var(--p-spacing-mode-1-md, 12px)';
    controls.style.flexWrap = 'wrap';
    controls.style.marginBottom = '24px';
    
    // Crear botón "Mostrar Toast" usando componente UBITS
    const showButtonOptions: ButtonOptions = {
      variant: 'primary',
      size: 'md',
      text: 'Mostrar Toast',
      onClick: () => {
        clearToasts(); // Limpiar toasts anteriores
        setTimeout(() => {
          try {
            // Asegurar que el contenedor existe antes de mostrar el toast
            const container = ensureToastContainer();
            
            const toastOptions: Omit<ToastOptions, 'type' | 'message'> = {
              title: args.title,
              duration: args.duration,
              noClose: args.noClose,
              pauseOnHover: args.pauseOnHover,
            };
            
            // Agregar botón de acción si está activado
            if ((args as any).action) {
              toastOptions.action = {
                label: 'Action',
                onClick: () => {
                  alert('Acción ejecutada desde Storybook');
                }
              };
            }
            
            const toastType = args.type || 'info';
            showToast(toastType, args.message || '', toastOptions);
            
            // Verificar que el toast se agregó al DOM
            setTimeout(() => {
              const toastsInContainer = container.querySelectorAll('.ubits-toast');
              if (toastsInContainer.length === 0) {
                console.error('❌ El toast no se agregó al contenedor');
                alert('Error: El toast no se mostró. Revisa la consola para más detalles.');
              }
            }, 100);
          } catch (error) {
            console.error('❌ Error al mostrar toast:', error);
            alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
          }
        }, 200);
      }
    };
    
    // Crear botón "Limpiar Toasts" usando componente UBITS
    const clearButtonOptions: ButtonOptions = {
      variant: 'secondary',
      size: 'md',
      text: 'Limpiar Toasts',
      onClick: () => {
        clearToasts();
      }
    };
    
    // Usar requestAnimationFrame para crear los botones de forma asíncrona
    requestAnimationFrame(() => {
      try {
        const showButton = createButton(showButtonOptions);
        // appendChild automáticamente remueve el elemento de su padre anterior si tiene uno
        controls.appendChild(showButton);
        
        const clearButton = createButton(clearButtonOptions);
        // appendChild automáticamente remueve el elemento de su padre anterior si tiene uno
        controls.appendChild(clearButton);
      } catch (error) {
        console.error('❌ Error creando botones:', error);
        // Fallback: crear botones HTML simples si createButton falla
        const showButtonFallback = document.createElement('button');
        showButtonFallback.className = 'ubits-button ubits-button--primary ubits-button--md';
        showButtonFallback.textContent = 'Mostrar Toast';
        showButtonFallback.addEventListener('click', showButtonOptions.onClick as EventListener);
        controls.appendChild(showButtonFallback);
        
        const clearButtonFallback = document.createElement('button');
        clearButtonFallback.className = 'ubits-button ubits-button--secondary ubits-button--md';
        clearButtonFallback.textContent = 'Limpiar Toasts';
        clearButtonFallback.addEventListener('click', clearButtonOptions.onClick as EventListener);
        controls.appendChild(clearButtonFallback);
      }
    });
    container.appendChild(controls);
    
    // Preview estático del toast (solo para visualización, no funcional)
    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    
    const toastHTML = renderToast({
      type: args.type || 'info',
      title: args.title,
      message: args.message,
      noClose: args.noClose,
      action: (args as any).action ? {
        label: 'Action',
        onClick: () => {}
      } : undefined,
    });
    
    preview.innerHTML = toastHTML;
    
    // Estilos para el preview estático
    const toastElement = preview.querySelector('.ubits-toast') as HTMLElement;
    if (toastElement) {
      toastElement.style.position = 'relative';
      toastElement.style.width = '100%';
      toastElement.style.maxWidth = '560px';
      
      // Agregar event listener al botón cerrar si existe
      const closeButton = toastElement.querySelector('.ubits-toast__close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          toastElement.classList.add('ubits-toast--exit');
          setTimeout(() => {
            if (toastElement.parentNode) {
              toastElement.parentNode.removeChild(toastElement);
            }
          }, 180);
        });
      }
      
      // Agregar event listener al botón de acción si existe
      const actionButton = toastElement.querySelector('[data-toast-action]');
      if (actionButton && (args as any).action) {
        actionButton.addEventListener('click', () => {
          alert('Acción ejecutada desde preview estático');
        });
      }
    }
    
    container.appendChild(preview);
    
    // Agregar información adicional sobre el toast
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    info.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    info.style.lineHeight = '1.6';
    info.style.fontFamily = 'var(--font-family-noto-sans-font-family, "Noto Sans", sans-serif)';
    info.innerHTML = `
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Toast</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tipo:</strong> ${args.type}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Título:</strong> ${args.title || '(sin título)'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Cierre:</strong> ${args.noClose ? 'Sin botón' : 'Con botón'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Duración:</strong> ${args.duration && args.duration > 0 ? `${args.duration}ms` : 'Persistente'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Pausa en hover:</strong> ${args.pauseOnHover ? 'Sí' : 'No'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Botón de acción:</strong> ${(args as any).action ? 'Sí' : 'No'}</div>
      </div>
      <p style="margin-top: 12px; margin-bottom: 0; font-size: 13px; font-style: italic; color: var(--modifiers-normal-color-light-fg-1-medium);">Haz clic en "Mostrar Toast" para ver el toast funcional en la parte superior central de la pantalla.</p>
    `;
    container.appendChild(info);
    
    return container;
  },
};

