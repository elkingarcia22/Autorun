/**
 * N8nService
 *
 * Servicio que maneja la integración con n8n:
 * - Verificación de conexión con instancia n8n
 * - Gestión de workflows
 * - Ejecución de workflows
 */

export interface N8nConfig {
	n8nApiUrl?: string;
	n8nApiKey?: string;
	mode?: 'stdio' | 'http';
	logLevel?: 'error' | 'warn' | 'info' | 'debug';
	disableConsoleOutput?: boolean;
}

export interface WorkflowInfo {
	id: string;
	name: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}

export class N8nService {
	private config: N8nConfig;
	private initialized = false;

	constructor(config: N8nConfig) {
		this.config = {
			mode: 'stdio',
			logLevel: 'error',
			disableConsoleOutput: true,
			...config,
		};
	}

	/**
	 * Inicializa el servicio y verifica la conexión con n8n
	 */
	async initialize(): Promise<void> {
		console.log(`🔍 [n8n Service] initialize() llamado`);
		console.log(`🔍 [n8n Service] API URL: ${this.config.n8nApiUrl || 'No configurado'}`);

		// Si hay API URL, verificar conexión
		if (this.config.n8nApiUrl) {
			try {
				await this.verifyConnection();
				console.log(`✅ [n8n Service] Conexión con n8n verificada`);
			} catch (error: any) {
				console.warn(`⚠️ [n8n Service] No se pudo verificar conexión: ${error.message}`);
				// No lanzar error, permitir que el servicio funcione sin verificación
			}
		} else {
			console.log(`ℹ️  [n8n Service] Modo solo documentación (sin API URL)`);
		}

		this.initialized = true;
		console.log(`✅ [n8n Service] Inicialización completada`);
	}

	/**
	 * Verifica la conexión con la instancia de n8n
	 */
	private async verifyConnection(): Promise<void> {
		if (!this.config.n8nApiUrl) {
			throw new Error('N8N_API_URL no está configurado');
		}

		if (!this.config.n8nApiKey) {
			throw new Error('N8N_API_KEY no está configurado');
		}

		// Intentar hacer una petición simple a la API de n8n
		try {
			const response = await fetch(`${this.config.n8nApiUrl}/api/v1/workflows`, {
				method: 'GET',
				headers: {
					'X-N8N-API-KEY': this.config.n8nApiKey,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Error de conexión: ${response.status} ${response.statusText}`);
			}
		} catch (error: any) {
			if (error.message.includes('fetch')) {
				throw new Error(
					`No se pudo conectar a ${this.config.n8nApiUrl}. Verifica que la instancia esté corriendo y accesible.`,
				);
			}
			throw error;
		}
	}

	/**
	 * Obtiene la lista de workflows
	 */
	async getWorkflows(): Promise<WorkflowInfo[]> {
		if (!this.config.n8nApiUrl || !this.config.n8nApiKey) {
			throw new Error('N8N_API_URL y N8N_API_KEY deben estar configurados para obtener workflows');
		}

		try {
			const response = await fetch(`${this.config.n8nApiUrl}/api/v1/workflows`, {
				method: 'GET',
				headers: {
					'X-N8N-API-KEY': this.config.n8nApiKey,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Error al obtener workflows: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			return data.data || [];
		} catch (error: any) {
			throw new Error(`Error al obtener workflows: ${error.message}`);
		}
	}

	/**
	 * Ejecuta un workflow
	 */
	async executeWorkflow(workflowId: string, input?: Record<string, any>): Promise<any> {
		if (!this.config.n8nApiUrl || !this.config.n8nApiKey) {
			throw new Error('N8N_API_URL y N8N_API_KEY deben estar configurados para ejecutar workflows');
		}

		try {
			const response = await fetch(
				`${this.config.n8nApiUrl}/api/v1/workflows/${workflowId}/execute`,
				{
					method: 'POST',
					headers: {
						'X-N8N-API-KEY': this.config.n8nApiKey,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(input || {}),
				},
			);

			if (!response.ok) {
				throw new Error(`Error al ejecutar workflow: ${response.status} ${response.statusText}`);
			}

			return await response.json();
		} catch (error: any) {
			throw new Error(`Error al ejecutar workflow: ${error.message}`);
		}
	}

	/**
	 * Verifica si el servicio está inicializado
	 */
	isInitialized(): boolean {
		return this.initialized;
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): N8nConfig {
		return { ...this.config };
	}
}



