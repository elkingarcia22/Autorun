# 📦 Sidebar

> **Componente UBITS:** `sidebar`  
> **API:** `window.createSidebar()`  
> **Storybook:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-sidebar--default

## 🎯 Descripción

Componente Sidebar UBITS de navegación lateral con 2 variantes (colaborador y admin). Incluye tooltips, menú de perfil, dark mode toggle y ajuste dinámico de altura. Ancho fijo 96px, colores fijos (no cambian con tema).

## 🔗 Enlaces Rápidos

- **Storybook en Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-sidebar--default
- **Código fuente:** `vendor/ubits/packages/components/sidebar/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/sidebar/src/types/SidebarOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Sidebar.stories.ts`

---

## 📚 Historia de Storybook

### Historia: Default

**ID en Storybook:** `navegacion-sidebar--default`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-sidebar--default

**Descripción:**
Sidebar completo con controles interactivos para configurar variante, botón activo y dark mode. Muestra panel de información con el estado actual.

**Características mostradas:**
- 2 variantes (colaborador y admin)
- Botones de navegación con tooltips
- Menú de perfil con avatar
- Toggle de dark mode
- Ajuste dinámico de altura
- Panel de información interactivo

**Código de ejemplo básico:**
```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  bodyButtons: [
    {
      section: 'inicio',
      icon: 'far fa-home',
      tooltip: 'Inicio',
      href: 'index.html'
    }
  ],
  profileMenuItems: [
    { icon: 'far fa-user', label: 'Mi perfil', href: 'profile.html' }
  ],
  darkModeEnabled: true
});
```

---

## ⚙️ Opciones y Props Completas

### Opciones Principales

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `containerId` | `string` | **REQUERIDO** | ID del contenedor donde se renderizará el sidebar |
| `variant` | `'colaborador' \| 'admin'` | `'colaborador'` | Variante del sidebar |
| `bodyButtons` | `SidebarButton[]` | **REQUERIDO** | Botones del body (navegación principal) |
| `footerButtons` | `SidebarFooterButton[]` | `undefined` | Botones del footer (solo admin: API, Centro de ayuda) |
| `profileMenuItems` | `ProfileMenuItem[]` | `undefined` | Items del menú de perfil |
| `logoHref` | `string` | `'index.html'` o `'admin.html'` | URL del logo (según variant) |
| `logoImage` | `string` | `'images/Ubits-logo.svg'` | URL de la imagen del logo |
| `avatarImage` | `string` | `'images/Profile-image.jpg'` | URL de la imagen del avatar |
| `height` | `number \| string` | `undefined` | Altura del sidebar (ajuste dinámico si no se especifica) |
| `darkModeEnabled` | `boolean` | `true` | Si el dark mode toggle está habilitado |
| `className` | `string` | `undefined` | Clases CSS adicionales |

### Callbacks

| Callback | Tipo | Descripción |
|----------|------|-------------|
| `onActiveButtonChange` | `(section: string) => void` | Se dispara cuando cambia el botón activo |
| `onAvatarClick` | `() => void` | Se dispara cuando se hace click en el avatar |
| `onDarkModeToggle` | `(isDark: boolean) => void` | Se dispara cuando se cambia el dark mode |

---

## 🎨 Variantes

### Variante: Colaborador

**Características:**
- Módulos básicos: Inicio, Empresa, Aprendizaje, Desempeño, etc.
- Sin botones en el footer
- Logo redirige a `index.html`

**Módulos disponibles:**
- `inicio`
- `empresa`
- `aprendizaje`
- `desempeño`
- `encuestas`
- `reclutamiento`
- `tareas`
- `ubits-ai`

### Variante: Admin

**Características:**
- Módulos administrativos: Admin, Diagnóstico, etc.
- Botones en el footer: API, Centro de ayuda
- Logo redirige a `admin.html`

**Módulos disponibles:**
- `admin`
- `diagnóstico`
- Y otros módulos administrativos

---

## 📋 Estructura de Datos

### SidebarButton

```typescript
interface SidebarButton {
  section: string;                    // ID único de la sección (data-section)
  icon: string;                       // Icono FontAwesome (clase completa, ej: "far fa-home")
  tooltip: string;                    // Texto del tooltip
  href?: string;                      // URL a la que redirige (opcional)
  onClick?: (event: MouseEvent) => void; // Callback cuando se hace click (opcional)
  state?: 'default' | 'active' | 'disabled'; // Estado del botón
}
```

**Ejemplo:**
```javascript
{
  section: 'inicio',
  icon: 'far fa-home',
  tooltip: 'Inicio',
  href: 'index.html',
  state: 'active'
}
```

### SidebarFooterButton

```typescript
interface SidebarFooterButton extends SidebarButton {
  id?: string;  // ID especial para botones del footer (ej: 'darkmode-toggle')
}
```

**Ejemplo:**
```javascript
{
  id: 'api-button',
  section: 'api',
  icon: 'far fa-code',
  tooltip: 'API',
  href: 'api.html'
}
```

### ProfileMenuItem

```typescript
interface ProfileMenuItem {
  icon: string;              // Icono FontAwesome
  label: string;              // Texto del item
  href?: string;              // URL a la que redirige (opcional)
  onClick?: () => void;       // Callback cuando se hace click (opcional)
  divider?: boolean;          // Si es un divider (separador)
}
```

