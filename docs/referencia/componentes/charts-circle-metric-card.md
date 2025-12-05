# 📦 Circle Metric Card

> **Componente UBITS:** `charts-circle-metric-card`  
> **Categoría:** Charts  
> **API:** `window.createProgressGeneralCard()` o `<ubits-circle-metric-card>`  
> **Storybook Local:** http://localhost:6006/?path=/story/charts-circle-metric-card--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-circle-metric-card--default

## 🎯 Descripción

Componente ProgressGeneralCard UBITS para mostrar progreso general con indicador circular (donut chart) y categorías de progreso. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado.

**Características principales:**
- Indicador circular (donut chart) con porcentaje principal
- Etiqueta del porcentaje principal
- Múltiples categorías con valores current/total
- 2 layouts: vertical, horizontal
- 3 tamaños: sm, md, lg
- Icono de información opcional
- Botón de acción opcional
- Colores personalizables con tokens UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/charts-circle-metric-card--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-circle-metric-card--default
- **Código fuente:** `vendor/ubits/packages/addons/progress-general-card/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/progress-general-card/src/types/ProgressGeneralCardOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/ProgressGeneralCard.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `charts-circle-metric-card--default`  
**URL Local:** http://localhost:6006/?path=/story/charts-circle-metric-card--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-circle-metric-card--default

**Descripción:**
Circle Metric Card con todos los controles disponibles. Permite configurar título, porcentaje principal, etiqueta, categorías, layout, tamaño y opciones de visualización.

**Características mostradas:**
- Título con icono de información
- Indicador circular con porcentaje
- Etiqueta del porcentaje
- Múltiples categorías
- Layout horizontal
- Botón de acción

**Código de ejemplo:**
```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  categories: [
    { label: 'Área', current: 3, total: 20 },
    { label: 'Equipo', current: 8, total: 50 },
    { label: 'Propio', current: 5, total: 30 }
  ],
  layout: 'horizontal',
  size: 'md',
  showTitle: true,
  showCircularProgress: true,
  showCategories: true,
  showInfoIcon: true,
  showActionButton: true,
  progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
  circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
  onAction: () => {
    console.log('Action button clicked');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Progreso general'` - Título del componente
- `mainPercentage`: `50` - Porcentaje principal
- `mainLabel`: `'Ciclos'` - Etiqueta del porcentaje
- `categories`: Array de categorías
- `layout`: `'horizontal'` - Layout horizontal
- `size`: `'md'` - Tamaño mediano

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la card |
| `title` | `string` | `'Progreso general'` | Título del componente |
| `mainPercentage` | `number` | `50` | Porcentaje principal mostrado en el círculo (0-100) |
| `mainLabel` | `string` | `'Ciclos'` | Etiqueta del porcentaje principal |
| `categories` | `ProgressCategory[]` | `[]` | Array de categorías |
| `layout` | `string` | `'vertical'` | Layout del componente. Opciones: `vertical`, `horizontal` |
| `size` | `string` | `'md'` | Tamaño del componente. Opciones: `sm`, `md`, `lg` |
| `showTitle` | `boolean` | `true` | Mostrar el título |
| `showCircularProgress` | `boolean` | `true` | Mostrar el indicador circular |
| `showCategories` | `boolean` | `true` | Mostrar las categorías |
| `showInfoIcon` | `boolean` | `false` | Mostrar icono de información junto al título |
| `showActionButton` | `boolean` | `false` | Mostrar botón de acción con flecha a la derecha |
| `progressColor` | `string` | - | Color del progreso circular (token UBITS o color hexadecimal) |
| `circleBackgroundColor` | `string` | - | Color de fondo del círculo (token UBITS o color hexadecimal) |
| `onAction` | `function` | - | Callback que se ejecuta al hacer click en el botón de acción |

### Estructura de ProgressCategory

```typescript
interface ProgressCategory {
  label: string;    // Etiqueta de la categoría
  current: number;  // Valor actual
  total: number;    // Valor total
}
```

### Layouts

| Layout | Descripción |
|--------|-------------|
| `vertical` | Layout vertical (default) |
| `horizontal` | Layout horizontal |

### Tamaños

| Tamaño | Descripción |
|--------|-------------|
| `sm` | Pequeño |
| `md` | Mediano (default) |
| `lg` | Grande |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Circle Metric Card Básico

```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  categories: [
    { label: 'Área', current: 3, total: 20 },
    { label: 'Equipo', current: 8, total: 50 }
  ]
});
```

### Ejemplo 2: Circle Metric Card Vertical

```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 75,
  mainLabel: 'Completado',
  categories: [
    { label: 'Tarea 1', current: 5, total: 10 },
    { label: 'Tarea 2', current: 8, total: 10 }
  ],
  layout: 'vertical'
});
```

### Ejemplo 3: Circle Metric Card Horizontal

```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 60,
  mainLabel: 'Progreso',
  categories: [
    { label: 'Área', current: 3, total: 20 },
    { label: 'Equipo', current: 8, total: 50 }
  ],
  layout: 'horizontal'
});
```

### Ejemplo 4: Circle Metric Card con Icono de Información

```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  categories: [
    { label: 'Área', current: 3, total: 20 }
  ],
  showInfoIcon: true,
  onClick: () => {
    showTooltip('Este progreso muestra el avance general del proyecto');
  }
});
```

### Ejemplo 5: Circle Metric Card con Botón de Acción

```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  categories: [
    { label: 'Área', current: 3, total: 20 }
  ],
  showActionButton: true,
  onAction: () => {
    navigateToDetails();
  }
});
```

### Ejemplo 6: Circle Metric Card con Colores Personalizados

```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  categories: [
    { label: 'Área', current: 3, total: 20 }
  ],
  progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
  circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)'
});
```

### Ejemplo 7: Circle Metric Card Diferentes Tamaños

```javascript
// Pequeño
window.createProgressGeneralCard({
  containerId: 'circle-sm',
  title: 'Progreso',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  size: 'sm'
});

// Mediano
window.createProgressGeneralCard({
  containerId: 'circle-md',
  title: 'Progreso',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  size: 'md'
});

// Grande
window.createProgressGeneralCard({
  containerId: 'circle-lg',
  title: 'Progreso',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  size: 'lg'
});
```

### Ejemplo 8: Circle Metric Card sin Categorías

```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 75,
  mainLabel: 'Completado',
  showCategories: false
});
```

### Ejemplo 9: Circle Metric Card Dinámico

```javascript
function updateProgress(percentage, categories) {
  window.createProgressGeneralCard({
    containerId: 'circle-metric-card-container',
    title: 'Progreso general',
    mainPercentage: percentage,
    mainLabel: 'Ciclos',
    categories: categories,
    layout: 'horizontal',
    size: 'md'
  });
}

// Usar
updateProgress(75, [
  { label: 'Área', current: 15, total: 20 },
  { label: 'Equipo', current: 40, total: 50 }
]);
```

### Ejemplo 10: Circle Metric Card Completo

```javascript
window.createProgressGeneralCard({
  containerId: 'circle-metric-card-container',
  title: 'Progreso general',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  categories: [
    { label: 'Área', current: 3, total: 20 },
    { label: 'Equipo', current: 8, total: 50 },
    { label: 'Propio', current: 5, total: 30 }
  ],
  layout: 'horizontal',
  size: 'md',
  showTitle: true,
  showCircularProgress: true,
  showCategories: true,
  showInfoIcon: true,
  showActionButton: true,
  progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
  circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
  onAction: () => {
    navigateToDetails();
  }
});
```

---

## 🔄 Callbacks y Eventos

### onAction

Se ejecuta cuando se hace click en el botón de acción.

```javascript
onAction: () => {
  console.log('Action button clicked');
  // Navegar a detalles
  navigateToDetails();
  
  // Enviar evento
  trackEvent('circle_metric_action_clicked');
}
```

---

## 🎨 Características Visuales

### Indicador Circular

- Donut chart con porcentaje principal
- Color del progreso configurable
- Color de fondo del círculo configurable
- Etiqueta del porcentaje en el centro

### Categorías

- Múltiples categorías con valores current/total
- Progreso visual con barras de progreso
- Labels descriptivos

### Layout

- **Vertical:** Indicador circular arriba, categorías abajo (default)
- **Horizontal:** Indicador circular a la izquierda, categorías a la derecha

---

## 🚨 Errores Comunes

### Error 1: Porcentaje Fuera de Rango
**Problema:** Porcentaje mayor a 100 o menor a 0  
**Solución:** Asegurar que el porcentaje esté entre 0 y 100

```javascript
// ❌ Incorrecto - porcentaje fuera de rango
mainPercentage: 150

// ✅ Correcto - porcentaje en rango
mainPercentage: 75
```

### Error 2: Categorías sin Estructura Correcta
**Problema:** Categorías sin la estructura correcta  
**Solución:** Usar objetos con label, current y total

```javascript
// ❌ Incorrecto - estructura incorrecta
categories: ['Categoría 1', 'Categoría 2']

// ✅ Correcto - estructura correcta
categories: [
  { label: 'Categoría 1', current: 5, total: 10 },
  { label: 'Categoría 2', current: 3, total: 8 }
]
```

### Error 3: Current Mayor que Total
**Problema:** Valor current mayor que total en una categoría  
**Solución:** Asegurar que current sea menor o igual que total

```javascript
// ❌ Incorrecto - current mayor que total
{ label: 'Área', current: 25, total: 20 }

// ✅ Correcto - current menor o igual que total
{ label: 'Área', current: 15, total: 20 }
```

### Error 4: Layout Inválido
**Problema:** Usar un layout que no existe  
**Solución:** Usar solo vertical u horizontal

```javascript
// ❌ Incorrecto - layout inválido
layout: 'diagonal'

// ✅ Correcto - layout válido
layout: 'vertical'
// O
layout: 'horizontal'
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Text Metric Card](./charts-text-metric-card.md) - Componente relacionado
- [Bar Metric Card](./charts-bar-metric-card.md) - Componente relacionado
- [Progress Bar](./charts-progress-bar.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

