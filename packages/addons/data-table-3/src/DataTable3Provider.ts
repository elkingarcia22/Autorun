import type { DataTable3Options, TableColumn3, TableRow3 } from './types/DataTable3Options';
import { renderCheckbox } from '../../checkbox/src/CheckboxProvider';

/**
 * Renderiza una celda de la tabla
 */
function renderCell(column: TableColumn3, row: TableRow3): string {
  // Si la columna es de tipo checkbox, renderizar checkbox
  if (column.id === 'checkbox' || column.id.startsWith('checkbox-')) {
    const checkboxValue = row.data[column.id] || false;
    const checkboxHTML = renderCheckbox({
      label: '',
      checked: checkboxValue,
      size: 'md',
      className: 'ubits-data-table-3__cell-checkbox'
    });
    
    const checkbox = checkboxHTML.replace(
      '<input',
      `<input data-row-id="${row.id}" data-column-id="${column.id}" aria-label="Checkbox ${column.title}"`
    );
    
    return `
      <td class="ubits-data-table-3__cell ubits-data-table-3__cell--checkbox">
        ${checkbox}
      </td>
    `;
  }
  
  // Renderizado normal para otras columnas
  const content = column.renderCell 
    ? column.renderCell(row.data)
    : row.data[column.id] || '';
  
  return `
    <td class="ubits-data-table-3__cell">
      ${content}
    </td>
  `;
}

/**
 * Renderiza el header de una columna
 */
function renderColumnHeader(column: TableColumn3, columnReorderable: boolean = false, rows: TableRow3[] = []): string {
  // Si es una columna de checkbox, renderizar solo el checkbox (sin título ni drag handle)
  if (column.id === 'checkbox' || column.id.startsWith('checkbox-')) {
    // Opcional: calcular si todos están seleccionados para el checkbox del header
    const allChecked = rows.length > 0 && rows.every(row => row.data[column.id] === true);
    const someChecked = rows.some(row => row.data[column.id] === true);
    
    const checkboxHTML = renderCheckbox({
      label: '',
      checked: allChecked,
      indeterminate: someChecked && !allChecked,
      size: 'md',
      className: 'ubits-data-table-3__column-checkbox-header'
    });
    
    const checkbox = checkboxHTML.replace(
      '<input',
      `<input data-column-checkbox-header="${column.id}" aria-label="Seleccionar todos ${column.title}"`
    );
    
    return `
      <th 
        class="ubits-data-table-3__column-header ubits-data-table-3__column-header--checkbox" 
        style="${column.width ? `width: ${column.width}px;` : ''}" 
        data-column-id="${column.id}"
      >
        ${checkbox}
      </th>
    `;
  }

  // Para columnas normales, mostrar drag handle y título
  // NO permitir drag & drop si la columna es de tipo checkbox
  const isCheckboxColumn = column.id === 'checkbox' || column.id.startsWith('checkbox-');
  const dragHandle = columnReorderable && !isCheckboxColumn ? `
    <div class="ubits-data-table-3__column-drag-handle" draggable="true" data-column-id="${column.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  ` : '';

  const headerContent = `
    <div class="ubits-data-table-3__column-header-content">
      ${dragHandle}
      <span class="ubits-data-table-3__column-title">${column.title}</span>
    </div>
  `;

  return `
    <th 
      class="ubits-data-table-3__column-header" 
      style="${column.width ? `width: ${column.width}px;` : ''}" 
      data-column-id="${column.id}"
    >
      ${headerContent}
    </th>
  `;
}

/**
 * Renderiza una fila de la tabla
 */
