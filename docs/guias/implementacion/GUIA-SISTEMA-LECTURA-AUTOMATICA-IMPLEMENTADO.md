# ✅ Sistema de Lectura Automática de Guías - IMPLEMENTADO

> **⚠️ CRÍTICO:** Este sistema está **IMPLEMENTADO** y funciona automáticamente. Las guías se cargan automáticamente antes de permitir cualquier implementación.

---

## 🎯 ¿Qué Hace el Sistema?

**El sistema automáticamente:**

1. ✅ **Detecta cuando se va a implementar un componente**
2. ✅ **Carga automáticamente todas las guías necesarias** (generales y específicas)
3. ✅ **Verifica que se cargaron correctamente** antes de permitir la implementación
4. ✅ **Bloquea la implementación** si las guías obligatorias no se pudieron cargar

---

## 📋 Guías que se Cargarán Automáticamente

### **Guías Generales (SIEMPRE):**

1. ✅ `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md`
2. ✅ `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`
3. ✅ `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
4. ✅ `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`
5. ✅ `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

### **Guías Específicas por Componente (CONDICIONALES):**

**Para Tabs:**
- ✅ `docs/guias/implementacion/GUIA-ERROR-TABS-NO-SE-MUESTRAN.md`
- ✅ `docs/referencia/componentes/navegacin-tabs.md`

**Para DataTable:**
- ✅ `docs/referencia/componentes/data-table.md`

**Para Modal:**
- ✅ `docs/referencia/componentes/modal.md`

**Para Button:**
- ✅ `docs/referencia/componentes/button.md`

**Estrategias específicas:**
- ✅ `docs/guias/implementacion/componentes/ESTRATEGIA-TOOLTIP-POPOVER.md` (para Tooltip/Popover)

---

## 🔧 Cómo Funciona

### **1. Detección Automática**

Cuando el agente intenta usar `write()` o `search_replace()`:

```typescript
// El sistema detecta automáticamente el componente
const componentName = detectComponentFromContent(content);
```

### **2. Carga Automática de Guías**

El sistema carga automáticamente todas las guías necesarias:

```typescript
// En autoImplementationFlow.ts
const guidesResult = await loadRequiredGuides(componentName);
```

### **3. Verificación**

El sistema verifica que todas las guías obligatorias se cargaron:

```typescript
// En PreWriteValidator.ts
const guidesVerification = verifyGuidesLoaded(guidesResult);
if (!guidesVerification.valid) {
  // Bloquear implementación
  errors.push(...guidesVerification.errors);
}
```

### **4. Bloqueo si Falla**

Si alguna guía obligatoria no se puede cargar, la implementación se bloquea:

```typescript
if (!validation.valid) {
  throw new Error(`❌ IMPLEMENTACIÓN BLOQUEADA: ${validation.errors.join('\n')}`);
}
```

---

## 📊 Logs del Sistema

**Cuando el sistema carga guías, verás logs como:**

```
📚 [Guides Loader] ========================================
📚 [Guides Loader] Cargando guías necesarias...
📚 [Guides Loader] Componente: Tabs
📚 [Guides Loader] Cargando guías generales...
  ✅ [Guides Loader] Cargada: docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md
  ✅ [Guides Loader] Cargada: docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md
  ✅ [Guides Loader] Cargada: docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md
  ✅ [Guides Loader] Cargada: docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md
  ✅ [Guides Loader] Cargada: docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md
📚 [Guides Loader] Cargando guías específicas para: Tabs...
  ✅ [Guides Loader] Cargada: docs/guias/implementacion/GUIA-ERROR-TABS-NO-SE-MUESTRAN.md
  ✅ [Guides Loader] Cargada: docs/referencia/componentes/navegacin-tabs.md
📚 [Guides Loader] Resumen: 7/7 guías cargadas
✅ [Guides Loader] Todas las guías generales cargadas
📚 [Guides Loader] ========================================
```

---

## ✅ Verificación en PreWriteValidator

**El PreWriteValidator ahora verifica automáticamente:**

```typescript
// En PreWriteValidator.validateBeforeWrite()
if (componentName) {
  // 1. Cargar guías automáticamente
  const guidesResult = await loadRequiredGuides(componentName);
  
  // 2. Verificar que se cargaron
  const guidesVerification = verifyGuidesLoaded(guidesResult);
  
  // 3. Si falla, bloquear implementación
  if (!guidesVerification.valid) {
    errors.push(...guidesVerification.errors);
  }
}
```

---

## 🚨 Errores que Previene

**Este sistema previene automáticamente:**

1. ❌ Implementar sin leer guías generales
2. ❌ Implementar sin leer guías específicas del componente
3. ❌ Implementar sin seguir el flujo correcto
4. ❌ Cometer errores ya documentados
5. ❌ No consultar Storybook primero
6. ❌ No seguir el checklist obligatorio

---

## 📝 Agregar Nuevas Guías

**Para agregar guías específicas de un nuevo componente:**

1. **Editar `packages/autorun-core/src/helpers/guidesLoader.ts`:**

```typescript
const COMPONENT_SPECIFIC_GUIDES: Record<string, string[]> = {
  // ... componentes existentes ...
  NuevoComponente: [
    'docs/guias/implementacion/GUIA-ERROR-NUEVO-COMPONENTE.md',
    'docs/referencia/componentes/nuevo-componente.md',
  ],
};
```

2. **O agregar estrategias específicas:**

```typescript
const COMPONENT_STRATEGIES: Record<string, string[]> = {
  // ... estrategias existentes ...
  NuevoComponente: [
    'docs/guias/implementacion/componentes/ESTRATEGIA-NUEVO-COMPONENTE.md',
  ],
};
```

---

## 🔍 Verificación Manual

**Si quieres verificar que el sistema funciona:**

```typescript
import { loadRequiredGuides, getGuidesSummary } from '@autorun/core';

const guidesResult = await loadRequiredGuides('Tabs');
console.log(getGuidesSummary(guidesResult));
```

---

## 📚 Archivos Implementados

1. ✅ `packages/autorun-core/src/helpers/guidesLoader.ts` - Cargador de guías
2. ✅ `packages/autorun-core/src/validation/PreWriteValidator.ts` - Verificación de guías
3. ✅ `packages/autorun-core/src/helpers/autoImplementationFlow.ts` - Carga automática

---

## ✅ Estado

**✅ IMPLEMENTADO Y FUNCIONANDO**

El sistema está completamente implementado y se ejecuta automáticamente cuando:
- Se detecta un componente en el contenido
- Se intenta usar `write()` o `search_replace()`
- Se ejecuta `interceptedWrite()` o `interceptedSearchReplace()`

---

**Última actualización:** 2025-01-10  
**Estado:** ✅ Implementado y funcionando  
**Prioridad:** ⚠️ CRÍTICA - Sistema activo
