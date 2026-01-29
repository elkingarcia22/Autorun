# 📦 Accordion

> **Componente UBITS:** `layout-accordion`  
> **Categoría:** Layout  
> **API:** `window.createAccordion()` o `<ubits-accordion>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-accordion--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-accordion--default

## 🎯 Descripción

Componente Accordion UBITS con múltiples variantes: lista simple, tipo caja, chevron izquierda/derecha, iconos opcionales y sub-headers.

**Características principales:**
- 2 variantes: list, boxed
- 2 posiciones de chevron: left, right
- Múltiples items abiertos simultáneamente (opcional)
- Iconos opcionales en items
- Sub-headers opcionales
- Animación suave de apertura/cierre
- Contenido HTML personalizado

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-accordion--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-accordion--default
- **Código fuente:** `vendor/ubits/packages/components/accordion/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/accordion/src/types/AccordionOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Accordion.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Interactive - All Controls

**ID en Storybook:** `layout-accordion--interactive-all-controls`  
**URL Local:** http://localhost:6006/?path=/story/layout-accordion--interactive-all-controls  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-accordion--interactive-all-controls

**Descripción:**
Accordion con todos los controles disponibles. Permite configurar variante, posición del chevron, múltiples items abiertos e iconos.

**Características mostradas:**
- Variante configurable (list, boxed)
- Posición del chevron configurable (left, right)
- Múltiples items abiertos configurable
- Iconos opcionales
- Sub-headers opcionales

**Código de ejemplo:**
```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'What makes coss ui different?',
      content: 'coss ui focuses on developer experience and performance...',
      icon: 'command',
      iconStyle: 'regular'
    },
    {
      id: '2',
      title: 'How can I customize the components?',
      content: 'You can customize components using CSS variables...',
      icon: 'moon',
      iconStyle: 'regular'
    }
  ],
  variant: 'list',
  chevronPosition: 'right',
  allowMultiple: false,
  showIcons: true
});
```

**Opciones utilizadas en la historia Interactive:**
- `variant`: `'list'` - Variante lista
- `chevronPosition`: `'right'` - Chevron a la derecha
- `allowMultiple`: `false` - Solo un item abierto a la vez
- `showIcons`: `true` - Mostrar iconos

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el accordion |
| `items` | `AccordionItem[]` | - | Array de items del accordion (requerido) |
| `variant` | `string` | `'list'` | Variante del accordion. Opciones: `list`, `boxed` |
| `chevronPosition` | `string` | `'right'` | Posición del chevron. Opciones: `left`, `right` |
| `allowMultiple` | `boolean` | `false` | Permitir múltiples items abiertos simultáneamente |
| `showIcons` | `boolean` | `true` | Mostrar u ocultar iconos en los items |

### Estructura de AccordionItem

```typescript
interface AccordionItem {
  id: string;              // ID único del item
  title: string;          // Título del item
  subHeader?: string;     // Sub-header opcional (texto secundario)
  content: string;        // Contenido HTML del item
  icon?: string;          // Nombre del icono FontAwesome (opcional)
  iconStyle?: string;     // Estilo del icono: 'regular', 'solid', etc. (opcional)
  defaultOpen?: boolean;  // Si el item está abierto por defecto (opcional)
}
```

---

## 🎨 Variantes

### Variante List

Lista simple sin bordes de caja.

```javascript
variant: 'list'
```

### Variante Boxed

Items con bordes tipo caja.

```javascript
variant: 'boxed'
```

---

## 📍 Posiciones del Chevron

- **`left`**: Chevron a la izquierda
- **`right`**: Chevron a la derecha - default

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Accordion Básico

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Pregunta 1',
      content: 'Respuesta a la pregunta 1'
    },
    {
      id: '2',
      title: 'Pregunta 2',
      content: 'Respuesta a la pregunta 2'
    }
  ]
});
```

### Ejemplo 2: Accordion con Iconos

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Configuración',
      content: 'Opciones de configuración...',
      icon: 'cog',
      iconStyle: 'regular'
    },
    {
      id: '2',
      title: 'Ayuda',
      content: 'Información de ayuda...',
      icon: 'question-circle',
      iconStyle: 'regular'
    }
  ],
  showIcons: true
});
```

