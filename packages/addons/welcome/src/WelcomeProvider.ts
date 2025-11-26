/**
 * WelcomeProvider
 * Lógica de renderizado del componente Welcome
 * Basado en template-welcome-test.html del repositorio AUTORUN
 */

import type { WelcomeOptions } from './types/WelcomeOptions';

/**
 * Renderiza un Welcome AUTORUN como HTML string
 */
export function renderWelcome(options: WelcomeOptions): string {
	const {
		title = '¡Bienvenido!',
		subtitle = 'Estás a punto de probar esta aplicación.',
		features = [],
		showBanner = true,
		bannerText = 'Construyamos juntos',
		bannerIcon = 'fa-rocket',
		showInfoBox = true,
		infoBoxTitle = '¡IMPORTANTE!',
		infoBoxText = 'Usa el botón de feedback (💬) en la esquina inferior derecha para dejar tus comentarios sobre cada sección.',
		buttonText = 'Comenzar',
		buttonIcon = 'fa-rocket',
		buttonVariant = 'primary',
		buttonSize = 'lg',
		onStart,
		imageUrl,
		imageAlt = 'Prototipo AUTORUN',
		imageSize = 'medium',
		layout = 'no-image',
		textAlignment = 'left',
		buttonAlignment = 'center',
		containerStyle = 'default',
		className = '',
	} = options;

	// Construir clases CSS
	const containerClasses = [
		'welcome-container',
		containerStyle !== 'default' ? `welcome-container--${containerStyle}` : null,
		className,
	].filter(Boolean).join(' ');

	const contentClasses = [
		'welcome-content',
		layout === 'image-right' ? 'welcome-content--image-right' : null,
		layout === 'image-left' ? 'welcome-content--image-left' : null,
		layout === 'no-image' ? 'welcome-content--no-image' : null,
	].filter(Boolean).join(' ');

	const textClasses = [
		'welcome-text',
		textAlignment === 'center' ? 'welcome-text--centered' : null,
	].filter(Boolean).join(' ');

	const actionsClasses = [
		'welcome-actions',
		buttonAlignment === 'center' ? 'welcome-actions--centered' : null,
		buttonAlignment === 'left' ? 'welcome-actions--left' : null,
		buttonAlignment === 'right' ? 'welcome-actions--right' : null,
	].filter(Boolean).join(' ');

	// Renderizar banner
	const bannerHTML = showBanner
		? `
		<div class="welcome-banner welcome-banner--inside-card" id="welcome-banner-inside">
			<i class="fas ${bannerIcon} welcome-banner__icon"></i>
			<p class="welcome-banner__text">${bannerText}</p>
		</div>
	`
		: '';

	// Renderizar features
	const featuresHTML =
		features.length > 0
			? `
		<div class="welcome-features" id="welcome-features">
			<h3 class="welcome-features__title">
				<i class="fas fa-bullseye"></i>
				Lo que vas a probar:
			</h3>
			<ul class="welcome-features__list">
				${features
					.map(
						(feature) => `
				<li class="welcome-features__item">
					<i class="fas ${feature.icon || 'fa-check'} welcome-features__icon"></i>
					<span>${feature.text}</span>
				</li>
			`
					)
					.join('')}
			</ul>
		</div>
	`
			: '';

	// Renderizar info box
	const infoBoxHTML = showInfoBox
		? `
		<div class="welcome-info-box" id="welcome-info-box">
			<i class="fas fa-lightbulb welcome-info-box__icon"></i>
			<div class="welcome-info-box__content">
				<p class="welcome-info-box__title">${infoBoxTitle}</p>
				<p class="welcome-info-box__text">${infoBoxText}</p>
			</div>
		</div>
	`
		: '';

	// Renderizar botón
	const buttonIconHTML = buttonIcon ? `<i class="fas ${buttonIcon}"></i>` : '';
	const buttonHTML = `
		<button class="autorun-button autorun-button--${buttonVariant} autorun-button--${buttonSize}" id="welcome-start-button">
			${buttonIconHTML}
			<span>${buttonText}</span>
		</button>
	`;

	// Renderizar imagen
	const imageHTML =
		imageUrl && layout !== 'no-image'
			? `
		<div class="welcome-image welcome-image--${imageSize}" id="welcome-image">
			<img src="${imageUrl}" alt="${imageAlt}" />
		</div>
	`
			: '';

	// Construir HTML completo
	return `
		<div class="${containerClasses}" id="welcome-container">
			<div class="${contentClasses}" id="welcome-content">
				<div class="${textClasses}" id="welcome-text">
					${bannerHTML}
					<h1 class="welcome-title" id="welcome-title">${title}</h1>
					<p class="welcome-description" id="welcome-description">${subtitle}</p>
					${featuresHTML}
					${infoBoxHTML}
					<div class="${actionsClasses}" id="welcome-actions">
						${buttonHTML}
					</div>
				</div>
				${imageHTML}
			</div>
		</div>
	`.trim();
}

/**
 * Crea un elemento Welcome programáticamente
 */
export function createWelcome(options: WelcomeOptions): HTMLElement {
	const div = document.createElement('div');
	div.innerHTML = renderWelcome(options);
	const welcome = div.querySelector('.welcome-container') as HTMLElement;

	if (!welcome) {
		throw new Error('Failed to create welcome element');
	}

	// Agregar event listener para el botón
	const startButton = welcome.querySelector('#welcome-start-button');
	if (startButton && options.onStart) {
		startButton.addEventListener('click', () => {
			options.onStart?.();
		});
	}

	// Mover el welcome fuera del div temporal
	const parent = welcome.parentElement;
	if (parent) {
		parent.replaceChild(welcome, parent);
	}

	return welcome;
}

