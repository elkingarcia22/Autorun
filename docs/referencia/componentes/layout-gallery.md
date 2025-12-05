# 📦 Gallery

> **Componente UBITS:** `layout-gallery`  
> **Categoría:** Layout  
> **API:** `window.createGallery()` o `<ubits-gallery>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-gallery--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-gallery--default

## 🎯 Descripción

Componente Gallery UBITS para mostrar imágenes en diferentes layouts (grid, masonry, list) con múltiples tamaños, soporte para lightbox, lazy loading y thumbnails.

**Características principales:**
- 3 layouts: grid, masonry, list
- 5 tamaños: xs, sm, md, lg, xl
- Número de columnas configurable (layout grid)
- Espacio entre items configurable
- Thumbnails opcionales
- Lazy loading opcional
- Lightbox opcional
- Aspect ratio configurable
- Título y descripción por imagen

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-gallery--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-gallery--default
- **Código fuente:** `vendor/ubits/packages/components/gallery/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/gallery/src/types/GalleryOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Gallery.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-gallery--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-gallery--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-gallery--default

**Descripción:**
Gallery con todos los controles disponibles. Permite configurar layout, tamaño, columnas, gap, thumbnails, lazy loading y lightbox.

**Características mostradas:**
- Layout configurable (grid, masonry, list)
- Tamaño configurable (xs, sm, md, lg, xl)
- Número de columnas configurable (grid)
- Espacio entre items configurable
- Thumbnails opcionales
- Lazy loading opcional
- Lightbox opcional

**Código de ejemplo:**
```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    {
      id: 1,
      image: '/images/image1.jpg',
      thumbnail: '/images/image1-thumb.jpg',
      title: 'Imagen 1',
      description: 'Descripción de la imagen 1',
      alt: 'Imagen 1'
    },
    {
      id: 2,
      image: '/images/image2.jpg',
      thumbnail: '/images/image2-thumb.jpg',
      title: 'Imagen 2',
      description: 'Descripción de la imagen 2',
      alt: 'Imagen 2'
    }
  ],
  layout: 'grid',
  size: 'md',
  columns: 3,
  gap: 16,
  showThumbnails: false,
  lazyLoad: false,
  lightbox: true,
  onItemClick: (item) => {
    console.log('Imagen clickeada:', item);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `layout`: `'grid'` - Layout grid
- `size`: `'md'` - Tamaño mediano
- `columns`: `3` - 3 columnas
- `gap`: `16` - Espacio de 16px entre items
- `lightbox`: `true` - Lightbox activado

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la galería |
| `items` | `GalleryItem[]` | - | Array de items a mostrar en la galería (requerido) |
| `layout` | `string` | `'grid'` | Layout de la galería. Opciones: `grid`, `masonry`, `list` |
| `size` | `string` | `'md'` | Tamaño de la galería. Opciones: `xs`, `sm`, `md`, `lg`, `xl` |
| `columns` | `number` | `3` | Número de columnas (solo para layout grid) |
| `gap` | `number` | `16` | Espacio entre items en píxeles |
| `showThumbnails` | `boolean` | `false` | Mostrar thumbnails en lugar de imágenes completas |
| `lazyLoad` | `boolean` | `false` | Cargar imágenes de forma diferida (lazy loading) |
| `lightbox` | `boolean` | `false` | Activar lightbox al hacer click en las imágenes |
| `aspectRatio` | `string` | - | Aspect ratio para las imágenes (ej: "16/9", "1/1", "4/3") |
| `onItemClick` | `function` | - | Callback que se ejecuta cuando se hace click en un item |
| `className` | `string` | `''` | Clase CSS adicional |

### Estructura de GalleryItem

```typescript
interface GalleryItem {
  id: string | number;  // ID único del item
  image: string;        // URL de la imagen completa
  thumbnail?: string;   // URL del thumbnail (opcional)
  title?: string;       // Título del item (opcional)
  description?: string; // Descripción del item (opcional)
  alt?: string;         // Texto alternativo de la imagen (opcional)
}
```

---

## 🎨 Layouts

### Layout Grid

Grid uniforme con número de columnas configurable.

```javascript
layout: 'grid',
columns: 3
```

### Layout Masonry

Grid tipo masonry (Pinterest-style) con alturas variables.

```javascript
layout: 'masonry'
```

### Layout List

Lista vertical de imágenes.

```javascript
layout: 'list'
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

