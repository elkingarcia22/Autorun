# 📦 Badge

> **Componente UBITS:** `bsicos-badge`  
> **Categoría:** Básicos  
> **API:** `window.createBadge()` o `<ubits-badge>`  
> **Storybook Local:** http://localhost:6006/?path=/story/bsicos-badge--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-badge--default

## 🎯 Descripción

Componente Badge UBITS para mostrar notificaciones, contadores o indicadores. Soporta solo bolita (dot) o con números, múltiples variantes de color y tamaños.

**Características principales:**
- 2 tipos: dot (bolita), number (con número)
- 4 variantes de color: success, warning, error, info
- 3 estilos: light, neutral, bold
- 4 tamaños: xs, sm, md, lg
- Posición absoluta opcional
- Label opcional con tipografía UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/bsicos-badge--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-badge--default
- **Código fuente:** `vendor/ubits/packages/components/badge/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/badge/src/types/BadgeOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Badge.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `bsicos-badge--default`  
**URL Local:** http://localhost:6006/?path=/story/bsicos-badge--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-badge--default

**Descripción:**
Badge con todos los controles disponibles. Permite configurar tipo, variante, estilo, tamaño, contenido, posición y label.

**Características mostradas:**
- Tipo configurable (dot, number)
- Variante configurable (success, warning, error, info)
- Estilo configurable (light, neutral, bold)
- Tamaño configurable (xs, sm, md, lg)
- Contenido configurable (número o texto)
- Posición absoluta opcional
- Label opcional

**Código de ejemplo:**
```javascript
window.createBadge({
  type: 'number',
  variant: 'error',
  style: 'light',
  size: 'md',
  content: '5',
  absolute: false,
  position: 'top-right',
  showLabel: false,
  label: 'Notificaciones',
  labelTypography: 'ubits-body-md-regular'
});
```

**Opciones utilizadas en la historia Default:**
- `type`: `'number'` - Tipo con número
- `variant`: `'error'` - Variante error (rojo)
- `style`: `'light'` - Estilo light
- `size`: `'md'` - Tamaño mediano
- `content`: `'5'` - Contenido del badge

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `type` | `string` | `'number'` | Tipo de badge. Opciones: `dot` (solo bolita), `number` (con número) |
| `variant` | `string` | `'error'` | Variante de color. Opciones: `success`, `warning`, `error`, `info` |
| `style` | `string` | `'light'` | Estilo del badge. Opciones: `light` (sin borde), `neutral` (con borde gris), `bold` (fondo de color) |
| `size` | `string` | `'md'` | Tamaño del badge. Opciones: `xs`, `sm`, `md`, `lg` |
| `content` | `string \| number` | - | Contenido del badge (número o texto, solo para tipo number) |
| `absolute` | `boolean` | `false` | Usar posición absoluta |
| `position` | `string` | `'top-right'` | Posición cuando es absoluto. Opciones: `top-right`, `top-left`, `bottom-right`, `bottom-left` |
| `showLabel` | `boolean` | `false` | Mostrar u ocultar el label |
| `label` | `string` | - | Texto del label que aparece a la derecha del badge |
| `labelTypography` | `string` | `'ubits-body-md-regular'` | Clase de tipografía UBITS para el label. Opciones: `ubits-body-sm-regular`, `ubits-body-sm-semibold`, `ubits-body-sm-bold`, `ubits-body-md-regular`, `ubits-body-md-semibold`, `ubits-body-md-bold`, `ubits-heading-h1`, `ubits-heading-h2` |

---

## 🎨 Tipos

### Tipo Dot (Bolita)

Solo muestra una bolita sin contenido.

```javascript
window.createBadge({
  type: 'dot',
  variant: 'error',
  size: 'md'
});
```

### Tipo Number (Con Número)

Muestra un número o texto dentro del badge.

```javascript
window.createBadge({
  type: 'number',
  variant: 'error',
  size: 'md',
  content: '5'
});
```

---

## 🎨 Variantes de Color

- **`success`**: Verde - Para indicadores positivos
- **`warning`**: Amarillo/Naranja - Para advertencias
- **`error`**: Rojo - Para errores o notificaciones importantes
- **`info`**: Azul - Para información general

---

## 🎨 Estilos

### Light

Sin borde, solo el color del contenido.

```javascript
style: 'light'
```

### Neutral

Con borde gris alrededor.

```javascript
style: 'neutral'
```

### Bold

Fondo de color sólido.

```javascript
style: 'bold'
```

---

## 🎨 Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande

---

## 📍 Posiciones (Cuando es Absoluto)

- **`top-right`**: Esquina superior derecha - default
- **`top-left`**: Esquina superior izquierda
- **`bottom-right`**: Esquina inferior derecha
- **`bottom-left`**: Esquina inferior izquierda

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Badge Básico con Número

```javascript
window.createBadge({
  type: 'number',
  variant: 'error',
  style: 'light',
  size: 'md',
  content: '5'
});
```

### Ejemplo 2: Badge Dot (Bolita)

```javascript
window.createBadge({
  type: 'dot',
  variant: 'success',
  size: 'md'
});
```

### Ejemplo 3: Badge con Label

```javascript
window.createBadge({
  type: 'number',
  variant: 'error',
  size: 'md',
  content: '12',
  showLabel: true,
  label: 'Notificaciones',
  labelTypography: 'ubits-body-md-semibold'
});
```

### Ejemplo 4: Badge Absoluto en Elemento

```javascript
// Crear elemento con badge absoluto
const container = document.createElement('div');
container.style.position = 'relative';
container.style.display = 'inline-block';
container.style.padding = '20px';
container.innerHTML = '<span>Botón</span>';

