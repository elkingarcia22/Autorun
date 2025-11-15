import type { Meta, StoryObj } from '@storybook/html';
import { renderButton, createButton } from '../../addons/button/src/ButtonProvider';
import type { ButtonOptions } from '../../addons/button/src/types/ButtonOptions';
import '../../addons/tooltip/src/styles/tooltip.css';

const meta: Meta<ButtonOptions> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante del botón',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | tertiary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del botón',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    text: {
      control: { type: 'text' },
      description: 'Texto del botón',
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'check, plus, times, etc.' },
      },
    },
    iconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono FontAwesome',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' },
      },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'only'],
      description: 'Posición del icono',
      table: {
        defaultValue: { summary: 'left' },
        type: { summary: 'left | right | only' },
      },
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Mostrar solo el icono, sin texto',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilitar el botón',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Estado de carga (muestra spinner)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    badge: {
      control: { type: 'boolean' },
      description: 'Mostrar badge de notificación',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    active: {
      control: { type: 'boolean' },
      description: 'Modificador active/outline',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'focus', 'disabled', 'loading'],
      description: 'Estado visual del botón (para preview)',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | focus | disabled | loading' },
        category: 'Estado Visual',
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Ancho completo',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    block: {
      control: { type: 'boolean' },
      description: 'Display block',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    dropdown: {
      control: { type: 'boolean' },
      description: 'Activar funcionalidad dropdown (muestra lista al hacer click)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Mostrar tooltip al hacer hover (solo para botones icon-only)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Tooltip',
      },
    },
    tooltipText: {
      control: { type: 'text' },
      description: 'Texto del tooltip (solo para botones icon-only)',
      table: {
        type: { summary: 'string' },
        category: 'Tooltip',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonOptions>;

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón de ejemplo',
    icon: 'check',
    iconStyle: 'regular',
    iconPosition: 'left',
    iconOnly: false,
    disabled: false,
    loading: false,
    badge: false,
    active: false,
    state: 'default',
    fullWidth: false,
    block: false,
    dropdown: false,
    dropdownOptions: [
      { label: 'Opción 1', value: 'opt1' },
      { label: 'Opción 2', value: 'opt2' },
      { label: 'Opción 3', value: 'opt3' },
    ],
    showTooltip: false,
    tooltipText: 'Tooltip del botón',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'flex-start';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--ubits-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    
    // Convertir iconPosition 'only' a iconOnly para compatibilidad
    const buttonArgs = {
      ...args,
      iconOnly: args.iconPosition === 'only' || args.iconOnly,
      iconPosition: args.iconPosition === 'only' ? 'left' : args.iconPosition
    };
    
    // Si dropdown está activo, usar createButton para inicializar la funcionalidad
    if (buttonArgs.dropdown && buttonArgs.dropdownOptions && buttonArgs.dropdownOptions.length > 0) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.style.position = 'relative';
      buttonWrapper.style.display = 'inline-block';
      
      requestAnimationFrame(() => {
        try {
          const button = createButton(buttonArgs);
          // createButton con dropdown retorna el botón dentro de un div wrapper
          const parent = button.parentElement;
          
          // Función helper para aplicar estilos active
          const applyActiveStyles = (btn: HTMLButtonElement) => {
            if (buttonArgs.active || args.active) {
              // Aplicar fondo active con múltiples capas
              const root = document.documentElement;
              const bgActiveButton = getComputedStyle(root).getPropertyValue('--ubits-bg-active-button').trim() || 'var(--ubits-bg-active-button)';
              const bg1 = getComputedStyle(root).getPropertyValue('--ubits-bg-1').trim() || '#ffffff';
              const backgroundValue = `${bgActiveButton}, ${bg1}`;
              btn.style.setProperty('background', backgroundValue, 'important');
              btn.style.setProperty('border', 'none', 'important');
              btn.style.setProperty('color', 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))', 'important');
              
              const spans = btn.querySelectorAll('span');
              spans.forEach((span) => {
                span.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
              });
              
              const icons = btn.querySelectorAll('i');
              icons.forEach((icon) => {
                icon.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
              });
            }
          };
          
          // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
          if (buttonArgs.active || args.active) {
            button.classList.add('ubits-button--active');
          }
          
          if (parent) {
            buttonWrapper.appendChild(parent);
            applyActiveStyles(button);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
            // Aplicar estado visual
            if (args.state && args.state !== 'default') {
              applyButtonState(button, args.state as string);
            }
          } else {
            buttonWrapper.appendChild(button);
            applyActiveStyles(button);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
            // Aplicar estado visual
            if (args.state && args.state !== 'default') {
              applyButtonState(button, args.state as string);
            }
          }
        } catch (error) {
          buttonWrapper.innerHTML = renderButton(buttonArgs);
          // Aplicar tooltip UBITS y estado visual si es necesario
          const button = buttonWrapper.querySelector('button') as HTMLButtonElement;
          if (button) {
            // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
            if (buttonArgs.active || args.active) {
              button.classList.add('ubits-button--active');
            }
            if (buttonArgs.active || args.active) {
              // Aplicar fondo active con múltiples capas
              const root = document.documentElement;
              const bgActiveButton = getComputedStyle(root).getPropertyValue('--ubits-bg-active-button').trim() || 'var(--ubits-bg-active-button)';
              const bg1 = getComputedStyle(root).getPropertyValue('--ubits-bg-1').trim() || '#ffffff';
              const backgroundValue = `${bgActiveButton}, ${bg1}`;
              button.style.setProperty('background', backgroundValue, 'important');
              button.style.setProperty('color', 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))', 'important');
              button.style.setProperty('border', 'none', 'important');
              const spans = button.querySelectorAll('span');
              spans.forEach(span => {
                span.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
              });
              const icons = button.querySelectorAll('i');
              icons.forEach(icon => {
                icon.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
              });
            }
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
            if (args.state && args.state !== 'default') {
              applyButtonState(button, args.state as string);
            }
          }
        }
      });
      
      preview.appendChild(buttonWrapper);
    } else {
      // Sin dropdown, usar renderButton normalmente
      const buttonHTML = renderButton(buttonArgs);
      
      const buttonContainer = document.createElement('div');
      buttonContainer.innerHTML = buttonHTML;
      preview.appendChild(buttonContainer);
      
      // Aplicar estado visual si se especifica
      requestAnimationFrame(() => {
        const button = buttonContainer.querySelector('button') as HTMLButtonElement;
        if (button) {
          // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
          if (buttonArgs.active || args.active) {
            button.classList.add('ubits-button--active');
          }
          
          // Verificar si tiene la clase active
          const hasActiveClass = button.classList.contains('ubits-button--active');
          
          // Si el botón está en estado active, asegurar color azul desde el inicio
          if (buttonArgs.active || args.active || hasActiveClass) {
            // Asegurar fondo active con múltiples capas: bg-active-button sobre bg1
            const root = document.documentElement;
            const bgActiveButton = getComputedStyle(root).getPropertyValue('--ubits-bg-active-button').trim() || 'var(--ubits-bg-active-button)';
            const bg1 = getComputedStyle(root).getPropertyValue('--ubits-bg-1').trim() || 'var(--ubits-bg-1)';
            const backgroundValue = `${bgActiveButton}, ${bg1}`;
            
            // Usar setProperty con !important para asegurar que se aplique
            button.style.setProperty('background', backgroundValue, 'important');
            button.style.setProperty('border', 'none', 'important');
            button.style.setProperty('color', 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))', 'important');
            
            const spans = button.querySelectorAll('span');
            spans.forEach((span) => {
              span.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
            });
            
            const icons = button.querySelectorAll('i');
            icons.forEach((icon) => {
              icon.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
            });
          }
          
          // Aplicar tooltip UBITS si es necesario
          if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
            applyUBITSTooltip(button, buttonArgs.tooltipText);
          }
          
          // Aplicar estado visual
          if (args.state && args.state !== 'default') {
            applyButtonState(button, args.state as string);
          }
        } else {
          console.error('❌ Botón no encontrado');
        }
      });
    }
    
    container.appendChild(preview);
    
    return container;
  },
};

