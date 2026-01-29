# 📦 Carousel

> **Componente UBITS:** `layout-carousel`  
> **Categoría:** Layout  
> **API:** `window.createCarousel()` o `<ubits-carousel>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-carousel--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-carousel--default

## 🎯 Descripción

Componente Carousel UBITS para mostrar contenido en un carrusel deslizable. Soporta navegación con botones, indicadores, auto-play y múltiples items visibles.

**Características principales:**
- Navegación con botones anterior/siguiente
- Indicadores de página opcionales
- Auto-play opcional
- Múltiples items visibles simultáneamente
- Scroll suave
- Items personalizables (usando Simple Cards u otros componentes)
- Callbacks para cambio de slide

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-carousel--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-carousel--default
- **Código fuente:** `vendor/ubits/packages/components/carousel/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/carousel/src/types/CarouselOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Carousel.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-carousel--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-carousel--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-carousel--default

**Descripción:**
Carousel con todos los controles disponibles. Permite configurar items, navegación, indicadores y auto-play.

**Características mostradas:**
- Items configurables (usando Simple Cards)
- Navegación con botones anterior/siguiente
- Indicadores opcionales
- Auto-play opcional
- Múltiples items visibles

**Código de ejemplo:**
```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    {
      id: 1,
      title: 'Item 1',
      subtitle: 'Subtítulo 1',
      content: 'Contenido del item 1',
      showHeader: true,
      variant: 'elevated',
      size: 'md'
    },
    {
      id: 2,
      title: 'Item 2',
      subtitle: 'Subtítulo 2',
      content: 'Contenido del item 2',
      showHeader: true,
      variant: 'elevated',
      size: 'md'
    }
  ],
  showNavigation: true,
  showIndicators: true,
  autoPlay: false,
  onSlideChange: (index) => {
    console.log('Slide cambiado:', index);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `items`: Array de items del carousel
- `showNavigation`: `true` - Mostrar botones de navegación
- `showIndicators`: `true` - Mostrar indicadores
- `autoPlay`: `false` - Sin auto-play

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el carousel |
| `items` | `CarouselItem[]` | - | Array de items del carousel (requerido) |
| `showNavigation` | `boolean` | `true` | Mostrar botones de navegación anterior/siguiente |
| `showIndicators` | `boolean` | `true` | Mostrar indicadores de página |
| `autoPlay` | `boolean` | `false` | Activar auto-play (cambio automático de slides) |
| `autoPlayInterval` | `number` | `3000` | Intervalo de auto-play en milisegundos |
| `itemsPerView` | `number` | `1` | Número de items visibles simultáneamente |
| `loop` | `boolean` | `false` | Permitir loop infinito (volver al inicio después del último) |
| `onSlideChange` | `function` | - | Callback que se ejecuta cuando cambia el slide |

### Estructura de CarouselItem

```typescript
interface CarouselItem {
  id: string | number;  // ID único del item
  // Contenido personalizado (puede ser HTML, componente, etc.)
  title?: string;       // Título del item (opcional)
  subtitle?: string;   // Subtítulo del item (opcional)
  content?: string;    // Contenido del item (opcional)
  // ... otras propiedades según el tipo de contenido
}
```

**Nota:** Los items pueden ser de cualquier tipo, pero comúnmente se usan Simple Cards de UBITS.

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Carousel Básico

```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1', content: 'Contenido 1' },
    { id: 2, title: 'Item 2', content: 'Contenido 2' },
    { id: 3, title: 'Item 3', content: 'Contenido 3' }
  ],
  showNavigation: true,
  showIndicators: true
});
```

### Ejemplo 2: Carousel con Auto-play

```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Slide 1' },
    { id: 2, title: 'Slide 2' },
    { id: 3, title: 'Slide 3' }
  ],
  autoPlay: true,
  autoPlayInterval: 5000, // 5 segundos
  onSlideChange: (index) => {
    console.log('Slide actual:', index);
  }
});
```

### Ejemplo 3: Carousel con Múltiples Items Visibles

```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' }
  ],
  itemsPerView: 3, // Mostrar 3 items a la vez
  showNavigation: true
});
```

### Ejemplo 4: Carousel con Loop

```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' }
  ],
  loop: true, // Volver al inicio después del último
  showNavigation: true
});
```

### Ejemplo 5: Carousel sin Indicadores

```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' }
  ],
  showNavigation: true,
  showIndicators: false // Sin indicadores
});
```

### Ejemplo 6: Carousel sin Navegación

```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' }
  ],
  showNavigation: false, // Sin botones
  showIndicators: true
});
```

### Ejemplo 7: Carousel con Simple Cards

```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    {
      id: 1,
      title: 'Producto 1',
      subtitle: 'Descripción corta',
      content: 'Descripción detallada del producto 1',
      showHeader: true,
      headerDecorations: true,
      variant: 'elevated',
      size: 'md',
      showButtons: true,
      buttons: [
        { label: 'Ver más', variant: 'primary', size: 'md' },
        { label: 'Favorito', variant: 'secondary', size: 'md' }
      ]
    },
    {
      id: 2,
      title: 'Producto 2',
      subtitle: 'Descripción corta',
      content: 'Descripción detallada del producto 2',
      showHeader: true,
      variant: 'elevated',
      size: 'md'
    }
  ],
  itemsPerView: 2,
  showNavigation: true,
  showIndicators: true
});
```

### Ejemplo 8: Carousel Completo

```javascript
window.createCarousel({
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Slide 1', content: 'Contenido 1' },
    { id: 2, title: 'Slide 2', content: 'Contenido 2' },
    { id: 3, title: 'Slide 3', content: 'Contenido 3' }
  ],
  showNavigation: true,
  showIndicators: true,
  autoPlay: true,
  autoPlayInterval: 4000,
  itemsPerView: 1,
  loop: true,
  onSlideChange: (index) => {
    console.log('Slide cambiado a:', index);
    updateActiveSlide(index);
  }
});
```

---

## 🔄 Callbacks y Eventos

### onSlideChange

Se ejecuta cuando cambia el slide del carousel.

```javascript
onSlideChange: (index) => {
  console.log('Slide actual:', index);
  // Actualizar estado
  updateActiveSlide(index);
  
  // Cargar contenido del slide
  loadSlideContent(index);
  
  // Actualizar URL
  updateURL(index);
}
```

**Parámetros:**
- `index` (number): Índice del slide actual (0-indexed)

---

## 🎨 Características Visuales

### Navegación

- Botones anterior/siguiente
- Se ocultan automáticamente en los extremos (si no hay loop)
- Estilo según tokens UBITS

### Indicadores

- Puntos o números que indican la posición actual
- Clickeables para navegar directamente
- Estilo según tokens UBITS

### Auto-play

- Cambio automático de slides
- Se pausa al hacer hover
- Intervalo configurable

---

## 🚨 Errores Comunes

### Error 1: Items Vacíos
**Problema:** Carousel sin items  
**Solución:** Proporcionar al menos un item

```javascript
// ❌ Incorrecto - sin items
items: []

// ✅ Correcto - con items
items: [
  { id: 1, title: 'Item 1' }
]
```

### Error 2: itemsPerView Mayor que Items
**Problema:** `itemsPerView` mayor que el número de items  
**Solución:** Asegurar que `itemsPerView` sea menor o igual al número de items

```javascript
// ❌ Incorrecto - itemsPerView muy grande
items: [{ id: 1 }, { id: 2 }],
itemsPerView: 5

// ✅ Correcto - itemsPerView apropiado
items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
itemsPerView: 2
```

### Error 3: Auto-play sin Intervalo
**Problema:** Activar auto-play sin especificar intervalo  
**Solución:** Proporcionar `autoPlayInterval` cuando se activa auto-play

```javascript
// ❌ Incorrecto - auto-play sin intervalo
autoPlay: true,
autoPlayInterval: undefined

// ✅ Correcto - auto-play con intervalo
autoPlay: true,
autoPlayInterval: 3000
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

