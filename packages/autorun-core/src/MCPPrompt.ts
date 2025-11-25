/**
 * MCPPrompt
 *
 * Maneja la interacción con el usuario para preguntar sobre MCP
 */

import { MCPDetector, MCPServerInfo } from './MCPDetector';
import { MCPInstaller } from './MCPInstaller';

export interface MCPPromptOptions {
	serviceName: string;
	serviceDisplayName: string;
	credentials?: Record<string, any>;
	additionalInfo?: string; // Información adicional para mostrar al usuario
	onInstall?: () => Promise<void>;
	onSkip?: () => void;
}

export class MCPPrompt {
	/**
	 * Pregunta al usuario si quiere instalar MCP y lo instala si acepta
	 */
	static async promptForMCP(options: MCPPromptOptions): Promise<boolean> {
		const { serviceName, serviceDisplayName, credentials } = options;

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

		// Intentar usar prompt interactivo si está disponible
		try {
			const { MCPPromptInteractive } = await import('./MCPPromptInteractive');
			const prompt = new MCPPromptInteractive();
			return await prompt.promptForMCP({
				serviceName,
				serviceDisplayName,
				credentials,
				additionalInfo: options.additionalInfo,
			});
		} catch {
			// Si no está disponible readline (ej: en browser), usar versión no interactiva
			const message = this.getPromptMessage(serviceDisplayName, mcpInfo, options.additionalInfo);
			console.log('\n' + '='.repeat(60));
			console.log(message);
			if (options.additionalInfo) {
				console.log('\n' + options.additionalInfo);
			}
			console.log('='.repeat(60));
			console.log('\n💡 Para instalar MCP automáticamente, ejecuta en modo interactivo.');
			console.log('📖 O sigue las instrucciones manuales:\n');
			this.showManualInstructions(serviceName);

			return false; // Por defecto, no instalar automáticamente
		}
	}

	/**
	 * Instala MCP automáticamente si el usuario acepta
	 */
	static async installIfAccepted(
		serviceName: string,
		credentials?: Record<string, any>,
	): Promise<{ installed: boolean; message: string }> {
		try {
			const result = await MCPInstaller.installMCPServer(serviceName, credentials);

			if (result.success) {
				console.log(`✅ ${result.message}`);
				return { installed: true, message: result.message };
			} else {
				console.log(`⚠️  ${result.message}`);
				return { installed: false, message: result.message };
			}
		} catch (error: any) {
			return {
				installed: false,
				message: `Error al instalar MCP: ${error.message}`,
			};
		}
	}

	/**
	 * Genera mensaje de prompt para el usuario
	 */
	private static getPromptMessage(
		serviceDisplayName: string,
		mcpInfo: MCPServerInfo,
		additionalInfo?: string,
	): string {
		return `
🔌 Integración MCP Disponible

Detectamos que puedes usar MCP (Model Context Protocol) para mejorar
la experiencia con ${serviceDisplayName}.

Beneficios de usar MCP:
✨ Mayor seguridad (no necesitas tokens locales)
✨ Funcionalidades avanzadas de la API
✨ Mejor integración y mantenimiento
✨ Acceso directo sin necesidad de CLI

¿Deseas instalar y configurar MCP para ${serviceDisplayName}?

[S] Sí, instalar MCP automáticamente
[N] No, usar configuración tradicional
[I] Ver instrucciones de instalación manual

Tu respuesta: `;
	}

	/**
	 * Muestra instrucciones de instalación manual
	 */
	static showManualInstructions(serviceName: string): void {
		const instructions = MCPInstaller.getInstallInstructions(serviceName);
		console.log('\n' + '='.repeat(60));
		console.log('📖 Instrucciones de Instalación Manual');
		console.log('='.repeat(60));
		console.log(instructions);
		console.log('='.repeat(60) + '\n');
	}
}
