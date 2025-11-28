/**
 * ButtonProvider
 * Lógica de renderizado del componente Button
 * Genera HTML según las opciones proporcionadas
 */
import { renderList, createList } from '../../list/src/ListProvider';
import { renderSpinner } from '../../spinner/src/SpinnerProvider';
// Helper para renderizar iconos - intenta usar @ubits/icons pero fallback a FontAwesome directo
function renderIconHelper(iconName, iconStyle = 'regular') {
    // Intentar importar dinámicamente @ubits/icons (solo si está disponible)
    // Si falla, usar FontAwesome directo
    try {
        // En runtime, esto solo funcionará si el módulo está disponible
        // Por ahora, usamos directamente FontAwesome para Storybook
        const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
        const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
        return `<i class="${iconClass} ${name}"></i>`;
    }
    catch (e) {
        // Fallback: FontAwesome directo
        const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
        const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
        return `<i class="${iconClass} ${name}"></i>`;
    }
}
/**
 * Renderiza un botón UBITS como HTML string
 */
export function renderButton(options) {
    const { variant = 'primary', size = 'md', text = '', icon, iconStyle = 'regular', iconOnly = false, disabled = false, loading = false, loadingText, badge = false, active = false, fullWidth = false, block = false, iconPosition = 'left', className = '', attributes = {}, dropdown = false, showTooltip = false, tooltipText = '' } = options;
    // Construir clases CSS
    const classes = [
        'ubits-button',
        `ubits-button--${variant}`,
        `ubits-button--${size}`,
        active && 'ubits-button--active',
        iconOnly && 'ubits-button--icon-only',
        loading && 'ubits-button--loading',
        fullWidth && 'ubits-button--full-width',
        block && 'ubits-button--block',
        iconPosition === 'right' && 'ubits-button--icon-right',
        dropdown && 'ubits-button--dropdown',
        className
    ].filter(Boolean).join(' ');
    // Construir atributos HTML
    const attrs = [
        disabled && 'disabled',
        loading && 'data-loading="true"',
        loading && 'aria-busy="true"',
        ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
    ].filter(Boolean).join(' ');
    // Renderizar icono usando helper (compatible con Storybook)
    let iconHTML = '';
    if (icon) {
        iconHTML = renderIconHelper(icon, iconStyle);
    }
    // Si dropdown está activo y no hay icono personalizado, agregar chevron-down a la derecha
    let finalIconHTML = iconHTML;
    let finalIconPosition = iconPosition;
    if (dropdown && !icon && text) {
        // Agregar chevron-down automáticamente cuando dropdown está activo
        finalIconHTML = renderIconHelper('chevron-down', iconStyle);
        finalIconPosition = 'right';
    }
    else if (dropdown && icon && iconPosition === 'left' && text) {
        // Si hay icono izquierdo, agregar chevron-down a la derecha
        finalIconHTML = `${iconHTML}${renderIconHelper('chevron-down', iconStyle)}`;
        // Mantener ambos iconos
    }
    else if (dropdown && !text) {
        // Solo icono, agregar chevron-down al lado
        finalIconHTML = icon ? `${iconHTML}${renderIconHelper('chevron-down', iconStyle)}` : renderIconHelper('chevron-down', iconStyle);
    }
    // Spinner para loading - usar spinner de UBITS
    // Mapear tamaño del botón al tamaño del spinner
    const spinnerSizeMap = {
        xs: 'xs',
        sm: 'sm',
        md: 'sm',
        lg: 'md',
        xl: 'lg'
    };
    const spinnerSize = spinnerSizeMap[size] || 'sm';
    // Mapear variante del botón a variante del spinner
    const spinnerVariantMap = {
        primary: 'primary',
        secondary: 'secondary',
        tertiary: 'secondary',
        active: 'primary'
    };
    const spinnerVariant = spinnerVariantMap[variant] || 'primary';
    const spinnerHTML = loading
        ? renderSpinner({
            size: spinnerSize,
            variant: spinnerVariant,
            animated: true,
            className: 'ubits-button__spinner'
        })
        : '';
    // Contenido del botón
    let content = '';
    if (loading && loadingText) {
        // Loading con texto personalizado
        content = `${spinnerHTML}<span class="button-text">${loadingText}</span>`;
    }
    else if (loading && !text) {
        // Solo spinner (sin texto)
        content = spinnerHTML;
    }
    else if (loading && text) {
        // Loading manteniendo texto (texto visible con opacidad reducida, spinner visible)
        if (iconPosition === 'right') {
            content = `<span class="button-text">${text}</span>${spinnerHTML}`;
        }
        else {
            content = `${spinnerHTML}<span class="button-text">${text}</span>`;
        }
    }
    else if (iconOnly && icon) {
        // Solo icono
        content = iconHTML;
    }
    else if (finalIconHTML && text) {
        // Icono + texto (usando finalIconHTML que incluye chevron si dropdown)
        if (dropdown && icon && iconPosition === 'left') {
            // Icono izquierdo personalizado + texto + chevron derecho
            content = `${renderIconHelper(icon, iconStyle)}<span>${text}</span>${renderIconHelper('chevron-down', iconStyle)}`;
        }
        else if (finalIconPosition === 'right') {
            content = `<span>${text}</span>${finalIconHTML}`;
        }
        else {
            content = `${finalIconHTML}<span>${text}</span>`;
        }
    }
    else if (text) {
        // Solo texto (si dropdown, agregar chevron)
        content = dropdown ? `<span>${text}</span>${renderIconHelper('chevron-down', iconStyle)}` : `<span>${text}</span>`;
    }
    else if (finalIconHTML) {
        // Solo icono (fallback si no hay iconOnly)
        content = finalIconHTML;
    }
    // Badge
    const badgeHTML = badge ? '<span class="ubits-button__badge"></span>' : '';
    // Agregar atributo title para tooltip si está habilitado y es icon-only
    const titleAttr = (iconOnly && showTooltip && tooltipText)
        ? `title="${tooltipText}"`
        : '';
    // Renderizar HTML completo
    return `
    <button class="${classes}" ${attrs} ${titleAttr}>
      ${content}
      ${badgeHTML}
    </button>
  `.trim();
}
/**
 * Crea un elemento button programáticamente con soporte para dropdown
 */
