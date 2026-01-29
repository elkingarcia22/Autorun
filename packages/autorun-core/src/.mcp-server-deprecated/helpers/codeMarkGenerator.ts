/**
 * Code Mark Generator
 *
 * Genera y parsea marcas Autorun en c?digo generado para auditor?a y verificaci?n.
 */

import { AutorunMarkMetadata } from '../types';
import * as crypto from 'crypto';

/**
 * Genera c?digo con marcas Autorun
 */
export function generateCodeWithAutorunMarks(
	code: string,
	componentName: string,
	componentId: string,
	story: string = 'default',
	version?: string,
	additionalMetadata?: {
		dependsOn?: { required: string[]; optional: string[] };
		internals?: string[];
	},
): string {
	const timestamp = new Date().toISOString();
	const hash = generateHash(code + componentId + story + timestamp);

	const metadata: AutorunMarkMetadata = {
		component: componentName,
		storybookId: componentId,
		story,
		hash,
		timestamp,
		version: version || '1.0.0',
	};

	const mark = generateAutorunMark(metadata, additionalMetadata);

	// Agregar marca al inicio y fin del c?digo
	return `${mark}\n${code}\n<!-- /AUTORUN -->`;
}

/**
 * Genera el comentario de marca Autorun (formato JSON para parsing robusto)
 */
function generateAutorunMark(
	metadata: AutorunMarkMetadata,
	additionalMetadata?: {
		dependsOn?: { required: string[]; optional: string[] };
		internals?: string[];
	},
): string {
	const jsonData: any = {
		components: [metadata.component],
		storybookId: metadata.storybookId,
		story: metadata.story,
		hash: metadata.hash,
		timestamp: metadata.timestamp,
		version: metadata.version,
	};

	// Agregar metadata de dependencias si est? disponible
	if (additionalMetadata) {
		if (additionalMetadata.dependsOn) {
			jsonData.dependsOn = additionalMetadata.dependsOn;
		}
		if (additionalMetadata.internals) {
			jsonData.internals = additionalMetadata.internals;
		}
	}

	return `<!-- AUTORUN: ${JSON.stringify(jsonData)} -->`;
}

/**
 * Genera hash simple del c?digo
 */
function generateHash(str: string): string {
	return crypto.createHash('sha256').update(str).digest('hex').substring(0, 16);
}

/**
 * Parsea marcas Autorun del c?digo (formato JSON - nuevo)
 */
export function parseAutorunMarks(code: string): AutorunMarkMetadata | null {
	// Buscar marca AUTORUN con formato JSON (nuevo formato)
	const jsonMarkRegex = /<!--\s*AUTORUN:\s*({[\s\S]*?})\s*-->/i;

	const jsonMatch = code.match(jsonMarkRegex);
	if (jsonMatch) {
		try {
			const jsonData = JSON.parse(jsonMatch[1]);
			const component = Array.isArray(jsonData.components)
				? jsonData.components[0]
				: jsonData.component || jsonData.components;

			return {
				component: component || 'unknown',
				storybookId: jsonData.storybookId || '',
				story: jsonData.story || 'default',
				hash: jsonData.hash || '',
				timestamp: jsonData.timestamp || '',
				version: jsonData.version || '1.0.0',
				dependsOn: jsonData.dependsOn || undefined,
				internals: jsonData.internals || undefined,
			};
		} catch (error) {
			// Si falla el parse JSON, continuar con formato antiguo
			console.warn('?? Error parseando formato JSON de watermark, intentando formato antiguo');
		}
	}

	// Fallback: Formato antiguo (AUTORUN-GENERATED)
	const oldMarkRegex =
		/<!--\s*AUTORUN-GENERATED[\s\S]*?component:\s*([^\n]+)[\s\S]*?storybookId:\s*([^\n]+)[\s\S]*?story:\s*([^\n]+)[\s\S]*?hash:\s*([^\n]+)[\s\S]*?timestamp:\s*([^\n]+)[\s\S]*?(?:version:\s*([^\n]+))?[\s\S]*?-->/i;

	const oldMatch = code.match(oldMarkRegex);
	if (!oldMatch) {
		return null;
	}

	return {
		component: oldMatch[1].trim(),
		storybookId: oldMatch[2].trim(),
		story: oldMatch[3].trim(),
		hash: oldMatch[4].trim(),
		timestamp: oldMatch[5].trim(),
		version: oldMatch[6]?.trim() || '1.0.0',
	};
}

/**
 * Verifica si el c?digo tiene marca Autorun
 */
export function hasAutorunMark(code: string): boolean {
	return /AUTORUN-GENERATED/i.test(code);
}

/**
 * Valida que el hash del c?digo coincida con la marca
 */
export function validateAutorunMark(code: string): {
	valid: boolean;
	reason?: string;
	metadata?: AutorunMarkMetadata;
} {
	const metadata = parseAutorunMarks(code);
	if (!metadata) {
		return {
			valid: false,
			reason: 'No se encontr? marca AUTORUN-GENERATED',
		};
	}

	// Extraer c?digo sin las marcas para validar hash
	const codeWithoutMarks = code
		.replace(/<!--\s*AUTORUN:[\s\S]*?-->\s*/i, '') // Remover marca de inicio
		.replace(/<!--\s*\/AUTORUN\s*-->\s*/i, ''); // Remover marca de cierre

	const expectedHash = generateHash(
		codeWithoutMarks + metadata.storybookId + metadata.story + metadata.timestamp,
	);

	if (metadata.hash !== expectedHash) {
		return {
			valid: false,
			reason: 'Hash del c?digo no coincide con la marca',
			metadata,
		};
	}

	return {
		valid: true,
		metadata,
	};
}
