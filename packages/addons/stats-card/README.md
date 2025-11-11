# @ubits/stats-card

Componente StatsCard UBITS para mostrar métricas y estadísticas usando tokens UBITS, tipografía UBITS y componentes UBITS.

## 📋 Descripción

El componente `StatsCard` permite mostrar métricas y estadísticas en formato de tarjeta, ideal para dashboards y visualización de datos. Utiliza completamente el sistema de diseño UBITS con tokens de color, tipografía y espaciado.

## ✨ Características

- ✅ Usa tokens UBITS para colores, tipografía y espaciado
- ✅ Soporte para múltiples variantes visuales (default, highlight, success, warning, error, info)
- ✅ Layouts flexibles: grid responsive o lista vertical
- ✅ Indicadores de tendencia (aumento, disminución, neutral)
- ✅ Iconos FontAwesome integrados
- ✅ Responsive design
- ✅ Web Component compatible
- ✅ Integración con Autoframe Hub

## 📦 Instalación

```bash
npm install @ubits/stats-card
```

## 🚀 Uso Básico

### Como función

```typescript
import { renderStatsCard, createStatsCard } from '@ubits/stats-card';
import type { StatsCardOptions } from '@ubits/stats-card';

const options: StatsCardOptions = {
  title: 'Métricas del Dashboard',
  variant: 'default',
  size: 'md',
  layout: 'grid',
  columns: 2,
  bordered: true,
  stats: [
    {
      label: 'Usuarios Activos',
      value: 1250,
      icon: 'users',
      iconStyle: 'solid',
      change: {
        value: 12.5,
        type: 'increase',
        label: '+12.5%'
      }
    },
    {
      label: 'Cursos Completados',
      value: 342,
      icon: 'graduation-cap',
      iconStyle: 'solid'
    }
  ]
};

// Renderizar como HTML string
const html = renderStatsCard(options);

// O crear e insertar en el DOM
createStatsCard({
  ...options,
  containerId: 'my-stats-container'
});
```

### Como Web Component

```html
<ubits-stats-card
  title="Métricas"
  variant="default"
  size="md"
  layout="grid"
  columns="2"
  bordered
></ubits-stats-card>

<script type="module">
  import '@ubits/stats-card';
  
  const card = document.querySelector('ubits-stats-card');
  card.setOptions({
    stats: [
      { label: 'Total', value: 1234 },
      { label: 'Activos', value: 567 }
    ]
  });
</script>
```

## 🎨 Variantes

- `default` - Estilo por defecto
- `highlight` - Resaltado con color de marca
- `success` - Indicador de éxito
- `warning` - Indicador de advertencia
- `error` - Indicador de error
- `info` - Indicador informativo

## 📏 Tamaños

- `sm` - Pequeño
- `md` - Mediano (por defecto)
- `lg` - Grande

## 📐 Layouts

- `grid` - Grid responsive (1-4 columnas)
- `list` - Lista vertical

## 🔧 API

### StatsCardOptions

```typescript
interface StatsCardOptions {
  title?: string;
  variant?: 'default' | 'highlight' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  stats: StatItem[];
  layout?: 'grid' | 'list';
  columns?: 1 | 2 | 3 | 4;
  bordered?: boolean;
  elevated?: boolean;
  className?: string;
  attributes?: Record<string, string>;
  onClick?: (event: MouseEvent) => void;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: (event: MouseEvent) => void;
}
```

### StatItem

```typescript
interface StatItem {
  label: string;
  value: string | number;
  icon?: string;
  iconStyle?: 'regular' | 'solid';
  iconColor?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    label?: string;
  };
  description?: string;
}
```

## 🎯 Ejemplos

Ver más ejemplos en Storybook: `Components/Stats Card`

## 📚 Tokens UBITS Utilizados

- Colores: `--ubits-bg-1`, `--ubits-fg-1-high`, `--ubits-accent-brand`, etc.
- Tipografía: `--font-sans`, `--weight-semibold`, `--font-body-md-size`, etc.
- Espaciado: `--ubits-spacing-sm`, `--ubits-spacing-md`, `--ubits-spacing-lg`, etc.
- Bordes: `--ubits-border-1`, `--ubits-radius-md`, etc.
- Sombras: `--ubits-shadow-sm`, `--ubits-shadow-md`

## 🔗 Integración con Autoframe Hub

Este componente está registrado como add-on en Autoframe Hub y puede ser utilizado en cualquier proyecto que use el sistema Autoframe.

## 📝 Licencia

Parte del sistema de diseño UBITS.

