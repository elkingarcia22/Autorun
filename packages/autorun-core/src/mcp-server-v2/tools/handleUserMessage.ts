/**
 * ✅ Tool: autorun.handleUserMessage
 *
 * ⚠️ CRÍTICO: Wrapper MCP para handleUserMessage()
 * Este tool DEBE ejecutarse al inicio de cada mensaje del usuario
 * para detectar componentes automáticamente y preparar el flujo completo.
 *
 * Flujo:
 * 1. Ejecuta executeOnMessageStart() automáticamente
 * 2. Detecta componentes en el mensaje
 * 3. Prepara mensajes MCP para consultar Storybook
 * 4. Retorna información de detección y bloqueo
 */

export interface AutorunHandleUserMessageInput {
  message: string;
  options?: {
    skipPreCheck?: boolean;
  };
}

export interface AutorunHandleUserMessageOutput {
  success: boolean;
  detected: boolean;
  componentName?: string;
  blocked: boolean;
  reason?: string;
  mcpMessages?: Array<{
    componentName: string;
    storybookId: string;
    variant?: string;
    type?: string;
    properties?: string[];
  }>;
  plan?: {
    components: string[];
    steps: Array<{
      id: string;
      description: string;
      component?: string;
      story?: string;
    }>;
    totalSteps: number;
  };
  currentPhase?: string;
  nextPhase?: string;
  error?: string;
}

/**
 * ✅ Maneja mensaje del usuario automáticamente
 *
 * ⚠️ CRÍTICO: Esta función DEBE llamarse al inicio de cada mensaje
 * para detectar componentes y preparar el flujo automático.
 */
export async function autorunHandleUserMessage(
  input: AutorunHandleUserMessageInput
): Promise<AutorunHandleUserMessageOutput> {
  console.error(
    '\n🚀 [autorun.handleUserMessage] ========================================'
  );
  console.error(
    '🚀 [autorun.handleUserMessage] Iniciando manejo automático...'
  );
  console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);
  console.error(
    `   📝 Mensaje: ${input.message.substring(0, 100)}${input.message.length > 100 ? '...' : ''}`
  );

  try {
    // Importar handleUserMessage
    const { handleUserMessage } = await import(
      '../../helpers/autoMessageHandler.js'
    );

    // Ejecutar handleUserMessage
    const result = await handleUserMessage(input.message, input.options);

    console.error('✅ [autorun.handleUserMessage] Manejo completado');
    console.error(`   ✅ Detectado: ${result.detected}`);
    if (result.componentName) {
      console.error(`   ✅ Componente: ${result.componentName}`);
    }
    console.error(`   ✅ Bloqueado: ${result.blocked}`);
    if (result.mcpMessages && result.mcpMessages.length > 0) {
      console.error(
        `   📚 Mensajes MCP: ${result.mcpMessages.length} componente(s)`
      );
    }

    return {
      success: true,
      detected: result.detected || false,
      componentName: result.componentName,
      blocked: result.blocked || false,
      reason: result.reason,
      mcpMessages: result.mcpMessages,
      plan: result.plan,
      currentPhase: result.currentPhase,
      nextPhase: result.nextPhase,
    };
  } catch (error: any) {
    console.error(`❌ [autorun.handleUserMessage] Error: ${error.message}`);
    console.error(`   Stack: ${error.stack?.substring(0, 500)}`);

    return {
      success: false,
      detected: false,
      blocked: true,
      reason: error.message,
      error: error.message,
    };
  }
}
