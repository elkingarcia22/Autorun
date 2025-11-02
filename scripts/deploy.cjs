#!/usr/bin/env node

/**
 * Sistema de Despliegue
 * 
 * Despliega el proyecto en Vercel o Render
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function main() {
  log('\n🚀 Sistema de Despliegue UBITS\n', colors.cyan);
  log('═══════════════════════════════════════\n', colors.cyan);
  
  const configPath = path.join(process.cwd(), '.ubits', 'project-config.json');
  
  if (!fs.existsSync(configPath)) {
    log('❌ Configuración del proyecto no encontrada', colors.reset);
    process.exit(1);
  }
  
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  log('🌐 Plataformas de Despliegue:\n', colors.blue);
  log('1. Vercel (Recomendado)', colors.yellow);
  log('2. Render\n', colors.yellow);
  
  const platformChoice = await question('Selecciona plataforma (1 o 2): ');
  const platform = platformChoice.trim() === '2' ? 'render' : 'vercel';
  
  log(`\n🔧 Configurando despliegue en ${platform}...\n`, colors.blue);
  
  // Vercel
  if (platform === 'vercel') {
    log('📦 Instalando Vercel CLI...', colors.yellow);
    try {
      execSync('npm install -g vercel', { stdio: 'inherit' });
    } catch {
      log('⚠️  Vercel CLI ya instalado o requiere permisos', colors.yellow);
    }
    
    // Crear vercel.json
    const vercelConfig = {
      version: 2,
      builds: [
        {
          src: "packages/playground-app/**/*",
          use: "@vercel/static"
        }
      ],
      routes: [
        {
          src: "/(.*)",
          dest: "/packages/playground-app/$1"
        }
      ]
    };
    
    fs.writeFileSync(path.join(process.cwd(), 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
    log('✅ vercel.json creado', colors.green);
    
    log('\n🚀 Para desplegar:', colors.cyan);
    log('   vercel --prod', colors.yellow);
    
  } else {
    // Render
    log('📝 Creando configuración de Render...', colors.yellow);
    
    const renderYaml = `services:
  - type: web
    name: ${config.projectName}
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run dev
    envVars:
      - key: NODE_ENV
        value: production
`;
    
    fs.writeFileSync(path.join(process.cwd(), 'render.yaml'), renderYaml);
    log('✅ render.yaml creado', colors.green);
    
    log('\n🚀 Para desplegar:', colors.cyan);
    log('   1. Conecta tu repositorio en render.com', colors.yellow);
    log('   2. Selecciona "New Web Service"', colors.yellow);
    log('   3. Importa render.yaml\n', colors.yellow);
  }
  
  // Actualizar configuración
  config.deployment.platform = platform;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  
  log('✅ Configuración de despliegue completada!\n', colors.green);
  
  rl.close();
}

main().catch(error => {
  log(`\n❌ Error: ${error.message}`, colors.reset);
  process.exit(1);
});

