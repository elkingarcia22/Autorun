# 📐 Guía: Layout, Template y DataTable - Implementación Correcta

Esta guía documenta cómo implementar correctamente el layout del template, el posicionamiento del SubNav, y la alineación del DataTable con el sidebar. **OBLIGATORIO seguir esta guía para evitar scroll innecesario y asegurar alineación correcta.**

---

## ⚠️ PRINCIPIOS FUNDAMENTALES

1. **SubNav debe estar fijo** - No debe moverse con el scroll
2. **No debe haber scroll en la página** - Solo el scrollable container de la tabla debe tener scroll
3. **DataTable debe alinearse con el sidebar** - El contenedor de la tabla debe terminar al mismo nivel que el sidebar
4. **Altura dinámica basada en sidebar real** - Usar la posición real del sidebar, no cálculos teóricos
5. **Evitar scroll innecesario** - Si hay pocos items, el contenedor debe usar altura natural

---

## 📋 IMPLEMENTACIÓN DEL LAYOUT

### **1. HTML y Body - Sin Scroll de Página**

**✅ CORRECTO:**
```css
html, body {
    height: 100%; /* Altura fija del viewport */
    margin: 0;
    padding: 0;
}

body {
    background-color: var(--ubits-bg-2);
    overflow-x: hidden;
    overflow-y: hidden; /* ✅ CRÍTICO: No permitir scroll en la página */
    font-family: var(--font-sans, 'Noto Sans', sans-serif);
    scrollbar-width: thin;
    scrollbar-color: var(--ubits-fg-2-medium-static) var(--ubits-bg-5);
}
```

**❌ INCORRECTO:**
```css
body {
    overflow-y: auto; /* ❌ Esto permite scroll en la página */
}
```

**⚠️ CRÍTICO:** El scroll solo debe estar dentro del scrollable container de la tabla, NO en la página completa.

---

### **2. SubNav - Debe Estar Fijo (Sticky)**

**✅ CORRECTO:**
```css
#top-nav-container {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    /* ✅ SUBNAV FIJO: El SubNav debe estar fijo en la parte superior */
    position: sticky;
    top: 0;
    z-index: 100; /* Asegurar que esté por encima del contenido */
    background-color: var(--ubits-bg-2); /* Fondo para que no se vea el contenido al hacer scroll */
}

/* Asegurar que el SubNav dentro del contenedor también tenga el fondo correcto */
#top-nav-container .ubits-sub-nav {
    background-color: var(--ubits-bg-1);
}
```

**❌ INCORRECTO:**
```css
#top-nav-container {
    position: relative; /* ❌ El SubNav se moverá con el scroll */
}
```

**⚠️ CRÍTICO:** El SubNav debe permanecer visible en la parte superior cuando se hace scroll en la tabla.

---

### **3. Main Content - Limitar Altura al Viewport**

**✅ CORRECTO:**
```css
.main-content {
    position: relative;
    flex: 1;
    margin: var(--ubits-spacing-lg, 16px) var(--ubits-spacing-2xl, 24px) 0 calc(var(--ubits-spacing-2xl, 24px) + 96px + 23px);
    width: calc(100% - calc(var(--ubits-spacing-2xl, 24px) + 96px + 23px) - var(--ubits-spacing-2xl, 24px));
    overflow: visible;
    max-height: calc(100vh - var(--ubits-spacing-lg, 16px)); /* ✅ CRÍTICO: Limitar altura al viewport */
    display: flex;
    flex-direction: column;
    gap: var(--ubits-spacing-xl, 20px);
    padding-bottom: 0; /* ✅ CRÍTICO: Sin padding-bottom para alineación correcta con sidebar */
    z-index: 5;
    box-sizing: border-box;
}
```

**⚠️ CRÍTICO:** 
- El `max-height` debe ser `calc(100vh - margen superior)` para evitar que el contenido exceda el viewport
- **NO debe haber `padding-bottom`** - El contenedor se alinea directamente con el sidebar sin espacio adicional

---

## 📋 IMPLEMENTACIÓN DEL CONTENEDOR DE LA TABLA

### **1. Contenedor de la Tabla - Estilos Base**

