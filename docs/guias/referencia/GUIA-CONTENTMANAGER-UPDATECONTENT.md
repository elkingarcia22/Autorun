# 🚨 Guía: ContentManager.updateContent - Prevenir Eliminación de Elementos

## ⚠️ PROBLEMA CRÍTICO

**`ContentManager.updateContent` limpia completamente el `.content-area` usando `innerHTML = ''`**

Esto significa que **CUALQUIER elemento** que agregues al HTML estático dentro de `.content-area` será **eliminado** cuando el ContentManager actualice el contenido.

**En `content-manager.js` línea 680:**
```javascript
contentArea.innerHTML = ''; // ❌ Limpia TODO el contenido
```

---

## 🔍 CÓMO IDENTIFICAR EL PROBLEMA

### **Síntomas:**
1. ✅ Elemento existe en el HTML estático
2. ✅ Elemento se inicializa correctamente
3. ❌ Elemento desaparece después de que el ContentManager actualiza el contenido
4. ❌ Los logs muestran que el `content-area` solo contiene `content-sections`

### **Flujo del problema:**
```
1. Agregas elementos al HTML estático en .content-area
   ↓
2. Los elementos aparecen correctamente
   ↓
3. Usuario navega a otra sección o ContentManager actualiza
   ↓
4. ContentManager.updateContent() se ejecuta
   ↓
5. contentArea.innerHTML = ''; // ❌ Limpia TODO
   ↓
6. Tus elementos agregados desaparecen
```

### **Verificación en Logs:**
```javascript
// En la consola del navegador:
const contentArea = document.querySelector('.content-area');
console.log('Content-area HTML:', contentArea?.innerHTML.substring(0, 500));
```

**Si el HTML NO incluye tu elemento, el ContentManager lo eliminó.**

---

## ✅ SOLUCIÓN: Interceptar `updateContent`

### **Patrón de Interceptación:**

```javascript
// 1. Verificar que ContentManager existe
if (!window.UBITS_ContentManager) {
  console.error('❌ ContentManager no existe');
  return;
}

// 2. Guardar referencia al método original
const originalUpdateContent = window.UBITS_ContentManager.updateContent;
if (!originalUpdateContent) {
  console.error('❌ updateContent no existe');
  return;
}

// 3. Interceptar el método
window.UBITS_ContentManager.updateContent = function(section, subSection) {
  // ⚠️ CRÍTICO: Verificar módulo/sección antes de interceptar
  const currentModule = document.body.getAttribute('data-module');
  const shouldPreserve = currentModule === 'encuestas' || section === 'encuestas';
  
  if (shouldPreserve) {
    // Guardar elementos antes de actualizar
    const tabsContainer = document.getElementById('encuestas-tabs-container');
    const tabsHTML = tabsContainer ? tabsContainer.outerHTML : null;
    
    console.log('🔵 [Preserve] Guardando elementos antes de updateContent');
    
    // Llamar al método original (que limpia el content-area)
    const result = originalUpdateContent.call(this, section, subSection);
    
    // Restaurar elementos después de actualizar
    setTimeout(() => {
      const contentArea = document.querySelector('.content-area');
      if (contentArea && tabsHTML) {
        const existingTabs = contentArea.querySelector('#encuestas-tabs-container');
        if (!existingTabs) {
          console.log('🔵 [Preserve] Restaurando elementos...');
          // Insertar al inicio del content-area
          contentArea.insertAdjacentHTML('afterbegin', tabsHTML);
          
          // ✅ CRÍTICO: Re-inicializar SIEMPRE después de restaurar (los event listeners se pierden)
          const restoredContainer = document.getElementById('encuestas-tabs-container');
          if (restoredContainer) {
            // Verificar si los tabs tienen event listeners
            const existingTabsElement = restoredContainer.querySelector('.ubits-tabs');
            if (existingTabsElement) {
              const tabsWithListeners = existingTabsElement.querySelectorAll('.ubits-tab[data-listener-attached="true"]');
              if (tabsWithListeners.length === 0) {
                // Los tabs existen pero NO tienen listeners, eliminar y reinicializar
                console.log('🔵 [Preserve] Tabs restaurados sin listeners, eliminando y reinicializando...');
                existingTabsElement.remove();
              } else {
                // Los tabs tienen listeners, no es necesario reinicializar
                console.log('✅ [Preserve] Tabs restaurados con listeners, no es necesario reinicializar');
                return;
              }
            }
            // Reinicializar para agregar event listeners
            if (window.initEncuestasTabs) {
              window.initEncuestasTabs();
            }
          }
        }
      }
    }, 50);
    
    return result;
  } else {
    // Para otros módulos, llamar al método original sin modificar
    return originalUpdateContent.call(this, section, subSection);
  }
};
```

