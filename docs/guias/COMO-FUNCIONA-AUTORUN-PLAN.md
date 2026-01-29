# 📋 Cómo Funciona `autorun.plan`

**Fecha:** 2025-01-03  
**Herramienta:** `autorun.plan` - Genera planes de implementación sin ejecutar

---

## 🎯 ¿Qué hace `autorun.plan`?

`autorun.plan` es una herramienta que **analiza el mensaje del usuario** y genera un **plan de implementación detallado** sin ejecutar ningún código. Es útil para:

- ✅ Previsualizar qué se va a implementar
- ✅ Ver qué componentes se detectaron
- ✅ Ver los pasos que se seguirán
- ✅ Verificar si la implementación está bloqueada

---

## 🔄 Flujo Completo

### **PASO 1: Validación del Input**

```typescript
// 1. Verificar que el mensaje no esté vacío
if (!input.message || input.message.trim().length === 0) {
  return { blocked: true, reason: 'El mensaje no puede estar vacío' };
}
```

**Qué hace:**
- ✅ Valida que el mensaje tenga contenido
- ❌ Si está vacío, retorna error inmediatamente

---

### **PASO 2: Detección de Componentes**

```typescript
// 2. Ejecutar handleUserMessage() para detectar componentes
const result = await handleUserMessage(input.message);
```

**Qué hace `handleUserMessage()`:**

1. **Ejecuta `executeOnMessageStart()`** que:
   - Detecta componentes usando patrones regex
   - Verifica triggers de palabras clave (`implementar`, `crear`, `agregar`, etc.)
   - Consulta el sistema de fases (FASE 0 → 0.1 → 0.5 → 0.6 → 1 → 2)
   - Verifica si hay pasos activos que deben completarse primero
   - Obtiene plan basado en historias de Storybook (si aplica)

2. **Detección de componentes:**
   - Usa `detectComponentFromMessage()` con **80+ patrones** de componentes
   - Detecta múltiples componentes en el mismo mensaje
   - Prioriza componentes por especificidad (ej: `RadioButton` antes que `Button`)

3. **Mapeo a Storybook IDs:**
   - Convierte nombres de componentes a IDs de Storybook
   - Ejemplo: `"Button"` → `"basicos-button"`

**Ejemplo de detección:**
```
Mensaje: "implementa un botón que abra un drawer"

Detección:
  - Componente 1: "Button" (detectado por patrón /\bbot[oó]n\b/)
  - Componente 2: "Drawer" (detectado por patrón /\bdrawer\b/)
```

---

### **PASO 3: Preparación de Componentes**

```typescript
// 3. Preparar lista de componentes detectados
const components = [];

// Componente principal
if (result.componentName) {
  const storybookId = await mapComponentNameToStorybookId(result.componentName);
  components.push({
    name: result.componentName,
    storybookId,
    detected: true,
    confidence: 'high'
  });
}

// Componentes adicionales
if (result.mcpMessages) {
  for (const msg of result.mcpMessages) {
    components.push({
      name: msg.componentName,
      storybookId: msg.storybookId,
      detected: true,
      confidence: 'high'
    });
  }
}
```

**Qué hace:**
- ✅ Crea lista de componentes detectados
- ✅ Mapea cada componente a su ID de Storybook
- ✅ Incluye componentes principales y adicionales
- ✅ Asigna nivel de confianza (`high`, `medium`, `low`)

---

### **PASO 4: Construcción de URLs de Storybook**

```typescript
// 4. Construir URLs de Storybook para cada componente
const storybookUrls = [];
for (const component of components) {
  const urlResult = await buildSafeStorybookUrl(component.storybookId, 'default');
  if (urlResult.url) {
    storybookUrls.push(urlResult.url);
  }
}
```

**Qué hace:**
- ✅ Genera URLs de Storybook para cada componente
- ✅ Formato: `https://ubits-storybook10.vercel.app/?path=/story/{componentId}--default`
- ✅ Permite acceso directo a la documentación del componente

---

### **PASO 5: Generación de Pasos del Plan**

```typescript
// 5. Generar pasos del plan de implementación
const steps = [
  {
    step: 1,
    description: 'Detectar componentes automáticamente desde el mensaje',
    required: true,
    estimatedTime: '1s'
  },
  {
    step: 2,
    description: 'Consultar Storybook MCP para obtener props exactas',
    required: true,
    estimatedTime: '2-5s'
  },
  {
    step: 3,
    description: 'Extraer código exacto desde Storybook (pestaña Code)',
    required: true,
    estimatedTime: '3-10s'
  },
  // ... más pasos
];
```

**Qué hace:**
- ✅ Define los pasos que se seguirán en la implementación
- ✅ Indica si cada paso es requerido u opcional
- ✅ Estima tiempo de ejecución para cada paso
- ✅ Total: 8 pasos estándar

---

### **PASO 6: Verificación de Bloqueos**

```typescript
// 6. Verificar si la implementación está bloqueada
if (result.blocked) {
  return {
    plan: { components: [], steps: [], totalSteps: 0 },
    blocked: true,
    reason: result.reason
  };
}
```

