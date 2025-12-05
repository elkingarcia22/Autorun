# 📦 Score Card Metrics

> **Componente UBITS:** `charts-score-card-metrics`  
> **Categoría:** Charts  
> **API:** `window.createScoreCardMetrics()` o `<ubits-score-card-metrics>`  
> **Storybook Local:** http://localhost:6006/?path=/story/charts-score-card-metrics--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-score-card-metrics--default

## 🎯 Descripción

Componente ScoreCardMetrics UBITS para mostrar métricas de calificación con estrellas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 estrellas, etiquetas y descripción. Usa tokens UBITS para colores, tipografía y espaciado.

**Características principales:**
- Título con icono opcional
- Contador de respuestas totales
- Promedio de calificación (0-5)
- Gráfico de 5 estrellas con score destacado
- Etiquetas izquierda y derecha del gráfico
- Icono de información opcional
- Botón de acción opcional
- 3 tamaños: sm, md, lg
- Completamente personalizable con tokens UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/charts-score-card-metrics--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-score-card-metrics--default
- **Código fuente:** `vendor/ubits/packages/addons/score-card-metrics/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/score-card-metrics/src/types/ScoreCardMetricsOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/ScoreCardMetrics.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `charts-score-card-metrics--default`  
**URL Local:** http://localhost:6006/?path=/story/charts-score-card-metrics--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-score-card-metrics--default

**Descripción:**
Score Card Metrics con todos los controles disponibles. Permite configurar título, respuestas, promedio, score, etiquetas, iconos y botón de acción.

**Características mostradas:**
- Título con icono
- Contador de respuestas
- Promedio de calificación
- Gráfico de 5 estrellas
- Score destacado
- Etiquetas izquierda y derecha
- Icono de información
- Botón de acción

**Código de ejemplo:**
```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el producto',
  totalResponses: 7,
  responsesLabel: 'respuestas',
  average: 4.0,
  averageLabel: 'Promedio:',
  score: 3,
  leftLabel: '0',
  rightLabel: '5',
  titleIcon: 'star',
  titleIconStyle: 'regular',
  showInfoIcon: true,
  showActionButton: true,
  size: 'md',
  onAction: () => {
    console.log('Action button clicked');
  },
  onInfoClick: () => {
    console.log('Info icon clicked');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Califica el producto'` - Título de la métrica
- `totalResponses`: `7` - Número total de respuestas
- `responsesLabel`: `'respuestas'` - Etiqueta para las respuestas
- `average`: `4.0` - Promedio de calificación
- `averageLabel`: `'Promedio:'` - Etiqueta para el promedio
- `score`: `3` - Score actual (0-5)
- `leftLabel`: `'0'` - Etiqueta izquierda
- `rightLabel`: `'5'` - Etiqueta derecha
- `showInfoIcon`: `true` - Mostrar icono de información
- `showActionButton`: `true` - Mostrar botón de acción
- `size`: `'md'` - Tamaño mediano

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la card |
| `title` | `string` | `'Califica el producto'` | Título de la métrica |
| `totalResponses` | `number` | `0` | Número total de respuestas |
| `responsesLabel` | `string` | `'respuestas'` | Etiqueta para las respuestas |
| `average` | `number` | `0` | Promedio de calificación (0-5) |
| `averageLabel` | `string` | `'Promedio:'` | Etiqueta para el promedio |
| `score` | `number` | `0` | Score actual (0-5) para mostrar en las estrellas |
| `leftLabel` | `string` | `'0'` | Etiqueta izquierda del gráfico |
| `rightLabel` | `string` | `'5'` | Etiqueta derecha del gráfico |
| `titleIcon` | `string` | - | Nombre del icono FontAwesome para el título (sin prefijo `fa-`) |
| `titleIconStyle` | `string` | `'regular'` | Estilo del icono del título. Opciones: `regular`, `solid` |
| `titleIconColor` | `string` | - | Color del icono del título (puede usar tokens UBITS) |
| `showInfoIcon` | `boolean` | `false` | Mostrar icono de información junto al título |
| `showActionButton` | `boolean` | `false` | Mostrar botón de acción con flecha a la derecha |
| `size` | `string` | `'md'` | Tamaño de la tarjeta. Opciones: `sm`, `md`, `lg` |
| `onAction` | `function` | - | Callback que se ejecuta al hacer click en el botón de acción |
| `onInfoClick` | `function` | - | Callback que se ejecuta al hacer click en el icono de información |

### Tamaños

| Tamaño | Descripción |
|--------|-------------|
| `sm` | Pequeño |
| `md` | Mediano (default) |
| `lg` | Grande |

### Estrellas

El componente muestra 5 estrellas con valores del 1 al 5:
- Estrellas llenas según el score
- Estrellas vacías para el resto
- Visualización clara de la calificación

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Score Card Metrics Básico

```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4
});
```

### Ejemplo 2: Score Card Metrics con Icono

```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  titleIcon: 'star',
  titleIconStyle: 'regular'
});
```

### Ejemplo 3: Score Card Metrics con Etiquetas Personalizadas

```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el servicio',
  totalResponses: 25,
  responsesLabel: 'evaluaciones',
  average: 4.5,
  averageLabel: 'Calificación promedio:',
  score: 5,
  leftLabel: 'Muy malo',
  rightLabel: 'Excelente'
});
```

### Ejemplo 4: Score Card Metrics con Icono de Información

```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  showInfoIcon: true,
  onInfoClick: () => {
    showTooltip('Esta métrica muestra la calificación promedio del producto');
  }
});
```

### Ejemplo 5: Score Card Metrics con Botón de Acción

```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  showActionButton: true,
  onAction: () => {
    navigateToDetails();
  }
});
```

### Ejemplo 6: Score Card Metrics Completo

```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el producto',
  totalResponses: 7,
  responsesLabel: 'respuestas',
  average: 4.0,
  averageLabel: 'Promedio:',
  score: 3,
  leftLabel: '0',
  rightLabel: '5',
  titleIcon: 'star',
  titleIconStyle: 'regular',
  titleIconColor: 'var(--modifiers-normal-color-light-fg-2-medium)',
  showInfoIcon: true,
  showActionButton: true,
  size: 'md',
  onAction: () => {
    navigateToDetails();
  },
  onInfoClick: () => {
    showTooltip('Esta métrica muestra la calificación promedio del producto');
  }
});
```

### Ejemplo 7: Score Card Metrics Diferentes Tamaños

```javascript
// Pequeño
window.createScoreCardMetrics({
  containerId: 'score-sm',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  size: 'sm'
});

// Mediano
window.createScoreCardMetrics({
  containerId: 'score-md',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  size: 'md'
});

// Grande
window.createScoreCardMetrics({
  containerId: 'score-lg',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  size: 'lg'
});
```

### Ejemplo 8: Score Card Metrics con Score Bajo

```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el producto',
  totalResponses: 15,
  average: 2.5,
  score: 2, // Score bajo
  showInfoIcon: true
});
```

### Ejemplo 9: Score Card Metrics con Score Alto

```javascript
window.createScoreCardMetrics({
  containerId: 'score-card-metrics-container',
  title: 'Califica el producto',
  totalResponses: 20,
  average: 4.8,
  score: 5, // Score alto
  showActionButton: true
});
```

### Ejemplo 10: Score Card Metrics Dinámico

```javascript
function updateScoreCard(data) {
  window.createScoreCardMetrics({
    containerId: 'score-card-metrics-container',
    title: data.title,
    totalResponses: data.totalResponses,
    responsesLabel: data.responsesLabel || 'respuestas',
    average: data.average,
    averageLabel: data.averageLabel || 'Promedio:',
    score: data.score,
    leftLabel: data.leftLabel || '0',
    rightLabel: data.rightLabel || '5',
    showInfoIcon: data.showInfo,
    showActionButton: data.showAction,
    onAction: () => {
      navigateToDetails(data.id);
    }
  });
}

// Usar
updateScoreCard({
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  showInfo: true,
  showAction: true,
  id: 'score-metric'
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
  trackEvent('score_action_clicked');
}
```

### onInfoClick

Se ejecuta cuando se hace click en el icono de información.

```javascript
onInfoClick: () => {
  console.log('Info icon clicked');
  // Mostrar tooltip
  showTooltip('Esta métrica muestra la calificación promedio del producto');
  
  // Abrir modal de información
  openInfoModal();
}
```

---

## 🎨 Características Visuales

### Gráfico de Estrellas

- 5 estrellas del 1 al 5
- Estrellas llenas según el score
- Estrellas vacías para el resto
- Visualización clara de la calificación

### Estadísticas

- Contador de respuestas totales
- Promedio de calificación (0-5)
- Etiquetas personalizables

### Etiquetas

- Etiqueta izquierda (default: '0')
- Etiqueta derecha (default: '5')
- Personalizables para diferentes escalas

### Tamaños

- **sm:** Tamaño pequeño, ideal para dashboards compactos
- **md:** Tamaño mediano, uso general (default)
- **lg:** Tamaño grande, para destacar métricas importantes

---

## 🚨 Errores Comunes

### Error 1: Score Fuera de Rango
**Problema:** Score mayor a 5 o menor a 0  
**Solución:** Asegurar que el score esté entre 0 y 5

```javascript
// ❌ Incorrecto - score fuera de rango
score: 6

// ✅ Correcto - score en rango
score: 4
```

### Error 2: Average Fuera de Rango
**Problema:** Average mayor a 5 o menor a 0  
**Solución:** Asegurar que el average esté entre 0 y 5

```javascript
// ❌ Incorrecto - average fuera de rango
average: 6.5

// ✅ Correcto - average en rango
average: 4.2
```

### Error 3: Icono sin Nombre
**Problema:** Proporcionar icono con prefijo `fa-`  
**Solución:** Proporcionar solo el nombre del icono sin prefijo

```javascript
// ❌ Incorrecto - con prefijo
titleIcon: 'fa-star'

// ✅ Correcto - sin prefijo
titleIcon: 'star'
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
- [CSAT Metric Card](./charts-csat-metric-card.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

