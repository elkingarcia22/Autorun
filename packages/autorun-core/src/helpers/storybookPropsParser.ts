/**
 * Storybook Props Parser
 *
 * Extrae y parsea tabla de props desde Storybook
 * Convierte tablas HTML/Markdown a estructura tipada
 */

import { getStorybookUrlWithFallback } from './storybookFallback';

export interface StorybookPropsTable {
	name: string;
	description: string;
	defaultValue: string;
	control: string;
	required: boolean;
	type: string;
}

export interface ParsedStorybookProps {
	componentId: string;
	props: StorybookPropsTable[];
	totalProps: number;
	requiredProps: string[];
	optionalProps: string[];
}

/**
 * Extrae tabla de props desde una URL de Storybook
 *
 * @param storybookUrl - URL completa de Storybook (página de docs)
 * @returns Props extraídas y parseadas
 */
export async function parsePropsTableFromStorybookUrl(
	storybookUrl: string,
): Promise<ParsedStorybookProps> {
	console.log(`🔍 [Storybook Props Parser] Extrayendo props desde: ${storybookUrl}`);

	try {
		// 1. Obtener HTML de la página
		const html = await fetchStorybookPage(storybookUrl);

		// 2. Extraer tabla de props
		const props = extractPropsTable(html);

		// 3. Extraer componentId de la URL
		const { componentId } = extractIdsFromUrl(storybookUrl);

		// 4. Separar props requeridas y opcionales
		const requiredProps = props.filter((p) => p.required).map((p) => p.name);
		const optionalProps = props.filter((p) => !p.required).map((p) => p.name);

		console.log(
			`✅ [Storybook Props Parser] ${props.length} props extraídas (${requiredProps.length} requeridas, ${optionalProps.length} opcionales)`,
		);

		return {
			componentId,
			props,
			totalProps: props.length,
			requiredProps,
			optionalProps,
		};
	} catch (error: any) {
		console.error(`❌ [Storybook Props Parser] Error extrayendo props:`, error.message);
		throw new Error(`No se pudo extraer props desde ${storybookUrl}: ${error.message}`);
	}
}

/**
 * Extrae props desde una historia específica de un componente
 *
 * @param componentId - ID del componente (ej: "data-data-table")
 * @param useDocs - Si usar página de docs (true) o historia (false)
 * @returns Props extraídas y parseadas
 */