function renderRow(row: TableRow3, columns: TableColumn3[], rowIndex: number, rowReorderable: boolean = false, rowExpandable: boolean = true): string {
  const isExpanded = row.expanded || false;

  // Drag handle para filas
  const dragHandle = rowReorderable ? `
    <div class="ubits-data-table-3__row-drag-handle" draggable="true" data-row-id="${row.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  ` : '';

  // Botón de expandir (solo si rowExpandable es true)
  const expandIcon = rowExpandable ? `
    <button
      type="button"
      class="ubits-data-table-3__row-expand"
      aria-label="${isExpanded ? 'Colapsar' : 'Expandir'} fila"
      data-row-id="${row.id}"
      data-expand-button="true"
    >
      <i class="far fa-chevron-${isExpanded ? 'down' : 'right'}" aria-hidden="true"></i>
    </button>
  ` : '';

  // Filtrar columnas visibles
  const visibleColumns = columns.filter(col => col.visible !== false);
  
  const cellsHTML = visibleColumns
    .map(col => renderCell(col, row))
    .join('');

  const rowClasses = [
    'ubits-data-table-3__row',
    isExpanded ? 'ubits-data-table-3__row--expanded' : ''
  ].filter(Boolean).join(' ');

  // Estructura: Una sola columna de controles con drag handle y expand icon (sin checkbox)
  let rowHTML = `
    <tr class="${rowClasses}" data-row-id="${row.id}">
      <td class="ubits-data-table-3__controls-column">
        <div class="ubits-data-table-3__controls-wrapper">
          ${dragHandle}
          ${expandIcon}
        </div>
      </td>
      ${cellsHTML}
    </tr>
  `;

  // Si la fila está expandida, agregar la fila de contenido expandido
  if (isExpanded && row.renderExpandedContent) {
    const expandedContent = row.renderExpandedContent(row.data);
    rowHTML += `
      <tr class="ubits-data-table-3__row-expanded-row">
        <td class="ubits-data-table-3__row-expanded-content" colspan="${visibleColumns.length + 1}">
          ${expandedContent}
        </td>
      </tr>
    `;
  }

  return rowHTML;
}


/**
 * Renderiza el HTML de un Data Table 3
 */
export function renderDataTable3(
  options: DataTable3Options,
  columnOrder: string[] = [],
  rowOrder: (string | number)[] = []
): string {
  const { columns, rows, className = '', columnReorderable = false, rowReorderable = false, rowExpandable = true } = options;

  // Filtrar columnas visibles
  let visibleColumns = columns.filter(col => col.visible !== false);
  
  // Si hay un orden de columnas especificado, reordenar según ese orden
  if (columnOrder.length > 0) {
    const columnMap = new Map(visibleColumns.map(col => [col.id, col]));
    visibleColumns = columnOrder
      .map(id => columnMap.get(id))
      .filter((col): col is TableColumn3 => col !== undefined)
      .concat(visibleColumns.filter(col => !columnOrder.includes(col.id)));
  }
  
  // Si hay un orden de filas especificado, reordenar según ese orden
  let orderedRows = [...rows];
  if (rowOrder.length > 0) {
    const rowMap = new Map(rows.map(row => [row.id, row]));
    orderedRows = rowOrder
      .map(id => rowMap.get(id))
      .filter((row): row is TableRow3 => row !== undefined)
      .concat(rows.filter(row => !rowOrder.includes(row.id)));
  }

  // Renderizar headers de columnas
  const columnHeadersHTML = visibleColumns
    .map(col => renderColumnHeader(col, columnReorderable, orderedRows))
    .join('');

  // Renderizar filas
  const rowsHTML = orderedRows
    .map((row, index) => renderRow(row, visibleColumns, index, rowReorderable, rowExpandable))
    .join('');

  const classes = [
    'ubits-data-table-3',
    className
  ].filter(Boolean).join(' ');

  // Estructura sin contenedor adicional: la tabla directamente
  const html = `
    <table class="${classes} ubits-data-table-3__table">
      <thead class="ubits-data-table-3__thead">
        <tr class="ubits-data-table-3__header-row">
          <th class="ubits-data-table-3__controls-column-header">
          </th>
          ${columnHeadersHTML}
        </tr>
      </thead>
      <tbody class="ubits-data-table-3__tbody">
        ${rowsHTML}
      </tbody>
    </table>
  `.trim();

  return html;
}

/**
 * Crea un elemento Data Table 3 programáticamente
 */
