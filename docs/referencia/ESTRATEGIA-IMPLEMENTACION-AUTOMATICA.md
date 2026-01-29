# 🎯 Estrategia de Implementación Automática

> **⚠️ CRÍTICO:** Esta estrategia garantiza que TODA implementación de componente UBITS use automáticamente la documentación completa y siga todas las reglas.

---

## 🎯 OBJETIVO

Crear un sistema que **automáticamente**:
1. ✅ Detecte cuando se va a implementar un componente
2. ✅ Cargue la documentación específica del componente
3. ✅ Consulte MCPs y Storybook
4. ✅ Aplique todas las reglas y mejores prácticas
5. ✅ Evite errores comunes
6. ✅ Use props y tokens exactos

---

## 🔄 FLUJO AUTOMÁTICO

```
Usuario solicita implementar componente
         ↓
[FASE 0] Detectar componente
         ↓
[FASE 1] Cargar documentación y reglas
         ↓
[FASE 2] Consultar MCPs y Storybook
         ↓
[FASE 3] Crear plan de implementación
         ↓
[FASE 4] Implementar paso a paso
```

---

## 📋 PROCESO DETALLADO

### **FASE 0: DETECCIÓN** 🔍

**Cuando se detecta implementación de componente:**

1. **Identificar componente:**
   - Extraer nombre de la solicitud
   - Mapear a nombre UBITS
   - Verificar en: `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`

2. **Si NO existe:** Detener y preguntar al usuario
3. **Si existe:** Continuar con Fase 1

---

### **FASE 1: CARGA AUTOMÁTICA** 📚

**Leer automáticamente:**

1. **Documentación específica:**
   - `docs/referencia/componentes/[nombre-componente].md`
   - Ver mapeo completo en: `docs/referencia/componentes/README.md`

2. **Identificar subcomponentes y subfuncionalidades:** ⭐
   - **Subcomponentes:** Partes del componente (ej: Modal tiene Header, Body, Footer)
   - **Subfuncionalidades:** Funcionalidades específicas (ej: DataTable tiene checkboxes, action bar, filtros)
   - **Tipos/Variantes:** Diferentes tipos disponibles (ej: 11 tipos de columnas en DataTable)
   - **Estados:** Estados del componente (ej: activo, inactivo, disabled)

3. **Reglas generales:**
   - `.cursor/rules/03-componentes.md`
   - `.cursor/rules/04-implementacion.md`
   - `.cursor/rules/05-errores.md`
   - `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

4. **Guías específicas** (si aplica):
   - DataTable: Guías de análisis y implementación
   - Tabs: Guía de distinción SubNav/Tabs
   - Cualquier componente: Guías de estructura y spacing

---

### **FASE 2: CONSULTA AUTOMÁTICA** 🔌

**Consultar automáticamente:**

1. **Storybook en Vercel (PRIMERO):**
   - URL: `https://ubits-storybook10.vercel.app/`
   - Revisar pestaña "Code" y "Controls"
   - Copiar código exacto

2. **Storybook MCP:**
   - `mcp_storybook_getComponentList()`
   - `mcp_storybook_getComponentsProps({ componentNames: [...] })`

3. **Storybook Local:**
   - `http://localhost:6006/` (si está disponible)

