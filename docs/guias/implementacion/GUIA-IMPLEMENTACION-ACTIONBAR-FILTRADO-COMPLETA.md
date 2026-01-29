# 📚 Guía Completa: Implementación del ActionBar con Filtrado en DataTable

> **⚠️ CRÍTICO:** Esta guía documenta TODOS los problemas encontrados y las soluciones implementadas para que **la próxima vez se haga bien desde el principio**.

---

## 🎯 Objetivo

Implementar un ActionBar para el DataTable que:
1. ✅ Se muestre cuando hay selecciones (única o múltiple)
2. ✅ Tenga un botón "Ver seleccionados" que filtre las filas
3. ✅ El botón tenga estilos correctos cuando está activo
4. ✅ NO afecte los checkboxes del DataTable
5. ✅ Funcione correctamente sin ciclos viciosos

---

## 🚨 Problemas Encontrados y Solucionados

### **PROBLEMA #1: Ciclo Vicioso - Arreglar una Cosa y Dañar Otra**

**Síntoma:**
- Al arreglar el botón "Ver seleccionados", se dañan los checkboxes
- Al arreglar los checkboxes, el botón "Ver seleccionados" deja de funcionar

**Causa Raíz:**
```javascript
// ❌ INCORRECTO: Usar innerHTML cada vez que se renderiza
function renderActionBar(container) {
  const actionBar = container.querySelector('.ubits-data-table__action-bar');
  
  // ❌ PROBLEMA: Esto reemplaza TODO el contenido
  actionBar.innerHTML = buttonsHTML;
}
```

**Solución:**
```javascript
// ✅ CORRECTO: Actualizar solo lo necesario
function renderActionBar(container) {
  const actionBar = container.querySelector('.ubits-data-table__action-bar');
  const hasExistingContent = actionBar.children.length > 0;
  const existingBtn = actionBar.querySelector('#action-btn-view-selected');
  
  // ✅ CASO 1: Si el botón ya existe, solo actualizarlo
  if (existingBtn) {
    // Actualizar solo el botón existente (texto, icono, clase active)
    // NO usar innerHTML
    return;
  }
  
  // ✅ CASO 2: Si el ActionBar tiene contenido pero no tiene el botón
  if (hasExistingContent) {
    // Crear botón usando manipulación directa del DOM
    // NO usar innerHTML
    return;
  }
  
  // ✅ CASO 3: Solo usar innerHTML si está completamente vacío (primera vez)
  actionBar.innerHTML = buttonsHTML;
}
```

**Regla Crítica:**
- ❌ **NUNCA usar `innerHTML` si el ActionBar ya tiene contenido**
- ✅ **SIEMPRE actualizar solo el botón existente si ya existe**
- ✅ **SIEMPRE usar manipulación directa del DOM si el ActionBar tiene contenido pero no tiene el botón**

---

### **PROBLEMA #2: Filtrado No Funciona**

**Síntoma:**
- El botón "Ver seleccionados" cambia el texto pero no filtra las filas
- Solo hay un `TODO: Implementar filtrado de filas`

**Causa Raíz:**
```javascript
// ❌ INCORRECTO: No guardar la instancia completa
window.createDataTable({ /* opciones */ });

// Guardar solo el elemento DOM (NO tiene método update)
window._encuestasDataTableInstance = container.querySelector('.ubits-data-table');

// ❌ INCORRECTO: No implementar el filtrado
function toggleViewSelected(container) {
  selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
  renderActionBar(container);
  // TODO: Implementar filtrado de filas  // ❌ NUNCA se implementa
}
```

**Solución:**
```javascript
// ✅ CORRECTO: Guardar instancia completa y datos originales
let encuestasDataOriginal = [];

// Crear DataTable
const dataTableInstance = window.createDataTable({
  containerId: 'encuestas-table-container',
  columns: [ /* ... */ ],
  rows: rows,
  // ... otras opciones
});

// ⚠️ CRÍTICO: Guardar datos originales ANTES de cualquier filtrado
encuestasDataOriginal = rows;

// ⚠️ CRÍTICO: Guardar instancia completa (con método update)
window._encuestasDataTableInstance = dataTableInstance;

// ✅ CORRECTO: Implementar filtrado completo
function toggleViewSelected(container) {
  if (isToggling) return; // Prevenir múltiples llamadas
  isToggling = true;
  
  selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
  
  // ⚠️ CRÍTICO: Filtrar filas usando dataTableInstance.update()
  const dataTableInstance = window._encuestasDataTableInstance;
  if (dataTableInstance && dataTableInstance.update && encuestasDataOriginal) {
    if (selectionState.viewSelectedActive) {
      // Filtrar solo las filas seleccionadas
      const filteredRows = encuestasDataOriginal.filter((row) => 
        selectionState.selectedRowIds.has(row.id)
      );
      dataTableInstance.update({ rows: filteredRows });
    } else {
      // Restaurar todas las filas originales
      dataTableInstance.update({ rows: encuestasDataOriginal });
    }
  }
  
  renderActionBar(container);
  
  setTimeout(() => {
    isToggling = false;
  }, 100);
}
```

