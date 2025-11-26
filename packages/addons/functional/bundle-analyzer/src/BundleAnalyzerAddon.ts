/**
 * BundleAnalyzerAddon
 *
 * Add-on funcional de Bundle Analyzer que implementa IFunctionalAddon.
 * Proporciona análisis visual de bundles y optimización.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import {
	BundleAnalyzerService,
	BundleAnalyzerConfig,
	BundleAnalysisResult,
} from './BundleAnalyzerService';

export class BundleAnalyzerAddon implements IFunctionalAddon {
	readonly id = 'bundle-analyzer';
	readonly name = 'Bundle Analyzer';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Análisis visual de bundles y optimización';

	private service?: BundleAnalyzerService;
	private active = false;
	private config: BundleAnalyzerConfig = {
		analyzeStorybook: true,
		analyzeComponents: true,
		analyzeTokens: false,
		outputDir: 'dist/bundle-analysis',
		format: 'all',
		openBrowser: false,
		generateReport: true,
		threshold: {
			warning: 500,
			error: 1000,
		},
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.['bundle-analyzer'] || {};
		this.config = {
			analyzeStorybook: addonConfig.analyzeStorybook !== false,
			analyzeComponents: addonConfig.analyzeComponents !== false,
			analyzeTokens: addonConfig.analyzeTokens === true,
			outputDir: addonConfig.outputDir || 'dist/bundle-analysis',
			format: addonConfig.format || 'all',
			openBrowser: addonConfig.openBrowser === true,
			generateReport: addonConfig.generateReport !== false,
			threshold: {
				warning: addonConfig.threshold?.warning || 500,
				error: addonConfig.threshold?.error || 1000,
			},
			exclude: addonConfig.exclude || ['node_modules', '.git'],
			projectPath: process.cwd(),
		};

		// Inicializar servicio
		this.service = new BundleAnalyzerService(this.config, this.config.projectPath);

		console.log('✅ Bundle Analyzer Add-on: Inicializado correctamente');
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new BundleAnalyzerService(this.config, this.config.projectPath);
		}

		this.active = true;
		console.log('✅ Bundle Analyzer Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Bundle Analyzer Add-on: Desactivado');
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus(): 'active' | 'inactive' {
		return this.active ? 'active' : 'inactive';
	}

	destroy(): void {
		this.active = false;
		this.service = undefined;
	}

	async configure(config: Record<string, any>): Promise<void> {
		const analyzerConfig: Partial<BundleAnalyzerConfig> = {};

		if (config.analyzeStorybook !== undefined)
			analyzerConfig.analyzeStorybook = config.analyzeStorybook;
		if (config.analyzeComponents !== undefined)
			analyzerConfig.analyzeComponents = config.analyzeComponents;
		if (config.analyzeTokens !== undefined) analyzerConfig.analyzeTokens = config.analyzeTokens;
		if (config.outputDir !== undefined) analyzerConfig.outputDir = config.outputDir;
		if (config.format !== undefined) analyzerConfig.format = config.format;
		if (config.openBrowser !== undefined) analyzerConfig.openBrowser = config.openBrowser;
		if (config.generateReport !== undefined)
			analyzerConfig.generateReport = config.generateReport;
		if (config.threshold !== undefined) analyzerConfig.threshold = config.threshold;
		if (config.exclude !== undefined) analyzerConfig.exclude = config.exclude;

		this.config = { ...this.config, ...analyzerConfig };

		if (this.service) {
			this.service.updateConfig(analyzerConfig);
		} else {
			this.service = new BundleAnalyzerService(this.config, this.config.projectPath);
		}
	}

	/**
	 * Hook llamado después de hacer deploy
	 */
	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Analizar bundles después del deploy
		try {
			console.log('📊 Bundle Analyzer: Ejecutando análisis después de deploy...');
			const result = await this.service.analyze();

			if (result.success) {
				console.log('✅ Bundle Analyzer: Análisis completado');
				if (result.reportPath) {
					console.log(`   📊 Reporte disponible en: ${result.reportPath}`);
				}
				if (result.warnings.length > 0) {
					console.log(`   ⚠️  ${result.warnings.length} advertencias encontradas`);
				}
				if (result.errors.length > 0) {
					console.log(`   ❌ ${result.errors.length} errores encontrados`);
				}
				if (result.recommendations && result.recommendations.length > 0) {
					console.log(`   💡 ${result.recommendations.length} recomendaciones`);
				}
			}
		} catch (error) {
			console.error('❌ Bundle Analyzer: Error al ejecutar análisis:', error);
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Ejecutar análisis
			analyze: async (options?: Partial<BundleAnalyzerConfig>) => {
				if (!this.service) {
					throw new Error('Bundle Analyzer service no está inicializado');
				}
				return await this.service.analyze(options);
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración
			updateConfig: (config: Partial<BundleAnalyzerConfig>) => {
				if (!this.service) {
					throw new Error('Bundle Analyzer service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}

