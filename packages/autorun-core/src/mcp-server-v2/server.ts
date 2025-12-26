/**
 * ✅ MCP Server v2 - Servidor Principal
 *
 * Servidor MCP limpio y bien estructurado para Autorun
 * Creado desde cero - sin dependencias del anterior
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

// Importar tools
import { autorunTest } from './tools/test.js';
import { autorunApply } from './tools/apply.js';
import { autorunVerify } from './tools/verify.js';
import { autorunPlan } from './tools/plan.js';
import { autorunChecklist } from './tools/checklist.js';
import { autorunStorybookStart } from './tools/storybookStart.js';
import { autorunStorybookBuild } from './tools/storybookBuild.js';
import { autorunStorybookExtract } from './tools/storybookExtract.js';
import { autorunProblemsList } from './tools/problemsList.js';
import { autorunGitHubCommit } from './tools/githubCommit.js';
import { autorunLint } from './tools/lint.js';
import { autorunVisualTest } from './tools/visualTest.js';

/**
 * ✅ Inicia el servidor MCP de Autorun v2
 */
export async function startAutorunMCPServerV2(): Promise<void> {
  // ⚠️ CRÍTICO: Usar stderr para logs (stdout es para comunicación MCP)
  console.error('🚀 [Autorun MCP v2] Iniciando servidor...');
  console.error(`   🔍 [DEBUG] process.cwd(): ${process.cwd()}`);
  console.error(
    `   🔍 [DEBUG] __dirname: ${typeof __dirname !== 'undefined' ? __dirname : 'undefined'}`
  );

  // ⚠️ CRÍTICO: Asegurar que process.cwd() apunte al directorio del proyecto
  // El MCP puede ejecutarse desde cualquier directorio, necesitamos encontrar el root del proyecto
  // ⚠️ CRÍTICO: Esto DEBE ejecutarse ANTES de cualquier otra cosa
  console.error(`   🔍 [DEBUG] ========================================`);
  console.error(`   🔍 [DEBUG] INICIANDO BÚSQUEDA DEL PROYECTO`);
  console.error(`   🔍 [DEBUG] process.cwd() inicial: ${process.cwd()}`);
  console.error(
    `   🔍 [DEBUG] HOME: ${process.env.HOME || process.env.USERPROFILE || 'NO DEFINIDO'}`
  );

  try {
    const path = await import('path');
    const fs = await import('fs/promises');
    let currentDir = process.cwd();
    let projectRoot: string | null = null;

    console.error(
      `   🔍 [DEBUG] ESTRATEGIA 1: Buscando hacia arriba desde: ${currentDir}`
    );

    // Estrategia 1: Buscar hacia arriba (directorios padres)
    for (let i = 0; i < 20; i++) {
      const configPath = path.join(currentDir, '.ubits', 'project-config.json');
      console.error(`   🔍 [DEBUG]   [${i}] Intentando: ${configPath}`);
      try {
        await fs.access(configPath);
        projectRoot = currentDir;
        console.error(
          `   ✅ [DEBUG] ✅✅✅ PROYECTO ENCONTRADO (hacia arriba) en: ${projectRoot}`
        );
        console.error(`   ✅ [DEBUG] ✅✅✅ Archivo encontrado: ${configPath}`);
        break;
      } catch (err: any) {
        console.error(
          `   🔍 [DEBUG]   [${i}] No encontrado: ${err.code || err.message}`
        );
        const parent = path.dirname(currentDir);
        if (parent === currentDir) {
          console.error(
            `   ⚠️ [DEBUG] Llegamos a la raíz del sistema: ${currentDir}`
          );
          break;
        }
        currentDir = parent;
      }
    }

    // Estrategia 2: Si no se encontró hacia arriba, buscar en subdirectorios comunes
    if (!projectRoot) {
      console.error(
        `   🔍 [DEBUG] ESTRATEGIA 2: No encontrado hacia arriba, buscando en subdirectorios...`
      );
      const homeDir = process.env.HOME || process.env.USERPROFILE;
      if (homeDir) {
        console.error(`   🔍 [DEBUG] HOME dir: ${homeDir}`);
        const commonDirs = [
          'Desktop',
          'Documents',
          'Projects',
          'dev',
          'workspace',
        ];
        for (const dir of commonDirs) {
          const testDir = path.join(homeDir, dir);
          console.error(`   🔍 [DEBUG] Buscando en: ${testDir}`);
          try {
            const entries = await fs.readdir(testDir, { withFileTypes: true });
            console.error(
              `   🔍 [DEBUG] Encontrados ${entries.length} directorios en ${testDir}`
            );
            for (const entry of entries) {
              if (entry.isDirectory()) {
                const testPath = path.join(
                  testDir,
                  entry.name,
                  '.ubits',
                  'project-config.json'
                );
                console.error(`   🔍 [DEBUG]   Verificando: ${testPath}`);
                try {
                  await fs.access(testPath);
                  projectRoot = path.join(testDir, entry.name);
                  console.error(
                    `   ✅ [DEBUG] ✅✅✅ PROYECTO ENCONTRADO (en subdirectorio) en: ${projectRoot}`
                  );
                  console.error(
                    `   ✅ [DEBUG] ✅✅✅ Archivo encontrado: ${testPath}`
                  );
                  break;
                } catch (err: any) {
                  // Continuar buscando
                }
              }
            }
            if (projectRoot) break;
          } catch (err: any) {
            console.error(
              `   ⚠️ [DEBUG] Error leyendo ${testDir}: ${err.code || err.message}`
            );
            // Continuar con el siguiente directorio común
          }
        }
      } else {
        console.error(
          `   ⚠️ [DEBUG] HOME no está definido, no se puede buscar en subdirectorios`
        );
      }
    }

    console.error(`   🔍 [DEBUG] ========================================`);
    if (projectRoot && projectRoot !== process.cwd()) {
      console.error(
        `   🔄 [DEBUG] Cambiando process.cwd() de ${process.cwd()} a ${projectRoot}`
      );
      process.chdir(projectRoot);
      console.error(
        `   ✅ [DEBUG] ✅✅✅ process.cwd() CAMBIADO a: ${process.cwd()}`
      );
      console.error(`   ✅ [DEBUG] Verificando que el cambio funcionó...`);
      try {
        const verifyPath = path.join(
          process.cwd(),
          '.ubits',
          'project-config.json'
        );
        await fs.access(verifyPath);
        console.error(
          `   ✅ [DEBUG] ✅✅✅ VERIFICACIÓN EXITOSA: ${verifyPath} existe`
        );
      } catch (err: any) {
        console.error(
          `   ❌ [DEBUG] ❌❌❌ VERIFICACIÓN FALLÓ: ${err.message}`
        );
      }
    } else if (!projectRoot) {
      console.error(`   ❌ [DEBUG] ❌❌❌ NO SE ENCONTRÓ PROYECTO`);
      console.error(`   ❌ [DEBUG] process.cwd() permanece: ${process.cwd()}`);
    } else {
      console.error(
        `   ✅ [DEBUG] Proyecto ya está en el cwd correcto: ${process.cwd()}`
      );
    }
    console.error(`   🔍 [DEBUG] ========================================`);
  } catch (error: any) {
    console.error(
      `   ❌ [DEBUG] ❌❌❌ ERROR CRÍTICO ajustando cwd: ${error.message}`
    );
    console.error(`   ❌ [DEBUG] Stack: ${error.stack}`);
  }

  // Crear servidor MCP
  const server = new Server(
    {
      name: 'autorun-mcp-server-v2',
      version: '2.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // ⚠️ CRÍTICO: Listar tools disponibles
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error('📋 [Autorun MCP v2] ListToolsRequest recibido');

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
          name: 'autorun.apply',
          description:
            'Ejecuta TODO el flujo de implementación automáticamente: detección → Storybook MCP → extracción → validación → implementación → post-procesamiento',
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
                  'Archivos objetivo (opcional, se detecta automáticamente si no se especifica)',
              },
              options: {
                type: 'object',
                properties: {
                  skipVerification: { type: 'boolean' },
                  dryRun: { type: 'boolean' },
                  skipFormatting: { type: 'boolean' },
                  skipLinting: { type: 'boolean' },
                  skipAutoReload: { type: 'boolean' },
                  skipAutoCommit: { type: 'boolean' },
                  runVisualTests: { type: 'boolean' },
                },
              },
            },
            required: ['message'],
          },
        },
        {
          name: 'autorun.verify',
          description:
            'Verifica que los archivos fueron generados correctamente por Autorun y cumplen con todas las validaciones',
          inputSchema: {
            type: 'object',
            properties: {
              targetFiles: {
                oneOf: [
                  { type: 'array', items: { type: 'string' } },
                  { type: 'string', enum: ['diff'] },
                ],
                description:
                  'Archivos a verificar o "diff" para verificar cambios de git',
              },
              options: {
                type: 'object',
                properties: {
                  strict: { type: 'boolean' },
                  checkAutorunMarks: { type: 'boolean' },
                  checkStructure: { type: 'boolean' },
                  checkAccessibility: { type: 'boolean' },
                },
              },
            },
            required: ['targetFiles'],
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
          name: 'autorun.storybook.start',
          description: 'Inicia servidor de Storybook local',
          inputSchema: {
            type: 'object',
            properties: {
              port: { type: 'number', description: 'Puerto (opcional)' },
              host: { type: 'string', description: 'Host (opcional)' },
            },
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
                description: 'Directorio de salida (opcional)',
              },
            },
          },
        },
        {
          name: 'autorun.storybook.extract',
          description:
            'Extrae código HTML/JS directamente desde Storybook usando Browser MCP internamente. Evita tener que modificar Storybook para crear historias "code".',
          inputSchema: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string',
                description:
                  'ID del componente en Storybook (ej: "formularios-radio-button")',
              },
              componentName: {
                type: 'string',
                description:
                  'Nombre del componente (ej: "RadioButton") - se mapea automáticamente a componentId',
              },
              storyName: {
                type: 'string',
                description:
                  'Nombre de la historia a extraer (default: "auto" - busca "code" primero, luego "implementation")',
              },
            },
          },
        },
        {
          name: 'autorun.problems.list',
          description: 'Lista problemas detectados por Problem Tracker',
          inputSchema: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                description: 'Filtrar por categoría (opcional)',
              },
              severity: {
                type: 'string',
                enum: ['low', 'medium', 'high', 'critical'],
                description: 'Filtrar por severidad (opcional)',
              },
              limit: {
                type: 'number',
                description: 'Límite de resultados (opcional)',
              },
            },
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
                description: 'Archivos a commitear',
              },
              message: {
                type: 'string',
                description: 'Mensaje de commit',
              },
              push: {
                type: 'boolean',
                description: 'Hacer push después del commit',
              },
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
                description: 'Archivos a validar',
              },
              fix: {
                type: 'boolean',
                description: 'Auto-corregir errores automáticamente',
              },
            },
            required: ['files'],
          },
        },
        {
          name: 'autorun.visual.test',
          description: 'Ejecuta tests visuales con Chromatic',
          inputSchema: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string',
                description: 'ID del componente (opcional)',
              },
              storyId: {
                type: 'string',
                description: 'ID de la historia (opcional)',
              },
            },
          },
        },
      ],
    };
  });

  // ⚠️ CRÍTICO: Manejar llamadas a tools
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    console.error(`🔧 [Autorun MCP v2] Tool llamado: ${name}`);
    console.error(`📋 [Autorun MCP v2] Args: ${JSON.stringify(args, null, 2)}`);

    try {
      // ⚠️ SOPORTE PARA AMBOS FORMATOS: Con punto y con guión bajo
      // El sistema MCP puede convertir "autorun.apply" a "autorun_apply"
      const normalizedName = name.replace(/_/g, '.');

      switch (normalizedName) {
        case 'autorun.test': {
          console.error(`   🧪 [MCP Server] Llamando autorunTest...`);
          const result = await autorunTest(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.plan': {
          const result = await autorunPlan(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.apply': {
          console.error(`   🔍 [MCP Server] Llamando autorunApply...`);
          console.error(`   ⏰ Timestamp antes: ${new Date().toISOString()}`);

          let result: any = null;
          try {
            result = await autorunApply(args as any);
            console.error(
              `   ✅ [MCP Server] autorunApply completado: success=${result?.success}`
            );
            console.error(
              `   ⏰ Timestamp después: ${new Date().toISOString()}`
            );
          } catch (applyError: any) {
            console.error(
              `   ❌ [MCP Server] ERROR en autorunApply: ${applyError.message}`
            );
            console.error(`   📋 Stack: ${applyError.stack}`);
            console.error(
              `   ⏰ Timestamp del error: ${new Date().toISOString()}`
            );

            // Retornar error en formato JSON
            result = {
              success: false,
              filesWritten: [],
              errors: [`Error en autorunApply: ${applyError.message}`],
              verification: {
                preImplementation: false,
                postImplementation: false,
              },
            };
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

        case 'autorun.verify': {
          const result = await autorunVerify(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.checklist': {
          const result = await autorunChecklist(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.storybook.start': {
          const result = await autorunStorybookStart(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.storybook.build': {
          const result = await autorunStorybookBuild(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.storybook.extract': {
          const result = await autorunStorybookExtract(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.problems.list': {
          const result = await autorunProblemsList(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.github.commit': {
          const result = await autorunGitHubCommit(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.lint': {
          const result = await autorunLint(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case 'autorun.visual.test': {
          const result = await autorunVisualTest(args as any);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Tool desconocido: ${name}`
          );
      }
    } catch (error: any) {
      console.error(`❌ [Autorun MCP v2] Error en tool ${name}:`, error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      // ⚠️ CRÍTICO: NO lanzar McpError directamente - retornar error en formato JSON
      // Esto previene que el servidor MCP se cierre
      console.error(
        `   ⚠️ [Autorun MCP v2] Retornando error en lugar de lanzar para evitar cierre de conexión`
      );

      // ⚠️ CRÍTICO: Retornar error en formato estándar del SDK MCP
      // NO usar isError (no es una propiedad válida del SDK)
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

  // ⚠️ CRÍTICO: Conectar transporte stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('✅ [Autorun MCP v2] Servidor iniciado correctamente');
  console.error('📡 [Autorun MCP v2] Esperando requests...');
}
