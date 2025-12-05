# 📦 Text Metric Card

> **Componente UBITS:** `charts-text-metric-card`  
> **Categoría:** Charts  
> **API:** `window.createMetricCard()` o `<ubits-metric-card>`  
> **Storybook Local:** http://localhost:6006/?path=/story/charts-text-metric-card--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-text-metric-card--default

## 🎯 Descripción

Componente MetricCard UBITS para mostrar métricas numéricas. Usa tokens UBITS para colores, tipografía y espaciado. Soporta iconos, tamaños y es completamente personalizable.

**Características principales:**
- Título de la métrica
- Valor principal (número o string)
- Texto descriptivo (label)
- Icono opcional en el título
- Icono de información opcional
- Botón de acción opcional
- 3 tamaños: sm, md, lg
- Completamente personalizable con tokens UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/charts-text-metric-card--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-text-metric-card--default
- **Código fuente:** `vendor/ubits/packages/addons/metric-card/`
- **Tipos TypeScript:** `vendor/ubits/packages/addons/metric-card/src/types/MetricCardOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/MetricCard.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `charts-text-metric-card--default`  
**URL Local:** http://localhost:6006/?path=/story/charts-text-metric-card--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/charts-text-metric-card--default

**Descripción:**
Metric Card con todos los controles disponibles. Permite configurar título, valor, label, iconos, botón de acción y tamaño.

**Características mostradas:**
- Título con icono
- Valor principal
- Label descriptivo
- Icono de información
- Botón de acción
- Tamaño mediano

**Código de ejemplo:**
```javascript
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Net confidence score',
  value: '200 / 204',
  label: 'Colaboradores',
  titleIcon: 'user',
  titleIconStyle: 'regular',
  titleIconColor: 'var(--modifiers-normal-color-light-fg-2-medium)',
  showInfoIcon: true,
  showActionButton: true,
  size: 'md',
  onActionClick: () => {
    console.log('Action button clicked');
  },
  onInfoClick: () => {
    console.log('Info icon clicked');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `title`: `'Net confidence score'` - Título de la métrica
- `value`: `'200 / 204'` - Valor principal
- `label`: `'Colaboradores'` - Texto descriptivo
- `titleIcon`: `'user'` - Icono del título
- `titleIconStyle`: `'regular'` - Estilo regular del icono
- `showInfoIcon`: `true` - Mostrar icono de información
- `showActionButton`: `true` - Mostrar botón de acción
- `size`: `'md'` - Tamaño mediano

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará la card |
| `title` | `string` | `'Net confidence score'` | Título de la métrica |
| `value` | `string \| number` | `'200 / 204'` | Valor principal (puede ser número o string) |
| `label` | `string` | `'Colaboradores'` | Texto descriptivo debajo del valor |
| `titleIcon` | `string` | - | Nombre del icono FontAwesome para el título (sin prefijo `fa-`) |
| `titleIconStyle` | `string` | `'regular'` | Estilo del icono del título. Opciones: `regular`, `solid` |
| `titleIconColor` | `string` | - | Color del icono del título (puede usar tokens UBITS) |
| `showInfoIcon` | `boolean` | `false` | Mostrar icono de información junto al título |
| `showActionButton` | `boolean` | `false` | Mostrar botón de acción con flecha a la derecha |
| `size` | `string` | `'md'` | Tamaño de la tarjeta. Opciones: `sm`, `md`, `lg` |
| `onActionClick` | `function` | - | Callback que se ejecuta al hacer click en el botón de acción |
| `onInfoClick` | `function` | - | Callback que se ejecuta al hacer click en el icono de información |

### Tamaños

| Tamaño | Descripción |
|--------|-------------|
| `sm` | Pequeño |
| `md` | Mediano (default) |
| `lg` | Grande |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Metric Card Básico

```javascript
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Total Users',
  value: 1250,
  label: 'Active users'
});
```

### Ejemplo 2: Metric Card con Icono

```javascript
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Total Users',
  value: 1250,
  label: 'Active users',
  titleIcon: 'user',
  titleIconStyle: 'regular'
});
```

### Ejemplo 3: Metric Card con Valor String

```javascript
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Net confidence score',
  value: '200 / 204',
  label: 'Colaboradores'
});
```

### Ejemplo 4: Metric Card con Icono de Información

```javascript
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Total Users',
  value: 1250,
  label: 'Active users',
  showInfoIcon: true,
  onInfoClick: () => {
    showTooltip('This metric shows the total number of active users');
  }
});
```

### Ejemplo 5: Metric Card con Botón de Acción

```javascript
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Total Users',
  value: 1250,
  label: 'Active users',
  showActionButton: true,
  onActionClick: () => {
    navigateToUsersPage();
  }
});
```

### Ejemplo 6: Metric Card Completo

```javascript
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Net confidence score',
  value: '200 / 204',
  label: 'Colaboradores',
  titleIcon: 'user',
  titleIconStyle: 'regular',
  titleIconColor: 'var(--modifiers-normal-color-light-fg-2-medium)',
  showInfoIcon: true,
  showActionButton: true,
  size: 'md',
  onActionClick: () => {
    navigateToDetails();
  },
  onInfoClick: () => {
    showTooltip('This metric shows the net confidence score');
  }
});
```

### Ejemplo 7: Metric Card Diferentes Tamaños

```javascript
// Pequeño
window.createMetricCard({
  containerId: 'metric-sm',
  title: 'Users',
  value: 1250,
  label: 'Active',
  size: 'sm'
});

// Mediano
window.createMetricCard({
  containerId: 'metric-md',
  title: 'Users',
  value: 1250,
  label: 'Active',
  size: 'md'
});

// Grande
window.createMetricCard({
  containerId: 'metric-lg',
  title: 'Users',
  value: 1250,
  label: 'Active',
  size: 'lg'
});
```

### Ejemplo 8: Metric Card con Icono Solid

```javascript
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Total Revenue',
  value: '$125,000',
  label: 'This month',
  titleIcon: 'dollar-sign',
  titleIconStyle: 'solid',
  titleIconColor: 'var(--modifiers-normal-color-light-fg-1-high)'
});
```

### Ejemplo 9: Metric Card Dinámico

```javascript
function updateMetricCard(data) {
  window.createMetricCard({
    containerId: 'metric-card-container',
    title: data.title,
    value: data.value,
    label: data.label,
    titleIcon: data.icon,
    showInfoIcon: data.showInfo,
    showActionButton: data.showAction,
    onActionClick: () => {
      navigateToDetails(data.id);
    }
  });
}

// Usar
updateMetricCard({
  title: 'Total Users',
  value: 1250,
  label: 'Active users',
  icon: 'user',
  showInfo: true,
  showAction: true,
  id: 'users-metric'
});
```

### Ejemplo 10: Múltiples Metric Cards

```javascript
const metrics = [
  {
    id: 'users',
    title: 'Total Users',
    value: 1250,
    label: 'Active users',
    icon: 'user'
  },
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$125,000',
    label: 'This month',
    icon: 'dollar-sign'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: 342,
    label: 'This week',
    icon: 'shopping-cart'
  }
];

metrics.forEach(metric => {
  window.createMetricCard({
    containerId: `metric-${metric.id}`,
    title: metric.title,
    value: metric.value,
    label: metric.label,
    titleIcon: metric.icon,
    showActionButton: true,
    onActionClick: () => {
      navigateToDetails(metric.id);
    }
  });
});
```

---

## 🔄 Callbacks y Eventos

### onActionClick

Se ejecuta cuando se hace click en el botón de acción.

```javascript
onActionClick: () => {
  console.log('Action button clicked');
  // Navegar a detalles
  navigateToDetails();
  
  // Abrir modal
  openDetailsModal();
  
  // Enviar evento
  trackEvent('metric_action_clicked', {
    metricId: 'users'
  });
}
```

### onInfoClick

Se ejecuta cuando se hace click en el icono de información.

```javascript
onInfoClick: () => {
  console.log('Info icon clicked');
  // Mostrar tooltip
  showTooltip('This metric shows the total number of active users');
  
  // Abrir modal de información
  openInfoModal();
  
  // Enviar evento
  trackEvent('metric_info_clicked', {
    metricId: 'users'
  });
}
```

---

## 🎨 Características Visuales

### Estructura

- **Título:** En la parte superior con icono opcional
- **Valor:** Valor principal destacado
- **Label:** Texto descriptivo debajo del valor
- **Icono de información:** Opcional, junto al título
- **Botón de acción:** Opcional, en la esquina superior derecha

### Tamaños

- **sm:** Tamaño pequeño, ideal para dashboards compactos
- **md:** Tamaño mediano, uso general (default)
- **lg:** Tamaño grande, para destacar métricas importantes

### Tokens UBITS

- Usa tokens UBITS para colores, tipografía y espaciado
- Completamente personalizable con tokens
- Soporta dark mode automáticamente

---

## 🚨 Errores Comunes

### Error 1: Icono sin Nombre
**Problema:** Proporcionar icono con prefijo `fa-`  
**Solución:** Proporcionar solo el nombre del icono sin prefijo

```javascript
// ❌ Incorrecto - con prefijo
titleIcon: 'fa-user'

// ✅ Correcto - sin prefijo
titleIcon: 'user'
```

### Error 2: Valor Vacío
**Problema:** No proporcionar valor  
**Solución:** Siempre proporcionar un valor (número o string)

```javascript
// ❌ Incorrecto - sin valor
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Total Users'
  // Falta value
});

// ✅ Correcto - con valor
window.createMetricCard({
  containerId: 'metric-card-container',
  title: 'Total Users',
  value: 1250
});
```

### Error 3: Tamaño Inválido
**Problema:** Usar un tamaño que no existe  
**Solución:** Usar solo sm, md o lg

```javascript
// ❌ Incorrecto - tamaño inválido
size: 'xl'

// ✅ Correcto - tamaño válido
size: 'md'
```

### Error 4: Icono Style Inválido
**Problema:** Usar un estilo de icono que no existe  
**Solución:** Usar solo regular o solid

```javascript
// ❌ Incorrecto - estilo inválido
titleIconStyle: 'outline'

// ✅ Correcto - estilo válido
titleIconStyle: 'regular'
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Simple Card](./layout-simple-card.md) - Componente relacionado

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

