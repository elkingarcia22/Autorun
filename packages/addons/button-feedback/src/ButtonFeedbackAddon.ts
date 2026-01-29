/**
 * ButtonFeedbackAddon
 * Clase principal del add-on ButtonFeedback que implementa IComponentAddon
 */

import { IComponentAddon, AutorunContext, ComponentDefinition } from '@autorun/core';
import { createButtonFeedback } from './ButtonFeedbackProvider';
import './styles/button-feedback.css';

export class ButtonFeedbackAddon implements IComponentAddon {
	readonly id = 'button-feedback';
	readonly name = 'Button Feedback';
	readonly version = '1.0.0';
	readonly type = 'component' as const;
	readonly description = 'Botón flotante para obtener feedback de clientes con modal de formulario';

	private context?: AutorunContext;
	private active = false;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Verificar si el componente ya está cargado desde Storybook
		if (typeof window !== 'undefined') {
			const ComponentsAPI = (window as any).AUTORUN?.Components;
			if (ComponentsAPI?.isLoaded && ComponentsAPI.isLoaded('@autorun/button-feedback')) {
				console.log(
					'⏭️  ButtonFeedback ya está cargado desde Storybook, omitiendo inicialización local',
				);
				this.active = true;
				return;
			}
		}

		// Exponer API global solo si no existe (para evitar sobrescribir componentes del Storybook)
		if (typeof window !== 'undefined') {
			(window as any).AUTORUN = (window as any).AUTORUN || {};
			if (!(window as any).AUTORUN.ButtonFeedback) {
				(window as any).AUTORUN.ButtonFeedback = {
					create: createButtonFeedback,
				};

				// También exponer como función global para compatibilidad
				(window as any).createButtonFeedback = createButtonFeedback;
			}
		}

		this.active = true;
		console.log('✅ Button Feedback add-on initialized');
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
		if (typeof window !== 'undefined' && (window as any).AUTORUN?.ButtonFeedback) {
			delete (window as any).AUTORUN.ButtonFeedback;
		}
		if (typeof window !== 'undefined' && (window as any).createButtonFeedback) {
			delete (window as any).createButtonFeedback;
		}
		this.active = false;
	}

	getComponents(): ComponentDefinition[] {
		return [
			{
				name: 'autorun-button-feedback',
				tag: 'autorun-button-feedback',
			},
		];
	}

	getStyles(): string[] {
		return ['./styles/button-feedback.css'];
	}

	async registerComponents?(): Promise<void> {
		// Los componentes ya se registran en initialize()
	}
}
