# 📋 Guía: Implementación del Action Bar en DataTable con Checkboxes

## 🎯 REGLA DE ORO

**SIEMPRE que un DataTable tenga `showCheckbox: true`, DEBE implementarse el Action Bar para acciones individuales y grupales.**

## ⚠️ ERROR CRÍTICO A EVITAR

**NO agregar texto separado "X encuestas seleccionadas" antes del botón** - El componente maestro NO tiene este texto separado. El contador está DENTRO del botón: "Ver seleccionados (20)". Ver: `docs/guias/implementacion/GUIA-ERROR-CONTADOR-BOTON-VER-SELECCIONADOS.md`

El Action Bar es una barra de acciones que aparece debajo del header del DataTable cuando hay filas seleccionadas, proporcionando:
- ✅ **Acciones individuales:** Cuando se selecciona 1 fila
- ✅ **Acciones grupales:** Cuando se seleccionan 2+ filas
- ✅ **Funcionalidad "Ver seleccionados":** Filtra la tabla para mostrar solo las filas seleccionadas

---

## 📋 COMPONENTES DEL ACTION BAR

### **1. Estructura Visual**

El Action Bar se posiciona **inmediatamente después del header** del DataTable:

```
┌─────────────────────────────────────────┐
│ Header (título, contador, botones)     │
├─────────────────────────────────────────┤
│ Action Bar (aparece cuando hay selección)│ ← Aquí
├─────────────────────────────────────────┤
│ Tabla de datos                          │
└─────────────────────────────────────────┘
```

### **2. Botones por Tipo de Selección**

#### **Selección Única (1 fila seleccionada):**
- ✅ **Ver seleccionados** - Filtra la tabla para mostrar solo la fila seleccionada
- ✅ **Notificaciones** (icono) - Acción de notificaciones
- ✅ **Copiar** (icono) - Copiar fila
- ✅ **Ver** (icono) - Ver detalles
- ✅ **Editar** (icono) - Editar fila
- ✅ **Descargar** (icono) - Descargar fila
- ✅ **Eliminar** (icono, error) - Eliminar fila

#### **Selección Múltiple (2+ filas seleccionadas):**
- ✅ **Ver seleccionados** - Filtra la tabla para mostrar solo las filas seleccionadas
- ✅ **Notificaciones** (icono) - Acción masiva de notificaciones
- ✅ **Eliminar** (icono, error) - Eliminar múltiples filas

---

## 🔧 IMPLEMENTACIÓN PASO A PASO

### **PASO 1: Verificar que showCheckbox está activado**

```javascript
window.createDataTable({
  containerId: 'mi-tabla-container',
  showCheckbox: true, // ✅ OBLIGATORIO: Debe estar activado
  // ... otras opciones
});
```

### **PASO 2: Crear función para renderizar el Action Bar**

