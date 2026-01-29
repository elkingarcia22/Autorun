# 🔍 Análisis de Errores: Implementación DataTable Encuestas

## 📋 Resumen Ejecutivo

**Fecha:** 2025-01-10  
**Componente:** DataTable en módulo Encuestas  
**Problema Principal:** La tabla se ve pero sin header, múltiples errores de sintaxis y lógica durante la implementación  
**Estado:** En proceso de corrección

---

## ⚠️⚠️⚠️ ERROR CRÍTICO: NO SE USÓ EL SISTEMA PREDEFINIDO ⚠️⚠️⚠️

### **Problema Principal Identificado:**

**❌ NO se usó el sistema predefinido de planes de implementación que ya existe en el proyecto.**

El proyecto tiene **DOS sistemas predefinidos** para planes de implementación:

1. **Plan Predefinido Estático** (`DATATABLE_IMPLEMENTATION_PLAN`):
   - Ubicación: `packages/autorun-core/src/helpers/componentPlans.ts`
   - Define 10 pasos predefinidos para implementar DataTable
   - Incluye: Estructura base, columnas, datos, checkboxes, action bar, header, sorting, paginación, menús, reordenamiento

2. **Plan Automático Basado en Historias de Storybook**:
   - Sistema: `Pre-Implementation Check` add-on
   - Función: `getStoryBasedImplementationPlan()`
   - Obtiene automáticamente todas las historias del componente desde Storybook
   - Crea un plan dinámico basado en esas historias
   - Genera checklist automático para cada historia

### **Lo que se Hizo Incorrectamente:**

- ❌ **NO se consultó el plan predefinido** (`DATATABLE_IMPLEMENTATION_PLAN`)
- ❌ **NO se usó el add-on Pre-Implementation Check** para obtener plan automático
- ❌ **NO se siguió el flujo de implementación por historias**
- ❌ **Se implementó todo de golpe** sin seguir pasos incrementales
- ❌ **Se creó un plan propio** en lugar de usar el sistema existente

### **Lo que se Debería Haber Hecho:**

```typescript
// ✅ CORRECTO: Usar el sistema predefinido

// Opción 1: Usar plan predefinido estático
import { DATATABLE_IMPLEMENTATION_PLAN } from '@autorun/core/helpers/componentPlans';
const plan = DATATABLE_IMPLEMENTATION_PLAN;
// Seguir los 10 pasos definidos

// Opción 2: Usar plan automático basado en historias (RECOMENDADO)
import { getAutorunHub } from '@autorun/core';
const hub = getAutorunHub();
const preCheckAddon = hub?.getAddon('pre-implementation-check');

// El add-on automáticamente obtiene el plan cuando detecta el componente
const plan = preCheckAddon?.getStoryBasedPlan('DataTable');

// Si no existe, obtenerlo automáticamente
if (!plan) {
  const componentId = 'data-data-table'; // ID en Storybook
  const plan = await preCheckAddon?.getOrCreateStoryBasedPlan('DataTable', componentId);
}

// Implementar UNA historia a la vez
for (const step of plan.storySteps) {
  // 1. Consultar historia en Storybook
  // 2. Obtener checklist de la historia
  // 3. Implementar funcionalidad de esa historia
  // 4. Completar TODO el checklist
  // 5. Solo entonces continuar con siguiente historia
}
```

---

## 📚 SISTEMAS PREDEFINIDOS DISPONIBLES

### **1. Plan Predefinido Estático**

**Ubicación:** `packages/autorun-core/src/helpers/componentPlans.ts`

**Plan para DataTable:**
- Paso 1: Estructura Base y Contenedor (5 min)
- Paso 2: Columnas Básicas (5 min)
- Paso 3: Datos de Ejemplo (5 min)
- Paso 4: Checkboxes y Selección (10 min)
- Paso 5: Action Bar (10 min)
- Paso 6: Header Completo (10 min)
- Paso 7: Sorting (5 min)
- Paso 8: Paginación (5 min)
- Paso 9: Menús (10 min)
- Paso 10: Reordenamiento y Filas Expandibles (10 min)

