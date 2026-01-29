/**
 * Tool: autorun.checklist
 *
 * Obtiene checklist de implementación para un componente específico
 */

import { AutorunChecklistInput, AutorunChecklistOutput } from '../types.js';
import { AddonOrchestrator } from '../helpers/addonOrchestrator.js';

/**
 * Obtiene checklist de implementación
 */
export async function autorunChecklist(
	input: AutorunChecklistInput,
): Promise<AutorunChecklistOutput> {
	console.log(`\n📋 [Autorun MCP] autorun.checklist() llamado`);
	console.log(`   Componente: ${input.componentName}`);

	try {
		const orchestrator = new AddonOrchestrator();
		const hub = await orchestrator.getHub();
		const preCheckAddon = hub.getAddon('pre-implementation-check');

		if (!preCheckAddon || !preCheckAddon.isActive()) {
			return {
				componentName: input.componentName,
				checklist: {
					storybookVercel: false,
					storybookMCP: false,
					documentation: false,
					comparison: false,
				},
				missingSteps: [
					'Consultar Storybook en Vercel',
					'Consultar Storybook MCP',
					'Consultar documentación',
					'Comparar versiones',
				],
				completedSteps: [],
				canImplement: false,
				reason: 'Pre-Implementation Check add-on no está activo',
			};
		}

		const services = preCheckAddon.getServices();
		if (!services || !services.canImplement) {
			return {
				componentName: input.componentName,
				checklist: {
					storybookVercel: false,
					storybookMCP: false,
					documentation: false,
					comparison: false,
				},
				missingSteps: [
					'Consultar Storybook en Vercel',
					'Consultar Storybook MCP',
					'Consultar documentación',
					'Comparar versiones',
				],
				completedSteps: [],
				canImplement: false,
				reason: 'Servicios de Pre-Implementation Check no disponibles',
			};
		}

		// Obtener checklist
		const checkResult = await services.canImplement(input.componentName);
		const checklist = checkResult.checklist || {
			storybookVercel: false,
			storybookMCP: false,
			documentation: false,
			comparison: false,
		};

		const completedSteps: string[] = [];
		if (checklist.storybookVercel) completedSteps.push('Consultar Storybook en Vercel');
		if (checklist.storybookMCP) completedSteps.push('Consultar Storybook MCP');
		if (checklist.documentation) completedSteps.push('Consultar documentación');
		if (checklist.comparison) completedSteps.push('Comparar versiones');

		// Obtener plan basado en historias si está disponible
		let plan;
		if (services.getOrCreateStoryBasedPlan) {
			try {
				const { mapComponentNameToStorybookId } = await import('../../helpers/storybookStories');
				const componentId = await mapComponentNameToStorybookId(input.componentName);
				plan = await services.getOrCreateStoryBasedPlan(input.componentName, componentId);
			} catch (error) {
				// Ignorar errores al obtener plan
			}
		}

		return {
			componentName: input.componentName,
			checklist,
			missingSteps: checkResult.missingSteps || [],
			completedSteps,
			canImplement: checkResult.allowed,
			reason: checkResult.reason,
			plan,
		};
	} catch (error: any) {
		console.error(`   ❌ Error en autorun.checklist(): ${error.message}`);
		return {
			componentName: input.componentName,
			checklist: {
				storybookVercel: false,
				storybookMCP: false,
				documentation: false,
				comparison: false,
			},
			missingSteps: [
				'Consultar Storybook en Vercel',
				'Consultar Storybook MCP',
				'Consultar documentación',
				'Comparar versiones',
			],
			completedSteps: [],
			canImplement: false,
			reason: `Error obteniendo checklist: ${error.message}`,
		};
	}
}
