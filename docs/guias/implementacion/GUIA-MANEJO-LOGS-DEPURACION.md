# 🔍 Guía: Manejo de Logs para Depuración

## ⚠️ PROBLEMA CRÍTICO

**Los logs excesivos o mal estructurados dificultan la depuración y pueden ocultar problemas reales.**

### **Errores Comunes:**
1. ❌ Logs sin prefijos identificables
2. ❌ Logs en cada iteración de loops
3. ❌ Logs sin contexto (no indican qué componente/función)
4. ❌ Logs que no se pueden filtrar fácilmente
5. ❌ Logs que no muestran el estado ANTES y DESPUÉS de cambios
6. ❌ Logs que no indican si algo falló o tuvo éxito

---

## ✅ ESTÁNDAR DE LOGS PARA AUTORUN

### **1. Prefijos Obligatorios**

**Formato:** `[Componente/Contexto] Mensaje`

```javascript
// ✅ CORRECTO
console.log('🔵 [Tabs] Click detectado en tab:', tabId);
console.log('🔵 [Tabs] handleTabClick - Tab clickeado:', tabId);
console.log('🔵 [Encuestas] Restaurando tabs-container...');

// ❌ INCORRECTO
console.log('Click detectado:', tabId);
console.log('Tab clickeado:', tabId);
console.log('Restaurando...');
```

### **2. Emojis para Categorización Visual**

| Emoji | Significado | Uso |
|-------|-------------|-----|
| 🔵 | Información general | Logs informativos normales |
| ✅ | Éxito/Confirmación | Operaciones completadas exitosamente |
| ⚠️ | Advertencia | Situaciones que requieren atención |
| ❌ | Error | Errores o fallos |
| 🔍 | Búsqueda/Verificación | Verificaciones y diagnósticos |
| 🔧 | Configuración/Setup | Inicialización y configuración |
| 📊 | Datos/Estadísticas | Información numérica o estadística |
| 🔄 | Proceso/Operación | Operaciones en curso |
| 🎯 | Objetivo/Meta | Logs relacionados con objetivos |

### **3. Logs ANTES y DESPUÉS de Cambios Críticos**

```javascript
// ✅ CORRECTO - Muestra estado antes y después
console.log('🔵 [Tabs] Clases ANTES de remover active:', tabElement.className);
tabElement.classList.remove('ubits-tab--active');
console.log('🔵 [Tabs] Clases DESPUÉS de remover active:', tabElement.className);

// ❌ INCORRECTO - Solo muestra después
tabElement.classList.remove('ubits-tab--active');
console.log('Clases:', tabElement.className);
```

### **4. Logs con Contexto Completo**

```javascript
// ✅ CORRECTO - Incluye toda la información relevante
console.log('🔵 [Tabs] handleTabClick - Tab clickeado:', tabId);
console.log('🔵 [Tabs] handleTabClick - URL:', url);
console.log('🔵 [Tabs] handleTabClick - Elemento:', tabElement);
console.log('🔵 [Tabs] handleTabClick - Clases del elemento:', tabElement?.className);

// ❌ INCORRECTO - Información incompleta
console.log('Tab clickeado:', tabId);
```

### **5. Logs Agrupados para Operaciones Complejas**

```javascript
// ✅ CORRECTO - Agrupa logs relacionados
console.log('🔵 [Tabs] ========== INICIO ACTUALIZACIÓN DE TABS ==========');
console.log('🔵 [Tabs] Removiendo active de todos los tabs...');
tabs.forEach((tab) => {
  console.log('🔵 [Tabs] Removiendo active de tab:', tab.getAttribute('data-tab-id'));
  tab.classList.remove('ubits-tab--active');
});
console.log('🔵 [Tabs] Agregando active a tab:', tabId);
tabElement.classList.add('ubits-tab--active');
console.log('🔵 [Tabs] ========== FIN ACTUALIZACIÓN DE TABS ==========');

// ❌ INCORRECTO - Logs dispersos sin agrupación
tabs.forEach((tab) => {
  tab.classList.remove('ubits-tab--active');
});
tabElement.classList.add('ubits-tab--active');
```

