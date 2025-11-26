/**
 * TemplateLoader
 *
 * Carga templates desde Storybook de UBITS
 */

import { UBITS_PRESET } from './UBITSPreset';

export class TemplateLoader {
	private storybookUrl: string;

	constructor() {
		this.storybookUrl = UBITS_PRESET.storybook.url;
	}

	/**
	 * Carga el template desktop desde Storybook
	 */
	async loadDesktopTemplate(): Promise<any> {
		// TODO: Implementar carga del template desktop
		// El template desktop está en Storybook
		// Necesitamos cargar el HTML/CSS/JS del template

		if (typeof window === 'undefined') {
			throw new Error('TemplateLoader solo funciona en navegador');
		}

		// Intentar cargar desde Storybook
		const templateUrl = `${this.storybookUrl}/templates/desktop`;
		
		try {
			const response = await fetch(templateUrl);
			if (!response.ok) {
				throw new Error(`Error cargando template: ${response.statusText}`);
			}
			
			// El template puede venir como HTML, JSON con estructura, etc.
			const template = await response.text();
			return this.parseTemplate(template);
		} catch (error) {
			console.warn('⚠️  No se pudo cargar template desde Storybook:', error);
			// Retornar template por defecto
			return this.getDefaultTemplate();
		}
	}

	/**
	 * Parsea el template cargado
	 */
	private parseTemplate(template: string): any {
		// TODO: Implementar parsing según formato del template
		// Por ahora retornamos estructura básica
		return {
			html: template,
			components: [],
			styles: [],
		};
	}

	/**
	 * Retorna template por defecto si no se puede cargar desde Storybook
	 */
	private getDefaultTemplate(): any {
		return {
			html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UBITS - Template Desktop</title>
</head>
<body>
  <div id="app">
    <!-- Template se cargará aquí -->
  </div>
</body>
</html>
			`,
			components: [],
			styles: [],
		};
	}

	/**
	 * Carga template específico (Administrador/Colaborador)
	 */
	async loadTemplate(
		type: 'administrador' | 'colaborador',
	): Promise<any> {
		const templateConfig = UBITS_PRESET.templates[type];
		
		// Cargar template base desktop
		const desktopTemplate = await this.loadDesktopTemplate();
		
		// Aplicar configuración específica del template
		return {
			...desktopTemplate,
			config: templateConfig,
		};
	}
}

