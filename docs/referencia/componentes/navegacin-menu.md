# 📦 Menu

> **Componente UBITS:** `navegacin-menu`  
> **Categoría:** Navegación  
> **API:** `window.createMenu()` o `<ubits-menu>`  
> **Storybook Local:** http://localhost:6006/?path=/story/navegacin-menu--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-menu--default

## 🎯 Descripción

Componente Menu UBITS de navegación lateral con secciones, items, shortcuts, badges e información de usuario. Usa tokens UBITS para colores, tipografía y espaciado.

**Características principales:**
- Header con logo y nombre de aplicación
- Secciones configurables con títulos
- Items con iconos, labels, shortcuts y badges
- Información de usuario (avatar, nombre, rol)
- Items activos, deshabilitados y con estados
- Ancho configurable
- Navegación por teclado

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegacin-menu--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-menu--default
- **Código fuente:** `vendor/ubits/packages/components/menu/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/menu/src/types/MenuOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Menu.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegacin-menu--default`  
**URL Local:** http://localhost:6006/?path=/story/navegacin-menu--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-menu--default

**Descripción:**
Menu con todos los controles disponibles. Permite configurar header, secciones, items, badges e información de usuario.

**Características mostradas:**
- Logo y nombre de aplicación configurables
- Secciones configurables con títulos
- Items con iconos, labels, shortcuts y badges
- Items activos y deshabilitados
- Información de usuario (avatar, nombre, rol)
- Ancho configurable

**Código de ejemplo:**
```javascript
window.createMenu({
  containerId: 'menu-container',
  logoImage: '/images/logo.svg',
  appName: 'Mi Aplicación',
  logoHref: '/',
  width: 280,
  sections: [
    {
      title: 'Principal',
      items: [
        {
          id: 'home',
          label: 'Inicio',
          icon: 'home',
          iconStyle: 'regular',
          url: '/home',
          active: true
        },
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'chart-line',
          iconStyle: 'regular',
          url: '/dashboard'
        }
      ]
    },
    {
      title: 'Configuración',
      items: [
        {
          id: 'settings',
          label: 'Configuración',
          icon: 'cog',
          iconStyle: 'regular',
          url: '/settings',
          badge: 3,
          badgeVariant: 'error'
        }
      ]
    }
  ],
  userInfo: {
    avatarImage: '/images/user.jpg',
    name: 'Juan Pérez',
    role: 'Administrador'
  },
  onItemClick: (itemId, item) => {
    console.log('Item clickeado:', itemId);
    navigateToItem(item.url);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `width`: `280` - Ancho del menú en píxeles
- `sections`: Array de secciones con items
- `userInfo`: Información del usuario

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el menú |
| `logoImage` | `string` | - | URL de la imagen del logo |
| `appName` | `string` | - | Nombre de la aplicación |
| `logoHref` | `string` | - | URL a la que redirige el logo |
| `width` | `number` | `280` | Ancho del menú en píxeles |
| `sections` | `MenuSection[]` | - | Array de secciones del menú (requerido) |
| `userInfo` | `MenuUserInfo` | - | Información del usuario (opcional) |
| `onItemClick` | `function` | - | Callback que se ejecuta cuando se hace click en un item |

### Estructura de MenuSection

```typescript
interface MenuSection {
  title?: string;    // Título de la sección (opcional)
  items: MenuItem[]; // Array de items de la sección (requerido)
}
```

### Estructura de MenuItem

```typescript
interface MenuItem {
  id: string;                    // ID único del item
  label: string;                 // Texto del item
  icon?: string;                  // Nombre del icono FontAwesome (opcional)
  iconStyle?: 'regular' | 'solid'; // Estilo del icono (opcional)
  url?: string;                   // URL a la que navegar (opcional)
  shortcut?: string;              // Atajo de teclado (opcional, ej: "⌘K")
  badge?: number;                 // Número del badge (opcional)
  badgeVariant?: 'success' | 'warning' | 'error' | 'info'; // Variante del badge (opcional)
  active?: boolean;               // Si el item está activo
  disabled?: boolean;             // Si el item está deshabilitado
  onClick?: () => void;          // Callback personalizado (opcional)
}
```

### Estructura de MenuUserInfo

```typescript
interface MenuUserInfo {
  avatarImage?: string;  // URL de la imagen del avatar (opcional)
  name: string;         // Nombre del usuario
  role?: string;         // Rol del usuario (opcional)
}
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Menu Básico

