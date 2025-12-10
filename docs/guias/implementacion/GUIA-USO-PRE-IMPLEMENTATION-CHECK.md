# ✅ Guía: Usar Pre-Implementation Check Add-on

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"SIEMPRE verificar con Pre-Implementation Check antes de implementar cualquier componente"** - El add-on bloquea automáticamente la implementación si no se completan los pasos obligatorios.

---

## 🎯 OBJETIVO

Garantizar que **TODA** implementación de componente UBITS siga el proceso obligatorio:
1. ✅ Consultar Storybook en Vercel (PRIMERO)
2. ✅ Consultar Storybook MCP
3. ✅ Consultar documentación específica
4. ✅ Comparar y verificar versiones

---

## 🔄 PROCESO AUTOMÁTICO

### **PASO 1: ANTES DE IMPLEMENTAR - Verificar con Add-on**

**Cuando se detecta que se va a implementar un componente:**

```typescript
// 1. Obtener el add-on
const preCheckAddon = context.hub.getAddon('pre-implementation-check');

// 2. Verificar si se puede implementar
const checkResult = await preCheckAddon.canImplement('DataTable');

if (!checkResult.allowed) {
  // ❌ BLOQUEAR IMPLEMENTACIÓN
  console.error('❌ IMPLEMENTACIÓN BLOQUEADA');
  console.error('Faltan pasos obligatorios:', checkResult.missingSteps);
  console.error('Razón:', checkResult.reason);
  
  // Mostrar mensaje al usuario
  return {
    blocked: true,
    reason: checkResult.reason,
    missingSteps: checkResult.missingSteps,
    checklist: checkResult.checklist
  };
}

// ✅ CONTINUAR CON IMPLEMENTACIÓN
```

---

### **PASO 2: COMPLETAR CHECKLIST OBLIGATORIO**

**Mientras se consultan las fuentes, marcar pasos como completados:**

#### **2.1 Consultar Storybook en Vercel (PRIMERO)** ⚠️ OBLIGATORIO

```typescript
// 1. Abrir Storybook en Vercel
// URL: https://ubits-storybook10.vercel.app/
// Buscar componente específico

// 2. Revisar pestaña "Code" y "Controls"

// 3. Después de consultar, marcar como completado
await preCheckAddon.markStepCompleted('DataTable', 'storybookVercel');
```

**Guía:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - ⚠️ **OBLIGATORIO**

---

#### **2.2 Consultar Storybook MCP** ⚠️ OBLIGATORIO

```typescript
// 1. Listar componentes disponibles
const components = await mcp_storybook_getComponentList();

// 2. Obtener props detallados
const props = await mcp_storybook_getComponentsProps(['DataTable']);

// 3. Después de consultar, marcar como completado
await preCheckAddon.markStepCompleted('DataTable', 'storybookMCP');
```

**Guía:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - ⚠️ **OBLIGATORIO**

---

#### **2.3 Consultar Documentación Específica** ⚠️ OBLIGATORIO

```typescript
// 1. Leer documentación específica
const docPath = 'docs/referencia/componentes/data-data-table.md';
const documentation = await readFile(docPath);

// 2. Identificar subcomponentes y subfuncionalidades
// - Subcomponentes: Header, Columnas, Filas, Action Bar, etc.
// - Subfuncionalidades: Checkboxes, filtros, búsqueda, etc.
// - Tipos/Variantes: 11 tipos de columnas, etc.

// 3. Después de consultar, marcar como completado
await preCheckAddon.markStepCompleted('DataTable', 'documentation');
```

**Guía:** `docs/referencia/ESTRATEGIA-IMPLEMENTACION-AUTOMATICA.md` - ⚠️ **OBLIGATORIO**

---

#### **2.4 Comparar y Verificar** ⚠️ OBLIGATORIO

```typescript
// 1. Comparar Storybook en Vercel con código local
// - ¿Los tipos de columnas coinciden?
// - ¿Las opciones disponibles coinciden?
// - ¿La estructura de datos coincide?

// 2. Si hay diferencias, usar versión del Storybook (más actualizada)

// 3. Después de comparar, marcar como completado
await preCheckAddon.markStepCompleted('DataTable', 'comparison');
```

---

### **PASO 3: VERIFICAR NUEVAMENTE ANTES DE IMPLEMENTAR**

**Después de completar todos los pasos, verificar nuevamente:**

```typescript
// Verificar que todos los pasos están completos
const checkResult = await preCheckAddon.canImplement('DataTable');

if (!checkResult.allowed) {
  // Aún faltan pasos
  console.error('❌ Aún faltan pasos obligatorios:', checkResult.missingSteps);
  return;
}

// ✅ TODOS LOS PASOS COMPLETADOS - CONTINUAR CON IMPLEMENTACIÓN
console.log('✅ Checklist completo, procediendo con implementación');
```

