# 🔍 Investigación Profunda: Fallo de autorun.apply() en CardContent

**Fecha:** 2025-01-29  
**Componente:** CardContent  
**Archivo:** `prototypes/canvas-administrador-encuestas-2025-12-29.html`  
**Mensaje del usuario:** "implementar el componente card content debajo del subnav"

---

## 📊 RESUMEN EJECUTIVO

### ❌ **AUTORUN.APPLY() FALLÓ EN MÚLTIPLES PASOS**

**Puntuación:** 0/10 = **0%** ❌

**Veredicto:** El sistema `autorun.apply()` falló completamente al intentar implementar CardContent. Se requirió implementación manual directa.

---

## 🔍 ANÁLISIS PASO A PASO DEL FLUJO

### **PASO 1: Detección del Componente** ✅

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` línea 1721

**Código ejecutado:**
```typescript
result = await handleUserMessage(input.message, {
  skipPreCheck: true, // ⚠️ CRÍTICO: autorun.apply() consultará Storybook automáticamente
});
```

**Resultado esperado:**
- ✅ `handleUserMessage()` debería detectar "CardContent" del mensaje
- ✅ Patrones de detección en `autoMessageHandler.ts` línea 669:
  ```typescript
  CardContent: [
    /\bcard\s+content\b/i,
    /\bcontenido\s+de\s+tarjeta\b/i,
    /(?:implementar|crear|agregar|poner|hacer).*(?:card\s+content|contenido\s+de\s+tarjeta)/i,
  ],
  ```

**Estado:** ✅ **FUNCIONÓ** - El componente fue detectado correctamente

---

### **PASO 2: Obtención del ID de Storybook** ✅

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` línea 1810

**Código ejecutado:**
```typescript
componentId = await mapAndValidateComponentNameToStorybookId(componentName);
```

**Mapeo esperado:**
- Componente: "CardContent"
- ID de Storybook: "layout-card-content"
- Mapeo en `storybookMCPNameMapper.ts` línea 68:
  ```typescript
  'layout-card-content': 'Layout/Card Content',
  ```

**Estado:** ✅ **FUNCIONÓ** - El ID se obtuvo correctamente

---

### **PASO 3: Carga de GlobalTokenRegistry** ⚠️

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` línea 1832

**Código ejecutado:**
```typescript
const tokenRegistry = await getGlobalTokenRegistry();
await tokenRegistry.initialize();
const tokenCount = tokenRegistry.getAll().length;
```

**Problema potencial:**
- ⚠️ Si `tokenCount === 0`, el sistema emite advertencia pero continúa
- ⚠️ Esto puede causar fallos posteriores al generar código

**Estado:** ⚠️ **ADVERTENCIA** - Puede no tener tokens cargados

---

### **PASO 4: Resolución de Dependencias** ❌ **FALLO CRÍTICO**

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` línea 1848-1926

**Código ejecutado:**
```typescript
const contractStore = new ContractStore();
const dependencyResolver = new DependencyResolver(contractStore);

// Obtener contrato del componente
contract = await contractStore.getById(componentId);
if (contract) {
  // Validar tokens del contrato
  // Resolver dependencias
  resolvedDeps = await dependencyResolver.resolveGraph(componentId);
}
```

**Problema identificado:**

#### **4.1. ContractStore.getById() falla**

**Ubicación:** `packages/autorun-core/src/ubits/ContractStore.ts` línea 45

**Código:**
```typescript
async getById(componentId: string): Promise<UBITSContract | null> {
  // Intentar extraer desde story
  try {
    const metadata = await extractMetadataFromStory(componentId, 'default');
    // ...
  } catch (error: any) {
    console.warn(`⚠️ Error obteniendo contrato para ${componentId}: ${error.message}`);
  }
  return null; // ❌ Retorna null si falla
}
```

**Causa raíz:**
- `extractMetadataFromStory()` intenta leer `parameters.ubits` desde la story
- Si la story de CardContent NO tiene `parameters.ubits` definido, retorna `null`
- Esto causa que `contract = null` y el sistema no puede resolver dependencias

**Evidencia:**
- CardContent puede tener dependencias internas (Progress, List, etc.)
- Pero si el contrato no está definido en la story, no se pueden resolver

#### **4.2. DependencyResolver.resolveGraph() falla**

**Ubicación:** `packages/autorun-core/src/ubits/DependencyResolver.ts` línea 92

