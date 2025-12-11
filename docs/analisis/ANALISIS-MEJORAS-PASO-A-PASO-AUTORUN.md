# 🔍 Análisis: Mejoras para Garantizar Seguimiento Paso a Paso en Autorun

**Fecha:** 2025-01-11  
**Objetivo:** Analizar cómo hacer que el agente siga automáticamente el proceso paso a paso sin saltarse fases.

---

## 📊 Situación Actual

### **Sistema Existente:**

1. **Detección Automática** (`autoComponentDetection.ts`):
   - ✅ Detecta componentes al inicio del mensaje
   - ✅ Obtiene plan basado en historias
   - ❌ **NO se ejecuta automáticamente** - El agente debe llamarlo manualmente

2. **Flujo Automático** (`autoImplementationFlow.ts`):
   - ✅ Intercepta write() y search_replace()
   - ✅ Valida con PreWriteValidator
   - ✅ Carga guías automáticamente
   - ❌ **NO fuerza el seguimiento de fases** - Solo valida checklist general

3. **PreWriteValidator** (`PreWriteValidator.ts`):
   - ✅ Valida checklist obligatorio
   - ✅ Verifica Storybook, documentación, etc.
   - ❌ **NO valida orden de fases** - No verifica que se sigan FASE 0 → 0.5 → 1 → 2

4. **Pre-Implementation Check Add-on**:
   - ✅ Verifica checklist antes de implementar
   - ✅ Bloquea si faltan pasos
   - ❌ **NO valida orden de fases** - No verifica que se sigan las fases en orden

5. **Step-by-Step Implementation** (`stepByStepImplementation.ts`):
   - ✅ Sistema de pasos incrementales
   - ✅ Tracking de progreso
   - ❌ **NO se integra automáticamente** - No se usa en el flujo automático

---

## 🚨 Problemas Identificados

### **Problema #1: No se Ejecuta Detección Automática al Inicio**
- El agente no siempre llama `executeAutoDetectionOnMessage` al inicio
- El agente puede saltarse la detección y empezar a implementar directamente

### **Problema #2: No se Siguen las Fases en Orden**
- El agente puede saltarse FASE 0 (verificación de scripts) y empezar en FASE 2 (implementación)
- No hay validación que fuerce el orden: FASE 0 → 0.5 → 1 → 2

### **Problema #3: No se Usan Interceptores Automáticamente**
- El agente puede usar `write()` directo en lugar de `interceptedWrite()`
- Los interceptores no se ejecutan automáticamente en Cursor

### **Problema #4: No se Sigue el Plan Basado en Historias**
- El plan se obtiene pero no se fuerza su seguimiento
- El agente puede implementar múltiples historias a la vez

### **Problema #5: No Hay Sistema de "Guía Paso a Paso" Activa**
- No hay un sistema que bloquee hasta completar cada fase
- No hay un sistema que muestre el siguiente paso obligatorio

---

## ✅ Soluciones Propuestas

### **Solución #1: Sistema de Ejecución Automática al Inicio** ⭐ CRÍTICO

**Problema:** El agente no ejecuta detección automática al inicio.

**Solución:** Crear un sistema que se ejecute automáticamente al inicio de cada mensaje.

**Implementación:**
1. Crear helper `executeOnMessageStart.ts` que se ejecute automáticamente
2. Integrar con `.cursorrules` para que se ejecute siempre
3. Ejecutar detección automática + verificación de fases

**Archivo:** `packages/autorun-core/src/helpers/executeOnMessageStart.ts`

```typescript
/**
 * ⚠️ CRÍTICO: Ejecutar automáticamente al inicio de cada mensaje
 * 
 * Este sistema DEBE ejecutarse al inicio de cada mensaje del usuario
 * para garantizar que se sigan todos los pasos obligatorios.
 */
export async function executeOnMessageStart(userMessage: string): Promise<{
  detected: boolean;
  componentName?: string;
  currentPhase?: string;
  nextPhase?: string;
  blocked: boolean;
  reason?: string;
  plan?: any;
}> {
  // 1. Detección automática
  const detection = await executeAutoDetectionOnMessage(userMessage);
  
  if (!detection.detected) {
    return { detected: false, blocked: false };
  }
  
  // 2. Verificar fase actual
  const phaseCheck = await checkCurrentPhase(detection.componentName!);
  
  // 3. Si no está en la fase correcta, bloquear
  if (phaseCheck.blocked) {
    return {
      detected: true,
      componentName: detection.componentName,
      currentPhase: phaseCheck.currentPhase,
      nextPhase: phaseCheck.nextPhase,
      blocked: true,
      reason: phaseCheck.reason,
      plan: detection.plan,
    };
  }
  
  return {
    detected: true,
    componentName: detection.componentName,
    currentPhase: phaseCheck.currentPhase,
    blocked: false,
    plan: detection.plan,
  };
}
```

---

