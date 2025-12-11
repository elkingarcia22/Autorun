# 🚨 Errores Cometidos: Implementación de Tabs (2025-01-10)

> **⚠️ CRÍTICO:** Este documento registra errores específicos cometidos durante la implementación de tabs para evitar que se repitan.

---

## 📋 Resumen de Errores

### **Error #1: No Leer Guías de Implementación** ⚠️ CRÍTICO

**Error cometido:**
- ❌ No se leyó `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md` antes de implementar
- ❌ No se leyó `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md` antes de implementar
- ❌ No se leyó `docs/guias/implementacion/GUIA-ERROR-TABS-NO-SE-MUESTRAN.md` antes de implementar
- ❌ No se siguió el checklist obligatorio de `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`

**Consecuencias:**
- Se implementó directamente sin análisis previo
- Se implementó sin plan detallado
- Se implementó sin consultar Storybook primero
- Se implementó sin verificar errores comunes
- Se cometieron errores que ya estaban documentados

**Solución:**
- ✅ **OBLIGATORIO:** Leer TODAS las guías de implementación antes de empezar
- ✅ **OBLIGATORIO:** Seguir el flujo: Análisis → Plan → Checklist → Implementación
- ✅ **OBLIGATORIO:** Consultar Storybook en Vercel PRIMERO
- ✅ **OBLIGATORIO:** Consultar Storybook MCP
- ✅ **OBLIGATORIO:** Revisar errores comunes relacionados con el componente

---

### **Error #2: No Seguir Flujo de Análisis → Plan → Implementación** ⚠️ CRÍTICO

**Error cometido:**
- ❌ Se implementó directamente sin análisis previo
- ❌ No se creó un plan detallado antes de implementar
- ❌ No se mostró el plan al usuario para aprobación
- ❌ No se creó checklist por componente

**Flujo correcto que NO se siguió:**
```
1. 🔍 ANÁLISIS
   - Identificar componentes necesarios
   - Analizar iconos
   - Analizar spacing
   - Analizar estructura

2. 📋 PLAN
   - Crear plan detallado
   - Mostrar al usuario
   - Esperar aprobación

3. ✅ CHECKLIST
   - Crear checklist por componente
   - Items: Consultar Storybook, verificar errores, implementar, probar

4. 🛠️ IMPLEMENTACIÓN
   - Implementar UNA tarea a la vez
   - Completar TODO el checklist antes de continuar
```

**Solución:**
- ✅ **OBLIGATORIO:** Seguir el flujo completo: Análisis → Plan → Checklist → Implementación
- ✅ **OBLIGATORIO:** NO implementar sin análisis y plan previos
- ✅ **OBLIGATORIO:** Mostrar plan al usuario y esperar aprobación

---

### **Error #3: No Consultar Storybook en Vercel Primero** ⚠️ CRÍTICO

**Error cometido:**
- ❌ No se consultó Storybook en Vercel (`https://ubits-storybook10.vercel.app/`) antes de implementar
- ❌ No se revisó la pestaña "Code" para ver estructura exacta
- ❌ No se revisó la pestaña "Controls" para ver props disponibles
- ❌ No se verificó el formato correcto de `window.createTabs()`

**Información que se perdió:**
- Estructura exacta del componente
- Props exactas disponibles
- Formato correcto de parámetros (`containerId` como segundo parámetro, no dentro del objeto)
- Ejemplos de código actualizados

**Solución:**
- ✅ **OBLIGATORIO:** Consultar Storybook en Vercel PRIMERO antes de implementar
- ✅ **OBLIGATORIO:** Revisar pestaña "Code" para estructura exacta
- ✅ **OBLIGATORIO:** Revisar pestaña "Controls" para props disponibles
- ✅ **OBLIGATORIO:** Volver al template después de consultar

---

### **Error #4: No Consultar Storybook MCP** ⚠️ CRÍTICO

**Error cometido:**
- ❌ No se usó `mcp_storybook_getComponentList` para listar componentes
- ❌ No se usó `mcp_storybook_getComponentsProps` para obtener props exactas
- ❌ Se asumió la estructura sin verificar

