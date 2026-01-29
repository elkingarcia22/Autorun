# 📦 NPS Card

> **Componente UBITS:** `charts-nps-card`  
> **Categoría:** Charts  
> **API:** `window.createNPSCard()` o `<ubits-nps-card>`  
> **Storybook Local:** http://localhost:6006/?path=/story/charts-nps-card--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-nps-card--default

## 🎯 Descripción

Componente NPSCard UBITS para mostrar métricas NPS (Net Promoter Score) con gauge semicircular. Incluye segmentos de color (rojo, amarillo, verde), aguja indicadora, categorías con porcentajes y contador de respuestas. Usa tokens UBITS para colores, tipografía y espaciado.

**Características principales:**
- Gauge semicircular con aguja indicadora
- 3 segmentos de color: rojo (0-20), amarillo (20-60), verde (60-100)
- Puntuación principal (0-100)
- Contador de respuestas totales
- Múltiples categorías con valores current/total y colores
- Icono de información opcional
- Botón de acción opcional
- 3 tamaños: sm, md, lg
- Colores personalizables con tokens UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/charts-nps-card--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-nps-card--default
- **Código fuente:** `vendor/ubits/packages/addons/nps-card/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/nps-card/src/types/NPSCardOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/NPSCard.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `charts-nps-card--default`  
**URL Local:** http://localhost:6006/?path=/story/charts-nps-card--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-nps-card--default

**Descripción:**
NPS Card con todos los controles disponibles. Permite configurar título, score, etiqueta, respuestas, categorías, colores y opciones de visualización.

**Características mostradas:**
- Título con icono de información
- Gauge semicircular con aguja
- Puntuación principal
- Contador de respuestas
- Múltiples categorías con colores
- Botón de acción

**Código de ejemplo:**
```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 56,
  scoreLabel: 'Puntuación',
  totalResponses: 290,
  responsesLabel: 'respuestas',
  categories: [
    {
      label: 'No tienen confianza',
      current: 50,
      total: 100,
      color: '#E53E3E'
    },
    {
      label: 'Neutrales',
      current: 10,
      total: 100,
      color: '#F6AD55'
    },
    {
      label: 'Tienen confianza',
      current: 30,
      total: 100,
      color: '#38A169'
    }
  ],
  size: 'md',
  showTitle: true,
  showResponsesCount: true,
  showGauge: true,
  showCategories: true,
  showInfoIcon: true,
  showActionButton: true,
  lowColor: '#E53E3E',
  mediumColor: '#F6AD55',
  highColor: '#38A169',
  gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-2)',
  onAction: () => {
    console.log('Action button clicked');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Nivel de confianza'` - Título del componente
- `score`: `56` - Puntuación principal (0-100)
- `scoreLabel`: `'Puntuación'` - Etiqueta del score
- `totalResponses`: `290` - Número total de respuestas
- `responsesLabel`: `'respuestas'` - Etiqueta para las respuestas
- `categories`: Array de categorías con colores
- `size`: `'md'` - Tamaño mediano

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la card |
| `title` | `string` | `'Nivel de confianza'` | Título del componente |
| `score` | `number` | `0` | Puntuación principal mostrada en el gauge (0-100) |
| `scoreLabel` | `string` | `'Puntuación'` | Etiqueta del score |
| `totalResponses` | `number` | `0` | Número total de respuestas |
| `responsesLabel` | `string` | `'respuestas'` | Texto para mostrar las respuestas |
| `categories` | `NPSCategory[]` | `[]` | Array de categorías |
| `size` | `string` | `'md'` | Tamaño del componente. Opciones: `sm`, `md`, `lg` |
| `showTitle` | `boolean` | `true` | Mostrar el título |
| `showResponsesCount` | `boolean` | `true` | Mostrar el contador de respuestas |
| `showGauge` | `boolean` | `true` | Mostrar el gauge semicircular |
| `showCategories` | `boolean` | `true` | Mostrar las categorías |
| `showInfoIcon` | `boolean` | `false` | Mostrar icono de información junto al título |
| `showActionButton` | `boolean` | `false` | Mostrar botón de acción con flecha a la derecha |
| `lowColor` | `string` | - | Color del gauge para el segmento rojo (0-20) |
| `mediumColor` | `string` | - | Color del gauge para el segmento amarillo (20-60) |
| `highColor` | `string` | - | Color del gauge para el segmento verde (60-100) |
| `gaugeBackgroundColor` | `string` | - | Color de fondo del gauge (token UBITS o color hexadecimal) |
| `onAction` | `function` | - | Callback que se ejecuta al hacer click en el botón de acción |

### Estructura de NPSCategory

```typescript
interface NPSCategory {
  label: string;    // Etiqueta de la categoría
  current: number;  // Valor actual
  total: number;    // Valor total
  color: string;    // Color de la categoría (token UBITS o color hexadecimal)
}
```

### Segmentos del Gauge

| Segmento | Rango | Color Default | Descripción |
|----------|-------|---------------|-------------|
| Bajo | 0-20 | Rojo | Score bajo (detractores) |
| Medio | 20-60 | Amarillo | Score medio (neutrales) |
| Alto | 60-100 | Verde | Score alto (promotores) |

### Tamaños

| Tamaño | Descripción |
|--------|-------------|
| `sm` | Pequeño |
| `md` | Mediano (default) |
| `lg` | Grande |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: NPS Card Básico

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 56,
  totalResponses: 290,
  categories: [
    { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
    { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
    { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
  ]
});
```

### Ejemplo 2: NPS Card con Score Alto

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 75, // Score alto (verde)
  scoreLabel: 'Puntuación',
  totalResponses: 500,
  responsesLabel: 'respuestas',
  categories: [
    { label: 'No tienen confianza', current: 25, total: 500, color: '#E53E3E' },
    { label: 'Neutrales', current: 50, total: 500, color: '#F6AD55' },
    { label: 'Tienen confianza', current: 425, total: 500, color: '#38A169' }
  ]
});
```

### Ejemplo 3: NPS Card con Score Bajo

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 15, // Score bajo (rojo)
  scoreLabel: 'Puntuación',
  totalResponses: 200,
  categories: [
    { label: 'No tienen confianza', current: 150, total: 200, color: '#E53E3E' },
    { label: 'Neutrales', current: 30, total: 200, color: '#F6AD55' },
    { label: 'Tienen confianza', current: 20, total: 200, color: '#38A169' }
  ]
});
```

### Ejemplo 4: NPS Card con Icono de Información

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 56,
  totalResponses: 290,
  categories: [
    { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
  ],
  showInfoIcon: true,
  onClick: () => {
    showTooltip('NPS mide la probabilidad de que los clientes recomienden el producto');
  }
});
```

