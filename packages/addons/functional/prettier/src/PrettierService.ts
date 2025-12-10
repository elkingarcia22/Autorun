/**
 * PrettierService
 *
 * Servicio que maneja todas las operaciones de Prettier:
 * - Formateo de archivos
 * - Configuración de reglas
 * - Verificación de formato
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface PrettierConfig {
	configFile?: string;
	ignorePath?: string;
	semi?: boolean;
	singleQuote?: boolean;
	tabWidth?: number;
	trailingComma?: 'none' | 'es5' | 'all';
	printWidth?: number;
	useTabs?: boolean;
	arrowParens?: 'always' | 'avoid';
	endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';
	plugins?: string[];
}

export interface PrettierResult {
	filePath: string;
	formatted: boolean;
	originalContent: string;
	formattedContent: string;
}

export class PrettierService {
	private config: PrettierConfig;
	private projectPath: string;
	private initialized = false;

	constructor(config: PrettierConfig, projectPath: string = process.cwd()) {
		this.config = {
			semi: true,
			singleQuote: true,
			tabWidth: 2,
			trailingComma: 'es5',
			printWidth: 80,
			useTabs: false,
			arrowParens: 'always',
			endOfLine: 'lf',
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa el servicio y verifica dependencias
	 */
	async initialize(): Promise<void> {
		// Generar configuración si no existe (siempre, para tener todo listo)
		await this.ensurePrettierConfig();

		// Verificar que Prettier esté instalado
		if (!this.isPrettierInstalled()) {
			// No instalar automáticamente durante initialize, solo preparar configuración
			this.initialized = false;
			return;
		}

		this.initialized = true;
		console.log('✅ Prettier Service: Inicializado correctamente');
	}

	/**
	 * Instala Prettier automáticamente
	 */
	private async installPrettier(): Promise<void> {
		const { execSync } = await import('child_process');
		
		try {
			console.log('📦 Instalando Prettier automáticamente...');
			
			execSync('npm install --save-dev prettier', {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log('✅ Prettier instalado correctamente');
		} catch (error: any) {
			console.warn('⚠️  No se pudo instalar Prettier automáticamente. Ejecuta manualmente: npm install --save-dev prettier');
			throw error;
		}
	}

	/**
	 * Verifica si Prettier está instalado
	 */
	private isPrettierInstalled(): boolean {
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

			return 'prettier' in allDeps;
		} catch {
			return false;
		}
	}

	/**
	 * Asegura que existe configuración de Prettier
	 */
	private async ensurePrettierConfig(): Promise<void> {
		const prettierConfigPath = path.join(this.projectPath, '.prettierrc.json');
		const prettierConfigJsPath = path.join(this.projectPath, '.prettierrc.js');
		const packageJsonPath = path.join(this.projectPath, 'package.json');

		// Verificar si ya existe configuración
		if (existsSync(prettierConfigPath) || existsSync(prettierConfigJsPath)) {
			return;
		}

		// Verificar si está en package.json
		try {
			if (existsSync(packageJsonPath)) {
				const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
				if (packageJson.prettier) {
					return;
				}
			}
		} catch {
			// Ignorar errores
		}

		// Generar configuración básica
		const config = {
			semi: this.config.semi,
			singleQuote: this.config.singleQuote,
			tabWidth: this.config.tabWidth,
			trailingComma: this.config.trailingComma,
			printWidth: this.config.printWidth,
			useTabs: this.config.useTabs,
			arrowParens: this.config.arrowParens,
			endOfLine: this.config.endOfLine,
		};

		await fs.writeFile(prettierConfigPath, JSON.stringify(config, null, 2), 'utf-8');
		console.log(`✅ Configuración de Prettier generada en: ${prettierConfigPath}`);
	}

	/**
	 * Formatea archivos
	 */
	async format(files: string[], options?: Partial<PrettierConfig>): Promise<PrettierResult[]> {
		if (!this.initialized) {
			await this.initialize();
		}

		// Si no está inicializado (Prettier no instalado), intentar instalar automáticamente
		if (!this.initialized && !this.isPrettierInstalled()) {
			console.log('📦 Prettier no está instalado. Instalando automáticamente...');
			try {
				await this.installPrettier();
				await this.initialize();
			} catch (error) {
				throw new Error('Prettier no está instalado. Ejecuta: npm install --save-dev prettier');
			}
		}

		const config = { ...this.config, ...options };
		const results: PrettierResult[] = [];

		for (const file of files) {
			try {
				// Leer contenido original
				const originalContent = await fs.readFile(file, 'utf-8');

				// Formatear con Prettier
				const formattedContent = await this.formatContent(originalContent, file, config);

				results.push({
					filePath: file,
					formatted: originalContent !== formattedContent,
					originalContent,
					formattedContent,
				});

				// Si el contenido cambió, guardarlo
				if (originalContent !== formattedContent) {
					await fs.writeFile(file, formattedContent, 'utf-8');
				}
			} catch (error: any) {
				console.error(`Error al formatear ${file}:`, error.message);
			}
		}

		return results;
	}

	/**
	 * Formatea contenido de texto
	 */
	private async formatContent(
		content: string,
		filePath: string,
		config: PrettierConfig,
	): Promise<string> {
		const args = this.buildPrettierArgs(filePath, config);

		try {
			const result = execSync(`npx prettier ${args.join(' ')}`, {
				cwd: this.projectPath,
				input: content,
				encoding: 'utf-8',
				stdio: 'pipe',
			});

			return result;
		} catch (error: any) {
			// Si hay error, retornar contenido original
			return content;
		}
	}

	/**
	 * Verifica si archivos están formateados correctamente
	 */
	async check(
		files: string[],
		options?: Partial<PrettierConfig>,
	): Promise<{
		formatted: string[];
		unformatted: string[];
	}> {
		const results = await this.format(files, options);

		const formatted: string[] = [];
		const unformatted: string[] = [];

		results.forEach((result) => {
			if (result.formatted) {
				unformatted.push(result.filePath);
			} else {
				formatted.push(result.filePath);
			}
		});

		return { formatted, unformatted };
	}

	/**
	 * Construye argumentos de Prettier
	 */
	private buildPrettierArgs(filePath: string, config: PrettierConfig): string[] {
		const args: string[] = [];

		// Config file
		if (config.configFile) {
			args.push(`--config=${config.configFile}`);
		}

		// Ignore path
		if (config.ignorePath) {
			args.push(`--ignore-path=${config.ignorePath}`);
		}

		// Opciones
		if (config.semi !== undefined) {
			args.push(`--semi=${config.semi}`);
		}
		if (config.singleQuote !== undefined) {
			args.push(`--single-quote=${config.singleQuote}`);
		}
		if (config.tabWidth !== undefined) {
			args.push(`--tab-width=${config.tabWidth}`);
		}
		if (config.trailingComma) {
			args.push(`--trailing-comma=${config.trailingComma}`);
		}
		if (config.printWidth !== undefined) {
			args.push(`--print-width=${config.printWidth}`);
		}
		if (config.useTabs !== undefined) {
			args.push(`--use-tabs=${config.useTabs}`);
		}
		if (config.arrowParens) {
			args.push(`--arrow-parens=${config.arrowParens}`);
		}
		if (config.endOfLine) {
			args.push(`--end-of-line=${config.endOfLine}`);
		}

		// STDIN mode
		args.push('--stdin-filepath', filePath);

		return args;
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		prettierInstalled: boolean;
		hasConfig: boolean;
	} {
		const configPath = path.join(this.projectPath, '.prettierrc.json');
		const configJsPath = path.join(this.projectPath, '.prettierrc.js');

		return {
			initialized: this.initialized,
			prettierInstalled: this.isPrettierInstalled(),
			hasConfig: existsSync(configPath) || existsSync(configJsPath),
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): PrettierConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<PrettierConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
