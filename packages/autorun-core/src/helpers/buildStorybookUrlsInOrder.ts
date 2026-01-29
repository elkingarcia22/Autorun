/**
 * ⚠️ CRÍTICO: Construir URLs de Storybook en el orden correcto
 *
 * ORDEN OBLIGATORIO:
 * 1. PRIMERO: historia "implementation" (copy/paste) - tiene el código listo para copiar
 * 2. SEGUNDO: Docs - tiene documentación completa, props, ejemplos
 * 3. ÚLTIMO: Default - solo si falta algo que extraer
 */

import { StorybookManager } from './storybookManager.js';

export interface StorybookUrlsInOrder {
  implementation?: string;
  docs: string;
  default: string;
  componentId: string;
}

/**
 * Construye URLs de Storybook en el orden correcto
 *
 * @param componentId ID del componente en Storybook (ej: "layout-card-content")
 * @returns URLs en orden: implementation, docs, default
 */
export async function buildStorybookUrlsInOrder(
  componentId: string
): Promise<StorybookUrlsInOrder> {
  console.log(
    `🔍 [Build Storybook URLs] Construyendo URLs en orden correcto para: ${componentId}`
  );

  const manager = StorybookManager.getInstance();
  const activeConfig = await manager.getActiveConfig();

  if (!activeConfig) {
    throw new Error(
      '❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect'
    );
  }

  // ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
  const encodedComponentId = encodeURIComponent(componentId);

  // 1. PRIMERO: Historia "implementation" (copy/paste)
  const implementationUrl = `${activeConfig.url}/?path=/story/${encodedComponentId}--implementation`;

  // 2. SEGUNDO: Docs (documentación completa)
  const docsUrl = `${activeConfig.url}/?path=/docs/${encodedComponentId}--docs`;

  // 3. ÚLTIMO: Default (solo si falta algo)
  const defaultUrl = `${activeConfig.url}/?path=/story/${encodedComponentId}--default`;

  console.log(`✅ [Build Storybook URLs] URLs construidas:`);
  console.log(`   1. Implementation: ${implementationUrl}`);
  console.log(`   2. Docs: ${docsUrl}`);
  console.log(`   3. Default: ${defaultUrl}`);

  return {
    implementation: implementationUrl,
    docs: docsUrl,
    default: defaultUrl,
    componentId,
  };
}

/**
 * Instrucciones para el agente sobre el orden correcto de navegación
 */
export const STORYBOOK_NAVIGATION_ORDER_INSTRUCTIONS = `
⚠️ CRÍTICO: Orden Obligatorio de Navegación a Storybook

Para CUALQUIER componente, DEBES navegar en este orden:

1. PRIMERO: Historia "implementation" (copy/paste)
   - URL: {implementationUrl}
   - Tiene el código listo para copiar/pegar
   - Revisar pestaña "Code" para código exacto

2. SEGUNDO: Docs (documentación completa)
   - URL: {docsUrl}
   - Tiene props, ejemplos, documentación completa
   - Revisar todas las pestañas disponibles

3. ÚLTIMO: Default (solo si falta algo)
   - URL: {defaultUrl}
   - Solo usar si no se encontró lo necesario en implementation o docs

⚠️ IMPORTANTE:
- Guardar URL del template ANTES de navegar
- Volver al template DESPUÉS de cada consulta
- NO saltar pasos
`;
