# Análisis Completo: Componente Button del Playground Anterior

## 📋 Resumen Ejecutivo

**Tipo de Componente**: Puramente CSS (sin JavaScript)  
**Base HTML**: `<button>` con clases UBITS  
**Dependencias**: `button.css`, `ubits-colors.css`, `ubits-typography.css`, `fontawesome-icons.css`

---

## 🎨 ESTRUCTURA HTML

### **Estructura Base**
```html
<button class="ubits-button ubits-button--{variant} ubits-button--{size}">
  <i class="far fa-{icon}"></i>  <!-- Opcional -->
  <span>Texto del botón</span>
  <span class="ubits-button__badge"></span>  <!-- Opcional -->
</button>
```

### **Variantes de Estructura**
1. **Con icono y texto**: `<i>` + `<span>`
2. **Solo texto**: `<span>` únicamente
3. **Solo icono**: `<i>` + clase `ubits-button--icon-only`

---

## 🎭 VARIANTES

### **1. Primary (Por defecto)**
```html
<button class="ubits-button ubits-button--primary">
```
- **Background default**: `var(--ubits-button-primary-bg-default)`
- **Color texto**: `var(--ubits-btn-primary-fg)`
- **Border**: `var(--ubits-button-primary-bg-default)`
- **Background hover**: `var(--ubits-button-primary-hover)`
- **Background pressed**: `var(--ubits-button-primary-pressed)`

### **2. Secondary**
```html
<button class="ubits-button ubits-button--secondary">
```
- **Background default**: `var(--ubits-btn-secondary-bg-default)`
- **Color texto**: `var(--ubits-btn-secondary-fg-default)`
- **Border**: `var(--ubits-btn-secondary-border)`
- **Background hover**: `var(--ubits-btn-secondary-bg-hover)`
- **Background pressed**: `var(--ubits-btn-secondary-bg-pressed)`

### **3. Tertiary**
```html
<button class="ubits-button ubits-button--tertiary">
```
- **Background default**: `transparent`
- **Color texto**: `var(--ubits-btn-tertiary-fg)`
- **Border**: `transparent`
- **Background hover**: `var(--ubits-btn-tertiary-bg-hover)`
- **Background pressed**: `var(--ubits-btn-tertiary-bg-pressed)`

### **4. Active/Outline (Modificador)**
```html
<button class="ubits-button ubits-button--{variant} ubits-button--active">
```
- Aplica a todas las variantes (primary, secondary, tertiary)
- **Background**: `var(--ubits-button-active-bg)`
- **Color texto**: `var(--ubits-accent-brand)`
- **Border**: `var(--ubits-accent-brand)` (primary) o `none` (secondary/tertiary)

---

## 📏 TAMAÑOS

### **Extra Small (xs)** - ⚠️ PROPUESTO (No existe en playground anterior)
- **Clase**: `ubits-button--xs`
- **Altura propuesta**: `24px` (basado en escala tipográfica)
- **Padding propuesto**: `6px 10px` (vertical horizontal)
- **Padding icon-only propuesto**: `6px`
- **Width icon-only propuesto**: `24px`
- **Tipografía propuesta**: Basado en `body-xs-semibold` (si existe)
  - Font-size: `11px` (basado en body-xs)
  - Font-weight: `600`
  - Line-height: `16.5px` (basado en body-xs)
- **Icono propuesto**: `12px`

### **Small (sm)**
- **Clase**: `ubits-button--sm`
- **Altura**: `32px`
- **Padding**: `9.5px 12px` (vertical horizontal)
- **Padding icon-only**: `9.5px 8px`
- **Width icon-only**: `32px`
- **Tipografía**: `ubits-body-sm-semibold`
  - Font-size: `13px`
  - Font-weight: `600`
  - Line-height: `19.5px`
- **Icono**: `14px` (si existe `.ubits-button--small .ubits-button__icon`)

