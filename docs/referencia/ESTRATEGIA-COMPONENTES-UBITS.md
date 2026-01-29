# 🎯 Estrategia: Uso de Componentes UBITS en Autorun

## ❌ Problema Actual

1. Los componentes no se muestran correctamente en los templates generados
2. Los elementos del sidebar y navbar cambian (no se ven como deberían)
3. No se ven los componentes de UBITS que tenemos
4. Hay riesgo de duplicar componentes en lugar de usar los existentes

## ✅ Solución: Usar Componentes Locales de UBITS

### **Principio Fundamental**

> **Los templates generados DEBEN usar los componentes locales de UBITS tal cual están, sin modificarlos ni duplicarlos.**

---

## 📋 Estrategia de Implementación

### **1. Carga de Componentes desde UBITS Local**

Los templates generados deben:

1. ✅ **Cargar CSS desde UBITS local** usando rutas `file://` absolutas
2. ✅ **Cargar JavaScript desde UBITS local** usando rutas `file://` absolutas
3. ✅ **NO intentar cargar desde Storybook** (Storybook es solo para desarrollo/preview)
4. ✅ **Usar exactamente los mismos archivos** que UBITS tiene localmente

### **2. Estructura de Rutas**

```
Desktop/
├── UBITS/
│   └── packages/
│       ├── tokens/
│       ├── components/
│       │   ├── sidebar/
│       │   ├── subnav/
│       │   ├── button/
│       │   └── ...
│       └── templates/
│           ├── template-admin.html
│           ├── template-colaborador.html
│           ├── components-loader.js
│           ├── config/
│           └── engine/
│
└── Autorun/
    └── prototypes/
        └── canvas-*.html (generados)
```

### **3. Rutas en Templates Generados**

**PREFERIDO: Rutas relativas (portable):**
```html
<!-- ✅ CORRECTO: Ruta relativa desde prototypes/ hacia vendor/ubits/packages/ -->
<link rel="stylesheet" href="../vendor/ubits/packages/tokens/dist/tokens.css" />
<link rel="stylesheet" href="../vendor/ubits/packages/components/sidebar/src/styles/sidebar.css" />
<script src="../vendor/ubits/packages/templates/components-loader.js"></script>
<script src="../vendor/ubits/packages/components/data-table/dist/data-table.umd.js"></script>
```

**LEGACY: Rutas absolutas file:// (fallback si no existe vendor/ubits/):**
```html
<!-- ⚠️ LEGACY: Solo si no existe vendor/ubits/ -->
<link rel="stylesheet" href="file:///Users/elkinmac/Desktop/UBITS/packages/tokens/dist/tokens.css" />
```

### **4. NO Duplicar Componentes**

**❌ INCORRECTO:**
```javascript
// NO crear nuevos componentes
const myButton = new Button(); // ❌
```

**✅ CORRECTO:**
```javascript
// Usar los componentes que ya existen en UBITS
window.createSidebar(options); // ✅
window.createSubNav(options); // ✅
window.UBITS.Button.create(options); // ✅
```

---

## 🔧 Reglas para Cursor Chat

Cuando cualquier Cursor chat trabaje con Autorun, debe seguir estas reglas:

### **Regla 1: Siempre Usar Componentes Existentes**

```markdown
Los componentes de UBITS ya están disponibles. NO crear nuevos componentes.
Usar los que existen:
- window.createSidebar()
- window.createSubNav()
- window.createTabBar()
- window.UBITS.Button
- window.UBITS.Alert
- etc.
```

### **Regla 2: No Modificar Archivos de UBITS**

```markdown
NO modificar archivos en Desktop/UBITS/
Los templates generados solo deben:
1. Cargar los archivos de UBITS
2. Personalizar la configuración (módulo, producto)
3. Agregar contenido específico del proyecto
```

### **Regla 3: Usar Rutas Relativas (Preferido) o Absolutas (Legacy)**

