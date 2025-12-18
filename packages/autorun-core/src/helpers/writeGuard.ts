/**
 * Write Guard
 *
 * ⚠️ CRÍTICO: Sistema que BLOQUEA write() directo cuando detecta componentes UBITS
 * y fuerza el uso de autorun.apply() o interceptedWrite()
 *
 * Este guard se ejecuta ANTES de cualquier write() para garantizar
 * que los componentes se implementen usando el flujo automático.
 */

import {
  autoInterceptWrite,
  AutoWriteInterceptorResult,
} from './autoWriteInterceptor';

/**
 * ⚠️ CRÍTICO: Guard que debe ejecutarse ANTES de write()
 *
 * Detecta componentes UBITS en el contenido y:
 * - Si detecta componente → BLOQUEA write() y fuerza uso de autorun.apply() o interceptedWrite()
 * - Si NO detecta componente → Permite write() directo
 *
 * @param filePath - Ruta del archivo
 * @param content - Contenido que se va a escribir
 * @param userMessage - Mensaje del usuario (opcional)
 * @returns Resultado del guard
 */
export async function guardWrite(
  filePath: string,
  content: string,
  userMessage?: string
): Promise<{
  allowed: boolean;
  reason?: string;
  componentName?: string;
  componentId?: string;
  useAutorunApply?: boolean;
  useInterceptedWrite?: boolean;
  errors?: string[];
  warnings?: string[];
}> {
  console.log('\n🛡️ [Write Guard] ========================================');
  console.log('🛡️ [Write Guard] Verificando si write() debe ser bloqueado...');

  // 1. Ejecutar interceptor automático
  const interceptResult = await autoInterceptWrite(
    filePath,
    content,
    userMessage
  );

  // 2. Si NO debe interceptar, permitir write() directo
  if (!interceptResult.shouldIntercept) {
    if (interceptResult.componentName) {
      console.warn(
        `⚠️ [Write Guard] Componente ${interceptResult.componentName} detectado, pero validación pasó.`
      );
      console.warn(
        `⚠️ [Write Guard] Se recomienda usar autorun.apply() o interceptedWrite() para mejor experiencia.`
      );
      if (interceptResult.warnings && interceptResult.warnings.length > 0) {
        interceptResult.warnings.forEach((warning) => {
          console.warn(`   ${warning}`);
        });
      }
    }

    return {
      allowed: true,
      componentName: interceptResult.componentName,
      componentId: interceptResult.componentId,
      warnings: interceptResult.warnings,
    };
  }

  // 3. Si debe interceptar, BLOQUEAR write() y forzar flujo automático
  console.error(
    `❌ [Write Guard] write() BLOQUEADO para componente: ${interceptResult.componentName}`
  );
  console.error(`❌ [Write Guard] Razón: ${interceptResult.reason}`);

  if (interceptResult.errors && interceptResult.errors.length > 0) {
    console.error(`❌ [Write Guard] Errores:`);
    interceptResult.errors.forEach((error) => {
      console.error(`   ${error}`);
    });
  }

  if (interceptResult.warnings && interceptResult.warnings.length > 0) {
    console.warn(`⚠️ [Write Guard] Advertencias:`);
    interceptResult.warnings.forEach((warning) => {
      console.warn(`   ${warning}`);
    });
  }

  // 4. Instrucciones para usar flujo automático
  console.log(`\n💡 [Write Guard] SOLUCIÓN: Usar flujo automático`);
  console.log(`\n   OPCIÓN 1: Usar autorun.apply() (RECOMENDADO):`);
  console.log(`   call_mcp_tool({`);
  console.log(`     server: 'project-0-Autorun-autorun',`);
  console.log(`     toolName: 'autorun.apply',`);
  console.log(`     arguments: {`);
  console.log(
    `       message: '${userMessage || `Implementar ${interceptResult.componentName}`}',`
  );
  console.log(`       targetFiles: ['${filePath}']`);
  console.log(`     }`);
  console.log(`   })`);

  console.log(`\n   OPCIÓN 2: Usar interceptedWrite():`);
  console.log(
    `   import { interceptedWrite } from '@autorun/core/interceptors/toolInterceptors';`
  );
  console.log(`   await interceptedWrite(`);
  console.log(`     '${filePath}',`);
  console.log(`     content,`);
  console.log(`     {`);
  console.log(`       componentName: '${interceptResult.componentName}',`);
  console.log(
    `       userMessage: '${userMessage || `Implementar ${interceptResult.componentName}`}'`
  );
  console.log(`     }`);
  console.log(`   );`);

  return {
    allowed: false,
    reason:
      interceptResult.reason ||
      `Componente ${interceptResult.componentName} detectado. Debe usar autorun.apply() o interceptedWrite()`,
    componentName: interceptResult.componentName,
    componentId: interceptResult.componentId,
    useAutorunApply: true,
    useInterceptedWrite: true,
    errors: interceptResult.errors,
    warnings: interceptResult.warnings,
  };
}
