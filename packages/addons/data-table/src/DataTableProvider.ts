import type { DataTableOptions, TableColumn, TableRow, ColumnType } from './types/DataTableOptions';
import { renderCheckbox } from '../../checkbox/src/CheckboxProvider';
import { renderProgressBar } from '../../progress/src/ProgressProvider';
import { renderStatusTag } from '../../status-tag/src/StatusTagProvider';
import { renderAvatar } from '../../avatar/src/AvatarProvider';
import { renderToggle } from '../../toggle/src/ToggleProvider';
import { renderRadioButton } from '../../radio-button/src/RadioButtonProvider';
import { renderButton } from '../../button/src/ButtonProvider';
import { createList, renderList } from '../../list/src/ListProvider';
import { createScrollbar } from '../../scroll/src/ScrollProvider';
// Importar estilos del List para que se carguen
import '../../list/src/styles/list.css';

/**
 * Renderiza una celda según el tipo de columna
 */
function renderCellByType(column: TableColumn, row: TableRow, columnType: ColumnType): string {
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
          <div class="ubits-data-table__status-editable" data-row-id="${row.id}" data-column-id="${column.id}" data-editable="true" data-current-status="${ubitsStatus}">
            ${statusTagHTML}
            <div class="ubits-data-table__status-dropdown" id="status-dropdown-${row.id}-${column.id}" style="display: none;"></div>
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
      
      const checkboxHTML = renderCheckbox({
        label: labelText,
        checked,
        size: 'md',
        disabled: disabled
      });
      
      // Agregar atributos para identificar el checkbox
      const finalHTML = checkboxHTML.replace(
        '<input',
        `<input data-row-id="${row.id}" data-column-id="${column.id}" data-checkbox-button="true" ${isEditable ? 'data-editable="true"' : ''}`
      );
      
      return finalHTML;
    }
    
    case 'correo': {
      const email = cellValue || '';
      const isClickable = column.emailClickable !== false; // Por defecto es true
      
      if (isClickable) {
        return `<a href="mailto:${email}" class="ubits-body-md-regular" style="color: var(--ubits-accent-brand, #0c5bef); text-decoration: none;">${email}</a>`;
      } else {
        return `<span class="ubits-body-md-regular">${email}</span>`;
      }
    }
    
    case 'acciones': {
      // Por defecto, mostrar botón terciario con icono de eliminar
      return renderButton({
        text: 'Eliminar',
        variant: 'tertiary',
        size: 'sm',
        icon: 'trash',
        iconStyle: 'regular',
        className: 'ubits-data-table__action-button'
      });
    }
    
    case 'fecha': {
      const fecha = cellValue || '';
      const isEditable = column.editable;
      
      // Si es editable, mostrar un contenedor con el span y atributos para el calendario
      if (isEditable) {
        // Convertir fecha a formato YYYY-MM-DD para el input date
        let dateValue = '';
        if (fecha) {
          try {
            const date = new Date(fecha);
            if (!isNaN(date.getTime())) {
              dateValue = date.toISOString().split('T')[0];
            }
          } catch (e) {
            // Si no se puede parsear, usar la fecha actual
            dateValue = new Date().toISOString().split('T')[0];
          }
        } else {
          dateValue = new Date().toISOString().split('T')[0];
        }
        
        return `
          <div class="ubits-data-table__date-editable" data-row-id="${row.id}" data-column-id="${column.id}" data-editable="true">
            <span class="ubits-body-md-regular ubits-data-table__date-display">${fecha || 'Seleccionar fecha'}</span>
            <input type="date" class="ubits-data-table__date-input" value="${dateValue}" style="display: none;" data-row-id="${row.id}" data-column-id="${column.id}">
          </div>
        `;
      }
      
      // Si no es editable, mostrar solo el texto
      return `<span class="ubits-body-md-regular">${fecha}</span>`;
    }
    
    case 'area': {
      // Texto hardcoded para área
      const areaText = cellValue || 'Desarrollo';
      return `<span class="ubits-body-md-regular">${areaText}</span>`;
    }
    
    case 'lider': {
      // Texto hardcoded para líder
      const liderText = cellValue || 'Juan Pérez';
      return `<span class="ubits-body-md-regular">${liderText}</span>`;
    }
    
    case 'pais': {
      // Texto hardcoded para país
      const paisText = cellValue || 'Colombia';
      return `<span class="ubits-body-md-regular">${paisText}</span>`;
    }
    
    case 'ciudad': {
      // Texto hardcoded para ciudad
      const ciudadText = cellValue || 'Bogotá';
      return `<span class="ubits-body-md-regular">${ciudadText}</span>`;
    }
    
    default:
      return `<span class="ubits-body-md-regular">${cellValue || ''}</span>`;
  }
}

/**
 * Renderiza una celda de la tabla
 */
function renderCell(column: TableColumn, row: TableRow, pinnedLeft: number = 0): string {
  // Si la columna es de tipo checkbox fijo (columna especial), renderizar checkbox
  if (column.id === 'checkbox' || column.id.startsWith('checkbox-')) {
    const checkboxValue = row.data[column.id] || false;
    console.log('📦 [CELL] Renderizando celda checkbox, column.id:', column.id, 'row.id:', row.id, 'checkboxValue:', checkboxValue);
    
    const checkboxHTML = renderCheckbox({
      label: '',
      checked: checkboxValue,
      size: 'md',
      className: 'ubits-data-table__cell-checkbox'
    });
    
    const checkbox = checkboxHTML.replace(
      '<input',
      `<input data-row-id="${row.id}" data-column-id="${column.id}" aria-label="Checkbox ${column.title}"`
    );
    
    // Determinar el padding-left según el column-id
    const paddingLeft = column.id === 'checkbox-2' ? '20px' : 'var(--ubits-spacing-md, 16px)';
    
    // Agregar clase si la columna está fijada
    const pinnedClass = column.pinned ? ' ubits-data-table__cell--pinned' : '';
    const pinnedStyle = column.pinned && pinnedLeft > 0 ? `left: ${pinnedLeft}px;` : '';
    const cellStyle = `text-align: center; vertical-align: middle; padding-left: ${paddingLeft} !important;${pinnedStyle ? ' ' + pinnedStyle : ''}`;
    
    const cellHTML = `
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${pinnedClass}" data-column-id="${column.id}" ${column.pinned ? 'data-pinned="true"' : ''} style="${cellStyle}">
        ${checkbox}
      </td>
    `;
    console.log('📦 [CELL] Celda HTML generada para', column.id, 'row', row.id, 'length:', cellHTML.length);
    console.log('📦 [CELL] ¿Celda contiene checkbox-2?', cellHTML.includes('checkbox-2'));
    return cellHTML;
  }
  
  // Si la columna tiene un tipo definido, usar renderCellByType
  if (column.type) {
    const content = renderCellByType(column, row, column.type);
    // Editable para: nombre, nombre-avatar, estado, fecha (contenido editable), checkbox y radio (interactivos)
    const isEditable = column.editable && (
      column.type === 'nombre' || 
      column.type === 'nombre-avatar' || 
      column.type === 'estado' ||
      column.type === 'fecha' ||
      column.type === 'checkbox' ||
      column.type === 'radio'
    );
    const editableClass = isEditable ? 'ubits-data-table__cell--editable' : '';
    const pinnedClass = column.pinned ? ' ubits-data-table__cell--pinned' : '';
    const pinnedStyle = column.pinned && pinnedLeft > 0 ? ` style="left: ${pinnedLeft}px;"` : '';
    // Agregar data-column-id siempre para poder diferenciar en CSS
    const dataAttrs = isEditable && (column.type === 'nombre' || column.type === 'nombre-avatar' || column.type === 'estado' || column.type === 'fecha') 
      ? `data-row-id="${row.id}" data-column-id="${column.id}" data-editable="true"${column.pinned ? ' data-pinned="true"' : ''}` 
      : `data-column-id="${column.id}"${column.pinned ? ' data-pinned="true"' : ''}`;
    
    return `
      <td class="ubits-data-table__cell ubits-data-table__cell--${column.type} ${editableClass}${pinnedClass}" ${dataAttrs}${pinnedStyle}>
        ${content}
      </td>
    `;
  }
  
  // Renderizado normal para otras columnas (usar renderCell personalizado si existe)
  const content = column.renderCell 
    ? column.renderCell(row.data)
    : row.data[column.id] || '';
  
  // Agregar clase si la columna está fijada
  const pinnedClass = column.pinned ? ' ubits-data-table__cell--pinned' : '';
  const pinnedStyle = column.pinned && pinnedLeft > 0 ? ` style="left: ${pinnedLeft}px;"` : '';
  
  return `
    <td class="ubits-data-table__cell${pinnedClass}" data-column-id="${column.id}"${column.pinned ? ' data-pinned="true"' : ''}${pinnedStyle}>
      ${content}
    </td>
  `;
}

/**
 * Renderiza el header de una columna
 */