```javascript
// Estado para rastrear selecciones
const selectionState = {
  selectedRowIds: new Set(),
  viewSelectedActive: false
};

// ⚠️ CRÍTICO: Mantener referencia a datos originales completos
let usuariosData = [];
let usuariosDataOriginal = []; // Mantener todos los datos originales para restaurar cuando se desactiva "Ver seleccionados"

// Función para renderizar el Action Bar
const renderActionBar = (container) => {
  const header = container.querySelector('.ubits-data-table__header');
  if (!header) {
    return;
  }

  // Buscar barra existente
  let actionBar = container.querySelector('.ubits-data-table__action-bar');

  // Si no existe, crearla
  if (!actionBar) {
    actionBar = document.createElement('div');
    actionBar.className = 'ubits-data-table__action-bar';
    // ⚠️ CRÍTICO: Estilos exactos del componente original (sin border-bottom)
    actionBar.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: var(--ubits-spacing-xs, 4px); /* ⚠️ CRÍTICO: gap es xs (4px), NO sm (8px) */
      padding: var(--ubits-spacing-sm, 8px) 0; /* ⚠️ CRÍTICO: 8px arriba y abajo, 0px en los lados */
      background-color: var(--ubits-bg-1);
      /* ⚠️ CRÍTICO: NO agregar border-bottom - el componente original NO lo tiene */
    `;
    header.insertAdjacentElement('afterend', actionBar);
  }

  // Contar selecciones
  const selectedCount = selectionState.selectedRowIds.size;
  const selectedIds = Array.from(selectionState.selectedRowIds);

  // Ocultar la barra si no hay selecciones
  if (selectedCount === 0) {
    actionBar.style.display = 'none';
    return;
  }

  // Mostrar la barra cuando hay selecciones
  actionBar.style.display = 'flex';

  const isMultipleSelection = selectedCount > 1;

  let buttonsHTML = '';

  // Estado del botón "Ver seleccionados"
  // ⚠️ CRÍTICO: El botón SÍ debe tener el contador entre paréntesis
  // NO agregar texto separado "X encuestas seleccionadas" antes del botón
  const countText = `(${selectedCount})`;
  const isViewSelectedActive = selectionState.viewSelectedActive;
  const viewSelectedText = isViewSelectedActive
    ? `Dejar de ver seleccionados ${countText}`
    : `Ver seleccionados ${countText}`;
  const viewSelectedIcon = isViewSelectedActive ? 'eye-slash' : 'eye';

  // ⚠️ CRÍTICO: Verificar si window.UBITS.Button.render está disponible
  const hasButtonRender = typeof window.UBITS !== 'undefined' && 
                         window.UBITS.Button && 
                         window.UBITS.Button.render;

  if (hasButtonRender) {
    // Usar renderButton de UBITS
    const renderBtn = window.UBITS.Button.render;
    
    if (isMultipleSelection) {
      // Selección múltiple: botones grupales
      buttonsHTML = `
        ${renderBtn({
          variant: 'secondary',
          size: 'sm',
          text: viewSelectedText,
          icon: viewSelectedIcon,
          iconStyle: 'regular',
          active: isViewSelectedActive,
          attributes: { id: 'action-btn-view-selected' },
        })}
        ${renderBtn({
          variant: 'secondary',
          size: 'sm',
          icon: 'bell',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-notifications' },
        })}
        ${renderBtn({
          variant: 'error',
          size: 'sm',
          icon: 'trash',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-delete' },
        })}
      `;
    } else {
      // Selección única: todos los botones
      buttonsHTML = `
        ${renderBtn({
          variant: 'secondary',
          size: 'sm',
          text: viewSelectedText,
          icon: viewSelectedIcon,
          iconStyle: 'regular',
          active: isViewSelectedActive,
          attributes: { id: 'action-btn-view-selected' },
        })}
        ${renderBtn({
          variant: 'secondary',
          size: 'sm',
          icon: 'bell',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-notifications' },
        })}
        ${renderBtn({
          variant: 'secondary',
          size: 'sm',
          icon: 'copy',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-copy' },
        })}
        ${renderBtn({
          variant: 'secondary',
          size: 'sm',
          icon: 'eye',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-view' },
        })}
        ${renderBtn({
          variant: 'secondary',
          size: 'sm',
          icon: 'edit',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-edit' },
        })}
        ${renderBtn({
          variant: 'secondary',
          size: 'sm',
          icon: 'download',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-download' },
        })}
        ${renderBtn({
          variant: 'error',
          size: 'sm',
          icon: 'trash',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-delete' },
        })}
      `;
    }
  } else {
    // Fallback: crear HTML manualmente con iconos FontAwesome correctos
    const buttonClass = 'ubits-button ubits-button--secondary ubits-button--sm';
    // ⚠️ CRÍTICO: Formato correcto de iconos FontAwesome (fa-regular fa-icon-name)
    const iconClass = (icon, style = 'regular') => {
      const stylePrefix = style === 'solid' ? 'fa-solid' : 'fa-regular';
      return `${stylePrefix} fa-${icon}`; // Resultado: "fa-regular fa-bell"
    };
    
    // Clase active para el botón "Ver seleccionados" si está activo
    const viewSelectedActiveClass = isViewSelectedActive ? ' ubits-button--active' : '';
    
    if (isMultipleSelection) {
      buttonsHTML = `
        <button class="${buttonClass}${viewSelectedActiveClass}" id="action-btn-view-selected">
          <i class="${iconClass(viewSelectedIcon, 'regular')}"></i>
          <span>${viewSelectedText}</span>
        </button>
        <button class="${buttonClass} ubits-button--icon-only" id="action-btn-notifications" aria-label="Notificaciones">
          <i class="${iconClass('bell', 'regular')}"></i>
        </button>
        <button class="ubits-button ubits-button--error ubits-button--sm ubits-button--icon-only" id="action-btn-delete" aria-label="Eliminar">
          <i class="${iconClass('trash', 'regular')}"></i>
        </button>
      `;
    } else {
      buttonsHTML = `
        <button class="${buttonClass}${viewSelectedActiveClass}" id="action-btn-view-selected">
          <i class="${iconClass(viewSelectedIcon, 'regular')}"></i>
          <span>${viewSelectedText}</span>
        </button>
        <button class="${buttonClass} ubits-button--icon-only" id="action-btn-notifications" aria-label="Notificaciones">
          <i class="${iconClass('bell', 'regular')}"></i>
        </button>
        <button class="${buttonClass} ubits-button--icon-only" id="action-btn-copy" aria-label="Copiar">
          <i class="${iconClass('copy', 'regular')}"></i>
        </button>
        <button class="${buttonClass} ubits-button--icon-only" id="action-btn-view" aria-label="Ver">
          <i class="${iconClass('eye', 'regular')}"></i>
        </button>
        <button class="${buttonClass} ubits-button--icon-only" id="action-btn-edit" aria-label="Editar">
          <i class="${iconClass('pen-to-square', 'regular')}"></i>
        </button>
        <button class="${buttonClass} ubits-button--icon-only" id="action-btn-download" aria-label="Descargar">
          <i class="${iconClass('download', 'regular')}"></i>
        </button>
        <button class="ubits-button ubits-button--error ubits-button--sm ubits-button--icon-only" id="action-btn-delete" aria-label="Eliminar">
          <i class="${iconClass('trash', 'regular')}"></i>
        </button>
      `;
    }
  }

        // ⚠️ CRÍTICO: NO agregar texto separado "X encuestas seleccionadas" antes del botón
        // El componente maestro NO tiene este texto separado
        // El contador está DENTRO del texto del botón: "Ver seleccionados (20)"
        
        actionBar.innerHTML = buttonsHTML;

        // ✅ CRÍTICO: Remover listener anterior si existe y agregar uno nuevo
        // Esto asegura que el listener funcione después de cada re-renderizado
        if (actionBarClickHandler) {
          actionBar.removeEventListener('click', actionBarClickHandler);
        }
        
        // ⚠️ CRÍTICO: Mantener referencia a datos originales completos
        // usuariosDataOriginal debe contener TODOS los datos originales
        // usuariosData puede estar filtrado o modificado por ordenamiento
        
        actionBarClickHandler = (e) => {
          const target = e.target.closest('button');
          if (!target) return;
          
          const btnId = target.getAttribute('id');
          if (!btnId) return;
          
          if (btnId === 'action-btn-view-selected') {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle del estado
            selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
            
            // Re-renderizar tabla con filtro
            if (tableInstance && tableInstance.update) {
              if (selectionState.viewSelectedActive) {
                // ⚠️ CRÍTICO: Filtrar desde usuariosDataOriginal (todos los datos disponibles)
                const filteredRows = usuariosDataOriginal.filter((row) => 
                  selectionState.selectedRowIds.has(row.id)
                );
                tableInstance.update({ rows: filteredRows });
              } else {
                // ⚠️ CRÍTICO: Restaurar todos los datos originales
                tableInstance.update({ rows: usuariosDataOriginal });
              }
            }
            
            // Re-renderizar Action Bar para actualizar texto e icono
            renderActionBar(container);
          } else {
            // Otros botones
            const action = btnId.replace('action-btn-', '');
            console.log(`Acción ${action} ejecutada para:`, selectedIds);
            // TODO: Implementar lógica de acción
          }
        };
        
        // ⚠️ CRÍTICO: Agregar listener después de cada re-renderizado
        actionBar.addEventListener('click', actionBarClickHandler);
      };
