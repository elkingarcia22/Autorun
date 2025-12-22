/**
 * Storybook Stories Verification Helper
 *
 * Verifica automáticamente qué historias existen en los archivos .stories.ts
 * antes de construir URLs de Storybook, evitando errores de historias inexistentes.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface VerifiedStory {
	name: string; // Nombre de la historia (ej: "default", "WithCheckboxes")
	kebabName: string; // Nombre en formato kebab-case para URL (ej: "default", "with-checkboxes")
	exportName: string; // Nombre del export original (ej: "Default", "WithCheckboxes")
}

export interface ComponentStoryInfo {
	componentTitle: string; // Título del componente (ej: "Data/Data Table")
	componentId: string; // ID del componente (ej: "data-data-table")
	storiesPath: string; // Ruta del archivo .stories.ts
	availableStories: VerifiedStory[];
}

/**
 * Mapeo de componentes a rutas de archivos .stories.ts
 */
export const COMPONENT_STORIES_PATH_MAP: Record<string, string> = {
	'Data/Data Table': 'vendor/ubits/packages/storybook/stories/DataTable.stories.ts',
	'data-data-table': 'vendor/ubits/packages/storybook/stories/DataTable.stories.ts',
	DataTable: 'vendor/ubits/packages/storybook/stories/DataTable.stories.ts',
	'Navegación/Tabs': 'vendor/ubits/packages/storybook/stories/Tabs.stories.ts',
	'navegación-tabs': 'vendor/ubits/packages/storybook/stories/Tabs.stories.ts',
	Tabs: 'vendor/ubits/packages/storybook/stories/Tabs.stories.ts',
	'Navegación/Tab Bar': 'vendor/ubits/packages/storybook/stories/TabBar.stories.ts',
	'navegacion-tab-bar': 'vendor/ubits/packages/storybook/stories/TabBar.stories.ts',
	TabBar: 'vendor/ubits/packages/storybook/stories/TabBar.stories.ts',
	'Navegación/Sub Nav': 'vendor/ubits/packages/storybook/stories/SubNav.stories.ts',
	'navegacion-sub-nav': 'vendor/ubits/packages/storybook/stories/SubNav.stories.ts',
	SubNav: 'vendor/ubits/packages/storybook/stories/SubNav.stories.ts',
	'Layout/Sidebar': 'vendor/ubits/packages/storybook/stories/Sidebar.stories.ts',
	'navegacion-sidebar': 'vendor/ubits/packages/storybook/stories/Sidebar.stories.ts',
	Sidebar: 'vendor/ubits/packages/storybook/stories/Sidebar.stories.ts',
	'Formularios/Input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts',
	'formularios-input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts',
	Input: 'vendor/ubits/packages/storybook/stories/Input.stories.ts',
	'entrada-input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts', // ⚠️ Alias común pero incorrecto
	'Entrada/Input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts', // ⚠️ Alias común pero incorrecto
	'Feedback/Drawer Navigation': 'vendor/ubits/packages/storybook/stories/Drawer.stories.ts',
	'feedback-drawer-navigation': 'vendor/ubits/packages/storybook/stories/Drawer.stories.ts',
	Drawer: 'vendor/ubits/packages/storybook/stories/Drawer.stories.ts',
	'feedback-drawer': 'vendor/ubits/packages/storybook/stories/Drawer.stories.ts', // ⚠️ Alias común pero incorrecto
	'Básicos/Chip': 'vendor/ubits/packages/storybook/stories/Chip.stories.ts',
	'bsicos-chip': 'vendor/ubits/packages/storybook/stories/Chip.stories.ts',
	Chip: 'vendor/ubits/packages/storybook/stories/Chip.stories.ts',
	'Feedback/Tooltip': 'vendor/ubits/packages/storybook/stories/Tooltip.stories.ts',
	'feedback-tooltip': 'vendor/ubits/packages/storybook/stories/Tooltip.stories.ts',
	Tooltip: 'vendor/ubits/packages/storybook/stories/Tooltip.stories.ts',
	// Agregar más mapeos según sea necesario
};

