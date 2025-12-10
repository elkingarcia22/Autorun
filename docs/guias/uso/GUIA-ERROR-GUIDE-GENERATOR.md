# 📚 Guía: Generador Automático de Guías de Errores

## 🎯 Objetivo

Usar el Error Guide Generator para generar y actualizar automáticamente guías de errores desde Problem Tracker.

---

## 🚀 Uso Básico

### Generar Guía de Errores Automáticamente

```typescript
import { getAutorunHub } from '@autorun/core';

const hub = getAutorunHub();
const problemTracker = hub.getAddon('problem-tracker');

// Generar guía de errores desde Problem Tracker
const guidePath = await problemTracker.service.generateErrorGuide();
console.log(`✅ Guía generada: ${guidePath}`);
```

### Sugerir Soluciones desde Historial

```typescript
// Sugerir soluciones basadas en problemas similares anteriores
const suggestions = await problemTracker.service.suggestSolutionsFromHistory(
  'ContentManager elimina elementos personalizados',
  'ContentManager'
);

console.log('Problemas similares encontrados:', suggestions.similarProblems);
console.log('Soluciones sugeridas:', suggestions.suggestedSolutions);
```

---

## ⚙️ Configuración

Para activar la generación automática de guías:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "problem-tracker": {
          "autoUpdateGuides": true
        }
      }
    }
  }
}
```

---

## 📊 Formato de Guía Generada

La guía generada incluye:

1. **Índice** por categoría
2. **Cada error con:**
   - ID y título
   - Categoría y severidad
   - Descripción
   - Solución
   - Ejemplos (incorrecto vs correcto)
   - Problemas relacionados
   - Ocurrencias y última fecha

---

## 🔄 Actualización Automática

Cuando `autoUpdateGuides: true`:
- Se genera automáticamente después de registrar problemas
- Se actualiza `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- Se mantiene sincronizado con Problem Tracker

---

**Última actualización:** 2025-01-03
