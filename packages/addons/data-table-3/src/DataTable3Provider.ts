import type { DataTable3Options, TableColumn3, TableRow3, ColumnType3 } from './types/DataTable3Options';
import { renderCheckbox } from '../../checkbox/src/CheckboxProvider';
import { renderProgressBar } from '../../progress/src/ProgressProvider';
import { renderStatusTag } from '../../status-tag/src/StatusTagProvider';
import { renderAvatar } from '../../avatar/src/AvatarProvider';
import { renderToggle } from '../../toggle/src/ToggleProvider';
import { renderRadioButton } from '../../radio-button/src/RadioButtonProvider';
import { renderButton } from '../../button/src/ButtonProvider';

/**
 * Renderiza una celda según el tipo de columna
 */
function renderCellByType(column: TableColumn3, row: TableRow3, columnType: ColumnType3): string {
  const cellValue = row.data[column.id];
  const cellData = row.data;
  
  switch (columnType) {
    case 'nombre': {
      // Puede ser: solo texto, texto+avatar, texto+avatar+texto complementario
      const nombre = cellValue || cellData.nombre || '';
      const avatar = cellData.avatar || cellData.avatarUrl || null;
      const complementario = cellData.nombreComplementario || cellData.complementario || '';
      
      if (avatar) {
        const avatarHTML = renderAvatar({
          imageUrl: avatar,
          size: 'sm'
        });
        return `
          <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
            ${avatarHTML}
            <div>
              <div class="ubits-body-md-regular">${nombre}</div>
              ${complementario ? `<div class="ubits-body-sm-regular" style="color: var(--ubits-body-md-regular-3, #6b7280);">${complementario}</div>` : ''}
            </div>
          </div>
        `;
      }
      return `<span class="ubits-body-md-regular">${nombre}</span>`;
    }
    
    case 'progreso': {
      // Obtener el valor de progreso (puede estar en cellValue, cellData.progress o cellData.progreso)
      let progressValue: number | null = null;
      
      // Primero intentar desde cellValue (valor directo de la celda)
      if (cellValue !== undefined && cellValue !== null) {
        if (typeof cellValue === 'number') {
          progressValue = cellValue;
        } else if (typeof cellValue === 'string') {
          // Intentar parsear el string (puede ser "75", "75%", etc.)
          const parsed = parseFloat(cellValue.replace('%', '').trim());
          if (!isNaN(parsed)) {
            progressValue = parsed;
          }
        }
      }
      
      // Si no hay valor válido, buscar en las propiedades de datos
      if (progressValue === null && cellData) {
        // Buscar en 'progress' (inglés) o 'progreso' (español)
        const progressProp = cellData.progress !== undefined ? cellData.progress : cellData.progreso;
        if (progressProp !== undefined && progressProp !== null) {
          if (typeof progressProp === 'number') {
            progressValue = progressProp;
          } else if (typeof progressProp === 'string') {
            const parsed = parseFloat(progressProp.replace('%', '').trim());
            if (!isNaN(parsed)) {
              progressValue = parsed;
            }
          }
        }
      }
      
      // Si no hay valor, usar 50% por defecto
      if (progressValue === null) {
        progressValue = 50;
      }
      
      // Asegurar que el valor esté entre 0 y 100
      progressValue = Math.max(0, Math.min(100, progressValue));
      
      // Renderizar el componente ProgressBar completo
      const progressBarHTML = renderProgressBar({
        value: progressValue,
        size: 'sm',
        variant: 'default',
        indicator: `${Math.round(progressValue)}%`
      });
      
      return progressBarHTML;
    }
    
    case 'nombre-avatar': {
      // Siempre mostrar nombre + avatar (obligatorio)
      const nombre = cellValue || cellData.nombre || cellData.name || '';
      const avatar = cellData.avatar || cellData.avatarUrl || null;
      
      // Obtener la variante del avatar desde la columna o usar por defecto
      const avatarVariant = column.avatarVariant || 'initials';
      
      // Generar iniciales del nombre si es necesario
      const generateInitials = (name: string): string => {
        return name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'U';
      };
      
      let avatarHTML = '';
      
      // Renderizar según la variante especificada
      if (avatarVariant === 'photo') {
        // Variante Photo: usar imageUrl si está disponible
        let imageUrl = null;
        
        // Buscar imageUrl en diferentes lugares
        if (avatar && typeof avatar === 'string') {
          imageUrl = avatar;
        } else if (avatar && typeof avatar === 'object') {
          imageUrl = avatar.imageUrl || avatar.url || null;
        }
        
        // También buscar en cellData por si está en otro lugar
        if (!imageUrl && cellData) {
          imageUrl = cellData.imageUrl || cellData.avatarUrl || cellData.avatarImage || null;
        }
        
        // Si hay imageUrl, usar foto
        if (imageUrl) {
          avatarHTML = renderAvatar({
            imageUrl: imageUrl,
            badgeColor: avatar && typeof avatar === 'object' ? avatar.badgeColor : undefined,
            badgeContent: avatar && typeof avatar === 'object' ? avatar.badgeContent : undefined,
            size: 'sm'
          });
        } else {
          // Si no hay imagen, usar imagen por defecto
          avatarHTML = renderAvatar({
            imageUrl: '../assets/images/Profile-image.jpg',
            size: 'sm'
          });
        }
      } else if (avatarVariant === 'initials') {
        // Variante Initials: usar initials si están disponibles, sino generarlas del nombre
        if (avatar && typeof avatar === 'object' && avatar.initials) {
          avatarHTML = renderAvatar({
            initials: avatar.initials,
            badgeColor: avatar.badgeColor,
            badgeContent: avatar.badgeContent,
            size: 'sm'
          });
        } else {
          const initials = generateInitials(nombre);
          avatarHTML = renderAvatar({
            initials: initials,
            size: 'sm'
          });
        }
      } else {
        // Variante Icon: usar icon si está disponible, sino usar 'user' por defecto
        const iconName = avatar && typeof avatar === 'object' && avatar.icon 
          ? avatar.icon 
          : 'user';
        avatarHTML = renderAvatar({
          icon: iconName,
          badgeColor: avatar && typeof avatar === 'object' ? avatar.badgeColor : undefined,
          badgeContent: avatar && typeof avatar === 'object' ? avatar.badgeContent : undefined,
          size: 'sm'
        });
      }
      
      return `
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${avatarHTML}
          <span class="ubits-body-md-regular">${nombre}</span>
        </div>
      `;
    }
    
    case 'estado': {
      const estado = cellValue || 'pending';
      const statusMap: Record<string, any> = {
        'activo': 'success',
        'inactivo': 'pending',
        'pendiente': 'pending',
        'completado': 'completed',
        'error': 'error',
        'cancelado': 'cancelled'
      };
      return renderStatusTag({
        label: String(cellValue || ''),
        status: statusMap[String(estado).toLowerCase()] || 'pending',
        size: 'sm'
      });
    }
    
    case 'radio': {
      const checked = cellValue === true || cellValue === 'true' || cellValue === 1;
      return renderRadioButton({
        label: '',
        name: `radio-${column.id}`,
        value: String(row.id),
        checked,
        size: 'md'
      });
    }
    
    case 'toggle': {
      const checked = cellValue === true || cellValue === 'true' || cellValue === 1;
      return renderToggle({
        label: '',
        checked,
        size: 'md'
      });
    }
    
    case 'checkbox': {
      // Checkbox diferente al fijo (con label en header)
      const checked = cellValue === true || cellValue === 'true' || cellValue === 1;
      return renderCheckbox({
        label: '',
        checked,
        size: 'md'
      });
    }
    
    case 'correo': {
      const email = cellValue || '';
      return `<a href="mailto:${email}" class="ubits-body-md-regular" style="color: var(--ubits-accent-brand, #0c5bef); text-decoration: none;">${email}</a>`;
    }
    
    case 'acciones': {
      const actionText = cellValue || 'Acción';
      return renderButton({
        text: actionText,
        variant: 'tertiary',
        size: 'sm',
        className: 'ubits-data-table-3__action-button'
      });
    }
    
    case 'fecha': {
      const fecha = cellValue || '';
      // Formatear fecha si es necesario
      return `<span class="ubits-body-md-regular">${fecha}</span>`;
    }
    
    case 'area':
    case 'lider':
    case 'pais':
    case 'ciudad': {
      return `<span class="ubits-body-md-regular">${cellValue || ''}</span>`;
    }
    
    default:
      return `<span class="ubits-body-md-regular">${cellValue || ''}</span>`;
  }
}

