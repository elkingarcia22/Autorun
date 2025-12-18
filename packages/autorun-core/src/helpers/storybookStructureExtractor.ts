/**
 * Storybook Structure Extractor
 *
 * Extrae estructura HTML renderizada desde Storybook
 * Incluye estilos relacionados y contexto completo
 */

import { getStorybookUrlWithFallback } from './storybookFallback';

export interface StorybookStructure {
	componentHTML: string;
	relatedStyles: string[];
	contextHTML: string;
	renderedHTML: string; // HTML después de renderizar
	componentSelector?: string; // Selector CSS del componente
}

export interface ExtractionOptions {
	componentId: string;
	storyName?: string;
	selector?: string; // Selector CSS personalizado para encontrar el componente
	includeContext?: boolean; // Si incluir contexto completo
}

/**
 * Extrae estructura HTML desde Storybook
 *
 * @param options - Opciones de extracción
 * @returns Estructura HTML extraída
 */
export async function extractStructureFromStorybook(
	options: ExtractionOptions,
): Promise<StorybookStructure> {
	console.log(
		`🔍 [Storybook Structure Extractor] Extrayendo estructura para: ${options.componentId}`,
	);

	try {
		// 1. Construir URL de Storybook
		const baseUrlResult = await getStorybookUrlWithFallback('', {
			checkAvailability: false,
		});
		const baseUrl = baseUrlResult.url.replace(/\/$/, '');
		const storybookUrl = `${baseUrl}/?path=/story/${options.componentId}--${options.storyName || 'default'}`;

		// 2. Obtener HTML de la página
		const html = await fetchStorybookPage(storybookUrl);

		// 3. Extraer HTML del componente
		const componentSelector = options.selector || findComponentSelector(html, options.componentId);
		const componentHTML = extractComponentHTML(html, componentSelector);

		// 4. Extraer estilos relacionados
		const relatedStyles = extractRelatedStyles(html, componentSelector);

		// 5. Extraer contexto completo
		const contextHTML = options.includeContext ? extractContextHTML(html, componentSelector) : '';

		console.log(
			`✅ [Storybook Structure Extractor] Estructura extraída (${componentHTML.length} caracteres)`,
		);

		return {
			componentHTML,
			relatedStyles,
			contextHTML,
			renderedHTML: html,
			componentSelector,
		};
	} catch (error: any) {
		console.error(`❌ [Storybook Structure Extractor] Error extrayendo estructura:`, error.message);
		throw new Error(`No se pudo extraer estructura para ${options.componentId}: ${error.message}`);
	}
}

/**
 * Obtiene HTML de la página de Storybook
 */
