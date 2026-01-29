/**
 * AlertAddon
 * Clase principal del add-on Alert que implementa IComponentAddon
 */

import { IComponentAddon, AutorunContext, ComponentDefinition } from '@autorun/core';
import { AUTORUNAlert } from './AlertComponent';
import { renderAlert, createAlert, showAlert } from './AlertProvider';
import './styles/alert.css';

export class AlertAddon implements IComponentAddon {
	readonly id = 'alert';
	readonly name = 'Alert';
	readonly version = '1.0.0';
	readonly type = 'component' as const;
	readonly description = 'Componente Alert AUTORUN como add-on intercambiable';

	private context?: AutorunContext;
	private active = false;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Verificar si el componente ya está cargado desde Storybook
		if (typeof window !== 'undefined') {
			const ComponentsAPI = (window as any).AUTORUN?.Components;
			if (ComponentsAPI?.isLoaded && ComponentsAPI.isLoaded('@autorun/alert')) {
				console.log('⏭️  Alert ya está cargado desde Storybook, omitiendo inicialización local');
				this.active = true;
				return;
			}
		}

		// Registrar el Web Component
		if (typeof window !== 'undefined' && !customElements.get('autorun-alert')) {
			customElements.define('autorun-alert', AUTORUNAlert);
		}

		// Exponer API global solo si no existe (para evitar sobrescribir componentes del Storybook)
		if (typeof window !== 'undefined') {
			(window as any).AUTORUN = (window as any).AUTORUN || {};
			if (!(window as any).AUTORUN.Alert) {
				(window as any).AUTORUN.Alert = {
					render: renderAlert,
					create: createAlert,
					show: showAlert,
				};

				// También exponer como función global para compatibilidad
				(window as any).createAlert = createAlert;
				(window as any).showAlert = showAlert;
			}
		}

		this.active = true;
		console.log('✅ Alert add-on initialized');
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
		if (typeof window !== 'undefined' && (window as any).AUTORUN?.Alert) {
			delete (window as any).AUTORUN.Alert;
		}
		if (typeof window !== 'undefined' && (window as any).createAlert) {
			delete (window as any).createAlert;
		}
		if (typeof window !== 'undefined' && (window as any).showAlert) {
			delete (window as any).showAlert;
		}
		this.active = false;
	}

	getComponents(): ComponentDefinition[] {
		return [
			{
				name: 'autorun-alert',
				tag: 'autorun-alert',
			},
		];
	}

	getStyles(): string[] {
		return ['./styles/alert.css'];
	}

	async registerComponents?(): Promise<void> {
		// Los componentes ya se registran en initialize()
	}
}