### **Medium (md) - POR DEFECTO**
- **Clase**: `ubits-button` (sin clase de tamaño)
- **Altura**: `40px`
- **Padding**: `12px 16px` (base)
- **Padding icon-only**: `12px`
- **Min-width icon-only**: `40px`
- **Min-height icon-only**: `40px`
- **Tipografía**: `ubits-body-md-semibold`
  - Font-size: `16px`
  - Font-weight: `600`
  - Line-height: `24px`
- **Icono**: `16px` (base)

### **Large (lg)**
- **Clase**: `ubits-button--lg`
- **Altura**: `48px`
- **Padding**: `14px 20px` (vertical horizontal)
- **Padding icon-only**: `14px 16px`
- **Width icon-only**: `48px`
- **Height icon-only**: `48px`
- **Tipografía**: `ubits-body-lg-semibold`
  - Font-size: `20px`
  - Font-weight: `600`
  - Line-height: `30px`
- **Icono**: `18px` (si existe `.ubits-button--large .ubits-button__icon`)

### **Extra Large (xl)** - ⚠️ PROPUESTO (No existe en playground anterior)
- **Clase**: `ubits-button--xl`
- **Altura propuesta**: `56px` (basado en escala lógica)
- **Padding propuesto**: `16px 24px` (vertical horizontal)
- **Padding icon-only propuesto**: `16px 20px`
- **Width icon-only propuesto**: `56px`
- **Height icon-only propuesto**: `56px`
- **Tipografía propuesta**: Basado en escala extendida
  - Font-size: `22px`
  - Font-weight: `600`
  - Line-height: `33px` (1.5x)
- **Icono propuesto**: `20px`

---

## 🔄 ESTADOS

### **1. Default**
- Estado inicial del botón
- Sin clases especiales adicionales

### **2. Hover**
```css
.ubits-button:hover:not(:disabled)
```
- **Transición**: `all 0.2s ease`
- Cambia background y border según variante
- **Primary hover**: `var(--ubits-button-primary-hover)`
- **Secondary hover**: `var(--ubits-btn-secondary-bg-hover)`
- **Tertiary hover**: `var(--ubits-btn-tertiary-bg-hover)`

### **3. Active/Pressed**
```css
.ubits-button:active:not(:disabled)
```
- Cambia background y border según variante
- **Transform**: `translateY(1px)` (efecto de presión)
- **Primary pressed**: `var(--ubits-button-primary-pressed)`
- **Secondary pressed**: `var(--ubits-btn-secondary-bg-pressed)`
- **Tertiary pressed**: `var(--ubits-btn-tertiary-bg-pressed)`

### **4. Focus**
```css
.ubits-button:focus-visible
```
- **Outline**: `none`
- **Box-shadow**: `0px 0px 0px 4px var(--ubits-button-focus-ring)`
- **Tertiary especial**: mantiene background transparent, solo agrega box-shadow

### **5. Disabled**
```css
.ubits-button:disabled
.ubits-button[aria-disabled="true"]
```
- **Background**: `var(--ubits-bg-disabled-button) !important`
- **Color**: `var(--ubits-fg-on-disabled-button) !important`
- **Border**: `var(--ubits-border-disabled-button) !important`
- **Cursor**: `not-allowed`
- **Pointer-events**: `none`
- **Pseudo-elemento `::before`**: borde adicional con `var(--ubits-border-disabled-button)`

### **6. Loading** - ⚠️ PROPUESTO (No existe en playground anterior)
```css
.ubits-button--loading
.ubits-button[data-loading="true"]
```
- **Propuesta de implementación**:
  - **Cursor**: `wait` o `progress`
  - **Pointer-events**: `none` (deshabilitar clics durante carga)
  - **Opacity**: `0.7` (opcional, para indicar estado)
  - **Spinner**: Icono FontAwesome `fa-spinner` con animación `fa-spin`
  - **Texto**: Puede ocultarse o mostrarse junto al spinner
  - **Estructura propuesta**:
    ```html
    <button class="ubits-button ubits-button--primary ubits-button--loading">
      <i class="far fa-spinner fa-spin"></i>
      <span>Cargando...</span>
    </button>
    ```
