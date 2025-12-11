#!/usr/bin/env node
/**
 * Script de prueba para verificar GitHub add-on auto-commit
 */

import { ensureAutorunHubInitialized } from '../AutorunAgent.js';
import * as fs from 'fs/promises';
import * as path from 'path';

async function main() {
	try {
		console.log('🚀 Inicializando AutorunHub...');
		const hub = await ensureAutorunHubInitialized();

		console.log('✅ AutorunHub inicializado');
		console.log('⏳ Esperando 3 segundos para que el FileWatcher se active...');
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Crear archivo de prueba
		const testFile = path.join(process.cwd(), 'prototypes', 'test-github-auto-commit.txt');
		const testContent = `Test auto-commit - ${new Date().toISOString()}\n`;

		console.log(`📝 Creando archivo de prueba: ${testFile}`);
		await fs.appendFile(testFile, testContent);

		console.log('✅ Archivo creado. Esperando 8 segundos para que se procese el commit...');
		await new Promise((resolve) => setTimeout(resolve, 8000));

		console.log('📊 Verificando estado de Git...');
		const { execSync } = await import('child_process');
		const gitStatus = execSync('git status --short', { encoding: 'utf-8' });
		const gitLog = execSync('git log --oneline -3', { encoding: 'utf-8' });

		console.log('\n📋 Estado de Git:');
		console.log(gitStatus || '(sin cambios)');
		console.log('\n📜 Últimos commits:');
		console.log(gitLog);

		process.exit(0);
	} catch (error: any) {
		console.error('❌ Error:', error.message);
		process.exit(1);
	}
}

main();