```

### **PASO 3: Rastrear selecciones de checkboxes**

```javascript
// ⚠️ CRÍTICO: Interceptar cambios en checkboxes usando el CONTENEDOR, NO el DataTable
// El contenedor no se reemplaza, pero el DataTable sí puede ser reemplazado durante update()
const container = document.getElementById('mi-tabla-container');

// ✅ CORRECTO: Usar delegado de eventos en el CONTENEDOR
container.addEventListener('change', (e) => {
  const target = e.target;
  
  // Verificar si es un checkbox
  if (!target || target.type !== 'checkbox') return;
  
  // Verificar si es el checkbox del header (select all)
  if (target.hasAttribute('data-column-checkbox-header')) {
    const columnId = target.getAttribute('data-column-checkbox-header');
    if (columnId === 'checkbox' || columnId === 'checkbox-2') {
      // Manejar selección masiva
      if (target.checked) {
        rows.forEach((row) => selectionState.selectedRowIds.add(row.id));
      } else {
        selectionState.selectedRowIds.clear();
        selectionState.viewSelectedActive = false;
      }
      setTimeout(() => renderActionBar(container), 200);
    }
  } else {
    // Es un checkbox de fila individual (NO del header)
    const rowId = target.getAttribute('data-row-id');
    if (!rowId) return;
    
    if (target.checked) {
      selectionState.selectedRowIds.add(rowId);
    } else {
      selectionState.selectedRowIds.delete(rowId);
    }
    
    // Si se deselecciona todo, desactivar "Ver seleccionados"
    if (selectionState.selectedRowIds.size === 0) {
      selectionState.viewSelectedActive = false;
    }
    
    // Re-renderizar Action Bar
    renderActionBar(container);
  }
}, true); // ✅ CRÍTICO: Usar capture: true
```

### **PASO 4: Interceptar selección masiva (header checkbox)**

**⚠️ NOTA:** Este paso ya está incluido en el PASO 3. El listener en el contenedor maneja tanto checkboxes individuales como el header checkbox. No es necesario un listener separado.

**✅ El listener del PASO 3 ya maneja ambos casos:**
- Checkboxes individuales: `!target.hasAttribute('data-column-checkbox-header')`
- Header checkbox: `target.hasAttribute('data-column-checkbox-header')`

**❌ NO crear un listener separado para el header checkbox** - esto causaría duplicación y problemas.

### **PASO 5: Preservar Action Bar durante re-renderizados**

```javascript
// MutationObserver para preservar la barra cuando el Data Table se re-renderiza
let actionBarObserver = null;

