# 🤖 Implementación Automática de Componentes

> **⚠️ CRÍTICO:** Este proceso se ejecuta AUTOMÁTICAMENTE cuando se detecta que se va a implementar un componente UBITS.

---

## 🎯 OBJETIVO

Garantizar que **TODA** implementación de componente UBITS:
1. ✅ Lea la documentación específica del componente
2. ✅ Consulte MCPs y Storybook
3. ✅ Siga las reglas y mejores prácticas
4. ✅ Evite errores comunes
5. ✅ Use props y tokens exactos

---

## 🔄 PROCESO AUTOMÁTICO (OBLIGATORIO)

### **FASE 0: DETECCIÓN DE COMPONENTE** 🔍

**Cuando se detecta que se va a implementar un componente:**

1. **Identificar el componente:**
   - Extraer nombre del componente de la solicitud
   - Mapear a nombre UBITS (ej: "tabla" → "DataTable", "tabs" → "Tabs")
   - Verificar en catálogo: `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`

2. **Verificar que existe:**
   - Si NO existe en catálogo → **DETENER** y preguntar al usuario
   - Si existe → Continuar con Fase 1

---

### **FASE 1: CARGA DE DOCUMENTACIÓN Y REGLAS** 📚

**⚠️ OBLIGATORIO: Leer estos archivos ANTES de implementar:**

#### 1.1 Documentación Específica del Componente

**Ruta:** `docs/referencia/componentes/[nombre-componente].md`

**Ejemplos:**
- DataTable → `docs/referencia/componentes/data-data-table.md`
- Tabs → `docs/referencia/componentes/navegacin-tabs.md`
- Button → `docs/referencia/componentes/bsicos-button.md`

**Contenido a extraer:**
- ✅ Descripción completa del componente
- ✅ Props y opciones disponibles
- ✅ Ejemplos de código
- ✅ Errores comunes específicos
- ✅ Tokens utilizados
- ✅ Callbacks y eventos

#### 1.1.1 Identificar Subcomponentes y Subfuncionalidades ⭐

**⚠️ CRÍTICO: Identificar TODOS los subcomponentes y subfuncionalidades:**

**Ejemplos de subcomponentes:**
- **Modal:** Header, Body, Footer (con botones)
- **Card Content:** Diferentes tipos de contenido (11 tipos)
- **DataTable:** Header, Columnas, Filas, Action Bar, Empty State
- **Tabs:** Tabs individuales con iconos, estados activos/inactivos
- **HeaderSection:** Back button, Info button, Status tag, Action buttons, Breadcrumb

**Ejemplos de subfuncionalidades:**
- **DataTable:**
  - Checkboxes (selección múltiple)
  - Action Bar (barra de acciones para selecciones)
  - Filtros (dropdown con filtros)
  - Búsqueda (SearchButton)
  - Ordenamiento (por columnas)
  - Reordenamiento (drag & drop de columnas/filas)
  - Menú de columnas (fijar/desfijar)
  - Menú contextual (click derecho)
  - Filas expandibles
  - Paginación
  - Empty states (sin datos, sin resultados de búsqueda)

- **Tabs:**
  - Tabs individuales con iconos
  - Estados activos/inactivos
  - Callbacks de cambio

- **Modal:**
  - Header con título
  - Body con contenido
  - Footer con botones configurables

**Proceso para identificar:**
1. Leer sección "Características principales" de la documentación
2. Leer sección "Opciones y Props" para identificar funcionalidades booleanas
3. Leer sección "Tipos de [elemento]" (ej: "Tipos de columnas" en DataTable)
4. Revisar todas las historias de Storybook del componente
5. Consultar MCPs para ver todas las opciones disponibles

**Documentar en el plan:**
- Lista completa de subcomponentes identificados
- Lista completa de subfuncionalidades identificadas
- Tipos/variantes disponibles (ej: 11 tipos de columnas en DataTable)
- Estados disponibles (ej: activo, inactivo, disabled, etc.)

#### 1.2 Reglas Generales

**Leer en este orden:**

1. **`.cursor/rules/03-componentes.md`** - Reglas generales de componentes
2. **`.cursor/rules/04-implementacion.md`** - Proceso de implementación
3. **`.cursor/rules/05-errores.md`** - Errores comunes a evitar
4. **`docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`** - Errores específicos UBITS

#### 1.3 Guías Específicas del Componente

**Si el componente tiene guías especializadas, leerlas:**

