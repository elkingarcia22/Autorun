# 📊 Guía: Implementación de DataTable Paso a Paso

Esta guía establece el proceso **OBLIGATORIO** para implementar DataTable con múltiples funcionalidades. **NUNCA implementar todas las funcionalidades de golpe.**

---

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"Una funcionalidad a la vez"** - Implementar cada característica de DataTable de forma independiente, pedir aprobación en cada paso, y solo avanzar cuando el usuario apruebe.

---

## 📋 PROCESO COMPLETO (OBLIGATORIO)

### **FASE 0: REVISAR COMPONENTE DATATABLE** 🔍

#### **Paso 0.1: Revisar Variantes, Controladores y Funcionalidades**

**⚠️ OBLIGATORIO:** Antes de implementar DataTable, revisar el archivo de tipos:

**Ubicación:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`

**1. Revisar Variantes:**
- ¿Qué tipos de columnas hay? (`text`, `estado`, `fecha`, `progreso`, `checkbox`, etc.)
- ¿Qué tipos de filas? (datos normales, grupos, etc.)

**2. Revisar Controladores (opciones que prende/apaga funcionalidades):**
```typescript
// Controladores principales identificados:
- showCheckbox: boolean              // Prende/apaga checkboxes
- rowReorderable: boolean            // Prende/apaga arrastrar filas
- columnReorderable: boolean         // Prende/apaga arrastrar columnas
- columnSortable: boolean             // Prende/apaga ordenamiento
- header.filterButton: boolean       // Prende/apaga botón de filtros
- header.columnSelectorButton: boolean // Prende/apaga selector de columnas
- header.actionBar.showOnSingleSelect: boolean // Prende/apaga barra acciones (1 fila)
- header.actionBar.showOnMultipleSelect: boolean // Prende/apaga barra acciones (múltiples)
```

**3. Revisar Funcionalidades Completas:**
- Listar todas las funcionalidades disponibles en DataTableOptions
- Identificar cuáles se necesitan para esta implementación
- Dividir en tareas independientes (una funcionalidad = una tarea)

**Mostrar al usuario:**
```markdown
## 🔍 Revisión de DataTable

### Controladores identificados:
- showCheckbox: boolean
- rowReorderable: boolean
- columnReorderable: boolean
- columnSortable: boolean
- header.filterButton: boolean
- header.columnSelectorButton: boolean
- header.actionBar.showOnSingleSelect: boolean
- header.actionBar.showOnMultipleSelect: boolean

### Funcionalidades identificadas:
1. Checkboxes
2. Arrastrar y soltar filas
3. Arrastrar y soltar columnas
4. Ordenamiento
5. Fijar columnas
6. Selector de columnas
7. Barra de acciones (selección única)
8. Barra de acciones (selección múltiple)
9. Dropdown con filtros
10. Buscador

### Plan de implementación:
- Tarea 1: DataTable básico (solo estructura)
- Tarea 2: Checkboxes
- Tarea 3: Arrastrar y soltar filas
...

### ¿Aprobamos este plan?
```

---

### **FASE 0.5: ANALIZAR ESTRUCTURA Y SPACING** 📐

#### **Paso 0.5.1: Analizar Contenedores**

**⚠️ OBLIGATORIO:** Antes de crear el DataTable, analizar si necesita contenedor:

**Preguntas clave:**
- ¿El DataTable va en un contenedor?
- ¿Qué elementos van antes del DataTable?
- ¿Hay elementos que NO van en contenedor (ej: Tabs)?

**Ejemplo de análisis:**
```markdown
### Análisis de contenedores:
- ❌ **Tabs:** NO van en contenedor (se renderizan directo)
- ✅ **DataTable:** SÍ va en contenedor `<div id="table-container">`
  - Razón: `window.createDataTable()` requiere contenedor con ID específico
