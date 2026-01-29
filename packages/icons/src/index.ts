/**
 * API pública del sistema de iconos UBITS
 * Esta API NO cambia aunque cambies el proveedor (FontAwesome, Lucide, etc.)
 */

import { iconService } from './core/IconService';
import type {
	IconProvider,
	IconRenderOptions,
	IconSearchResult,
	IconCatalog,
} from './core/IconProvider';

// Importar providers para que se registren automáticamente
import './providers/FontAwesomeProvider';

/**
 * Renderiza un icono como HTML
 *
 * @param iconName - Nombre del icono (ej: "plus", "user-circle", "fa-trash")
 * @param options - Opciones de renderizado
 * @returns HTML string listo para usar
 *
 * @example
 * ```ts
 * renderIcon('plus'); // → '<i class="far fa-plus"></i>'
 * renderIcon('plus', { style: 'solid', size: 'lg' }); // → '<i class="fas fa-plus fa-lg"></i>'
 * ```
 */
export function renderIcon(iconName: string, options?: IconRenderOptions): string {
	return iconService.renderIcon(iconName, options);
}

/**
 * Busca iconos por descripción semántica
 *
 * @param query - Descripción (ej: "crear", "eliminar", "usuario")
 * @returns Array de resultados ordenados por relevancia
 *
 * @example
 * ```ts
 * searchIcons('crear'); // → [{ name: 'plus', score: 10, ... }, ...]
 * ```
 */
export function searchIcons(query: string): IconSearchResult[] {
	return iconService.searchIcons(query);
}

/**
 * Verifica si un icono existe
 *
 * @param iconName - Nombre del icono
 * @returns true si existe
 *
 * @example
 * ```ts
 * hasIcon('plus'); // → true
 * hasIcon('icono-inexistente'); // → false
 * ```
 */
export function hasIcon(iconName: string): boolean {
	return iconService.hasIcon(iconName);
}

/**
 * Obtiene el catálogo completo de iconos
 *
 * @returns Catálogo estructurado con todos los iconos disponibles
 */
export function getCatalog(): IconCatalog {
	return iconService.getCatalog();
}

/**
 * Inicializa el servicio de iconos (una sola vez al inicio de la app)
 *
 * @param provider - Proveedor a usar: 'fontawesome' | 'lucide' (default: 'fontawesome')
 *
 * @example
 * ```ts
 * await initializeIcons('fontawesome');
 * ```
 */
export async function initializeIcons(
	provider: 'fontawesome' | 'lucide' = 'fontawesome',
): Promise<void> {
	await iconService.initialize(provider);
}

/**
 * Cambia el proveedor en tiempo de ejecución
 *
 * @param provider - Nuevo proveedor
 *
 * @example
 * ```ts
 * await switchIconProvider('lucide');
 * ```
 */
export async function switchIconProvider(provider: 'fontawesome' | 'lucide'): Promise<void> {
	await iconService.switchProvider(provider);
}

/**
 * Helper para Cursor AI: Genera código completo de botón con icono
 *
 * @param iconQuery - Nombre o descripción del icono
 * @param text - Texto del botón
 * @param variant - Variante del botón UBITS
 * @param size - Tamaño del botón
 * @returns HTML completo del botón
 *
 * @example
 * ```ts
 * generateButtonWithIcon('crear', 'Crear', 'primary', 'md');
 * // → '<button class="ubits-button ubits-button--primary ubits-button--md">...'
 * ```
 */
export function generateButtonWithIcon(
	iconQuery: string,
	text: string,
	variant: 'primary' | 'secondary' | 'tertiary' = 'primary',
	size: 'sm' | 'md' | 'lg' = 'md',
): string {
	// Buscar el icono
	let iconName = iconQuery;

	// Si no es una referencia directa, buscar semánticamente
	if (!iconQuery.startsWith('fa-') && !iconQuery.match(/^[a-z-]+$/)) {
		const results = searchIcons(iconQuery);
		if (results.length > 0) {
			iconName = results[0].name;
		}
	}

	const iconHTML = renderIcon(iconName, { style: 'regular' });

	return `<button class="ubits-button ubits-button--${variant} ubits-button--${size}">
  ${iconHTML}
  <span>${text}</span>
</button>`;
}

// Re-exportar tipos
export type { IconProvider, IconRenderOptions, IconSearchResult, IconCatalog };
