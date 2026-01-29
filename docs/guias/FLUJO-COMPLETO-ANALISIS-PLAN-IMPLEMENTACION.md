# 🔄 Flujo Completo: Análisis → Plan → Checklist → Implementación

> **⚠️ CRÍTICO:** Este es el flujo OBLIGATORIO que SIEMPRE debe seguirse para cualquier implementación.

---

## ✅ SÍ, el Sistema Funciona Así

**El proceso SIEMPRE es:**

1. **🔍 ANÁLISIS** - Analizar primero (componentes, iconos, spacing, etc.)
2. **📋 PLAN** - Crear plan de implementación detallado
3. **✅ CHECKLIST** - Crear checklist de tareas para cada componente
4. **🛠️ IMPLEMENTACIÓN** - Implementar paso a paso (UNA tarea a la vez)

**❌ NUNCA:** Implementar todo de una vez sin análisis y plan.

---

## 📊 FLUJO COMPLETO DETALLADO

### **ESCENARIO 1: Crear Dashboard/Home desde Imagen**

```
Usuario: "Crea un dashboard" o "Crea el home" o envía imagen
         ↓
[FASE 1] 🔍 ANÁLISIS OBLIGATORIO
         ↓
[FASE 2] 📋 PLAN DE IMPLEMENTACIÓN
         ↓
[FASE 3] ✅ CHECKLIST POR COMPONENTE
         ↓
[FASE 4] 🛠️ IMPLEMENTACIÓN PASO A PASO
```

---

### **FASE 1: 🔍 ANÁLISIS OBLIGATORIO**

**⚠️ CRÍTICO: NO escribir código todavía. Solo analizar.**

#### **1.1: Verificar Componentes Existentes del Template**

**PRIMERO verificar qué YA existe (NO implementar):**
- ✅ Sidebar (barra lateral izquierda) - Ya existe, NO implementar
- ✅ Header (barra superior) - Ya existe, NO implementar
- ✅ SubNav (barra horizontal debajo del header) - Ya existe, NO implementar
- ✅ TabBar (barra inferior móvil) - Ya existe si es móvil, NO implementar

#### **1.2: Identificar Componentes UBITS a Implementar**

**Analizar la imagen/solicitud para identificar:**
- ¿Qué componentes UBITS veo?
  - Tabs? → `window.createTabs()`
  - DataTable? → `window.createDataTable()`
  - Buttons? → `<ubits-button>` o `window.UBITS.Button.create()`
  - Inputs? → `<ubits-input>`
  - Modals? → `window.createModal()`
  - Drawers? → `window.createDrawer()`
  - Etc.

**Consultar:**
- `docs/referencia/CATALOGO-COMPONENTES-UBITS.md` - Para ver qué componentes existen
- `docs/referencia/componentes/` - Para documentación específica

#### **1.3: Analizar Iconos**

**Para cada icono identificado:**
- ¿Qué icono es? (FontAwesome)
- ¿Tiene variación? (simple, solid, regular, etc.)
- **Formato correcto:** `icon: 'user'` (sin prefijo `fa-`)
- **Si es simple:** `icon: 'user-simple'`

**Ver guía:** `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md`

#### **1.4: Analizar Spacing**

**⚠️ CRÍTICO: Medir visualmente, NO asumir**

**Para cada espacio entre elementos:**
- Medir visualmente en la imagen
- Mapear a token UBITS específico
- Documentar la medida (ej: "16px medido visualmente")

**Tokens disponibles:**
- `--ubits-spacing-xs` (4px)
- `--ubits-spacing-sm` (8px)
- `--ubits-spacing-md` (12px)
- `--ubits-spacing-lg` (16px)
- `--ubits-spacing-xl` (20px)
- `--ubits-spacing-2xl` (24px)
- etc.

**Ver guía:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`

#### **1.5: Analizar Estructura y Contenedores**

**Identificar:**
- Orden de elementos (¿qué va primero? ¿qué va después?)
- Contenedores (¿qué elementos van en contenedores? ¿cuáles no?)
- IDs necesarios para contenedores

**Ejemplo:**
```markdown
### Estructura identificada:
1. SubNav (sin contenedor, directo después del header)
2. Tabs (sin contenedor, directo después del SubNav)
3. Barra de acciones (en contenedor: `<div id="actions-bar">`)
4. DataTable (en contenedor: `<div id="table-container">`)
```

#### **1.6: Analizar Funcionalidades (si hay DataTable)**

**Si hay DataTable, analizar TODAS las funcionalidades:**
- Paginación (SÍ/NO)
- Búsqueda (SÍ/NO)
- Filtros (SÍ/NO)
- Ordenamiento (SÍ/NO)
- Checkboxes (SÍ/NO)
- Action Bar (SÍ/NO, si hay checkboxes)
- Filas expandibles (SÍ/NO)
- Columnas reordenables (SÍ/NO)
- Etc.

**Ver guías:**
- `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
- `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md`