async function fetchStorybookPage(url: string): Promise<string> {
	try {
		const response = await fetch(url, {
			headers: {
				Accept: 'text/html',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		return await response.text();
	} catch (error: any) {
		// Si fetch falla, intentar con fallback
		const { fetchStorybookWithFallback } = await import('./storybookFallback');
		const urlObj = new URL(url);
		const path = urlObj.pathname + urlObj.search;
		const fallbackResponse = await fetchStorybookWithFallback(path);

		if (!fallbackResponse.ok) {
			throw new Error(`No se pudo obtener HTML desde ${url}: ${error.message}`);
		}

		return await fallbackResponse.text();
	}
}

/**
 * Encuentra selector CSS del componente
 */
function findComponentSelector(html: string, componentId: string): string {
	// Patrones comunes para encontrar el componente
	const patterns = [
		// Patrón 1: data-testid o data-component
		new RegExp(`data-(?:testid|component|id)=["']([^"']*${componentId}[^"']*)["']`, 'i'),
		// Patrón 2: class con nombre del componente
		new RegExp(`class=["']([^"']*${componentId.replace(/-/g, '[_-]')}[^"']*)["']`, 'i'),
		// Patrón 3: id con nombre del componente
		new RegExp(`id=["']([^"']*${componentId}[^"']*)["']`, 'i'),
	];

	for (const pattern of patterns) {
		const match = html.match(pattern);
		if (match) {
			const selector = match[1];
			// Construir selector CSS
			if (selector.includes('data-')) {
				return `[${selector}]`;
			}
			if (selector.startsWith('#')) {
				return selector;
			}
			return `.${selector.split(' ')[0]}`;
		}
	}

	// Selector por defecto: buscar contenedor de Storybook
	return '.os-story, .sb-story, [data-story], .story-container';
}

/**
 * Extrae HTML del componente
 */
function extractComponentHTML(html: string, selector: string): string {
	// Si el selector es un atributo, buscar directamente
	if (selector.startsWith('[')) {
		const attrMatch = selector.match(/\[([^\]]+)\]/);
		if (attrMatch) {
			const [attrName, attrValue] = attrMatch[1].split('=');
			const pattern = new RegExp(
				`<[^>]+${attrName}=["']${attrValue.replace(/"/g, '\\"')}["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`,
				'i',
			);
			const match = html.match(pattern);
			if (match) {
				return match[0];
			}
		}
	}

	// Si el selector es una clase o ID, buscar en el HTML
	// Por ahora, retornar una sección del HTML que probablemente contenga el componente
	// En una implementación real, usaríamos un parser HTML como cheerio o jsdom

	// Buscar sección de preview de Storybook
	const previewPatterns = [
		/<div[^>]*class=["'][^"]*(?:preview|story|canvas)[^"]*["'][^>]*>([\s\S]*?)<\/div>/i,
		/<div[^>]*id=["'][^"]*(?:preview|story|canvas)[^"]*["'][^>]*>([\s\S]*?)<\/div>/i,
	];

	for (const pattern of previewPatterns) {
		const match = html.match(pattern);
		if (match) {
			return match[1];
		}
	}

	// Si no se encuentra, retornar una sección del HTML
	return html.substring(0, Math.min(5000, html.length));
}

/**
 * Extrae estilos relacionados
 */
function extractRelatedStyles(html: string, selector: string): string[] {
	const styles: string[] = [];

	// Extraer <style> tags
	const stylePattern = /<style[^>]*>([\s\S]*?)<\/style>/gi;
	let styleMatch;
	while ((styleMatch = stylePattern.exec(html)) !== null) {
		const styleContent = styleMatch[1];
		// Buscar estilos que mencionen el selector
		if (styleContent.includes(selector) || selector === '.os-story') {
			styles.push(styleContent);
		}
	}

	// Extraer estilos inline
	const inlineStylePattern = new RegExp(`<[^>]+style=["']([^"']+)["'][^>]*>`, 'gi');
	while ((styleMatch = inlineStylePattern.exec(html)) !== null) {
		styles.push(styleMatch[1]);
	}

	// Extraer clases CSS relacionadas
	const classPattern = new RegExp(
		`class=["']([^"']*${selector.replace(/[.#\[\]]/g, '')}[^"']*)["']`,
		'gi',
	);
	const classes = new Set<string>();
	let classMatch;
	while ((classMatch = classPattern.exec(html)) !== null) {
		classMatch[1].split(' ').forEach((cls) => {
			if (cls.trim()) {
				classes.add(cls.trim());
			}
		});
	}

	return styles;
}

/**
 * Extrae contexto HTML completo
 */
function extractContextHTML(html: string, selector: string): string {
	// Buscar contenedor principal
	const containerPatterns = [
		/<main[^>]*>([\s\S]*?)<\/main>/i,
		/<div[^>]*class=["'][^"]*container[^"]*["'][^>]*>([\s\S]*?)<\/div>/i,
		/<body[^>]*>([\s\S]*?)<\/body>/i,
	];

	for (const pattern of containerPatterns) {
		const match = html.match(pattern);
		if (match) {
			return match[1];
		}
	}

	return html;
}
