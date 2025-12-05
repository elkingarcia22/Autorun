# 📦 Timeline

> **Componente UBITS:** `layout-timeline`  
> **Categoría:** Layout  
> **API:** `window.createTimeline()` o `<ubits-timeline>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-timeline--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-timeline--default

## 🎯 Descripción

Componente Timeline UBITS para mostrar secuencias de eventos o fases. Soporta avatar, fecha, título, descripción, iconos y alineación izquierda o centrada. Usa tokens UBITS.

**Características principales:**
- 2 estados de marcador: default (vacío) y filled (relleno)
- Avatar opcional en cada item (mutuamente excluyente con icono)
- Icono opcional en el marcador (mutuamente excluyente con avatar)
- Fecha opcional por item
- Título y descripción configurables
- 2 alineaciones: left, center
- Línea vertical conectando los items
- Callbacks opcionales por item

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-timeline--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-timeline--default
- **Código fuente:** `vendor/ubits/packages/components/timeline/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/timeline/src/types/TimelineOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Timeline.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-timeline--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-timeline--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-timeline--default

**Descripción:**
Timeline con todos los controles disponibles. Permite configurar avatar, fecha, descripción, icono, alineación y cantidad de items rellenos.

**Características mostradas:**
- Avatar opcional (mutuamente excluyente con icono)
- Fecha opcional
- Descripción opcional
- Icono opcional (mutuamente excluyente con avatar)
- Alineación configurable (left, center)
- Items con estado filled/default

**Código de ejemplo:**
```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      date: 'Mar 15, 2024',
      title: 'Project Kickoff',
      description: 'Initial team meeting and project scope definition.',
      state: 'filled',
      avatar: {
        imageUrl: '/images/user.jpg'
      }
    },
    {
      date: 'Mar 22, 2024',
      title: 'Design Phase',
      description: 'Completed wireframes and user interface mockups.',
      state: 'default',
      icon: 'paint-brush'
    }
  ],
  showAvatar: false,
  showDate: true,
  showDescription: true,
  showIcon: true,
  alignment: 'left',
  onItemClick: (item, index) => {
    console.log('Item clickeado:', item, index);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `showAvatar`: `false` - Sin avatar por defecto
- `showDate`: `true` - Mostrar fecha
- `showDescription`: `true` - Mostrar descripción
- `showIcon`: `true` - Mostrar icono
- `alignment`: `'left'` - Alineación izquierda
- `filledItems`: `2` - 2 items con estado filled

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el timeline |
| `items` | `TimelineItem[]` | - | Array de items del timeline (requerido) |
| `showAvatar` | `boolean` | `false` | Mostrar avatar en cada item (mutuamente excluyente con icono) |
| `showDate` | `boolean` | `true` | Mostrar fecha en cada item |
| `showDescription` | `boolean` | `true` | Mostrar descripción en cada item |
| `showIcon` | `boolean` | `true` | Mostrar icono en el marcador (mutuamente excluyente con avatar) |
| `alignment` | `string` | `'left'` | Alineación del contenido del texto. Opciones: `left`, `center` |
| `onItemClick` | `function` | - | Callback que se ejecuta cuando se hace click en un item |

### Estructura de TimelineItem

```typescript
interface TimelineItem {
  date?: string;                    // Fecha del evento (opcional)
  title: string;                    // Título del evento (requerido)
  description?: string;             // Descripción del evento (opcional)
  state?: 'default' | 'filled';     // Estado del marcador (opcional)
  avatar?: {                        // Avatar del item (opcional)
    imageUrl?: string;              // URL de la imagen
    initials?: string;              // Iniciales
    icon?: string;                  // Icono FontAwesome
  };
  icon?: string;                    // Icono FontAwesome para el marcador (opcional)
}
```

### Estados del Marcador

- **`default`**: Círculo vacío (borde) - default
- **`filled`**: Círculo relleno

---

## 🎨 Alineaciones

### Alineación Izquierda

Contenido alineado a la izquierda.

```javascript
alignment: 'left'
```

### Alineación Centrada

Contenido centrado.

```javascript
alignment: 'center'
```

**Nota:** La línea vertical siempre está a la izquierda, solo el contenido del texto se alinea.

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Timeline Básico

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      title: 'Evento 1',
      state: 'filled'
    },
    {
      title: 'Evento 2',
      state: 'default'
    }
  ]
});
```

