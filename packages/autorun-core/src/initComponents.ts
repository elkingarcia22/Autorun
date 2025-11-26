/**
 * initComponents
 *
 * Inicializa el sistema de componentes y expone la API global
 * en window.AUTORUN.Components
 */

import { ComponentManager } from './ComponentManager.js';

/**
 * Inicializa el sistema de componentes globalmente
 * Se debe llamar una vez al inicio de la aplicación
 */
export function initComponents(): ComponentManager {
	if (typeof window === 'undefined') {
		throw new Error('initComponents solo puede ejecutarse en el navegador');
	}

	// Crear manager global
	const manager = new ComponentManager();

	// Exponer en window.AUTORUN
	(window as any).AUTORUN = (window as any).AUTORUN || {};
	(window as any).AUTORUN.Components = {
		loadFromStorybook: (options: { manifestUrl: string; replaceExisting?: boolean }) =>
			manager.loadFromStorybook(options),
		replaceComponent: (componentName: string, options: { manifestUrl: string }) =>
			manager.replaceComponent(componentName, options),
		getLoadedComponents: () => manager.getLoadedComponents(),
		isLoaded: (componentName: string) => manager.isLoaded(componentName),
		getComponent: (componentName: string) => manager.getComponent(componentName),
		unloadComponent: (componentName: string) => manager.unloadComponent(componentName),
		clear: () => manager.clear(),
		getManager: () => manager,
	};

	// Función helper global para compatibilidad
	(window as any).cambiarComponenteDesdeStorybook = async (manifestUrl: string) => {
		return manager.loadFromStorybook({ manifestUrl });
	};

	console.log('✅ Sistema de componentes AUTORUN inicializado');
	return manager;
}

// Auto-inicializar si estamos en el navegador
if (typeof window !== 'undefined') {
	// Inicializar automáticamente
	initComponents();
}

