# 📐 Guía: Espacio Dinámico del DataTable y Paginador Correcto

**⚠️ OBLIGATORIO:** Esta guía debe leerse ANTES de implementar DataTable para evitar problemas de altura y espacio.

## ⚠️ PROBLEMA IDENTIFICADO

**Problemas comunes al implementar DataTable:**
1. ❌ La tabla no ocupa todo el ancho y alto disponible desde la primera implementación
2. ❌ El paginador se corta o queda pegado al borde del contenedor
3. ❌ El contenedor scrollable empuja el paginador fuera del viewport
4. ❌ No hay espacio visible (16px o más) entre el paginador y el final del contenedor
5. ❌ El padding no se aplica correctamente (debe ser externo 24px abajo, interno 16px arriba/izquierda/derecha, 0 abajo)
6. ❌ **La altura de la tabla se daña cuando cambia de página, ordena, busca o filtra** ⭐ **NUEVO**
7. ❌ **La tabla no viene con 2900 items al inicio** ⭐ **NUEVO**

---

## ✅ SOLUCIÓN COMPLETA PASO A PASO

### **PASO 1: Configurar CSS del Contenedor Principal**

**⚠️ OBLIGATORIO:** Configurar estos estilos para el contenedor de la tabla:

```css
/* ✅ CORRECTO: Contenedor principal */
#usuarios-table-container {
    width: 100% !important;
    max-width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    flex: 1 !important;
    min-height: 0 !important;
    /* ⚠️ CRÍTICO: Padding interno - 16px arriba, izquierda, derecha, 0 abajo */
    padding: var(--ubits-spacing-lg, 16px) var(--ubits-spacing-lg, 16px) 0 var(--ubits-spacing-lg, 16px) !important;
    /* ⚠️ CRÍTICO: Padding-bottom separado - 32px para espacio visible del paginador */
    padding-bottom: 32px !important;
    box-sizing: border-box !important;
    background-color: var(--ubits-bg-1) !important;
    border-radius: var(--ubits-border-radius-sm, 8px) !important;
    overflow: visible !important; /* ✅ CRÍTICO: visible para que el paginador no se corte */
    visibility: visible !important;
    opacity: 1 !important;
}
```

**⚠️ CRÍTICO:**
- **Padding interno:** 16px arriba, izquierda, derecha; 0 abajo
- **Padding-bottom:** 32px separado para espacio visible del paginador
- **Overflow:** `visible` para que el paginador no se corte

---

### **PASO 2: Configurar CSS del Contenedor Scrollable**

**⚠️ OBLIGATORIO:** Configurar estos estilos para el contenedor scrollable:

```css
/* ✅ CORRECTO: Contenedor scrollable */
#usuarios-table-container .ubits-data-table__scrollable-container,
#usuarios-table-container .ubits-data-table__scrollable-container--vertical {
    overflow-x: auto !important; /* ✅ Permitir scroll horizontal */
    overflow-y: auto !important; /* ✅ Permitir scroll vertical */
    width: 100% !important;
    max-width: 100% !important;
    flex-shrink: 1 !important; /* ✅ CRÍTICO: Permitir que se reduzca para dejar espacio al paginador */
    flex-grow: 0 !important; /* ✅ CRÍTICO: No crecer más allá del max-height */
    min-height: 0 !important; /* ✅ CRÍTICO: Permitir que se reduzca a 0 si es necesario */
}
```

**⚠️ CRÍTICO:**
- **flex-shrink: 1** - Permite que el scrollable se reduzca para dejar espacio al paginador
- **flex-grow: 0** - No crece más allá del max-height calculado
- **min-height: 0** - Permite reducción si es necesario

---

### **PASO 3: Configurar CSS del Contenedor del DataTable**

**⚠️ OBLIGATORIO:** Configurar estos estilos para el contenedor interno del DataTable:

```css
/* ✅ CORRECTO: Contenedor interno del DataTable */
#usuarios-table-container .ubits-data-table__container {
    overflow: visible !important; /* ✅ No ocultar el paginador con overflow */
}
```

---

### **PASO 4: Configurar CSS del Paginador**

**⚠️ OBLIGATORIO:** Configurar estos estilos para el paginador:

