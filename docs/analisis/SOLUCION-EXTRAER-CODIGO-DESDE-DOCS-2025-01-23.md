# ✅ Solución: Extraer Código desde Docs (con botones "Show code")

**Fecha:** 2025-01-23  
**Problema:** Necesitamos extraer código desde la página Docs que tiene botones "Show code", no desde la pestaña "Code"

---

## 🎯 Solución

**Cambiar de:**
- ❌ `/story/component-id--implementation` → Pestaña "Code" (requiere clic)
- ✅ `/docs/component-id--docs` → Código visible con botones "Show code"

---

## 📋 Implementación

### **1. Modificar `extractExactCodeFromStorybookWithBrowser`**

**Cambiar URL de Story a Docs:**
```typescript
// ANTES (Story):
const storyUrl = `${activeConfig.url}/?path=/story/${componentId}--${finalStoryName}`;

// DESPUÉS (Docs):
const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;
```

### **2. Crear función `extractCodeFromDocsSnapshot`**

**Extraer código desde snapshot de Docs:**
```typescript
export async function extractCodeFromDocsSnapshot(
  snapshot: any
): Promise<{ html: string; js?: string }> {
  // 1. Buscar bloques de código en el snapshot
  // Los bloques de código están visibles en Docs con botones "Show code"/"Hide code"
  
  // 2. Buscar elementos con código:
  // - role: "text" o "code" que contenga código HTML/JS
  // - name: contiene código (ej: "window.UBITS.Button.create(...)")
  // - ref: elemento con código visible
  
  // 3. Extraer código de cada bloque encontrado
  // 4. Priorizar código de historia "implementation" si existe
  
  return { html: codeHtml, js: codeJs };
}
```

### **3. Modificar `extractExactCodeFromStorybookWithBrowser`**

**Usar Docs en lugar de Story:**
```typescript
export async function extractExactCodeFromStorybookWithBrowser(
  componentId: string,
  storyName: string = 'default'
): Promise<ExactCodeResult> {
  // ...
  
  // ✅ CAMBIO: Usar Docs en lugar de Story
  const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;
  console.log(`   📚 URL de Docs: ${docsUrl}`);
  
  // ⚠️ CRÍTICO: El agente DEBE navegar a Docs y extraer código desde snapshot
  console.log(`   ⚠️ IMPORTANTE: El agente DEBE navegar a Docs`);
  console.log(`   📋 Instrucciones para el agente:`);
  console.log(`      1. Navegar a: ${docsUrl}`);
  console.log(`      2. El código está visible con botones "Show code"`);
  console.log(`      3. Extraer código desde el snapshot`);
  
  // Si el agente ya navegó a Docs, usar snapshot
  // Si no, usar fetch como fallback (pero Docs carga código dinámicamente)
  try {
    const html = await fetchStorybookPage(docsUrl);
    let codeFromDocs;
    try {
      codeFromDocs = await extractCodeFromDocsHTML(html);
    } catch (extractError: any) {
      // ⚠️ FALLBACK: Si no se puede extraer desde HTML, usar snapshot
      console.warn(`   ⚠️ No se pudo extraer código desde HTML: ${extractError.message}`);
      console.log(`   📋 Intentando obtener código desde snapshot...`);
      
      // El agente debe pasar el snapshot aquí
      // Por ahora, lanzar error para que el agente navegue
      throw new Error(
        'No se pudo extraer código desde HTML. Docs carga código dinámicamente. ' +
        'El agente DEBE navegar a Docs y extraer desde el snapshot después de que se cargue.'
      );
    }
    // ...
  }
}
```

### **4. Crear función `extractCodeFromDocsHTML`**

**Extraer código desde HTML de Docs (fallback):**
```typescript
async function extractCodeFromDocsHTML(html: string): Promise<{
  html: string;
  js?: string;
}> {
  // Buscar bloques de código en Docs
  // Los bloques están en diferentes formatos:
  
  // 1. Bloques con botones "Show code" (código visible)
  const visibleCodeRegex = /<pre[^>]*class="[^"]*docs-code[^"]*"[^>]*>([\s\S]*?)<\/pre>/gi;
  const visibleMatches = Array.from(html.matchAll(visibleCodeRegex));
  
  // 2. Bloques en secciones de ejemplos
  const exampleCodeRegex = /<div[^>]*class="[^"]*docs-story[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  const exampleMatches = Array.from(html.matchAll(exampleCodeRegex));
  
  // 3. Buscar código de historia "implementation" específicamente
  const implementationMatch = html.match(
    /Implementation[^<]*<pre[^>]*>([\s\S]*?)<\/pre>/i
  );
  
  if (implementationMatch) {
    return { html: decodeHtmlEntities(implementationMatch[1]) };
  }
  
  // 4. Usar primer bloque visible
  if (visibleMatches.length > 0) {
    return { html: decodeHtmlEntities(visibleMatches[0][1]) };
  }
  
  // 5. Usar primer ejemplo
  if (exampleMatches.length > 0) {
    return { html: decodeHtmlEntities(exampleMatches[0][1]) };
  }
  
  throw new Error('No se encontró código en Docs. El código se carga dinámicamente.');
}
```

---

## ✅ Ventajas de usar Docs

1. ✅ **Código visible directamente** - No requiere clic en pestaña "Code"
2. ✅ **Múltiples ejemplos** - Docs muestra todas las historias con código
3. ✅ **Código de "implementation" visible** - Si existe, está visible en Docs
4. ✅ **Más fácil de extraer** - El código está en el HTML inicial (aunque puede cargarse dinámicamente)

---

## ⚠️ Limitaciones

1. ⚠️ **Código dinámico** - Docs también carga código dinámicamente con JavaScript
2. ⚠️ **Requiere snapshot** - Necesitamos Browser MCP para obtener código después de que se cargue
3. ⚠️ **Múltiples bloques** - Docs puede tener múltiples bloques de código, necesitamos identificar el correcto

---

## 🎯 Próximos Pasos

1. ✅ Modificar `extractExactCodeFromStorybookWithBrowser` para usar Docs
2. ✅ Crear `extractCodeFromDocsSnapshot` para extraer desde snapshot
3. ✅ Crear `extractCodeFromDocsHTML` como fallback
4. ✅ Probar con Button → Drawer → Inputs

