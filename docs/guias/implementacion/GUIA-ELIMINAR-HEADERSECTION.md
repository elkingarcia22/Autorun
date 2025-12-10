# 🚨 Guía: Eliminar HeaderSection Correctamente

## ⚠️ PROBLEMA

**ContentManager crea automáticamente un HeaderSection en cada sección**, pero en algunos módulos (como "encuestas") la imagen no muestra HeaderSection, por lo que debe eliminarse.

**El problema:**
- ContentManager crea HeaderSection dinámicamente en `updateContent()`
- Si solo eliminas el HTML estático, el HeaderSection vuelve a aparecer
- Si eliminas en todos los módulos, rompes otros módulos que sí lo necesitan

---

## ✅ SOLUCIÓN COMPLETA

### **Paso 1: Eliminar del HTML Estático**

```html
<!-- ❌ ELIMINAR: CSS de HeaderSection -->
<!-- <link rel="stylesheet" href="/vercel-proxy/components/header-section/src/styles/header-section.css" /> -->

<!-- ❌ ELIMINAR: Contenedor HTML si existe -->
<!-- <div id="header-section-container"></div> -->
```

### **Paso 2: Eliminar Estilos CSS**

```css
/* ❌ ELIMINAR: Estilos de header-section-container */
/* 
#header-section-container {
  width: 100%;
  background: transparent;
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
  box-sizing: border-box;
}
*/
```

### **Paso 3: Interceptar ContentManager.updateContent INMEDIATAMENTE**

⚠️ **CRÍTICO:** Interceptar ContentManager INMEDIATAMENTE después de cargar content-manager.js, usar `requestAnimationFrame` para timing correcto, y MutationObserver para eliminar elementos dinámicos.

