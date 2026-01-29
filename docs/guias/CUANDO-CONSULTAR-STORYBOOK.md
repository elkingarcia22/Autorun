# 📚 Cuándo Consultar Storybook en el Proceso de Implementación

> **⚠️ CRÍTICO:** Esta guía explica CUÁNDO y CUÁNTAS VECES se debe consultar Storybook durante el proceso de implementación.

---

## ✅ Respuesta Directa

**SÍ, el sistema consulta Storybook las veces que requiera para implementar cada tarea/funcionalidad.**

**No es solo una vez al inicio, sino:**
- ✅ **Una vez por cada historia** de Storybook
- ✅ **Una vez por cada funcionalidad** específica
- ✅ **Antes de implementar cada tarea** del plan

---

## 🔄 Flujo Completo: Cuándo Consultar Storybook

### **ESCENARIO 1: Implementación por Historias de Storybook**

**Ejemplo: Implementar DataTable con 5 historias**

```
[INICIO] Usuario: "Implementa un DataTable"
         ↓
[CONSULTA 1] Storybook - Historia 1: "DataTable básico"
         - Consultar historia específica
         - Revisar pestaña "Code" y "Controls"
         - Implementar SOLO esa funcionalidad
         - Probar
         ↓
[CONSULTA 2] Storybook - Historia 2: "Paginación"
         - Consultar historia específica de paginación
         - Revisar pestaña "Code" y "Controls"
         - Implementar SOLO paginación
         - Probar
         ↓
[CONSULTA 3] Storybook - Historia 3: "Búsqueda"
         - Consultar historia específica de búsqueda
         - Revisar pestaña "Code" y "Controls"
         - Implementar SOLO búsqueda
         - Probar
         ↓
[CONSULTA 4] Storybook - Historia 4: "Filtros"
         - Consultar historia específica de filtros
         - Revisar pestaña "Code" y "Controls"
         - Implementar SOLO filtros
         - Probar
         ↓
[CONSULTA 5] Storybook - Historia 5: "Checkboxes y Action Bar"
         - Consultar historia específica de checkboxes
         - Revisar pestaña "Code" y "Controls"
         - Implementar SOLO checkboxes y Action Bar
         - Probar
         ↓
[FIN] Implementación completa
```

**Total: 5 consultas a Storybook (una por cada historia)**

---

### **ESCENARIO 2: Implementación desde Imagen (Múltiples Componentes)**

**Ejemplo: Crear dashboard con Tabs, DataTable y Buttons**

```
[INICIO] Usuario: "Crea un dashboard" (con imagen)
         ↓
[ANÁLISIS] Analizar imagen
         - Identificar componentes: Tabs, DataTable, Buttons
         - Crear plan de implementación
         ↓
[CONSULTA 1] Storybook - Componente: Tabs
         - Consultar historia de Tabs
         - Revisar pestaña "Code" y "Controls"
         - Implementar Tabs
         - Probar
         ↓
[CONSULTA 2] Storybook - Componente: DataTable (Historia 1)
         - Consultar historia básica de DataTable
         - Revisar pestaña "Code" y "Controls"
         - Implementar DataTable básico
         - Probar
         ↓
[CONSULTA 3] Storybook - Componente: DataTable (Historia 2)
         - Consultar historia de paginación
         - Revisar pestaña "Code" y "Controls"
         - Implementar paginación
         - Probar
         ↓
[CONSULTA 4] Storybook - Componente: Buttons
         - Consultar historia de Buttons
         - Revisar pestaña "Code" y "Controls"
         - Implementar Buttons
         - Probar
         ↓
[FIN] Implementación completa
```

**Total: 4+ consultas a Storybook (una por cada componente/funcionalidad)**

---

## 📋 Checklist por Historia/Tarea

**Para CADA historia o tarea, el checklist incluye:**

```markdown
### ✅ Checklist: Historia "Paginación"

- [ ] **Item 1: Consultar Historia en Storybook** ⚠️ OBLIGATORIO
  - [ ] Guardar URL del template ANTES de navegar
  - [ ] Navegar a historia específica en Storybook
  - [ ] Revisar pestaña "Code" (código exacto)
  - [ ] Revisar pestaña "Controls" (opciones específicas)
  - [ ] Revisar pestaña "Docs" (documentación)
  - [ ] Volver al template después de consultar
  - [ ] Marcar como completado

- [ ] **Item 2: Entender la Funcionalidad**
  - [ ] Documentar qué funcionalidad específica se va a implementar
  - [ ] Entender cómo funciona esta funcionalidad
  - [ ] Marcar como completado

- [ ] **Item 3: Implementar la Funcionalidad**
  - [ ] Implementar SOLO la funcionalidad de esta historia
  - [ ] Usar parámetros exactos vistos en Storybook
  - [ ] Marcar como completado

- [ ] **Item 4: Probar la Funcionalidad**
  - [ ] Probar que funciona correctamente
  - [ ] Verificar en el navegador
  - [ ] Marcar como completado
```

**⚠️ CRÍTICO:** El primer item del checklist SIEMPRE es "Consultar Historia en Storybook"

