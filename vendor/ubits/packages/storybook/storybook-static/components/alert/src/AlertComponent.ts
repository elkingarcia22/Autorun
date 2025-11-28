/**
 * Web Component: ubits-alert
 * Componente de alert UBITS como Web Component nativo
 */

import type { AlertOptions, AlertType } from './types/AlertOptions';
import { renderAlert } from './AlertProvider';

export class UBITSAlert extends HTMLElement {
  private options: AlertOptions = {};
  private closeTimeout: number | null = null;

  static get observedAttributes() {
    return [
      'type',
      'message',
      'closable',
      'duration'
    ];
  }

  connectedCallback() {
    this.updateOptions();
    this.render();
    this.attachEventListeners();
    this.setupAutoClose();
  }

  attributeChangedCallback() {
    this.updateOptions();
    this.render();
    this.attachEventListeners();
    this.setupAutoClose();
  }

  disconnectedCallback() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  private updateOptions() {
    this.options = {
      type: (this.getAttribute('type') as AlertType) || 'success',
      message: this.getAttribute('message') || this.textContent?.trim() || '',
      closable: this.getAttribute('closable') !== 'false',
      duration: this.getAttribute('duration') ? parseInt(this.getAttribute('duration') || '0', 10) : 0,
      className: this.getAttribute('class') || ''
    };
  }

  private render() {
    this.innerHTML = renderAlert(this.options);
    
    // Actualizar aria attributes para accesibilidad
    this.setAttribute('role', 'alert');
    this.setAttribute('aria-live', 'polite');
  }

  private attachEventListeners() {
    const closeButton = this.querySelector('.ubits-alert__close');
    
    if (closeButton) {
      // Remover listeners previos
      const newCloseButton = closeButton.cloneNode(true);
      closeButton.parentNode?.replaceChild(newCloseButton, closeButton);
      
      // Agregar nuevo listener
      newCloseButton.addEventListener('click', () => {
        this.close();
      });
    }
  }

  private setupAutoClose() {
    // Limpiar timeout previo
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    // Configurar nuevo timeout si duration > 0
    if (this.options.duration && this.options.duration > 0) {
      this.closeTimeout = window.setTimeout(() => {
        this.close();
      }, this.options.duration);
    }
  }

  /**
   * Cierra el alert con animación
   */
  public close() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    // Agregar clase de cierre para animación
    this.classList.add('ubits-alert--closing');
    
    // Remover después de la animación
    setTimeout(() => {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
      
      // Disparar evento personalizado
      this.dispatchEvent(new CustomEvent('alert-closed', {
        bubbles: true,
        detail: { type: this.options.type }
      }));
    }, 300); // Duración de la animación
  }

  /**
   * Actualiza el mensaje del alert
   */
  public updateMessage(newMessage: string) {
    this.options.message = newMessage;
    const textElement = this.querySelector('.ubits-alert__text');
    if (textElement) {
      textElement.textContent = newMessage;
    }
  }

  /**
   * Actualiza el tipo del alert
   */
  public updateType(newType: AlertType) {
    this.options.type = newType;
    this.setAttribute('type', newType);
    this.render();
    this.attachEventListeners();
  }
}

// Registrar el Web Component
if (typeof window !== 'undefined' && !customElements.get('ubits-alert')) {
  customElements.define('ubits-alert', UBITSAlert);
}

