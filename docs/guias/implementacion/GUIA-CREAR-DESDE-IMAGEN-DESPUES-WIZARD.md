# 🖼️ Guía: Crear desde Imagen DESPUÉS del Wizard

**⚠️ CRÍTICO:** Cuando el usuario pide crear/modificar algo desde una imagen **DESPUÉS** de ejecutar el wizard, el sistema **DEBE** seguir este proceso.

---

## 🎯 PROBLEMA ACTUAL

**Error común:**
- Usuario ejecuta wizard → se crean templates en `prototypes/`
- Usuario pide crear home desde imagen
- ❌ Sistema crea un HTML nuevo en lugar de modificar el template existente
- ❌ Sistema no sigue el proceso de análisis paso a paso
- ❌ Se pierde el trabajo del wizard

**Solución:**
- ✅ Identificar template existente creado por el wizard
- ✅ Modificar ese template existente (NO crear uno nuevo)
- ✅ Seguir proceso de análisis paso a paso obligatorio

---

## 📋 PROCESO OBLIGATORIO

### **PASO 0: IDENTIFICAR TEMPLATE EXISTENTE** ⚠️ CRÍTICO

**ANTES de hacer cualquier cosa, verificar:**

1. **Buscar templates existentes en `prototypes/`:**
   ```bash
   ls prototypes/*.html
   ```

2. **Identificar template correcto:**
   - Si el usuario pidió "home de encuestas" → buscar `canvas-*-encuestas-*.html`
   - Si el usuario pidió "administrador" → buscar `canvas-administrador-*.html`
   - Si el usuario pidió "colaborador" → buscar `canvas-colaborador-*.html`

3. **Usar ese template existente:**
   - ✅ **MODIFICAR** el template existente
   - ❌ **NO crear** un HTML nuevo
   - ❌ **NO crear** un template nuevo

**Ejemplo:**
```typescript
// ✅ CORRECTO: Modificar template existente
const existingTemplate = 'prototypes/canvas-administrador-encuestas-2025-12-02.html';
await modifyTemplateFromImage(existingTemplate, image);

// ❌ INCORRECTO: Crear template nuevo
await createNewTemplate('home-encuestas.html', image);
```

---

### **PASO 1: ANÁLISIS Y PLANIFICACIÓN** 🎯

**SIEMPRE hacer esto PRIMERO antes de escribir código:**

**⚠️ NUEVO:** Usar el proceso mejorado de análisis con documentación automática:
- **Ver guía completa:** `docs/guias/analisis/GUIA-ANALISIS-IMAGEN-MEJORADO.md` ⭐

#### **1.1: Analizar la Imagen/Solicitud (PROCESO MEJORADO)**

**Proceso mejorado con documentación automática:**

1. **Cargar catálogo y documentación:**
   - Consultar: `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
   - Consultar: `docs/referencia/componentes/README.md`
   - Para cada componente identificado, cargar su documentación específica

2. **Identificar componentes UBITS:**
   - ¿Qué componentes UBITS veo en la imagen?
   - ¿Sidebar? ¿SubNav? ¿Tabs? ¿DataTable? ¿Buttons? ¿Inputs?
   - **Para cada componente identificado:**
     - ✅ Cargar documentación: `docs/referencia/componentes/[nombre].md`
     - ✅ Identificar subcomponentes automáticamente
     - ✅ Identificar subfuncionalidades automáticamente
     - ✅ Verificar props y opciones disponibles
   - **⚠️ CRÍTICO: Distinguir SubNav de Tabs:**
     - **SubNav:** Barra horizontal debajo del header con tabs de navegación secundaria
       - ✅ Ya existe en el template (se crea automáticamente por ContentManager)
       - ✅ NO se implementa
       - ✅ Documentar: "SubNav: Ya existe (tabs: [X, Y])"
     - **Tabs:** Tabs adicionales dentro del contenido principal
       - ✅ Se implementa con `window.createTabs()`
       - ✅ Requiere contenedor con ID
       - ✅ Documentar: "Tabs: Implementar (tabs: [X, Y])" o "Tabs: NO (solo SubNav existe)"
     - **Ver guía:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` - ⚠️ OBLIGATORIO
   - Consultar `CATALOGO-COMPONENTES-UBITS.md`

