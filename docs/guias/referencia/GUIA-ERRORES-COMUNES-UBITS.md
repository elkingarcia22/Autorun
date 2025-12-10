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

## ⚠️ ERROR CRÍTICO #8: Implementar Componentes en Todos los Módulos

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Inicializar tabs en TODOS los módulos
function initTabs() {
  window.createTabs({
    tabs: [
      { id: 'encuestas', label: 'Encuestas', icon: 'list' },
      { id: 'datos-demograficos', label: 'Datos demográficos', icon: 'chart-pie' }
    ]
  }, 'tabs-container');
}
// Esto se ejecuta en TODOS los módulos (inicio, empresa, aprendizaje, etc.)
```

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Verificar módulo actual ANTES de inicializar
function initEncuestasTabs() {
  // ⚠️ CRÍTICO: Verificar que estamos en el módulo correcto
  const currentModule = document.body.getAttribute('data-module');
  if (currentModule !== 'encuestas') {
    console.log('⏭️ No estamos en módulo encuestas, saltando inicialización');
    return; // NO inicializar si no estamos en el módulo correcto
  }
  
  window.createTabs({
    tabs: [
      { id: 'encuestas', label: 'Encuestas', icon: 'list' },
      { id: 'datos-demograficos', label: 'Datos demográficos', icon: 'chart-pie' }
    ]
  }, 'tabs-container');
}
```

### 🔍 **¿Por qué?**
- Los componentes específicos de un módulo NO deben aparecer en otros módulos
- Si implementas tabs en "encuestas", NO deben aparecer en "inicio", "empresa", etc.
- Cada módulo tiene su propia implementación específica

### 📝 **Regla de Oro:**
**SIEMPRE verificar el módulo actual antes de inicializar componentes específicos:**
```javascript
// Verificar módulo
const currentModule = document.body.getAttribute('data-module');
if (currentModule !== 'encuestas') {
  return; // NO hacer nada si no estamos en el módulo correcto
}

// Verificar sección (alternativa)
const currentSection = window.UBITS_ContentManager?.currentSection;
if (currentSection !== 'encuestas') {
  return; // NO hacer nada si no estamos en la sección correcta
}
```

### 📋 **Checklist:**
- [ ] ¿Verifico el módulo actual antes de inicializar?
- [ ] ¿Uso `document.body.getAttribute('data-module')` para verificar?
- [ ] ¿Uso `window.UBITS_ContentManager?.currentSection` si es necesario?

---

## ⚠️ ERROR CRÍTICO #11: Event Listeners Perdidos al Restaurar HTML

### ❌ **PROBLEMA IDENTIFICADO:**

Cuando `ContentManager.updateContent` restaura elementos HTML después de limpiar el `.content-area`, los **event listeners se pierden** porque el HTML se clona usando `insertAdjacentHTML`.

**Síntoma:**
- Los tabs se inicializan correctamente al cargar la página
- Los event listeners se agregan correctamente
- Cuando `ContentManager.updateContent` se ejecuta, los tabs se restauran
- **Los tabs restaurados NO tienen event listeners** - los clicks no funcionan

**Flujo del problema:**
```
1. Tabs se inicializan → Event listeners agregados ✅
   ↓
2. ContentManager.updateContent() se ejecuta
   ↓
3. HTML de tabs se guarda (outerHTML) → Incluye estructura pero NO listeners
   ↓
4. contentArea.innerHTML = '' → Limpia todo
   ↓
5. contentArea.insertAdjacentHTML('afterbegin', tabsHTML) → Restaura HTML
   ↓
6. Tabs restaurados NO tienen event listeners ❌
   ↓
7. Clicks en tabs no funcionan ❌
```

### 🔍 **CAUSA RAÍZ:**

1. **`outerHTML` solo guarda la estructura HTML**, no los event listeners
2. **`insertAdjacentHTML` crea nuevos elementos del DOM** que no tienen los listeners originales
3. **La verificación `!restoredTabs.querySelector('.ubits-tabs')` evita reinicializar** si los tabs ya existen
4. **Los tabs restaurados tienen `.ubits-tabs` pero sin listeners**

### ✅ **SOLUCIÓN APLICADA:**

**1. Verificar si los tabs tienen event listeners antes de evitar reinicialización:**

```javascript
window.initEncuestasTabs = function() {
  const container = document.getElementById('encuestas-tabs-container');
  if (!container) {
    console.warn('⚠️ [Encuestas Tabs] Contenedor no encontrado');
    return;
  }
  
  // Verificar si ya están inicializados
  const existingTabs = container.querySelector('.ubits-tabs');
  if (existingTabs) {
    // ✅ CRÍTICO: Verificar si tienen event listeners
    const tabsWithListeners = existingTabs.querySelectorAll('.ubits-tab[data-listener-attached="true"]');
    if (tabsWithListeners.length > 0) {
      console.log('✅ [Encuestas Tabs] Ya están inicializados con listeners');
      return;
    } else {
      console.log('🔵 [Encuestas Tabs] Tabs existen pero sin listeners, re-agregando listeners...');
      // Continuar con la inicialización para agregar listeners
    }
  }
  
  // ... resto de la inicialización
};
```

**2. Eliminar tabs existentes antes de reinicializar después de restaurar:**

```javascript
// Restaurar elementos después de updateContent
setTimeout(() => {
  const contentArea = document.querySelector('.content-area');
  if (contentArea && tabsHTML) {
    const existingTabs = contentArea.querySelector('#encuestas-tabs-container');
    if (!existingTabs) {
      contentArea.insertAdjacentHTML('afterbegin', tabsHTML);
      
      // ✅ CRÍTICO: Re-inicializar SIEMPRE después de restaurar
      const restoredTabs = document.getElementById('encuestas-tabs-container');
      if (restoredTabs) {
        // Eliminar tabs existentes para forzar reinicialización
        const existingTabsElement = restoredTabs.querySelector('.ubits-tabs');
        if (existingTabsElement) {
          existingTabsElement.remove();
        }
        if (window.initEncuestasTabs) {
          window.initEncuestasTabs();
        }
      }
    }
  }
}, 50);
```

### 📝 **REGLA DE ORO:**

**SIEMPRE verificar si los componentes tienen event listeners antes de evitar reinicialización. Si los elementos fueron restaurados desde HTML, SIEMPRE reinicializarlos para agregar los listeners.**

### **Código de ejemplo completo:**

```javascript
// Función de inicialización mejorada
window.initEncuestasTabs = function() {
  const container = document.getElementById('encuestas-tabs-container');
  if (!container) {
    console.warn('⚠️ [Encuestas Tabs] Contenedor no encontrado');
    return;
  }
  
  // Verificar si ya están inicializados CON listeners
  const existingTabs = container.querySelector('.ubits-tabs');
  if (existingTabs) {
    const tabsWithListeners = existingTabs.querySelectorAll('.ubits-tab[data-listener-attached="true"]');
    if (tabsWithListeners.length > 0) {
      console.log('✅ [Encuestas Tabs] Ya están inicializados con listeners');
      return;
    } else {
      console.log('🔵 [Encuestas Tabs] Tabs existen pero sin listeners, eliminando y reinicializando...');
      // Eliminar tabs existentes para forzar reinicialización
      existingTabs.remove();
    }
  }
  
  // Inicializar tabs (agregará listeners)
  if (typeof window.createTabs !== 'function') {
    console.warn('⚠️ [Encuestas Tabs] window.createTabs no está disponible, esperando...');
    setTimeout(window.initEncuestasTabs, 100);
    return;
  }
  
  try {
    window.createTabs({
      tabs: [
        { id: 'encuestas', label: 'Encuestas', icon: 'list-ul' },
        { id: 'datos-demograficos', label: 'Datos demográficos', icon: 'chart-pie-simple' }
      ],
      activeTabId: 'encuestas',
      onTabChange: (tabId, tabElement) => {
        console.log('🔵 [Encuestas Tabs] Tab cambiado:', tabId);
      }
    }, 'encuestas-tabs-container');
    
    console.log('✅ [Encuestas Tabs] Tabs inicializados correctamente');
  } catch (error) {
    console.error('❌ [Encuestas Tabs] Error al inicializar tabs:', error);
  }
};
```

---

## ⚠️ ERROR CRÍTICO #12: Padding Aplicado al Contenedor Interno en Lugar del Externo

### ❌ **PROBLEMA IDENTIFICADO:**

Al implementar componentes UBITS (DataTable, Tabs, etc.), se aplicó el padding al contenedor interno del componente en lugar del contenedor externo, causando que el padding no sea visible visualmente.

**Síntoma:**
- El padding se aplica correctamente según los logs (16px en todos los lados)
- Pero visualmente no se ve el padding alrededor del componente
- El componente parece pegado al borde del contenedor padre

**Ejemplo del error:**
```css
/* ❌ INCORRECTO - Padding en el contenedor interno */
#encuestas-table-container .ubits-data-table__container {
  padding: var(--ubits-spacing-lg, 16px) !important;
}
```

### 🔍 **CAUSA RAÍZ:**

1. **Los componentes UBITS crean su propio contenedor interno** (ej: `.ubits-data-table__container`, `.ubits-tabs`)
2. **El CSS base del componente tiene `padding: 0`** en el contenedor interno para que el header esté pegado al borde
3. **El padding debe estar en el contenedor externo** (el que se pasa como `containerId`) para que sea visible visualmente
4. **El contenedor externo debe tener fondo blanco** para que el padding sea visible

**Estructura correcta:**
```
#encuestas-table-container (externo)
  ├─ padding: 16px ✅
  ├─ background: white ✅
  ├─ border-radius: 8px ✅
  └─ .ubits-data-table__container (interno)
      ├─ padding: 0 ✅ (como está en CSS base)
      └─ contenido del componente
```

### ✅ **SOLUCIÓN APLICADA:**

**1. Aplicar padding y fondo al contenedor externo:**

```css
/* ✅ CORRECTO - Padding y fondo en el contenedor externo */
#encuestas-table-container {
  margin-top: var(--ubits-spacing-lg, 16px);
  margin-bottom: 0;
  width: 100%;
  /* Fondo blanco y padding como en Storybook */
  padding: var(--ubits-spacing-lg, 16px);
  background-color: var(--modifiers-normal-color-light-bg-1, #ffffff);
  border-radius: var(--ubits-border-radius-md, 8px);
  box-sizing: border-box;
}

/* El contenedor interno NO debe tener padding (ya lo tiene el externo) */
#encuestas-table-container .ubits-data-table__container {
  /* Mantener padding: 0 como está en el CSS base del componente */
  padding: 0;
}
```

**2. Mismo patrón para Tabs:**

```css
/* ✅ CORRECTO - Padding y fondo en el contenedor externo */
#encuestas-tabs-container {
  margin-top: 0;
  margin-bottom: var(--ubits-spacing-lg, 16px);
  width: 100%;
  /* Fondo blanco y padding como en Storybook */
  padding: var(--ubits-spacing-lg, 16px);
  background-color: var(--modifiers-normal-color-light-bg-1, #ffffff);
  border-radius: var(--ubits-border-radius-md, 8px);
  box-sizing: border-box;
}

/* El contenedor interno NO debe tener padding */
#encuestas-tabs-container .ubits-tabs {
  padding: 0;
}
```

### 📝 **REGLA DE ORO:**

**SIEMPRE aplicar padding y fondo blanco al contenedor externo (el que se pasa como `containerId`), NO al contenedor interno que crea el componente. El contenedor interno debe mantener `padding: 0` como está en el CSS base del componente.**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Verificar cómo está estructurado el componente en Storybook**
  - Revisar el wrapper principal en `Tabs.stories.ts` o `DataTable.stories.ts`
  - Ver qué contenedor tiene padding y fondo

- [ ] **⚠️ CRÍTICO: NO agregar estilos automáticamente**
  - ❌ NO agregar padding, margin, background, border-radius automáticamente
  - ✅ Solo agregar estilos si el usuario lo solicita explícitamente
  - ✅ Los componentes deben venir tal cual de Storybook

- [ ] **Aplicar padding y fondo al contenedor externo (SOLO si se solicita)**
  - El contenedor externo (el que se pasa como `containerId`) debe tener:
    - `padding: var(--ubits-spacing-lg, 16px)` - **SOLO si se solicita**
    - `background-color: var(--modifiers-normal-color-light-bg-1, #ffffff)` - **SOLO si se solicita**
    - `border-radius: var(--ubits-border-radius-md, 8px)` - **SOLO si se solicita**

- [ ] **NO modificar el contenedor interno del componente**
  - El contenedor interno (ej: `.ubits-data-table__container`, `.ubits-tabs`) debe mantener `padding: 0`
  - No usar `!important` para sobrescribir el CSS base del componente

- [ ] **Verificar visualmente que el padding se ve**
  - El componente debe tener espacio visible alrededor
  - El fondo blanco debe ser visible alrededor del componente

### 🔗 **Referencias:**

- **Storybook DataTable:** `vendor/ubits/packages/storybook/stories/DataTable.stories.ts` (líneas 543-555)
- **Storybook Tabs:** `vendor/ubits/packages/storybook/stories/Tabs.stories.ts` (líneas 120-129)
- **CSS base DataTable:** `vendor/ubits/packages/components/data-table/src/styles/data-table.css` (línea 13)
- **CSS base Tabs:** `vendor/ubits/packages/components/tabs/src/styles/tabs.css` (línea 12)

---

## ⚠️ ERROR CRÍTICO #13: Contenedor .content-sections por Defecto Aparece Debajo de Componentes Personalizados

### ❌ **PROBLEMA IDENTIFICADO:**

Cuando se implementan componentes personalizados (Tabs, DataTable, etc.) en un template, el contenedor `.content-sections` por defecto que viene en el template aparece debajo de los componentes personalizados, causando contenido duplicado o no deseado.

**Síntoma:**
- Los componentes personalizados (Tabs, DataTable) se renderizan correctamente
- Pero aparece un contenedor `.content-sections` con contenido por defecto debajo de los componentes
- El contenido por defecto (ej: "Contenido principal") es visible en la página

**Ejemplo del error:**
```html
<!-- ❌ INCORRECTO - .content-sections por defecto queda en el HTML -->
<div class="content-area">
  <div id="encuestas-tabs-container"></div>
  <div id="encuestas-table-container"></div>
  
  <!-- Este contenedor por defecto NO debería estar aquí -->
  <div class="content-sections">
    <div class="section-single">
      <div class="widget-contenido-principal">
        <p>Contenido principal</p>
      </div>
    </div>
  </div>
</div>
```

### 🔍 **CAUSA RAÍZ:**

1. **Los templates vienen con `.content-sections` por defecto** para mostrar contenido genérico
2. **`ContentManager.updateContent` crea `.content-sections` dinámicamente** cuando actualiza el contenido
3. **Cuando hay componentes personalizados, el `.content-sections` no es necesario** y debe eliminarse
4. **El `.content-sections` queda visible** debajo de los componentes personalizados

### ✅ **SOLUCIÓN APLICADA:**

**1. Eliminar `.content-sections` del HTML estático:**

```html
<!-- ✅ CORRECTO - Solo contenedores de componentes personalizados -->
<div class="content-area">
  <!-- ⚠️ NOTA: El contenedor .content-sections por defecto se elimina cuando hay componentes personalizados -->
  <div id="encuestas-tabs-container"></div>
  <div id="encuestas-table-container"></div>
</div>
```

**2. Eliminar `.content-sections` si se crea dinámicamente:**

```javascript
// En el interceptor de updateContent
setTimeout(() => {
  const contentArea = document.querySelector('.content-area');
  if (contentArea) {
    // ⚠️ CRÍTICO: Eliminar .content-sections si se creó (no lo necesitamos cuando hay componentes personalizados)
    const contentSections = contentArea.querySelector('.content-sections');
    if (contentSections) {
      console.log('🔵 [Encuestas] Eliminando .content-sections por defecto (no necesario con componentes personalizados)');
      contentSections.remove();
    }
    
    // Restaurar componentes personalizados...
  }
}, 50);
```

### 📝 **REGLA DE ORO:**

**SIEMPRE eliminar el contenedor `.content-sections` por defecto cuando se implementan componentes personalizados. Eliminarlo tanto del HTML estático como interceptar `updateContent` para eliminarlo si se crea dinámicamente.**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Eliminar `.content-sections` del HTML estático**
  - Buscar `<div class="content-sections">` en el template
  - Eliminarlo completamente cuando hay componentes personalizados

- [ ] **Interceptar `updateContent` para eliminar `.content-sections` dinámicamente**
  - Después de llamar al método original de `updateContent`
  - Buscar `.content-sections` en el `content-area`
  - Eliminarlo si existe

- [ ] **Verificar visualmente que no aparece contenido por defecto**
  - El contenido por defecto (ej: "Contenido principal") no debe ser visible
  - Solo deben aparecer los componentes personalizados

### 🔗 **Referencias:**

- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Template base:** `vendor/ubits/packages/templates/template-admin.html` (líneas 430-441)

---

## ⚠️ ERROR CRÍTICO #14: Asumir que Todos los Componentes Necesitan Contenedor

### ❌ **PROBLEMA IDENTIFICADO:**

Después de corregir el padding de un componente (ej: DataTable), se asumió incorrectamente que TODOS los componentes necesitan contenedor con padding y fondo, aplicando la misma solución a componentes que NO lo necesitan (ej: Tabs).

**Síntoma:**
- El análisis de la imagen detectó correctamente que los Tabs NO tenían contenedor
- Pero después del arreglo de la DataTable, se agregó contenedor a los Tabs también
- Los Tabs quedan con padding y fondo innecesarios

**Ejemplo del error:**
```html
<!-- ❌ INCORRECTO - Tabs con contenedor (no lo necesita) -->
<div id="encuestas-tabs-container" style="padding: 16px; background: white;">
  <div class="ubits-tabs">...</div>
</div>
```

### 🔍 **CAUSA RAÍZ:**

1. **No todos los componentes necesitan contenedor con padding y fondo**
   - **DataTable:** SÍ necesita contenedor (tiene header, botones, etc. que necesitan padding)
   - **Tabs:** NO necesita contenedor (se crea directamente en content-area)

2. **El análisis de la imagen detectó correctamente la estructura**
   - El análisis identificó que los Tabs NO tenían contenedor
   - Pero después del arreglo de la DataTable, se aplicó la misma solución a los Tabs

3. **Confusión entre diferentes tipos de componentes**
   - Componentes complejos (DataTable) pueden necesitar contenedor
   - Componentes simples (Tabs) NO necesitan contenedor

### ✅ **SOLUCIÓN APLICADA:**

**1. Verificar en el análisis si el componente necesita contenedor:**

```markdown
### Estructura identificada:
1. SubNav (sin contenedor, ya existe)
2. Tabs (sin contenedor, se crea directamente en content-area) ✅
3. DataTable (con contenedor, necesita padding y fondo) ✅
```

**2. Implementar según el análisis:**

```html
<!-- ✅ CORRECTO - Tabs sin contenedor -->
<div class="content-area">
  <!-- Tabs: NO tiene contenedor, se crea directamente en content-area -->
  <!-- DataTable: SÍ tiene contenedor con padding y fondo -->
  <div id="encuestas-table-container">...</div>
</div>
```

```javascript
// ✅ CORRECTO - Tabs sin contenedor
window.initEncuestasTabs = function() {
  const contentArea = document.querySelector('.content-area');
  // Crear tabs directamente en content-area (sin contenedor)
  // Usar contenedor temporal solo para createTabs, luego mover a content-area
};
```

```css
/* ✅ CORRECTO - Tabs sin contenedor */
.content-area > .ubits-tabs {
  margin-top: var(--ubits-spacing-lg, 16px);
  margin-bottom: var(--ubits-spacing-lg, 16px);
  width: 100%;
}

/* DataTable SÍ tiene contenedor */
#encuestas-table-container {
  padding: var(--ubits-spacing-lg, 16px);
  background-color: var(--modifiers-normal-color-light-bg-1, #ffffff);
  border-radius: var(--ubits-border-radius-md, 8px);
}
```

### 📝 **REGLA DE ORO:**

**NO asumir que todos los componentes necesitan contenedor. Verificar en el análisis de la imagen si cada componente necesita contenedor o no. Solo aplicar contenedor con padding y fondo cuando el componente realmente lo necesite (ej: DataTable con header y botones).**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Verificar en el análisis si el componente necesita contenedor**
  - ¿El componente tiene header, botones, o elementos que necesiten padding?
  - ¿El componente se crea directamente en content-area o necesita contenedor?

- [ ] **NO aplicar la misma solución a todos los componentes**
  - DataTable: SÍ necesita contenedor (tiene header, botones, etc.)
  - Tabs: NO necesita contenedor (se crea directamente en content-area)
  - SubNav: NO necesita contenedor (ya existe, se crea automáticamente)

- [ ] **Seguir el análisis de la imagen**
  - Si el análisis dice "sin contenedor", NO crear contenedor
  - Si el análisis dice "con contenedor", crear contenedor con padding y fondo

- [ ] **Verificar visualmente que la estructura coincide con la imagen**
  - Los Tabs deben estar directamente en content-area (sin contenedor)
  - La DataTable debe tener padding y fondo (con contenedor)

### 🔗 **Referencias:**

- **Guía de análisis de estructura:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`
- **Guía de creación desde imagen:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`

---

## ⚠️ ERROR CRÍTICO #15: No Contar Items/Filas en la Imagen de DataTable

### ❌ **PROBLEMA IDENTIFICADO:**

Al analizar una imagen con DataTable, no se contó cuántos items/filas había en la tabla, creando solo 2-3 items de ejemplo cuando en la imagen se veían muchos items que llegaban hasta abajo.

**Síntoma:**
- El análisis identificó correctamente las columnas y estructura
- Pero solo se crearon 2-3 items de ejemplo
- En la imagen se veían muchos items (12+ filas visibles, scroll, contador "206 encuestas")
- La tabla implementada no refleja la cantidad real de la imagen

**Ejemplo del error:**
```javascript
// ❌ INCORRECTO - Solo 3 items de ejemplo
rows: [
  { id: '1', nombre: 'Encuesta 1', tipo: 'Tipo A', estado: 'Activa' },
  { id: '2', nombre: 'Encuesta 2', tipo: 'Tipo B', estado: 'Pausada' },
  { id: '3', nombre: 'Encuesta 3', tipo: 'Tipo A', estado: 'Activa' }
]
```

### 🔍 **CAUSA RAÍZ:**

1. **No se incluyó el conteo de items en el proceso de análisis**
   - El análisis se enfocó en columnas, estructura y funcionalidades
   - No se incluyó un paso obligatorio para contar items/filas

2. **Se asumió que 2-3 items eran suficientes para "ejemplo"**
   - Se crearon items mínimos sin considerar la imagen real
   - No se verificó si había scroll o contador en el header

3. **Falta de documentación sobre cantidad de items**
   - No hay guía clara sobre cuántos items crear
   - No hay regla sobre mínimo de items cuando hay scroll

### ✅ **SOLUCIÓN APLICADA:**

**1. Agregar paso obligatorio de conteo en el análisis:**

```markdown
### PASO 0: CONTAR ITEMS/FILAS EN LA IMAGEN ⚠️ CRÍTICO

**ANTES de analizar columnas o estructura, SIEMPRE contar cuántos items/filas hay en la tabla:**

1. **Contar filas visibles:**
   - ¿Cuántas filas se ven completamente en la imagen?
   - ¿Hay scroll o paginación visible?
   - ¿La tabla llega hasta abajo de la imagen?

2. **Estimar cantidad total:**
   - Si hay scroll, estimar cuántos items hay en total
   - Si hay contador (ej: "206 encuestas"), usar ese número
   - Si no hay contador, contar las filas visibles y estimar

3. **Documentar en el análisis:**
   - Filas visibles en imagen: [X] filas
   - Scroll visible: Sí / No
   - Contador en header: "[texto]" (si existe)
   - Cantidad total estimada: [X] items
   - Items a crear en implementación: [X] items (mínimo para mostrar scroll si aplica)
```

**2. Crear cantidad razonable de items:**

```javascript
// ✅ CORRECTO - Cantidad razonable que refleje la imagen
const items = [];
const cantidadItems = 20; // Mínimo para mostrar scroll si hay scroll en la imagen

for (let i = 1; i <= cantidadItems; i++) {
  items.push({
    id: `encuesta-${i}`,
    nombre: `Encuesta ${i}`,
    tipo: i % 2 === 0 ? 'Tipo A' : 'Tipo B',
    estado: i % 3 === 0 ? 'Pausada' : 'Activa',
    inicio: new Date(2024, 0, i).toLocaleDateString('es-ES'),
    cierre: new Date(2024, 1, i).toLocaleDateString('es-ES'),
    participantes: Math.floor(Math.random() * 100) + 10,
    avance: Math.floor(Math.random() * 100)
  });
}

window.createDataTable({
  // ... configuración
  rows: items
});
```

### 📝 **REGLA DE ORO:**

**SIEMPRE contar cuántos items/filas hay en la imagen ANTES de crear el DataTable. Crear una cantidad razonable que refleje la imagen (mínimo 10-15 items si hay scroll, o la cantidad exacta si se ve completa). NO crear solo 2-3 items de ejemplo.**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Contar filas visibles en la imagen**
  - ¿Cuántas filas se ven completamente?
  - ¿Hay scroll o paginación visible?

- [ ] **Verificar contador en header**
  - ¿Hay un contador? (ej: "206 encuestas")
  - Si existe, usar ese número como referencia

- [ ] **Estimar cantidad total**
  - Si hay scroll, estimar cuántos items hay en total
  - Si no hay scroll, contar las filas visibles exactamente

- [ ] **Documentar en el análisis**
  - Filas visibles: [X] filas
  - Scroll: Sí / No
  - Contador: "[texto]" (si existe)
  - Items a crear: [X] items

- [ ] **Crear cantidad razonable de items**
  - Mínimo 10-15 items si hay scroll
  - Cantidad exacta si se ve completa
  - NO crear solo 2-3 items de ejemplo

