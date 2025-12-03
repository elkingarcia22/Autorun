/**
 * MaskAddon
 * Clase principal del add-on Mask que implementa IComponentAddon
 */

import { IComponentAddon, AutorunContext, ComponentDefinition } from '@autorun/core';
import { renderMask, createMask } from './MaskProvider';
import './styles/mask.css';

export class MaskAddon implements IComponentAddon {
	readonly id = 'mask';
	readonly name = 'Mask';
	readonly version = '1.0.0';
	readonly type = 'component' as const;
	readonly description = 'Componente Mask AUTORUN para onboarding/onboarding';

	private context?: AutorunContext;
	private active = false;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Verificar si el componente ya está cargado desde Storybook
		if (typeof window !== 'undefined') {
			const ComponentsAPI = (window as any).AUTORUN?.Components;
			if (ComponentsAPI?.isLoaded && ComponentsAPI.isLoaded('@autorun/mask')) {
				console.log('⏭️  Mask ya está cargado desde Storybook, omitiendo inicialización local');
				this.active = true;
				return;
			}
		}

		// Exponer API global solo si no existe (para evitar sobrescribir componentes del Storybook)
		if (typeof window !== 'undefined') {
			(window as any).AUTORUN = (window as any).AUTORUN || {};
			if (!(window as any).AUTORUN.Mask) {
				(window as any).AUTORUN.Mask = {
					render: renderMask,
					create: createMask,
				};

				// También exponer como función global para compatibilidad
				(window as any).createMask = createMask;
			}
		}

		this.active = true;
		console.log('✅ Mask add-on initialized');
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
		if (typeof window !== 'undefined' && (window as any).AUTORUN?.Mask) {
			delete (window as any).AUTORUN.Mask;
		}
		if (typeof window !== 'undefined' && (window as any).createMask) {
			delete (window as any).createMask;
		}
		this.active = false;
	}

	getComponents(): ComponentDefinition[] {
		return [
			{
				name: 'autorun-mask',
				tag: 'autorun-mask',
			},
		];
	}

	getStyles(): string[] {
		return ['./styles/mask.css'];
	}

	async registerComponents?(): Promise<void> {
		// Los componentes ya se registran en initialize()
	}
}
