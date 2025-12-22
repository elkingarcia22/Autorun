/**
 * Verify Before Implementation
 *
 * ⭐ MEJORA 5: Sistema de verificación pre-implementación obligatorio
 * Realiza múltiples verificaciones antes de permitir la implementación
 */

import { validateCSSClassesSimple } from './cssClassValidator';
import { getSourceCode } from './storybookExactCodeExtractor';

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
	console.log(`🔍 [Verify Before Implementation] Verificando código para: ${componentId}`);

	const checks: CheckResult[] = [];

	// CHECK 1: Clases CSS válidas
	console.log(`   [1/5] Validando clases CSS...`);
	try {
		const cssCheck = await validateCSSClassesSimple(html, componentId);
		checks.push({
			name: 'Clases CSS válidas',
			passed: cssCheck.valid,
			error: cssCheck.errors.join(', '),
			suggestions: cssCheck.suggestions,
		});
	} catch (error: any) {
		checks.push({
			name: 'Clases CSS válidas',
			passed: false,
			error: `Error validando clases CSS: ${error.message}`,
		});
	}

	// CHECK 2: Estructura HTML correcta
	console.log(`   [2/5] Validando estructura HTML...`);
	try {
		const structureCheck = await validateHTMLStructure(html, componentId);
		checks.push({
			name: 'Estructura HTML correcta',
			passed: structureCheck.valid,
			error: structureCheck.errors.join(', '),
			warnings: structureCheck.warnings,
		});
	} catch (error: any) {
		checks.push({
			name: 'Estructura HTML correcta',
			passed: false,
			error: `Error validando estructura: ${error.message}`,
		});
	}

	// CHECK 3: Elementos requeridos presentes
	console.log(`   [3/5] Validando elementos requeridos...`);
	try {
		const requiredElementsCheck = await validateRequiredElements(html, componentId);
		checks.push({
			name: 'Elementos requeridos presentes',
			passed: requiredElementsCheck.valid,
			error: requiredElementsCheck.errors.join(', '),
		});
	} catch (error: any) {
		checks.push({
			name: 'Elementos requeridos presentes',
			passed: false,
			error: `Error validando elementos requeridos: ${error.message}`,
		});
	}

	// CHECK 4: Accesibilidad básica
	console.log(`   [4/5] Validando accesibilidad básica...`);
	try {
		const a11yCheck = await validateAccessibility(html, componentId);
		checks.push({
			name: 'Accesibilidad básica',
			passed: a11yCheck.valid,
			warnings: a11yCheck.warnings,
		});
	} catch (error: any) {
		checks.push({
			name: 'Accesibilidad básica',
			passed: true, // No bloquear por errores de accesibilidad
			warnings: [`Error validando accesibilidad: ${error.message}`],
		});
	}

	// CHECK 5: Comparar con código fuente
	console.log(`   [5/5] Comparando con código fuente...`);
	try {
		const sourceCheck = await validateAgainstSourceCode(html, componentId);
		checks.push({
			name: 'Coincide con código fuente',
			passed: sourceCheck.valid,
			warnings: sourceCheck.warnings,
		});
	} catch (error: any) {
		checks.push({
			name: 'Coincide con código fuente',
			passed: true, // No bloquear si no hay código fuente
			warnings: [`No se pudo comparar con código fuente: ${error.message}`],
		});
	}

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
		errors: criticalFailures.map((c) => `${c.name}: ${c.error || 'Error desconocido'}`),
		warnings: checks.filter((c) => c.warnings && c.warnings.length > 0).flatMap((c) => c.warnings!),
		suggestions: checks
			.filter((c) => c.suggestions && c.suggestions.length > 0)
			.flatMap((c) => c.suggestions!),
		allChecks: checks,
	};

	if (result.valid) {
		console.log(`✅ [Verify Before Implementation] Todas las verificaciones críticas pasaron`);
	} else {
		console.error(
			`❌ [Verify Before Implementation] ${criticalFailures.length} verificación(es) crítica(s) falló(aron)`,
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

	// Verificar que el HTML no esté vacío
	if (!html || html.trim().length === 0) {
		errors.push('HTML está vacío');
		return { valid: false, errors, warnings };
	}

	// Verificar que tenga elementos HTML válidos
	const hasElements = /<[a-z][a-z0-9]*[^>]*>/i.test(html);
	if (!hasElements) {
		errors.push('No se encontraron elementos HTML válidos');
		return { valid: false, errors, warnings };
	}

	// Verificar que tenga clases del componente
	const componentPrefix = getComponentPrefix(componentId);
	const hasComponentClasses = new RegExp(`class="[^"]*${componentPrefix}`).test(html);
	if (!hasComponentClasses) {
		warnings.push(`No se encontraron clases del componente (${componentPrefix})`);
	}

	return { valid: errors.length === 0, errors, warnings };
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
			const regex = new RegExp(`class="[^"]*${element.value}`);
			if (!regex.test(html)) {
				errors.push(`Falta elemento requerido: clase "${element.value}"`);
			}
		} else if (element.type === 'element') {
			const regex = new RegExp(`<${element.value}[^>]*>`, 'i');
			if (!regex.test(html)) {
				errors.push(`Falta elemento requerido: <${element.value}>`);
			}
		} else if (element.type === 'structure') {
			// Validar estructura específica (ej: drawer debe tener header, body, footer)
			const structureRegex = new RegExp(element.value, 'i');
			if (!structureRegex.test(html)) {
				errors.push(`Falta estructura requerida: ${element.description || element.value}`);
			}
		}
	}

	return { valid: errors.length === 0, errors };
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
	if (
		componentId.includes('button') ||
		componentId.includes('modal') ||
		componentId.includes('drawer')
	) {
		// Verificar que los botones tengan aria-label o texto
		const buttons = html.match(/<button[^>]*>/gi) || [];
		buttons.forEach((button, index) => {
			const hasAriaLabel = /aria-label="[^"]+"/i.test(button);
			const hasText = />[^<]+</.test(html.substring(html.indexOf(button) + button.length));
			if (!hasAriaLabel && !hasText) {
				warnings.push(`Botón ${index + 1} sin aria-label ni texto visible`);
			}
		});

		// Verificar modales/drawers tienen aria-modal
		if (componentId.includes('modal') || componentId.includes('drawer')) {
			const hasAriaModal = /aria-modal="true"/i.test(html);
			if (!hasAriaModal) {
				warnings.push('Modal/Drawer debería tener aria-modal="true"');
			}
		}
	}

	return { valid: true, warnings };
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
		const sourceClasses = extractClassesFromSource(sourceCode, componentId);
		const htmlClasses = extractClassesFromHTML(html, componentId);

		// Verificar que las clases usadas existan en el código fuente
		const missingClasses = htmlClasses.filter((cls) => !sourceClasses.includes(cls));
		if (missingClasses.length > 0) {
			warnings.push(`Clases usadas no encontradas en código fuente: ${missingClasses.join(', ')}`);
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

	if (specialMappings[normalized]) {
		return specialMappings[normalized];
	}

	return `ubits-${normalized}`;
}

