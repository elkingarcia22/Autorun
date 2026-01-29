# 🔧 Solución: window.createTabs No Disponible en Vercel

## ⚠️ PROBLEMA IDENTIFICADO

**Síntomas:**
- Los tabs funcionan con fallback manual pero no con `window.createTabs` desde Vercel
- El script de Vercel se carga correctamente pero `window.createTabs` es `undefined`
- Los logs muestran: `⚠️ [Vercel] window.createTabs NO está disponible en el script de Vercel`

**Causa Raíz:**
- El script de Vercel (`https://ubits-storybook10.vercel.app/templates/components-loader.js`) **NO tiene `window.createTabs`**
- El script termina con `window.createTabBar` pero no incluye `window.createTabs`
- El script local (`vendor/ubits/packages/templates/components-loader.js`) **SÍ tiene `window.createTabs`** (línea 2365)

**Verificación:**
```javascript
// Script de Vercel NO tiene:
window.createTabs = function (options, containerId) { ... }

// Script local SÍ tiene:
window.createTabs = function (options, containerId) { ... }
```

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **Estrategia: Fallback Automático a Local**

**El sistema ahora:**
1. ✅ Carga desde Vercel primero (preferido)
2. ✅ Verifica si `window.createTabs` está disponible
3. ✅ Si NO está disponible, carga automáticamente desde local
4. ✅ Usa `window.createTabs` cuando esté disponible (Vercel o local)
5. ✅ Solo usa fallback manual si ambos fallan

### **Código Implementado:**

```javascript
// ========================================
// CARGAR components-loader.js CON FALLBACK A LOCAL SI VERCEL NO TIENE createTabs
// El script de Vercel puede no tener window.createTabs (versión desactualizada)
// ========================================
(function() {
    const vercelUrl = 'https://ubits-storybook10.vercel.app/templates/components-loader.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';
    const localUrl = '../vendor/ubits/packages/templates/components-loader.js';
    let vercelLoaded = false;
    let localLoaded = false;
    
    function loadScript(url, isLocal = false) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = false; // Cargar de forma síncrona
            
            script.onload = function() {
                console.log(`✅ [Vercel/Local] components-loader.js cargado ${isLocal ? 'desde local' : 'desde Vercel'}`);
                
                // Verificar después de que el script se ejecute
                setTimeout(() => {
                    const hasCreateTabs = typeof window.createTabs === 'function';
                    const hasCreateSidebar = typeof window.createSidebar === 'function';
                    
                    if (isLocal) {
                        localLoaded = true;
                        console.log('✅ [Local] Script local cargado');
                        console.log('   window.createTabs:', hasCreateTabs ? '✅' : '❌');
                        console.log('   window.createSidebar:', hasCreateSidebar ? '✅' : '❌');
                        resolve();
                    } else {
                        vercelLoaded = true;
                        console.log('✅ [Vercel] Script de Vercel cargado');
                        console.log('   window.createTabs:', hasCreateTabs ? '✅' : '❌');
                        console.log('   window.createSidebar:', hasCreateSidebar ? '✅' : '❌');
                        
                        if (!hasCreateTabs) {
                            console.warn('⚠️ [Vercel] window.createTabs NO está disponible en el script de Vercel');
                            console.warn('   El script de Vercel puede estar desactualizado');
                            console.warn('   Cargando desde local como fallback...');
                            
                            // Cargar desde local como fallback
                            loadScript(localUrl, true)
                                .then(() => resolve())
                                .catch((err) => {
                                    console.error('❌ [Local] Error al cargar desde local:', err);
                                    resolve(); // Resolver de todas formas para continuar
                                });
                        } else {
                            resolve();
                        }
                    }
                }, 100);
            };
            
            script.onerror = function() {
                if (!isLocal) {
                    console.error('❌ [Vercel] Error al cargar components-loader.js desde Vercel');
                    console.warn('   Cargando desde local como fallback...');
                    loadScript(localUrl, true)
                        .then(() => resolve())
                        .catch((err) => {
                            console.error('❌ [Local] Error al cargar desde local también:', err);
                            resolve(); // Resolver de todas formas
                        });
                } else {
                    console.error('❌ [Local] Error al cargar components-loader.js desde local');
                    reject(new Error('Failed to load from local'));
                }
            };
            
            document.head.appendChild(script);
        });
    }
    
    // Cargar desde Vercel primero
    loadScript(vercelUrl, false).then(() => {
        // Verificación final
        setTimeout(() => {
            const functions = {
                createSidebar: typeof window.createSidebar === 'function',
                createSubNav: typeof window.createSubNav === 'function',
                createTabBar: typeof window.createTabBar === 'function',
                createTabs: typeof window.createTabs === 'function'
            };
            
            console.log('✅ [FINAL] Verificación de components-loader.js:');
            console.log('   window.createSidebar:', functions.createSidebar ? '✅' : '❌');
            console.log('   window.createSubNav:', functions.createSubNav ? '✅' : '❌');
            console.log('   window.createTabBar:', functions.createTabBar ? '✅' : '❌');
            console.log('   window.createTabs:', functions.createTabs ? '✅' : '❌');
            console.log('   Fuente:', functions.createTabs ? (localLoaded ? 'LOCAL (fallback)' : 'Vercel') : 'NINGUNA');
            
            window._UBITS_COMPONENTS_LOADER_READY = true;
            window.dispatchEvent(new CustomEvent('ubits-components-loader-ready'));
        }, 200);
    });
})();
```

