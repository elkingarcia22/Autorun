# 📏 Guía: Altura Dinámica para DataTable

Esta guía explica cómo aprovechar el espacio vertical disponible dinámicamente para que el DataTable se vea bien y use todo el espacio disponible.

---

## ⚠️ PROBLEMA IDENTIFICADO

El DataTable tiene un `max-height: 400px` fijo en el CSS para el contenedor scrollable vertical (`.ubits-data-table__scrollable-container--vertical`). Esto limita la altura del DataTable y no aprovecha el espacio vertical disponible.

---

## 📋 SOLUCIÓN: CALCULAR Y CONFIGURAR ALTURA DINÁMICAMENTE

### **PASO 1: CALCULAR ESPACIO DISPONIBLE** 🔍

**Necesitamos calcular:**
1. **Altura del viewport** (`window.innerHeight`)
2. **Altura de elementos superiores** (header, tabs, etc.)
3. **Altura del header del DataTable** (título, búsqueda, botones)
4. **Espacio disponible** = viewport - elementos superiores - header DataTable - padding/margins

**Función para calcular espacio disponible:**

```javascript
function calculateAvailableHeight(containerId) {
  // 1. Obtener altura del viewport
  const viewportHeight = window.innerHeight;
  
  // 2. Obtener contenedor del DataTable
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('⚠️ [Altura Dinámica] Contenedor no encontrado:', containerId);
    return null;
  }
  
  // 3. Obtener posición del contenedor en la página
  const containerRect = container.getBoundingClientRect();
  const containerTop = containerRect.top;
  
  // 4. Calcular altura del header del DataTable (si existe)
  const headerElement = container.querySelector('.ubits-data-table__header');
  const headerHeight = headerElement ? headerElement.offsetHeight : 0;
  
  // 5. Calcular espacio disponible
  // viewportHeight - containerTop - headerHeight - padding/margins
  const paddingBottom = 24; // Padding inferior (puede ser un token)
  const marginBottom = 16; // Margin inferior (puede ser un token)
  const availableHeight = viewportHeight - containerTop - headerHeight - paddingBottom - marginBottom;
  
  console.log('📏 [Altura Dinámica] Cálculo:', {
    viewportHeight,
    containerTop,
    headerHeight,
    paddingBottom,
    marginBottom,
    availableHeight
  });
  
  return Math.max(availableHeight, 200); // Mínimo 200px para que sea usable
}
```

---

### **PASO 2: CONFIGURAR ALTURA DESPUÉS DE CREAR DATATABLE** 🛠️

**Después de crear el DataTable, configurar el max-height dinámicamente:**

```javascript
window.initEncuestasDataTable = function() {
  const container = document.getElementById('encuestas-table-container');
  if (!container) {
    console.warn('⚠️ [Encuestas DataTable] Contenedor no encontrado');
    return;
  }
  
  // Verificar si ya está inicializado
  if (container.querySelector('.ubits-data-table')) {
    console.log('✅ [Encuestas DataTable] Ya está inicializado');
    return;
  }
  
  // Verificar que window.createDataTable esté disponible
  if (typeof window.createDataTable !== 'function') {
    console.warn('⚠️ [Encuestas DataTable] window.createDataTable no está disponible, esperando...');
    setTimeout(window.initEncuestasDataTable, 100);
    return;
  }
  
  // Crear el DataTable
  try {
    window.createDataTable({
      containerId: 'encuestas-table-container',
      // ... configuración del DataTable
      showVerticalScrollbar: true, // ✅ Habilitar scroll vertical
      // ... resto de configuración
    });
    
    // ✅ NUEVO: Configurar altura dinámica después de crear
    setTimeout(() => {
      configureDynamicHeight('encuestas-table-container');
    }, 100); // Esperar a que el DOM se actualice
    
  } catch (error) {
    console.error('❌ [Encuestas DataTable] Error al inicializar DataTable:', error);
  }
};

// ✅ NUEVA FUNCIÓN: Configurar altura dinámica
function configureDynamicHeight(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('⚠️ [Altura Dinámica] Contenedor no encontrado:', containerId);
    return;
  }
  
  // Buscar el contenedor scrollable
  const scrollableContainer = container.querySelector('.ubits-data-table__scrollable-container--vertical');
  if (!scrollableContainer) {
    console.warn('⚠️ [Altura Dinámica] Contenedor scrollable no encontrado');
    return;
  }
  
  // Calcular altura disponible
  const availableHeight = calculateAvailableHeight(containerId);
  if (!availableHeight) {
    console.warn('⚠️ [Altura Dinámica] No se pudo calcular altura disponible');
    return;
  }
  
  // Configurar max-height dinámicamente
  scrollableContainer.style.maxHeight = `${availableHeight}px`;
  
  console.log('✅ [Altura Dinámica] Altura configurada:', {
    containerId,
    maxHeight: `${availableHeight}px`,
    scrollableContainer: scrollableContainer
  });
  
  // ✅ OPCIONAL: Recalcular cuando cambie el tamaño de la ventana
  const handleResize = () => {
    const newAvailableHeight = calculateAvailableHeight(containerId);
    if (newAvailableHeight) {
      scrollableContainer.style.maxHeight = `${newAvailableHeight}px`;
      console.log('✅ [Altura Dinámica] Altura recalculada en resize:', `${newAvailableHeight}px`);
    }
  };
  
  // Agregar listener de resize (solo una vez)
  if (!scrollableContainer._resizeListenerAttached) {
    window.addEventListener('resize', handleResize);
    scrollableContainer._resizeListenerAttached = true;
    console.log('✅ [Altura Dinámica] Listener de resize agregado');
  }
}
```

