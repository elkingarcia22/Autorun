/**
 * MCPPromptInteractive
 *
 * Versión interactiva del prompt MCP que pregunta al usuario en tiempo real
 */

import * as readline from 'readline';
import { MCPDetector, MCPServerInfo } from './MCPDetector';
import { MCPInstaller } from './MCPInstaller';
import { MCPPrompt } from './MCPPrompt';

export interface MCPPromptOptions {
	serviceName: string;
	serviceDisplayName: string;
	credentials?: Record<string, any>;
	additionalInfo?: string; // Información adicional para mostrar al usuario
}

export class MCPPromptInteractive {
	private rl: readline.Interface;

	constructor() {
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
	}

	/**
	 * Pregunta interactivamente al usuario si quiere instalar MCP
	 */
	async promptForMCP(options: MCPPromptOptions): Promise<boolean> {
		const { serviceName, serviceDisplayName, credentials, additionalInfo } = options;

		// Detectar si MCP está disponible
		const mcpInfo = await MCPDetector.detectMCPServer(serviceName);

		// Si ya está configurado, no preguntar
		if (mcpInfo.configured) {
			console.log(`✅ MCP para ${serviceDisplayName} ya está configurado`);
			return true;
		}

		// Si MCP no está disponible, no preguntar
		if (!mcpInfo.available) {
			console.log(`ℹ️  MCP no está disponible en este entorno`);
			return false;
		}

		// Mostrar información sobre MCP
		this.showMCPInfo(serviceDisplayName, mcpInfo, additionalInfo);

		// Preguntar al usuario
		return new Promise((resolve) => {
			this.rl.question(
				'\n¿Deseas instalar y configurar MCP para mejorar la experiencia? (S/N/I): ',
				async (answer) => {
					const normalized = answer.trim().toUpperCase();

					if (
						normalized === 'S' ||
						normalized === 'SI' ||
						normalized === 'Y' ||
						normalized === 'YES'
					) {
						// Instalar MCP
						const result = await MCPInstaller.installMCPServer(serviceName, credentials);

						if (result.success) {
							console.log(`\n✅ ${result.message}`);
							console.log('🔄 Reinicia tu editor/IDE para que los cambios surtan efecto.\n');
							resolve(true);
						} else {
							console.log(`\n⚠️  ${result.message}`);
							console.log('\n📖 Instrucciones de instalación manual:');
							MCPPrompt.showManualInstructions(serviceName);
							resolve(false);
						}
					} else if (
						normalized === 'I' ||
						normalized === 'INFO' ||
						normalized === 'INSTRUCCIONES'
					) {
						// Mostrar instrucciones
						MCPPrompt.showManualInstructions(serviceName);
						resolve(false);
					} else {
						// No instalar
						console.log(
							`\nℹ️  Continuando con configuración tradicional de ${serviceDisplayName}...\n`,
						);
						resolve(false);
					}

					this.rl.close();
				},
			);
		});
	}

	/**
	 * Muestra información sobre MCP
	 */
	private showMCPInfo(
		serviceDisplayName: string,
		mcpInfo: MCPServerInfo,
		additionalInfo?: string,
	): void {
		console.log('\n' + '='.repeat(70));
		console.log(`🔌 Integración MCP Disponible para ${serviceDisplayName}`);
		console.log('='.repeat(70));
		console.log('\n✨ Beneficios de usar MCP:');
		console.log('   • Mayor seguridad (no necesitas tokens locales)');
		console.log('   • Funcionalidades avanzadas de la API');
		console.log('   • Mejor integración y mantenimiento');
		console.log('   • Acceso directo sin necesidad de CLI');
		if (additionalInfo) {
			console.log('\n' + additionalInfo);
		}
		console.log('\n📋 Opciones:');
		console.log('   [S] Sí, instalar MCP automáticamente');
		console.log('   [N] No, usar configuración tradicional');
		console.log('   [I] Ver instrucciones de instalación manual');
		console.log('='.repeat(70));
	}

	/**
	 * Cierra el interface de readline
	 */
	close(): void {
		this.rl.close();
	}
}