```css
/* ✅ CORRECTO: Paginador */
#usuarios-table-container .ubits-data-table__pagination-wrapper {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    flex-shrink: 0 !important; /* ✅ CRÍTICO: No permitir que se reduzca */
    width: 100% !important;
    padding: 0 !important; /* ✅ Sin padding interno */
    margin-top: var(--ubits-spacing-lg, 16px) !important; /* ✅ 16px de espacio arriba del paginador */
    margin-bottom: 0 !important; /* ✅ Sin margin-bottom, el padding del contenedor proporciona el espacio */
}

#usuarios-table-container .ubits-data-table__pagination {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 100% !important;
}
```

**⚠️ CRÍTICO:**
- **flex-shrink: 0** - El paginador NO debe reducirse
- **margin-top: 16px** - Espacio arriba del paginador
- **margin-bottom: 0** - El padding-bottom del contenedor proporciona el espacio abajo

---

### **PASO 5: Configurar Padding Externo en Content-Area**

**⚠️ OBLIGATORIO:** Configurar padding externo de 24px abajo en el `.content-area`:

```css
/* ✅ CORRECTO: Padding externo en content-area */
.content-area {
    /* ⚠️ CRÍTICO: Padding externo de 24px solo abajo (fuera del contenedor de la tabla) */
    padding-bottom: var(--ubits-spacing-2xl, 24px) !important;
}
```

**⚠️ CRÍTICO:**
- **Padding externo:** 24px SOLO abajo (en el `.content-area`, no en el contenedor de la tabla)
- Este padding está FUERA del contenedor de la tabla

---

### **PASO 6: Implementar Función de Cálculo Dinámico de Altura**

**⚠️ OBLIGATORIO:** Implementar esta función completa:

```javascript
function adjustDataTableHeight(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`⚠️ [Usuarios DataTable] Contenedor ${containerId} no encontrado`);
        return;
    }
    
    const tableElement = container.querySelector('.ubits-data-table');
    if (!tableElement) {
        console.warn('⚠️ [Usuarios DataTable] Elemento table no encontrado, reintentando...');
        setTimeout(() => adjustDataTableHeight(containerId), 200);
        return;
    }
    
    // ⚠️ CRÍTICO: El elemento `.ubits-data-table` ES el `<table>`, no un contenedor
    // El contenedor scrollable está en el PADRE del table, no dentro de él
    const tableParent = tableElement.parentElement;
    
    // Buscar el contenedor scrollable en el padre
    const verticalScrollable = tableParent?.classList.contains('ubits-data-table__scrollable-container--vertical') 
        ? tableParent 
        : tableParent?.querySelector('.ubits-data-table__scrollable-container--vertical') ||
          tableParent?.closest('.ubits-data-table__scrollable-container--vertical');
    
    // Buscar el contenedor general
    const scrollableContainer = tableParent?.classList.contains('ubits-data-table__scrollable-container') 
        ? tableParent 
        : tableParent?.querySelector('.ubits-data-table__scrollable-container') ||
          tableParent?.closest('.ubits-data-table__scrollable-container');
    
    // Usar el contenedor encontrado
    const finalScrollableContainer = verticalScrollable || scrollableContainer || tableParent;
    
    if (!finalScrollableContainer) {
        console.warn('⚠️ [Usuarios DataTable] Contenedor scrollable no encontrado, reintentando...');
        setTimeout(() => adjustDataTableHeight(containerId), 300);
        return;
    }
    
    function calculateHeight() {
        const viewportHeight = window.innerHeight;
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        
        // ⚠️ CRÍTICO: Padding externo de 24px abajo (fuera del contenedor, en el content-area)
        const paddingBottom = 24; // --ubits-spacing-2xl (padding externo)
        
        // ⚠️ CRÍTICO: Calcular altura del header del DataTable
        const headerElement = container.querySelector('.ubits-data-table__header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 0;
        
        // ⚠️ CRÍTICO: Calcular altura del paginador incluyendo márgenes
        const paginationWrapper = container.querySelector('.ubits-data-table__pagination-wrapper');
        let paginationHeight = 0;
        let paginationMarginTop = 16; // margin-top del paginador
        if (paginationWrapper) {
            const paginationRect = paginationWrapper.getBoundingClientRect();
            const paginationStyle = window.getComputedStyle(paginationWrapper);
            paginationHeight = paginationRect.height;
            // Obtener márgenes reales si están definidos
            paginationMarginTop = parseInt(paginationStyle.marginTop) || 16;
        } else {
            // Si el paginador aún no existe, usar altura estimada (típicamente ~60px)
            paginationHeight = 60;
            console.log('⚠️ [Usuarios DataTable] Paginador no encontrado, usando altura estimada:', paginationHeight);
        }
        
        // ⚠️ CRÍTICO: Calcular altura del Action Bar si existe
        const actionBar = container.querySelector('.ubits-data-table__action-bar');
        const actionBarHeight = actionBar ? actionBar.offsetHeight : 0;
        
        // ⚠️ CRÍTICO: Calcular padding-bottom del contenedor (debe ser visible, mínimo 32px)
        const containerPaddingBottom = 32; // Más espacio para que sea visible
        
        // ⚠️ CRÍTICO: Calcular altura total que ocupa el paginador (altura + margin-top + padding-bottom del contenedor)
        const totalPaginationSpace = paginationHeight + paginationMarginTop + containerPaddingBottom;
        
        // ⚠️ CRÍTICO: Calcular altura disponible para el contenedor scrollable
        // viewport - posición del contenedor - padding externo - header - espacio total del paginador - action bar
        const availableHeight = viewportHeight 
            - containerTop 
            - paddingBottom 
            - headerHeight 
            - totalPaginationSpace // ⚠️ CRÍTICO: espacio total del paginador (altura + margin-top + padding-bottom)
            - actionBarHeight;
        
        const minHeight = 200; // Altura mínima más pequeña para dejar espacio al paginador
        const maxHeight = Math.max(minHeight, availableHeight);
        
        // ⚠️ CRÍTICO: Aplicar max-height al contenedor scrollable para que NO empuje el paginador
        // El max-height debe ser menor que el espacio disponible para dejar lugar al paginador
        finalScrollableContainer.style.maxHeight = `${maxHeight}px`;
        finalScrollableContainer.style.setProperty('flex-shrink', '1', 'important'); // Permitir que se reduzca
        finalScrollableContainer.style.setProperty('flex-grow', '0', 'important'); // No crecer más allá del max-height
        // ⚠️ CRÍTICO: Configurar scroll horizontal para que la tabla se corte cuando exceda el ancho
        finalScrollableContainer.style.setProperty('overflow-x', 'auto', 'important');
        finalScrollableContainer.style.setProperty('overflow-y', 'auto', 'important');
        finalScrollableContainer.style.setProperty('width', '100%', 'important');
        
        console.log(`✅ [Usuarios DataTable] Altura configurada dinámicamente: ${maxHeight}px`);
        console.log(`   - Viewport: ${viewportHeight}px`);
        console.log(`   - Container top: ${containerTop}px`);
        console.log(`   - Padding bottom externo: ${paddingBottom}px`);
        console.log(`   - Header height: ${headerHeight}px`);
        console.log(`   - Pagination height: ${paginationHeight}px`);
        console.log(`   - Pagination margin-top: ${paginationMarginTop}px`);
        console.log(`   - Container padding-bottom: ${containerPaddingBottom}px`);
        console.log(`   - Total pagination space: ${totalPaginationSpace}px`);
        console.log(`   - Action bar height: ${actionBarHeight}px`);
        console.log(`   - Available height for scrollable: ${availableHeight}px`);
    }
    
    calculateHeight();
    
    // ⚠️ CRÍTICO: Observar cambios en el DOM para recalcular cuando el paginador se renderice
    const heightObserver = new MutationObserver(() => {
        // Recalcular altura cuando el DOM cambia (paginador se agrega)
        setTimeout(calculateHeight, 100);
    });
    
    // Observar el contenedor del DataTable para detectar cuando se agrega el paginador
    const dataTableContainer = container.querySelector('.ubits-data-table__container');
    if (dataTableContainer) {
        heightObserver.observe(dataTableContainer, {
            childList: true,
            subtree: true
        });
    }
    
    // Recalcular en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(calculateHeight, 200);
    });
}
```

**⚠️ CRÍTICO:**
- **Cálculo dinámico:** Resta todos los elementos (header, paginador, action bar, padding)
- **Espacio total del paginador:** Incluye altura + margin-top + padding-bottom del contenedor
- **MutationObserver:** Recalcula cuando el paginador se agrega al DOM
- **Resize listener:** Recalcula cuando se redimensiona la ventana

