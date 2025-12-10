# 🛠️ Reglas de Implementación

> **⚠️ CRÍTICO:** Estas reglas deben seguirse al implementar componentes y funcionalidades.

---

## ✅ CHECKLIST OBLIGATORIO ANTES DE IMPLEMENTAR

**⚠️ CRÍTICO: LEER COMPLETO ANTES DE IMPLEMENTAR CUALQUIER COMPONENTE**

**ANTES de implementar cualquier componente UBITS, DEBES:**

1. **Leer el checklist completo:**
   - ✅ `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md` - ⚠️ **OBLIGATORIO PRIMERO**
   - ✅ Completar TODAS las fases del checklist
   - ✅ NO implementar sin completar el checklist

2. **Verificar errores comunes:**
   - ✅ Leer `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Todos los errores relacionados con el componente
   - ✅ Leer `docs/guias/implementacion/GUIA-NO-AGREGAR-ESTILOS-EXTRA-COMPONENTES.md`
   - ✅ Verificar especialmente: Error #53, #54, #55 (estilos extra, margin-top, padding-top)

3. **Consultar Storybook:**
   - ✅ Storybook en Vercel: `https://ubits-storybook10.vercel.app/`
   - ✅ Storybook MCP: `mcp_storybook_getComponentsProps`
   - ✅ Verificar cómo viene el componente por defecto (sin estilos extra)

**NO implementar componentes sin completar este checklist primero.**

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

### ⚠️ REGLA CRÍTICA: USAR PRE-IMPLEMENTATION CHECK ADD-ON

**ANTES de implementar cualquier componente UBITS, DEBES:**

1. **Verificar con Pre-Implementation Check Add-on:**
   - ✅ Usar `preCheckAddon.canImplement(componentName)` para verificar
   - ✅ Si está bloqueado, completar pasos obligatorios primero
   - ✅ Marcar pasos como completados mientras se consultan las fuentes

2. **Completar checklist obligatorio:**
   - ✅ Consultar Storybook en Vercel → `markStepCompleted(componentName, 'storybookVercel')`
   - ✅ Consultar Storybook MCP → `markStepCompleted(componentName, 'storybookMCP')`
   - ✅ Consultar documentación → `markStepCompleted(componentName, 'documentation')`
   - ✅ Comparar versiones → `markStepCompleted(componentName, 'comparison')`

3. **Verificar nuevamente antes de implementar:**
   - ✅ Llamar `canImplement()` nuevamente después de completar pasos
   - ✅ Solo implementar si `allowed === true`

**Ver guía completa:** `docs/guias/implementacion/GUIA-USO-PRE-IMPLEMENTATION-CHECK.md` - ⚠️ **OBLIGATORIO**

---

## 🔄 PROCESO DE IMPLEMENTACIÓN PASO A PASO (OBLIGATORIO)

**⚠️ REGLA CRÍTICA:** **NUNCA implementar todo de golpe. SIEMPRE dividir en tareas pequeñas y pedir aprobación.**

### **⚠️ ELIMINAR HEADERSECTION (OBLIGATORIO):**

