/**
 * SliderAddon
 * Add-on para el componente Slider UBITS
 */
// NO importar UBITSSlider directamente para evitar errores en Node.js
// import { UBITSSlider } from './SliderComponent';
import './styles/slider.css';
export class SliderAddon {
	constructor() {
		this.name = '@ubits/slider';
		this.version = '1.0.0';
	}
	async initialize(context) {
		// Registrar el Web Component (opcional) - solo en navegador
		if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {
			if (!customElements.get('ubits-slider')) {
				// Lazy import del componente solo cuando se necesite
				const { UBITSSlider } = await import('./SliderComponent');
				customElements.define('ubits-slider', UBITSSlider);
				console.log('✅ [SliderAddon] Web Component ubits-slider registrado');
			}
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
				},
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
		return [
			{
				name: 'ubits-slider',
				tag: 'ubits-slider',
				documentation: 'https://ubits.design/components/slider', // Placeholder
			},
		];
	}
	getStyles() {
		return ['./styles/slider.css'];
	}
}
