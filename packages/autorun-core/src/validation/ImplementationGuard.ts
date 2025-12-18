/**
 * ImplementationGuard
 *
 * Guard que intercepta write() y search_replace() para verificar que se sigan
 * los lineamientos antes de escribir código.
 *
 * Este guard BLOQUEA TÉCNICAMENTE la ejecución de herramientas de escritura
 * si no se completan los pasos obligatorios.
 */

import { PreWriteValidator, ImplementationBlockedError } from './PreWriteValidator';
import {
	detectComponentFromContent,
	detectComponentFromMessage,
} from '../helpers/implementationHelpers';

export class ImplementationGuard {
	private static blocked = false;
	private static pendingChecks: Map<string, boolean> = new Map();

	/**
	 * Verificar si se puede escribir código
	 *
	 * @param filePath Ruta del archivo
	 * @param content Contenido a escribir
	 * @param context Contexto adicional
	 * @returns true si se puede escribir, false si está bloqueado
	 */
	static async canWrite(
		filePath: string,
		content: string,
		context?: {
			componentName?: string;
			userMessage?: string;
		},
	): Promise<{
		allowed: boolean;
		reason?: string;
		error?: ImplementationBlockedError;
	}> {
		// 1. Detectar componente del contenido
		const detected = detectComponentFromContent(content);
		const componentName = context?.componentName || detected || undefined;

		// 2. Verificar con PreWriteValidator
		const validation = await PreWriteValidator.validateBeforeWrite(filePath, content, {
			componentName,
			userMessage: context?.userMessage,
		});

		if (!validation.valid) {
			const error = new ImplementationBlockedError(
				validation.errors.join('\n'),
				validation.componentName,
				validation.missingSteps,
			);

			return {
				allowed: false,
				reason: validation.errors.join('\n'),
				error,
			};
		}

		return { allowed: true };
	}

	/**
	 * Wrapper seguro para write()
	 *
	 * Este método DEBE usarse en lugar de write() directo cuando se implementa un componente
	 */
	static async safeWrite(
		filePath: string,
		contents: string,
		context?: {
			componentName?: string;
			userMessage?: string;
		},
	): Promise<void> {
		const check = await this.canWrite(filePath, contents, context);

		if (!check.allowed) {
			if (check.error) {
				throw check.error;
			}
			throw new ImplementationBlockedError(check.reason || 'Implementación bloqueada');
		}

		// Si pasa la verificación, llamar a write() original
		// Nota: En un entorno real, esto llamaría a la función write() del sistema
		// Por ahora, solo validamos
		console.log(`✅ Verificación pasada, procediendo con write() para: ${filePath}`);
	}

	/**
	 * Wrapper seguro para search_replace()
	 */
	static async safeSearchReplace(
		filePath: string,
		oldString: string,
		newString: string,
		context?: {
			componentName?: string;
			userMessage?: string;
		},
	): Promise<void> {
		// Leer el archivo primero para obtener el contenido completo
		// Nota: En un entorno real, esto leería el archivo
		// Por ahora, validamos con el newString que es lo que se va a escribir

		const check = await this.canWrite(filePath, newString, context);

		if (!check.allowed) {
			if (check.error) {
				throw check.error;
			}
			throw new ImplementationBlockedError(check.reason || 'Implementación bloqueada');
		}

		console.log(`✅ Verificación pasada, procediendo con search_replace() para: ${filePath}`);
	}

	/**
	 * Verificar si hay bloqueo activo
	 */
	static isBlocked(): boolean {
		return this.blocked;
	}

	/**
	 * Establecer bloqueo
	 */
	static setBlocked(blocked: boolean): void {
		this.blocked = blocked;
	}
}
