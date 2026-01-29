# Análisis Completo del Componente Input - UBITS Playground

## 📋 Índice
1. [Estructura HTML](#estructura-html)
2. [Tipos de Input](#tipos-de-input)
3. [Tamaños](#tamaños)
4. [Estados](#estados)
5. [Controles Independientes](#controles-independientes)
6. [Iconos](#iconos)
7. [Espaciados y Dimensiones](#espaciados-y-dimensiones)
8. [Tipografía](#tipografía)
9. [Tokens CSS](#tokens-css)
10. [Funcionalidades Especiales](#funcionalidades-especiales)
11. [Validación](#validación)
12. [Accesibilidad](#accesibilidad)
13. [API y Métodos](#api-y-métodos)
14. [Checklist de Implementación](#checklist-de-implementación)

---

## Estructura HTML

### Estructura Base
```html
<!-- Container (con position: relative para dropdowns) -->
<div id="input-container" style="position: relative;">
  <!-- Label (opcional, con mandatory/optional) -->
  <label class="ubits-input-label">
    Label Text 
    <span class="ubits-input-mandatory">(obligatorio)</span> <!-- Opcional -->
  </label>
  
  <!-- Wrapper con iconos -->
  <div style="position: relative; display: inline-block; width: 100%;">
    <!-- Icono izquierdo (opcional) -->
    <i class="far fa-user" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);"></i>
    
    <!-- Input/Select/Textarea (según tipo) -->
    <input 
      type="text" 
      class="ubits-input ubits-input--md" 
      placeholder="Placeholder text"
      style="padding-left: 32px; padding-right: 32px;" <!-- Si tiene iconos -->
    />
    
    <!-- Icono derecho (opcional) -->
    <i class="far fa-check" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%);"></i>
  </div>
  
  <!-- Helper text y contador (independientes) -->
  <div class="ubits-input-helper">
    <span>Helper text</span> <!-- Opcional -->
    <span class="ubits-input-counter">0/50</span> <!-- Opcional -->
  </div>
  
  <!-- Dropdowns (SELECT, AUTOCOMPLETE, CALENDAR) -->
  <div class="ubits-select-dropdown">...</div>
</div>
```

### Elementos Principales
- **`.ubits-input-label`**: Label del input (13px, semibold)
- **`.ubits-input-mandatory`**: Texto "(obligatorio)" o "(opcional)" (11px, regular)
- **`.ubits-input`**: Campo de entrada base
- **`.ubits-input-wrapper`**: Wrapper con `position: relative` para iconos
- **`.ubits-input-icon-left`**: Icono izquierdo con posicionamiento absoluto
- **`.ubits-input-icon-right`**: Icono derecho con posicionamiento absoluto
- **`.ubits-input-helper`**: Contenedor flex para helper text y contador
- **`.ubits-input-counter`**: Contador de caracteres (independiente del helper)
- **`.ubits-select-dropdown`**: Dropdown para SELECT (scroll infinito para 50+ opciones)
- **`.ubits-autocomplete-dropdown`**: Dropdown para AUTOCOMPLETE
- **`.ubits-calendar-picker`**: Date picker para CALENDAR

---

## Tipos de Input

### 1. TEXT (Básico)
- **HTML**: `<input type="text">`
- **Características**: Input estándar de texto
- **Soporta**: Iconos izquierdo/derecho, contador, helper text

### 2. EMAIL
- **HTML**: `<input type="email">`
- **Características**: Input de email
- **Validación**: ⚠️ **MANUAL OBLIGATORIA** (no funciona automática)
- **Ejemplo válido**: `test@email.com`
- **Ejemplo inválido**: `email-invalido` (borde rojo)

### 3. PASSWORD
- **HTML**: `<input type="password">`
- **Características**: Input de contraseña con toggle mostrar/ocultar
- **Icono derecho**: `fa-eye` (automático, clickeable)
- **Funcionalidad**: Click en icono cambia a `type="text"` y icono a `fa-eye-slash`

### 4. NUMBER
- **HTML**: `<input type="number">`
- **Características**: Input numérico
- **Soporta**: min/max values, formato automático

### 5. TEL (Teléfono)
- **HTML**: `<input type="tel">`
- **Características**: Input de teléfono
- **Validación**: ⚠️ **MANUAL OBLIGATORIA** (no funciona automática)
- **Ejemplo válido**: `+57 300 123 4567`
- **Ejemplo inválido**: `123` (borde rojo)

### 6. URL
- **HTML**: `<input type="url">`
- **Características**: Input de URL
- **Validación**: ⚠️ **MANUAL OBLIGATORIA** (no funciona automática)
- **Ejemplo válido**: `https://ejemplo.com`
- **Ejemplo inválido**: `url-invalida` (borde rojo)

### 7. SELECT (Dropdown)
- **HTML**: `<input type="text" readonly>` (simulado)
- **Características**: Dropdown personalizado con opciones
- **Icono derecho**: `fa-chevron-down` (automático)
- **Scroll infinito**: Se activa automáticamente con 50+ opciones
- **Loading visual**: Spinner animado durante carga
- **Carga progresiva**: 10 opciones por vez
- **Observador de scroll**: IntersectionObserver para cargar automáticamente

### 8. TEXTAREA
- **HTML**: `<textarea>`
- **Características**: Campo multilínea
- **Redimensionamiento**: `resize: vertical` (solo vertical)
- **Min-height**: 80px
- **Soporta**: Contador, helper text, estados disabled correctos

### 9. SEARCH
- **HTML**: `<input type="text" autocomplete="off">`
- **Características**: Input de búsqueda con botón limpiar
- **Icono izquierdo**: `fa-search` (automático si no hay leftIcon)
- **Icono derecho**: `fa-times` (automático, clickeable)
- **Funcionalidad**: Icono X aparece solo cuando hay texto, click limpia el input

### 10. AUTOCOMPLETE
- **HTML**: `<input type="text" autocomplete="off">`
- **Características**: Input con sugerencias automáticas
- **Icono izquierdo**: `fa-search` (automático si no hay leftIcon)
- **Icono derecho**: `fa-times` (automático, clickeable)
- **Dropdown**: Muestra máximo 5 opciones filtradas
- **Funcionalidad**: Filtrado en tiempo real, resaltado de texto coincidente

### 11. CALENDAR
- **HTML**: `<input type="text" readonly>`
- **Características**: Date picker personalizado
- **Icono derecho**: `fa-calendar` (automático)
- **Date picker**: Navegación por mes/año, selector de año (100 años)
- **Formato**: `DD/MM/YYYY`

---

## Tamaños

### XS (Extra Small)
- **Altura**: `28px` (igual que `ubits-button--xs`)
- **Padding**: `8px 12px`
- **Font-size**: `0.8125rem` (13px) - body-xs
- **Padding con iconos**: `32px` (izquierda/derecha)

### SM (Small)
- **Altura**: `32px` (igual que `ubits-button--sm`)
- **Padding**: `10px 14px`
- **Font-size**: `0.875rem` (14px) - body-sm
- **Padding con iconos**: `36px` (izquierda/derecha)

### MD (Medium) - Por Defecto
- **Altura**: `40px` (igual que `ubits-button--md`)
- **Padding**: `12px 8px`
- **Font-size**: `1rem` (16px) - body-md
- **Padding con iconos**: `40px` (izquierda/derecha)

### LG (Large)
- **Altura**: `48px` (igual que `ubits-button--lg`)
- **Padding**: `16px 8px`
- **Font-size**: `1.125rem` (18px) - body-lg
- **Padding con iconos**: `44px` (izquierda/derecha)

---

## Estados

### Default
- **Borde**: `1px solid var(--ubits-border-1)`
- **Background**: `var(--ubits-bg-1)`
- **Color**: `var(--ubits-fg-1-high)`

### Hover
- **Borde**: `var(--ubits-accent-brand)`
- **Clase**: `.ubits-input--hover`

### Focus
- **Borde**: `var(--ubits-accent-brand)`
- **Box-shadow**: `0 0 0 2px rgba(12, 91, 239, 0.1)`
- **Clase**: `.ubits-input--focus`

### Active
- **Borde**: `var(--ubits-accent-brand)`
- **Background**: `var(--ubits-bg-2)`
- **Clase**: `.ubits-input--active`

### Invalid
- **Borde**: `var(--ubits-feedback-accent-error)` (rojo)
- **Clase**: `.ubits-input--invalid`
- **Focus invalid**: Borde rojo + `box-shadow: 0 0 0 2px rgba(233, 52, 60, 0.1)`

### Disabled
- **Background**: `var(--ubits-bg-3)`
- **Color**: `var(--ubits-fg-1-low)`
- **Borde**: `var(--ubits-border-2)`
- **Cursor**: `not-allowed`
- **Clase**: `.ubits-input--disabled`
- **Atributo**: `disabled`

---

## Controles Independientes

### 1. Label
- **Mostrar/Ocultar**: `showLabel` (boolean, default: `true`)
- **Texto**: `label` (string)
- **Tipografía**: `13px`, `semibold` (600), `line-height: 19.5px`
- **Color**: `var(--ubits-fg-1-high)`
- **Margin-bottom**: `8px`

### 2. Mandatory/Optional
- **Mostrar**: `mandatory` (boolean, default: `false`)
- **Tipo**: `mandatoryType` ('obligatorio' | 'opcional', default: 'obligatorio')
- **Tipografía**: `11px`, `regular` (400), `line-height: 16.5px`
- **Color**: `var(--ubits-fg-1-medium)`
- **Formato**: `(obligatorio)` o `(opcional)`

### 3. Helper Text
- **Mostrar/Ocultar**: `showHelper` (boolean, default: `false`)
- **Independiente**: Del contador (pueden coexistir)
- **Texto**: `helperText` (string)
- **Tipografía**: `13px`, `regular` (400), `line-height: 19.5px`
- **Color**: `var(--ubits-fg-1-medium)`
- **Margin-top**: `4px`
- **Layout**: Flex con `justify-content: space-between` (helper a la izquierda, contador a la derecha)

### 4. Character Counter
- **Mostrar/Ocultar**: `showCounter` (boolean, default: `false`)
- **Independiente**: Del helper text (pueden coexistir)
- **Max length**: `maxLength` (number, default: `50`)
- **Formato**: `current/max` (ej: `0/50`)
- **Tipografía**: `13px`, `regular` (400), `line-height: 19.5px`
- **Color normal**: `var(--ubits-fg-1-medium)`
- **Color al límite**: `var(--ubits-feedback-accent-error)`, `font-weight: 600`
- **Funcionalidad**: Actualiza en tiempo real, previene escribir más del límite

### 5. Left Icon
- **Mostrar/Ocultar**: `leftIcon` (string, default: `''`)
- **Formato**: `'fa-user'` (se agrega `'far'` automáticamente)
- **Posición**: `absolute`, `left: 12px`, `top: 50%`, `transform: translateY(-50%)`
- **Color**: `var(--ubits-fg-1-medium)`
- **Pointer-events**: `none` (excepto en password, search, autocomplete)
- **Padding del input**: Se ajusta automáticamente (`padding-left: 32px/36px/40px/44px` según tamaño)

### 6. Right Icon
- **Mostrar/Ocultar**: `rightIcon` (string, default: `''`)
- **Formato**: `'fa-check'` (se agrega `'far'` automáticamente)
- **Posición**: `absolute`, `right: 12px`, `top: 50%`, `transform: translateY(-50%)`
- **Color**: `var(--ubits-fg-1-medium)`
- **Pointer-events**: `none` (excepto en password toggle, search clear, autocomplete clear)
- **Padding del input**: Se ajusta automáticamente (`padding-right: 32px/36px/40px/44px` según tamaño)
- **Iconos automáticos por tipo**:
  - **SELECT**: `fa-chevron-down` (automático)
  - **SEARCH**: `fa-times` (automático, clickeable)
  - **AUTOCOMPLETE**: `fa-times` (automático, clickeable)
  - **CALENDAR**: `fa-calendar` (automático)
  - **PASSWORD**: `fa-eye` (automático, clickeable para toggle)

---

## Iconos

### Posicionamiento
- **Left icon**: `position: absolute; left: 12px; top: 50%; transform: translateY(-50%);`
- **Right icon**: `position: absolute; right: 12px; top: 50%; transform: translateY(-50%);`
- **Z-index**: `1`
- **Color**: `var(--ubits-fg-1-medium)`
- **Pointer-events**: `none` por defecto (excepto iconos funcionales)

### Padding Dinámico
El padding del input se ajusta automáticamente según los iconos presentes:

| Tamaño | Sin iconos | Con left icon | Con right icon | Con ambos |
|--------|------------|---------------|----------------|-----------|
| XS     | `8px 12px` | `8px 12px 8px 32px` | `8px 32px 8px 12px` | `8px 32px` |
| SM     | `10px 14px`  | `10px 14px 10px 36px` | `10px 36px 10px 14px` | `10px 36px` |
| MD     | `12px 8px` | `12px 8px 12px 40px` | `12px 40px 12px 8px` | `12px 40px` |
| LG     | `16px 8px` | `16px 8px 16px 44px` | `16px 44px 16px 8px` | `16px 44px` |

### Iconos Funcionales (Clickeables)
1. **Password toggle**: `fa-eye` ↔ `fa-eye-slash` (cambia `type="password"` ↔ `type="text"`)
2. **Search clear**: `fa-times` (aparece solo cuando hay texto, limpia el input)
3. **Autocomplete clear**: `fa-times` (aparece solo cuando hay texto, limpia el input y cierra dropdown)

---

## Espaciados y Dimensiones

### Estructura General
- **Container**: `width: 100%`, `position: relative` (para dropdowns)
- **Label margin-bottom**: `8px`
- **Helper margin-top**: `4px`
- **Border-radius**: `6px`
- **Border-width**: `1px`

### Input Heights (iguales a button)
- **XS**: `28px`
- **SM**: `32px`
- **MD**: `40px`
- **LG**: `48px`

### Iconos
- **Tamaño**: `14px` (SM), `16px` (MD), `18px` (LG) - Ajustado por font-size del input
- **Posición left**: `12px` del borde izquierdo
- **Posición right**: `12px` del borde derecho

### Helper y Contador
- **Gap entre helper y contador**: Flex con `justify-content: space-between`
- **Responsive**: En móvil se apilan verticalmente con `flex-direction: column`, `gap: 4px`

---

## Tipografía

### Label
- **Font-family**: `'Noto Sans', sans-serif`
- **Font-size**: `13px` (`var(--font-body-sm-size)`)
- **Font-weight**: `600` (`var(--weight-semibold)`)
- **Line-height**: `19.5px` (`var(--font-body-sm-line)`)
- **Color**: `var(--ubits-fg-1-high)`

### Mandatory Text
- **Font-family**: `'Noto Sans', sans-serif`
- **Font-size**: `11px` (`var(--font-body-xs-size)`)
- **Font-weight**: `400` (`var(--weight-regular)`)
- **Line-height**: `16.5px` (`var(--font-body-xs-line)`)
- **Color**: `var(--ubits-fg-1-medium)`

### Input Text
- **Font-family**: `'Noto Sans', sans-serif`
- **Font-size**: 
  - XS: `0.8125rem` (13px) - `var(--font-body-xs-size)`
  - SM: `0.875rem` (14px) - `var(--font-body-sm-size)`
  - MD: `1rem` (16px) - `var(--font-body-md-size)`
  - LG: `1.125rem` (18px) - `var(--font-body-lg-size)`
- **Color**: `var(--ubits-fg-1-high)`
- **Placeholder**: `var(--ubits-fg-1-low)`

### Helper Text
- **Font-family**: `'Noto Sans', sans-serif`
- **Font-size**: `13px` (`var(--font-body-sm-size)`)
- **Font-weight**: `400` (`var(--weight-regular)`)
- **Line-height**: `19.5px` (`var(--font-body-sm-line)`)
- **Color**: `var(--ubits-fg-1-medium)`

### Counter
- **Font-family**: `'Noto Sans', sans-serif`
- **Font-size**: `13px` (`var(--font-body-sm-size)`)
- **Font-weight**: `400` (normal) / `600` (al límite)
- **Line-height**: `19.5px` (`var(--font-body-sm-line)`)
- **Color**: `var(--ubits-fg-1-medium)` (normal) / `var(--ubits-feedback-accent-error)` (al límite)

---

## Tokens CSS

### Colores
- **Fondo**: `var(--ubits-bg-1)`
- **Fondo disabled**: `var(--ubits-bg-3)`
- **Fondo active**: `var(--ubits-bg-2)`
- **Texto**: `var(--ubits-fg-1-high)`
- **Texto disabled**: `var(--ubits-fg-1-low)`
- **Placeholder**: `var(--ubits-fg-1-low)`
- **Texto secundario**: `var(--ubits-fg-1-medium)`
- **Borde default**: `var(--ubits-border-1)`
- **Borde disabled**: `var(--ubits-border-2)`
- **Borde activo**: `var(--ubits-accent-brand)`
- **Borde error**: `var(--ubits-feedback-accent-error)`
- **Box-shadow focus**: `0 0 0 2px rgba(12, 91, 239, 0.1)`
- **Box-shadow error focus**: `0 0 0 2px rgba(233, 52, 60, 0.1)`

### Tipografía
- Usa tokens de `tokens-typography.css`:
  - `--font-body-sm-size` (13px)
  - `--font-body-sm-line` (19.5px)
  - `--font-body-xs-size` (11px)
  - `--font-body-xs-line` (16.5px)
  - `--weight-regular` (400)
  - `--weight-semibold` (600)

---

## Funcionalidades Especiales

### 1. Password Toggle
- **Icono**: `fa-eye` (oculto) ↔ `fa-eye-slash` (visible)
- **Funcionalidad**: Click en icono cambia `type="password"` ↔ `type="text"`
- **Icono clickeable**: `pointer-events: auto`, `cursor: pointer`

### 2. Search Clear
- **Icono**: `fa-times` (aparece solo cuando hay texto)
- **Funcionalidad**: Click limpia el input y enfoca
- **Event**: `input` para mostrar/ocultar icono

### 3. Autocomplete Clear
- **Icono**: `fa-times` (aparece solo cuando hay texto)
- **Funcionalidad**: Click limpia el input, cierra dropdown y enfoca
- **Filtrado**: En tiempo real mientras escribes
- **Máximo opciones**: 5 opciones mostradas
- **Resaltado**: Texto coincidente en `<strong>`

### 4. Select Scroll Infinito
- **Activación**: Automática con 50+ opciones
- **Carga**: 10 opciones por vez
- **Loading visual**: Spinner animado (`fa-spinner fa-spin`)
- **Observador**: IntersectionObserver para detectar scroll al final
- **Optimización**: Solo renderiza lo necesario

### 5. Calendar Date Picker
- **Navegación**: Botones anterior/siguiente mes
- **Selectores**: Mes y año (dropdowns)
- **Rango años**: 100 años (50 atrás, 50 adelante)
- **Formato**: `DD/MM/YYYY`
- **Estados visuales**: Today (fondo gris), Selected (fondo azul)

### 6. Textarea Auto-resize
- **Resize**: `vertical` (solo vertical)
- **Min-height**: `80px`
- **Line-height**: `1.5`
- **Soporta**: Contador, helper text, estados

---

## Validación

### ⚠️ IMPORTANTE: Validación Manual Obligatoria

**El componente Input NO incluye validación automática.** 
**SIEMPRE debes implementar validación manual para email, tel, url.**

### Ejemplo de Validación Manual:
```javascript
const emailInput = createInput({
    containerId: 'mi-email',
    type: 'email',
    placeholder: 'correo@ejemplo.com',
    value: 'email-invalido'
});

// ⚠️ OBLIGATORIO: Agregar validación manual
setTimeout(() => {
    const input = document.querySelector('#mi-email input');
    if (input) {
        input.addEventListener('input', function() {
            const value = this.value;
            // Validación simple de email
            if (value.includes('@') && value.includes('.') && value.length > 5) {
                // Válido: borde normal
                this.style.borderColor = 'var(--ubits-border-1)';
                this.style.borderWidth = '1px';
                input.classList.remove('ubits-input--invalid');
                input.classList.add('ubits-input--default');
            } else if (value.length > 0) {
                // Inválido: borde rojo
                this.style.borderColor = 'var(--ubits-feedback-accent-error)';
                this.style.borderWidth = '2px';
                input.classList.add('ubits-input--invalid');
            } else {
                // Vacío: borde normal
                this.style.borderColor = 'var(--ubits-border-1)';
                this.style.borderWidth = '1px';
                input.classList.remove('ubits-input--invalid');
            }
        });
        
        // Validar valor inicial si existe
        input.dispatchEvent(new Event('input'));
    }
}, 500);
```

### Reglas de Validación:
- ✅ **SIEMPRE** implementa validación manual para email, tel, url
- ✅ **USA estilos inline** - `input.style.borderColor` para garantizar que funcione
- ✅ **Timeout de 500ms** - Para asegurar que el input esté creado
- ✅ **Event listener 'input'** - Para validación en tiempo real
- ✅ **Clases CSS** - Agregar/quitar `.ubits-input--invalid` según validación
- ❌ **NO existe** validación automática en el componente

---

## Accesibilidad

### ARIA
- **Roles**: Usar roles ARIA apropiados según el tipo
- **Labels**: Siempre asociar label con input usando `for` o contenedor
- **Describedby**: Helper text con `aria-describedby`
- **Invalid**: `aria-invalid="true"` en estado invalid

### Keyboard Navigation
- **Tab**: Navegación normal
- **Enter**: Submit o activar (SELECT, CALENDAR)
- **Escape**: Cerrar dropdowns
- **Arrow keys**: Navegación en SELECT y AUTOCOMPLETE
- **Focus visible**: Box-shadow en focus para accesibilidad

---

## API y Métodos

### Función Principal
```javascript
const input = createInput({
    containerId: 'mi-input',      // REQUERIDO
    label: 'Nombre',              // Opcional
    placeholder: 'Escribe...',     // Opcional
    type: 'text',                 // 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select' | 'textarea' | 'search' | 'autocomplete' | 'calendar'
    size: 'md',                   // 'xs' | 'sm' | 'md' | 'lg'
    state: 'default',             // 'default' | 'hover' | 'focus' | 'active' | 'invalid' | 'disabled'
    showLabel: true,              // boolean
    showHelper: false,            // boolean
    showCounter: false,           // boolean
    maxLength: 50,                // number
    mandatory: false,             // boolean
    mandatoryType: 'obligatorio', // 'obligatorio' | 'opcional'
    leftIcon: 'fa-user',          // string (FontAwesome sin 'far')
    rightIcon: 'fa-check',        // string (FontAwesome sin 'far')
    helperText: 'Texto de ayuda', // string
    selectOptions: [],            // Array para SELECT
    autocompleteOptions: [],      // Array para AUTOCOMPLETE
    value: '',                    // string
    onChange: (value) => {},      // function
    onFocus: (value) => {},       // function
    onBlur: (value) => {}         // function
});
```

### Métodos Disponibles
```javascript
// Obtener valor
const value = input.getValue();

// Establecer valor
input.setValue('Nuevo texto');

// Enfocar
input.focus();

// Desenfocar
input.blur();

// Deshabilitar
input.disable();

// Habilitar
input.enable();

// Cambiar estado
input.setState('invalid'); // 'default' | 'hover' | 'focus' | 'active' | 'invalid' | 'disabled'
```

---

## Checklist de Implementación

### 📁 Estructura del Add-on
- [ ] Crear `packages/addons/input/`
- [ ] `package.json` con dependencias
- [ ] `tsconfig.json`
- [ ] `vite.config.ts`
- [ ] `README.md`

### 🎨 CSS (`src/styles/input.css`)
- [ ] Estilos base `.ubits-input`
- [ ] Tamaños (SM, MD, LG)
- [ ] Estados (default, hover, focus, active, invalid, disabled)
- [ ] Iconos (left/right con posicionamiento absoluto)
- [ ] Padding dinámico según iconos
- [ ] Label y mandatory text
- [ ] Helper text y counter
- [ ] SELECT dropdown styles
- [ ] AUTOCOMPLETE dropdown styles
- [ ] CALENDAR picker styles
- [ ] TEXTAREA styles
- [ ] Responsive (helper text apilado en móvil)

### 🔧 TypeScript (`src/types/InputOptions.ts`)
- [ ] `InputType` type
- [ ] `InputSize` type
- [ ] `InputState` type
- [ ] `MandatoryType` type
- [ ] `InputOptions` interface con todas las opciones
- [ ] `SelectOption` interface
- [ ] `AutocompleteOption` interface

### 📦 Provider (`src/InputProvider.ts`)
- [ ] `renderInput(options)` - Renderizar HTML
- [ ] `createInput(options)` - Crear elemento DOM
- [ ] Lógica de iconos (left/right)
- [ ] Padding dinámico según iconos
- [ ] Lógica de tipos (text, email, password, etc.)
- [ ] Password toggle functionality
- [ ] Search clear functionality
- [ ] Autocomplete functionality
- [ ] Select dropdown con scroll infinito
- [ ] Calendar date picker
- [ ] Character counter con validación
- [ ] Event listeners (onChange, onFocus, onBlur)

### 🧩 Web Component (`src/InputComponent.ts`)
- [ ] `UBITSInput` class extendiendo `HTMLElement`
- [ ] Observed attributes
- [ ] Lifecycle methods
- [ ] Métodos públicos (getValue, setValue, focus, blur, disable, enable, setState)

### 🔌 Add-on (`src/InputAddon.ts`)
- [ ] Implementar `ComponentAddon` interface
- [ ] Initialize method
- [ ] Destroy method
- [ ] Exportar componentes
- [ ] Exportar estilos

### 📚 Index (`src/index.ts`)
- [ ] Exportar todas las funciones y tipos
- [ ] Registrar Web Component

### 📖 Documentación
- [ ] `README.md` con ejemplos de uso
- [ ] Documentar todos los tipos
- [ ] Documentar todos los estados
- [ ] Documentar validación manual obligatoria
- [ ] Ejemplos de cada tipo de input

### 🎮 Playground Integration
- [ ] Agregar Input a `componentsInventory`
- [ ] Preview interactivo con todos los controles
- [ ] Controles: label, mandatory, helper, counter, leftIcon, rightIcon, size, state, type, placeholder
- [ ] Ejemplos de cada tipo de input
- [ ] Funcionalidad de validación manual en preview

### 📘 Storybook
- [ ] Crear `Input.stories.ts`
- [ ] Story con todos los controles
- [ ] Ejemplos de cada tipo
- [ ] Documentar validación manual

---

## Notas Importantes

1. **Validación Manual**: ⚠️ **SIEMPRE** implementar validación manual para email, tel, url
2. **Position Relative**: El contenedor debe tener `position: relative` para dropdowns
3. **Iconos Automáticos**: Algunos tipos agregan iconos automáticamente (SELECT, SEARCH, etc.)
4. **Padding Dinámico**: Se ajusta automáticamente según iconos presentes
5. **Scroll Infinito**: Se activa automáticamente en SELECT con 50+ opciones
6. **Helper y Counter**: Son independientes, pueden coexistir
7. **FontAwesome**: Se agrega `'far'` automáticamente si el icono empieza con `'fa-'`

---

## Referencias

- **Archivos del playground anterior**:
  - `template-ubits/components/input.css`
  - `template-ubits/components/input.js`
  - `template-ubits/input.html`

- **Tokens UBITS**: Usar tokens del sistema de diseño
- **Tipografía**: Usar tokens de `tokens-typography.css`
- **Iconos**: Sistema de iconos UBITS (`@ubits/icons`)

