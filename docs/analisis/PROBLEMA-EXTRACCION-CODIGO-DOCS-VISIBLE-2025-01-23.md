# 🔍 Problema: Código Visible en Docs pero No Extraído

**Fecha:** 2025-01-23  
**Problema:** El código está visible en Storybook Docs pero la extracción no lo encuentra en el snapshot  
**Sugerencia del usuario:** Crear historia "code" que muestre todo el código sin botones

---

## 📋 Resumen del Problema

### **Síntomas:**
- ✅ El código SÍ existe en Docs y está visible
- ❌ La extracción no puede acceder al código
- ⚠️ El código está en bloques con botones "Show code" / "Hide code"
- ⚠️ Requiere hacer clic en botones para ver el código completo

### **Causa Raíz:**

**1. Código Cargado Dinámicamente**
- El código se carga con JavaScript después de que la página se renderiza
- El snapshot puede capturar el código, pero la función de extracción no lo encuentra correctamente

**2. Estructura del Snapshot**
- El código puede estar en diferentes campos: `text`, `value`, `name`, `description`
- La función actual solo busca en campos específicos

**3. Patrones de Búsqueda Insuficientes**
- Los patrones de búsqueda no capturan todos los formatos posibles
- No busca en todos los campos del snapshot

---

## ✅ Solución Implementada

### **1. Mejorar Extracción del Snapshot**

**Archivo:** `packages/autorun-core/src/helpers/extractCodeFromDocsSnapshot.ts`

**Mejoras:**
- ✅ Buscar en todos los campos posibles: `text`, `value`, `name`, `description`, `label`
- ✅ Patrones de búsqueda más amplios y específicos
- ✅ Priorización mejorada: implementation > complete > containerId > longest
- ✅ Verificación de bloques de código completos (no solo fragmentos)

**Código:**
```typescript
// ⚠️ MEJORADO: Buscar en todos los campos posibles
const allText = [
  node.text,
  node.value,
  node.name,
  (node as any).description,
  (node as any).label,
]
  .filter(Boolean)
  .join(' ');

// ⚠️ MEJORADO: Patrones más amplios
const codePatterns = [
  /window\.UBITS\.\w+\.create/,
  /window\.create\w+/,
  /containerId\s*:/,
  /label\s*:/,
  /value\s*:/,
  /name\s*:/,
  /checked\s*:/,
  /size\s*:/,
  /state\s*:/,
  /disabled\s*:/,
  /onChange\s*:/,
  /RadioButton/,
  /createRadioButton/,
];
```

### **2. Priorización Mejorada**

**Antes:**
```typescript
const bestCode = implementationCode || codeBlocks[0];
```

**Después:**
```typescript
// Priorizar: implementation > complete > containerId > longest
const bestCode =
  implementationCode ||
  completeCode ||
  containerIdCode ||
  longestCode ||
  codeBlocks[0];
```

---

## 💡 Sugerencia del Usuario: Historia "code"

El usuario sugiere crear una historia específica llamada "code" en Storybook que:
- ✅ Muestre todo el código directamente
- ✅ Sin botones "Show code" / "Hide code"
- ✅ Código visible de primer pantallazo
- ✅ Más fácil de extraer

**Ventajas:**
1. ✅ Código siempre visible (no requiere clics)
2. ✅ Más fácil de extraer con `fetch()`
3. ✅ No requiere Browser MCP en la mayoría de casos
4. ✅ Consistente para todos los componentes

**Implementación sugerida:**
```typescript
// En el archivo .stories.ts del componente
export const Code = {
  name: 'Code',
  render: () => {
    // Mostrar código directamente sin interactividad
    return `
      <div>
        <h3>Código de Implementación</h3>
        <pre><code>
window.UBITS.RadioButton.create({
  containerId: 'radio-container',
  label: 'Opción 1',
  value: 'option1',
  name: 'tipo',
  checked: false,
  size: 'md',
  state: 'default',
  disabled: false
});
        </code></pre>
      </div>
    `;
  }
};
```

---

## 🔧 Próximos Pasos

1. ✅ **Mejorar extracción del snapshot** - Implementado
2. ⏳ **Probar extracción mejorada** - Pendiente
3. ⏳ **Considerar crear historia "code"** - Pendiente (requiere cambios en Storybook)

---

## 📊 Estado

- ✅ Función de extracción mejorada
- ⏳ Pendiente: Probar con RadioButton
- ⏳ Pendiente: Evaluar crear historia "code" en Storybook

