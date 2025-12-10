# 🔍 Análisis: DataTable Thead No Se Queda Sticky

## ⚠️ REGLA OBLIGATORIA

**SIEMPRE que se implemente un DataTable, el header de las columnas (thead) DEBE quedarse fijo al hacer scroll. Solo los items (filas) deben hacer scroll, el header debe permanecer visible.**

## 📋 Descripción del Problema

El `thead` (header) del DataTable **NO se queda sticky** cuando hay scroll vertical, lo que significa que al hacer scroll hacia abajo, el header desaparece junto con el contenido en lugar de quedarse fijo en la parte superior.

## 🎯 Comportamiento Esperado

Según Storybook y el diseño de UBITS, el `thead` del DataTable **DEBE quedarse sticky** (fijo en la parte superior) cuando hay scroll vertical, permitiendo que los usuarios siempre vean los nombres de las columnas mientras navegan por los datos.

## 🔍 Causa Raíz

El problema tiene **dos causas principales**:

### 1. **Falta activar `showVerticalScrollbar: true`**

El DataTable necesita tener scroll vertical activo para que el sticky funcione. Sin esta opción, el DataTable no crea el contenedor scrollable necesario para que `position: sticky` funcione correctamente.

### 2. **Falta CSS para hacer el thead sticky**

Aunque el DataTable tiene estilos base, el `thead` no tiene `position: sticky` aplicado por defecto. Es necesario agregar CSS específico para activar el comportamiento sticky.

## ✅ Solución

### **Paso 1: Activar Scroll Vertical en el DataTable**

Agregar `showVerticalScrollbar: true` en las opciones del DataTable:

```javascript
window.createDataTable({
  containerId: 'encuestas-table-container',
  showVerticalScrollbar: true, // ✅ CRÍTICO: Necesario para que el thead sticky funcione
  columns: [
    // ... columnas
  ],
  rows: items
});
```

### **Paso 2: Agregar CSS para Thead Sticky**

Agregar los siguientes estilos CSS en el template:

```css
/* ========================================
   FIX: ACTIVAR STICKY DEL THEAD DEL DATATABLE
   ======================================== */
/* PROBLEMA: El thead del DataTable NO se queda sticky cuando hay scroll vertical,
   debería quedarse fijo en la parte superior.
   SOLUCIÓN: Activar position: sticky en el thead para que se quede fijo al hacer scroll.
   REQUISITO: showVerticalScrollbar: true debe estar activo en el DataTable. */

/* Asegurar que el contenedor scrollable tenga el contexto correcto para sticky */
#encuestas-table-container .ubits-data-table__scrollable-container--vertical {
    position: relative; /* Necesario para que sticky funcione */
}

/* Activar sticky en el thead */
#encuestas-table-container .ubits-data-table__thead {
    position: sticky !important;
    top: 0 !important;
    z-index: 10 !important;
    background-color: var(--modifiers-normal-color-light-bg-1) !important;
}

/* Asegurar que los headers individuales también tengan el fondo correcto */
#encuestas-table-container .ubits-data-table__column-header {
    background-color: var(--modifiers-normal-color-light-bg-1) !important;
}

/* IMPORTANTE: Para columnas pinned, mantener sticky horizontal Y vertical */
#encuestas-table-container .ubits-data-table__column-header--pinned {
    position: sticky !important; /* Mantener sticky para columnas pinned horizontalmente */
    top: 0 !important; /* También sticky verticalmente */
    z-index: 11 !important; /* Mayor z-index que el thead */
}

/* ⚠️ CRÍTICO: Header del checkbox (checkbox-2) también debe ser sticky verticalmente */
/* El header del checkbox debe quedar por encima de las filas al hacer scroll */
#encuestas-table-container .ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"] {
    position: sticky !important;
    top: 0 !important; /* Sticky verticalmente igual que otros headers */
    z-index: 11 !important; /* Mayor z-index que el thead (10) para quedar por encima */
    background-color: var(--ubits-bg-1) !important;
}

/* Asegurar que el checkbox header también tenga fondo cuando está dentro del thead sticky */
#encuestas-table-container .ubits-data-table__thead .ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"] {
    position: sticky !important;
    top: 0 !important;
    z-index: 11 !important; /* Mayor que el thead (10) */
    background-color: var(--ubits-bg-1) !important;
}
```

## 🔑 Puntos Clave

1. **`showVerticalScrollbar: true` es OBLIGATORIO**: Sin esta opción, el DataTable no crea el contenedor scrollable necesario para que sticky funcione.

2. **El contenedor scrollable debe tener `position: relative`**: Esto crea el contexto de posicionamiento necesario para que `position: sticky` funcione.

3. **El thead necesita `position: sticky` y `top: 0`**: Estos estilos hacen que el thead se quede fijo en la parte superior al hacer scroll.

4. **Z-index correcto**: El thead debe tener `z-index: 10` y las columnas pinned deben tener `z-index: 11` para que se superpongan correctamente.

5. **Fondo blanco necesario**: El thead y los headers deben tener `background-color` para evitar que el contenido se vea a través cuando hay scroll.

