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
import { PhaseValidator } from '../validation/PhaseValidator';
import { ActiveStepGuide } from '../helpers/activeStepGuide';
import { guardWrite } from '../helpers/writeGuard';
import {
  shouldAutoReload,
  getTemplateUrlFromPath,
} from '../helpers/autoReloadHelper';
import * as path from 'path';

// ⚠️ CRÍTICO: Estado global para rastrear si se ejecutó handleUserMessage()
let messageStartExecuted = false;
let messageStartResult: any = null;

/**
 * ⚠️ CRÍTICO: Resetear estado al inicio de un nuevo mensaje
 *
 * Esta función debe ser llamada cuando el agente recibe un nuevo mensaje del usuario
 * para resetear el estado y permitir que se ejecute handleUserMessage() nuevamente.
 */
export function resetMessageStartState() {
  messageStartExecuted = false;
  messageStartResult = null;
  console.log(
    '🔄 [Tool Interceptor] Estado de messageStart reseteado para nuevo mensaje'
  );
}

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

  // ⚠️ CRÍTICO: Ejecutar guardWrite() automáticamente ANTES de continuar
  console.log(
    '🛡️ [Tool Interceptor] Ejecutando guardWrite() automáticamente...'
  );
  try {
    const guardResult = await guardWrite(
      filePath,
      contents,
      context?.userMessage
    );

    if (!guardResult.allowed) {
      console.error(
        `❌ [Tool Interceptor] guardWrite() BLOQUEÓ write(): ${guardResult.reason}`
      );
      console.error(
        `❌ [Tool Interceptor] Debes usar autorun.apply() o interceptedWrite() con el flujo completo`
      );
      throw new Error(`❌ IMPLEMENTACIÓN BLOQUEADA: ${guardResult.reason}`);
    }

    if (guardResult.componentName) {
      console.log(
        `✅ [Tool Interceptor] guardWrite() permitió write() para componente: ${guardResult.componentName}`
      );
      // Actualizar context con componente detectado
      if (!context) {
        context = {};
      }
      context.componentName = guardResult.componentName;
    } else {
      console.log(
        '✅ [Tool Interceptor] guardWrite() permitió write() (sin componentes detectados)'
      );
    }
  } catch (error: any) {
    // Si guardWrite lanza error, bloquear la escritura
    if (error.message.includes('IMPLEMENTACIÓN BLOQUEADA')) {
      throw error;
    }
    // Si hay otro error, continuar con advertencia
    console.warn(
      `⚠️ [Tool Interceptor] Error en guardWrite(): ${error.message}`
    );
    console.warn(
      `⚠️ [Tool Interceptor] Continuando sin guardWrite() (puede haber errores)`
    );
  }

  // ⚠️ CRÍTICO: Ejecutar executeOnMessageStart() automáticamente si no se ha ejecutado
  if (!messageStartExecuted && context?.userMessage) {
    console.log(
      '⚠️ [Tool Interceptor] executeOnMessageStart() NO se ejecutó, ejecutando automáticamente...'
    );

    try {
      const { handleUserMessage } = await import(
        '../helpers/autoMessageHandler'
      );
      messageStartResult = await handleUserMessage(context.userMessage);
      messageStartExecuted = true;

      console.log(`✅ [Tool Interceptor] executeOnMessageStart() ejecutado`);
      console.log(
        `✅ [Tool Interceptor] Componente detectado: ${messageStartResult.componentName || 'NINGUNO'}`
      );
      console.log(
        `✅ [Tool Interceptor] Bloqueado: ${messageStartResult.blocked ? 'SÍ' : 'NO'}`
      );

      if (messageStartResult.blocked) {
        console.error(
          `❌ [Tool Interceptor] IMPLEMENTACIÓN BLOQUEADA: ${messageStartResult.reason}`
        );
        throw new Error(
          `❌ IMPLEMENTACIÓN BLOQUEADA: ${messageStartResult.reason}`
        );
      }

      // Si hay mensajes MCP, el agente debe consultarlos automáticamente
      if (
        messageStartResult.mcpMessages &&
        messageStartResult.mcpMessages.length > 0
      ) {
        console.log(
          '📚 [Tool Interceptor] Mensajes MCP pendientes, el agente debe consultarlos automáticamente'
        );
        for (const mcpMsg of messageStartResult.mcpMessages) {
          console.log(
            `📚 [Tool Interceptor] [AUTORUN_STORYBOOK_MCP]${mcpMsg.componentName}:${mcpMsg.storybookId}[/AUTORUN_STORYBOOK_MCP]`
          );
        }
      }

      // Actualizar context con componente detectado si no estaba presente
      if (!context.componentName && messageStartResult.componentName) {
        context = {
          ...context,
          componentName: messageStartResult.componentName,
        };
      }

      // ⭐ NUEVO: Si hay múltiples componentes detectados (en mcpMessages),
      // actualizar context para que autoImplementationFlow los procese todos
      if (
        messageStartResult.mcpMessages &&
        messageStartResult.mcpMessages.length > 1
      ) {
        console.log(
          `📚 [Tool Interceptor] Múltiples componentes detectados: ${messageStartResult.mcpMessages.map((m: { componentName: string }) => m.componentName).join(', ')}`
        );
        // El componente principal ya está en context.componentName
        // Los adicionales se procesarán en autoImplementationFlow a través de mcpMessages
      }
    } catch (error: any) {
      console.error(
        `❌ [Tool Interceptor] Error ejecutando executeOnMessageStart(): ${error.message}`
      );
      // Continuar de todas formas, pero registrar el error
    }
  }

  // ⭐ NUEVO: Validar fase actual ANTES de continuar
  if (context?.componentName) {
    console.log(
      `🔍 [Tool Interceptor] Validando fase actual para: ${context.componentName}`
    );

    // Obtener paso activo actual
    const activeStepResult = await ActiveStepGuide.getCurrentStep(
      context.componentName
    );

    if (activeStepResult.blocked && activeStepResult.currentStep) {
      const step = activeStepResult.currentStep;
      console.error(
        `❌ [Tool Interceptor] BLOQUEADO: Debes completar el paso activo primero`
      );
      console.error(
        `❌ [Tool Interceptor] Paso requerido: ${step.description}`
      );
      console.error(
        `❌ [Tool Interceptor] Acciones requeridas: ${step.requiredActions.join(', ')}`
      );

      if (step.storybookUrl) {
        console.log(
          `📚 [Tool Interceptor] URL de Storybook: ${step.storybookUrl}`
        );
      }

      if (step.guides && step.guides.length > 0) {
        console.log(
          `📖 [Tool Interceptor] Guías requeridas: ${step.guides.join(', ')}`
        );
      }

      throw new Error(
        `❌ IMPLEMENTACIÓN BLOQUEADA: Debes completar "${step.description}" antes de continuar. Acciones requeridas: ${step.requiredActions.join('; ')}`
      );
    }

    // Validar orden de fases si estamos en una fase específica
    // (Esto se hace automáticamente en autoImplementationFlow, pero lo validamos aquí también)
    const currentPhase = await PhaseValidator.getNextRequiredPhase(
      context.componentName
    );
    if (currentPhase) {
      const phaseValidation = await PhaseValidator.validatePhaseOrder(
        context.componentName,
        currentPhase
      );
      if (!phaseValidation.valid) {
        console.error(
          `❌ [Tool Interceptor] Orden de fases inválido: ${phaseValidation.reason}`
        );
        throw new Error(
          `❌ IMPLEMENTACIÓN BLOQUEADA: ${phaseValidation.reason}`
        );
      }
    }
  }

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

  // ⭐ NUEVO: Validar estructura antes de escribir (MITIGACIÓN DE ERRORES)
  if (context?.componentName) {
    try {
      const { validateStructureBeforeWrite } = await import(
        '../helpers/storybookStructureValidator'
      );
      const { mapAndValidateComponentNameToStorybookId } = await import(
        '../helpers/storybookStories'
      );

      const componentId = await mapAndValidateComponentNameToStorybookId(
        context.componentName
      );

      console.log(
        `🔍 [Tool Interceptor] Validando estructura antes de escribir: ${componentId}`
      );

      const structureValidation = await validateStructureBeforeWrite(
        componentId,
        contents,
        context.componentName
      );

      if (!structureValidation.valid) {
        console.error(`❌ [Tool Interceptor] Validación de estructura falló:`);
        structureValidation.errors.forEach((error) => {
          console.error(`   ${error}`);
        });

        if (structureValidation.warnings.length > 0) {
          console.warn(`⚠️ [Tool Interceptor] Advertencias:`);
          structureValidation.warnings.forEach((warning) => {
            console.warn(`   ${warning}`);
          });
        }

        throw new Error(
          `❌ IMPLEMENTACIÓN BLOQUEADA: Errores de estructura detectados:\n${structureValidation.errors.join('\n')}`
        );
      }

      if (structureValidation.warnings.length > 0) {
        console.warn(`⚠️ [Tool Interceptor] Advertencias de estructura:`);
        structureValidation.warnings.forEach((warning) => {
          console.warn(`   ${warning}`);
        });
      }

      console.log(`✅ [Tool Interceptor] Validación de estructura pasó`);
    } catch (error: any) {
      // Si la validación falla, bloquear la escritura
      if (error.message.includes('IMPLEMENTACIÓN BLOQUEADA')) {
        throw error;
      }
      // Si hay otro error (ej: no se pudo consultar Storybook), continuar con advertencia
      console.warn(
        `⚠️ [Tool Interceptor] Error en validación de estructura: ${error.message}`
      );
      console.warn(
        `⚠️ [Tool Interceptor] Continuando sin validación (puede haber errores)`
      );
    }
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

  // ⚠️ CRÍTICO: ESCRIBIR el archivo realmente (SOLUCIÓN DEFINITIVA)
  console.log('✅ [Tool Interceptor] Escribiendo archivo directamente...');
  try {
    const fs = await import('fs/promises');
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, contents, 'utf-8');
    console.log(`✅ [Tool Interceptor] Archivo escrito: ${filePath}`);
  } catch (error: any) {
    console.error(
      `❌ [Tool Interceptor] Error escribiendo archivo: ${error.message}`
    );
    throw new Error(`❌ Error escribiendo archivo: ${error.message}`);
  }

  console.log('✅ [Tool Interceptor] write() completado');
  console.log(
    '✅ [Tool Interceptor] NO necesitas llamar write() después - ya está escrito'
  );
  console.log(
    '🛡️ [Tool Interceptor] ========================================\n'
  );

  // ⚠️ CRÍTICO: Auto-reload automático DESPUÉS de escribir
  if (shouldAutoReload(filePath)) {
    const templateUrl = getTemplateUrlFromPath(filePath);
    console.log(
      '\n🔄 [Tool Interceptor] ========================================'
    );
    console.log('🔄 [Tool Interceptor] AUTO-RELOAD AUTOMÁTICO ACTIVADO');
    console.log(`🔄 [Tool Interceptor] Archivo: ${filePath}`);
    console.log(`🔄 [Tool Interceptor] URL del template: ${templateUrl}`);
    console.log(
      '🔄 [Tool Interceptor] ========================================'
    );
    console.log('\n⚠️ INSTRUCCIONES AUTOMÁTICAS PARA EL AGENTE:');
    console.log(
      '1. Obtener URL actual: call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_snapshot" })'
    );
    console.log(
      '2. Recargar página: call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_navigate", arguments: { url: currentUrl } })'
    );
    console.log(
      '3. Verificar: setTimeout(() => call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_snapshot" }), 1000)'
    );
    console.log(
      '\n⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario'
    );
    console.log(
      '🔄 [Tool Interceptor] ========================================\n'
    );
  } else if (flow.autoReload) {
    console.log('🔄 [Tool Interceptor] Auto-reload activado (desde flow)');
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

  // ⚠️ CRÍTICO: Ejecutar guardWrite() automáticamente ANTES de continuar
  // (usando newString como contenido para validar)
  console.log(
    '🛡️ [Tool Interceptor] Ejecutando guardWrite() automáticamente...'
  );
  try {
    // Leer archivo actual para obtener contenido completo
    const fs = await import('fs/promises');
    let currentContent = '';
    try {
      currentContent = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      // Archivo no existe, usar solo newString
      currentContent = newString;
    }

    // Reemplazar oldString con newString para validar el contenido resultante
    const newContent = currentContent.replace(oldString, newString);

    const guardResult = await guardWrite(
      filePath,
      newContent,
      context?.userMessage
    );

    if (!guardResult.allowed) {
      console.error(
        `❌ [Tool Interceptor] guardWrite() BLOQUEÓ search_replace(): ${guardResult.reason}`
      );
      console.error(
        `❌ [Tool Interceptor] Debes usar autorun.apply() o interceptedSearchReplace() con el flujo completo`
      );
      throw new Error(`❌ IMPLEMENTACIÓN BLOQUEADA: ${guardResult.reason}`);
    }

    if (guardResult.componentName) {
      console.log(
        `✅ [Tool Interceptor] guardWrite() permitió search_replace() para componente: ${guardResult.componentName}`
      );
      // Actualizar context con componente detectado
      if (!context) {
        context = {};
      }
      context.componentName = guardResult.componentName;
    } else {
      console.log(
        '✅ [Tool Interceptor] guardWrite() permitió search_replace() (sin componentes detectados)'
      );
    }
  } catch (error: any) {
    // Si guardWrite lanza error, bloquear la escritura
    if (error.message.includes('IMPLEMENTACIÓN BLOQUEADA')) {
      throw error;
    }
    // Si hay otro error, continuar con advertencia
    console.warn(
      `⚠️ [Tool Interceptor] Error en guardWrite(): ${error.message}`
    );
    console.warn(
      `⚠️ [Tool Interceptor] Continuando sin guardWrite() (puede haber errores)`
    );
  }

  // ⚠️ CRÍTICO: Ejecutar handleUserMessage() automáticamente si no se ha ejecutado
  if (!messageStartExecuted && context?.userMessage) {
    console.log(
      '⚠️ [Tool Interceptor] handleUserMessage() NO se ejecutó, ejecutando automáticamente...'
    );

    try {
      const { handleUserMessage } = await import(
        '../helpers/autoMessageHandler'
      );
      messageStartResult = await handleUserMessage(context.userMessage);
      messageStartExecuted = true;

      console.log(`✅ [Tool Interceptor] handleUserMessage() ejecutado`);
      console.log(
        `✅ [Tool Interceptor] Componente detectado: ${messageStartResult.componentName || 'NINGUNO'}`
      );
      console.log(
        `✅ [Tool Interceptor] Bloqueado: ${messageStartResult.blocked ? 'SÍ' : 'NO'}`
      );

      if (messageStartResult.blocked) {
        console.error(
          `❌ [Tool Interceptor] IMPLEMENTACIÓN BLOQUEADA: ${messageStartResult.reason}`
        );
        throw new Error(
          `❌ IMPLEMENTACIÓN BLOQUEADA: ${messageStartResult.reason}`
        );
      }

      // Si hay mensajes MCP, el agente debe consultarlos automáticamente
      if (
        messageStartResult.mcpMessages &&
        messageStartResult.mcpMessages.length > 0
      ) {
        console.log(
          '📚 [Tool Interceptor] Mensajes MCP pendientes, el agente debe consultarlos automáticamente'
        );
        for (const mcpMsg of messageStartResult.mcpMessages) {
          console.log(
            `📚 [Tool Interceptor] [AUTORUN_STORYBOOK_MCP]${mcpMsg.componentName}:${mcpMsg.storybookId}[/AUTORUN_STORYBOOK_MCP]`
          );
        }
      }

      // Actualizar context con componente detectado si no estaba presente
      if (!context.componentName && messageStartResult.componentName) {
        context = {
          ...context,
          componentName: messageStartResult.componentName,
        };
      }

      // ⭐ NUEVO: Si hay múltiples componentes detectados (en mcpMessages),
      // actualizar context para que autoImplementationFlow los procese todos
      if (
        messageStartResult.mcpMessages &&
        messageStartResult.mcpMessages.length > 1
      ) {
        console.log(
          `📚 [Tool Interceptor] Múltiples componentes detectados: ${messageStartResult.mcpMessages.map((m: { componentName: string }) => m.componentName).join(', ')}`
        );
        // El componente principal ya está en context.componentName
        // Los adicionales se procesarán en autoImplementationFlow a través de mcpMessages
      }
    } catch (error: any) {
      console.error(
        `❌ [Tool Interceptor] Error ejecutando handleUserMessage(): ${error.message}`
      );
      // Continuar de todas formas, pero registrar el error
    }
  }

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

  // ⚠️ CRÍTICO: ESCRIBIR el archivo realmente (SOLUCIÓN DEFINITIVA)
  console.log('✅ [Tool Interceptor] Escribiendo archivo directamente...');
  try {
    const fs = await import('fs/promises');
    let currentContent = '';
    try {
      currentContent = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      // Archivo no existe, usar solo newString
      currentContent = newString;
    }

    // Reemplazar oldString con newString
    const newContent = currentContent.replace(oldString, newString);

    // Escribir archivo
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, newContent, 'utf-8');
    console.log(`✅ [Tool Interceptor] Archivo escrito: ${filePath}`);
  } catch (error: any) {
    console.error(
      `❌ [Tool Interceptor] Error escribiendo archivo: ${error.message}`
    );
    throw new Error(`❌ Error escribiendo archivo: ${error.message}`);
  }

  console.log('✅ [Tool Interceptor] search_replace() completado');
  console.log(
    '✅ [Tool Interceptor] NO necesitas llamar search_replace() después - ya está escrito'
  );
  console.log(
    '🛡️ [Tool Interceptor] ========================================\n'
  );

  // ⚠️ CRÍTICO: Auto-reload automático DESPUÉS de escribir
  if (shouldAutoReload(filePath)) {
    const templateUrl = getTemplateUrlFromPath(filePath);
    console.log(
      '\n🔄 [Tool Interceptor] ========================================'
    );
    console.log('🔄 [Tool Interceptor] AUTO-RELOAD AUTOMÁTICO ACTIVADO');
    console.log(`🔄 [Tool Interceptor] Archivo: ${filePath}`);
    console.log(`🔄 [Tool Interceptor] URL del template: ${templateUrl}`);
    console.log(
      '🔄 [Tool Interceptor] ========================================'
    );
    console.log('\n⚠️ INSTRUCCIONES AUTOMÁTICAS PARA EL AGENTE:');
    console.log(
      '1. Obtener URL actual: call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_snapshot" })'
    );
    console.log(
      '2. Recargar página: call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_navigate", arguments: { url: currentUrl } })'
    );
    console.log(
      '3. Verificar: setTimeout(() => call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_snapshot" }), 1000)'
    );
    console.log(
      '\n⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario'
    );
    console.log(
      '🔄 [Tool Interceptor] ========================================\n'
    );
  } else if (flow.autoReload) {
    console.log('🔄 [Tool Interceptor] Auto-reload activado (desde flow)');
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
