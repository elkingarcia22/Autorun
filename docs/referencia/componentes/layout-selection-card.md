# 📦 Selection Card

> **Componente UBITS:** `layout-selection-card`  
> **Categoría:** Layout  
> **API:** `window.createSelectionCard()` o `<ubits-selection-card>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-selection-card--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-selection-card--default

## 🎯 Descripción

Componente Selection Card UBITS para mostrar opciones seleccionables. Soporta selección única o múltiple, estados (default, selected, disabled), y tamaños (sm, md, lg). Incluye un radio button visual a la derecha que refleja el estado de selección. La selección se realiza mediante click en toda la card.

**Características principales:**
- 3 estados: default, selected, disabled
- 3 tamaños: sm, md, lg
- Icono opcional a la izquierda
- Título y descripción configurables
- Contador de selección opcional (current/total)
- Radio button visual a la derecha
- Click en toda la card para seleccionar
- Soporta selección única o múltiple

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-selection-card--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-selection-card--default
- **Código fuente:** `vendor/ubits/packages/components/selection-card/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/selection-card/src/types/SelectionCardOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/SelectionCard.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-selection-card--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-selection-card--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-selection-card--default

**Descripción:**
Selection Card con todos los controles disponibles. Permite configurar título, descripción, icono, contador de selección, estado y tamaño.

**Características mostradas:**
- Título y descripción configurables
- Icono opcional configurable
- Contador de selección configurable (current/total)
- Estado configurable (default, selected, disabled)
- Tamaño configurable (sm, md, lg)

**Código de ejemplo:**
```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Asignar toda la empresa',
  description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
  icon: 'building',
  iconStyle: 'regular',
  selectionCount: {
    current: 0,
    total: 290
  },
  state: 'default',
  size: 'md',
  value: 'all-company',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
    handleSelection(cardData);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Asignar toda la empresa'` - Título de la card
- `description`: Descripción opcional
- `icon`: `'building'` - Icono a la izquierda
- `selectionCount`: `{ current: 0, total: 290 }` - Contador de selección
- `state`: `'default'` - Estado por defecto
- `size`: `'md'` - Tamaño mediano

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la card |
| `id` | `string` | - | ID único de la card (requerido) |
| `title` | `string` | - | Título de la card (requerido) |
| `description` | `string` | - | Descripción opcional de la card (body-sm-regular) |
| `icon` | `string` | - | Nombre del icono FontAwesome (sin prefijo fa-), opcional |
| `iconStyle` | `string` | `'regular'` | Estilo del icono FontAwesome. Opciones: `regular`, `solid` |
| `selectionCount` | `object` | - | Contador de selección opcional. Estructura: `{ current: number, total: number }` |
| `state` | `string` | `'default'` | Estado de la card. Opciones: `default`, `selected`, `disabled` |
| `size` | `string` | `'md'` | Tamaño de la card. Opciones: `sm`, `md`, `lg` |
| `value` | `string \| number` | - | Valor asociado a la card (opcional) |
| `onClick` | `function` | - | Callback que se ejecuta cuando se hace click en la card |

### Estructura de selectionCount

```typescript
interface SelectionCount {
  current: number;  // Número actual de seleccionados
  total: number;    // Número total disponible
}
```

---

## 🎨 Estados y Tamaños

### Estados

- **`default`**: Estado normal (no seleccionada) - default
- **`selected`**: Estado seleccionado (radio button marcado)
- **`disabled`**: Estado deshabilitado (no clickeable)

### Tamaños

- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Selection Card Básica

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Opción 1',
  state: 'default',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
  }
});
```

### Ejemplo 2: Selection Card Seleccionada

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Opción seleccionada',
  state: 'selected',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
  }
});
```

### Ejemplo 3: Selection Card con Descripción

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Asignar toda la empresa',
  description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
  state: 'default',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
  }
});
```

### Ejemplo 4: Selection Card con Icono

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Asignar toda la empresa',
  icon: 'building',
  iconStyle: 'regular',
  state: 'default',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
  }
});
```

### Ejemplo 5: Selection Card con Contador

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Asignar toda la empresa',
  selectionCount: {
    current: 150,
    total: 290
  },
  state: 'selected',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
  }
});
```

### Ejemplo 6: Selection Card Deshabilitada

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Opción deshabilitada',
  state: 'disabled'
});
```

### Ejemplo 7: Selection Card Pequeña

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Opción pequeña',
  size: 'sm',
  state: 'default',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
  }
});
```

### Ejemplo 8: Selection Card Grande

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Opción grande',
  description: 'Descripción de la opción grande',
  size: 'lg',
  state: 'default',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
  }
});
```