**Total:** 10 pasos, 30-45 minutos estimados

### **2. Plan Automático Basado en Historias** ⭐ RECOMENDADO

**Sistema:** `Pre-Implementation Check` add-on

**Cómo Funciona:**
1. Detecta automáticamente cuando se intenta implementar un componente
2. Obtiene todas las historias del componente desde Storybook
3. Crea un plan de implementación basado en esas historias
4. Genera checklist automático para cada historia
5. Muestra el plan en la consola

**Ventajas:**
- ✅ Siempre actualizado (basado en Storybook actual)
- ✅ Incluye todas las historias disponibles
- ✅ Checklist automático por historia
- ✅ No requiere mantenimiento manual

---

## 🚨 ERRORES ADICIONALES POR NO USAR EL SISTEMA PREDEFINIDO

---

## 🚨 ERRORES ADICIONALES POR NO USAR EL SISTEMA PREDEFINIDO

### **Error 0: No Usar el Sistema Predefinido** ⚠️ CRÍTICO

**Problema:**
- Se implementó el DataTable sin usar el plan predefinido
- Se creó un plan propio en lugar de usar el sistema existente
- No se siguió el flujo de implementación por historias

**Causa Raíz:**
- No se consultó `DATATABLE_IMPLEMENTATION_PLAN` antes de implementar
- No se usó el add-on `Pre-Implementation Check` para obtener plan automático
- No se siguió la guía `GUIA-IMPLEMENTACION-AUTOMATICA-POR-HISTORIAS.md`

**Solución:**
- ✅ **SIEMPRE usar el plan predefinido** o el plan automático basado en historias
- ✅ **NO crear planes propios** - usar el sistema existente
- ✅ **Seguir el flujo de implementación por historias** (UNA historia a la vez)

---

## 🚨 ERRORES CRÍTICOS IDENTIFICADOS

### 1. **Error de Sintaxis: Variable `container` Declarada Múltiples Veces**

**Problema:**
```javascript
// ❌ ERROR: container declarado dos veces en el mismo scope
let container = document.getElementById('encuestas-table-container');
// ... más código ...
let container = document.getElementById('encuestas-table-container'); // ❌ Duplicado
```

**Causa Raíz:**
- Se intentó usar `container` como nombre de variable en múltiples lugares dentro de la misma función
- No se renombró la variable cuando se refactorizó el código
- Conflicto de nombres entre diferentes partes del código

**Solución Aplicada:**
```javascript
// ✅ CORRECTO: Usar nombres únicos y descriptivos
let tableContainer = document.getElementById('encuestas-table-container');
// ... más código ...
// Usar tableContainer consistentemente en toda la función
```

**Lección Aprendida:**
- ⚠️ **SIEMPRE usar nombres de variables únicos y descriptivos**
- ⚠️ **NO reutilizar nombres de variables en el mismo scope**
- ⚠️ **Refactorizar completamente cuando se cambia el nombre de una variable**

---

### 2. **Error de Referencia: Función `initializeEncuestasDataTable` No Definida**

**Problema:**
```javascript
// ❌ ERROR: Se llama a la función antes de que esté definida
setTimeout(() => {
  initializeEncuestasDataTable(); // ❌ ReferenceError
}, 1000);

// La función se define más abajo en el código
function initializeEncuestasDataTable() {
  // ...
}
```

**Causa Raíz:**
- El código se ejecuta en orden secuencial
- Se intentó llamar a la función antes de que el parser la haya procesado
- Múltiples puntos de inicialización sin coordinación

**Solución Aplicada:**
```javascript
// ✅ CORRECTO: Definir la función ANTES de usarla
function initializeEncuestasDataTable() {
  // ...
}

// Luego llamarla
setTimeout(() => {
  initializeEncuestasDataTable(); // ✅ Funciona
}, 1000);
```

**Lección Aprendida:**
- ⚠️ **SIEMPRE definir funciones ANTES de llamarlas**
- ⚠️ **Usar eventos personalizados para coordinar inicialización**
- ⚠️ **Verificar que las funciones existan antes de llamarlas**

---