/**
 * Mapeo de títulos de componentes a IDs de Storybook
 */
const COMPONENT_TITLE_TO_ID_MAP: Record<string, string> = {
	'Data/Data Table': 'data-data-table',
	'Navegación/Tabs': 'navegación-tabs',
	'Navegación/Tab Bar': 'navegacion-tab-bar',
	'Navegación/Sub Nav': 'navegacion-sub-nav',
	'Layout/Sidebar': 'navegacion-sidebar',
	'Formularios/Input': 'formularios-input',
	Input: 'formularios-input',
	'entrada-input': 'formularios-input', // ⚠️ Mapear alias incorrecto al ID correcto
	'Entrada/Input': 'formularios-input', // ⚠️ Mapear alias incorrecto al ID correcto
	'Feedback/Drawer Navigation': 'feedback-drawer-navigation',
	Drawer: 'feedback-drawer-navigation',
	'feedback-drawer': 'feedback-drawer-navigation', // ⚠️ Mapear alias incorrecto al ID correcto
	'Básicos/Chip': 'bsicos-chip',
	Chip: 'bsicos-chip',
	'Feedback/Tooltip': 'feedback-tooltip',
	Tooltip: 'feedback-tooltip',
};

/**
 * Convierte camelCase a kebab-case
 */
function camelToKebab(str: string): string {
	return str
		.replace(/([A-Z])/g, '-$1')
		.toLowerCase()
		.replace(/^-/, '');
}

/**
 * Obtiene el título del componente desde el archivo .stories.ts
 */
async function getComponentTitleFromStoriesFile(filePath: string): Promise<string | null> {
	try {
		const content = await fs.readFile(filePath, 'utf-8');
		const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
		return titleMatch ? titleMatch[1] : null;
	} catch (error) {
		console.error(`❌ [Verify Stories] Error leyendo título de ${filePath}:`, error);
		return null;
	}
}

/**
 * Verifica qué historias existen en un archivo .stories.ts
 *
 * @param componentIdentifier - Nombre del componente, ID de Storybook, o título (ej: "DataTable", "data-data-table", "Data/Data Table")
 * @returns Información de las historias disponibles
 */
