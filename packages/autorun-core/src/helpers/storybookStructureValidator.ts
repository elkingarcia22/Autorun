/**
 * Storybook Structure Validator
 *
 * Valida estructura de implementación antes de escribir
 * Detecta errores como usar data-open en lugar de ubits-modal-overlay--open
 */

import { getStorybookInfoCached, StorybookInfo } from './storybookCache';
import { consultStorybookCompleto } from './storybookParallelConsult';
import { getSourceCode } from './storybookExactCodeExtractor.js';

export interface StructureValidationResult {
	valid: boolean;
	errors: string[];
	warnings: string[];
	differences: string[];
}

/**
 * Valida estructura antes de escribir código
 *
 * @param componentId - ID del componente
 * @param generatedCode - Código generado que se va a escribir
 * @param componentName - Nombre del componente (opcional)
 * @returns Resultado de validación
 */
export async function validateStructureBeforeWrite(
	componentId: string,
	generatedCode: string,
	componentName?: string,
): Promise<StructureValidationResult> {
	console.log(`\n🔍 [Structure Validator] Validando estructura antes de escribir: ${componentId}`);

	const errors: string[] = [];
	const warnings: string[] = [];
	const differences: string[] = [];

	try {
		// 1. Obtener información de Storybook (usar caché si está disponible)
		let storybookInfo: StorybookInfo | null = null;

		const cached = await getStorybookInfoCached(componentId);
		if (cached) {
			storybookInfo = cached;
			console.log(`✅ [Structure Validator] Usando información en caché`);
		} else {
			console.log(`📚 [Structure Validator] Consultando Storybook (no hay caché)...`);
			const consultResult = await consultStorybookCompleto(componentId, componentName);
			if (consultResult.success) {
				storybookInfo = consultResult.info;
			} else {
				errors.push(
					`No se pudo obtener información de Storybook: ${consultResult.errors.join(', ')}`,
				);
				return {
					valid: false,
					errors,
					warnings: [...warnings, ...consultResult.warnings],
					differences,
				};
			}
		}

		if (!storybookInfo) {
			errors.push('No se pudo obtener información de Storybook');
			return {
				valid: false,
				errors,
				warnings,
				differences,
			};
		}

		// 2. Validar estructura HTML
		if (storybookInfo.exactCode?.structure) {
			const structureValidation = validateStructure(
				storybookInfo.exactCode.structure,
				generatedCode,
			);
			errors.push(...structureValidation.errors);
			warnings.push(...structureValidation.warnings);
			differences.push(...structureValidation.differences);
		}

		// 3. Validar métodos de interacción (crítico para modales)
		if (storybookInfo.interactionInfo) {
			const interactionValidation = validateInteraction(
				storybookInfo.interactionInfo,
				generatedCode,
				componentId,
			);
			errors.push(...interactionValidation.errors);
			warnings.push(...interactionValidation.warnings);
			differences.push(...interactionValidation.differences);
		}

		// 4. Comparar con código fuente real
		try {
			const sourceCode = await getSourceCode(componentId);
			if (sourceCode) {
				const sourceComparison = compareWithSourceCode(sourceCode, generatedCode, componentId);
				errors.push(...sourceComparison.errors);
				warnings.push(...sourceComparison.warnings);
				differences.push(...sourceComparison.differences);
			} else {
				warnings.push(`No se pudo obtener código fuente para comparación`);
			}
		} catch (error: any) {
			warnings.push(`No se pudo comparar con código fuente: ${error.message}`);
		}

		// 5. Validaciones específicas por componente
		if (componentId.includes('modal') || componentId === 'modal') {
			const modalValidation = validateModalSpecific(generatedCode);
			errors.push(...modalValidation.errors);
			warnings.push(...modalValidation.warnings);
		}

		const valid = errors.length === 0;

		if (valid) {
			console.log(`✅ [Structure Validator] Validación pasó: estructura correcta`);
		} else {
			console.error(
				`❌ [Structure Validator] Validación falló: ${errors.length} error(es) encontrado(s)`,
			);
			errors.forEach((error) => {
				console.error(`   ❌ ${error}`);
			});
		}

		if (warnings.length > 0) {
			console.warn(`⚠️ [Structure Validator] ${warnings.length} advertencia(s) encontrada(s)`);
			warnings.forEach((warning) => {
				console.warn(`   ⚠️ ${warning}`);
			});
		}

		return {
			valid,
			errors,
			warnings,
			differences,
		};
	} catch (error: any) {
		console.error(`❌ [Structure Validator] Error crítico: ${error.message}`);
		return {
			valid: false,
			errors: [error.message],
			warnings,
			differences,
		};
	}
}

/**
 * Valida estructura HTML
 */
