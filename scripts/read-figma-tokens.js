#!/usr/bin/env node
/**
 * Script para leer y resolver tokens de Figma
 * Lee los JSONs de Figma y resuelve todas las referencias a valores hex
 */

const fs = require('fs');
const path = require('path');

const FIGMA_DIR = path.resolve(__dirname, '../../tokens');
const P_COLORS_FILE = path.resolve(FIGMA_DIR, 'p-colors/Mode 1.json');
const S_COLORS_LIGHT_FILE = path.resolve(FIGMA_DIR, 's-colors/Light Mode.json');
const S_COLORS_DARK_FILE = path.resolve(FIGMA_DIR, 's-colors/Dark Mode.json');

/**
 * Cargar p-colors (valores primitivos/base)
 */
function loadPColors() {
  const data = JSON.parse(fs.readFileSync(P_COLORS_FILE, 'utf8'));
  const colors = {};
  
  function extractValues(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && '$value' in value) {
        colors[fullKey] = value.$value;
      } else if (value && typeof value === 'object') {
        extractValues(value, fullKey);
      }
    }
  }
  
  extractValues(data);
  return colors;
}

/**
 * Resolver referencia de Figma
 * Ejemplo: {pec.blue.44} -> #62639b
 * Ejemplo: {color.light.accent.brand} -> necesita buscar en s-colors primero
 */
function resolveReference(ref, pColors, sColorsData = null, visited = new Set()) {
  if (!ref || typeof ref !== 'string') {
    return ref;
  }
  
  // Si ya es un hex, retornarlo
  if (ref.startsWith('#')) {
    return ref;
  }
  
  // Si no es una referencia (no tiene llaves), retornarlo
  if (!ref.startsWith('{') || !ref.endsWith('}')) {
    return ref;
  }
  
  // Remover llaves
  const refPath = ref.slice(1, -1);
  
  // Evitar referencias circulares
  if (visited.has(refPath)) {
    console.warn(`⚠️  Referencia circular detectada: ${refPath}`);
    return ref;
  }
  visited.add(refPath);
  
  // Intentar buscar en p-colors primero (valores primitivos)
  if (pColors[refPath]) {
    const value = pColors[refPath];
    // Si el valor es otra referencia, resolverla
    if (typeof value === 'string' && value.startsWith('{')) {
      return resolveReference(value, pColors, sColorsData, visited);
    }
    return value;
  }
  
  // Intentar buscar en s-colors (tokens semánticos)
  if (sColorsData) {
    const parts = refPath.split('.');
    let current = sColorsData;
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        current = null;
        break;
      }
    }
    
    if (current && typeof current === 'object' && '$value' in current) {
      const value = current.$value;
      // Si es otra referencia, resolverla recursivamente
      if (typeof value === 'string' && value.startsWith('{')) {
        return resolveReference(value, pColors, sColorsData, visited);
      }
      return value;
    }
  }
  
  // Si no se puede resolver, retornar la referencia original
  console.warn(`⚠️  No se pudo resolver referencia: ${refPath}`);
  return ref;
}

/**
 * Extraer todos los tokens de un objeto anidado
 */
function extractTokens(obj, prefix = '', mode = '', pColors, sColorsData, result = {}) {
  if (!obj || typeof obj !== 'object') {
    return result;
  }
  
  // Si tiene $value, es un token
  if ('$value' in obj) {
    const value = obj.$value;
    const resolved = resolveReference(value, pColors, sColorsData);
    
    // Solo agregar si es un hex válido
    if (typeof resolved === 'string' && resolved.startsWith('#')) {
      const tokenName = mode ? `${mode}.${prefix}` : prefix;
      result[tokenName] = resolved;
    }
    return result;
  }
  
  // Recursivamente buscar en objetos anidados
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object') {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      extractTokens(value, newPrefix, mode, pColors, sColorsData, result);
    }
  }
  
  return result;
}

/**
 * Función principal
 */
function main() {
  console.log('🔍 Leyendo tokens de Figma...\n');
  
  // Cargar p-colors (valores primitivos)
  console.log('📦 Cargando p-colors (valores primitivos)...');
  const pColors = loadPColors();
  console.log(`   ✅ Cargados ${Object.keys(pColors).length} valores primitivos\n`);
  
  // Cargar s-colors Light
  console.log('📦 Cargando s-colors Light Mode...');
  const sColorsLight = JSON.parse(fs.readFileSync(S_COLORS_LIGHT_FILE, 'utf8'));
  console.log('   ✅ Cargado\n');
  
  // Cargar s-colors Dark
  console.log('📦 Cargando s-colors Dark Mode...');
  const sColorsDark = JSON.parse(fs.readFileSync(S_COLORS_DARK_FILE, 'utf8'));
  console.log('   ✅ Cargado\n');
  
  // Extraer tokens de Light Mode
  console.log('🔄 Extrayendo tokens de Light Mode...');
  const lightTokens = extractTokens(
    sColorsLight.color || {},
    '',
    'light',
    pColors,
    sColorsLight
  );
  console.log(`   ✅ Extraídos ${Object.keys(lightTokens).length} tokens\n`);
  
  // Extraer tokens de Dark Mode
  console.log('🔄 Extrayendo tokens de Dark Mode...');
  const darkTokens = extractTokens(
    sColorsDark.color || {},
    '',
    'dark',
    pColors,
    sColorsDark
  );
  console.log(`   ✅ Extraídos ${Object.keys(darkTokens).length} tokens\n`);
  
  // Combinar todos los tokens
  const allTokens = { ...lightTokens, ...darkTokens };
  
  // Guardar resultado
  const outputFile = path.resolve(__dirname, 'figma-tokens-resolved.json');
  fs.writeFileSync(
    outputFile,
    JSON.stringify(allTokens, null, 2),
    'utf8'
  );
  
  console.log('📊 Resumen:');
  console.log(`   - Tokens Light: ${Object.keys(lightTokens).length}`);
  console.log(`   - Tokens Dark: ${Object.keys(darkTokens).length}`);
  console.log(`   - Total: ${Object.keys(allTokens).length}`);
  console.log(`\n✅ Tokens resueltos guardados en: ${outputFile}\n`);
  
  // Mostrar algunos ejemplos
  console.log('📋 Ejemplos de tokens resueltos:');
  const examples = [
    'light.accent.brand',
    'light.feedback.accent.success',
    'light.fg.1.high',
    'light.bg.1',
    'dark.accent.brand',
    'dark.bg.1'
  ];
  
  examples.forEach(example => {
    if (allTokens[example]) {
      console.log(`   ${example}: ${allTokens[example]}`);
    }
  });
  
  return allTokens;
}

// Ejecutar
if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { main, loadPColors, resolveReference, extractTokens };

