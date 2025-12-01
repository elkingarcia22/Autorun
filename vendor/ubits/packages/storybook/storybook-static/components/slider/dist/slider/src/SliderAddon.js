/**
 * SliderAddon
 * Add-on para el componente Slider UBITS
 */
import { UBITSSlider } from './SliderComponent';
import './styles/slider.css';
export class SliderAddon {
    constructor() {
        this.name = '@ubits/slider';
        this.version = '1.0.0';
    }
    async initialize(context) {
        // Registrar el Web Component (opcional)
        if (!customElements.get('ubits-slider')) {
            customElements.define('ubits-slider', UBITSSlider);
        }
        // Exponer API global
        if (typeof window !== 'undefined') {
            window.UBITS = window.UBITS || {};
            window.UBITS.Slider = {
                create: (options) => {
                    const { createSlider } = require('./SliderProvider');
                    return createSlider(options);
                },
                render: (options) => {
                    const { renderSlider } = require('./SliderProvider');
                    return renderSlider(options);
                }
            };
            // Exponer función global createSlider() para compatibilidad
            if (!window.createSlider) {
                window.createSlider = (options) => {
                    const { createSlider } = require('./SliderProvider');
                    return createSlider(options);
                };
            }
        }
        console.log('✅ Slider add-on initialized');
    }
    destroy() {
        if (typeof window !== 'undefined' && window.UBITS?.Slider) {
            delete window.UBITS.Slider;
            delete window.createSlider;
        }
    }
    getComponents() {
        return [{
                name: 'ubits-slider',
                tag: 'ubits-slider',
                documentation: 'https://ubits.design/components/slider' // Placeholder
            }];
    }
    getStyles() {
        return ['./styles/slider.css'];
    }
}