export async function parsePropsFromComponent(
	componentId: string,
	useDocs: boolean = true,
): Promise<ParsedStorybookProps> {
	// Construir URL de Storybook
	const baseUrlResult = await getStorybookUrlWithFallback('', {
		checkAvailability: false,
	});
	const baseUrl = baseUrlResult.url.replace(/\/$/, '');

	// Usar página de docs si está disponible, sino usar historia default
	const storybookUrl = useDocs
		? `${baseUrl}/?path=/docs/${componentId}--docs`
		: `${baseUrl}/?path=/story/${componentId}--default`;

	return parsePropsTableFromStorybookUrl(storybookUrl);
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
 * Extrae tabla de props desde HTML
 *
 * Busca tablas con diferentes patrones:
 * - <table> con headers: Name, Description, Default, Control
 * - .props-table (clase específica)
 * - [data-props-table] (atributo de datos)
 */
function extractPropsTable(html: string): StorybookPropsTable[] {
	const props: StorybookPropsTable[] = [];

	// Patrón 1: Tabla HTML estándar
	const tablePattern =
		/<table[^>]*>[\s\S]*?<thead[^>]*>[\s\S]*?<\/thead>[\s\S]*?<tbody[^>]*>([\s\S]*?)<\/tbody>[\s\S]*?<\/table>/gi;

	let tableMatch;
	while ((tableMatch = tablePattern.exec(html)) !== null) {
		const tbody = tableMatch[1];
		const rows = extractTableRows(tbody);

		// Verificar si es una tabla de props (buscar headers comunes)
		const headers = extractTableHeaders(tableMatch[0]);
		if (isPropsTable(headers)) {
			const parsedProps = parseTableRows(rows, headers);
			props.push(...parsedProps);
		}
	}

	// Patrón 2: Tabla con clase específica
	const classPattern =
		/<table[^>]*class=["'][^"]*(?:props-table|argstable|controls-table)[^"]*["'][^>]*>([\s\S]*?)<\/table>/gi;

	while ((tableMatch = classPattern.exec(html)) !== null) {
		const tableContent = tableMatch[1];
		const rows = extractTableRows(tableContent);
		const headers = extractTableHeaders(tableMatch[0]);
		const parsedProps = parseTableRows(rows, headers);
		props.push(...parsedProps);
	}

	// Eliminar duplicados
	return deduplicateProps(props);
}

/**
 * Extrae filas de una tabla
 */
function extractTableRows(tbody: string): string[] {
	const rowPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
	const rows: string[] = [];
	let rowMatch;

	while ((rowMatch = rowPattern.exec(tbody)) !== null) {
		rows.push(rowMatch[1]);
	}

	return rows;
}

/**
 * Extrae headers de una tabla
 */
function extractTableHeaders(table: string): string[] {
	const headerPattern = /<th[^>]*>([\s\S]*?)<\/th>/gi;
	const headers: string[] = [];
	let headerMatch;

	while ((headerMatch = headerPattern.exec(table)) !== null) {
		const headerText = stripHtml(headerMatch[1]).trim().toLowerCase();
		headers.push(headerText);
	}

	return headers;
}

/**
 * Verifica si es una tabla de props
 */
function isPropsTable(headers: string[]): boolean {
	const propsKeywords = ['name', 'prop', 'property', 'description', 'default', 'control', 'type'];
	return headers.some((header) => propsKeywords.some((keyword) => header.includes(keyword)));
}

/**
 * Parsea filas de tabla a props
 */
function parseTableRows(rows: string[], headers: string[]): StorybookPropsTable[] {
	const props: StorybookPropsTable[] = [];

	// Mapear índices de columnas
	const nameIndex = findHeaderIndex(headers, ['name', 'prop', 'property']);
	const descIndex = findHeaderIndex(headers, ['description', 'desc']);
	const defaultIndex = findHeaderIndex(headers, ['default', 'defaultvalue']);
	const controlIndex = findHeaderIndex(headers, ['control', 'type', 'input']);

	for (const row of rows) {
		const cells = extractTableCells(row);

		if (cells.length === 0) continue;

		const name = cells[nameIndex] || cells[0] || '';
		const description = cells[descIndex] || cells[1] || '';
		const defaultValue = cells[defaultIndex] || cells[2] || '-';
		const control = cells[controlIndex] || cells[3] || '';

		// Verificar si es requerida (buscar asterisco o "required")
		const isRequired =
			name.includes('*') ||
			name.toLowerCase().includes('required') ||
			description.toLowerCase().includes('required');

		// Limpiar nombre (remover asterisco, etc.)
		const cleanName = name.replace(/\*+/g, '').trim();

		// Extraer tipo desde descripción o control
		const type = extractType(description, control);

		if (cleanName) {
			props.push({
				name: cleanName,
				description: stripHtml(description).trim(),
				defaultValue: stripHtml(defaultValue).trim(),
				control: stripHtml(control).trim(),
				required: isRequired,
				type: type,
			});
		}
	}

	return props;
}

/**
 * Extrae celdas de una fila
 */
function extractTableCells(row: string): string[] {
	const cellPattern = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
	const cells: string[] = [];
	let cellMatch;

	while ((cellMatch = cellPattern.exec(row)) !== null) {
		cells.push(cellMatch[1]);
	}

	return cells;
}

/**
 * Encuentra índice de header
 */
function findHeaderIndex(headers: string[], keywords: string[]): number {
	for (let i = 0; i < headers.length; i++) {
		if (keywords.some((keyword) => headers[i].includes(keyword))) {
			return i;
		}
	}
	return -1;
}

/**
 * Extrae tipo desde descripción o control
 */
function extractType(description: string, control: string): string {
	// Buscar tipo en descripción
	const typeMatch = description.match(/(?:type|tipo)[:：]\s*([^\s<]+)|<br\s*\/?>\s*([a-z]+)/i);
	if (typeMatch) {
		return (typeMatch[1] || typeMatch[2] || '').trim();
	}

	// Buscar tipo en control
	if (control) {
		const controlType = control.toLowerCase();
		if (controlType.includes('select') || controlType.includes('radio')) {
			return 'string';
		}
		if (controlType.includes('boolean') || controlType.includes('checkbox')) {
			return 'boolean';
		}
		if (controlType.includes('number') || controlType.includes('range')) {
			return 'number';
		}
	}

	return 'string';
}

/**
 * Elimina HTML de un texto
 */
function stripHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, ' ') // Remover tags
		.replace(/&nbsp;/g, ' ')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Elimina props duplicadas
 */
function deduplicateProps(props: StorybookPropsTable[]): StorybookPropsTable[] {
	const seen = new Set<string>();
	const unique: StorybookPropsTable[] = [];

	for (const prop of props) {
		const key = prop.name.toLowerCase();
		if (!seen.has(key)) {
			seen.add(key);
			unique.push(prop);
		}
	}

	return unique;
}

/**
 * Extrae componentId desde la URL
 */
function extractIdsFromUrl(url: string): { componentId: string } {
	// Buscar patrón: /docs/component-id--docs o /story/component-id--story-name
	const docsMatch = url.match(/\/docs\/([^?]+)/);
	if (docsMatch) {
		const fullId = docsMatch[1];
		const componentId = fullId.split('--')[0];
		return { componentId: componentId || '' };
	}

	const storyMatch = url.match(/\/story\/([^?]+)/);
	if (storyMatch) {
		const fullId = storyMatch[1];
		const componentId = fullId.split('--')[0];
		return { componentId: componentId || '' };
	}

	// Si no hay match, intentar extraer de query params
	const pathMatch = url.match(/[?&]path=([^&]+)/);
	if (pathMatch) {
		const path = decodeURIComponent(pathMatch[1]);
		const docsMatch2 = path.match(/\/docs\/([^?]+)/);
		if (docsMatch2) {
			const fullId = docsMatch2[1];
			const componentId = fullId.split('--')[0];
			return { componentId: componentId || '' };
		}

		const storyMatch2 = path.match(/\/story\/([^?]+)/);
		if (storyMatch2) {
			const fullId = storyMatch2[1];
			const componentId = fullId.split('--')[0];
			return { componentId: componentId || '' };
		}
	}

	return { componentId: '' };
}
