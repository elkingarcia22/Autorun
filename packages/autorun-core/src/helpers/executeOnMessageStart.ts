/**
 * Execute On Message Start
 *
 * ⚠️ CRÍTICO: Sistema que se ejecuta automáticamente al inicio de cada mensaje
 * para garantizar que se sigan todos los pasos obligatorios.
 *
 * Este sistema DEBE ejecutarse al inicio de cada mensaje del usuario.
 */

import { executeAutoDetectionOnMessage } from './autoComponentDetection.js';
import { getAutorunHub } from '../AutorunAgent.js';
import { KeywordTriggerSystem } from './keywordTriggerSystem.js';
import { autoDetectWizardState } from './autoWizardDetection.js';
import { detectActiveFileFromBrowser } from './activeFileDetector.js';

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
 * @param options Opciones opcionales, incluyendo skipPreCheck para saltar verificación
 * @returns Resultado con información de detección y bloqueo
 */
export async function executeOnMessageStart(
  userMessage: string,
  options?: { skipPreCheck?: boolean }
): Promise<MessageStartResult> {
  console.log(
    '\n🚀 [Execute On Message Start] ========================================'
  );
  console.log('🚀 [Execute On Message Start] Ejecutando al inicio del mensaje');
  console.log(
    `🚀 [Execute On Message Start] Mensaje: ${userMessage.substring(0, 100)}...`
  );

  // 0. ⚠️ CRÍTICO: Detectar wizard state PRIMERO (ANTES de todo)
  console.log(`🔍 [Execute On Message Start] Detectando estado del wizard...`);
  try {
    const wizardDetection = await autoDetectWizardState();
    if (wizardDetection.detected && wizardDetection.url) {
      console.log(
        `✅ [Execute On Message Start] Wizard state detectado y mensajes emitidos`
      );
      console.log(
        `📋 [Execute On Message Start] El agente debe procesar automáticamente los mensajes emitidos`
      );
    }
  } catch (error: any) {
    // No bloquear si falla la detección del wizard
    console.warn(
      `⚠️ [Execute On Message Start] Error detectando wizard state: ${error.message}`
    );
  }

  // 0.5. ⚠️ CRÍTICO: Detectar archivo activo desde el browser automáticamente
  console.log(
    `🔍 [Execute On Message Start] Detectando archivo activo desde browser...`
  );

  // Intentar usar estado guardado primero
  try {
    const { getActiveFileState } = await import('./activeFileDetector.js');
    const activeState = await getActiveFileState();

    if (activeState) {
      console.log(
        `✅ [Execute On Message Start] Archivo activo encontrado en estado guardado:`
      );
      console.log(`   - Archivo: ${activeState.fileName}`);
      console.log(`   - Ruta: ${activeState.filePath}`);
      console.log(`   - URL: ${activeState.url}`);
      console.log(
        `   - Última detección: ${new Date(activeState.lastDetected).toLocaleString()}`
      );
      console.log(
        `✅ [Execute On Message Start] Usando estado guardado (no se requiere detección nueva)`
      );
    } else {
      console.log(
        `⚠️ [Execute On Message Start] No hay estado guardado, se requiere detección nueva`
      );
      console.log(
        `⚠️ [Execute On Message Start] INSTRUCCIONES PARA EL AGENTE:`
      );
      console.log(
        `   1. Obtener URL del browser: mcp_cursor-ide-browser_browser_snapshot()`
      );
      console.log(`   2. Extraer URL del snapshot`);
      console.log(
        `   3. Llamar: autoDetectActiveFileHelper(browserUrl) (recomendado)`
      );
      console.log(
        `      O usar: detectActiveFileFromBrowser(browserUrl) directamente`
      );
      console.log(
        `   4. El estado se guarda automáticamente en .autorun/active-file.json`
      );
      console.log(
        `[AUTORUN_DETECT_ACTIVE_FILE]true[/AUTORUN_DETECT_ACTIVE_FILE]`
      );
      console.log(
        `⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario`
      );
      console.log(
        `📚 Helper disponible: packages/autorun-core/src/helpers/autoDetectActiveFileHelper.ts`
      );
    }
  } catch (error: any) {
    console.warn(
      `⚠️ [Execute On Message Start] Error leyendo estado guardado: ${error.message}`
    );
    console.log(`⚠️ [Execute On Message Start] INSTRUCCIONES PARA EL AGENTE:`);
    console.log(
      `   1. Obtener URL del browser: mcp_cursor-ide-browser_browser_snapshot()`
    );
    console.log(`   2. Extraer URL del snapshot`);
    console.log(`   3. Llamar: detectActiveFileFromBrowser(browserUrl)`);
    console.log(
      `   4. Guardar estado del archivo activo en .autorun/active-file.json`
    );
    console.log(
      `[AUTORUN_DETECT_ACTIVE_FILE]true[/AUTORUN_DETECT_ACTIVE_FILE]`
    );
    console.log(
      `⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario`
    );
  }

  // 1. Detectar triggers de palabras clave
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

      let mcpServer = 'storybook-ubits'; // ⚠️ CORREGIDO: Usar el nombre real del servidor configurado
      if (activeConfig) {
        // Si el Storybook activo es UBITS, usar 'storybook-ubits'
        if (activeConfig.id === 'ubits-storybook10-vercel-app') {
          mcpServer = 'storybook-ubits';
        } else {
          mcpServer = 'storybook'; // Fallback para otros Storybooks
        }
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

    // ⚠️ NUEVO MCP: Convertir storybookId a nombre de componente
    try {
      const { storybookIdToComponentName } = await import(
        './storybookMCPNameMapper.js'
      );
      const componentName =
        storybookIdToComponentName(storybookId) || detection.componentName;
      console.log(`     toolName: "getComponentsProps",`); // ⚠️ NUEVO MCP: Sin prefijo mcp_storybook_
      console.log(`     arguments: { componentNames: ["${componentName}"] }`); // ⚠️ NUEVO MCP: Usar componentNames
    } catch (error) {
      console.log(`     toolName: "getComponentsProps",`);
      console.log(
        `     arguments: { componentNames: ["${detection.componentName}"] }`
      );
    }
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
        // ✅ MEJORA: Pasar skipCheck=true cuando skipPreCheck está presente
        const skipCheck = options?.skipPreCheck === true;
        console.log(
          `   🔍 [Execute On Message Start] skipPreCheck=${options?.skipPreCheck}, skipCheck=${skipCheck}`
        );

        // ⚠️ CRÍTICO: Si el add-on está desactivado, ignorar completamente cualquier bloqueo
        // Esto garantiza que autorun.apply() nunca se bloquee cuando el add-on está desactivado
        const isAddonActive = preCheckAddon.isActive();
        console.log(
          `   🔍 [Execute On Message Start] Pre-Implementation Check add-on activo: ${isAddonActive}`
        );

        if (!isAddonActive) {
          console.log(
            `   ✅ [Execute On Message Start] Add-on desactivado, ignorando verificación (blocked=false)`
          );
          blocked = false;
          reason = undefined;
        } else {
          const verification = await (preCheckAddon as any).verifyOnDetection?.(
            detection.componentName!,
            skipCheck ? { skipCheck: true } : undefined
          );
          console.log(
            `   🔍 [Execute On Message Start] Resultado de verifyOnDetection:`,
            {
              blocked: verification?.blocked,
              reason: verification?.reason,
            }
          );

          if (verification?.blocked) {
            // ⚠️ CRÍTICO: Si skipCheck=true, ignorar bloqueo completamente
            // porque autorun.apply() consultará Storybook automáticamente
            if (skipCheck) {
              console.warn(
                `   ⚠️ [Execute On Message Start] verifyOnDetection retornó blocked=true pero skipCheck=true, ignorando bloqueo`
              );
              console.warn(
                `   ⚠️ [Execute On Message Start] Razón original: ${verification.reason}`
              );
              blocked = false;
              reason = undefined; // ⚠️ CRÍTICO: Limpiar reason cuando skipCheck=true
              console.log(
                `   ✅ [Execute On Message Start] Bloqueo ignorado (skipCheck=true)`
              );
            } else {
              blocked = true;
              reason = verification.reason;
              console.error(
                `❌ [Execute On Message Start] IMPLEMENTACIÓN BLOQUEADA: ${reason}`
              );
            }
          } else {
            console.log(
              `✅ [Execute On Message Start] Verificación pasada, continuando...`
            );
            // ⚠️ CRÍTICO: Si skipCheck=true, asegurar que reason esté limpio
            if (skipCheck && verification?.reason) {
              console.warn(
                `   ⚠️ [Execute On Message Start] verifyOnDetection retornó blocked=false pero reason existe, limpiando reason`
              );
              reason = undefined;
            }
          }
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