const container = document.getElementById('mi-tabla-container');
if (container) {
  if (!actionBarObserver) {
    actionBarObserver = new MutationObserver(() => {
      const bar = container.querySelector('.ubits-data-table__action-bar');
      if (!bar) {
        // La barra fue eliminada, reinsertarla
        setTimeout(() => {
          renderActionBar(container);
        }, 100);
      }
    });
    actionBarObserver.observe(container, { childList: true, subtree: true });
  }
}
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### **Verificación Obligatoria:**

- [ ] ✅ `showCheckbox: true` está configurado en el DataTable
- [ ] ✅ Función `renderActionBar()` implementada
- [ ] ✅ Estado `selectionState` para rastrear selecciones
- [ ] ✅ **Referencia a datos originales:** `usuariosDataOriginal` creada y mantenida
- [ ] ✅ **Estilos CSS correctos:** Sin `border-bottom`, `gap: var(--ubits-spacing-xs)`, `padding: var(--ubits-spacing-sm) 0`
- [ ] ✅ **Formato de iconos correcto:** `fa-regular fa-icon-name` o `fa-solid fa-icon-name` (NO `fa-r fa-icon`)
- [ ] ✅ **Listeners:** Remover y re-agregar listener cada vez que se renderiza Action Bar
- [ ] ✅ Listener para checkboxes individuales implementado
- [ ] ✅ Listener para header checkbox (selección masiva) implementado
- [ ] ✅ MutationObserver para preservar Action Bar durante re-renderizados
- [ ] ✅ Botón "Ver seleccionados" funciona correctamente (filtra desde `usuariosDataOriginal`)
- [ ] ✅ Botón "Dejar de ver seleccionados" funciona correctamente (restaura `usuariosDataOriginal`)
- [ ] ✅ Acciones individuales funcionan (1 fila seleccionada)
- [ ] ✅ Acciones grupales funcionan (2+ filas seleccionadas)
- [ ] ✅ Action Bar se oculta cuando no hay selecciones
- [ ] ✅ Action Bar se muestra cuando hay selecciones
- [ ] ✅ **Verificación visual:** Action Bar NO tiene línea divisoria (border-bottom)
- [ ] ✅ **Verificación visual:** Iconos de botones se muestran correctamente

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: No implementar Action Bar cuando showCheckbox está activado**

