# 📄 Guía de Configuración de Templates UBITS

Esta guía contiene toda la información necesaria para configurar y ejecutar los templates de Administrador y Colaborador correctamente.

## 🎯 Templates Disponibles

- **Template Administrador** (`template-admin.html`) - Modo administrador con acceso completo
- **Template Colaborador** (`template-colaborador.html`) - Modo colaborador con módulos básicos

## 📋 Requisitos Previos

Antes de usar los templates, asegúrate de tener:

1. ✅ Tokens generados (`npm run build:tokens`)
2. ✅ Dependencias instaladas (`npm install`)
3. ✅ Componentes compilados (si es necesario)
4. ✅ Servidor HTTP local (los templates no funcionan con `file://`)

## 🚀 Inicio Rápido

### Opción 1: Servidor HTTP Simple (Recomendado)

```bash
# Desde la raíz del proyecto
cd packages/templates

# Usar Python (si está instalado)
python3 -m http.server 8000

# O usar Node.js http-server
npx http-server -p 8000

# O usar PHP
php -S localhost:8000
```

Luego abre en el navegador:
- **Administrador**: `http://localhost:8000/template-admin.html`
- **Colaborador**: `http://localhost:8000/template-colaborador.html`

### Opción 2: Vite Dev Server

```bash
# Desde la raíz del proyecto
npm run dev:templates
```

## 📁 Estructura de Archivos Requerida

```
packages/templates/
├── template-admin.html          # Template administrador
├── template-colaborador.html    # Template colaborador
├── components-loader.js         # Cargador de componentes
├── config/
│   ├── products.js              # Configuración de productos/modos
│   ├── theme-manager.js         # Gestión de temas
│   └── responsive-manager.js    # Gestión responsive
├── engine/
│   ├── template-loader.js       # Cargador de templates
│   └── content-manager.js       # Gestor de contenido
├── assets/
│   ├── fontawesome/             # FontAwesome Pro
│   └── images/                  # Imágenes
└── utils/
    └── path-resolver.js         # Resolvedor de rutas
```

## 🔧 Configuración de Archivos

### 1. Verificar Rutas de CSS

Los templates deben importar los CSS desde `../components/` (NO `../addons/`):

```html
<!-- ✅ CORRECTO -->
<link rel="stylesheet" href="../components/sidebar/src/styles/sidebar.css" />

<!-- ❌ INCORRECTO -->
<link rel="stylesheet" href="../addons/sidebar/src/styles/sidebar.css" />
```

### 2. CSS Requeridos en los Templates

Los templates deben incluir estos CSS:

**Base:**
- `../tokens/dist/tokens.css`
- `../typography/fonts.css`
- `../typography/tokens-typography.css`
- `assets/fontawesome/css/all.min.css`

**Navegación:**
- `../components/sidebar/src/styles/sidebar.css`
- `../components/subnav/src/styles/subnav.css`
- `../components/tabbar/src/styles/tabbar.css`

**Componentes:**
- Status Tag, Avatar, Drawer, Modal, Scroll
- Progress, File Upload, Button, Badge, Alert
- Toast, List, Input, Card, Data Table
- Pagination, Checkbox, Toggle, Radio Button
- Selection Card, Empty State, Tooltip, Spinner
- Calendar, Tabs, Segment Control, Breadcrumb
- Stepper, Participants Menu, Metric Card

### 3. Scripts Requeridos

Los templates deben cargar estos scripts en orden:

```html
<script src="components-loader.js"></script>
<script src="config/products.js"></script>
<script src="config/theme-manager.js"></script>
<script src="config/responsive-manager.js"></script>
<script src="engine/template-loader.js"></script>
<script src="engine/content-manager.js"></script>
```

## 🐛 Problemas Comunes y Soluciones

### Problema 1: "Failed to load resource" (404 en CSS)

**Síntomas:** Los estilos no se cargan, componentes sin estilos.

**Solución:**
1. Verifica que las rutas usen `../components/` (no `../addons/`)
2. Verifica que los tokens estén generados: `npm run build:tokens`
3. Verifica que los archivos CSS existan en `packages/components/[component]/src/styles/`

### Problema 2: "CORS policy" o "file:// protocol"

**Síntomas:** Los templates no cargan en el navegador, errores de CORS.

**Solución:**
- **NO uses `file://`** - Los templates requieren un servidor HTTP
- Usa un servidor local (Python, Node.js, PHP, etc.)
- O usa Vite dev server

### Problema 3: Componentes no se renderizan

**Síntomas:** Los contenedores están vacíos, no aparecen sidebar/tabbar.

**Solución:**
1. Verifica que `components-loader.js` esté cargado
2. Verifica la consola del navegador para errores JavaScript
3. Verifica que `products.js` tenga la configuración correcta
4. Verifica que los contenedores tengan los IDs correctos:
   - `sidebar-container`
   - `top-nav-container`
   - `tab-bar-container`