**Regla Crítica:**
- ✅ **SIEMPRE guardar la instancia completa del DataTable:** `const dataTableInstance = window.createDataTable({...})`
- ✅ **SIEMPRE guardar los datos originales:** `encuestasDataOriginal = rows`
- ✅ **SIEMPRE usar `dataTableInstance.update({ rows: filteredRows })` para filtrar**
- ❌ **NUNCA guardar solo el elemento DOM:** NO tiene método `update()`

---

### **PROBLEMA #3: Botón "Ver Seleccionados" Sin Estilos Activos**

**Síntoma:**
- El botón no muestra los estilos activos cuando está activo
- No tiene el fondo azul claro ni el texto/icono azul

**Causa Raíz:**
```javascript
// ❌ INCORRECTO: No agregar ID al botón
renderBtn({
  variant: 'secondary',
  size: 'sm',
  text: viewSelectedText,
  icon: viewSelectedIcon,
  active: isViewSelectedActive,
  // ❌ FALTA: attributes: { id: 'action-btn-view-selected' }
  onClick: () => toggleViewSelected(container)
})
```

**Solución:**
```javascript
// ✅ CORRECTO: Agregar ID y estilos CSS específicos
renderBtn({
  variant: 'secondary',
  size: 'sm',
  text: viewSelectedText,
  icon: viewSelectedIcon,
  active: isViewSelectedActive,
  attributes: { id: 'action-btn-view-selected' }, // ⚠️ CRÍTICO: ID necesario
  onClick: () => toggleViewSelected(container)
})

// ⚠️ CRÍTICO: Agregar estilos CSS específicos
<style>
  #encuestas-table-container #action-btn-view-selected.ubits-button--secondary.ubits-button--active {
    position: relative !important;
    background-color: transparent !important;
    color: var(--modifiers-normal-color-light-accent-brand) !important;
    border: none !important;
  }
  #encuestas-table-container #action-btn-view-selected.ubits-button--secondary.ubits-button--active::before {
    content: "" !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background-color: var(--modifiers-normal-color-light-bg-active) !important;
    border-radius: inherit !important;
    pointer-events: none !important;
    z-index: 0 !important;
  }
  #encuestas-table-container #action-btn-view-selected.ubits-button--secondary.ubits-button--active i,
  #encuestas-table-container #action-btn-view-selected.ubits-button--secondary.ubits-button--active span {
    position: relative !important;
    z-index: 1 !important;
    color: var(--modifiers-normal-color-light-accent-brand) !important;
  }
</style>
```

**Regla Crítica:**
- ✅ **SIEMPRE agregar `attributes: { id: 'action-btn-view-selected' }` al botón**
- ✅ **SIEMPRE agregar estilos CSS específicos para el botón activo**
- ✅ **SIEMPRE verificar y agregar clase `ubits-button--active` manualmente si es necesario**

---

## 📋 Checklist Completo de Implementación

### **PASO 1: Preparar Variables y Estado**

```javascript
// ⚠️ CRÍTICO: Estado de selección
const selectionState = {
  selectedRowIds: new Set(),
  viewSelectedActive: false
};

// ⚠️ CRÍTICO: Mantener referencia a datos originales
let encuestasDataOriginal = [];

// ⚠️ CRÍTICO: Flag para prevenir múltiples llamadas simultáneas
let isToggling = false;
```

### **PASO 2: Crear DataTable y Guardar Instancia**

