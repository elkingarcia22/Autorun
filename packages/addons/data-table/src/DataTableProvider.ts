import type { DataTableOptions, TableColumn, TableRow, ColumnType } from './types/DataTableOptions';
import { renderCheckbox } from '../../checkbox/src/CheckboxProvider';
import { renderProgressBar } from '../../progress/src/ProgressProvider';
import { renderStatusTag } from '../../status-tag/src/StatusTagProvider';
import { renderAvatar } from '../../avatar/src/AvatarProvider';
import { renderToggle } from '../../toggle/src/ToggleProvider';
import { renderRadioButton } from '../../radio-button/src/RadioButtonProvider';
import { renderButton } from '../../button/src/ButtonProvider';
import { createList, renderList } from '../../list/src/ListProvider';
import type { ListItem } from '../../list/src/types/ListOptions';
import { createScrollbar } from '../../scroll/src/ScrollProvider';
import { renderPagination } from '../../pagination/src/PaginationProvider';
import { renderSearchButton, createSearchButton } from '../../search-button/src/SearchButtonProvider';
import type { SearchButtonOptions } from '../../search-button/src/types/SearchButtonOptions';
import { createDrawer } from '../../drawer/src/DrawerProvider';
import { renderBadge } from '../../badge/src/BadgeProvider';
import { renderInput, createInput } from '../../input/src/InputProvider';
import { renderEmptyState } from '../../empty-state/src/EmptyStateProvider';
// Importar estilos del List para que se carguen
import '../../list/src/styles/list.css';
// Importar estilos del SearchButton para que se carguen
import '../../search-button/src/styles/search-button.css';
// Importar estilos del Drawer para que se carguen
import '../../drawer/src/styles/drawer.css';
// Importar estilos del Badge para que se carguen
import '../../badge/src/styles/badge.css';
// Importar estilos del Input para que se carguen
import '../../input/src/styles/input.css';
// Importar estilos del EmptyState para que se carguen
import '../../empty-state/src/styles/empty-state.css';

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
      const buttonHTML = renderButton({
        text: 'Eliminar',
        variant: 'tertiary',
        size: 'sm',
        icon: 'trash',
        iconStyle: 'regular',
        className: 'ubits-data-table__action-button',
        attributes: {
          'data-row-id': String(row.id),
          'data-column-id': column.id
        }
      });
      return buttonHTML;
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
    console.log('📋 [ROW RENDER] Fila expandida - rowId:', row.id, 'colspan:', colspan, 'tiene contenido:', !!expandedContent);
    rowHTML += `
      <tr class="ubits-data-table__row-expanded-row" data-expanded-for="${row.id}">
        <td class="ubits-data-table__row-expanded-content" colspan="${colspan}">
          ${expandedContent}
        </td>
      </tr>
    `;
  } else if (isExpanded && !row.renderExpandedContent) {
    console.warn('📋 [ROW RENDER] ⚠️ Fila marcada como expandida pero no tiene renderExpandedContent - rowId:', row.id);
  }

  return rowHTML;
}


/**
 * Renderiza el header del DataTable con título, contador y botones
 */
function renderDataTableHeader(options: DataTableOptions, activeFilters: Record<string, string> = {}): string {
  const { header, rows } = options;
  
  // Si no hay configuración de header, no renderizar nada
  if (!header) {
    return '';
  }
  
  const {
    title,
    showTitle = title !== undefined,
    counter,
    displayedItems,
    totalItems,
    showCounter = counter !== undefined && counter !== false,
    primaryButton,
    showPrimaryButton = primaryButton !== undefined,
    secondaryButtons = [],
    showSecondaryButtons = secondaryButtons !== undefined && secondaryButtons.length > 0,
    searchButton,
    showSearchButton = searchButton !== undefined,
    filterButton,
    showFilterButton = filterButton !== undefined,
    columnSelectorButton,
    showColumnSelectorButton = columnSelectorButton !== undefined
  } = header;
  
  // Obtener el estado activo del SearchButton desde las opciones (si existe)
  const isSearchActive = (header as any).__isSearchActive || false;
  const searchTerm = (header as any).__searchTerm || '';
  
  // Calcular contador
  let counterText = '';
  if (showCounter && counter) {
    if (typeof counter === 'string') {
      // Si es 'total-only', mostrar solo el total
      if (counter === 'total-only') {
        const total = totalItems !== undefined ? totalItems : rows.length;
        counterText = `${total} resultados`;
      } else {
        // Si es otro string, usar ese texto directamente
        counterText = counter;
      }
    } else if (counter === true) {
      // Modo "X/Y resultados"
      const currentDisplayed = displayedItems !== undefined ? displayedItems : rows.length;
      const total = totalItems !== undefined ? totalItems : rows.length;
      counterText = `${currentDisplayed}/${total} resultados`;
      console.log('🔢 [COUNTER] Calculando contador:', {
        displayedItems,
        totalItems,
        rowsLength: rows.length,
        currentDisplayed,
        total,
        counterText
      });
    }
  }
  
  // Renderizar título y contador
  const titleSection = showTitle && title ? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-body-md-bold ubits-data-table__header-title-text">${title}</span>
      ${counterText ? `<span class="ubits-data-table__header-counter ubits-body-sm-regular">${counterText}</span>` : ''}
    </div>
  ` : counterText ? `
    <div class="ubits-data-table__header-title">
      <span class="ubits-data-table__header-counter ubits-body-sm-regular">${counterText}</span>
    </div>
  ` : '';
  
  // Renderizar botón primario (icon-only)
  const primaryButtonHTML = showPrimaryButton && primaryButton ? renderButton({
    variant: 'primary',
    size: 'sm',
    icon: primaryButton.icon || 'plus',
    iconStyle: primaryButton.iconStyle || 'regular',
    iconOnly: true,
    disabled: primaryButton.disabled || false,
    loading: primaryButton.loading || false,
    className: 'ubits-data-table__header-primary-button',
    showTooltip: true,
    tooltipText: primaryButton.text || 'Nuevo'
  }) : '';
  
  // Renderizar botones secundarios (máximo 2, icon-only)
  const secondaryButtonsHTML = showSecondaryButtons && secondaryButtons.length > 0
    ? secondaryButtons.slice(0, 2).map(btn => renderButton({
        variant: 'secondary',
        size: 'sm',
        icon: btn.icon || 'download',
        iconStyle: btn.iconStyle || 'regular',
        iconOnly: true,
        disabled: btn.disabled || false,
        loading: btn.loading || false,
        className: 'ubits-data-table__header-secondary-button',
        showTooltip: true,
        tooltipText: btn.text || ''
      })).join('')
    : '';
  
  // Contar filtros activos
  const activeFiltersCount = Object.keys(activeFilters).filter(key => activeFilters[key] && activeFilters[key].trim() !== '').length;
  
  // Renderizar botón de filtros (icon-only) con badge si hay filtros activos
  let filterButtonHTML = showFilterButton && filterButton ? renderButton({
    variant: 'secondary',
    size: 'sm',
    icon: 'filter',
    iconStyle: 'regular',
    iconOnly: true,
    disabled: filterButton.disabled || false,
    active: filterButton.active || false || activeFiltersCount > 0,
    badge: activeFiltersCount > 0, // Activar badge si hay filtros activos
    className: 'ubits-data-table__header-filter-button',
    showTooltip: true,
    tooltipText: 'Filtros'
  }) : '';
  
  // Reemplazar el badge genérico con uno que muestre el número si hay filtros activos
  if (filterButtonHTML && activeFiltersCount > 0) {
    // Crear el badge con el número de filtros activos
    // Usar las clases del badge normal pero mantener la clase del botón para posicionamiento
    const badgeHTML = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--primary ubits-button__badge">${activeFiltersCount}</span>`;
    // Reemplazar el badge genérico del botón con el badge personalizado
    filterButtonHTML = filterButtonHTML.replace(
      '<span class="ubits-button__badge"></span>', 
      badgeHTML
    );
  }
  
  // Renderizar botón de seleccionar columnas (icon-only)
  const columnSelectorButtonHTML = showColumnSelectorButton && columnSelectorButton ? renderButton({
    variant: 'secondary',
    size: 'sm',
    icon: 'columns-3',
    iconStyle: 'regular',
    iconOnly: true,
    disabled: columnSelectorButton.disabled || false,
    active: columnSelectorButton.active || false,
    className: 'ubits-data-table__header-column-selector-button',
    showTooltip: true,
    tooltipText: 'Seleccionar columnas'
  }) : '';
  
  // Obtener el valor del término de búsqueda desde las opciones (si existe)
  const currentSearchValue = searchTerm || (searchButton && searchButton.value) || '';
  
  // Renderizar botón de búsqueda (icon-only, al final)
  const searchButtonHTML = showSearchButton && searchButton ? renderSearchButton({
    active: isSearchActive,
    size: 'sm',
    state: isSearchActive ? 'active' : 'default',
    disabled: searchButton.disabled || false,
    placeholder: searchButton.placeholder || 'Buscar...',
    value: currentSearchValue,
    width: 248,
    className: 'ubits-data-table__header-search-button'
  }) : '';
  
  // Si no hay ningún elemento, no renderizar el header
  const hasAnyElement = !!(titleSection || primaryButtonHTML || secondaryButtonsHTML || searchButtonHTML || filterButtonHTML || columnSelectorButtonHTML);
  
  if (!hasAnyElement) {
    console.warn('⚠️ [DATA TABLE HEADER] No hay elementos para renderizar, retornando vacío');
    return '';
  }
  
  return `
    <div class="ubits-data-table__header">
      ${titleSection}
      <div class="ubits-data-table__header-actions">
        ${searchButtonHTML}
        ${filterButtonHTML}
        ${columnSelectorButtonHTML}
        ${secondaryButtonsHTML}
        ${primaryButtonHTML}
      </div>
    </div>
  `.trim();
}

/**
 * Renderiza el HTML de un Data Table 3
 */
