# 🎯 Flujo Completo: Extracción e Implementación Perfecta

> **Fecha:** 2025-01-23  
> **Propósito:** Definir el flujo completo y óptimo para extraer código + props de la historia "implementation" e implementar componentes a la perfección  
> **Estado:** ✅ Propuesta Completa y Ejecutable

---

## 📋 Resumen Ejecutivo

Este documento define el **flujo completo y óptimo** para:
1. ✅ Extraer código exacto de la historia "implementation" en Storybook
2. ✅ Extraer props completas del componente
3. ✅ Combinar ambos para implementación perfecta
4. ✅ Validar y verificar antes de implementar
5. ✅ Implementar usando `autorun.apply()` con toda la información

---

## 🎯 Objetivo Final

**Implementar componentes UBITS con:**
- ✅ Código exacto de la historia "implementation"
- ✅ Props exactas del componente
- ✅ Estructura de datos correcta
- ✅ Validación pre-implementación
- ✅ Watermark de Autorun
- ✅ Post-procesamiento automático

---

## 🔍 Análisis de Opciones Disponibles

### **Opción 1: Browser MCP + Storybook MCP (RECOMENDADA)** ⭐

**Ventajas:**
- ✅ Extracción visual del código desde la pestaña "Code"
- ✅ Props estructuradas desde Storybook MCP
- ✅ Control total sobre el proceso
- ✅ Puede extraer código exacto incluso si está en iframe

**Desventajas:**
- ⚠️ Requiere navegación manual a Storybook
- ⚠️ Requiere hacer clic en pestaña "Code"
- ⚠️ Puede fallar si el código está oculto

**Cuándo usar:**
- ✅ Cuando necesitas código exacto de la pestaña "Code"
- ✅ Cuando la historia "implementation" existe
- ✅ Cuando necesitas ver el código renderizado

### **Opción 2: Firecrawl (ALTERNATIVA)**

**Ventajas:**
- ✅ Extracción automática sin navegación manual
- ✅ Puede extraer contenido de páginas complejas
- ✅ Formato markdown estructurado

**Desventajas:**
- ⚠️ Puede no extraer código de la pestaña "Code" si requiere interacción
- ⚠️ Puede extraer contenido renderizado en lugar del código fuente
- ⚠️ Puede requerir configuración adicional

**Cuándo usar:**
- ✅ Cuando Browser MCP falla
- ✅ Cuando necesitas contenido renderizado
- ✅ Como fallback cuando la pestaña "Code" no está disponible

### **Opción 3: Storybook MCP + Fetch Directo (HÍBRIDA)**

**Ventajas:**
- ✅ Props estructuradas desde Storybook MCP
- ✅ Código desde fetch directo al HTML
- ✅ No requiere navegación manual

**Desventajas:**
- ⚠️ Fetch puede no obtener código de la pestaña "Code" si requiere JavaScript
- ⚠️ Puede requerir parsing complejo del HTML

**Cuándo usar:**
- ✅ Cuando Browser MCP no está disponible
- ✅ Cuando necesitas automatización completa
- ✅ Como fallback cuando otras opciones fallan

---

## 🚀 Flujo Completo Propuesto (RECOMENDADO)

### **FASE 1: Preparación y Detección**

```typescript
// 1.1 Detectar componente del mensaje del usuario
import { handleUserMessage } from '@autorun/core/helpers/autoMessageHandler';

const result = await handleUserMessage(userMessage);

if (result.blocked) {
  throw new Error(`❌ Implementación bloqueada: ${result.reason}`);
}

// 1.2 Obtener ID de Storybook validado
import { mapAndValidateComponentNameToStorybookId } from '@autorun/core/helpers/storybookStories';

const componentId = await mapAndValidateComponentNameToStorybookId(
  result.componentName || 'unknown'
);

console.log(`✅ Componente detectado: ${result.componentName} (${componentId})`);
```

### **FASE 2: Buscar Historia "Implementation"**

```typescript
// 2.1 Listar todas las historias disponibles
import { getAvailableStories } from '@autorun/core/helpers/storybookStories';

const stories = await getAvailableStories(componentId);

// 2.2 Buscar historia "implementation" específicamente
const implementationStory = stories.find(s => 
  s.name === 'implementation' ||
  s.name === 'implementation-copy-paste' ||
  s.name.toLowerCase().includes('implementation') &&
  s.name.toLowerCase().includes('copy')
);

if (!implementationStory) {
  console.warn(`⚠️ Historia "implementation" no encontrada, usando "default"`);
  // Usar historia "default" como fallback
  storyName = 'default';
} else {
  storyName = implementationStory.name;
  console.log(`✅ Historia "implementation" encontrada: ${storyName}`);
}
```

