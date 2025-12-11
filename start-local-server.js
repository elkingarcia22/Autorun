#!/usr/bin/env node
/**
 * Script para iniciar el servidor local de Autorun
 * Este servidor tiene el proxy /vercel-proxy/ configurado
 */

import { LocalServer } from './packages/autorun-core/dist/server/LocalServer.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new LocalServer({
	port: 3000,
	directory: path.join(__dirname, 'prototypes'),
	vercelUrl: 'https://ubits-storybook10.vercel.app',
	vercelBypassToken: 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT',
});

console.log('🚀 Iniciando servidor local de Autorun...');
console.log('   Puerto: 3000');
console.log('   Directorio: prototypes/');
console.log('   Proxy Vercel: /vercel-proxy/');
console.log('');

server
	.start()
	.then(() => {
		console.log('✅ Servidor iniciado correctamente');
		console.log('   URL: http://localhost:3000');
		console.log('');
		console.log('💡 Mantén esta terminal abierta para que el servidor siga funcionando.');
		console.log('💡 Presiona Ctrl+C para detener el servidor.');
		console.log('');
	})
	.catch((error) => {
		console.error('❌ Error al iniciar servidor:', error);
		process.exit(1);
	});

// Manejar Ctrl+C
process.on('SIGINT', async () => {
	console.log('\n\n🛑 Deteniendo servidor...');
	await server.stop();
	process.exit(0);
});
