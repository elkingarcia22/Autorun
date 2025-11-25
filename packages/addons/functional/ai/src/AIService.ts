/**
 * AIService
 *
 * Servicio que maneja todas las operaciones de IA:
 * - Integración con Ollama (local)
 * - Integración con Gemini (Google)
 * - Generación de código
 * - Análisis de código
 * - Sugerencias inteligentes
 */

export interface AIConfig {
	provider?: 'ollama' | 'gemini';
	ollama?: {
		baseUrl?: string;
		model?: string;
	};
	gemini?: {
		apiKey?: string;
		model?: string;
	};
	autoSuggest?: boolean;
	maxTokens?: number;
	temperature?: number;
}

export interface AICompletion {
	text: string;
	usage?: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
}

export interface AICodeAnalysis {
	suggestions: Array<{
		line: number;
		message: string;
		severity: 'info' | 'warning' | 'error';
		suggestion?: string;
	}>;
	summary: string;
}

export class AIService {
	private config: AIConfig;
	private initialized = false;

	constructor(config: AIConfig) {
		this.config = {
			provider: 'ollama',
			ollama: {
				baseUrl: 'http://localhost:11434',
				model: 'llama2',
			},
			gemini: {
				model: 'gemini-pro',
			},
			autoSuggest: false,
			maxTokens: 1000,
			temperature: 0.7,
			...config,
		};
	}

	/**
	 * Inicializa el servicio y verifica conexión
	 */
	async initialize(): Promise<void> {
		if (this.config.provider === 'ollama') {
			await this.checkOllamaConnection();
		} else if (this.config.provider === 'gemini') {
			if (!this.config.gemini?.apiKey) {
				throw new Error('Gemini API key es requerida');
			}
		}

		this.initialized = true;
		console.log(`✅ AI Service: Inicializado con ${this.config.provider}`);
	}

	/**
	 * Verifica conexión con Ollama
	 */
	private async checkOllamaConnection(): Promise<void> {
		const baseUrl = this.config.ollama?.baseUrl || 'http://localhost:11434';

		try {
			const response = await fetch(`${baseUrl}/api/tags`);
			if (!response.ok) {
				throw new Error('Ollama no está disponible');
			}
			console.log('✅ Ollama conectado');
		} catch (error) {
			console.warn('⚠️  Ollama no está disponible. Asegúrate de que Ollama esté ejecutándose.');
		}
	}

	/**
	 * Genera completado de texto usando IA
	 */
	async complete(
		prompt: string,
		options?: {
			maxTokens?: number;
			temperature?: number;
			stop?: string[];
		},
	): Promise<AICompletion> {
		if (!this.initialized) {
			await this.initialize();
		}

		if (this.config.provider === 'ollama') {
			return await this.completeWithOllama(prompt, options);
		} else if (this.config.provider === 'gemini') {
			return await this.completeWithGemini(prompt, options);
		}

		throw new Error('Provider de IA no configurado');
	}

	/**
	 * Completa con Ollama
	 */
	private async completeWithOllama(
		prompt: string,
		options?: { maxTokens?: number; temperature?: number; stop?: string[] },
	): Promise<AICompletion> {
		const baseUrl = this.config.ollama?.baseUrl || 'http://localhost:11434';
		const model = this.config.ollama?.model || 'llama2';

		try {
			const response = await fetch(`${baseUrl}/api/generate`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					model,
					prompt,
					stream: false,
					options: {
						num_predict: options?.maxTokens || this.config.maxTokens,
						temperature: options?.temperature || this.config.temperature,
						stop: options?.stop || [],
					},
				}),
			});

			if (!response.ok) {
				throw new Error(`Ollama API error: ${response.statusText}`);
			}

			const data = await response.json();
			return {
				text: data.response || '',
				usage: {
					promptTokens: data.prompt_eval_count || 0,
					completionTokens: data.eval_count || 0,
					totalTokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
				},
			};
		} catch (error: any) {
			throw new Error(`Error al completar con Ollama: ${error.message}`);
		}
	}

	/**
	 * Completa con Gemini
	 */
	private async completeWithGemini(
		prompt: string,
		options?: { maxTokens?: number; temperature?: number; stop?: string[] },
	): Promise<AICompletion> {
		const apiKey = this.config.gemini?.apiKey;
		const model = this.config.gemini?.model || 'gemini-pro';

		if (!apiKey) {
			throw new Error('Gemini API key no configurada');
		}

		try {
			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						contents: [{ parts: [{ text: prompt }] }],
						generationConfig: {
							maxOutputTokens: options?.maxTokens || this.config.maxTokens,
							temperature: options?.temperature || this.config.temperature,
							stopSequences: options?.stop || [],
						},
					}),
				},
			);

			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Gemini API error: ${JSON.stringify(error)}`);
			}

			const data = await response.json();
			const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

			return {
				text,
				usage: {
					promptTokens: data.usageMetadata?.promptTokenCount || 0,
					completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
					totalTokens: data.usageMetadata?.totalTokenCount || 0,
				},
			};
		} catch (error: any) {
			throw new Error(`Error al completar con Gemini: ${error.message}`);
		}
	}

	/**
	 * Analiza código y genera sugerencias
	 */
	async analyzeCode(code: string, language: string = 'typescript'): Promise<AICodeAnalysis> {
		const prompt = `Analiza el siguiente código ${language} y proporciona sugerencias de mejora, errores potenciales y mejores prácticas:

