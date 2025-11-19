import type { ModalOptions } from './types/ModalOptions';
/**
 * Renderiza el HTML de un Modal
 */
export declare function renderModal(options: ModalOptions): string;
/**
 * Crea y renderiza un Modal en el DOM
 */
export declare function createModal(options: ModalOptions): {
    element: HTMLElement;
    open: () => void;
    close: () => void;
    updateContent: (content: string | (() => string)) => void;
};
//# sourceMappingURL=ModalProvider.d.ts.map