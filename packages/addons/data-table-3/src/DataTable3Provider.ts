import type { DataTable3Options, TableColumn3, TableRow3, ColumnType3 } from './types/DataTable3Options';
import { renderCheckbox } from '../../checkbox/src/CheckboxProvider';
import { renderProgressBar } from '../../progress/src/ProgressProvider';
import { renderStatusTag } from '../../status-tag/src/StatusTagProvider';
import { renderAvatar } from '../../avatar/src/AvatarProvider';
import { renderToggle } from '../../toggle/src/ToggleProvider';
import { renderRadioButton } from '../../radio-button/src/RadioButtonProvider';
import { renderButton } from '../../button/src/ButtonProvider';
import { createList } from '../../list/src/ListProvider';

/**
 * Renderiza una celda según el tipo de columna
 */
function renderCellByType(column: TableColumn3, row: TableRow3, columnType: ColumnType3): string {
  const cellValue = row.data[column.id];
  const cellData = row.data;
  
  switch (columnType) {
    case 'nombre': {
      // Solo texto del nombre (sin avatar)
      const nombre = cellValue || cellData.nombre || cellData.name || '';
      const isEditable = column.editable;
      const nombreElement = isEditable 
        ? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${nombre}</span>`
        : `<span class="ubits-body-md-regular">${nombre}</span>`;
      return nombreElement;
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
        
        // Si hay imageUrl, usar foto (sin badge)
        if (imageUrl) {
          avatarHTML = renderAvatar({
            imageUrl: imageUrl,
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
        // Variante Initials: usar initials si están disponibles, sino generarlas del nombre (sin badge)
        if (avatar && typeof avatar === 'object' && avatar.initials) {
          avatarHTML = renderAvatar({
            initials: avatar.initials,
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
        // Variante Icon: usar icon si está disponible, sino usar 'user' por defecto (sin badge)
        const iconName = avatar && typeof avatar === 'object' && avatar.icon 
          ? avatar.icon 
          : 'user';
        avatarHTML = renderAvatar({
          icon: iconName,
          size: 'sm'
        });
      }
      
      const isEditable = column.editable;
      const nombreElement = isEditable 
        ? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${nombre}</span>`
        : `<span class="ubits-body-md-regular">${nombre}</span>`;
      
      return `
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${avatarHTML}
          ${nombreElement}
        </div>
      `;
    }
    
    case 'nombre-avatar-texto': {
      // Mostrar nombre + avatar + texto complementario (abajo del nombre)
      const nombre = cellValue || cellData.nombre || cellData.name || '';
      const avatar = cellData.avatar || cellData.avatarUrl || null;
      const textoComplementario = cellData.area || cellData.areaNombre || cellData.textoComplementario || cellData.complementario || '';
      
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
      
      // Renderizar según la variante especificada (sin badge)
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
        
        // Si hay imageUrl, usar foto (sin badge)
        if (imageUrl) {
          avatarHTML = renderAvatar({
            imageUrl: imageUrl,
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
        // Variante Initials: usar initials si están disponibles, sino generarlas del nombre (sin badge)
        if (avatar && typeof avatar === 'object' && avatar.initials) {
          avatarHTML = renderAvatar({
            initials: avatar.initials,
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
        // Variante Icon: usar icon si está disponible, sino usar 'user' por defecto (sin badge)
        const iconName = avatar && typeof avatar === 'object' && avatar.icon 
          ? avatar.icon 
          : 'user';
        avatarHTML = renderAvatar({
          icon: iconName,
          size: 'sm'
        });
      }
      
      // Este tipo NO es editable
      const nombreElement = `<span class="ubits-body-md-regular">${nombre}</span>`;
      
      return `
        <div style="display: flex; align-items: flex-start; gap: var(--ubits-spacing-sm, 12px);">
          ${avatarHTML}
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${nombreElement}
            ${textoComplementario ? `<span class="ubits-body-sm-regular" style="color: var(--ubits-body-md-regular-3, #6b7280);">${textoComplementario}</span>` : ''}
          </div>
        </div>
      `;
    }
    
    case 'estado': {
      // Mapeo de estados en español a estados del sistema UBITS
      const statusMap: Record<string, string> = {
        'activo': 'active',
        'inactivo': 'disabled',
        'pendiente': 'pending',
        'completado': 'completed',
        'publicado': 'published',
        'cumplido': 'fulfilled',
        'creado': 'created',
        'error': 'not-fulfilled',
        'denegado': 'denied',
        'borrador': 'draft',
        'en-progreso': 'in-progress',
        'sincronizando': 'syncing',
        'pendiente-aprobacion': 'pending-approval',
        'no-iniciado': 'not-started',
        'finalizado': 'finished',
        'archivado': 'archived',
        'deshabilitado': 'disabled',
        'pausado': 'paused',
        'oculto': 'hidden',
        'cancelado': 'denied'
      };
      
      // Obtener el estado actual (puede venir en diferentes formatos)
      const currentEstado = cellValue || cellData.estado || cellData.status || 'pendiente';
      const estadoKey = String(currentEstado).toLowerCase().trim();
      const ubitsStatus = statusMap[estadoKey] || statusMap['pendiente'] || 'pending';
      
      // Mapeo inverso para mostrar el label en español
      const statusLabels: Record<string, string> = {
        'active': 'Activo',
        'completed': 'Completado',
        'published': 'Publicado',
        'fulfilled': 'Cumplido',
        'created': 'Creado',
        'not-fulfilled': 'No cumplido',
        'denied': 'Denegado',
        'draft': 'Borrador',
        'in-progress': 'En progreso',
        'syncing': 'Sincronizando',
        'pending': 'Pendiente',
        'pending-approval': 'Pendiente aprobación',
        'not-started': 'No iniciado',
        'finished': 'Finalizado',
        'archived': 'Archivado',
        'disabled': 'Deshabilitado',
        'paused': 'Pausado',
        'hidden': 'Oculto'
      };
      
      const label = statusLabels[ubitsStatus] || String(currentEstado);
      const isEditable = column.editable;
      
      // Si es editable, mostrar icono a la derecha
      const statusTagHTML = renderStatusTag({
        label: label,
        status: ubitsStatus as any,
        size: 'sm',
        rightIcon: isEditable ? 'chevron-down' : null,
        clickable: isEditable
      });
      
      if (isEditable) {
        // Agregar contenedor con atributos para el dropdown
        return `
          <div class="ubits-data-table-3__status-editable" data-row-id="${row.id}" data-column-id="${column.id}" data-editable="true" data-current-status="${ubitsStatus}">
            ${statusTagHTML}
            <div class="ubits-data-table-3__status-dropdown" id="status-dropdown-${row.id}-${column.id}" style="display: none;"></div>
          </div>
        `;
      }
      
      return statusTagHTML;
    }
    
    case 'radio': {
      const checked = cellValue === true || cellValue === 'true' || cellValue === 1 || cellValue === row.id || cellValue === String(row.id);
      // Determinar si mostrar label y qué texto usar
      const showLabel = column.radioLabel !== false && column.radioLabel !== undefined;
      const labelText = typeof column.radioLabel === 'string' ? column.radioLabel : (showLabel ? String(row.data[column.id] || row.id) : '');
      
      const isEditable = column.editable === true;
      const disabled = !isEditable;
      
      const radioHTML = renderRadioButton({
        label: labelText,
        name: `radio-${column.id}`,
        value: String(row.id),
        checked,
        size: 'md',
        disabled: disabled
      });
      
      // Agregar atributos para identificar el radio button
      return radioHTML.replace(
        '<input',
        `<input data-row-id="${row.id}" data-column-id="${column.id}" data-radio-button="true" ${isEditable ? 'data-editable="true"' : ''}`
      );
    }
    
    case 'toggle': {
      const checked = cellValue === true || cellValue === 'true' || cellValue === 1;
      
      // Determinar si mostrar label y qué texto usar
      const showLabel = column.toggleLabel !== false && column.toggleLabel !== undefined;
      const labelText = typeof column.toggleLabel === 'string' ? column.toggleLabel : (showLabel ? String(row.data[column.id] || row.id) : '');
      
      const toggleHTML = renderToggle({
        label: labelText,
        checked,
        size: 'md'
      });
      
      // Agregar atributos para identificar el toggle
      // El toggle puede estar dentro de un label o div, así que buscamos el input
      return toggleHTML.replace(
        '<input',
        `<input data-row-id="${row.id}" data-column-id="${column.id}" data-toggle-button="true"`
      );
    }
    
    case 'checkbox': {
      // Checkbox diferente al fijo (con label en header)
      const checked = cellValue === true || cellValue === 'true' || cellValue === 1;
      
      // Determinar si mostrar label y qué texto usar
      const showLabel = column.checkboxLabel !== false && column.checkboxLabel !== undefined;
      const labelText = typeof column.checkboxLabel === 'string' ? column.checkboxLabel : (showLabel ? String(row.data[column.id] || row.id) : '');
      
      const isEditable = column.editable === true;
      const disabled = !isEditable;
      
      // 🔍 LOGS DETALLADOS - Removidos para limpieza
      
      const checkboxHTML = renderCheckbox({
        label: labelText,
        checked,
        size: 'md',
        disabled: disabled
      });
      
      // Log removido para limpieza
      
      // Agregar atributos para identificar el checkbox
      const finalHTML = checkboxHTML.replace(
        '<input',
        `<input data-row-id="${row.id}" data-column-id="${column.id}" data-checkbox-button="true" ${isEditable ? 'data-editable="true"' : ''}`
      );
      
      // Log removido para limpieza
      
      return finalHTML;
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
    // Editable para: nombre, nombre-avatar, estado (contenido editable), checkbox y radio (interactivos)
    const isEditable = column.editable && (
      column.type === 'nombre' || 
      column.type === 'nombre-avatar' || 
      column.type === 'estado' ||
      column.type === 'checkbox' ||
      column.type === 'radio'
    );
    const editableClass = isEditable ? 'ubits-data-table-3__cell--editable' : '';
    const dataAttrs = isEditable && (column.type === 'nombre' || column.type === 'nombre-avatar' || column.type === 'estado') 
      ? `data-row-id="${row.id}" data-column-id="${column.id}" data-editable="true"` 
      : '';
    
    return `
      <td class="ubits-data-table-3__cell ubits-data-table-3__cell--${column.type} ${editableClass}" ${dataAttrs}>
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
  // Si es una columna de checkbox fija, no renderizar header (eliminado)
  if (column.id === 'checkbox' || column.id.startsWith('checkbox-')) {
    return ''; // No renderizar header para columna de checkbox fija
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

  // Agregar espacio en blanco en el header para alinear con la columna de controles de las filas
  const controlsHeader = hasControls ? `
          <th class="ubits-data-table-3__controls-column-header"></th>
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
    // Log removido para limpieza
    
    const newHTML = renderDataTable3(
      { ...currentOptions, sortColumnId, sortDirection } as any, 
      columnOrder, 
      rowOrder
    );
    
    // 🔍 LOGS: Verificar posiciones de checkboxes antes de actualizar
    const checkboxCellsBefore = element.querySelectorAll('.ubits-data-table-3__cell--checkbox');
    // Log removido para limpieza
    
    element.innerHTML = newHTML.trim();
    
    // 🔍 LOGS: Verificar posiciones de checkboxes después de actualizar
    setTimeout(() => {
      const checkboxCellsAfter = element.querySelectorAll('.ubits-data-table-3__cell--checkbox');
      
      // Log detallado por celda
      Array.from(checkboxCellsAfter).forEach((cell, idx) => {
        const rect = cell.getBoundingClientRect();
        const checkbox = cell.querySelector('.ubits-checkbox');
        const checkboxRect = checkbox?.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(cell);
        const checkboxComputed = checkbox ? window.getComputedStyle(checkbox) : null;
        const beforeCell = checkboxCellsBefore[idx];
        const beforeRect = beforeCell?.getBoundingClientRect();
        
        // Log removido para limpieza
      });
    }, 100);
    
    attachEventListeners();
    initializeIconFallbacks();
    
    // Log removido para limpieza
    // console.log('✅ [RENDER COMPLETE]');
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
              // Log removido para limpieza
              return;
            }
            
            // No permitir hacer drop sobre la columna de checkbox
            if (isTargetCheckbox) {
              // Log removido para limpieza
              // console.log('🚫 No se puede hacer drop sobre la columna de checkbox');
              return;
            }
            
            if (draggedColumnId !== columnId) {
              const currentIndex = columnOrder.indexOf(draggedColumnId);
              const targetIndex = columnOrder.indexOf(columnId);
              
              // Encontrar el índice de la columna de checkbox en el orden actual
              const checkboxColumnIndex = columnOrder.findIndex(id => id === 'checkbox' || id.startsWith('checkbox-'));
              
              // Log removido para limpieza
              
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
                // Log removido para limpieza
                // console.log('🚫 No se puede mover columna antes de la columna de checkbox');
                return;
              }
              
              // Validar: si estamos moviendo desde después de checkbox, no permitir mover antes de checkbox
              if (currentIndex > checkboxColumnIndex && targetIndex < checkboxColumnIndex) {
                // Log removido para limpieza
                // console.log('🚫 No se puede mover columna desde después de checkbox hacia antes de checkbox');
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
                  // Log removido para limpieza
                  // console.log('🚫 El reordenamiento movería la checkbox a una posición incorrecta');
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

    // Checkboxes de header de columnas de checkbox (eliminado - el header ya no se renderiza)

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
    
    // Campos editables
    const editableFields = element.querySelectorAll('[data-editable-text="true"]');
    editableFields.forEach(field => {
      const cell = field.closest('[data-editable="true"]');
      if (!cell) return;
      
      const rowIdStr = cell.getAttribute('data-row-id');
      const columnId = cell.getAttribute('data-column-id');
      
      if (!rowIdStr || !columnId) return;
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      
      // Prevenir que el Enter cree una nueva línea
      field.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          (field as HTMLElement).blur();
        }
      });
      
      // Guardar cambios cuando pierde el foco
      field.addEventListener('blur', (e) => {
        e.stopPropagation();
        const newValue = (field as HTMLElement).textContent || '';
        const row = currentOptions.rows.find(r => r.id === rowId);
        
        if (row) {
          // Obtener la columna para verificar el tipo
          const col = currentOptions.columns.find(c => c.id === columnId);
          
          // Actualizar el valor según el tipo de columna
          if (col && (col.type === 'nombre' || col.type === 'nombre-avatar')) {
            // Siempre actualizar 'nombre' en los datos
            row.data.nombre = newValue.trim();
            // También actualizar en el ID de la columna si existe
            if (row.data[columnId] !== undefined) {
              row.data[columnId] = newValue.trim();
            }
          } else if (col && col.type === 'estado') {
            // Para estado, actualizar el valor del estado
            row.data[columnId] = newValue.trim();
            row.data.estado = newValue.trim();
            row.data.status = newValue.trim();
          } else {
            // Para otros tipos, usar el columnId
            row.data[columnId] = newValue.trim();
          }
        }
      });
      
      // Prevenir que se edite el contenido al hacer doble click
      field.addEventListener('dblclick', (e) => {
        e.stopPropagation();
      });
      
      // Prevenir que se borre el contenido al hacer click
      field.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
    
    // Status tags editables - mostrar dropdown con lista de estados
    const statusEditables = element.querySelectorAll('.ubits-data-table-3__status-editable');
    console.log('🔍 [STATUS DROPDOWN] Buscando contenedores de status editables', {
      statusEditablesCount: statusEditables.length,
      element: element
    });
    
    statusEditables.forEach((container, index) => {
      const rowIdStr = container.getAttribute('data-row-id');
      const columnId = container.getAttribute('data-column-id');
      const currentStatus = container.getAttribute('data-current-status');
      
      console.log(`🔍 [STATUS DROPDOWN] Procesando contenedor ${index}`, {
        container: container,
        rowIdStr,
        columnId,
        currentStatus,
        hasRowId: !!rowIdStr,
        hasColumnId: !!columnId
      });
      
      if (!rowIdStr || !columnId) {
        console.warn(`⚠️ [STATUS DROPDOWN] Contenedor ${index} no tiene rowId o columnId`);
        return;
      }
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      const statusTag = container.querySelector('.ubits-status-tag');
      const dropdown = container.querySelector('.ubits-data-table-3__status-dropdown') as HTMLElement;
      
      console.log(`🔍 [STATUS DROPDOWN] Elementos encontrados para contenedor ${index}`, {
        statusTag: statusTag,
        statusTagExists: !!statusTag,
        dropdown: dropdown,
        dropdownExists: !!dropdown,
        rowId,
        columnId,
        currentStatus
      });
      
      if (!statusTag || !dropdown) {
        console.warn(`⚠️ [STATUS DROPDOWN] Contenedor ${index} no tiene statusTag o dropdown`);
        return;
      }
      
      console.log(`✅ [STATUS DROPDOWN] Configurando dropdown para contenedor ${index}`);
      
      // Lista de estados disponibles con sus labels en español
      const statusOptions = [
        { value: 'active', label: 'Activo', status: 'active' },
        { value: 'completed', label: 'Completado', status: 'completed' },
        { value: 'published', label: 'Publicado', status: 'published' },
        { value: 'fulfilled', label: 'Cumplido', status: 'fulfilled' },
        { value: 'created', label: 'Creado', status: 'created' },
        { value: 'not-fulfilled', label: 'No cumplido', status: 'not-fulfilled' },
        { value: 'denied', label: 'Denegado', status: 'denied' },
        { value: 'draft', label: 'Borrador', status: 'draft' },
        { value: 'in-progress', label: 'En progreso', status: 'in-progress' },
        { value: 'syncing', label: 'Sincronizando', status: 'syncing' },
        { value: 'pending', label: 'Pendiente', status: 'pending' },
        { value: 'pending-approval', label: 'Pendiente aprobación', status: 'pending-approval' },
        { value: 'not-started', label: 'No iniciado', status: 'not-started' },
        { value: 'finished', label: 'Finalizado', status: 'finished' },
        { value: 'archived', label: 'Archivado', status: 'archived' },
        { value: 'disabled', label: 'Deshabilitado', status: 'disabled' },
        { value: 'paused', label: 'Pausado', status: 'paused' },
        { value: 'hidden', label: 'Oculto', status: 'hidden' }
      ];
      
      // Función para cerrar el dropdown
      const closeDropdown = () => {
        dropdown.style.display = 'none';
        document.removeEventListener('click', closeDropdown);
      };
      
      // Función para abrir el dropdown
      const openDropdown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🔵 [STATUS DROPDOWN] Abriendo dropdown', {
          rowId,
          columnId,
          statusTag: statusTag,
          dropdown: dropdown,
          dropdownExists: !!dropdown,
          dropdownDisplay: dropdown?.style.display
        });
        
        // Cerrar otros dropdowns abiertos
        element.querySelectorAll('.ubits-data-table-3__status-dropdown').forEach((dd: any) => {
          if (dd !== dropdown) {
            dd.style.display = 'none';
          }
        });
        
        // Mapeo de estados UBITS a labels en español para guardar
        const statusToLabel: Record<string, string> = {
          'active': 'Activo',
          'completed': 'Completado',
          'published': 'Publicado',
          'fulfilled': 'Cumplido',
          'created': 'Creado',
          'not-fulfilled': 'No cumplido',
          'denied': 'Denegado',
          'draft': 'Borrador',
          'in-progress': 'En progreso',
          'syncing': 'Sincronizando',
          'pending': 'Pendiente',
          'pending-approval': 'Pendiente aprobación',
          'not-started': 'No iniciado',
          'finished': 'Finalizado',
          'archived': 'Archivado',
          'disabled': 'Deshabilitado',
          'paused': 'Pausado',
          'hidden': 'Oculto'
        };
        
        // Preparar items de la lista
        const listItems = statusOptions.map(option => ({
          label: option.label,
          value: option.value,
          state: (option.status === currentStatus ? 'active' : 'default') as const,
          selected: option.status === currentStatus
        }));
        
        // Limpiar dropdown anterior si existe
        dropdown.innerHTML = '';
        const listContainerId = `status-list-${rowId}-${columnId}`;
        dropdown.id = listContainerId;
        
        // Posicionar el dropdown debajo del status tag
        // Usar position: absolute para que se mueva con el scroll de la tabla
        // El contenedor padre (.ubits-data-table-3__status-editable) debe tener position: relative
        const container = statusTag.closest('.ubits-data-table-3__status-editable') as HTMLElement;
        console.log('📍 [STATUS DROPDOWN] Posicionamiento', {
          container: container,
          containerExists: !!container,
          containerPosition: container?.style.position,
          statusTagRect: statusTag.getBoundingClientRect(),
          dropdownBefore: {
            position: dropdown.style.position,
            top: dropdown.style.top,
            left: dropdown.style.left
          }
        });
        
        if (container) {
          container.style.position = 'relative';
          console.log('✅ [STATUS DROPDOWN] Container position set to relative');
        } else {
          console.warn('⚠️ [STATUS DROPDOWN] Container no encontrado');
        }
        
        dropdown.style.position = 'absolute';
        dropdown.style.top = '100%';
        dropdown.style.left = '0';
        dropdown.style.marginTop = '-2px';
        dropdown.style.zIndex = '1000';
        
        console.log('📍 [STATUS DROPDOWN] Posicionamiento aplicado', {
          position: dropdown.style.position,
          top: dropdown.style.top,
          left: dropdown.style.left,
          marginTop: dropdown.style.marginTop,
          zIndex: dropdown.style.zIndex
        });
        dropdown.style.backgroundColor = 'var(--ubits-bg-1, #ffffff)';
        dropdown.style.border = '1px solid var(--ubits-border-1, #d0d2d5)';
        dropdown.style.borderRadius = '8px';
        dropdown.style.boxShadow = '0 4px 12px var(--ubits-shadow-md, rgba(0, 0, 0, 0.15))';
        dropdown.style.display = 'block';
        dropdown.style.minWidth = '200px';
        dropdown.style.maxWidth = '300px';
        dropdown.style.padding = '0';
        dropdown.style.boxSizing = 'border-box';
        
        // Crear wrapper para el scrollbar personalizado (similar al popover)
        dropdown.innerHTML = '<div class="ubits-data-table-3__status-dropdown-body"><div class="ubits-data-table-3__status-dropdown-content"></div><div class="ubits-data-table-3__status-dropdown-scrollbar"><div class="ubits-data-table-3__status-dropdown-scrollbar-bar"></div></div></div>';
        const dropdownBody = dropdown.querySelector('.ubits-data-table-3__status-dropdown-body') as HTMLElement;
        const dropdownContent = dropdown.querySelector('.ubits-data-table-3__status-dropdown-content') as HTMLElement;
        
        console.log('🏗️ [STATUS DROPDOWN] Estructura creada', {
          dropdownBody: dropdownBody,
          dropdownBodyExists: !!dropdownBody,
          dropdownContent: dropdownContent,
          dropdownContentExists: !!dropdownContent,
          dropdownHTML: dropdown.innerHTML.substring(0, 200)
        });
        
        if (!dropdownBody || !dropdownContent) {
          console.error('❌ [STATUS DROPDOWN] Error creating dropdown structure', {
            dropdownBody: dropdownBody,
            dropdownContent: dropdownContent
          });
          return;
        }
        
        // Crear contenedor para la lista dentro del content
        const listWrapper = document.createElement('div');
        listWrapper.id = listContainerId;
        dropdownContent.appendChild(listWrapper);
        
        // Crear la lista interactiva usando createList
        // createList modifica el innerHTML del contenedor con el ID especificado
        // y retorna el elemento .ubits-list dentro del contenedor
        try {
          createList({
            containerId: listContainerId,
            items: listItems,
            size: 'sm',
            maxHeight: '300px',
            onSelectionChange: (selectedItem, index) => {
              if (selectedItem && index !== null) {
                const option = statusOptions[index];
                if (option) {
                  const row = currentOptions.rows.find(r => r.id === rowId);
                  if (row) {
                    const col = currentOptions.columns.find(c => c.id === columnId);
                    if (col) {
                      const labelToSave = statusToLabel[option.status] || option.label;
                      row.data[columnId] = labelToSave;
                      row.data.estado = labelToSave;
                      row.data.status = labelToSave;
                      
                      render();
                    }
                  }
                  closeDropdown();
                }
              }
            }
          });
          
          // Obtener el elemento .ubits-list y sincronizar el scrollbar personalizado
          // Esperar un momento para que la lista se renderice completamente
          setTimeout(() => {
            const listElement = listWrapper.querySelector('.ubits-list') as HTMLElement;
            
            console.log('📋 [STATUS DROPDOWN] Buscando lista', {
              listWrapper: listWrapper,
              listWrapperId: listWrapper.id,
              listElement: listElement,
              listElementExists: !!listElement,
              listElementClasses: listElement?.className,
              listElementStyles: listElement ? {
                scrollbarWidth: listElement.style.scrollbarWidth,
                overflowY: listElement.style.overflowY,
                height: listElement.style.height
              } : null
            });
            
            if (listElement) {
              console.log('🎨 [STATUS DROPDOWN] Ocultando scrollbar nativo', {
                before: {
                  scrollbarWidth: window.getComputedStyle(listElement).scrollbarWidth,
                  webkitScrollbarWidth: window.getComputedStyle(listElement, '::-webkit-scrollbar').width
                }
              });
              
              // Forzar ocultar scrollbar nativo con estilos inline
              listElement.style.scrollbarWidth = 'none';
              listElement.style.setProperty('-ms-overflow-style', 'none', 'important');
              listElement.style.setProperty('scrollbar-width', 'none', 'important');
              
              // Ocultar scrollbar en WebKit
              const style = document.createElement('style');
              style.id = `scrollbar-hide-${listContainerId}`;
              style.textContent = `
                #${listContainerId} .ubits-list::-webkit-scrollbar {
                  width: 0px !important;
                  height: 0px !important;
                  display: none !important;
                }
                #${listContainerId} .ubits-list::-webkit-scrollbar-thumb {
                  display: none !important;
                }
                #${listContainerId} .ubits-list::-webkit-scrollbar-track {
                  display: none !important;
                }
              `;
              document.head.appendChild(style);
              
              console.log('✅ [STATUS DROPDOWN] Estilos de ocultación aplicados', {
                styleElement: style,
                styleId: style.id,
                after: {
                  scrollbarWidth: listElement.style.scrollbarWidth,
                  computedScrollbarWidth: window.getComputedStyle(listElement).scrollbarWidth
                }
              });
            // Sincronizar scrollbar personalizado con el scroll de la lista
            const scrollbarBar = dropdown.querySelector('.ubits-data-table-3__status-dropdown-scrollbar-bar') as HTMLElement;
            const scrollbarContainer = dropdown.querySelector('.ubits-data-table-3__status-dropdown-scrollbar') as HTMLElement;
            
            console.log('🎚️ [STATUS DROPDOWN] Elementos del scrollbar', {
              scrollbarBar: scrollbarBar,
              scrollbarBarExists: !!scrollbarBar,
              scrollbarContainer: scrollbarContainer,
              scrollbarContainerExists: !!scrollbarContainer,
              scrollbarContainerHeight: scrollbarContainer?.clientHeight
            });
            
            if (scrollbarBar && scrollbarContainer) {
              console.log('✅ [STATUS DROPDOWN] Scrollbar personalizado encontrado, configurando...');
              
              const updateScrollbar = () => {
                const scrollTop = listElement.scrollTop;
                const scrollHeight = listElement.scrollHeight;
                const clientHeight = listElement.clientHeight;
                const scrollableHeight = scrollHeight - clientHeight;
                
                console.log('🔄 [STATUS DROPDOWN] Actualizando scrollbar', {
                  scrollTop,
                  scrollHeight,
                  clientHeight,
                  scrollableHeight,
                  scrollbarContainerHeight: scrollbarContainer.clientHeight
                });
                
                if (scrollableHeight > 0 && scrollbarContainer.clientHeight > 0) {
                  const scrollbarHeight = scrollbarContainer.clientHeight - 16; // 8px padding top + 8px padding bottom
                  const thumbHeight = Math.max(20, (clientHeight / scrollHeight) * scrollbarHeight);
                  const maxThumbTop = scrollbarHeight - thumbHeight;
                  const thumbTop = Math.max(0, Math.min(maxThumbTop, (scrollTop / scrollableHeight) * maxThumbTop));
                  
                  scrollbarBar.style.height = `${thumbHeight}px`;
                  scrollbarBar.style.transform = `translateY(${thumbTop}px)`;
                  scrollbarBar.style.opacity = '1';
                  
                  console.log('📊 [STATUS DROPDOWN] Scrollbar actualizado', {
                    scrollbarHeight,
                    thumbHeight,
                    thumbTop,
                    opacity: scrollbarBar.style.opacity
                  });
                } else {
                  scrollbarBar.style.opacity = '0';
                  console.log('👻 [STATUS DROPDOWN] Scrollbar oculto (no hay scroll)', {
                    scrollableHeight,
                    scrollbarContainerHeight: scrollbarContainer.clientHeight
                  });
                }
              };
              
              // Funcionalidad de arrastre del scrollbar
              let isDragging = false;
              let startY = 0;
              let startScrollTop = 0;
              
              const handleMouseDown = (e: MouseEvent) => {
                isDragging = true;
                startY = e.clientY;
                startScrollTop = listElement.scrollTop;
                e.preventDefault();
                
                const handleMouseMove = (e: MouseEvent) => {
                  if (!isDragging) return;
                  
                  const deltaY = e.clientY - startY;
                  const scrollbarHeight = scrollbarContainer.clientHeight - 16;
                  const scrollHeight = listElement.scrollHeight;
                  const clientHeight = listElement.clientHeight;
                  const scrollableHeight = scrollHeight - clientHeight;
                  
                  if (scrollableHeight > 0) {
                    const scrollRatio = scrollableHeight / (scrollbarHeight - scrollbarBar.clientHeight);
                    const newScrollTop = startScrollTop + (deltaY * scrollRatio);
                    listElement.scrollTop = Math.max(0, Math.min(scrollableHeight, newScrollTop));
                  }
                };
                
                const handleMouseUp = () => {
                  isDragging = false;
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              };
              
              scrollbarBar.addEventListener('mousedown', handleMouseDown);
              
              // Actualizar scrollbar cuando se hace scroll
              listElement.addEventListener('scroll', updateScrollbar);
              
              // Actualizar scrollbar cuando cambia el tamaño
              const resizeObserver = new ResizeObserver(() => {
                updateScrollbar();
              });
              resizeObserver.observe(listElement);
              resizeObserver.observe(scrollbarContainer);
              
              // Actualizar inicialmente
              setTimeout(updateScrollbar, 0);
            }
          }
          }, 10);
        } catch (error) {
          console.error('Error creating list:', error);
        }
        
        // Cerrar al hacer click fuera
        setTimeout(() => {
          document.addEventListener('click', closeDropdown);
        }, 0);
      };
      
      // Agregar event listener al status tag
      console.log(`✅ [STATUS DROPDOWN] Agregando event listener click al status tag ${index}`);
      statusTag.addEventListener('click', openDropdown);
      console.log(`✅ [STATUS DROPDOWN] Event listener agregado exitosamente para contenedor ${index}`);
    });
    
    // Radio buttons - manejar selección (solo si son editables)
    const radioButtons = element.querySelectorAll('input[data-radio-button="true"][data-editable="true"]');
    radioButtons.forEach(radio => {
      const input = radio as HTMLInputElement;
      const rowIdStr = input.getAttribute('data-row-id');
      const columnId = input.getAttribute('data-column-id');
      
      if (!rowIdStr || !columnId) return;
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      
      // Remover listeners anteriores si existen
      const newInput = input.cloneNode(true) as HTMLInputElement;
      input.parentNode?.replaceChild(newInput, input);
      
      newInput.addEventListener('change', (e) => {
        e.stopPropagation();
        
        // Si este radio está siendo seleccionado, deseleccionar los otros del mismo grupo
        if (newInput.checked) {
          // Encontrar todos los radios del mismo grupo (misma columna)
          const allRadiosInGroup = element.querySelectorAll(`input[data-radio-button="true"][data-column-id="${columnId}"]`);
          allRadiosInGroup.forEach((otherRadio: any) => {
            const otherRowIdStr = otherRadio.getAttribute('data-row-id');
            if (otherRowIdStr && otherRowIdStr !== String(rowId)) {
              otherRadio.checked = false;
              // Actualizar el estado en los datos de la fila
              const otherRow = currentOptions.rows.find(r => String(r.id) === otherRowIdStr);
              if (otherRow) {
                otherRow.data[columnId] = false;
              }
            }
          });
          
          // Actualizar el estado en los datos de la fila seleccionada
          const row = currentOptions.rows.find(r => String(r.id) === String(rowId));
          if (row) {
            row.data[columnId] = true;
            row.data[`${columnId}_value`] = rowId;
          }
        }
        
        // Re-renderizar para reflejar los cambios visuales
        render();
      });
    });
    
    // Checkbox buttons (tipo 'checkbox') - manejar activación/desactivación (solo si son editables)
    const checkboxButtons = element.querySelectorAll('input[data-checkbox-button="true"][data-editable="true"]');
    checkboxButtons.forEach(checkbox => {
      const input = checkbox as HTMLInputElement;
      const rowIdStr = input.getAttribute('data-row-id');
      const columnId = input.getAttribute('data-column-id');
      
      if (!rowIdStr || !columnId) return;
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      
      // Remover listeners anteriores si existen
      const newInput = input.cloneNode(true) as HTMLInputElement;
      input.parentNode?.replaceChild(newInput, input);
      
      newInput.addEventListener('change', (e) => {
        e.stopPropagation();
        
        // Actualizar el estado en los datos de la fila
        const row = currentOptions.rows.find(r => String(r.id) === String(rowId));
        if (row) {
          row.data[columnId] = newInput.checked;
          // Re-renderizar para reflejar los cambios visuales
          render();
        }
      });
    });
    
    // Toggle buttons - manejar activación/desactivación
    const toggleButtons = element.querySelectorAll('input[data-toggle-button="true"]');
    toggleButtons.forEach(toggle => {
      const input = toggle as HTMLInputElement;
      const rowIdStr = input.getAttribute('data-row-id');
      const columnId = input.getAttribute('data-column-id');
      
      if (!rowIdStr || !columnId) return;
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      
      // Remover listeners anteriores si existen
      const newInput = input.cloneNode(true) as HTMLInputElement;
      input.parentNode?.replaceChild(newInput, input);
      
      newInput.addEventListener('change', (e) => {
        e.stopPropagation();
        
        // Actualizar el estado en los datos de la fila
        const row = currentOptions.rows.find(r => String(r.id) === String(rowId));
        if (row) {
          row.data[columnId] = newInput.checked;
          // Re-renderizar para reflejar los cambios visuales
          render();
        }
      });
      
      // También agregar listener de click al wrapper (label o div) para asegurar que funcione
      const wrapper = newInput.closest('.ubits-toggle');
      if (wrapper) {
        wrapper.addEventListener('click', (e) => {
          // Si el click no es directamente en el input, activar el toggle
          if (e.target !== newInput && !newInput.contains(e.target as Node)) {
            e.preventDefault();
            e.stopPropagation();
            newInput.checked = !newInput.checked;
            newInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }
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