**Si la imagen NO muestra HeaderSection:**
- ✅ **DEBE eliminarse** del template
- ✅ **Ver guía completa:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md` - ⚠️ **OBLIGATORIO**
- ✅ **Solución completa con código listo para copiar**

### **⚠️ ERRORES CRÍTICOS A EVITAR:**

1. **Event Listeners Perdidos al Restaurar HTML:**
   - ❌ **NUNCA** asumir que los elementos restaurados tienen event listeners
   - ✅ **SIEMPRE** verificar si tienen listeners antes de evitar reinicialización
   - ✅ **SIEMPRE** reinicializar componentes después de restaurar HTML
   - **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #11

2. **⚠️ CRÍTICO: NO Agregar Estilos Extra a Componentes (Incluyendo margin-top):**
   - ❌ **NUNCA** agregar padding, margin, margin-top, background, border-radius u otros estilos a contenedores de componentes automáticamente
   - ❌ **NUNCA** agregar `margin-top` automáticamente, incluso si el usuario menciona "spacing" o "a X px del subnav"
   - ❌ **NUNCA** modificar estilos de componentes a menos que el usuario lo solicite explícitamente con palabras exactas como "agregar margin-top"
   - ✅ **SIEMPRE** crear componentes tal cual vienen de Storybook, sin modificaciones
   - ✅ **SIEMPRE** usar solo los estilos mínimos necesarios (ej: `width: 100%` para contenedores)
   - ✅ **SIEMPRE** consultar Storybook para ver cómo viene el componente por defecto
   - ✅ **SIEMPRE** manejar spacing en el HTML directamente o en CSS, NO en el componente
   - ✅ **Solo agregar estilos si el usuario lo solicita explícitamente con palabras exactas** - NO asumir ni agregar automáticamente
   - **Ejemplo INCORRECTO:**
     ```javascript
     // ❌ INCORRECTO - Agregar margin-top automáticamente cuando se menciona spacing
     tabsContainer.style.cssText = 'width: 100%; margin-top: var(--ubits-spacing-lg, 16px);';
     // Usuario dijo "a 16px del subnav" pero NO dijo "agregar margin-top"
     ```
   - **Ejemplo CORRECTO:**
     ```javascript
     // ✅ CORRECTO - NO agregar margin-top, el componente viene tal cual de Storybook
     tabsContainer.style.cssText = 'width: 100%;';
     // El spacing se maneja en el HTML o CSS, NO en el componente
     ```
   - **Ejemplo CORRECTO (si el usuario dice explícitamente "agregar margin-top"):**
     ```javascript
     // ✅ CORRECTO - Solo si el usuario dice explícitamente "agregar margin-top de 16px"
     tabsContainer.style.cssText = 'width: 100%; margin-top: var(--ubits-spacing-lg, 16px);';
     ```
   - **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #53

2.1. **⚠️ CRÍTICO: NO Agregar margin-top Inline o en CSS al Contenedor de Componentes:**
   - ❌ **NUNCA** agregar `margin-top` inline: `<div id="container" style="margin-top: 16px;"></div>`
   - ❌ **NUNCA** agregar `margin-top` en CSS: `#container { margin-top: 16px; }`
   - ✅ **SIEMPRE** usar `gap` del contenedor padre para spacing entre elementos
   - ✅ **SIEMPRE** el componente debe venir tal cual de Storybook, sin estilos adicionales
   - **Ejemplo INCORRECTO:**
     ```html
     <!-- ❌ INCORRECTO - margin-top inline -->
     <div id="encuestas-tabs-container" style="margin-top: 16px;"></div>
     ```
     ```css
     /* ❌ INCORRECTO - margin-top en CSS */
     #encuestas-tabs-container {
         margin-top: var(--ubits-spacing-lg, 16px);
     }
     ```
   - **Ejemplo CORRECTO:**
     ```html
     <!-- ✅ CORRECTO - Sin margin-top -->
     <div id="encuestas-tabs-container"></div>
     ```
     ```css
     /* ✅ CORRECTO - Sin margin-top, usar gap del padre */
     #encuestas-tabs-container {
         width: 100%;
         box-sizing: border-box;
     }
     .main-content {
         gap: var(--ubits-spacing-lg, 16px); /* Spacing viene del gap */
     }
     ```
   - **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #55

