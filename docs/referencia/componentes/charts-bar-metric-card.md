# 📦 Bar Metric Card

> **Componente UBITS:** `charts-bar-metric-card`  
> **Categoría:** Charts  
> **API:** `window.createBarMetricCard()` o `<ubits-bar-metric-card>`  
> **Storybook Local:** http://localhost:6006/?path=/story/charts-bar-metric-card--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-bar-metric-card--default

## 🎯 Descripción

Componente BarMetricCard UBITS para mostrar métricas con gráfico de barras y categorías. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado.

**Características principales:**
- Título con icono de información opcional
- Gráfico de barras con valores positivos y negativos
- Múltiples categorías con valores current/total
- Contador de respuestas opcional
- 2 layouts: vertical, horizontal
- 3 tamaños: sm, md, lg
- Líneas de guía (grid lines) opcionales
- Botón de acción opcional
- Completamente personalizable con tokens UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/charts-bar-metric-card--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-bar-metric-card--default
- **Código fuente:** `vendor/ubits/packages/addons/bar-metric-card/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/bar-metric-card/src/types/BarMetricCardOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/BarMetricCard.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `charts-bar-metric-card--default`  
**URL Local:** http://localhost:6006/?path=/story/charts-bar-metric-card--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-bar-metric-card--default

**Descripción:**
Bar Metric Card con todos los controles disponibles. Permite configurar título, contador de respuestas, datos del gráfico, categorías, layout, tamaño y opciones de visualización.

**Características mostradas:**
- Título con icono de información
- Contador de respuestas
- Gráfico de barras con valores positivos y negativos
- Múltiples categorías
- Layout vertical
- Líneas de guía
- Botón de acción

**Código de ejemplo:**
```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Nombre de la pregunta',
  responseCount: 7,
  showResponseCount: true,
  barData: [-25, -15, 15, 25, 35, 45, 55, 5, 25, -15, -30, -50],
  barLabels: ['Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  maxValue: 60,
  minValue: -60,
  categories: [
    { label: 'Área', current: 3, total: 20 },
    { label: 'Equipo', current: 5, total: 15 },
    { label: 'Propio', current: 2, total: 10 }
  ],
  layout: 'vertical',
  size: 'md',
  showTitle: true,
  showBarChart: true,
  showCategories: true,
  showInfoIcon: true,
  showActionButton: true,
  showNegativeValues: true,
  showGridLines: true,
  onAction: () => {
    console.log('Action button clicked');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Nombre de la pregunta'` - Título de la métrica
- `responseCount`: `7` - Cantidad de respuestas
- `showResponseCount`: `true` - Mostrar contador
- `barData`: Array de valores para las barras
- `barLabels`: Etiquetas para las barras
- `maxValue`: `60` - Valor máximo del eje Y
- `minValue`: `-60` - Valor mínimo del eje Y
- `categories`: Array de categorías
- `layout`: `'vertical'` - Layout vertical
- `size`: `'md'` - Tamaño mediano

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la card |
| `title` | `string` | `'Métricas'` | Título del componente |
| `responseCount` | `number` | `0` | Cantidad de respuestas |
| `showResponseCount` | `boolean` | `false` | Mostrar la cantidad de respuestas |
| `barData` | `number[]` | `[]` | Array de valores para las barras (pueden ser positivos o negativos) |
| `barLabels` | `string[]` | - | Etiquetas para las barras (opcional) |
| `maxValue` | `number` | - | Valor máximo para el eje Y (opcional, se calcula automáticamente) |
| `minValue` | `number` | - | Valor mínimo para el eje Y (opcional, se calcula automáticamente) |
| `categories` | `BarCategory[]` | `[]` | Array de categorías |
| `layout` | `string` | `'vertical'` | Layout del componente. Opciones: `vertical`, `horizontal` |
| `size` | `string` | `'md'` | Tamaño del componente. Opciones: `sm`, `md`, `lg` |
| `showTitle` | `boolean` | `true` | Mostrar el título |
| `showBarChart` | `boolean` | `true` | Mostrar el gráfico de barras |
| `showCategories` | `boolean` | `true` | Mostrar las categorías |
| `showInfoIcon` | `boolean` | `false` | Mostrar icono de información junto al título |
| `showActionButton` | `boolean` | `false` | Mostrar botón de acción con flecha a la derecha |
| `showNegativeValues` | `boolean` | `true` | Mostrar valores negativos (barras hacia abajo) |
| `showGridLines` | `boolean` | `true` | Mostrar líneas de guía (grid lines) |
| `barColor` | `string` | - | Color de las barras (token UBITS) |
| `chartBackgroundColor` | `string` | - | Color de fondo del gráfico (token UBITS) |
| `gridLineColor` | `string` | - | Color de las líneas de la grilla (token UBITS) |
| `onClick` | `function` | - | Callback que se ejecuta al hacer click en la card |
| `onAction` | `function` | - | Callback que se ejecuta al hacer click en el botón de acción |

### Estructura de BarCategory

```typescript
interface BarCategory {
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

### Ejemplo 1: Bar Metric Card Básico

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas',
  barData: [10, 20, 30, 40, 50],
  categories: [
    { label: 'Categoría 1', current: 5, total: 10 },
    { label: 'Categoría 2', current: 3, total: 8 }
  ]
});
```

### Ejemplo 2: Bar Metric Card con Valores Negativos

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas',
  barData: [-25, -15, 15, 25, 35, 45],
  barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  maxValue: 60,
  minValue: -60,
  showNegativeValues: true
});
```

### Ejemplo 3: Bar Metric Card con Contador de Respuestas

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Encuesta de Satisfacción',
  responseCount: 150,
  showResponseCount: true,
  barData: [10, 20, 30, 40, 50],
  categories: [
    { label: 'Muy Satisfecho', current: 50, total: 150 },
    { label: 'Satisfecho', current: 80, total: 150 },
    { label: 'Neutral', current: 20, total: 150 }
  ]
});
```

