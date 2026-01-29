/**
 * Storybook ID Validator
 *
 * Sistema que valida y corrige automáticamente IDs de Storybook
 * cuando fallan las búsquedas, intentando variaciones y consultando index.json
 *
 * ⚠️ CRÍTICO: Este sistema previene errores "Couldn't find story matching"
 */

import { StorybookManager } from './storybookManager';
import { findComponentByIdOrName } from './storybookIdDiscovery';

export interface ValidationResult {
	valid: boolean;
	componentId: string;
	corrected: boolean;
	originalId?: string;
	searchVariations?: string[];
	foundBy?: 'exact' | 'case-insensitive' | 'partial' | 'title' | 'fallback';
}

/**
 * Generar variaciones de búsqueda para un ID de componente
 */
function generateSearchVariations(componentId: string): string[] {
	const variations: string[] = [];

	// Variación original
	variations.push(componentId);

	// Variaciones de mayúsculas/minúsculas
	variations.push(componentId.toLowerCase());
	variations.push(componentId.toUpperCase());
	variations.push(componentId.charAt(0).toUpperCase() + componentId.slice(1).toLowerCase());

	// Variaciones sin emojis (si tiene emojis)
	const withoutEmojis = componentId.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
	if (withoutEmojis !== componentId) {
		variations.push(withoutEmojis);
		variations.push(withoutEmojis.toLowerCase());
	}

	// Variaciones sin guiones
	const withoutDashes = componentId.replace(/-/g, '');
	if (withoutDashes !== componentId) {
		variations.push(withoutDashes);
		variations.push(withoutDashes.toLowerCase());
	}

	// Variaciones con guiones en lugar de espacios
	const withDashes = componentId.replace(/\s+/g, '-');
	if (withDashes !== componentId) {
		variations.push(withDashes);
		variations.push(withDashes.toLowerCase());
	}

	// Remover duplicados
	return Array.from(new Set(variations));
}

/**
 * Validar y corregir ID de Storybook automáticamente
 *
 * @param componentName - Nombre del componente (ej: "Button")
 * @param componentId - ID a validar (ej: "🧩-ux-button")
 * @returns Resultado de validación con ID corregido si es necesario
 */
export async function validateAndCorrectStorybookId(
	componentName: string,
	componentId: string,
): Promise<ValidationResult> {
	console.log(
		`🔍 [Storybook ID Validator] Validando ID: ${componentId} para componente: ${componentName}`,
	);

	// PASO 1: Intentar búsqueda exacta
	let component = await findComponentByIdOrName(componentId);
	if (component) {
		console.log(`✅ [Storybook ID Validator] ID válido (búsqueda exacta): ${componentId}`);
		return {
			valid: true,
			componentId: component.componentId,
			corrected: component.componentId !== componentId,
			originalId: componentId,
			foundBy: 'exact',
		};
	}

	// PASO 2: Intentar búsqueda por nombre del componente
	component = await findComponentByIdOrName(componentName);
	if (component) {
		console.log(`✅ [Storybook ID Validator] ID encontrado por nombre: ${component.componentId}`);
		return {
			valid: true,
			componentId: component.componentId,
			corrected: true,
			originalId: componentId,
			foundBy: 'title',
		};
	}

	// PASO 3: Generar variaciones y buscar
	console.log(`🔍 [Storybook ID Validator] ID no encontrado, generando variaciones...`);
	const variations = generateSearchVariations(componentId);
	console.log(`🔍 [Storybook ID Validator] ${variations.length} variaciones generadas`);

	// Buscar cada variación
	for (const variation of variations) {
		component = await findComponentByIdOrName(variation);
		if (component) {
			console.log(
				`✅ [Storybook ID Validator] ID encontrado con variación "${variation}": ${component.componentId}`,
			);
			return {
				valid: true,
				componentId: component.componentId,
				corrected: true,
				originalId: componentId,
				searchVariations: variations,
				foundBy: 'partial',
			};
		}
	}

	// PASO 4: Intentar búsqueda parcial en el nombre del componente
	const partialVariations = generateSearchVariations(componentName);
	for (const variation of partialVariations) {
		component = await findComponentByIdOrName(variation);
		if (component) {
			console.log(
				`✅ [Storybook ID Validator] ID encontrado con variación del nombre "${variation}": ${component.componentId}`,
			);
			return {
				valid: true,
				componentId: component.componentId,
				corrected: true,
				originalId: componentId,
				searchVariations: [...variations, ...partialVariations],
				foundBy: 'partial',
			};
		}
	}

	// PASO 5: Si no se encuentra, retornar el ID original pero marcado como no válido
	console.warn(
		`⚠️ [Storybook ID Validator] No se encontró ID válido para ${componentName} (ID intentado: ${componentId})`,
	);
	return {
		valid: false,
		componentId: componentId, // Retornar el original como fallback
		corrected: false,
		originalId: componentId,
		searchVariations: [...variations, ...partialVariations],
		foundBy: 'fallback',
	};
}

