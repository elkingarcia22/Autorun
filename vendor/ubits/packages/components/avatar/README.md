# @ubits/avatar

Componente Avatar UBITS con soporte para imagen, iniciales e icono, con variantes y soporte para badge.

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
<link rel="stylesheet" href="../../components/avatar/src/styles/avatar.css">
```

### Ejemplo Básico

```typescript
import { renderAvatar } from '@ubits/avatar';
import type { AvatarOptions } from '@ubits/avatar';

const options: AvatarOptions = {
  variant: 'photo',
  src: 'https://example.com/avatar.jpg',
  size: 'md',
};

renderAvatar(container, options);
```

## 🎨 Tokens Utilizados

### Tokens de Color (Figma)
- `--modifiers-normal-color-light-border-1` - Borde del avatar
- `--modifiers-normal-color-light-bg-1` - Fondo del avatar
- `--modifiers-normal-color-light-fg-1-high` - Color del texto (iniciales) e icono
- `--modifiers-static-inverted-color-light-accent-brand` - Color del outline en focus

### Tokens de Typography (Sistema Antiguo)
- `--font-sans` - Familia de fuente para iniciales
- `--weight-semibold` - Peso de fuente para iniciales

**Nota**: Los tokens de typography NO tienen equivalente directo en Figma (solo hay "text styles" completos), por lo que se mantienen en el sistema antiguo.

### Tokens de Spacing (Sistema Antiguo)
- `--ubits-spacing-none` - Sin espaciado (padding)

**Nota**: Los tokens de spacing NO tienen equivalente en Figma, por lo que se mantienen en el sistema antiguo.

### Tokens de Border-radius (Sistema Antiguo)
- `--ubits-border-radius-full` - Radio de borde completo (círculo)

**Nota**: Los tokens de border-radius NO tienen equivalente en Figma, por lo que se mantienen en el sistema antiguo.

### Effects (Hardcodeado)
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)` - Sombra en hover (hardcodeado)

**Nota**: No hay token directo de `box-shadow` en Figma. Los tokens de elevation en Figma tienen propiedades separadas (color, type, etc.) pero no un valor directo de `box-shadow`. Se mantiene el valor hardcodeado con comentario explicativo.

## 📋 Variantes

### Photo
Avatar con imagen.

### Initials
Avatar con iniciales del usuario.

### Icon
Avatar con icono.

## 🔧 Props

- `variant`: `'photo' | 'initials' | 'icon'` - Variante del avatar
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` - Tamaño del avatar
- `src`: `string` - URL de la imagen (solo para variant='photo')
- `initials`: `string` - Iniciales a mostrar (solo para variant='initials')
- `icon`: `string` - Nombre del icono (solo para variant='icon')

## ✅ Migración Completada

Este componente ha sido migrado completamente al sistema de tokens de Figma:
- ✅ Todos los tokens de color migrados a tokens nuevos de Figma
- ✅ Todos los valores hardcodeados de spacing migrados a tokens
- ✅ Tokens de typography, spacing y border-radius mantenidos en sistema antiguo (sin equivalente en Figma)
- ✅ Valor hardcodeado de box-shadow mantenido con comentario (sin equivalente directo en Figma)

**Última actualización**: 2024

