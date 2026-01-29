/**
 * Storybook Code Generator
 *
 * Genera código de implementación completo combinando:
 * - Estructura HTML desde Storybook
 * - Props desde Storybook
 * - Ejemplos de código desde Storybook
 */

import { parseCodeFromStory } from './storybookCodeParser';
import { parsePropsFromComponent, StorybookPropsTable } from './storybookPropsParser';
import { getStorybookUrlWithFallback } from './storybookFallback';
import { extractAPIFromStorybook } from './storybookAPIExtractor';
import { extractCompositionFromStorybook } from './storybookCompositionExtractor';
import { extractBestPracticesFromStorybook } from './storybookBestPracticesExtractor';

export interface ImplementationCode {
	html: string;
	javascript?: string;
	css?: string;
	imports?: string[];
	complete: string; // Código completo listo para usar
	props: Record<string, any>; // Props usadas en el código
	// ⭐ NUEVO: Información adicional
	setup?: string; // Código de setup requerido
	api?: any; // API del componente
	dependencies?: string[]; // Dependencias necesarias
}

export interface CodeGenerationOptions {
	componentId: string;
	storyName?: string;
	customProps?: Record<string, any>;
	useCase?: string;
	format?: 'html' | 'jsx' | 'vanilla';
	includeImports?: boolean;
}

/**
 * Genera código de implementación completo desde Storybook
 *
 * @param options - Opciones de generación
 * @returns Código de implementación completo
 */
export async function generateImplementationCode(
	options: CodeGenerationOptions,
): Promise<ImplementationCode> {
	console.log(`🚀 [Storybook Code Generator] Generando código para: ${options.componentId}`);

	try {
		// ⭐ NUEVO: Obtener TODA la información en paralelo
		const [codeData, propsData, api, composition, bestPractices] = await Promise.all([
			// 1. Obtener código desde Storybook
			parseCodeFromStory(options.componentId, options.storyName || 'default'),
			// 2. Obtener props desde Storybook
			parsePropsFromComponent(options.componentId, true),
			// 3. ⭐ NUEVO: Obtener API
			extractAPIFromStorybook(options.componentId).catch(() => null),
			// 4. ⭐ NUEVO: Obtener composición
			extractCompositionFromStorybook(options.componentId).catch(() => null),
			// 5. ⭐ NUEVO: Obtener best practices
			extractBestPracticesFromStorybook(options.componentId).catch(() => null),
		]);

		// 3. Combinar código con props
		const combinedCode = combineCodeWithProps(
			codeData.primaryCode || codeData.codeBlocks[0]?.code || '',
			propsData.props,
			options.customProps || {},
		);

		// 4. ⭐ NUEVO: Incluir setup si es necesario
		let setupCode = '';
		if (composition?.setup?.required && composition.setup.code) {
			setupCode = composition.setup.code;
		} else if (api?.setup?.required && api.setup.code) {
			setupCode = api.setup.code;
		}

		// 5. ⭐ NUEVO: Combinar imports con dependencias
		const allImportsSet = new Set(codeData.allImports);
		if (composition?.dependencies) {
			composition.dependencies.forEach((dep) => {
				if (dep.importPath) {
					allImportsSet.add(dep.importPath);
				}
			});
		}
		const allImports = Array.from(allImportsSet);

		// 6. Generar código completo según formato
		const complete = formatCode(
			combinedCode,
			options.format || 'html',
			allImports,
			options.includeImports !== false,
			setupCode, // ⭐ NUEVO: Incluir setup
		);

		// 7. Extraer JavaScript y CSS si están disponibles
		const { javascript, css } = extractScriptsAndStyles(combinedCode);

		// 8. Extraer props usadas en el código
		const usedProps = extractUsedProps(combinedCode, propsData.props);

		console.log(
			`✅ [Storybook Code Generator] Código generado exitosamente (${complete.length} caracteres)`,
		);

		return {
			html: combinedCode,
			javascript,
			css,
			imports: codeData.allImports,
			complete,
			props: usedProps,
		};
	} catch (error: any) {
		console.error(`❌ [Storybook Code Generator] Error generando código:`, error.message);
		throw new Error(`No se pudo generar código para ${options.componentId}: ${error.message}`);
	}
}

/**
 * Combina código HTML con props
 */
function combineCodeWithProps(
	code: string,
	props: StorybookPropsTable[],
	customProps: Record<string, any>,
): string {
	let combined = code;

	// Crear objeto de props con valores por defecto y custom
	const propsValues: Record<string, any> = {};

	// Primero, usar valores por defecto de props
	for (const prop of props) {
		if (prop.defaultValue && prop.defaultValue !== '-') {
			propsValues[prop.name] = parseDefaultValue(prop.defaultValue, prop.type);
		}
	}

	// Luego, sobrescribir con props custom
	Object.assign(propsValues, customProps);

	// Reemplazar placeholders en el código
	// Patrón 1: {propName} o ${propName}
	for (const [propName, propValue] of Object.entries(propsValues)) {
		const patterns = [
			new RegExp(`\\{${propName}\\}`, 'g'),
			new RegExp(`\\$\\{${propName}\\}`, 'g'),
			new RegExp(`\\[${propName}\\]`, 'g'),
		];

		for (const pattern of patterns) {
			combined = combined.replace(pattern, formatPropValue(propValue));
		}
	}

	// Reemplazar atributos en elementos HTML
	// Patrón 2: prop-name="..." o propName="..."
	for (const [propName, propValue] of Object.entries(propsValues)) {
		const kebabName = camelToKebab(propName);
		const camelName = propName;

		// Buscar atributos con valores vacíos o placeholders
		const attrPatterns = [
			new RegExp(
				`(${kebabName}|${camelName})=["'](?:\\{\\{.*?\\}\\}|\\$\\{.*?\\}|placeholder|value)["']`,
				'gi',
			),
		];

		for (const pattern of attrPatterns) {
			combined = combined.replace(pattern, `$1="${formatPropValue(propValue)}"`);
		}
	}

	return combined;
}

