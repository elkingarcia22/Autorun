# Análisis Completo del Componente SubNav

## 📋 Descripción General
Componente de navegación superior horizontal que muestra sub-navegaciones de los módulos principales del sidebar. Es una barra de navegación con pestañas (tabs) que permite navegar entre diferentes secciones de un módulo.

## 🎨 Estructura HTML

```html
<nav class="sub-nav" data-variant="template">
  <div class="nav-tabs">
    <!-- Título opcional (solo en variante documentacion) -->
    <div class="nav-title">DOCUMENTACIÓN</div>
    
    <!-- Pestañas de navegación -->
    <button class="nav-tab active" data-tab="section1">
      <i class="far fa-home"></i>
      <span>Inicio</span>
    </button>
    <button class="nav-tab" data-tab="section2">
      <i class="far fa-book"></i>
      <span>Sección 2</span>
    </button>
  </div>
  
  <!-- Contenedor derecho (solo en variante documentacion para hamburger) -->
  <div class="nav-right">
    <button class="hamburger-menu">
      <i class="far fa-bars"></i>
    </button>
    <div class="hamburger-dropdown">
      <button class="hamburger-item active" data-tab="section1">
        <i class="far fa-home"></i>
        <span>Inicio</span>
      </button>
    </div>
  </div>
</nav>
```

## 🎨 Variantes

El componente tiene múltiples variantes predefinidas:

1. **template**: Plantilla genérica personalizable
2. **documentacion**: Variante para documentación (con título y hamburger menu en móvil)
3. **aprendizaje**: Módulo de aprendizaje
4. **desempeno**: Módulo de desempeño
5. **encuestas**: Módulo de encuestas
6. **tareas**: Módulo de tareas
7. **empresa**: Módulo de empresa
8. **admin-aprendizaje**: Admin - Aprendizaje
9. **admin-desempeño**: Admin - Desempeño

## 🎨 Estilos y Tokens

### Contenedor Principal (`.sub-nav`)
- **Background**: `var(--ubits-bg-1)`
- **Height**: `40px` (desktop) / `36px` (móvil)
- **Border radius**: `8px`
- **Padding**: `0 12px` (desktop) / `0 8px` (móvil)
- **Box shadow**: `0 1px 3px rgba(0, 0, 0, 0.1)` (light) / `0 1px 3px rgba(0, 0, 0, 0.3)` (dark)
- **Display**: `flex`
- **Align items**: `center`
- **Justify content**: `space-between`
- **Width**: `calc(100% - 24px)`
- **Max width**: `calc(100% - 24px)`
- **Position**: `relative`

### Contenedor de Tabs (`.nav-tabs`)
- **Display**: `flex`
- **Gap**: `8px`
- **Align items**: `center`
- **Height**: `100%`
- **Flex**: `1`

### Título (`.nav-title`) - Solo en variante documentacion
- **Font family**: `'Noto Sans', sans-serif`
- **Font weight**: `600`
- **Font size**: `16px` (desktop) / `14px` (móvil)
- **Line height**: `24px` (desktop) / `20px` (móvil)
- **Color**: `var(--ubits-accent-brand)`
- **White space**: `nowrap`
- **Flex shrink**: `0`

### Pestañas (`.nav-tab`)
- **Background**: `none` / `transparent`
- **Border**: `none`
- **Padding**: `8px` (desktop) / `6px` (móvil)
- **Cursor**: `pointer`
- **Display**: `flex`
- **Flex direction**: `row`
- **Gap**: `8px`
- **Align items**: `center`
- **Position**: `relative`
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Overflow**: `hidden`
- **Border radius**: `0` (base) / `6px` (hover)

#### Icono del Tab (`.nav-tab i`)
- **Font size**: `16px` (desktop) / `14px` (móvil)
- **Width**: `16px` (desktop) / `14px` (móvil)
- **Height**: `16px` (desktop) / `14px` (móvil)
- **Color**: `var(--ubits-fg-1-medium)` (default) / `var(--ubits-fg-1-high)` (hover/active)
- **Display**: `flex`
- **Align items**: `center`
- **Justify content**: `center`
- **Flex shrink**: `0`
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

#### Texto del Tab (`.nav-tab span`)
- **Font family**: `'Noto Sans', sans-serif`
- **Font size**: `16px` (desktop) / `14px` (móvil)
- **Line height**: `24px` (desktop) / `20px` (móvil)
- **Color**: `var(--ubits-fg-1-medium)` (default) / `var(--ubits-fg-1-high)` (hover/active)
- **Font weight**: `400` (default) / `600` (active)
- **White space**: `nowrap`
- **Text align**: `left`

### Estado Hover (`.nav-tab:hover`)
- **Background**: `var(--ubits-bg-2)`
- **Border radius**: `6px`
- **Icon color**: `var(--ubits-fg-1-high)`
- **Text color**: `var(--ubits-fg-1-high)`

### Estado Active (`.nav-tab.active`)
- **Background**: `transparent`
- **Font weight** (text): `600`
- **Icon color**: `var(--ubits-fg-1-high)`
- **Text color**: `var(--ubits-fg-1-high)`

#### Indicador Active (`.nav-tab.active::after`)
- **Content**: `''`
- **Position**: `absolute`
- **Bottom**: `0`
- **Left**: `0`
- **Right**: `0`
- **Height**: `3px`
- **Background**: `var(--ubits-accent-brand)`
- **Border radius**: `2px`

### Hamburger Menu (`.hamburger-menu`)
- **Display**: `none` (desktop) / `flex` (móvil, solo variante documentacion)
- **Background**: `none`
- **Border**: `none`
- **Padding**: `8px`
- **Cursor**: `pointer`
- **Align items**: `center`
- **Justify content**: `center`
- **Color**: `var(--ubits-fg-1-medium)`
- **Transition**: `color 0.3s ease`

