# Templates UBITS Desktop

## 📋 Descripción

Templates completos de UBITS para modo Administrador y Colaborador. Incluyen Sidebar, TabBar, SubNav y todos los componentes del sistema de diseño UBITS. Estos templates representan las vistas completas de escritorio de las aplicaciones UBITS.

Los templates son archivos HTML completos que proporcionan una estructura base lista para usar, con todos los componentes de navegación y estilos UBITS preconfigurados.

---

## 🔗 Enlaces Rápidos

- **Storybook Local:** [Templates UBITS Desktop - Default](http://localhost:6006/?path=/story/templates-templates-ubits-desktop--default)
- **Storybook Vercel:** [Templates UBITS Desktop](https://ubits-storybook10.vercel.app/?path=/story/templates-templates-ubits-desktop--default)
- **Archivos HTML:**
  - Template Administrador: `vendor/ubits/packages/templates/template-admin.html`
  - Template Colaborador: `vendor/ubits/packages/templates/template-colaborador.html`

---

## 📖 Stories Disponibles

### Default

Template completo con Sidebar, TabBar, SubNav y área de contenido.

**Código de ejemplo:**

```javascript
// El template se carga desde un archivo HTML completo
// En Storybook, se muestra en un iframe

// Template Administrador
{
  template: 'admin'
}

// Template Colaborador (default)
{
  template: 'colaborador'
}
```

**Opciones:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `template` | `'admin' \| 'colaborador'` | `'colaborador'` | Template a mostrar: Administrador o Colaborador |

---

## 🎨 Características Principales

### Template Administrador

- **Sidebar:** Navegación lateral con menú completo para administradores
- **TabBar:** Barra de navegación superior con opciones administrativas
- **SubNav:** Navegación secundaria horizontal
- **Área de contenido:** Contenedor principal (`.content-area`) para el contenido de la aplicación
- **Componentes incluidos:** Todos los componentes UBITS preconfigurados
- **Tema:** Soporte para modo claro y oscuro

### Template Colaborador

- **Sidebar:** Navegación lateral con menú para colaboradores
- **TabBar:** Barra de navegación superior con opciones de colaborador
- **SubNav:** Navegación secundaria horizontal
- **Área de contenido:** Contenedor principal (`.content-area`) para el contenido de la aplicación
- **Componentes incluidos:** Todos los componentes UBITS preconfigurados
- **Tema:** Soporte para modo claro y oscuro

---

## 📦 Componentes Incluidos

Los templates incluyen todos los estilos CSS de los siguientes componentes:

### Navegación
- Sidebar
- SubNav
- TabBar

### Componentes Básicos
- Status Tag
- Avatar
- Button
- Badge
- Scrollbar
- Spinner
- Skeleton

### Feedback
- Drawer Navigation
- Modal
- Alert
- Toast
- Tooltip
- Empty State

### Formularios
- Input
- Checkbox
- Toggle
- Radio Button
- File Upload
- Calendar

### Data
- Data Table
- List
- Pagination

### Layout
- Card
- Selection Card
- Header Section
- Tabs
- Segment Control
- Breadcrumb
- Stepper

### Otros
- Progress
- Participants Menu
- Metric Card

---

## 🚀 Uso

### En Storybook

El template se muestra en un iframe que carga el archivo HTML correspondiente:

```javascript
// Template Administrador
{
  template: 'admin'
}

// Template Colaborador
{
  template: 'colaborador'
}
```

### En un Proyecto

Los templates están ubicados en:
- `vendor/ubits/packages/templates/template-admin.html`
- `vendor/ubits/packages/templates/template-colaborador.html`

Puedes usar estos archivos como base para crear tus propias páginas o copiarlos a tu proyecto.

---

## 🎯 Estructura del Template

### HTML Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UBITS Proyecto - Template [Admin/Colaborador]</title>
    
    <!-- UBITS Base Styles -->
    <link rel="stylesheet" href="../tokens/dist/tokens.css" />
    <link rel="stylesheet" href="../typography/fonts.css" />
    <link rel="stylesheet" href="../typography/tokens-typography.css" />
    
    <!-- FontAwesome Pro -->
    <link rel="stylesheet" href="assets/fontawesome/css/all.min.css" />
    
    <!-- Navigation Components -->
    <link rel="stylesheet" href="../components/sidebar/src/styles/sidebar.css" />
    <link rel="stylesheet" href="../components/subnav/src/styles/subnav.css" />
    <link rel="stylesheet" href="../components/tabbar/src/styles/tabbar.css" />
    
    <!-- UBITS Component Styles -->
    <!-- ... todos los componentes ... -->
</head>
<body>
    <div class="dashboard-container">
        <!-- Sidebar -->
        <!-- TabBar -->
        <!-- SubNav -->
        <!-- Content Area -->
    </div>
</body>
</html>
```

### Estructura Principal

```
.dashboard-container
├── .sidebar-container (Sidebar)
├── .main-content
│   ├── .tabbar-container (TabBar)
│   ├── .subnav-container (SubNav)
│   └── .content-area (Área de contenido)
```

---

## ⚙️ Configuración

### Inicialización de Componentes

Los templates incluyen scripts de inicialización para:

1. **Sidebar:** `window.createSidebar()`
2. **TabBar:** `window.createTabBar()`
3. **SubNav:** `window.createSubNav()`

### Gestión de Tema

Los templates sincronizan automáticamente el tema con Storybook cuando se muestran en un iframe.

### ContentManager

El área de contenido (`.content-area`) está gestionada por el `ContentManager`, que permite actualizar el contenido dinámicamente.

---

## 🔧 Personalización

### Modificar el Template

1. Copia el archivo HTML del template que necesites
2. Modifica la estructura según tus necesidades
3. Ajusta los componentes de navegación según el rol (admin/colaborador)
4. Personaliza el contenido del área principal

### Agregar Componentes

Para agregar nuevos componentes al template:

1. Agrega el link del CSS del componente en el `<head>`
2. Inicializa el componente en el script de inicialización
3. Agrega el HTML del componente en el área correspondiente

---

## 📝 Notas Importantes

1. **ContentManager:** El área de contenido (`.content-area`) está gestionada por el `ContentManager`. Si agregas elementos directamente, asegúrate de interceptar el método `updateContent` si es necesario.

2. **Tema:** Los templates soportan modo claro y oscuro. El tema se sincroniza automáticamente cuando se muestra en Storybook.

3. **Responsive:** Los templates están diseñados para escritorio. Para móvil, usa los componentes de navegación móvil (TabBar con variante móvil).

4. **Tokens UBITS:** Todos los estilos usan tokens UBITS. No sobrescribas con `!important` a menos que sea absolutamente necesario.

---

## 🐛 Errores Comunes

### Template no carga en Storybook

- Verifica que el archivo HTML exista en la ruta correcta
- Revisa la consola del navegador para errores de carga
- Asegúrate de que todos los recursos (CSS, JS) estén disponibles

### Tema no se sincroniza

- El tema se sincroniza automáticamente en Storybook
- Si no funciona, verifica que el iframe tenga los permisos correctos (`sandbox`)

### Componentes no se inicializan

- Verifica que los scripts de inicialización estén cargados
- Revisa que los componentes estén disponibles en `window.UBITS`
- Asegúrate de que el orden de carga sea correcto

---

## 📚 Referencias

- [Guía de uso de componentes UBITS](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Documentación de Sidebar](./navegacin-sidebar.md)
- [Documentación de TabBar](./navegacin-tab-bar.md)
- [Documentación de SubNav](./navegacin-subnav.md)
- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)

---

**Última actualización:** 2025-12-05

