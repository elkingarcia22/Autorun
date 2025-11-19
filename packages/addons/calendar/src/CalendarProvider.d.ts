/**
 * Calendar Provider
 * Componente Calendar UBITS con selección única y por rango de fechas
 * Implementación simplificada desde cero
 */
import type { CalendarOptions } from './types/CalendarOptions';
/**
 * Renderiza el HTML del calendario
 */
export declare function renderCalendar(options: CalendarOptions): string;
/**
 * Crea y renderiza un Calendar en el DOM
 */
export declare function createCalendar(options: CalendarOptions): {
    element: HTMLElement;
    update: (newOptions: Partial<CalendarOptions>) => void;
    destroy: () => void;
};
//# sourceMappingURL=CalendarProvider.d.ts.map