#!/usr/bin/env node
/**
 * Script para configurar Google Sheets MCP con credenciales
 * 
 * Uso:
 *   node scripts/configure-google-sheets-mcp.js
 *   node scripts/configure-google-sheets-mcp.js --project-id=mi-proyecto --credentials=/ruta/al/archivo.json
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const MCP_CONFIG_PATH = path.join(process.env.HOME || process.env.USERPROFILE, '.cursor', 'mcp.json');

async function question(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function configureGoogleSheetsMCP() {
  console.log('🔧 Configurando Google Sheets MCP\n');

  // Leer argumentos de línea de comandos
  const args = process.argv.slice(2);
  const projectIdArg = args.find(arg => arg.startsWith('--project-id='))?.split('=')[1];
  const credentialsArg = args.find(arg => arg.startsWith('--credentials='))?.split('=')[1];

  // Cargar configuración existente
  let config = { mcpServers: {} };
  try {
    if (fs.existsSync(MCP_CONFIG_PATH)) {
      const content = fs.readFileSync(MCP_CONFIG_PATH, 'utf-8');
      config = JSON.parse(content);
      if (!config.mcpServers) {
        config.mcpServers = {};
      }
    }
  } catch (error) {
    console.warn(`⚠️  Error leyendo configuración existente: ${error.message}`);
    console.log('   Creando nueva configuración...\n');
  }

  // Verificar si ya está configurado
  if (config.mcpServers['google-sheets'] && config.mcpServers['google-sheets'].env) {
    const existingEnv = config.mcpServers['google-sheets'].env;
    const hasCredentials = 
      (existingEnv.GOOGLE_PROJECT_ID && existingEnv.GOOGLE_PROJECT_ID.trim() !== '') ||
      (existingEnv.GOOGLE_APPLICATION_CREDENTIALS && existingEnv.GOOGLE_APPLICATION_CREDENTIALS.trim() !== '') ||
      (existingEnv.GOOGLE_SERVICE_ACCOUNT_KEY && existingEnv.GOOGLE_SERVICE_ACCOUNT_KEY.trim() !== '') ||
      (existingEnv.GOOGLE_PRIVATE_KEY && existingEnv.GOOGLE_PRIVATE_KEY.trim() !== '');

    if (hasCredentials) {
      console.log('✅ Google Sheets MCP ya está configurado con credenciales.\n');
      console.log('   Configuración actual:');
      console.log(`   - GOOGLE_PROJECT_ID: ${existingEnv.GOOGLE_PROJECT_ID || '(no configurado)'}`);
      console.log(`   - GOOGLE_APPLICATION_CREDENTIALS: ${existingEnv.GOOGLE_APPLICATION_CREDENTIALS || '(no configurado)'}`);
      console.log(`   - GOOGLE_SERVICE_ACCOUNT_KEY: ${existingEnv.GOOGLE_SERVICE_ACCOUNT_KEY ? '(configurado)' : '(no configurado)'}`);
      console.log(`   - GOOGLE_PRIVATE_KEY: ${existingEnv.GOOGLE_PRIVATE_KEY ? '(configurado)' : '(no configurado)'}`);
      console.log(`   - GOOGLE_CLIENT_EMAIL: ${existingEnv.GOOGLE_CLIENT_EMAIL || '(no configurado)'}\n`);
      
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const overwrite = await question(rl, '¿Quieres sobrescribir la configuración? (s/N): ');
      rl.close();
      
      if (overwrite.toLowerCase() !== 's' && overwrite.toLowerCase() !== 'y') {
        console.log('   Configuración no modificada.\n');
        return;
      }
    }
  }

  // Configurar credenciales
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('📋 Configuración de credenciales de Google Cloud\n');
  console.log('   Necesitas:');
  console.log('   1. Project ID de Google Cloud');
  console.log('   2. Service Account Key (archivo JSON) o credenciales individuales\n');
  console.log('   Si no tienes credenciales, sigue esta guía:');
  console.log('   https://console.cloud.google.com/apis/credentials\n');

  // Project ID
  const projectId = projectIdArg || await question(rl, '🔑 Google Project ID (o Enter para omitir): ');
  
  // Método de autenticación
  console.log('\n   Métodos de autenticación:');
  console.log('   1. Archivo de credenciales (GOOGLE_APPLICATION_CREDENTIALS) - Recomendado');
  console.log('   2. JSON string completo (GOOGLE_SERVICE_ACCOUNT_KEY)');
  console.log('   3. Private Key + Email (GOOGLE_PRIVATE_KEY + GOOGLE_CLIENT_EMAIL)');
  
  const method = await question(rl, '\n   Selecciona método (1-3, Enter para omitir): ');

  const env = {};

  if (projectId && projectId.trim() !== '') {
    env.GOOGLE_PROJECT_ID = projectId.trim();
  }

  if (method === '1') {
    // Método 1: Archivo de credenciales
    const credentialsPath = credentialsArg || await question(rl, '📁 Ruta absoluta al archivo JSON de credenciales: ');
    
    if (credentialsPath && credentialsPath.trim() !== '') {
      const fullPath = path.resolve(credentialsPath.trim());
      
      // Verificar que el archivo existe
      if (!fs.existsSync(fullPath)) {
        console.error(`\n❌ Error: El archivo no existe: ${fullPath}`);
        rl.close();
        process.exit(1);
      }
      
      // Verificar que es un JSON válido
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const json = JSON.parse(content);
        if (!json.type || json.type !== 'service_account') {
          console.warn('⚠️  Advertencia: El archivo no parece ser un Service Account Key válido');
        }
      } catch (error) {
        console.error(`\n❌ Error: El archivo no es un JSON válido: ${error.message}`);
        rl.close();
        process.exit(1);
      }
      
      env.GOOGLE_APPLICATION_CREDENTIALS = fullPath;
      console.log(`\n✅ Archivo de credenciales configurado: ${fullPath}`);
    }
  } else if (method === '2') {
    // Método 2: JSON string completo
    console.log('\n   Pega el contenido completo del archivo JSON de credenciales:');
    const jsonString = await question(rl, '   (Pega el JSON completo y presiona Enter): ');
    
    if (jsonString && jsonString.trim() !== '') {
      try {
        const json = JSON.parse(jsonString.trim());
        if (!json.type || json.type !== 'service_account') {
          console.warn('⚠️  Advertencia: El JSON no parece ser un Service Account Key válido');
        }
        env.GOOGLE_SERVICE_ACCOUNT_KEY = jsonString.trim();
        console.log('\n✅ JSON string configurado');
      } catch (error) {
        console.error(`\n❌ Error: JSON inválido: ${error.message}`);
        rl.close();
        process.exit(1);
      }
    }
  } else if (method === '3') {
    // Método 3: Private Key + Email
    const privateKey = await question(rl, '🔐 Private Key (-----BEGIN PRIVATE KEY-----...): ');
    const clientEmail = await question(rl, '📧 Client Email (service-account@project.iam.gserviceaccount.com): ');
    
    if (privateKey && privateKey.trim() !== '' && clientEmail && clientEmail.trim() !== '') {
      env.GOOGLE_PRIVATE_KEY = privateKey.trim();
      env.GOOGLE_CLIENT_EMAIL = clientEmail.trim();
      console.log('\n✅ Private Key y Email configurados');
    }
  }

  rl.close();

  // Verificar que hay al menos Project ID o credenciales
  if (Object.keys(env).length === 0) {
    console.log('\n⚠️  No se configuraron credenciales. El MCP no funcionará sin ellas.');
    console.log('   Puedes ejecutar este script nuevamente para configurarlas.\n');
    return;
  }

  // Actualizar configuración
  if (!config.mcpServers['google-sheets']) {
    config.mcpServers['google-sheets'] = {
      command: 'npx',
      args: ['-y', 'mcp-gsheets@latest'],
      env: {}
    };
  }

  // Combinar con credenciales existentes (si las hay)
  config.mcpServers['google-sheets'].env = {
    ...config.mcpServers['google-sheets'].env,
    ...env
  };

  // Guardar configuración
  try {
    // Asegurar que el directorio existe
    const configDir = path.dirname(MCP_CONFIG_PATH);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(MCP_CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
    console.log(`\n✅ Configuración guardada en: ${MCP_CONFIG_PATH}\n`);
    console.log('⚠️  IMPORTANTE: Debes reiniciar Cursor completamente para que los cambios surtan efecto.\n');
    console.log('   Configuración aplicada:');
    console.log(JSON.stringify(config.mcpServers['google-sheets'], null, 2));
  } catch (error) {
    console.error(`\n❌ Error guardando configuración: ${error.message}`);
    process.exit(1);
  }
}

// Ejecutar
configureGoogleSheetsMCP().catch(error => {
  console.error(`\n❌ Error: ${error.message}`);
  process.exit(1);
});