### 3. **Error de Lógica: Código JavaScript Visible en el HTML**

**Problema:**
```html
<!-- ❌ ERROR: Código JavaScript fuera de tags <script> -->
</script>
    
    if (!originalHandleSectionChange) {
      // Este código se renderiza como texto en el HTML
    }
  </script>
```

**Causa Raíz:**
- Código JavaScript colocado fuera de tags `<script>`
- Tags `<script>` mal cerrados o mal anidados
- Código copiado/pegado sin verificar la estructura HTML

**Solución Aplicada:**
```html
<!-- ✅ CORRECTO: Todo el código JavaScript dentro de tags <script> -->
</script>

<script>
  if (!originalHandleSectionChange) {
    // Código correctamente envuelto
  }
</script>
```

**Lección Aprendida:**
- ⚠️ **SIEMPRE verificar que todo el código JavaScript esté dentro de tags `<script>`**
- ⚠️ **Verificar que los tags estén correctamente cerrados**
- ⚠️ **Usar un validador HTML antes de probar**

---

### 4. **Error de Diseño: Header Duplicado del DataTable**

**Problema:**
- El DataTable muestra dos headers: uno del DataTable y otro del ContentManager (HeaderSection)
- El ContentManager crea un HeaderSection que se muestra junto al header del DataTable

**Causa Raíz:**
- El ContentManager crea automáticamente un HeaderSection para cada sección
- No se interceptó correctamente la creación del HeaderSection
- El interceptor de `updateContent` no eliminaba el HeaderSection antes de restaurar el DataTable

**Solución Aplicada:**
```javascript
// ✅ CORRECTO: Eliminar HeaderSection ANTES de restaurar DataTable
const headerContainer = contentArea.querySelector('#header-section-container');
if (headerContainer) {
  headerContainer.remove();
}

// Verificar y eliminar headers duplicados del DataTable
const allHeaders = contentArea.querySelectorAll('.ubits-data-table__header');
if (allHeaders.length > 1) {
  // Mantener solo el último header
  for (let i = 0; i < allHeaders.length - 1; i++) {
    allHeaders[i].remove();
  }
}
```

**Lección Aprendida:**
- ⚠️ **SIEMPRE eliminar elementos no deseados ANTES de crear/restaurar componentes**
- ⚠️ **Verificar duplicados después de restaurar elementos**
- ⚠️ **Usar MutationObserver para detectar elementos duplicados dinámicamente**

---

### 5. **Error de Inicialización: DataTable No Visible**

**Problema:**
- La DataTable se inicializa pero no es visible
- El contenedor existe pero está vacío o tiene altura 0

**Causa Raíz:**
- El contenedor no tiene altura mínima suficiente
- El contenedor está oculto por CSS
- El DataTable se inicializa antes de que el contenedor esté en el DOM

**Solución Aplicada:**
```javascript
// ✅ CORRECTO: Asegurar visibilidad y altura del contenedor
tableContainer.style.display = 'flex';
tableContainer.style.visibility = 'visible';
tableContainer.style.opacity = '1';
tableContainer.style.minHeight = '400px';
```

```css
/* ✅ CORRECTO: CSS para asegurar visibilidad */
#encuestas-table-container {
    min-height: 400px !important;
    visibility: visible !important;
    opacity: 1 !important;
}
```

**Lección Aprendida:**
- ⚠️ **SIEMPRE verificar que el contenedor tenga altura mínima**
- ⚠️ **Asegurar visibilidad del contenedor antes de inicializar el componente**
- ⚠️ **Usar `!important` en CSS cuando sea necesario para sobrescribir estilos dinámicos**

---

## 📚 ESTRATEGIA GENERAL: CÓMO IMPLEMENTAR COMPONENTES UBITS CORRECTAMENTE

### **⚠️⚠️⚠️ REGLA CRÍTICA: USAR SISTEMA PREDEFINIDO ⚠️⚠️⚠️**

**ANTES de crear cualquier plan propio, DEBES:**

1. ✅ **Verificar si existe plan predefinido:**
   ```typescript
   import { DATATABLE_IMPLEMENTATION_PLAN } from '@autorun/core/helpers/componentPlans';
   // Usar este plan si existe
   ```

