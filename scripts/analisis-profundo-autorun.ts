/**
 * Análisis Profundo de Autorun
 * Verifica que todas las herramientas necesarias estén activas y funcionando
 */

import { getAutorunHub } from '../packages/autorun-core/src/index.js';
import { StorybookManager } from '../packages/autorun-core/src/helpers/storybookManager.js';
import { ComponentMetadataCache } from '../packages/autorun-core/src/helpers/componentMetadataCache.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import * as os from 'os';

interface VerificationResult {
  category: string;
  item: string;
  status: '✅' | '⚠️' | '❌';
  message: string;
  details?: any;
}

const results: VerificationResult[] = [];

function addResult(category: string, item: string, status: '✅' | '⚠️' | '❌', message: string, details?: any) {
  results.push({ category, item, status, message, details });
}

async function main() {
  console.log('🔍 ANÁLISIS PROFUNDO DE AUTORUN\n');
  console.log('='.repeat(70));
  
  // ========================================
  // 1. AUTORUNHUB
  // ========================================
  console.log('\n1️⃣ VERIFICANDO AUTORUNHUB...');
  try {
    const hub = await getAutorunHub();
    const isInitialized = hub.isInitialized();
    const isFileWatching = hub.isFileWatchingActive();
    const addons = hub.getActiveAddons();
    
    addResult('AutorunHub', 'Inicialización', isInitialized ? '✅' : '❌', 
      isInitialized ? 'AutorunHub inicializado' : 'AutorunHub NO inicializado');
    
    addResult('AutorunHub', 'File Watching', isFileWatching ? '✅' : '❌',
      isFileWatching ? 'File Watching activo' : 'File Watching NO activo');
    
    addResult('AutorunHub', 'Add-ons', addons.length > 0 ? '✅' : '⚠️',
      `${addons.length} add-on(s) activo(s)`, 
      { addons: addons.map(a => a.id) });
    
    console.log(`   ${isInitialized ? '✅' : '❌'} Inicializado: ${isInitialized}`);
    console.log(`   ${isFileWatching ? '✅' : '❌'} File Watching: ${isFileWatching}`);
    console.log(`   ${addons.length > 0 ? '✅' : '⚠️'} Add-ons: ${addons.length}`);
  } catch (error: any) {
    addResult('AutorunHub', 'Error', '❌', error.message);
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // ========================================
  // 2. STORYBOOK
  // ========================================
  console.log('\n2️⃣ VERIFICANDO STORYBOOK...');
  try {
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();
    
    if (activeConfig) {
      addResult('Storybook', 'Conexión', '✅', 'Storybook activo', {
        name: activeConfig.name,
        url: activeConfig.url,
        id: activeConfig.id
      });
      console.log(`   ✅ Storybook activo: ${activeConfig.name}`);
      console.log(`   📍 URL: ${activeConfig.url}`);
    } else {
      addResult('Storybook', 'Conexión', '⚠️', 'No hay Storybook activo');
      console.log(`   ⚠️ No hay Storybook activo`);
    }
  } catch (error: any) {
    addResult('Storybook', 'Error', '❌', error.message);
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // ========================================
  // 3. CACHÉ DE METADATOS
  // ========================================
  console.log('\n3️⃣ VERIFICANDO CACHÉ DE METADATOS...');
  try {
    await ComponentMetadataCache.initialize();
    const stats = await ComponentMetadataCache.getStats();
    
    addResult('Caché', 'Inicialización', '✅', 'Caché inicializado', stats);
    console.log(`   ✅ Caché inicializado`);
    console.log(`   📊 Estadísticas:`, stats);
  } catch (error: any) {
    addResult('Caché', 'Error', '❌', error.message);
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // ========================================
  // 4. SISTEMAS DINÁMICOS
  // ========================================
  console.log('\n4️⃣ VERIFICANDO SISTEMAS DINÁMICOS...');
  
  // 4.1 StorybookDynamicMapper
  try {
    const { StorybookDynamicMapper } = await import('../packages/autorun-core/src/helpers/storybookDynamicMapper.js');
    // ⚠️ CORREGIDO: Usar getAllComponentNames() que ahora existe
    const componentNames = await StorybookDynamicMapper.getAllComponentNames();
    addResult('Sistemas Dinámicos', 'StorybookDynamicMapper', '✅', 
      `${componentNames.length} componentes disponibles`, { count: componentNames.length });
    console.log(`   ✅ StorybookDynamicMapper: ${componentNames.length} componentes`);
  } catch (error: any) {
    addResult('Sistemas Dinámicos', 'StorybookDynamicMapper', '❌', error.message);
    console.log(`   ❌ StorybookDynamicMapper: ${error.message}`);
  }
  
  // 4.2 DynamicVariantExtractor
  try {
    const { DynamicVariantExtractor } = await import('../packages/autorun-core/src/helpers/dynamicVariantExtractor.js');
    addResult('Sistemas Dinámicos', 'DynamicVariantExtractor', '✅', 'Disponible');
    console.log(`   ✅ DynamicVariantExtractor: Disponible`);
  } catch (error: any) {
    addResult('Sistemas Dinámicos', 'DynamicVariantExtractor', '❌', error.message);
    console.log(`   ❌ DynamicVariantExtractor: ${error.message}`);
  }
  
  // 4.3 DynamicPropertyExtractor
  try {
    const { DynamicPropertyExtractor } = await import('../packages/autorun-core/src/helpers/dynamicPropertyExtractor.js');
    addResult('Sistemas Dinámicos', 'DynamicPropertyExtractor', '✅', 'Disponible');
    console.log(`   ✅ DynamicPropertyExtractor: Disponible`);
  } catch (error: any) {
    addResult('Sistemas Dinámicos', 'DynamicPropertyExtractor', '❌', error.message);
    console.log(`   ❌ DynamicPropertyExtractor: ${error.message}`);
  }
  
  // 4.4 DynamicTypeExtractor
  try {
    const { DynamicTypeExtractor } = await import('../packages/autorun-core/src/helpers/dynamicTypeExtractor.js');
    addResult('Sistemas Dinámicos', 'DynamicTypeExtractor', '✅', 'Disponible');
    console.log(`   ✅ DynamicTypeExtractor: Disponible`);
  } catch (error: any) {
    addResult('Sistemas Dinámicos', 'DynamicTypeExtractor', '❌', error.message);
    console.log(`   ❌ DynamicTypeExtractor: ${error.message}`);
  }
  
  // ========================================
  // 5. HELPERS DE INTEGRACIÓN
  // ========================================
  console.log('\n5️⃣ VERIFICANDO HELPERS DE INTEGRACIÓN...');
  
  // 5.1 IntegrationHelper
  try {
    const { IntegrationHelper } = await import('../packages/autorun-core/src/helpers/integrationHelper.js');
    addResult('Integración', 'IntegrationHelper', '✅', 'Disponible');
    console.log(`   ✅ IntegrationHelper: Disponible`);
  } catch (error: any) {
    addResult('Integración', 'IntegrationHelper', '❌', error.message);
    console.log(`   ❌ IntegrationHelper: ${error.message}`);
  }
  
  // 5.2 IntelligentComponentParser
  try {
    const { IntelligentComponentParser } = await import('../packages/autorun-core/src/helpers/intelligentComponentParser.js');
    addResult('Integración', 'IntelligentComponentParser', '✅', 'Disponible');
    console.log(`   ✅ IntelligentComponentParser: Disponible`);
  } catch (error: any) {
    addResult('Integración', 'IntelligentComponentParser', '❌', error.message);
    console.log(`   ❌ IntelligentComponentParser: ${error.message}`);
  }
  
  // 5.3 autoMessageHandler
  try {
    const { handleUserMessage } = await import('../packages/autorun-core/src/helpers/autoMessageHandler.js');
    addResult('Integración', 'handleUserMessage', '✅', 'Disponible');
    console.log(`   ✅ handleUserMessage: Disponible`);
  } catch (error: any) {
    addResult('Integración', 'handleUserMessage', '❌', error.message);
    console.log(`   ❌ handleUserMessage: ${error.message}`);
  }
  
  // ========================================
  // 6. MCPs CONFIGURADOS
  // ========================================
  console.log('\n6️⃣ VERIFICANDO MCPs...');
  try {
    const mcpConfigPath = '.cursor/mcp.json';
    const mcpConfigContent = await fs.readFile(mcpConfigPath, 'utf-8');
    const mcpConfig = JSON.parse(mcpConfigContent);
    const mcpServers = Object.keys(mcpConfig.mcpServers || {});
    
    addResult('MCPs', 'Configuración', mcpServers.length > 0 ? '✅' : '⚠️',
      `${mcpServers.length} servidor(es) MCP configurado(s)`, 
      { servers: mcpServers });
    console.log(`   ${mcpServers.length > 0 ? '✅' : '⚠️'} MCPs: ${mcpServers.length}`);
    console.log(`   📋 Servidores: ${mcpServers.join(', ')}`);
    
    // Verificar Storybook MCP específicamente
    // ⚠️ MEJORADO: Verificar también en la configuración de Cursor (cline_mcp_settings.json)
    let storybookMCPConfigured = false;
    let storybookMCPUrl = 'N/A';
    
    if (mcpConfig.mcpServers?.storybook) {
      storybookMCPConfigured = true;
      storybookMCPUrl = mcpConfig.mcpServers.storybook.env?.STORYBOOK_URL || 'N/A';
    } else {
      // Verificar en configuración de Cursor
      try {
        const cursorMCPPath = path.join(
          os.homedir(),
          'Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json'
        );
        const cursorMCPContent = await fs.readFile(cursorMCPPath, 'utf-8');
        const cursorMCPConfig = JSON.parse(cursorMCPContent);
        if (cursorMCPConfig.mcpServers?.storybook) {
          storybookMCPConfigured = true;
          storybookMCPUrl = cursorMCPConfig.mcpServers.storybook.env?.STORYBOOK_URL || 'N/A';
        }
      } catch (error) {
        // Ignorar si no existe
      }
    }
    
    if (storybookMCPConfigured) {
      addResult('MCPs', 'Storybook MCP', '✅', 'Storybook MCP configurado', { url: storybookMCPUrl });
      console.log(`   ✅ Storybook MCP: Configurado (${storybookMCPUrl.substring(0, 50)}...)`);
    } else {
      addResult('MCPs', 'Storybook MCP', '⚠️', 'Storybook MCP no configurado en .cursor/mcp.json');
      console.log(`   ⚠️ Storybook MCP: No configurado en .cursor/mcp.json (verificar configuración de Cursor)`);
    }
  } catch (error: any) {
    addResult('MCPs', 'Error', '❌', error.message);
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // ========================================
  // 7. WRAPPER DE STORYBOOK MCP
  // ========================================
  console.log('\n7️⃣ VERIFICANDO WRAPPER DE STORYBOOK MCP...');
  try {
    const wrapperPath = 'scripts/storybook-mcp-wrapper.mjs';
    const wrapperExists = await fs.access(wrapperPath).then(() => true).catch(() => false);
    
    if (wrapperExists) {
      const wrapperContent = await fs.readFile(wrapperPath, 'utf-8');
      const hasExpansion = wrapperContent.includes('Expandiendo opciones colapsadas');
      const hasSubcomponents = wrapperContent.includes('activateInteractiveSubcomponents');
      
      addResult('Wrapper MCP', 'Archivo', '✅', 'Wrapper existe');
      addResult('Wrapper MCP', 'Expansión automática', hasExpansion ? '✅' : '⚠️',
        hasExpansion ? 'Expansión automática implementada' : 'Expansión automática NO encontrada');
      addResult('Wrapper MCP', 'Subcomponentes', hasSubcomponents ? '✅' : '⚠️',
        hasSubcomponents ? 'Activación de subcomponentes implementada' : 'Activación de subcomponentes NO encontrada');
      
      console.log(`   ✅ Wrapper existe`);
      console.log(`   ${hasExpansion ? '✅' : '⚠️'} Expansión automática: ${hasExpansion ? 'Sí' : 'No'}`);
      console.log(`   ${hasSubcomponents ? '✅' : '⚠️'} Subcomponentes: ${hasSubcomponents ? 'Sí' : 'No'}`);
    } else {
      addResult('Wrapper MCP', 'Archivo', '❌', 'Wrapper NO existe');
      console.log(`   ❌ Wrapper NO existe`);
    }
  } catch (error: any) {
    addResult('Wrapper MCP', 'Error', '❌', error.message);
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // ========================================
  // 8. ARCHIVOS CRÍTICOS
  // ========================================
  console.log('\n8️⃣ VERIFICANDO ARCHIVOS CRÍTICOS...');
  const criticalFiles = [
    'packages/autorun-core/src/mcp-server/tools/autorunApply.ts',
    'packages/autorun-core/src/helpers/autoMessageHandler.ts',
    'packages/autorun-core/src/helpers/integrationHelper.ts',
    'packages/autorun-core/src/helpers/storybookDynamicMapper.ts',
    'packages/autorun-core/src/helpers/componentMetadataCache.ts',
  ];
  
  for (const file of criticalFiles) {
    try {
      await fs.access(file);
      addResult('Archivos', path.basename(file), '✅', 'Existe');
      console.log(`   ✅ ${path.basename(file)}`);
    } catch {
      addResult('Archivos', path.basename(file), '❌', 'NO existe');
      console.log(`   ❌ ${path.basename(file)}: NO existe`);
    }
  }
  
  // ========================================
  // RESUMEN FINAL
  // ========================================
  console.log('\n' + '='.repeat(70));
  console.log('📊 RESUMEN FINAL\n');
  
  const success = results.filter(r => r.status === '✅').length;
  const warnings = results.filter(r => r.status === '⚠️').length;
  const errors = results.filter(r => r.status === '❌').length;
  
  console.log(`   ✅ Exitosos: ${success}`);
  console.log(`   ⚠️ Advertencias: ${warnings}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log(`   📊 Total: ${results.length}`);
  
  // Mostrar solo errores y advertencias
  if (warnings > 0 || errors > 0) {
    console.log('\n⚠️ ADVERTENCIAS Y ERRORES:\n');
    results.filter(r => r.status !== '✅').forEach(r => {
      console.log(`   ${r.status} [${r.category}] ${r.item}: ${r.message}`);
      if (r.details) {
        console.log(`      Detalles:`, JSON.stringify(r.details, null, 2));
      }
    });
  }
  
  // Calcular porcentaje de funcionalidad
  const percentage = ((success / results.length) * 100).toFixed(1);
  console.log(`\n📈 FUNCIONALIDAD: ${percentage}%`);
  
  if (percentage >= 90) {
    console.log('✅ Autorun está COMPLETAMENTE FUNCIONAL');
  } else if (percentage >= 70) {
    console.log('⚠️ Autorun está MAYORMENTE FUNCIONAL (algunas mejoras recomendadas)');
  } else {
    console.log('❌ Autorun tiene PROBLEMAS CRÍTICOS que deben resolverse');
  }
  
  console.log('\n' + '='.repeat(70));
}

main().catch(console.error);