**Problema:**
- El DataTable tiene checkboxes pero no hay Action Bar
- Los usuarios no pueden realizar acciones sobre las filas seleccionadas

**✅ SOLUCIÓN:**
- SIEMPRE implementar Action Bar cuando `showCheckbox: true`

---

### **❌ ERROR 2: No interceptar selección masiva del header checkbox**

**Problema:**
- Al seleccionar todos desde el header, el Action Bar no aparece
- El estado de selección no se actualiza correctamente

**✅ SOLUCIÓN:**
- Agregar listener con delegado de eventos para el header checkbox
- Usar `capture: true` para capturar antes que otros listeners

---

### **❌ ERROR 3: No preservar Action Bar durante re-renderizados**

**Problema:**
- El Action Bar desaparece cuando el DataTable se re-renderiza
- Los usuarios pierden el contexto de selección

**✅ SOLUCIÓN:**
- Usar MutationObserver para detectar cuando se elimina el Action Bar
- Re-renderizar el Action Bar automáticamente

---

### **❌ ERROR 4: No implementar funcionalidad "Ver seleccionados"**

**Problema:**
- El botón "Ver seleccionados" no filtra la tabla
- Los usuarios no pueden ver solo las filas seleccionadas

**✅ SOLUCIÓN:**
- Implementar lógica de filtrado usando `tableInstance.update({ rows: filteredRows })`
- Mantener estado `viewSelectedActive` para alternar entre vista completa y filtrada

---

### **❌ ERROR 5: Agregar línea divisoria (border-bottom) que no tiene el componente original** ⚠️ **NUEVO**

**Problema:**
```javascript
// ❌ INCORRECTO: Agregar border-bottom que no existe en el componente original
actionBar.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: var(--ubits-spacing-sm, 8px);
  padding: var(--ubits-spacing-md, 12px) var(--ubits-spacing-lg, 16px);
  background-color: var(--ubits-bg-1);
  border-bottom: 1px solid var(--ubits-border-color, #e0e0e0); // ❌ NO EXISTE EN EL COMPONENTE ORIGINAL
`;
```

**Causa:**
- No verificar estilos CSS del componente original en `vendor/ubits/packages/components/data-table/src/styles/data-table.css`
- El componente original NO tiene `border-bottom`

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Estilos exactos del componente original
actionBar.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: var(--ubits-spacing-xs, 4px); // ⚠️ CRÍTICO: gap es xs (4px), NO sm (8px)
  padding: var(--ubits-spacing-sm, 8px) 0; // ⚠️ CRÍTICO: 8px arriba y abajo, 0px en los lados
  background-color: var(--ubits-bg-1);
  // ✅ SIN border-bottom - el componente original NO lo tiene
`;
```

**Verificación:**
- Consultar `vendor/ubits/packages/components/data-table/src/styles/data-table.css` (líneas 19-27)
- El componente original tiene:
  - `padding: var(--ubits-spacing-sm) 0;` (8px arriba y abajo, 0px en los lados)
  - `gap: var(--ubits-spacing-xs);` (4px)
  - `background-color: var(--modifiers-normal-color-light-bg-1);`
  - **NO tiene `border-bottom`**

---

### **❌ ERROR 6: Botones sin iconos o formato incorrecto de iconos FontAwesome** ⚠️ **NUEVO**

**Problema:**
```javascript
// ❌ INCORRECTO: Formato incorrecto de iconos FontAwesome
const iconClass = (icon, style = 'regular') => `fa-${style === 'solid' ? 's' : 'r'} fa-${icon}`;
// Resultado: "fa-r fa-bell" ❌ Formato incorrecto

