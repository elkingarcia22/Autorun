#!/usr/bin/env node
/**
 * Script de Setup Automatizado Robusto para Feedback
 * 
 * Automatiza TODO lo posible si se proporcionan las APIs y credenciales.
 * Si no, guía al usuario paso a paso para hacerlo manualmente.
 */

import { FeedbackSetupService } from '../src/FeedbackSetupService';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { google } from 'googleapis';
import readline from 'readline';

interface SetupConfig {
	projectName: string;
	googleSheetId?: string;
	googleSheetUrl?: string;
	geminiApiKey?: string;
	slackChannelId?: string;
	webhookUrl?: string;
	googleCredentialsPath?: string;
	n8nApiUrl?: string;
	n8nApiKey?: string;
	sectionOptions: string[];
}

interface SetupResult {
	success: boolean;
	googleSheetCreated: boolean;
	workflowGenerated: boolean;
	workflowImported: boolean;
	configUpdated: boolean;
	webhookUrl?: string;
	googleSheetId?: string;
	errors: string[];
	warnings: string[];
	manualSteps: string[];
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function question(query: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(query, resolve);
	});
}

function log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
	const icons = {
		info: 'ℹ️',
		success: '✅',
		error: '❌',
		warning: '⚠️',
	};
	console.log(`${icons[type]} ${message}`);
}

async function createGoogleSheet(
	credentialsPath: string,
	title: string,
): Promise<{ sheetId: string; url: string } | null> {
	try {
		log(`Creando Google Sheet: "${title}"...`, 'info');

		if (!existsSync(credentialsPath)) {
			throw new Error(`Archivo de credenciales no encontrado: ${credentialsPath}`);
		}

		const credentials = JSON.parse(readFileSync(credentialsPath, 'utf-8'));

		if (!credentials.client_email || !credentials.private_key) {
			throw new Error('Credenciales inválidas: faltan client_email o private_key');
		}

		const auth = new google.auth.GoogleAuth({
			credentials: {
				client_email: credentials.client_email,
				private_key: credentials.private_key,
			},
			scopes: ['https://www.googleapis.com/auth/spreadsheets'],
		});

		const sheets = google.sheets({ version: 'v4', auth });

		// Crear el sheet
		const response = await sheets.spreadsheets.create({
			requestBody: {
				properties: {
					title: title,
				},
				sheets: [
					{
						properties: {
							title: 'Hoja 1',
						},
					},
				],
			},
		});

		const sheetId = response.data.spreadsheetId!;
		const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

		// Agregar encabezados
		await sheets.spreadsheets.values.update({
			spreadsheetId: sheetId,
			range: 'Hoja 1!A1:E1',
			valueInputOption: 'RAW',
			requestBody: {
				values: [['user', 'section', 'comment', 'timestamp', 'ts_recibido']],
			},
		});

		log(`Google Sheet creado exitosamente!`, 'success');
		log(`   ID: ${sheetId}`, 'info');
		log(`   URL: ${url}`, 'info');

		return { sheetId, url };
	} catch (error: any) {
		log(`Error al crear Google Sheet: ${error.message}`, 'error');
		return null;
	}
}

