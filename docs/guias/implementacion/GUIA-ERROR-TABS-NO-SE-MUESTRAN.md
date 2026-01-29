# 🚨 Error: Tabs No Se Muestran Después de Implementar

## ⚠️ PROBLEMA

**Síntomas:**
- Los tabs implementados no aparecen visualmente en la página
- `window.createTabs` es `undefined` cuando se intenta usar
- El script de inicialización se ejecuta antes de que los componentes estén listos
- En la consola aparece: `❌ [Encuestas] components-loader.js no se cargó después de 15 segundos`

**Causa Raíz:**
- `components-loader.js` se carga de forma asíncrona desde Vercel
- El código de inicialización se ejecuta en `DOMContentLoaded` pero los scripts UBITS se cargan asíncronamente
- No hay verificación robusta de que los scripts estén listos antes de inicializar componentes
- El script puede fallar al cargar desde Vercel (timeout, CORS, etc.)
- **⚠️ NUEVO:** El script de Vercel puede no tener `window.createTabs` disponible (versión desactualizada)
- **⚠️ NUEVO:** Si `components-loader.js` se carga después de `template-loader.js`, el sidebar no se puede crear

---

## ✅ SOLUCIÓN COMPLETA

### **PASO 1: Cargar components-loader.js ANTES de template-loader.js** ⚠️ OBLIGATORIO

**⚠️ CRÍTICO: `components-loader.js` DEBE cargarse ANTES de `template-loader.js` para que el sidebar funcione.**

**Cargar el script con fallback a local si Vercel falla:**

```javascript
// ========================================
// CARGAR components-loader.js CON FALLBACK
// Intentar desde Vercel primero, si falla usar local
// ========================================
(function() {
    const vercelUrl = 'https://ubits-storybook10.vercel.app/templates/components-loader.js?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';
    const localUrl = '../vendor/ubits/packages/templates/components-loader.js';
    
    function loadScript(url, isFallback = false) {
        const script = document.createElement('script');
        script.src = url;
        script.async = false; // Cargar de forma síncrona para asegurar orden
        
        script.onload = function() {
            console.log(`✅ components-loader.js cargado ${isFallback ? 'desde local (fallback)' : 'desde Vercel'}`);
            
            // Verificar después de que el script se ejecute
            setTimeout(() => {
                const functions = {
                    createSidebar: typeof window.createSidebar === 'function',
                    createSubNav: typeof window.createSubNav === 'function',
                    createTabBar: typeof window.createTabBar === 'function',
                    createTabs: typeof window.createTabs === 'function'
                };
                
                console.log('✅ Verificación de components-loader.js:');
                console.log('   window.createSidebar:', functions.createSidebar ? '✅' : '❌');
                console.log('   window.createSubNav:', functions.createSubNav ? '✅' : '❌');
                console.log('   window.createTabBar:', functions.createTabBar ? '✅' : '❌');
                console.log('   window.createTabs:', functions.createTabs ? '✅' : '❌');
                
                // Marcar como listo independientemente de si createTabs está disponible
                // (el fallback manual se encargará si no está disponible)
                window._UBITS_COMPONENTS_LOADER_READY = true;
                window.dispatchEvent(new CustomEvent('ubits-components-loader-ready'));
            }, 100);
        };
        
        script.onerror = function() {
            if (!isFallback) {
                console.warn('⚠️ Error al cargar components-loader.js desde Vercel, intentando desde local...');
                loadScript(localUrl, true);
            } else {
                console.error('❌ Error al cargar components-loader.js desde local también');
                console.error('   Se usará fallback manual para tabs');
                // Aún así marcar como listo para que el fallback funcione
                window._UBITS_COMPONENTS_LOADER_READY = true;
                window.dispatchEvent(new CustomEvent('ubits-components-loader-ready'));
            }
        };
        
        document.head.appendChild(script);
    }
    
    // Intentar cargar desde Vercel primero
    loadScript(vercelUrl, false);
})();
```

### **PASO 2: Esperar a que el Script Esté Listo con Múltiples Métodos** ⚠️ OBLIGATORIO

**Usar múltiples métodos para asegurar que se ejecute cuando el script esté listo:**

