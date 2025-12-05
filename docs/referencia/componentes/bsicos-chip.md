# 📦 Chip

> **Componente UBITS:** `bsicos-chip`  
> **Categoría:** Básicos  
> **API:** `window.createChip()` o `<ubits-chip>`  
> **Storybook Local:** http://localhost:6006/?path=/story/bsicos-chip--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-chip--default

## 🎯 Descripción

Componente Chip UBITS para mostrar etiquetas o tags interactivas. Múltiples tamaños, estados y soporte para iconos izquierdo y derecho (botón de cerrar). Usa tokens UBITS exclusivamente.

**Características principales:**
- 4 tamaños: xs (20px), sm (24px), md (28px), lg (36px)
- 6 estados: default, hover, active, pressed, focus, disabled
- Icono izquierdo opcional
- Icono derecho opcional (botón de cerrar)
- Clickeable opcional
- Callbacks para click y close

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/bsicos-chip--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-chip--default
- **Código fuente:** `vendor/ubits/packages/components/chip/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/chip/src/types/ChipOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Chip.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `bsicos-chip--default`  
**URL Local:** http://localhost:6006/?path=/story/bsicos-chip--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-chip--default

**Descripción:**
Chip con todos los controles disponibles. Permite configurar label, tamaño, estado, iconos, closable y clickable.

**Características mostradas:**
- Label configurable
- Tamaño configurable (xs, sm, md, lg)
- Estado configurable (default, hover, active, pressed, focus, disabled)
- Icono izquierdo opcional
- Icono derecho opcional (botón cerrar)
- Closable configurable
- Clickeable configurable

**Código de ejemplo:**
```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Chip',
  size: 'md',
  state: 'default',
  leftIcon: undefined,
  rightIcon: undefined,
  closable: false,
  clickable: false,
  onClick: (event) => {
    console.log('Chip clickeado');
  },
  onClose: (event) => {
    console.log('Chip cerrado');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `label`: `'Chip'` - Texto del chip
- `size`: `'md'` - Tamaño mediano
- `state`: `'default'` - Estado por defecto
- `closable`: `false` - Sin botón cerrar
- `clickable`: `false` - No clickeable

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el chip |
| `label` | `string` | `'Chip'` | Texto del chip |
| `size` | `string` | `'md'` | Tamaño del chip. Opciones: `xs` (20px), `sm` (24px), `md` (28px), `lg` (36px) |
| `state` | `string` | `'default'` | Estado del chip. Opciones: `default`, `hover`, `active`, `pressed`, `focus`, `disabled` |
| `leftIcon` | `string` | - | Icono FontAwesome izquierdo (ej: "tag", "user"). Dejar vacío para ocultar |
| `rightIcon` | `string` | `'xmark'` | Icono FontAwesome derecho para el botón de cerrar (ej: "xmark"). Se usa si closable es true |
| `closable` | `boolean` | `false` | Si el chip tiene botón de cerrar |
| `clickable` | `boolean` | `false` | Si el chip es clickeable (añade estilos hover/active y cursor pointer) |
| `onClick` | `function` | - | Función a ejecutar cuando se hace clic en el chip (solo si clickable es true) |
| `onClose` | `function` | - | Función a ejecutar cuando se hace clic en el botón de cerrar |
| `className` | `string` | `''` | Clases CSS adicionales |

---

## 🎨 Tamaños y Estados

### Tamaños

- **`xs`**: Extra pequeño (20px)
- **`sm`**: Pequeño (24px)
- **`md`**: Mediano (28px) - default
- **`lg`**: Grande (36px)

### Estados

- **`default`**: Estado normal
- **`hover`**: Estado hover (cursor sobre el chip)
- **`active`**: Estado activo (click presionado)
- **`pressed`**: Estado presionado
- **`focus`**: Estado focus (con borde y sombra)
- **`disabled`**: Estado deshabilitado (no interactivo)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Chip Básico

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Etiqueta',
  size: 'md'
});
```

### Ejemplo 2: Chip con Icono Izquierdo

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Categoría',
  size: 'md',
  leftIcon: 'tag'
});
```

### Ejemplo 3: Chip Clickeable

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Filtro',
  size: 'md',
  clickable: true,
  onClick: (event) => {
    console.log('Chip clickeado');
    applyFilter('filtro');
  }
});
```

### Ejemplo 4: Chip con Botón Cerrar

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Etiqueta removible',
  size: 'md',
  closable: true,
  onClose: (event) => {
    console.log('Chip cerrado');
    removeTag('etiqueta');
  }
});
```

