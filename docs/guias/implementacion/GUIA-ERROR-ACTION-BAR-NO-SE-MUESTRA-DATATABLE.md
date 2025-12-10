# 🔍 Guía: Error - Action Bar No Se Muestra en DataTable con Checkboxes

## ❌ PROBLEMA IDENTIFICADO

Al implementar un DataTable con `showCheckbox: true`, **la Action Bar no se muestra** cuando se seleccionan items, causando:

1. **Action Bar no visible:** La barra de acciones no aparece cuando hay filas seleccionadas
2. **Funcionalidad incompleta:** Los usuarios no pueden realizar acciones sobre las filas seleccionadas
3. **Experiencia de usuario deficiente:** No hay feedback visual cuando se seleccionan items

---

## 🎯 CAUSA RAÍZ DEL ERROR

### **Error Principal: Problemas de Scope y Timing**

**Problema 1: Variables en Scope Incorrecto**
- `selectionState`, `renderActionBar` y `generateItems` estaban definidos dentro de `initEncuestasDataTable()`
- Los listeners de eventos necesitaban acceder a estas variables pero no podían porque estaban en scope local
- Cuando se ejecutaban los listeners, las variables no estaban disponibles

**Problema 2: Listeners Configurados Antes del Renderizado**
- Los listeners se configuraban inmediatamente después de crear el DataTable
- Los checkboxes se crean dinámicamente después del renderizado
- Los listeners no capturaban los eventos porque se configuraron antes de que existieran los checkboxes

**Problema 3: Action Bar No Visible por CSS**
- La Action Bar se creaba pero no se mostraba correctamente
- Faltaban estilos para asegurar visibilidad cuando hay selecciones
- No se configuraban correctamente `display`, `visibility`, `height` y `padding`

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **1. Variables en Scope de Script (No Dentro de Función)**

```javascript
// ⚠️ CRÍTICO: Estado y funciones del Action Bar deben estar en scope de script
// para que los listeners puedan acceder a ellos
let selectionState = null;
let renderActionBar = null;
let generateItems = null;

function initEncuestasDataTable() {
  // ... código de inicialización ...
  
  // Asignar a variables en scope de script
  if (!generateItems) {
    generateItems = () => {
      // ... código de generación ...
    };
  }
  
  if (!selectionState) {
    selectionState = {
      selectedRowIds: new Set(),
      viewSelectedActive: false
    };
  }
  
  if (!renderActionBar) {
    renderActionBar = (container) => {
      // ... código de renderizado ...
    };
  }
}
```

**⚠️ CRÍTICO:**
- Las variables deben estar en el **scope del script**, no dentro de la función
- Los listeners necesitan acceder a estas variables cuando se ejecutan
- Usar `if (!variable)` para evitar sobrescribir si ya están definidas

---

### **2. Configurar Listeners DESPUÉS del Renderizado**

```javascript
// ⚠️ CRÍTICO: Configurar listeners DESPUÉS de que el DataTable se renderice
// Esperar un momento para asegurar que los checkboxes estén en el DOM
setTimeout(() => {
  console.log('🔍 [Encuestas] Configurando listeners después de renderizado...');
  
  // Verificar que hay checkboxes en el DOM
  const checkboxes = tableContainer.querySelectorAll('input[type="checkbox"]');
  console.log('   📊 Checkboxes encontrados en DOM:', checkboxes.length);
  
  // Listener para checkboxes (individuales y header)
  tableContainer.addEventListener('change', (e) => {
    const target = e.target;
    
    // Verificar si es un checkbox
    if (!target || target.type !== 'checkbox') return;
    
    // ... lógica de selección ...
    
    // Re-renderizar Action Bar
    if (renderActionBar) {
      renderActionBar(tableContainer);
    }
  }, true); // ✅ CRÍTICO: Usar capture: true
  
  console.log('✅ [Encuestas] Listener de checkboxes configurado');
}, 500); // Esperar 500ms después de crear el DataTable
```