### 🔗 **Referencias:**

- **Guía de análisis DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Guía de generar items:** `docs/guias/implementacion/GUIA-GENERAR-ITEMS-DATATABLE.md` - ⚠️ **OBLIGATORIO**

---

## ⚠️ ERROR CRÍTICO #16: DataTable No Aparece Después de updateContent

### ❌ **PROBLEMA IDENTIFICADO:**

El DataTable no aparece después de que `ContentManager.updateContent` limpia el DOM, aunque el contenedor se restaura correctamente.

**Síntoma:**
- El contenedor `#encuestas-table-container` existe en el DOM
- Pero el DataTable no se renderiza dentro del contenedor
- Los logs muestran que `initEncuestasDataTable` se llama, pero el DataTable no aparece

### 🔍 **CAUSA RAÍZ:**

1. **Timing issue entre restauración e inicialización:**
   - `ContentManager.updateContent` limpia el DOM con `innerHTML = ''`
   - El contenedor se restaura con `insertAdjacentHTML`
   - La verificación de si el DataTable existe se hace inmediatamente después de restaurar
   - Pero el DOM puede no estar completamente actualizado cuando se verifica
   - La inicialización no se ejecuta porque la verificación falla o se ejecuta antes de tiempo

2. **Falta de logs para depuración:**
   - No se logueaba si el contenedor se encontraba
   - No se logueaba si el DataTable ya existía
   - No se logueaba si la función de inicialización estaba disponible

### ✅ **SOLUCIÓN APLICADA:**

**1. Agregar setTimeout para asegurar que el DOM esté actualizado:**

```javascript
// ✅ CORRECTO - Timeout para asegurar que el DOM esté actualizado
setTimeout(() => {
  const restoredTable = document.getElementById('encuestas-table-container');
  console.log('🔵 [Encuestas] Verificando table-container restaurado:', restoredTable);
  if (restoredTable) {
    const hasDataTable = restoredTable.querySelector('.ubits-data-table');
    console.log('🔵 [Encuestas] DataTable ya existe en contenedor restaurado:', hasDataTable);
    if (!hasDataTable) {
      console.log('🔵 [Encuestas] DataTable no existe, inicializando...');
      if (window.initEncuestasDataTable) {
        window.initEncuestasDataTable();
      } else {
        console.error('❌ [Encuestas] window.initEncuestasDataTable no está disponible');
      }
    }
  } else {
    console.error('❌ [Encuestas] table-container no se restauró correctamente');
  }
}, 100); // ✅ Timeout de 100ms para asegurar que el DOM esté actualizado
```

**2. Agregar logs detallados para depuración:**

```javascript
// ✅ CORRECTO - Logs detallados
const initWhenReady = () => {
  console.log('🔵 [Encuestas DataTable] initWhenReady ejecutándose...');
  const container = document.getElementById('encuestas-table-container');
  if (!container) {
    console.warn('⚠️ [Encuestas DataTable] Contenedor no encontrado, reintentando...');
    setTimeout(initWhenReady, 100);
    return;
  }
  console.log('✅ [Encuestas DataTable] Contenedor encontrado:', container);
  // ... resto de la lógica
};
```

### 📝 **REGLA DE ORO:**

**SIEMPRE usar `setTimeout` con un delay apropiado (100ms) después de restaurar elementos HTML con `insertAdjacentHTML` o `innerHTML` para asegurar que el DOM esté completamente actualizado antes de verificar o inicializar componentes.**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Usar setTimeout después de restaurar elementos HTML**
  - Delay mínimo de 100ms para asegurar que el DOM esté actualizado
  - Verificar que el elemento existe antes de inicializar

- [ ] **Agregar logs detallados para depuración**
  - Log cuando se restaura el contenedor
  - Log cuando se verifica si el componente existe
  - Log cuando se inicializa el componente
  - Log de errores si algo falla

- [ ] **Verificar que las funciones de inicialización estén disponibles**
  - Verificar `window.initEncuestasDataTable` antes de llamarla
  - Log si la función no está disponible

- [ ] **Verificar que el componente no exista antes de inicializar**
  - Verificar `container.querySelector('.ubits-data-table')` antes de inicializar
  - Evitar inicializaciones duplicadas

### 🔗 **Referencias:**

- **Análisis del error:** `docs/guias/analisis/ANALISIS-ERROR-DATATABLE-NO-APARECE.md`
- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Guía de manejo de logs:** `docs/guias/implementacion/GUIA-MANEJO-LOGS-DEPURACION.md`

---

## ⚠️ ERROR CRÍTICO #10: Tabs No Actualizan Estado Activo al Hacer Click

### ❌ **PROBLEMA IDENTIFICADO:**
```javascript
// ❌ PROBLEMA: El tab "Datos demográficos" no pasa a estado activo al hacer click
window.createTabs({
  tabs: [
    { id: 'encuestas', label: 'Encuestas', icon: 'list-ul' },
    { id: 'datos-demograficos', label: 'Datos demográficos', icon: 'chart-pie-simple' }
  ],
  activeTabId: 'encuestas',
  onTabChange: (tabId) => console.log('Tab:', tabId)
}, 'tabs-container');
```

**Síntoma:**
- Al hacer click en "Datos demográficos", el tab no cambia visualmente a estado activo
- La clase CSS `ubits-tab--active` se actualiza, pero los iconos no cambian de `far` (regular) a `fas` (solid)

### 🔍 **CAUSA RAÍZ:**

El componente Tabs renderiza los iconos una sola vez al inicio usando `renderIconHelper(tab.icon, isActive)`, donde `isActive` se determina en el momento del renderizado inicial. Cuando se hace click en un tab:

1. ✅ Se actualiza la clase CSS `ubits-tab--active` correctamente
2. ❌ **NO se actualizan los iconos** - quedan con el estilo que tenían al renderizarse inicialmente

**Resultado:**
- Tab inicialmente activo: icono `fas` (solid) ✅
- Tab inicialmente inactivo: icono `far` (regular) ✅
- Al hacer click: la clase CSS cambia, pero el icono sigue siendo `far` ❌

### ✅ **SOLUCIÓN APLICADA:**

Se corrigió `vendor/ubits/packages/components/tabs/src/TabsProvider.ts` en la función `handleTabClick` para actualizar los iconos cuando cambia el tab activo:

```typescript
const handleTabClick = (tabElement: HTMLElement) => {
  // ... código existente ...
  
  // Remover active de todos los tabs y actualizar iconos
  tabsElement.querySelectorAll('.ubits-tab').forEach((t) => {
    t.classList.remove('ubits-tab--active');
    // ✅ NUEVO: Actualizar icono del tab inactivo (regular)
    const iconElement = t.querySelector('i');
    if (iconElement) {
      const iconName = iconElement.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
      if (iconName) {
        iconElement.className = `far fa-${iconName}`;
      }
    }
  });

  // Agregar active al tab clickeado y actualizar icono
  tabElement.classList.add('ubits-tab--active');
  // ✅ NUEVO: Actualizar icono del tab activo (solid)
  const activeIconElement = tabElement.querySelector('i');
  if (activeIconElement) {
    const iconName = activeIconElement.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
    if (iconName) {
      activeIconElement.className = `fas fa-${iconName}`;
    }
  }
  
  // ... resto del código ...
};
```

### 📝 **VERIFICACIÓN:**

**Después de la corrección:**
- ✅ Al hacer click en cualquier tab, la clase CSS `ubits-tab--active` se actualiza
- ✅ Los iconos se actualizan correctamente: `far` (inactivo) → `fas` (activo)
- ✅ El tab activo se muestra visualmente correcto

### 📋 **Checklist para Futuras Implementaciones:**
- [ ] ¿Verifico que los tabs cambien correctamente al hacer click?
- [ ] ¿Los iconos cambian de `far` a `fas` cuando el tab se activa?
- [ ] ¿La clase CSS `ubits-tab--active` se aplica correctamente?
- [ ] ¿Pruebo hacer click en todos los tabs para verificar el comportamiento?

### 🔗 **Referencias:**
- **Archivo corregido:** `vendor/ubits/packages/components/tabs/src/TabsProvider.ts`
- **Función:** `handleTabClick()` (líneas 99-134)
- **Fecha de corrección:** Diciembre 2024
- [ ] ¿Retorno temprano (`return`) si no estamos en el módulo correcto?

---

## ⚠️ ERROR CRÍTICO #9: Eliminar HeaderSection en Todos los Módulos

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Eliminar HeaderSection en TODOS los módulos
function interceptContentManager() {
  window.UBITS_ContentManager.updateContent = function(section, subSection) {
    // Eliminar HeaderSection SIEMPRE (sin verificar módulo)
    const headerSection = document.getElementById('header-section-container');
    if (headerSection) {
      headerSection.remove(); // ❌ Esto elimina HeaderSection en TODOS los módulos
    }
    // ...
  };
}

// Observer que elimina HeaderSection en TODOS los módulos
const observer = new MutationObserver((mutations) => {
  const headerSection = document.getElementById('header-section-container');
  if (headerSection) {
    headerSection.remove(); // ❌ Esto elimina HeaderSection en TODOS los módulos
  }
});
```

### ✅ **CORRECTO (SOLUCIÓN COMPLETA):**
```javascript
// ✅ CORRECTO: Eliminar HeaderSection SOLO en el módulo específico
(function() {
  function interceptContentManager() {
    // Verificar módulo actual
    const currentModule = document.body.getAttribute('data-module');
    if (currentModule !== 'encuestas') {
      return; // NO interceptar si no estamos en encuestas
    }
    
    if (!window.UBITS_ContentManager) {
      // Si ContentManager aún no existe, esperar
      setTimeout(interceptContentManager, 100);
      return;
    }
    
    // Guardar referencia al método original
    const originalUpdateContent = window.UBITS_ContentManager.updateContent;
    if (!originalUpdateContent) {
      console.warn('⚠️ [Encuestas] updateContent no existe en ContentManager');
      return;
    }
    
    // Interceptar el método
    window.UBITS_ContentManager.updateContent = function(section, subSection) {
      // ⚠️ CRÍTICO: Solo interceptar si estamos en módulo encuestas
      const currentModule = document.body.getAttribute('data-module');
      if (currentModule !== 'encuestas') {
        // Si no estamos en encuestas, usar comportamiento original
        return originalUpdateContent.call(this, section, subSection);
      }
      
      console.log('🔵 [Encuestas] updateContent interceptado para sección:', section);
      
      // Guardar elementos antes de actualizar (si los hay)
      const tabsContainer = document.getElementById('encuestas-tabs-container');
      const tableContainer = document.getElementById('encuestas-table-container');
      const tabsHTML = tabsContainer ? tabsContainer.outerHTML : null;
      const tableHTML = tableContainer ? tableContainer.outerHTML : null;
      
      // Llamar al método original (que limpia el content-area y crea HeaderSection)
      const result = originalUpdateContent.call(this, section, subSection);
      
      // Restaurar elementos después de actualizar
      setTimeout(() => {
        const contentArea = document.querySelector('.content-area');
        if (!contentArea) {
          console.warn('⚠️ [Encuestas] content-area no encontrado');
          return;
        }
        
        // ⚠️ CRÍTICO: Eliminar HeaderSection si se creó dinámicamente
        const headerSectionContainer = contentArea.querySelector('#header-section-container');
        if (headerSectionContainer) {
          console.log('🔵 [Encuestas] Eliminando HeaderSection creado dinámicamente');
          headerSectionContainer.remove();
        }
        
        // También buscar por clase por si acaso
        const headerSection = contentArea.querySelector('.ubits-header-section');
        if (headerSection) {
          console.log('🔵 [Encuestas] Eliminando .ubits-header-section encontrado');
          headerSection.closest('#header-section-container')?.remove() || headerSection.remove();
        }
        
        // Eliminar .content-sections si se creó dinámicamente
        const contentSections = contentArea.querySelector('.content-sections');
        if (contentSections) {
          console.log('🔵 [Encuestas] Eliminando .content-sections creado dinámicamente');
          contentSections.remove();
        }
        
        // Restaurar contenedores si no existen (si los necesitas)
        if (tabsHTML) {
          const existingTabs = contentArea.querySelector('#encuestas-tabs-container');
          if (!existingTabs) {
            console.log('🔵 [Encuestas] Restaurando contenedor de Tabs');
            contentArea.insertAdjacentHTML('afterbegin', tabsHTML);
          }
        }
        
        if (tableHTML) {
          const existingTable = contentArea.querySelector('#encuestas-table-container');
          if (!existingTable) {
            console.log('🔵 [Encuestas] Restaurando contenedor de DataTable');
            const tabsContainer = contentArea.querySelector('#encuestas-tabs-container');
            if (tabsContainer) {
              tabsContainer.insertAdjacentHTML('afterend', tableHTML);
            } else {
              contentArea.insertAdjacentHTML('afterbegin', tableHTML);
            }
          }
        }
      }, 50);
      
      return result;
    };
    
    console.log('✅ [Encuestas] ContentManager.updateContent interceptado');
  }
  
  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', interceptContentManager);
  } else {
    interceptContentManager();
  }
  
  // También ejecutar después de que ContentManager se cargue
  setTimeout(interceptContentManager, 500);
  setTimeout(interceptContentManager, 1000);
  
  // ⚠️ CRÍTICO: MutationObserver para eliminar HeaderSection si se crea dinámicamente
  function setupHeaderSectionObserver() {
    const currentModule = document.body.getAttribute('data-module');
    if (currentModule !== 'encuestas') {
      return; // NO observar si no estamos en encuestas
    }
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Verificar si es el contenedor del HeaderSection
              if (node.id === 'header-section-container' || 
                  node.classList?.contains('ubits-header-section') ||
                  node.querySelector?.('#header-section-container') ||
                  node.querySelector?.('.ubits-header-section')) {
                console.log('🔵 [Encuestas] HeaderSection detectado en MutationObserver, eliminando...');
                
                // Eliminar el contenedor completo
                const headerContainer = document.getElementById('header-section-container');
                if (headerContainer) {
                  headerContainer.remove();
                  console.log('🔵 [Encuestas] ✅ HeaderSection eliminado por MutationObserver');
                }
                
                // También buscar por clase
                const headerSection = document.querySelector('.ubits-header-section');
                if (headerSection) {
                  headerSection.closest('#header-section-container')?.remove() || headerSection.remove();
                  console.log('🔵 [Encuestas] ✅ .ubits-header-section eliminado por MutationObserver');
                }
              }
            }
          });
        }
      });
    });
    
    // Observar el content-area
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      observer.observe(contentArea, {
        childList: true,
        subtree: true
      });
      console.log('✅ [Encuestas] MutationObserver configurado para eliminar HeaderSection');
    } else {
      // Si content-area aún no existe, esperar
      setTimeout(setupHeaderSectionObserver, 100);
    }
  }
  
  // Configurar observer cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeaderSectionObserver);
  } else {
    setupHeaderSectionObserver();
  }
  
  // También configurar después de delays
  setTimeout(setupHeaderSectionObserver, 500);
  setTimeout(setupHeaderSectionObserver, 1000);
})();
```

### 🔍 **¿Por qué?**
- El HeaderSection es necesario en otros módulos (inicio, empresa, aprendizaje, etc.)
- Si lo eliminas en todos los módulos, rompes la UI de otros módulos
- Solo debes eliminarlo en el módulo específico donde la imagen no lo muestra

### 📝 **Regla de Oro:**
**SIEMPRE verificar el módulo/sección antes de eliminar HeaderSection:**
```javascript
// Opción 1: Verificar módulo
const currentModule = document.body.getAttribute('data-module');
if (currentModule !== 'encuestas') {
  return; // NO eliminar si no estamos en el módulo correcto
}

// Opción 2: Verificar sección en ContentManager
const currentSection = window.UBITS_ContentManager?.currentSection;
if (currentSection !== 'encuestas') {
  return; // NO eliminar si no estamos en la sección correcta
}

// Opción 3: Verificar en interceptación
if (section !== 'encuestas') {
  return originalUpdateContent.call(this, section, subSection);
}
```

### 📋 **Checklist:**
- [ ] ¿Verifico el módulo/sección antes de eliminar HeaderSection?
- [ ] ¿Uso `section !== 'encuestas'` en la interceptación?
- [ ] ¿Uso `currentSection !== 'encuestas'` en el observer?
- [ ] ¿Retorno temprano (`return`) si no estamos en el módulo correcto?
- [ ] ¿Llamo al método original para otros módulos?

### 🔗 **Guía Completa:**
**Para ver la solución completa paso a paso con código listo para copiar:**
- **Ver:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md` - ⚠️ **OBLIGATORIO**

---

## ⚠️ ERROR CRÍTICO #10: Conflicto de Interceptores con Object.defineProperty

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Múltiples interceptores usando Object.defineProperty
// Interceptor 1 (wizard)
Object.defineProperty(window, 'UBITS_ContentManager', {
  set: function(value) {
    window._UBITS_ContentManager = value;
    // ...
  },
  get: function() {
    return window._UBITS_ContentManager;
  }
});

// Interceptor 2 (HeaderSection) - PROBLEMA: Interfiere con el primero
Object.defineProperty(window, 'UBITS_ContentManager', {
  set: function(value) {
    // Esto reemplaza el descriptor anterior
    // ...
  }
});
```

**Problema:**
- El primer interceptor usa `Object.defineProperty` con getter/setter
- Si luego reemplaza el descriptor con `{ value, writable: true }`, elimina el getter/setter
- El segundo interceptor intenta usar `Object.defineProperty` de nuevo
- **Resultado:** `UBITS_ContentManager` nunca se crea correctamente
- **Síntoma:** SubNav no aparece porque `updateSubNav` nunca se llama

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Usar setInterval polling para detectar cuando se crea
const checkContentManager = setInterval(() => {
  if (window.UBITS_ContentManager && !window._UBITS_ContentManager_HeaderSection_Intercepted) {
    window._UBITS_ContentManager_HeaderSection_Intercepted = true;
    
    // Interceptar métodos después de que se crea
    const originalUpdateContent = window.UBITS_ContentManager.updateContent;
    window.UBITS_ContentManager.updateContent = function(section, subSection) {
      // Tu lógica aquí
      return originalUpdateContent.call(this, section, subSection);
    };
    
    clearInterval(checkContentManager);
  }
}, 100);

// Timeout de seguridad
setTimeout(() => clearInterval(checkContentManager), 10000);
```

### 🔍 **¿Por qué?**
- No interfiere con otros interceptores
- Espera a que `UBITS_ContentManager` exista antes de interceptar
- No modifica el descriptor, solo intercepta métodos después de que se crea
- Funciona incluso si hay múltiples interceptores

### 📝 **Regla de Oro:**
**SIEMPRE usar polling (`setInterval`) o `MutationObserver` para interceptar `UBITS_ContentManager`:**
```javascript
// Opción 1: setInterval (recomendado)
const checkContentManager = setInterval(() => {
  if (window.UBITS_ContentManager) {
    interceptContentManager();
    clearInterval(checkContentManager);
  }
}, 100);

// Opción 2: MutationObserver
const observer = new MutationObserver(() => {
  if (window.UBITS_ContentManager) {
    interceptContentManager();
    observer.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
```

### 📋 **Checklist:**
- [ ] ¿Verifico si ya existe un interceptor antes de crear uno nuevo?
- [ ] ¿Uso `setInterval` o `MutationObserver` en lugar de `Object.defineProperty`?
- [ ] ¿Verifico que `UBITS_ContentManager` existe antes de interceptar métodos?
- [ ] ¿Agrego un timeout de seguridad para evitar loops infinitos?
- [ ] ¿Uso una bandera para evitar interceptar múltiples veces?

---

## ⚠️ ERROR CRÍTICO #18: Checkboxes DataTable Causan Desaparición de Tabla

### ❌ **PROBLEMA IDENTIFICADO:**

Al hacer click en un checkbox del DataTable:
- ✅ El checkbox se selecciona visualmente
- ❌ La tabla completa desaparece del DOM
- ❌ El contenedor `#encuestas-table-container` se elimina
- ❌ Los logs muestran: `⚠️ [Encuestas DataTable] Contenedor no encontrado, reintentando...` (infinitamente)

**Síntoma en logs:**
```
🔵 [Encuestas] Guardando elementos antes de updateContent
🔵 [Encuestas] Restaurando table-container...
❌ [Encuestas] table-container no se restauró correctamente
⚠️ [Encuestas DataTable] Contenedor no encontrado, reintentando...
```

### 🔍 **CAUSA RAÍZ:**

1. **`ContentManager.updateContent` se ejecuta innecesariamente:**
   - Al seleccionar un checkbox, algo dispara `updateContent`
   - `updateContent` limpia `.content-area` con `innerHTML = ''`
   - El contenedor `#encuestas-table-container` se elimina
   - La lógica de restauración no funcionaba correctamente

2. **Falta de prevención de `updateContent` innecesario:**
   - No había verificación para evitar que `updateContent` se ejecutara cuando:
     - La sección no cambió realmente
     - Solo se está interactuando con componentes (checkboxes, búsqueda, etc.)
     - No hay navegación real

3. **Lógica de restauración no robusta:**
   - No verificaba si el HTML guardado era válido
   - No tenía fallback si la restauración fallaba
   - No creaba el contenedor si no existía después de restaurar

### ✅ **SOLUCIÓN APLICADA:**

**1. Prevenir `updateContent` innecesario:**

```javascript
// ✅ CORRECTO - Prevenir updateContent si no hay cambio real de sección
window.UBITS_ContentManager.updateContent = function(section, subSection) {
  const currentModule = document.body.getAttribute('data-module');
  const shouldPreserve = currentModule === 'encuestas' || section === 'encuestas';
  
  // ⚠️ CRÍTICO: Si estamos en encuestas y la sección no cambió, evitar ejecutar updateContent
  if (shouldPreserve && section === 'encuestas') {
    const currentSection = window.UBITS_ContentManager?.currentSection;
    if (currentSection === 'encuestas' && !subSection) {
      console.log('🔵 [Encuestas] ⚠️ updateContent llamado para encuestas sin cambio de sección, evitando ejecución...');
      // No ejecutar updateContent si no hay cambio real de sección
      return;
    }
  }
  
  if (shouldPreserve) {
    // ... resto de la lógica
  }
};
```

**2. Mejorar lógica de restauración con fallback:**

```javascript
// ✅ CORRECTO - Lógica robusta de restauración con fallback
if (tableHTML) {
  const existingTable = contentArea.querySelector('#encuestas-table-container');
  
  if (!existingTable) {
    // Restaurar contenedor
    tabsElement.insertAdjacentHTML('afterend', tableHTML);
    
    setTimeout(() => {
      const restoredTable = document.getElementById('encuestas-table-container');
      
      if (restoredTable) {
        const hasDataTable = restoredTable.querySelector('.ubits-data-table');
        if (!hasDataTable) {
          restoredTable.innerHTML = '';
          window.initEncuestasDataTable();
        }
      } else {
        // ⚠️ FALLBACK: Crear contenedor si no existe
        const newContainer = document.createElement('div');
        newContainer.id = 'encuestas-table-container';
        tabsElement.insertAdjacentElement('afterend', newContainer);
        setTimeout(() => {
          window.initEncuestasDataTable();
        }, 50);
      }
    }, 100);
  }
} else {
  // ⚠️ FALLBACK: Crear contenedor si no hay HTML guardado
  const existingTable = contentArea.querySelector('#encuestas-table-container');
  if (!existingTable) {
    const newContainer = document.createElement('div');
    newContainer.id = 'encuestas-table-container';
    tabsElement.insertAdjacentElement('afterend', newContainer);
    setTimeout(() => {
      window.initEncuestasDataTable();
    }, 100);
  }
}
```

### 📝 **REGLA DE ORO:**

**SIEMPRE prevenir `updateContent` innecesario y tener fallback en restauración:**

1. **Verificar si realmente hay cambio de sección** antes de ejecutar `updateContent`
2. **Implementar lógica de restauración robusta** con fallback si la restauración falla
3. **Agregar logs detallados** para diagnóstico en cada paso crítico
4. **Crear contenedor si no existe** después de restaurar

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Verificar si `updateContent` se ejecuta innecesariamente** - Agregar prevención si es necesario
- [ ] **Implementar lógica de restauración robusta** - Con fallback si la restauración falla
- [ ] **Agregar logs detallados** - Para diagnóstico en cada paso crítico
- [ ] **Probar interacciones** - Verificar que los componentes no desaparezcan al interactuar
- [ ] **Verificar timing** - Usar `setTimeout` apropiado para asegurar que el DOM esté actualizado
- [ ] **Crear contenedor si no existe** - Fallback para crear contenedor si la restauración falla

### 🔗 **Referencias:**

- **Análisis del error:** `docs/guias/analisis/ANALISIS-ERROR-CHECKBOXES-DATATABLE-DESAPARECE.md`
- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Análisis de error DataTable no aparece:** `docs/guias/analisis/ANALISIS-ERROR-DATATABLE-NO-APARECE.md`

---

## ⚠️ ERROR CRÍTICO #19: DataTable No Aparece - Función `window.initEncuestasDataTable` No Disponible

### ❌ **PROBLEMA IDENTIFICADO:**

El DataTable no aparece porque `window.initEncuestasDataTable` es `undefined` cuando se intenta inicializar después de restaurar el contenedor.

**Síntoma en logs:**
```
🔵 [Encuestas] DataTable no existe, inicializando...
🔵 [Encuestas] Verificando window.initEncuestasDataTable: undefined
❌ [Encuestas] window.initEncuestasDataTable no está disponible
❌ [Encuestas] Tipo: undefined
```

### 🔍 **CAUSA RAÍZ:**

1. **Error de sintaxis que bloquea la ejecución del script:**
   - Se usó sintaxis de TypeScript (`as HTMLElement`) en un archivo HTML
   - El navegador no entiende TypeScript, solo JavaScript
   - Esto causa un `SyntaxError: Unexpected identifier 'as'`
   - El error bloquea la ejecución completa del script
   - La función `window.initEncuestasDataTable` nunca se define porque el script falla antes de llegar a esa línea

