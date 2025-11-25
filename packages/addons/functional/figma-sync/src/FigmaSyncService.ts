/**
 * FigmaSyncService
 *
 * Servicio que maneja todas las operaciones de sincronización con Figma:
 * - Sincronización de tokens
 * - Comparación de tokens
 * - Actualización automática
 * - Generación de reportes
 */

import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface FigmaSyncConfig {
	figmaTokensPath?: string;
	projectTokensPath?: string;
	figmaTokensJsonPath?: string; // Ruta al JSON de tokens exportado desde Figma Tokens plugin
	autoSync?: boolean;
	backupBeforeSync?: boolean;
	syncMode?: 'full' | 'selective' | 'manual';
	tokenMapping?: Record<string, string>;
	accessToken?: string; // Token de acceso de Figma API (opcional, para MCP)
	fileKey?: string; // File key de Figma (opcional, para MCP)
}

export interface TokenComparison {
	synced: Array<{ figmaKey: string; projectKey: string; value: string }>;
	different: Array<{
		figmaKey: string;
		projectKey: string;
		figmaValue: string;
		projectValue: string;
	}>;
	missing: Array<{ figmaKey: string; figmaValue: string }>;
	extra: Array<{ projectKey: string; projectValue: string }>;
}

export interface SyncResult {
	success: boolean;
	tokensUpdated: number;
	tokensAdded: number;
	tokensRemoved: number;
	comparison: TokenComparison;
	reportPath?: string;
}

export class FigmaSyncService {
	private config: FigmaSyncConfig;
	private projectPath: string;
	private initialized = false;

