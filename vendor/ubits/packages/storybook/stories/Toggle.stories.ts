import type { Meta, StoryObj } from '@storybook/html';
import { renderToggle } from '../../addons/toggle/src/ToggleProvider';
import type { ToggleOptions } from '../../addons/toggle/src/types/ToggleOptions';
import '../../addons/toggle/src/styles/toggle.css';

const meta: Meta<ToggleOptions> = {
  title: 'Formularios/Toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Toggle/Switch UBITS para activar/desactivar opciones. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label del toggle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    complementaryText: {
      control: { type: 'text' },
      description: 'Texto complementario opcional (se muestra debajo del label)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor del toggle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    name: {
      control: { type: 'text' },
      description: 'Nombre del toggle (para agrupar toggles)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Si el toggle está activado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Tamaño del toggle (sm: 33x16px, md: 36x20px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del toggle',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
        category: 'Estado',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el toggle está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Función a ejecutar cuando cambia el estado del toggle',
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
type Story = StoryObj<ToggleOptions>;

export const Default: Story = {
  args: {
    label: 'Label',
    complementaryText: undefined,
    value: '',
    name: '',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

    const renderToggleComponent = () => {
      const toggleHTML = renderToggle({
        label: args.label,
        complementaryText: args.complementaryText,
        value: args.value,
        name: args.name,
        checked: args.checked !== undefined ? args.checked : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || '',
      });

      container.innerHTML = toggleHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-toggle__input') as HTMLInputElement;
      
      if (inputElement) {
        // Actualizar el estado checked cuando el usuario hace click
        inputElement.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement;
          // Actualizar args.checked con el nuevo valor
          args.checked = target.checked;
          
          // Llamar al callback onChange si existe
          if (args.onChange) {
            args.onChange(e);
          }
        });
      }
    };

    // Renderizar inicialmente
    renderToggleComponent();

    // Actualizar cuando cambian los args (similar a Checkbox)
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderToggleComponent();
      }
    }, 100);

    // Limpiar interval cuando se destruye el componente
    const cleanup = () => {
      clearInterval(checkArgs);
    };
    
    // Usar MutationObserver para detectar cuando el container se elimina
    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        cleanup();
        observer.disconnect();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return container;
  },
};

