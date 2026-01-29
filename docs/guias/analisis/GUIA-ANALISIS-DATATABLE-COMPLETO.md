# 📊 Guía: Análisis de DataTable Completo

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"DataTable es UN SOLO componente que incluye TODO"** - El título, contador, búsqueda, filtros, botones y la tabla misma son TODOS parte del componente DataTable. Se implementan por partes debido a su complejidad, pero es UN SOLO componente.

---

## 🎯 ¿QUÉ INCLUYE EL COMPONENTE DATATABLE?

El componente DataTable de UBITS incluye **TODO** lo siguiente:

### **1. Header del DataTable** (opcional, configurable)
- ✅ **Título** (`header.title`) - Ej: "Lista de encuestas"
- ✅ **Contador** (`header.counter`) - Ej: "206 encuestas" o "X/Y resultados"
- ✅ **Botón de búsqueda** (`header.searchButton`) - Input de búsqueda con icono
- ✅ **Botón de filtros** (`header.filterButton`) - Botón para abrir filtros
- ✅ **Selector de columnas** (`header.columnSelectorButton`) - Botón para mostrar/ocultar columnas
- ✅ **Botón primario** (`header.primaryButton`) - Ej: "+ Crear encuesta"
- ✅ **Botones secundarios** (`header.secondaryButtons`) - Ej: "Crear con plantilla"

### **2. Barra de acciones** (opcional, configurable)
- ✅ Aparece cuando se seleccionan filas
- ✅ Acciones contextuales según selección (única o múltiple)

### **3. Tabla** (obligatoria)
- ✅ Columnas configurables
- ✅ Filas con datos
- ✅ **⚠️ CRÍTICO: Contar cantidad de items/filas visibles en la imagen**
- ✅ Funcionalidades: checkboxes, sorting, reordenamiento, etc.

---

## 📋 PROCESO DE ANÁLISIS CORRECTO

### **PASO 0: CONTAR ITEMS/FILAS EN LA IMAGEN** ⚠️ CRÍTICO

**ANTES de analizar columnas o estructura, SIEMPRE contar cuántos items/filas hay en la tabla:**

1. **Contar filas visibles:**
   - ¿Cuántas filas se ven completamente en la imagen?
   - ¿Hay scroll o paginación visible?
   - ¿La tabla llega hasta abajo de la imagen?

2. **Estimar cantidad total:**
   - Si hay scroll, estimar cuántos items hay en total
   - Si hay contador (ej: "206 encuestas"), usar ese número
   - Si no hay contador, contar las filas visibles y estimar

3. **Documentar en el análisis:**
   ```markdown
   ### Cantidad de items/filas:
   - **Filas visibles en imagen:** [X] filas
   - **Scroll visible:** Sí / No
   - **Contador en header:** "206 encuestas" (si existe)
   - **Cantidad total estimada:** [X] items
   - **Items a crear en implementación:** [X] items (mínimo para mostrar scroll si aplica)
   ```

**⚠️ REGLA CRÍTICA:** NO crear solo 2-3 items de ejemplo. Crear una cantidad razonable que refleje la imagen (mínimo 10-15 items si hay scroll, o la cantidad exacta si se ve completa).

**Ver guía completa:** `docs/guias/implementacion/GUIA-GENERAR-ITEMS-DATATABLE.md` - ⚠️ **OBLIGATORIO**

---

### **PASO 0.5: VERIFICAR ELEMENTOS DEL HEADER EN LA IMAGEN** ⚠️ CRÍTICO

**ANTES de implementar el header del DataTable, SIEMPRE verificar qué elementos están presentes en la imagen:**

1. **Verificar elementos del header visibles:**
   - ✅ ¿Hay título? (ej: "Lista de encuestas")
   - ✅ ¿Hay contador? (ej: "206 encuestas")
   - ✅ ¿Hay botón de búsqueda? (input con icono de búsqueda)
   - ✅ ¿Hay botón de filtros? (botón con icono de filtro)
   - ✅ ¿Hay selector de columnas? (botón con icono de columnas)
   - ✅ ¿Hay botón primario? (ej: "+ Crear encuesta")
   - ✅ ¿Hay botones secundarios? (ej: "Crear con plantilla")