2. **Orden de ejecución de scripts:**
   - El script que define `window.initEncuestasDataTable` se ejecuta cuando el DOM está listo
   - El código de restauración se ejecuta antes de que la función esté definida
   - La función es `undefined` cuando se necesita

2. **IIFE con delay:**
   - La función se define dentro de una IIFE que espera `DOMContentLoaded`
   - Y también espera a que `window.createDataTable` esté disponible
   - Esto causa que la función no esté disponible cuando se necesita

3. **Falta de verificación robusta:**
   - El código de restauración solo verifica una vez
   - No implementa polling con reintentos

### ✅ **SOLUCIÓN APLICADA:**

**1. Corregir error de sintaxis:**
```javascript
// ❌ INCORRECTO: Sintaxis de TypeScript en HTML
let actionBar = container.querySelector('.ubits-data-table__action-bar') as HTMLElement;

// ✅ CORRECTO: JavaScript puro
let actionBar = container.querySelector('.ubits-data-table__action-bar');
```

**2. Agregar logs detallados para diagnóstico:**
```javascript
console.log('🔵 [Encuestas DataTable Script] ========== SCRIPT CARGADO ==========');
console.log('🔵 [Encuestas DataTable Script] Timestamp:', new Date().toISOString());
console.log('🔵 [Encuestas DataTable Script] document.readyState:', document.readyState);
```

**3. Implementar polling con reintentos:**
```javascript
let retryCount = 0;
const maxRetries = 10;
const retryInterval = setInterval(() => {
  retryCount++;
  if (window.initEncuestasDataTable && typeof window.initEncuestasDataTable === 'function') {
    clearInterval(retryInterval);
    const retryContainer = document.getElementById('encuestas-table-container');
    if (retryContainer) {
      retryContainer.innerHTML = '';
      window.initEncuestasDataTable();
    }
  } else if (retryCount >= maxRetries) {
    console.error(`❌ [Encuestas] window.initEncuestasDataTable aún no está disponible después de ${maxRetries} reintentos`);
    clearInterval(retryInterval);
  }
}, 200);
```

**4. Verificación mejorada:**
```javascript
console.log('🔵 [Encuestas] ========== VERIFICACIÓN DE DISPONIBILIDAD ==========');
console.log('🔵 [Encuestas] Timestamp:', new Date().toISOString());
console.log('🔵 [Encuestas] Verificando window.initEncuestasDataTable:', typeof window.initEncuestasDataTable);
console.log('🔵 [Encuestas] Es función:', typeof window.initEncuestasDataTable === 'function');
console.log('🔵 [Encuestas] document.readyState:', document.readyState);
console.log('🔵 [Encuestas] window.createDataTable disponible:', typeof window.createDataTable === 'function');
```

### 📝 **REGLA DE ORO:**

**NUNCA usar sintaxis de TypeScript en archivos HTML y SIEMPRE verificar disponibilidad antes de usar funciones globales:**

1. **NO usar sintaxis de TypeScript** - Solo JavaScript puro en archivos HTML
2. **Verificar errores de sintaxis** - Revisar la consola del navegador
3. **Definir placeholder global** antes de la IIFE
4. **Agregar logs detallados** para diagnóstico
5. **Verificar disponibilidad** antes de usar
6. **Implementar polling** con reintentos (hasta 10 veces, cada 200ms)
7. **Verificar estado del DOM** y dependencias

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **NO usar sintaxis de TypeScript en HTML** - Solo JavaScript puro
- [ ] **Verificar errores de sintaxis** - Revisar la consola del navegador antes de continuar
- [ ] **Definir placeholder global** - `window.initFunction = null;` antes de la IIFE
- [ ] **NO hacer click automático en checkboxes** - Solo verificar que existen, no simular clicks

---

## ⚠️ ERROR CRÍTICO #20: Selector Incorrecto para Checkboxes de DataTable

### ❌ **PROBLEMA IDENTIFICADO:**

Los checkboxes del DataTable no se encontraban porque se usó un selector incorrecto.

**Síntoma en logs:**
```
🔵 [Encuestas DataTable] Checkboxes en header encontrados: 1
🔵 [Encuestas DataTable] Checkboxes en filas encontrados: 0
⚠️ [Encuestas DataTable] NO se encontraron checkboxes en las filas
```

### 🔍 **CAUSA RAÍZ:**

**Selector incorrecto usado:**
```javascript
// ❌ INCORRECTO: Busca checkboxes con data-checkbox-button
const rowCheckboxes = dataTable.querySelectorAll('input[data-checkbox-button="true"]');
```

**Problema:**
- El DataTable crea una columna fija de checkboxes con `id: 'checkbox'` o `id: 'checkbox-2'` cuando `showCheckbox: true`
- Estos checkboxes NO tienen el atributo `data-checkbox-button="true"`
- Tienen `data-row-id` y `data-column-id="checkbox"` o `data-column-id="checkbox-2"`
- El selector `input[data-checkbox-button="true"]` es para checkboxes de tipo `checkbox` en columnas normales, no para la columna fija

### ✅ **SOLUCIÓN APLICADA:**

**Selector correcto:**
```javascript
// ✅ CORRECTO: Buscar checkboxes de la columna fija
const rowCheckboxes = dataTable.querySelectorAll('input[data-row-id][data-column-id="checkbox"], input[data-row-id][data-column-id="checkbox-2"]');

// También buscar checkboxes tipo checkbox (para columnas de tipo checkbox)
const rowCheckboxesType = dataTable.querySelectorAll('input[data-checkbox-button="true"]');

// Combinar ambos tipos para verificación completa
const allRowCheckboxes = dataTable.querySelectorAll('input[data-row-id]');
```

**Explicación:**
- El DataTable usa una columna especial con `id: 'checkbox'` o `id: 'checkbox-2'` para los checkboxes cuando `showCheckbox: true`
- Estos checkboxes tienen `data-row-id` y `data-column-id="checkbox"` o `data-column-id="checkbox-2"`
- El selector debe buscar estos atributos específicos

### 📝 **REGLA DE ORO:**

**SIEMPRE usar el selector correcto para checkboxes del DataTable:**
- ✅ `input[data-row-id][data-column-id="checkbox"]` o `input[data-row-id][data-column-id="checkbox-2"]` para la columna fija
- ✅ `input[data-checkbox-button="true"]` para columnas de tipo checkbox
- ✅ `input[data-row-id]` para buscar todos los checkboxes de filas
- ❌ `input[data-checkbox-button="true"]` solo (no encuentra la columna fija)

### ⚠️ **ERROR ADICIONAL: Click Automático en Verificación**

**Problema:**
```javascript
// ❌ INCORRECTO: Hacer click automático para "verificar"
firstCheckbox.click(); // Esto causa selección no deseada
```

**Solución:**
```javascript
// ✅ CORRECTO: Solo verificar que existe, NO hacer click
console.log('🔵 [Encuestas DataTable] ✅ Checkbox verificado correctamente (sin click automático)');
```

**Explicación:**
- Hacer click automático en un checkbox durante la verificación causa que se seleccione un elemento desde el inicio
- Esto es confuso para el usuario y no es el comportamiento esperado
- Solo se debe verificar que el checkbox existe y está configurado correctamente, NO simular clicks

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Usar selector correcto** - `input[data-row-id][data-column-id="checkbox"]` o `input[data-row-id][data-column-id="checkbox-2"]`
- [ ] **NO hacer click automático** - Solo verificar que existen, no simular clicks
- [ ] **Verificar estructura del DOM** - Asegurar que los checkboxes están presentes antes de interactuar

### 📚 **REFERENCIAS:**

- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-SELECTOR-CHECKBOXES-DATATABLE.md`
- [ ] **Agregar logs al cargar el script** - Para verificar orden de ejecución
- [ ] **Agregar logs al definir la función** - Para confirmar que se define correctamente
- [ ] **Verificar disponibilidad antes de usar** - `typeof window.initFunction === 'function'`
- [ ] **Implementar polling con reintentos** - Hasta 10 reintentos con intervalos de 200ms
- [ ] **Agregar logs en cada reintento** - Para diagnóstico
- [ ] **Verificar estado del DOM** - `document.readyState`
- [ ] **Verificar dependencias** - Si la función depende de otras funciones globales

### 🔗 **Referencias:**

- **Análisis del error:** `docs/guias/analisis/ANALISIS-ERROR-DATATABLE-FUNCION-NO-DISPONIBLE.md`
- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Análisis de error DataTable no aparece:** `docs/guias/analisis/ANALISIS-ERROR-DATATABLE-NO-APARECE.md`

---

## ⚠️ ERROR CRÍTICO #21: Header Checkbox DataTable - Selección Masiva No Activa Barra de Acciones

### ❌ **PROBLEMA IDENTIFICADO:**

El checkbox del header (select all) no activaba la barra de acciones masivas cuando se seleccionaban todos los items desde el header.

**Síntoma:**
- Al hacer click en el checkbox del header, todos los items se seleccionan correctamente
- La barra de acciones masivas **NO** aparece
- El listener del header checkbox **NO** se ejecuta

### 🔍 **CAUSA RAÍZ:**

**Intento 1: Clonar y Reemplazar el Checkbox ❌**
```javascript
// ❌ ERROR: Esto eliminaba los listeners del DataTable
const newCheckbox = headerCheckbox.cloneNode(true);
headerCheckbox.parentNode?.replaceChild(newCheckbox, headerCheckbox);
newCheckbox.addEventListener('change', ...);
```

**Problema:** Al clonar y reemplazar el checkbox, se eliminaban los event listeners que el DataTable ya había agregado, causando que el checkbox no funcionara correctamente.

**Intento 2: Agregar Listener Directo al Checkbox ❌**
```javascript
// ❌ ERROR: El listener se perdía si el DataTable reemplazaba el elemento
headerCheckbox.addEventListener('change', (e) => {
  renderActionBar();
});
```

**Problema:** Si el DataTable reemplazaba el checkbox después de agregar el listener (por ejemplo, durante una actualización), el listener se perdía.

### ✅ **SOLUCIÓN APLICADA:**

**Usar Delegado de Eventos con Capture:**
```javascript
// ✅ CORRECTO: Usar delegado de eventos en el contenedor del DataTable
const container = document.getElementById('encuestas-table-container');
const dataTable = container.querySelector('.ubits-data-table');

dataTable.addEventListener('change', (e) => {
  const target = e.target;
  
  // Verificar si es el checkbox del header (select all)
  if (target && target.hasAttribute && target.hasAttribute('data-column-checkbox-header')) {
    const columnId = target.getAttribute('data-column-checkbox-header');
    
    // Solo procesar si es checkbox o checkbox-2 (columna fija)
    if (columnId === 'checkbox' || columnId === 'checkbox-2') {
      const isChecked = target.checked;
      
      // Esperar un poco para que el DataTable actualice todos los checkboxes
      setTimeout(() => {
        renderActionBar();
      }, 200);
    }
  }
}, true); // ✅ Usar capture: true para capturar antes que otros listeners
```

**Explicación:**
- **Delegado de Eventos:** El listener se agrega al contenedor del DataTable, no al checkbox específico. Esto significa que funciona incluso si el DataTable reemplaza el checkbox.
- **Event Capture:** Usar `capture: true` asegura que nuestro listener se ejecute antes que otros listeners, permitiendo que el DataTable maneje el evento normalmente después.
- **Verificación de Atributo:** Verificamos que el target tenga `data-column-checkbox-header` para asegurarnos de que es el checkbox del header.
- **Delay con setTimeout:** Esperamos 200ms antes de llamar a `renderActionBar()` para dar tiempo al DataTable de actualizar todos los checkboxes de las filas.

### 📝 **REGLA DE ORO:**

**SIEMPRE usar delegado de eventos para el header checkbox del DataTable:**
- ✅ Usar delegado de eventos en el contenedor del DataTable
- ✅ Usar `capture: true` en el `addEventListener`
- ✅ Verificar que el target tenga `data-column-checkbox-header`
- ✅ Verificar que el `columnId` sea `'checkbox'` o `'checkbox-2'`
- ✅ Usar `setTimeout` con delay apropiado (200ms) antes de llamar a `renderActionBar()`
- ❌ **NUNCA** clonar ni reemplazar el checkbox del header
- ❌ **NUNCA** agregar listener directamente al checkbox del header
- ❌ **NUNCA** usar `stopPropagation()` o `preventDefault()`

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Usar delegado de eventos** - Agregar listener al contenedor del DataTable, no al checkbox específico
- [ ] **Usar capture: true** - Para capturar el evento antes que otros listeners
- [ ] **Verificar atributos** - Verificar que el target tenga `data-column-checkbox-header`
- [ ] **Verificar column ID** - Solo procesar si es `'checkbox'` o `'checkbox-2'`
- [ ] **Agregar delay** - Usar `setTimeout` con 200ms antes de llamar a `renderActionBar()`
- [ ] **NO clonar checkbox** - Nunca clonar ni reemplazar el checkbox del header
- [ ] **NO listener directo** - No agregar listener directamente al checkbox del header
- [ ] **NO stopPropagation** - No usar `stopPropagation()` o `preventDefault()`

### 🔗 **Referencias:**

- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-HEADER-CHECKBOX-DATATABLE.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Error relacionado:** ERROR CRÍTICO #20: Selector Incorrecto para Checkboxes de DataTable

---

## ⚠️ ERROR CRÍTICO #22: Checkboxes DataTable Funcionan Intermitentemente

### ❌ **PROBLEMA IDENTIFICADO:**

Los checkboxes del DataTable funcionan a veces y a veces no después de recargar la página. El comportamiento es inconsistente entre recargas.

**Síntomas:**
- Al recargar la página, los checkboxes a veces funcionan y a veces no
- El DataTable se inicializa múltiples veces
- El DataTable se recarga/reinicializa después de que `ContentManager.updateContent` se ejecuta

### 🔍 **CAUSA RAÍZ:**

**Problema 1: Listener en Elemento Reemplazable ❌**
```javascript
// ❌ ERROR: Listener agregado al DataTable interno que se reemplaza
const dataTable = container.querySelector('.ubits-data-table');
dataTable.addEventListener('change', handler, true);
```

**Problema:** El listener se agregaba al elemento `.ubits-data-table` (DataTable interno) que se reemplaza cuando `ContentManager.updateContent` ejecuta, perdiendo el listener.

**Problema 2: DataTable Restaurado Sin Event Listeners ❌**
```javascript
// ❌ ERROR: Si el DataTable existe en HTML restaurado, no se reinicializa
if (hasDataTable) {
  console.log('✅ DataTable ya existe, no es necesario reinicializar');
  // NO se reinicializa - los event listeners se perdieron
}
```

**Problema:** Cuando `ContentManager.updateContent` restaura el HTML del DataTable, el HTML se restaura pero los event listeners NO. El código asume que está funcionando.

**Problema 3: Verificación Insuficiente ❌**
```javascript
// ❌ ERROR: Solo verifica si el HTML existe, no si tiene instancia activa
if (container.querySelector('.ubits-data-table')) {
  return; // Retorna sin verificar si tiene instancia activa
}
```

**Problema:** Solo verifica si el HTML existe, no si tiene una instancia activa (`dataTableInstance`). Si el DataTable fue restaurado desde HTML, el HTML existe pero no tiene instancia activa ni listeners.

### ✅ **SOLUCIÓN APLICADA:**

**1. Listener en Contenedor Externo (Persistente):**
```javascript
// ✅ CORRECTO: Listener agregado al contenedor externo (persistente)
if (!window._encuestasHeaderCheckboxListenerAdded) {
  const container = document.getElementById('encuestas-table-container');
  const headerCheckboxHandler = (e) => { /* ... */ };
  container.addEventListener('change', headerCheckboxHandler, true);
  window._encuestasHeaderCheckboxListenerAdded = true;
}
```

**2. Reinicialización Forzada Después de Restaurar HTML:**
```javascript
// ✅ CORRECTO: Siempre reinicializar después de restaurar HTML
if (restoredTable) {
  console.log('⚠️ DataTable restaurado desde HTML - Event listeners perdidos, reinicializando...');
  restoredTable.innerHTML = '';
  window.initEncuestasDataTable();
}
```

**3. Verificación Mejorada de Inicialización:**
```javascript
// ✅ CORRECTO: Verificar si tiene instancia activa, no solo HTML
const existingDataTable = container.querySelector('.ubits-data-table');
if (existingDataTable && window._encuestasDataTableInitialized && dataTableInstance) {
  return; // Ya está inicializado con instancia activa
}

if (existingDataTable && (!window._encuestasDataTableInitialized || !dataTableInstance)) {
  container.innerHTML = ''; // Limpiar y reinicializar
}
```

**4. Bandera de Inicialización:**
```javascript
// ✅ CORRECTO: Establecer bandera después de crear exitosamente
dataTableInstance = window.createDataTable(dataTableOptions);
if (dataTableInstance) {
  window._encuestasDataTableInitialized = true;
}
```

### 📝 **REGLA DE ORO:**

**SIEMPRE cuando se trabaja con `ContentManager.updateContent`:**
- ✅ Agregar listeners al **contenedor externo** que NO se reemplaza
- ✅ Usar **bandera global** para prevenir duplicados
- ✅ **Reinicializar** el componente después de restaurar HTML
- ✅ Verificar **instancia activa**, no solo HTML
- ✅ Establecer **bandera de inicialización** después de crear exitosamente
- ❌ **NUNCA** agregar listeners a elementos que pueden ser reemplazados
- ❌ **NUNCA** asumir que HTML restaurado tiene event listeners funcionando
- ❌ **NUNCA** verificar solo si el HTML existe

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Listener en contenedor externo** - Agregar listeners al contenedor que NO se reemplaza
- [ ] **Bandera global** - Usar bandera global para prevenir agregar listeners múltiples veces
- [ ] **Reinicialización después de restaurar** - Siempre reinicializar componente después de restaurar HTML
- [ ] **Verificación de instancia activa** - Verificar si tiene instancia activa, no solo HTML
- [ ] **Bandera de inicialización** - Establecer bandera después de crear componente exitosamente
- [ ] **NO listener en elemento reemplazable** - No agregar listeners a elementos que pueden ser reemplazados
- [ ] **NO asumir HTML restaurado funciona** - No asumir que HTML restaurado tiene event listeners
- [ ] **NO verificar solo HTML** - No verificar solo si el HTML existe

### 🔗 **Referencias:**

- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-CHECKBOXES-INTERMITENTES-DATATABLE.md`
- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Error relacionado:** ERROR CRÍTICO #21: Header Checkbox DataTable - Selección Masiva No Activa Barra de Acciones
- **Error relacionado:** ERROR CRÍTICO #18: Checkboxes DataTable Causan Desaparición de Tabla
- **Error relacionado:** ERROR CRÍTICO #19: DataTable Función de Inicialización No Disponible

---

## ⚠️ ERROR CRÍTICO #23: Header Checkbox DataTable No Activa Barra de Acciones (Selección Masiva)

### ❌ **PROBLEMA IDENTIFICADO:**

Al seleccionar todos los items desde el header checkbox (selección masiva), la barra de acciones no aparece. Solo funciona la selección individual.

**Síntomas:**
- El header checkbox selecciona todos los items correctamente
- Pero la barra de acciones **NO aparece**
- Solo funciona la selección individual

### 🔍 **CAUSA RAÍZ:**

**Problema 1: Listener No Se Re-agrega Después de Reinicialización ❌**
```javascript
// ❌ ERROR: Solo verifica si el listener existe, no lo re-agrega después de reinicializar
if (!window._encuestasHeaderCheckboxListenerAdded) {
  // Agregar listener...
} else {
  console.log('✅ Listener ya está agregado, omitiendo...');
}
```

**Problema:** Cuando el DataTable se reinicializa después de `ContentManager.updateContent`, el listener puede existir en el contenedor, pero el checkbox del header es un elemento nuevo, y el listener puede no estar capturando correctamente el evento.

**Problema 2: Verificación Insuficiente del Listener ❌**
```javascript
// ❌ ERROR: Solo verifica si la propiedad existe, no si el listener está realmente activo
const hasListener = container._headerCheckboxHandler !== undefined;
```

**Problema:** La verificación solo comprueba si la propiedad existe, no si el listener está realmente adjunto al contenedor.

**Problema 3: Delay Insuficiente ❌**
```javascript
// ❌ ERROR: Delay de 300ms puede ser insuficiente
setTimeout(() => {
  // Agregar listener...
}, 300);
```

**Problema:** El DataTable puede no estar completamente renderizado después de 300ms, causando que el listener no capture eventos del checkbox.

### ✅ **SOLUCIÓN APLICADA:**

**1. Siempre Re-agregar Listener Después de Reinicialización:**
```javascript
// ✅ CORRECTO: Siempre remover y re-agregar el listener después de reinicializar
setTimeout(() => {
  const container = document.getElementById('encuestas-table-container');
  if (container) {
    // ✅ SIEMPRE remover el listener anterior si existe
    if (container._headerCheckboxHandler) {
      container.removeEventListener('change', container._headerCheckboxHandler, true);
      container._headerCheckboxHandler = null;
    }
    
    // ✅ SIEMPRE agregar un nuevo listener
    const headerCheckboxHandler = (e) => { /* ... */ };
    container.addEventListener('change', headerCheckboxHandler, true);
    container._headerCheckboxHandler = headerCheckboxHandler;
  }
}, 500); // Delay aumentado para asegurar renderizado completo
```

**2. Delay Aumentado y Verificación:**
```javascript
// ✅ CORRECTO: Delay aumentado a 500ms y verificación de existencia del checkbox
setTimeout(() => {
  // Agregar listener...
  
  setTimeout(() => {
    const headerCheckbox = container.querySelector('input[data-column-checkbox-header="checkbox"], input[data-column-checkbox-header="checkbox-2"]');
    if (headerCheckbox) {
      console.log('✅ Checkbox del header encontrado');
    }
  }, 500);
}, 500);
```

### 📝 **REGLA DE ORO:**

**SIEMPRE cuando se trabaja con el listener del header checkbox:**
- ✅ **Siempre re-agregar** el listener después de cada reinicialización del DataTable
- ✅ **Siempre remover** el listener anterior antes de agregar uno nuevo
- ✅ **Usar delay de al menos 500ms** para asegurar renderizado completo
- ✅ **Verificar existencia** del checkbox del header después de agregar listener
- ✅ **Logs detallados** para diagnosticar problemas
- ❌ **NUNCA** asumir que el listener persiste después de reinicializar
- ❌ **NUNCA** usar delays menores a 500ms
- ❌ **NUNCA** verificar solo la bandera global

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Listener se re-agrega** después de cada reinicialización del DataTable
- [ ] **Listener anterior se remueve** antes de agregar uno nuevo
- [ ] **Delay de al menos 500ms** para asegurar renderizado completo
- [ ] **Verificación de existencia** del checkbox del header después de agregar listener
- [ ] **Logs detallados** para diagnosticar problemas
- [ ] **Listener agregado al contenedor externo**, no al DataTable interno
- [ ] **Uso de capture: true** para capturar eventos en fase de captura
- [ ] **Referencia al handler guardada** en el contenedor para poder removerlo
- [ ] **NO asumir** que el listener persiste después de reinicializar
- [ ] **NO usar delays** menores a 500ms

### 🔗 **Referencias:**

- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-HEADER-CHECKBOX-NO-FUNCIONA-SELECCION-MASIVA.md`
- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Error relacionado:** ERROR CRÍTICO #21: Header Checkbox DataTable - Selección Masiva No Activa Barra de Acciones
- **Error relacionado:** ERROR CRÍTICO #22: Checkboxes DataTable Funcionan Intermitentemente

---

## ⚠️ ERROR CRÍTICO #24: Múltiples Re-inicializaciones Innecesarias de Componentes

### ❌ **PROBLEMA IDENTIFICADO:**

Los componentes (DataTable, Tabs) se re-inicializan múltiples veces innecesariamente debido a múltiples `setTimeout` que no verifican si el componente ya está inicializado.

**Síntomas:**
- Los logs muestran múltiples inicializaciones (500ms, 1000ms, 2000ms)
- El componente se inicializa varias veces incluso cuando ya está inicializado
- Esto causa problemas de rendimiento y puede causar listeners duplicados

### 🔍 **CAUSA RAÍZ:**

**Problema: Múltiples setTimeout Sin Verificación ❌**
```javascript
// ❌ ERROR: Múltiples setTimeout sin verificar si ya está inicializado
setTimeout(initWhenReady, 500);
setTimeout(initWhenReady, 1000);
setTimeout(initWhenReady, 2000);
```

**Problema:** Cada `setTimeout` ejecuta `initWhenReady` sin verificar si el componente ya está inicializado, causando múltiples inicializaciones innecesarias.

### ✅ **SOLUCIÓN APLICADA:**

**Verificar Antes de Cada Reintento:**
```javascript
// ✅ CORRECTO: Verificar si ya está inicializado antes de cada reintento
const retryDelays = [500, 1000, 2000];

