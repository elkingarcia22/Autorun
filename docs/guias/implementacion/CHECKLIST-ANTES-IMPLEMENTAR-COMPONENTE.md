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
