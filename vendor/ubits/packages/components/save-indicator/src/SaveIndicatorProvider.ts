/**
 * SaveIndicatorProvider
 * Lógica de renderizado del componente SaveIndicator
 * Basado en Button del design system UBITS
 */

import type { SaveIndicatorOptions, SaveIndicatorState } from './types/SaveIndicatorOptions';
import { renderSpinner } from '../../spinner/src/SpinnerProvider';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
	const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
	const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
	return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza un SaveIndicator UBITS como HTML string
 */
export function renderSaveIndicator(options: SaveIndicatorOptions = {}): string {
	const {
		state = 'saved',
		savingText = 'Guardando...',
		recentlySavedText = 'Cambios guardados',
		className = '',
		attributes = {},
	} = options;

	// Construir clases CSS basadas en Button
	const classes = [
		'ubits-save-indicator',
		`ubits-save-indicator--${state}`,
		className || null,
	]
		.filter(Boolean)
		.join(' ');

	// Construir atributos HTML
	const attrs = [
		...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`),
	]
		.filter(Boolean)
		.join(' ');

	// Renderizar contenido según el estado
	let content = '';

	switch (state) {
		case 'saved':
			// Solo icono: cloud con checkmark superpuesto
			content = `
        <span class="ubits-save-indicator__icon-wrapper">
          ${renderIconHelper('cloud', 'regular')}
          <i class="fas fa-check ubits-save-indicator__overlay-icon"></i>
        </span>
      `.trim();
			break;

		case 'saving':
			// Spinner + texto
			const spinnerHTML = renderSpinner({
				size: 'sm',
				variant: 'primary',
				animated: true,
				className: 'ubits-save-indicator__spinner',
			});
			content = `${spinnerHTML}<span class="ubits-save-indicator__text">${savingText}</span>`;
			break;

		case 'failed':
			// Solo icono: cloud con exclamation superpuesto
			content = `
        <span class="ubits-save-indicator__icon-wrapper">
          ${renderIconHelper('cloud', 'regular')}
          <i class="fas fa-exclamation-triangle ubits-save-indicator__overlay-icon ubits-save-indicator__overlay-icon--error"></i>
        </span>
      `.trim();
			break;

		case 'recently-saved':
			// Icono + texto
			content = `
        <span class="ubits-save-indicator__icon-wrapper">
          ${renderIconHelper('cloud', 'regular')}
          <i class="fas fa-check ubits-save-indicator__overlay-icon"></i>
        </span>
        <span class="ubits-save-indicator__text">${recentlySavedText}</span>
      `.trim();
			break;
	}

	// Renderizar HTML completo (usando button como base, igual que Button component)
	return `
    <button class="${classes}" ${attrs} type="button" aria-label="Estado de guardado: ${state}">
      ${content}
    </button>
  `.trim();
}

/**
 * Crea un elemento SaveIndicator programáticamente
 */
export function createSaveIndicator(options: SaveIndicatorOptions = {}): HTMLButtonElement {
	const div = document.createElement('div');
	div.style.position = 'relative';
	div.style.display = 'inline-block';
	const htmlString = renderSaveIndicator(options);
	div.innerHTML = htmlString;
	const button = div.querySelector('button');

	if (!button) {
		throw new Error('Failed to create save indicator element');
	}

	// Adjuntar event listeners si existe onClick
	if (options.onClick) {
		button.addEventListener('click', options.onClick as EventListener);
	}

	return button;
}
