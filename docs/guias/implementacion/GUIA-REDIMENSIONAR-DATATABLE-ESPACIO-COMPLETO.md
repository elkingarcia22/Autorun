# 📐 Guía: Redimensionar DataTable para Aprovechar Espacio Completo (Vertical y Horizontal)

Esta guía documenta el proceso **OBLIGATORIO** para redimensionar el DataTable y aprovechar TODO el espacio vertical y horizontal disponible. **DEBES seguir esta guía SIEMPRE que implementes un DataTable.**

---

## ⚠️ PRINCIPIO FUNDAMENTAL

> **"El DataTable NO se redimensiona automáticamente. DEBES redimensionarlo manualmente para aprovechar TODO el espacio disponible."**

El DataTable tiene un CSS por defecto que limita su altura a `400px`. **SIEMPRE debes sobrescribir esto y calcular la altura dinámicamente basándote en la posición real del sidebar.**

---

## 📋 PROCESO OBLIGATORIO PASO A PASO

### **PASO 1: Configurar CSS Base (Body, HTML, SubNav)**

**⚠️ OBLIGATORIO:** Antes de implementar el DataTable, configurar estos estilos:

```css
html, body {
    height: 100%;
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

#top-nav-container {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    position: sticky; /* ✅ CRÍTICO: Fijo en la parte superior */
    top: 0;
    z-index: 100;
    background-color: var(--ubits-bg-2); /* Fondo para que no se vea el contenido */
}
```

**⚠️ CRÍTICO:**
- `overflow-y: hidden` en `body` evita scroll en la página completa
- `position: sticky` en SubNav lo mantiene fijo al hacer scroll
- `height: 100%` en `html` y `body` permite cálculos correctos

---

### **PASO 2: Configurar CSS del Contenedor de la Tabla**

**⚠️ OBLIGATORIO:** Configurar estos estilos para el contenedor de la tabla:

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

/* ✅ CRÍTICO: Sobrescribir el CSS del DataTable */
#encuestas-table-container .ubits-data-table__scrollable-container--vertical {
    /* ⚠️ CRÍTICO: Sobrescribir el max-height: 400px del CSS del DataTable */
    max-height: none !important; /* Permitir que JavaScript lo establezca */
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
- `overflow: hidden` en el contenedor evita desbordamiento
- `display: flex` y `flex-direction: column` permiten que el scrollable container funcione
- `max-height: none !important` sobrescribe el CSS por defecto del DataTable (`max-height: 400px`)
- `overflow-y: auto !important` permite scroll vertical dentro del contenedor
- `flex: 1` y `min-height: 0` permiten que el scrollable container respete el espacio disponible

---

### **PASO 3: Implementar Función de Redimensionamiento**

**⚠️ OBLIGATORIO:** Implementar esta función completa para redimensionar el DataTable:

