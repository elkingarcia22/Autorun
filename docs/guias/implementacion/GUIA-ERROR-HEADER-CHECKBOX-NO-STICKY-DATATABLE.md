# 🚨 ERROR: Header del Checkbox No Se Queda Fijo (Sticky) - DataTable

## 📋 Descripción del Error

**Problema:** El header del checkbox (`checkbox-2`) no se queda fijo al hacer scroll vertical en el DataTable. Las filas pasan por encima del header del checkbox en lugar de pasar por debajo, como debería ser.

**Síntoma Visual:**
- Al hacer scroll vertical, las celdas de checkbox (filas) aparecen por encima del header del checkbox
- El header del checkbox se "oculta" detrás de las filas al hacer scroll
- Solo el header del checkbox tiene este problema; los otros headers de columnas funcionan correctamente

**Causa Raíz:**
1. **Stacking Context Incorrecto:** El `thead` no tiene un z-index base configurado
2. **Z-index Insuficiente:** El header del checkbox tiene un z-index menor o igual que las celdas de checkbox
3. **Estilos Inline del DataTable:** El componente DataTable aplica estilos inline con `z-index: 12` a las celdas de checkbox cuando están pinned, lo que puede sobrescribir nuestros estilos CSS

---

## ✅ Solución Completa

### **PASO 1: CSS para Stacking Context Correcto**

**⚠️ OBLIGATORIO:** Aplicar estos estilos CSS ANTES de crear el DataTable:

```css
/* ⚠️ CRÍTICO: Asegurar que el thead tenga un stacking context correcto */
/* El thead debe tener un z-index base para que los headers puedan estar por encima de las celdas */
#usuarios-table-container .ubits-data-table__thead {
    position: sticky !important;
    top: 0 !important;
    z-index: 10 !important; /* Base para el thead */
    background-color: var(--ubits-bg-1) !important;
}

/* ⚠️ CRÍTICO: Header del checkbox (checkbox-2) también debe ser sticky verticalmente */
/* El header del checkbox debe quedar por encima de las filas al hacer scroll */
/* IMPORTANTE: z-index debe ser mayor que las celdas de checkbox (12 o 15) Y mayor que el thead (10) */
#usuarios-table-container .ubits-data-table__thead .ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"],
#usuarios-table-container .ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"],
#usuarios-table-container .ubits-data-table__thead th.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"],
#usuarios-table-container table .ubits-data-table__thead .ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"] {
    position: sticky !important;
    top: 0 !important; /* Sticky verticalmente igual que otros headers */
    z-index: 50 !important; /* ⚠️ CRÍTICO: Mayor que el thead (10) y las celdas (12-15) para quedar por encima */
    background-color: var(--ubits-bg-1) !important;
}

/* Asegurar que el checkbox header también tenga fondo cuando está pinned */
#usuarios-table-container .ubits-data-table__thead .ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"][data-pinned="true"],
#usuarios-table-container .ubits-data-table__thead .ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"].ubits-data-table__column-header--pinned,
#usuarios-table-container .ubits-data-table__thead th.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"][data-pinned="true"],
#usuarios-table-container table .ubits-data-table__thead th.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"][data-pinned="true"] {
    position: sticky !important;
    top: 0 !important;
    z-index: 50 !important; /* ⚠️ CRÍTICO: Mayor que el thead (10) y las celdas (12-15) */
    background-color: var(--ubits-bg-1) !important;
}

/* ⚠️ CRÍTICO: Asegurar que las celdas de checkbox NO tengan z-index mayor que el header */
/* Las celdas de checkbox deben tener z-index menor que el header para que pasen por debajo */
#usuarios-table-container .ubits-data-table__cell--checkbox[data-column-id="checkbox-2"],
#usuarios-table-container .ubits-data-table__tbody .ubits-data-table__cell--checkbox[data-column-id="checkbox-2"] {
    z-index: 12 !important; /* Mantener z-index de celdas menor que el header (50) */
}

/* ⚠️ CRÍTICO: Asegurar que las celdas de checkbox pinned también tengan z-index menor */
#usuarios-table-container .ubits-data-table__cell--checkbox[data-column-id="checkbox-2"][data-pinned="true"],
#usuarios-table-container .ubits-data-table__cell--checkbox[data-column-id="checkbox-2"].ubits-data-table__cell--pinned {
    z-index: 12 !important; /* Mantener menor que el header (50) */
}

/* ⚠️ CRÍTICO: Asegurar que el tbody NO cree un stacking context que interfiera */
#usuarios-table-container .ubits-data-table__tbody {
    position: relative !important;
    z-index: 1 !important; /* Menor que el thead (10) y el header del checkbox (50) */
}
```