	constructor(config: FigmaSyncConfig, projectPath: string = process.cwd()) {
		this.config = {
			figmaTokensPath: path.join(projectPath, '../tokens'),
			projectTokensPath: path.join(projectPath, 'packages/tokens/tokens.json'),
			autoSync: false,
			backupBeforeSync: true,
			syncMode: 'selective',
			tokenMapping: {},
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa el servicio
	 */
	async initialize(): Promise<void> {
		// Verificar que existan las rutas
		if (this.config.figmaTokensPath && !existsSync(this.config.figmaTokensPath)) {
			console.warn(`⚠️  Ruta de tokens de Figma no encontrada: ${this.config.figmaTokensPath}`);
		}

		if (this.config.projectTokensPath && !existsSync(this.config.projectTokensPath)) {
			console.warn(
				`⚠️  Ruta de tokens del proyecto no encontrada: ${this.config.projectTokensPath}`,
			);
		}

		this.initialized = true;
		console.log('✅ Figma Sync Service: Inicializado correctamente');
	}

	/**
	 * Compara tokens de Figma con tokens del proyecto
	 */
	async compare(): Promise<TokenComparison> {
		if (!this.initialized) {
			await this.initialize();
		}

		const figmaTokens = await this.loadFigmaTokens();
		const projectTokens = await this.loadProjectTokens();

		return this.compareTokens(figmaTokens, projectTokens);
	}

	/**
	 * Sincroniza tokens de Figma al proyecto
	 */
	async sync(options?: {
		mode?: 'full' | 'selective' | 'manual';
		updateDifferent?: boolean;
		addMissing?: boolean;
		removeExtra?: boolean;
	}): Promise<SyncResult> {
		if (!this.initialized) {
			await this.initialize();
		}

		const mode = options?.mode || this.config.syncMode || 'selective';
		const updateDifferent = options?.updateDifferent !== false;
		const addMissing = options?.addMissing !== false;
		const removeExtra = options?.removeExtra || false;

		// Hacer backup si está configurado
		if (this.config.backupBeforeSync) {
			await this.backupProjectTokens();
		}

		// Comparar tokens
		const comparison = await this.compare();

		// Cargar tokens del proyecto
		const projectTokens = await this.loadProjectTokens();
		const figmaTokens = await this.loadFigmaTokens();

		let tokensUpdated = 0;
		let tokensAdded = 0;
		let tokensRemoved = 0;

		// Actualizar tokens diferentes
		if (updateDifferent && mode !== 'manual') {
			for (const diff of comparison.different) {
				const projectKey = this.mapFigmaToProjectKey(diff.figmaKey);
				if (projectKey && this.shouldUpdate(projectKey, mode)) {
					this.setNestedValue(projectTokens, projectKey, diff.figmaValue);
					tokensUpdated++;
				}
			}
		}

		// Agregar tokens faltantes
		if (addMissing && mode !== 'manual') {
			for (const missing of comparison.missing) {
				const projectKey = this.mapFigmaToProjectKey(missing.figmaKey);
				if (projectKey && this.shouldUpdate(projectKey, mode)) {
					this.setNestedValue(projectTokens, projectKey, missing.figmaValue);
					tokensAdded++;
				}
			}
		}

		// Remover tokens extra (solo en modo full)
		if (removeExtra && mode === 'full') {
			for (const extra of comparison.extra) {
				const keys = extra.projectKey.split('.');
				let current: any = projectTokens;
				for (let i = 0; i < keys.length - 1; i++) {
					current = current[keys[i]];
				}
				if (current && typeof current === 'object') {
					delete current[keys[keys.length - 1]];
					tokensRemoved++;
				}
			}
		}

		// Guardar tokens actualizados
		if (tokensUpdated > 0 || tokensAdded > 0 || tokensRemoved > 0) {
			await this.saveProjectTokens(projectTokens);
		}

		// Generar reporte
		const reportPath = await this.generateReport(comparison, {
			tokensUpdated,
			tokensAdded,
			tokensRemoved,
		});

		return {
			success: true,
			tokensUpdated,
			tokensAdded,
			tokensRemoved,
			comparison,
			reportPath,
		};
	}

	/**
	 * Carga tokens de Figma
	 * Prioriza el JSON de tokens exportado desde Figma Tokens plugin si está disponible
	 */
	private async loadFigmaTokens(): Promise<Record<string, any>> {
		// PRIMERO: Intentar cargar desde el JSON de tokens de Figma (si está disponible)
		// Este es el método preferido porque contiene todas las variables de Figma
		if (this.config.figmaTokensJsonPath && existsSync(this.config.figmaTokensJsonPath)) {
			try {
				const content = await fs.readFile(this.config.figmaTokensJsonPath, 'utf-8');
				const tokens = JSON.parse(content);
				console.log(
					`✅ Figma Sync: Cargando tokens desde JSON (${this.config.figmaTokensJsonPath})`,
				);
				return tokens;
			} catch (error) {
				console.warn(`⚠️  Error al leer JSON de tokens de Figma:`, error);
			}
		}

		// SEGUNDO: Buscar automáticamente el JSON en ubicaciones comunes
		const possibleJsonPaths = [
			path.join(this.projectPath, 'figma-tokens.json'),
			path.join(this.projectPath, 'tokens', 'figma-tokens.json'),
			path.join(this.projectPath, 'tokens', 'figma.json'),
			path.join(this.projectPath, 'figma', 'variables.json'),
			path.join(this.projectPath, '.figma', 'tokens.json'),
			path.join(this.projectPath, 'design-tokens', 'figma-tokens.json'),
			path.join(this.projectPath, 'packages', 'tokens', 'figma-tokens.json'),
		];

		for (const jsonPath of possibleJsonPaths) {
			if (existsSync(jsonPath)) {
				try {
					const content = await fs.readFile(jsonPath, 'utf-8');
					const tokens = JSON.parse(content);
					console.log(`✅ Figma Sync: JSON de tokens encontrado automáticamente en ${jsonPath}`);
					// Guardar la ruta encontrada para futuras referencias
					this.config.figmaTokensJsonPath = jsonPath;
					return tokens;
				} catch (error) {
					console.warn(`⚠️  Error al leer JSON de tokens desde ${jsonPath}:`, error);
				}
			}
		}

		// TERCERO: Si no hay JSON, intentar cargar desde la estructura de directorios tradicional
		if (!this.config.figmaTokensPath) {
			console.warn('⚠️  Figma Sync: No se encontró JSON de tokens ni ruta de tokens configurada');
			console.warn('ℹ️  Se recomienda descargar el JSON usando el plugin de Figma Tokens');
			return {};
		}

		const possiblePaths = [
			path.join(this.config.figmaTokensPath, 's-colors/Light Mode.json'),
			path.join(this.config.figmaTokensPath, 'p-colors/Mode 1.json'),
			path.join(this.config.figmaTokensPath, 'tokens.json'),
			this.config.figmaTokensPath,
		];

		for (const tokenPath of possiblePaths) {
			if (existsSync(tokenPath)) {
				try {
					const content = await fs.readFile(tokenPath, 'utf-8');
					return JSON.parse(content);
				} catch (error) {
					console.warn(`Error al leer ${tokenPath}:`, error);
				}
			}
		}

		console.warn('⚠️  Figma Sync: No se pudieron cargar tokens de Figma');
		console.warn('ℹ️  Para mejor funcionamiento, descarga el JSON usando el plugin de Figma Tokens');
		return {};
	}

	/**
	 * Carga tokens del proyecto
	 */
	private async loadProjectTokens(): Promise<Record<string, any>> {
		if (!this.config.projectTokensPath) {
			throw new Error('Ruta de tokens del proyecto no configurada');
		}

		if (!existsSync(this.config.projectTokensPath)) {
			return { light: {}, dark: {} };
		}

		const content = await fs.readFile(this.config.projectTokensPath, 'utf-8');
		return JSON.parse(content);
	}

	/**
	 * Compara tokens de Figma con tokens del proyecto
	 */
	private compareTokens(
		figmaTokens: Record<string, any>,
		projectTokens: Record<string, any>,
	): TokenComparison {
		const figmaFlat = this.flattenTokens(figmaTokens, 'figma');
		const projectFlat = this.flattenTokens(projectTokens, 'project');

		const synced: TokenComparison['synced'] = [];
		const different: TokenComparison['different'] = [];
		const missing: TokenComparison['missing'] = [];
		const extra: TokenComparison['extra'] = [];

		// Comparar tokens de Figma con proyecto
		for (const [figmaKey, figmaValue] of Object.entries(figmaFlat)) {
			const projectKey = this.mapFigmaToProjectKey(figmaKey);

			if (projectKey && projectKey in projectFlat) {
				const projectValue = projectFlat[projectKey];
				if (this.normalizeValue(figmaValue) === this.normalizeValue(projectValue)) {
					synced.push({ figmaKey, projectKey, value: String(figmaValue) });
				} else {
					different.push({
						figmaKey,
						projectKey,
						figmaValue: String(figmaValue),
						projectValue: String(projectValue),
					});
				}
			} else if (projectKey) {
				missing.push({ figmaKey, figmaValue: String(figmaValue) });
			}
		}

		// Encontrar tokens extra en el proyecto
		for (const [projectKey, projectValue] of Object.entries(projectFlat)) {
			const figmaKey = this.mapProjectToFigmaKey(projectKey);
			if (!figmaKey || !(figmaKey in figmaFlat)) {
				extra.push({ projectKey, projectValue: String(projectValue) });
			}
		}

		return { synced, different, missing, extra };
	}

	/**
	 * Aplana tokens anidados
	 */
	private flattenTokens(tokens: Record<string, any>, prefix: string = ''): Record<string, any> {
		const result: Record<string, any> = {};

		function flatten(obj: any, keyPrefix: string = '') {
			for (const [key, value] of Object.entries(obj)) {
				const newKey = keyPrefix ? `${keyPrefix}.${key}` : key;

				if (value && typeof value === 'object' && !Array.isArray(value)) {
					if ('$value' in value) {
						const finalValue = (value as any).$value;
						if (
							typeof finalValue === 'string' &&
							(finalValue.startsWith('#') || finalValue.match(/^\d+$/))
						) {
							result[newKey] = finalValue;
						}
					} else {
						flatten(value, newKey);
					}
				} else {
					if (typeof value === 'string' && (value.startsWith('#') || value.match(/^\d+$/))) {
						result[newKey] = value;
					}
				}
			}
		}

		flatten(tokens, prefix);
		return result;
	}

	/**
	 * Mapea una clave de Figma a una clave del proyecto
	 */
	private mapFigmaToProjectKey(figmaKey: string): string | null {
		// Usar mapeo personalizado si existe
		if (this.config.tokenMapping && figmaKey in this.config.tokenMapping) {
			return this.config.tokenMapping[figmaKey];
		}

		// Mapeo por defecto
		const mapping: Record<string, string> = {
			'figma.light.color.accent.brand': 'light.brand.accent-brand',
			'figma.dark.color.accent.brand': 'dark.brand.accent-brand',
			'figma.light.color.fg.1.high': 'light.foreground.fg-1-high',
			'figma.light.color.fg.1.medium': 'light.foreground.fg-1-medium',
			'figma.light.color.bg.1': 'light.background.bg-1',
			'figma.light.color.bg.2': 'light.background.bg-2',
			'figma.light.color.border.1': 'light.borders.border-1',
		};

		// Buscar mapeo parcial
		for (const [figmaPattern, projectPattern] of Object.entries(mapping)) {
			if (figmaKey.includes(figmaPattern.replace('figma.', ''))) {
				return figmaKey.replace(figmaPattern, projectPattern);
			}
		}

		return null;
	}

	/**
	 * Mapea una clave del proyecto a una clave de Figma
	 */
	private mapProjectToFigmaKey(projectKey: string): string | null {
		// Implementación inversa del mapeo
		const reverseMapping: Record<string, string> = {
			'light.brand.accent-brand': 'figma.light.color.accent.brand',
			'dark.brand.accent-brand': 'figma.dark.color.accent.brand',
		};

		return reverseMapping[projectKey] || null;
	}

	/**
	 * Normaliza un valor para comparación
	 */
	private normalizeValue(value: any): string {
		return String(value).toLowerCase().trim();
	}

	/**
	 * Verifica si se debe actualizar un token según el modo
	 */
	private shouldUpdate(key: string, mode: 'full' | 'selective' | 'manual'): boolean {
		if (mode === 'full') return true;
		if (mode === 'manual') return false;

		// En modo selective, solo actualizar tokens conocidos
		const knownTokens = ['accent-brand', 'fg-1-high', 'bg-1', 'border-1'];

		return knownTokens.some((token) => key.includes(token));
	}

	/**
	 * Establece un valor anidado en un objeto
	 */
	private setNestedValue(obj: any, path: string, value: any): void {
		const keys = path.split('.');
		let current = obj;

		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!(key in current) || typeof current[key] !== 'object') {
				current[key] = {};
			}
			current = current[key];
		}

		current[keys[keys.length - 1]] = value;
	}

