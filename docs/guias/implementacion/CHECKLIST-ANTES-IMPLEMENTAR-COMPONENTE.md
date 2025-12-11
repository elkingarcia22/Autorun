# ✅ Checklist OBLIGATORIO: Antes de Implementar Cualquier Componente UBITS

> **⚠️ CRÍTICO:** Este checklist DEBE leerse COMPLETO antes de implementar cualquier componente UBITS.  
> **⚠️ NO implementar sin completar este checklist.**

---

## 📋 CHECKLIST COMPLETO

### **FASE 1: PREPARACIÓN Y CONSULTA** ⚠️ OBLIGATORIO

#### 1.1. **Consultar Documentación del Componente**
- [ ] Leer `docs/referencia/CATALOGO-COMPONENTES-UBITS.md` para verificar que el componente existe
- [ ] Leer la documentación específica del componente en `docs/referencia/componentes/[nombre-componente].md`
- [ ] Leer `docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md` para ver cómo usar el componente
- [ ] Leer `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - **TODOS los errores relacionados con el componente**

#### 1.2. **Consultar Storybook en Vercel** ⚠️ OBLIGATORIO
- [ ] Abrir Storybook en Vercel: `https://ubits-storybook10.vercel.app/`
- [ ] Buscar el componente específico (ej: `navegacion-tabs`)
- [ ] Revisar pestaña **"Code"** para ver estructura exacta
- [ ] Revisar pestaña **"Controls"** para ver todas las opciones disponibles
- [ ] Revisar pestaña **"Docs"** para ver documentación
- [ ] **⚠️ CRÍTICO:** Verificar si el componente tiene `margin-top`, `padding`, `background` por defecto
- [ ] **⚠️ CRÍTICO:** Anotar TODOS los estilos que tiene el componente por defecto
- [ ] Volver al template después de consultar

#### 1.2.1. **Verificar Script UMD de DataTable** ⚠️ CRÍTICO (Solo para DataTable)
- [ ] Verificar que el script `data-table.umd.js` está en el HTML
- [ ] Verificar que la ruta es correcta (local: `/vendor/ubits/packages/components/data-table/dist/data-table.umd.js` o Vercel)
- [ ] Abrir consola del navegador (F12) y verificar que no hay errores de carga
- [ ] Verificar que `window.createDataTable` o `window.UBITSDataTable.createDataTable` está disponible
- [ ] Si NO está disponible, agregar script con carga dinámica y fallback
- [ ] **Ver guía completa:** `docs/guias/implementacion/GUIA-ERROR-SCRIPT-UMD-DATATABLE-NO-CARGA.md` - ⚠️ **OBLIGATORIO**

#### 1.3. **Consultar Storybook MCP** ⚠️ OBLIGATORIO
- [ ] Usar `mcp_storybook_getComponentList` para listar componentes
- [ ] Usar `mcp_storybook_getComponentsProps` para obtener props exactas del componente
- [ ] Verificar estructura, tokens, controles y variantes

---

### **FASE 2: VERIFICACIÓN DE ERRORES COMUNES** ⚠️ OBLIGATORIO

#### 2.1. **Error #1: Formato de Iconos** ⚠️ CRÍTICO
- [ ] **Verificar formato de iconos:**
  - ✅ Usar SOLO el nombre del icono: `icon: 'home'`
  - ❌ NO usar prefijos: `icon: 'far fa-home'` (INCORRECTO)
  - ❌ NO usar sufijos sin verificar: Si es `chart-pie-simple`, usar `chart-pie-simple` completo
- [ ] **Regla:** Solo el nombre del icono, sin `fa-`, `far`, `fas`