### **PASO 2: JavaScript para Aplicar Estilos Dinámicamente**

**⚠️ OBLIGATORIO:** Aplicar estilos desde JavaScript después de crear el DataTable para sobrescribir estilos inline:

```javascript
// ⚠️ CRÍTICO: Función para aplicar estilos sticky al header del checkbox
function applyCheckboxHeaderSticky() {
    const checkboxHeader = container.querySelector('.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"]');
    if (checkboxHeader) {
        const computedStyle = window.getComputedStyle(checkboxHeader);
        
        // Verificar z-index de las celdas de checkbox para comparar
        const checkboxCells = container.querySelectorAll('.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"]');
        let maxCellZIndex = 0;
        let cellWithMaxZIndex = null;
        if (checkboxCells.length > 0) {
            checkboxCells.forEach((cell) => {
                const cellStyle = window.getComputedStyle(cell);
                const cellZIndex = parseInt(cellStyle.zIndex || '0');
                if (cellZIndex > maxCellZIndex) {
                    maxCellZIndex = cellZIndex;
                    cellWithMaxZIndex = cell;
                }
            });
        }
        
        // ⚠️ CRÍTICO: Calcular z-index dinámicamente basado en el máximo de las celdas
        // Asegurar que el header tenga al menos z-index: 50, o maxCellZIndex + 40 si es mayor
        // Usar 50 como mínimo para estar por encima del thead (10) y las celdas (12-15)
        const targetZIndex = Math.max(50, maxCellZIndex + 40);
        
        // ⚠️ CRÍTICO: Aplicar estilos directamente con z-index mayor que las celdas y el thead
        checkboxHeader.style.setProperty('position', 'sticky', 'important');
        checkboxHeader.style.setProperty('top', '0', 'important');
        checkboxHeader.style.setProperty('z-index', String(targetZIndex), 'important'); // Mayor que thead (10) y celdas (12-15)
        checkboxHeader.style.setProperty('background-color', 'var(--ubits-bg-1)', 'important');
        
        // ⚠️ CRÍTICO: También asegurar que el thead tenga el z-index correcto
        const thead = checkboxHeader.closest('.ubits-data-table__thead');
        if (thead) {
            const theadStyle = window.getComputedStyle(thead);
            const theadZIndex = parseInt(theadStyle.zIndex || '0');
            if (theadZIndex < 10) {
                thead.style.setProperty('z-index', '10', 'important');
                thead.style.setProperty('position', 'sticky', 'important');
                thead.style.setProperty('top', '0', 'important');
                thead.style.setProperty('background-color', 'var(--ubits-bg-1)', 'important');
            }
        }
        
        // ⚠️ CRÍTICO: También asegurar que las celdas NO tengan z-index mayor
        // Forzar z-index de celdas a un valor menor
        checkboxCells.forEach((cell) => {
            const cellStyle = window.getComputedStyle(cell);
            const cellZIndex = parseInt(cellStyle.zIndex || '0');
            // Si la celda tiene z-index mayor o igual al header, reducirlo
            if (cellZIndex >= targetZIndex) {
                cell.style.setProperty('z-index', String(targetZIndex - 10), 'important');
            }
        });
        
        // Logs para verificación (opcional, solo para debugging)
        console.log('✅ [DataTable] Header del checkbox configurado:', {
            computedZIndex: computedStyle.zIndex,
            targetZIndex: targetZIndex,
            maxCellZIndex: maxCellZIndex,
            esMayorQueCeldas: parseInt(computedStyle.zIndex || '0') > maxCellZIndex
        });
    }
}

// Aplicar múltiples veces para asegurar que se aplique después de que el DOM esté completamente renderizado
[800, 1200, 2000].forEach((delay) => {
    setTimeout(() => {
        applyCheckboxHeaderSticky();
    }, delay);
});

// ⚠️ CRÍTICO: MutationObserver para re-aplicar estilos cuando el DataTable se actualiza
const checkboxHeaderObserver = new MutationObserver((mutations) => {
    let shouldReapply = false;
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const target = mutation.target;
            if (target.classList.contains('ubits-data-table__column-header--checkbox') && 
                target.getAttribute('data-column-id') === 'checkbox-2') {
                shouldReapply = true;
            }
        }
        if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            if (addedNodes.some(node => 
                node.nodeType === 1 && 
                node.classList && 
                node.classList.contains('ubits-data-table__column-header--checkbox') &&
                node.getAttribute('data-column-id') === 'checkbox-2'
            )) {
                shouldReapply = true;
            }
        }
    });
    
    if (shouldReapply) {
        setTimeout(() => {
            applyCheckboxHeaderSticky();
        }, 100);
    }
});

// Observar cambios en el thead y en el header del checkbox
const thead = container.querySelector('.ubits-data-table__thead');
if (thead) {
    checkboxHeaderObserver.observe(thead, { 
        childList: true, 
        attributes: true, 
        attributeFilter: ['style', 'class'],
        subtree: true 
    });
}
```

