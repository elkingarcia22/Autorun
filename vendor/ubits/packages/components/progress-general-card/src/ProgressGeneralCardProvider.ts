/**
 * ProgressGeneralCardProvider
 * Lógica de renderizado del componente ProgressGeneralCard
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { ProgressGeneralCardOptions } from './types/ProgressGeneralCardOptions';
import { renderButton } from '../../button/src/ButtonProvider';

/**
 * Calcula el porcentaje de una categoría
 */
function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

/**
 * Resuelve un token CSS a su valor hexadecimal
 * Los SVG no siempre resuelven correctamente las variables CSS en atributos inline
 */
function resolveColorToken(token: string): string {
  if (typeof window === 'undefined' || !window.document || !window.getComputedStyle) {
    return token;
  }
  
  try {
    const root = document.documentElement;
    // Extraer el nombre del token (sin var() y sin espacios)
    const tokenName = token.replace(/var\(|\)/g, '').trim();
    
    const resolved = getComputedStyle(root).getPropertyValue(tokenName).trim();
    
    if (resolved) {
      // Limpiar cualquier carácter extra (como paréntesis)
      const cleaned = resolved.replace(/[()]/g, '').trim();
      return cleaned;
    } else {
      return token;
    }
  } catch (error) {
    // Error silencioso - retornar token original si falla
    return token;
  }
}

/**
 * Renderiza el SVG del donut chart circular
 */
function renderCircularProgress(
  percentage: number,
  size: number = 120,
  strokeWidth: number = 12,
  progressColor: string = 'var(--modifiers-normal-color-light-accent-brand)',
  backgroundColor: string = 'var(--modifiers-normal-color-light-bg-3)'
): string {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;
  
  // Resolver los colores antes de pasarlos al SVG
  const resolvedProgressColor = progressColor.startsWith('var(') 
    ? resolveColorToken(progressColor) 
    : progressColor;
  const resolvedBackgroundColor = backgroundColor.startsWith('var(') 
    ? resolveColorToken(backgroundColor) 
    : backgroundColor;
  
  return `
    <svg 
      class="ubits-progress-general-card__circle-svg" 
      width="${size}" 
      height="${size}" 
      viewBox="0 0 ${size} ${size}"
    >
      <!-- Círculo de fondo -->
      <circle
        cx="${center}"
        cy="${center}"
        r="${radius}"
        fill="none"
        stroke="${resolvedBackgroundColor}"
        stroke-width="${strokeWidth}"
      />
      <!-- Círculo de progreso -->
      <circle
        cx="${center}"
        cy="${center}"
        r="${radius}"
        fill="none"
        stroke="${resolvedProgressColor}"
        stroke-width="${strokeWidth}"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"
        stroke-linecap="round"
        transform="rotate(-90 ${center} ${center})"
        class="ubits-progress-general-card__circle-progress"
      />
    </svg>
  `;
}

/**
 * Renderiza una categoría de progreso
 */
function renderCategory(
  category: ProgressGeneralCardOptions['categories'][0],
  size: ProgressGeneralCardOptions['size'] = 'md'
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
    ? 'ubits-body-sm-bold'
    : size === 'lg'
    ? 'ubits-body-md-bold'
    : 'ubits-body-md-bold'; // md también usa body-md-bold
  
  return `
    <div class="ubits-progress-general-card__category">
      <div class="ubits-progress-general-card__category-label ${labelClass}">
        ${category.label}
      </div>
      <div class="ubits-progress-general-card__category-value ${valueClass}">
        ${category.current}/${category.total} <span class="ubits-progress-general-card__category-percentage ${percentageClass}">${percentage}%</span>
      </div>
    </div>
  `;
}

/**
 * Renderiza un ProgressGeneralCard como HTML string
 */
export function renderProgressGeneralCard(options: ProgressGeneralCardOptions): string {
  const {
    title = 'Progreso general',
    mainPercentage = 50,
    mainLabel = 'Ciclos',
    categories = [],
    layout = 'vertical',
    size = 'md',
    showTitle = true,
    showCircularProgress = true,
    showCategories = true,
    showInfoIcon = false,
    showActionButton = false,
    progressColor = 'var(--ubits-chart-color-bg-neutral-blue-base)',
    circleBackgroundColor = 'var(--modifiers-normal-color-light-bg-3)',
    className = '',
    attributes = {}
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-progress-general-card',
    `ubits-progress-general-card--${layout}`,
    `ubits-progress-general-card--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Tamaño del círculo fijo a 158px
  const circleSize = 158;
  const strokeWidth = 16; // Ancho del trazo proporcional
  
  // Clases de tipografía fijas
  const titleClass = 'ubits-body-md-bold';
  const percentageClass = 'ubits-heading-h2';
  const mainLabelClass = 'ubits-body-sm-bold';

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

  // Renderizar título
  const titleHTML = showTitle
    ? `
      <div class="ubits-progress-general-card__header">
        <div class="ubits-progress-general-card__title-group">
          <h3 class="ubits-progress-general-card__title ${titleClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-progress-general-card__action-button">${actionButtonHTML}</div>` : ''}
      </div>
    `
    : '';

  // Renderizar indicador circular
  const circularProgressHTML = showCircularProgress
    ? `
      <div class="ubits-progress-general-card__circle-wrapper">
        ${renderCircularProgress(
          mainPercentage,
          circleSize,
          strokeWidth,
          progressColor,
          circleBackgroundColor
        )}
        <div class="ubits-progress-general-card__circle-content">
          <div class="ubits-progress-general-card__circle-percentage ${percentageClass}">
            ${mainPercentage}%
          </div>
          <div class="ubits-progress-general-card__circle-label ${mainLabelClass}">
            ${mainLabel}
          </div>
        </div>
      </div>
    `
    : '';

  // Renderizar categorías
  const categoriesHTML = showCategories && categories.length > 0
    ? `
      <div class="ubits-progress-general-card__categories">
        ${categories.map(cat => renderCategory(cat, size)).join('')}
      </div>
    `
    : '';

  return `
    <div class="${classes}" ${attrs}>
      ${titleHTML}
      <div class="ubits-progress-general-card__content">
        ${circularProgressHTML}
        ${categoriesHTML}
      </div>
    </div>
  `;
}

/**
 * Crea un ProgressGeneralCard y lo inserta en el DOM
 */
export function createProgressGeneralCard(
  options: ProgressGeneralCardOptions & { containerId?: string }
): HTMLElement | null {
  const { containerId, ...cardOptions } = options;
  
  if (!containerId) {
    console.error('❌ [ProgressGeneralCard] containerId es requerido para createProgressGeneralCard');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [ProgressGeneralCard] Contenedor con ID "${containerId}" no encontrado`);
    return null;
  }
  
  // Renderizar el HTML
  const html = renderProgressGeneralCard(cardOptions);
  container.innerHTML = html;
  
  const cardElement = container.querySelector('.ubits-progress-general-card') as HTMLElement;
  
  if (!cardElement) {
    console.error('❌ [ProgressGeneralCard] No se pudo crear el elemento de la tarjeta');
    return null;
  }
  
  // Agregar event listeners
  if (cardOptions.onClick) {
    cardElement.addEventListener('click', cardOptions.onClick);
  }
  
  return cardElement;
}