---

### **PASO 3: CONSIDERAR ELEMENTOS SUPERIORES** 📐

**Si hay elementos superiores (header, tabs, etc.), incluirlos en el cálculo:**

```javascript
function calculateAvailableHeight(containerId) {
  const viewportHeight = window.innerHeight;
  const container = document.getElementById(containerId);
  if (!container) return null;
  
  const containerRect = container.getBoundingClientRect();
  const containerTop = containerRect.top;
  
  // ✅ NUEVO: Calcular altura de elementos superiores
  // Ejemplo: Tabs arriba del DataTable
  const tabsElement = document.querySelector('.ubits-tabs');
  const tabsHeight = tabsElement ? tabsElement.offsetHeight : 0;
  
  // Ejemplo: Header de la página
  const pageHeader = document.querySelector('.page-header');
  const pageHeaderHeight = pageHeader ? pageHeader.offsetHeight : 0;
  
  // Calcular altura del header del DataTable
  const headerElement = container.querySelector('.ubits-data-table__header');
  const headerHeight = headerElement ? headerElement.offsetHeight : 0;
  
  // Espaciado entre elementos
  const spacing = 16; // Token de spacing (ej: --ubits-spacing-lg)
  
  // Calcular espacio disponible
  const availableHeight = viewportHeight 
    - containerTop 
    - tabsHeight 
    - spacing 
    - headerHeight 
    - spacing; // Padding inferior
  
  console.log('📏 [Altura Dinámica] Cálculo con elementos superiores:', {
    viewportHeight,
    containerTop,
    tabsHeight,
    pageHeaderHeight,
    headerHeight,
    spacing,
    availableHeight
  });
  
  return Math.max(availableHeight, 200); // Mínimo 200px
}
```

---

### **PASO 4: USAR TOKENS UBITS PARA ESPACIADO** 🎨

**Usar tokens UBITS para padding y margins:**

```javascript
function calculateAvailableHeight(containerId) {
  const viewportHeight = window.innerHeight;
  const container = document.getElementById(containerId);
  if (!container) return null;
  
  const containerRect = container.getBoundingClientRect();
  const containerTop = containerRect.top;
  
  // ✅ Usar tokens UBITS para spacing
  const spacingLg = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--ubits-spacing-lg') || '16', 10);
  const spacingMd = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--ubits-spacing-md') || '16', 10);
  
  const headerElement = container.querySelector('.ubits-data-table__header');
  const headerHeight = headerElement ? headerElement.offsetHeight : 0;
  
  // Usar tokens para padding y margins
  const paddingBottom = spacingLg;
  const marginBottom = spacingMd;
  
  const availableHeight = viewportHeight 
    - containerTop 
    - headerHeight 
    - paddingBottom 
    - marginBottom;
  
  return Math.max(availableHeight, 200);
}
```

---

## ✅ CHECKLIST OBLIGATORIO

Al configurar altura dinámica para DataTable:

- [ ] **Calcular espacio disponible**
  - Obtener altura del viewport (`window.innerHeight`)
  - Obtener posición del contenedor (`getBoundingClientRect().top`)
  - Calcular altura del header del DataTable
  - Calcular altura de elementos superiores (tabs, header, etc.)
  - Restar padding y margins

- [ ] **Configurar max-height después de crear DataTable**
  - Esperar a que el DOM se actualice (`setTimeout` 100ms)
  - Buscar el contenedor scrollable (`.ubits-data-table__scrollable-container--vertical`)
  - Configurar `maxHeight` dinámicamente

- [ ] **Agregar listener de resize**
  - Recalcular altura cuando cambie el tamaño de la ventana
  - Evitar agregar múltiples listeners (usar flag)

- [ ] **Usar tokens UBITS para spacing**
  - Usar `--ubits-spacing-lg`, `--ubits-spacing-md`, etc.
  - No hardcodear valores de padding/margin

- [ ] **Verificar mínimo de altura**
  - Asegurar mínimo 200px para que sea usable
  - No permitir altura negativa

---

## 🚨 ERRORES COMUNES A EVITAR

### **Error 1: No Esperar a que el DOM se Actualice**

❌ **INCORRECTO:**
```javascript
window.createDataTable({ /* ... */ });
// Intentar configurar altura inmediatamente
configureDynamicHeight('container-id'); // ❌ El contenedor scrollable aún no existe
```

