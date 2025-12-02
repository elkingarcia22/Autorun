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
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

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
			this.autoAnswers = envAnswers.split(/[,\n]/).map(a => a.trim()).filter(a => a);
			this.isAutoMode = this.autoAnswers.length > 0;
			if (this.isAutoMode) {
				console.log('🤖 Modo automático activado (respuestas del asistente)\n');
			}
		}

		// Verificar argumentos de línea de comandos --answers="1,16"
		const args = process.argv.slice(2);
		const answersArg = args.find(arg => arg.startsWith('--answers='));
		if (answersArg && !this.isAutoMode) {
			const answersValue = answersArg.split('=')[1]?.replace(/^["']|["']$/g, '');
			if (answersValue) {
				this.autoAnswers = answersValue.split(/[,\n]/).map(a => a.trim()).filter(a => a);
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

		// Modo interactivo: esperar respuesta del usuario
		return new Promise((resolve) => {
			// Intentar recrear readline si es necesario (manejar errores silenciosamente)
			try {
				// Verificar si readline está disponible intentando usarlo
				if (!this.rl) {
					this.rl = readline.createInterface({
						input: process.stdin,
						output: process.stdout,
					});
				}
			} catch (error) {
				// Si falla, recrear readline
				this.rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				});
			}

			this.rl.question(prompt, (answer) => {
				resolve(answer.trim());
			});
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
			console.log(`Selecciona una opción (1-${options.length})${defaultValue ? ` [Enter para default]` : ''}: ${answerText}`);
			
			// Si la respuesta está vacía y hay un valor por defecto, usarlo
			if (!answerText || answerText.trim() === '') {
				if (defaultValue) {
					console.log(`✅ Usando opción por defecto: ${options.find(o => o.value === defaultValue)?.label || defaultValue}\n`);
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
				console.log(`⚠️  Respuesta automática inválida, usando opción por defecto: ${options.find(o => o.value === defaultValue)?.label || defaultValue}\n`);
				return defaultValue;
			}
		}

		// Modo interactivo: esperar respuesta del usuario
		// Asegurar que stdin esté en modo raw para capturar la entrada correctamente
		if (process.stdin.isTTY) {
			process.stdin.setRawMode?.(false);
		}

		const answer = await this.question(
			`Selecciona una opción (1-${options.length})${defaultValue ? ` [Enter para default]` : ''}: `,
		);

		// Si la respuesta está vacía y hay un valor por defecto, usarlo
		if (!answer || answer.trim() === '') {
			if (defaultValue) {
				console.log(`✅ Usando opción por defecto: ${options.find(o => o.value === defaultValue)?.label || defaultValue}\n`);
				return defaultValue;
			}
			// Si no hay default y la respuesta está vacía, pedir de nuevo
			console.log('⚠️  Por favor selecciona una opción válida.\n');
			return this.select(prompt, options, defaultValue);
		}

		const index = parseInt(answer.trim(), 10) - 1;
		if (index >= 0 && index < options.length) {
			console.log(`✅ Seleccionado: ${options[index].label}\n`);
			return options[index].value;
		}

		// Si la respuesta no es válida, pedir de nuevo
		console.log('⚠️  Opción inválida. Intenta de nuevo.\n');
		return this.select(prompt, options, defaultValue);
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
			return lowerAnswer === 's' || lowerAnswer === 'y' || lowerAnswer === 'yes' || lowerAnswer === 'si';
		}

		// Modo interactivo
		const answer = await this.question(`${prompt} (${defaultText}): `);

		if (!answer) {
			return defaultValue;
		}

		const lowerAnswer = answer.toLowerCase();
		return lowerAnswer === 's' || lowerAnswer === 'y' || lowerAnswer === 'yes' || lowerAnswer === 'si';
	}

	/**
	 * Verifica si está en modo automático
	 */
	isAuto(): boolean {
		return this.isAutoMode;
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

