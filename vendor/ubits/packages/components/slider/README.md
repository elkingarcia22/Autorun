# @ubits/slider

Componente Slider UBITS como add-on intercambiable, con soporte para orientación horizontal/vertical, modo single/range, y opción de inputs numéricos.

## ✨ Características

- ✅ **Orientación**: Horizontal y vertical
- ✅ **Modos**: Single (un valor) y Range (dos valores)
- ✅ **Inputs opcionales**: Con o sin inputs numéricos
- ✅ **Tamaños**: XS, S, M, L (4 tamaños)
- ✅ **Estados**: Default, Disabled
- ✅ **Marcas/Ticks**: Opción de mostrar marcas en el slider
- ✅ **Navegación por teclado**: Soporte completo de accesibilidad
- ✅ **Touch support**: Funciona en dispositivos táctiles
- ✅ **Web Component nativo**: `<ubits-slider>`
- ✅ **API programática**: `renderSlider()` y `createSlider()`

## 📦 Instalación

```bash
pnpm add @ubits/slider
```

## 🚀 Uso

### Web Component (HTML)

```html
<!-- Slider básico horizontal -->
<ubits-slider
  container-id="slider-1"
  label="Volumen"
  min="0"
  max="100"
  value="50"
  step="1"
></ubits-slider>

<!-- Slider con inputs -->
<ubits-slider
  container-id="slider-2"
  label="Temperatura"
  min="0"
  max="100"
  value="25"
  step="1"
  show-inputs
></ubits-slider>

<!-- Slider range (dos valores) -->
<ubits-slider
  container-id="slider-3"
  label="Rango de precios"
  min="0"
  max="1000"
  values="[100, 500]"
  step="10"
  mode="range"
  show-inputs
></ubits-slider>

<!-- Slider vertical -->
<ubits-slider
  container-id="slider-4"
  label="Altura"
  min="0"
  max="200"
  value="100"
  orientation="vertical"
  show-inputs
></ubits-slider>

<!-- Slider con marcas -->
<ubits-slider
  container-id="slider-5"
  label="Nivel"
  min="0"
  max="100"
  value="50"
  step="10"
  show-marks
  marks="[0, 25, 50, 75, 100]"
></ubits-slider>
```

### JavaScript/TypeScript

```typescript
import { renderSlider, createSlider } from '@ubits/slider';

// Renderizar HTML string
const html = renderSlider({
  containerId: 'my-slider',
  label: 'Volumen',
  min: 0,
  max: 100,
  value: 50,
  step: 1,
  showInputs: true
});

// Crear elemento DOM
const slider = createSlider({
  containerId: 'my-slider',
  label: 'Temperatura',
  min: 0,
  max: 100,
  value: 25,
  step: 1,
  showInputs: true,
  onChange: (value) => {
    console.log('Valor cambiado:', value);
  }
});

// Slider range
const rangeSlider = createSlider({
  containerId: 'my-range-slider',
  label: 'Rango',
  min: 0,
  max: 1000,
  values: [100, 500],
  step: 10,
  mode: 'range',
  showInputs: true,
  onRangeChange: (values) => {
    console.log('Rango cambiado:', values);
  }
});

// Slider vertical
const verticalSlider = createSlider({
  containerId: 'my-vertical-slider',
  label: 'Altura',
  min: 0,
  max: 200,
  value: 100,
  orientation: 'vertical',
  showInputs: true
});
```

### CSS (HTML directo)

```html
<link rel="stylesheet" href="@ubits/tokens/dist/tokens.css">
<link rel="stylesheet" href="@ubits/typography/tokens-typography.css">
<link rel="stylesheet" href="@ubits/slider/styles/slider.css">
```

## 📋 Opciones

### SliderOptions

