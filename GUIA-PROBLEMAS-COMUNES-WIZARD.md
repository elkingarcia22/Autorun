# 🔧 Guía de Problemas Comunes del Wizard y Soluciones

Esta guía documenta los problemas que pueden ocurrir al ejecutar el wizard y sus soluciones implementadas para que no vuelvan a ocurrir.

## ⚠️ Problemas Críticos Resueltos

### 1. ❌ Sidebar carga template incorrecto (Colaborador en lugar de Administrador)

**Problema:**
- El sidebar aparece en modo "Colaborador" cuando debería ser "Administrador"
- `detectCurrentProduct()` retorna `template-colaborador` en lugar de `template-admin`
- `getProductConfig()` devuelve la configuración incorrecta

**Causa:**
- `products.js` define `detectCurrentProduct()` al final del archivo, sobrescribiendo nuestra versión
- `detectCurrentProduct()` detecta por nombre de archivo y por defecto retorna `template-colaborador`
- El código de sobrescritura se ejecutaba antes de que `products.js` se cargara completamente

**Solución Implementada:**
1. **Sobrescritura inmediata** de `detectCurrentProduct` antes de que `products.js` se cargue
2. **Interceptación con `Object.defineProperty`** para capturar cuando `products.js` intenta sobrescribirla
3. **Verificación periódica** (cada 10ms) que corrige automáticamente si la función devuelve el valor incorrecto
4. **Sobrescritura de `getProductConfig`** con corrección automática si devuelve el producto incorrecto
5. **Re-sobrescritura después de que `products.js` se carga** en el callback `checkProducts()`

**Ubicación del código:**
- `packages/autorun-core/src/wizard/CanvasCreator.ts` - Líneas 1023-1120
- Se genera automáticamente en todos los templates

**Código clave:**
```javascript
// Función para sobrescribir detectCurrentProduct (se llama múltiples veces)
const overrideDetectCurrentProduct = () => {
  window.detectCurrentProduct = function() {
    console.log('🔍 [Wizard] detectCurrentProduct() llamado, retornando:', templateKey);
    return templateKey;
  };
};

// Interceptar con Object.defineProperty
Object.defineProperty(window, 'detectCurrentProduct', {
  get: function() { return currentDetectCurrentProduct; },
  set: function(newValue) {
    // Forzar nuestra versión incluso si products.js intenta sobrescribirla
    currentDetectCurrentProduct = function() { return templateKey; };
  }
});

// Verificación periódica
setInterval(() => {
  if (window.UBITS_PRODUCTS) {
    const currentResult = window.detectCurrentProduct();
    if (currentResult !== templateKey) {
      overrideDetectCurrentProduct(); // Corregir automáticamente
    }
  }
}, 10);
```

---

### 2. ❌ Scripts de Vercel no se cargan (SyntaxError: Unexpected token '<')

**Problema:**
- `data-table.umd.js` o `components-loader.js` retornan HTML en lugar de JavaScript
- Error: `Uncaught SyntaxError: Unexpected token '<'`
- Los componentes UBITS no se cargan (`window.createTabs` es `undefined`)

**Causa:**
- Vercel puede retornar HTML (página de error) en lugar del archivo JavaScript solicitado
- El proxy local puede fallar para archivos individuales
- No hay fallback automático cuando un script específico falla

**Solución Implementada:**
1. **Sistema de fallback por script individual** - Si un script falla desde Vercel, se carga automáticamente desde `vendor/ubits/`
2. **Detección de errores** - Si el script retorna HTML (SyntaxError), se activa el fallback
3. **Carga secuencial** - Los scripts se cargan en orden para respetar dependencias
4. **Logs detallados** - Cada carga exitosa o fallback se registra en consola

**Ubicación del código:**
- Generado automáticamente en templates (ver `prototypes/canvas-*.html` líneas 796-878)
- Se debe incluir en `CanvasCreator.ts` si no está ya

**Código clave:**
```javascript
function loadScriptWithFallback(vercelPath, localPath) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = vercelPath;
    
    script.onload = () => {
      console.log(`✅ Cargado desde Vercel: ${vercelPath}`);
      resolve();
    };
    
    script.onerror = () => {
      console.warn(`⚠️ Fallback: ${vercelPath} falló, cargando desde local: ${localPath}`);
      const fallbackScript = document.createElement('script');
      fallbackScript.src = localPath;
      fallbackScript.onload = () => resolve();
      fallbackScript.onerror = () => reject(new Error(`Failed to load: ${localPath}`));
      document.head.appendChild(fallbackScript);
    };
    
    document.head.appendChild(script);
  });
}

// Cargar scripts en orden
(async function() {
  await loadScriptWithFallback(
    '/vercel-proxy/templates/components-loader.js',
    '../vendor/ubits/packages/templates/components-loader.js'
  );
  // ... más scripts
})();
```