**Ejemplo:**
```javascript
{
  icon: 'far fa-user',
  label: 'Mi perfil',
  href: 'profile.html'
},
{
  divider: true  // Separador visual
},
{
  icon: 'far fa-sign-out-alt',
  label: 'Cerrar sesión',
  onClick: () => {
    console.log('Cerrar sesión');
  }
}
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Sidebar Básico (Colaborador)
```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  bodyButtons: [
    {
      section: 'inicio',
      icon: 'far fa-home',
      tooltip: 'Inicio',
      href: 'index.html',
      state: 'active'
    },
    {
      section: 'empresa',
      icon: 'far fa-building',
      tooltip: 'Empresa',
      href: 'empresa.html'
    }
  ],
  profileMenuItems: [
    { icon: 'far fa-user', label: 'Mi perfil', href: 'profile.html' },
    { divider: true },
    { icon: 'far fa-sign-out-alt', label: 'Cerrar sesión', onClick: () => logout() }
  ],
  darkModeEnabled: true
});
```

### Ejemplo 2: Sidebar Admin
```javascript
window.createSidebar({
  containerId: 'sidebar-admin',
  variant: 'admin',
  bodyButtons: [
    {
      section: 'admin',
      icon: 'far fa-cog',
      tooltip: 'Administración',
      href: 'admin.html',
      state: 'active'
    },
    {
      section: 'diagnóstico',
      icon: 'far fa-chart-line',
      tooltip: 'Diagnóstico',
      href: 'diagnostico.html'
    }
  ],
  footerButtons: [
    {
      id: 'api-button',
      section: 'api',
      icon: 'far fa-code',
      tooltip: 'API',
      href: 'api.html'
    },
    {
      id: 'help-button',
      section: 'help',
      icon: 'far fa-question-circle',
      tooltip: 'Centro de ayuda',
      href: 'help.html'
    }
  ],
  profileMenuItems: [
    { icon: 'far fa-user', label: 'Mi perfil' },
    { icon: 'far fa-cog', label: 'Configuración' },
    { divider: true },
    { icon: 'far fa-sign-out-alt', label: 'Cerrar sesión' }
  ]
});
```

### Ejemplo 3: Sidebar con Callbacks
```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  bodyButtons: [
    {
      section: 'inicio',
      icon: 'far fa-home',
      tooltip: 'Inicio',
      onClick: (event) => {
        event.preventDefault();
        navigateTo('inicio');
      }
    }
  ],
  onActiveButtonChange: (section) => {
    console.log('Sección activa:', section);
    // Actualizar contenido según la sección
    updateContent(section);
  },
  onAvatarClick: () => {
    console.log('Avatar clickeado');
    // Abrir menú de perfil
    openProfileMenu();
  },
  onDarkModeToggle: (isDark) => {
    console.log('Dark mode:', isDark);
    // Guardar preferencia
    saveThemePreference(isDark);
  }
});
```

### Ejemplo 4: Sidebar con Altura Personalizada
```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  height: 800,  // Altura fija en píxeles
  bodyButtons: [...],
  profileMenuItems: [...]
});
```

### Ejemplo 5: Sidebar sin Dark Mode
```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  darkModeEnabled: false,  // Deshabilitar toggle de dark mode
  bodyButtons: [...],
  profileMenuItems: [...]
});
```

---

## 🎨 Características Visuales

### Dimensiones
- **Ancho:** 96px (fijo)
- **Altura:** Dinámica (se ajusta al contenido) o personalizada

### Colores
- **Colores fijos:** No cambian con el tema (light/dark mode)
- **Tooltips:** Aparecen al hacer hover sobre los botones
- **Estado activo:** Botón resaltado visualmente

### Comportamiento
- **Tooltips:** Se muestran al hacer hover sobre los botones
- **Menú de perfil:** Se muestra al hacer hover sobre el avatar
- **Dark mode toggle:** Solo visible si `darkModeEnabled: true`

---

## 🚨 Errores Comunes

### Error 1: No Especificar containerId
**Problema:** Olvidar especificar `containerId` (es requerido)  
**Solución:** Siempre incluir `containerId` al crear el sidebar

### Error 2: No Proporcionar bodyButtons
**Problema:** Usar `bodyButtons: []` o no proporcionarlo  
**Solución:** Siempre proporcionar al menos un botón en `bodyButtons`

### Error 3: Usar Iconos Incorrectos
**Problema:** Usar solo el nombre del icono sin prefijo  
**Solución:** Usar clase completa de FontAwesome (ej: `'far fa-home'`)

### Error 4: Confundir Variantes
**Problema:** Usar módulos de una variante en otra  
**Solución:** Verificar qué módulos están disponibles en cada variante

---

## 🎨 Tokens Utilizados

- **Colores fijos:** No usa tokens de tema (colores fijos)
- **Espaciado:** Espaciado interno del sidebar
- **Tipografía:** Fuentes del sistema

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)

---

## 🔧 Configuración de Módulos

El sidebar usa configuraciones predefinidas según la variante. Para ver las configuraciones disponibles:

```javascript
import { getSidebarConfig } from 'vendor/ubits/packages/components/sidebar/src/configs/sidebarVariants';

const config = getSidebarConfig('colaborador');
// Retorna: { bodyButtons, footerButtons, profileMenuItems }
```

---

**Última actualización:** 2025-01-03  
**Versión Storybook consultada:** ubits-storybook10.vercel.app
