/**
 * JestService
 *
 * Servicio que maneja todas las operaciones de Jest:
 * - Ejecución de tests
 * - Watch mode
 * - Coverage reports
 * - Configuración de Jest
 */

import { execSync, spawn, ChildProcess } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface JestConfig {
	testMatch?: string[];
	testEnvironment?: 'node' | 'jsdom' | 'jest-environment-jsdom';
	coverage?: boolean;
	coverageDirectory?: string;
	coverageThreshold?: {
		global?: {
			branches?: number;
			functions?: number;
			lines?: number;
			statements?: number;
		};
	};
	watch?: boolean;
	verbose?: boolean;
	bail?: boolean;
	maxWorkers?: number | string;
	setupFilesAfterEnv?: string[];
	moduleNameMapper?: Record<string, string>;
	transform?: Record<string, string>;
	collectCoverageFrom?: string[];
	testTimeout?: number;
}

export interface JestResult {
	success: boolean;
	numPassedTests: number;
	numFailedTests: number;
	numTotalTests: number;
	coverage?: {
		branches: number;
		functions: number;
		lines: number;
		statements: number;
	};
	duration: number;
	output: string;
}

export class JestService {
	private config: JestConfig;
	private projectPath: string;
	private process?: ChildProcess;
	private initialized = false;

