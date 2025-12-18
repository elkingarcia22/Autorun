/**
 * Tool: autorun.storybook.start
 *
 * Inicia servidor de Storybook local
 */

import { AutorunStorybookStartInput, AutorunStorybookStartOutput } from '../types.js';
import { AddonOrchestrator } from '../helpers/addonOrchestrator.js';

/**
 * Inicia servidor de Storybook
 */
export async function autorunStorybookStart(
  input: AutorunStorybookStartInput = {}
): Promise<AutorunStorybookStartOutput> {
  console.log(`\n📚 [Autorun MCP] autorun.storybook.start() llamado`);

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
      // Intentar activar
      await storybookAddon.activate();
    }

    const services = storybookAddon.getServices();
    if (!services || !services.start) {
      return {
        success: false,
        error: 'Servicio de Storybook no disponible',
        message: 'El servicio start() no está disponible en el add-on de Storybook',
      };
    }

    // Verificar estado actual
    const status = services.getStatus ? services.getStatus() : { running: false };
    if (status.running) {
      return {
        success: true,
        url: status.url,
        port: status.port,
        message: `Storybook ya está corriendo en ${status.url}`,
      };
    }

    // Iniciar servidor
    console.log(`   Iniciando servidor de Storybook...`);
    const process = await services.start();

    return {
      success: true,
      url: process.url,
      port: process.port,
      message: `Storybook iniciado exitosamente en ${process.url}`,
    };
  } catch (error: any) {
    console.error(`   ❌ Error iniciando Storybook: ${error.message}`);
    return {
      success: false,
      error: error.message,
      message: `No se pudo iniciar Storybook: ${error.message}`,
    };
  }
}