2. **⚠️ CRÍTICO: Documentar qué NO está presente:**
   ```markdown
   ### Análisis de elementos del header:
   - ✅ Título: "Lista de encuestas" (presente)
   - ✅ Contador: "206 encuestas" (presente)
   - ❌ Botón de búsqueda: NO presente en la imagen
   - ❌ Botón de filtros: NO presente en la imagen
   - ❌ Selector de columnas: NO presente en la imagen
   - ✅ Botón primario: "+ Crear encuesta" (presente)
   - ❌ Botones secundarios: NO presentes en la imagen
   ```

3. **⚠️ REGLA CRÍTICA:** 
   - **NO implementar elementos que NO están en la imagen**
   - **Solo implementar lo que está visible en la imagen**
   - **Si no hay botón de filtros en la imagen, NO agregar `filterButton`**
   - **Si no hay búsqueda en la imagen, NO agregar `searchButton`**
   - **Si no hay selector de columnas en la imagen, NO agregar `columnSelectorButton`**

**Ejemplo de análisis correcto:**
```markdown
### Elementos del header identificados en la imagen:
- ✅ Título: "Lista de encuestas"
- ✅ Contador: "206 encuestas"
- ✅ Botón primario: "+ Crear encuesta"
- ❌ Botón de búsqueda: NO presente
- ❌ Botón de filtros: NO presente
- ❌ Selector de columnas: NO presente
- ❌ Botones secundarios: NO presentes

### Configuración del DataTable:
```javascript
header: {
  title: 'Lista de encuestas',
  counter: '206 encuestas',
  primaryButton: {
    text: 'Crear encuesta',
    icon: 'plus',
    onClick: () => { /* ... */ }
  }
  // ❌ NO agregar searchButton, filterButton, columnSelectorButton, secondaryButtons
}
```
```

**Ver error común:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - ERROR CRÍTICO #28

---

### **PASO 0.6: ANÁLISIS DETALLADO DE BOTONES DEL HEADER** ⚠️ CRÍTICO

**ANTES de implementar los botones del header, SIEMPRE hacer un análisis detallado de cada botón:**

#### **1. Identificar TODOS los botones visibles:**
- ¿Cuántos botones hay en total?
- ¿Cuáles son primarios y cuáles secundarios?
- ¿Están todos identificados en el análisis?

#### **2. Para CADA botón, documentar:**

**Formato obligatorio:**
```markdown
### Botón [Primario/Secundario] #X

- **Texto visible:** "[texto exacto]" ⚠️ OBLIGATORIO
- **Icono:** `[nombre-icono]` (ej: `plus`, `file-lines`)
- **Estilo del icono:** `regular` o `solid`
- **Tipo:** `primary` o `secondary`
- **Variante:** `iconOnly` o `icono + texto`
- **Verificación de duplicación:** ¿El texto incluye símbolos que el icono ya muestra? (ej: "+" con icono `plus`)
```

**Ejemplo correcto:**
```markdown
### Botón Primario #1

- **Texto visible:** "Crear encuesta" ✅
- **Icono:** `plus` (fa-plus) ✅
- **Estilo del icono:** `regular` ✅
- **Tipo:** `primary` ✅
- **Variante:** `icono + texto` ✅
- **Verificación de duplicación:** ✅ NO incluir "+" en el texto (el icono `plus` ya lo muestra)

### Botón Secundario #1

- **Texto visible:** "Crear con plantilla" ✅
- **Icono:** `file-lines` (fa-file-lines) ✅ (NO `file` genérico)
- **Estilo del icono:** `regular` ✅
- **Tipo:** `secondary` ✅
- **Variante:** `icono + texto` ✅
- **Verificación de duplicación:** ✅ No aplica
```

#### **3. ⚠️ ERRORES COMUNES A EVITAR:**

**❌ ERROR #1: No identificar texto visible**
```markdown
// ❌ INCORRECTO
- Botón primario: icono `plus`
// ❌ Falta el texto visible
```

```markdown
// ✅ CORRECTO
- Botón primario: 
  - Texto: "Crear encuesta"
  - Icono: `plus`
```

