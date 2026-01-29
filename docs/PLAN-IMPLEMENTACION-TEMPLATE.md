# Plan de Implementación - Template System

## 🎯 Objetivo Final

Template robusto que:
- ✅ Usa Sidebar y SubNav configurables por producto
- ✅ Dark/Light mode funcional y sincronizado
- ✅ Responsive automático
- ✅ Componentes como add-ons: cambios globales se reflejan automáticamente
- ✅ Sistema escalable y mantenible

---

## 📋 Plan Detallado (Paso a Paso)

### **FASE 1: Corrección de Rutas y Assets** 🚧

**Objetivo**: Eliminar todos los errores 404 y hacer que el template funcione correctamente.

#### Tarea 1.1: Identificar y Corregir Rutas
- [ ] Crear utilidad `utils/path-resolver.js` para resolver rutas relativas
- [ ] Corregir ruta de FontAwesome CSS
- [ ] Corregir rutas de imágenes (logo, avatar, etc.)
- [ ] Validar que todas las rutas funcionan con `file://` protocol

#### Tarea 1.2: Assets Management
- [ ] Copiar FontAwesome CSS a una ubicación accesible
- [ ] Crear carpeta `packages/playground-app/assets/` para assets locales
- [ ] Copiar imágenes necesarias (logo, avatar) a assets locales
- [ ] Actualizar rutas en template-qa.html

**Resultado Esperado**: Template carga sin errores 404, todos los assets visibles.

---

### **FASE 2: Sistema de Configuración Centralizado** 📦

**Objetivo**: Crear un sistema de configuración que permita definir productos fácilmente.

#### Tarea 2.1: Crear `config/products.js`
```javascript
// Estructura propuesta:
export const products = {
  'template-qa': {
    name: 'Template QA',
    sidebar: { ... },
    subnav: { ... },
    tabbar: { ... }
  },
  'aprendizaje': { ... },
  'desempeno': { ... }
}
```

#### Tarea 2.2: Integrar en Template
- [ ] Cargar configuración según URL o parámetro
- [ ] Aplicar configuración a componentes
- [ ] Validar que funciona con diferentes productos

**Resultado Esperado**: Template se configura automáticamente según el producto.

---

### **FASE 3: Template Loader System** 🔄

**Objetivo**: Sistema que carga componentes dinámicamente desde add-ons.

#### Tarea 3.1: Crear `engine/template-loader.js`
- [ ] Función `loadComponent(name, config)`
- [ ] Cargar CSS del componente automáticamente
- [ ] Cargar JavaScript del componente
- [ ] Inicializar componente con configuración

#### Tarea 3.2: Component Registry
- [ ] Crear `engine/component-registry.js`
- [ ] Registrar componentes disponibles
- [ ] Mapeo nombre → ruta del componente

#### Tarea 3.3: Refactorizar template-qa.html
- [ ] Reemplazar código hardcodeado con Template Loader
- [ ] Usar configuración centralizada
- [ ] Validar que funciona igual que antes

**Resultado Esperado**: Template usa loader dinámico, código más limpio y mantenible.

---

### **FASE 4: Sistema de Temas Global** 🌓

**Objetivo**: Dark/Light mode que se sincroniza entre todos los componentes.

#### Tarea 4.1: Crear `config/theme-manager.js`
- [ ] Clase `ThemeManager`
- [ ] Método `setTheme(theme)`
- [ ] Eventos personalizados para notificar cambios
- [ ] Persistencia en localStorage

#### Tarea 4.2: Integrar en Componentes
- [ ] Sidebar escucha eventos de tema
- [ ] TabBar escucha eventos de tema
- [ ] SubNav escucha eventos de tema
- [ ] Sincronización automática

#### Tarea 4.3: Actualizar template-qa.html
- [ ] Inicializar ThemeManager
- [ ] Conectar dark mode toggles
- [ ] Cargar tema guardado al iniciar

**Resultado Esperado**: Un solo click cambia tema en toda la aplicación.

---

### **FASE 5: Sistema Responsive** 📱

**Objetivo**: Adaptación automática según tamaño de pantalla.

#### Tarea 5.1: Crear `config/responsive-manager.js`
- [ ] Detectar breakpoints
- [ ] Eventos de cambio de viewport
- [ ] Estados responsive (mobile, tablet, desktop)

#### Tarea 5.2: Adaptar Componentes
- [ ] Sidebar: ocultar en mobile, mostrar en desktop
- [ ] TabBar: mostrar solo en mobile
- [ ] SubNav: adaptar layout según viewport
- [ ] Content area: ajustar márgenes/padding

