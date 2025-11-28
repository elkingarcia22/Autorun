# @ubits/badge

Componente Badge UBITS standalone con soporte para múltiples variantes, tamaños y estilos (light, neutral, bold).

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
<link rel="stylesheet" href="../../components/badge/src/styles/badge.css">
```

### Ejemplo Básico

```html
<!-- Badge simple (solo punto) -->
<span class="ubits-badge"></span>

<!-- Badge con contenido -->
<span class="ubits-badge">5</span>
<span class="ubits-badge">99+</span>
<span class="ubits-badge">Nuevo</span>

<!-- Badge con tamaño -->
<span class="ubits-badge ubits-badge--sm">3</span>
<span class="ubits-badge ubits-badge--lg">10</span>

<!-- Badge absoluto (para posicionar en esquinas) -->
<div class="ubits-badge-container">
  <span>Notificaciones</span>
  <span class="ubits-badge ubits-badge--absolute ubits-badge--absolute-top-right">5</span>
</div>
```

### API TypeScript

```typescript
import { renderBadge, createBadge } from '@ubits/badge';

// Generar HTML
const html = renderBadge({ content: '5', size: 'md' });

// Crear elemento
const badge = createBadge({ content: '99+', size: 'lg' });
document.body.appendChild(badge);
```

## 🎨 Tokens Utilizados

### Tokens de Color (Figma)
- `--modifiers-normal-color-light-feedback-accent-error` - Color de fondo para variante error/primary
- `--modifiers-normal-color-light-feedback-accent-success` - Color de fondo para variante success
- `--modifiers-normal-color-light-feedback-accent-warning` - Color de fondo para variante warning
- `--modifiers-normal-color-light-feedback-accent-info` - Color de fondo para variante info
- `--modifiers-normal-color-light-fg-1-medium` - Color de fondo para variante secondary
- `--modifiers-normal-color-light-fg-1-high` - Color de texto para estilos light y neutral
- `--modifiers-normal-color-light-fg-bold` - Color de texto sobre fondos de color (blanco)
- `--modifiers-normal-color-light-bg-1` - Color de fondo blanco para dots en estilo bold
- `--modifiers-normal-color-light-border-1` - Color de borde para estilo neutral
- `--modifiers-normal-color-light-accent-brand` - Color para variante primary en estilo bold

### Tokens de Typography (Sistema Antiguo)
- `--font-sans` - Familia de fuente
- `--font-body-xs-size` - Tamaño de fuente para badges xs
- `--font-body-sm-size` - Tamaño de fuente para badges sm y algunos labels
- `--font-body-md-size` - Tamaño de fuente para badges md y labels lg
- `--weight-semibold` - Peso de fuente

**Nota**: Los tokens de typography NO tienen equivalente directo en Figma (solo hay "text styles" completos), por lo que se mantienen en el sistema antiguo.

### Tokens de Spacing (Sistema Antiguo)
- `--ubits-spacing-none` - Sin espaciado (padding)
- `--ubits-spacing-sm` - Espaciado pequeño (gap entre dot y label)
- `--ubits-spacing-md` - Espaciado medio (padding del wrapper)

**Nota**: Los tokens de spacing NO tienen equivalente en Figma, por lo que se mantienen en el sistema antiguo.

### Tokens de Border-radius (Sistema Antiguo)
- `--ubits-border-radius-sm` - Radio de borde pequeño
- `--ubits-border-radius-md` - Radio de borde medio
- `--ubits-border-radius-full` - Radio de borde completo (círculo)

**Nota**: Los tokens de border-radius NO tienen equivalente en Figma, por lo que se mantienen en el sistema antiguo.

## 📋 Variantes

### Colores
- `primary` (default) - Rojo/Error
- `secondary` - Gris
- `success` - Verde
- `warning` - Naranja
- `error` - Rojo
- `info` - Azul

### Estilos
- `light` - Fondo transparente, sin borde, punto de color, texto oscuro
- `neutral` - Fondo transparente, con borde, punto de color, texto oscuro
- `bold` - Fondo de color según variante, dot blanco, número del color de la variante

### Tamaños
- `xs`: 6px (sin contenido), 14px (con contenido)
- `sm`: 8px (sin contenido), 16px (con contenido)
- `md`: 10px (sin contenido), 18px (con contenido) - **Por defecto**
- `lg`: 12px (sin contenido), 20px (con contenido)

## ✅ Migración Completada

Este componente ha sido migrado completamente al sistema de tokens de Figma:
- ✅ Todos los tokens de color migrados a tokens nuevos de Figma
- ✅ Todos los valores hardcodeados de spacing migrados a tokens
- ✅ Todos los valores hardcodeados de typography migrados a tokens
- ✅ Todos los valores hardcodeados de color migrados a tokens
- ✅ Tokens de typography, spacing y border-radius mantenidos en sistema antiguo (sin equivalente en Figma)
- ✅ Valores de line-height mantenidos (valores específicos válidos como 1, 1.2, 1.3, 1.4, 1.5)

**Última actualización**: 2024
