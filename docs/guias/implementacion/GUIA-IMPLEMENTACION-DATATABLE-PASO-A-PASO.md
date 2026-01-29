# 📊 Guía: Implementación de DataTable Paso a Paso

Esta guía establece el proceso **OBLIGATORIO** para implementar DataTable con múltiples funcionalidades. **NUNCA implementar todas las funcionalidades de golpe.**

---

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"Una funcionalidad a la vez"** - Implementar cada característica de DataTable de forma independiente, pedir aprobación en cada paso, y solo avanzar cuando el usuario apruebe.

## 🚨 ERRORES CRÍTICOS A EVITAR

### **ERROR #1: Asumir Tipos de Columnas Incorrectos**
- ❌ **INCORRECTO:** Usar `type: 'text'` para todas las columnas
- ✅ **CORRECTO:** Verificar visualmente en la imagen y usar tipos correctos:
  - Estado con badge/tag → `type: 'estado'` (NO `type: 'text'`)
  - Avance con barra de progreso → `type: 'progreso'` (NO `type: 'text'`)
  - Fecha formateada → `type: 'fecha'` (NO `type: 'text'`)
  - Número → `type: 'numero'` (NO `type: 'text'`)

### **ERROR #2: Dejar rowExpandable en true por Defecto**
- ❌ **INCORRECTO:** Dejar `rowExpandable: true` cuando NO hay opción de expandir en la imagen
- ✅ **CORRECTO:** Verificar en la imagen si hay opción de expandir filas:
  - Si NO hay → `rowExpandable: false`
  - Si SÍ hay → `rowExpandable: true` + agregar `renderExpandedContent` a cada fila

### **ERROR #3: Configurar Columnas Fijas sin Verificar**
- ❌ **INCORRECTO:** Configurar `pinned: true` en columnas cuando NO están fijas en la imagen
- ✅ **CORRECTO:** Solo configurar `pinned: true` si las columnas están fijas en la imagen (evita redimensionamiento incorrecto)

### **ERROR #4: No Configurar Altura Dinámica**
- ❌ **INCORRECTO:** Dejar altura fija por defecto (400px), no aprovecha espacio vertical
- ✅ **CORRECTO:** Configurar altura dinámica después de crear el DataTable para aprovechar todo el espacio vertical disponible
- ⚠️ **CRÍTICO:** Buscar contenedor scrollable en el **PADRE** del table, no dentro de él
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-CONTENEDOR-SCROLLABLE-DATATABLE.md`

### **ERROR #5: No Implementar Action Bar cuando showCheckbox: true**
- ❌ **INCORRECTO:** No implementar Action Bar cuando hay checkboxes habilitados
- ✅ **CORRECTO:** SIEMPRE implementar Action Bar cuando `showCheckbox: true`
- ⚠️ **CRÍTICO:** Variables en scope de script, listeners después del renderizado, estilos completos
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-ACTION-BAR-NO-SE-MUESTRA-DATATABLE.md`
- **Ver guía completa:** `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md` - ⚠️ **OBLIGATORIO** (incluye todos los errores encontrados: border-bottom, iconos, datos originales, listeners)

### **ERROR #6: No Configurar Estilos CSS del Contenedor**
- ❌ **INCORRECTO:** Solo agregar `margin-top` inline, sin estilos de layout
- ✅ **CORRECTO:** Configurar estilos completos: `display: flex`, `overflow: hidden`, `padding`, etc.
- **Ver guía:** `docs/guias/implementacion/GUIA-ERRORES-IMPLEMENTACION-DATATABLE-COMPLETA.md`

### **ERROR #7: Implementar Múltiples Tareas al Tiempo**
- ❌ **INCORRECTO:** Implementar Tarea 1, 2 y 3 al mismo tiempo sin analizar bien cada una
- ✅ **CORRECTO:** Implementar UNA tarea a la vez, analizando bien todo antes de implementar