#### **1.7: Verificar HeaderSection**

**⚠️ CRÍTICO:**
- ¿Hay HeaderSection en la imagen? (título grande, descripción, botones)
- Si **NO hay**, **DEBE eliminarse** del template
- Ver: `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`

---

### **FASE 2: 📋 PLAN DE IMPLEMENTACIÓN**

**Después del análisis, crear plan detallado:**

```markdown
## 📋 Plan de Implementación

### Componentes Identificados:
- ✅ Tabs de navegación (`window.createTabs`)
- ✅ DataTable (`window.createDataTable`)
- ✅ Input de búsqueda (`<ubits-input>`)
- ✅ Botones (`<ubits-button>`)

### Estructura:
1. SubNav (ya existe, NO implementar)
2. Tabs (sin contenedor, directo después del SubNav)
3. Barra de acciones (en contenedor: `<div id="actions-bar">`)
4. DataTable (en contenedor: `<div id="table-container">`)

### Spacing:
- Entre SubNav y Tabs: `--ubits-spacing-none` (0px)
- Entre Tabs y Barra de acciones: `--ubits-spacing-lg` (16px)
- Entre Barra de acciones y DataTable: `--ubits-spacing-lg` (16px)

### Iconos:
- Icono de búsqueda: `search` (simple)
- Icono de filtro: `filter` (simple)
- Icono de agregar: `plus` (simple)

### Funcionalidades DataTable:
- ✅ Paginación: SÍ
- ✅ Búsqueda: SÍ
- ✅ Filtros: SÍ
- ✅ Ordenamiento: SÍ
- ❌ Checkboxes: NO
- ❌ Action Bar: NO

### Tareas Divididas:
1. **Tarea 1:** Eliminar HeaderSection (si no está en imagen)
2. **Tarea 2:** Implementar Tabs
3. **Tarea 3:** Implementar Barra de acciones (búsqueda, filtros, botones)
4. **Tarea 4:** Implementar DataTable básico (columnas y datos)
5. **Tarea 5:** Agregar funcionalidades DataTable (paginación, búsqueda, filtros, ordenamiento)
```

**⚠️ CRÍTICO: Mostrar plan al usuario y ESPERAR aprobación explícita.**

---

### **FASE 3: ✅ CHECKLIST POR COMPONENTE**

**Para CADA componente, crear checklist específico:**

#### **Ejemplo: Checklist para Tabs**

```markdown
### ✅ Checklist: Implementar Tabs

- [ ] Consultar Storybook en Vercel (versión más reciente)
  - URL: https://ubits-storybook10.vercel.app/
  - Buscar: navegacion-tabs
  - Revisar pestaña "Code" y "Controls"
  - Volver al template después de consultar

- [ ] Consultar Storybook MCP
  - `mcp_storybook_getComponentsProps(['navegacion-tabs'])`

- [ ] Consultar documentación
  - Leer: `docs/referencia/componentes/navegacin-tabs.md`

- [ ] Verificar que NO es SubNav
  - SubNav ya existe en template, NO implementar
  - Tabs va dentro del contenido

- [ ] Verificar formato de iconos
  - Sin prefijo `fa-`
  - Con sufijo `-simple` si aplica

- [ ] Verificar spacing
  - NO agregar margin-top al contenedor
  - Spacing viene del gap del contenedor padre

- [ ] Implementar Tabs
  - Usar `window.createTabs()`
  - Configurar tabs según análisis

- [ ] Probar que funciona
  - Verificar en navegador
  - Verificar que no hay errores en consola
```

#### **Ejemplo: Checklist para DataTable**

```markdown
### ✅ Checklist: Implementar DataTable

- [ ] Consultar Storybook en Vercel
  - Buscar: data-data-table
  - Revisar todas las historias disponibles
  - Verificar funcionalidades

- [ ] Obtener plan basado en historias
  - Usar `getOrCreateStoryBasedPlan('DataTable', 'data-data-table')`
  - Implementar UNA historia a la vez

- [ ] Historia 1: DataTable básico
  - [ ] Consultar historia en Storybook
  - [ ] Implementar estructura básica
  - [ ] Probar que funciona

- [ ] Historia 2: Paginación
  - [ ] Consultar historia en Storybook
  - [ ] Implementar paginación
  - [ ] Probar que funciona

- [ ] Historia 3: Búsqueda
  - [ ] Consultar historia en Storybook
  - [ ] Implementar búsqueda
  - [ ] Probar que funciona

- [ ] ... (continuar con cada historia)
```

