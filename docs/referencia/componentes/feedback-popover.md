# 📦 Popover

> **Componente UBITS:** `feedback-popover`  
> **Categoría:** Feedback  
> **API:** `window.createPopover()` o `<ubits-popover>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-popover--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-popover--default

## 🎯 Descripción

Componente Popover UBITS con tail (flecha) para mostrar información contextual. Similar al modal pero más pequeño y con tail. Se usa para mostrar información adicional, tooltips avanzados o acciones contextuales. Soporta diferentes tamaños, posiciones de tail, header opcional, body con scroll personalizado y footer con botones opcionales.

**Características principales:**
- 4 tamaños: sm (240px), md (360px), lg (400px), xl (480px)
- 4 posiciones de tail: top, bottom, left, right
- Header opcional con título
- Body con contenido HTML personalizado
- Footer con botones opcionales (primary, secondary, tertiary)
- Cierre al hacer click fuera (opcional)
- Offset del tail configurable

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-popover--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-popover--default
- **Código fuente:** `vendor/ubits/packages/components/popover/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/popover/src/types/PopoverOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Popover.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-popover--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-popover--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-popover--default

**Descripción:**
Popover con todos los controles disponibles. Permite configurar título, contenido, tamaño, posición del tail, botones del footer y comportamiento de cierre.

**Características mostradas:**
- Título configurable
- Contenido HTML personalizado
- Tamaño configurable (sm, md, lg, xl)
- Posición del tail configurable (top, bottom, left, right)
- Offset del tail configurable
- Botones del footer configurables (primary, secondary, tertiary)
- Cierre al hacer click fuera configurable

**Código de ejemplo:**
```javascript
window.createPopover({
  targetElement: document.getElementById('trigger-button'),
  title: 'Title',
  bodyContent: '<p>Contenido del popover</p>',
  width: 'md',
  tailPosition: 'top',
  tailOffset: 0,
  footerButtons: {
    primary: {
      enabled: true,
      label: 'Primary',
      onClick: () => {
        console.log('Primary clicked');
      }
    },
    secondary: {
      enabled: true,
      label: 'Secondary',
      onClick: () => {
        console.log('Secondary clicked');
      }
    },
    tertiary: {
      enabled: true,
      label: 'Tertiary',
      onClick: () => {
        console.log('Tertiary clicked');
      }
    }
  },
  open: true,
  closeOnOutsideClick: true,
  onClose: () => {
    console.log('Popover cerrado');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Title'` - Título del popover
- `bodyContent`: Contenido HTML del cuerpo
- `width`: `'md'` - Ancho mediano (360px)
- `tailPosition`: `'top'` - Tail arriba
- `footerButtons`: Botones del footer habilitados

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `targetElement` | `HTMLElement` | - | Elemento al que se ancla el popover (requerido) |
| `title` | `string` | - | Título del popover (opcional) |
| `bodyContent` | `string \| function` | - | Contenido HTML del cuerpo del popover. Puede ser una cadena HTML o una función que devuelve HTML |
| `width` | `string` | `'md'` | Ancho del popover. Opciones: `sm` (240px), `md` (360px), `lg` (400px), `xl` (480px) |
| `tailPosition` | `string` | `'top'` | Posición del tail (flecha). Opciones: `top`, `bottom`, `left`, `right` |
| `tailOffset` | `number` | `0` | Offset horizontal del tail desde el centro (en píxeles) |
| `footerButtons` | `object` | - | Botones del footer (opcional) |
| `open` | `boolean` | `false` | Si el popover está abierto inicialmente |
| `closeOnOutsideClick` | `boolean` | `true` | Si se debe cerrar al hacer clic fuera del popover |
| `onClose` | `function` | - | Callback que se ejecuta cuando el popover se cierra |

### Estructura de footerButtons

