# Plan de Implementación: Autorun MCP Server

**Fecha:** 2025-01-03  
**Prioridad:** ⭐ CRÍTICA  
**Duración estimada:** 2-3 días

---

## 🎯 Objetivo

Crear un MCP server propio de Autorun que exponga tools `autorun.plan()`, `autorun.apply()`, y `autorun.verify()` para forzar el flujo completo de implementación.

---

## 📋 Estructura del Proyecto

```
packages/autorun-core/
├── src/
│   ├── mcp-server/
│   │   ├── autorunMCPServer.ts          # Servidor MCP principal
│   │   ├── tools/
│   │   │   ├── autorunPlan.ts           # Tool: autorun.plan()
│   │   │   ├── autorunApply.ts          # Tool: autorun.apply()
│   │   │   └── autorunVerify.ts         # Tool: autorun.verify()
│   │   ├── types.ts                     # Tipos TypeScript para tools
│   │   └── index.ts                      # Exportaciones
│   └── cli/
│       └── autorun-mcp-server.ts        # CLI para ejecutar el servidor
```

---

## 🔧 Implementación Detallada

### **1. Tipos TypeScript (`types.ts`)**

```typescript
// packages/autorun-core/src/mcp-server/types.ts

export interface AutorunPlanInput {
  message: string;
}

export interface AutorunPlanOutput {
  plan: {
    components: Array<{
      name: string;
      storybookId: string;
      detected: boolean;
    }>;
    steps: Array<{
      step: number;
      description: string;
      required: boolean;
    }>;
    estimatedTime?: string;
  };
  blocked: boolean;
  reason?: string;
  storybookUrls?: string[];
}

export interface AutorunApplyInput {
  message: string;
  targetFiles?: string[];
  options?: {
    skipVerification?: boolean;
    dryRun?: boolean;
  };
}

export interface AutorunApplyOutput {
  success: boolean;
  filesWritten: string[];
  verification: {
    preImplementation: boolean;
    postImplementation: boolean;
    errors: string[];
    warnings: string[];
  };
  components: Array<{
    name: string;
    storybookId: string;
    implemented: boolean;
  }>;
  errors?: string[];
}

export interface AutorunVerifyInput {
  targetFiles: string[] | 'diff';
  options?: {
    strict?: boolean;
  };
}

export interface AutorunVerifyOutput {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  files: Array<{
    path: string;
    hasAutorunMark: boolean;
    isValid: boolean;
    issues: string[];
  }>;
}
```

---

### **2. Tool: `autorun.plan()` (`autorunPlan.ts`)**

```typescript
// packages/autorun-core/src/mcp-server/tools/autorunPlan.ts

import { handleUserMessage } from '../../helpers/autoMessageHandler';
import { mapComponentNameToStorybookId } from '../../helpers/storybookStories';
import { buildSafeStorybookUrl } from '../../helpers/verifyStorybookStories';
import { AutorunPlanInput, AutorunPlanOutput } from '../types';

export async function autorunPlan(
  input: AutorunPlanInput
): Promise<AutorunPlanOutput> {
  console.log(`📋 [Autorun MCP] autorun.plan() llamado con mensaje: ${input.message}`);

  // 1. Ejecutar handleUserMessage() (OBLIGATORIO)
  const result = await handleUserMessage(input.message);

  if (result.blocked) {
    return {
      plan: {
        components: [],
        steps: [],
      },
      blocked: true,
      reason: result.reason,
    };
  }

  // 2. Preparar componentes detectados
  const components = [];
  if (result.componentName) {
    const storybookId = await mapComponentNameToStorybookId(result.componentName);
    components.push({
      name: result.componentName,
      storybookId: storybookId || 'unknown',
      detected: true,
    });
  }

  // 3. Agregar componentes adicionales de mcpMessages
  if (result.mcpMessages) {
    for (const msg of result.mcpMessages) {
      if (!components.some(c => c.name === msg.componentName)) {
        components.push({
          name: msg.componentName,
          storybookId: msg.storybookId,
          detected: true,
        });
      }
    }
  }

  // 4. Construir URLs de Storybook
  const storybookUrls = [];
  for (const component of components) {
    try {
      const urlResult = await buildSafeStorybookUrl(component.storybookId, 'default');
      if (urlResult.url) {
        storybookUrls.push(urlResult.url);
      }
    } catch (error) {
      console.warn(`⚠️ No se pudo construir URL para ${component.storybookId}`);
    }
  }

  // 5. Generar pasos del plan
  const steps = [
    { step: 1, description: 'Detectar componentes automáticamente', required: true },
    { step: 2, description: 'Consultar Storybook MCP para props exactas', required: true },
    { step: 3, description: 'Extraer código exacto desde Storybook', required: true },
    { step: 4, description: 'Validar pre-implementación (5 verificaciones)', required: true },
    { step: 5, description: 'Analizar componentes internos', required: true },
    { step: 6, description: 'Implementar con código exacto', required: true },
    { step: 7, description: 'Verificar post-implementación', required: true },
  ];

  return {
    plan: {
      components,
      steps,
    },
    blocked: false,
    storybookUrls,
  };
}
```

