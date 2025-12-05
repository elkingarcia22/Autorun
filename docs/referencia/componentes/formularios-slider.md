# 📦 Slider

> **Componente UBITS:** `formularios-slider`  
> **Categoría:** Formularios  
> **API:** `window.createSlider()` o `<ubits-slider>`  
> **Storybook Local:** http://localhost:6006/?path=/story/formularios-slider--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-slider--default

## 🎯 Descripción

Componente Slider UBITS con soporte para orientación horizontal/vertical, modo single/range, inputs opcionales, marcas, y todos los tamaños y estados.

**Características principales:**
- 4 tamaños: xs, sm, md, lg
- 2 orientaciones: horizontal, vertical
- 2 modos: single (un valor), range (dos valores)
- Inputs numéricos opcionales
- Marcas/ticks opcionales
- Guía de rango opcional
- Label y helper text opcionales
- Valores mínimo, máximo y paso configurables

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/formularios-slider--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-slider--default
- **Código fuente:** `vendor/ubits/packages/components/slider/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/slider/src/types/SliderOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Slider.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `formularios-slider--default`  
**URL Local:** http://localhost:6006/?path=/story/formularios-slider--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-slider--default

**Descripción:**
Slider con todos los controles disponibles. Permite configurar label, helper text, tamaño, estado, orientación, modo, valores, inputs, marcas y guía de rango.

**Características mostradas:**
- Label y helper text configurables
- Tamaño configurable (xs, sm, md, lg)
- Estado configurable (default, disabled)
- Orientación configurable (horizontal, vertical)
- Modo configurable (single, range)
- Valores mínimo, máximo y paso configurables
- Inputs numéricos opcionales
- Marcas opcionales
- Guía de rango opcional

**Código de ejemplo:**
```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Volumen',
  helperText: 'Ajusta el volumen del reproductor',
  size: 'md',
  state: 'default',
  orientation: 'horizontal',
  mode: 'single',
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  showInputs: false,
  showLabel: true,
  showHelper: false,
  showMarks: false,
  showRangeGuide: false,
  onChange: (value) => {
    console.log('Valor cambiado:', value);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `label`: `'Volumen'` - Texto del label
- `size`: `'md'` - Tamaño mediano
- `orientation`: `'horizontal'` - Orientación horizontal
- `mode`: `'single'` - Modo single (un valor)
- `min`: `0` - Valor mínimo
- `max`: `100` - Valor máximo
- `value`: `50` - Valor inicial

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el slider |
| `label` | `string` | `''` | Texto del label |
| `helperText` | `string` | `''` | Texto de ayuda (helper text) |
| `size` | `string` | `'md'` | Tamaño del slider. Opciones: `xs`, `sm`, `md`, `lg` |
| `state` | `string` | `'default'` | Estado del slider. Opciones: `default`, `disabled` |
| `orientation` | `string` | `'horizontal'` | Orientación del slider. Opciones: `horizontal`, `vertical` |
| `mode` | `string` | `'single'` | Modo del slider. Opciones: `single` (un valor), `range` (dos valores) |
| `min` | `number` | `0` | Valor mínimo |
| `max` | `number` | `100` | Valor máximo |
| `step` | `number` | `1` | Paso (step) del slider |
| `value` | `number` | `50` | Valor inicial (para modo single) |
| `values` | `number[]` | `[25, 75]` | Valores iniciales como array [min, max] (para modo range) |
| `showInputs` | `boolean` | `false` | Mostrar inputs numéricos |
| `showLabel` | `boolean` | `true` | Mostrar/ocultar label |
| `showHelper` | `boolean` | `false` | Mostrar/ocultar helper text |
| `showMarks` | `boolean` | `false` | Mostrar marcas/ticks en el slider |
| `marks` | `number[]` | `[]` | Valores donde mostrar marcas como array (ej: [0, 25, 50, 75, 100]) |
| `showRangeGuide` | `boolean` | `false` | Mostrar guía visual del rango debajo del slider (ej: 0 - 100) |
| `onChange` | `function` | - | Callback que se ejecuta cuando cambia el valor del slider |

---

## 🎨 Tamaños y Estados

### Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano - default
- **`lg`**: Grande

### Estados

- **`default`**: Estado normal - default
- **`disabled`**: Estado deshabilitado (no interactivo)

---

## 🎨 Orientaciones y Modos

### Orientaciones

- **`horizontal`**: Horizontal (izquierda a derecha) - default
- **`vertical`**: Vertical (arriba a abajo)

### Modos

- **`single`**: Un solo valor - default
- **`range`**: Dos valores (rango mínimo y máximo)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Slider Básico

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Volumen',
  min: 0,
  max: 100,
  value: 50,
  onChange: (value) => {
    console.log('Volumen:', value);
    setVolume(value);
  }
});
```

### Ejemplo 2: Slider con Inputs

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Precio',
  min: 0,
  max: 1000,
  step: 10,
  value: 500,
  showInputs: true,
  onChange: (value) => {
    updatePrice(value);
  }
});
```

