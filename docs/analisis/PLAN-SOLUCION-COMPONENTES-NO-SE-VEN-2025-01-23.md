# 🎯 Plan de Solución: Componentes No Se Ven Después de Implementarlos

**Fecha:** 2025-01-23  
**Objetivo:** Implementar extracción e inserción automática de CSS, JS y código de inicialización para que los componentes se vean inmediatamente.

---

## 📊 Estado Actual vs Estado Deseado

### Estado Actual ❌

```typescript
// ✅ Se extrae:
{
  html: "<div class='ubits-data-view'>...</div>",  // ✅ HTML
  cssUrls: ["https://.../data-view.css"],          // ⚠️ URLs pero NO se insertan
  js: ""                                            // ❌ No se extrae
}

// ❌ Se inserta solo:
<div class='ubits-data-view'>...</div>  // Sin CSS, sin JS, sin init
```

**Resultado:** Componente no se ve (sin estilos, sin funcionalidad)

### Estado Deseado ✅

```typescript
// ✅ Se extrae TODO:
{
  html: "<div class='ubits-data-view'>...</div>",
  cssUrls: ["https://.../data-view.css"],
  jsBundle: "https://.../data-view.umd.js",
  initialization: "window.UBITSDataView.createDataView(...)"
}

// ✅ Se inserta TODO:
<link rel="stylesheet" href="https://.../data-view.css">
<div class='ubits-data-view'>...</div>
<script src="https://.../data-view.umd.js"></script>
<script>
  window.UBITSDataView.createDataView({...});
</script>
```

**Resultado:** Componente se ve correctamente inmediatamente

---

## 🔧 Implementación Propuesta

### Fase 1: Mejorar Extracción de Dependencias

#### 1.1. Extraer Bundle UMD Automáticamente

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

```typescript
/**
 * Detecta y extrae la URL del bundle UMD de un componente
 */
async function extractUMDBundleUrl(
  componentId: string,
  storybookBaseUrl: string
): Promise<string | null> {
  // Patrones posibles para bundles UMD
  const possiblePaths = [
    `${storybookBaseUrl}/components/${componentId}/dist/${componentId}.umd.js`,
    `${storybookBaseUrl}/components/${componentId}/dist/index.umd.js`,
    `${storybookBaseUrl}/components/${componentId}/dist/${componentId}.js`,
  ];

  // Verificar cuál existe
  for (const url of possiblePaths) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        console.log(`   ✅ Bundle UMD encontrado: ${url}`);
        return url;
      }
    } catch (error) {
      // Continuar con siguiente
    }
  }

  console.warn(`   ⚠️ No se encontró bundle UMD para ${componentId}`);
  return null;
}
```

#### 1.2. Extraer Código de Inicialización

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

```typescript
/**
 * Extrae código de inicialización desde el HTML extraído
 */
function extractInitializationCode(
  html: string,
  componentId: string
): string | null {
  // Buscar patrones comunes:
  // 1. window.createX(...)
  // 2. window.UBITS.X.create(...)
  // 3. window.UBITSX.createX(...)
  
  const patterns = [
    // window.createDataView, window.createButton, etc.
    new RegExp(`window\\.create${componentId.charAt(0).toUpperCase() + componentId.slice(1)}([\\s\\S]*?);`, 'i'),
    // window.UBITS.DataView.create, etc.
    new RegExp(`window\\.UBITS\\.${componentId.charAt(0).toUpperCase() + componentId.slice(1)}\\.create([\\s\\S]*?);`, 'i'),
    // window.UBITSDataView.createDataView, etc.
    new RegExp(`window\\.UBITS${componentId.charAt(0).toUpperCase() + componentId.slice(1)}([\\s\\S]*?);`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return null;
}
```

#### 1.3. Mejorar Extracción de CSS

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

