# 📊 Guía: Análisis Detallado de Funcionalidades del DataTable

## ⚠️ ANÁLISIS ESPECÍFICO DE FUNCIONALIDADES

Esta guía establece el proceso **OBLIGATORIO** para analizar las funcionalidades del DataTable antes de implementarlo. Lista **TODAS** las funcionalidades disponibles del DataTable (basadas en las historias de Storybook) y proporciona un formato para especificar cuáles están presentes en la imagen analizada.

**⚠️ OBLIGATORIO:** Esta guía debe ser consultada cuando hay un DataTable en la imagen para:
1. Ver todas las funcionalidades disponibles en Storybook
2. Analizar la imagen para identificar cuáles están presentes
3. Listar TODAS las funcionalidades con SÍ/NO para cada una
4. Documentar qué funcionalidades implementar y cuáles NO

---

## 📋 PROCESO OBLIGATORIO

### **PASO 1: CONSULTAR STORYBOOK** 🔍

**ANTES de analizar la imagen, SIEMPRE consultar Storybook para ver todas las funcionalidades disponibles:**

1. **Consultar Storybook en Vercel:**
   - URL: `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default`
   - Revisar todas las historias disponibles (Default, Column Reorderable, Row Reorderable, etc.)
   - Ver controles disponibles en cada historia

2. **Listar TODAS las funcionalidades encontradas:**
   - Basarse en las historias de Storybook
   - Incluir todas las funcionalidades visibles en el menú lateral

### **PASO 2: ANALIZAR LA IMAGEN** 👁️

**Para CADA funcionalidad listada, verificar si está presente en la imagen:**

1. **Buscar evidencia visual:**
   - ¿Hay iconos, botones o elementos que indiquen esta funcionalidad?
   - ¿Hay comportamientos visibles que sugieran esta funcionalidad?

2. **Documentar con SÍ/NO:**
   - ✅ **SÍ** si está presente en la imagen
   - ❌ **NO** si NO está presente en la imagen

3. **Incluir evidencia:**
   - Describir qué se ve en la imagen que confirma o descarta la funcionalidad

### **PASO 3: DOCUMENTAR EN EL ANÁLISIS** 📝

**Usar el formato obligatorio para documentar todas las funcionalidades:**

---

## 📋 LISTA COMPLETA DE FUNCIONALIDADES DEL DATATABLE

Basado en las historias de Storybook disponibles, estas son todas las funcionalidades:

### **1. Column Reorderable** (Reordenar Columnas)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Permite arrastrar y soltar columnas para cambiar su orden
- **Configuración:** `columnReorderable: false` (NO configurar)

### **2. Row Reorderable** (Reordenar Filas)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Permite arrastrar y soltar filas para cambiar su orden
- **Configuración:** `rowReorderable: false` (NO configurar)

### **3. Row Expandable** (Expandir Filas)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Muestra icono para expandir/colapsar filas y mostrar contenido adicional
- **Configuración:** `rowExpandable: false` (NO configurar)
- **⚠️ CRÍTICO:** No hay iconos de expandir/colapsar visibles en las filas

### **4. Column Sortable** (Ordenar Columnas)
- **¿Está en la imagen?** ✅ **SÍ**
- **Descripción:** Muestra iconos de ordenamiento (flechas arriba/abajo) en los headers de las columnas
- **Configuración:** `columnSortable: true` (SÍ configurar)
- **Evidencia:** Iconos de ordenamiento visibles en los headers de las columnas

### **5. Checkbox Selection** (Selección con Checkboxes)
- **¿Está en la imagen?** ✅ **SÍ**
- **Descripción:** Muestra checkbox en cada fila y checkbox en el header para seleccionar todas
- **Configuración:** `showCheckbox: true` (SÍ configurar)
- **Evidencia:** Checkbox visible en el header y en cada fila

### **6. Vertical Scroll** (Scroll Vertical)
- **¿Está en la imagen?** ✅ **SÍ** (implícito)
- **Descripción:** La tabla tiene scroll vertical cuando hay muchos items
- **Configuración:** Se activa automáticamente cuando hay más items de los que caben
- **Evidencia:** Hay 206 encuestas según contador, la tabla debe tener scroll vertical