---

## 🚨 BLOQUEO AUTOMÁTICO

**Si se intenta implementar sin completar el checklist:**

```typescript
// El add-on bloquea automáticamente y registra en Problem Tracker
{
  blocked: true,
  reason: "Faltan pasos obligatorios: Consultar Storybook en Vercel (PRIMERO), Consultar Storybook MCP, Consultar documentación específica",
  missingSteps: [
    "Consultar Storybook en Vercel (PRIMERO)",
    "Consultar Storybook MCP",
    "Consultar documentación específica"
  ],
  checklist: {
    componentName: "DataTable",
    storybookVercel: false,
    storybookMCP: false,
    documentation: false,
    comparison: false
  }
}
```

---

## 📋 FLUJO COMPLETO

```
1. Usuario solicita implementar componente
   ↓
2. Detectar componente (ej: "DataTable")
   ↓
3. Verificar con Pre-Implementation Check
   ↓
4. ¿Checklist completo?
   ├─ NO → Bloquear y mostrar pasos faltantes
   └─ SÍ → Continuar
   ↓
5. Completar pasos obligatorios:
   - Consultar Storybook en Vercel → marcar completado
   - Consultar Storybook MCP → marcar completado
   - Consultar documentación → marcar completado
   - Comparar versiones → marcar completado
   ↓
6. Verificar nuevamente
   ↓
7. ¿Todos los pasos completos?
   ├─ NO → Bloquear
   └─ SÍ → Implementar
```

---

## 🎯 EJEMPLO COMPLETO

### **Implementar DataTable**

```typescript
// 1. Detectar componente
const componentName = 'DataTable';

// 2. Verificar con Pre-Implementation Check
const preCheckAddon = context.hub.getAddon('pre-implementation-check');
const checkResult = await preCheckAddon.canImplement(componentName);

if (!checkResult.allowed) {
  console.error('❌ IMPLEMENTACIÓN BLOQUEADA');
  console.error('Faltan pasos obligatorios:', checkResult.missingSteps);
  return;
}

// 3. Completar pasos obligatorios

// 3.1 Consultar Storybook en Vercel
// - Abrir: https://ubits-storybook10.vercel.app/
// - Buscar: data-data-table
// - Revisar pestaña "Code" y "Controls"
await preCheckAddon.markStepCompleted(componentName, 'storybookVercel');

// 3.2 Consultar Storybook MCP
const props = await mcp_storybook_getComponentsProps([componentName]);
await preCheckAddon.markStepCompleted(componentName, 'storybookMCP');

// 3.3 Consultar documentación
const doc = await readFile('docs/referencia/componentes/data-data-table.md');
await preCheckAddon.markStepCompleted(componentName, 'documentation');

// 3.4 Comparar versiones
// - Comparar Storybook Vercel vs código local
await preCheckAddon.markStepCompleted(componentName, 'comparison');

// 4. Verificar nuevamente
const finalCheck = await preCheckAddon.canImplement(componentName);

if (!finalCheck.allowed) {
  console.error('❌ Aún faltan pasos');
  return;
}

// 5. ✅ IMPLEMENTAR
console.log('✅ Checklist completo, procediendo con implementación');
// ... implementar componente
```

---

## 🔍 DEBUGGING

### Ver checklist actual

```typescript
const checklist = preCheckAddon.getChecklist('DataTable');
console.log('Checklist:', checklist);
```

### Ver intentos de implementación

```typescript
const attempts = preCheckAddon.getImplementationAttempts();
attempts.forEach(attempt => {
  console.log(`Componente: ${attempt.componentName}`);
  console.log(`Bloqueado: ${attempt.blocked}`);
  console.log(`Razón: ${attempt.reason}`);
});
```

### Limpiar checklist

```typescript
// Limpiar checklist de un componente
preCheckAddon.clearChecklist('DataTable');

// Limpiar todos los checklists
preCheckAddon.clearAllChecklists();
```

---

## 📚 Referencias

- `packages/addons/functional/pre-implementation-check/README.md` - Documentación del add-on
- `docs/guias/implementacion/CHECKLIST-PRE-IMPLEMENTACION.md` - Checklist obligatorio
- `docs/analisis/ANALISIS-PROCESO-IMPLEMENTACION-ACTUAL.md` - Análisis del proceso
- `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - Verificar Storybook
- `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - Usar MCPs

---

**Última actualización:** Diciembre 2024




