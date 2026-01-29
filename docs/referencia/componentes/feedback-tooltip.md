# 📦 Tooltip

> **Componente UBITS:** `feedback-tooltip`  
> **Categoría:** Feedback  
> **API:** `window.createTooltip()` o `<ubits-tooltip>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-tooltip--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-tooltip--default

## 🎯 Descripción

Componente Tooltip UBITS con tail (flecha) para mostrar información contextual. Similar al Popover pero más simple, con título, descripción y botones de acción (primario, secundario y terciario). El tooltip se adapta automáticamente al contenido usando min-width y max-width según el tamaño seleccionado.

**Características principales:**
- 3 tamaños: sm, md, lg
- 4 posiciones de tail: top, bottom, left, right
- Título y descripción opcionales
- 3 botones de acción opcionales (primary, secondary, tertiary)
- Iconos opcionales en botones
- Offset del tail configurable
- Cierre al hacer click fuera (opcional)
- Ancho adaptativo según contenido y botones

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-tooltip--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-tooltip--default
- **Código fuente:** `vendor/ubits/packages/components/tooltip/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/tooltip/src/types/TooltipOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Tooltip.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-tooltip--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-tooltip--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-tooltip--default

**Descripción:**
Tooltip con todos los controles disponibles. Permite configurar título, descripción, tamaño, posición del tail, botones y comportamiento de cierre.

**Características mostradas:**
- Título y descripción configurables
- Tamaño configurable (sm, md, lg)
- Posición del tail configurable (top, bottom, left, right)
- Offset del tail configurable
- Botones de acción configurables (primary, secondary, tertiary)
- Iconos opcionales en botones
- Cierre al hacer click fuera configurable

**Código de ejemplo:**
```javascript
window.createTooltip({
  targetElement: document.getElementById('target-button'),
  title: 'Título del tooltip',
  description: 'Descripción o mensaje del tooltip',
  width: 'md',
  tailPosition: 'top',
  tailOffset: 0,
  showPrimaryButton: true,
  primaryButtonLabel: 'Aceptar',
  closeOnOutsideClick: true
});
```

**Opciones utilizadas en la historia Default:**
- `title`: Título del tooltip
- `description`: Descripción del tooltip
- `width`: `'md'` - Tamaño mediano
- `tailPosition`: `'top'` - Tail arriba
- `showTitle`: `true` - Mostrar título
- `showDescription`: `true` - Mostrar descripción

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `targetElement` | `HTMLElement` | - | Elemento al que se ancla el tooltip (requerido) |
| `title` | `string` | - | Título del tooltip (opcional) |
| `showTitle` | `boolean` | `true` | Mostrar título |
| `description` | `string` | - | Descripción o mensaje del tooltip (opcional) |
| `showDescription` | `boolean` | `true` | Mostrar descripción |
| `width` | `string` | `'md'` | Tamaño del tooltip. Opciones: `sm` (120-240px), `md` (160-320px), `lg` (200-400px) |
| `tailPosition` | `string` | `'top'` | Posición del tail (flecha). Opciones: `top`, `bottom`, `left`, `right` |
| `tailOffset` | `number` | `0` | Offset del tail desde el centro (en píxeles) |
| `showPrimaryButton` | `boolean` | `false` | Mostrar botón primario |
| `primaryButtonLabel` | `string` | - | Texto del botón primario |
| `primaryButtonIcon` | `string` | - | Nombre del icono FontAwesome para el botón primario |
| `showPrimaryButtonIcon` | `boolean` | `false` | Mostrar icono en el botón primario |
| `showSecondaryButton` | `boolean` | `false` | Mostrar botón secundario |
| `secondaryButtonLabel` | `string` | - | Texto del botón secundario |
| `secondaryButtonIcon` | `string` | - | Nombre del icono FontAwesome para el botón secundario |
| `showSecondaryButtonIcon` | `boolean` | `false` | Mostrar icono en el botón secundario |
| `showTertiaryButton` | `boolean` | `false` | Mostrar botón terciario |
| `tertiaryButtonLabel` | `string` | - | Texto del botón terciario |
| `tertiaryButtonIcon` | `string` | - | Nombre del icono FontAwesome para el botón terciario |
| `showTertiaryButtonIcon` | `boolean` | `false` | Mostrar icono en el botón terciario |
| `open` | `boolean` | `false` | Si el tooltip está abierto inicialmente |
| `closeOnOutsideClick` | `boolean` | `true` | Si se debe cerrar al hacer clic fuera del tooltip |
| `onClose` | `function` | - | Callback que se ejecuta cuando el tooltip se cierra |
| `onPrimaryButtonClick` | `function` | - | Callback del botón primario |
| `onSecondaryButtonClick` | `function` | - | Callback del botón secundario |
| `onTertiaryButtonClick` | `function` | - | Callback del botón terciario |

