/**
 * Tipos TypeScript para el componente Slider
 */

export type SliderOrientation = 'horizontal' | 'vertical';

export type SliderSize = 'xs' | 'sm' | 'md' | 'lg';

export type SliderState = 'default' | 'disabled';

export type SliderMode = 'single' | 'range';

export interface SliderOptions {
  /**
   * ID del contenedor donde se renderizará el slider (REQUERIDO)
   */
  containerId: string;

  /**
   * Texto del label
   */
  label?: string;

  /**
   * Texto de ayuda (helper text)
   */
  helperText?: string;

  /**
   * Tamaño del slider
   * @default 'md'
   */
  size?: SliderSize;

  /**
   * Estado del slider
   * @default 'default'
   */
  state?: SliderState;

  /**
   * Orientación del slider
   * @default 'horizontal'
   */
  orientation?: SliderOrientation;

  /**
   * Modo del slider: single (un valor) o range (dos valores)
   * @default 'single'
   */
  mode?: SliderMode;

  /**
   * Valor mínimo
   * @default 0
   */
  min?: number;

  /**
   * Valor máximo
   * @default 100
   */
  max?: number;

  /**
   * Paso (step) del slider
   * @default 1
   */
  step?: number;

  /**
   * Valor inicial (para modo single)
   */
  value?: number;

  /**
   * Valores iniciales (para modo range) [min, max]
   */
  values?: [number, number];

  /**
   * Mostrar inputs numéricos
   * @default false
   */
  showInputs?: boolean;

  /**
   * Mostrar/ocultar label
   * @default true
   */
  showLabel?: boolean;

  /**
   * Mostrar/ocultar helper text
   * @default false
   */
  showHelper?: boolean;

  /**
   * Mostrar marcas/ticks en el slider
   * @default false
   */
  showMarks?: boolean;

  /**
   * Valores donde mostrar marcas (si showMarks es true)
   */
  marks?: number[];

  /**
   * Mostrar guía visual del rango debajo del slider (ej: 0 - 100)
   * @default false
   */
  showRangeGuide?: boolean;

  /**
   * Callback cuando cambia el valor (modo single)
   */
  onChange?: (value: number, event?: Event) => void;

  /**
   * Callback cuando cambian los valores (modo range)
   */
  onRangeChange?: (values: [number, number], event?: Event) => void;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Atributos HTML adicionales
   */
  attributes?: Record<string, string>;
}