retryDelays.forEach((delay, index) => {
  setTimeout(() => {
    // Verificar si ya está inicializado antes de reintentar
    const container = document.getElementById('encuestas-table-container');
    const hasDataTable = container?.querySelector('.ubits-data-table');
    const isInitialized = window._encuestasDataTableInitialized && dataTableInstance;
    
    if (hasDataTable && isInitialized) {
      console.log(`✅ Ya está inicializado, omitiendo reintento ${index + 1}`);
      return;
    }
    
    console.log(`🔵 Reintento ${index + 1} después de ${delay}ms...`);
    initWhenReady();
  }, delay);
});
```

### 📝 **REGLA DE ORO:**

**SIEMPRE cuando se usan múltiples setTimeout para inicialización:**
- ✅ **Verificar si ya está inicializado** antes de cada reintento
- ✅ **Omitir reintentos** si el componente ya está inicializado
- ✅ **Logs informativos** para indicar cuándo se omite un reintento
- ❌ **NUNCA** ejecutar `initWhenReady` sin verificar primero
- ❌ **NUNCA** asumir que el componente necesita reinicialización

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Verificar si ya está inicializado** antes de cada reintento
- [ ] **Omitir reintentos** si el componente ya está inicializado
- [ ] **Logs informativos** para indicar cuándo se omite un reintento
- [ ] **NO ejecutar** `initWhenReady` sin verificar primero
- [ ] **NO asumir** que el componente necesita reinicialización

---

## ⚠️ ERROR CRÍTICO #25: Múltiples Re-inicializaciones del DataTable

### ❌ **PROBLEMA IDENTIFICADO:**

El DataTable se re-inicializa múltiples veces innecesariamente, causando problemas de rendimiento y posibles listeners duplicados.

**Síntomas:**
- Los logs muestran múltiples inicializaciones del DataTable (500ms, 1000ms, 2000ms)
- `ContentManager.updateContent` se ejecuta múltiples veces para la misma sección/subSection
- Los reintentos se ejecutan mientras el contenedor fue eliminado temporalmente por `updateContent`

### 🔍 **CAUSA RAÍZ:**

**Problema 1: `updateContent` Se Ejecuta Múltiples Veces ❌**
```javascript
// ❌ ERROR: Solo verifica currentSection, no currentSubSection
if (currentSection === 'encuestas' && !subSection) {
  return; // No previene ejecuciones múltiples con el mismo subSection
}
```

**Problema:** `updateContent` se llama desde múltiples lugares (`handleSectionChange`, `ResponsiveManager`), y la verificación solo comprueba `currentSection`, no `currentSubSection`, permitiendo ejecuciones múltiples.

**Problema 2: Reintentos Se Ejecutan Durante `updateContent` ❌**
```javascript
// ❌ ERROR: Los reintentos no verifican si updateContent está en progreso
setTimeout(() => {
  initWhenReady(); // Se ejecuta incluso si updateContent eliminó el contenedor
}, 1000);
```

**Problema:** Cuando `updateContent` se ejecuta, limpia el DOM con `innerHTML = ''`, eliminando temporalmente el contenedor. Los reintentos se ejecutan mientras el contenedor no existe, causando errores y múltiples intentos.

### ✅ **SOLUCIÓN APLICADA:**

**1. Prevenir Ejecuciones Múltiples de `updateContent`:**
```javascript
// ✅ CORRECTO: Verificar tanto currentSection como currentSubSection
if (shouldPreserve && section === 'encuestas') {
  const currentSection = window.UBITS_ContentManager?.currentSection;
  const currentSubSection = window.UBITS_ContentManager?.currentSubSection;
  
  // Prevenir ejecuciones múltiples para la misma sección/subSection
  if (currentSection === 'encuestas' && currentSubSection === subSection) {
    return;
  }
  
  // Marcar que estamos en proceso de actualización
  window._encuestasUpdateContentInProgress = true;
  
  // Limpiar la bandera después de un delay
  setTimeout(() => {
    window._encuestasUpdateContentInProgress = false;
  }, 1000);
}
```

**2. Verificar Bandera en Reintentos:**
```javascript
// ✅ CORRECTO: Verificar si updateContent está en progreso antes de reintentar
retryDelays.forEach((delay, index) => {
  setTimeout(() => {
    // ⚠️ CRÍTICO: No reintentar si updateContent está en progreso
    if (window._encuestasUpdateContentInProgress) {
      console.log(`⏸️ updateContent en progreso, omitiendo reintento ${index + 1}`);
      return;
    }
    
    // Verificar si ya está inicializado...
    if (hasDataTable && isInitialized) {
      return;
    }
    
    initWhenReady();
  }, delay);
});
```

### 📝 **REGLA DE ORO:**

**SIEMPRE cuando se trabaja con `ContentManager.updateContent` y reintentos:**
- ✅ **Verificar Sección y SubSection** - Verificar tanto `currentSection` como `currentSubSection` antes de ejecutar `updateContent`
- ✅ **Usar Bandera de Progreso** - Establecer `window._encuestasUpdateContentInProgress` cuando `updateContent` se ejecuta
- ✅ **Verificar Bandera en Reintentos** - Verificar la bandera antes de ejecutar reintentos
- ✅ **Limpiar Bandera Después de Delay** - Limpiar la bandera después de 1 segundo
- ❌ **NUNCA** verificar solo `currentSection`
- ❌ **NUNCA** ejecutar reintentos mientras `updateContent` está en progreso
- ❌ **NUNCA** asumir que el contenedor existe durante los reintentos

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Verificar Sección y SubSection** - Verificar tanto `currentSection` como `currentSubSection` antes de ejecutar `updateContent`
- [ ] **Usar Bandera de Progreso** - Establecer `window._encuestasUpdateContentInProgress` cuando `updateContent` se ejecuta
- [ ] **Verificar Bandera en Reintentos** - Verificar la bandera antes de ejecutar reintentos
- [ ] **Limpiar Bandera Después de Delay** - Limpiar la bandera después de 1 segundo
- [ ] **Logs Informativos** - Agregar logs para indicar cuándo se omite un reintento
- [ ] **NO verificar solo sección** - No verificar solo `currentSection`
- [ ] **NO ejecutar reintentos durante updateContent** - No ejecutar reintentos mientras `updateContent` está en progreso
- [ ] **NO asumir que el contenedor existe** - Verificar primero si el contenedor existe

### 🔗 **Referencias:**

- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-MULTIPLES-REINICIALIZACIONES-DATATABLE.md`
- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Error relacionado:** ERROR CRÍTICO #24: Múltiples Re-inicializaciones Innecesarias de Componentes

---

## ⚠️ ERROR CRÍTICO #26: Re-renderizado Innecesario del DataTable

### ❌ **PROBLEMA IDENTIFICADO:**

El DataTable se re-renderiza innecesariamente después de que `ContentManager.updateContent` se ejecuta, incluso cuando el DataTable ya está inicializado y funcionando correctamente.

**Síntomas:**
- El DataTable se reinicializa **cada vez** que `updateContent` restaura el HTML
- Esto causa re-renderizado innecesario
- Se pierde el estado del DataTable (selecciones, scroll, filtros aplicados, etc.)

### 🔍 **CAUSA RAÍZ:**

**Problema 1: Siempre Reinicializar Después de Restaurar HTML ❌**
```javascript
// ❌ ERROR: Siempre reinicializar después de restaurar HTML
if (restoredTable) {
  // ⚠️ CRÍTICO: Siempre reinicializar después de restaurar HTML
  restoredTable.innerHTML = '';
  window.initEncuestasDataTable();
}
```

**Problema:** El código asume que **siempre** necesita reinicializar después de restaurar HTML, sin verificar si el DataTable ya tiene una instancia activa funcionando.

**Problema 2: `dataTableInstance` No Accesible Desde `updateContent` ❌**
```javascript
// ❌ ERROR: dataTableInstance está dentro de la IIFE, no accesible desde updateContent
(function() {
  let dataTableInstance = null; // Solo accesible dentro de la IIFE
})();

// En updateContent:
const dataTableInstance = ???; // No está disponible aquí
```

**Problema:** `dataTableInstance` está definido dentro de la IIFE, no es accesible desde `updateContent`, forzando a reinicializar siempre.

**Problema 3: No Verificar Instancia Activa ❌**
```javascript
// ❌ ERROR: Solo verifica si el HTML existe, no si tiene instancia activa
const hasDataTable = restoredTable.querySelector('.ubits-data-table');
if (hasDataTable) {
  // Siempre reinicializar, sin verificar si tiene instancia activa
  restoredTable.innerHTML = '';
  window.initEncuestasDataTable();
}
```

**Problema:** Solo verifica si el HTML del DataTable existe, no si tiene una instancia activa funcionando.

### ✅ **SOLUCIÓN APLICADA:**

**1. Hacer `dataTableInstance` Global:**
```javascript
// ✅ CORRECTO: Hacer dataTableInstance global
if (!window._encuestasDataTableInstance) {
  window._encuestasDataTableInstance = null;
}
let dataTableInstance = window._encuestasDataTableInstance;

window.initEncuestasDataTable = function() {
  dataTableInstance = window.createDataTable(dataTableOptions);
  window._encuestasDataTableInstance = dataTableInstance; // Guardar globalmente
};
```

**2. Verificar Instancia Activa Antes de Reinicializar:**
```javascript
// ✅ CORRECTO: Verificar si el DataTable ya está inicializado y funcionando
if (restoredTable) {
  const dataTableInstance = window._encuestasDataTableInstance;
  const isInitialized = window._encuestasDataTableInitialized && dataTableInstance;
  const hasActiveInstance = dataTableInstance && dataTableInstance.element && typeof dataTableInstance.update === 'function';
  
  if (isInitialized && hasActiveInstance) {
    console.log('✅ DataTable ya está inicializado y funcionando, NO es necesario reinicializar');
    return; // NO reinicializar si ya está funcionando
  }
  
  // Solo reinicializar si NO tiene instancia activa
  restoredTable.innerHTML = '';
  window.initEncuestasDataTable();
}
```

### 📝 **REGLA DE ORO:**

**SIEMPRE cuando se trabaja con `ContentManager.updateContent` y componentes:**
- ✅ **Hacer instancia global** - Guardar la instancia del componente en `window._*Instance` para poder verificar desde `updateContent`
- ✅ **Verificar instancia activa** - Siempre verificar si el componente tiene una instancia activa antes de reinicializar
- ✅ **Verificar métodos de instancia** - Verificar que la instancia tiene los métodos necesarios (`element`, `update`, etc.)
- ✅ **NO reinicializar si está funcionando** - NO reinicializar si el componente ya está inicializado y funcionando
- ✅ **Usar skeletons si es necesario** - Si realmente se necesita mostrar un estado de carga, usar skeletons en lugar de reinicializar
- ❌ **NUNCA** asumir que siempre necesita reinicializar
- ❌ **NUNCA** reinicializar sin verificar primero si tiene una instancia activa
- ❌ **NUNCA** usar solo una variable local para la instancia

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Instancia global** - La instancia del componente está guardada en `window._*Instance`
- [ ] **Verificar instancia activa** - Verificar si tiene instancia activa antes de reinicializar
- [ ] **Verificar métodos** - Verificar que la instancia tiene los métodos necesarios
- [ ] **NO reinicializar si está funcionando** - NO reinicializar si el componente ya está funcionando
- [ ] **Usar skeletons si es necesario** - Usar skeletons en lugar de reinicializar el componente completo
- [ ] **NO asumir que siempre necesita reinicializar** - No asumir que siempre necesita reinicializar después de restaurar HTML
- [ ] **NO reinicializar sin verificar** - No reinicializar sin verificar primero si tiene una instancia activa

### 🔗 **Referencias:**

- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-RE-RENDERIZADO-INNECESARIO-DATATABLE.md`
- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Error relacionado:** ERROR CRÍTICO #25: Múltiples Re-inicializaciones del DataTable

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

## ⚠️ ERROR CRÍTICO #27: DataTable Thead No Se Queda Sticky

### ❌ **ERROR COMÚN:**

El `thead` (header) del DataTable **NO se queda sticky** cuando hay scroll vertical, lo que significa que al hacer scroll hacia abajo, el header desaparece junto con el contenido en lugar de quedarse fijo en la parte superior.

**Síntomas:**
- Al hacer scroll vertical en el DataTable, el header desaparece
- Los usuarios no pueden ver los nombres de las columnas mientras navegan por los datos
- El comportamiento no coincide con Storybook donde el header se queda fijo

### ✅ **SOLUCIÓN:**

#### **Paso 1: Activar Scroll Vertical**

Agregar `showVerticalScrollbar: true` en las opciones del DataTable:

```javascript
window.createDataTable({
  containerId: 'encuestas-table-container',
  showVerticalScrollbar: true, // ✅ CRÍTICO: Necesario para que el thead sticky funcione
  columns: [
    // ... columnas
  ],
  rows: items
});
```

#### **Paso 2: Agregar CSS para Thead Sticky**

Agregar los siguientes estilos CSS:

```css
/* Asegurar que el contenedor scrollable tenga el contexto correcto para sticky */
#encuestas-table-container .ubits-data-table__scrollable-container--vertical {
    position: relative; /* Necesario para que sticky funcione */
}

/* Activar sticky en el thead */
#encuestas-table-container .ubits-data-table__thead {
    position: sticky !important;
    top: 0 !important;
    z-index: 10 !important;
    background-color: var(--modifiers-normal-color-light-bg-1) !important;
}

/* Asegurar que los headers individuales también tengan el fondo correcto */
#encuestas-table-container .ubits-data-table__column-header {
    background-color: var(--modifiers-normal-color-light-bg-1) !important;
}

/* IMPORTANTE: Para columnas pinned, mantener sticky horizontal Y vertical */
#encuestas-table-container .ubits-data-table__column-header--pinned {
    position: sticky !important; /* Mantener sticky para columnas pinned horizontalmente */
    top: 0 !important; /* También sticky verticalmente */
    z-index: 11 !important; /* Mayor z-index que el thead */
}
```

### 🔍 **¿Por qué?**

1. **`showVerticalScrollbar: true` es OBLIGATORIO**: Sin esta opción, el DataTable no crea el contenedor scrollable necesario para que sticky funcione.

2. **El contenedor scrollable debe tener `position: relative`**: Esto crea el contexto de posicionamiento necesario para que `position: sticky` funcione.

3. **El thead necesita `position: sticky` y `top: 0`**: Estos estilos hacen que el thead se quede fijo en la parte superior al hacer scroll.

4. **Z-index correcto**: El thead debe tener `z-index: 10` y las columnas pinned deben tener `z-index: 11` para que se superpongan correctamente.

5. **Fondo blanco necesario**: El thead y los headers deben tener `background-color` para evitar que el contenido se vea a través cuando hay scroll.

### 📝 **Regla de Oro:**

**SIEMPRE que implementes un DataTable con scroll vertical:**
1. ✅ Activar `showVerticalScrollbar: true`
2. ✅ Agregar CSS para hacer el thead sticky
3. ✅ Asegurar que el contenedor scrollable tenga `position: relative`
4. ✅ Aplicar `background-color` al thead y headers
5. ✅ Configurar z-index correcto (thead: 10, pinned: 11)

### 🔗 **Referencias:**

- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-DATATABLE-THEAD-NO-STICKY.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`

---

## ⚠️ ERROR CRÍTICO #28: Implementar Elementos del Header No Visibles en la Imagen

### ❌ **ERROR COMÚN:**

Se implementan elementos del header del DataTable (búsqueda, filtros, selector de columnas) que **NO están presentes en la imagen** proporcionada por el usuario.

**Síntomas:**
- Se implementa `filterButton` cuando NO hay botón de filtros en la imagen
- Se implementa `searchButton` cuando NO hay búsqueda en la imagen
- Se implementa `columnSelectorButton` cuando NO hay selector de columnas en la imagen
- Se implementan `secondaryButtons` cuando NO hay botones secundarios en la imagen

### ✅ **SOLUCIÓN:**

#### **Paso 1: Verificar Elementos Visibles en la Imagen**

**ANTES de implementar, SIEMPRE verificar qué elementos están presentes:**

1. **Título:** ¿Hay un título visible? (ej: "Lista de encuestas")
2. **Contador:** ¿Hay un contador visible? (ej: "206 encuestas")
3. **Búsqueda:** ¿Hay un input de búsqueda visible?
4. **Filtros:** ¿Hay un botón de filtros visible?
5. **Selector de columnas:** ¿Hay un botón de selector de columnas visible?
6. **Botón primario:** ¿Hay un botón primario visible? (ej: "+ Crear encuesta")
7. **Botones secundarios:** ¿Hay botones secundarios visibles?

#### **Paso 2: Documentar Elementos Ausentes**

**SIEMPRE documentar explícitamente qué NO está presente:**

```markdown
### Análisis de elementos del header:
- ✅ Título: "Lista de encuestas" (presente)
- ✅ Contador: "206 encuestas" (presente)
- ❌ Botón de búsqueda: NO presente en la imagen
- ❌ Botón de filtros: NO presente en la imagen
- ❌ Selector de columnas: NO presente en la imagen
- ✅ Botón primario: "+ Crear encuesta" (presente)
- ❌ Botones secundarios: NO presentes en la imagen
```

#### **Paso 3: Implementar Solo lo Visible**

```javascript
// ✅ CORRECTO: Solo implementar lo que está en la imagen
window.createDataTable({
  containerId: 'encuestas-table-container',
  header: {
    title: 'Lista de encuestas', // ✅ Presente en la imagen
    counter: '206 encuestas', // ✅ Presente en la imagen
    primaryButton: {
      text: 'Crear encuesta',
      icon: 'plus',
      onClick: () => { /* ... */ }
    }
    // ❌ NO agregar searchButton, filterButton, columnSelectorButton, secondaryButtons
    // porque NO están presentes en la imagen
  },
  columns: [ /* ... */ ],
  rows: items
});
```

### 🔍 **¿Por qué?**

1. **La imagen es la fuente de verdad**: Solo debemos implementar lo que está visible en la imagen proporcionada por el usuario.

2. **No asumir elementos por defecto**: Aunque el DataTable tenga opciones para búsqueda, filtros, etc., NO debemos implementarlos si no están en la imagen.

3. **Documentar ausencias es crítico**: Documentar explícitamente qué NO está presente ayuda a evitar implementar elementos incorrectos.

### 📝 **Regla de Oro:**

**SIEMPRE que analices una imagen con DataTable:**
1. ✅ Verificar cada elemento del header en la imagen
2. ✅ Documentar explícitamente qué está presente (✅) y qué NO está presente (❌)
3. ✅ Implementar SOLO elementos que están visibles en la imagen
4. ✅ NO implementar elementos "por defecto" sin verificar la imagen

### 🔗 **Referencias:**

- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-IMPLEMENTAR-ELEMENTOS-NO-VISIBLES.md`
- **Guía de análisis DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`

---

## ⚠️ ERROR CRÍTICO #29: Usar Sintaxis de TypeScript (`as HTMLElement`) en JavaScript

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Sintaxis de TypeScript en JavaScript
menuButtons.forEach((btn, index) => {
  const computedStyle = window.getComputedStyle(btn as HTMLElement);
  // ...
});
```

**Error en consola:**
```
Uncaught SyntaxError: Unexpected token 'as'
```

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: JavaScript puro
menuButtons.forEach((btn, index) => {
  const computedStyle = window.getComputedStyle(btn);
  // ...
});
```

### 🔍 **¿Por qué?**
- Los archivos HTML contienen **JavaScript puro**, no TypeScript
- La sintaxis `as HTMLElement` es específica de TypeScript y no funciona en JavaScript
- `window.getComputedStyle()` acepta cualquier `Element`, no necesita casting

### 📝 **Regla de Oro:**
**SIEMPRE usar JavaScript puro en archivos HTML:**
- ✅ `window.getComputedStyle(btn)` - Sin casting
- ✅ `btn.getAttribute('data-id')` - Sin casting
- ❌ `btn as HTMLElement` - NO funciona en JavaScript
- ❌ `btn as Element` - NO funciona en JavaScript

### 🔗 **Referencias:**
- **Archivos afectados:** Templates HTML en `prototypes/`
- **Contexto:** Código de verificación de elementos del DOM

---

## ⚠️ ERROR CRÍTICO #30: DataTable No Se Inicializa - Error No Capturado

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Error no capturado causa que el DataTable no se inicialice
window.initEncuestasDataTable = function() {
  const container = document.getElementById('encuestas-table-container');
  if (!container) {
    console.warn('⚠️ Contenedor no encontrado');
    return; // ❌ No hay logs suficientes para diagnosticar
  }
  
  // Si hay un error aquí, el DataTable nunca se inicializa
  const dataTableInstance = window.createDataTable(dataTableOptions);
};
```

**Síntomas:**
- El DataTable no aparece en la página
- Error en consola: `Uncaught` en línea XXXX
- No hay logs que indiquen dónde falló

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Logs detallados y manejo de errores
window.initEncuestasDataTable = function() {
  console.log('🔵 [Encuestas DataTable] ========== INICIO initEncuestasDataTable ==========');
  
  // ⚠️ CRÍTICO: Verificar módulo antes de inicializar
  const currentModule = document.body.getAttribute('data-module');
  console.log('🔵 [Encuestas DataTable] Módulo actual:', currentModule);
  
  if (currentModule !== 'encuestas') {
    console.log('⏭️ [Encuestas DataTable] No estamos en módulo encuestas, saltando inicialización');
    return;
  }

  const container = document.getElementById('encuestas-table-container');
  console.log('🔵 [Encuestas DataTable] Contenedor encontrado:', !!container);
  
  if (!container) {
    console.warn('⚠️ [Encuestas DataTable] Contenedor no encontrado');
    return;
  }

  // Verificar si el DataTable ya está inicializado
  const existingTable = container.querySelector('.ubits-data-table');
  console.log('🔵 [Encuestas DataTable] DataTable existente:', !!existingTable);
  
  if (existingTable) {
    console.log('✅ [Encuestas DataTable] DataTable ya está inicializado');
    return;
  }

  console.log('🔵 [Encuestas DataTable] Inicializando DataTable...');

  // Verificar que window.createDataTable existe
  console.log('🔵 [Encuestas DataTable] window.createDataTable disponible:', typeof window.createDataTable);
  
  if (typeof window.createDataTable !== 'function') {
    console.error('❌ [Encuestas DataTable] window.createDataTable no está disponible');
    console.error('❌ [Encuestas DataTable] Tipo:', typeof window.createDataTable);
    return;
  }

  try {
    const dataTableInstance = window.createDataTable(dataTableOptions);
    console.log('✅ [Encuestas DataTable] DataTable inicializado correctamente');
    console.log('🔵 [Encuestas DataTable] Instancia:', dataTableInstance);
  } catch (error) {
    console.error('❌ [Encuestas DataTable] Error al inicializar DataTable:', error);
  }
};
```

### 🔍 **¿Por qué?**
1. **Logs detallados**: Permiten identificar exactamente dónde falla la inicialización
2. **Verificación de módulo**: Evita inicializar componentes en módulos incorrectos
3. **Verificación de dependencias**: Confirma que `window.createDataTable` está disponible
4. **Manejo de errores**: `try-catch` captura errores y los registra en consola

### 📝 **Regla de Oro:**
**SIEMPRE agregar logs detallados en funciones de inicialización:**
1. ✅ Log de inicio de función
2. ✅ Verificar módulo actual
3. ✅ Verificar contenedor
4. ✅ Verificar si ya está inicializado
5. ✅ Verificar dependencias (`window.createDataTable`, etc.)
6. ✅ Log de opciones antes de inicializar
7. ✅ Log de éxito/error después de inicializar
8. ✅ Usar `try-catch` para capturar errores

### 🔗 **Referencias:**
- **Archivos afectados:** Funciones de inicialización en templates HTML
- **Contexto:** Inicialización de componentes UBITS (DataTable, Tabs, etc.)

---

## ⚠️ ERROR CRÍTICO #31: Botones de Filas (Expandir, Drag Handle) Aparecen Aunque No Están en la Imagen

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: No desactivar opciones de filas que no están en la imagen
window.createDataTable({
  containerId: 'encuestas-table-container',
  showColumnMenu: false, // ✅ Desactivado
  showContextMenu: false, // ✅ Desactivado
  // ❌ FALTA: rowExpandable y rowReorderable
  columns: [ /* ... */ ],
  rows: items
});
```

**Síntomas:**
- Botón de expandir fila (flecha) aparece en cada fila
- Drag handle (icono de arrastrar) aparece en cada fila
- Estos elementos NO están presentes en la imagen del diseño

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Desactivar todas las opciones de filas que no están en la imagen
window.createDataTable({
  containerId: 'encuestas-table-container',
  showVerticalScrollbar: true,
  showColumnMenu: false, // ✅ Desactivar menú de columnas
  showContextMenu: false, // ✅ Desactivar menú contextual
  rowExpandable: false, // ✅ CRÍTICO: Desactivar botón de expandir fila
  rowReorderable: false, // ✅ CRÍTICO: Desactivar drag handle de filas
  columns: [ /* ... */ ],
  rows: items
});
```

**CSS de respaldo:**
```css
/* ✅ CORRECTO: CSS de respaldo para ocultar elementos de filas */
#encuestas-table-container .ubits-data-table__row-expand {
    display: none !important;
}

#encuestas-table-container .ubits-data-table__row-drag-handle {
    display: none !important;
}

#encuestas-table-container .ubits-data-table__action-button {
    display: none !important;
}

/* Ocultar las columnas completas si existen */
#encuestas-table-container .ubits-data-table__cell--expand {
    display: none !important;
}

#encuestas-table-container .ubits-data-table__cell--drag-handle {
    display: none !important;
}
```

### 🔍 **¿Por qué?**
1. **Opciones por defecto**: `rowExpandable` y `rowReorderable` pueden tener valores por defecto que muestran estos botones
2. **Análisis de imagen**: Debe verificar explícitamente si estos elementos están presentes en la imagen
3. **CSS de respaldo**: Aunque se desactiven las opciones, el CSS asegura que no aparezcan

### 📝 **Regla de Oro:**
**SIEMPRE que analices una imagen con DataTable:**
1. ✅ Verificar si hay botón de expandir fila (flecha) en la imagen
2. ✅ Verificar si hay drag handle (icono de arrastrar) en la imagen
3. ✅ Verificar si hay botones de acciones en las filas
4. ✅ Si NO están presentes, desactivar explícitamente:
   - `rowExpandable: false`
   - `rowReorderable: false`
5. ✅ Agregar CSS de respaldo para ocultar estos elementos

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-IMPLEMENTAR-ELEMENTOS-NO-VISIBLES.md`
- **Guía de análisis DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`

---

## ❌ **ERROR CRÍTICO #46: Drag and Drop de Filas No Aparece**

### 🚨 **Problema:**
El drag handle de filas no aparece aunque `rowReorderable: true` esté configurado.

