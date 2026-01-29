# 🚨 Guía: Implementación de Filtros en DataTable Sin Conflictos de Estilos

> **⚠️ CRÍTICO:** Esta guía documenta cómo implementar los filtros del DataTable correctamente, evitando conflictos de estilos entre el drawer navigation y los inputs.

---

## ❌ PROBLEMA IDENTIFICADO

**Síntomas:**
- Los filtros están implementados de forma "quemada" (hardcoded)
- Hay conflictos de estilos entre el drawer navigation y los inputs
- Los inputs se dañan o no se muestran correctamente
- Los estilos del drawer navigation afectan los inputs

**Causa Raíz:**
- El drawer se crea pero los inputs se crean antes de que el drawer esté completamente renderizado
- Los estilos del drawer navigation se aplican a los inputs
- El orden de creación no es el correcto

---

## ✅ SOLUCIÓN CORRECTA

### **REGLA FUNDAMENTAL:**

**⚠️ CRÍTICO: Crear PRIMERO el drawer navigation y DESPUÉS los inputs, sin problemas de CSS**

### **PASO 1: Configurar filterButton con filters (NO hardcoded)**

```javascript
header: {
  filterButton: {
    // ⚠️ CRÍTICO: NO usar filterButton: true solo
    // ⚠️ CRÍTICO: Configurar filters explícitamente
    filters: [
      {
        id: 'filtro-nombre',
        label: 'Nombre de la encuesta',
        columnId: 'nombre',
        type: 'text',
        value: '' // Valor inicial vacío
      },
      {
        id: 'filtro-tipo',
        label: 'Tipo',
        columnId: 'tipo',
        type: 'select',
        options: [
          { value: 'Cultura', label: 'Cultura' },
          { value: 'Satisfacción', label: 'Satisfacción' },
          { value: 'Clima', label: 'Clima' },
          { value: 'Desempeño', label: 'Desempeño' },
          { value: 'Innovación', label: 'Innovación' }
        ],
        value: ''
      },
      {
        id: 'filtro-estado',
        label: 'Estado',
        columnId: 'estado',
        type: 'select',
        options: [
          { value: 'en-progreso', label: 'En progreso' },
          { value: 'completada', label: 'Completada' },
          { value: 'pausada', label: 'Pausada' },
          { value: 'programada', label: 'Programada' }
        ],
        value: ''
      },
      {
        id: 'filtro-fecha-inicio',
        label: 'Fecha de inicio',
        columnId: 'fecha-inicio',
        type: 'calendar', // ⚠️ CRÍTICO: Usar 'calendar' para fechas (NO 'date')
        value: ''
      },
      {
        id: 'filtro-fecha-cierre',
        label: 'Fecha de cierre',
        columnId: 'fecha-cierre',
        type: 'calendar', // ⚠️ CRÍTICO: Usar 'calendar' para fechas (NO 'date')
        value: ''
      }
    ],
    onApplyFilters: (filters) => {
      // ⚠️ CRÍTICO: Implementar lógica de filtrado
      console.log('📊 [DataTable] Aplicando filtros:', filters);
      
      // Filtrar filas basándose en los filtros aplicados
      const filteredRows = encuestasDataOriginal.filter((row) => {
        // Verificar cada filtro
        for (const [filterId, filterValue] of Object.entries(filters)) {
          if (!filterValue || filterValue.trim() === '') continue;
          
          // Mapear filterId a columnId
          const filterConfig = currentOptions.header.filterButton?.filters?.find(f => f.id === filterId);
          if (!filterConfig) continue;
          
          const columnId = filterConfig.columnId;
          const cellValue = String(row.data[columnId] || '').toLowerCase();
          const searchValue = filterValue.toLowerCase();
          
          if (!cellValue.includes(searchValue)) {
            return false; // Fila no coincide con este filtro
          }
        }
        return true; // Fila pasa todos los filtros
      });
      
      // Actualizar DataTable con filas filtradas
      if (window._encuestasDataTableInstance && window._encuestasDataTableInstance.update) {
        window._encuestasDataTableInstance.update({ rows: filteredRows });
      }
    },
    onClearFilters: () => {
      // ⚠️ CRÍTICO: Implementar lógica de limpieza
      console.log('📊 [DataTable] Limpiando filtros');
      
      // Restaurar todas las filas originales
      if (window._encuestasDataTableInstance && window._encuestasDataTableInstance.update) {
        window._encuestasDataTableInstance.update({ rows: encuestasDataOriginal });
      }
      
      // Limpiar valores de inputs en el drawer (si está abierto)
      const drawer = document.querySelector('.ubits-drawer');
      if (drawer) {
        const inputs = drawer.querySelectorAll('input, select');
        inputs.forEach((input: HTMLInputElement | HTMLSelectElement) => {
          input.value = '';
        });
      }
    }
  }
}
```

