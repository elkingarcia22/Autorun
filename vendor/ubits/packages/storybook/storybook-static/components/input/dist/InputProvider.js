/**
 * InputProvider
 * Lógica de renderizado y gestión del componente Input
 * Incluye todos los tipos, estados, tamaños y funcionalidades especiales
 */
import { renderList, createList } from '../../list/src/ListProvider';
// Helper para renderizar iconos - compatible con FontAwesome
function renderIconHelper(iconName, iconStyle = 'regular') {
    const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
    const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
}
/**
 * Renderiza un input UBITS como HTML string
 */
export function renderInput(options) {
    const { containerId, label = '', placeholder = '', helperText = '', size = 'md', state = 'default', type = 'text', showLabel = true, showHelper = false, showCounter = false, maxLength = 50, mandatory = false, mandatoryType = 'obligatorio', leftIcon = '', rightIcon = '', value = '', className = '', attributes = {} } = options;
    let inputHTML = '';
    // Label
    if (showLabel && label) {
        const mandatoryText = mandatory ? ` <span class="ubits-input-mandatory">(${mandatoryType})</span>` : '';
        inputHTML += `<label class="ubits-input-label">${label}${mandatoryText}</label>`;
    }
    // Input wrapper con iconos
    const hasLeftIcon = leftIcon && leftIcon.trim() !== '';
    const hasRightIcon = rightIcon && rightIcon.trim() !== '';
    // Agregar 'far' automáticamente si no está presente
    const leftIconClass = hasLeftIcon && leftIcon.startsWith('fa-') ? `far ${leftIcon}` : (hasLeftIcon ? `far fa-${leftIcon}` : '');
    const rightIconClass = hasRightIcon && rightIcon.startsWith('fa-') ? `far ${rightIcon}` : (hasRightIcon ? `far fa-${rightIcon}` : '');
    inputHTML += `<div style="position: relative; display: inline-block; width: 100%;">`;
    // Variables temporales para iconos (pueden cambiar según el tipo)
    let finalRightIcon = rightIcon;
    let finalHasRightIcon = hasRightIcon;
    let finalLeftIcon = leftIcon;
    let finalHasLeftIcon = hasLeftIcon;
    // Input con padding dinámico
    const inputClasses = ['ubits-input', `ubits-input--${size}`];
    if (state !== 'default') {
        inputClasses.push(`ubits-input--${state}`);
    }
    if (className) {
        inputClasses.push(className);
    }
    const disabledAttr = state === 'disabled' ? ' disabled' : '';
    const maxLengthAttr = showCounter ? ` maxlength="${maxLength}"` : '';
    const paddingLeft = hasLeftIcon ? (size === 'xs' ? 'padding-left: 32px;' : size === 'sm' ? 'padding-left: 36px;' : size === 'md' ? 'padding-left: 40px;' : 'padding-left: 44px;') : '';
    const paddingRight = hasRightIcon ? (size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;') : '';
    // Renderizar input según el tipo
    if (type === 'select') {
        // SELECT - usar input normal pero readonly y con rightIcon de chevron
        const selectOptions = options.selectOptions || [];
        const selectValue = value ? selectOptions.find(opt => opt.value === value)?.text || placeholder : placeholder;
        inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="width: 100%; ${paddingLeft} ${paddingRight}" value="${selectValue}" readonly>`;
        // Forzar rightIcon a chevron-down si no hay rightIcon personalizado
        if (!hasRightIcon) {
            finalRightIcon = 'fa-chevron-down';
            finalHasRightIcon = true;
        }
    }
    else if (type === 'textarea') {
        // TEXTAREA - campo multilínea con redimensionamiento
        let textareaStyle = `width: 100%; min-height: 80px; resize: vertical; ${paddingLeft} ${paddingRight}`;
        if (state === 'disabled') {
            textareaStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        inputHTML += `<textarea class="${inputClasses.join(' ')}" style="${textareaStyle}" placeholder="${placeholder}"${disabledAttr}${maxLengthAttr}>${value}</textarea>`;
    }
    else if (type === 'search') {
        // SEARCH - input con icono de búsqueda y botón de limpiar
        let searchPaddingLeft = paddingLeft;
        let searchPaddingRight = paddingRight;
        // Forzar leftIcon a search si no hay leftIcon personalizado
        if (!hasLeftIcon) {
            finalLeftIcon = 'fa-search';
            finalHasLeftIcon = true;
            searchPaddingLeft = size === 'xs' ? 'padding-left: 32px;' : size === 'sm' ? 'padding-left: 36px;' : size === 'md' ? 'padding-left: 40px;' : 'padding-left: 44px;';
        }
        // Siempre agregar rightIcon de limpiar para search
        finalRightIcon = 'fa-times';
        finalHasRightIcon = true;
        searchPaddingRight = size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;';
        let searchStyle = `width: 100%; ${searchPaddingLeft} ${searchPaddingRight}`;
        if (state === 'disabled') {
            searchStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="${searchStyle}" placeholder="${placeholder}" value="${value}" autocomplete="off"${disabledAttr}${maxLengthAttr}>`;
    }
    else if (type === 'autocomplete') {
        // AUTOCOMPLETE - input con dropdown de sugerencias
        let autocompletePaddingLeft = paddingLeft;
        let autocompletePaddingRight = paddingRight;
        // Forzar leftIcon de búsqueda para autocomplete
        if (!hasLeftIcon) {
            finalLeftIcon = 'fa-search';
            finalHasLeftIcon = true;
            autocompletePaddingLeft = size === 'xs' ? 'padding-left: 32px;' : size === 'sm' ? 'padding-left: 36px;' : size === 'md' ? 'padding-left: 40px;' : 'padding-left: 44px;';
        }
        // Forzar rightIcon de limpiar para autocomplete
        finalRightIcon = 'fa-times';
        finalHasRightIcon = true;
        autocompletePaddingRight = size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;';
        let autocompleteStyle = `width: 100%; ${autocompletePaddingLeft} ${autocompletePaddingRight}`;
        if (state === 'disabled') {
            autocompleteStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="${autocompleteStyle}" placeholder="${placeholder}" value="${value}" autocomplete="off"${disabledAttr}${maxLengthAttr}>`;
    }
    else if (type === 'calendar') {
        // CALENDAR - input con date picker
        let calendarPaddingLeft = paddingLeft;
        let calendarPaddingRight = paddingRight;
        // Forzar rightIcon de calendario para calendar
        finalRightIcon = 'fa-calendar';
        finalHasRightIcon = true;
        calendarPaddingRight = size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;';
        let calendarStyle = `width: 100%; ${calendarPaddingLeft} ${calendarPaddingRight}`;
        if (state === 'disabled') {
            calendarStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="${calendarStyle}" placeholder="${placeholder}" value="${value}" readonly${disabledAttr}>`;
    }
    else if (type === 'password') {
        // PASSWORD - input con toggle de mostrar/ocultar
        let passwordPaddingLeft = paddingLeft;
        let passwordPaddingRight = paddingRight;
        // Forzar rightIcon de ojo para password
        finalRightIcon = 'fa-eye';
        finalHasRightIcon = true;
        passwordPaddingRight = size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;';
        let passwordStyle = `width: 100%; ${passwordPaddingLeft} ${passwordPaddingRight}`;
        if (state === 'disabled') {
            passwordStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        inputHTML += `<input type="password" class="${inputClasses.join(' ')}" style="${passwordStyle}" placeholder="${placeholder}" value="${value}"${disabledAttr}${maxLengthAttr}>`;
    }
    else {
        // INPUT normal (text, email, number, tel, url)
        inputHTML += `<input type="${type}" class="${inputClasses.join(' ')}" style="width: 100%; ${paddingLeft} ${paddingRight}" placeholder="${placeholder}" value="${value}"${disabledAttr}${maxLengthAttr}>`;
    }
    // Icono izquierdo con posicionamiento absoluto
    if (finalHasLeftIcon) {
        const leftIconClass = finalLeftIcon.startsWith('fa-') ? `far ${finalLeftIcon}` : `far fa-${finalLeftIcon}`;
        inputHTML += `<i class="${leftIconClass} ubits-input-icon-left" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
    }
    // Icono derecho con posicionamiento absoluto
    if (finalHasRightIcon) {
        const rightIconClass = finalRightIcon.startsWith('fa-') ? `far ${finalRightIcon}` : `far fa-${finalRightIcon}`;
        inputHTML += `<i class="${rightIconClass} ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
    }
    inputHTML += '</div>';
    // Helper text y character counter (independientes)
    if (showHelper || showCounter) {
        inputHTML += '<div class="ubits-input-helper">';
        if (showHelper && helperText) {
            inputHTML += `<span>${helperText}</span>`;
        }
        if (showCounter) {
            inputHTML += `<span class="ubits-input-counter">0/${maxLength}</span>`;
        }
        inputHTML += '</div>';
    }
    // Agregar atributos adicionales como data attributes
    const attrs = Object.entries(attributes)
        .map(([key, val]) => `${key}="${val}"`)
        .join(' ');
    if (attrs) {
        // Los atributos se aplicarán al contenedor externo
        return `<div ${attrs}>${inputHTML}</div>`;
    }
    return inputHTML;
}
/**
 * Crea un elemento input programáticamente
 */
export function createInput(options) {
    const { containerId, onChange, onFocus, onBlur, showCounter = false, maxLength = 50, type = 'text', selectOptions = [], autocompleteOptions = [], value = '' } = options;
    // Validar parámetros requeridos
    if (!containerId) {
        console.error('UBITS Input: containerId es requerido');
        return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`UBITS Input: No se encontró el contenedor con ID "${containerId}"`);
        return null;
    }
    // Renderizar HTML
    const inputHTML = renderInput(options);
    container.innerHTML = inputHTML;
    // Obtener elementos del DOM
    const wrapper = container.querySelector('div[style*="position: relative"]');
    const inputElement = container.querySelector('.ubits-input');
    const counterElement = container.querySelector('.ubits-input-counter');
    if (!inputElement || !wrapper) {
        console.error('UBITS Input: No se pudo crear el elemento input');
        return null;
    }
    // Asegurar que el contenedor tenga position: relative (para dropdowns)
    if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }
    // Funcionalidades especiales según el tipo
    if (type === 'select') {
        createSelectDropdown(container, inputElement, selectOptions, value, options.placeholder || '', onChange, options.size || 'md');
    }
    if (type === 'search') {
        createSearchClear(container, inputElement, onChange);
    }
    if (type === 'autocomplete') {
        createAutocompleteDropdown(container, inputElement, autocompleteOptions, onChange, options.size || 'md');
    }
    if (type === 'calendar') {
        createCalendarPicker(container, inputElement, onChange);
    }
    if (type === 'password') {
        createPasswordToggle(container, inputElement);
    }
    // Actualizar contador de caracteres
    if (showCounter && counterElement) {
        setupCharacterCounter(inputElement, counterElement, maxLength);
    }
    // Event listeners
    if (onChange && typeof onChange === 'function') {
        const eventType = type === 'select' ? 'change' : 'input';
        inputElement.addEventListener(eventType, (e) => {
            onChange(e.target.value, e);
        });
    }
    if (onFocus && typeof onFocus === 'function') {
        inputElement.addEventListener('focus', (e) => {
            onFocus(e.target.value, e);
        });
    }
    if (onBlur && typeof onBlur === 'function') {
        inputElement.addEventListener('blur', (e) => {
            onBlur(e.target.value, e);
        });
    }
    // Métodos
    return {
        element: wrapper,
        inputElement,
        getValue: () => inputElement.value,
        setValue: (newValue) => {
            inputElement.value = newValue;
            if (showCounter && counterElement) {
                updateCounter(counterElement, newValue.length, maxLength);
            }
        },
        focus: () => inputElement.focus(),
        blur: () => inputElement.blur(),
        disable: () => {
            inputElement.disabled = true;
            inputElement.classList.add('ubits-input--disabled');
        },
        enable: () => {
            inputElement.disabled = false;
            inputElement.classList.remove('ubits-input--disabled');
        },
        setState: (newState) => {
            const stateClasses = ['ubits-input--hover', 'ubits-input--focus', 'ubits-input--active', 'ubits-input--invalid', 'ubits-input--disabled'];
            stateClasses.forEach(cls => inputElement.classList.remove(cls));
            if (newState !== 'default') {
                inputElement.classList.add(`ubits-input--${newState}`);
            }
            if (newState === 'disabled') {
                inputElement.disabled = true;
            }
            else {
                inputElement.disabled = false;
            }
        }
    };
}
// Funciones auxiliares para funcionalidades especiales (se implementarán en el siguiente paso)
function createPasswordToggle(container, inputElement) {
    const toggleIcon = container.querySelector('i[class*="fa-eye"]');
    if (toggleIcon) {
        let isPasswordVisible = false;
        toggleIcon.style.pointerEvents = 'auto';
        toggleIcon.style.cursor = 'pointer';
        toggleIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isPasswordVisible = !isPasswordVisible;
            if (isPasswordVisible) {
                inputElement.type = 'text';
                toggleIcon.className = 'far fa-eye-slash ubits-input-icon-right';
            }
            else {
                inputElement.type = 'password';
                toggleIcon.className = 'far fa-eye ubits-input-icon-right';
            }
        });
    }
}
function createSearchClear(container, inputElement, onChange) {
    const clearIcon = container.querySelector('i[class*="fa-times"]');
    if (clearIcon) {
        clearIcon.style.display = inputElement.value.length > 0 ? 'block' : 'none';
        clearIcon.style.pointerEvents = 'auto';
        clearIcon.style.cursor = 'pointer';
        const toggleClearIcon = () => {
            clearIcon.style.display = inputElement.value.length > 0 ? 'block' : 'none';
        };
        inputElement.addEventListener('input', toggleClearIcon);
        clearIcon.addEventListener('click', (e) => {
            e.preventDefault();
            inputElement.value = '';
            inputElement.focus();
            toggleClearIcon();
            if (onChange)
                onChange('');
        });
    }
}
function createAutocompleteDropdown(container, inputElement, autocompleteOptions, onChange, inputSize = 'md') {
    // Obtener el tamaño del List basado en el tamaño del Input
    const listSize = inputSize === 'xs' ? 'xs' : inputSize === 'sm' ? 'sm' : inputSize === 'md' ? 'md' : 'lg';
    // Similar a search clear
    const clearIcon = container.querySelector('i[class*="fa-times"]');
    if (clearIcon) {
        clearIcon.style.display = inputElement.value.length > 0 ? 'block' : 'none';
        clearIcon.style.pointerEvents = 'auto';
        clearIcon.style.cursor = 'pointer';
        const toggleClearIcon = () => {
            clearIcon.style.display = inputElement.value.length > 0 ? 'block' : 'none';
        };
        inputElement.addEventListener('input', toggleClearIcon);
        clearIcon.addEventListener('click', (e) => {
            e.preventDefault();
            inputElement.value = '';
            inputElement.focus();
            toggleClearIcon();
            const listContainer = container.querySelector('.ubits-autocomplete-list-container');
            if (listContainer)
                listContainer.style.display = 'none';
            if (onChange)
                onChange('');
        });
    }
    // Crear contenedor para el List
    const listContainer = document.createElement('div');
    listContainer.className = 'ubits-autocomplete-list-container';
    listContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `;
    container.appendChild(listContainer);
    const updateAutocompleteList = (showAll = false) => {
        const searchText = inputElement.value.toLowerCase();
        let filtered;
        if (showAll || searchText.length < 1) {
            // Mostrar todas las opciones cuando se activa el input o no hay texto
            filtered = autocompleteOptions.slice(0, 8);
        }
        else {
            // Filtrar según el texto ingresado
            filtered = autocompleteOptions
                .filter(opt => opt.text.toLowerCase().includes(searchText))
                .slice(0, 8);
        }
        if (filtered.length === 0) {
            listContainer.style.display = 'none';
            return;
        }
        // Convertir opciones a items de List
        const listItems = filtered.map(option => ({
            label: option.text,
            state: 'default',
            value: option.value,
            selected: false,
        }));
        // Crear la lista
        const listId = `ubits-autocomplete-list-${container.id}`;
        listContainer.id = listId;
        listContainer.innerHTML = '';
        try {
            createList({
                containerId: listId,
                items: listItems,
                size: listSize,
                maxHeight: '200px',
                onSelectionChange: (selectedItem, index) => {
                    if (selectedItem && selectedItem.value) {
                        inputElement.value = selectedItem.label;
                        listContainer.style.display = 'none';
                        if (clearIcon)
                            clearIcon.style.display = 'block';
                        if (onChange)
                            onChange(selectedItem.value);
                    }
                },
            });
            // Resaltar texto buscado en los items si hay texto
            if (searchText.length > 0) {
                const listItemsElements = listContainer.querySelectorAll('.ubits-list-item');
                listItemsElements.forEach((itemEl) => {
                    const text = itemEl.textContent || '';
                    if (text.toLowerCase().includes(searchText)) {
                        const regex = new RegExp(`(${searchText})`, 'gi');
                        const highlighted = text.replace(regex, '<strong>$1</strong>');
                        itemEl.innerHTML = highlighted;
                    }
                });
            }
        }
        catch (error) {
            // Fallback: usar renderList si createList falla
            console.warn('Using renderList fallback for autocomplete:', error);
            const listHTML = renderList({
                containerId: listId,
                items: listItems,
                size: listSize,
                maxHeight: '200px',
            });
            listContainer.innerHTML = listHTML;
            // Resaltar texto buscado
            if (searchText.length > 0) {
                const listItemsElements = listContainer.querySelectorAll('.ubits-list-item');
                listItemsElements.forEach((itemEl) => {
                    const text = itemEl.textContent || '';
                    if (text.toLowerCase().includes(searchText)) {
                        const regex = new RegExp(`(${searchText})`, 'gi');
                        const highlighted = text.replace(regex, '<strong>$1</strong>');
                        itemEl.innerHTML = highlighted;
                    }
                });
            }
            // Agregar event listeners manualmente
            const listItemsElements = listContainer.querySelectorAll('.ubits-list-item');
            listItemsElements.forEach((itemEl, idx) => {
                const item = listItems[idx];
                if (item && item.state !== 'disabled') {
                    itemEl.addEventListener('click', () => {
                        inputElement.value = item.label;
                        listContainer.style.display = 'none';
                        if (clearIcon)
                            clearIcon.style.display = 'block';
                        if (onChange)
                            onChange(item.value || '');
                    });
                }
            });
        }
        listContainer.style.display = 'block';
    };
    // Mostrar dropdown al activar el input (focus)
    inputElement.addEventListener('focus', () => {
        updateAutocompleteList(true);
    });
    // Actualizar dropdown mientras se escribe
    inputElement.addEventListener('input', () => {
        updateAutocompleteList(false);
    });
    inputElement.addEventListener('blur', () => {
        setTimeout(() => listContainer.style.display = 'none', 150);
    });
}
function createSelectDropdown(container, inputElement, selectOptions, value, placeholder, onChange, inputSize = 'md') {
    inputElement.style.cursor = 'pointer';
    // Obtener el tamaño del List basado en el tamaño del Input
    const listSize = inputSize === 'xs' ? 'xs' : inputSize === 'sm' ? 'sm' : inputSize === 'md' ? 'md' : 'lg';
    // Crear contenedor para el List
    const listContainer = document.createElement('div');
    listContainer.className = 'ubits-select-list-container';
    listContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `;
    container.appendChild(listContainer);
    const itemsPerPage = 50; // Más items por página ya que List tiene scroll
    let currentPage = 0;
    let allLoadedItems = [];
    let isLoading = false;
    const loadOptions = (page = 0) => {
        if (isLoading)
            return;
        isLoading = true;
        setTimeout(() => {
            const startIndex = page * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, selectOptions.length);
            const pageOptions = selectOptions.slice(startIndex, endIndex);
            // Convertir opciones a items de List
            const newItems = pageOptions.map(option => ({
                label: option.text,
                state: value === option.value ? 'active' : 'default',
                value: option.value,
                selected: value === option.value,
            }));
            // Si es la primera página, reemplazar todos los items
            if (page === 0) {
                allLoadedItems = newItems;
            }
            else {
                // Agregar items nuevos
                allLoadedItems = [...allLoadedItems, ...newItems];
            }
            // Crear o actualizar la lista
            const listId = `ubits-select-list-${container.id}`;
            listContainer.id = listId;
            listContainer.innerHTML = '';
            try {
                createList({
                    containerId: listId,
                    items: allLoadedItems,
                    size: listSize,
                    maxHeight: '200px',
                    onSelectionChange: (selectedItem, index) => {
                        if (selectedItem && selectedItem.value) {
                            inputElement.value = selectedItem.label;
                            listContainer.style.display = 'none';
                            if (onChange)
                                onChange(selectedItem.value);
                        }
                    },
                });
            }
            catch (error) {
                // Fallback: usar renderList si createList falla
                console.warn('Using renderList fallback for select:', error);
                const listHTML = renderList({
                    containerId: listId,
                    items: allLoadedItems,
                    size: listSize,
                    maxHeight: '200px',
                });
                listContainer.innerHTML = listHTML;
                // Agregar event listeners manualmente
                const listItems = listContainer.querySelectorAll('.ubits-list-item');
                listItems.forEach((itemEl, idx) => {
                    const item = allLoadedItems[idx];
                    if (item && item.state !== 'disabled') {
                        itemEl.addEventListener('click', () => {
                            inputElement.value = item.label;
                            listContainer.style.display = 'none';
                            if (onChange)
                                onChange(item.value || '');
                        });
                    }
                });
            }
            // Scroll infinito: cargar más items cuando se acerque al final
            if (endIndex < selectOptions.length) {
                const listElement = listContainer.querySelector('.ubits-list');
                if (listElement) {
                    const observer = new IntersectionObserver((entries) => {
                        if (entries[0].isIntersecting && !isLoading && endIndex < selectOptions.length) {
                            currentPage++;
                            loadOptions(currentPage);
                        }
                    }, { root: listElement, rootMargin: '50px' });
                    // Observar el último item
                    const lastItem = listContainer.querySelector('.ubits-list-item:last-child');
                    if (lastItem) {
                        observer.observe(lastItem);
                    }
                }
            }
            isLoading = false;
        }, 150);
    };
    inputElement.addEventListener('click', () => {
        const isVisible = listContainer.style.display === 'block';
        if (!isVisible) {
            currentPage = 0;
            allLoadedItems = [];
            loadOptions(0);
            listContainer.style.display = 'block';
        }
        else {
            listContainer.style.display = 'none';
        }
    });
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            listContainer.style.display = 'none';
        }
    });
}
function createCalendarPicker(container, inputElement, onChange) {
    // Importar dinámicamente el CalendarProvider
    let calendarInstance = null;
    let calendarContainer = null;
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const parseDate = (dateStr) => {
        if (!dateStr)
            return null;
        const [day, month, year] = dateStr.split('/');
        if (!day || !month || !year)
            return null;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };
    const showCalendar = async () => {
        // Si el calendario ya está visible, ocultarlo
        if (calendarContainer && calendarContainer.style.display !== 'none') {
            calendarContainer.style.display = 'none';
            return;
        }
        // Crear contenedor para el calendario si no existe
        if (!calendarContainer) {
            calendarContainer = document.createElement('div');
            calendarContainer.className = 'ubits-calendar-picker-container';
            calendarContainer.style.cssText = 'position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px; display: none;';
            container.style.position = 'relative';
            container.appendChild(calendarContainer);
        }
        // Si el calendario ya existe, solo mostrarlo
        if (calendarInstance) {
            calendarContainer.style.display = 'block';
            return;
        }
        // Cargar el módulo de calendar dinámicamente
        try {
            const calendarModule = await import('@ubits/calendar');
            const { createCalendar } = calendarModule;
            // Obtener fecha inicial del input si existe
            const currentValue = inputElement.value;
            const initialDate = parseDate(currentValue) || new Date();
            // Crear instancia del calendario UBITS
            calendarInstance = createCalendar({
                mode: 'single',
                selectedDate: parseDate(currentValue),
                initialDate: initialDate,
                onDateSelect: (date) => {
                    const formattedDate = formatDate(date);
                    inputElement.value = formattedDate;
                    if (calendarContainer) {
                        calendarContainer.style.display = 'none';
                    }
                    if (onChange) {
                        onChange(formattedDate);
                    }
                }
            });
            // Agregar el calendario al contenedor
            calendarContainer.appendChild(calendarInstance.element);
            calendarContainer.style.display = 'block';
        }
        catch (error) {
            console.error('Error cargando Calendar UBITS:', error);
            // Fallback: mostrar mensaje de error
            if (calendarContainer) {
                calendarContainer.innerHTML = '<div style="padding: 16px; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 8px; color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>';
                calendarContainer.style.display = 'block';
            }
        }
    };
    // Event listener para mostrar/ocultar el calendario
    inputElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showCalendar();
    });
    // Cerrar calendario al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (calendarContainer && !container.contains(e.target)) {
            calendarContainer.style.display = 'none';
        }
    });
    // Cerrar calendario al presionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && calendarContainer) {
            calendarContainer.style.display = 'none';
        }
    });
}
function setupCharacterCounter(inputElement, counterElement, maxLength) {
    const handleInput = () => {
        updateCounter(counterElement, inputElement.value.length, maxLength);
        // Prevenir escribir más del límite
        if (inputElement.value.length > maxLength) {
            inputElement.value = inputElement.value.substring(0, maxLength);
            updateCounter(counterElement, maxLength, maxLength);
        }
    };
    inputElement.addEventListener('input', handleInput);
    updateCounter(counterElement, inputElement.value.length, maxLength);
}
function updateCounter(counterElement, currentLength, maxLength) {
    counterElement.textContent = `${currentLength}/${maxLength}`;
    if (currentLength >= maxLength) {
        counterElement.classList.add('ubits-input-counter--limit');
    }
    else {
        counterElement.classList.remove('ubits-input-counter--limit');
    }
}