### 🔍 **Síntomas:**
- `rowReorderable: true` está configurado en `dataTableOptions`
- No se ve el icono de 6 puntos verticales en las filas
- La columna `drag-handle` no aparece

### ❌ **INCORRECTO:**
```css
/* ❌ INCORRECTO: CSS ocultando la celda drag-handle */
#encuestas-table-container .ubits-data-table__cell--drag-handle {
    display: none !important;
}

/* ❌ INCORRECTO: CSS ocultando el elemento drag-handle */
#encuestas-table-container .ubits-data-table__row-drag-handle {
    display: none !important;
}
```

### ✅ **CORRECTO:**
```css
/* ✅ CORRECTO: Comentar o eliminar las reglas CSS que ocultan el drag handle */
/* #encuestas-table-container .ubits-data-table__cell--drag-handle {
    display: none !important;
} */

/* #encuestas-table-container .ubits-data-table__row-drag-handle {
    display: none !important;
} */
```

```javascript
// ✅ CORRECTO: Configurar rowReorderable y callback
const dataTableOptions = {
  // ... otras opciones ...
  rowReorderable: true, // ✅ Habilitar drag & drop de filas
  onRowReorder: (newRowOrder) => {
    console.log('🔄 [DataTable] Nuevo orden de filas:', newRowOrder);
    rowOrder = [...newRowOrder];
  }
};
```

### 🔍 **Verificación:**
1. Inspeccionar el DOM y buscar elementos con clase `ubits-data-table__cell--drag-handle`
2. Verificar que no tengan `display: none` aplicado
3. Verificar que la columna `drag-handle` aparece al inicio (antes del checkbox)
4. Verificar que el icono `fa-grip-vertical` aparece en cada fila

### 🔗 **Referencias:**
- **Guía completa:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DRAG-AND-DROP-DATATABLE.md`

---

## ❌ **ERROR CRÍTICO #47: Drag and Drop de Columnas - Desalineamiento**

### 🚨 **Problema:**
Después de reordenar columnas, los headers no coinciden con las celdas (desalineamiento visual).

### 🔍 **Síntomas:**
- El checkbox header muestra el contenido de otra columna
- Los headers y celdas están desalineados después del reordenamiento
- Los IDs coinciden pero el contenido visual no

### ❌ **INCORRECTO:**
```css
/* ❌ INCORRECTO: No asegurar alineación correcta */
#encuestas-table-container .ubits-data-table table {
    /* Sin border-collapse */
}
```

### ✅ **CORRECTO:**
```css
/* ✅ CORRECTO: Asegurar alineación correcta con border-collapse */
#encuestas-table-container .ubits-data-table table {
    border-collapse: collapse !important;
    width: 100% !important;
    table-layout: auto !important;
}

/* ✅ CORRECTO: Asegurar que headers y cells tengan el mismo ancho y padding */
#encuestas-table-container .ubits-data-table__thead th,
#encuestas-table-container .ubits-data-table__tbody td {
    box-sizing: border-box !important;
    vertical-align: middle !important;
}

/* ✅ CORRECTO: Asegurar que las columnas de control tengan el mismo ancho */
#encuestas-table-container .ubits-data-table__column-header--drag-handle,
#encuestas-table-container .ubits-data-table__cell--drag-handle {
    width: 32px !important;
    min-width: 32px !important;
    max-width: 32px !important;
    padding: 0 !important;
}

#encuestas-table-container .ubits-data-table__column-header--checkbox,
#encuestas-table-container .ubits-data-table__cell--checkbox {
    width: 48px !important;
    min-width: 48px !important;
    max-width: 48px !important;
}
```

### 🔍 **Notas:**
- Este es un bug conocido en el componente DataTable
- El CSS ayuda pero puede no resolver completamente el problema
- Si el problema persiste, considerar deshabilitar temporalmente el drag & drop de columnas
- Reportar el bug al equipo de UBITS

### 🔗 **Referencias:**
- **Guía completa:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DRAG-AND-DROP-DATATABLE.md`

---

## ❌ **ERROR CRÍTICO #48: Callback de Drag and Drop No Se Ejecuta**

### 🚨 **Problema:**
El drag and drop funciona visualmente pero el callback `onColumnReorder` o `onRowReorder` no se ejecuta.

### 🔍 **Síntomas:**
- El drag and drop funciona visualmente
- Pero el callback no se ejecuta
- No hay logs en la consola

### ❌ **INCORRECTO:**
```javascript
// ❌ INCORRECTO: Callback no definido o con error de sintaxis
const dataTableOptions = {
  columnReorderable: true,
  // onColumnReorder no está definido
};

// ❌ INCORRECTO: Callback mal definido
const dataTableOptions = {
  columnReorderable: true,
  onColumnReorder: undefined, // ❌ No funciona
};
```

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Callback correctamente definido
const dataTableOptions = {
  columnReorderable: true,
  onColumnReorder: (newColumnOrder) => {
    console.log('🔄 [DataTable] Nuevo orden de columnas:', newColumnOrder);
    columnOrder = [...newColumnOrder];
  },
  
  rowReorderable: true,
  onRowReorder: (newRowOrder) => {
    console.log('🔄 [DataTable] Nuevo orden de filas:', newRowOrder);
    rowOrder = [...newRowOrder];
  }
};

// ✅ CORRECTO: Verificar antes de crear el DataTable
console.log('🔵 [DataTable] columnReorderable:', dataTableOptions.columnReorderable);
console.log('🔵 [DataTable] rowReorderable:', dataTableOptions.rowReorderable);
console.log('🔵 [DataTable] onColumnReorder existe:', typeof dataTableOptions.onColumnReorder);
console.log('🔵 [DataTable] onRowReorder existe:', typeof dataTableOptions.onRowReorder);
```

### 🔍 **Verificación:**
1. Verificar que el callback está definido correctamente
2. Verificar que no hay errores de sintaxis
3. Agregar logs al inicio del callback para verificar que se ejecuta
4. Verificar en la consola del navegador si hay errores

### 🔗 **Referencias:**
- **Guía completa:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DRAG-AND-DROP-DATATABLE.md`
- **Error relacionado:** ERROR CRÍTICO #28: Implementar Elementos del Header No Visibles en la Imagen

---

## ⚠️ ERROR CRÍTICO #32: SearchButton No Se Ve Como en el Storybook

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: SearchButton implementado sin verificar estilos
window.createDataTable({
  containerId: 'encuestas-table-container',
  header: {
    searchButton: {
      placeholder: 'Buscar encuestas...',
      onChange: (value) => { /* ... */ }
    }
  },
  columns: [ /* ... */ ],
  rows: items
});
```

**Síntomas:**
- El botón de cerrar (X) aparece **abajo del input** en lugar de estar dentro del input-wrapper
- Los estilos no coinciden con el Storybook (bordes, padding, colores, etc.)
- **⚠️ CRÍTICO: El input se ve más alto que los botones** - Altura incorrecta (40px en lugar de 32px)
- El focus no muestra el box-shadow azul correctamente
- La estructura visual no es la correcta

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: SearchButton implementado con CSS específico para corregir estilos
window.createDataTable({
  containerId: 'encuestas-table-container',
  header: {
    searchButton: {
      placeholder: 'Buscar encuestas...',
      onChange: (value) => { /* ... */ }
    }
  },
  columns: [ /* ... */ ],
  rows: items
});
```

**CSS de corrección:**
```css
/* ⚠️ CRÍTICO: Asegurar que el input-wrapper tenga los estilos correctos del Storybook */
/* ⚠️ CRÍTICO: La altura DEBE ser 32px (igual que botones sm del header), NO 40px */
#encuestas-table-container .ubits-data-table__header-search-button .ubits-search-button__input-wrapper {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: var(--ubits-spacing-sm) !important;
    padding: var(--ubits-spacing-sm) !important;
    padding-left: var(--ubits-spacing-md) !important;
    padding-right: var(--ubits-spacing-md) !important;
    border: 1px solid var(--modifiers-normal-color-light-accent-brand) !important;
    border-radius: var(--ubits-border-radius-sm) !important;
    background-color: var(--modifiers-normal-color-light-bg-1) !important;
    height: 32px !important; /* ✅ CORRECTO: 32px igual que botones sm del header (NO 40px) */
    min-height: 32px !important;
    max-height: 32px !important;
    box-sizing: border-box !important;
    position: relative !important;
}

/* Asegurar que el input tenga los estilos correctos y padding-right para el botón de cerrar */
#encuestas-table-container .ubits-data-table__header-search-button .ubits-search-button__input {
    flex: 1 !important;
    min-width: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    outline: none !important;
    background: transparent !important;
    padding: var(--ubits-spacing-none) !important;
    padding-right: var(--ubits-spacing-md) !important; /* Espacio para el botón de cerrar */
    box-shadow: none !important;
}

/* Asegurar que el botón de cerrar esté dentro del input-wrapper, alineado correctamente */
#encuestas-table-container .ubits-data-table__header-search-button .ubits-search-button__clear {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
    flex-shrink: 0 !important;
    width: 16px !important;
    height: 16px !important;
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
    cursor: pointer !important;
}

/* Focus del input-wrapper (borde azul cuando está activo) */
#encuestas-table-container .ubits-data-table__header-search-button .ubits-search-button__input-wrapper:focus-within {
    outline: none !important;
    box-shadow: 0px 0px 0px 4px var(--modifiers-normal-focus-color) !important;
}
```

### 🔍 **¿Por qué?**
1. **Estilos no se aplican correctamente**: El componente SearchButton se crea dinámicamente y los estilos pueden no aplicarse correctamente
2. **CSS conflictivo**: CSS personalizado puede estar interfiriendo con los estilos del componente
3. **Estructura HTML**: El `renderInput()` genera un wrapper extra que puede causar problemas de estructura
4. **Flexbox incorrecto**: El `input-wrapper` debe tener `display: flex` y `flex-direction: row` para alinear horizontalmente
5. **⚠️ CRÍTICO: Altura incorrecta**: Se asume que el input debe tener 40px (botones md) sin verificar que los botones del header usan `size: 'sm'` (32px)

### 📝 **Regla de Oro:**
**SIEMPRE que implementes un SearchButton en un DataTable:**
1. ✅ Verificar que la estructura HTML sea correcta (input-wrapper contiene input + botón de cerrar)
2. ✅ **⚠️ CRÍTICO: Verificar el tamaño de los botones del header** - Los botones del DataTable header usan `size: 'sm'` (32px), NO `md` (40px)
3. ✅ **⚠️ CRÍTICO: Configurar altura correcta** - El input-wrapper DEBE tener `height: 32px` (igual que botones sm), NO 40px
4. ✅ Aplicar CSS específico para asegurar que los estilos coincidan con el Storybook
5. ✅ Verificar que el botón de cerrar esté alineado horizontalmente (no abajo)
6. ✅ Verificar que los estilos (borde, padding, height, etc.) coincidan con el Storybook
7. ✅ Probar el focus del input para verificar que el box-shadow azul aparezca
8. ✅ Comparar visualmente con el Storybook para verificar que la altura del input coincida con los botones

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-SEARCHBUTTON-ESTILOS-INCORRECTOS.md`
- **Código del SearchButton:** `vendor/ubits/packages/components/search-button/src/SearchButtonProvider.ts`
- **Estilos del SearchButton:** `vendor/ubits/packages/components/search-button/src/styles/search-button.css`

---

## ⚠️ ERROR CRÍTICO #33: Filtros - Usar `type: 'date'` en lugar de `type: 'calendar'`

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Usar type: 'date' para inputs de fecha en filtros
filterButton: {
  filters: [
    {
      id: 'filtro-inicio',
      label: 'Fecha de inicio',
      columnId: 'inicio',
      type: 'date' // ❌ Usa calendario nativo del sistema
    }
  ]
}
```

**Síntomas:**
- El icono del calendario no tiene el token correcto
- El calendario desplegado es genérico del sistema (no el de UBITS)
- Los estilos no coinciden con el Storybook
- El input muestra el calendario nativo del navegador

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Usar type: 'calendar' para inputs de fecha en filtros
filterButton: {
  filters: [
    {
      id: 'filtro-inicio',
      label: 'Fecha de inicio',
      columnId: 'inicio',
      type: 'calendar' // ✅ Usa calendario UBITS con icono correcto
    }
  ]
}
```

**Diferencia clave:**
- `type: 'date'` → Input HTML5 nativo (`<input type="date">`) que muestra calendario genérico del sistema
- `type: 'calendar'` → Input con componente Calendar de UBITS (`<input type="text" readonly>`) que muestra calendario personalizado

### 🔍 **¿Por qué?**
1. **`type: 'date'` es nativo**: Usa el calendario genérico del sistema operativo, no el de UBITS
2. **`type: 'calendar'` es componente UBITS**: Usa el componente Calendar de UBITS con estilos y tokens correctos
3. **Icono correcto**: `type: 'calendar'` agrega automáticamente el icono `fa-calendar` con tokens UBITS
4. **Estilos del Storybook**: Solo `type: 'calendar'` coincide con el Storybook

### 📝 **Regla de Oro:**
**SIEMPRE que implementes inputs de fecha:**
1. ✅ Verificar en el Storybook qué tipo usa el componente Input para fechas
2. ✅ Usar `type: 'calendar'` (no `type: 'date'`)
3. ✅ Verificar que el icono tenga el token correcto (`fa-calendar`)
4. ✅ Verificar que el calendario sea el componente Calendar de UBITS (no nativo)

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-FILTROS-INPUTS-CALENDARIO.md`
- **Código del Input:** `vendor/ubits/packages/components/input/src/InputProvider.ts` (líneas 273-296, 955-1085)
- **Componente Calendar:** `vendor/ubits/packages/components/calendar/src/CalendarProvider.ts`

---

## ⚠️ ERROR CRÍTICO #34: Patrón - Implementar Solo la Primera Capa del Componente

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Solo implementar la primera capa (configuración básica)
filterButton: {
  onClick: (event) => {
    console.log('Abrir filtros');
    // TODO: Implementar panel de filtros
  }
  // ❌ FALTA: filters (sub-items)
  // ❌ FALTA: onApplyFilters (acción)
  // ❌ FALTA: onClearFilters (acción)
}

searchButton: {
  placeholder: 'Buscar...',
  onChange: (value) => {
    console.log('Búsqueda:', value);
    // TODO: Implementar filtrado
  }
  // ❌ FALTA: onSearch (acción)
}
```

**Síntomas:**
- El componente aparece pero no funciona completamente
- Los sub-items (filtros, opciones) no están implementados
- Las acciones (aplicar, limpiar, buscar) no están implementadas
- El componente es "decorativo" pero no funcional

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Implementar primera capa + sub-items + acciones
filterButton: {
  // Primera capa
  onClick: (event) => { /* ... */ },
  
  // Sub-items
  filters: [
    {
      id: 'filtro-nombre',
      label: 'Nombre',
      columnId: 'nombre',
      type: 'text'
    },
    {
      id: 'filtro-tipo',
      label: 'Tipo',
      columnId: 'tipo',
      type: 'select',
      options: [ // ✅ Sub-items de sub-items
        { value: 'Cultura', label: 'Cultura' },
        { value: 'Satisfacción', label: 'Satisfacción' }
      ]
    }
  ],
  
  // Acciones
  onApplyFilters: (filters) => {
    // Implementar lógica de filtrado
  },
  onClearFilters: () => {
    // Implementar lógica de limpieza
  }
}

searchButton: {
  placeholder: 'Buscar...',
  onChange: (value) => {
    // Lógica de búsqueda en tiempo real
  },
  onSearch: (searchTerm, filteredRows) => { // ✅ Acción
    // Actualizar tabla con resultados filtrados
    // Actualizar contador
  }
}
```

### 🔍 **¿Por qué?**
1. **Implementación incompleta**: Solo se implementa la configuración básica, no los sub-items ni acciones
2. **No revisar estructura completa**: No se revisa toda la definición de tipos del componente
3. **No verificar Storybook completo**: Solo se revisa la primera capa, no todos los controles y ejemplos
4. **No consultar código completo**: No se buscan ejemplos de uso completo en el código fuente

### 📝 **Regla de Oro:**
**SIEMPRE que implementes un componente:**

1. ✅ **Revisar estructura completa:** Leer TODA la definición de tipos del componente
2. ✅ **Identificar sub-items:** Listar todos los sub-items disponibles (filters, options, etc.)
3. ✅ **Identificar acciones:** Listar todas las acciones disponibles (onApply, onClear, etc.)
4. ✅ **Revisar Storybook completo:** Revisar TODOS los controles y ejemplos
5. ✅ **Consultar código completo:** Buscar ejemplos de uso completo en el código
6. ✅ **Implementar capa por capa:** Primera capa → Sub-items → Acciones
7. ✅ **Verificar funcionalidad completa:** Asegurar que todos los sub-items y acciones funcionen

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-PATRON-ERROR-IMPLEMENTAR-SOLO-PRIMERA-CAPA.md`
- **Error de filtros:** `docs/guias/analisis/ANALISIS-ERROR-FILTROS-INPUTS-CALENDARIO.md`
- **Error de SearchButton:** `docs/guias/analisis/ANALISIS-ERROR-SEARCHBUTTON-ESTILOS-INCORRECTOS.md`

---

## ⚠️ ERROR CRÍTICO #35: No Implementar Selector de Columnas en DataTable Header

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Implementar solo algunos elementos del header
header: {
  title: 'Lista de encuestas',
  counter: '20 encuestas',
  searchButton: { /* ... */ },
  filterButton: { /* ... */ },
  primaryButton: { /* ... */ }
  // ❌ FALTA: columnSelectorButton
}
```

**Síntomas:**
- El botón de selector de columnas no aparece en el header
- Los usuarios no pueden mostrar/ocultar columnas
- Falta funcionalidad disponible en el componente DataTable

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Implementar TODOS los elementos del header presentes en la imagen
header: {
  title: 'Lista de encuestas',
  counter: '20 encuestas',
  searchButton: { /* ... */ },
  filterButton: { /* ... */ },
  columnSelectorButton: { // ✅ Implementar selector de columnas
    onClick: (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('📋 [Encuestas DataTable] Abrir selector de columnas');
      // ✅ El DataTable maneja automáticamente el dropdown con checkboxes
    }
  },
  primaryButton: { /* ... */ }
}
```

**Nota importante:** El DataTable maneja automáticamente:
- Crear el dropdown con checkboxes para cada columna
- Mostrar/ocultar columnas según la selección
- Actualizar la tabla cuando cambian las columnas visibles
- No es necesario implementar el dropdown ni los checkboxes manualmente

### 🔍 **¿Por qué?**
1. **Revisión incompleta**: No se revisó la estructura completa de opciones del header
2. **No verificar en la imagen**: No se verificó si el selector de columnas está presente en la imagen
3. **No listar elementos disponibles**: No se listaron todos los elementos disponibles antes de implementar
4. **Patrón de error #34**: Implementar solo la primera capa sin revisar todos los elementos

### 📝 **Regla de Oro:**
**SIEMPRE que implementes el header del DataTable:**

1. ✅ **Listar todos los elementos disponibles:**
   - title
   - counter
   - searchButton
   - filterButton
   - **columnSelectorButton** ⚠️ NO OLVIDAR
   - primaryButton
   - secondaryButtons

2. ✅ **Verificar en la imagen:**
   - ¿Está presente cada elemento?
   - Si SÍ → Implementar
   - Si NO → NO implementar

3. ✅ **Implementar todos los elementos presentes:**
   - No dejar elementos sin implementar si están en la imagen
   - Verificar que todos los elementos del header estén implementados

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-NO-IMPLEMENTAR-SELECTOR-COLUMNAS.md`
- **Patrón de error general:** `docs/guias/analisis/ANALISIS-PATRON-ERROR-IMPLEMENTAR-SOLO-PRIMERA-CAPA.md`
- **Error relacionado:** ERROR CRÍTICO #34: Patrón - Implementar Solo la Primera Capa del Componente

---

## ⚠️ ERROR CRÍTICO #36: No Identificar Botones con Texto e Icono en Análisis de Imagen

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Análisis no identifica texto visible en botones
// Análisis dice: "Botón primario con icono plus"
// Implementación: iconOnly: true
primaryButton: {
  text: 'Crear encuesta', // ❌ Texto no identificado en análisis
  icon: 'plus',
  iconStyle: 'regular'
  // ❌ Se implementa como iconOnly cuando debería ser icono + texto
}

// ❌ INCORRECTO: Botón secundario no identificado en análisis
// Análisis: No menciona "Crear con plantilla"
// Implementación: No se implementa
// ❌ FALTA: secondaryButtons con "Crear con plantilla"
```

**Síntomas:**
- El análisis de la imagen no identifica el texto visible en los botones
- Los botones se implementan como iconOnly cuando deberían tener texto
- Botones secundarios no se identifican ni implementan
- La implementación no coincide con la imagen

### ✅ **CORRECTO:**
```markdown
## Análisis de Botones del Header

### Botón Primario
- **Texto:** "Crear encuesta" ✅ Identificado
- **Icono:** plus (fa-plus) ✅ Identificado
- **Tipo:** primary ✅ Identificado
- **Variante:** icono + texto (NO iconOnly) ✅ Identificado

### Botón Secundario
- **Texto:** "Crear con plantilla" ✅ Identificado
- **Icono:** file (fa-file) ✅ Identificado
- **Tipo:** secondary ✅ Identificado
- **Variante:** icono + texto (NO iconOnly) ✅ Identificado
```

```javascript
// ✅ CORRECTO: Implementar botones con texto e icono identificados en análisis
header: {
  secondaryButtons: [
    {
      text: 'Crear con plantilla', // ✅ Identificado en análisis
      icon: 'file', // ✅ Identificado en análisis
      iconStyle: 'regular',
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('📄 [Encuestas DataTable] Crear con plantilla');
      }
    }
  ],
  primaryButton: {
    text: 'Crear encuesta', // ✅ Identificado en análisis
    icon: 'plus', // ✅ Identificado en análisis
    iconStyle: 'regular',
    onClick: (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('➕ [Encuestas DataTable] Crear nueva encuesta');
    }
  }
}
```

**Nota importante:** Si el DataTable renderiza con `iconOnly: true` por defecto, usar CSS personalizado para mostrar el texto:

```css
/* ✅ CORRECTO: Mostrar texto en botones del header */
#encuestas-table-container .ubits-data-table__header-primary-button::after {
  content: 'Crear encuesta';
  margin-left: var(--ubits-spacing-xs);
}

#encuestas-table-container .ubits-data-table__header-secondary-button::after {
  content: 'Crear con plantilla';
  margin-left: var(--ubits-spacing-xs);
}
```

### 🔍 **¿Por qué?**
1. **Análisis superficial**: No se analiza detalladamente cada botón para identificar texto visible
2. **No documentar texto**: No se documenta el texto visible en cada botón en el análisis
3. **Asumir iconOnly**: Se asume que los botones son iconOnly sin verificar el texto
4. **No identificar botones secundarios**: No se identifican todos los botones presentes en la imagen

### 📝 **Regla de Oro:**
**SIEMPRE que analices una imagen con botones:**

1. ✅ **Identificar cada botón:**
   - ¿Cuántos botones hay?
   - ¿Qué texto tiene cada botón? ⚠️ NO OLVIDAR
   - ¿Qué icono tiene cada botón?
   - ¿Es primario o secundario?

2. ✅ **Documentar en el análisis:**
   - Texto visible ⚠️ OBLIGATORIO
   - Icono visible
   - Tipo (primario/secundario)
   - Variante (iconOnly o icono + texto)

3. ✅ **Verificar en Storybook:**
   - ¿El componente soporta esta variante?
   - ¿Cómo se ve en el Storybook?

4. ✅ **Implementar correctamente:**
   - Si el componente soporta texto + icono → Usar opciones nativas
   - Si NO soporta → Usar CSS personalizado

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-NO-IDENTIFICAR-BOTONES-TEXTO-ICONO.md`
- **Patrón de error general:** `docs/guias/analisis/ANALISIS-PATRON-ERROR-IMPLEMENTAR-SOLO-PRIMERA-CAPA.md`
- **Error relacionado:** ERROR CRÍTICO #34: Patrón - Implementar Solo la Primera Capa del Componente

---

## ⚠️ ERROR CRÍTICO #37: Errores en Análisis e Implementación de Botones del Header

### ❌ **ERRORES COMUNES:**

#### **ERROR #1: No Identificar Texto Visible en Botones**
```markdown
// ❌ INCORRECTO: Solo identificar icono
- Botón primario: icono `plus`
// ❌ Falta el texto visible
```

```markdown
// ✅ CORRECTO: Identificar texto + icono
- Botón primario:
  - Texto: "Crear encuesta" ✅
  - Icono: `plus` ✅
```

#### **ERROR #2: Doble Signo + (o Símbolos Duplicados)**
```javascript
// ❌ INCORRECTO: Texto duplica símbolo del icono
primaryButton: {
  text: '+ Crear encuesta', // ❌ Doble + (icono + texto)
  icon: 'plus'
}
```

```javascript
// ✅ CORRECTO: Solo texto, el icono ya muestra el símbolo
primaryButton: {
  text: 'Crear encuesta', // ✅ Sin "+" (el icono `plus` ya lo muestra)
  icon: 'plus'
}
```

#### **ERROR #3: Icono Genérico en Lugar de Específico**
```javascript
// ❌ INCORRECTO: Icono genérico
secondaryButtons: [{
  text: 'Crear con plantilla',
  icon: 'file' // ❌ Genérico
}]
```

```javascript
// ✅ CORRECTO: Icono específico y apropiado
secondaryButtons: [{
  text: 'Crear con plantilla',
  icon: 'file-lines' // ✅ Específico para plantilla/documento con líneas
}]
```

#### **ERROR #4: No Implementar Todos los Botones Identificados**
```javascript
// ❌ INCORRECTO: Solo botón primario
header: {
  primaryButton: { /* ... */ }
  // ❌ Falta secondaryButtons
}
```