/**
 * Parsea valor por defecto según tipo
 */
function parseDefaultValue(defaultValue: string, type: string): string | number | boolean {
	const cleaned = defaultValue.trim();

	if (type === 'boolean') {
		return cleaned === 'true' || cleaned === '1';
	}

	if (type === 'number') {
		const num = parseFloat(cleaned);
		return isNaN(num) ? 0 : num;
	}

	// Si está entre comillas, removerlas
	if (
		(cleaned.startsWith('"') && cleaned.endsWith('"')) ||
		(cleaned.startsWith("'") && cleaned.endsWith("'"))
	) {
		return cleaned.slice(1, -1);
	}

	return cleaned;
}

/**
 * Formatea valor de prop para usar en código
 */
function formatPropValue(value: any): string {
	if (typeof value === 'boolean') {
		return value ? 'true' : 'false';
	}

	if (typeof value === 'number') {
		return value.toString();
	}

	if (typeof value === 'string') {
		// Si ya tiene comillas, retornar tal cual
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			return value;
		}
		return `"${value}"`;
	}

	if (Array.isArray(value)) {
		return `[${value.map((v) => formatPropValue(v)).join(', ')}]`;
	}

	if (typeof value === 'object' && value !== null) {
		return JSON.stringify(value);
	}

	return String(value);
}

/**
 * Convierte camelCase a kebab-case
 */
function camelToKebab(str: string): string {
	return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Formatea código según el formato especificado
 */
function formatCode(
	code: string,
	format: 'html' | 'jsx' | 'vanilla',
	imports: string[],
	includeImports: boolean,
	setup?: string,
): string {
	let formatted = code;

	// ⭐ NUEVO: Agregar setup si es necesario (al inicio)
	if (setup && format !== 'html') {
		formatted = `${setup}\n\n${formatted}`;
	}

	// Agregar imports si es necesario
	if (includeImports && imports.length > 0 && format !== 'html') {
		const importsSection = imports
			.map((imp) => {
				// Extraer nombre del módulo desde el import
				const moduleMatch = imp.match(/([^/]+)$/);
				const moduleName = moduleMatch ? moduleMatch[1] : 'component';
				return `import { ${moduleName} } from "${imp}";`;
			})
			.join('\n');

		formatted = `${importsSection}\n\n${formatted}`;
	}

	// Formatear según tipo
	if (format === 'jsx') {
		// Asegurar que es JSX válido
		formatted = ensureJSXFormat(formatted);
	} else if (format === 'vanilla') {
		// Convertir a JavaScript vanilla si es necesario
		formatted = convertToVanillaJS(formatted);
	}

	return formatted;
}

/**
 * Asegura formato JSX válido
 */
function ensureJSXFormat(code: string): string {
	// Si ya es JSX, retornar tal cual
	if (code.includes('import') || code.includes('export')) {
		return code;
	}

	// Si es HTML, convertir a JSX básico
	return code
		.replace(/class=/g, 'className=')
		.replace(/for=/g, 'htmlFor=')
		.replace(/<!--[\s\S]*?-->/g, '{/* $& */}');
}

/**
 * Convierte a JavaScript vanilla
 */
function convertToVanillaJS(code: string): string {
	// Si es JSX, convertir a createElement
	if (code.includes('<') && code.includes('>')) {
		// Por ahora, retornar HTML como string
		return `const html = \`${code.replace(/`/g, '\\`')}\`;`;
	}

	return code;
}

/**
 * Extrae scripts y estilos del código
 */
function extractScriptsAndStyles(code: string): {
	javascript?: string;
	css?: string;
} {
	const result: { javascript?: string; css?: string } = {};

	// Extraer <script>
	const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
	if (scriptMatch) {
		result.javascript = scriptMatch[1].trim();
	}

	// Extraer <style>
	const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
	if (styleMatch) {
		result.css = styleMatch[1].trim();
	}

	return result;
}

/**
 * Extrae props usadas en el código
 */
function extractUsedProps(
	code: string,
	availableProps: StorybookPropsTable[],
): Record<string, any> {
	const usedProps: Record<string, any> = {};

	for (const prop of availableProps) {
		const kebabName = camelToKebab(prop.name);
		const camelName = prop.name;

		// Buscar uso de la prop en el código
		const patterns = [
			new RegExp(`${kebabName}=["']([^"']+)["']`, 'i'),
			new RegExp(`${camelName}=["']([^"']+)["']`, 'i'),
			new RegExp(`\\{${prop.name}\\}`, 'i'),
			new RegExp(`\\$\\{${prop.name}\\}`, 'i'),
		];

		for (const pattern of patterns) {
			const match = code.match(pattern);
			if (match) {
				usedProps[prop.name] = match[1] || prop.defaultValue || '';
				break;
			}
		}
	}

	return usedProps;
}
