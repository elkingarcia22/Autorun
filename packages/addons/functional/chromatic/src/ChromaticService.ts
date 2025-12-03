/**
 * ChromaticService
 *
 * Servicio que maneja todas las operaciones de Chromatic:
 * - Inicialización de Chromatic
 * - Autenticación con Chromatic
 * - Ejecución de visual testing
 * - Generación de reportes
 * - Integración con Storybook
 * - Integración con GitHub PRs
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface ChromaticConfig {
	enabled?: boolean;
	token?: string;
	projectToken?: string;
	buildScriptName?: string;
	storybookBuildDir?: string;
	onlyChanged?: boolean;
	exitZeroOnChanges?: boolean;
	exitOnceUploaded?: boolean;
	ignoreLastBuildOnBranch?: string;
	autoAcceptChanges?: boolean;
	projectPath?: string;
}

export interface ChromaticResult {
	success: boolean;
	buildNumber?: string;
	buildUrl?: string;
	changesDetected?: boolean;
	changes?: VisualChange[];
	error?: string;
}

export interface VisualChange {
	component: string;
	story: string;
	changeType: 'added' | 'modified' | 'deleted';
	diffUrl?: string;
}

export class ChromaticService {
	private config: ChromaticConfig;
	private projectPath: string;

	constructor(config: ChromaticConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			buildScriptName: 'build-storybook',
			storybookBuildDir: 'storybook-static',
			onlyChanged: false,
			exitZeroOnChanges: false,
			exitOnceUploaded: false,
			autoAcceptChanges: false,
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa Chromatic en el proyecto
	 */
	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Chromatic está deshabilitado');
			return;
		}

		try {
			// Verificar si Chromatic está instalado
			if (!this.isChromaticInstalled()) {
				console.warn('⚠️  Chromatic no está instalado. Ejecuta: npm install --save-dev chromatic');
				return;
			}

			// Crear .chromaticrc.json si no existe
			const configPath = path.join(this.projectPath, '.chromaticrc.json');
			if (!existsSync(configPath)) {
				await this.createChromaticConfig();
				console.log('✅ .chromaticrc.json creado');
			}

			console.log('✅ Chromatic Service: Inicializado correctamente');
		} catch (error: any) {
			throw new Error(`Error al inicializar Chromatic: ${error.message}`);
		}
	}

	/**
	 * Crea el archivo de configuración de Chromatic
	 */
	private async createChromaticConfig(): Promise<void> {
		const config = {
			projectToken: this.config.projectToken || '',
			buildScriptName: this.config.buildScriptName || 'build-storybook',
			storybookBuildDir: this.config.storybookBuildDir || 'storybook-static',
			onlyChanged: this.config.onlyChanged || false,
			exitZeroOnChanges: this.config.exitZeroOnChanges || false,
			exitOnceUploaded: this.config.exitOnceUploaded || false,
			ignoreLastBuildOnBranch: this.config.ignoreLastBuildOnBranch || '',
			autoAcceptChanges: this.config.autoAcceptChanges || false,
		};

		const configPath = path.join(this.projectPath, '.chromaticrc.json');
		await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
	}

	/**
	 * Ejecuta visual testing con Chromatic
	 */
	async run(options?: {
		onlyChanged?: boolean;
		exitZeroOnChanges?: boolean;
		autoAcceptChanges?: boolean;
	}): Promise<ChromaticResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Chromatic está deshabilitado',
			};
		}

		try {
			// Construir comando de Chromatic
			let command = 'npx chromatic';

			if (this.config.projectToken) {
				command += ` --project-token=${this.config.projectToken}`;
			}

			if (this.config.token) {
				command += ` --token=${this.config.token}`;
			}

			if (options?.onlyChanged !== undefined ? options.onlyChanged : this.config.onlyChanged) {
				command += ' --only-changed';
			}

			if (
				options?.exitZeroOnChanges !== undefined
					? options.exitZeroOnChanges
					: this.config.exitZeroOnChanges
			) {
				command += ' --exit-zero-on-changes';
			}

			if (
				options?.autoAcceptChanges !== undefined
					? options.autoAcceptChanges
					: this.config.autoAcceptChanges
			) {
				command += ' --auto-accept-changes';
			}

			if (this.config.exitOnceUploaded) {
				command += ' --exit-once-uploaded';
			}

			if (this.config.ignoreLastBuildOnBranch) {
				command += ` --ignore-last-build-on-branch=${this.config.ignoreLastBuildOnBranch}`;
			}

			// Ejecutar Chromatic
			try {
				const output = execSync(command, {
					cwd: this.projectPath,
					stdio: 'pipe',
					encoding: 'utf-8',
				});

				// Parsear output para obtener build URL y número
				const buildUrlMatch = output.match(/https:\/\/[^\s]+/);
				const buildNumberMatch = output.match(/build #(\d+)/);

				console.log('✅ Chromatic: Visual testing completado');

				return {
					success: true,
					buildUrl: buildUrlMatch ? buildUrlMatch[0] : undefined,
					buildNumber: buildNumberMatch ? buildNumberMatch[1] : undefined,
					changesDetected: false,
				};
			} catch (error: any) {
				// Chromatic puede retornar error si detecta cambios visuales
				const output = error.stdout || error.message;
				const buildUrlMatch = output.match(/https:\/\/[^\s]+/);
				const buildNumberMatch = output.match(/build #(\d+)/);

				// Verificar si hay cambios visuales
				const changesDetected =
					output.includes('visual changes') || output.includes('changes detected');

				return {
					success: !this.config.exitZeroOnChanges || !changesDetected,
					buildUrl: buildUrlMatch ? buildUrlMatch[0] : undefined,
					buildNumber: buildNumberMatch ? buildNumberMatch[1] : undefined,
					changesDetected,
					error: changesDetected ? 'Cambios visuales detectados' : error.message,
				};
			}
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Verifica si Chromatic está instalado
	 */
	private isChromaticInstalled(): boolean {
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

			return 'chromatic' in allDeps;
		} catch {
			return false;
		}
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): ChromaticConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<ChromaticConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
