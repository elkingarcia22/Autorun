# 🔄 Guía: Proceso de Implementación Paso a Paso

Esta guía establece el proceso **OBLIGATORIO** para implementar interfaces desde imágenes o solicitudes. **NUNCA implementar todo de golpe.**

---

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"Divide y vencerás"** - Implementar en pasos pequeños, pedir aprobación en cada paso, y solo avanzar cuando el usuario apruebe.

---

## 📋 PROCESO COMPLETO (OBLIGATORIO)

### **FASE 1: ANÁLISIS Y PLANIFICACIÓN** 🎯

#### **Paso 1.1: Analizar la Imagen/Solicitud**

**SIEMPRE hacer esto PRIMERO antes de escribir código:**

1. **Identificar componentes UBITS:**
   - ¿Qué componentes UBITS veo en la imagen?
   - ¿Sidebar? ¿SubNav? ¿Tabs? ¿DataTable? ¿Buttons? ¿Inputs?
   - **⚠️ CRÍTICO: Distinguir SubNav de Tabs:**
     - **SubNav:** Barra horizontal debajo del header → Ya existe, NO implementar
     - **Tabs:** Tabs dentro del contenido → Se implementa con `window.createTabs()`
     - **Ver guía:** `docs/guias/analisis/GUIA-DISTINGUIR-SUBNAV-TABS.md` - ⚠️ OBLIGATORIO
   - **⚠️ CRÍTICO: Verificar HeaderSection:**
     - ¿Hay un HeaderSection en la imagen? (título grande, descripción, botones de acción)
     - Si **NO hay HeaderSection** en la imagen, **DEBE eliminarse del template:**
       - Eliminar CSS: `<link rel="stylesheet" href="...header-section.css" />`
       - Eliminar estilos CSS de `#header-section-container`
       - Eliminar contenedor HTML `<div id="header-section-container"></div>` si existe
   - Consultar `CATALOGO-COMPONENTES-UBITS.md`

2. **Identificar estructura y contenedores** ⚠️ CRÍTICO:
   - **Orden de elementos:** ¿Qué va primero? ¿Qué va después?
   - **Contenedores:**
     - ¿Qué elementos van en contenedores?
     - ¿Qué elementos NO van en contenedores?
     - ¿Qué elementos van en contenedores independientes?
     - ¿Hay un contenedor principal o múltiples contenedores?
   - **Ejemplo de análisis:**
     ```markdown
     ### Estructura identificada:
     1. SubNav (sin contenedor, va directo después del header)
     2. Tabs (sin contenedor, va directo después del SubNav)
     3. Barra de acciones (en contenedor independiente con id="actions-bar")
     4. DataTable (en contenedor independiente con id="table-container")
     
     ### Contenedores:
     - ❌ Tabs NO van en contenedor (van directo en el body/main)
     - ✅ Barra de acciones SÍ va en contenedor: `<div id="actions-bar">`
     - ✅ DataTable SÍ va en contenedor: `<div id="table-container">`
     ```

3. **Analizar spacing de forma específica** ⚠️ CRÍTICO:
   - **Spacing entre elementos:**
     - ¿Cuánto espacio hay entre cada elemento?
     - Medir visualmente y mapear a tokens UBITS
   - **Spacing dentro de elementos:**
     - ¿Cuánto padding tiene cada contenedor?
     - ¿Cuánto gap hay entre elementos dentro de un contenedor?
   - **Tokens de spacing disponibles:**
     - `--ubits-spacing-xs` (4px)
     - `--ubits-spacing-sm` (8px)
     - `--ubits-spacing-md` (12px)
     - `--ubits-spacing-lg` (16px)
     - `--ubits-spacing-xl` (20px)
     - `--ubits-spacing-2xl` (24px)
     - `--ubits-spacing-3xl` (28px)
     - `--ubits-spacing-4xl` (32px)
     - `--ubits-spacing-5xl` (36px)
     - `--ubits-spacing-6xl` (40px)
     - `--ubits-spacing-8` (32px)
     - `--ubits-spacing-10` (40px)
     - `--ubits-spacing-12` (48px)
     - `--ubits-spacing-16` (64px)
     - `--ubits-spacing-20` (80px)
     - `--ubits-spacing-24` (96px)
   - **Ejemplo de análisis:**
     ```markdown
     ### Spacing identificado:
     - **Entre SubNav y Tabs:** `--ubits-spacing-none` (0px, van pegados)
     - **Entre Tabs y Barra de acciones:** `--ubits-spacing-lg` (16px)
     - **Entre Barra de acciones y DataTable:** `--ubits-spacing-lg` (16px)
     - **Dentro de Barra de acciones (gap entre botones):** `--ubits-spacing-sm` (8px)
     - **Padding del contenedor de acciones:** `--ubits-spacing-none` (0px, sin padding)
     - **Padding del contenedor de DataTable:** `--ubits-spacing-none` (0px, sin padding)
     ```