---

### **PASO 8: Recalcular Altura Después de Cambios en la Tabla (OBLIGATORIO)**

**⚠️ CRÍTICO:** La altura de la tabla se daña cuando cambia de página, se ordena, se busca o se filtran los datos. **DEBE recalcularse después de cada cambio.**

**📍 Dónde agregar:** En los callbacks del DataTable (`onPageChange`, `onSort`, `onSearch`, `onApplyFilters`, `onItemsPerPageChange`).

```javascript
// ⚠️ CRÍTICO: Recalcular altura después de cambiar de página
onPageChange: (page) => {
    console.log(`📄 [Usuarios DataTable] Cambio de página a: ${page}`);
    // El DataTable maneja la paginación internamente
    
    // ⚠️ CRÍTICO: Recalcular altura después de cambiar de página
    setTimeout(() => {
        adjustDataTableHeight('usuarios-table-container');
    }, 200);
},

// ⚠️ CRÍTICO: Recalcular altura después de ordenar
onSort: (columnId, direction) => {
    console.log(`🔀 [Usuarios DataTable] Ordenando por columna "${columnId}" en orden ${direction}`);
    
    // ... lógica de ordenamiento ...
    
    // Actualizar la tabla con los datos ordenados
    if (tableInstance && tableInstance.update) {
        tableInstance.update({ rows: sortedData });
    }
    
    // ⚠️ CRÍTICO: Recalcular altura después de ordenar
    setTimeout(() => {
        adjustDataTableHeight('usuarios-table-container');
    }, 200);
},

// ⚠️ CRÍTICO: Recalcular altura después de búsqueda
searchButton: {
    onChange: (value) => {
        console.log('🔍 [Usuarios DataTable] Búsqueda cambiada:', value);
        
        // ⚠️ CRÍTICO: Recalcular altura después de cambiar búsqueda
        setTimeout(() => {
            adjustDataTableHeight('usuarios-table-container');
        }, 150);
    },
    onSearch: (searchTerm, filteredRows) => {
        console.log('🔍 [Usuarios DataTable] Búsqueda ejecutada:', searchTerm, filteredRows.length, 'resultados');
        
        // ⚠️ CRÍTICO: Recalcular altura después de búsqueda
        setTimeout(() => {
            adjustDataTableHeight('usuarios-table-container');
        }, 200);
    }
},

// ⚠️ CRÍTICO: Recalcular altura después de aplicar filtros
filterButton: {
    onApplyFilters: (filters) => {
        console.log('🔍 [Usuarios DataTable] Filtros aplicados:', filters);
        
        // ... lógica de filtrado ...
        
        // Actualizar la tabla con los datos filtrados
        if (tableInstance && tableInstance.update) {
            tableInstance.update({ rows: filteredData });
        }
        
        // ⚠️ CRÍTICO: Recalcular altura después de aplicar filtros
        setTimeout(() => {
            adjustDataTableHeight('usuarios-table-container');
        }, 200);
    }
},

// ⚠️ CRÍTICO: Recalcular altura después de cambiar items por página
onItemsPerPageChange: (itemsPerPage) => {
    console.log(`📄 [Usuarios DataTable] Cambio de items por página a: ${itemsPerPage}`);
    
    // ⚠️ CRÍTICO: Recalcular altura después de cambiar items por página
    setTimeout(() => {
        adjustDataTableHeight('usuarios-table-container');
    }, 200);
}
```

**⚠️ CRÍTICO:**
- **Usar `setTimeout`:** Esperar 150-200ms para que el DOM se actualice después del cambio
- **Llamar en TODOS los callbacks:** `onPageChange`, `onSort`, `onSearch` (onChange y onSearch), `onApplyFilters`, `onItemsPerPageChange`
- **También en `update()` interceptado:** Si interceptas el método `update()`, agregar el recálculo ahí también

---

### **PASO 9: Generar 2900 Items al Inicio (OBLIGATORIO)**

**⚠️ CRÍTICO:** La tabla debe venir con 2900 items desde el inicio para simular un dataset real.

**📍 Dónde agregar:** En la función de inicialización del DataTable, antes de crear la instancia.