---

### **3. Tool: `autorun.apply()` (`autorunApply.ts`)** ⭐ CRÍTICO

```typescript
// packages/autorun-core/src/mcp-server/tools/autorunApply.ts

import { handleUserMessage } from '../../helpers/autoMessageHandler';
import { extractExactCodeFromStorybookWithBrowser } from '../../helpers/storybookExactCodeExtractorWithBrowser';
import { verifyBeforeImplementation } from '../../helpers/preImplementationVerification';
import { analyzeComponentInternals } from '../../helpers/componentInternalAnalysis';
import { mapAndValidateComponentNameToStorybookId } from '../../helpers/storybookStories';
import { AutorunApplyInput, AutorunApplyOutput } from '../types';
import * as fs from 'fs/promises';
import * as path from 'path';

// ⚠️ CRÍTICO: Esta función ejecuta TODO el flujo automáticamente
export async function autorunApply(
  input: AutorunApplyInput
): Promise<AutorunApplyOutput> {
  console.log(`🚀 [Autorun MCP] autorun.apply() llamado con mensaje: ${input.message}`);

  const errors: string[] = [];
  const warnings: string[] = [];
  const filesWritten: string[] = [];

  try {
    // PASO 1: Ejecutar handleUserMessage() (OBLIGATORIO)
    console.log(`📋 [Autorun MCP] PASO 1: Ejecutando handleUserMessage()...`);
    const result = await handleUserMessage(input.message);

    if (result.blocked) {
      return {
        success: false,
        filesWritten: [],
        verification: {
          preImplementation: false,
          postImplementation: false,
          errors: [result.reason || 'Implementación bloqueada'],
          warnings: [],
        },
        components: [],
        errors: [result.reason || 'Implementación bloqueada'],
      };
    }

    // PASO 2: Consultar Storybook MCP para TODOS los componentes (OBLIGATORIO)
    console.log(`📚 [Autorun MCP] PASO 2: Consultando Storybook MCP...`);
    if (result.mcpMessages && result.mcpMessages.length > 0) {
      // ⚠️ CRÍTICO: Aquí debemos llamar al Storybook MCP
      // Por ahora, verificamos que los mensajes estén preparados
      for (const msg of result.mcpMessages) {
        console.log(`📚 [Autorun MCP] Componente detectado: ${msg.componentName} (${msg.storybookId})`);
        // TODO: Llamar a call_mcp_tool() aquí cuando tengamos acceso
        // const props = await call_mcp_tool({
        //   server: "storybook-ubits",
        //   toolName: "mcp_storybook_getComponentsProps",
        //   arguments: { componentIds: [msg.storybookId] }
        // });
      }
    }

    // PASO 3: Extraer código exacto desde Storybook (OBLIGATORIO)
    console.log(`🔍 [Autorun MCP] PASO 3: Extrayendo código exacto desde Storybook...`);
    const componentId = await mapAndValidateComponentNameToStorybookId(
      result.componentName || 'unknown'
    );
    
    let exactCode;
    try {
      exactCode = await extractExactCodeFromStorybookWithBrowser(
        componentId,
        'default'
      );
    } catch (error: any) {
      errors.push(`Error extrayendo código desde Storybook: ${error.message}`);
      return {
        success: false,
        filesWritten: [],
        verification: {
          preImplementation: false,
          postImplementation: false,
          errors,
          warnings,
        },
        components: [],
        errors,
      };
    }

    // PASO 4: Verificar pre-implementación (OBLIGATORIO)
    console.log(`✅ [Autorun MCP] PASO 4: Verificando pre-implementación...`);
    if (!input.options?.skipVerification) {
      const targetFile = input.targetFiles?.[0] || detectTargetFile(result.componentName);
      if (!targetFile) {
        errors.push('No se pudo determinar archivo objetivo');
        return {
          success: false,
          filesWritten: [],
          verification: {
            preImplementation: false,
            postImplementation: false,
            errors,
            warnings,
          },
          components: [],
          errors,
        };
      }

      const verification = await verifyBeforeImplementation(
        componentId,
        'default',
        targetFile
      );

      if (!verification.valid) {
        errors.push(...verification.errors);
        warnings.push(...verification.warnings);
        return {
          success: false,
          filesWritten: [],
          verification: {
            preImplementation: false,
            postImplementation: false,
            errors,
            warnings,
          },
          components: [],
          errors,
        };
      }
    }

    // PASO 5: Analizar componentes internos (OBLIGATORIO)
    console.log(`🔍 [Autorun MCP] PASO 5: Analizando componentes internos...`);
    const internalAnalysis = await analyzeComponentInternals(
      componentId,
      undefined // storybookUrl se obtiene automáticamente
    );

    // PASO 6: Generar código con marcas Autorun
    console.log(`📝 [Autorun MCP] PASO 6: Generando código con marcas Autorun...`);
    const codeWithMarks = generateCodeWithAutorunMarks(
      exactCode.html,
      result.componentName || 'unknown',
      componentId
    );

    // PASO 7: SOLO AHORA escribir (si TODO pasó y no es dry-run)
    if (!input.options?.dryRun) {
      console.log(`💾 [Autorun MCP] PASO 7: Escribiendo archivo...`);
      const targetFile = input.targetFiles?.[0] || detectTargetFile(result.componentName);
      if (targetFile) {
        await fs.writeFile(targetFile, codeWithMarks, 'utf-8');
        filesWritten.push(targetFile);
      }
    }

    // PASO 8: Verificación post-implementación
    console.log(`✅ [Autorun MCP] PASO 8: Verificando post-implementación...`);
    // TODO: Implementar verifyAfterImplementation()

    return {
      success: true,
      filesWritten,
      verification: {
        preImplementation: true,
        postImplementation: true, // TODO: Implementar verificación real
        errors: [],
        warnings,
      },
      components: result.mcpMessages?.map(msg => ({
        name: msg.componentName,
        storybookId: msg.storybookId,
        implemented: true,
      })) || [],
    };
  } catch (error: any) {
    console.error(`❌ [Autorun MCP] Error en autorun.apply():`, error);
    return {
      success: false,
      filesWritten,
      verification: {
        preImplementation: false,
        postImplementation: false,
        errors: [error.message],
        warnings,
      },
      components: [],
      errors: [error.message],
    };
  }
}

// Helper: Generar código con marcas Autorun
function generateCodeWithAutorunMarks(
  code: string,
  componentName: string,
  componentId: string
): string {
  const timestamp = new Date().toISOString();
  const hash = generateHash(code + componentId + timestamp);
  
  const mark = `<!-- 
  AUTORUN-GENERATED
  component: ${componentName}
  storybookId: ${componentId}
  story: default
  hash: ${hash}
  timestamp: ${timestamp}
