/**
 * VitestService
 *
 * Servicio que maneja todas las operaciones de Vitest:
 * - Inicialización de Vitest
 * - Configuración de Vitest
 * - Ejecución de tests
 * - Generación de reportes
 * - Watch mode
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface VitestConfig {
	enabled?: boolean;
	testDir?: string;
	coverage?: boolean;
	coverageDir?: string;
	watch?: boolean;
	ui?: boolean;
	reporter?: string[];
	projectPath?: string;
}

export interface TestResult {
	success: boolean;
	testsRun?: number;
	testsPassed?: number;
	testsFailed?: number;
	testsSkipped?: number;
	duration?: number;
	coverage?: CoverageResult;
	error?: string;
}

export interface CoverageResult {
	lines: number;
	functions: number;
	branches: number;
	statements: number;
}

export class VitestService {
	private config: VitestConfig;
	private projectPath: string;

	constructor(config: VitestConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			testDir: 'src',
			coverage: false,
			coverageDir: 'coverage',
			watch: false,
			ui: false,
			reporter: ['verbose'],
			...config,
		};
		this.projectPath = projectPath;
	}

	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Vitest está deshabilitado');
			return;
		}

		try {
			if (!this.isVitestInstalled()) {
				console.warn('⚠️  Vitest no está instalado. Ejecuta: npm install --save-dev vitest');
				return;
			}

			const configPath = path.join(this.projectPath, 'vitest.config.ts');
			if (!existsSync(configPath)) {
				await this.createVitestConfig();
				console.log('✅ vitest.config.ts creado');
			}

			console.log('✅ Vitest Service: Inicializado correctamente');
		} catch (error: any) {
			throw new Error(`Error al inicializar Vitest: ${error.message}`);
		}
	}

	private async createVitestConfig(): Promise<void> {
		const config = `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'dist', 'tests']
    }
  }
});
`;

		const configPath = path.join(this.projectPath, 'vitest.config.ts');
		await fs.writeFile(configPath, config, 'utf-8');
	}

	async runTests(options?: {
		watch?: boolean;
		ui?: boolean;
		coverage?: boolean;
	}): Promise<TestResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Vitest está deshabilitado',
			};
		}

		try {
			let command = 'npx vitest run';

			if (options?.watch !== undefined ? options.watch : this.config.watch) {
				command = 'npx vitest';
			}

			if (options?.ui !== undefined ? options.ui : this.config.ui) {
				command += ' --ui';
			}

			if (options?.coverage !== undefined ? options.coverage : this.config.coverage) {
				command += ' --coverage';
			}

			execSync(command, {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log('✅ Vitest: Tests ejecutados correctamente');

			return {
				success: true,
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	private isVitestInstalled(): boolean {
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

			return 'vitest' in allDeps;
		} catch {
			return false;
		}
	}

	getConfig(): VitestConfig {
		return { ...this.config };
	}

	updateConfig(config: Partial<VitestConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
