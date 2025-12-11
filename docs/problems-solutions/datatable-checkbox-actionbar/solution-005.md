# Solución: Checkboxes del DataTable con Action Bar

## ✅ Implementación Completa

### 1. Estado Global Persistente

```javascript
// Al inicio del script (fuera de funciones)
window.encuestasSelectionState = window.encuestasSelectionState || {
  selectedRowIds: new Set(),
  viewSelectedActive: false
};
window.encuestasAllRows = window.encuestasAllRows || [];
```

### 2. Función renderActionBar Mejorada

```javascript
function renderActionBar(container) {
  // Buscar header o alternativa
  let header = container.querySelector('.ubits-data-table__header');
  let dataTable = container.querySelector('.ubits-data-table');
  let insertAfterElement = header;
  
  if (!header && dataTable) {
    const scrollableContainer = dataTable.querySelector('.ubits-data-table__scrollable-container');
    if (scrollableContainer) {
      insertAfterElement = scrollableContainer;
    } else {
      insertAfterElement = dataTable;
    }
  }
  
  // Usar estado global
  const currentState = window.encuestasSelectionState || selectionState;
  const selectedCount = currentState.selectedRowIds.size;
  
  if (selectedCount === 0) {
    actionBar.style.display = 'none';
    return;
  }
  
  // Crear o actualizar Action Bar
  let actionBar = container.querySelector('.ubits-data-table__action-bar');
  if (!actionBar) {
    actionBar = document.createElement('div');
    actionBar.className = 'ubits-data-table__action-bar';
    // ... estilos ...
    
    if (header) {
      insertAfterElement.insertAdjacentElement('afterend', actionBar);
    } else {
      insertAfterElement.insertAdjacentElement('beforebegin', actionBar);
    }
  }
  
  // Renderizar botones según selectedCount
  // ...
}
```

### 3. Event Listeners Mejorados

```javascript
function initActionBar(containerId, rowsData, dataTableInstance) {
  const container = document.getElementById(containerId);
  const allRows = rowsData;
  window.encuestasAllRows = allRows;
  
  // Event listeners con capture: true
  container.addEventListener('change', (event) => {
    handleCheckboxChange(event, container, allRows, dataTableInstance);
  }, { capture: true });
  
  container.addEventListener('click', (event) => {
    handleCheckboxClick(event, container, allRows, dataTableInstance);
  }, { capture: true });
}

function handleCheckboxChange(event, container, allRows, dataTableInstance) {
  let target = event.target;
  
  // Buscar input dentro de label si es necesario
  let checkboxInput = target;
  if (target.tagName === 'LABEL' || target.closest('.ubits-checkbox')) {
    checkboxInput = target.querySelector('input[type="checkbox"]') || 
                    target.closest('.ubits-checkbox')?.querySelector('input[type="checkbox"]');
    if (!checkboxInput) return;
  }
  
  // Verificar atributos de DataTable
  const hasDataTableAttrs = checkboxInput.hasAttribute('data-checkbox-button') || 
                             checkboxInput.hasAttribute('data-column-checkbox-header') ||
                             checkboxInput.hasAttribute('data-row-id');
  
  if (!hasDataTableAttrs) return;
  
  // Usar estado global
  const currentState = window.encuestasSelectionState;
  
  // Procesar selección
  if (checkboxInput.hasAttribute('data-column-checkbox-header')) {
    // Header checkbox (select all)
    if (checkboxInput.checked) {
      allRows.forEach((row) => currentState.selectedRowIds.add(row.id));
    } else {
      currentState.selectedRowIds.clear();
      currentState.viewSelectedActive = false;
    }
  } else {
    // Row checkbox
    const rowId = checkboxInput.getAttribute('data-row-id');
    if (rowId) {
      if (checkboxInput.checked) {
        currentState.selectedRowIds.add(rowId);
      } else {
        currentState.selectedRowIds.delete(rowId);
      }
      
      if (currentState.selectedRowIds.size === 0) {
        currentState.viewSelectedActive = false;
      }
    }
  }
  
  // Re-renderizar Action Bar
  renderActionBar(container);
}
```

### 4. Timing Correcto

```javascript
// Inicializar Action Bar después de que el DataTable se renderice
const dataTableInstance = window.createDataTable(/* ... */);
window.encuestasDataTableInstance = dataTableInstance;

setTimeout(() => {
  initActionBar('encuestas-data-table-container', rowsData, dataTableInstance);
}, 500);
```

## 🎯 Checklist de Implementación

- [ ] Estado global `window.encuestasSelectionState` declarado
- [ ] Estado global `window.encuestasAllRows` declarado
- [ ] `renderActionBar` busca header o alternativa (scrollable container)
- [ ] `renderActionBar` usa estado global (`window.encuestasSelectionState`)
- [ ] Event listeners usan `capture: true`
- [ ] Event listeners buscan `input` dentro de `label` si es necesario
- [ ] Event listeners verifican atributos de DataTable
- [ ] Event listeners usan estado global para actualizar selecciones
- [ ] `initActionBar` se llama después de que el DataTable se renderice
- [ ] Action Bar se inserta correctamente (después de header o antes de scrollable)

## 🔍 Debugging

### Logs Recomendados

```javascript
console.log('🔵 [Encuestas] Checkbox detectado:', {
  target: target.tagName,
  isLabel: target.tagName === 'LABEL',
  hasDataRowId: checkboxInput.hasAttribute('data-row-id'),
  checked: checkboxInput.checked,
  rowId: checkboxInput.getAttribute('data-row-id')
});

console.log('✅ [Encuestas] Fila seleccionada:', {
  rowId: rowId,
  totalSeleccionadas: currentState.selectedRowIds.size,
  allSelectedIds: Array.from(currentState.selectedRowIds)
});

console.log('🔵 [Encuestas] Mostrando Action Bar con', selectedCount, 'selecciones');
```

## 📚 Referencias

- `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md`
- `docs/problems-solutions/datatable-checkbox-actionbar/issue-005.md`








