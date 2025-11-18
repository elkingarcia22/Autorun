/**
 * NPSCardProvider
 * Lógica de renderizado del componente NPSCard
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { NPSCardOptions } from './types/NPSCardOptions';
import { renderButton } from '../../button/src/ButtonProvider';

/**
 * Calcula el porcentaje de una categoría
 */
function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

/**
 * Renderiza el SVG del gauge semicircular
 * PASO 1: Solo la media luna básica y el texto centrado
 */
function renderSemicircularGauge(
  score: number,
  size: number = 200,
  strokeWidth: number = 16,
  lowColor: string = 'var(--ubits-semantic-error, #E53E3E)',
  mediumColor: string = 'var(--ubits-semantic-warning, #F6AD55)',
  highColor: string = 'var(--ubits-semantic-success, #38A169)',
  backgroundColor: string = 'var(--ubits-bg-3)'
): string {
  // Calcular dimensiones
  const padding = strokeWidth / 2;
  const radius = (size - padding * 2) / 2;
  const centerX = size / 2;
  // Para un semicírculo superior, el centro del círculo completo está abajo
  // El semicírculo va de 180° (izquierda) a 0° (derecha) en la parte superior
  const centerY = size - padding; // Centro del círculo completo (abajo del semicírculo)
  
  // Ángulos: 180° (izquierda) a 0° (derecha) pasando por 270° (arriba)
  // En SVG: 0° = derecha, 90° = abajo, 180° = izquierda, 270° = arriba
  const startAngle = 180; // Izquierda
  const endAngle = 0; // Derecha (equivalente a 360°)
  
  // Función helper para convertir grados a coordenadas SVG
  const angleToCoords = (angleDeg: number, r: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = centerX + r * Math.cos(angleRad);
    const y = centerY + r * Math.sin(angleRad);
    return { x, y };
  };
  
  // Crear el arco del fondo (semicírculo superior de 180° a 0° pasando por 270°)
  const startCoords = angleToCoords(startAngle, radius);
  const endCoords = angleToCoords(endAngle, radius);
  
  // Path del fondo (semicírculo superior) - largeArcFlag = 1 porque pasamos por arriba (270°)
  const backgroundPath = `M ${startCoords.x} ${startCoords.y} A ${radius} ${radius} 0 1 1 ${endCoords.x} ${endCoords.y}`;
  
  // Usar el mismo color azul que el circle metric card
  const progressColor = 'var(--ubits-chart-color-bg-neutral-blue-base, #557593)';
  
  // Calcular el ángulo del score (0-100 mapeado a 180-0 grados pasando por 270°)
  let scoreAngle: number;
  if (score <= 50) {
    // De 0% a 50%: de 180° a 270° (izquierda a arriba)
    scoreAngle = 180 + (score / 50) * 90;
  } else {
    // De 50% a 100%: de 270° a 0° (arriba a derecha)
    scoreAngle = 270 + ((score - 50) / 50) * 90;
    if (scoreAngle >= 360) {
      scoreAngle = scoreAngle - 360; // 360° = 0°
    }
  }
  
  // Calcular coordenadas del punto final del progreso
  const scoreCoords = angleToCoords(scoreAngle, radius);
  
  // Determinar largeArcFlag para el path del progreso
  // Si el score es menor a 50, usamos el arco pequeño (0), si es mayor, usamos el arco grande (1)
  const angleDiff = scoreAngle > startAngle 
    ? scoreAngle - startAngle 
    : (360 - startAngle) + scoreAngle;
  const progressLargeArcFlag = angleDiff > 180 ? 1 : 0;
  
  // Path del progreso (hasta el score)
  const progressPath = `M ${startCoords.x} ${startCoords.y} A ${radius} ${radius} 0 ${progressLargeArcFlag} 1 ${scoreCoords.x} ${scoreCoords.y}`;
  
  // Calcular el punto más alto del semicírculo (arriba, en 270°)
  const topPoint = angleToCoords(270, radius);
  
  // Calcular el espacio en blanco superior
  const espacioBlancoSuperior = topPoint.y; // Distancia desde el top del SVG hasta el punto más alto del arco
  
  // Calcular el centro de la media luna para posicionar el texto
  // El centro del círculo está en centerY (abajo), el radio es radius
  // El punto más alto del semicírculo está en centerY - radius
  // El centro vertical de la media luna está aproximadamente en el punto medio
  const halfMoonCenterY = centerY - (radius / 2);
  // Convertir a porcentaje relativo al tamaño del SVG
  const halfMoonCenterPercent = (halfMoonCenterY / size) * 100;
  
  // PASO 2: Agregar solo números (sin líneas) - (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100)
  const marks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  
  const markElements = marks.map(mark => {
    // Calcular el ángulo para cada número
    // Para un semicírculo superior que va de 180° (izquierda) a 0° (derecha) pasando por 270° (arriba):
    // - 0% = 180° (izquierda)
    // - 50% = 270° (arriba) 
    // - 100% = 0° (derecha)
    
    let markAngle: number;
    
    // Dividimos en dos segmentos: 0-50 y 50-100
    if (mark <= 50) {
      // De 0% a 50%: de 180° a 270° (izquierda a arriba)
      markAngle = 180 + (mark / 50) * 90;
    } else {
      // De 50% a 100%: de 270° a 0° (arriba a derecha)
      markAngle = 270 + ((mark - 50) / 50) * 90;
      if (markAngle >= 360) {
        markAngle = markAngle - 360; // 360° = 0°
      }
    }
    
    // Posición del texto (más afuera del arco, siguiendo la forma de la media luna)
    const textDistance = radius + 20;
    const textPos = angleToCoords(markAngle, textDistance);
    
    // Solo renderizar el número, sin líneas
    return `
      <text
        x="${textPos.x}"
        y="${textPos.y}"
        font-family="var(--font-sans)"
        font-size="var(--font-body-sm-size, 13px)"
        font-weight="var(--weight-regular, 400)"
        fill="var(--ubits-fg-2-medium)"
        text-anchor="middle"
        dominant-baseline="middle"
        style="font-size: var(--font-body-sm-size, 13px) !important; font-weight: var(--weight-regular, 400) !important; font-family: var(--font-sans) !important;"
      >${mark}</text>
    `;
  }).join('');
  
  // PASO 2: Renderizar la media luna con marcas y números
  // Calcular viewBox para eliminar espacio en blanco superior
  const viewBoxPadding = 30;
  const viewBoxSize = size + (viewBoxPadding * 2);
  
  // Calcular el espacio en blanco superior del SVG
  // El punto más alto del arco está en Y = topPoint.y
  // El viewBox actual empieza en -30, así que el espacio en blanco es: topPoint.y + viewBoxPadding
  const espacioBlancoEnViewBox = topPoint.y + viewBoxPadding;
  
  // Logs detallados sobre el espacio en blanco
  console.log('🔍 [SVG] Análisis de espacio en blanco:', {
    size,
    centerY,
    radius,
    topPoint: { x: topPoint.x.toFixed(1), y: topPoint.y.toFixed(1) },
    espacioBlancoSuperior: espacioBlancoSuperior.toFixed(1) + 'px',
    viewBoxPadding,
    viewBoxActual: `${-viewBoxPadding} ${-viewBoxPadding} ${viewBoxSize} ${viewBoxSize}`,
    espacioBlancoEnViewBox: espacioBlancoEnViewBox.toFixed(1) + 'px',
    recomendacion: `Ajustar viewBox para empezar en Y=${(topPoint.y - 10).toFixed(0)} en lugar de Y=${-viewBoxPadding}`
  });
  
  // Ajustar viewBox para reducir espacio en blanco superior
  // Empezar el viewBox más abajo para recortar el espacio superior
  const viewBoxStartY = topPoint.y - 20; // Empezar 20px antes del punto más alto
  const viewBoxHeight = size - viewBoxStartY + viewBoxPadding; // Altura ajustada
  
  return `
    <svg 
      class="ubits-nps-card__gauge-svg" 
      width="${size}" 
      height="${size}" 
      viewBox="${-viewBoxPadding} ${viewBoxStartY} ${viewBoxSize} ${viewBoxHeight}"
      data-half-moon-center="${halfMoonCenterPercent}"
      style="overflow: visible; display: block;"
    >
      <!-- Media luna básica (arco gris de fondo) -->
      <path
        d="${backgroundPath}"
        fill="none"
        stroke="${backgroundColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
      />
      
      <!-- Arco de progreso (relleno hasta el score) -->
      <path
        d="${progressPath}"
        fill="none"
        stroke="${progressColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        class="ubits-nps-card__gauge-progress"
      />
      
      <!-- Números alrededor de la media luna -->
      ${markElements}
    </svg>
  `;
}