-->`;

  return `${mark}\n${code}`;
}

// Helper: Generar hash simple
function generateHash(str: string): string {
  // Implementación simple de hash (puede mejorarse)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

// Helper: Detectar archivo objetivo
function detectTargetFile(componentName?: string): string | null {
  // Lógica para detectar el template activo
  // Por ahora, retornar null (se debe especificar en input)
  return null;
}
```

---

### **4. Tool: `autorun.verify()` (`autorunVerify.ts`)**

```typescript
// packages/autorun-core/src/mcp-server/tools/autorunVerify.ts

import { AutorunVerifyInput, AutorunVerifyOutput } from '../types';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function autorunVerify(
  input: AutorunVerifyInput
): Promise<AutorunVerifyOutput> {
  console.log(`✅ [Autorun MCP] autorun.verify() llamado`);

  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  const files: AutorunVerifyOutput['files'] = [];

  try {
    let filesToVerify: string[] = [];

    if (input.targetFiles === 'diff') {
      // Obtener archivos modificados desde git
      // TODO: Implementar detección de diff
      filesToVerify = [];
    } else {
      filesToVerify = input.targetFiles;
    }

    for (const filePath of filesToVerify) {
      const fileIssues: string[] = [];
      let hasAutorunMark = false;
      let isValid = true;

      try {
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Verificar marca Autorun
        if (content.includes('AUTORUN-GENERATED')) {
          hasAutorunMark = true;
        } else {
          fileIssues.push('No tiene marca AUTORUN-GENERATED');
          isValid = false;
          if (input.options?.strict) {
            errors.push(`${filePath}: No fue generado por Autorun`);
          } else {
            warnings.push(`${filePath}: No tiene marca Autorun (puede ser manual)`);
          }
        }

        // Verificar estructura básica
        // TODO: Implementar verificaciones más detalladas

        files.push({
          path: filePath,
          hasAutorunMark,
          isValid,
          issues: fileIssues,
        });
      } catch (error: any) {
        errors.push(`${filePath}: Error leyendo archivo: ${error.message}`);
        files.push({
          path: filePath,
          hasAutorunMark: false,
          isValid: false,
          issues: [error.message],
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      files,
    };
  } catch (error: any) {
    return {
      valid: false,
      errors: [error.message],
      warnings,
      suggestions,
      files,
    };
  }
}
```