export function createButton(options) {
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.style.display = 'inline-block';
    div.innerHTML = renderButton(options);
    const button = div.querySelector('button');
    if (!button) {
        throw new Error('Failed to create button element');
    }
    // Adjuntar event listeners si existe onClick
    if (options.onClick) {
        button.addEventListener('click', options.onClick);
    }
    // Manejar dropdown si está activo
    if (options.dropdown && options.dropdownOptions && options.dropdownOptions.length > 0) {
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'ubits-button-dropdown-container';
        dropdownContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      margin-top: 4px;
      display: none;
      min-width: 100%;
    `;
        div.appendChild(dropdownContainer);
        // Mapear tamaño del botón al tamaño del List
        const listSize = options.size === 'xs' ? 'xs' : options.size === 'sm' ? 'sm' : options.size === 'md' ? 'md' : 'lg';
        // Convertir dropdownOptions a ListItems
        const listItems = options.dropdownOptions.map(option => ({
            label: option.label,
            state: 'default',
            value: option.value || option.label,
            selected: false,
        }));
        let isOpen = false;
        const toggleDropdown = () => {
            if (isOpen) {
                dropdownContainer.style.display = 'none';
                isOpen = false;
                return;
            }
            // Crear o actualizar la lista
            const listId = `button-dropdown-${Math.random().toString(36).substr(2, 9)}`;
            dropdownContainer.id = listId;
            dropdownContainer.innerHTML = '';
            try {
                createList({
                    containerId: listId,
                    items: listItems,
                    size: listSize,
                    maxHeight: '200px',
                    onSelectionChange: (selectedItem, index) => {
                        if (selectedItem && options.dropdownOptions && options.dropdownOptions[index]) {
                            const option = options.dropdownOptions[index];
                            if (option.onClick) {
                                option.onClick(new MouseEvent('click'), { label: selectedItem.label, value: selectedItem.value });
                            }
                            dropdownContainer.style.display = 'none';
                            isOpen = false;
                        }
                    },
                });
            }
            catch (error) {
                // Fallback: usar renderList
                console.warn('Using renderList fallback for button dropdown:', error);
                const listHTML = renderList({
                    containerId: listId,
                    items: listItems,
                    size: listSize,
                    maxHeight: '200px',
                });
                dropdownContainer.innerHTML = listHTML;
                // Agregar event listeners manualmente
                const listItemsElements = dropdownContainer.querySelectorAll('.ubits-list-item');
                listItemsElements.forEach((itemEl, idx) => {
                    const item = listItems[idx];
                    if (item && item.state !== 'disabled' && options.dropdownOptions && options.dropdownOptions[idx]) {
                        itemEl.addEventListener('click', () => {
                            const option = options.dropdownOptions[idx];
                            if (option.onClick) {
                                option.onClick(new MouseEvent('click'), { label: item.label, value: item.value });
                            }
                            dropdownContainer.style.display = 'none';
                            isOpen = false;
                        });
                    }
                });
            }
            dropdownContainer.style.display = 'block';
            isOpen = true;
        };
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!options.disabled && !options.loading) {
                toggleDropdown();
            }
        });
        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!div.contains(e.target)) {
                dropdownContainer.style.display = 'none';
                isOpen = false;
            }
        });
    }
    // Retornar el botón directamente
    // El código que llama a createButton debe usar appendChild, que automáticamente
    // remueve el elemento de su padre anterior si tiene uno
    if (options.dropdown) {
        // Si tiene dropdown, retornar el botón (que está dentro del div wrapper con el dropdown)
        return button;
    }
    
    // Sin dropdown, retornar el botón directamente
    // El div wrapper temporal se puede descartar, el botón se puede usar independientemente
    return button;
}
//# sourceMappingURL=ButtonProvider.js.map