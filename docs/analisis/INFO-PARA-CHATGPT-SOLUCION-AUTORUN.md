# Información para ChatGPT - Solución Autorun

**Fecha:** 2025-01-03  
**Propósito:** Recopilación completa de información para que ChatGPT ayude a encontrar una solución definitiva al problema de que Autorun no se está ejecutando automáticamente.

---

## 1️⃣ Reglas Actuales de Cursor

### Archivo Principal: `.cursorrules`

**Ubicación:** `.cursorrules` (raíz del proyecto)

**Contenido completo:** Ver archivo adjunto o leer desde `.cursorrules`

**Puntos críticos relevantes:**

```markdown
## 🚨🚨🚨 BLOQUEO TÉCNICO - FLUJO AUTOMÁTICO DE IMPLEMENTACIÓN 🚨🚨🚨

**⚠️⚠️⚠️ CRÍTICO: PROHIBIDO usar `write()` o `search_replace()` DIRECTOS en `prototypes/` ⚠️⚠️⚠️**

**SIEMPRE usar `interceptedWrite()` o `interceptedSearchReplace()` en su lugar:**

**❌ PROHIBIDO:**
```typescript
// ❌ NUNCA hacer esto en prototypes/
await write(filePath, content);
await search_replace(filePath, oldString, newString);
```

**✅ OBLIGATORIO:**
```typescript
// ✅ SIEMPRE usar interceptedWrite() o interceptedSearchReplace()
import { interceptedWrite, interceptedSearchReplace } from '@autorun/core/interceptors/toolInterceptors';

await interceptedWrite(filePath, content, {
  componentName: 'Button',
  userMessage: userMessage
});

await interceptedSearchReplace(filePath, oldString, newString, {
  componentName: 'Button',
  userMessage: userMessage
});
```

**⚠️ IMPORTANTE:**
- `interceptedWrite()` y `interceptedSearchReplace()` ejecutan `guardWrite()` automáticamente
- Si detectan componentes UBITS, bloquean y fuerzan uso de `autorun.apply()`
- Si permiten escribir, ejecutan el flujo automático completo
- ✅ **ESCRIBEN el archivo directamente** - NO necesitas llamar `write()` o `search_replace()` después
- Auto-reload se ejecuta automáticamente después de escribir en `prototypes/`
```

### Archivos en `.cursor/rules/`

**Ubicación:** `.cursor/rules/`

**Archivos relevantes:**
- `00-inicio.md` - Verificación inicial
- `03-componentes.md` - Reglas de componentes UBITS
- `04-implementacion.md` - **CRÍTICO:** Reglas de implementación (contiene las reglas de interceptores)

**Contenido de `.cursor/rules/04-implementacion.md` (relevante):**

```markdown
## 🚨🚨🚨 DETECCIÓN AUTOMÁTICA DE OPERACIONES COMUNES ⚠️ NUEVO

**⚠️ CRÍTICO: El sistema detecta AUTOMÁTICAMENTE operaciones comunes y BLOQUEA si no se consultaron las guías obligatorias.**

### **Operaciones Detectadas Automáticamente:**

1. **Eliminar HeaderSection** → Debe consultar `GUIA-ELIMINAR-HEADERSECTION.md` ⚠️ OBLIGATORIO
2. **Interceptar ContentManager** → Debe consultar `GUIA-CONTENTMANAGER-UPDATECONTENT.md` ⚠️ OBLIGATORIO
3. **Modificar .content-area** → Debe consultar `GUIA-CONTENTMANAGER-UPDATECONTENT.md` ⚠️ OBLIGATORIO
4. **Agregar componentes UBITS** → Debe consultar `CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md` ⚠️ OBLIGATORIO
5. **Agregar estilos a componentes** → Debe consultar `GUIA-ERRORES-COMUNES-UBITS.md` (Error #53, #55) ⚠️ ADVERTENCIA
```

---

## 2️⃣ Config del MCP en Cursor

### Archivo: `.cursor/mcp.json`

**Ubicación:** `.cursor/mcp.json`

**Contenido completo:**

