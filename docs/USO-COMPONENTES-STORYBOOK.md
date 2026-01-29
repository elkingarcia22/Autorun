# Uso: Cargar Componentes desde URL de Storybook

## 🎯 Objetivo

Cargar componentes AUTORUN desde una URL pública de Storybook (Vercel) sin necesidad del repositorio, evitando duplicados.

---

## ✅ Características

- ✅ **Carga dinámica** desde URLs públicas
- ✅ **Sin duplicados** - Los componentes locales no se inicializan si ya están cargados desde Storybook
- ✅ **Evita CSS duplicado** - Los estilos solo se cargan una vez
- ✅ **Evita JS duplicado** - Los scripts solo se cargan una vez
- ✅ **API global** - Disponible en `window.AUTORUN.Components`

---

## 🚀 Uso Básico

### **1. Inicializar el Sistema (Automático)**

El sistema se inicializa automáticamente cuando se importa `@autorun/core`:

```typescript
import '@autorun/core'; // Auto-inicializa window.AUTORUN.Components
```

### **2. Cargar Componente desde Storybook**

```javascript
// Cargar un componente desde Storybook
await window.AUTORUN.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.vercel.app/components/button/manifest.json'
});
```

### **3. Usar el Componente**

Una vez cargado, el componente está disponible inmediatamente:

```javascript
// Usar el componente
const button = window.AUTORUN.Button.create({
  variant: 'primary',
  size: 'md',
  children: 'Click me'
});
document.body.appendChild(button);
```

---

## 📋 Estructura Requerida en Storybook

Para que funcione, el Storybook debe tener esta estructura:

```
https://storybook.vercel.app/
├── components/
│   ├── button/
│   │   ├── manifest.json
│   │   ├── button.js
│   │   └── button.css
│   ├── alert/
│   │   ├── manifest.json
│   │   ├── alert.js
│   │   └── alert.css
│   ├── welcome/
│   │   ├── manifest.json
│   │   ├── welcome.js
│   │   └── welcome.css
│   └── button-feedback/
│       ├── manifest.json
│       ├── button-feedback.js
│       └── button-feedback.css
```

### **Ejemplo de manifest.json**

```json
{
  "name": "@autorun/button",
  "version": "1.0.0",
  "type": "component",
  "components": [
    {
      "name": "autorun-button",
      "tag": "autorun-button",
      "path": "./button.js"
    }
  ],
  "styles": ["./button.css"],
  "dependencies": {
    "@autorun/core": "^1.0.0"
  }
}
```

---

## 🔧 Integración con Feedback Add-on

El add-on de Feedback puede cargar automáticamente componentes desde Storybook:

```typescript
const hub = new AutorunHub();
await hub.activateAddon('feedback', {
  webhookUrl: 'https://n8n.example.com/webhook',
  storybookUrl: 'https://storybook.vercel.app',
  useStorybookComponents: true, // ✅ Cargar desde Storybook
  showWelcome: true,
  showFeedbackButton: true
});
```

**Flujo:**
1. Feedback add-on detecta `storybookUrl` y `useStorybookComponents: true`
2. Carga automáticamente: `welcome`, `button-feedback`, `alert`, `mask`
3. Los componentes locales NO se inicializan (evita duplicados)
4. Usa solo los componentes del Storybook

---

## 📝 API Completa

### **Cargar Componente**

```javascript
await window.AUTORUN.Components.loadFromStorybook({
  manifestUrl: 'https://storybook.vercel.app/components/button/manifest.json',
  replaceExisting: false // No reemplazar si ya existe
});
```

### **Reemplazar Componente**

```javascript
await window.AUTORUN.Components.replaceComponent('@autorun/button', {
  manifestUrl: 'https://storybook.vercel.app/components/button-v2/manifest.json'
});
```

### **Verificar si está Cargado**

```javascript
const isLoaded = window.AUTORUN.Components.isLoaded('@autorun/button');
console.log('Button cargado:', isLoaded);
```

