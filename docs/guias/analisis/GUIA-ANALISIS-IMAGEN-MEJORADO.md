# 🖼️ Guía: Análisis Mejorado de Imágenes con Documentación Automática

> **⚠️ CRÍTICO:** Esta guía integra automáticamente la documentación completa de componentes UBITS para hacer análisis más precisos y completos.

---

## 🎯 OBJETIVO

Crear un análisis sistemático y completo de imágenes que:
1. ✅ Use automáticamente la documentación de componentes
2. ✅ Identifique TODOS los componentes y subcomponentes
3. ✅ Identifique TODAS las subfuncionalidades
4. ✅ Use la documentación para verificar props y opciones
5. ✅ Cree un plan de implementación preciso y completo

---

## 🔄 PROCESO MEJORADO (OBLIGATORIO)

### **FASE 0: PREPARACIÓN** 📚

**ANTES de analizar la imagen, cargar automáticamente:**

1. **Catálogo de componentes:**
   - `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
   - Para identificar qué componentes existen

2. **Documentación de componentes:**
   - `docs/referencia/componentes/README.md` - Índice completo
   - Para mapear componentes a su documentación

3. **Guías de análisis:**
   - `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`
   - `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md`
   - `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md`
   - `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` (si hay DataTable)
   - `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` (si hay DataTable)

---

### **FASE 1: IDENTIFICACIÓN SISTEMÁTICA DE COMPONENTES** 🔍

#### **1.1 Identificar Componentes Principales**

**Para cada elemento visible en la imagen, verificar:**

1. **¿Es un componente UBITS?**
   - Consultar catálogo: `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
   - Buscar por descripción visual
   - Verificar en documentación: `docs/referencia/componentes/[nombre].md`

2. **Si es componente UBITS:**
   - ✅ Cargar documentación específica automáticamente
   - ✅ Identificar subcomponentes y subfuncionalidades
   - ✅ Verificar props y opciones disponibles

3. **Si NO es componente UBITS:**
   - ❌ NO implementar como componente UBITS
   - ✅ Preguntar al usuario si debe crearse con tokens UBITS

#### **1.2 Identificar Subcomponentes Automáticamente** ⭐

**Para cada componente identificado, usar su documentación para identificar subcomponentes:**

**Ejemplo con DataTable:**
1. Cargar: `docs/referencia/componentes/data-data-table.md`
2. Identificar subcomponentes documentados:
   - Header (con título, contador, botones)
   - Columnas (11 tipos diferentes)
   - Filas (con datos)
   - Action Bar (para selecciones)
   - Empty State (sin datos/búsqueda)
3. Verificar en la imagen cuáles están presentes

**Ejemplo con Modal:**
1. Cargar: `docs/referencia/componentes/feedback-modal.md`
2. Identificar subcomponentes documentados:
   - Header (con título)
   - Body (con contenido)
   - Footer (con botones configurables)
3. Verificar en la imagen cuáles están presentes

#### **1.3 Identificar Subfuncionalidades Automáticamente** ⭐

**Para cada componente identificado, usar su documentación para identificar subfuncionalidades:**

**Ejemplo con DataTable:**
1. Cargar: `docs/referencia/componentes/data-data-table.md`
2. Leer sección "Opciones y Props"
3. Identificar todas las props booleanas (funcionalidades):
   - `showCheckbox: true/false` → Checkboxes
   - `columnSortable: true/false` → Ordenamiento
   - `columnReorderable: true/false` → Reordenamiento de columnas
   - `rowReorderable: true/false` → Reordenamiento de filas
   - `rowExpandable: true/false` → Filas expandibles
   - `showColumnMenu: true/false` → Menú de columnas
   - `showContextMenu: true/false` → Menú contextual
   - `header.searchButton` → Búsqueda
   - `header.filterButton` → Filtros
   - `header.columnSelectorButton` → Selector de columnas
4. Verificar en la imagen cuáles están presentes

**Ejemplo con Tabs:**
1. Cargar: `docs/referencia/componentes/navegacin-tabs.md`
2. Identificar subfuncionalidades:
   - Tabs individuales con iconos
   - Estados activos/inactivos
   - Callbacks de cambio
3. Verificar en la imagen cuáles están presentes

---

### **FASE 2: ANÁLISIS DETALLADO CON DOCUMENTACIÓN** 📖

#### **2.1 Para Cada Componente Identificado**

**Proceso automático:**

1. **Cargar documentación específica:**
   - `docs/referencia/componentes/[nombre-componente].md`

2. **Extraer información:**
   - ✅ Descripción completa
   - ✅ Props y opciones disponibles
   - ✅ Ejemplos de código
   - ✅ Tipos/variantes disponibles
   - ✅ Errores comunes específicos
   - ✅ Tokens utilizados

3. **Comparar con la imagen:**
   - ¿Qué props se necesitan según la imagen?
   - ¿Qué variantes se ven en la imagen?
   - ¿Qué subfuncionalidades están presentes?

#### **2.2 Análisis de DataTable (si aplica)** ⚠️ CRÍTICO

