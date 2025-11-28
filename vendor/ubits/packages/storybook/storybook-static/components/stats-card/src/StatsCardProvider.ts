/**
 * StatsCardProvider
 * Lógica de renderizado del componente StatsCard
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { StatsCardOptions, StatItem } from './types/StatsCardOptions';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular', iconColor?: string): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  const colorStyle = iconColor ? `style="color: ${iconColor};"` : '';
  return `<i class="${iconClass} ${name}" ${colorStyle}></i>`;
}

// Helper para formatear valores numéricos
function formatValue(value: string | number): string {
  if (typeof value === 'number') {
    // Formatear números grandes con separadores de miles
    return value.toLocaleString('es-ES');
  }
  return String(value);
}

// Renderizar un item de estadística individual
function renderStatItem(item: StatItem, size: StatsCardOptions['size'] = 'md'): string {
  const { label, value, icon, iconStyle = 'regular', iconColor, change, description } = item;
  
  const formattedValue = formatValue(value);
  
  // Clases de tamaño para tipografía
  const valueSizeClass = size === 'sm' ? 'ubits-body-sm' : size === 'lg' ? 'ubits-body-lg' : 'ubits-body-md';
  const labelSizeClass = size === 'sm' ? 'ubits-body-xs' : 'ubits-body-sm';
  
  // Renderizar icono si existe
  const iconHTML = icon ? renderIconHelper(icon, iconStyle, iconColor) : '';
  
  // Renderizar cambio/tendencia si existe
  let changeHTML = '';
  if (change) {
    const changeType = change.type;
    const changeClass = changeType === 'increase' ? 'ubits-stats-card__change--increase' 
                     : changeType === 'decrease' ? 'ubits-stats-card__change--decrease'
                     : 'ubits-stats-card__change--neutral';
    const changeIcon = changeType === 'increase' ? 'arrow-up' 
                    : changeType === 'decrease' ? 'arrow-down'
                    : 'minus';
    const changeLabel = change.label || `${Math.abs(change.value)}%`;
    
    changeHTML = `
      <div class="ubits-stats-card__change ${changeClass}">
        ${renderIconHelper(changeIcon, 'solid')}
        <span class="${labelSizeClass}">${changeLabel}</span>
      </div>
    `;
  }
  
  // Renderizar descripción si existe
  const descriptionHTML = description 
    ? `<p class="ubits-stats-card__description ${labelSizeClass}">${description}</p>`
    : '';
  
  return `
    <div class="ubits-stats-card__item">
      ${iconHTML ? `<div class="ubits-stats-card__icon">${iconHTML}</div>` : ''}
      <div class="ubits-stats-card__content">
        <div class="ubits-stats-card__label ${labelSizeClass}">${label}</div>
        <div class="ubits-stats-card__value ${valueSizeClass}">${formattedValue}</div>
        ${changeHTML}
        ${descriptionHTML}
      </div>
    </div>
  `;
}

/**
 * Renderiza un StatsCard como HTML string
 */
export function renderStatsCard(options: StatsCardOptions): string {
  const {
    title,
    variant = 'default',
    size = 'md',
    stats,
    layout = 'grid',
    columns = 2,
    bordered = true,
    elevated = false,
    className = '',
    attributes = {},
    showAction = false,
    actionLabel = 'Ver más'
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-stats-card',
    `ubits-stats-card--${variant}`,
    `ubits-stats-card--${size}`,
    `ubits-stats-card--${layout}`,
    bordered && 'ubits-stats-card--bordered',
    elevated && 'ubits-stats-card--elevated',
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Renderizar título si existe
  const titleHTML = title 
    ? `<div class="ubits-stats-card__header">
         <h3 class="ubits-stats-card__title ubits-heading-h3">${title}</h3>
         ${showAction ? `
           <button class="ubits-stats-card__action" type="button" aria-label="${actionLabel}">
             ${renderIconHelper('chevron-right', 'solid')}
           </button>
         ` : ''}
       </div>`
    : '';

  // Renderizar items de estadísticas
  const statsHTML = stats.map(item => renderStatItem(item, size)).join('');
  
  // Clases de grid según número de columnas
  const gridClass = layout === 'grid' ? `ubits-stats-card__grid ubits-stats-card__grid--${columns}` : '';
  const containerClass = layout === 'grid' ? gridClass : 'ubits-stats-card__list';

  return `
    <div class="${classes}" ${attrs}>
      ${titleHTML}
      <div class="ubits-stats-card__body">
        <div class="${containerClass}">
          ${statsHTML}
        </div>
      </div>
    </div>
  `;
}

/**
 * Crea un StatsCard y lo inserta en el DOM
 */
export function createStatsCard(options: StatsCardOptions & { containerId?: string }): HTMLElement | null {
  const { containerId, ...cardOptions } = options;
  
  if (!containerId) {
    console.error('❌ [StatsCard] containerId es requerido para createStatsCard');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [StatsCard] Contenedor con ID "${containerId}" no encontrado`);
    return null;
  }
  
  // Renderizar el HTML
  const html = renderStatsCard(cardOptions);
  container.innerHTML = html;
  
  const cardElement = container.querySelector('.ubits-stats-card') as HTMLElement;
  
  if (!cardElement) {
    console.error('❌ [StatsCard] No se pudo crear el elemento de la tarjeta');
    return null;
  }
  
  // Agregar event listeners
  if (cardOptions.onClick) {
    cardElement.addEventListener('click', cardOptions.onClick);
  }
  
  if (cardOptions.onAction && cardOptions.showAction) {
    const actionButton = cardElement.querySelector('.ubits-stats-card__action');
    if (actionButton) {
      actionButton.addEventListener('click', (e) => {
        e.stopPropagation();
        cardOptions.onAction?.(e as MouseEvent);
      });
    }
  }
  
  console.log('✅ [StatsCard] Tarjeta creada exitosamente');
  return cardElement;
}