### **ERROR #8: No Agregar Logs Detallados**
- ❌ **INCORRECTO:** Logs mínimos o inexistentes, difícil diagnosticar problemas
- ✅ **CORRECTO:** Logs detallados en cada paso: inicialización, búsqueda de elementos, selección, renderizado
- **Ver guía:** `docs/guias/implementacion/GUIA-ERRORES-IMPLEMENTACION-DATATABLE-COMPLETA.md`

### **ERROR #9: No Implementar Empty States para Búsqueda y Filtros**
- ❌ **INCORRECTO:** Implementar `searchButton` y `filterButton` sin configurar empty states
- ✅ **CORRECTO:** SIEMPRE implementar `noSearchResults` si hay `searchButton` y `noFilterResults` si hay `filterButton`
- ⚠️ **CRÍTICO:** Guardar instancia del DataTable en `window._encuestasDataTableInstance` para que callbacks puedan acceder
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-NO-IMPLEMENTAR-EMPTY-STATES-DATATABLE.md` - ⚠️ **OBLIGATORIO**

### **ERROR #16: Botón de Cerrar (X) del SearchButton Fuera del Input**
- ❌ **INCORRECTO:** Implementar `searchButton` sin agregar estilos CSS y sin verificar/corregir estructura del DOM
- ✅ **CORRECTO:** SIEMPRE agregar estilos CSS completos del SearchButton (input-wrapper con `height: 32px`, botón de cerrar con `position: relative`) y función de verificación/corrección de estructura
- ⚠️ **CRÍTICO:** El botón de cerrar (X) debe estar dentro del `input-wrapper`, NO fuera. Usar `position: relative` (NO `absolute`) para mantenerlo en el flujo flexbox
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-SEARCHBUTTON-BOTON-CERRAR-FUERA-INPUT.md` - ⚠️ **OBLIGATORIO** (DEBE seguirse SIEMPRE al implementar SearchButton)

### **ERROR #10: Usar Deploy Viejo de Vercel**
- ❌ **INCORRECTO:** Usar URL de deployment específico (`https://ubits-storybook10-{hash}-...vercel.app`) que puede estar desactualizado
- ✅ **CORRECTO:** SIEMPRE usar URL principal (`https://ubits-storybook10.vercel.app/`) que siempre apunta al deployment más reciente
- ⚠️ **CRÍTICO:** Verificar en `UBITSPreset.ts` que use la URL principal
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-USAR-DEPLOY-VIEJO-VERCEL.md` - ⚠️ **OBLIGATORIO**

### **ERROR #11: Tamaño de Tabla Pequeño - No Aprovecha Espacio**
- ❌ **INCORRECTO:** Contenedor sin `width: 100%` y `flex: 1`, contenedor interno con `flex: 0 1 auto`
- ✅ **CORRECTO:** Configurar `width: 100%`, `flex: 1`, `min-height: 0` en contenedor de tabla y contenedor interno
- ⚠️ **CRÍTICO:** Verificar que `.content-area` tenga `align-items: stretch` para que los hijos ocupen todo el ancho
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-TAMANO-TABLA-PEQUENO.md` - ⚠️ **OBLIGATORIO**

### **ERROR #12: Padding Incorrecto**
- ❌ **INCORRECTO:** Padding de 24px en todos los lados o padding externo dentro del contenedor
- ✅ **CORRECTO:** Padding interno de 16px en todos los lados del contenedor de tabla, padding externo de 24px solo abajo en `.content-area`
- ⚠️ **CRÍTICO:** El padding externo debe estar FUERA del contenedor de la tabla (en `.content-area`)
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-PADDING-INCORRECTO-TABLA.md` - ⚠️ **OBLIGATORIO**

### **ERROR #13: Scroll en la Página**
- ❌ **INCORRECTO:** `body` con `overflow-y: auto`, contenedores con `overflow: visible`, `.dashboard-container` con `min-height: 100vh`
- ✅ **CORRECTO:** `body` con `overflow-y: hidden`, contenedores con `overflow: hidden`, `.dashboard-container` con `height: 100vh`
- ⚠️ **CRÍTICO:** Solo debe haber scroll en `.ubits-data-table__scrollable-container--vertical`, NO en la página
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-SCROLL-PAGINA.md` - ⚠️ **OBLIGATORIO**