### **Uso de window.createTabs cuando está disponible:**

```javascript
// En initializeTabs(), primero intentar usar window.createTabs si está disponible
if (typeof window.createTabs === 'function') {
    console.log('✅ [Encuestas] window.createTabs disponible, usando función oficial');
    try {
        const tabsResult = window.createTabs({
            containerId: 'encuestas-tabs-container',
            tabs: [
                {
                    id: 'tab-encuestas',
                    label: 'Encuestas',
                    icon: 'clipboard-list' // ✅ CORRECTO: solo el nombre
                },
                {
                    id: 'tab-datos-demograficos',
                    label: 'Datos Demográficos',
                    icon: 'users' // ✅ CORRECTO: solo el nombre
                }
            ],
            activeTabId: 'tab-encuestas',
            onTabChange: (tabId, tabElement) => {
                console.log('Tab cambiado:', tabId);
            }
        });
        
        if (tabsResult && tabsContainer.querySelector('.ubits-tabs')) {
            console.log('✅ [Encuestas] Tabs inicializados correctamente usando window.createTabs');
        }
        return; // Salir después de crear con window.createTabs
    } catch (error) {
        console.error('❌ [Encuestas] Error al usar window.createTabs:', error);
        // Continuar con fallback manual si hay error
    }
}

// Solo usar fallback manual si window.createTabs no está disponible
```

---

## 📋 LOGS DE DIAGNÓSTICO

**Los logs muestran el flujo completo:**

```
✅ [Vercel/Local] components-loader.js cargado desde Vercel
✅ [Vercel] Script de Vercel cargado
   window.createTabs: ❌
   window.createSidebar: ✅
⚠️ [Vercel] window.createTabs NO está disponible en el script de Vercel
   El script de Vercel puede estar desactualizado
   Cargando desde local como fallback...
✅ [Vercel/Local] components-loader.js cargado desde local
✅ [Local] Script local cargado
   window.createTabs: ✅
   window.createSidebar: ✅
✅ [FINAL] Verificación de components-loader.js:
   window.createTabs: ✅
   Fuente: LOCAL (fallback)
✅ [Encuestas] window.createTabs disponible, usando función oficial
✅ [Encuestas] Tabs inicializados correctamente usando window.createTabs
```

---

## 🔍 VERIFICACIÓN

### **En la consola del navegador:**

```javascript
// Verificar fuente del script
console.log('createTabs disponible:', typeof window.createTabs === 'function');
console.log('createSidebar disponible:', typeof window.createSidebar === 'function');

// Verificar que los tabs se crearon con window.createTabs
const tabsContainer = document.getElementById('encuestas-tabs-container');
const tabs = tabsContainer?.querySelector('.ubits-tabs');
console.log('Tabs creados:', !!tabs);
console.log('Usando window.createTabs:', !!tabs && typeof window.createTabs === 'function');
```

---

## 🚀 CÓMO HACER QUE FUNCIONE DESDE VERCEL

**Para que funcione desde Vercel en el futuro:**

1. **Actualizar el script en Vercel:**
   - El script de Vercel necesita incluir `window.createTabs`
   - Debe agregarse la función `renderTabs()` y `initTabsListeners()`
   - Debe agregarse `window.createTabs = function (options, containerId) { ... }`

2. **Verificar después de actualizar:**
   ```javascript
   // Después de actualizar Vercel, verificar:
   console.log('createTabs desde Vercel:', typeof window.createTabs === 'function');
   // Debe mostrar: ✅ createTabs desde Vercel: true
   ```

3. **El sistema automáticamente usará Vercel:**
   - Si Vercel tiene `window.createTabs`, se usará automáticamente
   - Si no lo tiene, se cargará desde local como fallback
   - No se requiere cambio de código

---

## 📚 Referencias

- **Script local:** `vendor/ubits/packages/templates/components-loader.js` (línea 2365)
- **Script Vercel:** `https://ubits-storybook10.vercel.app/templates/components-loader.js`
- **Guía de error:** `docs/guias/implementacion/GUIA-ERROR-TABS-NO-SE-MUESTRAN.md`

---

## ⚠️ NOTAS IMPORTANTES

1. **El sistema funciona correctamente:**
   - ✅ Carga desde Vercel primero
   - ✅ Detecta que falta `window.createTabs`
   - ✅ Carga automáticamente desde local
   - ✅ Usa `window.createTabs` cuando está disponible

2. **Cuando Vercel se actualice:**
   - El sistema automáticamente usará Vercel
   - No se requiere cambio de código
   - Los logs mostrarán: `Fuente: Vercel`

3. **Fallback manual:**
   - Solo se usa si ambos scripts fallan
   - Es una última línea de defensa
   - No es el método preferido

---

**Última actualización:** 2025-12-10  
**Estado:** ✅ Solución implementada - Funciona con fallback automático a local