### Ejemplo 5: NPS Card con Botón de Acción

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 56,
  totalResponses: 290,
  categories: [
    { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
  ],
  showActionButton: true,
  onAction: () => {
    navigateToDetails();
  }
});
```

### Ejemplo 6: NPS Card con Colores Personalizados

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 56,
  totalResponses: 290,
  categories: [
    { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
  ],
  lowColor: 'var(--modifiers-normal-color-light-feedback-accent-error)',
  mediumColor: 'var(--modifiers-normal-color-light-feedback-accent-warning)',
  highColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
  gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-2)'
});
```

### Ejemplo 7: NPS Card Diferentes Tamaños

```javascript
// Pequeño
window.createNPSCard({
  containerId: 'nps-sm',
  title: 'NPS',
  score: 56,
  totalResponses: 290,
  size: 'sm'
});

// Mediano
window.createNPSCard({
  containerId: 'nps-md',
  title: 'NPS',
  score: 56,
  totalResponses: 290,
  size: 'md'
});

// Grande
window.createNPSCard({
  containerId: 'nps-lg',
  title: 'NPS',
  score: 56,
  totalResponses: 290,
  size: 'lg'
});
```

### Ejemplo 8: NPS Card sin Categorías

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 56,
  totalResponses: 290,
  showCategories: false
});
```

### Ejemplo 9: NPS Card sin Gauge

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 56,
  totalResponses: 290,
  categories: [
    { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
  ],
  showGauge: false
});
```