---

## 🎨 Tamaños y Anchos

### Tamaños

- **`sm`**: 
  - Min-width: 120px
  - Max-width: 240px
  - Botones: tamaño `xs`

- **`md`**: 
  - Min-width: 160px
  - Max-width: 320px
  - Botones: tamaño `sm`
  - Default

- **`lg`**: 
  - Min-width: 200px
  - Max-width: 400px
  - Botones: tamaño `md`

### Ajuste Automático de Ancho

El ancho se ajusta automáticamente según:
- **3 botones visibles:** mínimo 420px
- **2 botones visibles:** mínimo 360px
- **1 botón o sin botones:** según tamaño (sm/md/lg)

---

## 📍 Posiciones del Tail

- **`top`**: Tail arriba (default)
- **`bottom`**: Tail abajo
- **`left`**: Tail a la izquierda
- **`right`**: Tail a la derecha

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Tooltip Básico

```javascript
const button = document.getElementById('info-button');
window.createTooltip({
  targetElement: button,
  title: 'Información',
  description: 'Este es un tooltip básico con información adicional.',
  width: 'md',
  tailPosition: 'top'
});
```

### Ejemplo 2: Tooltip Solo con Descripción

```javascript
const icon = document.getElementById('help-icon');
window.createTooltip({
  targetElement: icon,
  showTitle: false,
  description: 'Texto de ayuda contextual',
  width: 'sm',
  tailPosition: 'right'
});
```

### Ejemplo 3: Tooltip con Botón Primario

```javascript
const actionButton = document.getElementById('action-button');
window.createTooltip({
  targetElement: actionButton,
  title: 'Confirmar acción',
  description: '¿Estás seguro de que deseas continuar?',
  width: 'md',
  tailPosition: 'bottom',
  showPrimaryButton: true,
  primaryButtonLabel: 'Confirmar',
  onPrimaryButtonClick: () => {
    console.log('Acción confirmada');
  }
});
```

### Ejemplo 4: Tooltip con Múltiples Botones

```javascript
const deleteButton = document.getElementById('delete-button');
window.createTooltip({
  targetElement: deleteButton,
  title: 'Eliminar elemento',
  description: 'Esta acción no se puede deshacer.',
  width: 'lg',
  tailPosition: 'top',
  showPrimaryButton: true,
  primaryButtonLabel: 'Eliminar',
  primaryButtonIcon: 'trash',
  showPrimaryButtonIcon: true,
  showSecondaryButton: true,
  secondaryButtonLabel: 'Cancelar',
  onPrimaryButtonClick: () => {
    deleteItem();
  },
  onSecondaryButtonClick: () => {
    // Cerrar tooltip
  }
});
```

### Ejemplo 5: Tooltip con Tail Offset

```javascript
const button = document.getElementById('button');
window.createTooltip({
  targetElement: button,
  title: 'Tooltip con offset',
  description: 'El tail está desplazado desde el centro.',
  width: 'md',
  tailPosition: 'top',
  tailOffset: 20 // 20px desde el centro
});
```

### Ejemplo 6: Tooltip que No se Cierra con Click Fuera

```javascript
const importantButton = document.getElementById('important-button');
window.createTooltip({
  targetElement: importantButton,
  title: 'Información importante',
  description: 'Lee esto antes de continuar.',
  width: 'md',
  tailPosition: 'bottom',
  closeOnOutsideClick: false, // No cerrar al hacer click fuera
  showPrimaryButton: true,
  primaryButtonLabel: 'Entendido',
  onPrimaryButtonClick: () => {
    // Cerrar manualmente
  }
});
```

