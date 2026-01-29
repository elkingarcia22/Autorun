# 🚨 Guía: Error - SubNav Desaparece Después de Crearse

## ⚠️ PROBLEMA IDENTIFICADO

**El SubNav se crea correctamente pero desaparece después de unos segundos.**

### **Síntomas:**
1. ✅ `window.createSubNav` se llama correctamente
2. ✅ El SubNav aparece en el DOM (verificado con logs)
3. ✅ `top-nav-container` tiene contenido (`innerHTML.length > 0`)
4. ❌ Después de 2-3 segundos, el contenedor está vacío (`innerHTML.length === 0`)
5. ❌ El SubNav no es visible en la página

### **Causa Raíz:**
- `updateSubNav` se llama múltiples veces (desde `handleSectionChange` y `ResponsiveManager`)
- El ResponsiveManager llama a `updateSubNav` después de la inicialización
- Aunque `updateSubNav` tiene verificación para evitar recargas innecesarias, algo está limpiando el contenedor después

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **Sistema de Restauración Automática**

**Implementar un intervalo que verifica periódicamente si el contenedor está vacío y lo restaura automáticamente:**

```javascript
// ⚠️ Sistema de restauración automática del SubNav
// Si el SubNav desaparece, restaurarlo automáticamente
setTimeout(() => {
  const topNavContainer = document.getElementById('top-nav-container');
  if (topNavContainer) {
    let lastInnerHTMLLength = topNavContainer.innerHTML.length;
    setInterval(() => {
      const currentInnerHTMLLength = topNavContainer.innerHTML.length;
      // Si el contenedor tenía contenido y ahora está vacío, restaurarlo
      if (lastInnerHTMLLength > 0 && currentInnerHTMLLength === 0) {
        if (window.UBITS_ContentManager && window.UBITS_ContentManager.currentSection) {
          const section = window.UBITS_ContentManager.currentSection;
          window.UBITS_ContentManager.updateSubNav(section);
        }
      }
      lastInnerHTMLLength = currentInnerHTMLLength;
    }, 500); // Verificar cada 500ms
  }
}, 500);
```

### **Interceptores Simplificados**

**Interceptar `handleSectionChange` y `updateSubNav` para mantener el tab activo (sin logs excesivos):**

```javascript
// Interceptar llamadas a handleSectionChange y updateSubNav para mantener el tab activo
const originalHandleSectionChange = window.UBITS_ContentManager?.handleSectionChange;
const originalUpdateSubNav = window.UBITS_ContentManager?.updateSubNav;

if (originalHandleSectionChange) {
  window.UBITS_ContentManager.handleSectionChange = function(section, activeTabId) {
    const result = originalHandleSectionChange.call(this, section, activeTabId);
    // Mantener el tab activo después de la actualización
    setTimeout(() => {
      maintainActiveTab();
    }, 100);
    return result;
  };
}

if (originalUpdateSubNav) {
  window.UBITS_ContentManager.updateSubNav = function(section, activeTabId) {
    const result = originalUpdateSubNav.call(this, section, activeTabId);
    // Mantener el tab activo después de la actualización
    setTimeout(() => {
      maintainActiveTab();
    }, 100);
    return result;
  };
}

// Función simplificada para mantener el tab activo
const maintainActiveTab = () => {
  const subNavElement = document.querySelector('.ubits-sub-nav') || 
                       document.querySelector('#top-nav-container .ubits-sub-nav');
  
  if (!subNavElement) {
    return;
  }
  
  const allTabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
  
  // Si no hay tab activo, activar el primero disponible
  const activeTab = subNavElement.querySelector('.ubits-sub-nav-tab--active');
  if (!activeTab && allTabs.length > 0) {
    allTabs[0].classList.add('ubits-sub-nav-tab--active');
  }
};
```

---

## 📋 CHECKLIST PARA PREVENIR ESTE ERROR

### **Antes de Implementar SubNav:**

1. ✅ **Verificar que `window.createSubNav` está disponible desde Vercel**
   - Cargar `components-loader.js` desde Vercel primero
   - Si no está disponible, usar fallback local

2. ✅ **Implementar sistema de restauración automática**
   - Agregar intervalo que verifica cada 500ms si el contenedor está vacío
   - Restaurar automáticamente llamando a `updateSubNav`

3. ✅ **Interceptar `updateSubNav` y `handleSectionChange`**
   - Mantener el tab activo después de actualizaciones
   - NO agregar logs excesivos (solo lo esencial)

4. ✅ **NO agregar logs de diagnóstico excesivos**
   - Solo logs esenciales para debugging
   - Remover logs de diagnóstico después de resolver el problema

---

## 🔍 CÓMO DETECTAR EL PROBLEMA

### **Verificación en Consola:**

```javascript
// Verificar si el SubNav está presente
const topNavContainer = document.getElementById('top-nav-container');
console.log('top-nav-container innerHTML length:', topNavContainer?.innerHTML.length);
console.log('tiene .ubits-sub-nav:', !!topNavContainer?.querySelector('.ubits-sub-nav'));

// Verificar después de unos segundos
setTimeout(() => {
  const topNavContainerAfter = document.getElementById('top-nav-container');
  console.log('top-nav-container innerHTML length (después):', topNavContainerAfter?.innerHTML.length);
  if (topNavContainerAfter?.innerHTML.length === 0) {
    console.error('❌ PROBLEMA: top-nav-container está vacío');
  }
}, 3000);
```

### **Síntomas en la Página:**
- El SubNav aparece brevemente y luego desaparece
- El contenedor `#top-nav-container` existe pero está vacío
- Los logs muestran que `createSubNav` se llamó correctamente

---

## ⚠️ REGLAS PARA AUTORUN

### **Cuando implementes SubNav:**

1. **SIEMPRE agregar sistema de restauración automática**
   - Es crítico para mantener el SubNav visible
   - Verificar cada 500ms si el contenedor está vacío

2. **NO agregar logs de diagnóstico excesivos**
   - Solo logs esenciales
   - Remover logs de debugging después de resolver

3. **Interceptar `updateSubNav` y `handleSectionChange`**
   - Mantener el tab activo después de actualizaciones
   - Código simple y limpio

4. **Verificar que funciona con Vercel**
   - Cargar desde Vercel primero
   - Usar fallback solo si es necesario

---

## 📝 NOTAS ADICIONALES

- El problema ocurre porque `updateSubNav` se llama múltiples veces desde diferentes lugares
- El ResponsiveManager puede llamar a `updateSubNav` después de la inicialización
- La restauración automática es la solución más robusta
- NO intentar prevenir las llamadas múltiples (puede romper otras funcionalidades)

---

**Última actualización:** 2025-12-10  
**Estado:** ✅ Solucionado con sistema de restauración automática