### **PASO 3: Opción Obligatoria en createDataTable**

**⚠️ OBLIGATORIO:** Incluir `showVerticalScrollbar: true` en las opciones del DataTable:

```javascript
const tableInstance = window.createDataTable({
    containerId: 'usuarios-table-container',
    columns: columns,
    rows: usuariosData,
    showCheckbox: true,
    checkboxSticky: true, // ⚠️ OBLIGATORIO: Para que el checkbox sea sticky horizontalmente
    showVerticalScrollbar: true, // ⚠️ OBLIGATORIO: Para que el sticky vertical funcione
    // ... otras opciones
});
```

---

## 📊 Jerarquía de Z-Index (Stacking Context)

**⚠️ CRÍTICO:** La siguiente jerarquía DEBE respetarse:

```
z-index: 50  → Header del checkbox (checkbox-2) [MÁS ALTO]
z-index: 12  → Celdas de checkbox (checkbox-2) [pinned]
z-index: 11  → Headers de columnas pinned (otras columnas)
z-index: 10  → thead (base)
z-index: 1   → tbody (base)
```

**Regla de Oro:**
- El header del checkbox DEBE tener el z-index más alto (50 o mayor)
- Las celdas de checkbox DEBEN tener z-index menor que el header (12)
- El thead DEBE tener z-index base (10) para crear el stacking context
- El tbody DEBE tener z-index menor que el thead (1)

---

## ✅ Checklist de Implementación

**ANTES de crear el DataTable:**

- [ ] ✅ CSS aplicado para el `thead` con `z-index: 10`
- [ ] ✅ CSS aplicado para el header del checkbox con `z-index: 50`
- [ ] ✅ CSS aplicado para las celdas de checkbox con `z-index: 12`
- [ ] ✅ CSS aplicado para el `tbody` con `z-index: 1`
- [ ] ✅ Opción `showVerticalScrollbar: true` incluida en `createDataTable`

**DESPUÉS de crear el DataTable:**

