/**
 * Proactive Detection System
 *
 * Sistema mejorado de detección proactiva que analiza el mensaje del usuario
 * ANTES de escribir código para detectar intención de implementar componentes.
 */

export interface DetectedComponent {
	name: string;
	confidence: 'high' | 'medium' | 'low';
	context: string[];
	suggestedChecklist?: string[];
}

export interface DetectionResult {
	detected: boolean;
	components: DetectedComponent[];
	hasImage: boolean;
	requiresAnalysis: boolean;
}

/**
 * Detecta componentes del mensaje del usuario de forma proactiva
 *
 * @param userMessage Mensaje completo del usuario
 * @returns Resultado de detección con componentes encontrados
 */
export function detectComponentsProactively(userMessage: string): DetectionResult {
	const detectedComponents: DetectedComponent[] = [];
	let hasImage = false;
	let requiresAnalysis = false;

	// 1. Detectar imágenes
	const imagePatterns = [
		/<image/i,
		/<image_description/i,
		/\[imagen\]/i,
		/imagen adjunta/i,
		/crear desde imagen/i,
		/implementar desde imagen/i,
	];

	hasImage = imagePatterns.some((pattern) => pattern.test(userMessage));
	if (hasImage) {
		requiresAnalysis = true;
	}

	// 2. Patrones mejorados de detección de componentes
	const componentPatterns = [
		{
			name: 'DataTable',
			patterns: [
				{ pattern: /implementar.*data.?table|crear.*data.?table/i, confidence: 'high' as const },
				{ pattern: /crear.*tabla|hacer.*tabla|tabla de datos/i, confidence: 'high' as const },
				{ pattern: /data.?table|data-table/i, confidence: 'medium' as const },
				{ pattern: /tabla.*con.*columnas|tabla.*con.*filas/i, confidence: 'medium' as const },
			],
			contextKeywords: ['tabla', 'datos', 'columnas', 'filas', 'paginación', 'búsqueda', 'filtros'],
			suggestedChecklist: [
				'Consultar Storybook para ver todas las funcionalidades disponibles',
				'Analizar funcionalidades en la imagen (SÍ/NO para cada una)',
				'Verificar tipos de columnas (estado, fecha, progreso, etc.)',
				'Configurar altura dinámica',
				'Verificar si necesita Action Bar (si hay checkboxes)',
			],
		},
		{
			name: 'Tabs',
			patterns: [
				{ pattern: /implementar.*tabs?|crear.*tabs?/i, confidence: 'high' as const },
				{ pattern: /tabs?.*dentro.*contenido|tabs?.*adicionales/i, confidence: 'high' as const },
				{ pattern: /pestañas|tabs?/i, confidence: 'medium' as const },
			],
			contextKeywords: ['pestañas', 'tabs', 'navegación', 'contenido'],
			suggestedChecklist: [
				'Verificar que NO es SubNav (ya existe en template)',
				'Consultar Storybook para ver estructura exacta',
				'Verificar formato de iconos (sin prefijos fa-)',
				'NO agregar margin-top al contenedor',
			],
		},
		{
			name: 'Modal',
			patterns: [
				{ pattern: /implementar.*modal|crear.*modal/i, confidence: 'high' as const },
				{ pattern: /ventana.*emergente|dialog|diálogo/i, confidence: 'medium' as const },
			],
			contextKeywords: ['modal', 'ventana', 'diálogo', 'popup'],
			suggestedChecklist: [
				'Consultar Storybook para ver opciones de modal',
				'Verificar si necesita overlay',
				'Verificar si necesita botones de acción',
			],
		},
		{
			name: 'Button',
			patterns: [
				{ pattern: /implementar.*button|crear.*botón/i, confidence: 'high' as const },
				{ pattern: /botón.*primario|botón.*secundario/i, confidence: 'medium' as const },
			],
			contextKeywords: ['botón', 'button', 'acción'],
			suggestedChecklist: [
				'Consultar Storybook para ver variantes disponibles',
				'Verificar si es primario, secundario o terciario',
			],
		},
		{
			name: 'Drawer',
			patterns: [
				{ pattern: /implementar.*drawer|crear.*drawer/i, confidence: 'high' as const },
				{ pattern: /cajón|panel.*lateral|drawer/i, confidence: 'medium' as const },
			],
			contextKeywords: ['drawer', 'cajón', 'panel', 'lateral'],
			suggestedChecklist: [
				'Consultar Storybook para ver opciones de drawer',
				'Verificar si es desde izquierda o derecha',
				'Verificar si tiene inputs o formularios',
			],
		},
	];

	// 3. Detectar componentes con patrones mejorados
	for (const component of componentPatterns) {
		let maxConfidence: 'high' | 'medium' | 'low' = 'low';
		const matchedPatterns: string[] = [];

		for (const { pattern, confidence } of component.patterns) {
			if (pattern.test(userMessage)) {
				matchedPatterns.push(pattern.toString());
				if (confidence === 'high' || (confidence === 'medium' && maxConfidence === 'low')) {
					maxConfidence = confidence;
				}
			}
		}

		// Verificar keywords de contexto para aumentar confianza
		const contextMatches = component.contextKeywords.filter((keyword) =>
			new RegExp(keyword, 'i').test(userMessage),
		);

		if (matchedPatterns.length > 0 || contextMatches.length > 0) {
			detectedComponents.push({
				name: component.name,
				confidence: maxConfidence === 'low' && contextMatches.length > 0 ? 'medium' : maxConfidence,
				context: contextMatches,
				suggestedChecklist: component.suggestedChecklist,
			});
		}
	}

	// 4. Detectar solicitudes de creación sin componente específico
	const creationPatterns = [
		/crear.*home|hacer.*home|implementar.*home/i,
		/crear.*página|hacer.*página/i,
		/crear.*interfaz|hacer.*interfaz/i,
	];

	const hasCreationRequest = creationPatterns.some((pattern) => pattern.test(userMessage));
	if (hasCreationRequest && !hasImage && detectedComponents.length === 0) {
		requiresAnalysis = true; // Requiere análisis de imagen
	}

	return {
		detected: detectedComponents.length > 0 || hasImage || hasCreationRequest,
		components: detectedComponents,
		hasImage,
		requiresAnalysis: requiresAnalysis || detectedComponents.length > 0,
	};
}

