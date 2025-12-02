#!/usr/bin/env node
/**
 * Script para ejecutar el wizard de Autorun desde cualquier directorio del proyecto
 * Busca automáticamente el directorio Autorun y ejecuta npm run init
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Busca el directorio Autorun desde el directorio actual hacia arriba
 */
function findAutorunDir() {
	let currentDir = process.cwd();
	
	// Buscar hacia arriba desde el directorio actual
	while (currentDir !== '/' && currentDir !== dirname(currentDir)) {
		const autorunPath = join(currentDir, 'Autorun');
		const packageJsonPath = join(autorunPath, 'package.json');
		
		if (existsSync(autorunPath) && existsSync(packageJsonPath)) {
			return autorunPath;
		}
		
		currentDir = dirname(currentDir);
	}
	
	// Si no se encuentra, verificar si estamos dentro de Autorun
	const currentPackageJson = join(process.cwd(), 'package.json');
	if (existsSync(currentPackageJson)) {
		try {
			const packageJson = JSON.parse(
				readFileSync(currentPackageJson, 'utf-8')
			);
			if (packageJson.name === 'autorun' && existsSync(join(process.cwd(), 'packages', 'autorun-core'))) {
				return process.cwd();
			}
		} catch (error) {
			// Ignorar errores
		}
	}
	
	return null;
}

// Buscar directorio Autorun
const autorunDir = findAutorunDir();

if (!autorunDir) {
	console.error('❌ No se encontró el directorio Autorun.');
	console.error('💡 Asegúrate de estar en un proyecto que contiene Autorun.');
	console.error('💡 O ejecuta desde el directorio Autorun directamente:');
	console.error('   cd Autorun && npm run init');
	process.exit(1);
}

console.log(`📁 Directorio Autorun encontrado: ${autorunDir}`);
console.log('🚀 Ejecutando wizard de inicialización...\n');

// Cambiar al directorio Autorun y ejecutar init
try {
	process.chdir(autorunDir);
	
	// Obtener argumentos pasados al script
	const args = process.argv.slice(2);
	const command = `npm run init${args.length > 0 ? ' -- ' + args.join(' ') : ''}`;
	
	execSync(command, {
		stdio: 'inherit',
		cwd: autorunDir,
	});
} catch (error) {
	console.error('❌ Error ejecutando el wizard:', error.message);
	process.exit(1);
}