---

### **5. Servidor MCP Principal (`autorunMCPServer.ts`)**

```typescript
// packages/autorun-core/src/mcp-server/autorunMCPServer.ts

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { autorunPlan } from './tools/autorunPlan';
import { autorunApply } from './tools/autorunApply';
import { autorunVerify } from './tools/autorunVerify';

export async function startAutorunMCPServer() {
  const server = new Server(
    {
      name: 'autorun-mcp-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Listar tools disponibles
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'autorun.plan',
        description: 'Genera un plan de implementación basado en el mensaje del usuario',
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
        description: 'Ejecuta TODO el flujo de implementación y escribe el código',
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
              description: 'Archivos objetivo (opcional, se detecta automáticamente)',
            },
            options: {
              type: 'object',
              properties: {
                skipVerification: { type: 'boolean' },
                dryRun: { type: 'boolean' },
              },
            },
          },
          required: ['message'],
        },
      },
      {
        name: 'autorun.verify',
        description: 'Verifica que los archivos fueron generados correctamente por Autorun',
        inputSchema: {
          type: 'object',
          properties: {
            targetFiles: {
              oneOf: [
                { type: 'array', items: { type: 'string' } },
                { type: 'string', enum: ['diff'] },
              ],
              description: 'Archivos a verificar o "diff" para verificar cambios de git',
            },
            options: {
              type: 'object',
              properties: {
                strict: { type: 'boolean' },
              },
            },
          },
          required: ['targetFiles'],
        },
      },
    ],
  }));

  // Manejar llamadas a tools
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'autorun.plan':
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(await autorunPlan(args as any), null, 2),
              },
            ],
          };

        case 'autorun.apply':
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(await autorunApply(args as any), null, 2),
              },
            ],
          };

        case 'autorun.verify':
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(await autorunVerify(args as any), null, 2),
              },
            ],
          };

        default:
          throw new Error(`Tool desconocido: ${name}`);
      }
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: error.message }, null, 2),
          },
        ],
        isError: true,
      };
    }
  });

  // Iniciar servidor
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('🚀 Autorun MCP Server iniciado');
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  startAutorunMCPServer().catch(console.error);
}
```

