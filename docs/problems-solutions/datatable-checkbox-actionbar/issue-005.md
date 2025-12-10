# Problema: Checkboxes del DataTable no funcionan con Action Bar

## 📋 Contexto

Al implementar el DataTable con checkboxes (`showCheckbox: true`) y el Action Bar en el módulo de encuestas, se encontraron varios problemas:

1. **Checkboxes no se seleccionan visualmente** cuando el usuario hace click
2. **Action Bar no aparece** cuando hay selecciones
3. **Estado de selección se pierde** entre renders
4. **Header del DataTable no existe**, por lo que el Action Bar no se puede insertar después del header

## 🔍 Síntomas

- Usuario reporta: "no puedo seleccionar nada con el checkbox"
- Logs muestran: "⚠️ Header del DataTable no encontrado en renderActionBar"
- Logs muestran: "🔵 Ocultando Action Bar (no hay selecciones)" incluso cuando hay selecciones
- Los checkboxes no se marcan visualmente al hacer click

## 🐛 Código Problemático

### Problema 1: Header no encontrado

```javascript
// ❌ PROBLEMA: Busca header que no existe
let header = container.querySelector('.ubits-data-table__header');
if (!header) {
  console.warn('⚠️ Header del DataTable no encontrado');
  return; // ❌ Sale sin insertar Action Bar
}
```

### Problema 2: Estado local se pierde

```javascript
// ❌ PROBLEMA: Estado local se pierde entre renders
function initActionBar(containerId, rowsData, dataTableInstance) {
  const selectionState = {
    selectedRowIds: new Set(),
    viewSelectedActive: false
  }; // ❌ Se crea nuevo estado cada vez
}
```

### Problema 3: Checkbox dentro de label

```javascript
// ❌ PROBLEMA: No detecta checkbox dentro de label
const checkboxInput = target; // ❌ target puede ser el label, no el input
if (checkboxInput.checked) { // ❌ No funciona si target es label
  // ...
}
```

## ✅ Solución Implementada

### Solución 1: Insertar Action Bar sin header

```javascript
// ✅ SOLUCIÓN: Buscar alternativas si no hay header
let insertAfterElement = header;

if (!header) {
  // Buscar scrollable container dentro del DataTable
  if (dataTable) {
    const scrollableContainer = dataTable.querySelector('.ubits-data-table__scrollable-container');
    if (scrollableContainer) {
      insertAfterElement = scrollableContainer;
      console.log('✅ Usando scrollable container como referencia');
    } else {
      insertAfterElement = dataTable;
      console.log('✅ Usando DataTable como referencia');
    }
  }
}

// Insertar antes del scrollable container si no hay header
if (header) {
  insertAfterElement.insertAdjacentElement('afterend', actionBar);
} else {
  insertAfterElement.insertAdjacentElement('beforebegin', actionBar);
}
```

### Solución 2: Estado global persistente

```javascript
// ✅ SOLUCIÓN: Estado global que persiste entre renders
window.encuestasSelectionState = window.encuestasSelectionState || {
  selectedRowIds: new Set(),
  viewSelectedActive: false
};
const selectionState = window.encuestasSelectionState;

// Usar siempre el estado global
const currentState = window.encuestasSelectionState || selectionState;
```

### Solución 3: Detectar checkbox dentro de label

```javascript
// ✅ SOLUCIÓN: Buscar input dentro del label
let checkboxInput = target;

if (target.tagName === 'LABEL' || target.closest('.ubits-checkbox')) {
  checkboxInput = target.querySelector('input[type="checkbox"]') || 
                  target.closest('.ubits-checkbox')?.querySelector('input[type="checkbox"]');
  
  if (!checkboxInput) {
    console.warn('⚠️ No se encontró input checkbox dentro del label');
    return;
  }
}

// Verificar estado después de un delay para que el componente actualice
setTimeout(() => {
  const currentChecked = checkboxInput.checked;
  // Procesar selección...
}, 100);
```

## 📚 Lecciones Aprendidas

1. **Siempre verificar estructura del componente**: El DataTable puede no tener header si no se configura `title` o `showTitle`
2. **Usar estado global para persistencia**: El estado local se pierde entre renders del Action Bar
3. **Checkboxes UBITS están dentro de labels**: Siempre buscar el `input` dentro del `label`
4. **Esperar actualización del estado**: El componente Checkbox puede actualizar el estado después del evento, usar `setTimeout` si es necesario

## 🔗 Referencias

- `docs/guias/implementacion/GUIA-ACTION-BAR-DATATABLE.md`
- `vendor/ubits/packages/components/checkbox/src/CheckboxProvider.ts`
- `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts`