// Función helper para aplicar estados visuales al botón
function applyButtonState(button: HTMLButtonElement, state: string): void {
  // Remover estados anteriores
  button.classList.remove('ubits-button--hover', 'ubits-button--focus', 'ubits-button--pressed');
  button.disabled = false;
  button.classList.remove('ubits-button--loading');
  button.removeAttribute('data-loading');
  
  // Detectar variante del botón
  const isPrimary = button.classList.contains('ubits-button--primary') || (!button.classList.contains('ubits-button--secondary') && !button.classList.contains('ubits-button--tertiary'));
  const isSecondary = button.classList.contains('ubits-button--secondary');
  const isTertiary = button.classList.contains('ubits-button--tertiary');
  const isActive = button.classList.contains('ubits-button--active');
  
  // Si el botón está en estado active, asegurar que el color del texto sea azul
  if (isActive) {
    button.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
    
    const spans = button.querySelectorAll('span');
    spans.forEach((span) => {
      span.style.color = 'var(--ubits-accent-brand-static)';
    });
    
    const icons = button.querySelectorAll('i');
    icons.forEach((icon) => {
      icon.style.color = 'var(--ubits-accent-brand-static)';
    });
  }
  
  switch (state) {
    case 'hover':
      button.classList.add('ubits-button--hover');
      // Simular hover con estilos inline
      if (isActive) {
        // Si es active, mantener el estilo active
        button.style.background = 'var(--ubits-bg-active-button), var(--ubits-bg-1)';
        button.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
        button.style.border = 'none';
      } else if (isPrimary) {
        button.style.background = 'var(--ubits-button-primary-hover)';
        button.style.borderColor = 'var(--ubits-button-primary-hover)';
      } else if (isSecondary) {
        button.style.background = 'var(--ubits-btn-secondary-bg-hover)';
      } else if (isTertiary) {
        button.style.background = 'var(--ubits-btn-tertiary-bg-hover)';
      }
      break;
      
    case 'focus':
      button.classList.add('ubits-button--focus');
      button.focus();
      // El focus ring se aplica automáticamente con CSS
      if (isActive) {
        button.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
      }
      break;
      
    case 'active':
      // Estado active: usar estilo del modificador active (fondo azul 0C5BEF al 15% + texto azul)
      button.classList.add('ubits-button--active');
      
      // Obtener valores de tokens
      const rootEl = document.documentElement;
      const bgActiveButtonValue = getComputedStyle(rootEl).getPropertyValue('--ubits-bg-active-button').trim() || 'var(--ubits-bg-active-button)';
      const bg1Value = getComputedStyle(rootEl).getPropertyValue('--ubits-bg-1').trim() || '#ffffff';
      
      // El CSS tiene la regla pero puede no aplicarse por especificidad
      // Aplicar fondo directamente usando el formato de múltiples backgrounds
      // Formato: background: color1, color2 (donde color1 es semitransparente sobre color2)
      const backgroundValue = `${bgActiveButtonValue}, ${bg1Value}`;
      
      // Limpiar todas las propiedades de background que puedan interferir
      button.style.removeProperty('background');
      button.style.removeProperty('background-color');
      button.style.removeProperty('background-image');
      
      // Aplicar el fondo completo usando la propiedad background directamente
      // Esto debería funcionar mejor que setProperty
      (button.style as any).background = backgroundValue;
      
      // Asegurar color y border
      button.style.setProperty('color', 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))', 'important');
      button.style.setProperty('border', 'none', 'important');
      button.style.removeProperty('transform');
      
      // Inyectar estilo CSS directamente para forzar el fondo (el CSS puede no aplicarse por timing)
      const styleId = 'button-active-override';
      let styleEl = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      // Usar selector específico para cada variante
      const variantClass = isPrimary ? 'ubits-button--primary' : isSecondary ? 'ubits-button--secondary' : 'ubits-button--tertiary';
      
      // El formato background: color1, color2 NO funciona con colores sólidos
      // Necesitamos usar background-color para el fondo base y background-image para la capa semitransparente
      // O mejor aún, usar un pseudo-elemento ::before
      // Pero la forma más simple es usar background-color y background-image con un gradiente sólido
      const cssRule = `
        .${variantClass}.ubits-button--active {
          position: relative !important;
          background-color: ${bg1Value} !important;
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static)) !important;
          border: none !important;
        }
        .${variantClass}.ubits-button--active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${bgActiveButtonValue};
          border-radius: inherit;
          pointer-events: none;
          z-index: 0;
        }
        .${variantClass}.ubits-button--active span {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static)) !important;
          position: relative;
          z-index: 1;
        }
        .${variantClass}.ubits-button--active i {
          color: var(--ubits-button-active-fg, var(--ubits-accent-brand-static)) !important;
          position: relative;
          z-index: 1;
        }
      `;
      styleEl.textContent = cssRule;
      
      // Aplicar color a spans e iconos
      const spansActive = button.querySelectorAll('span');
      spansActive.forEach((span) => {
        span.style.color = 'var(--ubits-accent-brand-static)';
      });
      const iconsActive = button.querySelectorAll('i');
      iconsActive.forEach((icon) => {
        icon.style.color = 'var(--ubits-accent-brand-static)';
      });
      break;
      
    case 'disabled':
      button.disabled = true;
      button.style.background = '';
      button.style.borderColor = '';
      button.style.transform = '';
      button.style.color = '';
      break;
      
    case 'loading':
      button.classList.add('ubits-button--loading');
      button.setAttribute('data-loading', 'true');
      button.style.background = '';
      button.style.borderColor = '';
      button.style.transform = '';
      if (isActive) {
        button.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
      }
      break;
      
    case 'default':
    default:
      // Resetear estilos pero mantener active si está activo
      if (!isActive) {
        button.style.background = '';
        button.style.borderColor = '';
        button.style.transform = '';
        button.style.color = '';
      } else {
        // Si es active, mantener el estilo active
        button.style.background = 'var(--ubits-bg-active-button), var(--ubits-bg-1)';
        button.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static))';
        button.style.border = 'none';
      }
      break;
  }
}