**❌ ERROR #2: Doble signo +**
```javascript
// ❌ INCORRECTO
primaryButton: {
  text: '+ Crear encuesta', // ❌ Doble + (icono + texto)
  icon: 'plus'
}
```

```javascript
// ✅ CORRECTO
primaryButton: {
  text: 'Crear encuesta', // ✅ Solo texto (el icono ya muestra el +)
  icon: 'plus'
}
```

**❌ ERROR #3: Icono genérico en lugar de específico**
```javascript
// ❌ INCORRECTO
secondaryButtons: [{
  text: 'Crear con plantilla',
  icon: 'file' // ❌ Genérico
}]
```

```javascript
// ✅ CORRECTO
secondaryButtons: [{
  text: 'Crear con plantilla',
  icon: 'file-lines' // ✅ Específico para plantilla/documento con líneas
}]
```

**❌ ERROR #4: No implementar todos los botones**
```javascript
// ❌ INCORRECTO: Solo botón primario
header: {
  primaryButton: { /* ... */ }
  // ❌ Falta secondaryButtons
}
```

```javascript
// ✅ CORRECTO: Todos los botones identificados
header: {
  primaryButton: { /* ... */ },
  secondaryButtons: [{ /* ... */ }] // ✅ Implementado
}
```

#### **4. Checklist de verificación:**

- [ ] ¿Se identificó el texto visible de CADA botón? ⚠️ OBLIGATORIO
- [ ] ¿Se identificó el icono de CADA botón?
- [ ] ¿Se verificó que el texto NO duplica símbolos del icono? (ej: "+" con icono `plus`)
- [ ] ¿Se usó el icono más apropiado? (ej: `file-lines` en lugar de `file`)
- [ ] ¿Se documentó si es `iconOnly` o `icono + texto`?
- [ ] ¿Se implementaron TODOS los botones identificados?
- [ ] ¿Se verificó que el DataTable soporte texto e icono? (puede requerir modificar código fuente)

**Ver análisis completo de errores:** `docs/guias/analisis/ANALISIS-ERROR-BOTONES-HEADER-DATATABLE.md` - ⚠️ **OBLIGATORIO**

---

### **PASO 0.7: VERIFICAR FUNCIONALIDADES NO VISIBLES** ⚠️ CRÍTICO

**⚠️ OBLIGATORIO:** Antes de implementar, SIEMPRE consultar la guía completa de funcionalidades:
- **Ver:** `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` - ⚠️ **OBLIGATORIO**

Esta guía lista **TODAS** las funcionalidades disponibles del DataTable (basadas en las historias de Storybook) y especifica cuáles están presentes en la imagen.

**Proceso obligatorio:**
1. **Consultar Storybook** para ver todas las funcionalidades disponibles
2. **Analizar la imagen** para identificar cuáles están presentes
3. **Listar TODAS las funcionalidades** con SÍ/NO para cada una
4. **Documentar en el análisis** qué funcionalidades implementar y cuáles NO

**ANTES de implementar, SIEMPRE verificar en la imagen:**

1. **¿Hay opción de expandir filas?**
   - Buscar iconos de expandir/colapsar en las filas
   - Si NO hay → Configurar `rowExpandable: false`
   - Si SÍ hay → Configurar `rowExpandable: true` + agregar `renderExpandedContent` a cada fila
   - ⚠️ **ERROR COMÚN:** Dejar `rowExpandable: true` por defecto cuando NO está en la imagen

2. **¿Hay columnas fijas (Pinned Columns)?**
   - ⚠️ **CRÍTICO:** "Pinned Columns" se refiere a la funcionalidad del menú de columnas, NO a columnas sticky
   - Buscar si hay opción de fijar columnas en el menú de columnas
   - Si NO hay → NO configurar `pinned: true` en ninguna columna
   - Si SÍ hay → Configurar `pinned: true` solo en las columnas que están fijas
   - ⚠️ **ERROR COMÚN:** Configurar columnas fijas cuando NO están en la imagen → Esto redimensiona la tabla incorrectamente

3. **¿La tabla debe aprovechar todo el espacio vertical?**
   - Verificar si la tabla llega hasta abajo de la pantalla
   - Si SÍ → Configurar altura dinámica después de crear el DataTable
   - ⚠️ **ERROR COMÚN:** Dejar altura fija por defecto (400px), no aprovecha espacio vertical