2. ✅ **Usar el add-on Pre-Implementation Check:**
   ```typescript
   const hub = getAutorunHub();
   const preCheckAddon = hub?.getAddon('pre-implementation-check');
   const plan = preCheckAddon?.getStoryBasedPlan('DataTable');
   // El add-on automáticamente obtiene el plan basado en historias
   ```

3. ✅ **Solo crear plan propio si NO existe ninguno de los anteriores**

---

### **FASE 1: ANÁLISIS Y PLANIFICACIÓN** ⚠️ OBLIGATORIO

#### 1.1. Consultar Storybook PRIMERO
```javascript
// ⚠️ CRÍTICO: SIEMPRE consultar Storybook antes de implementar
// 1. Navegar a Storybook en Vercel
// 2. Revisar la pestaña "Code" para ver props exactas
// 3. Revisar la pestaña "Controls" para ver todas las opciones
// 4. Guardar URL del template ANTES de navegar
// 5. Volver automáticamente al template DESPUÉS de consultar
```

#### 1.2. Analizar el Componente
- ✅ **Leer documentación completa del componente**
- ✅ **Identificar todas las props requeridas y opcionales**
- ✅ **Entender el flujo de inicialización**
- ✅ **Identificar dependencias (scripts, estilos, otros componentes)**

#### 1.3. Crear Plan Detallado
- ✅ **Listar todos los pasos necesarios**
- ✅ **Identificar puntos de integración con el sistema existente**
- ✅ **Identificar posibles conflictos (ContentManager, otros componentes)**
- ✅ **Definir estrategia de preservación de elementos dinámicos**

---

### **FASE 2: PREPARACIÓN DEL ENTORNO** ⚠️ OBLIGATORIO

#### 2.1. Verificar Dependencias
```javascript
// ⚠️ CRÍTICO: Verificar que todos los scripts estén cargados
// 1. Verificar que el script UMD del componente esté cargado
// 2. Verificar que la función de creación esté disponible
// 3. Usar eventos personalizados para coordinar carga
// 4. Implementar polling como fallback
```

#### 2.2. Preparar el Contenedor
```javascript
// ⚠️ CRÍTICO: Asegurar que el contenedor exista y sea visible
// 1. Verificar que el contenedor exista en el DOM
// 2. Si no existe, crearlo
// 3. Asegurar visibilidad (display, visibility, opacity)
// 4. Asegurar altura mínima
// 5. Limpiar contenido previo si existe
```

#### 2.3. Interceptar ContentManager
```javascript
// ⚠️ CRÍTICO: Interceptar ContentManager.updateContent
// 1. Guardar HTML del contenedor ANTES de updateContent
// 2. Llamar al método original
// 3. Restaurar el contenedor DESPUÉS de updateContent
// 4. Eliminar elementos no deseados (HeaderSection, etc.)
// 5. Reinicializar el componente si es necesario
```

---

### **FASE 3: IMPLEMENTACIÓN** ⚠️ PASO A PASO

#### 3.1. Estructura del Código
```javascript
// ✅ CORRECTO: Estructura recomendada
(function() {
  // 1. Variables globales del módulo
  let componentInitialized = false;
  let componentInstance = null;
  
  // 2. Funciones auxiliares
  function helperFunction() {
    // ...
  }
  
  // 3. Función principal de inicialización
  function initializeComponent() {
    // Verificar que no esté ya inicializado
    if (componentInitialized) {
      return;
    }
    
    // Verificar dependencias
    if (typeof window.createComponent !== 'function') {
      console.warn('Component not available');
      return;
    }
    
    // Preparar contenedor
    let container = document.getElementById('component-container');
    if (!container) {
      // Crear contenedor
    }
    
    // Limpiar contenido previo
    // ...
    
    // Crear componente
    try {
      componentInstance = window.createComponent({
        // opciones
      });
      
      componentInitialized = true;
    } catch (error) {
      console.error('Error creating component:', error);
      componentInitialized = false;
    }
  }
  
  // 4. Función de inicialización segura
  function safeInitializeComponent() {
    // Verificar módulo actual
    // Verificar que el contenedor exista
    // Verificar que el componente no esté ya inicializado
    // Llamar a initializeComponent
  }
  
  // 5. Event listeners y inicialización
  window.addEventListener('component-ready', safeInitializeComponent);
  // ...
})();
```

