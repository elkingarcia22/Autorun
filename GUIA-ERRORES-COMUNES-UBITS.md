# 🚨 Guía: Errores Comunes al Usar Componentes UBITS

Esta guía documenta errores comunes y cómo evitarlos para que **NINGÚN chat de Cursor** los cometa.

---

## ⚠️ ERROR CRÍTICO #1: Formato Incorrecto de Iconos en `window.createTabs()`

### ❌ **ERROR COMÚN:**
```javascript
window.createTabs({
  tabs: [
    { id: 'tab1', label: 'Tab 1', icon: 'far fa-home' },  // ❌ INCORRECTO
    { id: 'tab2', label: 'Tab 2', icon: 'fas fa-user' }   // ❌ INCORRECTO
  ]
}, 'container-id')
```

### ✅ **CORRECTO:**
```javascript
window.createTabs({
  tabs: [
    { id: 'tab1', label: 'Tab 1', icon: 'home' },  // ✅ CORRECTO: solo el nombre
    { id: 'tab2', label: 'Tab 2', icon: 'user' }    // ✅ CORRECTO: solo el nombre
  ]
}, 'container-id')
```

### 🔍 **¿Por qué?**
El componente `window.createTabs()` usa `renderTabsIconHelper()` que:
- Automáticamente agrega el prefijo `fa-` al nombre del icono
- Determina el estilo (`far` para inactivo, `fas` para activo) según el estado del tab
- Si pasas `'far fa-home'`, intentará crear `'far fa-far fa-home'` (duplicado)

### 📝 **Regla de Oro:**
**SIEMPRE usar solo el nombre del icono sin prefijos:**
- ✅ `'home'`, `'user'`, `'list'`, `'clock'`, `'search'`
- ❌ `'far fa-home'`, `'fas fa-user'`, `'fa-list'`

---

## ⚠️ ERROR CRÍTICO #2: Usar Custom Elements en lugar de Funciones

### ❌ **ERROR COMÚN:**
```html
<!-- ❌ INCORRECTO: Estos NO son custom elements registrados -->
<ubits-tabs>
  <ubits-tab>Tab 1</ubits-tab>
</ubits-tabs>

<ubits-data-table>
  <!-- contenido -->
</ubits-data-table>
```

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Usar funciones globales
window.createTabs({
  tabs: [
    { id: 'tab1', label: 'Tab 1', icon: 'home' }
  ]
}, 'tabs-container');

window.createDataTable({
  columns: [...],
  rows: [...],
  containerId: 'table-container'
});
```

### 🔍 **¿Por qué?**
- `ubits-tabs` y `ubits-data-table` **NO están registrados como custom elements**
- Se exponen como funciones globales: `window.createTabs()` y `window.createDataTable()`
- Estas funciones generan el HTML y lo insertan en el contenedor especificado

---

## ⚠️ ERROR CRÍTICO #3: Modificar Archivos de UBITS

### ❌ **ERROR COMÚN:**
- Modificar archivos en `vendor/ubits/` o `Desktop/UBITS/`
- Editar `components-loader.js` directamente
- Cambiar tokens en archivos de UBITS

### ✅ **CORRECTO:**
- **NUNCA modificar archivos de UBITS**
- Usar los componentes tal como están
- Si necesitas personalización, usar CSS en el template o sobrescribir estilos (sin `!important`)

---

## ⚠️ ERROR CRÍTICO #4: Usar Rutas Absolutas cuando Existe `vendor/ubits/`

### ❌ **ERROR COMÚN:**
```html
<!-- ❌ INCORRECTO: Ruta absoluta cuando existe vendor/ubits/ -->
<link rel="stylesheet" href="file:///Users/elkinmac/Desktop/UBITS/packages/tokens/dist/tokens.css">
```

### ✅ **CORRECTO:**
```html
<!-- ✅ CORRECTO: Ruta relativa desde prototypes/ -->
<link rel="stylesheet" href="../vendor/ubits/packages/tokens/dist/tokens.css">
```

### 🔍 **¿Por qué?**
- Las rutas absolutas `file://` no funcionan en otros computadores
- Las rutas relativas desde `prototypes/` hacia `vendor/ubits/` son portables
- El sistema automáticamente usa rutas relativas si existe `vendor/ubits/`

---

## ⚠️ ERROR CRÍTICO #5: Sobrescribir Tokens con `!important`

### ❌ **ERROR COMÚN:**
```css
/* ❌ INCORRECTO: Sobrescribir tokens con !important */
.ubits-button {
  background-color: #0c5bef !important;
}
```

### ✅ **CORRECTO:**
```css
/* ✅ CORRECTO: Usar tokens directamente o variables CSS */
.ubits-button {
  background-color: var(--ubits-accent-brand-static);
}
```

### 🔍 **¿Por qué?**
- Los componentes UBITS ya usan tokens correctamente
- `!important` rompe el sistema de tokens y temas (light/dark)
- Los tokens cambian automáticamente según el tema

---

## ⚠️ ERROR CRÍTICO #6: Crear Componentes Duplicados