**Documentar en el análisis:**
```markdown
### Funcionalidades verificadas (ver GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md):
- ✅ Column Sortable: SÍ (iconos visibles)
- ✅ Checkbox Selection: SÍ (checkboxes visibles)
- ❌ Row Expandable: NO (configurar `rowExpandable: false`)
- ❌ Pinned Columns: NO (NO configurar `pinned: true`)
- ❌ Column Reorderable: NO (no implementar)
- ❌ Row Reorderable: NO (no implementar)
- ❌ Pagination: NO (no implementar)
- ❌ Lazy Load: NO (desactivar para pocos items)
- ✅ Altura dinámica: SÍ (configurar después de crear)
```

---

### **PASO 1: IDENTIFICAR QUE TODO ES DATATABLE**

**Cuando analices una imagen con una tabla:**

❌ **INCORRECTO:**
```markdown
### Componentes identificados:
1. Título "Lista de encuestas" - Componente separado
2. Contador "206 encuestas" - Componente separado
3. Barra de acciones (búsqueda, filtros, botones) - Componente separado
4. DataTable - Componente separado
```

✅ **CORRECTO:**
```markdown
### Componentes identificados:
1. Tabs de navegación - `window.createTabs()` (componente separado)
2. DataTable - `window.createDataTable()` (componente completo que incluye):
   - Header con título "Lista de encuestas"
   - Header con contador "206 encuestas"
   - Header con búsqueda, filtros y botones
   - Tabla con columnas y filas
```

---

### **PASO 1.5: VERIFICAR TIPOS DE COLUMNAS CORRECTOS** ⚠️ CRÍTICO

**ANTES de implementar, SIEMPRE verificar visualmente en la imagen el tipo de dato de cada columna:**

1. **Estado:**
   - ¿Muestra un badge/tag de estado? (ej: "En progreso" en azul)
   - Si SÍ → `type: 'estado'` (NO `type: 'text'`)
   - ⚠️ **ERROR COMÚN:** Usar `type: 'text'` cuando debería ser `type: 'estado'`

2. **Avance:**
   - ¿Muestra una barra de progreso? (ej: barra azul con porcentaje)
   - Si SÍ → `type: 'progreso'` (NO `type: 'text'`)
   - ⚠️ **ERROR COMÚN:** Usar `type: 'text'` cuando debería ser `type: 'progreso'`

3. **Fechas:**
   - ¿Muestra fechas formateadas? (ej: "10 - octubre - 2026")
   - Si SÍ → `type: 'fecha'` (NO `type: 'text'`)

4. **Números:**
   - ¿Muestra números formateados? (ej: "200", "50%")
   - Si SÍ → `type: 'numero'` (NO `type: 'text'`)

**Documentar en el análisis:**
```markdown
### Tipos de columnas verificados:
- ✅ Estado: `type: 'estado'` (muestra badge/tag, NO texto)
- ✅ Avance: `type: 'progreso'` (muestra barra de progreso, NO texto)
- ✅ Fechas: `type: 'fecha'` (si aplica)
- ✅ Números: `type: 'numero'` (si aplica)
```

---

### **PASO 2: ESTRUCTURA BASE CORRECTA**

**Al crear la estructura base:**

❌ **INCORRECTO:**
```html
<!-- Título separado -->
<div id="encuestas-title-container">
  <h1>Lista de encuestas <span>206 encuestas</span></h1>
</div>

<!-- Barra de acciones separada -->
<div id="encuestas-actions-bar">
  <input type="search" />
  <button>Filtro</button>
  <button>Crear</button>
</div>

<!-- DataTable separado -->
<div id="encuestas-table-container"></div>
```

✅ **CORRECTO:**
```html
<!-- Solo contenedores vacíos, sin textos -->
<div id="encuestas-tabs-container"></div>
<div id="encuestas-table-container"></div>
```

**Razón:** El DataTable se configurará con `header.title`, `header.counter`, `header.searchButton`, etc. Todo se renderiza dentro del contenedor del DataTable.

---

### **PASO 3: IMPLEMENTACIÓN POR PARTES**

**Aunque es UN componente, se implementa por partes debido a su complejidad:**