export async function verifyAvailableStories(
	componentIdentifier: string,
): Promise<ComponentStoryInfo | null> {
	try {
		// Obtener ruta del archivo .stories.ts
		const storiesPath = COMPONENT_STORIES_PATH_MAP[componentIdentifier];

		if (!storiesPath) {
			console.warn(
				`⚠️ [Verify Stories] No se encontró ruta para componente: ${componentIdentifier}`,
			);
			return null;
		}

		// Verificar que el archivo existe
		const fullPath = path.join(process.cwd(), storiesPath);
		try {
			await fs.access(fullPath);
		} catch {
			console.warn(`⚠️ [Verify Stories] Archivo no encontrado: ${fullPath}`);
			return null;
		}

		// Leer el archivo
		const content = await fs.readFile(fullPath, 'utf-8');

		// Obtener título del componente
		const componentTitle =
			(await getComponentTitleFromStoriesFile(fullPath)) || componentIdentifier;

		// ⚠️ CRÍTICO: Obtener ID del componente usando el mapeo de títulos a IDs
		// Si el identificador está en el mapeo, usar el ID mapeado
		// Si no, intentar obtener el ID desde el título
		let componentId: string;
		if (COMPONENT_TITLE_TO_ID_MAP[componentIdentifier]) {
			// Si el identificador está directamente en el mapeo, usar ese ID
			componentId = COMPONENT_TITLE_TO_ID_MAP[componentIdentifier];
		} else if (COMPONENT_TITLE_TO_ID_MAP[componentTitle]) {
			// Si el título está en el mapeo, usar ese ID
			componentId = COMPONENT_TITLE_TO_ID_MAP[componentTitle];
		} else {
			// Fallback: convertir título a kebab-case
			componentId = componentTitle.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
		}

		// Buscar todos los exports de historias
		const storyExports = content.match(/^export const (\w+): Story =/gm);

		if (!storyExports || storyExports.length === 0) {
			console.warn(`⚠️ [Verify Stories] No se encontraron historias en ${storiesPath}`);
			// Retornar al menos 'default' como fallback
			return {
				componentTitle,
				componentId,
				storiesPath,
				availableStories: [
					{
						name: 'default',
						kebabName: 'default',
						exportName: 'Default',
					},
				],
			};
		}

		// Extraer nombres de historias
		const stories: VerifiedStory[] = storyExports
			.map((match) => {
				const nameMatch = match.match(/export const (\w+):/);
				if (nameMatch) {
					const exportName = nameMatch[1];
					const kebabName = camelToKebab(exportName);
					return {
						name: kebabName,
						kebabName,
						exportName,
					};
				}
				return null;
			})
			.filter((story): story is VerifiedStory => story !== null);

		// Asegurar que 'default' siempre esté presente
		const hasDefault = stories.some((s) => s.name === 'default');
		if (!hasDefault) {
			stories.unshift({
				name: 'default',
				kebabName: 'default',
				exportName: 'Default',
			});
		}

		console.log(
			`✅ [Verify Stories] Historias encontradas para ${componentIdentifier}:`,
			stories.map((s) => s.name).join(', '),
		);

		return {
			componentTitle,
			componentId,
			storiesPath,
			availableStories: stories,
		};
	} catch (error) {
		console.error(
			`❌ [Verify Stories] Error verificando historias para ${componentIdentifier}:`,
			error,
		);
		return null;
	}
}

/**
 * Construye URL segura de Storybook verificando que la historia existe
 *
 * @param componentIdentifier - Nombre del componente, ID, o título
 * @param storyName - Nombre de la historia deseada (ej: "with-checkboxes" o "default")
 * @returns URL segura de Storybook (usa 'default' si la historia no existe)
 */
