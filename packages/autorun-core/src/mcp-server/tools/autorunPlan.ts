/**
 * Tool: autorun.plan
 *
 * Genera un plan de implementación basado en el mensaje del usuario
 * sin ejecutar la implementación. Útil para previsualizar qué se va a hacer.
 */

import { handleUserMessage } from '../../helpers/autoMessageHandler.js';
import { mapComponentNameToStorybookId } from '../../helpers/storybookStories.js';
import { buildSafeStorybookUrl } from '../../helpers/verifyStorybookStories.js';
import { AutorunPlanInput, AutorunPlanOutput } from '../types.js';

/**
 * Genera plan de implementación
 */
export async function autorunPlan(input: AutorunPlanInput): Promise<AutorunPlanOutput> {
	console.log(`\n📋 [Autorun MCP] autorun.plan() llamado`);
	console.log(`   Mensaje: ${input.message.substring(0, 100)}...`);

	try {
		// PASO 1: Ejecutar handleUserMessage() para detectar componentes
		console.log(`   [1/4] Ejecutando handleUserMessage()...`);
		const result = await handleUserMessage(input.message);

		if (result.blocked) {
			console.error(`   ❌ Implementación bloqueada: ${result.reason}`);
			return {
				plan: {
					components: [],
					steps: [],
					totalSteps: 0,
				},
				blocked: true,
				reason: result.reason,
			};
		}

		// PASO 2: Preparar componentes detectados
		console.log(`   [2/4] Preparando componentes detectados...`);
		const components: AutorunPlanOutput['plan']['components'] = [];
		const mcpMessages: AutorunPlanOutput['mcpMessages'] = [];

		// Componente principal
		if (result.componentName) {
			try {
				const storybookId = await mapComponentNameToStorybookId(result.componentName);
				if (storybookId) {
					components.push({
						name: result.componentName,
						storybookId,
						detected: true,
						confidence: 'high',
					});
					mcpMessages.push({
						componentName: result.componentName,
						storybookId,
					});
					console.log(`   ✅ Componente principal: ${result.componentName} (${storybookId})`);
				}
			} catch (error: any) {
				console.warn(`   ⚠️ Error obteniendo ID para ${result.componentName}: ${error.message}`);
			}
		}

		// Componentes adicionales de mcpMessages
		if (result.mcpMessages && result.mcpMessages.length > 0) {
			for (const msg of result.mcpMessages) {
				// Verificar que no esté ya en la lista
				if (!components.some((c) => c.name === msg.componentName)) {
					components.push({
						name: msg.componentName,
						storybookId: msg.storybookId,
						detected: true,
						confidence: 'high',
					});
					mcpMessages.push({
						componentName: msg.componentName,
						storybookId: msg.storybookId,
					});
					console.log(`   ✅ Componente adicional: ${msg.componentName} (${msg.storybookId})`);
				}
			}
		}

		if (components.length === 0) {
			console.warn(`   ⚠️ No se detectaron componentes`);
			return {
				plan: {
					components: [],
					steps: [],
					totalSteps: 0,
				},
				blocked: false,
			};
		}

		// PASO 3: Construir URLs de Storybook
		console.log(`   [3/4] Construyendo URLs de Storybook...`);
		const storybookUrls: string[] = [];
		for (const component of components) {
			try {
				const urlResult = await buildSafeStorybookUrl(component.storybookId, 'default');
				if (urlResult.url) {
					storybookUrls.push(urlResult.url);
					console.log(`   ✅ URL para ${component.name}: ${urlResult.url}`);
				}
			} catch (error: any) {
				console.warn(`   ⚠️ No se pudo construir URL para ${component.name}: ${error.message}`);
			}
		}

		// PASO 4: Generar pasos del plan
		console.log(`   [4/4] Generando pasos del plan...`);
		const steps: AutorunPlanOutput['plan']['steps'] = [
			{
				step: 1,
				description: 'Detectar componentes automáticamente desde el mensaje',
				required: true,
				estimatedTime: '1s',
			},
			{
				step: 2,
				description: 'Consultar Storybook MCP para obtener props exactas de todos los componentes',
				required: true,
				estimatedTime: '2-5s',
			},
			{
				step: 3,
				description: 'Extraer código exacto desde Storybook (pestaña Code)',
				required: true,
				estimatedTime: '3-10s',
			},
			{
				step: 4,
				description:
					'Validar pre-implementación (5 verificaciones: CSS, estructura, elementos requeridos, accesibilidad, comparación con código fuente)',
				required: true,
				estimatedTime: '2-5s',
			},
			{
				step: 5,
				description: 'Analizar componentes internos y dependencias',
				required: true,
				estimatedTime: '1-3s',
			},
			{
				step: 6,
				description: 'Implementar código con marcas Autorun',
				required: true,
				estimatedTime: '1s',
			},
			{
				step: 7,
				description:
					'Post-implementación: Prettier (formateo), ESLint (validación), Auto-Reload (recarga), GitHub (commit si está configurado)',
				required: false,
				estimatedTime: '5-15s',
			},
			{
				step: 8,
				description: 'Verificación post-implementación y tests visuales (opcional)',
				required: false,
				estimatedTime: '10-30s',
			},
		];

		const totalEstimatedTime = steps
			.map((s) => {
				const time = s.estimatedTime?.match(/(\d+)/)?.[1];
				return time ? parseInt(time) : 0;
			})
			.reduce((a, b) => a + b, 0);

		console.log(`   ✅ Plan generado: ${components.length} componente(s), ${steps.length} paso(s)`);
		console.log(`   ⏱️ Tiempo estimado: ~${totalEstimatedTime}s`);

		return {
			plan: {
				components,
				steps,
				totalSteps: steps.length,
				estimatedTime: `~${totalEstimatedTime}s`,
			},
			blocked: false,
			storybookUrls: storybookUrls.length > 0 ? storybookUrls : undefined,
			mcpMessages: mcpMessages.length > 0 ? mcpMessages : undefined,
		};
	} catch (error: any) {
		console.error(`   ❌ Error en autorun.plan(): ${error.message}`);
		return {
			plan: {
				components: [],
				steps: [],
				totalSteps: 0,
			},
			blocked: true,
			reason: `Error generando plan: ${error.message}`,
		};
	}
}
