# 🛠️ Reglas de Implementación

> **⚠️ CRÍTICO:** Estas reglas deben seguirse al implementar componentes y funcionalidades.

---

## 🔌 USO OBLIGATORIO DE MCPs

**⚠️ CRÍTICO:** Antes de implementar cualquier componente UBITS, DEBES consultar los MCPs disponibles para obtener información exacta.

**Ver guía completa:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - ⚠️ **OBLIGATORIO**

### Proceso Obligatorio:

1. **Consultar Storybook MCP:**
   - Usar `mcp_storybook_getComponentList` para listar componentes
   - Usar `mcp_storybook_getComponentsProps` para obtener props exactas
   - Verificar estructura, tokens, controles y variantes

2. **Consultar Storybook directamente:**
   - Abrir `http://localhost:6006` en navegador
   - Revisar Controls, Tokens, Ejemplos y Variantes
   - Obtener código exacto del componente

3. **Implementar con información exacta:**
   - Usar props exactas obtenidas del MCP
   - Usar tokens exactos obtenidos del Storybook
   - Seguir estructura exacta del componente

**NO implementar componentes sin consultar MCPs primero.**

---

## 🔄 PROCESO DE IMPLEMENTACIÓN PASO A PASO (OBLIGATORIO)

**⚠️ REGLA CRÍTICA:** **NUNCA implementar todo de golpe. SIEMPRE dividir en tareas pequeñas y pedir aprobación.**

### **FASE 1: ANÁLISIS Y PLANIFICACIÓN** (OBLIGATORIO)

1. **Analizar la imagen/solicitud:**
   - Identificar componentes UBITS
   - Identificar estructura visual
   - Identificar funcionalidades
   - Identificar tokens y estilos

2. **Crear plan de implementación:**
   - Listar componentes identificados
   - Describir estructura
   - Listar tokens a usar
   - **Dividir en tareas pequeñas** (ej: Tarea 1: Tabs, Tarea 2: Barra acciones, Tarea 3: DataTable básico, Tarea 4: DataTable completo)

3. **Mostrar plan al usuario:**
   - Presentar análisis completo
   - Mostrar plan de tareas
   - **Esperar aprobación explícita antes de implementar**

### **FASE 2: IMPLEMENTACIÓN PASO A PASO** (OBLIGATORIO)

**⚠️ ANTES de implementar cualquier componente:**

