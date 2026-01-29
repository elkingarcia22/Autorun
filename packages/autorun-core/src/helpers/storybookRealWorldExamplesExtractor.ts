/**
 * Storybook Real-World Examples Extractor
 *
 * Extrae ejemplos prácticos de uso del componente
 */

import { getStorybookUrlWithFallback } from './storybookFallback';

export interface RealWorldExample {
	title: string;
	description: string;
	code: string;
	useCase: string;
	variant?: string;
	context?: string;
}

export interface RealWorldExamples {
	componentId: string;
	examples: RealWorldExample[];
}

/**
 * Extrae ejemplos del mundo real desde Storybook
 */
export async function extractRealWorldExamplesFromStorybook(
	componentId: string,
): Promise<RealWorldExamples> {
	console.log(
		`🔍 [Storybook Real-World Examples Extractor] Extrayendo ejemplos para: ${componentId}`,
	);

	try {
		const baseUrlResult = await getStorybookUrlWithFallback('', {
			checkAvailability: false,
		});
		const baseUrl = baseUrlResult.url.replace(/\/$/, '');
		// ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
		const encodedComponentId = encodeURIComponent(componentId);
		const storybookUrl = `${baseUrl}/?path=/docs/${encodedComponentId}--docs`;

		const html = await fetchStorybookPage(storybookUrl);
		const examples = extractExamples(html);

		console.log(
			`✅ [Storybook Real-World Examples Extractor] ${examples.length} ejemplos extraídos`,
		);

		return {
			componentId,
			examples,
		};
	} catch (error: any) {
		console.error(`❌ [Storybook Real-World Examples Extractor] Error:`, error.message);
		throw new Error(`No se pudo extraer ejemplos para ${componentId}: ${error.message}`);
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

function extractExamples(html: string): RealWorldExample[] {
	const examples: RealWorldExample[] = [];

	// Buscar sección "Real-World Examples" o "Examples"
	const examplesPattern = /(?:##\s+)?(?:Real-World\s+Examples?|Examples?)[\s\S]*?(?=##|$)/i;
	const examplesMatch = html.match(examplesPattern);
	const examplesSection = examplesMatch ? examplesMatch[0] : html;

	// Buscar bloques de código con contexto
	const codeBlockPattern = /```[\w]*\n([\s\S]*?)```/g;
	let codeMatch;
	let codeIndex = 0;

	while ((codeMatch = codeBlockPattern.exec(examplesSection)) !== null) {
		const code = codeMatch[1].trim();

		// Buscar título y descripción antes del código
		const beforeCode = examplesSection.substring(0, codeMatch.index);
		const titleMatch = beforeCode.match(/(?:###|##)\s+([^\n]+)|(?:^|\n)([A-Z][^\n]+)(?=\n```)/m);
		const title = titleMatch ? (titleMatch[1] || titleMatch[2]).trim() : `Example ${codeIndex + 1}`;

		// Detectar caso de uso desde el código
		const useCase = detectUseCase(code, title);

		// Detectar variante desde el código
		const variant = detectVariant(code);

		examples.push({
			title,
			description: extractDescription(beforeCode),
			code,
			useCase,
			variant,
		});

		codeIndex++;
	}

	return examples;
}

function detectUseCase(code: string, title: string): string {
	const lowerCode = code.toLowerCase();
	const lowerTitle = title.toLowerCase();

	if (lowerCode.includes('submit') || lowerTitle.includes('submit') || lowerCode.includes('form')) {
		return 'form-submission';
	}
	if (lowerCode.includes('upload') || lowerTitle.includes('upload') || lowerCode.includes('file')) {
		return 'file-upload';
	}
	if (lowerCode.includes('error') || lowerTitle.includes('error') || lowerCode.includes('fail')) {
		return 'error-handling';
	}
	if (lowerCode.includes('save') || lowerTitle.includes('save') || lowerCode.includes('change')) {
		return 'save-changes';
	}
	if (
		lowerCode.includes('delete') ||
		lowerTitle.includes('delete') ||
		lowerCode.includes('remove')
	) {
		return 'delete-action';
	}
	if (
		lowerCode.includes('leave') ||
		lowerTitle.includes('leave') ||
		lowerCode.includes('navigate')
	) {
		return 'navigation-warning';
	}

	return 'general';
}

function detectVariant(code: string): string | undefined {
	const variantPattern = /(?:variant|type|tone)=["'](\w+)["']|\.(success|info|warning|error)\(/i;
	const match = code.match(variantPattern);
	return match ? match[1] || match[2] : undefined;
}

function extractDescription(text: string): string {
	// Buscar descripción antes del código
	const descPattern = /([^\n]+(?:\n[^\n]+)*?)(?=\n```|$)/;
	const match = text.match(descPattern);
	if (match) {
		return match[1]
			.replace(/###|##|#/g, '')
			.replace(/\*\*/g, '')
			.trim();
	}
	return '';
}
