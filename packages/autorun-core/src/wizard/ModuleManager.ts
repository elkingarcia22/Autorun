/**
 * ModuleManager
 *
 * Gestiona módulos y sidebar para proyectos UBITS
 */

import { AutorunHub } from '../AutorunHub';
import { UBITS_PRESET } from './UBITSPreset';
import { SubNavManager } from './SubNavManager';

export class ModuleManager {
	private hub: AutorunHub;
	private enabledModules: Set<string> = new Set();
	private subNavManager: SubNavManager;

	constructor(hub: AutorunHub) {
		this.hub = hub;
		this.subNavManager = new SubNavManager(hub);
	}

	/**
	 * Habilita un módulo en el sidebar y configura el subnav
	 */
	async enableModule(
		moduleName: string,
		template: 'administrador' | 'colaborador',
		productId?: string,
	): Promise<void> {
		const templateConfig = UBITS_PRESET.templates[template];
		
		// Verificar que el módulo está disponible en el template
		if (!templateConfig.modules.includes(moduleName)) {
			throw new Error(
				`Módulo "${moduleName}" no está disponible en template "${template}"`,
			);
		}

		// Agregar a módulos habilitados
		this.enabledModules.add(moduleName);

		// Actualizar sidebar
		await this.updateSidebar(template);

		// Configurar subnav para el módulo
		await this.subNavManager.setModule(moduleName, productId);

		console.log(`✅ Módulo "${moduleName}" habilitado en sidebar y subnav`);
	}

	/**
	 * Deshabilita un módulo
	 */
	async disableModule(moduleName: string): Promise<void> {
		this.enabledModules.delete(moduleName);
		await this.updateSidebar();
		console.log(`🗑️  Módulo "${moduleName}" deshabilitado`);
	}

	/**
	 * Actualiza el sidebar con los módulos habilitados
	 */
	private async updateSidebar(
		template?: 'administrador' | 'colaborador',
	): Promise<void> {
		if (typeof window === 'undefined') {
			return; // Solo funciona en navegador
		}

		// Buscar elemento sidebar
		const sidebar = document.querySelector('[data-sidebar]') as HTMLElement;
		if (!sidebar) {
			console.warn('⚠️  Sidebar no encontrado en el DOM');
			return;
		}

		// Generar HTML del sidebar
		const sidebarHTML = this.generateSidebarHTML(template);
		sidebar.innerHTML = sidebarHTML;

		// Agregar event listeners
		this.attachSidebarListeners();
	}

	/**
	 * Genera HTML del sidebar
	 */
	private generateSidebarHTML(
		template?: 'administrador' | 'colaborador',
	): string {
		const templateConfig = template
			? UBITS_PRESET.templates[template]
			: null;

		const modules = templateConfig
			? templateConfig.modules.filter((m) => this.enabledModules.has(m))
			: Array.from(this.enabledModules);

		const moduleItems = modules
			.map(
				(module) => `
      <li class="sidebar-item" data-module="${module}">
        <a href="#${module}" class="sidebar-link">
          <span class="sidebar-icon">📦</span>
          <span class="sidebar-label">${this.formatModuleName(module)}</span>
        </a>
      </li>
    `,
			)
			.join('');

		return `
    <nav class="sidebar" data-variant="${template || 'default'}">
      <div class="sidebar-header">
        <h2 class="sidebar-title">UBITS</h2>
      </div>
      <ul class="sidebar-menu">
        ${moduleItems}
      </ul>
    </nav>
    `;
	}

	/**
	 * Formatea el nombre del módulo para mostrar
	 */
	private formatModuleName(module: string): string {
		return module
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	/**
	 * Adjunta event listeners al sidebar
	 */
	private attachSidebarListeners(): void {
		const links = document.querySelectorAll('.sidebar-link');
		links.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const module = (link.closest('.sidebar-item') as HTMLElement)?.dataset
					.module;
				if (module) {
					this.navigateToModule(module);
				}
			});
		});
	}

	/**
	 * Navega a un módulo
	 */
	private navigateToModule(moduleName: string): void {
		console.log(`📍 Navegando a módulo: ${moduleName}`);
		// TODO: Implementar navegación
		// Puede emitir evento, cambiar URL, etc.
	}

	/**
	 * Obtiene módulos habilitados
	 */
	getEnabledModules(): string[] {
		return Array.from(this.enabledModules);
	}

	/**
	 * Obtiene el SubNavManager
	 */
	getSubNavManager(): SubNavManager {
		return this.subNavManager;
	}
}

