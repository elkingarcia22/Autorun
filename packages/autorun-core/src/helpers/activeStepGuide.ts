/**
 * Active Step Guide
 *
 * Sistema de "guía activa" que muestra el siguiente paso obligatorio
 * y bloquea hasta completarlo.
 *
 * ⚠️ CRÍTICO: Este sistema garantiza que el agente siempre sepa
 * cuál es el siguiente paso y no pueda continuar sin completarlo.
 */

import { PhaseValidator, type PhaseValidationResult } from '../validation/PhaseValidator';
import { getAutorunHub } from '../AutorunAgent';

export interface ActiveStep {
	phase: string;
	step: string;
	description: string;
	requiredActions: string[];
	verification?: () => Promise<boolean>;
	guides?: string[];
	storybookUrl?: string;
}

export interface ActiveStepResult {
	hasActiveStep: boolean;
	currentStep?: ActiveStep;
	blocked: boolean;
	reason?: string;
	nextStep?: ActiveStep;
}

export class ActiveStepGuide {
	/**
	 * Obtener el paso activo actual para un componente
	 */
	static async getCurrentStep(componentName: string): Promise<ActiveStepResult> {
		console.log(`\n📋 [Active Step Guide] Obteniendo paso activo para: ${componentName}`);

		// 1. Obtener siguiente fase requerida
		const nextPhase = await PhaseValidator.getNextRequiredPhase(componentName);

		if (!nextPhase) {
			console.log(
				`✅ [Active Step Guide] Todas las fases están completadas para: ${componentName}`,
			);
			return {
				hasActiveStep: false,
				blocked: false,
			};
		}

		console.log(`📋 [Active Step Guide] Siguiente fase requerida: ${nextPhase}`);

		// 2. Crear paso activo basado en la fase
		const activeStep = await this.createActiveStepForPhase(componentName, nextPhase);

		// 3. Verificar si el paso está completado
		const isCompleted = activeStep.verification ? await activeStep.verification() : false;

		if (isCompleted) {
			console.log(`✅ [Active Step Guide] Paso ya está completado: ${activeStep.step}`);
			// Marcar fase como completada
			await PhaseValidator.markPhaseCompleted(componentName, nextPhase);
			// Obtener siguiente paso
			return await this.getCurrentStep(componentName);
		}

		console.log(`📋 [Active Step Guide] Paso activo: ${activeStep.step}`);

		return {
			hasActiveStep: true,
			currentStep: activeStep,
			blocked: true,
			reason: `Debes completar: ${activeStep.description}`,
		};
	}

	/**
	 * Crear paso activo basado en la fase
	 */
	private static async createActiveStepForPhase(
		componentName: string,
		phase: string,
	): Promise<ActiveStep> {
		const phaseDescription = PhaseValidator.getPhaseDescription(phase);

		switch (phase) {
			case 'FASE_0_VERIFICACION_SCRIPTS':
				return {
					phase,
					step: 'Verificar Script UMD',
					description: phaseDescription,
					requiredActions: [
						'Verificar que el script data-table.umd.js está en el HTML',
						'Verificar que window.createDataTable está disponible',
						'Si no está disponible, agregar script con carga dinámica y fallback',
						'Verificar en consola del navegador que no hay errores de carga',
					],
					verification: async () => {
						// Verificar en contexto del navegador (si está disponible)
						if (typeof window !== 'undefined') {
							const win = window as any;
							return (
								typeof win.createDataTable === 'function' ||
								(win.UBITSDataTable && typeof win.UBITSDataTable.createDataTable === 'function')
							);
						}
						// Si no está en contexto del navegador, retornar false para forzar verificación
						return false;
					},
					guides: ['docs/guias/implementacion/GUIA-ERROR-SCRIPT-UMD-DATATABLE-NO-CARGA.md'],
				};

			case 'FASE_0.1_REVISAR_COMPONENTE':
				const componentId = await this.getStorybookId(componentName);
				// ⚠️ CRÍTICO: NO usar URL hardcodeada de UBITS
				// Usar SOLO el Storybook activo del StorybookManager
				const storybookUrl = await this.getStorybookUrlForComponent(componentId);
				return {
					phase,
					step: 'Revisar Componente',
					description: phaseDescription,
					requiredActions: [
						`Consultar Storybook activo: ${storybookUrl}`,
						`Buscar componente: ${componentId}`,
						'Revisar pestaña "Code" para ver estructura exacta',
						'Revisar pestaña "Controls" para ver todas las opciones',
						'Consultar Storybook MCP: mcp_storybook_getComponentsProps',
						'Consultar documentación: docs/referencia/componentes/',
					],
					storybookUrl,
					guides: [
						'docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md',
						`docs/referencia/componentes/${this.getDocFileName(componentName)}`,
					],
				};

			case 'FASE_0.5_ANALIZAR_ESTRUCTURA':
				return {
					phase,
					step: 'Analizar Estructura',
					description: phaseDescription,
					requiredActions: [
						'Analizar si el componente necesita contenedor',
						'Analizar spacing alrededor del componente',
						'Verificar elementos que van antes del componente',
						'Documentar estructura identificada',
					],
					guides: ['docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md'],
				};

			case 'FASE_0.6_CONTAR_ITEMS':
				return {
					phase,
					step: 'Contar Items/Filas',
					description: phaseDescription,
					requiredActions: [
						'Contar filas visibles en la imagen o solicitud',
						'Verificar si hay scroll o paginación',
						'Estimar cantidad total de items',
						'Documentar cantidad identificada',
					],
					guides: ['docs/guias/implementacion/GUIA-GENERAR-ITEMS-DATATABLE.md'],
				};

			case 'FASE_1_ANALISIS_COLUMNAS':
				return {
					phase,
					step: 'Análisis de Columnas',
					description: phaseDescription,
					requiredActions: [
						'Identificar cantidad de columnas',
						'Identificar tipo de cada columna (text, estado, fecha, progreso, etc.)',
						'Identificar columnas especiales (checkbox, drag handle, acciones)',
						'Verificar funcionalidades NO visibles en la imagen',
						'Crear lista de columnas con tipos correctos',
					],
					guides: ['docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md'],
				};

			case 'FASE_2_IMPLEMENTACION_BASICA':
				return {
					phase,
					step: 'Implementación Básica',
					description: phaseDescription,
					requiredActions: [
						'Crear contenedor del componente',
						'Implementar componente básico con columnas identificadas',
						'Generar items con variedad según análisis',
						'Configurar altura dinámica',
						'Verificar que el componente se renderiza correctamente',
					],
					guides: ['docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md'],
				};

			default:
				return {
					phase,
					step: phase,
					description: phaseDescription,
					requiredActions: ['Completar fase según documentación'],
				};
		}
	}