/**
 * Renderiza una categoría de NPS
 */
function renderCategory(
  category: NPSCardOptions['categories'][0],
  size: NPSCardOptions['size'] = 'md'
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
    : 'ubits-body-sm-bold';
  
  return `
    <div class="ubits-nps-card__category">
      <div class="ubits-nps-card__category-label ${labelClass}">
        ${category.label}
      </div>
      <div class="ubits-nps-card__category-value ${valueClass}">
        ${category.current}/${category.total} <span class="ubits-nps-card__category-percentage ${percentageClass}">${percentage}%</span>
      </div>
    </div>
  `;
}

/**
 * Renderiza un NPSCard como HTML string
 */
export function renderNPSCard(options: NPSCardOptions): string {
  const {
    title = 'Nivel de confianza',
    score = 0,
    scoreLabel = 'Puntuación',
    totalResponses = 0,
    responsesLabel = 'respuestas',
    categories = [],
    size = 'md',
    showTitle = true,
    showResponsesCount = true,
    showGauge = true,
    showCategories = true,
    showInfoIcon = false,
    showActionButton = false,
    lowColor = 'var(--ubits-semantic-error, #E53E3E)',
    mediumColor = 'var(--ubits-semantic-warning, #F6AD55)',
    highColor = 'var(--ubits-semantic-success, #38A169)',
    gaugeBackgroundColor = 'var(--ubits-bg-3)',
    className = '',
    attributes = {}
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-nps-card',
    `ubits-nps-card--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Tamaño del gauge - aumentado para ocupar más espacio vertical y horizontal
  const gaugeSize = 360;
  const strokeWidth = 24;
  
  // Clases de tipografía fijas
  const titleClass = 'ubits-body-md-bold';
  const responsesCountClass = 'ubits-body-sm-regular';
  const scoreClass = 'ubits-display-3-bold'; // Cambiado a display-3-bold
  const scoreLabelClass = 'ubits-body-sm-bold'; // sm-bold para "Puntuación"

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

  // Renderizar título y contador de respuestas
  const headerHTML = showTitle || showResponsesCount
    ? `
      <div class="ubits-nps-card__header" style="margin-bottom: -16px !important; padding-bottom: 0 !important;">
        <div class="ubits-nps-card__title-group">
          ${showTitle ? `<h3 class="ubits-nps-card__title ${titleClass}">${title}</h3>` : ''}
          ${infoIconHTML}
        </div>
        ${showResponsesCount ? `<div class="ubits-nps-card__responses-count ${responsesCountClass}">${totalResponses} ${responsesLabel}</div>` : ''}
        ${actionButtonHTML ? `<div class="ubits-nps-card__action-button">${actionButtonHTML}</div>` : ''}
      </div>
    `
    : '';
  
  console.log('📏 [NPSCard] Espaciado calculado:', {
    headerHTML: headerHTML ? 'presente' : 'ausente',
    gaugeSize,
    strokeWidth,
    padding: strokeWidth / 2,
    radius: (gaugeSize - (strokeWidth / 2) * 2) / 2
  });

  // Calcular la posición del texto para alinearlo donde empieza la media luna
  // Esto debe coincidir con el cálculo en renderSemicircularGauge
  const textPadding = strokeWidth / 2;
  const textRadius = (gaugeSize - textPadding * 2) / 2;
  const textCenterY = gaugeSize - textPadding;
  // El texto debe estar dentro de la media luna, más arriba
  // El punto más alto del semicírculo está en centerY - radius
  // Queremos el texto más arriba, cerca del inicio de la media luna
  const puntoMasAltoMediaLuna = textCenterY - textRadius;
  // Posicionar el texto más arriba dentro del área visible de la media luna
  const textPositionY = textCenterY - (textRadius * 0.75); // 75% del radio desde el centro hacia arriba
  const textPositionPercent = (textPositionY / gaugeSize) * 100;
  
  console.log('📍 [Texto] Posición calculada:', {
    textCenterY: textCenterY.toFixed(1),
    textRadius: textRadius.toFixed(1),
    puntoMasAltoMediaLuna: puntoMasAltoMediaLuna.toFixed(1),
    textPositionY: textPositionY.toFixed(1),
    textPositionPercent: textPositionPercent.toFixed(2) + '%'
  });
  
  // Renderizar gauge semicircular - wrapper simplificado sin espacio en blanco
  const gaugeHTML = showGauge
    ? `
      <div class="ubits-nps-card__gauge-wrapper" style="--text-position: ${textPositionPercent}%;">
        ${renderSemicircularGauge(
          score,
          gaugeSize,
          strokeWidth,
          lowColor,
          mediumColor,
          highColor,
          gaugeBackgroundColor
        )}
        <div class="ubits-nps-card__gauge-content">
          <div class="ubits-nps-card__gauge-score ${scoreClass}">
            ${score}
          </div>
          <div class="ubits-nps-card__gauge-label ${scoreLabelClass}">
            ${scoreLabel}
          </div>
        </div>
      </div>
    `
    : '';
  
  // Renderizar categorías
  const categoriesHTML = showCategories && categories.length > 0
    ? `
      <div class="ubits-nps-card__categories">
        ${categories.map(cat => renderCategory(cat, size)).join('')}
      </div>
    `
    : '';

  // Agregar padding-bottom al content cuando no hay categorías para mantener el espacio de 12px
  const contentStyle = !showCategories || categories.length === 0
    ? 'padding-bottom: 12px;'
    : '';

  // Logs detallados sobre el espacio en blanco entre título y gráfico
  const puntoMasAlto = textCenterY - textRadius;
  
  console.log('🔍 [NPSCard] Análisis de espacio en blanco:', {
    gaugeSize,
    strokeWidth,
    padding: textPadding,
    radius: textRadius,
    centerY: textCenterY,
    puntoMasAlto: puntoMasAlto.toFixed(1) + 'px',
    espacioBlancoEnSVG: puntoMasAlto.toFixed(1) + 'px desde el top',
    textPositionPercent: textPositionPercent.toFixed(2) + '%',
    cssAplicado: {
      cardPadding: '8px 12px 12px 12px',
      cardGap: '0',
      contentGap: 'var(--ubits-spacing-xs)',
      headerMarginBottom: 'calc(var(--ubits-spacing-lg) * -1)',
      contentMarginTop: 'calc(var(--ubits-spacing-lg) * -1)',
      gaugeWrapper: 'display: inline-block, height: auto, margin: 0'
    }
  });
  
  return `
    <div class="${classes}" ${attrs}>
      ${headerHTML}
      <div class="ubits-nps-card__content" style="${contentStyle}">
        ${gaugeHTML}
        ${categoriesHTML}
      </div>
    </div>
  `;
}

/**
 * Crea un NPSCard y lo inserta en el DOM
 */
export function createNPSCard(
  options: NPSCardOptions & { containerId?: string }
): HTMLElement | null {
  const { containerId, ...cardOptions } = options;
  
  if (!containerId) {
    console.error('❌ [NPSCard] containerId es requerido para createNPSCard');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [NPSCard] Contenedor con ID "${containerId}" no encontrado`);
    return null;
  }
  
  // Renderizar el HTML
  const html = renderNPSCard(cardOptions);
  container.innerHTML = html;
  
  const cardElement = container.querySelector('.ubits-nps-card') as HTMLElement;
  
  if (!cardElement) {
    console.error('❌ [NPSCard] No se pudo crear el elemento de la tarjeta');
    return null;
  }
  
  // Agregar event listeners
  if (cardOptions.onClick) {
    cardElement.addEventListener('click', cardOptions.onClick);
  }
  
  console.log('✅ [NPSCard] Tarjeta creada exitosamente');
  return cardElement;
}

