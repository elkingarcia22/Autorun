/**
 * InteractivePrompt
 *
 * Utilidad para hacer prompts interactivos en la terminal usando readline
 */

import * as readline from 'readline';

export class InteractivePrompt {
	private rl: readline.Interface;

	constructor() {
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
	}

	/**
	 * Hace una pregunta y espera respuesta
	 */
	async question(prompt: string): Promise<string> {
		return new Promise((resolve) => {
			this.rl.question(prompt, (answer) => {
				resolve(answer.trim());
			});
		});
	}

	/**
	 * Hace una pregunta de opción múltiple
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

		const answer = await this.question(
			`Selecciona una opción (1-${options.length})${defaultValue ? ` [Enter para default]` : ''}: `,
		);

		if (!answer && defaultValue) {
			return defaultValue;
		}

		const index = parseInt(answer, 10) - 1;
		if (index >= 0 && index < options.length) {
			return options[index].value;
		}

		if (defaultValue) {
			return defaultValue;
		}

		// Si la respuesta no es válida, pedir de nuevo
		console.log('⚠️  Opción inválida. Intenta de nuevo.\n');
		return this.select(prompt, options, defaultValue);
	}

	/**
	 * Hace una pregunta de confirmación (sí/no)
	 */
	async confirm(prompt: string, defaultValue: boolean = true): Promise<boolean> {
		const defaultText = defaultValue ? 'S/n' : 's/N';
		const answer = await this.question(`${prompt} (${defaultText}): `);

		if (!answer) {
			return defaultValue;
		}

		const lowerAnswer = answer.toLowerCase();
		return lowerAnswer === 's' || lowerAnswer === 'y' || lowerAnswer === 'yes' || lowerAnswer === 'si';
	}

	/**
	 * Cierra la interfaz readline
	 */
	close(): void {
		this.rl.close();
	}
}