/**
 * Obtiene checklist contextual para un componente específico
 *
 * @param componentName Nombre del componente
 * @param context Contexto adicional (imagen, historias, etc.)
 * @returns Checklist contextual con solo items relevantes
 */
export function getContextualChecklist(
	componentName: string,
	context?: {
		hasImage?: boolean;
		hasStories?: boolean;
		complexity?: 'simple' | 'medium' | 'complex';
	},
): string[] {
	const baseChecklist = [
		'Consultar Storybook en Vercel (versión más reciente)',
		'Consultar Storybook MCP para props exactas',
		'Consultar documentación específica del componente',
	];

	const contextualItems: string[] = [];

	// Items específicos por componente
	switch (componentName) {
		case 'DataTable':
			contextualItems.push(
				'Analizar funcionalidades en la imagen (si hay imagen)',
				'Listar TODAS las funcionalidades con SÍ/NO',
				'Verificar tipos de columnas (estado, fecha, progreso)',
				'Configurar altura dinámica',
				'Verificar si necesita Action Bar (si hay checkboxes)',
				'Verificar si necesita paginación',
			);
			if (context?.complexity === 'complex') {
				contextualItems.push('Usar implementación por historias (UNA a la vez)');
			}
			break;

		case 'Tabs':
			contextualItems.push(
				'Verificar que NO es SubNav (ya existe en template)',
				'Verificar formato de iconos (sin prefijos fa-)',
				'NO agregar margin-top al contenedor',
			);
			break;

		case 'Drawer':
			contextualItems.push(
				'Verificar si tiene inputs o formularios',
				'Verificar posición (izquierda o derecha)',
				'Consultar guía específica de drawer con inputs',
			);
			break;
	}

	// Items específicos por contexto
	if (context?.hasImage) {
		contextualItems.push(
			'Analizar imagen detalladamente',
			'Medir spacing visualmente (NO asumir)',
			'Verificar iconos con variaciones',
		);
	}

	if (context?.hasStories) {
		contextualItems.push(
			'Obtener plan basado en historias de Storybook',
			'Implementar UNA historia a la vez',
			'Completar checklist de cada historia antes de continuar',
		);
	}

	return [...baseChecklist, ...contextualItems];
}

/**
 * Sugiere siguiente paso basado en contexto
 *
 * @param componentName Nombre del componente
 * @param completedSteps Pasos ya completados
 * @param context Contexto adicional
 * @returns Siguiente paso sugerido
 */
export function suggestNextStep(
	componentName: string,
	completedSteps: string[],
	context?: {
		hasImage?: boolean;
		hasStories?: boolean;
	},
): {
	step: string;
	priority: 'high' | 'medium' | 'low';
	instructions: string;
} | null {
	// Si hay imagen y no se ha analizado
	if (context?.hasImage && !completedSteps.includes('Analizar imagen detalladamente')) {
		return {
			step: 'Analizar imagen detalladamente',
			priority: 'high',
			instructions:
				'Leer .cursor/rules/02-bloqueo-imagen.md y analizar la imagen antes de continuar',
		};
	}

	// Si no se ha consultado Storybook en Vercel
	if (!completedSteps.includes('Consultar Storybook en Vercel')) {
		return {
			step: 'Consultar Storybook en Vercel',
			priority: 'high',
			instructions: 'Navegar a https://ubits-storybook10.vercel.app/ y buscar el componente',
		};
	}

	// Si no se ha consultado Storybook MCP
	if (!completedSteps.includes('Consultar Storybook MCP')) {
		return {
			step: 'Consultar Storybook MCP',
			priority: 'high',
			instructions: 'Usar mcp_storybook_getComponentsProps para obtener props exactas',
		};
	}

	// Si hay historias y no se ha obtenido el plan
	if (context?.hasStories && !completedSteps.includes('Obtener plan basado en historias')) {
		return {
			step: 'Obtener plan basado en historias de Storybook',
			priority: 'medium',
			instructions: 'Usar getOrCreateStoryBasedPlan para obtener el plan de implementación',
		};
	}

	// Si no se ha consultado documentación
	if (!completedSteps.includes('Consultar documentación específica')) {
		return {
			step: 'Consultar documentación específica',
			priority: 'medium',
			instructions: 'Leer documentación del componente en docs/referencia/componentes/',
		};
	}

	return null; // Todos los pasos completados
}



