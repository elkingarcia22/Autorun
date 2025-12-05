# 📦 Pagination

> **Componente UBITS:** `data-pagination`  
> **Categoría:** Data  
> **API:** `window.createPagination()` o `<ubits-pagination>`  
> **Storybook Local:** http://localhost:6006/?path=/story/data-pagination--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-pagination--default

## 🎯 Descripción

Componente Pagination UBITS para paginación de datos usando tokens UBITS, tipografía UBITS y componentes UBITS. Ideal para tablas y listas de datos.

**Características principales:**
- 3 variantes: default, compact, minimal
- 3 tamaños: sm, md, lg
- Botones primera/última página opcionales
- Botones anterior/siguiente opcionales
- Información de items opcional (ej: "1-10 de 100")
- Selector de items por página opcional
- Número máximo de páginas visibles configurable
- Callbacks para cambio de página e items por página

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/data-pagination--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-pagination--default
- **Código fuente:** `vendor/ubits/packages/components/pagination/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/pagination/src/types/PaginationOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Pagination.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `data-pagination--default`  
**URL Local:** http://localhost:6006/?path=/story/data-pagination--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-pagination--default

**Descripción:**
Pagination con todos los controles disponibles. Permite configurar página actual, total de páginas, variante, tamaño, botones e información.

**Características mostradas:**
- Página actual configurable
- Total de páginas configurable
- Total de items e items por página configurables
- Variante configurable (default, compact, minimal)
- Tamaño configurable (sm, md, lg)
- Botones configurables (first, last, prev, next)
- Información de items opcional
- Selector de items por página opcional

**Código de ejemplo:**
```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 5,
  totalPages: 20,
  totalItems: 200,
  itemsPerPage: 10,
  variant: 'default',
  size: 'md',
  maxVisiblePages: 7,
  showFirst: true,
  showLast: true,
  showPrevNext: true,
  showInfo: true,
  showItemsPerPage: true,
  itemsPerPageOptions: [10, 20, 50, 100],
  onPageChange: (page) => {
    console.log('Página cambiada:', page);
    loadPage(page);
  },
  onItemsPerPageChange: (itemsPerPage) => {
    console.log('Items por página:', itemsPerPage);
    updateItemsPerPage(itemsPerPage);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `currentPage`: `5` - Página actual
- `totalPages`: `20` - Total de páginas
- `totalItems`: `200` - Total de items
- `itemsPerPage`: `10` - Items por página
- `variant`: `'default'` - Variante default
- `size`: `'md'` - Tamaño mediano

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la paginación |
| `currentPage` | `number` | `1` | Página actual (1-indexed) |
| `totalPages` | `number` | `10` | Total de páginas |
| `totalItems` | `number` | - | Total de items (para mostrar información) |
| `itemsPerPage` | `number` | - | Items por página |
| `variant` | `string` | `'default'` | Variante visual. Opciones: `default`, `compact`, `minimal` |
| `size` | `string` | `'md'` | Tamaño del paginador. Opciones: `sm`, `md`, `lg` |
| `maxVisiblePages` | `number` | `7` | Número máximo de páginas visibles |
| `showFirst` | `boolean` | `true` | Mostrar botón "Primera página" |
| `showLast` | `boolean` | `true` | Mostrar botón "Última página" |
| `showPrevNext` | `boolean` | `true` | Mostrar botones anterior/siguiente |
| `showInfo` | `boolean` | `false` | Mostrar información de items (ej: "1-10 de 100") |
| `showItemsPerPage` | `boolean` | `false` | Mostrar selector de items por página |
| `itemsPerPageOptions` | `number[]` | - | Opciones para el selector de items por página (ej: [10, 20, 50, 100]) |
| `onPageChange` | `function` | - | Callback que se ejecuta cuando cambia la página |
| `onItemsPerPageChange` | `function` | - | Callback que se ejecuta cuando cambian los items por página |

---

## 🎨 Variantes y Tamaños

### Variantes

- **`default`**: Variante completa con todos los botones - default
- **`compact`**: Variante compacta con menos elementos
- **`minimal`**: Variante mínima con solo lo esencial

### Tamaños

- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Pagination Básica

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 1,
  totalPages: 10,
  onPageChange: (page) => {
    console.log('Página:', page);
    loadPage(page);
  }
});
```

### Ejemplo 2: Pagination con Información

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 5,
  totalPages: 20,
  totalItems: 200,
  itemsPerPage: 10,
  showInfo: true, // Muestra "41-50 de 200"
  onPageChange: (page) => {
    loadPage(page);
  }
});
```

### Ejemplo 3: Pagination con Selector de Items por Página

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 1,
  totalPages: 20,
  totalItems: 200,
  itemsPerPage: 10,
  showItemsPerPage: true,
  itemsPerPageOptions: [10, 20, 50, 100],
  onPageChange: (page) => {
    loadPage(page);
  },
  onItemsPerPageChange: (itemsPerPage) => {
    console.log('Items por página:', itemsPerPage);
    updateItemsPerPage(itemsPerPage);
    // Resetear a página 1
    loadPage(1);
  }
});
```

### Ejemplo 4: Pagination Compacta

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 5,
  totalPages: 20,
  variant: 'compact',
  showFirst: false,
  showLast: false,
  onPageChange: (page) => {
    loadPage(page);
  }
});
```

### Ejemplo 5: Pagination Mínima

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 5,
  totalPages: 20,
  variant: 'minimal',
  showFirst: false,
  showLast: false,
  showPrevNext: true,
  onPageChange: (page) => {
    loadPage(page);
  }
});
```

### Ejemplo 6: Pagination Pequeña

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 3,
  totalPages: 15,
  size: 'sm',
  onPageChange: (page) => {
    loadPage(page);
  }
});
```

