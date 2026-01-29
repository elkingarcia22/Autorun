/**
 * Proveedor de iconos FontAwesome usando archivos locales
 * Funciona sin token npm, usando los archivos CSS y webfonts locales
 */

import {
	IconProvider,
	IconRenderOptions,
	IconSearchResult,
	IconCatalog,
} from '../core/IconProvider';

// Importar catálogos (se generan dinámicamente)
let iconsCatalog: any = { regular: [], solid: [] };
let searchIndex: any = {};

// Cargar catálogos de forma asíncrona
async function loadCatalogs() {
	try {
		iconsCatalog = await import('../catalog/icons.json');
		searchIndex = await import('../catalog/search-index.json');
	} catch (e) {
		console.warn('Catálogos de iconos no encontrados. Ejecuta: npm run generate-catalog');
	}
}

// Cargar al importar el módulo
loadCatalogs();

export class FontAwesomeProvider implements IconProvider {
	name = 'FontAwesome';
	version = '6.1.1';

	private cssLoaded = false;

	async initialize(): Promise<void> {
		// Cargar FontAwesome CSS si no está cargado
		if (typeof document !== 'undefined' && !this.cssLoaded) {
			// Verificar si ya está cargado
			const existingLink = document.querySelector('link[href*="fontawesome"]');

			if (!existingLink) {
				// Crear link a CSS (ruta relativa desde donde se use)
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = '/packages/icons/dist/fontawesome.css';
				document.head.appendChild(link);
			}

			this.cssLoaded = true;
		}
	}

	renderIcon(iconName: string, options: IconRenderOptions = {}): string {
		// Normalizar nombre: acepta "plus" o "fa-plus"
		const className = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;

		// Determinar clase de estilo
		const styleClass = options.style === 'solid' ? 'fas' : 'far';

		// Tamaño
		const sizeClass = options.size ? `fa-${options.size}` : '';

		// Clases adicionales
		const extraClass = options.class || '';

		// Construir HTML
		let classAttr = `${styleClass} ${className}`;
		if (sizeClass) classAttr += ` ${sizeClass}`;
		if (extraClass) classAttr += ` ${extraClass}`;

		return `<i class="${classAttr.trim()}"></i>`;
	}

	searchIcons(query: string): IconSearchResult[] {
		const normalizedQuery = query.toLowerCase().trim();
		const results: Map<string, IconSearchResult> = new Map();

		// Asegurar que los catálogos están cargados
		const currentIndex = searchIndex.default || searchIndex;
		const currentCatalog = iconsCatalog.default || iconsCatalog;

		// Buscar en índice de keywords
		Object.keys(currentIndex).forEach((keyword) => {
			if (keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword)) {
				((currentIndex as any)[keyword] || []).forEach((icon: any) => {
					const existing = results.get(icon.name);
					const score = existing ? existing.score + 1 : 1;

					results.set(icon.name, {
						name: icon.name,
						score,
						keywords: icon.keywords || [],
						styles: ['regular', 'solid'],
					});
				});
			}
		});

		// Buscar por nombre exacto (prioridad alta)
		[...currentCatalog.regular, ...currentCatalog.solid].forEach((icon: any) => {
			if (icon.name.includes(normalizedQuery)) {
				const existing = results.get(icon.name);
				if (!existing || existing.score < 10) {
					results.set(icon.name, {
						name: icon.name,
						score: 10,
						keywords: icon.keywords || [],
						styles: ['regular', 'solid'],
					});
				}
			}
		});

		// Ordenar por relevancia y retornar top 5
		return Array.from(results.values())
			.sort((a, b) => b.score - a.score)
			.slice(0, 5);
	}

	hasIcon(iconName: string): boolean {
		const className = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;

		const currentCatalog = iconsCatalog.default || iconsCatalog;
		return [...currentCatalog.regular, ...currentCatalog.solid].some(
			(icon: any) => icon.className === className,
		);
	}

	getCatalog(): IconCatalog {
		const currentCatalog = iconsCatalog.default || iconsCatalog;
		return {
			provider: 'FontAwesome',
			version: this.version,
			icons: [...currentCatalog.regular, ...currentCatalog.solid].map((icon: any) => ({
				name: icon.name,
				className: icon.className,
				keywords: icon.keywords || [],
				styles: ['regular', 'solid'],
			})),
		};
	}

	destroy(): void {
		// Limpiar recursos si es necesario
		// Por ahora, no hacemos nada ya que el CSS se mantiene en el DOM
		this.cssLoaded = false;
	}
}

// Auto-registrar el proveedor
import { iconService } from '../core/IconService';
iconService.registerProvider('fontawesome', () => new FontAwesomeProvider());