```javascript
// ⚠️ CRÍTICO: Datos de ejemplo de usuarios (2900 usuarios con variedad)
usuariosData = (() => {
    const nombresBase = [
        'Juan Pérez', 'María García', 'Carlos Rodríguez', 'Ana Martínez', 'Luis Fernández',
        'Laura Sánchez', 'Pedro López', 'Carmen Torres', 'Miguel Díaz', 'Isabel Ruiz',
        // ... más nombres base ...
    ];
    const apellidos = ['García', 'Rodríguez', 'Martínez', 'Fernández', 'Sánchez', 'López', 'Torres', 'Díaz', 'Ruiz', 'Gómez'];
    const nombres = ['Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Laura', 'Pedro', 'Carmen', 'Miguel', 'Isabel'];
    const estados = ['activo', 'inactivo', 'pendiente', 'bloqueado'];
    const roles = ['Administrador', 'Editor', 'Colaborador', 'Visualizador', 'Supervisor'];
    
    // Generar 2900 usuarios
    const items = [];
    for (let i = 1; i <= 2900; i++) {
        // Generar nombre único combinando nombres y apellidos
        const nombre = nombres[i % nombres.length] + ' ' + apellidos[i % apellidos.length] + (i > nombres.length ? ` ${Math.floor(i / nombres.length)}` : '');
        const email = nombre.toLowerCase().replace(/\s+/g, '.') + '@empresa.com';
        
        // Generar fechas aleatorias
        const fechaRegistro = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const fechaAcceso = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        
        items.push({
            id: `usuario-${i}`,
            data: {
                nombre: nombre,
                email: email,
                estado: estados[i % estados.length],
                rol: roles[i % roles.length],
                fechaRegistro: fechaRegistro.toISOString().split('T')[0],
                ultimoAcceso: fechaAcceso.toISOString().split('T')[0]
            }
        });
    }
    
    return items;
})();
```

**⚠️ CRÍTICO:**
- **Cantidad:** 2900 items (NO 20, NO 100, NO 200)
- **Variedad:** Usar arrays de valores posibles y operador módulo (`%`) para distribuir
- **IDs únicos:** Cada item debe tener un ID único (`usuario-1`, `usuario-2`, etc.)

---

### **PASO 7: Aplicar Estilos en JavaScript Después de Crear DataTable**

**⚠️ OBLIGATORIO:** Aplicar estos estilos después de crear el DataTable:

```javascript
// Después de crear el DataTable
setTimeout(() => {
    const container = document.getElementById('usuarios-table-container');
    const dataTableContainer = container.querySelector('.ubits-data-table__container');
    
    if (dataTableContainer) {
        dataTableContainer.style.setProperty('width', '100%', 'important');
        dataTableContainer.style.setProperty('flex', '1', 'important');
        dataTableContainer.style.setProperty('min-height', '0', 'important');
        dataTableContainer.style.setProperty('display', 'flex', 'important');
        dataTableContainer.style.setProperty('flex-direction', 'column', 'important');
        // ⚠️ CRÍTICO: Asegurar que el contenedor no oculte el paginador con overflow
        dataTableContainer.style.setProperty('overflow', 'visible', 'important');
        
        // ⚠️ CRÍTICO: Asegurar que el paginador sea visible
        const paginationWrapper = dataTableContainer.querySelector('.ubits-data-table__pagination-wrapper');
        if (paginationWrapper) {
            paginationWrapper.style.setProperty('display', 'flex', 'important');
            paginationWrapper.style.setProperty('visibility', 'visible', 'important');
            paginationWrapper.style.setProperty('opacity', '1', 'important');
            paginationWrapper.style.setProperty('flex-shrink', '0', 'important');
            paginationWrapper.style.setProperty('margin-top', 'var(--ubits-spacing-lg, 16px)', 'important');
            paginationWrapper.style.setProperty('margin-bottom', '0', 'important');
            paginationWrapper.style.setProperty('padding', '0', 'important');
        }
    }
    
    // Configurar altura dinámica
    adjustDataTableHeight('usuarios-table-container');
}, 400);

// Recalcular después de que el paginador se renderice completamente
setTimeout(() => {
    adjustDataTableHeight('usuarios-table-container');
}, 1200);

// Recalcular una vez más para asegurar que todo esté correcto
setTimeout(() => {
    adjustDataTableHeight('usuarios-table-container');
}, 2000);
```