```markdown
### Plan de implementación del DataTable:

**Tarea 1:** DataTable básico (solo estructura de tabla, sin header)
**Tarea 2:** Agregar header con título y contador
**Tarea 3:** Agregar header con búsqueda
**Tarea 4:** Agregar header con filtros
**Tarea 5:** Agregar header con botones (primario y secundarios)
**Tarea 6:** Funcionalidades de la tabla (checkboxes, sorting, etc.)
```

**⚠️ IMPORTANTE:** Cada tarea configura el DataTable con más opciones, pero TODO se renderiza dentro del mismo contenedor `#encuestas-table-container`.

---

## 📐 ESTRUCTURA VISUAL CORRECTA

### **Lo que ves en la imagen:**

```
┌─────────────────────────────────────────┐
│ Tabs (componente separado)              │
├─────────────────────────────────────────┤
│ DataTable (UN SOLO componente):        │
│ ┌─────────────────────────────────────┐ │
│ │ Header:                             │ │
│ │   - Título: "Lista de encuestas"    │ │
│ │   - Contador: "206 encuestas"       │ │
│ │   - Búsqueda [🔍]                   │ │
│ │   - Filtro [🔽]                     │ │
│ │   - Grid [⊞]                        │ │
│ │   - "Crear con plantilla" [📄]      │ │
│ │   - "+ Crear encuesta" [➕]         │ │
│ ├─────────────────────────────────────┤ │
│ │ Tabla:                               │ │
│ │   - Columnas: Nombre, Tipo, Estado...│ │
│ │   - Filas con datos                 │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### **Estructura HTML resultante:**

```html
<!-- Tabs (componente separado) -->
<div id="encuestas-tabs-container"></div>

<!-- DataTable (TODO dentro de un solo contenedor) -->
<div id="encuestas-table-container">
  <!-- El DataTable renderiza TODO internamente:
       - Header con título, contador, búsqueda, filtros, botones
       - Tabla con columnas y filas
  -->
</div>
```

---

## 🔧 CONFIGURACIÓN DEL DATATABLE

### **Ejemplo de configuración completa:**

```javascript
window.createDataTable({
  containerId: 'encuestas-table-container',
  
  // Header del DataTable (TODO esto es parte del componente)
  header: {
    title: 'Lista de encuestas',
    counter: '206 encuestas', // o true para automático
    searchButton: {
      placeholder: 'Buscar encuestas...',
      onChange: (value) => { /* filtrar */ }
    },
    filterButton: {
      onClick: () => { /* abrir filtros */ }
    },
    primaryButton: {
      text: 'Crear encuesta',
      icon: 'plus',
      onClick: () => { /* crear */ }
    },
    secondaryButtons: [
      {
        text: 'Crear con plantilla',
        icon: 'file-lines', // ✅ Específico para plantilla (NO 'file' genérico)
        iconStyle: 'regular',
        onClick: () => { /* crear con plantilla */ }
      }
    ]
  },
  
  // Tabla
  columns: [ /* ... */ ],
  rows: [ /* ... */ ],
  
  // ⚠️ CRÍTICO: Configuración de LazyLoad
  // Para pocos items (< 50-100), desactivar lazy load para mostrar todos de inmediato
  lazyLoad: false, // ✅ Desactivar lazy load para pocos items
  // Si hay muchos items (> 100), activar lazy load:
  // lazyLoad: true,
  // lazyLoadItemsPerBatch: 50, // O el valor apropiado
});
```

### **⚠️ CONFIGURACIÓN CRÍTICA: LazyLoad**

**El DataTable tiene `lazyLoad: true` por defecto cuando `showPagination: false`, lo que significa que solo muestra 10 items inicialmente.**

**SIEMPRE configurar según la cantidad de items:**

```javascript
// ✅ Para pocos items (< 50-100): Desactivar lazy load
const dataTableOptions = {
  lazyLoad: false, // ✅ Mostrar todos los items de inmediato
  // ... otras opciones
};

// ✅ Para muchos items (> 100): Activar lazy load con batch apropiado
const dataTableOptions = {
  lazyLoad: true,
  lazyLoadItemsPerBatch: 50, // ✅ Cargar 50 items por batch
  // ... otras opciones
};