```javascript
// ⚠️ CRÍTICO: Guardar la instancia completa (tiene método update)
const dataTableInstance = window.createDataTable({
  containerId: 'encuestas-table-container',
  columns: [ /* ... */ ],
  rows: rows,
  showCheckbox: true,
  onRowSelect: (rowId, selected) => {
    if (selected) {
      selectionState.selectedRowIds.add(rowId);
    } else {
      selectionState.selectedRowIds.delete(rowId);
    }
    renderActionBar(container);
  },
  onSelectAll: (selected) => {
    if (selected) {
      rows.forEach(row => selectionState.selectedRowIds.add(row.id));
    } else {
      selectionState.selectedRowIds.clear();
    }
    renderActionBar(container);
  }
});

// ⚠️ CRÍTICO: Guardar datos originales ANTES de cualquier filtrado
encuestasDataOriginal = rows;

// ⚠️ CRÍTICO: Guardar instancia completa (con método update)
window._encuestasDataTableInstance = dataTableInstance;
```

### **PASO 3: Implementar renderActionBar (Sin Ciclo Vicioso)**

```javascript
function renderActionBar(container) {
  const header = container.querySelector('.ubits-data-table__header');
  if (!header) return;
  
  let actionBar = container.querySelector('.ubits-data-table__action-bar');
  
  // Crear ActionBar si no existe
  if (!actionBar) {
    actionBar = document.createElement('div');
    actionBar.className = 'ubits-data-table__action-bar';
    actionBar.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: var(--ubits-spacing-xs, 4px);
      padding: var(--ubits-spacing-sm, 8px) 0;
      background-color: var(--ubits-bg-1);
    `;
    header.insertAdjacentElement('afterend', actionBar);
  }
  
  const selectedCount = selectionState.selectedRowIds.size;
  
  // Ocultar si no hay selecciones
  if (selectedCount === 0) {
    actionBar.style.display = 'none';
    return;
  }
  
  // Mostrar cuando hay selecciones
  actionBar.style.display = 'flex';
  
  const isViewSelectedActive = selectionState.viewSelectedActive;
  const viewSelectedText = isViewSelectedActive
    ? `Dejar de ver seleccionados (${selectedCount})`
    : `Ver seleccionados (${selectedCount})`;
  const viewSelectedIcon = isViewSelectedActive ? 'eye-slash' : 'eye';
  
  // ⚠️ CRÍTICO: Verificar si el ActionBar ya tiene contenido
  const hasExistingContent = actionBar.children.length > 0;
  const existingBtn = actionBar.querySelector('#action-btn-view-selected');
  
  // ✅ CASO 1: Si el botón ya existe, solo actualizarlo
  if (existingBtn) {
    const iconEl = existingBtn.querySelector('i');
    const textEl = existingBtn.querySelector('span');
    
    if (iconEl) iconEl.className = `far fa-${viewSelectedIcon}`;
    if (textEl) textEl.textContent = viewSelectedText;
    
    if (isViewSelectedActive) {
      existingBtn.classList.add('ubits-button--active');
    } else {
      existingBtn.classList.remove('ubits-button--active');
    }
    
    // Remover y re-agregar listener
    if (existingBtn._actionBarClickHandler) {
      existingBtn.removeEventListener('click', existingBtn._actionBarClickHandler);
    }
    
    const clickHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleViewSelected(container);
    };
    existingBtn.addEventListener('click', clickHandler);
    existingBtn._actionBarClickHandler = clickHandler;
    
    return; // ⚠️ CRÍTICO: Salir temprano para no usar innerHTML
  }
  
  // ✅ CASO 2: Si el ActionBar tiene contenido pero no tiene el botón
  if (hasExistingContent) {
    const btn = document.createElement('button');
    btn.id = 'action-btn-view-selected';
    btn.className = `ubits-button ubits-button--secondary ubits-button--sm${isViewSelectedActive ? ' ubits-button--active' : ''}`;
    
    const icon = document.createElement('i');
    icon.className = `far fa-${viewSelectedIcon}`;
    btn.appendChild(icon);
    
    const span = document.createElement('span');
    span.textContent = viewSelectedText;
    btn.appendChild(span);
    
    const clickHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleViewSelected(container);
    };
    btn.addEventListener('click', clickHandler);
    btn._actionBarClickHandler = clickHandler;
    
    actionBar.insertBefore(btn, actionBar.firstChild);
    return; // ⚠️ CRÍTICO: Salir temprano para no usar innerHTML
  }
  
  // ✅ CASO 3: Solo usar innerHTML si está completamente vacío (primera vez)
  // ... generar buttonsHTML y usar innerHTML ...
  actionBar.innerHTML = buttonsHTML;
  
  // Adjuntar listeners después de innerHTML...
}
```

### **PASO 4: Implementar toggleViewSelected (Con Filtrado)**

```javascript
function toggleViewSelected(container) {
  // ⚠️ CRÍTICO: Prevenir múltiples llamadas simultáneas
  if (isToggling) {
    console.warn('⚠️ toggleViewSelected ya está en ejecución, ignorando llamada duplicada');
    return;
  }
  
  isToggling = true;
  selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
  
  // ⚠️ CRÍTICO: Filtrar filas usando dataTableInstance.update()
  const dataTableInstance = window._encuestasDataTableInstance;
  if (dataTableInstance && dataTableInstance.update && encuestasDataOriginal) {
    if (selectionState.viewSelectedActive) {
      // Filtrar solo las filas seleccionadas
      const filteredRows = encuestasDataOriginal.filter((row) => 
        selectionState.selectedRowIds.has(row.id)
      );
      console.log('📊 [ActionBar] Filtrando filas. Mostrando solo seleccionadas:', filteredRows.length);
      dataTableInstance.update({ rows: filteredRows });
    } else {
      // Restaurar todas las filas originales
      console.log('📊 [ActionBar] Restaurando todas las filas:', encuestasDataOriginal.length);
      dataTableInstance.update({ rows: encuestasDataOriginal });
    }
  } else {
    console.warn('⚠️ DataTable instance no disponible para filtrar');
  }
  
  renderActionBar(container);
  
  // ⚠️ CRÍTICO: Liberar el flag después de un breve delay
  setTimeout(() => {
    isToggling = false;
  }, 100);
}
```

### **PASO 5: Agregar Estilos CSS para Botón Activo**

```css
/* ⚠️ CRÍTICO: Estilos específicos para el botón activo */
#encuestas-table-container #action-btn-view-selected.ubits-button--secondary.ubits-button--active {
  position: relative !important;
  background-color: transparent !important;
  color: var(--modifiers-normal-color-light-accent-brand) !important;
  border: none !important;
}

