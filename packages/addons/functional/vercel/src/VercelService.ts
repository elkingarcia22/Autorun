/**
 * VercelService
 *
 * Servicio que maneja todas las operaciones de Vercel:
 * - Deploy automático
 * - Gestión de proyectos
 * - Configuración de dominios
 * - Preview deployments
 * - Integración con GitHub
 */

export interface VercelConfig {
	token: string;
	teamId?: string;
	autoDeploy?: boolean;
	projectName?: string;
	framework?: string;
	buildCommand?: string;
	outputDirectory?: string;
	installCommand?: string;
}

export interface VercelProject {
	id: string;
	name: string;
	accountId: string;
	updatedAt: number;
	createdAt: number;
	target?: string;
	alias?: string[];
	latestDeployments?: VercelDeployment[];
}

export interface VercelDeployment {
	uid: string;
	name: string;
	url: string;
	state: 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED';
	type: 'LAMBDAS';
	created: number;
	createdAt: number;
	buildingAt?: number;
	readyAt?: number;
	target?: string;
	alias?: string[];
	projectId: string;
	projectSettings?: {
		framework?: string;
		buildCommand?: string;
		outputDirectory?: string;
		installCommand?: string;
	};
}

export interface VercelDomain {
	name: string;
	apexName: string;
	projectId: string;
	redirect?: string;
	redirectStatusCode?: number;
	gitBranch?: string;
	updatedAt?: number;
	createdAt?: number;
}

export class VercelService {
	private config: VercelConfig;
	private apiBaseUrl = 'https://api.vercel.com';
	private initialized = false;

	constructor(config: VercelConfig) {
		this.config = {
			autoDeploy: false,
			...config,
		};
	}

	/**
	 * Inicializa el servicio y verifica la conexión con Vercel
	 */
	async initialize(): Promise<void> {
		if (!this.config.token) {
			throw new Error('Vercel token es requerido');
		}

		try {
			// Verificar que el token es válido haciendo una llamada a la API
			await this.getUser();
			this.initialized = true;
			console.log('✅ Vercel Service: Inicializado correctamente');
		} catch (error) {
			throw new Error(`Error al inicializar Vercel: ${error}`);
		}
	}

	/**
	 * Obtiene información del usuario actual
	 */
	async getUser(): Promise<any> {
		return await this.apiRequest('GET', '/v2/user');
	}

	/**
	 * Lista todos los proyectos
	 */
	async listProjects(): Promise<VercelProject[]> {
		const response = await this.apiRequest('GET', '/v9/projects', {
			teamId: this.config.teamId,
		});
		return response.projects || [];
	}

	/**
	 * Obtiene un proyecto por nombre
	 */
	async getProject(projectName: string): Promise<VercelProject | null> {
		try {
			const projects = await this.listProjects();
			return projects.find((p) => p.name === projectName) || null;
		} catch (error) {
			console.error(`Error al obtener proyecto ${projectName}:`, error);
			return null;
		}
	}

	/**
	 * Crea un nuevo proyecto
	 */
	async createProject(
		projectName: string,
		options?: {
			framework?: string;
			buildCommand?: string;
			outputDirectory?: string;
			installCommand?: string;
			gitRepository?: {
				type: 'github' | 'gitlab' | 'bitbucket';
				repo: string;
			};
		},
	): Promise<VercelProject> {
		const projectData: any = {
			name: projectName,
			framework: options?.framework || this.config.framework,
			buildCommand: options?.buildCommand || this.config.buildCommand,
			outputDirectory: options?.outputDirectory || this.config.outputDirectory,
			installCommand: options?.installCommand || this.config.installCommand,
		};

		if (options?.gitRepository) {
			projectData.gitRepository = options.gitRepository;
		}

		const response = await this.apiRequest('POST', '/v9/projects', projectData, {
			teamId: this.config.teamId,
		});

		return response;
	}

	/**
	 * Hace deploy de un proyecto
	 */
	async deploy(options?: {
		projectName?: string;
		files?: Record<string, string>;
		target?: 'production' | 'staging';
	}): Promise<VercelDeployment> {
		const projectName = options?.projectName || this.config.projectName;

		if (!projectName) {
			throw new Error('Project name es requerido para deploy');
		}

		// Obtener o crear proyecto
		let project = await this.getProject(projectName);

		if (!project) {
			console.log(`📦 Proyecto ${projectName} no existe, creándolo...`);
			project = await this.createProject(projectName);
		}

		// Si hay archivos, hacer deploy con archivos
		if (options?.files) {
			return await this.deployWithFiles(project.id, options.files, options.target);
		}

		// Si no hay archivos, hacer deploy desde Git
		return await this.deployFromGit(project.id, options?.target);
	}

