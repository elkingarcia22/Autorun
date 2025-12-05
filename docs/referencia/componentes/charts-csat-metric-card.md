# 📦 CSAT Metric Card

> **Componente UBITS:** `charts-csat-metric-card`  
> **Categoría:** Charts  
> **API:** `window.createCSATMetricCard()` o `<ubits-csat-metric-card>`  
> **Storybook Local:** http://localhost:6006/?path=/story/charts-csat-metric-card--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-csat-metric-card--default

## 🎯 Descripción

Componente CSATMetricCard UBITS para mostrar métricas CSAT (Customer Satisfaction) con caritas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 caritas con textos. Usa tokens UBITS para colores, tipografía y espaciado.

**Características principales:**
- Título con icono opcional
- Contador de respuestas totales
- Promedio de calificación (0-5)
- Gráfico de 5 caritas (emojis) con textos
- Score actual (0-5) para destacar carita
- Icono de información opcional
- Botón de acción opcional
- 3 tamaños: sm, md, lg
- Completamente personalizable con tokens UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/charts-csat-metric-card--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-csat-metric-card--default
- **Código fuente:** `vendor/ubits/packages/addons/csat-metric-card/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/csat-metric-card/src/types/CSATMetricCardOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/CSATMetricCard.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `charts-csat-metric-card--default`  
**URL Local:** http://localhost:6006/?path=/story/charts-csat-metric-card--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-csat-metric-card--default

**Descripción:**
CSAT Metric Card con todos los controles disponibles. Permite configurar título, respuestas, promedio, score, iconos y botón de acción.

**Características mostradas:**
- Título con icono
- Contador de respuestas
- Promedio de calificación
- Gráfico de 5 caritas
- Score destacado
- Icono de información
- Botón de acción

**Código de ejemplo:**
```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
  title: 'Califica el producto',
  totalResponses: 7,
  responsesLabel: 'respuestas',
  average: 4.0,
  averageLabel: 'Promedio:',
  score: 3,
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
| `score` | `number` | `0` | Score actual (0-5) para mostrar en las caritas |
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

### Caritas (Emojis)

El componente muestra 5 caritas con valores del 1 al 5:
- 1: 😞 (Muy insatisfecho)
- 2: 😕 (Insatisfecho)
- 3: 😐 (Neutral)
- 4: 🙂 (Satisfecho)
- 5: 😊 (Muy satisfecho)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: CSAT Metric Card Básico

```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4
});
```

### Ejemplo 2: CSAT Metric Card con Icono

```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  titleIcon: 'star',
  titleIconStyle: 'regular'
});
```

### Ejemplo 3: CSAT Metric Card con Etiquetas Personalizadas

```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
  title: 'Califica el servicio',
  totalResponses: 25,
  responsesLabel: 'evaluaciones',
  average: 4.5,
  averageLabel: 'Calificación promedio:',
  score: 5
});
```

### Ejemplo 4: CSAT Metric Card con Icono de Información

```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  showInfoIcon: true,
  onInfoClick: () => {
    showTooltip('Esta métrica muestra la satisfacción del cliente');
  }
});
```

### Ejemplo 5: CSAT Metric Card con Botón de Acción

```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
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

### Ejemplo 6: CSAT Metric Card Completo

```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
  title: 'Califica el producto',
  totalResponses: 7,
  responsesLabel: 'respuestas',
  average: 4.0,
  averageLabel: 'Promedio:',
  score: 3,
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
    showTooltip('Esta métrica muestra la satisfacción del cliente');
  }
});
```

### Ejemplo 7: CSAT Metric Card Diferentes Tamaños

```javascript
// Pequeño
window.createCSATMetricCard({
  containerId: 'csat-sm',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  size: 'sm'
});

// Mediano
window.createCSATMetricCard({
  containerId: 'csat-md',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  size: 'md'
});

// Grande
window.createCSATMetricCard({
  containerId: 'csat-lg',
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  size: 'lg'
});
```

### Ejemplo 8: CSAT Metric Card con Score Bajo

```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
  title: 'Califica el producto',
  totalResponses: 15,
  average: 2.5,
  score: 2, // Score bajo (insatisfecho)
  showInfoIcon: true
});
```

### Ejemplo 9: CSAT Metric Card con Score Alto

```javascript
window.createCSATMetricCard({
  containerId: 'csat-metric-card-container',
  title: 'Califica el producto',
  totalResponses: 20,
  average: 4.8,
  score: 5, // Score alto (muy satisfecho)
  showActionButton: true
});
```

### Ejemplo 10: CSAT Metric Card Dinámico

```javascript
function updateCSAT(data) {
  window.createCSATMetricCard({
    containerId: 'csat-metric-card-container',
    title: data.title,
    totalResponses: data.totalResponses,
    responsesLabel: data.responsesLabel || 'respuestas',
    average: data.average,
    averageLabel: data.averageLabel || 'Promedio:',
    score: data.score,
    showInfoIcon: data.showInfo,
    showActionButton: data.showAction,
    onAction: () => {
      navigateToDetails(data.id);
    }
  });
}

// Usar
updateCSAT({
  title: 'Califica el producto',
  totalResponses: 10,
  average: 4.2,
  score: 4,
  showInfo: true,
  showAction: true,
  id: 'csat-metric'
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
  trackEvent('csat_action_clicked');
}
```

### onInfoClick

Se ejecuta cuando se hace click en el icono de información.

```javascript
onInfoClick: () => {
  console.log('Info icon clicked');
  // Mostrar tooltip
  showTooltip('Esta métrica muestra la satisfacción del cliente');
  
  // Abrir modal de información
  openInfoModal();
}
```

---

## 🎨 Características Visuales

### Gráfico de Caritas

- 5 caritas (emojis) del 1 al 5
- Carita correspondiente al score destacada
- Textos descriptivos para cada carita
- Visualización clara de la satisfacción

### Estadísticas

- Contador de respuestas totales
- Promedio de calificación (0-5)
- Etiquetas personalizables

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
- [Bar Metric Card](./charts-bar-metric-card.md) - Componente relacionado
- [Circle Metric Card](./charts-circle-metric-card.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

