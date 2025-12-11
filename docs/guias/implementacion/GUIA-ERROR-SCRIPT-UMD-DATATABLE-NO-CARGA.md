# 🚨 Guía: Error - Script UMD de DataTable No Se Carga

> **⚠️ CRÍTICO:** Este error ocurre cuando `window.createDataTable` es `undefined` porque el script UMD de DataTable no se está cargando correctamente.

---

## 📋 Resumen del Problema

**Síntoma:**
- `window.createDataTable` es `undefined`
- `window.UBITSDataTable` es `undefined`
- La DataTable no se renderiza
- Logs muestran: `❌ [Encuestas DataTable] window.createDataTable no está disponible`

**Causa:**
- El script `data-table.umd.js` no se está cargando desde ninguna fuente (ni local ni Vercel)
- La ruta del script puede ser incorrecta
- El script puede estar fallando al cargar (CORS, 404, etc.)

---

## ✅ SOLUCIÓN COMPLETA

### **PASO 1: Verificar que el Script UMD Esté en el HTML** ⚠️ OBLIGATORIO

**ANTES de implementar DataTable, SIEMPRE verificar:**

```html
<!-- ✅ CORRECTO: Script UMD debe estar en el HTML -->
<!-- Opción 1: Desde local (preferido) -->
<script src="/vendor/ubits/packages/components/data-table/dist/data-table.umd.js"></script>

<!-- Opción 2: Desde Vercel (fallback) -->
<script src="https://ubits-storybook10.vercel.app/components/data-table/dist/data-table.umd.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT"></script>
```

**Checklist:**
- [ ] Verificar que el script UMD está en el HTML
- [ ] Verificar que la ruta es correcta (local o Vercel)
- [ ] Verificar que el script se carga antes de intentar usar `window.createDataTable`

---

### **PASO 2: Cargar Script con Fallback Automático** ⚠️ OBLIGATORIO

**SIEMPRE usar carga dinámica con fallback:**

```html
<!-- ✅ CORRECTO: Cargar script con fallback automático -->
<script>
    (function() {
        function loadDataTableScript() {
            console.log('🔵 [DataTable UMD] Iniciando carga del script...');
            const script = document.createElement('script');
            // Intentar ruta local primero - LocalServer sirve desde /vendor/ubits/...
            script.src = '/vendor/ubits/packages/components/data-table/dist/data-table.umd.js';
            console.log('🔵 [DataTable UMD] Intentando cargar desde:', script.src);
            
            script.onload = function() {
                console.log('✅ [DataTable UMD] Script cargado desde local, verificando createDataTable...');
                console.log('typeof window.createDataTable:', typeof window.createDataTable);
                console.log('window.UBITSDataTable:', window.UBITSDataTable);
                
                if (typeof window.createDataTable === 'function') {
                    console.log('✅ [DataTable UMD] window.createDataTable está disponible');
                } else if (window.UBITSDataTable && typeof window.UBITSDataTable.createDataTable === 'function') {
                    console.log('✅ [DataTable UMD] window.UBITSDataTable.createDataTable está disponible, asignando a window.createDataTable');
                    window.createDataTable = window.UBITSDataTable.createDataTable;
                } else {
                    console.warn('⚠️ [DataTable UMD] createDataTable no encontrado en local, intentando desde Vercel...');
                    loadDataTableFromVercel();
                }
            };
            
            script.onerror = function(err) {
                console.warn('⚠️ [DataTable UMD] Error al cargar desde local:', err);
                console.warn('⚠️ [DataTable UMD] Intentando desde Vercel...');
                loadDataTableFromVercel();
            };
            
            document.head.appendChild(script);
        }
        
        function loadDataTableFromVercel() {
            const fallbackScript = document.createElement('script');
            fallbackScript.src = 'https://ubits-storybook10.vercel.app/components/data-table/dist/data-table.umd.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';
            fallbackScript.onload = function() {
                console.log('✅ [DataTable UMD] Script cargado desde Vercel');
                console.log('typeof window.createDataTable:', typeof window.createDataTable);
                console.log('window.UBITSDataTable:', window.UBITSDataTable);
                if (window.UBITSDataTable && typeof window.UBITSDataTable.createDataTable === 'function' && !window.createDataTable) {
                    console.log('✅ [DataTable UMD] Asignando window.UBITSDataTable.createDataTable a window.createDataTable');
                    window.createDataTable = window.UBITSDataTable.createDataTable;
                }
            };
            fallbackScript.onerror = function(err) {
                console.error('❌ [DataTable UMD] Error al cargar script desde Vercel:', err);
            };
            document.head.appendChild(fallbackScript);
        }
        
        // Cargar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadDataTableScript);
        } else {
            // DOM ya está listo
            loadDataTableScript();
        }
    })();
</script>
```

---

### **PASO 3: Verificar Disponibilidad ANTES de Usar** ⚠️ OBLIGATORIO

**SIEMPRE verificar que `window.createDataTable` esté disponible antes de usarlo:**

