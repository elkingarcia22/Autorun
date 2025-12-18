#!/usr/bin/env node
/**
 * Script para actualizar components-loader.js en GitHub con window.createTabs
 *
 * Uso:
 *   node scripts/update-components-loader-github.js
 *
 * Requisitos:
 *   - Tener acceso al repositorio elkingarcia22/UBITS
 *   - Tener GITHUB_TOKEN configurado en variables de entorno
 *   - O tener credenciales de GitHub configuradas
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_OWNER = 'elkingarcia22';
const REPO_NAME = 'UBITS';
const FILE_PATH = 'packages/templates/components-loader.js';
const BRANCH = 'main';

// Obtener token de GitHub
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!GITHUB_TOKEN) {
	console.error('❌ Error: GITHUB_TOKEN o GH_TOKEN no está configurado');
	console.error('   Configura tu token de GitHub:');
	console.error('   export GITHUB_TOKEN=tu_token_aqui');
	process.exit(1);
}

// Leer el archivo local
const localFilePath = path.join(
	__dirname,
	'..',
	'vendor',
	'ubits',
	'packages',
	'templates',
	'components-loader.js',
);

if (!fs.existsSync(localFilePath)) {
	console.error(`❌ Error: No se encuentra el archivo local: ${localFilePath}`);
	process.exit(1);
}

const fileContent = fs.readFileSync(localFilePath, 'utf-8');
const fileContentBase64 = Buffer.from(fileContent).toString('base64');

// Verificar que el archivo tiene window.createTabs
if (!fileContent.includes('window.createTabs')) {
	console.error('❌ Error: El archivo local NO contiene window.createTabs');
	console.error('   Asegúrate de que el archivo local está actualizado');
	process.exit(1);
}

console.log('✅ Archivo local leído correctamente');
console.log(`   Tamaño: ${fileContent.length} caracteres`);
console.log(
	`   Contiene window.createTabs: ${fileContent.includes('window.createTabs') ? '✅' : '❌'}`,
);

// Obtener SHA del archivo actual en GitHub
async function getCurrentSHA() {
	return new Promise((resolve, reject) => {
		const options = {
			hostname: 'api.github.com',
			path: `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
			method: 'GET',
			headers: {
				'User-Agent': 'Node.js Script',
				Authorization: `token ${GITHUB_TOKEN}`,
				Accept: 'application/vnd.github.v3+json',
			},
		};

		const req = https.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				if (res.statusCode === 200) {
					const fileInfo = JSON.parse(data);
					resolve(fileInfo.sha);
				} else {
					reject(new Error(`Error al obtener SHA: ${res.statusCode} - ${data}`));
				}
			});
		});

		req.on('error', (error) => {
			reject(error);
		});

		req.end();
	});
}

// Actualizar archivo en GitHub
async function updateFile(sha) {
	return new Promise((resolve, reject) => {
		const commitMessage =
			'feat: add window.createTabs to components-loader.js\n\nAdds renderTabs, initTabsListeners, and window.createTabs functions to support Tabs component';

		const payload = JSON.stringify({
			message: commitMessage,
			content: fileContentBase64,
			sha: sha,
			branch: BRANCH,
		});

		const options = {
			hostname: 'api.github.com',
			path: `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
			method: 'PUT',
			headers: {
				'User-Agent': 'Node.js Script',
				Authorization: `token ${GITHUB_TOKEN}`,
				Accept: 'application/vnd.github.v3+json',
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(payload),
			},
		};

		const req = https.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				if (res.statusCode === 200 || res.statusCode === 201) {
					const result = JSON.parse(data);
					resolve(result);
				} else {
					reject(new Error(`Error al actualizar archivo: ${res.statusCode} - ${data}`));
				}
			});
		});

		req.on('error', (error) => {
			reject(error);
		});

		req.write(payload);
		req.end();
	});
}

// Ejecutar
async function main() {
	try {
		console.log('\n📦 Actualizando components-loader.js en GitHub...\n');

		// Obtener SHA actual
		console.log('1️⃣ Obteniendo SHA del archivo actual en GitHub...');
		const sha = await getCurrentSHA();
		console.log(`   ✅ SHA obtenido: ${sha.substring(0, 7)}...`);

		// Actualizar archivo
		console.log('\n2️⃣ Actualizando archivo en GitHub...');
		const result = await updateFile(sha);
		console.log(`   ✅ Archivo actualizado correctamente`);
		console.log(`   📝 Commit: ${result.commit.message}`);
		console.log(`   🔗 URL: ${result.content.html_url}`);

		console.log('\n✅ ¡Actualización completada!');
		console.log('\n📋 Próximos pasos:');
		console.log('   1. Esperar 1-2 minutos para que Vercel detecte el cambio');
		console.log('   2. Verificar en Vercel Dashboard que hay un nuevo deployment');
		console.log('   3. Verificar que window.createTabs está disponible en:');
		console.log(`      https://ubits-storybook10.vercel.app/templates/components-loader.js`);
		console.log('\n');
	} catch (error) {
		console.error('\n❌ Error:', error.message);
		if (error.message.includes('401')) {
			console.error('   ⚠️ Token de GitHub inválido o expirado');
		} else if (error.message.includes('404')) {
			console.error('   ⚠️ Repositorio o archivo no encontrado');
		} else if (error.message.includes('422')) {
			console.error('   ⚠️ El archivo puede haber cambiado. Intenta de nuevo.');
		}
		process.exit(1);
	}
}

main();
