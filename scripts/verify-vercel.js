#!/usr/bin/env node

/**
 * Script para verificar que el sistema está usando Vercel y no la versión local
 */

import https from 'https';
import { URL } from 'url';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar configuración desde UBITSPreset
const presetPath = join(__dirname, '../packages/autorun-core/src/wizard/UBITSPreset.ts');
const presetContent = readFileSync(presetPath, 'utf-8');

// Extraer URL y token de bypass
const urlMatch = presetContent.match(/url:\s*['"]([^'"]+)['"]/);
const tokenMatch = presetContent.match(/bypassToken:\s*['"]([^'"]+)['"]/);

const vercelUrl = urlMatch ? urlMatch[1] : null;
const bypassToken = tokenMatch ? tokenMatch[1] : null;

console.log('🔍 Verificando configuración de Vercel...\n');
console.log(`📡 URL de Vercel: ${vercelUrl}`);
console.log(`🔐 Token de bypass: ${bypassToken ? '✅ Configurado' : '❌ No configurado'}\n`);

if (!vercelUrl) {
	console.error('❌ No se encontró URL de Vercel en la configuración');
	process.exit(1);
}

if (!bypassToken) {
	console.warn('⚠️  No se encontró token de bypass. El acceso puede fallar.\n');
}

// Función para hacer fetch con bypass token (maneja redirects como el código real)
function fetchFromVercel(path, followRedirects = true, cookieHeader = '') {
	return new Promise((resolve, reject) => {
		const testUrl = `${vercelUrl}${path}`;
		const urlObj = new URL(testUrl);

		const options = {
			hostname: urlObj.hostname,
			path: urlObj.pathname + urlObj.search,
			method: 'GET',
			headers: {},
		};

		// Agregar headers de bypass token
		if (bypassToken) {
			const separator = urlObj.search ? '&' : '?';
			options.path += `${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${bypassToken}`;
			options.headers['x-vercel-set-bypass-cookie'] = 'true';
			options.headers['x-vercel-protection-bypass'] = bypassToken;
		}

		// Si tenemos cookie de un redirect anterior, usarla
		if (cookieHeader) {
			options.headers['Cookie'] = cookieHeader;
		}

		const req = https.request(options, (res) => {
			// Extraer cookie primero (puede venir en cualquier respuesta)
			const setCookie = res.headers['set-cookie'];
			let newCookieHeader = cookieHeader;
			if (setCookie) {
				const cookieString = Array.isArray(setCookie) ? setCookie.join('; ') : String(setCookie);
				const cookieMatch = cookieString.match(/_vercel_jwt=([^;]+)/);
				if (cookieMatch) {
					newCookieHeader = `_vercel_jwt=${cookieMatch[1]}`;
				}
			}

			// Si hay redirect (307, 302, 301), seguir la nueva ubicación con la cookie
			if (
				followRedirects &&
				(res.statusCode === 307 || res.statusCode === 302 || res.statusCode === 301)
			) {
				const location = res.headers.location;
				if (location) {
					res.resume(); // Consumir la respuesta
					const redirectUrl = location.startsWith('http')
						? location
						: `https://${urlObj.hostname}${location}`;

					// Si tenemos cookie, hacer la siguiente request con ella
					if (newCookieHeader) {
						const redirectUrlObj = new URL(redirectUrl);
						const redirectOptions = {
							hostname: redirectUrlObj.hostname,
							path: redirectUrlObj.pathname + redirectUrlObj.search,
							method: 'GET',
							headers: {
								Cookie: newCookieHeader,
							},
						};

						const reqRedirect = https.request(redirectOptions, (resRedirect) => {
							let dataRedirect = '';
							resRedirect.on('data', (chunk) => {
								dataRedirect += chunk;
							});
							resRedirect.on('end', () => {
								if (resRedirect.statusCode === 200) {
									resolve({
										statusCode: resRedirect.statusCode,
										headers: resRedirect.headers,
										data: dataRedirect.substring(0, 200),
										fullData: dataRedirect,
									});
								} else {
									resolve({
										statusCode: resRedirect.statusCode,
										headers: resRedirect.headers,
										data: dataRedirect.substring(0, 200),
										fullData: dataRedirect,
									});
								}
							});
						});
						reqRedirect.on('error', reject);
						reqRedirect.setTimeout(10000, () => {
							reqRedirect.destroy();
							reject(new Error('Timeout al conectar con Vercel'));
						});
						reqRedirect.end();
						return;
					}

					// Si no hay cookie, intentar recursivamente
					return resolve(fetchFromVercel(path, true, newCookieHeader));
				}
			}

			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				resolve({
					statusCode: res.statusCode,
					headers: res.headers,
					data: data.substring(0, 200),
					fullData: data,
				});
			});
		});

		req.on('error', (error) => {
			reject(error);
		});

		req.setTimeout(10000, () => {
			req.destroy();
			reject(new Error('Timeout al conectar con Vercel'));
		});

		req.end();
	});
}

