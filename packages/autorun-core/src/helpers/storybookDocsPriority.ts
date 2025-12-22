/**
 * Storybook Docs Priority
 *
 * ⭐ MEJORA 4: Priorizar pestaña Docs sobre Story
 * Consulta Docs primero (información completa), luego Story (código exacto)
 */

import { StorybookManager } from './storybookManager';

export interface ComponentInfo {
	docs: DocsInfo;
	code: CodeInfo;
	props?: any[];
	examples?: string[];
}

export interface DocsInfo {
	description?: string;
	props?: any[];
	examples?: string[];
	bestPractices?: string[];
	api?: any;
}

export interface CodeInfo {
	html: string;
	js?: string;
	css?: string[];
}

/**
 * Obtiene información completa del componente desde Storybook
 * Consulta Docs primero (información completa), luego Story (código exacto)
 */
export async function getComponentInfoFromStorybook(componentId: string): Promise<ComponentInfo> {
	console.log(`🔍 [Docs Priority] Obteniendo información completa para: ${componentId}`);

	const manager = StorybookManager.getInstance();
	const activeConfig = await manager.getActiveConfig();

	if (!activeConfig) {
		throw new Error(
			`❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`,
		);
	}

	// PASO 1: Consultar Docs (información completa)
	console.log(`   [1/2] Consultando Docs (información completa)...`);
	const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;

	// ⚠️ CRÍTICO: Esta función requiere que el agente ejecute Browser MCP
	// Por ahora, usamos fetch como fallback
	console.log(`   ⚠️ IMPORTANTE: El agente DEBE navegar a: ${docsUrl}`);
	console.log(`   📋 Instrucciones para el agente:`);
	console.log(`      1. Navegar a: ${docsUrl}`);
	console.log(`      2. Extraer información desde el snapshot`);

	let docsInfo: DocsInfo = {};
	try {
		const html = await fetchStorybookPage(docsUrl);
		docsInfo = await extractDocsInfoFromHTML(html);
		console.log(`   ✅ Información de Docs extraída`);
	} catch (error: any) {
		console.warn(`   ⚠️ Error obteniendo Docs: ${error.message}`);
	}

	// PASO 2: Consultar Story (código exacto)
	console.log(`   [2/2] Consultando Story (código exacto)...`);
	const storyUrl = `${activeConfig.url}/?path=/story/${componentId}--default`;

	console.log(`   ⚠️ IMPORTANTE: El agente DEBE navegar a: ${storyUrl}`);
	console.log(`   📋 Instrucciones para el agente:`);
	console.log(`      1. Navegar a: ${storyUrl}`);
	console.log(`      2. Hacer clic en pestaña "Code"`);
	console.log(`      3. Extraer código desde el snapshot`);

	let codeInfo: CodeInfo = { html: '' };
	try {
		const { extractExactCodeFromStorybookWithBrowser } = await import(
			'./storybookExactCodeExtractorWithBrowser'
		);
		const exactCode = await extractExactCodeFromStorybookWithBrowser(componentId, 'default');
		codeInfo = {
			html: exactCode.html,
			js: exactCode.js,
			css: exactCode.css,
		};
		console.log(`   ✅ Código exacto extraído`);
	} catch (error: any) {
		console.warn(`   ⚠️ Error obteniendo código: ${error.message}`);
	}

	return {
		docs: docsInfo,
		code: codeInfo,
		props: docsInfo.props,
		examples: docsInfo.examples,
	};
}

/**
 * Extrae información desde snapshot del Browser MCP después de navegar a Docs
 */
export async function extractDocsInfoFromSnapshot(snapshot: any): Promise<DocsInfo> {
	// Por ahora, retornar información vacía (se implementará cuando tengamos acceso al snapshot)
	console.warn(`   ⚠️ Extracción desde snapshot no implementada aún`);
	return {};
}

/**
 * Extrae información desde HTML de la pestaña Docs
 */
export async function extractDocsInfoFromHTML(html: string): Promise<DocsInfo> {
	const docsInfo: DocsInfo = {};

	// 1. Extraer descripción
	const descriptionMatch = html.match(/<p[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
	if (descriptionMatch) {
		docsInfo.description = descriptionMatch[1].replace(/<[^>]+>/g, '').trim();
	}

	// 2. Extraer props (desde tabla)
	const propsTableMatch = html.match(
		/<table[^>]*class="[^"]*props[^"]*"[^>]*>([\s\S]*?)<\/table>/i,
	);
	if (propsTableMatch) {
		// Extraer props desde el HTML
		const { extractPropsFromDocsHTML } = await import('./mcpWithFallback');
		// Necesitamos exportar esta función o crear una versión aquí
		docsInfo.props = await extractPropsFromDocsHTML(html);
	}

	// 3. Extraer ejemplos (buscar bloques de código)
	const codeBlocks = html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/gi);
	const examples: string[] = [];
	for (const match of codeBlocks) {
		const code = match[1].replace(/<[^>]+>/g, '').trim();
		if (code.length > 50) {
			// Solo incluir bloques de código significativos
			examples.push(code);
		}
	}
	if (examples.length > 0) {
		docsInfo.examples = examples;
	}

	// 4. Extraer best practices (buscar secciones específicas)
	const bestPracticesMatch = html.match(
		/<section[^>]*class="[^"]*best-practices[^"]*"[^>]*>([\s\S]*?)<\/section>/i,
	);
	if (bestPracticesMatch) {
		const practicesText = bestPracticesMatch[1]
			.replace(/<[^>]+>/g, ' ')
			.trim()
			.split(/\n+/)
			.filter((line) => line.trim().length > 0);
		docsInfo.bestPractices = practicesText;
	}

	return docsInfo;
}

/**
 * Obtiene HTML de la página de Storybook
 */
async function fetchStorybookPage(url: string): Promise<string> {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		return await response.text();
	} catch (error: any) {
		throw new Error(`No se pudo obtener página de Storybook: ${error.message}`);
	}
}