async function importN8nWorkflow(
	n8nApiUrl: string,
	n8nApiKey: string,
	workflowJson: string,
): Promise<{ webhookUrl?: string; workflowId?: string } | null> {
	try {
		log('Importando workflow en n8n...', 'info');

		const workflow = JSON.parse(workflowJson);

		// Limpiar URL (remover trailing slash)
		const cleanUrl = n8nApiUrl.replace(/\/$/, '');

		// Intentar crear workflow
		const createResponse = await fetch(`${cleanUrl}/api/v1/workflows`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-N8N-API-KEY': n8nApiKey,
			},
			body: JSON.stringify(workflow),
		});

		if (!createResponse.ok) {
			const errorText = await createResponse.text();
			// Si el workflow ya existe, intentar actualizarlo
			if (createResponse.status === 409 || errorText.includes('already exists')) {
				log('Workflow ya existe, intentando actualizar...', 'warning');
				// Buscar workflow existente por nombre
				const listResponse = await fetch(`${cleanUrl}/api/v1/workflows`, {
					headers: {
						'X-N8N-API-KEY': n8nApiKey,
					},
				});

				if (listResponse.ok) {
					const workflows = await listResponse.json();
					const existing = workflows.data?.find((w: any) => w.name === workflow.name);
					if (existing) {
						// Actualizar workflow existente
						const updateResponse = await fetch(`${cleanUrl}/api/v1/workflows/${existing.id}`, {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
								'X-N8N-API-KEY': n8nApiKey,
							},
							body: JSON.stringify({ ...workflow, id: existing.id }),
						});

						if (updateResponse.ok) {
							workflow.id = existing.id;
							log('Workflow actualizado exitosamente!', 'success');
						} else {
							throw new Error(`Error al actualizar workflow: ${await updateResponse.text()}`);
						}
					}
				}
			} else {
				throw new Error(`n8n API error (${createResponse.status}): ${errorText}`);
			}
		} else {
			const result = await createResponse.json();
			workflow.id = result.id;
			log('Workflow creado exitosamente!', 'success');
		}

		const workflowId = workflow.id;

		// Activar el workflow
		try {
			const activateResponse = await fetch(`${cleanUrl}/api/v1/workflows/${workflowId}/activate`, {
				method: 'POST',
				headers: {
					'X-N8N-API-KEY': n8nApiKey,
				},
			});

			if (activateResponse.ok) {
				log('Workflow activado exitosamente!', 'success');
			} else {
				log('No se pudo activar el workflow automáticamente', 'warning');
			}
		} catch (error: any) {
			log(`Advertencia al activar workflow: ${error.message}`, 'warning');
		}

		// Obtener webhook URL
		const webhookNode = workflow.nodes.find((n: any) => n.type === 'n8n-nodes-base.webhook');
		if (webhookNode) {
			const baseUrl = cleanUrl.replace('/api/v1', '').replace('/api', '');
			const webhookPath = webhookNode.parameters.path || 'feedback';
			const webhookUrl = `${baseUrl}/webhook/${webhookPath}`;

			log(`Webhook URL obtenido: ${webhookUrl}`, 'success');
			return { webhookUrl, workflowId };
		}

		return { workflowId };
	} catch (error: any) {
		log(`Error al importar workflow en n8n: ${error.message}`, 'error');
		return null;
	}
}

async function updateProjectConfig(
	configPath: string,
	webhookUrl: string,
	sectionOptions: string[],
): Promise<boolean> {
	try {
		log('Actualizando configuración del proyecto...', 'info');

		// Crear directorio si no existe
		const configDir = dirname(configPath);
		if (!existsSync(configDir)) {
			mkdirSync(configDir, { recursive: true });
		}

		let config: any = {};
		if (existsSync(configPath)) {
			config = JSON.parse(readFileSync(configPath, 'utf-8'));
		}

		if (!config.autorun) {
			config.autorun = {};
		}
		if (!config.autorun.addons) {
			config.autorun.addons = {};
		}
		if (!config.autorun.addons.config) {
			config.autorun.addons.config = {};
		}

		config.autorun.addons.config['feedback-automatizado'] = {
			enabled: true,
			webhookUrl: webhookUrl,
			showWelcome: true,
			showFeedbackButton: true,
			sectionOptions: sectionOptions,
			autoDetectSection: true,
			collectMetadata: true,
			persistLocally: true,
		};

		writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

		log(`Configuración actualizada en: ${configPath}`, 'success');
		return true;
	} catch (error: any) {
		log(`Error al actualizar configuración: ${error.message}`, 'error');
		return false;
	}
}

