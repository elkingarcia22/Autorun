/**
 * PlaywrightService
 *
 * Servicio que maneja todas las operaciones de Playwright:
 * - Inicialización de Playwright
 * - Configuración de Playwright
 * - Ejecución de tests E2E
 * - Generación de reportes
 * - Integración con CI/CD
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface PlaywrightConfig {
	enabled?: boolean;
	testDir?: string;
	outputDir?: string;
	timeout?: number;
	retries?: number;
	workers?: number;
	projects?: ProjectConfig[];
	use?: UseConfig;
	projectPath?: string;
}

export interface ProjectConfig {
	name: string;
	use?: UseConfig;
}

export interface UseConfig {
	baseURL?: string;
	viewport?: { width: number; height: number };
	screenshot?: 'only-on-failure' | 'on' | 'off';
	video?: 'retain-on-failure' | 'on' | 'off';
	trace?: 'on-first-retry' | 'on' | 'off';
}

export interface TestResult {
	success: boolean;
	testsRun?: number;
	testsPassed?: number;
	testsFailed?: number;
	testsSkipped?: number;
	duration?: number;
	reportPath?: string;
	error?: string;
}

export class PlaywrightService {
	private config: PlaywrightConfig;
	private projectPath: string;

	constructor(config: PlaywrightConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			testDir: 'tests/e2e',
			outputDir: 'test-results',
			timeout: 30000,
			retries: 0,
			workers: 1,
			projects: [],
			use: {
				baseURL: 'http://localhost:3000',
				viewport: { width: 1280, height: 720 },
				screenshot: 'only-on-failure',
				video: 'retain-on-failure',
				trace: 'on-first-retry',
			},
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa Playwright en el proyecto
	 */
	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Playwright está deshabilitado');
			return;
		}

		try {
			// Verificar si Playwright está instalado
			if (!this.isPlaywrightInstalled()) {
				console.warn(
					'⚠️  Playwright no está instalado. Ejecuta: npm install --save-dev @playwright/test',
				);
				return;
			}

			// Crear playwright.config.ts si no existe
			const configPath = path.join(this.projectPath, 'playwright.config.ts');
			if (!existsSync(configPath)) {
				await this.createPlaywrightConfig();
				console.log('✅ playwright.config.ts creado');
			}

			// Crear directorio de tests si no existe
			const testDir = path.join(this.projectPath, this.config.testDir || 'tests/e2e');
			await fs.mkdir(testDir, { recursive: true });

			// Crear test de ejemplo si no existe
			const exampleTestPath = path.join(testDir, 'example.spec.ts');
			if (!existsSync(exampleTestPath)) {
				await this.createExampleTest();
				console.log('✅ Test de ejemplo creado');
			}

			console.log('✅ Playwright Service: Inicializado correctamente');
		} catch (error: any) {
			throw new Error(`Error al inicializar Playwright: ${error.message}`);
		}
	}

	/**
	 * Crea el archivo de configuración de Playwright
	 */
	private async createPlaywrightConfig(): Promise<void> {
		const config = `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '${this.config.testDir || 'tests/e2e'}',
  outputDir: '${this.config.outputDir || 'test-results'}',
  timeout: ${this.config.timeout || 30000},
  retries: ${this.config.retries || 0},
  workers: ${this.config.workers || 1},
  use: {
    baseURL: '${this.config.use?.baseURL || 'http://localhost:3000'}',
    viewport: { width: ${this.config.use?.viewport?.width || 1280}, height: ${this.config.use?.viewport?.height || 720} },
    screenshot: '${this.config.use?.screenshot || 'only-on-failure'}',
    video: '${this.config.use?.video || 'retain-on-failure'}',
    trace: '${this.config.use?.trace || 'on-first-retry'}',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: '${this.config.use?.baseURL || 'http://localhost:3000'}',
    reuseExistingServer: !process.env.CI,
  },
});
`;

		const configPath = path.join(this.projectPath, 'playwright.config.ts');
		await fs.writeFile(configPath, config, 'utf-8');
	}

	/**
	 * Crea un test de ejemplo
	 */
	private async createExampleTest(): Promise<void> {
		const testContent = `import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Autorun/);
});
`;

		const testDir = path.join(this.projectPath, this.config.testDir || 'tests/e2e');
		const exampleTestPath = path.join(testDir, 'example.spec.ts');
		await fs.writeFile(exampleTestPath, testContent, 'utf-8');
	}

	/**
	 * Ejecuta los tests de Playwright
	 */
	async runTests(options?: {
		headed?: boolean;
		ui?: boolean;
		project?: string;
		workers?: number;
	}): Promise<TestResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Playwright está deshabilitado',
			};
		}

		try {
			// Construir comando de Playwright
			let command = 'npx playwright test';

			if (options?.headed) {
				command += ' --headed';
			}

			if (options?.ui) {
				command += ' --ui';
			}

			if (options?.project) {
				command += ` --project ${options.project}`;
			}

			if (options?.workers !== undefined) {
				command += ` --workers ${options.workers}`;
			}

			// Ejecutar tests
			execSync(command, {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			// Leer resultados del reporte
			const reportPath = path.join(this.projectPath, this.config.outputDir || 'test-results');

			console.log('✅ Playwright: Tests ejecutados correctamente');

			return {
				success: true,
				reportPath,
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Genera reporte HTML de los tests
	 */
	async generateReport(): Promise<string | null> {
		try {
			execSync('npx playwright show-report', {
				cwd: this.projectPath,
				stdio: 'pipe',
			});

			const reportPath = path.join(this.projectPath, this.config.outputDir || 'test-results');

			return reportPath;
		} catch (error: any) {
			console.warn('⚠️  Error al generar reporte:', error.message);
			return null;
		}
	}

	/**
	 * Instala los navegadores de Playwright
	 */
	async installBrowsers(): Promise<void> {
		try {
			console.log('📦 Instalando navegadores de Playwright...');
			execSync('npx playwright install', {
				cwd: this.projectPath,
				stdio: 'inherit',
			});
			console.log('✅ Navegadores instalados correctamente');
		} catch (error: any) {
			throw new Error(`Error al instalar navegadores: ${error.message}`);
		}
	}

	/**
	 * Verifica si Playwright está instalado
	 */
	private isPlaywrightInstalled(): boolean {
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

			return '@playwright/test' in allDeps;
		} catch {
			return false;
		}
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): PlaywrightConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<PlaywrightConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
