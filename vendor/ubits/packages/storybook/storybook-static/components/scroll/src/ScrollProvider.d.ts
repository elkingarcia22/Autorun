import type { ScrollOptions } from './types/ScrollOptions';
/**
 * Scrollbar Provider
 * Componente scrollbar personalizado UBITS
 */
/**
 * Renderiza el HTML de un Scrollbar
 */
export declare function renderScrollbar(options: ScrollOptions): string;
/**
 * Crea y renderiza un Scrollbar en el DOM y lo sincroniza con un elemento scrollable
 */
export declare function createScrollbar(options: ScrollOptions): {
    element: HTMLElement;
    update: () => void;
    destroy: () => void;
};
//# sourceMappingURL=ScrollProvider.d.ts.map