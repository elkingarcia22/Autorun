# Arquitectura del Template System - UBITS Playground

## 🎯 Objetivo

Crear un sistema de templates robusto, escalable y mantenible que permita:
1. **Configuración por producto**: Sidebar y SubNav personalizables
2. **Dark/Light Mode**: Sistema de temas global y automático
3. **Responsive**: Adaptación automática a diferentes dispositivos
4. **Hot Reload de Componentes**: Cambios en add-ons se reflejan automáticamente
5. **Arquitectura Modular**: Componentes como add-ons independientes

---

## 🏗️ Arquitectura Propuesta

### **Opción Recomendada: Sistema de Configuración Centralizado + Loader Dinámico**

```
┌─────────────────────────────────────────────────────────────┐
│                    TEMPLATE ENGINE                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Config      │  │  Loader     │  │  Theme       │       │
│  │  Manager     │→ │  System     │→ │  Manager     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                │                  │                │
└─────────┼────────────────┼──────────────────┼────────────────┘
          │                │                  │
          ▼                ▼                  ▼
    ┌──────────┐    ┌─────────────┐    ┌──────────┐
    │ Products │    │  Add-ons    │    │  CSS     │
    │  Config  │    │  Registry   │    │  Vars    │
    └──────────┘    └─────────────┘    └──────────┘
```

### **Flujo de Funcionamiento**

1. **Inicialización**:
   - Template carga `config/products.js` → Define configuración del producto
   - Template Engine inicializa Loader System
   - Loader carga add-ons dinámicamente desde `packages/addons/`

2. **Renderizado**:
   - Loader lee configuración del producto
   - Carga componentes necesarios (Sidebar, SubNav, TabBar)
   - Aplica estilos y tokens según configuración
   - Inicializa Theme Manager

3. **Hot Reload**:
   - Sistema detecta cambios en archivos CSS/JS de add-ons
   - Recarga componentes afectados automáticamente
   - Mantiene estado del usuario (tema, navegación activa)

---

## 📁 Estructura de Archivos

```
packages/playground-app/
├── templates/
│   ├── base-template.html          # Template base reutilizable
│   └── products/                   # Templates específicos por producto
│       ├── aprendizaje.html
│       ├── desempeno.html
│       └── template-qa.html
├── config/
│   ├── products.js                 # Configuraciones de productos
│   ├── theme-manager.js            # Gestor de temas global
│   └── responsive-manager.js       # Gestor responsive
├── engine/
│   ├── template-loader.js          # Carga componentes dinámicamente
│   ├── component-registry.js       # Registro de componentes disponibles
│   └── hot-reload.js               # Sistema de recarga en caliente
└── utils/
    ├── path-resolver.js            # Resuelve rutas relativas correctamente
    └── asset-loader.js             # Carga assets (imágenes, fuentes)
```

---

## 🔧 Componentes del Sistema

### 1. **Config Manager** (`config/products.js`)

Centraliza todas las configuraciones por producto:

```javascript
export const products = {
  'aprendizaje': {
    sidebar: {
      variant: 'colaborador',
      bodyButtons: [...],
      profileMenuItems: [...]
    },
    subnav: {
      variant: 'aprendizaje',
      tabs: [...]
    },
    theme: {
      default: 'light',
      persist: true
    }
  },
  'desempeno': { ... },
  'template-qa': { ... }
}
```

**Ventajas**:
- ✅ Una sola fuente de verdad
- ✅ Fácil de mantener y actualizar
- ✅ Permite crear nuevos productos rápidamente

### 2. **Template Loader** (`engine/template-loader.js`)

Carga componentes dinámicamente desde add-ons:

```javascript
class TemplateLoader {
  async loadComponent(componentName, config) {
    // 1. Resolver ruta del componente
    const componentPath = this.resolveComponentPath(componentName);
    
    // 2. Cargar CSS del componente
    await this.loadComponentCSS(componentName);
    
    // 3. Cargar JavaScript del componente
    const component = await import(componentPath);
    
    // 4. Inicializar componente con configuración
    return component.create(config);
  }
}
```

**Ventajas**:
- ✅ Carga solo lo necesario (code splitting)
- ✅ Fácil de extender con nuevos componentes
- ✅ Permite lazy loading

### 3. **Theme Manager** (`config/theme-manager.js`)

Gestiona dark/light mode globalmente:

```javascript
class ThemeManager {
  setTheme(theme) {
    // 1. Actualizar data-theme en body y contenedores
    document.body.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-container]')
      .forEach(el => el.setAttribute('data-theme', theme));
    
    // 2. Persistir en localStorage
    localStorage.setItem('ubits-theme', theme);
    
    // 3. Notificar a todos los componentes
    this.notifyComponents(theme);
  }
  
  notifyComponents(theme) {
    // Evento personalizado que escuchan todos los componentes
    document.dispatchEvent(new CustomEvent('theme-change', {
      detail: { theme }
    }));
  }
}
```

**Ventajas**:
- ✅ Sincronización automática entre componentes
- ✅ Persistencia entre sesiones
- ✅ Fácil de extender con más temas (high-contrast, etc.)

### 4. **Component Registry** (`engine/component-registry.js`)

Registro centralizado de componentes disponibles:

```javascript
class ComponentRegistry {
  constructor() {
    this.components = new Map();
    this.watchFiles(); // Observa cambios en componentes
  }
  
  register(name, component) {
    this.components.set(name, component);
    this.emit('component-registered', name);
  }
  
  watchFiles() {
    // Observa cambios en archivos de add-ons
    if (typeof window !== 'undefined' && 'FileSystemAccess' in window) {
      // En desarrollo: hot reload
    }
  }
}
```

**Ventajas**:
- ✅ Componentes auto-registrados
- ✅ Hot reload en desarrollo
- ✅ Fácil descubrimiento de componentes disponibles

### 5. **Hot Reload System** (`engine/hot-reload.js`)

Detecta cambios y recarga componentes:

```javascript
class HotReload {
  constructor() {
    this.watchedFiles = new Set();
    this.componentCache = new Map();
  }
  
  watch(componentPath) {
    // En desarrollo: usar File System Access API
    // En producción: polling o WebSocket
    setInterval(() => {
      this.checkForUpdates(componentPath);
    }, 1000);
  }
  
  async checkForUpdates(path) {
    const response = await fetch(path, { method: 'HEAD' });
    const lastModified = response.headers.get('Last-Modified');
    
    if (this.componentCache.get(path) !== lastModified) {
      await this.reloadComponent(path);
      this.componentCache.set(path, lastModified);
    }
  }
}
```

**Ventajas**:
- ✅ Actualizaciones automáticas sin recargar página
- ✅ Mejor experiencia de desarrollo
- ✅ Fácil debugging

---

## 🎨 Sistema de Temas

### Implementación

1. **CSS Variables Globales**: Todos los tokens ya usan `var(--ubits-*)`
2. **Data Attributes**: `data-theme="dark"` en contenedores
3. **Event System**: Componentes escuchan `theme-change`
4. **Persistence**: localStorage guarda preferencia del usuario

### Flujo

```
Usuario cambia tema
    ↓
ThemeManager.setTheme('dark')
    ↓
document.body.setAttribute('data-theme', 'dark')
    ↓
CSS Variables se actualizan automáticamente
    ↓
Evento 'theme-change' se dispara
    ↓
Componentes se actualizan (iconos, colores)
```

---

## 📱 Sistema Responsive

### Breakpoints

```javascript
const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440
}
```

### Estrategia

1. **Mobile First**: CSS con min-width
2. **JavaScript Detection**: `ResponsiveManager` detecta cambios
3. **Component Adaptation**: Sidebar se oculta, TabBar aparece
4. **Layout Switching**: Grid se adapta automáticamente

---

## 🔄 Flujo de Actualización de Componentes

### Escenario: Cambio en `addons/sidebar/src/styles/sidebar.css`

```
1. Desarrollador modifica sidebar.css
   ↓
2. Hot Reload detecta cambio (dev) o build process actualiza (prod)
   ↓
3. Component Registry notifica cambio
   ↓
4. Template Loader recarga sidebar
   ↓
5. Todos los templates que usan sidebar se actualizan automáticamente
   ↓
6. Estado del usuario (tema, navegación) se mantiene
```

---

## 📋 Plan de Implementación (Paso a Paso)

### **FASE 1: Corrección de Rutas** ✅ (En progreso)
- [x] Corregir rutas de CSS (tokens, typography, FontAwesome)
- [x] Corregir rutas de imágenes (logo, avatar)
- [x] Crear path-resolver para rutas relativas

### **FASE 2: Configuración Centralizada**
- [ ] Crear `config/products.js` con configuraciones
- [ ] Crear `config/theme-manager.js`
- [ ] Integrar en template-qa.html

### **FASE 3: Template Loader**
- [ ] Crear `engine/template-loader.js`
- [ ] Crear `engine/component-registry.js`
- [ ] Refactorizar template-qa.html para usar loader

### **FASE 4: Sistema de Temas**
- [ ] Implementar ThemeManager completo
- [ ] Sincronizar dark mode entre Sidebar y TabBar
- [ ] Agregar persistencia en localStorage

### **FASE 5: Responsive System**
- [ ] Crear `config/responsive-manager.js`
- [ ] Implementar breakpoints
- [ ] Adaptar Sidebar/SubNav/TabBar según viewport

### **FASE 6: Hot Reload (Opcional, desarrollo)**
- [ ] Crear `engine/hot-reload.js`
- [ ] Implementar detección de cambios
- [ ] Recarga automática de componentes

### **FASE 7: Validación y Testing**
- [ ] Probar todos los productos
- [ ] Validar dark/light mode
- [ ] Validar responsive en diferentes dispositivos
- [ ] Documentar uso del sistema

---

## ✅ Ventajas de esta Arquitectura

1. **Escalabilidad**: Fácil agregar nuevos productos o componentes
2. **Mantenibilidad**: Cambios centralizados se reflejan en todos lados
3. **Performance**: Carga solo lo necesario, lazy loading
4. **Developer Experience**: Hot reload, fácil debugging
5. **Robustez**: Manejo de errores, fallbacks, validaciones

---

## 🚀 Próximos Pasos

Empezar con **FASE 1** corrigiendo las rutas, luego seguir con las fases siguientes paso a paso.

