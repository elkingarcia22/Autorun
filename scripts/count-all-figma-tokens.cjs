#!/usr/bin/env node
/**
 * Script para contar TODOS los tokens de color en Figma
 * Lee todos los archivos JSON y resuelve referencias correctamente
 */

const fs = require('fs');
const path = require('path');

const FIGMA_DIR = '/Users/elkinmac/Desktop/tokens';
const OUTPUT_REPORT = '/Users/elkinmac/Desktop/Autoframe/CONTEO_TOKENS_FIGMA.md';

// Cargar p-colors para resolver referencias
function loadPColors() {
  const pColorsFile = path.join(FIGMA_DIR, 'p-colors', 'Mode 1.json');
  if (!fs.existsSync(pColorsFile)) {
    console.warn('⚠️  No se encontró p-colors/Mode 1.json');
    return {};
  }
  
  const data = JSON.parse(fs.readFileSync(pColorsFile, 'utf8'));
  const colors = {};
  
  function extract(obj, prefix = '') {
    if (typeof obj === 'object' && obj !== null) {
      if (obj.$value && typeof obj.$value === 'string' && obj.$value.startsWith('#')) {
        colors[prefix] = obj.$value.toLowerCase();
      }
      for (const key in obj) {
        if (key !== '$type' && key !== '$description') {
          extract(obj[key], prefix ? `${prefix}.${key}` : key);
        }
      }
    }
  }
  
  extract(data);
  return colors;
}

// Resolver referencias como {pec.blue.44}
function resolveReference(ref, pColors) {
  if (!ref || typeof ref !== 'string') return null;
  
  if (ref.startsWith('#')) {
    return ref.toLowerCase();
  }
  
  if (ref.startsWith('{') && ref.endsWith('}')) {
    const key = ref.slice(1, -1);
    
    // Buscar exacto
    if (pColors[key]) {
      return pColors[key];
    }
    
    // Buscar por partes
    const parts = key.split('.');
    for (let i = parts.length; i > 0; i--) {
      const partial = parts.slice(-i).join('.');
      for (const [k, v] of Object.entries(pColors)) {
        if (k.endsWith(partial)) {
          return v;
        }
      }
    }
  }
  
  return null;
}

// Extraer todos los tokens de un archivo JSON
function extractTokensFromFile(filePath, pColors, mode = '') {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const tokens = {};
  
  function extract(obj, prefix = '') {
    if (typeof obj === 'object' && obj !== null) {
      if (obj.$value) {
        const resolved = resolveReference(obj.$value, pColors);
        if (resolved) {
          const key = prefix || 'root';
          tokens[`${mode ? mode + '.' : ''}${key}`] = resolved;
        }
      }
      for (const key in obj) {
        if (key !== '$type' && key !== '$description') {
          const newPrefix = prefix ? `${prefix}.${key}` : key;
          extract(obj[key], newPrefix);
        }
      }
    }
  }
  
  extract(data);
  return tokens;
}

