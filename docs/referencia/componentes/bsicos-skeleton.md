# 📦 Skeleton

> **Componente UBITS:** `bsicos-skeleton`  
> **Categoría:** Básicos  
> **API:** `window.createSkeleton()` o `<ubits-skeleton>`  
> **Storybook Local:** http://localhost:6006/?path=/story/bsicos-skeleton--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-skeleton--default

## 🎯 Descripción

Componente Skeleton UBITS para mostrar placeholders de carga. Soporta múltiples variantes (text, circle, rectangle, custom), tamaños y animaciones.

**Características principales:**
- 4 variantes: text, circle, rectangle, custom
- 5 tamaños: xs, sm, md, lg, xl
- Ancho y alto configurables
- Múltiples líneas de texto (para variante text)
- Animación de pulso opcional
- Ideal para estados de carga, placeholders, etc.

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/bsicos-skeleton--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-skeleton--default
- **Código fuente:** `vendor/ubits/packages/components/skeleton/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/skeleton/src/types/SkeletonOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Skeleton.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `bsicos-skeleton--default`  
**URL Local:** http://localhost:6006/?path=/story/bsicos-skeleton--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-skeleton--default

**Descripción:**
Skeleton con todos los controles disponibles. Permite configurar variante, tamaño, ancho, alto, líneas y animación.

**Características mostradas:**
- Variante configurable (text, circle, rectangle, custom)
- Tamaño configurable (xs, sm, md, lg, xl)
- Ancho configurable
- Alto configurable
- Número de líneas configurable (para variante text)
- Animación configurable

**Código de ejemplo:**
```javascript
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'text',
  size: 'md',
  width: 'full',
  height: '',
  lines: 3,
  animated: true
});
```

**Opciones utilizadas en la historia Default:**
- `variant`: `'text'` - Variante texto
- `size`: `'md'` - Tamaño mediano
- `width`: `'full'` - Ancho completo
- `lines`: `3` - 3 líneas de texto
- `animated`: `true` - Con animación

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el skeleton |
| `variant` | `string` | `'text'` | Variante del skeleton. Opciones: `text`, `circle`, `rectangle`, `custom` |
| `size` | `string` | `'md'` | Tamaño del skeleton. Opciones: `xs`, `sm`, `md`, `lg`, `xl` |
| `width` | `string \| number` | `'full'` | Ancho del skeleton (número en px, porcentaje, o "full") |
| `height` | `string \| number` | - | Alto del skeleton (número en px o porcentaje) |
| `lines` | `number` | `1` | Número de líneas de texto (solo para variant="text") |
| `animated` | `boolean` | `true` | Si el skeleton debe tener animación de pulso |

---

## 🎨 Variantes

### Variante Text

Muestra líneas de texto placeholder.

```javascript
variant: 'text',
lines: 3 // Múltiples líneas
```

### Variante Circle

Muestra un círculo placeholder (útil para avatares).

```javascript
variant: 'circle',
size: 'md'
```

### Variante Rectangle

Muestra un rectángulo placeholder (útil para imágenes, cards, etc.).

```javascript
variant: 'rectangle',
width: 300,
height: 200
```

### Variante Custom

Permite personalización completa con ancho y alto.

```javascript
variant: 'custom',
width: '100%',
height: '50px'
```

---

## 🎨 Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande
- **`xl`**: Extra grande

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Skeleton de Texto Básico

```javascript
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'text',
  size: 'md',
  lines: 3
});
```

### Ejemplo 2: Skeleton de Avatar (Circle)

```javascript
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'circle',
  size: 'md'
});
```

### Ejemplo 3: Skeleton de Imagen (Rectangle)

```javascript
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'rectangle',
  width: 400,
  height: 300
});
```

### Ejemplo 4: Skeleton Personalizado

```javascript
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'custom',
  width: '100%',
  height: '200px'
});
```

### Ejemplo 5: Skeleton sin Animación

```javascript
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'text',
  size: 'md',
  lines: 2,
  animated: false
});
```

### Ejemplo 6: Skeleton Pequeño

```javascript
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'text',
  size: 'sm',
  lines: 1
});
```

### Ejemplo 7: Skeleton Grande

```javascript
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'text',
  size: 'xl',
  lines: 5
});
```

### Ejemplo 8: Skeleton de Card Completo

```javascript
// Skeleton para un card completo
const cardSkeleton = `
  <div style="padding: 16px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px;">
    ${window.renderSkeleton({ variant: 'circle', size: 'md' })}
    ${window.renderSkeleton({ variant: 'text', size: 'md', lines: 2, width: 'full' })}
    ${window.renderSkeleton({ variant: 'rectangle', width: '100%', height: '200px' })}
  </div>
`;

