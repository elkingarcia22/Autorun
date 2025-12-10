# 🚨🚨🚨 BLOQUEO ABSOLUTO PARA IMÁGENES 🚨🚨🚨

> ⚠️ **DEPRECADO:** Este archivo ha sido consolidado en `.cursor/rules/02-bloqueo-imagen.md`  
> **Por favor, usa:** `.cursor/rules/02-bloqueo-imagen.md` en su lugar  
> **Fecha de deprecación:** 2025-01-03

---

## ⚠️⚠️⚠️ LEER ESTO PRIMERO SI HAY UNA IMAGEN ⚠️⚠️⚠️

**SI EL USUARIO ENVÍA UNA IMAGEN O PIDE CREAR/MODIFICAR DESDE IMAGEN:**

### 🚫 PROHIBIDO HACER ESTO:

- ❌ **NO escribir código JavaScript**
- ❌ **NO modificar archivos HTML**
- ❌ **NO buscar templates**
- ❌ **NO implementar componentes**
- ❌ **NO crear archivos nuevos**
- ❌ **NO reemplazar contenido**
- ❌ **NO hacer NADA hasta completar el análisis**

### 🚫 PROHIBIDO USAR ESTAS HERRAMIENTAS ANTES DEL ANÁLISIS:

- ❌ **NO usar `write()`** - PROHIBIDO antes de análisis
- ❌ **NO usar `search_replace()`** - PROHIBIDO antes de análisis
- ❌ **NO usar `read_file()` para templates** - PROHIBIDO antes de análisis (solo leer guías)
- ❌ **NO usar ninguna herramienta que modifique archivos** - PROHIBIDO antes de análisis

### ✅ SOLO PUEDES USAR:

- ✅ `read_file()` para leer `BLOQUEO-IMAGEN.md` y guías
- ✅ `list_dir()` para identificar templates existentes
- ✅ `grep()` para buscar referencias en guías
- ✅ Mostrar el análisis completo al usuario

### ✅ DEBES HACER ESTO PRIMERO:

1. **DETENER TODO INMEDIATAMENTE**
2. **LEER PRIMERO:** `VERIFICACION-IMAGEN.md` - ⚠️ OBLIGATORIO (archivo de verificación)
3. **LEER SEGUNDO:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`
4. **LEER TERCERO:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
5. **LEER CUARTO:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` - ⚠️ OBLIGATORIO para distinguir SubNav de Tabs
6. **LEER QUINTO:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO para spacing
7. **LEER SEXTO:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` - ⚠️ OBLIGATORIO para iconos
8. **LEER SÉPTIMO:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` - ⚠️ OBLIGATORIO si hay DataTable en la imagen
9. **LEER OCTAVO:** `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` - ⚠️ OBLIGATORIO si hay DataTable (lista TODAS las funcionalidades con SÍ/NO)
10. **LEER NOVENO:** `docs/guias/analisis/ANALISIS-ERROR-REDIMENSIONAR-DATATABLE-ESPACIO-VERTICAL-HORIZONTAL.md` - ⚠️ OBLIGATORIO si hay DataTable (análisis de errores al redimensionar)
11. **LEER DÉCIMO:** `docs/guias/implementacion/GUIA-REDIMENSIONAR-DATATABLE-ESPACIO-COMPLETO.md` - ⚠️ OBLIGATORIO si hay DataTable (cómo redimensionar correctamente)
12. **LEER UNDÉCIMO:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` - ⚠️ OBLIGATORIO si agregas elementos a `.content-area`
11. **IDENTIFICAR template existente** (buscar en `prototypes/`)
12. **ANALIZAR la imagen detalladamente:**
   - ⚠️ **🚨 CRÍTICO: Medir visualmente cada spacing en la imagen actual (NO asumir)**
   - ⚠️ **🚨 ERROR COMÚN: NO asumir que SubNav y Tabs están pegados (0px) - MEDIR en la imagen**
   - ⚠️ **🚨 ERROR COMÚN: NO asumir basándose en ejemplos anteriores - MEDIR cada caso**
   - ⚠️ **Comparar spacing medido con tokens disponibles antes de documentar**
   - ⚠️ **Verificar cada espacio individualmente en la imagen actual**
   - ⚠️ **Documentar la medida visual específica (ej: "16px medido visualmente")**
   - ⚠️ **Si hay DataTable: Consultar `GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` y listar TODAS las funcionalidades con SÍ/NO**
   - ⚠️ **Verificar si necesitas interceptar ContentManager antes de agregar elementos**
9. **MOSTRAR análisis completo al usuario** (formato obligatorio)
10. **ESPERAR aprobación explícita del usuario**
11. **SOLO DESPUÉS** de aprobación, implementar UNA tarea a la vez

### 📋 FORMATO OBLIGATORIO PARA MOSTRAR ANÁLISIS:

```markdown
## 📋 Análisis Detallado de la Imagen

