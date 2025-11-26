#!/usr/bin/env node
/**
 * Script de setup para el add-on de Feedback Automatizado
 * 
 * Genera:
 * - Flujo de n8n como JSON
 * - Instrucciones para crear Google Sheet
 * - Configuración del proyecto
 */

import { FeedbackSetupService } from '../src/FeedbackSetupService';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
	switch (command) {
		case 'generate-n8n':
			await generateN8nWorkflow();
			break;
		case 'setup':
			await setupComplete();
			break;
		case 'help':
		default:
			showHelp();
			break;
	}
}

async function generateN8nWorkflow() {
	console.log('📦 Generando flujo de n8n...\n');

	const projectName = args[1] || 'Feedback';
	const outputPath = args[2] || './n8n-feedback-workflow.json';

	const options = {
		projectName,
		slackChannelId: process.env.SLACK_CHANNEL_ID,
		geminiApiKey: process.env.GEMINI_API_KEY,
	};

	const workflow = FeedbackSetupService.generateN8nWorkflow(options);
	writeFileSync(outputPath, workflow, 'utf-8');

	console.log(`✅ Flujo de n8n generado en: ${outputPath}`);
	console.log('\n📋 Próximos pasos:');
	console.log('1. Abre n8n');
	console.log('2. Ve a Workflows > Import from File');
	console.log(`3. Selecciona el archivo: ${outputPath}`);
	console.log('4. Configura las credenciales de Google Sheets');
	console.log('5. Actualiza el ID del Google Sheet en el nodo "Append row in sheet"');
	console.log('6. Activa el workflow');
	console.log('\n🔗 El webhook URL estará disponible después de activar el workflow');
}

async function setupComplete() {
	console.log('🚀 Configuración completa del sistema de Feedback\n');

	// 1. Generar flujo de n8n
	console.log('1️⃣ Generando flujo de n8n...');
	await generateN8nWorkflow();

	// 2. Mostrar instrucciones de Google Sheets
	console.log('\n2️⃣ Instrucciones para Google Sheets:');
	console.log(FeedbackSetupService.getGoogleSheetsInstructions());

	// 3. Generar configuración de ejemplo
	console.log('\n3️⃣ Generando configuración de ejemplo...');
	const configExample = {
		autorun: {
			addons: {
				config: {
					'feedback-automatizado': {
						enabled: true,
						webhookUrl: '{{TU_WEBHOOK_URL_DE_N8N}}',
						showWelcome: true,
						showFeedbackButton: true,
						sectionOptions: ['Inicio', 'Otra'],
					},
				},
			},
		},
	};

	const configPath = './feedback-config-example.json';
	writeFileSync(configPath, JSON.stringify(configExample, null, 2), 'utf-8');
	console.log(`✅ Configuración de ejemplo guardada en: ${configPath}`);

	console.log('\n✅ Setup completo!');
	console.log('\n📝 Resumen:');
	console.log('1. Importa el flujo de n8n en tu instancia de n8n');
	console.log('2. Crea el Google Sheet siguiendo las instrucciones');
	console.log('3. Actualiza el webhookUrl en tu configuración del proyecto');
	console.log('4. Activa el add-on en tu proyecto');
}

function showHelp() {
	console.log(`
📝 Feedback Automatizado - Script de Setup

Uso:
  npm run setup-feedback <comando> [opciones]

Comandos:
  generate-n8n [nombre] [archivo]    Genera el flujo de n8n como JSON
  setup                              Setup completo (n8n + instrucciones)
  help                               Muestra esta ayuda

Ejemplos:
  npm run setup-feedback generate-n8n "Mi Proyecto" ./n8n-workflow.json
  npm run setup-feedback setup

Variables de entorno opcionales:
  SLACK_CHANNEL_ID                   ID del canal de Slack
  GEMINI_API_KEY                     API Key de Google Gemini
`);
}

main().catch(console.error);



