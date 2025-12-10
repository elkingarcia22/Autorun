/**
 * Storybook Fallback Helper
 * 
 * Sistema de fallback para Storybook: intenta Vercel primero,
 * si falla, usa GitHub como respaldo.
 */

import { UBITS_PRESET } from '../wizard/UBITSPreset';

/**
 * Verifica si una URL está disponible
 */
async function isUrlAvailable(url: string, timeout: number = 5000): Promise<boolean> {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		
		const response = await fetch(url, {
			method: 'HEAD',
			signal: controller.signal,
			mode: 'no-cors', // Para evitar CORS en verificación
		});
		
		clearTimeout(timeoutId);
		return true; // Si no hay error, asumimos que está disponible
	} catch (error) {
		return false;
	}
}

/**
 * Obtiene la URL de Storybook con fallback automático
 * Intenta Vercel primero, si falla, usa GitHub
 * 
 * @param path - Ruta adicional (ej: '/index.json', '/components/button/manifest.json')
 * @param options - Opciones de fallback
 * @returns URL disponible (Vercel o GitHub)
 */
export async function getStorybookUrlWithFallback(
	path: string = '',
	options: {
		checkAvailability?: boolean;
		timeout?: number;
		forceFallback?: boolean;
	} = {}
): Promise<{ url: string; source: 'vercel' | 'github'; usedFallback: boolean }> {
	const {
		checkAvailability = true,
		timeout = 5000,
		forceFallback = false,
	} = options;

	// Si se fuerza el fallback, usar GitHub directamente
	if (forceFallback) {
		const fallbackUrl = UBITS_PRESET.storybook.getFallbackUrl?.(path) || 
			`https://raw.githubusercontent.com/elkingarcia22/UBITS/main${path.startsWith('/') ? path : `/${path}`}`;
		return {
			url: fallbackUrl,
			source: 'github',
			usedFallback: true,
		};
	}

	// Intentar Vercel primero
	const vercelUrl = UBITS_PRESET.storybook.getUrl?.(path) || 
		`${UBITS_PRESET.storybook.url}${path.startsWith('/') ? path : `/${path}`}`;

	// Si no se requiere verificación, usar Vercel directamente
	if (!checkAvailability) {
		return {
			url: vercelUrl,
			source: 'vercel',
			usedFallback: false,
		};
	}

	// Verificar disponibilidad de Vercel
	const isVercelAvailable = await isUrlAvailable(vercelUrl, timeout);

	if (isVercelAvailable) {
		return {
			url: vercelUrl,
			source: 'vercel',
			usedFallback: false,
		};
	}

	// Vercel no está disponible, usar GitHub como fallback
	console.warn(`⚠️ [Storybook Fallback] Vercel no disponible, usando GitHub como fallback`);
	
	const fallbackUrl = UBITS_PRESET.storybook.getFallbackUrl?.(path) || 
		`https://raw.githubusercontent.com/elkingarcia22/UBITS/main${path.startsWith('/') ? path : `/${path}`}`;

	return {
		url: fallbackUrl,
		source: 'github',
		usedFallback: true,
	};
}

/**
 * Fetch con fallback automático
 * Intenta Vercel primero, si falla, intenta GitHub
 * 
 * @param path - Ruta adicional (ej: '/index.json', '/components/button/manifest.json')
 * @param options - Opciones de fetch
 * @returns Response del fetch
 */
export async function fetchStorybookWithFallback(
	path: string = '',
	options: RequestInit = {}
): Promise<Response> {
	try {
		// Intentar Vercel primero
		const vercelUrl = UBITS_PRESET.storybook.getUrl?.(path) || 
			`${UBITS_PRESET.storybook.url}${path.startsWith('/') ? path : `/${path}`}`;
		
		const vercelResponse = await fetch(vercelUrl, options);
		
		if (vercelResponse.ok) {
			return vercelResponse;
		}
		
		// Si Vercel responde con error, intentar GitHub
		throw new Error(`Vercel responded with ${vercelResponse.status}`);
	} catch (error) {
		// Vercel falló, usar GitHub como fallback
		console.warn(`⚠️ [Storybook Fallback] Vercel falló, usando GitHub como fallback:`, error);
		
		const fallbackUrl = UBITS_PRESET.storybook.getFallbackUrl?.(path) || 
			`https://raw.githubusercontent.com/elkingarcia22/UBITS/main${path.startsWith('/') ? path : `/${path}`}`;
		
		const fallbackResponse = await fetch(fallbackUrl, options);
		
		if (!fallbackResponse.ok) {
			throw new Error(`GitHub fallback also failed: ${fallbackResponse.status}`);
		}
		
		return fallbackResponse;
	}
}

/**
 * Obtiene la URL base de Storybook con fallback
 * Útil para navegación en el navegador
 */
export function getStorybookBaseUrlWithFallback(): { url: string; source: 'vercel' | 'github' } {
	// Por defecto, usar Vercel
	// El fallback se manejará automáticamente cuando se intente acceder
	return {
		url: UBITS_PRESET.storybook.url,
		source: 'vercel',
	};
}

/**
 * Mapea nombre de componente a URL de Storybook con fallback
 */
export async function getComponentStorybookUrlWithFallback(
	componentName: string,
	storyName: string = 'default'
): Promise<{ url: string; source: 'vercel' | 'github'; usedFallback: boolean }> {
	// Mapear nombre de componente a nombre en Storybook
	const storybookName = componentName.toLowerCase().replace(/\s+/g, '-');
	const path = `?path=/story/${storybookName}--${storyName}`;
	
	return getStorybookUrlWithFallback(path, { checkAvailability: false });
}