4. **Identificar funcionalidades:**
   - ¿Qué debe hacer cada componente?
   - ¿Hay interacciones? ¿Callbacks?
   - ¿Hay datos dinámicos?

5. **Identificar tokens de colores:**
   - ¿Qué colores se usan?
   - ¿Qué tokens UBITS corresponden?

#### **Paso 1.2: Crear Plan de Implementación**

**SIEMPRE presentar un plan antes de implementar:**

```markdown
## 📋 Plan de Implementación

### Componentes Identificados:
- ✅ Tabs de navegación (`window.createTabs`)
- ✅ DataTable (`window.createDataTable`)
- ✅ Input de búsqueda (`<ubits-input>`)
- ✅ Botones (`<ubits-button>`)

### Estructura y Contenedores:
1. SubNav (sin contenedor, directo después del header)
2. Tabs (sin contenedor, directo después del SubNav)
3. Barra de acciones (en contenedor independiente: `<div id="actions-bar">`)
4. DataTable (en contenedor independiente: `<div id="table-container">`)

### Spacing Específico:
- **Entre SubNav y Tabs:** `--ubits-spacing-none` (0px)
- **Entre Tabs y Barra de acciones:** `--ubits-spacing-lg` (16px)
- **Entre Barra de acciones y DataTable:** `--ubits-spacing-lg` (16px)
- **Dentro de Barra de acciones (gap):** `--ubits-spacing-sm` (8px)
- **Padding contenedores:** `--ubits-spacing-none` (0px)

### Tokens a usar:
- Colores: `--ubits-accent-brand-static` (botones primarios)
- Spacing: Ver análisis específico arriba
- Tipografía: `ubits-heading-lg-semibold`, `ubits-body-md-regular`

### Tareas Divididas:
1. **Tarea 1:** Implementar estructura HTML base y tabs
2. **Tarea 2:** Implementar barra de acciones (búsqueda, filtros, botones)
3. **Tarea 3:** Implementar DataTable básico (columnas y datos mínimos)
4. **Tarea 4:** Personalizar DataTable (estados, progress bars, funcionalidades)

### ¿Aprobar este plan?
```

#### **Paso 1.3: Esperar Aprobación del Usuario**

**NUNCA implementar sin aprobación explícita.**

---

### **FASE 2: IMPLEMENTACIÓN PASO A PASO** 🛠️

#### **Paso 2.0: Revisar Componente Antes de Implementar** 🔍

**⚠️ OBLIGATORIO:** Antes de implementar CUALQUIER componente, revisar su archivo de tipos para identificar variantes, controladores y funcionalidades.

**Ubicación del archivo de tipos:**
```
vendor/ubits/packages/components/[nombre-componente]/src/types/[Nombre]Options.ts
```

**Ejemplo de rutas:**
- Button: `vendor/ubits/packages/components/button/src/types/ButtonOptions.ts`
- DataTable: `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`
- Input: `vendor/ubits/packages/components/input/src/types/InputOptions.ts`
- Tabs: `vendor/ubits/packages/components/tabs/src/types/TabsOptions.ts`

**Proceso de revisión:**

1. **Variantes disponibles:**
   - ¿Qué variantes tiene el componente? (ej: `primary`, `secondary`, `ghost`)
   - ¿Qué tamaños? (ej: `sm`, `md`, `lg`)
   - Consultar el archivo de tipos: `vendor/ubits/packages/components/[nombre]/src/types/[Nombre]Options.ts`

2. **Controladores (opciones que prende/apaga funcionalidades):**
   - ¿Qué opciones booleanas tiene? (ej: `disabled`, `loading`, `showCheckbox`)
   - ¿Qué opciones de configuración? (ej: `columnSortable`, `rowReorderable`)
   - ¿Qué callbacks/eventos? (ej: `onClick`, `onRowSelect`, `onSort`)

3. **Funcionalidades:**
   - Listar todas las funcionalidades disponibles
   - Identificar cuáles se necesitan para esta implementación
   - Dividir en tareas independientes

