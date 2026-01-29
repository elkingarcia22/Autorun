# @ubits/accordion

Componente Accordion UBITS con múltiples variantes: lista simple, tipo caja, chevron izquierda/derecha, iconos opcionales y sub-headers.

## 📦 Instalación

```bash
# El componente ya está incluido en el proyecto
# No requiere instalación adicional
```

## 🚀 Uso

### Carga de Tokens

**⚠️ IMPORTANTE**: Este componente requiere que se carguen los tokens de Figma ANTES del CSS del componente:

```html
<!-- 1. Cargar tokens de Figma (OBLIGATORIO) -->
<link rel="stylesheet" href="../../tokens/dist/figma-tokens.css">

<!-- 2. Cargar tokens antiguos (para spacing, border-radius, typography sin equivalente en Figma) -->
<link rel="stylesheet" href="../../tokens/dist/tokens.css">
<link rel="stylesheet" href="../../typography/tokens-typography.css">

<!-- 3. Cargar CSS del componente -->
<link rel="stylesheet" href="../../components/accordion/src/styles/accordion.css">
```

### Ejemplo Básico

```typescript
import { createAccordion } from '@ubits/accordion';
import type { AccordionOptions } from '@ubits/accordion';

const options: AccordionOptions = {
  items: [
    {
      id: '1',
      title: 'Título del item',
      content: 'Contenido del item',
    },
  ],
  variant: 'list',
  chevronPosition: 'right',
  allowMultiple: false,
  showIcons: true,
};

createAccordion(container, options);
```

## 🎨 Tokens Utilizados

### Tokens de Color (Figma)
- `--modifiers-normal-color-light-border-1` - Borde del accordion
- `--modifiers-normal-color-light-fg-1-high` - Color del título
- `--modifiers-normal-color-light-fg-1-medium` - Color del subheader y contenido
- `--modifiers-normal-color-light-bg-1` - Fondo del accordion (boxed)
- `--modifiers-normal-color-light-bg-2` - Fondo hover (boxed)

### Tokens de Typography (Sistema Antiguo)
- `--font-sans` - Familia de fuente
- `--font-body-md-size` - Tamaño de fuente del título
- `--font-body-sm-size` - Tamaño de fuente del subheader
- `--font-body-md-line-height` - Altura de línea del título
- `--font-body-sm-line-height` - Altura de línea del subheader
- `--weight-semibold` - Peso de fuente del título
- `--weight-regular` - Peso de fuente del subheader

**Nota**: Los tokens de typography NO tienen equivalente directo en Figma (solo hay "text styles" completos), por lo que se mantienen en el sistema antiguo.

### Tokens de Spacing (Sistema Antiguo)
- `--ubits-spacing-none` - Sin espaciado
- `--ubits-spacing-xs` - Espaciado extra pequeño
- `--ubits-spacing-sm` - Espaciado pequeño
- `--ubits-spacing-md` - Espaciado medio
- `--ubits-spacing-lg` - Espaciado grande
- `--ubits-spacing-xl` - Espaciado extra grande

**Nota**: Los tokens de spacing NO tienen equivalente en Figma, por lo que se mantienen en el sistema antiguo.

### Tokens de Border-radius (Sistema Antiguo)
- `--ubits-border-radius-md` - Radio de borde medio

**Nota**: Los tokens de border-radius NO tienen equivalente en Figma, por lo que se mantienen en el sistema antiguo.

## 📋 Variantes

### List
Accordion simple con borde inferior entre items.

### Boxed
Accordion con items en cajas individuales con borde y fondo.

## 🔧 Props

- `variant`: `'list' | 'boxed'` - Variante del accordion
- `chevronPosition`: `'left' | 'right'` - Posición del chevron
- `allowMultiple`: `boolean` - Permitir múltiples items abiertos
- `showIcons`: `boolean` - Mostrar u ocultar iconos

## ✅ Migración Completada

Este componente ha sido migrado completamente al sistema de tokens de Figma:
- ✅ Todos los tokens de color migrados a tokens nuevos de Figma
- ✅ Todos los valores hardcodeados eliminados
- ✅ Tokens de typography, spacing y border-radius mantenidos en sistema antiguo (sin equivalente en Figma)

**Última actualización**: 2024

