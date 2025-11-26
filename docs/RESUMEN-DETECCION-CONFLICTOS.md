# Resumen: Sistema de Detección de Conflictos entre Add-ons

## ✅ Implementación Completada

Se ha implementado un sistema completo que detecta cuando un usuario intenta activar add-ons que se solapan y le indica claramente que debe elegir solo uno.

---

## 🎯 Funcionalidades

### **1. Detección Automática de Conflictos**

- ✅ Detecta cuando intentas activar add-ons que se solapan
- ✅ Valida antes de activar (previene errores)
- ✅ Funciona tanto para activación individual como múltiple

### **2. Mensajes Claros para el Usuario**

- ✅ Explica por qué hay conflicto
- ✅ Muestra qué add-ons están en conflicto
- ✅ Sugiere qué hacer (opciones claras)
- ✅ Recomienda cuál usar (si hay uno recomendado)

### **3. Grupos de Conflicto Definidos**

Actualmente detecta estos conflictos:

1. **Jest vs Vitest** ⚠️
   - Ambos son unit testing frameworks
   - Recomendación: Vitest

2. **Docusaurus vs Storybook** ⚠️
   - Ambos proporcionan documentación
   - Recomendación: Storybook (para prototipos)

---

## 📋 Archivos Creados/Modificados

### **Nuevos Archivos:**

1. **`AddonConflictDetector.ts`**
   - Define grupos de conflictos
   - Detecta conflictos
   - Genera mensajes de error claros

2. **`DETECCION-CONFLICTOS-ADDONS.md`**
   - Documentación completa del sistema
   - Ejemplos de uso
   - Guía para agregar nuevos conflictos

### **Archivos Modificados:**

1. **`AutorunHub.ts`**
   - Integra detección de conflictos en `activateAddon()`
   - Valida conflictos en `loadAddons()`
   - Lanza errores claros cuando hay conflictos

2. **`index.ts`**
   - Exporta `AddonConflictDetector` y `AddonConflictError`

---

## 🚀 Cómo Funciona

### **Ejemplo 1: Activación Individual**

```typescript
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
    // Muestra mensaje claro con opciones
  }
}
```

### **Ejemplo 2: Activación Múltiple**

```typescript
// Si intentas activar múltiples add-ons con conflictos
const addonIds = ['jest', 'vitest'];

try {
  for (const id of addonIds) {
    await hub.activateAddon(id);
  }
} catch (error) {
  // Detecta el conflicto y muestra mensaje claro
}
```

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

## 🔧 Agregar Nuevos Conflictos

Para agregar nuevos conflictos, edita `AddonConflictDetector.ts`:

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

2. **Experiencia de Usuario:**
   - Mensajes claros y útiles
   - Guía hacia la solución correcta
   - No deja que el usuario cometa errores

3. **Mantenibilidad:**
   - Fácil agregar nuevos conflictos
   - Centralizado en un solo lugar
   - Documentado y testeable

---

## 🎯 Resultado Final

El sistema ahora:

- ✅ **Detecta automáticamente** conflictos entre add-ons
- ✅ **Bloquea la activación** si hay conflicto
- ✅ **Muestra mensajes claros** con opciones
- ✅ **Recomienda** cuál usar cuando aplica
- ✅ **Funciona** para activación individual y múltiple

**El usuario ya no puede activar add-ons que se solapan sin saberlo.**

