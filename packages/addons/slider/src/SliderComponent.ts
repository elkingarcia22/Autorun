/**
 * SliderComponent
 * Web Component para el componente Slider UBITS
 */

import type { SliderOptions, SliderState } from './types/SliderOptions';
import { renderSlider, createSlider } from './SliderProvider';

export class UBITSSlider extends HTMLElement {
  private options!: SliderOptions;
  private sliderInstance: ReturnType<typeof createSlider> | null = null;

  static get observedAttributes() {
    return [
      'container-id',
      'label',
      'helper-text',
      'size',
      'state',
      'orientation',
      'mode',
      'min',
      'max',
      'step',
      'value',
      'values',
      'show-inputs',
      'show-label',
      'show-helper',
      'show-marks',
      'marks'
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
    const containerId = this.getAttribute('container-id') || this.id || `ubits-slider-${Math.random().toString(36).substr(2, 9)}`;
    
    if (!document.getElementById(containerId)) {
      const container = document.createElement('div');
      container.id = containerId;
      this.appendChild(container);
    }

    // Parsear values desde data attribute
    let values: [number, number] | undefined;
    const valuesAttr = this.getAttribute('values');
    if (valuesAttr) {
      try {
        const parsed = JSON.parse(valuesAttr);
        if (Array.isArray(parsed) && parsed.length === 2) {
          values = [parsed[0], parsed[1]];
        }
      } catch (e) {
        console.warn('UBITS Slider: Error parsing values', e);
      }
    }

    // Parsear marks desde data attribute
    let marks: number[] | undefined;
    const marksAttr = this.getAttribute('marks');
    if (marksAttr) {
      try {
        marks = JSON.parse(marksAttr);
      } catch (e) {
        console.warn('UBITS Slider: Error parsing marks', e);
      }
    }

    this.options = {
      containerId,
      label: this.getAttribute('label') || '',
      helperText: this.getAttribute('helper-text') || '',
      size: (this.getAttribute('size') as any) || 'md',
      state: (this.getAttribute('state') as SliderState) || 'default',
      orientation: (this.getAttribute('orientation') as any) || 'horizontal',
      mode: (this.getAttribute('mode') as any) || 'single',
      min: this.hasAttribute('min') ? parseFloat(this.getAttribute('min') || '0') : 0,
      max: this.hasAttribute('max') ? parseFloat(this.getAttribute('max') || '100') : 100,
      step: this.hasAttribute('step') ? parseFloat(this.getAttribute('step') || '1') : 1,
      value: this.hasAttribute('value') ? parseFloat(this.getAttribute('value') || '50') : 50,
      values: values || [25, 75],
      showInputs: this.hasAttribute('show-inputs') ? this.getAttribute('show-inputs') !== 'false' : false,
      showLabel: this.hasAttribute('show-label') ? this.getAttribute('show-label') !== 'false' : true,
      showHelper: this.hasAttribute('show-helper') ? this.getAttribute('show-helper') !== 'false' : false,
      showMarks: this.hasAttribute('show-marks') ? this.getAttribute('show-marks') !== 'false' : false,
      marks: marks || []
    };
  }

  private render() {
    const container = document.getElementById(this.options.containerId);
    if (!container) return;

    container.innerHTML = '';

    this.sliderInstance = createSlider({
      ...this.options,
      onChange: (value, event) => {
        this.setAttribute('value', value.toString());
        this.dispatchEvent(new CustomEvent('ubits-slider-change', {
          bubbles: true,
          detail: { value }
        }));
      },
      onRangeChange: (values, event) => {
        this.setAttribute('values', JSON.stringify(values));
        this.dispatchEvent(new CustomEvent('ubits-slider-range-change', {
          bubbles: true,
          detail: { values }
        }));
      }
    });
  }

  // Métodos públicos
  public getValue(): number | [number, number] {
    return this.sliderInstance?.getValue() || (this.options.mode === 'range' ? [25, 75] : 50);
  }

  public setValue(value: number | [number, number]): void {
    if (this.sliderInstance) {
      this.sliderInstance.setValue(value);
      if (this.options.mode === 'range' && Array.isArray(value)) {
        this.setAttribute('values', JSON.stringify(value));
      } else if (typeof value === 'number') {
        this.setAttribute('value', value.toString());
      }
    }
  }

  public disable(): void {
    if (this.sliderInstance) {
      this.sliderInstance.disable();
      this.setAttribute('state', 'disabled');
    }
  }

  public enable(): void {
    if (this.sliderInstance) {
      this.sliderInstance.enable();
      this.setAttribute('state', 'default');
    }
  }

  public setState(newState: SliderState): void {
    if (this.sliderInstance) {
      this.sliderInstance.setState(newState);
      this.setAttribute('state', newState);
    }
  }
}

// Register the Web Component
if (typeof window !== 'undefined' && !customElements.get('ubits-slider')) {
  customElements.define('ubits-slider', UBITSSlider);
}

