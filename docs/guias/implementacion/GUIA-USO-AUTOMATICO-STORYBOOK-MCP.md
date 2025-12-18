# 📚 Guía: Uso Automático de Storybook MCP en Autorun

**Fecha:** 2025-12-17  
**Objetivo:** Garantizar que Autorun siempre consulte Storybook MCP antes de implementar componentes

---

## 🎯 Problema Identificado

En la prueba del 2025-12-17, se identificaron estos errores:
1. ❌ **NO se consultó Storybook MCP** antes de implementar el botón
2. ❌ **NO se consultó Storybook en Vercel** para ver la estructura correcta
3. ❌ **NO se ejecutó `executeOnMessageStart()`** al inicio del mensaje
4. ❌ **NO se recargó automáticamente** después de escribir

---

## ✅ Solución Implementada

### **1. executeOnMessageStart() Emite Mensaje Especial** ⭐

Cuando `executeOnMessageStart()` detecta un componente, **automáticamente emite un mensaje especial** que el agente debe interceptar:

```typescript
// En executeOnMessageStart.ts
if (detection.componentName) {
    const storybookId = mapComponentNameToStorybookId(detection.componentName);
    
    console.log(`[AUTORUN_STORYBOOK_MCP]${detection.componentName}:${storybookId}[/AUTORUN_STORYBOOK_MCP]`);
    console.log('📚 El agente DEBE ejecutar automáticamente:');
    console.log(`   call_mcp_tool({`);
    console.log(`     server: "storybook-ubits",`);
    console.log(`     toolName: "mcp_storybook_getComponentsProps",`);
    console.log(`     arguments: { componentIds: ["${storybookId}"] }`);
    console.log(`   })`);
}
```

**El agente DEBE:**
1. ✅ Interceptar el mensaje `[AUTORUN_STORYBOOK_MCP]`
2. ✅ Extraer `componentName` y `storybookId`
3. ✅ Ejecutar automáticamente `call_mcp_tool()` para consultar Storybook MCP
4. ✅ NO preguntar al usuario
5. ✅ Ejecutar inmediatamente

---

### **2. Reglas Actualizadas en .cursorrules** ⭐

**Nueva regla obligatoria:**

```markdown
## ⚠️⚠️⚠️ REGLA CRÍTICA: CONSULTAR STORYBOOK MCP AUTOMÁTICAMENTE ⚠️⚠️⚠️

**CUANDO VEAS EN LOS LOGS:**
```
[AUTORUN_STORYBOOK_MCP]ComponentName:storybookId[/AUTORUN_STORYBOOK_MCP]
```

**DEBES ejecutar automáticamente (SIN preguntar):**
```typescript
// 1. Consultar Storybook MCP
const mcpResult = await call_mcp_tool({
    server: "storybook-ubits",
    toolName: "mcp_storybook_getComponentsProps",
    arguments: { componentIds: [storybookId] }
});

// 2. Consultar Storybook en Vercel
await browser_navigate({ 
    url: `https://ubits-storybook10.vercel.app/?path=/story/${storybookId}--default` 
});
await browser_snapshot();

// 3. Revisar pestaña "Code" para estructura HTML exacta
// 4. Revisar pestaña "Controls" para props disponibles
```

**⚠️ REGLAS CRÍTICAS:**
- ✅ **SIEMPRE consultar Storybook MCP** cuando veas el mensaje
- ✅ **SIEMPRE consultar Storybook en Vercel** después del MCP
- ✅ **NO preguntar al usuario** - ejecutar automáticamente
- ✅ **NO continuar con la implementación** hasta consultar ambos
```

---

### **3. Flujo Completo Automático** ⭐

```
Usuario: "implementa un botón"
  ↓
[PASO 1] executeOnMessageStart() detecta componente "Button"
  ↓
[PASO 2] Emite mensaje: [AUTORUN_STORYBOOK_MCP]Button:basicos-button[/AUTORUN_STORYBOOK_MCP]
  ↓
[PASO 3] Agente intercepta y ejecuta automáticamente:
  - call_mcp_tool() → Obtiene props del botón
  - browser_navigate() → Navega a Storybook en Vercel
  - browser_snapshot() → Revisa estructura HTML
  ↓
[PASO 4] Agente implementa con información exacta obtenida
  ↓
[PASO 5] Auto-reload automático después de escribir
```

