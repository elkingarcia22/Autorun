#!/usr/bin/env node

/**
 * Script de verificación de UBITS en vendor/
 * Verifica que todos los archivos críticos de UBITS estén presentes
 */

import { existsSync, accessSync, constants } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const vendorUbitsPath = join(projectRoot, 'vendor', 'ubits', 'packages');

const criticalFiles = [
	'tokens/dist/tokens.css',
	'tokens/dist/figma-tokens.css',
	'templates/components-loader.js',
	'templates/config/products.js',
	'templates/config/theme-manager.js',
	'templates/config/responsive-manager.js',
	'templates/engine/template-loader.js',
	'templates/engine/content-manager.js',
	'components/sidebar/src/styles/sidebar.css',
	'components/subnav/src/styles/subnav.css',
	'components/tabbar/src/styles/tabbar.css',
	'components/tabs/src/styles/tabs.css',
	'components/tabs/src/TabsProvider.ts',
	'components/data-table/src/styles/data-table.css',
	'components/data-table/dist/data-table.umd.js',
	'typography/fonts.css',
	'typography/tokens-typography.css',
];

const criticalComponents = [
	'sidebar',
	'subnav',
	'tabbar',
	'tabs',
	'data-table',
	'button',
	'input',
	'alert',
	'card',
	'modal',
];

console.log('🔍 Verificando UBITS en vendor/ubits/packages/...\n');

// Verificar que existe vendor/ubits/packages/
if (!existsSync(vendorUbitsPath)) {
	console.error('❌ ERROR: No se encontró vendor/ubits/packages/');
	console.error(`   Ruta esperada: ${vendorUbitsPath}`);
	console.error('\n💡 Solución:');
	console.error('   1. Asegúrate de que UBITS está copiado en vendor/ubits/');
	console.error('   2. O ejecuta: cp -r /Users/elkinmac/Desktop/UBITS/packages vendor/ubits/');
	process.exit(1);
}

console.log('✅ vendor/ubits/packages/ existe\n');

// Verificar archivos críticos
const missingFiles = [];
const existingFiles = [];

for (const file of criticalFiles) {
	const filePath = join(vendorUbitsPath, file);
	try {
		accessSync(filePath, constants.F_OK);
		existingFiles.push(file);
	} catch {
		missingFiles.push(file);
	}
}

// Verificar componentes críticos
const missingComponents = [];
for (const component of criticalComponents) {
	const componentPath = join(vendorUbitsPath, 'components', component);
	if (!existsSync(componentPath)) {
		missingComponents.push(component);
	}
}

// Mostrar resultados
console.log('📋 Archivos críticos:');
console.log(`   ✅ Encontrados: ${existingFiles.length}/${criticalFiles.length}`);
if (missingFiles.length > 0) {
	console.log(`   ❌ Faltantes: ${missingFiles.length}`);
	missingFiles.forEach((file) => console.log(`      - ${file}`));
}

console.log('\n📦 Componentes críticos:');
console.log(
	`   ✅ Encontrados: ${criticalComponents.length - missingComponents.length}/${criticalComponents.length}`,
);
if (missingComponents.length > 0) {
	console.log(`   ❌ Faltantes: ${missingComponents.length}`);
	missingComponents.forEach((component) => console.log(`      - ${component}`));
}

// Verificar que components-loader.js tiene createTabs
if (existingFiles.includes('templates/components-loader.js')) {
	const componentsLoaderPath = join(vendorUbitsPath, 'templates', 'components-loader.js');
	const fs = await import('fs/promises');
	const content = await fs.readFile(componentsLoaderPath, 'utf-8');

	const hasCreateTabs = content.includes('window.createTabs') || content.includes('createTabs');
	const hasCreateDataTable = content.includes('createDataTable');

	console.log('\n🔧 Funciones en components-loader.js:');
	console.log(`   ${hasCreateTabs ? '✅' : '❌'} window.createTabs`);
	console.log(`   ${hasCreateDataTable ? '✅' : '⚠️'} createDataTable (cargado desde UMD)`);

	if (!hasCreateTabs) {
		console.warn('\n   ⚠️  ADVERTENCIA: window.createTabs no encontrado en components-loader.js');
		console.warn('      Debe agregarse manualmente o regenerarse el archivo');
	}
}

// Resumen final
if (missingFiles.length === 0 && missingComponents.length === 0) {
	console.log('\n✅ ¡Todo correcto! UBITS está completo en vendor/ubits/packages/');
	console.log('   Los templates generados funcionarán correctamente.\n');
	process.exit(0);
} else {
	console.error('\n❌ Hay archivos o componentes faltantes.');
	console.error('   Revisa los archivos listados arriba.\n');
	process.exit(1);
}
