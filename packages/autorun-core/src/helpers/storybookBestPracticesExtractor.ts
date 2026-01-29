/**
 * Storybook Best Practices Extractor
 *
 * Extrae mejores prácticas, valores por defecto y recomendaciones
 */

import { getStorybookUrlWithFallback } from './storybookFallback';

export interface BestPractice {
	title: string;
	description: string;
	examples?: string[];
}

export interface BestPractices {
	componentId: string;
	practices: BestPractice[];
	defaults?: Record<string, any>;
	warnings?: string[];
	recommendations?: string[];
}

/**
 * Extrae best practices desde Storybook
 */
export async function extractBestPracticesFromStorybook(
	componentId: string,
): Promise<BestPractices> {
	console.log(`🔍 [Storybook Best Practices Extractor] Extrayendo prácticas para: ${componentId}`);

	try {
		const baseUrlResult = await getStorybookUrlWithFallback('', {
			checkAvailability: false,
		});
		const baseUrl = baseUrlResult.url.replace(/\/$/, '');
		// ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
		const encodedComponentId = encodeURIComponent(componentId);
		const storybookUrl = `${baseUrl}/?path=/docs/${encodedComponentId}--docs`;

		const html = await fetchStorybookPage(storybookUrl);
		const practices = extractPractices(html);
		const defaults = extractDefaults(html);
		const warnings = extractWarnings(html);
		const recommendations = extractRecommendations(html);

		console.log(`✅ [Storybook Best Practices Extractor] ${practices.length} prácticas extraídas`);

		return {
			componentId,
			practices,
			defaults,
			warnings,
			recommendations,
		};
	} catch (error: any) {
		console.error(`❌ [Storybook Best Practices Extractor] Error:`, error.message);
		throw new Error(`No se pudo extraer prácticas para ${componentId}: ${error.message}`);
	}
}

async function fetchStorybookPage(url: string): Promise<string> {
	try {
		const response = await fetch(url, {
			headers: { Accept: 'text/html' },
		});
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		return await response.text();
	} catch (error: any) {
		const { fetchStorybookWithFallback } = await import('./storybookFallback');
		const urlObj = new URL(url);
		const path = urlObj.pathname + urlObj.search;
		const fallbackResponse = await fetchStorybookWithFallback(path);
		if (!fallbackResponse.ok) {
			throw new Error(`No se pudo obtener HTML: ${error.message}`);
		}
		return await fallbackResponse.text();
	}
}

function extractPractices(html: string): BestPractice[] {
	const practices: BestPractice[] = [];

	// Buscar sección "Best Practices"
	const practicesPattern = /(?:##\s+)?Best\s+Practices[\s\S]*?(?=##|$)/i;
	const practicesMatch = html.match(practicesPattern);
	const practicesSection = practicesMatch ? practicesMatch[0] : '';

	// Buscar listas numeradas o con viñetas
	const listPattern =
		/(?:^|\n)(?:\d+\.|[-*])\s*\*\*([^*]+)\*\*[:\s]*([^\n]+(?:\n(?!\d+\.|[-*])[^\n]+)*)/g;
	let match;
	while ((match = listPattern.exec(practicesSection)) !== null) {
		const title = match[1].trim();
		const description = match[2].trim();

		practices.push({
			title,
			description,
		});
	}

	return practices;
}

function extractDefaults(html: string): Record<string, any> | undefined {
	const defaults: Record<string, any> = {};

	// Buscar valores por defecto en texto
	const defaultPatterns = [
		/(?:default|Default)[:\s]+(\d+)\s*(?:seconds?|ms|milliseconds?)/i,
		/(?:default|Default)[:\s]+"([^"]+)"/i,
		/(?:default|Default)[:\s]+'([^']+)'/i,
		/(?:default|Default)[:\s]+(\w+)/i,
	];

	for (const pattern of defaultPatterns) {
		const match = html.match(pattern);
		if (match) {
			const value = match[1];
			// Intentar inferir la clave
			const context = match[0];
			if (context.includes('timeout') || context.includes('dismiss') || context.includes('auto')) {
				defaults.autoDismiss = parseInt(value) || value;
			} else if (context.includes('position')) {
				defaults.position = value;
			} else {
				defaults.default = value;
			}
		}
	}

	return Object.keys(defaults).length > 0 ? defaults : undefined;
}

function extractWarnings(html: string): string[] {
	const warnings: string[] = [];

	// Buscar advertencias (⚠️, WARNING, etc.)
	const warningPatterns = [
		/⚠️\s*([^\n]+)/g,
		/(?:WARNING|Warning)[:\s]+([^\n]+)/gi,
		/Don't\s+([^\n]+)/gi,
		/Avoid\s+([^\n]+)/gi,
	];

	for (const pattern of warningPatterns) {
		let match;
		while ((match = pattern.exec(html)) !== null) {
			warnings.push(match[1].trim());
		}
	}

	return warnings;
}

function extractRecommendations(html: string): string[] {
	const recommendations: string[] = [];

	// Buscar recomendaciones
	const recommendationPatterns = [
		/(?:Recommendation|Recommended|Should)[:\s]+([^\n]+)/gi,
		/Use\s+([^\n]+)/gi,
		/Consider\s+([^\n]+)/gi,
	];

	for (const pattern of recommendationPatterns) {
		let match;
		while ((match = pattern.exec(html)) !== null) {
			recommendations.push(match[1].trim());
		}
	}

	return recommendations;
}
