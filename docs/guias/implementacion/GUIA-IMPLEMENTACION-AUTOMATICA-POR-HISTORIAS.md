# 🎯 Guía: Implementación Automática por Historias de Storybook

## 🎯 Objetivo

**AUTOMATIZAR** el proceso de implementación de componentes UBITS para que:
1. ✅ Automáticamente obtenga todas las historias de Storybook
2. ✅ Automáticamente cree un plan de implementación basado en esas historias
3. ✅ Automáticamente guíe paso a paso siguiendo el plan
4. ✅ Automáticamente evite errores documentados

---

## 🔄 FLUJO AUTOMÁTICO

```
Usuario solicita implementar componente
         ↓
[FASE 0] Pre-Implementation Check detecta componente
         ↓
[FASE 1] Add-on obtiene automáticamente plan basado en historias
         ↓
[FASE 2] Agente muestra plan al usuario
         ↓
[FASE 3] Agente implementa UNA historia a la vez
         ↓
[FASE 4] Agente completa checklist de cada historia
         ↓
[FASE 5] Agente continúa con siguiente historia
```

---

## 📋 PROCESO AUTOMÁTICO DETALLADO

### **FASE 0: DETECCIÓN AUTOMÁTICA** 🔍

**El Pre-Implementation Check add-on detecta automáticamente cuando:**
- Se escribe código con patrones como `window.createDataTable()`, `window.createTabs()`, etc.
- Se detecta un componente en el mensaje del usuario
- Se intenta usar `write()` o `search_replace()` con código de componente

**Cuando detecta, automáticamente:**
1. Obtiene todas las historias del componente desde Storybook
2. Crea un plan de implementación basado en esas historias
3. Muestra el plan en la consola
4. Bloquea la implementación hasta completar el checklist

---

### **FASE 1: OBTENER PLAN AUTOMÁTICAMENTE** 📚

**El agente DEBE usar el plan que el add-on ya obtuvo:**

```typescript
// Obtener AutorunHub
import { getAutorunHub } from '@autorun/core';

const hub = getAutorunHub();
if (!hub) {
  throw new Error('❌ AutorunHub no está inicializado');
}

// Obtener Pre-Implementation Check add-on
const preCheckAddon = hub.getAddon('pre-implementation-check');
if (!preCheckAddon) {
  throw new Error('❌ Pre-Implementation Check add-on no está disponible');
}

// Obtener plan (el add-on ya lo obtuvo automáticamente)
const plan = preCheckAddon.getStoryBasedPlan(componentName);

// Si no existe, obtenerlo automáticamente
if (!plan) {
  const componentId = mapComponentNameToStorybookId(componentName);
  const plan = await preCheckAddon.getOrCreateStoryBasedPlan(componentName, componentId);
}

// Mostrar plan al usuario
if (plan) {
  console.log(`\n📚 Plan de implementación basado en historias:`);
  console.log(`   Componente: ${plan.componentName}`);
  console.log(`   Total de historias: ${plan.totalSteps}`);
  console.log(`   Tiempo estimado: ${plan.estimatedTotalTime}`);
  console.log(`\n📋 Historias a implementar:`);
  plan.storySteps.forEach((step, index) => {
    console.log(`   ${index + 1}. ${step.story.name} (${step.checklist.items.length} items en checklist)`);
  });
}
```

---

### **FASE 2: IMPLEMENTAR UNA HISTORIA A LA VEZ** 🛠️

**Para CADA historia del plan (UNA A LA VEZ):**

```typescript
// Para CADA historia del plan
for (let i = 0; i < plan.storySteps.length; i++) {
  const step = plan.storySteps[i];
  
  // ⚠️ CRÍTICO: Verificar que la historia anterior esté completa
  if (i > 0) {
    const previousStep = plan.storySteps[i - 1];
    if (!previousStep.checklist.allCompleted) {
      throw new Error(`⚠️ No se puede continuar: Checklist de "${previousStep.story.name}" no está completo`);
    }
  }
  
  // Obtener checklist de la historia actual
  const checklist = step.checklist;
  console.log(`\n📋 Implementando: ${step.story.name}`);
  console.log(`   Checklist: ${checklist.items.length} items`);
  
  // Completar cada item del checklist uno por uno
  // (ver sección "Completar Checklist" abajo)
  
  // Verificar que TODO esté completo antes de continuar
  if (!step.checklist.allCompleted) {
    throw new Error(`⚠️ Checklist incompleto para "${step.story.name}"`);
  }
  
  console.log(`✅ "${step.story.name}" completada. Continuando...`);
}
```