### **Obtener Componentes Cargados**

```javascript
const loaded = window.AUTORUN.Components.getLoadedComponents();
console.log('Componentes cargados:', loaded);
```

### **Obtener Información de un Componente**

```javascript
const component = window.AUTORUN.Components.getComponent('@autorun/button');
console.log('Manifest:', component.manifest);
```

### **Descargar Componente**

```javascript
await window.AUTORUN.Components.unloadComponent('@autorun/button');
```

### **Limpiar Todos**

```javascript
window.AUTORUN.Components.clear();
```

---

## 🛡️ Prevención de Duplicados

El sistema previene duplicados de varias formas:

### **1. Verificación de CSS**

```typescript
// El loader verifica si el CSS ya está cargado antes de agregarlo
if (!document.querySelector(`link[data-component-style="${url}"]`)) {
  // Solo carga si no existe
}
```

### **2. Verificación de JS**

```typescript
// El loader verifica si el JS ya está cargado antes de agregarlo
if (!document.querySelector(`script[data-component-script="${url}"]`)) {
  // Solo carga si no existe
}
```

### **3. Verificación de Componentes**

```typescript
// Los add-ons locales verifican si el componente ya está cargado desde Storybook
if (ComponentsAPI.isLoaded('@autorun/button')) {
  console.log('⏭️  Ya está cargado desde Storybook, omitiendo inicialización local');
  return;
}
```

### **4. Verificación de API Global**

```typescript
// Los add-ons locales no sobrescriben APIs existentes
if (!window.AUTORUN.Button) {
  // Solo expone si no existe (para no sobrescribir componentes del Storybook)
  window.AUTORUN.Button = { ... };
}
```

---

## 📊 Flujo Completo

```
1. Usuario configura storybookUrl y useStorybookComponents: true
   ↓
2. FeedbackService.loadComponentsFromStorybook()
   ↓
3. Para cada componente (welcome, button-feedback, alert, mask):
   - Verifica si ya está cargado (isLoaded)
   - Si no, carga manifest.json
   - Carga CSS (si no está cargado)
   - Carga JS (si no está cargado)
   ↓
4. Componentes disponibles en window.AUTORUN.*
   ↓
5. Add-ons locales verifican si ya están cargados
   - Si están cargados desde Storybook → NO se inicializan
   - Si NO están cargados → Se inicializan como fallback
```

---

## ⚠️ Notas Importantes

1. **CORS**: El Storybook debe permitir CORS desde tu dominio
2. **Manifests**: Cada componente necesita su `manifest.json`
3. **Rutas**: Las rutas en el manifest pueden ser relativas o absolutas
4. **Dependencias**: Asegúrate de que las dependencias estén disponibles
5. **Orden**: Los componentes se cargan en paralelo, pero se espera a que todos terminen

---

## 🔍 Debugging

### **Ver Componentes Cargados**

```javascript
const loaded = window.AUTORUN.Components.getLoadedComponents();
console.table(loaded.map(c => ({
  name: c.manifest.name,
  version: c.manifest.version,
  components: c.manifest.components.map(comp => comp.tag).join(', ')
})));
```

### **Verificar Carga de CSS/JS**

```javascript
// Ver CSS cargados
const styles = document.querySelectorAll('link[data-component-style]');
console.log('CSS cargados:', Array.from(styles).map(s => s.getAttribute('href')));

// Ver JS cargados
const scripts = document.querySelectorAll('script[data-component-script]');
console.log('JS cargados:', Array.from(scripts).map(s => s.getAttribute('src')));
```

---

## ✅ Conclusión

El sistema permite cargar componentes desde Storybook de forma segura, evitando duplicados y usando solo los componentes del Storybook cuando están disponibles.

**Ventajas:**
- ✅ No necesitas el repositorio
- ✅ Componentes siempre actualizados (último deploy)
- ✅ Sin duplicados
- ✅ Fallback a componentes locales si Storybook no está disponible

