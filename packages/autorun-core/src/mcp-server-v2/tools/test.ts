/**
 * ✅ Tool: autorun.test - Herramienta de prueba simple
 *
 * Esta herramienta es la más simple posible para verificar que el MCP funciona
 * sin errores. Si esta falla, el problema está en el servidor base.
 */

import type { AutorunApplyInput, AutorunApplyOutput } from '../types.js';

export interface AutorunTestInput {
  message?: string;
}

export interface AutorunTestOutput {
  success: boolean;
  message: string;
  timestamp: string;
  processCwd: string;
}

/**
 * ✅ Herramienta de prueba simple
 *
 * Retorna información básica para verificar que el MCP funciona
 */
export async function autorunTest(
  input: AutorunTestInput = {}
): Promise<AutorunTestOutput> {
  console.error('🧪 [autorun.test] ========================================');
  console.error('🧪 [autorun.test] Iniciando prueba...');
  console.error(`   📝 Input recibido: ${JSON.stringify(input, null, 2)}`);
  console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);

  try {
    console.error('   ✅ [PASO 1] Verificando process.cwd()...');
    const cwd = process.cwd();
    console.error(`   ✅ [PASO 1] process.cwd() = ${cwd}`);

    console.error(
      '   ✅ [PASO 2] Verificando que podemos retornar un objeto...'
    );
    const result: AutorunTestOutput = {
      success: true,
      message:
        input.message || 'Prueba exitosa - MCP funcionando correctamente',
      timestamp: new Date().toISOString(),
      processCwd: cwd,
    };

    console.error('   ✅ [PASO 3] Resultado preparado:');
    console.error(`      - success: ${result.success}`);
    console.error(`      - message: ${result.message}`);
    console.error(`      - timestamp: ${result.timestamp}`);
    console.error(`      - processCwd: ${result.processCwd}`);

    console.error('🧪 [autorun.test] ========================================');
    return result;
  } catch (error: any) {
    console.error('❌ [autorun.test] ERROR:', error);
    console.error(`   📋 Stack: ${error.stack}`);
    console.error('🧪 [autorun.test] ========================================');

    return {
      success: false,
      message: `Error en prueba: ${error.message}`,
      timestamp: new Date().toISOString(),
      processCwd: process.cwd(),
    };
  }
}
