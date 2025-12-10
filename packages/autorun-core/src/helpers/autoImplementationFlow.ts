/**
 * Auto Implementation Flow
 *
 * Sistema automático que:
 * 1. Intercepta write() y search_replace() para ejecutar PreWriteValidator
 * 2. Genera plan de implementación automáticamente
 * 3. Navega a Storybook automáticamente
 * 4. Recarga automáticamente después de escribir
 */

import { getAutorunHub } from '@autorun/core';
import { PreWriteValidator } from '../validation/PreWriteValidator';
import {
  detectComponentFromContent,
  detectComponentFromMessage,
} from './implementationHelpers';
import { buildSafeStorybookUrl } from './verifyStorybookStories';
import { mapComponentNameToStorybookId } from './componentHelpers';
import * as path from 'path';

/**
 * ⚠️ CRÍTICO: Interceptar write() y search_replace() automáticamente
 *
 * Este helper DEBE ser llamado ANTES de usar write() o search_replace()
 * para ejecutar todas las validaciones y acciones automáticas.
 */
export async function autoImplementationFlow(
  filePath: string,
  content: string,
  oldString?: string,
  context?: {
    componentName?: string;
    userMessage?: string;
  }
): Promise<{
  canWrite: boolean;
  reason?: string;
  storybookUrl?: string;
  plan?: any;
  autoReload?: boolean;
}> {
  console.log(
    '\n🚀 [Auto Implementation Flow] ========================================'
  );
  console.log('🚀 [Auto Implementation Flow] Iniciando flujo automático');
  console.log(`🚀 [Auto Implementation Flow] Archivo: ${filePath}`);
  console.log(`🚀 [Auto Implementation Flow] Contexto:`, context);

  // 1. Detectar componente
  let componentName = context?.componentName;
  if (!componentName) {
    componentName = detectComponentFromContent(content) || undefined;
  }
  if (!componentName && context?.userMessage) {
    componentName =
      detectComponentFromMessage(context.userMessage) || undefined;
  }

  console.log(
    `🚀 [Auto Implementation Flow] Componente detectado: ${componentName || 'NINGUNO'}`
  );

  // 2. Si hay componente, ejecutar flujo completo
  if (componentName) {
    console.log(
      `🚀 [Auto Implementation Flow] Ejecutando flujo para componente: ${componentName}`
    );

    // 2.1 Validar con PreWriteValidator
    console.log(
      `🚀 [Auto Implementation Flow] Validando con PreWriteValidator...`
    );
    const validation = await PreWriteValidator.validateBeforeWrite(
      filePath,
      content,
      {
        componentName,
        userMessage: context?.userMessage,
      }
    );

    if (!validation.valid) {
      console.error(`❌ [Auto Implementation Flow] Validación falló`);
      console.error(
        `❌ [Auto Implementation Flow] Errores:`,
        validation.errors
      );

      // 2.2 Obtener URL de Storybook para navegar automáticamente
      let storybookUrl: string | undefined;
      try {
        const urlResult = await buildSafeStorybookUrl(componentName, 'default');
        storybookUrl = urlResult.url;
        console.log(
          `📚 [Auto Implementation Flow] URL de Storybook: ${storybookUrl}`
        );
      } catch (error) {
        console.error(
          `❌ [Auto Implementation Flow] Error obteniendo URL de Storybook:`,
          error
        );
      }

      // 2.3 Obtener plan de implementación
      let plan: any = undefined;
      try {
        const hub = await getAutorunHub();
        const preCheckAddon = hub?.getAddon('pre-implementation-check');
        if (preCheckAddon) {
          const componentId = mapComponentNameToStorybookId(componentName);
          plan = await (preCheckAddon as any).getOrCreateStoryBasedPlan?.(
            componentName,
            componentId
          );
          console.log(
            `📋 [Auto Implementation Flow] Plan obtenido: ${plan ? 'SÍ' : 'NO'}`
          );
        }
      } catch (error) {
        console.error(
          `❌ [Auto Implementation Flow] Error obteniendo plan:`,
          error
        );
      }

      return {
        canWrite: false,
        reason: validation.errors.join('\n'),
        storybookUrl,
        plan,
        autoReload: false,
      };
    }

    console.log(`✅ [Auto Implementation Flow] Validación pasada`);
  } else {
    console.log(
      `ℹ️ [Auto Implementation Flow] No se detectó componente, saltando validaciones`
    );
  }

  // 3. Verificar si debe recargarse automáticamente
  const shouldReload =
    filePath.includes('prototypes/') &&
    (filePath.endsWith('.html') ||
      filePath.endsWith('.js') ||
      filePath.endsWith('.css'));

  console.log(
    `🔄 [Auto Implementation Flow] ¿Debe recargarse?: ${shouldReload}`
  );

  return {
    canWrite: true,
    autoReload: shouldReload,
  };
}

/**
 * Obtener URL del template desde la ruta del archivo
 */
export function getTemplateUrlFromPath(filePath: string): string {
  const fileName = path.basename(filePath);
  return `http://localhost:3000/${fileName}`;
}

/**
 * Instrucciones para el agente sobre cómo usar el flujo automático
 */
export const AUTO_IMPLEMENTATION_FLOW_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Flujo Automático de Implementación

ANTES de usar write() o search_replace() para implementar un componente, DEBES:

1. Llamar a autoImplementationFlow():
   const flow = await autoImplementationFlow(filePath, content, oldString, { componentName, userMessage });

2. Si flow.canWrite === false:
   - ❌ NO usar write() o search_replace()
   - 📚 Navegar a Storybook: await mcp_cursor-ide-browser_browser_navigate({ url: flow.storybookUrl })
   - 📋 Revisar plan: flow.plan
   - ✅ Completar checklist antes de continuar

3. Si flow.canWrite === true:
   - ✅ Usar write() o search_replace() normalmente
   - 🔄 Si flow.autoReload === true, recargar automáticamente después de escribir

4. Después de escribir (si flow.autoReload === true):
   - Obtener URL actual: const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
   - Recargar: await mcp_cursor-ide-browser_browser_navigate({ url: snapshot?.url || getTemplateUrlFromPath(filePath) });
   - Esperar: setTimeout(async () => { await mcp_cursor-ide-browser_browser_snapshot(); }, 1000);

⚠️ IMPORTANTE:
- NO preguntes al usuario si debe ejecutarse el flujo
- NO esperes confirmación
- Ejecuta automáticamente antes de escribir
- Esto garantiza que se sigan todos los pasos obligatorios
`;