\`\`\`${language}
${code}
\`\`\`

Responde en formato JSON con:
- suggestions: array de objetos con {line, message, severity, suggestion}
- summary: resumen general del análisis`;

		try {
			const completion = await this.complete(prompt, {
				maxTokens: 2000,
				temperature: 0.3,
			});

			// Intentar parsear JSON de la respuesta
			const jsonMatch = completion.text.match(/\{[\s\S]*\}/);
			if (jsonMatch) {
				const parsed = JSON.parse(jsonMatch[0]);
				return parsed as AICodeAnalysis;
			}

			// Si no hay JSON, crear análisis básico
			return {
				suggestions: [],
				summary: completion.text,
			};
		} catch (error: any) {
			return {
				suggestions: [],
				summary: `Error al analizar código: ${error.message}`,
			};
		}
	}

	/**
	 * Genera código basado en una descripción
	 */
	async generateCode(description: string, language: string = 'typescript'): Promise<string> {
		const prompt = `Genera código ${language} para: ${description}

Responde solo con el código, sin explicaciones adicionales.`;

		const completion = await this.complete(prompt, {
			maxTokens: 2000,
			temperature: 0.7,
		});

		// Extraer código de la respuesta
		const codeMatch =
			completion.text.match(/```(?:typescript|ts|javascript|js)?\n([\s\S]*?)```/) ||
			completion.text.match(/```\n([\s\S]*?)```/);

		return codeMatch ? codeMatch[1].trim() : completion.text.trim();
	}

	/**
	 * Refactoriza código
	 */
	async refactorCode(
		code: string,
		instructions: string,
		language: string = 'typescript',
	): Promise<string> {
		const prompt = `Refactoriza el siguiente código ${language} según estas instrucciones: ${instructions}

Código original:
\`\`\`${language}
${code}
\`\`\`

Responde solo con el código refactorizado, sin explicaciones.`;

		const completion = await this.complete(prompt, {
			maxTokens: 2000,
			temperature: 0.5,
		});

		const codeMatch =
			completion.text.match(/```(?:typescript|ts|javascript|js)?\n([\s\S]*?)```/) ||
			completion.text.match(/```\n([\s\S]*?)```/);

		return codeMatch ? codeMatch[1].trim() : completion.text.trim();
	}

	/**
	 * Genera documentación para código
	 */
	async generateDocumentation(code: string, language: string = 'typescript'): Promise<string> {
		const prompt = `Genera documentación JSDoc/TSDoc para el siguiente código ${language}:

\`\`\`${language}
${code}
\`\`\`

Responde solo con la documentación, sin el código.`;

		const completion = await this.complete(prompt, {
			maxTokens: 1000,
			temperature: 0.3,
		});

		return completion.text.trim();
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		provider: string;
		available: boolean;
	} {
		return {
			initialized: this.initialized,
			provider: this.config.provider || 'none',
			available:
				this.initialized &&
				(this.config.provider === 'ollama' ||
					(this.config.provider === 'gemini' && !!this.config.gemini?.apiKey)),
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): AIConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<AIConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