---

## 📋 CHECKLIST OBLIGATORIO

### **ANTES de agregar elementos al DOM dentro de `.content-area`:**

- [ ] **1. Investigar el código fuente del ContentManager**
  ```bash
  # Buscar cómo funciona updateContent
  grep -r "updateContent\|contentArea.innerHTML" vendor/ubits/packages/templates/engine/
  
  # Leer el archivo completo
  read_file vendor/ubits/packages/templates/engine/content-manager.js
  ```

- [ ] **2. Verificar si hay interceptaciones existentes**
  ```bash
  # Buscar interceptaciones de updateContent
  grep -r "updateContent.*intercept\|UBITS_ContentManager.*updateContent" prototypes/
  ```

- [ ] **3. Revisar logs del navegador ANTES de implementar**
  ```javascript
  // Ejecutar en consola:
  const contentArea = document.querySelector('.content-area');
  console.log('Content-area actual:', contentArea?.innerHTML.substring(0, 500));
  
  // Verificar si updateContent existe
  const originalUpdateContent = window.UBITS_ContentManager?.updateContent;
  console.log('updateContent existe:', !!originalUpdateContent);
  if (originalUpdateContent) {
    console.log('Código:', originalUpdateContent.toString().substring(0, 500));
  }
  ```

- [ ] **4. NO asumir que los elementos estarán siempre disponibles**
  - El ContentManager puede reemplazar el contenido dinámicamente
  - Siempre verificar el comportamiento del ContentManager primero
  - Si `updateContent` limpia el contenido, interceptar para preservar elementos

- [ ] **5. Implementar interceptación ANTES de agregar elementos al DOM**
  - No agregar elementos al HTML estático sin interceptar `updateContent`
  - Interceptar `updateContent` primero, luego agregar elementos

- [ ] **6. Verificar módulo/sección antes de preservar elementos**
  - Solo interceptar para módulos específicos
  - No afectar otros módulos

- [ ] **7. Guardar elementos ANTES de llamar al método original**
  - Guardar `outerHTML` de los elementos
  - Llamar al método original después

- [ ] **8. Restaurar elementos DESPUÉS de que se actualice el contenido**
  - Usar `setTimeout` para restaurar en el siguiente tick
  - Verificar que el elemento no existe antes de restaurar

---

## 🔧 FUNCIÓN HELPER RECOMENDADA