- **DataTable:**
  - `docs/guias/analisis/GUIA-ANALISIS-DATATABLE-COMPLETO.md`
  - `docs/guias/analisis/GUIA-ANALISIS-FUNCIONALIDADES-DATATABLE.md`
  - `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
  - `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md`
  - `docs/guias/implementacion/GUIA-EMPTY-STATE-FILTROS-DATATABLE.md`

- **Tabs:**
  - `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md`

- **Cualquier componente:**
  - `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md`
  - `docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md`

---

### **FASE 2: OBTENER PLAN BASADO EN HISTORIAS** 📚 ⭐ AUTOMÁTICO

**⚠️ AUTOMÁTICO: El Pre-Implementation Check add-on obtiene automáticamente el plan basado en historias cuando detecta un componente.**

**El agente DEBE usar el plan que el add-on ya obtuvo:**

```typescript
// Obtener AutorunHub
import { getAutorunHub } from '@autorun/core';
const hub = getAutorunHub();
const preCheckAddon = hub?.getAddon('pre-implementation-check');

// Obtener plan (el add-on ya lo obtuvo automáticamente cuando detectó el componente)
let plan = preCheckAddon?.getStoryBasedPlan(componentName);

// Si no existe, obtenerlo automáticamente
if (!plan) {
  const componentId = mapComponentNameToStorybookId(componentName);
  plan = await preCheckAddon?.getOrCreateStoryBasedPlan(componentName, componentId);
}

// Mostrar plan al usuario
if (plan) {
  console.log(`\n📚 Plan de implementación basado en historias:`);
  console.log(`   Componente: ${plan.componentName}`);
  console.log(`   Total de historias: ${plan.totalSteps}`);
  console.log(`   Tiempo estimado: ${plan.estimatedTotalTime}`);
  console.log(`\n📋 Historias a implementar:`);
  plan.storySteps.forEach((step, index) => {
    console.log(`   ${index + 1}. ${step.story.name} (${step.checklist.items.length} items)`);
  });
  // Pedir aprobación antes de continuar
}
```

**⚠️ CRÍTICO:**
- El plan se obtiene **automáticamente** cuando el add-on detecta el componente
- NO necesitas obtenerlo manualmente
- Solo necesitas **usarlo** para guiar la implementación

**Ver guía completa:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-AUTOMATICA-POR-HISTORIAS.md` - ⚠️ **OBLIGATORIO**

---

### **FASE 3: CONSULTA DE MCPs Y STORYBOOK (POR HISTORIA)** 🔌

**⚠️ OBLIGATORIO: Consultar CADA historia ANTES de implementarla:**

#### 3.1 Storybook en Vercel (Para Cada Historia)

**Proceso (para CADA historia del plan):**
1. Guardar URL del template ANTES de navegar
2. Navegar a la historia específica (NO usar "default")
3. Revisar pestaña **"Code"** para ver código exacto de esa funcionalidad
4. Revisar pestaña **"Controls"** para ver opciones específicas
5. Revisar pestaña **"Docs"** para ver documentación
6. **Volver al template** después de consultar

**Guía:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - ⚠️ **OBLIGATORIO**

#### 3.2 Storybook MCP

**Usar estas herramientas:**

```javascript
// 1. Listar componentes disponibles
mcp_storybook_getComponentList()

// 2. Obtener props exactas del componente
mcp_storybook_getComponentsProps({
  componentNames: ['Data/Data Table'] // Nombre exacto del componente
})
```

**Extraer:**
- ✅ Props exactas con tipos
- ✅ Valores por defecto
- ✅ Opciones disponibles para cada prop
- ✅ Estructura de datos esperada

#### 3.3 Storybook Local (si está disponible)

**URL:** `http://localhost:6006/`

**Revisar:**
- Controls
- Tokens
- Ejemplos
- Variantes

**Comparar con Vercel** (usar versión más reciente si hay diferencias)

---

### **FASE 4: IMPLEMENTACIÓN POR HISTORIAS** 🛠️ ⭐ AUTOMÁTICO

**⚠️ AUTOMÁTICO: Usar el plan basado en historias obtenido en FASE 2.**

**Implementar UNA historia a la vez siguiendo el plan:**