✅ **CORRECTO:**
```javascript
window.createDataTable({ /* ... */ });
// Esperar a que el DOM se actualice
setTimeout(() => {
  configureDynamicHeight('container-id'); // ✅ El contenedor scrollable ya existe
}, 100);
```

### **Error 2: No Considerar Elementos Superiores**

❌ **INCORRECTO:**
```javascript
// Solo calcular viewport - containerTop
const availableHeight = viewportHeight - containerTop;
```

✅ **CORRECTO:**
```javascript
// Considerar elementos superiores (tabs, header, etc.)
const tabsHeight = tabsElement ? tabsElement.offsetHeight : 0;
const headerHeight = headerElement ? headerElement.offsetHeight : 0;
const availableHeight = viewportHeight - containerTop - tabsHeight - headerHeight - spacing;
```

### **Error 3: No Recalcular en Resize**

❌ **INCORRECTO:**
```javascript
// Configurar altura una vez y olvidarse
scrollableContainer.style.maxHeight = `${availableHeight}px`;
```

✅ **CORRECTO:**
```javascript
// Agregar listener de resize para recalcular
window.addEventListener('resize', () => {
  const newAvailableHeight = calculateAvailableHeight(containerId);
  if (newAvailableHeight) {
    scrollableContainer.style.maxHeight = `${newAvailableHeight}px`;
  }
});
```

---

## 📚 EJEMPLO COMPLETO

```javascript
// Función para calcular altura disponible
function calculateAvailableHeight(containerId) {
  const viewportHeight = window.innerHeight;
  const container = document.getElementById(containerId);
  if (!container) return null;
  
  const containerRect = container.getBoundingClientRect();
  const containerTop = containerRect.top;
  
  // Calcular altura de elementos superiores
  const tabsElement = document.querySelector('.ubits-tabs');
  const tabsHeight = tabsElement ? tabsElement.offsetHeight : 0;
  
  // Calcular altura del header del DataTable
  const headerElement = container.querySelector('.ubits-data-table__header');
  const headerHeight = headerElement ? headerElement.offsetHeight : 0;
  
  // Usar tokens UBITS para spacing
  const spacingLg = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--ubits-spacing-lg') || '16', 10);
  
  // Calcular espacio disponible
  const availableHeight = viewportHeight 
    - containerTop 
    - tabsHeight 
    - spacingLg 
    - headerHeight 
    - spacingLg;
  
  return Math.max(availableHeight, 200); // Mínimo 200px
}

// Función para configurar altura dinámica
function configureDynamicHeight(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const scrollableContainer = container.querySelector('.ubits-data-table__scrollable-container--vertical');
  if (!scrollableContainer) return;
  
  const availableHeight = calculateAvailableHeight(containerId);
  if (!availableHeight) return;
  
  scrollableContainer.style.maxHeight = `${availableHeight}px`;
  
  // Agregar listener de resize (solo una vez)
  if (!scrollableContainer._resizeListenerAttached) {
    const handleResize = () => {
      const newAvailableHeight = calculateAvailableHeight(containerId);
      if (newAvailableHeight) {
        scrollableContainer.style.maxHeight = `${newAvailableHeight}px`;
      }
    };
    window.addEventListener('resize', handleResize);
    scrollableContainer._resizeListenerAttached = true;
  }
}

// Función para inicializar DataTable con altura dinámica
window.initEncuestasDataTable = function() {
  const container = document.getElementById('encuestas-table-container');
  if (!container) return;
  
  if (container.querySelector('.ubits-data-table')) {
    return; // Ya está inicializado
  }
  
  if (typeof window.createDataTable !== 'function') {
    setTimeout(window.initEncuestasDataTable, 100);
    return;
  }
  
  try {
    window.createDataTable({
      containerId: 'encuestas-table-container',
      // ... configuración del DataTable
      showVerticalScrollbar: true, // ✅ Habilitar scroll vertical
      // ... resto de configuración
    });
    
    // ✅ Configurar altura dinámica después de crear
    setTimeout(() => {
      configureDynamicHeight('encuestas-table-container');
    }, 100);
    
  } catch (error) {
    console.error('❌ Error al inicializar DataTable:', error);
  }
};
```

---

## 🔗 Referencias

- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **CSS del DataTable:** `vendor/ubits/packages/components/data-table/src/styles/data-table.css`
- **Línea 1296:** `.ubits-data-table__scrollable-container--vertical { max-height: 400px; }`

---

## 💡 Resumen

1. **Calcular** espacio disponible (viewport - elementos superiores - header - spacing)
2. **Configurar** `maxHeight` dinámicamente después de crear el DataTable
3. **Recalcular** en resize para mantener la altura correcta
4. **Usar tokens UBITS** para spacing en lugar de valores hardcodeados
5. **Verificar mínimo** de altura (200px) para que sea usable

---

**Última actualización:** Diciembre 2024









