/**
 * Storybook ID Search With Retry
 *
 * Sistema que busca IDs de Storybook con múltiples estrategias y variaciones
 * cuando falla la búsqueda inicial
 */

import { StorybookManager } from './storybookManager';
import { findComponentByIdOrName, discoverStorybookComponents } from './storybookIdDiscovery';
import { validateAndCorrectStorybookId } from './storybookIdValidator';

export interface SearchResult {
	found: boolean;
	componentId: string;
	method: string;
	attempts: number;
	variations?: string[];
}

/**
 * Buscar ID de Storybook con múltiples estrategias
 *
 * Estrategias:
 * 1. Búsqueda exacta del ID mapeado
 * 2. Búsqueda case-insensitive
 * 3. Búsqueda por nombre del componente
 * 4. Búsqueda parcial
 * 5. Consulta index.json y búsqueda en todas las entradas
 */
export async function searchStorybookIdWithRetry(
	componentName: string,
	mappedId: string,
): Promise<SearchResult> {
	const attempts: string[] = [];
	let lastError: string | null = null;

	console.log(`🔍 [Storybook ID Search] Buscando ID para: ${componentName} (mapeado: ${mappedId})`);

	// ESTRATEGIA 1: Búsqueda exacta
	attempts.push(`exact:${mappedId}`);
	try {
		let component = await findComponentByIdOrName(mappedId);
		if (component) {
			console.log(`✅ [Storybook ID Search] Encontrado (exacto): ${component.componentId}`);
			return {
				found: true,
				componentId: component.componentId,
				method: 'exact',
				attempts: attempts.length,
			};
		}
	} catch (error: any) {
		lastError = error.message;
	}

	// ESTRATEGIA 2: Búsqueda case-insensitive
	attempts.push(`case-insensitive:${mappedId.toLowerCase()}`);
	try {
		let component = await findComponentByIdOrName(mappedId.toLowerCase());
		if (component) {
			console.log(
				`✅ [Storybook ID Search] Encontrado (case-insensitive): ${component.componentId}`,
			);
			return {
				found: true,
				componentId: component.componentId,
				method: 'case-insensitive',
				attempts: attempts.length,
			};
		}
	} catch (error: any) {
		lastError = error.message;
	}

	// ESTRATEGIA 3: Búsqueda por nombre del componente
	attempts.push(`by-name:${componentName}`);
	try {
		let component = await findComponentByIdOrName(componentName);
		if (component) {
			console.log(`✅ [Storybook ID Search] Encontrado (por nombre): ${component.componentId}`);
			return {
				found: true,
				componentId: component.componentId,
				method: 'by-name',
				attempts: attempts.length,
			};
		}
	} catch (error: any) {
		lastError = error.message;
	}

	// ESTRATEGIA 4: Búsqueda parcial en el ID
	const partialSearches = [
		mappedId.split('-').pop() || '', // Última parte
		mappedId.split('-')[0] || '', // Primera parte
		componentName.toLowerCase(),
		componentName.toLowerCase().replace(/\s+/g, '-'),
	].filter(Boolean);

	for (const partial of partialSearches) {
		if (!partial) continue;
		attempts.push(`partial:${partial}`);
		try {
			let component = await findComponentByIdOrName(partial);
			if (component) {
				console.log(
					`✅ [Storybook ID Search] Encontrado (parcial "${partial}"): ${component.componentId}`,
				);
				return {
					found: true,
					componentId: component.componentId,
					method: `partial-${partial}`,
					attempts: attempts.length,
					variations: partialSearches,
				};
			}
		} catch (error: any) {
			lastError = error.message;
		}
	}

	// ESTRATEGIA 5: Consultar index.json completo y buscar manualmente
	attempts.push('index-json-full-scan');
	try {
		const discovery = await discoverStorybookComponents();

		// Buscar en todos los componentes descubiertos
		for (const component of discovery.components) {
			// Buscar por ID
			if (
				component.componentId.toLowerCase() === mappedId.toLowerCase() ||
				component.componentId === mappedId
			) {
				console.log(`✅ [Storybook ID Search] Encontrado (index.json): ${component.componentId}`);
				return {
					found: true,
					componentId: component.componentId,
					method: 'index-json-id',
					attempts: attempts.length,
				};
			}

			// Buscar por título
			if (
				component.title.toLowerCase().includes(componentName.toLowerCase()) ||
				component.title.toLowerCase().includes(mappedId.toLowerCase())
			) {
				console.log(
					`✅ [Storybook ID Search] Encontrado (index.json por título): ${component.componentId}`,
				);
				return {
					found: true,
					componentId: component.componentId,
					method: 'index-json-title',
					attempts: attempts.length,
				};
			}

			// Buscar por ID parcial
			if (
				component.componentId.toLowerCase().includes(mappedId.toLowerCase()) ||
				mappedId.toLowerCase().includes(component.componentId.toLowerCase())
			) {
				console.log(
					`✅ [Storybook ID Search] Encontrado (index.json parcial): ${component.componentId}`,
				);
				return {
					found: true,
					componentId: component.componentId,
					method: 'index-json-partial',
					attempts: attempts.length,
				};
			}
		}
	} catch (error: any) {
		lastError = error.message;
		console.warn(`⚠️ [Storybook ID Search] Error en index.json: ${error.message}`);
	}

	// ESTRATEGIA 6: Usar validación con corrección automática
	attempts.push('validation-with-correction');
	try {
		const validation = await validateAndCorrectStorybookId(componentName, mappedId);
		if (validation.valid && validation.corrected) {
			console.log(`✅ [Storybook ID Search] Encontrado (validación): ${validation.componentId}`);
			return {
				found: true,
				componentId: validation.componentId,
				method: 'validation',
				attempts: attempts.length,
				variations: validation.searchVariations,
			};
		}
	} catch (error: any) {
		lastError = error.message;
	}

	// No se encontró
	console.error(
		`❌ [Storybook ID Search] No se encontró ID válido después de ${attempts.length} intentos`,
	);
	if (lastError) {
		console.error(`   Último error: ${lastError}`);
	}

	return {
		found: false,
		componentId: mappedId, // Retornar el mapeado como fallback
		method: 'none',
		attempts: attempts.length,
		variations: attempts,
	};
}

/**
 * Obtener ID de Storybook con búsqueda inteligente
 *
 * Combina mapeo + validación + búsqueda con retry
 */
export async function getStorybookIdWithSmartSearch(
	componentName: string,
): Promise<{ componentId: string; found: boolean; method: string }> {
	// 1. Obtener ID mapeado
	const manager = StorybookManager.getInstance();
	const mappedId = await manager.mapComponentToStorybookId(componentName);

	if (!mappedId) {
		return {
			componentId: componentName.toLowerCase().replace(/\s+/g, '-'),
			found: false,
			method: 'fallback',
		};
	}

	// 2. Intentar búsqueda con retry
	const searchResult = await searchStorybookIdWithRetry(componentName, mappedId);

	if (searchResult.found) {
		return {
			componentId: searchResult.componentId,
			found: true,
			method: searchResult.method,
		};
	}

	// 3. Si no se encontró, retornar el mapeado (puede que funcione de todas formas)
	return {
		componentId: mappedId,
		found: false,
		method: 'mapped-fallback',
	};
}
