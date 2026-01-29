# Análisis Completo del Componente Toast - UBITS Playground

## 📋 Índice
1. [Estructura HTML](#estructura-html)
2. [Variantes](#variantes)
3. [Estados](#estados)
4. [Espaciados y Dimensiones](#espaciados-y-dimensiones)
5. [Tipografía](#tipografía)
6. [Tokens CSS](#tokens-css)
7. [Iconos](#iconos)
8. [Funcionalidades](#funcionalidades)
9. [Animaciones](#animaciones)
10. [Posicionamiento](#posicionamiento)
11. [Accesibilidad](#accesibilidad)
12. [Diferencias con Alert](#diferencias-con-alert)
13. [Checklist de Implementación](#checklist-de-implementación)

---

## Estructura HTML

### Estructura Base
```html
<!-- Container (fijo, top-center) -->
<div id="ubits-toast-container">
  <!-- Toast individual -->
  <div class="ubits-toast ubits-toast--{type}">
    <div class="ubits-toast__icon">
      <i class="far {icon-class}"></i>
    </div>
    <div class="ubits-toast__content">
      <div class="ubits-toast__text">{mensaje}</div>
      <!-- Opcional: botón de acción -->
      <button class="ubits-button ubits-button--tertiary ubits-button--sm">
        <span>{action.label}</span>
      </button>
    </div>
    <button class="ubits-toast__close" aria-label="Cerrar notificación">
      <i class="far fa-times"></i>
    </button>
  </div>
</div>
```

### Elementos Principales
- **`#ubits-toast-container`**: Contenedor fijo en top-center (se crea automáticamente)
- **`.ubits-toast`**: Contenedor individual del toast (flex container)
- **`.ubits-toast__icon`**: Contenedor del icono
- **`.ubits-toast__content`**: Contenedor del contenido (flex container, puede incluir botón acción)
- **`.ubits-toast__text`**: Texto del mensaje
- **`.ubits-toast__close`**: Botón para cerrar (opcional)
- **`.ubits-button`** (dentro de content): Botón de acción opcional

### Pseudo-elemento `::before`
El componente utiliza un `::before` para crear el borde, igual que Alert:
```css
.ubits-toast::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid;
    border-radius: 10px;
    pointer-events: none;
}
```

---

## Variantes

### 1. Success (Éxito)
- **Clase**: `ubits-toast--success`
- **Icono**: `fa-check-circle`
- **Background**: `--ubits-feedback-bg-success-subtle`
- **Foreground**: `--ubits-feedback-fg-success-subtle`
- **Border**: `--ubits-feedback-border-success`
- **Duración por defecto**: `3500ms` (3.5s)

### 2. Info (Información)
- **Clase**: `ubits-toast--info`
- **Icono**: `fa-info-circle`
- **Background**: `--ubits-feedback-bg-info-subtle`
- **Foreground**: `--ubits-feedback-fg-info-subtle`
- **Border**: `--ubits-feedback-border-info`
- **Duración por defecto**: `3500ms` (3.5s)

### 3. Warning (Advertencia)
- **Clase**: `ubits-toast--warning`
- **Icono**: `fa-exclamation-triangle`
- **Background**: `--ubits-feedback-bg-warning-subtle`
- **Foreground**: `--ubits-feedback-fg-warning-subtle`
- **Border**: `--ubits-feedback-border-warning`
- **Duración por defecto**: `5000ms` (5s)

### 4. Error (Error)
- **Clase**: `ubits-toast--error`
- **Icono**: `fa-times-circle`
- **Background**: `--ubits-feedback-bg-error-subtle`
- **Foreground**: `--ubits-feedback-fg-error-subtle`
- **Border**: `--ubits-feedback-border-error`
- **Duración por defecto**: `6500ms` (6.5s)

---

## Estados

### Estado Default
- Visible y funcional
- Todos los elementos visibles (icono, texto, botón cerrar)
- Timer activo para auto-cierre

### Estado Hover (Botón Cerrar)
```css
.ubits-toast__close:hover {
    opacity: 1;
    background: var(--ubits-bg-invisible);
}
```

### Estado Pausado (Pause on Hover)
- Cuando el usuario hace hover o focus, el timer se pausa
- Usa `performance.now()` para calcular tiempo restante
- Se reanuda cuando se quita el hover/focus

### Estado Exit
- Clase `.ubits-toast--exit` aplicada antes de eliminar
- Animación de salida (translateY + opacity)
- Eliminación después de 180ms

### Sin Botón Cerrar
- Opción `noClose: true` en options
- No se renderiza el botón cerrar

### Con Botón de Acción
- Opción `action: { label: string, onClick: function }`
- Botón terciario pequeño dentro del contenido
- Permite acciones rápidas sin cerrar el toast

---

## Espaciados y Dimensiones

### Container (`#ubits-toast-container`)
- **Position**: `fixed`
- **Top**: `16px`
- **Left**: `50%`
- **Transform**: `translateX(-50%)` (centrado horizontal)
- **Display**: `flex`
- **Flex-direction**: `column`
- **Align-items**: `center`
- **Gap**: `12px` (entre toasts)
- **Max-width**: `560px`
- **Z-index**: `10000`
- **Pointer-events**: `none` (el container no bloquea interacciones)
- **Width**: `auto`

### Toast Individual (`.ubits-toast`)
- **Display**: `flex`
- **Gap**: `8px` (entre icono, contenido y botón cerrar)
- **Align-items**: `center`
- **Padding**: `8px`
- **Border-radius**: `10px`
- **Position**: `relative` (para el pseudo-elemento `::before`)
- **Font-family**: `'Noto Sans', sans-serif` (usar `var(--font-sans)`)
- **Box-sizing**: `border-box`
- **Width**: `max-content`
- **Max-width**: `560px`
- **Pointer-events**: `auto` (el toast sí es interactuable)

### Icono (`.ubits-toast__icon`)
- **Width**: `24px`
- **Height**: `24px`
- **Flex-shrink**: `0`
- **Display**: `flex`
- **Align-items**: `center`
- **Justify-content**: `center`
- **Font-size**: `12px` (del icono interno)
- **Line-height**: `1`

### Contenido (`.ubits-toast__content`)
- **Display**: `flex`
- **Gap**: `8px`
- **Align-items**: `center`
- **Min-width**: `0` (permite que el texto se ajuste)

### Texto (`.ubits-toast__text`)
- **Font-size**: `13px` (usar `var(--font-body-sm-size)`)
- **Line-height**: `19.5px` (usar `var(--font-body-sm-line)`)
- **Font-weight**: `400` (regular)
- **Color**: `inherit` (heredado del contenedor)
- **Display**: `flex`
- **Align-items**: `center`
- **Min-height**: `24px` (igual al icono)

### Botón Cerrar (`.ubits-toast__close`)
- **Width**: `24px`
- **Height**: `24px`
- **Flex-shrink**: `0`
- **Display**: `flex`
- **Align-items**: `center`
- **Justify-content**: `center`
- **Background**: `none`
- **Border**: `none`
- **Cursor**: `pointer`
- **Font-size**: `12px`
- **Color**: `var(--ubits-fg-1-medium)`
- **Opacity**: `0.7` (default), `1` (hover)
- **Border-radius**: `4px`
- **Transition**: `opacity 0.2s ease`

### Botón de Acción (dentro de `.ubits-toast__content`)
- **Clase**: `ubits-button ubits-button--tertiary ubits-button--sm`
- Usa el componente Button existente

---

## Tipografía

### Font Family
- **Font-family**: `'Noto Sans', sans-serif` (usar `var(--font-sans)`)

### Texto del Toast
- **Font-size**: `13px` (usar `var(--font-body-sm-size)`)
- **Line-height**: `19.5px` (usar `var(--font-body-sm-line)`)
- **Font-weight**: `400` (regular)

### Clase Typography
- También usa la clase `.ubits-body-sm-regular` en el texto

---

## Tokens CSS

### Tokens de Feedback (Success)
```css
--ubits-feedback-bg-success-subtle    /* Background */
--ubits-feedback-fg-success-subtle     /* Color del texto */
--ubits-feedback-border-success        /* Color del borde */
```

### Tokens de Feedback (Info)
```css
--ubits-feedback-bg-info-subtle
--ubits-feedback-fg-info-subtle
--ubits-feedback-border-info
```

### Tokens de Feedback (Warning)
```css
--ubits-feedback-bg-warning-subtle
--ubits-feedback-fg-warning-subtle
--ubits-feedback-border-warning
```

### Tokens de Feedback (Error)
```css
--ubits-feedback-bg-error-subtle
--ubits-feedback-fg-error-subtle
--ubits-feedback-border-error
```

### Otros Tokens
```css
--ubits-bg-1              /* Background default del toast */
--ubits-fg-1-high          /* Color de texto default */
--ubits-fg-1-medium        /* Color del botón cerrar */
--ubits-border-1           /* Borde default (sobrescrito por variantes) */
--ubits-bg-invisible       /* Background hover del botón cerrar */
```

### Verificación de Tokens en `tokens.json`
✅ Todos los tokens de feedback están disponibles en ambos temas (light/dark)

---

## Iconos

### Mapeo de Variantes a Iconos
| Variante | Icono FontAwesome | Estilo |
|----------|-------------------|--------|
| Success | `fa-check-circle` | `far` (regular) |
| Info | `fa-info-circle` | `far` (regular) |
| Warning | `fa-exclamation-triangle` | `far` (regular) |
| Error | `fa-times-circle` | `far` (regular) |
| Close | `fa-times` | `far` (regular) |

### Tamaños
- Iconos de variante: `12px` (definido en `.ubits-toast__icon i`)
- Icono cerrar: `12px` (definido en `.ubits-toast__close`)

---

## Funcionalidades

### 1. Cierre Automático (Auto-dismiss)
- Duración configurable por tipo:
  - `success`: 3500ms (3.5s)
  - `info`: 3500ms (3.5s)
  - `warning`: 5000ms (5s)
  - `error`: 6500ms (6.5s)
- Opción `duration: 0` para toast persistente
- Usa `setTimeout` con cálculo preciso del tiempo restante

### 2. Pausa en Hover/Focus
- Pausa automática cuando el usuario hace hover
- Pausa automática cuando el usuario hace focus (accesibilidad)
- Usa `performance.now()` para calcular tiempo transcurrido
- Se puede desactivar con `pauseOnHover: false`

### 3. Apilado (Stacking)
- Máximo 3 toasts visibles simultáneamente
- Los más antiguos se eliminan automáticamente cuando hay más de 3
- Apilado vertical con gap de 12px

### 4. Cierre Manual
- Botón de cerrar visible por defecto
- Opción `noClose: true` para ocultar el botón
- Cierre instantáneo con animación de salida

### 5. Botón de Acción
- Opción `action: { label: string, onClick: function }`
- Botón tertiary pequeño dentro del contenido
- Permite acciones sin cerrar el toast
- El botón usa el componente Button existente

### 6. Gestión del Container
- Container se crea automáticamente si no existe
- ID por defecto: `ubits-toast-container`
- Puede especificarse `containerId` personalizado
- Función `ensureContainer()` maneja la creación

---

## Animaciones

### Animación de Entrada (`ubits-toast--enter`)
```css
@media (prefers-reduced-motion: no-preference) {
    .ubits-toast {
        opacity: 0;
        transform: translateY(-6px);
        transition: opacity 180ms ease, transform 180ms ease;
    }
    .ubits-toast--enter {
        opacity: 1;
        transform: translateY(0);
    }
}
```
- **Duración**: `180ms` (0.18s)
- **Timing**: `ease`
- **Aplicación**: Clase agregada con `requestAnimationFrame()` después de crear el elemento
- **Respeto a prefers-reduced-motion**: Solo aplica si `prefers-reduced-motion: no-preference`

### Animación de Salida (`ubits-toast--exit`)
```css
.ubits-toast--exit {
    opacity: 0;
    transform: translateY(-6px);
}
```
- **Duración**: `180ms`
- **Timing**: `ease`
- **Aplicación**: Al aplicar clase `.ubits-toast--exit`
- **Timing de eliminación**: `180ms` después de iniciar la animación
- **Respeto a prefers-reduced-motion**: Solo aplica si `prefers-reduced-motion: no-preference`

---

## Posicionamiento

### Container
- **Posición**: `fixed` en top-center
- **Top**: `16px` desde el borde superior
- **Left**: `50%` con `translateX(-50%)` para centrar
- **Z-index**: `10000` (muy alto para estar sobre todo)

### Stacking
- Los toasts se apilan verticalmente (flex-direction: column)
- Gap de `12px` entre toasts
- Máximo 3 toasts visibles (los más antiguos se eliminan)

---

## Accesibilidad

### Atributos ARIA
- **`role="alert"`**: Para toasts de warning y error (urgentes)
- **`role="status"`**: Para toasts de success e info (informativos)
- **`aria-live="assertive"`**: Para warning y error (interrumpe)
- **`aria-live="polite"`**: Para success e info (no interrumpe)
- **`aria-label="Cerrar notificación"`**: Para el botón cerrar

### Funcionalidades de Accesibilidad
- Pausa en focus (navegación con teclado)
- Contraste adecuado usando tokens UBITS
- Animaciones respetan `prefers-reduced-motion`
- Roles ARIA apropiados según criticidad

---

## Diferencias con Alert

| Característica | Alert | Toast |
|----------------|-------|-------|
| **Posición** | Inline en el contenido | Fixed top-center |
| **Uso** | Parte del flujo de contenido | Notificación flotante |
| **Tamaño** | Ancho completo (`width: 100%`) | Ancho máximo 560px, contenido máximo |
| **Apilado** | No se apilan | Sí se apilan (max 3) |
| **Duración** | Configurable, sin defaults por tipo | Defaults por tipo (3.5s, 5s, 6.5s) |
| **Pausa en hover** | No tiene | Sí tiene (configurable) |
| **Botón acción** | No tiene | Sí tiene (opcional) |
| **Animación** | Slide in/out (300ms) | Fade + translate (180ms) |
| **Container** | No requiere container específico | Requiere `#ubits-toast-container` |
| **Z-index** | Normal | 10000 (muy alto) |

### Similitudes
- Mismas 4 variantes (success, info, warning, error)
- Mismos tokens de feedback
- Misma estructura (icono, contenido, cerrar)
- Mismo pseudo-elemento `::before` para borde
- Mismo tamaño de iconos y textos
- Misma tipografía

---

## Checklist de Implementación

### 📦 Estructura del Add-on
- [ ] Crear paquete `packages/addons/toast/`
- [ ] Configurar `package.json` con nombre `@ubits/toast`
- [ ] Configurar `tsconfig.json`
- [ ] Configurar `vite.config.ts` para build
- [ ] Crear `dist/manifest.json`

### 🎨 Estilos CSS
- [ ] Crear `src/styles/toast.css` con todos los estilos base
- [ ] Implementar estilos del container (`#ubits-toast-container`)
- [ ] Implementar variantes (success, info, warning, error)
- [ ] Implementar estados (hover, exit)
- [ ] Implementar animaciones (enter, exit)
- [ ] Respetar `prefers-reduced-motion`
- [ ] Usar tokens UBITS del nuevo playground
- [ ] Usar tipografía UBITS (`var(--font-sans)`)
- [ ] Implementar pseudo-elemento `::before` para borde

### 📝 TypeScript
- [ ] Crear `src/types/ToastOptions.ts` con interfaces:
  - `ToastOptions`:
    - `type?: 'success' | 'info' | 'warning' | 'error'`
    - `message?: string`
    - `duration?: number` (0 = persistente)
    - `noClose?: boolean`
    - `pauseOnHover?: boolean`
    - `action?: { label: string; onClick: () => void }`
    - `containerId?: string`
    - `onClose?: () => void`
    - `className?: string`

### 🛠️ Provider
- [ ] Crear `src/ToastProvider.ts` con función `renderToast(options)`
- [ ] Implementar función `showToast(type, message, options)`
- [ ] Implementar `ensureContainer(containerId)`
- [ ] Implementar `limitStack(container, maxVisible)`
- [ ] Implementar `safelyRemove(toast)`
- [ ] Implementar gestión de timer con `performance.now()`
- [ ] Implementar pausa en hover/focus
- [ ] Implementar mapeo de iconos por variante
- [ ] Integrar con sistema de iconos UBITS (`@ubits/icons`)
- [ ] Integrar con componente Button para acción

### 🧩 Web Component (Opcional)
- [ ] Crear `src/ToastComponent.ts` con `UBITSToast` Web Component
- [ ] Implementar atributos observables (`type`, `message`, `duration`)
- [ ] Implementar métodos (`close()`, `pause()`, `resume()`)
- [ ] Implementar lifecycle (connected, disconnected)

### 🔌 Add-on Class
- [ ] Crear `src/ToastAddon.ts` implementando `ComponentAddon`
- [ ] Registrar Web Component si se usa
- [ ] Exportar estilos
- [ ] Exportar funciones helper
- [ ] Crear container automáticamente si no existe

### 📚 Documentación
- [ ] Crear `README.md` con:
  - Descripción del componente
  - Ejemplos de uso (`showToast()`)
  - Opciones y props
  - API completa
  - Diferencias con Alert
  - Mejores prácticas

### 🧪 Playground Integration
- [ ] Agregar Toast al `componentsInventory` en `index.html`
- [ ] Crear preview interactivo en el playground
- [ ] Implementar controles (variante, mensaje, duration, action, pauseOnHover)
- [ ] Agregar botones para mostrar toasts en tiempo real
- [ ] Agregar a la navegación lateral de componentes
- [ ] Crear container `#ubits-toast-container` en el HTML

### 📖 Storybook
- [ ] Crear `stories/Toast.stories.ts`
- [ ] Implementar story con controles para todas las opciones
- [ ] Mostrar todas las variantes
- [ ] Demostrar funcionalidad de apilado
- [ ] Demostrar pausa en hover

### ✅ Testing
- [ ] Verificar todas las variantes funcionan
- [ ] Verificar botón cerrar funciona
- [ ] Verificar animaciones funcionan
- [ ] Verificar apilado (max 3)
- [ ] Verificar pausa en hover
- [ ] Verificar pausa en focus
- [ ] Verificar duración por defecto por tipo
- [ ] Verificar botón de acción funciona
- [ ] Verificar container se crea automáticamente
- [ ] Verificar accesibilidad (ARIA)
- [ ] Verificar tokens funcionan en light/dark mode
- [ ] Verificar `prefers-reduced-motion`

---

## Notas Adicionales

### Funcionalidad Única: Timer Inteligente
- Usa `performance.now()` para cálculo preciso del tiempo
- Pausa y reanuda manteniendo tiempo restante
- Permite interacción sin perder el tiempo restante

### Funcionalidad Única: Apilado Inteligente
- Máximo 3 toasts visibles
- Elimina automáticamente los más antiguos
- Evita saturar la interfaz

### Funcionalidad Única: Botón de Acción
- Permite acciones rápidas dentro del toast
- Integra con el componente Button existente
- Útil para "Deshacer", "Reintentar", etc.

### Integración con Sistema de Iconos
- El componente debe usar `@ubits/icons` para renderizar iconos
- Si `@ubits/icons` no está disponible, usar FontAwesome directamente como fallback
- Iconos requeridos: `fa-check-circle`, `fa-info-circle`, `fa-exclamation-triangle`, `fa-times-circle`, `fa-times`

### Consideraciones de Diseño
- El toast es **flotante** (position: fixed)
- Se apila verticalmente desde arriba
- No bloquea interacciones (solo el toast es interactuable)
- Z-index muy alto para estar sobre todo
- Máximo ancho de 560px para evitar que ocupe toda la pantalla

---

## Referencias

- **Archivo CSS Original**: `template-ubits/components/toast.css`
- **Archivo JS Original**: `template-ubits/components/toast.js`
- **Archivo HTML Demo**: `template-ubits/toast.html`
- **Tokens**: `prototipo-template/packages/tokens/tokens.json`

