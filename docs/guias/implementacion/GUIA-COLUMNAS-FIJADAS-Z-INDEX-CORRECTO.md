# 🚨 Guía: Corrección de Z-Index para Columnas Fijadas en DataTable

> **⚠️ CRÍTICO:** Esta guía documenta cómo corregir el problema donde los headers no fijados pasan por encima de las columnas fijadas.

---

## ❌ PROBLEMA IDENTIFICADO

**Síntoma:**
- Cuando se fija una columna, los otros headers pasan por encima (encima) de la columna fijada
- La columna fijada queda oculta o parcialmente oculta
- Los headers no fijados se superponen sobre los headers fijados

**Causa Raíz:**
- El DataTable aplica estilos inline con `z-index: 10` a los headers fijados
- El `thead` también tiene `z-index: 10`
- Los estilos inline tienen mayor especificidad que el CSS
- No hay diferenciación entre headers fijados y no fijados en términos de z-index

---

## ✅ SOLUCIÓN COMPLETA

### **PASO 1: Agregar Estilos CSS Base**

```css
/* ✅ CORRECTO: thead con z-index: 10 */
#encuestas-table-container .ubits-data-table thead {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: var(--ubits-bg-1);
}

/* ⚠️ CRÍTICO: Headers NO fijados deben tener z-index menor */
#encuestas-table-container .ubits-data-table thead th:not(.ubits-data-table__column-header--pinned) {
    z-index: 1 !important; /* Menor que thead (10) y que headers fijados */
    position: relative; /* Necesario para que z-index funcione */
}

/* ⚠️ CRÍTICO: Headers fijados deben tener z-index mayor que el thead */
#encuestas-table-container .ubits-data-table__column-header--pinned {
    z-index: 20 !important; /* Mayor que thead (10) y que headers normales (1) */
    position: sticky !important;
    background-color: var(--ubits-bg-1) !important;
}

/* ⚠️ CRÍTICO: Celdas NO fijadas deben tener z-index menor */
#encuestas-table-container .ubits-data-table tbody td:not(.ubits-data-table__cell--pinned) {
    z-index: 0 !important; /* Menor que celdas fijadas */
    position: relative; /* Necesario para que z-index funcione */
}

/* ⚠️ CRÍTICO: Celdas fijadas deben tener z-index mayor que las celdas normales */
#encuestas-table-container .ubits-data-table__cell--pinned {
    z-index: 19 !important; /* Mayor que celdas normales (0), pero menor que headers fijados (20) */
    position: sticky !important;
    background-color: var(--ubits-bg-1) !important;
}
```

### **PASO 2: Crear Función JavaScript para Sobrescribir Estilos Inline**

**⚠️ CRÍTICO: Los estilos inline del DataTable tienen mayor especificidad que el CSS, por lo que DEBEMOS usar JavaScript para sobrescribirlos.**

```javascript
function fixPinnedColumnsZIndex(container) {
  // ⚠️ CRÍTICO: Corregir z-index de headers fijados (sobrescribir estilos inline)
  const pinnedHeaders = container.querySelectorAll('.ubits-data-table__column-header--pinned');
  pinnedHeaders.forEach((header) => {
    const headerEl = header;
    headerEl.style.setProperty('z-index', '20', 'important');
    headerEl.style.setProperty('position', 'sticky', 'important');
    headerEl.style.setProperty('background-color', 'var(--ubits-bg-1)', 'important');
  });
  
  // ⚠️ CRÍTICO: Corregir z-index de headers NO fijados (asegurar que queden por debajo)
  const normalHeaders = container.querySelectorAll('thead th:not(.ubits-data-table__column-header--pinned)');
  normalHeaders.forEach((header) => {
    const headerEl = header;
    headerEl.style.setProperty('z-index', '1', 'important');
  });
  
  // ⚠️ CRÍTICO: Corregir z-index de celdas fijadas
  const pinnedCells = container.querySelectorAll('.ubits-data-table__cell--pinned');
  pinnedCells.forEach((cell) => {
    const cellEl = cell;
    cellEl.style.setProperty('z-index', '19', 'important');
    cellEl.style.setProperty('position', 'sticky', 'important');
    cellEl.style.setProperty('background-color', 'var(--ubits-bg-1)', 'important');
  });
  
  // ⚠️ CRÍTICO: Corregir z-index de celdas NO fijadas (asegurar que queden por debajo)
  const normalCells = container.querySelectorAll('tbody td:not(.ubits-data-table__cell--pinned)');
  normalCells.forEach((cell) => {
    const cellEl = cell;
    cellEl.style.setProperty('z-index', '0', 'important');
  });
  
  console.log('📊 [DataTable] ✅ Z-index de columnas fijadas corregido:', {
    pinnedHeaders: pinnedHeaders.length,
    normalHeaders: normalHeaders.length,
    pinnedCells: pinnedCells.length,
    normalCells: normalCells.length
  });
}
```

### **PASO 3: Llamar la Función Después de Crear el DataTable**

