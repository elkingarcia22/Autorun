/**
 * BarMetricCardProvider
 * Lógica de renderizado del componente BarMetricCard
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { BarMetricCardOptions } from './types/BarMetricCardOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { renderProgressBar } from '../../progress/src/ProgressProvider';

/**
 * Calcula el porcentaje de una categoría
 */
function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

/**
 * Calcula el valor máximo y mínimo para el gráfico
 */
function calculateChartRange(barData: number[]): { max: number; min: number } {
  if (barData.length === 0) return { max: 100, min: 0 };
  
  const max = Math.max(...barData);
  const min = Math.min(...barData);
  
  // Redondear a múltiplos de 20 para mejor visualización
  const roundedMax = Math.ceil(max / 20) * 20;
  const roundedMin = Math.floor(min / 20) * 20;
  
  return { 
    max: roundedMax || 100, 
    min: roundedMin || 0 
  };
}

/**
 * Mapeo de tamaños a anchos de barras (basado en las alturas de los progress bars)
 * Esto asegura consistencia entre barras horizontales y verticales
 */
const BAR_WIDTHS_BY_SIZE: Record<string, number> = {
  xs: 4,  // Igual que la altura del progress bar xs
  sm: 8,  // Igual que la altura del progress bar sm
  md: 16, // Igual que la altura del progress bar md
  lg: 20  // Igual que la altura del progress bar lg
};

/**
 * Renderiza el SVG del gráfico de barras
 */
