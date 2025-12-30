/**
 * ✅ Helper para llamar herramientas MCP de Autorun desde Node.js
 *
 * Permite que el agente o scripts internos llamen herramientas MCP de Autorun
 * directamente desde código TypeScript/JavaScript.
 *
 * ⚠️ NOTA: Esta función está diseñada para uso interno de Autorun.
 * Para uso desde el agente en Cursor, ver la documentación sobre cómo mencionar
 * las herramientas MCP en la respuesta.
 */

import { MCPClient } from './mcpClient.js';

export interface AutorunMCPToolResult {
  success: boolean;
  result?: any;
  error?: string;
}

/**
 * ✅ Llama a una herramienta MCP de Autorun
 *
 * @param toolName - Nombre de la herramienta (ej: 'autorun.handleUserMessage', 'autorun.apply')
 * @param args - Argumentos para la herramienta
 * @returns Resultado de la herramienta
 *
 * @example
 * ```typescript
 * const result = await callAutorunMCPTool('autorun.handleUserMessage', {
 *   message: 'implementar una content card'
 * });
 * ```
 */
export async function callAutorunMCPTool(
  toolName: string,
  args: any
): Promise<AutorunMCPToolResult> {
  const client = new MCPClient();

  try {
    // Conectar al servidor MCP de Autorun
    await client.connect('autorun');

    // Llamar tool usando el formato correcto de MCP
    const mcpResponse = await client.callMethod('tools/call', {
      name: toolName,
      arguments: args,
    });

    // ⚠️ CRÍTICO: Parsear respuesta de MCP
    // La respuesta puede venir en formato { content: [{ type: 'text', text: '...' }] }
    let parsedResult = mcpResponse;
    if (mcpResponse?.content && Array.isArray(mcpResponse.content)) {
      const textContent = mcpResponse.content.find(
        (c: any) => c.type === 'text'
      );
      if (textContent?.text) {
        try {
          parsedResult = JSON.parse(textContent.text);
        } catch (e) {
          // Si no es JSON, usar el texto directamente
          parsedResult = textContent.text;
        }
      }
    }

    return {
      success: true,
      result: parsedResult,
    };
  } catch (error: any) {
    console.error(
      `❌ [callAutorunMCPTool] Error llamando ${toolName}:`,
      error.message
    );
    return {
      success: false,
      error: error.message || 'Error desconocido',
    };
  } finally {
    client.disconnect();
  }
}

/**
 * ✅ Helper para llamar múltiples herramientas MCP de Autorun en secuencia
 *
 * @param calls - Array de llamadas a herramientas
 * @returns Array de resultados
 *
 * @example
 * ```typescript
 * const results = await callAutorunMCPTools([
 *   { toolName: 'autorun.handleUserMessage', args: { message: 'implementar card' } },
 *   { toolName: 'autorun.apply', args: { message: 'implementar card', targetFiles: ['file.html'] } },
 *   { toolName: 'autorun.verify', args: { targetFiles: 'diff' } }
 * ]);
 * ```
 */
export async function callAutorunMCPTools(
  calls: Array<{ toolName: string; args: any }>
): Promise<Array<AutorunMCPToolResult>> {
  const results: Array<AutorunMCPToolResult> = [];

  for (const call of calls) {
    const result = await callAutorunMCPTool(call.toolName, call.args);
    results.push(result);

    // Si una llamada falla, detener el flujo
    if (!result.success) {
      console.error(
        `❌ [callAutorunMCPTools] Flujo detenido por error en ${call.toolName}`
      );
      break;
    }
  }

  return results;
}

/**
 * ✅ Helper para ejecutar el flujo completo de implementación
 *
 * Ejecuta automáticamente: handleUserMessage → apply → verify
 *
 * @param message - Mensaje del usuario describiendo qué implementar
 * @param targetFiles - Archivos objetivo (opcional)
 * @param options - Opciones adicionales
 * @returns Resultado del flujo completo
 *
 * @example
 * ```typescript
 * const result = await executeCompleteImplementationFlow(
 *   'implementar una content card debajo del subnav',
 *   ['prototypes/file.html']
 * );
 * ```
 */
export async function executeCompleteImplementationFlow(
  message: string,
  targetFiles?: string[],
  options?: {
    mode?: 'strict' | 'prototypeTokens';
    requireStorybookMcp?: boolean;
    allowPrototypeTokens?: boolean;
  }
): Promise<{
  success: boolean;
  handleResult?: any;
  applyResult?: any;
  verifyResult?: any;
  errors: string[];
}> {
  const errors: string[] = [];

  try {
    // ⚠️ NOTA: autorun.apply() internamente ejecuta handleUserMessage con skipPreCheck: true
    // Por lo tanto, NO necesitamos ejecutar handleUserMessage por separado
    // autorun.apply() ya maneja todo el flujo automáticamente
    console.log(
      '📋 [Complete Flow] autorun.apply() ejecutará handleUserMessage internamente...'
    );

    // PASO 2: apply
    console.log('🚀 [Complete Flow] Ejecutando apply...');
    const applyResult = await callAutorunMCPTool('autorun.apply', {
      message,
      targetFiles: targetFiles || [],
      options: options || {},
    });

    if (!applyResult.success) {
      errors.push(`apply falló: ${applyResult.error}`);
      return {
        success: false,
        errors,
      };
    }

    // Extraer handleResult del applyResult si está disponible
    let handleResult = null;
    if (applyResult.result) {
      // El resultado puede venir en diferentes formatos
      if (typeof applyResult.result === 'object') {
        handleResult = applyResult.result.handleResult || applyResult.result;
      } else {
        handleResult = applyResult.result;
      }
    }

    // PASO 2: verify
    console.log('✅ [Complete Flow] Ejecutando verify...');
    const verifyResult = await callAutorunMCPTool('autorun.verify', {
      targetFiles: 'diff',
      options: { autoRevert: true },
    });

    if (!verifyResult.success) {
      errors.push(`verify falló: ${verifyResult.error}`);
    }

    return {
      success: errors.length === 0,
      handleResult: handleResult,
      applyResult: applyResult.result,
      verifyResult: verifyResult.result,
      errors,
    };
  } catch (error: any) {
    errors.push(`Error en flujo completo: ${error.message}`);
    return {
      success: false,
      errors,
    };
  }
}
