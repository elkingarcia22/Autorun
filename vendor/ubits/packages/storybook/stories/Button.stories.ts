import type { Meta, StoryObj } from '@storybook/html';
import { renderButton, createButton } from '../../addons/button/src/ButtonProvider';
import type { ButtonOptions } from '../../addons/button/src/types/ButtonOptions';
import { renderSpinner } from '../../components/spinner/src/SpinnerProvider';
import '../../addons/button/src/styles/button.css';
import '../../addons/tooltip/src/styles/tooltip.css';

const meta: Meta<ButtonOptions> = {
  title: 'Básicos/Button',
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
      description: 'Modificador active/outline (fondo transparente + overlay azul). IMPORTANTE: Esto es diferente del estado "active" del controlador de estados (que simula "pressed")',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    floating: {
      control: { type: 'boolean' },
      description: 'Modificador floating (botón flotante con sombra del sistema de diseño)',
      table: {
        defaultValue: { summary: 'false' },
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
    floating: false,
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
    container.style.background = 'var(--modifiers-normal-color-light-bg-1), #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'flex-start';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2), #f9fafb)';
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
              const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
              const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || '#ffffff';
              const backgroundValue = `${bgActiveButton}, ${bg1}`;
              btn.style.setProperty('background', backgroundValue, 'important');
              btn.style.setProperty('border', 'none', 'important');
              btn.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
              
              const spans = btn.querySelectorAll('span');
              spans.forEach((span) => {
                span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
              
              const icons = btn.querySelectorAll('i');
              icons.forEach((icon) => {
                icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
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
          } else {
            buttonWrapper.appendChild(button);
            applyActiveStyles(button);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
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
              const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
              const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || '#ffffff';
              const backgroundValue = `${bgActiveButton}, ${bg1}`;
              button.style.setProperty('background', backgroundValue, 'important');
              button.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
              button.style.setProperty('border', 'none', 'important');
              const spans = button.querySelectorAll('span');
              spans.forEach(span => {
                span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
              const icons = button.querySelectorAll('i');
              icons.forEach(icon => {
                icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
            }
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
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
          // Intentar agregar la clase manualmente si no está (para floating)
          if (buttonArgs.floating && !button.classList.contains('ubits-button--floating')) {
            button.classList.add('ubits-button--floating');
          }

          // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
          const hasActiveFromRender = button.classList.contains('ubits-button--active');
          
          // Si active es true pero no tiene la clase, agregarla
          if ((buttonArgs.active || args.active) && !hasActiveFromRender) {
            button.classList.add('ubits-button--active');
          }
          
          // Verificar si tiene la clase active después de verificar
          const hasActiveClass = button.classList.contains('ubits-button--active');
          
          // Si el botón está en estado active, asegurar color azul desde el inicio
          if (buttonArgs.active || args.active || hasActiveClass) {
            // Asegurar fondo active con múltiples capas: bg-active-button sobre bg1
            const root = document.documentElement;
            const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
            const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || 'var(--modifiers-normal-color-light-bg-1)';
            const backgroundValue = `${bgActiveButton}, ${bg1}`;
            
            // Usar setProperty con !important para asegurar que se aplique
            button.style.setProperty('background', backgroundValue, 'important');
            button.style.setProperty('border', 'none', 'important');
            button.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
            
            const spans = button.querySelectorAll('span');
            spans.forEach((span) => {
              span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
            });
            
            const icons = button.querySelectorAll('i');
            icons.forEach((icon) => {
              icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
            });
          }
          
          // Aplicar tooltip UBITS si es necesario
          if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
            applyUBITSTooltip(button, buttonArgs.tooltipText);
          }
        }
      });
    }
    
    container.appendChild(preview);
    
    return container;
  },
};

// Función helper eliminada - el controlador de state fue removido
// La función applyButtonState fue completamente removida

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
    container.style.background = 'var(--modifiers-normal-color-light-bg-1), #ffffff)';
    container.style.borderRadius = '8px';
    
    const title = document.createElement('h3');
    title.textContent = 'Estado Active - Con nuevo fondo bg-active-button y texto accent-brand';
    title.style.marginBottom = '24px';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high, #303a47)';
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
    primaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
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
    secondaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
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
    tertiaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
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
    info.style.background = 'var(--modifiers-normal-color-light-bg-2), #f3f3f4)';
    info.style.borderRadius = '8px';
    info.style.marginTop = '24px';
    info.innerHTML = `
      <p style="margin: 0 0 8px 0; color: var(--modifiers-normal-color-light-fg-1-high, #303a47); font-weight: 600;">Estilo Active:</p>
      <ul style="margin: 0; padding-left: 20px; color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);">
        <li>Fondo: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-bg-active-button)</code> sobre <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-bg-1)</code></li>
        <li>Texto: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-accent-brand)</code> (usa token accent-brand según tema)</li>
        <li>Sin borde</li>
      </ul>
    `;
    container.appendChild(info);
    
    return container;
  },
};