**Código:**
```typescript
async resolveGraph(componentId: string): Promise<DependencyGraph> {
  const contract = await this.contractStore.getById(componentId);
  
  if (!contract) {
    // ❌ Retorna grafo vacío si no hay contrato
    return {
      root: componentId,
      publicDeps: [],
      internals: [],
      slotPlan: {},
    };
  }
  // ...
}
```

**Problema:**
- Si `contract = null`, retorna un grafo vacío
- Pero el sistema continúa y puede fallar más adelante al intentar usar dependencias

#### **4.3. Error específico reportado**

**Mensaje de error (según usuario):**
```
Error relacionado con "Progress" o "List"
```

**Causa probable:**
- CardContent tiene una barra de progreso (`progress`) que usa el componente `Progress`
- CardContent puede tener una lista de especificaciones que usa el componente `List`
- Cuando el sistema intenta resolver estas dependencias:
  1. Busca contrato para "Progress" → No encuentra → Error
  2. Busca contrato para "List" → No encuentra → Error
  3. O intenta implementar Progress/List como dependencias → Falla

**Estado:** ❌ **FALLÓ** - No se pudieron resolver dependencias

#### **4.4. Desajuste entre componentId del contrato y ID de Storybook** ❌ **CAUSA RAÍZ**

**Problema identificado:**

**En `CardContent.stories.ts` línea 26:**
```typescript
componentId: '🧩-ux-card-content', // ⚠️ ID interno del contrato
```

**Pero el ID real de Storybook es:**
```typescript
'layout-card-content' // ⚠️ ID usado en Storybook
```

**Flujo del error:**

1. `autorun.apply()` obtiene ID de Storybook: `layout-card-content`
2. `ContractStore.getById('layout-card-content')` busca contrato
3. `extractMetadataFromStory('layout-card-content')` obtiene código fuente
4. Parsea `parameters.ubits` y encuentra `componentId: '🧩-ux-card-content'`
5. **PROBLEMA:** El sistema busca con `layout-card-content` pero el contrato tiene `🧩-ux-card-content`
6. `ContractStore` cachea `null` porque no encuentra coincidencia exacta
7. `DependencyResolver` recibe `contract = null` → Retorna grafo vacío
8. El sistema intenta resolver dependencias que no existen → Error

**Evidencia:**
- ✅ El contrato SÍ existe en `CardContent.stories.ts`
- ✅ Tiene `dependsOn: { required: [], optional: [] }` (sin dependencias)
- ✅ Tiene `internals: []` (sin internos)
- ❌ Pero `ContractStore.getById('layout-card-content')` no lo encuentra porque busca con ID diferente

**Solución requerida:**
- ✅ Modificar `ContractStore.getById()` para buscar por ID de Storybook Y por componentId del contrato
- ✅ O normalizar los IDs para que coincidan

---

### **PASO 5: Extracción de Código desde Storybook** ❌ **FALLO CRÍTICO**

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` línea 1962-2117

**Código ejecutado:**
```typescript
// ✅ 5.0: Consultar Storybook MCP primero
mcpInfo = await callStorybookMCPTool('getComponentsProps', {
  componentNames: [componentName],
});

// ⚠️ ADVERTENCIA si no se consultó Storybook MCP
if (!mcpConsulted) {
  warnings.push(
    `Storybook MCP no se pudo consultar desde Node.js. El agente DEBE consultar Storybook MCP ANTES de llamar autorun.apply()...`
  );
}

// Intentar extraer HTML desde documentación
htmlFromDocs = await extractHTMLFromDocumentation(componentName);
```

**Problemas identificados:**

#### **5.1. Storybook MCP no disponible desde Node.js**

**Causa raíz:**
- `callStorybookMCPTool()` intenta llamar al MCP desde Node.js
- Pero los MCPs solo están disponibles desde el contexto del agente (Cursor)
- Desde Node.js, no se puede acceder directamente a los MCPs

**Evidencia:**
```typescript
} catch (mcpError: any) {
  console.warn(
    `   ⚠️ Storybook MCP no disponible desde Node.js: ${mcpError.message}`
  );
  console.warn(
    `   💡 SOLUCIÓN: El agente DEBE consultar Storybook MCP ANTES de llamar autorun.apply()`
  );
}
```

**Impacto:**
- ⚠️ El sistema emite advertencia pero continúa
- ⚠️ No tiene información completa de props del componente
- ⚠️ Debe usar extracción de código directa como fallback

#### **5.2. Extracción desde documentación falla**

**Causa raíz:**
- `extractHTMLFromDocumentation()` intenta leer desde `docs/referencia/componentes/`
- Si el archivo no existe o no tiene HTML de ejemplo, retorna `htmlFromDocs.found = false`
- El sistema no puede generar código sin el HTML de ejemplo

**Estado:** ❌ **FALLÓ** - No se pudo extraer código

---

### **PASO 6: Generación de Código con PrototypeTokenKit** ❌ **FALLO CRÍTICO**

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` línea 2118-2300

