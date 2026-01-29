/**
 * RenovateService
 *
 * Servicio que maneja todas las operaciones de Renovate:
 * - Inicialización de Renovate
 * - Configuración de Renovate
 * - Detección de actualizaciones disponibles
 * - Creación de PRs automáticos
 * - Gestión de dependencias
 * - Integración con GitHub
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface RenovateConfig {
	enabled?: boolean;
	autoUpdate?: boolean;
	createPRs?: boolean;
	schedule?: string; // cron schedule
	labels?: string[];
	assignees?: string[];
	reviewers?: string[];
	packageRules?: PackageRule[];
	extends?: string[];
	projectPath?: string;
}

export interface PackageRule {
	matchPackageNames?: string[];
	matchPackagePatterns?: string[];
	allowedVersions?: string;
	updateTypes?: ('major' | 'minor' | 'patch' | 'pin' | 'digest')[];
	enabled?: boolean;
}

export interface UpdateInfo {
	packageName: string;
	currentVersion: string;
	newVersion: string;
	updateType: 'major' | 'minor' | 'patch';
	changelogUrl?: string;
}

export interface RenovateResult {
	success: boolean;
	updatesFound?: number;
	prsCreated?: number;
	updates?: UpdateInfo[];
	error?: string;
}

export class RenovateService {
	private config: RenovateConfig;
	private projectPath: string;

	constructor(config: RenovateConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			autoUpdate: false,
			createPRs: true,
			schedule: 'at any time',
			labels: ['renovate', 'dependencies'],
			assignees: [],
			reviewers: [],
			packageRules: [],
			extends: ['config:recommended'],
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa Renovate en el proyecto
	 */
	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Renovate está deshabilitado');
			return;
		}

		try {
			// Crear renovate.json si no existe
			const renovateConfigPath = path.join(this.projectPath, 'renovate.json');
			if (!existsSync(renovateConfigPath)) {
				await this.createRenovateConfig();
				console.log('✅ renovate.json creado');
			}

			console.log('✅ Renovate Service: Inicializado correctamente');
		} catch (error: any) {
			throw new Error(`Error al inicializar Renovate: ${error.message}`);
		}
	}

	/**
	 * Crea el archivo de configuración de Renovate
	 */
	private async createRenovateConfig(): Promise<void> {
		const config = {
			$schema: 'https://docs.renovatebot.com/renovate-schema.json',
			extends: this.config.extends || ['config:recommended'],
			schedule: [this.config.schedule || 'at any time'],
			labels: this.config.labels || ['renovate', 'dependencies'],
			assignees: this.config.assignees || [],
			reviewers: this.config.reviewers || [],
			packageRules: this.config.packageRules || [],
			prConcurrentLimit: 5,
			prHourlyLimit: 2,
			onboarding: true,
			onboardingConfig: {
				extends: ['config:recommended'],
			},
		};

		const configPath = path.join(this.projectPath, 'renovate.json');
		await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
	}

	/**
	 * Detecta actualizaciones disponibles
	 */
	async checkUpdates(): Promise<RenovateResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Renovate está deshabilitado',
			};
		}

		try {
			// Leer package.json para detectar dependencias
			const packageJsonPath = path.join(this.projectPath, 'package.json');
			if (!existsSync(packageJsonPath)) {
				return {
					success: false,
					error: 'package.json no encontrado',
				};
			}

			const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
			const allDeps = {
				...packageJson.dependencies,
				...packageJson.devDependencies,
			};

			// Simular detección de actualizaciones
			// En producción, esto usaría la API de Renovate o npm outdated
			const updates: UpdateInfo[] = [];

			// Ejecutar npm outdated si está disponible
			try {
				const outdatedOutput = execSync('npm outdated --json', {
					cwd: this.projectPath,
					stdio: 'pipe',
					encoding: 'utf-8',
				});

				const outdated = JSON.parse(outdatedOutput);
				for (const [pkgName, info] of Object.entries(outdated as Record<string, any>)) {
					const current = info.current || '';
					const wanted = info.wanted || '';
					const latest = info.latest || '';

					if (latest && latest !== current) {
						let updateType: 'major' | 'minor' | 'patch' = 'patch';
						const currentParts = current.split('.').map(Number);
						const latestParts = latest.split('.').map(Number);

						if (latestParts[0] > currentParts[0]) {
							updateType = 'major';
						} else if (latestParts[1] > currentParts[1]) {
							updateType = 'minor';
						}

						updates.push({
							packageName: pkgName,
							currentVersion: current,
							newVersion: latest,
							updateType,
						});
					}
				}
			} catch {
				// npm outdated no disponible o sin actualizaciones
			}

			console.log(`✅ Renovate: ${updates.length} actualizaciones encontradas`);

			return {
				success: true,
				updatesFound: updates.length,
				updates,
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Ejecuta Renovate (requiere Renovate instalado o GitHub App)
	 */
	async run(): Promise<RenovateResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Renovate está deshabilitado',
			};
		}

		try {
			// Verificar si Renovate está instalado localmente
			const isRenovateInstalled = this.isRenovateInstalled();

			if (!isRenovateInstalled) {
				console.warn(
					'⚠️  Renovate no está instalado localmente. Usa GitHub App o instala: npm install -g renovate',
				);
				return {
					success: false,
					error: 'Renovate no está instalado',
				};
			}

			// Ejecutar Renovate
			execSync('npx renovate', {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log('✅ Renovate: Ejecutado correctamente');

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

	/**
	 * Obtiene la configuración actual de Renovate desde renovate.json
	 */
	async getRenovateConfig(): Promise<any> {
		const configPath = path.join(this.projectPath, 'renovate.json');
		if (existsSync(configPath)) {
			return JSON.parse(readFileSync(configPath, 'utf-8'));
		}
		return null;
	}

	/**
	 * Actualiza la configuración de Renovate en renovate.json
	 */
	async updateRenovateConfig(config: Partial<RenovateConfig>): Promise<void> {
		this.config = { ...this.config, ...config };

		// Actualizar renovate.json
		const configPath = path.join(this.projectPath, 'renovate.json');
		if (existsSync(configPath)) {
			const currentConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

			if (config.labels) currentConfig.labels = config.labels;
			if (config.assignees) currentConfig.assignees = config.assignees;
			if (config.reviewers) currentConfig.reviewers = config.reviewers;
			if (config.packageRules) currentConfig.packageRules = config.packageRules;
			if (config.schedule) currentConfig.schedule = [config.schedule];

			await fs.writeFile(configPath, JSON.stringify(currentConfig, null, 2), 'utf-8');
		} else {
			await this.createRenovateConfig();
		}
	}

	/**
	 * Verifica si Renovate está instalado
	 */
	private isRenovateInstalled(): boolean {
		try {
			execSync('npx renovate --version', {
				cwd: this.projectPath,
				stdio: 'pipe',
			});
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Obtiene la configuración actual del add-on
	 */
	getConfig(): RenovateConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración del add-on
	 */
	updateConfig(config: Partial<RenovateConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
