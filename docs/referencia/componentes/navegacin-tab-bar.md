# 📦 TabBar

> **Componente UBITS:** `navegacin-tab-bar`  
> **Categoría:** Navegación  
> **API:** `window.createTabBar()`  
> **Storybook Local:** http://localhost:6006/?path=/story/navegacin-tab-bar--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-tab-bar--default

## 🎯 Descripción

Componente TabBar UBITS para navegación móvil y de escritorio. Barra de navegación inferior (móvil) o superior (escritorio) con iconos, menú flotante, menú de perfil y soporte para múltiples variantes (colaborador, administrador).

**Características principales:**
- Navegación inferior en móvil, superior en escritorio
- Iconos configurables para cada tab
- Menú flotante con secciones y subitems
- Menú de perfil con opciones personalizables
- Variantes predefinidas (colaborador, administrador)
- Responsive automático
- Badges y notificaciones opcionales

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegacin-tab-bar--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-tab-bar--default
- **Código fuente:** `vendor/ubits/packages/components/tabbar/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/tabbar/src/types/TabBarOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/TabBar.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegacin-tab-bar--default`  
**URL Local:** http://localhost:6006/?path=/story/navegacin-tab-bar--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacin-tab-bar--default

**Descripción:**
TabBar con todos los controles disponibles. Permite configurar tabs, menú flotante, menú de perfil y variantes.

**Características mostradas:**
- Tabs configurables con iconos
- Menú flotante con secciones y subitems
- Menú de perfil con opciones
- Variantes (colaborador, administrador)
- Responsive automático

**Código de ejemplo:**
```javascript
window.createTabBar({
  tabs: [
    { id: 'home', label: 'Inicio', icon: 'home', url: 'home.html' },
    { id: 'catalog', label: 'Catálogo', icon: 'book', url: 'catalog.html' },
    { id: 'tasks', label: 'Tareas', icon: 'tasks', url: 'tasks.html' },
    { id: 'profile', label: 'Perfil', icon: 'user', url: 'profile.html' }
  ],
  floatingMenuSections: [
    {
      id: 'aprendizaje',
      title: 'Aprendizaje',
      icon: 'graduation-cap',
      subitems: [
        { id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
        { id: 'catalogo', title: 'Catálogo', icon: 'book', url: 'catalogo.html' }
      ]
    }
  ],
  profileMenuItems: [
    { id: 'ver-perfil', label: 'Ver mi perfil', icon: 'user', url: 'profile.html' },
    { id: 'cerrar-sesion', label: 'Cerrar sesión', icon: 'sign-out-alt', onClick: () => logout() }
  ]
});
```

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `tabs` | `TabBarItem[]` | - | Array de tabs para la barra de navegación (requerido) |
| `floatingMenuSections` | `FloatingMenuSection[]` | - | Secciones del menú flotante (opcional) |
| `profileMenuItems` | `ProfileMenuItem[]` | - | Items del menú de perfil (opcional) |
| `variant` | `string` | - | Variante del TabBar (colaborador, administrador, etc.) |
| `activeTabId` | `string` | - | ID del tab activo inicialmente |
| `onTabChange` | `function` | - | Callback cuando cambia el tab activo |
| `onFloatingMenuClick` | `function` | - | Callback cuando se hace click en el menú flotante |
| `onProfileMenuClick` | `function` | - | Callback cuando se hace click en el menú de perfil |

### Estructura de TabBarItem

```typescript
interface TabBarItem {
  id: string;           // ID único del tab
  label: string;        // Texto del tab
  icon: string;         // Nombre del icono FontAwesome
  url?: string;         // URL a la que navegar (opcional)
  badge?: number;       // Número de badge (opcional)
  onClick?: () => void; // Callback personalizado (opcional)
}
```

### Estructura de FloatingMenuSection

```typescript
interface FloatingMenuSection {
  id: string;                    // ID único de la sección
  title: string;                 // Título de la sección
  icon: string;                  // Nombre del icono FontAwesome
  url?: string;                  // URL directa (si es link)
  isLink?: boolean;              // Si es un link directo
  clickable?: boolean;           // Si es clickeable
  subitems?: FloatingMenuItem[]; // Subitems de la sección
}

interface FloatingMenuItem {
  id: string;      // ID único del item
  title: string;   // Título del item
  icon: string;    // Nombre del icono FontAwesome
  url: string;     // URL del item
}
```