```javascript
window.createMenu({
  containerId: 'menu-container',
  logoImage: '/images/logo.svg',
  appName: 'Mi App',
  sections: [
    {
      items: [
        { id: 'home', label: 'Inicio', icon: 'home', url: '/home' },
        { id: 'about', label: 'Acerca de', icon: 'info-circle', url: '/about' }
      ]
    }
  ]
});
```

### Ejemplo 2: Menu con Secciones

```javascript
window.createMenu({
  containerId: 'menu-container',
  logoImage: '/images/logo.svg',
  appName: 'Dashboard',
  sections: [
    {
      title: 'Principal',
      items: [
        { id: 'home', label: 'Inicio', icon: 'home', url: '/home', active: true },
        { id: 'dashboard', label: 'Dashboard', icon: 'chart-line', url: '/dashboard' }
      ]
    },
    {
      title: 'Configuración',
      items: [
        { id: 'settings', label: 'Configuración', icon: 'cog', url: '/settings' },
        { id: 'profile', label: 'Perfil', icon: 'user', url: '/profile' }
      ]
    }
  ]
});
```

### Ejemplo 3: Menu con Badges

```javascript
window.createMenu({
  containerId: 'menu-container',
  sections: [
    {
      items: [
        {
          id: 'notifications',
          label: 'Notificaciones',
          icon: 'bell',
          url: '/notifications',
          badge: 5,
          badgeVariant: 'error'
        },
        {
          id: 'messages',
          label: 'Mensajes',
          icon: 'envelope',
          url: '/messages',
          badge: 12,
          badgeVariant: 'info'
        }
      ]
    }
  ]
});
```

### Ejemplo 4: Menu con Shortcuts

```javascript
window.createMenu({
  containerId: 'menu-container',
  sections: [
    {
      items: [
        {
          id: 'search',
          label: 'Buscar',
          icon: 'search',
          url: '/search',
          shortcut: '⌘K'
        },
        {
          id: 'new',
          label: 'Nuevo',
          icon: 'plus',
          url: '/new',
          shortcut: '⌘N'
        }
      ]
    }
  ]
});
```

### Ejemplo 5: Menu con Información de Usuario

```javascript
window.createMenu({
  containerId: 'menu-container',
  sections: [
    {
      items: [
        { id: 'home', label: 'Inicio', icon: 'home', url: '/home' }
      ]
    }
  ],
  userInfo: {
    avatarImage: '/images/user.jpg',
    name: 'Juan Pérez',
    role: 'Administrador'
  }
});
```

### Ejemplo 6: Menu con Items Deshabilitados

```javascript
window.createMenu({
  containerId: 'menu-container',
  sections: [
    {
      items: [
        { id: 'home', label: 'Inicio', icon: 'home', url: '/home' },
        { id: 'premium', label: 'Premium', icon: 'star', url: '/premium', disabled: true }
      ]
    }
  ]
});
```

### Ejemplo 7: Menu con Ancho Personalizado

```javascript
window.createMenu({
  containerId: 'menu-container',
  width: 320, // Ancho personalizado
  sections: [
    {
      items: [
        { id: 'home', label: 'Inicio', icon: 'home', url: '/home' }
      ]
    }
  ]
});
```

### Ejemplo 8: Menu Completo