---

### **PASO 8: Configurar Padding Externo en Content-Area (JavaScript)**

**⚠️ OBLIGATORIO:** Aplicar padding externo al content-area:

```javascript
// Al crear el contenedor
const contentArea = document.querySelector('.content-area');
if (contentArea) {
    contentArea.style.setProperty('padding-bottom', 'var(--ubits-spacing-2xl, 24px)', 'important');
    console.log('✅ [Usuarios DataTable] Padding-bottom externo de 24px aplicado al content-area');
}
```

---

## 📋 RESUMEN DE ESPACIOS Y PADDING

### **Padding Interno del Contenedor:**
- **Arriba:** 16px (`--ubits-spacing-lg`)
- **Izquierda:** 16px (`--ubits-spacing-lg`)
- **Derecha:** 16px (`--ubits-spacing-lg`)
- **Abajo:** 0px (NO hay padding interno abajo)

### **Padding-Bottom del Contenedor (Separado):**
- **Abajo:** 32px (para espacio visible del paginador)

### **Padding Externo (Content-Area):**
- **Abajo:** 24px (`--ubits-spacing-2xl`) - FUERA del contenedor de la tabla

### **Márgenes del Paginador:**
- **Arriba:** 16px (`--ubits-spacing-lg`) - separación de la tabla
- **Abajo:** 0px (el padding-bottom del contenedor proporciona el espacio)

### **Espacio Total del Paginador (para cálculo):**
- **Altura del paginador:** ~60px (o altura real si existe)
- **Margin-top:** 16px
- **Padding-bottom del contenedor:** 32px
- **Total:** ~108px (60 + 16 + 32)

---

## ⚠️ REGLAS CRÍTICAS

1. **Padding Interno vs Externo:**
   - **Interno (16px):** Aplicar al contenedor de la tabla (`#usuarios-table-container`)
   - **Padding-bottom separado (32px):** Aplicar al contenedor de la tabla para espacio visible
   - **Externo (24px):** Aplicar al `.content-area` (fuera del contenedor, solo abajo)

2. **Overflow del Contenedor:**
   - **SIEMPRE** usar `overflow: visible` en el contenedor principal
   - **NO** usar `overflow: hidden` que corte el paginador

3. **Flex del Contenedor Scrollable:**
   - **SIEMPRE** usar `flex-shrink: 1` para que se reduzca y deje espacio al paginador
   - **SIEMPRE** usar `flex-grow: 0` para que no crezca más allá del max-height
   - **SIEMPRE** usar `min-height: 0` para permitir reducción

4. **Flex del Paginador:**
   - **SIEMPRE** usar `flex-shrink: 0` para que NO se reduzca
   - **SIEMPRE** usar `margin-top: 16px` para separación de la tabla
   - **SIEMPRE** usar `margin-bottom: 0` (el padding del contenedor proporciona el espacio)

5. **Cálculo de Altura:**
   - **SIEMPRE** restar el espacio total del paginador (altura + margin-top + padding-bottom)
   - **SIEMPRE** usar MutationObserver para recalcular cuando el paginador se agrega
   - **SIEMPRE** recalcular en múltiples momentos (400ms, 1200ms, 2000ms)
   - **SIEMPRE** recalcular después de cambios: `onPageChange`, `onSort`, `onSearch`, `onApplyFilters`, `onItemsPerPageChange`

6. **Recálculo de Altura Después de Cambios:**
   - **SIEMPRE** llamar `adjustDataTableHeight` después de `onPageChange` (200ms delay)
   - **SIEMPRE** llamar `adjustDataTableHeight` después de `onSort` (200ms delay)
   - **SIEMPRE** llamar `adjustDataTableHeight` después de `onSearch` onChange (150ms delay) y onSearch (200ms delay)
   - **SIEMPRE** llamar `adjustDataTableHeight` después de `onApplyFilters` (200ms delay)
   - **SIEMPRE** llamar `adjustDataTableHeight` después de `onItemsPerPageChange` (200ms delay)
   - **SIEMPRE** llamar `adjustDataTableHeight` en el método `update()` interceptado (150ms delay)

7. **Cantidad de Items:**
   - **SIEMPRE** generar 2900 items al inicio (NO 20, NO 100, NO 200)
   - **SIEMPRE** usar variedad en los datos (arrays de valores posibles con operador módulo)