```javascript
function adjustDataTableHeight(containerId) {
  const currentModule = document.body.getAttribute('data-module');
  if (currentModule !== 'encuestas') {
    return;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  
  const dataTable = container.querySelector('.ubits-data-table');
  if (!dataTable) {
    // Reintentar si el DataTable aún no se ha renderizado
    setTimeout(() => adjustDataTableHeight(containerId), 200);
    return;
  }
  
  const scrollableContainer = container.querySelector('.ubits-data-table__scrollable-container--vertical');
  if (!scrollableContainer) {
    // Reintentar si el scrollable container aún no se ha renderizado
    setTimeout(() => adjustDataTableHeight(containerId), 200);
    return;
  }
  
  // ✅ PASO 1: Obtener posición REAL del sidebar (NO usar cálculos teóricos)
  const sidebarElement = document.querySelector('.ubits-sidebar');
  const sidebarRect = sidebarElement ? sidebarElement.getBoundingClientRect() : null;
  const sidebarBottom = sidebarRect ? sidebarRect.bottom : window.innerHeight - 16; // Fallback si no hay sidebar
  
  // ✅ PASO 2: Obtener posición del contenedor de la tabla
  const containerRect = container.getBoundingClientRect();
  
  // ✅ PASO 3: Calcular altura máxima del contenedor para alinearlo con el sidebar
  // Fórmula: maxContainerHeight = sidebarBottom - containerRect.top
  const maxContainerHeight = sidebarBottom - containerRect.top;
  
  // ✅ PASO 4: Aplicar altura al contenedor principal (height Y max-height)
  // ⚠️ CRÍTICO: Usar height en lugar de solo max-height para forzar la altura exacta
  if (maxContainerHeight > 0) {
    container.style.height = `${maxContainerHeight}px`;
    container.style.maxHeight = `${maxContainerHeight}px`;
    
    // ✅ PASO 5: Verificar alineación después de aplicar
    requestAnimationFrame(() => {
      setTimeout(() => {
        const newContainerRect = container.getBoundingClientRect();
        const diferencia = sidebarBottom - newContainerRect.bottom;
        
        // Si no está alineado (diferencia >= 2px), ajustar automáticamente
        if (Math.abs(diferencia) >= 2) {
          const ajusteHeight = maxContainerHeight + diferencia;
          if (ajusteHeight > 0) {
            container.style.height = `${ajusteHeight}px`;
            container.style.maxHeight = `${ajusteHeight}px`;
          }
        }
      }, 100);
    });
  }
  
  // ✅ PASO 6: Obtener altura del header del DataTable
  // Buscar el header en diferentes ubicaciones posibles
  let header = dataTable.querySelector('.ubits-data-table__header');
  if (!header) {
    header = container.querySelector('.ubits-data-table__header');
  }
  if (!header) {
    // Buscar cualquier elemento con "header" en el DataTable
    const allHeaders = dataTable.querySelectorAll('[class*="header"]');
    if (allHeaders.length > 0) {
      header = allHeaders[0]; // Usar el primero (generalmente es el header row)
    }
  }
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  
  // ✅ PASO 7: Calcular altura disponible para el scrollable container
  const containerPaddingTop = 16; // Padding superior del contenedor (16px)
  const availableHeightForScrollable = maxContainerHeight - headerHeight - containerPaddingTop;
  
  // ✅ PASO 8: Contar items para determinar si necesitamos scroll
  const tableBody = scrollableContainer.querySelector('tbody');
  const rowCount = tableBody ? tableBody.querySelectorAll('tr').length : 0;
  
  // ✅ PASO 9: Calcular altura mínima necesaria para mostrar todos los items
  const rowHeight = 45; // Altura estimada por fila
  const tableHeaderHeight = 45; // Altura estimada del header de la tabla
  const minHeightNeeded = tableHeaderHeight + (rowCount * rowHeight);
  
  // ✅ PASO 10: Aplicar altura al scrollable container solo si hay suficientes items
  if (minHeightNeeded > availableHeightForScrollable && availableHeightForScrollable > 200) {
    // ⚠️ CRÍTICO: Usar setProperty con !important para sobrescribir el CSS del DataTable
    scrollableContainer.style.setProperty('max-height', `${availableHeightForScrollable}px`, 'important');
    
    // Verificar después de aplicar que el CSS no lo sobrescribió
    requestAnimationFrame(() => {
      const scrollableComputedStyle = window.getComputedStyle(scrollableContainer);
      if (scrollableComputedStyle.maxHeight !== `${availableHeightForScrollable}px`) {
        // Si fue sobrescrito, volver a aplicar
        scrollableContainer.style.setProperty('max-height', `${availableHeightForScrollable}px`, 'important');
      }
    });
  } else {
    // Pocos items o espacio insuficiente, usar altura natural (sin scroll)
    scrollableContainer.style.setProperty('max-height', 'none', 'important');
  }
  
  // ✅ PASO 11: Asegurar que la tabla ocupe TODO el ancho disponible
  dataTable.style.width = '100%';
  dataTable.style.maxWidth = '100%';
  container.style.width = '100%';
  container.style.maxWidth = '100%';
}
```

**⚠️ CRÍTICO:**
1. **Usar posición REAL del sidebar:** `getBoundingClientRect().bottom` en lugar de cálculos teóricos
2. **Aplicar height Y max-height:** Usar ambos para forzar la altura exacta
3. **Verificar alineación:** Comprobar después de aplicar y ajustar si es necesario
4. **Usar !important:** `setProperty` con `!important` para sobrescribir el CSS del DataTable
5. **Verificar que se aplicó:** Comprobar que el CSS no sobrescribió el valor

---

### **PASO 4: Llamar la Función en los Momentos Correctos**

