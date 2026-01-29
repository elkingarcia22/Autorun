# 🛠️ Guía Maestra de Implementación

> **⚠️ IMPORTANTE:** Esta es la guía principal para implementar interfaces desde imágenes o solicitudes. **NUNCA implementar todo de golpe.**

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

2. **Identificar estructura y contenedores:**
   - **Orden de elementos:** ¿Qué va primero? ¿Qué va después?
   - **Contenedores:** ¿Qué elementos van en contenedores? ¿Cuáles no?
   - **Ver guía:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO

3. **Analizar spacing de forma específica:**
   - **⚠️ CRÍTICO: Medir visualmente cada espacio entre elementos**
   - **NO asumir** basándose en ejemplos anteriores
   - Mapear a tokens UBITS específicos
   - **Ver guía:** `docs/guias/analisis/GUIA-ANALISIS-ESTRUCTURA-SPACING.md` - ⚠️ OBLIGATORIO

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

### Spacing Específico (MEDIDO VISUALMENTE):
- **Entre SubNav y Tabs:** `--ubits-spacing-lg` (16px) ⚠️ MEDIDO
- **Entre Tabs y Barra de acciones:** `--ubits-spacing-lg` (16px) ⚠️ MEDIDO
- **Entre Barra de acciones y DataTable:** `--ubits-spacing-lg` (16px) ⚠️ MEDIDO

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

**⚠️ OBLIGATORIO:** Antes de implementar CUALQUIER componente:

1. **🚨 CRÍTICO: Verificar Storybook en Vercel (versión más reciente):** ⚠️ PRIMERO
   - URL: `https://ubits-storybook10.vercel.app/`
   - Revisar pestaña "Code" para ver estructura exacta
   - Revisar pestaña "Controls" para ver todas las opciones disponibles
   - **Ver guía:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - ⚠️ OBLIGATORIO

2. **Consultar Storybook MCP** (si está disponible)

3. **Revisar archivo de tipos** del componente

4. **Verificar en la imagen** qué funcionalidades están presentes

#### **Paso 2.1: Verificar ContentManager** 🚨

**⚠️ CRÍTICO:** Si vas a agregar elementos dentro de `.content-area`:

- [ ] Leer: `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` (OBLIGATORIO)
- [ ] Investigar código fuente del ContentManager
- [ ] Interceptar `updateContent` ANTES de agregar elementos al DOM
- [ ] Verificar módulo/sección antes de preservar elementos

**Ver guía completa:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`

#### **Paso 2.2: Implementar UNA Tarea a la Vez**

**Para cada tarea:**

1. **Implementar SOLO esa tarea** (no avanzar a la siguiente)
2. **Usar logs apropiados:**
   - Prefijos identificables: `[Componente]`
   - Emojis apropiados: 🔵 ✅ ⚠️ ❌
   - Estado ANTES y DESPUÉS de cambios críticos
   - **Ver:** `docs/guias/implementacion/GUIA-MANEJO-LOGS-DEPURACION.md`
3. **Ejecutar validación automática:** `npm run lint`
4. **Corregir errores automáticamente** si los hay
5. **Verificar que funciona correctamente:**
   - Probar funcionalidad manualmente
   - Verificar logs en consola
   - Verificar que event listeners funcionan
6. **Mostrar al usuario lo implementado** (incluyendo resultado de validación)
7. **Pedir aprobación explícita:** "¿Aprobamos para continuar con la siguiente tarea?"
8. **Solo después de aprobación, continuar con la siguiente tarea**

---

## 🎯 Guías Especializadas

Para componentes específicos, consulta:

- **DataTable:** [GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md](GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md)
- **Action Bar:** [GUIA-ACTION-BAR-DATATABLE.md](GUIA-ACTION-BAR-DATATABLE.md)
- **Crear desde Imagen:** [GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md](GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md)
- **Layout y Template:** [GUIA-LAYOUT-TEMPLATE-DATATABLE.md](GUIA-LAYOUT-TEMPLATE-DATATABLE.md)

---

## 📋 EJEMPLO DE DIVISIÓN DE TAREAS

**Para una interfaz con Tabs + Barra de acciones + DataTable:**

- ✅ **Tarea 1:** Estructura HTML base + Tabs (solo tabs, nada más)
- ✅ **Tarea 2:** Barra de acciones (solo después de aprobación de Tarea 1)
- ✅ **Tarea 3:** DataTable básico (solo columnas mínimas, sin funcionalidades avanzadas)
- ✅ **Tarea 4:** Funcionalidades del DataTable (UNA a la vez, ver guía específica)

**⚠️ CRÍTICO PARA DATATABLE:**
- ❌ **NUNCA** implementar todas las funcionalidades de DataTable de golpe
- ✅ **SIEMPRE** implementar UNA funcionalidad a la vez
- ✅ **SIEMPRE** analizar columnas primero (cantidad y tipo)
- ✅ **SIEMPRE** usar componentes UBITS para el buscador (`<ubits-input>` y `<ubits-button>`)

**NUNCA hacer:** Implementar Tarea 1 + 2 + 3 + 4 en un solo paso.

---

## ✅ Checklist de Implementación

Ver: `docs/checklists/CHECKLIST-IMPLEMENTACION-COMPLETA.md`

---

## 🔗 Referencias

- **Proceso completo:** [GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md](GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md)
- **Crear desde imagen:** [GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md](GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md)
- **DataTable:** [GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md](GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md)
- **Errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

---

**Última actualización:** 2025-01-03