```json
{
  "mcpServers": {
    "storybook": {
      "command": "npx",
      "args": [
        "-y",
        "storybook-mcp@latest"
      ],
      "env": {
        "STORYBOOK_URL": "http://localhost:6006/index.json"
      }
    },
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "talk-to-figma": {
      "command": "npx",
      "args": [
        "-y",
        "cursor-talk-to-figma-mcp"
      ],
      "env": {}
    },
    "clarity": {
      "command": "npx",
      "args": [
        "-y",
        "@microsoft/clarity-mcp-server"
      ],
      "env": {}
    },
    "vercel": {
      "url": "https://mcp.vercel.com"
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {}
    },
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    },
    "mcp-gsheets": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-gsheets@latest"
      ],
      "env": {}
    },
    "autorun": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "packages/autorun-core/src/cli/autorun-mcp-server.ts"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    },
    "google-sheets": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-gsheets@latest"
      ],
      "env": {}
    }
  }
}
```

**Nota:** No hay configuración global en `~/.cursor/mcp.json` - todo está en el proyecto.

---

## 3️⃣ Nombres EXACTOS de los Tools MCP

### Server de Autorun

**Nombre exacto:** `autorun`

**Tools disponibles:**

1. **`autorun.plan`**
   - Descripción: Genera un plan de implementación basado en el mensaje del usuario sin ejecutar la implementación
   - Input: `{ message: string }`
   - Output: Plan de implementación con historias de Storybook

2. **`autorun.apply`** ⭐ **CRÍTICO**
   - Descripción: Ejecuta TODO el flujo de implementación automáticamente: detección → Storybook MCP → extracción → validación → implementación → post-procesamiento
   - Input: `{ message: string, targetFiles?: string[], options?: {...} }`
   - Output: Resultado de la implementación con archivos escritos

3. **`autorun.verify`**
   - Descripción: Verifica que los archivos fueron generados correctamente por Autorun y cumplen con todas las validaciones
   - Input: `{ targetFiles?: string[] | 'diff', options?: {...} }`
   - Output: Resultado de verificación

### Server de Storybook

**Nombre exacto:** `storybook`

**Tools disponibles:**

1. **`mcp_storybook_getComponentList`**
   - Descripción: Lista todos los componentes disponibles en Storybook
   - Input: `{}`
   - Output: Lista de componentes con IDs

2. **`mcp_storybook_getComponentsProps`** ⭐ **CRÍTICO**
   - Descripción: Obtiene las props exactas de uno o más componentes
   - Input: `{ componentIds: string[] }`
   - Output: Props exactas de los componentes solicitados

**Nota:** En las reglas de `.cursorrules`, se menciona `storybook-ubits` como server, pero en la configuración MCP el server se llama `storybook`. El tool esperado es `mcp_storybook_getComponentsProps`.

---

## 4️⃣ Mensaje de Violación (Log Completo)

### Caso Real: Implementación de Accordion

**Prompt del usuario:**
```
vamso a provar de nuevo si autorun funciona como deberia con lo que hiciste, implementa un acordion con descripcines de las encuestas
```

**Lo que hizo el agente:**
- ❌ Usó `search_replace()` directamente (2 veces)
- ❌ NO usó `interceptedSearchReplace()`
- ❌ NO usó `autorun.apply()` vía MCP
- ⚠️ Ejecutó auto-reload manualmente (no automáticamente)

**Logs generados:**

```
[No hay logs de violación porque el sistema NO detectó la violación]

El agente simplemente usó search_replace() directamente y funcionó.
No hubo bloqueo, no hubo mensaje de error.
```

**Análisis del problema:**

El sistema **NO está generando mensajes de violación** porque:

1. **`interceptedSearchReplace()` es TypeScript** y no puede ser importado directamente desde el contexto del agente de Cursor
2. **Las herramientas nativas de Cursor (`write()` y `search_replace()`)** no pueden ser interceptadas automáticamente desde TypeScript
3. **El agente puede usar `search_replace()` directamente** sin pasar por los interceptores
4. **No hay enforcement automático** - las reglas en `.cursorrules` son solo instrucciones para el agente, no código que se ejecute automáticamente

**Archivo de análisis completo:**
- `docs/analisis/ANALISIS-AUTORUN-ACCORDION-2025-01-03.md`

---

## 5️⃣ Dónde se "Enforzan" esas Reglas

### Problema Identificado: **NO HAY ENFORCEMENT AUTOMÁTICO**

**El sistema actual:**