function validateStructure(structure: any, generatedCode: string): StructureValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];
	const differences: string[] = [];

	// Validar clases requeridas
	if (structure.requiredClasses) {
		for (const requiredClass of structure.requiredClasses) {
			if (!generatedCode.includes(requiredClass)) {
				errors.push(`❌ Falta clase requerida: ${requiredClass}`);
			}
		}
	}

	// Validar elementos requeridos
	if (structure.requiredElements) {
		for (const requiredElement of structure.requiredElements) {
			if (!generatedCode.includes(requiredElement)) {
				errors.push(`❌ Falta elemento requerido: ${requiredElement}`);
			}
		}
	}

	return { valid: errors.length === 0, errors, warnings, differences };
}

/**
 * Valida métodos de interacción
 */
function validateInteraction(
	interactionInfo: any,
	generatedCode: string,
	componentId: string,
): StructureValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];
	const differences: string[] = [];

	// Validar método de apertura
	if (interactionInfo.openMethod) {
		const expectedMethod = interactionInfo.openMethod;

		// Para modales: validar que NO se use data-open
		if (componentId.includes('modal') || componentId === 'modal') {
			if (
				generatedCode.includes('data-open') ||
				generatedCode.includes('setAttribute("data-open"')
			) {
				errors.push(`❌ Modal NO debe usar 'data-open'. Debe usar: ${expectedMethod}`);
			}

			// Validar que se use la clase correcta
			if (
				!generatedCode.includes('ubits-modal-overlay--open') &&
				!generatedCode.includes('classList.add') &&
				!generatedCode.includes(expectedMethod)
			) {
				errors.push(`❌ Modal debe usar '${expectedMethod}' para abrir, NO 'data-open'`);
			}
		}
	}

	// Validar método de cierre
	if (interactionInfo.closeMethod) {
		const expectedMethod = interactionInfo.closeMethod;
		if (!generatedCode.includes(expectedMethod) && !generatedCode.includes('classList.remove')) {
			warnings.push(`⚠️ Método de cierre puede no coincidir con el esperado: ${expectedMethod}`);
		}
	}

	// Validar warnings de interacción
	if (interactionInfo.warnings) {
		warnings.push(...interactionInfo.warnings);
	}

	return { valid: errors.length === 0, errors, warnings, differences };
}

/**
 * Compara con código fuente real
 */
function compareWithSourceCode(
	sourceCode: string,
	generatedCode: string,
	componentId: string,
): StructureValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];
	const differences: string[] = [];

	// Para modales: validar estructura específica
	if (componentId.includes('modal') || componentId === 'modal') {
		// Validar contenedor principal
		if (
			sourceCode.includes('ubits-modal-overlay') &&
			!generatedCode.includes('ubits-modal-overlay')
		) {
			errors.push(`❌ Contenedor principal incorrecto. Debe usar 'ubits-modal-overlay'`);
		}

		// Validar clase de apertura
		if (
			sourceCode.includes('ubits-modal-overlay--open') &&
			!generatedCode.includes('ubits-modal-overlay--open')
		) {
			errors.push(
				`❌ Clase de apertura incorrecta. Debe usar 'ubits-modal-overlay--open', NO 'data-open'`,
			);
		}

		// Validar que NO se use data-open
		if (generatedCode.includes('data-open') && !sourceCode.includes('data-open')) {
			errors.push(
				`❌ NO se debe usar 'data-open'. El código fuente usa 'ubits-modal-overlay--open'`,
			);
		}
	}

	return { valid: errors.length === 0, errors, warnings, differences };
}

/**
 * Validaciones específicas para modales
 */
function validateModalSpecific(generatedCode: string): StructureValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];
	const differences: string[] = [];

	// ❌ ERROR CRÍTICO: No usar data-open
	if (
		generatedCode.includes('data-open') ||
		generatedCode.includes('setAttribute("data-open"') ||
		generatedCode.includes("setAttribute('data-open'")
	) {
		errors.push(
			`❌ ERROR CRÍTICO: Modal NO debe usar 'data-open'. Debe usar clase 'ubits-modal-overlay--open'`,
		);
		errors.push(
			`   💡 Solución: Usar 'overlay.classList.add("ubits-modal-overlay--open")' en lugar de 'setAttribute("data-open", "true")'`,
		);
	}

	// ✅ Validar que se use la clase correcta
	if (
		!generatedCode.includes('ubits-modal-overlay--open') &&
		!generatedCode.includes('classList.add')
	) {
		errors.push(`❌ Modal debe usar 'ubits-modal-overlay--open' para abrir`);
	}

	// ✅ Validar que se use ubits-modal-overlay como contenedor
	if (!generatedCode.includes('ubits-modal-overlay')) {
		errors.push(`❌ Modal debe usar 'ubits-modal-overlay' como contenedor principal`);
	}

	// ⚠️ Advertencia: validar overflow del body
	if (
		generatedCode.includes('ubits-modal-overlay--open') &&
		!generatedCode.includes('document.body.style.overflow')
	) {
		warnings.push(
			`⚠️ Considerar agregar 'document.body.style.overflow = 'hidden'' al abrir el modal`,
		);
	}

	return { valid: errors.length === 0, errors, warnings, differences };
}