**Solución:**
- ✅ **OBLIGATORIO:** Usar Storybook MCP para obtener props exactas
- ✅ **OBLIGATORIO:** Verificar estructura antes de implementar

---

### **Error #5: Formato Incorrecto de Parámetros de `window.createTabs()`** ⚠️ CRÍTICO

**Error cometido:**
- ❌ Se usó `containerId` dentro del objeto options:
  ```javascript
  window.createTabs({
    containerId: 'encuestas-tabs-container', // ❌ INCORRECTO
    tabs: [...]
  });
  ```

**Formato correcto (según código fuente):**
- ✅ `containerId` debe ser el segundo parámetro:
  ```javascript
  window.createTabs({
    tabs: [...]
  }, 'encuestas-tabs-container'); // ✅ CORRECTO
  ```

**Código fuente de referencia:**
```javascript
// vendor/ubits/packages/templates/components-loader.js:2368
window.createTabs = function (options, containerId) {
  const container = containerId
    ? document.getElementById(containerId) || document.createElement('div')
    : document.createElement('div');
  // ...
}
```

**Solución:**
- ✅ **OBLIGATORIO:** Consultar código fuente o Storybook para verificar formato exacto
- ✅ **OBLIGATORIO:** Usar `containerId` como segundo parámetro, no dentro del objeto

---

### **Error #6: No Verificar Errores Comunes Documentados** ⚠️ CRÍTICO

**Error cometido:**
- ❌ No se revisó `docs/guias/implementacion/GUIA-ERROR-TABS-NO-SE-MUESTRAN.md` antes de implementar
- ❌ No se revisó `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` para errores relacionados con tabs
- ❌ Se cometieron errores que ya estaban documentados y resueltos

**Errores documentados que se podrían haber evitado:**
- Error de formato de parámetros (ya documentado)
- Error de esperar a que `window.createTabs` esté disponible (ya documentado)
- Error de múltiples métodos de inicialización (ya documentado)

**Solución:**
- ✅ **OBLIGATORIO:** Revisar errores comunes relacionados con el componente ANTES de implementar
- ✅ **OBLIGATORIO:** Revisar guías de errores específicas del componente

---

## 📚 Guías que DEBÍAN Leerse (y NO se leyeron)

### **Guías Generales:**
1. ❌ `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md` - Flujo obligatorio
2. ❌ `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md` - Estrategia general
3. ❌ `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md` - Checklist obligatorio

### **Guías Específicas de Tabs:**
4. ❌ `docs/guias/implementacion/GUIA-ERROR-TABS-NO-SE-MUESTRAN.md` - Error específico de tabs
5. ❌ `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - Uso de MCPs

### **Guías de Referencia:**
6. ❌ `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Errores comunes
7. ❌ `docs/referencia/componentes/navegacin-tabs.md` - Documentación del componente

---

## ✅ Solución: Sistema de Lectura Automática

**Para evitar que estos errores se repitan, se debe implementar un sistema que:**

1. **Detecte automáticamente cuando se va a implementar un componente**
2. **Lea automáticamente las guías relevantes antes de permitir la implementación**
3. **Verifique que se siguió el flujo correcto antes de escribir código**

**Ver:** `docs/guias/implementacion/SISTEMA-LECTURA-AUTOMATICA-GUIAS.md`

---

## 📝 Checklist de Prevención

**ANTES de implementar cualquier componente, DEBES:**

- [ ] ✅ Leer `docs/guias/FLUJO-COMPLETO-ANALISIS-PLAN-IMPLEMENTACION.md`
- [ ] ✅ Leer `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`
- [ ] ✅ Leer `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`
- [ ] ✅ Leer guías específicas del componente (si existen)
- [ ] ✅ Leer `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` para errores relacionados
- [ ] ✅ Consultar Storybook en Vercel PRIMERO
- [ ] ✅ Consultar Storybook MCP
- [ ] ✅ Seguir flujo: Análisis → Plan → Checklist → Implementación
- [ ] ✅ Mostrar plan al usuario y esperar aprobación
- [ ] ✅ Implementar UNA tarea a la vez

---

**Fecha del error:** 2025-01-10  
**Componente:** Tabs  
**Estado:** ✅ Errores documentados y soluciones propuestas