**Si hay DataTable en la imagen, seguir proceso completo:**

1. **Cargar documentación:**
   - `docs/referencia/componentes/data-data-table.md`
   - `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
   - `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md`

2. **Contar items/filas:**
   - Filas visibles en la imagen
   - Scroll o paginación visible
   - Contador en header (si hay)
   - Items a crear (mínimo 10-15 si hay scroll)

3. **Analizar columnas:**
   - Para cada columna, identificar tipo exacto:
     - Consultar documentación: "Tipos de columnas disponibles"
     - Verificar visualmente en la imagen
     - NO asumir `type: 'text'` por defecto

4. **Analizar funcionalidades:**
   - Usar checklist de funcionalidades de la documentación
   - Verificar SÍ/NO para cada funcionalidad
   - Documentar evidencia visual

5. **Analizar header:**
   - Verificar elementos presentes:
     - Título (¿hay título visible?)
     - Contador (¿hay contador visible?)
     - Búsqueda (¿hay input de búsqueda?)
     - Filtros (¿hay botón de filtros?)
     - Selector de columnas (¿hay botón de selector?)
     - Botón primario (¿hay botón principal?)
     - Botones secundarios (¿hay botones secundarios?)

#### **2.3 Análisis de Iconos** 🎨

**Para cada icono visible:**

1. **Analizar visualmente:**
   - Forma del icono
   - ¿Es simple/minimalista?
   - ¿Es outline o filled?

2. **Consultar guía:**
   - `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md`

3. **Verificar variaciones:**
   - Buscar variaciones posibles (`-simple`, `-regular`, etc.)
   - Comparar con la imagen
   - Documentar variación exacta

#### **2.4 Análisis de Estructura y Spacing** 📐

**Para la estructura completa:**

1. **Consultar guía:**
   - `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`

2. **Identificar orden de elementos:**
   - ¿Qué va primero?
   - ¿Qué va después?
   - Jerarquía visual

3. **Identificar contenedores:**
   - ¿Qué elementos van en contenedores?
   - ¿Qué elementos NO van en contenedores?
   - ¿Qué elementos van en contenedores independientes?

4. **Medir spacing visualmente:**
   - ⚠️ CRÍTICO: NO asumir, medir visualmente
   - Mapear a tokens UBITS específicos
   - Documentar cada espacio entre elementos

---

### **FASE 3: VERIFICACIONES CRÍTICAS** ⚠️

#### **3.1 Verificar SubNav vs Tabs**

1. **Consultar guía:**
   - `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md`

2. **Identificar en la imagen:**
   - ¿Es SubNav? (barra horizontal debajo del header) → Ya existe, NO implementar
   - ¿Es Tabs? (tabs dentro del contenido) → Implementar con `window.createTabs()`

3. **Documentar claramente:**
   - "SubNav: Ya existe (tabs: [X, Y])" o "SubNav: NO"
   - "Tabs: Implementar (tabs: [X, Y])" o "Tabs: NO (solo SubNav existe)"

#### **3.2 Verificar HeaderSection**

1. **¿Hay HeaderSection visible en la imagen?**
   - Si NO hay → Eliminar del template
   - Si SÍ hay → Mantener y verificar título/botones

2. **Documentar:**
   - "HeaderSection: NO (debe eliminarse)" o "HeaderSection: SÍ (título: [X], botón: [Y])"

#### **3.3 Verificar Contenedor .content-sections**

1. **¿Hay componentes personalizados?**
   - Si SÍ → Eliminar `.content-sections`
   - Si NO → Mantener `.content-sections`

2. **Documentar:**
   - "content-sections: NO (eliminar, hay componentes personalizados)" o "content-sections: SÍ (mantener)"

---

### **FASE 4: CREAR PLAN CON DOCUMENTACIÓN** 📋

#### **4.1 Plan de Implementación Mejorado**

**Basado en la documentación cargada, crear plan:**

```markdown
## 📋 Plan de Implementación Mejorado

### Componentes Identificados (con documentación):

#### 1. DataTable
- **Documentación:** `docs/referencia/componentes/data-data-table.md`
- **Subcomponentes identificados:**
  - Header: SÍ (título: "Lista de encuestas", contador: "206 encuestas")
  - Columnas: 5 columnas (tipos identificados abajo)
  - Filas: 10 filas visibles, scroll presente
  - Action Bar: SÍ (cuando hay checkboxes)
  - Empty State: NO visible en imagen

- **Subfuncionalidades identificadas:**
  - ✅ Checkboxes: SÍ (`showCheckbox: true`) - Evidencia: columna de checkbox visible
  - ✅ Action Bar: SÍ (cuando hay checkboxes) - Evidencia: se muestra cuando hay selección
  - ❌ Filtros: NO (`header.filterButton: undefined`) - Evidencia: no hay botón de filtros visible
  - ❌ Búsqueda: NO (`header.searchButton: undefined`) - Evidencia: no hay input de búsqueda visible
  - ✅ Ordenamiento: SÍ (`columnSortable: true`) - Evidencia: iconos de ordenamiento en headers
  - ❌ Reordenamiento: NO (`columnReorderable: false`) - Evidencia: no hay iconos de drag en headers
  - ❌ Filas expandibles: NO (`rowExpandable: false`) - Evidencia: no hay iconos de expandir

