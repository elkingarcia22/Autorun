/**
 * Story-Based Implementation System
 * 
 * Sistema para implementar componentes dividiendo por historias de Storybook
 * Consulta cada historia antes de implementarla
 */

import { 
	getComponentStories, 
	generateImplementationPlanFromStories,
	getStoryDetailsInstructions,
	type ComponentStories,
	type StorybookStory
} from './storybookStories';
import { ImplementationStep, ComponentImplementationPlan } from './stepByStepImplementation';

export interface StoryChecklistItem {
	id: string;
	description: string;
	completed: boolean;
	verification?: string; // Cómo verificar que está completo
}

export interface StoryChecklist {
	storyId: string;
	storyName: string;
	items: StoryChecklistItem[];
	allCompleted: boolean;
}

export interface StoryBasedImplementationPlan extends ComponentImplementationPlan {
	componentStories: ComponentStories;
	storySteps: Array<ImplementationStep & { story: StorybookStory; checklist: StoryChecklist }>;
}

/**
 * Crea un plan de implementación basado en historias de Storybook
 * 
 * @param componentName - Nombre del componente (ej: "DataTable")
 * @param componentId - ID del componente en Storybook (opcional)
 * @returns Plan de implementación basado en historias
 */
export async function createStoryBasedImplementationPlan(
	componentName: string,
	componentId?: string
): Promise<StoryBasedImplementationPlan> {
	console.log(`📚 [Story-Based Implementation] Obteniendo historias de ${componentName}...`);

	// 1. Obtener todas las historias del componente
	const componentStories = await getComponentStories(componentName, componentId);

	if (componentStories.totalStories === 0) {
		throw new Error(`No se encontraron historias para el componente ${componentName}`);
	}

	console.log(`✅ [Story-Based Implementation] Encontradas ${componentStories.totalStories} historias:`);
	componentStories.stories.forEach((story, index) => {
		console.log(`   ${index + 1}. ${story.name} (${story.id})`);
	});

	// 2. Generar plan de implementación basado en historias
	const plan = generateImplementationPlanFromStories(componentStories);

	// 3. Crear checklist para cada historia
	const storySteps: Array<ImplementationStep & { story: StorybookStory; checklist: StoryChecklist }> = plan.steps.map(step => {
		const checklist = createStoryChecklist(step.story);
		return {
			id: step.id,
			name: step.name,
			description: step.description,
			dependencies: step.dependencies,
			estimatedTime: step.estimatedTime,
			story: step.story,
			checklist,
		};
	});
	
	console.log(`\n📋 [Story-Based Implementation] Checklists creados para ${storySteps.length} historias`);
	storySteps.forEach((step, index) => {
		console.log(`   ${index + 1}. ${step.story.name}: ${step.checklist.items.length} items en checklist`);
	});

	return {
		componentName: plan.componentName,
		steps: storySteps,
		totalSteps: plan.totalSteps,
		estimatedTotalTime: `${Math.ceil(plan.totalSteps * 7.5)}-${Math.ceil(plan.totalSteps * 12.5)} minutos`,
		componentStories,
		storySteps,
	};
}

/**
 * Obtiene las instrucciones para consultar una historia antes de implementarla
 * 
 * @param story - Historia a consultar
 * @returns Instrucciones detalladas
 */
export function getStoryConsultationInstructions(story: StorybookStory): {
	message: string;
	url: string;
	steps: string[];
	verification: string[];
} {
	const details = getStoryDetailsInstructions(story);

	return {
		message: `📚 Consultar historia "${story.name}" en Storybook antes de implementar`,
		url: story.url,
		steps: details.steps,
		verification: [
			`✅ Historia "${story.name}" consultada en Storybook`,
			`✅ Código de la historia revisado en pestaña "Code"`,
			`✅ Opciones revisadas en pestaña "Controls"`,
			`✅ Documentación revisada en pestaña "Docs" (si está disponible)`,
		],
	};
}

/**
 * Genera un resumen del plan de implementación basado en historias
 */
export function generateStoryBasedPlanSummary(plan: StoryBasedImplementationPlan): string {
	let summary = `\n📋 Plan de Implementación Basado en Historias de Storybook\n`;
	summary += `\nComponente: ${plan.componentName}\n`;
	summary += `Total de historias: ${plan.totalSteps}\n`;
	summary += `Tiempo estimado: ${plan.estimatedTotalTime}\n\n`;

	summary += `Historias a implementar (UNA A LA VEZ con checklist):\n`;
	plan.storySteps.forEach((step, index) => {
		summary += `\n${index + 1}. ${step.name}\n`;
		summary += `   Historia ID: ${step.story.id}\n`;
		summary += `   URL: ${step.story.url}\n`;
		summary += `   Descripción: ${step.description}\n`;
		summary += `   Tiempo estimado: ${step.estimatedTime || '5-10 minutos'}\n`;
		if (step.dependencies && step.dependencies.length > 0) {
			summary += `   Dependencias: ${step.dependencies.join(', ')}\n`;
		}
		summary += `   \n   📋 Checklist (${step.checklist.items.filter(i => i.completed).length}/${step.checklist.items.length} completados):\n`;
		step.checklist.items.forEach((item, itemIndex) => {
			const status = item.completed ? '✅' : '⏳';
			summary += `      ${status} ${itemIndex + 1}. ${item.description}\n`;
		});
		if (step.checklist.allCompleted) {
			summary += `   ✅ Checklist COMPLETO - Listo para continuar con la siguiente historia\n`;
		} else {
			summary += `   ⚠️ Checklist INCOMPLETO - Debe completarse antes de continuar\n`;
		}
	});

	summary += `\n⚠️⚠️⚠️ REGLAS CRÍTICAS DE IMPLEMENTACIÓN ⚠️⚠️⚠️\n`;
	summary += `\n1. NO usar la historia "default" - tiene todo mezclado\n`;
	summary += `2. Implementar UNA historia a la vez\n`;
	summary += `3. Completar TODO el checklist de una historia antes de pasar a la siguiente\n`;
	summary += `4. Consultar cada historia en Storybook ANTES de implementarla\n`;
	summary += `5. Navegar a la historia, revisar Code, Controls y Docs\n`;
	summary += `6. Implementar SOLO la funcionalidad de esa historia específica\n`;
	summary += `7. Probar y verificar que funciona antes de marcar como completado\n`;
	summary += `8. NO intentar implementar múltiples historias al mismo tiempo\n`;

	return summary;
}