### Ejemplo 1: Gallery Básica

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    {
      id: 1,
      image: '/images/image1.jpg',
      alt: 'Imagen 1'
    },
    {
      id: 2,
      image: '/images/image2.jpg',
      alt: 'Imagen 2'
    }
  ]
});
```

### Ejemplo 2: Gallery Grid

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    { id: 1, image: '/images/image1.jpg', alt: 'Imagen 1' },
    { id: 2, image: '/images/image2.jpg', alt: 'Imagen 2' },
    { id: 3, image: '/images/image3.jpg', alt: 'Imagen 3' }
  ],
  layout: 'grid',
  columns: 3,
  gap: 16
});
```

### Ejemplo 3: Gallery Masonry

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    { id: 1, image: '/images/image1.jpg', alt: 'Imagen 1' },
    { id: 2, image: '/images/image2.jpg', alt: 'Imagen 2' }
  ],
  layout: 'masonry',
  gap: 16
});
```

### Ejemplo 4: Gallery con Lightbox

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    { id: 1, image: '/images/image1.jpg', alt: 'Imagen 1' },
    { id: 2, image: '/images/image2.jpg', alt: 'Imagen 2' }
  ],
  lightbox: true,
  onItemClick: (item) => {
    console.log('Imagen clickeada:', item);
    openLightbox(item);
  }
});
```

### Ejemplo 5: Gallery con Thumbnails

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    {
      id: 1,
      image: '/images/image1.jpg',
      thumbnail: '/images/image1-thumb.jpg',
      alt: 'Imagen 1'
    },
    {
      id: 2,
      image: '/images/image2.jpg',
      thumbnail: '/images/image2-thumb.jpg',
      alt: 'Imagen 2'
    }
  ],
  showThumbnails: true
});
```

### Ejemplo 6: Gallery con Lazy Loading

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    { id: 1, image: '/images/image1.jpg', alt: 'Imagen 1' },
    { id: 2, image: '/images/image2.jpg', alt: 'Imagen 2' }
  ],
  lazyLoad: true
});
```

### Ejemplo 7: Gallery con Aspect Ratio

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    { id: 1, image: '/images/image1.jpg', alt: 'Imagen 1' },
    { id: 2, image: '/images/image2.jpg', alt: 'Imagen 2' }
  ],
  aspectRatio: '16/9' // Todas las imágenes con ratio 16:9
});
```

### Ejemplo 8: Gallery con Títulos y Descripciones

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    {
      id: 1,
      image: '/images/image1.jpg',
      title: 'Paisaje Montañoso',
      description: 'Hermoso paisaje montañoso con cielo despejado',
      alt: 'Paisaje montañoso'
    },
    {
      id: 2,
      image: '/images/image2.jpg',
      title: 'Océano Azul',
      description: 'Vista del océano con olas suaves',
      alt: 'Océano azul'
    }
  ]
});
```

### Ejemplo 9: Gallery Completa

```javascript
window.createGallery({
  containerId: 'gallery-container',
  items: [
    {
      id: 1,
      image: '/images/image1.jpg',
      thumbnail: '/images/image1-thumb.jpg',
      title: 'Imagen 1',
      description: 'Descripción de la imagen 1',
      alt: 'Imagen 1'
    },
    {
      id: 2,
      image: '/images/image2.jpg',
      thumbnail: '/images/image2-thumb.jpg',
      title: 'Imagen 2',
      description: 'Descripción de la imagen 2',
      alt: 'Imagen 2'
    }
  ],
  layout: 'grid',
  size: 'md',
  columns: 3,
  gap: 16,
  showThumbnails: false,
  lazyLoad: true,
  lightbox: true,
  aspectRatio: '16/9',
  onItemClick: (item) => {
    console.log('Imagen clickeada:', item);
    openLightbox(item);
  }
});
```

