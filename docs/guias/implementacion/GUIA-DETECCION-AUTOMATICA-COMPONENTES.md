# 🔍 Guía: Detección Automática de Componentes

> **⚠️ CRÍTICO:** Este sistema se ejecuta AUTOMÁTICAMENTE al inicio de cada mensaje para detectar componentes y ejecutar el flujo completo.

---

## 🎯 OBJETIVO

**Garantizar que cuando el usuario menciona "tabla", "data table", "tabs", etc., se detecte automáticamente y se ejecute el flujo completo:**
1. ✅ Detección automática del componente
2. ✅ Obtención automática del plan basado en historias
3. ✅ Ejecución del flujo obligatorio: ANÁLISIS → PLAN → CHECKLIST → IMPLEMENTACIÓN

---

## 🔄 CÓMO FUNCIONA

### **Paso 1: Detección Automática** 🔍

**Al inicio de cada mensaje, el sistema detecta automáticamente:**

```typescript
import { executeAutoDetectionOnMessage } from '@autorun/core/helpers/autoComponentDetection';

const detectionResult = await executeAutoDetectionOnMessage(userMessage);
```

**Patrones detectados para DataTable:**
- ✅ "tabla" → DataTable (alta confianza)
- ✅ "data table" → DataTable (alta confianza)
- ✅ "data-table" → DataTable (alta confianza)
- ✅ "tabla de datos" → DataTable (alta confianza)
- ✅ "tabla con columnas" → DataTable (alta confianza)
- ✅ "tabla con filas" → DataTable (alta confianza)
- ✅ "implementar tabla" → DataTable (alta confianza)
- ✅ "crear tabla" → DataTable (alta confianza)
- ✅ "agregar tabla" → DataTable (alta confianza)
- ✅ "poner tabla" → DataTable (alta confianza)
- ✅ "necesito tabla" → DataTable (alta confianza)
- ✅ "quiero tabla" → DataTable (alta confianza)

**Patrones detectados para otros componentes:**
- ✅ "tabs" → Tabs
- ✅ "pestañas" → Tabs
- ✅ "modal" → Modal
- ✅ "botón" → Button
- ✅ Etc.

---

### **Paso 2: Obtención Automática del Plan** 📚

**Cuando se detecta un componente, automáticamente:**

1. **Obtiene el plan basado en historias de Storybook:**
   ```typescript
   if (detectionResult.plan) {
     console.log(`📋 Plan basado en historias: ${detectionResult.plan.totalSteps} historias`);
     // Mostrar plan al usuario
   }
   ```

2. **Muestra el plan al usuario:**
   ```typescript
   if (detectionResult.plan) {
     console.log(`\n📚 Plan de implementación basado en historias:`);
     console.log(`   Componente: ${detectionResult.plan.componentName}`);
     console.log(`   Total de historias: ${detectionResult.plan.totalSteps}`);
     detectionResult.plan.storySteps.forEach((step, index) => {
       console.log(`   ${index + 1}. ${step.story.name}`);
     });
     // ⚠️ CRÍTICO: Pedir aprobación antes de continuar
   }
   ```

3. **Bloquea la implementación hasta completar el checklist:**
   ```typescript
   if (detectionResult.verification?.blocked) {
     console.error(`❌ Implementación bloqueada: ${detectionResult.verification.reason}`);
     // Completar pasos faltantes antes de continuar
   }
   ```

---

### **Paso 3: Ejecución del Flujo Obligatorio** 🛠️

**Una vez detectado el componente y obtenido el plan:**

1. **ANÁLISIS** → Analizar componentes, iconos, spacing, estructura
2. **PLAN** → Mostrar plan detallado al usuario
3. **CHECKLIST** → Crear checklist para cada historia
4. **IMPLEMENTACIÓN** → Implementar paso a paso, UNA historia a la vez

---

## 📋 EJEMPLO DE USO

### **Mensaje del Usuario:**
```
"vale ahora necesito que agregemos a 16 px de los tabs en el tab de encuestas una datatabla con la lista de encuestas con todas las funcionalidades de la tabla menos paginador"
```

### **Detección Automática:**
```typescript
// 1. Detectar componente automáticamente
const detectionResult = await executeAutoDetectionOnMessage(userMessage);

// Resultado:
// {
//   detected: true,
//   componentName: 'DataTable',
//   confidence: 'high',
//   shouldExecuteFlow: true,
//   plan: { ... }, // Plan basado en historias
//   verification: { ... } // Verificación de Pre-Implementation Check
// }
```

### **Ejecución del Flujo:**
```typescript
// 2. Mostrar plan al usuario
if (detectionResult.plan) {
  console.log(`\n📚 Plan de implementación basado en historias:`);
  console.log(`   Componente: ${detectionResult.plan.componentName}`);
  console.log(`   Total de historias: ${detectionResult.plan.totalSteps}`);
  // Pedir aprobación antes de continuar
}

// 3. Implementar UNA historia a la vez
for (const step of detectionResult.plan.storySteps) {
  // Completar TODO el checklist antes de continuar
}
```

---

## ⚠️ REGLAS CRÍTICAS

### **✅ SIEMPRE Hacer:**

1. ✅ Ejecutar `executeAutoDetectionOnMessage()` al inicio de cada mensaje
2. ✅ Verificar si se detectó un componente antes de implementar
3. ✅ Obtener y mostrar el plan basado en historias
4. ✅ Pedir aprobación del usuario antes de implementar
5. ✅ Implementar UNA historia a la vez
6. ✅ Completar TODO el checklist antes de continuar

### **❌ NUNCA Hacer:**

1. ❌ Implementar sin detectar primero el componente
2. ❌ Implementar sin obtener el plan basado en historias
3. ❌ Implementar sin mostrar el plan al usuario
4. ❌ Implementar sin aprobación del usuario
5. ❌ Implementar múltiples historias al mismo tiempo
6. ❌ Saltarse items del checklist

---

## 🔧 CONFIGURACIÓN

### **Patrones de Detección Mejorados**

**Los patrones se actualizan automáticamente en:**
- `packages/autorun-core/src/helpers/implementationHelpers.ts` - `detectComponentFromMessage()`
- `packages/autorun-core/src/helpers/proactiveDetection.ts` - `detectComponentsProactively()`

**Para agregar nuevos patrones, editar estos archivos.**

---

## 📚 REFERENCIAS

### **Archivos Relacionados:**
- `packages/autorun-core/src/helpers/autoComponentDetection.ts` - Sistema de detección automática
- `packages/autorun-core/src/helpers/implementationHelpers.ts` - Detección básica
- `packages/autorun-core/src/helpers/proactiveDetection.ts` - Detección proactiva mejorada
- `packages/autorun-core/src/helpers/autoImplementationFlow.ts` - Flujo automático de implementación

### **Guías Relacionadas:**
- `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md` - Flujo obligatorio completo
- `docs/guias/implementacion/GUIA-IMPLEMENTACION-AUTOMATICA-POR-HISTORIAS.md` - Implementación por historias
- `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md` - Checklist obligatorio

---

## ✅ RESUMEN

**El sistema de detección automática:**
1. ✅ Detecta automáticamente "tabla", "data table", "tabs", etc.
2. ✅ Obtiene automáticamente el plan basado en historias
3. ✅ Ejecuta automáticamente el flujo obligatorio completo
4. ✅ Bloquea la implementación hasta completar el checklist
5. ✅ Guía paso a paso la implementación

**Este sistema garantiza que NUNCA se vuelva a implementar sin seguir el flujo correcto.**

---

**Última actualización:** 2025-01-03