export function renderDataTable(
  options: DataTableOptions,
  columnOrder: string[] = [],
  rowOrder: (string | number)[] = [],
  activeFilters: Record<string, string> = {}
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
    lazyLoadItemsPerBatch = 10,
    emptyState
  } = options;
  
  // Extraer searchTerm de las opciones del header si existe
  const searchTerm = (options.header as any)?.__searchTerm || '';
  
  // Si showPagination está activo, desactivar lazy load automáticamente
  const isLazyLoadEnabled = showPagination ? false : (lazyLoad !== false); // Por defecto true si no hay paginación
  console.log('🔍 [RENDER] isLazyLoadEnabled calculado:', isLazyLoadEnabled, '| showPagination:', showPagination, '| lazyLoad:', lazyLoad);

  // Logs de paginación - limpiados

  // Eliminar columnas duplicadas por ID primero (mantener solo la primera ocurrencia)
  const seenIds = new Set<string>();
  const uniqueColumns = columns.filter(col => {
    if (seenIds.has(col.id)) {
      console.log('🔍 [RENDER DATA TABLE] ⚠️ COLUMNA DUPLICADA ELIMINADA:', col.id, col.title);
      return false;
    }
    seenIds.add(col.id);
    return true;
  });
  
  console.log('🔍 [RENDER DATA TABLE] Columnas únicas:', uniqueColumns.length, 'de', columns.length, 'totales');
  
  // Filtrar columnas visibles
  let visibleColumns = uniqueColumns.filter(col => col.visible !== false);
  
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
  
  console.log('🔍 [RENDER] ========== FILAS DEBUG ==========');
  console.log('🔍 [RENDER] orderedRows.length:', orderedRows.length);
  console.log('🔍 [RENDER] showPagination:', showPagination);
  console.log('🔍 [RENDER] isLazyLoadEnabled:', isLazyLoadEnabled);
  console.log('🔍 [RENDER] lazyLoad option:', (options as any).lazyLoad);
  console.log('🔍 [RENDER] currentLoadedItems:', currentLoadedItems);
  console.log('🔍 [RENDER] lazyLoadItemsPerBatch:', lazyLoadItemsPerBatch);
  
  if (showPagination) {
    // Modo paginación tradicional
    const totalRows = orderedRows.length;
    totalPages = Math.max(1, Math.ceil(totalRows / itemsPerPage));
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    paginatedRows = orderedRows.slice(startIndex, endIndex);
    console.log('🔍 [RENDER] Modo PAGINACIÓN - totalRows:', totalRows, 'paginatedRows:', paginatedRows.length);
    
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
    console.log('🔍 [RENDER] Modo LAZY LOAD - Mostrando', paginatedRows.length, 'de', orderedRows.length, 'filas');
  } else {
    console.log('🔍 [RENDER] Modo SIN PAGINACIÓN NI LAZY LOAD - Mostrando todas las filas:', orderedRows.length);
  }
  
  console.log('🔍 [RENDER] paginatedRows.length final:', paginatedRows.length);
  console.log('🔍 [RENDER] ========== FIN FILAS DEBUG ==========');
  
  // Detectar si debemos mostrar empty state
  let emptyStateHTML = '';
  const hasNoData = rows.length === 0;
  const hasNoResults = paginatedRows.length === 0;
  const hasActiveFilters = Object.keys(activeFilters).length > 0;
  const hasSearchTerm = searchTerm && searchTerm.trim() !== '';
  
  if (hasNoResults && emptyState) {
    let emptyStateConfig;
    
    if (hasNoData && emptyState.noData) {
      // No hay datos en absoluto
      emptyStateConfig = emptyState.noData;
    } else if (hasSearchTerm && emptyState.noSearchResults) {
      // No hay resultados de búsqueda
      emptyStateConfig = emptyState.noSearchResults;
    } else if (hasActiveFilters && emptyState.noFilterResults) {
      // No hay resultados de filtros
      emptyStateConfig = emptyState.noFilterResults;
    }
    
    if (emptyStateConfig) {
      // Renderizar empty state
      emptyStateHTML = renderEmptyState({
        title: emptyStateConfig.title || 'No hay resultados',
        description: emptyStateConfig.description,
        icon: emptyStateConfig.icon,
        imageUrl: emptyStateConfig.imageUrl,
        actionLabel: emptyStateConfig.actionLabel,
        showPrimaryButton: emptyStateConfig.showPrimaryButton || false,
        primaryButtonIcon: emptyStateConfig.primaryButtonIcon,
        showPrimaryButtonIcon: emptyStateConfig.showPrimaryButtonIcon || false,
        secondaryActionLabel: emptyStateConfig.secondaryActionLabel,
        showSecondaryButton: emptyStateConfig.showSecondaryButton || false,
        secondaryButtonIcon: emptyStateConfig.secondaryButtonIcon,
        showSecondaryButtonIcon: emptyStateConfig.showSecondaryButtonIcon || false,
        className: 'ubits-data-table__empty-state'
      });
    }
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

  console.log('🔍 [RENDER] rowsHTML generado, número de <tr> en HTML:', (rowsHTML.match(/<tr/g) || []).length);
  console.log('🔍 [RENDER] paginatedRows procesadas:', paginatedRows.length);
  
  // Si hay empty state, usar ese HTML en lugar de las filas
  const tbodyContent = emptyStateHTML || rowsHTML;

  const classes = [
    'ubits-data-table',
    className
  ].filter(Boolean).join(' ');

  // Ya no hay controlsHeader - los controladores son columnas independientes
  // Los headers de controladores ya están en columnHeadersHTML

  // Contar headers totales
  const headerCount = visibleColumns.length;

  // Estructura: tabla directamente o envuelta en contenedor scrollable
  // Si hay empty state, mostrar el empty state en el tbody pero mantener el thead
  const tableHTML = `
    <table class="${classes} ubits-data-table__table">
      <thead class="ubits-data-table__thead">
        <tr class="ubits-data-table__header-row">
          ${columnHeadersHTML}
        </tr>
      </thead>
      <tbody class="ubits-data-table__tbody">
        ${emptyStateHTML 
          ? `<tr><td colspan="${headerCount}" style="padding: 0;">${emptyStateHTML}</td></tr>`
          : tbodyContent
        }
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
  
  // CRÍTICO: Si el lazy load está activo, forzar scroll vertical para que la tabla tenga su propio scroll
  // Esto permite que el lazy load funcione correctamente con el scroll de la tabla, no del window
  let finalShowVerticalScrollbar = showVerticalScrollbar;
  if (isLazyLoadEnabled && !showPagination) {
    finalShowVerticalScrollbar = true;
  }
  
  // IMPORTANTE: Si no hay paginación ni lazy load, pero el contenido es muy grande,
  // habilitar scroll vertical automáticamente para que todas las filas sean accesibles
  // Esto es especialmente importante en Storybook donde el viewport puede ser limitado
  if (!showPagination && !isLazyLoadEnabled && !finalShowVerticalScrollbar) {
    // Calcular altura estimada: header (45px) + filas (100 filas * 45px = 4500px) = ~4545px
    const estimatedHeight = 45 + (orderedRows.length * 45);
    // Si la altura estimada es mayor a 600px (altura típica de viewport), habilitar scroll
    if (estimatedHeight > 600) {
      finalShowVerticalScrollbar = true;
      console.log('🔍 [RENDER] Habilitando scroll vertical automáticamente - altura estimada:', estimatedHeight, 'px');
    }
  }
  
  // Determinar qué contenedor usar según los scrolls habilitados
  // NO afecta la lógica del checkbox ni de las columnas
  let tableContainerHTML: string;
  if (finalShowVerticalScrollbar || finalShowHorizontalScrollbar) {
    // Construir clases CSS según los scrolls habilitados
    const scrollClasses = [];
    if (finalShowVerticalScrollbar) {
      scrollClasses.push('ubits-data-table__scrollable-container--vertical');
    }
    if (finalShowHorizontalScrollbar) {
      scrollClasses.push('ubits-data-table__scrollable-container--horizontal');
    }
    
    tableContainerHTML = `<div class="ubits-data-table__scrollable-container ${scrollClasses.join(' ')}">${tableHTML}</div>`;
  } else {
    tableContainerHTML = tableHTML;
  }
  
  // Renderizar el header del DataTable
  const headerHTML = renderDataTableHeader(options, activeFilters);
  
  // Agregar el paginador FUERA del contenedor de la tabla, siempre debajo
  let html: string;
  if (showPagination && paginationHTML) {
    // El paginador siempre va FUERA del contenedor de la tabla, en un wrapper separado
    html = `<div class="ubits-data-table__container">
      ${headerHTML}
      ${tableContainerHTML}
      <div class="ubits-data-table__pagination-wrapper">${paginationHTML}</div>
    </div>`;
  } else {
    // Si hay header, envolver todo en un contenedor
    if (headerHTML) {
      html = `<div class="ubits-data-table__container">
        ${headerHTML}
        ${tableContainerHTML}
      </div>`;
    } else {
      html = tableContainerHTML;
    }
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
  // Función helper para eliminar columnas duplicadas por ID
  const removeDuplicateColumns = (cols: TableColumn[]): TableColumn[] => {
    const seenIds = new Set<string>();
    const unique: TableColumn[] = [];
    
    for (const col of cols) {
      if (!seenIds.has(col.id)) {
        seenIds.add(col.id);
        unique.push({ ...col });
      } else {
        console.log('🔍 [CREATE DATA TABLE] ⚠️ COLUMNA DUPLICADA ELIMINADA al inicializar:', col.id, col.title);
      }
    }
    
    if (unique.length !== cols.length) {
      console.log('🔍 [CREATE DATA TABLE] Columnas duplicadas eliminadas:', cols.length, '->', unique.length);
    }
    
    return unique;
  };
  
  let currentOptions = {
    ...options,
    columns: removeDuplicateColumns(options.columns)
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
  
  // Estado de búsqueda
  let searchTerm: string = '';
  let isSearchActive: boolean = false;
  let searchButtonInstance: { element: HTMLButtonElement | HTMLDivElement; destroy: () => void; update: (newOptions: Partial<SearchButtonOptions>) => void } | null = null;
  
  // Estado de filtros
  let activeFilters: Record<string, string> = {};
  let drawerInstance: { element: HTMLElement; open: () => void; close: () => void; updateContent: (content: string | (() => string)) => void } | null = null;
  
  // Función para filtrar filas basándose en el término de búsqueda
  const filterRowsBySearch = (rows: TableRow[], searchTerm: string, columns: TableColumn[]): TableRow[] => {
    if (!searchTerm || searchTerm.trim() === '') {
      return rows;
    }
    
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const visibleColumns = columns.filter(col => col.visible !== false);
    
    return rows.filter(row => {
      // Buscar en todas las columnas visibles
      return visibleColumns.some(column => {
        const cellValue = row.data[column.id];
        if (cellValue == null) return false;
        
        // Convertir a string y buscar
        const cellValueStr = String(cellValue).toLowerCase();
        return cellValueStr.includes(normalizedSearch);
      });
    });
  };
  
  // Función para filtrar filas basándose en los filtros aplicados
  const filterRowsByFilters = (rows: TableRow[], filters: Record<string, string>, columns: TableColumn[]): TableRow[] => {
    const activeFilterEntries = Object.entries(filters).filter(([_, value]) => value && value.trim() !== '');
    
    if (activeFilterEntries.length === 0) {
      return rows;
    }
    
    return rows.filter(row => {
      // Todas las condiciones de filtro deben cumplirse (AND)
      return activeFilterEntries.every(([filterId, filterValue]) => {
        // Buscar la columna correspondiente al filtro (usar filterId como columnId)
        const column = columns.find(col => col.id === filterId);
        
        if (!column) {
          // Si no encontramos la columna directamente, buscar en los filtros configurados
          const filterConfig = currentOptions.header?.filterButton?.filters?.find(f => f.id === filterId);
          if (!filterConfig) return true;
          
          const columnId = filterConfig.columnId;
          const cellValue = row.data[columnId];
          
          if (cellValue == null) return false;
          
          const cellValueStr = String(cellValue).toLowerCase().trim();
          const filterValueStr = filterValue.toLowerCase().trim();
          
          // Filtrar según el tipo del filtro configurado
          switch (filterConfig.type) {
            case 'text':
              return cellValueStr.includes(filterValueStr);
            case 'select':
              return cellValueStr === filterValueStr;
            case 'number':
              return cellValueStr === filterValueStr || parseFloat(cellValueStr) === parseFloat(filterValueStr);
            case 'date':
              return cellValueStr.includes(filterValueStr);
            default:
              return cellValueStr.includes(filterValueStr);
          }
        }
        
        // Usar la columna encontrada directamente
        const cellValue = row.data[column.id];
        
        if (cellValue == null) return false;
        
        const cellValueStr = String(cellValue).toLowerCase().trim();
        const filterValueStr = filterValue.toLowerCase().trim();
        
        // Determinar el tipo de filtro basado en el tipo de columna
        const columnType = column.type || 'text';
        
        // Filtrar según el tipo de columna
        switch (columnType) {
          case 'estado':
            // Para estados, comparación exacta
            return cellValueStr === filterValueStr;
          case 'fecha':
            // Para fechas, búsqueda parcial
            return cellValueStr.includes(filterValueStr);
          case 'progreso':
            // Para números, comparación numérica
            const cellNum = parseFloat(cellValueStr);
            const filterNum = parseFloat(filterValueStr);
            return !isNaN(cellNum) && !isNaN(filterNum) && cellNum === filterNum;
          case 'nombre':
          case 'nombre-avatar':
          case 'nombre-avatar-texto':
          case 'correo':
          case 'area':
          case 'lider':
          case 'pais':
          case 'ciudad':
          default:
            // Para texto, búsqueda parcial
            return cellValueStr.includes(filterValueStr);
        }
      });
    });
  };
  
  // Estado de lazy load
  const isLazyLoadEnabled = currentOptions.showPagination ? false : (currentOptions.lazyLoad !== false);
  const lazyLoadItemsPerBatch = currentOptions.lazyLoadItemsPerBatch || 10;
  let lazyLoadCurrentItems = lazyLoadItemsPerBatch; // Empezar con el batch inicial
  let lazyLoadScrollListener: (() => void) | null = null;

  // Función para configurar lazy load (infinite scroll)
  const setupLazyLoad = () => {
    // Remover listener anterior si existe
    if (lazyLoadScrollListener) {
      const scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
      if (scrollableContainer) {
        scrollableContainer.removeEventListener('scroll', lazyLoadScrollListener);
      }
      window.removeEventListener('scroll', lazyLoadScrollListener, true);
      lazyLoadScrollListener = null;
    }
    
    // Buscar el contenedor scrollable
    const scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
    
    // Función para verificar si está cerca del final
    const checkScroll = () => {
      const totalRows = currentOptions.rows.length;
      
      // Si ya se cargaron todos los items, no hacer nada
      if (lazyLoadCurrentItems >= totalRows) {
        return;
      }
      
      // Obtener el scroll position - usar el contenedor scrollable si existe, sino usar window
      let scrollTop: number;
      let scrollHeight: number;
      let clientHeight: number;
      
      if (scrollableContainer) {
        scrollTop = scrollableContainer.scrollTop;
        scrollHeight = scrollableContainer.scrollHeight;
        clientHeight = scrollableContainer.clientHeight;
      } else {
        // Si no hay contenedor scrollable, usar window scroll
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
        
        // Obtener la posición del elemento en la página
        const elementRect = element.getBoundingClientRect();
        const elementBottom = elementRect.bottom + scrollTop;
        const viewportBottom = scrollTop + clientHeight;
        
        // Verificar si el elemento está visible y cerca del final
        if (viewportBottom >= elementBottom - 200) { // 200px antes del final del elemento
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
            
            // Re-renderizar con más items preservando el scroll
            render(true);
          }
        }
        return;
      }
      
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
          
          // Re-renderizar con más items preservando el scroll
          render(true);
        }
      }
    };
    
    // CRÍTICO: Cuando el lazy load está activo, siempre debe haber un contenedor scrollable
    // Si no existe, esperar un momento para que se renderice (puede tardar un frame)
    if (!scrollableContainer) {
      console.warn('⚠️ [LAZY LOAD] No se encontró contenedor scrollable, esperando renderizado...');
      setTimeout(() => {
        const retryScrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
        if (retryScrollableContainer) {
          lazyLoadScrollListener = checkScroll;
          retryScrollableContainer.addEventListener('scroll', lazyLoadScrollListener, { passive: true });
          console.log('✅ [LAZY LOAD] Contenedor scrollable encontrado después de esperar');
        } else {
          console.error('❌ [LAZY LOAD] No se pudo encontrar contenedor scrollable. El lazy load requiere scroll vertical activo.');
        }
      }, 100);
    } else {
      // Agregar listener al contenedor scrollable
      lazyLoadScrollListener = checkScroll;
      scrollableContainer.addEventListener('scroll', lazyLoadScrollListener, { passive: true });
      console.log('✅ [LAZY LOAD] Listener agregado al contenedor scrollable');
    }
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
  const render = (preserveScroll: boolean = false) => {
    const renderId = `render-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const stackTrace = new Error().stack?.split('\n') || [];
    const callerInfo = stackTrace.slice(1, 5).join('\n');
    
    console.log(`🔄 [RENDER] ========== INICIO RENDER [${renderId}] ==========`);
    console.log(`🔄 [RENDER] Stack trace:`, callerInfo);
    console.log(`🔄 [RENDER] preserveScroll:`, preserveScroll);
    
    // Detectar si se está llamando desde el handler de select all o checkbox
    const isFromSelectAll = callerInfo.includes('SELECT ALL') || callerInfo.includes('selectAll');
    const isFromCheckbox = callerInfo.includes('CHECKBOX') || callerInfo.includes('checkbox');
    const isFromSelectAllHandler = callerInfo.includes('HTMLInputElement') && isFromCheckbox;
    
    if (isFromSelectAll || isFromSelectAllHandler) {
      console.warn(`🔄 [RENDER] ⚠️ RENDER LLAMADO DESDE SELECT ALL O CHECKBOX HANDLER - Esto puede causar el salto!`, {
        isFromSelectAll,
        isFromCheckbox,
        isFromSelectAllHandler,
        callerInfo: callerInfo.split('\n').slice(0, 3)
      });
    }
    
    // IMPORTANTE: Siempre guardar scroll position para evitar el "salto" visual
    // Esto es crítico cuando se seleccionan todos los elementos o se hacen cambios que requieren re-render
    let savedScrollTop = 0;
    let savedScrollHeight = 0;
    let savedClientHeight = 0;
    let shouldPreserveScroll = preserveScroll;
    
      const scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
      if (scrollableContainer) {
        savedScrollTop = scrollableContainer.scrollTop;
        savedScrollHeight = scrollableContainer.scrollHeight;
        savedClientHeight = scrollableContainer.clientHeight;
      
      // IMPORTANTE: Siempre preservar el scroll si hay un scrollableContainer con contenido más grande que el contenedor
      // Esto previene el "salto" visual incluso cuando scrollTop = 0 (usuario en la parte superior)
      const hasScrollableContent = savedScrollHeight > savedClientHeight;
      if (hasScrollableContent && !preserveScroll) {
        shouldPreserveScroll = true;
        console.log(`🔄 [RENDER] 📍 Contenido con scroll detectado (scrollHeight: ${savedScrollHeight}px > clientHeight: ${savedClientHeight}px), preservando automáticamente para evitar salto`);
      }
      
      // Si hay scroll activo (scrollTop > 0), también preservarlo
      if (savedScrollTop > 0 && !preserveScroll && !shouldPreserveScroll) {
        shouldPreserveScroll = true;
        console.log(`🔄 [RENDER] 📍 Scroll activo detectado (${savedScrollTop}px), preservando automáticamente para evitar salto`);
      }
      
      console.log(`🔄 [RENDER] 📍 Scroll guardado:`, {
        scrollTop: savedScrollTop,
        scrollHeight: savedScrollHeight,
        clientHeight: savedClientHeight,
        maxScroll: savedScrollHeight - savedClientHeight,
        scrollPercentage: savedScrollHeight > savedClientHeight ? (savedScrollTop / (savedScrollHeight - savedClientHeight)) * 100 : 0,
        shouldPreserve: shouldPreserveScroll,
        hasScrollableContent: hasScrollableContent
      });
    } else {
      console.log(`🔄 [RENDER] ⚠️ No se encontró scrollableContainer, no se puede preservar scroll`);
    }
    
    // Filtrar filas por filtros y búsqueda
    let filteredRows = currentOptions.rows;
    
    // Aplicar filtros primero
    if (Object.keys(activeFilters).length > 0) {
      filteredRows = filterRowsByFilters(filteredRows, activeFilters, currentOptions.columns);
    }
    
    // Luego aplicar búsqueda sobre las filas filtradas
    if (searchTerm) {
      filteredRows = filterRowsBySearch(filteredRows, searchTerm, currentOptions.columns);
    }
    
    // Actualizar el contador del header con las filas filtradas si hay header configurado
    const renderOptions = {
      ...currentOptions,
      rows: filteredRows,
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
      __lazyLoadCurrentItems: lazyLoadCurrentItems,
      // Actualizar displayedItems en el header solo si no está explícitamente definido
      // Si ya está definido (por ejemplo, desde el input), mantener ese valor
      header: currentOptions.header ? {
        ...currentOptions.header,
        // Solo actualizar displayedItems si no está definido explícitamente o si hay búsqueda/filtros activos
        displayedItems: currentOptions.header.displayedItems !== undefined && !searchTerm && Object.keys(activeFilters).length === 0
          ? currentOptions.header.displayedItems
          : filteredRows.length,
        // Pasar el estado activo del SearchButton y el término de búsqueda a través de las opciones
        __isSearchActive: isSearchActive,
        __searchTerm: searchTerm
      } : undefined
    };
    
    // Eliminar columnas duplicadas por ID antes de renderizar
    console.log('🔍 [RENDER] Eliminando columnas duplicadas antes de renderizar...');
    console.log('🔍 [RENDER] Columnas ANTES de eliminar duplicados:', renderOptions.columns.length);
    console.log('🔍 [RENDER] IDs de columnas:', renderOptions.columns.map(c => c.id));
    
    const seenColumnIds = new Set<string>();
    const uniqueColumns = renderOptions.columns.filter(col => {
      if (seenColumnIds.has(col.id)) {
        console.log('🔍 [RENDER] ⚠️ COLUMNA DUPLICADA ELIMINADA:', col.id, col.title);
        return false;
      }
      seenColumnIds.add(col.id);
      return true;
    });
    
    console.log('🔍 [RENDER] Columnas DESPUÉS de eliminar duplicados:', uniqueColumns.length);
    console.log('🔍 [RENDER] IDs únicos:', Array.from(seenColumnIds));
    
    // Actualizar renderOptions con columnas únicas
    renderOptions.columns = uniqueColumns;
    
    console.log('🔍 [DATA TABLE] Renderizando:', {
      displayedItems: renderOptions.header?.displayedItems,
      totalItems: renderOptions.header?.totalItems,
      filteredRows: filteredRows.length,
      hasSearch: !!searchTerm,
      hasFilters: Object.keys(activeFilters).length > 0,
      uniqueColumnsCount: uniqueColumns.length
    });
    
    const newHTML = renderDataTable(
      renderOptions as any, 
      columnOrder, 
      rowOrder,
      activeFilters
    );
    
    console.log(`🔄 [RENDER] HTML generado, longitud:`, newHTML.length);
    console.log(`🔄 [RENDER] Reemplazando innerHTML del elemento (esto causa el brinco)...`);
    console.log(`🔄 [RENDER] 📍 Estado ANTES de innerHTML:`, {
      scrollTop: savedScrollTop,
      scrollHeight: savedScrollHeight,
      clientHeight: savedClientHeight,
      shouldPreserve: shouldPreserveScroll
    });
    const beforeReplace = performance.now();
    element.innerHTML = newHTML.trim();
    const afterReplace = performance.now();
    console.log(`🔄 [RENDER] innerHTML reemplazado en ${(afterReplace - beforeReplace).toFixed(2)}ms`);
    console.log(`🔄 [RENDER] 📍 innerHTML reemplazado, ahora restaurando scroll...`);
    
    // Reemplazar el SearchButton renderizado con el componente completo si existe
    if (currentOptions.header?.searchButton && currentOptions.header?.showSearchButton !== false) {
      const searchButtonPlaceholder = element.querySelector('.ubits-data-table__header-search-button');
      if (searchButtonPlaceholder) {
        // Destruir instancia anterior si existe
        if (searchButtonInstance) {
          try {
            searchButtonInstance.destroy();
          } catch (e) {
            // Ignorar errores al destruir
          }
        }
        
        // Verificar que searchButton existe antes de crear el componente
        if (!currentOptions.header?.searchButton) {
          console.warn('🔍 [DATA TABLE] searchButton no está definido, saltando creación del componente');
        } else {
          // Crear contenedor temporal para el componente SearchButton
          const tempContainer = document.createElement('div');
          tempContainer.style.display = 'none';
          document.body.appendChild(tempContainer);
          tempContainer.id = 'temp-search-button-container-' + Date.now();
          
          // Crear el componente SearchButton completo
          searchButtonInstance = createSearchButton({
            containerId: tempContainer.id,
            active: isSearchActive,
            size: 'sm',
            state: isSearchActive ? 'active' : 'default',
            disabled: currentOptions.header.searchButton.disabled || false,
            placeholder: currentOptions.header.searchButton.placeholder || 'Buscar...',
            value: searchTerm,
            width: 248,
            className: 'ubits-data-table__header-search-button',
            onChange: (e: Event) => {
              const value = (e.target as HTMLInputElement).value;
              searchTerm = value;
              if (currentOptions.header!.searchButton!.onChange) {
                currentOptions.header!.searchButton!.onChange(value);
              }
              render();
              if (currentOptions.header!.searchButton!.onSearch) {
                const filteredRows = filterRowsBySearch(currentOptions.rows, value, currentOptions.columns);
                console.log('🔍 [SEARCH] onSearch callback ejecutado desde SearchButton onChange:', { 
                  searchTerm: value, 
                  filteredRowsCount: filteredRows.length,
                  componentId: currentOptions.containerId 
                });
                currentOptions.header!.searchButton!.onSearch(value, filteredRows);
              }
            },
            onClick: (e: MouseEvent) => {
              e.stopPropagation();
              e.preventDefault();
              isSearchActive = true;
              if (currentOptions.header!.searchButton!.onClick) {
                currentOptions.header!.searchButton!.onClick(e);
              }
              render();
              setTimeout(() => {
                const input = searchButtonInstance?.element.querySelector('.ubits-search-button__input') as HTMLInputElement;
                if (input) {
                  input.focus();
                }
              }, 150);
            },
            onBlur: (e: FocusEvent) => {
              const input = e.target as HTMLInputElement;
              setTimeout(() => {
                if (!input.value.trim() && document.activeElement !== input) {
                  const clearBtn = searchButtonInstance?.element.querySelector('.ubits-search-button__clear');
                  if (document.activeElement !== clearBtn) {
                    isSearchActive = false;
                    render();
                  }
                }
              }, 200);
            }
          });
          
          // Mover el elemento del componente al lugar del placeholder
          const searchButtonElement = searchButtonInstance.element;
          searchButtonPlaceholder.parentNode?.replaceChild(searchButtonElement, searchButtonPlaceholder);
          
          // Remover el width inline que viene del componente SearchButton
          // Esto permite que el componente se expanda naturalmente sin forzar un ancho fijo
          if (isSearchActive && (searchButtonElement as HTMLElement).style.width) {
            console.log('🔍 [DATA TABLE] Removiendo width inline:', (searchButtonElement as HTMLElement).style.width);
            (searchButtonElement as HTMLElement).style.width = '';
          }
          
          // Limpiar contenedor temporal
          document.body.removeChild(tempContainer);
        }
        
        // Logs específicos para diagnosticar el posicionamiento
        setTimeout(() => {
          const activeSearchBtn = element.querySelector('.ubits-data-table__header-search-button.ubits-search-button--active');
          const prevButton = activeSearchBtn?.previousElementSibling;
          
          if (activeSearchBtn && prevButton) {
            const searchRect = activeSearchBtn.getBoundingClientRect();
            const prevRect = prevButton.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(activeSearchBtn);
            const inputWrapper = activeSearchBtn.querySelector('.ubits-search-button__input-wrapper');
            const inputWrapperStyle = inputWrapper ? window.getComputedStyle(inputWrapper as HTMLElement) : null;
            
            const gapInfo = {
              actualGap: searchRect.left - prevRect.right,
              expectedGap: 8,
              difference: (searchRect.left - prevRect.right) - 8,
              searchButton: {
                left: searchRect.left,
                width: searchRect.width,
                right: searchRect.right,
                marginLeft: computedStyle.marginLeft,
                marginRight: computedStyle.marginRight,
                inlineWidth: (activeSearchBtn as HTMLElement).style.width || 'none',
                computedWidth: computedStyle.width
              },
              prevButton: {
                right: prevRect.right,
                width: prevRect.width
              },
              inputWrapper: {
                width: inputWrapperStyle?.width || 'N/A',
                computedWidth: inputWrapperStyle?.width || 'N/A'
              }
            };
            
            console.log('🔍 [DATA TABLE] Posicionamiento del SearchButton activo:', gapInfo);
            
            // Si el gap no es 8px, calcular el margin-left correcto
            if (Math.abs(gapInfo.actualGap - 8) > 1) {
              const buttonWidth = 32; // Ancho del botón cuando no está activo
              const inputWidth = searchRect.width; // Ancho real del input cuando está activo
              const currentGap = gapInfo.actualGap;
              const desiredGap = 8;
              const neededMarginLeft = -(inputWidth - buttonWidth - desiredGap);
              
              console.log('🔍 [DATA TABLE] Cálculo de margin-left:', {
                buttonWidth,
                inputWidth,
                currentGap,
                desiredGap,
                neededMarginLeft,
                currentMarginLeft: computedStyle.marginLeft
              });
            }
          }
        }, 100);
        
        console.log('🔍 [DATA TABLE] SearchButton componente completo integrado');
      }
    }
    
    console.log(`🔄 [RENDER] Llamando attachEventListeners()...`);
    attachEventListeners();
    console.log(`🔄 [RENDER] attachEventListeners() completado`);
    initializeIconFallbacks();
    
    console.log(`🔄 [RENDER] ========== FIN RENDER [${renderId}] ==========`);
    
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
      
    // IMPORTANTE: Restaurar scroll position SIEMPRE que se haya guardado, no solo para lazy load
    // Esto previene el "salto" visual cuando se seleccionan todos los elementos o se hace cualquier cambio
    // Restaurar si:
    // 1. Se debe preservar explícitamente (preserveScroll = true), O
    // 2. Hay un scrollableContainer con contenido más grande que el contenedor (previene salto incluso en scrollTop = 0)
    const shouldRestoreScroll = shouldPreserveScroll || (savedScrollHeight > 0 && savedClientHeight > 0 && savedScrollHeight > savedClientHeight);
    
    if (shouldRestoreScroll) {
      console.log(`🔄 [RENDER] 📍 Restaurando scroll después del render...`);
      
        // Usar requestAnimationFrame para asegurar que el DOM esté completamente renderizado
        requestAnimationFrame(() => {
        const newScrollableContainer = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
        if (newScrollableContainer) {
          const newScrollHeight = newScrollableContainer.scrollHeight;
          const newClientHeight = newScrollableContainer.clientHeight;
          const newMaxScroll = newScrollHeight - newClientHeight;
          
            // Calcular la posición relativa del scroll (0-1)
            const oldMaxScroll = savedScrollHeight - savedClientHeight;
            const scrollPercentage = oldMaxScroll > 0 ? savedScrollTop / oldMaxScroll : 0;
            
          console.log(`🔄 [RENDER] 📍 Cálculo de restauración de scroll:`, {
            old: {
              scrollTop: savedScrollTop,
              scrollHeight: savedScrollHeight,
              clientHeight: savedClientHeight,
              maxScroll: oldMaxScroll
            },
            new: {
              scrollHeight: newScrollHeight,
              clientHeight: newClientHeight,
              maxScroll: newMaxScroll
            },
            scrollPercentage: (scrollPercentage * 100).toFixed(2) + '%',
            newScrollTop: newMaxScroll > 0 ? scrollPercentage * newMaxScroll : 0
          });
            
            if (newMaxScroll > 0) {
            const newScrollTop = scrollPercentage * newMaxScroll;
            newScrollableContainer.scrollTop = newScrollTop;
            
            console.log(`🔄 [RENDER] 📍 Scroll restaurado:`, {
              anterior: savedScrollTop,
              nuevo: newScrollTop,
              diferencia: Math.abs(newScrollTop - savedScrollTop),
              restauradoCorrectamente: Math.abs(newScrollTop - savedScrollTop) < 10 // Tolerancia de 10px
            });
          } else {
            console.log(`🔄 [RENDER] ⚠️ No hay scroll disponible (maxScroll <= 0), no se puede restaurar`);
            }
        } else {
          console.log(`🔄 [RENDER] ⚠️ No se encontró scrollableContainer después del render, no se puede restaurar scroll`);
          }
        });
    } else {
      console.log(`🔄 [RENDER] 📍 No se restaura scroll:`, {
        shouldPreserve: shouldPreserveScroll,
        savedScrollHeight,
        savedClientHeight,
        tieneScroll: savedScrollHeight > savedClientHeight,
        shouldRestore: shouldRestoreScroll
      });
    }
    
    // Logs para debugging del hover y visibilidad
    console.log('🎨 [HOVER DEBUG] ========== VERIFICANDO HOVER DE FILAS ==========');
    const rows = element.querySelectorAll('.ubits-data-table__row');
    console.log('🎨 [HOVER DEBUG] Filas encontradas:', rows.length);
    
    // Verificar alturas y visibilidad
    const table = element.querySelector('.ubits-data-table__table') as HTMLElement;
    const tbody = element.querySelector('.ubits-data-table__tbody') as HTMLElement;
    const scrollableContainerForDebug = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
    const dataTableContainer = element.querySelector('.ubits-data-table') as HTMLElement;
    
    console.log('📏 [HEIGHT DEBUG] ========== VERIFICANDO ALTURAS ==========');
    if (table) {
      console.log('📏 [HEIGHT DEBUG] table.scrollHeight:', table.scrollHeight, 'table.clientHeight:', table.clientHeight, 'table.offsetHeight:', table.offsetHeight);
    }
    if (tbody) {
      console.log('📏 [HEIGHT DEBUG] tbody.scrollHeight:', tbody.scrollHeight, 'tbody.clientHeight:', tbody.clientHeight, 'tbody.offsetHeight:', tbody.offsetHeight);
    }
    if (scrollableContainerForDebug) {
      console.log('📏 [HEIGHT DEBUG] scrollableContainer.scrollHeight:', scrollableContainerForDebug.scrollHeight, 'scrollableContainer.clientHeight:', scrollableContainerForDebug.clientHeight, 'scrollableContainer.offsetHeight:', scrollableContainerForDebug.offsetHeight);
      console.log('📏 [HEIGHT DEBUG] scrollableContainer max-height:', window.getComputedStyle(scrollableContainerForDebug).maxHeight);
    }
    if (dataTableContainer) {
      console.log('📏 [HEIGHT DEBUG] dataTableContainer.scrollHeight:', dataTableContainer.scrollHeight, 'dataTableContainer.clientHeight:', dataTableContainer.clientHeight, 'dataTableContainer.offsetHeight:', dataTableContainer.offsetHeight);
      console.log('📏 [HEIGHT DEBUG] dataTableContainer max-height:', window.getComputedStyle(dataTableContainer).maxHeight);
    }
    if (rows.length > 0) {
      const firstRow = rows[0] as HTMLElement;
      const secondRow = rows[1] as HTMLElement;
      const lastRow = rows[rows.length - 1] as HTMLElement;
      
      console.log('📏 [HEIGHT DEBUG] ========== COMPARACIÓN DE FILAS ==========');
      const firstRect = firstRow.getBoundingClientRect();
      const secondRect = secondRow ? secondRow.getBoundingClientRect() : null;
      const lastRect = lastRow.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportTop = window.scrollY || window.pageYOffset;
      
      console.log('📏 [HEIGHT DEBUG] Primera fila (funciona):');
      console.log('  - offsetTop:', firstRow.offsetTop);
      console.log('  - offsetHeight:', firstRow.offsetHeight);
      console.log('  - getBoundingClientRect:', {
        top: firstRect.top,
        bottom: firstRect.bottom,
        left: firstRect.left,
        right: firstRect.right,
        width: firstRect.width,
        height: firstRect.height,
        visibleInViewport: firstRect.top >= 0 && firstRect.bottom <= viewportHeight
      });
      
      if (secondRow && secondRect) {
        console.log('📏 [HEIGHT DEBUG] Segunda fila (no funciona):');
        console.log('  - offsetTop:', secondRow.offsetTop);
        console.log('  - offsetHeight:', secondRow.offsetHeight);
        console.log('  - getBoundingClientRect:', {
          top: secondRect.top,
          bottom: secondRect.bottom,
          left: secondRect.left,
          right: secondRect.right,
          width: secondRect.width,
          height: secondRect.height,
          visibleInViewport: secondRect.top >= 0 && secondRect.bottom <= viewportHeight,
          belowViewport: secondRect.top > viewportHeight,
          aboveViewport: secondRect.bottom < 0
        });
        console.log('  - viewportHeight:', viewportHeight);
        console.log('  - Diferencia con primera fila (offsetTop):', secondRow.offsetTop - firstRow.offsetTop);
        console.log('  - Diferencia con primera fila (getBoundingClientRect.top):', secondRect.top - firstRect.top);
      }
      
      console.log('📏 [HEIGHT DEBUG] Última fila:');
      console.log('  - offsetTop:', lastRow.offsetTop);
      console.log('  - offsetHeight:', lastRow.offsetHeight);
      console.log('  - getBoundingClientRect:', lastRow.getBoundingClientRect());
      console.log('📏 [HEIGHT DEBUG] Altura total estimada (última fila offsetTop + offsetHeight):', lastRow.offsetTop + lastRow.offsetHeight);
      console.log('📏 [HEIGHT DEBUG] ========== FIN COMPARACIÓN ==========');
    }
    console.log('📏 [HEIGHT DEBUG] ========== FIN ALTURAS ==========');
    
    rows.forEach((row, index) => {
      if (index === 0) { // Solo log de la primera fila para no saturar
        const cells = row.querySelectorAll('td');
        console.log('🎨 [HOVER DEBUG] Celdas en la primera fila:', cells.length);
        cells.forEach((cell, cellIndex) => {
          const cellElement = cell as HTMLElement;
          const classes = Array.from(cellElement.classList);
          const computedBg = window.getComputedStyle(cellElement).backgroundColor;
          console.log(`🎨 [HOVER DEBUG] Celda ${cellIndex}:`, {
            classes: classes,
            computedBackground: computedBg,
            hasDragHandle: classes.includes('ubits-data-table__cell--drag-handle'),
            hasExpand: classes.includes('ubits-data-table__cell--expand'),
            hasCheckbox: classes.includes('ubits-data-table__cell--checkbox'),
            hasControlsColumn: classes.includes('ubits-data-table__controls-column'),
            hasCell: classes.includes('ubits-data-table__cell')
          });
        });
      }
    });
    
    // Agregar listener de hover a la primera fila para debugging
    if (rows.length > 0) {
      const firstRow = rows[0] as HTMLElement;
      firstRow.addEventListener('mouseenter', () => {
        console.log('🎨 [HOVER DEBUG] ========== HOVER ENTRÓ EN FILA ==========');
        const cells = firstRow.querySelectorAll('td');
        cells.forEach((cell, index) => {
          const cellElement = cell as HTMLElement;
          const classes = Array.from(cellElement.classList);
          const computedBg = window.getComputedStyle(cellElement).backgroundColor;
          console.log(`🎨 [HOVER DEBUG] Celda ${index} en hover:`, {
            classes: classes,
            computedBackground: computedBg,
            hasDragHandle: classes.includes('ubits-data-table__cell--drag-handle'),
            hasExpand: classes.includes('ubits-data-table__cell--expand')
          });
        });
      });
      
      firstRow.addEventListener('mouseleave', () => {
        console.log('🎨 [HOVER DEBUG] ========== HOVER SALIÓ DE FILA ==========');
      });
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
    
  };
  
  // Función para adjuntar event listeners
  const attachEventListeners = () => {
    console.log(`📎 [ATTACH] ========== INICIO attachEventListeners ==========`);
    // Detectar si estamos en la web (no en Storybook)
    const isWeb = typeof window !== 'undefined' && window.location && !window.location.href.includes('storybook');
    
    
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
    
    // IMPORTANTE: Declarar la bandera isSelectAllInProgress en el scope de attachEventListeners
    // para que ambos handlers (SELECT ALL y checkbox individual) puedan acceder a ella
    let isSelectAllInProgress = false;
    
    // IMPORTANTE: Primero configurar los checkboxes del header (select all) para que tengan prioridad
    // Checkboxes de header de columnas de checkbox (para seleccionar todos en esa columna)
    const columnCheckboxHeaders = element.querySelectorAll('input[data-column-checkbox-header]');
    console.log(`☑️ [SELECT ALL] Header checkboxes encontrados: ${columnCheckboxHeaders.length}`);
    columnCheckboxHeaders.forEach((checkbox, index) => {
      const originalCheckbox = checkbox as HTMLInputElement;
      const columnId = originalCheckbox.getAttribute('data-column-checkbox-header');
      console.log(`☑️ [SELECT ALL] Configurando header checkbox ${index}: columnId=${columnId}`);
      
      // Remover listeners anteriores si existen para evitar duplicados
      const newCheckbox = originalCheckbox.cloneNode(true) as HTMLInputElement;
      // IMPORTANTE: Preservar el estado checked al clonar
      newCheckbox.checked = originalCheckbox.checked;
      // IMPORTANTE: Asegurar que el atributo data-column-checkbox-header esté presente después de clonar
      // Y también preservar TODOS los atributos del original
      if (columnId) {
        newCheckbox.setAttribute('data-column-checkbox-header', columnId);
      }
      // Preservar todos los atributos del original
      Array.from(originalCheckbox.attributes).forEach(attr => {
        if (attr.name !== 'data-column-checkbox-header' || !newCheckbox.hasAttribute(attr.name)) {
          newCheckbox.setAttribute(attr.name, attr.value);
        }
      });
      originalCheckbox.parentNode?.replaceChild(newCheckbox, originalCheckbox);
      
      console.log(`☑️ [SELECT ALL] Checkbox clonado y reemplazado:`, {
        columnId: columnId,
        hasHeaderAttr: newCheckbox.hasAttribute('data-column-checkbox-header'),
        checked: newCheckbox.checked,
        allAttributes: Array.from(newCheckbox.attributes).map(attr => `${attr.name}="${attr.value}"`)
      });
      
      console.log(`☑️ [SELECT ALL] Listener adjuntado al header checkbox ${index}`, {
        columnId: columnId,
        checkbox: newCheckbox,
        hasHeaderAttr: newCheckbox.hasAttribute('data-column-checkbox-header'),
        hasColumnId: newCheckbox.hasAttribute('data-column-id'),
        hasRowId: newCheckbox.hasAttribute('data-row-id'),
        allAttributes: Array.from(newCheckbox.attributes).map(attr => `${attr.name}="${attr.value}"`)
      });
      
      // IMPORTANTE: Usar { capture: true } para que este listener se ejecute ANTES que otros listeners
      // Esto asegura que se ejecute en la fase de captura, antes que los listeners en la fase de burbujeo
      console.log(`☑️ [SELECT ALL] 🔧 Agregando listener con capture:true al checkbox ${index}`);
      console.log(`☑️ [SELECT ALL] 🔍 Estado del checkbox ANTES de agregar listener:`, {
        element: newCheckbox,
        isConnected: newCheckbox.isConnected,
        hasHeaderAttr: newCheckbox.hasAttribute('data-column-checkbox-header'),
        checked: newCheckbox.checked,
        parentElement: newCheckbox.parentElement?.tagName,
        allAttrs: Array.from(newCheckbox.attributes).map(a => `${a.name}="${a.value}"`)
      });
      
      const selectAllHandler = (e: Event) => {
        console.log(`☑️ [SELECT ALL] ========== SELECT ALL CAMBIÓ ==========`);
        console.log(`☑️ [SELECT ALL] 🎯 HANDLER EJECUTÁNDOSE - timestamp: ${Date.now()}`);
        console.log(`☑️ [SELECT ALL] 🔍 EVENTO RECIBIDO:`, {
          eventPhase: e.eventPhase,
          bubbles: e.bubbles,
          cancelable: e.cancelable,
          defaultPrevented: e.defaultPrevented,
          isTrusted: e.isTrusted,
          timeStamp: e.timeStamp,
          target: e.target,
          currentTarget: e.currentTarget,
          targetType: (e.target as HTMLElement).tagName,
          targetId: (e.target as HTMLElement).id,
          targetClassName: (e.target as HTMLElement).className,
          targetHasHeaderAttr: (e.target as HTMLElement).hasAttribute('data-column-checkbox-header'),
          currentTargetHasHeaderAttr: (e.currentTarget as HTMLElement).hasAttribute('data-column-checkbox-header'),
          targetAllAttrs: Array.from((e.target as HTMLElement).attributes).map(a => `${a.name}="${a.value}"`),
          currentTargetAllAttrs: Array.from((e.currentTarget as HTMLElement).attributes).map(a => `${a.name}="${a.value}"`)
        });
        
        // IMPORTANTE: Detener la propagación INMEDIATAMENTE para evitar que otros listeners lo procesen
        // NO usar preventDefault() porque bloquea el cambio visual del checkbox
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        const input = e.target as HTMLInputElement;
        
        // IMPORTANTE: Verificar que el input tiene el atributo antes de continuar
        if (!input.hasAttribute('data-column-checkbox-header')) {
          console.log(`☑️ [SELECT ALL] ⚠️ El input NO tiene data-column-checkbox-header, ignorando...`, {
            input: input,
            allAttributes: Array.from(input.attributes).map(attr => `${attr.name}="${attr.value}"`)
          });
          return;
        }
        
        const currentColumnId = input.getAttribute('data-column-checkbox-header')!;
        const isChecked = input.checked;
        
        console.log(`☑️ [SELECT ALL] columnId: ${currentColumnId}, checked: ${isChecked}`, {
          input: input,
          hasHeaderAttr: input.hasAttribute('data-column-checkbox-header'),
          hasColumnId: input.hasAttribute('data-column-id'),
          hasRowId: input.hasAttribute('data-row-id'),
          allAttributes: Array.from(input.attributes).map(attr => `${attr.name}="${attr.value}"`),
          eventPhase: e.eventPhase,
          bubbles: e.bubbles,
          cancelable: e.cancelable,
          defaultPrevented: e.defaultPrevented
        });
        
        console.log(`☑️ [SELECT ALL] ✅ Propagación ya detenida (se detuvo al inicio del handler)`);
        
        // IMPORTANTE: Guardar el scroll ANTES de hacer cualquier cambio para poder restaurarlo después
        const scrollableContainerBefore = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
        let savedScrollBeforeSelectAll = 0;
        let savedScrollHeightBeforeSelectAll = 0;
        let savedClientHeightBeforeSelectAll = 0;
        if (scrollableContainerBefore) {
          savedScrollBeforeSelectAll = scrollableContainerBefore.scrollTop;
          savedScrollHeightBeforeSelectAll = scrollableContainerBefore.scrollHeight;
          savedClientHeightBeforeSelectAll = scrollableContainerBefore.clientHeight;
          console.log(`☑️ [SELECT ALL] 📍 Scroll ANTES de actualizar checkboxes:`, {
            scrollTop: savedScrollBeforeSelectAll,
            scrollHeight: savedScrollHeightBeforeSelectAll,
            clientHeight: savedClientHeightBeforeSelectAll,
            maxScroll: savedScrollHeightBeforeSelectAll - savedClientHeightBeforeSelectAll
          });
        } else {
          console.log(`☑️ [SELECT ALL] ⚠️ No se encontró scrollableContainer antes de actualizar`);
        }
        
        // Actualizar todos los checkboxes de esa columna en todas las filas
        currentOptions.rows.forEach(row => {
          row.data[currentColumnId] = isChecked;
        });
        console.log(`☑️ [SELECT ALL] Estado de todas las filas actualizado (${currentOptions.rows.length} filas)`);
        
        // Si es checkbox-2 (checkbox fijo), optimizar: actualizar checkboxes visibles sin re-renderizar toda la tabla
        if (currentColumnId === 'checkbox-2') {
          // Actualizar todos los checkboxes visibles en el DOM
          const visibleCheckboxes = element.querySelectorAll(`input[data-column-id="${currentColumnId}"][data-row-id]`);
          console.log(`☑️ [SELECT ALL] Checkboxes visibles encontrados: ${visibleCheckboxes.length}`);
          
          // IMPORTANTE: Activar bandera ANTES de actualizar para prevenir que handlers individuales se ejecuten
          isSelectAllInProgress = true;
          console.log(`☑️ [SELECT ALL] 🚩 Bandera isSelectAllInProgress activada`);
          
          // IMPORTANTE: Actualizar los checkboxes de forma SÍNCRONA para que se muestren inmediatamente
          // No usar requestAnimationFrame aquí porque retrasa el renderizado visual
            visibleCheckboxes.forEach((cb) => {
              const checkbox = cb as HTMLInputElement;
              const rowIdStr = checkbox.getAttribute('data-row-id');
              if (rowIdStr) {
                const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
              // Actualizar el estado interno PRIMERO
                const row = currentOptions.rows.find(r => r.id === rowId);
                if (row) {
                  row.data[currentColumnId] = isChecked;
                }
              
              // IMPORTANTE: Actualizar el checkbox visual
              // La bandera isSelectAllInProgress previene que el handler individual se ejecute
              // incluso si se dispara el evento change
                checkbox.checked = isChecked;
                
                // IMPORTANTE: Actualizar la clase CSS del contenedor del checkbox UBITS
                const checkboxContainer = checkbox.closest('.ubits-checkbox') as HTMLElement;
                if (checkboxContainer) {
                  const checkboxSquare = checkboxContainer.querySelector('.ubits-checkbox__square') as HTMLElement;
                  
                  if (isChecked) {
                    // IMPORTANTE: Asegurar que la clase checked esté presente ANTES de crear el checkmark
                    checkboxContainer.classList.add('ubits-checkbox--checked');
                    checkboxContainer.classList.remove('ubits-checkbox--indeterminate');
                    
                    // Crear o asegurar que existe el elemento checkmark
                    if (checkboxSquare) {
                      // Remover el elemento indeterminate si existe
                      const indeterminateEl = checkboxSquare.querySelector('.ubits-checkbox__indeterminate');
                      if (indeterminateEl) {
                        indeterminateEl.remove();
                      }
                      
                    // IMPORTANTE: Verificar si el checkmark ya existe
                    let checkmarkEl = checkboxSquare.querySelector('.ubits-checkbox__checkmark') as HTMLElement;
                    if (!checkmarkEl) {
                      // Crear el checkmark solo si no existe
                      checkmarkEl = document.createElement('span');
                      checkmarkEl.className = 'ubits-checkbox__checkmark';
                      checkboxSquare.appendChild(checkmarkEl);
                    }
                    
                    // IMPORTANTE: Remover la transición temporalmente para mostrar inmediatamente
                    const originalTransition = checkmarkEl.style.transition;
                    checkmarkEl.style.transition = 'none';
                      
                      // Aplicar estilos directamente para asegurar que se muestre inmediatamente
                      checkmarkEl.style.setProperty('opacity', '1', 'important');
                      checkmarkEl.style.setProperty('transform', 'scale(1)', 'important');
                      checkmarkEl.style.setProperty('display', 'flex', 'important');
                    
                    // IMPORTANTE: Forzar un reflow completo usando getComputedStyle
                    // Esto asegura que el navegador renderice el checkmark inmediatamente
                    window.getComputedStyle(checkmarkEl).opacity;
                    window.getComputedStyle(checkmarkEl).transform;
                    window.getComputedStyle(checkmarkEl).display;
                    
                    // Forzar múltiples reflows adicionales para asegurar que el navegador renderice el checkmark
                    void checkmarkEl.offsetHeight;
                    void checkboxSquare.offsetHeight;
                    void checkboxContainer.offsetHeight;
                    
                    // Restaurar la transición después de un pequeño delay para permitir animaciones futuras
                    setTimeout(() => {
                      checkmarkEl.style.transition = originalTransition || '';
                    }, 0);
                    }
                  } else {
                    checkboxContainer.classList.remove('ubits-checkbox--checked');
                    checkboxContainer.classList.remove('ubits-checkbox--indeterminate');
                    
                    // Remover el checkmark si existe
                    if (checkboxSquare) {
                      const checkmarkEl = checkboxSquare.querySelector('.ubits-checkbox__checkmark');
                      if (checkmarkEl) {
                        checkmarkEl.remove();
                      }
                      const indeterminateEl = checkboxSquare.querySelector('.ubits-checkbox__indeterminate');
                      if (indeterminateEl) {
                        indeterminateEl.remove();
                      }
                    }
                  }
                }
              }
            });
            
          // IMPORTANTE: Actualizar el header checkbox DESPUÉS de actualizar todos los checkboxes individuales
          // para asegurar que el estado visual se sincronice correctamente
            const allChecked = currentOptions.rows.length > 0 && currentOptions.rows.every(r => r.data[currentColumnId] === true);
            const someChecked = currentOptions.rows.some(r => r.data[currentColumnId] === true);
            const isIndeterminate = someChecked && !allChecked;
            const headerCheckbox = input;
          
          // Forzar actualización del estado checked e indeterminate
            headerCheckbox.checked = allChecked;
            headerCheckbox.indeterminate = isIndeterminate;
            
            // Actualizar también la clase CSS del contenedor del header checkbox
            const headerCheckboxContainer = headerCheckbox.closest('.ubits-checkbox') as HTMLElement;
            if (headerCheckboxContainer) {
              const headerCheckboxSquare = headerCheckboxContainer.querySelector('.ubits-checkbox__square') as HTMLElement;
              
              if (allChecked) {
                headerCheckboxContainer.classList.add('ubits-checkbox--checked');
                headerCheckboxContainer.classList.remove('ubits-checkbox--indeterminate');
                
              // IMPORTANTE: Asegurar que el checkmark exista y esté visible
                if (headerCheckboxSquare) {
                // Remover el elemento indeterminate si existe
                  const indeterminateEl = headerCheckboxSquare.querySelector('.ubits-checkbox__indeterminate');
                  if (indeterminateEl) {
                    indeterminateEl.remove();
                  }
                
                // IMPORTANTE: Asegurar que la clase checked esté presente PRIMERO
                // Esto es crítico para que el CSS se aplique correctamente
                headerCheckboxContainer.classList.add('ubits-checkbox--checked');
                
                // Forzar un reflow para que el navegador procese la clase
                void headerCheckboxContainer.offsetHeight;
                
                // IMPORTANTE: Verificar si el checkmark ya existe
                let checkmarkEl = headerCheckboxSquare.querySelector('.ubits-checkbox__checkmark') as HTMLElement;
                  if (!checkmarkEl) {
                  // Crear el checkmark solo si no existe
                    checkmarkEl = document.createElement('span');
                    checkmarkEl.className = 'ubits-checkbox__checkmark';
                    headerCheckboxSquare.appendChild(checkmarkEl);
                }
                
                // IMPORTANTE: Remover la transición temporalmente para mostrar inmediatamente
                const originalTransition = checkmarkEl.style.transition;
                checkmarkEl.style.transition = 'none';
                
                // Aplicar estilos directamente para forzar visualización inmediata
                    checkmarkEl.style.setProperty('opacity', '1', 'important');
                    checkmarkEl.style.setProperty('transform', 'scale(1)', 'important');
                    checkmarkEl.style.setProperty('display', 'flex', 'important');
                
                // IMPORTANTE: Forzar un reflow completo usando getComputedStyle
                // Esto asegura que el navegador renderice el checkmark inmediatamente
                window.getComputedStyle(checkmarkEl).opacity;
                window.getComputedStyle(checkmarkEl).transform;
                window.getComputedStyle(checkmarkEl).display;
                
                // Forzar múltiples reflows adicionales para asegurar que el navegador renderice el checkmark
                void checkmarkEl.offsetHeight;
                void headerCheckboxSquare.offsetHeight;
                void headerCheckboxContainer.offsetHeight;
                
                // Restaurar la transición después de un pequeño delay para permitir animaciones futuras
                setTimeout(() => {
                  checkmarkEl.style.transition = originalTransition || '';
                }, 0);
                }
              } else if (isIndeterminate) {
                headerCheckboxContainer.classList.remove('ubits-checkbox--checked');
                headerCheckboxContainer.classList.add('ubits-checkbox--indeterminate');
                
                // Crear indeterminate si no existe
                if (headerCheckboxSquare) {
                  const checkmarkEl = headerCheckboxSquare.querySelector('.ubits-checkbox__checkmark');
                  if (checkmarkEl) {
                    checkmarkEl.remove();
                  }
                let indeterminateEl = headerCheckboxSquare.querySelector('.ubits-checkbox__indeterminate') as HTMLElement;
                  if (!indeterminateEl) {
                    indeterminateEl = document.createElement('span');
                    indeterminateEl.className = 'ubits-checkbox__indeterminate';
                    headerCheckboxSquare.appendChild(indeterminateEl);
                }
                // Aplicar estilos directamente para forzar visualización
                    indeterminateEl.style.setProperty('opacity', '1', 'important');
                    indeterminateEl.style.setProperty('transform', 'scale(1)', 'important');
                    indeterminateEl.style.setProperty('display', 'flex', 'important');
                }
              } else {
                headerCheckboxContainer.classList.remove('ubits-checkbox--checked');
                headerCheckboxContainer.classList.remove('ubits-checkbox--indeterminate');
                
                // Remover ambos elementos
                if (headerCheckboxSquare) {
                  const checkmarkEl = headerCheckboxSquare.querySelector('.ubits-checkbox__checkmark');
                  if (checkmarkEl) {
                    checkmarkEl.remove();
                  }
                  const indeterminateEl = headerCheckboxSquare.querySelector('.ubits-checkbox__indeterminate');
                  if (indeterminateEl) {
                    indeterminateEl.remove();
                  }
                }
              }
            
            // Forzar un reflow del contenedor para asegurar que los cambios visuales se apliquen
            void headerCheckboxContainer.offsetHeight;
            }
            
            // Forzar un solo reflow después de todas las actualizaciones
            void element.offsetHeight;
            
            console.log(`☑️ [SELECT ALL] ✅ Checkboxes visibles actualizados - allChecked: ${allChecked}, indeterminate: ${isIndeterminate}`);
          
          // Desactivar bandera DESPUÉS de todas las actualizaciones visuales
          // Los handlers individuales ya tienen la verificación de isSelectAllInProgress
          // así que pueden ejecutarse pero se detendrán inmediatamente
          isSelectAllInProgress = false;
          console.log(`☑️ [SELECT ALL] 🚩 Bandera isSelectAllInProgress desactivada`);
            
            // Llamar a onSelectAll callback DESPUÉS de todas las actualizaciones visuales
            // para evitar que cause re-renderizados que generen el brinco
          const optionsWithSelectAll = currentOptions as any;
          if (optionsWithSelectAll.onSelectAll) {
            console.log(`☑️ [SELECT ALL] 📞 Llamando onSelectAll callback...`);
            console.log(`☑️ [SELECT ALL] 📞 Stack trace antes de llamar callback:`, new Error().stack?.split('\n').slice(1, 5).join('\n'));
            
            const scrollableContainerBeforeCallback = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
            const scrollBeforeCallback = scrollableContainerBeforeCallback?.scrollTop || 0;
            const scrollHeightBeforeCallback = scrollableContainerBeforeCallback?.scrollHeight || 0;
            const clientHeightBeforeCallback = scrollableContainerBeforeCallback?.clientHeight || 0;
            
            console.log(`☑️ [SELECT ALL] 📍 Scroll ANTES de onSelectAll callback:`, {
              scrollTop: scrollBeforeCallback,
              scrollHeight: scrollHeightBeforeCallback,
              clientHeight: clientHeightBeforeCallback,
              maxScroll: scrollHeightBeforeCallback - clientHeightBeforeCallback
            });
            
            // IMPORTANTE: Verificar si hay un render en progreso o pendiente
            console.log(`☑️ [SELECT ALL] 🔍 Verificando si hay renders pendientes...`);
            
            try {
              optionsWithSelectAll.onSelectAll(isChecked);
              console.log(`☑️ [SELECT ALL] ✅ onSelectAll callback completado sin errores`);
            } catch (error) {
              console.error(`☑️ [SELECT ALL] ❌ Error en onSelectAll callback:`, error);
            }
            
            // Verificar si el callback causó un render (comparando scroll y DOM)
            const scrollableContainerAfterCallback = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
            const scrollAfterCallback = scrollableContainerAfterCallback?.scrollTop || 0;
            const scrollHeightAfterCallback = scrollableContainerAfterCallback?.scrollHeight || 0;
            const clientHeightAfterCallback = scrollableContainerAfterCallback?.clientHeight || 0;
            
            console.log(`☑️ [SELECT ALL] 📍 Scroll DESPUÉS de onSelectAll callback:`, {
              scrollTop: scrollAfterCallback,
              scrollHeight: scrollHeightAfterCallback,
              clientHeight: clientHeightAfterCallback,
              maxScroll: scrollHeightAfterCallback - clientHeightAfterCallback
            });
            
            // Detectar si hubo cambios que indiquen un render
            const scrollChanged = Math.abs(scrollAfterCallback - scrollBeforeCallback) > 1;
            const dimensionsChanged = Math.abs(scrollHeightAfterCallback - scrollHeightBeforeCallback) > 1 || 
                                     Math.abs(clientHeightAfterCallback - clientHeightBeforeCallback) > 1;
            
            if (scrollChanged || dimensionsChanged) {
              console.warn(`☑️ [SELECT ALL] ⚠️ El callback onSelectAll parece haber causado cambios:`, {
                scrollCambió: scrollChanged,
                scrollAntes: scrollBeforeCallback,
                scrollDespues: scrollAfterCallback,
                diferenciaScroll: scrollAfterCallback - scrollBeforeCallback,
                dimensionesCambiaron: dimensionsChanged,
                scrollHeightAntes: scrollHeightBeforeCallback,
                scrollHeightDespues: scrollHeightAfterCallback,
                clientHeightAntes: clientHeightBeforeCallback,
                clientHeightDespues: clientHeightAfterCallback
              });
              
              // Si el scroll cambió, intentar restaurarlo
              if (scrollChanged && savedScrollBeforeSelectAll > 0 && scrollableContainerAfterCallback) {
                console.log(`☑️ [SELECT ALL] 🔧 Intentando restaurar scroll a posición original: ${savedScrollBeforeSelectAll}px`);
                scrollableContainerAfterCallback.scrollTop = savedScrollBeforeSelectAll;
                
                // Verificar si se restauró correctamente
                setTimeout(() => {
                  const finalScroll = scrollableContainerAfterCallback.scrollTop;
                  console.log(`☑️ [SELECT ALL] 📍 Scroll después de restaurar:`, {
                    original: savedScrollBeforeSelectAll,
                    restaurado: finalScroll,
                    diferencia: Math.abs(finalScroll - savedScrollBeforeSelectAll),
                    restauradoCorrectamente: Math.abs(finalScroll - savedScrollBeforeSelectAll) < 5
                  });
                }, 50);
              }
            } else {
              console.log(`☑️ [SELECT ALL] ✅ El callback onSelectAll NO causó cambios visibles en el scroll`);
            }
            }
            
            // NO llamar a render() - esto evita el brinco
            console.log(`☑️ [SELECT ALL] ✅ Optimizado: NO se llama render() - sin brinco`);
          
          // Verificar el estado final del scroll
          const scrollableContainerFinal = element.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
          const scrollFinal = scrollableContainerFinal?.scrollTop || 0;
          const scrollHeightFinal = scrollableContainerFinal?.scrollHeight || 0;
          const clientHeightFinal = scrollableContainerFinal?.clientHeight || 0;
          
          console.log(`☑️ [SELECT ALL] 📍 Scroll FINAL después de todas las actualizaciones:`, {
            scrollTop: scrollFinal,
            scrollHeight: scrollHeightFinal,
            clientHeight: clientHeightFinal,
            maxScroll: scrollHeightFinal - clientHeightFinal,
            comparaciónConInicial: {
              scrollTopInicial: savedScrollBeforeSelectAll,
              scrollTopFinal: scrollFinal,
              diferencia: Math.abs(scrollFinal - savedScrollBeforeSelectAll),
              seMantuvo: Math.abs(scrollFinal - savedScrollBeforeSelectAll) < 5
            }
          });
        } else {
          // Para otros checkboxes, mantener el comportamiento actual
          console.log(`☑️ [SELECT ALL] ⚠️ Llamando render() - esto causará el brinco`);
          render();
        }
        console.log(`☑️ [SELECT ALL] ========== FIN ==========`);
      };
      newCheckbox.addEventListener('change', selectAllHandler, { capture: true });
      console.log(`☑️ [SELECT ALL] ✅ Listener 'change' agregado con capture:true - handler function:`, selectAllHandler);
      
      // Agregar también un listener de 'click' para debugging
      const selectAllClickHandler = (e: Event) => {
        console.log(`☑️ [SELECT ALL] 🖱️ CLICK recibido en header checkbox ${index} - timestamp: ${Date.now()}`);
        const input = e.target as HTMLInputElement;
        console.log(`☑️ [SELECT ALL] 🖱️ Click handler - checkbox estado:`, {
          hasHeaderAttr: input.hasAttribute('data-column-checkbox-header'),
          checked: input.checked,
          allAttrs: Array.from(input.attributes).map(a => `${a.name}="${a.value}"`)
        });
      };
      newCheckbox.addEventListener('click', selectAllClickHandler, { capture: true });
      console.log(`☑️ [SELECT ALL] ✅ Listener 'click' agregado con capture:true para debugging`);
      
      // Verificar que el listener se agregó correctamente
      console.log(`☑️ [SELECT ALL] 🔍 Estado del checkbox DESPUÉS de agregar listeners:`, {
        element: newCheckbox,
        isConnected: newCheckbox.isConnected,
        hasHeaderAttr: newCheckbox.hasAttribute('data-column-checkbox-header'),
        checked: newCheckbox.checked,
        parentElement: newCheckbox.parentElement?.tagName
      });
    });

    // Checkboxes de columnas de datos (checkboxes normales en las celdas con data-column-id)
    // Esto incluye checkbox-2 (checkbox fijo) y otros checkboxes de columnas
    // IMPORTANTE: Excluir los checkboxes del header (select all) que tienen data-column-checkbox-header
    const cellCheckboxes = element.querySelectorAll('input[data-column-id]:not([data-column-checkbox-header])');
    cellCheckboxes.forEach(checkbox => {
      const originalCheckbox = checkbox as HTMLInputElement;
      const rowIdStr = originalCheckbox.getAttribute('data-row-id')!;
      const columnId = originalCheckbox.getAttribute('data-column-id')!;
      
      // Remover listeners anteriores si existen para evitar duplicados
      const newCheckbox = originalCheckbox.cloneNode(true) as HTMLInputElement;
      // IMPORTANTE: Preservar el estado checked al clonar
      newCheckbox.checked = originalCheckbox.checked;
      originalCheckbox.parentNode?.replaceChild(newCheckbox, originalCheckbox);
      
      // IMPORTANTE: Usar { capture: false } para que este listener se ejecute DESPUÉS del listener del "select all"
      // El listener del "select all" se ejecuta primero (se adjunta primero) y detiene la propagación
      console.log(`☑️ [CHECKBOX] 🔧 Agregando listener con capture:false al checkbox rowId=${rowIdStr} columnId=${columnId}`);
      const checkboxIndividualHandler = (e: Event) => {
        const input = e.target as HTMLInputElement;
        
        // CRÍTICO: Verificar PRIMERO si es un checkbox del header ANTES de cualquier log
        // Esto debe ser lo primero que se verifica para evitar procesar el header checkbox
        if (input.hasAttribute('data-column-checkbox-header')) {
          console.log(`☑️ [CHECKBOX] 🚫 BLOQUEADO: Este es un checkbox del header, NO debería ejecutarse este handler!`, {
            hasHeaderAttr: input.hasAttribute('data-column-checkbox-header'),
            hasColumnId: input.hasAttribute('data-column-id'),
            hasRowId: input.hasAttribute('data-row-id'),
            allAttributes: Array.from(input.attributes).map(attr => `${attr.name}="${attr.value}"`),
            eventPhase: e.eventPhase,
            bubbles: e.bubbles,
            cancelable: e.cancelable,
            defaultPrevented: e.defaultPrevented,
            target: e.target,
            currentTarget: e.currentTarget,
            stackTrace: new Error().stack?.split('\n').slice(1, 8).join('\n')
          });
          // IMPORTANTE: Detener la propagación aquí también por si acaso
          // NO usar preventDefault() porque bloquea el cambio visual del checkbox
          e.stopPropagation();
          e.stopImmediatePropagation();
          return;
        }
        
        console.log(`☑️ [CHECKBOX] ========== CHECKBOX INDIVIDUAL EVENTO ==========`);
        console.log(`☑️ [CHECKBOX] 🎯 HANDLER EJECUTÁNDOSE - timestamp: ${Date.now()}`);
        console.log(`☑️ [CHECKBOX] 🔍 EVENTO RECIBIDO EN HANDLER INDIVIDUAL:`, {
          rowId: rowIdStr,
          columnId: columnId,
          hasHeaderAttr: input.hasAttribute('data-column-checkbox-header'),
          hasRowId: input.hasAttribute('data-row-id'),
          hasColumnId: input.hasAttribute('data-column-id'),
          eventPhase: e.eventPhase,
          defaultPrevented: e.defaultPrevented,
          isTrusted: e.isTrusted,
          timeStamp: e.timeStamp,
          isSelectAllInProgress: isSelectAllInProgress,
          target: e.target,
          currentTarget: e.currentTarget,
          targetAllAttrs: Array.from(input.attributes).map(a => `${a.name}="${a.value}"`),
          stackTrace: new Error().stack?.split('\n').slice(1, 5).join('\n')
        });
        
        // IMPORTANTE: Si estamos en modo "select all", ignorar este evento
        // porque el handler de select all ya está manejando la actualización masiva
        if (isSelectAllInProgress) {
          console.log(`☑️ [CHECKBOX] ⏭️ Ignorando evento - select all en progreso`);
          return;
        }
        
        const currentRowIdStr = input.getAttribute('data-row-id');
        const currentColumnId = input.getAttribute('data-column-id');
        
        // Validar que tiene data-row-id (los checkboxes del header no lo tienen)
        if (!currentRowIdStr || !currentColumnId) {
          console.log(`☑️ [CHECKBOX] ⚠️ Ignorando checkbox sin data-row-id o data-column-id (probablemente header checkbox)`, {
            hasRowId: !!currentRowIdStr,
            hasColumnId: !!currentColumnId,
            hasHeaderAttr: input.hasAttribute('data-column-checkbox-header'),
            allAttributes: Array.from(input.attributes).map(attr => `${attr.name}="${attr.value}"`)
          });
          return;
        }
        
        console.log(`☑️ [CHECKBOX] ========== CHECKBOX CAMBIÓ ==========`);
        
        const rowId = isNaN(Number(currentRowIdStr)) ? currentRowIdStr : Number(currentRowIdStr);
        const isChecked = input.checked;
        
        console.log(`☑️ [CHECKBOX] rowId: ${rowId}, columnId: ${currentColumnId}, checked: ${isChecked}`);
        console.log(`☑️ [CHECKBOX] Checkbox visual checked: ${input.checked}`);
        console.log(`☑️ [CHECKBOX] Input element:`, input);
        console.log(`☑️ [CHECKBOX] Input parent:`, input.parentElement);
        
        const row = currentOptions.rows.find(r => r.id === rowId);
        if (row) {
          row.data[currentColumnId] = isChecked;
          console.log(`☑️ [CHECKBOX] Estado de fila actualizado`);
          
          // Si es checkbox-2 (checkbox fijo), optimizar: solo actualizar header checkbox sin re-renderizar toda la tabla
          if (currentColumnId === 'checkbox-2') {
            // IMPORTANTE: Buscar el checkbox container usando el input que disparó el evento
            // y validar que el data-row-id coincida
            let checkboxContainer = input.closest('.ubits-checkbox') as HTMLElement;
            console.log(`☑️ [CHECKBOX] checkboxContainer encontrado (closest):`, checkboxContainer);
            
            // Validar que el checkbox container es el correcto verificando el input dentro
            if (checkboxContainer) {
              const containerInput = checkboxContainer.querySelector(`input[data-row-id="${rowId}"][data-column-id="${currentColumnId}"]`) as HTMLInputElement;
              if (!containerInput || containerInput !== input) {
                console.log(`☑️ [CHECKBOX] ⚠️ checkboxContainer no coincide, buscando por data-row-id...`);
                // Buscar el checkbox correcto por data-row-id
                const correctInput = element.querySelector(`input[data-row-id="${rowId}"][data-column-id="${currentColumnId}"]`) as HTMLInputElement;
                if (correctInput) {
                  checkboxContainer = correctInput.closest('.ubits-checkbox') as HTMLElement;
                  console.log(`☑️ [CHECKBOX] checkboxContainer encontrado (por data-row-id):`, checkboxContainer);
                }
              } else {
                console.log(`☑️ [CHECKBOX] ✅ checkboxContainer validado correctamente`);
              }
            }
            
            if (checkboxContainer) {
              const checkboxSquare = checkboxContainer.querySelector('.ubits-checkbox__square') as HTMLElement;
              console.log(`☑️ [CHECKBOX] checkboxSquare encontrado:`, checkboxSquare);
              console.log(`☑️ [CHECKBOX] checkboxContainer classes:`, checkboxContainer.className);
              
              if (isChecked) {
                // IMPORTANTE: Primero asegurar que la clase esté presente
                checkboxContainer.classList.add('ubits-checkbox--checked');
                checkboxContainer.classList.remove('ubits-checkbox--indeterminate');
                console.log(`☑️ [CHECKBOX] Clases agregadas: checked`);
                
                // Crear o asegurar que existe el elemento checkmark
                if (checkboxSquare) {
                  // Remover el elemento indeterminate si existe
                  const indeterminateEl = checkboxSquare.querySelector('.ubits-checkbox__indeterminate');
                  if (indeterminateEl) {
                    indeterminateEl.remove();
                    console.log(`☑️ [CHECKBOX] Indeterminate removido`);
                  }
                  
                  // IMPORTANTE: Asegurar que la clase checked esté presente PRIMERO
                  // Esto es crítico para que el CSS se aplique correctamente
                  checkboxContainer.classList.add('ubits-checkbox--checked');
                  checkboxContainer.classList.remove('ubits-checkbox--indeterminate');
                  
                  // Forzar un reflow para que el navegador procese la clase
                  void checkboxContainer.offsetHeight;
                  
                  // IMPORTANTE: Verificar si el checkmark ya existe
                  let checkmarkEl = checkboxSquare.querySelector('.ubits-checkbox__checkmark') as HTMLElement;
                  if (!checkmarkEl) {
                    // Crear el checkmark solo si no existe
                    checkmarkEl = document.createElement('span');
                  checkmarkEl.className = 'ubits-checkbox__checkmark';
                  checkboxSquare.appendChild(checkmarkEl);
                  console.log(`☑️ [CHECKBOX] ✅ Checkmark creado y agregado al DOM`);
                  } else {
                    console.log(`☑️ [CHECKBOX] ✅ Checkmark ya existe, reutilizando`);
                  }
                  
                  // IMPORTANTE: Remover la transición temporalmente para mostrar inmediatamente
                  const originalTransition = checkmarkEl.style.transition;
                  checkmarkEl.style.transition = 'none';
                  
                  // Aplicar estilos directamente para asegurar que se muestre inmediatamente
                  checkmarkEl.style.setProperty('opacity', '1', 'important');
                  checkmarkEl.style.setProperty('transform', 'scale(1)', 'important');
                  checkmarkEl.style.setProperty('display', 'flex', 'important');
                  console.log(`☑️ [CHECKBOX] Estilos forzados directamente con !important`);
                  
                  // IMPORTANTE: Forzar un reflow completo usando getComputedStyle
                  // Esto asegura que el navegador renderice el checkmark inmediatamente
                  window.getComputedStyle(checkmarkEl).opacity;
                  window.getComputedStyle(checkmarkEl).transform;
                  window.getComputedStyle(checkmarkEl).display;
                  
                  // Forzar múltiples reflows adicionales para asegurar que el navegador renderice el checkmark
                  void checkmarkEl.offsetHeight;
                  void checkboxSquare.offsetHeight;
                  void checkboxContainer.offsetHeight;
                  
                  // Restaurar la transición después de un pequeño delay para permitir animaciones futuras
                  setTimeout(() => {
                    checkmarkEl.style.transition = originalTransition || '';
                  }, 0);
                  
                  // Usar requestAnimationFrame para asegurar que el DOM se actualice
                  requestAnimationFrame(() => {
                    // Verificar que el checkmark esté en el DOM y tenga los estilos correctos
                    const verifyCheckmark = checkboxSquare.querySelector('.ubits-checkbox__checkmark') as HTMLElement;
                    if (verifyCheckmark) {
                      // Verificar estilos
                      const computedStyles = window.getComputedStyle(verifyCheckmark);
                      console.log(`☑️ [CHECKBOX] Verificación checkmark en DOM (después de RAF):`, verifyCheckmark);
                      console.log(`☑️ [CHECKBOX] Checkmark opacity (computed): ${computedStyles.opacity}, transform (computed): ${computedStyles.transform}`);
                      console.log(`☑️ [CHECKBOX] Checkmark display: ${computedStyles.display}`);
                      console.log(`☑️ [CHECKBOX] Checkmark width: ${computedStyles.width}, height: ${computedStyles.height}`);
                      
                      // Verificar que el pseudo-elemento ::after esté presente
                      const afterStyles = window.getComputedStyle(verifyCheckmark, '::after');
                      console.log(`☑️ [CHECKBOX] Checkmark ::after content: ${afterStyles.content}, display: ${afterStyles.display}`);
                      
                      // Si el CSS no se aplicó correctamente, forzar los estilos directamente
                      if (computedStyles.opacity === '0' || computedStyles.transform.includes('scale(0)')) {
                        console.log(`☑️ [CHECKBOX] ⚠️ CSS no aplicado correctamente después de forzar, reintentando...`);
                        verifyCheckmark.style.setProperty('opacity', '1', 'important');
                        verifyCheckmark.style.setProperty('transform', 'scale(1)', 'important');
                        verifyCheckmark.style.setProperty('display', 'flex', 'important');
                        // Forzar otro reflow
                        void verifyCheckmark.offsetHeight;
                      }
                    } else {
                      console.log(`☑️ [CHECKBOX] ⚠️ Checkmark no encontrado después de crearlo`);
                    }
                  });
                } else {
                  console.log(`☑️ [CHECKBOX] ⚠️ checkboxSquare no encontrado`);
                }
              } else {
                checkboxContainer.classList.remove('ubits-checkbox--checked');
                checkboxContainer.classList.remove('ubits-checkbox--indeterminate');
                console.log(`☑️ [CHECKBOX] Clases removidas: checked`);
                
                // Remover el checkmark si existe
                if (checkboxSquare) {
                  const checkmarkEl = checkboxSquare.querySelector('.ubits-checkbox__checkmark');
                  if (checkmarkEl) {
                    checkmarkEl.remove();
                    console.log(`☑️ [CHECKBOX] Checkmark removido`);
                  }
                  const indeterminateEl = checkboxSquare.querySelector('.ubits-checkbox__indeterminate');
                  if (indeterminateEl) {
                    indeterminateEl.remove();
                  }
                }
              }
              console.log(`☑️ [CHECKBOX] ✅ Clase CSS del contenedor y checkmark actualizados`);
            } else {
              console.log(`☑️ [CHECKBOX] ⚠️ checkboxContainer no encontrado usando closest`);
              
              // Intentar buscar por data-row-id como fallback
              const allCheckboxes = element.querySelectorAll(`input[data-row-id="${rowId}"][data-column-id="${columnId}"]`);
              console.log(`☑️ [CHECKBOX] Checkboxes encontrados por data-row-id:`, allCheckboxes.length);
              
              if (allCheckboxes.length > 0) {
                const correctInput = Array.from(allCheckboxes).find(cb => cb === input) as HTMLInputElement || allCheckboxes[0] as HTMLInputElement;
                const correctContainer = correctInput?.closest('.ubits-checkbox') as HTMLElement;
                console.log(`☑️ [CHECKBOX] Checkbox correcto encontrado:`, correctContainer);
                
                if (correctContainer) {
                  const checkboxSquare = correctContainer.querySelector('.ubits-checkbox__square') as HTMLElement;
                  
                  if (isChecked) {
                    correctContainer.classList.add('ubits-checkbox--checked');
                    correctContainer.classList.remove('ubits-checkbox--indeterminate');
                    
                    if (checkboxSquare) {
                      const indeterminateEl = checkboxSquare.querySelector('.ubits-checkbox__indeterminate');
                      if (indeterminateEl) {
                        indeterminateEl.remove();
                      }
                      let checkmarkEl = checkboxSquare.querySelector('.ubits-checkbox__checkmark');
                      if (!checkmarkEl) {
                        checkmarkEl = document.createElement('span');
                        checkmarkEl.className = 'ubits-checkbox__checkmark';
                        checkboxSquare.appendChild(checkmarkEl);
                        console.log(`☑️ [CHECKBOX] ✅ Checkmark creado (fallback)`);
                      }
                    }
                  } else {
                    correctContainer.classList.remove('ubits-checkbox--checked');
                    correctContainer.classList.remove('ubits-checkbox--indeterminate');
                    
                    if (checkboxSquare) {
                      const checkmarkEl = checkboxSquare.querySelector('.ubits-checkbox__checkmark');
                      if (checkmarkEl) {
                        checkmarkEl.remove();
                      }
                    }
                  }
                }
              }
            }
            
            // Actualizar header checkbox (indeterminado) sin re-renderizar toda la tabla
            const headerCheckbox = element.querySelector(`input[data-column-checkbox-header="${columnId}"]`) as HTMLInputElement;
            if (headerCheckbox) {
              const allChecked = currentOptions.rows.length > 0 && currentOptions.rows.every(r => r.data[columnId] === true);
              const someChecked = currentOptions.rows.some(r => r.data[columnId] === true);
              const isIndeterminate = someChecked && !allChecked;
              
              headerCheckbox.checked = allChecked;
              headerCheckbox.indeterminate = isIndeterminate;
              
              // Actualizar también la clase CSS del contenedor del header checkbox
              const headerCheckboxContainer = headerCheckbox.closest('.ubits-checkbox') as HTMLElement;
              if (headerCheckboxContainer) {
                const headerCheckboxSquare = headerCheckboxContainer.querySelector('.ubits-checkbox__square') as HTMLElement;
                
                if (allChecked) {
                  headerCheckboxContainer.classList.add('ubits-checkbox--checked');
                  headerCheckboxContainer.classList.remove('ubits-checkbox--indeterminate');
                  
                  // Crear checkmark si no existe
                  if (headerCheckboxSquare) {
                    const indeterminateEl = headerCheckboxSquare.querySelector('.ubits-checkbox__indeterminate');
                    if (indeterminateEl) {
                      indeterminateEl.remove();
                    }
                    let checkmarkEl = headerCheckboxSquare.querySelector('.ubits-checkbox__checkmark');
                    if (!checkmarkEl) {
                      checkmarkEl = document.createElement('span');
                      checkmarkEl.className = 'ubits-checkbox__checkmark';
                      headerCheckboxSquare.appendChild(checkmarkEl);
                    }
                  }
                } else if (isIndeterminate) {
                  headerCheckboxContainer.classList.remove('ubits-checkbox--checked');
                  headerCheckboxContainer.classList.add('ubits-checkbox--indeterminate');
                  
                  // Crear indeterminate si no existe
                  if (headerCheckboxSquare) {
                    const checkmarkEl = headerCheckboxSquare.querySelector('.ubits-checkbox__checkmark');
                    if (checkmarkEl) {
                      checkmarkEl.remove();
                    }
                    let indeterminateEl = headerCheckboxSquare.querySelector('.ubits-checkbox__indeterminate');
                    if (!indeterminateEl) {
                      indeterminateEl = document.createElement('span');
                      indeterminateEl.className = 'ubits-checkbox__indeterminate';
                      headerCheckboxSquare.appendChild(indeterminateEl);
                    }
                  }
                } else {
                  headerCheckboxContainer.classList.remove('ubits-checkbox--checked');
                  headerCheckboxContainer.classList.remove('ubits-checkbox--indeterminate');
                  
                  // Remover ambos elementos
                  if (headerCheckboxSquare) {
                    const checkmarkEl = headerCheckboxSquare.querySelector('.ubits-checkbox__checkmark');
                    if (checkmarkEl) {
                      checkmarkEl.remove();
                    }
                    const indeterminateEl = headerCheckboxSquare.querySelector('.ubits-checkbox__indeterminate');
                    if (indeterminateEl) {
                      indeterminateEl.remove();
                    }
                  }
                }
              }
              
              console.log(`☑️ [CHECKBOX] ✅ Header checkbox actualizado - allChecked: ${allChecked}, indeterminate: ${isIndeterminate}`);
            }
            
            // Forzar limpieza del hover de la fila seleccionada usando clase CSS
            // Esto evita que la fila se quede en estado hover después de seleccionar
            console.log(`🎨 [HOVER CLEANUP] ========== INICIO LIMPIEZA HOVER ==========`);
            console.log(`🎨 [HOVER CLEANUP] Buscando fila para limpiar hover...`);
            const rowElement = newCheckbox.closest('.ubits-data-table__row') as HTMLElement;
            console.log(`🎨 [HOVER CLEANUP] rowElement encontrado:`, rowElement);
            if (rowElement) {
              console.log(`🎨 [HOVER CLEANUP] ✅ Fila encontrada, verificando estado actual...`);
              const beforeClasses = Array.from(rowElement.classList);
              const computedStyleBefore = window.getComputedStyle(rowElement);
              const bgBefore = computedStyleBefore.backgroundColor;
              console.log(`🎨 [HOVER CLEANUP] Estado ANTES:`, {
                classes: beforeClasses,
                backgroundColor: bgBefore,
                hasHoverClass: rowElement.classList.contains('ubits-data-table__row--clear-hover')
              });
              
              // Obtener todas las celdas primero
              const cells = rowElement.querySelectorAll('.ubits-data-table__cell');
              console.log(`🎨 [HOVER CLEANUP] Celdas encontradas:`, cells.length);
              
              // SOLUCIÓN AGRESIVA: Deshabilitar pointer-events temporalmente para forzar limpieza del hover
              console.log(`🎨 [HOVER CLEANUP] 🔧 Aplicando solución agresiva: pointer-events: none`);
              const originalPointerEvents = rowElement.style.pointerEvents;
              rowElement.style.pointerEvents = 'none';
              console.log(`🎨 [HOVER CLEANUP] ✅ pointer-events deshabilitado temporalmente`);
              
              // Forzar reflow para que el navegador procese el cambio
              void rowElement.offsetHeight;
              
              // Ahora aplicar los estilos
              const bg1Value = getComputedStyle(document.documentElement).getPropertyValue('--ubits-bg-1').trim() || 'rgb(20, 28, 41)';
              
              // Agregar clase para forzar limpieza del hover inmediatamente
              rowElement.classList.add('ubits-data-table__row--clear-hover');
              console.log(`🎨 [HOVER CLEANUP] ✅ Clase agregada: ubits-data-table__row--clear-hover`);
              
              // Aplicar también inline style como respaldo para forzar el cambio
              rowElement.style.setProperty('background-color', bg1Value, 'important');
              console.log(`🎨 [HOVER CLEANUP] ✅ Inline style aplicado a fila: background-color = ${bg1Value}`);
              
              // Aplicar también a todas las celdas
              cells.forEach((cell, index) => {
                (cell as HTMLElement).style.setProperty('background-color', bg1Value, 'important');
                console.log(`🎨 [HOVER CLEANUP] ✅ Celda ${index} inline style aplicado`);
              });
              
              // Forzar otro reflow después de aplicar estilos
              void rowElement.offsetHeight;
              
              // Restaurar pointer-events inmediatamente
              rowElement.style.pointerEvents = originalPointerEvents || '';
              console.log(`🎨 [HOVER CLEANUP] ✅ pointer-events restaurado: ${originalPointerEvents || 'default'}`);
              
              // Verificar estado después de todo
              const computedStyleAfter = window.getComputedStyle(rowElement);
              const bgAfter = computedStyleAfter.backgroundColor;
              const afterClasses = Array.from(rowElement.classList);
              console.log(`🎨 [HOVER CLEANUP] Estado DESPUÉS de aplicar solución agresiva:`, {
                classes: afterClasses,
                backgroundColor: bgAfter,
                bgBefore: bgBefore,
                bgChanged: bgBefore !== bgAfter,
                pointerEvents: rowElement.style.pointerEvents || 'default'
              });
              
              // Verificar todas las celdas también
              cells.forEach((cell, index) => {
                const cellStyle = window.getComputedStyle(cell as HTMLElement);
                const cellBg = cellStyle.backgroundColor;
                console.log(`🎨 [HOVER CLEANUP] Celda ${index} background: ${cellBg} (inline: ${(cell as HTMLElement).style.backgroundColor || 'none'})`);
              });
              
              // Remover la clase después de un pequeño delay para permitir hover normal después
              requestAnimationFrame(() => {
                console.log(`🎨 [HOVER CLEANUP] ⏰ requestAnimationFrame ejecutado, programando timeout...`);
                setTimeout(() => {
                  console.log(`🎨 [HOVER CLEANUP] ⏰ Timeout ejecutado, removiendo clase e inline styles...`);
                  const beforeRemove = window.getComputedStyle(rowElement).backgroundColor;
                  
                  // Remover clase
                  rowElement.classList.remove('ubits-data-table__row--clear-hover');
                  
                  // Remover inline styles
                  rowElement.style.removeProperty('background-color');
                  cells.forEach((cell) => {
                    (cell as HTMLElement).style.removeProperty('background-color');
                  });
                  
                  const afterRemove = window.getComputedStyle(rowElement).backgroundColor;
                  console.log(`🎨 [HOVER CLEANUP] ✅ Clase e inline styles removidos. Background antes: ${beforeRemove}, después: ${afterRemove}`);
                  console.log(`🎨 [HOVER CLEANUP] ========== FIN LIMPIEZA HOVER ==========`);
                }, 150);
              });
            } else {
              console.log(`🎨 [HOVER CLEANUP] ❌ Fila NO encontrada usando closest('.ubits-data-table__row')`);
              console.log(`🎨 [HOVER CLEANUP] newCheckbox:`, newCheckbox);
              console.log(`🎨 [HOVER CLEANUP] newCheckbox.parentElement:`, newCheckbox.parentElement);
              console.log(`🎨 [HOVER CLEANUP] newCheckbox.closest('tr'):`, newCheckbox.closest('tr'));
            }
            
            // Llamar a onRowSelect callback
            if (currentOptions.onRowSelect) {
              console.log(`☑️ [CHECKBOX] Llamando onRowSelect...`);
              currentOptions.onRowSelect(rowId, isChecked);
              console.log(`☑️ [CHECKBOX] onRowSelect completado`);
            }
            
            // NO llamar a render() - esto evita el brinco
            // El checkbox visual ya está actualizado por el evento nativo y las clases CSS
            console.log(`☑️ [CHECKBOX] ✅ Optimizado: NO se llama render() - sin brinco`);
          } else {
            // Para otros checkboxes, mantener el comportamiento actual
            console.log(`☑️ [CHECKBOX] ⚠️ Llamando render() - esto causará el brinco`);
            console.log(`☑️ [CHECKBOX] 🔍 RAZÓN: columnId="${currentColumnId}" NO es checkbox-2, llamando render() desde handler individual`);
            console.log(`☑️ [CHECKBOX] 🔍 Stack trace antes de render():`, new Error().stack?.split('\n').slice(1, 6).join('\n'));
        render();
          }
        }
        console.log(`☑️ [CHECKBOX] ========== FIN ==========`);
      };
      newCheckbox.addEventListener('change', checkboxIndividualHandler, { capture: false });
      console.log(`☑️ [CHECKBOX] ✅ Listener agregado con capture:false - handler function:`, checkboxIndividualHandler);
    });

    // Botones de expandir
    const expandButtons = element.querySelectorAll('[data-expand-button="true"]');
    console.log('🔘 [EXPAND] Botones de expandir encontrados:', expandButtons.length);
    expandButtons.forEach((button, index) => {
      // Remover listeners anteriores si existen para evitar duplicados
      const newButton = button.cloneNode(true) as HTMLElement;
      button.parentNode?.replaceChild(newButton, button);
      
      newButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const rowIdStr = newButton.getAttribute('data-row-id')!;
        const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
        console.log('🔘 [EXPAND] Click en botón de expandir - rowId:', rowId);
        
        const row = currentOptions.rows.find(r => r.id === rowId);
        
        if (row) {
          const wasExpanded = row.expanded || false;
          row.expanded = !wasExpanded;
          console.log('🔘 [EXPAND] Fila encontrada - wasExpanded:', wasExpanded, '-> expanded:', row.expanded);
          console.log('🔘 [EXPAND] Fila tiene renderExpandedContent:', !!row.renderExpandedContent);
          
          if (currentOptions.onRowExpand) {
            currentOptions.onRowExpand(rowId, row.expanded);
          }
          
          console.log('🔘 [EXPAND] Llamando render()...');
          render();
          console.log('🔘 [EXPAND] Render() completado');
          
          // Si la fila se expandió, hacer scroll para mostrar el contenido expandido
          if (row.expanded) {
            requestAnimationFrame(() => {
              const rowElement = element.querySelector(`[data-row-id="${rowId}"]`) as HTMLElement;
              if (rowElement) {
                const expandedRow = rowElement.nextElementSibling as HTMLElement;
                if (expandedRow && expandedRow.classList.contains('ubits-data-table__row-expanded-row')) {
                  console.log('🔘 [EXPAND] Haciendo scroll para mostrar contenido expandido');
                  
                  // Buscar el contenedor scrollable
                  const scrollableContainer = element.querySelector('.ubits-data-table__scrollable-container--vertical') as HTMLElement;
                  if (scrollableContainer) {
                    // Hacer scroll para que la fila expandida sea visible
                    const rowTop = rowElement.offsetTop;
                    scrollableContainer.scrollTop = rowTop - 50; // 50px de margen superior
                    console.log('🔘 [EXPAND] Scroll aplicado - scrollTop:', scrollableContainer.scrollTop);
                  } else {
                    // Si no hay contenedor scrollable, hacer scroll en el window
                    rowElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    console.log('🔘 [EXPAND] ScrollIntoView aplicado (sin contenedor scrollable)');
                  }
                }
              }
            });
          }
        } else {
          console.warn('🔘 [EXPAND] ⚠️ Fila no encontrada para rowId:', rowId);
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
      
      // CRÍTICO: Para columnas fijadas, el dropdown debe estar fuera del header cell
      // para evitar problemas de contexto de apilamiento con position: sticky
      let dropdown: HTMLElement;
      let dropdownContainer: HTMLElement | null = null;
      
      if (isPinned || hasStickyClass) {
        // Para columnas fijadas, crear un contenedor en el body o en el elemento raíz de la tabla
        const tableElement = element.querySelector('.ubits-data-table') as HTMLElement;
        const rootContainer = tableElement?.closest('.ubits-data-table__scrollable-container') || element;
        
        // Buscar dropdown existente por data-column-id
        dropdown = rootContainer.querySelector(`.ubits-data-table__column-menu-dropdown[data-column-id="${columnId}"]`) as HTMLElement;
        
        if (!dropdown) {
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
        }
      } else {
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
        }
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
        // Si el dropdown está fuera del header cell (columna fijada), removerlo del DOM
        if ((isPinned || hasStickyClass) && dropdown.parentElement && dropdown.parentElement !== headerCell) {
          dropdown.remove();
        }
      };
      
      let handleOutsideClickRef: ((e: MouseEvent) => void) | null = null;
      
      // Agregar listener para abrir/cerrar el dropdown
      btn.addEventListener('click', (e) => {
        // Detectar si estamos en la web (no en Storybook)
        const isWeb = typeof window !== 'undefined' && window.location && !window.location.href.includes('storybook');
        
        e.preventDefault();
        e.stopPropagation();
        
        // Re-obtener la columna para asegurar que está actualizada
        const currentColumn = currentOptions.columns.find(col => col.id === columnId);
        if (!currentColumn) {
          console.error('❌ [COLUMN MENU] Columna no encontrada:', columnId);
          return;
        }
        
        const isPinned = currentColumn.pinned || false;
        
        // Si ya está abierto, cerrarlo
        if (isOpen) {
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
          const listElement = createList({
            containerId: listId,
            items: listItems,
            size: 'sm',
            maxHeight: '200px',
            onSelectionChange: (selectedItem, index) => {
              if (selectedItem && selectedItem.value === 'pin') {
                // Toggle pinned
                const column = currentOptions.columns.find(col => col.id === columnId);
                if (column) {
                  const oldPinned = column.pinned || false;
                  column.pinned = !oldPinned;
                  
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
        } catch (error) {
          console.error('❌ [COLUMN MENU] Error al crear lista con createList:', error);
          // Fallback: usar renderList
          const listHTML = renderList({
            items: listItems,
            size: 'sm',
            maxHeight: '200px'
          });
          dropdown.innerHTML = listHTML;
          
          // Agregar event listeners manualmente
          const listItemsElements = dropdown.querySelectorAll('.ubits-list-item');
          listItemsElements.forEach((itemEl) => {
            itemEl.addEventListener('click', () => {
              const column = currentOptions.columns.find(col => col.id === columnId);
              if (column) {
                const oldPinned = column.pinned || false;
                column.pinned = !oldPinned;
                
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
        
        // Obtener información del botón
        const btnRect = btn.getBoundingClientRect();
        const headerCellRect = headerCell.getBoundingClientRect();
        
        // Si la columna está fijada, usar position: fixed con coordenadas calculadas
        // Si no está fijada, usar position: absolute relativo al header cell
        if (isCurrentlyPinned || hasStickyClassNow) {
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
        } else {
          // Para columnas normales, usar absolute positioning relativo al header cell
          dropdown.style.position = 'absolute';
          dropdown.style.top = '100%';
          dropdown.style.right = '0';
          dropdown.style.left = 'auto';
          dropdown.style.zIndex = `${dropdownZIndex}`;
          dropdown.style.setProperty('z-index', `${dropdownZIndex}`, 'important');
          dropdown.style.display = 'block';
        }
        
        isOpen = true;
        
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
    
    // Botones de acciones en las filas (columnas de tipo 'acciones')
    const actionButtons = element.querySelectorAll('.ubits-data-table__action-button');
    console.log('🎯 [ACTION BUTTONS] Botones de acciones encontrados:', actionButtons.length);
    actionButtons.forEach((button) => {
      const btn = button as HTMLElement;
      
      // Obtener rowId y columnId directamente de los atributos del botón
      const rowIdStr = btn.getAttribute('data-row-id');
      const columnId = btn.getAttribute('data-column-id');
      
      if (!rowIdStr) {
        console.warn('⚠️ [ACTION BUTTONS] No se encontró el data-row-id en el botón');
        return;
      }
      
      const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
      
      // Remover listeners anteriores si existen para evitar duplicados
      const newButton = btn.cloneNode(true) as HTMLElement;
      btn.parentNode?.replaceChild(newButton, btn);
      
      newButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 [ACTION BUTTONS] Click en botón de acción - rowId:', rowId, 'columnId:', columnId);
        
        const row = currentOptions.rows.find(r => r.id === rowId);
        if (row) {
          // Llamar callback si existe
          if (currentOptions.onRowAction) {
            currentOptions.onRowAction(rowId, row);
          } else {
            // Fallback: mostrar alerta
            console.log('🎯 [ACTION BUTTONS] Acción ejecutada para fila:', rowId);
            alert(`Acción ejecutada para fila: ${rowId}`);
          }
        } else {
          console.warn('⚠️ [ACTION BUTTONS] Fila no encontrada para rowId:', rowId);
        }
      });
    });
    
    // Menú contextual (click derecho) en las filas - solo si está habilitado
    const showContextMenuValue = currentOptions.showContextMenu !== false;
    console.log('🖱️ [CONTEXT MENU] ========== INICIO CONFIGURACIÓN MENÚ CONTEXTUAL ==========');
    console.log('🖱️ [CONTEXT MENU] showContextMenuValue:', showContextMenuValue);
    console.log('🖱️ [CONTEXT MENU] showContextMenu option:', currentOptions.showContextMenu);
    console.log('🖱️ [CONTEXT MENU] Element:', element);
    
    if (showContextMenuValue) {
      // Seleccionar solo las filas de datos (excluyendo filas expandidas)
      const tableRows = element.querySelectorAll('tr.ubits-data-table__row[data-row-id]');
      console.log('🖱️ [CONTEXT MENU] Filas encontradas con selector "tr.ubits-data-table__row[data-row-id]":', tableRows.length);
      
      if (tableRows.length === 0) {
        console.warn('🖱️ [CONTEXT MENU] ⚠️ No se encontraron filas con selector: tr.ubits-data-table__row[data-row-id]');
        // Intentar con selector alternativo
        const altRows = element.querySelectorAll('[data-row-id]');
        console.log('🖱️ [CONTEXT MENU] Filas encontradas con selector alternativo "[data-row-id]":', altRows.length);
        
        if (altRows.length > 0) {
          console.log('🖱️ [CONTEXT MENU] Usando selector alternativo para agregar listeners');
          // Usar el selector alternativo
          altRows.forEach((rowElement, index) => {
            const row = rowElement as HTMLElement;
            const rowIdStr = row.getAttribute('data-row-id');
            
            if (!rowIdStr) {
              console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:', index);
              return;
            }
            
            const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
            console.log('🖱️ [CONTEXT MENU] Agregando listener a fila (alternativo):', rowId);
            
            // Reutilizar la misma lógica del menú contextual
            // (El código completo está más abajo, pero necesitamos crear el contenedor primero)
            const contextMenuContainer = document.getElementById('ubits-data-table-context-menu') || (() => {
              const container = document.createElement('div');
              container.id = 'ubits-data-table-context-menu';
              container.style.cssText = `
                position: fixed;
                z-index: 10000;
                display: none;
                background-color: var(--ubits-bg-1);
                border: 1px solid var(--ubits-border-1);
                border-radius: var(--ubits-border-radius-md, 8px);
                box-shadow: var(--ubits-elevation-2, 0 4px 6px rgba(0, 0, 0, 0.1));
                min-width: 200px;
                max-width: 300px;
              `;
              document.body.appendChild(container);
              return container;
            })();
            
            row.addEventListener('contextmenu', (e) => {
              e.preventDefault();
              e.stopPropagation();
              
              console.log('🖱️ [CONTEXT MENU] ========== Click derecho detectado (alternativo) ==========');
              console.log('🖱️ [CONTEXT MENU] Fila ID:', rowId);
              alert(`Click derecho en fila ${rowId} - Menú contextual (implementación completa pendiente)`);
            });
          });
          console.log('🖱️ [CONTEXT MENU] ✅ Listeners agregados usando selector alternativo');
          return; // Salir temprano si usamos el selector alternativo
        }
      } else {
        console.log('🖱️ [CONTEXT MENU] ✅ Filas encontradas, procediendo a agregar listeners...');
      }
      
      // Crear contenedor para el menú contextual si no existe
      let contextMenuContainer: HTMLElement | null = document.getElementById('ubits-data-table-context-menu');
      if (!contextMenuContainer) {
        contextMenuContainer = document.createElement('div');
        contextMenuContainer.id = 'ubits-data-table-context-menu';
        contextMenuContainer.style.cssText = `
          position: fixed;
          z-index: 10000;
          display: none;
          background-color: var(--ubits-bg-1);
          border: 1px solid var(--ubits-border-1);
          border-radius: var(--ubits-border-radius-md, 8px);
          box-shadow: var(--ubits-elevation-2, 0 4px 6px rgba(0, 0, 0, 0.1));
          min-width: 200px;
          max-width: 300px;
        `;
        document.body.appendChild(contextMenuContainer);
      }
      
      let currentContextMenuRowId: string | number | null = null;
      let handleContextMenuOutsideClick: ((e: MouseEvent) => void) | null = null;
      
      const closeContextMenu = () => {
        if (contextMenuContainer) {
          contextMenuContainer.style.display = 'none';
          contextMenuContainer.innerHTML = '';
        }
        currentContextMenuRowId = null;
        if (handleContextMenuOutsideClick) {
          document.removeEventListener('click', handleContextMenuOutsideClick);
          document.removeEventListener('contextmenu', handleContextMenuOutsideClick);
          handleContextMenuOutsideClick = null;
        }
      };
      
      tableRows.forEach((rowElement, index) => {
        const row = rowElement as HTMLElement;
        const rowIdStr = row.getAttribute('data-row-id');
        
        if (!rowIdStr) {
          console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila sin data-row-id en índice:', index);
          return;
        }
        
        const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
        console.log('🖱️ [CONTEXT MENU] Agregando listener a fila:', rowId, 'elemento:', row);
        
        row.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          console.log('🖱️ [CONTEXT MENU] ========== Click derecho detectado ==========');
          console.log('🖱️ [CONTEXT MENU] Fila ID:', rowId);
          console.log('🖱️ [CONTEXT MENU] Event:', e);
          console.log('🖱️ [CONTEXT MENU] Coordenadas:', { x: e.clientX, y: e.clientY });
        
        const rowData = currentOptions.rows.find(r => r.id === rowId);
        if (!rowData) {
          console.warn('🖱️ [CONTEXT MENU] ⚠️ Fila no encontrada en currentOptions.rows:', rowId);
          console.log('🖱️ [CONTEXT MENU] Total de filas disponibles:', currentOptions.rows.length);
          return;
        }
        
        console.log('🖱️ [CONTEXT MENU] Datos de fila encontrados:', rowData);
        currentContextMenuRowId = rowId;
        
        // Cerrar menú anterior si existe
        console.log('🖱️ [CONTEXT MENU] Cerrando menú anterior...');
        closeContextMenu();
        
        // Crear items del menú contextual (mismas opciones que barra de acciones individuales)
        // Helper para crear label con icono
        const createLabelWithIcon = (icon: string, text: string) => {
          return `<div style="display: flex; align-items: center; gap: var(--ubits-spacing-xs, 8px);">
            <i class="far fa-${icon}" style="font-size: 14px; width: 16px; text-align: center;"></i>
            <span>${text}</span>
          </div>`;
        };
        
        const menuItems = [
          {
            label: createLabelWithIcon('eye', 'Ver seleccionados'),
            value: 'view-selected',
            state: 'default' as const,
            onClick: () => {
              console.log('🖱️ [CONTEXT MENU] Ver seleccionados para fila:', rowId);
              closeContextMenu();
              // Aquí puedes agregar la lógica para ver seleccionados
            }
          },
          {
            label: createLabelWithIcon('bell', 'Notificaciones'),
            value: 'notifications',
            state: 'default' as const,
            onClick: () => {
              console.log('🖱️ [CONTEXT MENU] Notificaciones para fila:', rowId);
              closeContextMenu();
              alert(`Notificaciones para fila: ${rowId}`);
            }
          },
          {
            label: createLabelWithIcon('copy', 'Copiar'),
            value: 'copy',
            state: 'default' as const,
            onClick: () => {
              console.log('🖱️ [CONTEXT MENU] Copiar para fila:', rowId);
              closeContextMenu();
              alert(`Copiar para fila: ${rowId}`);
            }
          },
          {
            label: createLabelWithIcon('eye', 'Ver'),
            value: 'view',
            state: 'default' as const,
            onClick: () => {
              console.log('🖱️ [CONTEXT MENU] Ver para fila:', rowId);
              closeContextMenu();
              alert(`Ver para fila: ${rowId}`);
            }
          },
          {
            label: createLabelWithIcon('edit', 'Editar'),
            value: 'edit',
            state: 'default' as const,
            onClick: () => {
              console.log('🖱️ [CONTEXT MENU] Editar para fila:', rowId);
              closeContextMenu();
              alert(`Editar para fila: ${rowId}`);
            }
          },
          {
            label: createLabelWithIcon('download', 'Descargar'),
            value: 'download',
            state: 'default' as const,
            onClick: () => {
              console.log('🖱️ [CONTEXT MENU] Descargar para fila:', rowId);
              closeContextMenu();
              alert(`Descargar para fila: ${rowId}`);
            }
          },
          {
            label: createLabelWithIcon('trash', 'Eliminar'),
            value: 'delete',
            state: 'default' as const,
            onClick: () => {
              console.log('🖱️ [CONTEXT MENU] Eliminar para fila:', rowId);
              closeContextMenu();
              alert(`Eliminar para fila: ${rowId}`);
            }
          }
        ];
        
        // Crear el menú usando createList
        const menuId = `context-menu-list-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        console.log('🖱️ [CONTEXT MENU] Creando menú con ID:', menuId);
        
        // Verificar que el contenedor existe
        if (!contextMenuContainer) {
          console.error('🖱️ [CONTEXT MENU] ❌ contextMenuContainer es null!');
          return;
        }
        
        // Crear contenedor interno para la lista
        const listContainer = document.createElement('div');
        listContainer.id = menuId;
        contextMenuContainer.innerHTML = '';
        contextMenuContainer.appendChild(listContainer);
        console.log('🖱️ [CONTEXT MENU] Contenedor creado y agregado al DOM');
        
        try {
          console.log('🖱️ [CONTEXT MENU] Intentando crear lista con createList...');
          console.log('🖱️ [CONTEXT MENU] Items del menú:', menuItems.length);
          const listElement = createList({
            containerId: menuId,
            items: menuItems,
            size: 'sm',
            maxHeight: '400px',
            onSelectionChange: (item, index) => {
              console.log('🖱️ [CONTEXT MENU] Item seleccionado:', item?.value, 'índice:', index);
              if (item && item.onClick) {
                item.onClick();
              }
            }
          });
          console.log('🖱️ [CONTEXT MENU] ✅ Lista creada exitosamente');
          
          // Posicionar el menú donde se hizo click
          const x = e.clientX;
          const y = e.clientY;
          console.log('🖱️ [CONTEXT MENU] Posicionando menú en:', { x, y });
          
          contextMenuContainer.style.left = `${x}px`;
          contextMenuContainer.style.top = `${y}px`;
          contextMenuContainer.style.display = 'block';
          console.log('🖱️ [CONTEXT MENU] Menú visible, display:', contextMenuContainer.style.display);
          
          // Ajustar posición si el menú se sale de la pantalla
          requestAnimationFrame(() => {
            const rect = contextMenuContainer.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            console.log('🖱️ [CONTEXT MENU] Dimensiones del menú:', { 
              width: rect.width, 
              height: rect.height,
              right: rect.right,
              bottom: rect.bottom,
              windowWidth,
              windowHeight
            });
            
            if (rect.right > windowWidth) {
              contextMenuContainer.style.left = `${windowWidth - rect.width - 10}px`;
              console.log('🖱️ [CONTEXT MENU] Ajustando posición horizontal');
            }
            if (rect.bottom > windowHeight) {
              contextMenuContainer.style.top = `${windowHeight - rect.height - 10}px`;
              console.log('🖱️ [CONTEXT MENU] Ajustando posición vertical');
            }
          });
          
          // Cerrar menú al hacer click fuera o click derecho en otro lugar
          handleContextMenuOutsideClick = (e: MouseEvent) => {
            if (!contextMenuContainer!.contains(e.target as Node)) {
              closeContextMenu();
            }
          };
          
          setTimeout(() => {
            document.addEventListener('click', handleContextMenuOutsideClick!);
            document.addEventListener('contextmenu', handleContextMenuOutsideClick!);
          }, 0);
        } catch (error) {
          console.error('🖱️ [CONTEXT MENU] ❌ Error al crear menú contextual:', error);
          console.error('🖱️ [CONTEXT MENU] Stack:', error instanceof Error ? error.stack : 'N/A');
          // Fallback: usar renderList
          console.log('🖱️ [CONTEXT MENU] Usando fallback con renderList...');
          const listHTML = renderList({
            items: menuItems,
            size: 'sm',
            maxHeight: '400px'
          });
          
          listContainer.innerHTML = listHTML;
          
          // Agregar event listeners manualmente
          const listItems = listContainer.querySelectorAll('.ubits-list-item');
          listItems.forEach((itemEl, index) => {
            const item = menuItems[index];
            if (item && item.onClick) {
              itemEl.addEventListener('click', () => {
                item.onClick();
              });
            }
          });
          
          // Posicionar el menú
          const x = e.clientX;
          const y = e.clientY;
          contextMenuContainer!.style.left = `${x}px`;
          contextMenuContainer!.style.top = `${y}px`;
          contextMenuContainer!.style.display = 'block';
          
          // Ajustar posición si el menú se sale de la pantalla
          requestAnimationFrame(() => {
            const rect = contextMenuContainer!.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            if (rect.right > windowWidth) {
              contextMenuContainer!.style.left = `${windowWidth - rect.width - 10}px`;
            }
            if (rect.bottom > windowHeight) {
              contextMenuContainer!.style.top = `${windowHeight - rect.height - 10}px`;
            }
          });
          
          // Cerrar menú al hacer click fuera
          handleContextMenuOutsideClick = (e: MouseEvent) => {
            if (!contextMenuContainer!.contains(e.target as Node)) {
              closeContextMenu();
            }
          };
          
          setTimeout(() => {
            document.addEventListener('click', handleContextMenuOutsideClick!);
            document.addEventListener('contextmenu', handleContextMenuOutsideClick!);
          }, 0);
        }
      });
        });
      console.log('🖱️ [CONTEXT MENU] ✅ Listeners del menú contextual agregados correctamente');
    } else {
      console.log('🖱️ [CONTEXT MENU] Menú contextual deshabilitado (showContextMenu = false)');
    }
    console.log('🖱️ [CONTEXT MENU] ========== FIN CONFIGURACIÓN MENÚ CONTEXTUAL ==========');
    
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
    // IMPORTANTE: Excluir checkbox-2 (checkbox fijo) que ya tiene su propio handler optimizado
    const checkboxButtons = element.querySelectorAll('input[data-checkbox-button="true"]:not([data-column-id="checkbox-2"])');
    checkboxButtons.forEach(checkbox => {
      const input = checkbox as HTMLInputElement;
      const rowIdStr = input.getAttribute('data-row-id');
      const columnId = input.getAttribute('data-column-id');
      
      if (!rowIdStr || !columnId) return;
      
      // IMPORTANTE: Excluir checkbox-2 que ya tiene su propio handler optimizado
      if (columnId === 'checkbox-2') {
        return;
      }
      
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
    
    // IMPORTANTE: NO crear un segundo handler para header checkboxes
    // El handler principal ya está configurado arriba (líneas 2863-3262) con capture:true
    // y tiene toda la lógica optimizada que NO llama a render()
    // Este segundo handler estaba causando el "salto" visual porque llamaba a render()
    console.log(`☑️ [SELECT ALL] ⚠️ Handler alternativo DESHABILITADO - usando solo el handler optimizado`);
    
    // Verificar que no haya checkboxes del header sin handler y verificar listeners
    const headerCheckboxesWithoutHandler = element.querySelectorAll('input[data-column-checkbox-header]');
    console.log(`☑️ [SELECT ALL] 🔍 Verificando ${headerCheckboxesWithoutHandler.length} header checkboxes después de attachEventListeners...`);
    headerCheckboxesWithoutHandler.forEach((checkbox, index) => {
      const input = checkbox as HTMLInputElement;
      const columnId = input.getAttribute('data-column-checkbox-header');
      
      console.log(`☑️ [SELECT ALL] 🔍 Header checkbox ${index} verificado:`, {
        columnId: columnId,
        element: input,
        checked: input.checked,
        hasHeaderAttr: input.hasAttribute('data-column-checkbox-header'),
        allAttrs: Array.from(input.attributes).map(a => `${a.name}="${a.value}"`),
        parentElement: input.parentElement?.tagName,
        parentClasses: input.parentElement?.className,
        isConnected: input.isConnected,
        ownerDocument: input.ownerDocument === document
      });
        
      // Agregar listeners de prueba para verificar que el elemento puede recibir eventos
      const testClickHandler = () => {
        console.log(`☑️ [SELECT ALL] 🧪 TEST: Header checkbox ${index} recibió evento click de prueba`);
      };
      input.addEventListener('click', testClickHandler, { once: true, capture: true });
      
      const testChangeHandler = () => {
        console.log(`☑️ [SELECT ALL] 🧪 TEST: Header checkbox ${index} recibió evento change de prueba`);
      };
      input.addEventListener('change', testChangeHandler, { once: true, capture: true });
    });
    
    // Date editables - mostrar calendario UBITS al hacer click
    // Implementación igual a InputProvider que funciona correctamente en Storybook
    // Detectar si estamos en la web (no en Storybook)
    const isWeb = typeof window !== 'undefined' && window.location && !window.location.href.includes('storybook');
    
    
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
    
    // Event listeners del header del DataTable
    if (currentOptions.header) {
      const headerElement = element.querySelector('.ubits-data-table__header');
      if (headerElement) {
        // Botón primario
        if (currentOptions.header.primaryButton && currentOptions.header.showPrimaryButton !== false) {
          const primaryBtn = headerElement.querySelector('.ubits-data-table__header-primary-button');
          if (primaryBtn && currentOptions.header.primaryButton.onClick) {
            primaryBtn.addEventListener('click', currentOptions.header.primaryButton.onClick);
          }
        }
        
        // Botones secundarios
        if (currentOptions.header.secondaryButtons && currentOptions.header.showSecondaryButtons !== false) {
          const secondaryBtns = headerElement.querySelectorAll('.ubits-data-table__header-secondary-button');
          secondaryBtns.forEach((btn, index) => {
            const buttonConfig = currentOptions.header!.secondaryButtons![index];
            if (buttonConfig && buttonConfig.onClick) {
              btn.addEventListener('click', buttonConfig.onClick);
            }
          });
        }
        
        // Botón de búsqueda
        if (currentOptions.header.searchButton && currentOptions.header.showSearchButton !== false) {
          console.log('🔍 [DATA TABLE] Configurando SearchButton:', {
            isSearchActive,
            hasHeader: !!currentOptions.header,
            hasSearchButton: !!currentOptions.header.searchButton
          });
          
          const searchBtn = headerElement.querySelector('.ubits-data-table__header-search-button');
          const prevButton = searchBtn?.previousElementSibling;
          const computedStyle = searchBtn ? window.getComputedStyle(searchBtn) : null;
          const prevComputedStyle = prevButton ? window.getComputedStyle(prevButton) : null;
          
          // Calcular posiciones y gap real
          let gapInfo = null;
          if (searchBtn && prevButton) {
            const prevRect = prevButton.getBoundingClientRect();
            const searchRect = searchBtn.getBoundingClientRect();
            const actualGap = searchRect.left - prevRect.right;
            gapInfo = {
              prevButtonRight: prevRect.right,
              searchBtnLeft: searchRect.left,
              actualGap: actualGap,
              expectedGap: 8,
              difference: actualGap - 8,
              prevButtonWidth: prevRect.width,
              searchBtnWidth: searchRect.width,
              marginLeft: computedStyle?.marginLeft,
              marginRight: computedStyle?.marginRight
            };
          }
          
          console.log('🔍 [DATA TABLE] SearchButton encontrado:', {
            found: !!searchBtn,
            className: searchBtn?.className,
            tagName: searchBtn?.tagName,
            isActive: searchBtn?.classList.contains('ubits-search-button--active'),
            width: computedStyle?.width,
            prevButton: prevButton?.tagName,
            gapInfo
          });
          
          if (searchBtn) {
            // Si es un botón (no está activo), agregar listener para activarlo
            const searchButtonElement = searchBtn.querySelector('button') as HTMLButtonElement;
            const isButton = searchBtn.tagName === 'BUTTON';
            const hasButtonInside = !!searchButtonElement;
            
            console.log('🔍 [DATA TABLE] Estado del SearchButton:', {
              isButton,
              hasButtonInside,
              isSearchActive,
              shouldAddListener: (isButton || hasButtonInside) && !isSearchActive
            });
            
            if ((isButton || hasButtonInside) && !isSearchActive) {
              const buttonToUse = isButton ? (searchBtn as HTMLButtonElement) : searchButtonElement;
              
              console.log('🔍 [DATA TABLE] Agregando listener al botón de búsqueda');
              
              buttonToUse.addEventListener('click', (e) => {
                console.log('🔍 [DATA TABLE] Click en botón de búsqueda detectado!');
                e.stopPropagation();
                e.preventDefault();
                
                // Activar el SearchButton
                isSearchActive = true;
                console.log('🔍 [DATA TABLE] isSearchActive cambiado a:', isSearchActive);
                
                // Llamar onClick si existe
                if (currentOptions.header.searchButton.onClick) {
                  currentOptions.header.searchButton.onClick(e);
                }
                
                // Re-renderizar para mostrar el input
                console.log('🔍 [DATA TABLE] Re-renderizando tabla...');
                render();
                
                // Enfocar el input después de renderizar
                setTimeout(() => {
                  const newSearchBtn = element.querySelector('.ubits-data-table__header-search-button');
                  console.log('🔍 [DATA TABLE] Buscando input después de renderizar:', {
                    found: !!newSearchBtn,
                    tagName: newSearchBtn?.tagName
                  });
                  
                  if (newSearchBtn) {
                    const input = newSearchBtn.querySelector('.ubits-search-button__input') as HTMLInputElement;
                    if (input) {
                      console.log('🔍 [DATA TABLE] Enfocando input');
                      // Establecer el flag de focusing antes de hacer focus
                      // Esto se manejará en el listener de blur
                      input.focus();
                      // Pequeño delay adicional para asegurar que el focus se complete
                      setTimeout(() => {
                        input.setSelectionRange(0, input.value.length);
                      }, 10);
                    } else {
                      console.warn('🔍 [DATA TABLE] Input no encontrado después de renderizar');
                    }
                  }
                }, 150);
              });
            }
            
            // Input de búsqueda (cuando está desplegado/activo)
            const searchInput = searchBtn.querySelector('.ubits-search-button__input') as HTMLInputElement;
            if (searchInput) {
              // Establecer valor inicial
              searchInput.value = searchTerm;
              
              // Función para manejar la búsqueda
              const handleSearch = (value: string) => {
                searchTerm = value;
                
                // Llamar onChange si existe
                if (currentOptions.header.searchButton.onChange) {
                  currentOptions.header.searchButton.onChange(value);
                }
                
                // Re-renderizar la tabla con las filas filtradas
                render();
                
                // Re-enfocar el input después de renderizar (solo si hay contenido)
                if (value) {
                  setTimeout(() => {
                    const newSearchBtn = element.querySelector('.ubits-data-table__header-search-button');
                    if (newSearchBtn) {
                      const input = newSearchBtn.querySelector('.ubits-search-button__input') as HTMLInputElement;
                      if (input) {
                        input.focus();
                        input.setSelectionRange(input.value.length, input.value.length);
                      }
                    }
                  }, 50);
                }
                
                // Llamar onSearch si existe
                if (currentOptions.header.searchButton.onSearch) {
                  const filteredRows = filterRowsBySearch(currentOptions.rows, value, currentOptions.columns);
                  currentOptions.header.searchButton.onSearch(value, filteredRows);
                }
              };
              
              searchInput.addEventListener('input', (e) => {
                const value = (e.target as HTMLInputElement).value;
                handleSearch(value);
              });
              
              searchInput.addEventListener('change', (e) => {
                const value = (e.target as HTMLInputElement).value;
                handleSearch(value);
              });
              
              // Listener para cuando el input pierde el focus (desactivar si está vacío)
              let blurTimeout: ReturnType<typeof setTimeout> | null = null;
              let isFocusing = false; // Flag para prevenir blur inmediato después de focus
              let focusTime = 0; // Timestamp del último focus
              
              searchInput.addEventListener('focus', () => {
                isFocusing = true;
                focusTime = Date.now();
                console.log('🔍 [DATA TABLE] Input recibió focus');
                // Resetear el flag después de un breve delay
                setTimeout(() => {
                  isFocusing = false;
                }, 200);
              });
              
              searchInput.addEventListener('blur', (e) => {
                const blurTime = Date.now();
                const timeSinceFocus = blurTime - focusTime;
                
                console.log('🔍 [DATA TABLE] Input perdió focus:', {
                  isFocusing,
                  timeSinceFocus,
                  searchTerm,
                  activeElement: document.activeElement?.tagName
                });
                
                // Si acabamos de hacer focus (menos de 200ms), ignorar el blur
                if (isFocusing || timeSinceFocus < 200) {
                  console.log('🔍 [DATA TABLE] Ignorando blur inmediato después de focus');
                  return;
                }
                
                // Cancelar timeout anterior si existe
                if (blurTimeout) {
                  clearTimeout(blurTimeout);
                }
                
                // Pequeño delay para permitir que otros eventos se procesen (como el click en clear)
                blurTimeout = setTimeout(() => {
                  // Verificar si el input todavía existe y está vacío
                  const currentInput = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
                  const activeElement = document.activeElement;
                  const clearBtn = element.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
                  const searchButtonWrapper = element.querySelector('.ubits-data-table__header-search-button');
                  
                  // No cerrar si:
                  // 1. El input tiene contenido
                  // 2. El elemento activo es el botón de limpiar
                  // 3. El elemento activo está dentro del wrapper del SearchButton
                  const shouldClose = currentInput && 
                                    searchTerm === '' && 
                                    !currentInput.value &&
                                    activeElement !== clearBtn &&
                                    !searchButtonWrapper?.contains(activeElement as Node);
                  
                  console.log('🔍 [DATA TABLE] Evaluando cierre del SearchButton:', {
                    hasInput: !!currentInput,
                    searchTerm,
                    inputValue: currentInput?.value,
                    activeElement: activeElement?.tagName,
                    isClearBtn: activeElement === clearBtn,
                    isInsideWrapper: searchButtonWrapper?.contains(activeElement as Node),
                    shouldClose
                  });
                  
                  if (shouldClose) {
                    console.log('🔍 [DATA TABLE] Desactivando SearchButton por blur (vacío)');
                    isSearchActive = false;
                    render();
                  }
                  blurTimeout = null;
                }, 200);
              });
              
              // Prevenir que el blur se dispare cuando se hace click dentro del SearchButton
              const searchButtonWrapper = searchBtn.closest('.ubits-data-table__header-search-button');
              if (searchButtonWrapper) {
                searchButtonWrapper.addEventListener('mousedown', (e) => {
                  // Si el click es dentro del wrapper, prevenir el blur
                  const target = e.target as HTMLElement;
                  if (target.closest('.ubits-search-button__input-wrapper')) {
                    e.preventDefault();
                  }
                });
              }
              
              // Listener para el botón de limpiar
              const clearBtn = searchBtn.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
              if (clearBtn) {
                clearBtn.addEventListener('click', (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  searchTerm = '';
                  searchInput.value = '';
                  
                  // Si no hay término de búsqueda, desactivar el SearchButton
                  isSearchActive = false;
                  handleSearch('');
                });
              }
            }
          }
        }
        
        // Botón de filtros
        if (currentOptions.header.filterButton && currentOptions.header.showFilterButton !== false) {
          const filterBtn = headerElement.querySelector('.ubits-data-table__header-filter-button');
          if (filterBtn) {
            filterBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();
              
              // Generar filtros automáticamente si no están configurados
              let filters = currentOptions.header.filterButton.filters || [];
              
              // Si no hay filtros configurados, generarlos automáticamente basados en las columnas
              if (filters.length === 0) {
                filters = currentOptions.columns
                  .filter(col => {
                    // Excluir columnas especiales que no se pueden filtrar
                    const excludedTypes = ['drag-handle', 'expand', 'checkbox', 'radio', 'toggle', 'acciones'];
                    return col.visible !== false && 
                           col.type && 
                           !excludedTypes.includes(col.type);
                  })
                  .map(col => {
                    // Determinar el tipo de filtro basado en el tipo de columna
                    let filterType: 'text' | 'select' | 'date' | 'number' = 'text';
                    let options: Array<{ value: string; label: string }> | undefined = undefined;
                    
                    if (col.type === 'estado') {
                      filterType = 'select';
                      // Obtener valores únicos de estado de las filas
                      const uniqueValues = new Set<string>();
                      currentOptions.rows.forEach(row => {
                        const value = row.data[col.id];
                        if (value != null) {
                          uniqueValues.add(String(value));
                        }
                      });
                      options = Array.from(uniqueValues).map(val => ({ value: val, label: val }));
                    } else if (col.type === 'fecha') {
                      filterType = 'date';
                    } else if (col.type === 'progreso') {
                      filterType = 'number';
                    } else {
                      filterType = 'text';
                    }
                    
                    return {
                      id: col.id,
                      label: col.title,
                      columnId: col.id,
                      type: filterType,
                      options: options
                    };
                  });
              }
              
              if (filters.length === 0) {
                console.warn('🔍 [DATA TABLE] No hay columnas disponibles para filtrar');
                // Si no hay filtros disponibles, llamar onClick si existe como fallback
                if (currentOptions.header.filterButton.onClick) {
                  currentOptions.header.filterButton.onClick(e);
                }
                return;
              }
              
              // NO llamar onClick si hay filtros configurados, el drawer es la funcionalidad principal
              
              // Función para renderizar el contenido del drawer con los filtros
              const renderFiltersContent = (): string => {
                const filtersHTML = filters.map(filter => {
                  const currentValue = activeFilters[filter.id] || filter.value || '';
                  
                  let inputHTML = '';
                  const containerId = `filter-input-${filter.id}`;
                  
                  switch (filter.type) {
                    case 'text':
                    case 'number':
                    case 'date':
                      inputHTML = renderInput({
                        containerId: containerId,
                        label: filter.label,
                        type: filter.type,
                        value: currentValue,
                        placeholder: `Filtrar por ${filter.label.toLowerCase()}...`,
                        size: 'md'
                      });
                      break;
                    case 'select':
                      if (filter.options && filter.options.length > 0) {
                        inputHTML = renderInput({
                          containerId: containerId,
                          label: filter.label,
                          type: 'select',
                          selectOptions: filter.options,
                          value: currentValue,
                          placeholder: `Seleccionar ${filter.label.toLowerCase()}...`,
                          size: 'md'
                        });
                      }
                      break;
                  }
                  
                  return `
                    <div class="ubits-data-table__filter-item" data-filter-id="${filter.id}">
                      <div id="${containerId}">${inputHTML}</div>
                    </div>
                  `;
                }).join('');
                
                return `
                  <div class="ubits-data-table__filters-container">
                    ${filtersHTML}
                  </div>
                `;
              };
              
              // Crear o actualizar el drawer
              if (!drawerInstance) {
                try {
                  drawerInstance = createDrawer({
                    title: 'Filtros',
                    complementaryText: 'Aplica filtros para refinar los resultados',
                    width: 40,
                    bodyContent: renderFiltersContent,
                    footerButtons: {
                      secondary: {
                        label: 'Limpiar',
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          activeFilters = {};
                          if (currentOptions.header.filterButton.onClearFilters) {
                            currentOptions.header.filterButton.onClearFilters();
                          }
                          render();
                          if (drawerInstance) {
                            drawerInstance.close();
                          }
                        }
                      },
                      primary: {
                        label: 'Aplicar',
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          
                          // Recopilar valores de los filtros desde los inputs
                          const newFilters: Record<string, string> = {};
                          filters.forEach(filter => {
                            const filterItem = drawerInstance.element.querySelector(`[data-filter-id="${filter.id}"]`);
                            if (filterItem) {
                              const input = filterItem.querySelector('.ubits-input') as HTMLInputElement;
                              if (input && input.value && input.value.trim() !== '') {
                                newFilters[filter.id] = input.value.trim();
                              }
                            }
                          });
                          
                          // Actualizar filtros activos
                          activeFilters = newFilters;
                          
                          // Llamar callback si existe
                          if (currentOptions.header.filterButton.onApplyFilters) {
                            currentOptions.header.filterButton.onApplyFilters(activeFilters);
                          }
                          
                          // Re-renderizar la tabla con los filtros aplicados
                          render();
                          
                          // Cerrar el drawer
                          if (drawerInstance) {
                            drawerInstance.close();
                          }
                        }
                      }
                    },
                    onClose: () => {
                      // No hacer nada al cerrar, los filtros ya están aplicados
                    },
                    closeOnOverlayClick: true
                  });
                } catch (error) {
                  console.error('🔍 [DATA TABLE] Error al crear drawer:', error);
                  // Si hay error, llamar onClick si existe como fallback
                  if (currentOptions.header.filterButton.onClick) {
                    currentOptions.header.filterButton.onClick(e);
                  }
                  return;
                }
              } else {
                // Actualizar el contenido del drawer
                try {
                  drawerInstance.updateContent(renderFiltersContent);
                } catch (error) {
                  console.error('🔍 [DATA TABLE] Error al actualizar drawer:', error);
                  // Si hay error, recrear el drawer
                  drawerInstance = createDrawer({
                    title: 'Filtros',
                    complementaryText: 'Aplica filtros para refinar los resultados',
                    width: 40,
                    bodyContent: renderFiltersContent,
                    footerButtons: {
                      secondary: {
                        label: 'Limpiar',
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          activeFilters = {};
                          if (currentOptions.header.filterButton.onClearFilters) {
                            currentOptions.header.filterButton.onClearFilters();
                          }
                          render();
                          if (drawerInstance) {
                            drawerInstance.close();
                          }
                        }
                      },
                      primary: {
                        label: 'Aplicar',
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          
                          // Recopilar valores de los filtros desde los inputs
                          const newFilters: Record<string, string> = {};
                          filters.forEach(filter => {
                            const filterItem = drawerInstance.element.querySelector(`[data-filter-id="${filter.id}"]`);
                            if (filterItem) {
                              const input = filterItem.querySelector('.ubits-input') as HTMLInputElement;
                              if (input && input.value && input.value.trim() !== '') {
                                newFilters[filter.id] = input.value.trim();
                              }
                            }
                          });
                          
                          // Actualizar filtros activos
                          activeFilters = newFilters;
                          
                          // Llamar callback si existe
                          if (currentOptions.header.filterButton.onApplyFilters) {
                            currentOptions.header.filterButton.onApplyFilters(activeFilters);
                          }
                          
                          // Re-renderizar la tabla con los filtros aplicados
                          render();
                          
                          // Cerrar el drawer
                          if (drawerInstance) {
                            drawerInstance.close();
                          }
                        }
                      }
                    },
                    onClose: () => {
                      // No hacer nada al cerrar, los filtros ya están aplicados
                    },
                    closeOnOverlayClick: true
                  });
                }
              }
              
              // Abrir el drawer solo si existe
              if (drawerInstance) {
                drawerInstance.open();
                
                // Crear los inputs después de abrir el drawer usando createInput
                setTimeout(() => {
                  if (!drawerInstance) return; // Verificar que aún existe
                  
                  filters.forEach(filter => {
                    const containerId = `filter-input-${filter.id}`;
                    const inputContainer = drawerInstance.element.querySelector(`#${containerId}`) as HTMLElement;
                    if (inputContainer) {
                      // Limpiar el contenedor primero
                      inputContainer.innerHTML = '';
                      
                      // Crear el input usando createInput
                      const currentValue = activeFilters[filter.id] || filter.value || '';
                      let inputOptions: any = {
                        containerId: containerId,
                        label: filter.label,
                        value: currentValue,
                        placeholder: filter.type === 'select' 
                          ? `Seleccionar ${filter.label.toLowerCase()}...`
                          : `Filtrar por ${filter.label.toLowerCase()}...`,
                        size: 'md'
                      };
                      
                      if (filter.type === 'select' && filter.options) {
                        inputOptions.type = 'select';
                        // Convertir las opciones al formato que espera el componente Input
                        // Input espera { value: string, text: string }
                        // Filtros tienen { value: string, label: string }
                        inputOptions.selectOptions = filter.options.map(opt => ({
                          value: opt.value,
                          text: opt.label || opt.value
                        }));
                      } else {
                        inputOptions.type = filter.type;
                      }
                      
                      // Crear el input
                      createInput(inputOptions);
                    }
                  });
                }, 300);
              }
            });
          }
        }
        
        // Botón de seleccionar columnas
        if (currentOptions.header.columnSelectorButton && currentOptions.header.showColumnSelectorButton !== false) {
          const columnSelectorBtn = headerElement.querySelector('.ubits-data-table__header-column-selector-button');
          if (columnSelectorBtn) {
            // Crear dropdown para seleccionar columnas
            let dropdown: HTMLElement | null = null;
            let isOpen = false;
            
            const createDropdown = (): HTMLElement => {
              if (dropdown && dropdown.parentElement) {
                return dropdown;
              }
              
              dropdown = document.createElement('div');
              dropdown.className = 'ubits-data-table__column-selector-dropdown';
              dropdown.style.display = 'none';
              
              // Agregar al body para posicionamiento absoluto
              document.body.appendChild(dropdown);
              
              return dropdown;
            };
            
            const updateDropdownPosition = () => {
              if (!dropdown || !columnSelectorBtn) return;
              
              const rect = columnSelectorBtn.getBoundingClientRect();
              // Obtener el ancho real del dropdown, o usar un ancho mínimo si aún no se ha renderizado
              const dropdownWidth = dropdown.offsetWidth || 200;
              
              dropdown.style.position = 'fixed';
              dropdown.style.top = `${rect.bottom + 4}px`; // 4px de margen
              
              // Alinear el borde derecho del dropdown con el borde derecho del botón
              // left = rect.right - dropdownWidth (para que el borde derecho del dropdown coincida con el borde derecho del botón)
              const desiredLeft = rect.right - dropdownWidth;
              
              // Verificar si se sale por la izquierda de la pantalla
              if (desiredLeft < 0) {
                // Si se sale por la izquierda, ajustar para que el borde izquierdo esté en 0
                dropdown.style.left = '0px';
              } else {
                // Alinear borde derecho del dropdown con borde derecho del botón
                dropdown.style.left = `${desiredLeft}px`;
              }
              
              dropdown.style.right = 'auto';
            };
            
            let updatePosition: (() => void) | null = null;
            let handleOutsideClickRef: ((e: MouseEvent) => void) | null = null;
            
            const closeDropdown = () => {
              if (dropdown) {
                dropdown.style.display = 'none';
                isOpen = false;
                if (handleOutsideClickRef) {
                  document.removeEventListener('click', handleOutsideClickRef);
                  handleOutsideClickRef = null;
                }
                // Limpiar listeners de scroll/resize si existen
                if (updatePosition) {
                  window.removeEventListener('scroll', updatePosition, true);
                  window.removeEventListener('resize', updatePosition);
                  updatePosition = null;
                }
              }
            };
            
            columnSelectorBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              
              console.log('🔍 [COLUMN SELECTOR] ========== CLICK EN BOTÓN ==========');
              console.log('🔍 [COLUMN SELECTOR] Estado actual - isOpen:', isOpen);
              
              // Si ya está abierto, cerrarlo
              if (isOpen) {
                console.log('🔍 [COLUMN SELECTOR] Dropdown ya está abierto, cerrando...');
                closeDropdown();
                return;
              }
              
              // Crear dropdown si no existe
              const dropdownElement = createDropdown();
              console.log('🔍 [COLUMN SELECTOR] Dropdown creado/obtenido:', {
                exists: !!dropdownElement,
                hasChildren: dropdownElement.children.length,
                innerHTMLLength: dropdownElement.innerHTML.length
              });
              
              // SIEMPRE limpiar completamente el contenido del dropdown antes de recrearlo
              // Esto asegura que no queden elementos residuales de aperturas anteriores
              console.log('🔍 [COLUMN SELECTOR] Limpiando dropdown completamente...');
              console.log('🔍 [COLUMN SELECTOR] ANTES - children:', dropdownElement.children.length, 'innerHTML:', dropdownElement.innerHTML.length, 'chars');
              
              // Remover todos los hijos primero
              while (dropdownElement.firstChild) {
                dropdownElement.removeChild(dropdownElement.firstChild);
              }
              
              // Luego limpiar innerHTML para asegurar que no quede nada
              dropdownElement.innerHTML = '';
              
              // Verificar que esté completamente limpio
              const afterCleanChildren = dropdownElement.children.length;
              const afterCleanInnerHTML = dropdownElement.innerHTML.length;
              console.log('🔍 [COLUMN SELECTOR] DESPUÉS - children:', afterCleanChildren, 'innerHTML:', afterCleanInnerHTML, 'chars');
              
              if (afterCleanChildren > 0 || afterCleanInnerHTML > 0) {
                console.error('🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown no está completamente limpio!');
                // Forzar limpieza adicional
                dropdownElement.innerHTML = '';
                // Esperar un frame para que el DOM se actualice
                requestAnimationFrame(() => {
                  if (dropdownElement.children.length > 0 || dropdownElement.innerHTML.length > 0) {
                    console.error('🔍 [COLUMN SELECTOR] ❌ ERROR: Dropdown sigue sin estar limpio después de limpieza adicional!');
                  }
                });
              }
              
              // Crear contenedor para la lista con ID fijo (SIEMPRE nuevo)
              const listContainerId = 'ubits-data-table-column-selector-list';
              
              // Asegurarse de que no exista un contenedor con ese ID en el DOM
              const existingContainer = document.getElementById(listContainerId);
              if (existingContainer) {
                console.log('🔍 [COLUMN SELECTOR] ⚠️ Contenedor existente encontrado, removiendo...');
                existingContainer.remove();
              }
              
              const listContainer = document.createElement('div');
              listContainer.id = listContainerId;
              dropdownElement.appendChild(listContainer);
              console.log('🔍 [COLUMN SELECTOR] Contenedor de lista creado:', {
                id: listContainer.id,
                parentExists: !!listContainer.parentElement,
                hasChildren: listContainer.children.length,
                innerHTML: listContainer.innerHTML.length
              });
              
              if (listContainer) {
                console.log('🔍 [COLUMN SELECTOR] ========== PROCESANDO COLUMNAS PARA CREAR LISTA ==========');
                console.log('🔍 [COLUMN SELECTOR] Total columnas en currentOptions:', currentOptions.columns.length);
                
                // PRIMERO: Eliminar duplicados de currentOptions.columns ANTES de filtrar
                const uniqueCurrentColumns = removeDuplicateColumns(currentOptions.columns);
                if (uniqueCurrentColumns.length !== currentOptions.columns.length) {
                  console.log('🔍 [COLUMN SELECTOR] ⚠️ DUPLICADOS ELIMINADOS:', currentOptions.columns.length, '->', uniqueCurrentColumns.length);
                  currentOptions.columns = uniqueCurrentColumns;
                }
                
                // Filtrar columnas que se pueden ocultar
                const allSelectableColumns = uniqueCurrentColumns.filter(col => {
                  const excludedTypes = ['drag-handle', 'expand'];
                  const excludedIds = ['checkbox', 'checkbox-2'];
                  return !excludedTypes.includes(col.type || '') && 
                         !excludedIds.includes(col.id) &&
                         col.id !== 'checkbox';
                });
                
                // Eliminar duplicados por ID
                const seenIds = new Set<string>();
                const selectableColumns = allSelectableColumns.filter(col => {
                  if (seenIds.has(col.id)) {
                    console.log('🔍 [COLUMN SELECTOR] ⚠️ DUPLICADO:', col.id);
                    return false;
                  }
                  seenIds.add(col.id);
                  return true;
                });
                
                console.log('🔍 [COLUMN SELECTOR] Columnas seleccionables finales:', selectableColumns.length);
                console.log('🔍 [COLUMN SELECTOR] IDs:', selectableColumns.map(c => `${c.id}(${c.visible !== false ? 'visible' : 'oculta'})`).join(', '));
                
                // Contar columnas visibles para deshabilitar la última
                const visibleCount = selectableColumns.filter(col => col.visible !== false).length;
                console.log('🔍 [COLUMN SELECTOR] Columnas visibles:', visibleCount);
                
                // Crear items con checkboxes
                const listItems: ListItem[] = selectableColumns.map(col => {
                  const isVisible = col.visible !== false;
                  const isLastVisible = isVisible && visibleCount === 1;
                  
                  const checkboxHTML = renderCheckbox({
                    label: col.title,
                    checked: isVisible,
                    size: 'sm',
                    disabled: isLastVisible,
                    className: 'ubits-data-table__column-selector-checkbox'
                  });
                  
                  const checkboxWithData = checkboxHTML.replace(
                    '<input',
                    `<input data-column-selector-id="${col.id}"`
                  );
                  
                  return {
                    label: checkboxWithData,
                    value: col.id,
                    state: 'default' as const,
                    selected: false
                  };
                });
                
                // Verificar que listItems no tenga duplicados
                const seenItemValues = new Set<string>();
                const uniqueListItems = listItems.filter(item => {
                  if (seenItemValues.has(item.value)) {
                    console.log('🔍 [COLUMN SELECTOR] ⚠️ ITEM DUPLICADO:', item.value);
                    return false;
                  }
                  seenItemValues.add(item.value);
                  return true;
                });
                
                console.log('🔍 [COLUMN SELECTOR] Items únicos para lista:', uniqueListItems.length);
                console.log('🔍 [COLUMN SELECTOR] Valores:', uniqueListItems.map(item => item.value).join(', '));
                
                // Crear la lista usando createList
                try {
                  console.log('🔍 [COLUMN SELECTOR] Llamando createList...');
                  createList({
                    containerId: listContainerId,
                    items: uniqueListItems,
                    size: 'sm',
                    maxHeight: '400px',
                    className: 'ubits-data-table__column-selector-list'
                  });
                  console.log('🔍 [COLUMN SELECTOR] ✅ createList completado');
                  
                  // Verificar que la lista se creó correctamente
                  const createdList = document.getElementById(listContainerId);
                  if (createdList) {
                    const listElement = createdList.querySelector('.ubits-list');
                    const listItems = listElement?.querySelectorAll('.ubits-list-item') || [];
                    console.log('🔍 [COLUMN SELECTOR] Lista creada - items en DOM:', listItems.length);
                  } else {
                    console.error('🔍 [COLUMN SELECTOR] ❌ Lista no encontrada después de createList');
                  }
                } catch (error) {
                  console.error('🔍 [COLUMN SELECTOR] ❌ Error en createList:', error);
                  // Fallback: usar renderList
                  listContainer.innerHTML = renderList({
                    containerId: listContainerId,
                    items: uniqueListItems,
                    size: 'sm',
                    maxHeight: '400px',
                    className: 'ubits-data-table__column-selector-list'
                  });
                  console.log('🔍 [COLUMN SELECTOR] ✅ Fallback renderList usado');
                }
              } else {
                console.error('🔍 [COLUMN SELECTOR] ❌ listContainer no existe');
              }
              
              // Función helper para actualizar el contenido del dropdown
              const updateDropdownContent = () => {
                console.log('🔍 [COLUMN SELECTOR] ========== UPDATE DROPDOWN CONTENT ==========');
                console.log('🔍 [COLUMN SELECTOR] Dropdown existe:', !!dropdownElement);
                console.log('🔍 [COLUMN SELECTOR] Dropdown isOpen:', isOpen);
                
                const listContainerId = 'ubits-data-table-column-selector-list';
                let listContainer = dropdownElement.querySelector(`#${listContainerId}`) as HTMLElement;
                
                console.log('🔍 [COLUMN SELECTOR] Buscando contenedor:', {
                  found: !!listContainer,
                  hasChildren: listContainer ? listContainer.children.length : 0,
                  innerHTMLLength: listContainer ? listContainer.innerHTML.length : 0
                });
                
                // Si no existe el contenedor o el dropdown está cerrado, no hacer nada
                if (!listContainer || !isOpen) {
                  console.log('🔍 [COLUMN SELECTOR] ⚠️ Contenedor no encontrado o dropdown cerrado, recreando...');
                  // Limpiar completamente y recrear
                  dropdownElement.innerHTML = '';
                  listContainer = document.createElement('div');
                  listContainer.id = listContainerId;
                  dropdownElement.appendChild(listContainer);
                  console.log('🔍 [COLUMN SELECTOR] Contenedor recreado:', {
                    id: listContainer.id,
                    parentExists: !!listContainer.parentElement
                  });
                }
                
                // PRIMERO: Eliminar duplicados de currentOptions.columns ANTES de filtrar
                const uniqueCurrentColumns = removeDuplicateColumns(currentOptions.columns);
                if (uniqueCurrentColumns.length !== currentOptions.columns.length) {
                  console.log('🔍 [COLUMN SELECTOR UPDATE] ⚠️ DUPLICADOS:', currentOptions.columns.length, '->', uniqueCurrentColumns.length);
                  currentOptions.columns = uniqueCurrentColumns;
                }
                
                // Filtrar columnas que se pueden ocultar
                const allSelectableColumns = uniqueCurrentColumns.filter(col => {
                  const excludedTypes = ['drag-handle', 'expand'];
                  const excludedIds = ['checkbox', 'checkbox-2'];
                  return !excludedTypes.includes(col.type || '') && 
                         !excludedIds.includes(col.id) &&
                         col.id !== 'checkbox';
                });
                
                // Eliminar duplicados por ID
                const seenIds = new Set<string>();
                const selectableColumns = allSelectableColumns.filter(col => {
                  if (seenIds.has(col.id)) {
                    console.log('🔍 [COLUMN SELECTOR UPDATE] ⚠️ DUPLICADO:', col.id);
                    return false;
                  }
                  seenIds.add(col.id);
                  return true;
                });
                
                const visibleCount = selectableColumns.filter(col => col.visible !== false).length;
                console.log('🔍 [COLUMN SELECTOR UPDATE] Columnas:', selectableColumns.length, '| Visibles:', visibleCount);
                console.log('🔍 [COLUMN SELECTOR UPDATE] IDs:', selectableColumns.map(c => `${c.id}(${c.visible !== false ? 'V' : 'O'})`).join(', '));
                
                // Crear items con checkboxes
                const listItems: ListItem[] = selectableColumns.map(col => {
                  const isVisible = col.visible !== false;
                  const isLastVisible = isVisible && visibleCount === 1;
                  
                  const checkboxHTML = renderCheckbox({
                    label: col.title,
                    checked: isVisible,
                    size: 'sm',
                    disabled: isLastVisible,
                    className: 'ubits-data-table__column-selector-checkbox'
                  });
                  
                  const checkboxWithData = checkboxHTML.replace(
                    '<input',
                    `<input data-column-selector-id="${col.id}"`
                  );
                  
                  return {
                    label: checkboxWithData,
                    value: col.id,
                    state: 'default' as const,
                    selected: false
                  };
                });
                
                // Verificar que listItems no tenga duplicados
                const seenItemValues = new Set<string>();
                const uniqueListItems = listItems.filter(item => {
                  if (seenItemValues.has(item.value)) {
                    console.log('🔍 [COLUMN SELECTOR UPDATE] ⚠️ ITEM DUPLICADO:', item.value);
                    return false;
                  }
                  seenItemValues.add(item.value);
                  return true;
                });
                
                console.log('🔍 [COLUMN SELECTOR UPDATE] Items únicos:', uniqueListItems.length);
                console.log('🔍 [COLUMN SELECTOR UPDATE] Valores:', uniqueListItems.map(item => item.value).join(', '));
                
                // LIMPIAR COMPLETAMENTE antes de recrear
                console.log('🔍 [COLUMN SELECTOR UPDATE] Limpiando contenedor...');
                console.log('🔍 [COLUMN SELECTOR UPDATE] ANTES - children:', listContainer.children.length, 'innerHTML:', listContainer.innerHTML.length);
                listContainer.innerHTML = '';
                console.log('🔍 [COLUMN SELECTOR UPDATE] DESPUÉS - children:', listContainer.children.length, 'innerHTML:', listContainer.innerHTML.length);
                
                try {
                  console.log('🔍 [COLUMN SELECTOR UPDATE] Llamando createList...');
                  createList({
                    containerId: listContainerId,
                    items: uniqueListItems,
                    size: 'sm',
                    maxHeight: '400px',
                    className: 'ubits-data-table__column-selector-list'
                  });
                  console.log('🔍 [COLUMN SELECTOR UPDATE] ✅ createList completado');
                  
                  // Verificar que la lista se creó
                  const createdList = document.getElementById(listContainerId);
                  if (createdList) {
                    const listElement = createdList.querySelector('.ubits-list');
                    const items = listElement?.querySelectorAll('.ubits-list-item') || [];
                    console.log('🔍 [COLUMN SELECTOR UPDATE] Lista creada - items en DOM:', items.length);
                  } else {
                    console.error('🔍 [COLUMN SELECTOR UPDATE] ❌ Lista no encontrada');
                  }
                } catch (error) {
                  console.error('🔍 [COLUMN SELECTOR UPDATE] ❌ Error en createList:', error);
                  listContainer.innerHTML = renderList({
                    containerId: listContainerId,
                    items: uniqueListItems,
                    size: 'sm',
                    maxHeight: '400px',
                    className: 'ubits-data-table__column-selector-list'
                  });
                  console.log('🔍 [COLUMN SELECTOR UPDATE] ✅ Fallback renderList usado');
                }
                
                // Agregar listeners a los nuevos checkboxes
                setTimeout(() => {
                  attachCheckboxListeners();
                }, 50);
              };
              
              // Función helper para agregar listeners a los checkboxes
              const attachCheckboxListeners = () => {
                const checkboxes = dropdownElement.querySelectorAll('input[data-column-selector-id]');
                checkboxes.forEach((checkbox: Element) => {
                  const input = checkbox as HTMLInputElement;
                  const columnId = input.getAttribute('data-column-selector-id');
                  
                  // Remover listener anterior si existe (usando cloneNode)
                  const newInput = input.cloneNode(true) as HTMLInputElement;
                  input.parentNode?.replaceChild(newInput, input);
                  
                  newInput.addEventListener('change', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    
                    // Si el checkbox está deshabilitado, no procesar el cambio
                    if (newInput.disabled) {
                      console.log('🔍 [COLUMN SELECTOR] Checkbox deshabilitado, ignorando cambio');
                      return;
                    }
                    
                    const isChecked = newInput.checked;
                    
                    // Encontrar la columna y actualizar su visibilidad
                    const column = currentOptions.columns.find(col => col.id === columnId);
                    if (column) {
                      // Validar que no se puedan ocultar todas las columnas
                      // Contar cuántas columnas visibles quedarían después de este cambio
                      if (!isChecked) {
                        // Filtrar columnas seleccionables (excluyendo drag-handle, expand, checkbox)
                        const allSelectableColumns = currentOptions.columns.filter(col => {
                          const excludedTypes = ['drag-handle', 'expand'];
                          const excludedIds = ['checkbox', 'checkbox-2'];
                          return !excludedTypes.includes(col.type || '') && 
                                 !excludedIds.includes(col.id) &&
                                 col.id !== 'checkbox';
                        });
                        
                        // Eliminar duplicados por ID (mantener solo la primera ocurrencia)
                        const seenIds = new Set<string>();
                        const selectableColumns = allSelectableColumns.filter(col => {
                          if (seenIds.has(col.id)) {
                            return false; // Ya vimos esta columna
                          }
                          seenIds.add(col.id);
                          return true;
                        });
                        
                        // Contar cuántas quedarían visibles después de ocultar esta columna
                        const wouldBeVisible = selectableColumns.filter(col => {
                          if (col.id === columnId) {
                            return false; // Esta columna se ocultaría
                          }
                          return col.visible !== false;
                        });
                        
                        console.log('🔍 [COLUMN SELECTOR] Validación de ocultar columna:', {
                          columnId,
                          columnTitle: column.title,
                          selectableColumnsCount: selectableColumns.length,
                          wouldBeVisibleCount: wouldBeVisible.length,
                          selectableColumns: selectableColumns.map(c => ({ id: c.id, title: c.title, visible: c.visible })),
                          wouldBeVisible: wouldBeVisible.map(c => ({ id: c.id, title: c.title }))
                        });
                        console.log('🔍 [COLUMN SELECTOR] Detalles completos:', JSON.stringify({
                          columnId,
                          columnTitle: column.title,
                          selectableColumnsCount: selectableColumns.length,
                          wouldBeVisibleCount: wouldBeVisible.length,
                          selectableColumns: selectableColumns.map(c => ({ id: c.id, title: c.title, visible: c.visible })),
                          wouldBeVisible: wouldBeVisible.map(c => ({ id: c.id, title: c.title }))
                        }, null, 2));
                        
                        // Si no quedaría ninguna columna visible, prevenir la acción
                        if (wouldBeVisible.length === 0) {
                          // Revertir el checkbox
                          newInput.checked = true;
                          console.warn('⚠️ No se pueden ocultar todas las columnas. Debe quedar al menos una columna visible.');
                          return;
                        }
                      }
                      
                      console.log('🔍 [COLUMN SELECTOR] ========== ACTUALIZANDO VISIBILIDAD ==========');
                      console.log('🔍 [COLUMN SELECTOR] Columna encontrada:', {
                        id: column.id,
                        title: column.title,
                        visibleActual: column.visible,
                        visibleNuevo: isChecked
                      });
                      
                      // Verificar si hay otras columnas con el mismo ID antes de actualizar
                      const columnsWithSameId = currentOptions.columns.filter(col => col.id === columnId);
                      console.log('🔍 [COLUMN SELECTOR] Columnas con el mismo ID:', columnsWithSameId.length, columnsWithSameId.map(c => ({ id: c.id, title: c.title, visible: c.visible })));
                      
                      column.visible = isChecked;
                      
                      // Actualizar TODAS las columnas con el mismo ID
                      if (columnsWithSameId.length > 1) {
                        console.log('🔍 [COLUMN SELECTOR] ⚠️ ACTUALIZANDO COLUMNAS DUPLICADAS:', columnsWithSameId.length);
                        columnsWithSameId.forEach((col, index) => {
                          if (col.id === columnId) {
                            col.visible = isChecked;
                            console.log('🔍 [COLUMN SELECTOR] Columna duplicada actualizada:', index, col.id, col.title, col.visible);
                          }
                        });
                      }
                      
                      console.log('🔍 [COLUMN SELECTOR] Estado después de actualizar:', {
                        columnId,
                        visible: column.visible,
                        totalColumnsWithId: currentOptions.columns.filter(col => col.id === columnId).length
                      });
                      
                      // Actualizar el contenido del dropdown para reflejar el cambio
                      console.log('🔍 [COLUMN SELECTOR] Llamando updateDropdownContent...');
                      updateDropdownContent();
                      
                      // Re-renderizar la tabla
                      console.log('🔍 [COLUMN SELECTOR] Llamando render() para actualizar tabla...');
                      render();
                      console.log('🔍 [COLUMN SELECTOR] Render completado');
                    }
                  });
                });
              };
              
              // Agregar event listeners a los checkboxes después de crear la lista
              setTimeout(() => {
                attachCheckboxListeners();
              }, 100);
              
              // Mostrar dropdown primero para que tenga dimensiones
              dropdownElement.style.display = 'block';
              
              // Actualizar posición después de que el contenido se haya renderizado
              // Usar requestAnimationFrame para asegurar que el DOM esté actualizado
              requestAnimationFrame(() => {
                updateDropdownPosition();
                // Actualizar nuevamente después de un pequeño delay para asegurar dimensiones correctas
                setTimeout(() => {
                  updateDropdownPosition();
                }, 10);
              });
              
              isOpen = true;
              
              // Actualizar posición en scroll/resize
              updatePosition = () => {
                if (isOpen && dropdown) {
                  updateDropdownPosition();
                }
              };
              
              window.addEventListener('scroll', updatePosition, true);
              window.addEventListener('resize', updatePosition);
              
              // Cerrar al hacer clic fuera
              handleOutsideClickRef = (e: MouseEvent) => {
                if (dropdownElement && !dropdownElement.contains(e.target as Node) && 
                    !columnSelectorBtn.contains(e.target as Node)) {
                  if (updatePosition) {
                    window.removeEventListener('scroll', updatePosition, true);
                    window.removeEventListener('resize', updatePosition);
                  }
                  closeDropdown();
                }
              };
              
              setTimeout(() => {
                document.addEventListener('click', handleOutsideClickRef!);
              }, 0);
              
              // Llamar onClick si existe
              if (currentOptions.header.columnSelectorButton.onClick) {
                currentOptions.header.columnSelectorButton.onClick(e);
              }
            });
          }
        }
      }
    }
    
    // Agregar event listeners para los botones del empty state
    try {
      const emptyStateElement = element.querySelector('.ubits-data-table__empty-state');
      if (emptyStateElement && currentOptions.emptyState) {
        // Detectar qué tipo de empty state es
        const hasNoData = currentOptions.rows.length === 0;
        const hasSearchTerm = searchTerm && searchTerm.trim() !== '';
        const hasActiveFilters = Object.keys(activeFilters).length > 0;
        
        let emptyStateConfig;
        if (hasNoData && currentOptions.emptyState.noData) {
          emptyStateConfig = currentOptions.emptyState.noData;
        } else if (hasSearchTerm && currentOptions.emptyState.noSearchResults) {
          emptyStateConfig = currentOptions.emptyState.noSearchResults;
        } else if (hasActiveFilters && currentOptions.emptyState.noFilterResults) {
          emptyStateConfig = currentOptions.emptyState.noFilterResults;
        }
        
        if (emptyStateConfig) {
          // Botón primario
          if (emptyStateConfig.onAction) {
            const primaryButton = emptyStateElement.querySelector('[data-action="primary"]');
            if (primaryButton) {
              primaryButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                emptyStateConfig.onAction?.();
              });
            }
          }
          
          // Botón secundario
          if (emptyStateConfig.onSecondaryAction) {
            const secondaryButton = emptyStateElement.querySelector('[data-action="secondary"]');
            if (secondaryButton) {
              secondaryButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                emptyStateConfig.onSecondaryAction?.();
              });
            }
          }
        }
      }
    } catch (error) {
      console.error(`📎 [ATTACH] ❌ Error agregando listeners de empty state:`, error);
    }
    
    } catch (error) {
      // Error en attachEventListeners
      console.error(`📎 [ATTACH] ❌ Error en attachEventListeners:`, error);
    }
    console.log(`📎 [ATTACH] ========== FIN attachEventListeners ==========`);
  };

  // Llamar render inicial
  render();

  // Función de actualización
  const update = (newOptions: Partial<DataTableOptions>) => {
    const previousShowPagination = currentOptions.showPagination;
    currentOptions = { ...currentOptions, ...newOptions };
    
    // Si se actualizaron las columnas, eliminar duplicados
    if (newOptions.columns) {
      console.log('🔍 [UPDATE] Eliminando duplicados de columnas actualizadas...');
      currentOptions.columns = removeDuplicateColumns(newOptions.columns);
    } else if (currentOptions.columns) {
      // También verificar y limpiar duplicados en las columnas existentes
      const beforeCount = currentOptions.columns.length;
      currentOptions.columns = removeDuplicateColumns(currentOptions.columns);
      if (currentOptions.columns.length !== beforeCount) {
        console.log('🔍 [UPDATE] Duplicados encontrados y eliminados:', beforeCount, '->', currentOptions.columns.length);
      }
    }
    
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
    // Destruir instancia del SearchButton si existe
    if (searchButtonInstance) {
      try {
        searchButtonInstance.destroy();
      } catch (e) {
        // Ignorar errores al destruir
      }
      searchButtonInstance = null;
    }
    
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