1. **🚨 CRÍTICO: Verificar comportamiento del ContentManager (OBLIGATORIO si agregas elementos a `.content-area`):**
   - **SI vas a agregar elementos dentro de `.content-area`**, DEBES:
     - [ ] Leer: `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` (OBLIGATORIO)
     - [ ] Investigar código fuente: `grep -r "updateContent\|contentArea.innerHTML" vendor/ubits/packages/templates/engine/`
     - [ ] Verificar si `ContentManager.updateContent` limpia el contenido: `contentArea.innerHTML = ''`
     - [ ] **SI limpia el contenido:** Interceptar `updateContent` ANTES de agregar elementos al DOM
     - [ ] Verificar logs del navegador: `console.log(document.querySelector('.content-area')?.innerHTML)`
     - [ ] **NO asumir** que los elementos en HTML estático estarán siempre disponibles
   - **Ver guía completa:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`

2. **Revisar variantes, controladores y funcionalidades:**
   - Consultar archivo de tipos: `vendor/ubits/packages/components/[nombre]/src/types/[Nombre]Options.ts`
   - Identificar todas las variantes disponibles
   - Identificar todos los controladores (opciones booleanas que prende/apaga funcionalidades)
   - Listar todas las funcionalidades disponibles
   - Dividir funcionalidades en tareas independientes
   - Mostrar plan al usuario y esperar aprobación

**Para cada tarea:**

1. **Implementar SOLO esa tarea** (no avanzar a la siguiente)
2. **Ejecutar validación automática:** `npm run lint`
3. **Corregir errores automáticamente** si los hay
4. **Verificar que funciona correctamente**
5. **Mostrar al usuario lo implementado** (incluyendo resultado de validación)
6. **Pedir aprobación explícita:** "¿Aprobamos para continuar con la siguiente tarea?"
7. **Solo después de aprobación, continuar con la siguiente tarea**

---

## 📋 EJEMPLO DE DIVISIÓN DE TAREAS

**Para una interfaz con Tabs + Barra de acciones + DataTable:**

- ✅ **Tarea 1:** Estructura HTML base + Tabs (solo tabs, nada más)
- ✅ **Tarea 2:** Barra de acciones (solo después de aprobación de Tarea 1)
- ✅ **Tarea 3:** DataTable básico (solo columnas mínimas, sin funcionalidades avanzadas)
- ✅ **Tarea 4:** Funcionalidades del DataTable (UNA a la vez, ver guía específica)

**⚠️ CRÍTICO PARA DATATABLE:**
- ❌ **NUNCA** implementar todas las funcionalidades de DataTable de golpe
- ✅ **SIEMPRE** implementar UNA funcionalidad a la vez:
  1. Checkboxes
  2. Arrastrar y soltar filas
  3. Arrastrar y soltar columnas
  4. Ordenamiento
  5. Fijar columnas
  6. Selector de columnas
  7. Barra de acciones (selección única)
  8. Barra de acciones (selección múltiple)
  9. Dropdown con filtros
  10. Buscador con componentes UBITS
- ✅ **SIEMPRE** analizar columnas primero (cantidad y tipo)
- ✅ **SIEMPRE** usar componentes UBITS para el buscador (`<ubits-input>` y `<ubits-button>`)

**NUNCA hacer:** Implementar Tarea 1 + 2 + 3 + 4 en un solo paso.

---

## 🖼️ CREAR DESDE IMAGEN DESPUÉS DEL WIZARD

**⚠️ REGLA CRÍTICA ABSOLUTA:** Cuando el usuario pide crear/modificar algo desde una imagen **DESPUÉS** de ejecutar el wizard:

### **PASO 0: IDENTIFICAR TEMPLATE EXISTENTE** ⚠️ OBLIGATORIO PRIMERO

**ANTES de hacer CUALQUIER cosa:**
1. **Buscar templates existentes:**
   ```bash
   ls prototypes/*.html
   ```
2. **Identificar template correcto:**
   - "home de encuestas" → `canvas-*-encuestas-*.html`
   - "administrador" → `canvas-administrador-*.html`
   - "colaborador" → `canvas-colaborador-*.html`
3. **MODIFICAR ese template** (NO crear uno nuevo)

### **PASO 1: ANALIZAR IMAGEN** ⚠️ OBLIGATORIO ANTES DE CÓDIGO

**NO escribir código todavía. Primero analizar:**

1. **Identificar componentes UBITS en la imagen:**
   - ¿Sidebar? ¿SubNav? ¿Tabs? ¿DataTable? ¿Buttons?
   - Consultar `CATALOGO-COMPONENTES-UBITS.md`
2. **Analizar estructura:**
   - ¿Qué va primero? ¿Qué va después?
   - ¿Qué elementos van en contenedores?
3. **Analizar spacing:**
   - Medir visualmente espacios entre elementos
   - Mapear a tokens UBITS específicos
4. **Crear plan de implementación:**
   - Listar componentes identificados
   - Describir estructura
   - Dividir en tareas pequeñas
5. **MOSTRAR PLAN AL USUARIO Y ESPERAR APROBACIÓN**

### **PASO 2: IMPLEMENTAR PASO A PASO** ⚠️ SOLO DESPUÉS DE APROBACIÓN

**Para cada tarea:**
1. Implementar SOLO esa tarea
2. Validar (`npm run lint`)
3. Mostrar resultado
4. Pedir aprobación explícita
5. Solo después de aprobación, continuar

**❌ NUNCA:**
- Crear `home-encuestas.html` nuevo
- Implementar todo de golpe
- Escribir código sin analizar imagen primero

**✅ SIEMPRE:**
- Modificar `prototypes/canvas-*-encuestas-*.html` existente
- Analizar imagen antes de código
- Mostrar plan y esperar aprobación
- Implementar una tarea a la vez

**Ver guía completa:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`

---

## ✅ CHECKLIST PARA CREAR/MODIFICAR PÁGINAS

- [ ] **ANTES DE TODO:** Consultar `CATALOGO-COMPONENTES-UBITS.md` si recibes imagen
- [ ] **SI NO ESTÁS SEGURO:** Preguntar al usuario si es componente UBITS o crear nuevo
- [ ] Usar template existente como base (`prototypes/canvas-*.html`)
- [ ] Verificar componentes disponibles en consola:
  - `window.createSidebar`, `window.createSubNav`, `window.createTabBar`
  - `window.createTabs` ⭐ (nuevo)
  - `window.createDataTable` ⭐ (nuevo)
- [ ] Usar solo componentes UBITS existentes
- [ ] Usar tokens UBITS correctos (no sobrescribir)
- [ ] Rutas relativas desde `prototypes/` hacia `vendor/ubits/packages/` (preferido)
- [ ] O rutas absolutas `file://` hacia `Desktop/UBITS/` (legacy)
- [ ] NO modificar archivos de UBITS en `vendor/ubits/` o `Desktop/UBITS/`
- [ ] NO crear nuevos componentes sin verificar primero
- [ ] Validar que todo carga correctamente

---

**Ver también:**
- `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md` - Proceso completo
- `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md` - DataTable específico
- `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md` - Crear desde imagen

