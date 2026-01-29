# 🔄 Guía Completa: Flujo de Implementación de Componentes

> **⚠️ CRÍTICO:** Este documento describe el flujo COMPLETO de implementación de componentes UBITS y las herramientas usadas en cada paso.

---

## 📋 Índice

1. [Inicialización al Inicio de Sesión](#1-inicialización-al-inicio-de-sesión)
2. [Detección Automática de Componentes](#2-detección-automática-de-componentes)
3. [Consulta de Storybook](#3-consulta-de-storybook)
4. [Planificación](#4-planificación)
5. [Implementación](#5-implementación)
6. [Verificación](#6-verificación)

---

## 1. Inicialización al Inicio de Sesión

### **PASO 1: Detectar Wizard** ⚠️ OBLIGATORIO

**Herramienta:** `run_terminal_cmd`

**Qué hace:**
```bash
node scripts/detect-wizard-state.js
```

**Resultado esperado:**
- `[AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED]`
- `[AUTORUN_BROWSER_URL]http://localhost:3000/...[/AUTORUN_BROWSER_URL]`

**Siguiente paso:**
- Si hay wizard → PASO 2
- Si NO hay wizard → PASO 3

---

### **PASO 2: Inicializar AutorunHub (si hay wizard)** ⚠️ OBLIGATORIO

**Herramienta:** `run_terminal_cmd`

**Qué hace:**
```bash
npm run autorun:init-hub
```

**Resultado esperado:**
- ✅ "🚀 Inicializando AutorunHub..."
- ✅ "✅ AutorunHub inicializado correctamente"
- ✅ "📊 Estado de Autorun:"
- ✅ "   - Inicializado: ✅"
- ✅ "   - File Watching: ✅ activo"

**Siguiente paso:** → PASO 4

---

### **PASO 3: Inicializar AutorunHub (si NO hay wizard)** ⚠️ OBLIGATORIO

**Herramienta:** `run_terminal_cmd`

**Qué hace:**
```bash
npm run autorun:init-hub
```

**Verificación:**
```typescript
import { isAutorunHubInitialized } from '@autorun/core';

if (!isAutorunHubInitialized()) {
  // Inicializar
}
```

**Siguiente paso:** → PASO 5

---

### **PASO 4: Abrir Browser (si hay wizard)** ⚠️ OBLIGATORIO

**Herramientas:**
- `mcp_cursor-ide-browser_browser_navigate` - Navegar a URL
- `mcp_cursor-ide-browser_browser_snapshot` - Capturar estado de la página
- `run_terminal_cmd` - Limpiar archivo de estado

**Qué hace:**
```typescript
// 1. Navegar a la URL del wizard
await mcp_cursor-ide-browser_browser_navigate({ url });

// 2. Capturar estado inicial
await mcp_cursor-ide-browser_browser_snapshot();

// 3. Limpiar archivo de estado
await run_terminal_cmd({
  command: 'rm -f .autorun/wizard-state.json'
});
```

**Siguiente paso:** → PASO 5

---

### **PASO 5: Verificar Estado Final** ⚠️ OBLIGATORIO

**Herramienta:** `getAutorunHubStatus()` (función interna)

**Qué hace:**
```typescript
import { getAutorunHubStatus } from '@autorun/core';

const status = await getAutorunHubStatus();

console.log('📊 Estado de Autorun:');
console.log(`   - Inicializado: ${status.initialized ? '✅' : '❌'}`);
console.log(`   - File Watching: ${status.fileWatching ? '✅ activo' : '❌ inactivo'}`);
```

**Siguiente paso:** → PASO 6

---

### **PASO 6: Ejecutar handleUserMessage()** ⚠️ OBLIGATORIO

**Herramienta:** `handleUserMessage()` (función interna)

**Qué hace:**
```typescript
import { handleUserMessage } from '@autorun/core/helpers/autoMessageHandler';

const result = await handleUserMessage(userMessage);
```

**Este sistema ejecuta automáticamente:**
1. ✅ Detección automática de componentes
2. ✅ Verificación de triggers de palabras clave
3. ✅ Verificación con Pre-Implementation Check
4. ✅ Obtención de plan basado en historias (si aplica)
5. ✅ Bloqueo si faltan pasos o fases

**Resultado:**
```typescript
{
  blocked: boolean,        // Si está bloqueado
  reason?: string,        // Razón del bloqueo
  detected: boolean,      // Si se detectó componente
  componentName?: string, // Nombre del componente
  plan?: StoryBasedPlan,  // Plan basado en historias
  mcpMessages?: Array<{   // Mensajes MCP para consultar
    componentName: string,
    storybookId: string
  }>
}
```

**Siguiente paso:**
- Si `blocked === true` → NO continuar, mostrar razón
- Si `detected === true` → Continuar con implementación

---

## 2. Detección Automática de Componentes

### **PASO 1: Detección Automática** ⚠️ AUTOMÁTICO

**Herramienta:** `handleUserMessage()` (ya ejecutado en PASO 6)

**Qué detecta:**
- ✅ Palabras clave: `implementar`, `crear`, `agregar`, `añadir`, etc.
- ✅ Nombres de componentes: `DataTable`, `Tabs`, `Modal`, etc.
- ✅ Más de 80 componentes de ambos Storybooks (UBITS + Libraries UI)

**Resultado:**
```typescript
if (result.detected && result.componentName) {
  console.log(`✅ Componente detectado: ${result.componentName}`);
  console.log(`📋 Plan disponible: ${result.plan?.totalSteps || 0} historias`);
}
```

**Siguiente paso:** → Consultar Storybook MCP automáticamente

---

### **PASO 2: Consultar Storybook MCP Automáticamente** ⚠️ OBLIGATORIO

**Herramientas:**
- `mcp_storybook_getComponentList` - Listar componentes disponibles
- `mcp_storybook_getComponentsProps` - Obtener props exactas

**Qué hace:**
```typescript
// Si hay mensajes MCP, consultar automáticamente
if (result.mcpMessages && result.mcpMessages.length > 0) {
  for (const msg of result.mcpMessages) {
    // 1. Consultar Storybook MCP
    await call_mcp_tool({
      server: "storybook",
      toolName: "mcp_storybook_getComponentsProps",
      arguments: { componentIds: [msg.storybookId] }
    });
  }
}
```

**Resultado:**
- Props exactas del componente
- Estructura de datos
- Tokens de diseño
- Variantes disponibles

**Siguiente paso:** → Consultar Storybook en Vercel

---

## 3. Consulta de Storybook

### **PASO 1: Consultar Catálogo PRIMERO** ⚠️ OBLIGATORIO

**Herramienta:** `read_file`

**Qué hace:**
```typescript
// Leer catálogo de componentes
await read_file('docs/referencia/CATALOGO-COMPONENTES-UBITS.md');
```

**Resultado:**
- Verificar que el componente existe
- Obtener ID de Storybook sugerido

**Siguiente paso:** → Usar descubrimiento automático

---

### **PASO 2: Descubrimiento Automático de ID** ⚠️ OBLIGATORIO

**Herramienta:** `mapAndValidateComponentNameToStorybookId()` (función interna)

**Qué hace:**
```typescript
import { mapAndValidateComponentNameToStorybookId } from '@autorun/core/helpers/storybookStories';

const componentId = await mapAndValidateComponentNameToStorybookId('ComponentName');
// Automáticamente descubre y valida el ID correcto
```

**Resultado:**
- ID validado del componente
- Verificación de que existe en Storybook

**Siguiente paso:** → Consultar Storybook en Vercel

---

### **PASO 3: Consultar Storybook en Vercel** ⚠️ OBLIGATORIO

**Herramientas:**
- `mcp_cursor-ide-browser_browser_snapshot` - Obtener URL actual (para volver después)
- `mcp_cursor-ide-browser_browser_navigate` - Navegar a Storybook
- `mcp_cursor-ide-browser_browser_snapshot` - Capturar estado de Storybook

**Qué hace:**
```typescript
// 1. Guardar URL del template ANTES de navegar
const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
const templateUrl = snapshot?.url;

// 2. Construir URL con ID descubierto
const storybookUrl = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--default`;

// 3. Navegar a Storybook
await mcp_cursor-ide-browser_browser_navigate({ url: storybookUrl });
await mcp_cursor-ide-browser_browser_snapshot();

// 4. Revisar:
//    - Pestaña "Code": Código exacto
//    - Pestaña "Controls": Opciones disponibles
//    - Pestaña "Docs": Documentación

// 5. ⚠️ CRÍTICO: Volver al template DESPUÉS de consultar
await mcp_cursor-ide-browser_browser_navigate({ url: templateUrl });
await mcp_cursor-ide-browser_browser_snapshot();
```

**Resultado:**
- Código exacto del componente
- Props y opciones disponibles
- Tokens de diseño
- Estructura HTML/CSS

**Siguiente paso:** → Obtener plan basado en historias

---

## 4. Planificación

### **PASO 1: Obtener Plan Basado en Historias** ⚠️ AUTOMÁTICO

**Herramienta:** `handleUserMessage()` (ya ejecutado, plan disponible en `result.plan`)

**Qué hace:**
```typescript
// El plan ya está disponible en result.plan
if (result.plan) {
  console.log(`📚 Plan de implementación basado en historias:`);
  console.log(`   Componente: ${result.plan.componentName}`);
  console.log(`   Total de historias: ${result.plan.totalSteps}`);
  console.log(`   Tiempo estimado: ${result.plan.estimatedTotalTime}`);
}
```

**Resultado:**
- Plan con todas las historias del componente
- Checklist para cada historia
- Orden de implementación

**Siguiente paso:** → Mostrar plan al usuario y pedir aprobación

---

### **PASO 2: Validar Fases en Orden** ⚠️ OBLIGATORIO

**Herramienta:** `PhaseValidator.validatePhaseOrder()` (función interna)

**Qué hace:**
```typescript
import { PhaseValidator } from '@autorun/core';

const validation = await PhaseValidator.validatePhaseOrder(
  'DataTable',
  'FASE_1_ANALISIS_COLUMNAS'
);

if (!validation.valid) {
  throw new Error(`❌ BLOQUEADO: ${validation.reason}`);
}
```

**Orden de fases:**
1. FASE 0: Verificación de Scripts
2. FASE 0.1: Revisar Componente
3. FASE 0.5: Analizar Estructura
4. FASE 0.6: Contar Items
5. FASE 1: Análisis de Columnas
6. FASE 2: Implementación Básica

**Siguiente paso:** → Implementar UNA historia a la vez

---

## 5. Implementación

### **PASO 1: Obtener Checklist de la Historia** ⚠️ OBLIGATORIO

**Herramienta:** `mcp_autorun_autorun_checklist` (MCP tool)

**Qué hace:**
```typescript
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.checklist',
  arguments: {
    componentName: 'DataTable'
  }
});
```

**Resultado:**
- Checklist completo para el componente
- Items a completar antes de implementar

**Siguiente paso:** → Completar checklist

---

### **PASO 2: Completar Checklist** ⚠️ OBLIGATORIO

**Herramientas:**
- `read_file` - Leer guías obligatorias
- `mcp_cursor-ide-browser_browser_navigate` - Consultar Storybook
- `mcp_cursor-ide-browser_browser_snapshot` - Capturar estado

**Checklist típico:**
1. ✅ Consultar documentación del componente
2. ✅ Consultar Storybook en Vercel
3. ✅ Consultar Storybook MCP
4. ✅ Verificar formato de iconos
5. ✅ Verificar que NO se agreguen estilos extra
6. ✅ Verificar que NO se agregue margin-top
7. ✅ Verificar padding-top del content-area

**Siguiente paso:** → Implementar con autorun.apply()

---

### **PASO 3: Implementar con autorun.apply()** ⚠️ OBLIGATORIO

**Herramienta:** `mcp_autorun_autorun_apply` (MCP tool)

**Qué hace:**
```typescript
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: userMessage, // Mensaje del usuario
    targetFiles: [filePath] // Opcional - se detecta automáticamente
  }
});
```

**Este sistema ejecuta automáticamente:**
1. ✅ Detecta componente automáticamente
2. ✅ Consulta Storybook MCP (OBLIGATORIO, fail-closed)
3. ✅ Extrae código exacto desde Storybook en Vercel
4. ✅ Valida estructura pre-implementación
5. ✅ Escribe código con watermark
6. ✅ Ejecuta Prettier (formateo)
7. ✅ Ejecuta ESLint (validación)
8. ✅ Auto-reload del browser (si aplica)
9. ✅ Auto-commit a GitHub (si está configurado)

**⚠️ CRÍTICO:**
- ❌ NO usar `write()` o `search_replace()` directos
- ✅ SIEMPRE usar `autorun.apply()` vía MCP
- ✅ Si Storybook MCP falla → NO escribir nada (fail-closed)

**Siguiente paso:** → Verificar implementación

---

## 6. Verificación

### **PASO 1: Verificar con autorun.verify()** ⚠️ OBLIGATORIO

**Herramienta:** `mcp_autorun_autorun_verify` (MCP tool)

**Qué hace:**
```typescript
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: {
    targetFiles: 'diff' // Verifica todos los cambios
  }
});
```

**Este sistema verifica:**
1. ✅ Cambios en `prototypes/` tienen watermark
2. ✅ Hash coincide con snippet canónico
3. ✅ No hay patrones prohibidos (hex/rgb, inline styles, clases fuera del DS)
4. ✅ Estructura del código es correcta
5. ✅ Accesibilidad básica

**Si verify falla:**
- ❌ Cambios son inválidos
- ❌ Revertir cambios automáticamente (si está configurado)

**Siguiente paso:** → Marcar fase como completada

---

### **PASO 2: Marcar Fase como Completada** ⚠️ OBLIGATORIO

**Herramienta:** `PhaseValidator.markPhaseCompleted()` (función interna)

**Qué hace:**
```typescript
import { PhaseValidator } from '@autorun/core';

