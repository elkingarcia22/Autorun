# 📦 HeaderSection

> **Componente UBITS:** `layout-header-section`  
> **Categoría:** Layout  
> **API:** `window.createHeaderSection()` o `<ubits-header-section>`  
> **Storybook Local:** http://localhost:6006/?path=/story/layout-header-section--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-header-section--default

## 🎯 Descripción

Componente HeaderSection UBITS para encabezados de sección con título (heading h2, fg-1-high), botón de información con tooltip (sm), y acciones (botones md). Todos los elementos son apagables/prendibles con controladores.

**Características principales:**
- Título de sección (heading h2)
- Botón de atrás opcional (secundario md)
- Botón de información opcional (sm, tertiary) con tooltip
- Status tag opcional (independiente del título)
- Múltiples acciones configurables (botones md)
- Botón AI opcional
- Botón de opciones opcional (3 puntos) con menú
- Botón secundario adicional opcional
- Callbacks para todas las acciones

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/layout-header-section--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-header-section--default
- **Código fuente:** `vendor/ubits/packages/components/header-section/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/header-section/src/types/HeaderSectionOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/HeaderSection.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `layout-header-section--default`  
**URL Local:** http://localhost:6006/?path=/story/layout-header-section--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/layout-header-section--default

**Descripción:**
HeaderSection con todos los controles disponibles. Permite configurar título, botones, status tag y acciones.

**Características mostradas:**
- Título configurable
- Botón de atrás opcional
- Botón de información opcional con tooltip
- Status tag opcional
- Múltiples acciones configurables
- Botón AI opcional
- Botón de opciones opcional

**Código de ejemplo:**
```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Título de la Sección',
  showBackButton: true,
  showInfoButton: true,
  infoTooltipText: 'Información adicional sobre esta sección',
  showStatusTag: true,
  statusTagLabel: 'En progreso',
  statusTagStatus: 'in-progress',
  showActions: true,
  actions: [
    {
      label: 'Acción 1',
      variant: 'secondary',
      onClick: () => {
        console.log('Acción 1 clickeada');
      }
    },
    {
      label: 'Acción 2',
      variant: 'primary',
      onClick: () => {
        console.log('Acción 2 clickeada');
      }
    }
  ],
  onBackClick: () => {
    console.log('Botón de atrás clickeado');
    navigateBack();
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: Título de la sección
- `showBackButton`: `false` - Sin botón de atrás por defecto
- `showInfoButton`: `false` - Sin botón de información por defecto
- `showStatusTag`: `false` - Sin status tag por defecto
- `showActions`: `true` - Mostrar acciones por defecto

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el header section |
| `title` | `string` | - | Título de la sección (heading h2) |
| `showTitle` | `boolean` | `true` | Mostrar el título (NO afecta al status tag) |
| `showBackButton` | `boolean` | `false` | Mostrar el botón de atrás (secundario md) |
| `showInfoButton` | `boolean` | `false` | Mostrar el botón de información (sm, tertiary) |
| `infoTooltipText` | `string` | - | Texto del tooltip del botón de información |
| `showStatusTag` | `boolean` | `false` | Mostrar el status tag (controlador independiente del título) |
| `statusTagLabel` | `string` | - | Label del status tag |
| `statusTagStatus` | `string` | - | Estado del status tag (ver estados disponibles) |
| `showActions` | `boolean` | `true` | Mostrar todas las acciones (botones md) |
| `actions` | `HeaderSectionAction[]` | - | Array de acciones (botones) |
| `showAIAction` | `boolean` | `true` | Mostrar botón AI (primero en la serie) |
| `showOptionsButton` | `boolean` | `false` | Mostrar botón de opciones (3 puntos) |
| `optionsMenuItems` | `MenuItem[]` | - | Items del menú de opciones |
| `onBackClick` | `function` | - | Callback que se ejecuta cuando se hace click en el botón de atrás |
| `onInfoClick` | `function` | - | Callback que se ejecuta cuando se hace click en el botón de información |

### Estructura de HeaderSectionAction

```typescript
interface HeaderSectionAction {
  label: string;                    // Texto del botón
  variant?: 'primary' | 'secondary' | 'tertiary'; // Variante del botón
  icon?: string;                    // Icono FontAwesome (opcional)
  onClick?: () => void;            // Callback al hacer click
}
```

### Estados de Status Tag

Los mismos 17 estados que el componente Status Tag:
- `completed`, `published`, `fulfilled`, `created`, `active`
- `not-fulfilled`, `denied`, `draft`, `in-progress`, `syncing`
- `pending`, `pending-approval`, `not-started`, `finished`
- `archived`, `disabled`, `paused`, `hidden`

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: HeaderSection Básico

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Mi Sección'
});
```

### Ejemplo 2: HeaderSection con Botón de Atrás

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Detalles del Producto',
  showBackButton: true,
  onBackClick: () => {
    console.log('Volver atrás');
    navigateBack();
  }
});
```

