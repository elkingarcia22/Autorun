# Implementación: Nivel A - Metadata Declarativa en Stories

**Fecha:** 2025-01-03  
**Propósito:** Implementar parser de metadata declarativa desde stories de Storybook

---

## 🎯 Cambios Implementados

### ✅ 1. Nuevo Helper: storybookMetadataExtractor.ts

**Funcionalidad:**
- ✅ Extrae metadata desde `parameters.ubits` en stories
- ✅ Parsea `dependsOn.required`, `dependsOn.optional`, e `internals`
- ✅ Normaliza IDs de componentes (remueve emojis y prefijos)

**Formato esperado en stories:**
```typescript
export default {
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
}
```

**Archivo creado:**
- `packages/autorun-core/src/helpers/storybookMetadataExtractor.ts`

---

### ✅ 2. Integración en componentInternalAnalysis.ts

**Cambios:**
- ✅ `analyzeComponentInternals()` ahora intenta extraer metadata declarativa PRIMERO
- ✅ Si encuentra metadata declarativa, la usa directamente (tiene prioridad sobre Niveles B y C)
- ✅ Si no encuentra metadata, continúa con Niveles B y C como fallback

**Flujo:**
```
1. Intentar Nivel A (metadata declarativa)
   ↓
2. Si existe → Usar directamente (prioridad)
   ↓
3. Si no existe → Continuar con Niveles B y C
```

---

## 📋 Niveles de Detección (Completos)

### ✅ Nivel A: Metadata Declarativa (IMPLEMENTADO)

**Estado:** ✅ Completado

**Cómo funciona:**
1. Extrae código fuente de la story
2. Busca `parameters.ubits` en el código
3. Parsea `dependsOn` e `internals`
4. Normaliza IDs de componentes

**Ventajas:**
- ✅ Más preciso (declarado explícitamente)
- ✅ Prioridad sobre otros niveles
- ✅ No requiere parsear HTML/DOM

**Desventajas:**
- ⚠️ Requiere que las stories tengan esta metadata
- ⚠️ Depende de que los desarrolladores la agreguen

---

### ✅ Nivel B: Parser del Snippet (YA IMPLEMENTADO)

**Detecta:**
- `window.UBITS.X.create()` → dependsOn.required
- `<ubits-x>` → dependsOn.required

---

### ✅ Nivel C: DOM Scan (YA IMPLEMENTADO)

**Detecta:**
- `data-ubits-id="🧩-ux-button"` → dependsOn
- Clases `ubits-*` → separa en dependsOn vs internals

---

## 🎯 Resultado

**Sistema completo de 3 niveles:**

1. ✅ **Nivel A:** Metadata declarativa (prioridad, más preciso)
2. ✅ **Nivel B:** Parser de snippets (detecta `window.UBITS.X.create()`)
3. ✅ **Nivel C:** DOM scan (detecta clases y atributos)

**Flujo completo:**
```
Usuario pide: "implementa un Modal con formulario"
   ↓
autorun.apply() detecta: Modal
   ↓
analyzeComponentInternals() intenta Nivel A:
   - Busca metadata en parameters.ubits
   - Si existe → Usa directamente
   ↓
Si no existe, intenta Niveles B y C:
   - Parsea snippets (window.UBITS.Button.create)
   - Escanea DOM (ubits-button, ubits-input)
   ↓
Resultado: dependsOn.required: ["button", "input"]
```

---

## 📝 Ejemplo de Uso

### En una story de Storybook:

```typescript
// Modal.stories.tsx
export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    ubits: {
      componentId: "⚙️-functional-modal",
      dependsOn: {
        required: ["🧩-ux-button"], // Botones del footer
        optional: ["🧩-ux-input", "🧩-ux-textarea"] // Inputs opcionales
      },
      internals: ["⚙️-functional-scroll", "⚙️-functional-overlay"] // Privados
    }
  }
} as Meta<typeof Modal>;
```

### Resultado en autorun.apply():

```
📋 [Nivel A] Metadata declarativa encontrada en story
✅ [Nivel A] Usando metadata declarativa: 1 requeridos, 2 opcionales, 2 internos
📦 Dependencias requeridas (dependsOn.required): button
📦 Dependencias opcionales (dependsOn.optional): input, textarea
🔒 Componentes internos (privados): scroll, overlay
```

---

## ⚠️ Notas Importantes

### Para Desarrolladores de Stories:

**Agregar metadata a stories:**
1. Abrir el archivo `.stories.tsx` del componente
2. Agregar `parameters.ubits` con `dependsOn` e `internals`
3. Commit y push

**Beneficios:**
- ✅ Detección más precisa de dependencias
- ✅ Menos falsos positivos
- ✅ Mejor experiencia para el agente

---

## 🔄 Compatibilidad

**Backward Compatible:**
- ✅ Si una story NO tiene metadata, usa Niveles B y C
- ✅ Si una story tiene metadata parcial, completa con Niveles B y C
- ✅ No rompe stories existentes sin metadata

---

**Última actualización:** 2025-01-03