```typescript
/**
 * Mejora: Extraer CSS desde múltiples fuentes
 */
async function extractCSSUrls(
  componentId: string,
  storybookBaseUrl: string
): Promise<string[]> {
  const cssUrls: string[] = [];

  // CSS principal del componente
  const possiblePaths = [
    `${storybookBaseUrl}/components/${componentId}/src/styles/${componentId}.css`,
    `${storybookBaseUrl}/components/${componentId}/dist/${componentId}.css`,
  ];

  // Verificar cuál existe
  for (const url of possiblePaths) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        cssUrls.push(url);
        break; // Usar el primero que existe
      }
    } catch (error) {
      // Continuar
    }
  }

  // ✅ NUEVO: Detectar dependencias automáticamente
  // Analizar HTML para detectar componentes internos que requieren CSS
  // (ej: DataView usa Button, entonces necesita button.css)

  return cssUrls;
}
```

### Fase 2: Insertar Dependencias Automáticamente

#### 2.1. Modificar `autorunApplyModeB` para Insertar CSS

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Línea ~1820-1842:**

```typescript
if (exactCode && exactCode.html) {
  codeToInsert = exactCode.html;
  
  // ✅ NUEVO: Agregar CSS automáticamente
  if (exactCode.cssUrls && exactCode.cssUrls.length > 0) {
    const cssLinks = exactCode.cssUrls
      .map(url => {
        // Agregar parámetros de bypass si es URL de Vercel
        const separator = url.includes('?') ? '&' : '?';
        const bypassParams = 'x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';
        return `<link rel="stylesheet" href="${url}${separator}${bypassParams}">`;
      })
      .join('\n    ');
    
    // Insertar CSS antes del contenido
    codeToInsert = `${cssLinks}\n    ${codeToInsert}`;
    console.log(`   ✅ CSS agregado automáticamente: ${exactCode.cssUrls.length} archivo(s)`);
  }
}
```

#### 2.2. Insertar Bundle UMD Automáticamente

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

```typescript
// ✅ NUEVO: Después de agregar CSS
if (exactCode && exactCode.html) {
  // ... código anterior ...
  
  // ✅ NUEVO: Agregar bundle UMD si existe
  const umdUrl = await extractUMDBundleUrl(componentId, activeConfig.url);
  if (umdUrl) {
    const separator = umdUrl.includes('?') ? '&' : '?';
    const bypassParams = 'x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';
    const scriptTag = `<script src="${umdUrl}${separator}${bypassParams}"></script>`;
    
    // Insertar script después del contenido
    codeToInsert = `${codeToInsert}\n    ${scriptTag}`;
    console.log(`   ✅ Bundle UMD agregado automáticamente: ${umdUrl}`);
  }
}
```

#### 2.3. Insertar Código de Inicialización

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

```typescript
// ✅ NUEVO: Después de agregar bundle UMD
if (exactCode && exactCode.html) {
  // ... código anterior ...
  
  // ✅ NUEVO: Extraer e insertar código de inicialización
  const initCode = extractInitializationCode(exactCode.html, componentId);
  if (initCode) {
    // Generar código de inicialización completo
    const fullInitCode = generateFullInitializationCode(
      componentId,
      initCode,
      options // Opciones del componente
    );
    
    const scriptInit = `<script>\n      ${fullInitCode}\n    </script>`;
    codeToInsert = `${codeToInsert}\n    ${scriptInit}`;
    console.log(`   ✅ Código de inicialización agregado automáticamente`);
  }
}
```

### Fase 3: Verificación Post-Implementación

#### 3.1. Crear Función de Verificación

**Archivo:** `packages/autorun-core/src/helpers/postImplementationVerification.ts` (NUEVO)