### Ejemplo 3: Accordion con Sub-headers

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Cuentas conectadas',
      subHeader: 'Gestiona tus cuentas vinculadas',
      content: 'Conecta tus cuentas de Google, GitHub o Microsoft...'
    },
    {
      id: '2',
      title: 'Notificaciones',
      subHeader: 'Personaliza tus preferencias de notificaciones',
      content: 'Configura cómo y cuándo recibes notificaciones...'
    }
  ]
});
```

### Ejemplo 4: Accordion Boxed

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Sección 1',
      content: 'Contenido de la sección 1'
    },
    {
      id: '2',
      title: 'Sección 2',
      content: 'Contenido de la sección 2'
    }
  ],
  variant: 'boxed'
});
```

### Ejemplo 5: Accordion con Chevron Izquierda

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Item 1',
      content: 'Contenido 1'
    }
  ],
  chevronPosition: 'left'
});
```

### Ejemplo 6: Accordion con Múltiples Items Abiertos

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Item 1',
      content: 'Contenido 1',
      defaultOpen: true
    },
    {
      id: '2',
      title: 'Item 2',
      content: 'Contenido 2',
      defaultOpen: true
    }
  ],
  allowMultiple: true // Permitir múltiples abiertos
});
```

### Ejemplo 7: Accordion sin Iconos

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Item 1',
      content: 'Contenido 1'
    }
  ],
  showIcons: false
});
```

### Ejemplo 8: Accordion con Contenido HTML

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Información detallada',
      content: `
        <div>
          <h3>Subtítulo</h3>
          <p>Párrafo con <strong>texto en negrita</strong>.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      `
    }
  ]
});
```

### Ejemplo 9: Accordion Completo

```javascript
window.createAccordion({
  containerId: 'accordion-container',
  items: [
    {
      id: '1',
      title: 'Configuración',
      subHeader: 'Ajustes generales',
      content: 'Configura las opciones generales de la aplicación...',
      icon: 'cog',
      iconStyle: 'regular',
      defaultOpen: true
    },
    {
      id: '2',
      title: 'Seguridad',
      subHeader: 'Configuración de seguridad',
      content: 'Gestiona la seguridad de tu cuenta...',
      icon: 'shield',
      iconStyle: 'regular'
    }
  ],
  variant: 'boxed',
  chevronPosition: 'right',
  allowMultiple: false,
  showIcons: true
});
```

---

## 🔄 Callbacks y Eventos

El accordion maneja internamente los eventos de apertura/cierre. Los items pueden tener `defaultOpen: true` para estar abiertos inicialmente.

---

## 🎨 Características Visuales

### Animación

- **Apertura:** Expansión suave del contenido
- **Cierre:** Contracción suave del contenido
- **Transiciones:** Suaves y fluidas

### Variante List

- Sin bordes de caja
- Separación visual entre items
- Estilo minimalista

### Variante Boxed

- Bordes tipo caja en cada item
- Fondo diferenciado
- Estilo más destacado

### Iconos

- Se muestran a la izquierda del título
- Tamaño según tokens UBITS
- Estilos: regular, solid, etc.

### Sub-headers

- Texto secundario debajo del título
- Color más suave que el título
- Tipografía más pequeña

---

## 🚨 Errores Comunes

### Error 1: Items sin IDs Únicos
**Problema:** Múltiples items con el mismo ID  
**Solución:** Cada item debe tener un ID único

```javascript
// ❌ Incorrecto - IDs duplicados
items: [
  { id: '1', title: 'Item 1' },
  { id: '1', title: 'Item 2' } // ID duplicado
]

// ✅ Correcto - IDs únicos
items: [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' }
]
```

### Error 2: allowMultiple con defaultOpen en Múltiples Items
**Problema:** Usar `allowMultiple: false` con múltiples items `defaultOpen: true`  
**Solución:** Solo un item puede estar abierto si `allowMultiple: false`

```javascript
// ❌ Incorrecto - múltiples abiertos sin allowMultiple
allowMultiple: false,
items: [
  { id: '1', defaultOpen: true },
  { id: '2', defaultOpen: true } // Se cerrará automáticamente
]

// ✅ Correcto - solo uno abierto
allowMultiple: false,
items: [
  { id: '1', defaultOpen: true },
  { id: '2', defaultOpen: false }
]
```

### Error 3: Usar Iconos con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
icon: 'fa-cog'

// ✅ Correcto
icon: 'cog'
```

### Error 4: Contenido Vacío
**Problema:** Items sin contenido  
**Solución:** Siempre proporcionar contenido para cada item

```javascript
// ❌ Incorrecto - sin contenido
items: [
  { id: '1', title: 'Item 1', content: '' }
]

// ✅ Correcto - con contenido
items: [
  { id: '1', title: 'Item 1', content: 'Contenido del item' }
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

