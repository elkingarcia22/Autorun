#!/usr/bin/env node
/**
 * Script para copiar archivos necesarios de UBITS a storybook-static/
 *
 * Este script copia templates, CSS, JS, tokens y assets al directorio
 * storybook-static/ para que estén disponibles en el despliegue de Vercel.
 *
 * Uso:
 *   node scripts/copy-ubits-files-to-storybook-static.js
 *
 * O desde el proyecto UBITS:
 *   cd vendor/ubits/packages/storybook
 *   node ../../../../scripts/copy-ubits-files-to-storybook-static.js
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

	// Determinar rutas base
	// Si se ejecuta desde Autorun/scripts/
	let ubitsRoot = path.join(__dirname, '..', 'vendor', 'ubits', 'packages');

	// Si no existe, intentar desde proyecto UBITS directamente
	if (!fs.existsSync(ubitsRoot)) {
		ubitsRoot = path.join(__dirname, '..', '..', 'packages');
	}

	// Si aún no existe, intentar desde Desktop/UBITS
	if (!fs.existsSync(ubitsRoot)) {
		const os = await import('os');
		ubitsRoot = path.join(os.default.homedir(), 'Desktop', 'UBITS', 'packages');
	}

	if (!fs.existsSync(ubitsRoot)) {
		log('❌ No se encontró el directorio de UBITS', 'red');
		log('   💡 Asegúrate de que vendor/ubits/packages/ existe o Desktop/UBITS/packages/', 'yellow');
		process.exit(1);
	}

	log(`✅ Directorio UBITS encontrado: ${ubitsRoot}`, 'green');

	const storybookStatic = path.join(ubitsRoot, 'storybook', 'storybook-static');

	if (!fs.existsSync(storybookStatic)) {
		log('❌ No se encontró storybook-static/', 'red');
		log('   💡 Ejecuta primero: npm run build-storybook', 'yellow');
		process.exit(1);
	}

	log(`✅ storybook-static encontrado: ${storybookStatic}\n`, 'green');

	let totalCopied = 0;
	let totalErrors = 0;

	// 1. Copiar templates HTML
	log('📄 Copiando templates HTML...', 'blue');
	const templatesSrc = path.join(ubitsRoot, 'templates');
	const templatesDest = path.join(storybookStatic, 'templates');

	if (fs.existsSync(templatesSrc)) {
		const templateFiles = ['template-admin.html', 'template-colaborador.html'];
		for (const file of templateFiles) {
			const src = path.join(templatesSrc, file);
			const dest = path.join(templatesDest, file);
			if (fs.existsSync(src)) {
				if (copyFile(src, dest)) {
					log(`   ✅ ${file}`, 'green');
					totalCopied++;
				} else {
					totalErrors++;
				}
			} else {
				log(`   ⚠️  ${file} no encontrado`, 'yellow');
			}
		}
	} else {
		log('   ⚠️  Directorio templates/ no encontrado', 'yellow');
	}

	// 2. Copiar tokens
	log('\n🎨 Copiando tokens...', 'blue');
	const tokensSrc = path.join(ubitsRoot, 'tokens', 'dist');
	const tokensDest = path.join(storybookStatic, 'tokens', 'dist');

	if (fs.existsSync(tokensSrc)) {
		const tokenFiles = ['tokens.css', 'figma-tokens.css'];
		for (const file of tokenFiles) {
			const src = path.join(tokensSrc, file);
			const dest = path.join(tokensDest, file);
			if (fs.existsSync(src)) {
				if (copyFile(src, dest)) {
					log(`   ✅ ${file}`, 'green');
					totalCopied++;
				} else {
					totalErrors++;
				}
			} else {
				log(`   ⚠️  ${file} no encontrado`, 'yellow');
			}
		}
	} else {
		log('   ⚠️  Directorio tokens/dist/ no encontrado', 'yellow');
	}

	// 3. Copiar typography
	log('\n📝 Copiando typography...', 'blue');
	const typographySrc = path.join(ubitsRoot, 'typography');
	const typographyDest = path.join(storybookStatic, 'typography');

	if (fs.existsSync(typographySrc)) {
		const typographyFiles = ['fonts.css', 'tokens-typography.css'];
		for (const file of typographyFiles) {
			const src = path.join(typographySrc, file);
			const dest = path.join(typographyDest, file);
			if (fs.existsSync(src)) {
				if (copyFile(src, dest)) {
					log(`   ✅ ${file}`, 'green');
					totalCopied++;
				} else {
					totalErrors++;
				}
			} else {
				log(`   ⚠️  ${file} no encontrado`, 'yellow');
			}
		}
	} else {
		log('   ⚠️  Directorio typography/ no encontrado', 'yellow');
	}

	// 4. Copiar CSS de componentes
	log('\n🎨 Copiando CSS de componentes...', 'blue');
	const componentsSrc = path.join(ubitsRoot, 'components');
	const componentsDest = path.join(storybookStatic, 'components');

	if (fs.existsSync(componentsSrc)) {
		const componentDirs = fs.readdirSync(componentsSrc).filter((dir) => {
			const dirPath = path.join(componentsSrc, dir);
			return fs.statSync(dirPath).isDirectory();
		});

		for (const componentDir of componentDirs) {
			const stylesSrc = path.join(componentsSrc, componentDir, 'src', 'styles');
			if (fs.existsSync(stylesSrc)) {
				const stylesDest = path.join(componentsDest, componentDir, 'src', 'styles');
				if (copyDirectory(stylesSrc, stylesDest)) {
					log(`   ✅ ${componentDir}/src/styles/`, 'green');
					totalCopied++;
				} else {
					totalErrors++;
				}
			}
		}
	} else {
		log('   ⚠️  Directorio components/ no encontrado', 'yellow');
	}

	// 5. Copiar scripts de templates
	log('\n📜 Copiando scripts de templates...', 'blue');
	const templateScripts = [
		'components-loader.js',
		'config/products.js',
		'config/theme-manager.js',
		'config/responsive-manager.js',
		'engine/template-loader.js',
		'engine/content-manager.js',
	];

	for (const script of templateScripts) {
		const src = path.join(templatesSrc, script);
		const dest = path.join(templatesDest, script);
		if (fs.existsSync(src)) {
			if (copyFile(src, dest)) {
				log(`   ✅ ${script}`, 'green');
				totalCopied++;
			} else {
				totalErrors++;
			}
		} else {
			log(`   ⚠️  ${script} no encontrado`, 'yellow');
		}
	}

	// 6. Copiar assets
	log('\n🖼️  Copiando assets...', 'blue');
	const assetsSrc = path.join(templatesSrc, 'assets');
	const assetsDest = path.join(templatesDest, 'assets');

	if (fs.existsSync(assetsSrc)) {
		if (copyDirectory(assetsSrc, assetsDest)) {
			log(`   ✅ assets/`, 'green');
			totalCopied++;
		} else {
			totalErrors++;
		}
	} else {
		log('   ⚠️  Directorio assets/ no encontrado', 'yellow');
	}

	// 7. Copiar UMD de data-table
	log('\n📦 Copiando UMD de data-table...', 'blue');
	const dataTableUMDSrc = path.join(componentsSrc, 'data-table', 'dist', 'data-table.umd.js');
	const dataTableUMDDest = path.join(componentsDest, 'data-table', 'dist', 'data-table.umd.js');

	if (fs.existsSync(dataTableUMDSrc)) {
		if (copyFile(dataTableUMDSrc, dataTableUMDDest)) {
			log(`   ✅ data-table.umd.js`, 'green');
			totalCopied++;
		} else {
			totalErrors++;
		}
	} else {
		log('   ⚠️  data-table.umd.js no encontrado', 'yellow');
	}

	// Resumen
	log('\n' + '='.repeat(50), 'blue');
	log(`✅ Archivos copiados: ${totalCopied}`, 'green');
	if (totalErrors > 0) {
		log(`❌ Errores: ${totalErrors}`, 'red');
	}
	log('='.repeat(50) + '\n', 'blue');

	if (totalErrors === 0) {
		log('🎉 ¡Todos los archivos copiados exitosamente!', 'green');
		log('   💡 Ahora puedes hacer build y deploy de Storybook a Vercel', 'blue');
		process.exit(0);
	} else {
		log('⚠️  Algunos archivos no se pudieron copiar', 'yellow');
		process.exit(1);
	}
}

main();