**✅ CORRECTO:**
```css
#encuestas-table-container {
    width: 100%;
    margin-top: var(--ubits-spacing-lg); /* 16px entre Tabs y DataTable */
    padding: var(--ubits-spacing-lg); /* 16px en todos los lados para el fondo y border-radius */
    margin-bottom: 0; /* ✅ ALINEACIÓN CON SIDEBAR: Sin margin-bottom, el contenedor se alinea directamente con el sidebar */
    background: var(--modifiers-normal-color-light-bg-1);
    border-radius: var(--ubits-border-radius-md);
    box-sizing: border-box;
    /* ✅ EVITAR DESBORDAMIENTO: El contenedor debe tener overflow hidden para que el scrollable container funcione correctamente */
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
```

**⚠️ CRÍTICO:** 
- `overflow: hidden` en el contenedor evita que el contenido se desborde
- `display: flex` y `flex-direction: column` permiten que el scrollable container funcione correctamente

---

### **2. Scrollable Container - Scroll Interno**

**✅ CORRECTO:**
```css
#encuestas-table-container .ubits-data-table__scrollable-container--vertical {
    /* max-height se establecerá dinámicamente con JavaScript */
    transition: max-height 0.3s ease;
    /* ✅ EVITAR DESBORDAMIENTO: Asegurar que el scrollable container tenga overflow-y: auto */
    overflow-y: auto !important;
    overflow-x: visible !important;
    flex: 1;
    min-height: 0;
    /* ✅ PADDING INFERIOR: 16px de padding interno en la parte inferior de la tabla */
    padding-bottom: var(--ubits-spacing-lg, 16px) !important;
}
```

**⚠️ CRÍTICO:**
- `overflow-y: auto !important` permite scroll vertical dentro del contenedor
- `flex: 1` y `min-height: 0` permiten que el scrollable container respete el espacio disponible
- `padding-bottom: 16px` agrega espacio interno en la parte inferior de la tabla para mejor visualización

---

## 📋 CÁLCULO DE ALTURA DINÁMICA

### **1. Función de Ajuste de Altura - Basada en Sidebar Real**

**✅ CORRECTO:**
```javascript
const adjustDataTableHeight = () => {
  const container = document.getElementById('encuestas-table-container');
  if (!container) return;

  const scrollableContainer = container.querySelector('.ubits-data-table__scrollable-container--vertical');
  if (!scrollableContainer) return;

  // Calcular altura disponible del viewport
  const viewportHeight = window.innerHeight;
  
  // Calcular espacio ocupado por elementos superiores
  const subNav = document.querySelector('#top-nav-container');
  const subNavHeight = subNav ? subNav.offsetHeight : 0;
  
  const tabsContainer = document.getElementById('encuestas-tabs-container');
  const tabsHeight = tabsContainer ? tabsContainer.offsetHeight : 0;
  
  const dataTableHeader = container.querySelector('.ubits-data-table__header');
  const headerHeight = dataTableHeader ? dataTableHeader.offsetHeight : 0;
  
  // Padding del contenedor (16px arriba + 16px abajo = 32px)
  const containerPadding = 32;
  
  // Margen superior del contenedor (16px)
  const containerMarginTop = 16;
  
  // ✅ ALINEACIÓN CON SIDEBAR: Ya no hay padding-bottom, el contenedor se alinea directamente con el sidebar
  const finalPaddingBottom = 0;
  
  // ✅ Calcular altura máxima del contenedor basándose en la posición REAL del sidebar
  // Obtener la posición real del sidebar usando getBoundingClientRect()
  const sidebarElement = document.querySelector('.ubits-sidebar');
  const sidebarRect = sidebarElement ? sidebarElement.getBoundingClientRect() : null;
  const sidebarBottom = sidebarRect ? sidebarRect.bottom : viewportHeight - 16; // Fallback si no hay sidebar
  
  // Obtener la posición del contenedor de la tabla
  const containerRect = container.getBoundingClientRect();
  
  // Calcular altura máxima del contenedor para que termine al mismo nivel que el sidebar
  // El contenedor debe terminar en sidebarBottom, entonces:
  // maxContainerHeight = sidebarBottom - containerRect.top
  // NO restamos finalPaddingBottom porque el contenedor ya tiene su propio padding interno
  const maxContainerHeight = sidebarBottom - containerRect.top;
  
  // ✅ SIEMPRE aplicar max-height al contenedor para alinearlo con el sidebar
  // El contenedor DEBE terminar al mismo nivel que el sidebar, independientemente de la cantidad de items
  if (maxContainerHeight > 0) {
    container.style.maxHeight = `${maxContainerHeight}px`;
    console.log('📏 [Encuestas DataTable] Altura máxima del contenedor aplicada (alineado con sidebar):', {
      maxContainerHeight,
      sidebarBottom: sidebarRect?.bottom,
      containerTop: containerRect.top,
      itemsCount: items.length
    });
  } else {
    console.warn('⚠️ [Encuestas DataTable] maxContainerHeight es <= 0, no se aplicará altura máxima');
  }
  
  // Calcular altura mínima necesaria para mostrar todos los items
  // Estimación: ~45px por fila + header de tabla (~45px)
  const rowHeight = 45;
  const tableHeaderHeight = 45;
  const minHeightNeeded = tableHeaderHeight + (items.length * rowHeight);
  
  // Calcular altura disponible para el scrollable container
  // Esta altura debe ser: maxContainerHeight - headerHeight - containerPadding (solo el padding superior)
  const containerPaddingTop = 16; // Solo el padding superior del contenedor
  const availableHeightForScrollable = maxContainerHeight - headerHeight - containerPaddingTop;
  
  // Solo aplicar max-height al scrollable container si hay suficientes items para justificar el scroll
  if (minHeightNeeded > availableHeightForScrollable && availableHeightForScrollable > 200) {
    // Hay suficientes items, ajustar altura al espacio disponible
    scrollableContainer.style.maxHeight = `${availableHeightForScrollable}px`;
    console.log('📏 [Encuestas DataTable] Altura del scrollable container ajustada:', {
      availableHeightForScrollable,
      minHeightNeeded,
      maxHeight: `${availableHeightForScrollable}px`,
      itemsCount: items.length
    });
  } else {
    // Pocos items o espacio insuficiente, usar altura natural (sin scroll)
    scrollableContainer.style.maxHeight = 'none';
    console.log('📏 [Encuestas DataTable] Scrollable container usando altura natural (sin scroll):', {
      availableHeightForScrollable,
      minHeightNeeded,
      itemsCount: items.length,
      reason: minHeightNeeded <= availableHeightForScrollable ? 'Pocos items' : 'Espacio insuficiente'
    });
  }
};
```

