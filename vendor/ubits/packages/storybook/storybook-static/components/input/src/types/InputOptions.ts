/**
 * Tipos TypeScript para el componente Input
 */

export type InputType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'select' 
  | 'textarea' 
  | 'search' 
  | 'autocomplete' 
  | 'calendar';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg';

export type InputState = 'default' | 'hover' | 'focus' | 'active' | 'invalid' | 'disabled';

export type MandatoryType = 'obligatorio' | 'opcional';

export interface SelectOption {
  /**
   * Valor de la opción
   */
  value: string;

  /**
   * Texto mostrado de la opción
   */
  text: string;
}

export interface AutocompleteOption {
  /**
   * Valor de la opción
   */
  value: string;

  /**
   * Texto mostrado de la opción
   */
  text: string;
}

export interface InputOptions {
  /**
   * ID del contenedor donde se renderizará el input (REQUERIDO)
   */
  containerId: string;

  /**
   * Texto del label
   */
  label?: string;

  /**
   * Texto del placeholder
   */
  placeholder?: string;

  /**
   * Texto de ayuda (helper text)
   */
  helperText?: string;

  /**
   * Tamaño del input
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Estado del input
   * @default 'default'
   */
  state?: InputState;

  /**
   * Tipo de input
   * @default 'text'
   */
  type?: InputType;

  /**
   * Mostrar/ocultar label
   * @default true
   */
  showLabel?: boolean;

  /**
   * Mostrar/ocultar helper text (independiente del contador)
   * @default false
   */
  showHelper?: boolean;

  /**
   * Mostrar/ocultar contador de caracteres (independiente del helper text)
   * @default false
   */
  showCounter?: boolean;

  /**
   * Máximo de caracteres para el contador
   * @default 50
   */
  maxLength?: number;

  /**
   * Mostrar/ocultar barra de herramientas de texto enriquecido (solo para textarea)
   * @default false
   */
  showRichTextToolbar?: boolean;

  /**
   * Mostrar texto mandatory/optional
   * @default false
   */
  mandatory?: boolean;

  /**
   * Tipo de mandatory
   * @default 'obligatorio'
   */
  mandatoryType?: MandatoryType;

  /**
   * Icono izquierdo (nombre FontAwesome sin prefijo, ej: 'user' para 'fa-user')
   * Se agrega 'far' automáticamente
   */
  leftIcon?: string;

  /**
   * Icono derecho (nombre FontAwesome sin prefijo, ej: 'check' para 'fa-check')
   * Se agrega 'far' automáticamente
   */
  rightIcon?: string;

  /**
   * Opciones para SELECT (soporta scroll infinito automático con 50+ opciones)
   */
  selectOptions?: SelectOption[];

  /**
   * Opciones para AUTOCOMPLETE
   */
  autocompleteOptions?: AutocompleteOption[];

  /**
   * Valor inicial del input
   */
  value?: string;

  /**
   * Callback cuando cambia el valor
   */
  onChange?: (value: string, event?: Event) => void;

  /**
   * Callback cuando se enfoca
   */
  onFocus?: (value: string, event?: Event) => void;

  /**
   * Callback cuando se desenfoca
   */
  onBlur?: (value: string, event?: Event) => void;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Atributos HTML adicionales
   */
  attributes?: Record<string, string>;
}

