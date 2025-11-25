# ESTRUCTURA COMPLETA DEL INDEX.HTML - BACKUP DETALLADO

> **Nota:** Este documento contiene la estructura completa y detallada del archivo `index.html` actual. No se encontró una versión anterior en el repositorio de GitHub `elkingarcia22/Autorun` en la ruta `packages/proyecto-app/tokens/index.html`.

---

## 1. ESTRUCTURA HTML BÁSICA

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>autorun</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,..." />
    <style>
      /* CSS completo inline */
    </style>
  </head>
  <body>
    <div class="loading-overlay" id="loading-overlay"></div>
    <main class="main-content">
      <!-- Secciones aquí -->
    </main>
    <script>
      /* JavaScript completo inline */
    </script>
  </body>
</html>
```

**Total de líneas:** 2220

---

## 2. HEAD - CONFIGURACIÓN Y METADATOS

### 2.1 Meta Tags (líneas 4-6)
- `<meta charset="utf-8" />`
- `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- `<title>autorun</title>`

### 2.2 Favicon (línea 7)
- Icono SVG inline codificado en base64
- Diseño futurista con rectángulo amarillo neón y pines
- Filtro de glow aplicado

---

## 3. SISTEMA DE ESTILOS CSS (líneas 8-1819)

### 3.1 Variables CSS (Root) - Líneas 13-84

#### Colores Base:
```css
--autorun-bg-black: #000000
--autorun-bg-dark: #0a0a0a
--autorun-bg-darker: #050505
```

#### Escala de Grises (100-900):
```css
--autorun-gray-100: #1a1a1a
--autorun-gray-200: #2a2a2a
--autorun-gray-300: #3a3a3a
--autorun-gray-400: #4a4a4a
--autorun-gray-500: #5a5a5a
--autorun-gray-600: #6a6a6a
--autorun-gray-700: #7a7a7a
--autorun-gray-800: #8a8a8a
--autorun-gray-900: #9a9a9a
```

#### Colores Neón:
- **Amarillo:** `#ffff00` (con variantes glow, bright, dim)
- **Azul:** `#00bfff` y `#0066ff` (con variantes)
- **Blanco:** `#ffffff` (con variantes)
- **Cyan:** `#00ffff` (con variantes)
- **Verde:** `#39ff14` (con variantes)