### **ERROR #14: Header de Columnas (thead) No Se Queda Fijo al Hacer Scroll** ⚠️ **NUEVO**
- ❌ **INCORRECTO:** No configurar `showVerticalScrollbar: true` y no agregar CSS para hacer el thead sticky
- ✅ **CORRECTO:** SIEMPRE configurar `showVerticalScrollbar: true` y agregar CSS para que el thead sea sticky
- ⚠️ **CRÍTICO:** El header de las columnas (thead) DEBE quedarse fijo al hacer scroll, solo los items (filas) deben hacer scroll
- **Ver guía:** `docs/guias/analisis/ANALISIS-ERROR-DATATABLE-THEAD-NO-STICKY.md` - ⚠️ **OBLIGATORIO**

### **ERROR #15: Header del Checkbox No Se Queda Fijo (Sticky) - Queda por Debajo de las Filas** ⚠️ **NUEVO**
- ❌ **INCORRECTO:** El header del checkbox (`checkbox-2`) no tiene z-index suficiente o no tiene sticky vertical configurado correctamente
- ✅ **CORRECTO:** SIEMPRE configurar z-index del header del checkbox mayor que las celdas (50+) y aplicar estilos desde JavaScript
- ⚠️ **CRÍTICO:** El header del checkbox DEBE quedarse fijo por encima de las filas al hacer scroll, las filas deben pasar por debajo
- ⚠️ **CRÍTICO:** El thead DEBE tener z-index base (10) para crear stacking context correcto
- ⚠️ **CRÍTICO:** Las celdas de checkbox DEBEN tener z-index menor (12) que el header (50)
- ⚠️ **CRÍTICO:** Aplicar estilos desde JavaScript con `!important` para sobrescribir estilos inline del DataTable
- **Ver guía:** `docs/guias/implementacion/GUIA-ERROR-HEADER-CHECKBOX-NO-STICKY-DATATABLE.md` - ⚠️ **OBLIGATORIO**

---

## 📋 PROCESO COMPLETO (OBLIGATORIO)

### **FASE 0: VERIFICACIÓN DE SCRIPTS Y DEPENDENCIAS** ⚠️ CRÍTICO - OBLIGATORIO

#### **Paso 0.0: Verificar que el Script UMD Esté Cargado** ⚠️ CRÍTICO

**⚠️ OBLIGATORIO:** ANTES de cualquier otra cosa, verificar que el script UMD de DataTable esté cargado:

**Checklist:**
- [ ] Verificar que el script UMD está en el HTML: `<script src="...data-table.umd.js">`
- [ ] Verificar que la ruta es correcta (local: `/vendor/ubits/packages/components/data-table/dist/data-table.umd.js` o Vercel)
- [ ] Abrir consola del navegador (F12) y verificar que no hay errores de carga
- [ ] Verificar que `window.createDataTable` o `window.UBITSDataTable.createDataTable` está disponible
- [ ] Si NO está disponible, agregar script con carga dinámica y fallback (ver `GUIA-ERROR-SCRIPT-UMD-DATATABLE-NO-CARGA.md`)

**⚠️ CRÍTICO:** Si el script UMD no está cargado, `window.createDataTable` será `undefined` y la implementación fallará.

**Ver guía completa:** `docs/guias/implementacion/GUIA-ERROR-SCRIPT-UMD-DATATABLE-NO-CARGA.md` - ⚠️ **OBLIGATORIO**

---

### **FASE 0.1: REVISAR COMPONENTE DATATABLE** 🔍

#### **Paso 0.1.1: Revisar Variantes, Controladores y Funcionalidades**

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

### **FASE 0.6: CONTAR ITEMS/FILAS EN LA IMAGEN** ⚠️ CRÍTICO

#### **Paso 0.6.1: Contar Items/Filas Visibles**

**⚠️ OBLIGATORIO:** Antes de analizar columnas, SIEMPRE contar cuántos items/filas hay en la tabla:

1. **Contar filas visibles:**
   - ¿Cuántas filas se ven completamente en la imagen?
   - ¿Hay scroll o paginación visible?
   - ¿La tabla llega hasta abajo de la imagen?