/**
 * Obtiene elementos requeridos para un componente
 */
function getRequiredElementsForComponent(componentId: string): Array<{
	type: 'class' | 'element' | 'structure';
	value: string;
	description?: string;
}> {
	const normalized = componentId
		.replace(/^[🧩⚙️]/g, '')
		.replace(/^functional-/, '')
		.replace(/^ux-/, '')
		.toLowerCase();

	const requirements: Record<
		string,
		Array<{
			type: 'class' | 'element' | 'structure';
			value: string;
			description?: string;
		}>
	> = {
		drawer: [
			{ type: 'class', value: 'ubits-drawer' },
			{ type: 'class', value: 'ubits-drawer__header' },
			{ type: 'class', value: 'ubits-drawer__body' },
			{ type: 'class', value: 'ubits-drawer__footer' },
			{
				type: 'structure',
				value: 'ubits-drawer__header-text',
				description: 'Header debe tener header-text',
			},
			{
				type: 'structure',
				value: 'ubits-drawer__scrollbar',
				description: 'Body debe tener scrollbar',
			},
		],
		'radio-button': [
			{ type: 'class', value: 'ubits-radio-button' },
			{ type: 'class', value: 'ubits-radio-button__input' },
			{ type: 'class', value: 'ubits-radio-button__circle' },
			{ type: 'class', value: 'ubits-radio-button__text-content' },
		],
		modal: [
			{ type: 'class', value: 'ubits-modal' },
			{ type: 'class', value: 'ubits-modal__header' },
			{ type: 'class', value: 'ubits-modal__body' },
			{ type: 'class', value: 'ubits-modal__footer' },
		],
		button: [
			{ type: 'class', value: 'ubits-button' },
			{ type: 'element', value: 'button' },
		],
	};

	return requirements[normalized] || [];
}

/**
 * Extrae clases del código fuente
 */
function extractClassesFromSource(sourceCode: string, componentId: string): string[] {
	const classes = new Set<string>();
	const prefix = getComponentPrefix(componentId);

	// Buscar clases en el código fuente
	const classRegex = new RegExp(`['"\`](${prefix}[^'"\`]+)['"\`]`, 'g');
	const matches = Array.from(sourceCode.matchAll(classRegex));
	matches.forEach((match) => {
		classes.add(match[1]);
	});

	return Array.from(classes);
}

/**
 * Extrae clases del HTML
 */
function extractClassesFromHTML(html: string, componentId: string): string[] {
	const classes = new Set<string>();
	const prefix = getComponentPrefix(componentId);

	const classRegex = /class="([^"]+)"/g;
	const matches = Array.from(html.matchAll(classRegex));
	matches.forEach((match) => {
		const classList = match[1].split(/\s+/).filter(Boolean);
		classList.forEach((cls) => {
			if (cls.startsWith(prefix)) {
				classes.add(cls);
			}
		});
	});

	return Array.from(classes);
}