// Contar todos los tokens de Figma
function countAllFigmaTokens() {
  const pColors = loadPColors();
  const allTokens = {};
  const fileCounts = {};
  
  console.log('📦 Leyendo archivos de Figma...\n');
  
  // Leer s-colors (Light y Dark)
  const lightFile = path.join(FIGMA_DIR, 's-colors', 'Light Mode.json');
  const darkFile = path.join(FIGMA_DIR, 's-colors', 'Dark Mode.json');
  
  if (fs.existsSync(lightFile)) {
    const tokens = extractTokensFromFile(lightFile, pColors, 'light');
    Object.assign(allTokens, tokens);
    fileCounts['s-colors/Light Mode.json'] = Object.keys(tokens).length;
    console.log(`✅ s-colors/Light Mode.json: ${Object.keys(tokens).length} tokens`);
  }
  
  if (fs.existsSync(darkFile)) {
    const tokens = extractTokensFromFile(darkFile, pColors, 'dark');
    Object.assign(allTokens, tokens);
    fileCounts['s-colors/Dark Mode.json'] = Object.keys(tokens).length;
    console.log(`✅ s-colors/Dark Mode.json: ${Object.keys(tokens).length} tokens`);
  }
  
  // Leer btn-tone
  const btnToneDir = path.join(FIGMA_DIR, 'btn-tone');
  if (fs.existsSync(btnToneDir)) {
    const files = fs.readdirSync(btnToneDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(btnToneDir, file);
      const tokens = extractTokensFromFile(filePath, pColors, `btn-tone.${file.replace('.json', '')}`);
      Object.assign(allTokens, tokens);
      fileCounts[`btn-tone/${file}`] = Object.keys(tokens).length;
      console.log(`✅ btn-tone/${file}: ${Object.keys(tokens).length} tokens`);
    }
  }
  
  // Leer button-tone
  const buttonToneDir = path.join(FIGMA_DIR, 'button-tone');
  if (fs.existsSync(buttonToneDir)) {
    const files = fs.readdirSync(buttonToneDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(buttonToneDir, file);
      const tokens = extractTokensFromFile(filePath, pColors, `button-tone.${file.replace('.json', '')}`);
      Object.assign(allTokens, tokens);
      fileCounts[`button-tone/${file}`] = Object.keys(tokens).length;
      console.log(`✅ button-tone/${file}: ${Object.keys(tokens).length} tokens`);
    }
  }
  
  // Leer .modifiers si existe
  const modifiersDir = path.join(FIGMA_DIR, '.modifiers');
  if (fs.existsSync(modifiersDir)) {
    function readDir(dir, basePrefix = '') {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          readDir(fullPath, basePrefix ? `${basePrefix}.${entry.name}` : entry.name);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          const tokens = extractTokensFromFile(fullPath, pColors, basePrefix ? `modifiers.${basePrefix}.${entry.name.replace('.json', '')}` : `modifiers.${entry.name.replace('.json', '')}`);
          Object.assign(allTokens, tokens);
          const relPath = path.relative(FIGMA_DIR, fullPath);
          fileCounts[relPath] = Object.keys(tokens).length;
          console.log(`✅ ${relPath}: ${Object.keys(tokens).length} tokens`);
        }
      }
    }
    readDir(modifiersDir);
  }
  
  // Contar valores únicos
  const uniqueValues = new Set(Object.values(allTokens));
  
  console.log('\n📊 Resumen:');
  console.log(`   Total tokens encontrados: ${Object.keys(allTokens).length}`);
  console.log(`   Valores únicos (colores diferentes): ${uniqueValues.size}`);
  
  // Generar reporte
  let report = `# 📊 Conteo de Tokens de Color en Figma\n\n`;
  report += `**Fecha:** ${new Date().toISOString()}\n\n`;
  report += `## 📈 Resumen General\n\n`;
  report += `- **Total de tokens encontrados:** ${Object.keys(allTokens).length}\n`;
  report += `- **Valores únicos (colores diferentes):** ${uniqueValues.size}\n`;
  report += `- **Archivos procesados:** ${Object.keys(fileCounts).length}\n\n`;
  
  report += `## 📁 Tokens por Archivo\n\n`;
  for (const [file, count] of Object.entries(fileCounts)) {
    report += `- **${file}:** ${count} tokens\n`;
  }
  
  report += `\n## 🎨 Valores Únicos (Primeros 50)\n\n`;
  Array.from(uniqueValues).slice(0, 50).forEach((value, i) => {
    report += `${i + 1}. \`${value}\`\n`;
  });
  
  if (uniqueValues.size > 50) {
    report += `\n... y ${uniqueValues.size - 50} más\n`;
  }
  
  report += `\n## 📝 Todos los Tokens\n\n`;
  report += `Total: ${Object.keys(allTokens).length}\n\n`;
  Object.entries(allTokens).slice(0, 100).forEach(([key, value]) => {
    report += `- \`${key}\` → \`${value}\`\n`;
  });
  
  if (Object.keys(allTokens).length > 100) {
    report += `\n... y ${Object.keys(allTokens).length - 100} más\n`;
  }
  
  fs.writeFileSync(OUTPUT_REPORT, report, 'utf8');
  
  console.log(`\n✅ Reporte guardado en: ${OUTPUT_REPORT}`);
  
  return {
    total: Object.keys(allTokens).length,
    unique: uniqueValues.size,
    tokens: allTokens
  };
}

countAllFigmaTokens();

