/**
 * Tooltip Provider
 * Componente tooltip con tail (flecha) para mostrar información contextual
 * Similar al Popover pero más simple, con título, descripción y botones
 */

import type { TooltipOptions } from './types/TooltipOptions';

/**
 * Anchos del tooltip en píxeles
 */
const TOOLTIP_WIDTHS: Record<string, string> = {
  sm: '240px',
  md: '320px',
  lg: '400px'
};

/**
 * Renderiza el HTML de un Tooltip
 */
export function renderTooltip(options: TooltipOptions): string {
  const {
    title,
    showTitle = true,
    description,
    showDescription = true,
    primaryButtonLabel,
    showPrimaryButton = false,
    primaryButtonIcon,
    showPrimaryButtonIcon = false,
    secondaryButtonLabel,
    showSecondaryButton = false,
    secondaryButtonIcon,
    showSecondaryButtonIcon = false,
    tertiaryButtonLabel,
    showTertiaryButton = false,
    tertiaryButtonIcon,
    showTertiaryButtonIcon = false,
    width = 'md',
    tailPosition = 'top',
    tailOffset = 0,
    className = '',
    style = ''
  } = options;

  // Mapear tamaño del tooltip al tamaño de los botones
  const buttonSizeMap: Record<string, string> = {
    sm: 'xs',
    md: 'sm',
    lg: 'md'
  };
  const buttonSize = buttonSizeMap[width] || 'sm';
  
  // Calcular cantidad de botones visibles
  const buttonCount = (showPrimaryButton ? 1 : 0) + 
                     (showSecondaryButton ? 1 : 0) + 
                     (showTertiaryButton ? 1 : 0);
  
  // Calcular min-width y max-width según tamaño y cantidad de botones
  const baseMinWidths: Record<string, number> = { sm: 120, md: 160, lg: 200 };
  const baseMaxWidths: Record<string, number> = { sm: 240, md: 320, lg: 400 };
  let minWidth = baseMinWidths[width] || baseMinWidths.md;
  let maxWidth = baseMaxWidths[width] || baseMaxWidths.md;
  
  // Si hay botones, aumentar el max-width para que no se corte
  if (buttonCount === 3) {
    maxWidth = Math.max(maxWidth, 420);
  } else if (buttonCount === 2) {
    maxWidth = Math.max(maxWidth, 360);
  }
  
  // Usar min-width y max-width en lugar de width fijo para que se adapte al contenido
  // El tooltip se ajustará al contenido pero tendrá límites mínimos y máximos
  const tooltipWidthStyle = `min-width: ${minWidth}px; max-width: ${maxWidth}px; width: auto;`;
  const tailPositionClass = `ubits-tooltip--tail-${tailPosition}`;

  // Construir clases (sin clase de ancho fijo, usamos estilos inline para ancho adaptativo)
  const classes = [
    'ubits-tooltip',
    tailPositionClass,
    className
  ].filter(Boolean).join(' ');

  // Combinar estilos: ancho adaptativo + estilos personalizados
  const combinedStyle = `${tooltipWidthStyle}${style ? `; ${style}` : ''}`;
  const styleAttr = ` style="${combinedStyle}"`;

  // Tail HTML (flecha) - siempre mostrar, la posición se controla con CSS
  // Usar transform para el offset en lugar de left/top para que se adapte al contenedor
  let tailStyle = '';
  if (tailOffset) {
    if (tailPosition === 'top' || tailPosition === 'bottom') {
      tailStyle = `transform: translateX(calc(-50% + ${tailOffset}px));`;
    } else {
      tailStyle = `transform: translateY(calc(-50% + ${tailOffset}px));`;
    }
  }
  const tailHTML = `
    <div class="ubits-tooltip__tail"${tailStyle ? ` style="${tailStyle}"` : ''}>
      <div class="ubits-tooltip__tail-inner"></div>
    </div>
  `;

  // Header HTML (solo si hay título y showTitle es true)
  const headerHTML = (showTitle && title) ? `
    <div class="ubits-tooltip__header">
      <div class="ubits-tooltip__header-title">
        <p class="ubits-body-md-semibold">${title}</p>
      </div>
    </div>
  ` : '';

  // Body HTML (solo si hay descripción y showDescription es true)
  const bodyHTML = (showDescription && description) ? `
    <div class="ubits-tooltip__body">
      <div class="ubits-tooltip__body-content">
        <p class="ubits-body-md">${description}</p>
      </div>
    </div>
  ` : '';

  // Footer HTML (solo si hay botones)
  let footerHTML = '';
  const hasButtons = showPrimaryButton || showSecondaryButton || showTertiaryButton;
  
  if (hasButtons) {
    // Botón primario
    let primaryButtonContent = primaryButtonLabel || '';
    if (showPrimaryButtonIcon && primaryButtonIcon) {
      primaryButtonContent = `<i class="far fa-${primaryButtonIcon}"></i> ${primaryButtonContent}`;
    }
    const primaryButton = (showPrimaryButton && primaryButtonLabel) 
      ? `<button class="ubits-button ubits-button--primary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="primary" type="button">${primaryButtonContent}</button>`
      : '';

    // Botón secundario
    let secondaryButtonContent = secondaryButtonLabel || '';
    if (showSecondaryButtonIcon && secondaryButtonIcon) {
      secondaryButtonContent = `<i class="far fa-${secondaryButtonIcon}"></i> ${secondaryButtonContent}`;
    }
    const secondaryButton = (showSecondaryButton && secondaryButtonLabel)
      ? `<button class="ubits-button ubits-button--secondary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="secondary" type="button">${secondaryButtonContent}</button>`
      : '';

    // Botón terciario
    let tertiaryButtonContent = tertiaryButtonLabel || '';
    if (showTertiaryButtonIcon && tertiaryButtonIcon) {
      tertiaryButtonContent = `<i class="far fa-${tertiaryButtonIcon}"></i> ${tertiaryButtonContent}`;
    }
    const tertiaryButton = (showTertiaryButton && tertiaryButtonLabel)
      ? `<button class="ubits-button ubits-button--tertiary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="tertiary" type="button">${tertiaryButtonContent}</button>`
      : '';

    footerHTML = `
      <div class="ubits-tooltip__footer">
        <div class="ubits-tooltip__footer-actions${!showTertiaryButton ? ' ubits-tooltip__footer-actions--no-tertiary' : ''}">
          ${tertiaryButton ? `
          <div class="ubits-tooltip__footer-left">
            ${tertiaryButton}
          </div>
          ` : ''}
          <div class="ubits-tooltip__footer-right">
            ${secondaryButton}
            ${primaryButton}
          </div>
        </div>
      </div>
    `;
  }

  // Tooltip container HTML
  // El content se ajusta al ancho del tooltip (que tiene max-width) y crece verticalmente
  return `
    <div class="${classes}"${styleAttr}>
      ${tailHTML}
      <div class="ubits-tooltip__content">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Tooltip en el DOM
 */
export function createTooltip(options: TooltipOptions): {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  updatePosition: (position: { top?: number; left?: number; right?: number; bottom?: number }) => void;
  destroy: () => void;
} {
  const {
    onClose,
    closeOnOutsideClick = true,
    open = false,
    position,
    referenceElement,
    onPrimaryAction,
    onSecondaryAction,
    onTertiaryAction
  } = options;

  // Crear contenedor
  const container = document.body;

  // Crear elemento del tooltip
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderTooltip(options);
  const tooltip = wrapper.firstElementChild as HTMLElement;

  if (!tooltip) {
    throw new Error('No se pudo crear el tooltip');
  }

  // Aplicar posición inicial si se proporciona
  if (position) {
    tooltip.style.position = 'fixed';
    const tailPosition = options.tailPosition || 'top';
    
    // Aplicar transform según la posición del tail
    if (tailPosition === 'top' || tailPosition === 'bottom') {
      // Centrar horizontalmente
      if (position.left !== undefined) {
        tooltip.style.left = `${position.left}px`;
        tooltip.style.transform = 'translateX(-50%)';
      }
      if (position.top !== undefined) {
        tooltip.style.top = `${position.top}px`;
      }
    } else if (tailPosition === 'left') {
      // Tooltip a la derecha del elemento, tail izquierda apuntando al elemento
      if (position.top !== undefined) {
        tooltip.style.top = `${position.top}px`;
        tooltip.style.transform = 'translateY(-50%)';
      }
      if (position.left !== undefined) {
        tooltip.style.left = `${position.left}px`;
      }
    } else if (tailPosition === 'right') {
      // Tooltip a la izquierda del elemento, tail derecha apuntando al elemento
      if (position.top !== undefined) {
        tooltip.style.top = `${position.top}px`;
        tooltip.style.transform = 'translateY(-50%)';
      }
      if (position.left !== undefined) {
        tooltip.style.left = `${position.left}px`;
      }
    }
  }

  // Funciones de control
  const openTooltip = () => {
    tooltip.classList.add('ubits-tooltip--open');
    
    // El posicionamiento ya se aplicó al crear el elemento, solo asegurar que está correcto
    if (position) {
      tooltip.style.position = 'fixed';
      const tailPosition = options.tailPosition || 'top';
      
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        if (position.left !== undefined) {
          tooltip.style.left = `${position.left}px`;
          tooltip.style.transform = 'translateX(-50%)';
        }
        if (position.top !== undefined) {
          tooltip.style.top = `${position.top}px`;
        }
      } else if (tailPosition === 'left') {
        if (position.top !== undefined) {
          tooltip.style.top = `${position.top}px`;
          tooltip.style.transform = 'translateY(-50%)';
        }
        if (position.left !== undefined) {
          tooltip.style.left = `${position.left}px`;
        }
      } else if (tailPosition === 'right') {
        if (position.top !== undefined) {
          tooltip.style.top = `${position.top}px`;
          tooltip.style.transform = 'translateY(-50%)';
        }
        if (position.left !== undefined) {
          tooltip.style.left = `${position.left}px`;
        }
      }
    } else if (referenceElement) {
      // Posicionar relativo al elemento de referencia
      const rect = referenceElement.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Por defecto, posicionar debajo del elemento
      tooltip.style.position = 'fixed';
      tooltip.style.top = `${rect.bottom + 8}px`;
      tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
    }
  };

  const closeTooltip = () => {
    tooltip.classList.remove('ubits-tooltip--open');
    if (onClose) {
      onClose();
    }
  };

  const updatePosition = (newPosition: { top?: number; left?: number; right?: number; bottom?: number }) => {
    const tailPosition = options.tailPosition || 'top';
    
    if (newPosition.top !== undefined) tooltip.style.top = `${newPosition.top}px`;
    if (newPosition.left !== undefined) tooltip.style.left = `${newPosition.left}px`;
    if (newPosition.right !== undefined) tooltip.style.right = `${newPosition.right}px`;
    if (newPosition.bottom !== undefined) tooltip.style.bottom = `${newPosition.bottom}px`;
    
    // Mantener el transform correcto según tailPosition
    if (tailPosition === 'top' || tailPosition === 'bottom') {
      if (newPosition.left !== undefined) {
        tooltip.style.transform = 'translateX(-50%)';
      }
    } else if (tailPosition === 'left' || tailPosition === 'right') {
      if (newPosition.top !== undefined) {
        tooltip.style.transform = 'translateY(-50%)';
      }
    }
  };

  let destroy = () => {
    if (tooltip.parentElement) {
      tooltip.parentElement.removeChild(tooltip);
    }
  };

  // Event listeners
  if (closeOnOutsideClick) {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // No cerrar si el click es en el botón que abre el tooltip o dentro del tooltip
      if (tooltip.classList.contains('ubits-tooltip--open') && !tooltip.contains(target)) {
        const clickedElement = target as HTMLElement;
        const isTriggerButton = clickedElement.closest && clickedElement.closest('[data-tooltip-trigger]');
        
        if (!isTriggerButton) {
          closeTooltip();
        }
      }
    };
    
    // Usar capture phase para detectar antes que otros handlers
    document.addEventListener('click', handleClickOutside, true);
    
    // Limpiar listener al destruir
    const originalDestroy = destroy;
    destroy = () => {
      document.removeEventListener('click', handleClickOutside, true);
      originalDestroy();
    };
  }

  // Agregar event listeners a los botones del footer
  if (onPrimaryAction) {
    const primaryButton = tooltip.querySelector('[data-action="primary"]') as HTMLButtonElement;
    if (primaryButton) {
      primaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        onPrimaryAction();
      });
    }
  }

  if (onSecondaryAction) {
    const secondaryButton = tooltip.querySelector('[data-action="secondary"]') as HTMLButtonElement;
    if (secondaryButton) {
      secondaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSecondaryAction();
      });
    }
  }

  if (onTertiaryAction) {
    const tertiaryButton = tooltip.querySelector('[data-action="tertiary"]') as HTMLButtonElement;
    if (tertiaryButton) {
      tertiaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        onTertiaryAction();
      });
    }
  }

  // Función para centrar el tail del tooltip
  const centerTooltipTail = () => {
    const tailElement = tooltip.querySelector('.ubits-tooltip__tail') as HTMLElement;
    if (!tailElement) return;
    
    const tailPosition = options.tailPosition || 'top';
    const tailOffset = options.tailOffset || 0;
    const hasOffset = tailOffset !== 0;
    
    // Si no hay offset, remover todos los estilos inline y dejar que CSS maneje el centrado
    if (!hasOffset) {
      tailElement.style.removeProperty('left');
      tailElement.style.removeProperty('right');
      tailElement.style.removeProperty('top');
      tailElement.style.removeProperty('bottom');
      tailElement.style.removeProperty('transform');
      tailElement.style.removeProperty('margin-left');
      tailElement.style.removeProperty('margin-right');
    } else {
      // Si hay offset, mantener solo el transform con el offset
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        tailElement.style.left = '50%';
        tailElement.style.right = 'auto';
        tailElement.style.transform = `translateX(calc(-50% + ${tailOffset}px))`;
        if (tailPosition === 'bottom') {
          tailElement.style.transform += ' rotate(180deg)';
        }
      } else {
        tailElement.style.top = '50%';
        tailElement.style.bottom = 'auto';
        tailElement.style.transform = `translateY(calc(-50% + ${tailOffset}px))`;
      }
    }
    
    // Forzar reflow
    void tailElement.offsetHeight;
  };
  
  // Observar cambios en el tamaño del tooltip para recalcular el tail
  if (typeof ResizeObserver !== 'undefined') {
    try {
      const resizeObserver = new ResizeObserver(() => {
        centerTooltipTail();
      });
      resizeObserver.observe(tooltip);
      
      // Guardar referencia para poder desconectarlo después
      (tooltip as any)._tailResizeObserver = resizeObserver;
      
      // Centrar el tail inicialmente
      setTimeout(() => {
        centerTooltipTail();
      }, 50);
    } catch (error) {
      console.warn('⚠️ [TooltipProvider] Error al crear ResizeObserver:', error);
      // Centrar el tail de todas formas
      setTimeout(() => {
        centerTooltipTail();
      }, 50);
    }
  } else {
    // Si ResizeObserver no está disponible, centrar después de un delay
    setTimeout(() => {
      centerTooltipTail();
    }, 100);
  }
  
  // Actualizar destroy para limpiar el ResizeObserver
  const originalDestroy = destroy;
  destroy = () => {
    if ((tooltip as any)._tailResizeObserver) {
      (tooltip as any)._tailResizeObserver.disconnect();
      delete (tooltip as any)._tailResizeObserver;
    }
    originalDestroy();
  };

  // Agregar al DOM
  container.appendChild(tooltip);

  // Abrir si está configurado para abrirse inicialmente
  if (open) {
    openTooltip();
  }

  return {
    element: tooltip,
    open: openTooltip,
    close: closeTooltip,
    updatePosition,
    destroy
  };
}

