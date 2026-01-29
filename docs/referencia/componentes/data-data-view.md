# 📦 DataView

> **Componente UBITS:** `data-data-view`  
> **Categoría:** Data  
> **API:** `window.createDataView()` o `<ubits-data-view>`  
> **Storybook Local:** http://localhost:6006/?path=/story/data-data-view--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-data-view--default

## 🎯 Descripción

Componente DataView UBITS para mostrar listas de productos con imagen, categoría, nombre, rating, precio, botón de favoritos y botón de compra. Usa tokens UBITS para colores, tipografía y espaciado.

**Características principales:**
- 3 tamaños: sm, md, lg
- Imagen del producto
- Categoría opcional
- Nombre del producto
- Rating con estrellas opcional
- Precio opcional
- Botón de favoritos opcional
- Botón de compra opcional
- Estados de stock: INSTOCK, LOWSTOCK, OUTOFSTOCK
- Callbacks para acciones

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/data-data-view--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-data-view--default
- **Código fuente:** `vendor/ubits/packages/components/data-view/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/data-view/src/types/DataViewOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/DataView.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `data-data-view--default`  
**URL Local:** http://localhost:6006/?path=/story/data-data-view--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-data-view--default

**Descripción:**
DataView con todos los controles disponibles. Permite configurar tamaño, elementos visibles, textos de botones e iconos.

**Características mostradas:**
- Tamaño configurable (sm, md, lg)
- Elementos configurables (categoría, rating, precio, favoritos, botón de compra)
- Textos de botones configurables
- Iconos configurables
- Estados de stock configurables

**Código de ejemplo:**
```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      category: 'Categoría',
      name: 'Producto 1',
      rating: 4.5,
      price: 50,
      stockStatus: 'INSTOCK',
      inWishlist: false
    }
  ],
  size: 'md',
  showCategory: true,
  showRating: true,
  showPrice: true,
  showWishlist: true,
  showBuyButton: true,
  buyButtonText: 'Comprar',
  onProductClick: (product) => {
    console.log('Producto clickeado:', product);
  },
  onWishlistClick: (product) => {
    console.log('Favorito clickeado:', product);
  },
  onBuyClick: (product) => {
    console.log('Comprar clickeado:', product);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `size`: `'md'` - Tamaño mediano
- `showCategory`: `true` - Mostrar categoría
- `showRating`: `true` - Mostrar rating
- `showPrice`: `true` - Mostrar precio
- `showWishlist`: `true` - Mostrar favoritos
- `showBuyButton`: `true` - Mostrar botón de compra

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el data view |
| `products` | `ProductData[]` | - | Array de productos a mostrar (requerido) |
| `size` | `string` | `'md'` | Tamaño del componente. Opciones: `sm` (imagen 80px), `md` (imagen 120px), `lg` (imagen 160px) |
| `showCategory` | `boolean` | `true` | Mostrar categoría del producto |
| `showRating` | `boolean` | `true` | Mostrar rating con estrellas |
| `showPrice` | `boolean` | `true` | Mostrar precio del producto |
| `showWishlist` | `boolean` | `true` | Mostrar botón de favoritos |
| `showBuyButton` | `boolean` | `true` | Mostrar botón de compra |
| `buyButtonText` | `string` | `'Buy Now'` | Texto del botón de compra |
| `buyButtonIcon` | `string` | `'shopping-cart'` | Icono del botón de compra (nombre FontAwesome sin prefijo fa-) |
| `wishlistIcon` | `string` | `'heart'` | Icono del botón de favoritos (nombre FontAwesome sin prefijo fa-) |
| `onProductClick` | `function` | - | Callback que se ejecuta cuando se hace click en un producto |
| `onWishlistClick` | `function` | - | Callback que se ejecuta cuando se hace click en favoritos |
| `onBuyClick` | `function` | - | Callback que se ejecuta cuando se hace click en comprar |

### Estructura de ProductData

```typescript
interface ProductData {
  id: string;                    // ID único del producto
  image: string;                 // URL de la imagen del producto
  imageAlt: string;              // Texto alternativo de la imagen
  category?: string;              // Categoría del producto (opcional)
  name: string;                   // Nombre del producto
  rating?: number;                // Rating del producto (0-5, opcional)
  price: number;                  // Precio del producto
  stockStatus?: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK'; // Estado de stock (opcional)
  inWishlist?: boolean;           // Si el producto está en favoritos (opcional)
}
```

### Estados de Stock

- **`INSTOCK`**: En stock (disponible)
- **`LOWSTOCK`**: Stock bajo (pocas unidades)
- **`OUTOFSTOCK`**: Sin stock (no disponible)

---

## 🎨 Tamaños

- **`sm`**: Pequeño (imagen 80px)
- **`md`**: Mediano (imagen 120px) - default
- **`lg`**: Grande (imagen 160px)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: DataView Básico

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      name: 'Producto 1',
      price: 50
    }
  ]
});
```

### Ejemplo 2: DataView con Todos los Elementos

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      category: 'Electrónica',
      name: 'Producto 1',
      rating: 4.5,
      price: 50,
      stockStatus: 'INSTOCK',
      inWishlist: false
    }
  ],
  showCategory: true,
  showRating: true,
  showPrice: true,
  showWishlist: true,
  showBuyButton: true
});
```