**⚠️ CRÍTICO:**
- Usar `setTimeout()` para configurar listeners **después** del renderizado
- Verificar que los checkboxes existan en el DOM antes de configurar listeners
- Usar `capture: true` para capturar eventos antes que otros listeners

---

### **3. Estilos CSS Completos para Action Bar**

```javascript
// Crear Action Bar con estilos completos
actionBar.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--ubits-spacing-xs, 8px);
  padding: var(--ubits-spacing-sm, 12px) var(--ubits-spacing-md, 16px);
  background-color: var(--ubits-bg-1, #ffffff);
  border-top: 1px solid var(--ubits-border-color, #e5e7eb);
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
  position: relative;
`;

// Ocultar cuando no hay selecciones
if (selectedCount === 0) {
  actionBar.style.display = 'none';
  actionBar.style.visibility = 'hidden';
  actionBar.style.height = '0';
  actionBar.style.padding = '0';
  actionBar.style.margin = '0';
}

// Mostrar cuando hay selecciones
if (selectedCount > 0) {
  actionBar.style.display = 'flex';
  actionBar.style.visibility = 'visible';
  actionBar.style.height = 'auto';
  actionBar.style.padding = 'var(--ubits-spacing-sm, 12px) var(--ubits-spacing-md, 16px)';
  actionBar.style.margin = '0';
}
```

**⚠️ CRÍTICO:**
- Configurar **todos** los estilos necesarios: `display`, `visibility`, `height`, `padding`, `margin`
- Asegurar que `width: 100%` y `box-sizing: border-box` para layout correcto
- Configurar `z-index` y `position` si es necesario para que esté visible

---

### **4. Insertar Action Bar en el Lugar Correcto**

```javascript
// Insertar después del header, antes del scrollable container
const scrollableContainer = dataTableContainer.querySelector('.ubits-data-table__scrollable-container');
if (scrollableContainer) {
  scrollableContainer.insertAdjacentElement('beforebegin', actionBar);
  console.log('✅ [Encuestas] Action Bar insertado antes del scrollable container');
} else {
  header.insertAdjacentElement('afterend', actionBar);
  console.log('✅ [Encuestas] Action Bar insertado después del header');
}
```

**⚠️ CRÍTICO:**
- Insertar **después del header** y **antes del scrollable container**
- Esto asegura que la Action Bar esté visible y en el orden correcto
- Usar `insertAdjacentElement('beforebegin')` para insertar antes del scrollable container

---

## 📋 CHECKLIST OBLIGATORIO

Al implementar Action Bar en DataTable con checkboxes:

### **Scope de Variables:**
- [ ] **Variables en scope de script:** `selectionState`, `renderActionBar`, `generateItems` deben estar fuera de la función
- [ ] **Verificar antes de asignar:** Usar `if (!variable)` para evitar sobrescribir
- [ ] **Accesibles desde listeners:** Los listeners deben poder acceder a estas variables

### **Timing de Listeners:**
- [ ] **Configurar después del renderizado:** Usar `setTimeout()` para configurar listeners después de crear el DataTable
- [ ] **Verificar checkboxes en DOM:** Confirmar que los checkboxes existen antes de configurar listeners
- [ ] **Usar capture: true:** Configurar listeners con `capture: true` para capturar eventos antes que otros

### **Estilos CSS:**
- [ ] **Estilos completos:** Configurar `display`, `visibility`, `height`, `padding`, `margin`
- [ ] **Width y box-sizing:** Configurar `width: 100%` y `box-sizing: border-box`
- [ ] **Ocultar/mostrar correctamente:** Configurar todos los estilos al ocultar y mostrar

### **Posicionamiento:**
- [ ] **Insertar en lugar correcto:** Después del header, antes del scrollable container
- [ ] **Verificar estructura:** Confirmar que el Action Bar está en el lugar correcto del DOM

---

## 🔍 ESTRUCTURA CORRECTA DEL DOM

```
<div id="encuestas-table-container">
  <div class="ubits-data-table__container">
    <div class="ubits-data-table__header">
      <!-- Header con título, contador, botones -->
    </div>
    <div class="ubits-data-table__action-bar">  ← ⚠️ AQUÍ DEBE ESTAR
      <!-- Botones de acción (aparece cuando hay selecciones) -->
    </div>
    <div class="ubits-data-table__scrollable-container">
      <table class="ubits-data-table">
        <!-- Tabla de datos -->
      </table>
    </div>
  </div>