/**
 * Verificar si un ID de Storybook existe (versión rápida)
 */
export async function verifyStorybookIdExists(componentId: string): Promise<boolean> {
	try {
		const component = await findComponentByIdOrName(componentId);
		return component !== null;
	} catch (error) {
		console.warn(`⚠️ [Storybook ID Validator] Error verificando ID: ${componentId}`, error);
		return false;
	}
}

/**
 * Obtener ID correcto con múltiples intentos
 *
 * Intenta diferentes estrategias para encontrar el ID correcto:
 * 1. Búsqueda exacta
 * 2. Búsqueda case-insensitive
 * 3. Búsqueda por nombre del componente
 * 4. Búsqueda parcial
 */
export async function getCorrectStorybookIdWithRetry(
	componentName: string,
	fallbackId: string,
): Promise<{ componentId: string; found: boolean; method?: string }> {
	console.log(
		`🔍 [Storybook ID Validator] Buscando ID correcto para: ${componentName} (fallback: ${fallbackId})`,
	);

	// Estrategia 1: Búsqueda exacta del fallback
	let component = await findComponentByIdOrName(fallbackId);
	if (component) {
		return {
			componentId: component.componentId,
			found: true,
			method: 'exact-fallback',
		};
	}

	// Estrategia 2: Búsqueda por nombre del componente
	component = await findComponentByIdOrName(componentName);
	if (component) {
		return {
			componentId: component.componentId,
			found: true,
			method: 'by-name',
		};
	}

	// Estrategia 3: Generar variaciones y buscar
	const variations = generateSearchVariations(fallbackId);
	for (const variation of variations) {
		component = await findComponentByIdOrName(variation);
		if (component) {
			return {
				componentId: component.componentId,
				found: true,
				method: `variation-${variation}`,
			};
		}
	}

	// Estrategia 4: Variaciones del nombre del componente
	const nameVariations = generateSearchVariations(componentName);
	for (const variation of nameVariations) {
		component = await findComponentByIdOrName(variation);
		if (component) {
			return {
				componentId: component.componentId,
				found: true,
				method: `name-variation-${variation}`,
			};
		}
	}

	// No se encontró, retornar fallback
	console.warn(
		`⚠️ [Storybook ID Validator] No se encontró ID válido, usando fallback: ${fallbackId}`,
	);
	return {
		componentId: fallbackId,
		found: false,
		method: 'fallback',
	};
}

/**
 * Construir URL de Storybook con ID validado y verificación de historia
 *
 * Si la historia especificada no existe, usa la primera historia disponible
 */
export async function buildValidatedStorybookUrl(
	componentName: string,
	componentId: string,
	storyName: string = 'default',
): Promise<{ url: string; componentId: string; storyName: string }> {
	const { StorybookManager } = await import('./storybookManager');
	const { getAvailableStoriesForComponent } = await import('./storybookIdDiscovery');
	const manager = StorybookManager.getInstance();

	// ⚠️ NUEVO: Verificar que la historia existe
	let actualStoryName = storyName;
	try {
		const availableStories = await getAvailableStoriesForComponent(componentId);

		if (availableStories.length > 0) {
			if (!availableStories.includes(storyName)) {
				// La historia no existe, usar la primera disponible
				actualStoryName = availableStories[0];
				console.log(
					`⚠️ [Storybook ID Validator] Historia "${storyName}" no existe para ${componentId}, usando "${actualStoryName}"`,
				);
				console.log(
					`📚 [Storybook ID Validator] Historias disponibles: ${availableStories.join(', ')}`,
				);
			}
		} else {
			console.warn(
				`⚠️ [Storybook ID Validator] No se encontraron historias para ${componentId}, usando "${actualStoryName}"`,
			);
		}
	} catch (error: any) {
		console.warn(
			`⚠️ [Storybook ID Validator] Error verificando historias, usando "${actualStoryName}":`,
			error.message,
		);
	}

	// ⚠️ CRÍTICO: Usar /docs/ en lugar de /story/ para obtener documentación completa
	// La pestaña Docs contiene props, ejemplos, código y toda la información necesaria
	// ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
	const encodedComponentId = encodeURIComponent(componentId);
	const path = `?path=/docs/${encodedComponentId}--docs`;
	const url = await manager.buildStorybookUrl(path);

	console.log(`📚 [Storybook ID Validator] URL construida con Docs: ${url}`);

	return {
		url,
		componentId,
		storyName: 'docs', // Siempre usar docs para implementación
	};
}
