# 📚 Análisis: Cómo Funciona Autorun Trayendo Componentes de Storybook

> **Fecha:** 2025-01-10  
> **Objetivo:** Analizar el flujo completo de cómo Autorun obtiene e implementa componentes desde Storybook para identificar puntos de mejora

---

## 🎯 Resumen Ejecutivo

Autorun tiene un sistema complejo y multi-capa para traer componentes de Storybook que incluye:

1. **Descubrimiento automático de IDs** - Consulta `index.json` de Storybook
2. **Mapeo de nombres a IDs** - Sistema de mapeo con validación
3. **Carga dinámica de componentes** - Carga JS/CSS desde URLs públicas
4. **Validación pre-implementación** - Verifica antes de escribir código
5. **Flujo automático** - Intercepta `write()` y `search_replace()`

**Problemas identificados:**
- ❌ Dependencia de múltiples fuentes de verdad (mapeos, index.json, archivos locales)
- ❌ Falta de sincronización entre Storybook real y mapeos
- ❌ Errores comunes al implementar sin consultar información exacta
- ❌ No hay validación de estructura HTML/CSS antes de implementar

---

## 🔍 Flujo Completo: Cómo Funciona Actualmente

### **FASE 1: Detección y Mapeo de Componentes**

#### 1.1. Detección Automática de Componentes
**Archivo:** `packages/autorun-core/src/helpers/autoComponentDetection.ts`

```typescript
// Detecta componentes desde mensaje del usuario
const result = await autoDetectComponent(userMessage);
// Retorna: { detected: true, componentName: 'DataTable', ... }
```

**Proceso:**
- Analiza palabras clave en el mensaje del usuario
- Mapea a nombres de componentes conocidos
- Detecta triggers automáticos (`implementar`, `crear`, `agregar`)

#### 1.2. Mapeo de Nombre a ID de Storybook
**Archivo:** `packages/autorun-core/src/helpers/storybookStories.ts`

```typescript
// Mapeo directo (puede estar desactualizado)
const mappedId = mapComponentNameToStorybookId('DataTable');
// Retorna: 'data-data-table'

// Validación mejorada (usa descubrimiento automático)
const validatedId = await mapAndValidateComponentNameToStorybookId('DataTable');
// Retorna: ID validado o descubierto automáticamente
```

**Mapeos actuales:**
```typescript
{
  DataTable: 'data-data-table',
  Tabs: 'navegación-tabs',
  Button: 'bsicos-button',
  Modal: 'feedback-modal',
  // ... más componentes
}
```

**⚠️ PROBLEMA:** Los mapeos pueden estar desactualizados si Storybook cambia los IDs.

---

### **FASE 2: Descubrimiento Automático de IDs**

#### 2.1. Consulta `index.json` de Storybook
**Archivo:** `packages/autorun-core/src/helpers/storybookIdDiscovery.ts`

```typescript
// Descubrir todos los componentes desde Storybook
const discovery = await discoverStorybookComponents();
// Retorna: { components: [...], totalComponents: 50, errors: [] }

// Buscar componente específico
const component = await findComponentByIdOrName('Tabs');
// Retorna: { componentId: 'navegacion-tabs', title: 'Navegación/Tabs', stories: [...] }
```

**Proceso:**
1. Consulta `https://ubits-storybook10.vercel.app/index.json`
2. Parsea todas las entradas (filtra docs, solo historias)
3. Agrupa por componente (extrae ID desde `component-id--story-name`)
4. Retorna lista completa de componentes con sus historias

**⚠️ PROBLEMA:** Si `index.json` no está disponible, usa fallback a archivos locales que pueden estar desactualizados.

#### 2.2. Validación de ID
**Archivo:** `packages/autorun-core/src/helpers/storybookIdDiscovery.ts`

```typescript
// Obtener ID correcto con fallback
const { componentId, found, title, availableStories } = 
  await getCorrectStorybookId('Tabs', 'navegacion-tabs');

if (found) {
  // Usar componentId validado
} else {
  // Usar fallback (puede ser incorrecto)
}
```

**Proceso:**
1. Busca por ID exacto
2. Busca por título
3. Busca por ID parcial
4. Si no encuentra, usa fallback (puede ser incorrecto)

---

### **FASE 3: Obtención de Información del Componente**

#### 3.1. Consulta Storybook MCP
**Archivo:** `packages/addons/functional/pre-implementation-check/src/PreImplementationCheckAddon.ts`