2. **Verificar contador en header:**
   - ¿Hay un contador en el header? (ej: "206 encuestas")
   - Si existe, usar ese número como referencia

3. **Estimar cantidad total:**
   - Si hay scroll, estimar cuántos items hay en total
   - Si no hay scroll, contar las filas visibles exactamente

4. **Documentar en el análisis:**
   ```markdown
   ## 📊 Análisis de Cantidad de Items
   
   ### Items/Filas identificados:
   - **Filas visibles en imagen:** 12 filas
   - **Scroll visible:** Sí (la tabla continúa más abajo)
   - **Contador en header:** "206 encuestas"
   - **Cantidad total estimada:** 206 items
   - **Items a crear en implementación:** Mínimo 15-20 items para mostrar scroll correctamente
   ```

**⚠️ REGLA CRÍTICA:** NO crear solo 2-3 items de ejemplo. Crear una cantidad razonable que refleje la imagen (mínimo 10-15 items si hay scroll, o la cantidad exacta si se ve completa).

**Ver guía completa:** `docs/guias/implementacion/GUIA-GENERAR-ITEMS-DATATABLE.md` - ⚠️ **OBLIGATORIO para generar items**

---

### **FASE 0.8: CONFIGURAR ALTURA DINÁMICA** 📏

#### **Paso 0.8.1: Configurar Altura Dinámica para Aprovechar Espacio Vertical**

**⚠️ OBLIGATORIO:** Después de crear el DataTable, configurar la altura dinámica para aprovechar el espacio vertical disponible:

1. **Calcular espacio disponible:**
   - Obtener altura del viewport (`window.innerHeight`)
   - Obtener posición del contenedor (`getBoundingClientRect().top`)
   - Calcular altura de elementos superiores (tabs, header, etc.)
   - Calcular altura del header del DataTable
   - Restar padding y margins (usar tokens UBITS)

2. **Configurar max-height dinámicamente:**
   - Buscar el contenedor scrollable (`.ubits-data-table__scrollable-container--vertical`)
   - Configurar `maxHeight` con el espacio disponible calculado
   - Agregar listener de resize para recalcular cuando cambie el tamaño de la ventana

**Ver guía completa:** `docs/guias/implementacion/GUIA-ALTURA-DINAMICA-DATATABLE.md` - ⚠️ **OBLIGATORIO**

---

### **FASE 0.7: GENERAR ITEMS CON VARIEDAD** 🛠️

#### **Paso 0.7.1: Generar Items Según Análisis**

**⚠️ OBLIGATORIO:** Después de contar items y analizar columnas, generar items con variedad:

1. **Usar función generadora (IIFE):**
   ```javascript
   rows: (() => {
     // Definir arrays de valores posibles
     const tipos = ['Cultura', 'Satisfacción', 'Clima', 'Desempeño', 'Innovación'];
     const estados = ['en-progreso', 'completada', 'pausada', 'programada'];
     
     // Determinar cantidad según análisis
     const cantidadItems = 20; // Mínimo para mostrar scroll
     
     // Generar items
     const items = [];
     for (let i = 1; i <= cantidadItems; i++) {
       items.push({
         id: `encuesta-${i}`,
         data: {
           nombre: `${tipos[i % tipos.length]} ${2025 + (i % 2)}`,
           tipo: tipos[i % tipos.length],
           estado: estados[i % estados.length],
           // ... otros campos con variedad
         }
       });
     }
     return items;
   })()
   ```

2. **Asegurar variedad:**
   - Usar arrays de valores posibles
   - Usar operador módulo (`%`) para distribuir valores
   - Agregar variación aleatoria donde sea apropiado
   - Relacionar valores cuando tenga sentido (ej: avance con estado)

**Ver guía completa:** `docs/guias/implementacion/GUIA-GENERAR-ITEMS-DATATABLE.md` - ⚠️ **OBLIGATORIO**

---

### **FASE 1: ANÁLISIS DE COLUMNAS** 🔍

#### **Paso 1.1: Analizar Columnas de la Imagen/Solicitud**

**SIEMPRE hacer esto PRIMERO antes de crear el DataTable:**