**Ver guía:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`

---

### **FASE 3: PLAN AUTOMÁTICO** 🛠️

**Crear plan basado en:**

- Documentación leída
- Props obtenidas de MCPs
- Código de Storybook
- Tokens identificados
- Errores comunes a evitar

**Dividir en tareas pequeñas y mostrar al usuario para aprobación.**

---

### **FASE 4: IMPLEMENTACIÓN** ✅

**Para cada tarea:**

1. Implementar SOLO esa tarea
2. Usar código exacto de Storybook
3. Usar props exactas de MCPs
4. Validar con `npm run lint`
5. Mostrar resultado
6. Pedir aprobación

---

## 📋 CHECKLIST AUTOMÁTICO

**Antes de implementar CUALQUIER componente:**

- [ ] ✅ Componente identificado en catálogo
- [ ] ✅ Documentación específica leída
- [ ] ✅ **Subcomponentes identificados** (si el componente los tiene) ⭐
- [ ] ✅ **Subfuncionalidades identificadas** (todas las funcionalidades) ⭐
- [ ] ✅ **Tipos/variantes identificados** (ej: tipos de columnas) ⭐
- [ ] ✅ **Documentación de subcomponentes leída** (si son independientes) ⭐
- [ ] ✅ Reglas generales leídas
- [ ] ✅ Guías específicas leídas (si aplica)
- [ ] ✅ Storybook en Vercel consultado
- [ ] ✅ **Todas las historias de Storybook revisadas** (para subfuncionalidades) ⭐
- [ ] ✅ Storybook MCP consultado
- [ ] ✅ Props exactas obtenidas (incluyendo props de subfuncionalidades) ⭐
- [ ] ✅ Código exacto copiado de Storybook
- [ ] ✅ Tokens UBITS identificados
- [ ] ✅ Plan creado (con subcomponentes y subfuncionalidades) ⭐
- [ ] ✅ ContentManager verificado (si aplica)
- [ ] ✅ Plan aprobado por usuario

---

## 🔗 MAPEO DE COMPONENTES

**Todos los componentes están documentados en:**
- `docs/referencia/componentes/[nombre].md`

**Ver índice completo:** `docs/referencia/componentes/README.md`

**56 componentes documentados:**
- Data (4): DataTable, DataView, List, Pagination
- Navegación (9): Sidebar, SubNav, TabBar, Tabs, Menu, Breadcrumb, TreeMenu, Segment Control, Menu Participantes
- Formularios (8): Input, Checkbox, Radio, Toggle, Slider, Calendar, File Upload, Search Button
- Feedback (9): Alert, Modal, Toast, Tooltip, Popover, Drawer, Empty State, Mask, Button Feedback
- Layout (10): Card Content, Accordion, Carousel, Stepper, Gallery, HeaderSection, Timeline, Contenedor, Simple Card, Selection Card
- Básicos (9): Button, ButtonAI, Avatar, Badge, Chip, Scrollbar, Skeleton, Spinner, Status Tag
- Charts (7): Progress Bar, Text/Bar/Circle/CSAT/NPS/Score Card Metrics

---

## 🚨 REGLAS CRÍTICAS

1. **NUNCA implementar sin leer documentación específica**
2. **NUNCA implementar sin consultar Storybook en Vercel**
3. **NUNCA implementar sin consultar MCPs**
4. **NUNCA usar props que no estén en la documentación**
5. **NUNCA usar tokens que no estén documentados**
6. **SIEMPRE usar código exacto de Storybook como base**
7. **SIEMPRE dividir en tareas pequeñas**
8. **SIEMPRE pedir aprobación entre tareas**

---

## 📚 ARCHIVOS CLAVE

### Reglas
- `.cursor/rules/06-implementacion-automatica.md` - ⭐ Proceso automático completo
- `.cursor/rules/03-componentes.md` - Reglas de componentes
- `.cursor/rules/04-implementacion.md` - Proceso de implementación
- `.cursor/rules/05-errores.md` - Errores comunes

### Documentación
- `docs/referencia/componentes/` - ⭐ Documentación completa de 56 componentes
- `docs/referencia/CATALOGO-COMPONENTES-UBITS.md` - Catálogo completo

### Guías
- `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - Uso de MCPs
- `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md` - Verificar Storybook
- `docs/guias/implementacion/GUIA-IMPLEMENTACION-MAESTRA.md` - Guía maestra

---

## ✅ BENEFICIOS

1. **Consistencia:** Todas las implementaciones siguen el mismo proceso
2. **Calidad:** Uso de documentación y reglas garantiza calidad
3. **Velocidad:** Proceso automatizado reduce tiempo
4. **Precisión:** Props y tokens exactos evitan errores
5. **Mantenibilidad:** Código basado en documentación oficial

---

**Última actualización:** 2025-12-05