function renderBarChart(
  barData: number[],
  barLabels: string[] = [],
  maxValue?: number,
  minValue?: number,
  barColor: string = 'var(--ubits-chart-color-bg-neutral-blue-base)',
  chartBackgroundColor: string = 'var(--modifiers-normal-color-light-bg-1)',
  gridLineColor: string = 'var(--modifiers-normal-color-light-border-1)',
  width: number = 360,
  height: number = 158,
  showNegativeValues: boolean = true,
  showGridLines: boolean = true,
  size: BarMetricCardOptions['size'] = 'md'
): string {
  // Si showNegativeValues es false, filtrar valores negativos para el cálculo del rango
  const dataForRange = showNegativeValues ? barData : barData.filter(v => v >= 0);
  const range = maxValue !== undefined && minValue !== undefined
    ? { max: maxValue, min: showNegativeValues ? minValue : 0 }
    : calculateChartRange(dataForRange);
  
  const { max, min } = range;
  const rangeSize = max - min;
  const barCount = barData.length;
  
  // Calcular padding de manera fija pero proporcional
  // Padding izquierdo aumentado para dar más espacio entre la primera barra y los labels del eje Y
  const paddingLeft = Math.max(30, Math.min(35, width * 0.08));
  
  // Padding derecho mínimo para que las barras no toquen el borde
  const paddingRight = 4;
  const paddingTop = 8;
  const paddingBottom = 25; // Espacio para labels del eje X
  
  // El área de barras debe ocupar TODO el espacio disponible
  const barsAreaWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  const zeroY = paddingTop + (max / rangeSize) * chartHeight; // Posición de Y=0
  
  // Primero, identificar qué barras se van a renderizar (filtrar las que no se muestran)
  const barsToRender = barData.map((value, index) => {
    const isPositive = value >= 0;
    const displayValue = showNegativeValues ? value : Math.max(0, value);
    const displayIsPositive = displayValue >= 0;
    
    let barHeightValue: number;
    
    if (displayIsPositive) {
      barHeightValue = (displayValue / max) * (zeroY - paddingTop);
    } else {
      const minAbs = Math.abs(min);
      barHeightValue = (Math.abs(displayValue) / minAbs) * (paddingTop + chartHeight - zeroY);
    }
    
    // Determinar si esta barra se renderiza
    const shouldRender = barHeightValue >= 0.5 && Math.abs(displayValue) >= 0.01;
    
    return {
      index,
      value: displayValue,
      label: barLabels[index] || `${index + 1}`,
      isPositive: displayIsPositive,
      shouldRender
    };
  });
  
  // Filtrar solo las barras que se van a renderizar
  const renderableBars = barsToRender.filter(bar => bar.shouldRender);
  const renderableBarCount = renderableBars.length;
  
  // Si no hay barras para renderizar, retornar SVG vacío
  if (renderableBarCount === 0) {
    return `
      <svg 
        class="ubits-bar-metric-card__chart-svg" 
        width="100%" 
        height="100%" 
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="none"
      >
      </svg>
    `;
  }
  
  // Distribuir el espacio disponible de manera uniforme entre las barras que SÍ se renderizan
  // Las barras mantienen un ancho fijo basado en el tamaño, pero se distribuyen uniformemente en todo el ancho
  const totalGaps = renderableBarCount - 1;
  
  // Ancho de barra basado en el tamaño (consistente con los progress bars horizontales)
  const barWidth = BAR_WIDTHS_BY_SIZE[size] || BAR_WIDTHS_BY_SIZE.md;
  
  
  // Gap base entre barras
  const baseGapSize = 6; // Gap base mínimo entre barras
  
  // Calcular el espacio total que ocuparían las barras con el gap base
  const totalBarsWidth = renderableBarCount * barWidth;
  const totalBaseGapsWidth = totalGaps * baseGapSize;
  const totalBaseUsedWidth = totalBarsWidth + totalBaseGapsWidth;
  
  // Agregar espacio adicional después de la línea del eje Y antes de la primera barra
  const spaceAfterYAxis = 8; // Espacio adicional entre la línea del eje Y y la primera barra
  const adjustedPaddingLeft = paddingLeft + spaceAfterYAxis;
  
  // Recalcular el área de barras con el nuevo padding ajustado
  const adjustedBarsAreaWidth = width - adjustedPaddingLeft - paddingRight;
  
  // Calcular el espacio extra disponible para distribuir (usando el área ajustada)
  const extraSpace = adjustedBarsAreaWidth - totalBaseUsedWidth;
  
  // Si hay espacio extra, distribuirlo uniformemente aumentando el gap entre barras
  // Esto mantiene las barras delgadas pero las distribuye en todo el ancho
  const gapSize = totalGaps > 0 
    ? baseGapSize + (extraSpace / totalGaps) 
    : 0;
  
  // Calcular el espacio total usado con el nuevo gap
  const totalGapsWidth = totalGaps * gapSize;
  const totalUsedWidth = totalBarsWidth + totalGapsWidth;
  
  
  // Calcular posiciones de las barras que se van a renderizar
  // Distribuir uniformemente en el espacio disponible manteniendo barras delgadas
  const bars = renderableBars.map((barInfo, renderIndex) => {
    // Calcular posición X: padding izquierdo ajustado + (índice * (ancho de barra + gap calculado))
    // El gap se ajusta automáticamente para distribuir las barras en todo el ancho
    const x = adjustedPaddingLeft + renderIndex * (barWidth + gapSize);
    
    // Log detallado para todas las barras (especialmente la primera)
    // Logs de debugging removidos
    
    // Calcular altura y posición Y
    let barY: number;
    let barHeightValue: number;
    
    if (barInfo.isPositive) {
      barHeightValue = (barInfo.value / max) * (zeroY - paddingTop);
      barY = zeroY - barHeightValue;
    } else {
      const minAbs = Math.abs(min);
      barHeightValue = (Math.abs(barInfo.value) / minAbs) * (paddingTop + chartHeight - zeroY);
      barY = zeroY;
    }
    
    return {
      x,
      y: barY,
      width: barWidth,
      height: barHeightValue,
      value: barInfo.value,
      label: barInfo.label,
      isPositive: barInfo.isPositive,
      index: barInfo.index // Agregar index para los logs
    };
  });
  
  // Generar líneas de grilla y números del eje Y (siempre calcular los números, las líneas solo si showGridLines)
  const gridLines = [];
  const gridSteps = 5;
  for (let i = 0; i <= gridSteps; i++) {
    const value = min + (rangeSize / gridSteps) * i;
    const y = paddingTop + ((max - value) / rangeSize) * chartHeight;
    gridLines.push({
      y,
      value: Math.round(value)
    });
  }
  
  // Log de dimensiones finales después de calcular las barras
  const lastBar = bars[bars.length - 1];
  const lastBarEnd = lastBar ? (lastBar.x + lastBar.width) : 0;
  const firstBar = bars[0];
  
  // Calcular distancia entre la línea del eje Y y la primera barra
  const yAxisLineX = paddingLeft;
  const firstBarStartX = firstBar?.x || 0;
  const actualSpaceBetween = firstBarStartX - yAxisLineX;
  
  return `
    <svg 
      class="ubits-bar-metric-card__chart-svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 ${width} ${height}"
      preserveAspectRatio="none"
    >
      <!-- Números del eje Y (siempre visibles) -->
      ${gridLines.map(line => `
        <text
          x="${paddingLeft - 5}"
          y="${line.y + 4}"
          font-family="var(--font-sans)"
          font-size="var(--font-body-sm-size, 13px)"
          font-weight="var(--weight-regular, 400)"
          fill="var(--modifiers-normal-color-light-fg-2-medium)"
          text-anchor="end"
          style="font-size: var(--font-body-sm-size, 13px) !important; font-weight: var(--weight-regular, 400) !important;"
        >${line.value}</text>
      `).join('')}
      
      <!-- Líneas de grilla horizontales (solo si showGridLines está activado) -->
      ${showGridLines ? gridLines.map(line => `
        <line
          x1="${adjustedPaddingLeft}"
          y1="${line.y}"
          x2="${width - paddingRight}"
          y2="${line.y}"
          stroke="${gridLineColor}"
          stroke-width="1"
          stroke-dasharray="2,2"
          opacity="0.3"
        />
      `).join('') : ''}
      
      <!-- Línea cero si hay valores negativos y positivos -->
      ${showGridLines && min < 0 && max > 0 ? `
        <line
          x1="${adjustedPaddingLeft}"
          y1="${zeroY}"
          x2="${width - paddingRight}"
          y2="${zeroY}"
          stroke="${gridLineColor}"
          stroke-width="1.5"
          opacity="0.6"
        />
      ` : ''}
      
      <!-- Línea vertical del eje Y -->
      ${showGridLines ? `
        <line
          x1="${paddingLeft}"
          y1="${paddingTop}"
          x2="${paddingLeft}"
          y2="${height - paddingBottom}"
          stroke="${gridLineColor}"
          stroke-width="1"
          opacity="0.6"
        />
      ` : ''}
      
      <!-- Barras -->
      ${bars.map((bar) => {
        // Para barras positivas: redondear solo la parte superior (top)
        // Para barras negativas: redondear solo la parte inferior (bottom)
        // Radio de redondeo: usar la mitad del ancho de la barra para hacer las puntas bien redondeadas (semicirculares)
        const rx = bar.width / 2; // Siempre usar la mitad del ancho para puntas completamente redondeadas (semicirculares)
        const isPositive = bar.isPositive;
        
        // Crear path con esquinas redondeadas solo en el lado que toca el eje cero
        let path: string;
        
        if (isPositive) {
          // Barra positiva: redondear arriba (top-left y top-right) - como en la imagen
          const x1 = bar.x;
          const y1 = bar.y;
          const x2 = bar.x + bar.width;
          const y2 = bar.y;
          const x3 = bar.x + bar.width;
          const y3 = bar.y + bar.height;
          const x4 = bar.x;
          const y4 = bar.y + bar.height;
          
          path = `M ${x1} ${y1 + rx} Q ${x1} ${y1} ${x1 + rx} ${y1} L ${x2 - rx} ${y1} Q ${x2} ${y1} ${x2} ${y1 + rx} L ${x2} ${y3} L ${x1} ${y3} Z`;
        } else {
          // Barra negativa: redondear abajo (bottom-left y bottom-right)
          const x1 = bar.x;
          const y1 = bar.y;
          const x2 = bar.x + bar.width;
          const y2 = bar.y;
          const x3 = bar.x + bar.width;
          const y3 = bar.y + bar.height;
          const x4 = bar.x;
          const y4 = bar.y + bar.height;
          
          path = `M ${x1} ${y1} L ${x2} ${y2} L ${x2} ${y3 - rx} Q ${x2} ${y3} ${x2 - rx} ${y3} L ${x1 + rx} ${y3} Q ${x1} ${y3} ${x1} ${y3 - rx} Z`;
        }
        
        const fillValue = barColor;
        
        return `
        <g class="ubits-bar-metric-card__bar-group">
          <path
            d="${path}"
            fill="${fillValue}"
            class="ubits-bar-metric-card__bar"
          />
          <text
          x="${bar.x + bar.width / 2}"
          y="${height - 5}"
          font-family="var(--font-sans)"
          font-size="var(--font-body-sm-size, 13px)"
          font-weight="var(--weight-regular, 400)"
          class="ubits-bar-metric-card__bar-label"
          fill="var(--modifiers-normal-color-light-fg-2-medium)"
          text-anchor="middle"
          style="font-size: var(--font-body-sm-size, 13px) !important; font-weight: var(--weight-regular, 400) !important; font-family: var(--font-sans) !important;"
        >${bar.label}</text>
        </g>
      `;
      }).join('')}
    </svg>
  `;
}

