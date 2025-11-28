/**
 * ScoreCardMetricsProvider
 * Lógica de renderizado del componente ScoreCardMetrics
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { ScoreCardMetricsOptions } from './types/ScoreCardMetricsOptions';
import { renderButton } from '../../button/src/ButtonProvider';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular', iconColor?: string): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  const colorStyle = iconColor ? `style="color: ${iconColor};"` : '';
  return `<i class="${iconClass} ${name}" ${colorStyle}></i>`;
}

/**
 * Renderiza el gráfico de estrellas (0-5) con números debajo
 */
function renderStarRating(score: number): string {
  const totalStars = 5;
  const filledStars = Math.round(score); // Redondear al entero más cercano
  const emptyStars = totalStars - filledStars;
  
  let starsHTML = '';
  
  // Estrellas llenas
  for (let i = 0; i < filledStars; i++) {
    const starNumber = i + 1;
    starsHTML += `
      <div class="ubits-score-card-metrics__star-wrapper">
        <i class="fas fa-star ubits-score-card-metrics__star ubits-score-card-metrics__star--filled"></i>
        <span class="ubits-score-card-metrics__star-number">${starNumber}</span>
      </div>
    `;
  }
  
  // Estrellas vacías
  for (let i = 0; i < emptyStars; i++) {
    const starNumber = filledStars + i + 1;
    starsHTML += `
      <div class="ubits-score-card-metrics__star-wrapper">
        <i class="far fa-star ubits-score-card-metrics__star ubits-score-card-metrics__star--empty"></i>
        <span class="ubits-score-card-metrics__star-number">${starNumber}</span>
      </div>
    `;
  }
  
  return starsHTML;
}

/**
 * Renderiza un ScoreCardMetrics como HTML string
 */
export function renderScoreCardMetrics(options: ScoreCardMetricsOptions): string {
  const {
    title,
    totalResponses = 0,
    responsesLabel = 'respuestas',
    average = 0,
    averageLabel = 'Promedio:',
    score = 0,
    leftLabel = '0',
    rightLabel = '5',
    chartDescription = '0 a 5 del gráfico',
    titleIcon,
    titleIconStyle = 'regular',
    titleIconColor,
    showInfoIcon = false,
    showActionButton = false,
    size = 'md',
    className = '',
    attributes = {}
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-score-card-metrics',
    `ubits-score-card-metrics--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Renderizar icono del título si existe
  const titleIconHTML = titleIcon 
    ? `<div class="ubits-score-card-metrics__title-icon">${renderIconHelper(titleIcon, titleIconStyle, titleIconColor)}</div>`
    : '';

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

  // Clases de tipografía según tamaño (usando solo clases válidas UBITS)
  const titleSizeClass = 'ubits-body-md-bold';
  const statsClass = 'ubits-body-sm-regular';
  const labelsClass = 'ubits-body-sm-regular';
  const descriptionClass = 'ubits-body-sm-regular';

  // Formatear promedio con 2 decimales
  const formattedAverage = average.toFixed(2);

  // Renderizar gráfico de estrellas
  const starsHTML = renderStarRating(score);

  return `
    <div class="${classes}" ${attrs}>
      <div class="ubits-score-card-metrics__header">
        ${titleIconHTML}
        <div class="ubits-score-card-metrics__title-group">
          <h3 class="ubits-score-card-metrics__title ${titleSizeClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-score-card-metrics__action-button">${actionButtonHTML}</div>` : ''}
      </div>
      <div class="ubits-score-card-metrics__body">
        <div class="ubits-score-card-metrics__stats">
          <span class="ubits-score-card-metrics__responses ${statsClass}">${totalResponses} ${responsesLabel}</span>
          <span class="ubits-score-card-metrics__average ${statsClass}">${averageLabel} (${formattedAverage})</span>
        </div>
        <div class="ubits-score-card-metrics__chart">
          <div class="ubits-score-card-metrics__stars">
            ${starsHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Crea un ScoreCardMetrics y lo inserta en el DOM
 */
export function createScoreCardMetrics(options: ScoreCardMetricsOptions & { containerId?: string }): HTMLElement | null {
  const { containerId, ...cardOptions } = options;
  
  if (!containerId) {
    console.error('❌ [ScoreCardMetrics] containerId es requerido para createScoreCardMetrics');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [ScoreCardMetrics] Contenedor con ID "${containerId}" no encontrado`);
    return null;
  }
  
  // Renderizar el HTML
  const html = renderScoreCardMetrics(cardOptions);
  container.innerHTML = html;
  
  const cardElement = container.querySelector('.ubits-score-card-metrics') as HTMLElement;
  
  if (!cardElement) {
    console.error('❌ [ScoreCardMetrics] No se pudo crear el elemento de la tarjeta');
    return null;
  }
  
  // Agregar event listeners
  if (cardOptions.onClick) {
    cardElement.addEventListener('click', cardOptions.onClick);
  }
  
  console.log('✅ [ScoreCardMetrics] Tarjeta creada exitosamente');
  return cardElement;
}