#encuestas-table-container #action-btn-view-selected.ubits-button--secondary.ubits-button--active::before {
  content: "" !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background-color: var(--modifiers-normal-color-light-bg-active) !important;
  border-radius: inherit !important;
  pointer-events: none !important;
  z-index: 0 !important;
}

#encuestas-table-container #action-btn-view-selected.ubits-button--secondary.ubits-button--active i,
#encuestas-table-container #action-btn-view-selected.ubits-button--secondary.ubits-button--active span {
  position: relative !important;
  z-index: 1 !important;
  color: var(--modifiers-normal-color-light-accent-brand) !important;
}
```

---

## ✅ Checklist Final

Antes de considerar la implementación completa, verificar:

- [ ] ✅ Instancia completa del DataTable guardada: `window._encuestasDataTableInstance = dataTableInstance`
- [ ] ✅ Datos originales guardados: `encuestasDataOriginal = rows`
- [ ] ✅ Filtrado implementado en `toggleViewSelected` usando `dataTableInstance.update()`
- [ ] ✅ Flag `isToggling` para prevenir múltiples llamadas simultáneas
- [ ] ✅ `renderActionBar` NO usa `innerHTML` si el ActionBar ya tiene contenido
- [ ] ✅ Botón existente se actualiza sin usar `innerHTML`
- [ ] ✅ ID agregado al botón: `attributes: { id: 'action-btn-view-selected' }`
- [ ] ✅ Estilos CSS específicos agregados para el botón activo
- [ ] ✅ Event listeners adjuntados correctamente después de insertar HTML
- [ ] ✅ Clase `ubits-button--active` se agrega/remueve correctamente
- [ ] ✅ Action Bar se muestra con selección única (`selectedCount >= 1`)
- [ ] ✅ Checkboxes funcionan correctamente después de renderizar ActionBar

---

## 🔗 Referencias

- **Guía de errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
  - ERROR CRÍTICO #49: SearchButton - Botón de Cerrar Fuera del Input
  - ERROR CRÍTICO #50: Action Bar No Aparece con Selección Única
  - ERROR CRÍTICO #51: Botón "Ver Seleccionados" - Estilos Incorrectos en Modo Activo
  - ERROR CRÍTICO #52: Ciclo Vicioso - Arreglar una Cosa y Dañar Otra
  - ERROR CRÍTICO #53: Filtrado de Filas No Funciona
  - ERROR CRÍTICO #54: Múltiples Llamadas Simultáneas
- **Checklist obligatorio:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
- **Guía de Action Bar:** `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md`

---

**Última actualización:** Enero 2025  
**Versión:** 1.0.0