### Ejemplo 3: HeaderSection con Botón de Información

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Configuración',
  showInfoButton: true,
  infoTooltipText: 'Información adicional sobre la configuración',
  onInfoClick: () => {
    console.log('Información clickeada');
    showHelpModal();
  }
});
```

### Ejemplo 4: HeaderSection con Status Tag

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Proyecto en Desarrollo',
  showStatusTag: true,
  statusTagLabel: 'En progreso',
  statusTagStatus: 'in-progress'
});
```

### Ejemplo 5: HeaderSection con Acciones

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Gestión de Usuarios',
  showActions: true,
  actions: [
    {
      label: 'Exportar',
      variant: 'secondary',
      icon: 'download',
      onClick: () => {
        exportUsers();
      }
    },
    {
      label: 'Nuevo Usuario',
      variant: 'primary',
      icon: 'plus',
      onClick: () => {
        createNewUser();
      }
    }
  ]
});
```

### Ejemplo 6: HeaderSection con Botón AI

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Análisis de Datos',
  showAIAction: true,
  onAIClick: () => {
    console.log('Botón AI clickeado');
    openAIAssistant();
  }
});
```

### Ejemplo 7: HeaderSection con Botón de Opciones

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Documento',
  showOptionsButton: true,
  optionsMenuItems: [
    {
      id: 'edit',
      label: 'Editar',
      icon: 'edit',
      onClick: () => {
        editDocument();
      }
    },
    {
      id: 'duplicate',
      label: 'Duplicar',
      icon: 'copy',
      onClick: () => {
        duplicateDocument();
      }
    },
    {
      id: 'delete',
      label: 'Eliminar',
      icon: 'trash',
      onClick: () => {
        deleteDocument();
      }
    }
  ]
});
```

### Ejemplo 8: HeaderSection Completo

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  title: 'Gestión de Proyectos',
  showBackButton: true,
  showInfoButton: true,
  infoTooltipText: 'Información sobre la gestión de proyectos',
  showStatusTag: true,
  statusTagLabel: 'Activo',
  statusTagStatus: 'active',
  showActions: true,
  actions: [
    {
      label: 'Filtrar',
      variant: 'secondary',
      icon: 'filter',
      onClick: () => {
        showFilterModal();
      }
    },
    {
      label: 'Nuevo Proyecto',
      variant: 'primary',
      icon: 'plus',
      onClick: () => {
        createNewProject();
      }
    }
  ],
  showAIAction: true,
  showOptionsButton: true,
  optionsMenuItems: [
    { id: 'export', label: 'Exportar', icon: 'download' },
    { id: 'settings', label: 'Configuración', icon: 'cog' }
  ],
  onBackClick: () => {
    navigateBack();
  },
  onInfoClick: () => {
    showHelpModal();
  }
});
```

### Ejemplo 9: HeaderSection sin Título

