/**
 * ✅ MCP Server v3 - Servidor Simple y Robusto
 *
 * Creado desde cero con enfoque minimalista
 * - Sin complejidad innecesaria
 * - Manejo robusto de errores
 * - Logs claros y útiles
 * - Solo herramientas esenciales
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

/**
 * ✅ Inicia el servidor MCP de Autorun v3
 */
export async function startAutorunMCPServerV3(): Promise<void> {
  // ⚠️ CRÍTICO: Usar stderr para logs (stdout es para comunicación MCP)
  console.error('🚀 [Autorun MCP v3] Iniciando servidor...');
  console.error(`   📍 Directorio actual: ${process.cwd()}`);

  // Crear servidor MCP
  const server = new Server(
    {
      name: 'autorun-mcp-server-v3',
      version: '3.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // ✅ Listar tools disponibles
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error('📋 [Autorun MCP v3] ListToolsRequest recibido');

    return {
      tools: [
        {
          name: 'autorun.apply',
          description:
            'Implementa componentes desde Storybook automáticamente. Esta es la herramienta principal para implementar cualquier componente.',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description:
                  'Mensaje del usuario describiendo qué implementar (ej: "implementar button terciario solo icono")',
              },
              targetFiles: {
                type: 'array',
                items: { type: 'string' },
                description:
                  'Archivos donde implementar (opcional, se detecta automáticamente si no se especifica)',
              },
              options: {
                type: 'object',
                properties: {
                  mode: {
                    type: 'string',
                    enum: ['strict', 'prototypeTokens'],
                    description:
                      'Modo de implementación (default: prototypeTokens)',
                  },
                },
              },
            },
            required: ['message'],
          },
        },
      ],
    };
  });

  // ✅ Manejar llamadas a tools
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    console.error(`🔧 [Autorun MCP v3] Tool llamado: ${name}`);
    console.error(
      `   📝 Args: ${JSON.stringify(args, null, 2).substring(0, 200)}`
    );

    try {
      // Normalizar nombre (soporta con punto y con guión bajo)
      const normalizedName = name.replace(/_/g, '.');

      switch (normalizedName) {
        case 'autorun.apply': {
          const { autorunApply } = await import('./tools/apply.js');
          const result = await autorunApply(args as any);
          console.error(`✅ [Autorun MCP v3] autorun.apply completado`);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        default: {
          const errorMsg = `Tool desconocido: ${name}. Tools disponibles: autorun.apply`;
          console.error(`❌ [Autorun MCP v3] ${errorMsg}`);
          throw new McpError(ErrorCode.MethodNotFound, errorMsg);
        }
      }
    } catch (error: any) {
      console.error(`❌ [Autorun MCP v3] Error ejecutando tool ${name}:`);
      console.error(`   Mensaje: ${error.message}`);
      console.error(`   Stack: ${error.stack}`);

      // Retornar error estructurado
      throw new McpError(
        ErrorCode.InternalError,
        `Error ejecutando ${name}: ${error.message}`
      );
    }
  });

  // ✅ Iniciar transporte
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('✅ [Autorun MCP v3] Servidor iniciado correctamente');
  console.error('   📡 Esperando requests...');
}