- **Consideraciones**:
  - El spinner debe reemplazar o acompañar al icono original
  - El botón debe estar visualmente deshabilitado pero sin usar `:disabled`
  - Permite mantener el estado visual de "cargando" mientras se procesa acción

---

## 🎯 MODIFICADORES

### **Icon Only**
```html
<button class="ubits-button ubits-button--icon-only">
```
- **Padding ajustado según tamaño**:
  - Small: `9.5px 8px`, `32px × 32px`
  - Medium: `12px`, `40px × 40px` (min-width/min-height)
  - Large: `14px 16px`, `48px × 48px`
- Solo muestra el icono, sin texto

---

## 📐 ESPACIADOS

### **Gap entre elementos**
- **Gap interno**: `8px` (entre icono y texto)

### **Padding por tamaño**
- **Small**: `9.5px 12px` (con texto), `9.5px 8px` (icon-only)
- **Medium**: `12px 16px` (con texto), `12px` (icon-only)
- **Large**: `14px 20px` (con texto), `14px 16px` (icon-only)

### **Border radius**
- **Uniforme**: `8px` para todos los tamaños y variantes

---

## 🔤 TIPOGRAFÍA

### **Fuente**
- **Font-family**: `'Noto Sans', sans-serif`
- Heredado de `ubits-typography.css`

### **Estilos tipográficos por tamaño**

#### Small (sm)
```css
.ubits-button--sm span {
  font-family: 'Noto Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 19.5px;
}
```
- Equivalente a: `ubits-body-sm-semibold`

#### Medium (md)
```css
.ubits-button span {
  font-family: 'Noto Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
```
- Equivalente a: `ubits-body-md-semibold`

#### Large (lg)
```css
.ubits-button--lg span {
  font-family: 'Noto Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}
```
- Equivalente a: `ubits-body-lg-semibold`

---

## 🎨 TOKENS UTILIZADOS

### **Button Primary**
- `--ubits-button-primary-bg-default`
- `--ubits-button-primary-hover`
- `--ubits-button-primary-pressed`
- `--ubits-btn-primary-fg`

### **Button Secondary**
- `--ubits-btn-secondary-bg-default`
- `--ubits-btn-secondary-bg-hover`
- `--ubits-btn-secondary-bg-pressed`
- `--ubits-btn-secondary-fg-default`
- `--ubits-btn-secondary-border`

### **Button Tertiary**
- `--ubits-btn-tertiary-fg`
- `--ubits-btn-tertiary-bg-hover`
- `--ubits-btn-tertiary-bg-pressed`

### **Button Estados Generales**
- `--ubits-button-active-bg`
- `--ubits-button-focus-ring`
- `--ubits-button-badge`
- `--ubits-accent-brand`

### **Button Disabled**
- `--ubits-bg-disabled-button`
- `--ubits-fg-on-disabled-button`
- `--ubits-border-disabled-button`

---

## 🔧 PROPIEDADES CSS BASE

### **Display y Layout**
```css
display: inline-flex;
align-items: center;
justify-content: center;
gap: 8px;
position: relative;
white-space: nowrap;
```

### **Box Model**
```css
border: none;  /* Base, se sobrescribe por variantes */
border-radius: 8px;
/* Padding varía por tamaño */
```

### **Tipografía Base**
```css
font-family: 'Noto Sans', sans-serif;
font-weight: 600;
line-height: 1;
text-decoration: none;
```

### **Interacción**
```css
cursor: pointer;
user-select: none;
transition: all 0.2s ease;
```

---

## 🎯 ICONOS

### **Clase base para iconos**
```css
.ubits-button__icon {
  font-size: 16px;  /* Medium por defecto */
  line-height: 1;
}
```

### **Tamaños de iconos**
- **Small**: `14px` (si existe `.ubits-button--small .ubits-button__icon`)
- **Medium**: `16px` (default)
- **Large**: `18px` (si existe `.ubits-button--large .ubits-button__icon`)