```

#### **Paso 0.5.2: Analizar Spacing**

**⚠️ OBLIGATORIO:** Analizar spacing específico alrededor del DataTable:

**Preguntas clave:**
- ¿Cuánto espacio hay entre el elemento anterior y el DataTable?
- ¿Cuánto padding tiene el contenedor del DataTable?

**Ejemplo de análisis:**
```markdown
### Spacing identificado:
- **Entre Tabs y DataTable:** `--ubits-spacing-lg` (16px)
- **Padding del contenedor DataTable:** `--ubits-spacing-none` (0px)
```

**Ver guía completa:** `GUIA-ANALISIS-ESTRUCTURA-SPACING.md`

---

### **FASE 1: ANÁLISIS DE COLUMNAS** 🔍

#### **Paso 1.1: Analizar Columnas de la Imagen/Solicitud**

**SIEMPRE hacer esto PRIMERO antes de crear el DataTable:**

1. **Identificar cantidad de columnas:**
   - ¿Cuántas columnas tiene la tabla?
   - ¿Hay columnas ocultas o que se muestran condicionalmente?

2. **Identificar tipo de cada columna:**
   - ¿Qué tipo de dato muestra cada columna?
   - Tipos comunes:
     - `text` / `nombre` - Texto simple
     - `checkbox` - Casilla de selección
     - `estado` - Badge/tag de estado (ej: "En progreso", "Completado")
     - `fecha` - Fecha formateada
     - `numero` - Número formateado
     - `progreso` - Barra de progreso
     - `acciones` - Botones de acción (editar, eliminar, etc.)
     - `avatar` - Imagen de perfil
     - `custom` - Contenido personalizado

3. **Identificar columnas especiales:**
   - ¿Hay columna de checkbox para selección múltiple?
   - ¿Hay columna de drag handle para reordenar filas?
   - ¿Hay columna de acciones?
   - ¿Hay columnas fijas (sticky)?

4. **Crear lista de columnas:**
   ```markdown
   ## 📋 Análisis de Columnas
   
   ### Columnas identificadas:
   1. **Checkbox** (tipo: `checkbox`, ancho: 50px)
   2. **Nombre** (tipo: `text`, ancho: auto)
   3. **Tipo** (tipo: `text`, ancho: auto)
   4. **Estado** (tipo: `estado`, ancho: auto)
   5. **Inicio** (tipo: `fecha`, ancho: auto)
   6. **Cierre** (tipo: `fecha`, ancho: auto)
   7. **Participantes** (tipo: `numero`, ancho: auto)
   8. **Avance** (tipo: `progreso`, ancho: auto)
   
   ### Columnas especiales:
   - ✅ Checkbox para selección múltiple
   - ❌ Drag handle (se agregará en funcionalidad de arrastrar filas)
   - ❌ Columna de acciones (se agregará después)
   ```

#### **Paso 1.2: Presentar Análisis al Usuario**

**Mostrar el análisis y esperar confirmación:**

```markdown
## ✅ Análisis de Columnas Completado

### Columnas identificadas: [X] columnas
[Lista de columnas con tipos]

### ¿Este análisis es correcto?
- ¿Faltan columnas?
- ¿Algún tipo de columna está incorrecto?
- ¿Hay columnas especiales que no identifiqué?

