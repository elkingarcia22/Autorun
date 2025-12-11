/**
 * Implementation Dashboard
 *
 * Dashboard visual de progreso para implementación por historias
 */

import {
	createProgressDashboard,
	updateStoryProgress,
	generateProgressDashboard,
	generateProgressSummary,
	saveStateSnapshot,
	restoreStateSnapshot,
	cleanupSnapshots,
	type ImplementationProgress,
	type ProgressDashboard,
} from './implementationProgress';

export class ImplementationDashboard {
	private progress: ImplementationProgress | null = null;
	private filePath: string;

	constructor(filePath: string) {
		this.filePath = filePath;
	}

	/**
	 * Inicia el dashboard para un componente
	 */
	async start(componentName: string, totalStories: number): Promise<void> {
		this.progress = createProgressDashboard(componentName, totalStories);
		console.log(`\n📊 Dashboard iniciado para: ${componentName}`);
		console.log(`   Total de historias: ${totalStories}\n`);
	}

	/**
	 * Actualiza el progreso de una historia
	 */
	async updateStory(
		storyId: string,
		storyName: string,
		updates: {
			status?: 'pending' | 'in-progress' | 'completed' | 'failed';
			checklistCompleted?: number;
			checklistTotal?: number;
			errors?: string[];
		},
	): Promise<void> {
		if (!this.progress) {
			throw new Error('Dashboard no iniciado. Llama a start() primero.');
		}

		// Guardar snapshot antes de actualizar (si está empezando)
		if (
			updates.status === 'in-progress' &&
			!this.progress.stories.find((s) => s.storyId === storyId)
		) {
			const snapshotPath = await saveStateSnapshot(this.filePath, storyId);
			if (snapshotPath) {
				this.progress.stateSnapshot = snapshotPath;
			}
		}

		this.progress = updateStoryProgress(this.progress, storyId, {
			storyName,
			...updates,
		});

		// Mostrar dashboard actualizado
		const dashboard = generateProgressDashboard(this.progress);
		const summary = generateProgressSummary(dashboard);
		console.log(summary);
	}

	/**
	 * Hace rollback a la última historia exitosa
	 */
	async rollback(): Promise<boolean> {
		if (!this.progress) {
			throw new Error('Dashboard no iniciado.');
		}

		const dashboard = generateProgressDashboard(this.progress);

		if (!dashboard.canRollback || !dashboard.lastSuccessfulStory) {
			console.error('❌ No se puede hacer rollback: No hay historias exitosas anteriores');
			return false;
		}

		const lastStory = this.progress.stories.find(
			(s) => s.storyId === dashboard.lastSuccessfulStory,
		);
		if (!lastStory) {
			console.error('❌ No se puede hacer rollback: Historia exitosa no encontrada');
			return false;
		}

		// Buscar snapshot de la última historia exitosa
		const snapshotPath = this.filePath.replace(
			/\.html$/,
			`.snapshot.${dashboard.lastSuccessfulStory}.html`,
		);

		console.log(`\n🔄 Haciendo rollback a: ${lastStory.storyName}`);
		const restored = await restoreStateSnapshot(this.filePath, snapshotPath);

		if (restored) {
			// Actualizar progreso para marcar historias después como pendientes
			const lastStoryIndex = this.progress.stories.findIndex(
				(s) => s.storyId === dashboard.lastSuccessfulStory,
			);
			if (lastStoryIndex >= 0) {
				for (let i = lastStoryIndex + 1; i < this.progress.stories.length; i++) {
					this.progress.stories[i].status = 'pending';
					this.progress.stories[i].checklistCompleted = 0;
				}
			}

			this.progress.completedStories = lastStoryIndex + 1;
			this.progress.currentStoryIndex = lastStoryIndex + 1;

			console.log(`✅ Rollback completado. Continuando desde: ${lastStory.storyName}`);
			return true;
		}

		return false;
	}

	/**
	 * Obtiene el dashboard actual
	 */
	getDashboard(): ProgressDashboard | null {
		if (!this.progress) {
			return null;
		}
		return generateProgressDashboard(this.progress);
	}

	/**
	 * Limpia snapshots antiguos
	 */
	async cleanup(): Promise<void> {
		await cleanupSnapshots(this.filePath, 3);
	}

	/**
	 * Finaliza el dashboard
	 */
	async finish(): Promise<void> {
		if (this.progress) {
			const dashboard = generateProgressDashboard(this.progress);
			const summary = generateProgressSummary(dashboard);
			console.log(`\n${summary}`);
			console.log(`\n✅ Implementación completada: ${this.progress.componentName}`);
			console.log(
				`   Historias completadas: ${this.progress.completedStories}/${this.progress.totalStories}`,
			);

			// Limpiar snapshots antiguos
			await this.cleanup();
		}
	}
}



