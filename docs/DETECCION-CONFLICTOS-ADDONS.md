# Detección de Conflictos entre Add-ons

## 🎯 Objetivo

Sistema que detecta cuando un usuario intenta activar add-ons que se solapan (hacen lo mismo) y le indica que debe elegir solo uno.

---

## 🔍 Cómo Funciona

### **1. Grupos de Conflicto**

Se definen grupos de add-ons que se solapan. Solo se puede activar **UNO** de cada grupo:

```typescript
const CONFLICT_GROUPS = [
  {
    addons: ['jest', 'vitest'],
    reason: 'Ambos son unit testing frameworks. Hacen lo mismo.',
    recommended: 'vitest', // Recomendado
  },
  {
    addons: ['docusaurus', 'storybook'],
    reason: 'Ambos proporcionan documentación. Para prototipos, Storybook es suficiente.',
    recommended: 'storybook', // Recomendado
  },
];
```

### **2. Validación Automática**

Cuando intentas activar un add-on, el sistema:

1. ✅ Verifica si pertenece a un grupo de conflicto
2. ✅ Busca si algún add-on del mismo grupo ya está activo
3. ✅ Si hay conflicto, muestra un mensaje claro y **bloquea la activación**

---

## 📋 Add-ons que se Solapan

### **1. Jest vs Vitest** ⚠️

**Conflicto:**
- Ambos son unit testing frameworks
- Hacen exactamente lo mismo
- No se pueden usar juntos

**Recomendación:** ✅ **Vitest**
- Más rápido
- ESM nativo
- TypeScript nativo
- Compatible con Jest API

**Ejemplo de error:**
```
❌ Conflicto detectado:

   No puedes activar "jest" porque "vitest" ya está activo.

   Ambos son unit testing frameworks. Hacen lo mismo.

   Add-ons en conflicto: "jest" y "vitest"

   💡 Recomendación: Usa "vitest" (es el recomendado para este caso).

   Opciones:
   1. Desactiva "vitest" y luego activa "jest"
   2. Mantén "vitest" y no actives "jest"
```

### **2. Docusaurus vs Storybook** ⚠️

**Conflicto:**
- Ambos proporcionan documentación
- Para prototipos, Storybook es suficiente
- Docusaurus es para documentación general del proyecto

**Recomendación:** ✅ **Storybook** (para prototipos)
- Documenta componentes
- Suficiente para prototipos
- Integrado con desarrollo

**Ejemplo de error:**
```
❌ Conflicto detectado:

   No puedes activar "docusaurus" porque "storybook" ya está activo.

   Ambos proporcionan documentación. Para prototipos, Storybook es suficiente.

   Add-ons en conflicto: "docusaurus" y "storybook"

   💡 Recomendación: Usa "storybook" (es el recomendado para este caso).

   Opciones:
   1. Desactiva "storybook" y luego activa "docusaurus"
   2. Mantén "storybook" y no actives "docusaurus"
```

---

## 🚀 Uso

### **Activación Individual**

```typescript
import { AutorunHub, AddonConflictError } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

try {
  await hub.activateAddon('jest');
} catch (error) {
  if (error instanceof AddonConflictError) {
    console.error(error.message);
    // El mensaje ya incluye todas las opciones
  }
}
```

### **Activación Múltiple**

```typescript
// Si intentas activar múltiples add-ons con conflictos
const addonIds = ['jest', 'vitest', 'playwright'];

try {
  for (const id of addonIds) {
    await hub.activateAddon(id);
  }
} catch (error) {
  if (error instanceof AddonConflictError) {
    // El error muestra qué add-ons están en conflicto
    console.error(error.message);
  }
}
```

---

## 🔧 Agregar Nuevos Conflictos

Si identificas nuevos add-ons que se solapan, agrega el grupo en `AddonConflictDetector.ts`:

```typescript
export const CONFLICT_GROUPS: ConflictGroup[] = [
  // ... grupos existentes
  {
    addons: ['addon-a', 'addon-b'],
    reason: 'Ambos hacen X. No se pueden usar juntos.',
    recommended: 'addon-a', // Opcional
  },
];
```

---

## ✅ Beneficios

1. **Previene Errores:**
   - Detecta conflictos antes de activar
   - Evita problemas en runtime

2. **Mensajes Claros:**
   - Explica por qué hay conflicto
   - Sugiere qué hacer
   - Recomienda cuál usar

3. **Experiencia de Usuario:**
   - No deja que el usuario cometa errores
   - Guía hacia la solución correcta

---

## 📊 Flujo de Validación

```
Usuario intenta activar add-on
         ↓
¿Pertenece a un grupo de conflicto?
         ↓
    SÍ → ¿Hay otro add-on del grupo activo?
         ↓
    SÍ → ❌ Bloquear activación
         → Mostrar mensaje claro
         → Sugerir opciones
         ↓
    NO → ✅ Permitir activación
```

---

## 🎯 Ejemplo Completo

```typescript
import { AutorunHub, AddonConflictError } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar vitest
await hub.activateAddon('vitest'); // ✅ OK

// Intentar activar jest (conflicto)
try {
  await hub.activateAddon('jest');
} catch (error) {
  if (error instanceof AddonConflictError) {
    console.error(error.message);
    // Output:
    // ❌ Conflicto detectado:
    // 
    //    No puedes activar "jest" porque "vitest" ya está activo.
    // 
    //    Ambos son unit testing frameworks. Hacen lo mismo.
    // 
    //    Add-ons en conflicto: "jest" y "vitest"
    // 
    //    💡 Recomendación: Usa "vitest" (es el recomendado para este caso).
    // 
    //    Opciones:
    //    1. Desactiva "vitest" y luego activa "jest"
    //    2. Mantén "vitest" y no actives "jest"
    //    3. ⭐ Usa "vitest" (recomendado) en lugar de "jest"
  }
}
```

---

## 📚 Referencias

- [Análisis Add-ons Complementarios](./ANALISIS-ADDONS-COMPLEMENTARIOS.md)
- [Preset UBITS Optimizado](./PRESET-UBITS-OPTIMIZADO.md)

