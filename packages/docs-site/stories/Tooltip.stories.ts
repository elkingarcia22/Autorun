import type { Meta, StoryObj } from '@storybook/html';
import { createTooltip, renderTooltip } from '../../addons/tooltip/src/TooltipProvider';
import type { TooltipOptions } from '../../addons/tooltip/src/types/TooltipOptions';
import '../../addons/tooltip/src/styles/tooltip.css';
import '../../addons/button/src/styles/button.css';

const meta: Meta<TooltipOptions> = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Tooltip UBITS con tail (flecha) para mostrar información contextual. Similar al Popover pero más simple, con título, descripción y botones de acción (primario, secundario y terciario). El tooltip se adapta automáticamente al contenido usando min-width y max-width según el tamaño seleccionado (sm: 120-240px, md: 160-320px, lg: 200-400px). El ancho máximo se ajusta según la cantidad de botones visibles (3 botones: mínimo 420px, 2 botones: mínimo 360px), y el tamaño del tooltip determina el tamaño de los botones (sm→xs, md→sm, lg→md).',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del tooltip (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar título',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Contenido',
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Descripción o mensaje del tooltip (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    showDescription: {
      control: { type: 'boolean' },
      description: 'Mostrar descripción',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del tooltip que determina min-width y max-width (sm: 120-240px, md: 160-320px, lg: 200-400px). El tooltip se adapta automáticamente al contenido entre estos límites. El ancho máximo se ajusta según la cantidad de botones (3 botones: mínimo 420px, 2 botones: mínimo 360px). El tamaño también determina el tamaño de los botones (sm→xs, md→sm, lg→md).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    tailPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posición del tail (flecha) del tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
        category: 'Apariencia',
      },
    },
    tailOffset: {
      control: { type: 'number' },
      description: 'Offset del tail desde el centro (en píxeles)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Apariencia',
      },
    },
    primaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón primario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Primario',
      },
    },
    showPrimaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón primario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Primario',
      },
    },
    primaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón primario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Primario',
      },
    },
    showPrimaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón primario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Primario',
      },
    },
    secondaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón secundario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Secundario',
      },
    },
    showSecondaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón secundario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Secundario',
      },
    },
    secondaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón secundario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Secundario',
      },
    },
    showSecondaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón secundario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Secundario',
      },
    },
    tertiaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón terciario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Terciario',
      },
    },
    showTertiaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón terciario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Terciario',
      },
    },
    tertiaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón terciario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Terciario',
      },
    },
    showTertiaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón terciario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Terciario',
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Si el tooltip está abierto inicialmente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    closeOnOutsideClick: {
      control: { type: 'boolean' },
      description: 'Si se debe cerrar al hacer clic fuera del tooltip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TooltipOptions>;

export const Default: Story = {
  args: {
    title: 'Título del Tooltip',
    showTitle: true,
    description: 'Esta es la descripción del tooltip que proporciona información adicional al usuario.',
    showDescription: true,
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    primaryButtonLabel: 'Aceptar',
    showPrimaryButton: false,
    primaryButtonIcon: 'check',
    showPrimaryButtonIcon: false,
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: false,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: false,
    tertiaryButtonLabel: 'Más info',
    showTertiaryButton: false,
    tertiaryButtonIcon: 'info-circle',
    showTertiaryButtonIcon: false,
    open: true,
    closeOnOutsideClick: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.id = 'tooltip-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--ubits-bg-2, #f9fafb)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';

    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.setAttribute('data-tooltip-trigger', 'true');
    openButton.innerHTML = '<span>Abrir Tooltip</span>';
    openButton.style.width = 'auto';
    openButton.style.zIndex = '1001';

    container.appendChild(openButton);

    let tooltipInstance: ReturnType<typeof createTooltip> | null = null;

    const updateButtonText = () => {
      const isOpen = tooltipInstance && tooltipInstance.element.classList.contains('ubits-tooltip--open');
      openButton.querySelector('span')!.textContent = isOpen ? 'Cerrar Tooltip' : 'Abrir Tooltip';
    };

    const destroyTooltip = () => {
      if (tooltipInstance) {
        try {
          tooltipInstance.destroy();
        } catch (e) {
          console.error('Error al destruir tooltip:', e);
        }
        tooltipInstance = null;
      }
      // También asegurarnos de que no queden tooltips huérfanos en el DOM
      const existingTooltips = document.querySelectorAll('.ubits-tooltip');
      existingTooltips.forEach((tooltip) => {
        if (tooltip.parentElement) {
          tooltip.remove();
        }
      });
    };

    const createAndOpenTooltip = () => {
      // Siempre destruir antes de crear nuevo
      destroyTooltip();

      const buttonRect = openButton.getBoundingClientRect();
      
      // SIEMPRE mostrar el tooltip arriba del botón, pero conservar la posición del tail según la configuración
      // El tooltip se posiciona arriba, pero el triángulo puede apuntar en diferentes direcciones
      // Calcular posición para que el tooltip aparezca arriba del botón
      // Necesitamos calcular la altura del tooltip después de crearlo
      // Usamos un valor estimado más grande para asegurar que esté completamente arriba
      const estimatedTooltipHeight = 200; // Altura estimada del tooltip
      const position: { top: number; left: number } = {
        top: buttonRect.top - estimatedTooltipHeight - 9, // Arriba del botón menos altura del tooltip menos tail
        left: buttonRect.left + buttonRect.width / 2, // Centrado horizontalmente
      };

      tooltipInstance = createTooltip({
        title: args.title,
        showTitle: args.showTitle !== undefined ? args.showTitle : true,
        description: args.description,
        showDescription: args.showDescription !== undefined ? args.showDescription : true,
        width: args.width,
        tailPosition: args.tailPosition, // Conservar la posición del tail según la configuración del usuario
        tailOffset: args.tailOffset,
        primaryButtonLabel: args.primaryButtonLabel,
        showPrimaryButton: args.showPrimaryButton || false,
        primaryButtonIcon: args.primaryButtonIcon,
        showPrimaryButtonIcon: args.showPrimaryButtonIcon || false,
        secondaryButtonLabel: args.secondaryButtonLabel,
        showSecondaryButton: args.showSecondaryButton || false,
        secondaryButtonIcon: args.secondaryButtonIcon,
        showSecondaryButtonIcon: args.showSecondaryButtonIcon || false,
        tertiaryButtonLabel: args.tertiaryButtonLabel,
        showTertiaryButton: args.showTertiaryButton || false,
        tertiaryButtonIcon: args.tertiaryButtonIcon,
        showTertiaryButtonIcon: args.showTertiaryButtonIcon || false,
        onPrimaryAction: () => {
          alert('Botón primario clickeado!');
        },
        onSecondaryAction: () => {
          alert('Botón secundario clickeado!');
        },
        onTertiaryAction: () => {
          alert('Botón terciario clickeado!');
        },
        onClose: () => {
          if (args.onClose) {
            args.onClose();
          }
          updateButtonText();
        },
        open: false, // Siempre crear cerrado, luego abrir con el botón
        closeOnOutsideClick: args.closeOnOutsideClick !== undefined ? args.closeOnOutsideClick : true,
        position: position,
      });

      // Ajustar posición después de crear el tooltip (siempre arriba del botón)
      if (tooltipInstance) {
        setTimeout(() => {
          const tooltipHeight = tooltipInstance.element.offsetHeight;
          const buttonRect = openButton.getBoundingClientRect();
          tooltipInstance.updatePosition({
            top: buttonRect.top - tooltipHeight - 9,
            left: buttonRect.left + buttonRect.width / 2,
          });
        }, 0);
      }

      updateButtonText();
    };

    const handleButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!tooltipInstance || !tooltipInstance.element || !tooltipInstance.element.parentElement) {
        createAndOpenTooltip();
        setTimeout(() => {
          if (tooltipInstance) {
            tooltipInstance.open();
            updateButtonText();
          }
        }, 10);
        return;
      }
      
      const isOpen = tooltipInstance.element.classList.contains('ubits-tooltip--open');
      if (isOpen) {
        tooltipInstance.close();
      } else {
        tooltipInstance.open();
      }
      updateButtonText();
    };

    openButton.addEventListener('click', handleButtonClick);

    // Recrear tooltip cuando cambian los args (Storybook controls)
    const recreateTooltip = () => {
      const wasOpen = tooltipInstance && tooltipInstance.element && tooltipInstance.element.classList.contains('ubits-tooltip--open');
      destroyTooltip();
      setTimeout(() => {
        createAndOpenTooltip();
        if (wasOpen && tooltipInstance) {
          setTimeout(() => {
            if (tooltipInstance) {
              tooltipInstance.open();
              updateButtonText();
            }
          }, 10);
        }
      }, 10);
    };

    // Initial render if open is true
    if (args.open) {
      setTimeout(() => {
        createAndOpenTooltip();
        if (tooltipInstance) {
          tooltipInstance.open();
          updateButtonText();
        }
      }, 100);
    } else {
      setTimeout(() => {
        createAndOpenTooltip();
      }, 100);
    }

    // Observer para detectar cambios en los args de Storybook
    let lastArgs = JSON.stringify({
      title: args.title,
      showTitle: args.showTitle,
      description: args.description,
      showDescription: args.showDescription,
      width: args.width,
      tailPosition: args.tailPosition,
      tailOffset: args.tailOffset,
      primaryButtonLabel: args.primaryButtonLabel,
      showPrimaryButton: args.showPrimaryButton,
      primaryButtonIcon: args.primaryButtonIcon,
      showPrimaryButtonIcon: args.showPrimaryButtonIcon,
      secondaryButtonLabel: args.secondaryButtonLabel,
      showSecondaryButton: args.showSecondaryButton,
      secondaryButtonIcon: args.secondaryButtonIcon,
      showSecondaryButtonIcon: args.showSecondaryButtonIcon,
      tertiaryButtonLabel: args.tertiaryButtonLabel,
      showTertiaryButton: args.showTertiaryButton,
      tertiaryButtonIcon: args.tertiaryButtonIcon,
      showTertiaryButtonIcon: args.showTertiaryButtonIcon,
      closeOnOutsideClick: args.closeOnOutsideClick,
    });
    
    const checkInterval = setInterval(() => {
      const currentArgs = JSON.stringify({
        title: args.title,
        showTitle: args.showTitle,
        description: args.description,
        showDescription: args.showDescription,
        width: args.width,
        tailPosition: args.tailPosition,
        tailOffset: args.tailOffset,
        primaryButtonLabel: args.primaryButtonLabel,
        showPrimaryButton: args.showPrimaryButton,
        primaryButtonIcon: args.primaryButtonIcon,
        showPrimaryButtonIcon: args.showPrimaryButtonIcon,
        secondaryButtonLabel: args.secondaryButtonLabel,
        showSecondaryButton: args.showSecondaryButton,
        secondaryButtonIcon: args.secondaryButtonIcon,
        showSecondaryButtonIcon: args.showSecondaryButtonIcon,
        tertiaryButtonLabel: args.tertiaryButtonLabel,
        showTertiaryButton: args.showTertiaryButton,
        tertiaryButtonIcon: args.tertiaryButtonIcon,
        showTertiaryButtonIcon: args.showTertiaryButtonIcon,
        closeOnOutsideClick: args.closeOnOutsideClick,
      });
      
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        recreateTooltip();
      }
    }, 100);

    // Limpiar interval al desmontar
    container.addEventListener('DOMNodeRemoved', () => {
      clearInterval(checkInterval);
      destroyTooltip();
    });

    return container;
  },
};

