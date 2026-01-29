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

  // ✅ Listar tools disponibles (TODAS las herramientas necesarias)
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error('📋 [Autorun MCP v3] ListToolsRequest recibido');

    return {
      tools: [
        {
          name: 'autorun.test',
          description:
            'Herramienta de prueba simple para verificar que el MCP funciona sin errores',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Mensaje de prueba opcional',
              },
            },
            required: [],
          },
        },
        {
          name: 'autorun.plan',
          description:
            'Genera un plan de implementación basado en el mensaje del usuario sin ejecutar la implementación',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Mensaje del usuario describiendo qué implementar',
              },
            },
            required: ['message'],
          },
        },
        {
          name: 'autorun.checklist',
          description:
            'Obtiene checklist de implementación para un componente específico',
          inputSchema: {
            type: 'object',
            properties: {
              componentName: {
                type: 'string',
                description: 'Nombre del componente',
              },
            },
            required: ['componentName'],
          },
        },
        {
          name: 'autorun.verify',
          description:
            'Verifica que los archivos fueron generados correctamente por Autorun y que cumplen con todas las validaciones',
          inputSchema: {
            type: 'object',
            properties: {
              targetFiles: {
                oneOf: [
                  {
                    type: 'string',
                    enum: ['diff'],
                    description: 'Verificar todos los cambios en git (diff)',
                  },
                  {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Lista de archivos específicos a verificar',
                  },
                ],
                description:
                  'Archivos a verificar. Usa "diff" para verificar todos los cambios en git',
              },
              options: {
                type: 'object',
                properties: {
                  strict: {
                    type: 'boolean',
                    description: 'Modo estricto (default: false)',
                  },
                  checkAutorunMarks: {
                    type: 'boolean',
                    description:
                      'Verificar marcas Autorun (watermarks) (default: true)',
                  },
                  checkStructure: {
                    type: 'boolean',
                    description:
                      'Verificar estructura del código (default: true)',
                  },
                  checkAccessibility: {
                    type: 'boolean',
                    description: 'Verificar accesibilidad (default: true)',
                  },
                  staged: {
                    type: 'boolean',
                    description: 'Verificar solo cambios staged (pre-commit)',
                  },
                  baseRef: {
                    type: 'string',
                    description:
                      'Comparar contra base ref (ej: origin/main para CI/PR)',
                  },
                  autoRevert: {
                    type: 'boolean',
                    description:
                      'Revertir automáticamente cambios sin watermark (default: true)',
                  },
                },
                description: 'Opciones de verificación',
              },
            },
            required: [],
          },
        },
        {
          name: 'autorun.apply',
          description:
            'Ejecuta el flujo completo de implementación automática de componentes desde Storybook. Esta es la herramienta principal para implementar componentes.',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Mensaje del usuario describiendo qué implementar',
              },
              targetFiles: {
                type: 'array',
                items: { type: 'string' },
                description:
                  'Lista de archivos objetivo (opcional, se detecta automáticamente si no se especifica)',
              },
              options: {
                type: 'object',
                properties: {
                  skipVerification: {
                    type: 'boolean',
                    description:
                      'Saltar verificación pre-implementación (default: false)',
                  },
                  dryRun: {
                    type: 'boolean',
                    description:
                      'Ejecutar sin escribir archivos (default: false)',
                  },
                  skipFormatting: {
                    type: 'boolean',
                    description:
                      'Saltar formateo con Prettier (default: false)',
                  },
                  skipLinting: {
                    type: 'boolean',
                    description:
                      'Saltar validación con ESLint (default: false)',
                  },
                  skipAutoReload: {
                    type: 'boolean',
                    description:
                      'Saltar auto-reload del browser (default: false)',
                  },
                  skipAutoCommit: {
                    type: 'boolean',
                    description: 'Saltar auto-commit a GitHub (default: false)',
                  },
                  mode: {
                    type: 'string',
                    enum: ['strict', 'prototypeTokens'],
                    description:
                      'Modo de implementación (default: auto-detectado por path)',
                  },
                  requireStorybookMcp: {
                    type: 'boolean',
                    description:
                      'Requerir Storybook MCP (fail-closed) (default: true)',
                  },
                },
                description: 'Opciones de implementación',
              },
            },
            required: ['message'],
          },
        },
        {
          name: 'autorun.handleUserMessage',
          description:
            '⚠️ CRÍTICO: Maneja mensaje del usuario automáticamente. DEBE ejecutarse al inicio de cada mensaje para detectar componentes y preparar el flujo completo.',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Mensaje completo del usuario',
              },
              options: {
                type: 'object',
                properties: {
                  skipPreCheck: {
                    type: 'boolean',
                    description:
                      'Saltar verificación pre-implementación (default: false)',
                  },
                },
              },
            },
            required: ['message'],
          },
        },
        {
          name: 'autorun.discoverComponent',
          description:
            '⚠️ CRÍTICO: Descubre el nombre exacto del componente en Storybook. NUNCA adivinar nombres - siempre consultar getComponentList() primero.',
          inputSchema: {
            type: 'object',
            properties: {
              searchTerm: {
                type: 'string',
                description:
                  'Término de búsqueda (ej: "ContentCard", "card content", "button")',
              },
            },
            required: ['searchTerm'],
          },
        },
        {
          name: 'autorun.storybook.start',
          description: 'Inicia servidor de Storybook local',
          inputSchema: {
            type: 'object',
            properties: {
              port: {
                type: 'number',
                description: 'Puerto para el servidor (default: 6006)',
              },
            },
            required: [],
          },
        },
        {
          name: 'autorun.storybook.build',
          description: 'Construye Storybook estático',
          inputSchema: {
            type: 'object',
            properties: {
              outputDir: {
                type: 'string',
                description: 'Directorio de salida (default: storybook-static)',
              },
            },
            required: [],
          },
        },
        {
          name: 'autorun.storybook.extract',
          description: 'Extrae código HTML/JS desde Storybook',
          inputSchema: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string',
                description: 'ID del componente en Storybook',
              },
              storyName: {
                type: 'string',
                description: 'Nombre de la historia (default: "default")',
              },
            },
            required: ['componentId'],
          },
        },
        {
          name: 'autorun.problems.list',
          description: 'Lista problemas detectados por Problem Tracker',
          inputSchema: {
            type: 'object',
            properties: {
              severity: {
                type: 'string',
                enum: ['error', 'warning', 'info', 'all'],
                description: 'Filtrar por severidad (default: "all")',
              },
            },
            required: [],
          },
        },
        {
          name: 'autorun.github.commit',
          description: 'Hace commit manual de archivos en GitHub',
          inputSchema: {
            type: 'object',
            properties: {
              files: {
                type: 'array',
                items: { type: 'string' },
                description: 'Lista de archivos a commitear',
              },
              message: { type: 'string', description: 'Mensaje del commit' },
            },
            required: ['files', 'message'],
          },
        },
        {
          name: 'autorun.lint',
          description: 'Ejecuta ESLint en archivos',
          inputSchema: {
            type: 'object',
            properties: {
              files: {
                type: 'array',
                items: { type: 'string' },
                description: 'Lista de archivos a verificar',
              },
              fix: {
                type: 'boolean',
                description: 'Auto-corregir errores (default: false)',
              },
            },
            required: ['files'],
          },
        },
        {
          name: 'autorun.visualTest',
          description: 'Ejecuta pruebas visuales de componentes',
          inputSchema: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string',
                description: 'ID del componente a probar',
              },
            },
            required: ['componentId'],
          },
        },
      ],
    };
  });

  // ✅ Manejar llamadas a tools
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    console.error(`🔧 [Autorun MCP v3] Tool llamado: ${name}`);
    console.error(`📋 [Autorun MCP v3] Args: ${JSON.stringify(args, null, 2)}`);

    try {
      // ⚠️ SOPORTE PARA AMBOS FORMATOS: Con punto y con guión bajo
      const normalizedName = name.replace(/_/g, '.');

      switch (normalizedName) {
        case 'autorun.test': {
          console.error(`   🧪 [MCP Server] Llamando autorunTest...`);
          const result = await autorunTest(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.plan': {
          console.error(`   📋 [MCP Server] Llamando autorunPlan...`);
          const result = await autorunPlan(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.checklist': {
          console.error(`   ✅ [MCP Server] Llamando autorunChecklist...`);
          const result = await autorunChecklist(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.verify': {
          console.error(`   🔍 [MCP Server] Llamando autorunVerify...`);
          const result = await autorunVerify(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.apply': {
          console.error(`   🚀 [MCP Server] Llamando autorunApply...`);
          const result = await autorunApply(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.handleUserMessage': {
          console.error(
            `   🚀 [MCP Server] Llamando autorunHandleUserMessage...`
          );
          const result = await autorunHandleUserMessage(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.discoverComponent': {
          console.error(
            `   🔍 [MCP Server] Llamando autorunDiscoverComponent...`
          );
          const result = await autorunDiscoverComponent(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.storybook.start': {
          console.error(`   📚 [MCP Server] Llamando autorunStorybookStart...`);
          const result = await autorunStorybookStart(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.storybook.build': {
          console.error(`   📚 [MCP Server] Llamando autorunStorybookBuild...`);
          const result = await autorunStorybookBuild(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.storybook.extract': {
          console.error(
            `   📚 [MCP Server] Llamando autorunStorybookExtract...`
          );
          const result = await autorunStorybookExtract(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.problems.list': {
          console.error(`   📋 [MCP Server] Llamando autorunProblemsList...`);
          const result = await autorunProblemsList(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.github.commit': {
          console.error(`   🔗 [MCP Server] Llamando autorunGitHubCommit...`);
          const result = await autorunGitHubCommit(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.lint': {
          console.error(`   🔍 [MCP Server] Llamando autorunLint...`);
          const result = await autorunLint(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        case 'autorun.visualTest': {
          console.error(`   🎨 [MCP Server] Llamando autorunVisualTest...`);
          const result = await autorunVisualTest(args as any);
          return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          };
        }

        default: {
          const errorMsg = `Tool desconocido: ${name}. Herramientas disponibles: autorun.test, autorun.plan, autorun.checklist, autorun.verify, autorun.apply, autorun.handleUserMessage, autorun.discoverComponent, autorun.storybook.start, autorun.storybook.build, autorun.storybook.extract, autorun.problems.list, autorun.github.commit, autorun.lint, autorun.visualTest`;
          console.error(`❌ [Autorun MCP v3] ${errorMsg}`);
          throw new McpError(ErrorCode.MethodNotFound, errorMsg);
        }
      }
    } catch (error: any) {
      console.error(`❌ [Autorun MCP v3] Error en tool ${name}:`, error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      // Retornar error en formato JSON en lugar de lanzar
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: false,
                error: `Error ejecutando ${name}: ${errorMessage}`,
                stack: errorStack ? errorStack.substring(0, 1000) : undefined,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  });

  // ✅ Iniciar transporte
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('✅ [Autorun MCP v3] Servidor iniciado correctamente');
  console.error('   📡 Esperando requests...');
}