```typescript
/**
 * Verifica que un componente implementado se vea correctamente
 */
export async function verifyComponentImplementation(
  targetFile: string,
  componentId: string
): Promise<{
  success: boolean;
  visible: boolean;
  reason?: string;
  missingCSS?: string[];
  missingJS?: string[];
}> {
  const fs = await import('fs/promises');
  const content = await fs.readFile(targetFile, 'utf-8');
  
  const result = {
    success: true,
    visible: true,
    missingCSS: [] as string[],
    missingJS: [] as string[]
  };
  
  // 1. Verificar que el HTML del componente esté presente
  const componentClass = `ubits-${componentId}`;
  if (!content.includes(componentClass) && !content.includes(`data-view-container`)) {
    result.success = false;
    result.visible = false;
    result.reason = `HTML del componente no encontrado (buscando: ${componentClass})`;
    return result;
  }
  
  // 2. Verificar CSS
  const { extractCSSUrls } = await import('./storybookExactCodeExtractorWithBrowser');
  const cssUrls = await extractCSSUrls(componentId, 'https://ubits-storybook10.vercel.app');
  for (const cssUrl of cssUrls) {
    if (!content.includes(cssUrl)) {
      result.missingCSS.push(cssUrl);
      result.success = false;
    }
  }
  
  // 3. Verificar JS (bundle UMD)
  const umdUrl = await extractUMDBundleUrl(componentId, 'https://ubits-storybook10.vercel.app');
  if (umdUrl && !content.includes(umdUrl)) {
    result.missingJS.push(umdUrl);
    result.success = false;
  }
  
  // 4. Verificar código de inicialización
  const hasInitCode = content.includes(`window.create${componentId.charAt(0).toUpperCase() + componentId.slice(1)}`) ||
                      content.includes(`window.UBITS`) ||
                      content.includes(`createDataView`) ||
                      content.includes(`createButton`);
  
  if (!hasInitCode && umdUrl) {
    result.success = false;
    result.reason = 'Código de inicialización no encontrado';
  }
  
  if (!result.success) {
    result.visible = false;
    result.reason = result.reason || 
      `Faltan dependencias: CSS (${result.missingCSS.length}), JS (${result.missingJS.length})`;
  }
  
  return result;
}
```

#### 3.2. Integrar Verificación en `autorunApplyModeB`

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

```typescript
// ✅ NUEVO: Después de línea 2016
if (!input.options?.dryRun) {
  await adapter.insertContentBlock(targetFile, wrappedContent);
  filesWritten.push(targetFile);
  console.log(`   ✅ Código insertado con watermark v2`);
  
  // ✅ NUEVO: Verificar implementación
  if (componentExists) {
    const { verifyComponentImplementation } = await import(
      '../../helpers/postImplementationVerification.js'
    );
    const verification = await verifyComponentImplementation(
      targetFile,
      componentId
    );
    
    if (!verification.success) {
      warnings.push(`⚠️ Componente implementado pero puede no verse: ${verification.reason}`);
      if (verification.missingCSS && verification.missingCSS.length > 0) {
        warnings.push(`   - CSS faltante: ${verification.missingCSS.join(', ')}`);
      }
      if (verification.missingJS && verification.missingJS.length > 0) {
        warnings.push(`   - JS faltante: ${verification.missingJS.join(', ')}`);
      }
    } else {
      console.log(`   ✅ Verificación post-implementación: Componente debería verse correctamente`);
    }
  }
}
```

### Fase 4: Herramienta MCP Dedicada (Opcional)

#### 4.1. Crear `autorun.storybook.implement`

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunStorybookImplement.ts` (NUEVO)

```typescript
/**
 * autorun.storybook.implement
 * 
 * Implementa un componente COMPLETO desde Storybook:
 * - Extrae HTML, CSS, JS, código de inicialización
 * - Inserta TODO automáticamente
 * - Verifica que se vea correctamente
 */
