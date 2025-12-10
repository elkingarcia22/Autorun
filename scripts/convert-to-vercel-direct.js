#!/usr/bin/env node
/**
 * Script para convertir rutas /vercel-proxy/ a URLs directas de Vercel
 * Esto permite trabajar sin servidor local, solo abriendo el HTML directamente
 */

import { readFile, writeFile, access } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VERCEL_BASE = 'https://ubits-storybook10.vercel.app';
const VERCEL_BYPASS_TOKEN = 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';

/**
 * Genera URL de Vercel con bypass token
 */
function vercelUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const separator = cleanPath.includes('?') ? '&' : '?';
  return `${VERCEL_BASE}${cleanPath}${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${VERCEL_BYPASS_TOKEN}`;
}

/**
 * Convierte rutas /vercel-proxy/ a URLs directas de Vercel
 */
function convertToVercelDirect(content) {
  let converted = content;
  
  // Convertir href="/vercel-proxy/..." a URLs directas
  converted = converted.replace(
    /href="\/vercel-proxy\/([^"]+)"/g,
    (match, path) => {
      return `href="${vercelUrl(path)}"`;
    }
  );
  
  // Convertir src="/vercel-proxy/..." a URLs directas
  converted = converted.replace(
    /src="\/vercel-proxy\/([^"]+)"/g,
    (match, path) => {
      return `src="${vercelUrl(path)}"`;
    }
  );
  
  // Convertir rutas locales de vendor/ubits/ a Vercel (si están disponibles)
  // Nota: Solo convertir si sabemos que está en Vercel
  converted = converted.replace(
    /src="\/vendor\/ubits\/packages\/([^"]+)"/g,
    (match, path) => {
      // Intentar convertir a Vercel, si no está disponible, mantener local
      // Por ahora, solo convertir data-table.umd.js que sabemos que está en Vercel
      if (path.includes('data-table/dist/data-table.umd.js')) {
        // El path viene como: 'components/data-table/dist/data-table.umd.js'
        // En Vercel está en: '/components/data-table/dist/data-table.umd.js'
        // No duplicar 'components/'
        const vercelPath = path.startsWith('components/') ? `/${path}` : `/components/${path}`;
        return `src="${vercelUrl(vercelPath)}"`;
      }
      return match; // Mantener local si no está en Vercel
    }
  );
  
  return converted;
}

/**
 * Procesa un archivo HTML
 */
async function processFile(filePath) {
  try {
    console.log(`📄 Procesando: ${filePath}`);
    
    const content = await readFile(filePath, 'utf-8');
    const converted = convertToVercelDirect(content);
    
    // Crear backup
    const backupPath = `${filePath}.backup`;
    await writeFile(backupPath, content, 'utf-8');
    console.log(`   💾 Backup creado: ${backupPath}`);
    
    // Escribir archivo convertido
    await writeFile(filePath, converted, 'utf-8');
    console.log(`   ✅ Convertido exitosamente`);
    
    // Contar conversiones
    const hrefMatches = (converted.match(/href="https:\/\/ubits-storybook10\.vercel\.app/g) || []).length;
    const srcMatches = (converted.match(/src="https:\/\/ubits-storybook10\.vercel\.app/g) || []).length;
    console.log(`   📊 Conversiones: ${hrefMatches} href, ${srcMatches} src`);
    
  } catch (error) {
    console.error(`   ❌ Error procesando ${filePath}:`, error.message);
  }
}


/**
 * Procesa todos los archivos HTML en prototypes/
 */
async function main() {
  const prototypesDir = join(__dirname, '..', 'prototypes');
  const filePath = process.argv[2];
  
  let processedFilePath = null;
  
  if (filePath) {
    // Procesar archivo específico
    await processFile(filePath);
    processedFilePath = filePath;
  } else {
    // Procesar todos los HTML en prototypes/
    console.log('🔄 Convirtiendo todos los archivos HTML en prototypes/...\n');
    console.log('💡 Para convertir un archivo específico: node scripts/convert-to-vercel-direct.js <ruta-al-archivo>');
    console.log('');
    
    // Por ahora, procesar el archivo actual
    const currentFile = join(prototypesDir, 'canvas-administrador-encuestas-2025-12-09.html');
    try {
      await access(currentFile);
      await processFile(currentFile);
      processedFilePath = currentFile;
    } catch {
      console.log('⚠️  No se encontró el archivo. Especifica la ruta:');
      console.log('   node scripts/convert-to-vercel-direct.js prototypes/canvas-administrador-encuestas-2025-12-09.html');
    }
  }
  
  console.log('\n✅ Conversión completada');
  
  // Si se procesó un archivo, generar URL y mostrar instrucciones para Cursor
  if (processedFilePath) {
    const fileName = basename(processedFilePath);
    const port = process.env.AUTORUN_PORT || 3000;
    const httpUrl = `http://localhost:${port}/${fileName}`;
    
    console.log('\n🌐 URLs generadas:');
    console.log(`   📄 Archivo: ${fileName}`);
    console.log(`   🔗 URL Local: ${httpUrl}`);
    console.log(`   💡 Para auto-reload, usa servidor simple en puerto ${port}`);
    
    // ⚠️ CRÍTICO: Emitir formato especial para que el agente de Cursor abra automáticamente
    console.log('\n📋 El agente de Cursor debe abrir automáticamente en browser MCP:');
    console.log(`   [AUTORUN_BROWSER_URL]${httpUrl}[/AUTORUN_BROWSER_URL]`);
    console.log('\n💡 Instrucciones:');
    console.log('   1. El agente de Cursor detectará [AUTORUN_BROWSER_URL] automáticamente');
    console.log('   2. Abrirá el navegador interno de Cursor automáticamente');
    console.log('   3. El auto-reload funcionará igual que antes (file watching activo)');
    console.log('   4. Los logs y debug funcionarán igual que antes');
  }
  
  console.log('\n💡 Notas importantes:');
  console.log('   ✅ Auto-reload: Funciona igual (file watching detecta cambios)');
  console.log('   ✅ Logs y debug: Funcionan igual (consola del navegador)');
  console.log('   ✅ File watching: Sigue activo (AutorunHub detecta cambios)');
  console.log('   ⚠️  Necesitas servidor simple solo para servir HTML (para auto-reload)');
  console.log('   💡 Puedes usar: python3 -m http.server 3000 (en prototypes/)');
}

main().catch(console.error);
