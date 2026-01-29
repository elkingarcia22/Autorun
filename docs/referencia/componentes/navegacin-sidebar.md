# 📦 Sidebar

> **Componente UBITS:** `navegacion-sidebar`  
> **Categoría:** Navegación  
> **API:** `window.createSidebar()` o `<ubits-sidebar>`  
> **Storybook Local:** http://localhost:6006/?path=/story/navegacion-sidebar--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-sidebar--default

## 🎯 Descripción

Componente Sidebar UBITS de navegación lateral con 2 variantes (colaborador y admin). Incluye tooltips, menú de perfil, dark mode toggle y ajuste dinámico de altura. Ancho fijo 96px, colores fijos (no cambian con tema).

**Características principales:**
- Dos variantes: `colaborador` y `admin`
- Ancho fijo de 96px
- Tooltips en botones al hacer hover
- Menú de perfil con avatar
- Toggle de dark mode (opcional)
- Botones de navegación configurables
- Logo configurable
- Altura dinámica ajustable
- Colores fijos (no cambian con tema)

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/navegacion-sidebar--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-sidebar--default
- **Código fuente:** `vendor/ubits/packages/components/sidebar/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/sidebar/src/types/SidebarOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Sidebar.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `navegacion-sidebar--default`  
**URL Local:** http://localhost:6006/?path=/story/navegacion-sidebar--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/navegacion-sidebar--default

**Descripción:**
Sidebar con todos los controles disponibles. Permite configurar variante, botón activo, dark mode toggle, logo y avatar.

**Características mostradas:**
- Variante configurable (colaborador o admin)
- Botón activo configurable
- Dark mode toggle opcional
- Logo y avatar configurables
- Botones de navegación según variante

**Código de ejemplo:**
```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  activeButton: 'inicio',
  darkModeEnabled: true,
  logoImage: '/images/Ubits-logo.svg',
  avatarImage: '/images/Profile-image.jpg',
  onActiveButtonChange: (section) => {
    console.log('Sección activa:', section);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `variant`: `'colaborador'` - Variante colaborador
- `activeButton`: `''` - Sin botón activo inicialmente
- `darkModeEnabled`: `true` - Dark mode toggle habilitado
- `logoImage`: `'/images/Ubits-logo.svg'` - Ruta del logo
- `avatarImage`: `'/images/Profile-image.jpg'` - Ruta del avatar

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el sidebar |
| `variant` | `string` | `'colaborador'` | Variante del sidebar. Opciones: `colaborador`, `admin` |
| `activeButton` | `string` | `''` | Sección activa del sidebar. Depende de la variante. Opciones: `''`, `admin`, `aprendizaje`, `diagnóstico`, `desempeño`, `encuestas`, `reclutamiento`, `tareas`, `ubits-ai`, `inicio`, `empresa` |
| `darkModeEnabled` | `boolean` | `true` | Si el dark mode toggle está habilitado |
| `logoImage` | `string` | - | Ruta de la imagen del logo (ej: `'/images/Ubits-logo.svg'`) |
| `logoHref` | `string` | - | URL de destino al hacer click en el logo |
| `avatarImage` | `string` | - | Ruta de la imagen del avatar (ej: `'/images/Profile-image.jpg'`) |
| `bodyButtons` | `SidebarButton[]` | - | Array de botones del cuerpo del sidebar |
| `footerButtons` | `SidebarButton[]` | - | Array de botones del footer del sidebar |
| `profileMenuItems` | `ProfileMenuItem[]` | - | Array de items del menú de perfil |
| `height` | `number` | - | Altura del sidebar en píxeles |
| `onActiveButtonChange` | `function` | - | Callback que se ejecuta cuando cambia el botón activo |
| `onDarkModeToggle` | `function` | - | Callback que se ejecuta cuando se toggle el dark mode |
| `onAvatarClick` | `function` | - | Callback que se ejecuta cuando se hace click en el avatar |

### Estructura de SidebarButton

```typescript
interface SidebarButton {
  section: string;      // ID de la sección (ej: 'inicio', 'aprendizaje')
  icon: string;         // Icono FontAwesome (ej: 'far fa-home')
  tooltip: string;      // Texto del tooltip
  state?: 'default' | 'active';  // Estado del botón
  href?: string;        // URL de destino (opcional)
}
```

### Estructura de ProfileMenuItem

```typescript
interface ProfileMenuItem {
  label: string;        // Texto del item
  icon?: string;        // Icono FontAwesome (opcional)
  href?: string;        // URL de destino (opcional)
  onClick?: () => void; // Callback al hacer click (opcional)
}
```

---

## 🎨 Variantes

### Variante: Colaborador

Botones disponibles:
- `inicio` - Inicio
- `aprendizaje` - Aprendizaje
- `diagnóstico` - Diagnóstico
- `desempeño` - Desempeño
- `encuestas` - Encuestas
- `reclutamiento` - Reclutamiento
- `tareas` - Tareas
- `ubits-ai` - UBITS AI

### Variante: Admin

Botones disponibles:
- `admin` - Admin
- `aprendizaje` - Aprendizaje
- `desempeño` - Desempeño
- `encuestas` - Encuestas
- `tareas` - Tareas
- `empresa` - Empresa

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Sidebar Básico Colaborador

```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  activeButton: 'inicio',
  darkModeEnabled: true,
  logoImage: '/images/Ubits-logo.svg',
  avatarImage: '/images/Profile-image.jpg',
  onActiveButtonChange: (section) => {
    console.log('Navegar a:', section);
    // Actualizar contenido según la sección
  }
});
```

### Ejemplo 2: Sidebar Admin

```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'admin',
  activeButton: 'admin',
  darkModeEnabled: true,
  logoImage: '/images/Ubits-logo.svg',
  logoHref: 'admin.html',
  avatarImage: '/images/Profile-image.jpg',
  onActiveButtonChange: (section) => {
    console.log('Sección admin:', section);
  }
});
```

### Ejemplo 3: Sidebar sin Dark Mode

```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  activeButton: 'inicio',
  darkModeEnabled: false, // Deshabilitar dark mode toggle
  logoImage: '/images/Ubits-logo.svg',
  avatarImage: '/images/Profile-image.jpg'
});
```

### Ejemplo 4: Sidebar con Callbacks Personalizados

```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  activeButton: 'inicio',
  darkModeEnabled: true,
  logoImage: '/images/Ubits-logo.svg',
  avatarImage: '/images/Profile-image.jpg',
  onActiveButtonChange: (section) => {
    // Navegar a la sección
    navigateToSection(section);
    // Actualizar estado
    updateActiveSection(section);
  },
  onDarkModeToggle: (isDark) => {
    console.log('Dark mode:', isDark);
    // Guardar preferencia
    saveDarkModePreference(isDark);
  },
  onAvatarClick: () => {
    // Abrir menú de perfil
    openProfileMenu();
  }
});
```

### Ejemplo 5: Sidebar con Altura Personalizada

```javascript
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  activeButton: 'inicio',
  darkModeEnabled: true,
  logoImage: '/images/Ubits-logo.svg',
  avatarImage: '/images/Profile-image.jpg',
  height: 800, // Altura personalizada
  onActiveButtonChange: (section) => {
    console.log('Sección:', section);
  }
});
```

---

## 🔄 Callbacks y Eventos

### onActiveButtonChange

Se ejecuta cuando el usuario hace click en un botón del sidebar.

```javascript
onActiveButtonChange: (section) => {
  console.log('Sección activa:', section);
  
  // Navegar a la sección
  switch(section) {
    case 'inicio':
      showDashboard();
      break;
    case 'aprendizaje':
      showLearning();
      break;
    // ...
  }
}
```

**Parámetros:**
- `section` (string): ID de la sección seleccionada

### onDarkModeToggle

Se ejecuta cuando el usuario toggle el dark mode.

```javascript
onDarkModeToggle: (isDark) => {
  console.log('Dark mode:', isDark);
  
  // Aplicar dark mode al documento
  if (isDark) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  
  // Guardar preferencia
  localStorage.setItem('darkMode', isDark);
}
```

**Parámetros:**
- `isDark` (boolean): `true` si dark mode está activo, `false` si está inactivo

### onAvatarClick

Se ejecuta cuando el usuario hace click en el avatar.

```javascript
onAvatarClick: () => {
  console.log('Avatar clickeado');
  
  // Abrir menú de perfil
  openProfileMenu();
  
  // O navegar a perfil
  navigateTo('/profile');
}
```

---

## 🎨 Características Visuales

### Dimensiones

- **Ancho:** 96px (fijo)
- **Altura:** Configurable (default: altura del viewport)
- **Posición:** Fija a la izquierda

### Colores

- **Fondo:** Colores fijos (no cambian con tema)
- **Botones activos:** Fondo azul con icono y tooltip en color oscuro
- **Botones inactivos:** Fondo transparente con icono y tooltip en gris

### Tooltips

- Aparecen al hacer hover sobre los botones
- Muestran el nombre de la sección
- Posicionados a la derecha del sidebar

---

## 🚨 Errores Comunes

### Error 1: No Proporcionar Configuración de Botones
**Problema:** Intentar crear sidebar sin configuración de botones  
**Solución:** Usar `getSidebarConfig()` o proporcionar `bodyButtons` y `footerButtons` manualmente

```javascript
// ❌ Incorrecto - falta configuración
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador'
  // Falta bodyButtons, footerButtons, etc.
});

// ✅ Correcto - usar configuración automática
// El componente usa getSidebarConfig() internamente
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  activeButton: 'inicio'
});
```

### Error 2: activeButton No Coincide con Variante
**Problema:** Usar `activeButton: 'admin'` en variante `colaborador`  
**Solución:** Asegurar que `activeButton` sea válido para la variante seleccionada

```javascript
// ❌ Incorrecto
variant: 'colaborador',
activeButton: 'admin'  // No existe en variante colaborador

// ✅ Correcto
variant: 'colaborador',
activeButton: 'inicio'  // Válido para colaborador
```

### Error 3: No Manejar Cambios de Sección
**Problema:** No implementar `onActiveButtonChange` para actualizar contenido  
**Solución:** Siempre implementar el callback para actualizar la UI

```javascript
// ❌ Incorrecto - no actualiza contenido
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  activeButton: 'inicio'
  // Falta onActiveButtonChange
});

// ✅ Correcto - actualiza contenido
window.createSidebar({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  activeButton: 'inicio',
  onActiveButtonChange: (section) => {
    updateContent(section);
  }
});
```

### Error 4: Rutas de Imágenes Incorrectas
**Problema:** Usar rutas relativas incorrectas para logo o avatar  
**Solución:** Usar rutas absolutas desde la raíz del proyecto

```javascript
// ❌ Incorrecto - ruta relativa
logoImage: 'images/logo.svg'

// ✅ Correcto - ruta absoluta
logoImage: '/images/Ubits-logo.svg'
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