```javascript
window.createHeaderSection({
  containerId: 'header-section-container',
  showTitle: false,
  showStatusTag: true,
  statusTagLabel: 'Borrador',
  statusTagStatus: 'draft',
  showActions: true,
  actions: [
    {
      label: 'Publicar',
      variant: 'primary',
      onClick: () => {
        publish();
      }
    }
  ]
});
```

### Ejemplo 10: HeaderSection Dinámico

```javascript
let currentStatus = 'draft';

function updateHeaderSection() {
  window.createHeaderSection({
    containerId: 'header-section-container',
    title: 'Mi Documento',
    showStatusTag: true,
    statusTagLabel: getStatusLabel(currentStatus),
    statusTagStatus: currentStatus,
    showActions: true,
    actions: [
      {
        label: currentStatus === 'draft' ? 'Publicar' : 'Editar',
        variant: 'primary',
        onClick: () => {
          if (currentStatus === 'draft') {
            publish();
            currentStatus = 'published';
          } else {
            edit();
            currentStatus = 'draft';
          }
          updateHeaderSection();
        }
      }
    ]
  });
}

// Inicializar
updateHeaderSection();
```

---

## 🔄 Callbacks y Eventos

### onBackClick

Se ejecuta cuando se hace click en el botón de atrás.

```javascript
onBackClick: () => {
  console.log('Botón de atrás clickeado');
  // Navegar atrás
  navigateBack();
  
  // O cerrar modal
  closeModal();
  
  // O volver a lista
  goToList();
}
```

### onInfoClick

Se ejecuta cuando se hace click en el botón de información.

```javascript
onInfoClick: () => {
  console.log('Botón de información clickeado');
  // Mostrar modal de ayuda
  showHelpModal();
  
  // O mostrar tooltip extendido
  showExtendedTooltip();
  
  // O navegar a documentación
  navigateToDocs();
}
```

### onClick en Acciones

Se ejecuta cuando se hace click en una acción.

```javascript
actions: [
  {
    label: 'Guardar',
    variant: 'primary',
    onClick: () => {
      console.log('Guardar clickeado');
      saveData();
    }
  }
]
```

---

## 🎨 Características Visuales

### Título

- Heading h2 según tokens UBITS
- Color fg-1-high
- Alineado a la izquierda

### Botón de Atrás

- Botón secundario md
- Icono de flecha izquierda
- Posicionado a la izquierda del título

### Botón de Información

- Botón sm, tertiary
- Icono de información
- Tooltip con texto configurable
- Posicionado después del título

### Status Tag

- Independiente del título
- Se muestra después del título
- Mismos estados que el componente Status Tag

### Acciones

- Botones md
- Variantes: primary, secondary, tertiary
- Iconos opcionales
- Alineados a la derecha

---

## 🚨 Errores Comunes

### Error 1: infoTooltipText sin showInfoButton
**Problema:** Proporcionar `infoTooltipText` sin `showInfoButton: true`  
**Solución:** Activar `showInfoButton` cuando se usa `infoTooltipText`

```javascript
// ❌ Incorrecto - tooltip sin botón
showInfoButton: false,
infoTooltipText: 'Información'

// ✅ Correcto - tooltip con botón
showInfoButton: true,
infoTooltipText: 'Información'
```

### Error 2: Status Tag sin Label
**Problema:** Activar `showStatusTag` sin proporcionar `statusTagLabel`  
**Solución:** Proporcionar label cuando se activa status tag

```javascript
// ❌ Incorrecto - status tag sin label
showStatusTag: true,
statusTagLabel: ''

// ✅ Correcto - status tag con label
showStatusTag: true,
statusTagLabel: 'En progreso',
statusTagStatus: 'in-progress'
```

### Error 3: Acciones sin Labels
**Problema:** Acciones sin texto  
**Solución:** Cada acción debe tener un label

```javascript
// ❌ Incorrecto - acción sin label
actions: [
  { variant: 'primary' } // Falta label
]

// ✅ Correcto - acción con label
actions: [
  { label: 'Guardar', variant: 'primary' }
]
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Status Tag](./bsicos-status-tag.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