</div>
```

**⚠️ CRÍTICO:**
- El Action Bar debe estar **después del header** y **antes del scrollable container**
- Debe estar dentro de `.ubits-data-table__container`
- Debe tener la clase `.ubits-data-table__action-bar`

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: Variables en Scope Local**

**Problema:**
```javascript
function initEncuestasDataTable() {
  const selectionState = { ... }; // ❌ Scope local
  const renderActionBar = (container) => { ... }; // ❌ Scope local
  
  // Los listeners no pueden acceder a estas variables
  tableContainer.addEventListener('change', (e) => {
    // ❌ selectionState no está disponible aquí
  });
}
```

**✅ SOLUCIÓN:**
```javascript
let selectionState = null; // ✅ Scope de script
let renderActionBar = null; // ✅ Scope de script

function initEncuestasDataTable() {
  if (!selectionState) {
    selectionState = { ... }; // ✅ Asignar a variable en scope de script
  }
  // ...
}
```

---

### **❌ ERROR 2: Listeners Configurados Antes del Renderizado**

**Problema:**
```javascript
window.createDataTable({ ... });

// ❌ Configurar listeners inmediatamente
tableContainer.addEventListener('change', (e) => {
  // Los checkboxes aún no existen en el DOM
});
```

**✅ SOLUCIÓN:**
```javascript
window.createDataTable({ ... });

// ✅ Configurar listeners DESPUÉS del renderizado
setTimeout(() => {
  const checkboxes = tableContainer.querySelectorAll('input[type="checkbox"]');
  console.log('Checkboxes encontrados:', checkboxes.length);
  
  tableContainer.addEventListener('change', (e) => {
    // Ahora los checkboxes existen
  }, true);
}, 500);
```

---

### **❌ ERROR 3: Action Bar No Visible por CSS**

**Problema:**
```javascript
// ❌ Solo configurar display
actionBar.style.display = 'flex';
// La Action Bar puede no ser visible si otros estilos la ocultan
```

**✅ SOLUCIÓN:**
```javascript
// ✅ Configurar todos los estilos necesarios
actionBar.style.display = 'flex';
actionBar.style.visibility = 'visible';
actionBar.style.height = 'auto';
actionBar.style.padding = 'var(--ubits-spacing-sm, 12px) var(--ubits-spacing-md, 16px)';
actionBar.style.margin = '0';
```

---

## 📚 REFERENCIAS

- **Guía completa Action Bar:** `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md`
- **Errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- **Análisis de problemas:** `docs/guias/analisis/ANALISIS-ERROR-ACTION-BAR-DATATABLE-PROBLEMAS-IMPLEMENTACION.md`
- **Código del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts`

---

## ✅ VERIFICACIÓN

Después de implementar la solución, verificar en los logs:

```
✅ [Encuestas] selectionState inicializado
✅ [Encuestas] renderActionBar definido
✅ [Encuestas] Listener de checkboxes configurado
🔵 [Encuestas] Checkbox cambiado: { ... }
✅ [Encuestas] Fila seleccionada: encuesta-1 Total: 1
   👁️ Action Bar visible con 1 selección(es)
✅ [Encuestas] Action Bar renderizado con 1 selección(es)
```

Si ves estos logs, la solución está funcionando correctamente.

---

**Última actualización:** 2025-12-05