### Ejemplo 3: DataView Pequeño

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      name: 'Producto 1',
      price: 50
    }
  ],
  size: 'sm'
});
```

### Ejemplo 4: DataView Grande

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      name: 'Producto 1',
      price: 50
    }
  ],
  size: 'lg'
});
```

### Ejemplo 5: DataView sin Categoría

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      name: 'Producto 1',
      price: 50
    }
  ],
  showCategory: false
});
```

### Ejemplo 6: DataView sin Rating

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      name: 'Producto 1',
      price: 50
    }
  ],
  showRating: false
});
```

### Ejemplo 7: DataView con Botón Personalizado

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      name: 'Producto 1',
      price: 50
    }
  ],
  buyButtonText: 'Agregar al carrito',
  buyButtonIcon: 'cart-plus'
});
```

### Ejemplo 8: DataView con Callbacks

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      name: 'Producto 1',
      price: 50,
      inWishlist: false
    }
  ],
  onProductClick: (product) => {
    console.log('Producto clickeado:', product);
    navigateToProduct(product.id);
  },
  onWishlistClick: (product) => {
    console.log('Favorito clickeado:', product);
    toggleWishlist(product.id);
    // Actualizar estado
    updateProductWishlist(product.id, !product.inWishlist);
  },
  onBuyClick: (product) => {
    console.log('Comprar clickeado:', product);
    addToCart(product);
  }
});
```