3. **⚠️ CRÍTICO: Interceptar ContentManager Correctamente para Eliminar HeaderSection/Content-Sections:**
   - ✅ **SIEMPRE** interceptar ContentManager INMEDIATAMENTE después de cargar content-manager.js
   - ✅ **SIEMPRE** usar `requestAnimationFrame` para timing correcto antes de eliminar elementos
   - ✅ **SIEMPRE** usar MutationObserver para eliminar elementos que se crean dinámicamente después
   - ✅ **SIEMPRE** eliminar TODOS los elementos relacionados: `#header-section-container`, `.ubits-header-section`, `.content-sections`, `.widget-contenido-principal`
   - ✅ **SIEMPRE** usar múltiples intentos de interceptación (inmediato, 100ms, 500ms)
   - **Ejemplo INCORRECTO:**
     ```javascript
     // ❌ INCORRECTO - Interceptar después, sin MutationObserver
     window.UBITS_ContentManager.updateContent = function(section, subSection) {
         const result = originalUpdateContent.call(this, section, subSection);
         const headerSection = document.querySelector('#header-section-container');
         if (headerSection) headerSection.remove();
         // ❌ PROBLEMA: Si se crea después, no se elimina
         return result;
     };
     ```
   - **Ejemplo CORRECTO:**
     ```javascript
     // ✅ CORRECTO - Interceptar inmediatamente, con requestAnimationFrame y MutationObserver
     <script src="/vercel-proxy/templates/engine/content-manager.js"></script>
     <script>
         (function() {
             function interceptContentManagerImmediately() {
                 if (!window.UBITS_ContentManager) {
                     setTimeout(interceptContentManagerImmediately, 50);
                     return;
                 }
                 
                 const originalUpdateContent = window.UBITS_ContentManager.updateContent;
                 window.UBITS_ContentManager.updateContent = function(section, subSection) {
                     const result = originalUpdateContent.call(this, section, subSection);
                     
                     // ✅ Usar requestAnimationFrame para timing correcto
                     requestAnimationFrame(() => {
                         // Eliminar TODOS los elementos relacionados
                         const headerContainer = document.querySelector('#header-section-container');
                         if (headerContainer) headerContainer.remove();
                         
                         const headerSection = document.querySelector('.ubits-header-section');
                         if (headerSection) {
                             headerSection.closest('#header-section-container')?.remove() || headerSection.remove();
                         }
                         
                         const contentSections = document.querySelector('.content-sections');
                         if (contentSections) contentSections.remove();
                         
                         const widgetPrincipal = document.querySelector('.widget-contenido-principal');
                         if (widgetPrincipal) {
                             widgetPrincipal.closest('.section-single')?.remove() || widgetPrincipal.remove();
                         }
                     });
                     
                     return result;
                 };
             }
             
             interceptContentManagerImmediately();
             setTimeout(interceptContentManagerImmediately, 100);
             setTimeout(interceptContentManagerImmediately, 500);
             
             // ✅ MutationObserver para elementos dinámicos
             function setupAggressiveObserver() {
                 const contentArea = document.querySelector('.content-area');
                 if (!contentArea) {
                     setTimeout(setupAggressiveObserver, 50);
                     return;
                 }
                 
                 const observer = new MutationObserver((mutations) => {
                     mutations.forEach((mutation) => {
                         if (mutation.type === 'childList') {
                             mutation.addedNodes.forEach((node) => {
                                 if (node.nodeType === 1) {
                                     // Eliminar HeaderSection y content-sections
                                     if (node.id === 'header-section-container' || 
                                         node.classList?.contains('ubits-header-section') ||
                                         node.querySelector?.('#header-section-container')) {
                                         const headerContainer = document.getElementById('header-section-container');
                                         if (headerContainer) headerContainer.remove();
                                     }
                                     if (node.classList?.contains('content-sections') ||
                                         node.querySelector?.('.content-sections')) {
                                         const contentSections = document.querySelector('.content-sections');
                                         if (contentSections) contentSections.remove();
                                     }
                                 }
                             });
                         }
                     });
                 });
                 
                 observer.observe(contentArea, { childList: true, subtree: true });
             }
             
             setupAggressiveObserver();
         })();
     </script>
     ```
   - **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #56
   - **Ver:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`

4. **⚠️ CRÍTICO: Asegurar que `.content-area` NO tenga padding-top cuando se solicita spacing específico:**
   - ❌ **NUNCA** dejar que `.content-area` tenga `padding-top` cuando se solicita spacing específico entre SubNav y componentes
   - ✅ **SIEMPRE** asegurar `padding-top: 0 !important;` en `.content-area` y `.content-area.no-background` cuando se solicita spacing específico
   - ✅ **SIEMPRE** verificar que el spacing visual sea exactamente el solicitado (ej: 16px), sin padding adicional del contenedor padre
   - **Ejemplo INCORRECTO:**
     ```css
     /* ❌ INCORRECTO - content-area con padding-top afecta el spacing */
     .content-area {
       padding-top: 20px; /* Esto hace que el spacing sea mayor */
     }
     ```
   - **Ejemplo CORRECTO:**
     ```css
     /* ✅ CORRECTO - padding-top: 0 para spacing exacto */
     .content-area {
       padding-top: 0 !important; /* Asegurar spacing exacto */
     }
     .content-area.no-background {
       padding: 0 var(--ubits-spacing-6xl, 40px) !important;
       padding-top: 0 !important; /* Solo padding horizontal */
     }
     ```
   - **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #54

4. **Padding Aplicado al Contenedor Interno en Lugar del Externo:**
   - ❌ **NUNCA** aplicar padding al contenedor interno del componente (ej: `.ubits-data-table__container`, `.ubits-tabs`)
   - ✅ **SIEMPRE** aplicar padding y fondo blanco al contenedor externo (el que se pasa como `containerId`) **SOLO si el usuario lo solicita**
   - ✅ **SIEMPRE** verificar cómo está estructurado el componente en Storybook antes de aplicar estilos
   - ✅ **SIEMPRE** mantener `padding: 0` en el contenedor interno (como está en el CSS base)
   - **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #12

2. **⚠️ CRÍTICO: NO Agregar Estilos Extra a Componentes (Incluyendo margin-top):**
   - ❌ **NUNCA** agregar padding, margin, margin-top, background, border-radius u otros estilos a contenedores de componentes automáticamente
   - ❌ **NUNCA** agregar `margin-top` automáticamente, incluso si el usuario menciona "spacing" o "a X px del subnav"
   - ❌ **NUNCA** modificar estilos de componentes a menos que el usuario lo solicite explícitamente con palabras exactas como "agregar margin-top"
   - ✅ **SIEMPRE** crear componentes tal cual vienen de Storybook, sin modificaciones
   - ✅ **SIEMPRE** usar solo los estilos mínimos necesarios (ej: `width: 100%` para contenedores)
   - ✅ **SIEMPRE** consultar Storybook para ver cómo viene el componente por defecto
   - ✅ **SIEMPRE** manejar spacing en el HTML directamente o en CSS, NO en el componente
   - ✅ **Solo agregar estilos si el usuario lo solicita explícitamente con palabras exactas** - NO asumir ni agregar automáticamente
   - **Ejemplo INCORRECTO:**
     ```javascript
     // ❌ INCORRECTO - Agregar margin-top automáticamente cuando se menciona spacing
     tabsContainer.style.cssText = 'width: 100%; margin-top: var(--ubits-spacing-lg, 16px);';
     // Usuario dijo "a 16px del subnav" pero NO dijo "agregar margin-top"
     ```
   - **Ejemplo CORRECTO:**
     ```javascript
     // ✅ CORRECTO - NO agregar margin-top, el componente viene tal cual de Storybook
     tabsContainer.style.cssText = 'width: 100%;';
     // El spacing se maneja en el HTML o CSS, NO en el componente
     ```
   - **Ejemplo CORRECTO (si el usuario dice explícitamente "agregar margin-top"):**
     ```javascript
     // ✅ CORRECTO - Solo si el usuario dice explícitamente "agregar margin-top de 16px"
     tabsContainer.style.cssText = 'width: 100%; margin-top: var(--ubits-spacing-lg, 16px);';
     ```
   - **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #53

5. **Padding Aplicado al Contenedor Interno en Lugar del Externo:**

3. **Contenedor .content-sections por Defecto Aparece Debajo de Componentes Personalizados:**
   - ❌ **NUNCA** dejar el contenedor `.content-sections` por defecto cuando hay componentes personalizados
   - ✅ **SIEMPRE** eliminar `.content-sections` del HTML estático cuando hay componentes personalizados
   - ✅ **SIEMPRE** interceptar `updateContent` para eliminar `.content-sections` si se crea dinámicamente
   - ✅ **SIEMPRE** verificar visualmente que no aparece contenido por defecto
   - **Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #13

3. **Manejo de Logs:**
   - ❌ **NUNCA** usar logs sin prefijos identificables
   - ❌ **NUNCA** usar logs sin contexto completo
   - ✅ **SIEMPRE** usar prefijos `[Componente]` y emojis apropiados
   - ✅ **SIEMPRE** mostrar estado ANTES y DESPUÉS de cambios críticos
   - **Ver:** `docs/guias/implementacion/GUIA-MANEJO-LOGS-DEPURACION.md` - ⚠️ **OBLIGATORIO**

### **FASE 1: ANÁLISIS Y PLANIFICACIÓN** (OBLIGATORIO)

1. **Analizar la imagen/solicitud:**
   - Identificar componentes UBITS
   - Identificar estructura visual
   - Identificar funcionalidades
   - Identificar tokens y estilos
   - **⚠️ CRÍTICO: Si hay DataTable, contar items/filas en la imagen**
     - Contar filas visibles
     - Verificar scroll o paginación
     - Verificar contador en header
     - Documentar cantidad de items a crear
     - **Ver:** `docs/guias/implementacion/GUIA-GENERAR-ITEMS-DATATABLE.md` - ⚠️ **OBLIGATORIO**

2. **Crear plan de implementación:**
   - Listar componentes identificados
   - Describir estructura
   - Listar tokens a usar
   - **Dividir en tareas pequeñas** (ej: Tarea 1: Tabs, Tarea 2: Barra acciones, Tarea 3: DataTable básico, Tarea 4: DataTable completo)
   - **Planificar interceptación de ContentManager** si se agregan elementos a `.content-area`
   - **Planificar manejo de event listeners** si se restauran elementos HTML

3. **Mostrar plan al usuario:**
   - Presentar análisis completo
   - Mostrar plan de tareas
   - **Esperar aprobación explícita antes de implementar**

### **FASE 2: IMPLEMENTACIÓN PASO A PASO** (OBLIGATORIO)

**⚠️ ANTES de implementar cualquier componente:**

0. **🚨 CRÍTICO: Verificar Iconos contra Análisis (OBLIGATORIO si hay iconos):** ⭐ NUEVO
   - **SI vas a implementar iconos**, DEBES:
     - [ ] Leer sección "Análisis de Iconos" del análisis inicial
     - [ ] Extraer lista de todos los iconos identificados
     - [ ] Crear lista de verificación: `[Componente] [Elemento]: [icono del análisis]`
     - [ ] Validar cada icono ANTES de escribir código
     - [ ] Usar iconos del análisis (NO asumir o adivinar)
     - [ ] Agregar comentarios con referencia al análisis en el código
     - [ ] Validar DESPUÉS de implementar usando función `validateIcon()` si está disponible
   - **Ver:** `docs/guias/implementacion/HELPER-VALIDACION-ICONOS.md` - ⚠️ **OBLIGATORIO**
   - **Ver:** `docs/guias/analisis/ANALISIS-ERROR-ICONO-INCORRECTO.md` - Análisis del error real

1. **🚨 CRÍTICO: Verificar comportamiento del ContentManager (OBLIGATORIO si agregas elementos a `.content-area`):**
   - **SI vas a agregar elementos dentro de `.content-area`**, DEBES:
     - [ ] Leer: `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md` (OBLIGATORIO)
     - [ ] Investigar código fuente: `grep -r "updateContent\|contentArea.innerHTML" vendor/ubits/packages/templates/engine/`
     - [ ] Verificar si `ContentManager.updateContent` limpia el contenido: `contentArea.innerHTML = ''`
     - [ ] **SI limpia el contenido:** Interceptar `updateContent` ANTES de agregar elementos al DOM
     - [ ] Verificar logs del navegador: `console.log(document.querySelector('.content-area')?.innerHTML)`
     - [ ] **NO asumir** que los elementos en HTML estático estarán siempre disponibles
     - [ ] **🚨 CRÍTICO: Al restaurar HTML, SIEMPRE reinicializar componentes para agregar event listeners:**
       - [ ] Verificar si los componentes tienen event listeners antes de evitar reinicialización
       - [ ] Usar atributo `data-listener-attached="true"` para verificar
       - [ ] Si NO tienen listeners, eliminar elementos existentes y reinicializar
       - [ ] **NUNCA asumir** que elementos restaurados desde HTML tienen listeners
   - **Ver guía completa:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
   - **Ver error crítico:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #11

2. **Revisar variantes, controladores y funcionalidades:**
   - Consultar archivo de tipos: `vendor/ubits/packages/components/[nombre]/src/types/[Nombre]Options.ts`
   - Identificar todas las variantes disponibles
   - Identificar todos los controladores (opciones booleanas que prende/apaga funcionalidades)
   - Listar todas las funcionalidades disponibles
   - Dividir funcionalidades en tareas independientes
   - Mostrar plan al usuario y esperar aprobación

**Para cada tarea:**

1. **Implementar SOLO esa tarea** (no avanzar a la siguiente)
2. **Usar logs apropiados:**
   - [ ] Prefijos identificables: `[Componente]`
   - [ ] Emojis apropiados: 🔵 ✅ ⚠️ ❌
   - [ ] Estado ANTES y DESPUÉS de cambios críticos
   - [ ] Contexto completo (IDs, clases, atributos)
   - **Ver:** `docs/guias/implementacion/GUIA-MANEJO-LOGS-DEPURACION.md`
3. **⚠️ NO ejecutar `npm run lint` automáticamente** (solo cuando el usuario lo pida o haya un error real)
4. **Corregir errores automáticamente** si los hay
5. **Verificar que funciona correctamente:**
   - [ ] Probar funcionalidad manualmente
   - [ ] Verificar logs en consola
   - [ ] Verificar que event listeners funcionan (especialmente después de restaurar HTML)
6. **Mostrar al usuario lo implementado** (incluyendo resultado de validación)
7. **Pedir aprobación explícita:** "¿Aprobamos para continuar con la siguiente tarea?"
8. **Solo después de aprobación, continuar con la siguiente tarea**

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