### Ejemplo 9: Selection Card Completa

```javascript
window.createSelectionCard({
  containerId: 'selection-card-container',
  id: 'card-1',
  title: 'Asignar toda la empresa',
  description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
  icon: 'building',
  iconStyle: 'regular',
  selectionCount: {
    current: 150,
    total: 290
  },
  state: 'selected',
  size: 'md',
  value: 'all-company',
  onClick: (cardData) => {
    console.log('Card clickeada:', cardData);
    handleSelection(cardData);
  }
});
```

### Ejemplo 10: Múltiples Selection Cards

```javascript
const options = [
  {
    id: 'option-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores',
    icon: 'building',
    value: 'all-company'
  },
  {
    id: 'option-2',
    title: 'Asignar por departamento',
    description: 'Selecciona departamentos específicos',
    icon: 'sitemap',
    value: 'by-department'
  },
  {
    id: 'option-3',
    title: 'Asignar manualmente',
    description: 'Selecciona colaboradores individuales',
    icon: 'user',
    value: 'manual'
  }
];

let selectedId = null;

options.forEach((option, index) => {
  window.createSelectionCard({
    containerId: `selection-card-${index}`,
    id: option.id,
    title: option.title,
    description: option.description,
    icon: option.icon,
    state: selectedId === option.id ? 'selected' : 'default',
    value: option.value,
    onClick: (cardData) => {
      selectedId = cardData.id;
      // Actualizar todas las cards
      options.forEach((opt, idx) => {
        window.createSelectionCard({
          containerId: `selection-card-${idx}`,
          ...opt,
          state: selectedId === opt.id ? 'selected' : 'default',
          onClick: (data) => {
            selectedId = data.id;
            updateAllCards();
          }
        });
      });
    }
  });
});
```

---

## 🔄 Callbacks y Eventos

### onClick

Se ejecuta cuando se hace click en la card (solo si no está deshabilitada).

```javascript
onClick: (cardData) => {
  console.log('Card clickeada:', cardData);
  // Actualizar estado
  updateSelection(cardData.id);
  
  // Guardar valor
  saveValue(cardData.value);
  
  // Actualizar UI
  updateCardsState();
}
```

**Parámetros:**
- `cardData` (SelectionCardData): Datos completos de la card clickeada

**Nota:** El callback no se ejecuta si `state: 'disabled'`.

---

## 🎨 Características Visuales

### Radio Button Visual

- Se muestra a la derecha de la card
- Refleja el estado de selección
- Marcado cuando `state: 'selected'`
- Desmarcado cuando `state: 'default'`
- Deshabilitado cuando `state: 'disabled'`

### Contador de Selección

- Se muestra cuando se proporciona `selectionCount`
- Formato: "current / total" (ej: "150 / 290")
- Estilo según tokens UBITS

### Icono

- Se muestra a la izquierda del título
- Tamaño según el tamaño de la card
- Color según tokens UBITS

### Estados Visuales

- **Default:** Borde normal, radio button desmarcado
- **Selected:** Borde destacado, radio button marcado
- **Disabled:** Opacidad reducida, no clickeable

---

## 🚨 Errores Comunes

### Error 1: Card sin ID
**Problema:** Card sin ID único  
**Solución:** Cada card debe tener un ID único

```javascript
// ❌ Incorrecto - sin ID
{ title: 'Opción 1' }

// ✅ Correcto - con ID
{ id: 'option-1', title: 'Opción 1' }
```

### Error 2: onClick en Card Deshabilitada
**Problema:** Proporcionar `onClick` en card deshabilitada  
**Solución:** El callback no se ejecuta en cards deshabilitadas

```javascript
// ❌ Incorrecto - onClick no se ejecutará
state: 'disabled',
onClick: () => {
  console.log('No se ejecutará');
}

// ✅ Correcto - sin onClick o state diferente
state: 'default',
onClick: () => {
  console.log('Se ejecutará');
}
```

### Error 3: Usar Iconos con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
icon: 'fa-building'

// ✅ Correcto
icon: 'building'
```

### Error 4: selectionCount con Valores Inválidos
**Problema:** `current` mayor que `total` o valores negativos  
**Solución:** Asegurar valores válidos

```javascript
// ❌ Incorrecto - current mayor que total
selectionCount: {
  current: 300,
  total: 290
}

// ✅ Correcto - current menor o igual que total
selectionCount: {
  current: 150,
  total: 290
}
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

