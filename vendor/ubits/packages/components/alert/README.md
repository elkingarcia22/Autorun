# @ubits/alert

Componente Alert UBITS como add-on intercambiable. Muestra notificaciones del sistema con diferentes variantes (success, info, warning, error).

## Instalación

```bash
pnpm add @ubits/alert
```

## Uso

### Opción 1: HTML Directo (Recomendado para alerts estáticos)

```html
<link rel="stylesheet" href="@ubits/alert/styles" />

<div class="ubits-alert ubits-alert--success">
  <div class="ubits-alert__icon">
    <i class="far fa-check-circle"></i>
  </div>
  <div class="ubits-alert__content">
    <div class="ubits-alert__text">Los cambios se han guardado correctamente.</div>
  </div>
  <button class="ubits-alert__close" aria-label="Cerrar alerta">
    <i class="far fa-times"></i>
  </button>
</div>
```

### Opción 2: JavaScript/TypeScript

```typescript
import { showAlert } from '@ubits/alert';

// Mostrar alert de éxito
showAlert('success', 'Los cambios se han guardado correctamente.', {
  containerId: 'alert-container',
  closable: true,
  duration: 5000 // Auto-cerrar en 5 segundos
});
```

### Opción 3: Web Component

```html
<ubits-alert 
  type="info" 
  message="Esta es una notificación informativa."
  closable="true">
</ubits-alert>
```

## API

### Función `showAlert(type, message, options)`

```typescript
showAlert(
  type: 'success' | 'info' | 'warning' | 'error',
  message: string,
  options?: {
    containerId?: string;
    container?: HTMLElement;
    closable?: boolean;
    duration?: number;
    onClose?: () => void;
    className?: string;
  }
): HTMLDivElement | null
```

### Función `renderAlert(options)`

```typescript
renderAlert(options?: AlertOptions): string
```

Genera el HTML del alert como string.

### Función `createAlert(options)`

```typescript
createAlert(options?: AlertOptions): HTMLDivElement
```

Crea un elemento DOM del alert programáticamente.

## Variantes

- `success`: Alert de éxito (verde)
- `info`: Alert informativo (azul)
- `warning`: Alert de advertencia (naranja)
- `error`: Alert de error (rojo)

## Opciones

- `type`: Tipo de alert (`'success' | 'info' | 'warning' | 'error'`)
- `message`: Mensaje del alert (puede incluir HTML básico)
- `closable`: Si tiene botón de cerrar (default: `true`)
- `duration`: Duración en ms antes de auto-cerrar (default: `0` = no auto-close)
- `onClose`: Callback cuando se cierra el alert
- `container`: Contenedor HTMLElement donde insertar el alert
- `className`: Clases CSS adicionales

## Ejemplos

### Alert sin botón cerrar

```html
<div class="ubits-alert ubits-alert--info ubits-alert--no-close">
  <div class="ubits-alert__icon">
    <i class="far fa-info-circle"></i>
  </div>
  <div class="ubits-alert__content">
    <div class="ubits-alert__text">Este alert no se puede cerrar.</div>
  </div>
</div>
```

### Alert con auto-cierre

```typescript
import { showAlert } from '@ubits/alert';

showAlert('success', 'Operación completada', {
  containerId: 'alerts-container',
  duration: 3000, // Auto-cerrar en 3 segundos
  onClose: () => {
    console.log('Alert cerrado');
  }
});
```

## Características

- ✅ 4 variantes (success, info, warning, error)
- ✅ Botón cerrar opcional
- ✅ Cierre automático con duration
- ✅ Animaciones de entrada/salida
- ✅ Responsive (mobile-friendly)
- ✅ Accesible (ARIA attributes)
- ✅ Integración con sistema de iconos UBITS

## Dependencias

- `@ubits/tokens`: Tokens de diseño
- `@ubits/icons`: Sistema de iconos

## Requisitos de Tokens

⚠️ **IMPORTANTE**: Este componente requiere que cargues `figma-tokens.css` ANTES del CSS del componente:

```html
<!-- 1. Primero cargar tokens de Figma -->
<link rel="stylesheet" href="@ubits/tokens/dist/figma-tokens.css" />

<!-- 2. Luego cargar el componente -->
<link rel="stylesheet" href="@ubits/alert/styles" />
```

El componente usa **SOLO tokens nuevos de Figma** (sin fallbacks). Si no cargas `figma-tokens.css`, los colores no se mostrarán correctamente.