```javascript
// ✅ CORRECTO: Todos los botones identificados
header: {
  primaryButton: { /* ... */ },
  secondaryButtons: [{ /* ... */ }] // ✅ Implementado
}
```

#### **ERROR #5: DataTable Renderiza iconOnly por Defecto**
```typescript
// ❌ INCORRECTO: Siempre iconOnly: true (código original)
const primaryButtonHTML = renderButton({
  iconOnly: true, // ❌ Ignora el texto
  // ...
});
```

```typescript
// ✅ CORRECTO: iconOnly solo si NO hay texto
const primaryButtonHTML = renderButton({
  text: primaryButton.text || '',
  iconOnly: !primaryButton.text, // ✅ Detecta si hay texto
  // ...
});
```

**Solución:** Modificar `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` y recompilar el UMD.

### 📝 **Regla de Oro:**
**SIEMPRE que analices botones del header del DataTable:**

1. ✅ **Identificar cada botón individualmente:**
   - ¿Cuántos botones hay?
   - ¿Cuáles son primarios y cuáles secundarios?
   - ¿Qué texto tiene cada botón? ⚠️ OBLIGATORIO
   - ¿Qué icono tiene cada botón?
   - ¿Es iconOnly o icono + texto?

2. ✅ **Verificar duplicación de símbolos:**
   - ¿El texto incluye símbolos que el icono ya muestra?
   - Ejemplos: "+" con icono `plus`, "✓" con icono `check`, "✕" con icono `xmark`
   - Si SÍ → Quitar el símbolo del texto

3. ✅ **Usar iconos específicos:**
   - Consultar catálogo de FontAwesome
   - Usar iconos específicos (ej: `file-lines`) en lugar de genéricos (ej: `file`)
   - Considerar el contexto (plantilla → `file-lines`, documento → `file`)

4. ✅ **Implementar todos los botones:**
   - No dejar botones sin implementar si están en la imagen
   - Verificar que todos los botones identificados estén implementados

5. ✅ **Verificar soporte del componente:**
   - Si el DataTable renderiza `iconOnly: true` por defecto, modificar el código fuente
   - Recompilar el UMD: `cd vendor/ubits/packages/components/data-table && npm run build`
   - Recargar la página con caché limpio (Ctrl+Shift+R)

### 🔗 **Referencias:**
- **Análisis completo de errores:** `docs/guias/analisis/ANALISIS-ERROR-BOTONES-HEADER-DATATABLE.md` - ⚠️ **OBLIGATORIO**
- **Guía de análisis de DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` (PASO 0.6)
- **Código del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (líneas 1027-1066)

---

## ⚠️ ERROR CRÍTICO #38: LazyLoad Muestra Solo 10 Items Aunque el Contador Indique Más

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: No configurar lazyLoad, usa valores por defecto
const dataTableOptions = {
  containerId: 'encuestas-table-container',
  header: {
    counter: '20 encuestas' // ✅ Contador muestra 20
  },
  rows: items // 20 items
  // ❌ FALTA: lazyLoad: false
  // Resultado: Solo se muestran 10 items (lazyLoadItemsPerBatch por defecto)
};
```

**Síntomas:**
- El contador muestra "20 encuestas" (o el número total de items)
- Pero solo se ven 10 filas en la tabla
- Los items restantes no son visibles hasta hacer scroll (si el lazy load está activo)
- El usuario espera ver todos los items de inmediato

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Desactivar lazy load para pocos items
const dataTableOptions = {
  containerId: 'encuestas-table-container',
  lazyLoad: false, // ✅ Desactivar lazy load para mostrar todos los items
  header: {
    counter: '20 encuestas'
  },
  rows: items // 20 items
  // Resultado: Se muestran los 20 items de inmediato
};
```

**Para muchos items (> 100):**
```javascript
// ✅ CORRECTO: Activar lazy load con batch apropiado
const dataTableOptions = {
  containerId: 'encuestas-table-container',
  lazyLoad: true, // ✅ Activar lazy load para muchos items
  lazyLoadItemsPerBatch: 50, // ✅ Cargar 50 items por batch
  header: {
    counter: '206 encuestas'
  },
  rows: items // 206 items
};
```

**Si lazy load está activo pero hay pocos items:**
```javascript
// ✅ CORRECTO: Cargar todos los items de una vez
const dataTableOptions = {
  containerId: 'encuestas-table-container',
  lazyLoad: true, // Por alguna razón debe estar activo
  lazyLoadItemsPerBatch: items.length, // ✅ Cargar todos los items de una vez
  header: {
    counter: '20 encuestas'
  },
  rows: items // 20 items
};
```

### 🔍 **¿Por qué?**
1. **LazyLoad activado por defecto**: El DataTable tiene `lazyLoad: true` por defecto cuando `showPagination: false`
2. **Batch por defecto pequeño**: El `lazyLoadItemsPerBatch` por defecto es `10`
3. **No verificar cantidad de items**: No se verifica si hay pocos items antes de activar lazy load
4. **Optimización innecesaria**: El lazy load es una optimización para grandes cantidades de datos, no para pocos items

### 📝 **Regla de Oro:**
**SIEMPRE que implementes un DataTable:**

1. ✅ **Contar items totales:**
   - ¿Cuántos items hay en total?
   - ¿Es una cantidad pequeña (< 50-100) o grande (> 100)?

2. ✅ **Decidir estrategia:**
   - **Pocos items (< 50-100):** `lazyLoad: false` → Mostrar todos de inmediato
   - **Muchos items (> 100):** `lazyLoad: true` → Usar lazy load con batch apropiado
   - **Cantidad media (50-100):** Evaluar según contexto

3. ✅ **Configurar correctamente:**
   ```javascript
   // Para pocos items
   lazyLoad: false
   
   // Para muchos items
   lazyLoad: true,
   lazyLoadItemsPerBatch: 50 // O el valor apropiado
   ```

4. ✅ **Verificar resultado:**
   - ¿Se muestran todos los items esperados?
   - ¿El contador coincide con los items visibles?
   - ¿El scroll funciona correctamente si es necesario?

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-LAZYLOAD-MUESTRA-SOLO-10-ITEMS.md` - ⚠️ **OBLIGATORIO**
- **Guía de análisis de DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` (sección "CONFIGURACIÓN CRÍTICA: LazyLoad")
- **Código del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (líneas 1201-1202, 1564-1566)

---

## ⚠️ ERROR CRÍTICO #39: Fila Seleccionada se Ve Blanca en Modo Dark

### ❌ **ERROR COMÚN:**
```typescript
// ❌ INCORRECTO: Token hardcodeado para modo light
const bg1Value = getComputedStyle(document.documentElement)
  .getPropertyValue('--modifiers-normal-color-light-bg-1') // ❌ Siempre light
  .trim();

rowElement.style.setProperty('background-color', bg1Value, 'important');
```

**Síntomas:**
- Al activar un checkbox, la fila se ve blanca momentáneamente en modo dark
- El color no coincide con el tema dark
- La fila parece estar en modo light aunque el tema sea dark
- El efecto desaparece después de un momento

### ✅ **CORRECTO:**
```typescript
// ✅ CORRECTO: Detectar tema y usar token correcto
const currentTheme = document.body.getAttribute('data-theme') || 
                     document.documentElement.getAttribute('data-theme') || 
                     'light';

const bgTokenName = currentTheme === 'dark' 
  ? '--modifiers-normal-color-dark-bg-1' // ✅ Token de dark
  : '--modifiers-normal-color-light-bg-1'; // ✅ Token de light

const bg1Value = getComputedStyle(document.documentElement)
  .getPropertyValue(bgTokenName)
  .trim();

rowElement.style.setProperty('background-color', bg1Value, 'important');
```

**CSS de respaldo (opcional pero recomendado):**
```css
/* ✅ CORRECTO: CSS de respaldo para modo dark */
body[data-theme="dark"] #encuestas-table-container .ubits-data-table__row--clear-hover,
html[data-theme="dark"] #encuestas-table-container .ubits-data-table__row--clear-hover {
  background-color: var(--modifiers-normal-color-dark-bg-1) !important;
}

body[data-theme="dark"] #encuestas-table-container .ubits-data-table__row--clear-hover .ubits-data-table__cell,
html[data-theme="dark"] #encuestas-table-container .ubits-data-table__row--clear-hover .ubits-data-table__cell {
  background-color: var(--modifiers-normal-color-dark-bg-1) !important;
}
```

### 🔍 **¿Por qué?**
1. **Token hardcodeado**: El código usa `--modifiers-normal-color-light-bg-1` sin verificar el tema
2. **No detectar tema**: No se consulta `data-theme` en `body` o `documentElement`
3. **Estilos inline con !important**: Los estilos inline sobrescriben cualquier CSS correctivo
4. **No usar tokens dinámicos**: No se selecciona el token apropiado según el tema actual

### 📝 **Regla de Oro:**
**SIEMPRE que apliques estilos que dependen del tema:**

1. ✅ **Detectar tema actual:**
   ```typescript
   const currentTheme = document.body.getAttribute('data-theme') || 
                        document.documentElement.getAttribute('data-theme') || 
                        'light';
   ```

2. ✅ **Seleccionar token correcto:**
   ```typescript
   const tokenName = currentTheme === 'dark' 
     ? '--modifiers-normal-color-dark-*'
     : '--modifiers-normal-color-light-*';
   ```

3. ✅ **Obtener valor del token:**
   ```typescript
   const tokenValue = getComputedStyle(document.documentElement)
     .getPropertyValue(tokenName)
     .trim();
   ```

4. ✅ **Aplicar estilos:**
   ```typescript
   element.style.setProperty('property', tokenValue, 'important');
   ```

---

## ⚠️ ERROR CRÍTICO #40: Layout y Scroll - SubNav No Fijo, Scroll en Página, DataTable No Alineado

### ❌ **ERROR COMÚN:**
1. **SubNav se mueve con el scroll** - No está fijo
2. **Scroll en la página completa** - No solo en la tabla
3. **DataTable no alineado con sidebar** - El contenedor no termina al mismo nivel
4. **Scroll innecesario** - Se genera scroll incluso con pocos items

### ✅ **SOLUCIÓN:**

**Ver guía completa:** `docs/guias/implementacion/GUIA-LAYOUT-TEMPLATE-DATATABLE.md` - ⚠️ **OBLIGATORIO**

#### **1. HTML y Body - Sin Scroll de Página:**
```css
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    overflow-y: hidden; /* ✅ CRÍTICO: No permitir scroll en la página */
}
```

#### **2. SubNav - Debe Estar Fijo:**
```css
#top-nav-container {
    position: sticky; /* ✅ CRÍTICO: Fijo en la parte superior */
    top: 0;
    z-index: 100;
    background-color: var(--ubits-bg-2); /* Fondo para que no se vea el contenido */
}
```

#### **3. Main Content - Limitar Altura:**
```css
.main-content {
    max-height: calc(100vh - var(--ubits-spacing-lg, 16px)); /* ✅ CRÍTICO: Limitar al viewport */
}
```

#### **4. Contenedor de la Tabla - Overflow Hidden:**
```css
#encuestas-table-container {
    overflow: hidden; /* ✅ CRÍTICO: Evitar desbordamiento */
    display: flex;
    flex-direction: column;
}
```

#### **5. Scrollable Container - Scroll Interno:**
```css
#encuestas-table-container .ubits-data-table__scrollable-container--vertical {
    overflow-y: auto !important; /* ✅ CRÍTICO: Scroll solo dentro del contenedor */
    flex: 1;
    min-height: 0;
}
```

#### **6. Cálculo de Altura - Basado en Sidebar Real:**
```javascript
// ✅ CORRECTO: Usar posición real del sidebar
const sidebarElement = document.querySelector('.ubits-sidebar');
const sidebarRect = sidebarElement ? sidebarElement.getBoundingClientRect() : null;
const sidebarBottom = sidebarRect ? sidebarRect.bottom : viewportHeight - 16;

// ✅ CORRECTO: Lógica condicional para evitar scroll innecesario
const minHeightNeeded = tableHeaderHeight + (items.length * rowHeight) + containerPaddingTotal;
if (minHeightNeeded > maxContainerHeight && maxContainerHeight > 0) {
    container.style.maxHeight = `${maxContainerHeight}px`; // Solo si hay suficientes items
} else {
    container.style.maxHeight = 'none'; // Altura natural si hay pocos items
}
```

### 🔍 **¿Por qué?**
- **SubNav fijo:** Debe permanecer visible cuando se hace scroll en la tabla
- **Sin scroll en página:** El scroll solo debe estar dentro del scrollable container de la tabla
- **Alineación con sidebar:** El contenedor debe terminar al mismo nivel que el sidebar
- **Evitar scroll innecesario:** Si hay pocos items, usar altura natural (sin `max-height`)

### 📝 **Regla de Oro:**
**SIEMPRE al implementar layout y DataTable:**

1. ✅ **SubNav fijo:** `position: sticky`, `top: 0`, `z-index: 100`
2. ✅ **Sin scroll en página:** `overflow-y: hidden` en `body`
3. ✅ **Main content limitado:** `max-height: calc(100vh - margen superior)`
4. ✅ **Contenedor con overflow hidden:** `overflow: hidden`, `display: flex`, `flex-direction: column`
5. ✅ **Scrollable container con overflow-y auto:** `overflow-y: auto`, `flex: 1`, `min-height: 0`
6. ✅ **Cálculo basado en sidebar real:** Usar `getBoundingClientRect().bottom` del sidebar
7. ✅ **Lógica condicional:** Solo aplicar `max-height` si hay suficientes items

**Ver guía completa:** `docs/guias/implementacion/GUIA-LAYOUT-TEMPLATE-DATATABLE.md` - ⚠️ **OBLIGATORIO**

5. ✅ **Agregar CSS de respaldo (opcional):**
   ```css
   body[data-theme="dark"] .selector {
     property: var(--modifiers-normal-color-dark-*) !important;
   }
   ```

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-FILA-SELECCIONADA-BLANCA-DARK.md` - ⚠️ **OBLIGATORIO**
- **Código del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (líneas 3730-3755)
- **Theme Manager:** `vendor/ubits/packages/templates/config/theme-manager.js`

---

## 🔗 Referencias

- **Guía de uso:** `GUIA-USO-COMPONENTES-UBITS.md`
- **Catálogo:** `CATALOGO-COMPONENTES-UBITS.md`
- **Identificación:** `GUIA-IDENTIFICACION-COMPONENTES.md`
- **Reglas:** `.cursorrules`

---

## ⚠️ ERROR CRÍTICO #41: Barra de Acciones DataTable - Usar Web Components en HTML String

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Usar web component <ubits-button> en HTML string
const buttonsHTML = `
  <ubits-button variant="secondary" size="sm" icon="eye" id="action-btn-view-selected">
    Ver seleccionados (3)
  </ubits-button>
`;
actionBar.innerHTML = buttonsHTML;
```

**Problema:** El web component `<ubits-button>` puede no estar inicializado o no funcionar correctamente cuando se inserta como HTML string, resultando en que solo se muestre el texto sin el botón renderizado.

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Crear botones como elementos DOM
const createActionButton = (options) => {
  let buttonElement = null;
  
  // Intentar usar window.UBITS.Button.create si está disponible
  if (window.UBITS && window.UBITS.Button && window.UBITS.Button.create) {
    buttonElement = window.UBITS.Button.create(options);
  }
  
  // Si no, usar renderButton y crear elemento DOM
  if (!buttonElement && window.UBITS && window.UBITS.Button && window.UBITS.Button.render) {
    const html = window.UBITS.Button.render(options);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    buttonElement = tempDiv.querySelector('button');
  }
  
  // Fallback: crear botón básico con clases CSS
  if (!buttonElement) {
    buttonElement = document.createElement('button');
    buttonElement.className = `ubits-button ubits-button--${options.variant || 'secondary'} ubits-button--${options.size || 'sm'}`;
    // ... agregar icono, texto, etc.
  }
  
  return buttonElement;
};

// Usar createActionButton para crear botones
const button = createActionButton({
  variant: 'secondary',
  size: 'sm',
  text: 'Ver seleccionados (3)',
  icon: 'eye',
  iconStyle: 'regular',
  id: 'action-btn-view-selected'
});
actionBar.appendChild(button);
```

### 🔍 **¿Por qué?**
- Los web components necesitan ser registrados y pueden no estar disponibles cuando se inserta HTML string
- Crear elementos DOM directamente garantiza que los botones se rendericen correctamente
- Permite agregar event listeners directamente a los elementos

### 📝 **Regla de Oro:**
**SIEMPRE crear botones como elementos DOM, nunca como HTML string con web components.**

---

## ⚠️ ERROR CRÍTICO #42: Barra de Acciones DataTable - No Agregar Clase `ubits-button--active` en Fallback

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: No agregar clase active en el fallback
if (!buttonElement) {
  buttonElement = document.createElement('button');
  buttonElement.className = `ubits-button ubits-button--${options.variant || 'secondary'} ubits-button--${options.size || 'sm'}`;
  // ❌ FALTA: No se agrega ubits-button--active cuando options.active === true
}
```

**Problema:** Cuando se usa el fallback (crear botón básico), no se agrega la clase `ubits-button--active` cuando `options.active === true`, resultando en que el botón se vea blanco en lugar de mostrar el overlay azul.

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Agregar clase active explícitamente
if (!buttonElement) {
  buttonElement = document.createElement('button');
  buttonElement.className = `ubits-button ubits-button--${options.variant || 'secondary'} ubits-button--${options.size || 'sm'}`;
  
  // ✅ CRÍTICO: Agregar clase active si está activo
  if (options.active) {
    buttonElement.classList.add('ubits-button--active');
  }
  
  // ... resto del código
}
```

### 🔍 **¿Por qué?**
- La clase `ubits-button--active` es necesaria para que el CSS aplique el overlay azul
- Sin esta clase, el botón se ve con el estilo normal (blanco/gris) incluso cuando debería estar activo
- `renderButton` y `createButton` ya manejan esto automáticamente, pero el fallback debe hacerlo manualmente

### 📝 **Regla de Oro:**
**SIEMPRE agregar `ubits-button--active` cuando `options.active === true` en el fallback de creación de botones.**

---

## ⚠️ ERROR CRÍTICO #43: Barra de Acciones DataTable - Cambiar Variant en lugar de Usar Clase Active

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Cambiar variant cuando está activo
const viewSelectedVariant = viewSelectedActive ? 'primary' : 'secondary';

createActionButton({
  variant: viewSelectedVariant, // ❌ Cambia de secondary a primary
  size: 'sm',
  text: viewSelectedText,
  icon: viewSelectedIcon,
  active: viewSelectedActive
});
```

**Problema:** Cambiar el variant de `secondary` a `primary` cuando está activo no es el comportamiento correcto. El botón debe mantener `variant: 'secondary'` y usar la clase `ubits-button--active` para el estado activo.

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Mantener variant secondary, usar clase active
createActionButton({
  variant: 'secondary', // ✅ Siempre secondary
  size: 'sm',
  text: viewSelectedText,
  icon: viewSelectedIcon,
  active: viewSelectedActive // ✅ Esto agrega la clase ubits-button--active
});
```

### 🔍 **¿Por qué?**
- El estado `active` se maneja con la clase CSS `ubits-button--active`, no cambiando el variant
- El CSS aplica el overlay azul cuando un botón `secondary` tiene la clase `--active`
- Cambiar a `primary` hace que el botón se vea completamente azul, no con el overlay correcto

### 📝 **Regla de Oro:**
**SIEMPRE mantener el variant original (`secondary`) y usar `active: true` para agregar la clase `ubits-button--active`.**

---

## ⚠️ ERROR CRÍTICO #44: Barra de Acciones DataTable - Event Listeners No Funcionan (Duplicados)

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Agregar listener directamente sin clonar
const viewSelectedBtn = actionBar.querySelector('#action-btn-view-selected');
if (viewSelectedBtn) {
  viewSelectedBtn.addEventListener('click', () => {
    // ... código
  });
}
```

**Problema:** Si el botón ya tiene un listener o se re-renderiza, se pueden agregar múltiples listeners o el listener se puede perder.

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Clonar botón antes de agregar listener
const viewSelectedBtn = actionBar.querySelector('#action-btn-view-selected');
if (viewSelectedBtn) {
  // Remover listener anterior si existe
  const newViewSelectedBtn = viewSelectedBtn.cloneNode(true);
  viewSelectedBtn.parentNode.replaceChild(newViewSelectedBtn, viewSelectedBtn);
  
  newViewSelectedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // ... código
  });
}
```

### 🔍 **¿Por qué?**
- Clonar el botón elimina listeners anteriores y evita duplicados
- `preventDefault` y `stopPropagation` evitan comportamientos no deseados
- Garantiza que solo haya un listener activo

### 📝 **Regla de Oro:**
**SIEMPRE clonar el botón antes de agregar event listeners para evitar duplicados.**

---

## ⚠️ ERROR CRÍTICO #45: Barra de Acciones DataTable - No Implementar Funcionalidad de "Ver Seleccionados"

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Solo agregar TODO sin implementar funcionalidad
viewSelectedBtn.addEventListener('click', () => {
  console.log('👁️ Ver seleccionados:', selectedRows);
  // TODO: Implementar acción de ver seleccionados
});
```

**Problema:** El botón no hace nada cuando se hace clic, solo muestra un log. No filtra la tabla ni actualiza el estado.

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Implementar funcionalidad completa
// Estado para rastrear si "ver seleccionados" está activo
let viewSelectedActive = false;

viewSelectedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Toggle del estado
  viewSelectedActive = !viewSelectedActive;
  
  // Filtrar filas según el estado
  let filteredItems = items;
  if (viewSelectedActive) {
    // Mostrar solo las filas seleccionadas
    filteredItems = items.filter(item => selectedRowsSet.has(item.id));
  }
  
  // Actualizar la tabla
  if (dataTableInstance) {
    dataTableInstance.update({ rows: filteredItems });
  }
  
  // Re-renderizar la barra para actualizar texto e icono
  renderActionBar(container);
});
```

### 🔍 **¿Por qué?**
- El botón debe filtrar la tabla para mostrar solo las filas seleccionadas
- Debe actualizar el texto e icono del botón según el estado
- Debe actualizar la tabla usando `dataTableInstance.update()`

### 📝 **Regla de Oro:**
**SIEMPRE implementar la funcionalidad completa del botón, no solo agregar un TODO.**

---

## 📋 Resumen de Errores de Barra de Acciones DataTable

### Checklist de Implementación:

1. ✅ **Crear botones como elementos DOM**, no como HTML string con web components
2. ✅ **Agregar clase `ubits-button--active`** cuando `options.active === true` en el fallback
3. ✅ **Mantener variant `secondary`** siempre, usar `active: true` para el estado activo
4. ✅ **Clonar botones** antes de agregar event listeners para evitar duplicados
5. ✅ **Implementar funcionalidad completa** de cada botón, no solo TODOs
6. ✅ **Actualizar estado y re-renderizar** la barra cuando cambia la selección
7. ✅ **Usar `dataTableInstance.update()`** para filtrar filas cuando se activa "ver seleccionados"

### Patrón Correcto de Implementación:

```javascript
// 1. Estado de selección
const selectedRowsSet = new Set();
let viewSelectedActive = false;

// 2. Función para crear botones (usar createButton o fallback)
const createActionButton = (options) => {
  // Intentar usar window.UBITS.Button.create
  // Si no, usar renderButton
  // Si no, crear botón básico con clases CSS
  // ✅ CRÍTICO: Agregar ubits-button--active si options.active === true
};

// 3. Función para renderizar barra
const renderActionBar = (container) => {
  // Determinar texto e icono según estado
  const viewSelectedText = viewSelectedActive
    ? `Dejar de ver seleccionados ${countText}`
    : `Ver seleccionados ${countText}`;
  const viewSelectedIcon = viewSelectedActive ? 'eye-slash' : 'eye';
  
  // Crear botones
  const button = createActionButton({
    variant: 'secondary', // ✅ Siempre secondary
    active: viewSelectedActive, // ✅ Esto agrega la clase
    text: viewSelectedText,
    icon: viewSelectedIcon
  });
  
  // Agregar a la barra
  actionBar.appendChild(button);
  
  // ✅ CRÍTICO: Clonar antes de agregar listener
  const btn = actionBar.querySelector('#action-btn-view-selected');
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  
  newBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // ✅ Implementar funcionalidad completa
    viewSelectedActive = !viewSelectedActive;
    // ... filtrar y actualizar tabla
  });
};

// 4. Callbacks del DataTable
onRowSelect: (rowId, selected) => {
  // Actualizar selectedRowsSet
  // Si viewSelectedActive, actualizar tabla
  // Re-renderizar barra
}
```

---

## ⚠️ ERROR CRÍTICO #49: Expansión de Filas DataTable - Botón No Visible

### ❌ **ERROR COMÚN:**

Al implementar la funcionalidad de expansión de filas en el DataTable, el botón del chevron (▶/▼) no aparece aunque se haya configurado `rowExpandable: true`.

**Errores típicos:**

1. **CSS ocultando el botón:**
```css
/* ❌ INCORRECTO: CSS que oculta el botón de expandir */
#encuestas-table-container .ubits-data-table__row-expand {
    display: none !important;
}

/* ❌ INCORRECTO: CSS que oculta la celda completa de expandir */
#encuestas-table-container .ubits-data-table__cell--expand {
    display: none !important;
}
```

2. **Configuración incorrecta:**
```javascript
// ❌ INCORRECTO: rowExpandable deshabilitado
rowExpandable: false,

// ❌ INCORRECTO: No agregar renderExpandedContent a las filas
items.push({
  id: `item-${i}`,
  data: { nombre: 'Item' }
  // ❌ Falta renderExpandedContent
});
```

3. **No agregar callback onRowExpand:**
```javascript
// ❌ INCORRECTO: Falta el callback para manejar la expansión
const dataTableOptions = {
  // ... otras opciones
  // ❌ Falta onRowExpand
};
```

### ✅ **CORRECTO:**

