# 📦 Progress Bar

> **Componente UBITS:** `charts-progress-bar`  
> **Categoría:** Charts  
> **API:** `window.createProgressBar()` o `<ubits-progress-bar>`  
> **Storybook Local:** http://localhost:6006/?path=/story/charts-progress-bar--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-progress-bar--default

## 🎯 Descripción

Componente Progress Bar personalizado UBITS. Se usa para mostrar progreso de tareas o procesos. Soporta 4 tamaños (xs, sm, md, lg) y dos variantes: default (un solo color) y multi-color (múltiples segmentos con diferentes colores). El segmento gris se calcula automáticamente como el resto que falta para llegar a 100%. Incluye indicador opcional de texto o porcentaje.

**Características principales:**
- 2 variantes: default (un solo color) y multi-color (múltiples segmentos)
- 4 tamaños: xs, sm, md, lg
- Indicador opcional (porcentaje o texto personalizado)
- 5 colores disponibles para segmentos: yellow, green, gray, info, error
- Hasta 5 segmentos en variante multi-color
- Segmento gris automático para completar 100%

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/charts-progress-bar--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-progress-bar--default
- **Código fuente:** `vendor/ubits/packages/addons/progress/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/progress/src/types/ProgressOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/ProgressBar.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `charts-progress-bar--default`  
**URL Local:** http://localhost:6006/?path=/story/charts-progress-bar--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-progress-bar--default

**Descripción:**
Progress Bar con todos los controles disponibles. Permite configurar tamaño, variante, valor, indicador, número de segmentos y colores individuales.

**Características mostradas:**
- Variante default y multi-color
- 4 tamaños disponibles
- Indicador de porcentaje
- Múltiples segmentos con diferentes colores

**Código de ejemplo:**
```javascript
// Variante default
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'default',
  value: 75,
  indicator: true
});

// Variante multi-color
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'multi-color',
  segments: [
    { value: 30, color: 'info' },
    { value: 25, color: 'yellow' },
    { value: 20, color: 'green' },
    { value: 25, color: 'error' }
  ],
  indicator: true
});
```

**Opciones utilizadas en la historia Default:**
- `size`: `'md'` - Tamaño mediano
- `variant`: `'default'` - Variante default
- `value`: `75` - 75% de progreso
- `indicator`: `true` - Mostrar porcentaje
- `numSegments`: `4` - 4 segmentos (multi-color)
- Segmentos con valores y colores individuales

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el progress bar |
| `size` | `string` | `'md'` | Tamaño del progress bar. Opciones: `xs`, `sm`, `md`, `lg` |
| `variant` | `string` | `'default'` | Variante del progress bar. Opciones: `default`, `multi-color` |
| `value` | `number` | `0` | Valor del progreso (0-100). Solo se usa cuando variant es `default` |
| `indicator` | `boolean \| string` | `false` | Si es `true`, muestra el porcentaje. Si es `string`, muestra ese texto |
| `segments` | `ProgressSegment[]` | - | Array de segmentos. Solo se usa cuando variant es `multi-color` |

### Estructura de ProgressSegment

```typescript
interface ProgressSegment {
  value: number;  // Valor del segmento (0-100)
  color: 'yellow' | 'green' | 'gray' | 'info' | 'error';  // Color del segmento
}
```

### Variantes

| Variante | Descripción |
|----------|-------------|
| `default` | Muestra un solo color con un valor de 0-100 |
| `multi-color` | Muestra múltiples segmentos con diferentes colores |

### Tamaños

| Tamaño | Descripción |
|--------|-------------|
| `xs` | Extra pequeño |
| `sm` | Pequeño |
| `md` | Mediano (default) |
| `lg` | Grande |

### Colores de Segmentos

| Color | Descripción |
|-------|-------------|
| `yellow` | Amarillo |
| `green` | Verde |
| `gray` | Gris (se calcula automáticamente para completar 100%) |
| `info` | Azul/Info |
| `error` | Rojo/Error |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Progress Bar Básico

```javascript
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'default',
  value: 50
});
```

### Ejemplo 2: Progress Bar con Indicador

```javascript
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'default',
  value: 75,
  indicator: true // Muestra "75%"
});
```

### Ejemplo 3: Progress Bar con Texto Personalizado

```javascript
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'default',
  value: 75,
  indicator: 'Completado' // Muestra "Completado" en lugar del porcentaje
});
```

### Ejemplo 4: Progress Bar Multi-Color

```javascript
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'multi-color',
  segments: [
    { value: 30, color: 'info' },
    { value: 25, color: 'yellow' },
    { value: 20, color: 'green' },
    { value: 25, color: 'error' }
    // El resto (0%) se completa automáticamente con gray
  ],
  indicator: true
});
```

### Ejemplo 5: Progress Bar Diferentes Tamaños

```javascript
// Extra pequeño
window.createProgressBar({
  containerId: 'progress-xs',
  size: 'xs',
  variant: 'default',
  value: 50
});