### **6. Logs Condicionales (Solo en Desarrollo)**

```javascript
// ✅ CORRECTO - Logs solo en desarrollo
const DEBUG = true; // o detectar automáticamente
if (DEBUG) {
  console.log('🔵 [Tabs] Debug: Estado interno:', internalState);
}

// O usar una función helper
function debugLog(component, message, data) {
  if (window.DEBUG_MODE || window.location.hostname === 'localhost') {
    console.log(`🔵 [${component}] ${message}`, data);
  }
}

// Uso:
debugLog('Tabs', 'Estado interno', internalState);
```

### **7. Logs de Verificación de Estado**

```javascript
// ✅ CORRECTO - Verifica estado antes de operar
const container = document.getElementById('encuestas-tabs-container');
if (!container) {
  console.warn('⚠️ [Encuestas Tabs] Contenedor no encontrado');
  return;
}

const existingTabs = container.querySelector('.ubits-tabs');
if (existingTabs) {
  const tabsWithListeners = existingTabs.querySelectorAll('.ubits-tab[data-listener-attached="true"]');
  if (tabsWithListeners.length > 0) {
    console.log('✅ [Encuestas Tabs] Ya están inicializados con listeners');
    return;
  } else {
    console.log('🔵 [Encuestas Tabs] Tabs existen pero sin listeners, re-agregando listeners...');
  }
}
```

---

## 📋 CHECKLIST OBLIGATORIO PARA LOGS

### **ANTES de agregar logs:**

- [ ] **1. ¿El log tiene un prefijo identificable?**
  - Formato: `[Componente/Contexto]`
  - Ejemplo: `[Tabs]`, `[Encuestas]`, `[DataTable]`

- [ ] **2. ¿El log tiene un emoji apropiado?**
  - 🔵 para información general
  - ✅ para éxito
  - ⚠️ para advertencias
  - ❌ para errores

- [ ] **3. ¿El log muestra el estado ANTES y DESPUÉS de cambios críticos?**
  - Especialmente para operaciones DOM
  - Especialmente para actualizaciones de clases CSS

- [ ] **4. ¿El log incluye contexto completo?**
  - IDs, clases, atributos relevantes
  - Estado interno si es necesario

- [ ] **5. ¿Los logs están agrupados para operaciones complejas?**
  - Usar separadores visuales (`==========`)
  - Agrupar logs relacionados

- [ ] **6. ¿Los logs pueden filtrarse fácilmente en la consola?**
  - Prefijos consistentes permiten filtrar por componente
  - Ejemplo: Filtrar por `[Tabs]` para ver solo logs de tabs

- [ ] **7. ¿Los logs indican claramente éxito o fallo?**
  - Usar ✅ para éxito
  - Usar ❌ para fallo
  - Usar ⚠️ para advertencias

---

## 🎯 EJEMPLOS COMPLETOS

### **Ejemplo 1: Inicialización de Componente**

