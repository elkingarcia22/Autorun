/**
 * Storybook Cache
 *
 * Sistema de caché para información de Storybook
 * Evita consultas repetidas y mejora tiempos de implementación
 */

export interface CachedStorybookInfo {
	data: StorybookInfo;
	timestamp: number;
	ttl: number; // Time to live en milisegundos
}

export interface StorybookInfo {
	mcpData?: any;
	vercelData?: any;
	exactCode?: any;
	api?: any;
	composition?: any;
	bestPractices?: any;
	realWorldExamples?: any;
	interactionInfo?: InteractionInfo;
}

export interface InteractionInfo {
	openMethod?: string; // ej: "classList.add('ubits-modal-overlay--open')"
	closeMethod?: string; // ej: "classList.remove('ubits-modal-overlay--open')"
	requiredSetup?: string;
	warnings?: string[];
}

// Caché en memoria
const storybookCache = new Map<string, CachedStorybookInfo>();

// TTL por defecto: 1 hora
const DEFAULT_TTL = 3600000; // 1 hora en milisegundos

/**
 * Obtiene información de Storybook desde caché o la consulta si no existe
 */
export async function getStorybookInfoCached(
	componentId: string,
	ttl: number = DEFAULT_TTL,
): Promise<StorybookInfo | null> {
	const cached = storybookCache.get(componentId);

	if (cached && Date.now() - cached.timestamp < cached.ttl) {
		console.log(`✅ [Storybook Cache] Información encontrada en caché para: ${componentId}`);
		return cached.data;
	}

	// Si no hay caché o expiró, retornar null para que se consulte
	if (cached) {
		console.log(
			`🔄 [Storybook Cache] Caché expirado para: ${componentId}, se requiere nueva consulta`,
		);
	} else {
		console.log(`📚 [Storybook Cache] No hay caché para: ${componentId}, se requiere consulta`);
	}

	return null;
}

/**
 * Guarda información de Storybook en caché
 */
export function setStorybookInfoCached(
	componentId: string,
	data: StorybookInfo,
	ttl: number = DEFAULT_TTL,
): void {
	storybookCache.set(componentId, {
		data,
		timestamp: Date.now(),
		ttl,
	});

	console.log(
		`💾 [Storybook Cache] Información guardada en caché para: ${componentId} (TTL: ${ttl}ms)`,
	);
}

/**
 * Verifica si hay información en caché (sin consultarla)
 */
export function hasStorybookInfoCached(componentId: string): boolean {
	const cached = storybookCache.get(componentId);
	return cached !== undefined && Date.now() - cached.timestamp < cached.ttl;
}

/**
 * Invalida el caché para un componente específico
 */
export function invalidateStorybookCache(componentId: string): void {
	storybookCache.delete(componentId);
	console.log(`🗑️ [Storybook Cache] Caché invalidado para: ${componentId}`);
}

/**
 * Limpia todo el caché
 */
export function clearStorybookCache(): void {
	storybookCache.clear();
	console.log(`🗑️ [Storybook Cache] Caché limpiado completamente`);
}

/**
 * Obtiene estadísticas del caché
 */
export function getCacheStats(): {
	size: number;
	entries: Array<{ componentId: string; age: number; expiresIn: number }>;
} {
	const entries: Array<{
		componentId: string;
		age: number;
		expiresIn: number;
	}> = [];

	for (const [componentId, cached] of storybookCache.entries()) {
		const age = Date.now() - cached.timestamp;
		const expiresIn = cached.ttl - age;

		entries.push({
			componentId,
			age,
			expiresIn: expiresIn > 0 ? expiresIn : 0,
		});
	}

	return {
		size: storybookCache.size,
		entries,
	};
}
