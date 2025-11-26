/**
 * Mask Provider
 * Componente de máscara para onboarding que destaca elementos con un overlay oscuro
 * Versión adaptada para Autorun (sin dependencia de Popover)
 */

import type { MaskOptions } from './types/MaskOptions';
import './styles/mask.css';

/**
 * Calcula la posición del elemento objetivo y actualiza las capas de la máscara
 */
function updateMaskLayers(
  overlay: HTMLElement,
  targetElement: HTMLElement,
  padding: number,
  savedRect?: DOMRect | null
): { top: number; left: number; width: number; height: number } {
  const rect = savedRect || targetElement.getBoundingClientRect();
  
  const leftCompensation = (overlay as any).__leftCompensation || 0;
  const topCompensation = (overlay as any).__topCompensation || 0;
  
  const isBodyFixed = document.body.style.position === 'fixed';
  const scrollTop = isBodyFixed ? 0 : (window.pageYOffset || document.documentElement.scrollTop);
  const scrollLeft = isBodyFixed ? 0 : (window.pageXOffset || document.documentElement.scrollLeft);

  const top = rect.top - padding + topCompensation;
  const left = rect.left - padding + leftCompensation;
  const width = rect.width + (padding * 2);
  const height = rect.height + (padding * 2);
  
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const topLayer = overlay.querySelector('.autorun-mask-layer--top') as HTMLElement;
  const bottomLayer = overlay.querySelector('.autorun-mask-layer--bottom') as HTMLElement;
  const leftLayer = overlay.querySelector('.autorun-mask-layer--left') as HTMLElement;
  const rightLayer = overlay.querySelector('.autorun-mask-layer--right') as HTMLElement;
  const highlight = overlay.querySelector('.autorun-mask-highlight') as HTMLElement;

  if (topLayer) {
    const topHeight = Math.max(0, top);
    topLayer.style.height = `${topHeight}px`;
  }

  if (bottomLayer) {
    const bottomTop = top + height;
    const bottomHeight = Math.max(0, windowHeight - bottomTop);
    bottomLayer.style.top = `${bottomTop}px`;
    bottomLayer.style.height = `${bottomHeight}px`;
  }

  if (leftLayer) {
    const leftWidth = Math.max(0, left);
    leftLayer.style.top = `${Math.max(0, top)}px`;
    leftLayer.style.width = `${leftWidth}px`;
    leftLayer.style.height = `${height}px`;
  }

  if (rightLayer) {
    const rightLeft = left + width;
    const rightWidth = Math.max(0, windowWidth - rightLeft);
    rightLayer.style.top = `${Math.max(0, top)}px`;
    rightLayer.style.left = `${rightLeft}px`;
    rightLayer.style.width = `${rightWidth}px`;
    rightLayer.style.height = `${height}px`;
  }

  if (highlight) {
    highlight.style.top = `${top}px`;
    highlight.style.left = `${left}px`;
    highlight.style.width = `${width}px`;
    highlight.style.height = `${height}px`;
  }

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  };
}

/**
 * Renderiza el HTML de un Mask
 */