### **PASO 2: Verificar que el DataTable Crea el Drawer Correctamente**

El DataTable internamente crea el drawer de la siguiente forma:

```javascript
// ⚠️ CRÍTICO: El DataTable crea el drawer así (NO modificar esto)
const drawer = createDrawer({
  title: 'Filtros',
  complementaryText: 'Aplica filtros para refinar los resultados',
  width: 40,
  bodyContent: () => {
    return '<div id="filters-container"></div>';
  },
  footerButtons: {
    secondary: {
      label: 'Limpiar',
      onClick: (e) => {
        e.preventDefault();
        if (currentOptions.header.filterButton?.onClearFilters) {
          currentOptions.header.filterButton.onClearFilters();
        }
        drawer.close();
      },
    },
    primary: {
      label: 'Aplicar',
      onClick: (e) => {
        e.preventDefault();
        // Recopilar valores de filtros
        const filters: Record<string, string> = {};
        const inputs = drawer.element.querySelectorAll('#filters-container .ubits-input');
        inputs.forEach((input) => {
          const htmlInput = input as HTMLInputElement;
          if (htmlInput.value) {
            const filterId = htmlInput.getAttribute('data-filter-id');
            if (filterId) {
              filters[filterId] = htmlInput.value;
            }
          }
        });
        if (currentOptions.header.filterButton?.onApplyFilters) {
          currentOptions.header.filterButton.onApplyFilters(filters);
        }
        drawer.close();
      },
    },
  },
  onClose: () => {
    if (drawer.element?.parentElement) {
      drawer.element.remove();
    }
  },
  open: true,
});

// ⚠️ CRÍTICO: Crear inputs DESPUÉS de que el drawer esté completamente renderizado
setTimeout(() => {
  const container = drawer.element?.querySelector('#filters-container') as HTMLElement;
  if (!container) return;

  const filters = currentOptions.header.filterButton?.filters || [];

  if (filters.length > 0) {
    filters.forEach((filter) => {
      const filterDiv = document.createElement('div');
      filterDiv.id = `filter-${filter.id}`;
      container.appendChild(filterDiv);

      const inputOptions: any = {
        containerId: `filter-${filter.id}`,
        label: filter.label,
        type: filter.type === 'date' ? 'calendar' : filter.type,
        value: filter.value || '',
        size: 'md',
      };

      if (filter.type === 'select' && filter.options) {
        inputOptions.selectOptions = filter.options.map((opt) => ({
          value: opt.value,
          text: opt.label || opt.value,
        }));
      }

      createInput(inputOptions);
    });
  }
}, 200); // ⚠️ CRÍTICO: Esperar 200ms para que el drawer esté completamente renderizado
```

### **PASO 3: Asegurar que NO Haya Conflictos de Estilos**

**⚠️ CRÍTICO: El drawer navigation NO debe afectar los inputs**

El problema puede ser que los estilos del drawer navigation se aplican a los inputs. Para evitarlo:

1. **NO agregar estilos CSS personalizados al drawer** (a menos que sea absolutamente necesario)
2. **NO modificar los estilos de `.ubits-drawer__body`** (el drawer ya tiene sus propios estilos)
3. **NO agregar padding/margin manual a los inputs** (el drawer ya maneja el spacing)

**Si hay conflictos, agregar estilos específicos:**

```css
/* ⚠️ CRÍTICO: Solo agregar si hay conflictos reales */
.ubits-drawer__body #filters-container {
  /* El drawer ya tiene padding, NO agregar más */
  padding: 0;
}

.ubits-drawer__body #filters-container > div {
  /* Espaciado entre filtros */
  margin-bottom: var(--ubits-spacing-md, 12px);
}

.ubits-drawer__body #filters-container > div:last-child {
  margin-bottom: 0;
}

/* ⚠️ CRÍTICO: Asegurar que los inputs NO hereden estilos del drawer navigation */
.ubits-drawer__body .ubits-input {
  /* Resetear cualquier estilo heredado del drawer navigation */
  width: 100%;
  box-sizing: border-box;
}
```