**⚠️ OBLIGATORIO:** Llamar `adjustDataTableHeight` en estos momentos:

```javascript
// 1. Después de inicializar el DataTable (con setTimeout para esperar renderizado)
setTimeout(() => {
  adjustDataTableHeight('encuestas-table-container');
}, 300);

// 2. Cuando se redimensiona la ventana (con debounce)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    adjustDataTableHeight('encuestas-table-container');
  }, 200);
});

// 3. Cuando se restaura el DataTable después de ContentManager.updateContent
setTimeout(() => {
  adjustDataTableHeight('encuestas-table-container');
}, 500);
```

**⚠️ CRÍTICO:**
- Usar `setTimeout` para esperar a que el DOM se actualice
- Usar `requestAnimationFrame` para verificar después de aplicar estilos
- Usar debounce en el evento `resize` para evitar llamadas excesivas

---

## 📊 FÓRMULAS Y CÁLCULOS

### **Fórmula 1: Altura Máxima del Contenedor**
```
maxContainerHeight = sidebarBottom - containerTop
```

**Donde:**
- `sidebarBottom`: Posición real del bottom del sidebar (`getBoundingClientRect().bottom`)
- `containerTop`: Posición real del top del contenedor (`getBoundingClientRect().top`)

**⚠️ CRÍTICO:** NO usar cálculos teóricos. SIEMPRE usar `getBoundingClientRect()` para obtener posiciones reales.

---

### **Fórmula 2: Altura Disponible para Scrollable Container**
```
availableHeightForScrollable = maxContainerHeight - headerHeight - containerPaddingTop
```

**Donde:**
- `maxContainerHeight`: Altura máxima del contenedor (calculada con Fórmula 1)
- `headerHeight`: Altura del header del DataTable (si existe)
- `containerPaddingTop`: Padding superior del contenedor (16px)

---

### **Fórmula 3: Altura Mínima Necesaria**
```
minHeightNeeded = tableHeaderHeight + (rowCount * rowHeight)
```

**Donde:**
- `tableHeaderHeight`: Altura estimada del header de la tabla (45px)
- `rowCount`: Cantidad de filas en la tabla
- `rowHeight`: Altura estimada por fila (45px)

---

### **Condición para Aplicar max-height al Scrollable Container**
```
SI (minHeightNeeded > availableHeightForScrollable) Y (availableHeightForScrollable > 200):
    Aplicar max-height = availableHeightForScrollable
SINO:
    Usar altura natural (max-height: none)
```

---

## ✅ CHECKLIST OBLIGATORIO

**⚠️ ANTES de considerar que el DataTable está implementado correctamente, verificar:**

### **CSS Base:**
- [ ] `html, body { height: 100%; }`
- [ ] `body { overflow-y: hidden; }`
- [ ] `#top-nav-container { position: sticky; top: 0; z-index: 100; }`

### **CSS del Contenedor:**
- [ ] `#encuestas-table-container { overflow: hidden; display: flex; flex-direction: column; }`
- [ ] `#encuestas-table-container .ubits-data-table__scrollable-container--vertical { max-height: none !important; overflow-y: auto !important; flex: 1; min-height: 0; }`

### **Función de Redimensionamiento:**
- [ ] Usa posición REAL del sidebar (`getBoundingClientRect().bottom`)
- [ ] Aplica `height` Y `max-height` al contenedor principal
- [ ] Verifica alineación después de aplicar
- [ ] Ajusta automáticamente si no está alineado
- [ ] Usa `setProperty` con `!important` para el scrollable container
- [ ] Verifica que el CSS no sobrescribió el valor aplicado
- [ ] Asegura que la tabla ocupe 100% del ancho

### **Llamadas a la Función:**
- [ ] Después de inicializar el DataTable (con setTimeout)
- [ ] En el evento `resize` de la ventana (con debounce)
- [ ] Después de restaurar el DataTable (ContentManager)

### **Verificación Final:**
- [ ] La tabla aprovecha TODO el espacio vertical disponible
- [ ] La tabla aprovecha TODO el espacio horizontal disponible
- [ ] El contenedor termina al mismo nivel que el sidebar
- [ ] Solo hay scroll dentro del scrollable container, NO en la página
- [ ] La tabla se ajusta cuando cambia el tamaño de la ventana

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: No Verificar CSS por Defecto del DataTable**