### Ejemplo 7: Tooltip Grande con Todo

```javascript
const complexButton = document.getElementById('complex-button');
window.createTooltip({
  targetElement: complexButton,
  title: 'Título del tooltip',
  description: 'Descripción detallada con múltiples líneas de texto para demostrar cómo se adapta el tooltip al contenido.',
  width: 'lg',
  tailPosition: 'right',
  showPrimaryButton: true,
  primaryButtonLabel: 'Aceptar',
  primaryButtonIcon: 'check',
  showPrimaryButtonIcon: true,
  showSecondaryButton: true,
  secondaryButtonLabel: 'Cancelar',
  showTertiaryButton: true,
  tertiaryButtonLabel: 'Más info',
  onPrimaryButtonClick: () => {
    handleAccept();
  },
  onSecondaryButtonClick: () => {
    handleCancel();
  },
  onTertiaryButtonClick: () => {
    showMoreInfo();
  }
});
```

---

## 🔄 Callbacks y Eventos

### onClose

Se ejecuta cuando el tooltip se cierra.

```javascript
onClose: () => {
  console.log('Tooltip cerrado');
  // Limpiar estado, etc.
}
```

### onPrimaryButtonClick

Se ejecuta cuando se hace click en el botón primario.

```javascript
onPrimaryButtonClick: () => {
  console.log('Botón primario clickeado');
  // Ejecutar acción principal
  executeAction();
}
```

### onSecondaryButtonClick

Se ejecuta cuando se hace click en el botón secundario.

```javascript
onSecondaryButtonClick: () => {
  console.log('Botón secundario clickeado');
  // Ejecutar acción secundaria
}
```

### onTertiaryButtonClick

Se ejecuta cuando se hace click en el botón terciario.

```javascript
onTertiaryButtonClick: () => {
  console.log('Botón terciario clickeado');
  // Ejecutar acción terciaria
}
```

---

## 🎨 Características Visuales

### Tail (Flecha)

- Apunta al elemento target
- Posición configurable (top, bottom, left, right)
- Offset configurable desde el centro
- Color y estilo según el tema

### Ancho Adaptativo

- Se ajusta automáticamente al contenido
- Respeta min-width y max-width según tamaño
- Se expande si hay múltiples botones

### Botones

- Tamaño de botones según tamaño del tooltip:
  - `sm` → botones `xs`
  - `md` → botones `sm`
  - `lg` → botones `md`
- Iconos opcionales en cada botón

---

## 🚨 Errores Comunes

### Error 1: No Proporcionar targetElement
**Problema:** Crear tooltip sin elemento target  
**Solución:** Siempre proporcionar un `targetElement` válido

```javascript
// ❌ Incorrecto
window.createTooltip({
  title: 'Tooltip',
  description: 'Mensaje'
  // Falta targetElement
});

// ✅ Correcto
const button = document.getElementById('button');
window.createTooltip({
  targetElement: button,
  title: 'Tooltip',
  description: 'Mensaje'
});
```

### Error 2: Usar Iconos sin Nombre Correcto
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
primaryButtonIcon: 'fa-check'

// ✅ Correcto
primaryButtonIcon: 'check'
```

### Error 3: Tooltip Fuera de Viewport
**Problema:** Tooltip se posiciona fuera de la pantalla  
**Solución:** El componente ajusta automáticamente, pero verificar posición del tail

```javascript
// Si el tooltip se sale por arriba, cambiar tailPosition
tailPosition: 'bottom' // En lugar de 'top'
```

### Error 4: No Cerrar Tooltip Manualmente
**Problema:** Tooltip permanece abierto después de acciones  
**Solución:** Cerrar tooltip manualmente en los callbacks

```javascript
let tooltipInstance = null;

tooltipInstance = window.createTooltip({
  targetElement: button,
  title: 'Tooltip',
  showPrimaryButton: true,
  primaryButtonLabel: 'Aceptar',
  onPrimaryButtonClick: () => {
    // Cerrar tooltip después de la acción
    if (tooltipInstance && tooltipInstance.close) {
      tooltipInstance.close();
    }
  }
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