// ✅ Si lazy load está activo pero hay pocos items: Cargar todos de una vez
const dataTableOptions = {
  lazyLoad: true, // Por alguna razón debe estar activo
  lazyLoadItemsPerBatch: items.length, // ✅ Cargar todos los items de una vez
  // ... otras opciones
};
```

**⚠️ REGLA CRÍTICA:**
- **Pocos items (< 50-100):** `lazyLoad: false` → Mostrar todos de inmediato
- **Muchos items (> 100):** `lazyLoad: true` → Usar lazy load con batch apropiado
- **Verificar:** El contador debe coincidir con los items visibles

**Ver análisis completo:** `docs/guias/analisis/ANALISIS-ERROR-LAZYLOAD-MUESTRA-SOLO-10-ITEMS.md` - ⚠️ **OBLIGATORIO**

---

## ✅ CHECKLIST DE ANÁLISIS CORRECTO

Al analizar una imagen con tabla:

- [ ] **⚠️ CRÍTICO: Contar cantidad de items/filas visibles en la imagen**
- [ ] **⚠️ CRÍTICO: Verificar si hay scroll o paginación**
- [ ] **⚠️ CRÍTICO: Documentar cantidad de items a crear (mínimo 10-15 si hay scroll)**
- [ ] **⚠️ CRÍTICO: Verificar tipos de columnas correctos:**
  - [ ] ¿Estado muestra badge/tag? → `type: 'estado'` (NO `type: 'text'`)
  - [ ] ¿Avance muestra barra de progreso? → `type: 'progreso'` (NO `type: 'text'`)
  - [ ] ¿Fechas están formateadas? → `type: 'fecha'` (NO `type: 'text'`)
  - [ ] ¿Números están formateados? → `type: 'numero'` (NO `type: 'text'`)
- [ ] **⚠️ CRÍTICO: Verificar funcionalidades NO visibles:**
  - [ ] ¿Hay opción de expandir filas? → Si NO, configurar `rowExpandable: false`
  - [ ] ¿Hay columnas fijas? → Si NO, NO configurar `pinned: true`
  - [ ] ¿La tabla debe aprovechar espacio vertical? → Si SÍ, configurar altura dinámica
- [ ] **⚠️ CRÍTICO: Verificar elementos del header presentes en la imagen**
  - [ ] Título: ¿Está presente? → Documentar ✅ o ❌
  - [ ] Contador: ¿Está presente? → Documentar ✅ o ❌
  - [ ] Búsqueda: ¿Está presente? → Documentar ✅ o ❌
  - [ ] Filtros: ¿Está presente? → Documentar ✅ o ❌
  - [ ] Selector de columnas: ¿Está presente? → Documentar ✅ o ❌
  - [ ] Botón primario: ¿Está presente? → Documentar ✅ o ❌
    - [ ] **Texto visible:** ¿Cuál es el texto exacto? ⚠️ OBLIGATORIO
    - [ ] **Icono:** ¿Cuál es el icono? (verificar que NO duplique símbolos del texto)
    - [ ] **Variante:** ¿Es `iconOnly` o `icono + texto`?
  - [ ] Botones secundarios: ¿Están presentes? → Documentar ✅ o ❌
    - [ ] **Para cada botón secundario:**
      - [ ] **Texto visible:** ¿Cuál es el texto exacto? ⚠️ OBLIGATORIO
      - [ ] **Icono:** ¿Cuál es el icono? (usar el más apropiado, no genérico)
      - [ ] **Variante:** ¿Es `iconOnly` o `icono + texto`?
- [ ] **⚠️ CRÍTICO: Documentar explícitamente qué elementos NO están presentes**
- [ ] **⚠️ CRÍTICO: Verificar que el texto NO duplique símbolos del icono** (ej: "+" con icono `plus`)
- [ ] **Identificar que Título + Contador + Búsqueda + Filtros + Botones + Tabla = DataTable completo**
- [ ] **NO crear contenedores separados para título o barra de acciones**
- [ ] **Solo crear contenedor para DataTable: `#encuestas-table-container`**
- [ ] **Documentar que TODO se implementará por partes debido a la complejidad**
- [ ] **Aclarar que es UN SOLO componente, no múltiples componentes**
- [ ] **⚠️ CRÍTICO: NO implementar elementos que NO están en la imagen**
- [ ] **⚠️ CRÍTICO: Configurar lazyLoad correctamente según cantidad de items**
  - [ ] ¿Cuántos items hay en total?
  - [ ] ¿Son pocos (< 50-100) o muchos (> 100)?
  - [ ] **Para pocos items:** `lazyLoad: false` → Mostrar todos de inmediato
  - [ ] **Para muchos items:** `lazyLoad: true` → Usar lazy load con batch apropiado
  - [ ] **Verificar:** ¿El contador coincide con los items visibles?