### Ejemplo 2: Timeline con Fechas

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      date: '15 Mar 2024',
      title: 'Project Kickoff',
      state: 'filled'
    },
    {
      date: '22 Mar 2024',
      title: 'Design Phase',
      state: 'default'
    }
  ],
  showDate: true
});
```

### Ejemplo 3: Timeline con Descripciones

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      date: '15 Mar 2024',
      title: 'Project Kickoff',
      description: 'Initial team meeting and project scope definition.',
      state: 'filled'
    },
    {
      date: '22 Mar 2024',
      title: 'Design Phase',
      description: 'Completed wireframes and user interface mockups.',
      state: 'default'
    }
  ],
  showDescription: true
});
```

### Ejemplo 4: Timeline con Iconos

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      date: '15 Mar 2024',
      title: 'Project Kickoff',
      icon: 'circle',
      state: 'filled'
    },
    {
      date: '22 Mar 2024',
      title: 'Design Phase',
      icon: 'paint-brush',
      state: 'default'
    }
  ],
  showIcon: true
});
```

### Ejemplo 5: Timeline con Avatares

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      date: '15 Mar 2024',
      title: 'Project Kickoff',
      avatar: {
        imageUrl: '/images/user1.jpg'
      },
      state: 'filled'
    },
    {
      date: '22 Mar 2024',
      title: 'Design Phase',
      avatar: {
        initials: 'JD'
      },
      state: 'default'
    }
  ],
  showAvatar: true,
  showIcon: false // Desactivar icono cuando se usa avatar
});
```

### Ejemplo 6: Timeline Centrado

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      date: '15 Mar 2024',
      title: 'Evento 1',
      state: 'filled'
    },
    {
      date: '22 Mar 2024',
      title: 'Evento 2',
      state: 'default'
    }
  ],
  alignment: 'center'
});
```

### Ejemplo 7: Timeline sin Fechas

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      title: 'Evento 1',
      state: 'filled'
    },
    {
      title: 'Evento 2',
      state: 'default'
    }
  ],
  showDate: false
});
```

### Ejemplo 8: Timeline sin Descripciones

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      date: '15 Mar 2024',
      title: 'Evento 1',
      state: 'filled'
    },
    {
      date: '22 Mar 2024',
      title: 'Evento 2',
      state: 'default'
    }
  ],
  showDescription: false
});
```

### Ejemplo 9: Timeline Completo

```javascript
window.createTimeline({
  containerId: 'timeline-container',
  items: [
    {
      date: '15 Mar 2024',
      title: 'Project Kickoff',
      description: 'Initial team meeting and project scope definition.',
      state: 'filled',
      avatar: {
        imageUrl: '/images/user1.jpg'
      }
    },
    {
      date: '22 Mar 2024',
      title: 'Design Phase',
      description: 'Completed wireframes and user interface mockups.',
      state: 'filled',
      icon: 'paint-brush'
    },
    {
      date: '5 Apr 2024',
      title: 'Development Sprint',
      description: 'Backend API implementation in progress.',
      state: 'default',
      icon: 'code'
    }
  ],
  showAvatar: true,
  showDate: true,
  showDescription: true,
  showIcon: false, // Desactivado cuando se usa avatar
  alignment: 'left',
  onItemClick: (item, index) => {
    console.log('Item clickeado:', item, index);
    showEventDetails(item);
  }
});
```

### Ejemplo 10: Timeline Dinámico

```javascript
let timelineItems = [
  {
    date: '15 Mar 2024',
    title: 'Project Kickoff',
    state: 'filled'
  },
  {
    date: '22 Mar 2024',
    title: 'Design Phase',
    state: 'default'
  }
];