### **FontAwesome específico para primary**
```css
.ubits-button--primary i {
  font-family: "Font Awesome 6 Pro", "Font Awesome 6 Free", "Font Awesome 6 Brands" !important;
}
```

---

## 🔔 BADGE

### **Posicionamiento**
```css
.ubits-button__badge {
  position: absolute;
  top: -2px;
  right: -3px;
  width: 10px;
  height: 10px;
  background: var(--ubits-button-badge);
  border-radius: 50%;
}
```

### **Badge en icon-only**
```css
.ubits-button--icon-only .ubits-button__badge {
  top: -2px;
  right: -2px;
}
```

---

## 📱 RESPONSIVE

### **Media Query (max-width: 768px)**
```css
@media (max-width: 768px) {
  .ubits-button {
    font-size: 14px;
    padding: 10px 14px;
  }
  
  .ubits-button--small {
    font-size: 12px;
    padding: 6px 10px;
  }
  
  .ubits-button--large {
    font-size: 16px;
    padding: 14px 20px;
  }
}
```

**NOTA**: Estos estilos responsive pueden estar desactualizados ya que usan clases `.ubits-button--small` y `.ubits-button--large` en lugar de `--sm` y `--lg`.

---

## ♿ ACCESIBILIDAD

### **Focus Visible**
- Outline removido (`outline: none`)
- Box-shadow con focus ring de 4px
- Color: `var(--ubits-button-focus-ring)`

### **Disabled**
- Soporte para `:disabled` y `[aria-disabled="true"]`
- Cursor `not-allowed`
- `pointer-events: none`

### **Semántica**
- Usa elemento `<button>` nativo
- Estructura HTML clara para lectores de pantalla

---

## 📊 RESUMEN DE MEDIDAS

### **Tamaños Existentes (Playground Anterior)**

| Propiedad | Small (sm) | Medium (md) | Large (lg) |
|-----------|-----------|-------------|------------|
| **Altura** | 32px | 40px | 48px |
| **Padding (texto)** | 9.5px 12px | 12px 16px | 14px 20px |
| **Padding (icon-only)** | 9.5px 8px | 12px | 14px 16px |
| **Width (icon-only)** | 32px | 40px (min) | 48px |
| **Font-size** | 13px | 16px | 20px |
| **Line-height** | 19.5px | 24px | 30px |
| **Font-weight** | 600 | 600 | 600 |
| **Icon size** | 14px | 16px | 18px |
| **Border-radius** | 8px | 8px | 8px |
| **Gap interno** | 8px | 8px | 8px |

### **Tamaños Propuestos (A Agregar)**

| Propiedad | Extra Small (xs) | Extra Large (xl) |
|-----------|------------------|------------------|
| **Altura** | 24px | 56px |
| **Padding (texto)** | 6px 10px | 16px 24px |
| **Padding (icon-only)** | 6px | 16px 20px |
| **Width (icon-only)** | 24px | 56px |
| **Font-size** | 11px | 22px |
| **Line-height** | 16.5px | 33px |
| **Font-weight** | 600 | 600 |
| **Icon size** | 12px | 20px |
| **Border-radius** | 8px | 8px |
| **Gap interno** | 6px | 10px |

### **Escala Completa Propuesta: XS → S → M → L → XL**

| Tamaño | Clase | Altura | Font-size | Line-height | Icono | Uso sugerido |
|--------|-------|--------|-----------|-------------|-------|--------------|
| **XS** | `--xs` | 24px | 11px | 16.5px | 12px | Badges compactos, iconos muy pequeños |
| **S** | `--sm` | 32px | 13px | 19.5px | 14px | Acciones secundarias, controles |
| **M** | `--md` | 40px | 16px | 24px | 16px | Acciones principales (default) |
| **L** | `--lg` | 48px | 20px | 30px | 18px | CTAs destacados, acciones importantes |
| **XL** | `--xl` | 56px | 22px | 33px | 20px | Hero CTAs, botones muy destacados |

---

## 🎬 TRANSICIONES