**Código ejecutado:**
```typescript
if (!componentExists) {
  // Intentar generar con PrototypeTokenKit
  const tokenKit = new PrototypeTokenKit(tokenRegistry);
  codeToInsert = await tokenKit.generateCardContent(cardData);
}
```

**Problema identificado:**

#### **6.1. PrototypeTokenKit no tiene generateCardContent()**

**Causa raíz:**
- `PrototypeTokenKit` tiene métodos para generar widgets específicos:
  - `generateKpiCard()`
  - `generateMetricCard()`
  - Pero NO tiene `generateCardContent()`
- El sistema intenta llamar a un método que no existe → Error

**Evidencia:**
- El error reportado menciona "Progress" o "List"
- Esto sugiere que el sistema intentó generar código para dependencias que no existen

**Estado:** ❌ **FALLÓ** - Método no existe

---

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

### **1. ContractStore no encuentra contratos para CardContent**

**Causa raíz:**
- `extractMetadataFromStory()` requiere que la story tenga `parameters.ubits` definido
- Si la story NO tiene este parámetro, retorna `null`
- Sin contrato, no se pueden resolver dependencias

**Solución requerida:**
- ✅ Verificar que `CardContent.stories.ts` tenga `parameters.ubits` definido
- ✅ O crear contrato manualmente en `ContractStore`

---

### **2. DependencyResolver intenta resolver dependencias inexistentes**

**Causa raíz:**
- CardContent tiene dependencias internas (Progress, List) que NO son componentes públicos
- El sistema intenta resolverlas como dependencias públicas → Error

**Solución requerida:**
- ✅ Marcar Progress y List como `internals` en el contrato
- ✅ O filtrar dependencias internas antes de resolver

---

### **3. Storybook MCP no disponible desde Node.js**

**Causa raíz:**
- `autorun.apply()` se ejecuta en Node.js
- Los MCPs solo están disponibles desde el contexto del agente
- No se puede llamar directamente desde Node.js

**Solución requerida:**
- ✅ El agente DEBE consultar Storybook MCP ANTES de llamar `autorun.apply()`
- ✅ O modificar `autorun.apply()` para aceptar información de MCP como parámetro

---

### **4. PrototypeTokenKit no tiene método para CardContent**

**Causa raíz:**
- `PrototypeTokenKit` solo tiene métodos para widgets específicos
- No tiene método genérico para generar cualquier componente
- CardContent no está soportado

**Solución requerida:**
- ✅ Agregar `generateCardContent()` a `PrototypeTokenKit`
- ✅ O usar extracción de código desde Storybook como método principal

---

### **5. Extracción de código desde documentación falla**

**Causa raíz:**
- `extractHTMLFromDocumentation()` requiere que exista `docs/referencia/componentes/cardcontent.md`
- Si no existe, no puede extraer HTML de ejemplo

**Solución requerida:**
- ✅ Crear documentación con HTML de ejemplo
- ✅ O usar extracción directa desde Storybook Vercel

---

## 📋 FLUJO CORRECTO QUE DEBERÍA SEGUIRSE

### **Flujo Ideal:**

1. ✅ **Agente consulta Storybook MCP ANTES de llamar autorun.apply()**
   ```typescript
   const mcpResult = await call_mcp_tool({
     server: 'storybook',
     toolName: 'getComponentsProps',
     arguments: { componentNames: ['CardContent'] }
   });
   ```

2. ✅ **Agente consulta Storybook en Vercel para ver estructura exacta**
   ```typescript
   await browser_navigate({ url: 'https://ubits-storybook10.vercel.app/?path=/story/layout-card-content--default' });
   await browser_snapshot();
   ```

