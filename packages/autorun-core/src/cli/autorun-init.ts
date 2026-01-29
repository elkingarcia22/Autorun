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
  // Verificar si hay respuestas automáticas en argumentos
  const args = process.argv.slice(2);
  const autoSelect = args
    .find((arg) => arg.startsWith('--project='))
    ?.split('=')[1] as 'ubits' | 'independent' | undefined;

  // Verificar si hay respuestas automáticas para el wizard (formato: --answers="1,16")
  const answersArg = args.find((arg) => arg.startsWith('--answers='));
  if (answersArg) {
    const answersValue = answersArg.split('=')[1]?.replace(/^["']|["']$/g, '');
    if (answersValue) {
      process.env.AUTORUN_ANSWERS = answersValue;
    }
  }

  // También verificar variables de entorno
  if (!autoSelect && process.env.AUTORUN_PROJECT_TYPE) {
    process.env.AUTORUN_PROJECT_TYPE = process.env.AUTORUN_PROJECT_TYPE;
  }

  try {
    // Inicializar sistema de componentes (si estamos en navegador)
    if (typeof window !== 'undefined') {
      initComponents();
    }

    // Crear hub
    const hub = new AutorunHub();

    // Crear wizard
    const wizard = new InitializationWizard(hub);

    // Ejecutar wizard con opciones automáticas si están disponibles
    const result = await wizard.start({ autoSelect });

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
        console.log(
          '💾 Configuración guardada en:',
          configManager['configPath']
        );
      }
    } catch (error) {
      console.warn('⚠️  No se pudo guardar la configuración:', error);
      console.warn(
        '   La configuración se mostró arriba, puedes guardarla manualmente.'
      );
    }

    // Inicializar AutorunHub automáticamente después del wizard
    try {
      console.log('\n🚀 Inicializando AutorunHub...');

      // ⚠️ CRÍTICO: Registrar add-ons disponibles ANTES de inicializar
      // Esto asegura que add-ons como supabase estén disponibles cuando se intenten activar
      try {
        const { registerAvailableAddons } = await import(
          '../helpers/discoverAndRegisterAddons.js'
        );
        const registeredCount = await registerAvailableAddons(hub);
        if (registeredCount > 0) {
          console.log(
            `📦 ${registeredCount} add-on(s) registrado(s) automáticamente`
          );
        }
      } catch (regError: any) {
        // No bloquear si falla el registro automático
        console.warn(
          '⚠️  Error registrando add-ons automáticamente:',
          regError.message
        );
      }

      await hub.initialize();
      console.log('✅ AutorunHub inicializado correctamente');
      console.log('   - File watching activo');
      console.log('   - Add-ons cargados');
    } catch (error: any) {
      console.warn(
        '⚠️  No se pudo inicializar AutorunHub completamente:',
        error.message
      );
      console.warn(
        '   Puedes ejecutar "npm run autorun:init-hub" después para inicializarlo.'
      );
    }

    // Verificar si el servidor HTTP local está corriendo
    const localServer = (wizard as any).localServer;
    if (
      localServer &&
      localServer.isServerRunning &&
      localServer.isServerRunning()
    ) {
      console.log('\n🌐 Servidor HTTP local está corriendo.');
      console.log(
        '   💡 Mantén esta terminal abierta para que el servidor siga funcionando.'
      );
      console.log('   💡 Presiona Ctrl+C para detener el servidor y salir.\n');

      // Mantener el proceso vivo
      // El servidor se detendrá cuando el proceso termine (Ctrl+C)
      process.on('SIGINT', async () => {
        console.log('\n\n🛑 Deteniendo servidor...');
        if (localServer.stop) {
          await localServer.stop();
        }
        process.exit(0);
      });

      // No hacer exit, mantener el proceso vivo
      // El proceso terminará cuando el usuario presione Ctrl+C
    } else {
      process.exit(0);
    }
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