#### 3.2. Manejo de Errores
```javascript
// ✅ CORRECTO: Manejo robusto de errores
try {
  componentInstance = window.createComponent(options);
} catch (error) {
  console.error('❌ Error creating component:', error);
  componentInitialized = false;
  // Intentar recuperación si es posible
}
```

#### 3.3. Verificación Post-Inicialización
```javascript
// ✅ CORRECTO: Verificar que el componente se creó correctamente
if (componentInstance && componentInstance.element) {
  const isVisible = componentInstance.element.offsetHeight > 0;
  if (!isVisible) {
    console.warn('Component created but not visible');
    // Intentar corregir
  }
}
```

---

### **FASE 4: PRESERVACIÓN Y RESTAURACIÓN** ⚠️ CRÍTICO

#### 4.1. Interceptar ContentManager.updateContent
```javascript
// ✅ CORRECTO: Patrón de interceptación completo
const originalUpdateContent = window.UBITS_ContentManager.updateContent;

window.UBITS_ContentManager.updateContent = function(section, subSection) {
  // 1. Verificar si estamos en el módulo correcto
  const currentModule = document.body.getAttribute('data-module');
  if (currentModule !== 'target-module') {
    return originalUpdateContent.call(this, section, subSection);
  }
  
  // 2. Guardar estado ANTES de updateContent
  const contentArea = document.querySelector('.content-area');
  let savedContainerHTML = null;
  if (contentArea) {
    const existingContainer = contentArea.querySelector('#component-container');
    if (existingContainer) {
      savedContainerHTML = existingContainer.outerHTML;
    }
  }
  
  // 3. Llamar al método original
  const result = originalUpdateContent.call(this, section, subSection);
  
  // 4. Restaurar estado DESPUÉS de updateContent
  setTimeout(() => {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;
    
    // Restaurar contenedor
    let container = contentArea.querySelector('#component-container');
    if (!container && savedContainerHTML) {
      contentArea.insertAdjacentHTML('afterbegin', savedContainerHTML);
      container = contentArea.querySelector('#component-container');
    } else if (!container) {
      container = document.createElement('div');
      container.id = 'component-container';
      contentArea.insertAdjacentElement('afterbegin', container);
    }
    
    // Eliminar elementos no deseados
    const headerContainer = contentArea.querySelector('#header-section-container');
    if (headerContainer) headerContainer.remove();
    
    // Verificar duplicados
    const allHeaders = contentArea.querySelectorAll('.component-header');
    if (allHeaders.length > 1) {
      for (let i = 0; i < allHeaders.length - 1; i++) {
        allHeaders[i].remove();
      }
    }
    
    // Reinicializar si es necesario
    if (container && !container.querySelector('.component')) {
      componentInitialized = false;
      setTimeout(() => {
        if (typeof window.createComponent === 'function') {
          initializeComponent();
        }
      }, 200);
    }
  }, 100);
  
  return result;
};
```

#### 4.2. MutationObserver para Detección Dinámica
```javascript
// ✅ CORRECTO: MutationObserver para preservar elementos
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Detectar elementos agregados
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // Verificar si es un elemento no deseado
        if (node.id === 'header-section-container') {
          node.remove();
        }
        
        // Verificar duplicados del componente
        const componentHeaders = node.querySelectorAll?.('.component-header');
        if (componentHeaders && componentHeaders.length > 0) {
          const container = document.getElementById('component-container');
          if (container) {
            const existingHeaders = container.querySelectorAll('.component-header');
            if (existingHeaders.length > 0) {
              componentHeaders.forEach(header => header.remove());
            }
          }
        }
      }
    });
    
    // Detectar elementos eliminados
    mutation.removedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        if (node.id === 'component-container') {
          // Restaurar contenedor
          // ...
        }
      }
    });
  });
});

observer.observe(contentArea, {
  childList: true,
  subtree: true
});
```