```typescript
interface SliderOptions {
  // Requerido
  containerId: string;

  // Opcional
  label?: string;
  helperText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  state?: 'default' | 'disabled';
  orientation?: 'horizontal' | 'vertical';
  mode?: 'single' | 'range';
  min?: number; // default: 0
  max?: number; // default: 100
  step?: number; // default: 1
  value?: number; // para modo single
  values?: [number, number]; // para modo range
  showInputs?: boolean; // default: false
  showLabel?: boolean; // default: true
  showHelper?: boolean; // default: false
  showMarks?: boolean; // default: false
  marks?: number[]; // valores donde mostrar marcas
  onChange?: (value: number, event?: Event) => void;
  onRangeChange?: (values: [number, number], event?: Event) => void;
  className?: string;
  attributes?: Record<string, string>;
}
```

## 🎨 Variantes

### Orientación

- **Horizontal** (por defecto): El slider se extiende de izquierda a derecha
- **Vertical**: El slider se extiende de arriba hacia abajo

### Modo

- **Single**: Un solo valor controlado por un thumb
- **Range**: Dos valores controlados por dos thumbs (min y max)

### Inputs

- **Sin inputs**: Solo el slider visual
- **Con inputs**: Inputs numéricos a los lados (o arriba/abajo en vertical) para edición directa

### Tamaños

- **XS**: Track de 2px, thumb de 12px
- **SM**: Track de 3px, thumb de 14px
- **MD**: Track de 4px, thumb de 16px (por defecto)
- **LG**: Track de 6px, thumb de 20px

## ⌨️ Navegación por Teclado

- **Arrow Right/Up**: Incrementar valor
- **Arrow Left/Down**: Decrementar valor
- **Home**: Ir al valor mínimo
- **End**: Ir al valor máximo

## 🎯 Ejemplos de Uso

### Slider Simple con Input

```html
<div id="volume-slider"></div>
<script>
  createSlider({
    containerId: 'volume-slider',
    label: 'Volumen',
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    showInputs: true,
    onChange: (value) => {
      console.log('Volumen:', value);
    }
  });
</script>
```

### Slider Range

```html
<div id="price-range"></div>
<script>
  createSlider({
    containerId: 'price-range',
    label: 'Rango de precios',
    min: 0,
    max: 1000,
    values: [100, 500],
    step: 10,
    mode: 'range',
    showInputs: true,
    onRangeChange: (values) => {
      console.log('Rango:', values[0], '-', values[1]);
    }
  });
</script>
```

### Slider Vertical

```html
<div id="height-slider" style="height: 300px;"></div>
<script>
  createSlider({
    containerId: 'height-slider',
    label: 'Altura',
    min: 0,
    max: 200,
    value: 100,
    orientation: 'vertical',
    showInputs: true
  });
</script>
```

## 🔧 API

### Métodos del Slider

```typescript
const slider = createSlider({ ... });

// Obtener valor actual
const value = slider.getValue(); // number | [number, number]

// Establecer valor
slider.setValue(75); // para single
slider.setValue([100, 500]); // para range

// Deshabilitar
slider.disable();

// Habilitar
slider.enable();

// Cambiar estado
slider.setState('disabled');
slider.setState('default');
```

## 🎨 Tokens UBITS Utilizados

El componente utiliza los siguientes tokens UBITS:

- `var(--ubits-bg-1)`, `var(--ubits-bg-3)` - Fondos
- `var(--ubits-fg-1-high)`, `var(--ubits-fg-1-medium)`, `var(--ubits-fg-1-low)` - Textos
- `var(--ubits-border-1)`, `var(--ubits-border-2)` - Bordes
- `var(--ubits-accent-brand-static-inverted)` - Color principal
- `var(--ubits-spacing-*)` - Espaciados
- `var(--ubits-border-radius-*)` - Bordes redondeados
- `var(--font-*)` - Tipografía

## 📱 Responsive

El slider se adapta automáticamente al contenedor. Para sliders verticales, asegúrate de que el contenedor tenga una altura definida.

## ♿ Accesibilidad

- Soporte completo de navegación por teclado
- Atributos ARIA apropiados
- Focus visible
- Soporte para lectores de pantalla

## 🔗 Dependencias

- `@ubits/tokens` - Tokens de diseño
- `@ubits/typography` - Tipografía
- `@ubits/input` - Componente Input (para inputs opcionales)