```javascript
// ========================================
// INICIALIZAR TABS DESPUÉS DE ACTUALIZAR CONTENIDO
// ⚠️ CRÍTICO: Esperar a que components-loader.js se cargue completamente
// ========================================
function initializeTabs() {
    const currentModule = document.body.getAttribute('data-module');
    if (currentModule !== 'encuestas') {
        return;
    }
    
    // ⚠️ CRÍTICO: Verificar que components-loader.js se haya cargado
    if (typeof window.createTabs !== 'function') {
        console.log('⏳ Esperando a que components-loader.js cargue createTabs...');
        // Reintentar después de un breve delay
        setTimeout(initializeTabs, 300);
        return;
    }
    
    // Crear contenedor para tabs si no existe
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) {
        setTimeout(initializeTabs, 100);
        return;
    }
    
    let tabsContainer = document.getElementById('encuestas-tabs-container');
    if (!tabsContainer) {
        tabsContainer = document.createElement('div');
        tabsContainer.id = 'encuestas-tabs-container';
        tabsContainer.style.cssText = 'width: 100%;';
        
        // Insertar después del SubNav (top-nav-container), antes del content-area
        const topNavContainer = document.getElementById('top-nav-container');
        const contentArea = document.querySelector('.content-area');
        
        if (topNavContainer && contentArea) {
            // Insertar después del top-nav-container
            if (topNavContainer.nextSibling) {
                mainContent.insertBefore(tabsContainer, topNavContainer.nextSibling);
            } else {
                mainContent.insertBefore(tabsContainer, contentArea);
            }
        } else if (contentArea) {
            // Si no hay top-nav-container, insertar antes del content-area
            mainContent.insertBefore(tabsContainer, contentArea);
        } else {
            // Si no hay content-area, agregar al final
            mainContent.appendChild(tabsContainer);
        }
        
        console.log('✅ Contenedor de tabs creado');
    }
    
    // Crear tabs con iconos solo si el contenedor está vacío
    if (tabsContainer && tabsContainer.children.length === 0) {
        try {
            // ⚠️ IMPORTANTE: Para iconos, usar SOLO el nombre (sin prefijos 'fa-' o 'far'/'fas')
            window.createTabs({
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
            console.log('✅ Tabs inicializados correctamente');
        } catch (error) {
            console.error('❌ Error al inicializar tabs:', error);
            console.error('Stack:', error.stack);
        }
    }
}

// ⚠️ CRÍTICO: Esperar a que components-loader.js se cargue completamente
// Usar múltiples métodos para asegurar que se ejecute cuando el script esté listo

// Método 1: Escuchar evento personalizado cuando el script se carga
window.addEventListener('ubits-components-loader-ready', function() {
    console.log('✅ Evento ubits-components-loader-ready recibido');
    setTimeout(initializeTabs, 100);
});

// Método 2: Verificar periódicamente si window.createTabs está disponible
let checkAttempts = 0;
const maxCheckAttempts = 50; // 50 intentos * 300ms = 15 segundos máximo
const checkInterval = setInterval(() => {
    checkAttempts++;
    if (typeof window.createTabs === 'function') {
        clearInterval(checkInterval);
        console.log(`✅ window.createTabs disponible después de ${checkAttempts} intentos`);
        initializeTabs();
    } else if (checkAttempts >= maxCheckAttempts) {
        clearInterval(checkInterval);
        console.error('❌ window.createTabs no disponible después de 15 segundos');
        console.error('   Verificar que components-loader.js se esté cargando correctamente');
    }
}, 300);

// Método 3: Intentar después de que window.load se complete
if (document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof window.createTabs === 'function') {
            initializeTabs();
        }
    }, 1000);
} else {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (typeof window.createTabs === 'function') {
                initializeTabs();
            }
        }, 1000);
    });
}
```

---

## 📋 CHECKLIST OBLIGATORIO

### **Antes de implementar tabs:**

- [ ] **Cargar components-loader.js con verificación**
  - ✅ Usar `script.onload` para detectar cuando se carga
  - ✅ Disparar evento personalizado `ubits-components-loader-ready`
  - ✅ Marcar `window._UBITS_COMPONENTS_LOADER_READY = true`

- [ ] **Esperar a que el script esté listo con múltiples métodos**
  - ✅ Escuchar evento `ubits-components-loader-ready`
  - ✅ Verificar periódicamente `typeof window.createTabs === 'function'`
  - ✅ Intentar después de `window.load`

- [ ] **Verificar que window.createTabs esté disponible antes de usar**
  - ✅ Verificar `typeof window.createTabs === 'function'` antes de llamar
  - ✅ Reintentar con `setTimeout` si no está disponible
  - ✅ Limitar intentos para evitar loops infinitos