---

## 🎯 ESTRATEGIA ESPECÍFICA: DATATABLE EN MÓDULO ENCUESTAS

### **PASO 1: ANÁLISIS DEL COMPONENTE** ⚠️ OBLIGATORIO

#### 1.1. Consultar Storybook
- ✅ Navegar a `https://ubits-storybook10.vercel.app/`
- ✅ Buscar el componente DataTable
- ✅ Revisar todas las props disponibles
- ✅ Revisar ejemplos de uso
- ✅ Identificar dependencias (scripts, estilos)

#### 1.2. Identificar Requisitos
- ✅ **Container ID:** `encuestas-table-container`
- ✅ **Script UMD:** `data-table.umd.js`
- ✅ **Función de creación:** `window.createDataTable` o `window.UBITSDataTable.createDataTable`
- ✅ **Props requeridas:** `containerId`, `columns`, `rows`
- ✅ **Props opcionales:** `header`, `showCheckbox`, `showVerticalScrollbar`, etc.

---

### **PASO 2: PREPARACIÓN DEL ENTORNO** ⚠️ OBLIGATORIO

#### 2.1. Cargar Scripts
```html
<!-- ✅ CORRECTO: Cargar script con fallback -->
<script src="../vendor/ubits/packages/components/data-table/dist/data-table.umd.js" 
        onload="console.log('✅ DataTable script cargado'); 
                if (typeof window.UBITSDataTable !== 'undefined' && 
                    typeof window.UBITSDataTable.createDataTable === 'function') { 
                  window.createDataTable = window.UBITSDataTable.createDataTable; 
                }" 
        onerror="console.error('❌ Error al cargar, intentando desde Vercel...');
                 // Fallback a Vercel
                ">
</script>
```

#### 2.2. Verificar Disponibilidad
```javascript
// ✅ CORRECTO: Polling para verificar disponibilidad
(function() {
  function checkCreateDataTable() {
    if (typeof window.createDataTable === 'function') {
      window.dispatchEvent(new CustomEvent('ubits-datatable-ready'));
    } else if (typeof window.UBITSDataTable !== 'undefined' && 
               typeof window.UBITSDataTable.createDataTable === 'function') {
      window.createDataTable = window.UBITSDataTable.createDataTable;
      window.dispatchEvent(new CustomEvent('ubits-datatable-ready'));
    } else {
      setTimeout(checkCreateDataTable, 100);
    }
  }
  setTimeout(checkCreateDataTable, 100);
})();
```

---

### **PASO 3: CREAR CONTENEDOR** ⚠️ OBLIGATORIO

#### 3.1. HTML del Contenedor
```html
<!-- ✅ CORRECTO: Contenedor en el HTML -->
<div id="encuestas-table-container"></div>
```

#### 3.2. CSS del Contenedor
```css
/* ✅ CORRECTO: CSS para asegurar visibilidad */
#encuestas-table-container {
    width: 100%;
    box-sizing: border-box;
    padding: var(--ubits-spacing-lg, 16px);
    background: var(--ubits-bg-1);
    border-radius: var(--ubits-border-radius-md, 12px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 400px !important; /* ⚠️ CRÍTICO: Altura mínima */
    visibility: visible !important; /* ⚠️ CRÍTICO: Visibilidad */
    opacity: 1 !important; /* ⚠️ CRÍTICO: Opacidad */
}
```

---

### **PASO 4: FUNCIÓN DE INICIALIZACIÓN** ⚠️ ESTRUCTURA CORRECTA