await PhaseValidator.markPhaseCompleted(
  'DataTable',
  'FASE_2_IMPLEMENTACION_BASICA'
);
```

**Resultado:**
- Fase marcada como completada
- Sistema permite continuar con siguiente fase

**Siguiente paso:** → Continuar con siguiente historia o finalizar

---

## 📊 Resumen Visual del Flujo

```
┌─────────────────────────────────────────────────────────────┐
│ 1. INICIALIZACIÓN AL INICIO DE SESIÓN                        │
├─────────────────────────────────────────────────────────────┤
│ PASO 1: Detectar wizard (run_terminal_cmd)                   │
│ PASO 2/3: Inicializar AutorunHub (run_terminal_cmd)        │
│ PASO 4: Abrir browser (browser_navigate/snapshot)         │
│ PASO 5: Verificar estado (getAutorunHubStatus)              │
│ PASO 6: Ejecutar handleUserMessage() (función interna)     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. DETECCIÓN AUTOMÁTICA DE COMPONENTES                      │
├─────────────────────────────────────────────────────────────┤
│ PASO 1: Detección automática (handleUserMessage)            │
│ PASO 2: Consultar Storybook MCP (mcp_storybook_*)          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. CONSULTA DE STORYBOOK                                     │
├─────────────────────────────────────────────────────────────┤
│ PASO 1: Consultar catálogo (read_file)                      │
│ PASO 2: Descubrimiento automático de ID (función interna)  │
│ PASO 3: Consultar Storybook en Vercel (browser_navigate)   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. PLANIFICACIÓN                                            │
├─────────────────────────────────────────────────────────────┤
│ PASO 1: Obtener plan (handleUserMessage - automático)        │
│ PASO 2: Validar fases en orden (PhaseValidator)             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. IMPLEMENTACIÓN                                           │
├─────────────────────────────────────────────────────────────┤
│ PASO 1: Obtener checklist (mcp_autorun_checklist)          │
│ PASO 2: Completar checklist (read_file, browser_*)          │
│ PASO 3: Implementar (mcp_autorun_apply) ⭐ OBLIGATORIO      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. VERIFICACIÓN                                             │
├─────────────────────────────────────────────────────────────┤
│ PASO 1: Verificar (mcp_autorun_verify)                    │
│ PASO 2: Marcar fase completada (PhaseValidator)           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Herramientas por Categoría

