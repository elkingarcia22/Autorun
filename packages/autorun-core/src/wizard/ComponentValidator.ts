/**
 * ComponentValidator
 *
 * Valida que los componentes UBITS no se modifiquen y se usen correctamente
 * Asegura cumplimiento de estándares UBITS (tokens, estilos, componentes)
 */

import { UBITS_PRESET } from './UBITSPreset';

export interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
	warnings: ValidationWarning[];
}

export interface ValidationError {
	type: 'component' | 'token' | 'style' | 'usage';
	message: string;
	file?: string;
	line?: number;
	column?: number;
	suggestion?: string;
}

export interface ValidationWarning {
	type: 'component' | 'token' | 'style' | 'usage';
	message: string;
	file?: string;
	suggestion?: string;
}

export class ComponentValidator {
	private storybookUrl: string;
	private allowedComponents: Set<string> = new Set();
	private allowedTokens: Set<string> = new Set();

	constructor() {
		this.storybookUrl = UBITS_PRESET.storybook.url;
		this.initializeAllowedComponents();
		this.initializeAllowedTokens();
	}

	/**
	 * Inicializa lista de componentes permitidos desde Storybook
	 */
	private initializeAllowedComponents(): void {
		// Componentes oficiales UBITS
		const officialComponents = [
			'autorun-button',
			'autorun-alert',
			'autorun-mask',
			'autorun-welcome',
			'autorun-button-feedback',
		];

		officialComponents.forEach((comp) => this.allowedComponents.add(comp));
	}

	/**
	 * Inicializa lista de tokens permitidos
	 */
	private initializeAllowedTokens(): void {
		// Tokens UBITS oficiales (prefijo --ubits-)
		// Se pueden cargar desde Figma o desde un archivo de tokens
		const commonTokens = [
			'--ubits-color-primary',
			'--ubits-color-secondary',
			'--ubits-spacing-1',
			'--ubits-spacing-2',
			'--ubits-spacing-3',
			'--ubits-spacing-4',
			'--ubits-radius-sm',
			'--ubits-radius-md',
			'--ubits-radius-lg',
		];

		commonTokens.forEach((token) => this.allowedTokens.add(token));
	}

	/**
	 * Valida un archivo HTML/CSS/JS para cumplimiento UBITS
	 */
	async validateFile(filePath: string, content: string): Promise<ValidationResult> {
		const errors: ValidationError[] = [];
		const warnings: ValidationWarning[] = [];

		// 1. Validar componentes
		const componentValidation = this.validateComponents(content, filePath);
		errors.push(...componentValidation.errors);
		warnings.push(...componentValidation.warnings);

		// 2. Validar tokens
		const tokenValidation = this.validateTokens(content, filePath);
		errors.push(...tokenValidation.errors);
		warnings.push(...tokenValidation.warnings);

		// 3. Validar estilos
		const styleValidation = this.validateStyles(content, filePath);
		errors.push(...styleValidation.errors);
		warnings.push(...styleValidation.warnings);

		// 4. Validar uso de componentes
		const usageValidation = this.validateComponentUsage(content, filePath);
		errors.push(...usageValidation.errors);
		warnings.push(...usageValidation.warnings);

		return {
			valid: errors.length === 0,
			errors,
			warnings,
		};
	}

	/**
	 * Valida que solo se usen componentes oficiales
	 */
	private validateComponents(
		content: string,
		filePath: string,
	): {
		errors: ValidationError[];
		warnings: ValidationWarning[];
	} {
		const errors: ValidationError[] = [];
		const warnings: ValidationWarning[] = [];

		// Detectar componentes custom (no autorun-*)
		const customComponentRegex = /<([a-z]+-[a-z-]+)(?![a-z-]*autorun)/gi;
		const matches = content.matchAll(customComponentRegex);

		for (const match of matches) {
			const componentName = match[1];
			if (!componentName.startsWith('autorun-')) {
				errors.push({
					type: 'component',
					message: `Componente custom detectado: "${componentName}". Usa componentes oficiales UBITS (autorun-*).`,
					file: filePath,
					suggestion: `Reemplaza <${componentName}> con un componente oficial de UBITS.`,
				});
			}
		}

		// Detectar modificaciones a componentes oficiales
		const componentModificationRegex =
			/(autorun-\w+)\s*\{[^}]*\}/g;
		const styleMatches = content.matchAll(componentModificationRegex);

