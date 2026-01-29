# ✅ Implementación: Browser MCP Auto Extractor

**Fecha:** 2025-01-23  
**Estado:** ✅ Implementado

---

## 📋 Resumen

Se implementó un sistema para detectar cuando la extracción desde Storybook falla debido a carga dinámica de código y generar instrucciones claras para que el agente ejecute Browser MCP automáticamente.

---

## 🔧 Archivos Creados/Modificados

### **1. Nuevo: `browserMCPAutoExtractor.ts`**

**Ubicación:** `packages/autorun-core/src/helpers/browserMCPAutoExtractor.ts`

**Funciones:**
- `extractCodeWithBrowserMCP()`: Lanza error especial cuando se requiere Browser MCP
- `isBrowserMCPRequiredError()`: Detecta si un error requiere Browser MCP
- `extractCodeFromBrowserSnapshot()`: Extrae código desde snapshot del Browser MCP
- `generateBrowserMCPInstructions()`: Genera instrucciones claras para el agente

**Características:**
- ✅ Detecta cuando fetch() falla debido a carga dinámica
- ✅ Lanza error especial con información de URL y historia
- ✅ Genera instrucciones claras para el agente
- ✅ Permite extraer código desde snapshot después de que el agente ejecuta Browser MCP

### **2. Modificado: `storybookExactCodeExtractorWithBrowser.ts`**

**Cambios:**
- ✅ Intenta `getSourceCode()` como fallback antes de lanzar error
- ✅ Usa `extractCodeWithBrowserMCP()` cuando fetch() y getSourceCode() fallan
- ✅ Genera instrucciones claras para el agente

**Flujo:**
1. Intenta fetch() Docs page
2. Si falla, intenta `getSourceCode()` como fallback
3. Si ambos fallan, lanza error especial con instrucciones

### **3. Modificado: `autorunApply.ts` (Mode B)**

**Cambios:**
- ✅ Detecta errores de Browser MCP Required
- ✅ Muestra instrucciones claras en los logs
- ✅ Usa fallback `PrototypeTokenKit` solo como último recurso
- ✅ Advierte que el código será genérico si no se ejecuta Browser MCP

---

## 🔄 Flujo Completo

### **Escenario 1: Extracción Exitosa (fetch funciona)**

```
1. extractExactCodeFromStorybookWithBrowser()
2. fetch() Docs page → ✅ Éxito
3. extractCodeFromDocs() → ✅ Código extraído
4. Retorna código → ✅ Implementación exitosa
```

### **Escenario 2: Extracción Fallida (código dinámico)**

```
1. extractExactCodeFromStorybookWithBrowser()
2. fetch() Docs page → ✅ Éxito (pero código no visible)
3. extractCodeFromDocs() → ❌ No encuentra código
4. getSourceCode() → ❌ Fallback falla
5. extractCodeWithBrowserMCP() → Lanza error especial
6. Mode B detecta error → Muestra instrucciones
7. Agente ejecuta Browser MCP → ✅ Código extraído
8. extractCodeFromBrowserSnapshot() → ✅ Código parseado
9. Retorna código → ✅ Implementación exitosa
```

### **Escenario 3: Agente No Ejecuta Browser MCP**

```
1-5. Igual que Escenario 2
6. Mode B detecta error → Muestra instrucciones
7. Agente NO ejecuta Browser MCP → ⚠️ Usa fallback
8. PrototypeTokenKit → ⚠️ Código genérico
9. Advertencia en logs → ⚠️ Código no es real
```

---

## 📋 Instrucciones Generadas

Cuando se requiere Browser MCP, el sistema genera instrucciones claras:

```
⚠️ EXTRACCIÓN REQUIERE BROWSER MCP

El código de Storybook se carga dinámicamente con JavaScript, por lo que fetch() no puede obtenerlo.
Necesitamos usar Browser MCP para navegar y extraer desde el snapshot.

📋 INSTRUCCIONES PARA EL AGENTE:

1. Navegar a Docs:
   call_mcp_tool({
     server: "cursor-ide-browser",
     toolName: "browser_navigate",
     arguments: { url: "https://ubits-storybook10.vercel.app/?path=/docs/formularios-radio-button--docs" }
   })

2. Esperar 2 segundos para que se cargue el código dinámicamente

3. Buscar botón "Show code" (si existe) y hacer clic:
   call_mcp_tool({
     server: "cursor-ide-browser",
     toolName: "browser_click",
     arguments: {
       element: "Show code button",
       ref: "button[aria-label*='Show code'], button[aria-label*='show code']"
     }
   })

4. Tomar snapshot:
   call_mcp_tool({
     server: "cursor-ide-browser",
     toolName: "browser_snapshot"
   })

5. Extraer código desde el snapshot usando extractCodeFromBrowserSnapshot()
```

---

## ✅ Ventajas

1. **Detección Automática:** Detecta cuando se requiere Browser MCP
2. **Instrucciones Claras:** Genera instrucciones paso a paso para el agente
3. **Fallback Inteligente:** Intenta `getSourceCode()` antes de requerir Browser MCP
4. **Advertencias Claras:** Advierte cuando el código será genérico
5. **Reutilizable:** Funciona para todos los componentes

---

## 🔧 Próximos Pasos

1. **Probar con RadioButton:** Verificar que las instrucciones se generan correctamente
2. **Automatizar Ejecución:** Crear sistema para que el agente ejecute Browser MCP automáticamente cuando vea las instrucciones
3. **Mejorar Extracción:** Mejorar `extractCodeFromDocsSnapshot()` para extraer código más preciso

---

## 📊 Estado

- ✅ Módulo `browserMCPAutoExtractor.ts` creado
- ✅ Modificado `storybookExactCodeExtractorWithBrowser.ts`
- ✅ Modificado `autorunApply.ts` (Mode B)
- ⏳ Pendiente: Probar con RadioButton
- ⏳ Pendiente: Automatizar ejecución de Browser MCP