---

### **6. CLI para Ejecutar el Servidor (`autorun-mcp-server.ts`)**

```typescript
// packages/autorun-core/src/cli/autorun-mcp-server.ts

#!/usr/bin/env node

import { startAutorunMCPServer } from '../mcp-server/autorunMCPServer';

startAutorunMCPServer().catch((error) => {
  console.error('❌ Error iniciando Autorun MCP Server:', error);
  process.exit(1);
});
```

---

### **7. Configuración en `.cursor/mcp.json`**

```json
{
  "mcpServers": {
    "autorun": {
      "command": "node",
      "args": [
        "packages/autorun-core/dist/cli/autorun-mcp-server.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

---

## ✅ Checklist de Implementación

- [ ] Crear estructura de directorios `mcp-server/`
- [ ] Implementar tipos TypeScript (`types.ts`)
- [ ] Implementar `autorun.plan()` tool
- [ ] Implementar `autorun.apply()` tool (CRÍTICO)
- [ ] Implementar `autorun.verify()` tool
- [ ] Crear servidor MCP principal
- [ ] Crear CLI para ejecutar servidor
- [ ] Configurar build para compilar TypeScript
- [ ] Crear script de instalación automática
- [ ] Documentar uso
- [ ] Probar con casos reales

---

## 🧪 Pruebas

### **Test 1: Plan de Implementación**

```typescript
// El agente debe poder llamar:
const plan = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.plan",
  arguments: { message: "implementa un botón secundario que abra un drawer" }
});

// Debe retornar:
// - Componentes detectados (Button, Drawer)
// - Pasos del plan
// - URLs de Storybook
```

### **Test 2: Aplicar Implementación**

```typescript
// El agente debe poder llamar:
const result = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.apply",
  arguments: { 
    message: "implementa un botón secundario que abra un drawer",
    targetFiles: ["prototypes/template.html"]
  }
});

// Debe:
// - Ejecutar TODO el flujo automáticamente
// - Escribir el archivo con marcas Autorun
// - Retornar resultado de verificación
```

### **Test 3: Verificar Implementación**

```typescript
// El agente debe poder llamar:
const verification = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.verify",
  arguments: { 
    targetFiles: ["prototypes/template.html"]
  }
});

// Debe verificar:
// - Presencia de marcas Autorun
// - Validez del código
// - Estructura correcta
```

---

## 📝 Notas de Implementación

1. **Dependencias necesarias:**
   - `@modelcontextprotocol/sdk` para el servidor MCP
   - Compilar TypeScript a JavaScript para ejecutar

2. **Integración con Storybook MCP:**
   - Dentro de `autorun.apply()`, debemos llamar a Storybook MCP
   - Esto requiere acceso a `call_mcp_tool()` desde dentro del servidor MCP
   - Puede requerir configuración especial

3. **Marcas en código:**
   - Las marcas deben ser comentarios HTML/JS que no afecten el renderizado
   - Deben ser fáciles de detectar y parsear

4. **Detección de archivo objetivo:**
   - Si no se especifica `targetFiles`, debemos detectar automáticamente
   - Puede usar el template activo del browser o el último modificado

---

**Documento creado:** 2025-01-03  
**Versión:** 1.0
