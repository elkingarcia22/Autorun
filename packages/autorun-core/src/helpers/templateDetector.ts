/**
 * Template Detector
 *
 * Detecta automáticamente templates HTML en prototypes/ y determina
 * cuál debería estar abierto en el browser
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface TemplateInfo {
	fileName: string;
	filePath: string;
	httpUrl: string;
	lastModified: Date;
	size: number;
}

/**
 * Detectar templates HTML disponibles en prototypes/
 */
export async function detectAvailableTemplates(): Promise<TemplateInfo[]> {
	const prototypesDir = path.join(process.cwd(), 'prototypes');
	const templates: TemplateInfo[] = [];

	try {
		const files = await fs.readdir(prototypesDir);
		const htmlFiles = files.filter((file) => file.endsWith('.html'));

		for (const fileName of htmlFiles) {
			const filePath = path.join(prototypesDir, fileName);
			try {
				const stats = await fs.stat(filePath);
				const port = process.env.AUTORUN_PORT || 3000;
				const httpUrl = `http://localhost:${port}/${fileName}`;

				templates.push({
					fileName,
					filePath,
					httpUrl,
					lastModified: stats.mtime,
					size: stats.size,
				});
			} catch (error) {
				// Ignorar errores de archivos individuales
				console.warn(`⚠️ [Template Detector] Error leyendo ${fileName}:`, error);
			}
		}

		// Ordenar por fecha de modificación (más reciente primero)
		templates.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
	} catch (error) {
		console.warn(`⚠️ [Template Detector] Error leyendo directorio prototypes/:`, error);
	}

	return templates;
}

/**
 * Obtener el template más reciente (probablemente el que está abierto)
 */
export async function getMostRecentTemplate(): Promise<TemplateInfo | null> {
	const templates = await detectAvailableTemplates();
	return templates.length > 0 ? templates[0] : null;
}

/**
 * Detectar si hay un template que debería estar abierto
 * Basado en:
 * 1. Template más reciente
 * 2. Archivo de estado del wizard (si existe)
 * 3. URL actual del browser (si está disponible)
 */
export async function detectTemplateToOpen(): Promise<{
	template: TemplateInfo | null;
	url: string | null;
	source: 'wizard-state' | 'most-recent' | 'browser-current' | null;
}> {
	// 1. Verificar archivo de estado del wizard (prioridad máxima)
	try {
		const { readWizardState, hasWizardState } = await import('./wizardStateDetector');
		if (await hasWizardState()) {
			const state = await readWizardState();
			if (state && state.url) {
				console.log(`📋 [Template Detector] Template detectado desde wizard state: ${state.url}`);
				return {
					template: null,
					url: state.url,
					source: 'wizard-state',
				};
			}
		}
	} catch (error) {
		// Continuar con otros métodos
	}

	// 2. Obtener template más reciente
	const mostRecent = await getMostRecentTemplate();
	if (mostRecent) {
		console.log(`📋 [Template Detector] Template más reciente detectado: ${mostRecent.fileName}`);
		return {
			template: mostRecent,
			url: mostRecent.httpUrl,
			source: 'most-recent',
		};
	}

	return {
		template: null,
		url: null,
		source: null,
	};
}