### Ejemplo 5: Chip con Icono Izquierdo y Cerrar

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Usuario',
  size: 'md',
  leftIcon: 'user',
  closable: true,
  onClose: (event) => {
    removeUser();
  }
});
```

### Ejemplo 6: Chip Pequeño

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Tag',
  size: 'xs',
  leftIcon: 'tag'
});
```

### Ejemplo 7: Chip Grande Clickeable

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Categoría principal',
  size: 'lg',
  leftIcon: 'folder',
  clickable: true,
  onClick: (event) => {
    navigateToCategory('categoria');
  }
});
```

### Ejemplo 8: Chip Deshabilitado

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'No disponible',
  size: 'md',
  state: 'disabled'
});
```

### Ejemplo 9: Chip con Estado Focus

```javascript
window.createChip({
  containerId: 'chip-container',
  label: 'Seleccionado',
  size: 'md',
  state: 'focus',
  clickable: true
});
```

### Ejemplo 10: Múltiples Chips

```javascript
const tags = ['React', 'TypeScript', 'JavaScript', 'CSS'];

tags.forEach((tag, index) => {
  window.createChip({
    containerId: `chip-container-${index}`,
    label: tag,
    size: 'sm',
    closable: true,
    onClose: () => {
      removeTag(tag);
    }
  });
});
```

---

## 🔄 Callbacks y Eventos

### onClick

Se ejecuta cuando se hace clic en el chip (solo si `clickable: true`).

```javascript
onClick: (event) => {
  console.log('Chip clickeado');
  // Ejecutar acción
  performAction();
  
  // Navegar
  navigateToPage();
  
  // Filtrar
  applyFilter();
}
```

**Parámetros:**
- `event` (Event): Evento nativo del click

### onClose

Se ejecuta cuando se hace clic en el botón de cerrar.

```javascript
onClose: (event) => {
  console.log('Chip cerrado');
  // Remover del DOM
  removeChip();
  
  // Actualizar estado
  updateState();
  
  // Limpiar filtro
  clearFilter();
}
```

**Parámetros:**
- `event` (Event): Evento nativo del click en el botón cerrar

---

## 🎨 Características Visuales

### Iconos

- **Icono izquierdo:** Se muestra antes del texto
- **Icono derecho:** Se muestra después del texto (solo si `closable: true`)
- **Tamaño:** Se ajusta según el tamaño del chip

### Estados Visuales

- **Default:** Fondo y borde según tokens UBITS
- **Hover:** Efecto visual al pasar el cursor (si `clickable: true`)
- **Active:** Efecto visual al hacer click
- **Focus:** Borde azul y sombra (2px solid #5297F4, box-shadow con spread 4px)
- **Disabled:** Opacidad reducida, no interactivo

---

## 🚨 Errores Comunes

### Error 1: onClick sin clickable
**Problema:** Proporcionar `onClick` sin `clickable: true`  
**Solución:** Activar `clickable` para que el chip sea clickeable

```javascript
// ❌ Incorrecto - onClick no se ejecuta
onClick: () => {
  console.log('Click');
},
clickable: false

// ✅ Correcto - clickable activado
onClick: () => {
  console.log('Click');
},
clickable: true
```

### Error 2: onClose sin closable
**Problema:** Proporcionar `onClose` sin `closable: true`  
**Solución:** Activar `closable` para mostrar el botón cerrar

```javascript
// ❌ Incorrecto - no hay botón cerrar
onClose: () => {
  console.log('Close');
},
closable: false

// ✅ Correcto - closable activado
onClose: () => {
  console.log('Close');
},
closable: true
```

### Error 3: Usar Iconos con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
leftIcon: 'fa-tag'

// ✅ Correcto
leftIcon: 'tag'
```

### Error 4: Estado Focus sin clickable
**Problema:** Usar `state: 'focus'` sin `clickable: true`  
**Solución:** Activar `clickable` para que el estado focus tenga sentido

```javascript
// ❌ Incorrecto - focus sin clickable
state: 'focus',
clickable: false

// ✅ Correcto - focus con clickable
state: 'focus',
clickable: true
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

