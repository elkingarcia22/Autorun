/**
 * Error Messages Helper
 *
 * Sistema para generar mensajes de error más claros y accionables
 */

export interface ErrorMessage {
	title: string;
	description: string;
	actionableSteps: string[];
	suggestedSolutions: string[];
	relatedDocs?: string[];
	severity: 'error' | 'warning' | 'info';
}

/**
 * Genera un mensaje de error claro y accionable
 */
export function generateClearErrorMessage(
	errorType: string,
	context: {
		componentName?: string;
		filePath?: string;
		missingSteps?: string[];
		checklist?: any;
		similarProblems?: any[];
	},
): ErrorMessage {
	const messages: Record<string, (ctx: typeof context) => ErrorMessage> = {
		'checklist-incomplete': (ctx) => ({
			title: `❌ Checklist Incompleto para ${ctx.componentName || 'Componente'}`,
			description: `No puedes implementar ${ctx.componentName || 'este componente'} hasta completar todos los pasos obligatorios.`,
			actionableSteps: [
				`1. Consulta Storybook en Vercel: https://ubits-storybook10.vercel.app/`,
				`2. Busca el componente: ${ctx.componentName || 'componente'}`,
				`3. Revisa la pestaña "Code" para ver estructura exacta`,
				`4. Revisa la pestaña "Controls" para ver todas las opciones`,
				`5. Consulta Storybook MCP: mcp_storybook_getComponentsProps(['${ctx.componentName}'])`,
				`6. Lee la documentación: docs/referencia/componentes/`,
			],
			suggestedSolutions: [
				`Usa ensureImplementationReady('${ctx.componentName}') para completar el checklist automáticamente`,
				`Sigue el proceso paso a paso en: docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`,
			],
			relatedDocs: [
				'docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md',
				'docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md',
			],
			severity: 'error',
		}),

		'image-trigger-detected': () => ({
			title: '❌ Bloqueo: Imagen Detectada sin Análisis',
			description:
				'Se detectó una imagen o solicitud de creación desde imagen, pero no se completó el análisis obligatorio.',
			actionableSteps: [
				'1. Lee .cursor/rules/01-deteccion-imagen.md',
				'2. Lee .cursor/rules/02-bloqueo-imagen.md',
				'3. Analiza la imagen detalladamente',
				'4. Muestra el análisis completo al usuario',
				'5. Espera aprobación explícita antes de implementar',
			],
			suggestedSolutions: [
				'Sigue el proceso completo de análisis de imagen antes de escribir código',
				'Ver: docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md',
			],
			relatedDocs: [
				'.cursor/rules/01-deteccion-imagen.md',
				'.cursor/rules/02-bloqueo-imagen.md',
				'docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md',
			],
			severity: 'error',
		}),

		'storybook-not-consulted': (ctx) => ({
			title: `⚠️ Storybook No Consultado para ${ctx.componentName || 'Componente'}`,
			description: `Debes consultar Storybook ANTES de implementar ${ctx.componentName || 'este componente'} para obtener la estructura exacta.`,
			actionableSteps: [
				'1. Navega a: https://ubits-storybook10.vercel.app/',
				`2. Busca el componente: ${ctx.componentName || 'componente'}`,
				'3. Revisa la pestaña "Code" para ver código exacto',
				'4. Revisa la pestaña "Controls" para ver todas las opciones',
				'5. Vuelve al template después de consultar',
			],
			suggestedSolutions: [
				'Usa buildSafeStorybookUrl() para construir URL verificada',
				'Guarda la URL del template antes de navegar a Storybook',
			],
			relatedDocs: [
				'docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md',
				'docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md',
			],
			severity: 'error',
		}),

		'story-checklist-incomplete': (ctx) => ({
			title: `⚠️ Checklist de Historia Incompleto`,
			description: `No puedes continuar con la siguiente historia hasta completar TODO el checklist de la historia actual.`,
			actionableSteps: [
				'1. Revisa qué items del checklist faltan',
				'2. Completa cada item uno por uno',
				'3. Verifica que la funcionalidad funciona correctamente',
				'4. Marca el checklist como completado',
			],
			suggestedSolutions: [
				'Implementa UNA historia a la vez',
				'Completa TODO el checklist antes de continuar',
				'Ver: docs/guias/implementacion/GUIA-IMPLEMENTACION-POR-HISTORIAS-STORYBOOK.md',
			],
			relatedDocs: ['docs/guias/implementacion/GUIA-IMPLEMENTACION-POR-HISTORIAS-STORYBOOK.md'],
			severity: 'error',
		}),
	};

	const generator = messages[errorType];
	if (!generator) {
		return {
			title: '❌ Error Desconocido',
			description: 'Ocurrió un error durante la implementación',
			actionableSteps: ['Revisa los logs para más detalles'],
			suggestedSolutions: [],
			severity: 'error',
		};
	}

	return generator(context);
}

/**
 * Formatea un mensaje de error para mostrar en consola
 */
export function formatErrorMessage(message: ErrorMessage): string {
	let formatted = `\n${message.title}\n`;
	formatted += `${'='.repeat(50)}\n\n`;
	formatted += `${message.description}\n\n`;

	if (message.actionableSteps.length > 0) {
		formatted += `📋 Pasos a seguir:\n`;
		message.actionableSteps.forEach((step, index) => {
			formatted += `   ${step}\n`;
		});
		formatted += `\n`;
	}

	if (message.suggestedSolutions.length > 0) {
		formatted += `💡 Soluciones sugeridas:\n`;
		message.suggestedSolutions.forEach((solution, index) => {
			formatted += `   ${solution}\n`;
		});
		formatted += `\n`;
	}

	if (message.relatedDocs && message.relatedDocs.length > 0) {
		formatted += `📚 Documentación relacionada:\n`;
		message.relatedDocs.forEach((doc) => {
			formatted += `   - ${doc}\n`;
		});
		formatted += `\n`;
	}

	return formatted;
}

/**
 * Genera mensaje de error con sugerencias basadas en problemas similares
 */
export async function generateContextualErrorMessage(
	errorType: string,
	context: {
		componentName?: string;
		problemDescription?: string;
		problemTracker?: any;
	},
): Promise<string> {
	const baseMessage = generateClearErrorMessage(errorType, context);
	let formatted = formatErrorMessage(baseMessage);

	// Si hay Problem Tracker, buscar problemas similares
	if (context.problemTracker && context.problemDescription) {
		try {
			const similar = await context.problemTracker.searchSimilarProblems(
				context.problemDescription,
				context.componentName?.toLowerCase(),
			);

			if (similar.length > 0) {
				formatted += `\n🔍 Problemas similares encontrados anteriormente:\n`;
				// Usar for...of en lugar de forEach para poder usar await
				for (let index = 0; index < Math.min(3, similar.length); index++) {
					const problem = similar[index];
					formatted += `   ${index + 1}. ${problem.titulo || problem.descripcion.substring(0, 50)}\n`;

					// Buscar soluciones
					const solutions = await context.problemTracker.searchSolutions(problem.id);
					if (solutions.length > 0) {
						const bestSolution = solutions.find((s: any) => s.verificada) || solutions[0];
						formatted += `      💡 Solución: ${bestSolution.descripcion.substring(0, 100)}...\n`;
					}
				}
				formatted += `\n`;
			}
		} catch (error) {
			// Ignorar errores de Problem Tracker
		}
	}

	return formatted;
}



