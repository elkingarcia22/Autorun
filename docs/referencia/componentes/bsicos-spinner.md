# 📦 Spinner

> **Componente UBITS:** `bsicos-spinner`  
> **Categoría:** Básicos  
> **API:** `window.createSpinner()` o `<ubits-spinner>`  
> **Storybook Local:** http://localhost:6006/?path=/story/bsicos-spinner--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-spinner--default

## 🎯 Descripción

Componente Spinner/Loader UBITS para mostrar estados de carga. Soporta múltiples tamaños, variantes de color y puede mostrarse con o sin etiqueta.

**Características principales:**
- 5 tamaños: xs, sm, md, lg, xl
- 6 variantes de color: primary, secondary, success, warning, error, info
- Animación opcional
- Label opcional debajo del spinner
- Modo fullScreen opcional (centrado en toda la pantalla)
- Ideal para estados de carga, procesamiento, etc.

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/bsicos-spinner--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-spinner--default
- **Código fuente:** `vendor/ubits/packages/components/spinner/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/spinner/src/types/SpinnerOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Spinner.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `bsicos-spinner--default`  
**URL Local:** http://localhost:6006/?path=/story/bsicos-spinner--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-spinner--default

**Descripción:**
Spinner con todos los controles disponibles. Permite configurar tamaño, variante, animación, label y modo fullScreen.

**Características mostradas:**
- Tamaño configurable (xs, sm, md, lg, xl)
- Variante configurable (primary, secondary, success, warning, error, info)
- Animación configurable
- Label opcional
- Modo fullScreen opcional

**Código de ejemplo:**
```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'md',
  variant: 'primary',
  animated: true,
  label: '',
  fullScreen: false
});
```

**Opciones utilizadas en la historia Default:**
- `size`: `'md'` - Tamaño mediano
- `variant`: `'primary'` - Variante primaria
- `animated`: `true` - Animado
- `fullScreen`: `false` - No fullScreen

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el spinner |
| `size` | `string` | `'md'` | Tamaño del spinner. Opciones: `xs`, `sm`, `md`, `lg`, `xl` |
| `variant` | `string` | `'primary'` | Variante de color. Opciones: `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| `animated` | `boolean` | `true` | Si el spinner está animado |
| `label` | `string` | - | Texto a mostrar debajo del spinner (opcional) |
| `fullScreen` | `boolean` | `false` | Si el spinner debe ocupar toda la pantalla (centrado) |

---

## 🎨 Tamaños y Variantes

### Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande
- **`xl`**: Extra grande

### Variantes de Color

- **`primary`**: Color primario - default
- **`secondary`**: Color secundario
- **`success`**: Verde (éxito)
- **`warning`**: Amarillo/Naranja (advertencia)
- **`error`**: Rojo (error)
- **`info`**: Azul (información)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Spinner Básico

```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'md',
  variant: 'primary'
});
```

### Ejemplo 2: Spinner con Label

```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'md',
  variant: 'primary',
  label: 'Cargando...'
});
```

### Ejemplo 3: Spinner FullScreen

```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'lg',
  variant: 'primary',
  label: 'Cargando datos...',
  fullScreen: true
});
```

### Ejemplo 4: Spinner Success

```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'md',
  variant: 'success',
  label: 'Guardando...'
});
```

### Ejemplo 5: Spinner Error

```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'md',
  variant: 'error',
  label: 'Procesando...'
});
```

### Ejemplo 6: Spinner Pequeño

```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'sm',
  variant: 'primary'
});
```

### Ejemplo 7: Spinner Grande

```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'xl',
  variant: 'primary',
  label: 'Cargando contenido...'
});
```

### Ejemplo 8: Spinner sin Animación

```javascript
window.createSpinner({
  containerId: 'spinner-container',
  size: 'md',
  variant: 'primary',
  animated: false
});
```

### Ejemplo 9: Spinner en Botón

```javascript
// Mostrar spinner dentro de un botón durante carga
const button = document.getElementById('submit-button');
button.innerHTML = window.renderSpinner({
  size: 'sm',
  variant: 'primary'
});

// Después de cargar, restaurar botón
setTimeout(() => {
  button.innerHTML = 'Enviar';
}, 2000);
```

### Ejemplo 10: Spinner Dinámico

```javascript
function showLoading(message) {
  window.createSpinner({
    containerId: 'spinner-container',
    size: 'md',
    variant: 'primary',
    label: message || 'Cargando...',
    fullScreen: true
  });
}

function hideLoading() {
  const container = document.getElementById('spinner-container');
  if (container) {
    container.innerHTML = '';
  }
}

// Usar
showLoading('Cargando datos...');
// ... hacer operación ...
hideLoading();
```

---

## 🎨 Características Visuales

### Animación

- **Animado:** Rotación continua del spinner
- **No animado:** Spinner estático (útil para estados específicos)

### Label

- Se muestra debajo del spinner
- Tipografía según tokens UBITS
- Color según variante

### FullScreen

- Ocupa toda la pantalla cuando `fullScreen: true`
- Centrado vertical y horizontalmente
- Fondo semitransparente opcional

---

## 🚨 Errores Comunes

### Error 1: Spinner sin Contenedor
**Problema:** Crear spinner sin contenedor  
**Solución:** Siempre proporcionar `containerId`

```javascript
// ❌ Incorrecto - sin contenedor
window.createSpinner({
  size: 'md'
  // Falta containerId
});

// ✅ Correcto - con contenedor
window.createSpinner({
  containerId: 'spinner-container',
  size: 'md'
});
```

### Error 2: FullScreen sin Label
**Problema:** FullScreen sin mensaje informativo  
**Solución:** Proporcionar label cuando se usa fullScreen

```javascript
// ❌ Incorrecto - fullScreen sin label
fullScreen: true,
label: ''

// ✅ Correcto - fullScreen con label
fullScreen: true,
label: 'Cargando datos...'
```

### Error 3: No Ocultar Spinner
**Problema:** Spinner permanece visible después de cargar  
**Solución:** Ocultar spinner cuando termine la carga

```javascript
// ❌ Incorrecto - spinner no se oculta
showSpinner();
loadData(); // Spinner sigue visible

// ✅ Correcto - ocultar después de cargar
showSpinner();
loadData().then(() => {
  hideSpinner();
});
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

