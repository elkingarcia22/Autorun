#!/usr/bin/env node

/**
 * Script de Verificación de Tokens
 * 
 * Cuenta exactamente cuántos tokens hay en cada categoría
 * y compara con los valores esperados.
 */

const fs = require('fs');
const path = require('path');

const FIGMA_TOKENS_CSS = path.resolve(__dirname, '../dist/figma-tokens.css');
const TOKENS_CSS = path.resolve(__dirname, '../dist/tokens.css');
const TYPOGRAPHY_CSS = path.resolve(__dirname, '../../typography/tokens-typography.css');

// Leer archivos
function readTokensFromCSS(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Archivo no encontrado: ${filePath}`);
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(l => l.trim().startsWith('--'));
  return lines.map(l => {
    const match = l.trim().match(/^--([^:]+):/);
    return match ? match[1].trim() : null;
  }).filter(Boolean);
}

// Contar tokens por categoría
function countTokensByCategory(tokens, category) {
  return tokens.filter(token => {
    const lower = token.toLowerCase();
    return category.test(lower);
  });
}

// Contar primitivos por color
function countPrimitiveColors(tokens, colorName) {
  // Buscar tokens que contengan el nombre del color pero no sean modifiers, buttons, charts, etc.
  const colorTokens = tokens.filter(token => {
    const lower = token.toLowerCase();
    return lower.includes(colorName.toLowerCase()) &&
           !lower.includes('modifiers') &&
           !lower.includes('button') &&
           !lower.includes('chart') &&
           !lower.includes('feedback') &&
           !lower.includes('brand') &&
           !lower.includes('scroll') &&
           !lower.includes('toggle');
  });
  
  return colorTokens;
}

// Contar todos los tokens de un color (incluyendo modifiers)
function countAllColorTokens(tokens, colorName) {
  return tokens.filter(token => {
    const lower = token.toLowerCase();
    return lower.includes(colorName.toLowerCase());
  });
}

// Main
function main() {
  console.log('🔍 VERIFICACIÓN DE TOKENS UBITS\n');
  console.log('='.repeat(60));
  
  // Leer tokens de Figma
  const figmaTokens = readTokensFromCSS(FIGMA_TOKENS_CSS);
  const ubitsTokens = readTokensFromCSS(TOKENS_CSS);
  const typographyTokens = readTokensFromCSS(TYPOGRAPHY_CSS);
  
  console.log(`\n📊 Total de tokens encontrados:`);
  console.log(`  - Figma tokens: ${figmaTokens.length}`);
  console.log(`  - UBITS tokens: ${ubitsTokens.length}`);
  console.log(`  - Typography tokens: ${typographyTokens.length}`);
  
  // Primitivos (p-colors)
  console.log(`\n🎨 PRIMITIVOS (p-colors):`);
  const primitiveColors = ['pec', 'gray', 'indigo', 'lime', 'pink', 'rose', 'teal', 'purple', 'yellow', 'green', 'blue'];
  
  let totalPrimitives = 0;
  primitiveColors.forEach(color => {
    const primitives = countPrimitiveColors(figmaTokens, color);
    const allColorTokens = countAllColorTokens(figmaTokens, color);
    totalPrimitives += primitives.length;
    
    const status = primitives.length > 0 ? '✅' : '❌';
    console.log(`  ${status} ${color}: ${primitives.length} primitivos (${allColorTokens.length} total incluyendo modifiers)`);
    
    if (primitives.length > 0 && primitives.length <= 10) {
      console.log(`     Ejemplos: ${primitives.slice(0, 3).join(', ')}`);
    }
  });
  
  console.log(`\n  Total primitivos: ${totalPrimitives}`);
  
  // Secundarios (s-colors)
  console.log(`\n🎨 SECUNDARIOS (s-colors):`);
  const secondaryCategories = {
    'accent': /color-color-accent/,
    'fg': /color-color-fg/,
    'bg': /color-color-bg/,
    'border': /color-color-border/
  };
  
  Object.entries(secondaryCategories).forEach(([name, pattern]) => {
    const tokens = figmaTokens.filter(t => pattern.test(t.toLowerCase()) && !t.toLowerCase().includes('modifiers'));
    console.log(`  ✅ ${name}: ${tokens.length} tokens`);
  });
  
  // Semánticos
  console.log(`\n🎨 SEMÁNTICOS:`);
  const semanticCategories = {
    'feedback': /color-color-feedback/,
    'brand': /color-brand/,
    'chart': /color-chart/
  };
  
  Object.entries(semanticCategories).forEach(([name, pattern]) => {
    const tokens = figmaTokens.filter(t => pattern.test(t.toLowerCase()) && !t.toLowerCase().includes('modifiers'));
    console.log(`  ✅ ${name}: ${tokens.length} tokens`);
  });
  
  // Componentes
  console.log(`\n🎨 COMPONENTES:`);
  const componentCategories = {
    'button': /button/,
    'scroll-bar': /scroll-bar/,
    'toggle': /toggle/
  };
  
  Object.entries(componentCategories).forEach(([name, pattern]) => {
    const tokens = figmaTokens.filter(t => pattern.test(t.toLowerCase()) && !t.toLowerCase().includes('modifiers'));
    console.log(`  ✅ ${name}: ${tokens.length} tokens`);
  });
  
  // Tipografía
  console.log(`\n📝 TIPOGRAFÍA:`);
  const typographyCategories = {
    'font-family': /font-family|font-sans/,
    'font-size': /font-size|font-.*-size/,
    'font-weight': /font-weight|weight-/,
    'line-height': /line-height|font-.*-line/
  };
  
  const allTypographyTokens = [...figmaTokens, ...typographyTokens];
  Object.entries(typographyCategories).forEach(([name, pattern]) => {
    const tokens = allTypographyTokens.filter(t => pattern.test(t.toLowerCase()));
    console.log(`  ✅ ${name}: ${tokens.length} tokens`);
  });
  
  // Spacing
  console.log(`\n📏 SPACING:`);
  const spacingTokens = ubitsTokens.filter(t => t.toLowerCase().includes('spacing'));
  console.log(`  ✅ spacing: ${spacingTokens.length} tokens`);
  
  // Border Radius
  console.log(`\n🔲 BORDER RADIUS:`);
  const borderRadiusTokens = ubitsTokens.filter(t => t.toLowerCase().includes('border-radius'));
  console.log(`  ✅ border-radius: ${borderRadiusTokens.length} tokens`);
  
  // Modificadores
  console.log(`\n🎭 MODIFICADORES:`);
  const modifierCategories = {
    'normal': /modifiers-normal/,
    'inverted': /modifiers-inverted/,
    'static': /modifiers-static/,
    'static-inverted': /modifiers-static-inverted/
  };
  
  Object.entries(modifierCategories).forEach(([name, pattern]) => {
    const tokens = figmaTokens.filter(t => pattern.test(t.toLowerCase()));
    console.log(`  ✅ ${name}: ${tokens.length} tokens`);
  });
  
  // Resumen final
  console.log(`\n${'='.repeat(60)}`);
  console.log(`\n📊 RESUMEN:`);
  console.log(`  Total tokens Figma: ${figmaTokens.length}`);
  console.log(`  Total tokens UBITS: ${ubitsTokens.length}`);
  console.log(`  Total tokens Typography: ${typographyTokens.length}`);
  console.log(`  Total esperado Figma: 2157`);
  
  if (figmaTokens.length === 2157) {
    console.log(`  ✅ Coincide con el total esperado`);
  } else {
    console.log(`  ⚠️  Diferencia: ${Math.abs(figmaTokens.length - 2157)} tokens`);
  }
  
  console.log(`\n✅ Verificación completada\n`);
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { main, countPrimitiveColors, countAllColorTokens };

