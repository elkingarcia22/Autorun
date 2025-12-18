/**
 * Tool: autorun.visual.test
 *
 * Ejecuta tests visuales con Chromatic
 */

import { AutorunVisualTestInput, AutorunVisualTestOutput } from '../types.js';
import { AddonOrchestrator } from '../helpers/addonOrchestrator.js';

/**
 * Ejecuta tests visuales
 */
export async function autorunVisualTest(
  input: AutorunVisualTestInput = {}
): Promise<AutorunVisualTestOutput> {
  console.log(`\n🎨 [Autorun MCP] autorun.visual.test() llamado`);

  try {
    const orchestrator = new AddonOrchestrator();
    const hub = await orchestrator.getHub();
    const chromaticAddon = hub.getAddon('chromatic');

    if (!chromaticAddon || !chromaticAddon.isActive()) {
      return {
        success: false,
        passed: 0,
        failed: 0,
        new: 0,
        changed: 0,
        error: 'Chromatic Add-on no está disponible',
      };
    }

    const services = chromaticAddon.getServices();
    if (!services || !services.test) {
      return {
        success: false,
        passed: 0,
        failed: 0,
        new: 0,
        changed: 0,
        error: 'Servicio de Chromatic no disponible',
      };
    }

    // Ejecutar tests visuales
    console.log(`   Ejecutando tests visuales con Chromatic...`);
    const testResults = await services.test({
      componentId: input.componentId,
      storyId: input.storyId,
    });

    return {
      success: true,
      passed: testResults.passed || 0,
      failed: testResults.failed || 0,
      new: testResults.new || 0,
      changed: testResults.changed || 0,
      results: testResults.results,
    };
  } catch (error: any) {
    console.error(`   ❌ Error ejecutando tests visuales: ${error.message}`);
    return {
      success: false,
      passed: 0,
      failed: 0,
      new: 0,
      changed: 0,
      error: error.message,
    };
  }
}
