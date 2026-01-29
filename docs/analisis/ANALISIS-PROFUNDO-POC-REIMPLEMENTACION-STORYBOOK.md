# 🔍 Análisis Profundo: Prueba de Concepto - Reimplementación Sistema Storybook

> **Fecha:** 2025-01-23  
> **Objetivo:** Analizar profundamente el sistema actual y diseñar una prueba de concepto desde cero para reimplementar el sistema de implementación de componentes desde Storybook

---

## 📋 Índice

1. [Análisis del Problema Actual](#1-análisis-del-problema-actual)
2. [Evaluación de Alternativas](#2-evaluación-de-alternativas)
3. [Análisis de MCPs Disponibles](#3-análisis-de-mcps-disponibles)
4. [Opciones de Implementación](#4-opciones-de-implementación)
5. [Plan de Prueba de Concepto](#5-plan-de-prueba-de-concepto)
6. [Recomendaciones Finales](#6-recomendaciones-finales)

---

## 1. Análisis del Problema Actual

### 🔴 **Problemas Críticos Identificados**

#### **1.1. Dependencia de Múltiples Fuentes de Verdad**

**Problema:**
- ❌ Mapeos estáticos desactualizados (`storybookStories.ts`)
- ❌ `index.json` de Storybook puede cambiar
- ❌ Archivos locales pueden estar desincronizados
- ❌ No hay una única fuente de verdad confiable

**Evidencia:**
```typescript
// Mapeo estático que puede estar desactualizado
const COMPONENT_MAPPING = {
  Button: 'basicos-button', // ❌ Puede no existir en Storybook real
  DataTable: 'data-data-table', // ❌ Puede cambiar
};
```

**Impacto:**
- Errores "Couldn't find story matching"
- IDs incorrectos
- Componentes que no se encuentran

---

#### **1.2. Extracción de Código No Funcional**

**Problema:**
- ❌ `extractExactCodeFromStorybookWithBrowser()` usa `fetch()` que no puede ejecutar JavaScript
- ❌ La pestaña "Code" requiere JavaScript para renderizarse
- ❌ No puede extraer código real desde Storybook
- ❌ Depende de que el agente ejecute Browser MCP manualmente

**Evidencia:**
```typescript
// packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts
async function fetchStorybookPage(url: string): Promise<string> {
  const response = await fetch(url); // ❌ No ejecuta JavaScript
  return await response.text(); // ❌ HTML sin código renderizado
}
```

**Impacto:**
- No se puede extraer código real
- Se genera código genérico incorrecto
- Implementaciones fallidas

---

#### **1.3. Dependencia de Ejecución Manual de MCPs**

**Problema:**
- ❌ El código emite mensajes pero NO ejecuta MCPs directamente
- ❌ Depende de que el agente ejecute MCPs manualmente
- ❌ No hay garantía de que se ejecuten
- ❌ Flujo frágil y propenso a errores

**Evidencia:**
```typescript
// packages/autorun-core/src/helpers/storybookMCPAutoCaller.ts
console.log(`[AUTORUN_STORYBOOK_MCP]${componentName}:${storybookId}[/AUTORUN_STORYBOOK_MCP]`);
// ❌ Solo emite mensaje, NO ejecuta MCP
// El agente DEBE ejecutar manualmente:
// call_mcp_tool({ server: "storybook", toolName: "getComponentsProps", ... })
```

**Impacto:**
- Flujo no automatizado
- Errores humanos
- Implementaciones incompletas

---

#### **1.4. Storybook MCP No Obtiene Código de Implementación**

**Problema:**
- ❌ Storybook MCP solo obtiene props, NO código HTML
- ❌ No puede extraer código de la pestaña "Code"
- ❌ No puede obtener estructura HTML completa
- ❌ Limitado a metadatos

**Evidencia:**
```typescript
// Storybook MCP solo retorna props
const props = await mcp_storybook_getComponentsProps(['data-data-table']);
// Retorna: { props: {...}, structure: {...} }
// ❌ NO retorna código HTML de implementación
```

**Impacto:**
- No se puede obtener código real
- Se debe generar código manualmente
- Implementaciones incorrectas

---

#### **1.5. Flujo Complejo y Frágil**

**Problema:**
- ❌ Múltiples pasos que pueden fallar
- ❌ Dependencias entre pasos
- ❌ Sin validación entre pasos
- ❌ Errores silenciosos

**Flujo Actual (PROBLEMÁTICO):**
```
1. Detectar componente → Puede fallar (mapeo incorrecto)
2. Consultar Storybook MCP → Puede fallar (agente no ejecuta)
3. Extraer código → Puede fallar (fetch no ejecuta JS)
4. Validar → Puede fallar (código incorrecto)
5. Implementar → Puede fallar (código genérico)
```

**Impacto:**
- Flujo corrupto
- Múltiples puntos de falla
- Difícil de depurar

---

## 2. Evaluación de Alternativas

### 🎯 **Opción 1: Storybook Local dentro del Proyecto** ⭐ RECOMENDADA

#### **Ventajas:**
- ✅ **Control total:** Storybook está en el proyecto
- ✅ **Acceso directo:** Puede leer archivos `.stories.ts` directamente
- ✅ **Sin dependencias externas:** No depende de Vercel
- ✅ **Más rápido:** No requiere red
- ✅ **Sincronización:** Siempre actualizado con el código
- ✅ **API directa:** Puede usar APIs de Storybook directamente

#### **Desventajas:**
- ⚠️ Requiere mantener Storybook actualizado
- ⚠️ Requiere espacio en disco
- ⚠️ Requiere configuración inicial

#### **Implementación:**
```typescript
// Leer archivo .stories.ts directamente
import { readFileSync } from 'fs';
import { parse } from '@storybook/csf';

const storyFile = readFileSync('vendor/ubits/packages/components/data-table/src/data-table.stories.ts', 'utf-8');
const stories = parse(storyFile);

// Extraer código de implementación directamente
const implementationStory = stories.stories.find(s => s.name === 'implementation');
const code = implementationStory.parameters?.docs?.source?.code;
```

**Factibilidad:** ✅ **ALTA** - Storybook ya está en `vendor/ubits/packages/storybook`

---

### 🎯 **Opción 2: Storybook en Vercel (URL Externa)**

#### **Ventajas:**
- ✅ Ya está desplegado
- ✅ Accesible desde cualquier lugar
- ✅ No requiere configuración local

#### **Desventajas:**
- ❌ **NO puede extraer código:** `fetch()` no ejecuta JavaScript
- ❌ **Depende de red:** Puede ser lento o fallar
- ❌ **Requiere autenticación:** Token de bypass necesario
- ❌ **No tiene API directa:** Solo HTML renderizado
- ❌ **No puede acceder a código fuente:** Solo HTML final

**Factibilidad:** ❌ **BAJA** - No puede extraer código real

---

### 🎯 **Opción 3: Storybook MCP Mejorado**

#### **Ventajas:**
- ✅ Ya está configurado
- ✅ Obtiene props estructuradas
- ✅ Puede mejorarse para obtener código

#### **Desventajas:**
- ❌ **Limitado actualmente:** Solo obtiene props
- ❌ **No puede extraer código HTML:** MCP no tiene esa capacidad
- ❌ **Depende de servidor externo:** Puede fallar
- ❌ **Requiere mejoras:** Necesita desarrollo adicional

**Factibilidad:** 🟡 **MEDIA** - Requiere desarrollo significativo

---

### 🎯 **Opción 4: Browser MCP para Extracción**

#### **Ventajas:**
- ✅ Ya está disponible
- ✅ Puede ejecutar JavaScript
- ✅ Puede extraer código desde pestaña "Code"

#### **Desventajas:**
- ❌ **Requiere navegación manual:** El agente debe navegar
- ❌ **Lento:** Requiere múltiples pasos
- ❌ **Frágil:** Depende de estructura HTML de Storybook
- ❌ **No automatizado:** Requiere intervención del agente

**Factibilidad:** 🟡 **MEDIA** - Funciona pero es frágil

---

### 🎯 **Opción 5: API de Storybook (index.json + source.json)**

#### **Ventajas:**
- ✅ Storybook expone `index.json` con metadatos
- ✅ Puede exponer código fuente si se configura
- ✅ Acceso programático directo

#### **Desventajas:**
- ❌ **No estándar:** No todos los Storybooks exponen código fuente
- ❌ **Requiere configuración:** Necesita add-on específico
- ❌ **Limitado:** Solo código fuente, no código renderizado

**Factibilidad:** 🟡 **MEDIA** - Requiere configuración adicional

---

## 3. Análisis de MCPs Disponibles

### 📚 **Storybook MCP (storybook-mcp)**

**Capacidades actuales:**
- ✅ `getComponentList()` - Lista componentes
- ✅ `getComponentsProps()` - Obtiene props estructuradas
- ❌ **NO obtiene código HTML**
- ❌ **NO obtiene código de implementación**

**Limitaciones:**
- Solo accede a `index.json` de Storybook
- No puede ejecutar JavaScript
- No puede extraer código renderizado

---

### 🌐 **Browser MCP (cursor-ide-browser)**

**Capacidades actuales:**
- ✅ `browser_navigate()` - Navegar a URLs
- ✅ `browser_snapshot()` - Obtener snapshot del DOM
- ✅ `browser_click()` - Hacer clic en elementos
- ✅ Puede ejecutar JavaScript (a través del navegador)

**Limitaciones:**
- Requiere navegación manual paso a paso
- Depende de estructura HTML de Storybook
- No automatizado completamente

---

### 🔧 **Autorun MCP (autorun)**

**Capacidades actuales:**
- ✅ `autorun.apply()` - Flujo completo de implementación
- ✅ `autorun.verify()` - Verificar implementación
- ✅ `autorun.plan()` - Obtener plan de implementación

**Limitaciones:**
- Depende de otros sistemas (Storybook MCP, Browser MCP)
- No puede extraer código directamente
- Flujo complejo y frágil

---

## 4. Opciones de Implementación

### 🎯 **Opción A: Storybook Local + Lectura Directa de Archivos** ⭐ MEJOR OPCIÓN

**Enfoque:**
1. Leer archivos `.stories.ts` directamente desde el proyecto
2. Parsear código fuente usando `@storybook/csf` o parser personalizado
3. Extraer código de implementación directamente
4. Generar código HTML/JS desde código fuente

**Ventajas:**
- ✅ **Control total:** Acceso directo a código fuente
- ✅ **Confiable:** No depende de red ni APIs externas
- ✅ **Rápido:** Lectura directa de archivos
- ✅ **Preciso:** Código fuente real, no renderizado
- ✅ **Sincronizado:** Siempre actualizado con el código

**Implementación:**
```typescript
// packages/autorun-core/src/poc/storybookLocalExtractor.ts

import { readFileSync } from 'fs';
import { parse } from '@storybook/csf';
import { extractCodeFromStory } from './codeExtractor';

export async function extractImplementationCodeFromLocal(
  componentId: string,
  storyName: string = 'implementation'
): Promise<string> {
  // 1. Encontrar archivo .stories.ts
  const storyFilePath = findStoryFile(componentId);
  
  // 2. Leer archivo
  const storyContent = readFileSync(storyFilePath, 'utf-8');
  
  // 3. Parsear usando CSF parser
  const stories = parse(storyContent);
  
  // 4. Encontrar historia específica
  const story = stories.stories.find(s => s.name === storyName);
  
  // 5. Extraer código de implementación
  const code = extractCodeFromStory(story);
  
  return code;
}
```

**Factibilidad:** ✅ **ALTA** - Storybook ya está en el proyecto

---

### 🎯 **Opción B: Storybook MCP + Browser MCP Combinado**

**Enfoque:**
1. Usar Storybook MCP para obtener props
2. Usar Browser MCP para extraer código desde pestaña "Code"
3. Combinar ambos para generar implementación

**Ventajas:**
- ✅ Usa herramientas existentes
- ✅ Obtiene props estructuradas
- ✅ Puede extraer código renderizado

**Desventajas:**
- ❌ Requiere múltiples pasos
- ❌ Depende de navegación manual
- ❌ Frágil (depende de estructura HTML)

**Factibilidad:** 🟡 **MEDIA** - Funciona pero es complejo

---

### 🎯 **Opción C: API Personalizada de Storybook**

**Enfoque:**
1. Crear add-on de Storybook que exponga código
2. Exponer endpoint API con código de implementación
3. Consumir API desde Autorun

**Ventajas:**
- ✅ Acceso programático directo
- ✅ Código estructurado
- ✅ Control total

**Desventajas:**
- ❌ Requiere desarrollo de add-on
- ❌ Requiere configuración adicional
- ❌ Tiempo de desarrollo significativo

**Factibilidad:** 🟡 **MEDIA** - Requiere desarrollo

---

## 5. Plan de Prueba de Concepto

### 🎯 **Objetivo de la POC**

**Crear un sistema simple y confiable que:**
1. ✅ Extraiga código de implementación desde Storybook local
2. ✅ Genere código HTML/JS correcto
3. ✅ Implemente componentes correctamente
4. ✅ Sea fácil de mantener y depurar

---

### 📋 **Fase 1: Setup y Análisis (Día 1)**

#### **1.1. Verificar Storybook Local**
```bash
# Verificar que Storybook está en el proyecto
ls -la vendor/ubits/packages/storybook

# Verificar estructura de componentes
ls -la vendor/ubits/packages/components/

# Verificar archivos .stories.ts
find vendor/ubits/packages/components -name "*.stories.ts" | head -5
```

#### **1.2. Analizar Estructura de Archivos**
- Identificar ubicación de archivos `.stories.ts`
- Identificar estructura de historias
- Identificar cómo se expone código de implementación

#### **1.3. Crear Directorio de POC**
```bash
mkdir -p packages/autorun-core/src/poc/storybook-v2
```

---

### 📋 **Fase 2: Extractor Básico (Día 2-3)**

#### **2.1. Crear Extractor de Archivos**
```typescript
// packages/autorun-core/src/poc/storybook-v2/fileExtractor.ts

export interface StoryFile {
  componentId: string;
  filePath: string;
  content: string;
}

export async function findStoryFile(componentId: string): Promise<StoryFile | null> {
  // Buscar archivo .stories.ts en diferentes ubicaciones
  const possiblePaths = [
    `vendor/ubits/packages/components/${componentId}/src/${componentId}.stories.ts`,
    `vendor/ubits/packages/components/${componentId}/src/${componentId}.stories.tsx`,
    // ... más rutas
  ];
  
  for (const filePath of possiblePaths) {
    try {
      const content = await readFile(filePath, 'utf-8');
      return { componentId, filePath, content };
    } catch {
      continue;
    }
  }
  
  return null;
}
```

#### **2.2. Crear Parser de Código**
```typescript
// packages/autorun-core/src/poc/storybook-v2/codeParser.ts

export interface ParsedStory {
  name: string;
  code: string;
  props?: Record<string, any>;
  imports?: string[];
}

export function parseStoryCode(storyContent: string, storyName: string): ParsedStory | null {
  // Parsear código TypeScript/JavaScript
  // Extraer código de la historia específica
  // Extraer props y imports
}
```

#### **2.3. Crear Generador de Código HTML**
```typescript
// packages/autorun-core/src/poc/storybook-v2/htmlGenerator.ts

export function generateHTMLFromStory(
  parsedStory: ParsedStory,
  componentId: string
): string {
  // Convertir código de Storybook a HTML
  // Incluir scripts necesarios
  // Incluir estilos necesarios
}
```

---

### 📋 **Fase 3: Integración con Autorun (Día 4-5)**

#### **3.1. Crear Nuevo Flujo Simplificado**
```typescript
// packages/autorun-core/src/poc/storybook-v2/simpleImplementation.ts

export async function implementComponentSimple(
  componentId: string,
  storyName: string = 'implementation',
  targetFile: string
): Promise<ImplementationResult> {
  // 1. Extraer código desde archivo local
  const storyFile = await findStoryFile(componentId);
  if (!storyFile) {
    throw new Error(`Story file not found for ${componentId}`);
  }
  
  // 2. Parsear código
  const parsedStory = parseStoryCode(storyFile.content, storyName);
  if (!parsedStory) {
    throw new Error(`Story ${storyName} not found`);
  }
  
  // 3. Generar HTML
  const html = generateHTMLFromStory(parsedStory, componentId);
  
  // 4. Implementar en archivo
  await writeToFile(targetFile, html);
  
  return { success: true, html };
}
```

#### **3.2. Crear MCP Tool Nuevo**
```typescript
// packages/autorun-core/src/mcp-server/tools/autorunApplyV2.ts

export async function autorunApplyV2(
  input: {
    componentId: string;
    storyName?: string;
    targetFile: string;
  }
): Promise<AutorunApplyOutput> {
  // Usar nuevo flujo simplificado
  return await implementComponentSimple(
    input.componentId,
    input.storyName,
    input.targetFile
  );
}
```

---

### 📋 **Fase 4: Pruebas y Validación (Día 6-7)**

#### **4.1. Pruebas con Componentes Reales**
- Probar con Button
- Probar con DataTable
- Probar con Modal
- Probar con Tabs

#### **4.2. Comparar con Implementación Actual**
- Comparar código generado
- Comparar tiempo de ejecución
- Comparar confiabilidad

#### **4.3. Documentar Resultados**
- Crear documento de comparación
- Documentar ventajas y desventajas
- Recomendar siguiente paso

---

## 6. Recomendaciones Finales

### 🎯 **Recomendación Principal: Opción A - Storybook Local**

**Razones:**
1. ✅ **Mayor confiabilidad:** Acceso directo a código fuente
2. ✅ **Más rápido:** No requiere red ni navegación
3. ✅ **Más preciso:** Código fuente real, no renderizado
4. ✅ **Más fácil de mantener:** Una sola fuente de verdad
5. ✅ **Ya disponible:** Storybook ya está en el proyecto

---

### 📋 **Plan de Implementación Recomendado**

#### **Paso 1: Crear POC Básico**
- Implementar extractor de archivos
- Implementar parser básico
- Probar con un componente simple (Button)

#### **Paso 2: Validar POC**
- Comparar con implementación actual
- Medir mejoras
- Identificar problemas

#### **Paso 3: Mejorar POC**
- Agregar manejo de errores
- Agregar validaciones
- Agregar logging

#### **Paso 4: Integrar con Autorun**
- Crear nuevo MCP tool
- Integrar con flujo existente
- Mantener compatibilidad con sistema actual

#### **Paso 5: Migración Gradual**
- Probar con componentes críticos
- Migrar gradualmente
- Deprecar sistema antiguo

---

### ⚠️ **Consideraciones Importantes**

1. **NO tocar código existente** hasta validar POC
2. **Mantener compatibilidad** con sistema actual
3. **Documentar todo** el proceso
4. **Probar exhaustivamente** antes de migrar
5. **Tener plan de rollback** si algo falla

---

## 📊 **Comparativa Final**

| Aspecto | Sistema Actual | POC Propuesta (Local) |
|---------|---------------|----------------------|
| **Confiabilidad** | ❌ Baja (múltiples fallos) | ✅ Alta (código fuente directo) |
| **Velocidad** | ❌ Lenta (múltiples pasos) | ✅ Rápida (lectura directa) |
| **Precisión** | ❌ Baja (código genérico) | ✅ Alta (código fuente real) |
| **Mantenibilidad** | ❌ Difícil (múltiples fuentes) | ✅ Fácil (una fuente) |
| **Complejidad** | ❌ Alta (múltiples sistemas) | ✅ Baja (sistema simple) |

---

**Última actualización:** 2025-01-23  
**Estado:** 📋 Plan de POC Listo para Implementación  
**Prioridad:** 🔴 CRÍTICA