**Ejemplo de revisión para Button:**
```typescript
// Revisar: vendor/ubits/packages/components/button/src/types/ButtonOptions.ts

// Variantes:
- variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
- size: 'sm' | 'md' | 'lg'

// Controladores:
- disabled: boolean
- loading: boolean
- iconOnly: boolean
- fullWidth: boolean
- dropdown: boolean
- showTooltip: boolean

// Funcionalidades:
1. Botón básico (texto + variante)
2. Botón con icono
3. Botón icon-only
4. Botón con loading
5. Botón deshabilitado
6. Botón con dropdown
7. Botón con tooltip
```

**Ejemplo de revisión para DataTable:**
```typescript
// Revisar: vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts

// Controladores principales:
- showCheckbox: boolean
- rowReorderable: boolean
- columnReorderable: boolean
- columnSortable: boolean
- header.filterButton: boolean
- header.columnSelectorButton: boolean
- header.actionBar.showOnSingleSelect: boolean
- header.actionBar.showOnMultipleSelect: boolean

// Funcionalidades identificadas:
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
```

**Mostrar al usuario:**
```markdown
## 🔍 Revisión de Componente: [Nombre]

### Variantes disponibles:
- [Lista de variantes]

### Controladores:
- [Lista de opciones booleanas y de configuración]

### Funcionalidades identificadas:
1. [Funcionalidad 1]
2. [Funcionalidad 2]
...

### Plan de implementación:
- Tarea 1: [Funcionalidad básica]
- Tarea 2: [Funcionalidad 2]
...

### ¿Aprobamos este plan?
```

---

#### **Paso 2.0.5: Verificar Módulo Actual** ⚠️ CRÍTICO

**ANTES de implementar cualquier componente específico de módulo:**

1. **Verificar módulo actual:**
   ```javascript
   // ⚠️ CRÍTICO: Verificar módulo antes de inicializar
   const currentModule = document.body.getAttribute('data-module');
   if (currentModule !== 'encuestas') {
     console.log('⏭️ No estamos en módulo encuestas, saltando inicialización');
     return; // NO inicializar si no estamos en el módulo correcto
   }
   ```

2. **Verificar sección actual (si es necesario):**
   ```javascript
   // Alternativa: Verificar sección en ContentManager
   const currentSection = window.UBITS_ContentManager?.currentSection;
   if (currentSection !== 'encuestas') {
     return; // NO hacer nada si no estamos en la sección correcta
   }
   ```

3. **Aplicar a TODAS las funciones de inicialización:**
   - ✅ Función de inicialización de tabs
   - ✅ Función de inicialización de DataTable
   - ✅ Interceptación de ContentManager
   - ✅ Observers del DOM
   - ✅ Eliminación de HeaderSection

**Ejemplo correcto:**
```javascript
function initEncuestasTabs() {
  // ⚠️ CRÍTICO: Verificar módulo
  const currentModule = document.body.getAttribute('data-module');
  if (currentModule !== 'encuestas') {
    return; // NO inicializar si no estamos en encuestas
  }
  
  // Solo aquí inicializar los tabs
  window.createTabs({...}, 'tabs-container');
}
```

**⚠️ ERROR COMÚN A EVITAR:**
```javascript
// ❌ INCORRECTO: Inicializar sin verificar módulo
function initTabs() {
  window.createTabs({...}, 'tabs-container'); // ❌ Se ejecuta en TODOS los módulos
}
```

**Ver:** `GUIA-ERRORES-COMUNES-UBITS.md` - Error #8 y #9 para más detalles.

---

#### **Paso 2.1: Implementar Tarea 1 (Estructura Base + Tabs)**

**Hacer SOLO esto:**

1. **Verificar módulo actual** (Paso 2.0.5)
2. Crear estructura HTML básica
3. Implementar tabs de navegación (con verificación de módulo)
4. Verificar que los tabs funcionen correctamente
5. **Ejecutar validación automática** (ver Paso 2.1.1)

**Código de ejemplo:**
```javascript
// ⚠️ CRÍTICO: Verificar módulo antes de inicializar
function initEncuestasTabs() {
  // Verificar que estamos en el módulo correcto
  const currentModule = document.body.getAttribute('data-module');
  if (currentModule !== 'encuestas') {
    console.log('⏭️ No estamos en módulo encuestas, saltando inicialización');
    return; // NO inicializar si no estamos en el módulo correcto
  }
  
  // SOLO tabs, nada más
  window.createTabs({
    tabs: [
      { id: 'encuestas', label: 'Encuestas', icon: 'list' },
      { id: 'datos-demograficos', label: 'Datos demográficos', icon: 'chart-pie' }
    ],
    activeTabId: 'encuestas',
    onTabChange: (tabId) => console.log('Tab:', tabId)
  }, 'tabs-container');
}
```