### Ejemplo 3: Slider Range (Rango)

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Rango de precios',
  mode: 'range',
  min: 0,
  max: 1000,
  step: 10,
  values: [200, 800],
  showInputs: true,
  onChange: (values) => {
    console.log('Rango:', values); // [min, max]
    updatePriceRange(values[0], values[1]);
  }
});
```

### Ejemplo 4: Slider con Marcas

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Nivel de satisfacción',
  min: 0,
  max: 10,
  step: 1,
  value: 5,
  showMarks: true,
  marks: [0, 2, 4, 6, 8, 10],
  onChange: (value) => {
    updateSatisfaction(value);
  }
});
```

### Ejemplo 5: Slider con Guía de Rango

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Edad',
  min: 18,
  max: 100,
  step: 1,
  value: 30,
  showRangeGuide: true,
  onChange: (value) => {
    updateAge(value);
  }
});
```

### Ejemplo 6: Slider Vertical

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Volumen',
  orientation: 'vertical',
  min: 0,
  max: 100,
  value: 50,
  onChange: (value) => {
    setVolume(value);
  }
});
```

### Ejemplo 7: Slider con Helper Text

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Brillo',
  helperText: 'Ajusta el brillo de la pantalla',
  min: 0,
  max: 100,
  value: 75,
  showHelper: true,
  onChange: (value) => {
    setBrightness(value);
  }
});
```

### Ejemplo 8: Slider Deshabilitado

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Volumen',
  min: 0,
  max: 100,
  value: 50,
  state: 'disabled'
});
```

### Ejemplo 9: Slider Pequeño

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Opacidad',
  size: 'sm',
  min: 0,
  max: 100,
  value: 50,
  onChange: (value) => {
    setOpacity(value / 100);
  }
});
```

### Ejemplo 10: Slider Range Completo

```javascript
window.createSlider({
  containerId: 'slider-container',
  label: 'Filtro de fechas',
  mode: 'range',
  min: 0,
  max: 365,
  step: 1,
  values: [30, 180],
  showInputs: true,
  showMarks: true,
  marks: [0, 90, 180, 270, 365],
  showRangeGuide: true,
  onChange: (values) => {
    const [minDays, maxDays] = values;
    filterByDateRange(minDays, maxDays);
  }
});
```

---

## 🔄 Callbacks y Eventos

### onChange

Se ejecuta cuando cambia el valor del slider.

**Para modo single:**
```javascript
onChange: (value) => {
  console.log('Valor:', value); // number
  updateValue(value);
}
```

**Para modo range:**
```javascript
onChange: (values) => {
  console.log('Valores:', values); // [min, max]
  const [minValue, maxValue] = values;
  updateRange(minValue, maxValue);
}
```

**Parámetros:**
- `value` (number): Valor actual (modo single)
- `values` (number[]): Array con [min, max] (modo range)

---

## 🎨 Características Visuales

### Inputs Numéricos

- Se muestran a los lados del slider (horizontal) o arriba/abajo (vertical)
- Permiten ingresar valores directamente
- Se sincronizan con el slider

### Marcas (Marks)

- Se muestran como ticks en el slider
- Indican valores específicos
- Útiles para mostrar valores importantes

### Guía de Rango

- Muestra el rango mínimo y máximo debajo del slider
- Formato: "min - max"
- Útil para mostrar el rango completo

---

## 🚨 Errores Comunes

### Error 1: Valores Fuera del Rango
**Problema:** Valor inicial fuera del rango min-max  
**Solución:** Asegurar que el valor esté dentro del rango

```javascript
// ❌ Incorrecto - valor fuera del rango
min: 0,
max: 100,
value: 150 // Fuera del rango

// ✅ Correcto - valor dentro del rango
min: 0,
max: 100,
value: 50 // Dentro del rango
```

### Error 2: Modo Range sin Array de Valores
**Problema:** Usar `mode: 'range'` con `value` en lugar de `values`  
**Solución:** Usar `values` como array [min, max] para modo range

```javascript
// ❌ Incorrecto - range con value
mode: 'range',
value: 50

// ✅ Correcto - range con values
mode: 'range',
values: [25, 75]
```

### Error 3: Step Muy Grande
**Problema:** Step mayor que el rango  
**Solución:** Asegurar que step sea menor que (max - min)

```javascript
// ❌ Incorrecto - step muy grande
min: 0,
max: 10,
step: 20 // Mayor que el rango

// ✅ Correcto - step apropiado
min: 0,
max: 100,
step: 10 // Menor que el rango
```

### Error 4: Marcas Fuera del Rango
**Problema:** Marcas fuera del rango min-max  
**Solución:** Asegurar que todas las marcas estén dentro del rango

```javascript
// ❌ Incorrecto - marcas fuera del rango
min: 0,
max: 100,
marks: [0, 50, 150] // 150 está fuera

// ✅ Correcto - marcas dentro del rango
min: 0,
max: 100,
marks: [0, 25, 50, 75, 100]
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