### Ejemplo 4: Bar Metric Card Horizontal

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas',
  barData: [10, 20, 30, 40, 50],
  categories: [
    { label: 'Categoría 1', current: 5, total: 10 }
  ],
  layout: 'horizontal'
});
```

### Ejemplo 5: Bar Metric Card con Icono de Información

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas',
  barData: [10, 20, 30, 40, 50],
  showInfoIcon: true,
  onClick: () => {
    showTooltip('Esta métrica muestra el rendimiento mensual');
  }
});
```

### Ejemplo 6: Bar Metric Card con Botón de Acción

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas',
  barData: [10, 20, 30, 40, 50],
  showActionButton: true,
  onAction: () => {
    navigateToDetails();
  }
});
```

### Ejemplo 7: Bar Metric Card sin Líneas de Guía

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas',
  barData: [10, 20, 30, 40, 50],
  showGridLines: false
});
```

### Ejemplo 8: Bar Metric Card Diferentes Tamaños

```javascript
// Pequeño
window.createBarMetricCard({
  containerId: 'bar-sm',
  title: 'Métricas',
  barData: [10, 20, 30],
  size: 'sm'
});

// Mediano
window.createBarMetricCard({
  containerId: 'bar-md',
  title: 'Métricas',
  barData: [10, 20, 30],
  size: 'md'
});

// Grande
window.createBarMetricCard({
  containerId: 'bar-lg',
  title: 'Métricas',
  barData: [10, 20, 30],
  size: 'lg'
});
```

