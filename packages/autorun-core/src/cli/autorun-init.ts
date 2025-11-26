#!/usr/bin/env node
/**
 * autorun-init
 *
 * Script CLI para inicializar Autorun con wizard interactivo
 */

import { AutorunHub } from '../AutorunHub.js';
import { InitializationWizard } from '../wizard/InitializationWizard.js';
import { initComponents } from '../initComponents.js';

async function main() {
	console.log('🚀 Autorun Initialization Wizard\n');

	try {
		// Inicializar sistema de componentes (si estamos en navegador)
		if (typeof window !== 'undefined') {
			initComponents();
		}

		// Crear hub
		const hub = new AutorunHub();

		// Crear wizard
		const wizard = new InitializationWizard(hub);

		// Ejecutar wizard
		const result = await wizard.start();

		// Cerrar prompt
		wizard.close();

		console.log('\n✅ Inicialización completada!');
		console.log('📋 Configuración:', JSON.stringify(result, null, 2));

		// Guardar configuración
		try {
			const configManager = (hub as any).configManager;
			if (configManager) {
				// Guardar configuración del proyecto
				const config = await configManager.load();
				
				// Actualizar con resultado del wizard
				if (!config.autorun) {
					config.autorun = {
						version: '1.0.0',
						addons: { active: [], config: {} },
					};
				}

				// Guardar tipo de proyecto
				config.autorun.projectType = result.projectType;

				// Si es UBITS, guardar configuración específica
				if (result.projectType === 'ubits' && 'template' in result) {
					const ubitsResult = result as any;
					config.autorun.ubits = {
						template: ubitsResult.template,
						module: ubitsResult.module,
						product: ubitsResult.product,
						canvasPath: ubitsResult.canvasPath,
					};
				}

				// Guardar add-ons activos
				if ('addons' in result && Array.isArray((result as any).addons)) {
					config.autorun.addons.active = (result as any).addons;
				}

				await configManager.save();
				console.log('💾 Configuración guardada en:', configManager['configPath']);
			}
		} catch (error) {
			console.warn('⚠️  No se pudo guardar la configuración:', error);
			console.warn('   La configuración se mostró arriba, puedes guardarla manualmente.');
		}

		process.exit(0);
	} catch (error) {
		console.error('❌ Error durante inicialización:', error);
		process.exit(1);
	}
}

// Ejecutar main directamente (este archivo solo se ejecuta como script)
main().catch((error) => {
	console.error('❌ Error fatal:', error);
	process.exit(1);
});

export { main };

