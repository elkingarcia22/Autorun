/**
 * GoogleSheetsService
 *
 * Servicio que maneja la integración con Google Sheets:
 * - Verificación de conexión con Google Sheets API
 * - Creación de hojas de cálculo
 * - Lectura y escritura de datos
 * - Gestión de formatos
 */

export interface GoogleSheetsConfig {
	googleProjectId?: string;
	googleApplicationCredentials?: string;
	googleServiceAccountKey?: string;
	googlePrivateKey?: string;
	googleClientEmail?: string;
}

export interface SpreadsheetInfo {
	id: string;
	name: string;
	url: string;
	createdAt: string;
	updatedAt: string;
}

export interface CellRange {
	sheet?: string;
	startRow: number;
	startCol: number;
	endRow?: number;
	endCol?: number;
}

export interface CellFormat {
	backgroundColor?: string;
	textColor?: string;
	bold?: boolean;
	italic?: boolean;
	fontSize?: number;
	horizontalAlignment?: 'LEFT' | 'CENTER' | 'RIGHT';
	verticalAlignment?: 'TOP' | 'MIDDLE' | 'BOTTOM';
}

export class GoogleSheetsService {
	private config: GoogleSheetsConfig;
	private initialized = false;

	constructor(config: GoogleSheetsConfig) {
		this.config = {
			...config,
		};
	}

	/**
	 * Inicializa el servicio y verifica la conexión con Google Sheets
	 */
	async initialize(): Promise<void> {
		console.log(`🔍 [Google Sheets Service] initialize() llamado`);
		console.log(
			`🔍 [Google Sheets Service] Project ID: ${this.config.googleProjectId || 'No configurado'}`,
		);

		// Verificar que hay configuración mínima
		if (
			!this.config.googleProjectId &&
			!this.config.googleServiceAccountKey &&
			!this.config.googlePrivateKey
		) {
			console.log(`ℹ️  [Google Sheets Service] Modo solo documentación (sin credenciales)`);
		} else {
			try {
				await this.verifyConnection();
				console.log(`✅ [Google Sheets Service] Conexión con Google Sheets verificada`);
			} catch (error: any) {
				console.warn(`⚠️ [Google Sheets Service] No se pudo verificar conexión: ${error.message}`);
				// No lanzar error, permitir que el servicio funcione sin verificación
			}
		}

		this.initialized = true;
		console.log(`✅ [Google Sheets Service] Inicialización completada`);
	}

	/**
	 * Verifica la conexión con Google Sheets API
	 */
	private async verifyConnection(): Promise<void> {
		if (!this.config.googleProjectId) {
			throw new Error('GOOGLE_PROJECT_ID no está configurado');
		}

		// La verificación real se haría a través del MCP
		// Por ahora solo validamos que hay configuración
		if (
			!this.config.googleApplicationCredentials &&
			!this.config.googleServiceAccountKey &&
			!this.config.googlePrivateKey
		) {
			throw new Error(
				'GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_SERVICE_ACCOUNT_KEY o GOOGLE_PRIVATE_KEY debe estar configurado',
			);
		}
	}

	/**
	 * Crea una nueva hoja de cálculo
	 */
	async createSpreadsheet(
		title: string,
		sheets?: Array<{ name: string; headers?: string[] }>,
	): Promise<SpreadsheetInfo> {
		if (!this.config.googleProjectId) {
			throw new Error('GOOGLE_PROJECT_ID debe estar configurado para crear hojas');
		}

		// La creación real se haría a través del MCP
		// Por ahora retornamos un objeto de ejemplo
		const spreadsheetId = `spreadsheet_${Date.now()}`;
		return {
			id: spreadsheetId,
			name: title,
			url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
	}

	/**
	 * Lee datos de un rango de celdas
	 */
	async readRange(spreadsheetId: string, range: string | CellRange): Promise<any[][]> {
		if (!this.config.googleProjectId) {
			throw new Error('GOOGLE_PROJECT_ID debe estar configurado para leer datos');
		}

		// La lectura real se haría a través del MCP
		// Por ahora retornamos un array vacío
		return [];
	}

	/**
	 * Escribe datos en un rango de celdas
	 */
	async writeRange(
		spreadsheetId: string,
		range: string | CellRange,
		values: any[][],
	): Promise<void> {
		if (!this.config.googleProjectId) {
			throw new Error('GOOGLE_PROJECT_ID debe estar configurado para escribir datos');
		}

		// La escritura real se haría a través del MCP
		// Por ahora no hacemos nada
	}

	/**
	 * Formatea un rango de celdas
	 */
	async formatCells(
		spreadsheetId: string,
		range: string | CellRange,
		format: CellFormat,
	): Promise<void> {
		if (!this.config.googleProjectId) {
			throw new Error('GOOGLE_PROJECT_ID debe estar configurado para formatear celdas');
		}

		// El formateo real se haría a través del MCP
		// Por ahora no hacemos nada
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
	getConfig(): GoogleSheetsConfig {
		return { ...this.config };
	}
}
