#!/usr/bin/env ts-node

/**
 * Script para generar inventario completo de componentes de Storybook
 *
 * Uso:
 *   npm run generate-storybook-inventory
 *   o
 *   ts-node scripts/generate-storybook-inventory.ts
 */

import { generateComponentInventory } from '../packages/autorun-core/src/helpers/storybookIdDiscovery';
import * as fs from 'fs/promises';
import * as path from 'path';

async function main() {
	console.log('📚 Generando inventario de componentes de Storybook...\n');

	try {
		// Generar inventario
		const inventory = await generateComponentInventory();

		// Guardar en archivo
		const outputPath = path.join(
			process.cwd(),
			'docs/referencia/INVENTARIO-COMPONENTES-STORYBOOK.md',
		);
		await fs.writeFile(outputPath, inventory, 'utf-8');

		console.log(`✅ Inventario generado: ${outputPath}`);
		console.log(`\n${inventory}`);
	} catch (error: any) {
		console.error('❌ Error generando inventario:', error);
		process.exit(1);
	}
}

main();