	/**
	 * Hace deploy con archivos específicos
	 */
	private async deployWithFiles(
		projectId: string,
		files: Record<string, string>,
		target: 'production' | 'staging' = 'production',
	): Promise<VercelDeployment> {
		// Preparar archivos para el deploy
		const fileEntries = Object.entries(files).map(([path, content]) => ({
			file: path,
			data: content,
		}));

		const response = await this.apiRequest(
			'POST',
			`/v13/deployments`,
			{
				name: projectId,
				files: fileEntries,
				target: target || 'production',
				projectSettings: {
					framework: this.config.framework,
					buildCommand: this.config.buildCommand,
					outputDirectory: this.config.outputDirectory,
					installCommand: this.config.installCommand,
				},
			},
			{
				teamId: this.config.teamId,
			},
		);

		return response;
	}

	/**
	 * Hace deploy desde Git
	 */
	private async deployFromGit(
		projectId: string,
		target: 'production' | 'staging' = 'production',
	): Promise<VercelDeployment> {
		const response = await this.apiRequest(
			'POST',
			`/v13/deployments`,
			{
				name: projectId,
				target: target || 'production',
			},
			{
				teamId: this.config.teamId,
			},
		);

		return response;
	}

	/**
	 * Obtiene los deployments de un proyecto
	 */
	async listDeployments(projectId: string, limit: number = 10): Promise<VercelDeployment[]> {
		const response = await this.apiRequest('GET', '/v6/deployments', {
			projectId,
			limit,
			teamId: this.config.teamId,
		});

		return response.deployments || [];
	}

	/**
	 * Obtiene información de un deployment específico
	 */
	async getDeployment(deploymentId: string): Promise<VercelDeployment> {
		return await this.apiRequest('GET', `/v13/deployments/${deploymentId}`, undefined, {
			teamId: this.config.teamId,
		});
	}

	/**
	 * Lista los dominios de un proyecto
	 */
	async listDomains(projectId: string): Promise<VercelDomain[]> {
		const response = await this.apiRequest('GET', `/v9/projects/${projectId}/domains`, undefined, {
			teamId: this.config.teamId,
		});

		return response.domains || [];
	}

	/**
	 * Agrega un dominio a un proyecto
	 */
	async addDomain(projectId: string, domain: string, gitBranch?: string): Promise<VercelDomain> {
		return await this.apiRequest(
			'POST',
			`/v9/projects/${projectId}/domains`,
			{
				name: domain,
				gitBranch,
			},
			{
				teamId: this.config.teamId,
			},
		);
	}

	/**
	 * Elimina un dominio de un proyecto
	 */
	async removeDomain(projectId: string, domain: string): Promise<void> {
		await this.apiRequest(
			'DELETE',
			`/v9/projects/${this.config.projectName}/domains/${domain}`,
			undefined,
			{
				teamId: this.config.teamId,
			},
		);
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		hasToken: boolean;
		hasProject: boolean;
		projectName?: string;
	} {
		return {
			initialized: this.initialized,
			hasToken: !!this.config.token,
			hasProject: !!this.config.projectName,
			projectName: this.config.projectName,
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): VercelConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<VercelConfig>): void {
		this.config = { ...this.config, ...config };
	}

	/**
	 * Hace una petición a la API de Vercel
	 */
	private async apiRequest(
		method: string,
		endpoint: string,
		body?: any,
		queryParams?: Record<string, string | undefined>,
	): Promise<any> {
		const url = new URL(`${this.apiBaseUrl}${endpoint}`);

		// Agregar query params
		if (queryParams) {
			Object.entries(queryParams).forEach(([key, value]) => {
				if (value !== undefined) {
					url.searchParams.append(key, value);
				}
			});
		}

		const headers: Record<string, string> = {
			Authorization: `Bearer ${this.config.token}`,
			'Content-Type': 'application/json',
		};

		const options: RequestInit = {
			method,
			headers,
		};

		if (body && method !== 'GET') {
			options.body = JSON.stringify(body);
		}

		try {
			const response = await fetch(url.toString(), options);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Vercel API Error: ${response.status} ${response.statusText} - ${errorText}`,
				);
			}

			return await response.json();
		} catch (error) {
			console.error(`Error en petición a Vercel API:`, error);
			throw error;
		}
	}
}