### **7. Horizontal Scroll** (Scroll Horizontal)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Scroll horizontal cuando las columnas no caben en el ancho disponible
- **Configuración:** `showHorizontalScrollbar: false` (NO configurar explícitamente)
- **Evidencia:** Todas las columnas caben en el ancho disponible, no hay scroll horizontal

### **8. Column Menu** (Menú de Columnas)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Menú contextual en los headers de las columnas (tres puntos)
- **Configuración:** `showColumnMenu: false` (NO configurar)
- **Evidencia:** No hay iconos de menú (tres puntos) en los headers de las columnas

### **9. Context Menu** (Menú Contextual)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Menú contextual al hacer click derecho en las filas
- **Configuración:** `showContextMenu: false` (NO configurar)
- **Evidencia:** No hay evidencia de menú contextual en la imagen

### **10. Lazy Load** (Carga Perezosa)
- **¿Está en la imagen?** ❌ **NO** (para implementación inicial)
- **Descripción:** Carga items por lotes mientras se hace scroll
- **Configuración:** `lazyLoad: false` (NO configurar para 20 items iniciales)
- **Razón:** Para la implementación inicial con 20 items, desactivar lazy load para mostrar todos de inmediato

### **11. Pagination** (Paginación)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Paginador en la parte inferior de la tabla
- **Configuración:** `showPagination: false` (NO configurar)
- **Evidencia:** No hay paginador visible en la parte inferior de la tabla

### **12. Sticky Controls** (Controles Fijos)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Controles (checkbox, drag handle, expand) que permanecen fijos al hacer scroll horizontal
- **Configuración:** `checkboxSticky: false`, `dragHandleSticky: false`, `expandSticky: false` (NO configurar)
- **Evidencia:** No hay columnas fijas visibles

### **13. Action Bar** (Barra de Acciones)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Barra de acciones que aparece cuando se seleccionan filas (botones de acciones masivas)
- **Configuración:** NO configurar `header.actionBar` (NO está presente)
- **Evidencia:** No hay barra de acciones visible cuando se seleccionan filas

### **14. Column Selector** (Selector de Columnas)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Botón para mostrar/ocultar columnas (selector de columnas)
- **Configuración:** `header.columnSelectorButton: false` (NO configurar)
- **Evidencia:** No hay botón de selector de columnas en el header

### **15. Filters** (Filtros)
- **¿Está en la imagen?** ✅ **SÍ** (botón de filtro visible)
- **Descripción:** Botón de filtros en el header del DataTable
- **Configuración:** `header.filterButton: true` (SÍ configurar)
- **Evidencia:** Botón de filtro (icono de embudo) visible en la barra de acciones del header

### **16. Search** (Búsqueda)
- **¿Está en la imagen?** ✅ **SÍ** (botón de búsqueda visible)
- **Descripción:** Input de búsqueda en el header del DataTable
- **Configuración:** `header.searchButton: true` (SÍ configurar)
- **Evidencia:** Input de búsqueda (icono de lupa) visible en la barra de acciones del header

### **17. Header** (Header del DataTable)
- **¿Está en la imagen?** ✅ **SÍ**
- **Descripción:** Header del DataTable con título, contador y barra de acciones
- **Configuración:** `header.title`, `header.counter`, `header.searchButton`, `header.filterButton`, `header.primaryButton`, `header.secondaryButtons` (SÍ configurar)
- **Evidencia:** 
  - Título: "Lista de encuestas"
  - Contador: "206 encuestas"
  - Barra de acciones con búsqueda, filtros, vista, botones

### **18. Pinned Columns** (Columnas Fijas)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Columnas que permanecen fijas (sticky) al hacer scroll horizontal
- **Configuración:** NO configurar `pinned: true` en ninguna columna
- **Evidencia:** No hay columnas fijas visibles en la imagen
- **⚠️ CRÍTICO:** Esta funcionalidad NO está presente, NO configurar `pinned: true`

