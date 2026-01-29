/**
 * ButtonAddon
 * Clase principal del add-on Button que implementa IComponentAddon
 */

import { IComponentAddon, AutorunContext, ComponentDefinition } from '@autorun/core';
import { AUTORUNButton } from './ButtonComponent';
import { renderButton, createButton } from './ButtonProvider';
import './styles/button.css';

export class ButtonAddon implements IComponentAddon {
	readonly id = 'button';
	readonly name = 'Button';
	readonly version = '1.0.0';
	readonly type = 'component' as const;
	readonly description = 'Componente Button AUTORUN como add-on intercambiable';

	private context?: AutorunContext;
	private active = false;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Verificar si el componente ya está cargado desde Storybook
		if (typeof window !== 'undefined') {
			const ComponentsAPI = (window as any).AUTORUN?.Components;
			if (ComponentsAPI?.isLoaded && ComponentsAPI.isLoaded('@autorun/button')) {
				console.log('⏭️  Button ya está cargado desde Storybook, omitiendo inicialización local');
				this.active = true;
				return;
			}
		}

		// Registrar el Web Component
		if (typeof window !== 'undefined' && !customElements.get('autorun-button')) {
			customElements.define('autorun-button', AUTORUNButton);
		}

		// Exponer API global solo si no existe (para evitar sobrescribir componentes del Storybook)
		if (typeof window !== 'undefined') {
			(window as any).AUTORUN = (window as any).AUTORUN || {};
			if (!(window as any).AUTORUN.Button) {
				(window as any).AUTORUN.Button = {
					render: renderButton,
					create: createButton,
				};

				// También exponer como función global para compatibilidad
				(window as any).createButton = createButton;
			}
		}

		this.active = true;
		console.log('✅ Button add-on initialized');
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
		if (typeof window !== 'undefined' && (window as any).AUTORUN?.Button) {
			delete (window as any).AUTORUN.Button;
		}
		if (typeof window !== 'undefined' && (window as any).createButton) {
			delete (window as any).createButton;
		}
		this.active = false;
	}

	getComponents(): ComponentDefinition[] {
		return [
			{
				name: 'autorun-button',
				tag: 'autorun-button',
			},
		];
	}

	getStyles(): string[] {
		return ['./styles/button.css'];
	}

	async registerComponents?(): Promise<void> {
		// Los componentes ya se registran en initialize()
	}
}
