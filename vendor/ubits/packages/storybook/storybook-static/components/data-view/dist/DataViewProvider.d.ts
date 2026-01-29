/**
 * DataViewProvider
 * Lógica de renderizado del componente DataView
 * Genera HTML según las opciones proporcionadas usando tokens y componentes UBITS
 */
import type { DataViewOptions } from './types/DataViewOptions';
import './styles/data-view.css';
import '../../button/src/styles/button.css';
/**
 * Renderiza el componente DataView como HTML string
 */
export declare function renderDataView(options: DataViewOptions): string;
/**
 * Crea un elemento DataView programáticamente
 */
export declare function createDataView(options: DataViewOptions): HTMLElement;
