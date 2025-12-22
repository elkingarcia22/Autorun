/**
 * Tool: autorun.github.commit
 *
 * Hace commit manual de archivos en GitHub
 */

import { AutorunGitHubCommitInput, AutorunGitHubCommitOutput } from '../types.js';
import { AddonOrchestrator } from '../helpers/addonOrchestrator.js';

/**
 * Hace commit manual
 */
export async function autorunGitHubCommit(
	input: AutorunGitHubCommitInput,
): Promise<AutorunGitHubCommitOutput> {
	console.log(`\n🔧 [Autorun MCP] autorun.github.commit() llamado`);
	console.log(`   Archivos: ${input.files.join(', ')}`);
	console.log(`   Mensaje: ${input.message}`);

	try {
		const orchestrator = new AddonOrchestrator();
		const hub = await orchestrator.getHub();
		const githubAddon = hub.getAddon('github');

		if (!githubAddon || !githubAddon.isActive()) {
			return {
				success: false,
				error: 'GitHub Add-on no está disponible',
				message: 'El add-on de GitHub no está instalado o no está activo',
			};
		}

		const services = githubAddon.getServices();
		if (!services || !services.commit) {
			return {
				success: false,
				error: 'Servicio de GitHub no disponible',
				message: 'El servicio commit() no está disponible en el add-on de GitHub',
			};
		}

		// Hacer commit
		console.log(`   Haciendo commit...`);
		const commitResult = await services.commit(input.files, input.message);

		let pushed = false;
		if (input.push && services.push) {
			console.log(`   Haciendo push...`);
			await services.push();
			pushed = true;
		}

		return {
			success: true,
			commitHash: commitResult.commitHash,
			pushed,
			message: `Commit realizado exitosamente${pushed ? ' y pusheado' : ''}`,
		};
	} catch (error: any) {
		console.error(`   ❌ Error haciendo commit: ${error.message}`);
		return {
			success: false,
			error: error.message,
			message: `No se pudo hacer commit: ${error.message}`,
		};
	}
}