### Estructura de ProfileMenuItem

```typescript
interface ProfileMenuItem {
  id: string;         // ID único del item
  label: string;      // Texto del item
  icon: string;       // Nombre del icono FontAwesome
  url?: string;       // URL a la que navegar (opcional)
  onClick?: () => void; // Callback personalizado (opcional)
}
```

---

## 🎨 Variantes Predefinidas

### Variante Colaborador

Incluye secciones como:
- Aprendizaje (Inicio, Catálogo, U. Corporativa, Zona de estudio)
- Diagnóstico
- Desempeño (Evaluaciones 360, Objetivos, Métricas, Reportes)
- Encuestas
- Reclutamiento
- Tareas (Planes, Tareas)
- UBITS AI

### Variante Administrador

Incluye secciones como:
- Inicio
- Empresa (Gestión de usuarios, Organigrama, Datos de empresa, etc.)
- Aprendizaje (LMS, Plan de formación, Certificados, Métricas)
- Diagnóstico
- Desempeño (Evaluaciones 360, Objetivos, Matriz de Talento)
- Encuestas

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: TabBar Básico

```javascript
window.createTabBar({
  tabs: [
    { id: 'home', label: 'Inicio', icon: 'home', url: 'home.html' },
    { id: 'catalog', label: 'Catálogo', icon: 'book', url: 'catalog.html' },
    { id: 'tasks', label: 'Tareas', icon: 'tasks', url: 'tasks.html' },
    { id: 'profile', label: 'Perfil', icon: 'user', url: 'profile.html' }
  ]
});
```

### Ejemplo 2: TabBar con Badges

```javascript
window.createTabBar({
  tabs: [
    { id: 'home', label: 'Inicio', icon: 'home', url: 'home.html' },
    { id: 'messages', label: 'Mensajes', icon: 'envelope', url: 'messages.html', badge: 5 },
    { id: 'notifications', label: 'Notificaciones', icon: 'bell', url: 'notifications.html', badge: 12 },
    { id: 'profile', label: 'Perfil', icon: 'user', url: 'profile.html' }
  ]
});
```

### Ejemplo 3: TabBar con Menú Flotante

```javascript
window.createTabBar({
  tabs: [
    { id: 'home', label: 'Inicio', icon: 'home', url: 'home.html' },
    { id: 'menu', label: 'Menú', icon: 'bars', url: '#' },
    { id: 'profile', label: 'Perfil', icon: 'user', url: 'profile.html' }
  ],
  floatingMenuSections: [
    {
      id: 'aprendizaje',
      title: 'Aprendizaje',
      icon: 'graduation-cap',
      subitems: [
        { id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
        { id: 'catalogo', title: 'Catálogo', icon: 'book', url: 'catalogo.html' },
        { id: 'zona-estudio', title: 'Zona de estudio', icon: 'books', url: 'zona-estudio.html' }
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
  ]
});
```

### Ejemplo 4: TabBar con Menú de Perfil

```javascript
window.createTabBar({
  tabs: [
    { id: 'home', label: 'Inicio', icon: 'home', url: 'home.html' },
    { id: 'profile', label: 'Perfil', icon: 'user', url: 'profile.html' }
  ],
  profileMenuItems: [
    { id: 'ver-perfil', label: 'Ver mi perfil', icon: 'user', url: 'profile.html' },
    { id: 'configuracion', label: 'Configuración', icon: 'cog', url: 'settings.html' },
    { id: 'cambio-contraseña', label: 'Cambio de contraseña', icon: 'key', onClick: () => {
      showChangePasswordModal();
    }},
    { id: 'cerrar-sesion', label: 'Cerrar sesión', icon: 'sign-out-alt', onClick: () => {
      logout();
    }}
  ]
});
```

### Ejemplo 5: TabBar Completo

```javascript
window.createTabBar({
  tabs: [
    { id: 'home', label: 'Inicio', icon: 'home', url: 'home.html' },
    { id: 'catalog', label: 'Catálogo', icon: 'book', url: 'catalog.html' },
    { id: 'tasks', label: 'Tareas', icon: 'tasks', url: 'tasks.html', badge: 3 },
    { id: 'profile', label: 'Perfil', icon: 'user', url: 'profile.html' }
  ],
  floatingMenuSections: [
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
      isLink: true
    }
  ],
  profileMenuItems: [
    { id: 'ver-perfil', label: 'Ver mi perfil', icon: 'user', url: 'profile.html' },
    { id: 'cerrar-sesion', label: 'Cerrar sesión', icon: 'sign-out-alt', onClick: logout }
  ],
  activeTabId: 'home',
  onTabChange: (tabId) => {
    console.log('Tab cambiado:', tabId);
  }
});
```

