/**
 * Pre-Implementation Verification
 *
 * ⭐ MEJORA 5: Sistema de verificación pre-implementación obligatorio
 * Verifica que el código está listo para implementar
 * BLOQUEA la implementación si falla cualquier verificación crítica
 */

import { validateCSSClassesSimple } from './cssClassValidator.js';
import { getSourceCode } from './storybookExactCodeExtractor.js';

export interface CheckResult {
	name: string;
	passed: boolean;
	error?: string;
	warnings?: string[];
	suggestions?: string[];
}

export interface VerificationResult {
	valid: boolean;
	errors: string[];
	warnings: string[];
	suggestions: string[];
	allChecks: CheckResult[];
}

/**
 * Verifica que el código está listo para implementar
 * BLOQUEA la implementación si falla cualquier verificación crítica
 */
export async function verifyBeforeImplementation(
	componentId: string,
	html: string,
	storyName: string = 'default',
): Promise<VerificationResult> {
	console.log(`🔍 [Pre-Implementation Verification] Verificando código para: ${componentId}`);

	const checks: CheckResult[] = [];

	// CHECK 1: Clases CSS válidas
	console.log(`   [1/5] Validando clases CSS...`);
	const cssCheck = await validateCSSClassesSimple(html, componentId);
	checks.push({
		name: 'Clases CSS válidas',
		passed: cssCheck.valid,
		error: cssCheck.errors.join(', '),
		suggestions: cssCheck.suggestions,
	});

	// CHECK 2: Estructura HTML correcta
	console.log(`   [2/5] Validando estructura HTML...`);
	const structureCheck = await validateHTMLStructure(html, componentId);
	checks.push({
		name: 'Estructura HTML correcta',
		passed: structureCheck.valid,
		error: structureCheck.errors.join(', '),
		warnings: structureCheck.warnings,
	});

	// CHECK 3: Elementos requeridos presentes
	console.log(`   [3/5] Validando elementos requeridos...`);
	const requiredElementsCheck = await validateRequiredElements(html, componentId);
	checks.push({
		name: 'Elementos requeridos presentes',
		passed: requiredElementsCheck.valid,
		error: requiredElementsCheck.errors.join(', '),
	});

	// CHECK 4: Accesibilidad básica
	console.log(`   [4/5] Validando accesibilidad básica...`);
	const a11yCheck = await validateAccessibility(html, componentId);
	checks.push({
		name: 'Accesibilidad básica',
		passed: a11yCheck.valid,
		warnings: a11yCheck.warnings,
	});

	// CHECK 5: Comparar con código fuente
	console.log(`   [5/5] Comparando con código fuente...`);
	const sourceCheck = await validateAgainstSourceCode(html, componentId);
	checks.push({
		name: 'Coincide con código fuente',
		passed: sourceCheck.valid,
		warnings: sourceCheck.warnings,
	});

	// Identificar verificaciones críticas
	const criticalChecks = checks.filter(
		(c) =>
			c.name === 'Clases CSS válidas' ||
			c.name === 'Estructura HTML correcta' ||
			c.name === 'Elementos requeridos presentes',
	);

	const criticalFailures = criticalChecks.filter((c) => !c.passed);

	const result: VerificationResult = {
		valid: criticalFailures.length === 0,
		errors: criticalFailures.map((c) => `${c.name}: ${c.error || 'Fallo'}`),
		warnings: checks.filter((c) => c.warnings && c.warnings.length > 0).flatMap((c) => c.warnings!),
		suggestions: checks
			.filter((c) => c.suggestions && c.suggestions.length > 0)
			.flatMap((c) => c.suggestions!),
		allChecks: checks,
	};

	if (result.valid) {
		console.log(`✅ [Pre-Implementation Verification] Todas las verificaciones críticas pasaron`);
	} else {
		console.error(
			`❌ [Pre-Implementation Verification] ${criticalFailures.length} verificación(es) crítica(s) fallaron`,
		);
	}

	return result;
}

/**
 * Valida estructura HTML básica
 */