3. ✅ **Agente llama autorun.apply() con información completa**
   ```typescript
   await autorun.apply({
     message: 'implementar card content debajo del subnav',
     targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
     mcpInfo: mcpResult, // ⭐ NUEVO: Pasar información de MCP
   });
   ```

4. ✅ **autorun.apply() usa información de MCP para generar código**
   - No necesita consultar MCP desde Node.js
   - Usa información ya obtenida por el agente

---

## 🔧 SOLUCIONES PROPUESTAS

### **Solución 1: Agregar soporte para pasar información de MCP**

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Cambio:**
```typescript
export interface AutorunApplyInput {
  message: string;
  targetFiles?: string[];
  options?: AutorunApplyOptions;
  mcpInfo?: any; // ⭐ NUEVO: Información de MCP obtenida por el agente
}
```

**Beneficio:**
- ✅ El agente puede consultar MCP antes y pasar la información
- ✅ autorun.apply() no necesita consultar MCP desde Node.js

---

### **Solución 2: Verificar y crear contratos para CardContent**

**Archivo:** `vendor/ubits/packages/storybook/stories/components/CardContent/CardContent.stories.ts`

**Cambio:**
```typescript
export default {
  // ...
  parameters: {
    ubits: {
      componentId: 'layout-card-content',
      dependsOn: {
        required: [], // ⚠️ CardContent no tiene dependencias públicas
        optional: [],
      },
      internals: ['progress', 'list'], // ⚠️ Progress y List son internos
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-border-1',
        // ... más tokens
      ],
    },
  },
} as Meta<CardData>;
```

**Beneficio:**
- ✅ ContractStore puede encontrar el contrato
- ✅ DependencyResolver puede resolver dependencias correctamente

---

### **Solución 3: Agregar generateCardContent() a PrototypeTokenKit**

**Archivo:** `packages/autorun-core/src/fallback/PrototypeTokenKit.ts`

**Cambio:**
```typescript
async generateCardContent(cardData: any): Promise<string> {
  // Generar HTML para CardContent usando tokens
  // ...
}
```

**Beneficio:**
- ✅ autorun.apply() puede generar código para CardContent
- ✅ No depende de extracción desde Storybook

---

### **Solución 4: Mejorar extracción desde Storybook**

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Cambio:**
- ✅ Usar Browser MCP para extraer código directamente desde Storybook Vercel
- ✅ No depender de documentación local

**Beneficio:**
- ✅ Siempre obtiene código actualizado desde Storybook
- ✅ No requiere documentación local

---

## 📊 TABLA DE ESTADO POR PASO

| Paso | Descripción | Estado | Error Específico |
|------|-------------|--------|-----------------|
| 1 | Detección de componente | ✅ | Ninguno |
| 2 | Obtención de ID de Storybook | ✅ | Ninguno |
| 3 | Carga de GlobalTokenRegistry | ⚠️ | Puede no tener tokens |
| 4 | Resolución de dependencias | ❌ | ContractStore retorna null |
| 5 | Extracción de código | ❌ | MCP no disponible desde Node.js |
| 6 | Generación de código | ❌ | PrototypeTokenKit no tiene método |

---

## 🎯 CONCLUSIÓN

**El fallo principal ocurrió en el PASO 4 (Resolución de Dependencias):**

1. ❌ `ContractStore.getById()` no encuentra contrato para CardContent
2. ❌ `DependencyResolver.resolveGraph()` retorna grafo vacío
3. ❌ El sistema intenta resolver dependencias (Progress, List) que no existen como contratos
4. ❌ Esto causa error que bloquea la implementación

**Solución inmediata:**
- ✅ Verificar que `CardContent.stories.ts` tenga `parameters.ubits` definido
- ✅ O crear contrato manualmente
- ✅ Marcar Progress y List como `internals` en el contrato

**Solución a largo plazo:**
- ✅ Modificar `autorun.apply()` para aceptar información de MCP como parámetro
- ✅ El agente debe consultar MCP ANTES de llamar `autorun.apply()`
- ✅ Agregar `generateCardContent()` a `PrototypeTokenKit`

---

---

## 🔧 SOLUCIÓN ESPECÍFICA PARA EL PROBLEMA

### **Problema Principal: Desajuste de IDs**

**Causa raíz identificada:**
- Contrato tiene `componentId: '🧩-ux-card-content'`
- ID de Storybook es `layout-card-content`
- `ContractStore.getById('layout-card-content')` no encuentra el contrato

