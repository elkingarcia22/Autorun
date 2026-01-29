/**
 * Interfaz base para proveedores de iconos
 * Permite intercambiar FontAwesome, Lucide, Material Icons, etc.
 */

export interface IconRenderOptions {
	/** Estilo del icono: regular (outline), solid (filled), light, thin */
	style?: 'regular' | 'solid' | 'light' | 'thin';
	/** Tamaño: xs, sm, md, lg, xl */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	/** Clases CSS adicionales */
	class?: string;
	/** Color personalizado */
	color?: string;
}

export interface IconSearchResult {
	/** Nombre del icono */
	name: string;
	/** Score de relevancia (mayor = más relevante) */
	score: number;
	/** Keywords asociadas al icono */
	keywords: string[];
	/** Estilos disponibles */
	styles?: string[];
}

export interface IconCatalog {
	/** Nombre del proveedor */
	provider: string;
	/** Versión */
	version: string;
	/** Lista de iconos disponibles */
	icons: Array<{
		name: string;
		className: string;
		keywords: string[];
		styles: string[];
	}>;
}

/**
 * Interfaz que deben implementar todos los proveedores de iconos
 */
export interface IconProvider {
	/** Nombre del proveedor */
	name: string;

	/** Versión del proveedor */
	version: string;

	/**
	 * Renderiza un icono como HTML
	 * @param iconName - Nombre del icono (ej: "plus", "user-circle")
	 * @param options - Opciones de renderizado
	 * @returns HTML string listo para usar
	 */
	renderIcon(iconName: string, options?: IconRenderOptions): string;

	/**
	 * Busca iconos por descripción semántica
	 * @param query - Descripción (ej: "crear", "eliminar")
	 * @returns Array de resultados ordenados por relevancia
	 */
	searchIcons(query: string): IconSearchResult[];

	/**
	 * Valida si un icono existe
	 * @param iconName - Nombre del icono
	 * @returns true si existe
	 */
	hasIcon(iconName: string): boolean;

	/**
	 * Obtiene el catálogo completo de iconos
	 * @returns Catálogo estructurado
	 */
	getCatalog(): IconCatalog;

	/**
	 * Inicializa el proveedor (carga recursos necesarios)
	 */
	initialize(): Promise<void>;

	/**
	 * Limpia recursos del proveedor
	 */
	destroy(): void;
}
