/**
 * BundleAnalyzerService
 *
 * Servicio que maneja todas las operaciones de análisis de bundles:
 * - Análisis de bundles de Storybook
 * - Análisis de componentes extraídos
 * - Identificación de dependencias grandes
 * - Detección de código duplicado
 * - Generación de reportes visuales
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync, statSync } from 'fs';
import * as path from 'path';

export interface BundleAnalyzerConfig {
	analyzeStorybook?: boolean;
	analyzeComponents?: boolean;
	analyzeTokens?: boolean;
	outputDir?: string;
	format?: 'html' | 'json' | 'treemap' | 'sunburst' | 'all';
	openBrowser?: boolean;
	generateReport?: boolean;
	threshold?: {
		warning?: number; // KB
		error?: number; // KB
	};
	exclude?: string[];
	projectPath?: string;
}

export interface BundleInfo {
	name: string;
	path: string;
	size: number;
	gzippedSize?: number;
	dependencies: string[];
	duplicates?: string[];
	chunks?: ChunkInfo[];
}

export interface ChunkInfo {
	name: string;
	size: number;
	gzippedSize?: number;
	modules: ModuleInfo[];
}

export interface ModuleInfo {
	name: string;
	size: number;
	gzippedSize?: number;
	path: string;
}

export interface BundleAnalysisResult {
	success: boolean;
	bundles: BundleInfo[];
	totalSize: number;
	totalGzippedSize?: number;
	largestBundles: BundleInfo[];
	warnings: string[];
	errors: string[];
	reportPath?: string;
	recommendations?: string[];
	error?: string;
}

export class BundleAnalyzerService {
	private config: BundleAnalyzerConfig;
	private projectPath: string;

	constructor(config: BundleAnalyzerConfig, projectPath: string = process.cwd()) {
		this.config = {
			analyzeStorybook: true,
			analyzeComponents: true,
			analyzeTokens: false,
			outputDir: 'dist/bundle-analysis',
			format: 'all',
			openBrowser: false,
			generateReport: true,
			threshold: {
				warning: 500, // 500 KB
				error: 1000, // 1 MB
			},
			exclude: ['node_modules', '.git'],
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Ejecuta análisis completo de bundles
	 */
	async analyze(options?: Partial<BundleAnalyzerConfig>): Promise<BundleAnalysisResult> {
		const finalConfig = { ...this.config, ...options };
		const result: BundleAnalysisResult = {
			success: false,
			bundles: [],
			totalSize: 0,
			largestBundles: [],
			warnings: [],
			errors: [],
			recommendations: [],
		};

		try {
			const bundles: BundleInfo[] = [];

			// 1. Analizar Storybook build
			if (finalConfig.analyzeStorybook) {
				console.log('📊 Bundle Analyzer: Analizando build de Storybook...');
				const storybookBundles = await this.analyzeStorybookBuild(finalConfig);
				bundles.push(...storybookBundles);
			}

			// 2. Analizar componentes extraídos
			if (finalConfig.analyzeComponents) {
				console.log('📊 Bundle Analyzer: Analizando componentes...');
				const componentBundles = await this.analyzeComponents(finalConfig);
				bundles.push(...componentBundles);
			}

			// 3. Analizar tokens (si está habilitado)
			if (finalConfig.analyzeTokens) {
				console.log('📊 Bundle Analyzer: Analizando tokens...');
				const tokenBundles = await this.analyzeTokens(finalConfig);
				bundles.push(...tokenBundles);
			}

			// 4. Calcular estadísticas
			result.bundles = bundles;
			result.totalSize = bundles.reduce((sum, b) => sum + b.size, 0);
			result.totalGzippedSize = bundles.reduce((sum, b) => sum + (b.gzippedSize || 0), 0);

			// 5. Identificar bundles más grandes
			result.largestBundles = [...bundles].sort((a, b) => b.size - a.size).slice(0, 10);

			// 6. Generar warnings y errores basados en thresholds
			this.generateWarningsAndErrors(result, finalConfig);

			// 7. Generar recomendaciones
			result.recommendations = this.generateRecommendations(result);

			// 8. Generar reporte visual (si está habilitado)
			if (finalConfig.generateReport) {
				console.log('📊 Bundle Analyzer: Generando reporte visual...');
				const reportPath = await this.generateReport(result, finalConfig);
				result.reportPath = reportPath;
			}

			result.success = true;
			console.log(`✅ Bundle Analyzer: Análisis completado - ${bundles.length} bundles analizados`);
			return result;
		} catch (error: any) {
			result.error = error.message;
			console.error('❌ Bundle Analyzer: Error en análisis:', error);
			return result;
		}
	}

	/**
	 * Analiza el build de Storybook
	 */
	private async analyzeStorybookBuild(config: BundleAnalyzerConfig): Promise<BundleInfo[]> {
		const bundles: BundleInfo[] = [];
		const storybookBuildDir = path.join(this.projectPath, 'storybook-static');

		if (!existsSync(storybookBuildDir)) {
			console.warn('⚠️  Bundle Analyzer: Build de Storybook no encontrado');
			return bundles;
		}

		try {
			const assetsPath = path.join(storybookBuildDir, 'assets');
			if (existsSync(assetsPath)) {
				const files = await fs.readdir(assetsPath);
				const jsFiles = files.filter((f) => f.endsWith('.js'));

				for (const file of jsFiles) {
					const filePath = path.join(assetsPath, file);
					const stats = statSync(filePath);
					const content = readFileSync(filePath, 'utf-8');

					// Analizar dependencias básicas
					const dependencies = this.extractDependencies(content);

					// Calcular tamaño gzipped aproximado
					const gzippedSize = this.estimateGzippedSize(content.length);

					bundles.push({
						name: `storybook-${file}`,
						path: filePath,
						size: stats.size,
						gzippedSize,
						dependencies,
					});
				}
			}

			// Analizar index.html principal
			const indexPath = path.join(storybookBuildDir, 'index.html');
			if (existsSync(indexPath)) {
				const stats = statSync(indexPath);
				bundles.push({
					name: 'storybook-index',
					path: indexPath,
					size: stats.size,
					dependencies: [],
				});
			}

			console.log(`   ✅ ${bundles.length} bundles de Storybook analizados`);
			return bundles;
		} catch (error: any) {
			console.warn('⚠️  Bundle Analyzer: Error analizando Storybook:', error.message);
			return bundles;
		}
	}

	/**
	 * Analiza componentes extraídos
	 */
	private async analyzeComponents(config: BundleAnalyzerConfig): Promise<BundleInfo[]> {
		const bundles: BundleInfo[] = [];
		const componentsDir = path.join(this.projectPath, 'dist', 'components');

		if (!existsSync(componentsDir)) {
			console.warn('⚠️  Bundle Analyzer: Directorio de componentes no encontrado');
			return bundles;
		}

		try {
			const files = await fs.readdir(componentsDir);
			const jsFiles = files.filter((f) => f.endsWith('.js'));

			for (const file of jsFiles) {
				const filePath = path.join(componentsDir, file);
				const stats = statSync(filePath);
				const content = readFileSync(filePath, 'utf-8');

				const dependencies = this.extractDependencies(content);
				const gzippedSize = this.estimateGzippedSize(content.length);

				bundles.push({
					name: `component-${file.replace(/\.js$/, '')}`,
					path: filePath,
					size: stats.size,
					gzippedSize,
					dependencies,
				});
			}

			console.log(`   ✅ ${bundles.length} componentes analizados`);
			return bundles;
		} catch (error: any) {
			console.warn('⚠️  Bundle Analyzer: Error analizando componentes:', error.message);
			return bundles;
		}
	}

	/**
	 * Analiza tokens
	 */
	private async analyzeTokens(config: BundleAnalyzerConfig): Promise<BundleInfo[]> {
		const bundles: BundleInfo[] = [];
		const tokensDir = path.join(this.projectPath, 'dist', 'tokens');

		if (!existsSync(tokensDir)) {
			return bundles;
		}

		try {
			const files = await fs.readdir(tokensDir);
			const relevantFiles = files.filter((f) =>
				['.json', '.css', '.js'].some((ext) => f.endsWith(ext)),
			);

			for (const file of relevantFiles) {
				const filePath = path.join(tokensDir, file);
				const stats = statSync(filePath);

				bundles.push({
					name: `token-${file}`,
					path: filePath,
					size: stats.size,
					dependencies: [],
				});
			}

			return bundles;
		} catch (error: any) {
			console.warn('⚠️  Bundle Analyzer: Error analizando tokens:', error.message);
			return bundles;
		}
	}

	/**
	 * Extrae dependencias de un archivo JavaScript
	 */
	private extractDependencies(content: string): string[] {
		const dependencies: string[] = [];
		const dependencyPatterns = [
			/require\(['"]([^'"]+)['"]\)/g,
			/import\s+.*?\s+from\s+['"]([^'"]+)['"]/g,
			/import\(['"]([^'"]+)['"]\)/g,
			/from\s+['"]([^'"]+)['"]/g,
		];

		for (const pattern of dependencyPatterns) {
			let match;
			while ((match = pattern.exec(content)) !== null) {
				const dep = match[1];
				if (dep && !dep.startsWith('.') && !dep.startsWith('/')) {
					// Solo dependencias externas
					const depName = dep.split('/')[0];
					if (!dependencies.includes(depName)) {
						dependencies.push(depName);
					}
				}
			}
		}

		return dependencies;
	}

	/**
	 * Estima el tamaño gzipped (aproximación)
	 */
	private estimateGzippedSize(originalSize: number): number {
		// Aproximación: gzip típicamente reduce a ~30% del tamaño original
		return Math.round(originalSize * 0.3);
	}

	/**
	 * Genera warnings y errores basados en thresholds
	 */
	private generateWarningsAndErrors(
		result: BundleAnalysisResult,
		config: BundleAnalyzerConfig,
	): void {
		if (!config.threshold) {
			return;
		}

		const warningThreshold = (config.threshold.warning || 500) * 1024; // KB a bytes
		const errorThreshold = (config.threshold.error || 1000) * 1024; // KB a bytes

		for (const bundle of result.bundles) {
			const sizeKB = bundle.size / 1024;

			if (bundle.size >= errorThreshold) {
				result.errors.push(
					`Bundle "${bundle.name}" es muy grande: ${sizeKB.toFixed(2)} KB (límite: ${config.threshold.error} KB)`,
				);
			} else if (bundle.size >= warningThreshold) {
				result.warnings.push(
					`Bundle "${bundle.name}" es grande: ${sizeKB.toFixed(2)} KB (advertencia: ${config.threshold.warning} KB)`,
				);
			}
		}
	}

	/**
	 * Genera recomendaciones basadas en el análisis
	 */
	private generateRecommendations(result: BundleAnalysisResult): string[] {
		const recommendations: string[] = [];

		// Recomendación 1: Bundles muy grandes
		const largeBundles = result.bundles.filter((b) => b.size > 500 * 1024);
		if (largeBundles.length > 0) {
			recommendations.push(
				`Considera code splitting para: ${largeBundles.map((b) => b.name).join(', ')}`,
			);
		}

		// Recomendación 2: Muchas dependencias
		const bundlesWithManyDeps = result.bundles.filter((b) => b.dependencies.length > 10);
		if (bundlesWithManyDeps.length > 0) {
			recommendations.push(
				`Bundles con muchas dependencias: ${bundlesWithManyDeps.map((b) => b.name).join(', ')}. Considera tree-shaking.`,
			);
		}

		// Recomendación 3: Tamaño total grande
		const totalMB = result.totalSize / (1024 * 1024);
		if (totalMB > 5) {
			recommendations.push(
				`Tamaño total de bundles es ${totalMB.toFixed(2)} MB. Considera optimizaciones adicionales.`,
			);
		}

		// Recomendación 4: Bundles duplicados
		const duplicateDeps = this.findDuplicateDependencies(result.bundles);
		if (duplicateDeps.length > 0) {
			recommendations.push(
				`Dependencias duplicadas encontradas: ${duplicateDeps.join(', ')}. Considera deduplicación.`,
			);
		}

		return recommendations;
	}

	/**
	 * Encuentra dependencias duplicadas entre bundles
	 */
	private findDuplicateDependencies(bundles: BundleInfo[]): string[] {
		const depCount: Record<string, number> = {};

		for (const bundle of bundles) {
			for (const dep of bundle.dependencies) {
				depCount[dep] = (depCount[dep] || 0) + 1;
			}
		}

		return Object.entries(depCount)
			.filter(([_, count]) => count > 1)
			.map(([dep]) => dep);
	}

	/**
	 * Genera reporte visual del análisis
	 */
	private async generateReport(
		result: BundleAnalysisResult,
		config: BundleAnalyzerConfig,
	): Promise<string> {
		const outputDir = path.join(this.projectPath, config.outputDir || 'dist/bundle-analysis');
		await fs.mkdir(outputDir, { recursive: true });

		// Generar reporte JSON
		const jsonReport = {
			generatedAt: new Date().toISOString(),
			totalBundles: result.bundles.length,
			totalSize: result.totalSize,
			totalGzippedSize: result.totalGzippedSize,
			largestBundles: result.largestBundles.map((b) => ({
				name: b.name,
				size: b.size,
				sizeKB: (b.size / 1024).toFixed(2),
				gzippedSize: b.gzippedSize,
				dependencies: b.dependencies,
			})),
			warnings: result.warnings,
			errors: result.errors,
			recommendations: result.recommendations,
			allBundles: result.bundles.map((b) => ({
				name: b.name,
				size: b.size,
				sizeKB: (b.size / 1024).toFixed(2),
				gzippedSize: b.gzippedSize,
				dependencies: b.dependencies,
			})),
		};

		const jsonPath = path.join(outputDir, 'bundle-analysis.json');
		await fs.writeFile(jsonPath, JSON.stringify(jsonReport, null, 2), 'utf-8');

		// Generar reporte HTML básico
		const htmlReport = this.generateHTMLReport(jsonReport);
		const htmlPath = path.join(outputDir, 'bundle-analysis.html');
		await fs.writeFile(htmlPath, htmlReport, 'utf-8');

		console.log(`   ✅ Reporte generado en: ${outputDir}`);

		// Intentar usar webpack-bundle-analyzer si está disponible
		try {
			await this.generateAdvancedReport(result, config, outputDir);
		} catch {
			// Si no está disponible, usar reporte básico
			console.log('   ℹ️  webpack-bundle-analyzer no disponible, usando reporte básico');
		}

		return outputDir;
	}

	/**
	 * Genera reporte HTML básico
	 */
	private generateHTMLReport(data: any): string {
		return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bundle Analysis Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #0a0a0a;
      color: #fff;
    }
    h1 { color: #ffff00; }
    .stat { background: #1a1a1a; padding: 15px; border-radius: 8px; margin: 10px 0; }
    .bundle { background: #1a1a1a; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 3px solid #ffff00; }
    .warning { color: #ffaa00; }
    .error { color: #ff4444; }
    .recommendation { background: #1a3a1a; padding: 10px; border-radius: 5px; margin: 5px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #333; }
    th { background: #2a2a2a; }
  </style>
</head>
<body>
  <h1>📊 Bundle Analysis Report</h1>
  <p>Generado: ${new Date(data.generatedAt).toLocaleString()}</p>
  
  <div class="stat">
    <h2>Estadísticas Generales</h2>
    <p><strong>Total de Bundles:</strong> ${data.totalBundles}</p>
    <p><strong>Tamaño Total:</strong> ${(data.totalSize / (1024 * 1024)).toFixed(2)} MB</p>
    <p><strong>Tamaño Gzipped:</strong> ${data.totalGzippedSize ? (data.totalGzippedSize / (1024 * 1024)).toFixed(2) : 'N/A'} MB</p>
  </div>

  <h2>Bundles Más Grandes</h2>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Tamaño</th>
        <th>Gzipped</th>
        <th>Dependencias</th>
      </tr>
    </thead>
    <tbody>
      ${data.largestBundles
				.map(
					(b: any) => `
      <tr>
        <td>${b.name}</td>
        <td>${b.sizeKB} KB</td>
        <td>${b.gzippedSize ? (b.gzippedSize / 1024).toFixed(2) + ' KB' : 'N/A'}</td>
        <td>${b.dependencies.length}</td>
      </tr>
      `,
				)
				.join('')}
    </tbody>
  </table>

  ${data.warnings.length > 0 ? `<h2 class="warning">⚠️ Advertencias</h2><ul>${data.warnings.map((w: string) => `<li class="warning">${w}</li>`).join('')}</ul>` : ''}
  
  ${data.errors.length > 0 ? `<h2 class="error">❌ Errores</h2><ul>${data.errors.map((e: string) => `<li class="error">${e}</li>`).join('')}</ul>` : ''}
  
  ${data.recommendations && data.recommendations.length > 0 ? `<h2>💡 Recomendaciones</h2>${data.recommendations.map((r: string) => `<div class="recommendation">${r}</div>`).join('')}` : ''}
</body>
</html>`;
	}

	/**
	 * Genera reporte avanzado con webpack-bundle-analyzer si está disponible
	 */
	private async generateAdvancedReport(
		result: BundleAnalysisResult,
		config: BundleAnalyzerConfig,
		outputDir: string,
	): Promise<void> {
		// Intentar usar webpack-bundle-analyzer
		try {
			// @ts-ignore - Peer dependency opcional
			const { BundleAnalyzerPlugin } = await import('webpack-bundle-analyzer');
			console.log('   ✅ webpack-bundle-analyzer disponible');
			// Nota: Esto requeriría configuración de webpack, se puede hacer después si es necesario
		} catch {
			// No disponible, usar reporte básico
		}
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): BundleAnalyzerConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<BundleAnalyzerConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
