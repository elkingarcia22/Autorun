#!/usr/bin/env node
/**
 * Script de prueba: Implementar botón que abre modal desde Storybook
 *
 * Este script prueba el sistema completo de implementación desde Storybook
 * agregando un botón que abre un modal en el template desplegado.
 *
 * Uso:
 *   tsx scripts/test-button-modal-implementation.ts [template-path]
 *
 * Ejemplo:
 *   tsx scripts/test-button-modal-implementation.ts prototypes/canvas-administrador-encuestas-2025-12-12.html
 */

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { testButtonModalImplementation } from '../packages/autorun-core/src/helpers/testImplementationFromStorybook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function main() {
	try {
		// Obtener ruta del template
		const args = process.argv.slice(2);
		const templatePath = args[0] || 'prototypes/canvas-administrador-encuestas-2025-12-12.html';
		const fullTemplatePath = join(projectRoot, templatePath);

		console.log('\n🧪 [Test Script] ========================================');
		console.log('🧪 [Test Script] Prueba de Implementación desde Storybook');
		console.log('🧪 [Test Script] ========================================\n');
		console.log(`📄 Template: ${templatePath}`);

		// Verificar que el template existe
		try {
			await readFile(fullTemplatePath, 'utf-8');
		} catch (error) {
			console.error(`❌ Error: Template no encontrado: ${fullTemplatePath}`);
			process.exit(1);
		}

		// Ejecutar prueba
		console.log('\n🚀 Ejecutando prueba de implementación...\n');
		const result = await testButtonModalImplementation(
			fullTemplatePath,
			'https://libraries-ui.ubitslearning.com',
		);

		// Mostrar logs
		result.logs.forEach((log) => console.log(log));

		if (!result.success) {
			console.error('\n❌ Prueba falló');
			if (result.errors) {
				result.errors.forEach((error) => console.error(`   - ${error}`));
			}
			process.exit(1);
		}

		// Leer template actual
		console.log('\n📝 Agregando implementación al template...');
		const templateContent = await readFile(fullTemplatePath, 'utf-8');

		// Buscar donde insertar el código (después del content-area)
		const contentAreaMatch = templateContent.match(/<div[^>]*class="content-area"[^>]*>/);
		if (!contentAreaMatch) {
			console.error('❌ Error: No se encontró .content-area en el template');
			process.exit(1);
		}

		const insertPosition = contentAreaMatch.index! + contentAreaMatch[0].length;
		const beforeInsert = templateContent.substring(0, insertPosition);
		const afterInsert = templateContent.substring(insertPosition);

		// Insertar código
		const newTemplateContent = beforeInsert + '\n' + result.combinedCode + '\n' + afterInsert;

		// Guardar template modificado
		await writeFile(fullTemplatePath, newTemplateContent, 'utf-8');
		console.log('✅ Template modificado exitosamente');

		// Mostrar resumen
		console.log('\n📊 Resumen:');
		console.log(`   ✅ Botón: ${result.buttonCode ? 'Implementado' : 'Fallback UBITS'}`);
		console.log(`   ✅ Modal: ${result.modalCode ? 'Implementado' : 'Fallback UBITS'}`);
		console.log(`   ✅ Código combinado: ${result.combinedCode?.length || 0} caracteres`);
		console.log(`   ✅ Logs de rastreo: Incluidos`);

		console.log('\n🌐 Para probar:');
		console.log(
			`   1. Abre el template en el navegador: http://localhost:3000/${templatePath.split('/').pop()}`,
		);
		console.log(`   2. Abre la consola del navegador (F12)`);
		console.log(`   3. Busca el botón "Abrir Modal de Prueba"`);
		console.log(`   4. Haz clic en el botón`);
		console.log(`   5. Verifica los logs en la consola`);

		console.log('\n✅ Prueba completada exitosamente\n');
	} catch (error: any) {
		console.error('\n❌ Error ejecutando prueba:', error.message);
		console.error(error.stack);
		process.exit(1);
	}
}

main();