### Problema 4: Iconos de FontAwesome no aparecen

**Síntomas:** Los iconos no se muestran, aparecen cuadrados vacíos.

**Solución:**
1. Verifica que `assets/fontawesome/css/all.min.css` esté cargado
2. Verifica que las fuentes estén en `assets/fontawesome/webfonts/`
3. Verifica que las rutas sean relativas correctamente

### Problema 5: Colores incorrectos o sin tema

**Síntomas:** Los colores no se ven bien, no cambia el tema.

**Solución:**
1. Regenera los tokens: `npm run build:tokens`
2. Verifica que `tokens.css` esté cargado
3. Verifica que `theme-manager.js` esté inicializado
4. Verifica el atributo `data-theme` en `<body>`

## 📝 Checklist de Verificación

Antes de abrir los templates, verifica:

- [ ] Tokens generados (`npm run build:tokens` desde la raíz)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor HTTP corriendo (NO usar `file://`)
- [ ] Rutas CSS usan `../components/` (no `../addons/`)
- [ ] Todos los CSS de componentes están importados
- [ ] Scripts están en el orden correcto
- [ ] FontAwesome está en `assets/fontawesome/`
- [ ] Imágenes están en `assets/images/`
- [ ] Contenedores tienen los IDs correctos
- [ ] Consola del navegador sin errores críticos

## 🔍 Verificación Rápida

Ejecuta el script de verificación:

```bash
cd packages/templates
./verificar-setup.sh
```

Este script verifica:
- ✅ Archivos de templates existen
- ✅ Rutas CSS correctas
- ✅ Scripts requeridos existen
- ✅ Assets (FontAwesome, imágenes) existen
- ✅ Tokens generados

## 🎨 Configuración de Productos

Los templates usan `config/products.js` para configurar los modos:

### Modo Colaborador

```javascript
{
  id: 'colaborador',
  name: 'Colaborador',
  sidebar: {
    variant: 'colaborador',
    bodyButtons: [...],
    footerButtons: [...]
  },
  tabbar: {
    items: [...]
  }
}
```

### Modo Administrador

```javascript
{
  id: 'admin',
  name: 'Administrador',
  sidebar: {
    variant: 'admin',
    bodyButtons: [...],
    footerButtons: [...]
  }
}
```

## 📱 Responsive Design

Los templates son responsive:

- **Desktop (≥1024px)**: Sidebar visible, TabBar oculto
- **Móvil (<1024px)**: Sidebar oculto, TabBar visible

El `responsive-manager.js` maneja esto automáticamente.

## 🎯 Flujo de Carga

1. **HTML carga** → Estilos base y CSS de componentes
2. **Scripts cargan** → `components-loader.js`, `products.js`, etc.
3. **DOMContentLoaded** → Se inicializan los managers
4. **TemplateLoader** → Carga los componentes (Sidebar, SubNav, TabBar)
5. **ContentManager** → Gestiona el contenido dinámico
6. **ResponsiveManager** → Adapta los componentes al tamaño de pantalla

## 🔄 Comandos Útiles

```bash
# Regenerar tokens
npm run build:tokens

# Iniciar servidor simple con Python
cd packages/templates && python3 -m http.server 8000

# Iniciar servidor con Node.js
cd packages/templates && npx http-server -p 8000

# Verificar configuración
cd packages/templates && ./verificar-setup.sh

# Ver logs en consola del navegador
# Abre DevTools (F12) y revisa la consola
```

## 📚 Archivos de Configuración Completos

### template-admin.html (Head Section)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UBITS Proyecto - Template Administrador</title>
    
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
    <!-- (Todos los CSS de componentes listados arriba) -->
</head>
```

### template-colaborador.html (Head Section)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UBITS Proyecto - Template Colaborador</title>
    
    <!-- (Misma estructura que template-admin.html) -->
</head>
```

## ⚠️ Notas Importantes

1. **Siempre usa servidor HTTP** - Los templates NO funcionan con `file://`
2. **Rutas relativas** - Los templates usan rutas relativas desde `packages/templates/`
3. **Orden de scripts** - El orden de carga de scripts es crítico
4. **Tokens primero** - Siempre regenera tokens antes de probar cambios
5. **Consola del navegador** - Revisa siempre la consola para errores

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Sin estilos | Verifica rutas CSS y regenera tokens |
| CORS error | Usa servidor HTTP, no `file://` |
| Componentes vacíos | Verifica IDs de contenedores y scripts |
| Sin iconos | Verifica FontAwesome CSS y webfonts |
| Colores incorrectos | Regenera tokens con `npm run build:tokens` |

## 🔗 Enlaces Relacionados

- [Guía de Storybook](../storybook/SETUP-STORYBOOK.md)
- [README Principal](../../README.md)
- [Documentación de Componentes](../../docs/)

---

**Última actualización:** Noviembre 2024  
**Versión:** 1.0.0

