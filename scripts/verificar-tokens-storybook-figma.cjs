#!/usr/bin/env node
/**
 * Script para verificar y comparar tokens entre Storybook y Figma
 * Debe quedar tal cual como en Figma
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = '/Users/elkinmac/Desktop/Autoframe';
const FIGMA_DIR = '/Users/elkinmac/Desktop/tokens';
const PROJECT_TOKENS = path.join(WORKSPACE_ROOT, 'packages/tokens/tokens.json');
const TOKENS_CSS = path.join(WORKSPACE_ROOT, 'packages/tokens/dist/tokens.css');
const OUTPUT_REPORT = path.join(WORKSPACE_ROOT, 'VERIFICACION_TOKENS_STORYBOOK_FIGMA.md');

// Cargar p-colors
function loadPColors() {
  const pColorsFile = path.join(FIGMA_DIR, 'p-colors', 'Mode 1.json');
  if (!fs.existsSync(pColorsFile)) return {};
  
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

// Resolver referencias
function resolveReference(ref, pColors) {
  if (!ref || typeof ref !== 'string') return null;
  if (ref.startsWith('#')) return ref.toLowerCase();
  if (ref.startsWith('{') && ref.endsWith('}')) {
    const key = ref.slice(1, -1);
    if (pColors[key]) return pColors[key];
    const parts = key.split('.');
    for (let i = parts.length; i > 0; i--) {
      const partial = parts.slice(-i).join('.');
      for (const [k, v] of Object.entries(pColors)) {
        if (k.endsWith(partial)) return v;
      }
    }
  }
  return null;
}

// Extraer tokens de Figma (s-colors principalmente)
function extractFigmaTokens() {
  const pColors = loadPColors();
  const tokens = {};
  
  const lightFile = path.join(FIGMA_DIR, 's-colors', 'Light Mode.json');
  const darkFile = path.join(FIGMA_DIR, 's-colors', 'Dark Mode.json');
  
  function extractFromFile(filePath, mode) {
    if (!fs.existsSync(filePath)) return;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    function extract(obj, prefix = '') {
      if (typeof obj === 'object' && obj !== null) {
        if (obj.$value) {
          const resolved = resolveReference(obj.$value, pColors);
          if (resolved) {
            tokens[`${mode}.${prefix || 'root'}`] = resolved;
          }
        }
        for (const key in obj) {
          if (key !== '$type' && key !== '$description') {
            extract(obj[key], prefix ? `${prefix}.${key}` : key);
          }
        }
      }
    }
    
    if (data.color) {
      extract(data.color);
    } else {
      extract(data);
    }
  }
  
  extractFromFile(lightFile, 'light');
  extractFromFile(darkFile, 'dark');
  
  return tokens;
}

// Extraer tokens del proyecto
function extractProjectTokens() {
  const data = JSON.parse(fs.readFileSync(PROJECT_TOKENS, 'utf8'));
  const tokens = {};
  
  function extract(obj, prefix = '') {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'string' && obj[key].match(/^#[0-9a-fA-F]{6}$/i)) {
          tokens[newPrefix] = obj[key].toLowerCase();
        } else {
          extract(obj[key], newPrefix);
        }
      }
    }
  }
  
  extract(data.light, 'light');
  extract(data.dark, 'dark');
  
  return tokens;
}

// Contar tokens en CSS
function countTokensInCSS() {
  if (!fs.existsSync(TOKENS_CSS)) return { total: 0, unique: 0 };
  
  const css = fs.readFileSync(TOKENS_CSS, 'utf8');
  const matches = css.match(/--ubits-[^:]+:\s*#[0-9a-fA-F]{6}/gi) || [];
  const unique = new Set(matches.map(m => {
    const match = m.match(/:\s*(#[0-9a-fA-F]{6})/i);
    return match ? match[1].toLowerCase() : null;
  }).filter(Boolean));
  
  return {
    total: matches.length,
    unique: unique.size
  };
}

// Comparar tokens
function compareTokens() {
  console.log('📦 Cargando tokens...\n');
  
  const figmaTokens = extractFigmaTokens();
  const projectTokens = extractProjectTokens();
  const cssCount = countTokensInCSS();
  
  // Contar valores únicos
  const figmaUnique = new Set(Object.values(figmaTokens));
  const projectUnique = new Set(Object.values(projectTokens));
  
  console.log('📊 TOKENS EN FIGMA:');
  console.log(`   Total tokens: ${Object.keys(figmaTokens).length}`);
  console.log(`   Valores únicos: ${figmaUnique.size}`);
  
  console.log('\n📊 TOKENS EN PROYECTO (tokens.json):');
  console.log(`   Total tokens: ${Object.keys(projectTokens).length}`);
  console.log(`   Valores únicos: ${projectUnique.size}`);
  
  console.log('\n📊 TOKENS EN STORYBOOK (tokens.css):');
  console.log(`   Total variables CSS: ${cssCount.total}`);
  console.log(`   Valores únicos: ${cssCount.unique}`);
  
  // Encontrar diferencias
  const missingInProject = [];
  const differentValues = [];
  
  for (const [figmaKey, figmaValue] of Object.entries(figmaTokens)) {
    let found = false;
    for (const [projectKey, projectValue] of Object.entries(projectTokens)) {
      // Buscar por similitud de nombre o valor
      if (figmaValue === projectValue) {
        found = true;
        // Verificar si el nombre es similar
        const figmaParts = figmaKey.split('.').slice(-3);
        const projectParts = projectKey.split('.').slice(-3);
        if (figmaParts.join('') !== projectParts.join('')) {
          differentValues.push({
            figma: figmaKey,
            project: projectKey,
            value: figmaValue,
            note: 'Mismo valor, nombre diferente'
          });
        }
        break;
      }
    }
    if (!found) {
      missingInProject.push({ key: figmaKey, value: figmaValue });
    }
  }
  
  // Generar reporte
  let report = `# 📊 Verificación de Tokens: Storybook vs Figma\n\n`;
  report += `**Fecha:** ${new Date().toISOString()}\n\n`;
  
  report += `## 📈 Resumen General\n\n`;
  report += `### Figma (s-colors)\n`;
  report += `- **Total tokens:** ${Object.keys(figmaTokens).length}\n`;
  report += `- **Valores únicos:** ${figmaUnique.size}\n\n`;
  
  report += `### Proyecto (tokens.json)\n`;
  report += `- **Total tokens:** ${Object.keys(projectTokens).length}\n`;
  report += `- **Valores únicos:** ${projectUnique.size}\n\n`;
  
  report += `### Storybook (tokens.css)\n`;
  report += `- **Total variables CSS:** ${cssCount.total}\n`;
  report += `- **Valores únicos:** ${cssCount.unique}\n\n`;
  
  report += `## ⚠️ Tokens de Figma que Faltan o Difieren en el Proyecto\n\n`;
  report += `Total: **${missingInProject.length + differentValues.length}**\n\n`;
  
  if (missingInProject.length > 0) {
    report += `### Tokens Faltantes (${missingInProject.length})\n\n`;
    missingInProject.slice(0, 30).forEach(item => {
      report += `- \`${item.key}\` → \`${item.value}\`\n`;
    });
    if (missingInProject.length > 30) {
      report += `\n... y ${missingInProject.length - 30} más\n`;
    }
  }
  
  if (differentValues.length > 0) {
    report += `\n### Tokens con Nombres Diferentes (${differentValues.length})\n\n`;
    differentValues.slice(0, 30).forEach(item => {
      report += `- Figma: \`${item.figma}\` ↔ Proyecto: \`${item.project}\` → \`${item.value}\`\n`;
    });
    if (differentValues.length > 30) {
      report += `\n... y ${differentValues.length - 30} más\n`;
    }
  }
  
  report += `\n## ✅ Conclusión\n\n`;
  
  if (missingInProject.length === 0 && differentValues.length === 0) {
    report += `✅ **Todos los tokens de Figma están presentes en el proyecto.**\n\n`;
  } else {
    report += `⚠️ **Hay ${missingInProject.length + differentValues.length} tokens que necesitan actualización.**\n\n`;
    report += `**Acción requerida:** Actualizar los tokens del proyecto para que coincidan exactamente con Figma.\n\n`;
  }
  
  report += `### Nota sobre el conteo de 267 colores\n\n`;
  report += `Si Storybook muestra 267 colores, esto probablemente se refiere a:\n`;
  report += `- Los valores únicos de color (sin duplicar light/dark)\n`;
  report += `- O los tokens de un solo modo (light o dark)\n\n`;
  report += `**Valores únicos en proyecto:** ${projectUnique.size}\n`;
  report += `**Valores únicos en Figma:** ${figmaUnique.size}\n`;
  
  fs.writeFileSync(OUTPUT_REPORT, report, 'utf8');
  
  console.log(`\n✅ Reporte guardado en: ${OUTPUT_REPORT}`);
  console.log(`\n📋 Resumen:`);
  console.log(`   - Tokens en Figma: ${Object.keys(figmaTokens).length}`);
  console.log(`   - Tokens en Proyecto: ${Object.keys(projectTokens).length}`);
  console.log(`   - Tokens en Storybook CSS: ${cssCount.total}`);
  console.log(`   - Valores únicos Figma: ${figmaUnique.size}`);
  console.log(`   - Valores únicos Proyecto: ${projectUnique.size}`);
  console.log(`   - Valores únicos Storybook: ${cssCount.unique}`);
  console.log(`   - Tokens que necesitan actualización: ${missingInProject.length + differentValues.length}`);
}

compareTokens();