### **FASE 3: Extracción Paralela (Código + Props)**

```typescript
// 3.1 Extraer código Y props en paralelo (MÁXIMA EFICIENCIA)
const [codeResult, propsResult] = await Promise.all([
  // Extraer código exacto desde Browser MCP
  extractCodeFromImplementationStory(componentId, storyName),
  // Obtener props desde Storybook MCP
  getPropsFromStorybookMCP(componentId)
]);

console.log(`✅ Código extraído: ${codeResult.code.length} caracteres`);
console.log(`✅ Props obtenidas: ${Object.keys(propsResult.props).length} props`);
```

### **FASE 4: Combinar y Validar**

```typescript
// 4.1 Combinar código con props
const combinedCode = combineCodeWithProps(
  codeResult.code,
  propsResult.props,
  customProps // Props específicas del caso de uso
);

// 4.2 Validar estructura
const validation = await validateCodeStructure(
  combinedCode,
  componentId,
  propsResult.props
);

if (!validation.valid) {
  throw new Error(`❌ Validación falló: ${validation.errors.join(', ')}`);
}

console.log(`✅ Código validado correctamente`);
```

### **FASE 5: Implementar con autorun.apply()**

```typescript
// 5.1 Usar autorun.apply() con toda la información
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: userMessage,
    targetFiles: [filePath],
    options: {
      exactCode: combinedCode,
      props: propsResult.props,
      validation: validation,
      useImplementationStory: true,
      implementationStoryName: storyName
    }
  }
});
```

---

## 🔧 Funciones de Extracción Propuestas

### **Función 1: Extraer Código desde Browser MCP**

```typescript
/**
 * Extrae código exacto de la historia "implementation" usando Browser MCP
 * 
 * ⚠️ CRÍTICO: Esta función requiere que el agente ejecute Browser MCP
 */
async function extractCodeFromImplementationStory(
  componentId: string,
  storyName: string
): Promise<{
  code: string;
  html?: string;
  js?: string;
  structure?: ComponentStructure;
}> {
  console.log(`🔍 [Code Extractor] Extrayendo código de: ${componentId}--${storyName}`);
  
  // 1. Construir URL
  const storybookUrl = 'https://ubits-storybook10.vercel.app';
  const storyUrl = `${storybookUrl}/?path=/story/${componentId}--${storyName}`;
  
  // 2. ⚠️ CRÍTICO: El agente DEBE navegar y hacer clic en pestaña "Code"
  console.log(`📋 [Code Extractor] Instrucciones para el agente:`);
  console.log(`   1. Navegar a: ${storyUrl}`);
  console.log(`   2. Hacer clic en pestaña "Code"`);
  console.log(`   3. Esperar a que se cargue el código`);
  console.log(`   4. Tomar snapshot`);
  console.log(`   5. Extraer código del snapshot`);
  
  // 3. El agente ejecuta estos pasos usando Browser MCP
  // Por ahora, retornamos estructura esperada
  // TODO: Implementar extracción real desde snapshot
  
  return {
    code: '', // Se llenará con código extraído del snapshot
    html: '',
    js: '',
    structure: undefined
  };
}
```

### **Función 2: Obtener Props desde Storybook MCP**

```typescript
/**
 * Obtiene props completas del componente desde Storybook MCP
 */
async function getPropsFromStorybookMCP(
  componentId: string
): Promise<{
  props: Record<string, any>;
  structure: PropsStructure;
  defaults: Record<string, any>;
}> {
  console.log(`📚 [Props Extractor] Obteniendo props de: ${componentId}`);
  
  // 1. Consultar Storybook MCP
  // ⚠️ CRÍTICO: El agente DEBE ejecutar esto ANTES de llamar esta función
  console.log(`📋 [Props Extractor] Instrucciones para el agente:`);
  console.log(`   Ejecutar:`);
  console.log(`   call_mcp_tool({`);
  console.log(`     server: "storybook",`);
  console.log(`     toolName: "mcp_storybook_getComponentsProps",`);
  console.log(`     arguments: { componentNames: ["${componentId}"] }`);
  console.log(`   })`);
  
  // 2. El agente ejecuta esto y pasa el resultado
  // Por ahora, retornamos estructura esperada
  // TODO: Implementar parsing real del resultado del MCP
  
  return {
    props: {}, // Se llenará con props del MCP
    structure: {
      required: [],
      optional: [],
      types: {}
    },
    defaults: {}
  };
}
```

