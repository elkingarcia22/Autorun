# 🔍 Revisión Profunda: Plan de Mejoras para Autorun

**Fecha:** 2025-12-17  
**Objetivo:** Garantizar que Autorun funcione correctamente en todos los casos

---

## 📋 Problemas Identificados

### **PROBLEMA 1: `executeOnMessageStart()` no se ejecuta automáticamente** ❌

**Situación actual:**
- ✅ La función existe y funciona correctamente
- ❌ NO se ejecuta automáticamente al inicio de cada mensaje
- ❌ Depende de que el agente la llame manualmente
- ❌ No hay garantía de ejecución

**Impacto:**
- No se detectan componentes automáticamente
- No se emite mensaje `[AUTORUN_STORYBOOK_MCP]`
- No se consulta Storybook MCP
- No se obtiene plan basado en historias

---

### **PROBLEMA 2: Sistema de interceptores no se usa** ❌

**Situación actual:**
- ✅ Los interceptores existen (`interceptedWrite`, `interceptedSearchReplace`)
- ✅ La lógica está implementada correctamente
- ❌ NO se usan automáticamente antes de `write()` o `search_replace()`
- ❌ Depende de que el agente los llame manualmente

**Impacto:**
- No se valida fase actual antes de escribir
- No se verifica orden de fases
- No se navega automáticamente a Storybook si está bloqueado
- No se recarga automáticamente después de escribir

---

### **PROBLEMA 3: Mensaje `[AUTORUN_STORYBOOK_MCP]` no se intercepta** ❌

**Situación actual:**
- ✅ `executeOnMessageStart()` emite el mensaje correctamente
- ✅ El mensaje se imprime en los logs
- ❌ NO se intercepta automáticamente
- ❌ NO se consulta Storybook MCP automáticamente

**Impacto:**
- No se obtienen props exactas de los componentes
- No se consulta Storybook antes de implementar
- Se implementa con código "adivinado" en lugar de código real

---

### **PROBLEMA 4: Detección de múltiples componentes** ❌

**Situación actual:**
- ✅ Detecta un componente (el primero encontrado)
- ❌ NO detecta múltiples componentes en el mismo mensaje
- ❌ Ejemplo: "implementa un boton que abra un modal" → solo detecta "Button" o "Modal"

**Impacto:**
- No se consulta Storybook MCP para todos los componentes
- No se obtiene plan para todos los componentes
- Implementación incompleta

---

### **PROBLEMA 5: No se extrae código real desde Storybook** ❌

**Situación actual:**
- ✅ Se navega a Storybook visualmente
- ❌ NO se extrae código HTML real desde la pestaña "Code"
- ❌ NO se extraen estilos CSS reales
- ❌ NO se extrae JavaScript necesario

**Impacto:**
- Se implementa con código "adivinado"
- Estilos no coinciden con Storybook
- Estructura HTML incorrecta

---

## ✅ Plan de Mejoras

### **MEJORA 1: Garantizar ejecución automática de `executeOnMessageStart()`** ⭐

**Solución:**
1. **Crear función wrapper que se ejecute SIEMPRE:**
   ```typescript
   // En un nuevo archivo: packages/autorun-core/src/helpers/autoMessageHandler.ts
   export async function handleUserMessage(userMessage: string) {
     // PASO 1: SIEMPRE ejecutar executeOnMessageStart()
     const result = await executeOnMessageStart(userMessage);
     
     // PASO 2: Si detectó componente, interceptar mensaje MCP
     if (result.detected && result.componentName) {
       await handleStorybookMCPMessage(result.componentName);
     }
     
     // PASO 3: Retornar resultado para que el agente continúe
     return result;
   }
   ```

2. **Actualizar `.cursorrules` para usar el wrapper:**
   ```markdown
   ## ⚠️ OBLIGATORIO: Usar handleUserMessage() al inicio
   
   AL INICIO de cada mensaje, SIEMPRE ejecutar:
   ```typescript
   import { handleUserMessage } from '@autorun/core/helpers/autoMessageHandler';
   const result = await handleUserMessage(userMessage);
   ```
   ```

---

### **MEJORA 2: Interceptar mensaje `[AUTORUN_STORYBOOK_MCP]` automáticamente** ⭐

**Solución:**
1. **Crear función que intercepte y consulte MCP automáticamente:**
   ```typescript
   // En packages/autorun-core/src/helpers/storybookMCPAutoHandler.ts
   export async function handleStorybookMCPMessage(
     componentName: string,
     storybookId: string
   ): Promise<any> {
     console.log(`📚 [Auto MCP Handler] Consultando Storybook MCP para: ${componentName}`);
     
     // El agente DEBE ejecutar automáticamente:
     // call_mcp_tool({
     //   server: "storybook-ubits",
     //   toolName: "mcp_storybook_getComponentsProps",
     //   arguments: { componentIds: [storybookId] }
     // })
     
     // Por ahora, emitir instrucciones claras
     console.log(`📚 [Auto MCP Handler] EJECUTAR AUTOMÁTICAMENTE:`);
     console.log(`   call_mcp_tool({`);
     console.log(`     server: "storybook-ubits",`);
     console.log(`     toolName: "mcp_storybook_getComponentsProps",`);
     console.log(`     arguments: { componentIds: ["${storybookId}"] }`);
     console.log(`   })`);
     
     return null; // El agente debe ejecutar la llamada real
   }
   ```

2. **Integrar en `handleUserMessage()`:**
   ```typescript
   if (result.detected && result.componentName) {
     const storybookId = await mapComponentNameToStorybookId(result.componentName);
     await handleStorybookMCPMessage(result.componentName, storybookId);
   }
   ```

---

### **MEJORA 3: Detectar múltiples componentes** ⭐