document.getElementById('card-container').innerHTML = cardSkeleton;
```

### Ejemplo 9: Skeleton de Lista

```javascript
// Skeleton para una lista de items
const listItems = Array.from({ length: 5 }, () => {
  return `
    <div style="display: flex; gap: 16px; margin-bottom: 16px;">
      ${window.renderSkeleton({ variant: 'circle', size: 'md' })}
      <div style="flex: 1;">
        ${window.renderSkeleton({ variant: 'text', size: 'md', lines: 2, width: 'full' })}
      </div>
    </div>
  `;
}).join('');

document.getElementById('list-container').innerHTML = listItems;
```

### Ejemplo 10: Skeleton Dinámico

```javascript
function showSkeleton(containerId, type) {
  let skeletonOptions = {};
  
  switch(type) {
    case 'avatar':
      skeletonOptions = { variant: 'circle', size: 'md' };
      break;
    case 'text':
      skeletonOptions = { variant: 'text', size: 'md', lines: 3 };
      break;
    case 'image':
      skeletonOptions = { variant: 'rectangle', width: 400, height: 300 };
      break;
    default:
      skeletonOptions = { variant: 'text', size: 'md' };
  }
  
  window.createSkeleton({
    containerId,
    ...skeletonOptions
  });
}

// Usar
showSkeleton('avatar-container', 'avatar');
showSkeleton('text-container', 'text');
showSkeleton('image-container', 'image');
```

---

## 🎨 Características Visuales

### Animación

- **Animado:** Efecto de pulso/ondulación
- **No animado:** Skeleton estático

### Variante Text

- Múltiples líneas configurables
- Última línea más corta (opcional)
- Ancho configurable

### Variante Circle

- Siempre circular
- Tamaño según `size`
- Útil para avatares

### Variante Rectangle

- Ancho y alto configurables
- Útil para imágenes, cards, etc.

---

## 🚨 Errores Comunes

### Error 1: Lines en Variante No-Text
**Problema:** Usar `lines` en variantes que no son `text`  
**Solución:** `lines` solo funciona con `variant: 'text'`

```javascript
// ❌ Incorrecto - lines en circle
variant: 'circle',
lines: 3 // Se ignora

// ✅ Correcto - lines solo en text
variant: 'text',
lines: 3
```

### Error 2: Ancho/Alto Inválidos
**Problema:** Proporcionar valores inválidos para width/height  
**Solución:** Usar valores válidos (px, porcentaje, o "full")

```javascript
// ❌ Incorrecto - valores inválidos
width: 'invalid',
height: 'invalid'

// ✅ Correcto - valores válidos
width: 'full', // o '300px', '50%', 300
height: '200px' // o '50%', 200
```

### Error 3: Skeleton sin Contenedor
**Problema:** Crear skeleton sin contenedor  
**Solución:** Siempre proporcionar `containerId`

```javascript
// ❌ Incorrecto - sin contenedor
window.createSkeleton({
  variant: 'text'
  // Falta containerId
});

// ✅ Correcto - con contenedor
window.createSkeleton({
  containerId: 'skeleton-container',
  variant: 'text'
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

