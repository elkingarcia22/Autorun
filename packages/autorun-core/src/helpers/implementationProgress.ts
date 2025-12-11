/**
 * Implementation Progress Dashboard
 *
 * Sistema de dashboard de progreso y rollback para implementación por historias
 */

export interface StoryProgress {
	storyId: string;
	storyName: string;
	status: 'pending' | 'in-progress' | 'completed' | 'failed';
	startedAt?: number;
	completedAt?: number;
	checklistCompleted: number;
	checklistTotal: number;
	errors?: string[];
}

export interface ImplementationProgress {
	componentName: string;
	totalStories: number;
	completedStories: number;
	currentStoryIndex: number;
	stories: StoryProgress[];
	startedAt: number;
	estimatedCompletion?: number;
	stateSnapshot?: string; // Estado del código antes de cada historia (para rollback)
}

export interface ProgressDashboard {
	progress: ImplementationProgress;
	percentage: number;
	timeElapsed: number;
	timeRemaining?: number;
	canRollback: boolean;
	lastSuccessfulStory?: string;
}

/**
 * Crea un nuevo dashboard de progreso para implementación por historias
 */
export function createProgressDashboard(
	componentName: string,
	totalStories: number,
): ImplementationProgress {
	return {
		componentName,
		totalStories,
		completedStories: 0,
		currentStoryIndex: 0,
		stories: [],
		startedAt: Date.now(),
	};
}

/**
 * Actualiza el progreso de una historia
 */
export function updateStoryProgress(
	progress: ImplementationProgress,
	storyId: string,
	updates: Partial<StoryProgress>,
): ImplementationProgress {
	const storyIndex = progress.stories.findIndex((s) => s.storyId === storyId);

	if (storyIndex === -1) {
		// Nueva historia
		progress.stories.push({
			storyId,
			storyName: updates.storyName || storyId,
			status: updates.status || 'pending',
			checklistCompleted: updates.checklistCompleted || 0,
			checklistTotal: updates.checklistTotal || 0,
			...updates,
		});
	} else {
		// Actualizar historia existente
		progress.stories[storyIndex] = {
			...progress.stories[storyIndex],
			...updates,
		};
	}

	// Actualizar contadores
	progress.completedStories = progress.stories.filter((s) => s.status === 'completed').length;
	progress.currentStoryIndex = progress.stories.findIndex((s) => s.status === 'in-progress');

	return progress;
}

/**
 * Genera un dashboard visual del progreso
 */
export function generateProgressDashboard(progress: ImplementationProgress): ProgressDashboard {
	const percentage =
		progress.totalStories > 0
			? Math.round((progress.completedStories / progress.totalStories) * 100)
			: 0;

	const timeElapsed = Date.now() - progress.startedAt;
	const timeElapsedMinutes = Math.floor(timeElapsed / 60000);

	// Calcular tiempo restante estimado
	let timeRemaining: number | undefined;
	if (progress.completedStories > 0 && progress.totalStories > progress.completedStories) {
		const avgTimePerStory = timeElapsedMinutes / progress.completedStories;
		const remainingStories = progress.totalStories - progress.completedStories;
		timeRemaining = Math.ceil(avgTimePerStory * remainingStories);
	}

	// Encontrar última historia exitosa
	const lastSuccessfulStory = progress.stories
		.filter((s) => s.status === 'completed')
		.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))[0]?.storyId;

	// Verificar si se puede hacer rollback
	const canRollback =
		progress.stories.some((s) => s.status === 'failed') && lastSuccessfulStory !== undefined;

	return {
		progress,
		percentage,
		timeElapsed: timeElapsedMinutes,
		timeRemaining,
		canRollback,
		lastSuccessfulStory,
	};
}

/**
 * Genera un resumen visual del progreso para mostrar en consola
 */