### Ejemplo 9: DataView con Estados de Stock

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      name: 'Producto 1',
      price: 50,
      stockStatus: 'INSTOCK'
    },
    {
      id: '2',
      image: '/images/product2.jpg',
      imageAlt: 'Producto 2',
      name: 'Producto 2',
      price: 75,
      stockStatus: 'LOWSTOCK'
    },
    {
      id: '3',
      image: '/images/product3.jpg',
      imageAlt: 'Producto 3',
      name: 'Producto 3',
      price: 100,
      stockStatus: 'OUTOFSTOCK'
    }
  ]
});
```

### Ejemplo 10: DataView Completo

```javascript
window.createDataView({
  containerId: 'data-view-container',
  products: [
    {
      id: '1',
      image: '/images/product1.jpg',
      imageAlt: 'Producto 1',
      category: 'Electrónica',
      name: 'Producto 1',
      rating: 4.5,
      price: 50,
      stockStatus: 'INSTOCK',
      inWishlist: false
    },
    {
      id: '2',
      image: '/images/product2.jpg',
      imageAlt: 'Producto 2',
      category: 'Ropa',
      name: 'Producto 2',
      rating: 4.0,
      price: 75,
      stockStatus: 'LOWSTOCK',
      inWishlist: true
    }
  ],
  size: 'md',
  showCategory: true,
  showRating: true,
  showPrice: true,
  showWishlist: true,
  showBuyButton: true,
  buyButtonText: 'Comprar ahora',
  buyButtonIcon: 'shopping-cart',
  wishlistIcon: 'heart',
  onProductClick: (product) => {
    navigateToProduct(product.id);
  },
  onWishlistClick: (product) => {
    toggleWishlist(product.id);
  },
  onBuyClick: (product) => {
    addToCart(product);
  }
});
```

---

## 🔄 Callbacks y Eventos

### onProductClick

Se ejecuta cuando se hace click en un producto.

```javascript
onProductClick: (product) => {
  console.log('Producto clickeado:', product);
  // Navegar a la página del producto
  navigateToProduct(product.id);
  
  // Registrar evento de analytics
  trackProductView(product.id);
  
  // Mostrar detalles
  showProductDetails(product);
}
```

**Parámetros:**
- `product` (ProductData): Producto clickeado

### onWishlistClick

Se ejecuta cuando se hace click en el botón de favoritos.

```javascript
onWishlistClick: (product) => {
  console.log('Favorito clickeado:', product);
  // Toggle favorito
  toggleWishlist(product.id);
  
  // Actualizar estado
  updateProductWishlist(product.id, !product.inWishlist);
  
  // Mostrar feedback
  showToast(product.inWishlist ? 'Removido de favoritos' : 'Agregado a favoritos');
}
```

**Parámetros:**
- `product` (ProductData): Producto del favorito

### onBuyClick

Se ejecuta cuando se hace click en el botón de compra.

```javascript
onBuyClick: (product) => {
  console.log('Comprar clickeado:', product);
  // Validar stock
  if (product.stockStatus === 'OUTOFSTOCK') {
    showError('Producto sin stock');
    return;
  }
  
  // Agregar al carrito
  addToCart(product);
  
  // Mostrar feedback
  showToast('Producto agregado al carrito');
  
  // Registrar evento
  trackAddToCart(product.id);
}
```

**Parámetros:**
- `product` (ProductData): Producto a comprar

---

## 🎨 Características Visuales

### Imagen del Producto

- Tamaño según `size` (sm: 80px, md: 120px, lg: 160px)
- Aspect ratio mantenido
- Placeholder si no hay imagen

### Rating

- Estrellas visuales (0-5)
- Media estrella para decimales
- Color según tokens UBITS

### Precio

- Formato de moneda
- Tamaño destacado
- Color según tokens UBITS

### Estados de Stock

- **INSTOCK:** Sin indicador especial
- **LOWSTOCK:** Indicador de stock bajo
- **OUTOFSTOCK:** Indicador de sin stock (botón deshabilitado)

---

## 🚨 Errores Comunes

### Error 1: Productos sin ID
**Problema:** Productos sin ID único  
**Solución:** Cada producto debe tener un ID único

```javascript
// ❌ Incorrecto - sin ID
{ name: 'Producto 1', price: 50 }

// ✅ Correcto - con ID
{ id: '1', name: 'Producto 1', price: 50 }
```

### Error 2: Productos sin Imagen
**Problema:** Productos sin imagen  
**Solución:** Proporcionar imagen o usar placeholder

```javascript
// ❌ Incorrecto - sin imagen
{ id: '1', name: 'Producto 1', price: 50 }

// ✅ Correcto - con imagen
{ id: '1', image: '/images/product1.jpg', imageAlt: 'Producto 1', name: 'Producto 1', price: 50 }
```

### Error 3: Rating Fuera de Rango
**Problema:** Rating mayor que 5 o menor que 0  
**Solución:** Asegurar que rating esté entre 0 y 5

```javascript
// ❌ Incorrecto - rating fuera de rango
rating: 10

// ✅ Correcto - rating en rango
rating: 4.5 // Entre 0 y 5
```

### Error 4: Usar Iconos con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
buyButtonIcon: 'fa-shopping-cart'

// ✅ Correcto
buyButtonIcon: 'shopping-cart'
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