### **Solución #2: Sistema de Validación de Fases** ⭐ CRÍTICO

**Problema:** No se valida que se sigan las fases en orden.

**Solución:** Crear un sistema que valide y fuerce el orden de fases.

**Implementación:**
1. Crear `PhaseValidator.ts` que valide el orden de fases
2. Integrar con PreWriteValidator para bloquear si no se sigue el orden
3. Crear tracking de fases completadas

**Archivo:** `packages/autorun-core/src/validation/PhaseValidator.ts`

```typescript
export interface PhaseStatus {
  phase: string;
  completed: boolean;
  completedAt?: number;
  requiredSteps: string[];
  completedSteps: string[];
}

export class PhaseValidator {
  private static phaseOrder: string[] = [
    'FASE_0_VERIFICACION_SCRIPTS',
    'FASE_0.1_REVISAR_COMPONENTE',
    'FASE_0.5_ANALIZAR_ESTRUCTURA',
    'FASE_0.6_CONTAR_ITEMS',
    'FASE_1_ANALISIS_COLUMNAS',
    'FASE_2_IMPLEMENTACION_BASICA',
  ];
  
  static async validatePhaseOrder(
    componentName: string,
    currentPhase: string
  ): Promise<{
    valid: boolean;
    currentPhaseStatus?: PhaseStatus;
    nextRequiredPhase?: string;
    reason?: string;
  }> {
    // Obtener fases completadas
    const completedPhases = await this.getCompletedPhases(componentName);
    
    // Verificar que todas las fases anteriores estén completadas
    const currentPhaseIndex = this.phaseOrder.indexOf(currentPhase);
    if (currentPhaseIndex === -1) {
      return {
        valid: false,
        reason: `Fase desconocida: ${currentPhase}`,
      };
    }
    
    // Verificar que todas las fases anteriores estén completadas
    for (let i = 0; i < currentPhaseIndex; i++) {
      const requiredPhase = this.phaseOrder[i];
      if (!completedPhases.includes(requiredPhase)) {
        return {
          valid: false,
          nextRequiredPhase: requiredPhase,
          reason: `Debes completar ${requiredPhase} antes de continuar con ${currentPhase}`,
        };
      }
    }
    
    return { valid: true };
  }
  
  static async markPhaseCompleted(
    componentName: string,
    phase: string
  ): Promise<void> {
    // Guardar en estado persistente
    // ...
  }
  
  static async getCompletedPhases(
    componentName: string
  ): Promise<string[]> {
    // Obtener de estado persistente
    // ...
    return [];
  }
}
```

---

### **Solución #3: Integración con Plan Basado en Historias** ⭐ CRÍTICO

**Problema:** El plan se obtiene pero no se fuerza su seguimiento.

**Solución:** Integrar el plan basado en historias con el sistema de fases.

**Implementación:**
1. Modificar `autoImplementationFlow` para usar el plan
2. Validar que se implemente UNA historia a la vez
3. Bloquear si se intenta implementar múltiples historias

**Modificación en `autoImplementationFlow.ts`:**

```typescript
// Si hay plan basado en historias, validar que se implemente UNA a la vez
if (plan && plan.stories && plan.stories.length > 0) {
  // Verificar que solo se está implementando UNA historia
  const currentStory = await getCurrentStory(componentName);
  if (!currentStory) {
    return {
      canWrite: false,
      reason: 'Debes seleccionar UNA historia del plan para implementar. No puedes implementar múltiples historias a la vez.',
      plan,
    };
  }
  
  // Verificar que la historia actual esté en el plan
  const storyInPlan = plan.stories.find((s: any) => s.id === currentStory.id);
  if (!storyInPlan) {
    return {
      canWrite: false,
      reason: `La historia "${currentStory.name}" no está en el plan. Debes implementar las historias en orden.`,
      plan,
    };
  }
}
```

---

### **Solución #4: Sistema de "Guía Paso a Paso" Activa** ⭐ CRÍTICO

**Problema:** No hay un sistema que bloquee hasta completar cada fase.

**Solución:** Crear un sistema de "guía activa" que muestre el siguiente paso obligatorio.

**Implementación:**
1. Crear `ActiveStepGuide.ts` que muestre el siguiente paso
2. Integrar con interceptores para bloquear hasta completar
3. Mostrar instrucciones claras al agente

**Archivo:** `packages/autorun-core/src/helpers/ActiveStepGuide.ts`

