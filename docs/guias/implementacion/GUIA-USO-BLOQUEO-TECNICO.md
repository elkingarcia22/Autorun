# 🛡️ Guía: Uso del Bloqueo Técnico de Implementación

## 🎯 Objetivo

**Garantizar que el agente SIEMPRE siga los lineamientos antes de implementar componentes UBITS mediante bloqueo técnico.**

---

## ⚠️ CÓMO FUNCIONA EL BLOQUEO TÉCNICO

### **1. Verificación Automática**

**El sistema verifica AUTOMÁTICAMENTE antes de cada `write()` o `search_replace()`:**

```typescript
// Esto se ejecuta AUTOMÁTICAMENTE antes de escribir código
import { PreWriteValidator } from '@autorun/core/validation/PreWriteValidator';

const validation = await PreWriteValidator.validateBeforeWrite(
  filePath,
  content,
  { componentName: 'DataTable' }
);

if (!validation.valid) {
  // ❌ BLOQUEAR - No se puede escribir hasta completar pasos
  throw new Error('❌ BLOQUEADO: ' + validation.errors.join('\n'));
}
```

### **2. Función Obligatoria**

**ANTES de implementar cualquier componente, DEBES usar:**

```typescript
import { ensureImplementationReady } from '@autorun/core/helpers/implementationHelpers';

// ⚠️ OBLIGATORIO: Verificar antes de implementar
await ensureImplementationReady('DataTable');

// Solo después de que esta función pase, puedes usar write() o search_replace()
```

### **3. Bloqueo Técnico Real**

**Si no se completan los pasos, el sistema BLOQUEA técnicamente:**

- ❌ `write()` lanza error y NO se ejecuta
- ❌ `search_replace()` lanza error y NO se ejecuta
- ✅ Solo se puede escribir después de completar el checklist

---

## 📋 USO OBLIGATORIO

### **PASO 1: Verificar Checklist Antes de Implementar**

```typescript
import { ensureImplementationReady } from '@autorun/core/helpers/implementationHelpers';

// Detectar componente del mensaje o contenido
const componentName = 'DataTable'; // o detectar automáticamente

try {
  // ⚠️ OBLIGATORIO: Verificar antes de implementar
  await ensureImplementationReady(componentName);
  console.log('✅ Checklist completo, procediendo con implementación');
} catch (error) {
  // ❌ BLOQUEADO - No se puede continuar
  console.error(error.message);
  // Mostrar pasos faltantes al usuario
  return; // NO continuar hasta completar pasos
}
```

### **PASO 2: Completar Checklist Automáticamente**

```typescript
import { getAutorunHub } from '@autorun/core';

// Obtener Pre-Implementation Check add-on
const hub = getAutorunHub();
const preCheckAddon = hub.getAddon('pre-implementation-check');

// Completar cada paso del checklist
if (preCheckAddon) {
  // 1. Consultar Storybook en Vercel
  // ... (navegar, revisar Code/Controls, volver)
  await preCheckAddon.markStepCompleted('DataTable', 'storybookVercel');
  
  // 2. Consultar Storybook MCP
  // ... (usar mcp_storybook_getComponentsProps)
  await preCheckAddon.markStepCompleted('DataTable', 'storybookMCP');
  
  // 3. Consultar documentación
  // ... (leer docs/referencia/componentes/data-data-table.md)
  await preCheckAddon.markStepCompleted('DataTable', 'documentation');
  
  // 4. Comparar versiones
  // ... (comparar Storybook vs código local)
  await preCheckAddon.markStepCompleted('DataTable', 'comparison');
}
```

### **PASO 3: Verificar Nuevamente Antes de Escribir**

```typescript
// Verificar nuevamente antes de escribir
const check = await preCheckAddon.canImplement('DataTable');
if (!check.allowed) {
  throw new Error('❌ Aún faltan pasos: ' + check.missingSteps.join(', '));
}

// Solo entonces escribir
await write('file.html', content);
```

---

## 🔧 INTEGRACIÓN CON HERRAMIENTAS

### **Opción 1: Usar Wrappers Seguros (Recomendado)**

```typescript
import { ImplementationGuard } from '@autorun/core/validation/ImplementationGuard';

// En lugar de write() directo, usar safeWrite()
await ImplementationGuard.safeWrite(
  'file.html',
  content,
  { componentName: 'DataTable', userMessage: 'Implementar DataTable...' }
);

// En lugar de search_replace() directo, usar safeSearchReplace()
await ImplementationGuard.safeSearchReplace(
  'file.html',
  oldString,
  newString,
  { componentName: 'DataTable' }
);
```