1. **`.cursorrules`** - Solo contiene instrucciones para el agente (no código ejecutable)
2. **`interceptedWrite()` / `interceptedSearchReplace()`** - Funciones TypeScript que el agente DEBE llamar manualmente
3. **`guardWrite()`** - Función que se ejecuta DENTRO de los interceptores, pero solo si el agente los llama
4. **`PreWriteValidator`** - Validador que se ejecuta DENTRO de los interceptores, pero solo si el agente los llama

### Archivos Relevantes:

**1. Interceptores (donde DEBERÍA ejecutarse el enforcement):**
- `packages/autorun-core/src/interceptors/toolInterceptors.ts`
  - Línea 53-60: `interceptedWrite()` - Función que intercepta write()
  - Línea 455-463: `interceptedSearchReplace()` - Función que intercepta search_replace()
  - Línea 67-86: Ejecuta `guardWrite()` automáticamente
  - Línea 78-85: Lanza error si `guardWrite()` bloquea

**2. Write Guard (donde se detecta la violación):**
- `packages/autorun-core/src/helpers/writeGuard.ts`
  - Línea 43-74: Detecta componentes UBITS en el contenido
  - Línea 77-78: Genera mensaje de bloqueo: `❌ [Write Guard] write() BLOQUEADO para componente: ${interceptResult.componentName}`
  - Línea 96-129: Instrucciones para usar `autorun.apply()` o `interceptedWrite()`

**3. PreWriteValidator (validación adicional):**
- `packages/autorun-core/src/validation/PreWriteValidator.ts`
  - Línea 40-47: `validateBeforeWrite()` - Valida antes de escribir
  - Línea 59-100: Detecta componentes y carga guías automáticamente

**4. Auto Write Interceptor (detección automática):**
- `packages/autorun-core/src/helpers/autoWriteInterceptor.ts`
  - Detecta componentes UBITS en el contenido
  - Determina si debe interceptar write()

### El Problema Fundamental:

**NO HAY ENFORCEMENT AUTOMÁTICO** porque:

1. **Las herramientas nativas de Cursor (`write()` y `search_replace()`)** no pueden ser interceptadas automáticamente desde TypeScript
2. **`interceptedWrite()` y `interceptedSearchReplace()`** son funciones que el agente DEBE llamar manualmente
3. **El agente puede saltarse los interceptores** usando `write()` o `search_replace()` directamente
4. **Las reglas en `.cursorrules`** son solo instrucciones de texto, no código ejecutable

**Mensajes de bloqueo que DEBERÍAN aparecer (pero no aparecen si el agente no usa los interceptores):**

```
❌ [Write Guard] write() BLOQUEADO para componente: Accordion
❌ [Write Guard] Razón: Componente UBITS detectado. Debe usar autorun.apply() o interceptedWrite()
❌ [Tool Interceptor] guardWrite() BLOQUEÓ write(): Componente UBITS detectado
❌ IMPLEMENTACIÓN BLOQUEADA: Componente UBITS detectado. Debe usar autorun.apply() o interceptedWrite()
```

---

## 6️⃣ Caso Exacto que Falla

### Prompt del Usuario:

```
vamso a provar de nuevo si autorun funciona como deberia con lo que hiciste, implementa un acordion con descripcines de las encuestas
```

### Lo que Hizo el Agente:

1. **✅ Detectó el componente:** Accordion
2. **✅ Consultó documentación:** Leyó archivos de referencia sobre Accordion
3. **❌ Usó `search_replace()` directamente (2 veces):**
   ```typescript
   // Primera vez: Agregar HTML del acordeón
   search_replace(
     file_path: 'prototypes/canvas-administrador-encuestas-2025-12-18.html',
     old_string: '<!-- Main Content -->\n        <main class="main-content">\n            <!-- Top Navigation -->\n            <div id="top-nav-container"></div>\n            \n        </main>',
     new_string: '<!-- Main Content -->\n        <main class="main-content">\n            <!-- Top Navigation -->\n            <div id="top-nav-container"></div>\n            \n            <!-- Acordeón de Encuestas -->\n            <div style="padding: var(--ubits-spacing-2xl, 24px); max-width: 1000px; margin: 0 auto;">\n                ...\n            </div>\n        </main>'
   )
   
   // Segunda vez: Agregar JavaScript de inicialización
   search_replace(
     file_path: 'prototypes/canvas-administrador-encuestas-2025-12-18.html',
     old_string: '    // Inicializar dot en el radio button que está checked por defecto\n    const radioChecked = document.querySelector(\'input[name="filtro-tipo"]:checked\');\n    if (radioChecked) {\n      const circle = radioChecked.closest(\'.ubits-radio-button\')?.querySelector(\'.ubits-radio-button__circle\');\n      if (circle && !circle.querySelector(\'.ubits-radio-button__dot\')) {\n        circle.innerHTML = \'<span class="ubits-radio-button__dot"></span>\';\n      }\n    }\n  </script>',
     new_string: '    // ... código anterior ...\n    // ============================================\n    // Inicializar acordeón de encuestas\n    // ============================================\n    (function() {\n      function initAccordionEncuestas() {\n        // ... código de inicialización ...\n      }\n      // ... más código ...\n    })();\n  </script>'
   )
   ```