2. **Verificar HeaderSection:** ⚠️ CRÍTICO
   - **¿Hay un HeaderSection visible en la imagen?**
     - HeaderSection típicamente muestra:
       - Título grande de la sección (H2)
       - Botón primario de acción (ej: "Crear", "Nuevo", "Agregar")
       - A veces breadcrumb o botones secundarios
       - Se encuentra en la parte superior del contenido principal
     - **Si NO hay HeaderSection en la imagen:**
       - ✅ **DEBE eliminarse** del template
       - El template viene con HeaderSection por defecto (creado por ContentManager)
       - Necesitas interceptar ContentManager para NO crear HeaderSection
       - Documentar: "HeaderSection: NO (debe eliminarse)"
     - **Si SÍ hay HeaderSection en la imagen:**
       - ✅ **MANTENER** HeaderSection
       - Verificar que el título y botones coincidan con la imagen
       - Documentar: "HeaderSection: SÍ (título: [X], botón: [Y])"
   - **⚠️ IMPORTANTE:** Solo eliminar HeaderSection en el módulo específico donde la imagen no lo muestra
     - Verificar módulo/sección antes de eliminar: `if (section !== 'encuestas') return`
     - Ver guía: `GUIA-ERRORES-COMUNES-UBITS.md` - Error #9

4. **Verificar contenedor `.content-sections` por defecto:** ⚠️ CRÍTICO
   - **¿Hay un contenedor `.content-sections` en el template?**
     - El template viene con `.content-sections` por defecto (contenido genérico)
     - **Si implementas componentes personalizados (Tabs, DataTable, etc.):**
       - ✅ **DEBE eliminarse** del HTML estático
       - ✅ **DEBE eliminarse** si se crea dinámicamente por `ContentManager.updateContent`
       - Documentar: "content-sections: NO (eliminar, hay componentes personalizados)"
     - **Si NO hay componentes personalizados:**
       - ✅ **MANTENER** `.content-sections` (es el contenido por defecto)
       - Documentar: "content-sections: SÍ (mantener)"
   - **⚠️ IMPORTANTE:** Solo eliminar `.content-sections` cuando hay componentes personalizados
     - Verificar que los componentes personalizados reemplazan el contenido por defecto
     - Ver guía: `GUIA-ERRORES-COMUNES-UBITS.md` - Error #13

3. **Contar items/filas en DataTable (si aplica):** ⚠️ CRÍTICO
   - **Si hay una tabla/DataTable en la imagen:**
     - Contar cuántas filas se ven completamente en la imagen
     - Verificar si hay scroll o paginación visible
     - Verificar si hay contador en el header (ej: "206 encuestas")
     - Documentar: "Filas visibles: [X], Scroll: Sí/No, Contador: [texto], Items a crear: [X]"
     - **⚠️ REGLA CRÍTICA:** NO crear solo 2-3 items de ejemplo. Crear cantidad razonable (mínimo 10-15 si hay scroll)
     - **Ver guía:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` - Paso 0

4. **Verificar tipos de columnas del DataTable (si aplica):** ⚠️ CRÍTICO
   - **Para cada columna, verificar visualmente el tipo de dato:**
     - ¿Estado muestra badge/tag? → `type: 'estado'` (NO `type: 'text'`)
     - ¿Avance muestra barra de progreso? → `type: 'progreso'` (NO `type: 'text'`)
     - ¿Fechas están formateadas? → `type: 'fecha'` (NO `type: 'text'`)
     - ¿Números están formateados? → `type: 'numero'` (NO `type: 'text'`)
   - **⚠️ ERROR COMÚN:** Asumir que todas las columnas son `type: 'text'`
   - **Ver guía:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` - Paso 1.5

5. **Verificar funcionalidades NO visibles del DataTable (si aplica):** ⚠️ CRÍTICO
   - **¿Hay opción de expandir filas?**
     - Si NO hay → Configurar `rowExpandable: false`
     - Si SÍ hay → Configurar `rowExpandable: true` + agregar `renderExpandedContent` a cada fila
     - **⚠️ ERROR COMÚN:** Dejar `rowExpandable: true` por defecto cuando NO está en la imagen
   - **¿Hay columnas fijas (sticky)?**
     - Si NO hay → NO configurar `pinned: true` en columnas
     - Si SÍ hay → Configurar `pinned: true` solo en las columnas que están fijas
     - **⚠️ ERROR COMÚN:** Configurar columnas fijas cuando NO están en la imagen (redimensiona la tabla)
   - **¿La tabla debe aprovechar todo el espacio vertical?**
     - Si SÍ → Configurar altura dinámica después de crear el DataTable
     - **⚠️ ERROR COMÚN:** Dejar altura fija por defecto (400px), no aprovecha espacio vertical
   - **Ver guía:** `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` - Paso 0.7