---

## 🚨 REGLAS CRÍTICAS

### **1. Orden de Creación**

✅ **CORRECTO:**
1. Crear drawer primero
2. Esperar a que el drawer esté completamente renderizado (200ms)
3. Crear inputs después

❌ **INCORRECTO:**
- Crear inputs antes del drawer
- Crear inputs sin esperar a que el drawer esté renderizado
- Crear inputs en el mismo momento que el drawer

### **2. Configuración de Filtros**

✅ **CORRECTO:**
```javascript
filterButton: {
  filters: [ /* array de filtros */ ],
  onApplyFilters: (filters) => { /* lógica */ },
  onClearFilters: () => { /* lógica */ }
}
```

❌ **INCORRECTO:**
```javascript
filterButton: true // ❌ Esto crea un filtro de prueba "quemado"
```

### **3. Tipos de Filtros**

✅ **CORRECTO:**
- `type: 'text'` para texto
- `type: 'select'` para selección (con `options`)
- `type: 'calendar'` para fechas (NO `'date'`)

❌ **INCORRECTO:**
- `type: 'date'` (debe ser `'calendar'`)

### **4. Estilos CSS**

✅ **CORRECTO:**
- Dejar que el drawer maneje el spacing
- Solo agregar estilos si hay conflictos reales
- Usar variables CSS de UBITS para spacing

❌ **INCORRECTO:**
- Agregar padding/margin manual sin necesidad
- Modificar estilos del drawer navigation
- Agregar estilos que afecten los inputs

---

## 📋 CHECKLIST COMPLETO

Antes de considerar la implementación completa, verificar:

- [ ] ✅ `filterButton` tiene `filters` configurado (NO solo `filterButton: true`)
- [ ] ✅ Cada filtro tiene `id`, `label`, `columnId`, `type` correctos
- [ ] ✅ Filtros de tipo `select` tienen `options` configurado
- [ ] ✅ Filtros de tipo fecha usan `type: 'calendar'` (NO `'date'`)
- [ ] ✅ `onApplyFilters` está implementado con lógica de filtrado
- [ ] ✅ `onClearFilters` está implementado con lógica de limpieza
- [ ] ✅ El drawer se crea primero (automático por el DataTable)
- [ ] ✅ Los inputs se crean después de 200ms (automático por el DataTable)
- [ ] ✅ NO hay estilos CSS que afecten los inputs del drawer
- [ ] ✅ NO hay filtros "quemados" (hardcoded)
- [ ] ✅ Los inputs se muestran correctamente sin conflictos de estilos

---

## 🔍 VERIFICACIÓN DE PROBLEMAS COMUNES

### **Problema 1: Inputs No Se Muestran**

**Causa:** El drawer no está completamente renderizado cuando se crean los inputs.

**Solución:** El DataTable ya espera 200ms, pero si aún hay problemas, verificar:
- Que el drawer esté completamente visible antes de crear inputs
- Que el contenedor `#filters-container` exista
- Que no haya errores en la consola

### **Problema 2: Inputs Se Ven Dañados**

**Causa:** Conflictos de estilos entre drawer navigation y inputs.

**Solución:**
- Verificar que no haya estilos CSS personalizados que afecten los inputs
- Verificar que los inputs usen las clases correctas de UBITS
- Agregar estilos específicos solo si es necesario (ver PASO 3)

### **Problema 3: Filtros "Quemados" (Hardcoded)**

**Causa:** Se usa `filterButton: true` sin configurar `filters`.

**Solución:**
- Siempre configurar `filterButton.filters` explícitamente
- NO usar `filterButton: true` solo

---

## 🔗 Referencias

- **Guía de errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`
- **Guía de drawer simple:** `docs/guias/implementacion/GUIA-DRAWER-FILTROS-DATATABLE-SIMPLE.md`
- **Código fuente del DataTable:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (líneas 5793-5900)
- **Tipos de DataTableOptions:** `vendor/ubits/packages/components/data-table/src/types/DataTableOptions.ts` (líneas 397-442)

---

**Última actualización:** Enero 2025  
**Versión:** 1.0.0

