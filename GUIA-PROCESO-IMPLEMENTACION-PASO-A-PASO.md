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
   - Consultar `CATALOGO-COMPONENTES-UBITS.md`

2. **Identificar estructura:**
   - ¿Cuál es la jerarquía visual?
   - ¿Qué va primero? ¿Qué va después?
   - ¿Hay secciones separadas?

3. **Identificar funcionalidades:**
   - ¿Qué debe hacer cada componente?
   - ¿Hay interacciones? ¿Callbacks?
   - ¿Hay datos dinámicos?

4. **Identificar tokens y estilos:**
   - ¿Qué colores se usan?
   - ¿Qué espaciados?
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

### Estructura:
1. Header con título
2. Tabs de navegación (Encuestas / Datos demográficos)
3. Barra de acciones (búsqueda, filtros, botones)
4. DataTable con columnas: checkbox, nombre, tipo, estado, fechas, participantes, avance

### Tokens a usar:
- Colores: `--ubits-accent-brand-static` (botones primarios)
- Espaciados: `--ubits-spacing-md`, `--ubits-spacing-lg`
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

#### **Paso 2.1: Implementar Tarea 1 (Estructura Base + Tabs)**

**Hacer SOLO esto:**

1. Crear estructura HTML básica
2. Implementar tabs de navegación
3. Verificar que los tabs funcionen correctamente

**Código de ejemplo:**
```javascript
// SOLO tabs, nada más
window.createTabs({
  tabs: [
    { id: 'encuestas', label: 'Encuestas', icon: 'list' },
    { id: 'datos-demograficos', label: 'Datos demográficos', icon: 'clock' }
  ],
  activeTabId: 'encuestas',
  onTabChange: (tabId) => console.log('Tab:', tabId)
}, 'tabs-container');
```

**Mostrar al usuario:**
- ✅ Tabs implementados
- ✅ Funcionan correctamente
- ✅ Estilos UBITS aplicados

**Preguntar:**
> "✅ Tarea 1 completada: Tabs implementados. ¿Los tabs se ven correctos? ¿Aprobamos para continuar con la Tarea 2 (barra de acciones)?"

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

**Mostrar al usuario:**
- ✅ Barra de acciones implementada
- ✅ Todos los botones visibles
- ✅ Input de búsqueda funcional

**Preguntar:**
> "✅ Tarea 2 completada: Barra de acciones implementada. ¿Se ve correctamente? ¿Aprobamos para continuar con la Tarea 3 (DataTable básico)?"

---

#### **Paso 2.3: Implementar Tarea 3 (DataTable Básico)**

**Solo después de aprobación de Tarea 2:**

1. Implementar DataTable con estructura mínima
2. Solo columnas básicas (sin funcionalidades avanzadas)
3. Datos de ejemplo simples

**Código de ejemplo:**
```javascript
// DataTable MÍNIMO - solo estructura básica
window.createDataTable({
  containerId: 'encuestas-table-container',
  columns: [
    { id: 'nombre', title: 'Nombre', type: 'nombre' },
    { id: 'tipo', title: 'Tipo', type: 'nombre' },
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
> "✅ Tarea 3 completada: DataTable básico implementado. ¿La tabla se ve correctamente? ¿Aprobamos para continuar con la Tarea 4 (personalización completa)?"

---

#### **Paso 2.4: Implementar Tarea 4 (Personalización DataTable)**

**Solo después de aprobación de Tarea 3:**

1. Agregar todas las columnas faltantes
2. Agregar funcionalidades (checkboxes, sorting, etc.)
3. Personalizar tipos de columna (progreso, fechas, etc.)
4. Agregar datos completos

**Código de ejemplo:**
```javascript
// DataTable COMPLETO con todas las funcionalidades
window.createDataTable({
  containerId: 'encuestas-table-container',
  columns: [
    { id: 'select', title: '', type: 'checkbox', width: 50 },
    { id: 'nombre', title: 'Nombre', type: 'nombre' },
    { id: 'tipo', title: 'Tipo', type: 'nombre' },
    { id: 'estado', title: 'Estado', type: 'estado' },
    { id: 'inicio', title: 'Inicio', type: 'fecha' },
    { id: 'cierre', title: 'Cierre', type: 'fecha' },
    { id: 'participantes', title: 'Participantes', type: 'nombre' },
    { id: 'avance', title: 'Avance', type: 'progreso' }
  ],
  rows: [
    // ... datos completos
  ],
  showCheckbox: true,
  columnSortable: true,
  // ... otras opciones
});
```

**Mostrar al usuario:**
- ✅ DataTable completo
- ✅ Todas las columnas
- ✅ Todas las funcionalidades
- ✅ Datos completos

**Preguntar:**
> "✅ Tarea 4 completada: DataTable personalizado implementado. ¿Todo funciona correctamente? ¿Hay algo que ajustar?"

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
- **DataTable completo:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

