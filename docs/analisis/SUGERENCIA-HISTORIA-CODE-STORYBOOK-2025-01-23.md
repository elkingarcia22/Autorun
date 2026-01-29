# 💡 Sugerencia: Historia "code" en Storybook

**Fecha:** 2025-01-23  
**Sugerencia del usuario:** Crear historia "code" que muestre todo el código sin botones

---

## 📋 Problema Actual

### **Situación:**
- El código está visible en Docs pero requiere hacer clic en botones "Show code"
- La extracción no puede acceder al código fácilmente
- El código se carga dinámicamente con JavaScript

### **Solución Propuesta:**

Crear una historia específica llamada **"code"** en Storybook que:
- ✅ Muestre todo el código directamente
- ✅ Sin botones "Show code" / "Hide code"
- ✅ Código visible de primer pantallazo
- ✅ Más fácil de extraer con `fetch()` o Browser MCP

---

## 🔧 Implementación Sugerida

### **1. Crear Historia "code" en .stories.ts**

**Archivo:** `vendor/ubits/packages/storybook/stories/RadioButton.stories.ts`

```typescript
export const Code = {
  name: 'Code',
  parameters: {
    docs: {
      description: {
        component: 'Código completo de implementación del componente'
      }
    }
  },
  render: () => {
    return html`
      <div style="padding: 20px;">
        <h2>Código de Implementación</h2>
        
        <h3>JavaScript</h3>
        <pre><code>
// 1. Crear contenedor HTML
&lt;div id="radiobutton-implementation-container"&gt;&lt;/div&gt;

// 2. Crear radio button
window.UBITS.RadioButton.create({
  containerId: 'radiobutton-implementation-container',
  label: 'Opción 1',
  value: 'option1',
  name: 'tipo',
  checked: false,
  size: 'md',
  state: 'default',
  disabled: false
});
        </code></pre>

        <h3>HTML</h3>
        <pre><code>
&lt;div id="radiobutton-implementation-container"&gt;&lt;/div&gt;
        </code></pre>
      </div>
    `;
  }
};
```

### **2. Ventajas de la Historia "code"**

1. ✅ **Código siempre visible** - No requiere clics
2. ✅ **Más fácil de extraer** - `fetch()` puede obtenerlo directamente
3. ✅ **Consistente** - Mismo formato para todos los componentes
4. ✅ **Sin dependencias dinámicas** - Código estático en HTML
5. ✅ **No requiere Browser MCP** - En la mayoría de casos

### **3. Modificar Extracción para Priorizar "code"**

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

```typescript
// Buscar historia "code" primero
let storyName = 'default';
try {
  // 1. Buscar "code" primero
  const codeStory = await findStory('code', componentId);
  if (codeStory) {
    storyName = 'code';
    console.log('   ✅ Historia "code" encontrada');
  } else {
    // 2. Buscar "implementation" como fallback
    storyName = await findImplementationStory(componentId);
  }
} catch (error) {
  storyName = 'default';
}
```

---

## 📊 Comparación

### **Antes (Docs con botones):**
- ❌ Código oculto por defecto
- ❌ Requiere hacer clic en "Show code"
- ❌ Carga dinámica con JavaScript
- ❌ Difícil de extraer con `fetch()`
- ⚠️ Requiere Browser MCP

### **Después (Historia "code"):**
- ✅ Código siempre visible
- ✅ Sin botones necesarios
- ✅ Código estático en HTML
- ✅ Fácil de extraer con `fetch()`
- ✅ No requiere Browser MCP (en la mayoría de casos)

---

## 🔧 Implementación en Storybook

### **Paso 1: Agregar Historia "code" a cada componente**

```typescript
// En cada archivo .stories.ts
export const Code = {
  name: 'Code',
  render: () => {
    // Mostrar código completo directamente
    return html`...`;
  }
};
```

### **Paso 2: Modificar Extracción para Priorizar "code"**

```typescript
// Buscar "code" antes que "implementation"
const storyPriority = ['code', 'implementation', 'default'];
```

### **Paso 3: Actualizar Documentación**

Documentar que la historia "code" es la fuente preferida para extracción automática.

---

## ✅ Resultado Esperado

1. ✅ Historia "code" creada en todos los componentes
2. ✅ Extracción prioriza "code" sobre "implementation"
3. ✅ Código extraído correctamente sin Browser MCP
4. ✅ Implementación más rápida y confiable

---

## 📋 Próximos Pasos

1. ⏳ Crear historia "code" en RadioButton como prueba
2. ⏳ Modificar extracción para priorizar "code"
3. ⏳ Probar extracción con historia "code"
4. ⏳ Extender a todos los componentes si funciona

