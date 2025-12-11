#!/usr/bin/env node
/**
 * Script para identificar automáticamente el template existente
 * basado en módulo y producto
 */

import { readdir } from 'fs/promises';
import { join } from 'path';

async function identifyTemplate(module, product, template = 'administrador') {
	const prototypesDir = join(process.cwd(), 'prototypes');

	try {
		const files = await readdir(prototypesDir);

		// Patrón: canvas-{template}-{module}-{date}.html
		// Ejemplo: canvas-administrador-encuestas-2025-12-02.html

		const pattern = new RegExp(`canvas-${template}-${module}-\\d{4}-\\d{2}-\\d{2}\\.html`);
		const matchingFiles = files.filter((file) => pattern.test(file));

		if (matchingFiles.length > 0) {
			// Ordenar por fecha (más reciente primero)
			matchingFiles.sort().reverse();
			const templatePath = join(prototypesDir, matchingFiles[0]);
			return {
				found: true,
				path: templatePath,
				fileName: matchingFiles[0],
				allMatches: matchingFiles,
			};
		}

		// Si no encuentra con el patrón exacto, buscar cualquier template del módulo
		const fallbackPattern = new RegExp(`canvas-.*-${module}-.*\\.html`);
		const fallbackFiles = files.filter((file) => fallbackPattern.test(file));

		if (fallbackFiles.length > 0) {
			fallbackFiles.sort().reverse();
			const templatePath = join(prototypesDir, fallbackFiles[0]);
			return {
				found: true,
				path: templatePath,
				fileName: fallbackFiles[0],
				allMatches: fallbackFiles,
				note: 'Template encontrado con patrón flexible',
			};
		}

		return {
			found: false,
			message: `No se encontró template para módulo "${module}" y template "${template}"`,
		};
	} catch (error) {
		return {
			found: false,
			error: error.message,
		};
	}
}

// Si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
	const module = process.argv[2] || 'encuestas';
	const template = process.argv[3] || 'administrador';

	identifyTemplate(module, null, template).then((result) => {
		if (result.found) {
			console.log(JSON.stringify(result, null, 2));
		} else {
			console.error(result.message || result.error);
			process.exit(1);
		}
	});
}

export { identifyTemplate };



