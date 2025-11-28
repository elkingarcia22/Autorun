/**
 * Opciones para el componente Calendar UBITS
 */
export type CalendarMode = 'single' | 'range';
export interface CalendarOptions {
    /**
     * Modo de selección: 'single' para fecha única, 'range' para rango de fechas
     * @default 'single'
     */
    mode?: CalendarMode;
    /**
     * Fecha seleccionada (modo single) o fecha de inicio (modo range)
     */
    selectedDate?: Date | null;
    /**
     * Fecha de fin (solo para modo range)
     */
    endDate?: Date | null;
    /**
     * Fecha mínima permitida
     */
    minDate?: Date | null;
    /**
     * Fecha máxima permitida
     */
    maxDate?: Date | null;
    /**
     * Fecha inicial a mostrar (por defecto: fecha actual)
     */
    initialDate?: Date;
    /**
     * Callback cuando se selecciona una fecha (modo single)
     */
    onDateSelect?: (date: Date) => void;
    /**
     * Callback cuando se selecciona un rango (modo range)
     */
    onRangeSelect?: (startDate: Date, endDate: Date) => void;
    /**
     * Clase CSS adicional para el contenedor
     */
    className?: string;
    /**
     * Estilos inline adicionales
     */
    style?: string;
}
//# sourceMappingURL=CalendarOptions.d.ts.map