buttonsHTML = `
  <button class="${buttonClass} ubits-button--icon-only" id="action-btn-notifications">
    <i class="${iconClass('bell', 'regular')}"></i> <!-- ❌ No se muestra el icono -->
  </button>
`;
```

**Causa:**
- Formato incorrecto de clases FontAwesome
- Debe ser `fa-regular fa-bell` (con guión), NO `fa-r fa-bell`

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Formato correcto de iconos FontAwesome
const iconClass = (icon, style = 'regular') => {
  const stylePrefix = style === 'solid' ? 'fa-solid' : 'fa-regular';
  return `${stylePrefix} fa-${icon}`; // Resultado: "fa-regular fa-bell" ✅
};

buttonsHTML = `
  <button class="${buttonClass} ubits-button--icon-only" id="action-btn-notifications" aria-label="Notificaciones">
    <i class="${iconClass('bell', 'regular')}"></i> <!-- ✅ Icono se muestra correctamente -->
  </button>
`;
```

**Verificación:**
- Los iconos deben usar formato: `fa-regular fa-icon-name` o `fa-solid fa-icon-name`
- Agregar `aria-label` para accesibilidad en botones solo con iconos

---

### **❌ ERROR 7: Botón "Ver seleccionados" / "Dejar de ver seleccionados" no funciona** ⚠️ **NUEVO**

**Problema:**
```javascript
// ❌ INCORRECTO: Usar usuariosData que puede estar filtrado o modificado
if (selectionState.viewSelectedActive) {
  const filteredRows = usuariosData.filter((row) => 
    selectionState.selectedRowIds.has(row.id)
  );
  tableInstance.update({ rows: filteredRows });
} else {
  tableInstance.update({ rows: usuariosData }); // ❌ usuariosData puede estar filtrado
}
```

**Causa:**
- `usuariosData` se modifica cuando se ordena o reordena
- No se mantiene referencia a los datos originales completos
- Al desactivar "Ver seleccionados", se restaura desde datos ya filtrados

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Mantener referencia a datos originales completos
let usuariosData = [];
let usuariosDataOriginal = []; // ⚠️ CRÍTICO: Mantener todos los datos originales

// Al inicializar el DataTable
usuariosData = [/* datos iniciales */];
usuariosDataOriginal = [...usuariosData]; // Guardar copia de todos los datos

// Al hacer click en "Ver seleccionados"
if (selectionState.viewSelectedActive) {
  // Filtrar desde usuariosDataOriginal (todos los datos disponibles)
  const filteredRows = usuariosDataOriginal.filter((row) => 
    selectionState.selectedRowIds.has(row.id)
  );
  tableInstance.update({ rows: filteredRows });
} else {
  // Restaurar todos los datos originales
  tableInstance.update({ rows: usuariosDataOriginal }); // ✅ Todos los datos originales
}
```

**Verificación:**
- Siempre mantener `usuariosDataOriginal` con todos los datos originales
- Usar `usuariosDataOriginal` para filtrar y restaurar
- Actualizar `usuariosDataOriginal` cuando se reordena (mantener sincronización)

---

### **❌ ERROR 8: Listeners que se pierden al re-renderizar Action Bar** ⚠️ **NUEVO**

**Problema:**
```javascript
// ❌ INCORRECTO: Listener solo se agrega una vez, se pierde al re-renderizar
if (!actionBarClickHandler) {
  actionBarClickHandler = (e) => {
    // ... lógica
  };
  actionBar.addEventListener('click', actionBarClickHandler);
}
// Al hacer actionBar.innerHTML = buttonsHTML, el listener se pierde
```

**Causa:**
- El listener se agrega solo una vez cuando `!actionBarClickHandler`
- Al reemplazar `innerHTML`, los elementos se recrean y el listener se pierde
- El listener no se vuelve a agregar después de cada re-renderizado

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Remover y re-agregar listener cada vez que se renderiza
actionBar.innerHTML = buttonsHTML;

// ⚠️ CRÍTICO: Remover listener anterior si existe
if (actionBarClickHandler) {
  actionBar.removeEventListener('click', actionBarClickHandler);
}

// Crear nuevo listener
actionBarClickHandler = (e) => {
  const target = e.target.closest('button');
  if (!target) return;
  
  const btnId = target.getAttribute('id');
  if (!btnId) return;
  
  if (btnId === 'action-btn-view-selected') {
    e.preventDefault();
    e.stopPropagation();
    
    selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
    
    if (tableInstance && tableInstance.update) {
      if (selectionState.viewSelectedActive) {
        const filteredRows = usuariosDataOriginal.filter((row) => 
          selectionState.selectedRowIds.has(row.id)
        );
        tableInstance.update({ rows: filteredRows });
      } else {
        tableInstance.update({ rows: usuariosDataOriginal });
      }
    }
    
    renderActionBar(container); // Re-renderizar actualiza el listener
  }
};

// Agregar listener después de cada re-renderizado
actionBar.addEventListener('click', actionBarClickHandler);
```