function renderColumnHeader(
  column: TableColumn, 
  columnReorderable: boolean = false,
  columnSortable: boolean = true,
  rows: TableRow[] = [],
  sortColumnId: string | null = null,
  sortDirection: 'asc' | 'desc' | null = null,
  showColumnMenu: boolean = true,
  pinnedLeft: number = 0
): string {
  // Si es una columna de checkbox, renderizar solo el checkbox (sin título ni drag handle)
  if (column.id === 'checkbox' || column.id.startsWith('checkbox-')) {
    console.log('📋 [HEADER] Renderizando header de checkbox, column.id:', column.id);
    // Opcional: calcular si todos están seleccionados para el checkbox del header
    const allChecked = rows.length > 0 && rows.every(row => row.data[column.id] === true);
    const someChecked = rows.some(row => row.data[column.id] === true);
    console.log('📋 [HEADER] allChecked:', allChecked, 'someChecked:', someChecked, 'rows.length:', rows.length);
    
    const checkboxHTML = renderCheckbox({
      label: '',
      checked: allChecked,
      indeterminate: someChecked && !allChecked,
      size: 'md',
      className: 'ubits-data-table__column-checkbox-header'
    });
    
    const checkbox = checkboxHTML.replace(
      '<input',
      `<input data-column-checkbox-header="${column.id}" aria-label="Seleccionar todos ${column.title}"`
    );
    
    const headerHTML = `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox" 
        style="${column.width ? `width: ${column.width}px;` : ''}" 
        data-column-id="${column.id}"
      >
        ${checkbox}
      </th>
    `;
    console.log('📋 [HEADER] Header HTML generado para', column.id, 'length:', headerHTML.length);
    console.log('📋 [HEADER] ¿Header contiene checkbox-2?', headerHTML.includes('checkbox-2'));
    return headerHTML;
  }

  // Para columnas normales, mostrar drag handle y título
  // NO permitir drag & drop si la columna es de tipo checkbox
  const isCheckboxColumn = column.id === 'checkbox' || column.id.startsWith('checkbox-');
  const dragHandle = columnReorderable && !isCheckboxColumn ? `
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${column.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  ` : '';

  // Botón de ordenamiento usando componente UBITS - desde cero
  const sortButton = !isCheckboxColumn && columnSortable ? (() => {
    const isSorted = sortColumnId === column.id;
    const showAscIcon = isSorted && sortDirection === 'asc';
    const showDescIcon = isSorted && sortDirection === 'desc';
    
    // Determinar qué icono usar
    let iconName = 'sort-alpha-asc'; // Por defecto
    if (showAscIcon) {
      iconName = 'sort-alpha-asc';
    } else if (showDescIcon) {
      iconName = 'sort-alpha-desc';
    }
    
    // Renderizar botón UBITS: tamaño xs, variant tertiary, iconOnly
    const buttonHTML = renderButton({
      variant: 'tertiary',
      size: 'xs',
      icon: iconName,
      iconStyle: 'solid',
      iconOnly: true,
      active: isSorted,
      className: 'ubits-data-table__column-sort-button',
      attributes: {
        'aria-label': `Ordenar ${column.title}`,
        'data-column-id': column.id,
        'data-sort-button': 'true'
      }
    });
    
    // Si no está ordenado, agregar opacity al icono
    if (!isSorted) {
      const iconWithOpacity = buttonHTML.replace(
        /<i class="([^"]*)"([^>]*)>/,
        '<i class="$1" style="opacity: 0.4;"$2>'
      );
      return iconWithOpacity;
    }
    
    return buttonHTML;
  })() : '';
  
  if (!sortButton && !isCheckboxColumn) {
    console.log('⚠️ [SORT BUTTON] No se creó botón para:', {
      columnId: column.id,
      columnTitle: column.title,
      isCheckboxColumn,
      columnSortable
    });
  }

  // Botón de menú de 3 puntos con opción de fijar columna
  const menuButton = !isCheckboxColumn && showColumnMenu ? (() => {
    // Renderizar botón UBITS sin dropdown: tamaño xs, variant tertiary, iconOnly
    // El onClick se manejará en attachEventListeners usando el data-column-id
    const buttonHTML = renderButton({
      variant: 'tertiary',
      size: 'xs',
      icon: 'ellipsis',
      iconStyle: 'solid',
      iconOnly: true,
      className: 'ubits-data-table__column-menu-button',
      attributes: {
        'aria-label': `Menú de opciones de ${column.title}`,
        'data-column-id': column.id,
        'data-menu-button': 'true'
      }
    });
    
    return buttonHTML;
  })() : '';

  const headerContent = `
    <div class="ubits-data-table__column-header-content">
      ${dragHandle}
      <span class="ubits-data-table__column-title">${column.title}</span>
      <div class="ubits-data-table__column-actions">
        ${sortButton}
        ${menuButton}
      </div>
    </div>
  `;

  // Agregar clase si la columna está fijada
  const pinnedClass = column.pinned ? ' ubits-data-table__column-header--pinned' : '';
  
  if (column.pinned) {
    console.log('📌 [PINNED] Columna fijada detectada en renderColumnHeader:', {
      columnId: column.id,
      columnTitle: column.title,
      pinned: column.pinned,
      pinnedClass
    });
  }
  
  // Agregar estilo inline para left si está fijada
  const pinnedStyle = column.pinned && pinnedLeft > 0 ? `left: ${pinnedLeft}px;` : '';
  const widthStyle = column.width ? `width: ${column.width}px;` : '';
  const combinedStyle = [widthStyle, pinnedStyle].filter(Boolean).join(' ');
  
  return `
    <th 
      class="ubits-data-table__column-header${pinnedClass}" 
      ${combinedStyle ? `style="${combinedStyle}"` : ''} 
      data-column-id="${column.id}"
      ${column.pinned ? 'data-pinned="true"' : ''}
    >
      ${headerContent}
    </th>
  `;
}

/**
 * Renderiza una fila de la tabla
 */
