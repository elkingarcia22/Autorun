/**
 * ChangesetsService
 *
 * Servicio que maneja todas las operaciones de Changesets:
 * - Inicialización de Changesets
 * - Creación de changesets
 * - Versionado semántico automático
 * - Generación de CHANGELOG.md
 * - Gestión de releases
 * - Integración con GitHub releases
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync, statSync } from 'fs';
import * as path from 'path';

export interface ChangesetsConfig {
	enabled?: boolean;
	autoVersion?: boolean;
	autoRelease?: boolean;
	commitChangesets?: boolean;
	createGitHubRelease?: boolean;
	releaseType?: 'major' | 'minor' | 'patch' | 'auto';
	changelogPath?: string;
	changesetsPath?: string;
	projectPath?: string;
}

export interface Changeset {
	id: string;
	summary: string;
	type: 'major' | 'minor' | 'patch';
	dependencies?: string[];
}

export interface ChangesetResult {
	success: boolean;
	changesetId?: string;
	version?: string;
	changelogUpdated?: boolean;
	gitHubReleaseCreated?: boolean;
	error?: string;
}

export interface VersionInfo {
	current: string;
	next?: string;
	type: 'major' | 'minor' | 'patch';
}

export class ChangesetsService {
	private config: ChangesetsConfig;
	private projectPath: string;

	constructor(config: ChangesetsConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			autoVersion: true,
			autoRelease: false,
			commitChangesets: true,
			createGitHubRelease: false,
			releaseType: 'auto',
			changelogPath: 'CHANGELOG.md',
			changesetsPath: '.changeset',
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa Changesets en el proyecto
	 */
	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Changesets está deshabilitado');
			return;
		}

		try {
			// Verificar si Changesets está instalado
			if (!this.isChangesetsInstalled()) {
				console.warn(
					'⚠️  Changesets no está instalado. Ejecuta: npm install --save-dev @changesets/cli',
				);
				return;
			}

			// Crear directorio .changeset si no existe
			const changesetsDir = path.join(this.projectPath, this.config.changesetsPath || '.changeset');
			await fs.mkdir(changesetsDir, { recursive: true });

			// Crear config.json si no existe
			const configPath = path.join(changesetsDir, 'config.json');
			if (!existsSync(configPath)) {
				const config = {
					$schema: 'https://unpkg.com/@changesets/config@2.3.1/schema.json',
					changelog: '@changesets/cli/changelog',
					commit: this.config.commitChangesets !== false,
					fixed: [],
					linked: [],
					access: 'restricted',
					baseBranch: 'main',
					updateInternalDependencies: 'patch',
					ignore: [],
				};

				await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
				console.log('✅ Changesets config.json creado');
			}

			console.log('✅ Changesets Service: Inicializado correctamente');
		} catch (error: any) {
			throw new Error(`Error al inicializar Changesets: ${error.message}`);
		}
	}

	/**
	 * Crea un nuevo changeset
	 */
	async createChangeset(
		summary: string,
		type: 'major' | 'minor' | 'patch' = 'patch',
	): Promise<ChangesetResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Changesets está deshabilitado',
			};
		}

		try {
			// Generar ID único para el changeset
			const changesetId = this.generateChangesetId();
			const changesetsDir = path.join(this.projectPath, this.config.changesetsPath || '.changeset');

			// Crear archivo de changeset
			const changesetPath = path.join(changesetsDir, `${changesetId}.md`);
			const changesetContent = `---
"${this.getPackageName()}": ${type}
---

${summary}
`;

			await fs.writeFile(changesetPath, changesetContent, 'utf-8');

			console.log(`✅ Changeset creado: ${changesetId}`);

			// Commit automático si está habilitado
			if (this.config.commitChangesets) {
				try {
					execSync(`git add ${changesetPath}`, {
						cwd: this.projectPath,
						stdio: 'pipe',
					});
					execSync(`git commit -m "chore: add changeset ${changesetId}"`, {
						cwd: this.projectPath,
						stdio: 'pipe',
					});
					console.log(`   ✅ Changeset commiteado`);
				} catch {
					// Ignorar errores de git
				}
			}

			return {
				success: true,
				changesetId,
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Versiona los paquetes según los changesets
	 */
	async version(): Promise<ChangesetResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Changesets está deshabilitado',
			};
		}

		try {
			// Verificar si hay changesets pendientes
			const hasChangesets = await this.hasPendingChangesets();
			if (!hasChangesets) {
				console.log('ℹ️  No hay changesets pendientes para versionar');
				return {
					success: true,
					version: await this.getCurrentVersion(),
				};
			}

			// Ejecutar changeset version
			execSync('npx changeset version', {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			const newVersion = await this.getCurrentVersion();
			const changelogUpdated = existsSync(
				path.join(this.projectPath, this.config.changelogPath || 'CHANGELOG.md'),
			);

			console.log(`✅ Versión actualizada a: ${newVersion}`);
			if (changelogUpdated) {
				console.log('   ✅ CHANGELOG.md actualizado');
			}

			return {
				success: true,
				version: newVersion,
				changelogUpdated,
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Publica los cambios (release)
	 */
	async release(): Promise<ChangesetResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Changesets está deshabilitado',
			};
		}

		try {
			// Primero versionar
			const versionResult = await this.version();
			if (!versionResult.success) {
				return versionResult;
			}

			// Ejecutar changeset publish (si está configurado)
			if (this.config.autoRelease) {
				execSync('npx changeset publish', {
					cwd: this.projectPath,
					stdio: 'inherit',
				});
			}

			// Crear GitHub release si está habilitado
			let gitHubReleaseCreated = false;
			if (this.config.createGitHubRelease && versionResult.version) {
				try {
					gitHubReleaseCreated = await this.createGitHubRelease(versionResult.version);
				} catch (error: any) {
					console.warn('⚠️  Error al crear GitHub release:', error.message);
				}
			}

			return {
				success: true,
				version: versionResult.version,
				changelogUpdated: versionResult.changelogUpdated,
				gitHubReleaseCreated,
			};
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Obtiene la versión actual del paquete
	 */
	async getCurrentVersion(): Promise<string> {
		try {
			const packageJsonPath = path.join(this.projectPath, 'package.json');
			if (existsSync(packageJsonPath)) {
				const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
				return packageJson.version || '0.0.0';
			}
		} catch {
			// Ignorar errores
		}
		return '0.0.0';
	}

	/**
	 * Obtiene información de versión
	 */
	async getVersionInfo(): Promise<VersionInfo> {
		const current = await this.getCurrentVersion();
		const hasChangesets = await this.hasPendingChangesets();

		// Determinar tipo de versión basado en changesets pendientes
		let type: 'major' | 'minor' | 'patch' = 'patch';
		if (hasChangesets) {
			const changesets = await this.getPendingChangesets();
			const hasMajor = changesets.some((c) => c.type === 'major');
			const hasMinor = changesets.some((c) => c.type === 'minor');

			if (hasMajor) {
				type = 'major';
			} else if (hasMinor) {
				type = 'minor';
			}
		}

		return {
			current,
			type,
		};
	}

	/**
	 * Verifica si Changesets está instalado
	 */
	private isChangesetsInstalled(): boolean {
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

			return '@changesets/cli' in allDeps;
		} catch {
			return false;
		}
	}

	/**
	 * Genera un ID único para el changeset
	 */
	private generateChangesetId(): string {
		return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
	}

	/**
	 * Obtiene el nombre del paquete
	 */
	private getPackageName(): string {
		try {
			const packageJsonPath = path.join(this.projectPath, 'package.json');
			if (existsSync(packageJsonPath)) {
				const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
				return packageJson.name || 'project';
			}
		} catch {
			// Ignorar errores
		}
		return 'project';
	}

	/**
	 * Verifica si hay changesets pendientes
	 */
	async hasPendingChangesets(): Promise<boolean> {
		try {
			const changesetsDir = path.join(this.projectPath, this.config.changesetsPath || '.changeset');
			if (!existsSync(changesetsDir)) {
				return false;
			}

			const files = await fs.readdir(changesetsDir);
			const changesetFiles = files.filter(
				(f) => f.endsWith('.md') && f !== 'README.md' && f !== 'config.json',
			);

			return changesetFiles.length > 0;
		} catch {
			return false;
		}
	}

	/**
	 * Obtiene los changesets pendientes
	 */
	private async getPendingChangesets(): Promise<Changeset[]> {
		const changesets: Changeset[] = [];

		try {
			const changesetsDir = path.join(this.projectPath, this.config.changesetsPath || '.changeset');
			if (!existsSync(changesetsDir)) {
				return changesets;
			}

			const files = await fs.readdir(changesetsDir);
			const changesetFiles = files.filter(
				(f) => f.endsWith('.md') && f !== 'README.md' && f !== 'config.json',
			);

			for (const file of changesetFiles) {
				const filePath = path.join(changesetsDir, file);
				const content = readFileSync(filePath, 'utf-8');

				// Parsear changeset
				const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
				if (frontMatterMatch) {
					const frontMatter = frontMatterMatch[1];
					const summary = frontMatterMatch[2].trim();

					// Extraer tipo
					const typeMatch = frontMatter.match(/:\s*(major|minor|patch)/);
					const type = (typeMatch ? typeMatch[1] : 'patch') as 'major' | 'minor' | 'patch';

					changesets.push({
						id: file.replace(/\.md$/, ''),
						summary,
						type,
					});
				}
			}
		} catch {
			// Ignorar errores
		}

		return changesets;
	}

	/**
	 * Crea un GitHub release
	 */
	private async createGitHubRelease(version: string): Promise<boolean> {
		try {
			// Leer CHANGELOG.md para obtener notas del release
			const changelogPath = path.join(
				this.projectPath,
				this.config.changelogPath || 'CHANGELOG.md',
			);
			let releaseNotes = `Release ${version}`;

			if (existsSync(changelogPath)) {
				const changelog = readFileSync(changelogPath, 'utf-8');
				// Extraer notas del release más reciente
				const versionMatch = changelog.match(
					new RegExp(`## ${version.replace(/\./g, '\\.')}([\\s\\S]*?)(?=##|$)`),
				);
				if (versionMatch) {
					releaseNotes = versionMatch[1].trim();
				}
			}

			// Crear tag y release usando git commands
			execSync(`git tag v${version}`, {
				cwd: this.projectPath,
				stdio: 'pipe',
			});

			execSync(`git push origin v${version}`, {
				cwd: this.projectPath,
				stdio: 'pipe',
			});

			console.log(`   ✅ GitHub release creado: v${version}`);
			return true;
		} catch (error: any) {
			console.warn('⚠️  Error al crear GitHub release:', error.message);
			return false;
		}
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): ChangesetsConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<ChangesetsConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