```javascript
// Después de crear el DataTable
setTimeout(() => {
  verifyAndFixSearchButtonStructure(container);
  renderActionBar(container);
  fixPinnedColumnsZIndex(container); // ⚠️ CRÍTICO: Corregir z-index
}, 100);
```

### **PASO 4: Interceptar Método update del DataTable**

```javascript
// ⚠️ CRÍTICO: Interceptar método update para corregir z-index después de cada actualización
const originalUpdate = dataTableInstance.update;
dataTableInstance.update = function(newOptions) {
  const result = originalUpdate.call(this, newOptions);
  // Corregir z-index después de actualizar
  setTimeout(() => {
    fixPinnedColumnsZIndex(container);
  }, 50);
  return result;
};
```

### **PASO 5: Agregar Callback onColumnPin**

```javascript
// En las opciones del DataTable
onColumnPin: (columnId, pinned) => {
  console.log('📊 [DataTable] Columna fijada/desfijada:', { columnId, pinned });
  // Corregir z-index después de fijar/desfijar columna
  setTimeout(() => {
    fixPinnedColumnsZIndex(container);
  }, 100);
}
```

### **PASO 6: Usar MutationObserver (Opcional pero Recomendado)**

```javascript
// ⚠️ CRÍTICO: Usar MutationObserver para detectar cambios en columnas fijadas
const tableElement = container.querySelector('.ubits-data-table');
if (tableElement) {
  const observer = new MutationObserver((mutations) => {
    let shouldFix = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
        const target = mutation.target;
        if (target.classList && (
          target.classList.contains('ubits-data-table__column-header--pinned') ||
          target.classList.contains('ubits-data-table__cell--pinned')
        )) {
          shouldFix = true;
        }
      }
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            if (node.classList && (
              node.classList.contains('ubits-data-table__column-header--pinned') ||
              node.classList.contains('ubits-data-table__cell--pinned') ||
              node.querySelector('.ubits-data-table__column-header--pinned') ||
              node.querySelector('.ubits-data-table__cell--pinned')
            )) {
              shouldFix = true;
            }
          }
        });
      }
    });
    if (shouldFix) {
      setTimeout(() => {
        fixPinnedColumnsZIndex(container);
      }, 50);
    }
  });
  
  observer.observe(tableElement, {
    attributes: true,
    attributeFilter: ['class', 'style'],
    childList: true,
    subtree: true
  });
}
```

---

## 📊 Jerarquía de Z-Index Correcta

```
Headers fijados:     z-index: 20  (mayor que todo, para quedar por encima)
Celdas fijadas:      z-index: 19  (mayor que celdas normales)
Thead:               z-index: 10  (base)
Headers normales:    z-index: 1   (menor que thead)
Celdas normales:     z-index: 0   (menor que todo)
```

---

## 🚨 REGLAS CRÍTICAS

1. **✅ SIEMPRE usar JavaScript para sobrescribir estilos inline:** Los estilos inline del DataTable tienen mayor especificidad
2. **✅ SIEMPRE usar `setProperty` con `'important'`:** Para sobrescribir estilos inline
3. **✅ SIEMPRE llamar `fixPinnedColumnsZIndex` después de crear el DataTable:** En `setTimeout` de 100ms
4. **✅ SIEMPRE interceptar método `update`:** Para corregir z-index después de cada actualización
5. **✅ SIEMPRE agregar callback `onColumnPin`:** Para corregir z-index cuando se fija/desfija una columna
6. **✅ SIEMPRE mantener la jerarquía de z-index:** Headers fijados (20) > Celdas fijadas (19) > Thead (10) > Headers normales (1) > Celdas normales (0)
7. **❌ NUNCA usar solo CSS sin JavaScript:** Los estilos inline sobrescriben el CSS
8. **❌ NUNCA usar el mismo z-index para thead y headers fijados:** Causa conflictos de apilamiento

---

## 📋 CHECKLIST COMPLETO

- [ ] ✅ Estilos CSS base agregados (thead, headers fijados, headers normales, celdas fijadas, celdas normales)
- [ ] ✅ Función `fixPinnedColumnsZIndex` creada
- [ ] ✅ Función usa `setProperty` con `'important'` para sobrescribir estilos inline
- [ ] ✅ Función se llama después de crear el DataTable (en `setTimeout` de 100ms)
- [ ] ✅ Método `update` interceptado para corregir z-index después de cada actualización
- [ ] ✅ Callback `onColumnPin` agregado para corregir z-index cuando se fija/desfija una columna
- [ ] ✅ MutationObserver configurado (opcional pero recomendado)
- [ ] ✅ Jerarquía de z-index correcta: Headers fijados (20) > Celdas fijadas (19) > Thead (10) > Headers normales (1) > Celdas normales (0)

---

## 🔗 Referencias

- **Guía de errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` (ERROR CRÍTICO #56)
- **Estilos del DataTable:** `vendor/ubits/packages/components/data-table/src/styles/data-table.css` (líneas 1470-1553)
- **Código de renderizado:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (líneas 674-875)

---

**Última actualización:** Enero 2025  
**Versión:** 1.0.0

