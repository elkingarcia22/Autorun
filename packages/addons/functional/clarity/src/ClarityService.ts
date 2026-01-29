/**
 * ClarityService
 *
 * Servicio que maneja todas las operaciones de Microsoft Clarity:
 * - Inicialización del script de tracking
 * - Tracking de eventos personalizados
 * - Configuración de opciones
 * - Gestión del estado de Clarity
 */

export interface ClarityConfig {
	projectId: string;
	enabled?: boolean;
	cookieConsent?: boolean;
	trackClicks?: boolean;
	trackScroll?: boolean;
	trackHeatmaps?: boolean;
	trackRecordings?: boolean;
	maskText?: boolean;
	maskImages?: boolean;
	sampleRate?: number;
}

export interface ClarityEvent {
	name: string;
	properties?: Record<string, any>;
}

export class ClarityService {
	private config: ClarityConfig;
	private initialized = false;
	private clarityScript?: HTMLScriptElement;

	constructor(config: ClarityConfig) {
		this.config = {
			enabled: true,
			trackClicks: true,
			trackScroll: true,
			trackHeatmaps: true,
			trackRecordings: true,
			maskText: false,
			maskImages: false,
			sampleRate: 1.0,
			...config,
		};
	}

	/**
	 * Inicializa el servicio de Clarity
	 */
	async initialize(): Promise<void> {
		if (!this.config.projectId) {
			throw new Error('Clarity project ID es requerido');
		}

		if (!this.config.enabled) {
			console.log('📊 Clarity: Deshabilitado por configuración');
			return;
		}

		if (this.initialized) {
			console.warn('⚠️  Clarity ya está inicializado');
			return;
		}

		// Verificar si estamos en un entorno de navegador
		if (typeof window === 'undefined') {
			console.warn('⚠️  Clarity solo puede inicializarse en el navegador');
			return;
		}

		// Verificar si Clarity ya está cargado
		if ((window as any).clarity) {
			console.log('✅ Clarity ya está cargado');
			this.initialized = true;
			return;
		}

		// Crear y cargar el script de Clarity
		this.loadClarityScript();

		this.initialized = true;
		console.log('✅ Clarity Service: Inicializado correctamente');
	}

	/**
	 * Carga el script de Clarity en el documento
	 */
	private loadClarityScript(): void {
		if (typeof document === 'undefined') {
			return;
		}

		// Crear script element
		this.clarityScript = document.createElement('script');
		this.clarityScript.type = 'text/javascript';
		this.clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${this.config.projectId}");
    `;

		// Configurar opciones de Clarity si están disponibles
		if (this.config.maskText !== undefined || this.config.maskImages !== undefined) {
			const configScript = document.createElement('script');
			configScript.type = 'text/javascript';
			configScript.innerHTML = `
        if (window.clarity) {
          window.clarity('consent', ${this.config.cookieConsent ? 'true' : 'false'});
          ${this.config.maskText ? `window.clarity('set', 'maskText', true);` : ''}
          ${this.config.maskImages ? `window.clarity('set', 'maskImages', true);` : ''}
        }
      `;
			document.head.appendChild(configScript);
		}

		// Agregar script al head
		document.head.appendChild(this.clarityScript);
	}

	/**
	 * Trackea un evento personalizado
	 */
	trackEvent(eventName: string, properties?: Record<string, any>): void {
		if (!this.initialized || !this.config.enabled) {
			return;
		}

		if (typeof window === 'undefined' || !(window as any).clarity) {
			console.warn('⚠️  Clarity no está disponible para trackear eventos');
			return;
		}

		try {
			(window as any).clarity('event', eventName, properties || {});
			console.log(`📊 Clarity: Evento trackeado - ${eventName}`, properties);
		} catch (error) {
			console.error('❌ Error al trackear evento en Clarity:', error);
		}
	}

	/**
	 * Trackea un identificador de usuario
	 */
	identify(userId: string, properties?: Record<string, any>): void {
		if (!this.initialized || !this.config.enabled) {
			return;
		}

		if (typeof window === 'undefined' || !(window as any).clarity) {
			console.warn('⚠️  Clarity no está disponible para identificar usuarios');
			return;
		}

		try {
			(window as any).clarity('identify', userId, properties || {});
			console.log(`📊 Clarity: Usuario identificado - ${userId}`, properties);
		} catch (error) {
			console.error('❌ Error al identificar usuario en Clarity:', error);
		}
	}

	/**
	 * Actualiza la configuración de Clarity
	 */
	updateConfig(config: Partial<ClarityConfig>): void {
		this.config = { ...this.config, ...config };

		if (typeof window !== 'undefined' && (window as any).clarity) {
			if (config.maskText !== undefined) {
				(window as any).clarity('set', 'maskText', config.maskText);
			}
			if (config.maskImages !== undefined) {
				(window as any).clarity('set', 'maskImages', config.maskImages);
			}
			if (config.cookieConsent !== undefined) {
				(window as any).clarity('consent', config.cookieConsent);
			}
		}
	}

	/**
	 * Habilita o deshabilita Clarity
	 */
	setEnabled(enabled: boolean): void {
		this.config.enabled = enabled;

		if (typeof window !== 'undefined' && (window as any).clarity) {
			if (enabled) {
				// Clarity ya está cargado, solo habilitar
				console.log('✅ Clarity habilitado');
			} else {
				// Deshabilitar removiendo el script
				this.destroy();
				console.log('🔌 Clarity deshabilitado');
			}
		}
	}

	/**
	 * Obtiene el estado actual del servicio
	 */
	getStatus(): {
		initialized: boolean;
		enabled: boolean;
		projectId: string;
		clarityLoaded: boolean;
	} {
		return {
			initialized: this.initialized,
			enabled: this.config.enabled || false,
			projectId: this.config.projectId,
			clarityLoaded: typeof window !== 'undefined' && !!(window as any).clarity,
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): ClarityConfig {
		return { ...this.config };
	}

	/**
	 * Destruye el servicio y limpia recursos
	 */
	destroy(): void {
		if (this.clarityScript && this.clarityScript.parentNode) {
			this.clarityScript.parentNode.removeChild(this.clarityScript);
		}

		// Limpiar referencia global si existe
		if (typeof window !== 'undefined') {
			try {
				delete (window as any).clarity;
			} catch {
				// Ignorar errores al eliminar
			}
		}

		this.initialized = false;
		this.clarityScript = undefined;
	}
}