### **Función 3: Combinar Código con Props**

```typescript
/**
 * Combina código extraído con props para crear implementación perfecta
 */
function combineCodeWithProps(
  code: string,
  props: Record<string, any>,
  customProps?: Record<string, any>
): string {
  console.log(`🔧 [Code Combiner] Combinando código con props...`);
  
  // 1. Parsear código para encontrar configuración
  const configMatch = code.match(/createDataTable\(({[\s\S]*?})\)/);
  
  if (!configMatch) {
    console.warn(`⚠️ No se encontró configuración en el código, retornando código original`);
    return code;
  }
  
  // 2. Extraer configuración existente
  const existingConfig = JSON.parse(configMatch[1]);
  
  // 3. Combinar con props del MCP
  const combinedConfig = {
    ...existingConfig,
    ...props, // Props del MCP tienen prioridad
    ...customProps // Props personalizadas tienen máxima prioridad
  };
  
  // 4. Reemplazar configuración en el código
  const combinedCode = code.replace(
    configMatch[0],
    `createDataTable(${JSON.stringify(combinedConfig, null, 2)})`
  );
  
  console.log(`✅ Código combinado: ${combinedCode.length} caracteres`);
  
  return combinedCode;
}
```

### **Función 4: Validar Estructura**

```typescript
/**
 * Valida que el código combinado tenga la estructura correcta
 */
async function validateCodeStructure(
  code: string,
  componentId: string,
  props: Record<string, any>
): Promise<{
  valid: boolean;
  errors: string[];
  warnings: string[];
}> {
  console.log(`✅ [Validator] Validando estructura del código...`);
  
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // 1. Validar que el código contiene la función de creación
  if (!code.includes('createDataTable') && !code.includes('DataTable.create')) {
    errors.push('Código no contiene función de creación de DataTable');
  }
  
  // 2. Validar que tiene configuración
  const configMatch = code.match(/createDataTable\(({[\s\S]*?})\)/);
  if (!configMatch) {
    errors.push('Código no contiene configuración válida');
  }
  
  // 3. Validar props requeridas
  const requiredProps = ['containerId', 'columns', 'rows'];
  if (configMatch) {
    const config = JSON.parse(configMatch[1]);
    requiredProps.forEach(prop => {
      if (!config[prop]) {
        errors.push(`Prop requerida faltante: ${prop}`);
      }
    });
  }
  
  // 4. Validar estructura de columnas
  if (configMatch) {
    const config = JSON.parse(configMatch[1]);
    if (config.columns && !Array.isArray(config.columns)) {
      errors.push('Columns debe ser un array');
    }
    if (config.rows && !Array.isArray(config.rows)) {
      errors.push('Rows debe ser un array');
    }
  }
  
  const valid = errors.length === 0;
  
  console.log(`✅ Validación ${valid ? 'exitosa' : 'fallida'}`);
  if (errors.length > 0) {
    console.error(`❌ Errores: ${errors.join(', ')}`);
  }
  if (warnings.length > 0) {
    console.warn(`⚠️ Advertencias: ${warnings.join(', ')}`);
  }
  
  return {
    valid,
    errors,
    warnings
  };
}
```

---

## 📋 Flujo Completo Integrado (Código Ejecutable)