---

## 📋 CHECKLIST OBLIGATORIO

Al implementar el DataTable con paginador, **SIEMPRE verificar:**

### **CSS:**
- [ ] **Padding interno:** 16px arriba, izquierda, derecha, 0 abajo
- [ ] **Padding-bottom separado:** 32px para espacio visible del paginador
- [ ] **Padding externo:** 24px abajo en `.content-area`
- [ ] **Overflow del contenedor:** `visible` (NO `hidden`)
- [ ] **Flex del scrollable:** `flex-shrink: 1`, `flex-grow: 0`, `min-height: 0`
- [ ] **Flex del paginador:** `flex-shrink: 0`
- [ ] **Margin del paginador:** `margin-top: 16px`, `margin-bottom: 0`

### **JavaScript - Altura Dinámica:**
- [ ] **Función `adjustDataTableHeight`:** Implementada con cálculo dinámico correcto
- [ ] **Cálculo de altura:** Incluye espacio total del paginador (altura + margin-top + padding-bottom)
- [ ] **MutationObserver:** Recalcula cuando el paginador se agrega
- [ ] **Múltiples recálculos iniciales:** 400ms, 1200ms, 2000ms después de crear DataTable
- [ ] **Recálculo en `onPageChange`:** Agregado `adjustDataTableHeight` con `setTimeout(200ms)`
- [ ] **Recálculo en `onSort`:** Agregado `adjustDataTableHeight` con `setTimeout(200ms)`
- [ ] **Recálculo en `onSearch` (onChange):** Agregado `adjustDataTableHeight` con `setTimeout(150ms)`
- [ ] **Recálculo en `onSearch` (onSearch):** Agregado `adjustDataTableHeight` con `setTimeout(200ms)`
- [ ] **Recálculo en `onApplyFilters`:** Agregado `adjustDataTableHeight` con `setTimeout(200ms)`
- [ ] **Recálculo en `onItemsPerPageChange`:** Agregado `adjustDataTableHeight` con `setTimeout(200ms)`
- [ ] **Recálculo en `update()` interceptado:** Si se intercepta `update()`, agregar recálculo ahí también

### **Datos:**
- [ ] **2900 items al inicio:** Generar 2900 items (NO 20, NO 100, NO 200)
- [ ] **Variedad en datos:** Usar arrays de valores posibles y operador módulo para distribuir
- [ ] **IDs únicos:** Cada item debe tener un ID único (`usuario-1`, `usuario-2`, etc.)

### **Verificación Final:**
- [ ] **Altura se mantiene:** Verificar que la altura NO se daña al cambiar de página, ordenar, buscar o filtrar
- [ ] **2900 items cargados:** Verificar en consola que `usuariosData.length === 2900`

---

## 🔗 REFERENCIAS

- **Guía de tamaño:** `docs/guias/implementacion/GUIA-ERROR-TAMANO-DATATABLE-ESPACIO-DISPONIBLE.md`
- **Guía de padding:** `docs/guias/implementacion/GUIA-ERROR-PADDING-INCORRECTO-TABLA.md`
- **Guía de scroll:** `docs/guias/implementacion/GUIA-ERROR-SCROLL-PAGINA.md`
- **Guía de altura dinámica:** `docs/guias/implementacion/GUIA-ALTURA-DINAMICA-DATATABLE.md`

---

## 📝 NOTAS

- Esta guía documenta la solución completa para el problema del paginador que se corta
- El problema se identificó durante la implementación del DataTable de usuarios
- La solución debe aplicarse desde la primera implementación para evitar problemas posteriores
- **Espacio visible:** El padding-bottom de 32px debe ser claramente visible entre el paginador y el final del contenedor
- **Cálculo dinámico:** El contenedor scrollable debe calcular su altura restando el espacio total del paginador
- **Recálculo después de cambios:** ⭐ **NUEVO** - La altura se daña cuando cambia de página, ordena, busca o filtra. DEBE recalcularse en todos los callbacks.
- **2900 items al inicio:** ⭐ **NUEVO** - La tabla debe venir con 2900 items desde el inicio para simular un dataset real.

---

**Última actualización:** 2025-12-09
**Versión:** 2.0.0 (Agregado recálculo de altura después de cambios y 2900 items)