#### Icono Hamburger (`.hamburger-menu i`)
- **Font size**: `18px`

#### Estado Hover (`.hamburger-menu:hover`)
- **Color**: `var(--ubits-fg-1-high)`

### Hamburger Dropdown (`.hamburger-dropdown`)
- **Position**: `absolute`
- **Top**: `100%`
- **Left**: `0`
- **Right**: `0`
- **Width**: `100%`
- **Background**: `var(--ubits-bg-1)`
- **Border**: `1px solid var(--ubits-border-1)`
- **Border radius**: `0 0 8px 8px` (desktop) / `0 0 6px 6px` (móvil)
- **Box shadow**: `0 4px 12px rgba(0, 0, 0, 0.15)` (light) / `0 4px 12px rgba(0, 0, 0, 0.4)` (dark)
- **Z-index**: `1000`
- **Display**: `none` (default) / `flex` (con clase `.show`)
- **Flex direction**: `column`
- **Padding**: `8px 0`
- **Margin top**: `4px`

### Hamburger Items (`.hamburger-item`)
- **Background**: `none` / `var(--ubits-bg-2)` (hover) / `var(--ubits-bg-active)` (active)
- **Border**: `none`
- **Padding**: `12px 16px`
- **Cursor**: `pointer`
- **Display**: `flex`
- **Align items**: `center`
- **Gap**: `12px`
- **Width**: `100%`
- **Text align**: `left`
- **Transition**: `background-color 0.2s ease`
- **Color**: `var(--ubits-fg-1-medium)` (default) / `var(--ubits-fg-1-high)` (hover) / `var(--ubits-accent-brand)` (active)
- **Font weight**: `400` (default) / `600` (active)

#### Icono Hamburger Item (`.hamburger-item i`)
- **Font size**: `16px`
- **Width**: `16px`
- **Height**: `16px`
- **Display**: `flex`
- **Align items**: `center`
- **Justify content**: `center`
- **Flex shrink**: `0`
- **Color**: `var(--ubits-fg-1-medium)` (default) / `var(--ubits-fg-1-high)` (hover) / `var(--ubits-accent-brand)` (active)

#### Texto Hamburger Item (`.hamburger-item span`)
- **Font family**: `'Noto Sans', sans-serif`
- **Font size**: `14px`
- **Line height**: `20px`
- **White space**: `nowrap`
- **Color**: Heredado del contenedor

## 🎯 Estados

1. **Default**: Tab no activo, color medio
2. **Hover**: Background `bg-2`, colores `fg-1-high`
3. **Active**: Font weight `600`, indicador inferior de `3px` en color brand
4. **Focus**: (implícito en navegación con teclado)

## 📐 Responsive Design

### Desktop (≥ 841px)
- **Height**: `40px`
- **Padding**: `0 12px`
- **Font sizes**: `16px` (tabs), `16px` (iconos)
- **Hamburger menu**: Oculto (`display: none`)
- **Tabs normales**: Visibles

### Tablet/Móvil (≤ 950px)
- **Height**: `36px`
- **Padding**: `0 8px`
- **Font sizes**: `14px` (tabs), `14px` (iconos)
- **Título**: Font size `14px`, line height `20px`

### Móvil Específico (≤ 1023px)
- **Oculto**: Todas las variantes EXCEPTO `documentacion` (`display: none`)
- **Variante documentacion**: 
  - Hamburger menu visible
  - Tabs normales ocultos en móvil
  - Tabs visibles en desktop (≥ 841px)

## 🔧 Funcionalidades

1. **Navegación por Tabs**: Click en tab cambia el estado activo
2. **Navegación por URL**: Si el tab tiene URL, navega a esa página
3. **Eventos Customizados**: Dispara `topNavTabClick` si no hay URL
4. **Hamburger Menu** (solo variante documentacion):
   - Toggle dropdown al hacer click
   - Cerrar al hacer click fuera
   - Sincronizar estado activo entre tabs normales y hamburger items
5. **Activación Automática**: Detecta la página actual y activa el tab correspondiente

## 🎨 Dark Mode

Todos los tokens usan variables CSS que cambian automáticamente con el tema:
- `var(--ubits-bg-1)`, `var(--ubits-bg-2)`, `var(--ubits-bg-active)`
- `var(--ubits-fg-1-medium)`, `var(--ubits-fg-1-high)`
- `var(--ubits-border-1)`
- `var(--ubits-accent-brand)`
- Box shadows más oscuros en dark mode

## 📦 Dependencias

- **FontAwesome**: Para iconos
- **Tokens de color UBITS**: `ubits-colors.css`
- **Typography UBITS**: `ubits-typography.css`
- **Noto Sans**: Fuente principal

## 🔄 Integración con Sidebar

El sub-nav se muestra debajo del sidebar en el layout principal, y cambia según el módulo activo en el sidebar.

## 📝 API JavaScript

### Funciones Principales

1. **`getTopNavHTML(variant, customTabs)`**: Genera HTML del sub-nav
2. **`loadSubNav(containerId, variant, customTabs)`**: Carga el sub-nav en un contenedor
3. **`addTopNavEventListeners(container)`**: Agrega event listeners
4. **`activateCurrentPageTab(container, variant)`**: Activa el tab según la página actual
5. **`getTopNavVariant(variant)`**: Obtiene configuración de una variante
6. **`getAllTopNavVariants()`**: Obtiene todas las variantes

### Eventos

- **`topNavTabClick`**: Disparado cuando se hace click en un tab sin URL
  - `detail.tabId`: ID del tab
  - `detail.tabElement`: Elemento del tab