```javascript
window.initEncuestasTabs = function() {
  console.log('🔵 [Encuestas Tabs] ========== INICIO INICIALIZACIÓN ==========');
  
  const container = document.getElementById('encuestas-tabs-container');
  if (!container) {
    console.warn('⚠️ [Encuestas Tabs] Contenedor no encontrado');
    return;
  }
  
  // Verificar estado actual
  const existingTabs = container.querySelector('.ubits-tabs');
  if (existingTabs) {
    const tabsWithListeners = existingTabs.querySelectorAll('.ubits-tab[data-listener-attached="true"]');
    console.log('🔵 [Encuestas Tabs] Tabs existentes encontrados:', existingTabs);
    console.log('🔵 [Encuestas Tabs] Tabs con listeners:', tabsWithListeners.length);
    
    if (tabsWithListeners.length > 0) {
      console.log('✅ [Encuestas Tabs] Ya están inicializados con listeners');
      return;
    } else {
      console.log('🔵 [Encuestas Tabs] Tabs existen pero sin listeners, re-agregando listeners...');
    }
  }
  
  // Verificar dependencias
  if (typeof window.createTabs !== 'function') {
    console.warn('⚠️ [Encuestas Tabs] window.createTabs no está disponible, esperando...');
    setTimeout(window.initEncuestasTabs, 100);
    return;
  }
  
  // Crear tabs
  try {
    console.log('🔵 [Encuestas Tabs] Creando tabs...');
    window.createTabs({
      tabs: [
        { id: 'encuestas', label: 'Encuestas', icon: 'list-ul' },
        { id: 'datos-demograficos', label: 'Datos demográficos', icon: 'chart-pie-simple' }
      ],
      activeTabId: 'encuestas',
      onTabChange: (tabId, tabElement) => {
        console.log('🔵 [Encuestas Tabs] onTabChange callback - Tab cambiado:', tabId);
        console.log('🔵 [Encuestas Tabs] onTabChange callback - Elemento:', tabElement);
      }
    }, 'encuestas-tabs-container');
    
    console.log('✅ [Encuestas Tabs] Tabs inicializados correctamente');
  } catch (error) {
    console.error('❌ [Encuestas Tabs] Error al inicializar tabs:', error);
  }
  
  console.log('🔵 [Encuestas Tabs] ========== FIN INICIALIZACIÓN ==========');
};
```

### **Ejemplo 2: Restauración de Elementos**

```javascript
// Restaurar elementos después de updateContent
setTimeout(() => {
  const contentArea = document.querySelector('.content-area');
  if (contentArea && tabsHTML) {
    const existingTabs = contentArea.querySelector('#encuestas-tabs-container');
    
    console.log('🔵 [Encuestas] ========== RESTAURACIÓN DE ELEMENTOS ==========');
    console.log('🔵 [Encuestas] contentArea encontrado:', !!contentArea);
    console.log('🔵 [Encuestas] tabsHTML disponible:', !!tabsHTML);
    console.log('🔵 [Encuestas] existingTabs encontrado:', !!existingTabs);
    
    if (!existingTabs) {
      console.log('🔵 [Encuestas] Restaurando tabs-container...');
      contentArea.insertAdjacentHTML('afterbegin', tabsHTML);
      
      // Re-inicializar
      const restoredTabs = document.getElementById('encuestas-tabs-container');
      if (restoredTabs) {
        console.log('🔵 [Encuestas] Re-inicializando tabs después de restaurar...');
        const existingTabsElement = restoredTabs.querySelector('.ubits-tabs');
        if (existingTabsElement) {
          console.log('🔵 [Encuestas] Eliminando tabs existentes para reinicializar...');
          existingTabsElement.remove();
        }
        if (window.initEncuestasTabs) {
          window.initEncuestasTabs();
        }
      }
      console.log('✅ [Encuestas] Tabs restaurados e inicializados');
    } else {
      console.log('✅ [Encuestas] Tabs ya existen, no es necesario restaurar');
    }
    console.log('🔵 [Encuestas] ========== FIN RESTAURACIÓN ==========');
  }
}, 50);
```

---

## ⚠️ REGLAS CRÍTICAS

1. **SIEMPRE usar prefijos identificables** - `[Componente]`
2. **SIEMPRE usar emojis apropiados** - 🔵 ✅ ⚠️ ❌
3. **SIEMPRE mostrar estado ANTES y DESPUÉS** de cambios críticos
4. **SIEMPRE incluir contexto completo** - IDs, clases, atributos
5. **SIEMPRE agrupar logs relacionados** - Usar separadores visuales
6. **SIEMPRE verificar estado antes de operar** - Logs de verificación
7. **NUNCA usar logs sin contexto** - Siempre incluir prefijo y emoji
8. **NUNCA usar logs excesivos en loops** - Solo logs de resumen o errores

---

## 📚 REFERENCIAS

- **Guía de errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- **Guía de ContentManager:** `docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md`
- **Proceso de implementación:** `docs/guias/implementacion/GUIA-PROCESO-IMPLEMENTACION-PASO-A-PASO.md`

---

**Última actualización:** Diciembre 2024









