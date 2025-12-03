/**
 * Calendar Provider
 * Componente Calendar UBITS con selección única y por rango de fechas
 * Implementación simplificada desde cero
 */

import type { CalendarOptions, CalendarMode } from './types/CalendarOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { renderInput } from '../../input/src/InputProvider';
import { renderList } from '../../list/src/ListProvider';
import type { ListItem } from '../../list/src/types/ListOptions';

/**
 * Nombres de meses en español
 */
const MONTH_NAMES = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
];

/**
 * Nombres de días de la semana en español
 */
const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

/**
 * Formatea una fecha como DD/MM/YYYY
 */
function formatDate(date: Date): string {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

/**
 * Compara dos fechas ignorando la hora
 */
function compareDates(date1: Date, date2: Date): number {
	const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
	return d1.getTime() - d2.getTime();
}

/**
 * Verifica si dos fechas son el mismo día
 */
function isSameDay(date1: Date, date2: Date): boolean {
	return compareDates(date1, date2) === 0;
}

/**
 * Verifica si una fecha está en un rango
 */
function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
	const dateTime = compareDates(date, startDate);
	const endTime = compareDates(endDate, date);
	return dateTime >= 0 && endTime >= 0;
}

/**
 * Crea un dropdown de lista UBITS con scrollbar integrado
 * Intenta usar createScrollbarLocal si está disponible (para contexto UMD),
 * si no, usa createScrollbar de ScrollProvider mediante importación dinámica
 */