```javascript
// ========================================
// INTERCEPTAR ContentManager.updateContent
// Para eliminar HeaderSection y content-sections dinámicamente
// ⚠️ CRÍTICO: Interceptar INMEDIATAMENTE después de cargar content-manager.js
// ========================================
<script src="/vercel-proxy/templates/engine/content-manager.js"></script>

<script>
    (function() {
        const currentModule = document.body.getAttribute('data-module');
        if (currentModule !== 'encuestas') {
            return; // Solo interceptar en módulo encuestas
        }
        
        function interceptContentManagerImmediately() {
            if (!window.UBITS_ContentManager) {
                // Si ContentManager aún no existe, esperar
                setTimeout(interceptContentManagerImmediately, 50);
                return;
            }
            
            // Verificar si ya está interceptado (evitar múltiples interceptaciones)
            if (window.UBITS_ContentManager.updateContent._encuestasIntercepted) {
                return;
            }
            
            // Guardar referencia al método original
            const originalUpdateContent = window.UBITS_ContentManager.updateContent;
            if (!originalUpdateContent) {
                setTimeout(interceptContentManagerImmediately, 50);
                return;
            }
            
            // Interceptar el método
            window.UBITS_ContentManager.updateContent = function(section, subSection) {
                // ⚠️ CRÍTICO: Solo interceptar si estamos en módulo encuestas
                const currentModule = document.body.getAttribute('data-module');
                if (currentModule !== 'encuestas') {
                    return originalUpdateContent.call(this, section, subSection);
                }
                
                console.log('🔵 [Encuestas] updateContent interceptado para sección:', section);
                
                // Llamar al método original (que limpia el content-area y crea HeaderSection)
                const result = originalUpdateContent.call(this, section, subSection);
                
                // ⚠️ CRÍTICO: Usar requestAnimationFrame para timing correcto
                requestAnimationFrame(() => {
                    const contentArea = document.querySelector('.content-area');
                    if (!contentArea) {
                        return;
                    }
                    
                    // Eliminar TODOS los elementos relacionados
                    const headerContainer = contentArea.querySelector('#header-section-container');
                    if (headerContainer) {
                        console.log('🔵 [Encuestas] Eliminando HeaderSection');
                        headerContainer.remove();
                    }
                    
                    const headerSection = contentArea.querySelector('.ubits-header-section');
                    if (headerSection) {
                        console.log('🔵 [Encuestas] Eliminando .ubits-header-section');
                        const container = headerSection.closest('#header-section-container');
                        if (container) {
                            container.remove();
                        } else {
                            headerSection.remove();
                        }
                    }
                    
                    const contentSections = contentArea.querySelector('.content-sections');
                    if (contentSections) {
                        console.log('🔵 [Encuestas] Eliminando .content-sections');
                        contentSections.remove();
                    }
                    
                    const widgetPrincipal = contentArea.querySelector('.widget-contenido-principal');
                    if (widgetPrincipal) {
                        console.log('🔵 [Encuestas] Eliminando .widget-contenido-principal');
                        widgetPrincipal.closest('.section-single')?.remove() || widgetPrincipal.remove();
                    }
                });
                
                return result;
            };
            
            // Marcar como interceptado
            window.UBITS_ContentManager.updateContent._encuestasIntercepted = true;
            console.log('✅ [Encuestas] ContentManager.updateContent interceptado INMEDIATAMENTE');
        }
        
        // ⚠️ CRÍTICO: Ejecutar inmediatamente y con múltiples intentos
        interceptContentManagerImmediately();
        setTimeout(interceptContentManagerImmediately, 100);
        setTimeout(interceptContentManagerImmediately, 500);
        
        // ⚠️ CRÍTICO: MutationObserver para eliminar elementos que se crean dinámicamente
        function setupAggressiveObserver() {
            const contentArea = document.querySelector('.content-area');
            if (!contentArea) {
                setTimeout(setupAggressiveObserver, 50);
                return;
            }
            
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1) {
                                // Eliminar HeaderSection
                                if (node.id === 'header-section-container' || 
                                    node.classList?.contains('ubits-header-section') ||
                                    node.querySelector?.('#header-section-container') ||
                                    node.querySelector?.('.ubits-header-section')) {
                                    const headerContainer = document.getElementById('header-section-container');
                                    if (headerContainer) headerContainer.remove();
                                    
                                    const headerSection = document.querySelector('.ubits-header-section');
                                    if (headerSection) {
                                        const container = headerSection.closest('#header-section-container');
                                        if (container) {
                                            container.remove();
                                        } else {
                                            headerSection.remove();
                                        }
                                    }
                                }
                                
                                // Eliminar content-sections
                                if (node.classList?.contains('content-sections') ||
                                    node.querySelector?.('.content-sections')) {
                                    const contentSections = document.querySelector('.content-sections');
                                    if (contentSections) contentSections.remove();
                                }
                            }
                        });
                    }
                });
            });
            
            observer.observe(contentArea, {
                childList: true,
                subtree: true
            });
            
            console.log('✅ [Encuestas] MutationObserver agresivo configurado');
        }
        
        // Configurar observer
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupAggressiveObserver);
        } else {
            setupAggressiveObserver();
        }
        
        setTimeout(setupAggressiveObserver, 100);
        setTimeout(setupAggressiveObserver, 500);
    })();
</script>
  
  // ⚠️ CRÍTICO: MutationObserver para eliminar HeaderSection si se crea dinámicamente
  function setupHeaderSectionObserver() {
    const currentModule = document.body.getAttribute('data-module');
    if (currentModule !== 'encuestas') {
      return; // NO observar si no estamos en encuestas
    }
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Verificar si es el contenedor del HeaderSection
              if (node.id === 'header-section-container' || 
                  node.classList?.contains('ubits-header-section') ||
                  node.querySelector?.('#header-section-container') ||
                  node.querySelector?.('.ubits-header-section')) {
                console.log('🔵 [Encuestas] HeaderSection detectado en MutationObserver, eliminando...');
                
                // Eliminar el contenedor completo
                const headerContainer = document.getElementById('header-section-container');
                if (headerContainer) {
                  headerContainer.remove();
                  console.log('🔵 [Encuestas] ✅ HeaderSection eliminado por MutationObserver');
                }
                
                // También buscar por clase
                const headerSection = document.querySelector('.ubits-header-section');
                if (headerSection) {
                  headerSection.closest('#header-section-container')?.remove() || headerSection.remove();
                  console.log('🔵 [Encuestas] ✅ .ubits-header-section eliminado por MutationObserver');
                }
              }
            }
          });
        }
      });
    });
    
    // Observar el content-area
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      observer.observe(contentArea, {
        childList: true,
        subtree: true
      });
      console.log('✅ [Encuestas] MutationObserver configurado para eliminar HeaderSection');
    } else {
      // Si content-area aún no existe, esperar
      setTimeout(setupHeaderSectionObserver, 100);
    }
  }
  
  // Configurar observer cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeaderSectionObserver);
  } else {
    setupHeaderSectionObserver();
  }
  
  // También configurar después de delays
  setTimeout(setupHeaderSectionObserver, 500);
  setTimeout(setupHeaderSectionObserver, 1000);
})();
```