### Ejemplo 10: Gallery Dinámica

```javascript
let currentLayout = 'grid';
let currentColumns = 3;

function updateGallery() {
  window.createGallery({
    containerId: 'gallery-container',
    items: getGalleryItems(),
    layout: currentLayout,
    columns: currentColumns,
    gap: 16,
    lightbox: true,
    onItemClick: (item) => {
      openLightbox(item);
    }
  });
}

// Cambiar layout
function changeLayout(layout) {
  currentLayout = layout;
  updateGallery();
}

// Cambiar columnas
function changeColumns(columns) {
  currentColumns = columns;
  updateGallery();
}

// Inicializar
updateGallery();
```

---

## 🔄 Callbacks y Eventos

### onItemClick

Se ejecuta cuando se hace click en un item de la galería.

```javascript
onItemClick: (item) => {
  console.log('Item clickeado:', item);
  // Abrir lightbox
  if (lightbox) {
    openLightbox(item);
  }
  
  // Navegar a detalle
  navigateToDetail(item.id);
  
  // Registrar evento
  trackImageClick(item.id);
}
```

**Parámetros:**
- `item` (GalleryItem): Item clickeado

---

## 🎨 Características Visuales

### Layout Grid

- Grid uniforme con número de columnas configurable
- Espaciado uniforme entre items
- Aspect ratio consistente (si se especifica)

### Layout Masonry

- Grid tipo masonry con alturas variables
- Optimizado para imágenes de diferentes tamaños
- Efecto visual tipo Pinterest

### Layout List

- Lista vertical de imágenes
- Ideal para galerías lineales
- Scroll vertical

### Lightbox

- Modal con imagen completa
- Navegación entre imágenes
- Cerrar con ESC o click fuera

### Lazy Loading

- Carga imágenes solo cuando son visibles
- Mejora el rendimiento
- Placeholder mientras carga

---

## 🚨 Errores Comunes

### Error 1: Items sin ID
**Problema:** Items sin ID único  
**Solución:** Cada item debe tener un ID único

```javascript
// ❌ Incorrecto - sin ID
items: [
  { image: '/images/image1.jpg' }
]

// ✅ Correcto - con ID
items: [
  { id: 1, image: '/images/image1.jpg', alt: 'Imagen 1' }
]
```

### Error 2: columns en Layout No-Grid
**Problema:** Usar `columns` en layouts que no son `grid`  
**Solución:** `columns` solo funciona con `layout: 'grid'`

```javascript
// ❌ Incorrecto - columns en masonry
layout: 'masonry',
columns: 3 // Se ignora

// ✅ Correcto - columns solo en grid
layout: 'grid',
columns: 3
```

### Error 3: Thumbnails sin URLs
**Problema:** Activar `showThumbnails` sin proporcionar thumbnails  
**Solución:** Proporcionar `thumbnail` en los items cuando se activa `showThumbnails`

```javascript
// ❌ Incorrecto - thumbnails sin URLs
showThumbnails: true,
items: [
  { id: 1, image: '/images/image1.jpg' } // Falta thumbnail
]

// ✅ Correcto - thumbnails con URLs
showThumbnails: true,
items: [
  {
    id: 1,
    image: '/images/image1.jpg',
    thumbnail: '/images/image1-thumb.jpg'
  }
]
```

### Error 4: Aspect Ratio Inválido
**Problema:** Aspect ratio con formato incorrecto  
**Solución:** Usar formato "ancho/alto" (ej: "16/9")

```javascript
// ❌ Incorrecto - formato inválido
aspectRatio: '16:9'

// ✅ Correcto - formato válido
aspectRatio: '16/9'
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

