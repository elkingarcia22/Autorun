#!/usr/bin/env node

/**
 * Script de diagnóstico para el MCP de Autorun
 * 
 * Este script verifica:
 * 1. Si los archivos existen
 * 2. Si las dependencias están instaladas
 * 3. Si el servidor se puede ejecutar
 * 4. Si la configuración es correcta
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

async function checkFile(filePath, description) {
  try {
    await fs.access(filePath);
    console.log(`✅ ${description}: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} NO existe: ${filePath}`);
    return false;
  }
}

async function checkDependency(depName) {
  try {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };
    
    if (allDeps[depName]) {
      console.log(`✅ ${depName} está en package.json: ${allDeps[depName]}`);
      return true;
    } else {
      console.error(`❌ ${depName} NO está en package.json`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error verificando ${depName}: ${error.message}`);
    return false;
  }
}

async function checkMCPConfig() {
  try {
    const configPath = path.join(process.env.HOME, '.cursor', 'mcp.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
    
    if (config.mcpServers && config.mcpServers.autorun) {
      console.log(`✅ Configuración de autorun encontrada en: ${configPath}`);
      console.log(`   command: ${config.mcpServers.autorun.command}`);
      console.log(`   args: ${JSON.stringify(config.mcpServers.autorun.args)}`);
      
      // Verificar que los paths sean absolutos
      const command = config.mcpServers.autorun.command;
      const args = config.mcpServers.autorun.args || [];
      
      if (path.isAbsolute(command)) {
        console.log(`   ✅ command es path absoluto`);
      } else {
        console.error(`   ❌ command NO es path absoluto: ${command}`);
      }
      
      if (args.length > 0 && path.isAbsolute(args[0])) {
        console.log(`   ✅ args[0] es path absoluto`);
      } else if (args.length > 0) {
        console.error(`   ❌ args[0] NO es path absoluto: ${args[0]}`);
      }
      
      return true;
    } else {
      console.error(`❌ Configuración de autorun NO encontrada en: ${configPath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error leyendo configuración: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🔍 DIAGNÓSTICO DEL MCP DE AUTORUN\n');
  console.log('═'.repeat(60));
  console.log('');
  
  let allOk = true;
  
  // Verificar archivos
  console.log('📁 VERIFICANDO ARCHIVOS:');
  console.log('');
  
  // ✅ ACTUALIZADO: Usar MCP v2
  const serverPath = path.join(projectRoot, 'packages', 'autorun-core', 'src', 'cli', 'autorun-mcp-server-v2.ts');
  const serverMCPServerPath = path.join(projectRoot, 'packages', 'autorun-core', 'src', 'mcp-server-v2', 'server.ts');
  const tsxPath = path.join(projectRoot, 'node_modules', '.bin', 'tsx');
  
  allOk = (await checkFile(serverPath, 'Servidor MCP')) && allOk;
  allOk = (await checkFile(serverMCPServerPath, 'AutorunMCPServer')) && allOk;
  allOk = (await checkFile(tsxPath, 'tsx')) && allOk;
  
  console.log('');
  
  // Verificar dependencias
  console.log('📦 VERIFICANDO DEPENDENCIAS:');
  console.log('');
  
  allOk = (await checkDependency('@modelcontextprotocol/sdk')) && allOk;
  allOk = (await checkDependency('tsx')) && allOk;
  
  console.log('');
  
  // Verificar configuración
  console.log('⚙️  VERIFICANDO CONFIGURACIÓN:');
  console.log('');
  
  allOk = (await checkMCPConfig()) && allOk;
  
  console.log('');
  console.log('═'.repeat(60));
  console.log('');
  
  if (allOk) {
    console.log('✅ TODOS LOS CHECKS PASARON');
    console.log('');
    console.log('El problema puede ser:');
    console.log('  1. El servidor se está ejecutando pero hay un error de comunicación');
    console.log('  2. Hay múltiples procesos del servidor corriendo (conflicto)');
    console.log('  3. Cursor no está leyendo la configuración correctamente');
    console.log('');
    console.log('Próximos pasos:');
    console.log('  1. Reiniciar Cursor completamente');
    console.log('  2. Verificar logs en Output > MCP');
    console.log('  3. Verificar que no haya procesos antiguos: ps aux | grep autorun-mcp');
  } else {
    console.log('❌ HAY PROBLEMAS DETECTADOS');
    console.log('');
    console.log('Por favor, corrige los problemas indicados arriba.');
  }
}

main().catch((error) => {
  console.error('❌ Error ejecutando diagnóstico:', error);
  process.exit(1);
});



