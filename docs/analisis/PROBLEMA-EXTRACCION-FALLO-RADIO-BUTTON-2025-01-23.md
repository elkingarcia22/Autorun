# 🔍 Problema: Extracción Falló para RadioButton

**Fecha:** 2025-01-23  
**Problema:** `autorun.apply()` detectó correctamente RadioButton pero la extracción desde Storybook falló  
**Resultado:** Se usó fallback `PrototypeTokenKit` que generó una card genérica

---

## 📋 Resumen del Problema

### **Síntomas:**
- ✅ Detección correcta: "Radio" (storybookId: `formularios-radio-button`)
- ❌ Extracción falló: No se pudo extraer código desde Storybook
- ❌ Resultado: Card genérica con "Radio" en lugar de Radio Button real

### **Flujo que Falló:**

1. **Detección:** ✅ Correcta
   - Detectó "Radio" (aunque debería ser "RadioButton")
   - Mapeó correctamente a `formularios-radio-button`

2. **Extracción:** ❌ Falló
   - `extractExactCodeFromStorybookWithBrowser()` intentó extraer desde Docs
   - Falló porque el código se carga dinámicamente con JavaScript
   - Intentó fallback a `getSourceCode()` que también falló
   - Lanzó error

3. **Fallback:** ⚠️ Usado
   - Mode B capturó el error y usó `PrototypeTokenKit`
   - Generó `generateSimpleCard()` porque el mensaje no contiene palabras clave específicas
   - Resultado: Card genérica con "Radio"

---

## 🔍 Análisis del Código

### **1. Flujo de Extracción en Mode B**

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

```typescript
// Línea 1815-1887
try {
  const exactCode = await extractExactCodeFromStorybookWithBrowser(
    componentId,
    storyName
  );
  if (exactCode && exactCode.html) {
    codeToInsert = exactCode.html;
    componentExists = true;
    // ...
  }
} catch (error: any) {
  console.error(`   ❌ Error extrayendo código desde Storybook: ${error.message}`);
  console.log(`   📦 Usando PrototypeTokenKit como fallback...`);
}

// Línea 1890-1925
if (!componentExists) {
  const tokenKit = new PrototypeTokenKit(tokenRegistry);
  // ...
  // Default: Simple Card
  codeToInsert = tokenKit.generateSimpleCard({
    title: componentName,
    content: `<p>Contenido de ${componentName}</p>`,
  });
}
```

**Problema:** El error se captura silenciosamente y se usa el fallback sin intentar Browser MCP.

### **2. Extracción desde Docs**

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

```typescript
// Línea 60-144
// Intento 1: Fetch Docs page
const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;
const html = await fetchStorybookPage(docsUrl);
const codeFromTab = await extractCodeFromDocs(html, finalStoryName);

// Si falla, intentar Browser MCP
if (!codeFromTab || !codeFromTab.html) {
  console.log(`   📋 Intentando extraer código usando Browser MCP...`);
  console.log(`   ⚠️ IMPORTANTE: El agente DEBE ejecutar Browser MCP:`);
  // ...
  // Fallback a getSourceCode
  const sourceCode = await getSourceCode(componentId);
  // ...
}
```

**Problema:** La función espera que el agente ejecute Browser MCP manualmente, pero no lo hace automáticamente.

---

## ❌ Causa Raíz

**Problema Principal:** `extractExactCodeFromStorybookWithBrowser()` no ejecuta Browser MCP automáticamente.

**Flujo Actual:**
1. Intenta `fetch()` Docs page → ❌ Falla (código dinámico)
2. Imprime instrucciones para el agente → ⚠️ El agente no las ejecuta
3. Intenta `getSourceCode()` → ❌ Falla (archivo no encontrado)
4. Lanza error → ⚠️ Mode B captura y usa fallback

**Problema:** El agente no está ejecutando Browser MCP automáticamente cuando ve las instrucciones.

---

## ✅ Solución Propuesta

### **Opción 1: Ejecutar Browser MCP Automáticamente**

Modificar `extractExactCodeFromStorybookWithBrowser()` para ejecutar Browser MCP automáticamente:

```typescript
// Si fetch falla, ejecutar Browser MCP automáticamente
if (!codeFromTab || !codeFromTab.html) {
  console.log(`   📋 Ejecutando Browser MCP automáticamente...`);
  
  // ⚠️ NUEVO: Ejecutar Browser MCP directamente
  const { callBrowserMCPTool } = await import('../../helpers/browserMCPClient.js');
  
  // 1. Navegar a Docs
  await callBrowserMCPTool('browser_navigate', { url: docsUrl });
  
  // 2. Esperar 2 segundos
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 3. Buscar y hacer clic en "Show code" si es necesario
  const snapshot = await callBrowserMCPTool('browser_snapshot');
  // Buscar botón "Show code" y hacer clic
  
  // 4. Extraer código desde snapshot
  const { extractCodeFromDocsSnapshot } = await import('./extractCodeFromDocsSnapshot');
  codeFromTab = extractCodeFromDocsSnapshot(snapshot);
}
```

**Ventaja:** Automático, no requiere intervención del agente.

**Desventaja:** Requiere crear `browserMCPClient.js` para llamar Browser MCP desde Node.js.

### **Opción 2: Mejorar Manejo de Errores en Mode B**

Modificar Mode B para que NO use fallback si la extracción falla, sino que reporte el error:

```typescript
} catch (error: any) {
  console.error(`   ❌ Error extrayendo código desde Storybook: ${error.message}`);
  
  // ⚠️ NUEVO: NO usar fallback, reportar error
  return {
    success: false,
    filesWritten: [],
    verification: {
      preImplementation: false,
      postImplementation: false,
      errors: [
        `No se pudo extraer código desde Storybook: ${error.message}`,
        'El código se carga dinámicamente y requiere Browser MCP para extraerlo.',
        'Por favor, ejecuta Browser MCP manualmente o implementa la extracción automática.'
      ],
      warnings: [],
    },
    components: [],
    errors: [`No se pudo extraer código desde Storybook: ${error.message}`],
  };
}
```

**Ventaja:** Fuerza a implementar la extracción correcta.

**Desventaja:** Bloquea la implementación hasta que se solucione.

### **Opción 3: Implementar Extracción Automática con Browser MCP**

Crear un módulo que ejecute Browser MCP automáticamente cuando la extracción falla:

```typescript
// packages/autorun-core/src/helpers/browserMCPAutoExtractor.ts
export async function extractWithBrowserMCP(
  componentId: string,
  storyName: string
): Promise<ExactCodeResult> {
  // 1. Navegar a Docs
  // 2. Esperar carga
  // 3. Buscar "Show code" y hacer clic
  // 4. Extraer desde snapshot
  // 5. Retornar código
}
```

**Ventaja:** Solución completa y reutilizable.

**Desventaja:** Requiere implementación completa.

---

## 📊 Recomendación

**Implementar Opción 3** (Extracción Automática con Browser MCP) porque:
1. ✅ Soluciona el problema de raíz
2. ✅ Es reutilizable para todos los componentes
3. ✅ No requiere intervención del agente
4. ✅ Funciona con código dinámico

**Próximo paso:** Implementar `browserMCPAutoExtractor.ts` y modificar `extractExactCodeFromStorybookWithBrowser()` para usarlo cuando `fetch()` falla.

---

## 🔧 Verificación

**Para verificar que funciona:**
1. Implementar extracción automática con Browser MCP
2. Probar con `autorun.apply()` y mensaje "implementa un radio button"
3. Verificar que se extrae código real desde Storybook
4. Verificar que se implementa Radio Button correctamente

