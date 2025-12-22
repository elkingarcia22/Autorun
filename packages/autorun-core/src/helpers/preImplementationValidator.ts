/**
 * Pre-Implementation Validator
 *
 * Valida que todo esté listo antes de implementar un componente
 */

import { extractExactCodeFromStorybook } from './storybookExactCodeExtractor';
import { verifyAndLoadCSS } from './cssVerifier';
import { getSourceCode } from './storybookExactCodeExtractor';
import { validateCSSClassesSimple } from './cssClassValidator';

export interface PreImplementationChecklist {
	storybookConsulted: boolean;
	codeExtracted: boolean;
	sourceCodeVerified: boolean;
	cssLoaded: boolean;
	structureMatches: boolean;
	tokensAvailable: boolean;
	visualTestPassed: boolean;
}

export interface PreImplementationValidationResult {
	valid: boolean;
	checklist: PreImplementationChecklist;
	errors: string[];
	warnings: string[];
	code?: string;
	cssUrls?: string[];
}

/**
 * Valida que todo esté listo antes de implementar
 *
 * @param componentId - ID del componente
 * @param storyName - Nombre de la historia
 * @param templatePath - Ruta al template
 * @returns Resultado de validación
 */
export async function validateBeforeImplementation(
	componentId: string,
	storyName: string = 'default',
	templatePath: string,
): Promise<PreImplementationValidationResult> {
	console.log(`🔍 [Pre-Implementation Validator] Validando implementación de: ${componentId}`);

	const checklist: PreImplementationChecklist = {
		storybookConsulted: false,
		codeExtracted: false,
		sourceCodeVerified: false,
		cssLoaded: false,
		structureMatches: false,
		tokensAvailable: false,
		visualTestPassed: false,
	};

	const errors: string[] = [];
	const warnings: string[] = [];

	try {
		// 1. Consultar Storybook y extraer código exacto (OBLIGATORIO)
		console.log(`   [1/8] Consultando Storybook y extrayendo código exacto...`);
		try {
			// ⭐ NUEVO: Usar extracción con Browser MCP (mejorada)
			const { extractExactCodeFromStorybookWithBrowser } = await import(
				'./storybookExactCodeExtractorWithBrowser'
			);
			const exactCode = await extractExactCodeFromStorybookWithBrowser(componentId, storyName);
			checklist.storybookConsulted = true;
			checklist.codeExtracted = true;
			checklist.structureMatches = exactCode.sourceCodeMatch;

			if (!exactCode.sourceCodeMatch) {
				warnings.push('Estructura no coincide exactamente con código fuente');
			}
		} catch (error: any) {
			errors.push(`Error consultando Storybook: ${error.message}`);
		}

		// 1.5. ⭐ NUEVO: Consultar MCP con fallback (Mejora 2)
		console.log(`   [1.5/8] Consultando MCP de Storybook...`);
		try {
			const { getComponentPropsWithFallback, validateStructureAgainstProps } = await import(
				'./mcpWithFallback'
			);
			const mcpResult = await getComponentPropsWithFallback(componentId);

			if (mcpResult.success && mcpResult.props) {
				// Validar estructura contra props
				const { extractExactCodeFromStorybookWithBrowser } = await import(
					'./storybookExactCodeExtractorWithBrowser'
				);
				const exactCode = await extractExactCodeFromStorybookWithBrowser(
					componentId,
					storyName,
				).catch(() => null);

				if (exactCode && exactCode.html) {
					const propsValidation = await validateStructureAgainstProps(
						exactCode.html,
						mcpResult.props,
					);
					if (!propsValidation.valid) {
						errors.push(...propsValidation.errors);
					}
					if (propsValidation.warnings.length > 0) {
						warnings.push(...propsValidation.warnings);
					}
				}
			} else if (mcpResult.fallbackUsed) {
				warnings.push(`MCP no disponible, usando fallback visual: ${mcpResult.error}`);
			} else {
				warnings.push(`No se pudieron obtener props desde MCP: ${mcpResult.error}`);
			}
		} catch (error: any) {
			warnings.push(`Error consultando MCP: ${error.message}`);
		}

		// 2. Verificar código fuente
		console.log(`   [2/8] Verificando código fuente...`);
		try {
			const sourceCode = await getSourceCode(componentId);
			if (sourceCode) {
				checklist.sourceCodeVerified = true;
			} else {
				warnings.push('No se pudo leer código fuente local');
			}
		} catch (error: any) {
			warnings.push(`Error leyendo código fuente: ${error.message}`);
		}

		// 3. Verificar y cargar CSS
		console.log(`   [3/6] Verificando CSS...`);
		try {
			const cssResult = await verifyAndLoadCSS(componentId, templatePath);
			checklist.cssLoaded = cssResult.loaded;

			if (!cssResult.loaded) {
				errors.push(`CSS no cargado: ${cssResult.missingUrls.join(', ')}`);
			}
		} catch (error: any) {
			errors.push(`Error verificando CSS: ${error.message}`);
		}

		// 3.5. ⭐ NUEVO: Validar clases CSS del código extraído
		console.log(`   [3.5/7] Validando clases CSS...`);
		try {
			// Reutilizar código ya extraído en paso 1
			const { extractExactCodeFromStorybookWithBrowser } = await import(
				'./storybookExactCodeExtractorWithBrowser'
			);
			const exactCode = await extractExactCodeFromStorybookWithBrowser(
				componentId,
				storyName,
			).catch(() => null);
			if (exactCode && exactCode.html) {
				const cssValidation = await validateCSSClassesSimple(exactCode.html, componentId);
				if (!cssValidation.valid) {
					errors.push(`Clases CSS incorrectas: ${cssValidation.errors.join(', ')}`);
					if (cssValidation.suggestions.length > 0) {
						warnings.push(`Sugerencias: ${cssValidation.suggestions.join('; ')}`);
					}
				} else {
					console.log(`   ✅ Clases CSS validadas correctamente`);
				}
			}
		} catch (error: any) {
			warnings.push(`No se pudo validar clases CSS: ${error.message}`);
		}

		// 4. Verificar tokens CSS (básico)
		console.log(`   [4/7] Verificando tokens CSS...`);
		try {
			const fs = await import('fs/promises');
			const templateContent = await fs.readFile(templatePath, 'utf-8');
			// Verificar que tokens.css esté cargado
			if (templateContent.includes('tokens.css') || templateContent.includes('--ubits-')) {
				checklist.tokensAvailable = true;
			} else {
				warnings.push('Tokens CSS no detectados en template');
			}
		} catch (error: any) {
			warnings.push(`Error verificando tokens: ${error.message}`);
		}

		// 5. Visual test (requiere Browser MCP, marcamos como pendiente)
		console.log(`   [5/7] Prueba visual (requiere Browser MCP)...`);
		warnings.push('Prueba visual debe realizarse manualmente con Browser MCP');

		// 6. Resumen
		console.log(`   [6/7] Generando resumen...`);

		const allCriticalPassed =
			checklist.storybookConsulted && checklist.codeExtracted && checklist.cssLoaded;

		if (!allCriticalPassed) {
			errors.push('Validación crítica falló');
		}

		console.log(
			`✅ [Pre-Implementation Validator] Validación completada: ${
				allCriticalPassed ? 'PASÓ' : 'FALLÓ'
			}`,
		);

		return {
			valid: allCriticalPassed,
			checklist,
			errors,
			warnings,
		};
	} catch (error: any) {
		errors.push(`Error en validación: ${error.message}`);
		return {
			valid: false,
			checklist,
			errors,
			warnings,
		};
	}
}