**Solución inmediata:**

#### **Opción 1: Modificar ContractStore para buscar por ambos IDs**

**Archivo:** `packages/autorun-core/src/ubits/ContractStore.ts`

**Cambio:**
```typescript
async getById(componentId: string): Promise<UBITSContract | null> {
  // Verificar cache
  if (this.cache.has(componentId)) {
    return this.cache.get(componentId) || null;
  }

  // Intentar extraer desde story
  try {
    const metadata = await extractMetadataFromStory(componentId, 'default');
    
    if (metadata && metadata.componentId) {
      // ⭐ NUEVO: Cachear con AMBOS IDs (Storybook ID y componentId del contrato)
      const contract: UBITSContract = {
        componentId: metadata.componentId || componentId,
        dependsOn: metadata.dependsOn || { required: [], optional: [] },
        internals: metadata.internals || [],
        tokensUsed: metadata.tokensUsed || [],
        slots: metadata.slots || {},
      };

      // ⭐ NUEVO: Cachear con ID de Storybook Y con componentId del contrato
      this.cache.set(componentId, contract); // Cachear con ID de Storybook
      if (metadata.componentId !== componentId) {
        this.cache.set(metadata.componentId, contract); // Cachear con componentId del contrato
      }
      
      return contract;
    }
  } catch (error: any) {
    console.warn(`⚠️ Error obteniendo contrato para ${componentId}: ${error.message}`);
  }

  // Si no se encuentra, cachear null
  this.cache.set(componentId, null);
  return null;
}
```

**Beneficio:**
- ✅ Permite buscar con cualquiera de los dos IDs
- ✅ No requiere modificar las stories

---

#### **Opción 2: Normalizar componentId en el contrato**

**Archivo:** `vendor/ubits/packages/storybook/stories/components/CardContent/CardContent.stories.ts`

**Cambio:**
```typescript
ubits: createUBITSContract({
  componentId: 'layout-card-content', // ⚠️ CAMBIAR: Usar ID de Storybook en lugar de ID interno
  // ... resto del contrato
}),
```

**Beneficio:**
- ✅ Los IDs coinciden exactamente
- ✅ No requiere cambios en ContractStore

---

## 📊 RESUMEN DE CAUSAS Y SOLUCIONES

| Problema | Causa | Solución | Prioridad |
|----------|-------|----------|-----------|
| ContractStore no encuentra contrato | Desajuste de IDs (`layout-card-content` vs `🧩-ux-card-content`) | Modificar ContractStore para cachear con ambos IDs | 🔴 CRÍTICA |
| DependencyResolver retorna grafo vacío | `contract = null` | Arreglar ContractStore primero | 🔴 CRÍTICA |
| Storybook MCP no disponible desde Node.js | MCPs solo disponibles desde agente | Agente debe consultar MCP antes | 🟡 ALTA |
| PrototypeTokenKit no tiene método | No existe `generateCardContent()` | Agregar método o usar extracción | 🟡 ALTA |
| Extracción desde documentación falla | Archivo no existe o sin HTML | Crear documentación o usar Storybook | 🟢 MEDIA |

---

## 🎯 CONCLUSIÓN FINAL

**El fallo principal ocurrió en el PASO 4 (Resolución de Dependencias) debido a:**

1. ❌ **Desajuste de IDs:** `ContractStore.getById('layout-card-content')` no encuentra el contrato porque el contrato tiene `componentId: '🧩-ux-card-content'`
2. ❌ **ContractStore retorna null:** Sin contrato, no se pueden resolver dependencias
3. ❌ **DependencyResolver retorna grafo vacío:** El sistema intenta resolver dependencias que no existen
4. ❌ **Error bloquea implementación:** El error relacionado con "Progress" o "List" bloquea todo el flujo

**Solución inmediata recomendada:**
- ✅ **Modificar `ContractStore.getById()`** para cachear contratos con ambos IDs (Storybook ID y componentId del contrato)
- ✅ Esto permite buscar con cualquiera de los dos IDs sin modificar las stories

**Solución a largo plazo:**
- ✅ Normalizar todos los `componentId` en los contratos para que coincidan con los IDs de Storybook
- ✅ O crear un sistema de mapeo bidireccional entre IDs de Storybook y componentIds de contratos

---

**Última actualización:** 2025-01-29