### **19. Column Types** (Tipos de Columnas)
- **¿Está en la imagen?** ✅ **SÍ** (diferentes tipos visibles)
- **Descripción:** Diferentes tipos de columnas (texto, estado, fecha, progreso, etc.)
- **Configuración:** Configurar tipos correctos según análisis:
  - `type: 'nombre'` para Nombre y Tipo
  - `type: 'estado'` para Estado (badge/tag)
  - `type: 'fecha'` para Inicio y Cierre
  - `type: 'nombre'` para Participantes (números como texto)
  - `type: 'progreso'` para Avance (barra de progreso)

### **20. Editable Cells** (Celdas Editables)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Celdas que se pueden editar directamente en la tabla
- **Configuración:** NO configurar `editable: true` en ninguna columna
- **Evidencia:** No hay indicadores de celdas editables (no hay iconos de edición)

### **21. Empty State** (Estado Vacío)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Mensaje cuando no hay datos en la tabla
- **Configuración:** NO configurar `emptyState` (hay datos en la imagen)
- **Evidencia:** La tabla tiene datos (8 filas visibles, contador dice "206 encuestas")

### **22. Header Buttons** (Botones del Header)
- **¿Está en la imagen?** ✅ **SÍ**
- **Descripción:** Botones en el header del DataTable
- **Configuración:** 
  - `header.primaryButton: { text: 'Crear encuesta', icon: 'plus' }` (SÍ configurar)
  - `header.secondaryButtons: [{ text: 'Crear con plantilla', icon: 'file-lines' }]` (SÍ configurar)
- **Evidencia:** 
  - Botón primario: "+ Crear encuesta" (azul)
  - Botón secundario: "Crear con plantilla" (gris)

### **23. Ver Usuarios Seleccionados** (Vista de Selección)
- **¿Está en la imagen?** ❌ **NO**
- **Descripción:** Vista especial cuando se seleccionan usuarios/items
- **Configuración:** NO configurar (NO está presente)
- **Evidencia:** No hay vista de selección visible

### **24. View Options** (Opciones de Vista)
- **¿Está en la imagen?** ✅ **SÍ** (botón de vista visible)
- **Descripción:** Botón para cambiar entre vista de lista/grid
- **Configuración:** Verificar si está disponible en `header` (botón de vista con icono de tres líneas)
- **Evidencia:** Botón de vista (icono de tres líneas con cuadrado) visible en la barra de acciones

---

## 📊 FORMATO DE RESUMEN PARA EL ANÁLISIS

**⚠️ OBLIGATORIO:** Para cada imagen con DataTable, crear un resumen con este formato:

### ✅ **FUNCIONALIDADES QUE SÍ ESTÁN EN LA IMAGEN (IMPLEMENTAR):**

[Listar todas las funcionalidades que están presentes en la imagen, con su configuración]

**Ejemplo (Home de Encuestas):**
1. ✅ **Column Sortable** - `columnSortable: true` (iconos visibles)
2. ✅ **Checkbox Selection** - `showCheckbox: true` (checkboxes visibles)
3. ✅ **Vertical Scroll** - Se activa automáticamente (206 items según contador)
4. ✅ **Filters** - `header.filterButton: true` (botón visible)
5. ✅ **Search** - `header.searchButton: true` (input visible)
6. ✅ **Header** - `header.title`, `header.counter` (título y contador visibles)
7. ✅ **Column Types** - Tipos específicos (estado, fecha, progreso)
8. ✅ **Header Buttons** - `header.primaryButton`, `header.secondaryButtons` (botones visibles)
9. ✅ **View Options** - Botón de vista (icono visible)

### ❌ **FUNCIONALIDADES QUE NO ESTÁN EN LA IMAGEN (NO IMPLEMENTAR):**

[Listar todas las funcionalidades que NO están presentes en la imagen, con su configuración]