- [ ] ✅ Función `applyCheckboxHeaderSticky()` implementada
- [ ] ✅ Estilos aplicados múltiples veces (800ms, 1200ms, 2000ms)
- [ ] ✅ MutationObserver configurado para re-aplicar estilos
- [ ] ✅ Verificación de z-index del `thead` desde JavaScript
- [ ] ✅ Verificación de z-index de las celdas desde JavaScript
- [ ] ✅ Logs de verificación (opcional, para debugging)

---

## 🔍 Verificación y Debugging

### **Logs Esperados en Consola:**

```
✅ [DataTable] Header del checkbox configurado: {
    computedZIndex: "50",
    targetZIndex: 50,
    maxCellZIndex: 12,
    esMayorQueCeldas: true
}
```

### **Verificación Visual:**

1. **Hacer scroll vertical en el DataTable**
2. **Verificar que el header del checkbox se queda fijo**
3. **Verificar que las filas pasan por debajo del header del checkbox**
4. **Verificar que NO hay "salto" visual al hacer scroll**

### **Si el Problema Persiste:**

1. **Verificar en DevTools:**
   - Inspeccionar el header del checkbox
   - Verificar `computed style` → `z-index` debe ser `50` o mayor
   - Verificar `computed style` → `position` debe ser `sticky`
   - Verificar `computed style` → `top` debe ser `0`

2. **Verificar las celdas:**
   - Inspeccionar una celda de checkbox
   - Verificar `computed style` → `z-index` debe ser `12` o menor
   - Verificar que NO tenga `z-index` mayor que el header

3. **Verificar el thead:**
   - Inspeccionar el `thead`
   - Verificar `computed style` → `z-index` debe ser `10`
   - Verificar `computed style` → `position` debe ser `sticky`

---

## 📝 Notas Importantes

1. **Estilos Inline del DataTable:**
   - El componente DataTable aplica estilos inline con `z-index: 12` a las celdas de checkbox cuando están pinned
   - Por eso es CRÍTICO aplicar estilos desde JavaScript con `!important` para sobrescribirlos

2. **Stacking Context:**
   - El problema NO es solo el z-index, sino el stacking context
   - El `thead` DEBE tener un z-index base para crear el contexto correcto
   - El `tbody` DEBE tener un z-index menor para no interferir

3. **Timing:**
   - Los estilos DEBEN aplicarse después de que el DataTable se renderice completamente
   - Usar múltiples `setTimeout` para asegurar que se apliquen
   - Usar `MutationObserver` para re-aplicar cuando el DataTable se actualice

4. **MutationObserver:**
   - El DataTable puede actualizar el DOM dinámicamente
   - El `MutationObserver` detecta estos cambios y re-aplica los estilos
   - Es CRÍTICO para mantener los estilos correctos durante toda la vida del componente

---

## 🔗 Referencias Relacionadas

- **Guía Principal:** `docs/guias/analisis/ANALISIS-ERROR-DATATABLE-THEAD-NO-STICKY.md` - Error general del thead sticky
- **Guía de Implementación:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md` - Implementación completa del DataTable
- **Guía de Action Bar:** `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md` - Implementación de Action Bar

---

## ⚠️ ERRORES COMUNES A EVITAR

1. **❌ NO usar z-index menor que 50 para el header del checkbox**
   - Las celdas tienen `z-index: 12`, el header debe ser mayor

2. **❌ NO olvidar aplicar estilos al `thead`**
   - El `thead` necesita `z-index: 10` para crear el stacking context

3. **❌ NO olvidar `showVerticalScrollbar: true`**
   - Sin esta opción, el sticky vertical no funciona

4. **❌ NO aplicar estilos solo desde CSS**
   - Los estilos inline del DataTable sobrescriben el CSS
   - DEBES aplicar también desde JavaScript con `!important`

5. **❌ NO olvidar el MutationObserver**
   - El DataTable actualiza el DOM dinámicamente
   - Sin el observer, los estilos se pierden después de actualizaciones

---

**✅ Esta guía debe consultarse SIEMPRE que se implemente un DataTable con checkboxes y sticky headers.**