---

## 🔄 Proceso Detallado: Una Historia a la Vez

### **Paso 1: Obtener Plan con Historias**

```typescript
// Obtener plan basado en historias
const plan = await getStoryBasedImplementationPlan('DataTable', 'data-data-table');
// Plan incluye: 5 historias (básico, paginación, búsqueda, filtros, checkboxes)
```

### **Paso 2: Para Cada Historia (UNA A LA VEZ)**

```typescript
for (let i = 0; i < plan.storySteps.length; i++) {
  const step = plan.storySteps[i];
  
  // ⚠️ CRÍTICO: Consultar Storybook ANTES de implementar esta historia
  // 1. Guardar URL del template
  const templateUrl = await getCurrentTemplateUrl();
  
  // 2. Navegar a la historia específica en Storybook
  await navigateToStorybook(step.story.url);
  // Ejemplo: https://ubits-storybook10.vercel.app/?path=/story/data-data-table--paginacion
  
  // 3. Revisar pestaña "Code" - ver código exacto de esta funcionalidad
  await reviewCodeTab();
  
  // 4. Revisar pestaña "Controls" - ver opciones específicas
  await reviewControlsTab();
  
  // 5. Revisar pestaña "Docs" - ver documentación
  await reviewDocsTab();
  
  // 6. Volver al template
  await navigateToTemplate(templateUrl);
  
  // 7. Marcar como consultado
  await markStorybookConsulted(step.story.id);
  
  // 8. Implementar SOLO esta funcionalidad
  await implementStory(step.story);
  
  // 9. Probar que funciona
  await testStory(step.story);
  
  // 10. Verificar que TODO el checklist esté completo
  if (!step.checklist.allCompleted) {
    throw new Error('Checklist incompleto');
  }
  
  // 11. Continuar con siguiente historia
}
```

---

## ⚠️ Reglas Críticas

### **❌ NUNCA Hacer:**

1. ❌ Consultar Storybook solo una vez al inicio
2. ❌ Implementar múltiples historias sin consultar cada una
3. ❌ Saltarse la consulta de Storybook para alguna historia
4. ❌ Usar información de una historia anterior para otra

### **✅ SIEMPRE Hacer:**

1. ✅ Consultar Storybook ANTES de cada historia
2. ✅ Consultar la historia específica (NO usar "default")
3. ✅ Revisar pestaña "Code" y "Controls" para cada historia
4. ✅ Volver al template después de cada consulta
5. ✅ Implementar SOLO la funcionalidad de esa historia específica

---

## 📊 Ejemplo Real: DataTable con 5 Historias

### **Historia 1: DataTable Básico**
- **Consulta Storybook:** Historia "default" o "basico"
- **Revisar:** Estructura básica, columnas, datos
- **Implementar:** DataTable básico sin funcionalidades adicionales

### **Historia 2: Paginación**
- **Consulta Storybook:** Historia "paginacion"
- **Revisar:** Cómo se configura paginación, opciones disponibles
- **Implementar:** Agregar paginación al DataTable básico

### **Historia 3: Búsqueda**
- **Consulta Storybook:** Historia "busqueda" o "search"
- **Revisar:** Cómo se configura búsqueda, SearchButton
- **Implementar:** Agregar búsqueda al DataTable

### **Historia 4: Filtros**
- **Consulta Storybook:** Historia "filtros" o "filters"
- **Revisar:** Cómo se configuran filtros, FilterButton
- **Implementar:** Agregar filtros al DataTable

### **Historia 5: Checkboxes y Action Bar**
- **Consulta Storybook:** Historia "checkboxes" o "seleccion-multiple"
- **Revisar:** Cómo se configuran checkboxes, Action Bar
- **Implementar:** Agregar checkboxes y Action Bar al DataTable

**Total: 5 consultas a Storybook (una por cada historia)**

---

## 🔄 Flujo Visual

```
Usuario: "Implementa DataTable"
         ↓
[PLAN] Obtener plan: 5 historias
         ↓
┌─────────────────────────────────────┐
│ Historia 1: Básico                  │
│ → Consultar Storybook (Historia 1)  │
│ → Implementar básico                │
│ → Probar                            │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│ Historia 2: Paginación              │
│ → Consultar Storybook (Historia 2)  │ ← NUEVA CONSULTA
│ → Implementar paginación             │
│ → Probar                            │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│ Historia 3: Búsqueda                │
│ → Consultar Storybook (Historia 3)  │ ← NUEVA CONSULTA
│ → Implementar búsqueda               │
│ → Probar                            │
└─────────────────────────────────────┘
         ↓
... (continuar con cada historia)
```

---

## ✅ Resumen

**SÍ, el sistema consulta Storybook las veces que requiera:**

- ✅ **Una vez por cada historia** de Storybook
- ✅ **Una vez por cada funcionalidad** específica
- ✅ **Antes de implementar cada tarea** del plan

**No es solo una vez al inicio, sino múltiples veces durante todo el proceso.**

**Cada consulta es específica para la funcionalidad que se va a implementar en ese momento.**

---

**Última actualización:** 2025-01-03