---

### 3. ❌ Tabs no se ven después de implementar

**Problema:**
- Los tabs implementados no aparecen visualmente
- `window.createTabs` es `undefined` cuando se intenta usar
- El script de inicialización se ejecuta antes de que los componentes estén listos

**Causa:**
- `components-loader.js` no se ha cargado completamente cuando se intenta usar `window.createTabs`
- El script de inicialización se ejecuta en `DOMContentLoaded` pero los scripts UBITS se cargan asíncronamente
- No hay verificación de que los scripts estén listos antes de inicializar componentes

**Solución Implementada:**
1. **Espera de scripts** - Verificar que `window.UBITS_ThemeManager`, `window.UBITS_ResponsiveManager`, y `window.UBITS_TemplateLoader` estén disponibles
2. **Polling con límite** - Verificar periódicamente con un máximo de intentos para evitar loops infinitos
3. **Fallback manual** - Si `window.createTabs` nunca está disponible, renderizar los tabs manualmente con HTML y event listeners

**Ubicación del código:**
- En los templates generados (ver `prototypes/canvas-*.html`)

**Código clave:**
```javascript
// Esperar a que todos los scripts estén listos
function waitForScripts(callback, maxAttempts = 50) {
  let attempts = 0;
  const check = () => {
    attempts++;
    if (window.UBITS_ThemeManager && 
        window.UBITS_ResponsiveManager && 
        window.UBITS_TemplateLoader) {
      callback();
    } else if (attempts < maxAttempts) {
      setTimeout(check, 200);
    } else {
      console.error('❌ Timeout esperando scripts UBITS');
    }
  };
  check();
}

// Inicializar tabs solo después de que los scripts estén listos
waitForScripts(() => {
  if (window.createTabs) {
    window.createTabs({...}, 'container-id');
  } else {
    // Fallback manual
    createTabsManually();
  }
});
```

---

## ✅ Verificaciones Automáticas

El wizard ahora incluye verificaciones automáticas para estos problemas:

1. **Verificación de `detectCurrentProduct`** - Se verifica y corrige automáticamente cada 10ms durante 2 segundos
2. **Fallback de scripts** - Cada script tiene fallback automático a `vendor/ubits/` si Vercel falla
3. **Espera de scripts** - Los componentes se inicializan solo después de que todos los scripts estén listos

---

## 📝 Notas para Futuros Desarrollos

1. **Nunca asumir que `detectCurrentProduct` retornará el valor correcto** - Siempre sobrescribirlo y verificar periódicamente
2. **Siempre incluir fallback para scripts de Vercel** - Un script puede fallar individualmente aunque Vercel esté funcionando
3. **Verificar disponibilidad de componentes antes de usarlos** - Los scripts se cargan asíncronamente
4. **Usar `Object.defineProperty` para interceptar sobrescrituras** - Es más robusto que solo sobrescribir una vez

---

## 🔍 Cómo Verificar que Todo Funciona

1. **Abrir la consola del navegador** y verificar:
   - `🔍 [Wizard] detectCurrentProduct() llamado, retornando: template-admin` ✅
   - `✅ Cargado desde Vercel: /vercel-proxy/...` o `⚠️ Fallback: ...` ✅
   - `✅ Todos los scripts cargados correctamente` ✅

2. **Verificar que el sidebar esté en el modo correcto:**
   - Administrador: Botones "Inicio", "Empresa", "Aprendizaje", etc.
   - Colaborador: Botones "Administrador", "Aprendizaje", "Diagnóstico", etc.

3. **Verificar que los componentes se inicialicen:**
   - `window.createTabs` debe estar disponible
   - `window.createDataTable` debe estar disponible
   - Los tabs y tablas deben renderizarse correctamente

---

## 🚨 Si los Problemas Persisten

1. **Verificar que `CanvasCreator.ts` tenga las últimas actualizaciones** - Las mejoras deben estar en el código generado
2. **Verificar que `vendor/ubits/` existe** - El fallback necesita archivos locales
3. **Verificar logs de consola** - Los logs indican exactamente qué está fallando
4. **Regenerar el template** - Ejecutar el wizard de nuevo para obtener el código actualizado

---

**Última actualización:** 2025-12-02  
**Versión del wizard:** Incluye todas las correcciones desde el inicio