	/**
	 * Obtiene un valor anidado de un objeto
	 */
	private getNestedValue(obj: any, path: string): any {
		const keys = path.split('.');
		let current = obj;

		for (const key of keys) {
			if (!(key in current)) {
				return undefined;
			}
			current = current[key];
		}

		return current;
	}

	/**
	 * Guarda tokens del proyecto
	 */
	private async saveProjectTokens(tokens: Record<string, any>): Promise<void> {
		if (!this.config.projectTokensPath) {
			throw new Error('Ruta de tokens del proyecto no configurada');
		}

		const content = JSON.stringify(tokens, null, 2);
		await fs.writeFile(this.config.projectTokensPath, content, 'utf-8');
	}

	/**
	 * Hace backup de tokens del proyecto
	 */
	private async backupProjectTokens(): Promise<void> {
		if (!this.config.projectTokensPath) {
			return;
		}

		const backupPath = this.config.projectTokensPath.replace('.json', `.backup.${Date.now()}.json`);
		const content = await fs.readFile(this.config.projectTokensPath, 'utf-8');
		await fs.writeFile(backupPath, content, 'utf-8');
		console.log(`✅ Backup creado: ${backupPath}`);
	}

	/**
	 * Genera un reporte de sincronización
	 */
	private async generateReport(
		comparison: TokenComparison,
		stats: { tokensUpdated: number; tokensAdded: number; tokensRemoved: number },
	): Promise<string> {
		const reportPath = path.join(this.projectPath, `figma-sync-report-${Date.now()}.md`);

		const report = `# Figma Sync Report

**Fecha**: ${new Date().toISOString()}

## Resumen

- ✅ Tokens sincronizados: ${comparison.synced.length}
- 🔄 Tokens diferentes: ${comparison.different.length}
- ➕ Tokens faltantes: ${comparison.missing.length}
- ➖ Tokens extra: ${comparison.extra.length}

## Estadísticas de Sincronización

- Tokens actualizados: ${stats.tokensUpdated}
- Tokens agregados: ${stats.tokensAdded}
- Tokens removidos: ${stats.tokensRemoved}

## Tokens Diferentes

${comparison.different
	.map(
		(d) => `- **${d.figmaKey}** → **${d.projectKey}**
  - Figma: \`${d.figmaValue}\`
  - Proyecto: \`${d.projectValue}\``,
	)
	.join('\n')}

## Tokens Faltantes

${comparison.missing.map((m) => `- **${m.figmaKey}**: \`${m.figmaValue}\``).join('\n')}

## Tokens Extra

${comparison.extra.map((e) => `- **${e.projectKey}**: \`${e.projectValue}\``).join('\n')}
`;

		await fs.writeFile(reportPath, report, 'utf-8');
		return reportPath;
	}

	/**
	 * Obtiene el estado del servicio
	 */
	getStatus(): {
		initialized: boolean;
		figmaTokensPath?: string;
		projectTokensPath?: string;
		figmaTokensExists: boolean;
		projectTokensExists: boolean;
	} {
		return {
			initialized: this.initialized,
			figmaTokensPath: this.config.figmaTokensPath,
			projectTokensPath: this.config.projectTokensPath,
			figmaTokensExists: this.config.figmaTokensPath
				? existsSync(this.config.figmaTokensPath)
				: false,
			projectTokensExists: this.config.projectTokensPath
				? existsSync(this.config.projectTokensPath)
				: false,
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): FigmaSyncConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<FigmaSyncConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