function generateManualGuide(config: SetupConfig, result: SetupResult): string {
	let guide = '\n📋 GUÍA PARA CONFIGURACIÓN MANUAL\n';
	guide += '═'.repeat(50) + '\n\n';

	if (!result.googleSheetCreated) {
		guide += '1️⃣ CREAR GOOGLE SHEET\n';
		guide += '   a. Ve a https://sheets.google.com\n';
		guide += '   b. Crea un nuevo documento\n';
		guide += '   c. Nombra la primera fila con estos encabezados:\n';
		guide += '      user | section | comment | timestamp | ts_recibido\n';
		guide += '   d. Copia el ID del documento desde la URL:\n';
		guide += '      https://docs.google.com/spreadsheets/d/[ID]/edit\n';
		guide += '   e. Comparte el documento con el email de tu cuenta de servicio\n\n';
	}

	if (!result.workflowImported) {
		guide += '2️⃣ IMPORTAR WORKFLOW EN N8N\n';
		guide += '   a. Abre tu instancia de n8n\n';
		guide += '   b. Ve a Workflows > Import from File\n';
		guide += `   c. Selecciona el archivo: ${join(process.cwd(), 'n8n-feedback-workflow.json')}\n`;
		guide += '   d. El workflow se importará con todos los nodos configurados\n\n';

		guide += '3️⃣ CONFIGURAR CREDENCIALES EN N8N\n';
		guide += '   a. Google Sheets OAuth2:\n';
		guide += '      - Haz clic en el nodo "Append row in sheet1"\n';
		guide += '      - Configura las credenciales de Google Sheets\n';
		guide += '      - Autoriza el acceso\n';
		guide += '   b. Slack OAuth2 (opcional):\n';
		guide += '      - Haz clic en el nodo "Send a message"\n';
		guide += '      - Configura las credenciales de Slack\n';
		guide += '      - Autoriza el acceso\n\n';

		if (config.googleSheetId) {
			guide += '4️⃣ ACTUALIZAR GOOGLE SHEET ID EN N8N\n';
			guide += `   a. En el nodo "Get row(s) in sheet", actualiza el Document ID a: ${config.googleSheetId}\n`;
			guide += `   b. En el nodo "Append row in sheet1", actualiza el Document ID a: ${config.googleSheetId}\n\n`;
		}

		guide += '5️⃣ ACTIVAR EL WORKFLOW\n';
		guide += '   a. Haz clic en el botón "Active" en la esquina superior derecha\n';
		guide += '   b. Copia el Webhook URL que aparece\n';
		guide += '   c. Actualiza webhookUrl en la configuración del proyecto\n\n';
	}

	if (!result.configUpdated && result.webhookUrl) {
		guide += '6️⃣ ACTUALIZAR CONFIGURACIÓN DEL PROYECTO\n';
		guide += `   a. Edita .ubits/project-config.json\n`;
		guide += `   b. Agrega el webhookUrl: ${result.webhookUrl}\n\n`;
	}

	guide += '═'.repeat(50) + '\n';

	return guide;
}