```typescript
/**
 * Flujo completo para implementar componente perfectamente
 * 
 * Este es el flujo que DEBE seguirse siempre
 */
export async function implementComponentPerfectly(
  userMessage: string,
  targetFile: string
): Promise<{
  success: boolean;
  code: string;
  errors: string[];
}> {
  console.log(`🚀 [Perfect Implementation] Iniciando implementación perfecta...`);
  
  const errors: string[] = [];
  
  try {
    // ========================================
    // FASE 1: Preparación y Detección
    // ========================================
    console.log(`📋 [FASE 1] Preparación y detección...`);
    
    const result = await handleUserMessage(userMessage);
    if (result.blocked) {
      throw new Error(`Implementación bloqueada: ${result.reason}`);
    }
    
    const componentId = await mapAndValidateComponentNameToStorybookId(
      result.componentName || 'unknown'
    );
    
    console.log(`✅ Componente detectado: ${result.componentName} (${componentId})`);
    
    // ========================================
    // FASE 2: Buscar Historia "Implementation"
    // ========================================
    console.log(`📋 [FASE 2] Buscando historia "implementation"...`);
    
    const stories = await getAvailableStories(componentId);
    const implementationStory = stories.find(s => 
      s.name === 'implementation' ||
      s.name === 'implementation-copy-paste' ||
      (s.name.toLowerCase().includes('implementation') &&
       s.name.toLowerCase().includes('copy'))
    );
    
    const storyName = implementationStory?.name || 'default';
    console.log(`✅ Historia seleccionada: ${storyName}`);
    
    // ========================================
    // FASE 3: Extracción Paralela
    // ========================================
    console.log(`📋 [FASE 3] Extrayendo código y props en paralelo...`);
    
    // ⚠️ CRÍTICO: El agente DEBE ejecutar Browser MCP y Storybook MCP aquí
    const [codeResult, propsResult] = await Promise.all([
      extractCodeFromImplementationStory(componentId, storyName),
      getPropsFromStorybookMCP(componentId)
    ]);
    
    if (!codeResult.code) {
      throw new Error('No se pudo extraer código de la historia "implementation"');
    }
    
    if (!propsResult.props || Object.keys(propsResult.props).length === 0) {
      throw new Error('No se pudieron obtener props del componente');
    }
    
    console.log(`✅ Código extraído: ${codeResult.code.length} caracteres`);
    console.log(`✅ Props obtenidas: ${Object.keys(propsResult.props).length} props`);
    
    // ========================================
    // FASE 4: Combinar y Validar
    // ========================================
    console.log(`📋 [FASE 4] Combinando código con props y validando...`);
    
    const combinedCode = combineCodeWithProps(
      codeResult.code,
      propsResult.props,
      {} // Props personalizadas del caso de uso
    );
    
    const validation = await validateCodeStructure(
      combinedCode,
      componentId,
      propsResult.props
    );
    
    if (!validation.valid) {
      throw new Error(`Validación falló: ${validation.errors.join(', ')}`);
    }
    
    console.log(`✅ Código validado correctamente`);
    
    // ========================================
    // FASE 5: Implementar con autorun.apply()
    // ========================================
    console.log(`📋 [FASE 5] Implementando con autorun.apply()...`);
    
    // ⚠️ CRÍTICO: El agente DEBE ejecutar esto usando MCP
    console.log(`📋 [FASE 5] Instrucciones para el agente:`);
    console.log(`   Ejecutar:`);
    console.log(`   call_mcp_tool({`);
    console.log(`     server: "autorun",`);
    console.log(`     toolName: "autorun.apply",`);
    console.log(`     arguments: {`);
    console.log(`       message: "${userMessage}",`);
    console.log(`       targetFiles: ["${targetFile}"],`);
    console.log(`       options: {`);
    console.log(`         exactCode: "${combinedCode.substring(0, 100)}...",`);
    console.log(`         props: ${JSON.stringify(propsResult.props)},`);
    console.log(`         validation: ${JSON.stringify(validation)},`);
    console.log(`         useImplementationStory: true,`);
    console.log(`         implementationStoryName: "${storyName}"`);
    console.log(`       }`);
    console.log(`     }`);
    console.log(`   })`);
    
    // Por ahora, retornamos el código combinado
    // El agente ejecutará autorun.apply() con esta información
    
    return {
      success: true,
      code: combinedCode,
      errors: []
    };
    
  } catch (error: any) {
    console.error(`❌ [Perfect Implementation] Error: ${error.message}`);
    errors.push(error.message);
    
    return {
      success: false,
      code: '',
      errors
    };
  }
}
```

---

## 🎯 Flujo Simplificado para el Agente

### **Paso a Paso Ejecutable:**

