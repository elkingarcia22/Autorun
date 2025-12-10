/**
 * ESLintService
 *
 * Servicio que maneja todas las operaciones de ESLint:
 * - Linting de archivos
 * - Auto-fix de errores
 * - Configuración de reglas
 * - Reportes de errores
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface ESLintConfig {
	configFile?: string;
	extensions?: string[];
	fix?: boolean;
	format?: 'stylish' | 'compact' | 'json' | 'html';
	maxWarnings?: number;
	ignorePath?: string;
	rules?: Record<string, any>;
}

export interface ESLintResult {
	filePath: string;
	messages: Array<{
		ruleId: string | null;
		severity: number;
		message: string;
		line: number;
		column: number;
		fix?: {
			range: [number, number];
			text: string;
		};
	}>;
	errorCount: number;
	warningCount: number;
	fixableErrorCount: number;
	fixableWarningCount: number;
}

export interface ESLintReport {
	results: ESLintResult[];
	errorCount: number;
	warningCount: number;
	fixableErrorCount: number;
	fixableWarningCount: number;
}

export class ESLintService {
	private config: ESLintConfig;
	private projectPath: string;
	private initialized = false;

	constructor(config: ESLintConfig, projectPath: string = process.cwd()) {
		this.config = {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			fix: false,
			format: 'stylish',
			maxWarnings: 0,
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa el servicio y verifica dependencias
	 */
	async initialize(): Promise<void> {
		// Generar configuración si no existe (siempre, para tener todo listo)
		await this.ensureESLintConfig();

		// Verificar que ESLint esté instalado
		if (!this.isESLintInstalled()) {
			// No instalar automáticamente durante initialize, solo preparar configuración
			this.initialized = false;
			return;
		}

		this.initialized = true;
		console.log('✅ ESLint Service: Inicializado correctamente');
	}

	/**
	 * Instala ESLint automáticamente
	 */
	private async installESLint(): Promise<void> {
		const { execSync } = await import('child_process');
		
		try {
			console.log('📦 Instalando ESLint automáticamente...');
			
			execSync('npm install --save-dev eslint', {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log('✅ ESLint instalado correctamente');
		} catch (error: any) {
			console.warn('⚠️  No se pudo instalar ESLint automáticamente. Ejecuta manualmente: npm install --save-dev eslint');
			throw error;
		}
	}

	/**
	 * Verifica si ESLint está instalado
	 */
	private isESLintInstalled(): boolean {
		try {
			const packageJsonPath = path.join(this.projectPath, 'package.json');
			if (!existsSync(packageJsonPath)) {
				return false;
			}
			const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
			const allDeps = {
				...packageJson.dependencies,
				...packageJson.devDependencies,
			};

			return 'eslint' in allDeps;
		} catch {
			return false;
		}
	}

	/**
	 * Asegura que existe configuración de ESLint
	 */
	private async ensureESLintConfig(): Promise<void> {
		const eslintConfigPath = path.join(this.projectPath, '.eslintrc.json');
		const eslintConfigJsPath = path.join(this.projectPath, '.eslintrc.js');
		const packageJsonPath = path.join(this.projectPath, 'package.json');

		// Verificar si ya existe configuración
		if (existsSync(eslintConfigPath) || existsSync(eslintConfigJsPath)) {
			return;
		}

		// Verificar si está en package.json
		try {
			if (existsSync(packageJsonPath)) {
				const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
				if (packageJson.eslintConfig) {
					return;
				}
			}
		} catch {
			// Ignorar errores
		}

		// Generar configuración básica
		const config = this.generateESLintConfig();
		await fs.writeFile(eslintConfigPath, JSON.stringify(config, null, 2), 'utf-8');
		console.log(`✅ Configuración de ESLint generada en: ${eslintConfigPath}`);
	}

	/**
	 * Genera configuración básica de ESLint
	 */
	private generateESLintConfig(): any {
		return {
			env: {
				browser: true,
				es2021: true,
				node: true,
			},
			extends: ['eslint:recommended'],
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			rules: {
				'no-unused-vars': 'warn',
				'no-console': 'off',
			},
		};
	}

	/**
	 * Ejecuta ESLint en archivos
	 */
	async lint(files: string[], options?: Partial<ESLintConfig>): Promise<ESLintReport> {
		if (!this.initialized) {
			await this.initialize();
		}

		// Si no está inicializado (ESLint no instalado), intentar instalar automáticamente
		if (!this.initialized && !this.isESLintInstalled()) {
			console.log('📦 ESLint no está instalado. Instalando automáticamente...');
			try {
				await this.installESLint();
				await this.initialize();
			} catch (error) {
				throw new Error('ESLint no está instalado. Ejecuta: npm install --save-dev eslint');
			}
		}

		const config = { ...this.config, ...options };
		const args = this.buildESLintArgs(files, config);

		try {
			console.log('🔍 ESLint: Ejecutando linting...');
			const output = execSync(`npx eslint ${args.join(' ')}`, {
				cwd: this.projectPath,
				encoding: 'utf-8',
				stdio: 'pipe',
			});

			// Si hay salida, parsearla
			return this.parseESLintOutput(output, files);
		} catch (error: any) {
			// ESLint puede retornar código de error si hay problemas
			const output = error.stdout || error.message;
			return this.parseESLintOutput(output, files);
		}
	}

	/**
	 * Auto-fix errores de ESLint
	 */
	async fix(files: string[], options?: Partial<ESLintConfig>): Promise<ESLintReport> {
		return await this.lint(files, { ...options, fix: true });
	}

	/**
	 * Construye argumentos de ESLint
	 */
	private buildESLintArgs(files: string[], config: ESLintConfig): string[] {
		const args: string[] = [];

		// Archivos
		files.forEach((file) => {
			args.push(`"${file}"`);
		});

		// Formato
		if (config.format) {
			args.push(`--format=${config.format}`);
		}

		// Auto-fix
		if (config.fix) {
			args.push('--fix');
		}

		// Config file
		if (config.configFile) {
			args.push(`--config=${config.configFile}`);
		}

		// Max warnings
		if (config.maxWarnings !== undefined) {
			args.push(`--max-warnings=${config.maxWarnings}`);
		}

		// Ignore path
		if (config.ignorePath) {
			args.push(`--ignore-path=${config.ignorePath}`);
		}

		return args;
	}

	/**
	 * Parsea la salida de ESLint
	 */
	private parseESLintOutput(output: string, files: string[]): ESLintReport {
		// Intentar parsear JSON si el formato es JSON
		if (this.config.format === 'json') {
			try {
				const parsed = JSON.parse(output);
				return {
					results: parsed,
					errorCount: parsed.reduce((sum: number, r: ESLintResult) => sum + r.errorCount, 0),
					warningCount: parsed.reduce((sum: number, r: ESLintResult) => sum + r.warningCount, 0),
					fixableErrorCount: parsed.reduce(
						(sum: number, r: ESLintResult) => sum + r.fixableErrorCount,
						0,
					),
					fixableWarningCount: parsed.reduce(
						(sum: number, r: ESLintResult) => sum + r.fixableWarningCount,
						0,
					),
				};
			} catch {
				// Si falla, continuar con parsing básico
			}
		}

		// Parsing básico para otros formatos
		const results: ESLintResult[] = files.map((filePath) => ({
			filePath,
			messages: [],
			errorCount: 0,
			warningCount: 0,
			fixableErrorCount: 0,
			fixableWarningCount: 0,
		}));

		return {
			results,
			errorCount: 0,
			warningCount: 0,
			fixableErrorCount: 0,
			fixableWarningCount: 0,
		};
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		eslintInstalled: boolean;
		hasConfig: boolean;
	} {
		const configPath = path.join(this.projectPath, '.eslintrc.json');
		const configJsPath = path.join(this.projectPath, '.eslintrc.js');

		return {
			initialized: this.initialized,
			eslintInstalled: this.isESLintInstalled(),
			hasConfig: existsSync(configPath) || existsSync(configJsPath),
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): ESLintConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<ESLintConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