### Ejemplo 9: Bar Metric Card con Colores Personalizados

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas',
  barData: [10, 20, 30, 40, 50],
  barColor: 'var(--modifiers-normal-color-light-chart-bg-neutral-blue-base)',
  chartBackgroundColor: 'var(--modifiers-normal-color-light-bg-1)',
  gridLineColor: 'var(--modifiers-normal-color-light-border-1)'
});
```

### Ejemplo 10: Bar Metric Card Completo

```javascript
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Encuesta de Satisfacción',
  responseCount: 150,
  showResponseCount: true,
  barData: [-25, -15, 15, 25, 35, 45, 55],
  barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  maxValue: 60,
  minValue: -60,
  categories: [
    { label: 'Muy Satisfecho', current: 50, total: 150 },
    { label: 'Satisfecho', current: 80, total: 150 },
    { label: 'Neutral', current: 20, total: 150 }
  ],
  layout: 'vertical',
  size: 'md',
  showTitle: true,
  showBarChart: true,
  showCategories: true,
  showInfoIcon: true,
  showActionButton: true,
  showNegativeValues: true,
  showGridLines: true,
  barColor: 'var(--modifiers-normal-color-light-chart-bg-neutral-blue-base)',
  chartBackgroundColor: 'var(--modifiers-normal-color-light-bg-1)',
  gridLineColor: 'var(--modifiers-normal-color-light-border-1)',
  onClick: () => {
    console.log('Card clicked');
  },
  onAction: () => {
    navigateToDetails();
  }
});
```

---

## 🔄 Callbacks y Eventos

### onClick

Se ejecuta cuando se hace click en la card.

```javascript
onClick: () => {
  console.log('Card clicked');
  // Navegar a detalles
  navigateToDetails();
  
  // Abrir modal
  openDetailsModal();
}
```

### onAction

Se ejecuta cuando se hace click en el botón de acción.

```javascript
onAction: () => {
  console.log('Action button clicked');
  // Navegar a detalles
  navigateToDetails();
  
  // Enviar evento
  trackEvent('bar_metric_action_clicked');
}
```

---

## 🎨 Características Visuales

### Gráfico de Barras

- Barras verticales con valores positivos y negativos
- Valores positivos hacia arriba
- Valores negativos hacia abajo
- Etiquetas opcionales para cada barra
- Eje Y con valores máximo y mínimo configurables

### Categorías

- Múltiples categorías con valores current/total
- Progreso visual con barras de progreso
- Labels descriptivos

### Layout

- **Vertical:** Gráfico arriba, categorías abajo (default)
- **Horizontal:** Gráfico a la izquierda, categorías a la derecha

### Líneas de Guía

- Líneas horizontales opcionales
- Color configurable con tokens UBITS
- Ayudan a leer los valores del gráfico

---

## 🚨 Errores Comunes

### Error 1: barData Vacío
**Problema:** No proporcionar datos para las barras  
**Solución:** Siempre proporcionar un array con valores

```javascript
// ❌ Incorrecto - sin datos
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas'
  // Falta barData
});

// ✅ Correcto - con datos
window.createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Métricas',
  barData: [10, 20, 30]
});
```

### Error 2: barLabels sin Coincidir con barData
**Problema:** barLabels tiene diferente longitud que barData  
**Solución:** Asegurar que ambos arrays tengan la misma longitud

```javascript
// ❌ Incorrecto - longitudes diferentes
barData: [10, 20, 30],
barLabels: ['Ene', 'Feb'] // Falta un label

// ✅ Correcto - misma longitud
barData: [10, 20, 30],
barLabels: ['Ene', 'Feb', 'Mar']
```

### Error 3: Categorías sin Estructura Correcta
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

### Error 4: maxValue Menor que minValue
**Problema:** maxValue menor que minValue  
**Solución:** Asegurar que maxValue sea mayor que minValue

```javascript
// ❌ Incorrecto - maxValue menor que minValue
maxValue: -60,
minValue: 60

// ✅ Correcto - maxValue mayor que minValue
maxValue: 60,
minValue: -60
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Text Metric Card](./charts-text-metric-card.md) - Componente relacionado
- [Progress Bar](./charts-progress-bar.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

