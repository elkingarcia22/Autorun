# Análisis Completo del Componente Floating Menu

## Resumen
El Floating Menu es un modal que se despliega al hacer clic en "Módulos" del TabBar. Contiene la navegación principal organizada en accordions colapsables y enlaces directos. Es el subcomponente principal del TabBar para navegación móvil.

## Estructura HTML

```html
<div class="floating-menu" id="floating-menu">
    <div class="floating-menu-header">
        <h2 class="floating-menu-title">Módulos</h2>
        <button class="floating-menu-close" onclick="hideFloatingMenu()">
            <i class="far fa-times"></i>
        </button>
    </div>
    <div class="floating-menu-content">
        <!-- Accordions y enlaces directos -->
    </div>
</div>
```

## Funcionalidad

### 1. Activación desde TabBar
- Se muestra/oculta al hacer clic en el tab "Módulos" del TabBar
- Toggle: si está abierto se cierra, si está cerrado se abre
- Se cierra automáticamente cuando se hace clic en "Modo oscuro" o "Mi perfil"

### 2. Tipos de Items

#### Accordions (con subitems)
- **Aprendizaje**: Subitems: Inicio, Catálogo, U. Corporativa, Zona de estudio
- **Desempeño**: Subitems: Evaluaciones 360, Objetivos, Métricas, Reportes
- **Tareas**: Subitems: Planes, Tareas

#### Enlaces Directos (sin submenú)
- **Diagnóstico**: Enlace directo con chevron derecho
- **Encuestas**: Enlace directo con chevron derecho
- **Reclutamiento**: Enlace directo con chevron derecho
- **UBITS AI**: Enlace directo con chevron derecho

### 3. Comportamiento de Accordions
- Solo uno abierto a la vez
- Click en header expande/colapsa
- Chevron rota 180° cuando está abierto
- Estados activos en título, círculo de icono, e icono cuando está expandido
- Subitems con padding-left para indentación

### 4. Estados Activos
- Detecta la página actual y activa el item correspondiente
- Accordions se abren automáticamente si contienen el item activo
- Enlaces directos se marcan como activos

## Estilos CSS

### Posicionamiento
- **Position**: `fixed`
- **Top**: `16px`
- **Left**: `0`
- **Right**: `0`
- **Bottom**: `84px` (60px TabBar + 24px margen)
- **Z-index**: `2000`
- **Display**: `none` por defecto, `block` con clase `.show`

### Background y Colores
- **Background**: `var(--ubits-sidebar-bg)`
- Usa tokens del sidebar para colores
- Modo oscuro automático con `[data-theme="dark"]`

### Accordions
- Header con hover effect
- Círculo de icono (32px) que se vuelve activo cuando está expandido
- Chevron que rota 180° al expandir
- Body con `display: none/block` para mostrar/ocultar subitems

### Responsive
- Solo visible en `< 1024px`
- Se oculta automáticamente en desktop

## Funciones JavaScript

### `showFloatingMenu()`
- Agrega clase `show` al elemento
- Bloquea scroll del body (`overflow: hidden`)
- Activa automáticamente el item según la página actual

### `hideFloatingMenu()`
- Remueve clase `show`
- Restaura scroll del body

### `toggleAccordion(sectionId)`
- Cierra todos los accordions primero
- Abre solo el seleccionado si estaba cerrado
- Rota chevron y aplica estados activos

### `closeAllAccordions()`
- Cierra todos los accordions
- Resetea chevrons y estados activos

### Event Listeners
- **ESC**: Cierra el menú
- **Click fuera**: Cierra el menú (excepto si es en el tab "Módulos")

## Integración con TabBar

El TabBar debe:
1. Detectar click en tab "Módulos"
2. Toggle del Floating Menu (`show`/`hide`)
3. Cerrar Floating Menu cuando se activa otro tab
4. Mantener referencia al Floating Menu para controlarlo

## Consideraciones de Implementación

1. **Modularidad**: Puede ser un add-on separado o parte del TabBar
2. **Configuración**: Debe permitir personalizar sections y subitems
3. **Callbacks**: Debe soportar callbacks para navegación personalizada
4. **Accesibilidad**: Keyboard navigation, ARIA roles, focus management
5. **Animaciones**: Transiciones suaves para abrir/cerrar

