# 🚨 Guía: ContentManager.updateContent Limpia el DOM

## ⚠️ PROBLEMA CRÍTICO

**El `ContentManager.updateContent` limpia completamente el `.content-area` cada vez que actualiza el contenido, eliminando cualquier elemento que agregues al HTML estático.**

---

## 🔍 Cómo Identificar el Problema

### **Síntomas:**
- ✅ Agregas elementos al HTML estático (ej: tabs, contenedores)
- ✅ Los elementos aparecen inicialmente
- ❌ Cuando cambias de sección o se actualiza el contenido, los elementos desaparecen
- ❌ Los elementos se eliminan cada vez que `updateContent` se ejecuta

### **Causa Raíz:**

**En `content-manager.js` línea 680:**
```javascript
contentArea.innerHTML = ''; // ❌ Limpia TODO el contenido
```

**Flujo del problema:**
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

---

## ✅ Solución: Interceptar updateContent

### **Patrón de Interceptación:**

```javascript
// ⚠️ CRÍTICO: Interceptar ANTES de que se ejecute updateContent
function interceptContentManager() {
  // Esperar a que ContentManager exista
  const checkContentManager = setInterval(() => {
    if (window.UBITS_ContentManager && !window._UBITS_ContentManager_Custom_Intercepted) {
      window._UBITS_ContentManager_Custom_Intercepted = true;
      
      // Guardar método original
      const originalUpdateContent = window.UBITS_ContentManager.updateContent.bind(window.UBITS_ContentManager);
      
      // Interceptar updateContent
      window.UBITS_ContentManager.updateContent = function(section, subSection) {
        // ⚠️ CRÍTICO: Verificar módulo/sección antes de interceptar
        const currentModule = document.body.getAttribute('data-module');
        if (currentModule !== 'encuestas') {
          // Para otros módulos, usar el método original
          return originalUpdateContent(section, subSection);
        }
        
        // Para el módulo específico, preservar elementos personalizados
        const contentArea = document.querySelector('.content-area');
        if (!contentArea) {
          return originalUpdateContent(section, subSection);
        }
        
        // Guardar elementos personalizados antes de que se limpien
        const customElements = Array.from(contentArea.querySelectorAll('#tabs-container, #actions-bar, #table-container'));
        const customElementsHTML = customElements.map(el => el.outerHTML);
        
        // Llamar al método original (esto limpia el contenido)
        const result = originalUpdateContent(section, subSection);
        
        // Restaurar elementos personalizados DESPUÉS de que se actualice el contenido
        setTimeout(() => {
          customElementsHTML.forEach(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const element = tempDiv.firstElementChild;
            if (element) {
              contentArea.appendChild(element);
            }
          });
        }, 0);
        
        return result;
      };
      
      clearInterval(checkContentManager);
    }
  }, 100);
  
  // Timeout de seguridad
  setTimeout(() => clearInterval(checkContentManager), 10000);
}

// Ejecutar interceptación
interceptContentManager();
```

---

## 📋 Checklist Obligatorio

### **ANTES de agregar elementos al DOM en `.content-area`:**

- [ ] ¿He leído `GUIA-CONTENTMANAGER-UPDATECONTENT.md`?
- [ ] ¿He investigado el código fuente del ContentManager?
- [ ] ¿He verificado si `updateContent` limpia el contenido?
- [ ] ¿He interceptado `updateContent` si es necesario?
- [ ] ¿He verificado el módulo/sección antes de interceptar?
- [ ] ¿He guardado y restaurado elementos personalizados correctamente?

### **DURANTE la implementación:**

- [ ] ¿He usado `setInterval` polling para detectar ContentManager?
- [ ] ¿He guardado el método original antes de interceptar?
- [ ] ¿He verificado módulo/sección antes de preservar elementos?
- [ ] ¿He restaurado elementos DESPUÉS de que se actualice el contenido?
- [ ] ¿He usado `setTimeout` para restaurar elementos en el siguiente tick?

---

## 🔧 Función Helper Reutilizable