### **Terminal/Comandos:**
- `run_terminal_cmd` - Ejecutar comandos del sistema

### **Navegador:**
- `mcp_cursor-ide-browser_browser_navigate` - Navegar a URLs
- `mcp_cursor-ide-browser_browser_snapshot` - Capturar estado de página
- `mcp_cursor-ide-browser_browser_click` - Hacer clic en elementos
- `mcp_cursor-ide-browser_browser_type` - Escribir texto

### **Storybook MCP:**
- `mcp_storybook_getComponentList` - Listar componentes
- `mcp_storybook_getComponentsProps` - Obtener props exactas

### **Autorun MCP:**
- `mcp_autorun_autorun_plan` - Generar plan
- `mcp_autorun_autorun_checklist` - Obtener checklist
- `mcp_autorun_autorun_apply` ⭐ - Implementar componente (OBLIGATORIO)
- `mcp_autorun_autorun_verify` - Verificar implementación

### **Archivos:**
- `read_file` - Leer archivos
- `write` - Escribir archivos (❌ PROHIBIDO en prototypes/)
- `search_replace` - Reemplazar texto (❌ PROHIBIDO en prototypes/)

### **Funciones Internas:**
- `handleUserMessage()` - Detección automática y planificación
- `PhaseValidator` - Validación de fases
- `getAutorunHubStatus()` - Estado de AutorunHub
- `mapAndValidateComponentNameToStorybookId()` - Descubrimiento de IDs

