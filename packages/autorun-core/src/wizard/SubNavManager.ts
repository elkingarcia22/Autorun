/**
 * SubNavManager
 *
 * Gestiona el subnav (subnavegación) para módulos UBITS
 * El subnav muestra los productos/tabs dentro de un módulo
 */

import { AutorunHub } from '../AutorunHub';
import { UBITS_MODULES_CONFIG, ModuleConfig, ModuleProduct } from './UBITSPreset';

export class SubNavManager {
	private hub: AutorunHub;
	private currentModule: string | null = null;
	private currentProduct: string | null = null;

	constructor(hub: AutorunHub) {
		this.hub = hub;
	}

	/**
	 * Configura el subnav para un módulo específico
	 */
	async setModule(
		moduleId: string,
		productId?: string,
	): Promise<void> {
		const moduleConfig = UBITS_MODULES_CONFIG[moduleId];
		if (!moduleConfig) {
			throw new Error(`Módulo "${moduleId}" no encontrado`);
		}

		this.currentModule = moduleId;
		this.currentProduct = productId || moduleConfig.products[0]?.id || null;

		// Actualizar subnav en el DOM
		await this.updateSubNav(moduleConfig, this.currentProduct);

		console.log(`✅ Subnav configurado para módulo "${moduleConfig.name}"`);
		if (this.currentProduct) {
			const product = moduleConfig.products.find((p) => p.id === this.currentProduct);
			console.log(`   📦 Producto activo: ${product?.name || this.currentProduct}`);
		}
	}

	/**
	 * Cambia el producto activo dentro del módulo actual
	 */
	async setProduct(productId: string): Promise<void> {
		if (!this.currentModule) {
			throw new Error('No hay módulo activo. Configura un módulo primero.');
		}

		const moduleConfig = UBITS_MODULES_CONFIG[this.currentModule];
		const product = moduleConfig.products.find((p) => p.id === productId);

		if (!product) {
			throw new Error(
				`Producto "${productId}" no encontrado en módulo "${this.currentModule}"`,
			);
		}

		this.currentProduct = productId;
		await this.updateSubNav(moduleConfig, productId);

		console.log(`✅ Producto activo: ${product.name}`);
	}

	/**
	 * Actualiza el subnav en el DOM
	 */
	private async updateSubNav(
		moduleConfig: ModuleConfig,
		activeProductId: string | null,
	): Promise<void> {
		if (typeof window === 'undefined') {
			return; // Solo funciona en navegador
		}

		// Buscar o crear contenedor del subnav
		let subnavContainer = document.querySelector(
			'[data-subnav]',
		) as HTMLElement;

		if (!subnavContainer) {
			// Crear contenedor si no existe
			subnavContainer = document.createElement('nav');
			subnavContainer.setAttribute('data-subnav', '');
			subnavContainer.className = 'sub-nav-container';

			// Insertar después del header o antes del main content
			const header = document.querySelector('header');
			const main = document.querySelector('main');
			if (header) {
				header.insertAdjacentElement('afterend', subnavContainer);
			} else if (main) {
				main.insertAdjacentElement('beforebegin', subnavContainer);
			} else {
				document.body.insertAdjacentElement('afterbegin', subnavContainer);
			}
		}

		// Generar HTML del subnav
		const subnavHTML = this.generateSubNavHTML(moduleConfig, activeProductId);
		subnavContainer.innerHTML = subnavHTML;

		// Agregar event listeners
		this.attachSubNavListeners(moduleConfig);
	}

	/**
	 * Genera HTML del subnav
	 */
	private generateSubNavHTML(
		moduleConfig: ModuleConfig,
		activeProductId: string | null,
	): string {
		const tabs = moduleConfig.products
			.map(
				(product) => `
      <button 
        class="nav-tab ${product.id === activeProductId ? 'active' : ''}" 
        data-tab="${product.id}"
        data-product="${product.id}"
        ${product.url ? `data-url="${product.url}"` : ''}
      >
        ${product.icon ? `<i class="${product.icon}"></i>` : ''}
        <span>${product.name}</span>
      </button>
    `,
			)
			.join('');

		return `
    <nav class="sub-nav" data-variant="${moduleConfig.subnavVariant}" data-module="${moduleConfig.id}">
      <div class="nav-tabs">
        ${tabs}
      </div>
    </nav>
    `;
	}

	/**
	 * Adjunta event listeners al subnav
	 */
	private attachSubNavListeners(moduleConfig: ModuleConfig): void {
		const tabs = document.querySelectorAll('.nav-tab[data-product]');
		tabs.forEach((tab) => {
			tab.addEventListener('click', (e) => {
				e.preventDefault();
				const productId = (tab as HTMLElement).dataset.product;
				if (productId) {
					this.handleProductClick(productId, moduleConfig);
				}
			});
		});
	}

	/**
	 * Maneja el click en un producto del subnav
	 */
	private async handleProductClick(
		productId: string,
		moduleConfig: ModuleConfig,
	): Promise<void> {
		const product = moduleConfig.products.find((p) => p.id === productId);
		if (!product) return;

		// Si tiene URL, navegar
		if (product.url) {
			window.location.href = product.url;
			return;
		}

		// Cambiar producto activo
		await this.setProduct(productId);

		// Emitir evento personalizado
		if (typeof window !== 'undefined') {
			const event = new CustomEvent('ubits:product-changed', {
				detail: {
					module: moduleConfig.id,
					moduleName: moduleConfig.name,
					product: productId,
					productName: product.name,
				},
			});
			window.dispatchEvent(event);
		}
	}

	/**
	 * Obtiene el módulo actual
	 */
	getCurrentModule(): string | null {
		return this.currentModule;
	}

	/**
	 * Obtiene el producto actual
	 */
	getCurrentProduct(): string | null {
		return this.currentProduct;
	}

	/**
	 * Obtiene la configuración del módulo actual
	 */
	getCurrentModuleConfig(): ModuleConfig | null {
		if (!this.currentModule) return null;
		return UBITS_MODULES_CONFIG[this.currentModule] || null;
	}
}

