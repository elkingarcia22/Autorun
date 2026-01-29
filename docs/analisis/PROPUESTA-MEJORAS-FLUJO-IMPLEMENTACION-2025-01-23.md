# 🚀 Propuesta de Mejoras: Flujo de Implementación Perfecta

> **Fecha:** 2025-01-23  
> **Propósito:** Proponer mejoras concretas al flujo actual de `autorun.apply()` para implementar componentes perfectamente  
> **Estado:** ✅ Propuesta Completa con Código Ejecutable

---

## 📋 Resumen Ejecutivo

**Problema Actual:**
- `autorun.apply()` usa historia "default" hardcodeada
- No busca automáticamente historia "implementation"
- No combina código con props de Storybook MCP
- No valida estructura antes de implementar

**Solución Propuesta:**
- ✅ Buscar automáticamente historia "implementation"
- ✅ Extraer código Y props en paralelo
- ✅ Combinar código con props antes de implementar
- ✅ Validar estructura completa antes de escribir

---

## 🔍 Análisis del Código Actual

### **Código Actual en `autorun.apply()`:**

```typescript
// Línea 339-342: Usa 'default' hardcodeado
exactCode = await extractExactCodeFromStorybookWithBrowser(
  componentId,
  'default' // ⚠️ PROBLEMA: Hardcodeado
);
```

### **Problemas Identificados:**

1. **❌ No busca historia "implementation"**
   - Siempre usa "default"
   - No aprovecha la historia específica para implementación

2. **❌ No combina código con props**
   - Extrae código pero no lo combina con props del MCP
   - Puede tener estructura incorrecta

3. **❌ No valida estructura completa**
   - Solo valida básicamente
   - No valida contra props del componente

---

## ✅ Mejoras Propuestas

### **Mejora #1: Buscar Historia "Implementation" Automáticamente**

```typescript
// ANTES (Línea 339-342):
exactCode = await extractExactCodeFromStorybookWithBrowser(
  componentId,
  'default' // Hardcodeado
);

// DESPUÉS (Mejora):
// 1. Buscar historia "implementation" primero
import { getAvailableStories } from '../../helpers/storybookStories.js';

const stories = await getAvailableStories(componentId);
const implementationStory = stories.find(s => 
  s.name === 'implementation' ||
  s.name === 'implementation-copy-paste' ||
  (s.name.toLowerCase().includes('implementation') &&
   s.name.toLowerCase().includes('copy'))
);

const storyName = implementationStory?.name || 'default';
console.log(`   📚 Usando historia: ${storyName}`);

// 2. Extraer código de la historia encontrada
exactCode = await extractExactCodeFromStorybookWithBrowser(
  componentId,
  storyName // Usar historia encontrada
);
```

### **Mejora #2: Extraer Código Y Props en Paralelo**

```typescript
// ANTES: Solo extrae código
exactCode = await extractExactCodeFromStorybookWithBrowser(componentId, storyName);

// DESPUÉS: Extrae código Y props en paralelo
const [exactCode, propsResult] = await Promise.all([
  extractExactCodeFromStorybookWithBrowser(componentId, storyName),
  // ⚠️ CRÍTICO: El agente DEBE ejecutar Storybook MCP ANTES
  // Por ahora, esperamos que el agente lo haga
  Promise.resolve({ props: input.options?.props || {} })
]);

console.log(`   ✅ Código extraído: ${exactCode.html.length} caracteres`);
console.log(`   ✅ Props obtenidas: ${Object.keys(propsResult.props).length} props`);
```

### **Mejora #3: Combinar Código con Props**

```typescript
// NUEVO: Función para combinar código con props
function combineCodeWithProps(
  code: string,
  props: Record<string, any>,
  customProps?: Record<string, any>
): string {
  // 1. Parsear código para encontrar configuración
  const configMatch = code.match(/createDataTable\(({[\s\S]*?})\)/);
  
  if (!configMatch) {
    return code; // Retornar código original si no se encuentra configuración
  }
  
  // 2. Extraer configuración existente
  let existingConfig;
  try {
    existingConfig = JSON.parse(configMatch[1]);
  } catch (e) {
    // Si no es JSON válido, intentar evaluar como JavaScript
    existingConfig = eval(`(${configMatch[1]})`);
  }
  
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
  
  return combinedCode;
}

// Usar en autorun.apply():
const combinedCode = combineCodeWithProps(
  exactCode.html,
  propsResult.props,
  input.options?.customProps
);
```