---

## 📋 Checklist Obligatorio para el Agente

**ANTES de implementar cualquier componente, DEBES:**

- [ ] ✅ **Ejecutar `executeOnMessageStart()`** al inicio del mensaje
- [ ] ✅ **Interceptar mensaje `[AUTORUN_STORYBOOK_MCP]`** si aparece
- [ ] ✅ **Consultar Storybook MCP** usando `call_mcp_tool()`
- [ ] ✅ **Consultar Storybook en Vercel** usando `browser_navigate()`
- [ ] ✅ **Revisar pestaña "Code"** para estructura HTML exacta
- [ ] ✅ **Revisar pestaña "Controls"** para props disponibles
- [ ] ✅ **Implementar con información exacta** obtenida
- [ ] ✅ **Recargar automáticamente** después de escribir

---

## 🔧 Configuración Requerida

### **1. Storybook MCP Debe Estar Configurado**

**Verificar configuración:**
```bash
# Verificar si Storybook local está corriendo
curl http://localhost:6006/index.json | head -20

# Si no está corriendo, iniciarlo:
cd vendor/ubits/packages/storybook
npm run storybook
```

**Configuración MCP en Cursor:**
```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "http://localhost:6006/index.json"
      }
    }
  }
}
```

**Ver guía completa:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`

---

## 🚨 Errores Comunes a Evitar

### **Error #1: No Consultar Storybook MCP**

**❌ INCORRECTO:**
```typescript
// Implementar directamente sin consultar MCP
await write(filePath, buttonHTML);
```

**✅ CORRECTO:**
```typescript
// 1. Consultar MCP primero
const mcpResult = await call_mcp_tool({
    server: "storybook-ubits",
    toolName: "mcp_storybook_getComponentsProps",
    arguments: { componentIds: ["basicos-button"] }
});

// 2. Consultar Storybook en Vercel
await browser_navigate({ 
    url: "https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default" 
});

// 3. Implementar con información exacta
await write(filePath, buttonHTML);
```

---

### **Error #2: No Interceptar Mensaje [AUTORUN_STORYBOOK_MCP]**

**❌ INCORRECTO:**
```typescript
// Ignorar el mensaje y continuar
const result = await executeOnMessageStart(userMessage);
// Continuar sin consultar MCP
```

**✅ CORRECTO:**
```typescript
// 1. Ejecutar executeOnMessageStart()
const result = await executeOnMessageStart(userMessage);

// 2. Interceptar mensaje si aparece
if (result.detected && result.componentName) {
    // El mensaje ya fue emitido por executeOnMessageStart()
    // Interceptar y consultar MCP automáticamente
    const storybookId = mapComponentNameToStorybookId(result.componentName);
    await call_mcp_tool({
        server: "storybook-ubits",
        toolName: "mcp_storybook_getComponentsProps",
        arguments: { componentIds: [storybookId] }
    });
}
```

---

### **Error #3: No Recargar Después de Escribir**

**❌ INCORRECTO:**
```typescript
// Escribir y no recargar
await write(filePath, content);
// No recargar
```

**✅ CORRECTO:**
```typescript
// 1. Escribir
await write(filePath, content);

// 2. Recargar automáticamente
const snapshot = await browser_snapshot();
const currentUrl = snapshot?.url || getTemplateUrlFromPath(filePath);
await browser_navigate({ url: currentUrl });
setTimeout(async () => {
    await browser_snapshot();
}, 1000);
```

---

## 📚 Referencias

- **Guía de configuración MCP:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`
- **Guía de uso MCP:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`
- **Análisis de errores:** `docs/analisis/ANALISIS-ERRORES-AUTORUN-BOTON-MODAL-2025-12-17.md`

---

**Última actualización:** 2025-12-17  
**Estado:** ✅ **IMPLEMENTADO** - El sistema ahora consulta Storybook MCP automáticamente
