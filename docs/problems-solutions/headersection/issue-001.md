# 🐛 Problema: HeaderSection Aparece Cuando No Debería

**ID:** `headersection-issue-001`  
**Categoría:** ContentManager / HeaderSection  
**Fecha Detección:** 2025-12-05  
**Fecha Solución:** 2025-12-05  
**Estado:** ✅ Resuelto

---

## 📋 Descripción

ContentManager crea automáticamente un HeaderSection en `updateContent()`, pero en el módulo "encuestas" la imagen no muestra HeaderSection, por lo que debe eliminarse.

**Síntoma:** HeaderSection aparece después de que ContentManager actualiza el contenido, incluso si se elimina del HTML estático.

**⚠️ DETECCIÓN AUTOMÁTICA:**
- **Cuándo aplicar:** Cuando se crea o modifica un archivo HTML en `prototypes/` con `data-module="encuestas"`
- **Verificación automática:** El sistema debe verificar si el archivo incluye la interceptación de ContentManager
- **Si falta:** El Pre-Implementation Check o Problem Tracker deben alertar automáticamente

---

## 🔍 Contexto

### **Dónde Ocurre:**
- En `vendor/ubits/packages/templates/engine/content-manager.js` línea 728-759
- Se ejecuta cada vez que `ContentManager.updateContent()` se llama
- Afecta a TODOS los módulos por defecto

### **Cuándo Ocurre:**
- Al navegar entre secciones
- Al cambiar de módulo
- Cuando ContentManager actualiza el contenido dinámicamente

### **Qué Causa el Problema:**
```javascript
// En content-manager.js línea 728
if (section !== 'admin') {
  // Crea HeaderSection automáticamente para TODAS las secciones
  const headerContainer = document.createElement('div');
  headerContainer.id = 'header-section-container';
  // ...
  contentArea.appendChild(headerContainer);
}
```

---

## 💻 Código Problemático

### **En content-manager.js:**
```javascript
// Línea 728-759
if (section !== 'admin') {
  console.log('🔍 [ContentManager] Creando HeaderSection para sección:', section);
  
  const headerContainer = document.createElement('div');
  headerContainer.id = 'header-section-container';
  headerContainer.style.cssText = 'margin-top: 0; margin-bottom: 0; width: 100%;';
  
  const headerHTML = `
    <div class="ubits-header-section">
      <div class="ubits-header-section__content">
        <div class="ubits-header-section__title-wrapper">
          <div class="ubits-header-section__title-group">
            <h2 class="ubits-heading-h2">${sectionTitle}</h2>
          </div>
        </div>
        <div class="ubits-header-section__actions">
          <button class="ubits-button ubits-button--primary ubits-button--md">
            <i class="far fa-plus"></i>
            <span>Acción</span>
          </button>
        </div>
      </div>
    </div>
  `;
  
  headerContainer.innerHTML = headerHTML;
  contentArea.appendChild(headerContainer); // ❌ Se crea automáticamente
}
```

---

## 📝 Logs/Errores

### **En la Consola:**
```
🔍 [ContentManager] Creando HeaderSection para sección: encuestas
```

### **En el DOM:**
```html
<!-- HeaderSection aparece automáticamente -->
<div id="header-section-container">
  <div class="ubits-header-section">
    <h2 class="ubits-heading-h2">Encuestas</h2>
    <div class="ubits-header-section__actions">Acción</div>
  </div>
</div>
```

---

## ✅ Solución Aplicada

**Solución ID:** `headersection-solution-001`  
**Ver:** `docs/problems-solutions/headersection/solution-001.md`  
**Guía Completa:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`

### **Resumen:**
1. Interceptar `ContentManager.updateContent`
2. Eliminar HeaderSection después de que se crea
3. Usar MutationObserver para eliminar si se crea dinámicamente después
4. Solo actuar en el módulo específico (verificar `data-module`)

### **⚠️ REGLA AUTOMÁTICA:**
**Cuando se crea un archivo HTML con `data-module="encuestas"`:**
- ✅ **DEBE incluir** la interceptación de ContentManager (ver guía)
- ✅ **DEBE eliminar** CSS de `#header-section-container` y `.content-sections`
- ✅ **DEBE eliminar** HTML estático de HeaderSection y content-sections
- ✅ **DEBE incluir** MutationObserver para limpieza agresiva

**Si falta alguno de estos elementos, el sistema debe alertar automáticamente.**

---

## 🔗 Referencias

- **Guía de solución:** `docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md`
- **Error común:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #9
- **ContentManager:** `vendor/ubits/packages/templates/engine/content-manager.js`

---

## 🔄 Mejoras del Sistema (2025-12-10)

### **Problema Detectado:**
El sistema no detectó automáticamente que el archivo `canvas-administrador-encuestas-2025-12-10.html` necesitaba la interceptación de ContentManager.

### **Causa:**
1. El Pre-Implementation Check solo detecta componentes específicos (DataTable, Tabs, etc.)
2. El Problem Tracker solo se activa cuando se llama explícitamente a `detectProblem()`
3. No hay verificación automática al crear archivos HTML para módulo "encuestas"

### **Solución Implementada:**
1. ✅ Documentación actualizada con regla automática
2. ⚠️ **PENDIENTE:** Mejorar Pre-Implementation Check para detectar archivos HTML de módulo "encuestas"
3. ⚠️ **PENDIENTE:** Agregar verificación automática en FileWatcher cuando detecta archivos HTML con `data-module="encuestas"`

---

**Última actualización:** 2025-12-10