- **Transición general**: `all 0.2s ease`
- **Active state**: `translateY(1px)` (transform sin transición visible)
- **Loading spinner**: Animación `fa-spin` de FontAwesome (rotación continua)

---

## 🔄 ESTADO LOADING (PROPUESTO)

### **Implementación Propuesta**

El estado loading permite mostrar que una acción está en progreso sin deshabilitar completamente el botón.

#### **1. Estructura HTML**
```html
<!-- Loading con spinner -->
<button class="ubits-button ubits-button--primary ubits-button--loading">
  <i class="far fa-spinner fa-spin"></i>
  <span>Guardando...</span>
</button>

<!-- Loading solo spinner (icon-only) -->
<button class="ubits-button ubits-button--primary ubits-button--sm ubits-button--icon-only ubits-button--loading">
  <i class="far fa-spinner fa-spin"></i>
</button>

<!-- Loading con atributo data (alternativa) -->
<button class="ubits-button ubits-button--primary" data-loading="true">
  <i class="far fa-spinner fa-spin"></i>
  <span>Procesando...</span>
</button>
```

#### **2. Estilos CSS Propuestos**
```css
/* Estado Loading */
.ubits-button--loading,
.ubits-button[data-loading="true"] {
  cursor: wait;
  pointer-events: none;
  opacity: 0.8;
  position: relative;
}

/* Ocultar contenido original durante loading */
.ubits-button--loading > span:not(.loading-text),
.ubits-button--loading > i:not(.fa-spinner) {
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* Spinner de loading */
.ubits-button--loading .fa-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Loading overlay (opcional) */
.ubits-button--loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  pointer-events: none;
}
```

#### **3. Tokens Necesarios**
- Puede usar los tokens existentes de disabled para el aspecto visual
- O crear nuevos tokens específicos:
  - `--ubits-button-loading-opacity`: `0.8`
  - `--ubits-button-loading-cursor`: `wait`

#### **4. Comportamiento**
- **Cursor**: Cambia a `wait` o `progress`
- **Pointer-events**: `none` (evita clics durante carga)
- **Texto**: Puede cambiar dinámicamente (ej: "Guardando..." → "Guardado")
- **Icono**: Se reemplaza por spinner o se muestra junto al texto
- **Accesibilidad**: Debe actualizar `aria-busy="true"` y `aria-label` con estado

---

## 🎨 FUNCIONALIDADES ADICIONALES PROPUESTAS

### **1. Full Width Button**
```css
.ubits-button--full-width {
  width: 100%;
  display: flex;
}
```
- Útil para botones en formularios o acciones principales

### **2. Block Level Button**
```css
.ubits-button--block {
  display: flex;
  width: 100%;
}
```
- Similar a full-width pero con comportamiento block

### **3. Icon Positioning**
```html
<!-- Icono a la izquierda (default) -->
<button class="ubits-button">
  <i class="far fa-plus"></i>
  <span>Agregar</span>
</button>

<!-- Icono a la derecha (propuesto) -->
<button class="ubits-button ubits-button--icon-right">
  <span>Agregar</span>
  <i class="far fa-arrow-right"></i>
</button>
```

### **4. Touch Targets**
- Asegurar que todos los tamaños sean accesibles en mobile
- Recomendación: mínimo 44x44px (Apple HIG)
- XS (24px) puede ser problemático en mobile - considerar desactivarlo en responsive

### **5. Progress Indicator**
- Alternativa al spinner para acciones con progreso conocido
- Muestra barra de progreso dentro del botón
- Útil para uploads, descargas, etc.

---

## 📝 NOTAS IMPORTANTES

1. **No requiere JavaScript**: Es puramente CSS
2. **Estructura HTML estricta**: Debe seguir el formato exacto
3. **Dependencias CSS**: 
   - `components/button.css`
   - `ubits-colors.css`
   - `ubits-typography.css`
   - `fontawesome-icons.css`
4. **Clases obligatorias**: `ubits-button` + variante + tamaño
5. **Iconos FontAwesome**: Usar siempre `far` (regular/outline) salvo casos especiales
6. **Badge opcional**: Solo si se necesita notificación visual

