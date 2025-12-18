/**
 * Auto Write Interceptor
 *
 * ⚠️ CRÍTICO: Detecta automáticamente componentes UBITS en el contenido
 * y fuerza el uso del flujo automático (interceptedWrite o autorun.apply)
 * antes de permitir write() directo.
 *
 * Este sistema se ejecuta ANTES de cualquier write() para garantizar
 * que los componentes se implementen correctamente.
 */

import { detectComponentFromContent } from './implementationHelpers';
import { detectComponentsProactively } from './proactiveDetection';
import { consultStorybookCompleto } from './storybookParallelConsult';
import { validateStructureBeforeWrite } from './storybookStructureValidator';
import { mapAndValidateComponentNameToStorybookId } from './storybookStories';

export interface AutoWriteInterceptorResult {
  shouldIntercept: boolean;
  componentName?: string;
  componentId?: string;
  reason?: string;
  storybookInfo?: any;
  validationResult?: any;
  errors?: string[];
  warnings?: string[];
}

/**
 * Detecta automáticamente si el contenido incluye componentes UBITS
 * y determina si debe interceptar write() para usar flujo automático
 */
export async function autoInterceptWrite(
  filePath: string,
  content: string,
  userMessage?: string
): Promise<AutoWriteInterceptorResult> {
  console.log(
    '\n🛡️ [Auto Write Interceptor] ========================================'
  );
  console.log('🛡️ [Auto Write Interceptor] Analizando contenido...');
  console.log(`🛡️ [Auto Write Interceptor] Archivo: ${filePath}`);

  // 1. Detectar componentes en el contenido
  const detectedFromContent = detectComponentFromContent(content);
  const detectedFromMessage = userMessage
    ? detectComponentFromMessage(userMessage)
    : null;
  const proactiveDetection = detectComponentsProactively(
    content + (userMessage || '')
  );

  // 2. Determinar componente detectado
  let componentName: string | undefined = undefined;

  if (detectedFromContent) {
    componentName = detectedFromContent;
    console.log(
      `✅ [Auto Write Interceptor] Componente detectado desde contenido: ${componentName}`
    );
  } else if (detectedFromMessage) {
    componentName = detectedFromMessage;
    console.log(
      `✅ [Auto Write Interceptor] Componente detectado desde mensaje: ${componentName}`
    );
  } else if (proactiveDetection.components.length > 0) {
    // Usar el componente con mayor confianza
    const sortedComponents = proactiveDetection.components.sort((a, b) => {
      const confidenceOrder = { high: 3, medium: 2, low: 1 };
      return confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
    });
    componentName = sortedComponents[0].name;
    console.log(
      `✅ [Auto Write Interceptor] Componente detectado proactivamente: ${componentName}`
    );
  }

  // 3. Si NO se detectó componente, permitir write() directo
  if (!componentName) {
    console.log(
      '✅ [Auto Write Interceptor] No se detectaron componentes UBITS, permitiendo write() directo'
    );
    return {
      shouldIntercept: false,
    };
  }

  // 4. Si se detectó componente, FORZAR uso del flujo automático
  console.log(
    `🚨 [Auto Write Interceptor] ⚠️ COMPONENTE DETECTADO: ${componentName}`
  );
  console.log(
    `🚨 [Auto Write Interceptor] ⚠️ FORZANDO uso del flujo automático...`
  );

  try {
    // 4.1 Obtener ID de Storybook
    const componentId =
      await mapAndValidateComponentNameToStorybookId(componentName);
    console.log(`✅ [Auto Write Interceptor] ID de Storybook: ${componentId}`);

    // 4.2 Consultar Storybook completo en paralelo
    console.log(
      `📚 [Auto Write Interceptor] Consultando Storybook completo...`
    );
    const consultResult = await consultStorybookCompleto(
      componentId,
      componentName
    );

    if (!consultResult.success) {
      console.error(
        `❌ [Auto Write Interceptor] Error consultando Storybook: ${consultResult.errors.join(', ')}`
      );
      return {
        shouldIntercept: true,
        componentName,
        componentId,
        reason: `No se pudo obtener información de Storybook: ${consultResult.errors.join(', ')}`,
        errors: consultResult.errors,
        warnings: consultResult.warnings,
      };
    }

    // 4.3 Validar estructura antes de escribir
    console.log(
      `🔍 [Auto Write Interceptor] Validando estructura antes de escribir...`
    );
    const validationResult = await validateStructureBeforeWrite(
      componentId,
      content,
      componentName
    );

    if (!validationResult.valid) {
      console.error(
        `❌ [Auto Write Interceptor] Validación de estructura falló:`
      );
      validationResult.errors.forEach((error) => {
        console.error(`   ${error}`);
      });

      return {
        shouldIntercept: true,
        componentName,
        componentId,
        reason: `Errores de estructura detectados: ${validationResult.errors.join(', ')}`,
        storybookInfo: consultResult.info,
        validationResult,
        errors: validationResult.errors,
        warnings: [...validationResult.warnings, ...consultResult.warnings],
      };
    }

    if (validationResult.warnings.length > 0) {
      console.warn(`⚠️ [Auto Write Interceptor] Advertencias de estructura:`);
      validationResult.warnings.forEach((warning) => {
        console.warn(`   ${warning}`);
      });
    }

    // 4.4 Si todo está bien, permitir write() pero con advertencia
    console.log(
      `✅ [Auto Write Interceptor] Validación pasó, pero se recomienda usar autorun.apply() o interceptedWrite()`
    );
    console.log(`💡 [Auto Write Interceptor] Para mejor experiencia, usar:`);
    console.log(
      `   call_mcp_tool({ server: 'project-0-Autorun-autorun', toolName: 'autorun.apply', arguments: { message: '${userMessage || `Implementar ${componentName}`}' } })`
    );

    return {
      shouldIntercept: false, // Permitir write() pero con advertencia
      componentName,
      componentId,
      storybookInfo: consultResult.info,
      validationResult,
      warnings: [
        `⚠️ Se detectó componente ${componentName}. Se recomienda usar autorun.apply() o interceptedWrite() para mejor experiencia.`,
        ...validationResult.warnings,
        ...consultResult.warnings,
      ],
    };
  } catch (error: any) {
    console.error(
      `❌ [Auto Write Interceptor] Error crítico: ${error.message}`
    );
    return {
      shouldIntercept: true,
      componentName,
      reason: `Error crítico: ${error.message}`,
      errors: [error.message],
    };
  }
}

/**
 * Detecta componentes desde el mensaje del usuario
 */
function detectComponentFromMessage(message: string): string | null {
  // Importar dinámicamente para evitar dependencias circulares
  const { detectComponentFromMessage } = require('./implementationHelpers.js');
  return detectComponentFromMessage(message);
}
