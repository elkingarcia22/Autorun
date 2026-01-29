/**
 * I18nService
 *
 * Servicio que maneja todas las operaciones de internacionalización:
 * - Gestión de traducciones
 * - Detección de idioma
 * - Cambio dinámico de idioma
 * - Pluralización
 * - Formateo de fechas/números por locale
 */

export interface I18nConfig {
	defaultLocale?: string;
	supportedLocales?: string[];
	fallbackLocale?: string;
	translationsPath?: string;
	detectLocale?: boolean;
	storageKey?: string;
}

export interface TranslationData {
	[key: string]: string | TranslationData;
}

export interface I18nTranslations {
	[locale: string]: TranslationData;
}

export class I18nService {
	private config: I18nConfig;
	private translations: I18nTranslations = {};
	private currentLocale: string;
	private initialized = false;

	constructor(config: I18nConfig) {
		this.config = {
			defaultLocale: 'es',
			supportedLocales: ['es', 'en'],
			fallbackLocale: 'es',
			translationsPath: 'locales',
			detectLocale: true,
			storageKey: 'i18n-locale',
			...config,
		};
		this.currentLocale = this.config.defaultLocale || 'es';
	}

	/**
	 * Inicializa el servicio y carga traducciones
	 */
	async initialize(): Promise<void> {
		// Detectar locale si está habilitado
		if (this.config.detectLocale) {
			this.currentLocale = this.detectLocale();
		}

		// Cargar traducciones
		await this.loadTranslations();

		this.initialized = true;
		console.log(`✅ I18n Service: Inicializado con locale ${this.currentLocale}`);
	}

	/**
	 * Detecta el locale del navegador o almacenamiento
	 */
	private detectLocale(): string {
		// Intentar obtener del almacenamiento
		if (typeof window !== 'undefined' && this.config.storageKey) {
			const stored = localStorage.getItem(this.config.storageKey);
			if (stored && this.isLocaleSupported(stored)) {
				return stored;
			}
		}

		// Detectar del navegador
		if (typeof window !== 'undefined' && navigator.language) {
			const browserLocale = navigator.language.split('-')[0];
			if (this.isLocaleSupported(browserLocale)) {
				return browserLocale;
			}
		}

		// Usar locale por defecto
		return this.config.defaultLocale || 'es';
	}

	/**
	 * Verifica si un locale está soportado
	 */
	private isLocaleSupported(locale: string): boolean {
		return this.config.supportedLocales?.includes(locale) || false;
	}

	/**
	 * Carga las traducciones
	 */
	private async loadTranslations(): Promise<void> {
		// En un entorno real, cargaría desde archivos JSON
		// Por ahora, inicializamos con traducciones vacías
		this.translations = {};

		// Si hay traducciones proporcionadas en la configuración, usarlas
		if (this.config.translationsPath && typeof window !== 'undefined') {
			try {
				// Intentar cargar traducciones desde archivos
				for (const locale of this.config.supportedLocales || []) {
					try {
						const response = await fetch(`${this.config.translationsPath}/${locale}.json`);
						if (response.ok) {
							this.translations[locale] = await response.json();
						}
					} catch {
						// Ignorar errores de carga
					}
				}
			} catch {
				// Ignorar errores
			}
		}
	}

	/**
	 * Traduce una clave
	 */
	t(key: string, params?: Record<string, any>): string {
		const translation = this.getTranslation(key);

		if (!translation) {
			console.warn(`⚠️  Traducción no encontrada para clave: ${key}`);
			return key;
		}

		return this.interpolate(translation, params);
	}

	/**
	 * Obtiene una traducción
	 */
	private getTranslation(key: string): string | null {
		const keys = key.split('.');
		let current: any = this.translations[this.currentLocale];

		// Intentar con locale actual
		for (const k of keys) {
			if (current && typeof current === 'object' && k in current) {
				current = current[k];
			} else {
				// Intentar con fallback locale
				current = this.translations[this.config.fallbackLocale || 'es'];
				for (const k2 of keys) {
					if (current && typeof current === 'object' && k2 in current) {
						current = current[k2];
					} else {
						return null;
					}
				}
				break;
			}
		}

		return typeof current === 'string' ? current : null;
	}

	/**
	 * Interpola parámetros en una traducción
	 */
	private interpolate(text: string, params?: Record<string, any>): string {
		if (!params) {
			return text;
		}

		return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
			return params[key] !== undefined ? String(params[key]) : match;
		});
	}

	/**
	 * Cambia el locale actual
	 */
	async changeLocale(locale: string): Promise<void> {
		if (!this.isLocaleSupported(locale)) {
			throw new Error(`Locale ${locale} no está soportado`);
		}

		this.currentLocale = locale;

		// Guardar en almacenamiento
		if (typeof window !== 'undefined' && this.config.storageKey) {
			localStorage.setItem(this.config.storageKey, locale);
		}

		// Cargar traducciones del nuevo locale si no están cargadas
		if (!this.translations[locale]) {
			await this.loadTranslations();
		}

		// Emitir evento de cambio de locale
		if (typeof window !== 'undefined') {
			window.dispatchEvent(
				new CustomEvent('i18n:locale-changed', {
					detail: { locale },
				}),
			);
		}

		console.log(`✅ I18n: Locale cambiado a ${locale}`);
	}

	/**
	 * Obtiene el locale actual
	 */
	getCurrentLocale(): string {
		return this.currentLocale;
	}

	/**
	 * Obtiene los locales soportados
	 */
	getSupportedLocales(): string[] {
		return this.config.supportedLocales || [];
	}

	/**
	 * Agrega traducciones manualmente
	 */
	addTranslations(locale: string, translations: TranslationData): void {
		if (!this.translations[locale]) {
			this.translations[locale] = {};
		}

		this.translations[locale] = {
			...this.translations[locale],
			...translations,
		};
	}

	/**
	 * Formatea una fecha según el locale
	 */
	formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
		return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
	}

	/**
	 * Formatea un número según el locale
	 */
	formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
		return new Intl.NumberFormat(this.currentLocale, options).format(number);
	}

	/**
	 * Formatea una moneda según el locale
	 */
	formatCurrency(amount: number, currency: string = 'USD'): string {
		return new Intl.NumberFormat(this.currentLocale, {
			style: 'currency',
			currency,
		}).format(amount);
	}

	/**
	 * Pluraliza una clave según el número
	 */
	plural(key: string, count: number, params?: Record<string, any>): string {
		const pluralKey = count === 1 ? `${key}.one` : `${key}.other`;
		const translation = this.getTranslation(pluralKey) || this.getTranslation(key);

		if (!translation) {
			return key;
		}

		return this.interpolate(translation, { ...params, count });
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		currentLocale: string;
		supportedLocales: string[];
		translationsLoaded: string[];
	} {
		return {
			initialized: this.initialized,
			currentLocale: this.currentLocale,
			supportedLocales: this.config.supportedLocales || [],
			translationsLoaded: Object.keys(this.translations),
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): I18nConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<I18nConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