---

### **FASE 3: COMPLETAR CHECKLIST DE CADA HISTORIA** ✅

**Para CADA item del checklist:**

#### **Item 1: Consultar Historia en Storybook** ⚠️ OBLIGATORIO

```typescript
// Guardar URL del template ANTES de navegar
const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
const templateUrl = snapshot?.url;

// Verificar que la historia existe ANTES de navegar
import { buildSafeStorybookUrl } from '@autorun/core/helpers/verifyStorybookStories';
const urlResult = await buildSafeStorybookUrl(plan.componentName, step.story.name);

// Navegar a la historia específica
await mcp_cursor-ide-browser_browser_navigate({ url: urlResult.url });
await mcp_cursor-ide-browser_browser_snapshot();

// Revisar pestaña "Code" para ver código exacto
// Revisar pestaña "Controls" para ver opciones
// Revisar pestaña "Docs" para ver documentación

// ⚠️ OBLIGATORIO: Volver al template DESPUÉS de consultar
await mcp_cursor-ide-browser_browser_navigate({ url: templateUrl });
await mcp_cursor-ide-browser_browser_snapshot();

// Marcar como completado
import { completeChecklistItem } from '@autorun/core/helpers/storyBasedImplementation';
plan = completeChecklistItem(plan, step.story.id, 'consult-storybook');
```

#### **Item 2: Entender la Funcionalidad** 🧠

```typescript
// Documentar qué funcionalidad específica se va a implementar
// Marcar como completado después de entender
plan = completeChecklistItem(plan, step.story.id, 'understand-functionality');
```

#### **Item 3: Implementar la Funcionalidad** 💻

```typescript
// Implementar SOLO la funcionalidad de esta historia específica
// NO implementar otras funcionalidades
// Usar los parámetros exactos vistos en Storybook

// Marcar como completado después de implementar
plan = completeChecklistItem(plan, step.story.id, 'implement-functionality');
```

#### **Item 4: Probar la Funcionalidad** 🧪

```typescript
// Probar que la funcionalidad funciona correctamente
// Verificar en el navegador

// Marcar como completado después de probar
plan = completeChecklistItem(plan, step.story.id, 'test-functionality');
```

---

## 🚨 REGLAS CRÍTICAS

1. **SIEMPRE usar el plan que el add-on obtiene automáticamente**
2. **SIEMPRE implementar UNA historia a la vez**
3. **SIEMPRE completar TODO el checklist antes de continuar**
4. **SIEMPRE consultar cada historia en Storybook antes de implementarla**
5. **SIEMPRE volver al template después de consultar Storybook**
6. **NUNCA usar la historia "default"** - tiene todas las funcionalidades mezcladas
7. **NUNCA implementar múltiples historias al mismo tiempo**

---

## 📚 FUNCIONES DISPONIBLES

### **Obtener Plan del Add-on**

```typescript
const hub = getAutorunHub();
const preCheckAddon = hub.getAddon('pre-implementation-check');

// Obtener plan existente
const plan = preCheckAddon.getStoryBasedPlan(componentName);

// Obtener o crear plan automáticamente
const plan = await preCheckAddon.getOrCreateStoryBasedPlan(componentName, componentId);
```

### **Verificar Detección**

```typescript
// Verificar cuando se detecta intención de implementar
const verification = await preCheckAddon.verifyOnDetection(componentName);

if (verification.blocked) {
  console.error('❌ Implementación bloqueada:', verification.reason);
  // Completar pasos faltantes
}

if (verification.storyBasedPlan) {
  console.log('✅ Plan basado en historias disponible');
  // Usar plan para guiar implementación
}
```

---

## ✅ BENEFICIOS

1. **Automatización:** El add-on obtiene el plan automáticamente
2. **Consistencia:** Todas las implementaciones siguen el mismo proceso
3. **Calidad:** Uso de historias específicas evita errores
4. **Velocidad:** Proceso automatizado reduce tiempo
5. **Precisión:** Props y tokens exactos de Storybook

---

**Última actualización:** 2025-12-10
