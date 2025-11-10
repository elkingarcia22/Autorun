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

  // Header con navegación - usando componentes UBITS
  const selectedMonthName = MONTH_NAMES[month];
  const headerHTML = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${selectedMonthName}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__year-input" value="${year}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--next" aria-label="Mes siguiente">
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
        // Solo fecha inicial seleccionada (mientras se selecciona el rango)
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
    // Logs detallados para diagnosticar espaciado
    setTimeout(() => {
      const header = calendar.querySelector('.ubits-calendar__header') as HTMLElement;
      const prevBtn = calendar.querySelector('.ubits-calendar__nav-button--prev') as HTMLElement;
      const nextBtn = calendar.querySelector('.ubits-calendar__nav-button--next') as HTMLElement;
      const monthYearContainer = calendar.querySelector('.ubits-calendar__month-year') as HTMLElement;
      
      if (header && prevBtn && nextBtn && monthYearContainer) {
        console.log('🔍 [Calendar Header] ========== DIAGNÓSTICO ESPACIADO ==========');
        
        // Estilos computados del header
        const headerStyles = window.getComputedStyle(header);
        console.log('📐 Header - Estilos computados:');
        console.log('  display:', headerStyles.display);
        console.log('  flexDirection:', headerStyles.flexDirection);
        console.log('  justifyContent:', headerStyles.justifyContent);
        console.log('  alignItems:', headerStyles.alignItems);
        console.log('  gap:', headerStyles.gap);
        console.log('  padding:', headerStyles.padding);
        console.log('  paddingLeft:', headerStyles.paddingLeft);
        console.log('  paddingRight:', headerStyles.paddingRight);
        console.log('  paddingTop:', headerStyles.paddingTop);
        console.log('  paddingBottom:', headerStyles.paddingBottom);
        console.log('  width:', headerStyles.width);
        console.log('  margin:', headerStyles.margin);
        console.log('  marginLeft:', headerStyles.marginLeft);
        console.log('  marginRight:', headerStyles.marginRight);
        
        // Bounding rects
        const headerRect = header.getBoundingClientRect();
        const prevBtnRect = prevBtn.getBoundingClientRect();
        const nextBtnRect = nextBtn.getBoundingClientRect();
        const monthYearRect = monthYearContainer.getBoundingClientRect();
        
        console.log('📏 Header - Dimensiones:');
        console.log('  width:', headerRect.width, 'px');
        console.log('  height:', headerRect.height, 'px');
        console.log('  left:', headerRect.left, 'px');
        console.log('  right:', headerRect.right, 'px');
        
        console.log('📏 Botón Prev - Dimensiones:');
        console.log('  width:', prevBtnRect.width, 'px');
        console.log('  height:', prevBtnRect.height, 'px');
        console.log('  left:', prevBtnRect.left, 'px');
        console.log('  right:', prevBtnRect.right, 'px');
        
        console.log('📏 Contenedor Mes/Año - Dimensiones:');
        console.log('  width:', monthYearRect.width, 'px');
        console.log('  height:', monthYearRect.height, 'px');
        console.log('  left:', monthYearRect.left, 'px');
        console.log('  right:', monthYearRect.right, 'px');
        
        console.log('📏 Botón Next - Dimensiones:');
        console.log('  width:', nextBtnRect.width, 'px');
        console.log('  height:', nextBtnRect.height, 'px');
        console.log('  left:', nextBtnRect.left, 'px');
        console.log('  right:', nextBtnRect.right, 'px');
        
        // Distancias calculadas
        const distancePrevToInput = monthYearRect.left - prevBtnRect.right;
        const distanceInputToNext = nextBtnRect.left - monthYearRect.right;
        
        console.log('📏 Distancias:');
        console.log('  Botón Prev → Inputs:', distancePrevToInput.toFixed(2), 'px');
        console.log('  Inputs → Botón Next:', distanceInputToNext.toFixed(2), 'px');
        
        // Estilos computados de los botones
        const prevBtnStyles = window.getComputedStyle(prevBtn);
        const nextBtnStyles = window.getComputedStyle(nextBtn);
        console.log('🔘 Botón Prev - Estilos:');
        console.log('  margin:', prevBtnStyles.margin);
        console.log('  marginLeft:', prevBtnStyles.marginLeft);
        console.log('  marginRight:', prevBtnStyles.marginRight);
        console.log('  width:', prevBtnStyles.width);
        console.log('  flexShrink:', prevBtnStyles.flexShrink);
        console.log('  flexGrow:', prevBtnStyles.flexGrow);
        console.log('🔘 Botón Next - Estilos:');
        console.log('  margin:', nextBtnStyles.margin);
        console.log('  marginLeft:', nextBtnStyles.marginLeft);
        console.log('  marginRight:', nextBtnStyles.marginRight);
        console.log('  width:', nextBtnStyles.width);
        console.log('  flexShrink:', nextBtnStyles.flexShrink);
        console.log('  flexGrow:', nextBtnStyles.flexGrow);
        
        // Estilos del contenedor mes/año
        const monthYearStyles = window.getComputedStyle(monthYearContainer);
        console.log('📦 Contenedor Mes/Año - Estilos:');
        console.log('  margin:', monthYearStyles.margin);
        console.log('  marginLeft:', monthYearStyles.marginLeft);
        console.log('  marginRight:', monthYearStyles.marginRight);
        console.log('  width:', monthYearStyles.width);
        console.log('  flex:', monthYearStyles.flex);
        console.log('  flexShrink:', monthYearStyles.flexShrink);
        console.log('  flexGrow:', monthYearStyles.flexGrow);
        
        console.log('🔍 [Calendar Header] ========== FIN DIAGNÓSTICO ==========');
      } else {
        console.error('❌ [Calendar Header] Elementos no encontrados:', {
          header: !!header,
          prevBtn: !!prevBtn,
          nextBtn: !!nextBtn,
          monthYearContainer: !!monthYearContainer
        });
      }
    }, 100);
    
    // Navegación anterior/siguiente
    const prevBtn = calendar.querySelector('.ubits-calendar__nav-button--prev');
    const nextBtn = calendar.querySelector('.ubits-calendar__nav-button--next');
    const monthInput = calendar.querySelector('.ubits-calendar__month-input') as HTMLInputElement;
    const yearInput = calendar.querySelector('.ubits-calendar__year-input') as HTMLInputElement;
    const monthDropdown = calendar.querySelector('.ubits-calendar__month-dropdown');
    const yearDropdown = calendar.querySelector('.ubits-calendar__year-dropdown');

    prevBtn?.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      render();
    });

    nextBtn?.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      render();
    });

    // Toggle dropdown de mes
    monthInput?.addEventListener('click', (e) => {
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
            selected: index === currentDate.getMonth()
          }));
          // Crear contenedor para la lista y el scrollbar
          const listContainerId = `month-list-${Date.now()}`;
          const scrollbarContainerId = `month-scrollbar-${Date.now()}`;
          const listHTML = `
            <div style="position: relative; width: 100%;">
              <div id="${listContainerId}" class="ubits-list" role="list" style="max-height: 200px; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none;">
                ${monthItems.map((item, idx) => `
                  <div class="ubits-list-item ubits-list-item--sm ${item.selected ? 'ubits-list-item--active' : ''}" 
                       role="listitem" 
                       data-value="${item.value}" 
                       style="cursor: pointer;">
                    ${item.label}
                  </div>
                `).join('')}
              </div>
              <div id="${scrollbarContainerId}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; pointer-events: none;"></div>
            </div>
            <style>
              #${listContainerId}::-webkit-scrollbar { display: none; }
            </style>
          `;
          monthDropdownEl.innerHTML = listHTML;
          monthDropdownEl.style.display = 'block';
          
          // Crear scrollbar UBITS después de que el DOM esté listo
          requestAnimationFrame(async () => {
            console.log('📅 [Calendar] ========== CREANDO SCROLLBAR PARA MESES ==========');
            const listElement = document.getElementById(listContainerId);
            const scrollbarContainer = document.getElementById(scrollbarContainerId);
            console.log('📅 [Calendar] List element encontrado:', !!listElement, listElement?.id);
            console.log('📅 [Calendar] Scrollbar container encontrado:', !!scrollbarContainer, scrollbarContainer?.id);
            
            if (!listElement) {
              console.error('❌ [Calendar] listElement no encontrado con id:', listContainerId);
              return;
            }
            
            if (!scrollbarContainer) {
              console.error('❌ [Calendar] scrollbarContainer no encontrado con id:', scrollbarContainerId);
              return;
            }
            
            console.log('📅 [Calendar] List scrollHeight:', listElement.scrollHeight);
            console.log('📅 [Calendar] List clientHeight:', listElement.clientHeight);
            console.log('📅 [Calendar] Necesita scroll?', listElement.scrollHeight > listElement.clientHeight);
            
            if (listElement.scrollHeight > listElement.clientHeight) {
              console.log('📅 [Calendar] ✅ Scroll necesario, creando scrollbar UBITS...');
              try {
                // Verificar si createScrollbarLocal está disponible
                const hasCreateScrollbarLocal = typeof (window as any).createScrollbarLocal === 'function';
                console.log('📅 [Calendar] createScrollbarLocal disponible?', hasCreateScrollbarLocal);
                
                let createScrollbarFn: any = null;
                if (hasCreateScrollbarLocal) {
                  console.log('📅 [Calendar] Usando createScrollbarLocal global');
                  createScrollbarFn = (window as any).createScrollbarLocal;
                } else {
                  // Intentar importar dinámicamente
                  console.log('📅 [Calendar] Intentando importar ScrollProvider...');
                  try {
                    const scrollPath = '../../scroll/src/ScrollProvider.js';
                    // @ts-ignore - Import dinámico fuera de rootDir
                    const scrollModule = await import(scrollPath);
                    createScrollbarFn = scrollModule.createScrollbar;
                    console.log('📅 [Calendar] ScrollProvider importado:', !!createScrollbarFn);
                  } catch (importError) {
                    console.error('❌ [Calendar] Error importando ScrollProvider:', importError);
                  }
                }
                
                if (!createScrollbarFn) {
                  console.error('❌ [Calendar] No se encontró función createScrollbar');
                  return;
                }
                
                // Asegurar que el contenedor tenga la misma altura que la lista
                const listHeight = listElement.clientHeight;
                scrollbarContainer.style.height = `${listHeight}px`;
                console.log('📅 [Calendar] Altura del contenedor ajustada a:', listHeight);
                
                // Verificar nuevamente que scrollbarContainer existe
                if (!scrollbarContainer || !listElement) {
                  console.error('❌ [Calendar] Elementos perdidos antes de crear scrollbar');
                  return;
                }
                
                // Usar la firma correcta según el tipo de función
                let scrollbarInstance: any = null;
                if (hasCreateScrollbarLocal) {
                  // createScrollbarLocal espera (element, container, orientation)
                  console.log('📅 [Calendar] Llamando createScrollbarLocal con firma:', 'createScrollbarLocal(element, container, "vertical")');
                  console.log('📅 [Calendar] listElement:', !!listElement, listElement?.id);
                  console.log('📅 [Calendar] scrollbarContainer:', !!scrollbarContainer, scrollbarContainer?.id);
                  
                  try {
                    scrollbarInstance = createScrollbarFn(listElement, scrollbarContainer, 'vertical');
                    console.log('📅 [Calendar] Scrollbar instance creada:', !!scrollbarInstance, scrollbarInstance);
                    
                    // Forzar que el scrollbar sea visible inicialmente
                    setTimeout(() => {
                      const scrollbarElement = scrollbarContainer.querySelector('.ubits-scrollbar');
                      const barElement = scrollbarContainer.querySelector('.ubits-scrollbar__bar');
                      if (scrollbarElement && barElement) {
                        // Aplicar estilos inline para asegurar visibilidad
                        (scrollbarElement as HTMLElement).style.display = 'flex';
                        (barElement as HTMLElement).style.opacity = '0.6';
                        (barElement as HTMLElement).style.pointerEvents = 'auto';
                        console.log('📅 [Calendar] Estilos inline aplicados al scrollbar de meses');
                      }
                    }, 50);
                  } catch (callError) {
                    console.error('❌ [Calendar] Error al llamar createScrollbarLocal:', callError);
                    throw callError;
                  }
                } else {
                  // createScrollbar espera un objeto con opciones
                  console.log('📅 [Calendar] Llamando createScrollbar con opciones');
                  scrollbarInstance = createScrollbarFn({
                    orientation: 'vertical',
                    targetId: listContainerId,
                    containerId: scrollbarContainerId
                  });
                  console.log('📅 [Calendar] Scrollbar instance creada:', !!scrollbarInstance, scrollbarInstance);
                }
                
                if (scrollbarInstance && scrollbarContainer) {
                  scrollbarContainer.style.pointerEvents = 'auto';
                  // Guardar referencia para destruir cuando se cierre
                  (monthDropdownEl as any)._scrollbarInstance = scrollbarInstance;
                  console.log('✅ [Calendar] Scrollbar UBITS creado correctamente para meses');
                } else {
                  console.warn('⚠️ [Calendar] Scrollbar instance no se creó correctamente');
                }
              } catch (error) {
                console.error('❌ [Calendar] Error creando scrollbar para lista de meses:', error);
                console.error('❌ [Calendar] Stack:', (error as Error).stack);
              }
            } else {
              console.log('📅 [Calendar] ⚠️ No se necesita scroll (contenido cabe en el contenedor)');
            }
            console.log('📅 [Calendar] ========== FIN CREACIÓN SCROLLBAR MESES ==========');
          });
          
          // Event listeners para items de mes
          monthDropdownEl.querySelectorAll('.ubits-list-item').forEach(item => {
            item.addEventListener('click', (e) => {
              e.stopPropagation();
              const value = parseInt((e.currentTarget as HTMLElement).dataset.value || '0');
              currentDate.setMonth(value);
              // Destruir scrollbar antes de cerrar
              if ((monthDropdownEl as any)._scrollbarInstance) {
                try {
                  (monthDropdownEl as any)._scrollbarInstance.destroy();
                } catch (e) {}
                delete (monthDropdownEl as any)._scrollbarInstance;
              }
              monthDropdownEl.style.display = 'none';
              render();
            });
          });
        } else {
          monthDropdownEl.style.display = 'none';
        }
      }
    });

    // Toggle dropdown de año
    yearInput?.addEventListener('click', (e) => {
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
              selected: yearOption === currentYear
            };
          });
          // Crear contenedor para la lista y el scrollbar
          const yearListContainerId = `year-list-${Date.now()}`;
          const yearScrollbarContainerId = `year-scrollbar-${Date.now()}`;
          const listHTML = `
            <div style="position: relative; width: 100%;">
              <div id="${yearListContainerId}" class="ubits-list" role="list" style="max-height: 200px; background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none;">
                ${yearItems.map((item) => `
                  <div class="ubits-list-item ubits-list-item--sm ${item.selected ? 'ubits-list-item--active' : ''}" 
                       role="listitem" 
                       data-value="${item.value}" 
                       style="cursor: pointer;">
                    ${item.label}
                  </div>
                `).join('')}
              </div>
              <div id="${yearScrollbarContainerId}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; pointer-events: none;"></div>
            </div>
            <style>
              #${yearListContainerId}::-webkit-scrollbar { display: none; }
            </style>
          `;
          yearDropdownEl.innerHTML = listHTML;
          yearDropdownEl.style.display = 'block';
          
          // Crear scrollbar UBITS después de que el DOM esté listo
          requestAnimationFrame(async () => {
            console.log('📅 [Calendar] ========== CREANDO SCROLLBAR PARA AÑOS ==========');
            const listElement = document.getElementById(yearListContainerId);
            const scrollbarContainer = document.getElementById(yearScrollbarContainerId);
            console.log('📅 [Calendar] Year list element encontrado:', !!listElement, listElement?.id);
            console.log('📅 [Calendar] Year scrollbar container encontrado:', !!scrollbarContainer, scrollbarContainer?.id);
            
            if (!listElement) {
              console.error('❌ [Calendar] listElement no encontrado con id:', yearListContainerId);
              return;
            }
            
            if (!scrollbarContainer) {
              console.error('❌ [Calendar] scrollbarContainer no encontrado con id:', yearScrollbarContainerId);
              return;
            }
            
            console.log('📅 [Calendar] Year list scrollHeight:', listElement.scrollHeight);
            console.log('📅 [Calendar] Year list clientHeight:', listElement.clientHeight);
            console.log('📅 [Calendar] Necesita scroll?', listElement.scrollHeight > listElement.clientHeight);
            
            if (listElement.scrollHeight > listElement.clientHeight) {
              console.log('📅 [Calendar] ✅ Scroll necesario, creando scrollbar UBITS...');
              try {
                // Verificar si createScrollbarLocal está disponible
                const hasCreateScrollbarLocal = typeof (window as any).createScrollbarLocal === 'function';
                console.log('📅 [Calendar] createScrollbarLocal disponible?', hasCreateScrollbarLocal);
                
                let createScrollbarFn: any = null;
                if (hasCreateScrollbarLocal) {
                  console.log('📅 [Calendar] Usando createScrollbarLocal global');
                  createScrollbarFn = (window as any).createScrollbarLocal;
                } else {
                  // Intentar importar dinámicamente
                  console.log('📅 [Calendar] Intentando importar ScrollProvider...');
                  try {
                    const scrollPath = '../../scroll/src/ScrollProvider.js';
                    // @ts-ignore - Import dinámico fuera de rootDir
                    const scrollModule = await import(scrollPath);
                    createScrollbarFn = scrollModule.createScrollbar;
                    console.log('📅 [Calendar] ScrollProvider importado:', !!createScrollbarFn);
                  } catch (importError) {
                    console.error('❌ [Calendar] Error importando ScrollProvider:', importError);
                  }
                }
                
                if (!createScrollbarFn) {
                  console.error('❌ [Calendar] No se encontró función createScrollbar');
                  return;
                }
                
                // Asegurar que el contenedor tenga la misma altura que la lista
                const listHeight = listElement.clientHeight;
                scrollbarContainer.style.height = `${listHeight}px`;
                console.log('📅 [Calendar] Altura del contenedor ajustada a:', listHeight);
                
                // Verificar nuevamente que scrollbarContainer existe
                if (!scrollbarContainer || !listElement) {
                  console.error('❌ [Calendar] Elementos perdidos antes de crear scrollbar');
                  return;
                }
                
                // Usar la firma correcta según el tipo de función
                let scrollbarInstance: any = null;
                if (hasCreateScrollbarLocal) {
                  // createScrollbarLocal espera (element, container, orientation)
                  console.log('📅 [Calendar] Llamando createScrollbarLocal con firma:', 'createScrollbarLocal(element, container, "vertical")');
                  console.log('📅 [Calendar] listElement:', !!listElement, listElement?.id);
                  console.log('📅 [Calendar] scrollbarContainer:', !!scrollbarContainer, scrollbarContainer?.id);
                  
                  try {
                    scrollbarInstance = createScrollbarFn(listElement, scrollbarContainer, 'vertical');
                    console.log('📅 [Calendar] Year scrollbar instance creada:', !!scrollbarInstance, scrollbarInstance);
                    
                    // Forzar que el scrollbar sea visible inicialmente
                    setTimeout(() => {
                      const scrollbarElement = scrollbarContainer.querySelector('.ubits-scrollbar');
                      const barElement = scrollbarContainer.querySelector('.ubits-scrollbar__bar');
                      if (scrollbarElement && barElement) {
                        // Aplicar estilos inline para asegurar visibilidad
                        (scrollbarElement as HTMLElement).style.display = 'flex';
                        (barElement as HTMLElement).style.opacity = '0.6';
                        (barElement as HTMLElement).style.pointerEvents = 'auto';
                        console.log('📅 [Calendar] Estilos inline aplicados al scrollbar de años');
                      }
                    }, 50);
                  } catch (callError) {
                    console.error('❌ [Calendar] Error al llamar createScrollbarLocal:', callError);
                    throw callError;
                  }
                } else {
                  // createScrollbar espera un objeto con opciones
                  console.log('📅 [Calendar] Llamando createScrollbar con opciones');
                  scrollbarInstance = createScrollbarFn({
                    orientation: 'vertical',
                    targetId: yearListContainerId,
                    containerId: yearScrollbarContainerId
                  });
                  console.log('📅 [Calendar] Year scrollbar instance creada:', !!scrollbarInstance, scrollbarInstance);
                }
                
                if (scrollbarInstance && scrollbarContainer) {
                  scrollbarContainer.style.pointerEvents = 'auto';
                  // Guardar referencia para destruir cuando se cierre
                  (yearDropdownEl as any)._scrollbarInstance = scrollbarInstance;
                  console.log('✅ [Calendar] Scrollbar UBITS creado correctamente para años');
                } else {
                  console.warn('⚠️ [Calendar] Scrollbar instance no se creó correctamente');
                }
              } catch (error) {
                console.error('❌ [Calendar] Error creando scrollbar para lista de años:', error);
                console.error('❌ [Calendar] Stack:', (error as Error).stack);
              }
            } else {
              console.log('📅 [Calendar] ⚠️ No se necesita scroll para años (contenido cabe en el contenedor)');
            }
            console.log('📅 [Calendar] ========== FIN CREACIÓN SCROLLBAR AÑOS ==========');
          });
          
          // Event listeners para items de año
          yearDropdownEl.querySelectorAll('.ubits-list-item').forEach(item => {
            item.addEventListener('click', (e) => {
              e.stopPropagation();
              const value = parseInt(String((e.currentTarget as HTMLElement).dataset.value || currentYear));
              currentDate.setFullYear(value);
              // Destruir scrollbar antes de cerrar
              if ((yearDropdownEl as any)._scrollbarInstance) {
                try {
                  (yearDropdownEl as any)._scrollbarInstance.destroy();
                } catch (e) {}
                delete (yearDropdownEl as any)._scrollbarInstance;
              }
              yearDropdownEl.style.display = 'none';
              render();
            });
          });
        } else {
          yearDropdownEl.style.display = 'none';
        }
      }
    });

    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', () => {
      if (monthDropdown) (monthDropdown as HTMLElement).style.display = 'none';
      if (yearDropdown) (yearDropdown as HTMLElement).style.display = 'none';
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
          if (!currentSelectedDate || (currentSelectedDate && currentEndDate)) {
            // Iniciar nuevo rango (no hay fecha inicial o ya hay un rango completo)
            currentSelectedDate = clickedDate;
            currentEndDate = null;
            isSelectingRange = true;
            render();
          } else if (currentSelectedDate && !currentEndDate) {
            // Completar rango (ya hay fecha inicial, falta la final)
            if (compareDates(clickedDate, currentSelectedDate) < 0) {
              // La fecha clickeada es anterior a la inicial, intercambiar
              currentEndDate = currentSelectedDate;
              currentSelectedDate = clickedDate;
            } else {
              // La fecha clickeada es posterior a la inicial, establecer como final
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

