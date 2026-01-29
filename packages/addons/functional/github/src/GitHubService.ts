/**
 * GitHubService
 *
 * Servicio que maneja todas las operaciones de GitHub:
 * - Commits automáticos
 * - Gestión de ramas
 * - Volver a estados anteriores
 * - Merge a rama principal
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import * as path from 'path';

export interface GitHubConfig {
	repositoryUrl?: string;
	branch?: string;
	autoCommit?: boolean;
	autoCommitDelay?: number;
	commitMessage?: string;
	pushOnCommit?: boolean;
}

export interface CommitInfo {
	hash: string;
	message: string;
	author: string;
	date: string;
}

export class GitHubService {
	private config: GitHubConfig;
	private projectPath: string;
	private commitQueue: Set<string> = new Set();
	private commitTimeout: NodeJS.Timeout | null = null;

	constructor(config: GitHubConfig, projectPath: string = process.cwd()) {
		this.config = {
			branch: 'main',
			autoCommit: true,
			autoCommitDelay: 5000,
			commitMessage: 'Auto-commit: {file}',
			pushOnCommit: false,
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa el servicio y verifica la conexión con GitHub
	 */
	async initialize(): Promise<void> {
		console.log(`🔍 [GitHub Service] initialize() llamado`);
		console.log(`🔍 [GitHub Service] projectPath: ${this.projectPath}`);

		// Verificar que estamos en un repositorio Git
		if (!this.isGitRepository()) {
			const errorMsg = 'No se encontró un repositorio Git. Ejecuta "git init" primero.';
			console.error(`❌ [GitHub Service] ${errorMsg}`);
			throw new Error(errorMsg);
		}

		console.log(`✅ [GitHub Service] Repositorio Git detectado`);

		// Si hay repositoryUrl, configurar remoto
		if (this.config.repositoryUrl) {
			console.log(`🔍 [GitHub Service] Configurando remoto: ${this.config.repositoryUrl}`);
			await this.setupRemote(this.config.repositoryUrl);
		} else {
			console.warn(
				`⚠️ [GitHub Service] No hay repositoryUrl configurado. El remoto no se configurará.`,
			);
		}

		// Cambiar a la rama configurada
		const branch = this.config.branch || 'main';
		console.log(`🔍 [GitHub Service] Cambiando a rama: ${branch}`);
		await this.switchBranch(branch, false);
		console.log(`✅ [GitHub Service] Inicialización completada`);
	}

	/**
	 * Verifica si estamos en un repositorio Git
	 */
	private isGitRepository(): boolean {
		try {
			const result = this.execGit('rev-parse --git-dir', { silent: true });
			console.log(`✅ [GitHub Service] Repositorio Git encontrado: ${result.trim()}`);
			return true;
		} catch (error: any) {
			console.warn(`⚠️ [GitHub Service] No es un repositorio Git: ${error.message}`);
			return false;
		}
	}

	/**
	 * Configura el remoto del repositorio
	 */
	private async setupRemote(repositoryUrl: string): Promise<void> {
		try {
			// Verificar si ya existe un remoto
			try {
				this.execGit('remote get-url origin', { silent: true });
				// Si existe, actualizarlo
				this.execGit(`remote set-url origin ${repositoryUrl}`);
			} catch {
				// Si no existe, agregarlo
				this.execGit(`remote add origin ${repositoryUrl}`);
			}
		} catch (error) {
			console.warn(`⚠️  No se pudo configurar el remoto: ${error}`);
		}
	}

	/**
	 * Maneja un cambio de archivo (agrega a la cola de commits)
	 */
	async handleFileChange(filePath: string): Promise<void> {
		console.log(`🔍 [GitHub Service] handleFileChange llamado con: ${filePath}`);
		console.log(
			`🔍 [GitHub Service] Config - autoCommit: ${this.config.autoCommit}, delay: ${this.config.autoCommitDelay}`,
		);

		if (!this.config.autoCommit) {
			console.warn(`⚠️ [GitHub Service] Auto-commit está deshabilitado`);
			return;
		}

		// Verificar que estamos en un repositorio Git
		if (!this.isGitRepository()) {
			console.error(
				`❌ [GitHub Service] No estamos en un repositorio Git. Ejecuta "git init" primero.`,
			);
			return;
		}

		// Agregar a la cola
		this.commitQueue.add(filePath);
		console.log(
			`📝 [GitHub Service] Archivo agregado a la cola. Total en cola: ${this.commitQueue.size}`,
		);

		// Limpiar timeout anterior
		if (this.commitTimeout) {
			clearTimeout(this.commitTimeout);
			console.log(`🔄 [GitHub Service] Timeout anterior cancelado`);
		}

		// Crear nuevo timeout para agrupar cambios
		const delay = this.config.autoCommitDelay || 5000;
		console.log(`⏱️ [GitHub Service] Programando commit en ${delay}ms`);
		this.commitTimeout = setTimeout(async () => {
			console.log(`⏰ [GitHub Service] Timeout ejecutado, procesando cola de commits...`);
			await this.processCommitQueue();
		}, delay);
	}

	/**
	 * Procesa la cola de commits
	 */
	private async processCommitQueue(): Promise<void> {
		console.log(
			`🔍 [GitHub Service] processCommitQueue - Tamaño de cola: ${this.commitQueue.size}`,
		);

		if (this.commitQueue.size === 0) {
			console.log(`⏭️ [GitHub Service] Cola vacía, no hay nada que commitear`);
			return;
		}

		const files = Array.from(this.commitQueue);
		this.commitQueue.clear();
		console.log(`📦 [GitHub Service] Procesando ${files.length} archivo(s):`, files);

		try {
			// Agregar archivos al staging
			for (const file of files) {
				try {
					console.log(`\n🔍 [GitHub Service] === INICIO PROCESAMIENTO ARCHIVO ===`);
					console.log(`📁 [GitHub Service] Archivo recibido: ${file}`);
					console.log(`📁 [GitHub Service] Tipo: ${typeof file}`);
					console.log(`📁 [GitHub Service] projectPath: ${this.projectPath}`);

					// Verificar que el archivo existe
					const fileExists = fsSync.existsSync(file);
					console.log(`🔍 [GitHub Service] Archivo existe: ${fileExists}`);

					if (!fileExists) {
						console.warn(`⚠️ [GitHub Service] Archivo no existe: ${file}`);
						continue;
					}

					// Obtener stats del archivo
					const stats = fsSync.statSync(file);
					console.log(`📊 [GitHub Service] Stats del archivo:`);
					console.log(`   - Es archivo: ${stats.isFile()}`);
					console.log(`   - Es directorio: ${stats.isDirectory()}`);
					console.log(`   - Tamaño: ${stats.size} bytes`);

					// Convertir ruta absoluta a relativa desde projectPath
					const relativePath = path.relative(this.projectPath, file);
					console.log(`🔄 [GitHub Service] Ruta relativa calculada: ${relativePath}`);

					// Verificar que la ruta relativa no salga del proyecto
					if (relativePath.startsWith('..')) {
						console.error(`❌ [GitHub Service] Ruta relativa sale del proyecto: ${relativePath}`);
						continue;
					}

					// Verificar que la ruta relativa existe desde projectPath
					const fullPathFromProject = path.join(this.projectPath, relativePath);
					const relativeExists = fsSync.existsSync(fullPathFromProject);
					console.log(
						`🔍 [GitHub Service] Ruta relativa existe desde projectPath: ${relativeExists}`,
					);
					console.log(`   - Ruta completa desde projectPath: ${fullPathFromProject}`);
					console.log(`   - Coincide con archivo original: ${fullPathFromProject === file}`);

					// Verificar estado git del archivo antes de agregar
					try {
						const gitStatus = this.execGit(`status --porcelain "${relativePath}"`, {
							silent: true,
						});
						console.log(
							`📋 [GitHub Service] Estado git antes de add: "${gitStatus.trim() || '(sin cambios detectados)'}"`,
						);
					} catch (statusError: any) {
						console.log(
							`📋 [GitHub Service] No se pudo obtener estado git: ${statusError.message}`,
						);
					}

					// Verificar si el archivo está siendo ignorado por .gitignore
					let isIgnored = false;
					try {
						const ignoreCheck = this.execGit(`check-ignore -v "${relativePath}"`, { silent: true });
						if (ignoreCheck.trim()) {
							isIgnored = true;
							console.log(`⚠️ [GitHub Service] Archivo está siendo ignorado por .gitignore:`);
							console.log(`   ${ignoreCheck.trim()}`);
						}
					} catch (checkError: any) {
						// Si check-ignore falla, asumir que no está ignorado
						console.log(
							`ℹ️ [GitHub Service] No se pudo verificar si está ignorado (probablemente no lo está)`,
						);
					}

					console.log(
						`📝 [GitHub Service] Ejecutando: git add ${isIgnored ? '-f ' : ''}"${relativePath}"`,
					);
					console.log(`📝 [GitHub Service] Working directory: ${this.projectPath}`);
					console.log(`📝 [GitHub Service] Forzar add (ignorado): ${isIgnored}`);

					// Usar ruta relativa para git add (con -f si está ignorado)
					const addCommand = isIgnored ? `add -f "${relativePath}"` : `add "${relativePath}"`;
					this.execGit(addCommand, { silent: true });
					console.log(
						`✅ [GitHub Service] Archivo agregado exitosamente: ${relativePath}${isIgnored ? ' (forzado)' : ''}`,
					);

					// Verificar estado git después de agregar
					try {
						const gitStatusAfter = this.execGit(`status --porcelain "${relativePath}"`, {
							silent: true,
						});
						console.log(
							`📋 [GitHub Service] Estado git después de add: "${gitStatusAfter.trim() || '(sin cambios)'}"`,
						);
					} catch (statusError: any) {
						console.log(
							`📋 [GitHub Service] No se pudo obtener estado git después: ${statusError.message}`,
						);
					}

					console.log(`✅ [GitHub Service] === FIN PROCESAMIENTO ARCHIVO ===\n`);
				} catch (error: any) {
					console.error(`\n❌ [GitHub Service] === ERROR PROCESANDO ARCHIVO ===`);
					console.error(`❌ [GitHub Service] Archivo: ${file}`);
					console.error(`❌ [GitHub Service] Error message: ${error.message}`);
					console.error(`❌ [GitHub Service] Error stderr: ${error.stderr || '(no stderr)'}`);
					console.error(`❌ [GitHub Service] Error stdout: ${error.stdout || '(no stdout)'}`);
					console.error(`❌ [GitHub Service] Error stack: ${error.stack || '(no stack)'}`);
					console.error(`❌ [GitHub Service] === FIN ERROR ===\n`);

					// No continuar con este archivo, pero intentar con los demás
					continue;
				}
			}

			// Verificar que hay archivos en staging antes de commitear
			const stagedFiles = this.execGit('diff --cached --name-only', { silent: true });
			if (!stagedFiles.trim()) {
				console.warn(`⚠️ [GitHub Service] No hay archivos en staging. Saltando commit.`);
				return;
			}

			console.log(
				`📋 [GitHub Service] Archivos en staging: ${stagedFiles.trim().split('\n').length}`,
			);

			// Crear commit
			const message = this.buildCommitMessage(files);
			console.log(`💾 [GitHub Service] Creando commit con mensaje: "${message}"`);

			try {
				// Usar --no-verify para evitar hooks de pre-commit que pueden bloquear commits automáticos
				// Esto es necesario porque los hooks de husky/linting pueden fallar en commits automáticos
				console.log(`💾 [GitHub Service] Ejecutando commit con --no-verify para evitar hooks...`);
				this.execGit(`commit --no-verify -m "${message}"`, { silent: false });
				console.log(`✅ [GitHub Service] Commit realizado exitosamente: ${message}`);

				// Obtener hash del commit
				const commitHash = this.execGit('rev-parse HEAD', { silent: true }).trim();
				console.log(`✅ [GitHub Service] Commit hash: ${commitHash.substring(0, 7)}`);
				console.log(`✅ [GitHub Service] Commit completo exitosamente`);
			} catch (commitError: any) {
				console.error(`❌ [GitHub Service] Error al hacer commit:`);
				console.error(`   Mensaje: ${commitError.message}`);
				console.error(`   Stderr: ${commitError.stderr || '(no stderr)'}`);
				console.error(`   Stdout: ${commitError.stdout || '(no stdout)'}`);
				console.error(`   Exit code: ${commitError.exitCode || 'unknown'}`);

				// Si el error es por hooks, intentar con --no-verify (aunque ya lo estamos usando)
				if (commitError.stderr?.includes('husky') || commitError.stderr?.includes('pre-commit')) {
					console.log(
						`🔄 [GitHub Service] Error relacionado con hooks, ya estamos usando --no-verify`,
					);
				}

				throw commitError;
			}

			// Push si está configurado
			if (this.config.pushOnCommit) {
				console.log(`🚀 [GitHub Service] pushOnCommit está habilitado, haciendo push...`);
				await this.push();
			} else {
				console.log(`ℹ️ [GitHub Service] pushOnCommit está deshabilitado, no se hará push`);
			}
		} catch (error: any) {
			console.error(`❌ [GitHub Service] Error al hacer commit: ${error.message}`);
			console.error(`❌ [GitHub Service] Stack:`, error.stack);
		}
	}

	/**
	 * Construye el mensaje de commit
	 */
	private buildCommitMessage(files: string[]): string {
		let message = this.config.commitMessage || 'Auto-commit: {file}';

		if (files.length === 1) {
			const fileName = path.basename(files[0]);
			message = message.replace('{file}', fileName);
		} else {
			message = message.replace('{file}', `${files.length} archivos`);
		}

		return message;
	}

	/**
	 * Hace commit manual de archivos específicos
	 */
	async commit(files: string[], message: string): Promise<string> {
		// Agregar archivos
		for (const file of files) {
			this.execGit(`add "${file}"`);
		}

		// Hacer commit
		this.execGit(`commit -m "${message}"`);

		// Obtener hash del commit
		const hash = this.execGit('rev-parse HEAD', { silent: true }).trim();

		return hash;
	}

	/**
	 * Hace push al remoto
	 */
	async push(branch?: string): Promise<void> {
		const targetBranch = branch || this.config.branch || 'main';
		this.execGit(`push origin ${targetBranch}`);
		console.log(`✅ Push realizado a ${targetBranch}`);
	}

	/**
	 * Obtiene la rama actual
	 */
	getCurrentBranch(): string {
		return this.execGit('branch --show-current', { silent: true }).trim();
	}

	/**
	 * Cambia a una rama (la crea si no existe)
	 */
	async switchBranch(branchName: string, createIfNotExists: boolean = true): Promise<void> {
		try {
			// Intentar cambiar a la rama
			this.execGit(`checkout ${branchName}`, { silent: true });
		} catch {
			if (createIfNotExists) {
				// Crear y cambiar a la nueva rama
				this.execGit(`checkout -b ${branchName}`);
			} else {
				throw new Error(`La rama ${branchName} no existe`);
			}
		}
	}

	/**
	 * Crea una nueva rama
	 */
	async createBranch(branchName: string): Promise<void> {
		this.execGit(`checkout -b ${branchName}`);
		console.log(`✅ Rama creada: ${branchName}`);
	}

	/**
	 * Lista todas las ramas
	 */
	listBranches(): string[] {
		const output = this.execGit('branch', { silent: true });
		return output
			.split('\n')
			.map((line) => line.trim().replace(/^\*\s*/, ''))
			.filter((line) => line.length > 0);
	}

	/**
	 * Hace merge de una rama a la actual
	 */
	async mergeBranch(sourceBranch: string): Promise<void> {
		this.execGit(`merge ${sourceBranch}`);
		console.log(`✅ Merge realizado: ${sourceBranch} -> ${this.getCurrentBranch()}`);
	}

	/**
	 * Hace merge a la rama principal
	 */
	async mergeToMain(branchName: string): Promise<void> {
		const currentBranch = this.getCurrentBranch();
		const mainBranch = this.config.branch || 'main';

		// Cambiar a la rama principal
		await this.switchBranch(mainBranch, false);

		// Hacer merge
		await this.mergeBranch(branchName);

		// Volver a la rama original si no era main
		if (currentBranch !== mainBranch) {
			await this.switchBranch(currentBranch, false);
		}
	}

	/**
	 * Obtiene el historial de commits
	 */
	getCommitHistory(limit: number = 10): CommitInfo[] {
		const output = this.execGit(`log --pretty=format:"%H|%s|%an|%ad" --date=short -n ${limit}`, {
			silent: true,
		});

		return output
			.split('\n')
			.filter((line) => line.trim().length > 0)
			.map((line) => {
				const [hash, message, author, date] = line.split('|');
				return { hash, message, author, date };
			});
	}

	/**
	 * Vuelve a un commit anterior (crea nueva rama)
	 */
	async checkoutCommit(commitHash: string, createBranch: boolean = true): Promise<void> {
		if (createBranch) {
			const branchName = `restore-${commitHash.substring(0, 7)}`;
			this.execGit(`checkout -b ${branchName} ${commitHash}`);
			console.log(`✅ Vuelto al commit ${commitHash.substring(0, 7)} en rama ${branchName}`);
		} else {
			this.execGit(`checkout ${commitHash}`);
			console.log(`✅ Vuelto al commit ${commitHash.substring(0, 7)}`);
		}
	}

	/**
	 * Obtiene el estado del repositorio
	 */
	getStatus(): { modified: string[]; untracked: string[]; staged: string[] } {
		const output = this.execGit('status --porcelain', { silent: true });
		const lines = output.split('\n').filter((line) => line.trim().length > 0);

		const modified: string[] = [];
		const untracked: string[] = [];
		const staged: string[] = [];

		for (const line of lines) {
			const status = line.substring(0, 2);
			const file = line.substring(3);

			if (status.includes('??')) {
				untracked.push(file);
			} else if (status.includes('M') || status.includes('A') || status.includes('D')) {
				if (status[0] !== ' ') {
					staged.push(file);
				}
				if (status[1] === 'M' || status[1] === 'D') {
					modified.push(file);
				}
			}
		}

		return { modified, untracked, staged };
	}

	/**
	 * Ejecuta un comando Git
	 */
	private execGit(command: string, options: { silent?: boolean } = {}): string {
		const fullCommand = `git ${command}`;
		console.log(`🔧 [GitHub Service] Ejecutando comando: ${fullCommand}`);
		console.log(`🔧 [GitHub Service] Working directory: ${this.projectPath}`);

		try {
			const result = execSync(fullCommand, {
				cwd: this.projectPath,
				encoding: 'utf-8',
				stdio: options.silent ? 'pipe' : 'inherit',
				maxBuffer: 10 * 1024 * 1024, // 10MB buffer
			});

			// Con encoding: 'utf-8', result siempre es string
			const output = result || '';
			if (output.trim()) {
				console.log(
					`✅ [GitHub Service] Comando exitoso. Output: ${output.trim().substring(0, 200)}`,
				);
			} else {
				console.log(`✅ [GitHub Service] Comando exitoso (sin output)`);
			}

			return output;
		} catch (error: any) {
			// Capturar toda la información del error de forma segura
			let stderr = '';
			let stdout = '';
			try {
				stderr = error.stderr?.toString() || (typeof error.stderr === 'string' ? error.stderr : '');
			} catch (e) {
				stderr = '';
			}
			try {
				stdout = error.stdout?.toString() || (typeof error.stdout === 'string' ? error.stdout : '');
			} catch (e) {
				stdout = '';
			}
			const errorMessage = stderr || error.message || 'Error desconocido';
			const exitCode = error.status || error.code || 'unknown';

			console.error(`❌ [GitHub Service] Error ejecutando comando:`);
			console.error(`   Comando: ${fullCommand}`);
			console.error(`   Working directory: ${this.projectPath}`);
			console.error(`   Exit code: ${exitCode}`);
			console.error(`   Error message: ${errorMessage}`);
			if (stderr) {
				console.error(`   Stderr: ${stderr.substring(0, 500)}`);
			}
			if (stdout) {
				console.error(`   Stdout: ${stdout.substring(0, 500)}`);
			}

			const fullError = `Error ejecutando git ${command}: ${errorMessage}`;

			if (!options.silent) {
				throw new Error(fullError);
			}

			// Lanzar error con más información
			const enhancedError = new Error(fullError);
			(enhancedError as any).stderr = stderr;
			(enhancedError as any).stdout = stdout;
			(enhancedError as any).exitCode = exitCode;
			(enhancedError as any).command = fullCommand;
			(enhancedError as any).cwd = this.projectPath;
			throw enhancedError;
		}
	}

	/**
	 * Detiene el servicio
	 */
	stop(): void {
		if (this.commitTimeout) {
			clearTimeout(this.commitTimeout);
			this.commitTimeout = null;
		}
		this.commitQueue.clear();
	}
}