export function createDataTable3(options: DataTable3Options): {
  element: HTMLElement;
  destroy: () => void;
  update: (newOptions: Partial<DataTable3Options>) => void;
} {
  const container = options.containerId 
    ? document.getElementById(options.containerId)
    : document.body;

  if (!container) {
    throw new Error(`Container with id "${options.containerId}" not found`);
  }

  const tableHTML = renderDataTable3(options);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = tableHTML.trim();
  const element = tempDiv.firstElementChild as HTMLElement;

  if (!element) {
    throw new Error('Failed to create data table 3 element');
  }

  container.appendChild(element);

  // Estado interno
  let currentOptions = { ...options };
  
  // Orden de columnas
  let columnOrder: string[] = currentOptions.columns
    .filter(col => col.visible !== false)
    .map(col => col.id);
  
  // Orden de filas
  let rowOrder: (string | number)[] = currentOptions.rows.map(row => row.id);

  // Variables para drag & drop
  let draggedColumnId: string | null = null;
  let draggedRowId: string | number | null = null;

  // Función para inicializar fallback de iconos
  const initializeIconFallbacks = () => {
    const waIcons = element.querySelectorAll('wa-icon');
    waIcons.forEach(waIcon => {
      const faIcon = waIcon.nextElementSibling as HTMLElement;
      if (faIcon && faIcon.tagName === 'I') {
        if (customElements.get('wa-icon')) {
          waIcon.style.display = '';
          faIcon.style.display = 'none';
        } else {
          waIcon.style.display = 'none';
          faIcon.style.display = '';
        }
      }
    });
  };

  // Función para renderizar
  const render = () => {
    const newHTML = renderDataTable3(currentOptions, columnOrder, rowOrder);
    element.innerHTML = newHTML.trim();
    attachEventListeners();
    initializeIconFallbacks();
  };
  
  // Función para adjuntar event listeners
  const attachEventListeners = () => {
    // Drag & Drop de columnas
    if (currentOptions.columnReorderable) {
      if (!element.hasAttribute('data-column-drag-listener')) {
        element.setAttribute('data-column-drag-listener', 'true');
        
        element.addEventListener('dragstart', (e) => {
          const target = e.target as HTMLElement;
          const dragHandle = target.closest('.ubits-data-table-3__column-drag-handle');
          if (dragHandle) {
            draggedColumnId = dragHandle.getAttribute('data-column-id');
            if (draggedColumnId) {
              e.dataTransfer!.effectAllowed = 'move';
              e.dataTransfer!.setData('text/plain', draggedColumnId);
              const header = dragHandle.closest('.ubits-data-table-3__column-header');
              if (header) {
                header.classList.add('ubits-data-table-3__column-header--dragging');
              }
            }
          }
        }, true);
        
        element.addEventListener('dragend', (e) => {
          const target = e.target as HTMLElement;
          const dragHandle = target.closest('.ubits-data-table-3__column-drag-handle');
          if (dragHandle) {
            const header = dragHandle.closest('.ubits-data-table-3__column-header');
            if (header) {
              header.classList.remove('ubits-data-table-3__column-header--dragging');
            }
          }
          draggedColumnId = null;
        }, true);
        
        element.addEventListener('dragover', (e) => {
          const target = e.target as HTMLElement;
          const header = target.closest('.ubits-data-table-3__column-header');
          if (header && draggedColumnId) {
            const columnId = header.getAttribute('data-column-id');
            if (columnId && columnId !== draggedColumnId) {
              // Verificar si la columna de destino es checkbox (no permitir drop antes de checkbox)
              const isTargetCheckbox = columnId === 'checkbox' || columnId.startsWith('checkbox-');
              const isDraggedCheckbox = draggedColumnId === 'checkbox' || draggedColumnId.startsWith('checkbox-');
              
              // No permitir arrastrar columnas antes de la columna de checkbox
              if (!isDraggedCheckbox && !isTargetCheckbox) {
                // Encontrar el índice de la columna de checkbox
                const checkboxColumnIndex = columnOrder.findIndex(id => id === 'checkbox' || id.startsWith('checkbox-'));
                if (checkboxColumnIndex !== -1) {
                  const targetIndex = columnOrder.indexOf(columnId);
                  // No permitir drop si la posición objetivo está antes de la columna de checkbox
                  if (targetIndex < checkboxColumnIndex) {
                    return; // No permitir el drop
                  }
                }
              }
              
              e.preventDefault();
              e.dataTransfer!.dropEffect = 'move';
              header.classList.add('ubits-data-table-3__column-header--drag-over');
            }
          }
        }, true);
        
        element.addEventListener('dragleave', (e) => {
          const target = e.target as HTMLElement;
          const header = target.closest('.ubits-data-table-3__column-header');
          if (header) {
            header.classList.remove('ubits-data-table-3__column-header--drag-over');
          }
        }, true);
        
        element.addEventListener('drop', (e) => {
          const target = e.target as HTMLElement;
          const header = target.closest('.ubits-data-table-3__column-header');
          if (header) {
            e.preventDefault();
            header.classList.remove('ubits-data-table-3__column-header--drag-over');
            
            const columnId = header.getAttribute('data-column-id');
            if (!columnId || !draggedColumnId) return;
            
            // Verificar si alguna de las columnas es checkbox
            const isDraggedCheckbox = draggedColumnId === 'checkbox' || draggedColumnId.startsWith('checkbox-');
            const isTargetCheckbox = columnId === 'checkbox' || columnId.startsWith('checkbox-');
            
            // No permitir arrastrar la columna de checkbox
            if (isDraggedCheckbox) {
              return;
            }
            
            if (draggedColumnId !== columnId) {
              const currentIndex = columnOrder.indexOf(draggedColumnId);
              const targetIndex = columnOrder.indexOf(columnId);
              
              // Encontrar el índice de la columna de checkbox
              const checkboxColumnIndex = columnOrder.findIndex(id => id === 'checkbox' || id.startsWith('checkbox-'));
              
              // No permitir mover columnas antes de la columna de checkbox
              if (checkboxColumnIndex !== -1) {
                // Si la posición objetivo está antes de la columna de checkbox, no permitir
                if (targetIndex < checkboxColumnIndex) {
                  return;
                }
                // Si estamos moviendo desde después de checkbox a antes de checkbox, no permitir
                if (currentIndex > checkboxColumnIndex && targetIndex < checkboxColumnIndex) {
                  return;
                }
              }
              
              if (currentIndex !== -1 && targetIndex !== -1) {
                columnOrder.splice(currentIndex, 1);
                columnOrder.splice(targetIndex, 0, draggedColumnId);
                
                if (currentOptions.onColumnReorder) {
                  currentOptions.onColumnReorder([...columnOrder]);
                }
                
                render();
              }
            }
          }
        }, true);
      }
    }
    
    // Drag & Drop de filas
    if (currentOptions.rowReorderable) {
      if (!element.hasAttribute('data-row-drag-listener')) {
        element.setAttribute('data-row-drag-listener', 'true');
        
        element.addEventListener('dragstart', (e) => {
          const target = e.target as HTMLElement;
          const dragHandle = target.closest('.ubits-data-table-3__row-drag-handle');
          if (!dragHandle) return;
          
          const rowIdStr = dragHandle.getAttribute('data-row-id');
          if (rowIdStr) {
            const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
            draggedRowId = rowId;
            e.dataTransfer!.effectAllowed = 'move';
            e.dataTransfer!.setData('text/plain', String(rowId));
            const row = dragHandle.closest('.ubits-data-table-3__row');
            if (row) {
              row.classList.add('ubits-data-table-3__row--dragging');
            }
          }
        }, true);
        
        element.addEventListener('dragend', (e) => {
          const target = e.target as HTMLElement;
          const dragHandle = target.closest('.ubits-data-table-3__row-drag-handle');
          if (dragHandle) {
            const row = dragHandle.closest('.ubits-data-table-3__row');
            if (row) {
              row.classList.remove('ubits-data-table-3__row--dragging');
            }
          }
          draggedRowId = null;
        }, true);
        
        element.addEventListener('dragover', (e) => {
          const target = e.target as HTMLElement;
          const row = target.closest('.ubits-data-table-3__row');
          if (row && draggedRowId !== null) {
            const rowIdStr = row.getAttribute('data-row-id');
            if (rowIdStr) {
              const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
              if (rowId !== draggedRowId) {
                e.preventDefault();
                e.dataTransfer!.dropEffect = 'move';
                row.classList.add('ubits-data-table-3__row--drag-over');
              }
            }
          }
        }, true);
        
        element.addEventListener('dragleave', (e) => {
          const target = e.target as HTMLElement;
          const row = target.closest('.ubits-data-table-3__row');
          if (row) {
            row.classList.remove('ubits-data-table-3__row--drag-over');
          }
        }, true);
        
        element.addEventListener('drop', (e) => {
          const target = e.target as HTMLElement;
          const row = target.closest('.ubits-data-table-3__row');
          if (row) {
            e.preventDefault();
            row.classList.remove('ubits-data-table-3__row--drag-over');
            
            const rowIdStr = row.getAttribute('data-row-id');
            if (!rowIdStr || !draggedRowId) return;
            
            const targetRowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
            const droppedRowId = e.dataTransfer!.getData('text/plain');
            
            if (droppedRowId && String(targetRowId) !== droppedRowId) {
              const droppedId = isNaN(Number(droppedRowId)) ? droppedRowId : Number(droppedRowId);
              const currentIndex = rowOrder.indexOf(droppedId);
              const targetIndex = rowOrder.indexOf(targetRowId);
              
              if (currentIndex !== -1 && targetIndex !== -1) {
                rowOrder.splice(currentIndex, 1);
                rowOrder.splice(targetIndex, 0, droppedId);
                
                if (currentOptions.onRowReorder) {
                  currentOptions.onRowReorder([...rowOrder]);
                }
                
                render();
              }
            }
          }
        }, true);
      }
    }
    
    // Checkboxes de columnas de datos (checkboxes normales en las celdas con data-column-id)
    const cellCheckboxes = element.querySelectorAll('input[data-column-id]');
    cellCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const input = e.target as HTMLInputElement;
        const rowIdStr = input.getAttribute('data-row-id')!;
        const columnId = input.getAttribute('data-column-id')!;
        const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
        const isChecked = input.checked;
        
        const row = currentOptions.rows.find(r => r.id === rowId);
        if (row) {
          row.data[columnId] = isChecked;
        }
        
        render();
      });
    });

    // Checkboxes de header de columnas de checkbox (para seleccionar todos en esa columna)
    const columnCheckboxHeaders = element.querySelectorAll('input[data-column-checkbox-header]');
    columnCheckboxHeaders.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const input = e.target as HTMLInputElement;
        const columnId = input.getAttribute('data-column-checkbox-header')!;
        const isChecked = input.checked;
        
        // Actualizar todos los checkboxes de esa columna en todas las filas
        currentOptions.rows.forEach(row => {
          row.data[columnId] = isChecked;
        });
        
        render();
      });
    });

    // Botones de expandir
    const expandButtons = element.querySelectorAll('[data-expand-button="true"]');
    expandButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const rowIdStr = button.getAttribute('data-row-id')!;
        const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
        const row = currentOptions.rows.find(r => r.id === rowId);
        
        if (row) {
          const wasExpanded = row.expanded || false;
          row.expanded = !wasExpanded;
          
          if (currentOptions.onRowExpand) {
            currentOptions.onRowExpand(rowId, row.expanded);
          }
          
          render();
        }
      });
    });
  };

  // Llamar render inicial
  render();

  // Función de actualización
  const update = (newOptions: Partial<DataTable3Options>) => {
    currentOptions = { ...currentOptions, ...newOptions };
    if (newOptions.columns) {
      columnOrder = newOptions.columns
        .filter(col => col.visible !== false)
        .map(col => col.id);
    }
    if (newOptions.rows) {
      rowOrder = newOptions.rows.map(row => row.id);
    }
    render();
  };

  // Función de destrucción
  const destroy = () => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  return {
    element,
    destroy,
    update
  };
}

