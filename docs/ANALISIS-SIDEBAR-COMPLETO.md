# 📋 ANÁLISIS COMPLETO DEL COMPONENTE SIDEBAR UBITS

## 📑 ÍNDICE
1. [Visión General](#visión-general)
2. [Estructura HTML](#estructura-html)
3. [Variantes](#variantes)
4. [Estilos y Tokens](#estilos-y-tokens)
5. [Estados de Botones](#estados-de-botones)
6. [Funcionalidades](#funcionalidades)
7. [Iconos](#iconos)
8. [Modo Admin vs Modo Colaborador](#modo-admin-vs-modo-colaborador)
9. [Tooltips](#tooltips)
10. [Menú de Perfil](#menú-de-perfil)
11. [Dark Mode Toggle](#dark-mode-toggle)
12. [Responsive Design](#responsive-design)
13. [JavaScript API](#javascript-api)
14. [Accesibilidad](#accesibilidad)

---

## 🎯 VISIÓN GENERAL

El componente **Sidebar** es una barra de navegación lateral fija que proporciona acceso rápido a las diferentes secciones de la aplicación UBITS. Es un componente **complejo y grande** que incluye:

- **Dos variantes principales**: `default` (Colaborador) y `admin` (Administrador)
- **Altura dinámica**: Se ajusta automáticamente según la altura de la ventana
- **Posición fija**: Siempre visible en el lado izquierdo de la pantalla
- **Ancho fijo**: 96px (no cambia con el tema)
- **Tema oscuro/claro**: Mismos colores en ambos temas (no cambian)
- **Tooltips**: Muestran el nombre de cada sección al hacer hover
- **Menú de perfil**: Se despliega al hacer hover sobre el avatar
- **Dark mode toggle**: Botón para cambiar entre tema claro y oscuro
- **Estados visuales**: Default, hover, active, pressed, disabled, focus

---

## 🏗️ ESTRUCTURA HTML

### Estructura Principal

```html
<aside class="sidebar" id="sidebar">
  <!-- Contenedor principal (header + body) -->
  <div class="sidebar-main">
    <!-- Header con Logo -->
    <div class="sidebar-header">
      <div class="logo" onclick="window.location.href='index.html'">
        <img src="images/Ubits-logo.svg" alt="UBITS Logo" />
      </div>
    </div>
    
    <!-- Body con Botones de Navegación -->
    <div class="sidebar-body">
      <button class="nav-button" data-section="aprendizaje" data-tooltip="Aprendizaje">
        <i class="far fa-graduation-cap"></i>
      </button>
      <!-- Más botones... -->
    </div>
  </div>
  
  <!-- Footer -->
  <div class="sidebar-footer">
    <!-- Botones del footer (API, Centro de ayuda - solo en admin) -->
    <!-- Dark mode toggle -->
    <button class="nav-button" id="darkmode-toggle" data-tooltip="Modo oscuro">
      <i class="far fa-moon"></i>
    </button>
    
    <!-- Avatar de Usuario -->
    <div class="user-avatar-container">
      <div class="user-avatar" onmouseenter="showSidebarProfileMenu(this)" onmouseleave="hideSidebarProfileMenu()">
        <img src="images/Profile-image.jpg" alt="Usuario" class="avatar-image">
      </div>
    </div>
  </div>
</aside>

<!-- Menú de Perfil (fuera del sidebar, posición absoluta) -->
<div class="sidebar-profile-menu" id="sidebar-profile-menu">
  <!-- Items del menú... -->
</div>
```

### Elementos Clave

- **`.sidebar`**: Contenedor principal, posición fija, ancho 96px
- **`.sidebar-main`**: Contiene header y body, flex column con gap 16px
- **`.sidebar-header`**: Logo UBITS clickeable
- **`.sidebar-body`**: Lista de botones de navegación, flex column con gap 8px
- **`.sidebar-footer`**: Botones adicionales, dark mode toggle y avatar, margin-top: auto
- **`.nav-button`**: Botones individuales de navegación, 40x40px, circular
- **`.user-avatar`**: Avatar circular de usuario, 40x40px
- **`.sidebar-profile-menu`**: Menú desplegable del perfil, posición fija

---

## 🔀 VARIANTES

### 1. Variante `default` (Modo Colaborador)

**Características:**
- **8 botones en el body**:
  1. Administrador (`fa-laptop`)
  2. Aprendizaje (`fa-graduation-cap`)
  3. Diagnóstico (`fa-chart-mixed`)
  4. Desempeño (`fa-bars-progress`)
  5. Encuestas (`fa-clipboard`)
  6. Reclutamiento (`fa-users`)
  7. Tareas (`fa-layer-group`)
  8. UBITS AI (`fa-sparkles`)

- **Footer contiene**:
  - Dark mode toggle
  - Avatar de usuario

- **Menú de perfil incluye**:
  - Ver mi perfil
  - Modo Administrador (permite cambiar a modo admin)
  - Cambio de contraseña
  - Cerrar sesión

### 2. Variante `admin` (Modo Administrador)

**Características:**
- **6 botones en el body**:
  1. Inicio (`fa-house`)
  2. Empresa (`fa-building`)
  3. Aprendizaje (`fa-graduation-cap`)
  4. Diagnóstico (`fa-chart-mixed`)
  5. Desempeño (`fa-bars-progress`)
  6. Encuestas (`fa-clipboard`)

- **Footer contiene**:
  - Botón API (`fa-code`)
  - Botón Centro de ayuda (`fa-circle-question`)
  - Dark mode toggle
  - Avatar de usuario

- **Menú de perfil incluye**:
  - Ver mi perfil
  - Modo colaborador (permite cambiar a modo colaborador)
  - Cambio de contraseña
  - Cerrar sesión

---

## 🎨 ESTILOS Y TOKENS

### Dimensiones

- **Ancho**: `96px` (fijo, no cambia)
- **Altura**: Dinámica (mínimo 578px, se ajusta según altura de ventana)
- **Padding**: `16px 28px` (vertical horizontal)
- **Border radius**: `8px`
- **Posición**: `fixed`, `left: 24px`, `top: 16px` (se ajusta dinámicamente)
- **Z-index**: `10`

### Tokens de Color (NO cambian con tema claro/oscuro)

```css
--ubits-sidebar-bg: #202837;                    /* Fondo del sidebar */
--ubits-sidebar-logo: #ffffff;                  /* Color del logo */
--ubits-sidebar-button-bg-pressed: #3b4350;     /* Fondo botón pressed */
--ubits-sidebar-button-bg-disabled: #3b4350;   /* Fondo botón disabled */
--ubits-sidebar-button-bg-active: #ffffff;      /* Fondo botón active */
--ubits-sidebar-button-fg-default: #d0d2d5;     /* Color texto/icono default */
--ubits-sidebar-button-fg-hover: #edeeef;       /* Color texto/icono hover */
--ubits-sidebar-button-fg-pressed: #edeeef;     /* Color texto/icono pressed */
--ubits-sidebar-button-fg-active: #303a47;      /* Color texto/icono active */
--ubits-sidebar-button-fg-disabled: #828690;    /* Color texto/icono disabled */
```

### Logo

- **Dimensiones**: `24px × 25px`
- **Hover**: 
  - Background: `rgba(255, 255, 255, 0.1)`
  - Transform: `scale(1.05)`
  - Border radius: `6px`
  - Padding: `4px`
  - Transition: `all 0.2s ease`

### Botones de Navegación (`.nav-button`)

- **Dimensiones**: `40px × 40px` (desktop), `36px × 36px` (responsive)
- **Border radius**: `1000px` (completamente circular)
- **Padding**: `8px`
- **Gap interno**: Ninguno (solo icono)

### Iconos de Botones

- **Tamaño**: `16px` (desktop), `14px` (responsive)
- **Dimensiones contenedor**: `24px × 24px` (desktop), `20px × 20px` (responsive)
- **Color**: Usa tokens `--ubits-sidebar-button-fg-*`

### Avatar de Usuario

- **Dimensiones**: `40px × 40px`
- **Border radius**: `50%` (círculo perfecto)
- **Border**: `2px solid transparent` (default), `2px solid var(--ubits-accent-brand)` (active/hover)
- **Hover**: `transform: scale(1.05)`
- **Background**: `var(--ubits-fg-1-medium)`

### Footer

- **Border top**: `1px solid var(--ubits-sidebar-button-fg-default)`
- **Padding top**: `16px`
- **Gap**: `8px` entre elementos
- **Margin-top**: `auto` (empuja el footer hacia abajo)

---

## 🎭 ESTADOS DE BOTONES

### 1. Default State
```css
.nav-button {
  background: rgba(255, 255, 255, 0);          /* Transparente */
  /* Icono usa: var(--ubits-sidebar-button-fg-default) */
}
```

### 2. Hover State
```css
.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);        /* Fondo blanco semitransparente */
  transform: scale(1.08);                       /* Escala 8% más grande */
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); /* Sombra suave */
}

.nav-button:hover i {
  color: var(--ubits-sidebar-button-fg-hover); /* Icono más claro */
  transform: scale(1.1);                        /* Icono 10% más grande */
}
```

**Efecto especial**: Efecto de brillo que se desplaza de izquierda a derecha con `::before` pseudo-elemento.

### 3. Active State (Seleccionado)
```css
.nav-button.active {
  background: var(--ubits-sidebar-button-bg-active); /* Fondo blanco */
}

.nav-button.active i {
  color: var(--ubits-sidebar-button-fg-active);      /* Icono oscuro */
}
```

### 4. Pressed State (Al mantener presionado)
```css
.nav-button:active {
  background: var(--ubits-sidebar-button-bg-pressed); /* Fondo gris */
  transform: scale(0.95);                              /* Escala 5% más pequeño */
}

.nav-button:active i {
  color: var(--ubits-sidebar-button-fg-pressed);      /* Icono claro */
  transform: scale(0.9);                               /* Icono 10% más pequeño */
}
```

### 5. Focus State (Navegación con teclado)
```css
.nav-button:focus-visible {
  background: rgba(255, 255, 255, 0);                  /* Sin fondo */
  box-shadow: 0px 0px 0px 4px rgba(82, 151, 244, 0.3); /* Anillo azul */
  outline: none;
}
```

### 6. Disabled State
```css
.nav-button:disabled {
  background: var(--ubits-sidebar-button-bg-disabled);
  cursor: not-allowed;
}

.nav-button:disabled i {
  color: var(--ubits-sidebar-button-fg-disabled);
}
```

### Transiciones

- **Duración**: `0.3s` para transformaciones y cambios de color
- **Timing function**: `cubic-bezier(0.4, 0, 0.2, 1)` (material design ease-in-out)

---

## ⚙️ FUNCIONALIDADES

### 1. Carga Dinámica

El sidebar se carga mediante la función `loadSidebar()`:

```javascript
loadSidebar(variantOrActiveButton = 'default', activeButton = null)
```

**Parámetros:**
- `variantOrActiveButton`: `'default'` | `'admin'` | `string` (sección para compatibilidad hacia atrás)
- `activeButton`: `string` | `null` - Sección a activar

**Ejemplos:**
```javascript
loadSidebar('default', 'aprendizaje');  // Sidebar colaborador con "Aprendizaje" activo
loadSidebar('admin', 'inicio');          // Sidebar admin con "Inicio" activo
loadSidebar('aprendizaje');              // Compatibilidad: default con aprendizaje activo
loadSidebar();                           // Sidebar default sin sección activa
```

### 2. Actualización de Botón Activo

```javascript
updateActiveSidebarButton(activeButton)
```

Remueve el estado `active` de todos los botones y lo aplica al botón especificado.

### 3. Ajuste Dinámico de Altura

La función `adjustSidebarHeight()` ajusta la altura del sidebar según la altura de la ventana:

- Calcula: `windowHeight - topMargin (16px) - bottomMargin (16px)`
- Altura mínima: `578px`
- Se ejecuta al cargar y al redimensionar la ventana

### 4. Tooltips

- Se muestran al hacer hover sobre cualquier botón
- Posición: A la derecha del sidebar
- Contenido: Texto del atributo `data-tooltip`
- Estilo: Fondo del sidebar, texto blanco, sombra suave
- Flecha: Pseudo-elemento `::before` que apunta hacia el sidebar

### 5. Navegación

Cada botón puede tener:
- `onclick`: Navegación directa a una página
- `data-section`: Identificador único de la sección
- `data-tooltip`: Texto a mostrar en el tooltip

### 6. Click en Logo

- Redirige a `index.html` (default) o `admin.html` (admin)
- Tiene efecto hover con escala y fondo semitransparente

---

## 🎯 ICONOS

### Iconos Default (Modo Colaborador)

| Sección | Icono FontAwesome | Clase |
|---------|------------------|-------|
| Administrador | Laptop | `far fa-laptop` |
| Aprendizaje | Graduation Cap | `far fa-graduation-cap` |
| Diagnóstico | Chart Mixed | `far fa-chart-mixed` |
| Desempeño | Bars Progress | `far fa-bars-progress` |
| Encuestas | Clipboard | `far fa-clipboard` |
| Reclutamiento | Users | `far fa-users` |
| Tareas | Layer Group | `far fa-layer-group` |
| UBITS AI | Sparkles | `far fa-sparkles` |

### Iconos Admin (Modo Administrador)

| Sección | Icono FontAwesome | Clase |
|---------|------------------|-------|
| Inicio | House | `far fa-house` |
| Empresa | Building | `far fa-building` |
| Aprendizaje | Graduation Cap | `far fa-graduation-cap` |
| Diagnóstico | Chart Mixed | `far fa-chart-mixed` |
| Desempeño | Bars Progress | `far fa-bars-progress` |
| Encuestas | Clipboard | `far fa-clipboard` |
| API | Code | `far fa-code` |
| Centro de ayuda | Circle Question | `far fa-circle-question` |

### Iconos Menú de Perfil

| Item | Icono FontAwesome | Clase |
|------|------------------|-------|
| Ver mi perfil | User | `far fa-user` |
| Modo colaborador/Admin | User Gear / Laptop | `far fa-user-gear` / `far fa-laptop` |
| Cambio de contraseña | Key | `far fa-key` |
| Cerrar sesión | Sign Out | `far fa-sign-out` |

### Dark Mode Toggle

- **Tema claro**: `far fa-moon` (luna)
- **Tema oscuro**: `far fa-moon` con rotación de 180° y escala 1.1

---

## 👤 MODO ADMIN VS MODO COLABORADOR

### Diferencias Clave

| Aspecto | Modo Colaborador (default) | Modo Admin |
|---------|---------------------------|------------|
| **Botones en body** | 8 botones | 6 botones |
| **Botones en footer** | Solo dark mode + avatar | API + Centro de ayuda + dark mode + avatar |
| **Menú de perfil** | Opción "Modo Administrador" | Opción "Modo colaborador" |
| **Redirección logo** | `index.html` | `admin.html` |
| **Secciones disponibles** | admin, aprendizaje, diagnóstico, desempeño, encuestas, reclutamiento, tareas, ubits-ai | inicio, empresa, aprendizaje, diagnóstico, desempeño, encuestas |

### Cambio de Modo

El cambio entre modos se realiza desde el menú de perfil:
- **Colaborador → Admin**: Click en "Modo Administrador" → redirige a `admin.html`
- **Admin → Colaborador**: Click en "Modo colaborador" → redirige a `profile.html` (o página colaborador)

---

## 💬 TOOLTIPS

### Implementación

- **Posición**: `position: fixed`
- **Z-index**: `10000`
- **Background**: `var(--ubits-sidebar-bg)`
- **Color texto**: `var(--ubits-fg-1-high-static-inverted)` (blanco)
- **Padding**: `8px 12px`
- **Border radius**: `6px`
- **Box shadow**: `0px 2px 8px rgba(0,0,0,0.15)`
- **Pointer events**: `none`

### Flecha

- Pseudo-elemento `::before`
- Posición: Izquierda del tooltip, centrado verticalmente
- Forma: Triángulo apuntando hacia el sidebar (borde derecho del tooltip)
- Color: `var(--ubits-sidebar-bg)`

### Activación

Los tooltips se activan mediante la función `initProfileTooltips()` que:
- Busca todos los elementos con atributo `data-tooltip`
- Agrega event listeners para `mouseenter` y `mouseleave`
- Calcula la posición del tooltip basándose en la posición del botón

---

## 👨‍💼 MENÚ DE PERFIL

### Posición y Estilo

- **Posición**: `fixed`, `left: 120px`, `bottom: 27px` (desde el footer del sidebar)
- **Ancho**: `200px`
- **Background**: `var(--ubits-sidebar-bg)`
- **Border**: `1px solid var(--ubits-border-1)`
- **Border radius**: `8px`
- **Box shadow**: `0 4px 12px rgba(0, 0, 0, 0.15)`
- **Z-index**: `2000`
- **Padding**: `8px 0`
- **Display**: `none` (por defecto), `block` con clase `.show`

### Items del Menú

Cada item tiene:
- **Padding**: `8px 16px`
- **Display**: `flex`, `align-items: center`
- **Gap**: Icono + texto (10px entre ellos)
- **Font**: `Noto Sans`, `13px`, `400`, `line-height: 19.5px`
- **Color**: `var(--ubits-sidebar-button-fg-default)`

### Estados

- **Default**: Color texto/icono usando `--ubits-sidebar-button-fg-default`
- **Hover**: 
  - Background: `var(--ubits-sidebar-button-bg-pressed)`
  - Color: `var(--ubits-sidebar-button-fg-hover)`
- **Active**: 
  - Background: `var(--ubits-sidebar-button-bg-active)`
  - Color: `var(--ubits-sidebar-button-bg-active)`

### Dividers

- **Altura**: `1px`
- **Background**: `var(--ubits-border-1)`
- **Margin**: `4px 0`

### Funciones JavaScript

```javascript
showSidebarProfileMenu(avatarElement)
hideSidebarProfileMenu()
```

El menú se muestra al hacer `mouseenter` sobre el avatar y se oculta al hacer `mouseleave` del avatar o del menú mismo.

---

## 🌙 DARK MODE TOGGLE

### Características Especiales

El botón de dark mode (`#darkmode-toggle`) tiene comportamientos especiales:

- **NO debe tener estado active**: Siempre usa `background: rgba(255, 255, 255, 0)`
- **Icono siempre visible**: Usa `--ubits-sidebar-button-fg-default` en ambos temas
- **Animación de rotación**: El icono rota 180° y escala 1.1 en modo oscuro
- **Efecto de brillo**: Igual que otros botones, efecto de brillo en hover
- **Pulso sutil en hover**: `transform: scale(1.05)` con sombra azul

### Funcionalidad

Se inicializa mediante `initDarkModeToggle()` que:
- Busca el botón con ID `darkmode-toggle`
- Agrega event listener para click
- Llama a `toggleDarkMode()` para cambiar el tema global
- Actualiza el atributo `data-theme` del botón y del body

---

## 📱 RESPONSIVE DESIGN

### Desktop (> 768px)

- Sidebar visible y funcional
- Ancho fijo: `96px`
- Altura dinámica ajustada a ventana

### Mobile (≤ 768px)

- **Sidebar oculto**: `display: none` o simplemente no se muestra
- **Reemplazo**: Se usa el componente `TabBar` (bottom navigation) en su lugar
- **Margen del contenido**: El `main-content` ajusta su `margin-left` de `143px` a `12px`

### Ajustes Responsive Específicos

- Botones: `40px × 40px` → `36px × 36px`
- Iconos: `16px` → `14px`
- Iconos contenedor: `24px × 24px` → `20px × 20px`

---

## 📚 JAVASCRIPT API

### Funciones Principales

#### `loadSidebar(variantOrActiveButton, activeButton)`

Carga el componente sidebar en el contenedor `#sidebar-container`.

**Parámetros:**
- `variantOrActiveButton` (string): `'default'` | `'admin'` | sección (compatibilidad)
- `activeButton` (string | null): Sección a activar

**Retorna:** `void`

**Efectos:**
- Inserta HTML del sidebar según la variante
- Ajusta altura dinámicamente
- Activa el botón especificado
- Inicializa tooltips
- Inicializa dark mode toggle
- Agrega listener para resize

#### `updateActiveSidebarButton(activeButton)`

Actualiza el botón activo sin recargar el sidebar.

**Parámetros:**
- `activeButton` (string): Sección a activar

**Retorna:** `void`

**Efectos:**
- Remueve clase `active` de todos los botones
- Agrega clase `active` al botón especificado

#### `adjustSidebarHeight()`

Ajusta la altura del sidebar según la altura de la ventana.

**Parámetros:** Ninguno

**Retorna:** `void`

**Efectos:**
- Calcula altura disponible
- Aplica altura mínima de 578px si es necesario
- Actualiza estilo del sidebar

#### `showSidebarProfileMenu(avatarElement)`

Muestra el menú de perfil del sidebar.

**Parámetros:**
- `avatarElement` (HTMLElement): Elemento avatar que disparó el evento

**Retorna:** `void`

**Efectos:**
- Agrega clase `show` al menú de perfil

#### `hideSidebarProfileMenu()`

Oculta el menú de perfil del sidebar.

**Parámetros:** Ninguno

**Retorna:** `void`

**Efectos:**
- Remueve clase `show` del menú de perfil

### Event Listeners

- **Resize**: Se ajusta altura del sidebar automáticamente
- **Click en logo**: Redirección según variante
- **Click en botones**: Navegación según `onclick` o `data-section`
- **Hover en avatar**: Muestra/oculta menú de perfil
- **Click en dark mode toggle**: Cambia tema global

---

## ♿ ACCESIBILIDAD

### ARIA Attributes

- **Role**: `navigation` (implícito en `<aside>`)
- **Label**: No tiene, pero cada botón debería tener `aria-label` con el texto del tooltip
- **Live regions**: No aplica para este componente

### Navegación por Teclado

- **Tab**: Navega entre botones
- **Enter/Space**: Activa el botón enfocado
- **Focus visible**: Anillo azul de 4px para indicar foco

### Contraste

- Los colores del sidebar usan tokens que cumplen con WCAG AA:
  - `--ubits-sidebar-button-fg-default`: Contraste suficiente con fondo
  - `--ubits-sidebar-button-fg-hover`: Contraste mejorado
  - `--ubits-sidebar-button-fg-active`: Contraste alto (texto oscuro sobre fondo blanco)

### Screen Readers

- Cada botón debería tener `aria-label` con el nombre de la sección
- El avatar debería tener `aria-label="Perfil de usuario"`
- El botón de dark mode debería tener `aria-label="Cambiar a modo oscuro"` o `"Cambiar a modo claro"`

---

## 📝 NOTAS IMPORTANTES

1. **Colores NO cambian con tema**: Los tokens del sidebar son los mismos en tema claro y oscuro. Esto es intencional para mantener consistencia visual.

2. **Altura dinámica**: El sidebar se ajusta automáticamente a la altura de la ventana, pero nunca menos de 578px.

3. **Posición fija**: El sidebar siempre está visible y no se desplaza con el scroll.

4. **Tooltips dependen de función externa**: Los tooltips requieren que la función `initProfileTooltips()` esté disponible globalmente.

5. **Dark mode toggle depende de función externa**: Requiere que `initDarkModeToggle()` o `toggleDarkMode()` estén disponibles.

6. **Menú de perfil con hover**: Se activa con `mouseenter` y se desactiva con `mouseleave`, no con click.

7. **Contenedor requerido**: El sidebar se carga en un contenedor con ID `sidebar-container`.

8. **Archivos CSS requeridos**:
   - `styles.css` (contiene estilos del sidebar)
   - `ubits-colors.css` (contiene tokens de color)
   - `components-sidebar.css` (si existe, estilos adicionales)

9. **Archivos JS requeridos**:
   - `components/sidebar.js` (función `loadSidebar`)
   - Funciones globales para tooltips y dark mode

---

## 🎯 RESUMEN PARA IMPLEMENTACIÓN

### Checklist de Implementación

- [ ] Crear estructura HTML base con 3 secciones (header, body, footer)
- [ ] Implementar dos variantes (default/admin) con diferentes botones
- [ ] Aplicar estilos con tokens del sidebar (ancho 96px, colores fijos)
- [ ] Implementar todos los estados de botones (default, hover, active, pressed, disabled, focus)
- [ ] Agregar tooltips con posicionamiento correcto
- [ ] Implementar menú de perfil con hover y posición fija
- [ ] Integrar dark mode toggle con animación de rotación
- [ ] Ajustar altura dinámicamente según ventana
- [ ] Agregar navegación (onclick o event listeners)
- [ ] Implementar función `loadSidebar()` con parámetros variant y activeButton
- [ ] Implementar función `updateActiveSidebarButton()`
- [ ] Agregar soporte responsive (ocultar en móvil)
- [ ] Asegurar accesibilidad (ARIA, navegación por teclado)
- [ ] Probar cambio entre modos admin/colaborador
- [ ] Verificar que todos los iconos se muestren correctamente

---

**Fin del Análisis**

