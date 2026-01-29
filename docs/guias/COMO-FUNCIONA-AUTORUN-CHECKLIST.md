# ✅ Cómo Funciona `autorun.checklist`

**Fecha:** 2025-01-03  
**Herramienta:** `autorun.checklist` - Obtiene checklist de implementación para un componente

---

## 🎯 ¿Qué hace `autorun.checklist`?

`autorun.checklist` es una herramienta que **verifica qué pasos del checklist de implementación se han completado** para un componente específico. Es útil para:

- ✅ Ver qué pasos ya se completaron
- ✅ Ver qué pasos faltan antes de implementar
- ✅ Verificar si se puede implementar el componente
- ✅ Obtener el plan basado en historias (si está disponible)

---

## 🔄 Flujo Completo

### **PASO 1: Validación del Input**

```typescript
// 1. Verificar que el nombre del componente no esté vacío
if (!input.componentName || input.componentName.trim().length === 0) {
  return { canImplement: false, reason: 'El nombre del componente no puede estar vacío' };
}
```

**Qué hace:**
- ✅ Valida que el nombre del componente tenga contenido
- ❌ Si está vacío, retorna error inmediatamente

---

### **PASO 2: Obtener Pre-Implementation Check Add-on**

```typescript
// 2. Obtener el add-on de Pre-Implementation Check
const orchestrator = new AddonOrchestrator();
const hub = await orchestrator.getHub();
const preCheckAddon = hub.getAddon('pre-implementation-check');
```

**Qué hace:**
- ✅ Obtiene el `AutorunHub` (orquestador central)
- ✅ Busca el add-on `pre-implementation-check`
- ❌ Si el add-on no está activo, retorna checklist vacío

**El Pre-Implementation Check Add-on es responsable de:**
- Verificar qué pasos del checklist se han completado
- Mantener el estado del checklist para cada componente
- Determinar si se puede implementar un componente

---

### **PASO 3: Verificar Servicios Disponibles**

```typescript
// 3. Verificar que los servicios estén disponibles
const services = preCheckAddon.getServices();
if (!services || !services.canImplement) {
  return { canImplement: false, reason: 'Servicios no disponibles' };
}
```

**Qué hace:**
- ✅ Verifica que el add-on tenga servicios disponibles
- ✅ Verifica que el método `canImplement()` esté disponible
- ❌ Si no están disponibles, retorna error

---

### **PASO 4: Obtener Checklist**

```typescript
// 4. Obtener checklist del componente
const checkResult = await services.canImplement(input.componentName);
const checklist = checkResult.checklist || {
  storybookVercel: false,
  storybookMCP: false,
  documentation: false,
  comparison: false,
};
```

**Qué hace:**
- ✅ Llama a `canImplement()` con el nombre del componente
- ✅ Obtiene el estado del checklist (4 pasos obligatorios)
- ✅ Obtiene pasos faltantes y completados
- ✅ Obtiene si se puede implementar y la razón

**Los 4 pasos del checklist son:**

1. **`storybookVercel`** - ¿Se consultó Storybook en Vercel?
   - URL: `https://ubits-storybook10.vercel.app/`
   - Versión más reciente del componente

2. **`storybookMCP`** - ¿Se consultó Storybook MCP?
   - Obtiene props exactas del componente
   - Usa el servidor MCP de Storybook

3. **`documentation`** - ¿Se consultó la documentación?
   - Archivos Markdown en `docs/referencia/componentes/`
   - Información detallada del componente

4. **`comparison`** - ¿Se compararon versiones?
   - Compara código local vs Storybook
   - Verifica diferencias y actualizaciones

---

### **PASO 5: Preparar Pasos Completados y Faltantes**

```typescript
// 5. Preparar listas de pasos
const completedSteps: string[] = [];
if (checklist.storybookVercel) completedSteps.push('Consultar Storybook en Vercel');
if (checklist.storybookMCP) completedSteps.push('Consultar Storybook MCP');
if (checklist.documentation) completedSteps.push('Consultar documentación');
if (checklist.comparison) completedSteps.push('Comparar versiones');

const missingSteps = checkResult.missingSteps || [];
```

**Qué hace:**
- ✅ Crea lista de pasos completados (basada en el checklist)
- ✅ Obtiene lista de pasos faltantes (del resultado)
- ✅ Prepara información para el usuario

---

### **PASO 6: Obtener Plan Basado en Historias (Opcional)**

```typescript
// 6. Obtener plan basado en historias si está disponible
let plan;
if (services.getOrCreateStoryBasedPlan) {
  const componentId = await mapComponentNameToStorybookId(input.componentName);
  plan = await services.getOrCreateStoryBasedPlan(input.componentName, componentId);
}
```

**Qué hace:**
- ✅ Si el servicio tiene `getOrCreateStoryBasedPlan()`, lo llama
- ✅ Obtiene el plan basado en historias de Storybook
- ✅ El plan incluye todas las historias del componente y sus pasos

**El plan basado en historias incluye:**
- Lista de historias disponibles en Storybook
- Pasos específicos para cada historia
- Orden de implementación recomendado

---

## 📊 Estructura del Resultado

```typescript
{
  componentName: "Button",
  checklist: {
    storybookVercel: true,   // ✅ Consultado
    storybookMCP: true,      // ✅ Consultado
    documentation: false,     // ❌ No consultado
    comparison: false        // ❌ No consultado
  },
  missingSteps: [
    "Consultar documentación",
    "Comparar versiones"
  ],
  completedSteps: [
    "Consultar Storybook en Vercel",
    "Consultar Storybook MCP"
  ],
  canImplement: false,       // ❌ No se puede implementar (faltan pasos)
  reason: "Faltan 2 pasos obligatorios del checklist",
  plan: {                    // Opcional: Plan basado en historias
    totalSteps: 5,
    stories: [...]
  }
}
```