**⚠️ CRÍTICO:**
1. **Usar posición real del sidebar:** `sidebarRect.bottom` en lugar de cálculos teóricos
2. **Lógica condicional:** Solo aplicar `max-height` si hay suficientes items para justificarlo
3. **Evitar scroll innecesario:** Si hay pocos items, usar altura natural (sin `max-height`)

---

### **2. Inicialización y Event Listeners**

**✅ CORRECTO:**
```javascript
// Ajustar altura después de que el DataTable se renderice
setTimeout(() => {
  adjustDataTableHeight();
  
  // Ajustar también cuando se redimensiona la ventana
  window.addEventListener('resize', () => {
    adjustDataTableHeight();
  });
}, 100);
```

**⚠️ CRÍTICO:** 
- Usar `setTimeout` para esperar a que el DOM se actualice
- Agregar listener de `resize` para recalcular cuando cambie el tamaño de la ventana

---

## 📋 CONTENT AREA - Sin Background

### **1. Clase no-background**

**✅ CORRECTO:**
```html
<div class="content-area no-background">
    <!-- Contenedores para componentes personalizados (Tabs y DataTable) -->
    <div id="encuestas-tabs-container"></div>
    <div id="encuestas-table-container"></div>
</div>
```

```css
.content-area.no-background {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important; /* ✅ ALINEACIÓN CON SIDEBAR: Sin padding, el contenedor se alinea directamente con el sidebar */
}
```

**⚠️ CRÍTICO:** 
- La clase `no-background` elimina el fondo y padding del `.content-area`
- **NO debe haber `padding-bottom`** - El contenedor se alinea directamente con el sidebar sin espacio adicional

---

## ✅ CHECKLIST OBLIGATORIO

Al implementar el layout y DataTable:

### **Layout General:**
- [ ] **HTML y Body sin scroll:** `overflow-y: hidden` en `body`, `height: 100%` en `html` y `body`
- [ ] **SubNav fijo:** `position: sticky`, `top: 0`, `z-index: 100`, fondo para que no se vea el contenido
- [ ] **Main Content limitado:** `max-height: calc(100vh - margen superior)` para evitar que exceda el viewport

