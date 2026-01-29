# 🔍 Análisis: ¿Puede Autorun Implementar Componentes desde URL de Storybook?

> **Fecha:** 2025-01-10  
> **Objetivo:** Analizar si Autorun puede implementar componentes en templates desde la URL de Storybook como lo hace Libraries UI, o qué necesita para lograrlo

---

## 🎯 Pregunta Clave

**¿Puede Autorun actualmente implementar componentes en templates HTML desde la URL de Storybook de la misma manera que Libraries UI muestra ejemplos de código?**

---

## ✅ LO QUE AUTORUN PUEDE HACER ACTUALMENTE

### **1. Descubrir Componentes desde Storybook** ✅

**Capacidad actual:**
```typescript
// Descubrir todos los componentes desde index.json
const discovery = await discoverStorybookComponents();
// Retorna: { components: [...], totalComponents: 50 }

// Buscar componente específico
const component = await findComponentByIdOrName('Tabs');
// Retorna: { componentId: 'navegacion-tabs', title: 'Navegación/Tabs', stories: [...] }
```

**Archivo:** `packages/autorun-core/src/helpers/storybookIdDiscovery.ts`

**Lo que hace:**
- ✅ Consulta `index.json` de Storybook
- ✅ Parsea todas las entradas
- ✅ Extrae IDs de componentes
- ✅ Extrae historias disponibles
- ✅ Valida que los IDs existen

**Limitación:**
- ⚠️ Solo obtiene **metadatos** (IDs, títulos, nombres de historias)
- ❌ **NO obtiene código HTML/CSS** de los componentes
- ❌ **NO obtiene estructura** de los componentes

---

### **2. Cargar Componentes JS/CSS desde Storybook** ✅

**Capacidad actual:**
```typescript
// Cargar componente desde manifest.json
await window.AUTORUN.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.vercel.app/components/button/manifest.json'
});
```

**Archivo:** `packages/autorun-core/src/ComponentLoader.ts`

**Lo que hace:**
- ✅ Carga `manifest.json` desde Storybook
- ✅ Carga archivos JS desde URLs públicas
- ✅ Carga archivos CSS desde URLs públicas
- ✅ Evita duplicados (verifica si ya está cargado)

**Limitación:**
- ⚠️ Requiere estructura específica (`/components/{name}/manifest.json`)
- ❌ **NO extrae código HTML** desde Storybook
- ❌ **NO genera código de implementación** automáticamente
- ❌ **NO parsea props** desde Storybook

---

### **3. Obtener Historias desde Storybook** ✅

**Capacidad actual:**
```typescript
// Obtener historias del componente
const stories = await getComponentStories('DataTable', 'data-data-table');
// Retorna: { componentName, componentId, stories: [...], totalStories }
```

**Archivo:** `packages/autorun-core/src/helpers/storybookStories.ts`

**Lo que hace:**
- ✅ Consulta `index.json` para obtener historias
- ✅ Extrae información de historias (ID, nombre, URL)
- ✅ Genera plan de implementación basado en historias

**Limitación:**
- ⚠️ Solo obtiene **metadatos** de historias (nombres, IDs, URLs)
- ❌ **NO obtiene código** de las historias
- ❌ **NO obtiene props** de las historias
- ❌ **NO obtiene estructura HTML** de las historias

---

### **4. Navegar a Storybook** ✅

**Capacidad actual:**
```typescript
// Construir URL de Storybook
const urlResult = await buildSafeStorybookUrl('data-data-table', 'default');
// Retorna: { url: 'https://ubits-storybook10.vercel.app/?path=/story/...', warning?: string }

// Navegar (requiere Browser MCP)
await mcp_cursor-ide-browser_browser_navigate({ url: urlResult.url });
```

**Archivo:** `packages/autorun-core/src/helpers/verifyStorybookStories.ts`

**Lo que hace:**
- ✅ Construye URLs válidas de Storybook
- ✅ Valida que las historias existen
- ✅ Navega a Storybook (con Browser MCP)

**Limitación:**
- ⚠️ Solo navega, **NO extrae información** de la página
- ❌ **NO parsea HTML** de la página
- ❌ **NO extrae código** de la página
- ❌ **NO extrae props** de la página

---

### **5. Consultar Storybook MCP** ⚠️ PARCIAL

**Capacidad actual:**
```typescript
// Emite mensaje para que el agente ejecute MCP
console.log(`[AUTORUN_STORYBOOK_MCP]${componentName}:${storybookId}[/AUTORUN_STORYBOOK_MCP]`);
// El agente debe ejecutar: mcp_storybook_getComponentsProps(['component-id'])
```

**Archivo:** `packages/addons/functional/pre-implementation-check/src/PreImplementationCheckAddon.ts`

