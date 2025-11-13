#!/usr/bin/env node

/**
 * Script para comparar tokens de Figma con tokens del proyecto
 * 
 * Uso:
 * 1. Exportar tokens de Figma como JSON (usando plugin Figma Tokens)
 * 2. Guardar el archivo como figma-tokens.json en la raíz del proyecto
 * 3. Ejecutar: node scripts/compare-figma-tokens.js
 */

const fs = require('fs');
const path = require('path');

// Leer tokens del proyecto
const projectTokensPath = path.join(__dirname, '../packages/tokens/tokens.json');
const projectTokens = JSON.parse(fs.readFileSync(projectTokensPath, 'utf8'));

// Intentar leer tokens de Figma (si existe)
const figmaTokensPath = path.join(__dirname, '../figma-tokens.json');
let figmaTokens = null;

if (fs.existsSync(figmaTokensPath)) {
  try {
    figmaTokens = JSON.parse(fs.readFileSync(figmaTokensPath, 'utf8'));
    console.log('✅ Tokens de Figma cargados\n');
  } catch (error) {
    console.error('❌ Error al leer tokens de Figma:', error.message);
  }
} else {
  console.log('⚠️  Archivo figma-tokens.json no encontrado');
  console.log('   Por favor, exporta los tokens de Figma y guárdalos como figma-tokens.json\n');
}

// Función para aplanar tokens
function flattenTokens(tokens, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(tokens)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenTokens(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

// Aplanar tokens del proyecto
const projectFlat = {};
const projectLightFlat = flattenTokens(projectTokens.light || {});
const projectDarkFlat = flattenTokens(projectTokens.dark || {});

// Combinar light y dark
for (const key of Object.keys(projectLightFlat)) {
  projectFlat[key] = {
    light: projectLightFlat[key],
    dark: projectDarkFlat[key] || null
  };
}

console.log('='.repeat(80));
console.log('ANÁLISIS DE TOKENS DEL PROYECTO');
console.log('='.repeat(80));
console.log(`\n📊 Total de tokens: ${Object.keys(projectFlat).length}`);
console.log(`   - Light: ${Object.keys(projectLightFlat).length}`);
console.log(`   - Dark: ${Object.keys(projectDarkFlat).length}`);

// Si tenemos tokens de Figma, comparar
if (figmaTokens) {
  const figmaFlat = flattenTokens(figmaTokens);
  
  console.log('\n' + '='.repeat(80));
  console.log('COMPARACIÓN: FIGMA vs PROYECTO');
  console.log('='.repeat(80));
  
  const figmaKeys = new Set(Object.keys(figmaFlat));
  const projectKeys = new Set(Object.keys(projectFlat));
  
  // Tokens en Figma que no están en el proyecto
  const missingInProject = [...figmaKeys].filter(k => !projectKeys.has(k));
  
  // Tokens en el proyecto que no están en Figma
  const missingInFigma = [...projectKeys].filter(k => !figmaKeys.has(k));
  
  // Tokens en ambos pero con valores diferentes
  const differentValues = [];
  for (const key of [...figmaKeys].filter(k => projectKeys.has(k))) {
    const figmaValue = figmaFlat[key];
    const projectValue = projectFlat[key];
    
    if (JSON.stringify(figmaValue) !== JSON.stringify(projectValue)) {
      differentValues.push({
        key,
        figma: figmaValue,
        project: projectValue
      });
    }
  }
  
  console.log(`\n📋 Tokens en Figma: ${figmaKeys.size}`);
  console.log(`📋 Tokens en Proyecto: ${projectKeys.size}`);
  
  if (missingInProject.length > 0) {
    console.log(`\n➕ Tokens faltantes en el proyecto (${missingInProject.length}):`);
    missingInProject.slice(0, 20).forEach(key => {
      console.log(`   - ${key}: ${figmaFlat[key]}`);
    });
    if (missingInProject.length > 20) {
      console.log(`   ... y ${missingInProject.length - 20} más`);
    }
  }
  
  if (missingInFigma.length > 0) {
    console.log(`\n➖ Tokens en proyecto que no están en Figma (${missingInFigma.length}):`);
    missingInFigma.slice(0, 20).forEach(key => {
      console.log(`   - ${key}`);
    });
    if (missingInFigma.length > 20) {
      console.log(`   ... y ${missingInFigma.length - 20} más`);
    }
  }
  
  if (differentValues.length > 0) {
    console.log(`\n🔄 Tokens con valores diferentes (${differentValues.length}):`);
    differentValues.slice(0, 20).forEach(({ key, figma, project }) => {
      console.log(`   - ${key}:`);
      console.log(`     Figma: ${JSON.stringify(figma)}`);
      console.log(`     Proyecto: ${JSON.stringify(project)}`);
    });
    if (differentValues.length > 20) {
      console.log(`   ... y ${differentValues.length - 20} más`);
    }
  }
  
  if (missingInProject.length === 0 && missingInFigma.length === 0 && differentValues.length === 0) {
    console.log('\n✅ ¡Todos los tokens están sincronizados!');
  }
}

// Generar reporte por categorías
console.log('\n' + '='.repeat(80));
console.log('TOKENS POR CATEGORÍA');
console.log('='.repeat(80));

const categories = {};
for (const key of Object.keys(projectFlat)) {
  const category = key.split('.')[0];
  if (!categories[category]) {
    categories[category] = [];
  }
  categories[category].push(key);
}

for (const [category, tokens] of Object.entries(categories).sort()) {
  console.log(`\n📁 ${category.toUpperCase()} (${tokens.length} tokens)`);
  tokens.slice(0, 5).forEach(token => {
    console.log(`   - ${token}`);
  });
  if (tokens.length > 5) {
    console.log(`   ... y ${tokens.length - 5} más`);
  }
}

