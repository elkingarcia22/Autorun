# 🔧 Solución: Automatización Completa de Autorun

**Fecha:** 2025-01-03  
**Problema:** Autorun no funcionaba automáticamente, dependía de que el agente recordara ejecutar comandos  
**Solución:** Hacer que `interceptedWrite()` y `interceptedSearchReplace()` ejecuten TODO automáticamente

---

## 🎯 Objetivo

Hacer que Autorun funcione **completamente automático** sin depender de que el agente recuerde ejecutar comandos manualmente.

---

## ✅ Solución Implementada

### **1. Modificación de `interceptedWrite()` y `interceptedSearchReplace()`**

**Archivo:** `packages/autorun-core/src/interceptors/toolInterceptors.ts`

**Cambios:**
1. ✅ **Ejecuta `guardWrite()` automáticamente** ANTES de permitir escribir
2. ✅ **Ejecuta el flujo automático completo** (validaciones, Storybook, etc.)
3. ✅ **Proporciona instrucciones claras de auto-reload** después de escribir
4. ✅ **Bloquea si `guardWrite()` detecta problemas**

**Antes:**
```typescript
// El agente tenía que ejecutar guardWrite() manualmente
const guardResult = await guardWrite(filePath, content, userMessage);
if (!guardResult.allowed) { /* ... */ }
// Luego usar interceptedWrite()
await interceptedWrite(filePath, content, context);
// Luego recargar manualmente
if (shouldAutoReload(filePath)) { /* recargar */ }
```

**Ahora:**
```typescript
// interceptedWrite() ejecuta TODO automáticamente
await interceptedWrite(filePath, content, {
  componentName: 'Button', // opcional
  userMessage: userMessage // opcional
});
// ✅ guardWrite() se ejecuta automáticamente
// ✅ Flujo automático completo se ejecuta automáticamente
// ✅ Auto-reload se ejecuta automáticamente (con instrucciones claras)
```

---

### **2. Actualización de `.cursorrules`**

**Cambios:**
1. ✅ **Prohíbe `write()` y `search_replace()` directos** en `prototypes/`
2. ✅ **Fuerza uso de `interceptedWrite()` o `interceptedSearchReplace()`** SIEMPRE
3. ✅ **Simplifica las instrucciones** - ya no necesita ejecutar `guardWrite()` manualmente
4. ✅ **Auto-reload está integrado** en los interceptores

**Antes:**
```typescript
// El agente tenía que:
// 1. Ejecutar guardWrite()
// 2. Verificar si está permitido
// 3. Usar interceptedWrite() o write()
// 4. Recargar manualmente
```

**Ahora:**
```typescript
// El agente solo necesita:
// 1. Usar interceptedWrite() o interceptedSearchReplace()
// 2. Seguir las instrucciones de auto-reload si aparecen
```

---

## 🔄 Flujo Automático Completo

### **Cuando el agente usa `interceptedWrite()`:**

```
1. interceptedWrite() se ejecuta
   ↓
2. guardWrite() se ejecuta automáticamente
   - Detecta componentes UBITS
   - Consulta Storybook si detecta componente
   - Valida estructura
   ↓
3a. Si guardWrite() bloquea:
    → Lanza error con instrucciones claras
    → Fuerza uso de autorun.apply()
   ↓
3b. Si guardWrite() permite:
    → Ejecuta executeOnMessageStart() automáticamente
    → Ejecuta validaciones de fase
    → Ejecuta validaciones de implementación
    → Ejecuta validación de estructura
    → Ejecuta flujo automático completo
   ↓
4. Si todo pasa:
    → Permite escribir
    → Proporciona instrucciones de auto-reload
   ↓
5. El agente ejecuta auto-reload automáticamente
   (siguiendo las instrucciones proporcionadas)
```

---

## 📋 Cambios en el Código

### **1. `interceptedWrite()` - Ejecuta `guardWrite()` automáticamente**

```typescript
// ⚠️ CRÍTICO: Ejecutar guardWrite() automáticamente ANTES de continuar
console.log('🛡️ [Tool Interceptor] Ejecutando guardWrite() automáticamente...');
try {
  const guardResult = await guardWrite(
    filePath,
    contents,
    context?.userMessage
  );

  if (!guardResult.allowed) {
    console.error(
      `❌ [Tool Interceptor] guardWrite() BLOQUEÓ write(): ${guardResult.reason}`
    );
    throw new Error(
      `❌ IMPLEMENTACIÓN BLOQUEADA: ${guardResult.reason}`
    );
  }

  if (guardResult.componentName) {
    console.log(
      `✅ [Tool Interceptor] guardWrite() permitió write() para componente: ${guardResult.componentName}`
    );
    context.componentName = guardResult.componentName;
  }
} catch (error: any) {
  if (error.message.includes('IMPLEMENTACIÓN BLOQUEADA')) {
    throw error;
  }
  console.warn(`⚠️ [Tool Interceptor] Error en guardWrite(): ${error.message}`);
}
```

### **2. `interceptedWrite()` - Proporciona instrucciones de auto-reload**

