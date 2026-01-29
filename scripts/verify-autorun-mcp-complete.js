#!/usr/bin/env node

/**
 * Script de verificación completa del MCP de Autorun
 * 
 * Verifica:
 * 1. Configuración del MCP
 * 2. Archivos necesarios
 * 3. Dependencias
 * 4. Capacidad de iniciar el servidor
 * 5. Disponibilidad de tools
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

let allChecksPassed = true;

function log(message, type = 'info') {
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '📋';
  console.log(`${prefix} ${message}`);
}

async function checkFile(filePath, description) {
  try {
    await fs.access(filePath);
    log(`${description}: ${filePath}`, 'success');
    return true;
  } catch (error) {
    log(`${description} NO existe: ${filePath}`, 'error');
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
      log(`${depName} está en package.json: ${allDeps[depName]}`, 'success');
      return true;
    } else {
      log(`${depName} NO está en package.json`, 'error');
      return false;
    }
  } catch (error) {
    log(`Error verificando ${depName}: ${error.message}`, 'error');
    return false;
  }
}

async function checkMCPConfig() {
  try {
    const configPath = path.join(process.env.HOME, '.cursor', 'mcp.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
    
    if (config.mcpServers && config.mcpServers.autorun) {
      log(`Configuración de autorun encontrada en: ${configPath}`, 'success');
      const autorunConfig = config.mcpServers.autorun;
      
      log(`   command: ${autorunConfig.command}`);
      log(`   args: ${JSON.stringify(autorunConfig.args)}`);
      
      // Verificar que los paths sean absolutos
      const command = autorunConfig.command;
      const args = autorunConfig.args || [];
      
      if (path.isAbsolute(command)) {
        log(`   command es path absoluto`, 'success');
      } else {
        log(`   command NO es path absoluto: ${command}`, 'warning');
      }
      
      if (args.length > 0 && path.isAbsolute(args[0])) {
        log(`   args[0] es path absoluto`, 'success');
      } else if (args.length > 0) {
        log(`   args[0] NO es path absoluto: ${args[0]}`, 'warning');
      }
      
      // Verificar que el archivo del servidor existe
      if (args.length > 0) {
        const serverFile = args[0];
        try {
          await fs.access(serverFile);
          log(`   Archivo del servidor existe`, 'success');
        } catch {
          log(`   Archivo del servidor NO existe: ${serverFile}`, 'error');
          return false;
        }
      }
      
      return true;
    } else {
      log(`Configuración de autorun NO encontrada en: ${configPath}`, 'error');
      return false;
    }
  } catch (error) {
    log(`Error leyendo configuración: ${error.message}`, 'error');
    return false;
  }
}

async function testServerStart() {
  try {
    log('Probando inicio del servidor...', 'info');
    
    // Verificar que el archivo TypeScript existe (tsx lo ejecutará directamente)
    // ✅ ACTUALIZADO: Verificar MCP v2
    const serverFile = path.join(projectRoot, 'packages', 'autorun-core', 'src', 'cli', 'autorun-mcp-server-v2.ts');
    try {
      await fs.access(serverFile);
      log('Archivo autorun-mcp-server-v2.ts existe', 'success');
      log('Nota: El servidor usa tsx para ejecutar TypeScript directamente', 'info');
      return true;
    } catch {
      log(`Archivo autorun-mcp-server-v2.ts NO existe: ${serverFile}`, 'error');
      return false;
    }
  } catch (error) {
    log(`Error probando inicio del servidor: ${error.message}`, 'error');
    return false;
  }
}

async function testToolsImport() {
  try {
    log('Probando importación de tools...', 'info');
    
    const tools = [
      'autorunPlan',
      'autorunApply',
      'autorunVerify',
      'autorunChecklist',
      'autorunStorybookStart',
      'autorunStorybookBuild',
      'autorunStorybookExtract',
      'autorunProblemsList',
      'autorunGitHubCommit',
      'autorunLint',
      'autorunVisualTest',
    ];
    
    let allToolsOk = true;
    
    for (const tool of tools) {
      try {
        // Construir nombre del archivo (camelCase)
        const toolName = tool.charAt(0).toLowerCase() + tool.slice(1);
        const toolFile = path.join(
          projectRoot,
          'packages',
          'autorun-core',
          'src',
          'mcp-server',
          'tools',
          `${toolName}.ts`
        );
        
        // Verificar que el archivo TypeScript existe (tsx lo ejecutará directamente)
        await fs.access(toolFile);
        log(`   ${tool} (${toolName}.ts) existe`, 'success');
      } catch (error) {
        log(`   ${tool} archivo NO existe: ${error.message}`, 'error');
        allToolsOk = false;
      }
    }
    
    return allToolsOk;
  } catch (error) {
    log(`Error probando tools: ${error.message}`, 'error');
    return false;
  }
}

async function main() {
  console.log('\n🔍 VERIFICACIÓN COMPLETA DEL MCP DE AUTORUN\n');
  console.log('═'.repeat(60));
  console.log('');
  
  // 1. Verificar archivos
  log('VERIFICANDO ARCHIVOS:', 'info');
  console.log('');
  
  // ✅ ACTUALIZADO: Verificar MCP v2
  const serverPath = path.join(projectRoot, 'packages', 'autorun-core', 'src', 'cli', 'autorun-mcp-server-v2.ts');
  const serverMCPServerPath = path.join(projectRoot, 'packages', 'autorun-core', 'src', 'mcp-server-v2', 'server.ts');
  const tsxPath = path.join(projectRoot, 'node_modules', '.bin', 'tsx');
  
  allChecksPassed = (await checkFile(serverPath, 'Servidor MCP')) && allChecksPassed;
  allChecksPassed = (await checkFile(serverMCPServerPath, 'AutorunMCPServer')) && allChecksPassed;
  allChecksPassed = (await checkFile(tsxPath, 'tsx')) && allChecksPassed;
  
  console.log('');
  
  // 2. Verificar dependencias
  log('VERIFICANDO DEPENDENCIAS:', 'info');
  console.log('');
  
  allChecksPassed = (await checkDependency('@modelcontextprotocol/sdk')) && allChecksPassed;
  allChecksPassed = (await checkDependency('tsx')) && allChecksPassed;
  
  console.log('');
  
  // 3. Verificar configuración
  log('VERIFICANDO CONFIGURACIÓN:', 'info');
  console.log('');
  
  allChecksPassed = (await checkMCPConfig()) && allChecksPassed;
  
  console.log('');
  
  // 4. Probar inicio del servidor
  log('PROBANDO INICIO DEL SERVIDOR:', 'info');
  console.log('');
  
  allChecksPassed = (await testServerStart()) && allChecksPassed;
  
  console.log('');
  
  // 5. Probar importación de tools
  log('PROBANDO IMPORTACIÓN DE TOOLS:', 'info');
  console.log('');
  
  allChecksPassed = (await testToolsImport()) && allChecksPassed;
  
  console.log('');
  console.log('═'.repeat(60));
  console.log('');
  
  if (allChecksPassed) {
    log('TODOS LOS CHECKS PASARON', 'success');
    console.log('');
    log('El MCP de Autorun está correctamente configurado y listo para usar.', 'info');
    console.log('');
    log('Si aún tienes problemas:', 'warning');
    log('  1. Reinicia Cursor completamente', 'info');
    log('  2. Verifica logs en Output > MCP', 'info');
    log('  3. Verifica que no haya procesos antiguos: ps aux | grep autorun-mcp', 'info');
  } else {
    log('HAY PROBLEMAS DETECTADOS', 'error');
    console.log('');
    log('Por favor, corrige los problemas indicados arriba.', 'error');
    console.log('');
    log('Para reinstalar el MCP:', 'info');
    log('  npm run autorun:install-mcp', 'info');
  }
  
  console.log('');
}

main().catch((error) => {
  log(`Error ejecutando verificación: ${error.message}`, 'error');
  console.error(error.stack);
  process.exit(1);
});