**Problema:**
- El CSS del DataTable tiene `max-height: 400px` por defecto
- Este CSS se aplica automáticamente y limita la altura
- **NO se verificó** este CSS antes de implementar

**✅ SOLUCIÓN:**
```css
/* Sobrescribir el CSS del DataTable */
#encuestas-table-container .ubits-data-table__scrollable-container--vertical {
    max-height: none !important;
}
```

---

### **❌ ERROR 2: Cálculo Teórico en Lugar de Posición Real**

**Problema:**
- Se intentó calcular la altura usando `viewportHeight - containerTop - headerHeight - spacing`
- Este cálculo es **teórico** y no considera la posición real del sidebar

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Usar posición real del sidebar
const sidebarRect = sidebarElement.getBoundingClientRect();
const sidebarBottom = sidebarRect.bottom;
const maxContainerHeight = sidebarBottom - containerRect.top;
```

---

### **❌ ERROR 3: Solo Aplicar al Scrollable Container**

**Problema:**
- Solo se aplicó `max-height` al scrollable container
- **NO se aplicó** altura al contenedor principal
- El contenedor principal no estaba limitado

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Aplicar al contenedor principal PRIMERO
container.style.height = `${maxContainerHeight}px`;
container.style.maxHeight = `${maxContainerHeight}px`;

// ✅ Luego aplicar al scrollable container
scrollableContainer.style.setProperty('max-height', `${availableHeight}px`, 'important');
```

---

### **❌ ERROR 4: No Usar !important**

**Problema:**
- Se aplicó `max-height` con JavaScript, pero el CSS del DataTable tenía mayor especificidad
- El CSS del DataTable (`max-height: 400px`) sobrescribía el valor aplicado

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Usar setProperty con !important
scrollableContainer.style.setProperty('max-height', `${availableHeight}px`, 'important');
```

---

### **❌ ERROR 5: No Verificar Alineación**

**Problema:**
- Se aplicó la altura, pero **NO se verificó** si el contenedor quedó alineado con el sidebar
- No se calculó la diferencia entre el `bottom` del sidebar y el `bottom` del contenedor

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Verificar y ajustar si es necesario
requestAnimationFrame(() => {
  setTimeout(() => {
    const newContainerRect = container.getBoundingClientRect();
    const diferencia = sidebarBottom - newContainerRect.bottom;
    if (Math.abs(diferencia) >= 2) {
      const ajusteHeight = maxContainerHeight + diferencia;
      container.style.height = `${ajusteHeight}px`;
      container.style.maxHeight = `${ajusteHeight}px`;
    }
  }, 100);
});
```

---

## 📝 REGLA DE ORO

**⚠️ SIEMPRE que implementes un DataTable:**

1. **✅ DEBES redimensionar la tabla** para aprovechar TODO el espacio vertical y horizontal
2. **✅ DEBES usar la posición REAL del sidebar** (`getBoundingClientRect().bottom`)
3. **✅ DEBES aplicar altura al contenedor principal** (height Y max-height)
4. **✅ DEBES usar `!important`** para sobrescribir el CSS del DataTable
5. **✅ DEBES verificar la alineación** después de aplicar y ajustar si es necesario
6. **✅ DEBES configurar el body sin scroll** (`overflow-y: hidden`)
7. **✅ DEBES configurar el SubNav como sticky** (`position: sticky`)

**NO asumas que el DataTable se ajustará automáticamente. SIEMPRE debes redimensionarlo manualmente.**

---

## 🔗 Referencias

- **Análisis de errores:** `docs/guias/analisis/ANALISIS-ERROR-REDIMENSIONAR-DATATABLE-ESPACIO-VERTICAL-HORIZONTAL.md` - ⚠️ **OBLIGATORIO**
- **Guía de layout:** `docs/guias/implementacion/GUIA-LAYOUT-TEMPLATE-DATATABLE.md` - ⚠️ **OBLIGATORIO**
- **Guía de altura dinámica:** `docs/guias/implementacion/GUIA-ALTURA-DINAMICA-DATATABLE.md`
- **CSS del DataTable:** `vendor/ubits/packages/components/data-table/src/styles/data-table.css` (línea 1296)

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