### Ejemplo 6: TabBar con Callbacks Personalizados

```javascript
window.createTabBar({
  tabs: [
    { 
      id: 'home', 
      label: 'Inicio', 
      icon: 'home', 
      onClick: () => {
        navigateToPage('home.html');
      }
    },
    { 
      id: 'custom', 
      label: 'Personalizado', 
      icon: 'star', 
      onClick: () => {
        showCustomModal();
      }
    }
  ],
  onTabChange: (tabId) => {
    console.log('Tab activo:', tabId);
    updateActiveTab(tabId);
  },
  onFloatingMenuClick: (sectionId, itemId) => {
    console.log('Menú flotante clickeado:', sectionId, itemId);
    handleFloatingMenuNavigation(sectionId, itemId);
  },
  onProfileMenuClick: (itemId) => {
    console.log('Menú de perfil clickeado:', itemId);
    handleProfileMenuAction(itemId);
  }
});
```

---

## 🔄 Callbacks y Eventos

### onTabChange

Se ejecuta cuando cambia el tab activo.

```javascript
onTabChange: (tabId) => {
  console.log('Tab activo:', tabId);
  // Actualizar contenido
  updateContent(tabId);
  
  // Guardar preferencia
  localStorage.setItem('activeTab', tabId);
}
```

### onFloatingMenuClick

Se ejecuta cuando se hace click en el menú flotante.

```javascript
onFloatingMenuClick: (sectionId, itemId) => {
  console.log('Sección:', sectionId, 'Item:', itemId);
  // Navegar o ejecutar acción
  handleFloatingMenuAction(sectionId, itemId);
}
```

### onProfileMenuClick

Se ejecuta cuando se hace click en el menú de perfil.

```javascript
onProfileMenuClick: (itemId) => {
  console.log('Item del perfil:', itemId);
  // Ejecutar acción según el item
  handleProfileAction(itemId);
}
```

---

## 🎨 Características Visuales

### Responsive

- **Móvil:** Barra inferior fija con iconos
- **Escritorio:** Barra superior con labels e iconos
- **Transición automática** según tamaño de pantalla

### Badges

- Números rojos sobre los iconos
- Se muestran cuando `badge > 0`
- Estilo consistente con tokens UBITS

### Menú Flotante

- Se abre desde el tab del menú
- Secciones con iconos y títulos
- Subitems anidados
- Links directos o con subitems

---

## 🚨 Errores Comunes

### Error 1: No Proporcionar Tabs
**Problema:** Crear TabBar sin tabs  
**Solución:** Siempre proporcionar al menos un tab

```javascript
// ❌ Incorrecto
window.createTabBar({});

// ✅ Correcto
window.createTabBar({
  tabs: [
    { id: 'home', label: 'Inicio', icon: 'home', url: 'home.html' }
  ]
});
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

### Error 3: Tabs sin IDs Únicos
**Problema:** Múltiples tabs con el mismo ID  
**Solución:** Cada tab debe tener un ID único

```javascript
// ❌ Incorrecto
tabs: [
  { id: 'tab', label: 'Tab 1' },
  { id: 'tab', label: 'Tab 2' } // ID duplicado
]

// ✅ Correcto
tabs: [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' }
]
```

### Error 4: Menú Flotante sin Configurar
**Problema:** Tab de menú sin menú flotante configurado  
**Solución:** Configurar `floatingMenuSections` cuando hay un tab de menú

```javascript
// ❌ Incorrecto - tab de menú sin menú
tabs: [
  { id: 'menu', label: 'Menú', icon: 'bars' }
  // Falta floatingMenuSections
]

// ✅ Correcto - menú configurado
tabs: [
  { id: 'menu', label: 'Menú', icon: 'bars' }
],
floatingMenuSections: [
  {
    id: 'section1',
    title: 'Sección 1',
    icon: 'home',
    subitems: [...]
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

