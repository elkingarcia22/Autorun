/**
 * TurborepoService
 *
 * Servicio que maneja todas las operaciones de Turborepo:
 * - Builds paralelos
 * - Caché inteligente
 * - Task orchestration
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface TurborepoConfig {
	enabled?: boolean;
	cache?: boolean;
	parallel?: boolean;
	filter?: string;
	projectPath?: string;
}

export interface BuildResult {
	success: boolean;
	tasksRun?: number;
	cacheHits?: number;
	duration?: number;
	error?: string;
}

export class TurborepoService {
	private config: TurborepoConfig;
	private projectPath: string;

	constructor(config: TurborepoConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			cache: true,
			parallel: true,
			...config,
		};
		this.projectPath = projectPath;
	}

	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Turborepo está deshabilitado');
			return;
		}

		try {
			if (!this.isTurborepoInstalled()) {
				console.warn('⚠️  Turborepo no está instalado. Ejecuta: npm install --save-dev turbo');
				return;
			}

			const configPath = path.join(this.projectPath, 'turbo.json');
			if (!existsSync(configPath)) {
				await this.createTurboConfig();
				console.log('✅ turbo.json creado');
			}

			console.log('✅ Turborepo Service: Inicializado correctamente');
		} catch (error: any) {
			throw new Error(`Error al inicializar Turborepo: ${error.message}`);
		}
	}

	private async createTurboConfig(): Promise<void> {
		const config = {
			$schema: 'https://turbo.build/schema.json',
			pipeline: {
				build: {
					dependsOn: ['^build'],
					outputs: ['dist/**'],
				},
				test: {
					dependsOn: ['build'],
				},
				lint: {
					dependsOn: ['^lint'],
				},
			},
		};

		const configPath = path.join(this.projectPath, 'turbo.json');
		await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
	}

	async run(
		task: string,
		options?: {
			filter?: string;
			cache?: boolean;
			parallel?: boolean;
		},
	): Promise<BuildResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Turborepo está deshabilitado',
			};
		}

		try {
			let command = `npx turbo run ${task}`;

			if (options?.filter || this.config.filter) {
				command += ` --filter=${options?.filter || this.config.filter}`;
			}

			if (options?.cache !== undefined ? options.cache : this.config.cache) {
				command += ' --cache';
			} else {
				command += ' --no-cache';
			}

			if (options?.parallel !== undefined ? options.parallel : this.config.parallel) {
				command += ' --parallel';
			}

			execSync(command, {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log(`✅ Turborepo: Task "${task}" ejecutado correctamente`);

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

	private isTurborepoInstalled(): boolean {
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

			return 'turbo' in allDeps;
		} catch {
			return false;
		}
	}

	getConfig(): TurborepoConfig {
		return { ...this.config };
	}

	updateConfig(config: Partial<TurborepoConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
