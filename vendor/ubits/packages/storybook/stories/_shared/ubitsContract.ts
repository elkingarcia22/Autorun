/**
 * UBITS Contract Helper
 *
 * Helper para crear el contrato `parameters.ubits` que Autorun necesita
 * para implementar componentes de manera determinística.
 */

export interface UBITSContract {
	componentId: string;
	api?: {
		create?: string; // Ej: "window.UBITS.Button.create"
		tag?: string; // Ej: "<ubits-button>"
		apply?: string; // Para templates: función para aplicar el template
		templatePath?: string; // Para templates: ruta al archivo HTML del template
	};
	dependsOn?: {
		required: string[]; // Componentes que el consumidor DEBE componer
		optional: string[]; // Componentes opcionales que el consumidor puede componer
	};
	internals?: string[]; // Componentes privados que NO debes re-implementar
	slots?: {
		[key: string]: string[]; // Ej: { header: ["🧩-ux-button"], body: ["🧩-ux-input"] }
	};
	tokensUsed?: string[]; // Tokens CSS usados (para forzar var(--token))
	rules?: {
		forbidHardcodedColors?: boolean;
		forbiddenPatterns?: string[]; // Ej: ["rgb(", "hsl(", "#"]
		requiredProps?: string[]; // Props requeridas para el componente
	};
	isTemplate?: boolean; // Indica si es un template (composición completa) en lugar de un componente individual
	templateComponents?: string[]; // Componentes UBITS que el template usa internamente
}

/**
 * Crea un contrato UBITS estándar
 */
export function createUBITSContract(config: UBITSContract): UBITSContract {
	return {
		componentId: config.componentId,
		api: config.api || {},
		dependsOn: {
			required: config.dependsOn?.required || [],
			optional: config.dependsOn?.optional || [],
		},
		internals: config.internals || [],
		slots: config.slots || {},
		tokensUsed: config.tokensUsed || [],
		rules: {
			forbidHardcodedColors: config.rules?.forbidHardcodedColors ?? true,
			forbiddenPatterns: config.rules?.forbiddenPatterns || ['rgb(', 'hsl(', '#'],
			requiredProps: config.rules?.requiredProps || [],
		},
		isTemplate: config.isTemplate || false,
		templateComponents: config.templateComponents || [],
	};
}

/**
 * Helper para crear snippet exacto de código
 */
export function createExactSnippet(
	componentName: string,
	props: Record<string, any>,
	apiType: 'create' | 'tag' = 'create',
): string {
	if (apiType === 'create') {
		const propsString = Object.entries(props)
			.map(([key, value]) => {
				if (typeof value === 'string') {
					return `  ${key}: '${value}'`;
				}
				if (typeof value === 'boolean') {
					return `  ${key}: ${value}`;
				}
				if (typeof value === 'number') {
					return `  ${key}: ${value}`;
				}
				return `  ${key}: ${JSON.stringify(value)}`;
			})
			.join(',\n');
		return `window.UBITS.${componentName}.create({\n${propsString}\n});`;
	} else {
		// Tag format
		const attrs = Object.entries(props)
			.map(([key, value]) => {
				if (typeof value === 'boolean' && value) {
					return key;
				}
				return `${key}="${value}"`;
			})
			.join(' ');
		return `<ubits-${componentName.toLowerCase()} ${attrs}></ubits-${componentName.toLowerCase()}>`;
	}
}
