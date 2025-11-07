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
      ...config
    };
    this.projectPath = projectPath;
  }

  /**
   * Inicializa el servicio y verifica la conexión con GitHub
   */
  async initialize(): Promise<void> {
    // Verificar que estamos en un repositorio Git
    if (!this.isGitRepository()) {
      throw new Error('No se encontró un repositorio Git. Ejecuta "git init" primero.');
    }

    // Si hay repositoryUrl, configurar remoto
    if (this.config.repositoryUrl) {
      await this.setupRemote(this.config.repositoryUrl);
    }

    // Cambiar a la rama configurada
    await this.switchBranch(this.config.branch || 'main');
  }

  /**
   * Verifica si estamos en un repositorio Git
   */
  private isGitRepository(): boolean {
    try {
      this.execGit('rev-parse --git-dir', { silent: true });
      return true;
    } catch {
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
    if (!this.config.autoCommit) {
      return;
    }

    // Agregar a la cola
    this.commitQueue.add(filePath);

    // Limpiar timeout anterior
    if (this.commitTimeout) {
      clearTimeout(this.commitTimeout);
    }

    // Crear nuevo timeout para agrupar cambios
    this.commitTimeout = setTimeout(async () => {
      await this.processCommitQueue();
    }, this.config.autoCommitDelay || 5000);
  }

  /**
   * Procesa la cola de commits
   */
  private async processCommitQueue(): Promise<void> {
    if (this.commitQueue.size === 0) {
      return;
    }

    const files = Array.from(this.commitQueue);
    this.commitQueue.clear();

    try {
      // Agregar archivos al staging
      for (const file of files) {
        try {
          this.execGit(`add "${file}"`, { silent: true });
        } catch (error) {
          console.warn(`⚠️  No se pudo agregar ${file}: ${error}`);
        }
      }

      // Crear commit
      const message = this.buildCommitMessage(files);
      this.execGit(`commit -m "${message}"`);

      console.log(`✅ Commit realizado: ${message}`);

      // Push si está configurado
      if (this.config.pushOnCommit) {
        await this.push();
      }
    } catch (error) {
      console.error(`❌ Error al hacer commit: ${error}`);
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
      .map(line => line.trim().replace(/^\*\s*/, ''))
      .filter(line => line.length > 0);
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
    const output = this.execGit(
      `log --pretty=format:"%H|%s|%an|%ad" --date=short -n ${limit}`,
      { silent: true }
    );

    return output
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => {
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
    const lines = output.split('\n').filter(line => line.trim().length > 0);

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
    try {
      const result = execSync(`git ${command}`, {
        cwd: this.projectPath,
        encoding: 'utf-8',
        stdio: options.silent ? 'pipe' : 'inherit'
      });
      return result.toString();
    } catch (error: any) {
      if (!options.silent) {
        throw new Error(`Error ejecutando git ${command}: ${error.message}`);
      }
      throw error;
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

