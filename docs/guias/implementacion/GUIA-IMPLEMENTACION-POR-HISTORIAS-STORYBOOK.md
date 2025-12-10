# 📚 Guía: Implementación por Historias de Storybook

## 🎯 Objetivo

Implementar componentes dividiendo por las historias (stories) que tienen en Storybook, consultando cada historia una por una antes de implementarla.

---

## ⚠️⚠️⚠️ PRINCIPIO FUNDAMENTAL ⚠️⚠️⚠️

> **"Implementar UNA historia específica a la vez, completando TODO su checklist antes de continuar"** 

**⚠️ CRÍTICO:**
- ❌ **NO usar la historia "default"** - tiene todas las funcionalidades mezcladas y causa errores
- ✅ **Usar historias específicas** - una funcionalidad por historia (ej: "columnas-reordenables", "filas-expandibles")
- ✅ **Implementar UNA historia a la vez** - no intentar múltiples al mismo tiempo
- ✅ **Completar TODO el checklist** de una historia antes de pasar a la siguiente

---

## 📋 PROCESO OBLIGATORIO

### **PASO 1: OBTENER HISTORIAS DEL COMPONENTE** 🔍

**ANTES de implementar cualquier componente, DEBES:**

1. **Obtener todas las historias del componente desde Storybook:**
   ```typescript
   import { getStoryBasedImplementationPlan } from '@autorun/core/helpers/componentHelpers';
   
   const plan = await getStoryBasedImplementationPlan('DataTable', 'data-data-table');
   ```

2. **Revisar el plan generado:**
   - Ver cuántas historias tiene el componente
   - Ver el orden de implementación
   - Ver las dependencias entre historias

3. **Mostrar el plan al usuario:**
   - Listar todas las historias
   - Mostrar tiempo estimado
   - Pedir aprobación antes de continuar

---

### **PASO 2: IMPLEMENTAR UNA HISTORIA A LA VEZ CON CHECKLIST** 🛠️ ⚠️ OBLIGATORIO

**⚠️ CRÍTICO: Implementar UNA historia a la vez, completando TODO su checklist antes de continuar**

**Para CADA historia del componente:**

#### **2.1 Obtener Checklist de la Historia** 📋

**ANTES de empezar, DEBES:**

1. **Obtener el checklist de la historia:**
   ```typescript
   import { getStoryChecklist } from '@autorun/core/helpers/storyBasedImplementation';
   
   const checklist = getStoryChecklist(plan, step.story.id);
   console.log(`📋 Checklist para "${step.story.name}": ${checklist.items.length} items`);
   ```

2. **Verificar que la historia anterior esté completa:**
   - Si no es la primera historia, verificar que la anterior tenga `checklist.allCompleted === true`
   - Si no está completa, NO continuar

#### **2.2 Completar Items del Checklist (Uno por Uno)** ✅

**Para CADA item del checklist:**

**Item 1: Consultar Historia en Storybook** ⚠️ OBLIGATORIO

1. **Guardar URL del template ANTES de navegar:**
   ```typescript
   const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
   const templateUrl = snapshot?.url;
   ```

2. **Navegar a la historia específica en Storybook:**
   - URL: `step.story.url` (ya incluye parámetros específicos para esa funcionalidad)
   - Ejemplo: `https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default&args=columnReorderable=true&columnSortable=false`
   - ⚠️ NOTA: La URL ya tiene los parámetros correctos para mostrar SOLO esa funcionalidad

3. **Revisar pestaña "Code":**
   - Ver el código exacto de la historia
   - Copiar la configuración exacta
   - Ver qué opciones se usan para esta funcionalidad específica

4. **Revisar pestaña "Controls":**
   - Ver todas las opciones disponibles
   - Ver los valores específicos para esta funcionalidad
   - Ver qué opciones están activadas/desactivadas

5. **Revisar pestaña "Docs" (si está disponible):**
   - Ver documentación de la historia
   - Ver ejemplos de uso
   - Ver casos de uso

6. **Volver al template:**
   - ⚠️ OBLIGATORIO: Volver al template después de consultar
   ```typescript
   await mcp_cursor-ide-browser_browser_navigate({ url: templateUrl });
   await mcp_cursor-ide-browser_browser_snapshot();
   ```