async function main() {
	console.log('\n🚀 SETUP AUTOMATIZADO ROBUSTO DE FEEDBACK\n');
	console.log('═'.repeat(50));
	console.log('Este script intentará automatizar TODO lo posible.');
	console.log('Si faltan credenciales, te guiará paso a paso.\n');

	const result: SetupResult = {
		success: false,
		googleSheetCreated: false,
		workflowGenerated: false,
		workflowImported: false,
		configUpdated: false,
		errors: [],
		warnings: [],
		manualSteps: [],
	};

	const config: SetupConfig = {
		projectName: '',
		sectionOptions: [],
	};

	try {
		// 1. Información básica del proyecto
		console.log('📝 INFORMACIÓN DEL PROYECTO\n');
		config.projectName = (await question('Nombre del proyecto: ')) || 'Feedback';
		const sectionOptionsInput =
			(await question('Secciones (separadas por comas, ej: Inicio,Productos,Contacto): ')) || 'Inicio,Otra';
		config.sectionOptions = sectionOptionsInput.split(',').map((s) => s.trim());

		// 2. Google Sheets - Intentar automatizar
		console.log('\n📊 CONFIGURACIÓN DE GOOGLE SHEETS\n');
		const useGoogleApi = (await question('¿Tienes credenciales de Service Account? (s/n): ')).toLowerCase() === 's';

		if (useGoogleApi) {
			config.googleCredentialsPath = await question('Ruta al archivo de credenciales JSON: ');

			if (config.googleCredentialsPath && existsSync(config.googleCredentialsPath)) {
				const sheet = await createGoogleSheet(config.googleCredentialsPath, `${config.projectName} - Feedback`);
				if (sheet) {
					config.googleSheetId = sheet.sheetId;
					config.googleSheetUrl = sheet.url;
					result.googleSheetCreated = true;
					log('✅ Google Sheet creado automáticamente!', 'success');
				} else {
					result.errors.push('No se pudo crear Google Sheet automáticamente');
					result.manualSteps.push('Crear Google Sheet manualmente');
				}
			} else {
				log('Archivo de credenciales no encontrado', 'warning');
				result.warnings.push('Credenciales de Google no encontradas');
			}
		}

		// Si no se creó automáticamente, pedir ID
		if (!config.googleSheetId) {
			const sheetId = await question('\nID del Google Sheet (o presiona Enter para configurarlo después): ');
			if (sheetId) {
				config.googleSheetId = sheetId;
			} else {
				result.manualSteps.push('Crear Google Sheet y obtener su ID');
			}
		}

		// 3. Gemini API
		console.log('\n🤖 CONFIGURACIÓN DE GEMINI AI (Opcional)\n');
		config.geminiApiKey = (await question('API Key de Gemini (presiona Enter para omitir): ')) || undefined;
		if (!config.geminiApiKey) {
			result.warnings.push('Gemini API Key no configurada - el análisis automático no funcionará');
		}

		// 4. Slack
		console.log('\n💬 CONFIGURACIÓN DE SLACK (Opcional)\n');
		config.slackChannelId = (await question('ID del canal de Slack (presiona Enter para omitir): ')) || undefined;
		if (!config.slackChannelId) {
			result.warnings.push('Slack Channel ID no configurado - las notificaciones no se enviarán');
		}

		// 5. Generar workflow
		console.log('\n📦 GENERANDO WORKFLOW DE N8N\n');
		const workflowJson = FeedbackSetupService.generateN8nWorkflow({
			projectName: config.projectName,
			googleSheetId: config.googleSheetId || '{{GOOGLE_SHEET_ID}}',
			geminiApiKey: config.geminiApiKey || 'YOUR_GEMINI_API_KEY',
			slackChannelId: config.slackChannelId || 'C09MZ8E2EER',
		});

		const workflowPath = join(process.cwd(), 'n8n-feedback-workflow.json');
		writeFileSync(workflowPath, workflowJson, 'utf-8');
		result.workflowGenerated = true;
		log(`Workflow generado exitosamente en: ${workflowPath}`, 'success');

		// 6. n8n - Intentar automatizar importación
		console.log('\n🔗 CONFIGURACIÓN DE N8N\n');
		const useN8nApi = (await question('¿Tienes acceso a la API de n8n? (s/n): ')).toLowerCase() === 's';

		if (useN8nApi) {
			config.n8nApiUrl = await question('URL de tu instancia de n8n (ej: https://tu-n8n.app.n8n.cloud): ');
			config.n8nApiKey = await question('API Key de n8n: ');

			if (config.n8nApiUrl && config.n8nApiKey) {
				const n8nResult = await importN8nWorkflow(config.n8nApiUrl, config.n8nApiKey, workflowJson);
				if (n8nResult) {
					if (n8nResult.webhookUrl) {
						config.webhookUrl = n8nResult.webhookUrl;
						result.webhookUrl = n8nResult.webhookUrl;
					}
					result.workflowImported = true;
					log('✅ Workflow importado y activado automáticamente!', 'success');
				} else {
					result.errors.push('No se pudo importar workflow en n8n automáticamente');
					result.manualSteps.push('Importar workflow en n8n manualmente');
				}
			}
		}

		// Si no se obtuvo webhook URL, pedirlo
		if (!config.webhookUrl) {
			console.log('\n📋 Para obtener el Webhook URL:');
			console.log('   1. Importa el workflow en n8n desde el archivo generado');
			console.log('   2. Configura las credenciales necesarias');
			console.log('   3. Activa el workflow');
			console.log('   4. Copia el Webhook URL que aparece\n');

			config.webhookUrl = (await question('Webhook URL de n8n (o presiona Enter para configurarlo después): ')) || undefined;
			if (!config.webhookUrl) {
				result.manualSteps.push('Obtener Webhook URL de n8n y actualizar configuración');
			}
		}

		// 7. Actualizar configuración del proyecto
		if (config.webhookUrl) {
			const configPath = join(process.cwd(), '.ubits', 'project-config.json');
			const updated = await updateProjectConfig(configPath, config.webhookUrl, config.sectionOptions);
			if (updated) {
				result.configUpdated = true;
				log('✅ Configuración del proyecto actualizada!', 'success');
			}
		}

		// Resumen final
		console.log('\n' + '═'.repeat(50));
		console.log('📊 RESUMEN DEL SETUP\n');

		if (result.googleSheetCreated) {
			log(`Google Sheet creado: ${config.googleSheetUrl}`, 'success');
		}
		if (result.workflowGenerated) {
			log(`Workflow generado: ${workflowPath}`, 'success');
		}
		if (result.workflowImported) {
			log('Workflow importado en n8n', 'success');
		}
		if (result.configUpdated) {
			log('Configuración del proyecto actualizada', 'success');
		}
		if (result.webhookUrl) {
			log(`Webhook URL: ${result.webhookUrl}`, 'success');
		}

		// Mostrar advertencias
		if (result.warnings.length > 0) {
			console.log('\n⚠️  ADVERTENCIAS:');
			result.warnings.forEach((w) => log(w, 'warning'));
		}

		// Mostrar errores
		if (result.errors.length > 0) {
			console.log('\n❌ ERRORES:');
			result.errors.forEach((e) => log(e, 'error'));
		}

		// Mostrar guía manual si es necesario
		if (result.manualSteps.length > 0 || !result.workflowImported || !result.configUpdated) {
			console.log(generateManualGuide(config, result));
		}

		// Guardar resumen en archivo
		const summaryPath = join(process.cwd(), 'feedback-setup-summary.json');
		writeFileSync(
			summaryPath,
			JSON.stringify(
				{
					config,
					result,
					timestamp: new Date().toISOString(),
				},
				null,
				2,
			),
			'utf-8',
		);
		log(`Resumen guardado en: ${summaryPath}`, 'info');

		result.success = result.workflowGenerated && (result.workflowImported || config.webhookUrl);

		if (result.success) {
			console.log('\n🎉 ¡SETUP COMPLETADO EXITOSAMENTE!\n');
			console.log('El sistema de feedback está listo para usar.');
			console.log('Ejecuta: npm run addon:activate feedback-automatizado\n');
		} else {
			console.log('\n📝 SETUP PARCIALMENTE COMPLETADO\n');
			console.log('Revisa la guía manual arriba para completar los pasos restantes.\n');
		}
	} catch (error: any) {
		log(`Error fatal: ${error.message}`, 'error');
		result.errors.push(error.message);
		console.log(generateManualGuide(config, result));
	} finally {
		rl.close();
	}
}

main().catch((error) => {
	console.error('❌ Error fatal:', error);
	process.exit(1);
});
