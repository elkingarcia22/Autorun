/**
 * Calendar Provider
 * Componente Calendar UBITS con selección única y por rango de fechas
 * Usando tokens UBITS exclusivamente
 */

import type { CalendarOptions, CalendarMode } from './types/CalendarOptions';

/**
 * Nombres de meses en español
 */
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
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
    style = ''
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
    className
  ].filter(Boolean).join(' ');

  // Construir estilos
  const combinedStyle = style ? ` style="${style}"` : '';

  // Header con navegación
  const headerHTML = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <select class="ubits-calendar__month-select">
          ${MONTH_NAMES.map((name, index) => 
            `<option value="${index}" ${index === month ? 'selected' : ''}>${name}</option>`
          ).join('')}
        </select>
        <select class="ubits-calendar__year-select">
          ${Array.from({ length: 100 }, (_, i) => {
            const yearOption = year - 50 + i;
            return `<option value="${yearOption}" ${yearOption === year ? 'selected' : ''}>${yearOption}</option>`;
          }).join('')}
        </select>
      </div>
      <button type="button" class="ubits-calendar__nav-button ubits-calendar__nav-button--next" aria-label="Mes siguiente">
        <i class="far fa-chevron-right"></i>
      </button>
    </div>
  `;

  // Días de la semana
  const weekdaysHTML = `
    <div class="ubits-calendar__weekdays">
      ${DAY_NAMES.map(day => `<div class="ubits-calendar__weekday">${day}</div>`).join('')}
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
    if (mode === 'range' && selectedDate && endDate) {
      if (isSameDay(date, selectedDate)) {
        dayClasses.push('ubits-calendar__day--range-start');
      } else if (isSameDay(date, endDate)) {
        dayClasses.push('ubits-calendar__day--range-end');
      } else if (isDateInRange(date, selectedDate, endDate)) {
        dayClasses.push('ubits-calendar__day--in-range');
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
    onRangeSelect
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
  let isSelectingRange = false;

  /**
   * Renderiza el calendario
   */
  const render = () => {
    calendar.innerHTML = renderCalendar({
      ...options,
      mode,
      selectedDate: currentSelectedDate,
      endDate: currentEndDate,
      minDate,
      maxDate,
      initialDate: currentDate
    });

    // Agregar event listeners
    setupEventListeners();
  };

  /**
   * Configura los event listeners
   */
  const setupEventListeners = () => {
    // Navegación anterior/siguiente
    const prevBtn = calendar.querySelector('.ubits-calendar__nav-button--prev');
    const nextBtn = calendar.querySelector('.ubits-calendar__nav-button--next');
    const monthSelect = calendar.querySelector('.ubits-calendar__month-select') as HTMLSelectElement;
    const yearSelect = calendar.querySelector('.ubits-calendar__year-select') as HTMLSelectElement;

    prevBtn?.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      render();
    });

    nextBtn?.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      render();
    });

    monthSelect?.addEventListener('change', (e) => {
      currentDate.setMonth(parseInt((e.target as HTMLSelectElement).value));
      render();
    });

    yearSelect?.addEventListener('change', (e) => {
      currentDate.setFullYear(parseInt((e.target as HTMLSelectElement).value));
      render();
    });

    // Selección de días
    const dayButtons = calendar.querySelectorAll('.ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)');
    
    dayButtons.forEach(dayBtn => {
      dayBtn.addEventListener('click', () => {
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
          if (!currentSelectedDate || isSelectingRange) {
            // Iniciar rango
            currentSelectedDate = clickedDate;
            currentEndDate = null;
            isSelectingRange = true;
            render();
          } else {
            // Completar rango
            if (compareDates(clickedDate, currentSelectedDate) < 0) {
              // Si la fecha clickeada es anterior, intercambiar
              currentEndDate = currentSelectedDate;
              currentSelectedDate = clickedDate;
            } else {
              currentEndDate = clickedDate;
            }
            isSelectingRange = false;
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
    if (calendar.parentElement) {
      calendar.parentElement.removeChild(calendar);
    }
  };

  return {
    element: calendar,
    update,
    destroy
  };
}