4. **Identificar iconos FontAwesome DETALLADAMENTE:** ⚠️ CRÍTICO
   - **Para cada icono visible en la imagen:**
     - Analizar la forma visual del icono (no asumir)
     - Identificar variaciones posibles:
       - ¿Es "simple"? (ej: `chart-pie-simple`, `list-ul-simple`)
       - ¿Es "regular"? (outline, `far`)
       - ¿Es "solid"? (filled, `fas`)
       - ¿Es "light"? (`fal`)
       - ¿Es "thin"? (`fat`)
     - **NO tomar solo el primer resultado de FontAwesome**
     - **Verificar múltiples opciones:**
       - Si ves un gráfico de pastel → buscar: `chart-pie`, `chart-pie-simple`, `pie-chart`
       - Si ves una lista → buscar: `list`, `list-ul`, `list-ul-simple`, `list-check`
       - Si ves un reloj → buscar: `clock`, `clock-simple`, `clock-rotate-left`
     - **Identificar el icono EXACTO:**
       - Comparar visualmente con la descripción de la imagen
       - Si la descripción dice "simple" o muestra detalles específicos, usar la variación "simple"
       - Documentar el icono completo: `chart-pie-simple`, `list-ul`, etc.
   - **Formato para usar en código:**
     - Para `window.createTabs()`: usar solo el nombre sin prefijos
       - ✅ `icon: 'chart-pie-simple'` (correcto)
       - ❌ `icon: 'fa-chart-pie-simple'` (incorrecto)
       - ❌ `icon: 'chart-pie'` (incorrecto si es simple)

3. **Identificar estructura y contenedores:**
   - ¿Qué va primero? ¿Qué va después?
   - ¿Qué elementos van en contenedores?
   - ¿Qué elementos NO van en contenedores?

4. **Analizar spacing específicamente:**
   - Medir visualmente el espacio entre elementos
   - Mapear a tokens UBITS específicos

5. **Identificar funcionalidades:**
   - ¿Qué debe hacer cada componente?
   - ¿Hay interacciones? ¿Callbacks?

6. **Identificar tokens de colores:**
   - ¿Qué colores se usan?
   - ¿Qué tokens UBITS corresponden?

#### **1.2: Crear Plan de Implementación**

**SIEMPRE presentar un plan antes de implementar:**

```markdown
## 📋 Plan de Implementación

### Componentes identificados:
1. ✅ SubNav (componente UBITS existente)
2. ✅ Tabs (componente UBITS existente)
3. ✅ DataTable (componente UBITS existente)
4. ✅ Buttons (componente UBITS existente)

### Estructura:
1. SubNav (sin contenedor)
2. Tabs (sin contenedor)
3. Barra de acciones (contenedor: `#actions-bar`)
4. DataTable (contenedor: `#table-container`)

### Spacing:
- Entre SubNav y Tabs: `--ubits-spacing-none` (0px)
- Entre Tabs y Barra: `--ubits-spacing-lg` (16px)
- Entre Barra y DataTable: `--ubits-spacing-lg` (16px)