### 🔍 Componentes UBITS Identificados:
1. [Componente 1] - [Tipo] - [Ubicación] - [¿Ya existe o se implementa?]
2. [Componente 2] - [Tipo] - [Ubicación] - [¿Ya existe o se implementa?]
...

### 🔍 SubNav vs Tabs (Verificación Obligatoria):
- **SubNav:** ¿Hay barra horizontal con tabs debajo del header?
  - Si SÍ → Ya existe en template, NO implementar
  - Documentar: "SubNav: Ya existe (tabs: [X, Y])"
- **Tabs:** ¿Hay tabs adicionales dentro del contenido principal?
  - Si SÍ → Implementar con `window.createTabs()`
  - Si NO → Documentar: "Tabs: NO (solo SubNav existe)"
- **Ver guía:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` - ⚠️ OBLIGATORIO

### 📋 HeaderSection (Verificación Obligatoria):
- **¿Hay HeaderSection visible en la imagen?** [SÍ / NO]
- **Si NO hay HeaderSection:**
  - ✅ DEBE eliminarse del template (viene por defecto)
  - Interceptar ContentManager para NO crear HeaderSection
  - Verificar módulo/sección antes de eliminar: `if (section !== 'encuestas') return`
- **Si SÍ hay HeaderSection:**
  - ✅ MANTENER HeaderSection
  - Título: [título si está visible]
  - Botón primario: [texto del botón si está visible]
- **Módulo afectado:** [encuestas / inicio / empresa / etc.]
...

### 🎨 Iconos Identificados (con variaciones):
1. [Icono 1]: 
   - Variaciones posibles: `icono-simple`, `icono`, `icono-regular`
   - Icono seleccionado: `icono-simple` (razón: [explicación visual])
2. [Icono 2]: ...
...

### 📐 Estructura Visual:
1. [Elemento 1] (sin contenedor / con contenedor: `#id`)
2. [Elemento 2] (sin contenedor / con contenedor: `#id`)
...

### 📏 Spacing Identificado (MEDIDO VISUALMENTE):
⚠️ **🚨 CRÍTICO:** Cada spacing debe ser MEDIDO VISUALMENTE en la imagen actual. NO asumir basándose en ejemplos anteriores.

- Entre [Elemento A] y [Elemento B]: `--ubits-spacing-lg` (16px) ⚠️ MEDIDO en la imagen
- Entre [Elemento B] y [Elemento C]: `--ubits-spacing-md` (12px) ⚠️ MEDIDO en la imagen
- ⚠️ **ERROR COMÚN:** Asumir que SubNav y Tabs están pegados (0px) cuando en realidad tienen 16px
- ⚠️ **VERIFICAR:** ¿Se midió visualmente cada spacing en la imagen actual? → Si NO, MEDIR primero

### 🔍 DataTable - Verificaciones Críticas (si aplica):
⚠️ **🚨 CRÍTICO:** Si hay una tabla/DataTable en la imagen, DEBES:

1. **Consultar Storybook** para ver TODAS las funcionalidades disponibles
2. **Leer:** `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` - ⚠️ OBLIGATORIO
3. **Listar TODAS las funcionalidades** con SÍ/NO para cada una según la imagen

**Formato obligatorio:**
```markdown
### 📊 Funcionalidades del DataTable (Análisis Completo):

⚠️ **OBLIGATORIO:** Consultar `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md` y Storybook

**Funcionalidades identificadas en la imagen:**

✅ **FUNCIONALIDADES QUE SÍ ESTÁN (IMPLEMENTAR):**
1. ✅ Column Sortable - `columnSortable: true` (iconos visibles)
2. ✅ Checkbox Selection - `showCheckbox: true` (checkboxes visibles)
3. ✅ Filters - `header.filterButton: true` (botón visible)
4. ✅ Search - `header.searchButton: true` (input visible)
5. ✅ Header - `header.title`, `header.counter` (título y contador visibles)
6. ✅ Header Buttons - `header.primaryButton`, `header.secondaryButtons` (botones visibles)
7. ✅ Column Types - Tipos específicos (estado, fecha, progreso)

❌ **FUNCIONALIDADES QUE NO ESTÁN (NO IMPLEMENTAR):**
1. ❌ Column Reorderable - `columnReorderable: false` (NO está presente)
2. ❌ Row Reorderable - `rowReorderable: false` (NO está presente)
3. ❌ Row Expandable - `rowExpandable: false` (NO hay iconos de expandir)
4. ❌ Pinned Columns - NO configurar `pinned: true` (NO está presente)
5. ❌ Pagination - `showPagination: false` (NO está presente)
6. ❌ Lazy Load - `lazyLoad: false` (desactivar para pocos items)
7. ❌ Action Bar - NO configurar (NO está presente)
8. ❌ Column Selector - `header.columnSelectorButton: false` (NO está presente)
9. ❌ Column Menu - `showColumnMenu: false` (NO está presente)
10. ❌ Context Menu - `showContextMenu: false` (NO está presente)
... (listar TODAS las funcionalidades)

**Tipos de columnas verificados:**
- ✅ Estado: `type: 'estado'` (muestra badge/tag, NO texto)
- ✅ Avance: `type: 'progreso'` (muestra barra de progreso, NO texto)
- ✅ Fechas: `type: 'fecha'` (fechas formateadas, NO texto)
- ✅ Números: `type: 'nombre'` (números como texto)

**Configuración final:**
- ✅ Altura dinámica: SÍ (configurar después de crear)
- ✅ Ancho completo: SÍ (100% del contenedor)
```

- **⚠️ ERRORES COMUNES:**
  - ❌ Asumir que todas las columnas son `type: 'text'`
  - ❌ Dejar `rowExpandable: true` por defecto cuando NO está en la imagen
  - ❌ Configurar `pinned: true` cuando NO está en la imagen (redimensiona la tabla)
  - ❌ No configurar altura dinámica (no aprovecha espacio vertical)
  - ❌ NO listar TODAS las funcionalidades (solo algunas)
  - ❌ NO consultar Storybook antes de analizar
...

### ⚙️ Funcionalidades Identificadas:
1. [Funcionalidad 1]: [Descripción]
2. [Funcionalidad 2]: [Descripción]
...

### 📋 Plan de Implementación:
1. **Tarea 1:** [Descripción] (solo esto, nada más)
2. **Tarea 2:** [Descripción] (solo después de aprobación de Tarea 1)
3. **Tarea 3:** [Descripción] (solo después de aprobación de Tarea 2)
...

### ❓ ¿Aprobamos este plan antes de implementar?
```

### ⚠️ CRÍTICO:

- **NO implementar** hasta que el usuario apruebe explícitamente
- **MOSTRAR** el análisis completo en el formato de arriba
- **ESPERAR** respuesta del usuario antes de continuar
- **NO saltarse** ningún paso

---

**Si implementas sin mostrar el análisis primero, estás violando las reglas del proyecto.**