1. **Identificar cantidad de columnas:**
   - ¿Cuántas columnas tiene la tabla?
   - ¿Hay columnas ocultas o que se muestran condicionalmente?

2. **Identificar tipo de cada columna:** ⚠️ CRÍTICO
   - ¿Qué tipo de dato muestra cada columna?
   - ⚠️ **ERROR COMÚN:** Asumir que todas las columnas son `type: 'text'`
   - ⚠️ **VERIFICAR VISUALMENTE** en la imagen el tipo de dato:
     - Si muestra un badge/tag de estado → `type: 'estado'` (NO `type: 'text'`)
     - Si muestra una barra de progreso → `type: 'progreso'` (NO `type: 'text'`)
     - Si muestra una fecha formateada → `type: 'fecha'` (NO `type: 'text'`)
     - Si muestra un número → `type: 'numero'` (NO `type: 'text'`)
   - Tipos comunes:
     - `text` / `nombre` - Texto simple
     - `checkbox` - Casilla de selección
     - `estado` - Badge/tag de estado (ej: "En progreso", "Completado") ⚠️ NO usar `text`
     - `fecha` - Fecha formateada ⚠️ NO usar `text`
     - `numero` - Número formateado ⚠️ NO usar `text`
     - `progreso` - Barra de progreso ⚠️ NO usar `text`
     - `acciones` - Botones de acción (editar, eliminar, etc.)
     - `avatar` - Imagen de perfil
     - `custom` - Contenido personalizado

3. **Identificar columnas especiales:**
   - ¿Hay columna de checkbox para selección múltiple?
   - ¿Hay columna de drag handle para reordenar filas?
   - ¿Hay columna de acciones?
   - ¿Hay columnas fijas (sticky)? ⚠️ CRÍTICO: Solo si están en la imagen, NO asumir
   - ⚠️ **ERROR COMÚN:** Configurar columnas fijas cuando NO están en la imagen → Esto redimensiona la tabla incorrectamente

4. **Verificar funcionalidades NO visibles en la imagen:** ⚠️ CRÍTICO
   - ¿Hay opción de expandir filas? → Si NO está en la imagen, configurar `rowExpandable: false`
   - ⚠️ **ERROR COMÚN:** Dejar `rowExpandable: true` por defecto cuando NO está en la imagen

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

**⚠️ CRÍTICO: ANTES de implementar, verificar en la imagen:**
- [ ] ¿Hay opción de expandir filas? → Si NO, configurar `rowExpandable: false`
- [ ] ¿Hay columnas fijas (sticky)? → Si NO, NO configurar `pinned: true` en columnas
- [ ] ¿Qué tipo de dato muestra cada columna? → Verificar tipos correctos:
  - Estado con badge/tag → `type: 'estado'` (NO `type: 'text'`)
  - Avance con barra de progreso → `type: 'progreso'` (NO `type: 'text'`)
  - Fecha formateada → `type: 'fecha'` (NO `type: 'text'`)
  - Número → `type: 'numero'` (NO `type: 'text'`)
- [ ] ¿La tabla debe aprovechar todo el espacio vertical? → Si SÍ, configurar altura dinámica después de crear

**Implementar SOLO esto:**

```javascript
// DataTable MÍNIMO - solo estructura y columnas
window.createDataTable({
  containerId: 'table-container',
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'text' },
    { id: 'tipo', title: 'Tipo', type: 'text' },
    { id: 'estado', title: 'Estado', type: 'estado' } // ✅ CORRECTO: tipo 'estado' para status tag
    // ⚠️ CRÍTICO: Usar tipos correctos según la imagen
    // ... solo las columnas básicas identificadas
  ],
  rows: [
    { id: 1, data: { nombre: 'Ejemplo 1', tipo: 'Tipo A', estado: 'en-progreso' } },
    { id: 2, data: { nombre: 'Ejemplo 2', tipo: 'Tipo B', estado: 'completado' } }
    // ... solo datos de ejemplo mínimos
  ],
  // ⚠️ CRÍTICO: Deshabilitar expansión de filas si NO está en la imagen
  rowExpandable: false, // ✅ Deshabilitar si no hay opción de expandir en la imagen
  // ⚠️ CRÍTICO: NO configurar columnas fijas si NO están en la imagen (evita redimensionamiento)
  // NO agregar pinned: true a columnas si no está en la imagen
});

// ⚠️ CRÍTICO: Configurar altura dinámica después de crear el DataTable
setTimeout(() => {
  adjustDataTableHeight('table-container');
}, 200);
```

