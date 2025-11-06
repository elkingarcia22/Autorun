# Guía: Cambiar Componentes desde Storybook

## 🎯 Objetivo

Cargar y cambiar componentes desde Storybook (o cualquier otra fuente) y aplicarlos automáticamente, similar a como funciona con tokens.

## ✅ Respuesta Rápida

**SÍ, ahora puedes cambiar componentes desde Storybook.** El sistema permite cargar componentes completos desde Storybook y reemplazar los existentes sin modificar código.

---

## 🚀 Cómo Funciona

### **Principio Clave**

Los componentes son add-ons intercambiables. Cuando cargas un componente desde Storybook:
1. Se carga el manifest del componente
2. Se cargan los estilos CSS
3. Se carga el código JavaScript
4. Se registra el componente
5. **El componente está disponible inmediatamente para usar**

---

## 📝 Ejemplos de Uso

### **Ejemplo 1: Desde URL de Manifest de Storybook (Más Fácil)**

```javascript
// En la consola del navegador o en tu código
await window.UBITS.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.tu-empresa.com/button/manifest.json'
});

// ¡Listo! El componente Button ahora está disponible
// Puedes usarlo: <ubits-button>Click me</ubits-button>
```

### **Ejemplo 2: Función Helper Global**

```javascript
// Función helper disponible globalmente
await cambiarComponenteDesdeStorybook('https://storybook.tu-empresa.com/button/manifest.json');
```

### **Ejemplo 3: Desde Manifest JSON Directo**

```javascript
await window.UBITS.Components.loadFromStorybook({
  manifest: {
    name: '@ubits/button',
    version: '2.0.0',
    type: 'component',
    components: [{
      name: 'ubits-button',
      tag: 'ubits-button',
      path: 'https://storybook.tu-empresa.com/button/button.js'
    }],
    styles: ['https://storybook.tu-empresa.com/button/button.css']
  }
});
```

### **Ejemplo 4: Reemplazar Componente Existente**

```javascript
// Reemplazar el Button actual con uno de Storybook
await window.UBITS.Components.replaceComponent(
  '@ubits/button',
  {
    manifestUrl: 'https://storybook.tu-empresa.com/button-v2/manifest.json'
  }
);

// El componente anterior se destruye y se carga el nuevo
```

---

## 🎨 Flujo Completo

### **Paso 1: Obtener Manifest de Storybook**

El manifest debe tener este formato:

```json
{
  "name": "@ubits/button",
  "version": "2.0.0",
  "type": "component",
  "components": [
    {
      "name": "ubits-button",
      "tag": "ubits-button",
      "path": "./button.js"
    }
  ],
  "styles": ["./button.css"],
  "dependencies": {
    "@ubits/tokens": "^1.0.0"
  }
}
```

### **Paso 2: Cargar Componente**

```javascript
// Método 1: Usando API global (más fácil)
await window.UBITS.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.tu-empresa.com/button/manifest.json'
});

// Método 2: Usando función helper
await cambiarComponenteDesdeStorybook('https://storybook.tu-empresa.com/button/manifest.json');

// Método 3: Desde código TypeScript
import { loadComponentFromStorybook } from '@ubits/tokens-ubits';
await loadComponentFromStorybook({
  manifestUrl: 'https://storybook.tu-empresa.com/button/manifest.json'
});
```

### **Paso 3: Usar el Componente**

```html
<!-- El componente está disponible inmediatamente -->
<ubits-button variant="primary" size="md">
  Click me
</ubits-button>
```

---

## 🔄 ¿Qué Pasa con los Componentes Existentes?

### **Reemplazo Automático**

Cuando cargas un componente desde Storybook:

1. ✅ Si el componente ya existe, se destruye el anterior
2. ✅ Se carga el nuevo componente
3. ✅ Se registra el nuevo componente
4. ✅ Los elementos HTML existentes se actualizan automáticamente (si son Web Components)

**Ejemplo:**

```javascript
// Componente actual
<ubits-button>Original</ubits-button>

// Cargar nuevo componente desde Storybook
await window.UBITS.Components.replaceComponent('@ubits/button', {
  manifestUrl: 'https://storybook.tu-empresa.com/button-v2/manifest.json'
});

// El <ubits-button> existente ahora usa el nuevo componente
```

---

## 📋 Checklist: Componentes desde Storybook

Para que funcione correctamente, el manifest de Storybook debe:

- [ ] Tener formato JSON válido
- [ ] Incluir `name`, `version`, `type: "component"`
- [ ] Tener `components` con `name`, `tag`, `path`
- [ ] Incluir `styles` con rutas a CSS
- [ ] El JS debe exportar una clase que implemente `ComponentAddon`
- [ ] Ser accesible desde la URL (CORS permitido)

### **Estructura del Manifest**

