/**
 * ✅ MCP Server v3 - Servidor Simple y Robusto
 *
 * Creado desde cero con enfoque minimalista
 * - Sin complejidad innecesaria
 * - Manejo robusto de errores
 * - Logs claros y útiles
 * - TODAS las herramientas necesarias para el flujo completo
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

// Importar todas las herramientas necesarias
import { autorunTest } from '../mcp-server-v2/tools/test.js';
import { autorunPlan } from '../mcp-server-v2/tools/plan.js';
import { autorunChecklist } from '../mcp-server-v2/tools/checklist.js';
import { autorunVerify } from '../mcp-server-v2/tools/verify.js';
import { autorunApply } from '../mcp-server-v2/tools/apply.js';
import { autorunHandleUserMessage } from '../mcp-server-v2/tools/handleUserMessage.js';
import { autorunDiscoverComponent } from '../mcp-server-v2/tools/discoverComponent.js';
import { autorunStorybookStart } from '../mcp-server-v2/tools/storybookStart.js';
import { autorunStorybookBuild } from '../mcp-server-v2/tools/storybookBuild.js';
import { autorunStorybookExtract } from '../mcp-server-v2/tools/storybookExtract.js';
import { autorunProblemsList } from '../mcp-server-v2/tools/problemsList.js';
import { autorunGitHubCommit } from '../mcp-server-v2/tools/githubCommit.js';
import { autorunLint } from '../mcp-server-v2/tools/lint.js';
import { autorunVisualTest } from '../mcp-server-v2/tools/visualTest.js';

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

    console.error(
      `🔧 [Autorun MCP v3] ========================================`
    );
    console.error(`🔧 [Autorun MCP v3] Tool llamado: ${name}`);
    console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);
    console.error(
      `   📝 Args: ${JSON.stringify(args, null, 2).substring(0, 500)}`
    );

    try {
      // Normalizar nombre (soporta con punto y con guión bajo)
      const normalizedName = name.replace(/_/g, '.');
      console.error(`   🔍 Nombre normalizado: ${normalizedName}`);

      switch (normalizedName) {
        case 'autorun.apply': {
          console.error(`   ✅ [PASO 1] Importando autorunApply...`);
          const { autorunApply } = await import('./tools/apply.js');
          console.error(`   ✅ [PASO 1] autorunApply importado`);

          console.error(`   ✅ [PASO 2] Ejecutando autorunApply...`);
          const result = await autorunApply(args as any);
          console.error(`   ✅ [PASO 2] autorunApply completado`);

          console.error(
            `✅ [Autorun MCP v3] autorun.apply completado exitosamente`
          );
          console.error(`   📊 Success: ${result.success}`);
          console.error(
            `   📁 Archivos escritos: ${result.filesWritten?.length || 0}`
          );
          console.error(`   ❌ Errores: ${result.errors?.length || 0}`);

          // ⚠️ CRÍTICO: Verificar que el resultado sea serializable
          try {
            const serialized = JSON.stringify(result);
            console.error(
              `   ✅ Resultado serializable (${serialized.length} caracteres)`
            );
          } catch (serializeError: any) {
            console.error(
              `   ❌ Error serializando resultado: ${serializeError.message}`
            );
            throw new Error(
              `Resultado no serializable: ${serializeError.message}`
            );
          }

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
      console.error(
        `❌ [Autorun MCP v3] ========================================`
      );
      console.error(`❌ [Autorun MCP v3] Error ejecutando tool ${name}:`);
      console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);
      console.error(`   Mensaje: ${error.message}`);
      console.error(`   Tipo: ${error.constructor.name}`);
      console.error(`   Stack: ${error.stack}`);
      if (error.cause) {
        console.error(`   Causa: ${error.cause}`);
      }

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
