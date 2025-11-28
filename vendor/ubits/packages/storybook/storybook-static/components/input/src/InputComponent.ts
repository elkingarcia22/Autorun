/**
 * InputComponent
 * Web Component para el componente Input UBITS
 */

import type { InputOptions, InputState } from './types/InputOptions';
import { renderInput, createInput } from './InputProvider';

export class UBITSInput extends HTMLElement {
  private options: InputOptions;
  private inputInstance: ReturnType<typeof createInput> | null = null;

  static get observedAttributes() {
    return [
      'container-id',
      'label',
      'placeholder',
      'helper-text',
      'size',
      'state',
      'type',
      'show-label',
      'show-helper',
      'show-counter',
      'max-length',
      'mandatory',
      'mandatory-type',
      'left-icon',
      'right-icon',
      'value'
    ];
  }

  connectedCallback() {
    this.updateOptions();
    this.render();
  }

  attributeChangedCallback() {
    this.updateOptions();
    this.render();
  }

  private updateOptions() {
    // Usar el ID del elemento como containerId si no se especifica
    const containerId = this.getAttribute('container-id') || this.id || `ubits-input-${Math.random().toString(36).substr(2, 9)}`;
    
    // Crear contenedor si no existe
    if (!document.getElementById(containerId)) {
      const container = document.createElement('div');
      container.id = containerId;
      this.appendChild(container);
    }

    this.options = {
      containerId,
      label: this.getAttribute('label') || '',
      placeholder: this.getAttribute('placeholder') || '',
      helperText: this.getAttribute('helper-text') || '',
      size: (this.getAttribute('size') as any) || 'md',
      state: (this.getAttribute('state') as InputState) || 'default',
      type: (this.getAttribute('type') as any) || 'text',
      showLabel: this.hasAttribute('show-label') ? this.getAttribute('show-label') !== 'false' : true,
      showHelper: this.hasAttribute('show-helper') ? this.getAttribute('show-helper') !== 'false' : false,
      showCounter: this.hasAttribute('show-counter') ? this.getAttribute('show-counter') !== 'false' : false,
      maxLength: this.hasAttribute('max-length') ? parseInt(this.getAttribute('max-length') || '50', 10) : 50,
      mandatory: this.hasAttribute('mandatory') ? this.getAttribute('mandatory') !== 'false' : false,
      mandatoryType: (this.getAttribute('mandatory-type') as any) || 'obligatorio',
      leftIcon: this.getAttribute('left-icon') || '',
      rightIcon: this.getAttribute('right-icon') || '',
      value: this.getAttribute('value') || '',
    };

    // Parsear selectOptions y autocompleteOptions desde data attributes
    const selectOptionsAttr = this.getAttribute('select-options');
    if (selectOptionsAttr) {
      try {
        this.options.selectOptions = JSON.parse(selectOptionsAttr);
      } catch (e) {
        console.warn('UBITS Input: Error parsing select-options', e);
      }
    }

    const autocompleteOptionsAttr = this.getAttribute('autocomplete-options');
    if (autocompleteOptionsAttr) {
      try {
        this.options.autocompleteOptions = JSON.parse(autocompleteOptionsAttr);
      } catch (e) {
        console.warn('UBITS Input: Error parsing autocomplete-options', e);
      }
    }
  }

  private render() {
    const container = document.getElementById(this.options.containerId);
    if (!container) return;

    // Limpiar contenido anterior
    container.innerHTML = '';

    // Crear input
    this.inputInstance = createInput(this.options);

    if (this.inputInstance) {
      // Agregar event listeners personalizados si existen
      const onChangeHandler = this.getAttribute('on-change');
      if (onChangeHandler && this.inputInstance.inputElement) {
        this.inputInstance.inputElement.addEventListener('input', (e) => {
          const event = new CustomEvent('ubits-input-change', {
            bubbles: true,
            detail: { value: (e.target as HTMLInputElement).value }
          });
          this.dispatchEvent(event);
        });
      }
    }
  }

  // Métodos públicos
  public getValue(): string {
    return this.inputInstance?.getValue() || '';
  }

  public setValue(value: string): void {
    if (this.inputInstance) {
      this.inputInstance.setValue(value);
      this.setAttribute('value', value);
    }
  }

  public focus(): void {
    this.inputInstance?.focus();
  }

  public blur(): void {
    this.inputInstance?.blur();
  }

  public disable(): void {
    if (this.inputInstance) {
      this.inputInstance.disable();
      this.setAttribute('state', 'disabled');
    }
  }

  public enable(): void {
    if (this.inputInstance) {
      this.inputInstance.enable();
      this.setAttribute('state', 'default');
    }
  }

  public setState(newState: InputState): void {
    if (this.inputInstance) {
      this.inputInstance.setState(newState);
      this.setAttribute('state', newState);
    }
  }
}

// Register the Web Component
if (typeof window !== 'undefined' && !customElements.get('ubits-input')) {
  customElements.define('ubits-input', UBITSInput);
}

