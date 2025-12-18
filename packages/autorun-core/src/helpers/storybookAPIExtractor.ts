/**
 * Storybook API Extractor
 *
 * Extrae API completa del componente desde Storybook
 * Incluye métodos, firmas, parámetros y setup requerido
 */

import { getStorybookUrlWithFallback } from './storybookFallback';

export interface APIMethod {
	name: string;
	signature: string;
	parameters: Array<{
		name: string;
		type: string;
		required: boolean;
		description?: string;
		defaultValue?: string;
	}>;
	description?: string;
	examples?: string[];
	returnType?: string;
}

export interface ComponentAPI {
	componentId: string;
	methods: APIMethod[];
	setup?: {
		required: boolean;
		code: string;
		description: string;
		location: 'root' | 'component' | 'both';
	};
	usage?: string; // Ejemplo de uso general
}

/**
 * Extrae API desde Storybook
 *
 * @param componentId - ID del componente
 * @returns API extraída y parseada
 */
export async function extractAPIFromStorybook(componentId: string): Promise<ComponentAPI> {
	console.log(`🔍 [Storybook API Extractor] Extrayendo API para: ${componentId}`);

	try {
		// 1. Construir URL de Storybook
		const baseUrlResult = await getStorybookUrlWithFallback('', {
			checkAvailability: false,
		});
		const baseUrl = baseUrlResult.url.replace(/\/$/, '');
		const storybookUrl = `${baseUrl}/?path=/docs/${componentId}--docs`;

		// 2. Obtener HTML de la página
		const html = await fetchStorybookPage(storybookUrl);

		// 3. Extraer API
		const methods = extractAPIMethods(html);
		const setup = extractSetup(html);
		const usage = extractUsage(html);

		console.log(`✅ [Storybook API Extractor] ${methods.length} métodos extraídos`);

		return {
			componentId,
			methods,
			setup,
			usage,
		};
	} catch (error: any) {
		console.error(`❌ [Storybook API Extractor] Error extrayendo API:`, error.message);
		throw new Error(`No se pudo extraer API para ${componentId}: ${error.message}`);
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
 * Extrae métodos de API desde HTML
 *
 * Busca en:
 * - Sección "Toast API" o "API"
 * - Bloques de código con firmas de métodos
 * - Listas de métodos
 */
function extractAPIMethods(html: string): APIMethod[] {
	const methods: APIMethod[] = [];

	// Patrón 1: Buscar sección "API" o "Toast API"
	const apiSectionPattern = /(?:##\s+)?(?:Toast\s+)?API[\s\S]*?(?=##|$)/i;
	const apiSectionMatch = html.match(apiSectionPattern);
	const apiSection = apiSectionMatch ? apiSectionMatch[0] : html;

	// Patrón 2: Buscar bloques de código con firmas
	const codeBlockPattern = /```[\w]*\n([\s\S]*?)```/g;
	let codeMatch;
	while ((codeMatch = codeBlockPattern.exec(apiSection)) !== null) {
		const code = codeMatch[1];
		const methodMatches = extractMethodsFromCode(code);
		methods.push(...methodMatches);
	}

	// Patrón 3: Buscar listas de métodos (markdown)
	const listPattern = /(?:^|\n)(?:[-*]|\d+\.)\s*(.+?)(?=\n(?:[-*]|\d+\.)|$)/gm;
	let listMatch;
	while ((listMatch = listPattern.exec(apiSection)) !== null) {
		const methodText = listMatch[1];
		const method = parseMethodFromText(methodText);
		if (method) {
			methods.push(method);
		}
	}

	// Eliminar duplicados
	return deduplicateMethods(methods);
}

/**
 * Extrae métodos desde código
 */
function extractMethodsFromCode(code: string): APIMethod[] {
	const methods: APIMethod[] = [];

	// Buscar patrones de métodos
	// Patrón 1: toast.methodName(param1, param2?)
	const methodPattern = /(\w+)\.(\w+)\s*\(([^)]*)\)/g;
	let match;
	while ((match = methodPattern.exec(code)) !== null) {
		const objectName = match[1]; // "toast"
		const methodName = match[2]; // "success"
		const paramsStr = match[3]; // "title, description?, action?"

		const parameters = parseParameters(paramsStr);
		const signature = `${objectName}.${methodName}(${paramsStr})`;

		methods.push({
			name: methodName,
			signature,
			parameters,
			description: extractMethodDescription(code, methodName),
		});
	}

	return methods;
}

/**
 * Parsea parámetros desde string
 */
function parseParameters(paramsStr: string): APIMethod['parameters'] {
	if (!paramsStr.trim()) {
		return [];
	}

	const params: APIMethod['parameters'] = [];
	const paramParts = paramsStr.split(',').map((p) => p.trim());

	for (const paramPart of paramParts) {
		// Detectar si es requerido (no tiene ?)
		const required = !paramPart.endsWith('?');
		const name = paramPart.replace('?', '').trim();

		// Intentar detectar tipo desde contexto
		const type = inferTypeFromName(name);

		params.push({
			name,
			type,
			required,
		});
	}

	return params;
}

/**
 * Infiere tipo desde nombre de parámetro
 */
function inferTypeFromName(name: string): string {
	const lowerName = name.toLowerCase();

	if (
		lowerName.includes('title') ||
		lowerName.includes('description') ||
		lowerName.includes('message')
	) {
		return 'string';
	}
	if (
		lowerName.includes('action') ||
		lowerName.includes('button') ||
		lowerName.includes('element')
	) {
		return 'ReactNode';
	}
	if (
		lowerName.includes('position') ||
		lowerName.includes('variant') ||
		lowerName.includes('type')
	) {
		return 'string';
	}
	if (
		lowerName.includes('duration') ||
		lowerName.includes('timeout') ||
		lowerName.includes('delay')
	) {
		return 'number';
	}
	if (lowerName.includes('on') || lowerName.includes('callback') || lowerName.includes('handler')) {
		return 'function';
	}
	if (lowerName.includes('show') || lowerName.includes('visible') || lowerName.includes('enable')) {
		return 'boolean';
	}

	return 'any';
}

/**
 * Extrae descripción del método desde código
 */
function extractMethodDescription(code: string, methodName: string): string | undefined {
	// Buscar comentarios antes del método
	const commentPattern = new RegExp(`(?://|/\\*)[^\\n]*${methodName}[^\\n]*(?:\\n|\\*/)`, 'i');
	const commentMatch = code.match(commentPattern);
	if (commentMatch) {
		return commentMatch[0].replace(/\/\/|\/\*|\*\//g, '').trim();
	}

	return undefined;
}

/**
 * Parsea método desde texto
 */
function parseMethodFromText(text: string): APIMethod | null {
	// Buscar patrón: "// Method name" o "toast.method(...)"
	const methodPattern = /(?:^|\s)(\w+)\.(\w+)\s*\(([^)]*)\)/;
	const match = text.match(methodPattern);

	if (match) {
		const objectName = match[1];
		const methodName = match[2];
		const paramsStr = match[3];

		const parameters = parseParameters(paramsStr);
		const signature = `${objectName}.${methodName}(${paramsStr})`;

		return {
			name: methodName,
			signature,
			parameters,
			description: text.replace(methodPattern, '').trim() || undefined,
		};
	}

	return null;
}

/**
 * Extrae setup requerido
 */
function extractSetup(html: string): ComponentAPI['setup'] | undefined {
	// Buscar sección "Usage" o "Setup"
	const setupPatterns = [
		/(?:##\s+)?(?:Usage|Setup|Getting Started)[\s\S]*?(?=##|$)/i,
		/Add\s+(\w+)\s+to\s+your\s+app[\s\S]*?```[\w]*\n([\s\S]*?)```/i,
	];

	for (const pattern of setupPatterns) {
		const match = html.match(pattern);
		if (match) {
			const setupCode = match[2] || match[0];
			const componentName = match[1] || 'Component';

			// Detectar si es en root o component
			const location: 'root' | 'component' | 'both' =
				setupCode.includes('App') || setupCode.includes('root') || setupCode.includes('_app')
					? 'root'
					: 'component';

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

/**
 * Extrae ejemplo de uso general
 */
function extractUsage(html: string): string | undefined {
	// Buscar primer bloque de código en sección "Usage"
	const usagePattern = /(?:##\s+)?Usage[\s\S]*?```[\w]*\n([\s\S]*?)```/i;
	const match = html.match(usagePattern);
	return match ? match[1].trim() : undefined;
}

/**
 * Elimina métodos duplicados
 */
function deduplicateMethods(methods: APIMethod[]): APIMethod[] {
	const seen = new Set<string>();
	const unique: APIMethod[] = [];

	for (const method of methods) {
		const key = method.name.toLowerCase();
		if (!seen.has(key)) {
			seen.add(key);
			unique.push(method);
		}
	}

	return unique;
}