**NO incluir aún:**
- ❌ Checkboxes
- ❌ Drag & drop
- ❌ Ordenamiento
- ❌ Filtros
- ❌ Buscador
- ❌ Header con botones
- ❌ Barra de acciones
- ❌ Expansión de filas (si no está en la imagen)
- ❌ Columnas fijas (si no están en la imagen)

**Paso 1.1.1: Verificar Configuración Crítica** ⚠️ CRÍTICO

**ANTES de ejecutar validación, verificar:**

1. **Tipos de columnas correctos:**
   - [ ] ¿Estado usa `type: 'estado'`? (NO `type: 'text'`)
   - [ ] ¿Avance usa `type: 'progreso'`? (NO `type: 'text'`)
   - [ ] ¿Fechas usan `type: 'fecha'`? (NO `type: 'text'`)
   - [ ] ¿Números usan `type: 'numero'`? (NO `type: 'text'`)

2. **Funcionalidades deshabilitadas si NO están en la imagen:**
   - [ ] ¿`rowExpandable: false` si NO hay opción de expandir? (NO dejar `true` por defecto)
   - [ ] ¿NO hay `pinned: true` en columnas si NO están fijas en la imagen? (Evita redimensionamiento)

3. **Altura dinámica configurada:**
   - [ ] ¿Se configuró altura dinámica después de crear el DataTable?
   - [ ] ¿Se agregó listener de resize para recalcular altura?

**Paso 1.1.2: Ejecutar Validación Automática** ✅

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
- ✅ Tipos de columnas correctos (estado muestra badge, avance muestra progress bar)
- ✅ NO hay opción de expandir filas si no está en la imagen
- ✅ La tabla aprovecha todo el espacio vertical
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
- ✅ **Barra de acciones aparece cuando se selecciona todos desde el header checkbox** ⚠️ **CRÍTICO**

**⚠️ IMPLEMENTACIÓN ADICIONAL OBLIGATORIA: Listener del Header Checkbox**

**IMPORTANTE:** El DataTable NO activa automáticamente la barra de acciones cuando se selecciona todos desde el header checkbox. Debes agregar un listener adicional usando **delegado de eventos**:

```javascript
// ✅ OBLIGATORIO: Agregar delegado de eventos para el header checkbox (selección masiva)
// Esto debe agregarse DESPUÉS de crear el DataTable
setTimeout(() => {
  const container = document.getElementById('encuestas-table-container');
  if (container) {
    const dataTable = container.querySelector('.ubits-data-table');
    if (dataTable) {
      // Usar delegado de eventos en el contenedor del DataTable
      // Esto captura el evento incluso si el checkbox se reemplaza
      dataTable.addEventListener('change', (e) => {
        const target = e.target;
        
        // Verificar si es el checkbox del header (select all)
        if (target && target.hasAttribute && target.hasAttribute('data-column-checkbox-header')) {
          const columnId = target.getAttribute('data-column-checkbox-header');
          
          // Solo procesar si es checkbox o checkbox-2 (columna fija)
          if (columnId === 'checkbox' || columnId === 'checkbox-2') {
            const isChecked = target.checked;
            
            // Esperar un poco para que el DataTable actualice todos los checkboxes
            setTimeout(() => {
              renderActionBar(); // Función que renderiza la barra de acciones
            }, 200);
          }
        }
      }, true); // ✅ Usar capture: true para capturar antes que otros listeners
    }
  }
}, 300);
```

**⚠️ ERRORES COMUNES A EVITAR:**
- ❌ **NO clonar el checkbox** - Esto elimina los listeners del DataTable
- ❌ **NO agregar listener directo al checkbox** - Se puede perder si el DataTable reemplaza el elemento
- ❌ **NO usar stopPropagation** - Dejar que el DataTable maneje el evento normalmente

