# @ubits/button

Componente Button UBITS como add-on intercambiable, replicando exactamente los estilos del playground anterior pero usando nuestros tokens, tipografía e iconos.

## ✨ Características

- ✅ **Todas las variantes**: Primary, Secondary, Tertiary, Active
- ✅ **Todos los tamaños**: XS, S, M, L, XL (5 tamaños)
- ✅ **Todos los estados**: Default, Hover, Active, Focus, Disabled, Loading
- ✅ **Modificadores**: Icon-only, Full-width, Block, Icon-right
- ✅ **Features**: Badge, Loading spinner, Responsive
- ✅ **Web Component nativo**: `<ubits-button>`
- ✅ **API programática**: `renderButton()` y `createButton()`

## 📦 Instalación

```bash
pnpm add @ubits/button
```

## 🚀 Uso

### Web Component (HTML)

```html
<!-- Botón básico -->
<ubits-button variant="primary" size="md">
  Guardar
</ubits-button>

<!-- Botón con icono -->
<ubits-button variant="primary" size="md" icon="save" icon-style="regular">
  Guardar cambios
</ubits-button>

<!-- Botón loading -->
<ubits-button variant="primary" size="md" loading loading-text="Guardando...">
  Guardar
</ubits-button>

<!-- Botón disabled -->
<ubits-button variant="secondary" size="sm" disabled>
  Cancelar
</ubits-button>

<!-- Botón icon-only -->
<ubits-button variant="error" size="sm" icon="trash" icon-only></ubits-button>

<!-- Botón con badge -->
<ubits-button variant="primary" size="md" icon="bell" badge>
  Notificaciones
</ubits-button>
```

### JavaScript/TypeScript

```typescript
import { renderButton, createButton } from '@ubits/button';

// Renderizar HTML string
const html = renderButton({
  variant: 'primary',
  size: 'md',
  text: 'Guardar',
  icon: 'save',
  iconStyle: 'regular'
});

// Crear elemento DOM
const button = createButton({
  variant: 'secondary',
  size: 'lg',
  text: 'Cancelar',
  onClick: () => console.log('Clicked!')
});

document.body.appendChild(button);
```

### CSS (HTML directo)

```html
<!-- 1. Cargar tokens de Figma (OBLIGATORIO) -->
<link rel="stylesheet" href="@ubits/tokens/dist/figma-tokens.css">
<!-- 2. Cargar tokens antiguos (para spacing, border-radius, typography, effects sin equivalente en Figma) -->
<link rel="stylesheet" href="@ubits/tokens/dist/tokens.css">
<link rel="stylesheet" href="@ubits/typography/tokens-typography.css">
<link rel="stylesheet" href="@ubits/typography/fonts.css">
<link rel="stylesheet" href="@ubits/icons/dist/fontawesome.css">
<!-- 3. Cargar CSS del componente -->
<link rel="stylesheet" href="@ubits/button/styles/button.css">

<button class="ubits-button ubits-button--primary ubits-button--md">
  <i class="far fa-check"></i>
  <span>Confirmar</span>
</button>
```

## 🎨 Variantes

- `primary`: Botón principal (azul)
- `secondary`: Botón secundario (gris/blanco)
- `tertiary`: Botón terciario (transparente)
- `active`: Outline con fondo activo

## 📏 Tamaños

- `xs`: 24px (compacto)
- `sm`: 32px (pequeño)
- `md`: 40px (mediano, default)
- `lg`: 48px (grande)
- `xl`: 56px (extra grande)

## 🔄 Estados

- `default`: Estado inicial
- `hover`: Al pasar el mouse
- `active`: Al hacer clic
- `focus`: Al navegar por teclado
- `disabled`: Deshabilitado
- `loading`: Cargando (con spinner)

## 📚 Ejemplos Completos

### Todos los tamaños

```html
<ubits-button variant="primary" size="xs">XS</ubits-button>
<ubits-button variant="primary" size="sm">Small</ubits-button>
<ubits-button variant="primary" size="md">Medium</ubits-button>
<ubits-button variant="primary" size="lg">Large</ubits-button>
<ubits-button variant="primary" size="xl">Extra Large</ubits-button>
```

### Todas las variantes

```html
<ubits-button variant="primary">Primary</ubits-button>
<ubits-button variant="secondary">Secondary</ubits-button>
<ubits-button variant="tertiary">Tertiary</ubits-button>
<ubits-button variant="primary" active>Active</ubits-button>
```

### Con estados

```html
<ubits-button variant="primary">Default</ubits-button>
<ubits-button variant="primary" disabled>Disabled</ubits-button>
<ubits-button variant="primary" loading>Loading</ubits-button>
```

### Modificadores

```html
<!-- Icon-only -->
<ubits-button variant="error" size="sm" icon="trash" icon-only></ubits-button>

<!-- Full-width -->
<ubits-button variant="primary" full-width>Ancho completo</ubits-button>

<!-- Block -->
<ubits-button variant="secondary" block>Display block</ubits-button>

<!-- Icon right -->
<ubits-button variant="primary" icon="arrow-right" icon-position="right">
  Continuar
</ubits-button>
```

