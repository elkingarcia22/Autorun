/**
 * Storybook Implementation Helper
 *
 * Helper principal que integra todas las funcionalidades para implementar
 * componentes desde Storybook automáticamente
 */

import { generateImplementationCode, CodeGenerationOptions } from './storybookCodeGenerator';
import { validateImplementationStructure } from '../validation/storybookStructureValidator';
import { parseCodeFromStory } from './storybookCodeParser';
import { parsePropsFromComponent } from './storybookPropsParser';
import { extractAPIFromStorybook } from './storybookAPIExtractor';
import { extractCompositionFromStorybook } from './storybookCompositionExtractor';
import { extractBestPracticesFromStorybook } from './storybookBestPracticesExtractor';
import { extractRealWorldExamplesFromStorybook } from './storybookRealWorldExamplesExtractor';

export interface StorybookImplementationResult {
	success: boolean;
	code?: string;
	props?: Record<string, any>;
	validation?: any;
	errors?: string[];
	warnings?: string[];
	// ⭐ NUEVO: Información completa
	api?: any;
	composition?: any;
	bestPractices?: any;
	realWorldExamples?: any;
}

export interface ImplementationRequest {
	componentId: string;
	storyName?: string;
	customProps?: Record<string, any>;
	useCase?: string;
	format?: 'html' | 'jsx' | 'vanilla';
	validate?: boolean;
}

/**
 * Implementa un componente desde Storybook automáticamente
 *
 * @param request - Solicitud de implementación
 * @returns Resultado de implementación con código generado
 */
export async function implementComponentFromStorybook(
	request: ImplementationRequest,
): Promise<StorybookImplementationResult> {
	console.log(
		`🚀 [Storybook Implementation Helper] Implementando componente: ${request.componentId}`,
	);

	try {
		// ⭐ NUEVO: 1. Obtener TODA la información de Storybook
		console.log(`📚 [Storybook Implementation Helper] Obteniendo información completa...`);

		const [codeResult, api, composition, bestPractices, realWorldExamples] = await Promise.all([
			// Generar código de implementación
			generateImplementationCode({
				componentId: request.componentId,
				storyName: request.storyName,
				customProps: request.customProps,
				useCase: request.useCase,
				format: request.format || 'html',
				includeImports: request.format !== 'html',
			}),
			// Obtener API
			extractAPIFromStorybook(request.componentId).catch(() => null),
			// Obtener composición
			extractCompositionFromStorybook(request.componentId).catch(() => null),
			// Obtener best practices
			extractBestPracticesFromStorybook(request.componentId).catch(() => null),
			// Obtener ejemplos del mundo real
			extractRealWorldExamplesFromStorybook(request.componentId).catch(() => null),
		]);

		console.log(`✅ [Storybook Implementation Helper] Información completa obtenida`);

		// 2. Validar si se solicita
		let validation;
		if (request.validate !== false) {
			try {
				validation = await validateImplementationStructure({
					componentId: request.componentId,
					implementation: codeResult.complete,
					storyName: request.storyName,
					strict: false,
				});
			} catch (validationError: any) {
				console.warn(
					`⚠️ [Storybook Implementation Helper] Error en validación:`,
					validationError.message,
				);
				// Continuar aunque falle la validación
			}
		}

		console.log(`✅ [Storybook Implementation Helper] Componente implementado exitosamente`);

		return {
			success: true,
			code: codeResult.complete,
			props: codeResult.props,
			validation,
			warnings: validation?.warnings || [],
			// ⭐ NUEVO: Incluir toda la información
			api,
			composition,
			bestPractices,
			realWorldExamples,
		};
	} catch (error: any) {
		console.error(`❌ [Storybook Implementation Helper] Error implementando:`, error.message);
		return {
			success: false,
			errors: [error.message],
		};
	}
}

/**
 * Obtiene código de ejemplo desde Storybook
 *
 * @param componentId - ID del componente
 * @param storyName - Nombre de la historia
 * @returns Código de ejemplo
 */
export async function getExampleCodeFromStorybook(
	componentId: string,
	storyName: string = 'default',
): Promise<string | null> {
	try {
		const codeData = await parseCodeFromStory(componentId, storyName);
		return codeData.primaryCode || codeData.codeBlocks[0]?.code || null;
	} catch (error: any) {
		console.error(
			`❌ [Storybook Implementation Helper] Error obteniendo código de ejemplo:`,
			error.message,
		);
		return null;
	}
}

/**
 * Obtiene props desde Storybook
 *
 * @param componentId - ID del componente
 * @returns Props del componente
 */
export async function getPropsFromStorybook(
	componentId: string,
): Promise<Record<string, any> | null> {
	try {
		const propsData = await parsePropsFromComponent(componentId, true);
		const props: Record<string, any> = {};

		for (const prop of propsData.props) {
			if (prop.defaultValue && prop.defaultValue !== '-') {
				props[prop.name] = prop.defaultValue;
			}
		}

		return props;
	} catch (error: any) {
		console.error(`❌ [Storybook Implementation Helper] Error obteniendo props:`, error.message);
		return null;
	}
}

/**
 * Valida implementación vs Storybook
 *
 * @param componentId - ID del componente
 * @param implementation - Código implementado
 * @param storyName - Nombre de la historia
 * @returns Resultado de validación
 */
export async function validateImplementation(
	componentId: string,
	implementation: string,
	storyName?: string,
): Promise<any> {
	try {
		return await validateImplementationStructure({
			componentId,
			implementation,
			storyName,
			strict: false,
		});
	} catch (error: any) {
		console.error(`❌ [Storybook Implementation Helper] Error validando:`, error.message);
		return {
			valid: false,
			errors: [error.message],
			warnings: [],
			differences: [],
		};
	}
}