/**
 * Crea un checklist específico para una historia
 * Cada historia tiene su propio checklist que debe completarse antes de continuar
 */
function createStoryChecklist(story: StorybookStory): StoryChecklist {
	// Checklist base para todas las historias
	const baseChecklist: StoryChecklistItem[] = [
		{
			id: 'consult-storybook',
			description: 'Consultar la historia en Storybook (navegar, revisar Code, Controls, Docs)',
			completed: false,
			verification: 'Historia consultada en Storybook y código revisado',
		},
		{
			id: 'understand-functionality',
			description: 'Entender la funcionalidad específica de esta historia',
			completed: false,
			verification: 'Funcionalidad entendida y documentada',
		},
		{
			id: 'implement-functionality',
			description: 'Implementar la funcionalidad específica de esta historia',
			completed: false,
			verification: 'Código implementado y funcionando',
		},
		{
			id: 'test-functionality',
			description: 'Probar que la funcionalidad funciona correctamente',
			completed: false,
			verification: 'Funcionalidad probada y verificada',
		},
	];

	// Agregar items específicos según el tipo de historia
	const storyName = story.name.toLowerCase();
	
	if (storyName.includes('reordenable') || storyName.includes('reorden')) {
		baseChecklist.push({
			id: 'test-drag-drop',
			description: 'Probar que el drag & drop funciona correctamente',
			completed: false,
			verification: 'Drag & drop probado y funcionando',
		});
	}
	
	if (storyName.includes('expandible') || storyName.includes('expand')) {
		baseChecklist.push({
			id: 'test-expand-collapse',
			description: 'Probar que expandir/colapsar filas funciona',
			completed: false,
			verification: 'Expandir/colapsar probado y funcionando',
		});
	}
	
	if (storyName.includes('ordenamiento') || storyName.includes('sort')) {
		baseChecklist.push({
			id: 'test-sorting',
			description: 'Probar que el ordenamiento (asc/desc) funciona',
			completed: false,
			verification: 'Ordenamiento probado y funcionando',
		});
	}
	
	if (storyName.includes('seleccion') || storyName.includes('checkbox')) {
		baseChecklist.push({
			id: 'test-selection',
			description: 'Probar que la selección múltiple y Action Bar funcionan',
			completed: false,
			verification: 'Selección múltiple y Action Bar probados',
		});
	}
	
	if (storyName.includes('paginacion') || storyName.includes('pagination')) {
		baseChecklist.push({
			id: 'test-pagination',
			description: 'Probar que la paginación funciona correctamente',
			completed: false,
			verification: 'Paginación probada y funcionando',
		});
	}
	
	if (storyName.includes('busqueda') || storyName.includes('filtro') || storyName.includes('search') || storyName.includes('filter')) {
		baseChecklist.push({
			id: 'test-search-filters',
			description: 'Probar que búsqueda y filtros funcionan correctamente',
			completed: false,
			verification: 'Búsqueda y filtros probados y funcionando',
		});
	}
	
	if (storyName.includes('sticky') || storyName.includes('fija')) {
		baseChecklist.push({
			id: 'test-sticky',
			description: 'Probar que las columnas sticky funcionan al hacer scroll',
			completed: false,
			verification: 'Columnas sticky probadas y funcionando',
		});
	}

	return {
		storyId: story.id,
		storyName: story.name,
		items: baseChecklist,
		allCompleted: false,
	};
}

/**
 * Marca un item del checklist como completado
 */
export function completeChecklistItem(
	plan: StoryBasedImplementationPlan,
	storyId: string,
	itemId: string
): StoryBasedImplementationPlan {
	const storyStep = plan.storySteps.find(step => step.story.id === storyId);
	if (!storyStep) {
		console.warn(`⚠️ [Story Checklist] Historia ${storyId} no encontrada`);
		return plan;
	}

	const item = storyStep.checklist.items.find(item => item.id === itemId);
	if (!item) {
		console.warn(`⚠️ [Story Checklist] Item ${itemId} no encontrado en historia ${storyId}`);
		return plan;
	}

	item.completed = true;
	
	// Verificar si todos los items están completos
	storyStep.checklist.allCompleted = storyStep.checklist.items.every(item => item.completed);
	
	if (storyStep.checklist.allCompleted) {
		console.log(`✅ [Story Checklist] Checklist completado para historia: ${storyStep.story.name}`);
	}

	return plan;
}

/**
 * Obtiene el checklist de una historia específica
 */
export function getStoryChecklist(
	plan: StoryBasedImplementationPlan,
	storyId: string
): StoryChecklist | null {
	const storyStep = plan.storySteps.find(step => step.story.id === storyId);
	return storyStep?.checklist || null;
}