	/**
	 * Bloquear hasta completar el paso activo
	 */
	static async blockUntilStepCompleted(
		componentName: string,
		step: ActiveStep,
	): Promise<{
		completed: boolean;
		reason?: string;
	}> {
		console.log(`\n🛡️ [Active Step Guide] Bloqueando hasta completar: ${step.step}`);

		if (step.verification) {
			const isCompleted = await step.verification();
			if (!isCompleted) {
				console.error(`❌ [Active Step Guide] Paso no completado: ${step.description}`);
				return {
					completed: false,
					reason: `Debes completar: ${step.description}`,
				};
			}
		}

		// Marcar fase como completada
		await PhaseValidator.markPhaseCompleted(componentName, step.phase);

		console.log(`✅ [Active Step Guide] Paso completado: ${step.step}`);

		return { completed: true };
	}

	/**
	 * Obtener ID de Storybook para un componente
	 */
	private static async getStorybookId(componentName: string): Promise<string> {
		try {
			const hub = await getAutorunHub();
			if (hub) {
				const preCheckAddon = hub.getAddon('pre-implementation-check');
				if (preCheckAddon) {
					return (
						(preCheckAddon as any).getStorybookId?.(componentName) || componentName.toLowerCase()
					);
				}
			}
		} catch (error) {
			// Ignorar error
		}
		return componentName.toLowerCase();
	}

	/**
	 * Obtener URL del Storybook activo para un componente
	 * ⚠️ CRÍTICO: Usa SOLO el Storybook activo del StorybookManager
	 */
	private static async getStorybookUrlForComponent(componentId: string): Promise<string> {
		try {
			const { StorybookManager } = await import('./storybookManager');
			const manager = StorybookManager.getInstance();
			const activeConfig = await manager.getActiveConfig();

			if (!activeConfig) {
				throw new Error(
					`❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`,
				);
			}

			// Construir URL usando el Storybook activo (priorizando /docs/)
			// ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
			const encodedComponentId = encodeURIComponent(componentId);
			const path = `?path=/docs/${encodedComponentId}--docs`;
			return await manager.buildStorybookUrl(path);
		} catch (error: any) {
			// ⚠️ CRÍTICO: NO usar fallback de UBITS
			// Lanzar error en lugar de usar fallback
			throw new Error(
				`❌ No se pudo obtener URL del Storybook activo para ${componentId}. ${error.message}`,
			);
		}
	}

	/**
	 * Obtener nombre de archivo de documentación
	 */
	private static getDocFileName(componentName: string): string {
		const mapping: Record<string, string> = {
			DataTable: 'data-table.md',
			Tabs: 'tabs.md',
			Modal: 'modal.md',
			Button: 'button.md',
			SubNav: 'subnav.md',
		};
		return mapping[componentName] || `${componentName.toLowerCase()}.md`;
	}
}
