/**
 * OperationDetector
 *
 * Detecta operaciones comunes en el código y verifica que se hayan consultado
 * las guías obligatorias antes de implementar.
 */

export interface OperationDetection {
	operation: string;
	requiredGuide: string;
	severity: 'critical' | 'warning';
	message: string;
	patterns: RegExp[];
	checklist?: string[];
}

export class OperationDetector {
	/**
	 * Patrones de detección para operaciones comunes
	 */
	private static readonly OPERATIONS: OperationDetection[] = [
		{
			operation: 'removeHeaderSection',
			requiredGuide: 'docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md',
			severity: 'critical',
			message:
				'⚠️ CRÍTICO: Debes consultar GUIA-ELIMINAR-HEADERSECTION.md antes de eliminar HeaderSection',
			patterns: [
				/header-section-container/i,
				/\.ubits-header-section/i,
				/headerSection/i,
				/eliminar.*header/i,
				/quitar.*header/i,
				/remove.*header/i,
				/delete.*header/i,
			],
			checklist: [
				'¿Eliminé el CSS de HeaderSection del HTML?',
				'¿Eliminé los estilos CSS de #header-section-container?',
				'¿Intercepté ContentManager.updateContent INMEDIATAMENTE después de cargar content-manager.js?',
				'¿Usé requestAnimationFrame para timing correcto?',
				'¿Eliminé TODOS los elementos relacionados?',
				'¿Configuré MutationObserver agresivo?',
				'¿Verifiqué el módulo antes de eliminar?',
			],
		},
		{
			operation: 'interceptContentManager',
			requiredGuide: 'docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md',
			severity: 'critical',
			message:
				'⚠️ CRÍTICO: Debes consultar GUIA-CONTENTMANAGER-UPDATECONTENT.md antes de interceptar ContentManager',
			patterns: [
				/ContentManager\.updateContent/i,
				/UBITS_ContentManager/i,
				/intercept.*ContentManager/i,
				/content-manager\.js/i,
				/originalUpdateContent/i,
				/window\.UBITS_ContentManager/i,
			],
			checklist: [
				'¿Leí la guía completa de ContentManager?',
				'¿Entendí cómo funciona updateContent?',
				'¿Intercepté ANTES de agregar elementos al DOM?',
				'¿Guardé elementos personalizados antes de updateContent?',
				'¿Restauré elementos después de updateContent?',
				'¿Verifiqué módulo/sección antes de preservar?',
			],
		},
		{
			operation: 'modifyContentArea',
			requiredGuide: 'docs/guias/referencia/GUIA-CONTENTMANAGER-UPDATECONTENT.md',
			severity: 'critical',
			message:
				'⚠️ CRÍTICO: Debes consultar GUIA-CONTENTMANAGER-UPDATECONTENT.md antes de modificar .content-area',
			patterns: [
				/\.content-area/i,
				/contentArea/i,
				/content-area\.innerHTML/i,
				/contentArea\.innerHTML/i,
				/\.content-sections/i,
				/contentSections/i,
			],
			checklist: [
				'¿Leí la guía completa de ContentManager?',
				'¿Entendí cómo ContentManager limpia el contenido?',
				'¿Intercepté updateContent para preservar elementos?',
				'¿Guardé elementos antes de que se limpien?',
				'¿Restauré elementos después de updateContent?',
			],
		},
		{
			operation: 'addComponent',
			requiredGuide: 'docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md',
			severity: 'critical',
			message:
				'⚠️ CRÍTICO: Debes consultar CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md antes de agregar componentes UBITS',
			patterns: [
				/window\.create(DataTable|Tabs|Button|Modal|Drawer)/i,
				/createComponent/i,
				/ubits-(data-table|tabs|button|modal|drawer)/i,
				/<ubits-(data-table|tabs|button|modal|drawer)/i,
			],
			checklist: [
				'¿Consulté Storybook en Vercel?',
				'¿Consulté Storybook MCP?',
				'¿Consulté documentación específica?',
				'¿Verifiqué formato de iconos?',
				'¿Verifiqué que NO se agreguen estilos extra?',
			],
		},
		{
			operation: 'addStylesToComponent',
			requiredGuide: 'docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md',
			severity: 'warning',
			message:
				'⚠️ ADVERTENCIA: Verifica GUIA-ERRORES-COMUNES-UBITS.md (Error #53, #55) antes de agregar estilos a componentes',
			patterns: [
				/\.style\.cssText.*margin-top/i,
				/\.style\.cssText.*padding/i,
				/container\.style\./i,
				/\.style\.marginTop/i,
				/\.style\.padding/i,
			],
			checklist: [
				'¿El usuario solicitó EXPLÍCITAMENTE agregar estos estilos?',
				'¿Verifiqué que el componente NO tiene estos estilos por defecto?',
				'¿Usé gap del contenedor padre en lugar de margin-top?',
			],
		},
	];

	/**
	 * Detectar operaciones comunes en el contenido
	 */
	static detectOperations(content: string, filePath?: string): OperationDetection[] {
		const detected: OperationDetection[] = [];

		for (const operation of this.OPERATIONS) {
			const matches = operation.patterns.some((pattern) => pattern.test(content));

			if (matches) {
				detected.push(operation);
				console.log(`🔍 [OperationDetector] Operación detectada: ${operation.operation}`);
				console.log(`   📚 Guía obligatoria: ${operation.requiredGuide}`);
			}
		}

		return detected;
	}

	/**
	 * Obtener mensaje de error completo para una operación
	 */
	static getErrorMessage(operation: OperationDetection): string {
		let message = `${operation.message}\n`;
		message += `   📚 Guía obligatoria: ${operation.requiredGuide}\n`;
		message += `   ⚠️ BLOQUEADO hasta consultar la guía\n\n`;

		if (operation.checklist && operation.checklist.length > 0) {
			message += `   📋 Checklist obligatorio:\n`;
			operation.checklist.forEach((item) => {
				message += `      - [ ] ${item}\n`;
			});
		}

		return message;
	}

	/**
	 * Verificar si una guía fue consultada (tracking simple)
	 */
	static checkGuideWasRead(guidePath: string): boolean {
		// Por ahora, retornar false para forzar la consulta
		// En el futuro, esto podría usar un sistema de tracking más sofisticado
		return false;
	}
}







