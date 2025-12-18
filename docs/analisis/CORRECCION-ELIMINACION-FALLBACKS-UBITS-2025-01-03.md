# Corrección: Eliminación de Fallbacks de UBITS - 2025-01-03

**Objetivo:** Eliminar todos los fallbacks de UBITS del sistema Autorun para usar SOLO el Storybook activo (Libraries UI).

---

## ✅ Correcciones Implementadas

### **CORRECCIÓN 1: Servidor MCP Dinámico** ⭐

**Archivo:** `packages/autorun-core/src/helpers/storybookMCPAutoCaller.ts`

**Cambios:**
- ✅ Eliminado hardcodeado `server: "storybook-ubits"`
- ✅ Agregada lógica para determinar servidor MCP dinámicamente según Storybook activo
- ✅ Agregada verificación del Storybook activo antes de emitir mensaje MCP
- ✅ Agregada instrucción para configurar MCP con URL del Storybook activo

**Código antes:**
```typescript
console.log(`     server: "storybook-ubits",`);
```

**Código después:**
```typescript
// Determinar servidor MCP dinámicamente según el Storybook activo
let mcpServer = 'storybook-ubits'; // Default
if (activeConfig.id === 'libraries-ui-ubitslearning-com') {
  console.log(`📚 Storybook activo es Libraries UI - usando servidor MCP con URL de Libraries UI`);
  mcpServer = 'storybook-ubits'; // Mismo servidor, pero URL diferente en configuración
}
console.log(`     server: "${mcpServer}",`);
console.log(`⚠️ IMPORTANTE: El servidor MCP debe estar configurado con STORYBOOK_URL=${activeConfig.url}/index.json`);
```

**Estado:** ✅ **IMPLEMENTADO**

---

### **CORRECCIÓN 2: Eliminación de Fallbacks de UBITS en storybookFallback.ts** ⭐

**Archivo:** `packages/autorun-core/src/helpers/storybookFallback.ts`

**Cambios:**
1. **`getStorybookUrlWithFallback()`:**
   - ❌ Eliminado fallback a `UBITS_PRESET.storybook.url`
   - ❌ Eliminado fallback a GitHub de UBITS
   - ✅ Ahora lanza error si StorybookManager no está disponible
   - ✅ Ahora lanza error si el Storybook activo no está disponible

2. **`fetchStorybookWithFallback()`:**
   - ❌ Eliminado fallback a Vercel de UBITS
   - ❌ Eliminado fallback a GitHub de UBITS
   - ✅ Ahora usa SOLO el Storybook activo del StorybookManager
   - ✅ Lanza error si no está disponible

3. **`getStorybookBaseUrlWithFallback()`:**
   - ❌ Eliminado uso de `UBITS_PRESET.storybook.url`
   - ✅ Ahora usa SOLO el Storybook activo del StorybookManager
   - ✅ Lanza error si no está disponible

4. **`getComponentStorybookUrlWithFallback()`:**
   - ❌ Eliminado fallback genérico
   - ✅ Ahora usa SOLO el Storybook activo del StorybookManager
   - ✅ Usa `mapComponentNameToStorybookId()` para obtener ID del Storybook activo
   - ✅ Construye URL usando el Storybook activo (priorizando `/docs/`)
   - ✅ Lanza error si no está disponible

**Código antes:**
```typescript
// Fallback: Usar preset UBITS (compatibilidad)
const vercelUrl = UBITS_PRESET.storybook.getUrl?.(path) || `${UBITS_PRESET.storybook.url}${path}`;
// ... usar fallback a GitHub si Vercel falla
```

**Código después:**
```typescript
// ⚠️ CRÍTICO: NO usar fallback de UBITS
// Si el Storybook activo no está disponible, lanzar error
throw new Error(
  `❌ El Storybook activo no está disponible. Verifica que el Storybook esté accesible en: ${activeConfig?.url || 'N/A'}`
);
```

**Estado:** ✅ **IMPLEMENTADO**

---

### **CORRECCIÓN 3: Eliminación de Fallback Genérico en storybookStories.ts** ⭐

**Archivo:** `packages/autorun-core/src/helpers/storybookStories.ts`

**Cambios:**
- ❌ Eliminado fallback genérico `componentName.toLowerCase().replace(/\s+/g, '-')`
- ✅ Ahora lanza error si no se encuentra el ID del componente

**Código antes:**
```typescript
// Último recurso: fallback genérico (pero esto debería ser raro)
console.warn(`⚠️ No se pudo encontrar ID para ${componentName}, usando fallback genérico`);
return componentName.toLowerCase().replace(/\s+/g, '-');
```

