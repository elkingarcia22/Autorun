#!/usr/bin/env node
/**
 * Script para solucionar error de Google Sheets MCP sin credenciales
 * 
 * Opciones:
 * 1. Eliminar configuración del MCP (si no se necesita)
 * 2. Configurar OAuth 2.0 (recomendado)
 * 3. Configurar Service Account (tradicional)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MCP_CONFIG_PATH = path.join(process.env.HOME || process.env.USERPROFILE || '', '.cursor', 'mcp.json');

function question(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function fixGoogleSheetsMCP() {
  console.log('🔧 Solucionando error de Google Sheets MCP\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Leer configuración actual
  let config = {};
  try {
    if (fs.existsSync(MCP_CONFIG_PATH)) {
      const content = fs.readFileSync(MCP_CONFIG_PATH, 'utf-8');
      config = JSON.parse(content);
    } else {
      config = { mcpServers: {} };
    }
  } catch (error) {
    console.error(`❌ Error leyendo configuración: ${error.message}`);
    rl.close();
    process.exit(1);
  }

  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  // Verificar si hay configuración de google-sheets
  const hasGoogleSheets = config.mcpServers['google-sheets'] !== undefined;
  const googleSheetsConfig = config.mcpServers['google-sheets'];

  console.log('📋 Opciones:\n');
  console.log('1. Eliminar Google Sheets MCP (si no lo necesitas)');
  console.log('2. Configurar OAuth 2.0 (recomendado, similar a Figma/Vercel)');
  console.log('3. Configurar Service Account (tradicional)');
  console.log('4. Salir sin cambios\n');

  const option = await question(rl, 'Selecciona una opción (1-4): ');

  if (option === '1') {
    // Eliminar configuración
    if (hasGoogleSheets) {
      delete config.mcpServers['google-sheets'];
      console.log('\n✅ Google Sheets MCP eliminado de la configuración.');
    } else {
      console.log('\n⚠️  Google Sheets MCP no está en la configuración.');
    }
  } else if (option === '2') {
    // Configurar OAuth 2.0
    console.log('\n🔐 Configurando OAuth 2.0...\n');
    console.log('📋 Necesitas un Client ID de Google Cloud:');
    console.log('   1. Ve a https://console.cloud.google.com/');
    console.log('   2. Crea OAuth Client ID (tipo: Desktop app)\n');

    const clientId = await question(rl, '🔑 Google Client ID: ');
    if (!clientId || clientId.trim() === '') {
      console.log('\n❌ Client ID es requerido. Cancelando...');
      rl.close();
      return;
    }

    const clientSecret = await question(rl, '🔐 Client Secret (opcional): ') || '';
    const redirectUri = await question(
      rl,
      '🔗 Redirect URI (default: http://localhost:3000/oauth2callback): '
    ) || 'http://localhost:3000/oauth2callback';

    const wrapperPath = path.resolve(__dirname, 'google-sheets-mcp-oauth-wrapper.mjs');

    config.mcpServers['google-sheets'] = {
      command: 'node',
      args: [wrapperPath],
      env: {
        GOOGLE_CLIENT_ID: clientId.trim(),
        ...(clientSecret.trim() ? { GOOGLE_CLIENT_SECRET: clientSecret.trim() } : {}),
        GOOGLE_REDIRECT_URI: redirectUri.trim(),
      },
    };

    console.log('\n✅ OAuth 2.0 configurado!');
  } else if (option === '3') {
    // Configurar Service Account
    console.log('\n🔐 Configurando Service Account...\n');

    const projectId = await question(rl, '📋 Google Project ID: ');
    if (!projectId || projectId.trim() === '') {
      console.log('\n❌ Project ID es requerido. Cancelando...');
      rl.close();
      return;
    }

    console.log('\n📋 Método de autenticación:');
    console.log('1. Archivo de credenciales (GOOGLE_APPLICATION_CREDENTIALS)');
    console.log('2. JSON string completo (GOOGLE_SERVICE_ACCOUNT_KEY)');
    console.log('3. Private Key + Email (GOOGLE_PRIVATE_KEY + GOOGLE_CLIENT_EMAIL)');

    const method = await question(rl, '\nSelecciona método (1-3): ');

    const env = { GOOGLE_PROJECT_ID: projectId.trim() };

    if (method === '1') {
      const credPath = await question(rl, '📁 Ruta al archivo JSON (absoluta): ');
      if (credPath && credPath.trim() !== '') {
        env.GOOGLE_APPLICATION_CREDENTIALS = credPath.trim();
      }
    } else if (method === '2') {
      console.log('\n📋 Pega el contenido completo del archivo JSON:');
      const jsonString = await question(rl, 'JSON: ');
      if (jsonString && jsonString.trim() !== '') {
        env.GOOGLE_SERVICE_ACCOUNT_KEY = jsonString.trim();
      }
    } else if (method === '3') {
      const privateKey = await question(rl, '🔐 Private Key: ');
      const clientEmail = await question(rl, '📧 Client Email: ');
      if (privateKey && privateKey.trim() !== '' && clientEmail && clientEmail.trim() !== '') {
        env.GOOGLE_PRIVATE_KEY = privateKey.trim();
        env.GOOGLE_CLIENT_EMAIL = clientEmail.trim();
      }
    }

    config.mcpServers['google-sheets'] = {
      command: 'npx',
      args: ['-y', 'mcp-gsheets@latest'],
      env,
    };

    console.log('\n✅ Service Account configurado!');
  } else {
    console.log('\n✅ Saliendo sin cambios.');
    rl.close();
    return;
  }

  // Guardar configuración
  try {
    const configDir = path.dirname(MCP_CONFIG_PATH);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(MCP_CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
    console.log(`\n✅ Configuración guardada en: ${MCP_CONFIG_PATH}`);
    console.log('\n⚠️  IMPORTANTE: Reinicia Cursor completamente para que los cambios surtan efecto.\n');
  } catch (error) {
    console.error(`\n❌ Error guardando configuración: ${error.message}`);
  }

  rl.close();
}

fixGoogleSheetsMCP().catch((error) => {
  console.error(`\n❌ Error: ${error.message}`);
  process.exit(1);
});