## 🎯 API

### `renderButton(options: ButtonOptions): string`

Renderiza un botón como HTML string.

### `createButton(options: ButtonOptions): HTMLButtonElement`

Crea un elemento `HTMLButtonElement` con todos los event listeners configurados.

### `ButtonOptions`

```typescript
interface ButtonOptions {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  icon?: string;
  iconStyle?: 'regular' | 'solid';
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  badge?: boolean;
  active?: boolean;
  fullWidth?: boolean;
  block?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
  attributes?: Record<string, string>;
  onClick?: (event: MouseEvent) => void;
}
```

## 📦 Dependencias

- `@ubits/tokens`: Tokens de color y diseño
- `@ubits/icons`: Sistema de iconos
- `@ubits/typography`: Tipografía UBITS

## 🔧 Desarrollo

```bash
# Build
pnpm build

# Watch
pnpm dev

# Lint
pnpm lint
```

## 🎨 Tokens Utilizados

### Tokens de Color (Figma)
- `--modifiers-normal-button-color-light-brand-primary-bg-default` - Fondo del botón primary
- `--modifiers-normal-button-color-light-brand-primary-bg-hover` - Fondo hover del botón primary
- `--modifiers-normal-button-color-light-brand-primary-bg-pressed` - Fondo pressed del botón primary
- `--modifiers-normal-button-color-light-brand-secondary-*` - Tokens para botón secondary
- `--modifiers-normal-button-color-light-brand-tertiary-*` - Tokens para botón tertiary
- `--modifiers-normal-color-light-bg-1` - Fondo blanco para estado active
- `--modifiers-normal-color-light-bg-active` - Fondo activo (overlay azul)
- `--modifiers-normal-color-light-accent-brand` - Color de texto en estado active
- `--modifiers-normal-color-light-bg-disabled` - Fondo deshabilitado
- `--modifiers-normal-color-light-fg-on-disabled` - Color de texto deshabilitado
- `--modifiers-normal-color-light-border-disabled` - Color de borde deshabilitado

### Tokens de Typography (Sistema Antiguo)
- `--font-sans` - Familia de fuente
- `--font-body-xs-size`, `--font-body-sm-size`, `--font-body-md-size`, `--font-body-lg-size` - Tamaños de fuente
- `--font-body-xs-line`, `--font-body-sm-line`, `--font-body-md-line`, `--font-body-lg-line` - Alturas de línea
- `--font-h1-size`, `--font-h2-size` - Tamaños para botones grandes
- `--font-h1-line` - Altura de línea para botones grandes
- `--weight-semibold` - Peso de fuente

**Nota**: Los tokens de typography NO tienen equivalente directo en Figma (solo hay "text styles" completos), por lo que se mantienen en el sistema antiguo.

### Tokens de Spacing (Sistema Antiguo)
- `--ubits-spacing-none` - Sin espaciado
- `--ubits-spacing-xs` - Espaciado extra pequeño
- `--ubits-spacing-sm` - Espaciado pequeño
- `--ubits-spacing-md` - Espaciado medio
- `--ubits-spacing-lg` - Espaciado grande
- `--ubits-spacing-xl` - Espaciado extra grande
- `--ubits-spacing-2xl` - Espaciado 2x extra grande

**Nota**: Los tokens de spacing NO tienen equivalente en Figma, por lo que se mantienen en el sistema antiguo.

### Tokens de Border-radius (Sistema Antiguo)
- `--ubits-border-radius-sm` - Radio de borde pequeño

**Nota**: Los tokens de border-radius NO tienen equivalente en Figma, por lo que se mantienen en el sistema antiguo.

### Tokens de Effects (Sistema Antiguo - Sin Equivalente en Figma)
- `--ubits-button-focus-ring` - Anillo de enfoque
- `--ubits-elevation-floating` - Sombra flotante (default)
- `--ubits-elevation-floating-hover` - Sombra flotante (hover)
- `--ubits-elevation-floating-active` - Sombra flotante (active)

**Nota**: Los tokens de effects NO tienen equivalente directo en Figma. Los tokens de elevation en Figma tienen propiedades separadas (color, type, etc.) pero no un valor directo de `box-shadow`. Se mantienen en el sistema antiguo.

### Tokens Sin Equivalente en Figma
- `--ubits-btn-primary-fg` - Color de texto del botón primary (blanco fijo)

**Nota**: Este token NO tiene equivalente en Figma y se mantiene en el sistema antiguo.

## ✅ Migración Completada

Este componente ha sido migrado completamente al sistema de tokens de Figma:
- ✅ Todos los tokens de color migrados a tokens nuevos de Figma (95 fallbacks eliminados)
- ✅ Todos los valores hardcodeados de typography migrados a tokens antiguos (4 valores)
- ✅ Tokens de typography, spacing, border-radius y effects mantenidos en sistema antiguo (sin equivalente en Figma)
- ✅ Tokens sin equivalente (`--ubits-btn-primary-fg`, `--ubits-button-focus-ring`, `--ubits-elevation-floating*`) mantenidos en sistema antiguo

**Última actualización**: 2024