**Ver:** `docs/guias/analisis/ANALISIS-ERROR-HEADER-CHECKBOX-DATATABLE.md` y ERROR CRÍTICO #21 en `GUIA-ERRORES-COMUNES-UBITS.md`

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
9. ✅ **Header completo con SearchButton** (si hay `searchButton` en el header) - ⚠️ **CRÍTICO:** Ver `docs/guias/implementacion/GUIA-ERROR-SEARCHBUTTON-BOTON-CERRAR-FUERA-INPUT.md` para evitar error del botón X fuera del input
9. ✅ **Barra de acciones (selección única)** (Tarea 8)
10. ✅ **Barra de acciones (selección múltiple)** (Tarea 9)
11. ✅ **Dropdown con filtros** (Tarea 10)
12. ✅ **Buscador con componentes UBITS** (Tarea 11)

---

## ⚠️ ERRORES CRÍTICOS A EVITAR

### **ERROR CRÍTICO #22: Checkboxes Funcionan Intermitentemente**

**Problema:** Los checkboxes del DataTable funcionan a veces y a veces no después de recargar la página.

**Causas:**
1. Listener del header checkbox agregado al DataTable interno (se reemplaza)
2. DataTable restaurado desde HTML sin event listeners
3. Verificación insuficiente (solo verifica HTML, no instancia activa)

**Solución:**
1. ✅ Agregar listener del header checkbox al **contenedor externo** (`#encuestas-table-container`)
2. ✅ Usar **bandera global** (`window._encuestasHeaderCheckboxListenerAdded`) para prevenir duplicados
3. ✅ **Siempre reinicializar** DataTable después de restaurar HTML desde `ContentManager.updateContent`
4. ✅ Verificar **instancia activa** (`dataTableInstance`), no solo HTML
5. ✅ Establecer **bandera de inicialización** (`window._encuestasDataTableInitialized`) después de crear exitosamente

**Ver:** `docs/guias/analisis/ANALISIS-ERROR-CHECKBOXES-INTERMITENTES-DATATABLE.md` y ERROR CRÍTICO #22 en `GUIA-ERRORES-COMUNES-UBITS.md`

**Nota:** Este orden puede variar según las necesidades del proyecto, pero **SIEMPRE** implementar una funcionalidad a la vez.

---

## 🔗 Referencias

### **Guías de Implementación:**
- **DataTable Options:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- **Guía general:** `GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Action Bar:** `GUIA-ACTION-BAR-DATATABLE.md` - ⚠️ **OBLIGATORIO** si `showCheckbox: true`
- **Layout y posicionamiento:** `GUIA-LAYOUT-TEMPLATE-DATATABLE.md`
- **Altura dinámica:** `GUIA-REDIMENSIONAR-DATATABLE-ESPACIO-COMPLETO.md`

### **Guías de Errores (OBLIGATORIO LEER):**
- **Errores completos:** `GUIA-ERRORES-IMPLEMENTACION-DATATABLE-COMPLETA.md` - ⚠️ **OBLIGATORIO** (todos los errores encontrados)
- **Contenedor scrollable no encontrado:** `GUIA-ERROR-CONTENEDOR-SCROLLABLE-DATATABLE.md` - ⚠️ **OBLIGATORIO**
- **Action Bar no se muestra:** `GUIA-ERROR-ACTION-BAR-NO-SE-MUESTRA-DATATABLE.md` - ⚠️ **OBLIGATORIO** si `showCheckbox: true`
- **Error checkboxes desaparecen tabla:** `docs/guias/analisis/ANALISIS-ERROR-CHECKBOXES-DATATABLE-DESAPARECE.md` - ⚠️ **OBLIGATORIO**
- **Error crítico #18:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md#error-crítico-18`

### **Referencias Generales:**
- **Catálogo de componentes:** `CATALOGO-COMPONENTES-UBITS.md`
- **Componentes UBITS:** `GUIA-USO-COMPONENTES-UBITS.md`
- **Errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