6. **⚠️ CRÍTICO: Header del checkbox también debe ser sticky**: El header del checkbox (checkbox-2) DEBE tener `position: sticky`, `top: 0` y `z-index: 11` para quedar por encima de las filas al hacer scroll. Sin esto, las filas pasan por encima del header del checkbox en lugar de por debajo.

## ⚠️ Errores Comunes a Evitar

### ❌ **Error 1: Olvidar activar `showVerticalScrollbar`**

```javascript
// ❌ INCORRECTO: Sin scroll vertical, sticky no funciona
window.createDataTable({
  containerId: 'table-container',
  columns: [...],
  rows: items
  // Falta: showVerticalScrollbar: true
});
```

### ❌ **Error 2: Aplicar sticky sin el contenedor scrollable**

```css
/* ❌ INCORRECTO: Sticky no funciona sin el contenedor scrollable */
.ubits-data-table__thead {
    position: sticky !important;
    top: 0 !important;
}
/* Falta: El contenedor debe tener position: relative */
```

### ❌ **Error 3: No aplicar fondo al thead**

```css
/* ❌ INCORRECTO: Sin fondo, el contenido se ve a través */
.ubits-data-table__thead {
    position: sticky !important;
    top: 0 !important;
    /* Falta: background-color */
}
```

### ❌ **Error 4: Header del checkbox queda por debajo de las filas al hacer scroll** ⚠️ **NUEVO**

**⚠️ IMPORTANTE:** Este error tiene una solución más completa que requiere CSS + JavaScript. Ver la guía específica para la solución completa.

**Problema:**
- El header del checkbox (checkbox-2) no se queda fijo al hacer scroll vertical
- Las filas pasan por encima del header del checkbox en lugar de por debajo
- El z-index no es suficiente o hay problemas de stacking context

**Causa:**
- El header del checkbox (checkbox-2) no tiene `position: sticky` con `top: 0` configurado correctamente
- El z-index no es suficiente para quedar por encima de las filas (las celdas tienen z-index: 12)
- El thead no tiene z-index base para crear el stacking context correcto
- Los estilos inline del DataTable sobrescriben los estilos CSS

**✅ SOLUCIÓN COMPLETA:**
Ver guía detallada: `docs/guias/implementacion/GUIA-ERROR-HEADER-CHECKBOX-NO-STICKY-DATATABLE.md` - ⚠️ **OBLIGATORIO**

**Resumen de la solución:**
1. CSS: Configurar z-index del thead (10), header del checkbox (50), celdas (12), tbody (1)
2. JavaScript: Aplicar estilos dinámicamente con `!important` para sobrescribir estilos inline
3. MutationObserver: Re-aplicar estilos cuando el DataTable se actualiza

**Verificación:**
- El header del checkbox debe tener `position: sticky`, `top: 0` y `z-index: 50` o mayor
- El thead debe tener `z-index: 10` para crear el stacking context
- Las celdas deben tener `z-index: 12` (menor que el header)
- Al hacer scroll, las filas deben pasar por debajo del header del checkbox

## 📝 Checklist de Verificación

Al implementar DataTable con thead sticky, verificar:

- [ ] `showVerticalScrollbar: true` está activo en las opciones del DataTable
- [ ] El contenedor scrollable tiene `position: relative`
- [ ] El thead tiene `position: sticky` y `top: 0`
- [ ] El thead tiene `background-color` aplicado
- [ ] Los headers individuales tienen `background-color` aplicado
- [ ] Las columnas pinned tienen `z-index: 11` (mayor que el thead)
- [ ] El thead tiene `z-index: 10`
- [ ] **⚠️ CRÍTICO: El header del checkbox (checkbox-2) tiene `position: sticky`, `top: 0` y `z-index: 11`**
- [ ] **⚠️ CRÍTICO: El header del checkbox tiene `background-color` aplicado**
- [ ] Se prueba haciendo scroll vertical para verificar que el header se queda fijo
- [ ] Se verifica que el header del checkbox queda por encima de las filas (no por debajo)

## 🔗 Referencias

- **Guía de implementación DataTable:** `docs/guias/implementacion/GUIA-IMPLEMENTACION-DATATABLE-PASO-A-PASO.md`
- **Error común relacionado:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md` - ERROR CRÍTICO #27
- **Guía de altura dinámica:** `docs/guias/implementacion/GUIA-ALTURA-DINAMICA-DATATABLE.md`
- **Error específico header checkbox:** `docs/guias/implementacion/GUIA-ERROR-HEADER-CHECKBOX-NO-STICKY-DATATABLE.md` - ⚠️ **OBLIGATORIO** ⭐ **NUEVO**

---

## ⚠️ REGLA OBLIGATORIA

**SIEMPRE que se implemente un DataTable, el header de las columnas (thead) DEBE quedarse fijo al hacer scroll. Solo los items (filas) deben hacer scroll, el header debe permanecer visible.**

**Pasos obligatorios:**
1. ✅ Configurar `showVerticalScrollbar: true` en las opciones del DataTable
2. ✅ Agregar CSS para hacer el thead sticky (ver solución arriba)

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.3.0 (Referencia a guía específica para header checkbox sticky con solución completa CSS + JavaScript)







