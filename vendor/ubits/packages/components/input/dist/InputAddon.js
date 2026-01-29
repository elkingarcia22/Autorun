/**
 * InputAddon
 * Add-on para el componente Input UBITS
 */
import { UBITSInput } from './InputComponent';
import './styles/input.css';
export class InputAddon {
	constructor() {
		this.name = '@ubits/input';
		this.version = '1.0.0';
	}
	async initialize(context) {
		// Registrar el Web Component (opcional)
		if (!customElements.get('ubits-input')) {
			customElements.define('ubits-input', UBITSInput);
		}
		// Exponer API global
		if (typeof window !== 'undefined') {
			window.UBITS = window.UBITS || {};
			window.UBITS.Input = {
				create: (options) => {
					const { createInput } = require('./InputProvider');
					return createInput(options);
				},
				render: (options) => {
					const { renderInput } = require('./InputProvider');
					return renderInput(options);
				},
			};
			// Exponer función global createInput() para compatibilidad con el playground anterior
			if (!window.createInput) {
				window.createInput = (options) => {
					const { createInput } = require('./InputProvider');
					return createInput(options);
				};
			}
		}
		console.log('✅ Input add-on initialized');
	}
	destroy() {
		if (typeof window !== 'undefined' && window.UBITS?.Input) {
			delete window.UBITS.Input;
			delete window.createInput;
		}
	}
	getComponents() {
		return [
			{
				name: 'ubits-input',
				tag: 'ubits-input',
				documentation: 'https://ubits.design/components/input', // Placeholder
			},
		];
	}
	getStyles() {
		return ['./styles/input.css'];
	}
}
