# 📋 Guía: Sistema Paso a Paso Automático

> **⚠️ CRÍTICO:** Este sistema garantiza que el agente siga automáticamente el proceso paso a paso sin saltarse fases.

---

## 🎯 Objetivo

Garantizar que **TODA** implementación de componente siga automáticamente:
1. ✅ Detección automática al inicio
2. ✅ Verificación de fases en orden
3. ✅ Plan basado en historias
4. ✅ Bloqueo si faltan pasos o fases

---

## 🔄 Flujo Automático

### **PASO 1: Ejecutar al Inicio de Cada Mensaje** ⚠️ OBLIGATORIO

**AL INICIO de cada mensaje del usuario, SIEMPRE ejecutar:**

```typescript
import { executeOnMessageStart } from '@autorun/core';

const result = await executeOnMessageStart(userMessage);
```

**Este sistema ejecuta automáticamente:**
1. Detección de componentes
2. Verificación con Pre-Implementation Check
3. Validación de fases en orden
4. Obtención de plan basado en historias

---

### **PASO 2: Verificar Resultado**

**Si `result.blocked === true`:**
```typescript
if (result.blocked) {
  // ❌ NO continuar con la implementación
  console.error(`❌ IMPLEMENTACIÓN BLOQUEADA: ${result.reason}`);
  
  // Mostrar razón y plan al usuario
  // Completar pasos faltantes antes de continuar
  
  throw new Error(`❌ BLOQUEADO: ${result.reason}`);
}
```

**Si `result.detected === true` y `result.blocked === false`:**
```typescript
if (result.detected && result.componentName && !result.blocked) {
  // ✅ Continuar con la implementación
  // Usar plan si está disponible: result.plan
  // Seguir el flujo automático normalmente
}
```

---

### **PASO 3: Seguir Fases en Orden**

**El sistema valida automáticamente el orden de fases:**

1. **FASE 0: Verificación de Scripts** ⚠️ PRIMERO
   - Verificar que el script UMD esté cargado
   - Verificar que `window.createDataTable` esté disponible

2. **FASE 0.1: Revisar Componente**
   - Consultar Storybook en Vercel
   - Consultar Storybook MCP
   - Consultar documentación

3. **FASE 0.5: Analizar Estructura**
   - Analizar contenedores
   - Analizar spacing

4. **FASE 0.6: Contar Items**
   - Contar items/filas en la imagen

5. **FASE 1: Análisis de Columnas**
   - Identificar columnas
   - Identificar tipos de datos

6. **FASE 2: Implementación Básica**
   - Implementar componente básico

**⚠️ CRÍTICO:** No puedes saltarte fases. El sistema bloquea si intentas continuar sin completar las fases anteriores.

---

### **PASO 4: Marcar Fases Completadas**

**Después de completar cada fase, marcarla como completada:**

```typescript
import { PhaseValidator } from '@autorun/core';

// Después de completar FASE 0
await PhaseValidator.markPhaseCompleted('DataTable', 'FASE_0_VERIFICACION_SCRIPTS');

// Después de completar FASE 0.1
await PhaseValidator.markPhaseCompleted('DataTable', 'FASE_0.1_REVISAR_COMPONENTE');

// ... etc
```

---

### **PASO 5: Validar Antes de Continuar**

**Antes de continuar con una fase, validar el orden:**

```typescript
import { PhaseValidator } from '@autorun/core';

const validation = await PhaseValidator.validatePhaseOrder(
  'DataTable',
  'FASE_1_ANALISIS_COLUMNAS'
);

if (!validation.valid) {
  // ❌ NO continuar
  console.error(`❌ Orden de fases inválido: ${validation.reason}`);
  console.error(`📋 Siguiente fase requerida: ${validation.nextRequiredPhase}`);
  
  throw new Error(`❌ BLOQUEADO: ${validation.reason}`);
}

// ✅ Continuar con la fase
```

---

## 📋 Checklist Automático

El sistema ejecuta automáticamente este checklist:

### **Al Inicio de Cada Mensaje:**
- [ ] Ejecutar `executeOnMessageStart(userMessage)`
- [ ] Verificar si está bloqueado
- [ ] Si está bloqueado, mostrar razón y plan
- [ ] Si no está bloqueado, continuar con implementación

### **Antes de Cada Fase:**
- [ ] Validar orden de fases con `PhaseValidator.validatePhaseOrder()`
- [ ] Si orden inválido, bloquear y mostrar siguiente fase requerida
- [ ] Si orden válido, continuar con la fase

### **Después de Cada Fase:**
- [ ] Marcar fase como completada con `PhaseValidator.markPhaseCompleted()`
- [ ] Verificar siguiente fase requerida
- [ ] Continuar con siguiente fase

---

## 🚨 Reglas Críticas

### **Regla #1: SIEMPRE Ejecutar al Inicio**
- ✅ Ejecutar `executeOnMessageStart()` al inicio de cada mensaje
- ❌ NO saltarse este paso

### **Regla #2: SIEMPRE Seguir Fases en Orden**
- ✅ Completar FASE 0 antes de FASE 0.1
- ✅ Completar FASE 0.1 antes de FASE 0.5
- ✅ Completar FASE 0.5 antes de FASE 1
- ✅ Completar FASE 1 antes de FASE 2
- ❌ NO saltarse fases

### **Regla #3: SIEMPRE Marcar Fases Completadas**
- ✅ Marcar fase como completada después de completarla
- ❌ NO olvidar marcar fases completadas

### **Regla #4: SIEMPRE Validar Antes de Continuar**
- ✅ Validar orden de fases antes de continuar
- ❌ NO continuar sin validar

---

## 🔗 Referencias

- **Ejecución automática:** `packages/autorun-core/src/helpers/executeOnMessageStart.ts`
- **Validador de fases:** `packages/autorun-core/src/validation/PhaseValidator.ts`
- **Detección automática:** `packages/autorun-core/src/helpers/autoComponentDetection.ts`
- **Flujo automático:** `packages/autorun-core/src/helpers/autoImplementationFlow.ts`
- **Análisis completo:** `docs/analisis/ANALISIS-MEJORAS-PASO-A-PASO-AUTORUN.md`

---

**Última actualización:** 2025-01-11  
**Estado:** ✅ Sistema Implementado y Documentado