/**
 * Renderiza una categoría de métrica (versión estándar)
 */
function renderCategory(
  category: BarMetricCardOptions['categories'][0],
  size: BarMetricCardOptions['size'] = 'md'
): string {
  const percentage = category.percentage ?? calculatePercentage(category.current, category.total);
  
  // Clases de tipografía según tamaño
  const labelClass = size === 'sm' 
    ? 'ubits-body-sm-regular' 
    : size === 'lg' 
    ? 'ubits-body-md-regular' 
    : 'ubits-body-sm-regular';
  
  const valueClass = size === 'sm'
    ? 'ubits-body-sm-regular'
    : size === 'lg'
    ? 'ubits-body-md-regular'
    : 'ubits-body-sm-regular';
  
  const percentageClass = size === 'sm'
    ? 'ubits-body-md-bold'
    : size === 'lg'
    ? 'ubits-body-md-bold'
    : 'ubits-body-md-bold';
  
  return `
    <div class="ubits-bar-metric-card__category">
      <div class="ubits-bar-metric-card__category-label ${labelClass}">
        ${category.label}
      </div>
      <div class="ubits-bar-metric-card__category-value ${valueClass}">
        ${category.current}/${category.total} <span class="ubits-bar-metric-card__category-percentage ${percentageClass}">${percentage}%</span>
      </div>
    </div>
  `;
}

