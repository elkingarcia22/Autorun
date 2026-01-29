/**
 * Storybook Component Composition Extractor
 *
 * Extrae dependencias y setup requerido del componente
 */

import { getStorybookUrlWithFallback } from './storybookFallback';

export interface ComponentDependency {
	name: string;
	purpose: string;
	importPath?: string;
	required: boolean;
	examples?: string[];
}

export interface ComponentComposition {
	componentId: string;
	dependencies: ComponentDependency[];
	setup?: {
		required: boolean;
		code: string;
		description: string;
		location: 'root' | 'component' | 'both';
	};
}

/**
 * Extrae composición desde Storybook
 */
export async function extractCompositionFromStorybook(
	componentId: string,
): Promise<ComponentComposition> {
	console.log(`🔍 [Storybook Composition Extractor] Extrayendo composición para: ${componentId}`);

	try {
		const baseUrlResult = await getStorybookUrlWithFallback('', {
			checkAvailability: false,
		});
		const baseUrl = baseUrlResult.url.replace(/\/$/, '');
		// ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
		const encodedComponentId = encodeURIComponent(componentId);
		const storybookUrl = `${baseUrl}/?path=/docs/${encodedComponentId}--docs`;

		const html = await fetchStorybookPage(storybookUrl);
		const dependencies = extractDependencies(html);
		const setup = extractSetup(html);

		console.log(
			`✅ [Storybook Composition Extractor] ${dependencies.length} dependencias extraídas`,
		);

		return {
			componentId,
			dependencies,
			setup,
		};
	} catch (error: any) {
		console.error(`❌ [Storybook Composition Extractor] Error:`, error.message);
		throw new Error(`No se pudo extraer composición para ${componentId}: ${error.message}`);
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

function extractDependencies(html: string): ComponentDependency[] {
	const dependencies: ComponentDependency[] = [];

	// Buscar sección "Component Composition"
	const compositionPattern = /(?:##\s+)?Component\s+Composition[\s\S]*?(?=##|$)/i;
	const compositionMatch = html.match(compositionPattern);
	const compositionSection = compositionMatch ? compositionMatch[0] : html;

	// Buscar listas de dependencias
	const listPattern =
		/(?:^|\n)(?:[-*]|\d+\.)\s*\*\*([^*]+)\*\*[\s\S]*?((?:For|Used for|Purpose)[\s\S]*?)(?=\n(?:[-*]|\d+\.)|$)/gi;
	let match;
	while ((match = listPattern.exec(compositionSection)) !== null) {
		const name = match[1].trim();
		const purpose = match[2]
			.replace(/\*\*/g, '')
			.replace(/For|Used for|Purpose/gi, '')
			.trim();

		// Buscar import path en código
		const importPattern = new RegExp(`import[^}]+from[^"']*["']([^"']*${name}[^"']*)["']`, 'i');
		const importMatch = html.match(importPattern);
		const importPath = importMatch ? importMatch[1] : undefined;

		dependencies.push({
			name,
			purpose,
			importPath,
			required: true,
		});
	}

	return dependencies;
}

function extractSetup(html: string): ComponentComposition['setup'] | undefined {
	// Buscar sección de setup
	const setupPatterns = [
		/Add\s+(\w+)\s+to\s+your\s+app[\s\S]*?```[\w]*\n([\s\S]*?)```/i,
		/(?:##\s+)?(?:Setup|Usage|Getting Started)[\s\S]*?```[\w]*\n([\s\S]*?)```/i,
	];

	for (const pattern of setupPatterns) {
		const match = html.match(pattern);
		if (match) {
			const componentName = match[1] || 'Component';
			const setupCode = match[2] || match[1];

			const location: 'root' | 'component' | 'both' =
				setupCode.includes('App') || setupCode.includes('root') ? 'root' : 'component';

			return {
				required: true,
				code: setupCode.trim(),
				description: `Add ${componentName} to your app`,
				location,
			};
		}
	}

	return undefined;
}
