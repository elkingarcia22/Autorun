#!/usr/bin/env tsx
/**
 * CLI para conectar/desconectar Storybooks
 *
 * Uso:
 *   npm run storybook:connect -- --url https://libraries-ui.ubitslearning.com --name "Libraries UI"
 *   npm run storybook:disconnect -- --id libraries-ui
 *   npm run storybook:list
 *   npm run storybook:set-active -- --id libraries-ui
 */

import { StorybookManager } from '../helpers/storybookManager';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const manager = StorybookManager.getInstance();

  try {
    switch (command) {
      case 'connect': {
        // Parsear argumentos
        const urlIndex = args.indexOf('--url');
        const nameIndex = args.indexOf('--name');
        const idIndex = args.indexOf('--id');
        const bypassTokenIndex = args.indexOf('--bypass-token');
        const setActiveIndex = args.indexOf('--set-active');

        if (urlIndex === -1 || args[urlIndex + 1] === undefined) {
          console.error('❌ Error: --url es requerido');
          console.log(
            'Uso: npm run storybook:connect -- --url <URL> --name <NOMBRE> [--id <ID>] [--bypass-token <TOKEN>] [--set-active]'
          );
          process.exit(1);
        }

        const url = args[urlIndex + 1];
        const name = nameIndex !== -1 ? args[nameIndex + 1] : 'Storybook';
        const id =
          idIndex !== -1
            ? args[idIndex + 1]
            : url
                .replace(/https?:\/\//, '')
                .replace(/\/.*$/, '')
                .replace(/\./g, '-');
        const bypassToken =
          bypassTokenIndex !== -1 ? args[bypassTokenIndex + 1] : undefined;
        const setActive = setActiveIndex !== -1;

        console.log(`🔌 Conectando Storybook: ${name}`);
        console.log(`   URL: ${url}`);
        console.log(`   ID: ${id}`);

        const connection = await manager.connectStorybook(
          {
            id,
            name,
            url,
            bypassToken,
            mcpEnabled: true,
          },
          { setAsActive: setActive }
        );

        console.log(`✅ Storybook conectado exitosamente`);
        if (setActive) {
          console.log(`✅ Storybook establecido como activo`);
        }
        break;
      }

      case 'disconnect': {
        const idIndex = args.indexOf('--id');
        if (idIndex === -1 || args[idIndex + 1] === undefined) {
          console.error('❌ Error: --id es requerido');
          console.log('Uso: npm run storybook:disconnect -- --id <ID>');
          process.exit(1);
        }

        const id = args[idIndex + 1];
        await manager.disconnectStorybook(id);
        console.log(`✅ Storybook desconectado exitosamente`);
        break;
      }

      case 'list': {
        // Asegurar que las conexiones estén cargadas
        await (manager as any).ensureConnectionsLoaded();
        const connections = await manager.listConnections();
        const active = await manager.getActiveStorybook();

        console.log('\n📚 Storybooks Conectados:\n');

        if (connections.length === 0) {
          console.log('   No hay Storybooks conectados');
        } else {
          for (const conn of connections) {
            const isActive = active?.config.id === conn.config.id;
            console.log(
              `   ${isActive ? '⭐' : '  '} ${conn.config.name} (${conn.config.id})`
            );
            console.log(`      URL: ${conn.config.url}`);
            console.log(
              `      Conectado: ${conn.connectedAt?.toLocaleString() || 'N/A'}`
            );
            if (isActive) {
              console.log(`      ⚠️ ACTIVO`);
            }
            console.log('');
          }
        }

        if (active) {
          console.log(`\n⭐ Storybook activo: ${active.config.name}`);
        } else {
          console.log(`\n⚠️ No hay Storybook activo`);
        }
        break;
      }

      case 'set-active': {
        const idIndex = args.indexOf('--id');
        if (idIndex === -1 || args[idIndex + 1] === undefined) {
          console.error('❌ Error: --id es requerido');
          console.log('Uso: npm run storybook:set-active -- --id <ID>');
          process.exit(1);
        }

        const id = args[idIndex + 1];
        await manager.setActiveStorybook(id);
        console.log(`✅ Storybook activo cambiado exitosamente`);
        break;
      }

      default:
        console.error(`❌ Comando desconocido: ${command}`);
        console.log('\nComandos disponibles:');
        console.log('  connect    - Conectar un Storybook');
        console.log('  disconnect - Desconectar un Storybook');
        console.log('  list       - Listar Storybooks conectados');
        console.log('  set-active - Cambiar Storybook activo');
        process.exit(1);
    }
  } catch (error: any) {
    console.error(`❌ Error:`, error.message);
    process.exit(1);
  }
}

main();