/**
 * Renderiza una categoría de métrica con progress bar horizontal
 */
function renderCategoryWithProgressBar(
  category: BarMetricCardOptions['categories'][0],
  size: BarMetricCardOptions['size'] = 'md',
  barColor: string = 'var(--ubits-chart-color-bg-neutral-blue-base)'
): string {
  const percentage = category.percentage ?? calculatePercentage(category.current, category.total);
  
  // Clases de tipografía según tamaño
  const labelClass = size === 'sm' 
    ? 'ubits-body-sm-regular' 
    : size === 'lg' 
    ? 'ubits-body-md-regular' 
    : 'ubits-body-sm-regular';
  
  const valueClass = size === 'sm'
    ? 'ubits-body-sm-regular'
    : size === 'lg'
    ? 'ubits-body-md-regular'
    : 'ubits-body-sm-regular';
  
  const percentageClass = size === 'sm'
    ? 'ubits-body-md-bold'
    : size === 'lg'
    ? 'ubits-body-md-bold'
    : 'ubits-body-md-bold';
  
  // Mapear el tamaño de la card al tamaño del progress bar
  const progressBarSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  
  // Renderizar el progress bar sin indicador primero
  const progressBarHTML = renderProgressBar({
    size: progressBarSize,
    value: percentage,
    variant: 'default',
    indicator: false, // No usar el indicador por defecto, lo agregaremos manualmente
    className: 'ubits-bar-metric-card__progress-bar'
  });
  
  // Crear el indicador personalizado con el porcentaje en bold
  const indicatorHTML = `<span class="ubits-progress-bar__indicator">${category.current}/${category.total} <span class="${percentageClass}">${percentage}%</span></span>`;
  
  // Insertar el indicador personalizado después del container del progress bar
  // El HTML del progress bar tiene esta estructura: <div class="..."><div class="container">...</div></div>
  // Necesitamos insertar el indicador después del cierre del container pero antes del cierre del div principal
  // Buscar específicamente el cierre del container (ubits-progress-bar__container)
  const progressBarWithIndicator = progressBarHTML.replace(
    /(<\/div>\s*)(<\/div>\s*)$/,
    `$1${indicatorHTML}$2`
  );
  
  // Debug: verificar que el indicador se insertó correctamente
  
  return `
    <div class="ubits-bar-metric-card__category ubits-bar-metric-card__category--with-progress">
      <div class="ubits-bar-metric-card__category-header">
        <div class="ubits-bar-metric-card__category-label ${labelClass}">
          ${category.label}
        </div>
      </div>
      <div class="ubits-bar-metric-card__category-progress-wrapper">
        ${progressBarWithIndicator}
      </div>
    </div>
  `;
}