export async function autorunStorybookImplement(
  input: AutorunStorybookImplementInput
): Promise<AutorunStorybookImplementOutput> {
  // 1. Extraer TODO
  const completeCode = await extractCompleteCodeFromStorybook(
    input.componentId,
    input.storyName
  );
  
  // 2. Insertar TODO
  await insertCompleteImplementation(
    input.targetFile,
    completeCode
  );
  
  // 3. Verificar
  const verification = await verifyComponentImplementation(
    input.targetFile,
    input.componentId
  );
  
  return {
    success: verification.success,
    html: completeCode.html,
    css: completeCode.css,
    js: completeCode.js,
    initialization: completeCode.initialization,
    verification
  };
}
```

---

## 📋 Checklist de Implementación

### Prioridad Alta (Implementar Primero)

- [ ] **1.1.** Implementar `extractUMDBundleUrl()` en `storybookExactCodeExtractorWithBrowser.ts`
- [ ] **1.2.** Implementar `extractInitializationCode()` en `storybookExactCodeExtractorWithBrowser.ts`
- [ ] **1.3.** Mejorar `extractCSSUrls()` para detectar dependencias automáticamente
- [ ] **2.1.** Modificar `autorunApplyModeB` para insertar CSS automáticamente
- [ ] **2.2.** Modificar `autorunApplyModeB` para insertar bundle UMD automáticamente
- [ ] **2.3.** Modificar `autorunApplyModeB` para insertar código de inicialización

### Prioridad Media

- [ ] **3.1.** Crear `postImplementationVerification.ts` con función de verificación
- [ ] **3.2.** Integrar verificación en `autorunApplyModeB`
- [ ] **4.1.** Crear herramienta MCP `autorun.storybook.implement` (opcional)

---

## 🧪 Testing

### Test Case 1: DataView

**Input:**
```typescript
autorun.apply({
  message: "implementa un data view",
  targetFiles: ["prototypes/canvas-administrador-encuestas-2025-12-23.html"]
})
```

**Expected Output:**
```html
<!-- ✅ CSS agregado automáticamente -->
<link rel="stylesheet" href="https://ubits-storybook10.vercel.app/components/data-view/src/styles/data-view.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT">

<!-- ✅ HTML del componente -->
<div class="ubits-data-view">...</div>

<!-- ✅ Bundle UMD agregado automáticamente -->
<script src="https://ubits-storybook10.vercel.app/components/data-view/dist/data-view.umd.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT"></script>

<!-- ✅ Código de inicialización agregado automáticamente -->
<script>
  window.UBITSDataView.createDataView({...});
</script>
```

**Verificación:**
- ✅ CSS está en el HTML
- ✅ JS está en el HTML
- ✅ Código de inicialización está en el HTML
- ✅ Componente se ve en el navegador

---

## 📝 Notas de Implementación

### Consideraciones

1. **Orden de Inserción:**
   - CSS debe ir ANTES del HTML del componente
   - JS (bundle UMD) debe ir DESPUÉS del HTML
   - Código de inicialización debe ir DESPUÉS del bundle UMD

2. **Detección de Dependencias:**
   - Analizar HTML extraído para detectar componentes internos
   - Extraer CSS de componentes internos automáticamente
   - Extraer JS de componentes internos automáticamente

3. **Manejo de Errores:**
   - Si CSS no se encuentra, continuar pero agregar warning
   - Si JS no se encuentra, continuar pero agregar warning
   - Si código de inicialización no se encuentra, generar código básico

4. **Compatibilidad:**
   - Mantener compatibilidad con código existente
   - No romper implementaciones anteriores
   - Agregar flags opcionales para deshabilitar inserción automática si es necesario

---

## 🎯 Resultado Esperado

Después de implementar estas mejoras:

1. ✅ **Los componentes se verán inmediatamente** después de implementarlos
2. ✅ **No será necesario hacer logs adicionales** para detectar qué falta
3. ✅ **CSS, JS y código de inicialización se insertarán automáticamente**
4. ✅ **Verificación post-implementación detectará problemas automáticamente**

---

**Próximo Paso:** Implementar Fase 1 (Mejorar Extracción de Dependencias)