**Lo que hace:**
- ✅ Emite mensaje especial para interceptar
- ✅ Instruye al agente a usar MCP
- ⚠️ **NO ejecuta MCP directamente** (requiere que el agente lo haga)

**Limitación:**
- ❌ **NO puede ejecutar MCP directamente** desde Node.js
- ❌ **NO obtiene props** automáticamente
- ❌ **NO obtiene estructura** automáticamente
- ⚠️ Depende de que el agente ejecute MCP manualmente

---

## ❌ LO QUE AUTORUN NO PUEDE HACER ACTUALMENTE

### **1. Extraer Código HTML desde URL de Storybook** ❌

**Lo que Libraries UI tiene:**
```markdown
### Ejemplo de código completo
```typescript
import { FxAvatar } from "@flux-ui/core";

<FxAvatar
  src="https://example.com/avatar.jpg"
  alt="User avatar"
  fallback="JD"
  size="lg"
  shape="circle"
/>
```
```

**Lo que Autorun necesita pero NO tiene:**
- ❌ **NO puede extraer código HTML** desde la URL de Storybook
- ❌ **NO puede parsear el HTML** de la página de Storybook
- ❌ **NO puede extraer bloques de código** desde la página
- ❌ **NO tiene parser de código** desde Storybook

**¿Qué se necesita?**
```typescript
// Función que NO existe actualmente
async function extractCodeFromStorybookUrl(
  storybookUrl: string
): Promise<string> {
  // 1. Navegar a la URL
  // 2. Extraer HTML de la página
  // 3. Buscar bloques de código (pre, code, etc.)
  // 4. Parsear y extraer código
  // 5. Retornar código limpio
}
```

---

### **2. Extraer Tabla de Props desde Storybook** ❌

**Lo que Libraries UI tiene:**
```markdown
| Name | Description | Default | Control |
| --- | --- | --- | --- |
| src | URL of the avatar image<br>string | - | https://images.unsplash.com/... |
| fallback | Initials to display as fallback<br>string | - | JD |
| size | Size of the avatar<br>"xs"\"sm"\"md"\"lg"\"xl" | md | xssmmdlgxl |
```

**Lo que Autorun necesita pero NO tiene:**
- ❌ **NO puede extraer tabla de props** desde Storybook
- ❌ **NO puede parsear tablas** desde HTML/Markdown
- ❌ **NO tiene estructura de props** desde Storybook
- ❌ **NO puede validar props** automáticamente

**¿Qué se necesita?**
```typescript
// Función que NO existe actualmente
async function extractPropsTableFromStorybook(
  componentId: string
): Promise<StorybookPropsTable[]> {
  // 1. Navegar a la página de docs del componente
  // 2. Extraer tabla de props desde HTML/Markdown
  // 3. Parsear a estructura tipada
  // 4. Validar y retornar
}
```

---

### **3. Generar Código de Implementación Automáticamente** ❌

**Lo que Libraries UI hace:**
- ✅ Muestra código completo listo para copiar
- ✅ Incluye imports necesarios
- ✅ Incluye props correctas
- ✅ Incluye estructura HTML completa

**Lo que Autorun necesita pero NO tiene:**
- ❌ **NO puede generar código** automáticamente desde Storybook
- ❌ **NO puede combinar props** con estructura HTML
- ❌ **NO puede generar imports** automáticamente
- ❌ **NO puede crear código de implementación** completo

**¿Qué se necesita?**
```typescript
// Función que NO existe actualmente
async function generateImplementationCode(
  componentId: string,
  props: Record<string, any>
): Promise<string> {
  // 1. Obtener estructura HTML desde Storybook
  // 2. Obtener props desde Storybook
  // 3. Combinar props con estructura
  // 4. Generar código completo
  // 5. Retornar código listo para usar
}
```

---

### **4. Extraer Estructura HTML desde Storybook** ❌

**Lo que Libraries UI tiene:**
- ✅ Estructura HTML completa en ejemplos
- ✅ Estilos relacionados incluidos
- ✅ Contexto completo (no solo el componente)

**Lo que Autorun necesita pero NO tiene:**
- ❌ **NO puede extraer estructura HTML** desde Storybook
- ❌ **NO puede parsear DOM** de Storybook
- ❌ **NO puede extraer estilos** relacionados
- ❌ **NO puede obtener contexto** completo

**¿Qué se necesita?**
```typescript
// Función que NO existe actualmente
async function extractHTMLStructureFromStorybook(
  storybookUrl: string
): Promise<{
  html: string;
  css: string[];
  context: string;
}> {
  // 1. Navegar a la URL
  // 2. Extraer HTML del componente renderizado
  // 3. Extraer estilos relacionados
  // 4. Extraer contexto (HTML completo)
  // 5. Retornar estructura completa
}
```

---

### **5. Validar Estructura Antes de Implementar** ❌

