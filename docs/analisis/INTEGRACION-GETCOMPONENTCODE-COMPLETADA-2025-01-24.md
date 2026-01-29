# ✅ Integración Completada: `getComponentCode` en Flujo Principal

> **Fecha:** 2025-01-24  
> **Estado:** ✅ COMPLETADO

---

## 📋 Resumen

El tool `getComponentCode` del Storybook MCP ha sido **integrado exitosamente** en el flujo principal de extracción de código. Ahora es el **método principal** para extraer código HTML/JS desde Storybook, con fetch como fallback.

---

## 🔧 Cambios Implementados

### **Archivo Modificado:**
- `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

### **Cambios Realizados:**

1. **✅ Agregado INTENTO 1: `getComponentCode` del Storybook MCP**
   - Se llama ANTES de los métodos fetch
   - Usa `callStorybookMCPTool()` para llamar al tool
   - Parsea el resultado JSON del MCP
   - Extrae HTML y JS del resultado

2. **✅ Mantenido INTENTO 2: Fetch desde URL de historia**
   - Ahora es fallback si `getComponentCode` falla
   - Conserva toda la lógica de regex existente

3. **✅ Mantenido INTENTO 3: Fetch desde Docs**
   - Último recurso si los anteriores fallan

---

## 📊 Flujo de Extracción Actualizado

```
┌─────────────────────────────────────────────────────────┐
│ extractExactCodeFromStorybookWithBrowser()              │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│ INTENTO 1: getComponentCode (Storybook MCP)            │
│   ✅ Usa Playwright para navegar                       │
│   ✅ Prioriza historia "implementation"                │
│   ✅ Maneja Docs con botón "Show code"                │
│   ✅ Más confiable (extrae directamente)               │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
                    ¿Éxito?
                        │
            ┌───────────┴───────────┐
            │                       │
           SÍ                      NO
            │                       │
            ▼                       ▼
┌───────────────────┐   ┌──────────────────────────────┐
│ Retornar código   │   │ INTENTO 2: Fetch URL        │
│ ✅ HTML + JS      │   │   - Fetch HTML               │
└───────────────────┘   │   - Regex para extraer      │
                        │   - Múltiples formatos       │
                        └───────────┬──────────────────┘
                                    │
                                    ▼
                                ¿Éxito?
                                    │
                        ┌───────────┴───────────┐
                        │                       │
                       SÍ                      NO
                        │                       │
                        ▼                       ▼
            ┌───────────────────┐   ┌──────────────────────────────┐
            │ Retornar código   │   │ INTENTO 3: Fetch Docs        │
            │ ✅ HTML + JS      │   │   - Fetch HTML               │
            └───────────────────┘   │   - Extraer desde Docs       │
                                    └───────────┬──────────────────┘
                                                │
                                                ▼
                                            ¿Éxito?
                                                │
                                    ┌───────────┴───────────┐
                                    │                       │
                                   SÍ                      NO
                                    │                       │
                                    ▼                       ▼
                        ┌───────────────────┐   ┌──────────────────┐
                        │ Retornar código   │   │ Lanzar error     │
                        │ ✅ HTML + JS      │   │ ❌ FALLÓ TODO    │
                        └───────────────────┘   └──────────────────┘
```

---

## 💻 Código Implementado

```typescript
// INTENTO 1: Usar getComponentCode del Storybook MCP (más confiable)
if (!codeFromTab || !codeFromTab.html) {
  console.log(`   🔧 Intentando extraer con getComponentCode del Storybook MCP...`);
  
  try {
    const { callStorybookMCPTool } = await import('./mcpClient.js');
    
    const mcpResult = await callStorybookMCPTool('getComponentCode', {
      componentId,
      storyName: finalStoryName,
    });
    
    // Parsear resultado del MCP
    if (mcpResult && mcpResult.content && mcpResult.content.length > 0) {
      const contentText = mcpResult.content[0].text;
      const parsed = JSON.parse(contentText);
      
      if (parsed.success && parsed.html) {
        codeFromTab = {
          html: parsed.html,
          js: parsed.js,
        };
        
        console.log(
          `   ✅ Código extraído con getComponentCode: ${codeFromTab.html.length} caracteres HTML, ${codeFromTab.js?.length || 0} caracteres JS`
        );
        console.log(`   📋 Método de extracción: ${parsed.extractionMethod || 'unknown'}`);
        console.log(`   📋 Selector usado: ${parsed.extractionSelector || 'unknown'}`);
      } else {
        console.warn(
          `   ⚠️ getComponentCode no retornó código válido: ${parsed.error || 'unknown error'}`
        );
      }
    } else {
      console.warn(`   ⚠️ getComponentCode retornó resultado vacío`);
    }
  } catch (mcpError: any) {
    console.warn(
      `   ⚠️ Error llamando getComponentCode del Storybook MCP: ${mcpError.message}`
    );
    console.warn(`   🔄 Continuando con método fallback (fetch)...`);
  }
}

// INTENTO 2: Extraer desde URL de historia directamente (fallback)
// ... código existente con fetch ...
```

---

## ✅ Beneficios de la Integración

1. **✅ Mayor Confiabilidad**
   - Extrae código directamente desde Storybook usando Playwright
   - No depende de regex que pueden fallar con cambios en el HTML

2. **✅ Priorización Inteligente**
   - Busca historia "implementation" primero (mejor código)
   - Si no existe, usa la historia solicitada
   - Si no funciona, intenta Docs con botón "Show code"

3. **✅ Fallback Robusto**
   - Si `getComponentCode` falla, usa fetch como respaldo
   - Mantiene compatibilidad con casos edge

4. **✅ Logging Detallado**
   - Muestra qué método se usó para extraer
   - Muestra selector usado
   - Facilita debugging

---

## 🧪 Pruebas Recomendadas

1. **Probar con componente que tiene historia "implementation":**
   ```typescript
   await extractExactCodeFromStorybookWithBrowser('data-data-table', 'default');
   ```

2. **Probar con componente sin historia "implementation":**
   ```typescript
   await extractExactCodeFromStorybookWithBrowser('formularios-radio-button', 'default');
   ```

3. **Probar fallback cuando Storybook MCP no está disponible:**
   - Desconectar Storybook MCP temporalmente
   - Verificar que fetch funciona como fallback

---

## 📚 Referencias

- **Tool `getComponentCode`:** `scripts/storybook-mcp-wrapper.mjs`
- **Helper MCP Client:** `packages/autorun-core/src/helpers/mcpClient.ts`
- **Función de extracción:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`
- **Documentación del flujo:** `docs/guias/implementacion/FLUJO-COMPLETO-IMPLEMENTACION-COMPONENTES-2025-01-24.md`

---

## 🎯 Estado Final

✅ **INTEGRACIÓN COMPLETADA**

El tool `getComponentCode` ahora es el método principal para extraer código desde Storybook, proporcionando mayor confiabilidad y mejor manejo de diferentes fuentes de código (implementation, historia solicitada, docs).