```javascript
window.createMenu({
  containerId: 'menu-container',
  logoImage: '/images/logo.svg',
  appName: 'Mi Aplicación',
  logoHref: '/',
  width: 280,
  sections: [
    {
      title: 'Principal',
      items: [
        {
          id: 'home',
          label: 'Inicio',
          icon: 'home',
          iconStyle: 'regular',
          url: '/home',
          active: true
        },
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'chart-line',
          iconStyle: 'regular',
          url: '/dashboard',
          shortcut: '⌘D'
        }
      ]
    },
    {
      title: 'Comunicación',
      items: [
        {
          id: 'messages',
          label: 'Mensajes',
          icon: 'envelope',
          iconStyle: 'regular',
          url: '/messages',
          badge: 5,
          badgeVariant: 'error'
        },
        {
          id: 'notifications',
          label: 'Notificaciones',
          icon: 'bell',
          iconStyle: 'regular',
          url: '/notifications',
          badge: 12,
          badgeVariant: 'info'
        }
      ]
    },
    {
      title: 'Configuración',
      items: [
        {
          id: 'settings',
          label: 'Configuración',
          icon: 'cog',
          iconStyle: 'regular',
          url: '/settings'
        },
        {
          id: 'profile',
          label: 'Perfil',
          icon: 'user',
          iconStyle: 'regular',
          url: '/profile'
        }
      ]
    }
  ],
  userInfo: {
    avatarImage: '/images/user.jpg',
    name: 'Juan Pérez',
    role: 'Administrador'
  },
  onItemClick: (itemId, item) => {
    console.log('Item clickeado:', itemId);
    if (item.url) {
      navigateToPage(item.url);
    }
    if (item.onClick) {
      item.onClick();
    }
  }
});
```

---

## 🔄 Callbacks y Eventos

### onItemClick

Se ejecuta cuando se hace click en un item del menú.

```javascript
onItemClick: (itemId, item) => {
  console.log('Item clickeado:', itemId);
  console.log('Item completo:', item);
  
  // Navegar a la URL
  if (item.url) {
    navigateToPage(item.url);
  }
  
  // Ejecutar callback personalizado si existe
  if (item.onClick) {
    item.onClick();
  }
  
  // Actualizar item activo
  updateActiveItem(itemId);
}
```

**Parámetros:**
- `itemId` (string): ID del item clickeado
- `item` (MenuItem): Objeto completo del item

---

## 🎨 Características Visuales

### Header

- Logo (imagen opcional)
- Nombre de aplicación
- Link al hacer click en logo/nombre

### Secciones

- Título opcional
- Separación visual entre secciones
- Espaciado según tokens UBITS

### Items

- Icono opcional (izquierda)
- Label (texto)
- Shortcut opcional (derecha)
- Badge opcional (derecha)
- Estado activo destacado
- Estado deshabilitado con opacidad reducida

### Información de Usuario

- Avatar (imagen opcional)
- Nombre
- Rol (opcional)

---

## 🚨 Errores Comunes

### Error 1: Items sin IDs Únicos
**Problema:** Múltiples items con el mismo ID  
**Solución:** Cada item debe tener un ID único

```javascript
// ❌ Incorrecto - IDs duplicados
sections: [
  {
    items: [
      { id: 'item', label: 'Item 1' },
      { id: 'item', label: 'Item 2' } // ID duplicado
    ]
  }
]

// ✅ Correcto - IDs únicos
sections: [
  {
    items: [
      { id: 'item1', label: 'Item 1' },
      { id: 'item2', label: 'Item 2' }
    ]
  }
]
```

### Error 2: Usar Iconos con Prefijo `fa-`
**Problema:** Usar prefijo `fa-` en iconos  
**Solución:** Usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
icon: 'fa-home'

// ✅ Correcto
icon: 'home'
```

### Error 3: Badge sin Variante
**Problema:** Proporcionar `badge` sin `badgeVariant`  
**Solución:** Proporcionar variante para el badge

```javascript
// ❌ Incorrecto - badge sin variante
badge: 5,
badgeVariant: undefined

// ✅ Correcto - badge con variante
badge: 5,
badgeVariant: 'error'
```

### Error 4: Sección sin Items
**Problema:** Sección sin items  
**Solución:** Cada sección debe tener al menos un item

```javascript
// ❌ Incorrecto - sección sin items
sections: [
  {
    title: 'Sección',
    items: [] // Vacío
  }
]

// ✅ Correcto - sección con items
sections: [
  {
    title: 'Sección',
    items: [
      { id: 'item1', label: 'Item 1', icon: 'home' }
    ]
  }
]
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

