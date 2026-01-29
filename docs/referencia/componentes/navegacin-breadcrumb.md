# 📦 Breadcrumb

> **Componente UBITS:** `navegacin-breadcrumb`  
> **Categoría:** Navegación  
> **API:** `window.createBreadcrumb()` o `<ubits-breadcrumb>`  
> **Storybook Local:** http://localhost:6006/?path=/story/navegacin-breadcrumb--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-breadcrumb--default

## 🎯 Descripción

Componente Breadcrumb UBITS para navegación jerárquica. El último item muestra texto en bold (active), los demás en regular (default). Usa body-sm con tokens UBITS.

**Características principales:**
- Navegación jerárquica
- Último item en bold (activo)
- Items anteriores en regular (default)
- Separador configurable
- URLs opcionales para cada item
- Callback para clicks en items
- Tipografía body-sm según tokens UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegacin-breadcrumb--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-breadcrumb--default
- **Código fuente:** `vendor/ubits/packages/components/breadcrumb/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/breadcrumb/src/types/BreadcrumbOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Breadcrumb.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegacin-breadcrumb--default`  
**URL Local:** http://localhost:6006/?path=/story/navegacin-breadcrumb--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-breadcrumb--default

**Descripción:**
Breadcrumb con todos los controles disponibles. Permite configurar items, separador y número de items.

**Características mostradas:**
- Items configurables
- Separador configurable
- Número de items configurable
- Último item en bold (activo)
- Items anteriores en regular (default)

**Código de ejemplo:**
```javascript
window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: [
    { id: '1', label: 'Home', url: '#home' },
    { id: '2', label: 'Categoría', url: '#categoria' },
    { id: '3', label: 'Subcategoría', url: '#subcategoria' },
    { id: '4', label: 'Página', url: '#pagina' },
    { id: '5', label: 'Detalle', active: true }
  ],
  separator: '>',
  onItemClick: (itemId, itemElement) => {
    console.log('Item clickeado:', itemId);
    navigateToItem(itemId);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `items`: Array de 5 items
- `separator`: `'>'` - Separador por defecto
- `itemCount`: `5` - Número de items

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el breadcrumb |
| `items` | `BreadcrumbItem[]` | - | Array de items del breadcrumb (requerido) |
| `separator` | `string` | `'>'` | Separador entre items (por defecto: ">") |
| `onItemClick` | `function` | - | Callback que se ejecuta cuando se hace click en un item |

### Estructura de BreadcrumbItem

```typescript
interface BreadcrumbItem {
  id: string;        // ID único del item
  label: string;     // Texto del item
  url?: string;      // URL a la que navegar (opcional, si no hay URL, no es clickeable)
  active?: boolean;  // Si el item está activo (último item, muestra en bold)
}
```

---

## 🎨 Estados Visuales

### Item Activo (Último)

- **Estilo:** Texto en bold
- **Color:** Color según tokens UBITS para texto activo
- **Comportamiento:** No es clickeable (no tiene URL)

### Items Default (Anteriores)

- **Estilo:** Texto en regular
- **Color:** Color según tokens UBITS para texto default
- **Comportamiento:** Clickeable si tiene URL

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Breadcrumb Básico

```javascript
window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: [
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'Productos', url: '/productos' },
    { id: '3', label: 'Detalle', active: true }
  ]
});
```

### Ejemplo 2: Breadcrumb con Separador Personalizado

```javascript
window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: [
    { id: '1', label: 'Inicio', url: '/' },
    { id: '2', label: 'Categoría', url: '/categoria' },
    { id: '3', label: 'Página', active: true }
  ],
  separator: '/'
});
```

### Ejemplo 3: Breadcrumb con Callback

```javascript
window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: [
    { id: '1', label: 'Home', url: '/home' },
    { id: '2', label: 'Categoría', url: '/categoria' },
    { id: '3', label: 'Subcategoría', url: '/subcategoria' },
    { id: '4', label: 'Detalle', active: true }
  ],
  onItemClick: (itemId, itemElement) => {
    console.log('Item clickeado:', itemId);
    // Navegar programáticamente
    navigateToPage(itemId);
    
    // Actualizar breadcrumb
    updateBreadcrumb(itemId);
  }
});
```

### Ejemplo 4: Breadcrumb Largo

```javascript
window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: [
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'Categoría', url: '/categoria' },
    { id: '3', label: 'Subcategoría', url: '/subcategoria' },
    { id: '4', label: 'Página', url: '/pagina' },
    { id: '5', label: 'Subpágina', url: '/subpagina' },
    { id: '6', label: 'Detalle', active: true }
  ],
  separator: '>'
});
```

### Ejemplo 5: Breadcrumb con Separador "/"

```javascript
window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: [
    { id: '1', label: 'Inicio', url: '/' },
    { id: '2', label: 'Usuarios', url: '/usuarios' },
    { id: '3', label: 'Perfil', active: true }
  ],
  separator: '/'
});
```

### Ejemplo 6: Breadcrumb con Separador "→"

```javascript
window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: [
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'Productos', url: '/productos' },
    { id: '3', label: 'Detalle', active: true }
  ],
  separator: '→'
});
```

### Ejemplo 7: Breadcrumb Mínimo (2 Items)

```javascript
window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: [
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'Página actual', active: true }
  ]
});
```

### Ejemplo 8: Breadcrumb Dinámico

```javascript
// Generar breadcrumb dinámicamente desde la ruta actual
const currentPath = window.location.pathname;
const pathParts = currentPath.split('/').filter(Boolean);