// Pruebas
async function runTests() {
	console.log('🧪 Ejecutando pruebas de conexión...\n');

	// Test 1: Verificar que el index.json existe
	console.log('1️⃣  Probando acceso a index.json...');
	try {
		const result = await fetchFromVercel('/index.json');
		if (result.statusCode === 200) {
			console.log('   ✅ index.json accesible desde Vercel');
			try {
				const json = JSON.parse(result.fullData);
				console.log(
					`   📊 Storybook tiene ${json.stories ? Object.keys(json.stories).length : 0} stories`,
				);
			} catch (e) {
				console.log('   ⚠️  No se pudo parsear JSON (puede ser HTML de error)');
			}
		} else {
			console.log(`   ❌ Error HTTP ${result.statusCode}`);
			console.log(`   📄 Respuesta: ${result.data}`);
		}
	} catch (error) {
		console.log(`   ❌ Error: ${error.message}`);
	}

	console.log('');

	// Test 2: Verificar que el template-admin.html existe
	console.log('2️⃣  Probando acceso a template-admin.html...');
	try {
		const result = await fetchFromVercel('/templates/template-admin.html');
		if (result.statusCode === 200) {
			console.log('   ✅ template-admin.html accesible desde Vercel');
			console.log(`   📏 Tamaño: ${result.fullData.length} bytes`);
			if (result.fullData.includes('<!DOCTYPE html>')) {
				console.log('   ✅ Contenido HTML válido');
			} else {
				console.log('   ⚠️  El contenido no parece ser HTML válido');
			}
		} else {
			console.log(`   ❌ Error HTTP ${result.statusCode}`);
			console.log(`   📄 Respuesta: ${result.data}`);
		}
	} catch (error) {
		console.log(`   ❌ Error: ${error.message}`);
	}

	console.log('');

	// Test 3: Verificar tokens.css
	console.log('3️⃣  Probando acceso a tokens.css...');
	try {
		const result = await fetchFromVercel('/tokens/dist/tokens.css');
		if (result.statusCode === 200) {
			console.log('   ✅ tokens.css accesible desde Vercel');
			console.log(`   📏 Tamaño: ${result.fullData.length} bytes`);
			if (result.fullData.includes(':root')) {
				console.log('   ✅ Contenido CSS válido (contiene :root)');
			}
		} else {
			console.log(`   ❌ Error HTTP ${result.statusCode}`);
		}
	} catch (error) {
		console.log(`   ❌ Error: ${error.message}`);
	}

	console.log('');

	// Resumen
	console.log('📋 Resumen:');
	console.log(`   🌐 URL base: ${vercelUrl}`);
	console.log(`   🔐 Token: ${bypassToken ? '✅ Configurado' : '❌ No configurado'}`);
	console.log('');
	console.log(
		'💡 El sistema intentará usar Vercel primero, y si falla usará vendor/ubits/ como fallback.',
	);
}

runTests().catch(console.error);