export async function buildSafeStorybookUrl(
	componentIdentifier: string,
	storyName: string = 'default',
): Promise<{
	url: string;
	storyUsed: string;
	storyExists: boolean;
	warning?: string;
}> {
	// ⚠️ CRÍTICO: Normalizar el identificador del componente primero
	// Esto asegura que alias comunes (como "entrada-input") se mapeen correctamente
	let normalizedIdentifier = componentIdentifier;

	// Si el identificador está directamente en COMPONENT_STORIES_PATH_MAP, usarlo directamente
	if (COMPONENT_STORIES_PATH_MAP[componentIdentifier]) {
		normalizedIdentifier = componentIdentifier;
	} else {
		// Si no está en el mapeo de rutas, buscar si está en el mapeo de títulos a IDs
		// y encontrar el título correcto que sí esté en COMPONENT_STORIES_PATH_MAP
		const mappedId = COMPONENT_TITLE_TO_ID_MAP[componentIdentifier];
		if (mappedId) {
			// Buscar el título correcto que tenga este ID y esté en COMPONENT_STORIES_PATH_MAP
			const correctTitle = Object.keys(COMPONENT_STORIES_PATH_MAP).find(
				(title) => COMPONENT_TITLE_TO_ID_MAP[title] === mappedId,
			);
			if (correctTitle) {
				normalizedIdentifier = correctTitle;
			}
		}
	}

	// Verificar historias disponibles
	const storyInfo = await verifyAvailableStories(normalizedIdentifier);

	if (!storyInfo) {
		// ⚠️ CRÍTICO: NO usar fallback de UBITS
		// Usar SOLO el Storybook activo del StorybookManager
		try {
			const { StorybookManager } = await import('./storybookManager');
			const { mapComponentNameToStorybookId } = await import('./storybookStories');
			const manager = StorybookManager.getInstance();
			const activeConfig = await manager.getActiveConfig();

			if (!activeConfig) {
				throw new Error(
					`❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`,
				);
			}

			// Obtener ID del componente desde el Storybook activo
			const componentId = await mapComponentNameToStorybookId(componentIdentifier);

			// Construir URL usando el Storybook activo (priorizando /docs/)
			const path = `?path=/docs/${componentId}--docs`;
			const url = await manager.buildStorybookUrl(path);

			console.warn(
				`⚠️ [Build Safe URL] No se pudo verificar historias para ${componentIdentifier}. Usando /docs/ del Storybook activo.`,
			);

			return {
				url,
				storyUsed: 'docs',
				storyExists: false,
				warning: `No se pudo verificar historias. Usando /docs/ del Storybook activo.`,
			};
		} catch (error: any) {
			// ⚠️ CRÍTICO: NO usar fallback de UBITS
			// Lanzar error en lugar de usar fallback
			throw new Error(
				`❌ No se pudo construir URL para ${componentIdentifier} desde el Storybook activo. ${error.message}`,
			);
		}
	}

	// Normalizar nombre de historia (convertir a kebab-case si es necesario)
	const normalizedStoryName = storyName.toLowerCase();

	// Verificar si la historia existe
	const storyExists = storyInfo.availableStories.some((s) => s.name === normalizedStoryName);

	// Usar la historia deseada si existe, sino usar 'default'
	const safeStoryName = storyExists ? normalizedStoryName : 'default';

	// ⚠️ CRÍTICO: NO usar URL hardcodeada de UBITS
	// Usar SOLO el Storybook activo del StorybookManager
	try {
		const { StorybookManager } = await import('./storybookManager');
		const manager = StorybookManager.getInstance();
		const activeConfig = await manager.getActiveConfig();

		if (!activeConfig) {
			throw new Error(
				`❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`,
			);
		}

		// Construir URL usando el Storybook activo
		const encodedComponentId = encodeURIComponent(storyInfo.componentId);
		const path = `?path=/story/${encodedComponentId}--${safeStoryName}`;
		const url = await manager.buildStorybookUrl(path);

		let warning: string | undefined;
		if (!storyExists && storyName !== 'default') {
			warning = `Historia '${storyName}' no existe para ${componentIdentifier}. Usando 'default' en su lugar. Historias disponibles: ${storyInfo.availableStories.map((s) => s.name).join(', ')}`;
			console.warn(`⚠️ [Build Safe URL] ${warning}`);
		}

		return {
			url,
			storyUsed: safeStoryName,
			storyExists,
			warning,
		};
	} catch (error: any) {
		// ⚠️ CRÍTICO: NO usar fallback de UBITS
		// Lanzar error en lugar de usar fallback
		throw new Error(
			`❌ No se pudo construir URL para ${componentIdentifier} desde el Storybook activo. ${error.message}`,
		);
	}
}

/**
 * Verifica si una historia específica existe
 *
 * @param componentIdentifier - Nombre del componente, ID, o título
 * @param storyName - Nombre de la historia a verificar
 * @returns true si la historia existe, false si no
 */
export async function storyExists(
	componentIdentifier: string,
	storyName: string,
): Promise<boolean> {
	const storyInfo = await verifyAvailableStories(componentIdentifier);

	if (!storyInfo) {
		return false;
	}

	const normalizedStoryName = storyName.toLowerCase();
	return storyInfo.availableStories.some((s) => s.name === normalizedStoryName);
}

/**
 * Obtiene todas las historias disponibles para un componente
 *
 * @param componentIdentifier - Nombre del componente, ID, o título
 * @returns Array de nombres de historias disponibles
 */
export async function getAvailableStoryNames(componentIdentifier: string): Promise<string[]> {
	const storyInfo = await verifyAvailableStories(componentIdentifier);

	if (!storyInfo) {
		return ['default']; // Fallback
	}

	return storyInfo.availableStories.map((s) => s.name);
}
