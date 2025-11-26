/**
 * StandaloneService
 *
 * Servicio que maneja todas las operaciones de Standalone Mode:
 * - Optimización de builds de Storybook
 * - Extracción de componentes
 * - Generación de manifests
 * - Optimización de assets
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync, statSync } from 'fs';
import * as path from 'path';

export interface StandaloneConfig {
	optimizeStorybookBuild?: boolean;
	extractComponents?: boolean;
	componentsOutputDir?: string;
	generateManifest?: boolean;
	minify?: boolean;
	compress?: boolean;
	treeShake?: boolean;
	targets?: ('storybook' | 'components' | 'tokens')[];
	storybookBuildDir?: string;
	projectPath?: string;
	tokensOutputDir?: string;
	tokensSourcePath?: string;
	minifier?: 'terser' | 'esbuild' | 'both';
	imageCompression?: boolean;
	imageQuality?: number;
}

export interface ComponentManifest {
	version: string;
	components: ComponentInfo[];
	buildDate: string;
	storybookVersion?: string;
}

export interface ComponentInfo {
	name: string;
	path: string;
	bundle?: string;
	dependencies?: string[];
	props?: Record<string, any>;
	description?: string;
}

export interface StandaloneBuildResult {
	success: boolean;
	storybookBuildPath?: string;
	componentsPath?: string;
	tokensPath?: string;
	manifestPath?: string;
	optimizations?: {
		originalSize?: number;
		optimizedSize?: number;
		savings?: number;
		jsMinified?: number;
		cssMinified?: number;
		imagesCompressed?: number;
		treeShaken?: number;
	};
	components?: ComponentInfo[];
	tokens?: {
		total: number;
		categories: string[];
		outputPath: string;
	};
	error?: string;
}

export class StandaloneService {
	private config: StandaloneConfig;
	private projectPath: string;

	constructor(config: StandaloneConfig, projectPath: string = process.cwd()) {
		this.config = {
			optimizeStorybookBuild: true,
			extractComponents: false,
			componentsOutputDir: 'dist/components',
			generateManifest: true,
			minify: true,
			compress: true,
			treeShake: true,
			targets: ['storybook'],
			storybookBuildDir: 'storybook-static',
			tokensOutputDir: 'dist/tokens',
			tokensSourcePath: 'packages/tokens',
			minifier: 'both',
			imageCompression: true,
			imageQuality: 80,
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Ejecuta build completo de Standalone Mode
	 */
	async build(options?: Partial<StandaloneConfig>): Promise<StandaloneBuildResult> {
		const finalConfig = { ...this.config, ...options };
		const result: StandaloneBuildResult = {
			success: false,
		};

		try {
			// 1. Build de Storybook (si está en targets)
			if (finalConfig.targets?.includes('storybook')) {
				console.log('📦 Standalone: Construyendo Storybook...');
				const storybookPath = await this.buildStorybook(finalConfig);
				result.storybookBuildPath = storybookPath;

				// Optimizar build si está habilitado
				if (finalConfig.optimizeStorybookBuild) {
					console.log('⚡ Standalone: Optimizando build de Storybook...');
					const optimizations = await this.optimizeStorybookBuild(storybookPath, finalConfig);
					result.optimizations = {
						...optimizations,
						...result.optimizations,
					};
				}
			}

			// 2. Extraer componentes (si está habilitado)
			if (finalConfig.extractComponents && result.storybookBuildPath) {
				console.log('🔧 Standalone: Extrayendo componentes...');
				const components = await this.extractComponents(
					result.storybookBuildPath,
					finalConfig,
				);
				result.components = components;
				result.componentsPath = path.join(
					this.projectPath,
					finalConfig.componentsOutputDir || 'dist/components',
				);
			}

			// 3. Build de tokens (si está en targets)
			if (finalConfig.targets?.includes('tokens')) {
				console.log('🎨 Standalone: Construyendo tokens...');
				const tokensInfo = await this.buildTokens(finalConfig);
				result.tokens = tokensInfo;
				result.tokensPath = path.join(
					this.projectPath,
					finalConfig.tokensOutputDir || 'dist/tokens',
				);
			}

			// 4. Generar manifest (si está habilitado)
			if (finalConfig.generateManifest) {
				console.log('📋 Standalone: Generando manifest...');
				const manifestPath = await this.generateManifest(result, finalConfig);
				result.manifestPath = manifestPath;
			}

			result.success = true;
			console.log('✅ Standalone: Build completado exitosamente');
			return result;
		} catch (error: any) {
			result.error = error.message;
			console.error('❌ Standalone: Error en build:', error);
			return result;
		}
	}

	/**
	 * Construye Storybook estático
	 */
	private async buildStorybook(config: StandaloneConfig): Promise<string> {
		const buildDir = config.storybookBuildDir || 'storybook-static';
		const buildPath = path.join(this.projectPath, buildDir);

		try {
			// Ejecutar build de Storybook
			execSync('npx storybook build', {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			if (!existsSync(buildPath)) {
				throw new Error(`Build de Storybook no encontrado en: ${buildPath}`);
			}

			return buildPath;
		} catch (error: any) {
			throw new Error(`Error al construir Storybook: ${error.message}`);
		}
	}

	/**
	 * Optimiza el build de Storybook
	 */
	private async optimizeStorybookBuild(
		buildPath: string,
		config: StandaloneConfig,
	): Promise<{
		originalSize: number;
		optimizedSize: number;
		savings: number;
		jsMinified?: number;
		cssMinified?: number;
		imagesCompressed?: number;
		treeShaken?: number;
	}> {
		const originalSize = await this.getDirectorySize(buildPath);
		let optimizedSize = originalSize;

		try {
			let jsMinified = 0;
			let cssMinified = 0;
			let imagesCompressed = 0;

			// Minificar archivos JS y CSS
			if (config.minify) {
				const minifyResults = await this.minifyAssets(buildPath, config);
				jsMinified = minifyResults.jsMinified;
				cssMinified = minifyResults.cssMinified;
			}

			// Comprimir imágenes
			if (config.compress && config.imageCompression) {
				imagesCompressed = await this.compressAssets(buildPath, config);
			}

			optimizedSize = await this.getDirectorySize(buildPath);
			const savings = originalSize - optimizedSize;
			const savingsPercent = ((savings / originalSize) * 100).toFixed(2);

			console.log(
				`   📊 Optimización: ${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedSize)} (${savingsPercent}% reducción)`,
			);
			if (jsMinified > 0 || cssMinified > 0 || imagesCompressed > 0) {
				console.log(
					`   📈 Detalles: ${jsMinified} JS minificados, ${cssMinified} CSS minificados, ${imagesCompressed} imágenes comprimidas`,
				);
			}

			return {
				originalSize,
				optimizedSize,
				savings,
				jsMinified,
				cssMinified,
				imagesCompressed,
			};
		} catch (error) {
			console.warn('⚠️  Standalone: Error en optimización, continuando...', error);
			return {
				originalSize,
				optimizedSize,
				savings: 0,
			};
		}
	}

	/**
	 * Extrae componentes del build de Storybook
	 */
	private async extractComponents(
		buildPath: string,
		config: StandaloneConfig,
	): Promise<ComponentInfo[]> {
		const componentsOutputDir = path.join(
			this.projectPath,
			config.componentsOutputDir || 'dist/components',
		);

		// Crear directorio de componentes
		await fs.mkdir(componentsOutputDir, { recursive: true });

		const components: ComponentInfo[] = [];

		try {
			// Analizar build de Storybook para encontrar componentes
			const assetsPath = path.join(buildPath, 'assets');
			if (existsSync(assetsPath)) {
				const assets = await fs.readdir(assetsPath);

				// Buscar archivos de componentes (JS bundles)
				for (const asset of assets) {
					if (asset.endsWith('.js') && asset.includes('component')) {
						const componentPath = path.join(assetsPath, asset);
						const componentName = this.extractComponentName(asset);

						// Copiar componente al directorio de salida
						const outputPath = path.join(componentsOutputDir, asset);
						await fs.copyFile(componentPath, outputPath);

						components.push({
							name: componentName,
							path: outputPath,
							bundle: asset,
						});
					}
				}
			}

			// También buscar en stories si están disponibles
			const storiesPath = path.join(this.projectPath, 'stories');
			if (existsSync(storiesPath)) {
				const stories = await fs.readdir(storiesPath, { withFileTypes: true });

				for (const story of stories) {
					if (story.isFile() && story.name.endsWith('.stories.tsx')) {
						const storyContent = readFileSync(
							path.join(storiesPath, story.name),
							'utf-8',
						);
						const componentInfo = this.parseStoryFile(storyContent, story.name);

						if (componentInfo) {
							components.push(componentInfo);
						}
					}
				}
			}

			console.log(`   ✅ ${components.length} componentes extraídos`);
			return components;
		} catch (error: any) {
			console.warn('⚠️  Standalone: Error al extraer componentes:', error.message);
			return components;
		}
	}

	/**
	 * Genera manifest de componentes
	 */
	private async generateManifest(
		result: StandaloneBuildResult,
		config: StandaloneConfig,
	): Promise<string> {
		const manifest: ComponentManifest = {
			version: '1.0.0',
			components: result.components || [],
			buildDate: new Date().toISOString(),
		};

		// Intentar obtener versión de Storybook
		try {
			const packageJsonPath = path.join(this.projectPath, 'package.json');
			if (existsSync(packageJsonPath)) {
				const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
				const allDeps = {
					...packageJson.dependencies,
					...packageJson.devDependencies,
				};

				const storybookVersion =
					allDeps['@storybook/react'] ||
					allDeps['@storybook/react-webpack5'] ||
					allDeps['@storybook/core'];
				if (storybookVersion) {
					manifest.storybookVersion = storybookVersion;
				}
			}
		} catch {
			// Ignorar errores al leer package.json
		}

		const manifestPath = path.join(this.projectPath, 'dist', 'standalone-manifest.json');
		await fs.mkdir(path.dirname(manifestPath), { recursive: true });
		await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

		console.log(`   ✅ Manifest generado en: ${manifestPath}`);
		return manifestPath;
	}

	/**
	 * Minifica assets JS y CSS con terser/esbuild
	 */
	private async minifyAssets(
		buildPath: string,
		config: StandaloneConfig,
	): Promise<{ jsMinified: number; cssMinified: number }> {
		let jsMinified = 0;
		let cssMinified = 0;

		try {
			const assetsPath = path.join(buildPath, 'assets');
			if (!existsSync(assetsPath)) {
				return { jsMinified: 0, cssMinified: 0 };
			}

			const files = await this.getAllFiles(assetsPath);
			const jsFiles = files.filter((f) => f.endsWith('.js') && !f.endsWith('.min.js'));
			const cssFiles = files.filter((f) => f.endsWith('.css') && !f.endsWith('.min.css'));

			// Minificar JS
			if (jsFiles.length > 0 && config.minify) {
				console.log(`   🔧 Minificando ${jsFiles.length} archivos JS...`);
				jsMinified = await this.minifyJavaScriptFiles(jsFiles, config);
			}

			// Minificar CSS
			if (cssFiles.length > 0 && config.minify) {
				console.log(`   🎨 Minificando ${cssFiles.length} archivos CSS...`);
				cssMinified = await this.minifyCSSFiles(cssFiles);
			}

			return { jsMinified, cssMinified };
		} catch (error: any) {
			console.warn('⚠️  Standalone: Error en minificación:', error.message);
			return { jsMinified: 0, cssMinified: 0 };
		}
	}

	/**
	 * Minifica archivos JavaScript con terser o esbuild
	 */
	private async minifyJavaScriptFiles(
		files: string[],
		config: StandaloneConfig,
	): Promise<number> {
		let minifiedCount = 0;

		for (const filePath of files) {
			try {
				const content = readFileSync(filePath, 'utf-8');
				const originalSize = content.length;
				let minified: string;

				// Intentar usar terser primero
				if (config.minifier === 'terser' || config.minifier === 'both') {
					try {
						const { minify } = await import('terser');
						const result = await minify(content, {
							compress: true,
							mangle: true,
							format: {
								comments: false,
							},
						});
						if (result.code) {
							minified = result.code;
						} else {
							throw new Error('Terser no produjo código');
						}
					} catch {
						// Si terser falla, intentar esbuild
						if (config.minifier === 'both') {
							const esbuild = await import('esbuild');
							const result = await esbuild.transform(content, {
								minify: true,
								format: 'iife',
							});
							minified = result.code;
						} else {
							continue;
						}
					}
				} else if (config.minifier === 'esbuild') {
					const esbuild = await import('esbuild');
					const result = await esbuild.transform(content, {
						minify: true,
						format: 'iife',
					});
					minified = result.code;
				} else {
					continue;
				}

				// Guardar archivo minificado
				const minPath = filePath.replace(/\.js$/, '.min.js');
				await fs.writeFile(minPath, minified, 'utf-8');

				const newSize = minified.length;
				const savings = originalSize - newSize;
				const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

				if (savings > 0) {
					console.log(
						`      ✓ ${path.basename(filePath)}: ${this.formatBytes(originalSize)} → ${this.formatBytes(newSize)} (${savingsPercent}%)`,
					);
					minifiedCount++;
				}
			} catch (error: any) {
				console.warn(`      ⚠️  Error minificando ${filePath}:`, error.message);
			}
		}

		return minifiedCount;
	}

	/**
	 * Minifica archivos CSS
	 */
	private async minifyCSSFiles(files: string[]): Promise<number> {
		let minifiedCount = 0;

		for (const filePath of files) {
			try {
				const content = readFileSync(filePath, 'utf-8');
				const originalSize = content.length;

				// Minificación básica de CSS
				const minified = content
					.replace(/\/\*[\s\S]*?\*\//g, '') // Remover comentarios
					.replace(/\s+/g, ' ') // Remover espacios múltiples
					.replace(/;\s*}/g, '}') // Remover punto y coma antes de }
					.replace(/\s*{\s*/g, '{') // Remover espacios alrededor de {
					.replace(/}\s*/g, '}') // Remover espacios después de }
					.replace(/:\s+/g, ':') // Remover espacios después de :
					.replace(/,\s+/g, ',') // Remover espacios después de ,
					.trim();

				const newSize = minified.length;
				const savings = originalSize - newSize;

				if (savings > 100) {
					// Solo guardar si hay ahorro significativo
					const minPath = filePath.replace(/\.css$/, '.min.css');
					await fs.writeFile(minPath, minified, 'utf-8');

					const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
					console.log(
						`      ✓ ${path.basename(filePath)}: ${this.formatBytes(originalSize)} → ${this.formatBytes(newSize)} (${savingsPercent}%)`,
					);
					minifiedCount++;
				}
			} catch (error: any) {
				console.warn(`      ⚠️  Error minificando CSS ${filePath}:`, error.message);
			}
		}

		return minifiedCount;
	}

	/**
	 * Comprime imágenes con sharp
	 */
	private async compressAssets(
		buildPath: string,
		config: StandaloneConfig,
	): Promise<number> {
		if (!config.imageCompression) {
			return 0;
		}

		let compressedCount = 0;

		try {
			const assetsPath = path.join(buildPath, 'assets');
			if (!existsSync(assetsPath)) {
				return 0;
			}

			const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
			const files = await this.getAllFiles(assetsPath);
			const imageFiles = files.filter((f) =>
				imageExtensions.some((ext) => f.toLowerCase().endsWith(ext)),
			);

			if (imageFiles.length === 0) {
				return 0;
			}

			console.log(`   🗜️  Comprimiendo ${imageFiles.length} imágenes...`);

			// Intentar usar sharp si está disponible
			try {
				const sharp = await import('sharp');

				for (const imagePath of imageFiles) {
					try {
						const originalSize = statSync(imagePath).size;
						const ext = path.extname(imagePath).toLowerCase();
						const outputPath = imagePath.replace(
							new RegExp(`\\${ext}$`, 'i'),
							'.webp',
						);

						await sharp.default(imagePath)
							.webp({ quality: config.imageQuality || 80 })
							.toFile(outputPath);

						const newSize = statSync(outputPath).size;
						const savings = originalSize - newSize;

						if (savings > 0) {
							const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
							console.log(
								`      ✓ ${path.basename(imagePath)}: ${this.formatBytes(originalSize)} → ${this.formatBytes(newSize)} (${savingsPercent}%)`,
							);
							compressedCount++;
						}
					} catch (error: any) {
						console.warn(
							`      ⚠️  Error comprimiendo ${imagePath}:`,
							error.message,
						);
					}
				}
			} catch {
				console.warn(
					'   ⚠️  Sharp no está instalado. Instala con: npm install --save-dev sharp',
				);
			}

			return compressedCount;
		} catch (error: any) {
			console.warn('⚠️  Standalone: Error en compresión:', error.message);
			return 0;
		}
	}

	/**
	 * Construye tokens independientes
	 */
	private async buildTokens(config: StandaloneConfig): Promise<{
		total: number;
		categories: string[];
		outputPath: string;
	}> {
		const tokensSourcePath = path.join(
			this.projectPath,
			config.tokensSourcePath || 'packages/tokens',
		);
		const tokensOutputDir = path.join(
			this.projectPath,
			config.tokensOutputDir || 'dist/tokens',
		);

		await fs.mkdir(tokensOutputDir, { recursive: true });

		const tokensJsonPath = path.join(tokensSourcePath, 'tokens.json');
		const tokensCssPath = path.join(tokensSourcePath, 'dist', 'tokens.css');

		let total = 0;
		const categories: string[] = [];

		try {
			// Copiar tokens.json si existe
			if (existsSync(tokensJsonPath)) {
				const tokensData = JSON.parse(readFileSync(tokensJsonPath, 'utf-8'));
				const outputJsonPath = path.join(tokensOutputDir, 'tokens.json');

				// Contar tokens y categorías
				const countTokens = (obj: any, prefix = ''): void => {
					for (const [key, value] of Object.entries(obj)) {
						if (typeof value === 'object' && value !== null) {
							if ('$value' in value) {
								total++;
								const category = prefix || key;
								if (!categories.includes(category)) {
									categories.push(category);
								}
							} else {
								countTokens(value, prefix || key);
							}
						}
					}
				};

				countTokens(tokensData);

				await fs.writeFile(outputJsonPath, JSON.stringify(tokensData, null, 2), 'utf-8');
				console.log(`   ✅ Tokens JSON copiado: ${total} tokens en ${categories.length} categorías`);
			}

			// Copiar tokens.css si existe
			if (existsSync(tokensCssPath)) {
				const cssContent = readFileSync(tokensCssPath, 'utf-8');
				const outputCssPath = path.join(tokensOutputDir, 'tokens.css');

				// Minificar CSS si está habilitado
				let finalCss = cssContent;
				if (config.minify) {
					finalCss = cssContent
						.replace(/\/\*[\s\S]*?\*\//g, '')
						.replace(/\s+/g, ' ')
						.replace(/;\s*}/g, '}')
						.replace(/\s*{\s*/g, '{')
						.replace(/}\s*/g, '}')
						.replace(/:\s+/g, ':')
						.trim();
				}

				await fs.writeFile(outputCssPath, finalCss, 'utf-8');
				console.log(`   ✅ Tokens CSS copiado${config.minify ? ' y minificado' : ''}`);
			}

			// Generar manifest de tokens
			const tokensManifest = {
				version: '1.0.0',
				total,
				categories,
				buildDate: new Date().toISOString(),
				files: {
					json: existsSync(tokensJsonPath) ? 'tokens.json' : undefined,
					css: existsSync(tokensCssPath) ? 'tokens.css' : undefined,
				},
			};

			const manifestPath = path.join(tokensOutputDir, 'manifest.json');
			await fs.writeFile(manifestPath, JSON.stringify(tokensManifest, null, 2), 'utf-8');

			return {
				total,
				categories,
				outputPath: tokensOutputDir,
			};
		} catch (error: any) {
			console.warn('⚠️  Standalone: Error construyendo tokens:', error.message);
			return {
				total: 0,
				categories: [],
				outputPath: tokensOutputDir,
			};
		}
	}

	/**
	 * Obtiene todos los archivos de un directorio recursivamente
	 */
	private async getAllFiles(dirPath: string): Promise<string[]> {
		const files: string[] = [];

		try {
			const entries = await fs.readdir(dirPath, { withFileTypes: true });

			for (const entry of entries) {
				const fullPath = path.join(dirPath, entry.name);

				if (entry.isDirectory()) {
					const subFiles = await this.getAllFiles(fullPath);
					files.push(...subFiles);
				} else {
					files.push(fullPath);
				}
			}
		} catch {
			// Ignorar errores
		}

		return files;
	}

	/**
	 * Obtiene el tamaño total de un directorio
	 */
	private async getDirectorySize(dirPath: string): Promise<number> {
		let totalSize = 0;

		try {
			const entries = await fs.readdir(dirPath, { withFileTypes: true });

			for (const entry of entries) {
				const fullPath = path.join(dirPath, entry.name);

				if (entry.isDirectory()) {
					totalSize += await this.getDirectorySize(fullPath);
				} else {
					const stats = statSync(fullPath);
					totalSize += stats.size;
				}
			}
		} catch {
			// Ignorar errores
		}

		return totalSize;
	}

	/**
	 * Formatea bytes a formato legible
	 */
	private formatBytes(bytes: number): string {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
	}

	/**
	 * Extrae el nombre del componente de un nombre de archivo
	 */
	private extractComponentName(filename: string): string {
		// Ejemplo: "Button.component.js" -> "Button"
		const match = filename.match(/([A-Z][a-zA-Z0-9]+)\./);
		return match ? match[1] : filename.replace(/\.(js|tsx?)$/, '');
	}

	/**
	 * Parsea un archivo de story para extraer información del componente
	 */
	private parseStoryFile(content: string, filename: string): ComponentInfo | null {
		try {
			// Buscar export default con title
			const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
			const componentMatch = content.match(/component:\s*(\w+)/);

			if (titleMatch || componentMatch) {
				return {
					name: componentMatch ? componentMatch[1] : titleMatch![1].split('/').pop()!,
					path: filename,
					description: this.extractDescription(content),
				};
			}
		} catch {
			// Ignorar errores de parsing
		}

		return null;
	}

	/**
	 * Extrae descripción de comentarios JSDoc
	 */
	private extractDescription(content: string): string | undefined {
		const jsdocMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n/);
		return jsdocMatch ? jsdocMatch[1] : undefined;
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): StandaloneConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<StandaloneConfig>): void {
		this.config = { ...this.config, ...config };
	}
}