---

## 🚨 ERRORES COMUNES A EVITAR

### **Error 1: Separar Título y Barra de Acciones**

❌ **INCORRECTO:**
```html
<div id="title-container">Lista de encuestas</div>
<div id="actions-bar">Búsqueda, filtros, botones</div>
<div id="table-container">Tabla</div>
```

✅ **CORRECTO:**
```html
<div id="table-container">
  <!-- DataTable renderiza TODO internamente -->
</div>
```

### **Error 2: Crear Textos en Estructura Base**

❌ **INCORRECTO:**
```html
<div id="title-container">
  <h1>Lista de encuestas <span>206 encuestas</span></h1>
</div>
```

✅ **CORRECTO:**
```html
<div id="table-container"></div>
<!-- Los textos se configuran en DataTableOptions.header -->
```

### **Error 3: No Contar Items/Filas en la Imagen** ⚠️ CRÍTICO

❌ **INCORRECTO:**
```javascript
// Solo crear 2-3 items de ejemplo
rows: [
  { id: '1', nombre: 'Encuesta 1', ... },
  { id: '2', nombre: 'Encuesta 2', ... },
  { id: '3', nombre: 'Encuesta 3', ... }
]
```

✅ **CORRECTO:**
```markdown
### Análisis de cantidad de items:
- Filas visibles en imagen: 12 filas
- Scroll visible: Sí
- Contador en header: "206 encuestas"
- Items a crear: Mínimo 15-20 items para mostrar scroll correctamente
```

```javascript
// Crear cantidad razonable que refleje la imagen
rows: (() => {
  const tipos = ['Cultura', 'Satisfacción', 'Clima', 'Desempeño', 'Innovación'];
  const estados = ['en-progreso', 'completada', 'pausada', 'programada'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  const cantidadItems = 20; // Mínimo para mostrar scroll
  const items = [];
  
  for (let i = 1; i <= cantidadItems; i++) {
    const tipo = tipos[i % tipos.length];
    const estado = estados[i % estados.length];
    const año = 2025 + (i % 2);
    const mesIndex = (i - 1) % meses.length;
    const mesInicio = meses[mesIndex];
    const mesCierre = meses[(mesIndex + 1) % meses.length];
    const diaInicio = (i % 28) + 1;
    const diaCierre = ((i + 5) % 28) + 1;
    
    items.push({
      id: `encuesta-${i}`,
      data: {
        nombre: `${tipo} ${año}${i > 10 ? ' - ' + (i > 15 ? 'Segunda' : 'Primera') + ' fase' : ''}`,
        tipo: tipo,
        estado: estado,
        inicio: `${diaInicio} - ${mesInicio} - ${año}`,
        cierre: `${diaCierre} - ${mesCierre} - ${año}`,
        participantes: String(Math.floor(Math.random() * 300) + 50),
        avance: Math.floor(Math.random() * 100)
      }
    });
  }
  
  return items;
})()
```

**Ver guía completa:** `docs/guias/implementacion/GUIA-GENERAR-ITEMS-DATATABLE.md` - ⚠️ **OBLIGATORIO**

**Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #15

---

## 📚 Referencias

- **Análisis de funcionalidades:** `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` - ⚠️ **OBLIGATORIO** - Lista TODAS las funcionalidades del DataTable con SÍ/NO para cada una
- **DataTableOptions:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Guía implementación:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Storybook DataTable:** Ver ejemplos en Storybook para ver todas las opciones
- **Storybook URL:** `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.1.0 (agregada referencia a guía de funcionalidades)

