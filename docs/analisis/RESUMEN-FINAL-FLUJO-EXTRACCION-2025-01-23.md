# 📋 Resumen Final: Qué se Extrae de Storybook

**Fecha:** 2025-01-23  
**Pregunta:** ¿Revisar si extrajimos todo de Storybook? Solo el HTML.

---

## ✅ Respuesta Directa

**❌ NO, solo se extrae HTML.** Aunque el sistema tiene capacidad para extraer más, **solo se usa el HTML**.

---

## 🔍 Análisis del Flujo de Extracción

### 1. Función de Extracción: `extractExactCodeFromStorybookWithBrowser`

**Ubicación:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Lo que retorna:**
```typescript
return {
  html: codeFromTab.html,      // ✅ HTML del componente
  css: cssUrls,                 // ⚠️ URLs de CSS (array)
  js: codeFromTab.js || '',     // ⚠️ JavaScript (string)
  structure,                    // ✅ Estructura del componente
  sourceCodeMatch,              // ✅ Match con código fuente
  cssUrls,                      // ⚠️ URLs de CSS (duplicado)
};
```

**Lo que se extrae:**
- ✅ **HTML:** Se extrae correctamente desde código fuente local, URL de historia, o Docs
- ✅ **CSS URLs:** Se extraen correctamente con `extractCSSUrls()`
- ⚠️ **JavaScript:** Se intenta extraer pero generalmente está vacío (`''`)
- ❌ **Bundle UMD:** NO se extrae (no hay función para esto)
- ❌ **Código de inicialización:** NO se extrae (no hay función para esto)

### 2. Función de Extracción de CSS: `extractCSSUrls`

**Ubicación:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts:431-448`

**Lo que hace:**
```typescript
async function extractCSSUrls(
  componentId: string,
  storybookBaseUrl: string
): Promise<string[]> {
  const cssUrls: string[] = [];
  
  // CSS principal del componente
  cssUrls.push(
    `${storybookBaseUrl}/components/${componentId}/src/styles/${componentId}.css`
  );
  
  // CSS de dependencias comunes (solo para modal)
  if (componentId.includes('modal')) {
    cssUrls.push(`${storybookBaseUrl}/components/button/src/styles/button.css`);
  }
  
  return cssUrls;
}
```

**Problemas:**
- ⚠️ Solo detecta dependencias para `modal` (hardcoded)
- ❌ No detecta dependencias automáticamente para otros componentes
- ❌ No verifica que las URLs existan realmente

### 3. Uso en `autorunApplyModeB`

**Ubicación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts:1815-1842`

**Lo que se usa:**
```typescript
const exactCode = await extractExactCodeFromStorybookWithBrowser(
  componentId,
  storyName
);

if (exactCode && exactCode.html) {
  codeToInsert = exactCode.html;  // ✅ Solo se usa el HTML
  
  // ❌ exactCode.cssUrls NO se usa
  // ❌ exactCode.js NO se usa
  // ❌ exactCode.css NO se usa
}
```

**Problema:** Aunque `exactCode` contiene `cssUrls` y `js`, **NO se usan** para insertar en el HTML.

---

## 📊 Tabla Comparativa: Qué se Extrae vs Qué se Usa

| Elemento | Se Extrae | Se Retorna | Se Usa | Estado |
|----------|-----------|------------|--------|--------|
| HTML del componente | ✅ | ✅ | ✅ | ✅ OK |
| CSS URLs | ✅ | ✅ | ❌ | ❌ **NO SE USA** |
| JavaScript (código) | ⚠️ Parcial | ✅ | ❌ | ❌ **NO SE USA** |
| JavaScript (bundle UMD) | ❌ | ❌ | ❌ | ❌ **NO SE EXTRAE** |
| Código de inicialización | ❌ | ❌ | ❌ | ❌ **NO SE EXTRAE** |
| Dependencias (componentes internos) | ⚠️ Parcial | ⚠️ Parcial | ❌ | ❌ **NO SE USA** |

---

## 🚨 Problemas Identificados

### Problema #1: CSS se Extrae pero NO se Usa

**Evidencia:**
```typescript
// ✅ Se extrae:
const cssUrls = await extractCSSUrls(componentId, activeConfig.url);
// Retorna: ["https://.../data-view.css"]

// ❌ NO se usa:
codeToInsert = exactCode.html;  // Solo HTML, sin CSS
```

**Solución:** Insertar CSS automáticamente:
```typescript
if (exactCode.cssUrls && exactCode.cssUrls.length > 0) {
  const cssLinks = exactCode.cssUrls
    .map(url => `<link rel="stylesheet" href="${url}">`)
    .join('\n');
  codeToInsert = `${cssLinks}\n${codeToInsert}`;
}
```

### Problema #2: JavaScript NO se Extrae

**Evidencia:**
- ❌ No hay función para extraer bundle UMD
- ❌ No hay función para extraer código de inicialización
- ⚠️ `exactCode.js` generalmente está vacío (`''`)

**Solución:** Implementar funciones de extracción:
```typescript
// Extraer bundle UMD
async function extractUMDBundleUrl(componentId: string): Promise<string | null> {
  // Buscar en /components/{componentId}/dist/{componentId}.umd.js
}

// Extraer código de inicialización
function extractInitializationCode(html: string, componentId: string): string | null {
  // Buscar window.createX, window.UBITS.X.create
}
```

### Problema #3: Dependencias NO se Detectan Automáticamente

**Evidencia:**
- ⚠️ Solo se detectan dependencias para `modal` (hardcoded)
- ❌ No se detectan dependencias para otros componentes (ej: DataView usa Button)

**Solución:** Analizar HTML extraído para detectar componentes internos:
```typescript
// Detectar componentes internos desde HTML
function detectInternalComponents(html: string): string[] {
  // Buscar clases ubits-* que indiquen componentes internos
  // Retornar lista de componentes detectados
}
```

---

## ✅ Conclusión

**Respuesta a la pregunta:** ❌ **NO, solo se extrae HTML.** Aunque el sistema tiene capacidad para extraer CSS URLs, estas **NO se usan** para insertar en el HTML. JavaScript (bundle UMD) y código de inicialización **NO se extraen** en absoluto.

**Lo que se necesita:**
1. ✅ Usar `exactCode.cssUrls` para insertar CSS automáticamente
2. ✅ Implementar extracción de bundle UMD
3. ✅ Implementar extracción de código de inicialización
4. ✅ Detectar dependencias automáticamente

**Próximo Paso:** Implementar las mejoras propuestas en `PLAN-SOLUCION-COMPONENTES-NO-SE-VEN-2025-01-23.md`