---

## 🎯 Ejemplo Completo

### **Input:**
```json
{
  "componentName": "Button"
}
```

### **Proceso:**

1. **Validación:** ✅ Nombre válido
2. **Obtener Add-on:** ✅ Pre-Implementation Check activo
3. **Verificar Servicios:** ✅ Servicios disponibles
4. **Obtener Checklist:** 
   - `storybookVercel: true` (ya se consultó)
   - `storybookMCP: true` (ya se consultó)
   - `documentation: false` (no se consultó)
   - `comparison: false` (no se consultó)
5. **Preparar Pasos:**
   - Completados: 2
   - Faltantes: 2
6. **Obtener Plan:** ✅ Plan disponible con 5 historias

### **Output:**
```json
{
  "componentName": "Button",
  "checklist": {
    "storybookVercel": true,
    "storybookMCP": true,
    "documentation": false,
    "comparison": false
  },
  "missingSteps": [
    "Consultar documentación",
    "Comparar versiones"
  ],
  "completedSteps": [
    "Consultar Storybook en Vercel",
    "Consultar Storybook MCP"
  ],
  "canImplement": false,
  "reason": "Faltan 2 pasos obligatorios del checklist",
  "plan": {
    "totalSteps": 5,
    "stories": [
      { "name": "default", "steps": [...] },
      { "name": "withIcon", "steps": [...] },
      // ... más historias
    ]
  }
}
```

---

## 🔍 Logs Detallados

La herramienta genera logs detallados en cada paso:

```
✅ [autorun.checklist v2] ========================================
✅ [autorun.checklist v2] Iniciando obtención de checklist...
   ⏰ Timestamp: 2025-01-03T...
   📦 Componente: Button
   ✅ [PASO 1] Validando input...
   ✅ [PASO 1] Input válido
   ✅ [PASO 2] Importando función original...
   ✅ [PASO 2] Función importada en 12ms
   ✅ [PASO 3] Llamando función original...
   ✅ [PASO 3] Función ejecutada en 156ms
   ✅ [PASO 4] Procesando resultado...
   ✅ [PASO 4] Resultado procesado:
      - Componente: Button
      - Checklist:
        • Storybook Vercel: ✅
        • Storybook MCP: ✅
        • Documentación: ❌
        • Comparación: ❌
      - Pasos completados: 2
      - Pasos faltantes: 2
      - Puede implementar: ❌ NO
      - Razón: Faltan 2 pasos obligatorios del checklist
      - Plan disponible: ✅ (5 historias)
✅ [autorun.checklist v2] ========================================
```

---

## ⚠️ Casos Especiales

### **1. Add-on No Activo**
```json
{
  "componentName": "Button",
  "checklist": {
    "storybookVercel": false,
    "storybookMCP": false,
    "documentation": false,
    "comparison": false
  },
  "missingSteps": [
    "Consultar Storybook en Vercel",
    "Consultar Storybook MCP",
    "Consultar documentación",
    "Comparar versiones"
  ],
  "completedSteps": [],
  "canImplement": false,
  "reason": "Pre-Implementation Check add-on no está activo"
}
```

### **2. Servicios No Disponibles**
```json
{
  "componentName": "Button",
  "checklist": { /* todos false */ },
  "missingSteps": [ /* todos los pasos */ ],
  "completedSteps": [],
  "canImplement": false,
  "reason": "Servicios de Pre-Implementation Check no disponibles"
}
```

### **3. Checklist Completo**
```json
{
  "componentName": "Button",
  "checklist": {
    "storybookVercel": true,
    "storybookMCP": true,
    "documentation": true,
    "comparison": true
  },
  "missingSteps": [],
  "completedSteps": [
    "Consultar Storybook en Vercel",
    "Consultar Storybook MCP",
    "Consultar documentación",
    "Comparar versiones"
  ],
  "canImplement": true,
  "plan": { /* plan disponible */ }
}
```

---

## 🎯 Ventajas

1. **✅ Verificación proactiva:** Verifica qué pasos faltan antes de implementar
2. **✅ Estado claro:** Muestra exactamente qué se ha completado y qué falta
3. **✅ Plan integrado:** Incluye plan basado en historias si está disponible
4. **✅ Logs detallados:** Facilita el debugging
5. **✅ Prevención de errores:** Evita implementar sin completar pasos obligatorios

---

## 🔗 Relación con Otras Herramientas

### **Con `autorun.plan`:**
- `autorun.plan` genera un plan general de implementación
- `autorun.checklist` verifica qué pasos específicos se han completado

### **Con `autorun.apply`:**
- `autorun.checklist` verifica si se puede implementar
- `autorun.apply` ejecuta la implementación (si el checklist está completo)

### **Flujo Recomendado:**
```
1. autorun.plan → Ver plan general
2. autorun.checklist → Ver qué pasos faltan
3. Completar pasos faltantes
4. autorun.checklist → Verificar que todo esté completo
5. autorun.apply → Implementar
```

---

## 📚 Referencias

- **Código fuente:** `packages/autorun-core/src/mcp-server-v2/tools/checklist.ts`
- **Función original:** `packages/autorun-core/src/mcp-server/tools/autorunChecklist.ts`
- **Pre-Implementation Check Add-on:** `packages/addons/functional/pre-implementation-check/`
- **AddonOrchestrator:** `packages/autorun-core/src/helpers/addonOrchestrator.ts`