---

## 📋 CHECKLIST OBLIGATORIO

### **Antes de implementar:**
- [ ] ¿Verifico el módulo/sección antes de eliminar HeaderSection?
- [ ] ¿Elimino el CSS de HeaderSection del HTML?
- [ ] ¿Elimino los estilos CSS de `#header-section-container`?
- [ ] ¿Intercepto `ContentManager.updateContent` INMEDIATAMENTE después de cargar content-manager.js?
- [ ] ¿Uso `requestAnimationFrame` para timing correcto antes de eliminar elementos?
- [ ] ¿Elimino TODOS los elementos relacionados: `#header-section-container`, `.ubits-header-section`, `.content-sections`, `.widget-contenido-principal`?
- [ ] ¿Configuro MutationObserver agresivo para eliminar elementos que se crean dinámicamente después?
- [ ] ¿Uso múltiples intentos de interceptación (inmediato, 100ms, 500ms)?
- [ ] ¿Verifico que solo actúa en el módulo correcto?

### **Después de implementar:**
- [ ] ¿El HeaderSection NO aparece en el módulo específico?
- [ ] ¿El HeaderSection SÍ aparece en otros módulos?
- [ ] ¿Los contenedores personalizados se preservan correctamente?
- [ ] ¿No hay errores en la consola?

---

## 🔍 VERIFICACIÓN

### **En la consola del navegador:**
```javascript
// Verificar que HeaderSection NO existe
const headerSection = document.querySelector('#header-section-container');
console.log('HeaderSection existe:', !!headerSection); // Debe ser false

// Verificar que estamos en el módulo correcto
const currentModule = document.body.getAttribute('data-module');
console.log('Módulo actual:', currentModule); // Debe ser 'encuestas'

// Verificar que la interceptación está activa
const updateContent = window.UBITS_ContentManager?.updateContent;
console.log('updateContent interceptado:', updateContent?.toString().includes('Encuestas'));
```

---

## ⚠️ REGLAS CRÍTICAS

1. **SIEMPRE verificar módulo antes de eliminar**
   - Usar `document.body.getAttribute('data-module')`
   - Solo eliminar en el módulo específico

2. **SIEMPRE usar interceptación INMEDIATA + requestAnimationFrame + MutationObserver**
   - Interceptar INMEDIATAMENTE después de cargar content-manager.js
   - Usar `requestAnimationFrame` para timing correcto antes de eliminar
   - MutationObserver elimina si se crea después

3. **NUNCA eliminar en todos los módulos**
   - Otros módulos necesitan HeaderSection
   - Verificar módulo antes de eliminar

4. **SIEMPRE preservar contenedores personalizados**
   - Guardar `outerHTML` antes de `updateContent`
   - Restaurar después de eliminar HeaderSection

---

## 🔗 Referencias

- **Error común:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - Error #9
- **ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Crear desde imagen:** `docs/guias/implementacion/GUIA-CREAR-DESDE-IMAGEN-DESPUES-WIZARD.md`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0 (solución completa implementada y probada)