async function validateHTMLStructure(
	html: string,
	componentId: string,
): Promise<{ valid: boolean; errors: string[]; warnings: string[] }> {
	const errors: string[] = [];
	const warnings: string[] = [];

	// Verificar que hay elementos HTML válidos
	if (!html.includes('<') || !html.includes('>')) {
		errors.push('No se encontraron elementos HTML válidos');
		return { valid: false, errors, warnings };
	}

	// Verificar que hay clases del componente
	const componentPrefix = getComponentPrefix(componentId);
	const hasComponentClasses = html.includes(componentPrefix);

	if (!hasComponentClasses) {
		warnings.push(`No se encontraron clases del componente (${componentPrefix})`);
	}

	// Verificar estructura básica (abrir/cerrar tags)
	const openTags = (html.match(/<[^/][^>]*>/g) || []).length;
	const closeTags = (html.match(/<\/[^>]+>/g) || []).length;

	if (Math.abs(openTags - closeTags) > 2) {
		warnings.push(`Posible desbalance de tags: ${openTags} abiertos, ${closeTags} cerrados`);
	}

	return {
		valid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Valida que los elementos requeridos estén presentes
 */
async function validateRequiredElements(
	html: string,
	componentId: string,
): Promise<{ valid: boolean; errors: string[] }> {
	const errors: string[] = [];

	// Obtener elementos requeridos según el componente
	const requiredElements = getRequiredElementsForComponent(componentId);

	for (const element of requiredElements) {
		if (element.type === 'class') {
			if (!html.includes(element.value)) {
				errors.push(`Clase requerida faltante: ${element.value}`);
			}
		} else if (element.type === 'tag') {
			const tagRegex = new RegExp(`<${element.value}[^>]*>`, 'i');
			if (!tagRegex.test(html)) {
				errors.push(`Elemento requerido faltante: <${element.value}>`);
			}
		}
	}

	return {
		valid: errors.length === 0,
		errors,
	};
}

/**
 * Valida accesibilidad básica
 */
async function validateAccessibility(
	html: string,
	componentId: string,
): Promise<{ valid: boolean; warnings: string[] }> {
	const warnings: string[] = [];

	// Verificar roles ARIA en componentes interactivos
	const interactiveComponents = ['button', 'modal', 'drawer', 'select'];
	const isInteractive = interactiveComponents.some((comp) =>
		componentId.toLowerCase().includes(comp),
	);

	if (isInteractive) {
		// Verificar que hay roles ARIA
		if (!html.includes('role=') && !html.includes('aria-')) {
			warnings.push('Componente interactivo sin roles ARIA');
		}

		// Verificar que hay labels
		if (!html.includes('aria-label') && !html.includes('<label')) {
			warnings.push('Componente interactivo sin etiquetas accesibles');
		}
	}

	return {
		valid: true, // No bloquea, solo advierte
		warnings,
	};
}

/**
 * Compara con código fuente
 */
async function validateAgainstSourceCode(
	html: string,
	componentId: string,
): Promise<{ valid: boolean; warnings: string[] }> {
	const warnings: string[] = [];

	try {
		const sourceCode = await getSourceCode(componentId);
		if (!sourceCode) {
			warnings.push('No se encontró código fuente para comparar');
			return { valid: true, warnings };
		}

		// Extraer clases del código fuente
		const sourceClasses = extractClassesFromSource(sourceCode);
		const htmlClasses = extractClassesFromHTML(html);

		// Verificar que las clases principales están en el código fuente
		const componentPrefix = getComponentPrefix(componentId);
		const htmlComponentClasses = htmlClasses.filter((cls) => cls.startsWith(componentPrefix));

		const missingInSource = htmlComponentClasses.filter((cls) => !sourceClasses.includes(cls));

		if (missingInSource.length > 0) {
			warnings.push(`Clases no encontradas en código fuente: ${missingInSource.join(', ')}`);
		}
	} catch (error: any) {
		warnings.push(`Error comparando con código fuente: ${error.message}`);
	}

	return { valid: true, warnings };
}

/**
 * Obtiene prefijo del componente
 */
function getComponentPrefix(componentId: string): string {
	const normalized = componentId
		.replace(/^[🧩⚙️]/g, '')
		.replace(/^functional-/, '')
		.replace(/^ux-/, '')
		.toLowerCase();

	const specialMappings: Record<string, string> = {
		radio: 'ubits-radio-button',
		'radio-button': 'ubits-radio-button',
		drawer: 'ubits-drawer',
		button: 'ubits-button',
		input: 'ubits-input',
		modal: 'ubits-modal',
		select: 'ubits-select',
		checkbox: 'ubits-checkbox',
	};

	return specialMappings[normalized] || `ubits-${normalized}`;
}

/**
 * Obtiene elementos requeridos para un componente
 */
function getRequiredElementsForComponent(componentId: string): Array<{
	type: 'class' | 'tag';
	value: string;
}> {
	const normalized = componentId.toLowerCase();

	const requiredElements: Record<string, Array<{ type: 'class' | 'tag'; value: string }>> = {
		drawer: [
			{ type: 'class', value: 'ubits-drawer' },
			{ type: 'class', value: 'ubits-drawer__header' },
			{ type: 'class', value: 'ubits-drawer__body' },
			{ type: 'class', value: 'ubits-drawer__footer' },
		],
		'radio-button': [
			{ type: 'class', value: 'ubits-radio-button' },
			{ type: 'class', value: 'ubits-radio-button__input' },
			{ type: 'class', value: 'ubits-radio-button__circle' },
		],
		modal: [
			{ type: 'class', value: 'ubits-modal' },
			{ type: 'class', value: 'ubits-modal__overlay' },
			{ type: 'class', value: 'ubits-modal__content' },
		],
	};

	return requiredElements[normalized] || [];
}

/**
 * Extrae clases del código fuente
 */
function extractClassesFromSource(sourceCode: string): string[] {
	const classes: string[] = [];
	const classRegex = /['"](ubits-[^'"]+)['"]/g;
	let match;
	while ((match = classRegex.exec(sourceCode)) !== null) {
		classes.push(match[1]);
	}
	return [...new Set(classes)];
}

/**
 * Extrae clases del HTML
 */
function extractClassesFromHTML(html: string): string[] {
	const classes: string[] = [];
	const classRegex = /class=["']([^"']+)["']/g;
	let match;
	while ((match = classRegex.exec(html)) !== null) {
		const classList = match[1].split(/\s+/).filter(Boolean);
		classes.push(...classList);
	}
	return [...new Set(classes)];
}