```javascript
// ✅ CORRECTO: Verificar disponibilidad con retry logic
function initializeEncuestasDataTable() {
    console.log('🔵 [Encuestas DataTable] Inicializando DataTable...');
    
    const container = document.getElementById('encuestas-table-container');
    if (!container) {
        console.error('❌ [Encuestas DataTable] Contenedor no encontrado');
        return;
    }
    
    // Verificar que createDataTable esté disponible
    console.log('🔵 [Encuestas DataTable] Verificando createDataTable...');
    console.log('🔵 [Encuestas DataTable] typeof window.createDataTable:', typeof window.createDataTable);
    console.log('🔵 [Encuestas DataTable] window.createDataTable existe:', 'createDataTable' in window);
    console.log('🔵 [Encuestas DataTable] window.UBITSDataTable:', window.UBITSDataTable);
    
    // Intentar usar UBITSDataTable.createDataTable si window.createDataTable no está disponible
    let createDataTableFn = window.createDataTable;
    if (typeof createDataTableFn !== 'function' && window.UBITSDataTable && typeof window.UBITSDataTable.createDataTable === 'function') {
        console.log('✅ [Encuestas DataTable] Usando window.UBITSDataTable.createDataTable');
        createDataTableFn = window.UBITSDataTable.createDataTable;
    }
    
    if (typeof createDataTableFn !== 'function') {
        console.log('⚠️ [Encuestas DataTable] createDataTable aún no está disponible, reintentando en 500ms...');
        
        // Esperar hasta que createDataTable esté disponible
        let attempts = 0;
        const maxAttempts = 10;
        const checkInterval = setInterval(() => {
            attempts++;
            if (typeof window.createDataTable === 'function') {
                clearInterval(checkInterval);
                console.log('✅ [Encuestas DataTable] createDataTable ahora está disponible, continuando...');
                initializeEncuestasDataTable();
            } else if (window.UBITSDataTable && typeof window.UBITSDataTable.createDataTable === 'function') {
                clearInterval(checkInterval);
                console.log('✅ [Encuestas DataTable] UBITSDataTable.createDataTable ahora está disponible, continuando...');
                window.createDataTable = window.UBITSDataTable.createDataTable;
                initializeEncuestasDataTable();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.error('❌ [Encuestas DataTable] createDataTable no está disponible después de', maxAttempts, 'intentos');
            }
        }, 500);
        return;
    }
    
    console.log('✅ [Encuestas DataTable] createDataTable está disponible');
    
    // Guardar referencia para usar en createDataTable
    window._createDataTableFn = createDataTableFn;
    
    // Ahora usar createDataTableFn para crear el DataTable
    try {
        const dataTableInstance = createDataTableFn({
            containerId: 'encuestas-table-container',
            // ... resto de opciones
        });
        // ...
    } catch (error) {
        console.error('❌ [Encuestas DataTable] Error al crear DataTable:', error);
    }
}
```

---

## 🚨 REGLAS CRÍTICAS

### **Regla #1: SIEMPRE Verificar Script UMD en el HTML**
- ✅ Verificar que el script UMD está en el HTML ANTES de implementar
- ✅ Verificar que la ruta es correcta (local o Vercel)
- ❌ NO asumir que el script se carga automáticamente

### **Regla #2: SIEMPRE Usar Carga Dinámica con Fallback**
- ✅ Cargar desde local primero
- ✅ Fallback a Vercel si falla local
- ✅ Verificar `window.UBITSDataTable.createDataTable` si `window.createDataTable` no está disponible

### **Regla #3: SIEMPRE Verificar Disponibilidad ANTES de Usar**
- ✅ Verificar `typeof window.createDataTable === 'function'` antes de usar
- ✅ Verificar `window.UBITSDataTable.createDataTable` como alternativa
- ✅ Implementar retry logic con timeout máximo

### **Regla #4: SIEMPRE Agregar Logs Detallados**
- ✅ Logs cuando se inicia la carga del script
- ✅ Logs cuando el script se carga exitosamente
- ✅ Logs cuando falla la carga
- ✅ Logs cuando se verifica disponibilidad

---

## 📋 CHECKLIST OBLIGATORIO ANTES DE IMPLEMENTAR DATATABLE

### **FASE 0: VERIFICACIÓN DE SCRIPTS** ⚠️ OBLIGATORIO

- [ ] **Verificar que el script UMD está en el HTML:**
  - [ ] Buscar `<script src="...data-table.umd.js">` en el HTML
  - [ ] Verificar que la ruta es correcta (local o Vercel)
  - [ ] Verificar que el script se carga antes de intentar usar `window.createDataTable`

- [ ] **Verificar carga del script:**
  - [ ] Abrir consola del navegador (F12)
  - [ ] Buscar logs de "DataTable UMD" en la consola
  - [ ] Verificar que no hay errores de carga (404, CORS, etc.)
  - [ ] Verificar que `window.createDataTable` o `window.UBITSDataTable` está disponible

- [ ] **Si el script NO está en el HTML:**
  - [ ] Agregar script con carga dinámica y fallback (ver PASO 2)
  - [ ] Verificar que se carga correctamente
  - [ ] Verificar que `window.createDataTable` está disponible después de cargar

---

## 🔗 Referencias

- **Guía de implementación paso a paso:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Análisis de errores:** `docs/guias/analisis/ANALISIS-ERRORES-IMPLEMENTACION-DATATABLE-ENCUESTAS.md`
- **Estrategia general:** `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`
- **Checklist antes de implementar:** `docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md`

---

**Última actualización:** 2025-01-11  
**Estado:** ✅ Error Documentado y Solución Implementada