		for (const match of styleMatches) {
			warnings.push({
				type: 'component',
				message: `Estilos personalizados detectados en componente oficial "${match[1]}". Esto puede romper el design system.`,
				file: filePath,
				suggestion: `Usa variantes y props del componente en lugar de modificar estilos directamente.`,
			});
		}

		return { errors, warnings };
	}

	/**
	 * Valida que solo se usen tokens UBITS
	 */
	private validateTokens(
		content: string,
		filePath: string,
	): {
		errors: ValidationError[];
		warnings: ValidationWarning[];
	} {
		const errors: ValidationError[] = [];
		const warnings: ValidationWarning[] = [];

		// Detectar valores hardcodeados de color
		const hardcodedColorRegex = /(?:color|background|border-color):\s*(?:#[\da-fA-F]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(|red|blue|green|yellow|black|white)(?![\s;]*var\(--ubits)/g;
		const colorMatches = content.matchAll(hardcodedColorRegex);

		for (const match of colorMatches) {
			errors.push({
				type: 'token',
				message: `Color hardcodeado detectado: "${match[0]}". Usa tokens UBITS (--ubits-color-*).`,
				file: filePath,
				suggestion: `Reemplaza con: var(--ubits-color-primary) o el token apropiado.`,
			});
		}

		// Detectar valores hardcodeados de spacing
		const hardcodedSpacingRegex = /(?:padding|margin|gap|top|right|bottom|left):\s*(\d+px)(?![\s;]*var\(--ubits)/g;
		const spacingMatches = content.matchAll(hardcodedSpacingRegex);

		for (const match of spacingMatches) {
			warnings.push({
				type: 'token',
				message: `Spacing hardcodeado detectado: "${match[0]}". Usa tokens UBITS (--ubits-spacing-*).`,
				file: filePath,
				suggestion: `Reemplaza ${match[1]} con var(--ubits-spacing-X) apropiado.`,
			});
		}

		// Detectar uso de tokens no UBITS
		const nonUbitsTokenRegex = /var\(--(?!ubits-)([^)]+)\)/g;
		const tokenMatches = content.matchAll(nonUbitsTokenRegex);

		for (const match of tokenMatches) {
			warnings.push({
				type: 'token',
				message: `Token no UBITS detectado: "--${match[1]}". Usa tokens oficiales UBITS (--ubits-*).`,
				file: filePath,
				suggestion: `Verifica si existe un token UBITS equivalente: --ubits-${match[1]}`,
			});
		}

		return { errors, warnings };
	}

	/**
	 * Valida que no se modifiquen estilos de componentes
	 */
	private validateStyles(
		content: string,
		filePath: string,
	): {
		errors: ValidationError[];
		warnings: ValidationWarning[];
	} {
		const errors: ValidationError[] = [];
		const warnings: ValidationWarning[] = [];

		// Detectar estilos inline
		const inlineStyleRegex = /style\s*=\s*["']([^"']+)["']/g;
		const inlineMatches = content.matchAll(inlineStyleRegex);

		for (const match of inlineMatches) {
			const styles = match[1];
			// Permitir solo estilos que usen tokens UBITS
			if (!styles.includes('var(--ubits-')) {
				warnings.push({
					type: 'style',
					message: `Estilo inline detectado sin tokens UBITS: "${styles.substring(0, 50)}..."`,
					file: filePath,
					suggestion: `Mueve estilos a CSS usando tokens UBITS o clases oficiales.`,
				});
			}
		}

		// Detectar clases custom que puedan romper el design system
		const customClassRegex = /class\s*=\s*["']([^"']*\b(?!ubits-|autorun-)[a-z-]+[^"']*)["']/g;
		const classMatches = content.matchAll(customClassRegex);

		for (const match of classMatches) {
			const classes = match[1].split(/\s+/);
			const customClasses = classes.filter(
				(cls) => !cls.startsWith('ubits-') && !cls.startsWith('autorun-'),
			);

			if (customClasses.length > 0) {
				warnings.push({
					type: 'style',
					message: `Clases custom detectadas: "${customClasses.join(', ')}". Asegúrate de que no rompan el design system.`,
					file: filePath,
					suggestion: `Usa clases oficiales UBITS cuando sea posible.`,
				});
			}
		}

		return { errors, warnings };
	}

	/**
	 * Valida uso correcto de componentes
	 */
	private validateComponentUsage(
		content: string,
		filePath: string,
	): {
		errors: ValidationError[];
		warnings: ValidationWarning[];
	} {
		const errors: ValidationError[] = [];
		const warnings: ValidationWarning[] = [];

		// Verificar que componentes de Storybook se carguen correctamente
		if (!content.includes('window.AUTORUN.Components.loadFromStorybook')) {
			warnings.push({
				type: 'usage',
				message: 'No se detectó carga de componentes desde Storybook. Asegúrate de cargar componentes oficiales.',
				file: filePath,
				suggestion: 'Agrega carga de componentes desde Storybook usando window.AUTORUN.Components.loadFromStorybook()',
			});
		}

		// Verificar que no se importen componentes directamente (deben venir de Storybook)
		const directImportRegex = /import.*from\s*['"]@ubits\/|import.*from\s*['"]\.\.\/components\//g;
		const importMatches = content.matchAll(directImportRegex);

		for (const match of importMatches) {
			warnings.push({
				type: 'usage',
				message: `Importación directa detectada: "${match[0]}". Los componentes deben cargarse desde Storybook.`,
				file: filePath,
				suggestion: 'Usa window.AUTORUN.Components.loadFromStorybook() en lugar de imports directos.',
			});
		}

		return { errors, warnings };
	}

	/**
	 * Valida múltiples archivos
	 */
	async validateFiles(
		files: Array<{ path: string; content: string }>,
	): Promise<ValidationResult> {
		const allErrors: ValidationError[] = [];
		const allWarnings: ValidationWarning[] = [];

		for (const file of files) {
			const result = await this.validateFile(file.path, file.content);
			allErrors.push(...result.errors);
			allWarnings.push(...result.warnings);
		}

		return {
			valid: allErrors.length === 0,
			errors: allErrors,
			warnings: allWarnings,
		};
	}

	/**
	 * Genera reporte de validación
	 */
	generateReport(result: ValidationResult): string {
		let report = '📋 Reporte de Validación UBITS\n';
		report += '='.repeat(50) + '\n\n';

		if (result.valid) {
			report += '✅ Validación exitosa!\n\n';
		} else {
			report += `❌ Se encontraron ${result.errors.length} error(es)\n\n`;
		}

		if (result.warnings.length > 0) {
			report += `⚠️  Se encontraron ${result.warnings.length} advertencia(s)\n\n`;
		}

		if (result.errors.length > 0) {
			report += '🔴 Errores:\n';
			result.errors.forEach((error, index) => {
				report += `\n${index + 1}. [${error.type.toUpperCase()}] ${error.message}\n`;
				if (error.file) {
					report += `   Archivo: ${error.file}\n`;
				}
				if (error.suggestion) {
					report += `   Sugerencia: ${error.suggestion}\n`;
				}
			});
			report += '\n';
		}

		if (result.warnings.length > 0) {
			report += '🟡 Advertencias:\n';
			result.warnings.forEach((warning, index) => {
				report += `\n${index + 1}. [${warning.type.toUpperCase()}] ${warning.message}\n`;
				if (warning.file) {
					report += `   Archivo: ${warning.file}\n`;
				}
				if (warning.suggestion) {
					report += `   Sugerencia: ${warning.suggestion}\n`;
				}
			});
		}

		return report;
	}
}