**Solución:**
1. **Mejorar `executeAutoDetectionOnMessage()` para detectar múltiples componentes:**
   ```typescript
   // En autoComponentDetection.ts
   export async function executeAutoDetectionOnMessage(
     userMessage: string
   ): Promise<AutoDetectionResult> {
     // Detectar TODOS los componentes mencionados
     const allComponents = detectAllComponentsFromMessage(userMessage);
     
     // Si hay múltiples, retornar todos
     if (allComponents.length > 1) {
       return {
         detected: true,
         componentNames: allComponents, // NUEVO: array de componentes
         shouldExecuteFlow: true
       };
     }
     
     // Si hay uno solo, comportamiento actual
     // ...
   }
   ```

2. **Actualizar `executeOnMessageStart()` para manejar múltiples componentes:**
   ```typescript
   if (detection.componentNames && detection.componentNames.length > 1) {
     // Consultar MCP para TODOS los componentes
     for (const componentName of detection.componentNames) {
       const storybookId = await mapComponentNameToStorybookId(componentName);
       await handleStorybookMCPMessage(componentName, storybookId);
     }
   }
   ```

---

### **MEJORA 4: Extraer código real desde Storybook** ⭐

**Solución:**
1. **Crear función para extraer código desde Storybook:**
   ```typescript
   // En packages/autorun-core/src/helpers/storybookCodeExtractor.ts
   export async function extractCodeFromStorybook(
     componentId: string,
     storybookUrl: string
   ): Promise<{
     html: string;
     css: string[];
     js: string[];
     props: any;
   }> {
     // 1. Navegar a Storybook
     // 2. Ir a pestaña "Code"
     // 3. Extraer código HTML
     // 4. Extraer estilos CSS (CDN o inline)
     // 5. Extraer JavaScript necesario
     // 6. Retornar todo
   }
   ```

2. **Integrar en el flujo de implementación:**
   ```typescript
   // Después de consultar MCP, extraer código real
   const code = await extractCodeFromStorybook(storybookId, storybookUrl);
   // Usar code.html, code.css, code.js para implementar
   ```

---

### **MEJORA 5: Usar interceptores automáticamente** ⭐

**Solución:**
1. **Crear wrapper que use interceptores automáticamente:**
   ```typescript
   // En packages/autorun-core/src/helpers/safeWrite.ts
   export async function safeWrite(
     filePath: string,
     contents: string,
     context?: { componentName?: string; userMessage?: string }
   ): Promise<void> {
     // 1. SIEMPRE ejecutar interceptor primero
     await interceptedWrite(filePath, contents, context);
     
     // 2. Si no lanzó error, usar write() normalmente
     // (El agente debe hacer esto manualmente, pero el interceptor ya validó)
   }
   ```

2. **Actualizar `.cursorrules` para usar `safeWrite()`:**
   ```markdown
   ## ⚠️ OBLIGATORIO: Usar safeWrite() en lugar de write()
   
   SIEMPRE usar:
   ```typescript
   import { safeWrite } from '@autorun/core/helpers/safeWrite';
   await safeWrite(filePath, content, { componentName, userMessage });
   ```
   ```

---

## 🎯 Implementación Priorizada

### **FASE 1: Crítico (Implementar primero)** ⚠️

1. ✅ **MEJORA 1:** Crear `handleUserMessage()` wrapper
2. ✅ **MEJORA 2:** Interceptar mensaje MCP automáticamente
3. ✅ **MEJORA 3:** Detectar múltiples componentes

**Tiempo estimado:** 2-3 horas

---

### **FASE 2: Importante (Implementar después)** ⚠️

4. ✅ **MEJORA 4:** Extraer código real desde Storybook
5. ✅ **MEJORA 5:** Usar interceptores automáticamente

**Tiempo estimado:** 3-4 horas

---

## 📋 Checklist de Verificación

### **Antes de implementar mejoras:**
- [ ] ✅ Revisar código actual de `executeOnMessageStart()`
- [ ] ✅ Revisar código actual de interceptores
- [ ] ✅ Revisar código actual de detección de componentes
- [ ] ✅ Crear tests para verificar mejoras

### **Después de implementar mejoras:**
- [ ] ✅ Verificar que `handleUserMessage()` se ejecuta automáticamente
- [ ] ✅ Verificar que mensaje MCP se intercepta automáticamente
- [ ] ✅ Verificar que múltiples componentes se detectan
- [ ] ✅ Verificar que código se extrae desde Storybook
- [ ] ✅ Verificar que interceptores se usan automáticamente

---

## 🔧 Archivos a Crear/Modificar

### **Nuevos archivos:**
1. `packages/autorun-core/src/helpers/autoMessageHandler.ts` - Wrapper principal
2. `packages/autorun-core/src/helpers/storybookMCPAutoHandler.ts` - Handler de MCP
3. `packages/autorun-core/src/helpers/storybookCodeExtractor.ts` - Extractor de código
4. `packages/autorun-core/src/helpers/safeWrite.ts` - Wrapper seguro de write()

### **Archivos a modificar:**
1. `packages/autorun-core/src/helpers/autoComponentDetection.ts` - Detectar múltiples componentes
2. `packages/autorun-core/src/helpers/executeOnMessageStart.ts` - Manejar múltiples componentes
3. `.cursorrules` - Actualizar reglas para usar nuevos wrappers

---

## 📚 Documentación a Crear

1. `docs/guias/implementacion/GUIA-SISTEMA-AUTOMATICO-COMPLETO.md` - Guía completa del sistema automático
2. `docs/analisis/RESUMEN-MEJORAS-AUTORUN-2025-12-17.md` - Resumen de mejoras implementadas

---

**Última actualización:** 2025-12-17  
**Estado:** 📋 **PLAN CREADO** - Listo para implementar