#### 2.2. **Error #53: NO Agregar Estilos Extra Automáticamente** ⚠️ CRÍTICO
- [ ] **Verificar que NO se agreguen estilos automáticamente:**
  - ❌ NO agregar `padding` automáticamente
  - ❌ NO agregar `margin` automáticamente
  - ❌ NO agregar `margin-top` automáticamente (VER ERROR #55)
  - ❌ NO agregar `background` automáticamente
  - ❌ NO agregar `border-radius` automáticamente
- [ ] **Regla:** Solo agregar estilos si el usuario dice EXPLÍCITAMENTE "agregar [estilo]"
- [ ] **Ejemplos:**
  - ❌ Usuario dice "a 16px del subnav" → NO agregar margin-top
  - ❌ Usuario dice "spacing de 16px" → NO agregar margin-top
  - ✅ Usuario dice "agregar margin-top de 16px" → SÍ agregar margin-top

#### 2.3. **Error #55: NO Agregar margin-top al Contenedor de Componentes** ⚠️ CRÍTICO
- [ ] **Verificar que NO se agregue margin-top al contenedor:**
  - ❌ NO agregar `margin-top` inline: `<div id="container" style="margin-top: 16px;"></div>`
  - ❌ NO agregar `margin-top` en CSS: `#container { margin-top: 16px; }`
  - ❌ NO agregar `margin-top` en style.cssText: `container.style.cssText = 'margin-top: 16px;'`
  - ❌ NO agregar `margin-top` con selector adyacente: `#parent + #container { margin-top: 16px; }`
- [ ] **Regla:** El spacing debe venir del `gap` del contenedor padre, NO del componente
- [ ] **Solución correcta:**
  ```css
  /* ✅ CORRECTO - Usar gap del padre */
  .main-content {
      gap: var(--ubits-spacing-lg, 16px);
  }
  #tabs-container {
      width: 100%;
      box-sizing: border-box;
      /* NO margin-top aquí */
  }
  ```
- [ ] **⚠️ ESPECIALMENTE PARA TABS:** Ver guía específica: `docs/guias/implementacion/GUIA-PREVENCION-ERROR-MARGIN-TOP-TABS.md`
- [ ] **Detección automática:** El Pre-Implementation Check add-on detecta este error automáticamente

#### 2.4. **Error #54: Verificar padding-top del content-area**
- [ ] **Verificar que `.content-area` NO tenga padding-top:**
  - Revisar estilos del `.content-area`
  - Revisar estilos del `.content-area.no-background`
  - Asegurar `padding-top: 0 !important;` si es necesario
- [ ] **Regla:** El spacing debe ser exactamente el solicitado, sin padding adicional del contenedor padre

#### 2.5. **Error #12: Padding en Contenedor Correcto**
- [ ] **Verificar dónde aplicar padding (si se solicita):**
  - ✅ Padding debe estar en el contenedor EXTERNO (el que se pasa como `containerId`)
  - ❌ NO aplicar padding al contenedor INTERNO (el que crea el componente)
- [ ] **Regla:** Solo algunos componentes necesitan contenedor con padding (ej: DataTable), NO todos

#### 2.6. **Error #SearchButton: Botón de Cerrar Fuera del Input** ⚠️ CRÍTICO (Solo para DataTable con searchButton)
- [ ] **Si el DataTable tiene `searchButton: true`, OBLIGATORIO agregar estilos CSS:**
  - ✅ Agregar estilos CSS específicos para `.ubits-search-button__clear` con `position: relative` (NO `absolute`)
  - ✅ Agregar estilos para `.ubits-search-button__input-wrapper` con `height: 32px` (NO 40px)
  - ✅ Agregar función `verifyAndFixSearchButtonStructure()` después de crear el DataTable
  - ❌ NO usar `position: absolute` para el botón de cerrar
  - ❌ NO usar `height: 40px` para el input-wrapper
- [ ] **Ver guía completa:** `docs/guias/implementacion/GUIA-ERROR-SEARCHBUTTON-BOTON-CERRAR-FUERA-INPUT.md`
- [ ] **Regla:** El botón de cerrar debe estar dentro del `input-wrapper` con `position: relative` para estar en el flujo flexbox

#### 2.7. **Error #ActionBar: No Aparece con Selección Única** ⚠️ CRÍTICO (Solo para DataTable con showCheckbox)
- [ ] **Si el DataTable tiene `showCheckbox: true`, OBLIGATORIO verificar callback `onRowSelect`:**
  - ✅ Usar firma correcta: `onRowSelect: (rowId, selected) => { ... }` (NO `(rowId, rowData, selected)`)
  - ✅ Verificar que `selected` es boolean antes de usarlo: `if (selected === true)`
  - ✅ Llamar `renderActionBar(container)` después de actualizar `selectionState`
  - ✅ Mostrar Action Bar cuando `selectedCount >= 1` (NO solo cuando `selectedCount > 1`)
  - ✅ Agregar logs de depuración para verificar que el callback se ejecuta
  - ❌ NO usar firma con 3 parámetros: `(rowId, rowData, selected)`
  - ❌ NO asumir que `selected` siempre existe sin verificar
  - ❌ NO olvidar renderizar Action Bar después de cambiar selección
- [ ] **Ver guía completa:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (ERROR CRÍTICO #50)
- [ ] **Regla:** El callback `onRowSelect` recibe `(rowId, selected)`, donde `selected` es `true` o `false`

#### 2.8. **Error #ActionBar: Estilos Incorrectos Botón "Ver Seleccionados" Activo** ⚠️ CRÍTICO (Solo para DataTable con showCheckbox)
- [ ] **Si el DataTable tiene `showCheckbox: true`, OBLIGATORIO agregar ID al botón "Ver seleccionados":**
  - ✅ Agregar `attributes: { id: 'action-btn-view-selected' }` al botón "Ver seleccionados"
  - ✅ Verificar que el botón tiene la clase `.ubits-button--active` cuando está activo
  - ✅ Verificar que el botón muestra fondo azul claro y texto/icono azul cuando está activo
  - ✅ Aplicar el mismo ID tanto para selección única como múltiple
  - ❌ NO olvidar agregar el ID al botón
  - ❌ NO usar otro ID diferente a `'action-btn-view-selected'`
  - ❌ NO omitir el atributo `attributes` al renderizar el botón
- [ ] **Ver guía completa:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (ERROR CRÍTICO #51)
- [ ] **Regla:** El botón "Ver seleccionados" DEBE tener `id: 'action-btn-view-selected'` para que los estilos activos se apliquen correctamente

#### 2.9. **Error #52: Ciclo Vicioso - Arreglar una Cosa y Dañar Otra (ActionBar + Checkboxes)** ⚠️ CRÍTICO (Solo para DataTable con showCheckbox)
- [ ] **Si el DataTable tiene `showCheckbox: true` y ActionBar, OBLIGATORIO evitar usar `innerHTML` innecesariamente:**
  - ✅ SIEMPRE verificar si el botón ya existe antes de usar `innerHTML`
  - ✅ SIEMPRE actualizar solo el botón existente si ya existe (sin usar `innerHTML`)
  - ✅ SIEMPRE usar manipulación directa del DOM si el ActionBar tiene contenido pero no tiene el botón
  - ✅ SOLO usar `innerHTML` cuando el ActionBar está completamente vacío (primera vez)
  - ❌ NUNCA usar `innerHTML` si el ActionBar ya tiene contenido
  - ❌ NUNCA reemplazar todo el ActionBar cuando solo necesitas actualizar un botón
- [ ] **Ver guía completa:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (ERROR CRÍTICO #52)
- [ ] **Regla:** El ActionBar debe actualizarse de forma incremental, NO reemplazando todo el contenido cada vez

#### 2.10. **Error #53: Filtrado de Filas No Funciona - "Ver Seleccionados" No Filtra** ⚠️ CRÍTICO (Solo para DataTable con showCheckbox)
- [ ] **Si el DataTable tiene `showCheckbox: true` y botón "Ver seleccionados", OBLIGATORIO implementar filtrado:**
  - ✅ SIEMPRE guardar la instancia completa del DataTable: `const dataTableInstance = window.createDataTable({...})`
  - ✅ SIEMPRE guardar los datos originales: `encuestasDataOriginal = rows` (antes de cualquier filtrado)
  - ✅ SIEMPRE implementar filtrado completo en `toggleViewSelected` usando `dataTableInstance.update()`
  - ✅ SIEMPRE filtrar filas cuando `viewSelectedActive === true`: `dataTableInstance.update({ rows: filteredRows })`
  - ✅ SIEMPRE restaurar datos originales cuando `viewSelectedActive === false`: `dataTableInstance.update({ rows: encuestasDataOriginal })`
  - ❌ NUNCA guardar solo el elemento DOM: `container.querySelector('.ubits-data-table')` NO tiene método `update()`
  - ❌ NUNCA dejar el filtrado como `TODO`: Debe implementarse completamente
- [ ] **Ver guía completa:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (ERROR CRÍTICO #53)
- [ ] **Regla:** El filtrado DEBE usar `dataTableInstance.update({ rows: filteredRows })` para funcionar correctamente

#### 2.11. **Error #54: Múltiples Llamadas Simultáneas a toggleViewSelected** ⚠️ CRÍTICO (Solo para DataTable con showCheckbox)
- [ ] **Si el DataTable tiene `showCheckbox: true` y botón "Ver seleccionados", OBLIGATORIO prevenir múltiples llamadas:**
  - ✅ SIEMPRE usar un flag (`isToggling`) para prevenir múltiples llamadas simultáneas
  - ✅ SIEMPRE verificar el flag al inicio de `toggleViewSelected`
  - ✅ SIEMPRE liberar el flag después de completar la operación (con un pequeño delay)
  - ❌ NUNCA omitir la protección contra múltiples llamadas simultáneas
- [ ] **Ver guía completa:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (ERROR CRÍTICO #54)
- [ ] **Regla:** `toggleViewSelected` DEBE tener protección contra múltiples llamadas simultáneas

#### 2.12. **Error #55: Filtros "Quemados" y Conflictos de Estilos con Drawer Navigation** ⚠️ CRÍTICO (Solo para DataTable con filterButton)
- [ ] **Si el DataTable tiene `filterButton: true`, OBLIGATORIO configurar filters explícitamente:**
  - ✅ SIEMPRE configurar `filterButton.filters` explícitamente (NO usar `filterButton: true` solo)
  - ✅ SIEMPRE usar `type: 'calendar'` para fechas (NO `type: 'date'`)
  - ✅ SIEMPRE implementar `onApplyFilters` con lógica de filtrado completa
  - ✅ SIEMPRE implementar `onClearFilters` con lógica de limpieza completa
  - ✅ SIEMPRE dejar que el drawer maneje el spacing (NO agregar padding/margin manual sin necesidad)
  - ❌ NUNCA usar `filterButton: true` sin configurar `filters` (esto crea un filtro de prueba "quemado")
  - ❌ NUNCA agregar estilos CSS que afecten los inputs del drawer (a menos que haya conflictos reales)
  - ❌ NUNCA modificar los estilos del drawer navigation (el drawer ya tiene sus propios estilos)
- [ ] **Ver guía completa:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (ERROR CRÍTICO #55)
- [ ] **Ver guía de implementación:** `docs/guias/implementacion/GUIA-FILTROS-DATATABLE-SIN-CONFLICTOS-ESTILOS.md` ⭐ **OBLIGATORIO LEER**
- [ ] **Regla:** El drawer se crea primero (automático), luego los inputs se crean después de 200ms (automático). NO modificar este orden.

#### 2.13. **Error #56: Columnas Fijadas - Headers Pasan Por Encima En Lugar de Por Debajo** ⚠️ CRÍTICO (Solo para DataTable con column pinning)
- [ ] **Si el DataTable tiene columnas fijadas (pinned), OBLIGATORIO configurar z-index correctamente:**
  - ✅ SIEMPRE usar JavaScript para sobrescribir estilos inline (los estilos inline del DataTable tienen mayor especificidad)
  - ✅ SIEMPRE crear función `fixPinnedColumnsZIndex` que use `setProperty` con `'important'`
  - ✅ SIEMPRE asegurar que headers fijados tengan `z-index: 20` o mayor (mayor que thead que tiene `z-index: 10`)
  - ✅ SIEMPRE asegurar que headers NO fijados tengan `z-index: 1` (menor que thead)
  - ✅ SIEMPRE asegurar que celdas fijadas tengan `z-index: 19` o mayor (mayor que celdas normales)
  - ✅ SIEMPRE asegurar que celdas NO fijadas tengan `z-index: 0` (menor que celdas fijadas)
  - ✅ SIEMPRE llamar `fixPinnedColumnsZIndex` después de crear el DataTable (en `setTimeout` de 100ms)
  - ✅ SIEMPRE interceptar método `update` del DataTable para corregir z-index después de cada actualización
  - ✅ SIEMPRE agregar callback `onColumnPin` para corregir z-index cuando se fija/desfija una columna
  - ✅ SIEMPRE mantener la jerarquía: Headers fijados (20) > Celdas fijadas (19) > Thead (10) > Headers normales (1) > Celdas normales (0)
  - ❌ NUNCA usar solo CSS sin JavaScript (los estilos inline sobrescriben el CSS)
  - ❌ NUNCA usar el mismo z-index para thead y headers fijados (causa conflictos)
  - ❌ NUNCA omitir el z-index en columnas fijadas (deben tener z-index explícito)
- [ ] **Ver guía completa:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (ERROR CRÍTICO #56)
- [ ] **Regla:** Los headers fijados DEBEN tener z-index mayor que el thead. Usar JavaScript para sobrescribir estilos inline del DataTable.

---

### **FASE 3: IMPLEMENTACIÓN** ⚠️ OBLIGATORIO

#### 3.1. **Crear Contenedor del Componente**
- [ ] Crear contenedor HTML: `<div id="component-container"></div>`
- [ ] **Verificar estilos del contenedor:**
  - ✅ Solo `width: 100%` si es necesario
  - ✅ Solo `box-sizing: border-box` si es necesario
  - ❌ NO agregar `margin-top`, `padding`, `background`, `border-radius` automáticamente
- [ ] **Regla:** El contenedor debe ser mínimo, sin estilos extra

#### 3.2. **Llamar a la Función del Componente**
- [ ] Usar la función correcta: `window.createTabs()`, `window.createDataTable()`, etc.
- [ ] **Verificar formato de iconos:** Solo nombre, sin prefijos
- [ ] **Verificar props:** Usar props exactas obtenidas de Storybook MCP
- [ ] **Verificar estructura:** Seguir estructura exacta de Storybook

#### 3.3. **Manejar Spacing entre Elementos**
- [ ] **Si se solicita spacing específico:**
  - ✅ Usar `gap` del contenedor padre (`.main-content`)
  - ❌ NO usar `margin-top` en el contenedor del componente
  - ❌ NO usar `padding-top` en el contenedor del componente
- [ ] **Ejemplo correcto:**
  ```css
  .main-content {
      gap: var(--ubits-spacing-lg, 16px); /* Spacing entre SubNav, Tabs, Content Area */
  }
  ```

---

### **FASE 4: VERIFICACIÓN POST-IMPLEMENTACIÓN** ⚠️ OBLIGATORIO

#### 4.1. **Verificar Estilos del Componente**
- [ ] El componente se ve igual que en Storybook
- [ ] No tiene padding/margin/background extra
- [ ] Solo tiene los estilos mínimos necesarios
- [ ] Los estilos agregados fueron solicitados explícitamente por el usuario

#### 4.2. **Verificar Spacing**
- [ ] El spacing entre elementos es correcto
- [ ] No hay padding-top en `.content-area` que afecte el spacing
- [ ] El spacing viene del `gap` del contenedor padre, NO del componente

#### 4.3. **Verificar Funcionalidad**
- [ ] El componente funciona correctamente
- [ ] Los iconos se muestran correctamente
- [ ] Las props funcionan como se espera
- [ ] No hay errores en la consola

---

## 🚨 REGLAS CRÍTICAS (LEER SIEMPRE)

### **Regla #1: Componentes Tal Cual de Storybook**
> Los componentes deben venir TAL CUAL vienen de Storybook, sin modificaciones. Solo agregar estilos si el usuario lo solicita explícitamente.

### **Regla #2: NO margin-top en Componentes**
> **NUNCA** agregar `margin-top` al contenedor de componentes. El spacing debe venir del `gap` del contenedor padre.

### **Regla #3: Solo Estilos Mínimos**
> Solo agregar estilos mínimos necesarios (ej: `width: 100%`). NO agregar padding, margin, background, border-radius automáticamente.

### **Regla #4: Consultar Storybook SIEMPRE**
> **SIEMPRE** consultar Storybook antes de implementar para ver cómo viene el componente por defecto.

### **Regla #5: Solo Agregar Estilos si se Solicita Explícitamente**
> Solo agregar estilos si el usuario dice EXPLÍCITAMENTE "agregar [estilo]". NO asumir ni agregar automáticamente.

---

## 📚 REFERENCIAS OBLIGATORIAS

Antes de implementar, LEER:

1. **`docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`** - Todos los errores documentados
2. **`docs/guias/implementacion/GUIA-NO-AGREGAR-ESTILOS-EXTRA-COMPONENTES.md`** - Regla sobre estilos extra
3. **`docs/referencia/CATALOGO-COMPONENTES-UBITS.md`** - Catálogo de componentes
4. **`docs/referencia/componentes/[nombre-componente].md`** - Documentación específica del componente
5. **Storybook en Vercel:** `https://ubits-storybook10.vercel.app/` - Ver componente en vivo

---

## ⚠️ ERRORES ESPECÍFICOS A EVITAR

### **Error #53: Agregar Estilos Extra Automáticamente**
- ❌ NO agregar padding, margin, background automáticamente
- ✅ Solo agregar si el usuario lo solicita explícitamente

### **Error #55: Agregar margin-top al Contenedor**
- ❌ NO agregar `margin-top` inline o en CSS al contenedor
- ✅ Usar `gap` del contenedor padre

### **Error #54: padding-top del content-area**
- ❌ NO dejar `padding-top` en `.content-area`
- ✅ Asegurar `padding-top: 0 !important;`

### **Error #1: Formato de Iconos**
- ❌ NO usar prefijos: `'far fa-home'`
- ✅ Solo nombre: `'home'`

---

## ✅ CHECKLIST RÁPIDO (ANTES DE CADA IMPLEMENTACIÓN)

1. [ ] Leer este checklist completo
2. [ ] Consultar Storybook en Vercel
3. [ ] Consultar Storybook MCP
4. [ ] Verificar formato de iconos
5. [ ] Verificar que NO se agreguen estilos extra
6. [ ] Verificar que NO se agregue margin-top al contenedor
7. [ ] Verificar padding-top del content-area
8. [ ] Implementar componente
9. [ ] Verificar que se ve igual que en Storybook
10. [ ] Verificar spacing correcto

---

**Última actualización:** 2025-01-09  
**Estado:** ✅ Checklist Completo y Obligatorio
