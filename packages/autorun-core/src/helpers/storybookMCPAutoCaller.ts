/**
 * Storybook MCP Auto Caller
 *
 * ⚠️ CRÍTICO: Sistema que garantiza que se consulte el MCP de Storybook
 * automáticamente cuando se detectan componentes, ANTES de implementar.
 *
 * Este módulo DEBE ejecutarse automáticamente cuando se detectan componentes.
 */

import { mapComponentNameToStorybookId } from './storybookStories';
import { StorybookManager } from './storybookManager';

export interface MCPCallResult {
	componentName: string;
	storybookId: string;
	props?: any;
	structure?: any;
	error?: string;
}

/**
 * ⚠️ CRÍTICO: Consultar MCP de Storybook automáticamente para componentes detectados
 *
 * Esta función DEBE llamarse automáticamente cuando se detectan componentes.
 * Garantiza que se obtengan las props y estructura exactas ANTES de implementar.
 *
 * @param componentNames Array de nombres de componentes detectados
 * @returns Array de resultados con props y estructura de cada componente
 */
export async function autoCallStorybookMCP(componentNames: string[]): Promise<MCPCallResult[]> {
	console.log('\n📚 [Storybook MCP Auto Caller] ========================================');
	console.log('📚 [Storybook MCP Auto Caller] Consultando MCP de Storybook automáticamente...');
	console.log(
		`📚 [Storybook MCP Auto Caller] Componentes detectados: ${componentNames.join(', ')}`,
	);

	const results: MCPCallResult[] = [];

	for (const componentName of componentNames) {
		try {
			console.log(`\n📚 [Storybook MCP Auto Caller] Procesando: ${componentName}`);

			// 1. Obtener ID de Storybook
			const storybookId = await mapComponentNameToStorybookId(componentName);

			if (!storybookId) {
				console.warn(
					`⚠️ [Storybook MCP Auto Caller] No se pudo obtener ID de Storybook para: ${componentName}`,
				);
				results.push({
					componentName,
					storybookId: '',
					error: `No se pudo obtener ID de Storybook para: ${componentName}`,
				});
				continue;
			}

			console.log(`📚 [Storybook MCP Auto Caller] ID de Storybook: ${storybookId}`);

			// 2. Verificar Storybook activo
			const manager = StorybookManager.getInstance();
			const activeConfig = await manager.getActiveConfig();

			if (!activeConfig) {
				console.warn(`⚠️ [Storybook MCP Auto Caller] No hay Storybook activo configurado`);
				results.push({
					componentName,
					storybookId,
					error: 'No hay Storybook activo configurado',
				});
				continue;
			}

			console.log(
				`📚 [Storybook MCP Auto Caller] Storybook activo: ${activeConfig.name} (${activeConfig.id})`,
			);

			// 3. Determinar servidor MCP dinámicamente según el Storybook activo
			// ⚠️ CRÍTICO: NO usar hardcodeado "storybook-ubits"
			// El servidor MCP puede ser diferente según el Storybook activo
			// Por ahora, el servidor MCP es el mismo pero la URL debe ser la del Storybook activo
			let mcpServer = 'storybook'; // Default (servidor unificado)

			// Si el Storybook activo es Libraries UI, usar el mismo servidor pero con URL de Libraries UI
			// El servidor MCP debe estar configurado con la URL del Storybook activo
			if (activeConfig.id === 'libraries-ui-ubitslearning-com') {
				console.log(
					`📚 [Storybook MCP Auto Caller] Storybook activo es Libraries UI - usando servidor MCP con URL de Libraries UI`,
				);
				// El servidor MCP debe estar configurado con STORYBOOK_URL apuntando a Libraries UI
				mcpServer = 'storybook'; // Servidor unificado
			}

			// 4. Emitir mensaje para que el agente ejecute MCP automáticamente
			console.log(
				`\n📚 [Storybook MCP Auto Caller] ⚠️ OBLIGATORIO: El agente DEBE ejecutar MCP automáticamente`,
			);
			console.log(`📚 [Storybook MCP Auto Caller] Componente: ${componentName}`);
			console.log(`📚 [Storybook MCP Auto Caller] ID Storybook: ${storybookId}`);
			console.log(
				`📚 [Storybook MCP Auto Caller] Storybook activo: ${activeConfig.name} (${activeConfig.url})`,
			);
			console.log(`[AUTORUN_STORYBOOK_MCP]${componentName}:${storybookId}[/AUTORUN_STORYBOOK_MCP]`);
			console.log(`📚 [Storybook MCP Auto Caller] El agente DEBE ejecutar:`);
			console.log(`   call_mcp_tool({`);
			console.log(`     server: "${mcpServer}",`);
			console.log(`     toolName: "mcp_storybook_getComponentsProps",`);
			console.log(`     arguments: { componentIds: ["${storybookId}"] }`);
			console.log(`   })`);
			console.log(
				`📚 [Storybook MCP Auto Caller] ⚠️ CRÍTICO: NO continuar con implementación hasta obtener props`,
			);
			console.log(
				`📚 [Storybook MCP Auto Caller] ⚠️ IMPORTANTE: El servidor MCP debe estar configurado con STORYBOOK_URL=${activeConfig.url}/index.json`,
			);

			results.push({
				componentName,
				storybookId,
			});
		} catch (error: any) {
			console.error(`❌ [Storybook MCP Auto Caller] Error procesando ${componentName}:`, error);
			results.push({
				componentName,
				storybookId: '',
				error: error.message || 'Error desconocido',
			});
		}
	}

	console.log(`\n✅ [Storybook MCP Auto Caller] Procesados ${results.length} componente(s)`);
	console.log('📚 [Storybook MCP Auto Caller] ========================================\n');

	return results;
}

/**
 * ⚠️ CRÍTICO: Instrucciones para el agente
 */
export const STORYBOOK_MCP_AUTO_CALLER_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Consultar MCP de Storybook Automáticamente

CUANDO se detecten componentes, DEBES:

1. Ver el mensaje [AUTORUN_STORYBOOK_MCP]componentName:storybookId[/AUTORUN_STORYBOOK_MCP]
2. Verificar Storybook activo en los logs para determinar servidor MCP correcto
3. Ejecutar automáticamente (SIN preguntar):
   call_mcp_tool({
     server: "storybook", // Servidor unificado
     toolName: "mcp_storybook_getComponentsProps",
     arguments: { componentIds: [storybookId] }
   })
   ⚠️ IMPORTANTE: El servidor MCP debe estar configurado con la URL del Storybook activo
3. Usar las props obtenidas para implementar correctamente
4. NO continuar con implementación hasta obtener props

⚠️ IMPORTANTE:
- NO preguntes al usuario si debe ejecutarse
- NO esperes confirmación
- Ejecuta automáticamente cuando veas [AUTORUN_STORYBOOK_MCP]
- Esto garantiza que se usen las props y estructura correctas
`;