**1. Habilitar rowExpandable:**
```javascript
const dataTableOptions = {
  // ... otras opciones
  rowExpandable: true, // ✅ Habilitar expansión de filas
  // ... más opciones
};
```

**2. Comentar o eliminar CSS que oculta el botón:**
```css
/* ✅ CORRECTO: Comentar el CSS que oculta el botón */
/* #encuestas-table-container .ubits-data-table__row-expand {
    display: none !important;
} */

/* ✅ CORRECTO: Comentar el CSS que oculta la celda */
/* #encuestas-table-container .ubits-data-table__cell--expand {
    display: none !important;
} */

/* ✅ OPCIONAL: Agregar CSS explícito para asegurar visibilidad */
#encuestas-table-container .ubits-data-table__row-expand {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
}

#encuestas-table-container .ubits-data-table__row-expand i {
    display: inline-block !important;
    visibility: visible !important;
    opacity: 1 !important;
}
```

**3. Agregar renderExpandedContent a cada fila:**
```javascript
items.push({
  id: `item-${i}`,
  data: {
    nombre: 'Item',
    // ... otros datos
  },
  // ✅ CORRECTO: Agregar función para renderizar contenido expandido
  renderExpandedContent: (rowData) => {
    const nombre = rowData.nombre || 'Item';
    return `
      <div style="padding: var(--ubits-spacing-lg, 16px);">
        <h3 style="margin: 0 0 var(--ubits-spacing-sm, 8px) 0; 
                   font-size: var(--ubits-font-size-lg, 18px); 
                   font-weight: var(--ubits-font-weight-semibold, 600); 
                   color: var(--modifiers-normal-color-light-fg-1);">
          Información adicional
        </h3>
        <p style="margin: 0; 
                  font-size: var(--ubits-font-size-md, 14px); 
                  color: var(--modifiers-normal-color-light-fg-1-medium);">
          Detalles adicionales para ${nombre}
        </p>
      </div>
    `;
  }
});
```

**4. Agregar callback onRowExpand:**
```javascript
const dataTableOptions = {
  // ... otras opciones
  rowExpandable: true,
  // ✅ CORRECTO: Callback para manejar expansión/colapso
  onRowExpand: (rowId, expanded) => {
    console.log('📂 [DataTable] Fila:', rowId, 'Expandida:', expanded);
    // Recalcular altura después de expandir/colapsar
    setTimeout(() => {
      adjustDataTableHeight();
    }, 100);
  },
  // ... más opciones
};
```

### 🔍 **¿Por qué?**

1. **CSS previo ocultando el botón:**
   - Si anteriormente se había deshabilitado la expansión de filas, es probable que haya CSS que oculte el botón
   - Este CSS puede estar en el template HTML o en estilos globales
   - **Solución:** Comentar o eliminar estas reglas CSS

2. **rowExpandable debe estar en true:**
   - El DataTable solo crea la columna de expansión si `rowExpandable: true`
   - Si está en `false`, el botón nunca se renderiza
   - **Solución:** Cambiar a `rowExpandable: true`

3. **renderExpandedContent es necesario:**
   - Aunque el botón aparezca, si no hay `renderExpandedContent`, no se mostrará contenido al expandir
   - El DataTable renderiza el contenido expandido usando esta función
   - **Solución:** Agregar `renderExpandedContent` a cada fila

4. **onRowExpand para ajustar altura:**
   - Cuando se expande una fila, la altura de la tabla cambia
   - Es necesario recalcular la altura para que el scroll funcione correctamente
   - **Solución:** Agregar callback `onRowExpand` que llame a `adjustDataTableHeight()`

### 📝 **Checklist de Implementación:**

1. ✅ **Cambiar `rowExpandable: false` a `rowExpandable: true`**
2. ✅ **Comentar o eliminar CSS que oculta `.ubits-data-table__row-expand`**
3. ✅ **Comentar o eliminar CSS que oculta `.ubits-data-table__cell--expand`**
4. ✅ **Agregar CSS explícito para asegurar visibilidad** (opcional pero recomendado)
5. ✅ **Agregar `renderExpandedContent` a cada fila** con el contenido HTML a mostrar
6. ✅ **Agregar callback `onRowExpand`** para manejar cambios de altura
7. ✅ **Verificar que el icono FontAwesome esté disponible** (`fa-chevron-right`, `fa-chevron-down`)

### 🎯 **Patrón Correcto Completo:**

```javascript
// 1. Generar items con renderExpandedContent
const items = [];
for (let i = 1; i <= 20; i++) {
  items.push({
    id: `item-${i}`,
    data: {
      nombre: `Item ${i}`,
      // ... otros datos
    },
    // ✅ CRÍTICO: Agregar renderExpandedContent
    renderExpandedContent: (rowData) => {
      const nombre = rowData.nombre || 'Item';
      return `
        <div style="padding: var(--ubits-spacing-lg, 16px);">
          <h3 style="margin: 0 0 var(--ubits-spacing-sm, 8px) 0; 
                     font-size: var(--ubits-font-size-lg, 18px); 
                     font-weight: var(--ubits-font-weight-semibold, 600); 
                     color: var(--modifiers-normal-color-light-fg-1);">
            Información adicional
          </h3>
          <p style="margin: 0; 
                    font-size: var(--ubits-font-size-md, 14px); 
                    color: var(--modifiers-normal-color-light-fg-1-medium);">
            Detalles adicionales para ${nombre}
          </p>
        </div>
      `;
    }
  });
}

// 2. Configurar DataTable con rowExpandable y onRowExpand
const dataTableOptions = {
  containerId: 'table-container',
  columns: [
    // ... columnas
  ],
  rows: items,
  // ✅ CRÍTICO: Habilitar expansión
  rowExpandable: true,
  // ✅ CRÍTICO: Callback para manejar expansión
  onRowExpand: (rowId, expanded) => {
    console.log('📂 [DataTable] Fila:', rowId, 'Expandida:', expanded);
    // Recalcular altura después de expandir/colapsar
    setTimeout(() => {
      adjustDataTableHeight();
    }, 100);
  },
  // ... otras opciones
};

// 3. CSS en el template
/* ✅ CRÍTICO: Comentar CSS que oculta el botón */
/* #table-container .ubits-data-table__row-expand {
    display: none !important;
} */

/* ✅ CRÍTICO: Comentar CSS que oculta la celda */
/* #table-container .ubits-data-table__cell--expand {
    display: none !important;
} */

/* ✅ OPCIONAL: Asegurar visibilidad */
#table-container .ubits-data-table__row-expand {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
}
```

### ⚠️ **Errores Relacionados:**
- **Error relacionado:** ERROR CRÍTICO #31: Botones de Filas (Expandir, Drag Handle) Aparecen Aunque No Están en la Imagen
- **Error relacionado:** ERROR CRÍTICO #40: Layout y Scroll - SubNav No Fijo, Scroll en Página, DataTable No Alineado

---

## ⚠️ ERROR CRÍTICO #49: No Implementar Empty States para Búsqueda y Filtros

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Implementar buscador y filtros sin empty states
window.createDataTable({
  containerId: 'encuestas-table-container',
  header: {
    searchButton: {
      placeholder: 'Buscar encuestas...',
      onChange: (value) => { /* ... */ }
    },
    filterButton: {
      onClick: () => { /* ... */ }
    }
  },
  // ❌ FALTA: emptyState para noSearchResults y noFilterResults
  columns: [ /* ... */ ],
  rows: items
});
```

**Síntomas:**
- La tabla aparece vacía sin explicación cuando no hay resultados de búsqueda
- La tabla aparece vacía sin explicación cuando no hay resultados de filtros
- No hay feedback visual para el usuario
- No hay opciones para limpiar filtros o ajustar la búsqueda

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Implementar empty states cuando hay buscador y filtros
window.createDataTable({
  containerId: 'encuestas-table-container',
  header: {
    searchButton: {
      placeholder: 'Buscar encuestas...',
      onChange: (value) => { /* ... */ }
    },
    filterButton: {
      onClick: () => { /* ... */ }
    }
  },
  // ✅ OBLIGATORIO: Empty states para búsqueda y filtrado
  emptyState: {
    // Empty state cuando no hay resultados de búsqueda
    noSearchResults: {
      title: 'No se encontraron resultados',
      description: 'Intenta con otros términos de búsqueda o ajusta los filtros.',
      icon: 'magnifying-glass', // Icono de lupa para búsqueda
      showPrimaryButton: false
    },
    // Empty state cuando no hay resultados de filtros
    noFilterResults: {
      title: 'No hay resultados con los filtros aplicados',
      description: 'Intenta ajustar los filtros o limpiarlos para ver más resultados.',
      icon: 'filter', // Icono de filtro
      
      // ✅ BOTÓN PRIMARIO: "Ajustar filtros" - Abre el drawer
      actionLabel: 'Ajustar filtros',
      showPrimaryButton: true,
      onAction: () => {
        // Abrir drawer de filtros
        const headerElement = window._encuestasDataTableInstance.element.querySelector('.ubits-data-table__header');
        const filterButton = headerElement?.querySelector('.ubits-data-table__header-filter-button');
        filterButton?.click();
      },
      
      // ✅ BOTÓN SECUNDARIO: "Limpiar filtros" - Limpia SIN abrir drawer visiblemente
      secondaryActionLabel: 'Limpiar filtros',
      showSecondaryButton: true,
      onSecondaryAction: () => {
        // Ver implementación completa en ERROR CRÍTICO #50
        // Ver guía completa: docs/guias/implementacion/GUIA-EMPTY-STATE-FILTROS-DATATABLE.md
      }
    }
  },
  columns: [ /* ... */ ],
  rows: items
});
```

### 🔍 **¿Por qué?**
1. **Experiencia del usuario**: Los empty states proporcionan feedback claro cuando no hay resultados
2. **Funcionalidad requerida**: Si hay buscador o filtros, los empty states son obligatorios
3. **Acciones disponibles**: Los empty states pueden incluir botones para limpiar filtros o ajustar búsqueda
4. **Principio de diseño**: Siempre mostrar feedback visual cuando una acción no produce resultados

### 📝 **Regla de Oro:**
**SIEMPRE que implementes un DataTable con buscador o filtros:**

1. ✅ **Verificar funcionalidades:**
   - ¿Hay `searchButton`? → Implementar `noSearchResults`
   - ¿Hay `filterButton`? → Implementar `noFilterResults`

2. ✅ **Implementar empty states correspondientes:**
   - Configurar iconos apropiados (`magnifying-glass` para búsqueda, `filter` para filtros)
   - Configurar textos descriptivos
   - Configurar botones de acción si aplica (ej: "Limpiar filtros")

3. ✅ **Verificar funcionalidad:**
   - Probar búsqueda sin resultados → Debe mostrar `noSearchResults`
   - Probar filtros sin resultados → Debe mostrar `noFilterResults`

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-NO-IMPLEMENTAR-EMPTY-STATES-BUSQUEDA-FILTROS.md`
- **Tipos del DataTable:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Implementación:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts`

---

## ⚠️ ERROR CRÍTICO #50: No Implementar Todas las Interacciones de los Componentes

### ❌ **ERROR COMÚN:**
```javascript
// ❌ INCORRECTO: Callbacks con solo console.log, no funcionan
emptyState: {
  noFilterResults: {
    actionLabel: 'Limpiar filtros',
    onAction: () => {
      console.log('Limpiar filtros'); // ❌ Solo log, no limpia filtros
      // TODO: Implementar lógica
    }
  }
},
filterButton: {
  onClearFilters: () => {
    console.log('Limpiar filtros'); // ❌ Solo log, no limpia filtros
  }
}
```

**Síntomas:**
- Los botones no hacen nada cuando se hace click
- Los callbacks solo registran en consola sin ejecutar acciones reales
- Las acciones de empty states no funcionan
- Los componentes no se comunican entre sí
- El botón "Limpiar filtros" abre el drawer en lugar de limpiar directamente

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Empty state de filtros con DOS botones y funcionalidad completa
emptyState: {
  noFilterResults: {
    title: 'No hay resultados con los filtros aplicados',
    description: 'Intenta ajustar los filtros o limpiarlos para ver más resultados.',
    icon: 'filter',
    
    // ✅ BOTÓN PRIMARIO: "Ajustar filtros" - Abre el drawer
    actionLabel: 'Ajustar filtros',
    showPrimaryButton: true,
    onAction: () => {
      const headerElement = window._encuestasDataTableInstance.element.querySelector('.ubits-data-table__header');
      if (headerElement) {
        const filterButton = headerElement.querySelector('.ubits-data-table__header-filter-button');
        if (filterButton) {
          filterButton.click(); // Abre el drawer
        }
      }
    },
    
    // ✅ BOTÓN SECUNDARIO: "Limpiar filtros" - Limpia SIN abrir drawer visiblemente
    secondaryActionLabel: 'Limpiar filtros',
    showSecondaryButton: true,
    onSecondaryAction: () => {
      // Verificar si hay drawer abierto
      const drawerOverlay = document.querySelector('.ubits-drawer-overlay.ubits-drawer-overlay--open');
      if (drawerOverlay) {
        // Drawer ya abierto → Hacer click en "Limpiar" directamente
        const drawer = drawerOverlay.querySelector('.ubits-drawer');
        const footer = drawer?.querySelector('.ubits-drawer__footer');
        const footerRight = footer?.querySelector('.ubits-drawer__footer-right');
        const buttons = footerRight?.querySelectorAll('.ubits-drawer__footer-button');
        buttons?.forEach(btn => {
          if (btn.textContent?.trim().toLowerCase().includes('limpiar')) {
            btn.click(); // Limpia y cierra el drawer
          }
        });
      } else {
        // Drawer NO abierto → Abrirlo oculto, hacer click en "Limpiar", cerrarlo
        const style = document.createElement('style');
        style.id = 'hide-drawer-temporarily';
        style.textContent = '.ubits-drawer-overlay { opacity: 0 !important; pointer-events: none !important; }';
        document.head.appendChild(style);
        
        const headerElement = window._encuestasDataTableInstance.element.querySelector('.ubits-data-table__header');
        const filterButton = headerElement?.querySelector('.ubits-data-table__header-filter-button');
        filterButton?.click();
        
        // Esperar a que el drawer se abra y hacer click en "Limpiar"
        let attempts = 0;
        const checkInterval = setInterval(() => {
          attempts++;
          const drawerOverlayAfterOpen = document.querySelector('.ubits-drawer-overlay.ubits-drawer-overlay--open');
          if (drawerOverlayAfterOpen) {
            clearInterval(checkInterval);
            const drawer = drawerOverlayAfterOpen.querySelector('.ubits-drawer');
            const footer = drawer?.querySelector('.ubits-drawer__footer');
            const footerRight = footer?.querySelector('.ubits-drawer__footer-right');
            const buttons = footerRight?.querySelectorAll('.ubits-drawer__footer-button');
            buttons?.forEach(btn => {
              if (btn.textContent?.trim().toLowerCase().includes('limpiar')) {
                btn.click(); // Limpia y cierra el drawer
                setTimeout(() => {
                  document.getElementById('hide-drawer-temporarily')?.remove();
                }, 100);
              }
            });
          } else if (attempts >= 20) {
            clearInterval(checkInterval);
            document.getElementById('hide-drawer-temporarily')?.remove();
          }
        }, 100);
      }
    }
  }
}
```

**⚠️ IMPORTANTE: Selectores Correctos del Drawer:**
- ✅ **Drawer abierto:** `.ubits-drawer-overlay.ubits-drawer-overlay--open` (NO usar `data-drawer-open="true"`)
- ✅ **Footer del drawer:** `.ubits-drawer__footer` (NO usar `.ubits-drawer__footer-buttons`)
- ✅ **Botones del footer:** `.ubits-drawer__footer-right > .ubits-drawer__footer-button`

### 🔍 **¿Por qué?**
1. **Funcionalidad real**: Los callbacks deben ejecutar acciones reales, no solo registrar en consola
2. **Reutilización**: Si un callback se usa en múltiples lugares, guardarlo en una variable para reutilizarlo
3. **Comunicación entre componentes**: Los componentes deben comunicarse correctamente entre sí
4. **Experiencia del usuario**: Los botones deben funcionar cuando el usuario hace click

### 📝 **Regla de Oro:**
**SIEMPRE que implementes un componente con interacciones:**

1. ✅ **Identificar TODAS las interacciones:**
   - Listar todos los botones, callbacks y acciones
   - No dejar ninguna sin implementar

2. ✅ **Implementar lógica real:**
   - NO dejar `console.log` o `TODO`
   - Implementar funcionalidad que produzca resultados visibles
   - Conectar callbacks entre componentes

3. ✅ **Guardar callbacks reutilizables:**
   - Si un callback se usa en múltiples lugares, guardarlo en una variable
   - Reutilizar el mismo callback en todos los lugares necesarios

4. ✅ **Verificar funcionalidad:**
   - Probar cada botón y callback
   - Verificar que las acciones funcionen correctamente
   - Verificar que los componentes se comuniquen entre sí

### 🔗 **Referencias:**
- **Guía completa de empty state de filtros:** `docs/guias/implementacion/GUIA-EMPTY-STATE-FILTROS-DATATABLE.md` ⭐ **OBLIGATORIO LEER**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-NO-IMPLEMENTAR-INTERACCIONES-COMPONENTES.md`
- **Análisis de error empty states:** `docs/guias/analisis/ANALISIS-ERROR-NO-IMPLEMENTAR-EMPTY-STATES-BUSQUEDA-FILTROS.md`
- **Análisis de error sin funcionalidad:** `docs/guias/analisis/ANALISIS-ERROR-DATATABLE-SIN-FUNCIONALIDAD.md`

---

## ⚠️ ERROR CRÍTICO #51: Input Calendar en Drawer de Filtros Usa Input Genérico en lugar de Componente Calendar UBITS

### ❌ **ERROR COMÚN:**

**ERROR 1: Generación Automática de Filtros con Tipo Incorrecto**
```javascript
// ❌ INCORRECTO: Al generar filtros automáticamente, columnas tipo 'fecha' generan filtros con type: 'date'
} else if (col.type === 'fecha') {
  filterType = 'date'; // ❌ INCORRECTO: Debe ser 'calendar' para usar componente Calendar de UBITS
}
```

**ERROR 2: Usar createInput con type: 'calendar'**
```javascript
// ❌ INCORRECTO: Usar createInput con type: 'calendar'
filters.forEach((filter) => {
  let inputOptions = {
    containerId: `filter-input-${filter.id}`,
    label: filter.label,
    value: currentValue,
    size: 'md',
  };

  if (filter.type === 'select' && filter.options) {
    inputOptions.type = 'select';
    // ...
  } else {
    inputOptions.type = filter.type; // ❌ Si es 'calendar', pasa 'calendar' a createInput
  }

  createInput(inputOptions); // ❌ createInput no maneja correctamente type: 'calendar'
});
```

**Síntomas:**
- Los filtros de fecha se generan con `type: 'date'` en lugar de `type: 'calendar'`
- El input muestra un icono de token genérico en lugar del icono correcto del Calendar
- Se despliega un calendario nativo del sistema en lugar del componente Calendar de UBITS
- El calendario no usa tokens UBITS ni el diseño del componente Calendar
- Inconsistencia visual con el resto de componentes UBITS
- **El input se ve como una "caja" mal formada**
- **El calendario no se muestra o queda oculto detrás del drawer**
- **Problemas de z-index que impiden ver el calendario**

### ✅ **CORRECTO:**
```javascript
// ✅ CORRECTO: Detectar tipo calendar y usar createCalendar
filters.forEach((filter) => {
  const containerId = `filter-input-${filter.id}`;
  const inputContainer = drawerInstance.element.querySelector(`#${containerId}`) as HTMLElement;
  if (inputContainer) {
    inputContainer.innerHTML = '';
    const currentValue = activeFilters[filter.id] || filter.value || '';

    if (filter.type === 'calendar') {
      // ✅ CORRECTO: Usar createCalendar para tipo calendar
      import('../../calendar/src/index').then(({ createCalendar }) => {
        // Cargar estilos CSS del Calendar
        const stylesToLoad = [
          { id: 'ubits-calendar-styles', href: '../../addons/calendar/src/styles/calendar.css' },
          { id: 'ubits-button-styles', href: '../../addons/button/src/styles/button.css' },
          { id: 'ubits-input-styles', href: '../../addons/input/src/styles/input.css' },
          { id: 'ubits-list-styles', href: '../../addons/list/src/styles/list.css' },
        ];

        for (const style of stylesToLoad) {
          if (!document.getElementById(style.id)) {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = style.href;
            linkElement.id = style.id;
            document.head.appendChild(linkElement);
          }
        }

        // Crear input readonly con icono correcto
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.readOnly = true;
        inputElement.value = currentValue;
        inputElement.placeholder = `Filtrar por ${filter.label.toLowerCase()}...`;
        inputElement.className = 'ubits-input__input';
        inputElement.style.cursor = 'pointer';

        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'ubits-input-icon-right';
        iconWrapper.innerHTML = '<i class="far fa-calendar"></i>'; // ✅ Icono correcto

        // Crear instancia del Calendar UBITS
        const parsedDate = parseDate(currentValue);
        const initialDate = parsedDate || new Date();

        const calendarInstance = createCalendar({
          mode: 'single',
          selectedDate: parsedDate,
          initialDate: initialDate,
          onDateSelect: (date: Date) => {
            const formattedDate = formatDate(date);
            inputElement.value = formattedDate;
            activeFilters[filter.id] = formattedDate;
            // Actualizar filtros y re-renderizar
            render();
          },
        });

        // Variables para mantener la instancia del calendario
        let calendarInstance: ReturnType<typeof createCalendar> | null = null;
        let externalCalendarContainer: HTMLElement | null = null;
        let handleOutsideClick: ((e: MouseEvent) => void) | null = null;
        let handleEscapeKey: ((e: KeyboardEvent) => void) | null = null;

        // Función para cerrar calendario y limpiar listeners
        const closeCalendar = () => {
          if (externalCalendarContainer) {
            externalCalendarContainer.style.display = 'none';
            if (externalCalendarContainer.parentElement) {
              externalCalendarContainer.remove();
            }
            externalCalendarContainer = null;
          }
          if (handleOutsideClick) {
            document.removeEventListener('click', handleOutsideClick);
            handleOutsideClick = null;
          }
          if (handleEscapeKey) {
            document.removeEventListener('keydown', handleEscapeKey);
            handleEscapeKey = null;
          }
        };

        // Función para mostrar el calendario
        const showCalendar = async () => {
          if (externalCalendarContainer && externalCalendarContainer.style.display !== 'none') {
            closeCalendar();
            return;
          }
          if (calendarInstance && externalCalendarContainer) {
            const inputRect = inputContainerWrapper.getBoundingClientRect();
            externalCalendarContainer.style.top = `${inputRect.bottom + 4}px`;
            externalCalendarContainer.style.left = `${inputRect.left}px`;
            externalCalendarContainer.style.display = 'block';
            return;
          }
          // ... crear calendario y agregar al body con position fixed ...
        };

        // Event listeners para mostrar calendario
        inputElement.addEventListener('click', () => showCalendar());
        iconWrapper.addEventListener('click', () => showCalendar());

        // Agregar solo el input al contenedor (NO el calendario)
        inputContainer.appendChild(inputWrapper);
      });
    } else if (filter.type === 'select' && filter.options) {
      // Implementación para select usando createInput
      // ...
    } else {
      // Implementación para text, number, date usando createInput
      // ...
    }
  }
});
```

### 🔍 **¿Por qué?**
1. **Componente específico:** El tipo `calendar` requiere el componente Calendar de UBITS, no un input genérico
2. **Icono correcto:** El componente Calendar tiene su propio icono con tokens UBITS correctos (`far fa-calendar`)
3. **Calendario UBITS:** Se despliega el componente Calendar de Storybook, no un calendario nativo del sistema
4. **Consistencia visual:** Usa tokens UBITS y diseño consistente con el resto de componentes
5. **Funcionalidad completa:** Aprovecha todas las características del componente Calendar (modo single/range, estilos UBITS, etc.)

### 📝 **Regla de Oro:**
**SIEMPRE que implementes un filtro de tipo `calendar`:**

1. ✅ **Generación automática de filtros:**
   - Si una columna es de tipo `fecha`, el filtro generado automáticamente DEBE tener `type: 'calendar'` (NO `'date'`)
   - Verificar que la generación automática en `DataTableProvider.ts` use `filterType = 'calendar'` para columnas tipo `fecha`
   - **Ubicación:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` línea ~5924

2. ✅ **NO usar `createInput` con `type: 'calendar'`**
   - El tipo `calendar` requiere el componente Calendar de UBITS
   - `createInput` no maneja correctamente el tipo `calendar`

3. ✅ **Usar `createCalendar` de UBITS:**
   - Importar `createCalendar` de `'../../calendar/src/index'`
   - Crear instancia con configuración correcta
   - Configurar callbacks para manejar selección de fecha

4. ✅ **Cargar estilos CSS:**
   - Cargar `calendar.css`, `button.css`, `input.css`, `list.css`
   - Verificar que no estén duplicados antes de cargar

4. ✅ **Implementar input readonly:**
   - Input `type="text"` con `readOnly: true`
   - Icono `far fa-calendar` (NO icono de token genérico)
   - Event listeners para mostrar calendario

5. ✅ **Posicionamiento correcto del calendario (CRÍTICO):**
   - **AGREGAR AL BODY:** Crear contenedor y agregarlo al `document.body` (NO al drawer)
   - **POSITION FIXED:** Usar `position: fixed` con `z-index: 10000` o superior
   - **GETBOUNDINGCLIENTRECT:** Usar `getBoundingClientRect()` para calcular posición
   - Limpiar contenedor y listeners al cerrar

6. ✅ **Revisar implementación existente:**
   - Revisar cómo se implementa en celdas editables del DataTable (líneas 5150-5488)
   - Reutilizar la misma lógica y patrones (body + fixed + z-index alto)
   - Mantener consistencia en toda la aplicación

