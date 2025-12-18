/**
 * Script de prueba para verificar que AutorunHub lee las reglas correctamente
 *
 * Este script:
 * 1. Inicializa AutorunHub
 * 2. Intenta leer las reglas de .cursor/rules/
 * 3. Verifica que los add-ons estén funcionando
 * 4. Muestra logs detallados
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { getAutorunHub } from '@autorun/core';

const PROJECT_ROOT = process.cwd();

interface RuleFile {
	path: string;
	exists: boolean;
	size: number;
	content?: string;
}

async function checkRuleFiles(): Promise<RuleFile[]> {
	console.log('\n📚 [TEST] Verificando archivos de reglas...\n');

	const rulesDir = path.join(PROJECT_ROOT, '.cursor', 'rules');
	const ruleFiles = [
		'00-inicio.md',
		'01-deteccion-imagen.md',
		'02-bloqueo-imagen.md',
		'03-componentes.md',
		'04-implementacion.md',
		'05-errores.md',
		'06-implementacion-automatica.md',
		'index.md',
	];

	const results: RuleFile[] = [];

	for (const file of ruleFiles) {
		const filePath = path.join(rulesDir, file);
		try {
			const stats = await fs.stat(filePath);
			const content = await fs.readFile(filePath, 'utf-8');
			results.push({
				path: filePath,
				exists: true,
				size: stats.size,
				content: content.substring(0, 200), // Primeros 200 caracteres
			});
			console.log(`✅ [TEST] ${file}: ${stats.size} bytes`);
		} catch (error) {
			results.push({
				path: filePath,
				exists: false,
				size: 0,
			});
			console.log(`❌ [TEST] ${file}: NO ENCONTRADO`);
		}
	}

	return results;
}

async function checkCursorRules(): Promise<boolean> {
	console.log('\n📋 [TEST] Verificando .cursorrules...\n');

	const cursorRulesPath = path.join(PROJECT_ROOT, '.cursorrules');
	try {
		const stats = await fs.stat(cursorRulesPath);
		const content = await fs.readFile(cursorRulesPath, 'utf-8');
		console.log(`✅ [TEST] .cursorrules: ${stats.size} bytes`);
		console.log(`📝 [TEST] Primeras líneas:`);
		console.log(content.split('\n').slice(0, 10).join('\n'));
		return true;
	} catch (error) {
		console.log(`❌ [TEST] .cursorrules: NO ENCONTRADO`);
		return false;
	}
}

async function checkAutorunHub(): Promise<void> {
	console.log('\n🔧 [TEST] Verificando AutorunHub...\n');

	try {
		const hub = getAutorunHub();
		if (!hub) {
			console.log('❌ [TEST] AutorunHub no está inicializado');
			return;
		}

		console.log('✅ [TEST] AutorunHub está inicializado');

		// Verificar add-ons activos
		const preCheckAddon = hub.getAddon('pre-implementation-check');
		if (preCheckAddon) {
			console.log('✅ [TEST] Pre-Implementation Check add-on encontrado');
		} else {
			console.log('⚠️  [TEST] Pre-Implementation Check add-on NO encontrado');
		}

		const fileWatcher = (hub as any).fileWatcher;
		if (fileWatcher) {
			console.log('✅ [TEST] FileWatcher está activo');
		} else {
			console.log('⚠️  [TEST] FileWatcher NO está activo');
		}
	} catch (error) {
		console.error('❌ [TEST] Error verificando AutorunHub:', error);
	}
}

async function testPreWriteValidator(): Promise<void> {
	console.log('\n🔍 [TEST] Probando PreWriteValidator...\n');

	try {
		const { PreWriteValidator } = await import('@autorun/core/validation/PreWriteValidator');

		// Simular una validación
		const testFilePath = path.join(PROJECT_ROOT, 'prototypes', 'test-component.html');
		const testContent = '<ubits-button>Test</ubits-button>';

		console.log('📝 [TEST] Simulando validación para:', testFilePath);

		const result = await PreWriteValidator.validateBeforeWrite(testFilePath, testContent, {
			componentName: 'Button',
			userMessage: 'Implementar un botón',
		});

		console.log('📊 [TEST] Resultado de validación:');
		console.log(`   - Válido: ${result.valid}`);
		console.log(`   - Errores: ${result.errors.length}`);
		console.log(`   - Warnings: ${result.warnings.length}`);

		if (result.errors.length > 0) {
			console.log('   - Errores encontrados:');
			result.errors.forEach((error, i) => {
				console.log(`     ${i + 1}. ${error}`);
			});
		}

		if (result.warnings.length > 0) {
			console.log('   - Warnings encontrados:');
			result.warnings.forEach((warning, i) => {
				console.log(`     ${i + 1}. ${warning}`);
			});
		}
	} catch (error) {
		console.error('❌ [TEST] Error probando PreWriteValidator:', error);
	}
}

async function main() {
	console.log('🚀 [TEST] Iniciando prueba de AutorunHub y reglas...\n');
	console.log('='.repeat(60));

	// 1. Verificar archivos de reglas
	const ruleFiles = await checkRuleFiles();
	console.log(
		`\n📊 [TEST] Resumen: ${ruleFiles.filter((r) => r.exists).length}/${ruleFiles.length} archivos encontrados`,
	);

	// 2. Verificar .cursorrules
	const cursorRulesExists = await checkCursorRules();

	// 3. Verificar AutorunHub
	await checkAutorunHub();

	// 4. Probar PreWriteValidator
	await testPreWriteValidator();

	console.log('\n' + '='.repeat(60));
	console.log('✅ [TEST] Prueba completada\n');
}

main().catch(console.error);
