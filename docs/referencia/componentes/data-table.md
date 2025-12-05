# 📦 DataTable

> **Componente UBITS:** `data-table`  
> **API:** `window.createDataTable()`  
> **Storybook:** https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default

## 🎯 Descripción

Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas. Componente más complejo del sistema UBITS.

## 🔗 Enlaces Rápidos

- **Storybook en Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default
- **Código fuente:** `vendor/ubits/packages/components/data-table/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/DataTable.stories.ts`

---

## 📚 Historia de Storybook

### Historia: Default

**ID en Storybook:** `data-data-table--default`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default

**Descripción:**
Tabla de datos completa con todas las funcionalidades disponibles. Esta historia incluye controles interactivos para configurar todas las opciones del DataTable.

**Características mostradas:**
- Columnas configurables (1-10 columnas)
- Tipos de columnas múltiples
- Reordenamiento de columnas y filas
- Selección múltiple con checkboxes
- Filas expandibles
- Ordenamiento
- Menú de columnas
- Menú contextual
- Header con título, contador y botones
- Paginación (opcional)

**Código de ejemplo básico:**
```javascript
window.createDataTable({
  containerId: 'table-container',
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'nombre' },
    { id: 'correo', title: 'Correo', type: 'correo' },
    { id: 'estado', title: 'Estado', type: 'estado' }
  ],
  rows: [
    {
      id: 1,
      data: {
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        estado: 'activo'
      }
    }
  ]
});
```

---

## ⚙️ Opciones y Props Completas

### Opciones Principales

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `containerId` | `string` | `undefined` | ID del contenedor donde se renderizará la tabla |
| `columns` | `TableColumn[]` | `[]` | Array de columnas de la tabla |
| `rows` | `TableRow[]` | `[]` | Array de filas de la tabla |
| `columnReorderable` | `boolean` | `true` | Permite reordenar columnas mediante drag & drop |
| `rowReorderable` | `boolean` | `true` | Permite reordenar filas mediante drag & drop |
| `rowExpandable` | `boolean` | `true` | Muestra el icono de expandir/colapsar en las filas |
| `columnSortable` | `boolean` | `true` | Muestra botones de ordenamiento en los headers |
| `showCheckbox` | `boolean` | `true` | Muestra la columna de checkbox para selección múltiple |
| `showVerticalScrollbar` | `boolean` | `false` | Muestra scrollbar vertical |
| `showHorizontalScrollbar` | `boolean` | `false` | Muestra scrollbar horizontal |
| `showColumnMenu` | `boolean` | `true` | Muestra el botón de menú (3 puntos) en los headers |
| `showContextMenu` | `boolean` | `true` | Muestra el menú contextual (click derecho) en las filas |
| `checkboxSticky` | `boolean` | `false` | Hace que la columna de checkbox sea sticky |
| `dragHandleSticky` | `boolean` | `false` | Hace que la columna de drag handle sea sticky |
| `expandSticky` | `boolean` | `false` | Hace que la columna de expand sea sticky |

### Opciones del Header

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `header.title` | `string` | `undefined` | Título del header |
| `header.counter` | `boolean` | `false` | Muestra contador de items |
| `header.displayedItems` | `number` | `undefined` | Número de items mostrados |
| `header.totalItems` | `number` | `undefined` | Número total de items |
| `header.primaryButton` | `object` | `undefined` | Botón primario del header |
| `header.secondaryButtons` | `array` | `[]` | Botones secundarios del header |
| `header.searchButton` | `boolean` | `false` | Muestra botón de búsqueda |
| `header.filterButton` | `boolean` | `false` | Muestra botón de filtros |
| `header.columnSelectorButton` | `boolean` | `false` | Muestra botón de selector de columnas |