### **Mejora #4: Validar Estructura Completa**

```typescript
// NUEVO: Función para validar estructura completa
async function validateCompleteStructure(
  code: string,
  componentId: string,
  props: Record<string, any>
): Promise<{
  valid: boolean;
  errors: string[];
  warnings: string[];
}> {
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
    return { valid: false, errors, warnings };
  }
  
  // 3. Validar props requeridas
  const requiredProps = ['containerId', 'columns', 'rows'];
  let config;
  try {
    config = JSON.parse(configMatch[1]);
  } catch (e) {
    try {
      config = eval(`(${configMatch[1]})`);
    } catch (e2) {
      errors.push('No se pudo parsear configuración');
      return { valid: false, errors, warnings };
    }
  }
  
  requiredProps.forEach(prop => {
    if (!config[prop]) {
      errors.push(`Prop requerida faltante: ${prop}`);
    }
  });
  
  // 4. Validar estructura de columnas
  if (config.columns && !Array.isArray(config.columns)) {
    errors.push('Columns debe ser un array');
  }
  if (config.rows && !Array.isArray(config.rows)) {
    errors.push('Rows debe ser un array');
  }
  
  // 5. Validar contra props del componente
  if (props && Object.keys(props).length > 0) {
    // Verificar que las props usadas sean válidas
    const validProps = Object.keys(props);
    const usedProps = Object.keys(config);
    const invalidProps = usedProps.filter(p => !validProps.includes(p) && !requiredProps.includes(p));
    
    if (invalidProps.length > 0) {
      warnings.push(`Props no reconocidas: ${invalidProps.join(', ')}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Usar en autorun.apply():
const validation = await validateCompleteStructure(
  combinedCode,
  componentId,
  propsResult.props
);

if (!validation.valid) {
  const errorMsg = `Validación falló: ${validation.errors.join(', ')}`;
  console.error(`   ❌ ${errorMsg}`);
  errors.push(...validation.errors);
  return {
    success: false,
    filesWritten: [],
    verification: {
      preImplementation: false,
      postImplementation: false,
      errors,
      warnings: [...warnings, ...validation.warnings],
    },
    components: [],
    errors,
  };
}
```

---

## 🔧 Código Completo Mejorado

```typescript
// ========================================
// MEJORA COMPLETA: autorun.apply() mejorado
// ========================================

// En autorunApply.ts, reemplazar sección 2.2:

// 2.2 Buscar historia "implementation" y extraer código + props
console.log(`   [2.2] Buscando historia "implementation" y extrayendo código + props...`);

// 2.2.1 Buscar historia "implementation"
let storyName = 'default';
try {
  const stories = await getAvailableStories(componentId);
  const implementationStory = stories.find(s => 
    s.name === 'implementation' ||
    s.name === 'implementation-copy-paste' ||
    (s.name.toLowerCase().includes('implementation') &&
     s.name.toLowerCase().includes('copy'))
  );
  
  if (implementationStory) {
    storyName = implementationStory.name;
    console.log(`   ✅ Historia "implementation" encontrada: ${storyName}`);
  } else {
    console.log(`   ⚠️ Historia "implementation" no encontrada, usando "default"`);
  }
} catch (error: any) {
  console.warn(`   ⚠️ Error buscando historias: ${error.message}, usando "default"`);
}

// 2.2.2 Extraer código Y props en paralelo
let exactCode;
let propsResult = { props: {} };