- [ ] **Manejar errores correctamente**
  - ✅ Usar `try-catch` al llamar `window.createTabs`
  - ✅ Mostrar errores en consola con stack trace
  - ✅ No fallar silenciosamente

---

## 🚨 REGLAS CRÍTICAS

1. **SIEMPRE cargar components-loader.js con verificación**
   - NO usar `<script>` tag simple sin verificación
   - SIEMPRE usar `script.onload` y `script.onerror`
   - SIEMPRE disparar evento personalizado cuando se carga

2. **SIEMPRE esperar a que el script esté listo**
   - NO asumir que el script está disponible inmediatamente
   - SIEMPRE verificar `typeof window.createTabs === 'function'`
   - SIEMPRE usar múltiples métodos de espera

3. **SIEMPRE verificar antes de usar**
   - NO llamar `window.createTabs` sin verificar que existe
   - SIEMPRE usar `try-catch` para manejar errores
   - SIEMPRE mostrar errores en consola

4. **SIEMPRE limitar intentos**
   - NO usar loops infinitos
   - SIEMPRE limitar intentos (ej: 50 intentos máximo)
   - SIEMPRE limpiar intervalos cuando se encuentra

---

## 🔍 VERIFICACIÓN

### **En la consola del navegador:**

```javascript
// Verificar que components-loader.js se cargó
console.log('Script listo:', window._UBITS_COMPONENTS_LOADER_READY); // Debe ser true

// Verificar que window.createTabs está disponible
console.log('createTabs disponible:', typeof window.createTabs === 'function'); // Debe ser true

// Verificar que el contenedor existe
const container = document.getElementById('encuestas-tabs-container');
console.log('Contenedor existe:', !!container); // Debe ser true

// Verificar que los tabs se crearon
const tabs = container?.querySelector('.ubits-tabs');
console.log('Tabs creados:', !!tabs); // Debe ser true
```

---

## 📚 Referencias

- **Error común:** `docs/guias/troubleshooting/GUIA-PROBLEMAS-COMUNES-WIZARD.md` - Problema #3
- **Componente Tabs:** `docs/referencia/componentes/navegacin-tabs.md`
- **Catálogo componentes:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- **Guía de uso:** `docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md`

---

## ⚠️ PREVENCIÓN

**Para evitar este error en el futuro:**

1. **SIEMPRE** cargar scripts con verificación (`script.onload`)
2. **SIEMPRE** esperar a que los scripts estén listos antes de usar
3. **SIEMPRE** usar múltiples métodos de espera (eventos, polling, window.load)
4. **SIEMPRE** verificar que las funciones estén disponibles antes de usar
5. **SIEMPRE** manejar errores correctamente con `try-catch`

---

---

## 🔧 SOLUCIÓN FALLBACK IMPLEMENTADA

**Si `window.createTabs` no está disponible después de 20 intentos (6 segundos), se usa un fallback manual:**

```javascript
// ⚠️ FALLBACK: Renderizar tabs manualmente si createTabs no está disponible
const tabsData = [
    {
        id: 'tab-encuestas',
        label: 'Encuestas',
        icon: 'clipboard-list',
        active: true
    },
    {
        id: 'tab-datos-demograficos',
        label: 'Datos Demográficos',
        icon: 'users',
        active: false
    }
];

// Renderizar HTML manualmente
const tabsHTML = tabsData.map(tab => {
    const isActive = tab.active;
    const iconStyle = isActive ? 'fas' : 'far';
    const iconName = tab.icon.startsWith('fa-') ? tab.icon : `fa-${tab.icon}`;
    const activeClass = isActive ? 'ubits-tab--active' : '';
    
    return `
        <button class="ubits-tab ${activeClass}" data-tab-id="${tab.id}">
            <i class="${iconStyle} ${iconName}"></i>
            <span class="ubits-tab__label">${tab.label}</span>
        </button>
    `;
}).join('');

tabsContainer.innerHTML = `<div class="ubits-tabs">${tabsHTML}</div>`;

// Agregar event listeners manualmente
const tabsElement = tabsContainer.querySelector('.ubits-tabs');
if (tabsElement) {
    tabsElement.querySelectorAll('.ubits-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = tab.getAttribute('data-tab-id');
            
            // Remover active de todos
            tabsElement.querySelectorAll('.ubits-tab').forEach(t => {
                t.classList.remove('ubits-tab--active');
                const icon = t.querySelector('i');
                if (icon) {
                    const iconName = icon.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
                    if (iconName) {
                        icon.className = `far fa-${iconName}`;
                    }
                }
            });
            
            // Agregar active al clickeado
            tab.classList.add('ubits-tab--active');
            const activeIcon = tab.querySelector('i');
            if (activeIcon) {
                const iconName = activeIcon.className.replace(/^(fas|far)\s+/, '').replace(/^fa-/, '');
                if (iconName) {
                    activeIcon.className = `fas fa-${iconName}`;
                }
            }
            
            console.log('Tab cambiado:', tabId);
        });
    });
}
```

