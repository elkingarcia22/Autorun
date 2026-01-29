# ✅ Solución: Event Listeners Perdidos al Restaurar Tabs desde HTML

**ID:** `event-listeners-solution-003`  
**Problema ID:** `event-listeners-issue-003`  
**Categoría:** componentes / Event Listeners  
**Fecha Implementación:** 2025-01-27  
**Verificado:** ✅ Sí

---

## 📋 Resumen

Reinicializar tabs después de restaurar desde HTML para agregar event listeners funcionales. Hacer la función de inicialización disponible globalmente y eliminar tabs restaurados antes de reinicializar.

---

## 🔧 Implementación

### **1. Hacer Función de Inicialización Disponible Globalmente**

```javascript
// ✅ CORRECTO: Función disponible globalmente
window.initEncuestasTabs = function() {
  // ... código de inicialización
};
```

### **2. Reinicializar Tabs Después de Restaurar**

```javascript
// ✅ CORRECTO: Restaurar y reinicializar
if (tabsHTML) {
  const existingTabs = contentArea.querySelector('#encuestas-tabs-container');
  if (!existingTabs) {
    contentArea.insertAdjacentHTML('afterbegin', tabsHTML);
    
    // ⚠️ CRÍTICO: Re-inicializar tabs después de restaurar
    setTimeout(() => {
      const restoredTabsContainer = document.getElementById('encuestas-tabs-container');
      if (restoredTabsContainer) {
        const existingTabsElement = restoredTabsContainer.querySelector('.ubits-tabs');
        if (existingTabsElement) {
          // Eliminar tabs restaurados y reinicializar
          existingTabsElement.remove();
          if (typeof window.initEncuestasTabs === 'function') {
            window.initEncuestasTabs(); // Reinicializar para agregar listeners
          }
        }
      }
    }, 150);
  }
}
```

### **3. Verificar Listeners Funcionales Antes de Evitar Reinicialización**

```javascript
// ✅ CORRECTO: Verificar si los tabs tienen listeners funcionales
const existingTabs = tabsContainer.querySelector('.ubits-tabs');
if (existingTabs) {
  const tabsWithListeners = existingTabs.querySelectorAll('.ubits-tab[data-listener-attached="true"]');
  const allTabs = existingTabs.querySelectorAll('.ubits-tab:not(.ubits-tab--disabled)');
  
  // Si hay tabs con listeners y hay tabs habilitados, asumir que funcionan
  if (tabsWithListeners.length > 0 && allTabs.length > 0) {
    console.log('✅ Tabs ya inicializados con listeners, saltando reinicialización');
    return; // NO reinicializar si ya están funcionando
  } else {
    // Si no tienen listeners o no hay tabs, eliminar y reinicializar
    existingTabs.remove();
    // Continuar con la inicialización
  }
}
```

---

## 📝 Archivos Modificados

- `prototypes/canvas-administrador-encuestas-2025-12-05.html`
  - Línea 2340: `window.initEncuestasTabs` disponible globalmente
  - Línea 2349-2367: Verificación mejorada de listeners funcionales
  - Línea 2133-2155: Reinicialización después de restaurar desde HTML

---

## ✅ Verificación

### **Antes:**
- Tabs restaurados desde HTML
- Atributo `data-listener-attached="true"` presente
- Event listeners NO funcionan
- Clicks no responden

### **Después:**
- Tabs restaurados desde HTML
- Tabs eliminados y reinicializados
- Event listeners agregados correctamente
- Clicks funcionan correctamente

---

## 🔗 Referencias

- **Problema relacionado:** `docs/problems-solutions/event-listeners/issue-003.md`
- **Guía de errores:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #11
- **ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`

---

**Última actualización:** 2025-01-27








