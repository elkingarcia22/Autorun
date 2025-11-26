/**
 * AutorunErrors
 *
 * Clases de error específicas para Autorun con mensajes descriptivos
 */

/**
 * Error base para todos los errores de Autorun
 */
export class AutorunError extends Error {
	public readonly code: string;
	public readonly context?: Record<string, any>;

	constructor(
		message: string,
		code: string,
		context?: Record<string, any>,
	) {
		super(message);
		this.name = 'AutorunError';
		this.code = code;
		this.context = context;
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Error cuando un add-on no se encuentra
 */
export class AddonNotFoundError extends AutorunError {
	constructor(addonId: string, availableAddons?: string[]) {
		let message = `Add-on "${addonId}" no encontrado.`;
		
		if (availableAddons && availableAddons.length > 0) {
			message += `\n\nAdd-ons disponibles: ${availableAddons.join(', ')}`;
			message += `\n\n¿Quisiste decir uno de estos?`;
		} else {
			message += `\n\nAsegúrate de que el add-on esté instalado y registrado.`;
		}

		super(message, 'ADDON_NOT_FOUND', { addonId, availableAddons });
		this.name = 'AddonNotFoundError';
	}
}

/**
 * Error cuando un add-on no se puede cargar
 */
export class AddonLoadError extends AutorunError {
	constructor(addonId: string, path: string, reason: string) {
		const message = `No se pudo cargar el add-on "${addonId}" desde "${path}".\n\nRazón: ${reason}\n\nVerifica que:\n- El path sea correcto\n- El add-on tenga un manifest.json válido\n- Las dependencias estén instaladas`;

		super(message, 'ADDON_LOAD_ERROR', { addonId, path, reason });
		this.name = 'AddonLoadError';
	}
}

/**
 * Error cuando faltan dependencias
 */
export class MissingDependencyError extends AutorunError {
	constructor(addonId: string, missingDeps: string[]) {
		const depsList = missingDeps.map((dep) => `  - ${dep}`).join('\n');
		const message = `El add-on "${addonId}" requiere las siguientes dependencias que no están activas:\n\n${depsList}\n\nActiva las dependencias primero antes de activar este add-on.`;

		super(message, 'MISSING_DEPENDENCY', {
			addonId,
			missingDependencies: missingDeps,
		});
		this.name = 'MissingDependencyError';
	}
}

/**
 * Error cuando el hub no está inicializado
 */
export class HubNotInitializedError extends AutorunError {
	constructor(operation: string) {
		const message = `No se puede ejecutar "${operation}" porque el hub no está inicializado.\n\nLlama a hub.initialize() primero.`;

		super(message, 'HUB_NOT_INITIALIZED', { operation });
		this.name = 'HubNotInitializedError';
	}
}

/**
 * Error cuando el hub ya está inicializado
 */
export class HubAlreadyInitializedError extends AutorunError {
	constructor() {
		const message = `El hub ya está inicializado.\n\nSi necesitas reinicializar, crea una nueva instancia de AutorunHub.`;

		super(message, 'HUB_ALREADY_INITIALIZED');
		this.name = 'HubAlreadyInitializedError';
	}
}

/**
 * Error cuando la configuración es inválida
 */
export class InvalidConfigError extends AutorunError {
	constructor(reason: string, path?: string, errors?: string[]) {
		let message = `Configuración inválida${path ? ` en "${path}"` : ''}.\n\nRazón: ${reason}`;

		if (errors && errors.length > 0) {
			message += `\n\nErrores encontrados:\n${errors.map((e) => `  - ${e}`).join('\n')}`;
		}

		super(message, 'INVALID_CONFIG', { reason, path, errors });
		this.name = 'InvalidConfigError';
	}
}

/**
 * Error cuando no se puede acceder al archivo de configuración
 */
export class ConfigFileError extends AutorunError {
	constructor(path: string, reason: string) {
		const message = `No se pudo acceder al archivo de configuración "${path}".\n\nRazón: ${reason}\n\nVerifica que:\n- El archivo exista o tenga permisos de lectura/escritura\n- La ruta sea correcta`;

		super(message, 'CONFIG_FILE_ERROR', { path, reason });
		this.name = 'ConfigFileError';
	}
}

/**
 * Error cuando un add-on falla al inicializarse
 */
export class AddonInitializationError extends AutorunError {
	constructor(addonId: string, reason: string) {
		const message = `El add-on "${addonId}" falló al inicializarse.\n\nRazón: ${reason}\n\nVerifica la configuración del add-on y sus dependencias.`;

		super(message, 'ADDON_INITIALIZATION_ERROR', { addonId, reason });
		this.name = 'AddonInitializationError';
	}
}

/**
 * Error cuando un add-on falla al activarse
 */
export class AddonActivationError extends AutorunError {
	constructor(addonId: string, reason: string) {
		const message = `El add-on "${addonId}" falló al activarse.\n\nRazón: ${reason}\n\nVerifica que el add-on esté correctamente configurado.`;

		super(message, 'ADDON_ACTIVATION_ERROR', { addonId, reason });
		this.name = 'AddonActivationError';
	}
}

/**
 * Error cuando un servicio no está disponible
 */
export class ServiceNotFoundError extends AutorunError {
	constructor(addonId: string, serviceName: string) {
		const message = `El servicio "${serviceName}" no está disponible en el add-on "${addonId}".\n\nVerifica que:\n- El add-on esté activo\n- El servicio esté implementado en el add-on\n- El nombre del servicio sea correcto`;

		super(message, 'SERVICE_NOT_FOUND', { addonId, serviceName });
		this.name = 'ServiceNotFoundError';
	}
}