```json
{
  "name": "@ubits/button",
  "version": "2.0.0",
  "type": "component",
  "components": [
    {
      "name": "ubits-button",
      "tag": "ubits-button",
      "path": "./button.js"
    }
  ],
  "styles": ["./button.css"],
  "dependencies": {
    "@ubits/tokens": "^1.0.0"
  }
}
```

---

## 🎯 Casos de Uso

### **Caso 1: "Carga este componente de Storybook"**

```javascript
// Copiar URL de manifest de Storybook
const storybookUrl = 'https://storybook.tu-empresa.com/button/manifest.json';

// Cargar
await window.UBITS.Components.loadFromStorybook({
  manifestUrl: storybookUrl
});

// Verificar
const loaded = window.UBITS.Components.getLoadedComponents();
console.log('✅ Componentes cargados:', loaded);
```

### **Caso 2: "Reemplaza el Button con esta versión"**

```javascript
// Reemplazar componente existente
await window.UBITS.Components.replaceComponent(
  '@ubits/button',
  {
    manifestUrl: 'https://storybook.tu-empresa.com/button-v2/manifest.json'
  }
);
```

### **Caso 3: "Carga múltiples componentes"**

```javascript
// Cargar varios componentes a la vez
await window.UBITS.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.tu-empresa.com/button/manifest.json'
});

await window.UBITS.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.tu-empresa.com/alert/manifest.json'
});

await window.UBITS.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.tu-empresa.com/input/manifest.json'
});
```

---

## 🔍 Debugging

### **Ver qué componentes están cargados**

```javascript
const loaded = window.UBITS.Components.getLoadedComponents();
console.log('Componentes cargados:', loaded);

// Resultado:
// [
//   {
//     name: '@ubits/button',
//     version: '2.0.0',
//     components: [{ name: 'ubits-button', tag: 'ubits-button' }]
//   }
// ]
```

### **Verificar si un componente está cargado**

```javascript
const isLoaded = window.UBITS.Components.isLoaded('@ubits/button');
console.log('Button cargado:', isLoaded);
```

### **Obtener manager para más detalles**

```javascript
const manager = window.UBITS.Components.getManager();
const loaded = manager.getLoadedComponents();
console.log('Todos los componentes:', loaded);
```

---

## ⚠️ Notas Importantes

1. **El componente debe implementar ComponentAddon**
   - Debe tener `initialize()`, `destroy()`, `getComponents()`, `getStyles()`

2. **Los estilos se cargan automáticamente**
   - No necesitas cargar CSS manualmente
   - Se evitan duplicados automáticamente

3. **Los Web Components se registran automáticamente**
   - Si el componente es un Web Component, se registra con `customElements.define()`

4. **Reemplazo seguro**
   - El componente anterior se destruye antes de cargar el nuevo
   - No hay conflictos de nombres

5. **Dependencias**
   - Asegúrate de que las dependencias (tokens, etc.) estén cargadas primero

---

## 🔄 Comparación: Tokens vs Componentes

| Característica | Tokens | Componentes |
|---------------|--------|-------------|
| **Carga desde Storybook** | ✅ Sí | ✅ Sí |
| **Reemplazo automático** | ✅ Sí | ✅ Sí |
| **API Global** | `window.UBITS.Tokens` | `window.UBITS.Components` |
| **Función Helper** | `cambiarTokensDesdeStorybook()` | `cambiarComponenteDesdeStorybook()` |
| **Formato** | CSS/JSON | Manifest JSON |
| **Afecta** | Todos los componentes | Componente específico |

---

## ✅ Conclusión

**SÍ, puedes cambiar componentes desde Storybook y aplicarlos automáticamente.**

El sistema:
- ✅ Carga componentes desde Storybook
- ✅ Reemplaza componentes existentes
- ✅ Registra componentes automáticamente
- ✅ Carga estilos automáticamente
- ✅ Funciona con Web Components
- ✅ API global disponible

**Todo funciona automáticamente cuando cargas el manifest desde Storybook.**

---

## 📚 Ejemplo Completo

```javascript
// 1. Cargar tokens desde Storybook (opcional)
await window.UBITS.Tokens.applyFromSource({
  cssUrl: 'https://storybook.tu-empresa.com/tokens.css'
});

// 2. Cargar componentes desde Storybook
await window.UBITS.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.tu-empresa.com/button/manifest.json'
});

await window.UBITS.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.tu-empresa.com/alert/manifest.json'
});

// 3. Usar los componentes
document.body.innerHTML = `
  <ubits-button variant="primary">Click me</ubits-button>
  <ubits-alert type="success">Mensaje</ubits-alert>
`;

// 4. Verificar
const loaded = window.UBITS.Components.getLoadedComponents();
console.log('Componentes cargados:', loaded);
```

