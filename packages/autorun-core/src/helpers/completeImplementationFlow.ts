/**
 * ✅ Flujo Completo de Implementación
 *
 * Helper que ejecuta el flujo completo de implementación usando todas las herramientas MCP.
 * Este helper garantiza que se sigan todos los pasos en el orden correcto.
 *
 * ⚠️ CRÍTICO: Este helper NO debe usarse directamente por el agente.
 * El agente debe usar las herramientas MCP directamente siguiendo este flujo.
 *
 * Este archivo es solo para documentación y referencia.
 */

export interface CompleteImplementationFlowOptions {
  /** Mensaje del usuario describiendo qué implementar */
  message: string;
  /** Archivos objetivo (opcional, se detecta automáticamente) */
  targetFiles?: string | string[];
  /** Opciones adicionales para autorun.apply() */
  options?: {
    mode?: 'strict' | 'prototypeTokens';
    requireStorybookMcp?: boolean;
    allowPrototypeTokens?: boolean;
    skipVerification?: boolean;
  };
}

export interface CompleteImplementationFlowResult {
  success: boolean;
  detected: boolean;
  componentName?: string;
  componentId?: string;
  filesWritten: string[];
  errors: string[];
  warnings: string[];
}

/**
 * ⚠️ NOTA: Esta función NO debe ejecutarse directamente.
 *
 * El agente debe seguir este flujo usando las herramientas MCP:
 *
 * 1. autorun.handleUserMessage() → Detecta componentes
 * 2. (Opcional) autorun.discoverComponent() → Obtiene nombre exacto
 * 3. (Opcional) mcp_storybook_getComponentsProps() → Obtiene props
 * 4. autorun.apply() → Implementa automáticamente
 * 5. autorun.verify() → Verifica cambios
 *
 * Ver: docs/guias/implementacion/FLUJO-COMPLETO-IMPLEMENTACION-AUTORUN.md
 */
export async function completeImplementationFlow(
  options: CompleteImplementationFlowOptions
): Promise<CompleteImplementationFlowResult> {
  // ⚠️ Esta función es solo para documentación
  // El agente debe usar las herramientas MCP directamente
  throw new Error(
    'Esta función no debe ejecutarse directamente. Usa las herramientas MCP siguiendo el flujo documentado.'
  );
}

/**
 * ✅ Flujo Documentado (para referencia del agente)
 *
 * PASO 1: Ejecutar handleUserMessage()
 * ```typescript
 * const handleResult = await call_mcp_tool({
 *   server: 'autorun',
 *   toolName: 'autorun.handleUserMessage',
 *   arguments: { message: userMessage }
 * });
 * ```
 *
 * PASO 2: (Opcional) Descubrir componente
 * ```typescript
 * const discoverResult = await call_mcp_tool({
 *   server: 'autorun',
 *   toolName: 'autorun.discoverComponent',
 *   arguments: { searchTerm: 'tabs' }
 * });
 * ```
 *
 * PASO 3: (Opcional) Consultar Storybook MCP
 * ```typescript
 * const propsResult = await call_mcp_tool({
 *   server: 'storybook',
 *   toolName: 'mcp_storybook_getComponentsProps',
 *   arguments: { componentNames: ['Navegación/Tabs'] }
 * });
 * ```
 *
 * PASO 4: Implementar con autorun.apply()
 * ```typescript
 * const applyResult = await call_mcp_tool({
 *   server: 'autorun',
 *   toolName: 'autorun.apply',
 *   arguments: {
 *     message: userMessage,
 *     targetFiles: ['prototypes/file.html'],
 *     options: {
 *       mode: 'prototypeTokens',
 *       requireStorybookMcp: true
 *     }
 *   }
 * });
 * ```
 *
 * PASO 5: Verificar con autorun.verify()
 * ```typescript
 * const verifyResult = await call_mcp_tool({
 *   server: 'autorun',
 *   toolName: 'autorun.verify',
 *   arguments: { targetFiles: 'diff' }
 * });
 * ```
 */
