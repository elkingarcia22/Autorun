# 🔍 Análisis: DataTable Implementado Sin Funcionalidad

## ❌ PROBLEMA IDENTIFICADO

El DataTable fue implementado con todos los elementos visuales (búsqueda, filtros, selector de columnas, checkboxes, ordenamiento, fijar columnas), pero **ninguna funcionalidad funciona realmente** porque:

1. **Los callbacks solo tienen `console.log`** - No implementan la lógica real
2. **No se actualiza el estado** - El DataTable necesita que se actualicen las opciones (filas, columnas, etc.)
3. **No se usa `update()`** - El DataTable tiene un método `update()` que debe llamarse cuando cambia el estado
4. **Faltan callbacks críticos** - Algunos callbacks no están configurados (ej: `onColumnPin`, `onColumnVisibilityChange`)

---

## 🔍 CAUSA RAÍZ

### **1. Búsqueda No Funciona**

**Problema:**
```javascript
searchButton: {
  onChange: (value) => {
    console.log('🔵 [Encuestas DataTable] Búsqueda:', value);
    // Aquí se implementará la lógica de filtrado en siguientes tareas
  }
}
```

**Causa:**
- El DataTable internamente filtra las filas usando `filterRowsBySearch` y llama a `render()`
- Pero el `searchTerm` se guarda en `(options.header as any)?.__searchTerm`
- Si no se actualiza el estado del DataTable, el filtrado no persiste

**Solución:**
- El DataTable maneja el filtrado internamente cuando se llama a `render()`
- El callback `onChange` se llama, pero el DataTable ya hace el filtrado automáticamente
- **El problema real:** El DataTable necesita que se guarde el `searchTerm` en el estado interno

### **2. Filtros No Funcionan**

**Problema:**
```javascript
filterButton: {
  onClick: (event) => {
    console.log('🔵 [Encuestas DataTable] Abrir filtros');
    // Aquí se implementará la lógica de filtros en siguientes tareas
  }
}
```

**Causa:**
- El DataTable espera que se configuren los `filters` en `filterButton.filters`
- El DataTable espera que se use `onApplyFilters` para actualizar el estado
- Sin `filters` configurados, el DataTable no muestra el drawer de filtros

**Solución:**
- Configurar `filterButton.filters` con los filtros disponibles
- Implementar `onApplyFilters` para actualizar las filas filtradas usando `update()`

### **3. Selector de Columnas No Funciona**

**Problema:**
```javascript
columnSelectorButton: {
  onClick: (event) => {
    console.log('🔵 [Encuestas DataTable] Abrir selector de columnas');
    // Aquí se implementará la lógica de selector de columnas en siguientes tareas
  }
}
```

**Causa:**
- El DataTable espera que se use `onColumnVisibilityChange` para actualizar la visibilidad
- Sin este callback, el selector de columnas no puede cambiar la visibilidad

**Solución:**
- Configurar `onColumnVisibilityChange` para actualizar `columns[].visible` y llamar a `update()`

### **4. Ordenamiento No Funciona**

**Problema:**
```javascript
onSort: (columnId, direction) => {
  console.log('🔵 [Encuestas DataTable] Ordenar por:', columnId, direction);
  // Aquí se implementará la lógica de ordenamiento en siguientes tareas
}
```

**Causa:**
- El DataTable internamente ordena las filas usando `sortColumnId` y `sortDirection`
- El DataTable llama a `render()` automáticamente después de `onSort`
- **Pero:** Si no se actualiza el estado interno del DataTable, el ordenamiento no persiste

**Solución:**
- El DataTable maneja el ordenamiento internamente
- El callback `onSort` se llama, pero el DataTable ya hace el ordenamiento automáticamente
- **El problema real:** El DataTable necesita que se actualicen las opciones con `sortColumnId` y `sortDirection`

### **5. Checkboxes No Funcionan**

**Problema:**
```javascript
onRowSelect: (selectedRows) => {
  console.log('🔵 [Encuestas DataTable] Filas seleccionadas:', selectedRows);
  // Aquí se implementará la lógica de selección en siguientes tareas
}
```

**Causa:**
- El DataTable maneja los checkboxes internamente
- El callback `onRowSelect` se llama con `(rowId, isChecked)` no con `selectedRows`
- **El problema real:** El callback tiene la firma incorrecta

**Solución:**
- Corregir la firma del callback: `onRowSelect: (rowId, isChecked) => { ... }`
- El DataTable maneja el estado de selección internamente

### **6. Fijar Columnas No Funciona**

