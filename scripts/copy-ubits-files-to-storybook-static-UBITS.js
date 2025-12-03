#!/usr/bin/env node
/**
 * Script para copiar archivos necesarios de UBITS a storybook-static/
 *
 * Este script copia templates, CSS, JS, tokens y assets al directorio
 * storybook-static/ para que estén disponibles en el despliegue de Vercel.
 *
 * Uso desde la raíz del repositorio UBITS:
 *   node scripts/copy-ubits-files-to-storybook-static.js
 *
 * O desde packages/storybook:
 *   node ../../scripts/copy-ubits-files-to-storybook-static.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colores para output
const colors = {
	reset: '\x1b[0m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	blue: '\x1b[34m',
};

function log(message, color = 'reset') {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

function copyFile(src, dest) {
	try {
		// Crear directorio destino si no existe
		const destDir = path.dirname(dest);
		if (!fs.existsSync(destDir)) {
			fs.mkdirSync(destDir, { recursive: true });
		}

		// Copiar archivo
		fs.copyFileSync(src, dest);
		return true;
	} catch (error) {
		log(`   ❌ Error copiando ${src}: ${error.message}`, 'red');
		return false;
	}
}

function copyDirectory(src, dest) {
	try {
		if (!fs.existsSync(src)) {
			log(`   ⚠️  Directorio no existe: ${src}`, 'yellow');
			return false;
		}

		// Crear directorio destino
		if (!fs.existsSync(dest)) {
			fs.mkdirSync(dest, { recursive: true });
		}

		// Copiar archivos recursivamente
		const files = fs.readdirSync(src);
		let copied = 0;

		for (const file of files) {
			const srcPath = path.join(src, file);
			const destPath = path.join(dest, file);
			const stat = fs.statSync(srcPath);

			if (stat.isDirectory()) {
				copyDirectory(srcPath, destPath);
				copied++;
			} else {
				if (copyFile(srcPath, destPath)) {
					copied++;
				}
			}
		}

		return copied > 0;
	} catch (error) {
		log(`   ❌ Error copiando directorio ${src}: ${error.message}`, 'red');
		return false;
	}
}

async function main() {
	log('\n📦 Copiando archivos UBITS a storybook-static/...\n', 'blue');

	// Determinar rutas base desde la raíz del repositorio UBITS
	// El script puede ejecutarse desde:
	// 1. Raíz del repo UBITS: scripts/copy-ubits-files-to-storybook-static.js
	// 2. packages/storybook: ../../scripts/copy-ubits-files-to-storybook-static.js

	let projectRoot = __dirname;

	// Si estamos en scripts/, la raíz es el padre
	if (path.basename(projectRoot) === 'scripts') {
		projectRoot = path.dirname(projectRoot);
	}
	// Si estamos en packages/storybook, subir 2 niveles
	else if (projectRoot.includes('packages/storybook')) {
		projectRoot = path.resolve(projectRoot, '../..');
	}

	const packagesPath = path.join(projectRoot, 'packages');
	const storybookStaticPath = path.join(packagesPath, 'storybook', 'storybook-static');

	// Verificar que existe packages/
	if (!fs.existsSync(packagesPath)) {
		log(`❌ Error: No se encontró el directorio packages/ en ${projectRoot}`, 'red');
		log(`   Asegúrate de ejecutar el script desde la raíz del repositorio UBITS`, 'yellow');
		process.exit(1);
	}

	// Verificar que existe storybook-static/
	if (!fs.existsSync(storybookStaticPath)) {
		log(`❌ Error: No se encontró storybook-static/ en ${storybookStaticPath}`, 'red');
		log(`   Ejecuta primero: cd packages/storybook && npm run build-storybook`, 'yellow');
		process.exit(1);
	}

	log(`✅ Directorio UBITS encontrado: ${packagesPath}`, 'green');
	log(`✅ storybook-static encontrado: ${storybookStaticPath}\n`, 'green');

	const filesToCopy = [
		// Templates HTML
		{ src: 'templates/template-admin.html', dest: 'templates/template-admin.html' },
		{ src: 'templates/template-colaborador.html', dest: 'templates/template-colaborador.html' },

		// Tokens
		{ src: 'tokens/dist/tokens.css', dest: 'tokens/dist/tokens.css' },
		{ src: 'tokens/dist/figma-tokens.css', dest: 'tokens/dist/figma-tokens.css' },

		// Typography
		{ src: 'typography/fonts.css', dest: 'typography/fonts.css' },
		{ src: 'typography/tokens-typography.css', dest: 'typography/tokens-typography.css' },

		// Scripts de templates
		{ src: 'templates/components-loader.js', dest: 'templates/components-loader.js' },
		{ src: 'templates/config/products.js', dest: 'templates/config/products.js' },
		{ src: 'templates/config/theme-manager.js', dest: 'templates/config/theme-manager.js' },
		{
			src: 'templates/config/responsive-manager.js',
			dest: 'templates/config/responsive-manager.js',
		},
		{ src: 'templates/engine/template-loader.js', dest: 'templates/engine/template-loader.js' },
		{ src: 'templates/engine/content-manager.js', dest: 'templates/engine/content-manager.js' },

		// Assets (FontAwesome, imágenes)
		{ src: 'templates/assets', dest: 'templates/assets', recursive: true },

		// UMD de data-table (si existe)
		{
			src: 'components/data-table/dist/data-table.umd.js',
			dest: 'components/data-table/dist/data-table.umd.js',
			optional: true,
		},
	];

	let copiedCount = 0;

	console.log('\n📄 Copiando templates HTML...');
	for (const file of filesToCopy.filter(
		(f) => f.dest.startsWith('templates/') && f.dest.endsWith('.html'),
	)) {
		const srcPath = path.join(packagesPath, file.src);
		const destPath = path.join(storybookStaticPath, file.dest);
		if (fs.existsSync(srcPath)) {
			copyFile(srcPath, destPath);
			copiedCount++;
		} else {
			log(`   ⚠️  No encontrado: ${file.src}`, 'yellow');
		}
	}

	console.log('\n🎨 Copiando tokens...');
	for (const file of filesToCopy.filter((f) => f.dest.startsWith('tokens/dist/'))) {
		const srcPath = path.join(packagesPath, file.src);
		const destPath = path.join(storybookStaticPath, file.dest);
		if (fs.existsSync(srcPath)) {
			copyFile(srcPath, destPath);
			copiedCount++;
		} else {
			log(`   ⚠️  No encontrado: ${file.src}`, 'yellow');
		}
	}

	console.log('\n📝 Copiando typography...');
	for (const file of filesToCopy.filter((f) => f.dest.startsWith('typography/'))) {
		const srcPath = path.join(packagesPath, file.src);
		const destPath = path.join(storybookStaticPath, file.dest);
		if (fs.existsSync(srcPath)) {
			copyFile(srcPath, destPath);
			copiedCount++;
		} else {
			log(`   ⚠️  No encontrado: ${file.src}`, 'yellow');
		}
	}

	console.log('\n🎨 Copiando CSS de componentes...');
	const componentsDir = path.join(packagesPath, 'components');
	if (fs.existsSync(componentsDir)) {
		const componentEntries = fs.readdirSync(componentsDir, { withFileTypes: true });
		for (const entry of componentEntries) {
			if (entry.isDirectory()) {
				const componentSrcStylesPath = path.join(componentsDir, entry.name, 'src', 'styles');
				const destComponentStylesPath = path.join(
					storybookStaticPath,
					'components',
					entry.name,
					'src',
					'styles',
				);
				if (fs.existsSync(componentSrcStylesPath)) {
					log(`   ✅ ${entry.name}/src/styles/`, 'green');
					copyDirectory(componentSrcStylesPath, destComponentStylesPath);
					copiedCount++;
				}
			}
		}
	}

	console.log('\n📜 Copiando scripts de templates...');
	for (const file of filesToCopy.filter(
		(f) => f.dest.startsWith('templates/') && f.dest.endsWith('.js'),
	)) {
		const srcPath = path.join(packagesPath, file.src);
		const destPath = path.join(storybookStaticPath, file.dest);
		if (fs.existsSync(srcPath)) {
			copyFile(srcPath, destPath);
			copiedCount++;
		} else {
			log(`   ⚠️  No encontrado: ${file.src}`, 'yellow');
		}
	}

	// Copiar carpetas de configuración y engine
	const configSrc = path.join(packagesPath, 'templates', 'config');
	const configDest = path.join(storybookStaticPath, 'templates', 'config');
	if (fs.existsSync(configSrc)) {
		copyDirectory(configSrc, configDest);
		copiedCount++;
	}

	const engineSrc = path.join(packagesPath, 'templates', 'engine');
	const engineDest = path.join(storybookStaticPath, 'templates', 'engine');
	if (fs.existsSync(engineSrc)) {
		copyDirectory(engineSrc, engineDest);
		copiedCount++;
	}

	console.log('\n🖼️  Copiando assets...');
	const assetsToCopy = filesToCopy.find((f) => f.src === 'templates/assets');
	if (assetsToCopy) {
		const assetsSrc = path.join(packagesPath, assetsToCopy.src);
		const assetsDest = path.join(storybookStaticPath, assetsToCopy.dest);
		if (fs.existsSync(assetsSrc)) {
			copyDirectory(assetsSrc, assetsDest);
			copiedCount++;
		}
	}

	console.log('\n📦 Copiando UMD de data-table...');
	const dataTableUmd = filesToCopy.find(
		(f) => f.src === 'components/data-table/dist/data-table.umd.js',
	);
	if (dataTableUmd) {
		const srcPath = path.join(packagesPath, dataTableUmd.src);
		const destPath = path.join(storybookStaticPath, dataTableUmd.dest);
		if (fs.existsSync(srcPath)) {
			copyFile(srcPath, destPath);
			copiedCount++;
		} else {
			if (!dataTableUmd.optional) {
				log(`   ⚠️  data-table.umd.js no encontrado (opcional)`, 'yellow');
			}
		}
	}

	console.log('\n==================================================');
	log(`✅ Archivos copiados: ${copiedCount}`, 'green');
	console.log('==================================================');
	console.log('\n🎉 ¡Todos los archivos copiados exitosamente!');
	console.log('   💡 Ahora puedes hacer build y deploy de Storybook a Vercel\n');
}

main().catch(console.error);