**Ejemplo (Home de Encuestas):**
1. ❌ **Column Reorderable** - `columnReorderable: false` (NO está presente)
2. ❌ **Row Reorderable** - `rowReorderable: false` (NO está presente)
3. ❌ **Row Expandable** - `rowExpandable: false` (NO hay iconos de expandir)
4. ❌ **Horizontal Scroll** - NO configurar (NO está presente)
5. ❌ **Column Menu** - `showColumnMenu: false` (NO está presente)
6. ❌ **Context Menu** - `showContextMenu: false` (NO está presente)
7. ❌ **Lazy Load** - `lazyLoad: false` (desactivar para pocos items)
8. ❌ **Pagination** - `showPagination: false` (NO está presente)
9. ❌ **Sticky Controls** - NO configurar (NO está presente)
10. ❌ **Action Bar** - NO configurar (NO está presente)
11. ❌ **Column Selector** - `header.columnSelectorButton: false` (NO está presente)
12. ❌ **Pinned Columns** - NO configurar `pinned: true` (NO está presente)
13. ❌ **Editable Cells** - NO configurar `editable: true` (NO está presente)
14. ❌ **Empty State** - NO configurar (NO está presente)
15. ❌ **Ver Usuarios Seleccionados** - NO configurar (NO está presente)

---

## ⚠️ FORMATO DE CONFIGURACIÓN FINAL

**⚠️ OBLIGATORIO:** Documentar la configuración final del DataTable basada en el análisis:

```javascript
window.createDataTable({
  containerId: '[container-id]',
  columns: [
    // ... columnas con tipos correctos según análisis
    // ⚠️ CRÍTICO: NO configurar pinned: true si Pinned Columns NO está en la imagen
  ],
  rows: generateItems(),
  
  // ✅ FUNCIONALIDADES ACTIVAS (según análisis):
  showCheckbox: true, // Si Checkbox Selection está presente
  columnSortable: true, // Si Column Sortable está presente
  // ... otras funcionalidades activas según análisis
  
  // ❌ FUNCIONALIDADES DESACTIVADAS (según análisis):
  columnReorderable: false, // Si Column Reorderable NO está presente
  rowReorderable: false, // Si Row Reorderable NO está presente
  rowExpandable: false, // Si Row Expandable NO está presente
  showColumnMenu: false, // Si Column Menu NO está presente
  showContextMenu: false, // Si Context Menu NO está presente
  lazyLoad: false, // Si Lazy Load NO está presente o para pocos items
  showPagination: false, // Si Pagination NO está presente
  // ... otras funcionalidades desactivadas según análisis
  
  // Header con funcionalidades presentes (según análisis):
  header: {
    title: '[título si está presente]',
    counter: '[contador si está presente]',
    searchButton: { /* ... */ }, // Si Search está presente
    filterButton: { /* ... */ }, // Si Filters está presente
    primaryButton: { /* ... */ }, // Si Header Buttons está presente
    secondaryButtons: [ /* ... */ ], // Si Header Buttons está presente
    columnSelectorButton: false // Si Column Selector NO está presente
  }
});
```

**Ejemplo (Home de Encuestas):**
```javascript
window.createDataTable({
  containerId: 'encuestas-table-container',
  columns: [ /* ... */ ],
  rows: generateItems(),
  showCheckbox: true,
  columnSortable: true,
  rowExpandable: false,
  lazyLoad: false,
  showPagination: false,
  header: {
    title: 'Lista de encuestas',
    counter: '206 encuestas',
    searchButton: { /* ... */ },
    filterButton: { /* ... */ },
    primaryButton: { text: 'Crear encuesta', icon: 'plus' },
    secondaryButtons: [{ text: 'Crear con plantilla', icon: 'file-lines' }],
    columnSelectorButton: false
  }
});
```

---

## ✅ CHECKLIST DE VERIFICACIÓN OBLIGATORIO

**⚠️ OBLIGATORIO:** Antes de implementar, completar este checklist para CADA funcionalidad:

### **PASO 1: CONSULTAR STORYBOOK**
- [ ] ¿Se consultó Storybook para ver todas las funcionalidades disponibles?
- [ ] ¿Se listaron TODAS las funcionalidades encontradas en Storybook?

### **PASO 2: ANALIZAR IMAGEN**
- [ ] ¿Se analizó la imagen para CADA funcionalidad listada?
- [ ] ¿Se documentó SÍ/NO para CADA funcionalidad?
- [ ] ¿Se incluyó evidencia visual para CADA funcionalidad?

### **PASO 3: DOCUMENTAR EN ANÁLISIS**
- [ ] ¿Se listaron TODAS las funcionalidades (no solo algunas)?
- [ ] ¿Se especificó qué implementar y qué NO implementar?
- [ ] ¿Se documentó la configuración para cada funcionalidad?

### **PASO 4: VERIFICAR ANTES DE IMPLEMENTAR**
- [ ] ¿Se verificó que NO se implementarán funcionalidades que NO están en la imagen?
- [ ] ¿Se verificó que SÍ se implementarán todas las funcionalidades que están en la imagen?
- [ ] ¿Se revisó el checklist completo antes de comenzar la implementación?

**Ejemplo de checklist específico (Home de Encuestas):**
- [ ] ✅ Column Sortable: SÍ (iconos visibles) → `columnSortable: true`
- [ ] ✅ Checkbox Selection: SÍ (checkboxes visibles) → `showCheckbox: true`
- [ ] ✅ Filters: SÍ (botón visible) → `header.filterButton: true`
- [ ] ✅ Search: SÍ (input visible) → `header.searchButton: true`
- [ ] ✅ Header: SÍ (título, contador, botones) → Configurar header completo
- [ ] ❌ Column Reorderable: NO (no implementar) → `columnReorderable: false`
- [ ] ❌ Row Reorderable: NO (no implementar) → `rowReorderable: false`
- [ ] ❌ Row Expandable: NO (no implementar) → `rowExpandable: false`
- [ ] ❌ Pinned Columns: NO (no configurar `pinned: true`) → NO configurar
- [ ] ❌ Pagination: NO (no implementar) → `showPagination: false`
- [ ] ❌ Lazy Load: NO (desactivar para pocos items) → `lazyLoad: false`
- [ ] ❌ Action Bar: NO (no implementar) → NO configurar
- [ ] ❌ Column Selector: NO (no implementar) → `header.columnSelectorButton: false`

---

## 📋 CÓMO USAR ESTA GUÍA PARA ANÁLISIS FUTUROS

### **Para cada nueva imagen con DataTable:**

1. **Consultar Storybook:**
   - Abrir `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default`
   - Revisar todas las historias disponibles en el menú lateral
   - Listar TODAS las funcionalidades encontradas

2. **Analizar la imagen:**
   - Para CADA funcionalidad listada, verificar si está presente en la imagen
   - Documentar con SÍ/NO y evidencia visual

3. **Documentar en el análisis:**
   - Usar el formato de esta guía
   - Listar TODAS las funcionalidades (no solo algunas)
   - Especificar qué implementar y qué NO implementar

4. **Verificar antes de implementar:**
   - Revisar el checklist de verificación
   - Asegurar que NO se implementen funcionalidades que NO están en la imagen
   - Asegurar que SÍ se implementen todas las funcionalidades que están en la imagen

---

## ⚠️ REGLAS CRÍTICAS

1. **NUNCA asumir funcionalidades** sin verificar en la imagen
2. **SIEMPRE consultar Storybook** para ver todas las funcionalidades disponibles
3. **SIEMPRE listar TODAS las funcionalidades** con SÍ/NO para cada una
4. **NUNCA implementar funcionalidades** que NO están en la imagen
5. **SIEMPRE documentar evidencia visual** para cada funcionalidad

---

## 🔗 Referencias

- **Storybook DataTable:** `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default`
- **DataTableOptions:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Guía análisis DataTable:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
- **Guía implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`

---

**Última actualización:** Diciembre 2024
**Versión:** 1.1.0 (guía genérica reutilizable)

