/**
 * ButtonAddon
 * Clase principal del add-on Button que implementa ComponentAddon
 */
import { UBITSButton } from './ButtonComponent';
import './styles/button.css';
export class ButtonAddon {
    constructor() {
        this.name = '@ubits/button';
        this.version = '1.0.0';
    }
    async initialize(context) {
        // Registrar el Web Component
        if (!customElements.get('ubits-button')) {
            customElements.define('ubits-button', UBITSButton);
        }
        // Exponer API global
        if (typeof window !== 'undefined') {
            window.UBITS = window.UBITS || {};
            window.UBITS.Button = {
                render: (options) => {
                    const { renderButton } = require('./ButtonProvider');
                    return renderButton(options);
                },
                create: (options) => {
                    const { createButton } = require('./ButtonProvider');
                    return createButton(options);
                }
            };
        }
        console.log('✅ Button add-on initialized');
    }
    destroy() {
        // Limpiar recursos si es necesario
        if (typeof window !== 'undefined' && window.UBITS?.Button) {
            delete window.UBITS.Button;
        }
    }
    getComponents() {
        return [{
                name: 'ubits-button',
                tag: 'ubits-button',
                documentation: 'https://ubits.design/components/button'
            }];
    }
    getStyles() {
        return ['./styles/button.css'];
    }
}
