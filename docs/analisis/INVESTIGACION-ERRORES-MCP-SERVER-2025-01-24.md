# 🔍 Investigación: Errores del MCP Server de Autorun

**Fecha:** 2025-01-24  
**Estado:** ✅ MCP funcionando después de reactivación  
**Problema:** El MCP se pone en error y requiere reactivación manual

---

## 📋 Resumen del Problema

El MCP Server de Autorun funciona correctamente después de reactivación, pero se pone en error en ciertas situaciones. Necesitamos identificar las causas raíz.

---

## 🔍 Posibles Causas Identificadas

### **1. Error en Normalización de `targetFiles`** ⚠️ CRÍTICO

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunVerify.ts` línea 66

**Problema:**
- El error `input.targetFiles.join is not a function` ocurre cuando `targetFiles` no es un array
- Aunque hay normalización, el error puede ocurrir ANTES de llegar a la función

**Solución Implementada:**
- ✅ Normalización en MCP server (líneas 385-430)
- ✅ Normalización en `autorunVerify()` (líneas 28-56)
- ✅ Protección en `console.log` (líneas 60-83)

**Estado:** ✅ Implementado pero puede fallar si el error ocurre antes de la normalización

---

### **2. Errores No Capturados que Cierran el Proceso** ⚠️ CRÍTICO

**Ubicación:** `packages/autorun-core/src/cli/autorun-mcp-server.ts` líneas 17-25

**Problema:**
```typescript
process.on('uncaughtException', (error) => {
  console.error('❌ [Autorun MCP Server] Error no capturado:', error);
  process.exit(1); // ⚠️ Cierra el proceso inmediatamente
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ [Autorun MCP Server] Promise rechazada:', reason);
  process.exit(1); // ⚠️ Cierra el proceso inmediatamente
});
```

**Impacto:**
- Cualquier error no capturado cierra el proceso MCP
- El proceso no se recupera automáticamente
- Requiere reactivación manual

**Solución Propuesta:**
- ✅ Mejorar manejo de errores para no cerrar el proceso
- ✅ Agregar recuperación automática
- ✅ Logging detallado antes de cerrar

---

### **3. Errores en `autorunVerify()` que No se Manejan Correctamente** ⚠️ ALTO

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunVerify.ts`

**Problema:**
- Si `JSON.stringify()` falla con tipos complejos, puede causar error no capturado
- Si `targetFiles.join()` se llama antes de normalizar, causa error

**Solución Implementada:**
- ✅ Try-catch en normalización
- ✅ Try-catch en console.log
- ⚠️ Pero puede haber otros puntos de fallo

---

### **4. Errores en `autorunApply()` que Pueden Afectar el Estado** ⚠️ MEDIO

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` líneas 1275-1312

**Problema:**
- Errores en `autorunApply()` pueden dejar el estado inconsistente
- El modo `__AUTORUN_APPLY_MODE__` puede quedar activo después de error
- Pre-Implementation Check puede quedar desactivado

**Solución Implementada:**
- ✅ Limpieza de estado en catch (líneas 1276-1308)
- ⚠️ Pero si el error ocurre antes, el estado puede quedar inconsistente

---

### **5. Problemas con el SDK de MCP** ⚠️ BAJO

**Problema:**
- El SDK de MCP puede procesar el input antes de llegar a nuestro código
- Errores en el SDK pueden causar que el proceso se cierre

**Solución:**
- ⚠️ No podemos controlar directamente el SDK
- ✅ Pero podemos mejorar el manejo de errores en nuestro código

---

## 🛠️ Soluciones Propuestas

### **Solución 1: Mejorar Manejo de Errores en CLI** ⚠️ CRÍTICO

**Archivo:** `packages/autorun-core/src/cli/autorun-mcp-server.ts`

**Cambios:**
1. No cerrar el proceso inmediatamente en `uncaughtException`
2. Logging detallado antes de cerrar
3. Intentar recuperación antes de cerrar

```typescript
process.on('uncaughtException', (error) => {
  console.error('❌ [Autorun MCP Server] Error no capturado:', error);
  console.error('Stack:', error.stack);
  // ⚠️ NO cerrar inmediatamente - permitir que el SDK maneje el error
  // process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ [Autorun MCP Server] Promise rechazada:', reason);
  // ⚠️ NO cerrar inmediatamente - permitir que el SDK maneje el error
  // process.exit(1);
});
```

---

### **Solución 2: Agregar Try-Catch Global en MCP Server** ⚠️ ALTO

**Archivo:** `packages/autorun-core/src/mcp-server/autorunMCPServer.ts`

**Cambios:**
1. Envolver todo el handler en try-catch adicional
2. Asegurar que siempre se retorne una respuesta válida
3. Logging detallado de errores

---

### **Solución 3: Validación Robusta de Inputs** ⚠️ ALTO

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunVerify.ts`

**Cambios:**
1. Validar todos los inputs antes de usarlos
2. Normalizar ANTES de cualquier operación
3. Fallbacks seguros para todos los casos

---

### **Solución 4: Agregar Health Check y Recovery** ⚠️ MEDIO

**Cambios:**
1. Agregar endpoint de health check
2. Detectar cuando el servidor está en estado de error
3. Recuperación automática

---

## 📊 Prioridad de Implementación

1. **🔴 CRÍTICO:** Solución 1 - Mejorar manejo de errores en CLI
2. **🟠 ALTO:** Solución 2 - Try-catch global en MCP Server
3. **🟠 ALTO:** Solución 3 - Validación robusta de inputs
4. **🟡 MEDIO:** Solución 4 - Health check y recovery

---

## 🧪 Pruebas Necesarias

1. ✅ Probar con `targetFiles` como array `['diff']`
2. ✅ Probar con `targetFiles` como string `'diff'`
3. ✅ Probar con `targetFiles` undefined
4. ✅ Probar con `targetFiles` tipo inesperado
5. ✅ Probar con errores no capturados
6. ✅ Probar con promises rechazadas
7. ✅ Probar recuperación después de error

---

## 📝 Notas

- El MCP funciona correctamente después de reactivación
- El problema parece ser intermitente
- Necesitamos identificar el patrón exacto que causa el error
- Los logs detallados ayudarán a identificar la causa raíz

---

**Última actualización:** 2025-01-24  
**Estado:** 🔍 En Investigación

