# 📦 Segment Control

> **Componente UBITS:** `navegación-segment-control`  
> **Categoría:** Navegación  
> **API:** `window.createSegmentControl()` o `<ubits-segment-control>`  
> **Storybook Local:** http://localhost:6006/?path=/story/navegacin-segment-control--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-segment-control--default

## 🎯 Descripción

Componente Segment Control UBITS de navegación horizontal con soporte para iconos opcionales. Similar a Tabs pero con contenedor con padding interno de 4px y altura de 30px. El segmento activo muestra fondo blanco, icono solid oscuro, texto en negrita. Los segmentos inactivos muestran icono regular y texto en gris claro sin fondo.

**Características principales:**
- Navegación horizontal con segmentos
- Iconos opcionales en cada segmento
- Segmento activo con fondo blanco y texto en negrita
- Segmentos inactivos sin fondo y texto en gris claro
- Altura fija de 30px
- Padding interno de 4px
- Callback al cambiar de segmento

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegacin-segment-control--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-segment-control--default
- **Código fuente:** `vendor/ubits/packages/addons/segment-control/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/segment-control/src/types/SegmentControlOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/SegmentControl.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegación-segment-control--default`  
**URL Local:** http://localhost:6006/?path=/story/navegacin-segment-control--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-segment-control--default

**Descripción:**
Segment Control con todos los controles disponibles. Permite configurar segmentos, segmento activo, mostrar/ocultar iconos y número de segmentos.

**Características mostradas:**
- Múltiples segmentos con iconos
- Segmento activo destacado
- Iconos opcionales
- Callback al cambiar de segmento

**Código de ejemplo:**
```javascript
window.createSegmentControl({
  segments: [
    {
      id: 'segment-1',
      label: 'Label 1',
      icon: 'far fa-th',
      active: true
    },
    {
      id: 'segment-2',
      label: 'Label 2',
      icon: 'far fa-chart-line',
      active: false
    },
    {
      id: 'segment-3',
      label: 'Label 3',
      icon: 'far fa-cog',
      active: false
    }
  ],
  activeSegmentId: 'segment-1',
  onSegmentChange: (segmentId, segmentElement) => {
    console.log('Segmento cambiado:', segmentId);
  }
}, 'container-id');
```

**Opciones utilizadas en la historia Default:**
- `segments`: Array de 5 segmentos con iconos
- `activeSegmentId`: `'segment-1'` - Primer segmento activo
- `showIcons`: `true` - Mostrar iconos
- `segmentCount`: `5` - 5 segmentos

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `segments` | `SegmentItem[]` | - | Array de segmentos a mostrar (requerido) |
| `activeSegmentId` | `string` | - | ID del segmento activo |
| `onSegmentChange` | `function` | - | Callback que se ejecuta cuando se cambia de segmento |

### Estructura de SegmentItem

```typescript
interface SegmentItem {
  id: string;              // ID único del segmento (requerido)
  label: string;           // Texto del segmento (requerido)
  icon?: string;           // Icono FontAwesome (opcional, formato: 'far fa-icon' o 'fas fa-icon')
  active?: boolean;        // Si el segmento está activo (opcional)
}
```

### Callback onSegmentChange

```typescript
onSegmentChange: (segmentId: string, segmentElement: HTMLElement) => void
```

**Parámetros:**
- `segmentId` (string): ID del segmento seleccionado
- `segmentElement` (HTMLElement): Elemento HTML del segmento

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Segment Control Básico

```javascript
window.createSegmentControl({
  segments: [
    { id: 'tab1', label: 'Tab 1', active: true },
    { id: 'tab2', label: 'Tab 2', active: false },
    { id: 'tab3', label: 'Tab 3', active: false }
  ],
  activeSegmentId: 'tab1',
  onSegmentChange: (segmentId) => {
    console.log('Segmento seleccionado:', segmentId);
  }
}, 'segment-control-container');
```

### Ejemplo 2: Segment Control con Iconos

```javascript
window.createSegmentControl({
  segments: [
    {
      id: 'home',
      label: 'Home',
      icon: 'far fa-home',
      active: true
    },
    {
      id: 'chart',
      label: 'Chart',
      icon: 'far fa-chart-line',
      active: false
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'far fa-cog',
      active: false
    }
  ],
  activeSegmentId: 'home',
  onSegmentChange: (segmentId) => {
    console.log('Segmento seleccionado:', segmentId);
  }
}, 'segment-control-container');
```

### Ejemplo 3: Segment Control con Iconos Solid

```javascript
window.createSegmentControl({
  segments: [
    {
      id: 'home',
      label: 'Home',
      icon: 'fas fa-home', // Icono solid
      active: true
    },
    {
      id: 'chart',
      label: 'Chart',
      icon: 'fas fa-chart-line', // Icono solid
      active: false
    }
  ],
  activeSegmentId: 'home',
  onSegmentChange: (segmentId) => {
    console.log('Segmento seleccionado:', segmentId);
  }
}, 'segment-control-container');
```