### ¿Aprobamos para continuar con la implementación básica del DataTable?
```

---

### **FASE 2: IMPLEMENTACIÓN BÁSICA** 🛠️

#### **Tarea 1: DataTable Básico (Solo Estructura y Columnas)**

**OBJETIVO:** Crear el DataTable con solo la estructura básica y las columnas identificadas. **SIN funcionalidades avanzadas.**

**Implementar SOLO esto:**

```javascript
// DataTable MÍNIMO - solo estructura y columnas
window.createDataTable({
  containerId: 'table-container',
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'text' },
    { id: 'tipo', title: 'Tipo', type: 'text' },
    { id: 'estado', title: 'Estado', type: 'estado' }
    // ... solo las columnas básicas identificadas
  ],
  rows: [
    { id: 1, data: { nombre: 'Ejemplo 1', tipo: 'Tipo A', estado: 'en-progreso' } },
    { id: 2, data: { nombre: 'Ejemplo 2', tipo: 'Tipo B', estado: 'completado' } }
    // ... solo datos de ejemplo mínimos
  ]
});
```

**NO incluir aún:**
- ❌ Checkboxes
- ❌ Drag & drop
- ❌ Ordenamiento
- ❌ Filtros
- ❌ Buscador
- ❌ Header con botones
- ❌ Barra de acciones

**Paso 1.1.1: Ejecutar Validación Automática** ✅

**OBLIGATORIO después de cada implementación:**

```bash
npm run lint
```

**El validador verifica:**
- ✅ Componentes oficiales UBITS (no componentes custom)
- ✅ Tokens UBITS (no valores hardcodeados)
- ✅ Estilos correctos (no estilos inline sin tokens)
- ✅ Uso correcto de componentes
- ✅ Formato de código correcto

**Si hay errores:**
1. Leer los errores del validador
2. Corregir automáticamente
3. Ejecutar validación de nuevo: `npm run lint`
4. Repetir hasta que pase

**Verificar:**
- ✅ DataTable se renderiza
- ✅ Columnas se muestran correctamente
- ✅ Datos se muestran en las filas
- ✅ Estilos UBITS aplicados
- ✅ Validación pasada (o errores corregidos)

**Preguntar:**
> "✅ Tarea 1 completada: DataTable básico con columnas implementado y validación pasada. ¿Las columnas se ven correctas? ¿Aprobamos para continuar con la Tarea 2 (checkboxes)?"

---

#### **Tarea 2: Agregar Checkboxes**

**OBJETIVO:** Agregar la columna de checkbox y la funcionalidad de selección.

**Implementar SOLO esto:**

```javascript
// Agregar checkboxes
window.createDataTable({
  // ... columnas anteriores
  showCheckbox: true,  // ✅ Agregar esta opción
  onRowSelect: (selectedRows) => {
    console.log('Filas seleccionadas:', selectedRows);
  }
});
```

**Paso 2.1: Ejecutar Validación Automática** ✅

```bash
npm run lint
```

**Verificar:**
- ✅ Columna de checkbox aparece
- ✅ Se puede seleccionar/deseleccionar filas individuales
- ✅ Se puede seleccionar todas las filas (checkbox del header)
- ✅ Callback `onRowSelect` funciona
- ✅ Validación pasada (o errores corregidos)

**Preguntar:**
> "✅ Tarea 2 completada: Checkboxes implementados y validación pasada. ¿Funcionan correctamente? ¿Aprobamos para continuar con la Tarea 3 (arrastrar y soltar filas)?"

---

#### **Tarea 3: Arrastrar y Soltar Filas**

**OBJETIVO:** Permitir reordenar filas arrastrándolas.

**Implementar SOLO esto:**

```javascript
// Agregar drag & drop de filas
window.createDataTable({
  // ... opciones anteriores
  rowReorderable: true,  // ✅ Agregar esta opción
  onRowReorder: (newOrder) => {
    console.log('Nuevo orden:', newOrder);
    // Actualizar datos con el nuevo orden
  }
});
```

**Verificar:**
- ✅ Columna de drag handle aparece automáticamente
- ✅ Se puede arrastrar una fila
- ✅ Se puede soltar en otra posición
- ✅ El orden se actualiza visualmente
- ✅ Callback `onRowReorder` se ejecuta

**Preguntar:**
> "✅ Tarea 3 completada: Arrastrar y soltar filas implementado. ¿Funciona correctamente? ¿Aprobamos para continuar con la Tarea 4 (arrastrar y soltar columnas)?"

---

#### **Tarea 4: Arrastrar y Soltar Columnas**

**OBJETIVO:** Permitir reordenar columnas arrastrándolas.

**Implementar SOLO esto:**

```javascript
// Agregar drag & drop de columnas
window.createDataTable({
  // ... opciones anteriores
  columnReorderable: true,  // ✅ Agregar esta opción
  onColumnReorder: (newOrder) => {
    console.log('Nuevo orden de columnas:', newOrder);
    // Guardar preferencia de orden de columnas
  }
});
```

**Verificar:**
- ✅ Se puede arrastrar una columna desde el header
- ✅ Se puede soltar en otra posición
- ✅ El orden de columnas se actualiza visualmente
- ✅ Callback `onColumnReorder` se ejecuta

**Preguntar:**
> "✅ Tarea 4 completada: Arrastrar y soltar columnas implementado. ¿Funciona correctamente? ¿Aprobamos para continuar con la Tarea 5 (ordenamiento)?"

---

#### **Tarea 5: Ordenamiento de Columnas**

**OBJETIVO:** Permitir ordenar filas haciendo clic en el header de una columna.

**Implementar SOLO esto:**

```javascript
// Agregar ordenamiento
window.createDataTable({
  // ... opciones anteriores
  columnSortable: true,  // ✅ Agregar esta opción
  defaultSortColumn: 'nombre',  // Opcional: columna por defecto
  defaultSortDirection: 'asc',  // Opcional: dirección por defecto
  onSort: (columnId, direction) => {
    console.log('Ordenar por:', columnId, direction);
    // Ordenar datos según la columna y dirección
  }
});
```

**Verificar:**
- ✅ Iconos de ordenamiento aparecen en los headers
- ✅ Clic en header ordena ascendente
- ✅ Segundo clic ordena descendente
- ✅ Tercer clic quita el ordenamiento
- ✅ Callback `onSort` se ejecuta

**Preguntar:**
> "✅ Tarea 5 completada: Ordenamiento implementado. ¿Funciona correctamente? ¿Aprobamos para continuar con la Tarea 6 (fijar columnas)?"

---

#### **Tarea 6: Fijar Columnas (Sticky)**

**OBJETIVO:** Fijar columnas a la izquierda o derecha para que permanezcan visibles al hacer scroll horizontal.

**Implementar SOLO esto:**

```javascript
// Fijar columnas
window.createDataTable({
  // ... opciones anteriores
  columns: [
    { 
      id: 'checkbox', 
      title: '', 
      type: 'checkbox', 
      width: 50,
      sticky: 'left'  // ✅ Fijar a la izquierda
    },
    { 
      id: 'nombre', 
      title: 'Nombre', 
      type: 'text' 
      // Sin sticky = columna normal
    },
    { 
      id: 'acciones', 
      title: 'Acciones', 
      type: 'acciones',
      sticky: 'right'  // ✅ Fijar a la derecha
    }
  ]
});
```

**Verificar:**
- ✅ Columnas fijas permanecen visibles al hacer scroll horizontal
- ✅ Columnas fijas a la izquierda funcionan
- ✅ Columnas fijas a la derecha funcionan
- ✅ Estilos de sombra/borde se aplican correctamente

**Preguntar:**
> "✅ Tarea 6 completada: Fijar columnas implementado. ¿Funciona correctamente? ¿Aprobamos para continuar con la Tarea 7 (selector de columnas)?"

---

#### **Tarea 7: Selector de Columnas (Dropdown)**

**OBJETIVO:** Permitir mostrar/ocultar columnas mediante un dropdown.

**Implementar SOLO esto:**

```javascript
// Agregar selector de columnas
window.createDataTable({
  // ... opciones anteriores
  header: {
    columnSelectorButton: true  // ✅ Agregar botón de selector
  },
  onColumnVisibilityChange: (visibleColumns) => {
    console.log('Columnas visibles:', visibleColumns);
    // Guardar preferencia de columnas visibles
  }
});
```

**Verificar:**
- ✅ Botón de selector de columnas aparece en el header
- ✅ Al hacer clic, se abre un dropdown con lista de columnas
- ✅ Cada columna tiene un checkbox para mostrar/ocultar
- ✅ Al cambiar visibilidad, las columnas se muestran/ocultan
- ✅ Callback `onColumnVisibilityChange` se ejecuta

**Preguntar:**
> "✅ Tarea 7 completada: Selector de columnas implementado. ¿Funciona correctamente? ¿Aprobamos para continuar con la Tarea 8 (barra de acciones - selección única)?"

---

#### **Tarea 8: Barra de Acciones - Selección Única**

**OBJETIVO:** Mostrar barra de acciones cuando se selecciona UNA sola fila.

**Implementar SOLO esto:**

```javascript
// Barra de acciones para selección única
window.createDataTable({
  // ... opciones anteriores
  header: {
    actionBar: {
      showOnSingleSelect: true,  // ✅ Mostrar cuando se selecciona 1 fila
      actions: [
        {
          id: 'editar',
          label: 'Editar',
          icon: 'edit',
          variant: 'secondary',
          onClick: (selectedRows) => {
            console.log('Editar fila:', selectedRows[0]);
            // Abrir modal de edición
          }
        },
        {
          id: 'eliminar',
          label: 'Eliminar',
          icon: 'trash',
          variant: 'danger',
          onClick: (selectedRows) => {
            console.log('Eliminar fila:', selectedRows[0]);
            // Confirmar y eliminar
          }
        }
      ]
    }
  }
});
```

**Verificar:**
- ✅ Barra de acciones aparece cuando se selecciona 1 fila
- ✅ Botones de acción se muestran correctamente
- ✅ Al hacer clic en una acción, se ejecuta el callback con la fila seleccionada
- ✅ Barra desaparece al deseleccionar

**Preguntar:**
> "✅ Tarea 8 completada: Barra de acciones (selección única) implementada. ¿Funciona correctamente? ¿Aprobamos para continuar con la Tarea 9 (barra de acciones - selección múltiple)?"

---

#### **Tarea 9: Barra de Acciones - Selección Múltiple**

**OBJETIVO:** Mostrar barra de acciones diferente cuando se seleccionan MÚLTIPLES filas.

**Implementar SOLO esto:**

```javascript
// Barra de acciones para selección múltiple
window.createDataTable({
  // ... opciones anteriores
  header: {
    actionBar: {
      showOnMultipleSelect: true,  // ✅ Mostrar cuando se seleccionan 2+ filas
      multipleSelectActions: [
        {
          id: 'exportar',
          label: 'Exportar seleccionados',
          icon: 'download',
          variant: 'secondary',
          onClick: (selectedRows) => {
            console.log('Exportar filas:', selectedRows);
            // Exportar datos seleccionados
          }
        },
        {
          id: 'eliminar-multi',
          label: 'Eliminar seleccionados',
          icon: 'trash',
          variant: 'danger',
          onClick: (selectedRows) => {
            console.log('Eliminar filas:', selectedRows);
            // Confirmar y eliminar múltiples
          }
        }
      ]
    }
  }
});
```

**Verificar:**
- ✅ Barra de acciones aparece cuando se seleccionan 2+ filas
- ✅ Botones de acción múltiple se muestran correctamente
- ✅ Contador de seleccionados se muestra (ej: "3 seleccionados")
- ✅ Al hacer clic en una acción, se ejecuta el callback con todas las filas seleccionadas
- ✅ Barra cambia entre selección única y múltiple correctamente

**Preguntar:**
> "✅ Tarea 9 completada: Barra de acciones (selección múltiple) implementada. ¿Funciona correctamente? ¿Aprobamos para continuar con la Tarea 10 (dropdown con filtros)?"

---

#### **Tarea 10: Dropdown con Filtros**

**OBJETIVO:** Agregar un dropdown con filtros para las columnas de la tabla.

**Implementar SOLO esto:**

```javascript
// Agregar dropdown de filtros
window.createDataTable({
  // ... opciones anteriores
  header: {
    filterButton: true,  // ✅ Agregar botón de filtros
    filters: [
      {
        id: 'estado',
        label: 'Estado',
        type: 'select',
        options: [
          { value: 'todos', label: 'Todos' },
          { value: 'en-progreso', label: 'En progreso' },
          { value: 'completado', label: 'Completado' },
          { value: 'pausado', label: 'Pausado' }
        ],
        onChange: (value) => {
          console.log('Filtrar por estado:', value);
          // Filtrar datos según el estado seleccionado
        }
      },
      {
        id: 'tipo',
        label: 'Tipo',
        type: 'select',
        options: [
          { value: 'todos', label: 'Todos' },
          { value: 'cultura', label: 'Cultura' },
          { value: 'desempeno', label: 'Desempeño' }
        ],
        onChange: (value) => {
          console.log('Filtrar por tipo:', value);
          // Filtrar datos según el tipo seleccionado
        }
      }
    ]
  }
});
```

**Verificar:**
- ✅ Botón de filtros aparece en el header
- ✅ Al hacer clic, se abre un dropdown con los filtros
- ✅ Cada filtro funciona independientemente
- ✅ Los filtros se aplican a los datos de la tabla
- ✅ Los filtros se pueden limpiar/resetear

**Preguntar:**
> "✅ Tarea 10 completada: Dropdown con filtros implementado. ¿Funciona correctamente? ¿Aprobamos para continuar con la Tarea 11 (buscador con componentes UBITS)?"

---

#### **Tarea 11: Buscador con Componentes UBITS**

**OBJETIVO:** Implementar el buscador usando nuestros componentes UBITS (`<ubits-input>` y `<ubits-button>`) en lugar del buscador nativo del DataTable.

**⚠️ IMPORTANTE:** Esta tarea es diferente porque NO usamos el buscador integrado del DataTable. En su lugar, creamos nuestro propio buscador con componentes UBITS.

**Implementar SOLO esto:**

```html
<!-- Buscador personalizado con componentes UBITS -->
<div id="search-bar-container" style="display: flex; gap: var(--ubits-spacing-sm); margin-bottom: var(--ubits-spacing-md);">
  <ubits-input 
    type="search" 
    placeholder="Buscar encuestas..." 
    icon-left="search"
    id="table-search-input"
  ></ubits-input>
  <ubits-button 
    variant="ghost" 
    size="md" 
    icon-left="filter"
    id="table-filter-button"
  ></ubits-button>
