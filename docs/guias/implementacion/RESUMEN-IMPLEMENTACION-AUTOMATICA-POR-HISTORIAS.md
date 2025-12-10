# 📋 Resumen: Implementación Automática por Historias de Storybook

## 🎯 Objetivo

**AUTOMATIZAR** el proceso de implementación de componentes UBITS para que:
1. ✅ Automáticamente obtenga todas las historias de Storybook
2. ✅ Automáticamente cree un plan de implementación basado en esas historias
3. ✅ Automáticamente guíe paso a paso siguiendo el plan
4. ✅ Automáticamente evite errores documentados

---

## 🔄 CÓMO FUNCIONA (SIMPLIFICADO)

### **Paso 1: Detección Automática** 🔍

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

### **Paso 2: Usar el Plan Automático** 📚

**El agente DEBE usar el plan que el add-on ya obtuvo:**

```typescript
// Obtener AutorunHub
import { getAutorunHub } from '@autorun/core';
const hub = getAutorunHub();
const preCheckAddon = hub?.getAddon('pre-implementation-check');

// Obtener plan (el add-on ya lo obtuvo automáticamente)
let plan = preCheckAddon?.getStoryBasedPlan(componentName);

// Si no existe, obtenerlo automáticamente
if (!plan) {
  const componentId = mapComponentNameToStorybookId(componentName);
  plan = await preCheckAddon?.getOrCreateStoryBasedPlan(componentName, componentId);
}

// Mostrar plan al usuario
if (plan) {
  console.log(`\n📚 Plan de implementación basado en historias:`);
  console.log(`   Componente: ${plan.componentName}`);
  console.log(`   Total de historias: ${plan.totalSteps}`);
  console.log(`   Tiempo estimado: ${plan.estimatedTotalTime}`);
  console.log(`\n📋 Historias a implementar:`);
  plan.storySteps.forEach((step, index) => {
    console.log(`   ${index + 1}. ${step.story.name} (${step.checklist.items.length} items)`);
  });
  // Pedir aprobación antes de continuar
}
```

---

### **Paso 3: Implementar UNA Historia a la Vez** 🛠️

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
  // 1. Consultar historia en Storybook (guardar URL, navegar, revisar, volver)
  // 2. Entender la funcionalidad
  // 3. Implementar SOLO esa funcionalidad
  // 4. Probar que funciona
  
  // Verificar que TODO esté completo antes de continuar
  if (!step.checklist.allCompleted) {
    throw new Error(`⚠️ Checklist incompleto para "${step.story.name}"`);
  }
  
  console.log(`✅ "${step.story.name}" completada. Continuando...`);
}
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

## 📚 ARCHIVOS CLAVE

### Guías
- **`docs/guias/implementacion/GUIA-IMPLEMENTACION-AUTOMATICA-POR-HISTORIAS.md`** - ⚠️ **OBLIGATORIO** - Guía completa del proceso automático
- **`docs/guias/implementacion/GUIA-IMPLEMENTACION-POR-HISTORIAS-STORYBOOK.md`** - Guía detallada del proceso

### Reglas
- **`.cursor/rules/06-implementacion-automatica.md`** - Proceso automático completo
- **`.cursorrules`** - Reglas principales (sección "USAR PRE-IMPLEMENTATION CHECK ADD-ON")

### Código
- **`packages/addons/functional/pre-implementation-check/src/PreImplementationCheckAddon.ts`** - Add-on que obtiene el plan automáticamente
- **`packages/autorun-core/src/helpers/storyBasedImplementation.ts`** - Sistema de plan basado en historias
- **`packages/autorun-core/src/helpers/componentHelpers.ts`** - Helpers para obtener el plan

---

## ✅ BENEFICIOS

1. **Automatización:** El add-on obtiene el plan automáticamente
2. **Consistencia:** Todas las implementaciones siguen el mismo proceso
3. **Calidad:** Uso de historias específicas evita errores
4. **Velocidad:** Proceso automatizado reduce tiempo
5. **Precisión:** Props y tokens exactos de Storybook
6. **Simplicidad:** El agente solo necesita usar el plan, no crearlo

---

**Última actualización:** 2025-12-10