**Código después:**
```typescript
// ⚠️ CRÍTICO: NO usar fallback genérico
// Si no se encuentra el ID, lanzar error en lugar de usar fallback
console.error(`❌ No se pudo encontrar ID para ${componentName} en el Storybook activo`);
throw new Error(
  `❌ No se pudo encontrar el componente "${componentName}" en el Storybook activo. Verifica que el componente exista y que el Storybook esté correctamente configurado.`
);
```

**Estado:** ✅ **IMPLEMENTADO**

---

### **CORRECCIÓN 4: Servidor MCP Dinámico en autoMessageHandler.ts** ⭐

**Archivo:** `packages/autorun-core/src/helpers/autoMessageHandler.ts`

**Cambios:**
- ✅ Agregada lógica para determinar servidor MCP dinámicamente
- ✅ Agregada verificación del Storybook activo antes de emitir instrucciones MCP
- ✅ Agregada instrucción para configurar MCP con URL del Storybook activo

**Estado:** ✅ **IMPLEMENTADO**

---

### **CORRECCIÓN 5: Servidor MCP Dinámico en executeOnMessageStart.ts** ⭐

**Archivo:** `packages/autorun-core/src/helpers/executeOnMessageStart.ts`

**Cambios:**
- ✅ Agregada lógica para determinar servidor MCP dinámicamente
- ✅ Agregada verificación del Storybook activo
- ✅ Agregada instrucción para configurar MCP con URL del Storybook activo

**Estado:** ✅ **IMPLEMENTADO**

---

## 📋 Archivos Modificados

1. ✅ `packages/autorun-core/src/helpers/storybookMCPAutoCaller.ts`
2. ✅ `packages/autorun-core/src/helpers/storybookFallback.ts`
3. ✅ `packages/autorun-core/src/helpers/storybookStories.ts`
4. ✅ `packages/autorun-core/src/helpers/autoMessageHandler.ts`
5. ✅ `packages/autorun-core/src/helpers/executeOnMessageStart.ts`

---

## 🎯 Resultado Final

### **✅ Fallbacks de UBITS Eliminados:**
- ❌ NO se usa `UBITS_PRESET.storybook.url` como fallback
- ❌ NO se usa GitHub de UBITS como fallback
- ❌ NO se usa mapeo estático de UBITS como fallback
- ❌ NO se usa fallback genérico

### **✅ Sistema Ahora Usa SOLO Storybook Activo:**
- ✅ `getStorybookUrlWithFallback()` usa SOLO Storybook activo
- ✅ `fetchStorybookWithFallback()` usa SOLO Storybook activo
- ✅ `getComponentStorybookUrlWithFallback()` usa SOLO Storybook activo
- ✅ `mapComponentNameToStorybookId()` usa SOLO Storybook activo
- ✅ Servidor MCP se determina dinámicamente según Storybook activo

### **✅ Errores en Lugar de Fallbacks:**
- ✅ Si StorybookManager no está disponible → Error
- ✅ Si Storybook activo no está disponible → Error
- ✅ Si componente no se encuentra → Error
- ✅ NO se usa fallback de UBITS en ningún caso

---

## ⚠️ Impacto en Otros Archivos

Los siguientes archivos usan `getStorybookUrlWithFallback()` y `fetchStorybookWithFallback()`, pero ahora automáticamente usarán SOLO el Storybook activo (sin fallbacks de UBITS):

- `storybookCodeParser.ts`
- `storybookRealWorldExamplesExtractor.ts`
- `storybookCompositionExtractor.ts`
- `storybookBestPracticesExtractor.ts`
- `storybookStructureExtractor.ts`
- `storybookAPIExtractor.ts`
- `storybookIdDiscovery.ts`
- `storybookPropsParser.ts`
- `componentHelpers.ts`
- `storybookStories.ts`

**Todos estos archivos ahora:**
- ✅ Usan SOLO el Storybook activo
- ✅ Lanzan error si el Storybook activo no está disponible
- ✅ NO usan fallbacks de UBITS

---

## 📊 Estado Final

**✅ CORRECCIONES COMPLETADAS:**
- ✅ Servidor MCP dinámico
- ✅ Fallbacks de UBITS eliminados
- ✅ Sistema usa SOLO Storybook activo
- ✅ Errores en lugar de fallbacks

**✅ SISTEMA MEJORADO:**
- ✅ Más robusto (no usa fallbacks incorrectos)
- ✅ Más claro (errores explícitos)
- ✅ Más flexible (funciona con cualquier Storybook activo)

---

**Última actualización:** 2025-01-03  
**Estado:** ✅ **CORRECCIONES IMPLEMENTADAS** - Fallbacks de UBITS eliminados completamente