/**
 * Renderiza una celda de la tabla
 */
function renderCell(column: TableColumn3, row: TableRow3): string {
  // Si la columna es de tipo checkbox fijo (columna especial), renderizar checkbox
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
  
  // Si la columna tiene un tipo definido, usar renderCellByType
  if (column.type) {
    const content = renderCellByType(column, row, column.type);
    return `
      <td class="ubits-data-table-3__cell ubits-data-table-3__cell--${column.type}">
        ${content}
      </td>
    `;
  }
  
  // Renderizado normal para otras columnas (usar renderCell personalizado si existe)
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
function renderColumnHeader(
  column: TableColumn3, 
  columnReorderable: boolean = false,
  columnSortable: boolean = true,
  rows: TableRow3[] = [],
  sortColumnId: string | null = null,
  sortDirection: 'asc' | 'desc' | null = null
): string {
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

  // Botón de ordenamiento (solo para columnas que no sean checkbox y si columnSortable está habilitado)
  const sortButton = !isCheckboxColumn && columnSortable ? (() => {
    const isSorted = sortColumnId === column.id;
    const showAscIcon = isSorted && sortDirection === 'asc';
    const showDescIcon = isSorted && sortDirection === 'desc';
    
    let sortIconHTML = '';
    if (showAscIcon) {
      sortIconHTML = `
        <wa-icon name="arrow-up-a-z"></wa-icon>
        <i class="fas fa-sort-up ubits-data-table-3__sort-icon-fallback" aria-hidden="true"></i>
      `;
    } else if (showDescIcon) {
      sortIconHTML = `
        <wa-icon name="arrow-down-z-a"></wa-icon>
        <i class="fas fa-sort-down ubits-data-table-3__sort-icon-fallback" aria-hidden="true"></i>
      `;
    } else {
      sortIconHTML = `
        <wa-icon name="arrow-up-a-z" style="opacity: 0.3;"></wa-icon>
        <i class="far fa-sort ubits-data-table-3__sort-icon-fallback" aria-hidden="true"></i>
      `;
    }
    
    return `
      <button
        type="button"
        class="ubits-data-table-3__column-sort ${isSorted ? 'ubits-data-table-3__column-sort--active' : ''}"
        aria-label="Ordenar ${column.title}"
        data-column-id="${column.id}"
        data-sort-button="true"
      >
        ${sortIconHTML}
      </button>
    `;
  })() : '';

  const headerContent = `
    <div class="ubits-data-table-3__column-header-content">
      ${dragHandle}
      <span class="ubits-data-table-3__column-title">${column.title}</span>
      ${sortButton}
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
function renderRow(row: TableRow3, columns: TableColumn3[], rowIndex: number, rowReorderable: boolean = false, rowExpandable: boolean = true, hasControls: boolean = false): string {
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
  // Solo renderizar la columna de controles si hay al menos un control visible
  const controlsCell = hasControls ? `
      <td class="ubits-data-table-3__controls-column">
        <div class="ubits-data-table-3__controls-wrapper">
          ${dragHandle}
          ${expandIcon}
        </div>
      </td>
  ` : '';
  
  let rowHTML = `
    <tr class="${rowClasses}" data-row-id="${row.id}">
      ${controlsCell}
      ${cellsHTML}
    </tr>
  `;

  // Si la fila está expandida, agregar la fila de contenido expandido
  if (isExpanded && row.renderExpandedContent) {
    const expandedContent = row.renderExpandedContent(row.data);
    const colspan = visibleColumns.length + (hasControls ? 1 : 0);
    rowHTML += `
      <tr class="ubits-data-table-3__row-expanded-row">
        <td class="ubits-data-table-3__row-expanded-content" colspan="${colspan}">
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
  const { columns, rows, className = '', columnReorderable = false, columnSortable = true, rowReorderable = false, rowExpandable = true } = options;

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
  
  // Estado de ordenamiento
  const sortColumnId = (options as any).sortColumnId || null;
  const sortDirection = (options as any).sortDirection || null;
  
  // Si hay un orden de filas especificado, reordenar según ese orden
  let orderedRows = [...rows];
  if (rowOrder.length > 0) {
    const rowMap = new Map(rows.map(row => [row.id, row]));
    orderedRows = rowOrder
      .map(id => rowMap.get(id))
      .filter((row): row is TableRow3 => row !== undefined)
      .concat(rows.filter(row => !rowOrder.includes(row.id)));
  }
  
  // Aplicar ordenamiento si hay una columna ordenada
  if (sortColumnId && sortDirection) {
    orderedRows = [...orderedRows].sort((a, b) => {
      const aValue = a.data[sortColumnId];
      const bValue = b.data[sortColumnId];
      
      // Manejar valores nulos/undefined
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      // Convertir a string para comparación
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      let comparison = 0;
      if (aStr < bStr) {
        comparison = -1;
      } else if (aStr > bStr) {
        comparison = 1;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  // Determinar si hay controles en las filas
  const hasControls = rowReorderable || rowExpandable;

  // Renderizar headers de columnas
  const columnHeadersHTML = visibleColumns
    .map(col => renderColumnHeader(col, columnReorderable, columnSortable, orderedRows, sortColumnId, sortDirection))
    .join('');

  // Renderizar filas
  const rowsHTML = orderedRows
    .map((row, index) => renderRow(row, visibleColumns, index, rowReorderable, rowExpandable, hasControls))
    .join('');

  const classes = [
    'ubits-data-table-3',
    className
  ].filter(Boolean).join(' ');

  // Solo renderizar la columna de controles en el header si hay controles en las filas
  const controlsHeader = hasControls ? `
          <th class="ubits-data-table-3__controls-column-header">
          </th>
  ` : '';
  
  // Estructura sin contenedor adicional: la tabla directamente
  const html = `
    <table class="${classes} ubits-data-table-3__table">
      <thead class="ubits-data-table-3__thead">
        <tr class="ubits-data-table-3__header-row">
          ${controlsHeader}
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
  
  // Estado de ordenamiento
  let sortColumnId: string | null = null;
  let sortDirection: 'asc' | 'desc' | null = null;

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
    const newHTML = renderDataTable3(
      { ...currentOptions, sortColumnId, sortDirection } as any, 
      columnOrder, 
      rowOrder
    );
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
              // Verificar si la columna de destino es checkbox (no permitir drop sobre checkbox)
              const isTargetCheckbox = columnId === 'checkbox' || columnId.startsWith('checkbox-');
              const isDraggedCheckbox = draggedColumnId === 'checkbox' || draggedColumnId.startsWith('checkbox-');
              
              // No permitir hacer drop sobre la columna de checkbox
              if (isTargetCheckbox) {
                return; // No permitir el drop sobre checkbox
              }
              
              // No permitir arrastrar columnas antes de la columna de checkbox
              if (!isDraggedCheckbox) {
                // Encontrar el índice de la columna de checkbox
                const checkboxColumnIndex = columnOrder.findIndex(id => id === 'checkbox' || id.startsWith('checkbox-'));
                if (checkboxColumnIndex !== -1) {
                  const targetIndex = columnOrder.indexOf(columnId);
                  // No permitir drop si la posición objetivo está antes de la columna de checkbox
                  if (targetIndex < checkboxColumnIndex) {
                    return; // No permitir el drop antes de checkbox
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
              console.log('🚫 No se puede arrastrar la columna de checkbox');
              return;
            }
            
            // No permitir hacer drop sobre la columna de checkbox
            if (isTargetCheckbox) {
              console.log('🚫 No se puede hacer drop sobre la columna de checkbox');
              return;
            }
            
            if (draggedColumnId !== columnId) {
              const currentIndex = columnOrder.indexOf(draggedColumnId);
              const targetIndex = columnOrder.indexOf(columnId);
              
              // Encontrar el índice de la columna de checkbox en el orden actual
              const checkboxColumnIndex = columnOrder.findIndex(id => id === 'checkbox' || id.startsWith('checkbox-'));
              
              console.log('📊 Reordenamiento:', {
                dragged: draggedColumnId,
                target: columnId,
                currentIndex,
                targetIndex,
                checkboxIndex: checkboxColumnIndex,
                columnOrder: [...columnOrder]
              });
              
              // Si no hay columna de checkbox, permitir el movimiento
              if (checkboxColumnIndex === -1) {
                if (currentIndex !== -1 && targetIndex !== -1) {
                  columnOrder.splice(currentIndex, 1);
                  columnOrder.splice(targetIndex, 0, draggedColumnId);
                  
                  if (currentOptions.onColumnReorder) {
                    currentOptions.onColumnReorder([...columnOrder]);
                  }
                  
                  render();
                }
                return;
              }
              
              // No permitir mover columnas antes de la columna de checkbox
              // La validación debe ser: targetIndex NO puede ser menor que checkboxColumnIndex
              if (targetIndex < checkboxColumnIndex) {
                console.log('🚫 No se puede mover columna antes de la columna de checkbox');
                return;
              }
              
              // Validar: si estamos moviendo desde después de checkbox, no permitir mover antes de checkbox
              if (currentIndex > checkboxColumnIndex && targetIndex < checkboxColumnIndex) {
                console.log('🚫 No se puede mover columna desde después de checkbox hacia antes de checkbox');
                return;
              }
              
              if (currentIndex !== -1 && targetIndex !== -1) {
                // Calcular el nuevo orden SIN incluir la checkbox en el reordenamiento
                const newOrder = [...columnOrder];
                newOrder.splice(currentIndex, 1);
                newOrder.splice(targetIndex, 0, draggedColumnId);
                
                // Verificar que la checkbox sigue en su posición correcta o después
                const newCheckboxIndex = newOrder.findIndex(id => id === 'checkbox' || id.startsWith('checkbox-'));
                if (newCheckboxIndex !== -1 && newCheckboxIndex < checkboxColumnIndex) {
                  console.log('🚫 El reordenamiento movería la checkbox a una posición incorrecta');
                  return;
                }
                
                columnOrder = newOrder;
                
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
    
    // Botones de ordenamiento
    const sortButtons = element.querySelectorAll('[data-sort-button="true"]');
    sortButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const columnId = button.getAttribute('data-column-id')!;
        
        // Si ya está ordenando esta columna, cambiar dirección
        if (sortColumnId === columnId) {
          sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          // Nueva columna, empezar con asc
          sortColumnId = columnId;
          sortDirection = 'asc';
        }
        
        if (currentOptions.onSort) {
          currentOptions.onSort(columnId, sortDirection!);
        }
        
        render();
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