const breadcrumbItems = pathParts.map((part, index) => {
  const url = '/' + pathParts.slice(0, index + 1).join('/');
  return {
    id: `item-${index}`,
    label: part.charAt(0).toUpperCase() + part.slice(1),
    url: index < pathParts.length - 1 ? url : undefined,
    active: index === pathParts.length - 1
  };
});

// Agregar Home al inicio
breadcrumbItems.unshift({
  id: 'home',
  label: 'Home',
  url: '/',
  active: false
});

window.createBreadcrumb({
  containerId: 'breadcrumb-container',
  items: breadcrumbItems
});
```

---

## 🔄 Callbacks y Eventos

### onItemClick

Se ejecuta cuando se hace click en un item del breadcrumb.

```javascript
onItemClick: (itemId, itemElement) => {
  console.log('Item clickeado:', itemId);
  console.log('Elemento:', itemElement);
  
  // Navegar a la página
  navigateToPage(itemId);
  
  // Actualizar breadcrumb
  updateBreadcrumb(itemId);
  
  // Guardar en historial
  saveToHistory(itemId);
}
```

**Parámetros:**
- `itemId` (string): ID del item clickeado
- `itemElement` (HTMLElement): Elemento DOM del item clickeado

**Nota:** El callback se ejecuta antes de la navegación (si hay URL). Puedes prevenir la navegación por defecto si es necesario.

---

## 🎨 Características Visuales

### Separador

- Se muestra entre cada par de items
- Configurable (por defecto: ">")
- Estilo según tokens UBITS

### Tipografía

- **Items default:** body-sm-regular
- **Item activo:** body-sm-bold
- **Separador:** body-sm-regular

### Espaciado

- Espaciado entre items según tokens UBITS
- Padding interno según tokens UBITS

---

## 🚨 Errores Comunes

### Error 1: Items sin IDs Únicos
**Problema:** Múltiples items con el mismo ID  
**Solución:** Cada item debe tener un ID único

```javascript
// ❌ Incorrecto - IDs duplicados
items: [
  { id: '1', label: 'Item 1' },
  { id: '1', label: 'Item 2' } // ID duplicado
]

// ✅ Correcto - IDs únicos
items: [
  { id: '1', label: 'Item 1' },
  { id: '2', label: 'Item 2' }
]
```

### Error 2: Múltiples Items Activos
**Problema:** Múltiples items con `active: true`  
**Solución:** Solo el último item debe estar activo

```javascript
// ❌ Incorrecto - múltiples activos
items: [
  { id: '1', label: 'Item 1', active: true },
  { id: '2', label: 'Item 2', active: true } // Múltiples activos
]

// ✅ Correcto - solo último activo
items: [
  { id: '1', label: 'Item 1' },
  { id: '2', label: 'Item 2', active: true } // Solo último
]
```

### Error 3: Item Activo con URL
**Problema:** Item activo con URL (debería ser el último y no clickeable)  
**Solución:** El item activo no debe tener URL

```javascript
// ❌ Incorrecto - activo con URL
{ id: '3', label: 'Detalle', url: '/detalle', active: true }

// ✅ Correcto - activo sin URL
{ id: '3', label: 'Detalle', active: true }
```

### Error 4: Menos de 2 Items
**Problema:** Breadcrumb con menos de 2 items  
**Solución:** Breadcrumb debe tener al menos 2 items

```javascript
// ❌ Incorrecto - solo un item
items: [
  { id: '1', label: 'Home', active: true }
]

// ✅ Correcto - al menos 2 items
items: [
  { id: '1', label: 'Home', url: '/' },
  { id: '2', label: 'Página', active: true }
]
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