function renderRow(row: TableRow, columns: TableColumn[], rowIndex: number, rowReorderable: boolean = false, rowExpandable: boolean = true, hasControls: boolean = false, pinnedLefts: number[] = []): string {
  const isExpanded = row.expanded || false;

  // Drag handle para filas
  const dragHandle = rowReorderable ? `
    <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${row.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  ` : '';

  // Botón de expandir (solo si rowExpandable es true)
  const expandIcon = rowExpandable ? `
    <button
      type="button"
      class="ubits-data-table__row-expand"
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
    .map((col, index) => {
      const pinnedLeft = pinnedLefts[index] || 0;
      return renderCell(col, row, pinnedLeft);
    })
    .join('');

  const rowClasses = [
    'ubits-data-table__row',
    isExpanded ? 'ubits-data-table__row--expanded' : ''
  ].filter(Boolean).join(' ');

  // Estructura: Una sola columna de controles con drag handle y expand icon (sin checkbox)
  // Solo renderizar la columna de controles si hay al menos un control visible
  const controlsCell = hasControls ? `
      <td class="ubits-data-table__controls-column">
        <div class="ubits-data-table__controls-wrapper">
          ${dragHandle}
          ${expandIcon}
        </div>
      </td>
  ` : '';

  // Logs para debugging de alineación
  if (rowIndex === 0) {
    console.log('🔍 [ROW ALIGNMENT] ========== PRIMERA FILA ==========');
    console.log('📊 row.id:', row.id);
    console.log('📊 hasControls:', hasControls);
    console.log('📊 controlsCell:', controlsCell ? 'RENDERIZADO' : 'NO RENDERIZADO');
    console.log('📊 visibleColumns count:', visibleColumns.length);
    console.log('📊 visibleColumns IDs:', visibleColumns.map(col => col.id));
    console.log('📊 cellsHTML count (th tags):', (cellsHTML.match(/<td/g) || []).length);
    console.log('📊 Total cells count:', (controlsCell ? 1 : 0) + (cellsHTML.match(/<td/g) || []).length);
    console.log('📊 - controlsCell:', controlsCell ? 1 : 0);
    console.log('📊 - dataCells:', (cellsHTML.match(/<td/g) || []).length);
    console.log('🔍 [ROW ALIGNMENT] ========== FIN ==========');
  }
  
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
      <tr class="ubits-data-table__row-expanded-row">
        <td class="ubits-data-table__row-expanded-content" colspan="${colspan}">
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
export function renderDataTable(
  options: DataTableOptions,
  columnOrder: string[] = [],
  rowOrder: (string | number)[] = []
): string {
  const { columns, rows, className = '', columnReorderable = false, columnSortable = true, rowReorderable = false, rowExpandable = true, showCheckbox = true, showVerticalScrollbar = false, showHorizontalScrollbar = false, showColumnMenu = true } = options;

  console.log('🎨 [RENDER] ========== INICIO RENDER ==========');
  console.log('🎨 [RENDER] renderDataTable llamado con showCheckbox:', showCheckbox);
  console.log('🎨 [RENDER] renderDataTable llamado con showVerticalScrollbar:', showVerticalScrollbar);
  console.log('🎨 [RENDER] renderDataTable llamado con showHorizontalScrollbar:', showHorizontalScrollbar);
  console.log('🎨 [RENDER] renderDataTable llamado con showColumnMenu:', showColumnMenu);
  console.log('🎨 [RENDER] Columnas recibidas:', columns.map(c => ({ id: c.id, visible: c.visible, pinned: c.pinned })));
  console.log('🎨 [RENDER] Número de filas:', rows.length);
  console.log('🎨 [RENDER] Estado pinned de columnas:', columns.map(c => ({ id: c.id, pinned: c.pinned, pinnedType: typeof c.pinned })));

  // Filtrar columnas visibles
  let visibleColumns = columns.filter(col => col.visible !== false);
  
  // Eliminar la columna de checkbox vieja (id === 'checkbox')
  visibleColumns = visibleColumns.filter(col => col.id !== 'checkbox');
  console.log('🔍 [CHECKBOX] Columna checkbox eliminada. Columnas restantes:', visibleColumns.map(col => col.id));
  
  // Si hay un orden de columnas especificado, reordenar según ese orden
  if (columnOrder.length > 0) {
    // También eliminar 'checkbox' del columnOrder si existe
    const filteredColumnOrder = columnOrder.filter(id => id !== 'checkbox');
    const columnMap = new Map(visibleColumns.map(col => [col.id, col]));
    visibleColumns = filteredColumnOrder
      .map(id => columnMap.get(id))
      .filter((col): col is TableColumn => col !== undefined)
      .concat(visibleColumns.filter(col => !filteredColumnOrder.includes(col.id)));
  }
  
  // Controlar la columna checkbox-2 según showCheckbox
  console.log('🎯 [CHECKBOX-2] Evaluando showCheckbox:', showCheckbox, '(showCheckbox !== false:', showCheckbox !== false, ')');
  if (showCheckbox !== false) {
    // Si no existe checkbox-2, crearla automáticamente al inicio
    const checkbox2Exists = visibleColumns.some(col => col.id === 'checkbox-2');
    console.log('🎯 [CHECKBOX-2] checkbox2Exists:', checkbox2Exists);
    if (!checkbox2Exists) {
      console.log('🔍 [CHECKBOX-2] Creando nueva columna checkbox-2 al inicio');
      // Crear una nueva columna de checkbox con id "checkbox-2"
      const newCheckboxColumn: TableColumn = {
        id: 'checkbox-2',
        title: '',
        type: undefined,
        visible: true,
        width: 60
      };
      
      // Insertar la nueva columna al inicio
      visibleColumns.unshift(newCheckboxColumn);
      console.log('🔍 [CHECKBOX-2] Columna agregada al inicio. IDs de columnas visibles:', visibleColumns.map(col => col.id));
    } else {
      console.log('🔍 [CHECKBOX-2] La columna checkbox-2 ya existe');
    }
  } else {
    // Si showCheckbox es false, eliminar checkbox-2 si existe
    const beforeFilter = visibleColumns.map(col => col.id);
    visibleColumns = visibleColumns.filter(col => col.id !== 'checkbox-2');
    const afterFilter = visibleColumns.map(col => col.id);
    console.log('🔍 [CHECKBOX-2] Columna checkbox-2 eliminada porque showCheckbox es false');
    console.log('🔍 [CHECKBOX-2] Antes del filtro:', beforeFilter);
    console.log('🔍 [CHECKBOX-2] Después del filtro:', afterFilter);
  }
  console.log('🎯 [CHECKBOX-2] Columnas finales antes de renderizar:', visibleColumns.map(col => col.id));
  
  // Estado de ordenamiento
  const sortColumnId = (options as any).sortColumnId || null;
  const sortDirection = (options as any).sortDirection || null;
  
  // Si hay un orden de filas especificado, reordenar según ese orden
  let orderedRows = [...rows];
  if (rowOrder.length > 0) {
    const rowMap = new Map(rows.map(row => [row.id, row]));
    orderedRows = rowOrder
      .map(id => rowMap.get(id))
      .filter((row): row is TableRow => row !== undefined)
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
  
  console.log('🔍 [HEADER ALIGNMENT] ========== INICIO ==========');
  console.log('📊 hasControls:', hasControls);
  console.log('📊 rowReorderable:', rowReorderable);
  console.log('📊 rowExpandable:', rowExpandable);
  console.log('📊 visibleColumns count:', visibleColumns.length);
  console.log('📊 visibleColumns IDs:', visibleColumns.map(col => col.id));

  // Función auxiliar para calcular el left de una columna fijada
  const calculatePinnedLeft = (column: TableColumn, columnIndex: number, allColumns: TableColumn[], hasControls: boolean, showCheckbox: boolean): number => {
    let left = 0;
    
    // Si hay controles, agregar su ancho (80px)
    if (hasControls) {
      left += 80;
    }
    
    // Si hay checkbox y está antes de esta columna, agregar su ancho (60px)
    if (showCheckbox) {
      const checkboxIndex = allColumns.findIndex(c => c.id === 'checkbox-2');
      if (checkboxIndex >= 0 && checkboxIndex < columnIndex) {
        left += 60;
      }
    }
    
    // Agregar ancho de todas las columnas fijadas anteriores
    for (let i = 0; i < columnIndex; i++) {
      const prevCol = allColumns[i];
      if (prevCol.pinned && prevCol.id !== 'checkbox-2') {
        left += prevCol.width || 150; // Usar width de la columna o 150px por defecto
      }
    }
    
    if (column.pinned) {
      console.log('📌 [PINNED LEFT] Columna', column.id, 'calculada left:', left, 'px', {
        hasControls,
        showCheckbox,
        columnIndex,
        prevPinnedCount: allColumns.slice(0, columnIndex).filter(c => c.pinned && c.id !== 'checkbox-2').length
      });
    }
    
    return left;
  };

  // Renderizar headers de columnas
  const columnHeadersHTML = visibleColumns
    .map((col, index) => {
      const pinnedLeft = col.pinned ? calculatePinnedLeft(col, index, visibleColumns, hasControls, showCheckbox !== false) : 0;
      return renderColumnHeader(col, columnReorderable, columnSortable, orderedRows, sortColumnId, sortDirection, showColumnMenu, pinnedLeft);
    })
    .join('');

  console.log('📊 columnHeadersHTML length:', columnHeadersHTML.length);
  console.log('📊 columnHeadersHTML preview:', columnHeadersHTML.substring(0, 200));

  // Renderizar filas
  const rowsHTML = orderedRows
    .map((row, index) => {
      // Calcular left para cada columna fijada en esta fila
      const pinnedLefts = visibleColumns.map((col, colIndex) => 
        col.pinned ? calculatePinnedLeft(col, colIndex, visibleColumns, hasControls, showCheckbox !== false) : 0
      );
      return renderRow(row, visibleColumns, index, rowReorderable, rowExpandable, hasControls, pinnedLefts);
    })
    .join('');

  console.log('📊 rowsHTML count:', orderedRows.length);
  console.log('📊 rowsHTML preview:', rowsHTML.substring(0, 300));

  const classes = [
    'ubits-data-table',
    className
  ].filter(Boolean).join(' ');

  // Agregar header vacío para la columna de controles si existe, para mantener alineación
  // Este header vacío se coloca ANTES de los headers de columnas para alinearlos con las filas
  const controlsHeader = hasControls ? `
    <th class="ubits-data-table__controls-column-header"></th>
  ` : '';

  console.log('📊 controlsHeader:', controlsHeader ? 'RENDERIZADO' : 'NO RENDERIZADO');
  console.log('📊 controlsHeader content:', controlsHeader);

  // Contar headers totales
  const headerCount = (controlsHeader ? 1 : 0) + visibleColumns.length;
  console.log('📊 Total headers count:', headerCount);
  console.log('📊 - controlsHeader:', controlsHeader ? 1 : 0);
  console.log('📊 - columnHeaders:', visibleColumns.length);

  // Estructura: tabla directamente o envuelta en contenedor scrollable
  const tableHTML = `
    <table class="${classes} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${controlsHeader}
          ${columnHeadersHTML}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${rowsHTML}
      </tbody>
    </table>
  `.trim();

  console.log('📊 [SCROLL] showVerticalScrollbar:', showVerticalScrollbar);
  console.log('📊 [SCROLL] showHorizontalScrollbar:', showHorizontalScrollbar);
  console.log('📊 [SCROLL] tableHTML length:', tableHTML.length);
  console.log('📊 [SCROLL] ¿Hay checkbox-2 en columnHeadersHTML?', columnHeadersHTML.includes('checkbox-2'));
  console.log('📊 [SCROLL] ¿Hay checkbox-2 en rowsHTML?', rowsHTML.includes('checkbox-2'));
  
  // Calcular ancho total de columnas para debug
  const totalColumnsWidth = visibleColumns.reduce((sum, col) => {
    const colWidth = col.width || 150;
    return sum + colWidth;
  });
  console.log('📊 [SCROLL] Ancho total de columnas calculado:', totalColumnsWidth, 'px');
  console.log('📊 [SCROLL] Número de columnas visibles:', visibleColumns.length);
  console.log('📊 [SCROLL] Anchos de columnas:', visibleColumns.map(c => ({ id: c.id, width: c.width || 150 })));
  
  // Determinar qué contenedor usar según los scrolls habilitados
  // NO afecta la lógica del checkbox ni de las columnas
  let html: string;
  if (showVerticalScrollbar || showHorizontalScrollbar) {
    // Construir clases CSS según los scrolls habilitados
    const scrollClasses = [];
    if (showVerticalScrollbar) {
      scrollClasses.push('ubits-data-table__scrollable-container--vertical');
    }
    if (showHorizontalScrollbar) {
      scrollClasses.push('ubits-data-table__scrollable-container--horizontal');
    }
    
    console.log('📊 [SCROLL] ✅ Envolviendo tabla en contenedor scrollable');
    console.log('📊 [SCROLL] Clases de scroll:', scrollClasses.join(' '));
    console.log('📊 [SCROLL] showHorizontalScrollbar activo:', showHorizontalScrollbar);
    console.log('📊 [SCROLL] Ancho total esperado de columnas:', totalColumnsWidth, 'px');
    
    html = `<div class="ubits-data-table__scrollable-container ${scrollClasses.join(' ')}">${tableHTML}</div>`;
    console.log('📊 [SCROLL] HTML con contenedor scrollable generado, length:', html.length);
    console.log('📊 [SCROLL] ¿HTML contiene scrollable-container?', html.includes('scrollable-container'));
    console.log('📊 [SCROLL] ¿HTML contiene scrollable-container--horizontal?', html.includes('scrollable-container--horizontal'));
    console.log('📊 [SCROLL] ¿HTML contiene checkbox-2?', html.includes('checkbox-2'));
  } else {
    console.log('📊 [SCROLL] ❌ NO envolviendo, usando tabla directamente');
    html = tableHTML;
  }

  console.log('📊 [SCROLL] HTML final length:', html.length);
  console.log('📊 [SCROLL] HTML final preview (primeros 800 chars):', html.substring(0, 800));
  console.log('📊 [SCROLL] ¿HTML final contiene checkbox-2?', html.includes('checkbox-2'));
  console.log('📊 [SCROLL] ¿HTML final contiene scrollable-container?', html.includes('scrollable-container'));
  console.log('📊 [SCROLL] ¿HTML final contiene scrollable-container--horizontal?', html.includes('scrollable-container--horizontal'));
  console.log('🔍 [HEADER ALIGNMENT] ========== FIN RENDER ==========');

  return html;
}

/**
 * Crea un elemento Data Table 3 programáticamente
 */
export function createDataTable(options: DataTableOptions): {
  element: HTMLElement;
  destroy: () => void;
  update: (newOptions: Partial<DataTableOptions>) => void;
} {
  const container = options.containerId 
    ? document.getElementById(options.containerId)
    : document.body;

  if (!container) {
    throw new Error(`Container with id "${options.containerId}" not found`);
  }

  const tableHTML = renderDataTable(options);
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
    console.log('🔍 [ICONS] Inicializando fallbacks de iconos:', {
      totalIcons: waIcons.length,
      waIconDefined: !!customElements.get('wa-icon')
    });
    
    waIcons.forEach((waIcon, index) => {
      const faIcon = waIcon.nextElementSibling as HTMLElement;
      const iconName = waIcon.getAttribute('name');
      
      console.log(`🔍 [ICONS] Icono ${index + 1}:`, {
        name: iconName,
        hasNextSibling: !!faIcon,
        nextSiblingTag: faIcon?.tagName,
        waIconDisplay: window.getComputedStyle(waIcon as HTMLElement).display,
        waIconWidth: window.getComputedStyle(waIcon as HTMLElement).width,
        waIconHeight: window.getComputedStyle(waIcon as HTMLElement).height,
        waIconOpacity: window.getComputedStyle(waIcon as HTMLElement).opacity
      });
      
      if (faIcon && faIcon.tagName === 'I') {
        if (customElements.get('wa-icon')) {
          (waIcon as HTMLElement).style.display = 'inline-block';
          (waIcon as HTMLElement).style.width = '12px';
          (waIcon as HTMLElement).style.height = '12px';
          (waIcon as HTMLElement).style.opacity = '1';
          faIcon.style.display = 'none';
          console.log(`✅ [ICONS] Icono ${index + 1} (${iconName}): usando wa-icon`);
        } else {
          // Si wa-icon no está definido, ocultar wa-icon y mostrar fallback
          (waIcon as HTMLElement).style.display = 'none';
          faIcon.style.display = 'inline-block';
          faIcon.style.fontSize = '12px';
          faIcon.style.width = '12px';
          faIcon.style.height = '12px';
          console.log(`⚠️ [ICONS] Icono ${index + 1} (${iconName}): usando fallback`);
        }
      }
    });
  };

  // Función para renderizar
  const render = () => {
    const newHTML = renderDataTable(
      { ...currentOptions, sortColumnId, sortDirection } as any, 
      columnOrder, 
      rowOrder
    );
    
    element.innerHTML = newHTML.trim();
    
    attachEventListeners();
    initializeIconFallbacks();
    
    // Logs para verificar estilos de padding después del renderizado
    console.log('🔍 [PADDING CHECK] ========== INICIANDO VERIFICACIÓN ==========');
    console.log('📊 Element disponible:', !!element);
    console.log('📊 Element tagName:', element.tagName);
    console.log('📊 Element className:', element.className);
    console.log('📊 Element innerHTML length:', element.innerHTML.length);
    console.log('📊 Element innerHTML preview (primeros 500 chars):', element.innerHTML.substring(0, 500));
    
    // Ejecutar inmediatamente y también después de un delay
    const checkPadding = () => {
      try {
      
        console.log('🔍 [PADDING CHECK] ========== DESPUÉS DEL RENDERIZADO ==========');
        console.log('📊 element.tagName:', element.tagName);
        console.log('📊 element.className:', element.className);
        
        // Determinar si hay contenedor scrollable - calcular dentro de la función para que esté actualizado
        const scrollableContainer = element.classList.contains('ubits-data-table__scrollable-container') 
          ? element 
          : element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
        const actualTable = scrollableContainer 
          ? scrollableContainer.querySelector('.ubits-data-table__table') as HTMLElement
          : element.querySelector('.ubits-data-table__table') as HTMLElement || element;
        
        console.log('📊 scrollableContainer encontrado:', !!scrollableContainer);
        console.log('📊 actualTable encontrado:', !!actualTable);
        console.log('📊 actualTable tagName:', actualTable?.tagName);
        
        // Verificar columna de controles - buscar en la tabla real, no en el contenedor scrollable
        const searchRoot = actualTable || element;
        const controlsColumns = searchRoot.querySelectorAll('.ubits-data-table__controls-column');
        const controlsHeaders = searchRoot.querySelectorAll('.ubits-data-table__controls-column-header');
        
        console.log('📊 [CONTROLS] Elementos encontrados:', {
          columns: controlsColumns.length,
          headers: controlsHeaders.length
        });
        
        if (controlsColumns.length > 0) {
          const controlsCol = controlsColumns[0] as HTMLElement;
          const computed = window.getComputedStyle(controlsCol);
          console.log('📊 [CONTROLS COLUMN] Estilos computados:');
          console.log('  - padding:', computed.padding);
          console.log('  - paddingTop:', computed.paddingTop);
          console.log('  - paddingRight:', computed.paddingRight);
          console.log('  - paddingBottom:', computed.paddingBottom);
          console.log('  - paddingLeft:', computed.paddingLeft);
          console.log('  - width:', computed.width);
          console.log('  - minWidth:', computed.minWidth);
          console.log('  - maxWidth:', computed.maxWidth);
          console.log('  - boxSizing:', computed.boxSizing);
          console.log('  - marginLeft:', computed.marginLeft);
          console.log('  - marginRight:', computed.marginRight);
          
          // Verificar la primera celda de datos después de controles
          const firstDataCell = controlsCol.nextElementSibling as HTMLElement;
          if (firstDataCell) {
            const firstDataComputed = window.getComputedStyle(firstDataCell);
            console.log('📊 [FIRST DATA CELL] Primera celda después de controles:');
            console.log('  - tagName:', firstDataCell.tagName);
            console.log('  - className:', firstDataCell.className);
            console.log('  - padding:', firstDataComputed.padding);
            console.log('  - paddingLeft:', firstDataComputed.paddingLeft);
            console.log('  - marginLeft:', firstDataComputed.marginLeft);
            console.log('  - width:', firstDataComputed.width);
            
            // Calcular distancia entre controles y primera celda
            const controlsRect = controlsCol.getBoundingClientRect();
            const firstDataRect = firstDataCell.getBoundingClientRect();
            const gap = firstDataRect.left - controlsRect.right;
            console.log('📊 [GAP CALCULATION] Espacio entre controles y primera celda:');
            console.log('  - controlsRect.right:', controlsRect.right);
            console.log('  - firstDataRect.left:', firstDataRect.left);
            console.log('  - GAP calculado:', gap, 'px');
          } else {
            console.log('⚠️ [FIRST DATA CELL] No se encontró celda de datos después de controles');
          }
        } else {
          console.log('⚠️ [CONTROLS COLUMN] No se encontró ninguna columna de controles');
        }
        
        if (controlsHeaders.length > 0) {
          const controlsHeader = controlsHeaders[0] as HTMLElement;
          const computed = window.getComputedStyle(controlsHeader);
          console.log('📊 [CONTROLS HEADER] Estilos computados:');
          console.log('  - padding:', computed.padding);
          console.log('  - paddingTop:', computed.paddingTop);
          console.log('  - paddingRight:', computed.paddingRight);
          console.log('  - paddingBottom:', computed.paddingBottom);
          console.log('  - paddingLeft:', computed.paddingLeft);
          console.log('  - width:', computed.width);
          console.log('  - minWidth:', computed.minWidth);
          console.log('  - maxWidth:', computed.maxWidth);
          console.log('  - boxSizing:', computed.boxSizing);
          console.log('  - marginLeft:', computed.marginLeft);
          console.log('  - marginRight:', computed.marginRight);
        } else {
          console.log('⚠️ [CONTROLS HEADER] No se encontró ningún header de controles');
        }
        
        // Verificar columna de checkbox
        // Buscar checkbox-2 o cualquier checkbox que empiece con checkbox-
        // Buscar en la tabla real, no en el contenedor scrollable
        const checkboxCells = searchRoot.querySelectorAll('.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]');
        const checkboxHeaders = searchRoot.querySelectorAll('.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"], .ubits-data-table__column-header--checkbox[data-column-id^="checkbox-"]');
        
        console.log('📊 [CHECKBOX] Buscando checkbox cells con selector:', '.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]');
        console.log('📊 [CHECKBOX] Elementos encontrados:', {
          cells: checkboxCells.length,
          headers: checkboxHeaders.length
        });
        
        // También buscar dentro del contenedor scrollable si existe (ya calculado arriba)
        if (scrollableContainer) {
          console.log('📊 [CHECKBOX] ✅ Contenedor scrollable encontrado, buscando checkbox dentro de él');
          const checkboxCellsInScrollable = scrollableContainer.querySelectorAll('.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]');
          const checkboxHeadersInScrollable = scrollableContainer.querySelectorAll('.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"], .ubits-data-table__column-header--checkbox[data-column-id^="checkbox-"]');
          console.log('📊 [CHECKBOX] Elementos encontrados dentro del scrollable:', {
            cells: checkboxCellsInScrollable.length,
            headers: checkboxHeadersInScrollable.length
          });
          
          if (checkboxCellsInScrollable.length > 0) {
            const checkboxCell = checkboxCellsInScrollable[0] as HTMLElement;
            const computed = window.getComputedStyle(checkboxCell);
            console.log('📊 [CHECKBOX CELL] Estilos computados (dentro scrollable):');
            console.log('  - padding:', computed.padding);
            console.log('  - paddingTop:', computed.paddingTop);
            console.log('  - paddingRight:', computed.paddingRight);
            console.log('  - paddingBottom:', computed.paddingBottom);
            console.log('  - paddingLeft:', computed.paddingLeft);
            console.log('  - width:', computed.width);
            console.log('  - minWidth:', computed.minWidth);
            console.log('  - maxWidth:', computed.maxWidth);
            console.log('  - boxSizing:', computed.boxSizing);
            console.log('  - marginLeft:', computed.marginLeft);
            console.log('  - marginRight:', computed.marginRight);
            console.log('  - position:', computed.position);
            console.log('  - left:', computed.left);
            console.log('  - zIndex:', computed.zIndex);
          }
        } else {
          console.log('📊 [CHECKBOX] ❌ No hay contenedor scrollable, buscando directamente en element');
        }
        
        if (checkboxCells.length > 0) {
          const checkboxCell = checkboxCells[0] as HTMLElement;
          const computed = window.getComputedStyle(checkboxCell);
          console.log('📊 [CHECKBOX CELL] Estilos computados:');
          console.log('  - padding:', computed.padding);
          console.log('  - paddingTop:', computed.paddingTop);
          console.log('  - paddingRight:', computed.paddingRight);
          console.log('  - paddingBottom:', computed.paddingBottom);
          console.log('  - paddingLeft:', computed.paddingLeft);
          console.log('  - width:', computed.width);
          console.log('  - minWidth:', computed.minWidth);
          console.log('  - maxWidth:', computed.maxWidth);
          console.log('  - boxSizing:', computed.boxSizing);
          console.log('  - marginLeft:', computed.marginLeft);
          console.log('  - marginRight:', computed.marginRight);
          console.log('  - position:', computed.position);
          console.log('  - left:', computed.left);
          console.log('  - zIndex:', computed.zIndex);
        } else {
          console.log('⚠️ [CHECKBOX CELL] No se encontró ninguna celda de checkbox');
          // Intentar buscar de otra manera
          const allCells = element.querySelectorAll('td[data-column-id]');
          console.log('📊 [CHECKBOX] Total celdas con data-column-id:', allCells.length);
          allCells.forEach((cell, idx) => {
            const colId = (cell as HTMLElement).getAttribute('data-column-id');
            if (colId && colId.includes('checkbox')) {
              console.log(`📊 [CHECKBOX] Celda ${idx} tiene data-column-id="${colId}"`);
            }
          });
        }
        
        if (checkboxHeaders.length > 0) {
          const checkboxHeader = checkboxHeaders[0] as HTMLElement;
          const computed = window.getComputedStyle(checkboxHeader);
          console.log('📊 [CHECKBOX HEADER] Estilos computados:');
          console.log('  - padding:', computed.padding);
          console.log('  - paddingTop:', computed.paddingTop);
          console.log('  - paddingRight:', computed.paddingRight);
          console.log('  - paddingBottom:', computed.paddingBottom);
          console.log('  - paddingLeft:', computed.paddingLeft);
          console.log('  - width:', computed.width);
          console.log('  - minWidth:', computed.minWidth);
          console.log('  - maxWidth:', computed.maxWidth);
          console.log('  - boxSizing:', computed.boxSizing);
          console.log('  - marginLeft:', computed.marginLeft);
          console.log('  - marginRight:', computed.marginRight);
          console.log('  - position:', computed.position);
          console.log('  - left:', computed.left);
          console.log('  - zIndex:', computed.zIndex);
        } else {
          console.log('⚠️ [CHECKBOX HEADER] No se encontró ningún header de checkbox');
          // Intentar buscar de otra manera
          const allHeaders = element.querySelectorAll('th[data-column-id]');
          console.log('📊 [CHECKBOX] Total headers con data-column-id:', allHeaders.length);
          allHeaders.forEach((header, idx) => {
            const colId = (header as HTMLElement).getAttribute('data-column-id');
            if (colId && colId.includes('checkbox')) {
              console.log(`📊 [CHECKBOX] Header ${idx} tiene data-column-id="${colId}"`);
            }
          });
        }
        
        // Verificar distancia visual entre checkbox y controles
        if (checkboxCells.length > 0 && controlsColumns.length > 0) {
          const checkboxCell = checkboxCells[0] as HTMLElement;
          const controlsCol = controlsColumns[0] as HTMLElement;
          const checkboxRect = checkboxCell.getBoundingClientRect();
          const controlsRect = controlsCol.getBoundingClientRect();
          const distance = controlsRect.left - checkboxRect.right;
          console.log('📊 [DISTANCE] Distancia entre checkbox y controles:', distance, 'px');
          console.log('  - checkbox right:', checkboxRect.right);
          console.log('  - controls left:', controlsRect.left);
          console.log('  - checkbox width:', checkboxRect.width);
          console.log('  - controls width:', controlsRect.width);
        }
        
        // ========== VERIFICACIÓN DE SCROLL HORIZONTAL ==========
        console.log('🔍 [HORIZONTAL SCROLL] ========== VERIFICACIÓN SCROLL HORIZONTAL ==========');
        
        // Buscar contenedor scrollable
        const horizontalScrollContainer = element.classList.contains('ubits-data-table__scrollable-container--horizontal')
          ? element
          : element.querySelector('.ubits-data-table__scrollable-container--horizontal') as HTMLElement;
        
        if (horizontalScrollContainer) {
          console.log('✅ [HORIZONTAL SCROLL] Contenedor scrollable horizontal encontrado');
          const containerComputed = window.getComputedStyle(horizontalScrollContainer);
          const containerRect = horizontalScrollContainer.getBoundingClientRect();
          
          console.log('📊 [HORIZONTAL SCROLL] Estilos del contenedor:');
          console.log('  - className:', horizontalScrollContainer.className);
          console.log('  - overflow-x:', containerComputed.overflowX);
          console.log('  - overflow-y:', containerComputed.overflowY);
          console.log('  - width:', containerComputed.width);
          console.log('  - max-width:', containerComputed.maxWidth);
          console.log('  - min-width:', containerComputed.minWidth);
          console.log('  - box-sizing:', containerComputed.boxSizing);
          console.log('  - position:', containerComputed.position);
          console.log('  - display:', containerComputed.display);
          
          console.log('📊 [HORIZONTAL SCROLL] Dimensiones del contenedor:');
          console.log('  - clientWidth:', horizontalScrollContainer.clientWidth);
          console.log('  - scrollWidth:', horizontalScrollContainer.scrollWidth);
          console.log('  - offsetWidth:', horizontalScrollContainer.offsetWidth);
          console.log('  - getBoundingClientRect().width:', containerRect.width);
          
          // Verificar si hay scroll disponible
          const hasHorizontalScroll = horizontalScrollContainer.scrollWidth > horizontalScrollContainer.clientWidth;
          console.log('📊 [HORIZONTAL SCROLL] ¿Hay scroll disponible?', hasHorizontalScroll);
          console.log('  - scrollWidth:', horizontalScrollContainer.scrollWidth);
          console.log('  - clientWidth:', horizontalScrollContainer.clientWidth);
          console.log('  - Diferencia:', horizontalScrollContainer.scrollWidth - horizontalScrollContainer.clientWidth, 'px');
          
          // Buscar la tabla dentro del contenedor
          const tableInContainer = horizontalScrollContainer.querySelector('.ubits-data-table__table') as HTMLElement;
          if (tableInContainer) {
            const tableComputed = window.getComputedStyle(tableInContainer);
            const tableRect = tableInContainer.getBoundingClientRect();
            
            console.log('📊 [HORIZONTAL SCROLL] Estilos de la tabla:');
            console.log('  - width:', tableComputed.width);
            console.log('  - min-width:', tableComputed.minWidth);
            console.log('  - max-width:', tableComputed.maxWidth);
            console.log('  - getBoundingClientRect().width:', tableRect.width);
            
            // Calcular ancho total de las columnas
            const allColumns = tableInContainer.querySelectorAll('th[data-column-id], td[data-column-id]');
            let totalColumnWidth = 0;
            const columnWidths: { [key: string]: number } = {};
            
            // Agrupar por column-id
            const columnIds = new Set<string>();
            allColumns.forEach(col => {
              const colId = (col as HTMLElement).getAttribute('data-column-id');
              if (colId) columnIds.add(colId);
            });
            
            columnIds.forEach(colId => {
              const firstCol = tableInContainer.querySelector(`[data-column-id="${colId}"]`) as HTMLElement;
              if (firstCol) {
                const colWidth = firstCol.getBoundingClientRect().width;
                columnWidths[colId] = colWidth;
                totalColumnWidth += colWidth;
              }
            });
            
            console.log('📊 [HORIZONTAL SCROLL] Anchos de columnas:');
            console.log('  - Total columnas encontradas:', columnIds.size);
            console.log('  - Ancho total calculado:', totalColumnWidth, 'px');
            console.log('  - Ancho del contenedor:', horizontalScrollContainer.clientWidth, 'px');
            console.log('  - Ancho de la tabla:', tableRect.width, 'px');
            console.log('  - Anchos por columna:', columnWidths);
            
            // Verificar si la tabla es más ancha que el contenedor
            const tableWiderThanContainer = tableRect.width > horizontalScrollContainer.clientWidth;
            console.log('📊 [HORIZONTAL SCROLL] ¿La tabla es más ancha que el contenedor?', tableWiderThanContainer);
            console.log('  - Tabla width:', tableRect.width, 'px');
            console.log('  - Contenedor clientWidth:', horizontalScrollContainer.clientWidth, 'px');
            console.log('  - Diferencia:', tableRect.width - horizontalScrollContainer.clientWidth, 'px');
          } else {
            console.log('⚠️ [HORIZONTAL SCROLL] No se encontró la tabla dentro del contenedor');
          }
          
          // Verificar el contenedor padre
          const parentContainer = horizontalScrollContainer.parentElement;
          if (parentContainer) {
            const parentComputed = window.getComputedStyle(parentContainer);
            const parentRect = parentContainer.getBoundingClientRect();
            console.log('📊 [HORIZONTAL SCROLL] Contenedor padre:');
            console.log('  - tagName:', parentContainer.tagName);
            console.log('  - className:', parentContainer.className);
            console.log('  - width:', parentComputed.width);
            console.log('  - max-width:', parentComputed.maxWidth);
            console.log('  - getBoundingClientRect().width:', parentRect.width);
          }
        } else {
          console.log('❌ [HORIZONTAL SCROLL] No se encontró contenedor scrollable horizontal');
          console.log('📊 [HORIZONTAL SCROLL] Element classes:', element.className);
          console.log('📊 [HORIZONTAL SCROLL] Element innerHTML preview:', element.innerHTML.substring(0, 500));
          
          // Buscar cualquier contenedor scrollable
          const anyScrollContainer = element.querySelector('.ubits-data-table__scrollable-container');
          if (anyScrollContainer) {
            console.log('📊 [HORIZONTAL SCROLL] Se encontró un contenedor scrollable pero sin clase horizontal:');
            console.log('  - className:', (anyScrollContainer as HTMLElement).className);
          }
        }
        
        console.log('🔍 [HORIZONTAL SCROLL] ========== FIN VERIFICACIÓN ==========');
        console.log('🔍 [PADDING CHECK] ========== FIN ==========');
      } catch (error) {
        console.error('❌ [PADDING CHECK] Error:', error);
      }
    };
    
    // Ejecutar inmediatamente
    checkPadding();
    
    // También ejecutar después de un delay para asegurar que el CSS esté aplicado
    setTimeout(checkPadding, 100);
    setTimeout(checkPadding, 500);
    setTimeout(checkPadding, 1000);
  };
  
  // Función para adjuntar event listeners
  const attachEventListeners = () => {
    try {
    // Drag & Drop de columnas
    if (currentOptions.columnReorderable) {
      if (!element.hasAttribute('data-column-drag-listener')) {
        element.setAttribute('data-column-drag-listener', 'true');
        
        element.addEventListener('dragstart', (e) => {
          const target = e.target as HTMLElement;
          const dragHandle = target.closest('.ubits-data-table__column-drag-handle');
          if (dragHandle) {
            draggedColumnId = dragHandle.getAttribute('data-column-id');
            if (draggedColumnId) {
              e.dataTransfer!.effectAllowed = 'move';
              e.dataTransfer!.setData('text/plain', draggedColumnId);
              const header = dragHandle.closest('.ubits-data-table__column-header');
              if (header) {
                header.classList.add('ubits-data-table__column-header--dragging');
              }
            }
          }
        }, true);
        
        element.addEventListener('dragend', (e) => {
          const target = e.target as HTMLElement;
          const dragHandle = target.closest('.ubits-data-table__column-drag-handle');
          if (dragHandle) {
            const header = dragHandle.closest('.ubits-data-table__column-header');
            if (header) {
              header.classList.remove('ubits-data-table__column-header--dragging');
            }
          }
          draggedColumnId = null;
        }, true);
        
        element.addEventListener('dragover', (e) => {
          const target = e.target as HTMLElement;
          const header = target.closest('.ubits-data-table__column-header');
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
              header.classList.add('ubits-data-table__column-header--drag-over');
            }
          }
        }, true);
        
        element.addEventListener('dragleave', (e) => {
          const target = e.target as HTMLElement;
          const header = target.closest('.ubits-data-table__column-header');
          if (header) {
            header.classList.remove('ubits-data-table__column-header--drag-over');
          }
        }, true);
        
        element.addEventListener('drop', (e) => {
          const target = e.target as HTMLElement;
          const header = target.closest('.ubits-data-table__column-header');
          if (header) {
            e.preventDefault();
            header.classList.remove('ubits-data-table__column-header--drag-over');
            
            const columnId = header.getAttribute('data-column-id');
            if (!columnId || !draggedColumnId) return;
            
            // Verificar si alguna de las columnas es checkbox
            const isDraggedCheckbox = draggedColumnId === 'checkbox' || draggedColumnId.startsWith('checkbox-');
            const isTargetCheckbox = columnId === 'checkbox' || columnId.startsWith('checkbox-');
            
            // No permitir arrastrar la columna de checkbox
            if (isDraggedCheckbox) {
              return;
            }
            
            // No permitir hacer drop sobre la columna de checkbox
            if (isTargetCheckbox) {
              return;
            }
            
            if (draggedColumnId !== columnId) {
              const currentIndex = columnOrder.indexOf(draggedColumnId);
              const targetIndex = columnOrder.indexOf(columnId);
              
              // Encontrar el índice de la columna de checkbox en el orden actual
              const checkboxColumnIndex = columnOrder.findIndex(id => id === 'checkbox' || id.startsWith('checkbox-'));
              
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
                return;
              }
              
              // Validar: si estamos moviendo desde después de checkbox, no permitir mover antes de checkbox
              if (currentIndex > checkboxColumnIndex && targetIndex < checkboxColumnIndex) {
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
          const dragHandle = target.closest('.ubits-data-table__row-drag-handle');
          if (!dragHandle) return;
          
          const rowIdStr = dragHandle.getAttribute('data-row-id');
          if (rowIdStr) {
            const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
            draggedRowId = rowId;
            e.dataTransfer!.effectAllowed = 'move';
            e.dataTransfer!.setData('text/plain', String(rowId));
            const row = dragHandle.closest('.ubits-data-table__row');
            if (row) {
              row.classList.add('ubits-data-table__row--dragging');
            }
          }
        }, true);
        
        element.addEventListener('dragend', (e) => {
          const target = e.target as HTMLElement;
          const dragHandle = target.closest('.ubits-data-table__row-drag-handle');
          if (dragHandle) {
            const row = dragHandle.closest('.ubits-data-table__row');
            if (row) {
              row.classList.remove('ubits-data-table__row--dragging');
            }
          }
          draggedRowId = null;
        }, true);
        
        element.addEventListener('dragover', (e) => {
          const target = e.target as HTMLElement;
          const row = target.closest('.ubits-data-table__row');
          if (row && draggedRowId !== null) {
            const rowIdStr = row.getAttribute('data-row-id');
            if (rowIdStr) {
              const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
              if (rowId !== draggedRowId) {
                e.preventDefault();
                e.dataTransfer!.dropEffect = 'move';
                row.classList.add('ubits-data-table__row--drag-over');
              }
            }
          }
        }, true);
        
        element.addEventListener('dragleave', (e) => {
          const target = e.target as HTMLElement;
          const row = target.closest('.ubits-data-table__row');
          if (row) {
            row.classList.remove('ubits-data-table__row--drag-over');
          }
        }, true);
        
        element.addEventListener('drop', (e) => {
          const target = e.target as HTMLElement;
          const row = target.closest('.ubits-data-table__row');
          if (row) {
            e.preventDefault();
            row.classList.remove('ubits-data-table__row--drag-over');
            
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
    
    // Comparar estilos del drag handle y botón de ordenamiento
    const dragHandles = element.querySelectorAll('.ubits-data-table__column-drag-handle');
    const sortButtons = element.querySelectorAll('[data-sort-button="true"]');
    
    if (dragHandles.length > 0 && sortButtons.length > 0) {
      const dh = dragHandles[0] as HTMLElement;
      const sb = sortButtons[0] as HTMLElement;
      const dhComputed = window.getComputedStyle(dh);
      const sbComputed = window.getComputedStyle(sb);
      
      const dhIcon = dh.querySelector('wa-icon') || dh.querySelector('i');
      const sbIcon = sb.querySelector('wa-icon') || sb.querySelector('i');
      const dhIconComputed = dhIcon ? window.getComputedStyle(dhIcon as HTMLElement) : null;
      const sbIconComputed = sbIcon ? window.getComputedStyle(sbIcon as HTMLElement) : null;
      
      console.log('🔍 [STYLES COMPARISON] ========== DRAG HANDLE ==========');
      console.log('Container - display:', dhComputed.display);
      console.log('Container - width:', dhComputed.width);
      console.log('Container - height:', dhComputed.height);
      console.log('Container - padding:', dhComputed.padding);
      console.log('Container - margin:', dhComputed.margin);
      console.log('Container - color:', dhComputed.color);
      console.log('Container - backgroundColor:', dhComputed.backgroundColor);
      console.log('Container - border:', dhComputed.border);
      console.log('Container - borderRadius:', dhComputed.borderRadius);
      console.log('Container - cursor:', dhComputed.cursor);
      console.log('Container - fontSize:', dhComputed.fontSize);
      console.log('Container - lineHeight:', dhComputed.lineHeight);
      
      if (dhIconComputed) {
        console.log('Icon - display:', dhIconComputed.display);
        console.log('Icon - width:', dhIconComputed.width);
        console.log('Icon - height:', dhIconComputed.height);
        console.log('Icon - fontSize:', dhIconComputed.fontSize);
        console.log('Icon - color:', dhIconComputed.color);
        console.log('Icon - margin:', dhIconComputed.margin);
        console.log('Icon - padding:', dhIconComputed.padding);
        console.log('Icon - lineHeight:', dhIconComputed.lineHeight);
        console.log('Icon - verticalAlign:', dhIconComputed.verticalAlign);
      } else {
        console.log('Icon: NO ICON FOUND');
      }
      
      if (dhIcon) {
        console.log('Icon Element - tagName:', dhIcon.tagName);
        console.log('Icon Element - className:', dhIcon.className);
        console.log('Icon Element - innerHTML:', dhIcon.innerHTML.substring(0, 100));
      } else {
        console.log('Icon Element: NO ICON ELEMENT');
      }
      
      console.log('🔍 [STYLES COMPARISON] ========== SORT BUTTON ==========');
      console.log('Container - display:', sbComputed.display);
      console.log('Container - width:', sbComputed.width);
      console.log('Container - height:', sbComputed.height);
      console.log('Container - padding:', sbComputed.padding);
      console.log('Container - margin:', sbComputed.margin);
      console.log('Container - color:', sbComputed.color);
      console.log('Container - backgroundColor:', sbComputed.backgroundColor);
      console.log('Container - border:', sbComputed.border);
      console.log('Container - borderRadius:', sbComputed.borderRadius);
      console.log('Container - cursor:', sbComputed.cursor);
      console.log('Container - fontSize:', sbComputed.fontSize);
      console.log('Container - lineHeight:', sbComputed.lineHeight);
      
      if (sbIconComputed) {
        console.log('Icon - display:', sbIconComputed.display);
        console.log('Icon - width:', sbIconComputed.width);
        console.log('Icon - height:', sbIconComputed.height);
        console.log('Icon - fontSize:', sbIconComputed.fontSize);
        console.log('Icon - color:', sbIconComputed.color);
        console.log('Icon - margin:', sbIconComputed.margin);
        console.log('Icon - padding:', sbIconComputed.padding);
        console.log('Icon - lineHeight:', sbIconComputed.lineHeight);
        console.log('Icon - verticalAlign:', sbIconComputed.verticalAlign);
      } else {
        console.log('Icon: NO ICON FOUND');
      }
      
      if (sbIcon) {
        console.log('Icon Element - tagName:', sbIcon.tagName);
        console.log('Icon Element - className:', sbIcon.className);
        console.log('Icon Element - innerHTML:', sbIcon.innerHTML.substring(0, 100));
      } else {
        console.log('Icon Element: NO ICON ELEMENT');
      }
      
      console.log('🔍 [STYLES COMPARISON] ========== DIFFERENCES ==========');
      const differences: string[] = [];
      if (dhComputed.width !== sbComputed.width) differences.push(`width: ${dhComputed.width} vs ${sbComputed.width}`);
      if (dhComputed.height !== sbComputed.height) differences.push(`height: ${dhComputed.height} vs ${sbComputed.height}`);
      if (dhComputed.padding !== sbComputed.padding) differences.push(`padding: ${dhComputed.padding} vs ${sbComputed.padding}`);
      if (dhComputed.margin !== sbComputed.margin) differences.push(`margin: ${dhComputed.margin} vs ${sbComputed.margin}`);
      if (dhComputed.color !== sbComputed.color) differences.push(`color: ${dhComputed.color} vs ${sbComputed.color}`);
      if (dhComputed.backgroundColor !== sbComputed.backgroundColor) differences.push(`backgroundColor: ${dhComputed.backgroundColor} vs ${sbComputed.backgroundColor}`);
      if (dhComputed.border !== sbComputed.border) differences.push(`border: ${dhComputed.border} vs ${sbComputed.border}`);
      if (dhComputed.borderRadius !== sbComputed.borderRadius) differences.push(`borderRadius: ${dhComputed.borderRadius} vs ${sbComputed.borderRadius}`);
      if (dhIconComputed && sbIconComputed) {
        if (dhIconComputed.color !== sbIconComputed.color) differences.push(`icon.color: ${dhIconComputed.color} vs ${sbIconComputed.color}`);
        if (dhIconComputed.fontSize !== sbIconComputed.fontSize) differences.push(`icon.fontSize: ${dhIconComputed.fontSize} vs ${sbIconComputed.fontSize}`);
        if (dhIconComputed.width !== sbIconComputed.width) differences.push(`icon.width: ${dhIconComputed.width} vs ${sbIconComputed.width}`);
        if (dhIconComputed.height !== sbIconComputed.height) differences.push(`icon.height: ${dhIconComputed.height} vs ${sbIconComputed.height}`);
      }
      
      if (differences.length > 0) {
        console.log('❌ DIFERENCIAS ENCONTRADAS:');
        differences.forEach((diff, index) => {
          console.log(`  ${index + 1}. ${diff}`);
        });
      } else {
        console.log('✅ NO DIFFERENCES FOUND');
      }
    }
    
    console.log('🔍 [SORT BUTTON] Botones encontrados:', {
      count: sortButtons.length,
      buttons: Array.from(sortButtons).map(btn => ({
        columnId: btn.getAttribute('data-column-id'),
        classes: btn.className,
        innerHTML: btn.innerHTML.substring(0, 100),
        waIcons: btn.querySelectorAll('wa-icon').length,
        computedStyle: {
          display: window.getComputedStyle(btn as HTMLElement).display,
          width: window.getComputedStyle(btn as HTMLElement).width,
          height: window.getComputedStyle(btn as HTMLElement).height,
          visibility: window.getComputedStyle(btn as HTMLElement).visibility,
          opacity: window.getComputedStyle(btn as HTMLElement).opacity,
          color: window.getComputedStyle(btn as HTMLElement).color,
          backgroundColor: window.getComputedStyle(btn as HTMLElement).backgroundColor,
          padding: window.getComputedStyle(btn as HTMLElement).padding,
          margin: window.getComputedStyle(btn as HTMLElement).margin
        }
      }))
    });
    
    sortButtons.forEach(button => {
      const btn = button as HTMLElement;
      const waIcons = btn.querySelectorAll('wa-icon');
      const isActive = btn.classList.contains('ubits-data-table__column-sort--active');
      
      console.log('🔍 [SORT BUTTON] Verificando botón:', {
        columnId: btn.getAttribute('data-column-id'),
        isActive,
        waIconsCount: waIcons.length,
        innerHTML: btn.innerHTML.substring(0, 150),
        waIcons: Array.from(waIcons).map(icon => {
          const computed = window.getComputedStyle(icon);
          return {
            name: icon.getAttribute('name'),
            display: computed.display,
            width: computed.width,
            height: computed.height,
            opacity: computed.opacity,
            visibility: computed.visibility,
            color: computed.color,
            fontSize: computed.fontSize,
            isConnected: icon.isConnected,
            parentElement: icon.parentElement?.tagName,
            nextSibling: icon.nextSibling?.nodeName
          };
        }),
        buttonComputedStyle: {
          display: window.getComputedStyle(btn).display,
          width: window.getComputedStyle(btn).width,
          height: window.getComputedStyle(btn).height,
          opacity: window.getComputedStyle(btn).opacity,
          visibility: window.getComputedStyle(btn).visibility
        }
      });
      
      // Verificar específicamente el icono arrow-down-z-a
      const arrowDownIcon = Array.from(waIcons).find(icon => icon.getAttribute('name') === 'arrow-down-z-a');
      if (arrowDownIcon) {
        console.log('🔍 [SORT BUTTON] Icono arrow-down-z-a encontrado:', {
          element: arrowDownIcon,
          name: arrowDownIcon.getAttribute('name'),
          computedStyle: {
            display: window.getComputedStyle(arrowDownIcon as HTMLElement).display,
            width: window.getComputedStyle(arrowDownIcon as HTMLElement).width,
            height: window.getComputedStyle(arrowDownIcon as HTMLElement).height,
            opacity: window.getComputedStyle(arrowDownIcon as HTMLElement).opacity,
            visibility: window.getComputedStyle(arrowDownIcon as HTMLElement).visibility,
            color: window.getComputedStyle(arrowDownIcon as HTMLElement).color
          },
          inlineStyle: (arrowDownIcon as HTMLElement).style.cssText,
          classes: arrowDownIcon.className,
          parentClasses: arrowDownIcon.parentElement?.className
        });
      }
      
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const columnId = button.getAttribute('data-column-id')!;
        
        console.log('🔍 [SORT BUTTON] Click en botón:', {
          columnId,
          currentSortColumnId: sortColumnId,
          currentSortDirection: sortDirection
        });
        
        // Si ya está ordenando esta columna, cambiar dirección
        if (sortColumnId === columnId) {
          sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          // Nueva columna, empezar con asc
          sortColumnId = columnId;
          sortDirection = 'asc';
        }
        
        console.log('✅ [SORT BUTTON] Nuevo estado:', {
          sortColumnId,
          sortDirection
        });
        
        if (currentOptions.onSort) {
          currentOptions.onSort(columnId, sortDirection!);
        }
        
        render();
      });
    });
    
    // Botones de menú (3 puntos) - manejar click para mostrar dropdown
    const menuButtons = element.querySelectorAll('[data-menu-button="true"]');
    
    menuButtons.forEach((button) => {
      const btn = button as HTMLElement;
      const columnId = btn.getAttribute('data-column-id');
      
      if (!columnId) {
        return;
      }
      
      // Verificar que la columna existe
      const column = currentOptions.columns.find(col => col.id === columnId);
      if (!column) {
        return;
      }
      
      // Crear contenedor para el dropdown del menú de columna
      const headerCell = btn.closest('th');
      if (!headerCell) {
        console.warn('⚠️ [MENU BUTTON] No se encontró el header cell');
        return;
      }
      
      // Crear dropdown si no existe
      let dropdown = headerCell.querySelector('.ubits-data-table__column-menu-dropdown') as HTMLElement;
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'ubits-data-table__column-menu-dropdown';
        dropdown.setAttribute('data-column-id', columnId);
        // Solo establecer posición y display, el List maneja sus propios estilos
        dropdown.style.cssText = `
          position: absolute;
          top: 100%;
          right: 0;
          z-index: 1000;
          margin-top: 4px;
          display: none;
          width: 160px;
          max-width: 160px;
          box-sizing: border-box;
        `;
        headerCell.style.position = 'relative';
        headerCell.appendChild(dropdown);
      }
      
      let isOpen = false;
      
      // Función para cerrar el dropdown
      const closeDropdown = () => {
        if (dropdown) {
          dropdown.style.display = 'none';
        }
        isOpen = false;
        if (handleOutsideClickRef) {
          document.removeEventListener('click', handleOutsideClickRef);
          handleOutsideClickRef = null;
        }
      };
      
      let handleOutsideClickRef: ((e: MouseEvent) => void) | null = null;
      
      // Agregar listener para abrir/cerrar el dropdown
      btn.addEventListener('click', (e) => {
        console.log('🔍 [COLUMN MENU] Click en botón de menú, columna:', columnId);
        
        e.preventDefault();
        e.stopPropagation();
        
        // Re-obtener la columna para asegurar que está actualizada
        const currentColumn = currentOptions.columns.find(col => col.id === columnId);
        if (!currentColumn) {
          console.error('❌ [COLUMN MENU] Columna no encontrada:', columnId);
          return;
        }
        
        const isPinned = currentColumn.pinned || false;
        console.log('🔍 [COLUMN MENU] Estado de columna - pinned:', isPinned);
        
        // Si ya está abierto, cerrarlo
        if (isOpen) {
          console.log('🔍 [COLUMN MENU] Dropdown ya abierto, cerrando...');
          closeDropdown();
          return;
        }
        
        // Cerrar otros dropdowns abiertos
        element.querySelectorAll('.ubits-data-table__column-menu-dropdown').forEach((dd: any) => {
          if (dd !== dropdown) {
            dd.style.display = 'none';
          }
        });
        
        // Preparar items de la lista
        const listItems = [
          {
            label: isPinned ? 'Desfijar columna' : 'Fijar columna',
            value: 'pin',
            state: 'default' as const
          }
        ];
        
        // Limpiar dropdown anterior
        dropdown.innerHTML = '';
        
        // Crear la lista usando createList
        const listId = `column-menu-list-${columnId}-${Math.random().toString(36).substr(2, 9)}`;
        dropdown.id = listId;
        
        try {
          console.log('🔍 [COLUMN MENU] Creando lista UBITS con createList, containerId:', listId);
          const listElement = createList({
            containerId: listId,
            items: listItems,
            size: 'sm',
            maxHeight: '200px',
            onSelectionChange: (selectedItem, index) => {
              console.log('🔍 [COLUMN MENU] Item seleccionado del dropdown:', selectedItem?.label, 'value:', selectedItem?.value);
              if (selectedItem && selectedItem.value === 'pin') {
                // Toggle pinned
                const column = currentOptions.columns.find(col => col.id === columnId);
                if (column) {
                  const oldPinned = column.pinned || false;
                  column.pinned = !oldPinned;
                  console.log('✅ [COLUMN MENU] Columna', columnId, oldPinned ? 'desfijada' : 'fijada', '- nuevo estado pinned:', column.pinned);
                  
                  // Llamar callback si existe
                  if (currentOptions.onColumnPin) {
                    currentOptions.onColumnPin(columnId, column.pinned);
                  }
                  
                  // Re-renderizar
                  render();
                } else {
                  console.error('❌ [COLUMN MENU] Columna no encontrada al intentar fijar:', columnId);
                }
              }
              closeDropdown();
            }
          });
          console.log('✅ [COLUMN MENU] Lista UBITS creada exitosamente, elemento:', listElement);
        } catch (error) {
          console.error('❌ [COLUMN MENU] Error al crear lista con createList:', error);
          // Fallback: usar renderList
          console.log('🔍 [COLUMN MENU] Usando fallback renderList...');
          const listHTML = renderList({
            items: listItems,
            size: 'sm',
            maxHeight: '200px'
          });
          dropdown.innerHTML = listHTML;
          console.log('✅ [COLUMN MENU] HTML de lista renderizado, length:', listHTML.length);
          
          // Agregar event listeners manualmente
          const listItemsElements = dropdown.querySelectorAll('.ubits-list-item');
          console.log('🔍 [COLUMN MENU] Items encontrados en fallback:', listItemsElements.length);
          listItemsElements.forEach((itemEl) => {
            itemEl.addEventListener('click', () => {
              console.log('🔍 [COLUMN MENU] Click en item del dropdown (fallback)');
              const column = currentOptions.columns.find(col => col.id === columnId);
              if (column) {
                const oldPinned = column.pinned || false;
                column.pinned = !oldPinned;
                console.log('✅ [COLUMN MENU] Columna', columnId, oldPinned ? 'desfijada' : 'fijada', '- nuevo estado pinned:', column.pinned);
                
                // Llamar callback si existe
                if (currentOptions.onColumnPin) {
                  currentOptions.onColumnPin(columnId, column.pinned);
                }
                
                // Re-renderizar
                render();
              }
              closeDropdown();
            });
          });
        }
        
        // Posicionar el dropdown
        const rect = btn.getBoundingClientRect();
        dropdown.style.position = 'fixed';
        dropdown.style.top = `${rect.bottom + 4}px`;
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.display = 'block';
        isOpen = true;
        console.log('✅ [COLUMN MENU] Dropdown mostrado y posicionado:', {
          top: dropdown.style.top,
          left: dropdown.style.left,
          width: dropdown.offsetWidth,
          height: dropdown.offsetHeight,
          innerHTML: dropdown.innerHTML.substring(0, 200)
        });
        
        // Cerrar al hacer click fuera
        handleOutsideClickRef = (e: MouseEvent) => {
          if (!dropdown.contains(e.target as Node) && !btn.contains(e.target as Node)) {
            closeDropdown();
          }
        };
        setTimeout(() => {
          document.addEventListener('click', handleOutsideClickRef!);
        }, 0);
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
    const statusEditables = element.querySelectorAll('.ubits-data-table__status-editable');
    
    statusEditables.forEach((container) => {
      const rowIdStr = container.getAttribute('data-row-id');
      const columnId = container.getAttribute('data-column-id');
      const currentStatus = container.getAttribute('data-current-status');
      
      if (!rowIdStr || !columnId) return;
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      const statusTag = container.querySelector('.ubits-status-tag');
      const dropdown = container.querySelector('.ubits-data-table__status-dropdown') as HTMLElement;
      
      if (!statusTag || !dropdown) return;
      
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
      
      // Referencias a los listeners para poder eliminarlos
      let handleOutsideClickRef: ((e: MouseEvent) => void) | null = null;
      let updateDropdownPositionRef: (() => void) | null = null;
      let animationFrameId: number | null = null;
      let isUpdating = false;
      let updateCount = 0;
      const scrollContainers: HTMLElement[] = [];
      
      // Función para encontrar todos los contenedores con scroll
      const findScrollContainers = (el: HTMLElement | null): HTMLElement[] => {
        const containers: HTMLElement[] = [];
        let current: HTMLElement | null = el;
        
        while (current && current !== document.body && current !== document.documentElement) {
          const style = window.getComputedStyle(current);
          const overflow = style.overflow + style.overflowX + style.overflowY;
          
          // Verificar si tiene scroll (overflow auto/scroll) o si tiene scrollHeight/scrollWidth mayor que clientHeight/clientWidth
          const hasOverflow = overflow.includes('auto') || overflow.includes('scroll');
          const hasScrollContent = current.scrollHeight > current.clientHeight || current.scrollWidth > current.clientWidth;
          
          if (hasOverflow || hasScrollContent) {
            containers.push(current);
          }
          
          current = current.parentElement;
        }
        
        return containers;
      };
      
      // Función para actualizar la posición del dropdown usando requestAnimationFrame
      const updateDropdownPosition = () => {
        try {
          if (!dropdown || dropdown.style.display === 'none' || !document.body.contains(dropdown)) {
            stopUpdating();
            return;
          }
          
          if (!statusTag || !statusTag.isConnected) {
            stopUpdating();
            return;
          }
          
          const rect = statusTag.getBoundingClientRect();
          // Con position: fixed, las coordenadas son relativas al viewport
          const top = rect.bottom + 4;
          const left = rect.left;
          
          const currentTop = dropdown.style.top;
          const currentLeft = dropdown.style.left;
          const newTop = `${top}px`;
          const newLeft = `${left}px`;
          
          // Solo actualizar si la posición cambió (para evitar reflows innecesarios)
          if (currentTop !== newTop || currentLeft !== newLeft) {
            dropdown.style.top = newTop;
            dropdown.style.left = newLeft;
            updateCount++;
          }
        } catch (error) {
          stopUpdating();
        }
      };
      
      // Función para iniciar el loop de actualización continua
      const startUpdating = () => {
        if (isUpdating) return;
        isUpdating = true;
        
        const update = () => {
          if (dropdown.style.display === 'none' || !document.body.contains(dropdown)) {
            stopUpdating();
            return;
          }
          
          updateDropdownPosition();
          
          // Continuar actualizando mientras el dropdown esté visible
          animationFrameId = requestAnimationFrame(update);
        };
        
        update();
      };
      
      // Función para detener la actualización continua
      const stopUpdating = () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        isUpdating = false;
        updateCount = 0;
      };
      
      updateDropdownPositionRef = updateDropdownPosition;
      
      // Función para cerrar el dropdown
      const closeDropdown = () => {
        stopUpdating();
        dropdown.style.display = 'none';
        
        // Destruir scrollbar si existe
        const scrollbarInstance = (dropdown as any).__scrollbarInstance;
        if (scrollbarInstance && scrollbarInstance.destroy) {
          try {
            scrollbarInstance.destroy();
          } catch (e) {
            // Ignorar errores al destruir scrollbar
          }
          (dropdown as any).__scrollbarInstance = null;
        }
        
        // Devolver el dropdown al contenedor original si está en el body
        if (dropdown.parentElement === document.body) {
          container.appendChild(dropdown);
        }
        // Eliminar listeners
        if (handleOutsideClickRef) {
          document.removeEventListener('click', handleOutsideClickRef);
          handleOutsideClickRef = null;
        }
        if (updateDropdownPositionRef) {
          window.removeEventListener('scroll', updateDropdownPositionRef, true);
          element.removeEventListener('scroll', updateDropdownPositionRef, true);
          // Eliminar listeners de todos los contenedores con scroll
          scrollContainers.forEach(container => {
            container.removeEventListener('scroll', updateDropdownPositionRef!, true);
          });
          scrollContainers.length = 0;
          updateDropdownPositionRef = null;
        }
      };
      
      // Función para abrir el dropdown
      const openDropdown = (e: MouseEvent) => {
        try {
          e.preventDefault();
          e.stopPropagation();
          
          if (!statusTag || !dropdown) return;
        
        // Cerrar otros dropdowns abiertos
        element.querySelectorAll('.ubits-data-table__status-dropdown').forEach((dd: any) => {
          if (dd !== dropdown) {
            dd.style.display = 'none';
            // Devolver otros dropdowns a sus contenedores si están en el body
            if (dd.parentElement === document.body) {
              const originalContainer = element.querySelector(`[data-row-id="${dd.getAttribute('data-row-id')}"][data-column-id="${dd.getAttribute('data-column-id')}"]`);
              if (originalContainer) {
                originalContainer.appendChild(dd);
              }
            }
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
        
        // Cargar CSS del scrollbar si no está cargado
        if (!document.querySelector('link[href*="scroll.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '../../addons/scroll/src/styles/scroll.css';
          document.head.appendChild(link);
        }
        
        // Limpiar dropdown anterior si existe
        dropdown.innerHTML = '';
        const listContainerId = `status-list-${rowId}-${columnId}`;
        const scrollbarContainerId = `status-scrollbar-${rowId}-${columnId}`;
        dropdown.id = `status-dropdown-${rowId}-${columnId}`;
        
        // Crear estructura con scrollbar: wrapper > lista + scrollbar
        dropdown.innerHTML = `
          <div style="display: flex; align-items: stretch; gap: 0; height: 300px; width: 100%;">
            <div id="${listContainerId}" style="flex: 1; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; height: 100%; position: relative;"></div>
            <div id="${scrollbarContainerId}" style="flex-shrink: 0; width: 8px; height: 100%; position: relative;"></div>
          </div>
        `;
        
        // Ocultar scrollbar nativo de la lista
        const listContainer = document.getElementById(listContainerId);
        if (listContainer) {
          const style = document.createElement('style');
          style.textContent = `
            #${listContainerId}::-webkit-scrollbar {
              display: none;
            }
          `;
          document.head.appendChild(style);
        }
        
        // Mover el dropdown al body para evitar problemas con overflow
        if (dropdown.parentElement !== document.body) {
          document.body.appendChild(dropdown);
        }
        
        // Posicionar el dropdown debajo del status tag usando position: fixed
        // Calcular posición basándose en getBoundingClientRect para que se mantenga alineado
        const rect = statusTag.getBoundingClientRect();
        
        dropdown.style.position = 'fixed';
        dropdown.style.top = `${rect.bottom + 4}px`;
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.zIndex = '1000';
        dropdown.style.backgroundColor = 'var(--ubits-bg-1, #ffffff)';
        dropdown.style.border = '1px solid var(--ubits-border-1, #d0d2d5)';
        dropdown.style.borderRadius = '8px';
        dropdown.style.boxShadow = '0 4px 12px var(--ubits-shadow-md, rgba(0, 0, 0, 0.15))';
        dropdown.style.display = 'block';
        dropdown.style.minWidth = '200px';
        dropdown.style.maxWidth = '300px';
        dropdown.style.padding = '4px';
        dropdown.style.boxSizing = 'border-box';
        dropdown.style.maxHeight = '308px';
        
        // Encontrar todos los contenedores con scroll
        const containers = findScrollContainers(statusTag);
        scrollContainers.push(...containers);
        
        // Posicionar inicialmente
        updateDropdownPosition();
        
        // Iniciar actualización continua con requestAnimationFrame
        startUpdating();
        
        // Agregar listeners para actualizar posición en scroll (como respaldo)
        window.addEventListener('scroll', updateDropdownPosition, true);
        element.addEventListener('scroll', updateDropdownPosition, true);
        // Agregar listeners a todos los contenedores con scroll encontrados
        containers.forEach(container => {
          container.addEventListener('scroll', updateDropdownPosition, true);
        });
        
        // Crear la lista interactiva usando createList
        // createList modifica el innerHTML del contenedor con el ID especificado
        // y retorna el elemento .ubits-list dentro del contenedor
        let scrollbarInstance: { element: HTMLElement; update: () => void; destroy: () => void } | null = null;
        try {
          const listElement = createList({
            containerId: listContainerId,
            items: listItems,
            size: 'sm',
            maxHeight: 'none',
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
          
          // Ajustar estilos de la lista para que funcione con el scrollbar
          // La lista no debe tener overflow, el contenedor es el que tiene scroll
          if (listElement) {
            listElement.style.maxHeight = 'none';
            listElement.style.height = 'auto';
            listElement.style.overflow = 'visible';
            listElement.style.overflowY = 'visible';
            listElement.style.overflowX = 'visible';
          }
          
          // Crear scrollbar de UBITS para la lista después de que se renderice
          // Usar requestAnimationFrame para asegurar que el DOM esté completamente actualizado
          requestAnimationFrame(() => {
            if (typeof createScrollbar !== 'undefined') {
              try {
                const targetElement = document.getElementById(listContainerId);
                
                if (targetElement && targetElement.scrollHeight > targetElement.clientHeight) {
                  scrollbarInstance = createScrollbar({
                    containerId: scrollbarContainerId,
                    targetId: listContainerId,
                    orientation: 'vertical',
                    state: 'default'
                  });
                  
                  // Forzar actualización del scrollbar
                  if (scrollbarInstance?.update) {
                    scrollbarInstance.update();
                  }
                }
              } catch (scrollbarError) {
                // Error creando scrollbar, continuar sin él
              }
            }
          });
        } catch (error) {
          // Error creando lista
        }
        
        // Guardar referencia al scrollbar para limpiarlo al cerrar
        (dropdown as any).__scrollbarInstance = scrollbarInstance;
        
        // Cerrar al hacer click fuera (pero no dentro del dropdown)
        const handleOutsideClick = (e: MouseEvent) => {
          if (!dropdown.contains(e.target as Node) && !statusTag.contains(e.target as Node)) {
            closeDropdown();
          }
        };
        handleOutsideClickRef = handleOutsideClick;
        
        setTimeout(() => {
          document.addEventListener('click', handleOutsideClick);
        }, 0);
        
        } catch (error) {
          stopUpdating();
        }
      };
      
      // Agregar event listener al status tag
      statusTag.addEventListener('click', openDropdown);
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
    
    // Date editables - mostrar calendario al hacer click
    const dateEditables = element.querySelectorAll('.ubits-data-table__date-editable');
    dateEditables.forEach((container) => {
      const rowIdStr = container.getAttribute('data-row-id');
      const columnId = container.getAttribute('data-column-id');
      
      if (!rowIdStr || !columnId) return;
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      const dateDisplay = container.querySelector('.ubits-data-table__date-display') as HTMLElement;
      const dateInput = container.querySelector('.ubits-data-table__date-input') as HTMLInputElement;
      
      if (!dateDisplay || !dateInput) return;
      
      // Al hacer click en el display, mostrar el input date
      dateDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        // Mostrar el input y hacer click en él para abrir el calendario
        dateInput.style.display = 'block';
        dateInput.style.position = 'absolute';
        dateInput.style.opacity = '0';
        dateInput.style.width = '100%';
        dateInput.style.height = '100%';
        dateInput.style.top = '0';
        dateInput.style.left = '0';
        dateInput.style.cursor = 'pointer';
        dateInput.focus();
        dateInput.showPicker?.();
        
        // Si showPicker no está disponible, hacer click programático
        setTimeout(() => {
          dateInput.click();
        }, 0);
      });
      
      // Cuando cambia la fecha, actualizar el display y los datos
      dateInput.addEventListener('change', (e) => {
        e.stopPropagation();
        const newDateValue = dateInput.value;
        
        if (newDateValue) {
          // Convertir de YYYY-MM-DD a formato legible
          const date = new Date(newDateValue);
          const formattedDate = date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          
          // Actualizar el display
          dateDisplay.textContent = formattedDate;
          
          // Ocultar el input
          dateInput.style.display = 'none';
          
          // Actualizar los datos de la fila
          const row = currentOptions.rows.find(r => r.id === rowId);
          if (row) {
            row.data[columnId] = formattedDate;
            // También guardar en formato ISO para referencia
            row.data[`${columnId}_iso`] = newDateValue;
          }
          
          // Re-renderizar para reflejar los cambios
          render();
        }
      });
      
      // Cuando el input pierde el foco, ocultarlo
      dateInput.addEventListener('blur', () => {
        dateInput.style.display = 'none';
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
    
    } catch (error) {
      // Error en attachEventListeners
    }
  };

  // Llamar render inicial
  render();

  // Función de actualización
  const update = (newOptions: Partial<DataTableOptions>) => {
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