**Problema:**
- No hay callback `onColumnPin` configurado

**Causa:**
- El DataTable espera que se use `onColumnPin` para actualizar el estado `pinned` de las columnas
- Sin este callback, fijar columnas no funciona

**Solución:**
- Configurar `onColumnPin` para actualizar `columns[].pinned` y llamar a `update()`

---

## ✅ SOLUCIÓN APLICADA

### **1. Guardar Instancia del DataTable**

El DataTable retorna una instancia con métodos `update()` y `destroy()`. Necesitamos guardar esta instancia:

```javascript
let dataTableInstance = null;

dataTableInstance = window.createDataTable({
  // ... configuración
});

// Ahora podemos usar dataTableInstance.update() para actualizar el estado
```

### **2. Implementar Búsqueda Real**

```javascript
searchButton: {
  placeholder: 'Buscar encuestas...',
  onChange: (value) => {
    // El DataTable maneja el filtrado internamente
    // Solo necesitamos guardar el searchTerm en el estado
    if (dataTableInstance) {
      dataTableInstance.update({
        header: {
          ...currentOptions.header,
          searchButton: {
            ...currentOptions.header.searchButton,
            value: value
          }
        }
      });
    }
  }
}
```

### **3. Implementar Filtros Reales**

```javascript
filterButton: {
  filters: [
    {
      id: 'tipo',
      label: 'Tipo',
      columnId: 'tipo',
      type: 'select',
      options: [
        { value: 'Cultura', label: 'Cultura' },
        { value: 'Satisfacción', label: 'Satisfacción' },
        // ... más opciones
      ]
    },
    // ... más filtros
  ],
  onApplyFilters: (filters) => {
    // Filtrar filas basándose en los filtros
    const filteredRows = filterRowsByFilters(allRows, filters, columns);
    
    if (dataTableInstance) {
      dataTableInstance.update({
        rows: filteredRows
      });
    }
  }
}
```

### **4. Implementar Selector de Columnas Real**

```javascript
onColumnVisibilityChange: (visibleColumns) => {
  // Actualizar visibilidad de columnas
  const updatedColumns = columns.map(col => ({
    ...col,
    visible: visibleColumns.includes(col.id)
  }));
  
  if (dataTableInstance) {
    dataTableInstance.update({
      columns: updatedColumns
    });
  }
}
```

### **5. Implementar Ordenamiento Real**

```javascript
onSort: (columnId, direction) => {
  // El DataTable maneja el ordenamiento internamente
  // Solo necesitamos actualizar el estado
  if (dataTableInstance) {
    dataTableInstance.update({
      sortColumnId: columnId,
      sortDirection: direction
    });
  }
}
```

### **6. Corregir Checkboxes**

```javascript
onRowSelect: (rowId, isChecked) => {
  // El DataTable maneja el estado de selección internamente
  // Solo necesitamos manejar la lógica de negocio
  console.log('🔵 [Encuestas DataTable] Fila seleccionada:', rowId, isChecked);
  
  // Obtener todas las filas seleccionadas
  const selectedRows = getSelectedRows();
  console.log('🔵 [Encuestas DataTable] Filas seleccionadas:', selectedRows);
}
```

### **7. Implementar Fijar Columnas**

```javascript
onColumnPin: (columnId, pinned) => {
  // Actualizar estado pinned de la columna
  const updatedColumns = columns.map(col => ({
    ...col,
    pinned: col.id === columnId ? pinned : col.pinned
  }));
  
  if (dataTableInstance) {
    dataTableInstance.update({
      columns: updatedColumns
    });
  }
}
```

---

## 📋 CHECKLIST PARA IMPLEMENTACIÓN

- [ ] **Guardar instancia del DataTable** - `let dataTableInstance = window.createDataTable(...)`
- [ ] **Implementar búsqueda real** - Usar `update()` con `searchButton.value`
- [ ] **Configurar filtros** - Agregar `filterButton.filters` y `onApplyFilters`
- [ ] **Implementar selector de columnas** - Configurar `onColumnVisibilityChange`
- [ ] **Implementar ordenamiento real** - Usar `update()` con `sortColumnId` y `sortDirection`
- [ ] **Corregir checkboxes** - Cambiar firma de `onRowSelect` a `(rowId, isChecked)`
- [ ] **Implementar fijar columnas** - Configurar `onColumnPin`

---

## 🔗 Referencias

- **DataTableProvider.ts:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts`
- **DataTableOptions.ts:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Guía de implementación:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`

---

**Última actualización:** Diciembre 2024









