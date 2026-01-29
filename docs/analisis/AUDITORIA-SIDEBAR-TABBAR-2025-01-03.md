# Auditoría Profunda: Sidebar y TabBar para Autorun

**Fecha:** 2025-01-03  
**Objetivo:** Verificar que Sidebar y TabBar están completos y sin conflictos con Autorun

---

## 🔍 Problemas Detectados y Corregidos

### ❌ Problema 1: API `getConfig()` no existe

**Error en snippets:**
- Sidebar: `window.UBITS.Sidebar.getConfig('colaborador')` ❌ NO EXISTE
- TabBar: `window.UBITS.TabBar.getConfig('colaborador')` ❌ NO EXISTE

**Solución:**
- `getSidebarConfig()` está en el módulo de configuración, no expuesta globalmente
- `getTabBarConfig()` es una función helper local en la story, no existe globalmente
- Los snippets deben usar la configuración directamente o importar la función

### ❌ Problema 2: Rutas de import inconsistentes

**Estado actual:**
- Sidebar: ✅ Usa `components/sidebar` (CORRECTO)
- TabBar: ✅ Usa `components/tabbar` (CORRECTO)
- Otros componentes: Usan `addons/` (pero `addons/` no existe como directorio)

**Análisis:**
- `addons/` no existe como directorio físico
- Probablemente es un alias o symlink en tiempo de build
- Para Storybook, debemos usar `components/` directamente

### ❌ Problema 3: Snippets no funcionales

**Problemas:**
1. Snippets usan funciones que no existen (`getConfig()`)
2. Snippets no muestran cómo obtener la configuración realmente
3. Snippets no son copiables directamente

---

## ✅ Correcciones Aplicadas

### 1. Sidebar - Snippet Corregido

**Antes (❌ INCORRECTO):**
```javascript
const config = window.UBITS.Sidebar.getConfig('colaborador'); // ❌ NO EXISTE
```

**Después (✅ CORRECTO):**
```javascript
// Opción 1: Importar la función (si se usa en módulo)
import { getSidebarConfig } from '@ubits/sidebar/configs';
const config = getSidebarConfig('colaborador');

// Opción 2: Usar configuración directamente (más simple)
window.UBITS.Sidebar.create({
  containerId: 'sidebar-container',
  variant: 'colaborador',
  bodyButtons: [
    { section: 'admin', icon: 'fa-laptop', tooltip: 'Administrador', href: 'admin.html' },
    { section: 'aprendizaje', icon: 'fa-graduation-cap', tooltip: 'Aprendizaje', href: 'home-learn.html' },
    // ... más botones
  ],
  // ... resto de opciones
});
```

### 2. TabBar - Snippet Corregido

**Antes (❌ INCORRECTO):**
```javascript
const config = window.UBITS.TabBar.getConfig('colaborador'); // ❌ NO EXISTE
```

**Después (✅ CORRECTO):**
```javascript
// Opción 1: Importar configuración (si se usa en módulo)
import { defaultFloatingMenuSections, defaultProfileMenuItems } from '@ubits/tabbar/configs';

// Opción 2: Usar configuración directamente
window.UBITS.TabBar.create({
  containerId: 'tabbar-container',
  items: [
    { id: 'modulos', label: 'Módulos', icon: 'th-large' },
    { id: 'perfil', label: 'Mi perfil', avatar: '/images/Profile-image.jpg' },
    { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' }
  ],
  floatingMenuSections: [
    {
      id: 'aprendizaje',
      title: 'Aprendizaje',
      icon: 'graduation-cap',
      subitems: [
        { id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
        // ... más subitems
      ]
    },
    // ... más secciones
  ],
  profileMenuItems: [
    { id: 'ver-perfil', label: 'Ver mi perfil', icon: 'user', url: 'profile.html' },
    // ... más items
  ],
  // ... resto de opciones
});
```

---

## ✅ Verificación Final

### Sidebar
- ✅ Contrato completo
- ✅ Story Implementation con snippet corregido
- ✅ Render con `data-ubits-id`
- ✅ Rutas de import correctas (`components/`)
- ✅ Dependencias correctas (ninguna)
- ✅ Internals correctos

### TabBar
- ✅ Contrato completo
- ✅ Story Implementation con snippet corregido
- ✅ Render con `data-ubits-id`
- ✅ Rutas de import correctas (`components/`)
- ✅ Dependencias correctas (ninguna)
- ✅ Internals correctos

---

## 📋 Checklist de Verificación

### Contrato `parameters.ubits`
- ✅ `componentId` único
- ✅ `api.create` correcto
- ✅ `api.tag` correcto
- ✅ `dependsOn` correcto
- ✅ `internals` correctos
- ✅ `slots` correctos
- ✅ `tokensUsed` listados
- ✅ `rules` correctas

### Story Implementation
- ✅ Nombre: `"Implementation (Copy/Paste)"`
- ✅ Args explícitos
- ✅ Snippet funcional y corregido
- ✅ Render con `data-ubits-id`

### Rutas y APIs
- ✅ Rutas de import correctas
- ✅ APIs documentadas correctamente
- ✅ Snippets no usan funciones inexistentes

---

**Última actualización:** 2025-01-03