#### 4.1. Estructura Completa
```javascript
// ✅ CORRECTO: Estructura completa de inicialización
function initializeEncuestasDataTable() {
  console.log('🔵 [Encuestas DataTable] initializeEncuestasDataTable llamada');
  
  // 1. Verificar que no esté ya inicializado
  if (encuestasDataTableInitialized) {
    console.log('⚠️ [Encuestas DataTable] Ya inicializado, saltando...');
    return;
  }
  
  // 2. Verificar módulo actual
  const currentModule = document.body.getAttribute('data-module');
  if (currentModule !== 'encuestas') {
    console.warn('⚠️ [Encuestas DataTable] No es módulo encuestas, saltando...');
    return;
  }
  
  // 3. Preparar contenedor
  let tableContainer = document.getElementById('encuestas-table-container');
  if (!tableContainer) {
    console.log('⚠️ [Encuestas DataTable] Contenedor no encontrado, creando...');
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      tableContainer = document.createElement('div');
      tableContainer.id = 'encuestas-table-container';
      contentArea.insertAdjacentElement('afterbegin', tableContainer);
    } else {
      console.error('❌ [Encuestas DataTable] content-area no encontrado');
      return;
    }
  }
  
  // 4. Asegurar visibilidad
  tableContainer.style.display = 'flex';
  tableContainer.style.visibility = 'visible';
  tableContainer.style.opacity = '1';
  tableContainer.style.minHeight = '400px';
  
  // 5. Limpiar contenido previo
  const existingDataTable = tableContainer.querySelector('.ubits-data-table');
  if (existingDataTable) {
    if (encuestasDataTableInstance && typeof encuestasDataTableInstance.destroy === 'function') {
      encuestasDataTableInstance.destroy();
    }
    tableContainer.innerHTML = '';
  }
  
  // 6. Eliminar headers duplicados
  const allHeaders = tableContainer.querySelectorAll('.ubits-data-table__header');
  if (allHeaders.length > 0) {
    allHeaders.forEach(header => header.remove());
  }
  
  // 7. Preparar datos
  // ... generar datos ...
  
  // 8. Crear DataTable
  try {
    encuestasDataTableInstance = window.createDataTable({
      containerId: tableContainer.id,
      columns: [
        // ... columnas ...
      ],
      rows: encuestasData,
      // ... opciones ...
    });
    
    // 9. Guardar instancia
    window._encuestasDataTableInstance = encuestasDataTableInstance;
    encuestasDataTableInitialized = true;
    
    // 10. Configurar event listeners
    // ... listeners ...
    
    console.log('✅ [Encuestas DataTable] DataTable inicializado correctamente');
  } catch (error) {
    console.error('❌ [Encuestas DataTable] Error al crear DataTable:', error);
    encuestasDataTableInitialized = false;
  }
}
```

---

### **PASO 5: INTERCEPTAR CONTENTMANAGER** ⚠️ CRÍTICO

