/**
 * Utilidades para cargar componentes desde Storybook
 * Similar a applyTokensFromStorybook pero para componentes
 */

import { getComponentManager, ComponentSource } from './ComponentManager';

/**
 * Carga un componente desde Storybook
 *
 * @param source - Fuente del componente (manifest URL, manifest JSON, etc.)
 * @param options - Opciones de carga
 */
export async function loadComponentFromStorybook(
	source: ComponentSource,
	options: {
		replaceExisting?: boolean;
		context?: any;
	} = {},
): Promise<void> {
	const { replaceExisting = true, context = {} } = options;
	const manager = getComponentManager();

	try {
		// Si es un manifest URL, necesitamos obtener el nombre del componente
		if (source.manifestUrl) {
			const response = await fetch(source.manifestUrl);
			const manifest = await response.json();

			if (replaceExisting && manager.isComponentLoaded(manifest.name)) {
				console.log(`🔄 Reemplazando componente ${manifest.name}...`);
				await manager.replaceComponent(manifest.name, source, context);
			} else {
				await manager.loadComponent(source, context);
			}
		} else if (source.manifest) {
			if (replaceExisting && manager.isComponentLoaded(source.manifest.name)) {
				console.log(`🔄 Reemplazando componente ${source.manifest.name}...`);
				await manager.replaceComponent(source.manifest.name, source, context);
			} else {
				await manager.loadComponent(source, context);
			}
		} else {
			throw new Error('Debe proporcionar manifestUrl o manifest');
		}

		console.log('✅ Componente cargado desde Storybook exitosamente');
	} catch (error) {
		console.error('❌ Error cargando componente desde Storybook:', error);
		throw error;
	}
}

/**
 * Función helper para cambiar un componente desde Storybook
 * Similar a cambiarTokensDesdeStorybook
 *
 * Uso:
 * ```javascript
 * await cambiarComponenteDesdeStorybook('https://storybook.tu-empresa.com/button/manifest.json');
 * ```
 */
export async function cambiarComponenteDesdeStorybook(
	storybookManifestUrl: string,
	options: {
		reemplazar?: boolean;
		contexto?: any;
	} = {},
): Promise<boolean> {
	console.log('🔄 Cambiando componente desde Storybook...');

	try {
		await loadComponentFromStorybook(
			{ manifestUrl: storybookManifestUrl },
			{
				replaceExisting: options.reemplazar !== false,
				context: options.contexto || {},
			},
		);

		console.log('✅ Componente cambiado exitosamente');
		console.log('📦 El componente ahora está disponible para usar');

		return true;
	} catch (error) {
		console.error('❌ Error cambiando componente:', error);
		return false;
	}
}

/**
 * Carga múltiples componentes desde Storybook
 */
export async function loadComponentsFromStorybook(
	sources: ComponentSource[],
	options: {
		replaceExisting?: boolean;
		context?: any;
	} = {},
): Promise<void> {
	console.log(`🔄 Cargando ${sources.length} componentes desde Storybook...`);

	for (const source of sources) {
		try {
			await loadComponentFromStorybook(source, options);
		} catch (error) {
			console.error(`⚠️ Error cargando componente:`, error);
			// Continuar con los demás componentes
		}
	}

	console.log('✅ Componentes cargados desde Storybook');
}

// Exponer función global para uso fácil
if (typeof window !== 'undefined') {
	(window as any).cambiarComponenteDesdeStorybook = cambiarComponenteDesdeStorybook;
	(window as any).loadComponentFromStorybook = loadComponentFromStorybook;
}
