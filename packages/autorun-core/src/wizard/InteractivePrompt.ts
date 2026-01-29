/**
 * InteractivePrompt
 *
 * Utilidad para hacer prompts interactivos en la terminal usando readline
 * Soporta tanto modo interactivo (usuario) como modo automático (asistente Cursor)
 */

import * as readline from 'readline';

export class InteractivePrompt {
	private rl: readline.Interface;
	private autoAnswers: string[] = [];
	private autoAnswerIndex: number = 0;
	private isAutoMode: boolean = false;

	constructor() {
		// Solo crear readline si realmente hay TTY disponible
		// Si no hay TTY, no crear readline para evitar bloqueos
		if (process.stdin.isTTY && process.stdout.isTTY) {
			this.rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});
		} else {
			// Crear un readline dummy que no bloquee
			// Esto permite que el código funcione pero no intenta leer de stdin
			this.rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});
			// Cerrar inmediatamente para evitar bloqueos
			try {
				this.rl.close();
			} catch (error) {
				// Ignorar errores al cerrar
			}
		}

		// Verificar si hay respuestas automáticas desde variables de entorno o argumentos
		this.initializeAutoMode();
	}

	/**
	 * Inicializa el modo automático si hay respuestas disponibles
	 */
	private initializeAutoMode(): void {
		// Verificar variable de entorno AUTORUN_ANSWERS (formato: "1,16" o "1\n16")
		const envAnswers = process.env.AUTORUN_ANSWERS;
		if (envAnswers) {
			this.autoAnswers = envAnswers
				.split(/[,\n]/)
				.map((a) => a.trim())
				.filter((a) => a);
			this.isAutoMode = this.autoAnswers.length > 0;
			if (this.isAutoMode) {
				console.log('🤖 Modo automático activado (respuestas del asistente)\n');
			}
		}

		// Verificar argumentos de línea de comandos --answers="1,16"
		const args = process.argv.slice(2);
		const answersArg = args.find((arg) => arg.startsWith('--answers='));
		if (answersArg && !this.isAutoMode) {
			const answersValue = answersArg.split('=')[1]?.replace(/^["']|["']$/g, '');
			if (answersValue) {
				this.autoAnswers = answersValue
					.split(/[,\n]/)
					.map((a) => a.trim())
					.filter((a) => a);
				this.isAutoMode = this.autoAnswers.length > 0;
				if (this.isAutoMode) {
					console.log('🤖 Modo automático activado (respuestas desde argumentos)\n');
				}
			}
		}
	}

	/**
	 * Obtiene la siguiente respuesta automática si está disponible
	 */
	private getNextAutoAnswer(): string | null {
		if (this.isAutoMode && this.autoAnswerIndex < this.autoAnswers.length) {
			const answer = this.autoAnswers[this.autoAnswerIndex];
			this.autoAnswerIndex++;
			return answer;
		}
		return null;
	}

	/**
	 * Hace una pregunta y espera respuesta
	 * Si está en modo automático, usa la respuesta automática
	 * Si no, espera input del usuario
	 */
	async question(prompt: string): Promise<string> {
		// Intentar obtener respuesta automática primero
		const autoAnswer = this.getNextAutoAnswer();
		if (autoAnswer !== null) {
			console.log(`${prompt}${autoAnswer}`);
			return autoAnswer;
		}

		// Si estamos en modo automático pero se agotaron las respuestas, DESACTIVAR modo automático
		// para volver a modo interactivo y permitir que el usuario responda
		if (
			this.isAutoMode &&
			this.autoAnswers.length > 0 &&
			this.autoAnswerIndex >= this.autoAnswers.length
		) {
			// Desactivar modo automático - volver a modo interactivo
			this.isAutoMode = false;
			// Intentar recrear readline si está cerrado
			try {
				if (!this.rl || (this.rl as any).closed) {
					this.rl = readline.createInterface({
						input: process.stdin,
						output: process.stdout,
					});
				}
			} catch (error) {
				// Si falla recrear readline, intentar de nuevo
				this.rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				});
			}
			// Continuar con el flujo normal de modo interactivo (NO retornar vacío)
		}

		// Verificar si se fuerza modo interactivo con variable de entorno
		const forceInteractive = process.env.AUTORUN_FORCE_INTERACTIVE === 'true';

		// Verificar TTY
		const hasTTY = process.stdin.isTTY && process.stdout.isTTY;

		// ESTRATEGIA: SIEMPRE intentar leer de stdin primero
		// Solo usar default si realmente falla la lectura
		// Esto permite que funcione tanto en terminal como en chat (si el chat puede inyectar input)

		// Modo interactivo: esperar respuesta del usuario
		return new Promise((resolve, reject) => {
			// Si NO hay TTY y NO se fuerza modo interactivo, intentar leer de todas formas
			// pero con un timeout corto para detectar si realmente no hay input disponible
			if (!hasTTY && !forceInteractive) {
				// Intentar leer con timeout para detectar si hay input disponible
				const timeout = setTimeout(() => {
					// Si después de 500ms no hay respuesta, probablemente no hay input disponible
					// Retornar vacío para usar default
					console.error(`[DEBUG question] Timeout: No hay input disponible, usando default`);
					resolve('');
				}, 500);

				// Intentar leer de stdin de todas formas (por si el chat puede inyectar input)
				try {
					if (!this.rl || (this.rl as any).closed) {
						this.rl = readline.createInterface({
							input: process.stdin,
							output: process.stdout,
						});
					}

					this.rl.question(prompt, (answer) => {
						clearTimeout(timeout);
						resolve(answer.trim());
					});
				} catch (error) {
					clearTimeout(timeout);
					// Si falla, retornar vacío para usar default
					resolve('');
				}
				return;
			}

			// HAY TTY o modo interactivo forzado: SIEMPRE intentar leer de stdin
			console.error(
				`[DEBUG question] HAY TTY o modo interactivo forzado, intentando leer de stdin...`,
			);

			// HAY TTY (terminal real): SIEMPRE intentar leer de stdin
			// Intentar recrear readline si es necesario
			try {
				// Verificar si readline está disponible intentando usarlo
				if (!this.rl || (this.rl as any).closed) {
					this.rl = readline.createInterface({
						input: process.stdin,
						output: process.stdout,
					});
				}
			} catch (error) {
				// Si falla, intentar recrear readline de todas formas
				// NO retornar vacío automáticamente si hay TTY
				this.rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				});
			}

			try {
				// SIEMPRE intentar leer de stdin cuando hay TTY
				// NO usar timeout que cancele automáticamente
				this.rl.question(prompt, (answer) => {
					resolve(answer.trim());
				});
			} catch (error: any) {
				// Si el error es porque readline está cerrado, intentar recrearlo y volver a preguntar
				if (error.code === 'ERR_USE_AFTER_CLOSE') {
					// Recrear readline y volver a preguntar
					try {
						this.rl = readline.createInterface({
							input: process.stdin,
							output: process.stdout,
						});
						this.rl.question(prompt, (answer) => {
							resolve(answer.trim());
						});
					} catch (retryError) {
						// Si falla de nuevo, rechazar el error (no usar default automáticamente)
						reject(retryError);
					}
					return;
				}
				// Si hay otro error, rechazarlo (no usar default automáticamente)
				reject(error);
			}
		});
	}

	/**
	 * Hace una pregunta de opción múltiple
	 * Soporta modo automático (respuestas del asistente) y modo interactivo (usuario)
	 */
	async select(
		prompt: string,
		options: Array<{ value: string; label: string }>,
		defaultValue?: string,
	): Promise<string> {
		// Mostrar opciones de forma más limpia
		console.log(`\n${prompt}`);
		options.forEach((option, index) => {
			const marker = defaultValue === option.value ? '⭐' : ' ';
			console.log(`${marker} ${index + 1}. ${option.label}`);
		});

		// Verificar si hay respuesta automática disponible
		const autoAnswer = this.getNextAutoAnswer();
		if (autoAnswer !== null) {
			// Modo automático: usar respuesta del asistente
			const answerText = autoAnswer;
			console.log(
				`Selecciona una opción (1-${options.length})${defaultValue ? ` [Enter para default]` : ''}: ${answerText}`,
			);

			// Si la respuesta está vacía y hay un valor por defecto, usarlo
			if (!answerText || answerText.trim() === '') {
				if (defaultValue) {
					console.log(
						`✅ Usando opción por defecto: ${options.find((o) => o.value === defaultValue)?.label || defaultValue}\n`,
					);
					return defaultValue;
				}
			}

			const index = parseInt(answerText.trim(), 10) - 1;
			if (index >= 0 && index < options.length) {
				console.log(`✅ Seleccionado: ${options[index].label}\n`);
				return options[index].value;
			}

			// Si la respuesta automática no es válida, usar default o primera opción
			if (defaultValue) {
				console.log(
					`⚠️  Respuesta automática inválida, usando opción por defecto: ${options.find((o) => o.value === defaultValue)?.label || defaultValue}\n`,
				);
				return defaultValue;
			}
		}

		// Si estamos en modo automático pero se agotaron las respuestas, DESACTIVAR modo automático
		// para volver a modo interactivo y permitir que el usuario responda
		if (
			this.isAutoMode &&
			this.autoAnswers.length > 0 &&
			this.autoAnswerIndex >= this.autoAnswers.length
		) {
			// Desactivar modo automático - volver a modo interactivo
			this.isAutoMode = false;
			// Intentar recrear readline si está cerrado
			try {
				if (!this.rl || (this.rl as any).closed) {
					this.rl = readline.createInterface({
						input: process.stdin,
						output: process.stdout,
					});
				}
			} catch (error) {
				// Si falla recrear readline, intentar de nuevo
				this.rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				});
			}
			// Continuar con el flujo normal de modo interactivo (NO usar defaults automáticamente)
		}

		// Modo interactivo: esperar respuesta del usuario
		// Asegurar que stdin esté en modo raw para capturar la entrada correctamente
		if (process.stdin.isTTY) {
			process.stdin.setRawMode?.(false);
		}

		const answer = await this.question(
			`Selecciona una opción (1-${options.length})${defaultValue ? ` [Enter para default]` : ''}: `,
		);

		// DEBUG: Log para entender qué está pasando
		// console.log('[DEBUG select] answer:', answer, 'isAutoMode:', this.isAutoMode, 'autoAnswers.length:', this.autoAnswers.length, 'autoAnswerIndex:', this.autoAnswerIndex);

		// Si la respuesta está vacía, verificar el contexto
		// IMPORTANTE: En modo interactivo (sin respuestas automáticas), una respuesta vacía puede significar:
		// 1. El usuario presionó Enter (comportamiento normal, usar default si está disponible)
		// 2. El readline estaba cerrado y question() retornó vacío (NO usar default, recrear readline y preguntar de nuevo)
		// 3. Contexto no interactivo (sin TTY) - usar default automáticamente
		if (!answer || answer.trim() === '') {
			// Verificar si estamos en contexto no interactivo
			if (!process.stdin.isTTY || !process.stdout.isTTY) {
				// Contexto no interactivo: usar default automáticamente
				if (defaultValue) {
					console.log(
						`✅ Usando opción por defecto: ${options.find((o) => o.value === defaultValue)?.label || defaultValue}\n`,
					);
					return defaultValue;
				}
				// Si no hay default, usar primera opción
				const firstOption = options[0];
				console.log(`✅ Usando primera opción (contexto no interactivo): ${firstOption.label}\n`);
				return firstOption.value;
			}

			// Verificar si realmente estábamos en modo automático con respuestas que se agotaron
			const wasAutoModeWithAnswers =
				this.isAutoMode &&
				this.autoAnswers.length > 0 &&
				this.autoAnswerIndex >= this.autoAnswers.length;

			// Si estamos en modo interactivo (no automático), verificar si el readline está disponible
			if (!this.isAutoMode) {
				// Verificar si el readline está disponible y funcionando
				try {
					if (this.rl && !(this.rl as any).closed) {
						// Readline está disponible, el usuario presionó Enter intencionalmente
						if (defaultValue) {
							console.log(
								`✅ Usando opción por defecto: ${options.find((o) => o.value === defaultValue)?.label || defaultValue}\n`,
							);
							return defaultValue;
						}
						// Si no hay default, pedir de nuevo
						console.log('⚠️  Por favor selecciona una opción válida.\n');
						return this.select(prompt, options, defaultValue);
					} else {
						// Readline está cerrado, NO usar default automáticamente
						// Recrear readline y preguntar de nuevo
						console.log('[DEBUG select] Readline cerrado, recreando y preguntando de nuevo...');
						this.rl = readline.createInterface({
							input: process.stdin,
							output: process.stdout,
						});
						// Preguntar de nuevo sin usar default
						return this.select(prompt, options, defaultValue);
					}
				} catch (error) {
					// Error verificando readline, recrear y preguntar de nuevo
					console.log('[DEBUG select] Error verificando readline, recreando...');
					this.rl = readline.createInterface({
						input: process.stdin,
						output: process.stdout,
					});
					return this.select(prompt, options, defaultValue);
				}
			}

			// Si estamos en modo automático
			if (wasAutoModeWithAnswers) {
				// Realmente estábamos en modo automático y se agotaron las respuestas
				if (defaultValue) {
					console.log(
						`✅ Usando opción por defecto: ${options.find((o) => o.value === defaultValue)?.label || defaultValue}\n`,
					);
					return defaultValue;
				}
				const firstOption = options[0];
				console.log(`✅ Seleccionado: ${firstOption.label}\n`);
				return firstOption.value;
			}

			// Si estamos en modo automático pero nunca hubo respuestas, esto no debería pasar
			// Pero por seguridad, pedir de nuevo
			if (defaultValue) {
				console.log(
					`✅ Usando opción por defecto: ${options.find((o) => o.value === defaultValue)?.label || defaultValue}\n`,
				);
				return defaultValue;
			}
			console.log('⚠️  Por favor selecciona una opción válida.\n');
			return this.select(prompt, options, defaultValue);
		}

		const index = parseInt(answer.trim(), 10) - 1;
		if (index >= 0 && index < options.length) {
			console.log(`✅ Seleccionado: ${options[index].label}\n`);
			return options[index].value;
		}

		// Si la respuesta no es válida, pedir de nuevo (solo si no estamos en modo automático)
		if (!this.isAutoMode) {
			console.log('⚠️  Opción inválida. Intenta de nuevo.\n');
			return this.select(prompt, options, defaultValue);
		}
		// En modo automático, usar default o primera opción
		if (defaultValue) {
			console.log(
				`⚠️  Opción inválida, usando opción por defecto: ${options.find((o) => o.value === defaultValue)?.label || defaultValue}\n`,
			);
			return defaultValue;
		}
		const firstOption = options[0];
		console.log(`⚠️  Opción inválida, usando primera opción: ${firstOption.label}\n`);
		return firstOption.value;
	}

	/**
	 * Hace una pregunta de confirmación (sí/no)
	 * Soporta modo automático y modo interactivo
	 */
	async confirm(prompt: string, defaultValue: boolean = true): Promise<boolean> {
		const defaultText = defaultValue ? 'S/n' : 's/N';

		// Verificar si hay respuesta automática
		const autoAnswer = this.getNextAutoAnswer();
		if (autoAnswer !== null) {
			console.log(`${prompt} (${defaultText}): ${autoAnswer}`);
			if (!autoAnswer) {
				return defaultValue;
			}
			const lowerAnswer = autoAnswer.toLowerCase();
			return (
				lowerAnswer === 's' || lowerAnswer === 'y' || lowerAnswer === 'yes' || lowerAnswer === 'si'
			);
		}

		// Si estamos en modo automático pero se agotaron las respuestas
		if (
			this.isAutoMode &&
			this.autoAnswers.length > 0 &&
			this.autoAnswerIndex >= this.autoAnswers.length
		) {
			// Verificar si estamos en un contexto no interactivo (sin TTY)
			// Si no hay TTY, usar default automáticamente en lugar de intentar modo interactivo
			if (!process.stdin.isTTY || !process.stdout.isTTY) {
				// Contexto no interactivo: usar default automáticamente
				console.log(
					`${prompt} (${defaultText}): (contexto no interactivo, usando default: ${defaultValue ? 'Sí' : 'No'})`,
				);
				return defaultValue;
			}

			// Hay TTY (terminal interactivo): desactivar modo automático y volver a modo interactivo
			// Esto permite que el usuario responda en la terminal
			this.isAutoMode = false;
			// Intentar recrear readline si está cerrado
			try {
				if (!this.rl || (this.rl as any).closed) {
					this.rl = readline.createInterface({
						input: process.stdin,
						output: process.stdout,
					});
				}
			} catch (error) {
				// Si falla recrear readline, verificar TTY de nuevo
				if (!process.stdin.isTTY || !process.stdout.isTTY) {
					// No hay TTY: usar default
					console.log(
						`${prompt} (${defaultText}): (error recreando readline, usando default: ${defaultValue ? 'Sí' : 'No'})`,
					);
					return defaultValue;
				}
				// Hay TTY: intentar recrear readline de nuevo
				this.rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				});
			}
			// Continuar con el flujo normal de modo interactivo (esperar respuesta del usuario en terminal)
		}

		// Modo interactivo: SIEMPRE intentar leer de stdin si hay TTY
		// Solo usar default automáticamente si NO hay TTY (chat de Cursor)
		const answer = await this.question(`${prompt} (${defaultText}): `);

		if (!answer) {
			return defaultValue;
		}

		const lowerAnswer = answer.toLowerCase();
		return (
			lowerAnswer === 's' || lowerAnswer === 'y' || lowerAnswer === 'yes' || lowerAnswer === 'si'
		);
	}

	/**
	 * Verifica si está en modo automático
	 * Solo retorna true si realmente hay respuestas automáticas disponibles
	 */
	isAuto(): boolean {
		// Solo considerar modo automático si hay respuestas automáticas disponibles
		// Si se agotaron todas las respuestas, ya no estamos en modo automático
		return (
			this.isAutoMode &&
			this.autoAnswers.length > 0 &&
			this.autoAnswerIndex < this.autoAnswers.length
		);
	}

	/**
	 * Verifica si hay respuestas automáticas disponibles (aunque se hayan agotado)
	 */
	hasAutoAnswers(): boolean {
		return this.isAutoMode && this.autoAnswers.length > 0;
	}

	/**
	 * Cierra la interfaz readline de forma segura
	 */
	close(): void {
		try {
			this.rl.close();
		} catch (error) {
			// Ignorar errores si ya está cerrado
		}
	}
}
