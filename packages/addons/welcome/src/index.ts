/**
 * @autorun/welcome
 * Export público del add-on Welcome
 */

export { WelcomeAddon } from './WelcomeAddon';
export { renderWelcome, createWelcome } from './WelcomeProvider';
export type { WelcomeOptions, WelcomeFeature } from './types/WelcomeOptions';

// Exponer globalmente para UMD
if (typeof window !== 'undefined') {
	(window as any).createWelcome = createWelcome;
	(window as any).renderWelcome = renderWelcome;
	
	// También exponer en AUTORUNWelcome para compatibilidad
	if (!(window as any).AUTORUNWelcome) {
		(window as any).AUTORUNWelcome = {};
	}
	(window as any).AUTORUNWelcome.create = createWelcome;
	(window as any).AUTORUNWelcome.render = renderWelcome;
}

