/**
 * Web Component: ubits-button
 * Componente de botón UBITS como Web Component nativo
 */
import { renderButton } from './ButtonProvider';
export class UBITSButton extends HTMLElement {
	constructor() {
		super(...arguments);
		this.options = {};
	}
	static get observedAttributes() {
		return [
			'variant',
			'size',
			'icon',
			'icon-style',
			'icon-only',
			'disabled',
			'loading',
			'loading-text',
			'badge',
			'active',
			'full-width',
			'block',
			'icon-position',
			'class',
		];
	}
	connectedCallback() {
		this.updateOptions();
		this.render();
		this.attachEventListeners();
	}
	attributeChangedCallback() {
		this.updateOptions();
		this.render();
	}
	disconnectedCallback() {
		// Cleanup si es necesario
	}
	updateOptions() {
		this.options = {
			variant: this.getAttribute('variant') || 'primary',
			size: this.getAttribute('size') || 'md',
			text: this.textContent?.trim() || '',
			icon: this.getAttribute('icon') || undefined,
			iconStyle: this.getAttribute('icon-style') || 'regular',
			iconOnly: this.hasAttribute('icon-only'),
			disabled: this.hasAttribute('disabled') || this.getAttribute('aria-disabled') === 'true',
			loading: this.hasAttribute('loading') || this.getAttribute('data-loading') === 'true',
			loadingText: this.getAttribute('loading-text') || undefined,
			badge: this.hasAttribute('badge'),
			active: this.hasAttribute('active'),
			fullWidth: this.hasAttribute('full-width'),
			block: this.hasAttribute('block'),
			iconPosition: this.getAttribute('icon-position') || 'left',
			className: this.getAttribute('class') || '',
		};
	}
	render() {
		this.innerHTML = renderButton(this.options);
		// Actualizar aria attributes para accesibilidad
		if (this.options.loading) {
			this.setAttribute('aria-busy', 'true');
			this.setAttribute('aria-label', this.options.loadingText || 'Cargando...');
		} else {
			this.removeAttribute('aria-busy');
		}
		if (this.options.disabled) {
			this.setAttribute('aria-disabled', 'true');
		} else {
			this.removeAttribute('aria-disabled');
		}
	}
	attachEventListeners() {
		// Remover listeners previos
		const button = this.querySelector('button') || this;
		// Agregar click handler si existe en options
		// (Esto requeriría que el componente se cree programáticamente)
	}
	// Métodos públicos para actualizar el botón
	setLoading(loading) {
		if (loading) {
			this.setAttribute('data-loading', 'true');
		} else {
			this.removeAttribute('data-loading');
		}
	}
	setDisabled(disabled) {
		if (disabled) {
			this.setAttribute('disabled', '');
		} else {
			this.removeAttribute('disabled');
		}
	}
	setText(text) {
		this.textContent = text;
	}
	setIcon(icon) {
		this.setAttribute('icon', icon);
	}
}
// Registrar el Web Component si no está ya registrado
if (!customElements.get('ubits-button')) {
	customElements.define('ubits-button', UBITSButton);
}