7. **Marcar item como completado:**
   ```typescript
   import { completeChecklistItem } from '@autorun/core/helpers/storyBasedImplementation';
   plan = completeChecklistItem(plan, step.story.id, 'consult-storybook');
   ```

**Item 2: Entender la Funcionalidad** 🧠

1. **Documentar qué funcionalidad específica se va a implementar**
2. **Entender cómo funciona esta funcionalidad**
3. **Marcar como completado**

**Item 3: Implementar la Funcionalidad** 💻

1. **Implementar SOLO la funcionalidad de esta historia específica:**
   - ❌ NO implementar otras funcionalidades
   - ✅ Usar los parámetros exactos vistos en Storybook
   - ✅ Implementar solo lo necesario para esta funcionalidad

2. **Marcar como completado después de implementar**

**Item 4: Probar la Funcionalidad** 🧪

1. **Probar que la funcionalidad funciona correctamente**
2. **Verificar en el navegador**
3. **Marcar como completado**

**Items Adicionales Específicos:**
- Si la historia es de drag & drop: probar drag & drop
- Si es de expandir/colapsar: probar expandir/colapsar
- Si es de ordenamiento: probar ordenamiento
- etc.

#### **2.3 Verificar Checklist Completo** ✅

**ANTES de continuar con la siguiente historia:**

1. **Verificar que TODO el checklist esté completo:**
   ```typescript
   if (!step.checklist.allCompleted) {
     throw new Error(`⚠️ Checklist incompleto para "${step.story.name}". Debe completarse antes de continuar.`);
   }
   ```

2. **Solo entonces continuar con la siguiente historia**

---

## 📊 Ejemplo: DataTable

### **⚠️ Historias Específicas de DataTable (NO usar "default"):**

1. **columnas-reordenables** - Solo reordenamiento de columnas mediante drag & drop
   - Checklist: Consultar Storybook → Entender → Implementar → Probar drag & drop
   
2. **filas-reordenables** - Solo reordenamiento de filas mediante drag & drop
   - Checklist: Consultar Storybook → Entender → Implementar → Probar drag & drop
   
3. **filas-expandibles** - Solo expandir/colapsar filas para mostrar contenido adicional
   - Checklist: Consultar Storybook → Entender → Implementar → Probar expand/collapse
   
4. **ordenamiento-columnas** - Solo ordenamiento (ascendente/descendente) en columnas
   - Checklist: Consultar Storybook → Entender → Implementar → Probar sorting
   
5. **seleccion-multiple** - Solo checkboxes y Action Bar para selección múltiple
   - Checklist: Consultar Storybook → Entender → Implementar → Probar selección y Action Bar
   
6. **paginacion** - Solo paginación con controles de página e items por página
   - Checklist: Consultar Storybook → Entender → Implementar → Probar paginación
   
7. **busqueda-filtros** - Solo búsqueda y filtros en el header del DataTable
   - Checklist: Consultar Storybook → Entender → Implementar → Probar búsqueda y filtros
   
8. **columnas-sticky** - Solo columnas fijas (sticky) al hacer scroll horizontal
   - Checklist: Consultar Storybook → Entender → Implementar → Probar sticky columns

### **Proceso de Implementación Ejemplo:**

```typescript
// 1. Obtener plan con historias específicas (NO "default")
import { getStoryBasedImplementationPlan } from '@autorun/core/helpers/componentHelpers';

const result = await getStoryBasedImplementationPlan('DataTable', 'data-data-table');
const plan = result.plan;

// 2. Implementar UNA historia a la vez
for (let i = 0; i < plan.storySteps.length; i++) {
  const step = plan.storySteps[i];
  
  // Verificar que la historia anterior esté completa
  if (i > 0) {
    const previousStep = plan.storySteps[i - 1];
    if (!previousStep.checklist.allCompleted) {
      throw new Error(`⚠️ Checklist de "${previousStep.story.name}" no está completo`);
    }
  }
  
  // Obtener checklist
  const checklist = step.checklist;
  console.log(`📋 Implementando: ${step.story.name}`);
  console.log(`   Checklist: ${checklist.items.length} items`);
  
  // Completar cada item del checklist
  // ... (ver sección 2.2 arriba)
  
  // Verificar que todo esté completo antes de continuar
  if (!step.checklist.allCompleted) {
    throw new Error(`⚠️ Checklist incompleto para "${step.story.name}"`);
  }
  
  console.log(`✅ "${step.story.name}" completada. Continuando...`);
}
```