```typescript
// Emite mensaje especial para que el agente intercepte
console.log(`[AUTORUN_STORYBOOK_MCP]${componentName}:${storybookId}[/AUTORUN_STORYBOOK_MCP]`);
// El agente debe ejecutar: mcp_storybook_getComponentsProps(['component-id'])
```

**⚠️ PROBLEMA:** Las herramientas MCP no están disponibles directamente en Node.js, requiere que el agente intercepte y ejecute manualmente.

#### 3.2. Consulta Storybook en Vercel
**Archivo:** `packages/autorun-core/src/helpers/storybookStories.ts`

```typescript
// Obtener historias del componente
const stories = await getComponentStories('DataTable', 'data-data-table');
// Retorna: { componentName, componentId, stories: [...], totalStories }

// Generar plan de implementación
const plan = generateImplementationPlanFromStories(stories);
// Retorna: { componentName, steps: [...], totalSteps }
```

**Proceso:**
1. Consulta `index.json` para obtener historias
2. Si no hay historias, crea historias funcionales específicas
3. Genera plan de implementación dividido por historias

**⚠️ PROBLEMA:** Si `index.json` no está disponible, usa historias funcionales hardcodeadas que pueden no coincidir con Storybook real.

---

### **FASE 4: Validación Pre-Implementación**

#### 4.1. Interceptación de `write()` y `search_replace()`
**Archivo:** `packages/autorun-core/src/helpers/autoImplementationFlow.ts`

```typescript
// Flujo automático que intercepta antes de escribir
const flow = await autoImplementationFlow(filePath, content, oldString, {
  componentName: 'DataTable',
  userMessage: userMessage
});

if (!flow.canWrite) {
  // ❌ BLOQUEADO - No escribir
  // Navegar a Storybook automáticamente
  // Mostrar plan de implementación
}
```

**Proceso:**
1. Detecta componente desde contenido o mensaje
2. Carga guías automáticamente
3. Valida con `PreWriteValidator`
4. Si falla validación:
   - Obtiene URL de Storybook
   - Obtiene plan de implementación
   - Bloquea escritura
5. Si pasa validación:
   - Permite escritura
   - Activa auto-reload si es necesario

#### 4.2. Validación con PreWriteValidator
**Archivo:** `packages/autorun-core/src/validation/PreWriteValidator.ts`

```typescript
// Validar antes de escribir
const validation = await PreWriteValidator.validateBeforeWrite(
  filePath,
  content,
  { componentName: 'DataTable', userMessage }
);

if (!validation.valid) {
  // ❌ BLOQUEADO - Errores: validation.errors
}
```

**Validaciones:**
- ✅ Guías obligatorias cargadas
- ✅ Storybook MCP consultado
- ✅ Storybook en Vercel consultado
- ✅ Documentación consultada
- ✅ Checklist completado

---

### **FASE 5: Carga Dinámica de Componentes**

#### 5.1. Carga desde Storybook
**Archivo:** `packages/autorun-core/src/ComponentLoader.ts`

```typescript
// Cargar componente desde URL de Storybook
await window.AUTORUN.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.vercel.app/components/button/manifest.json'
});
```

**Proceso:**
1. Fetch del `manifest.json` (con fallback a GitHub si Vercel falla)
2. Verifica si ya está cargado (evita duplicados)
3. Carga CSS (evita duplicados)
4. Carga JavaScript (evita duplicados)
5. Registra componente cargado

**Estructura requerida en Storybook:**
```
https://storybook.vercel.app/
├── components/
│   ├── button/
│   │   ├── manifest.json
│   │   ├── button.js
│   │   └── button.css
```

**⚠️ PROBLEMA:** Requiere estructura específica de archivos que puede no existir en todos los componentes.

---

## 🚨 Problemas Identificados

### **1. Múltiples Fuentes de Verdad**

**Problema:**
- Mapeos en `storybookStories.ts`
- Mapeos en `verifyStorybookStories.ts`
- `index.json` de Storybook
- Archivos `.stories.ts` locales

**Consecuencia:**
- ❌ Desincronización entre fuentes
- ❌ IDs incorrectos si Storybook cambia
- ❌ Errores "Couldn't find story matching"

**Solución propuesta:**
- ✅ Usar solo `index.json` como fuente de verdad
- ✅ Descubrimiento automático siempre (no mapeos hardcodeados)
- ✅ Validación en tiempo real

---

### **2. Falta de Información Estructural**

**Problema:**
- No se obtiene estructura HTML exacta antes de implementar
- No se obtiene estructura CSS exacta antes de implementar
- No se validan tokens antes de usar
- No se valida estructura de props antes de usar

**Consecuencia:**
- ❌ Implementaciones con estructura incorrecta
- ❌ Tokens incorrectos
- ❌ Props incorrectas
- ❌ Errores de renderizado

