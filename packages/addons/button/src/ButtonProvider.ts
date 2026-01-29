/**
 * ButtonProvider
 * Lógica de renderizado del componente Button
 * Genera HTML según las opciones proporcionadas
 */

import { ButtonOptions } from './types/ButtonOptions';

// Helper para renderizar iconos - intenta usar @ubits/icons pero fallback a FontAwesome directo
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
	// Intentar importar dinámicamente @ubits/icons (solo si está disponible)
	// Si falla, usar FontAwesome directo
	try {
		// En runtime, esto solo funcionará si el módulo está disponible
		// Por ahora, usamos directamente FontAwesome para Storybook
		const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
		const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
		return `<i class="${iconClass} ${name}"></i>`;
	} catch (e) {
		// Fallback: FontAwesome directo
		const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
		const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
		return `<i class="${iconClass} ${name}"></i>`;
	}
}

/**
 * Renderiza un botón AUTORUN como HTML string
 */
export function renderButton(options: ButtonOptions): string {
	const {
		variant = 'primary',
		size = 'md',
		text = '',
		icon,
		iconStyle = 'regular',
		iconOnly = false,
		disabled = false,
		loading = false,
		loadingText,
		badge = false,
		active = false,
		floating = false,
		fullWidth = false,
		block = false,
		iconPosition = 'left',
		className = '',
		attributes = {},
		dropdown = false,
		showTooltip = false,
		tooltipText = '',
	} = options;

	// Construir clases CSS
	const classes = [
		'autorun-button',
		`autorun-button--${variant}`,
		`autorun-button--${size}`,
		active ? 'autorun-button--active' : null,
		floating ? 'autorun-button--floating' : null,
		iconOnly ? 'autorun-button--icon-only' : null,
		loading ? 'autorun-button--loading' : null,
		fullWidth ? 'autorun-button--full-width' : null,
		block ? 'autorun-button--block' : null,
		iconPosition === 'right' ? 'autorun-button--icon-right' : null,
		dropdown ? 'autorun-button--dropdown' : null,
		className || null,
	]
		.filter(Boolean)
		.join(' ');

	// Construir atributos HTML
	const attrs = [
		disabled && 'disabled',
		loading && 'data-loading="true"',
		loading && 'aria-busy="true"',
		...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`),
	]
		.filter(Boolean)
		.join(' ');

	// Renderizar icono usando helper (compatible con Storybook)
	let iconHTML = '';
	if (icon) {
		iconHTML = renderIconHelper(icon, iconStyle);
	}

	// Si dropdown está activo y no hay icono personalizado, agregar chevron-down a la derecha
	let finalIconHTML = iconHTML;
	let finalIconPosition = iconPosition;
	if (dropdown && !icon && text) {
		// Agregar chevron-down automáticamente cuando dropdown está activo
		finalIconHTML = renderIconHelper('chevron-down', iconStyle);
		finalIconPosition = 'right';
	} else if (dropdown && icon && iconPosition === 'left' && text) {
		// Si hay icono izquierdo, agregar chevron-down a la derecha
		finalIconHTML = `${iconHTML}${renderIconHelper('chevron-down', iconStyle)}`;
		// Mantener ambos iconos
	} else if (dropdown && !text) {
		// Solo icono, agregar chevron-down al lado
		finalIconHTML = icon
			? `${iconHTML}${renderIconHelper('chevron-down', iconStyle)}`
			: renderIconHelper('chevron-down', iconStyle);
	}

	// Contenido del botón
	let content = '';

	if (loading && loadingText) {
		// Loading con texto personalizado
		content = `<span class="button-text">${loadingText}</span>`;
	} else if (loading && !text) {
		// Solo spinner (sin texto)
		content = '';
	} else if (loading && text) {
		// Loading manteniendo texto
		if (iconPosition === 'right') {
			content = `<span class="button-text">${text}</span>`;
		} else {
			content = `<span class="button-text">${text}</span>`;
		}
	} else if (iconOnly && icon) {
		// Solo icono
		content = iconHTML;
	} else if (finalIconHTML && text) {
		// Icono + texto
		if (dropdown && icon && iconPosition === 'left') {
			// Icono izquierdo personalizado + texto + chevron derecho
			content = `${renderIconHelper(icon, iconStyle)}<span>${text}</span>${renderIconHelper('chevron-down', iconStyle)}`;
		} else if (finalIconPosition === 'right') {
			content = `<span>${text}</span>${finalIconHTML}`;
		} else {
			content = `${finalIconHTML}<span>${text}</span>`;
		}
	} else if (text) {
		// Solo texto (si dropdown, agregar chevron)
		content = dropdown
			? `<span>${text}</span>${renderIconHelper('chevron-down', iconStyle)}`
			: `<span>${text}</span>`;
	} else if (finalIconHTML) {
		// Solo icono (fallback si no hay iconOnly)
		content = finalIconHTML;
	}

	// Badge
	const badgeHTML = badge ? '<span class="autorun-button__badge"></span>' : '';

	// Agregar atributo title para tooltip si está habilitado y es icon-only
	const titleAttr = iconOnly && showTooltip && tooltipText ? `title="${tooltipText}"` : '';

	// Renderizar HTML completo
	return `
    <button class="${classes}" ${attrs} ${titleAttr}>
      ${content}
      ${badgeHTML}
    </button>
  `.trim();
}

/**
 * Crea un elemento button programáticamente
 */
export function createButton(options: ButtonOptions): HTMLButtonElement {
	const div = document.createElement('div');
	div.style.position = 'relative';
	div.style.display = 'inline-block';
	const htmlString = renderButton(options);
	div.innerHTML = htmlString;
	const button = div.querySelector('button');

	if (!button) {
		throw new Error('Failed to create button element');
	}

	// Adjuntar event listeners si existe onClick
	if (options.onClick) {
		button.addEventListener('click', options.onClick as EventListener);
	}

	// Retornar el botón
	return button;
}
