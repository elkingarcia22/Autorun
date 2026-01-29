# Análisis Completo del Componente Tab-bar

## Resumen
El Tab-bar es un componente de navegación inferior para dispositivos móviles que reemplaza al sidebar en pantallas pequeñas (< 1024px). Es una barra fija en la parte inferior de la pantalla que permite navegación rápida entre secciones principales.

## Estructura HTML

```html
<div class="tab-bar" id="tab-bar">
    <div class="tab-bar-content">
        <div class="tab-bar-item" data-tab="modulos">
            <i class="far fa-th-large tab-bar-icon"></i>
            <span class="tab-bar-text">Módulos</span>
        </div>
        <div class="tab-bar-item" data-tab="perfil">
            <img src="images/Profile-image.jpg" alt="Mi perfil" class="tab-bar-avatar">
            <span class="tab-bar-text">Mi perfil</span>
        </div>
        <div class="tab-bar-item" data-tab="modo-oscuro">
            <i class="far fa-moon tab-bar-icon"></i>
            <span class="tab-bar-text">Modo oscuro</span>
        </div>
    </div>
</div>
```

## Estilos CSS

### Contenedor Principal (.tab-bar)
- **Position**: `fixed` en la parte inferior (`bottom: 0`)
- **Display**: `none` por defecto, `block` en responsive (< 1024px)
- **Height**: `60px`
- **Background**: `var(--ubits-sidebar-bg)`
- **Border-top**: `1px solid var(--ubits-sidebar-button-fg-default)`
- **Z-index**: `1000`
- **Padding**: `8px 0`

### Contenedor de Items (.tab-bar-content)
- **Display**: `flex`
- **Justify-content**: `space-around`
- **Align-items**: `center`
- **Height**: `100%`

### Item Individual (.tab-bar-item)
- **Display**: `flex`
- **Flex-direction**: `column`
- **Align-items**: `center`
- **Justify-content**: `center`
- **Cursor**: `pointer`
- **Transition**: `all 0.2s ease`
- **Padding**: `4px 8px`
- **Border-radius**: `8px`
- **Min-width**: `60px`
- **Flex**: `1`
- **Max-width**: `120px`

### Estados del Item

#### Default
- Sin background específico

#### Hover (.tab-bar-item:hover)
- **Background**: `var(--ubits-sidebar-button-bg-pressed)`
- **Icon color**: `var(--ubits-sidebar-button-fg-hover)`
- **Text color**: `var(--ubits-sidebar-button-fg-hover)`
- **Avatar border**: `var(--ubits-sidebar-button-fg-hover)`

#### Active (.tab-bar-item.active)
- **Background**: `transparent`
- **Text color**: `var(--ubits-sidebar-button-bg-active)`
- **Text font-weight**: `700`
- **Avatar border**: `var(--ubits-sidebar-button-bg-active)`

### Icono (.tab-bar-icon)
- **Font-size**: `20px`
- **Color**: `var(--ubits-sidebar-button-fg-default)`
- **Margin-bottom**: `2px`
- **Width**: `24px`
- **Height**: `24px`
- **Display**: `flex`
- **Align-items**: `center`
- **Justify-content**: `center`

### Avatar (.tab-bar-avatar)
- **Width**: `24px`
- **Height**: `24px`
- **Border-radius**: `50%`
- **Object-fit**: `cover`
- **Margin-bottom**: `2px`
- **Border**: `2px solid transparent`
- **Transition**: `border-color 0.2s ease`

### Texto (.tab-bar-text)
- **Color**: `var(--ubits-sidebar-button-fg-default)`
- **Text-align**: `center`
- **Line-height**: `1.2`
- **Font-family**: `'Noto Sans', sans-serif`
- **Font-size**: `12px`
- **Font-weight**: `400`

## Tokens Utilizados

### Background
- `--ubits-sidebar-bg`: Background del tab-bar

### Colores de Botón
- `--ubits-sidebar-button-fg-default`: Color de icono y texto por defecto
- `--ubits-sidebar-button-fg-hover`: Color en hover
- `--ubits-sidebar-button-fg-active`: Color cuando está activo
- `--ubits-sidebar-button-bg-pressed`: Background en hover
- `--ubits-sidebar-button-bg-active`: Color de borde y texto cuando está activo

### Tipografía
- Usa `body-xs-regular` (12px, weight 400)

## Responsive Design

### Media Query: `@media (max-width: 1023px)`
- El tab-bar se muestra (`display: block`)
- Oculta top-nav, sidebars, y sidebar principal
- Ajusta contenido con `padding-bottom: 60px`

## Funcionalidades JavaScript

### 1. Carga del Componente (`loadTabBar`)
- Carga el HTML del tab-bar en un contenedor
- Agrega event listeners
- Activa el tab correspondiente a la página actual

### 2. Event Listeners (`addTabBarEventListeners`)
- Maneja clicks en cada item
- Funcionalidades especiales por tab:
  - **modo-oscuro**: Toggle de dark mode
  - **modulos**: Toggle de floating menu
  - **perfil**: Toggle de profile menu
  - **otros**: Navegación normal

### 3. Activación de Tab (`activateCurrentPageTab`)
- Detecta la página actual
- Activa el tab correspondiente
- Mapea páginas a tabs:
  - `profile` → `perfil`
  - Múltiples páginas → `modulos`
  - Página principal → ningún tab activo

## Variantes y Configuraciones

### Items Estándar
1. **Módulos**: Icono `fa-th-large`, abre floating menu
2. **Mi perfil**: Avatar (imagen), abre profile menu
3. **Modo oscuro**: Icono `fa-moon`, toggle dark mode

### Tipos de Items
- **Con icono**: Usa `<i>` con clase FontAwesome
- **Con avatar**: Usa `<img>` con clase `tab-bar-avatar`

## Integración con Otros Componentes

### Floating Menu
- Se abre desde el tab "Módulos"
- Posicionado relativo al tab-bar en móvil

### Profile Menu
- Se abre desde el tab "Perfil"
- Posicionado relativo al tab-bar en móvil

### Dark Mode
- El tab "Modo oscuro" cambia el tema de toda la aplicación
- Los colores del tab-bar cambian automáticamente con los tokens

## Características Especiales

1. **Fixed Positioning**: Siempre visible en la parte inferior en móvil
2. **Z-index Alto**: Por encima de otros elementos (1000)
3. **Transiciones Suaves**: Todos los estados tienen transiciones de 0.2s
4. **Flex Layout**: Items se distribuyen equitativamente
5. **Soporte de Avatar**: Puede mostrar imagen de perfil en lugar de icono
6. **Activación Automática**: Detecta la página actual y activa el tab correspondiente

## Accesibilidad

- **Cursor pointer**: Indica que los items son clickeables
- **Alt text en avatar**: Para lectores de pantalla
- **Transiciones**: Feedback visual claro

## Consideraciones de Implementación

1. **Solo visible en móvil**: Oculto por defecto, visible solo en < 1024px
2. **Callback requerido**: Necesita función `onTabChange` para manejar clicks
3. **Flexible**: Debe permitir configurar items personalizados
4. **Responsive**: Debe adaptarse a diferentes anchos de pantalla móvil

