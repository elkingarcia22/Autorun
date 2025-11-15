/**
 * SimpleCardProvider
 * Lógica de renderizado del componente Simple Card
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import type { SimpleCardOptions } from './types/SimpleCardOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import type { ButtonOptions } from '../../button/src/types/ButtonOptions';

/**
 * Renderiza una simple card como HTML string
 */
export function renderSimpleCard(options: SimpleCardOptions): string {
  const {
    title,
    subtitle,
    content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    showHeader = true,
    headerBackground = 'var(--ubits-bg-4)',
    headerDecorations = true,
    backgroundColor = 'var(--ubits-bg-1)',
    borderColor = 'var(--ubits-border-1)',
    borderRadius = '8px', // Constante: 8px
    padding = 'var(--ubits-spacing-lg)',
    titleTypography = 'ubits-heading-h2',
    subtitleTypography = 'ubits-body-md',
    contentTypography = 'ubits-body-md',
    buttons = [
      { label: 'Cancel', variant: 'secondary', size: 'md' },
      { label: 'Save', variant: 'primary', size: 'md' }
    ],
    showButtons = true,
    variant = 'default',
    size = 'md',
    maxWidth,
    className = ''
  } = options;

  // LOGS para debug
  console.log('[SimpleCard] Renderizando card:', {
    variant,
    size,
    borderRadius,
    borderColor,
    padding,
    hasHeader: showHeader,
    headerMargin: 'calc(var(--ubits-spacing-lg) * -1)'
  });

  // Clases base
  const cardClasses = [
    'ubits-simple-card',
    `ubits-simple-card--${variant}`,
    `ubits-simple-card--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Estilos inline para tokens personalizables
  // Border siempre 1px constante y border-radius siempre 8px (ignorando lo que venga en options)
  const cardStyles = [
    `background: ${backgroundColor}`,
    `border: 1px solid ${borderColor}`, // Border constante 1px
    `border-radius: 8px !important`, // Border-radius constante 8px - FORZADO
    `padding: ${padding}`,
    maxWidth ? `max-width: ${maxWidth}` : ''
  ].filter(Boolean).join('; ');

  console.log('[SimpleCard] Estilos aplicados:', cardStyles);
  console.log('[SimpleCard] borderRadius recibido en options:', options.borderRadius, '-> Forzado a: 8px');

  // Header con decoraciones
  // Solo aplicar estilo inline si es diferente al default
  const headerStyle = headerBackground !== 'var(--ubits-bg-4)' 
    ? `style="background: ${headerBackground}"` 
    : '';
  
  const headerHTML = showHeader ? `
    <div class="ubits-simple-card__header" ${headerStyle}>
      ${headerDecorations ? `
        <div class="ubits-simple-card__header-decoration ubits-simple-card__header-decoration--left">
          <div class="ubits-simple-card__bubble">
            <div class="ubits-simple-card__bubble-content">
              <div class="ubits-simple-card__logo">A</div>
            </div>
          </div>
        </div>
        <div class="ubits-simple-card__header-decoration ubits-simple-card__header-decoration--right">
          <div class="ubits-simple-card__bubble ubits-simple-card__bubble--small">
            <div class="ubits-simple-card__bubble-content">
              <div class="ubits-simple-card__logo">A</div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  ` : '';

  // Título
  const titleHTML = title ? `
    <h2 class="ubits-simple-card__title ${titleTypography}">${title}</h2>
  ` : '';

  // Subtítulo
  const subtitleHTML = subtitle ? `
    <p class="ubits-simple-card__subtitle ${subtitleTypography}">${subtitle}</p>
  ` : '';

  // Contenido
  const contentHTML = content ? `
    <div class="ubits-simple-card__content ${contentTypography}">${content}</div>
  ` : '';

  // Botones
  const buttonsHTML = showButtons && buttons.length > 0 ? `
    <div class="ubits-simple-card__footer">
      ${buttons.map(button => {
        const buttonOptions: ButtonOptions = {
          variant: button.variant || 'secondary',
          size: button.size || 'md',
          text: button.label,
          disabled: button.disabled || false
        };
        return `<div class="ubits-simple-card__button">${renderButton(buttonOptions)}</div>`;
      }).join('')}
    </div>
  ` : '';

  // Template completo
  return `
    <div class="${cardClasses}" style="${cardStyles}">
      ${headerHTML}
      <div class="ubits-simple-card__body">
        ${titleHTML}
        ${subtitleHTML}
        ${contentHTML}
      </div>
      ${buttonsHTML}
    </div>
  `.trim();
}

/**
 * Crea un elemento simple card programáticamente
 */
export function createSimpleCard(options: SimpleCardOptions): HTMLElement {
  const cardHTML = renderSimpleCard(options);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = cardHTML;
  const cardElement = tempDiv.firstElementChild as HTMLElement;

  if (!cardElement) {
    throw new Error('Failed to create simple card element');
  }

  // LOG: Ver estilos computados después de crear el elemento
  setTimeout(() => {
    const computedStyle = window.getComputedStyle(cardElement);
    console.log('[SimpleCard] Estilos computados del elemento:', {
      border: computedStyle.border,
      borderWidth: computedStyle.borderWidth,
      borderRadius: computedStyle.borderRadius,
      borderColor: computedStyle.borderColor,
      padding: computedStyle.padding,
      width: computedStyle.width,
      height: computedStyle.height
    });

    // Verificar el header si existe
    const header = cardElement.querySelector('.ubits-simple-card__header') as HTMLElement;
    if (header) {
      const headerStyle = window.getComputedStyle(header);
      console.log('[SimpleCard] Estilos computados del header:', {
        margin: headerStyle.margin,
        marginTop: headerStyle.marginTop,
        marginLeft: headerStyle.marginLeft,
        marginRight: headerStyle.marginRight,
        width: headerStyle.width,
        borderRadius: headerStyle.borderRadius,
        border: headerStyle.border
      });
    }
  }, 0);

  // Agregar event listeners a los botones si se proporcionan
  if (options.buttons && options.buttons.length > 0) {
    const buttonElements = cardElement.querySelectorAll('.ubits-button');
    buttonElements.forEach((buttonEl, index) => {
      const buttonConfig = options.buttons![index];
      if (buttonConfig?.onClick) {
        buttonEl.addEventListener('click', buttonConfig.onClick);
      }
    });
  }

  return cardElement;
}

