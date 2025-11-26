/**
 * WelcomeAddon
 * Clase principal del add-on Welcome que implementa IComponentAddon
 * Basado en el template template-welcome-test.html del repositorio AUTORUN
 */

import { IComponentAddon, AutorunContext, ComponentDefinition } from '@autorun/core';
import { renderWelcome, createWelcome } from './WelcomeProvider';
import './styles/welcome.css';

export class WelcomeAddon implements IComponentAddon {
	readonly id = 'welcome';
	readonly name = 'Welcome';
	readonly version = '1.0.0';
	readonly type = 'component' as const;
	readonly description = 'Componente Welcome AUTORUN para páginas de bienvenida';

	private context?: AutorunContext;
	private active = false;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Verificar si el componente ya está cargado desde Storybook
		if (typeof window !== 'undefined') {
			const ComponentsAPI = (window as any).AUTORUN?.Components;
			if (ComponentsAPI?.isLoaded && ComponentsAPI.isLoaded('@autorun/welcome')) {
				console.log('⏭️  Welcome ya está cargado desde Storybook, omitiendo inicialización local');
				this.active = true;
				return;
			}
		}

		// Exponer API global solo si no existe (para evitar sobrescribir componentes del Storybook)
		if (typeof window !== 'undefined') {
			(window as any).AUTORUN = (window as any).AUTORUN || {};
			if (!(window as any).AUTORUN.Welcome) {
				(window as any).AUTORUN.Welcome = {
					render: renderWelcome,
					create: createWelcome,
				};

				// También exponer como función global para compatibilidad
				(window as any).createWelcome = createWelcome;
			}
		}

		this.active = true;
		console.log('✅ Welcome add-on initialized');
	}

	async configure(config: any): Promise<void> {
		// Configuración adicional si es necesaria
	}

	async activate?(): Promise<void> {
		this.active = true;
	}

	async deactivate?(): Promise<void> {
		this.active = false;
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus() {
		return this.active ? ('active' as const) : ('inactive' as const);
	}

	destroy(): void {
		// Limpiar recursos si es necesario
		if (typeof window !== 'undefined' && (window as any).AUTORUN?.Welcome) {
			delete (window as any).AUTORUN.Welcome;
		}
		if (typeof window !== 'undefined' && (window as any).createWelcome) {
			delete (window as any).createWelcome;
		}
		this.active = false;
	}

	getComponents(): ComponentDefinition[] {
		return [
			{
				name: 'autorun-welcome',
				tag: 'autorun-welcome',
			},
		];
	}

	getStyles(): string[] {
		return ['./styles/welcome.css'];
	}

	async registerComponents?(): Promise<void> {
		// Los componentes ya se registran en initialize()
	}
}