**Lo que Libraries UI tiene:**
- ✅ Ejemplos validados y funcionales
- ✅ Estructura correcta garantizada
- ✅ Props correctas garantizadas

**Lo que Autorun necesita pero NO tiene:**
- ❌ **NO puede validar estructura HTML** antes de implementar
- ❌ **NO puede comparar** implementación vs Storybook
- ❌ **NO puede detectar errores** estructurales
- ❌ **NO puede validar props** automáticamente

**¿Qué se necesita?**
```typescript
// Función que NO existe actualmente
async function validateImplementationStructure(
  implementation: string,
  componentId: string
): Promise<ValidationResult> {
  // 1. Obtener estructura esperada desde Storybook
  // 2. Comparar HTML implementado vs esperado
  // 3. Comparar props implementadas vs esperadas
  // 4. Detectar diferencias
  // 5. Retornar validación completa
}
```

---

## 📊 Comparativa: Lo que Hace Libraries UI vs Lo que Hace Autorun

| Funcionalidad | Libraries UI | Autorun Actual | ¿Puede Autorun? |
|---------------|--------------|----------------|-----------------|
| **Mostrar código completo** | ✅ Sí | ❌ No | ❌ **NO** |
| **Extraer código desde URL** | ✅ Sí | ❌ No | ❌ **NO** |
| **Tabla de props estructurada** | ✅ Sí | ❌ No | ❌ **NO** |
| **Extraer props desde Storybook** | ✅ Sí | ❌ No | ❌ **NO** |
| **Generar código automáticamente** | ✅ Sí | ❌ No | ❌ **NO** |
| **Validar estructura** | ✅ Sí | ❌ No | ❌ **NO** |
| **Descubrir componentes** | ✅ Sí | ✅ Sí | ✅ **SÍ** |
| **Cargar JS/CSS** | ✅ Sí | ✅ Sí | ✅ **SÍ** |
| **Obtener historias** | ✅ Sí | ✅ Sí | ✅ **SÍ** |
| **Navegar a Storybook** | ✅ Sí | ✅ Sí | ✅ **SÍ** |

---

## 🎯 ¿QUÉ NECESITA AUTORUN PARA HACER LO QUE HACE LIBRARIES UI?

### **1. Parser de Código desde Storybook** 🔴 CRÍTICO

**Necesidad:**
- Extraer código HTML/JSX desde la URL de Storybook
- Parsear bloques de código (`<pre><code>`, etc.)
- Limpiar y formatear código extraído

**Implementación requerida:**
```typescript
// packages/autorun-core/src/helpers/storybookCodeParser.ts

export interface StorybookCodeBlock {
  code: string;
  language: string;
  description?: string;
  imports?: string[];
}

export async function parseCodeFromStorybookUrl(
  storybookUrl: string
): Promise<StorybookCodeBlock[]> {
  // 1. Navegar a la URL usando Browser MCP o fetch
  // 2. Extraer HTML de la página
  // 3. Buscar bloques de código (selectores CSS: pre code, .sb-code-block, etc.)
  // 4. Parsear cada bloque
  // 5. Extraer imports si están disponibles
  // 6. Retornar array de bloques de código
}
```

**Dependencias:**
- ✅ Browser MCP (ya disponible) o `fetch` + parser HTML
- ✅ Parser HTML (cheerio, jsdom, o similar)
- ✅ Selectores CSS para encontrar bloques de código

---

### **2. Parser de Tabla de Props desde Storybook** 🔴 CRÍTICO

**Necesidad:**
- Extraer tabla de props desde la página de docs
- Parsear tabla HTML/Markdown a estructura tipada
- Validar y normalizar props

**Implementación requerida:**
```typescript
// packages/autorun-core/src/helpers/storybookPropsParser.ts

export interface StorybookPropsTable {
  name: string;
  description: string;
  defaultValue: string;
  control: string;
  required: boolean;
  type: string;
}

export async function parsePropsTableFromStorybook(
  componentId: string
): Promise<StorybookPropsTable[]> {
  // 1. Navegar a la página de docs del componente
  // 2. Buscar tabla de props (selectores: table, .props-table, etc.)
  // 3. Parsear filas de la tabla
  // 4. Extraer información de cada prop
  // 5. Validar y normalizar
  // 6. Retornar array de props
}
```

**Dependencias:**
- ✅ Browser MCP o fetch + parser HTML
- ✅ Parser HTML para extraer tablas
- ✅ Lógica de parsing de tablas

---

### **3. Generador de Código de Implementación** 🔴 CRÍTICO

**Necesidad:**
- Combinar estructura HTML con props
- Generar código completo listo para usar
- Incluir imports necesarios