try {
  // Extraer código
  exactCode = await extractExactCodeFromStorybookWithBrowser(
    componentId,
    storyName
  );
  
  if (!exactCode || !exactCode.html) {
    throw new Error('No se pudo extraer código desde Storybook');
  }
  
  console.log(`   ✅ Código extraído: ${exactCode.html.length} caracteres`);
  
  // Obtener props (si están disponibles en input.options)
  if (input.options?.props) {
    propsResult.props = input.options.props;
    console.log(`   ✅ Props obtenidas: ${Object.keys(propsResult.props).length} props`);
  } else {
    console.warn(`   ⚠️ Props no disponibles en input.options, usando código sin combinar`);
  }
  
} catch (error: any) {
  const errorMsg = `Error extrayendo código desde Storybook: ${error.message}`;
  console.error(`   ❌ ${errorMsg}`);
  errors.push(errorMsg);
  return {
    success: false,
    filesWritten: [],
    verification: {
      preImplementation: false,
      postImplementation: false,
      errors,
      warnings,
    },
    components: [],
    errors,
  };
}

// 2.2.3 Combinar código con props
let combinedCode = exactCode.html;
if (propsResult.props && Object.keys(propsResult.props).length > 0) {
  try {
    combinedCode = combineCodeWithProps(
      exactCode.html,
      propsResult.props,
      input.options?.customProps
    );
    console.log(`   ✅ Código combinado con props: ${combinedCode.length} caracteres`);
  } catch (error: any) {
    console.warn(`   ⚠️ Error combinando código con props: ${error.message}, usando código original`);
    combinedCode = exactCode.html;
  }
}

// 2.2.4 Validar estructura completa
if (!input.options?.skipVerification) {
  const validation = await validateCompleteStructure(
    combinedCode,
    componentId,
    propsResult.props
  );
  
  if (!validation.valid) {
    const errorMsg = `Validación falló: ${validation.errors.join(', ')}`;
    console.error(`   ❌ ${errorMsg}`);
    errors.push(...validation.errors);
    warnings.push(...validation.warnings);
    return {
      success: false,
      filesWritten: [],
      verification: {
        preImplementation: false,
        postImplementation: false,
        errors,
        warnings,
      },
      components: [],
      errors,
    };
  }
  
  console.log(`   ✅ Validación completa exitosa`);
  if (validation.warnings.length > 0) {
    warnings.push(...validation.warnings);
  }
}

// 2.2.5 Usar código combinado en lugar de código original
exactCode.html = combinedCode;
```

---

## 📋 Checklist de Implementación

### **Para Implementar las Mejoras:**

- [ ] ✅ Agregar función `getAvailableStories()` si no existe
- [ ] ✅ Agregar función `combineCodeWithProps()`
- [ ] ✅ Agregar función `validateCompleteStructure()`
- [ ] ✅ Modificar `autorun.apply()` para buscar historia "implementation"
- [ ] ✅ Modificar `autorun.apply()` para combinar código con props
- [ ] ✅ Modificar `autorun.apply()` para validar estructura completa
- [ ] ✅ Actualizar documentación
- [ ] ✅ Probar con DataTable
- [ ] ✅ Probar con otros componentes

---

## 🎯 Flujo Final Mejorado

```
1. handleUserMessage() → Detección automática
2. Buscar historia "implementation" → Automático
3. Extraer código desde Browser MCP → Pestaña "Code"
4. Obtener props desde Storybook MCP → Paralelo
5. Combinar código con props → Automático
6. Validar estructura completa → Automático
7. autorun.apply() con código combinado → Implementación perfecta
8. Post-procesamiento → Prettier, ESLint, Auto-Reload
```

---

## 📚 Referencias

- **Flujo Completo:** `docs/guias/implementacion/FLUJO-COMPLETO-EXTRACCION-IMPLEMENTACION-PERFECTA.md`
- **Análisis de Historia:** `docs/analisis/ANALISIS-HISTORIA-IMPLEMENTATION-STORYBOOK-DATATABLE-2025-01-23.md`
- **Código Actual:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

---

**Última actualización:** 2025-01-23  
**Versión:** 1.0.0  
**Estado:** ✅ Propuesta Completa con Código Ejecutable

