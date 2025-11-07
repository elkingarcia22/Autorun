import type { Meta, StoryObj } from '@storybook/html';
import { renderCheckbox } from '../../addons/checkbox/src/CheckboxProvider';
import type { CheckboxOptions } from '../../addons/checkbox/src/types/CheckboxOptions';
import '../../addons/checkbox/src/styles/checkbox.css';

const meta: Meta<CheckboxOptions> = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Checkbox UBITS para selección múltiple. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label del checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
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
      description: 'Valor del checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    name: {
      control: { type: 'text' },
      description: 'Nombre del checkbox (para agrupar checkboxes)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Si el checkbox está seleccionado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Si el checkbox está en estado indeterminado (muestra línea horizontal en vez de check)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Tamaño del checkbox (sm: 16px, md: 20px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled', 'indeterminate'],
      description: 'Estado del checkbox',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled | indeterminate' },
        category: 'Estado',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el checkbox está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Función a ejecutar cuando cambia el estado del checkbox',
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
type Story = StoryObj<CheckboxOptions>;

export const Default: Story = {
  args: {
    label: 'Label',
    complementaryText: undefined,
    value: '',
    name: '',
    checked: false,
    indeterminate: false,
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

    const renderCheckboxComponent = () => {
      const checkboxHTML = renderCheckbox({
        label: args.label || 'Label',
        complementaryText: args.complementaryText,
        value: args.value,
        name: args.name,
        checked: args.checked !== undefined ? args.checked : false,
        indeterminate: args.indeterminate !== undefined ? args.indeterminate : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || '',
      });

      container.innerHTML = checkboxHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-checkbox__input') as HTMLInputElement;
      
      if (inputElement) {
        // Aplicar estado indeterminado al input nativo si es necesario
        if (args.indeterminate) {
          inputElement.indeterminate = true;
        }
        if (args.onChange) {
          inputElement.addEventListener('change', (e) => {
            if (args.onChange) {
              args.onChange(e);
            }
          });
        }
      }
    };

    // Renderizar inicialmente
    renderCheckboxComponent();

    // Actualizar cuando cambian los args (similar a Radio Button)
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderCheckboxComponent();
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