### **Contenedor de la Tabla:**
- [ ] **Overflow hidden:** `overflow: hidden` en el contenedor para evitar desbordamiento
- [ ] **Flex layout:** `display: flex`, `flex-direction: column` para que el scrollable container funcione
- [ ] **Padding y fondo:** Padding y fondo blanco en el contenedor externo, NO en el interno

### **Scrollable Container:**
- [ ] **Overflow-y auto:** `overflow-y: auto !important` para permitir scroll vertical
- [ ] **Flex: 1:** `flex: 1` y `min-height: 0` para que respete el espacio disponible

### **Cálculo de Altura:**
- [ ] **Posición real del sidebar:** Usar `getBoundingClientRect().bottom` del sidebar, no cálculos teóricos
- [ ] **Contenedor siempre alineado:** SIEMPRE aplicar `max-height` al contenedor para alinearlo con el sidebar
- [ ] **Sin padding-bottom:** `finalPaddingBottom = 0` - No hay padding-bottom en `.main-content` ni `.content-area`
- [ ] **Scrollable container condicional:** Solo aplicar `max-height` al scrollable container si hay suficientes items

### **Content Area:**
- [ ] **Clase no-background:** Agregar clase `no-background` al `.content-area` si no tiene fondo
- [ ] **Sin padding-bottom:** `padding: 0 !important` - El contenedor se alinea directamente con el sidebar

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: Scroll en la Página**
```css
/* ❌ INCORRECTO */
body {
    overflow-y: auto; /* Permite scroll en la página */
}
```

**✅ CORRECTO:**
```css
body {
    overflow-y: hidden; /* Solo scroll en la tabla */
}
```

---

### **❌ ERROR 2: SubNav No Fijo**
```css
/* ❌ INCORRECTO */
#top-nav-container {
    position: relative; /* Se mueve con el scroll */
}
```

**✅ CORRECTO:**
```css
#top-nav-container {
    position: sticky;
    top: 0;
    z-index: 100;
}
```

---

### **❌ ERROR 3: Cálculo Teórico del Sidebar**
```javascript
// ❌ INCORRECTO
const sidebarBottom = viewportHeight - 16; // Cálculo teórico
```

**✅ CORRECTO:**
```javascript
const sidebarElement = document.querySelector('.ubits-sidebar');
const sidebarRect = sidebarElement ? sidebarElement.getBoundingClientRect() : null;
const sidebarBottom = sidebarRect ? sidebarRect.bottom : viewportHeight - 16; // Posición real
```

---

### **❌ ERROR 4: Siempre Aplicar max-height**
```javascript
// ❌ INCORRECTO
container.style.maxHeight = `${maxContainerHeight}px`; // Siempre aplica, incluso con pocos items
```

**✅ CORRECTO:**
```javascript
if (minHeightNeeded > maxContainerHeight && maxContainerHeight > 0) {
    container.style.maxHeight = `${maxContainerHeight}px`; // Solo si hay suficientes items
} else {
    container.style.maxHeight = 'none'; // Altura natural si hay pocos items
}
```

---

### **❌ ERROR 5: Contenedor Sin Overflow Hidden**
```css
/* ❌ INCORRECTO */
#encuestas-table-container {
    overflow: visible; /* Permite desbordamiento */
}
```

**✅ CORRECTO:**
```css
#encuestas-table-container {
    overflow: hidden; /* Evita desbordamiento */
    display: flex;
    flex-direction: column;
}
```

---

## 📝 RESUMEN

1. **Layout:** `body` sin scroll, `SubNav` fijo, `.main-content` limitado al viewport
2. **Contenedor de tabla:** `overflow: hidden`, `display: flex`, padding y fondo en contenedor externo
3. **Scrollable container:** `overflow-y: auto`, `flex: 1`, `min-height: 0`
4. **Cálculo de altura:** Usar posición real del sidebar, lógica condicional, evitar scroll innecesario
5. **Content area:** Clase `no-background` si no tiene fondo, `padding: 0` (sin padding-bottom)

**⚠️ CRÍTICO:** Seguir esta guía paso a paso para evitar scroll innecesario y asegurar alineación correcta con el sidebar.