#### Tarea 5.3: Testing Responsive
- [ ] Probar en diferentes tamaños
- [ ] Validar transiciones suaves
- [ ] Asegurar que no hay layout shifts

**Resultado Esperado**: Template se adapta perfectamente a cualquier dispositivo.

---

### **FASE 6: Hot Reload System** 🔥 (Opcional para desarrollo)

**Objetivo**: Cambios en componentes se reflejan automáticamente.

#### Tarea 6.1: Crear `engine/hot-reload.js`
- [ ] Observar cambios en archivos CSS
- [ ] Observar cambios en archivos JS
- [ ] Recargar componentes afectados
- [ ] Mantener estado del usuario

#### Tarea 6.2: Integrar en desarrollo
- [ ] Activar solo en modo desarrollo
- [ ] Desactivar en producción
- [ ] Logging para debugging

**Resultado Esperado**: Desarrollo más rápido, cambios instantáneos.

---

### **FASE 7: Validación y Testing** ✅

**Objetivo**: Asegurar que todo funciona perfectamente.

#### Tarea 7.1: Testing Funcional
- [ ] Probar todos los productos
- [ ] Validar dark/light mode
- [ ] Validar responsive
- [ ] Validar navegación

#### Tarea 7.2: Testing de Integración
- [ ] Cambiar componente global → verificar actualización
- [ ] Cambiar configuración → verificar aplicación
- [ ] Probar con diferentes productos

#### Tarea 7.3: Documentación
- [ ] Documentar cómo usar el sistema
- [ ] Ejemplos de configuración
- [ ] Guía de creación de nuevos productos

**Resultado Esperado**: Sistema completo, probado y documentado.

---

## 🏗️ Arquitectura Final Propuesta

### Estructura de Archivos

```
packages/playground-app/
├── templates/
│   ├── base-template.html          # Template base
│   └── products/
│       ├── template-qa.html        # Template específico
│       ├── aprendizaje.html
│       └── desempeno.html
├── config/
│   ├── products.js                 # ✅ Configuraciones
│   ├── theme-manager.js            # ✅ Gestor de temas
│   └── responsive-manager.js       # ✅ Gestor responsive
├── engine/
│   ├── template-loader.js          # ✅ Carga componentes
│   ├── component-registry.js       # ✅ Registro de componentes
│   └── hot-reload.js               # ⚠️ Hot reload (opcional)
├── utils/
│   ├── path-resolver.js            # ✅ Resuelve rutas
│   └── asset-loader.js             # ✅ Carga assets
└── assets/                         # ✅ Assets locales
    ├── images/
    │   ├── logo.svg
    │   └── avatar.jpg
    └── fonts/
```

### Flujo de Carga

```
1. Usuario abre template-qa.html
   ↓
2. HTML carga config/products.js
   ↓
3. Template Engine inicializa:
   - ThemeManager (carga tema guardado)
   - ResponsiveManager (detecta viewport)
   - TemplateLoader (prepara carga de componentes)
   ↓
4. TemplateLoader carga componentes:
   - Sidebar (desde addons/sidebar)
   - SubNav (desde addons/subnav)
   - TabBar (desde addons/tabbar)
   ↓
5. Componentes se inicializan con configuración del producto
   ↓
6. Template está listo y funcional
```

### Flujo de Actualización

```
Desarrollador cambia addons/sidebar/src/styles/sidebar.css
   ↓
Hot Reload detecta cambio (solo en desarrollo)
   ↓
Component Registry notifica cambio
   ↓
TemplateLoader recarga sidebar
   ↓
Sidebar se actualiza automáticamente
   ↓
Estado del usuario se mantiene (tema, navegación activa)
```

---

## 🚀 Orden de Implementación Recomendado

1. **FASE 1** (Urgente): Corregir rutas → Template funciona
2. **FASE 2**: Config centralizada → Fácil agregar productos
3. **FASE 4**: Theme Manager → Dark/Light mode funcional
4. **FASE 3**: Template Loader → Código más limpio
5. **FASE 5**: Responsive → Adaptación automática
6. **FASE 6**: Hot Reload → Mejora DX (opcional)
7. **FASE 7**: Testing → Validar todo

---

## ✅ Criterios de Éxito

- [ ] Template carga sin errores 404
- [ ] Sidebar y SubNav se configuran por producto
- [ ] Dark/Light mode sincronizado entre componentes
- [ ] Responsive funciona en mobile, tablet, desktop
- [ ] Cambios en componentes globales se reflejan automáticamente
- [ ] Código limpio, modular y mantenible
- [ ] Documentación completa

---

## 🎯 Próximo Paso

**Empezar con FASE 1** - Corregir rutas para que el template funcione correctamente.