```javascript
/**
 * Intercepta ContentManager.updateContent para preservar elementos personalizados
 * @param {string} module - Módulo donde aplicar la interceptación (ej: 'encuestas')
 * @param {string[]} selectors - Selectores CSS de elementos a preservar (ej: ['#tabs-container', '#actions-bar'])
 */
function preserveCustomElementsInContentArea(module, selectors) {
  const checkContentManager = setInterval(() => {
    if (window.UBITS_ContentManager && !window[`_UBITS_ContentManager_${module}_Intercepted`]) {
      window[`_UBITS_ContentManager_${module}_Intercepted`] = true;
      
      const originalUpdateContent = window.UBITS_ContentManager.updateContent.bind(window.UBITS_ContentManager);
      
      window.UBITS_ContentManager.updateContent = function(section, subSection) {
        // Verificar módulo
        const currentModule = document.body.getAttribute('data-module');
        if (currentModule !== module) {
          return originalUpdateContent(section, subSection);
        }
        
        // Guardar elementos personalizados
        const contentArea = document.querySelector('.content-area');
        if (!contentArea) {
          return originalUpdateContent(section, subSection);
        }
        
        const customElementsHTML = selectors
          .map(selector => {
            const element = contentArea.querySelector(selector);
            return element ? element.outerHTML : null;
          })
          .filter(Boolean);
        
        // Llamar al método original
        const result = originalUpdateContent(section, subSection);
        
        // Restaurar elementos personalizados
        setTimeout(() => {
          customElementsHTML.forEach(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const element = tempDiv.firstElementChild;
            if (element) {
              contentArea.appendChild(element);
            }
          });
        }, 0);
        
        return result;
      };
      
      clearInterval(checkContentManager);
    }
  }, 100);
  
  setTimeout(() => clearInterval(checkContentManager), 10000);
}

// Uso:
preserveCustomElementsInContentArea('encuestas', ['#tabs-container', '#actions-bar', '#table-container']);
```

---

## 📝 Ejemplo Completo

### **Problema:**
Agregas tabs al HTML estático, pero desaparecen cuando cambias de sección.

### **Solución:**
```javascript
// 1. Interceptar ContentManager ANTES de agregar elementos
function setupContentManagerInterception() {
  const checkContentManager = setInterval(() => {
    if (window.UBITS_ContentManager && !window._UBITS_ContentManager_Tabs_Intercepted) {
      window._UBITS_ContentManager_Tabs_Intercepted = true;
      
      const originalUpdateContent = window.UBITS_ContentManager.updateContent.bind(window.UBITS_ContentManager);
      
      window.UBITS_ContentManager.updateContent = function(section, subSection) {
        // Verificar módulo
        const currentModule = document.body.getAttribute('data-module');
        if (currentModule !== 'encuestas') {
          return originalUpdateContent(section, subSection);
        }
        
        // Guardar tabs antes de que se limpien
        const contentArea = document.querySelector('.content-area');
        const tabsContainer = contentArea?.querySelector('#tabs-container');
        const tabsHTML = tabsContainer ? tabsContainer.outerHTML : null;
        
        // Llamar al método original (limpia el contenido)
        const result = originalUpdateContent(section, subSection);
        
        // Restaurar tabs DESPUÉS
        if (tabsHTML) {
          setTimeout(() => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = tabsHTML;
            const restoredTabs = tempDiv.firstElementChild;
            if (restoredTabs && contentArea) {
              contentArea.insertBefore(restoredTabs, contentArea.firstChild);
            }
          }, 0);
        }
        
        return result;
      };
      
      clearInterval(checkContentManager);
    }
  }, 100);
  
  setTimeout(() => clearInterval(checkContentManager), 10000);
}

// 2. Ejecutar interceptación ANTES de agregar elementos
setupContentManagerInterception();

// 3. Agregar elementos DESPUÉS de interceptar
window.addEventListener('DOMContentLoaded', () => {
  // Tu código para agregar tabs aquí
});
```

---

## ⚠️ Reglas Críticas

1. **SIEMPRE interceptar ANTES de agregar elementos al DOM**
2. **SIEMPRE verificar módulo/sección antes de preservar elementos**
3. **SIEMPRE guardar elementos ANTES de llamar al método original**
4. **SIEMPRE restaurar elementos DESPUÉS de que se actualice el contenido**
5. **SIEMPRE usar `setTimeout` para restaurar en el siguiente tick**

---

## 🔗 Referencias

- **Guía de errores comunes:** `GUIA-ERRORES-COMUNES-UBITS.md` - Error #10
- **Código fuente:** `vendor/ubits/packages/templates/engine/content-manager.js` (línea 680)
- **Guía de problemas:** `GUIA-PROBLEMAS-VALIDACION.md`

---

**Última actualización:** Diciembre 2024