**Solución propuesta:**
- ✅ Obtener estructura HTML desde Storybook MCP
- ✅ Obtener estructura CSS desde Storybook MCP
- ✅ Validar tokens antes de usar
- ✅ Validar props antes de usar

---

### **3. Dependencia de MCP Manual**

**Problema:**
- Storybook MCP requiere que el agente ejecute manualmente
- No hay validación automática de que se consultó
- Mensajes especiales `[AUTORUN_STORYBOOK_MCP]` pueden no ser interceptados

**Consecuencia:**
- ❌ Implementaciones sin consultar MCP
- ❌ Información desactualizada
- ❌ Errores por falta de información

**Solución propuesta:**
- ✅ Integración directa con Storybook MCP (si es posible)
- ✅ Validación automática de consulta MCP
- ✅ Fallback automático si MCP no está disponible

---

### **4. Historias Funcionales Hardcodeadas**

**Problema:**
- Si `index.json` no está disponible, usa historias funcionales hardcodeadas
- Historias hardcodeadas pueden no coincidir con Storybook real
- Solo hay historias para algunos componentes (ej: DataTable)

**Consecuencia:**
- ❌ Planes de implementación incorrectos
- ❌ Historias que no existen en Storybook
- ❌ Implementaciones basadas en información incorrecta

**Solución propuesta:**
- ✅ Siempre consultar `index.json` primero
- ✅ Fallback mejorado si `index.json` no está disponible
- ✅ Validar que las historias existen antes de usarlas

---

### **5. Falta de Validación de Estructura HTML/CSS**

**Problema:**
- No se valida que la estructura HTML generada sea correcta
- No se valida que los estilos CSS sean correctos
- No se valida que los tokens existan antes de usar

**Consecuencia:**
- ❌ HTML mal formado
- ❌ CSS incorrecto
- ❌ Tokens inexistentes
- ❌ Componentes que no se renderizan

**Solución propuesta:**
- ✅ Validación de HTML antes de escribir
- ✅ Validación de CSS antes de escribir
- ✅ Validación de tokens antes de usar
- ✅ Validación de estructura de props antes de usar

---

## 📊 Flujo Actual vs Flujo Ideal

### **Flujo Actual:**
```
1. Detección automática → 2. Mapeo (puede fallar) → 3. Descubrimiento (fallback a local)
   ↓
4. Consulta MCP (manual) → 5. Consulta Storybook (manual) → 6. Validación
   ↓
7. Implementación (puede tener errores)
```

### **Flujo Ideal:**
```
1. Detección automática → 2. Descubrimiento automático (solo index.json)
   ↓
3. Consulta automática MCP → 4. Consulta automática Storybook → 5. Validación completa
   ↓
6. Validación de estructura HTML/CSS → 7. Validación de tokens → 8. Implementación correcta
```

---

## 🎯 Puntos Clave para Mejora

### **1. Fuente Única de Verdad**
- ✅ Usar solo `index.json` de Storybook
- ✅ Descubrimiento automático siempre
- ✅ No usar mapeos hardcodeados

### **2. Información Estructural Completa**
- ✅ Obtener HTML exacto desde Storybook
- ✅ Obtener CSS exacto desde Storybook
- ✅ Obtener tokens exactos desde Storybook
- ✅ Validar antes de usar

### **3. Validación Automática**
- ✅ Validar estructura HTML antes de escribir
- ✅ Validar CSS antes de escribir
- ✅ Validar tokens antes de usar
- ✅ Validar props antes de usar

### **4. Integración Mejorada con MCP**
- ✅ Integración directa (si es posible)
- ✅ Fallback automático si MCP no está disponible
- ✅ Validación automática de consulta

---

## 📝 Conclusión

El sistema actual de Autorun para traer componentes de Storybook es **complejo y funcional**, pero tiene varios puntos de mejora:

1. **Múltiples fuentes de verdad** → Necesita fuente única (`index.json`)
2. **Falta de información estructural** → Necesita obtener HTML/CSS exacto
3. **Dependencia de MCP manual** → Necesita integración automática
4. **Historias hardcodeadas** → Necesita descubrimiento automático completo
5. **Falta de validación estructural** → Necesita validación HTML/CSS/tokens

**Próximos pasos:**
- Analizar el otro Storybook que mencionaste para ver qué elementos pueden ayudar
- Identificar qué información adicional puede obtenerse
- Proponer mejoras específicas basadas en el análisis

---

**Última actualización:** 2025-01-10  
**Versión:** 1.0.0