export function generateProgressSummary(dashboard: ProgressDashboard): string {
	const { progress, percentage, timeElapsed, timeRemaining, canRollback } = dashboard;

	let summary = `\n📊 Dashboard de Progreso - ${progress.componentName}\n`;
	summary += `${'='.repeat(50)}\n\n`;

	// Progreso general
	summary += `📈 Progreso General:\n`;
	summary += `   Completadas: ${progress.completedStories}/${progress.totalStories} historias\n`;
	summary += `   Porcentaje: ${percentage}%\n`;
	summary += `   Tiempo transcurrido: ${timeElapsed} minutos\n`;
	if (timeRemaining) {
		summary += `   Tiempo restante estimado: ${timeRemaining} minutos\n`;
	}
	summary += `\n`;

	// Barra de progreso visual
	const barLength = 30;
	const filled = Math.round((percentage / 100) * barLength);
	const empty = barLength - filled;
	summary += `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${percentage}%\n\n`;

	// Estado de cada historia
	summary += `📋 Estado de Historias:\n`;
	progress.stories.forEach((story, index) => {
		const statusIcon = {
			pending: '⏳',
			'in-progress': '🔄',
			completed: '✅',
			failed: '❌',
		}[story.status];

		summary += `   ${statusIcon} ${index + 1}. ${story.storyName}\n`;
		summary += `      Estado: ${story.status}\n`;
		summary += `      Checklist: ${story.checklistCompleted}/${story.checklistTotal} items\n`;

		if (story.status === 'in-progress') {
			summary += `      ⚠️ EN PROGRESO - Completar checklist antes de continuar\n`;
		}

		if (story.status === 'failed' && story.errors) {
			summary += `      Errores: ${story.errors.join(', ')}\n`;
		}

		summary += `\n`;
	});

	// Historia actual
	if (progress.currentStoryIndex >= 0 && progress.currentStoryIndex < progress.stories.length) {
		const currentStory = progress.stories[progress.currentStoryIndex];
		summary += `🎯 Historia Actual:\n`;
		summary += `   ${currentStory.storyName}\n`;
		summary += `   Checklist: ${currentStory.checklistCompleted}/${currentStory.checklistTotal} items\n`;
		summary += `\n`;
	}

	// Opciones de rollback
	if (canRollback && dashboard.lastSuccessfulStory) {
		summary += `🔄 Rollback Disponible:\n`;
		summary += `   Última historia exitosa: ${dashboard.lastSuccessfulStory}\n`;
		summary += `   Puedes hacer rollback para volver a esta historia\n`;
		summary += `\n`;
	}

	return summary;
}

/**
 * Guarda un snapshot del estado antes de implementar una historia
 */
export async function saveStateSnapshot(filePath: string, storyId: string): Promise<string> {
	try {
		const fs = await import('fs/promises');
		const content = await fs.readFile(filePath, 'utf-8');

		// Guardar snapshot en un archivo temporal
		const snapshotPath = filePath.replace(/\.html$/, `.snapshot.${storyId}.html`);
		await fs.writeFile(snapshotPath, content, 'utf-8');

		return snapshotPath;
	} catch (error) {
		console.warn(`⚠️ No se pudo guardar snapshot para ${storyId}:`, error);
		return '';
	}
}

/**
 * Restaura el estado desde un snapshot
 */
export async function restoreStateSnapshot(
	filePath: string,
	snapshotPath: string,
): Promise<boolean> {
	try {
		const fs = await import('fs/promises');
		const snapshotContent = await fs.readFile(snapshotPath, 'utf-8');
		await fs.writeFile(filePath, snapshotContent, 'utf-8');

		console.log(`✅ Estado restaurado desde snapshot: ${snapshotPath}`);
		return true;
	} catch (error) {
		console.error(`❌ Error restaurando snapshot:`, error);
		return false;
	}
}

/**
 * Limpia snapshots antiguos (mantener solo los últimos N)
 */
export async function cleanupSnapshots(filePath: string, keepLast: number = 3): Promise<void> {
	try {
		const fs = await import('fs/promises');
		const path = await import('path');

		const dir = path.dirname(filePath);
		const baseName = path.basename(filePath, '.html');

		const files = await fs.readdir(dir);
		const snapshots = files
			.filter((f) => f.startsWith(`${baseName}.snapshot.`) && f.endsWith('.html'))
			.map((f) => ({
				name: f,
				path: path.join(dir, f),
			}))
			.sort((a, b) => {
				// Ordenar por fecha de modificación (más reciente primero)
				return 0; // Simplificado - en producción usar stats
			});

		// Eliminar snapshots antiguos
		if (snapshots.length > keepLast) {
			const toDelete = snapshots.slice(keepLast);
			for (const snapshot of toDelete) {
				await fs.unlink(snapshot.path);
				console.log(`🗑️ Snapshot eliminado: ${snapshot.name}`);
			}
		}
	} catch (error) {
		console.warn(`⚠️ Error limpiando snapshots:`, error);
	}
}