```typescript
export interface ActiveStep {
  phase: string;
  step: string;
  description: string;
  requiredActions: string[];
  verification?: () => Promise<boolean>;
}

export class ActiveStepGuide {
  static async getCurrentStep(
    componentName: string
  ): Promise<ActiveStep | null> {
    // Obtener fase actual
    const currentPhase = await PhaseValidator.getCurrentPhase(componentName);
    if (!currentPhase) {
      // Empezar con FASE 0
      return {
        phase: 'FASE_0_VERIFICACION_SCRIPTS',
        step: 'Verificar Script UMD',
        description: 'Verificar que el script UMD de DataTable esté cargado',
        requiredActions: [
          'Verificar que el script data-table.umd.js está en el HTML',
          'Verificar que window.createDataTable está disponible',
          'Si no está disponible, agregar script con carga dinámica',
        ],
        verification: async () => {
          return typeof window.createDataTable === 'function' ||
                 (window.UBITSDataTable && typeof window.UBITSDataTable.createDataTable === 'function');
        },
      };
    }
    
    // Obtener siguiente paso de la fase actual
    // ...
  }
  
  static async blockUntilStepCompleted(
    componentName: string,
    step: ActiveStep
  ): Promise<{
    completed: boolean;
    reason?: string;
  }> {
    if (step.verification) {
      const isCompleted = await step.verification();
      if (!isCompleted) {
        return {
          completed: false,
          reason: `Debes completar: ${step.description}`,
        };
      }
    }
    
    return { completed: true };
  }
}
```

---

### **Solución #5: Mejora en Interceptores** ⭐ CRÍTICO

**Problema:** Los interceptores no se ejecutan automáticamente en Cursor.

**Solución:** Mejorar la integración con `.cursorrules` para forzar su uso.

**Modificación en `.cursorrules`:**

```markdown
## ⚠️⚠️⚠️ REGLA CRÍTICA: USO OBLIGATORIO DE INTERCEPTORES ⚠️⚠️⚠️

**ANTES de usar write() o search_replace() para implementar un componente, DEBES:**

1. **Ejecutar detección automática al inicio:**
   ```typescript
   const detection = await executeAutoDetectionOnMessage(userMessage);
   if (detection.detected && detection.blocked) {
     // ❌ NO continuar - mostrar razón y plan
     throw new Error(`❌ BLOQUEADO: ${detection.reason}`);
   }
   ```

2. **Usar interceptedWrite() o interceptedSearchReplace():**
   ```typescript
   await interceptedWrite(filePath, content, { componentName, userMessage });
   // O
   await interceptedSearchReplace(filePath, oldString, newString, { componentName, userMessage });
   ```

3. **NO usar write() o search_replace() directo:**
   - ❌ NO usar `write()` directo
   - ❌ NO usar `search_replace()` directo
   - ✅ SIEMPRE usar interceptores

**⚠️ CRÍTICO:** Si usas write() o search_replace() directo sin interceptores, el sistema NO validará fases ni checklist.
```

---

## 📋 Plan de Implementación

### **Fase 1: Sistema de Ejecución Automática** (Prioridad Alta)
1. ✅ Crear `executeOnMessageStart.ts`
2. ✅ Integrar con `.cursorrules`
3. ✅ Ejecutar automáticamente al inicio de cada mensaje

### **Fase 2: Sistema de Validación de Fases** (Prioridad Alta)
1. ✅ Crear `PhaseValidator.ts`
2. ✅ Integrar con PreWriteValidator
3. ✅ Crear tracking de fases completadas

### **Fase 3: Integración con Plan Basado en Historias** (Prioridad Media)
1. ✅ Modificar `autoImplementationFlow` para usar el plan
2. ✅ Validar que se implemente UNA historia a la vez
3. ✅ Bloquear si se intenta implementar múltiples historias

### **Fase 4: Sistema de "Guía Paso a Paso" Activa** (Prioridad Media)
1. ✅ Crear `ActiveStepGuide.ts`
2. ✅ Integrar con interceptores
3. ✅ Mostrar instrucciones claras al agente

### **Fase 5: Mejora en Interceptores** (Prioridad Baja)
1. ✅ Mejorar documentación en `.cursorrules`
2. ✅ Agregar ejemplos claros
3. ✅ Crear guía de uso

---

## 🎯 Resultado Esperado

Después de implementar estas mejoras:

1. ✅ **Detección automática al inicio:** El agente siempre ejecuta detección automática
2. ✅ **Fases en orden:** El agente no puede saltarse fases
3. ✅ **Plan basado en historias:** El agente implementa UNA historia a la vez
4. ✅ **Guía activa:** El agente siempre sabe cuál es el siguiente paso
5. ✅ **Interceptores obligatorios:** El agente siempre usa interceptores

---

## 📚 Referencias

- **Detección automática:** `packages/autorun-core/src/helpers/autoComponentDetection.ts`
- **Flujo automático:** `packages/autorun-core/src/helpers/autoImplementationFlow.ts`
- **PreWriteValidator:** `packages/autorun-core/src/validation/PreWriteValidator.ts`
- **Pre-Implementation Check:** `packages/addons/functional/pre-implementation-check/`
- **Step-by-Step:** `packages/autorun-core/src/helpers/stepByStepImplementation.ts`

---

**Última actualización:** 2025-01-11  
**Estado:** 📋 Análisis Completo - Listo para Implementación