---

## 🚨 Reglas Críticas

### **Regla #1: SIEMPRE usar autorun.apply()**
- ❌ NO usar `write()` o `search_replace()` directos en `prototypes/`
- ✅ SIEMPRE usar `mcp_autorun_autorun_apply` vía MCP

### **Regla #2: SIEMPRE consultar Storybook MCP**
- ✅ SIEMPRE consultar antes de implementar
- ✅ SI Storybook MCP falla → NO implementar (fail-closed)

### **Regla #3: SIEMPRE verificar después**
- ✅ SIEMPRE ejecutar `autorun.verify()` después de implementar
- ✅ Si verify falla → Revertir cambios

### **Regla #4: SIEMPRE seguir fases en orden**
- ✅ NO saltarse fases
- ✅ Marcar fase como completada antes de continuar

---

## 📚 Referencias

- **Orden de ejecución:** `docs/guias/configuracion/ORDEN-EJECUCION-INICIO-SESION.md`
- **Sistema paso a paso:** `docs/guias/implementacion/GUIA-SISTEMA-PASO-A-PASO-AUTOMATICO.md`
- **Uso de MCPs:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`
- **Enforcement:** `.cursor/rules/00-autorun-enforcement.md`
- **Checklist:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`

---

**Última actualización:** 2025-01-11  
**Estado:** ✅ Documentación Completa

