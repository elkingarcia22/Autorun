/**
 * Tool Interceptors
 *
 * Sistema que intercepta automáticamente write() y search_replace() para ejecutar
 * el flujo automático de implementación antes de escribir código.
 *
 * ⚠️ CRÍTICO: Este módulo debe ser importado al inicio de la sesión para que
 * las herramientas de Cursor sean interceptadas automáticamente.
 */

import {
  autoImplementationFlow,
  getTemplateUrlFromPathForFlow,
} from '../helpers/autoImplementationFlow';
import { ComponentImplementationValidator } from '../helpers/componentImplementationValidator';
import * as path from 'path';

/**
 * ⚠️ CRÍTICO: Interceptar write() automáticamente
 *
 * Este wrapper DEBE usarse en lugar de write() directo cuando se implementa un componente.
 *
 * NOTA: En Cursor, las herramientas write() y search_replace() no pueden ser interceptadas
 * directamente desde TypeScript. Este archivo proporciona la lógica que el agente DEBE
 * ejecutar manualmente antes de usar write() o search_replace().
 */
export async function interceptedWrite(
  filePath: string,
  contents: string,
  context?: {
    componentName?: string;
    userMessage?: string;
  }
): Promise<void> {
  console.log(
    '\n🛡️ [Tool Interceptor] ========================================'
  );
  console.log('🛡️ [Tool Interceptor] Interceptando write()...');
  console.log(`🛡️ [Tool Interceptor] Archivo: ${filePath}`);

  // ⭐ NUEVO: Validar implementación común ANTES del flujo automático
  const implementationValidation =
    ComponentImplementationValidator.validateImplementation(
      contents,
      context?.componentName
    );

  if (!implementationValidation.valid) {
    console.error(
      '❌ [Tool Interceptor] Errores de implementación detectados:'
    );
    implementationValidation.errors.forEach((error) => {
      console.error(`  ${error}`);
    });
    if (implementationValidation.warnings.length > 0) {
      console.warn('⚠️ [Tool Interceptor] Advertencias:');
      implementationValidation.warnings.forEach((warning) => {
        console.warn(`  ${warning}`);
      });
    }
    const suggestions = ComponentImplementationValidator.generateSuggestions(
      implementationValidation.errors,
      context?.componentName
    );
    if (suggestions.length > 0) {
      console.log('💡 [Tool Interceptor] Sugerencias:');
      suggestions.forEach((suggestion) => {
        console.log(`  ${suggestion}`);
      });
    }
    throw new Error(
      `❌ IMPLEMENTACIÓN BLOQUEADA: Errores detectados:\n${implementationValidation.errors.join('\n')}`
    );
  }

  if (implementationValidation.warnings.length > 0) {
    console.warn('⚠️ [Tool Interceptor] Advertencias de implementación:');
    implementationValidation.warnings.forEach((warning) => {
      console.warn(`  ${warning}`);
    });
  }

  // Ejecutar flujo automático ANTES de escribir
  const flow = await autoImplementationFlow(
    filePath,
    contents,
    undefined,
    context
  );

  if (!flow.canWrite) {
    console.error('❌ [Tool Interceptor] write() BLOQUEADO');
    console.error(`❌ [Tool Interceptor] Razón: ${flow.reason}`);

    // Navegar a Storybook automáticamente si hay URL
    if (flow.storybookUrl) {
      console.log(
        `📚 [Tool Interceptor] URL de Storybook: ${flow.storybookUrl}`
      );
      console.log(
        '📚 [Tool Interceptor] El agente debe navegar automáticamente a Storybook'
      );
      console.log(
        `📚 [Tool Interceptor] Usar: mcp_cursor-ide-browser_browser_navigate({ url: "${flow.storybookUrl}" })`
      );
    }

    // Mostrar plan si está disponible
    if (flow.plan) {
      console.log('📋 [Tool Interceptor] Plan de implementación disponible');
      console.log(
        `📋 [Tool Interceptor] Total de historias: ${flow.plan.totalSteps || 'N/A'}`
      );
    }

    throw new Error(`❌ IMPLEMENTACIÓN BLOQUEADA: ${flow.reason}`);
  }

  console.log('✅ [Tool Interceptor] write() permitido');
  console.log('✅ [Tool Interceptor] Proceder con write() normalmente');
  console.log(
    '🛡️ [Tool Interceptor] ========================================\n'
  );

  // Si flow.autoReload === true, el agente debe recargar después de escribir
  if (flow.autoReload) {
    console.log('🔄 [Tool Interceptor] Auto-reload activado');
    console.log(
      '🔄 [Tool Interceptor] El agente debe recargar automáticamente después de escribir'
    );
  }
}

/**
 * ⚠️ CRÍTICO: Interceptar search_replace() automáticamente
 */