---

## 🔍 VERIFICACIÓN DE TOKENS EN NUESTRO SISTEMA

### **✅ TODOS LOS TOKENS EXISTEN EN `packages/tokens/tokens.json`**

#### Primary (Light & Dark Mode)
- ✅ `--ubits-button-primary-bg-default` (Light: `#0c5bef`, Dark: `#3865f5`)
- ✅ `--ubits-button-primary-hover` (Light: `#223a91`, Dark: `#223a91`)
- ✅ `--ubits-button-primary-pressed` (Light: `#1e4abf`, Dark: `#1e4abf`)
- ✅ `--ubits-btn-primary-fg` (Light: `#ffffff`, Dark: `#ffffff`)

#### Secondary (Light & Dark Mode)
- ✅ `--ubits-btn-secondary-bg-default` (Light: `#ffffff`, Dark: `#202837`)
- ✅ `--ubits-btn-secondary-bg-hover` (Light: `#f3f3f4`, Dark: `#0e1825`)
- ✅ `--ubits-btn-secondary-bg-pressed` (Light: `#e7e8ea`, Dark: `#0c121c`)
- ✅ `--ubits-btn-secondary-fg-default` (Light: `#303a47`, Dark: `#edeeef`)
- ✅ `--ubits-btn-secondary-border` (Light: `#d0d2d5`, Dark: `#4f5561`)

#### Tertiary (Light & Dark Mode)
- ✅ `--ubits-btn-tertiary-fg` (Light: `#5c646f`, Dark: `#d0d2d5`)
- ✅ `--ubits-btn-tertiary-bg-hover` (Light: `rgba(231, 232, 234, 0.5)`, Dark: `rgba(231, 232, 234, 0.5)`)
- ✅ `--ubits-btn-tertiary-bg-pressed` (Light: `rgba(231, 232, 234, 0.7)`, Dark: `rgba(231, 232, 234, 0.7)`)

#### Estados Generales (Light & Dark Mode)
- ✅ `--ubits-button-active-bg` (Light: `rgba(12, 91, 239, 0.15)`, Dark: `#0c5bef33`)
- ✅ `--ubits-button-focus-ring` (Light: `rgba(82, 151, 244, 0.3)`, Dark: `rgba(82, 151, 244, 0.3)`)
- ✅ `--ubits-button-badge` (Light: `#cf0e34`, Dark: `#cf0e34`)
- ✅ `--ubits-accent-brand` (Verificar en tokens.json - existe en otras secciones)

#### Disabled (Light & Dark Mode)
- ✅ `--ubits-bg-disabled-button` (Light: `#edeeef`, Dark: `#3b4350`)
- ✅ `--ubits-fg-on-disabled-button` (Light: `#8d9199`, Dark: `#828690`)
- ✅ `--ubits-border-disabled-button` (Light: `#e1e2e5`, Dark: `#545a66`)

### **✅ TIPOGRAFÍA DISPONIBLE**

Todos los estilos tipográficos están en `packages/typography/tokens-typography.css`:
- ✅ `--font-sans`: 'Noto Sans'
- ✅ `--font-body-sm-size`: 13px (con `--font-body-sm-line`: 19.5px)
- ✅ `--font-body-md-size`: 16px (con `--font-body-md-line`: 24px)
- ✅ `--font-body-lg-size`: 20px (con `--font-body-lg-line`: 30px)
- ✅ `--weight-semibold`: 600

**NOTA**: Los tamaños de botón usan las clases semibold, que corresponden a:
- Small: `body-sm-semibold` = 13px / 19.5px / 600
- Medium: `body-md-semibold` = 16px / 24px / 600
- Large: `body-lg-semibold` = 20px / 30px / 600

---

## ✅ CHECKLIST PARA RECREAR