### Ejemplo 7: Pagination con Máximo de Páginas Visibles

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 10,
  totalPages: 50,
  maxVisiblePages: 5, // Solo muestra 5 páginas a la vez
  onPageChange: (page) => {
    loadPage(page);
  }
});
```

### Ejemplo 8: Pagination sin Botones First/Last

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 5,
  totalPages: 20,
  showFirst: false,
  showLast: false,
  onPageChange: (page) => {
    loadPage(page);
  }
});
```

### Ejemplo 9: Pagination Completa

```javascript
window.createPagination({
  containerId: 'pagination-container',
  currentPage: 5,
  totalPages: 20,
  totalItems: 200,
  itemsPerPage: 10,
  variant: 'default',
  size: 'md',
  maxVisiblePages: 7,
  showFirst: true,
  showLast: true,
  showPrevNext: true,
  showInfo: true,
  showItemsPerPage: true,
  itemsPerPageOptions: [10, 20, 50, 100],
  onPageChange: (page) => {
    console.log('Página cambiada:', page);
    loadPage(page);
    updateURL(page);
  },
  onItemsPerPageChange: (itemsPerPage) => {
    console.log('Items por página:', itemsPerPage);
    updateItemsPerPage(itemsPerPage);
    // Resetear a página 1 cuando cambia items por página
    loadPage(1);
  }
});
```

### Ejemplo 10: Pagination Dinámica

```javascript
let currentPage = 1;
let itemsPerPage = 10;
let totalItems = 200;

function updatePagination() {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  window.createPagination({
    containerId: 'pagination-container',
    currentPage: currentPage,
    totalPages: totalPages,
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    showInfo: true,
    showItemsPerPage: true,
    itemsPerPageOptions: [10, 20, 50, 100],
    onPageChange: (page) => {
      currentPage = page;
      loadPage(page);
      updatePagination();
    },
    onItemsPerPageChange: (newItemsPerPage) => {
      itemsPerPage = newItemsPerPage;
      currentPage = 1; // Resetear a página 1
      loadPage(1);
      updatePagination();
    }
  });
}

// Inicializar
updatePagination();
```

---

## 🔄 Callbacks y Eventos

### onPageChange

Se ejecuta cuando cambia la página.

```javascript
onPageChange: (page) => {
  console.log('Página cambiada:', page);
  // Cargar datos de la nueva página
  loadPage(page);
  
  // Actualizar URL
  updateURL(page);
  
  // Scroll al inicio
  scrollToTop();
}
```

**Parámetros:**
- `page` (number): Nueva página (1-indexed)

### onItemsPerPageChange

Se ejecuta cuando cambian los items por página.

```javascript
onItemsPerPageChange: (itemsPerPage) => {
  console.log('Items por página:', itemsPerPage);
  // Actualizar items por página
  updateItemsPerPage(itemsPerPage);
  
  // Recalcular total de páginas
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Resetear a página 1
  loadPage(1);
  
  // Actualizar paginación
  updatePagination();
}
```

**Parámetros:**
- `itemsPerPage` (number): Nuevo número de items por página

---

## 🎨 Características Visuales

### Información de Items

Cuando `showInfo: true`, muestra información como:
- "1-10 de 200" (items 1 a 10 de un total de 200)
- Se calcula automáticamente desde `currentPage`, `itemsPerPage` y `totalItems`

### Selector de Items por Página

Cuando `showItemsPerPage: true`, muestra un selector con las opciones especificadas en `itemsPerPageOptions`.

### Páginas Visibles

- Se muestran hasta `maxVisiblePages` páginas alrededor de la página actual
- Se ocultan páginas lejanas con "..."
- Ejemplo: Si `currentPage: 10` y `maxVisiblePages: 7`, muestra: `... 7 8 9 [10] 11 12 13 ...`

---

## 🚨 Errores Comunes

### Error 1: currentPage Fuera de Rango
**Problema:** `currentPage` mayor que `totalPages`  
**Solución:** Asegurar que `currentPage` esté dentro del rango

```javascript
// ❌ Incorrecto - página fuera de rango
currentPage: 15,
totalPages: 10

// ✅ Correcto - página dentro de rango
currentPage: 5,
totalPages: 10
```

### Error 2: totalPages Cero o Negativo
**Problema:** `totalPages` con valor inválido  
**Solución:** Asegurar que `totalPages` sea al menos 1

```javascript
// ❌ Incorrecto - totalPages inválido
totalPages: 0

// ✅ Correcto - totalPages válido
totalPages: Math.max(1, Math.ceil(totalItems / itemsPerPage))
```

### Error 3: showInfo sin totalItems
**Problema:** Activar `showInfo` sin proporcionar `totalItems`  
**Solución:** Proporcionar `totalItems` cuando se activa `showInfo`

```javascript
// ❌ Incorrecto - info sin totalItems
showInfo: true,
totalItems: undefined

// ✅ Correcto - info con totalItems
showInfo: true,
totalItems: 200
```

### Error 4: showItemsPerPage sin itemsPerPageOptions
**Problema:** Activar `showItemsPerPage` sin proporcionar opciones  
**Solución:** Proporcionar `itemsPerPageOptions` cuando se activa `showItemsPerPage`

```javascript
// ❌ Incorrecto - selector sin opciones
showItemsPerPage: true,
itemsPerPageOptions: undefined

// ✅ Correcto - selector con opciones
showItemsPerPage: true,
itemsPerPageOptions: [10, 20, 50, 100]
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