export function renderMask(options: MaskOptions): string {
  const { className = '' } = options;

  const classes = [
    'autorun-mask-overlay',
    className
  ].filter(Boolean).join(' ');

  return `
    <div class="${classes}">
      <div class="autorun-mask-layer autorun-mask-layer--top"></div>
      <div class="autorun-mask-layer autorun-mask-layer--bottom"></div>
      <div class="autorun-mask-layer autorun-mask-layer--left"></div>
      <div class="autorun-mask-layer autorun-mask-layer--right"></div>
      <div class="autorun-mask-highlight"></div>
      <div class="autorun-mask-popover-container"></div>
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Mask en el DOM
 */
export function createMask(options: MaskOptions): {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  updateTarget: (newTarget: string | HTMLElement) => void;
  destroy: () => void;
} {
  const {
    containerId,
    targetElement: initialTarget,
    popover: popoverOptions,
    padding = 8,
    closeOnOverlayClick = true,
    onClose,
    open = false,
    popoverPosition = 'auto',
    popoverOffset = 12
  } = options;

  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderMask(options);
  const overlay = wrapper.firstElementChild as HTMLElement;

  if (!overlay) {
    throw new Error('No se pudo crear la máscara');
  }

  const getTargetElement = (): HTMLElement | null => {
    if (typeof initialTarget === 'string') {
      return document.querySelector(initialTarget) as HTMLElement;
    } else {
      return initialTarget;
    }
  };

  let targetElement: HTMLElement | null = getTargetElement();
  const popoverContainer = overlay.querySelector('.autorun-mask-popover-container') as HTMLElement;
  
  let savedScrollY = 0;
  let savedScrollX = 0;
  let savedTargetRect: DOMRect | null = null;

  const updateMaskPosition = () => {
    if (!targetElement) {
      console.warn('⚠️ [Mask.updateMaskPosition] No hay targetElement');
      return;
    }

    const shouldRecalculate = !savedTargetRect;
    const rectToUse = shouldRecalculate ? targetElement.getBoundingClientRect() : savedTargetRect;
    
    const leftCompensation = (overlay as any).__leftCompensation || 0;
    const topCompensation = (overlay as any).__topCompensation || 0;
    
    const targetRect = updateMaskLayers(overlay, targetElement, padding, rectToUse);

    // Crear popover básico si existe configuración
    if (popoverOptions && popoverContainer) {
      if (!popoverContainer.querySelector('.autorun-mask-popover')) {
        const popover = document.createElement('div');
        popover.className = 'autorun-mask-popover';
        popover.style.cssText = `
          position: absolute;
          background: var(--autorun-bg-1);
          border: 1px solid var(--autorun-border-1);
          border-radius: var(--autorun-border-radius-md);
          padding: var(--autorun-spacing-md);
          max-width: 360px;
          box-shadow: var(--autorun-effects-elevation-3);
          z-index: 10001;
        `;
        
        if (popoverOptions.title) {
          const title = document.createElement('h3');
          title.textContent = popoverOptions.title;
          title.style.cssText = `
            margin: 0 0 var(--autorun-spacing-sm) 0;
            font-size: var(--modifiers-normal-heading-h3-fontsize);
            font-weight: var(--weight-semibold);
            color: var(--autorun-fg-1-high);
          `;
          popover.appendChild(title);
        }
        
        if (popoverOptions.content) {
          const content = document.createElement('p');
          content.textContent = popoverOptions.content;
          content.style.cssText = `
            margin: 0;
            font-size: var(--modifiers-normal-body-md-regular-fontsize);
            color: var(--autorun-fg-1-medium);
          `;
          popover.appendChild(content);
        }
        
        if (popoverOptions.onClose) {
          const closeBtn = document.createElement('button');
          closeBtn.textContent = 'Cerrar';
          closeBtn.className = 'autorun-button autorun-button--secondary autorun-button--sm';
          closeBtn.onclick = () => {
            popoverOptions.onClose?.();
            closeMask();
          };
          popover.appendChild(closeBtn);
        }
        
        popoverContainer.appendChild(popover);
      }
      
      // Posicionar popover
      const popoverEl = popoverContainer.querySelector('.autorun-mask-popover') as HTMLElement;
      if (popoverEl) {
        const centerX = targetRect.left + targetRect.width / 2;
        const centerY = targetRect.top + targetRect.height / 2;
        
        let top = 0;
        let left = 0;
        
        if (popoverPosition === 'auto' || popoverPosition === 'bottom') {
          top = targetRect.top + targetRect.height + popoverOffset;
          left = centerX;
          popoverEl.style.transform = 'translateX(-50%)';
        } else if (popoverPosition === 'top') {
          top = targetRect.top - (popoverEl.offsetHeight || 200) - popoverOffset;
          left = centerX;
          popoverEl.style.transform = 'translateX(-50%)';
        } else if (popoverPosition === 'right') {
          top = centerY;
          left = targetRect.left + targetRect.width + popoverOffset;
          popoverEl.style.transform = 'translateY(-50%)';
        } else if (popoverPosition === 'left') {
          top = centerY;
          left = targetRect.left - (popoverEl.offsetWidth || 360) - popoverOffset;
          popoverEl.style.transform = 'translateY(-50%)';
        }
        
        popoverEl.style.top = `${top}px`;
        popoverEl.style.left = `${left}px`;
      }
    }
  };

  const openMask = () => {
    targetElement = getTargetElement();

    if (!targetElement) {
      console.error('❌ [Mask] No se encontró el elemento objetivo al abrir:', initialTarget);
      return;
    }
    
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    savedScrollX = window.scrollX || window.pageXOffset || 0;

    const rectBefore = targetElement.getBoundingClientRect();
    
    overlay.classList.add('autorun-mask-overlay--open');
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = `-${savedScrollX}px`;
    document.body.style.width = '100%';
    
    (overlay as any).__modifiedParents = [];

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rectAfter = targetElement!.getBoundingClientRect();
        const topDiff = rectAfter.top - rectBefore.top;
        const leftDiff = rectAfter.left - rectBefore.left;
        
        if (Math.abs(leftDiff) > 0.1 || Math.abs(topDiff) > 0.1) {
          savedTargetRect = rectAfter;
          (overlay as any).__leftCompensation = 0;
          (overlay as any).__topCompensation = 0;
        } else {
          savedTargetRect = rectBefore;
          (overlay as any).__leftCompensation = 0;
          (overlay as any).__topCompensation = 0;
        }
        
        updateMaskPosition();
        
        const handleResize = () => {
          savedTargetRect = null;
          updateMaskPosition();
        };
        
        window.addEventListener('scroll', updateMaskPosition, true);
        window.addEventListener('resize', handleResize);
        
        (overlay as any).__handleResize = handleResize;
        (overlay as any).__handleScroll = updateMaskPosition;
      });
    });
  };

  const closeMask = () => {
    overlay.classList.remove('autorun-mask-overlay--open');
    
    savedTargetRect = null;
    
    const handleResize = (overlay as any).__handleResize;
    const handleScroll = (overlay as any).__handleScroll;
    if (handleResize) {
      window.removeEventListener('resize', handleResize);
    }
    if (handleScroll) {
      window.removeEventListener('scroll', handleScroll, true);
    }
    
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    
    document.documentElement.style.paddingRight = '';
    
    const modifiedParents = (overlay as any).__modifiedParents || [];
    modifiedParents.forEach((el: HTMLElement) => {
      el.style.paddingRight = '';
    });
    (overlay as any).__modifiedParents = [];
    
    (overlay as any).__leftCompensation = 0;
    (overlay as any).__topCompensation = 0;
    
    window.scrollTo(savedScrollX, savedScrollY);

    if (onClose) {
      onClose();
    }
  };

  const updateTarget = (newTarget: string | HTMLElement) => {
    if (typeof newTarget === 'string') {
      targetElement = document.querySelector(newTarget) as HTMLElement;
    } else {
      targetElement = newTarget;
    }

    if (!targetElement) {
      console.error('❌ [Mask] No se encontró el nuevo elemento objetivo:', newTarget);
      return;
    }

    if (overlay.classList.contains('autorun-mask-overlay--open')) {
      updateMaskPosition();
    }
  };

  const destroy = () => {
    closeMask();
    if (overlay.parentElement) {
      overlay.parentElement.removeChild(overlay);
    }
  };

  if (closeOnOverlayClick) {
    overlay.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('autorun-mask-layer') || target.classList.contains('autorun-mask-overlay')) {
        closeMask();
      }
    });
  }

  container.appendChild(overlay);

  if (open) {
    if (!targetElement) {
      requestAnimationFrame(() => {
        targetElement = getTargetElement();
        if (targetElement) {
          openMask();
        } else {
          setTimeout(() => {
            targetElement = getTargetElement();
            if (targetElement) {
              openMask();
            }
          }, 100);
        }
      });
    } else {
      openMask();
    }
  }

  return {
    element: overlay,
    open: openMask,
    close: closeMask,
    updateTarget,
    destroy
  };
}