function createListDropdown(
	items: Array<{ label: string; value: number; selected: boolean }>,
	onSelect: (value: number) => void,
): HTMLElement {
	const container = document.createElement('div');
	container.style.cssText = 'position: relative; width: 100%;';

	const listContainerId = `calendar-list-container-${Date.now()}`;
	const listId = `calendar-list-${Date.now()}`;
	const scrollbarContainerId = `calendar-scrollbar-${Date.now()}`;

	// Crear items de lista para renderList
	const listItems: ListItem[] = items.map((item) => ({
		label: item.label,
		value: String(item.value),
		selected: item.selected,
		state: item.selected ? 'active' : 'default',
		attributes: {
			'data-value': String(item.value),
			style: 'cursor: pointer;',
		},
	}));

	// Crear HTML de la lista UBITS con scrollbar usando renderList
	// IMPORTANTE: Ocultar completamente el scrollbar nativo para evitar doble scrollbar
	const listHTMLContent = renderList({
		items: listItems,
		size: 'sm',
		maxHeight: '200px',
		className: '',
		attributes: {
			id: listId,
			style:
				'overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 0; background: var(--modifiers-normal-color-light-bg-1); border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);',
		},
	});

	let listHTML = `
    <div id="${listContainerId}" style="position: relative; width: 100%; max-height: 200px; overflow: hidden;">
      ${listHTMLContent}
      <div id="${scrollbarContainerId}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; max-height: 200px; overflow: hidden; pointer-events: auto; z-index: 10;"></div>
    </div>
    <style>
      /* Ocultar scrollbar nativo completamente - solo mostrar UBITS scrollbar */
      #${listId}::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
      #${listId}::-webkit-scrollbar-track {
        display: none !important;
        background: transparent !important;
      }
      #${listId}::-webkit-scrollbar-thumb {
        display: none !important;
        background: transparent !important;
      }
      /* Firefox */
      #${listId} {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
    </style>
  `;

	container.innerHTML = listHTML;

	// NO intentar cargar CSS - asumir que ya está cargado (en Storybook se carga vía preview.ts)
	// Esto evita errores 404 y loops

	// Inicializar scrollbar de forma simple y directa
	const initScrollbar = async () => {
		console.log('📜 [SCROLLBAR] ========== INICIO initScrollbar ==========');
		console.log('📜 [SCROLLBAR] listId:', listId);
		console.log('📜 [SCROLLBAR] scrollbarContainerId:', scrollbarContainerId);

		const listElement = document.getElementById(listId) as HTMLElement;
		const scrollbarContainer = document.getElementById(scrollbarContainerId) as HTMLElement;

		if (!listElement || !scrollbarContainer) {
			console.log('📜 [SCROLLBAR] ❌ Elementos no encontrados:', {
				listElement: !!listElement,
				scrollbarContainer: !!scrollbarContainer,
			});
			return;
		}

		console.log('📜 [SCROLLBAR] Elementos encontrados:', {
			listElement: {
				scrollHeight: listElement.scrollHeight,
				clientHeight: listElement.clientHeight,
				offsetHeight: listElement.offsetHeight,
				maxHeight: listElement.style.maxHeight,
				computedMaxHeight: window.getComputedStyle(listElement).maxHeight,
			},
			scrollbarContainer: {
				offsetHeight: scrollbarContainer.offsetHeight,
				offsetWidth: scrollbarContainer.offsetWidth,
				styleHeight: scrollbarContainer.style.height,
				styleMaxHeight: scrollbarContainer.style.maxHeight,
				computedHeight: window.getComputedStyle(scrollbarContainer).height,
				computedMaxHeight: window.getComputedStyle(scrollbarContainer).maxHeight,
			},
		});

		// Verificar si necesita scroll
		if (listElement.scrollHeight <= listElement.clientHeight) {
			console.log('📜 [SCROLLBAR] ⚠️ No necesita scroll:', {
				scrollHeight: listElement.scrollHeight,
				clientHeight: listElement.clientHeight,
			});
			return;
		}

		console.log('📜 [SCROLLBAR] ✅ Necesita scroll, inicializando...');

		try {
			// Intentar primero con createScrollbarLocal si está disponible (contexto UMD)
			const createScrollbarLocal = (window as any).createScrollbarLocal;
			if (typeof createScrollbarLocal === 'function') {
				console.log('📜 [SCROLLBAR] Usando createScrollbarLocal');
				const scrollbarInstance = createScrollbarLocal(listElement, scrollbarContainer, 'vertical');
				if (scrollbarInstance) {
					(container as any)._scrollbarInstance = scrollbarInstance;
					console.log('📜 [SCROLLBAR] ✅ Scrollbar creado con createScrollbarLocal');
					return;
				}
			}

			// Fallback: Importar ScrollProvider dinámicamente
			console.log('📜 [SCROLLBAR] Importando ScrollProvider...');
			const { createScrollbar } = await import('../../scroll/src/ScrollProvider');
			const scrollbarInstance = createScrollbar({
				orientation: 'vertical',
				targetId: listId,
				containerId: scrollbarContainerId,
			});

			if (scrollbarInstance) {
				(container as any)._scrollbarInstance = scrollbarInstance;
				console.log('📜 [SCROLLBAR] ✅ Scrollbar creado con ScrollProvider');
			} else {
				console.log('📜 [SCROLLBAR] ⚠️ Scrollbar no se creó');
			}
		} catch (error) {
			console.error('📜 [SCROLLBAR] ❌ Error inicializando scrollbar:', error);
		}

		console.log('📜 [SCROLLBAR] ========== FIN initScrollbar ==========');
	};

	// Inicializar scrollbar cuando el contenedor esté en el DOM
	const setupScrollbar = () => {
		console.log('📜 [SCROLLBAR] setupScrollbar llamado, isConnected:', container.isConnected);
		if (container.isConnected) {
			// Esperar un frame para que el DOM esté listo
			requestAnimationFrame(() => {
				console.log('📜 [SCROLLBAR] requestAnimationFrame ejecutado, llamando initScrollbar');
				initScrollbar();
			});
		}
	};

	// Si ya está en el DOM, inicializar inmediatamente
	if (container.parentElement) {
		console.log('📜 [SCROLLBAR] Contenedor ya en DOM, inicializando inmediatamente');
		setupScrollbar();
	} else {
		console.log('📜 [SCROLLBAR] Contenedor no en DOM, configurando observer');
		// Si no está en el DOM, esperar a que se agregue
		const observer = new MutationObserver(() => {
			if (container.isConnected) {
				console.log('📜 [SCROLLBAR] Contenedor conectado al DOM, inicializando');
				observer.disconnect();
				setupScrollbar();
			}
		});
		observer.observe(document.body, { childList: true, subtree: true });

		// Timeout de seguridad
		setTimeout(() => {
			if (container.isConnected) {
				console.log('📜 [SCROLLBAR] Timeout alcanzado, inicializando');
				observer.disconnect();
				setupScrollbar();
			}
		}, 1000);
	}

	// Event listeners para items
	setTimeout(() => {
		const listElement = document.getElementById(listId) as HTMLElement;
		if (listElement) {
			listElement.querySelectorAll('.ubits-list-item').forEach((item) => {
				item.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();
					const value = parseInt((e.currentTarget as HTMLElement).dataset.value || '0');
					const scrollbarInstance = (container as any)._scrollbarInstance;
					if (scrollbarInstance && scrollbarInstance.destroy) {
						scrollbarInstance.destroy();
					}
					onSelect(value);
				});
			});
		}
	}, 100);

	return container;
}

