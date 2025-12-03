#!/usr/bin/env node
/**
 * Script para crear un package.json en la raíz del proyecto
 * que permita ejecutar el wizard desde cualquier directorio
 */

import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';

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
			return { autorunDir: autorunPath, projectRoot: currentDir };
		}

		currentDir = dirname(currentDir);
	}

	return null;
}

// Buscar directorio Autorun
const result = findAutorunDir();

if (!result) {
	console.error('❌ No se encontró el directorio Autorun.');
	console.error('💡 Asegúrate de estar en un proyecto que contiene Autorun.');
	process.exit(1);
}

const { autorunDir, projectRoot } = result;
const projectPackageJson = join(projectRoot, 'package.json');

// Verificar si ya existe package.json en la raíz del proyecto
if (existsSync(projectPackageJson)) {
	try {
		const existingPackage = JSON.parse(readFileSync(projectPackageJson, 'utf-8'));

		// Si ya tiene el script wizard, no hacer nada
		if (existingPackage.scripts && existingPackage.scripts.wizard) {
			console.log('✅ El script "wizard" ya existe en package.json');
			process.exit(0);
		}

		// Agregar el script wizard al package.json existente
		existingPackage.scripts = existingPackage.scripts || {};
		existingPackage.scripts.wizard = `node ${autorunDir}/scripts/run-init.js`;

		writeFileSync(projectPackageJson, JSON.stringify(existingPackage, null, 2) + '\n');
		console.log('✅ Script "wizard" agregado a package.json existente');
		process.exit(0);
	} catch (error) {
		console.error('❌ Error leyendo package.json existente:', error.message);
		process.exit(1);
	}
} else {
	// Crear nuevo package.json en la raíz del proyecto
	const newPackageJson = {
		name: 'proyecto-autorun',
		version: '1.0.0',
		description: 'Proyecto generado con Autorun',
		private: true,
		scripts: {
			wizard: `node ${autorunDir}/scripts/run-init.js`,
			init: `node ${autorunDir}/scripts/run-init.js`,
		},
	};

	writeFileSync(projectPackageJson, JSON.stringify(newPackageJson, null, 2) + '\n');
	console.log('✅ package.json creado en la raíz del proyecto');
	console.log('✅ Scripts "wizard" e "init" agregados');
	console.log(`\n💡 Ahora puedes ejecutar desde cualquier lugar:`);
	console.log(`   npm run wizard`);
	console.log(`   npm run init`);
}
