#!/usr/bin/env node
/**
 * Script para configurar Google Sheets MCP con OAuth 2.0
 * Similar a cómo funcionan Figma y Vercel MCP
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

async function configureGoogleSheetsMCPOAuth() {
  console.log('🔐 Configurando Google Sheets MCP con OAuth 2.0\n');
  console.log('Este método es similar a cómo funcionan Figma y Vercel MCP.\n');

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
    }
  } catch (error) {
    console.error(`❌ Error leyendo configuración: ${error.message}`);
    rl.close();
    process.exit(1);
  }

  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  // Verificar si ya está configurado
  if (config.mcpServers['google-sheets']) {
    console.log('⚠️  Google Sheets MCP ya está configurado.');
    const overwrite = await question(rl, '¿Deseas reconfigurarlo? (s/N): ');
    if (overwrite.toLowerCase() !== 's' && overwrite.toLowerCase() !== 'y') {
      console.log('✅ Manteniendo configuración actual.');
      rl.close();
      return;
    }
  }

  console.log('\n📋 Paso 1: Obtener credenciales OAuth 2.0 de Google Cloud\n');
  console.log('Si aún no tienes credenciales:');
  console.log('1. Ve a https://console.cloud.google.com/');
  console.log('2. Crea o selecciona un proyecto');
  console.log('3. Habilita "Google Sheets API"');
  console.log('4. Ve a "APIs & Services" → "OAuth consent screen"');
  console.log('5. Configura la pantalla de consentimiento');
  console.log('6. Ve a "Credentials" → "Create Credentials" → "OAuth client ID"');
  console.log('7. Tipo: "Desktop app"');
  console.log('8. Copia el Client ID y Client Secret\n');

  const clientId = await question(rl, '🔑 Google Client ID: ');
  if (!clientId || clientId.trim() === '') {
    console.log('\n❌ Client ID es requerido. Cancelando...');
    rl.close();
    process.exit(1);
  }

  const clientSecret = await question(rl, '🔐 Google Client Secret (opcional, presiona Enter para omitir): ');
  const redirectUri = await question(
    rl,
    '🔗 Redirect URI (default: http://localhost:3000/oauth2callback): '
  ) || 'http://localhost:3000/oauth2callback';

  // Verificar que el wrapper existe
  const wrapperPath = path.resolve(__dirname, 'google-sheets-mcp-oauth-wrapper.mjs');
  if (!fs.existsSync(wrapperPath)) {
    console.error(`\n❌ Error: Wrapper no encontrado en ${wrapperPath}`);
    console.error('   Asegúrate de que el archivo existe.');
    rl.close();
    process.exit(1);
  }

  // Configurar MCP
  config.mcpServers['google-sheets'] = {
    command: 'node',
    args: [wrapperPath],
    env: {
      GOOGLE_CLIENT_ID: clientId.trim(),
      ...(clientSecret && clientSecret.trim() !== '' ? { GOOGLE_CLIENT_SECRET: clientSecret.trim() } : {}),
      GOOGLE_REDIRECT_URI: redirectUri.trim(),
    },
  };

  // Guardar configuración
  try {
    // Asegurar que el directorio existe
    const configDir = path.dirname(MCP_CONFIG_PATH);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(MCP_CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
    console.log('\n✅ Configuración guardada exitosamente!');
    console.log(`   Archivo: ${MCP_CONFIG_PATH}\n`);
  } catch (error) {
    console.error(`\n❌ Error guardando configuración: ${error.message}`);
    rl.close();
    process.exit(1);
  }

  rl.close();

  console.log('📋 Próximos pasos:');
  console.log('1. Reinicia Cursor completamente');
  console.log('2. El MCP iniciará automáticamente el flujo OAuth');
  console.log('3. Se abrirá tu navegador para autorizar');
  console.log('4. Después de autorizar, los tokens se guardarán automáticamente\n');
  console.log('⚠️  IMPORTANTE: Después de la primera autorización, agrega los tokens a la configuración:');
  console.log('   Agrega "GOOGLE_OAUTH_TOKENS" al objeto "env" en ~/.cursor/mcp.json\n');
}

configureGoogleSheetsMCPOAuth().catch((error) => {
  console.error(`\n❌ Error: ${error.message}`);
  process.exit(1);
});