// Agregar badge absoluto
const badgeHTML = window.renderBadge({
  type: 'number',
  variant: 'error',
  size: 'sm',
  content: '3',
  absolute: true,
  position: 'top-right'
});

container.innerHTML += badgeHTML;
```

### Ejemplo 5: Badge Success

```javascript
window.createBadge({
  type: 'number',
  variant: 'success',
  style: 'bold',
  size: 'md',
  content: 'Nuevo'
});
```

### Ejemplo 6: Badge Warning

```javascript
window.createBadge({
  type: 'number',
  variant: 'warning',
  style: 'neutral',
  size: 'md',
  content: '99+'
});
```

### Ejemplo 7: Badge Info

```javascript
window.createBadge({
  type: 'number',
  variant: 'info',
  style: 'light',
  size: 'md',
  content: '10'
});
```

### Ejemplo 8: Badge Pequeño

```javascript
window.createBadge({
  type: 'dot',
  variant: 'error',
  size: 'xs'
});
```

### Ejemplo 9: Badge Grande con Texto

```javascript
window.createBadge({
  type: 'number',
  variant: 'error',
  style: 'bold',
  size: 'lg',
  content: 'Nuevo',
  showLabel: true,
  label: 'Funcionalidad',
  labelTypography: 'ubits-heading-h2'
});
```

### Ejemplo 10: Badge en Icono (Absoluto)

```javascript
// Crear icono con badge
const iconContainer = document.createElement('div');
iconContainer.style.position = 'relative';
iconContainer.style.display = 'inline-block';
iconContainer.innerHTML = '<i class="fas fa-bell"></i>';

// Agregar badge absoluto
const badgeHTML = window.renderBadge({
  type: 'number',
  variant: 'error',
  size: 'sm',
  content: '5',
  absolute: true,
  position: 'top-right'
});

iconContainer.innerHTML += badgeHTML;
```

---

## 🎨 Características Visuales

### Tipografía del Label

El label usa clases de tipografía UBITS:
- `ubits-body-sm-regular`
- `ubits-body-sm-semibold`
- `ubits-body-sm-bold`
- `ubits-body-md-regular` (default)
- `ubits-body-md-semibold`
- `ubits-body-md-bold`
- `ubits-heading-h1`
- `ubits-heading-h2`

### Posición Absoluta

Cuando `absolute: true`, el badge se posiciona absolutamente dentro de su contenedor padre (que debe tener `position: relative`).

---

## 🚨 Errores Comunes

### Error 1: Contenido en Tipo Dot
**Problema:** Proporcionar `content` cuando `type: 'dot'`  
**Solución:** El tipo dot no usa contenido

```javascript
// ❌ Incorrecto - contenido se ignora en dot
type: 'dot',
content: '5' // Se ignora

// ✅ Correcto - sin contenido para dot
type: 'dot'
```

### Error 2: Badge Absoluto sin Contenedor Relativo
**Problema:** Usar `absolute: true` sin contenedor con `position: relative`  
**Solución:** Asegurar que el contenedor padre tenga `position: relative`

```javascript
// ❌ Incorrecto - badge absoluto sin contenedor relativo
const container = document.createElement('div');
container.innerHTML = window.renderBadge({
  absolute: true,
  position: 'top-right'
});

// ✅ Correcto - contenedor con position relative
const container = document.createElement('div');
container.style.position = 'relative';
container.innerHTML = '<span>Elemento</span>';
container.innerHTML += window.renderBadge({
  absolute: true,
  position: 'top-right'
});
```

### Error 3: Label sin showLabel
**Problema:** Proporcionar `label` sin `showLabel: true`  
**Solución:** Activar `showLabel` para mostrar el label

```javascript
// ❌ Incorrecto - label no se muestra
label: 'Notificaciones',
showLabel: false

// ✅ Correcto - label visible
label: 'Notificaciones',
showLabel: true
```

### Error 4: Contenido Vacío en Tipo Number
**Problema:** Tipo number sin contenido  
**Solución:** Proporcionar contenido para tipo number

```javascript
// ❌ Incorrecto - number sin contenido
type: 'number',
content: ''

// ✅ Correcto - number con contenido
type: 'number',
content: '5'
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