/**
 * Renderiza el HTML del calendario
 */
export function renderCalendar(options: CalendarOptions): string {
	const {
		mode = 'single',
		selectedDate,
		endDate,
		minDate,
		maxDate,
		initialDate = new Date(),
		className = '',
		style = '',
	} = options;

	const currentDate = initialDate;
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();
	const startingDay = firstDay.getDay();

	const today = new Date();
	const todayString = today.toDateString();

	// Construir clases
	const classes = [
		'ubits-calendar',
		mode === 'range' ? 'ubits-calendar--range' : 'ubits-calendar--single',
		className,
	]
		.filter(Boolean)
		.join(' ');

	// Construir estilos
	const combinedStyle = style ? ` style="${style}"` : '';

	// Header con navegación
	const selectedMonthName = MONTH_NAMES[month];
	const headerHTML = `
    <div class="ubits-calendar__header">
      ${renderButton({
				variant: 'tertiary',
				size: 'sm',
				icon: 'chevron-left',
				iconOnly: true,
				className: 'ubits-calendar__nav-button ubits-calendar__nav-button--prev',
				attributes: {
					type: 'button',
					'aria-label': 'Mes anterior',
				},
			})}
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          ${renderInput({
						type: 'text',
						size: 'sm',
						value: selectedMonthName,
						showLabel: false,
						showHelper: false,
						rightIcon: 'chevron-down',
						className: 'ubits-calendar__month-input',
						attributes: {
							readonly: 'true',
							style: 'cursor: pointer;',
						},
					})}
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          ${renderInput({
						type: 'text',
						size: 'sm',
						value: String(year),
						showLabel: false,
						showHelper: false,
						rightIcon: 'chevron-down',
						className: 'ubits-calendar__year-input',
						attributes: {
							readonly: 'true',
							style: 'cursor: pointer;',
						},
					})}
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      ${renderButton({
				variant: 'tertiary',
				size: 'sm',
				icon: 'chevron-right',
				iconOnly: true,
				className: 'ubits-calendar__nav-button ubits-calendar__nav-button--next',
				attributes: {
					type: 'button',
					'aria-label': 'Mes siguiente',
				},
			})}
    </div>
  `;

	// Días de la semana
	const weekdaysHTML = `
    <div class="ubits-calendar__weekdays">
      ${DAY_NAMES.map((day) => `<div class="ubits-calendar__weekday">${day}</div>`).join('')}
    </div>
  `;

	// Días del mes
	let daysHTML = '<div class="ubits-calendar__days">';

	// Días vacíos al inicio
	for (let i = 0; i < startingDay; i++) {
		daysHTML += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
	}

	// Días del mes
	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day);
		const dateString = date.toDateString();
		const isToday = dateString === todayString;

		let dayClasses = ['ubits-calendar__day'];

		// Verificar si está seleccionado (modo single)
		if (mode === 'single' && selectedDate && isSameDay(date, selectedDate)) {
			dayClasses.push('ubits-calendar__day--selected');
		}

		// Verificar si está en rango (modo range)
		if (mode === 'range' && selectedDate) {
			if (endDate) {
				// Rango completo
				if (isSameDay(date, selectedDate)) {
					dayClasses.push('ubits-calendar__day--range-start');
				} else if (isSameDay(date, endDate)) {
					dayClasses.push('ubits-calendar__day--range-end');
				} else if (isDateInRange(date, selectedDate, endDate)) {
					dayClasses.push('ubits-calendar__day--in-range');
				}
			} else {
				// Solo fecha inicial seleccionada
				if (isSameDay(date, selectedDate)) {
					dayClasses.push('ubits-calendar__day--range-start');
				}
			}
		}

		// Verificar si es hoy
		if (isToday) {
			dayClasses.push('ubits-calendar__day--today');
		}

		// Verificar si está deshabilitado
		let isDisabled = false;
		if (minDate && compareDates(date, minDate) < 0) {
			isDisabled = true;
			dayClasses.push('ubits-calendar__day--disabled');
		}
		if (maxDate && compareDates(date, maxDate) > 0) {
			isDisabled = true;
			dayClasses.push('ubits-calendar__day--disabled');
		}

		const disabledAttr = isDisabled ? ' disabled' : '';
		const dataDate = formatDate(date);

		daysHTML += `<button type="button" class="${dayClasses.join(' ')}" data-date="${dataDate}"${disabledAttr}>${day}</button>`;
	}

	daysHTML += '</div>';

	return `
    <div class="${classes}"${combinedStyle}>
      ${headerHTML}
      ${weekdaysHTML}
      ${daysHTML}
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Calendar en el DOM
 */
export function createCalendar(options: CalendarOptions): {
	element: HTMLElement;
	update: (newOptions: Partial<CalendarOptions>) => void;
	destroy: () => void;
} {
	const {
		mode = 'single',
		selectedDate,
		endDate,
		minDate,
		maxDate,
		initialDate = new Date(),
		onDateSelect,
		onRangeSelect,
	} = options;

	// Crear contenedor
	const container = document.createElement('div');
	container.innerHTML = renderCalendar(options);
	const calendar = container.firstElementChild as HTMLElement;

	if (!calendar) {
		throw new Error('No se pudo crear el calendario');
	}

	let currentDate = new Date(initialDate);
	let currentSelectedDate: Date | null = selectedDate ? new Date(selectedDate) : null;
	let currentEndDate: Date | null = endDate ? new Date(endDate) : null;

	// Flag para evitar múltiples inicializaciones de event listeners
	let isRendering = false;

	/**
	 * Renderiza el calendario
	 */
	const render = () => {
		// Prevenir loops de re-render
		if (isRendering) {
			return;
		}

		isRendering = true;

		calendar.innerHTML = renderCalendar({
			...options,
			mode,
			selectedDate: currentSelectedDate,
			endDate: currentEndDate,
			minDate,
			maxDate,
			initialDate: currentDate,
		});

		// Agregar event listeners después de cada render
		setupEventListeners();

		// Resetear flag después de un pequeño delay
		setTimeout(() => {
			isRendering = false;
		}, 100);
	};

	/**
	 * Configura los event listeners
	 */
	const setupEventListeners = () => {
		// Navegación anterior/siguiente
		const prevBtn = calendar.querySelector('.ubits-calendar__nav-button--prev');
		const nextBtn = calendar.querySelector('.ubits-calendar__nav-button--next');
		const monthInput = calendar.querySelector('.ubits-calendar__month-input') as HTMLInputElement;
		const yearInput = calendar.querySelector('.ubits-calendar__year-input') as HTMLInputElement;
		const monthDropdown = calendar.querySelector('.ubits-calendar__month-dropdown');
		const yearDropdown = calendar.querySelector('.ubits-calendar__year-dropdown');

		prevBtn?.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			currentDate.setMonth(currentDate.getMonth() - 1);
			// Actualizar inputs
			if (monthInput) {
				monthInput.value = MONTH_NAMES[currentDate.getMonth()];
			}
			if (yearInput) {
				yearInput.value = String(currentDate.getFullYear());
			}
			// Actualizar calendario
			render();
		});

		nextBtn?.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			currentDate.setMonth(currentDate.getMonth() + 1);
			// Actualizar inputs
			if (monthInput) {
				monthInput.value = MONTH_NAMES[currentDate.getMonth()];
			}
			if (yearInput) {
				yearInput.value = String(currentDate.getFullYear());
			}
			// Actualizar calendario
			render();
		});

		// Toggle dropdown de mes
		monthInput?.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (monthDropdown) {
				const monthDropdownEl = monthDropdown as HTMLElement;
				const isVisible = monthDropdownEl.style.display === 'block';

				if (!isVisible) {
					// Cerrar dropdown de año si está abierto
					if (yearDropdown) {
						(yearDropdown as HTMLElement).style.display = 'none';
					}

					// Crear lista de meses
					const monthItems = MONTH_NAMES.map((name, index) => ({
						label: name,
						value: index,
						selected: index === currentDate.getMonth(),
					}));

					// Limpiar dropdown anterior
					monthDropdownEl.innerHTML = '';

					// Crear nuevo dropdown con scrollbar
					const dropdownContent = createListDropdown(monthItems, (value) => {
						currentDate.setMonth(value);
						monthDropdownEl.style.display = 'none';
						// Actualizar el input
						if (monthInput) {
							monthInput.value = MONTH_NAMES[value];
						}
						// Actualizar el calendario para mostrar los días del nuevo mes
						render();
					});

					monthDropdownEl.appendChild(dropdownContent);
					monthDropdownEl.style.display = 'block';
				} else {
					monthDropdownEl.style.display = 'none';
				}
			}
		});

		// Toggle dropdown de año
		yearInput?.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (yearDropdown) {
				const yearDropdownEl = yearDropdown as HTMLElement;
				const isVisible = yearDropdownEl.style.display === 'block';

				if (!isVisible) {
					// Cerrar dropdown de mes si está abierto
					if (monthDropdown) {
						(monthDropdown as HTMLElement).style.display = 'none';
					}

					// Crear lista de años
					const currentYear = currentDate.getFullYear();
					const yearItems = Array.from({ length: 100 }, (_, i) => {
						const yearOption = currentYear - 50 + i;
						return {
							label: String(yearOption),
							value: yearOption,
							selected: yearOption === currentYear,
						};
					});

					// Limpiar dropdown anterior
					yearDropdownEl.innerHTML = '';

					// Crear nuevo dropdown con scrollbar
					const dropdownContent = createListDropdown(yearItems, (value) => {
						currentDate.setFullYear(value);
						yearDropdownEl.style.display = 'none';
						// Actualizar el input
						if (yearInput) {
							yearInput.value = String(value);
						}
						// Actualizar el calendario para mostrar los días del nuevo año
						render();
					});

					yearDropdownEl.appendChild(dropdownContent);
					yearDropdownEl.style.display = 'block';
				} else {
					yearDropdownEl.style.display = 'none';
				}
			}
		});

		// Cerrar dropdowns al hacer click fuera
		const closeDropdowns = () => {
			if (monthDropdown) (monthDropdown as HTMLElement).style.display = 'none';
			if (yearDropdown) (yearDropdown as HTMLElement).style.display = 'none';
		};

		// NO agregar listener global de click para evitar loops de re-render en Storybook
		// Los dropdowns se cerrarán cuando se seleccione un valor o cuando se haga click en los inputs

		// Selección de días
		const dayButtons = calendar.querySelectorAll(
			'.ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)',
		);

		dayButtons.forEach((dayBtn) => {
			dayBtn.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				const dateStr = (dayBtn as HTMLElement).dataset.date || '';
				const [day, month, year] = dateStr.split('/');
				const clickedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

				if (mode === 'single') {
					currentSelectedDate = clickedDate;
					render();
					if (onDateSelect) {
						onDateSelect(clickedDate);
					}
				} else if (mode === 'range') {
					if (!currentSelectedDate || (currentSelectedDate && currentEndDate)) {
						// Iniciar nuevo rango
						currentSelectedDate = clickedDate;
						currentEndDate = null;
						render();
					} else if (currentSelectedDate && !currentEndDate) {
						// Completar rango
						if (compareDates(clickedDate, currentSelectedDate) < 0) {
							// La fecha clickeada es anterior a la inicial, intercambiar
							currentEndDate = currentSelectedDate;
							currentSelectedDate = clickedDate;
						} else {
							currentEndDate = clickedDate;
						}
						render();
						if (onRangeSelect && currentSelectedDate && currentEndDate) {
							onRangeSelect(currentSelectedDate, currentEndDate);
						}
					}
				}
			});
		});
	};

	// Renderizar inicialmente
	render();

	/**
	 * Actualiza las opciones del calendario
	 */
	const update = (newOptions: Partial<CalendarOptions>) => {
		if (newOptions.selectedDate !== undefined) {
			currentSelectedDate = newOptions.selectedDate ? new Date(newOptions.selectedDate) : null;
		}
		if (newOptions.endDate !== undefined) {
			currentEndDate = newOptions.endDate ? new Date(newOptions.endDate) : null;
		}
		if (newOptions.initialDate) {
			currentDate = new Date(newOptions.initialDate);
		}
		Object.assign(options, newOptions);
		render();
	};

	/**
	 * Destruye el calendario
	 */
	const destroy = () => {
		// Limpiar scrollbars de dropdowns si existen
		const monthDropdown = calendar.querySelector('.ubits-calendar__month-dropdown');
		const yearDropdown = calendar.querySelector('.ubits-calendar__year-dropdown');

		if (monthDropdown) {
			const scrollbarInstance = (monthDropdown as any)._scrollbarInstance;
			if (scrollbarInstance && scrollbarInstance.destroy) {
				scrollbarInstance.destroy();
			}
		}

		if (yearDropdown) {
			const scrollbarInstance = (yearDropdown as any)._scrollbarInstance;
			if (scrollbarInstance && scrollbarInstance.destroy) {
				scrollbarInstance.destroy();
			}
		}

		if (calendar.parentElement) {
			calendar.parentElement.removeChild(calendar);
		}
	};

	return {
		element: calendar,
		update,
		destroy,
	};
}