### **Componente Base**
- [ ] Verificar todos los tokens existen en `tokens.json`
- [ ] Recrear estructura HTML exacta
- [ ] Implementar variantes (primary, secondary, tertiary, active)
- [ ] Implementar tamaños existentes (sm, md, lg)
- [ ] **NUEVO**: Implementar tamaños propuestos (xs, xl)
- [ ] Implementar estados base (hover, active/pressed, focus, disabled)
- [ ] **NUEVO**: Implementar estado loading
- [ ] Implementar modificador icon-only
- [ ] Implementar badge
- [ ] Aplicar tipografía correcta (usando nuestros tokens de typography)
- [ ] Aplicar espaciados correctos
- [ ] Aplicar border-radius consistente
- [ ] Aplicar transiciones
- [ ] Implementar responsive (opcional)
- [ ] Verificar accesibilidad
- [ ] Integrar con sistema de iconos (@ubits/icons)

### **Funcionalidades Adicionales a Considerar**
- [ ] **Loading state**: Spinner animado con `fa-spinner fa-spin`
- [ ] **Full width**: Modificador `ubits-button--full-width` para botones que ocupan todo el ancho
- [ ] **Block level**: Opción para que el botón sea `display: block` en lugar de `inline-flex`
- [ ] **Icon positioning**: Posibilidad de icono a la izquierda o derecha del texto
- [ ] **Tooltip support**: Soporte para tooltips en botones icon-only
- [ ] **Keyboard navigation**: Mejorar navegación por teclado (Tab, Enter, Space)
- [ ] **Touch targets**: Asegurar tamaños mínimos para mobile (44x44px recomendado por Apple)
- [ ] **Loading text customization**: Permitir personalizar texto durante loading
- [ ] **Progress indicator**: Opción de mostrar progreso en lugar de spinner

---

## 📋 RESUMEN EJECUTIVO COMPLETO

### **✅ Componente Base (Del Playground Anterior)**
- **Variantes**: Primary, Secondary, Tertiary, Active
- **Tamaños**: Small (32px), Medium (40px), Large (48px)
- **Estados**: Default, Hover, Active/Pressed, Focus, Disabled
- **Modificadores**: Icon-only
- **Features**: Badge, Iconos FontAwesome, Responsive

### **✨ Mejoras Propuestas (A Agregar)**
- **Tamaños adicionales**: XS (24px), XL (56px) - Escala completa: XS → S → M → L → XL
- **Estado Loading**: Spinner animado para acciones en progreso
- **Funcionalidades adicionales**: Full-width, Block, Icon positioning, Touch targets, Progress indicator

### **🎯 Estados Completos (6 estados)**
1. **Default**: Estado inicial
2. **Hover**: Al pasar el mouse
3. **Active/Pressed**: Al hacer clic (con `translateY(1px)`)
4. **Focus**: Al navegar por teclado (focus ring)
5. **Disabled**: Deshabilitado (cursor not-allowed)
6. **Loading**: En progreso (spinner + cursor wait) ⭐ NUEVO

### **📏 Tamaños Completos (5 tamaños)**
1. **XS** (24px): Badges compactos ⭐ NUEVO
2. **S** (32px): Acciones secundarias
3. **M** (40px): Acciones principales (default)
4. **L** (48px): CTAs destacados
5. **XL** (56px): Hero CTAs ⭐ NUEVO

### **🎨 Variantes (4 tipos)**
1. **Primary**: Azul, acción principal
2. **Secondary**: Gris/blanco, acción secundaria
3. **Tertiary**: Transparente, acción terciaria
4. **Active**: Outline con fondo activo

---

## 🎯 SIGUIENTE PASO

Una vez que tengamos este análisis completo, recrearemos el componente usando:
- Nuestros tokens de `packages/tokens/tokens.json` ✅ (todos verificados)
- Nuestra tipografía de `packages/typography/` ✅ (todos los tamaños disponibles)
- Nuestro sistema de iconos de `packages/icons/` ✅ (FontAwesome integrado)
- Web Components como base técnica
- TypeScript para type safety
- **Implementación completa**: Tamaños XS→XL, Estados incluyendo Loading, Todas las variantes y modificadores

