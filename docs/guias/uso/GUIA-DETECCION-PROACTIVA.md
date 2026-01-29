# 🔍 Guía: Detección Proactiva Mejorada

## 🎯 Objetivo

Usar el sistema mejorado de detección proactiva para detectar componentes ANTES de escribir código.

---

## 🚀 Uso Básico

### Detectar Componentes del Mensaje

```typescript
import { detectComponentsProactively } from '@autorun/core/helpers';

const userMessage = 'Implementar DataTable con todas sus funcionalidades';
const result = detectComponentsProactively(userMessage);

if (result.detected) {
  console.log('Componentes detectados:', result.components);
  // [
  //   { name: 'DataTable', confidence: 'high', context: ['tabla', 'datos'], ... }
  // ]
  
  if (result.hasImage) {
    console.log('⚠️ Imagen detectada - Requiere análisis completo');
  }
}
```

### Obtener Checklist Contextual

```typescript
import { getContextualChecklist } from '@autorun/core/helpers';

// Checklist básico
const basicChecklist = getContextualChecklist('DataTable');

// Checklist contextual (con imagen y historias)
const contextualChecklist = getContextualChecklist('DataTable', {
  hasImage: true,
  hasStories: true,
  complexity: 'complex',
});

// Resultado incluye items específicos para DataTable con imagen
```

### Sugerir Siguiente Paso

```typescript
import { suggestNextStep } from '@autorun/core/helpers';

const nextStep = suggestNextStep('DataTable', [
  'Consultar Storybook en Vercel',
  'Consultar Storybook MCP',
], {
  hasImage: true,
  hasStories: true,
});

if (nextStep) {
  console.log(`Siguiente paso: ${nextStep.step}`);
  console.log(`Prioridad: ${nextStep.priority}`);
  console.log(`Instrucciones: ${nextStep.instructions}`);
}
```

---

## 📊 Niveles de Confianza

El sistema detecta componentes con diferentes niveles de confianza:

- **high:** Patrón claro encontrado (ej: "implementar DataTable")
- **medium:** Patrón parcial o keywords de contexto encontrados
- **low:** Solo keywords de contexto encontrados

---

## 🎯 Checklist Contextual Inteligente

El checklist contextual muestra solo items relevantes según:

1. **Componente:** Items específicos para ese componente
2. **Contexto (imagen):** Items adicionales si hay imagen
3. **Contexto (historias):** Items adicionales si hay historias de Storybook
4. **Complejidad:** Items adicionales para componentes complejos

**Ejemplo:**
- DataTable simple: 3 items básicos
- DataTable con imagen: +3 items (análisis de imagen, spacing, iconos)
- DataTable complejo con historias: +2 items (plan de historias, implementación paso a paso)

---

## 💡 Integración con Pre-Implementation Check

El Pre-Implementation Check add-on usa automáticamente la detección proactiva:

```typescript
// El add-on detecta automáticamente cuando escribes código
const hub = getAutorunHub();
const preCheckAddon = hub.getAddon('pre-implementation-check');

// Obtener checklist contextual
const checklist = await preCheckAddon.getContextualChecklist('DataTable', {
  hasImage: true,
  hasStories: true,
});

// Sugerir siguiente paso
const nextStep = await preCheckAddon.suggestNextStep('DataTable', completedSteps, {
  hasImage: true,
});
```

---

## 🔍 Patrones de Detección

El sistema detecta componentes usando:

1. **Patrones de texto:** "implementar DataTable", "crear tabla", etc.
2. **Keywords de contexto:** "tabla", "datos", "columnas", "filas"
3. **Confianza combinada:** Alta si hay patrón + keywords

---

**Última actualización:** 2025-01-03