### Opciones de Paginación

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `pagination.show` | `boolean` | `false` | Muestra el paginador |
| `pagination.currentPage` | `number` | `1` | Página actual |
| `pagination.itemsPerPage` | `number` | `10` | Items por página |
| `pagination.variant` | `'default' \| 'compact' \| 'minimal'` | `'default'` | Variante del paginador |
| `pagination.size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del paginador |

---

## 📊 Tipos de Columnas Disponibles

### Tipos Básicos

- **`nombre`**: Texto simple
- **`nombre-avatar`**: Nombre con avatar (foto, iniciales o icono)
- **`nombre-avatar-texto`**: Nombre con avatar y texto adicional
- **`correo`**: Email (puede ser clicable)
- **`fecha`**: Fecha formateada
- **`pais`**: País
- **`ciudad`**: Ciudad

### Tipos de Estado

- **`estado`**: Badge/tag de estado (activo, inactivo, pendiente, etc.)
- **`progreso`**: Barra de progreso (0-100)

### Tipos Interactivos

- **`radio`**: Radio button (selección única)
- **`toggle`**: Toggle switch (on/off)
- **`checkbox`**: Checkbox (selección múltiple)

### Tipos Especiales

- **`acciones`**: Columna de acciones (botones)
- **`drag-handle`**: Columna para mover filas (drag & drop)
- **`expand`**: Columna para expandir/colapsar filas

---

## 🎨 Opciones por Tipo de Columna

### Para `nombre-avatar` y `nombre-avatar-texto`

- **`avatarVariant`**: `'photo' | 'initials' | 'icon'`
  - `photo`: Muestra imagen
  - `initials`: Muestra iniciales
  - `icon`: Muestra icono

### Para `correo`

- **`emailClickable`**: `boolean` (default: `true`)
  - Si es `true`, el email se renderiza como link clicable
  - Si es `false`, el email se renderiza como texto normal

### Para `nombre`, `nombre-avatar`, `estado`, `fecha`, `checkbox`, `radio`

- **`editable`**: `boolean` (default: `false`)
  - Permite editar el contenido de la celda

### Para `radio`

- **`radioLabel`**: `string | boolean` (default: `false`)
  - Si es string, muestra ese texto como label
  - Si es false, no muestra label

### Para `toggle`

- **`toggleLabel`**: `string | boolean` (default: `false`)
  - Si es string, muestra ese texto como label
  - Si es false, no muestra label

### Para `checkbox`

- **`checkboxLabel`**: `string | boolean` (default: `true`)
  - Si es string, muestra ese texto como label
  - Si es true, muestra label automáticamente
  - Si es false, no muestra label

### Para cualquier columna

- **`pinned`**: `boolean` (default: `false`)
  - Si es `true`, la columna se mantiene visible al hacer scroll horizontal

---

## 🔄 Callbacks y Eventos

### Eventos de Selección

- **`onRowSelect`**: Se dispara cuando se selecciona una fila
  ```javascript
  onRowSelect: (rowId, rowData, selected) => {
    console.log('Fila seleccionada:', rowId, selected);
  }
  ```

- **`onSelectAll`**: Se dispara cuando se selecciona/deselecciona todo
  ```javascript
  onSelectAll: (selected) => {
    console.log('Seleccionar todo:', selected);
  }
  ```

### Eventos de Ordenamiento

- **`onSort`**: Se dispara cuando se ordena una columna
  ```javascript
  onSort: (columnId, direction) => {
    console.log('Ordenar por:', columnId, direction); // 'asc' | 'desc'
  }
  ```

### Eventos de Reordenamiento

- **`onColumnReorder`**: Se dispara cuando se reordena una columna
  ```javascript
  onColumnReorder: (columnId, newIndex) => {
    console.log('Columna reordenada:', columnId, newIndex);
  }
  ```

- **`onRowReorder`**: Se dispara cuando se reordena una fila
  ```javascript
  onRowReorder: (rowId, newIndex) => {
    console.log('Fila reordenada:', rowId, newIndex);
  }
  ```

### Eventos de Expansión

- **`onRowExpand`**: Se dispara cuando se expande/colapsa una fila
  ```javascript
  onRowExpand: (rowId, expanded) => {
    console.log('Fila expandida:', rowId, expanded);
  }
  ```

### Eventos de Edición

- **`onCellEdit`**: Se dispara cuando se edita una celda
  ```javascript
  onCellEdit: (rowId, columnId, newValue) => {
    console.log('Celda editada:', rowId, columnId, newValue);
  }
  ```

---

## 🎨 Tokens Utilizados

- **`--ubits-spacing-*`**: Espaciado entre elementos
- **`--ubits-border-*`**: Bordes de la tabla
- **`--ubits-bg-*`**: Fondos (light/dark mode)
- **`--ubits-fg-*`**: Colores de texto (light/dark mode)
- **`--ubits-accent-brand-static`**: Color azul primario

---

## 🚨 Errores Comunes

### Error 1: No Implementar Action Bar con Checkboxes
**Problema:** Cuando `showCheckbox: true`, no se implementa Action Bar  
**Solución:** SIEMPRE implementar Action Bar cuando hay checkboxes  
**Ver:** `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md`

### Error 2: Asumir Tipos de Columnas
**Problema:** Asumir que todas las columnas son `type: 'text'`  
**Solución:** Verificar en la imagen qué tipo de columna es (estado, progreso, fecha, etc.)  
**Ver:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`

### Error 3: No Listar Todas las Funcionalidades
**Problema:** Solo listar algunas funcionalidades, no todas  
**Solución:** Listar TODAS las funcionalidades con SÍ/NO según la imagen  
**Ver:** `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md`

### Error 4: No Configurar Altura Dinámica
**Problema:** La tabla no aprovecha el espacio vertical disponible  
**Solución:** Configurar altura dinámica después de crear la tabla  
**Ver:** `docs/guias/implementacion/GUIA-REDIMENSIONAR-DATATABLE-ESPACIO-COMPLETO.md`

---

## 📖 Referencias

- [Guía de implementación DataTable](docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md)
- [Guía Action Bar](docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md)
- [Análisis completo DataTable](docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md)
- [Análisis funcionalidades DataTable](docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md)
- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: DataTable Básico
```javascript
window.createDataTable({
  containerId: 'table-container',
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'nombre' },
    { id: 'correo', title: 'Correo', type: 'correo' },
    { id: 'estado', title: 'Estado', type: 'estado' }
  ],
  rows: [
    {
      id: 1,
      data: {
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        estado: 'activo'
      }
    }
  ]
});
```

### Ejemplo 2: DataTable con Checkboxes y Action Bar
```javascript
window.createDataTable({
  containerId: 'table-container',
  showCheckbox: true,
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'nombre' },
    { id: 'estado', title: 'Estado', type: 'estado' }
  ],
  rows: [...],
  onRowSelect: (rowId, rowData, selected) => {
    updateActionBar();
  },
  onSelectAll: (selected) => {
    updateActionBar();
  }
});

// Implementar Action Bar (ver guía específica)
```

### Ejemplo 3: DataTable con Header Completo
```javascript
window.createDataTable({
  containerId: 'table-container',
  columns: [...],
  rows: [...],
  header: {
    title: 'Lista de elementos',
    counter: true,
    displayedItems: 32,
    totalItems: 206,
    primaryButton: {
      text: 'Nuevo',
      onClick: () => {
        console.log('Nuevo elemento');
      }
    },
    searchButton: true,
    filterButton: true
  }
});
```

---

**Última actualización:** 2025-01-03  
**Versión Storybook consultada:** ubits-storybook10.vercel.app

