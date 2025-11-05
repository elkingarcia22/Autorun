import type { Meta, StoryObj } from '@storybook/html';
import { renderSearchButton } from '../../addons/search-button/src/SearchButtonProvider';
import type { SearchButtonOptions } from '../../addons/search-button/src/types/SearchButtonOptions';
// Importar CSS del botón UBITS (necesario para el modo botón)
import '../../addons/button/src/styles/button.css';
// Importar CSS del Search Button (necesario para el modo input)
import '../../addons/search-button/src/styles/search-button.css';

const meta: Meta<SearchButtonOptions> = {
  title: 'Components/Search Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Search Button UBITS con modo botón e input. Cuando está activo, muestra un campo de búsqueda con icono. Cuando no está activo, muestra solo un botón con icono de lupa. Usa tokens UBITS exclusivamente.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    active: {
      control: { type: 'boolean' },
      description: 'Si el botón está en modo activo (muestra input)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Tamaño del botón (sm: 32px, md: 40px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del botón',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
        category: 'Estado',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el botón está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder del input cuando está activo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor del input cuando está activo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Ancho del input cuando está activo (en px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '248' },
        category: 'Apariencia',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Función a ejecutar cuando cambia el valor del input',
      table: {
        disable: true,
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Función a ejecutar cuando se hace click en el botón',
      table: {
        disable: true,
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Función a ejecutar cuando el input recibe focus',
      table: {
        disable: true,
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Función a ejecutar cuando el input pierde focus',
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
type Story = StoryObj<SearchButtonOptions>;

export const Default: Story = {
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

    const renderSearchComponent = () => {
      const searchHTML = renderSearchButton({
        active: args.active !== undefined ? args.active : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        placeholder: args.placeholder || '',
        value: args.value || '',
        width: args.width || 248,
        className: args.className || '',
      });

      container.innerHTML = searchHTML;

      // Agregar event listeners
      if (args.active) {
        const inputElement = container.querySelector('.ubits-search-button__input') as HTMLInputElement;
        if (inputElement) {
          if (args.onChange) {
            inputElement.addEventListener('input', (e) => {
              if (args.onChange) {
                args.onChange(e);
              }
            });
            inputElement.addEventListener('change', (e) => {
              if (args.onChange) {
                args.onChange(e);
              }
            });
          }
          if (args.onFocus) {
            inputElement.addEventListener('focus', (e) => {
              if (args.onFocus) {
                args.onFocus(e);
              }
            });
          }
          if (args.onBlur) {
            inputElement.addEventListener('blur', (e) => {
              if (args.onBlur) {
                args.onBlur(e);
              }
            });
          }
        }
      } else {
        const buttonElement = container.querySelector('button') as HTMLButtonElement;
        if (buttonElement && args.onClick) {
          buttonElement.addEventListener('click', (e) => {
            if (args.onClick) {
              args.onClick(e);
            }
          });
        }
      }
    };

    // Renderizar inicialmente
    renderSearchComponent();

    // Actualizar cuando cambian los args
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderSearchComponent();
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