	constructor(config: JestConfig, projectPath: string = process.cwd()) {
		this.config = {
			testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
			testEnvironment: 'node',
			coverage: false,
			coverageDirectory: 'coverage',
			verbose: true,
			watch: false,
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa el servicio y verifica dependencias
	 */
	async initialize(): Promise<void> {
		// Verificar que Jest esté instalado
		if (!this.isJestInstalled()) {
			console.warn('⚠️  Jest no está instalado. Ejecuta: npm install --save-dev jest @types/jest');
			return;
		}

		// Crear directorio de coverage si no existe
		if (this.config.coverage && this.config.coverageDirectory) {
			await fs.mkdir(this.config.coverageDirectory, { recursive: true });
		}

		// Generar configuración de Jest si no existe
		await this.ensureJestConfig();

		this.initialized = true;
		console.log('✅ Jest Service: Inicializado correctamente');
	}

	/**
	 * Verifica si Jest está instalado
	 */
	private isJestInstalled(): boolean {
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

			return 'jest' in allDeps;
		} catch {
			return false;
		}
	}

	/**
	 * Asegura que existe configuración de Jest
	 */
	private async ensureJestConfig(): Promise<void> {
		const jestConfigPath = path.join(this.projectPath, 'jest.config.js');
		const jestConfigJsonPath = path.join(this.projectPath, 'jest.config.json');
		const packageJsonPath = path.join(this.projectPath, 'package.json');

		// Verificar si ya existe configuración
		if (existsSync(jestConfigPath) || existsSync(jestConfigJsonPath)) {
			return;
		}

		// Verificar si está en package.json
		try {
			if (existsSync(packageJsonPath)) {
				const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
				if (packageJson.jest) {
					return;
				}
			}
		} catch {
			// Ignorar errores
		}

		// Generar configuración básica
		const config = this.generateJestConfig();
		await fs.writeFile(jestConfigPath, config, 'utf-8');
		console.log(`✅ Configuración de Jest generada en: ${jestConfigPath}`);
	}

	/**
	 * Genera configuración básica de Jest
	 */
	private generateJestConfig(): string {
		return `module.exports = {
  testEnvironment: '${this.config.testEnvironment || 'node'}',
  testMatch: ${JSON.stringify(this.config.testMatch, null, 2)},
  collectCoverageFrom: ${JSON.stringify(this.config.collectCoverageFrom || ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'], null, 2)},
  coverageDirectory: '${this.config.coverageDirectory || 'coverage'}',
  coverageThreshold: ${JSON.stringify(this.config.coverageThreshold || {}, null, 2)},
  setupFilesAfterEnv: ${JSON.stringify(this.config.setupFilesAfterEnv || [], null, 2)},
  moduleNameMapper: ${JSON.stringify(this.config.moduleNameMapper || {}, null, 2)},
  transform: ${JSON.stringify(this.config.transform || {}, null, 2)},
  testTimeout: ${this.config.testTimeout || 5000}
};
`;
	}

	/**
	 * Ejecuta los tests
	 */
	async run(options?: Partial<JestConfig>): Promise<JestResult> {
		if (!this.initialized) {
			await this.initialize();
		}

		const config = { ...this.config, ...options };
		const args = this.buildJestArgs(config);

		try {
			console.log('🧪 Jest: Ejecutando tests...');
			const output = execSync(`npx jest ${args.join(' ')}`, {
				cwd: this.projectPath,
				encoding: 'utf-8',
				stdio: 'pipe',
			});

			// Parsear resultados básicos
			const result = this.parseJestOutput(output, config);

			console.log(`✅ Jest: ${result.numPassedTests}/${result.numTotalTests} tests pasaron`);
			if (result.numFailedTests > 0) {
				console.log(`❌ Jest: ${result.numFailedTests} tests fallaron`);
			}

			return result;
		} catch (error: any) {
			const output = error.stdout || error.message;
			const result = this.parseJestOutput(output, config);
			result.success = false;
			return result;
		}
	}

	/**
	 * Ejecuta tests en modo watch
	 */
	async watch(): Promise<ChildProcess> {
		if (!this.initialized) {
			await this.initialize();
		}

		if (this.process) {
			throw new Error('Jest watch ya está ejecutándose');
		}

		const args = this.buildJestArgs({ ...this.config, watch: true });

		console.log('👀 Jest: Iniciando modo watch...');
		this.process = spawn('npx', ['jest', ...args], {
			cwd: this.projectPath,
			stdio: 'inherit',
			shell: true,
		});

		this.process.on('exit', () => {
			this.process = undefined;
		});

		return this.process;
	}

	/**
	 * Detiene el modo watch
	 */
	stop(): void {
		if (this.process) {
			this.process.kill();
			this.process = undefined;
			console.log('🔌 Jest: Modo watch detenido');
		}
	}

	/**
	 * Construye argumentos de Jest
	 */
	private buildJestArgs(config: JestConfig): string[] {
		const args: string[] = [];

		if (config.coverage) {
			args.push('--coverage');
			if (config.coverageDirectory) {
				args.push(`--coverageDirectory=${config.coverageDirectory}`);
			}
		}

		if (config.watch) {
			args.push('--watch');
		}

		if (config.verbose) {
			args.push('--verbose');
		}

		if (config.bail) {
			args.push('--bail');
		}

		if (config.maxWorkers) {
			args.push(`--maxWorkers=${config.maxWorkers}`);
		}

		if (config.testMatch && config.testMatch.length > 0) {
			config.testMatch.forEach((match) => {
				args.push(`--testMatch="${match}"`);
			});
		}

		return args;
	}

	/**
	 * Parsea la salida de Jest
	 */
	private parseJestOutput(output: string, config: JestConfig): JestResult {
		// Intentar extraer información de la salida
		const passedMatch = output.match(/(\d+)\s+passed/);
		const failedMatch = output.match(/(\d+)\s+failed/);
		const totalMatch = output.match(/Tests:\s+(\d+)/);

		const numPassedTests = passedMatch ? parseInt(passedMatch[1]) : 0;
		const numFailedTests = failedMatch ? parseInt(failedMatch[1]) : 0;
		const numTotalTests = totalMatch ? parseInt(totalMatch[1]) : numPassedTests + numFailedTests;

		// Intentar extraer coverage si está disponible
		let coverage;
		if (config.coverage) {
			const coverageMatch = output.match(
				/All files\s+\|\s+(\d+\.?\d*)\s+\|\s+(\d+\.?\d*)\s+\|\s+(\d+\.?\d*)\s+\|\s+(\d+\.?\d*)/,
			);
			if (coverageMatch) {
				coverage = {
					statements: parseFloat(coverageMatch[1]),
					branches: parseFloat(coverageMatch[2]),
					functions: parseFloat(coverageMatch[3]),
					lines: parseFloat(coverageMatch[4]),
				};
			}
		}

		return {
			success: numFailedTests === 0,
			numPassedTests,
			numFailedTests,
			numTotalTests,
			coverage,
			duration: 0, // Jest no siempre muestra duración en la salida
			output,
		};
	}

	/**
	 * Ejecuta un test específico
	 */
	async runTest(testPath: string, options?: Partial<JestConfig>): Promise<JestResult> {
		const config = { ...this.config, ...options };
		const args = this.buildJestArgs(config);
		args.push(testPath);

		try {
			const output = execSync(`npx jest ${args.join(' ')}`, {
				cwd: this.projectPath,
				encoding: 'utf-8',
				stdio: 'pipe',
			});

			return this.parseJestOutput(output, config);
		} catch (error: any) {
			const output = error.stdout || error.message;
			const result = this.parseJestOutput(output, config);
			result.success = false;
			return result;
		}
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		jestInstalled: boolean;
		watching: boolean;
		coverageEnabled: boolean;
	} {
		return {
			initialized: this.initialized,
			jestInstalled: this.isJestInstalled(),
			watching: !!this.process,
			coverageEnabled: this.config.coverage || false,
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): JestConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<JestConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