### **Opción 2: Verificar Manualmente**

```typescript
import { PreWriteValidator } from '@autorun/core/validation/PreWriteValidator';

// Antes de cada write() o search_replace()
const validation = await PreWriteValidator.validateBeforeWrite(
  filePath,
  content,
  { componentName: 'DataTable' }
);

if (!validation.valid) {
  throw new Error(validation.errors.join('\n'));
}

// Solo entonces escribir
await write(filePath, content);
```

---

## 🚨 MENSAJES DE ERROR

### **Error: Checklist Incompleto**

```
❌❌❌ IMPLEMENTACIÓN BLOQUEADA ❌❌❌

Componente: DataTable
Razón: Faltan pasos obligatorios

📋 Pasos faltantes:
  - Consultar Storybook en Vercel (PRIMERO)
  - Consultar Storybook MCP
  - Consultar documentación específica

⚠️ NO puedes usar write() o search_replace() hasta completar estos pasos.
```

### **Error: Triggers de Imagen Sin Análisis**

```
❌ BLOQUEO: Hay triggers de imagen sin análisis completo.
⚠️ DEBES completar el análisis de imagen antes de escribir código.
📖 Ver: .cursor/rules/01-deteccion-imagen.md
```

---

## 📋 CHECKLIST DE USO

### **Antes de Implementar:**

- [ ] ✅ Detectar componente del mensaje o contenido
- [ ] ✅ Ejecutar `ensureImplementationReady(componentName)`
- [ ] ✅ Si falla, completar pasos faltantes:
  - [ ] Consultar Storybook en Vercel
  - [ ] Consultar Storybook MCP
  - [ ] Consultar documentación
  - [ ] Comparar versiones
- [ ] ✅ Verificar nuevamente antes de escribir
- [ ] ✅ Solo entonces usar `write()` o `search_replace()`

### **Durante la Implementación:**

- [ ] ✅ Usar `ImplementationGuard.safeWrite()` o verificar manualmente
- [ ] ✅ Implementar paso a paso (una funcionalidad a la vez)
- [ ] ✅ Pedir aprobación entre pasos
- [ ] ✅ Verificar que funciona antes de continuar

---

## 🔍 DETECCIÓN AUTOMÁTICA

### **El Sistema Detecta Automáticamente:**

1. **Patrones de componentes en código:**
   - `window.createDataTable()` → Detecta "DataTable"
   - `window.createTabs()` → Detecta "Tabs"
   - `<ubits-data-table>` → Detecta "DataTable"
   - etc.

2. **Patrones en mensajes del usuario:**
   - "implementar data table" → Detecta "DataTable"
   - "crear tabla" → Detecta "DataTable"
   - "implementar tabs" → Detecta "Tabs"
   - etc.

3. **Triggers de imagen:**
   - Palabras clave: "imagen", "crear desde", "home de"
   - Tags: `<image>`, `[imagen]`
   - etc.

---

## ⚠️ REGLAS CRÍTICAS

### **1. NO Puedes Saltarte la Verificación**

- ❌ NO puedes usar `write()` sin verificar
- ❌ NO puedes usar `search_replace()` sin verificar
- ✅ DEBES usar `ensureImplementationReady()` primero
- ✅ DEBES completar el checklist antes de escribir

### **2. El Sistema Bloquea Técnicamente**

- Si faltan pasos → `write()` lanza error
- Si faltan pasos → `search_replace()` lanza error
- NO es una sugerencia, es un BLOQUEO TÉCNICO

### **3. Debes Completar el Checklist**

- Consultar Storybook en Vercel (PRIMERO)
- Consultar Storybook MCP
- Consultar documentación específica
- Comparar versiones

---

## 📚 Referencias

- **Checklist obligatorio:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
- **Pre-Implementation Check:** `docs/guias/implementacion/GUIA-USO-PRE-IMPLEMENTATION-CHECK.md`
- **Proceso paso a paso:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Estrategia completa:** `docs/estrategias/ESTRATEGIA-GARANTIZAR-CUMPLIMIENTO-LINEAMIENTOS.md`

---

**Última actualización:** 2025-12-10  
**Estado:** ✅ Implementado y activo