</div>
```

```javascript
// Conectar buscador personalizado con DataTable
const searchInput = document.getElementById('table-search-input');
const filterButton = document.getElementById('table-filter-button');

// Event listener para el buscador
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  // Filtrar datos según el término de búsqueda
  const filteredRows = originalData.filter(row => {
    // Buscar en todas las columnas de texto
    return Object.values(row.data).some(value => 
      String(value).toLowerCase().includes(searchTerm)
    );
  });
  
  // Actualizar DataTable con datos filtrados
  window.createDataTable({
    // ... opciones anteriores
    rows: filteredRows
  }, 'table-container');
});

// Event listener para el botón de filtro
filterButton.addEventListener('click', () => {
  // Abrir dropdown de filtros (si existe)
  // O mostrar modal de filtros avanzados
});
```

**Verificar:**
- ✅ Input de búsqueda se muestra con estilos UBITS
- ✅ Botón de filtro se muestra con estilos UBITS
- ✅ Al escribir en el buscador, se filtran los datos
- ✅ El filtrado funciona en tiempo real
- ✅ Los estilos son consistentes con el resto de la interfaz

**Preguntar:**
> "✅ Tarea 11 completada: Buscador con componentes UBITS implementado. ¿Funciona correctamente? ¿Hay algo más que ajustar?"

---

## 🚨 REGLAS CRÍTICAS

### **1. NUNCA Implementar Múltiples Funcionalidades a la Vez**
- ❌ NO implementar checkboxes + drag & drop + ordenamiento en un solo paso
- ✅ SIEMPRE implementar una funcionalidad a la vez
- ✅ SIEMPRE pedir aprobación entre funcionalidades

### **2. SIEMPRE Analizar Columnas Primero**
- ❌ NO crear el DataTable sin analizar las columnas
- ✅ SIEMPRE identificar cantidad y tipo de columnas primero
- ✅ SIEMPRE presentar el análisis al usuario antes de implementar

### **3. SIEMPRE Verificar Cada Funcionalidad**
- ❌ NO asumir que funciona
- ✅ SIEMPRE probar cada funcionalidad después de implementarla
- ✅ SIEMPRE verificar callbacks y eventos

### **4. SIEMPRE Usar Componentes UBITS para Elementos Externos**
- ❌ NO usar el buscador nativo del DataTable si necesitamos nuestro propio buscador
- ✅ SIEMPRE usar `<ubits-input>` y `<ubits-button>` para elementos personalizados
- ✅ SIEMPRE mantener consistencia visual con el resto de la interfaz

### **5. SIEMPRE Documentar Opciones Usadas**
- ❌ NO usar opciones sin explicar
- ✅ SIEMPRE explicar qué opción se agregó y por qué
- ✅ SIEMPRE consultar `DataTableOptions.ts` para ver todas las opciones disponibles

---

## 📝 PLANTILLA DE MENSAJE PARA CADA TAREA

```
## ✅ Tarea [N] Completada: [Nombre de la Funcionalidad]