// Pequeño
window.createProgressBar({
  containerId: 'progress-sm',
  size: 'sm',
  variant: 'default',
  value: 50
});

// Mediano
window.createProgressBar({
  containerId: 'progress-md',
  size: 'md',
  variant: 'default',
  value: 50
});

// Grande
window.createProgressBar({
  containerId: 'progress-lg',
  size: 'lg',
  variant: 'default',
  value: 50
});
```

### Ejemplo 6: Progress Bar Dinámico

```javascript
let progressValue = 0;

function updateProgress() {
  window.createProgressBar({
    containerId: 'progress-container',
    size: 'md',
    variant: 'default',
    value: progressValue,
    indicator: true
  });
}

// Simular progreso
function simulateProgress() {
  const interval = setInterval(() => {
    progressValue += 10;
    if (progressValue > 100) {
      progressValue = 100;
      clearInterval(interval);
    }
    updateProgress();
  }, 500);
}

// Inicializar
updateProgress();
simulateProgress();
```

### Ejemplo 7: Progress Bar con Múltiples Segmentos

```javascript
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'multi-color',
  segments: [
    { value: 20, color: 'info' },
    { value: 30, color: 'yellow' },
    { value: 25, color: 'green' },
    { value: 15, color: 'error' },
    { value: 10, color: 'gray' }
    // Total: 100%
  ],
  indicator: true
});
```

### Ejemplo 8: Progress Bar con Segmento Automático

```javascript
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'multi-color',
  segments: [
    { value: 30, color: 'info' },
    { value: 25, color: 'yellow' },
    { value: 20, color: 'green' }
    // El resto (25%) se completa automáticamente con gray
  ],
  indicator: true
});
```

### Ejemplo 9: Progress Bar para Tareas

```javascript
function showTaskProgress(taskId, completed, total) {
  const percentage = Math.round((completed / total) * 100);
  
  window.createProgressBar({
    containerId: `progress-${taskId}`,
    size: 'md',
    variant: 'default',
    value: percentage,
    indicator: `${completed} de ${total} tareas`
  });
}

// Usar
showTaskProgress('task-1', 7, 10); // 70% - "7 de 10 tareas"
```

### Ejemplo 10: Progress Bar Completo

```javascript
window.createProgressBar({
  containerId: 'progress-container',
  size: 'md',
  variant: 'multi-color',
  segments: [
    { value: 30, color: 'info' },
    { value: 25, color: 'yellow' },
    { value: 20, color: 'green' },
    { value: 15, color: 'error' }
    // El resto (10%) se completa automáticamente con gray
  ],
  indicator: '75% completado'
});
```

---

## 🎨 Características Visuales

### Variante Default

- Barra de progreso con un solo color
- Valor de 0-100%
- Indicador opcional (porcentaje o texto)
- Segmento restante en gris automáticamente

### Variante Multi-Color

- Múltiples segmentos con diferentes colores
- Hasta 5 segmentos configurables
- Cada segmento con su propio valor y color
- Segmento gris automático para completar 100%
- Indicador opcional

### Indicador

- **Boolean `true`:** Muestra el porcentaje automáticamente
- **String:** Muestra el texto personalizado
- **Boolean `false`:** No muestra indicador

---

## 🚨 Errores Comunes

### Error 1: Valor Fuera de Rango
**Problema:** Valor mayor a 100 o menor a 0  
**Solución:** Asegurar que el valor esté entre 0 y 100

```javascript
// ❌ Incorrecto - valor fuera de rango
value: 150

// ✅ Correcto - valor en rango
value: 75
```

### Error 2: Segmentos que Suman Más de 100%
**Problema:** En variante multi-color, los segmentos suman más de 100%  
**Solución:** Asegurar que la suma de segmentos no exceda 100%

```javascript
// ❌ Incorrecto - suma > 100%
segments: [
  { value: 50, color: 'info' },
  { value: 60, color: 'yellow' } // Total: 110%
]

// ✅ Correcto - suma <= 100%
segments: [
  { value: 50, color: 'info' },
  { value: 50, color: 'yellow' } // Total: 100%
]
```

### Error 3: Color Inválido
**Problema:** Usar un color que no existe  
**Solución:** Usar solo los colores válidos

```javascript
// ❌ Incorrecto - color inválido
{ value: 50, color: 'blue' }

// ✅ Correcto - color válido
{ value: 50, color: 'info' }
```

### Error 4: Variante Multi-Color sin Segmentos
**Problema:** Usar variante multi-color sin proporcionar segmentos  
**Solución:** Proporcionar array de segmentos cuando se usa multi-color

```javascript
// ❌ Incorrecto - sin segmentos
variant: 'multi-color'
// Falta segments

// ✅ Correcto - con segmentos
variant: 'multi-color',
segments: [
  { value: 50, color: 'info' }
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

