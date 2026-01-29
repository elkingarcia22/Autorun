#!/usr/bin/env node
/**
 * Script de diagnóstico para el MCP de Autorun en Cursor
 * Verifica configuración, paths y ejecución del servidor
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 DIAGNÓSTICO DEL MCP DE AUTORUN EN CURSOR\n');

// 1. Verificar configuración global
console.log('1️⃣ Verificando configuración global (~/.cursor/mcp.json)...');
const globalConfigPath = path.join(process.env.HOME, '.cursor', 'mcp.json');
if (fs.existsSync(globalConfigPath)) {
  console.log('   ✅ Archivo existe');
  try {
    const config = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));
    if (config.autorun) {
      console.log('   ✅ Configuración "autorun" encontrada');
      console.log(`   📋 Command: ${config.autorun.command}`);
      console.log(`   📋 Args: ${config.autorun.args?.join(' ') || 'ninguno'}`);
      
      // Verificar que el comando existe
      if (config.autorun.command && fs.existsSync(config.autorun.command)) {
        console.log('   ✅ Comando existe');
      } else {
        console.log('   ❌ Comando NO existe o no es accesible');
      }
      
      // Verificar que el script existe
      if (config.autorun.args && config.autorun.args[0]) {
        const scriptPath = config.autorun.args[0];
        if (fs.existsSync(scriptPath)) {
          console.log('   ✅ Script existe');
        } else {
          console.log('   ❌ Script NO existe:', scriptPath);
        }
      }
    } else {
      console.log('   ❌ Configuración "autorun" NO encontrada');
    }
  } catch (error) {
    console.log('   ❌ Error leyendo configuración:', error.message);
  }
} else {
  console.log('   ❌ Archivo NO existe');
}

// 2. Verificar configuración local
console.log('\n2️⃣ Verificando configuración local (.cursor/mcp.json)...');
const localConfigPath = path.join(process.cwd(), '.cursor', 'mcp.json');
if (fs.existsSync(localConfigPath)) {
  console.log('   ✅ Archivo existe');
  try {
    const config = JSON.parse(fs.readFileSync(localConfigPath, 'utf-8'));
    if (config.autorun) {
      console.log('   ✅ Configuración "autorun" encontrada');
      console.log(`   📋 Command: ${config.autorun.command}`);
      console.log(`   📋 Args: ${config.autorun.args?.join(' ') || 'ninguno'}`);
    } else {
      console.log('   ❌ Configuración "autorun" NO encontrada');
    }
  } catch (error) {
    console.log('   ❌ Error leyendo configuración:', error.message);
  }
} else {
  console.log('   ⚠️ Archivo NO existe (esto es normal si solo usas configuración global)');
}

// 3. Verificar que tsx existe
console.log('\n3️⃣ Verificando tsx...');
const tsxPath = path.join(process.cwd(), 'node_modules', '.bin', 'tsx');
if (fs.existsSync(tsxPath)) {
  console.log('   ✅ tsx existe');
  try {
    const version = execSync(`${tsxPath} --version`, { encoding: 'utf-8' }).trim();
    console.log(`   📋 Versión: ${version}`);
  } catch (error) {
    console.log('   ⚠️ No se pudo obtener versión');
  }
} else {
  console.log('   ❌ tsx NO existe');
}

// 4. Verificar que el servidor existe
console.log('\n4️⃣ Verificando servidor MCP...');
const serverPath = path.join(
  process.cwd(),
  'packages',
  'autorun-core',
  'src',
  'cli',
  'autorun-mcp-server-v2.ts' // ✅ ACTUALIZADO: Usar MCP v2
);
if (fs.existsSync(serverPath)) {
  console.log('   ✅ Servidor MCP v2 existe');
} else {
  console.log('   ❌ Servidor MCP v2 NO existe:', serverPath);
}

// 5. Intentar ejecutar el servidor
console.log('\n5️⃣ Intentando ejecutar servidor...');
try {
  const testCommand = `${tsxPath} ${serverPath} 2>&1 &`;
  execSync(testCommand, { timeout: 3000 });
  console.log('   ✅ Servidor se ejecutó (verificando proceso...)');
  
  // Esperar un poco y verificar
  setTimeout(() => {
    try {
      const processes = execSync('ps aux | grep "autorun-mcp-server" | grep -v grep', { encoding: 'utf-8' });
      if (processes) {
        console.log('   ✅ Proceso del servidor encontrado');
        execSync('pkill -f "autorun-mcp-server"', { stdio: 'ignore' });
      } else {
        console.log('   ⚠️ Proceso del servidor NO encontrado (puede haberse cerrado)');
      }
    } catch (error) {
      console.log('   ⚠️ No se pudo verificar proceso');
    }
  }, 1000);
} catch (error) {
  console.log('   ❌ Error al ejecutar servidor:', error.message);
}

// 6. Resumen
console.log('\n📋 RESUMEN:');
console.log('   Si todos los checks están ✅, el problema puede ser:');
console.log('   1. Cursor necesita reiniciarse completamente');
console.log('   2. Hay un problema de comunicación entre Cursor y el servidor');
console.log('   3. Cursor está usando una configuración diferente');
console.log('\n   Verifica los logs de Cursor (Output > MCP) para más detalles.');