```markdown
PREFERIDO: Rutas relativas desde prototypes/ hacia vendor/ubits/packages/
Ejemplo: ../vendor/ubits/packages/tokens/dist/tokens.css

LEGACY: Rutas absolutas file:// solo si no existe vendor/ubits/
Ejemplo: file:///Users/elkinmac/Desktop/UBITS/packages/tokens/dist/tokens.css
```

### **Regla 4: Validar que los Archivos Existen**

```markdown
Antes de generar un template, verificar que:
1. Existe vendor/ubits/packages/ (preferido) o Desktop/UBITS/packages/ (legacy)
2. Existen los templates base (template-admin.html, template-colaborador.html)
3. Existen todos los componentes necesarios
4. components-loader.js incluye createTabs y createDataTable está disponible
```

---

## 📝 Checklist para Crear Páginas

Cuando se pida crear una nueva página o modificar un template:

### ✅ **Paso 1: Verificar Componentes Disponibles**

```javascript
// En la consola del navegador
console.log(window.createSidebar); // ✅ Debe existir
console.log(window.createSubNav); // ✅ Debe existir
console.log(window.UBITS.Button); // ✅ Debe existir
```

### ✅ **Paso 2: Usar Template Existente como Base**

```markdown
Usar el template más reciente en prototypes/ como base:
- prototypes/canvas-administrador-*.html
- prototypes/canvas-colaborador-*.html
```

### ✅ **Paso 3: Agregar Contenido sin Modificar Componentes**

```html
<!-- ✅ CORRECTO: Agregar contenido usando componentes existentes -->
<div class="content-area">
  <ubits-button variant="primary">Click me</ubits-button>
  <ubits-card>
    <h2>Título</h2>
    <p>Contenido</p>
  </ubits-card>
</div>
```

### ✅ **Paso 4: NO Crear Nuevos Componentes**

```javascript
// ❌ INCORRECTO: Crear nuevo componente
class MyButton extends HTMLElement { ... } // ❌ NO HACER ESTO

// ✅ CORRECTO: Usar componente existente
const button = window.UBITS.Button.create({ variant: 'primary' }); // ✅
```

---

## 🚨 Problemas Comunes y Soluciones

### **Problema 1: Componentes no se ven**

**Causa:** Rutas incorrectas o archivos no encontrados

**Solución:**
1. Verificar que existe `Desktop/UBITS/packages/`
2. Verificar que las rutas en el template son absolutas `file://`
3. Abrir la consola del navegador y revisar errores 404

### **Problema 2: Sidebar/Navbar cambian**

**Causa:** Scripts de UBITS no se cargan correctamente

**Solución:**
1. Verificar que `components-loader.js` se carga
2. Verificar que `products.js` se carga
3. Verificar que `template-loader.js` se carga
4. Revisar la consola para errores de JavaScript

### **Problema 3: Estilos no se aplican**

**Causa:** CSS no se carga o se carga después del JavaScript

**Solución:**
1. Verificar que todos los `<link>` de CSS están en `<head>`
2. Verificar que las rutas de CSS son correctas
3. Verificar que `tokens.css` se carga primero

### **Problema 4: Componentes duplicados**

**Causa:** Se intenta cargar desde Storybook y local al mismo tiempo

**Solución:**
1. NO cargar desde Storybook en templates generados
2. Solo usar archivos locales de UBITS
3. Verificar que no hay scripts que carguen desde Storybook

---

## 📚 Referencias

- **Templates base:** `Desktop/UBITS/packages/templates/`
- **Componentes:** `Desktop/UBITS/packages/components/`
- **Tokens:** `Desktop/UBITS/packages/tokens/`
- **Documentación UBITS:** Ver archivos en `Desktop/UBITS/docs/`

---

## ✅ Resumen

1. **Usar componentes locales de UBITS** (no Storybook)
2. **Rutas absolutas file://** para todos los assets
3. **NO duplicar componentes** - usar los existentes
4. **NO modificar archivos de UBITS** - solo cargarlos
5. **Validar que todo carga correctamente** antes de continuar

