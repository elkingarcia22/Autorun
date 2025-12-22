/**
 * Tool: autorun.storybook.build
 *
 * Construye Storybook estático
 */

import { AutorunStorybookBuildInput, AutorunStorybookBuildOutput } from '../types.js';
import { AddonOrchestrator } from '../helpers/addonOrchestrator.js';

/**
 * Construye Storybook estático
 */
export async function autorunStorybookBuild(
	input: AutorunStorybookBuildInput = {},
): Promise<AutorunStorybookBuildOutput> {
	console.log(`\n📚 [Autorun MCP] autorun.storybook.build() llamado`);

	try {
		const orchestrator = new AddonOrchestrator();
		const hub = await orchestrator.getHub();
		const storybookAddon = hub.getAddon('storybook');

		if (!storybookAddon) {
			return {
				success: false,
				error: 'Storybook Add-on no está disponible',
				message: 'El add-on de Storybook no está instalado o no está activo',
			};
		}

		if (!storybookAddon.isActive()) {
			await storybookAddon.activate();
		}

		const services = storybookAddon.getServices();
		if (!services || !services.build) {
			return {
				success: false,
				error: 'Servicio de Storybook no disponible',
				message: 'El servicio build() no está disponible en el add-on de Storybook',
			};
		}

		// Construir Storybook
		console.log(`   Construyendo Storybook estático...`);
		const buildResult = await services.build({
			outputDir: input.outputDir,
		});

		return {
			success: true,
			outputDir: buildResult.outputDir,
			message: `Storybook construido exitosamente en ${buildResult.outputDir}`,
		};
	} catch (error: any) {
		console.error(`   ❌ Error construyendo Storybook: ${error.message}`);
		return {
			success: false,
			error: error.message,
			message: `No se pudo construir Storybook: ${error.message}`,
		};
	}
}
