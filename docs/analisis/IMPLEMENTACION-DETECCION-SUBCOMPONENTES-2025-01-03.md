# Implementación: Detección de Subcomponentes (dependsOn/internals)

**Fecha:** 2025-01-03  
**Propósito:** Implementar sistema robusto de detección de dependencias según solución propuesta

---

## 🎯 Cambios Implementados

### ✅ 1. Separación dependsOn vs internals

**Problema:** No se distinguía entre componentes que el consumidor debe componer vs componentes privados

**Solución:**
- ✅ Agregado campo `dependsOn: { required: string[]; optional: string[] }` en `ComponentAnalysis`
- ✅ Agregado campo `internals: string[]` en `ComponentAnalysis`
- ✅ Función `detectDependsOnAndInternals()` implementa 3 niveles de detección

**Archivo modificado:**
- `packages/autorun-core/src/helpers/componentInternalAnalysis.ts`

---

### ✅ 2. Nivel B: Parser del Snippet Exacto

**Implementado:**
- ✅ Detecta `window.UBITS.X.create()` → marca como `dependsOn.required`
- ✅ Detecta `<ubits-x>` → marca como `dependsOn.required`

**Ejemplo:**
```javascript
// Si el snippet contiene:
window.UBITS.Button.create({...})
// → Button se agrega a dependsOn.required
```

---

### ✅ 3. Nivel C: DOM Scan

**Implementado:**
- ✅ Detecta `data-ubits-id="🧩-ux-button"` → extrae nombre del componente
- ✅ Detecta clases `ubits-*` que no son del componente principal
- ✅ Separa en dependsOn vs internals basado en patrones conocidos

**Patrones conocidos:**
- **dependsOn:** button, input, select, checkbox, radio-button, icon, badge, avatar
- **internals:** scroll, scrollbar, overlay, mask, progress

---

### ✅ 4. Integración en autorun.apply()

**Cambios:**
- ✅ `autorun.apply()` muestra dependsOn.required y dependsOn.optional
- ✅ Instrucciones claras para que el agente consulte Storybook MCP para cada dependencia
- ✅ Metadata de dependencias incluida en watermark

**Ejemplo de output:**
```
📦 Dependencias requeridas (dependsOn.required): button, input
⚠️ CRÍTICO: Debes obtener snippets de estos componentes desde Storybook MCP ANTES de implementar
```

---

### ✅ 5. Watermark Mejorado con Metadata de Dependencias

**Cambio:**
- ✅ Watermark ahora incluye `dependsOn` e `internals` en formato JSON
- ✅ Parser actualizado para leer esta metadata

**Formato:**
```html
<!-- AUTORUN: {"components":["Modal"],"dependsOn":{"required":["button"],"optional":[]},"internals":["overlay"]} -->
```

---

## 📋 Flujo Completo

### Cuando el usuario pide "un Modal con formulario":

1. **autorun.apply() detecta:** Modal
2. **Análisis interno detecta:**
   - `dependsOn.required: ["button", "input"]` (footer buttons, form inputs)
   - `dependsOn.optional: []`
   - `internals: ["overlay", "scroll"]` (privados del Modal)
3. **autorun.apply() instruye al agente:**
   - Consultar Storybook MCP para Button
   - Consultar Storybook MCP para Input
4. **autorun.apply() genera código:**
   - Estructura principal del Modal
   - Con metadata de dependencias en watermark
5. **El agente implementa:**
   - Usa snippets exactos de Button e Input obtenidos desde Storybook MCP
   - Compone correctamente sin inventar código

---

## 🔍 Niveles de Detección

### Nivel A: Declarativo (Futuro)

**Estado:** Pendiente

**Implementación futura:**
- Agregar metadata en stories de Storybook:
```typescript
parameters: {
  ubits: {
    componentId: "⚙️-functional-modal",
    dependsOn: { 
      required: ["🧩-ux-button"], 
      optional: ["🧩-ux-input"] 
    },
    internals: ["⚙️-functional-scroll", "⚙️-functional-progress"]
  }
}
```

---

### Nivel B: Parse del Snippet (✅ Implementado)

**Detecta:**
- `window.UBITS.X.create(...)` → dependsOn.required
- `<ubits-x>` → dependsOn.required

---

### Nivel C: DOM Scan (✅ Implementado)

**Detecta:**
- `data-ubits-id="🧩-ux-button"` → dependsOn
- Clases `ubits-*` → separa en dependsOn vs internals

---

## 🎯 Resultado

**Sistema robusto de detección de dependencias:**

1. ✅ **Parser de snippets:** Detecta `window.UBITS.X.create()` y `<ubits-x>`
2. ✅ **DOM scan:** Detecta `data-ubits-id` y clases `ubits-*`
3. ✅ **Separación inteligente:** dependsOn vs internals
4. ✅ **Integración:** autorun.apply() muestra dependencias y requiere consulta MCP
5. ✅ **Watermark:** Metadata de dependencias incluida

**Cuando el usuario pide "un Modal con formulario":**
- ✅ Autorun detecta que Modal requiere Button e Input
- ✅ Instruye al agente a obtener snippets exactos
- ✅ Genera código con composición correcta (sin inventar)

---

## ⏳ Pendiente

### Nivel A: Metadata Declarativa

**Requiere:**
- Modificar stories de Storybook para incluir metadata
- Parser que lea esta metadata desde Storybook
- Integración en `analyzeComponentInternals()`

**Prioridad:** Media (los niveles B y C ya funcionan bien)

---

**Última actualización:** 2025-01-03