### Ejemplo 4: Segment Control sin Iconos

```javascript
window.createSegmentControl({
  segments: [
    { id: 'tab1', label: 'Tab 1', active: true },
    { id: 'tab2', label: 'Tab 2', active: false },
    { id: 'tab3', label: 'Tab 3', active: false }
  ],
  activeSegmentId: 'tab1',
  onSegmentChange: (segmentId) => {
    console.log('Segmento seleccionado:', segmentId);
  }
}, 'segment-control-container');
```

### Ejemplo 5: Segment Control Dinámico

```javascript
let currentSegment = 'home';

const segments = [
  { id: 'home', label: 'Home', icon: 'far fa-home', active: true },
  { id: 'chart', label: 'Chart', icon: 'far fa-chart-line', active: false },
  { id: 'settings', label: 'Settings', icon: 'far fa-cog', active: false }
];

function updateSegmentControl() {
  // Actualizar estado activo
  segments.forEach(segment => {
    segment.active = segment.id === currentSegment;
  });
  
  window.createSegmentControl({
    segments: segments,
    activeSegmentId: currentSegment,
    onSegmentChange: (segmentId) => {
      currentSegment = segmentId;
      updateSegmentControl();
      loadContent(segmentId);
    }
  }, 'segment-control-container');
}

function loadContent(segmentId) {
  console.log('Cargando contenido para:', segmentId);
  // Cargar contenido según el segmento
}

// Inicializar
updateSegmentControl();
```

### Ejemplo 6: Segment Control con Múltiples Segmentos

```javascript
window.createSegmentControl({
  segments: [
    { id: 'tab1', label: 'Tab 1', icon: 'far fa-th', active: true },
    { id: 'tab2', label: 'Tab 2', icon: 'far fa-chart-line', active: false },
    { id: 'tab3', label: 'Tab 3', icon: 'far fa-cog', active: false },
    { id: 'tab4', label: 'Tab 4', icon: 'far fa-star', active: false },
    { id: 'tab5', label: 'Tab 5', icon: 'far fa-book', active: false }
  ],
  activeSegmentId: 'tab1',
  onSegmentChange: (segmentId) => {
    console.log('Segmento seleccionado:', segmentId);
  }
}, 'segment-control-container');
```

### Ejemplo 7: Segment Control con Navegación

```javascript
window.createSegmentControl({
  segments: [
    { id: 'overview', label: 'Overview', icon: 'far fa-home', active: true },
    { id: 'analytics', label: 'Analytics', icon: 'far fa-chart-line', active: false },
    { id: 'reports', label: 'Reports', icon: 'far fa-file-alt', active: false },
    { id: 'settings', label: 'Settings', icon: 'far fa-cog', active: false }
  ],
  activeSegmentId: 'overview',
  onSegmentChange: (segmentId) => {
    // Navegar a la sección correspondiente
    navigateToSection(segmentId);
    
    // Actualizar URL
    window.history.pushState({}, '', `#${segmentId}`);
    
    // Cargar contenido
    loadSectionContent(segmentId);
  }
}, 'segment-control-container');

function navigateToSection(segmentId) {
  // Ocultar todas las secciones
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  
  // Mostrar sección activa
  const activeSection = document.getElementById(segmentId);
  if (activeSection) {
    activeSection.style.display = 'block';
  }
}

function loadSectionContent(segmentId) {
  console.log('Cargando contenido para:', segmentId);
  // Cargar contenido dinámicamente
}
```

### Ejemplo 8: Segment Control con Estado Persistente

```javascript
// Obtener segmento activo del localStorage
let activeSegment = localStorage.getItem('activeSegment') || 'home';

const segments = [
  { id: 'home', label: 'Home', icon: 'far fa-home', active: activeSegment === 'home' },
  { id: 'chart', label: 'Chart', icon: 'far fa-chart-line', active: activeSegment === 'chart' },
  { id: 'settings', label: 'Settings', icon: 'far fa-cog', active: activeSegment === 'settings' }
];

window.createSegmentControl({
  segments: segments,
  activeSegmentId: activeSegment,
  onSegmentChange: (segmentId) => {
    // Guardar en localStorage
    localStorage.setItem('activeSegment', segmentId);
    
    // Actualizar estado
    activeSegment = segmentId;
    
    console.log('Segmento guardado:', segmentId);
  }
}, 'segment-control-container');
```

### Ejemplo 9: Segment Control con Validación

```javascript
window.createSegmentControl({
  segments: [
    { id: 'step1', label: 'Step 1', icon: 'far fa-circle', active: true },
    { id: 'step2', label: 'Step 2', icon: 'far fa-circle', active: false },
    { id: 'step3', label: 'Step 3', icon: 'far fa-circle', active: false }
  ],
  activeSegmentId: 'step1',
  onSegmentChange: (segmentId) => {
    // Validar antes de cambiar
    if (canChangeSegment(segmentId)) {
      console.log('Cambiando a:', segmentId);
      updateActiveSegment(segmentId);
    } else {
      console.log('No se puede cambiar a:', segmentId);
      showError('Debes completar el paso anterior');
    }
  }
}, 'segment-control-container');