#### Gradientes:
- `--autorun-gradient-yellow`: linear-gradient(135deg, #ffff00 0%, #ffd700 100%)
- `--autorun-gradient-blue`: linear-gradient(135deg, #00bfff 0%, #0066ff 100%)
- `--autorun-gradient-transition`: linear-gradient(90deg, #ffff00 0%, #ffffff 50%, #00bfff 100%)
- `--autorun-gradient-rainbow`: linear-gradient(135deg, #ffff00 0%, #ffffff 50%, #00bfff 100%)

#### Efectos de Brillo:
- `--autorun-glow-yellow`: box-shadow con amarillo
- `--autorun-glow-blue`: box-shadow con azul
- `--autorun-glow-white`: box-shadow con blanco

#### Líneas Sutiles:
- `--autorun-line-color: rgba(255, 255, 255, 0.03)`
- `--autorun-line-color-bright: rgba(255, 255, 255, 0.05)`

### 3.2 Reset y Base (líneas 86-110)
- Reset universal (`*`) con margin, padding, box-sizing
- Configuración de `html, body` (width, height, overflow, font-family)
- Estado de carga (`body.loading`) con overflow: hidden
- Patrón de líneas horizontales sutiles en `body::before`

### 3.3 Loading Overlay (líneas 138-186)
**Clase principal:** `.loading-overlay`

- Velo negro fijo que cubre toda la pantalla
- `z-index: 999` (detrás del hero-visual)
- Transición de opacidad de 1s ease-out
- Clase `.fade-out` para desvanecimiento
- Control de visibilidad del hero-visual durante carga
- Ocultación de otros elementos del hero inicialmente (`.hero-logo`, `.hero-content`, `.scroll-indicator`)

### 3.4 Hero Section (líneas 319-661)
**Clase principal:** `.hero-section`

#### Componentes:
- `.main-content` - Contenedor principal (min-height: 100vh, z-index: 1002)
- `.hero-section` - Sección hero completa (min-height: 100vh, flex column, padding: 60px 40px 80px)
- `.hero-background` - Fondo con efectos (position: absolute, z-index: 0)
  - `.grid-pattern` - Patrón de cuadrícula (background-image con líneas, opacity: 0.3)
  - `.glow-orb` (`.orb-1`, `.orb-2`) - Orbes brillantes animados (filter: blur(60px), animation: float-orb)
- `.hero-logo` - Logo centrado arriba (opacity: 0 inicialmente, transition)
  - `.logo-text` - Texto "AUTORUN" (font-size: 28px, letter-spacing: 4px)
  - `.logo-chip` - Chip con animación pulse (24x24px, border amarillo)
- `.hero-visual` - Visualización del hub (z-index: 1001, visible desde inicio)
- `.hero-content` - Contenido de texto (max-width: 800px, text-align: center)
  - `.hero-chip` - Chip informativo (opcional, no presente en HTML actual)
  - `.hero-title` - Título principal (opcional, no presente en HTML actual)
  - `.hero-subtitle` - Subtítulo (font-size: 20px, opacity: 0 inicialmente)
- `.hero-actions-centered` - Botones de acción (opcional, no presente en HTML actual)
  - `.btn-primary` - Botón primario (border amarillo, hover con background amarillo)
  - `.btn-secondary` - Botón secundario (border blanco, hover con background blanco)
- `.scroll-indicator` - Indicador de scroll (opacity: 0 inicialmente, margin-top: 40px)
  - `.scroll-mouse` - Icono de mouse animado (animation: scroll-mouse-move)

### 3.5 Hub Visual (líneas 663-1542)
**Clase principal:** `.hub-visual`

#### Componentes del Hub:

**Chip Central:**
- `.hub-chip` - Chip central (140x140px, position: absolute, centered, z-index: 10)
  - `.hub-chip-text` - Texto "HUB" (font-size: 32px, font-weight: 700, letter-spacing: 4px)
  - `.hub-chip-corner` - Puntos en las esquinas (4 elementos, 8x8px, border-radius: 50%)
  - Animación: `chip-pulse` (3s ease-in-out infinite)

**Pines:**
- `.hub-pin` - Pines del chip (background: gray-400, border: gray-500)
  - `.hub-pin-top` - Pines superiores (3 elementos, 4x12px, top: -12px)
  - `.hub-pin-bottom` - Pines inferiores (3 elementos, 4x12px, bottom: -12px)
  - `.hub-pin-left` - Pines izquierdos (3 elementos, 12x4px, left: -12px)
  - `.hub-pin-right` - Pines derechos (3 elementos, 12x4px, right: -12px)

**Trazas:**
- `.hub-trace` - Trazas de circuito (background: neon-yellow/blue, animation: trace-pulse)
  - `.hub-trace-top` - Trazas superiores (3 elementos, 2x60px, top: -72px)
  - `.hub-trace-bottom` - Trazas inferiores (3 elementos, 2x60px, bottom: -72px)
  - `.hub-trace-left` - Trazas izquierdas (3 elementos, 60x2px, left: -72px)
  - `.hub-trace-right` - Trazas derechas (3 elementos, 60x2px, right: -72px, background: blue)

**Puntos de Conexión:**
- `.hub-connection-point` - Puntos de conexión (12x12px, border-radius: 50%, animation: point-pulse)
  - `.hub-connection-point-top` - Puntos superiores (3 elementos, top: -132px, border-color: yellow)
  - `.hub-connection-point-bottom` - Puntos inferiores (3 elementos, bottom: -132px, border-color: yellow)
  - `.hub-connection-point-left` - Puntos izquierdos (3 elementos, left: -132px, border-color: yellow)
  - `.hub-connection-point-right` - Puntos derechos (3 elementos, right: -132px, border-color: blue)

**Líneas Animadas de Conexión:**
- `.hub-connection-line` - Líneas animadas (position: absolute, z-index: 1, detrás del hub)
  - `.hub-connection-line-top` - 13 líneas superiores (intercaladas amarillo/azul, diferentes longitudes)
  - `.hub-connection-line-bottom` - 13 líneas inferiores (intercaladas amarillo/azul, diferentes longitudes)
  - `.hub-connection-line-left` - 13 líneas izquierdas (intercaladas amarillo/azul, diferentes longitudes)
  - `.hub-connection-line-right` - 13 líneas derechas (intercaladas amarillo/azul, diferentes longitudes)

**Total de líneas:** 52 líneas (13 por dirección)

**Animaciones del Hub:**
- `@keyframes chip-pulse` - Pulso del chip central (3s)
- `@keyframes trace-pulse` - Pulso de las trazas (2s)
- `@keyframes point-pulse` - Pulso de los puntos de conexión (2s)
- `@keyframes connect-line-top` - Animación de líneas superiores (3s, cubic-bezier)
- `@keyframes connect-line-bottom` - Animación de líneas inferiores (3s, cubic-bezier)
- `@keyframes connect-line-left` - Animación de líneas izquierdas (3s, cubic-bezier)
- `@keyframes connect-line-right` - Animación de líneas derechas (3s, cubic-bezier)
- `@keyframes text-glow` - Efecto de brillo en texto (1s)

### 3.6 Features Section (líneas 1544-1818)
**Clase principal:** `.features-section`

#### Componentes:
- `.section-header` - Encabezado de sección (text-align: center, margin-bottom: 100px)
  - `.section-chip` - Chip con etiqueta (padding: 8px 20px, border-radius: 24px, background: rgba(0, 102, 255, 0.15))
  - `.section-title` - Título de sección (font-size: 56px, font-weight: 700, margin-bottom: 24px)
  - `.section-subtitle` - Subtítulo de sección (font-size: 20px, opacity: 0.8, max-width: 600px)
- `.features-grid` - Grid de características (display: grid, grid-template-columns: repeat(3, 1fr), gap: 32px)
- `.feature-card` - Tarjeta de característica (padding: 48px 40px, background: gray-100, border-radius: 12px)
  - `.feature-icon` - Contenedor de icono (margin-bottom: 32px)
    - `.icon-chip` - Chip con icono SVG (80x80px, border: 2px solid yellow, border-radius: 12px)
  - `.feature-title` - Título de característica (font-size: 28px, font-weight: 700, margin-bottom: 16px)
  - `.feature-description` - Descripción de característica (font-size: 16px, color: gray-700, opacity: 0.9)

#### Animaciones:
- `@keyframes header-assemble` - Ensamblado del header (0.8s, cubic-bezier)
- `@keyframes chip-pop` - Pop del chip (0.5s, cubic-bezier con bounce)
- `@keyframes title-slide` - Deslizamiento del título (0.6s)
- `@keyframes subtitle-slide` - Deslizamiento del subtítulo (0.6s)
- `@keyframes card-assemble` - Ensamblado de tarjetas (0.8s, cubic-bezier con rotateX)
- `@keyframes icon-assemble` - Ensamblado de iconos (0.6s, cubic-bezier con bounce)

---

## 4. ESTRUCTURA HTML DEL BODY (líneas 1821-2100)

### 4.1 Loading Overlay
```html
<div class="loading-overlay" id="loading-overlay"></div>
```

### 4.2 Main Content
```html
<main class="main-content">
  <!-- Secciones aquí -->
</main>
```

### 4.3 Hero Section (id="home") - Líneas 1829-1968
**Estructura completa:**

```html
<section id="home" class="hero-section">
  <!-- Fondo -->
  <div class="hero-background">
    <div class="grid-pattern"></div>
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
  </div>
  
  <!-- Logo Centrado Arriba -->
  <div class="hero-logo">
    <span class="logo-text">AUTORUN</span>
    <span class="logo-chip"></span>
  </div>
  
  <!-- Hub Visual -->
  <div class="hero-visual">
    <div class="hub-visual">
      <!-- Chip Central con HUB -->
      <div class="hub-chip">
        <div class="hub-chip-corner"></div> <!-- x4 -->
        <div class="hub-chip-text" id="hub-chip-text">HUB</div>
      </div>
      
      <!-- 13 Líneas superiores -->
      <div class="hub-connection-line hub-connection-line-top"></div> <!-- x13 -->
      
      <!-- 13 Líneas inferiores -->
      <div class="hub-connection-line hub-connection-line-bottom"></div> <!-- x13 -->
      
      <!-- 13 Líneas izquierdas -->
      <div class="hub-connection-line hub-connection-line-left"></div> <!-- x13 -->
      
      <!-- 13 Líneas derechas -->
      <div class="hub-connection-line hub-connection-line-right"></div> <!-- x13 -->
      
      <!-- Pines izquierdos -->
      <div class="hub-pin hub-pin-left"></div> <!-- x3 -->
      
      <!-- Pines derechos -->
      <div class="hub-pin hub-pin-right"></div> <!-- x3 -->
      
      <!-- Trazas izquierdas -->
      <div class="hub-trace hub-trace-left"></div> <!-- x3 -->
      
      <!-- Trazas derechas -->
      <div class="hub-trace hub-trace-right"></div> <!-- x3 -->
      
      <!-- Puntos de conexión izquierdos -->
      <div class="hub-connection-point hub-connection-point-left"></div> <!-- x3 -->
      
      <!-- Puntos de conexión derechos -->
      <div class="hub-connection-point hub-connection-point-right"></div> <!-- x3 -->
    </div>
  </div>
  
  <!-- Contenido de texto -->
  <div class="hero-content">
    <p class="hero-subtitle">
      El hub central que une todas tus herramientas en un solo lugar.
      Construye, conecta y potencia tu flujo de trabajo.
    </p>
  </div>
  
  <!-- Icono de Scroll Animado -->
  <div class="scroll-indicator">
    <div class="scroll-mouse">
      <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Mouse -->
        <rect x="8" y="4" width="16" height="24" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="16" cy="12" r="2" fill="currentColor"/>
        <!-- Línea -->
        <line x1="16" y1="28" x2="16" y2="40" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="16" cy="40" r="2" fill="currentColor"/>
      </svg>
    </div>
  </div>
</section>
```

### 4.4 Features Section (id="features") - Líneas 1971-2032
```html
<section id="features" class="features-section">
  <div class="section-header" data-scroll="fade-up">
    <div class="section-chip">
      <span>FEATURES</span>
    </div>
    <h2 class="section-title">Construye tu Hub</h2>
    <p class="section-subtitle">
      Cada herramienta se conecta, cada conexión potencia tu trabajo
    </p>
  </div>
  
  <div class="features-grid">
    <!-- Feature Card 1: Conexión Instantánea -->
    <div class="feature-card" data-scroll="fade-up" data-delay="0.1">
      <div class="feature-icon">
        <div class="icon-chip">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Plug eléctrico -->
            <rect x="12" y="10" width="10" height="14" rx="1.5" stroke="currentColor" stroke-width="2" fill="none"/>
            <line x1="14" y1="8" x2="14" y2="10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="20" y1="8" x2="20" y2="10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="16" y1="24" x2="18" y2="26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      <h3 class="feature-title">Conexión Instantánea</h3>
      <p class="feature-description">
        Conecta herramientas en segundos. Sin configuración compleja.
      </p>
    </div>
    
    <!-- Feature Card 2: Potencia Total -->
    <div class="feature-card" data-scroll="fade-up" data-delay="0.2">
      <div class="feature-icon">
        <div class="icon-chip">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Lightning bolt -->
            <path d="M18 4L10 18H16L14 28L22 14H16L18 4Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <h3 class="feature-title">Potencia Total</h3>
      <p class="feature-description">
        Todas tus herramientas trabajando juntas en perfecta sincronía.
      </p>
    </div>
    
    <!-- Feature Card 3: Hub Central -->
    <div class="feature-card" data-scroll="fade-up" data-delay="0.3">
      <div class="feature-icon">
        <div class="icon-chip">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Globe -->
            <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="2" fill="none"/>
            <ellipse cx="16" cy="16" rx="12" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
            <ellipse cx="16" cy="16" rx="4" ry="12" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
            <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
            <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
          </svg>
        </div>
      </div>
      <h3 class="feature-title">Hub Central</h3>
      <p class="feature-description">
        Un punto central que conecta todo. Simple, poderoso, eficiente.
      </p>
    </div>
  </div>
</section>
```

### 4.5 Addons Section (id="addons") - Líneas 2034-2066
```html
<section id="addons" class="features-section">
  <div class="section-header" data-scroll="fade-up">
    <div class="section-chip">
      <span>ADDONS</span>
    </div>
    <h2 class="section-title">Extiende tu Hub</h2>
    <p class="section-subtitle">
      Amplía las capacidades de tu hub con complementos poderosos
    </p>
  </div>
  
  <div class="features-grid">
    <!-- Feature Card: Addons Disponibles -->
    <div class="feature-card" data-scroll="fade-up" data-delay="0.1">
      <div class="feature-icon">
        <div class="icon-chip">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Puzzle/Addon icon -->
            <path d="M8 8H12V12H8V8Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M20 8H24V12H20V8Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M8 20H12V24H8V20Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M20 20H24V24H20V20Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M12 12H20V20H12V12Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="16" cy="16" r="2" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <h3 class="feature-title">Addons Disponibles</h3>
      <p class="feature-description">
        Descubre una amplia gama de complementos para potenciar tu flujo de trabajo.
      </p>
    </div>
  </div>
</section>
```

### 4.6 Conectar Hub Section (id="conectar") - Líneas 2068-2099
```html
<section id="conectar" class="features-section">
  <div class="section-header" data-scroll="fade-up">
    <div class="section-chip">
      <span>CONECTAR</span>
    </div>
    <h2 class="section-title">Conecta tu Hub</h2>
    <p class="section-subtitle">
      Comienza a conectar tus herramientas ahora mismo
    </p>
  </div>
  
  <div class="features-grid">
    <!-- Feature Card: Comenzar Ahora -->
    <div class="feature-card" data-scroll="fade-up" data-delay="0.1">
      <div class="feature-icon">
        <div class="icon-chip">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Rocket/Launch icon -->
            <path d="M16 4L20 12L16 10L12 12L16 4Z" fill="currentColor"/>
            <rect x="14" y="10" width="4" height="12" rx="2" fill="currentColor"/>
            <path d="M10 22L16 26L22 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="20" r="1" fill="currentColor"/>
            <circle cx="20" cy="20" r="1" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <h3 class="feature-title">Comenzar Ahora</h3>
      <p class="feature-description">
        Conecta tu primer hub y transforma tu forma de trabajar.
      </p>
    </div>
  </div>
</section>
```

---

## 5. JAVASCRIPT - FUNCIONALIDADES (líneas 2102-2218)

### 5.1 Loading y Animaciones Iniciales (líneas 2103-2150)
- Bloqueo de scroll durante carga (`document.body.classList.add('loading')`)
- Asegurar visibilidad del hero-visual desde el inicio
- Desvanecimiento del velo negro después de 1.5 segundos
- Mostrar elementos del hero después del fade-out (logo, contenido, scroll indicator)
- Permitir scroll después de que se desvanezca el velo

### 5.2 Scroll Animations (líneas 2152-2188)
- Intersection Observer para animaciones al hacer scroll
- Configuración: `threshold: 0.1`, `rootMargin: '0px 0px -100px 0px'`
- Tipos de animación:
  - `fade-up` - Desvanecimiento hacia arriba (por defecto)
  - `build-grid` - Construcción de grid
  - `build-hub` - Construcción de hub
- Delays configurables con `data-delay` (en segundos)
- Observar todos los elementos con `data-scroll`

### 5.3 Smooth Scroll (líneas 2191-2217)
- Navegación suave a secciones con `scrollIntoView({ behavior: 'smooth' })`
- Click en indicador de scroll para ir a features section
- Prevenir comportamiento por defecto en enlaces internos

---

## 6. ICONOS SVG INCLUIDOS

### 6.1 Iconos de Features:
1. **Plug eléctrico** - Conexión Instantánea (rectángulo con dos pines superiores y línea inferior)
2. **Lightning bolt** - Potencia Total (rayo en forma de Z)
3. **Globe** - Hub Central (círculo con elipses y líneas de latitud/longitud)

### 6.2 Iconos de Addons:
1. **Puzzle/Addon** - Addons Disponibles (cuatro cuadrados en esquinas con cuadrado central y punto)

### 6.3 Iconos de Conectar:
1. **Rocket/Launch** - Comenzar Ahora (cohete con punta triangular, cuerpo rectangular y base con círculos)

### 6.4 Otros:
- **Mouse scroll** - Indicador de scroll (rectángulo redondeado con círculo interno y línea con punto inferior)

---

## 7. ATRIBUTOS DATA Y CONFIGURACIÓN

### 7.1 Data Attributes:
- `data-scroll="fade-up"` - Tipo de animación al hacer scroll
- `data-delay="0.1"` - Delay en segundos para animación (0.1, 0.2, 0.3)

### 7.2 IDs Importantes:
- `loading-overlay` - Overlay de carga
- `hub-chip-text` - Texto del chip central (para cambios dinámicos)
- `home`, `features`, `addons`, `conectar` - IDs de secciones para navegación

---

## 8. ANIMACIONES Y TRANSICIONES

### 8.1 Animaciones CSS Keyframes:
- `pulse-chip` - Pulso del chip del logo (2s ease-in-out infinite)
- `float-orb` - Flotación de orbes (8s ease-in-out infinite)
- `scroll-mouse-move` - Movimiento del mouse (2s ease-in-out infinite)
- `scroll-line-extend` - Extensión de línea del mouse (2s ease-in-out infinite)
- `chip-pulse` - Pulso del hub chip (3s ease-in-out infinite)
- `trace-pulse` - Pulso de trazas (2s ease-in-out infinite)
- `point-pulse` - Pulso de puntos (2s ease-in-out infinite)
- `connect-line-top` - Conexión de líneas superiores (3s cubic-bezier infinite)
- `connect-line-bottom` - Conexión de líneas inferiores (3s cubic-bezier infinite)
- `connect-line-left` - Conexión de líneas izquierdas (3s cubic-bezier infinite)
- `connect-line-right` - Conexión de líneas derechas (3s cubic-bezier infinite)
- `text-glow` - Efecto de brillo en texto (1s ease-in-out)
- `header-assemble` - Ensamblado del header (0.8s cubic-bezier)
- `chip-pop` - Pop del chip (0.5s cubic-bezier con bounce)
- `title-slide` - Deslizamiento del título (0.6s ease)
- `subtitle-slide` - Deslizamiento del subtítulo (0.6s ease)
- `card-assemble` - Ensamblado de tarjeta (0.8s cubic-bezier con rotateX)
- `icon-assemble` - Ensamblado de icono (0.6s cubic-bezier con bounce)

### 8.2 Transiciones:
- Todas las transiciones usan `cubic-bezier` para efectos suaves
- Duración típica: 0.3s - 0.8s
- Efectos hover en múltiples elementos (cards, buttons, connection points)
- Transiciones de opacidad y transform para animaciones de entrada

---

## 9. RESPONSIVE Y MEDIA QUERIES

**Nota:** El archivo actual no incluye media queries específicas, pero el diseño está preparado para ser responsive con:
- `max-width` en contenedores (1400px para main-content, 1200px para features-section, 800px para hero-content)
- `flexbox` y `grid` para layouts adaptativos
- Viewport meta tag configurado (`width=device-width, initial-scale=1`)
- Padding y márgenes relativos

---

## 10. ESTRUCTURA DE ARCHIVOS RELACIONADOS

Según el directorio, existen archivos relacionados:
- `SECCION_ADDONS.md` - Documentación de la sección de addons
- `SECCION_CONECTAR.md` - Documentación de la sección de conectar
- `SECCION_FEATURES.md` - Documentación de la sección de features
- `SECCION_HOME.md` - Documentación de la sección home

---

## RESUMEN DE ELEMENTOS PRINCIPALES

### Total de Líneas: 2220

### Secciones HTML:
1. **Hero Section** (id="home") - Sección principal con hub visual
2. **Features Section** (id="features") - Sección de características (3 cards)
3. **Addons Section** (id="addons") - Sección de complementos (1 card)
4. **Conectar Section** (id="conectar") - Sección de conexión (1 card)

### Componentes Visuales Principales:
- **Hub Visual** con 52 líneas de conexión animadas (13 por dirección: top, bottom, left, right)
- **3 pines** por lado del hub (top, bottom, left, right = 12 pines totales)
- **3 trazas** por lado (top, bottom, left, right = 12 trazas totales)
- **3 puntos de conexión** por lado (top, bottom, left, right = 12 puntos totales)
- **Chip central** con texto "HUB" y 4 puntos en las esquinas
- **Grid pattern** de fondo con líneas sutiles
- **2 orbes brillantes** animados (orb-1 amarillo, orb-2 azul)

### Paleta de Colores:
- **Fondo:** Negro profundo (#000000)
- **Acentos:** Amarillo neón (#ffff00) y Azul neón (#00bfff, #0066ff)
- **Texto:** Blanco (#ffffff) con variaciones de opacidad
- **Grises:** Escala de 100-900 (#1a1a1a a #9a9a9a)

### Tipografía:
- **Fuente principal:** 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Tamaños:** 12px (chips) - 72px (títulos grandes, no presente en HTML actual)
- **Pesos:** 300 (light) - 700 (bold)
- **Letter-spacing:** 0.5px - 4px

### Z-Index Hierarchy:
- `body::before` (patrón de líneas): z-index: 1
- `.loading-overlay`: z-index: 999
- `.hero-visual`: z-index: 1001
- `.main-content` y `.hero-section`: z-index: 1002
- `.hub-chip`: z-index: 10 (dentro del hero-visual)
- `.hub-connection-line`: z-index: 1 (detrás del hub)

---

## NOTAS IMPORTANTES

1. **No se encontró versión anterior en GitHub:** El archivo `index.html` no está presente en el repositorio `elkingarcia22/Autorun` en la ruta `packages/proyecto-app/tokens/index.html`. El repositorio tiene una estructura diferente (`packages/tokens/` en lugar de `packages/proyecto-app/tokens/`).

2. **Este documento refleja la versión actual:** Toda la información en este documento corresponde al archivo `index.html` actual en el sistema de archivos local.

3. **Estructura completa:** El documento incluye todos los detalles de CSS, HTML y JavaScript presentes en el archivo actual.

---

**Documento generado:** Backup completo y detallado de la estructura del index.html  
**Fecha:** Estructura actual del archivo index.html (2220 líneas)  
**Ubicación:** `/Users/elkinmac/Desktop/Autoframe/packages/proyecto-app/tokens/index.html`
