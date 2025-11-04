import type { ProgressOptions, ProgressSegment } from './types/ProgressOptions';

/**
 * Mapeo de colores de segmentos a tokens UBITS
 */
const COLOR_TOKENS: Record<string, string> = {
  yellow: 'var(--ubits-feedback-accent-warning, #f5a623)',
  green: 'var(--ubits-feedback-accent-success, #4ab028)',
  gray: 'var(--ubits-bg-4, #dbdde0)',
  info: 'var(--ubits-accent-brand, #0c5bef)',
  error: 'var(--ubits-feedback-accent-error, #cf0e34)'
};

/**
 * Tamaños del progress bar en píxeles
 */
const PROGRESS_SIZES: Record<string, { height: number; indicatorFontSize: string }> = {
  xs: { height: 4, indicatorFontSize: 'var(--font-body-xs-size, 11px)' },
  sm: { height: 8, indicatorFontSize: 'var(--font-body-sm-size, 13px)' },
  md: { height: 16, indicatorFontSize: 'var(--font-body-md-size, 16px)' },
  lg: { height: 20, indicatorFontSize: 'var(--font-body-lg-size, 18px)' }
};

/**
 * Renderiza el HTML del progress bar
 */
export function renderProgressBar(options: ProgressOptions): string {
  const {
    size = 'md',
    value = 0,
    variant = 'default',
    segments = [],
    indicator,
    className = ''
  } = options;

  const sizeConfig = PROGRESS_SIZES[size];
  const classes = [
    'ubits-progress-bar',
    `ubits-progress-bar--${size}`,
    variant === 'multi-color' ? 'ubits-progress-bar--multi-color' : '',
    className
  ].filter(Boolean).join(' ');

  let indicatorHtml = '';
  if (indicator !== undefined && indicator !== false) {
    const indicatorText = typeof indicator === 'string' ? indicator : `${Math.round(value)}%`;
    indicatorHtml = `<span class="ubits-progress-bar__indicator">${indicatorText}</span>`;
  }

  let progressIndicatorHtml = '';
  
  if (variant === 'multi-color' && segments.length > 0) {
    // Calcular el total de los segmentos para normalizar
    const total = segments.reduce((sum, seg) => sum + seg.value, 0);
    
    // Generar segmentos
    const segmentsHtml = segments.map((segment, index) => {
      const width = total > 0 ? (segment.value / total) * 100 : 0;
      const color = COLOR_TOKENS[segment.color] || COLOR_TOKENS.gray;
      
      return `<div 
        class="ubits-progress-bar__segment" 
        style="width: ${width}%; background-color: ${color};"
        data-color="${segment.color}"
      ></div>`;
    }).join('');
    
    progressIndicatorHtml = `<div class="ubits-progress-bar__indicator-wrapper">${segmentsHtml}</div>`;
  } else {
    // Variante default con un solo color
    const clampedValue = Math.max(0, Math.min(100, value));
    progressIndicatorHtml = `<div 
      class="ubits-progress-bar__indicator-wrapper" 
      style="width: ${clampedValue}%;"
    ></div>`;
  }

  return `
    <div class="${classes}" style="height: ${sizeConfig.height}px;">
      <div class="ubits-progress-bar__container">
        ${progressIndicatorHtml}
      </div>
      ${indicatorHtml}
    </div>
  `.trim();
}

/**
 * Crea un elemento DOM del progress bar y lo inserta en el contenedor
 */
export function createProgressBar(options: ProgressOptions): {
  element: HTMLElement;
  update: (newOptions: Partial<ProgressOptions>) => void;
  destroy: () => void;
} {
  const {
    containerId,
    ...restOptions
  } = options;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderProgressBar(restOptions);
  const progressBarElement = wrapper.firstElementChild as HTMLElement;

  if (!progressBarElement) {
    throw new Error('No se pudo crear el progress bar');
  }

  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  container.appendChild(progressBarElement);

  /**
   * Actualiza el progress bar con nuevas opciones
   */
  const update = (newOptions: Partial<ProgressOptions>) => {
    const updatedOptions = { ...restOptions, ...newOptions };
    const newHtml = renderProgressBar(updatedOptions);
    const newWrapper = document.createElement('div');
    newWrapper.innerHTML = newHtml;
    const newElement = newWrapper.firstElementChild as HTMLElement;
    
    if (newElement && progressBarElement.parentNode) {
      progressBarElement.parentNode.replaceChild(newElement, progressBarElement);
      Object.assign(progressBarElement, newElement);
    }
  };

  /**
   * Destruye el progress bar removiéndolo del DOM
   */
  const destroy = () => {
    if (progressBarElement.parentNode) {
      progressBarElement.parentNode.removeChild(progressBarElement);
    }
  };

  return {
    element: progressBarElement,
    update,
    destroy
  };
}