### Ejemplo 10: NPS Card Completo

```javascript
window.createNPSCard({
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 56,
  scoreLabel: 'Puntuación',
  totalResponses: 290,
  responsesLabel: 'respuestas',
  categories: [
    {
      label: 'No tienen confianza',
      current: 50,
      total: 100,
      color: '#E53E3E'
    },
    {
      label: 'Neutrales',
      current: 10,
      total: 100,
      color: '#F6AD55'
    },
    {
      label: 'Tienen confianza',
      current: 30,
      total: 100,
      color: '#38A169'
    }
  ],
  size: 'md',
  showTitle: true,
  showResponsesCount: true,
  showGauge: true,
  showCategories: true,
  showInfoIcon: true,
  showActionButton: true,
  lowColor: 'var(--modifiers-normal-color-light-feedback-accent-error)',
  mediumColor: 'var(--modifiers-normal-color-light-feedback-accent-warning)',
  highColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
  gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-2)',
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
  trackEvent('nps_action_clicked');
}
```

---

## 🎨 Características Visuales

### Gauge Semicircular

- Gauge semicircular con aguja indicadora
- 3 segmentos de color: rojo (0-20), amarillo (20-60), verde (60-100)
- Puntuación principal en el centro
- Color de fondo configurable

### Categorías

- Múltiples categorías con valores current/total
- Colores personalizables por categoría
- Progreso visual con barras de progreso
- Labels descriptivos

### Tamaños

- **sm:** Tamaño pequeño, ideal para dashboards compactos
- **md:** Tamaño mediano, uso general (default)
- **lg:** Tamaño grande, para destacar métricas importantes

---

## 🚨 Errores Comunes

### Error 1: Score Fuera de Rango
**Problema:** Score mayor a 100 o menor a 0  
**Solución:** Asegurar que el score esté entre 0 y 100

```javascript
// ❌ Incorrecto - score fuera de rango
score: 150

// ✅ Correcto - score en rango
score: 75
```

### Error 2: Categorías sin Estructura Correcta
**Problema:** Categorías sin la estructura correcta  
**Solución:** Usar objetos con label, current, total y color

```javascript
// ❌ Incorrecto - estructura incorrecta
categories: ['Categoría 1', 'Categoría 2']

// ✅ Correcto - estructura correcta
categories: [
  { label: 'Categoría 1', current: 50, total: 100, color: '#E53E3E' },
  { label: 'Categoría 2', current: 30, total: 100, color: '#38A169' }
]
```

### Error 3: Current Mayor que Total
**Problema:** Valor current mayor que total en una categoría  
**Solución:** Asegurar que current sea menor o igual que total

```javascript
// ❌ Incorrecto - current mayor que total
{ label: 'Categoría', current: 150, total: 100, color: '#E53E3E' }

// ✅ Correcto - current menor o igual que total
{ label: 'Categoría', current: 50, total: 100, color: '#E53E3E' }
```

### Error 4: Tamaño Inválido
**Problema:** Usar un tamaño que no existe  
**Solución:** Usar solo sm, md o lg

```javascript
// ❌ Incorrecto - tamaño inválido
size: 'xl'

// ✅ Correcto - tamaño válido
size: 'md'
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Text Metric Card](./charts-text-metric-card.md) - Componente relacionado
- [Bar Metric Card](./charts-bar-metric-card.md) - Componente relacionado
- [Circle Metric Card](./charts-circle-metric-card.md) - Componente relacionado
- [CSAT Metric Card](./charts-csat-metric-card.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