### ❌ **ERROR COMÚN:**
- Crear un nuevo componente "tabs" cuando ya existe `window.createTabs()`
- Crear un nuevo componente "table" cuando ya existe `window.createDataTable()`
- No consultar `CATALOGO-COMPONENTES-UBITS.md` antes de crear

### ✅ **CORRECTO:**
1. **SIEMPRE consultar primero:**
   - `CATALOGO-COMPONENTES-UBITS.md`
   - `GUIA-USO-COMPONENTES-UBITS.md`
   - Verificar componentes disponibles: `window.createTabs`, `window.createDataTable`, etc.

2. **SIEMPRE preguntar si no estás seguro:**
   - "¿Este componente que muestras es un componente UBITS existente?"
   - "¿O quieres que lo cree usando los tokens de UBITS?"

3. **SIEMPRE usar componentes existentes:**
   - Si identificas un componente UBITS, úsalo
   - NO crees duplicados
   - NO crees nuevos componentes sin preguntar primero

---

## ⚠️ ERROR CRÍTICO #7: Implementar Todo de Golpe sin Dividir en Tareas

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Implementar todo en un solo paso
function initEncuestasInterface() {
  // Tabs
  window.createTabs({...});
  
  // Barra de acciones
  // ... código de barra ...
  
  // DataTable completo con todas las opciones
  window.createDataTable({
    columns: [...8 columnas...],
    rows: [...muchos datos...],
    showCheckbox: true,
    columnSortable: true,
    // ... muchas opciones más ...
  });
}
```

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Dividir en tareas y pedir aprobación

// TAREA 1: Solo tabs (pedir aprobación)
function initTabs() {
  window.createTabs({
    tabs: [
      { id: 'encuestas', label: 'Encuestas', icon: 'list' },
      { id: 'datos-demograficos', label: 'Datos demográficos', icon: 'clock' }
    ],
    activeTabId: 'encuestas'
  }, 'tabs-container');
}
// Mostrar al usuario y pedir: "¿Aprobamos para continuar con Tarea 2?"

// TAREA 2: Solo barra de acciones (solo después de aprobación)
function initActionBar() {
  // ... código de barra ...
}
// Mostrar al usuario y pedir: "¿Aprobamos para continuar con Tarea 3?"

// TAREA 3: DataTable básico (solo después de aprobación)
function initBasicTable() {
  window.createDataTable({
    containerId: 'table-container',
    columns: [
      { id: 'nombre', title: 'Nombre', type: 'nombre' },
      { id: 'tipo', title: 'Tipo', type: 'nombre' }
    ],
    rows: [
      { id: 1, data: { nombre: 'Ejemplo', tipo: 'Tipo' } }
    ]
  });
}
// Mostrar al usuario y pedir: "¿Aprobamos para continuar con Tarea 4?"

// TAREA 4: DataTable completo (solo después de aprobación)
function initCompleteTable() {
  window.createDataTable({
    // ... todas las opciones ...
  });
}
```

### 🔍 **¿Por qué?**
- Los componentes complejos (como DataTable) tienen muchas opciones
- Implementar todo de golpe hace difícil identificar errores
- El usuario no puede aprobar/rechazar partes específicas
- Si algo falla, es difícil saber qué parte falló

### 📝 **Proceso Correcto:**

1. **FASE 1: Análisis y Planificación**
   - Analizar imagen/solicitud
   - Identificar componentes
   - Crear plan de tareas
   - **Mostrar plan al usuario y esperar aprobación**

2. **FASE 2: Implementación Paso a Paso**
   - Implementar Tarea 1
   - Verificar que funciona
   - Mostrar al usuario
   - **Pedir aprobación explícita**
   - Solo después de aprobación, continuar con Tarea 2
   - Repetir para cada tarea

### 📋 **Plantilla de Mensaje para Cada Tarea:**

```
## ✅ Tarea [N] Completada: [Nombre]

### Lo que se implementó:
- [ ] Componente X
- [ ] Funcionalidad Y

### Verificación:
- ✅ Renderiza correctamente
- ✅ Estilos aplicados
- ✅ Funcionalidad básica funciona

### ¿Aprobamos para continuar con la Tarea [N+1]?
```

**Ver:** `GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md` para proceso completo.

---

## 📋 Checklist Antes de Usar Componentes

Antes de usar cualquier componente UBITS, verificar:

- [ ] ¿Consulté `CATALOGO-COMPONENTES-UBITS.md`?
- [ ] ¿El componente existe en `window.create*` o `window.UBITS.*`?
- [ ] ¿Estoy usando el formato correcto de iconos? (solo nombre, sin prefijos)
- [ ] ¿Estoy usando funciones en lugar de custom elements?
- [ ] ¿Estoy usando rutas relativas si existe `vendor/ubits/`?
- [ ] ¿NO estoy modificando archivos de UBITS?
- [ ] ¿NO estoy usando `!important` en tokens?

---

## 🔗 Referencias

- **Guía de uso:** `GUIA-USO-COMPONENTES-UBITS.md`
- **Catálogo:** `CATALOGO-COMPONENTES-UBITS.md`
- **Identificación:** `GUIA-IDENTIFICACION-COMPONENTES.md`
- **Reglas:** `.cursorrules`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

