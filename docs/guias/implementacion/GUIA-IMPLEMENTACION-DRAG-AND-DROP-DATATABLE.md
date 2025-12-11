# 📋 Guía: Implementación de Drag and Drop en DataTable

## 🎯 Objetivo

Esta guía documenta cómo implementar correctamente el drag and drop (arrastrar y soltar) de **columnas** y **filas** en el componente DataTable de UBITS.

---

## 📚 Índice

1. [Habilitar Drag and Drop de Columnas](#habilitar-drag-and-drop-de-columnas)
2. [Habilitar Drag and Drop de Filas](#habilitar-drag-and-drop-de-filas)
3. [Callbacks Necesarios](#callbacks-necesarios)
4. [Problemas Comunes y Soluciones](#problemas-comunes-y-soluciones)
5. [Verificación](#verificación)
6. [Checklist de Implementación](#checklist-de-implementación)

---

## 🔄 Habilitar Drag and Drop de Columnas

### Opciones Requeridas

```javascript
const dataTableOptions = {
  // ... otras opciones ...
  
  // ✅ Habilitar drag & drop de columnas
  columnReorderable: true,
  
  // ✅ Callback cuando se reordenan las columnas
  onColumnReorder: (newColumnOrder) => {
    console.log('Nuevo orden de columnas:', newColumnOrder);
    // Actualizar estado o persistir el orden
    columnOrder = [...newColumnOrder];
  }
};
```

### Comportamiento

- El DataTable automáticamente agrega un **drag handle** (icono de 6 puntos verticales) a cada header de columna
- Los usuarios pueden arrastrar los headers para reordenar las columnas
- El callback `onColumnReorder` recibe un array con los IDs de las columnas en el nuevo orden
- **IMPORTANTE**: El `newColumnOrder` NO incluye las columnas de control (`checkbox-2`, `drag-handle`), solo las columnas reordenables

### Ejemplo Completo

```javascript
// Estado para mantener el orden de columnas
let columnOrder = [];

const dataTableOptions = {
  columns: [
    { id: 'tipo', title: 'Tipo', type: 'text' },
    { id: 'nombre', title: 'Nombre', type: 'text' },
    { id: 'estado', title: 'Estado', type: 'estado' },
    // ... más columnas
  ],
  rows: items,
  
  // ✅ Habilitar drag & drop de columnas
  columnReorderable: true,
  
  // ✅ Callback cuando se reordenan las columnas
  onColumnReorder: (newColumnOrder) => {
    console.log('🔄 [DataTable] Nuevo orden de columnas:', newColumnOrder);
    
    // Actualizar estado
    columnOrder = [...newColumnOrder];
    
    // Opcional: Persistir en localStorage
    // localStorage.setItem('column-order', JSON.stringify(newColumnOrder));
    
    // ⚠️ NOTA: El DataTable maneja el reordenamiento visualmente
    // No es necesario llamar a update() manualmente
  }
};
```

---

## 🔄 Habilitar Drag and Drop de Filas

### Opciones Requeridas

```javascript
const dataTableOptions = {
  // ... otras opciones ...
  
  // ✅ Habilitar drag & drop de filas
  rowReorderable: true,
  
  // ✅ Callback cuando se reordenan las filas
  onRowReorder: (newRowOrder) => {
    console.log('Nuevo orden de filas:', newRowOrder);
    // Actualizar estado o persistir el orden
    rowOrder = [...newRowOrder];
  }
};
```

### Comportamiento

- El DataTable automáticamente crea una columna `drag-handle` al inicio (antes del checkbox)
- Esta columna muestra un icono de 6 puntos verticales (`fa-grip-vertical`) en cada fila
- Los usuarios pueden arrastrar las filas por este icono para reordenarlas
- El callback `onRowReorder` recibe un array con los IDs de las filas en el nuevo orden

### Ejemplo Completo

```javascript
// Estado para mantener el orden de filas
let rowOrder = [];

const dataTableOptions = {
  columns: [
    // ... columnas ...
  ],
  rows: items,
  
  // ✅ Habilitar drag & drop de filas
  rowReorderable: true,
  
  // ✅ Callback cuando se reordenan las filas
  onRowReorder: (newRowOrder) => {
    console.log('🔄 [DataTable] Nuevo orden de filas:', newRowOrder);
    
    // Actualizar estado
    rowOrder = [...newRowOrder];
    
    // Opcional: Persistir en localStorage
    // localStorage.setItem('row-order', JSON.stringify(newRowOrder));
    
    // Opcional: Actualizar el array de items según el nuevo orden
    // const reorderedItems = newRowOrder.map(id => 
    //   items.find(item => item.id === id)
    // ).filter(Boolean);
    // items = reorderedItems;
  }
};
```

---

## 📞 Callbacks Necesarios

### `onColumnReorder`

**Parámetros:**
- `newColumnOrder: string[]` - Array de IDs de columnas en el nuevo orden

**Características:**
- Se ejecuta después de que el usuario suelta una columna en su nueva posición
- El array NO incluye columnas de control (`checkbox-2`, `drag-handle`)
- El DataTable ya ha actualizado visualmente el orden antes de llamar al callback

**Ejemplo:**
```javascript
onColumnReorder: (newColumnOrder) => {
  console.log('Columnas reordenadas:', newColumnOrder);
  // newColumnOrder = ['tipo', 'nombre', 'estado', ...]
  // NO incluye 'checkbox-2' ni 'drag-handle'
}
```

### `onRowReorder`

**Parámetros:**
- `newRowOrder: (string | number)[]` - Array de IDs de filas en el nuevo orden

**Características:**
- Se ejecuta después de que el usuario suelta una fila en su nueva posición
- El array incluye TODOS los IDs de las filas en el nuevo orden
- El DataTable ya ha actualizado visualmente el orden antes de llamar al callback

**Ejemplo:**
```javascript
onRowReorder: (newRowOrder) => {
  console.log('Filas reordenadas:', newRowOrder);
  // newRowOrder = [1, 2, 3, 4, ...] o ['id-1', 'id-2', ...]
}
```

---

## ⚠️ Problemas Comunes y Soluciones

### ❌ Problema 1: El drag handle de filas no aparece

**Síntomas:**
- `rowReorderable: true` está configurado
- No se ve el icono de 6 puntos verticales en las filas

**Causa:**
- CSS está ocultando la columna `drag-handle` o el elemento `.ubits-data-table__row-drag-handle`

**Solución:**
```css
/* ❌ INCORRECTO: Ocultar la celda drag-handle */
#encuestas-table-container .ubits-data-table__cell--drag-handle {
    display: none !important;
}

/* ✅ CORRECTO: Comentar o eliminar la regla CSS */
/* #encuestas-table-container .ubits-data-table__cell--drag-handle {
    display: none !important;
} */
```

**Verificación:**
- Inspeccionar el DOM y buscar elementos con clase `ubits-data-table__cell--drag-handle`
- Verificar que no tengan `display: none` aplicado

---

### ❌ Problema 2: El drag handle de columnas no aparece

**Síntomas:**
- `columnReorderable: true` está configurado
- No se ve el icono de 6 puntos verticales en los headers

**Causa:**
- CSS está ocultando el elemento `.ubits-data-table__column-drag-handle`

**Solución:**
```css
/* ❌ INCORRECTO: Ocultar el drag handle de columnas */
#encuestas-table-container .ubits-data-table__column-drag-handle {
    display: none !important;
}

/* ✅ CORRECTO: Comentar o eliminar la regla CSS */
/* #encuestas-table-container .ubits-data-table__column-drag-handle {
    display: none !important;
} */
```

**Verificación:**
- Inspeccionar los headers y buscar elementos con clase `ubits-data-table__column-drag-handle`
- Verificar que no tengan `display: none` aplicado

---

### ❌ Problema 3: Desalineamiento después de reordenar columnas

**Síntomas:**
- Después de reordenar columnas, los headers no coinciden con las celdas
- El checkbox header muestra el contenido de otra columna

**Causa:**
- Bug conocido en el componente DataTable donde el reordenamiento no se aplica correctamente a las celdas

**Solución Temporal:**
```css
/* ✅ FIX: Asegurar que la tabla use border-collapse para alineación correcta */
#encuestas-table-container .ubits-data-table table {
    border-collapse: collapse !important;
    width: 100% !important;
    table-layout: auto !important;
}

/* ✅ FIX: Asegurar que headers y cells tengan el mismo ancho y padding */
#encuestas-table-container .ubits-data-table__thead th,
#encuestas-table-container .ubits-data-table__tbody td {
    box-sizing: border-box !important;
    vertical-align: middle !important;
}

/* ✅ FIX: Asegurar que las columnas de control tengan el mismo ancho en header y cell */
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

**Solución Permanente:**
- Reportar el bug al equipo de UBITS
- Considerar deshabilitar temporalmente el drag & drop de columnas si el problema persiste

---

### ❌ Problema 4: El callback no se ejecuta

**Síntomas:**
- El drag and drop funciona visualmente
- Pero el callback `onColumnReorder` o `onRowReorder` no se ejecuta

**Causa:**
- El callback no está definido o tiene un error de sintaxis
- El DataTable no está recibiendo el callback correctamente

**Solución:**
```javascript
// ✅ Verificar que el callback esté definido correctamente
const dataTableOptions = {
  // ... otras opciones ...
  
  columnReorderable: true,
  onColumnReorder: (newColumnOrder) => {
    console.log('🔄 [DataTable] onColumnReorder ejecutado:', newColumnOrder);
    // Tu lógica aquí
  },
  
  rowReorderable: true,
  onRowReorder: (newRowOrder) => {
    console.log('🔄 [DataTable] onRowReorder ejecutado:', newRowOrder);
    // Tu lógica aquí
  }
};

// ✅ Verificar antes de crear el DataTable
console.log('🔵 [DataTable] columnReorderable:', dataTableOptions.columnReorderable);
console.log('🔵 [DataTable] rowReorderable:', dataTableOptions.rowReorderable);
console.log('🔵 [DataTable] onColumnReorder existe:', typeof dataTableOptions.onColumnReorder);
console.log('🔵 [DataTable] onRowReorder existe:', typeof dataTableOptions.onRowReorder);
```

---

## ✅ Verificación

### Verificar Drag and Drop de Columnas

1. **Verificar que el drag handle aparece en los headers:**
   ```javascript
   const headers = document.querySelectorAll('.ubits-data-table__column-drag-handle');
   console.log('Drag handles de columnas encontrados:', headers.length);
   ```

2. **Verificar que el callback se ejecuta:**
   - Abrir la consola del navegador
   - Arrastrar una columna
   - Verificar que aparece el log del callback

3. **Verificar el orden después del reordenamiento:**
   ```javascript
   onColumnReorder: (newColumnOrder) => {
     console.log('🔄 [DataTable] Nuevo orden:', newColumnOrder);
     console.log('🔄 [DataTable] Orden anterior:', columnOrder);
     
     // Verificar que el orden cambió
     if (JSON.stringify(newColumnOrder) !== JSON.stringify(columnOrder)) {
       console.log('✅ El orden cambió correctamente');
     }
   }
   ```

### Verificar Drag and Drop de Filas

1. **Verificar que la columna drag-handle existe:**
   ```javascript
   const dragHandleCells = document.querySelectorAll('.ubits-data-table__cell--drag-handle');
   console.log('Celdas drag-handle encontradas:', dragHandleCells.length);
   ```

2. **Verificar que el icono aparece en cada fila:**
   ```javascript
   const dragHandles = document.querySelectorAll('.ubits-data-table__row-drag-handle');
   console.log('Drag handles de filas encontrados:', dragHandles.length);
   ```

3. **Verificar que el callback se ejecuta:**
   - Abrir la consola del navegador
   - Arrastrar una fila
   - Verificar que aparece el log del callback

4. **Verificar el orden después del reordenamiento:**
   ```javascript
   onRowReorder: (newRowOrder) => {
     console.log('🔄 [DataTable] Nuevo orden:', newRowOrder);
     console.log('🔄 [DataTable] Orden anterior:', rowOrder);
     
     // Verificar que el orden cambió
     if (JSON.stringify(newRowOrder) !== JSON.stringify(rowOrder)) {
       console.log('✅ El orden cambió correctamente');
     }
   }
   ```

---

## 📋 Checklist de Implementación

### Para Drag and Drop de Columnas

- [ ] Configurar `columnReorderable: true` en `dataTableOptions`
- [ ] Implementar callback `onColumnReorder` con lógica para actualizar estado
- [ ] Verificar que no hay CSS ocultando `.ubits-data-table__column-drag-handle`
- [ ] Verificar que el drag handle aparece en los headers
- [ ] Probar arrastrar una columna y verificar que el callback se ejecuta
- [ ] Verificar que el orden se actualiza correctamente
- [ ] (Opcional) Persistir el orden en localStorage o backend

### Para Drag and Drop de Filas

- [ ] Configurar `rowReorderable: true` en `dataTableOptions`
- [ ] Implementar callback `onRowReorder` con lógica para actualizar estado
- [ ] Verificar que no hay CSS ocultando `.ubits-data-table__cell--drag-handle` o `.ubits-data-table__row-drag-handle`
- [ ] Verificar que la columna `drag-handle` aparece al inicio (antes del checkbox)
- [ ] Verificar que el icono de 6 puntos aparece en cada fila
- [ ] Probar arrastrar una fila y verificar que el callback se ejecuta
- [ ] Verificar que el orden se actualiza correctamente
- [ ] (Opcional) Persistir el orden en localStorage o backend
- [ ] (Opcional) Actualizar el array de items según el nuevo orden

---

## 🔍 Debugging

### Logs Recomendados

```javascript
// En onColumnReorder
onColumnReorder: (newColumnOrder) => {
  console.log('🔄 [DataTable] ========== onColumnReorder ==========');
  console.log('🔄 [DataTable] Nuevo orden de columnas recibido:', newColumnOrder);
  console.log('🔄 [DataTable] Nuevo orden (detalle):', newColumnOrder.map((id, idx) => `${idx}: ${id}`));
  console.log('🔄 [DataTable] Orden anterior (si existe):', columnOrder);
  console.log('🔄 [DataTable] Columnas definidas:', dataTableOptions.columns.map(c => ({ id: c.id, title: c.title })));
  
  // Verificar columnas de control
  const hasCheckbox = newColumnOrder.some(id => id === 'checkbox' || id.startsWith('checkbox-'));
  const hasDragHandle = newColumnOrder.some(id => id === 'drag-handle');
  console.log('🔄 [DataTable] Columnas de control en newColumnOrder:', {
    hasCheckbox,
    hasDragHandle,
    checkboxId: newColumnOrder.find(id => id === 'checkbox' || id.startsWith('checkbox-')),
    dragHandleIndex: newColumnOrder.findIndex(id => id === 'drag-handle')
  });
  
  // Actualizar estado
  columnOrder = [...newColumnOrder];
}
```

```javascript
// En onRowReorder
onRowReorder: (newRowOrder) => {
  console.log('🔄 [DataTable] ========== onRowReorder ==========');
  console.log('🔄 [DataTable] Nuevo orden de filas recibido:', newRowOrder);
  console.log('🔄 [DataTable] Orden anterior (si existe):', rowOrder);
  console.log('🔄 [DataTable] Total de items:', items.length);
  
  // Verificar si el orden coincide con los items
  const itemIds = items.map(item => item.id);
  const missingItems = itemIds.filter(id => !newRowOrder.includes(id));
  const extraItems = newRowOrder.filter(id => !itemIds.includes(id));
  
  if (missingItems.length > 0) {
    console.warn('⚠️ [DataTable] Items faltantes en el nuevo orden:', missingItems);
  }
  if (extraItems.length > 0) {
    console.warn('⚠️ [DataTable] Items extra en el nuevo orden:', extraItems);
  }
  
  // Actualizar estado
  rowOrder = [...newRowOrder];
}
```

---

## 📝 Notas Importantes

1. **Columnas de Control:**
   - El DataTable automáticamente crea columnas de control (`drag-handle`, `checkbox-2`) cuando están habilitadas
   - Estas columnas NO aparecen en el `newColumnOrder` del callback `onColumnReorder`
   - El `newColumnOrder` solo incluye las columnas reordenables definidas por el usuario

2. **Orden de Columnas de Control:**
   - `drag-handle` (si `rowReorderable: true`) - Primera columna
   - `checkbox-2` (si `showCheckbox !== false`) - Segunda columna (después de drag-handle)
   - Columnas del usuario - Después de las columnas de control

3. **Render Automático:**
   - El DataTable maneja el reordenamiento visualmente llamando a `render()` internamente
   - NO es necesario llamar a `dataTableInstance.update()` manualmente después del reordenamiento
   - El callback se ejecuta DESPUÉS de que el reordenamiento visual se completa

4. **Persistencia:**
   - Si necesitas persistir el orden, usa `localStorage` o envía el orden al backend
   - Al recargar la página, puedes restaurar el orden desde el almacenamiento y pasarlo al DataTable

---

## 🔗 Referencias

- **Guía de Análisis de DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
- **Guía de Implementación de DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Código fuente del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts`

---

**Última actualización:** 2025-01-XX
**Autor:** Auto (Cursor AI)












