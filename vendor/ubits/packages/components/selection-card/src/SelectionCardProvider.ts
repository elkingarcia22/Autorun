/**
 * SelectionCardProvider
 * Lógica de renderizado del componente SelectionCard con radio button visual
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import type { SelectionCardData, SelectionCardOptions } from './types/SelectionCardOptions';
import { renderRadioButton } from '../../radio-button/src/RadioButtonProvider';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza una selection-card individual como HTML string
 */
export function renderSelectionCard(cardData: SelectionCardData): string {
  const {
    id,
    title,
    description,
    icon,
    iconStyle = 'regular',
    image,
    selectionCount,
    state = 'default',
    size = 'md'
  } = cardData;

  const isSelected = state === 'selected';
  const isDisabled = state === 'disabled';

  // Construir clases
  const classes = [
    'ubits-selection-card',
    `ubits-selection-card--${size}`,
    state !== 'default' ? `ubits-selection-card--${state}` : '',
    isSelected ? 'ubits-selection-card--selected' : ''
  ].filter(Boolean).join(' ');

  // Renderizar imagen o icono (icono ahora va dentro del título)
  let iconHTML = '';
  if (icon && !image) {
    iconHTML = `
      <div class="ubits-selection-card__icon">
        ${renderIconHelper(icon, iconStyle)}
      </div>
    `;
  }

  let imageHTML = '';
  if (image) {
    imageHTML = `
      <div class="ubits-selection-card__image">
        <img src="${image}" alt="${title}" />
      </div>
    `;
  }

  // Renderizar contador de selección si existe
  let selectionCountHTML = '';
  if (selectionCount) {
    const { current, total } = selectionCount;
    selectionCountHTML = `
      <div class="ubits-selection-card__selection-count">
        <span class="ubits-selection-card__selection-count-number ubits-body-md-bold">${current}/${total}</span>
        <span class="ubits-selection-card__selection-count-text ubits-body-md-regular">seleccionados</span>
      </div>
    `;
  }

  // Renderizar radio button visual a la derecha
  const radioButtonHTML = renderRadioButton({
    label: '',
    value: id,
    name: `selection-card-group-${id}`,
    checked: isSelected,
    size: 'md',
    state: isDisabled ? 'disabled' : 'default',
    disabled: isDisabled,
    className: 'ubits-selection-card__radio-button'
  });

  const html = `
    <div class="${classes}" data-card-id="${id}" ${isDisabled ? 'aria-disabled="true"' : ''} ${!isDisabled ? 'tabindex="0"' : ''}>
      ${imageHTML}
      <div class="ubits-selection-card__content">
        <h3 class="ubits-selection-card__title ubits-body-md-semibold">
          ${iconHTML}
          <span>${title}</span>
        </h3>
        ${description ? `<p class="ubits-selection-card__description ubits-body-sm">${description}</p>` : ''}
        ${selectionCountHTML}
      </div>
      <div class="ubits-selection-card__radio-wrapper">
        ${radioButtonHTML}
      </div>
    </div>
  `.trim();

  // Verificar que los tokens UBITS estén disponibles (solo en desarrollo)
  if (typeof window !== 'undefined') {
    const rootStyle = getComputedStyle(document.documentElement);
    // Verificación silenciosa de tokens
  }

  return html;
}

/**
 * Carga múltiples selection-cards en un contenedor
 */
