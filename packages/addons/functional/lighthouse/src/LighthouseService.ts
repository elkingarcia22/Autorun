/**
 * LighthouseService
 *
 * Servicio que maneja todas las operaciones de Lighthouse:
 * - Auditoría de performance
 * - Reportes de accesibilidad
 * - Análisis de SEO
 * - Best practices
 * - Core Web Vitals
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface LighthouseConfig {
	port?: number;
	chromeFlags?: string[];
	output?: 'html' | 'json' | 'csv';
	outputPath?: string;
	categories?: ('performance' | 'accessibility' | 'best-practices' | 'seo')[];
	throttling?: {
		rttMs?: number;
		throughputKbps?: number;
		cpuSlowdownMultiplier?: number;
	};
	emulatedFormFactor?: 'mobile' | 'desktop' | 'none';
	locale?: string;
}

export interface LighthouseResult {
	url: string;
	performance: number;
	accessibility: number;
	bestPractices: number;
	seo: number;
	coreWebVitals: {
		lcp?: number;
		fid?: number;
		cls?: number;
		fcp?: number;
		ttfb?: number;
	};
	report: string; // Path to report file
	timestamp: string;
}

export class LighthouseService {
	private config: LighthouseConfig;
	private initialized = false;

	constructor(config: LighthouseConfig) {
		this.config = {
			port: 9222,
			chromeFlags: ['--headless', '--no-sandbox'],
			output: 'html',
			outputPath: 'lighthouse-reports',
			categories: ['performance', 'accessibility', 'best-practices', 'seo'],
			emulatedFormFactor: 'mobile',
			locale: 'es',
			...config,
		};
	}

	/**
	 * Inicializa el servicio y verifica dependencias
	 */
	async initialize(): Promise<void> {
		// Verificar que Lighthouse esté instalado
		if (!this.isLighthouseInstalled()) {
			console.warn('⚠️  Lighthouse no está instalado. Ejecuta: npm install --save-dev lighthouse');
			return;
		}

		// Crear directorio de reportes si no existe
		if (this.config.outputPath) {
			await fs.mkdir(this.config.outputPath, { recursive: true });
		}

		this.initialized = true;
		console.log('✅ Lighthouse Service: Inicializado correctamente');
	}

	/**
	 * Verifica si Lighthouse está instalado
	 */
	private isLighthouseInstalled(): boolean {
		try {
			execSync('npx lighthouse --version', { stdio: 'pipe' });
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Ejecuta una auditoría de Lighthouse en una URL
	 */
	async audit(url: string, options?: Partial<LighthouseConfig>): Promise<LighthouseResult> {
		if (!this.initialized) {
			await this.initialize();
		}

		const config = { ...this.config, ...options };
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		const outputFile = path.join(
			config.outputPath || 'lighthouse-reports',
			`lighthouse-${timestamp}.${config.output || 'html'}`,
		);

		try {
			// Construir comando de Lighthouse
			const command = this.buildLighthouseCommand(url, config, outputFile);

			// Ejecutar Lighthouse
			console.log(`🔍 Lighthouse: Ejecutando auditoría en ${url}...`);
			execSync(command, { stdio: 'inherit' });

			// Leer resultados si es JSON
			let result: LighthouseResult;
			if (config.output === 'json') {
				const jsonContent = await fs.readFile(outputFile, 'utf-8');
				const lighthouseData = JSON.parse(jsonContent);
				result = this.parseLighthouseResults(lighthouseData, url, outputFile);
			} else {
				// Para HTML, necesitamos ejecutar de nuevo con JSON para obtener métricas
				const jsonFile = outputFile.replace('.html', '.json');
				const jsonCommand = this.buildLighthouseCommand(
					url,
					{ ...config, output: 'json' },
					jsonFile,
				);
				execSync(jsonCommand, { stdio: 'pipe' });
				const jsonContent = await fs.readFile(jsonFile, 'utf-8');
				const lighthouseData = JSON.parse(jsonContent);
				result = this.parseLighthouseResults(lighthouseData, url, outputFile);
			}

			console.log(`✅ Lighthouse: Auditoría completada`);
			console.log(`   Performance: ${result.performance}`);
			console.log(`   Accessibility: ${result.accessibility}`);
			console.log(`   Best Practices: ${result.bestPractices}`);
			console.log(`   SEO: ${result.seo}`);
			console.log(`   Reporte: ${result.report}`);

			return result;
		} catch (error: any) {
			throw new Error(`Error al ejecutar Lighthouse: ${error.message}`);
		}
	}

	/**
	 * Construye el comando de Lighthouse
	 */
	private buildLighthouseCommand(
		url: string,
		config: LighthouseConfig,
		outputFile: string,
	): string {
		const parts = ['npx', 'lighthouse', url];

		// Output format
		parts.push(`--output=${config.output || 'html'}`);
		parts.push(`--output-path=${outputFile}`);

		// Categories
		if (config.categories && config.categories.length > 0) {
			parts.push(`--only-categories=${config.categories.join(',')}`);
		}

		// Emulated form factor
		if (config.emulatedFormFactor) {
			parts.push(`--emulated-form-factor=${config.emulatedFormFactor}`);
		}

		// Locale
		if (config.locale) {
			parts.push(`--locale=${config.locale}`);
		}

		// Chrome flags
		if (config.chromeFlags && config.chromeFlags.length > 0) {
			parts.push(`--chrome-flags="${config.chromeFlags.join(' ')}"`);
		}

		// Throttling
		if (config.throttling) {
			if (config.throttling.rttMs) {
				parts.push(`--throttling-rtt-ms=${config.throttling.rttMs}`);
			}
			if (config.throttling.throughputKbps) {
				parts.push(`--throttling-throughput-kbps=${config.throttling.throughputKbps}`);
			}
			if (config.throttling.cpuSlowdownMultiplier) {
				parts.push(
					`--throttling-cpu-slowdown-multiplier=${config.throttling.cpuSlowdownMultiplier}`,
				);
			}
		}

		return parts.join(' ');
	}

	/**
	 * Parsea los resultados de Lighthouse
	 */
	private parseLighthouseResults(
		lighthouseData: any,
		url: string,
		reportPath: string,
	): LighthouseResult {
		const categories = lighthouseData.categories || {};
		const audits = lighthouseData.audits || {};

		// Extraer Core Web Vitals
		const coreWebVitals = {
			lcp: audits['largest-contentful-paint']?.numericValue,
			fid: audits['max-potential-fid']?.numericValue,
			cls: audits['cumulative-layout-shift']?.numericValue,
			fcp: audits['first-contentful-paint']?.numericValue,
			ttfb: audits['server-response-time']?.numericValue,
		};

		return {
			url,
			performance: Math.round((categories.performance?.score || 0) * 100),
			accessibility: Math.round((categories.accessibility?.score || 0) * 100),
			bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
			seo: Math.round((categories.seo?.score || 0) * 100),
			coreWebVitals,
			report: reportPath,
			timestamp: new Date().toISOString(),
		};
	}

	/**
	 * Ejecuta auditoría en múltiples URLs
	 */
	async auditMultiple(
		urls: string[],
		options?: Partial<LighthouseConfig>,
	): Promise<LighthouseResult[]> {
		const results: LighthouseResult[] = [];

		for (const url of urls) {
			try {
				const result = await this.audit(url, options);
				results.push(result);
			} catch (error) {
				console.error(`Error al auditar ${url}:`, error);
			}
		}

		return results;
	}

	/**
	 * Compara resultados de dos auditorías
	 */
	compareResults(
		before: LighthouseResult,
		after: LighthouseResult,
	): {
		performance: number;
		accessibility: number;
		bestPractices: number;
		seo: number;
		improved: boolean;
	} {
		const performanceDiff = after.performance - before.performance;
		const accessibilityDiff = after.accessibility - before.accessibility;
		const bestPracticesDiff = after.bestPractices - before.bestPractices;
		const seoDiff = after.seo - before.seo;

		const improved =
			performanceDiff > 0 || accessibilityDiff > 0 || bestPracticesDiff > 0 || seoDiff > 0;

		return {
			performance: performanceDiff,
			accessibility: accessibilityDiff,
			bestPractices: bestPracticesDiff,
			seo: seoDiff,
			improved,
		};
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		lighthouseInstalled: boolean;
		outputPath?: string;
	} {
		return {
			initialized: this.initialized,
			lighthouseInstalled: this.isLighthouseInstalled(),
			outputPath: this.config.outputPath,
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): LighthouseConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<LighthouseConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
