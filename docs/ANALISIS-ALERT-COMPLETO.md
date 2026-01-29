# Análisis Completo del Componente Alert - UBITS Playground

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
10. [Responsive](#responsive)
11. [Accesibilidad](#accesibilidad)
12. [Checklist de Implementación](#checklist-de-implementación)

---

## Estructura HTML

### Estructura Base
```html
<div class="ubits-alert ubits-alert--{variant}">
  <div class="ubits-alert__icon">
    <i class="far {icon-class}"></i>
  </div>
  <div class="ubits-alert__content">
    <div class="ubits-alert__text">{mensaje}</div>
  </div>
  <button class="ubits-alert__close" aria-label="Cerrar alerta">
    <i class="far fa-times"></i>
  </button>
</div>
```

### Elementos Principales
- **`.ubits-alert`**: Contenedor principal (flex container)
- **`.ubits-alert__icon`**: Contenedor del icono
- **`.ubits-alert__content`**: Contenedor del contenido (flex container)
- **`.ubits-alert__text`**: Texto del mensaje
- **`.ubits-alert__close`**: Botón para cerrar (opcional)

### Pseudo-elemento `::before`
El componente utiliza un `::before` para crear el borde:
```css
.ubits-alert::before {
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
- **Clase**: `ubits-alert--success`
- **Icono**: `fa-check-circle`
- **Background**: `--ubits-feedback-bg-success-subtle`
- **Foreground**: `--ubits-feedback-fg-success-subtle`
- **Border**: `--ubits-feedback-border-success`

### 2. Info (Información)
- **Clase**: `ubits-alert--info`
- **Icono**: `fa-info-circle`
- **Background**: `--ubits-feedback-bg-info-subtle`
- **Foreground**: `--ubits-feedback-fg-info-subtle`
- **Border**: `--ubits-feedback-border-info`

### 3. Warning (Advertencia)
- **Clase**: `ubits-alert--warning`
- **Icono**: `fa-exclamation-triangle`
- **Background**: `--ubits-feedback-bg-warning-subtle`
- **Foreground**: `--ubits-feedback-fg-warning-subtle`
- **Border**: `--ubits-feedback-border-warning`

### 4. Error (Error)
- **Clase**: `ubits-alert--error`
- **Icono**: `fa-times-circle`
- **Background**: `--ubits-feedback-bg-error-subtle`
- **Foreground**: `--ubits-feedback-fg-error-subtle`
- **Border**: `--ubits-feedback-border-error`

---

## Estados

### Estado Default
- Visible y funcional
- Todos los elementos visibles (icono, texto, botón cerrar)

### Estado Hover (Botón Cerrar)
```css
.ubits-alert__close:hover {
    opacity: 1;
    background: var(--ubits-bg-invisible);
}
```

### Estado Cerrado
- Clase `.ubits-alert--closing` aplicada antes de eliminar
- Animación de salida (slideOut)

### Sin Botón Cerrar
- Clase `.ubits-alert--no-close`
- Oculta el botón de cerrar: `.ubits-alert__close { display: none; }`

---

## Espaciados y Dimensiones

### Contenedor Principal (`.ubits-alert`)
- **Display**: `flex`
- **Gap**: `8px` (entre icono, contenido y botón cerrar)
- **Align-items**: `flex-start` (alineación superior)
- **Padding**: `8px`
- **Border-radius**: `10px`
- **Position**: `relative` (para el pseudo-elemento `::before`)
- **Width**: `100%`
- **Box-sizing**: `border-box`

### Icono (`.ubits-alert__icon`)
- **Width**: `24px`
- **Height**: `24px`
- **Flex-shrink**: `0` (no se reduce)
- **Font-size**: `12px`
- **Font-weight**: `400`
- **Display**: `flex`
- **Align-items**: `center`
- **Justify-content**: `center`
- **Line-height**: `1`

### Contenido (`.ubits-alert__content`)
- **Display**: `flex`
- **Gap**: `8px`
- **Align-items**: `center`
- **Flex**: `1` (ocupa espacio restante)
- **Min-width**: `0` (permite que el texto se ajuste)

### Texto (`.ubits-alert__text`)
- **Font-size**: `13px`
- **Line-height**: `19.5px` (1.5 × font-size)
- **Font-weight**: `400`
- **Color**: `inherit` (heredado del contenedor)
- **Display**: `flex`
- **Align-items**: `center`
- **Min-height**: `24px` (igual al icono)

### Botón Cerrar (`.ubits-alert__close`)
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

---

## Tipografía

### Font Family
- **Font-family**: `'Noto Sans', sans-serif` (usar `var(--font-sans)`)

### Texto del Alert
- **Font-size**: `13px` (usar token de typography si existe)
- **Line-height**: `19.5px` (1.5 × font-size)
- **Font-weight**: `400` (regular)

### Responsive (Mobile)
- **Font-size**: `14px`
- **Line-height**: `20px`

---

## Tokens CSS

### Tokens de Feedback (Success)
```css
--ubits-feedback-bg-success-subtle    /* Background */
--ubits-feedback-fg-success-subtle   /* Color del texto */
--ubits-feedback-border-success      /* Color del borde */
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
--ubits-fg-1-medium      /* Color del botón cerrar */
--ubits-bg-invisible      /* Background hover del botón cerrar */
```

### Verificación de Tokens en `tokens.json`
✅ Todos los tokens de feedback están disponibles en ambos temas (light/dark):
- `ubits-feedback-bg-{type}-subtle`
- `ubits-feedback-fg-{type}-subtle`
- `ubits-feedback-border-{type}`

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
- Iconos de variante: `12px` (definido en `.ubits-alert__icon`)
- Icono cerrar: `12px` (definido en `.ubits-alert__close`)

---

## Funcionalidades

### 1. Cierre Manual
- Botón de cerrar visible por defecto
- Opción `closable: false` para ocultar el botón
- Clase `.ubits-alert--no-close` para ocultar el botón en HTML

### 2. Cierre Automático (Auto-dismiss)
- Opción `duration` en milisegundos (0 = no auto-close)
- Timeout configurable
- Callback `onClose` después de cerrar

### 3. Actualización Dinámica
- Método `updateMessage(newMessage)`: Actualiza el texto
- Método `updateType(newType)`: Cambia la variante e icono

### 4. Gestión con Clase Manager
```javascript
UBITSAlertManager.success(message, options);
UBITSAlertManager.info(message, options);
UBITSAlertManager.warning(message, options);
UBITSAlertManager.error(message, options);
```

### 5. Función Helper
```javascript
showAlert(type, message, options = {});
// type: 'success', 'info', 'warning', 'error'
// options: { containerId, noClose }
```

---

## Animaciones

### Animación de Entrada (`alertSlideIn`)
```css
@keyframes alertSlideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```
- **Duración**: `0.3s`
- **Timing**: `ease-out`
- **Aplicación**: Automática al crear el alert

### Animación de Salida (`alertSlideOut`)
```css
@keyframes alertSlideOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}
```
- **Duración**: `0.3s`
- **Timing**: `ease-in`
- **Aplicación**: Al aplicar clase `.ubits-alert--closing`
- **Timing de eliminación**: `300ms` después de iniciar la animación

---

## Responsive

### Media Query: `@media (max-width: 768px)`

#### Cambios en `.ubits-alert`
- **Padding**: `8px` → `12px`
- **Gap**: `8px` → `10px`

#### Cambios en `.ubits-alert__content`
- **Gap**: `8px` → `10px`

#### Cambios en `.ubits-alert__text`
- **Font-size**: `13px` → `14px`
- **Line-height**: `19.5px` → `20px`

---

## Accesibilidad

### Atributos ARIA
- **`role="alert"`**: Indica que es una alerta importante
- **`aria-live="polite"`**: Anuncia cambios sin interrumpir
- **`aria-label="Cerrar alerta"`**: Etiqueta para el botón cerrar

### Buenas Prácticas
- El texto del mensaje debe ser descriptivo
- El botón cerrar debe tener `aria-label`
- Las animaciones no deben ser excesivas (cumple con 0.3s)

---

## Checklist de Implementación

### 📦 Estructura del Add-on
- [ ] Crear paquete `packages/addons/alert/`
- [ ] Configurar `package.json` con nombre `@ubits/alert`
- [ ] Configurar `tsconfig.json`
- [ ] Configurar `vite.config.ts` para build
- [ ] Crear `dist/manifest.json`

### 🎨 Estilos CSS
- [ ] Crear `src/styles/alert.css` con todos los estilos base
- [ ] Implementar variantes (success, info, warning, error)
- [ ] Implementar estados (hover, closing)
- [ ] Implementar animaciones (slideIn, slideOut)
- [ ] Implementar responsive (mobile)
- [ ] Usar tokens UBITS del nuevo playground
- [ ] Usar tipografía UBITS (`var(--font-sans)`)
- [ ] Implementar pseudo-elemento `::before` para borde

### 📝 TypeScript
- [ ] Crear `src/types/AlertOptions.ts` con interfaces:
  - `AlertOptions`:
    - `type?: 'success' | 'info' | 'warning' | 'error'`
    - `message?: string`
    - `closable?: boolean`
    - `duration?: number`
    - `onClose?: () => void`
    - `container?: HTMLElement`
    - `className?: string`

### 🛠️ Provider
- [ ] Crear `src/AlertProvider.ts` con función `renderAlert(options)`
- [ ] Implementar mapeo de iconos por variante
- [ ] Generar HTML correctamente con todas las clases
- [ ] Integrar con sistema de iconos UBITS (`@ubits/icons`)

### 🧩 Web Component (Opcional)
- [ ] Crear `src/AlertComponent.ts` con `UBITSAlert` Web Component
- [ ] Implementar atributos observables (`type`, `message`, `closable`)
- [ ] Implementar métodos (`close()`, `updateMessage()`, `updateType()`)
- [ ] Implementar lifecycle (connected, disconnected)

### 🔌 Add-on Class
- [ ] Crear `src/AlertAddon.ts` implementando `ComponentAddon`
- [ ] Registrar Web Component si se usa
- [ ] Exportar estilos
- [ ] Exportar funciones helper

### 📚 Documentación
- [ ] Crear `README.md` con:
  - Descripción del componente
  - Ejemplos de uso (HTML directo, JavaScript, Web Component)
  - Opciones y props
  - API completa

### 🧪 Playground Integration
- [ ] Agregar Alert al `componentsInventory` en `index.html`
- [ ] Crear preview interactivo en el playground
- [ ] Implementar controles (variante, mensaje, closable)
- [ ] Agregar a la navegación lateral de componentes

### 📖 Storybook
- [ ] Crear `stories/Alert.stories.ts`
- [ ] Implementar story con controles para todas las opciones
- [ ] Mostrar todas las variantes
- [ ] Demostrar funcionalidad de cierre

### ✅ Testing
- [ ] Verificar todas las variantes funcionan
- [ ] Verificar botón cerrar funciona
- [ ] Verificar animaciones funcionan
- [ ] Verificar responsive funciona
- [ ] Verificar accesibilidad (ARIA)
- [ ] Verificar tokens funcionan en light/dark mode

---

## Notas Adicionales

### Diferencias Potenciales con Button
- Alert **no tiene tamaños** (sm, md, lg, etc.) - siempre es el mismo tamaño
- Alert **no tiene variante "primary"** - usa tipos funcionales (success/info/warning/error)
- Alert tiene **animaciones de entrada/salida** automáticas
- Alert puede tener **cierre automático** con duration
- Alert usa un **pseudo-elemento `::before`** para el borde

### Integración con Sistema de Iconos
- El componente debe usar `@ubits/icons` para renderizar iconos
- Si `@ubits/icons` no está disponible, usar FontAwesome directamente como fallback
- Iconos requeridos: `fa-check-circle`, `fa-info-circle`, `fa-exclamation-triangle`, `fa-times-circle`, `fa-times`

### Consideraciones de Diseño
- El componente es de **ancho completo** (`width: 100%`)
- El contenido se adapta automáticamente (flex: 1)
- El borde se crea con pseudo-elemento para mejor control visual
- Los colores son "subtle" (suaves) para no ser demasiado intrusivos

---

## Referencias

- **Archivo CSS Original**: `template-ubits/components/alert.css`
- **Archivo JS Original**: `template-ubits/components/alert.js`
- **Archivo HTML Demo**: `template-ubits/alert.html`
- **Tokens**: `prototipo-template/packages/tokens/tokens.json`