4. **❌ NO usó `interceptedSearchReplace()`:**
   - No importó la función
   - No la llamó
   - Usó `search_replace()` directamente

5. **❌ NO usó `autorun.apply()` vía MCP:**
   - No llamó `call_mcp_tool()` con `autorun.apply`
   - No ejecutó el flujo automático completo

6. **⚠️ Ejecutó auto-reload manualmente:**
   ```typescript
   // Ejecutó manualmente después de search_replace()
   call_mcp_tool({
     server: 'cursor-ide-browser',
     toolName: 'browser_navigate',
     arguments: { url: 'http://localhost:3000/canvas-administrador-encuestas-2025-12-18.html' }
   })
   ```

### Resultado:

- ✅ **Funcional:** El acordeón se implementó correctamente y funciona
- ❌ **Proceso:** Autorun NO funcionó como debía
- ❌ **Violación:** Se violaron las reglas de `.cursorrules`
- ❌ **Flujo automático:** No se ejecutó el flujo automático completo
- ❌ **Storybook:** No se consultó Storybook automáticamente
- ❌ **Validación:** No se validó la estructura antes de escribir

### Análisis Completo:

Ver: `docs/analisis/ANALISIS-AUTORUN-ACCORDION-2025-01-03.md`

---

## 🎯 Resumen del Problema

### Problema Principal:

**El agente puede usar `write()` y `search_replace()` directamente sin pasar por los interceptores, violando las reglas de `.cursorrules`.**

### Causa Raíz:

1. **Las herramientas nativas de Cursor no pueden ser interceptadas automáticamente** desde TypeScript
2. **`interceptedWrite()` y `interceptedSearchReplace()` son funciones que el agente DEBE llamar manualmente**
3. **No hay enforcement automático** - las reglas son solo instrucciones de texto
4. **El agente puede saltarse los interceptores** sin consecuencias

### Solución Esperada:

**Necesitamos una forma de FORZAR que el agente use `autorun.apply()` o los interceptores, sin poder saltarse el flujo automático.**

### Preguntas para ChatGPT:

1. **¿Cómo podemos interceptar automáticamente `write()` y `search_replace()` en Cursor?**
2. **¿Hay alguna forma de hacer que las reglas de `.cursorrules` sean "enforzables" automáticamente?**
3. **¿Podemos crear un wrapper o proxy que intercepte las herramientas nativas de Cursor?**
4. **¿Hay alguna configuración de Cursor que permita forzar el uso de ciertas herramientas?**
5. **¿Podemos modificar el comportamiento del agente para que siempre use `autorun.apply()` cuando detecte componentes UBITS?**

---

## 📝 Archivos de Referencia

- `.cursorrules` - Reglas principales
- `.cursor/rules/04-implementacion.md` - Reglas de implementación
- `.cursor/mcp.json` - Configuración MCP
- `packages/autorun-core/src/interceptors/toolInterceptors.ts` - Interceptores
- `packages/autorun-core/src/helpers/writeGuard.ts` - Write Guard
- `packages/autorun-core/src/validation/PreWriteValidator.ts` - PreWriteValidator
- `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` - Tool autorun.apply
- `docs/analisis/ANALISIS-AUTORUN-ACCORDION-2025-01-03.md` - Análisis del caso real

---

**Última actualización:** 2025-01-03