### Tareas:
1. Tarea 1: Tabs (solo tabs, nada más)
2. Tarea 2: Barra de acciones (solo después de aprobación de Tarea 1)
3. Tarea 3: DataTable básico (solo columnas mínimas)
4. Tarea 4: Funcionalidades del DataTable (UNA a la vez)
```

**⚠️ CRÍTICO:** Mostrar plan al usuario y **ESPERAR APROBACIÓN** antes de implementar.

---

### **PASO 2: IMPLEMENTACIÓN PASO A PASO** 🔨

**⚠️ REGLA CRÍTICA:** **NUNCA implementar todo de golpe. SIEMPRE dividir en tareas pequeñas y pedir aprobación.**

#### **Para cada tarea:**

1. **Implementar SOLO esa tarea** (no avanzar a la siguiente)
2. **Ejecutar validación automática:** `npm run lint`
3. **Corregir errores automáticamente** si los hay
4. **Verificar que funciona correctamente**
5. **Mostrar al usuario lo implementado** (incluyendo resultado de validación)
6. **Pedir aprobación explícita:** "¿Aprobamos para continuar con la siguiente tarea?"
7. **Solo después de aprobación, continuar con la siguiente tarea**

---

## 🔍 VERIFICACIÓN DEL TEMPLATE EXISTENTE

**Antes de modificar, verificar:**

1. **¿Existe el template?**
   ```bash
   ls prototypes/canvas-*-encuestas-*.html
   ```

2. **¿Qué contiene el template?**
   - Leer el template existente
   - Verificar qué componentes ya tiene
   - Verificar qué estructura ya tiene

3. **¿Qué necesito agregar/modificar?**
   - Comparar con la imagen
   - Identificar qué falta
   - Identificar qué sobra

---

## 📝 EJEMPLO COMPLETO

**Usuario:** "Crea un home de encuestas con esta imagen [imagen]"

**Proceso correcto:**

1. ✅ **Identificar template existente:**
   ```bash
   # Buscar template de encuestas
   ls prototypes/canvas-*-encuestas-*.html
   # Resultado: prototypes/canvas-administrador-encuestas-2025-12-02.html
   ```

2. ✅ **Analizar imagen:**
   - Identificar componentes: SubNav, Tabs, DataTable
   - Identificar estructura: SubNav → Tabs → Barra → DataTable
   - Identificar spacing: 0px, 16px, 16px
   - Consultar catálogo: Todos son componentes UBITS existentes

3. ✅ **Crear plan:**
   ```markdown
   ## Plan de Implementación
   
   ### Template a modificar:
   - `prototypes/canvas-administrador-encuestas-2025-12-02.html`
   
   ### Componentes identificados:
   1. SubNav (ya existe, verificar si necesita cambios)
   2. Tabs (agregar)
   3. Barra de acciones (agregar)
   4. DataTable (agregar)
   
   ### Tareas:
   1. Tarea 1: Tabs (solo tabs)
   2. Tarea 2: Barra de acciones
   3. Tarea 3: DataTable básico
   ```

4. ✅ **Mostrar plan al usuario y esperar aprobación**

5. ✅ **Implementar Tarea 1:**
   - Modificar template existente
   - Agregar solo Tabs
   - Validar
   - Mostrar resultado
   - Pedir aprobación

6. ✅ **Solo después de aprobación, continuar con Tarea 2**

---

## 🚨 ERRORES COMUNES A EVITAR

1. ❌ **Crear HTML nuevo en lugar de modificar template existente**
   - ✅ CORRECTO: Modificar `prototypes/canvas-*-encuestas-*.html`
   - ❌ INCORRECTO: Crear `home-encuestas.html` nuevo

2. ❌ **No seguir proceso de análisis paso a paso**
   - ✅ CORRECTO: Analizar → Plan → Aprobar → Implementar → Aprobar → Continuar
   - ❌ INCORRECTO: Implementar todo de golpe sin análisis

3. ❌ **No identificar template existente**
   - ✅ CORRECTO: Buscar templates en `prototypes/` primero
   - ❌ INCORRECTO: Asumir que no existe template

4. ❌ **No consultar catálogo de componentes**
   - ✅ CORRECTO: Consultar `CATALOGO-COMPONENTES-UBITS.md` antes de crear
   - ❌ INCORRECTO: Crear componentes sin verificar si existen

---

## ✅ CHECKLIST OBLIGATORIO

Antes de crear/modificar desde imagen:

- [ ] **PASO 0:** Identificar template existente en `prototypes/`
- [ ] **PASO 0:** Verificar que el template existe
- [ ] **PASO 1:** Analizar imagen (componentes, estructura, spacing)
- [ ] **PASO 1:** Verificar HeaderSection (eliminar si no está en la imagen)
- [ ] **PASO 1:** Verificar `.content-sections` (eliminar si hay componentes personalizados)
- [ ] **PASO 1:** Consultar `CATALOGO-COMPONENTES-UBITS.md`
- [ ] **PASO 1:** **⚠️ CRÍTICO: Si hay DataTable, verificar:**
  - [ ] Tipos de columnas correctos (estado → `type: 'estado'`, avance → `type: 'progreso'`, etc.)
  - [ ] Funcionalidades NO visibles (expansión de filas, columnas fijas, altura dinámica)
  - [ ] Consultar Storybook MCP o archivo de tipos antes de implementar
- [ ] **PASO 1:** Crear plan de implementación
- [ ] **PASO 1:** Mostrar plan al usuario y esperar aprobación
- [ ] **PASO 2:** Eliminar `.content-sections` del HTML estático si hay componentes personalizados
- [ ] **PASO 2:** Interceptar `updateContent` para eliminar `.content-sections` dinámicamente
- [ ] **PASO 2:** **⚠️ CRÍTICO: Implementar UNA tarea a la vez (NO múltiples tareas al tiempo)**
- [ ] **PASO 2:** Validar (`npm run lint`)
- [ ] **PASO 2:** Mostrar resultado y pedir aprobación
- [ ] **PASO 2:** Solo después de aprobación, continuar con siguiente tarea

---

## 🔗 Referencias

- **Proceso completo:** `GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`
- **Identificación de componentes:** `GUIA-IDENTIFICACION-COMPONENTES.md`
- **Análisis de iconos:** `GUIA-ANALISIS-ICONOS-DETALLADO.md` ⭐ **OBLIGATORIO para iconos**
- **Catálogo de componentes:** `CATALOGO-COMPONENTES-UBITS.md`
- **Implementación DataTable:** `GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`

---

## 💡 Resumen

1. **Identificar** template existente en `prototypes/`
2. **Modificar** ese template (NO crear uno nuevo)
3. **Analizar** imagen paso a paso
4. **Planificar** antes de implementar
5. **Implementar** en tareas pequeñas
6. **Aprobar** cada tarea antes de continuar

**Recuerda: El template ya existe después del wizard. Solo necesitas modificarlo, no crear uno nuevo.**




