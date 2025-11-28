/**
 * InputProvider
 * Lógica de renderizado y gestión del componente Input
 * Incluye todos los tipos, estados, tamaños y funcionalidades especiales
 */
import type { InputOptions } from './types/InputOptions';
/**
 * Renderiza un input UBITS como HTML string
 */
export declare function renderInput(options: InputOptions): string;
/**
 * Crea un elemento input programáticamente
 */
export declare function createInput(options: InputOptions): {
    element: HTMLDivElement;
    inputElement: HTMLInputElement | HTMLTextAreaElement;
    getValue: () => string;
    setValue: (value: string) => void;
    focus: () => void;
    blur: () => void;
    disable: () => void;
    enable: () => void;
    setState: (newState: string) => void;
} | null;
//# sourceMappingURL=InputProvider.d.ts.map