function canChangeSegment(segmentId) {
  // Lógica de validación
  const currentStep = getCurrentStep();
  const targetStep = parseInt(segmentId.replace('step', ''));
  
  return targetStep <= currentStep + 1;
}

function getCurrentStep() {
  // Obtener paso actual
  return 1;
}
```

### Ejemplo 10: Segment Control Completo

```javascript
const segmentControlConfig = {
  segments: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'far fa-th',
      active: true
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'far fa-chart-line',
      active: false
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'far fa-file-alt',
      active: false
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'far fa-cog',
      active: false
    }
  ],
  activeSegmentId: 'dashboard',
  onSegmentChange: (segmentId, segmentElement) => {
    console.log('Segmento cambiado:', segmentId);
    console.log('Elemento:', segmentElement);
    
    // Actualizar contenido
    updateContent(segmentId);
    
    // Enviar a analytics
    trackEvent('segment_changed', {
      segmentId: segmentId
    });
    
    // Actualizar URL
    updateURL(segmentId);
  }
};

window.createSegmentControl(segmentControlConfig, 'segment-control-container');

function updateContent(segmentId) {
  // Ocultar todo el contenido
  document.querySelectorAll('.content-section').forEach(section => {
    section.style.display = 'none';
  });
  
  // Mostrar contenido del segmento activo
  const activeSection = document.getElementById(`content-${segmentId}`);
  if (activeSection) {
    activeSection.style.display = 'block';
  }
}

function updateURL(segmentId) {
  window.history.pushState({}, '', `#${segmentId}`);
}

function trackEvent(eventName, data) {
  console.log('Event:', eventName, data);
  // Enviar a analytics
}
```

---

## 🔄 Callbacks y Eventos

### onSegmentChange

Se ejecuta cuando se hace click en un segmento y cambia la selección.

```javascript
onSegmentChange: (segmentId, segmentElement) => {
  console.log('Segmento seleccionado:', segmentId);
  console.log('Elemento:', segmentElement);
  
  // Actualizar contenido
  updateContent(segmentId);
  
  // Navegar
  navigateToSection(segmentId);
  
  // Guardar estado
  saveActiveSegment(segmentId);
}
```

**Parámetros:**
- `segmentId` (string): ID del segmento seleccionado
- `segmentElement` (HTMLElement): Elemento HTML del segmento clickeado

---

## 🎨 Características Visuales

### Segmento Activo

- Fondo blanco
- Icono solid oscuro (si tiene icono)
- Texto en negrita
- Altura de 30px

### Segmento Inactivo

- Sin fondo
- Icono regular (si tiene icono)
- Texto en gris claro
- Altura de 30px

### Contenedor

- Padding interno de 4px
- Altura fija de 30px
- Navegación horizontal

---

## 🚨 Errores Comunes

### Error 1: Segmentos sin ID
**Problema:** Segmentos sin ID único  
**Solución:** Cada segmento debe tener un ID único

```javascript
// ❌ Incorrecto - sin ID
segments: [
  { label: 'Tab 1', active: true }
]

// ✅ Correcto - con ID
segments: [
  { id: 'tab1', label: 'Tab 1', active: true }
]
```

### Error 2: Múltiples Segmentos Activos
**Problema:** Múltiples segmentos con `active: true`  
**Solución:** Solo un segmento debe estar activo

```javascript
// ❌ Incorrecto - múltiples activos
segments: [
  { id: 'tab1', label: 'Tab 1', active: true },
  { id: 'tab2', label: 'Tab 2', active: true } // Múltiples activos
]

// ✅ Correcto - solo uno activo
segments: [
  { id: 'tab1', label: 'Tab 1', active: true },
  { id: 'tab2', label: 'Tab 2', active: false }
]
```

### Error 3: Icono con Formato Incorrecto
**Problema:** Icono sin prefijo FontAwesome  
**Solución:** Usar formato correcto: 'far fa-icon' o 'fas fa-icon'

```javascript
// ❌ Incorrecto - sin prefijo
icon: 'home'

// ✅ Correcto - con prefijo
icon: 'far fa-home'
// O
icon: 'fas fa-home'
```

### Error 4: activeSegmentId No Coincide
**Problema:** activeSegmentId no coincide con ningún segmento  
**Solución:** Asegurar que activeSegmentId exista en los segmentos

```javascript
// ❌ Incorrecto - ID no existe
segments: [
  { id: 'tab1', label: 'Tab 1' }
],
activeSegmentId: 'tab2' // No existe

// ✅ Correcto - ID existe
segments: [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' }
],
activeSegmentId: 'tab1' // Existe
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Tabs](./navegacin-tabs.md) - Componente relacionado
- [SubNav](./navegacin-subnav.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

