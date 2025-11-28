/**
 * Tipos TypeScript para el componente HeaderSection
 */

import type { ButtonOptions } from '../../../button/src/types/ButtonOptions';
import type { StatusTagOptions } from '../../../status-tag/src/types/StatusTagOptions';
import type { BreadcrumbOptions } from '../../../breadcrumb/src/types/BreadcrumbOptions';

export interface HeaderSectionAction extends Omit<ButtonOptions, 'size'> {
  /**
   * ID único de la acción
   */
  id: string;
  
  /**
   * Texto del botón
   */
  text: string;
  
  /**
   * Tamaño del botón (siempre md para acciones)
   */
  size?: 'md';
  
  /**
   * Handler de click
   */
  onClick?: (event: MouseEvent) => void;
}

export interface HeaderSectionOptionsMenuItem {
  /**
   * Label de la opción del menú
   */
  label: string;
  
  /**
   * Valor de la opción
   */
  value?: string;
  
  /**
   * Handler cuando se hace click en la opción
   */
  onClick?: (event: MouseEvent, data: { label: string; value: string }) => void;
  
  /**
   * Estado de la opción (disabled, etc.)
   */
  state?: 'default' | 'active' | 'disabled';
}

export interface HeaderSectionOptions {
  /**
   * ID del contenedor donde se renderizará el header
   */
  containerId?: string;
  
  /**
   * Contenedor HTML donde se renderizará el header
   */
  container?: HTMLElement;
  
  /**
   * Título de la sección
   */
  title?: string;
  
  /**
   * Mostrar el título
   * @default true
   */
  showTitle?: boolean;
  
  /**
   * Acciones (botones) a mostrar en el header
   */
  actions?: HeaderSectionAction[];
  
  /**
   * Mostrar las acciones
   * @default true
   */
  showActions?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Mostrar el botón de atrás (secundario md)
   * @default false
   */
  showBackButton?: boolean;
  
  /**
   * Handler cuando se hace click en el botón de atrás
   */
  onBackClick?: (event: MouseEvent) => void;
  
  /**
   * Mostrar el status tag (al lado del botón de información)
   * @default false
   */
  showStatusTag?: boolean;
  
  /**
   * Opciones del status tag
   */
  statusTag?: Omit<StatusTagOptions, 'size'> & { size?: 'sm' };
  
  /**
   * Mostrar el botón de información (sm, tertiary)
   * @default false
   */
  showInfoButton?: boolean;
  
  /**
   * Texto del tooltip del botón de información
   */
  infoTooltipText?: string;
  
  /**
   * Handler cuando se hace click en el botón de información
   */
  onInfoClick?: (event: MouseEvent) => void;
  
  /**
   * Mostrar el botón de opciones (secundario md, 3 puntos horizontales)
   * @default false
   */
  showOptionsButton?: boolean;
  
  /**
   * Opciones del menú dropdown del botón de opciones
   */
  optionsMenuItems?: HeaderSectionOptionsMenuItem[];
  
  /**
   * Handler cuando se hace click en el botón de opciones (antes de abrir el menú)
   */
  onOptionsClick?: (event: MouseEvent) => void;
  
  /**
   * Mostrar el botón secundario adicional (secundario md)
   * @default false
   */
  showSecondaryButton?: boolean;
  
  /**
   * Texto del botón secundario adicional
   */
  secondaryButtonText?: string;
  
  /**
   * Icono del botón secundario adicional
   */
  secondaryButtonIcon?: string;
  
  /**
   * Handler cuando se hace click en el botón secundario adicional
   */
  onSecondaryButtonClick?: (event: MouseEvent) => void;
  
  /**
   * Mostrar el breadcrumb (debajo del header, 16px de distancia)
   * @default false
   */
  showBreadcrumb?: boolean;
  
  /**
   * Opciones del breadcrumb
   */
  breadcrumb?: BreadcrumbOptions;
}