#### 5.1. Patrón Completo de Interceptación
```javascript
// ✅ CORRECTO: Interceptación completa de ContentManager
const originalUpdateContent = window.UBITS_ContentManager.updateContent;

window.UBITS_ContentManager.updateContent = function(section, subSection) {
  // 1. Verificar módulo
  const currentModule = document.body.getAttribute('data-module');
  if (currentModule !== 'encuestas') {
    return originalUpdateContent.call(this, section, subSection);
  }
  
  // 2. Guardar HTML del contenedor ANTES
  const contentAreaBefore = document.querySelector('.content-area');
  let savedTableContainerHTML = null;
  if (contentAreaBefore) {
    const existingTableContainer = contentAreaBefore.querySelector('#encuestas-table-container');
    if (existingTableContainer) {
      savedTableContainerHTML = existingTableContainer.outerHTML;
    }
  }
  
  // 3. Llamar al método original
  const result = originalUpdateContent.call(this, section, subSection);
  
  // 4. Restaurar DESPUÉS
  setTimeout(() => {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;
    
    // Restaurar contenedor
    let tableContainer = contentArea.querySelector('#encuestas-table-container');
    if (!tableContainer && savedTableContainerHTML) {
      contentArea.insertAdjacentHTML('afterbegin', savedTableContainerHTML);
      tableContainer = contentArea.querySelector('#encuestas-table-container');
    } else if (!tableContainer) {
      tableContainer = document.createElement('div');
      tableContainer.id = 'encuestas-table-container';
      contentArea.insertAdjacentElement('afterbegin', tableContainer);
    }
    
    // Eliminar elementos no deseados
    const headerContainer = contentArea.querySelector('#header-section-container');
    if (headerContainer) headerContainer.remove();
    
    // Verificar headers duplicados
    const allHeaders = contentArea.querySelectorAll('.ubits-data-table__header');
    if (allHeaders.length > 1) {
      for (let i = 0; i < allHeaders.length - 1; i++) {
        allHeaders[i].remove();
      }
    }
    
    // Reinicializar si es necesario
    if (tableContainer && !tableContainer.querySelector('.ubits-data-table')) {
      encuestasDataTableInitialized = false;
      setTimeout(() => {
        if (typeof window.createDataTable === 'function') {
          initializeEncuestasDataTable();
        }
      }, 200);
    }
  }, 100);
  
  return result;
};
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN CORRECTA

### **Antes de Empezar**
- [ ] **⚠️ CRÍTICO: Obtener plan predefinido o automático**
  - [ ] Verificar si existe `DATATABLE_IMPLEMENTATION_PLAN`
  - [ ] Usar add-on `Pre-Implementation Check` para obtener plan automático
  - [ ] NO crear plan propio sin verificar primero
- [ ] Consultar Storybook y documentación completa
- [ ] Identificar todas las dependencias
- [ ] Identificar puntos de integración con ContentManager

### **Preparación**
- [ ] Cargar scripts UMD con fallback
- [ ] Implementar polling para verificar disponibilidad
- [ ] Crear contenedor en HTML o verificar que exista
- [ ] Aplicar CSS para asegurar visibilidad

### **Implementación**
- [ ] Definir función de inicialización ANTES de usarla
- [ ] Usar nombres de variables únicos y descriptivos
- [ ] Verificar que el contenedor exista antes de crear componente
- [ ] Asegurar visibilidad del contenedor (display, visibility, opacity, min-height)
- [ ] Limpiar contenido previo antes de crear nuevo componente
- [ ] Manejar errores con try-catch

### **Preservación**
- [ ] Interceptar ContentManager.updateContent
- [ ] Guardar HTML del contenedor ANTES de updateContent
- [ ] Restaurar contenedor DESPUÉS de updateContent
- [ ] Eliminar elementos no deseados (HeaderSection, etc.)
- [ ] Verificar y eliminar duplicados
- [ ] Reinicializar componente si es necesario

### **Post-Implementación**
- [ ] Verificar que el componente sea visible
- [ ] Verificar que no haya errores en consola
- [ ] Probar navegación entre secciones
- [ ] Verificar que el componente se preserve correctamente

---

## 📝 NOTAS FINALES

### **Errores Más Comunes a Evitar**
1. ❌ **Declarar variables con el mismo nombre múltiples veces**
2. ❌ **Llamar funciones antes de definirlas**
3. ❌ **Código JavaScript fuera de tags `<script>`**
4. ❌ **No interceptar ContentManager.updateContent**
5. ❌ **No verificar visibilidad del contenedor**
6. ❌ **No eliminar elementos duplicados**
7. ❌ **No manejar errores con try-catch**

### **Mejores Prácticas**
1. ✅ **⚠️ CRÍTICO: Usar sistema predefinido de planes**
   - Verificar si existe plan predefinido estático
   - Usar add-on Pre-Implementation Check para plan automático
   - NO crear plan propio sin verificar primero
2. ✅ **Siempre consultar Storybook primero**
3. ✅ **Implementar UNA historia a la vez** (si es plan basado en historias)
4. ✅ **Completar TODO el checklist antes de continuar**
5. ✅ **Usar nombres de variables únicos y descriptivos**
6. ✅ **Definir funciones antes de usarlas**
7. ✅ **Interceptar ContentManager para preservar componentes**
8. ✅ **Verificar visibilidad y altura del contenedor**
9. ✅ **Eliminar elementos no deseados y duplicados**
10. ✅ **Manejar errores robustamente**
11. ✅ **Usar eventos personalizados para coordinar inicialización**

---

**Última actualización:** 2025-01-10  
**Autor:** Análisis de errores de implementación  
**Estado:** Documentación completa de errores y estrategias correctas