**Implementación requerida:**
```typescript
// packages/autorun-core/src/helpers/storybookCodeGenerator.ts

export interface ImplementationCode {
  html: string;
  javascript?: string;
  css?: string;
  imports?: string[];
  complete: string; // Código completo listo para usar
}

export async function generateImplementationCode(
  componentId: string,
  props: Record<string, any>,
  useCase?: string
): Promise<ImplementationCode> {
  // 1. Obtener estructura HTML desde Storybook
  // 2. Obtener props desde Storybook
  // 3. Obtener ejemplo de código desde Storybook
  // 4. Combinar props con estructura
  // 5. Generar código completo
  // 6. Incluir imports si es necesario
  // 7. Retornar código completo
}
```

**Dependencias:**
- ✅ Parser de código (del punto 1)
- ✅ Parser de props (del punto 2)
- ✅ Lógica de generación de código
- ✅ Template engine o string interpolation

---

### **4. Extractor de Estructura HTML desde Storybook** 🟡 VALIOSO

**Necesidad:**
- Extraer HTML renderizado del componente
- Extraer estilos relacionados
- Extraer contexto completo

**Implementación requerida:**
```typescript
// packages/autorun-core/src/helpers/storybookStructureExtractor.ts

export interface StorybookStructure {
  componentHTML: string;
  relatedStyles: string[];
  contextHTML: string;
  renderedHTML: string; // HTML después de renderizar
}

export async function extractStructureFromStorybook(
  storybookUrl: string
): Promise<StorybookStructure> {
  // 1. Navegar a la URL usando Browser MCP
  // 2. Esperar a que el componente se renderice
  // 3. Extraer HTML del componente (selector específico)
  // 4. Extraer estilos relacionados (inline, classes, etc.)
  // 5. Extraer contexto (HTML completo de la página)
  // 6. Retornar estructura completa
}
```

**Dependencias:**
- ✅ Browser MCP (ya disponible)
- ✅ Selectores CSS para encontrar el componente
- ✅ Lógica de extracción de estilos

---

### **5. Validador de Estructura** 🟡 VALIOSO

**Necesidad:**
- Comparar implementación vs Storybook
- Detectar diferencias estructurales
- Validar props

**Implementación requerida:**
```typescript
// packages/autorun-core/src/validation/storybookStructureValidator.ts

export interface StructureValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  structureMatch: boolean;
  propsMatch: boolean;
  cssMatch: boolean;
  differences: Array<{
    type: 'missing' | 'extra' | 'different';
    element: string;
    expected?: string;
    actual?: string;
  }>;
}

export async function validateImplementationStructure(
  implementation: string,
  componentId: string
): Promise<StructureValidation> {
  // 1. Obtener estructura esperada desde Storybook
  // 2. Parsear implementación
  // 3. Comparar HTML
  // 4. Comparar props
  // 5. Comparar CSS
  // 6. Detectar diferencias
  // 7. Retornar validación completa
}
```

**Dependencias:**
- ✅ Extractor de estructura (del punto 4)
- ✅ Parser de HTML
- ✅ Lógica de comparación

---

## 📋 Resumen: Capacidades Actuales vs Necesarias

### **✅ LO QUE AUTORUN YA TIENE:**
1. ✅ Descubrimiento de componentes desde `index.json`
2. ✅ Carga de JS/CSS desde `manifest.json`
3. ✅ Obtención de historias desde `index.json`
4. ✅ Navegación a Storybook (con Browser MCP)
5. ✅ Validación pre-implementación (checklist)

### **❌ LO QUE AUTORUN NO TIENE (Y NECESITA):**
1. ❌ **Parser de código** desde URL de Storybook
2. ❌ **Parser de tabla de props** desde Storybook
3. ❌ **Generador de código** de implementación
4. ❌ **Extractor de estructura HTML** desde Storybook
5. ❌ **Validador de estructura** antes de implementar

---

## 🎯 Conclusión

### **¿Puede Autorun implementar componentes desde URL de Storybook como Libraries UI?**

**Respuesta: ❌ NO, actualmente NO puede hacerlo completamente.**

**Razones:**
1. ❌ **NO puede extraer código** desde la URL de Storybook
2. ❌ **NO puede parsear props** desde Storybook
3. ❌ **NO puede generar código** automáticamente
4. ❌ **NO puede validar estructura** antes de implementar

**Lo que SÍ puede hacer:**
- ✅ Descubrir componentes
- ✅ Cargar JS/CSS
- ✅ Navegar a Storybook
- ✅ Obtener metadatos (IDs, historias)

**Lo que necesita para hacerlo completamente:**
1. 🔴 **Parser de código** desde Storybook (CRÍTICO)
2. 🔴 **Parser de props** desde Storybook (CRÍTICO)
3. 🔴 **Generador de código** automático (CRÍTICO)
4. 🟡 **Extractor de estructura** HTML (VALIOSO)
5. 🟡 **Validador de estructura** (VALIOSO)

---

**Última actualización:** 2025-01-10  
**Versión:** 1.0.0