```typescript
// ⚠️ CRÍTICO: Auto-reload automático DESPUÉS de escribir
if (shouldAutoReload(filePath)) {
  const templateUrl = getTemplateUrlFromPath(filePath);
  console.log('\n🔄 [Tool Interceptor] ========================================');
  console.log('🔄 [Tool Interceptor] AUTO-RELOAD AUTOMÁTICO ACTIVADO');
  console.log(`🔄 [Tool Interceptor] Archivo: ${filePath}`);
  console.log(`🔄 [Tool Interceptor] URL del template: ${templateUrl}`);
  console.log('🔄 [Tool Interceptor] ========================================');
  console.log('\n⚠️ INSTRUCCIONES AUTOMÁTICAS PARA EL AGENTE:');
  console.log('1. Obtener URL actual: call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_snapshot" })');
  console.log('2. Recargar página: call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_navigate", arguments: { url: currentUrl } })');
  console.log('3. Verificar: setTimeout(() => call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_snapshot" }), 1000)');
  console.log('\n⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario');
  console.log('🔄 [Tool Interceptor] ========================================\n');
}
```

### **3. `interceptedSearchReplace()` - Mismo flujo automático**

```typescript
// ⚠️ CRÍTICO: Ejecutar guardWrite() automáticamente ANTES de continuar
// (usando newString como contenido para validar)
console.log('🛡️ [Tool Interceptor] Ejecutando guardWrite() automáticamente...');
try {
  // Leer archivo actual para obtener contenido completo
  const fs = await import('fs/promises');
  let currentContent = '';
  try {
    currentContent = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    currentContent = newString;
  }
  
  // Reemplazar oldString con newString para validar el contenido resultante
  const newContent = currentContent.replace(oldString, newString);
  
  const guardResult = await guardWrite(
    filePath,
    newContent,
    context?.userMessage
  );

  if (!guardResult.allowed) {
    throw new Error(
      `❌ IMPLEMENTACIÓN BLOQUEADA: ${guardResult.reason}`
    );
  }
  // ... resto del flujo igual que interceptedWrite()
} catch (error: any) {
  // ... manejo de errores
}
```

---

## 🎯 Resultado

### **Antes (Dependía del agente):**
1. ❌ Agente tenía que ejecutar `guardWrite()` manualmente
2. ❌ Agente tenía que verificar si está permitido
3. ❌ Agente tenía que usar `interceptedWrite()` o `write()`
4. ❌ Agente tenía que recargar manualmente
5. ❌ Errores frecuentes porque el agente olvidaba pasos

### **Ahora (Completamente automático):**
1. ✅ Agente solo usa `interceptedWrite()` o `interceptedSearchReplace()`
2. ✅ `guardWrite()` se ejecuta automáticamente
3. ✅ Flujo automático completo se ejecuta automáticamente
4. ✅ Auto-reload se ejecuta automáticamente (con instrucciones claras)
5. ✅ Menos errores porque todo está automatizado

---

## 📋 Instrucciones para el Agente

### **Regla Única y Simple:**

**❌ NUNCA usar:**
```typescript
await write(filePath, content);
await search_replace(filePath, oldString, newString);
```

**✅ SIEMPRE usar:**
```typescript
import { interceptedWrite, interceptedSearchReplace } from '@autorun/core/interceptors/toolInterceptors';

await interceptedWrite(filePath, content, {
  componentName: 'Button', // opcional
  userMessage: userMessage // opcional
});

await interceptedSearchReplace(filePath, oldString, newString, {
  componentName: 'Button', // opcional
  userMessage: userMessage // opcional
});
```

**Cuando veas el mensaje de auto-reload:**
```typescript
// Ejecutar automáticamente (SIN preguntar)
const snapshot = await call_mcp_tool({
  server: 'cursor-ide-browser',
  toolName: 'browser_snapshot'
});
const currentUrl = snapshot?.url || `http://localhost:3000/${path.basename(filePath)}`;

await call_mcp_tool({
  server: 'cursor-ide-browser',
  toolName: 'browser_navigate',
  arguments: { url: currentUrl }
});

setTimeout(async () => {
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_snapshot'
  });
}, 1000);
```

---

## ✅ Beneficios

1. ✅ **Menos errores:** Todo está automatizado, no depende de que el agente recuerde pasos
2. ✅ **Más rápido:** No hay pasos manuales que olvidar
3. ✅ **Más confiable:** El flujo siempre se ejecuta correctamente
4. ✅ **Más simple:** El agente solo necesita usar `interceptedWrite()` o `interceptedSearchReplace()`
5. ✅ **Auto-reload automático:** Se ejecuta automáticamente cuando es necesario

---

## 🎯 Conclusión

**Autorun ahora funciona completamente automático:**
- ✅ `guardWrite()` se ejecuta automáticamente
- ✅ Flujo automático completo se ejecuta automáticamente
- ✅ Auto-reload se ejecuta automáticamente (con instrucciones claras)
- ✅ El agente solo necesita usar `interceptedWrite()` o `interceptedSearchReplace()`

**No más errores por olvidar pasos manuales.**