```typescript
interface FooterButtons {
  primary?: {
    enabled: boolean;
    label: string;
    onClick: () => void;
  };
  secondary?: {
    enabled: boolean;
    label: string;
    onClick: () => void;
  };
  tertiary?: {
    enabled: boolean;
    label: string;
    onClick: () => void;
  };
}
```

---

## 🎨 Tamaños y Anchos

### Tamaños

- **`sm`**: Pequeño (240px)
- **`md`**: Mediano (360px) - default
- **`lg`**: Grande (400px)
- **`xl`**: Extra grande (480px)

---

## 📍 Posiciones del Tail

- **`top`**: Tail arriba (default)
- **`bottom`**: Tail abajo
- **`left`**: Tail a la izquierda
- **`right`**: Tail a la derecha

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Popover Básico

```javascript
const button = document.getElementById('info-button');
window.createPopover({
  targetElement: button,
  title: 'Información',
  bodyContent: '<p>Este es un popover básico con información adicional.</p>',
  width: 'md',
  tailPosition: 'top'
});
```

### Ejemplo 2: Popover sin Título

```javascript
const icon = document.getElementById('help-icon');
window.createPopover({
  targetElement: icon,
  bodyContent: '<p>Texto de ayuda contextual sin título.</p>',
  width: 'sm',
  tailPosition: 'right'
});
```

### Ejemplo 3: Popover con Botones del Footer

```javascript
const actionButton = document.getElementById('action-button');
window.createPopover({
  targetElement: actionButton,
  title: 'Confirmar acción',
  bodyContent: '<p>¿Estás seguro de que deseas continuar?</p>',
  width: 'md',
  tailPosition: 'bottom',
  footerButtons: {
    primary: {
      enabled: true,
      label: 'Confirmar',
      onClick: () => {
        console.log('Acción confirmada');
        executeAction();
      }
    },
    secondary: {
      enabled: true,
      label: 'Cancelar',
      onClick: () => {
        console.log('Acción cancelada');
      }
    }
  }
});
```

### Ejemplo 4: Popover Grande con Contenido Complejo

```javascript
const complexButton = document.getElementById('complex-button');
window.createPopover({
  targetElement: complexButton,
  title: 'Detalles',
  bodyContent: `
    <div>
      <h3>Información detallada</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  `,
  width: 'xl',
  tailPosition: 'top',
  footerButtons: {
    primary: {
      enabled: true,
      label: 'Aceptar',
      onClick: () => {
        handleAccept();
      }
    }
  }
});
```

### Ejemplo 5: Popover con Tail Offset

```javascript
const button = document.getElementById('button');
window.createPopover({
  targetElement: button,
  title: 'Popover con offset',
  bodyContent: '<p>El tail está desplazado desde el centro.</p>',
  width: 'md',
  tailPosition: 'top',
  tailOffset: 20 // 20px desde el centro
});
```

### Ejemplo 6: Popover que No se Cierra con Click Fuera

```javascript
const importantButton = document.getElementById('important-button');
window.createPopover({
  targetElement: importantButton,
  title: 'Información importante',
  bodyContent: '<p>Lee esto antes de continuar.</p>',
  width: 'md',
  tailPosition: 'bottom',
  closeOnOutsideClick: false, // No cerrar al hacer click fuera
  footerButtons: {
    primary: {
      enabled: true,
      label: 'Entendido',
      onClick: () => {
        // Cerrar manualmente
        popoverInstance.close();
      }
    }
  }
});
```

### Ejemplo 7: Popover con Contenido Dinámico

```javascript
const dynamicButton = document.getElementById('dynamic-button');
window.createPopover({
  targetElement: dynamicButton,
  title: 'Contenido dinámico',
  bodyContent: () => {
    // Generar contenido dinámicamente
    const items = getItems();
    return `
      <ul>
        ${items.map(item => `<li>${item.name}</li>`).join('')}
      </ul>
    `;
  },
  width: 'md',
  tailPosition: 'top'
});
```