// Función helper para aplicar tooltip UBITS a botones icon-only
function applyUBITSTooltip(button: HTMLButtonElement, tooltipText: string): void {
  // Remover tooltip anterior si existe
  const existingTooltipId = button.dataset.tooltipInstance;
  if (existingTooltipId) {
    const existingTooltip = document.getElementById(existingTooltipId);
    if (existingTooltip) {
      existingTooltip.remove();
    }
    delete button.dataset.tooltipInstance;
  }
  
  // Remover listeners anteriores
  const oldMouseEnter = (button as any)._tooltipMouseEnter;
  const oldMouseLeave = (button as any)._tooltipMouseLeave;
  if (oldMouseEnter) {
    button.removeEventListener('mouseenter', oldMouseEnter);
    delete (button as any)._tooltipMouseEnter;
  }
  if (oldMouseLeave) {
    button.removeEventListener('mouseleave', oldMouseLeave);
    delete (button as any)._tooltipMouseLeave;
  }
  
  // Remover atributo title nativo si existe
  if (button.hasAttribute('title')) {
    button.removeAttribute('title');
  }
  
  // Crear tooltip HTML
  const tooltipId = `button-tooltip-${Math.random().toString(36).substr(2, 9)}`;
  const escapedText = tooltipText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  
  const tooltipHTML = `
    <div class="ubits-tooltip ubits-tooltip--tail-bottom" id="${tooltipId}" style="position: fixed; z-index: 10000; opacity: 0; visibility: hidden; display: none; width: auto; min-width: fit-content; max-width: 240px;">
      <div class="ubits-tooltip__tail" style="left: 50%;">
        <div class="ubits-tooltip__tail-inner"></div>
      </div>
      <div class="ubits-tooltip__content" style="width: auto; min-width: fit-content;">
        <div class="ubits-tooltip__body" style="white-space: nowrap;">
          <div class="ubits-tooltip__body-content">
            <p class="ubits-body-md" style="margin: 0; white-space: nowrap;">${escapedText}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Crear wrapper para parsear HTML
  const wrapper = document.createElement('div');
  wrapper.innerHTML = tooltipHTML;
  const tooltipElement = wrapper.firstElementChild as HTMLElement;
  
  if (tooltipElement) {
    // Agregar al body
    document.body.appendChild(tooltipElement);
    
    // Función para mostrar tooltip
    const showTooltip = () => {
      const buttonRect = button.getBoundingClientRect();
      
      // Calcular posición: tooltip arriba del botón (tail apunta hacia abajo)
      tooltipElement.style.top = '-9999px';
      tooltipElement.style.left = '0';
      tooltipElement.style.transform = 'none';
      tooltipElement.style.visibility = 'visible';
      tooltipElement.style.opacity = '0';
      tooltipElement.style.display = 'block';
      tooltipElement.classList.add('ubits-tooltip--open');
      
      // Forzar reflow para calcular dimensiones
      void tooltipElement.offsetHeight;
      
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const tooltipHeight = tooltipRect.height;
      
      // Calcular posición final
      const top = buttonRect.top - tooltipHeight - 9; // 9px es la altura del tail
      const buttonCenterX = buttonRect.left + (buttonRect.width / 2);
      const tooltipWidth = tooltipRect.width;
      const left = buttonCenterX - (tooltipWidth / 2); // Centrar el tooltip sobre el botón
      
      tooltipElement.style.top = `${top}px`;
      tooltipElement.style.left = `${left}px`;
      tooltipElement.style.transform = 'none'; // No usar translateX ya que calculamos left directamente
      tooltipElement.style.display = 'block';
      tooltipElement.style.visibility = 'visible';
      tooltipElement.style.opacity = '1';
      tooltipElement.style.transition = 'none'; // Sin transición para aparición inmediata
      
      // Restaurar transición después de un breve momento
      setTimeout(() => {
        tooltipElement.style.transition = '';
      }, 50);
    };
    
    // Función para ocultar tooltip
    const hideTooltip = () => {
      tooltipElement.classList.remove('ubits-tooltip--open');
      tooltipElement.style.opacity = '0';
      tooltipElement.style.visibility = 'hidden';
      tooltipElement.style.display = 'none';
    };
    
    // Agregar eventos
    const mouseEnterHandler = (e: Event) => {
      e.stopPropagation();
      showTooltip();
    };
    
    const mouseLeaveHandler = (e: Event) => {
      e.stopPropagation();
      hideTooltip();
    };
    
    button.addEventListener('mouseenter', mouseEnterHandler, false);
    button.addEventListener('mouseleave', mouseLeaveHandler, false);
    
    // Guardar referencias para poder limpiarlas después
    (button as any)._tooltipMouseEnter = mouseEnterHandler;
    (button as any)._tooltipMouseLeave = mouseLeaveHandler;
    button.dataset.tooltipInstance = tooltipId;
  }
};

// Story específica para mostrar estado Active
export const ActiveState: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón Active',
    active: true,
    icon: 'check',
    iconStyle: 'regular',
    iconPosition: 'left',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    const title = document.createElement('h3');
    title.textContent = 'Estado Active - Con nuevo fondo bg-active-button y texto accent-brand';
    title.style.marginBottom = '24px';
    title.style.color = 'var(--ubits-fg-1-high, #303a47)';
    container.appendChild(title);
    
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    grid.style.gap = '16px';
    grid.style.marginBottom = '32px';
    
    // Primary Active
    const primaryContainer = document.createElement('div');
    primaryContainer.style.display = 'flex';
    primaryContainer.style.flexDirection = 'column';
    primaryContainer.style.gap = '8px';
    const primaryLabel = document.createElement('label');
    primaryLabel.textContent = 'Primary Active';
    primaryLabel.style.fontSize = '14px';
    primaryLabel.style.color = 'var(--ubits-fg-1-medium, #5c646f)';
    primaryLabel.style.fontWeight = '500';
    primaryContainer.appendChild(primaryLabel);
    primaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'primary',
      active: true,
      text: 'Primary Active',
    });
    grid.appendChild(primaryContainer);
    
    // Secondary Active
    const secondaryContainer = document.createElement('div');
    secondaryContainer.style.display = 'flex';
    secondaryContainer.style.flexDirection = 'column';
    secondaryContainer.style.gap = '8px';
    const secondaryLabel = document.createElement('label');
    secondaryLabel.textContent = 'Secondary Active';
    secondaryLabel.style.fontSize = '14px';
    secondaryLabel.style.color = 'var(--ubits-fg-1-medium, #5c646f)';
    secondaryLabel.style.fontWeight = '500';
    secondaryContainer.appendChild(secondaryLabel);
    secondaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'secondary',
      active: true,
      text: 'Secondary Active',
    });
    grid.appendChild(secondaryContainer);
    
    // Tertiary Active
    const tertiaryContainer = document.createElement('div');
    tertiaryContainer.style.display = 'flex';
    tertiaryContainer.style.flexDirection = 'column';
    tertiaryContainer.style.gap = '8px';
    const tertiaryLabel = document.createElement('label');
    tertiaryLabel.textContent = 'Tertiary Active';
    tertiaryLabel.style.fontSize = '14px';
    tertiaryLabel.style.color = 'var(--ubits-fg-1-medium, #5c646f)';
    tertiaryLabel.style.fontWeight = '500';
    tertiaryContainer.appendChild(tertiaryLabel);
    tertiaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'tertiary',
      active: true,
      text: 'Tertiary Active',
    });
    grid.appendChild(tertiaryContainer);
    
    container.appendChild(grid);
    
    // Información sobre el estilo
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    info.style.borderRadius = '8px';
    info.style.marginTop = '24px';
    info.innerHTML = `
      <p style="margin: 0 0 8px 0; color: var(--ubits-fg-1-high, #303a47); font-weight: 600;">Estilo Active:</p>
      <ul style="margin: 0; padding-left: 20px; color: var(--ubits-fg-1-medium, #5c646f);">
        <li>Fondo: <code style="background: var(--ubits-bg-2); padding: 2px 6px; border-radius: 4px;">var(--ubits-bg-active-button)</code> sobre <code style="background: var(--ubits-bg-2); padding: 2px 6px; border-radius: 4px;">var(--ubits-bg-1)</code></li>
        <li>Texto: <code style="background: var(--ubits-bg-2); padding: 2px 6px; border-radius: 4px;">var(--ubits-button-active-fg)</code> (usa token accent-brand según tema)</li>
        <li>Sin borde</li>
      </ul>
    `;
    container.appendChild(info);
    
    return container;
  },
};
