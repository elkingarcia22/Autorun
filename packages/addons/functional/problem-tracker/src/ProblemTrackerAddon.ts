/**
 * ProblemTrackerAddon
 *
 * Add-on funcional que implementa IFunctionalAddon.
 * Proporciona sistema automático de captura y tracking de problemas y soluciones:
 * - Detección automática de problemas
 * - Registro de problemas y soluciones
 * - Búsqueda de soluciones anteriores
 * - Sugerencias automáticas
 * - Actualización de guías
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { ProblemTrackerService } from './ProblemTrackerService';
import { ProblemTrackerConfig, Problem, Solution } from './types';

export class ProblemTrackerAddon implements IFunctionalAddon {
	readonly id = 'problem-tracker';
	readonly name = 'Problem Tracker';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description =
		'Sistema automático de captura y tracking de problemas y soluciones durante el desarrollo';

	private service?: ProblemTrackerService;
	private errorGuideGenerator?: any; // ⭐ NUEVO: Generador de guías de errores
	private active = false;
	private config: ProblemTrackerConfig = {
		enabled: true,
		persistLocally: true,
		problemsDirectory: 'docs/problems-solutions',
		indexFile: 'docs/problems-solutions/index.json',
		autoDetectProblems: true,
		autoSuggestSolutions: true,
		autoUpdateGuides: false,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.['problem-tracker'] || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			persistLocally: addonConfig.persistLocally !== false,
			problemsDirectory: addonConfig.problemsDirectory || 'docs/problems-solutions',
			indexFile: addonConfig.indexFile || 'docs/problems-solutions/index.json',
			autoDetectProblems: addonConfig.autoDetectProblems !== false,
			autoSuggestSolutions: addonConfig.autoSuggestSolutions !== false,
			autoUpdateGuides: addonConfig.autoUpdateGuides === true,
			categories: addonConfig.categories || [
				'headersection',
				'contentmanager',
				'datatable',
				'componentes',
				'otros',
			],
		};

		// Inicializar servicio
		this.service = new ProblemTrackerService(this.config);

		try {
			await this.service.initialize();
			console.log('✅ Problem Tracker Add-on: Inicializado correctamente');

			// ⭐ NUEVO: Inicializar generador de guías de errores
			if (this.config.autoUpdateGuides) {
				try {
					const { ErrorGuideGenerator } = await import('./ErrorGuideGenerator');
					this.errorGuideGenerator = new ErrorGuideGenerator(this.service);
					console.log('✅ Error Guide Generator: Inicializado');
				} catch (error) {
					console.warn('⚠️ Error Guide Generator: No disponible', error);
				}
			}
		} catch (error) {
			console.error(`❌ Problem Tracker Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			// Intentar inicializar si no está inicializado
			this.service = new ProblemTrackerService(this.config);
			await this.service.initialize();
		}

		this.service.setEnabled(true);
		this.active = true;

		// ⚠️ CRÍTICO: Configurar captura automática de errores
		this.setupAutomaticErrorCapture();

		console.log('✅ Problem Tracker Add-on: Activado con captura automática');
	}

	/**
	 * Configura captura automática de errores y problemas
	 */
	private setupAutomaticErrorCapture(): void {
		// Interceptar console.error para capturar errores automáticamente
		if (typeof console !== 'undefined') {
			const originalError = console.error;
			const self = this;

			console.error = function (...args: any[]) {
				// Llamar al error original
				originalError.apply(console, args);

				// Capturar error si el servicio está activo
				if (self.active && self.service) {
					const errorMessage = args
						.map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg)))
						.join(' ');

					// Detectar problemas automáticamente
					self.service
						.detectProblem(errorMessage, {
							logs: [errorMessage],
						})
						.catch((err) => {
							// Ignorar errores de detección para no crear bucles
						});
				}
			};
		}
	}

	async deactivate(): Promise<void> {
		this.active = false;
		this.service?.setEnabled(false);
		console.log('🔌 Problem Tracker Add-on: Desactivado');
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus(): 'active' | 'inactive' {
		return this.active ? 'active' : 'inactive';
	}

	destroy(): void {
		this.service?.destroy();
		this.active = false;
		this.service = undefined;
	}

	async configure(config: Record<string, any>): Promise<void> {
		const trackerConfig: Partial<ProblemTrackerConfig> = {};

		if (config.enabled !== undefined) trackerConfig.enabled = config.enabled;
		if (config.persistLocally !== undefined) trackerConfig.persistLocally = config.persistLocally;
		if (config.problemsDirectory) trackerConfig.problemsDirectory = config.problemsDirectory;
		if (config.indexFile) trackerConfig.indexFile = config.indexFile;
		if (config.autoDetectProblems !== undefined)
			trackerConfig.autoDetectProblems = config.autoDetectProblems;
		if (config.autoSuggestSolutions !== undefined)
			trackerConfig.autoSuggestSolutions = config.autoSuggestSolutions;
		if (config.autoUpdateGuides !== undefined)
			trackerConfig.autoUpdateGuides = config.autoUpdateGuides;
		if (config.categories) trackerConfig.categories = config.categories;

		this.config = { ...this.config, ...trackerConfig };

		if (this.service) {
			this.service.updateConfig(trackerConfig);
		} else {
			// Si no hay servicio, inicializar con la nueva configuración
			this.service = new ProblemTrackerService(this.config);
			await this.service.initialize();
		}
	}

	/**
	 * Hook llamado cuando un archivo cambia
	 */
	async onFileChange(filePath: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// ⚠️ CRÍTICO: Detectar problemas automáticamente en archivos modificados
		try {
			const fs = await import('fs/promises');
			const content = await fs.readFile(filePath, 'utf-8');

			// Analizar contenido para detectar problemas comunes
			await this.analyzeFileForProblems(filePath, content);

			console.log(`🔍 Problem Tracker: Archivo analizado - ${filePath}`);
		} catch (error) {
			// Ignorar errores de lectura (archivo puede no existir aún)
			console.log(`🔍 Problem Tracker: Archivo modificado - ${filePath}`);
		}
	}

	/**
	 * Analiza un archivo para detectar problemas comunes
	 */
	private async analyzeFileForProblems(filePath: string, content: string): Promise<void> {
		if (!this.service) return;

		// Detectar problemas comunes en el código
		const problems: string[] = [];

		// 1. Detectar ContentManager.innerHTML = '' sin preservación
		if (
			content.includes('contentArea.innerHTML') &&
			!content.includes('preservar') &&
			!content.includes('insertAdjacentHTML') &&
			!content.includes('updateContent.*intercept')
		) {
			problems.push('ContentManager puede eliminar elementos personalizados sin preservación');
		}

		// 2. Detectar spacing incorrecto
		if (
			content.includes('var(--ubits-spacing-xl') &&
			(content.includes('gap') || content.includes('margin-top'))
		) {
			problems.push('Uso de spacing-xl (20px) cuando puede requerir spacing-lg (16px)');
		}

		// 3. Detectar insertAdjacentHTML sin reinicialización
		if (
			content.includes('insertAdjacentHTML') &&
			!content.includes('initEncuestas') &&
			!content.includes('reinicializar') &&
			!content.includes('addEventListener')
		) {
			problems.push('Restaurar elementos desde HTML puede perder event listeners');
		}

		// 4. Detectar MutationObserver sin cooldown
		if (
			content.includes('MutationObserver') &&
			!content.includes('cooldown') &&
			!content.includes('isReinitializing') &&
			!content.includes('lastReinitTime')
		) {
			problems.push('MutationObserver puede entrar en bucle infinito sin cooldown');
		}

		// Registrar problemas detectados
		for (const problem of problems) {
			await this.service.detectProblem(problem, {
				archivo: filePath,
			});
		}
	}

	/**
	 * Hook llamado después de hacer deploy
	 */
	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		console.log(`🔍 Problem Tracker: Deploy completado - ${url}`);
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Registrar un problema
			registerProblem: async (problem: Omit<Problem, 'id' | 'fecha_deteccion'>) => {
				if (!this.service) {
					throw new Error('Problem Tracker service no está inicializado');
				}
				return this.service.registerProblem(problem);
			},

			// Registrar una solución
			registerSolution: async (solution: Omit<Solution, 'id' | 'fecha_implementacion'>) => {
				if (!this.service) {
					throw new Error('Problem Tracker service no está inicializado');
				}
				return this.service.registerSolution(solution);
			},

			// Detectar problema automáticamente
			detectProblem: async (
				description: string,
				context?: {
					archivo?: string;
					linea?: number;
					codigo?: string;
					logs?: string[];
				},
			) => {
				if (!this.service) {
					throw new Error('Problem Tracker service no está inicializado');
				}
				return this.service.detectProblem(description, context);
			},

			// Buscar problemas similares
			searchSimilarProblems: (query: string, category?: string) => {
				if (!this.service) {
					throw new Error('Problem Tracker service no está inicializado');
				}
				return this.service.searchSimilarProblems(query, category);
			},

			// Buscar soluciones
			searchSolutions: (problemId: string) => {
				if (!this.service) {
					throw new Error('Problem Tracker service no está inicializado');
				}
				return this.service.searchSolutions(problemId);
			},

			// Sugerir soluciones
			suggestSolutions: (problem: Problem) => {
				if (!this.service) {
					throw new Error('Problem Tracker service no está inicializado');
				}
				return this.service.suggestSolutions(problem);
			},

			// Obtener estado
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
						enabled: false,
						problemsCount: 0,
						solutionsCount: 0,
						lastUpdate: '',
					};
				}
				return this.service.getStatus();
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración
			updateConfig: (config: Partial<ProblemTrackerConfig>) => {
				if (!this.service) {
					throw new Error('Problem Tracker service no está inicializado');
				}
				return this.service.updateConfig(config);
			},

			// Habilitar/deshabilitar
			setEnabled: (enabled: boolean) => {
				if (!this.service) {
					throw new Error('Problem Tracker service no está inicializado');
				}
				return this.service.setEnabled(enabled);
			},

			// ⭐ NUEVO: Generar guía de errores automáticamente
			generateErrorGuide: async () => {
				if (!this.errorGuideGenerator) {
					throw new Error(
						'Error Guide Generator no está inicializado. Activa autoUpdateGuides en la configuración.',
					);
				}
				return this.errorGuideGenerator.generateErrorGuide();
			},

			// ⭐ NUEVO: Sugerir soluciones basadas en problemas similares
			suggestSolutionsFromHistory: async (problemDescription: string, category?: string) => {
				if (!this.errorGuideGenerator) {
					// Fallback a búsqueda básica
					return (
						this.service?.suggestSolutions({
							id: 'temp',
							titulo: problemDescription,
							descripcion: problemDescription,
							categoria: category || 'otros',
							fecha_deteccion: new Date().toISOString().split('T')[0],
							estado: 'pendiente',
						} as any) || []
					);
				}
				return this.errorGuideGenerator.suggestSolutions(problemDescription, category);
			},
		};
	}
}