```javascript
/**
 * Preserva elementos del content-area cuando ContentManager actualiza el contenido
 * @param {string[]} elementIds - IDs de elementos a preservar
 * @param {string|string[]} modules - Módulos donde aplicar la preservación
 */
function preserveContentAreaElements(elementIds, modules = []) {
  // Normalizar módulos a array
  const moduleList = Array.isArray(modules) ? modules : [modules];
  
  // Verificar que ContentManager existe
  if (!window.UBITS_ContentManager) {
    console.warn('⚠️ [Preserve] ContentManager no existe, usando polling...');
    const checkContentManager = setInterval(() => {
      if (window.UBITS_ContentManager) {
        clearInterval(checkContentManager);
        preserveContentAreaElements(elementIds, modules);
      }
    }, 100);
    setTimeout(() => clearInterval(checkContentManager), 10000);
    return;
  }
  
  // Verificar si ya fue interceptado
  if (window._UBITS_ContentManager_UpdateContent_Intercepted) {
    console.log('✅ [Preserve] updateContent ya está interceptado');
    return;
  }
  
  window._UBITS_ContentManager_UpdateContent_Intercepted = true;
  
  // Guardar referencia al método original
  const originalUpdateContent = window.UBITS_ContentManager.updateContent;
  if (!originalUpdateContent) {
    console.error('❌ [Preserve] updateContent no existe');
    return;
  }
  
  // Interceptar el método
  window.UBITS_ContentManager.updateContent = function(section, subSection) {
    // Verificar si debemos preservar elementos
    const currentModule = document.body.getAttribute('data-module');
    const shouldPreserve = moduleList.length === 0 || 
                          moduleList.includes(currentModule) || 
                          moduleList.includes(section);
    
    if (shouldPreserve) {
      // Guardar elementos antes de actualizar
      const savedElements = {};
      elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          savedElements[id] = element.outerHTML;
          console.log(`🔵 [Preserve] Guardando elemento: #${id}`);
        }
      });
      
      // Llamar al método original
      const result = originalUpdateContent.call(this, section, subSection);
      
      // Restaurar elementos después de actualizar
      setTimeout(() => {
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
          elementIds.forEach(id => {
            if (savedElements[id]) {
              const existingElement = contentArea.querySelector(`#${id}`);
              if (!existingElement) {
                console.log(`🔵 [Preserve] Restaurando elemento: #${id}`);
                // Insertar al inicio del content-area
                contentArea.insertAdjacentHTML('afterbegin', savedElements[id]);
                
                // Re-inicializar si es necesario (disparar evento personalizado)
                const restoredElement = document.getElementById(id);
                if (restoredElement) {
                  restoredElement.dispatchEvent(new CustomEvent('restored', {
                    detail: { elementId: id }
                  }));
                }
              } else {
                console.log(`✅ [Preserve] Elemento #${id} ya existe, no es necesario restaurar`);
              }
            }
          });
        }
      }, 50);
      
      return result;
    } else {
      // Para otros módulos, llamar al método original sin modificar
      return originalUpdateContent.call(this, section, subSection);
    }
  };
  
  console.log(`✅ [Preserve] updateContent interceptado para preservar: ${elementIds.join(', ')}`);
}

// Uso:
preserveContentAreaElements(['encuestas-tabs-container'], ['encuestas']);
```

---

## 🎯 EJEMPLO COMPLETO

```javascript
// 1. Interceptar updateContent ANTES de agregar elementos
(function() {
  // Interceptar usando polling (evita conflictos)
  const checkContentManager = setInterval(() => {
    if (window.UBITS_ContentManager && !window._UBITS_ContentManager_Tabs_Intercepted) {
      preserveContentAreaElements(['encuestas-tabs-container'], ['encuestas']);
      window._UBITS_ContentManager_Tabs_Intercepted = true;
      clearInterval(checkContentManager);
    }
  }, 100);
  
  setTimeout(() => clearInterval(checkContentManager), 10000);
})();

// 2. Agregar elementos al HTML estático
// <div class="content-area">
//   <div id="encuestas-tabs-container"></div>
//   <div class="content-sections">...</div>
// </div>

