# @ubits/tabbar

Componente TabBar UBITS como add-on intercambiable.

## Características

- Navegación inferior para dispositivos móviles
- Items personalizables con iconos o avatares
- Estados: default, hover, active
- Soporte para dark mode toggle
- Callbacks personalizables por item
- Responsive: visible solo en < 1024px (configurable)
- **Floating Menu**: Modal con accordions que se muestra al hacer click en "Módulos"
- **Profile Menu**: Dropdown que se muestra al hacer click en "Mi perfil"

## Subcomponentes

### Floating Menu
Modal que contiene la navegación principal organizada en accordions colapsables y enlaces directos. Se activa al hacer click en el tab "Módulos".

- Accordions con subitems (ej: Aprendizaje, Desempeño, Tareas)
- Enlaces directos (ej: Diagnóstico, Encuestas, Reclutamiento, UBITS AI)
- Solo un accordion abierto a la vez
- Cerrar con ESC o click fuera
- Scroll personalizado

### Profile Menu
Dropdown simple con opciones de perfil. Se activa al hacer click en el tab "Mi perfil".

- Items personalizables
- Callbacks por item
- Cerrar con ESC o click fuera

## Uso

```typescript
import { createTabBar } from '@ubits/tabbar';
import { defaultFloatingMenuSections, defaultProfileMenuItems } from '@ubits/tabbar/configs';

createTabBar({
  containerId: 'tabbar-container',
  items: [
    {
      id: 'modulos',
      label: 'Módulos',
      icon: 'th-large'
    },
    {
      id: 'perfil',
      label: 'Mi perfil',
      avatar: 'images/Profile-image.jpg',
      avatarAlt: 'Mi perfil'
    },
    {
      id: 'modo-oscuro',
      label: 'Modo oscuro',
      icon: 'moon'
    }
  ],
  activeTabId: 'modulos',
  visible: true,
  darkModeEnabled: true,
  floatingMenuSections: defaultFloatingMenuSections,
  profileMenuItems: defaultProfileMenuItems,
  onTabChange: (tabId, item, element) => {
    console.log('Tab changed:', tabId);
  },
  onFloatingMenuItemClick: (sectionId, subitemId, url) => {
    console.log('Floating menu item clicked:', sectionId, subitemId);
  },
  onProfileMenuItemClick: (itemId, item) => {
    console.log('Profile menu item clicked:', itemId);
  }
});
```

## Configuración del Floating Menu

```typescript
const floatingMenuSections: FloatingMenuSection[] = [
  {
    id: 'aprendizaje',
    title: 'Aprendizaje',
    icon: 'graduation-cap',
    subitems: [
      { id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
      { id: 'catalogo', title: 'Catálogo', icon: 'book', url: 'catalogo.html' }
    ]
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico',
    icon: 'chart-mixed',
    url: 'diagnostico.html',
    isLink: true,
    clickable: true
  }
];
```

## Configuración del Profile Menu

```typescript
const profileMenuItems: ProfileMenuItem[] = [
  {
    id: 'ver-perfil',
    label: 'Ver mi perfil',
    icon: 'user',
    url: 'profile.html'
  },
  {
    id: 'cerrar-sesion',
    label: 'Cerrar sesión',
    icon: 'sign-out-alt',
    onClick: () => {
      console.log('Logout');
    }
  }
];
```

