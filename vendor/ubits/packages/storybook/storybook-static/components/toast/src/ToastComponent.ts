/**
 * Web Component: ubits-toast (Opcional)
 * Componente de toast UBITS como Web Component nativo
 * Nota: El uso principal es a través de showToast(), este es opcional
 */

import type { ToastOptions, ToastType } from './types/ToastOptions';
import { renderToast } from './ToastProvider';

export class UBITSToast extends HTMLElement {
  private options: ToastOptions = { message: '' };
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private startTs: number | null = null;
  private remaining: number = 0;

  static get observedAttributes() {
    return [
      'type',
      'message',
      'duration',
      'no-close',
      'pause-on-hover'
    ];
  }

  connectedCallback() {
    this.updateOptions();
    this.render();
    this.attachEventListeners();
    this.setupTimer();
  }

  attributeChangedCallback() {
    this.updateOptions();
    this.render();
    this.attachEventListeners();
    this.setupTimer();
  }

  disconnectedCallback() {
    this.clearTimer();
  }

  private updateOptions() {
    this.options = {
      type: (this.getAttribute('type') as ToastType) || 'info',
      message: this.getAttribute('message') || this.textContent?.trim() || '',
      duration: this.getAttribute('duration') ? parseInt(this.getAttribute('duration') || '0', 10) : 0,
      noClose: this.getAttribute('no-close') === 'true',
      pauseOnHover: this.getAttribute('pause-on-hover') !== 'false',
      className: this.getAttribute('class') || ''
    };
  }

  private render() {
    this.innerHTML = renderToast(this.options);
    
    // Actualizar aria attributes
    const type = this.options.type || 'info';
    if (type === 'warning' || type === 'error') {
      this.setAttribute('role', 'alert');
      this.setAttribute('aria-live', 'assertive');
    } else {
      this.setAttribute('role', 'status');
      this.setAttribute('aria-live', 'polite');
    }

    // Agregar clase de entrada después de renderizar
    requestAnimationFrame(() => {
      this.classList.add('ubits-toast--enter');
    });
  }

  private attachEventListeners() {
    const closeButton = this.querySelector('.ubits-toast__close');
    
    if (closeButton) {
      const newCloseButton = closeButton.cloneNode(true);
      closeButton.parentNode?.replaceChild(newCloseButton, closeButton);
      
      newCloseButton.addEventListener('click', () => {
        this.close();
      });
    }

    // Botón de acción
    const actionButton = this.querySelector('[data-toast-action]');
    if (actionButton) {
      const newActionButton = actionButton.cloneNode(true);
      actionButton.parentNode?.replaceChild(newActionButton, actionButton);
      
      // El onClick se manejaría a través de un evento personalizado
      newActionButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('toast-action', {
          bubbles: true
        }));
      });
    }

    // Pausa en hover
    if (this.options.pauseOnHover && this.options.duration && this.options.duration > 0) {
      this.addEventListener('mouseenter', this.pauseTimer.bind(this));
      this.addEventListener('mouseleave', this.startTimer.bind(this));
      this.addEventListener('focusin', this.pauseTimer.bind(this));
      this.addEventListener('focusout', this.startTimer.bind(this));
    }
  }

  private setupTimer() {
    this.clearTimer();

    if (!this.options.duration || this.options.duration <= 0) {
      return; // Persistente
    }

    this.remaining = this.options.duration;
    this.startTimer();
  }

  private startTimer() {
    if (this.remaining <= 0) return;

    this.startTs = performance.now();
    this.timerId = setTimeout(() => {
      this.close();
    }, this.remaining);
  }

  private pauseTimer() {
    if (!this.timerId) return;

    clearTimeout(this.timerId);
    this.timerId = null;

    if (this.startTs) {
      const elapsed = performance.now() - this.startTs;
      this.remaining = Math.max(0, this.remaining - elapsed);
    }
  }

  private clearTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Cierra el toast con animación
   */
  public close() {
    this.clearTimer();
    this.classList.add('ubits-toast--exit');
    
    setTimeout(() => {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
      
      this.dispatchEvent(new CustomEvent('toast-closed', {
        bubbles: true,
        detail: { type: this.options.type }
      }));
    }, 180);
  }

  /**
   * Actualiza el mensaje del toast
   */
  public updateMessage(newMessage: string) {
    this.options.message = newMessage;
    this.setAttribute('message', newMessage);
    const textElement = this.querySelector('.ubits-toast__text');
    if (textElement) {
      textElement.textContent = newMessage;
    }
  }

  /**
   * Actualiza el tipo del toast
   */
  public updateType(newType: ToastType) {
    this.options.type = newType;
    this.setAttribute('type', newType);
    this.render();
    this.attachEventListeners();
    this.setupTimer();
  }
}

// Registrar el Web Component
if (typeof window !== 'undefined' && !customElements.get('ubits-toast')) {
  customElements.define('ubits-toast', UBITSToast);
}