function updateTimeline() {
  window.createTimeline({
    containerId: 'timeline-container',
    items: timelineItems,
    showDate: true,
    showDescription: true,
    onItemClick: (item, index) => {
      // Marcar como completado
      timelineItems[index].state = 'filled';
      updateTimeline();
    }
  });
}

// Agregar nuevo evento
function addEvent(date, title) {
  timelineItems.push({
    date,
    title,
    state: 'default'
  });
  updateTimeline();
}

// Inicializar
updateTimeline();
```

---

## 🔄 Callbacks y Eventos

### onItemClick

Se ejecuta cuando se hace click en un item del timeline.

```javascript
onItemClick: (item, index) => {
  console.log('Item clickeado:', item);
  console.log('Índice:', index);
  // Mostrar detalles
  showEventDetails(item);
  
  // Navegar a detalle
  navigateToEvent(item.id);
  
  // Actualizar estado
  markAsCompleted(index);
}
```

**Parámetros:**
- `item` (TimelineItem): Item clickeado
- `index` (number): Índice del item (0-indexed)

---

## 🎨 Características Visuales

### Línea Vertical

- Conecta todos los items del timeline
- Siempre a la izquierda
- Color según tokens UBITS

### Marcador

- Círculo en la línea vertical
- **Default:** Círculo vacío (solo borde)
- **Filled:** Círculo relleno
- Tamaño fijo según tokens UBITS

### Avatar vs Icono

- **Avatar:** Se muestra en lugar del marcador cuando `showAvatar: true`
- **Icono:** Se muestra en el marcador cuando `showIcon: true`
- Son mutuamente excluyentes (no se pueden usar ambos)

### Contenido

- Fecha arriba (si está activa)
- Título destacado
- Descripción debajo (si está activa)
- Alineación configurable (left, center)

---

## 🚨 Errores Comunes

### Error 1: Avatar e Icono Simultáneos
**Problema:** Activar `showAvatar` y `showIcon` al mismo tiempo  
**Solución:** Son mutuamente excluyentes, usar solo uno

```javascript
// ❌ Incorrecto - ambos activos
showAvatar: true,
showIcon: true

// ✅ Correcto - solo uno activo
showAvatar: true,
showIcon: false
// O
showAvatar: false,
showIcon: true
```

### Error 2: Items sin Título
**Problema:** Items sin título  
**Solución:** Cada item debe tener un título

```javascript
// ❌ Incorrecto - sin título
items: [
  { date: '15 Mar 2024' } // Falta title
]

// ✅ Correcto - con título
items: [
  { date: '15 Mar 2024', title: 'Evento 1' }
]
```

### Error 3: Avatar sin Datos
**Problema:** Activar `showAvatar` sin proporcionar datos de avatar  
**Solución:** Proporcionar avatar en los items cuando se activa `showAvatar`

```javascript
// ❌ Incorrecto - avatar sin datos
showAvatar: true,
items: [
  { title: 'Evento 1' } // Falta avatar
]

// ✅ Correcto - avatar con datos
showAvatar: true,
items: [
  {
    title: 'Evento 1',
    avatar: {
      imageUrl: '/images/user.jpg'
    }
  }
]
```

### Error 4: Icono sin Nombre
**Problema:** Activar `showIcon` sin proporcionar iconos en items  
**Solución:** Proporcionar `icon` en los items cuando se activa `showIcon`

```javascript
// ❌ Incorrecto - icono sin nombre
showIcon: true,
items: [
  { title: 'Evento 1' } // Falta icon
]

// ✅ Correcto - icono con nombre
showIcon: true,
items: [
  {
    title: 'Evento 1',
    icon: 'circle'
  }
]
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Avatar](./bsicos-avatar.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

