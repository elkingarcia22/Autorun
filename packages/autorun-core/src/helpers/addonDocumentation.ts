/**
 * Add-on Documentation Generator
 *
 * Genera documentación automática de add-ons desde manifest.json
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface AddonDocumentation {
	id: string;
	name: string;
	description: string;
	version: string;
	services: string[];
	configuration?: Record<string, any>;
	examples?: string[];
}

/**
 * Genera documentación automática de un add-on desde su manifest.json
 */
export async function generateAddonDocumentation(
	addonPath: string,
): Promise<AddonDocumentation | null> {
	try {
		const manifestPath = path.join(addonPath, 'manifest.json');
		const manifestContent = await fs.readFile(manifestPath, 'utf-8');
		const manifest = JSON.parse(manifestContent);

		// Leer código fuente para extraer servicios
		const services = await extractServicesFromAddon(addonPath, manifest.id);

		return {
			id: manifest.id || path.basename(addonPath),
			name: manifest.name || manifest.id || path.basename(addonPath),
			description: manifest.description || '',
			version: manifest.version || '1.0.0',
			services,
			configuration: manifest.config || {},
		};
	} catch (error) {
		console.warn(`⚠️ No se pudo generar documentación para add-on en ${addonPath}:`, error);
		return null;
	}
}

/**
 * Extrae servicios expuestos por un add-on desde su código fuente
 */
async function extractServicesFromAddon(addonPath: string, addonId: string): Promise<string[]> {
	const services: string[] = [];

	try {
		const srcPath = path.join(addonPath, 'src');
		const addonFile = path.join(
			srcPath,
			`${addonId.charAt(0).toUpperCase() + addonId.slice(1)}Addon.ts`,
		);

		try {
			const content = await fs.readFile(addonFile, 'utf-8');

			// Buscar método getServices()
			const getServicesMatch = content.match(/getServices\(\)[^{]*\{([^}]+)\}/s);
			if (getServicesMatch) {
				const servicesContent = getServicesMatch[1];

				// Extraer nombres de servicios (patrón: serviceName:)
				const serviceMatches = servicesContent.matchAll(/(\w+):\s*(?:async\s*)?\(/g);
				for (const match of serviceMatches) {
					services.push(match[1]);
				}
			}
		} catch {
			// Archivo no encontrado o no se puede leer
		}
	} catch {
		// src/ no existe
	}

	return services;
}

/**
 * Genera README automático para un add-on
 */
export async function generateAddonREADME(
	doc: AddonDocumentation,
	addonPath: string,
): Promise<string> {
	let readme = `# ${doc.name}\n\n`;
	readme += `${doc.description}\n\n`;
	readme += `---\n\n`;

	readme += `## 📋 Información\n\n`;
	readme += `- **ID:** \`${doc.id}\`\n`;
	readme += `- **Versión:** ${doc.version}\n`;
	readme += `- **Tipo:** Functional Add-on\n\n`;

	if (doc.services.length > 0) {
		readme += `## 🔌 Servicios Disponibles\n\n`;
		doc.services.forEach((service) => {
			readme += `### \`${service}\`\n\n`;
			readme += `_Descripción pendiente_\n\n`;
		});
	}

	if (doc.configuration && Object.keys(doc.configuration).length > 0) {
		readme += `## ⚙️ Configuración\n\n`;
		readme += `\`\`\`json\n${JSON.stringify(doc.configuration, null, 2)}\n\`\`\`\n\n`;
	}

	readme += `---\n\n`;
	readme += `**Última actualización:** ${new Date().toISOString().split('T')[0]}\n`;
	readme += `**Generado automáticamente**\n`;

	return readme;
}

/**
 * Genera README para todos los add-ons descubiertos
 */
export async function generateAllAddonsDocumentation(): Promise<void> {
	const { discoverAvailableAddons } = await import('./discoverAndRegisterAddons');
	const addons = await discoverAvailableAddons();

	console.log(`\n📚 Generando documentación para ${addons.length} add-ons...\n`);

	for (const addon of addons) {
		const doc = await generateAddonDocumentation(addon.path);
		if (doc) {
			const readme = await generateAddonREADME(doc, addon.path);
			const readmePath = path.join(addon.path, 'README.md');

			// Solo generar si no existe o está desactualizado
			try {
				const existingReadme = await fs.readFile(readmePath, 'utf-8');
				if (existingReadme.includes('**Generado automáticamente**')) {
					await fs.writeFile(readmePath, readme, 'utf-8');
					console.log(`✅ README generado: ${addon.name}`);
				} else {
					console.log(`⏭️ README manual existe: ${addon.name} (no sobrescribir)`);
				}
			} catch {
				// No existe, crear nuevo
				await fs.writeFile(readmePath, readme, 'utf-8');
				console.log(`✅ README generado: ${addon.name}`);
			}
		}
	}

	console.log(`\n✅ Documentación generada para todos los add-ons\n`);
}