**Paso 2.1.1: Ejecutar Validación Automática** ✅

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
2. Corregir automáticamente:
   - Reemplazar colores hardcodeados con tokens
   - Reemplazar clases prohibidas con oficiales
   - Usar componentes oficiales en lugar de custom
   - Corregir formato de código
3. Ejecutar validación de nuevo: `npm run lint`
4. Repetir hasta que pase

**Mostrar al usuario:**
- ✅ Tabs implementados
- ✅ Funcionan correctamente
- ✅ Estilos UBITS aplicados
- ✅ Validación pasada (o errores corregidos)

**Preguntar:**
> "✅ Tarea 1 completada: Tabs implementados y validación pasada. ¿Los tabs se ven correctos? ¿Aprobamos para continuar con la Tarea 2 (barra de acciones)?"

---

#### **Paso 2.2: Implementar Tarea 2 (Barra de Acciones)**

**Solo después de aprobación de Tarea 1:**

1. Agregar barra de acciones debajo de los tabs
2. Implementar input de búsqueda
3. Implementar botones (filtro, grid, crear con plantilla, crear encuesta)

**Código de ejemplo:**
```html
<!-- Barra de acciones -->
<div style="display: flex; gap: var(--ubits-spacing-sm); margin-bottom: var(--ubits-spacing-lg);">
  <ubits-input type="search" placeholder="Buscar encuestas..." icon-left="search"></ubits-input>
  <ubits-button variant="ghost" size="md" icon-left="filter"></ubits-button>
  <ubits-button variant="ghost" size="md" icon-left="th"></ubits-button>
  <ubits-button variant="secondary" size="md" icon-left="file">Crear con plantilla</ubits-button>
  <ubits-button variant="primary" size="md" icon-left="plus">Crear encuesta</ubits-button>
</div>
```

**Paso 2.2.1: Ejecutar Validación Automática** ✅

```bash
npm run lint
```

**Mostrar al usuario:**
- ✅ Barra de acciones implementada
- ✅ Todos los botones visibles
- ✅ Input de búsqueda funcional
- ✅ Validación pasada (o errores corregidos)

**Preguntar:**
> "✅ Tarea 2 completada: Barra de acciones implementada y validación pasada. ¿Se ve correctamente? ¿Aprobamos para continuar con la Tarea 3 (DataTable básico)?"

---

#### **Paso 2.3: Implementar Tarea 3 (DataTable Básico)**

**Solo después de aprobación de Tarea 2:**

**⚠️ IMPORTANTE:** Para DataTable, seguir la guía específica: `GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`

1. **Primero:** Analizar columnas (cantidad y tipo)
2. **Segundo:** Implementar DataTable con estructura mínima
3. **Tercero:** Solo columnas básicas (sin funcionalidades avanzadas)
4. **Cuarto:** Datos de ejemplo simples

**Código de ejemplo:**
```javascript
// DataTable MÍNIMO - solo estructura básica
window.createDataTable({
  containerId: 'encuestas-table-container',
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'text' },
    { id: 'tipo', title: 'Tipo', type: 'text' },
    { id: 'estado', title: 'Estado', type: 'estado' }
  ],
  rows: [
    { id: 1, data: { nombre: 'Cultura 2025', tipo: 'Cultura', estado: 'en-progreso' } },
    { id: 2, data: { nombre: 'Cultura 2025', tipo: 'Cultura', estado: 'en-progreso' } }
  ]
});
```

**Mostrar al usuario:**
- ✅ DataTable renderizado
- ✅ Columnas visibles
- ✅ Datos mostrándose

**Preguntar:**
> "✅ Tarea 3 completada: DataTable básico implementado. ¿La tabla se ve correctamente? ¿Aprobamos para continuar con las funcionalidades del DataTable (siguiendo `GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`)?"

---

#### **Paso 2.4: Implementar Funcionalidades del DataTable (Paso a Paso)**

**Solo después de aprobación de Tarea 3:**

**⚠️ CRÍTICO:** Para DataTable, **NUNCA** implementar todas las funcionalidades de golpe. Seguir `GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md` e implementar **UNA funcionalidad a la vez:**