### Ejemplo 8: Popover Pequeño

```javascript
const smallButton = document.getElementById('small-button');
window.createPopover({
  targetElement: smallButton,
  bodyContent: '<p>Mensaje breve.</p>',
  width: 'sm',
  tailPosition: 'right'
});
```

---

## 🔄 Callbacks y Eventos

### onClose

Se ejecuta cuando el popover se cierra.

```javascript
onClose: () => {
  console.log('Popover cerrado');
  // Limpiar estado, etc.
  cleanup();
}
```

### onClick de Botones del Footer

Se ejecuta cuando se hace click en los botones del footer.

```javascript
footerButtons: {
  primary: {
    enabled: true,
    label: 'Aceptar',
    onClick: () => {
      console.log('Botón primario clickeado');
      executeAction();
      // El popover se cierra automáticamente después del click
    }
  },
  secondary: {
    enabled: true,
    label: 'Cancelar',
    onClick: () => {
      console.log('Botón secundario clickeado');
      // El popover se cierra automáticamente después del click
    }
  },
  tertiary: {
    enabled: true,
    label: 'Más info',
    onClick: () => {
      console.log('Botón terciario clickeado');
      showMoreInfo();
    }
  }
}
```

---

## 🎨 Características Visuales

### Tail (Flecha)

- Apunta al elemento target
- Posición configurable (top, bottom, left, right)
- Offset configurable desde el centro
- Color y estilo según el tema

### Header

- Título opcional
- Estilo consistente con tokens UBITS
- Se oculta si no hay título

### Body

- Contenido HTML personalizado
- Scroll automático si el contenido es largo
- Estilos según tokens UBITS

### Footer

- Botones opcionales (primary, secondary, tertiary)
- Orden: tertiary (izquierda), secondary y primary (derecha)
- Se oculta si no hay botones habilitados

---

## 🚨 Errores Comunes

### Error 1: No Proporcionar targetElement
**Problema:** Crear popover sin elemento target  
**Solución:** Siempre proporcionar un `targetElement` válido

```javascript
// ❌ Incorrecto
window.createPopover({
  title: 'Popover',
  bodyContent: '<p>Contenido</p>'
  // Falta targetElement
});

// ✅ Correcto
const button = document.getElementById('button');
window.createPopover({
  targetElement: button,
  title: 'Popover',
  bodyContent: '<p>Contenido</p>'
});
```

### Error 2: Popover Fuera de Viewport
**Problema:** Popover se posiciona fuera de la pantalla  
**Solución:** El componente ajusta automáticamente, pero verificar posición del tail

```javascript
// Si el popover se sale por arriba, cambiar tailPosition
tailPosition: 'bottom' // En lugar de 'top'
```

### Error 3: No Cerrar Popover Manualmente
**Problema:** Popover permanece abierto después de acciones  
**Solución:** Cerrar popover manualmente en los callbacks si es necesario

```javascript
let popoverInstance = null;

popoverInstance = window.createPopover({
  targetElement: button,
  title: 'Popover',
  footerButtons: {
    primary: {
      enabled: true,
      label: 'Aceptar',
      onClick: () => {
        // Cerrar popover después de la acción
        if (popoverInstance && popoverInstance.close) {
          popoverInstance.close();
        }
      }
    }
  }
});
```

### Error 4: Contenido HTML Mal Formado
**Problema:** Contenido HTML que rompe el layout  
**Solución:** Asegurar HTML válido y usar estilos UBITS

```javascript
// ❌ Incorrecto - HTML mal formado
bodyContent: '<div><p>Texto</div>'

// ✅ Correcto - HTML válido
bodyContent: '<div><p>Texto</p></div>'

// ✅ Correcto - con estilos UBITS
bodyContent: `
  <p style="margin: 0; font-size: var(--font-body-sm-size, 13px);">
    Texto con estilos UBITS
  </p>
`
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