### Lo que se implementó:
- [ ] Funcionalidad X
- [ ] Opciones agregadas: `option1`, `option2`
- [ ] Callbacks configurados: `onCallback`

### Código implementado:
[Mostrar código relevante]

### Verificación:
- ✅ Funcionalidad funciona correctamente
- ✅ Callbacks se ejecutan
- ✅ Estilos UBITS aplicados
- ✅ Sin errores en consola

### ¿Aprobamos para continuar con la Tarea [N+1]?
```

---

## 🎯 ORDEN RECOMENDADO DE IMPLEMENTACIÓN

1. ✅ **Análisis de columnas** (Fase 1)
2. ✅ **DataTable básico** (Tarea 1)
3. ✅ **Checkboxes** (Tarea 2)
4. ✅ **Arrastrar y soltar filas** (Tarea 3)
5. ✅ **Arrastrar y soltar columnas** (Tarea 4)
6. ✅ **Ordenamiento** (Tarea 5)
7. ✅ **Fijar columnas** (Tarea 6)
8. ✅ **Selector de columnas** (Tarea 7)
9. ✅ **Barra de acciones (selección única)** (Tarea 8)
10. ✅ **Barra de acciones (selección múltiple)** (Tarea 9)
11. ✅ **Dropdown con filtros** (Tarea 10)
12. ✅ **Buscador con componentes UBITS** (Tarea 11)

**Nota:** Este orden puede variar según las necesidades del proyecto, pero **SIEMPRE** implementar una funcionalidad a la vez.

---

## 🔗 Referencias

- **DataTable Options:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Guía general:** `GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Catálogo de componentes:** `CATALOGO-COMPONENTES-UBITS.md`
- **Componentes UBITS:** `GUIA-USO-COMPONENTES-UBITS.md`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