export function loadSelectionCards(options: SelectionCardOptions): void {
  const {
    containerId,
    cards,
    multiple = false,
    selectedIds = [],
    onSelectionChange,
    onClick
  } = options;

  const targetContainer = document.getElementById(containerId);
  if (!targetContainer) {
    console.error(`❌ [SelectionCard] Contenedor con ID "${containerId}" no encontrado`);
    return;
  }

  // Limpiar contenedor
  targetContainer.innerHTML = '';

  // Renderizar cada card
  cards.forEach((cardData, index) => {
    const isSelected = selectedIds.includes(cardData.id);
    const cardDataWithState: SelectionCardData = {
      ...cardData,
      state: isSelected ? 'selected' : cardData.state || 'default'
    };

    const cardHTML = renderSelectionCard(cardDataWithState);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = cardHTML;
    const cardElement = wrapper.firstElementChild as HTMLElement;

    if (!cardElement) return;

    // Agregar event listeners
    if (cardDataWithState.state !== 'disabled') {
      cardElement.addEventListener('click', () => {
        if (cardDataWithState.state === 'disabled') return;

        const currentSelectedIds = [...selectedIds];
        const cardIndex = currentSelectedIds.indexOf(cardData.id);

        if (multiple) {
          // Selección múltiple
          if (cardIndex > -1) {
            // Deseleccionar
            currentSelectedIds.splice(cardIndex, 1);
            cardElement.classList.remove('ubits-selection-card--selected');
            cardDataWithState.state = 'default';
            // Actualizar radio button
            const radioInput = cardElement.querySelector('.ubits-selection-card__radio-button input[type="radio"]') as HTMLInputElement;
            const radioButton = cardElement.querySelector('.ubits-selection-card__radio-button');
            if (radioInput) radioInput.checked = false;
            if (radioButton) {
              radioButton.classList.remove('ubits-radio-button--checked');
              const dot = radioButton.querySelector('.ubits-radio-button__dot');
              if (dot) dot.remove();
            }
          } else {
            // Seleccionar
            currentSelectedIds.push(cardData.id);
            cardElement.classList.add('ubits-selection-card--selected');
            cardDataWithState.state = 'selected';
            // Actualizar radio button
            const radioInput = cardElement.querySelector('.ubits-selection-card__radio-button input[type="radio"]') as HTMLInputElement;
            const radioButton = cardElement.querySelector('.ubits-selection-card__radio-button');
            if (radioInput) radioInput.checked = true;
            if (radioButton) {
              radioButton.classList.add('ubits-radio-button--checked');
              const circle = radioButton.querySelector('.ubits-radio-button__circle');
              if (circle && !circle.querySelector('.ubits-radio-button__dot')) {
                const dot = document.createElement('span');
                dot.className = 'ubits-radio-button__dot';
                circle.appendChild(dot);
              }
            }
          }
        } else {
          // Selección única
          const allCards = targetContainer.querySelectorAll('.ubits-selection-card');
          allCards.forEach(card => {
            card.classList.remove('ubits-selection-card--selected');
            const cardId = card.getAttribute('data-card-id');
            if (cardId) {
              const cardIndex = currentSelectedIds.indexOf(cardId);
              if (cardIndex > -1) {
                currentSelectedIds.splice(cardIndex, 1);
              }
            }
            // Deseleccionar radio buttons
            const radioInput = card.querySelector('.ubits-selection-card__radio-button input[type="radio"]') as HTMLInputElement;
            const radioButton = card.querySelector('.ubits-selection-card__radio-button');
            if (radioInput) radioInput.checked = false;
            if (radioButton) {
              radioButton.classList.remove('ubits-radio-button--checked');
              const dot = radioButton.querySelector('.ubits-radio-button__dot');
              if (dot) dot.remove();
            }
          });

          if (cardIndex === -1) {
            currentSelectedIds.push(cardData.id);
            cardElement.classList.add('ubits-selection-card--selected');
            cardDataWithState.state = 'selected';
            // Actualizar radio button
            const radioInput = cardElement.querySelector('.ubits-selection-card__radio-button input[type="radio"]') as HTMLInputElement;
            const radioButton = cardElement.querySelector('.ubits-selection-card__radio-button');
            if (radioInput) radioInput.checked = true;
            if (radioButton) {
              radioButton.classList.add('ubits-radio-button--checked');
              const circle = radioButton.querySelector('.ubits-radio-button__circle');
              if (circle && !circle.querySelector('.ubits-radio-button__dot')) {
                const dot = document.createElement('span');
                dot.className = 'ubits-radio-button__dot';
                circle.appendChild(dot);
              }
            }
          }
        }

        // Actualizar estado de la card
        const updatedCard = cards.find(c => c.id === cardData.id);
        if (updatedCard) {
          updatedCard.state = cardDataWithState.state;
        }

        // Llamar callbacks
        const selectedCards = cards.filter(c => currentSelectedIds.includes(c.id));
        onSelectionChange?.(selectedCards, currentSelectedIds);
        onClick?.(cardData, index, cardElement);
      });

      // Soporte para teclado
      cardElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          cardElement.click();
        }
      });
    }

    targetContainer.appendChild(cardElement);
  });
}

