# 📦 Data Table

> **Componente UBITS:** `data-data-table`  
> **Categoría:** Data  
> **API:** `window.createDataTable()` o `<ubits-data-data-table>`  
> **Storybook Local:** http://localhost:6006/?path=/story/data-data-table--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default

## 🎯 Descripción

Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas. Componente más complejo del sistema UBITS.

**Características principales:**
- Reordenamiento de columnas y filas mediante drag & drop
- Ordenamiento por columnas
- Selección múltiple con checkboxes
- Filas expandibles/colapsables
- Menú de columnas para fijar/desfijar
- Menú contextual (click derecho) en filas
- Header configurable con título, contador y botones
- Paginación opcional
- Empty states configurables
- Barra de acciones para selecciones múltiples

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/data-data-table--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default
- **Código fuente:** `vendor/ubits/packages/components/data-data-table/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/data-data-table/src/types/DataTableOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/DataTable.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `data-data-table--default`  
**URL Local:** http://localhost:6006/?path=/story/data-data-table--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default

**Descripción:**
Tabla de datos completa con todas las funcionalidades disponibles. Esta historia incluye controles interactivos para configurar todas las opciones del DataTable.

**Características mostradas:**
- Columnas configurables (1-10 columnas)
- Tipos de columnas múltiples (nombre, correo, estado, progreso, radio, toggle, checkbox, fecha, país, ciudad)
- Reordenamiento de columnas y filas
- Selección múltiple con checkboxes
- Filas expandibles
- Ordenamiento
- Menú de columnas
- Menú contextual
- Header con título, contador y botones
- Paginación (opcional)
- Barra de acciones
- Empty states configurables

**Código de ejemplo:**
```javascript
window.createDataTable({
  containerId: 'table-container',
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'nombre' },
    { id: 'correo', title: 'Email', type: 'correo' },
    { id: 'estado', title: 'Estado', type: 'estado' }
  ],
  rows: [
    {
      id: 1,
      data: {
        nombre: 'Juan Pérez',
        correo: 'juan.perez@empresa.com',
        estado: 'activo'
      }
    }
  ],
  columnReorderable: true,
  rowReorderable: true,
  rowExpandable: true,
  columnSortable: true,
  showCheckbox: true,
  showColumnMenu: true,
  showContextMenu: true
});
```

**Opciones utilizadas en la historia Default:**
- `columnReorderable`: `true` - Permite reordenar columnas
- `rowReorderable`: `true` - Permite reordenar filas
- `rowExpandable`: `true` - Muestra icono de expandir/colapsar
- `columnSortable`: `true` - Muestra botones de ordenamiento
- `showCheckbox`: `true` - Muestra columna de checkbox
- `showColumnMenu`: `true` - Muestra menú de columnas
- `showContextMenu`: `true` - Muestra menú contextual

---

## ⚙️ Opciones y Props Completas

### Opciones de Funcionalidad

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `columnReorderable` | `boolean` | `true` | Permite reordenar columnas mediante drag & drop |
| `rowReorderable` | `boolean` | `true` | Permite reordenar filas mediante drag & drop |
| `rowExpandable` | `boolean` | `true` | Muestra el icono de expandir/colapsar en las filas |
| `columnSortable` | `boolean` | `true` | Muestra botones de ordenamiento en los headers de las columnas |
| `showCheckbox` | `boolean` | `true` | Muestra la columna de checkbox para selección múltiple |
| `showVerticalScrollbar` | `boolean` | `false` | Muestra scrollbar vertical |
| `showHorizontalScrollbar` | `boolean` | `false` | Muestra scrollbar horizontal |
| `showColumnMenu` | `boolean` | `true` | Muestra el botón de menú (3 puntos) en los headers de las columnas. Usa este menú para fijar/desfijar columnas. |
| `showContextMenu` | `boolean` | `true` | Muestra el menú contextual (click derecho) en las filas con las opciones de acciones. |
| `checkboxSticky` | `boolean` | `false` | Hace que la columna de checkbox sea sticky (fija) al hacer scroll horizontal |
| `dragHandleSticky` | `boolean` | `false` | Hace que la columna de drag handle (mover filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowReorderable esté habilitado. |
| `expandSticky` | `boolean` | `false` | Hace que la columna de expand (desplegar filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowExpandable esté habilitado. |

### Opciones de Columnas

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `columnsCount` | `number` | `7` | Número de columnas de datos a mostrar (excluyendo checkbox) |
| `columnType1` | `string` | `'nombre'` | Tipo de columna 1 (Nombre). Opciones: `nombre`, `nombre-avatar`, `nombre-avatar-texto`, `progreso`, `estado`, `radio`, `toggle`, `checkbox`, `correo`, `fecha`, `pais`, `ciudad` |
| `columnType2` | `string` | `'correo'` | Tipo de columna 2 (Email) |
| `columnType3` | `string` | `'estado'` | Tipo de columna 3 (Estado) |
| `columnType4` | `string` | `'nombre'` | Tipo de columna 4 |
| `column1AvatarVariant` | `string` | `'initials'` | Variante de avatar para columna 1 (solo si es nombre-avatar o nombre-avatar-texto). Opciones: `photo`, `initials`, `icon` |
| `column1Editable` | `boolean` | `false` | Hacer editable la columna 1 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio) |
| `column2EmailClickable` | `boolean` | `true` | Hacer el email clicable en columna 2 (solo si es correo) |
| `column3Editable` | `boolean` | `false` | Hacer editable la columna 3 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio) |
| `column3RadioLabel` | `boolean` | `false` | Mostrar label en columna 3 (solo si es radio) |
| `column3ToggleLabel` | `boolean` | `false` | Mostrar label en columna 3 (solo si es toggle) |
| `column3CheckboxLabel` | `boolean` | `true` | Mostrar label en checkbox de columna 3 (solo si es tipo checkbox). Si es true, muestra el label automáticamente. Este checkbox es diferente al checkbox fijo (checkbox-2) que está en una columna separada. |

### Opciones de Paginación

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `showPagination` | `boolean` | `false` | Muestra el paginador debajo de la tabla |
| `currentPage` | `number` | `1` | Página actual |
| `itemsPerPage` | `number` | `10` | Items por página |
| `paginationVariant` | `string` | `'default'` | Variante del paginador. Opciones: `default`, `compact`, `minimal` |
| `paginationSize` | `string` | `'md'` | Tamaño del paginador. Opciones: `sm`, `md`, `lg` |

### Opciones del Header

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `headerTitle` | `string` | `'Lista de elementos'` | Título del header |
| `showHeaderTitle` | `boolean` | `true` | Mostrar título del header |
| `headerCounter` | `boolean \| string` | `true` | Modo del contador: `true` = "X/Y resultados", `"total-only"` = solo "Y resultados", `false` = oculto |
| `headerDisplayedItems` | `number` | `32` | Items mostrados actualmente (para el contador X/Y) |
| `headerTotalItems` | `number` | `206` | Total de items para el contador |
| `showHeaderPrimaryButton` | `boolean` | `true` | Mostrar botón primario |
| `headerPrimaryButtonText` | `string` | `'Nuevo'` | Texto del botón primario |
| `showHeaderSecondaryButtons` | `boolean` | `true` | Mostrar botones secundarios |
| `showHeaderSearchButton` | `boolean` | `true` | Mostrar botón de búsqueda |
| `showHeaderFilterButton` | `boolean` | `true` | Mostrar botón de filtros |
| `showHeaderColumnSelectorButton` | `boolean` | `true` | Mostrar botón de seleccionar columnas |

### Opciones de la Barra de Acciones

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `showActionButtonViewSelected` | `boolean` | `true` | Mostrar botón "Ver seleccionados" en la barra de acciones |
| `showActionButtonNotifications` | `boolean` | `true` | Mostrar botón "Notificaciones" en la barra de acciones |
| `showActionButtonCopy` | `boolean` | `true` | Mostrar botón "Copiar" en la barra de acciones (solo modo individual) |
| `showActionButtonView` | `boolean` | `true` | Mostrar botón "Ver" en la barra de acciones (solo modo individual) |
| `showActionButtonEdit` | `boolean` | `true` | Mostrar botón "Editar" en la barra de acciones (solo modo individual) |
| `showActionButtonDownload` | `boolean` | `true` | Mostrar botón "Descargar" en la barra de acciones (solo modo individual) |
| `showActionButtonDelete` | `boolean` | `true` | Mostrar botón "Eliminar" en la barra de acciones |

### Opciones de Empty State - No Data

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `emptyStateNoDataTitle` | `string` | `'No hay datos'` | Título del empty state cuando no hay datos |
| `emptyStateNoDataDescription` | `string` | - | Descripción del empty state cuando no hay datos |
| `emptyStateNoDataIcon` | `string` | - | Icono FontAwesome del empty state cuando no hay datos (ej: "inbox", "database") |
| `emptyStateNoDataActionLabel` | `string` | - | Texto del botón de acción cuando no hay datos |
| `emptyStateNoDataShowPrimaryButton` | `boolean` | `false` | Mostrar botón primario cuando no hay datos |

### Opciones de Empty State - No Search Results

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `emptyStateNoSearchResultsTitle` | `string` | `'No se encontraron resultados'` | Título del empty state cuando no hay resultados de búsqueda |
| `emptyStateNoSearchResultsDescription` | `string` | - | Descripción del empty state cuando no hay resultados de búsqueda |
| `emptyStateNoSearchResultsIcon` | `string` | - | Icono FontAwesome del empty state cuando no hay resultados de búsqueda (ej: "search") |
| `emptyStateNoSearchResultsActionLabel` | `string` | - | Texto del botón de acción cuando no hay resultados de búsqueda |
| `emptyStateNoSearchResultsShowPrimaryButton` | `boolean` | `false` | Mostrar botón primario cuando no hay resultados de búsqueda |

### Opciones de Empty State - No Filter Results

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `emptyStateNoFilterResultsTitle` | `string` | `'No hay resultados con los filtros aplicados'` | Título del empty state cuando no hay resultados de filtros |
| `emptyStateNoFilterResultsDescription` | `string` | - | Descripción del empty state cuando no hay resultados de filtros |
| `emptyStateNoFilterResultsIcon` | `string` | - | Icono FontAwesome del empty state cuando no hay resultados de filtros (ej: "filter") |
| `emptyStateNoFilterResultsActionLabel` | `string` | - | Texto del botón de acción cuando no hay resultados de filtros |
| `emptyStateNoFilterResultsShowPrimaryButton` | `boolean` | `true` | Mostrar botón primario cuando no hay resultados de filtros |

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

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Guía de implementación DataTable](../../guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md)
- [Guía Action Bar](../../guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md)
- [Análisis completo DataTable](../../guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md)
- [Análisis funcionalidades DataTable](../../guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md)

---

**Última actualización:** 2025-12-05
**Storybook Local:** http://localhost:6006/
**Storybook Vercel:** ubits-storybook10.vercel.app
**Estado:** ✅ Documentación completa desde Storybook local
