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
import { renderPagination } from '../../pagination/src/PaginationProvider';
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
      
      // Log para debugging
      console.log('🖼️ [AVATAR] Renderizando nombre-avatar:', {
        columnId: column.id,
        rowId: row.id,
        nombre: nombre,
        avatar: avatar,
        cellData: cellData,
        hasAvatar: !!avatar,
        avatarType: typeof avatar
      });
      
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
          console.log('🖼️ [AVATAR] Usando initials del objeto avatar:', avatar.initials);
          avatarHTML = renderAvatar({
            initials: avatar.initials,
            size: 'sm'
          });
        } else {
          const initials = generateInitials(nombre);
          console.log('🖼️ [AVATAR] Generando initials del nombre:', nombre, '->', initials);
          avatarHTML = renderAvatar({
            initials: initials,
            size: 'sm'
          });
        }
        console.log('🖼️ [AVATAR] HTML generado (initials):', avatarHTML ? avatarHTML.substring(0, 100) : 'VACÍO');
      } else {
        // Variante Icon: usar icon si está disponible, sino usar 'user' por defecto (sin badge)
        const iconName = avatar && typeof avatar === 'object' && avatar.icon 
          ? avatar.icon 
          : 'user';
        console.log('🖼️ [AVATAR] Usando icon:', iconName);
        avatarHTML = renderAvatar({
          icon: iconName,
          size: 'sm'
        });
        console.log('🖼️ [AVATAR] HTML generado (icon):', avatarHTML ? avatarHTML.substring(0, 100) : 'VACÍO');
      }
      
      const isEditable = column.editable;
      const nombreElement = isEditable 
        ? `<span class="ubits-body-md-regular" contenteditable="true" data-editable-text="true">${nombre}</span>`
        : `<span class="ubits-body-md-regular">${nombre}</span>`;
      
      const finalHTML = `
        <div style="display: flex; align-items: center; gap: var(--ubits-spacing-sm, 12px);">
          ${avatarHTML}
          ${nombreElement}
        </div>
      `;
      
      console.log('🖼️ [AVATAR] HTML final:', finalHTML.substring(0, 200));
      
      return finalHTML;
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
            ${textoComplementario ? `<span class="ubits-body-sm-regular" style="color: var(--ubits-fg-1-medium);">${textoComplementario}</span>` : ''}
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
        size: 'xs',
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
        return `<a href="mailto:${email}" class="ubits-body-md-regular" style="color: var(--ubits-accent-brand-static-inverted); text-decoration: none;">${email}</a>`;
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
        const isEditable = column.editable === true;
        
        // Si es editable, mostrar un contenedor con el span y contenedor para el calendario UBITS
        if (isEditable) {
          return `
            <div class="ubits-data-table__date-editable" data-row-id="${row.id}" data-column-id="${column.id}">
              <span class="ubits-body-md-regular ubits-data-table__date-display">${fecha || 'Seleccionar fecha'}</span>
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
    
    case 'drag-handle': {
      // Drag handle para mover filas
      return `
        <div class="ubits-data-table__row-drag-handle" draggable="true" data-row-id="${row.id}">
          <wa-icon name="grip-dots-vertical"></wa-icon>
          <i class="fas fa-grip-vertical" aria-hidden="true"></i>
        </div>
      `;
    }
    
    case 'expand': {
      // Botón de expandir/colapsar fila
      const isExpanded = row.expanded || false;
      return `
        <button
          type="button"
          class="ubits-data-table__row-expand"
          aria-label="${isExpanded ? 'Colapsar' : 'Expandir'} fila"
          data-row-id="${row.id}"
          data-expand-button="true"
        >
          <i class="far fa-chevron-${isExpanded ? 'down' : 'right'}" aria-hidden="true"></i>
        </button>
      `;
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
  // IMPORTANTE: Solo las columnas con ID específico (checkbox, checkbox-2) y SIN type='checkbox' son columnas fijas
  // Las columnas con type='checkbox' (como checkbox-col) deben renderizarse con renderCellByType
  const isFixedCheckboxColumn = column.type !== 'checkbox' && 
    (column.id === 'checkbox' || column.id.startsWith('checkbox-'));
  
  if (isFixedCheckboxColumn) {
    const checkboxValue = row.data[column.id] || false;
    
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
    
    // Determinar el padding-left según el column-id (optimizado para espacio)
    const paddingLeft = column.id === 'checkbox-2' ? '12px' : 'var(--ubits-spacing-md, 16px)';
    
    // Agregar clase si la columna está fijada
    const pinnedClass = column.pinned ? ' ubits-data-table__cell--pinned' : '';
    // Aplicar left siempre que la columna esté fijada, incluso si es 0 (necesario para que sticky funcione)
    // IMPORTANTE: Incluir position: sticky explícitamente en el estilo inline SOLO cuando está pinned
    const pinnedStyle = column.pinned ? `position: sticky !important; left: ${pinnedLeft}px !important; z-index: 12 !important;` : '';
    const baseStyle = `text-align: center; vertical-align: middle; padding-left: ${paddingLeft} !important;`;
    const cellStyle = `${baseStyle}${pinnedStyle ? ' ' + pinnedStyle : ''}`;
    
    const cellHTML = `
      <td class="ubits-data-table__cell ubits-data-table__cell--checkbox${pinnedClass}" data-column-id="${column.id}" ${column.pinned ? 'data-pinned="true"' : ''} style="${cellStyle}">
        ${checkbox}
      </td>
    `;
    return cellHTML;
  }
  
  // Si la columna tiene un tipo definido, usar renderCellByType
  if (column.type) {
    const content = renderCellByType(column, row, column.type);
    // Editable para: nombre, nombre-avatar, estado, fecha, checkbox y radio (interactivos)
    // NO editable para: drag-handle, expand (son controladores)
    const isEditable = column.editable && (
      column.type === 'nombre' || 
      column.type === 'nombre-avatar' || 
      column.type === 'estado' ||
      column.type === 'fecha' ||
      column.type === 'checkbox' ||
      column.type === 'radio'
    ) && column.type !== 'drag-handle' && column.type !== 'expand';
    
    // Clases CSS según tipo
    const typeClass = column.type === 'drag-handle' 
      ? 'ubits-data-table__cell--drag-handle' 
      : column.type === 'expand' 
        ? 'ubits-data-table__cell--expand' 
        : `ubits-data-table__cell--${column.type}`;
    
    const editableClass = isEditable ? 'ubits-data-table__cell--editable' : '';
    const pinnedClass = column.pinned ? ' ubits-data-table__cell--pinned' : '';
    
    // Estilos para controladores (centrado)
    const controlStyles = (column.type === 'drag-handle' || column.type === 'expand') 
      ? 'text-align: center; vertical-align: middle;' 
      : '';
    
    // Aplicar left siempre que la columna esté fijada, incluso si es 0 (necesario para que sticky funcione)
    // IMPORTANTE: Incluir position: sticky explícitamente en el estilo inline con !important
    // CRÍTICO: left: 0px es válido y necesario para la primera columna fijada
    const pinnedStyle = column.pinned ? `position: sticky !important; left: ${pinnedLeft}px !important; z-index: 12 !important;` : '';
    const cellStyle = `${controlStyles}${pinnedStyle ? ' ' + pinnedStyle : ''}`;
    const styleAttr = cellStyle ? ` style="${cellStyle}"` : '';
    
    // Logs detallados para debugging
    if (column.pinned) {
      console.log('📌 [CELL TIPO] Columna fijada detectada:', {
        columnId: column.id,
        columnType: column.type,
        rowId: row.id,
        pinned: column.pinned,
        pinnedLeft: pinnedLeft,
        pinnedClass: pinnedClass,
        pinnedStyle: pinnedStyle,
        hasPinnedClass: pinnedClass.includes('pinned'),
        hasPinnedStyle: pinnedStyle.includes('left'),
        hasPositionStyle: pinnedStyle.includes('sticky')
      });
    }
    
    // Agregar data-column-id siempre para poder diferenciar en CSS
    const dataAttrs = isEditable && (column.type === 'nombre' || column.type === 'nombre-avatar' || column.type === 'estado' || column.type === 'fecha') 
      ? `data-row-id="${row.id}" data-column-id="${column.id}" data-editable="true"${column.pinned ? ' data-pinned="true"' : ''}` 
      : `data-column-id="${column.id}"${column.pinned ? ' data-pinned="true"' : ''}`;
    
    return `
      <td class="ubits-data-table__cell ${typeClass} ${editableClass}${pinnedClass}" ${dataAttrs}${styleAttr}>
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
  // Aplicar left siempre que la columna esté fijada, incluso si es 0 (necesario para que sticky funcione)
  // IMPORTANTE: Incluir position: sticky explícitamente en el estilo inline con !important
  // CRÍTICO: left: 0px es válido y necesario para la primera columna fijada
  const pinnedStyle = column.pinned ? ` style="position: sticky !important; left: ${pinnedLeft}px !important; z-index: 12 !important;"` : '';
  
  // Logs detallados para debugging
  if (column.pinned) {
    console.log('📌 [CELL NORMAL] Columna fijada detectada:', {
      columnId: column.id,
      rowId: row.id,
      pinned: column.pinned,
      pinnedLeft: pinnedLeft,
      pinnedClass: pinnedClass,
      pinnedStyle: pinnedStyle,
      hasPinnedClass: pinnedClass.includes('pinned'),
      hasPinnedStyle: pinnedStyle.includes('left'),
      hasPositionStyle: pinnedStyle.includes('sticky')
    });
  }
  
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
  // Si es una columna de tipo drag-handle o expand, renderizar header vacío
  if (column.type === 'drag-handle' || column.type === 'expand') {
    const pinnedClass = column.pinned ? ' ubits-data-table__column-header--pinned' : '';
    const pinnedStyle = column.pinned ? `position: sticky !important; left: ${pinnedLeft}px !important; z-index: 10 !important;` : '';
    const widthStyle = column.width ? `width: ${column.width}px;` : '';
    const combinedStyle = [pinnedStyle, widthStyle].filter(Boolean).join(' ');
    const styleAttribute = combinedStyle ? `style="${combinedStyle}"` : '';
    
    return `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--${column.type}${pinnedClass}" 
        ${styleAttribute}
        data-column-id="${column.id}"
        ${column.pinned ? 'data-pinned="true"' : ''}
      >
      </th>
    `;
  }

  // Si es una columna de checkbox FIJO (checkbox-2 o checkbox), renderizar solo el checkbox (sin título ni drag handle)
  // IMPORTANTE: Las columnas de tipo "checkbox" (type === 'checkbox') NO son columnas fijas
  // Solo las columnas con ID específico (checkbox, checkbox-2) y SIN type='checkbox' son columnas fijas
  // Las columnas con type='checkbox' (como checkbox-col) deben tener header normal con título
  const isFixedCheckboxColumn = column.type !== 'checkbox' && 
    (column.id === 'checkbox' || column.id.startsWith('checkbox-'));
  const isCheckboxTypeColumn = column.type === 'checkbox';
  
  if (isFixedCheckboxColumn) {
    // Opcional: calcular si todos están seleccionados para el checkbox del header
    const allChecked = rows.length > 0 && rows.every(row => row.data[column.id] === true);
    const someChecked = rows.some(row => row.data[column.id] === true);
    
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
    
    // Agregar clase pinned y atributo data-pinned si está pinned
    const pinnedClass = column.pinned ? ' ubits-data-table__column-header--pinned' : '';
    const pinnedStyle = column.pinned ? `position: sticky !important; left: ${pinnedLeft}px !important; z-index: 10 !important;` : '';
    const widthStyle = column.width ? `width: ${column.width}px;` : '';
    const combinedStyle = [pinnedStyle, widthStyle].filter(Boolean).join(' ');
    const styleAttribute = combinedStyle ? `style="${combinedStyle}"` : '';
    
    const headerHTML = `
      <th 
        class="ubits-data-table__column-header ubits-data-table__column-header--checkbox${pinnedClass}" 
        ${styleAttribute}
        data-column-id="${column.id}"
        ${column.pinned ? 'data-pinned="true"' : ''}
      >
        ${checkbox}
      </th>
    `;
    return headerHTML;
  }

  // Para columnas normales, mostrar drag handle y título
  // NO permitir drag & drop si la columna es de tipo checkbox fijo, drag-handle o expand
  // IMPORTANTE: Las columnas de tipo "checkbox" (type === 'checkbox') pero con ID diferente
  // SÍ pueden tener drag handle y título normal
  const isControlColumn = column.type === 'drag-handle' || column.type === 'expand';
  const dragHandle = columnReorderable && !isFixedCheckboxColumn && !isControlColumn ? `
    <div class="ubits-data-table__column-drag-handle" draggable="true" data-column-id="${column.id}">
      <wa-icon name="grip-dots-vertical"></wa-icon>
      <i class="fas fa-grip-vertical" aria-hidden="true"></i>
    </div>
  ` : '';

  // Botón de ordenamiento - cambia el icono según la dirección de ordenamiento
  // IMPORTANTE: Las columnas de tipo "checkbox" (type === 'checkbox') pero con ID diferente
  // SÍ pueden tener botón de ordenamiento
  const sortButton = !isFixedCheckboxColumn && !isControlColumn && columnSortable ? (() => {
    const isSorted = sortColumnId === column.id;
    const activeClass = isSorted ? ' ubits-data-table__column-sort--active' : '';
    
    // Determinar qué icono mostrar según el estado de ordenamiento
    // Por defecto mostrar arrow-up-a-z (indica que se puede ordenar)
    let iconName = 'arrow-up-a-z';
    let fallbackIcon = 'fas fa-sort-alpha-up';
    
    if (isSorted && sortDirection) {
      if (sortDirection === 'asc') {
        iconName = 'arrow-up-a-z';
        fallbackIcon = 'fas fa-sort-alpha-up';
      } else {
        iconName = 'arrow-down-a-z';
        fallbackIcon = 'fas fa-sort-alpha-down';
      }
    }
    
    const sortButtonHTML = `
      <div class="ubits-data-table__column-drag-handle ubits-data-table__column-sort${activeClass}" 
           data-column-id="${column.id}" 
           data-sort-button="true"
           aria-label="Ordenar ${column.title}"
           role="button"
           tabindex="0">
        <wa-icon name="${iconName}"></wa-icon>
        <i class="${fallbackIcon}" aria-hidden="true"></i>
      </div>
    `;
    
    return sortButtonHTML;
  })() : '';
  
  if (!sortButton && !isFixedCheckboxColumn) {
    // Sin botón de ordenamiento
  }

  // Botón de menú de 3 puntos con opción de fijar columna
  const menuButton = !isFixedCheckboxColumn && !isControlColumn && showColumnMenu ? (() => {
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
  
  // Agregar estilo inline para left si está fijada (siempre aplicar cuando está fijada, incluso si es 0)
  // IMPORTANTE: Siempre incluir position: sticky cuando está fijada, y asegurar que left esté presente
  // CRÍTICO: left: 0px es válido y necesario para la primera columna fijada
  // Usar !important para evitar que CSS sobrescriba el estilo inline
  const pinnedStyle = column.pinned ? `left: ${pinnedLeft}px !important;` : '';
  const widthStyle = column.width ? `width: ${column.width}px;` : '';
  const positionStyle = column.pinned ? 'position: sticky !important;' : '';
  // CRÍTICO: Incluir z-index para asegurar que quede por encima
  const zIndexStyle = column.pinned ? 'z-index: 10 !important;' : '';
  const combinedStyle = [positionStyle, pinnedStyle, zIndexStyle, widthStyle].filter(Boolean).join(' ');
  
  // Logs detallados para debugging (solo si es necesario)
  // if (column.pinned) {
  //   console.log('📌 [HEADER] Columna fijada:', column.id, 'pinnedLeft:', pinnedLeft);
  // }
  
  // Construir el HTML del header
  // CRÍTICO: Siempre incluir el estilo si combinedStyle tiene contenido, incluso si es solo width
  const styleAttribute = combinedStyle ? `style="${combinedStyle}"` : '';
  
  // Log detallado antes de construir el HTML
  if (column.pinned) {
    console.log('📌 [HEADER PRE-HTML] Antes de construir HTML:', {
      columnId: column.id,
      pinned: column.pinned,
      combinedStyle: combinedStyle,
      combinedStyleLength: combinedStyle.length,
      styleAttribute: styleAttribute,
      willIncludeStyle: !!styleAttribute
    });
  }
  
  const headerHTML = `
    <th 
      class="ubits-data-table__column-header${pinnedClass}" 
      ${styleAttribute} 
      data-column-id="${column.id}"
      ${column.pinned ? 'data-pinned="true"' : ''}
    >
      ${headerContent}
    </th>
  `;
  
  // Log del HTML generado para verificar que el estilo se incluyó
  if (column.pinned) {
    console.log('📌 [HEADER HTML] HTML generado para columna fijada:', {
      columnId: column.id,
      htmlLength: headerHTML.length,
      htmlIncludesSticky: headerHTML.includes('sticky'),
      htmlIncludesLeft: headerHTML.includes('left'),
      htmlIncludesPosition: headerHTML.includes('position'),
      htmlIncludesWidth: headerHTML.includes('width'),
      styleAttributeInHTML: headerHTML.includes('style='),
      htmlPreview: headerHTML.substring(0, 400)
    });
  }
  
  return headerHTML;
}

/**
 * Renderiza una fila de la tabla
 * NOTA: Los controladores (drag-handle, expand) ahora son columnas independientes
 */
function renderRow(row: TableRow, columns: TableColumn[], rowIndex: number, pinnedLefts: number[] = []): string {
  const isExpanded = row.expanded || false;

  // Filtrar columnas visibles
  const visibleColumns = columns.filter(col => col.visible !== false);
  
  // Renderizar todas las celdas (incluyendo controladores como columnas)
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

  
  let rowHTML = `
    <tr class="${rowClasses}" data-row-id="${row.id}">
      ${cellsHTML}
    </tr>
  `;

  // Si la fila está expandida, agregar la fila de contenido expandido
  if (isExpanded && row.renderExpandedContent) {
    const expandedContent = row.renderExpandedContent(row.data);
    const colspan = visibleColumns.length;
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
  const { 
    columns, 
    rows, 
    className = '', 
    columnReorderable = false, 
    columnSortable = true, 
    rowReorderable = false, 
    rowExpandable = true, 
    showCheckbox = true, 
    showVerticalScrollbar = false, 
    showHorizontalScrollbar = false, 
    showColumnMenu = true,
    showPagination = false,
    currentPage = 1,
    itemsPerPage = 10,
    paginationVariant = 'default',
    paginationSize = 'md',
    lazyLoad,
    lazyLoadItemsPerBatch = 10
  } = options;
  
  // Si showPagination está activo, desactivar lazy load automáticamente
  const isLazyLoadEnabled = showPagination ? false : (lazyLoad !== false); // Por defecto true si no hay paginación

  // Logs de paginación - limpiados

  // Filtrar columnas visibles
  let visibleColumns = columns.filter(col => col.visible !== false);
  
  // Eliminar la columna de checkbox vieja (id === 'checkbox')
  visibleColumns = visibleColumns.filter(col => col.id !== 'checkbox');
  
  // Si hay un orden de columnas especificado, reordenar según ese orden
  // IMPORTANTE: Crear copias de las columnas al reordenar para preservar el estado pinned
  // Log removido - no necesario para paginación
  if (columnOrder.length > 0) {
    // También eliminar 'checkbox' del columnOrder si existe
    const filteredColumnOrder = columnOrder.filter(id => id !== 'checkbox');
    const columnMap = new Map(visibleColumns.map(col => {
      const copy = { ...col };
      // IMPORTANTE: Preservar explícitamente pinned
      if (col.pinned !== undefined) {
        copy.pinned = col.pinned;
      }
      return [col.id, copy];
    })); // Crear copias
    visibleColumns = filteredColumnOrder
      .map(id => {
        const col = columnMap.get(id);
        if (col) {
          // Asegurar que pinned se preserve
          const original = visibleColumns.find(c => c.id === id);
          if (original && original.pinned !== undefined) {
            col.pinned = original.pinned;
          }
        }
        return col;
      })
      .filter((col): col is TableColumn => col !== undefined)
      .concat(visibleColumns.filter(col => !filteredColumnOrder.includes(col.id)).map(col => {
        const copy = { ...col };
        // IMPORTANTE: Preservar explícitamente pinned
        if (col.pinned !== undefined) {
          copy.pinned = col.pinned;
        }
        return copy;
      })); // Crear copias también
  } else {
    // Si no hay reordenamiento, crear copias de todas las columnas para preservar el estado
    visibleColumns = visibleColumns.map(col => {
      const copy = { ...col };
      // IMPORTANTE: Preservar explícitamente pinned
      if (col.pinned !== undefined) {
        copy.pinned = col.pinned;
      }
      return copy;
    });
  }
  // Log removido - no necesario para paginación
  
  // Controlar la columna checkbox-2 según showCheckbox
  if (showCheckbox !== false) {
    // Si no existe checkbox-2, crearla automáticamente al inicio
    const checkbox2Exists = visibleColumns.some(col => col.id === 'checkbox-2');
    if (!checkbox2Exists) {
      // Crear una nueva columna de checkbox con id "checkbox-2"
      const newCheckboxColumn: TableColumn = {
        id: 'checkbox-2',
        title: '',
        type: undefined,
        visible: true,
        width: 48
      };
      
      // Insertar la nueva columna al inicio
      visibleColumns.unshift(newCheckboxColumn);
      // Log removido
    } else {
      // Log removido
    }
  } else {
    // Si showCheckbox es false, eliminar checkbox-2 si existe
    const beforeFilter = visibleColumns.map(col => col.id);
    visibleColumns = visibleColumns.filter(col => col.id !== 'checkbox-2');
    const afterFilter = visibleColumns.map(col => col.id);
    // Log removido
  }
  
  // Crear columnas de controladores automáticamente si están habilitados
  // Columna drag-handle (mover filas) - al inicio, antes del checkbox
  if (rowReorderable) {
    const dragHandleExists = visibleColumns.some(col => col.type === 'drag-handle');
    if (!dragHandleExists) {
      const dragHandleColumn: TableColumn = {
        id: 'drag-handle',
        title: '',
        type: 'drag-handle',
        visible: true,
        width: 32
      };
      visibleColumns.unshift(dragHandleColumn);
      // Log removido
    }
  } else {
    visibleColumns = visibleColumns.filter(col => col.type !== 'drag-handle');
  }
  
  // Columna expand (desplegar filas) - después del drag-handle, antes del checkbox
  if (rowExpandable) {
    const expandExists = visibleColumns.some(col => col.type === 'expand');
    if (!expandExists) {
      const expandColumn: TableColumn = {
        id: 'expand',
        title: '',
        type: 'expand',
        visible: true,
        width: 32
      };
      // Insertar después del drag-handle si existe, sino al inicio
      const dragHandleIndex = visibleColumns.findIndex(col => col.type === 'drag-handle');
      if (dragHandleIndex >= 0) {
        visibleColumns.splice(dragHandleIndex + 1, 0, expandColumn);
      } else {
        visibleColumns.unshift(expandColumn);
      }
      // Log removido
    }
  } else {
    visibleColumns = visibleColumns.filter(col => col.type !== 'expand');
  }
  
  // Aplicar sticky a las columnas de controladores según las opciones
  // IMPORTANTE: Preservar el estado pinned de las columnas normales que fueron fijadas manualmente
  const { checkboxSticky = false, dragHandleSticky = false, expandSticky = false } = options;
  visibleColumns = visibleColumns.map(col => {
    const colCopy = { ...col };
    // Solo modificar pinned para controladores, preservar el estado de columnas normales
    if (col.id === 'checkbox-2') {
      // Para checkbox, usar checkboxSticky si está habilitado, sino preservar el estado actual
      if (checkboxSticky === true) {
        colCopy.pinned = true;
        // Log removido
      } else {
        // Si sticky está deshabilitado, solo establecer false si no fue fijado manualmente
        // Pero si fue fijado manualmente (pinned = true), preservarlo
        // En realidad, para checkbox sin sticky, siempre debe ser false
        colCopy.pinned = false;
      }
    } else if (col.type === 'drag-handle') {
      // Para drag-handle, usar dragHandleSticky si está habilitado
      if (dragHandleSticky === true) {
        colCopy.pinned = true;
        // Log removido
      } else {
        colCopy.pinned = false;
      }
    } else if (col.type === 'expand') {
      // Para expand, usar expandSticky si está habilitado
      if (expandSticky === true) {
        colCopy.pinned = true;
        // Log removido
      } else {
        colCopy.pinned = false;
      }
    }
    // Para columnas normales, preservar el estado pinned (puede ser true si fue fijada manualmente)
    // No hacer nada, colCopy ya tiene el estado correcto de la copia
    
    if (colCopy.pinned && !col.id.startsWith('checkbox') && col.type !== 'drag-handle' && col.type !== 'expand') {
      // Log removido
    }
    
    return colCopy;
  });
  
  // Log de todas las columnas fijadas después del map
  const pinnedAfterMap = visibleColumns.filter(col => col.pinned);
  // Log removido
  
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

  // Ya no usamos hasControls - los controladores son columnas independientes
  // Las columnas drag-handle y expand ya están en visibleColumns
  
  // Log removido

  // Función auxiliar para calcular el left de una columna fijada
  const calculatePinnedLeft = (column: TableColumn, columnIndex: number, allColumns: TableColumn[]): number => {
    let left = 0;
    const debugInfo: any = {
      columnId: column.id,
      columnIndex: columnIndex,
      steps: []
    };
    
    // Sumar ancho de todas las columnas fijadas anteriores (incluyendo controladores)
    for (let i = 0; i < columnIndex; i++) {
      const prevCol = allColumns[i];
      if (prevCol && prevCol.pinned) {
        // Calcular ancho según tipo de columna
        let prevWidth = prevCol.width;
        if (!prevWidth) {
          if (prevCol.type === 'drag-handle') {
            prevWidth = 32;
          } else if (prevCol.type === 'expand') {
            prevWidth = 32;
          } else if (prevCol.id === 'checkbox-2') {
            prevWidth = 48;
          } else {
            prevWidth = 150;
          }
        }
        left += prevWidth;
        debugInfo.steps.push({ 
          step: `columna-${prevCol.id}`, 
          added: prevWidth, 
          total: left, 
          reason: `Columna fijada anterior: ${prevCol.id} (tipo: ${prevCol.type || 'normal'})` 
        });
      } else if (prevCol && !prevCol.pinned) {
        // Si la columna anterior no está fijada, no sumar su ancho
        debugInfo.steps.push({ 
          step: `columna-${prevCol.id}`, 
          added: 0, 
          total: left, 
          reason: `Columna anterior no fijada: ${prevCol.id}` 
        });
      }
    }
    
    debugInfo.finalLeft = left;
    
    if (column.pinned) {
      // Log removido
    }
    
    return left;
  };

  // Renderizar headers de columnas
  // Log removido
  
  const columnHeadersHTML = visibleColumns
    .map((col, index) => {
      const pinnedLeft = col.pinned ? calculatePinnedLeft(col, index, visibleColumns) : 0;
      if (col.pinned) {
        // Log removido
      }
      return renderColumnHeader(col, columnReorderable, columnSortable, orderedRows, sortColumnId, sortDirection, showColumnMenu, pinnedLeft);
    })
    .join('');

  // Renderizar filas
  // Aplicar paginación o lazy load
  let paginatedRows = orderedRows;
  let totalPages = 1;
  let paginationHTML = '';
  
  // Obtener el número de items cargados actualmente (se pasa desde createDataTable)
  const currentLoadedItems = (options as any).__lazyLoadCurrentItems || lazyLoadItemsPerBatch;
  
  if (showPagination) {
    // Modo paginación tradicional
    const totalRows = orderedRows.length;
    totalPages = Math.max(1, Math.ceil(totalRows / itemsPerPage));
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    paginatedRows = orderedRows.slice(startIndex, endIndex);
    
    // Renderizar el paginador con configuración limpia (solo Anterior/Siguiente)
    try {
      paginationHTML = renderPagination({
        currentPage: validCurrentPage,
        totalPages: totalPages,
        totalItems: totalRows,
        itemsPerPage: itemsPerPage,
        variant: paginationVariant,
        size: paginationSize,
        maxVisiblePages: 7,
        showFirst: false,  // Sin botón Primera
        showLast: false,  // Sin botón Última
        showPrevNext: true,  // Solo Anterior/Siguiente
        showInfo: false,  // Sin información de items
        showItemsPerPage: false,  // Sin selector de items por página
        itemsPerPageOptions: [10, 20, 50, 100],
        className: 'ubits-data-table__pagination'
      });
    } catch (error) {
      console.error('❌ [PAGINATION] ERROR:', error);
      paginationHTML = '';
    }
  } else if (isLazyLoadEnabled) {
    // Modo lazy load: mostrar solo los items cargados hasta ahora
    paginatedRows = orderedRows.slice(0, currentLoadedItems);
    console.log('📦 [LAZY LOAD] Mostrando', paginatedRows.length, 'de', orderedRows.length, 'filas');
  }
  
  const rowsHTML = paginatedRows
    .map((row, index) => {
      // Calcular left para cada columna fijada en esta fila
      const pinnedLefts = visibleColumns.map((col, colIndex) => {
        if (col.pinned) {
          const left = calculatePinnedLeft(col, colIndex, visibleColumns);
          return left;
        }
        return 0;
      });
      return renderRow(row, visibleColumns, index, pinnedLefts);
    })
    .join('');

  // Log removido

  const classes = [
    'ubits-data-table',
    className
  ].filter(Boolean).join(' ');

  // Ya no hay controlsHeader - los controladores son columnas independientes
  // Los headers de controladores ya están en columnHeadersHTML

  // Contar headers totales
  const headerCount = visibleColumns.length;

  // Estructura: tabla directamente o envuelta en contenedor scrollable
  const tableHTML = `
    <table class="${classes} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${columnHeadersHTML}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${rowsHTML}
      </tbody>
    </table>
  `.trim();

  // Verificar si hay columnas fijadas
  const hasPinnedColumns = visibleColumns.some(col => col.pinned);
  
  // IMPORTANTE: Si hay columnas fijadas, necesitamos overflow-x para que sticky funcione
  // Si no hay scroll horizontal activo pero hay columnas fijadas, activar scroll horizontal automáticamente
  let finalShowHorizontalScrollbar = showHorizontalScrollbar;
  if (hasPinnedColumns && !showHorizontalScrollbar) {
    finalShowHorizontalScrollbar = true;
  }
  
  // Determinar qué contenedor usar según los scrolls habilitados
  // NO afecta la lógica del checkbox ni de las columnas
  let tableContainerHTML: string;
  if (showVerticalScrollbar || finalShowHorizontalScrollbar) {
    // Construir clases CSS según los scrolls habilitados
    const scrollClasses = [];
    if (showVerticalScrollbar) {
      scrollClasses.push('ubits-data-table__scrollable-container--vertical');
    }
    if (finalShowHorizontalScrollbar) {
      scrollClasses.push('ubits-data-table__scrollable-container--horizontal');
    }
    
    tableContainerHTML = `<div class="ubits-data-table__scrollable-container ${scrollClasses.join(' ')}">${tableHTML}</div>`;
  } else {
    tableContainerHTML = tableHTML;
  }
  
  // Agregar el paginador FUERA del contenedor de la tabla, siempre debajo
  let html: string;
  if (showPagination && paginationHTML) {
    // El paginador siempre va FUERA del contenedor de la tabla, en un wrapper separado
    html = `<div class="ubits-data-table__container">
      ${tableContainerHTML}
      <div class="ubits-data-table__pagination-wrapper">${paginationHTML}</div>
    </div>`;
  } else {
    html = tableContainerHTML;
  }

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

  // Limpiar cualquier tabla existente en el contenedor antes de crear una nueva
  // Esto previene renderizados duplicados cuando se cambian los tipos de columna
  const existingTable = container.querySelector('.ubits-data-table');
  const existingScrollableContainer = container.querySelector('.ubits-data-table__scrollable-container');
  
  // Limpiar contenedor scrollable si existe (contiene la tabla)
  if (existingScrollableContainer) {
    const scrollableElement = existingScrollableContainer as HTMLElement;
    const tableInside = scrollableElement.querySelector('.ubits-data-table');
    if (tableInside) {
      const tableElement = tableInside as HTMLElement;
      // Si hay una instancia previa, destruirla primero
      if ((tableElement as any)._dataTableInstance) {
        try {
          const instance = (tableElement as any)._dataTableInstance;
          if (instance && typeof instance.destroy === 'function') {
            instance.destroy();
          }
        } catch (e) {
          console.warn('Error destroying previous table instance:', e);
        }
      }
    }
    existingScrollableContainer.remove();
  } else if (existingTable) {
    const tableElement = existingTable as HTMLElement;
    if ((tableElement as any)._dataTableInstance) {
      try {
        const instance = (tableElement as any)._dataTableInstance;
        if (instance && typeof instance.destroy === 'function') {
          instance.destroy();
        }
      } catch (e) {
        console.warn('Error destroying previous table instance:', e);
      }
    }
    existingTable.remove();
  }

  // Pasar el estado inicial de lazy load en la primera renderización
  const initialLazyLoadItems = (options.lazyLoad !== false && !options.showPagination) 
    ? (options.lazyLoadItemsPerBatch || 10) 
    : undefined;
  const initialOptions = {
    ...options,
    __lazyLoadCurrentItems: initialLazyLoadItems
  };
  
  const tableHTML = renderDataTable(initialOptions);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = tableHTML.trim();
  const element = tempDiv.firstElementChild as HTMLElement;

  if (!element) {
    throw new Error('Failed to create data table 3 element');
  }

  container.appendChild(element);

  // Estado interno
  let currentOptions = {
    ...options,
    columns: options.columns.map(col => ({ ...col }))
  };
  
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
  
  // Estado de lazy load
  const isLazyLoadEnabled = currentOptions.showPagination ? false : (currentOptions.lazyLoad !== false);
  const lazyLoadItemsPerBatch = currentOptions.lazyLoadItemsPerBatch || 10;
  let lazyLoadCurrentItems = lazyLoadItemsPerBatch; // Empezar con el batch inicial
  let lazyLoadScrollListener: (() => void) | null = null;

  // Función para configurar lazy load (infinite scroll)
  const setupLazyLoad = () => {
    // Remover listener anterior si existe
    if (lazyLoadScrollListener) {
      const scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement || 
                                  element.querySelector('.ubits-data-table') as HTMLElement ||
                                  element;
      if (scrollableContainer) {
        scrollableContainer.removeEventListener('scroll', lazyLoadScrollListener);
      }
      window.removeEventListener('scroll', lazyLoadScrollListener, true);
      lazyLoadScrollListener = null;
    }
    
    // Buscar el contenedor scrollable o la tabla
    const scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement || 
                                element.querySelector('.ubits-data-table') as HTMLElement ||
                                element;
    
    if (!scrollableContainer) return;
    
    // Función para verificar si está cerca del final
    const checkScroll = () => {
      const totalRows = currentOptions.rows.length;
      
      // Si ya se cargaron todos los items, no hacer nada
      if (lazyLoadCurrentItems >= totalRows) {
        return;
      }
      
      // Obtener el scroll position
      const scrollTop = scrollableContainer.scrollTop || window.scrollY;
      const scrollHeight = scrollableContainer.scrollHeight || document.documentElement.scrollHeight;
      const clientHeight = scrollableContainer.clientHeight || window.innerHeight;
      
      // Calcular si está cerca del final (80% del scroll)
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      if (scrollPercentage >= 0.8) {
        // Cargar más items
        const newLoadedItems = Math.min(
          lazyLoadCurrentItems + lazyLoadItemsPerBatch,
          totalRows
        );
        
        if (newLoadedItems > lazyLoadCurrentItems) {
          lazyLoadCurrentItems = newLoadedItems;
          console.log('📦 [LAZY LOAD] Cargando más items:', lazyLoadCurrentItems, 'de', totalRows);
          
          // Llamar callback si existe
          if (currentOptions.onLazyLoad) {
            currentOptions.onLazyLoad(lazyLoadCurrentItems, totalRows);
          }
          
          // Re-renderizar con más items
          render();
        }
      }
    };
    
    // Agregar listener de scroll
    lazyLoadScrollListener = checkScroll;
    scrollableContainer.addEventListener('scroll', checkScroll, { passive: true });
    
    // También escuchar scroll en window por si la tabla no tiene scroll propio
    window.addEventListener('scroll', checkScroll, { passive: true, capture: true });
  };

  // Función para inicializar fallback de iconos
  const initializeIconFallbacks = () => {
    const waIcons = element.querySelectorAll('wa-icon');
    
    waIcons.forEach((waIcon) => {
      const faIcon = waIcon.nextElementSibling as HTMLElement;
      
      if (faIcon && faIcon.tagName === 'I') {
        if (customElements.get('wa-icon')) {
          (waIcon as HTMLElement).style.display = 'inline-block';
          (waIcon as HTMLElement).style.width = '12px';
          (waIcon as HTMLElement).style.height = '12px';
          (waIcon as HTMLElement).style.opacity = '1';
          faIcon.style.display = 'none';
        } else {
          // Si wa-icon no está definido, ocultar wa-icon y mostrar fallback
          (waIcon as HTMLElement).style.display = 'none';
          faIcon.style.display = 'inline-block';
          faIcon.style.fontSize = '12px';
          faIcon.style.width = '12px';
          faIcon.style.height = '12px';
        }
      }
    });
  };

  // Función para renderizar
  const render = () => {
    // Log del estado de las columnas antes de renderizar
    const pinnedBeforeRender = currentOptions.columns.filter(col => col.pinned);
    console.log('🔄 [RENDER] Columnas fijadas antes de renderizar:', pinnedBeforeRender.map(col => ({ id: col.id, pinned: col.pinned })));
    console.log('🔄 [RENDER] Estado completo de currentOptions.columns:', currentOptions.columns.map(col => ({ 
      id: col.id, 
      pinned: col.pinned || false,
      visible: col.visible !== false
    })));
    
    // Crear una copia de las opciones con las columnas actualizadas
    const renderOptions = {
      ...currentOptions,
      columns: currentOptions.columns.map(col => {
        const copy = { ...col };
        // Asegurar que pinned se preserve explícitamente
        if (col.pinned !== undefined) {
          copy.pinned = col.pinned;
        }
        return copy;
      }),
      sortColumnId,
      sortDirection,
      // Pasar el estado de lazy load
      __lazyLoadCurrentItems: lazyLoadCurrentItems
    };
    
    console.log('🔄 [RENDER] Opciones pasadas a renderDataTable - columnas fijadas:', 
      renderOptions.columns.filter(col => col.pinned).map(col => ({ id: col.id, pinned: col.pinned })));
    
    const newHTML = renderDataTable(
      renderOptions as any, 
      columnOrder, 
      rowOrder
    );
    
    element.innerHTML = newHTML.trim();
    
    attachEventListeners();
    initializeIconFallbacks();
    
    // Verificar espaciado del paginador después del renderizado
    if (currentOptions.showPagination) {
      setTimeout(() => {
        checkPaginationSpacing();
      }, 100);
    }
    
    // Configurar lazy load si está habilitado
    if (isLazyLoadEnabled && !currentOptions.showPagination) {
      setupLazyLoad();
    }
    
    // Aplicar atributo indeterminate a los inputs del header checkbox después de renderizar
    const checkboxHeaders = element.querySelectorAll('input[data-column-checkbox-header]');
    checkboxHeaders.forEach((input) => {
      const headerInput = input as HTMLInputElement;
      const columnId = headerInput.getAttribute('data-column-checkbox-header');
      if (columnId) {
        // Calcular estado indeterminado
        const allChecked = currentOptions.rows.length > 0 && currentOptions.rows.every(row => row.data[columnId] === true);
        const someChecked = currentOptions.rows.some(row => row.data[columnId] === true);
        const isIndeterminate = someChecked && !allChecked;
        
        // Aplicar indeterminate al input nativo
        headerInput.indeterminate = isIndeterminate;
        console.log('📋 [INDETERMINATE] Header checkbox', columnId, '- indeterminate:', isIndeterminate, '(allChecked:', allChecked, 'someChecked:', someChecked, ')');
      }
    });
    
    // Logs para verificar espaciado del paginador
    const checkPaginationSpacing = () => {
      try {
        console.log('📄 [SPACING] ========== VERIFICANDO ESPACIADO DEL PAGINADOR ==========');
        
        // Buscar el contenedor principal
        const container = element.closest('.ubits-data-table__container') || element.querySelector('.ubits-data-table__container') as HTMLElement;
        console.log('📄 [SPACING] Container encontrado:', !!container);
        
        if (container) {
          const containerComputed = window.getComputedStyle(container);
          console.log('📄 [SPACING] Container estilos:');
          console.log('  - display:', containerComputed.display);
          console.log('  - flexDirection:', containerComputed.flexDirection);
          console.log('  - gap:', containerComputed.gap);
          
          // Buscar el contenedor de la tabla (scrollable o tabla directa)
          const tableContainer = container.querySelector('.ubits-data-table__scrollable-container') as HTMLElement || 
                                container.querySelector('.ubits-data-table') as HTMLElement;
          console.log('📄 [SPACING] Table container encontrado:', !!tableContainer);
          
          // Buscar la tabla real dentro del contenedor
          const actualTable = tableContainer?.querySelector('.ubits-data-table__table') as HTMLElement || tableContainer;
          
          // Buscar la última fila
          const lastRow = actualTable?.querySelector('.ubits-data-table__row:last-child') as HTMLElement;
          console.log('📄 [SPACING] Última fila encontrada:', !!lastRow);
          
          if (tableContainer) {
            const tableComputed = window.getComputedStyle(tableContainer);
            console.log('📄 [SPACING] Table container estilos:');
            console.log('  - marginBottom:', tableComputed.marginBottom);
            console.log('  - paddingBottom:', tableComputed.paddingBottom);
            console.log('  - borderBottom:', tableComputed.borderBottom);
            
            if (lastRow) {
              const lastRowRect = lastRow.getBoundingClientRect();
              console.log('📄 [SPACING] Última fila posición:');
              console.log('  - bottom:', lastRowRect.bottom);
            }
          }
          
          // Buscar el paginador
          const paginationWrapper = container.querySelector('.ubits-data-table__pagination-wrapper') as HTMLElement;
          console.log('📄 [SPACING] Pagination wrapper encontrado:', !!paginationWrapper);
          
          if (paginationWrapper) {
            const paginationComputed = window.getComputedStyle(paginationWrapper);
            console.log('📄 [SPACING] Pagination wrapper estilos:');
            console.log('  - marginTop:', paginationComputed.marginTop);
            console.log('  - marginBottom:', paginationComputed.marginBottom);
            console.log('  - paddingTop:', paginationComputed.paddingTop);
            console.log('  - paddingBottom:', paginationComputed.paddingBottom);
            console.log('  - borderTop:', paginationComputed.borderTop);
            
            const paginationRect = paginationWrapper.getBoundingClientRect();
            console.log('📄 [SPACING] Pagination wrapper posición:');
            console.log('  - top:', paginationRect.top);
            
            // Calcular distancia entre última fila y paginador
            if (lastRow) {
              const lastRowRect = lastRow.getBoundingClientRect();
              const distance = paginationRect.top - lastRowRect.bottom;
              console.log('📄 [SPACING] DISTANCIA CALCULADA:');
              console.log('  - Última fila bottom:', lastRowRect.bottom);
              console.log('  - Paginador top:', paginationRect.top);
              console.log('  - DISTANCIA:', distance, 'px');
              console.log('  - Esperado: 16px');
            } else {
              console.log('📄 [SPACING] ⚠️ No se pudo calcular distancia: última fila no encontrada');
            }
          } else {
            console.log('📄 [SPACING] ⚠️ Pagination wrapper NO encontrado');
          }
        } else {
          console.log('📄 [SPACING] ⚠️ Container NO encontrado');
        }
        
        console.log('📄 [SPACING] ========== FIN VERIFICACIÓN ==========');
      } catch (error) {
        console.error('📄 [SPACING] ❌ Error verificando espaciado:', error);
      }
    };
    
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
        
        // También buscar dentro del contenedor scrollable si existe (ya calculado arriba)
        if (scrollableContainer) {
          const checkboxCellsInScrollable = scrollableContainer.querySelectorAll('.ubits-data-table__cell--checkbox[data-column-id="checkbox-2"], .ubits-data-table__cell--checkbox[data-column-id^="checkbox-"]');
          const checkboxHeadersInScrollable = scrollableContainer.querySelectorAll('.ubits-data-table__column-header--checkbox[data-column-id="checkbox-2"], .ubits-data-table__column-header--checkbox[data-column-id^="checkbox-"]');
        }
        
        // Checkbox headers encontrados: checkboxHeaders.length
        
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
    // Detectar si estamos en la web (no en Storybook)
    const isWeb = typeof window !== 'undefined' && window.location && !window.location.href.includes('storybook');
    
    if (isWeb) {
      console.log('🌐🌐🌐 [WEB ATTACH] ========== INICIO attachEventListeners ==========');
      console.log('🌐🌐🌐 [WEB ATTACH] window.location:', window.location?.href);
      console.log('🌐🌐🌐 [WEB ATTACH] element:', {
        tagName: element.tagName,
        id: element.id,
        className: element.className
      });
    }
    
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
      
      // CRÍTICO: Verificar si la columna está fijada ANTES de crear el dropdown
      // Esto es necesario para establecer el z-index correcto
      const isPinned = headerCell.hasAttribute('data-pinned') && headerCell.getAttribute('data-pinned') === 'true';
      const hasStickyClass = headerCell.classList.contains('ubits-data-table__column-header--pinned');
      
      // Detectar si estamos en la web (no en Storybook)
      const isWeb = typeof window !== 'undefined' && !window.location?.href?.includes('storybook');
      
      console.log('🌐 [WEB DEBUG] ========== INICIO CREACIÓN DROPDOWN ==========');
      console.log('🌐 [WEB DEBUG] isWeb:', isWeb);
      console.log('🌐 [WEB DEBUG] columnId:', columnId);
      console.log('🌐 [WEB DEBUG] isPinned:', isPinned);
      console.log('🌐 [WEB DEBUG] hasStickyClass:', hasStickyClass);
      console.log('🌐 [WEB DEBUG] headerCell:', {
        tagName: headerCell.tagName,
        id: headerCell.id,
        className: headerCell.className,
        dataPinned: headerCell.getAttribute('data-pinned'),
        computedPosition: window.getComputedStyle(headerCell).position,
        computedZIndex: window.getComputedStyle(headerCell).zIndex
      });
      
      // CRÍTICO: Para columnas fijadas, el dropdown debe estar fuera del header cell
      // para evitar problemas de contexto de apilamiento con position: sticky
      let dropdown: HTMLElement;
      let dropdownContainer: HTMLElement | null = null;
      
      if (isPinned || hasStickyClass) {
        console.log('🌐 [WEB DEBUG] Columna fijada detectada, creando dropdown fuera del header cell');
        // Para columnas fijadas, crear un contenedor en el body o en el elemento raíz de la tabla
        const tableElement = element.querySelector('.ubits-data-table') as HTMLElement;
        const rootContainer = tableElement?.closest('.ubits-data-table__scrollable-container') || element;
        
        console.log('🌐 [WEB DEBUG] rootContainer:', {
          tagName: rootContainer.tagName,
          id: rootContainer.id,
          className: rootContainer.className,
          isElement: rootContainer === element
        });
        
        // Buscar dropdown existente por data-column-id
        dropdown = rootContainer.querySelector(`.ubits-data-table__column-menu-dropdown[data-column-id="${columnId}"]`) as HTMLElement;
        
        if (!dropdown) {
          console.log('🌐 [WEB DEBUG] Creando nuevo dropdown fuera del header cell');
          dropdown = document.createElement('div');
          dropdown.className = 'ubits-data-table__column-menu-dropdown';
          dropdown.setAttribute('data-column-id', columnId);
          dropdown.style.cssText = `
            position: fixed;
            z-index: 10000 !important;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `;
          rootContainer.appendChild(dropdown);
          console.log('🌐 [WEB DEBUG] ✅ Dropdown creado fuera del header cell para columna fijada');
          console.log('🌐 [WEB DEBUG] Dropdown parent:', {
            tagName: dropdown.parentElement?.tagName,
            id: dropdown.parentElement?.id,
            className: dropdown.parentElement?.className
          });
        } else {
          console.log('🌐 [WEB DEBUG] Dropdown existente encontrado fuera del header cell');
        }
      } else {
        console.log('🌐 [WEB DEBUG] Columna normal, creando dropdown dentro del header cell');
        // Para columnas normales, crear dropdown dentro del header cell
        dropdown = headerCell.querySelector('.ubits-data-table__column-menu-dropdown') as HTMLElement;
        
        if (!dropdown) {
          dropdown = document.createElement('div');
          dropdown.className = 'ubits-data-table__column-menu-dropdown';
          dropdown.setAttribute('data-column-id', columnId);
          dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000 !important;
            margin-top: 4px;
            display: none;
            width: 160px;
            max-width: 160px;
            box-sizing: border-box;
          `;
          headerCell.style.position = 'relative';
          headerCell.appendChild(dropdown);
          console.log('🌐 [WEB DEBUG] ✅ Dropdown creado dentro del header cell para columna normal');
        } else {
          console.log('🌐 [WEB DEBUG] Dropdown existente encontrado dentro del header cell');
        }
      }
      
      console.log('🌐 [WEB DEBUG] ========== FIN CREACIÓN DROPDOWN ==========');
      
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
        // Si el dropdown está fuera del header cell (columna fijada), removerlo del DOM
        if ((isPinned || hasStickyClass) && dropdown.parentElement && dropdown.parentElement !== headerCell) {
          dropdown.remove();
          console.log('✅ [COLUMN MENU] Dropdown removido del DOM (columna fijada)');
        }
      };
      
      let handleOutsideClickRef: ((e: MouseEvent) => void) | null = null;
      
      // Agregar listener para abrir/cerrar el dropdown
      btn.addEventListener('click', (e) => {
        // Detectar si estamos en la web (no en Storybook)
        const isWeb = typeof window !== 'undefined' && window.location && !window.location.href.includes('storybook');
        
        console.log('🌐🌐🌐 [WEB DEBUG CLICK] ========== CLICK EN BOTÓN MENÚ ==========');
        console.log('🌐🌐🌐 [WEB DEBUG CLICK] isWeb:', isWeb);
        console.log('🌐🌐🌐 [WEB DEBUG CLICK] window.location:', window.location?.href);
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
        console.log('🌐🌐🌐 [WEB DEBUG CLICK] Columna pinned:', isPinned);
        console.log('🔍 [COLUMN MENU] Estado de columna - pinned:', isPinned);
        console.log('🔍 [COLUMN MENU] Estado de TODAS las columnas antes del cambio:', 
          currentOptions.columns.map(col => ({ id: col.id, pinned: col.pinned || false })));
        
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
                  
                  // Log del estado de todas las columnas fijadas después del cambio
                  const pinnedColumns = currentOptions.columns.filter(col => col.pinned);
                  console.log('📌 [COLUMN MENU] Columnas fijadas después del cambio:', pinnedColumns.map(col => ({ id: col.id, pinned: col.pinned })));
                  
                  // Llamar callback si existe
                  if (currentOptions.onColumnPin) {
                    currentOptions.onColumnPin(columnId, column.pinned);
                  }
                  
                  // Log del estado ANTES de re-renderizar
                  console.log('🔄 [COLUMN MENU] ========== ANTES DE RE-RENDERIZAR ==========');
                  console.log('🔄 [COLUMN MENU] Estado de currentOptions.columns:', 
                    currentOptions.columns.map(col => ({ id: col.id, pinned: col.pinned || false })));
                  console.log('🔄 [COLUMN MENU] Columna modificada:', columnId, 'pinned:', column.pinned);
                  
                  // Re-renderizar
                  render();
                  
                  // Log del estado DESPUÉS de re-renderizar
                  console.log('🔄 [COLUMN MENU] ========== DESPUÉS DE RE-RENDERIZAR ==========');
                  console.log('🔄 [COLUMN MENU] Estado de currentOptions.columns después:', 
                    currentOptions.columns.map(col => ({ id: col.id, pinned: col.pinned || false })));
                } else {
                  console.error('❌ [COLUMN MENU] Columna no encontrada al intentar fijar:', columnId);
                  console.error('❌ [COLUMN MENU] Columnas disponibles:', currentOptions.columns.map(col => col.id));
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
        // Verificar si la columna está fijada para establecer z-index correcto
        const isCurrentlyPinned = headerCell.hasAttribute('data-pinned') && headerCell.getAttribute('data-pinned') === 'true';
        const hasStickyClassNow = headerCell.classList.contains('ubits-data-table__column-header--pinned');
        const dropdownZIndex = isCurrentlyPinned || hasStickyClassNow ? 10000 : 1000;
        
        console.log('🌐🌐🌐 [WEB DEBUG POSITION] ========== INICIO POSICIONAMIENTO ==========');
        console.log('🌐🌐🌐 [WEB DEBUG POSITION] isWeb:', isWeb);
        console.log('🌐🌐🌐 [WEB DEBUG POSITION] window.location:', window.location?.href);
        console.log('🔍 [COLUMN MENU DROPDOWN] ========== INICIO POSICIONAMIENTO ==========');
        console.log('🌐🌐🌐 [WEB DEBUG POSITION] Estado de la columna:', {
          columnId: columnId,
          isCurrentlyPinned: isCurrentlyPinned,
          hasStickyClassNow: hasStickyClassNow,
          headerCellDataPinned: headerCell.getAttribute('data-pinned'),
          headerCellClasses: headerCell.className,
          headerCellComputedPosition: window.getComputedStyle(headerCell).position,
          headerCellInlinePosition: headerCell.style.position,
          headerCellZIndex: window.getComputedStyle(headerCell).zIndex
        });
        console.log('🔍 [COLUMN MENU DROPDOWN] Estado de la columna:', {
          columnId: columnId,
          isCurrentlyPinned: isCurrentlyPinned,
          hasStickyClassNow: hasStickyClassNow,
          headerCellDataPinned: headerCell.getAttribute('data-pinned'),
          headerCellClasses: headerCell.className,
          headerCellComputedPosition: window.getComputedStyle(headerCell).position,
          headerCellInlinePosition: headerCell.style.position,
          headerCellZIndex: window.getComputedStyle(headerCell).zIndex
        });
        
        // Obtener información del botón
        const btnRect = btn.getBoundingClientRect();
        const headerCellRect = headerCell.getBoundingClientRect();
        
        console.log('🌐🌐🌐 [WEB DEBUG POSITION] Coordenadas del botón:', {
          btnTop: btnRect.top,
          btnBottom: btnRect.bottom,
          btnLeft: btnRect.left,
          btnRight: btnRect.right,
          btnWidth: btnRect.width,
          btnHeight: btnRect.height
        });
        console.log('🔍 [COLUMN MENU DROPDOWN] Coordenadas del botón:', {
          btnTop: btnRect.top,
          btnBottom: btnRect.bottom,
          btnLeft: btnRect.left,
          btnRight: btnRect.right,
          btnWidth: btnRect.width,
          btnHeight: btnRect.height
        });
        
        console.log('🌐🌐🌐 [WEB DEBUG POSITION] Coordenadas del header cell:', {
          headerTop: headerCellRect.top,
          headerBottom: headerCellRect.bottom,
          headerLeft: headerCellRect.left,
          headerRight: headerCellRect.right,
          headerWidth: headerCellRect.width,
          headerHeight: headerCellRect.height
        });
        console.log('🔍 [COLUMN MENU DROPDOWN] Coordenadas del header cell:', {
          headerTop: headerCellRect.top,
          headerBottom: headerCellRect.bottom,
          headerLeft: headerCellRect.left,
          headerRight: headerCellRect.right,
          headerWidth: headerCellRect.width,
          headerHeight: headerCellRect.height
        });
        
        // Si la columna está fijada, usar position: fixed con coordenadas calculadas
        // Si no está fijada, usar position: absolute relativo al header cell
        if (isCurrentlyPinned || hasStickyClassNow) {
          console.log('🌐🌐🌐 [WEB DEBUG POSITION] ========== POSICIONANDO DROPDOWN (COLUMNA FIJADA) ==========');
          console.log('🌐🌐🌐 [WEB DEBUG POSITION] isWeb:', isWeb);
          console.log('🌐🌐🌐 [WEB DEBUG POSITION] isCurrentlyPinned:', isCurrentlyPinned);
          console.log('🌐🌐🌐 [WEB DEBUG POSITION] hasStickyClassNow:', hasStickyClassNow);
          console.log('🔍 [COLUMN MENU DROPDOWN] Usando position: fixed (columna fijada)');
          
          // Verificar dónde está el dropdown antes de posicionarlo
          console.log('🌐🌐🌐 [WEB DEBUG POSITION] Dropdown antes de posicionar:', {
            parentElement: dropdown.parentElement ? {
              tagName: dropdown.parentElement.tagName,
              id: dropdown.parentElement.id,
              className: dropdown.parentElement.className,
              isHeaderCell: dropdown.parentElement === headerCell
            } : 'NO TIENE PARENT',
            isInHeaderCell: dropdown.parentElement === headerCell,
            isInRootContainer: dropdown.parentElement !== headerCell && dropdown.parentElement !== null
          });
          
          // Para columnas fijadas, usar fixed positioning para que quede por encima
          // CRÍTICO: Asegurar que el dropdown esté fuera del contexto de apilamiento del sticky
          // Usar setProperty con !important para forzar los estilos
          dropdown.style.setProperty('position', 'fixed', 'important');
          dropdown.style.setProperty('top', `${btnRect.bottom + 4}px`, 'important');
          // Alinear a la derecha del botón (el dropdown tiene width: 160px)
          // Calcular left para que el dropdown quede alineado a la derecha del botón
          const calculatedLeft = btnRect.right - 160;
          dropdown.style.setProperty('left', `${calculatedLeft}px`, 'important');
          dropdown.style.setProperty('right', 'auto', 'important');
          dropdown.style.setProperty('z-index', `${dropdownZIndex}`, 'important');
          dropdown.style.setProperty('display', 'block', 'important');
          
          console.log('🌐🌐🌐 [WEB DEBUG POSITION] Estilos aplicados con setProperty:', {
            position: 'fixed',
            top: `${btnRect.bottom + 4}px`,
            left: `${calculatedLeft}px`,
            zIndex: `${dropdownZIndex}`,
            display: 'block',
            btnRect: {
              top: btnRect.top,
              bottom: btnRect.bottom,
              left: btnRect.left,
              right: btnRect.right
            }
          });
          
          // Verificar estilos después de aplicar
          setTimeout(() => {
            const computedStyle = window.getComputedStyle(dropdown);
            const dropdownRect = dropdown.getBoundingClientRect();
            console.log('🌐🌐🌐 [WEB DEBUG POSITION] Estilos computados DESPUÉS de aplicar:', {
              position: computedStyle.position,
              top: computedStyle.top,
              left: computedStyle.left,
              zIndex: computedStyle.zIndex,
              display: computedStyle.display,
              dropdownRect: {
                top: dropdownRect.top,
                bottom: dropdownRect.bottom,
                left: dropdownRect.left,
                right: dropdownRect.right,
                width: dropdownRect.width,
                height: dropdownRect.height
              },
              parentElement: {
                tagName: dropdown.parentElement?.tagName,
                id: dropdown.parentElement?.id,
                className: dropdown.parentElement?.className,
                computedPosition: dropdown.parentElement ? window.getComputedStyle(dropdown.parentElement).position : 'N/A',
                computedZIndex: dropdown.parentElement ? window.getComputedStyle(dropdown.parentElement).zIndex : 'N/A'
              },
              headerCellZIndex: window.getComputedStyle(headerCell).zIndex,
              headerCellPosition: window.getComputedStyle(headerCell).position
            });
            console.log('🌐🌐🌐 [WEB DEBUG POSITION] ========== FIN POSICIONAMIENTO ==========');
          }, 10);
          
          console.log('🔍 [COLUMN MENU DROPDOWN] Estilos aplicados (fixed):', {
            position: dropdown.style.position,
            top: dropdown.style.top,
            left: dropdown.style.left,
            right: dropdown.style.right,
            zIndex: dropdown.style.zIndex,
            calculatedLeft: calculatedLeft,
            btnRight: btnRect.right,
            btnLeft: btnRect.left,
            dropdownWidth: 160,
            btnRect: {
              top: btnRect.top,
              bottom: btnRect.bottom,
              left: btnRect.left,
              right: btnRect.right,
              width: btnRect.width,
              height: btnRect.height
            }
          });
        } else {
          console.log('🔍 [COLUMN MENU DROPDOWN] Usando position: absolute (columna normal)');
          // Para columnas normales, usar absolute positioning relativo al header cell
          dropdown.style.position = 'absolute';
          dropdown.style.top = '100%';
          dropdown.style.right = '0';
          dropdown.style.left = 'auto';
          dropdown.style.zIndex = `${dropdownZIndex}`;
          dropdown.style.setProperty('z-index', `${dropdownZIndex}`, 'important');
          
          console.log('🔍 [COLUMN MENU DROPDOWN] Estilos aplicados (absolute):', {
            position: dropdown.style.position,
            top: dropdown.style.top,
            right: dropdown.style.right,
            left: dropdown.style.left,
            zIndex: dropdown.style.zIndex
          });
        }
        
        dropdown.style.display = 'block';
        isOpen = true;
        
        // Obtener información después de mostrar el dropdown
        const dropdownRect = dropdown.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(dropdown);
        
        console.log('🔍 [COLUMN MENU DROPDOWN] Estado después de mostrar:', {
          display: dropdown.style.display,
          computedDisplay: computedStyle.display,
          position: computedStyle.position,
          top: computedStyle.top,
          left: computedStyle.left,
          right: computedStyle.right,
          zIndex: computedStyle.zIndex,
          dropdownRect: {
            top: dropdownRect.top,
            bottom: dropdownRect.bottom,
            left: dropdownRect.left,
            right: dropdownRect.right,
            width: dropdownRect.width,
            height: dropdownRect.height
          },
          offsetWidth: dropdown.offsetWidth,
          offsetHeight: dropdown.offsetHeight,
          isVisible: dropdownRect.width > 0 && dropdownRect.height > 0
        });
        
        console.log('🔍 [COLUMN MENU DROPDOWN] ========== FIN POSICIONAMIENTO ==========');
        
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
        dropdown.style.backgroundColor = 'var(--ubits-bg-1)';
        dropdown.style.border = '1px solid var(--ubits-border-1)';
        dropdown.style.borderRadius = '8px';
        // El componente List ya tiene su propio box-shadow, no aplicar aquí
        // El List maneja: box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
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
    
    // Checkbox buttons (tipo 'checkbox') - manejar activación/desactivación
    // Manejar tanto los editables como los no editables (checkbox-2)
    const checkboxButtons = element.querySelectorAll('input[data-checkbox-button="true"]');
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
          
          // Llamar callback onRowSelect si existe
          if (currentOptions.onRowSelect) {
            currentOptions.onRowSelect(rowId, newInput.checked);
          }
          
          // Re-renderizar para reflejar los cambios visuales (incluyendo header indeterminado)
          render();
        }
      });
    });
    
    // Checkbox del header (select all) - manejar selección/deselección de todas las filas
    const headerCheckboxes = element.querySelectorAll('input[data-column-checkbox-header]');
    headerCheckboxes.forEach(checkbox => {
      const input = checkbox as HTMLInputElement;
      const columnId = input.getAttribute('data-column-checkbox-header');
      
      if (!columnId) return;
      
      // Remover listeners anteriores si existen
      const newInput = input.cloneNode(true) as HTMLInputElement;
      input.parentNode?.replaceChild(newInput, input);
      
      newInput.addEventListener('change', (e) => {
        e.stopPropagation();
        
        const selected = newInput.checked;
        
        // Actualizar todas las filas
        currentOptions.rows.forEach(row => {
          if (!row.data) row.data = {};
          row.data[columnId] = selected;
        });
        
        // Llamar callback onSelectAll si existe
        if (currentOptions.onSelectAll) {
          currentOptions.onSelectAll(selected);
        }
        
        // Re-renderizar para reflejar los cambios visuales
        render();
      });
    });
    
    // Date editables - mostrar calendario UBITS al hacer click
    // Implementación igual a InputProvider que funciona correctamente en Storybook
    // Detectar si estamos en la web (no en Storybook)
    const isWeb = typeof window !== 'undefined' && window.location && !window.location.href.includes('storybook');
    
    if (isWeb) {
      console.log('🌐🌐🌐 [WEB DATE EDITABLE] ========== INICIO CONFIGURACIÓN DATE EDITABLE ==========');
      console.log('🌐🌐🌐 [WEB DATE EDITABLE] window.location:', window.location?.href);
      console.log('🌐🌐🌐 [WEB DATE EDITABLE] element:', {
        tagName: element.tagName,
        id: element.id,
        className: element.className,
        innerHTMLLength: element.innerHTML.length,
        innerHTMLPreview: element.innerHTML.substring(0, 500)
      });
    }
    
    // Date editable cells - inicializar calendarios para celdas de fecha editables
    const dateEditables = element.querySelectorAll('.ubits-data-table__date-editable');
    
    dateEditables.forEach((dateEditableContainer, index) => {
      const rowIdStr = dateEditableContainer.getAttribute('data-row-id');
      const columnId = dateEditableContainer.getAttribute('data-column-id');
      
      if (!rowIdStr || !columnId) {
        return;
      }
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      const dateDisplay = dateEditableContainer.querySelector('.ubits-data-table__date-display') as HTMLElement;
      
      if (!dateDisplay) {
        return;
      }
      
      // Variables para mantener la instancia del calendario
      let calendarInstance: ReturnType<typeof import('../../calendar/src/CalendarProvider').createCalendar> | null = null;
      let externalCalendarContainer: HTMLElement | null = null;
      
      // Referencias a los handlers para poder removerlos después
      let handleOutsideClickRef: ((e: MouseEvent) => void) | null = null;
      let handleEscapeKeyRef: ((e: KeyboardEvent) => void) | null = null;
      let handleScrollRef: (() => void) | null = null;
      let scrollableContainer: HTMLElement | null = null;
      
      // Función para formatear fecha
      const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
      
      // Función para parsear fecha
      const parseDate = (dateStr: string): Date | null => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split('/');
        if (day && month && year) {
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
        try {
          const date = new Date(dateStr);
          if (!isNaN(date.getTime())) {
            return date;
          }
        } catch (e) {
          // Ignorar error
        }
        return null;
      };
      
      // Función para cerrar el calendario y limpiar listeners
      const closeCalendar = () => {
        if (externalCalendarContainer) {
          externalCalendarContainer.style.display = 'none';
          if (externalCalendarContainer.parentElement) {
            externalCalendarContainer.remove();
          }
          externalCalendarContainer = null;
        }
        
        // Limpiar listeners
        if (handleOutsideClickRef) {
          document.removeEventListener('click', handleOutsideClickRef);
          handleOutsideClickRef = null;
        }
        if (handleEscapeKeyRef) {
          document.removeEventListener('keydown', handleEscapeKeyRef);
          handleEscapeKeyRef = null;
        }
        if (handleScrollRef) {
          window.removeEventListener('scroll', handleScrollRef, true);
          if (scrollableContainer) {
            scrollableContainer.removeEventListener('scroll', handleScrollRef, true);
          }
          handleScrollRef = null;
        }
      };
      
      // Función para agregar listeners (solo cuando se abre el calendario)
      const addCalendarListeners = () => {
        // Cerrar calendario al hacer clic fuera
        handleOutsideClickRef = (e: MouseEvent) => {
          if (externalCalendarContainer && 
              !dateEditableContainer.contains(e.target as Node) && 
              !externalCalendarContainer.contains(e.target as Node)) {
            closeCalendar();
          }
        };
        
        // Cerrar calendario al presionar ESC
        handleEscapeKeyRef = (e: KeyboardEvent) => {
          if (e.key === 'Escape' && externalCalendarContainer) {
            closeCalendar();
          }
        };
        
        // Cerrar calendario al hacer scroll (para evitar que quede desalineado)
        // PERO NO cerrar si el scroll es dentro del calendario o sus dropdowns
        handleScrollRef = (e?: Event) => {
          if (!externalCalendarContainer) {
            return;
          }
          
          // Verificar si el scroll está ocurriendo dentro del calendario
          // Buscar elementos que están haciendo scroll dentro del calendario
          const calendarElement = externalCalendarContainer.querySelector('.ubits-calendar');
          if (calendarElement) {
            // Verificar si hay algún dropdown abierto
            const monthDropdown = calendarElement.querySelector('.ubits-calendar__month-dropdown[style*="display: block"]');
            const yearDropdown = calendarElement.querySelector('.ubits-calendar__year-dropdown[style*="display: block"]');
            
            if (monthDropdown || yearDropdown) {
              // Hay un dropdown abierto, verificar si el elemento activo está dentro
              const activeElement = document.activeElement as HTMLElement;
              if (activeElement) {
                // Verificar si el elemento activo está dentro del calendario o sus dropdowns
                if (externalCalendarContainer.contains(activeElement) ||
                    activeElement.closest('.ubits-calendar') ||
                    activeElement.closest('.ubits-calendar__month-dropdown') ||
                    activeElement.closest('.ubits-calendar__year-dropdown') ||
                    activeElement.closest('.ubits-list') ||
                    activeElement.closest('[id*="calendar-list"]') ||
                    activeElement.closest('[id*="calendar-scrollbar"]')) {
                  // El elemento activo está dentro del calendario, no cerrar
                  return;
                }
              }
              
              // Si hay un evento, verificar el target
              if (e && e.target) {
                const target = e.target as HTMLElement;
                if (externalCalendarContainer.contains(target) ||
                    target.closest('.ubits-calendar') ||
                    target.closest('.ubits-calendar__month-dropdown') ||
                    target.closest('.ubits-calendar__year-dropdown') ||
                    target.closest('.ubits-list') ||
                    target.closest('[id*="calendar-list"]') ||
                    target.closest('[id*="calendar-scrollbar"]')) {
                  // El scroll es dentro del calendario, no cerrar
                  return;
                }
              }
              
              // Si hay un dropdown abierto, no cerrar por scroll (permitir scroll en el dropdown)
              return;
            }
          }
          
          // El scroll es fuera del calendario, cerrar
          closeCalendar();
        };
        
        document.addEventListener('click', handleOutsideClickRef);
        document.addEventListener('keydown', handleEscapeKeyRef);
        
        // Agregar listeners de scroll en window y en el contenedor scrollable si existe
        scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
        if (scrollableContainer) {
          scrollableContainer.addEventListener('scroll', handleScrollRef, true);
        }
        window.addEventListener('scroll', handleScrollRef, true);
      };
      
      // Función para cargar estilos CSS del calendario si no están cargados
      const loadCalendarStyles = async (): Promise<void> => {
        // Rutas relativas desde index.html (packages/proyecto-app/tokens/index.html)
        // hacia los archivos CSS en packages/addons/
        const stylesToLoad = [
          { 
            id: 'ubits-calendar-styles', 
            fileName: 'calendar.css', 
            href: '../../addons/calendar/src/styles/calendar.css'
          },
          { 
            id: 'ubits-button-styles', 
            fileName: 'button.css', 
            href: '../../addons/button/src/styles/button.css'
          },
          { 
            id: 'ubits-input-styles', 
            fileName: 'input.css', 
            href: '../../addons/input/src/styles/input.css'
          },
          { 
            id: 'ubits-list-styles', 
            fileName: 'list.css', 
            href: '../../addons/list/src/styles/list.css'
          }
        ];
        
        for (const style of stylesToLoad) {
          // Verificar si el estilo ya está cargado por ID
          const existingStyle = document.getElementById(style.id);
          
          // Verificar si ya existe un <link> con este href o que contenga el nombre del archivo
          const existingLink = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'))
            .find(link => {
              const href = (link as HTMLLinkElement).href || '';
              return href.includes(style.fileName) || link.id === style.id;
            });
          
          if (existingStyle || existingLink) {
            continue;
          }
          
          // Cargar usando <link> tag (funciona tanto con file:// como con http://)
          const linkElement = document.createElement('link');
          linkElement.rel = 'stylesheet';
          linkElement.href = style.href;
          linkElement.id = style.id;
          
          // Agregar al DOM inmediatamente (no esperar onload para file://)
          document.head.appendChild(linkElement);
        }
      };
      
      // Función para mostrar el calendario UBITS
      const showCalendar = async () => {
        // Si el calendario ya está visible, cerrarlo
        if (externalCalendarContainer && externalCalendarContainer.style.display !== 'none') {
          closeCalendar();
          return;
        }
        
        // Si el calendario ya existe, solo actualizar posición y mostrarlo
        if (calendarInstance && externalCalendarContainer) {
          const dateDisplayRect = dateDisplay.getBoundingClientRect();
          externalCalendarContainer.style.top = `${dateDisplayRect.bottom + 4}px`;
          externalCalendarContainer.style.left = `${dateDisplayRect.left}px`;
          externalCalendarContainer.style.display = 'block';
          addCalendarListeners();
          return;
        }
        
        try {
          // Cargar estilos CSS del calendario antes de crear la instancia
          await loadCalendarStyles();
          
          // Importar y usar directamente el componente UBITS Calendar
          const { createCalendar } = await import('../../calendar/src/index');
          
          // Obtener fecha actual del display
          const currentValue = dateDisplay.textContent || '';
          const parsedDate = parseDate(currentValue);
          const initialDate = parsedDate || new Date();
          
          calendarInstance = createCalendar({
            mode: 'single',
            selectedDate: parsedDate,
            initialDate: initialDate,
            onDateSelect: (date: Date) => {
              const formattedDate = formatDate(date);
              dateDisplay.textContent = formattedDate;
              
              // Actualizar datos de la fila
              const row = currentOptions.rows.find(r => r.id === rowId);
              if (row) {
                row.data[columnId] = formattedDate;
                row.data[`${columnId}_iso`] = date.toISOString().split('T')[0];
              }
              
              // Cerrar calendario y re-renderizar
              closeCalendar();
              render();
            }
          });
          
          // Crear contenedor para el calendario
          externalCalendarContainer = document.createElement('div');
          externalCalendarContainer.className = 'ubits-data-table__calendar-container';
          externalCalendarContainer.setAttribute('data-row-id', String(rowId));
          externalCalendarContainer.setAttribute('data-column-id', columnId);
          
          // Calcular posición usando getBoundingClientRect
          const dateDisplayRect = dateDisplay.getBoundingClientRect();
          const topPosition = dateDisplayRect.bottom + 4;
          const leftPosition = dateDisplayRect.left;
          
          // Aplicar estilos con position fixed
          externalCalendarContainer.style.cssText = `
            position: fixed;
            top: ${topPosition}px;
            left: ${leftPosition}px;
            z-index: 99999;
            display: block;
            margin: 0;
          `;
          
          // Agregar al body
          document.body.appendChild(externalCalendarContainer);
          
          // Agregar el elemento del calendario UBITS al contenedor
          externalCalendarContainer.appendChild(calendarInstance.element);
          
          // Agregar listeners
          addCalendarListeners();
        } catch (error) {
          console.error('❌ [CALENDAR] Error cargando Calendar UBITS:', error);
        }
      };
      
      // Event listener para mostrar el calendario al hacer clic
      dateDisplay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showCalendar();
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
    
    // Event listeners para el paginador si está habilitado
    if (currentOptions.showPagination) {
      const paginationElement = element.querySelector('.ubits-data-table__pagination');
      if (paginationElement) {
        // Event listeners para botones de página
        const pageButtons = paginationElement.querySelectorAll('.ubits-pagination__page-button');
        pageButtons.forEach(button => {
          button.addEventListener('click', () => {
            const page = parseInt(button.textContent || '1');
            if (currentOptions.onPageChange) {
              currentOptions.onPageChange(page);
            }
            currentOptions.currentPage = page;
            render();
          });
        });
        
        // Event listeners para botones de navegación
        const navButtons = paginationElement.querySelectorAll('.ubits-pagination__nav-button');
        navButtons.forEach(button => {
          button.addEventListener('click', () => {
            const currentPage = parseInt(paginationElement.getAttribute('data-current-page') || '1');
            const totalPages = parseInt(paginationElement.getAttribute('data-total-pages') || '1');
            const ariaLabel = button.getAttribute('aria-label') || '';
            
            let newPage = currentPage;
            if (ariaLabel.includes('Primera') || ariaLabel.includes('First')) {
              newPage = 1;
            } else if (ariaLabel.includes('Última') || ariaLabel.includes('Last')) {
              newPage = totalPages;
            } else if (ariaLabel.includes('Anterior') || ariaLabel.includes('Previous')) {
              newPage = Math.max(1, currentPage - 1);
            } else if (ariaLabel.includes('Siguiente') || ariaLabel.includes('Next')) {
              newPage = Math.min(totalPages, currentPage + 1);
            }
            
            if (newPage !== currentPage) {
              if (currentOptions.onPageChange) {
                currentOptions.onPageChange(newPage);
              }
              currentOptions.currentPage = newPage;
              render();
            }
          });
        });
        
        // Event listener para selector de items por página
        const itemsPerPageSelect = paginationElement.querySelector('.ubits-pagination__select') as HTMLSelectElement;
        if (itemsPerPageSelect) {
          itemsPerPageSelect.addEventListener('change', (e) => {
            const target = e.target as HTMLSelectElement;
            const value = parseInt(target.value);
            if (currentOptions.onItemsPerPageChange) {
              currentOptions.onItemsPerPageChange(value);
            }
            currentOptions.itemsPerPage = value;
            currentOptions.currentPage = 1; // Reset a página 1 cuando cambia items por página
            render();
          });
        }
      }
    }
    
    } catch (error) {
      // Error en attachEventListeners
    }
  };

  // Llamar render inicial
  render();

  // Función de actualización
  const update = (newOptions: Partial<DataTableOptions>) => {
    const previousShowPagination = currentOptions.showPagination;
    currentOptions = { ...currentOptions, ...newOptions };
    
    // Si cambió el estado de paginación, resetear lazy load
    if (newOptions.showPagination !== undefined && newOptions.showPagination !== previousShowPagination) {
      if (newOptions.showPagination) {
        // Se activó paginación, desactivar lazy load y remover listeners
        if (lazyLoadScrollListener) {
          const scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement || 
                                      element.querySelector('.ubits-data-table') as HTMLElement ||
                                      element;
          if (scrollableContainer) {
            scrollableContainer.removeEventListener('scroll', lazyLoadScrollListener);
          }
          window.removeEventListener('scroll', lazyLoadScrollListener, true);
          lazyLoadScrollListener = null;
        }
        lazyLoadCurrentItems = lazyLoadItemsPerBatch; // Resetear contador
      } else {
        // Se desactivó paginación, reactivar lazy load
        lazyLoadCurrentItems = lazyLoadItemsPerBatch; // Resetear contador
      }
    }
    
    if (newOptions.columns) {
      columnOrder = newOptions.columns
        .filter(col => col.visible !== false)
        .map(col => col.id);
    }
    if (newOptions.rows) {
      rowOrder = newOptions.rows.map(row => row.id);
      // Resetear lazy load cuando cambian las filas
      lazyLoadCurrentItems = lazyLoadItemsPerBatch;
    }
    render();
  };

  // Función de destrucción
  const destroy = () => {
    // Remover listener de lazy load si existe
    if (lazyLoadScrollListener) {
      const scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement || 
                                  element.querySelector('.ubits-data-table') as HTMLElement ||
                                  element;
      if (scrollableContainer) {
        scrollableContainer.removeEventListener('scroll', lazyLoadScrollListener);
      }
      window.removeEventListener('scroll', lazyLoadScrollListener, true);
      lazyLoadScrollListener = null;
    }
    
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