/**
 * Renderiza un BarMetricCard como HTML string
 */
export function renderBarMetricCard(options: BarMetricCardOptions): string {
  const {
    title = 'Métricas',
    responseCount = 0,
    showResponseCount = false,
    barData = [],
    barLabels = [],
    maxValue,
    minValue,
    categories = [],
    layout = 'vertical',
    size = 'md',
    showTitle = true,
    showBarChart = true,
    showCategories = true,
    showInfoIcon = true,
    showActionButton = true,
    showNegativeValues = true,
    showGridLines = true,
    barColor = 'var(--ubits-chart-color-bg-neutral-blue-base)',
    chartBackgroundColor = 'var(--modifiers-normal-color-light-bg-1)',
    gridLineColor = 'var(--modifiers-normal-color-light-border-1)',
    className = '',
    attributes = {}
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-bar-metric-card',
    `ubits-bar-metric-card--${layout}`,
    `ubits-bar-metric-card--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Dimensiones del gráfico - usar 100% del ancho disponible
  // El gráfico será responsivo y ocupará todo el espacio de la card
  const cardPadding = 12;
  // Calcular el ancho del gráfico basándose en el ancho de la card (392px por defecto según CSS)
  // Restar el padding izquierdo y derecho de la card (12px cada lado = 24px total)
  // El ancho base de la card es 392px según el CSS, entonces: 392 - 24 = 368px
  // Pero si la card se escala, el SVG se ajustará automáticamente con width="100%"
  const baseCardWidth = 392; // Ancho base de la card según CSS
  const chartWidth = baseCardWidth - (cardPadding * 2); // 392 - 24 = 368px
  const chartHeight = 158;
  
  
  // Clases de tipografía fijas
  const titleClass = 'ubits-body-md-bold';

  // Renderizar icono de información como botón terciario si está habilitado
  const infoIconHTML = showInfoIcon
    ? renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'circle-info',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'aria-label': 'Información',
          'type': 'button'
        }
      })
    : '';

  // Renderizar botón de acción con flecha a la derecha en la esquina superior derecha
  const actionButtonHTML = showActionButton
    ? renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'chevron-right',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'aria-label': 'Ver más',
          'type': 'button'
        }
      })
    : '';

  // Renderizar cantidad de respuestas
  const responseCountHTML = showResponseCount && responseCount !== undefined
    ? `
      <div class="ubits-bar-metric-card__response-count">
        <span class="ubits-body-xs-regular">${responseCount} ${responseCount === 1 ? 'respuesta' : 'respuestas'}</span>
      </div>
    `
    : '';

  // Renderizar título
  const titleHTML = showTitle
    ? `
      <div class="ubits-bar-metric-card__header">
        <div class="ubits-bar-metric-card__title-group">
          <h3 class="ubits-bar-metric-card__title ${titleClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-bar-metric-card__action-button">${actionButtonHTML}</div>` : ''}
      </div>
      ${responseCountHTML}
    `
    : '';

  // Resolver el valor real del token de color antes de pasarlo al SVG
  // Los SVG no siempre resuelven correctamente las variables CSS en atributos inline
  const resolveColorToken = (token: string): string => {
    if (typeof window !== 'undefined' && window.document && window.getComputedStyle) {
      try {
        const root = document.documentElement;
        // Extraer el nombre del token (sin var() y sin espacios)
        const tokenName = token.replace(/var\(|\)/g, '').trim();
        
        const resolved = getComputedStyle(root).getPropertyValue(tokenName).trim();
        
        if (resolved) {
          // Limpiar cualquier paréntesis extra que pueda haber quedado
          const cleaned = resolved.replace(/\)+$/, '').trim();
          return cleaned;
        } else {
          // Intentar leer directamente del CSS
          const allStyles = Array.from(document.styleSheets);
          let foundValue = null;
          for (const sheet of allStyles) {
            try {
              const rules = Array.from(sheet.cssRules || []);
              for (const rule of rules) {
                if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
                  const style = rule.style;
                  const value = style.getPropertyValue(tokenName);
                  if (value) {
                    foundValue = value.trim().replace(/\)+$/, '').trim(); // Limpiar paréntesis extra
                    break;
                  }
                }
              }
              if (foundValue) break;
            } catch (e) {
              // Silenciar errores de lectura de stylesheet
            }
          }
          
          if (foundValue) {
            return foundValue;
          }
        }
      } catch (e) {
        // Silenciar errores de resolución de token
      }
    }
    
    // Fallback: si el token es el esperado, usar el valor directo del token
    if (token === 'var(--ubits-chart-color-bg-neutral-blue-base)') {
      return '#557593'; // Valor del token según tokens.css
    }
    
    // Limpiar cualquier paréntesis extra que pueda haber quedado
    const cleaned = token.replace(/\)+$/, '').trim();
    if (cleaned !== token) {
      return cleaned;
    }
    
    // Fallback al token original si no se puede resolver
    return token;
  };
  
  let resolvedBarColor = barColor.startsWith('var(') ? resolveColorToken(barColor) : barColor;
  
  // Limpiar cualquier paréntesis extra que pueda haber quedado
  resolvedBarColor = resolvedBarColor.replace(/\)+$/, '').trim();

  // Renderizar gráfico de barras
  // En layout horizontal, no mostrar el gráfico SVG (solo progress bars)
  const barChartHTML = showBarChart && barData.length > 0 && layout !== 'horizontal'
    ? (() => {
        const chartHTML = renderBarChart(
          barData,
          barLabels,
          maxValue,
          minValue,
          resolvedBarColor,
          chartBackgroundColor,
          gridLineColor,
          chartWidth,
          chartHeight,
          options.showNegativeValues !== undefined ? options.showNegativeValues : true,
          options.showGridLines !== undefined ? options.showGridLines : true,
          size // Pasar el tamaño para que las barras tengan el grosor correcto
        );
        
        
        return `
          <div class="ubits-bar-metric-card__chart-wrapper" style="background-color: ${chartBackgroundColor};">
            <div class="ubits-bar-metric-card__chart-inner">
              ${chartHTML}
            </div>
          </div>
        `;
      })()
    : '';

  // Renderizar categorías
  // Si el layout es horizontal, usar progress bars en lugar de la versión estándar
  const categoriesHTML = showCategories && categories.length > 0
    ? (() => {
        if (layout === 'horizontal') {
          // Usar progress bars para layout horizontal
          return `
            <div class="ubits-bar-metric-card__categories">
              ${categories.map(cat => renderCategoryWithProgressBar(cat, size, resolvedBarColor)).join('')}
            </div>
          `;
        } else {
          // Usar versión estándar para layout vertical
          return `
            <div class="ubits-bar-metric-card__categories">
              ${categories.map(cat => renderCategory(cat, size)).join('')}
            </div>
          `;
        }
      })()
    : '';

  return `
    <div class="${classes}" ${attrs}>
      ${titleHTML}
      <div class="ubits-bar-metric-card__content">
        ${barChartHTML}
        ${categoriesHTML}
      </div>
    </div>
  `;
}

/**
 * Crea un BarMetricCard y lo inserta en el DOM
 */
export function createBarMetricCard(
  options: BarMetricCardOptions & { containerId?: string }
): HTMLElement | null {
  const { containerId, ...cardOptions } = options;
  
  if (!containerId) {
    console.error('❌ [BarMetricCard] containerId es requerido para createBarMetricCard');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [BarMetricCard] Contenedor con ID "${containerId}" no encontrado`);
    return null;
  }
  
  // Renderizar el HTML
  const html = renderBarMetricCard(cardOptions);
  container.innerHTML = html;
  
  const cardElement = container.querySelector('.ubits-bar-metric-card') as HTMLElement;
  
  if (!cardElement) {
    console.error('❌ [BarMetricCard] No se pudo crear el elemento de la tarjeta');
    return null;
  }
  
  // Agregar event listeners
  if (cardOptions.onClick) {
    cardElement.addEventListener('click', cardOptions.onClick);
  }
  
  return cardElement;
}