---

## 🔧 Funciones Helper Disponibles

### **`getStoryBasedImplementationPlan(componentName, componentId?)`**

Obtiene el plan de implementación basado en historias:

```typescript
import { getStoryBasedImplementationPlan } from '@autorun/core/helpers/componentHelpers';

const result = await getStoryBasedImplementationPlan('DataTable', 'data-data-table');
console.log(result.plan); // Plan completo
console.log(result.summary); // Resumen en texto
console.log(result.instructions); // Instrucciones para el agente
```

### **`getComponentStories(componentName, componentId?)`**

Obtiene todas las historias de un componente:

```typescript
import { getComponentStories } from '@autorun/core/helpers/storybookStories';

const stories = await getComponentStories('DataTable', 'data-data-table');
console.log(stories.stories); // Lista de historias
console.log(stories.totalStories); // Total de historias
```

### **`getStoryConsultationInstructions(story)`**

Obtiene instrucciones para consultar una historia:

```typescript
import { getStoryConsultationInstructions } from '@autorun/core/helpers/storyBasedImplementation';

const instructions = getStoryConsultationInstructions(story);
console.log(instructions.url); // URL de la historia
console.log(instructions.steps); // Pasos a seguir
```

---

## ⚠️ REGLAS CRÍTICAS

### **1. SIEMPRE Consultar Historia Antes de Implementar**

- ❌ **INCORRECTO:** Implementar sin consultar la historia en Storybook
- ✅ **CORRECTO:** Consultar la historia, revisar código y opciones, luego implementar

### **2. Implementar Una Historia a la Vez**

- ❌ **INCORRECTO:** Implementar múltiples historias al mismo tiempo
- ✅ **CORRECTO:** Implementar una historia, verificar, luego continuar con la siguiente

### **3. Seguir el Orden de las Historias**

- ❌ **INCORRECTO:** Saltar historias o cambiar el orden
- ✅ **CORRECTO:** Seguir el orden: default primero, luego las demás según dependencias

### **4. Verificar Cada Historia Después de Implementar**

- ❌ **INCORRECTO:** Implementar y continuar sin verificar
- ✅ **CORRECTO:** Implementar, verificar que funciona, luego continuar

---

## 📝 Checklist por Historia

Para cada historia, completar:

- [ ] ✅ Historia consultada en Storybook
- [ ] ✅ Código de la historia revisado (pestaña "Code")
- [ ] ✅ Opciones revisadas (pestaña "Controls")
- [ ] ✅ Documentación revisada (pestaña "Docs", si está disponible)
- [ ] ✅ Funcionalidad implementada
- [ ] ✅ Funcionalidad verificada
- [ ] ✅ No rompe funcionalidades anteriores
- [ ] ✅ Historia marcada como completada

---

## 🔗 Referencias

- **Guía de implementación paso a paso:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-POR-PASOS.md`
- **Guía de DataTable paso a paso:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Verificar Storybook en Vercel:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md`
- **Usar MCPs en implementación:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`

---

## ⚠️⚠️⚠️ REGLAS CRÍTICAS ⚠️⚠️⚠️

1. **❌ NO usar historia "default"** - Tiene todas las funcionalidades mezcladas y causa errores
2. **✅ Usar historias específicas** - Una funcionalidad por historia
3. **✅ Implementar UNA historia a la vez** - No intentar múltiples al mismo tiempo
4. **✅ Completar TODO el checklist** de una historia antes de pasar a la siguiente
5. **✅ Consultar cada historia en Storybook** antes de implementarla
6. **✅ Implementar SOLO la funcionalidad** de esa historia específica
7. **✅ Probar y verificar** que funciona antes de marcar como completado
8. **✅ NO continuar** hasta que TODO el checklist esté completo

---

**Última actualización:** 2025-01-09