---

### **FASE 4: 🛠️ IMPLEMENTACIÓN PASO A PASO**

**⚠️ CRÍTICO: Implementar UNA tarea a la vez, completando TODO el checklist antes de continuar.**

**⚠️ CRÍTICO: Consultar Storybook ANTES de cada tarea/funcionalidad:**
- ✅ **NO es solo una vez al inicio**
- ✅ **SÍ es una vez por cada historia/funcionalidad**
- ✅ **Cada consulta es específica para esa funcionalidad**

**Ver:** `docs/guias/CUANDO-CONSULTAR-STORYBOOK.md` - ⚠️ **OBLIGATORIO**

#### **4.1: Para Cada Tarea del Plan**

1. **Obtener checklist de la tarea**
2. **Completar cada item del checklist uno por uno**
3. **Implementar SOLO esa tarea**
4. **Probar que funciona**
5. **Verificar que no hay errores**
6. **Pedir aprobación antes de continuar**

#### **4.2: Para Cada Componente**

**Si el componente tiene historias en Storybook:**
- Implementar UNA historia a la vez
- Completar TODO el checklist de esa historia
- NO continuar hasta que esté completo

**Ejemplo con DataTable:**
```typescript
// Historia 1: DataTable básico
// 1. Consultar historia en Storybook
// 2. Implementar estructura básica
// 3. Probar
// ✅ Checklist completo

// Historia 2: Paginación
// 1. Consultar historia en Storybook
// 2. Implementar paginación
// 3. Probar
// ✅ Checklist completo

// Continuar con siguiente historia...
```

---

## 🔄 FLUJO PARA IMPLEMENTAR UN COMPONENTE INDIVIDUAL

**Si el usuario pide: "Implementa un DataTable"**

```
Usuario: "Implementa un DataTable"
         ↓
[FASE 1] 🔍 ANÁLISIS
         - ¿Qué funcionalidades necesita?
         - ¿Tiene checkboxes?
         - ¿Tiene paginación?
         - ¿Tiene búsqueda?
         ↓
[FASE 2] 📋 PLAN
         - Obtener plan basado en historias de Storybook
         - Listar historias a implementar
         - Mostrar plan al usuario
         ↓
[FASE 3] ✅ CHECKLIST
         - Para cada historia, crear checklist
         - Items: Consultar Storybook, entender funcionalidad, implementar, probar
         ↓
[FASE 4] 🛠️ IMPLEMENTACIÓN
         - Implementar UNA historia a la vez
         - Completar TODO el checklist antes de continuar
```

---

## ⚠️ REGLAS CRÍTICAS

### **❌ NUNCA Hacer:**

1. ❌ Implementar sin análisis primero
2. ❌ Implementar sin plan
3. ❌ Implementar sin checklist
4. ❌ Implementar todo de una vez
5. ❌ Saltarse items del checklist
6. ❌ Continuar sin aprobación del usuario

### **✅ SIEMPRE Hacer:**

1. ✅ Analizar primero (componentes, iconos, spacing, estructura)
2. ✅ Crear plan detallado
3. ✅ Mostrar plan y esperar aprobación
4. ✅ Crear checklist para cada componente/tarea
5. ✅ Implementar UNA tarea a la vez
6. ✅ Completar TODO el checklist antes de continuar
7. ✅ Probar después de cada tarea
8. ✅ Pedir aprobación antes de continuar

---

## 📚 Referencias

### **Análisis:**
- `docs/guias/analisis/GUIA-ANALISIS-IMAGEN-MEJORADO.md` - Análisis mejorado
- `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - Análisis de spacing
- `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md` - Análisis de iconos
- `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md` - Análisis de DataTable

### **Implementación:**
- `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md` - Proceso completo
- `docs/guias/implementacion/GUIA-IMPLEMENTACION-POR-HISTORIAS-STORYBOOK.md` - Por historias
- `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md` - Checklist obligatorio

### **Detección:**
- `.cursor/rules/01-deteccion-imagen.md` - Detección de imágenes
- `.cursor/rules/02-bloqueo-imagen.md` - Bloqueo antes de análisis

---

## ✅ Resumen

**SÍ, el sistema funciona exactamente así:**

1. **🔍 ANÁLISIS** → Analizar componentes, iconos, spacing, estructura
2. **📋 PLAN** → Crear plan detallado y mostrarlo al usuario
3. **✅ CHECKLIST** → Crear checklist para cada componente/tarea
4. **🛠️ IMPLEMENTACIÓN** → Implementar paso a paso, UNA tarea a la vez

**Este flujo es OBLIGATORIO y está implementado en el sistema.**

---

**Última actualización:** 2025-01-03