/**
 * Crea un elemento selection-card programáticamente
 */
export function createSelectionCard(cardData: SelectionCardData): HTMLElement {
  const cardHTML = renderSelectionCard(cardData);
  
  // Crear un contenedor temporal para parsear el HTML
  const wrapper = document.createElement('div');
  wrapper.innerHTML = cardHTML.trim();
  
  // Obtener el primer elemento hijo (la card)
  const cardElement = wrapper.firstElementChild as HTMLElement;

  if (!cardElement) {
    console.error('❌ [SelectionCard] Error al parsear HTML. HTML generado:', cardHTML);
    throw new Error('No se pudo crear el elemento selection-card. Verifica que el HTML sea válido.');
  }

  // Verificar que tenga la clase base
  if (!cardElement.classList.contains('ubits-selection-card')) {
    console.warn('⚠️ [SelectionCard] El elemento no tiene la clase base ubits-selection-card');
  }

  // Logs especializados para debugging de estilos UBITS
  setTimeout(() => {
    const computedStyle = window.getComputedStyle(cardElement);
    const rootStyle = window.getComputedStyle(document.documentElement);
    
    // Verificar tokens críticos
    const tokens = {
      '--modifiers-normal-color-light-border-1': rootStyle.getPropertyValue('--modifiers-normal-color-light-border-1').trim() || 'NO ENCONTRADO',
      '--modifiers-static-inverted-color-light-accent-brand': rootStyle.getPropertyValue('--modifiers-static-inverted-color-light-accent-brand').trim() || 'NO ENCONTRADO',
      '--modifiers-normal-color-light-bg-1': rootStyle.getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || 'NO ENCONTRADO',
      '--ubits-spacing-lg': rootStyle.getPropertyValue('--ubits-spacing-lg').trim() || 'NO ENCONTRADO',
      '--ubits-spacing-sm': rootStyle.getPropertyValue('--ubits-spacing-sm').trim() || 'NO ENCONTRADO',
      '--ubits-border-radius-md': rootStyle.getPropertyValue('--ubits-border-radius-md').trim() || 'NO ENCONTRADO',
      '--font-body-md-size': rootStyle.getPropertyValue('--font-body-md-size').trim() || 'NO ENCONTRADO',
      '--font-body-md-line': rootStyle.getPropertyValue('--font-body-md-line').trim() || 'NO ENCONTRADO',
      '--weight-semibold': rootStyle.getPropertyValue('--weight-semibold').trim() || 'NO ENCONTRADO',
      '--font-sans': rootStyle.getPropertyValue('--font-sans').trim() || 'NO ENCONTRADO'
    };
    
    // Verificar estilos aplicados
    const appliedStyles = {
      border: computedStyle.border,
      borderWidth: computedStyle.borderWidth,
      borderStyle: computedStyle.borderStyle,
      borderColor: computedStyle.borderColor,
      backgroundColor: computedStyle.backgroundColor,
      padding: computedStyle.padding,
      gap: computedStyle.gap,
      borderRadius: computedStyle.borderRadius,
      classes: Array.from(cardElement.classList)
    };
    
    // Verificar estilos de tipografía del título
    const titleElement = cardElement.querySelector('.ubits-selection-card__title');
    if (titleElement) {
      const titleStyle = window.getComputedStyle(titleElement);
      const titleTypography = {
        fontSize: titleStyle.fontSize,
        fontWeight: titleStyle.fontWeight,
        lineHeight: titleStyle.lineHeight,
        fontFamily: titleStyle.fontFamily,
        expectedFontSize: tokens['--font-body-md-size'],
        expectedLineHeight: tokens['--font-body-md-line'],
        expectedWeight: tokens['--weight-semibold']
      };
      
      // Verificación silenciosa de tipografía
    }
    
    // Verificar si está seleccionado
    const isSelected = cardElement.classList.contains('ubits-selection-card--selected');
    // Verificación silenciosa de estilos (sin logs)
  }, 100);

  return cardElement;
}