### 🔗 **Referencias:**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-INPUT-CALENDAR-DRAWER-FILTROS.md` ⭐ **OBLIGATORIO LEER**
- **Implementación correcta en celdas editables:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (líneas 5150-5446)
- **Componente Calendar:** `vendor/ubits/packages/components/calendar/src/CalendarProvider.ts`
- **Storybook Calendar:** `vendor/ubits/packages/storybook/stories/Calendar.stories.ts`

---

---

## 🚨 PROBLEMAS ENCONTRADOS DURANTE LA IMPLEMENTACIÓN

### **Problema 1: Generación Automática de Filtros**
- **Síntoma:** Los filtros de fecha se generaban con `type: 'date'` en lugar de `type: 'calendar'`
- **Solución:** Cambiar `filterType = 'date'` a `filterType = 'calendar'` en línea ~5924 de `DataTableProvider.ts`

### **Problema 2: Input se Veía como "Caja" y Calendario No se Mostraba**
- **Síntoma:** El input se veía mal formado y el calendario no se desplegaba
- **Causa:** El calendario se agregaba dentro del drawer con `position: absolute` y z-index insuficiente
- **Solución:** Agregar el calendario al `document.body` con `position: fixed` y `z-index: 10000`

### **Problema 3: No Limpiar Listeners**
- **Síntoma:** Memory leaks al abrir/cerrar múltiples veces
- **Solución:** Implementar función `closeCalendar()` que limpia listeners y remueve el contenedor

---

## ⚠️ ERROR CRÍTICO #53: Agregar Estilos Extra (Padding, Margin, Background) Automáticamente a Componentes

### ❌ **ERROR COMÚN:**

Al implementar componentes UBITS (Tabs, DataTable, etc.), se agregan estilos automáticamente (padding, margin, background, border-radius) sin que el usuario lo solicite, modificando el aspecto del componente respecto a cómo viene en Storybook.

**Ejemplo del error:**
```javascript
// ❌ INCORRECTO - Agregar padding automáticamente sin que se solicite
tabsContainer.style.cssText = 'width: 100%; margin-top: 16px; padding: 0 40px;';
```

**Síntoma:**
- Los componentes no se ven como en Storybook
- Aparecen con padding/margin/background que no deberían tener
- El aspecto visual no coincide con el componente original

### 🔍 **CAUSA RAÍZ:**

1. **Asumir que los componentes necesitan estilos adicionales** sin verificar cómo vienen en Storybook
2. **Agregar estilos "por si acaso"** sin que el usuario lo solicite explícitamente
3. **No consultar Storybook** para ver cómo viene el componente por defecto

### ✅ **SOLUCIÓN APLICADA:**

**1. NO agregar estilos automáticamente (INCLUYENDO margin-top):**

```javascript
// ❌ INCORRECTO - Agregar margin-top automáticamente cuando se menciona spacing
tabsContainer.style.cssText = 'width: 100%; margin-top: var(--ubits-spacing-lg, 16px);';
// Usuario dijo "a 16px del subnav" pero NO dijo "agregar margin-top"

// ✅ CORRECTO - NO agregar margin-top, el componente viene tal cual de Storybook
tabsContainer.style.cssText = 'width: 100%;';
// El spacing se maneja en el HTML o CSS, NO en el componente
```

**2. Consultar Storybook antes de agregar estilos:**

- ✅ Revisar cómo viene el componente en Storybook
- ✅ Ver si tiene padding, margin, background por defecto
- ✅ Implementar exactamente como viene en Storybook

**3. Solo agregar estilos si el usuario lo solicita explícitamente con palabras exactas:**

- ✅ Si el usuario dice **"agregar padding de 16px"** → agregar padding
- ✅ Si el usuario dice **"agregar margin-top de 16px"** → agregar margin-top
- ❌ Si el usuario dice **"a 16px del subnav"** → NO agregar margin-top (solo menciona spacing, no solicita agregar margin-top)
- ❌ Si el usuario dice **"spacing de 16px"** → NO agregar margin-top (solo menciona spacing, no solicita agregar margin-top)
- ❌ **NUNCA** asumir ni agregar automáticamente, incluso si se menciona spacing

### 📝 **REGLA DE ORO:**

**Los componentes deben venir TAL CUAL vienen de Storybook, sin modificaciones. Solo agregar estilos si el usuario lo solicita explícitamente. NO asumir ni agregar automáticamente.**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Consultar Storybook para ver cómo viene el componente por defecto**
  - Revisar el código en Storybook
  - Ver qué estilos tiene el componente por defecto
  - Verificar si tiene padding, margin, background

- [ ] **Crear componente sin estilos extra**
  - ✅ Solo agregar `width: 100%` si es necesario para el contenedor
  - ❌ **NUNCA** agregar `margin-top` automáticamente, incluso si el usuario menciona "spacing" o "a X px del subnav"
  - ✅ Solo agregar `margin-top` si el usuario dice explícitamente "agregar margin-top"
  - ❌ NO agregar padding, background, border-radius automáticamente

- [ ] **Solo agregar estilos si el usuario lo solicita explícitamente**
  - ✅ Si el usuario dice "agregar padding" → agregar padding
  - ✅ Si el usuario dice "agregar margin" → agregar margin
  - ❌ NO asumir ni agregar automáticamente

### 🔗 **Referencias:**

- **Regla en .cursorrules:** Sección "Componentes UBITS" - "NO agregar padding, margin ni estilos extra"
- **Regla en .cursor/rules/04-implementacion.md:** Error #14 - "NO Agregar Estilos Extra a Componentes"

---

## ⚠️ ERROR CRÍTICO #54: Padding-Top del Content-Area Afecta el Spacing entre SubNav y Tabs

### ❌ **PROBLEMA IDENTIFICADO:**

El `.content-area` tiene `padding-top` aplicado (directamente o a través de `.content-area.no-background`), lo que hace que el espacio entre el SubNav y los Tabs no sea exactamente 16px como se solicitó.

**Síntoma:**
- Se solicita spacing de 16px entre SubNav y Tabs
- Se aplica `margin-top: 16px` a los Tabs
- Pero el spacing visual es mayor porque el `.content-area` tiene `padding-top`
- El spacing real = `padding-top` del content-area + `margin-top` de los Tabs

**Ejemplo del error:**
```css
/* ❌ INCORRECTO - content-area con padding-top */
.content-area {
  padding-top: 20px; /* Esto afecta el spacing */
}

.content-area.no-background {
  padding: 20px 40px; /* padding-top incluido */
}
```

### 🔍 **CAUSA RAÍZ:**

1. **El `.content-area` puede tener padding-top desde estilos globales**
   - Estilos del template base pueden aplicar padding-top
   - El `.content-area.no-background` puede tener padding que incluya padding-top

2. **El spacing solicitado se aplica con `margin-top` en los Tabs**
   - Pero si el `.content-area` tiene `padding-top`, el spacing real es mayor
   - El spacing visual = `padding-top` del content-area + `margin-top` de los Tabs

3. **No se verifica que el `.content-area` no tenga padding-top**
   - Se asume que el spacing es solo el `margin-top` de los Tabs
   - No se considera el padding del contenedor padre

### ✅ **SOLUCIÓN APLICADA:**

**1. Asegurar que `.content-area` NO tenga padding-top:**

```css
/* ✅ CORRECTO - Asegurar padding-top: 0 */
.content-area {
  /* ... otros estilos ... */
  /* ⚠️ CRÍTICO: NO agregar padding-top - afecta el spacing entre SubNav y Tabs */
  padding-top: 0 !important;
}

.content-area.no-background {
  /* ... otros estilos ... */
  padding: 0 var(--ubits-spacing-6xl, 40px) !important;
  /* ⚠️ CRÍTICO: Solo padding horizontal, NO padding-top */
  padding-top: 0 !important;
}
```

**2. Aplicar spacing exacto en los Tabs:**

```javascript
// ✅ CORRECTO - Spacing exacto, sin padding-top en content-area
tabsContainer.style.cssText = 'width: 100%; margin-top: var(--ubits-spacing-lg, 16px); padding: 0;';
```

### 📝 **REGLA DE ORO:**

**SIEMPRE asegurar que el `.content-area` NO tenga `padding-top` cuando se solicita spacing específico entre SubNav y componentes. El spacing debe ser exactamente el `margin-top` del componente, sin padding adicional del contenedor padre.**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Verificar que `.content-area` NO tenga padding-top**
  - Revisar estilos del `.content-area`
  - Revisar estilos del `.content-area.no-background`
  - Asegurar `padding-top: 0 !important;` si es necesario

- [ ] **Aplicar spacing exacto en el componente**
  - Usar `margin-top` para el spacing solicitado
  - NO depender del padding del contenedor padre

- [ ] **Verificar spacing visual**
  - Medir el spacing real entre SubNav y componente
  - Debe ser exactamente el solicitado (ej: 16px)
  - NO debe incluir padding del contenedor padre

### 🔗 **Referencias:**

- **Guía de errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #54
- **Guía de no agregar estilos extra:** `docs/guias/implementacion/GUIA-NO-AGREGAR-ESTILOS-EXTRA-COMPONENTES.md`

---

## ⚠️ ERROR CRÍTICO #55: Agregar margin-top Inline o en CSS al Contenedor de Tabs

### ❌ **ERROR COMÚN:**

**Problema:**
Cuando se solicita spacing entre SubNav y Tabs, se agrega `margin-top` directamente al contenedor de tabs (inline o en CSS), cuando el spacing debe venir del `gap` del contenedor padre (`.main-content`).

**Ejemplo del error:**
```html
<!-- ❌ INCORRECTO - margin-top inline en el contenedor -->
<div id="encuestas-tabs-container" style="margin-top: 16px;"></div>
```

```css
/* ❌ INCORRECTO - margin-top en CSS del contenedor */
#encuestas-tabs-container {
    margin-top: var(--ubits-spacing-lg, 16px);
}
```

### 🔍 **CAUSA RAÍZ:**

1. **Asumir que el spacing debe aplicarse directamente al componente**
   - Se agrega `margin-top` al contenedor de tabs
   - El componente tabs no debe tener estilos adicionales
   - El componente debe venir tal cual de Storybook

2. **No usar el gap del contenedor padre**
   - El `.main-content` tiene `gap` para manejar el espaciado entre elementos
   - El spacing debe venir del `gap`, no del componente

3. **No consultar cómo viene el componente en Storybook**
   - El componente tabs no viene con `margin-top` por defecto
   - Agregar `margin-top` modifica el componente respecto a cómo viene en Storybook

### ✅ **SOLUCIÓN APLICADA:**

**1. NO agregar margin-top al contenedor de tabs:**

```html
<!-- ✅ CORRECTO - Sin margin-top inline -->
<div id="encuestas-tabs-container"></div>
```

```css
/* ✅ CORRECTO - Sin margin-top en CSS del contenedor */
#encuestas-tabs-container {
    width: 100%;
    box-sizing: border-box;
    /* ⚠️ IMPORTANTE: El componente tabs NO debe tener margin-top */
    /* El espaciado viene del gap del contenedor padre (.main-content) */
}
```

**2. Usar gap del contenedor padre para el spacing:**

```css
/* ✅ CORRECTO - Ajustar gap del contenedor padre */
.main-content {
    display: flex;
    flex-direction: column;
    gap: var(--ubits-spacing-lg, 16px); /* Spacing entre SubNav y Tabs */
}
```

### 📝 **REGLA DE ORO:**

**Los componentes UBITS NO deben tener estilos adicionales (incluyendo margin-top). El spacing entre elementos debe venir del `gap` del contenedor padre, NO del componente.**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **NO agregar margin-top al contenedor del componente**
  - ❌ NO agregar `margin-top` inline: `style="margin-top: 16px;"`
  - ❌ NO agregar `margin-top` en CSS: `#container { margin-top: 16px; }`
  - ✅ El componente debe venir tal cual de Storybook

- [ ] **Usar gap del contenedor padre para spacing**
  - ✅ Ajustar `gap` del contenedor padre (ej: `.main-content`)
  - ✅ El spacing viene del `gap`, no del componente

- [ ] **Consultar Storybook antes de agregar estilos**
  - ✅ Ver cómo viene el componente por defecto
  - ✅ Verificar que no tiene `margin-top` por defecto
  - ✅ Implementar exactamente como viene en Storybook

### 🔗 **Referencias:**

- **Error #53:** Agregar Estilos Extra Automáticamente a Componentes
- **Guía de no agregar estilos extra:** `docs/guias/implementacion/GUIA-NO-AGREGAR-ESTILOS-EXTRA-COMPONENTES.md`

---

## ⚠️ ERROR CRÍTICO #56: No Eliminar Correctamente HeaderSection y Content-Sections al Interceptar ContentManager

### ❌ **ERROR COMÚN:**

**Problema:**
Cuando se intercepta `ContentManager.updateContent` para eliminar HeaderSection y content-sections, no se eliminan correctamente o se vuelven a crear después de la eliminación.

**Síntoma:**
- HeaderSection sigue apareciendo después de interceptar ContentManager
- Content-sections sigue apareciendo después de interceptar ContentManager
- Los elementos se eliminan pero se vuelven a crear dinámicamente

**Ejemplo del error:**
```javascript
// ❌ INCORRECTO - Eliminar solo una vez, sin MutationObserver
window.UBITS_ContentManager.updateContent = function(section, subSection) {
    const result = originalUpdateContent.call(this, section, subSection);
    
    // Eliminar HeaderSection
    const headerSection = document.querySelector('#header-section-container');
    if (headerSection) {
        headerSection.remove();
    }
    
    // ❌ PROBLEMA: Si ContentManager crea elementos después, no se eliminan
    return result;
};
```

### 🔍 **CAUSA RAÍZ:**

1. **No interceptar ContentManager antes de que se inicialice**
   - La interceptación se hace después de que ContentManager ya creó HeaderSection
   - Necesita interceptarse inmediatamente después de cargar content-manager.js

2. **No usar MutationObserver para eliminar elementos dinámicamente**
   - Los elementos pueden crearse después de la interceptación
   - MutationObserver detecta y elimina elementos que se crean después

3. **No eliminar todos los elementos relacionados**
   - Solo se elimina `#header-section-container`
   - También debe eliminarse `.ubits-header-section`, `.content-sections`, `.widget-contenido-principal`

4. **No usar requestAnimationFrame para timing correcto**
   - Los elementos se eliminan antes de que el DOM se actualice
   - requestAnimationFrame asegura que el DOM esté actualizado antes de eliminar

### ✅ **SOLUCIÓN APLICADA:**

**1. Interceptar ContentManager inmediatamente después de cargar:**

```javascript
// ✅ CORRECTO - Interceptar inmediatamente después de cargar content-manager.js
<script src="/vercel-proxy/templates/engine/content-manager.js"></script>

<script>
    // Interceptar INMEDIATAMENTE después de cargar
    (function() {
        function interceptContentManagerImmediately() {
            if (!window.UBITS_ContentManager) {
                setTimeout(interceptContentManagerImmediately, 50);
                return;
            }
            
            // Interceptar updateContent
            const originalUpdateContent = window.UBITS_ContentManager.updateContent;
            window.UBITS_ContentManager.updateContent = function(section, subSection) {
                const result = originalUpdateContent.call(this, section, subSection);
                
                // Eliminar elementos usando requestAnimationFrame
                requestAnimationFrame(() => {
                    // Eliminar HeaderSection
                    const headerContainer = document.querySelector('#header-section-container');
                    if (headerContainer) headerContainer.remove();
                    
                    const headerSection = document.querySelector('.ubits-header-section');
                    if (headerSection) {
                        headerSection.closest('#header-section-container')?.remove() || headerSection.remove();
                    }
                    
                    // Eliminar content-sections
                    const contentSections = document.querySelector('.content-sections');
                    if (contentSections) contentSections.remove();
                    
                    // Eliminar widget-contenido-principal
                    const widgetPrincipal = document.querySelector('.widget-contenido-principal');
                    if (widgetPrincipal) {
                        widgetPrincipal.closest('.section-single')?.remove() || widgetPrincipal.remove();
                    }
                });
                
                return result;
            };
        }
        
        interceptContentManagerImmediately();
        setTimeout(interceptContentManagerImmediately, 100);
        setTimeout(interceptContentManagerImmediately, 500);
    })();
</script>
```

**2. Usar MutationObserver para eliminar elementos dinámicamente:**

```javascript
// ✅ CORRECTO - MutationObserver para eliminar elementos que se crean después
function setupAggressiveObserver() {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
        setTimeout(setupAggressiveObserver, 50);
        return;
    }
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        // Eliminar HeaderSection
                        if (node.id === 'header-section-container' || 
                            node.classList?.contains('ubits-header-section') ||
                            node.querySelector?.('#header-section-container') ||
                            node.querySelector?.('.ubits-header-section')) {
                            const headerContainer = document.getElementById('header-section-container');
                            if (headerContainer) headerContainer.remove();
                            
                            const headerSection = document.querySelector('.ubits-header-section');
                            if (headerSection) {
                                headerSection.closest('#header-section-container')?.remove() || headerSection.remove();
                            }
                        }
                        
                        // Eliminar content-sections
                        if (node.classList?.contains('content-sections') ||
                            node.querySelector?.('.content-sections')) {
                            const contentSections = document.querySelector('.content-sections');
                            if (contentSections) contentSections.remove();
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(contentArea, {
        childList: true,
        subtree: true
    });
}

setupAggressiveObserver();
```

### 📝 **REGLA DE ORO:**

**SIEMPRE interceptar ContentManager inmediatamente después de cargar, usar requestAnimationFrame para timing correcto, y MutationObserver para eliminar elementos que se crean dinámicamente después.**

### 📋 **CHECKLIST PARA FUTURAS IMPLEMENTACIONES:**

- [ ] **Interceptar ContentManager inmediatamente**
  - ✅ Interceptar después de cargar content-manager.js
  - ✅ Usar múltiples intentos (inmediato, 100ms, 500ms)
  - ✅ Verificar que ContentManager existe antes de interceptar

- [ ] **Eliminar todos los elementos relacionados**
  - ✅ Eliminar `#header-section-container`
  - ✅ Eliminar `.ubits-header-section`
  - ✅ Eliminar `.content-sections`
  - ✅ Eliminar `.widget-contenido-principal`

- [ ] **Usar requestAnimationFrame para timing**
  - ✅ Usar `requestAnimationFrame` antes de eliminar elementos
  - ✅ Asegurar que el DOM esté actualizado

- [ ] **Usar MutationObserver para elementos dinámicos**
  - ✅ Configurar MutationObserver en `.content-area`
  - ✅ Observar `childList` y `subtree`
  - ✅ Eliminar elementos que se crean después

### 🔗 **Referencias:**

- **Guía de eliminar HeaderSection:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`
- **Error #9:** HeaderSection Aparece Cuando No Debería

---

## ⚠️ ERROR CRÍTICO #52: No Implementar Action Bar en DataTable con Checkboxes

### ❌ **ERROR COMÚN:**

**Problema:**
Cuando un DataTable tiene `showCheckbox: true` (columna de selección de filas), **NO se implementa el Action Bar** para acciones individuales y grupales.

```javascript
// ❌ INCORRECTO: DataTable con checkboxes pero sin Action Bar
window.createDataTable({
  containerId: 'mi-tabla-container',
  showCheckbox: true, // ✅ Checkboxes activados
  // ❌ PERO no se implementa Action Bar
  // Los usuarios no pueden realizar acciones sobre las filas seleccionadas
});
```

**Síntomas:**
- El DataTable tiene checkboxes pero no hay Action Bar
- Los usuarios no pueden realizar acciones sobre las filas seleccionadas
- No hay forma de interactuar con las selecciones
- El checkbox no tiene propósito sin el Action Bar
- Inconsistencia con otros DataTables que sí tienen Action Bar

### ✅ **CORRECTO:**

**SIEMPRE que un DataTable tenga `showCheckbox: true`, DEBE implementarse el Action Bar:**

```javascript
// ✅ CORRECTO: Implementar Action Bar obligatoriamente
window.createDataTable({
  containerId: 'mi-tabla-container',
  showCheckbox: true, // ✅ Checkboxes activados
  // ... otras opciones
});

// ✅ OBLIGATORIO: Implementar Action Bar después de crear el DataTable
const selectionState = {
  selectedRowIds: new Set(),
  viewSelectedActive: false
};

const renderActionBar = (container) => {
  const header = container.querySelector('.ubits-data-table__header');
  if (!header) return;

  let actionBar = container.querySelector('.ubits-data-table__action-bar');
  if (!actionBar) {
    actionBar = document.createElement('div');
    actionBar.className = 'ubits-data-table__action-bar';
    header.insertAdjacentElement('afterend', actionBar);
  }

  const selectedCount = selectionState.selectedRowIds.size;
  if (selectedCount === 0) {
    actionBar.style.display = 'none';
    return;
  }

  actionBar.style.display = 'flex';
  // ... renderizar botones según selección única o múltiple
};

// ✅ OBLIGATORIO: Interceptar checkboxes individuales
const container = document.getElementById('mi-tabla-container');
const dataTable = container.querySelector('.ubits-data-table');

dataTable.addEventListener('change', (e) => {
  const target = e.target;
  if (target && target.type === 'checkbox' && 
      !target.hasAttribute('data-column-checkbox-header')) {
    const rowId = target.getAttribute('data-row-id');
    if (target.checked) {
      selectionState.selectedRowIds.add(rowId);
    } else {
      selectionState.selectedRowIds.delete(rowId);
    }
    renderActionBar(container);
  }
});

// ✅ OBLIGATORIO: Interceptar selección masiva (header checkbox)
setTimeout(() => {
  dataTable.addEventListener('change', (e) => {
    const target = e.target;
    if (target && target.hasAttribute('data-column-checkbox-header')) {
      const columnId = target.getAttribute('data-column-checkbox-header');
      if (columnId === 'checkbox' || columnId === 'checkbox-2') {
        if (target.checked) {
          rows.forEach((row) => selectionState.selectedRowIds.add(row.id));
        } else {
          selectionState.selectedRowIds.clear();
        }
        setTimeout(() => renderActionBar(container), 200);
      }
    }
  }, true); // ✅ capture: true
}, 300);

// ✅ OBLIGATORIO: Preservar Action Bar durante re-renderizados
let actionBarObserver = new MutationObserver(() => {
  const bar = container.querySelector('.ubits-data-table__action-bar');
  if (!bar) {
    setTimeout(() => renderActionBar(container), 100);
  }
});
actionBarObserver.observe(container, { childList: true, subtree: true });
```

### 🔍 **¿Por qué?**
1. **Funcionalidad completa:** El Action Bar permite realizar acciones sobre las filas seleccionadas
2. **Experiencia de usuario:** Los usuarios esperan poder interactuar con las selecciones
3. **Consistencia:** Todos los DataTables con checkboxes deben tener Action Bar
4. **Funcionalidad "Ver seleccionados":** Permite filtrar la tabla para ver solo las filas seleccionadas
5. **Acciones individuales y grupales:** Diferentes acciones según si se selecciona 1 o 2+ filas

### 📝 **Regla de Oro:**
**SIEMPRE que implementes un DataTable con `showCheckbox: true`:**

1. ✅ **Implementar Action Bar obligatoriamente**
   - El Action Bar NO está incluido automáticamente
   - Debe implementarse manualmente

2. ✅ **Rastrear selecciones con estado**
   - Usar `selectionState` para rastrear IDs de filas seleccionadas
   - Actualizar estado cuando cambian los checkboxes

3. ✅ **Interceptar checkboxes individuales y header checkbox**
   - ⚠️ **CRÍTICO:** Agregar listener en el **CONTENEDOR**, NO en el DataTable
   - Usar delegado de eventos con `capture: true`
   - El contenedor no se reemplaza, pero el DataTable sí puede ser reemplazado

4. ✅ **Implementar funcionalidad "Ver seleccionados"**
   - Botón que filtra la tabla para mostrar solo seleccionadas
   - Alternar entre vista completa y filtrada

5. ✅ **Preservar Action Bar durante re-renderizados**
   - Usar MutationObserver para detectar eliminación
   - Re-renderizar automáticamente
   - ⚠️ **CRÍTICO:** MutationObserver debe ser selectivo (solo re-renderizar si fue eliminado)

6. ✅ **Usar delegado de eventos para botones**
   - Un solo listener en el Action Bar, no listeners individuales
   - Evita duplicación cuando se reemplaza `innerHTML`

7. ✅ **Prevenir múltiples inicializaciones**
   - Usar bandera `data-action-bar-initialized`
   - Guardar referencias a handlers para evitar duplicación

8. ✅ **NO actualizar tabla innecesariamente**
   - Solo actualizar si estaba filtrada
   - Evitar re-renderizados que causen pérdida de listeners

9. ✅ **Revisar Storybook antes de implementar**
   - Consultar `DataTable.stories.ts` para ver implementación correcta
   - Seguir el mismo patrón y estructura

### 🔗 **Referencias:**
- **Guía de implementación:** `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md` ⭐ **OBLIGATORIO LEER**
- **Análisis detallado:** `docs/guias/analisis/ANALISIS-ERROR-NO-IMPLEMENTAR-ACTION-BAR-DATATABLE.md` ⭐ **OBLIGATORIO LEER**
- **Problemas de implementación:** `docs/guias/analisis/ANALISIS-ERROR-ACTION-BAR-DATATABLE-PROBLEMAS-IMPLEMENTACION.md` ⭐ **OBLIGATORIO LEER** (problemas encontrados y soluciones)
- **Storybook DataTable:** `vendor/ubits/packages/storybook/stories/DataTable.stories.ts` (líneas 1660-1880)
- **CSS Action Bar:** `vendor/ubits/packages/components/data-table/src/styles/data-table.css` (líneas 19-27)
- **Análisis de error header checkbox:** `docs/guias/analisis/ANALISIS-ERROR-HEADER-CHECKBOX-DATATABLE.md`

---

**Última actualización:** Diciembre 2024  
**Versión:** 2.2.0

