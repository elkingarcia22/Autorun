/**
 * Execute On Message Start
 *
 * ⚠️ CRÍTICO: Sistema que se ejecuta automáticamente al inicio de cada mensaje
 * para garantizar que se sigan todos los pasos obligatorios.
 *
 * Este sistema DEBE ejecutarse al inicio de cada mensaje del usuario.
 */

import { executeAutoDetectionOnMessage } from './autoComponentDetection';
import { getAutorunHub } from '../AutorunAgent';
import { KeywordTriggerSystem } from './keywordTriggerSystem';

export interface MessageStartResult {
  detected: boolean;
  componentName?: string;
  currentPhase?: string;
  nextPhase?: string;
  blocked: boolean;
  reason?: string;
  plan?: any;
  verification?: any;
  shouldExecuteFlow: boolean;
}

/**
 * ⚠️ CRÍTICO: Ejecutar automáticamente al inicio de cada mensaje
 *
 * Esta función DEBE llamarse al inicio de cada mensaje del usuario.
 * Detecta componentes, verifica fases y bloquea si es necesario.
 *
 * @param userMessage Mensaje completo del usuario
 * @returns Resultado con información de detección y bloqueo
 */
export async function executeOnMessageStart(
  userMessage: string
): Promise<MessageStartResult> {
  console.log(
    '\n🚀 [Execute On Message Start] ========================================'
  );
  console.log('🚀 [Execute On Message Start] Ejecutando al inicio del mensaje');
  console.log(
    `🚀 [Execute On Message Start] Mensaje: ${userMessage.substring(0, 100)}...`
  );

  // 0. Detectar triggers de palabras clave PRIMERO
  console.log(
    `🔍 [Execute On Message Start] Detectando triggers de palabras clave...`
  );
  const triggerResult =
    await KeywordTriggerSystem.executeTriggerSystem(userMessage);

  if (triggerResult.triggered && triggerResult.blocked) {
    console.error(
      `❌ [Execute On Message Start] BLOQUEADO por trigger: ${triggerResult.reason}`
    );
    return {
      detected: triggerResult.componentName !== undefined,
      componentName: triggerResult.componentName,
      blocked: true,
      reason: triggerResult.reason,
      shouldExecuteFlow: false,
    };
  }

  // 1. Detección automática
  const detection = await executeAutoDetectionOnMessage(userMessage);

  if (!detection.detected) {
    console.log(
      '✅ [Execute On Message Start] No se detectó componente, continuando normalmente'
    );
    return {
      detected: false,
      blocked: false,
      shouldExecuteFlow: false,
    };
  }

  console.log(
    `✅ [Execute On Message Start] Componente detectado: ${detection.componentName}`
  );

  // 1.5. ⚠️ CRÍTICO: Emitir mensaje para consultar Storybook MCP automáticamente
  // El agente debe interceptar este mensaje y consultar Storybook MCP
  if (detection.componentName) {
    const { mapComponentNameToStorybookId } = await import(
      './storybookStories'
    );
    const storybookId = await mapComponentNameToStorybookId(
      detection.componentName
    );

    console.log(
      '\n📚 [Execute On Message Start] ========================================'
    );
    console.log(
      '📚 [Execute On Message Start] ⚠️ OBLIGATORIO: Consultar Storybook MCP'
    );
    console.log(
      `📚 [Execute On Message Start] Componente: ${detection.componentName}`
    );
    console.log(`📚 [Execute On Message Start] ID Storybook: ${storybookId}`);
    console.log(
      `[AUTORUN_STORYBOOK_MCP]${detection.componentName}:${storybookId}[/AUTORUN_STORYBOOK_MCP]`
    );
    console.log(
      '📚 [Execute On Message Start] El agente DEBE ejecutar automáticamente:'
    );
    console.log(`   call_mcp_tool({`);
    // Obtener Storybook activo para determinar servidor MCP
    try {
      const { StorybookManager } = await import('./storybookManager');
      const manager = StorybookManager.getInstance();
      const activeConfig = await manager.getActiveConfig();

      let mcpServer = 'storybook-ubits'; // Default
      if (activeConfig) {
        mcpServer = 'storybook-ubits'; // Mismo servidor, pero URL diferente en configuración
        console.log(
          `📚 [Execute On Message Start] Storybook activo: ${activeConfig.name} (${activeConfig.url})`
        );
        console.log(
          `📚 [Execute On Message Start] ⚠️ IMPORTANTE: El servidor MCP debe estar configurado con STORYBOOK_URL=${activeConfig.url}/index.json`
        );
      }
      console.log(`     server: "${mcpServer}",`);
    } catch (error) {
      // Si no se puede obtener Storybook activo, usar default
      console.log(`     server: "storybook-ubits",`);
    }
    console.log(`     toolName: "mcp_storybook_getComponentsProps",`);
    console.log(`     arguments: { componentIds: ["${storybookId}"] }`);
    console.log(`   })`);
    console.log(
      '📚 [Execute On Message Start] ========================================\n'
    );
  }

  // 2. Verificar con Pre-Implementation Check add-on
  let blocked = false;
  let reason: string | undefined = undefined;
  let currentPhase: string | undefined = undefined;
  let nextPhase: string | undefined = undefined;

  try {
    const hub = await getAutorunHub();
    if (hub) {
      const preCheckAddon = hub.getAddon('pre-implementation-check');
      if (preCheckAddon) {
        console.log(
          `🔍 [Execute On Message Start] Verificando con Pre-Implementation Check...`
        );
        const verification = await (preCheckAddon as any).verifyOnDetection?.(
          detection.componentName!
        );

        if (verification?.blocked) {
          blocked = true;
          reason = verification.reason;
          console.error(
            `❌ [Execute On Message Start] IMPLEMENTACIÓN BLOQUEADA: ${reason}`
          );
        } else {
          console.log(
            `✅ [Execute On Message Start] Verificación pasada, continuando...`
          );
        }
      } else {
        console.warn(
          `⚠️ [Execute On Message Start] Pre-Implementation Check add-on no está disponible`
        );
      }
    } else {
      console.warn(
        `⚠️ [Execute On Message Start] AutorunHub no está inicializado`
      );
    }
  } catch (error) {
    console.error(`❌ [Execute On Message Start] Error verificando:`, error);
  }

  // 3. Verificar fase actual (si hay plan)
  if (detection.plan && !blocked) {
    // TODO: Implementar verificación de fases cuando PhaseValidator esté listo
    // const phaseCheck = await PhaseValidator.checkCurrentPhase(detection.componentName!);
    // if (phaseCheck.blocked) {
    //   blocked = true;
    //   reason = phaseCheck.reason;
    //   currentPhase = phaseCheck.currentPhase;
    //   nextPhase = phaseCheck.nextPhase;
    // }
  }

  return {
    detected: true,
    componentName: detection.componentName,
    currentPhase,
    nextPhase,
    blocked,
    reason,
    plan: detection.plan,
    verification: detection.verification,
    shouldExecuteFlow: detection.shouldExecuteFlow && !blocked,
  };
}

/**
 * ⚠️ CRÍTICO: Instrucciones para el agente
 *
 * Este sistema DEBE ejecutarse al inicio de cada mensaje del usuario.
 */
export const EXECUTE_ON_MESSAGE_START_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Ejecutar al Inicio de Cada Mensaje

AL INICIO de cada mensaje del usuario, DEBES:

1. Llamar a executeOnMessageStart():
   const result = await executeOnMessageStart(userMessage);

2. Si result.blocked === true:
   - ❌ NO continuar con la implementación
   - 📋 Mostrar razón: result.reason
   - 📚 Mostrar plan si está disponible: result.plan
   - ✅ Completar pasos faltantes antes de continuar

3. Si result.detected === true y result.blocked === false:
   - ✅ Continuar con la implementación
   - 📋 Usar plan si está disponible: result.plan
   - 🔄 Seguir el flujo automático normalmente

⚠️ IMPORTANTE:
- NO preguntes al usuario si debe ejecutarse
- NO esperes confirmación
- Ejecuta automáticamente al inicio
- Esto garantiza que se sigan todos los pasos obligatorios
`;