// 3. Inicializar elementos (escuchar evento 'restored' si es necesario)
document.getElementById('encuestas-tabs-container')?.addEventListener('restored', () => {
  console.log('✅ Contenedor restaurado, re-inicializando tabs...');
  initEncuestasTabs();
});
```

---

## ⚠️ REGLAS CRÍTICAS

1. **NUNCA agregar elementos al `.content-area` sin interceptar `updateContent`**
2. **SIEMPRE verificar el comportamiento del ContentManager antes de implementar**
3. **SIEMPRE interceptar `updateContent` ANTES de agregar elementos al DOM**
4. **SIEMPRE verificar módulo/sección antes de preservar elementos**
5. **SIEMPRE re-inicializar elementos después de restaurarlos**
6. **SIEMPRE guardar elementos ANTES de llamar al método original**
7. **SIEMPRE restaurar elementos DESPUÉS de que se actualice el contenido**
8. **SIEMPRE usar `setTimeout` para restaurar en el siguiente tick**
9. **SIEMPRE reinicializar componentes después de restaurar HTML** - El HTML restaurado NO tiene event listeners
10. **SIEMPRE agregar listeners al contenedor externo** - No agregar listeners a elementos que pueden ser reemplazados
11. **SIEMPRE verificar instancia activa** - No solo verificar si el HTML existe, verificar también si tiene instancia activa

---

## 📚 REFERENCIAS

- **Código fuente:** `vendor/ubits/packages/templates/engine/content-manager.js` (línea 680)
- **Análisis completo:** `ANALISIS-PROBLEMAS-IMPLEMENTACION.md` (Problema 4)
- **Patrón de interceptación:** Ver sección "Interceptar ContentManager" en `.cursorrules`
- **Guía de errores comunes:** `GUIA-ERRORES-COMUNES-UBITS.md` - Error #10, Error #18, Error #21, Error #22
- **Error checkboxes desaparecen tabla:** `docs/guias/analisis/ANALISIS-ERROR-CHECKBOXES-DATATABLE-DESAPARECE.md` - ⚠️ **OBLIGATORIO**
- **Error checkboxes intermitentes:** `docs/guias/analisis/ANALISIS-ERROR-CHECKBOXES-INTERMITENTES-DATATABLE.md` - ⚠️ **OBLIGATORIO**

---

## ⚠️ ERROR CRÍTICO: Event Listeners Perdidos al Restaurar HTML

### **Problema:**

Cuando `ContentManager.updateContent` restaura el HTML de un componente (como DataTable), el HTML se restaura pero los **event listeners internos se pierden**.

**Síntomas:**
- El componente aparece visualmente correcto después de restaurar
- Pero las funcionalidades interactivas (checkboxes, botones, etc.) **NO funcionan**
- El comportamiento es **intermitente** (a veces funciona, a veces no)

### **Causa Raíz:**

```javascript
// ❌ ERROR: Asumir que HTML restaurado tiene event listeners
if (hasDataTable) {
  console.log('✅ DataTable ya existe, no es necesario reinicializar');
  // NO se reinicializa - los event listeners se perdieron
}
```

**Problema:**
- El HTML restaurado contiene el markup del componente
- Pero los event listeners que el componente agregó internamente se perdieron
- El código asume que si el HTML existe, el componente funciona

### **Solución:**

```javascript
// ✅ CORRECTO: Siempre reinicializar después de restaurar HTML
if (restoredTable) {
  const hasDataTable = restoredTable.querySelector('.ubits-data-table');
  
  // ⚠️ CRÍTICO: Siempre reinicializar después de restaurar HTML
  // El HTML restaurado NO tiene event listeners, necesitamos reinicializar
  console.log('⚠️ DataTable restaurado desde HTML - Event listeners perdidos, reinicializando...');
  
  if (window.initEncuestasDataTable && typeof window.initEncuestasDataTable === 'function') {
    // ✅ Limpiar contenido y reinicializar para restaurar event listeners
    restoredTable.innerHTML = '';
    window.initEncuestasDataTable();
  }
}
```

### **Regla de Oro:**

**SIEMPRE reinicializar componentes después de restaurar HTML desde `ContentManager.updateContent`.**

**Ver:** ERROR CRÍTICO #22 en `GUIA-ERRORES-COMUNES-UBITS.md` y `ANALISIS-ERROR-CHECKBOXES-INTERMITENTES-DATATABLE.md`

---

**Última actualización:** Diciembre 2024