**Razones comunes de bloqueo:**
- ❌ Faltan pasos activos que deben completarse primero
- ❌ Fase no completada (ej: FASE 0.1 antes de FASE 1)
- ❌ Checklist incompleto
- ❌ Pre-Implementation Check falló

---

## 📊 Estructura del Resultado

```typescript
{
  plan: {
    components: [
      {
        name: "Button",
        storybookId: "basicos-button",
        detected: true,
        confidence: "high"
      },
      {
        name: "Drawer",
        storybookId: "feedback-drawer",
        detected: true,
        confidence: "high"
      }
    ],
    steps: [
      { step: 1, description: "...", required: true, estimatedTime: "1s" },
      { step: 2, description: "...", required: true, estimatedTime: "2-5s" },
      // ... más pasos
    ],
    totalSteps: 8,
    estimatedTime: "15-30s"
  },
  blocked: false,
  storybookUrls: [
    "https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default",
    "https://ubits-storybook10.vercel.app/?path=/story/feedback-drawer--default"
  ]
}
```

---

## 🎯 Ejemplo Completo

### **Input:**
```json
{
  "message": "implementa un botón que abra un drawer"
}
```

### **Proceso:**

1. **Validación:** ✅ Mensaje válido
2. **Detección:** 
   - Detecta "Button" (patrón `/\bbot[oó]n\b/`)
   - Detecta "Drawer" (patrón `/\bdrawer\b/`)
3. **Mapeo:**
   - `Button` → `basicos-button`
   - `Drawer` → `feedback-drawer`
4. **URLs:**
   - `https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default`
   - `https://ubits-storybook10.vercel.app/?path=/story/feedback-drawer--default`
5. **Plan:** Genera 8 pasos estándar

### **Output:**
```json
{
  "plan": {
    "components": [
      { "name": "Button", "storybookId": "basicos-button", "detected": true },
      { "name": "Drawer", "storybookId": "feedback-drawer", "detected": true }
    ],
    "steps": [
      { "step": 1, "description": "Detectar componentes...", "required": true },
      { "step": 2, "description": "Consultar Storybook MCP...", "required": true },
      // ... más pasos
    ],
    "totalSteps": 8,
    "estimatedTime": "15-30s"
  },
  "blocked": false,
  "storybookUrls": [
    "https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default",
    "https://ubits-storybook10.vercel.app/?path=/story/feedback-drawer--default"
  ]
}
```

---

## 🔍 Logs Detallados

La herramienta genera logs detallados en cada paso:

```
📋 [autorun.plan v2] ========================================
📋 [autorun.plan v2] Iniciando generación de plan...
   ⏰ Timestamp: 2025-01-03T...
   📝 Mensaje recibido: implementa un botón que abra un drawer
   📏 Longitud del mensaje: 45 caracteres
   ✅ [PASO 1] Validando input...
   ✅ [PASO 1] Input válido
   ✅ [PASO 2] Importando función original...
   ✅ [PASO 2] Función importada en 15ms
   ✅ [PASO 3] Llamando función original...
   ✅ [PASO 3] Función ejecutada en 234ms
   ✅ [PASO 4] Procesando resultado...
   ✅ [PASO 4] Resultado procesado:
      - Componentes detectados: 2
      - Pasos del plan: 8
      - Bloqueado: false
📋 [autorun.plan v2] ========================================
```

---

## ⚠️ Casos Especiales

### **1. Mensaje Vacío**
```json
{
  "plan": { "components": [], "steps": [], "totalSteps": 0 },
  "blocked": true,
  "reason": "El mensaje no puede estar vacío"
}
```

### **2. No se Detectaron Componentes**
```json
{
  "plan": { "components": [], "steps": [], "totalSteps": 0 },
  "blocked": false
}
```

### **3. Implementación Bloqueada**
```json
{
  "plan": { "components": [], "steps": [], "totalSteps": 0 },
  "blocked": true,
  "reason": "Faltan pasos activos que deben completarse primero"
}
```

---

## 🎯 Ventajas

1. **✅ No ejecuta código:** Solo genera el plan, no implementa nada
2. **✅ Detección automática:** Detecta componentes sin especificarlos explícitamente
3. **✅ Múltiples componentes:** Puede detectar varios componentes en un mensaje
4. **✅ URLs directas:** Proporciona enlaces directos a Storybook
5. **✅ Logs detallados:** Facilita el debugging
6. **✅ Verificación de bloqueos:** Indica si hay algo que impide la implementación

---

## 📚 Referencias

- **Código fuente:** `packages/autorun-core/src/mcp-server-v2/tools/plan.ts`
- **Función original:** `packages/autorun-core/src/mcp-server/tools/autorunPlan.ts`
- **Detección de componentes:** `packages/autorun-core/src/helpers/autoMessageHandler.ts`
- **Patrones de detección:** `packages/autorun-core/src/helpers/implementationHelpers.ts`