```typescript
// Para CADA historia del plan (UNA A LA VEZ):
for (let i = 0; i < plan.storySteps.length; i++) {
  const step = plan.storySteps[i];
  
  // ⚠️ CRÍTICO: Verificar que la historia anterior esté completa
  if (i > 0) {
    const previousStep = plan.storySteps[i - 1];
    if (!previousStep.checklist.allCompleted) {
      throw new Error(`⚠️ No se puede continuar: Checklist de "${previousStep.story.name}" no está completo`);
    }
  }
  
  // Obtener checklist de la historia actual
  const checklist = step.checklist;
  console.log(`\n📋 Implementando: ${step.story.name}`);
  console.log(`   Checklist: ${checklist.items.length} items`);
  
  // Completar cada item del checklist uno por uno
  // 1. Consultar historia en Storybook (guardar URL del template, navegar, revisar Code/Controls/Docs, volver)
  // 2. Entender la funcionalidad
  // 3. Implementar SOLO esa funcionalidad
  // 4. Probar que funciona
  
  // Verificar que TODO esté completo antes de continuar
  if (!step.checklist.allCompleted) {
    throw new Error(`⚠️ Checklist incompleto para "${step.story.name}"`);
  }
  
  console.log(`✅ "${step.story.name}" completada. Continuando...`);
}
```

**Para cada historia:**

1. Consultar historia específica en Storybook (NO usar "default")
2. Implementar SOLO la funcionalidad de esa historia
3. Usar código exacto de Storybook
4. Usar props exactas de MCPs
5. Completar TODO el checklist antes de continuar
6. Validar con `npm run lint`
7. Mostrar resultado
8. Pedir aprobación antes de continuar con la siguiente historia

**Ver guía completa:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-AUTOMATICA-POR-HISTORIAS.md` - ⚠️ **OBLIGATORIO**

---

### **FASE 5: PREPARACIÓN DE IMPLEMENTACIÓN (LEGACY - NO USAR)** 🛠️

**⚠️ DEPRECADO: Ya no crear plan manual. Usar plan basado en historias de FASE 2.**

**Basado en la documentación y MCPs, crear plan:**

```markdown
## 📋 Plan de Implementación: [Nombre Componente]

### Información del Componente:
- **Nombre UBITS:** [nombre exacto]
- **Categoría:** [Data/Navegación/Formularios/etc]
- **Documentación:** `docs/referencia/componentes/[archivo].md`

### Subcomponentes Identificados: ⭐
- **Subcomponente 1:** [descripción] - Documentación: [ruta si es componente independiente]
- **Subcomponente 2:** [descripción] - Documentación: [ruta si es componente independiente]

### Subfuncionalidades Identificadas: ⭐
- **Funcionalidad 1:** [descripción] - Prop: `[prop-name]` - Default: [valor]
- **Funcionalidad 2:** [descripción] - Prop: `[prop-name]` - Default: [valor]

### Tipos/Variantes Disponibles: ⭐
- **Tipo 1:** [descripción] - Uso: [cuándo usar]
- **Tipo 2:** [descripción] - Uso: [cuándo usar]

### Props a Usar (verificadas en Storybook):
- `prop1`: [tipo] - [descripción] - Default: [valor]
- `prop2`: [tipo] - [descripción] - Default: [valor]

### Estructura Exacta (copiada de Storybook):
```javascript
// Código exacto del ejemplo en Storybook
```

### Tokens UBITS a Usar:
- `--token-1`: [descripción]
- `--token-2`: [descripción]