- **Tipos de columnas identificados:**
  - Columna 1: `type: 'nombre'` - Evidencia: muestra nombre con avatar
  - Columna 2: `type: 'estado'` - Evidencia: muestra badge/tag de estado
  - Columna 3: `type: 'progreso'` - Evidencia: muestra barra de progreso
  - Columna 4: `type: 'fecha'` - Evidencia: fecha formateada
  - Columna 5: `type: 'acciones'` - Evidencia: botones de acción

- **Props a usar (verificadas en documentación):**
  - `containerId: 'table-container'`
  - `columns: [...]` (5 columnas con tipos identificados)
  - `rows: [...]` (mínimo 10-15 items)
  - `showCheckbox: true`
  - `columnSortable: true`
  - `header: { title: 'Lista de encuestas', counter: '206 encuestas' }`

#### 2. Tabs
- **Documentación:** `docs/referencia/componentes/navegacin-tabs.md`
- **Subcomponentes identificados:**
  - Tabs individuales: 3 tabs
  - Estados: activo/inactivo

- **Subfuncionalidades identificadas:**
  - ✅ Tabs con iconos: SÍ - Evidencia: iconos visibles en cada tab
  - ✅ Callbacks: SÍ - Evidencia: tabs cambian contenido

- **Props a usar:**
  - `tabs: [{ id: 'tab1', label: 'Tab 1', icon: 'list-ul' }, ...]`
  - `onTabChange: (tabId) => { ... }`

### Estructura y Contenedores (MEDIDO VISUALMENTE):

1. **SubNav:** Ya existe (sin contenedor)
2. **Tabs:** Sin contenedor, directo después del SubNav
3. **DataTable:** Contenedor `<div id="table-container">` (requerido por el componente)

### Spacing Específico (MEDIDO VISUALMENTE):
- **Entre SubNav y Tabs:** `--ubits-spacing-lg` (16px) ⚠️ MEDIDO
- **Entre Tabs y DataTable:** `--ubits-spacing-lg` (16px) ⚠️ MEDIDO

### Tareas Divididas (una subfuncionalidad por tarea):

1. **Tarea 1:** Estructura HTML base + Tabs (solo tabs, nada más)
2. **Tarea 2:** DataTable básico (solo columnas y datos, sin funcionalidades)
3. **Tarea 3:** DataTable - Agregar checkboxes (`showCheckbox: true`)
4. **Tarea 4:** DataTable - Agregar Action Bar (cuando hay checkboxes)
5. **Tarea 5:** DataTable - Agregar ordenamiento (`columnSortable: true`)

### ¿Aprobar este plan?
```

---

## 📋 CHECKLIST DE ANÁLISIS MEJORADO

**Antes de mostrar el análisis, verificar:**

- [ ] ✅ Catálogo de componentes consultado
- [ ] ✅ Documentación de cada componente identificado leída
- [ ] ✅ Subcomponentes identificados para cada componente
- [ ] ✅ Subfuncionalidades identificadas para cada componente
- [ ] ✅ Tipos/variantes identificados (ej: tipos de columnas)
- [ ] ✅ Props verificadas en documentación
- [ ] ✅ Iconos analizados con variaciones
- [ ] ✅ Estructura y spacing medidos visualmente
- [ ] ✅ SubNav vs Tabs verificado
- [ ] ✅ HeaderSection verificado
- [ ] ✅ Contenedor .content-sections verificado
- [ ] ✅ DataTable - Items/filas contados (si aplica)
- [ ] ✅ DataTable - Tipos de columnas identificados (si aplica)
- [ ] ✅ DataTable - Funcionalidades verificadas SÍ/NO (si aplica)
- [ ] ✅ Plan de implementación creado con subfuncionalidades
- [ ] ✅ Análisis mostrado al usuario
- [ ] ✅ Aprobación explícita recibida

---

## 🚨 REGLAS CRÍTICAS DEL ANÁLISIS

1. **NUNCA asumir** - Verificar todo en la imagen
2. **NUNCA implementar** sin identificar TODOS los subcomponentes
3. **NUNCA implementar** sin identificar TODAS las subfuncionalidades
4. **SIEMPRE usar** documentación de componentes para verificar
5. **SIEMPRE medir** spacing visualmente (NO asumir)
6. **SIEMPRE contar** items/filas en DataTable
7. **SIEMPRE verificar** tipos de columnas visualmente
8. **SIEMPRE documentar** qué NO está presente (no solo lo que está)

---

## 📚 Referencias

- **Documentación de componentes:** `docs/referencia/componentes/`
- **Catálogo:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- **Estrategia de implementación:** `docs/referencia/ESTRATEGIA-IMPLEMENTACION-AUTOMATICA.md`
- **Implementación automática:** `.cursor/rules/06-implementacion-automatica.md`
- **Guías de análisis:** `docs/guias/analisis/`

---

**Última actualización:** 2025-12-05