```typescript
// ========================================
// PASO 1: Detectar componente
// ========================================
const result = await handleUserMessage(userMessage);
const componentId = await mapAndValidateComponentNameToStorybookId(result.componentName);

// ========================================
// PASO 2: Buscar historia "implementation"
// ========================================
const stories = await getAvailableStories(componentId);
const implementationStory = stories.find(s => 
  s.name === 'implementation' || 
  s.name.includes('implementation')
);
const storyName = implementationStory?.name || 'default';

// ========================================
// PASO 3: Extraer código desde Browser MCP
// ========================================
// ⚠️ El agente DEBE ejecutar:
await mcp_cursor-ide-browser_browser_navigate({
  url: `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${storyName}`
});

await mcp_cursor-ide-browser_browser_wait_for({ time: 2 });

// Buscar y hacer clic en pestaña "Code"
const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
// Buscar elemento de pestaña "Code" en snapshot
// Hacer clic en la pestaña "Code"
await mcp_cursor-ide-browser_browser_click({
  element: 'Code tab button',
  ref: 'ref-code-tab' // Obtener del snapshot
});

await mcp_cursor-ide-browser_browser_wait_for({ time: 2 });

// Extraer código del snapshot
const codeSnapshot = await mcp_cursor-ide-browser_browser_snapshot();
const code = extractCodeFromSnapshot(codeSnapshot);

// ========================================
// PASO 4: Obtener props desde Storybook MCP
// ========================================
// ⚠️ El agente DEBE ejecutar:
const propsResult = await call_mcp_tool({
  server: 'storybook',
  toolName: 'mcp_storybook_getComponentsProps',
  arguments: { componentNames: [componentId] }
});

// ========================================
// PASO 5: Combinar y validar
// ========================================
const combinedCode = combineCodeWithProps(code, propsResult.props, customProps);
const validation = await validateCodeStructure(combinedCode, componentId, propsResult.props);

// ========================================
// PASO 6: Implementar con autorun.apply()
// ========================================
// ⚠️ El agente DEBE ejecutar:
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: userMessage,
    targetFiles: [targetFile],
    options: {
      exactCode: combinedCode,
      props: propsResult.props,
      validation: validation,
      useImplementationStory: true,
      implementationStoryName: storyName
    }
  }
});
```

---

## ✅ Checklist de Implementación Perfecta

### **Antes de Implementar:**
- [ ] ✅ Componente detectado correctamente
- [ ] ✅ ID de Storybook validado
- [ ] ✅ Historia "implementation" encontrada (o "default" como fallback)
- [ ] ✅ Código extraído de la pestaña "Code"
- [ ] ✅ Props obtenidas desde Storybook MCP
- [ ] ✅ Código combinado con props
- [ ] ✅ Estructura validada

### **Durante la Implementación:**
- [ ] ✅ `autorun.apply()` ejecutado con código exacto
- [ ] ✅ Watermark de Autorun agregado
- [ ] ✅ Validación pre-implementación pasada

### **Después de Implementar:**
- [ ] ✅ Prettier ejecutado
- [ ] ✅ ESLint ejecutado
- [ ] ✅ Auto-reload ejecutado
- [ ] ✅ Verificación post-implementación pasada
- [ ] ✅ Código funciona correctamente

---

## 🚨 Errores Comunes a Evitar

### **Error #1: NO extraer código de la pestaña "Code"**

**❌ INCORRECTO:**
```typescript
// Asumir código basándose en la vista previa
const code = generateCodeFromPreview();
```

**✅ CORRECTO:**
```typescript
// Extraer código exacto de la pestaña "Code"
await mcp_cursor-ide-browser_browser_click({ element: 'Code tab', ref: 'ref-code-tab' });
const code = extractCodeFromSnapshot(snapshot);
```

### **Error #2: NO obtener props desde Storybook MCP**

**❌ INCORRECTO:**
```typescript
// Asumir props basándose en documentación
const props = { containerId: 'container', columns: [], rows: [] };
```

**✅ CORRECTO:**
```typescript
// Obtener props exactas desde Storybook MCP
const propsResult = await call_mcp_tool({
  server: 'storybook',
  toolName: 'mcp_storybook_getComponentsProps',
  arguments: { componentNames: [componentId] }
});
```

### **Error #3: NO usar historia "implementation"**

**❌ INCORRECTO:**
```typescript
// Usar siempre historia "default"
const code = await extractCode('data-data-table', 'default');
```

**✅ CORRECTO:**
```typescript
// Buscar primero historia "implementation"
const stories = await getAvailableStories(componentId);
const implementationStory = stories.find(s => s.name === 'implementation');
const storyName = implementationStory?.name || 'default';
const code = await extractCode(componentId, storyName);
```

---

## 📚 Referencias

- **Análisis de Historia Implementation:** `docs/analisis/ANALISIS-HISTORIA-IMPLEMENTATION-STORYBOOK-DATATABLE-2025-01-23.md`
- **Guía de Extracción:** `docs/guias/implementacion/GUIA-EXTRAER-CODIGO-IMPLEMENTATION-STORY.md`
- **Uso de MCPs:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`
- **Análisis Profundo:** `docs/analisis/ANALISIS-PROFUNDO-IMPLEMENTACION-DATATABLE-ENCUESTAS-2025-01-23.md`

---

**Última actualización:** 2025-01-23  
**Versión:** 1.0.0  
**Estado:** ✅ Propuesta Completa y Ejecutable

