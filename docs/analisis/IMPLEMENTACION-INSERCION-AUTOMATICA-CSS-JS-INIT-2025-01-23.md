# ✅ Implementación: Inserción Automática de CSS, JS e Init

**Fecha:** 2025-01-23  
**Estado:** ✅ Implementado

---

## 📋 Resumen

Se implementaron mejoras en `autorun.apply()` para insertar automáticamente:
1. ✅ CSS (hojas de estilo)
2. ✅ JavaScript (bundles UMD)
3. ✅ Código de inicialización

**Resultado:** Los componentes ahora se verán correctamente inmediatamente después de implementarlos, sin necesidad de logs adicionales.

---

## 🔧 Cambios Implementados

### 1. Funciones Helper Nuevas

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

#### `extractUMDBundleUrl()`
```typescript
export async function extractUMDBundleUrl(
  componentId: string,
  storybookBaseUrl: string
): Promise<string | null>
```

**Función:** Detecta y extrae la URL del bundle UMD de un componente.

**Patrones probados:**
- `/components/{componentId}/dist/{componentId}.umd.js`
- `/components/{componentId}/dist/index.umd.js`
- `/components/{componentId}/dist/{componentId}.js`

**Verificación:** Usa `HEAD` request para verificar que el bundle existe antes de retornarlo.

#### `extractInitializationCode()`
```typescript
export function extractInitializationCode(
  html: string,
  componentId: string
): string | null
```

**Función:** Extrae código de inicialización desde el HTML extraído.

**Patrones buscados:**
1. `window.create{ComponentName}(...)`
2. `window.UBITS.{ComponentName}.create(...)`
3. `window.UBITS{ComponentName}.create{ComponentName}(...)`
4. `window.UBITS.*.create(...)` (genérico)
5. `window.create*(...)` (genérico)

**Prioridad:** Específico > Genérico

#### `extractCSSUrls()` (Mejorado)

**Mejoras:**
- ✅ Normaliza `componentId` (remueve prefijos)
- ✅ Intenta múltiples rutas posibles
- ✅ Verifica que el CSS existe (usando `HEAD` request)
- ✅ Retorna la primera ruta que existe

---

### 2. Modificaciones en `autorunApplyModeB`

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

#### Inserción Automática de CSS (Línea ~1874)

```typescript
// ✅ NUEVO: Insertar CSS automáticamente
if (exactCode.cssUrls && exactCode.cssUrls.length > 0) {
  const cssLinks = exactCode.cssUrls
    .map((url) => {
      const separator = url.includes('?') ? '&' : '?';
      const bypassParams = `x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${bypassToken}`;
      return `    <link rel="stylesheet" href="${url}${separator}${bypassParams}">`;
    })
    .join('\n');
  
  codeToInsert = `${cssLinks}\n    ${codeToInsert}`;
}
```

**Resultado:** CSS se inserta ANTES del HTML del componente.

#### Inserción Automática de Bundle UMD (Línea ~1900)

```typescript
// ✅ NUEVO: Insertar bundle UMD automáticamente
const umdUrl = await extractUMDBundleUrl(componentId, activeConfig.url);
if (umdUrl) {
  const scriptTag = `<script src="${umdUrl}${separator}${bypassParams}"></script>`;
  codeToInsert = `${codeToInsert}\n${scriptTag}`;
}
```

**Resultado:** Bundle UMD se inserta DESPUÉS del HTML del componente.

#### Inserción Automática de Código de Inicialización (Línea ~1925)

```typescript
// ✅ NUEVO: Insertar código de inicialización automáticamente
const initCode = extractInitializationCode(exactCode.html, componentId);
if (initCode) {
  const scriptInit = `<script>\n      ${initCode}\n    </script>`;
  codeToInsert = `${codeToInsert}\n${scriptInit}`;
}
```

**Resultado:** Código de inicialización se inserta DESPUÉS del bundle UMD.

---

### 3. Deshabilitación Temporal de Código Local

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Cambio:** Se deshabilitó temporalmente la extracción desde código fuente local para probar solo con URL.

**Orden de prioridad actual:**
1. ✅ URL de la historia directamente
2. ✅ Docs (puede requerir Browser MCP)

**Nota:** El código local se puede reactivar fácilmente cuando sea necesario.

---

## 📊 Flujo Completo

### Antes (Solo HTML)

```html
<!-- ❌ Solo HTML -->
<div class="ubits-data-view">...</div>
```

### Después (HTML + CSS + JS + Init)

```html
<!-- ✅ CSS agregado automáticamente -->
<link rel="stylesheet" href="https://.../data-view.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=...">

<!-- ✅ HTML del componente -->
<div class="ubits-data-view">...</div>

<!-- ✅ Bundle UMD agregado automáticamente -->
<script src="https://.../data-view.umd.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=..."></script>

<!-- ✅ Código de inicialización agregado automáticamente -->
<script>
  window.UBITSDataView.createDataView({...});
</script>
```

---

## ✅ Verificaciones Implementadas

### 1. Verificación de CSS
- ✅ Intenta múltiples rutas posibles
- ✅ Verifica que el CSS existe (HEAD request)
- ✅ Agrega parámetros de bypass para Vercel

### 2. Verificación de Bundle UMD
- ✅ Intenta múltiples patrones de URL
- ✅ Verifica que el bundle existe (HEAD request)
- ✅ Agrega parámetros de bypass para Vercel

### 3. Verificación de Código de Inicialización
- ✅ Busca múltiples patrones de inicialización
- ✅ Prioriza patrones específicos sobre genéricos
- ✅ Retorna `null` si no se encuentra (no bloquea)

---

## 🚨 Manejo de Errores

### CSS
- ⚠️ Si no se encuentra CSS, se agrega warning pero NO se bloquea
- ⚠️ Se usa la ruta estándar si no se puede verificar

### Bundle UMD
- ⚠️ Si no se encuentra bundle UMD, se agrega warning pero NO se bloquea
- ⚠️ El componente puede funcionar sin bundle UMD si el código de inicialización está inline

### Código de Inicialización
- ⚠️ Si no se encuentra código de inicialización, se agrega warning pero NO se bloquea
- ⚠️ El componente puede requerir inicialización manual

---

## 📝 Logs de Implementación

### CSS
```
[5.2] Insertando CSS automáticamente...
✅ CSS encontrado: https://.../data-view.css
✅ CSS agregado automáticamente: 1 archivo(s)
```

### Bundle UMD
```
[5.3] Insertando bundle UMD automáticamente...
✅ Bundle UMD encontrado: https://.../data-view.umd.js
✅ Bundle UMD agregado automáticamente: https://.../data-view.umd.js
```

### Código de Inicialización
```
[5.4] Insertando código de inicialización automáticamente...
✅ Código de inicialización encontrado: window.UBITSDataView.createDataView...
✅ Código de inicialización agregado automáticamente
```

---

## 🎯 Resultado Esperado

**Antes:**
- ❌ Componente no se ve (sin CSS)
- ❌ Componente no funciona (sin JS)
- ❌ Requiere logs adicionales para detectar qué falta

**Después:**
- ✅ Componente se ve correctamente (CSS incluido)
- ✅ Componente funciona correctamente (JS incluido)
- ✅ No requiere logs adicionales

---

## 🔄 Próximos Pasos

1. **✅ Probar con componentes reales** (DataView, Button, etc.)
2. **✅ Verificar que no se rompa funcionalidad existente**
3. **✅ Evaluar si necesitamos verificación post-implementación**
4. **✅ Considerar reactivar código local si URL no funciona bien**

---

**Estado:** ✅ Implementado y listo para probar