1. ✅ **Tarea 4.1:** Checkboxes
2. ✅ **Tarea 4.2:** Arrastrar y soltar filas
3. ✅ **Tarea 4.3:** Arrastrar y soltar columnas
4. ✅ **Tarea 4.4:** Ordenamiento
5. ✅ **Tarea 4.5:** Fijar columnas
6. ✅ **Tarea 4.6:** Selector de columnas
7. ✅ **Tarea 4.7:** Barra de acciones (selección única)
8. ✅ **Tarea 4.8:** Barra de acciones (selección múltiple)
9. ✅ **Tarea 4.9:** Dropdown con filtros
10. ✅ **Tarea 4.10:** Buscador con componentes UBITS

**Cada funcionalidad debe:**
- Implementarse independientemente
- Verificarse antes de continuar
- Aprobarse explícitamente por el usuario

**Ver guía completa:** `GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`

---

## 🚨 REGLAS CRÍTICAS

### **1. NUNCA Implementar Todo de Golpe**
- ❌ NO implementar tabs + barra + tabla en un solo paso
- ✅ SIEMPRE dividir en tareas pequeñas
- ✅ SIEMPRE pedir aprobación entre tareas

### **2. SIEMPRE Analizar Primero**
- ❌ NO empezar a codificar inmediatamente
- ✅ SIEMPRE analizar la imagen/solicitud primero
- ✅ SIEMPRE crear un plan y mostrarlo al usuario

### **3. SIEMPRE Esperar Aprobación**
- ❌ NO continuar sin aprobación explícita
- ✅ SIEMPRE preguntar: "¿Aprobamos para continuar?"
- ✅ SIEMPRE mostrar lo que se implementó antes de continuar

### **4. SIEMPRE Verificar Funcionalidad**
- ❌ NO asumir que funciona
- ✅ SIEMPRE verificar que cada componente funciona
- ✅ SIEMPRE probar antes de pedir aprobación

### **5. SIEMPRE Documentar Opciones**
- ❌ NO usar opciones sin explicar
- ✅ SIEMPRE explicar qué opciones se usan y por qué
- ✅ SIEMPRE consultar documentación de componentes complejos (como DataTable)

---

## 📝 PLANTILLA DE MENSAJE PARA CADA TAREA

```
## ✅ Tarea [N] Completada: [Nombre de la Tarea]

### Lo que se implementó:
- [ ] Componente X
- [ ] Componente Y
- [ ] Funcionalidad Z

### Código implementado:
[Mostrar código relevante]

### Verificación:
- ✅ Componente renderiza correctamente
- ✅ Estilos UBITS aplicados
- ✅ Funcionalidad básica funciona

### ¿Aprobamos para continuar con la Tarea [N+1]?
```

---

## 🎯 EJEMPLO COMPLETO: Implementar Interfaz de Encuestas

### **FASE 1: Análisis**

```
## 📋 Análisis de la Imagen

### Componentes Identificados:
1. **Tabs de navegación** - `window.createTabs()`
   - "Encuestas" (activo)
   - "Datos demográficos"
   
2. **Barra de acciones:**
   - Input de búsqueda - `<ubits-input type="search">`
   - Botones ghost - `<ubits-button variant="ghost">`
   - Botones secundario/primario - `<ubits-button>`

3. **DataTable** - `window.createDataTable()`
   - Columnas: checkbox, nombre, tipo, estado, inicio, cierre, participantes, avance
   - Funcionalidades: checkboxes, sorting, status tags, progress bars

### Plan de Implementación:
1. **Tarea 1:** Estructura HTML + Tabs (5 min)
2. **Tarea 2:** Barra de acciones (5 min)
3. **Tarea 3:** DataTable básico (10 min)
4. **Tarea 4:** DataTable completo (15 min)

### ¿Aprobar este plan?
```

### **FASE 2: Implementación**

**Tarea 1 → Aprobación → Tarea 2 → Aprobación → Tarea 3 → Aprobación → Tarea 4**

---

## 🔗 Referencias

- **Catálogo:** `CATALOGO-COMPONENTES-UBITS.md`
- **Guía de uso:** `GUIA-USO-COMPONENTES-UBITS.md`
- **Errores comunes:** `GUIA-ERRORES-COMUNES-UBITS.md`
- **DataTable paso a paso:** `GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md` ⭐ **OBLIGATORIO para DataTable**
- **DataTable Options:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