export async function interceptedSearchReplace(
  filePath: string,
  oldString: string,
  newString: string,
  context?: {
    componentName?: string;
    userMessage?: string;
  }
): Promise<void> {
  console.log(
    '\n🛡️ [Tool Interceptor] ========================================'
  );
  console.log('🛡️ [Tool Interceptor] Interceptando search_replace()...');
  console.log(`🛡️ [Tool Interceptor] Archivo: ${filePath}`);

  // Ejecutar flujo automático ANTES de reemplazar
  const flow = await autoImplementationFlow(
    filePath,
    newString, // Usar newString como contenido
    oldString,
    context
  );

  if (!flow.canWrite) {
    console.error('❌ [Tool Interceptor] search_replace() BLOQUEADO');
    console.error(`❌ [Tool Interceptor] Razón: ${flow.reason}`);

    // Navegar a Storybook automáticamente si hay URL
    if (flow.storybookUrl) {
      console.log(
        `📚 [Tool Interceptor] URL de Storybook: ${flow.storybookUrl}`
      );
      console.log(
        '📚 [Tool Interceptor] El agente debe navegar automáticamente a Storybook'
      );
      console.log(
        `📚 [Tool Interceptor] Usar: mcp_cursor-ide-browser_browser_navigate({ url: "${flow.storybookUrl}" })`
      );
    }

    // Mostrar plan si está disponible
    if (flow.plan) {
      console.log('📋 [Tool Interceptor] Plan de implementación disponible');
      console.log(
        `📋 [Tool Interceptor] Total de historias: ${flow.plan.totalSteps || 'N/A'}`
      );
    }

    throw new Error(`❌ IMPLEMENTACIÓN BLOQUEADA: ${flow.reason}`);
  }

  console.log('✅ [Tool Interceptor] search_replace() permitido');
  console.log(
    '✅ [Tool Interceptor] Proceder con search_replace() normalmente'
  );
  console.log(
    '🛡️ [Tool Interceptor] ========================================\n'
  );

  // Si flow.autoReload === true, el agente debe recargar después de escribir
  if (flow.autoReload) {
    console.log('🔄 [Tool Interceptor] Auto-reload activado');
    console.log(
      '🔄 [Tool Interceptor] El agente debe recargar automáticamente después de escribir'
    );
  }
}

/**
 * Interceptar mensajes [AUTORUN_AUTO_RELOAD] automáticamente
 *
 * Esta función debe ser llamada cuando se detecta el mensaje en los logs.
 */
export async function interceptAutoReload(filePath: string): Promise<void> {
  console.log(
    '\n🔄 [Auto-Reload Interceptor] ========================================'
  );
  console.log(
    '🔄 [Auto-Reload Interceptor] Mensaje [AUTORUN_AUTO_RELOAD] detectado'
  );
  console.log(`🔄 [Auto-Reload Interceptor] Archivo: ${filePath}`);

  // Obtener URL actual del navegador
  try {
    // ⚠️ NOTA: Estas herramientas MCP deben estar disponibles en el contexto del agente
    // El agente debe ejecutar esto automáticamente cuando vea [AUTORUN_AUTO_RELOAD]
    console.log('🔄 [Auto-Reload Interceptor] El agente debe ejecutar:');
    console.log('   1. mcp_cursor-ide-browser_browser_snapshot()');
    console.log('   2. Obtener URL actual');
    console.log(
      `   3. mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })`
    );
    console.log('   4. Esperar 1 segundo y hacer snapshot nuevamente');

    const templateUrl = getTemplateUrlFromPathForFlow(filePath);
    console.log(
      `🔄 [Auto-Reload Interceptor] URL del template: ${templateUrl}`
    );
  } catch (error) {
    console.error('❌ [Auto-Reload Interceptor] Error:', error);
  }

  console.log(
    '🔄 [Auto-Reload Interceptor] ========================================\n'
  );
}

/**
 * Interceptar mensajes [AUTORUN_STORYBOOK_MCP] automáticamente
 */
export async function interceptStorybookMCP(
  componentName: string,
  componentId: string
): Promise<void> {
  console.log(
    '\n📚 [Storybook MCP Interceptor] ========================================'
  );
  console.log(
    '📚 [Storybook MCP Interceptor] Mensaje [AUTORUN_STORYBOOK_MCP] detectado'
  );
  console.log(
    `📚 [Storybook MCP Interceptor] Componente: ${componentName} (ID: ${componentId})`
  );

  console.log('📚 [Storybook MCP Interceptor] El agente debe ejecutar:');
  console.log(`   mcp_storybook_getComponentsProps(['${componentId}'])`);

  console.log(
    '📚 [Storybook MCP Interceptor] ========================================\n'
  );
}

/**
 * Instrucciones para el agente sobre cómo usar los interceptores
 */
export const TOOL_INTERCEPTOR_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Interceptores Automáticos de Herramientas

ANTES de usar write() o search_replace() para implementar un componente, DEBES:

1. Llamar a interceptedWrite() o interceptedSearchReplace():
   import { interceptedWrite, interceptedSearchReplace } from '@autorun/core/interceptors/toolInterceptors';
   
   await interceptedWrite(filePath, content, { componentName, userMessage });
   // O
   await interceptedSearchReplace(filePath, oldString, newString, { componentName, userMessage });

2. Si lanza error (bloqueado):
   - ❌ NO usar write() o search_replace()
   - 📚 Navegar automáticamente a Storybook
   - 📋 Revisar plan de implementación
   - ✅ Completar checklist antes de continuar

3. Si NO lanza error (permitido):
   - ✅ Usar write() o search_replace() normalmente
   - 🔄 Si autoReload === true, recargar automáticamente después

4. Interceptar mensajes automáticamente:
   - [AUTORUN_AUTO_RELOAD] → Llamar interceptAutoReload() y recargar
   - [AUTORUN_STORYBOOK_MCP] → Llamar interceptStorybookMCP() y consultar Storybook MCP

⚠️ IMPORTANTE:
- NO preguntes al usuario si debe ejecutarse el interceptor
- NO esperes confirmación
- Ejecuta automáticamente antes de escribir
- Esto garantiza que se sigan todos los pasos obligatorios
`;
