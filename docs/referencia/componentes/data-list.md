# 📦 List

> **Componente UBITS:** `data-list`  
> **Categoría:** Data  
> **API:** `window.createList()` o `<ubits-list>`  
> **Storybook Local:** http://localhost:6006/?path=/story/data-list--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-list--default

## 🎯 Descripción

Componente List UBITS para mostrar listas de items con estados (default, hover, active, disabled). Soporta 4 tamaños (xs, sm, md, lg), scrollbar personalizado UBITS, navegación por teclado y selección simple o múltiple.

**Características principales:**
- 4 tamaños: xs, sm, md, lg
- 4 estados: default, hover, active, disabled
- Scrollbar UBITS personalizado opcional
- Navegación por teclado (flechas, Enter, Espacio)
- Selección simple o múltiple
- Altura máxima configurable
- Scroll automático

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/data-list--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-list--default
- **Código fuente:** `vendor/ubits/packages/components/list/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/list/src/types/ListOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/List.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `data-list--default`  
**URL Local:** http://localhost:6006/?path=/story/data-list--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-list--default

**Descripción:**
List con todos los controles disponibles. Permite configurar tamaño, altura máxima, scrollbar y estados de items.

**Características mostradas:**
- Tamaño configurable (xs, sm, md, lg)
- Altura máxima configurable
- Scrollbar UBITS opcional
- Estados de items configurables (default, hover, active, disabled)

**Código de ejemplo:**
```javascript
window.createList({
  containerId: 'list-container',
  items: [
    { id: '1', label: 'Item 1', state: 'default' },
    { id: '2', label: 'Item 2', state: 'active' },
    { id: '3', label: 'Item 3', state: 'disabled' },
    { id: '4', label: 'Item 4', state: 'default' }
  ],
  size: 'md',
  maxHeight: '400px',
  showScrollbar: false,
  onItemClick: (itemId, itemElement) => {
    console.log('Item clickeado:', itemId);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `size`: `'md'` - Tamaño mediano
- `maxHeight`: `'400px'` - Altura máxima
- `showScrollbar`: `false` - Sin scrollbar personalizado
- `item1State`: `'default'` - Estado default
- `item2State`: `'active'` - Estado activo
- `item3State`: `'disabled'` - Estado deshabilitado

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la lista |
| `items` | `ListItem[]` | - | Array de items de la lista (requerido) |
| `size` | `string` | `'md'` | Tamaño de los items. Opciones: `xs`, `sm`, `md`, `lg` |
| `maxHeight` | `string` | `'400px'` | Altura máxima de la lista (para scroll) |
| `showScrollbar` | `boolean` | `false` | Mostrar scrollbar UBITS personalizado |
| `allowMultiple` | `boolean` | `false` | Permitir selección múltiple |
| `onItemClick` | `function` | - | Callback que se ejecuta cuando se hace click en un item |
| `onItemSelect` | `function` | - | Callback que se ejecuta cuando se selecciona un item |

### Estructura de ListItem

```typescript
interface ListItem {
  id: string;              // ID único del item
  label: string;          // Texto del item
  state?: ListItemState;  // Estado del item (opcional)
  disabled?: boolean;     // Si el item está deshabilitado
  selected?: boolean;     // Si el item está seleccionado
}

type ListItemState = 'default' | 'hover' | 'active' | 'disabled';
```

---

## 🎨 Tamaños y Estados

### Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande

### Estados

- **`default`**: Estado normal - default
- **`hover`**: Estado hover (cursor sobre el item)
- **`active`**: Estado activo (seleccionado)
- **`disabled`**: Estado deshabilitado (no interactivo)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: List Básica

```javascript
window.createList({
  containerId: 'list-container',
  items: [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' }
  ],
  size: 'md'
});
```

### Ejemplo 2: List con Item Activo

```javascript
window.createList({
  containerId: 'list-container',
  items: [
    { id: '1', label: 'Item 1', state: 'default' },
    { id: '2', label: 'Item 2', state: 'active' },
    { id: '3', label: 'Item 3', state: 'default' }
  ],
  size: 'md',
  onItemClick: (itemId) => {
    console.log('Item seleccionado:', itemId);
    updateActiveItem(itemId);
  }
});
```

### Ejemplo 3: List con Scrollbar

```javascript
window.createList({
  containerId: 'list-container',
  items: Array.from({ length: 20 }, (_, i) => ({
    id: `item-${i + 1}`,
    label: `Item ${i + 1}`
  })),
  size: 'md',
  maxHeight: '300px',
  showScrollbar: true
});
```

### Ejemplo 4: List con Items Deshabilitados

```javascript
window.createList({
  containerId: 'list-container',
  items: [
    { id: '1', label: 'Item disponible', state: 'default' },
    { id: '2', label: 'Item deshabilitado', state: 'disabled' },
    { id: '3', label: 'Otro item disponible', state: 'default' }
  ],
  size: 'md'
});
```

### Ejemplo 5: List con Selección Múltiple

```javascript
window.createList({
  containerId: 'list-container',
  items: [
    { id: '1', label: 'Item 1', selected: false },
    { id: '2', label: 'Item 2', selected: true },
    { id: '3', label: 'Item 3', selected: false }
  ],
  size: 'md',
  allowMultiple: true,
  onItemSelect: (itemId, isSelected) => {
    console.log('Item:', itemId, 'Seleccionado:', isSelected);
    updateSelection(itemId, isSelected);
  }
});
```

### Ejemplo 6: List Pequeña

```javascript
window.createList({
  containerId: 'list-container',
  items: [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' }
  ],
  size: 'sm'
});
```

### Ejemplo 7: List Grande

```javascript
window.createList({
  containerId: 'list-container',
  items: [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' }
  ],
  size: 'lg'
});
```

### Ejemplo 8: List con Altura Personalizada

```javascript
window.createList({
  containerId: 'list-container',
  items: Array.from({ length: 15 }, (_, i) => ({
    id: `item-${i + 1}`,
    label: `Item ${i + 1}`
  })),
  size: 'md',
  maxHeight: '500px',
  showScrollbar: true
});
```

### Ejemplo 9: List Dinámica

```javascript
// Generar lista dinámicamente desde datos
const data = [
  { id: 1, name: 'Usuario 1' },
  { id: 2, name: 'Usuario 2' },
  { id: 3, name: 'Usuario 3' }
];

const listItems = data.map(item => ({
  id: `user-${item.id}`,
  label: item.name,
  state: 'default'
}));

window.createList({
  containerId: 'list-container',
  items: listItems,
  size: 'md',
  onItemClick: (itemId) => {
    const userId = itemId.replace('user-', '');
    showUserDetails(userId);
  }
});
```

### Ejemplo 10: List con Estados Mixtos

```javascript
window.createList({
  containerId: 'list-container',
  items: [
    { id: '1', label: 'Item normal', state: 'default' },
    { id: '2', label: 'Item activo', state: 'active' },
    { id: '3', label: 'Item deshabilitado', state: 'disabled' },
    { id: '4', label: 'Otro item normal', state: 'default' }
  ],
  size: 'md',
  onItemClick: (itemId, itemElement) => {
    if (itemElement.getAttribute('aria-disabled') !== 'true') {
      handleItemClick(itemId);
    }
  }
});
```

---

## 🔄 Callbacks y Eventos

### onItemClick

Se ejecuta cuando se hace click en un item de la lista.

```javascript
onItemClick: (itemId, itemElement) => {
  console.log('Item clickeado:', itemId);
  console.log('Elemento:', itemElement);
  
  // Actualizar item activo
  updateActiveItem(itemId);
  
  // Navegar
  navigateToItem(itemId);
  
  // Mostrar detalles
  showItemDetails(itemId);
}
```

**Parámetros:**
- `itemId` (string): ID del item clickeado
- `itemElement` (HTMLElement): Elemento DOM del item clickeado

### onItemSelect

Se ejecuta cuando se selecciona un item (solo si `allowMultiple: true`).

```javascript
onItemSelect: (itemId, isSelected) => {
  console.log('Item:', itemId, 'Seleccionado:', isSelected);
  
  // Actualizar selección
  updateSelection(itemId, isSelected);
  
  // Contar seleccionados
  const selectedCount = getSelectedItems().length;
  updateSelectedCount(selectedCount);
}
```

**Parámetros:**
- `itemId` (string): ID del item seleccionado
- `isSelected` (boolean): Si el item está seleccionado

---

## ⌨️ Navegación por Teclado

- **Flecha Arriba:** Item anterior
- **Flecha Abajo:** Item siguiente
- **Enter:** Activar item seleccionado
- **Espacio:** Activar item seleccionado
- **Home:** Primer item
- **End:** Último item

---

## 🎨 Características Visuales

### Scrollbar UBITS

- Scrollbar personalizado cuando `showScrollbar: true`
- Estilo consistente con tokens UBITS
- Visible solo cuando hay scroll

### Estados Visuales

- **Default:** Fondo y texto según tokens UBITS
- **Hover:** Efecto visual al pasar el cursor
- **Active:** Fondo destacado, texto en bold
- **Disabled:** Opacidad reducida, no interactivo

### Espaciado

- Espaciado entre items según tokens UBITS
- Padding interno según tamaño

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

### Error 2: Item Deshabilitado Clickeable
**Problema:** Intentar hacer click en item deshabilitado  
**Solución:** Verificar estado antes de ejecutar acción

```javascript
onItemClick: (itemId, itemElement) => {
  // ❌ Incorrecto - no verifica estado
  handleItemClick(itemId);
  
  // ✅ Correcto - verifica estado
  if (itemElement.getAttribute('aria-disabled') !== 'true') {
    handleItemClick(itemId);
  }
}
```

### Error 3: Scrollbar sin maxHeight
**Problema:** Usar scrollbar sin altura máxima  
**Solución:** Proporcionar `maxHeight` cuando se usa scrollbar

```javascript
// ❌ Incorrecto - scrollbar sin altura máxima
showScrollbar: true,
maxHeight: undefined

// ✅ Correcto - scrollbar con altura máxima
showScrollbar: true,
maxHeight: '400px'
```

### Error 4: Selección Múltiple sin allowMultiple
**Problema:** Intentar seleccionar múltiples items sin `allowMultiple: true`  
**Solución:** Activar `allowMultiple` para selección múltiple

```javascript
// ❌ Incorrecto - múltiples seleccionados sin allowMultiple
items: [
  { id: '1', selected: true },
  { id: '2', selected: true }
],
allowMultiple: false

// ✅ Correcto - allowMultiple activado
items: [
  { id: '1', selected: true },
  { id: '2', selected: true }
],
allowMultiple: true
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