**⚠️ IMPORTANTE:** El fallback se ejecuta automáticamente después de 20 intentos (6 segundos) si `window.createTabs` no está disponible.

---

---

## ⚠️ PROBLEMA ADICIONAL: Sidebar y Tabs No Se Ven

**Síntomas:**
- El sidebar no aparece en la página
- Los tabs no aparecen en la página
- Ambos componentes se renderizan correctamente (según logs) pero no son visibles

**Causas Posibles:**
1. **Viewport móvil:** El sidebar se oculta en móvil (`max-width: 1023px`) con `display: none !important;`
2. **CSS no cargado:** Los estilos de `tabs.css` o `sidebar.css` no se están cargando correctamente
3. **Caché del navegador:** El navegador está mostrando una versión en caché sin los cambios
4. **Orden de carga:** Los scripts se están cargando en el orden incorrecto

**Soluciones:**

### **1. Verificar Viewport (Móvil vs Desktop)**
```javascript
// Verificar si estamos en modo móvil
const isMobile = window.innerWidth < 1024;
console.log('Viewport width:', window.innerWidth);
console.log('Es móvil:', isMobile);

// Si es móvil, el sidebar se oculta automáticamente (comportamiento esperado)
// Los tabs deberían seguir siendo visibles
```

### **2. Verificar que CSS se Cargó**
```javascript
// Verificar que tabs.css se cargó
const tabsStylesheet = Array.from(document.styleSheets).find(sheet => 
    sheet.href && sheet.href.includes('tabs.css')
);
console.log('tabs.css cargado:', !!tabsStylesheet);

// Verificar que sidebar.css se cargó
const sidebarStylesheet = Array.from(document.styleSheets).find(sheet => 
    sheet.href && sheet.href.includes('sidebar.css')
);
console.log('sidebar.css cargado:', !!sidebarStylesheet);
```

### **3. Verificar que Elementos Están en el DOM**
```javascript
// Verificar sidebar
const sidebar = document.querySelector('.ubits-sidebar');
console.log('Sidebar en DOM:', !!sidebar);
if (sidebar) {
    console.log('Sidebar display:', window.getComputedStyle(sidebar).display);
    console.log('Sidebar visibility:', window.getComputedStyle(sidebar).visibility);
}

// Verificar tabs
const tabsContainer = document.getElementById('encuestas-tabs-container');
console.log('Tabs container en DOM:', !!tabsContainer);
if (tabsContainer) {
    console.log('Tabs container display:', window.getComputedStyle(tabsContainer).display);
    const tabs = tabsContainer.querySelector('.ubits-tabs');
    console.log('Tabs en DOM:', !!tabs);
    if (tabs) {
        console.log('Tabs display:', window.getComputedStyle(tabs).display);
    }
}
```

### **4. Hard Refresh del Navegador**
- **Chrome/Edge:** `Ctrl+Shift+R` (Windows) o `Cmd+Shift+R` (Mac)
- **Firefox:** `Ctrl+F5` (Windows) o `Cmd+Shift+R` (Mac)
- **Safari:** `Cmd+Option+R` (Mac)

### **5. Verificar Orden de Carga de Scripts**
```javascript
// Verificar que components-loader.js se cargó ANTES de template-loader.js
console.log('createSidebar disponible:', typeof window.createSidebar === 'function');
console.log('createTabs disponible:', typeof window.createTabs === 'function');
```

---

**Última actualización:** 2025-12-10  
**Estado:** ✅ Error corregido y documentado con fallback implementado  
**Nota:** Si los tabs y sidebar no se ven, verificar viewport (móvil vs desktop) y hacer hard refresh del navegador




