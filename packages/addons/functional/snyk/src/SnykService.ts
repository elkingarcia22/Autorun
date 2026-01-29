/**
 * SnykService
 *
 * Servicio que maneja todas las operaciones de Snyk:
 * - Inicialización de Snyk
 * - Autenticación con Snyk
 * - Escaneo de vulnerabilidades
 * - Monitoreo de dependencias
 * - Generación de reportes
 * - Integración con CI/CD
 */

import { execSync } from 'child_process';
import * as fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import * as path from 'path';

export interface SnykConfig {
	enabled?: boolean;
	token?: string;
	org?: string;
	severityThreshold?: 'low' | 'medium' | 'high' | 'critical';
	failOnError?: boolean;
	monitor?: boolean;
	projectPath?: string;
}

export interface Vulnerability {
	id: string;
	package: string;
	version: string;
	severity: 'low' | 'medium' | 'high' | 'critical';
	title: string;
	description: string;
	url: string;
}

export interface SnykResult {
	success: boolean;
	vulnerabilitiesFound?: number;
	vulnerabilities?: Vulnerability[];
	critical?: number;
	high?: number;
	medium?: number;
	low?: number;
	reportPath?: string;
	error?: string;
}

export class SnykService {
	private config: SnykConfig;
	private projectPath: string;

	constructor(config: SnykConfig, projectPath: string = process.cwd()) {
		this.config = {
			enabled: true,
			severityThreshold: 'medium',
			failOnError: false,
			monitor: true,
			...config,
		};
		this.projectPath = projectPath;
	}

	/**
	 * Inicializa Snyk en el proyecto
	 */
	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Snyk está deshabilitado');
			return;
		}

		try {
			// Verificar si Snyk está instalado
			if (!this.isSnykInstalled()) {
				console.warn('⚠️  Snyk no está instalado. Ejecuta: npm install -g snyk');
				return;
			}

			// Autenticar si hay token
			if (this.config.token) {
				try {
					execSync(`snyk auth ${this.config.token}`, {
						cwd: this.projectPath,
						stdio: 'pipe',
					});
					console.log('✅ Snyk autenticado');
				} catch {
					console.warn('⚠️  Error al autenticar Snyk');
				}
			}

			console.log('✅ Snyk Service: Inicializado correctamente');
		} catch (error: any) {
			throw new Error(`Error al inicializar Snyk: ${error.message}`);
		}
	}

	/**
	 * Escanea vulnerabilidades
	 */
	async scan(options?: {
		severityThreshold?: 'low' | 'medium' | 'high' | 'critical';
		failOnError?: boolean;
	}): Promise<SnykResult> {
		if (!this.config.enabled) {
			return {
				success: false,
				error: 'Snyk está deshabilitado',
			};
		}

		try {
			const threshold = options?.severityThreshold || this.config.severityThreshold || 'medium';
			const failOnError =
				options?.failOnError !== undefined ? options.failOnError : this.config.failOnError;

			// Construir comando de Snyk
			let command = 'snyk test';

			if (this.config.org) {
				command += ` --org=${this.config.org}`;
			}

			command += ` --severity-threshold=${threshold}`;

			// Ejecutar escaneo
			try {
				const output = execSync(command, {
					cwd: this.projectPath,
					stdio: 'pipe',
					encoding: 'utf-8',
				});

				console.log('✅ Snyk: Escaneo completado sin vulnerabilidades críticas');

				return {
					success: true,
					vulnerabilitiesFound: 0,
					vulnerabilities: [],
					critical: 0,
					high: 0,
					medium: 0,
					low: 0,
				};
			} catch (error: any) {
				// Snyk retorna código de error si encuentra vulnerabilidades
				const output = error.stdout || error.message;

				// Parsear vulnerabilidades del output
				const vulnerabilities = this.parseVulnerabilities(output);

				const result: SnykResult = {
					success: !failOnError,
					vulnerabilitiesFound: vulnerabilities.length,
					vulnerabilities,
					critical: vulnerabilities.filter((v) => v.severity === 'critical').length,
					high: vulnerabilities.filter((v) => v.severity === 'high').length,
					medium: vulnerabilities.filter((v) => v.severity === 'medium').length,
					low: vulnerabilities.filter((v) => v.severity === 'low').length,
				};

				if (failOnError && vulnerabilities.length > 0) {
					result.error = `${vulnerabilities.length} vulnerabilidades encontradas`;
					console.error(`❌ Snyk: ${result.error}`);
				} else {
					console.warn(`⚠️  Snyk: ${vulnerabilities.length} vulnerabilidades encontradas`);
				}

				return result;
			}
		} catch (error: any) {
			return {
				success: false,
				error: error.message,
			};
		}
	}

	/**
	 * Monitorea dependencias en Snyk
	 */
	async monitor(): Promise<SnykResult> {
		if (!this.config.enabled || !this.config.monitor) {
			return {
				success: false,
				error: 'Monitoreo deshabilitado',
			};
		}

		try {
			let command = 'snyk monitor';

			if (this.config.org) {
				command += ` --org=${this.config.org}`;
			}

			execSync(command, {
				cwd: this.projectPath,
				stdio: 'inherit',
			});

			console.log('✅ Snyk: Monitoreo completado');

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
	 * Parsea vulnerabilidades del output de Snyk
	 */
	private parseVulnerabilities(output: string): Vulnerability[] {
		const vulnerabilities: Vulnerability[] = [];

		// Intentar parsear JSON si está disponible
		try {
			const jsonMatch = output.match(/\{[\s\S]*\}/);
			if (jsonMatch) {
				const data = JSON.parse(jsonMatch[0]);
				if (data.vulnerabilities) {
					for (const vuln of data.vulnerabilities) {
						vulnerabilities.push({
							id: vuln.id || '',
							package: vuln.package || '',
							version: vuln.version || '',
							severity: vuln.severity || 'medium',
							title: vuln.title || '',
							description: vuln.description || '',
							url: vuln.url || '',
						});
					}
				}
			}
		} catch {
			// Si no se puede parsear JSON, intentar parsear texto
			const lines = output.split('\n');
			for (const line of lines) {
				if (line.includes('✗') || line.includes('vulnerability')) {
					// Intentar extraer información básica
					const severityMatch = line.match(/(low|medium|high|critical)/i);
					const packageMatch = line.match(/(@?[\w-]+@[\d.]+)/);

					if (severityMatch || packageMatch) {
						vulnerabilities.push({
							id: '',
							package: packageMatch ? packageMatch[1] : '',
							version: '',
							severity: (severityMatch ? severityMatch[1].toLowerCase() : 'medium') as
								| 'low'
								| 'medium'
								| 'high'
								| 'critical',
							title: line.trim(),
							description: '',
							url: '',
						});
					}
				}
			}
		}

		return vulnerabilities;
	}

	/**
	 * Verifica si Snyk está instalado
	 */
	private isSnykInstalled(): boolean {
		try {
			execSync('snyk --version', {
				cwd: this.projectPath,
				stdio: 'pipe',
			});
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): SnykConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<SnykConfig>): void {
		this.config = { ...this.config, ...config };
	}
}