**Verificación:**
- Siempre remover listener anterior antes de agregar uno nuevo
- Agregar listener después de cada `innerHTML = buttonsHTML`
- Usar logs para verificar que el listener se está agregando correctamente

---

## 📝 REGLA DE ORO

**SIEMPRE que un DataTable tenga `showCheckbox: true`:**

1. ✅ **Implementar Action Bar obligatoriamente**
2. ✅ **Rastrear selecciones con estado `selectionState`**
3. ✅ **Interceptar checkboxes individuales y header checkbox**
4. ✅ **Implementar funcionalidad "Ver seleccionados"**
5. ✅ **Preservar Action Bar durante re-renderizados con MutationObserver**
6. ✅ **Mostrar acciones individuales (1 fila) y grupales (2+ filas)**

---

## 🔗 Referencias

- **Storybook DataTable:** `vendor/ubits/packages/storybook/stories/DataTable.stories.ts` (líneas 1660-1880)
- **CSS Action Bar:** `vendor/ubits/packages/components/data-table/src/styles/data-table.css` (líneas 19-27)
- **Análisis de error header checkbox:** `docs/guias/analisis/ANALISIS-ERROR-HEADER-CHECKBOX-DATATABLE.md`
- **Errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

---

- **Problemas de implementación:** `docs/guias/analisis/ANALISIS-ERROR-ACTION-BAR-DATATABLE-PROBLEMAS-IMPLEMENTACION.md` ⭐ **OBLIGATORIO LEER** (problemas encontrados y soluciones)

---

---

## 📝 NOTAS IMPORTANTES

### **1. Mantener Referencia a Datos Originales**

**⚠️ CRÍTICO:** Siempre mantener `usuariosDataOriginal` con todos los datos originales:

```javascript
// Al inicializar
usuariosData = [/* datos iniciales */];
usuariosDataOriginal = [...usuariosData]; // Guardar copia

// Al reordenar, actualizar ambos
usuariosData = reorderedData;
usuariosDataOriginal = [...reorderedData]; // Mantener sincronizado
```

### **2. Remover y Re-agregar Listeners**

**⚠️ CRÍTICO:** Siempre remover listener anterior antes de agregar uno nuevo:

```javascript
if (actionBarClickHandler) {
  actionBar.removeEventListener('click', actionBarClickHandler);
}
actionBarClickHandler = (e) => { /* ... */ };
actionBar.addEventListener('click', actionBarClickHandler);
```

### **3. Verificar Estilos del Componente Original**

**⚠️ CRÍTICO:** Siempre consultar `vendor/ubits/packages/components/data-table/src/styles/data-table.css` para verificar estilos exactos:
- NO agregar `border-bottom` (no existe en el componente original)
- Usar `gap: var(--ubits-spacing-xs)` (4px, NO 8px)
- Usar `padding: var(--ubits-spacing-sm) 0` (8px arriba/abajo, 0px lados)

### **4. Formato Correcto de Iconos FontAwesome**

**⚠️ CRÍTICO:** Usar formato correcto: `fa-regular fa-icon-name` o `fa-solid fa-icon-name`:
```javascript
const iconClass = (icon, style = 'regular') => {
  const stylePrefix = style === 'solid' ? 'fa-solid' : 'fa-regular';
  return `${stylePrefix} fa-${icon}`; // "fa-regular fa-bell"
};
```

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.2.0 (Agregados errores 5-8: border-bottom, iconos, datos originales, listeners)