### Errores Comunes a Evitar:
- ❌ [Error común #1]
- ❌ [Error común #2]

### Tareas Divididas (incluyendo subfuncionalidades):
1. **Tarea 1:** [Componente base] - [descripción pequeña]
2. **Tarea 2:** [Subfuncionalidad 1] - [descripción pequeña]
3. **Tarea 3:** [Subfuncionalidad 2] - [descripción pequeña]
4. **Tarea 4:** [Subcomponente 1] - [descripción pequeña]

### ¿Aprobar este plan?
```

#### 3.2 Verificar ContentManager

**Si el componente se agrega a `.content-area`:**

1. Leer: `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
2. Verificar si `updateContent` limpia el contenido
3. Planificar interceptación si es necesario

---

### **FASE 4: IMPLEMENTACIÓN POR HISTORIAS** ✅ ⭐ AUTOMÁTICO

**⚠️ AUTOMÁTICO: Usar el plan basado en historias obtenido en FASE 2.**

**Para CADA historia del plan (UNA A LA VEZ):**

1. **Obtener checklist de la historia**
2. **Consultar historia en Storybook** (guardar URL del template, navegar, revisar Code/Controls/Docs, volver)
3. **Entender la funcionalidad** específica de esa historia
4. **Implementar SOLO esa funcionalidad** (NO otras funcionalidades)
5. **Usar código exacto de Storybook** de esa historia específica
6. **Usar props exactas** obtenidas de MCPs
7. **Usar tokens exactos** de la documentación
8. **Completar TODO el checklist** antes de continuar
9. **Probar que funciona** correctamente
10. **Validar con `npm run lint`**
11. **Corregir errores automáticamente**
12. **Mostrar resultado al usuario**
13. **Pedir aprobación explícita** antes de continuar con la siguiente historia

**⚠️ CRÍTICO:**
- Implementar UNA historia a la vez
- Completar TODO el checklist antes de continuar
- NO usar la historia "default" (tiene todas las funcionalidades mezcladas)
- NO implementar múltiples historias al mismo tiempo

**Ver guía completa:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-AUTOMATICA-POR-HISTORIAS.md` - ⚠️ **OBLIGATORIO**

---

## 📋 CHECKLIST AUTOMÁTICO POR COMPONENTE

**Antes de implementar CUALQUIER componente, verificar:**

- [ ] ✅ Componente identificado y verificado en catálogo
- [ ] ✅ **Plan basado en historias obtenido automáticamente** (el add-on lo hace) ⭐ AUTOMÁTICO
- [ ] ✅ **Plan mostrado al usuario** con todas las historias ⭐
- [ ] ✅ **Plan aprobado por usuario** antes de continuar ⭐
- [ ] ✅ Documentación específica leída: `docs/referencia/componentes/[nombre].md`
- [ ] ✅ **Subcomponentes identificados** (si el componente los tiene) ⭐
- [ ] ✅ **Subfuncionalidades identificadas** (todas las funcionalidades del componente) ⭐
- [ ] ✅ **Tipos/variantes identificados** (ej: tipos de columnas, variantes de botón) ⭐
- [ ] ✅ **Documentación de subcomponentes leída** (si son componentes independientes) ⭐
- [ ] ✅ Reglas generales leídas: `.cursor/rules/03-componentes.md`
- [ ] ✅ Proceso de implementación leído: `.cursor/rules/04-implementacion.md`
- [ ] ✅ Errores comunes leídos: `.cursor/rules/05-errores.md`
- [ ] ✅ Guías específicas leídas (si aplica)
- [ ] ✅ **Plan basado en historias obtenido automáticamente** (el add-on lo hace) ⭐ AUTOMÁTICO
- [ ] ✅ **Plan mostrado al usuario** con todas las historias ⭐
- [ ] ✅ **Plan aprobado por usuario** antes de continuar ⭐
- [ ] ✅ Storybook en Vercel consultado (para cada historia específica, NO "default")
- [ ] ✅ **Todas las historias de Storybook revisadas** (una por una antes de implementar) ⭐
- [ ] ✅ Storybook MCP consultado: `mcp_storybook_getComponentsProps`
- [ ] ✅ Props exactas obtenidas de MCPs (incluyendo props de subfuncionalidades) ⭐
- [ ] ✅ Código exacto copiado de Storybook (de cada historia específica)
- [ ] ✅ Tokens UBITS identificados
- [ ] ✅ ContentManager verificado (si aplica)
- [ ] ✅ **Implementar UNA historia a la vez** (completar TODO el checklist antes de continuar) ⭐

---

## 🔗 MAPEO DE COMPONENTES A DOCUMENTACIÓN

### Data
- **DataTable** → `docs/referencia/componentes/data-data-table.md`
- **DataView** → `docs/referencia/componentes/data-data-view.md`
- **List** → `docs/referencia/componentes/data-list.md`
- **Pagination** → `docs/referencia/componentes/data-pagination.md`

### Navegación
- **Sidebar** → `docs/referencia/componentes/navegacin-sidebar.md`
- **SubNav** → `docs/referencia/componentes/navegacin-subnav.md`
- **TabBar** → `docs/referencia/componentes/navegacin-tab-bar.md`
- **Tabs** → `docs/referencia/componentes/navegacin-tabs.md`
- **Menu** → `docs/referencia/componentes/navegacin-menu.md`
- **Breadcrumb** → `docs/referencia/componentes/navegacin-breadcrumb.md`
- **TreeMenu** → `docs/referencia/componentes/navegacin-tree-menu.md`
- **Segment Control** → `docs/referencia/componentes/navegacin-segment-control.md`
- **Menu Participantes** → `docs/referencia/componentes/navegacin-menu-participantes.md`

### Formularios
- **Input** → `docs/referencia/componentes/formularios-input.md`
- **Checkbox** → `docs/referencia/componentes/formularios-checkbox.md`
- **Radio Button** → `docs/referencia/componentes/formularios-radio-button.md`
- **Toggle** → `docs/referencia/componentes/formularios-toggle.md`
- **Slider** → `docs/referencia/componentes/formularios-slider.md`
- **Calendar** → `docs/referencia/componentes/formularios-calendar.md`
- **File Upload** → `docs/referencia/componentes/formularios-file-upload.md`
- **Search Button** → `docs/referencia/componentes/formularios-search-button.md`

### Feedback
- **Alert** → `docs/referencia/componentes/feedback-alert.md`
- **Modal** → `docs/referencia/componentes/feedback-modal.md`
- **Toast** → `docs/referencia/componentes/feedback-toast.md`
- **Tooltip** → `docs/referencia/componentes/feedback-tooltip.md`
- **Popover** → `docs/referencia/componentes/feedback-popover.md`
- **Drawer** → `docs/referencia/componentes/feedback-drawer-navigation.md`
- **Empty State** → `docs/referencia/componentes/feedback-empty-state.md`
- **Mask** → `docs/referencia/componentes/feedback-mask.md`
- **Button Feedback** → `docs/referencia/componentes/feedback-button-feedback.md`

### Layout
- **Card Content** → `docs/referencia/componentes/layout-card-content.md`
- **Accordion** → `docs/referencia/componentes/layout-accordion.md`
- **Carousel** → `docs/referencia/componentes/layout-carousel.md`
- **Stepper** → `docs/referencia/componentes/layout-stepper.md`
- **Gallery** → `docs/referencia/componentes/layout-gallery.md`
- **HeaderSection** → `docs/referencia/componentes/layout-header-section.md`
- **Timeline** → `docs/referencia/componentes/layout-timeline.md`
- **Contenedor** → `docs/referencia/componentes/layout-contenedor.md`
- **Simple Card** → `docs/referencia/componentes/layout-simple-card.md`
- **Selection Card** → `docs/referencia/componentes/layout-selection-card.md`

### Básicos
- **Button** → `docs/referencia/componentes/bsicos-button.md`
- **ButtonAI** → `docs/referencia/componentes/bsicos-button-ai.md`
- **Avatar** → `docs/referencia/componentes/bsicos-avatar.md`
- **Badge** → `docs/referencia/componentes/bsicos-badge.md`
- **Chip** → `docs/referencia/componentes/bsicos-chip.md`
- **Scrollbar** → `docs/referencia/componentes/bsicos-scrollbar.md`
- **Skeleton** → `docs/referencia/componentes/bsicos-skeleton.md`
- **Spinner** → `docs/referencia/componentes/bsicos-spinner.md`
- **Status Tag** → `docs/referencia/componentes/bsicos-status-tag.md`

### Charts
- **Progress Bar** → `docs/referencia/componentes/charts-progress-bar.md`
- **Text Metric Card** → `docs/referencia/componentes/charts-text-metric-card.md`
- **Bar Metric Card** → `docs/referencia/componentes/charts-bar-metric-card.md`
- **Circle Metric Card** → `docs/referencia/componentes/charts-circle-metric-card.md`
- **CSAT Metric Card** → `docs/referencia/componentes/charts-csat-metric-card.md`
- **NPS Card** → `docs/referencia/componentes/charts-nps-card.md`
- **Score Card Metrics** → `docs/referencia/componentes/charts-score-card-metrics.md`

---

## 🚨 REGLAS CRÍTICAS

1. **NUNCA implementar sin leer documentación específica**
2. **NUNCA implementar sin identificar TODOS los subcomponentes y subfuncionalidades** ⭐
3. **NUNCA implementar sin consultar Storybook en Vercel**
4. **NUNCA implementar sin revisar TODAS las historias de Storybook** (para ver subfuncionalidades) ⭐
5. **NUNCA implementar sin consultar MCPs**
6. **NUNCA usar props que no estén en la documentación**
7. **NUNCA usar tokens que no estén documentados**
8. **SIEMPRE usar código exacto de Storybook como base**
9. **SIEMPRE dividir en tareas pequeñas** (una subfuncionalidad por tarea) ⭐
10. **SIEMPRE pedir aprobación entre tareas**
11. **SIEMPRE documentar subcomponentes y subfuncionalidades en el plan** ⭐

---

## 📚 Referencias

- **Documentación de componentes:** `docs/referencia/componentes/`
- **Catálogo:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- **Guía de uso de MCPs:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`
- **Guía de Storybook Vercel:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md`
- **Guía maestra:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-MAESTRA.md`

---

**Última actualización:** 2025-12-05
