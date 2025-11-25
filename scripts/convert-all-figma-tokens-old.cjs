#!/usr/bin/env node
/**
 * Script para convertir TODOS los tokens de Figma a CSS variables
 * Procesa todos los archivos de la carpeta de tokens
 */

const fs = require('fs');
const path = require('path');

const FIGMA_DIR = '/Users/elkinmac/Desktop/tokens';
const WORKSPACE_ROOT = path.resolve(__dirname, '../..');
const OUTPUT_JSON = path.join(WORKSPACE_ROOT, 'packages', 'tokens', 'figma-tokens.json');
const OUTPUT_CSS = path.join(WORKSPACE_ROOT, 'packages', 'tokens', 'dist', 'figma-tokens.css');

// Verificar paths
console.log('📁 Paths configurados:');
console.log(`   FIGMA_DIR: ${FIGMA_DIR}`);
console.log(`   WORKSPACE_ROOT: ${WORKSPACE_ROOT}`);
console.log(`   OUTPUT_JSON: ${OUTPUT_JSON}`);
console.log(`   OUTPUT_CSS: ${OUTPUT_CSS}\n`);

// Cargar p-colors (primitivos)
function loadPColors() {
  const pColorsFile = path.join(FIGMA_DIR, 'p-colors', 'Mode 1.json');
  if (!fs.existsSync(pColorsFile)) {
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

// Construir mapa de tokens desde un archivo
function buildTokenMap(data, prefix = '', map = {}) {
  if (typeof data === 'object' && data !== null) {
    if (data.$value !== undefined) {
      map[prefix] = {
        value: data.$value,
        type: data.$type || 'color',
        description: data.$description || ''
      };
    }
    
    for (const key in data) {
      if (key !== '$type' && key !== '$description' && key !== '$value') {
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        buildTokenMap(data[key], newPrefix, map);
      }
    }
  }
  
  return map;
}

// Resolver referencia
function resolveReference(ref, tokenMap, pColors, visited = new Set(), depth = 0) {
  if (depth > 50) return null;
  if (!ref || typeof ref !== 'string') return null;
  
  if (ref.startsWith('#')) {
    return ref.toLowerCase();
  }
  
  if (ref.startsWith('{') && ref.endsWith('}')) {
    const key = ref.slice(1, -1);
    
    if (visited.has(key)) {
      // Buscar en p-colors
      if (pColors[key]) return pColors[key];
      // Buscar por partes
      const parts = key.split('.');
      for (let i = parts.length; i > 0; i--) {
        const partial = parts.slice(-i).join('.');
        for (const [k, v] of Object.entries(pColors)) {
          if (k.endsWith(partial) || k.includes(partial)) {
            return v;
          }
        }
      }
      return null;
    }
    
    visited.add(key);
    
    // Buscar en tokenMap
    if (tokenMap[key]) {
      const resolved = resolveReference(tokenMap[key].value, tokenMap, pColors, visited, depth + 1);
      visited.delete(key);
      return resolved;
    }
    
    // Buscar en p-colors
    if (pColors[key]) {
      visited.delete(key);
      return pColors[key];
    }
    
    // Buscar por partes en p-colors
    const parts = key.split('.');
    for (let i = parts.length; i > 0; i--) {
      const partial = parts.slice(-i).join('.');
      for (const [k, v] of Object.entries(pColors)) {
        if (k.endsWith(partial) || k.includes(partial)) {
          visited.delete(key);
          return v;
        }
      }
    }
    
    visited.delete(key);
  }
  
  return null;
}

// Convertir path a CSS variable
function pathToCSSVar(path) {
  return `--${path.replace(/\./g, '-').replace(/[^a-zA-Z0-9-]/g, '-')}`;
}

// Resolver referencia mejorado - busca en el mismo archivo y en p-colors
function resolveReferenceImproved(ref, tokenMap, pColors, allTokensMap = {}, visited = new Set(), depth = 0) {
  if (depth > 50) return null;
  if (!ref || typeof ref !== 'string') return null;
  
  if (ref.startsWith('#')) {
    return ref.toLowerCase();
  }
  
  if (ref.startsWith('{') && ref.endsWith('}')) {
    const key = ref.slice(1, -1);
    
    if (visited.has(key)) {
      // Referencia circular - buscar en p-colors
      if (pColors[key]) return pColors[key];
      // Buscar por partes en p-colors
      const parts = key.split('.');
      for (let i = parts.length; i > 0; i--) {
        const partial = parts.slice(-i).join('.');
        for (const [k, v] of Object.entries(pColors)) {
          if (k.endsWith(partial) || k.includes(partial)) {
            return v;
          }
        }
      }
      return null;
    }
    
    visited.add(key);
    
    // PRIMERO: Buscar en p-colors (valores primitivos - más importante)
    if (pColors[key]) {
      visited.delete(key);
      return pColors[key];
    }
    
    // Buscar por coincidencia exacta o parcial en p-colors
    const parts = key.split('.');
    for (let i = parts.length; i > 0; i--) {
      const partial = parts.slice(-i).join('.');
      for (const [k, v] of Object.entries(pColors)) {
        if (k === partial || k.endsWith('.' + partial) || k.includes('.' + partial + '.')) {
          visited.delete(key);
          return v;
        }
      }
    }
    
    // SEGUNDO: Buscar en tokenMap del archivo actual
    if (tokenMap[key]) {
      const resolved = resolveReferenceImproved(tokenMap[key].value, tokenMap, pColors, allTokensMap, visited, depth + 1);
      visited.delete(key);
      return resolved;
    }
    
    // TERCERO: Buscar en allTokensMap (tokens ya procesados de otros archivos)
    // Normalizar la key: color.light.bg.1 -> color.bg.1
    const normalizedKey = key.replace(/^color\.(light|dark)\./, 'color.');
    
    // Buscar por key exacta normalizada en allTokensMap
    for (const [mapKey, mapToken] of Object.entries(allTokensMap)) {
      // Extraer la parte del path del mapKey (después del mode.)
      const mapPath = mapKey.split('.').slice(1).join('.');
      // Normalizar el mapPath también (remover color.light. o color.dark.)
      const normalizedMapPath = mapPath.replace(/^color\.(light|dark)\./, 'color.');
      // También normalizar si tiene color.color.
      const cleanMapPath = normalizedMapPath.replace(/^color\.color\./, 'color.');
      const cleanKey = normalizedKey.replace(/^color\.color\./, 'color.');
      
      // Buscar coincidencias exactas o parciales
      if (cleanMapPath === cleanKey || 
          mapPath === normalizedKey || 
          mapPath === key ||
          mapKey.endsWith('.' + cleanKey) ||
          mapKey.endsWith('.' + normalizedKey) ||
          mapKey.endsWith('.' + key)) {
        const resolved = mapToken.value;
        visited.delete(key);
        return resolved;
      }
    }
    
    visited.delete(key);
  }
  
  return null;
}

// Procesar un archivo de tokens
function processFile(filePath, pColors, allTokens, mode, category, allTokensMap = {}, priority = 0) {
  if (!fs.existsSync(filePath)) {
    return 0;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const tokenMap = buildTokenMap(data);
    
    const fileRelPath = path.relative(FIGMA_DIR, filePath);
    console.log(`📄 ${fileRelPath}...`);
    
    let resolved = 0;
    for (const [key, token] of Object.entries(tokenMap)) {
      // Resolver referencia usando el mapa completo de tokens ya procesados y los datos originales
      const resolvedValue = resolveReferenceImproved(token.value, tokenMap, pColors, allTokensMap, new Set(), 0, data);
      if (resolvedValue) {
        // Corregir path duplicado: color.color.bg.1 -> color.bg.1
        let cleanKey = key;
        if (key.startsWith('color.color.')) {
          cleanKey = key.replace('color.color.', 'color.');
        }
        
        // Si el key tiene color.light. o color.dark., removerlo cuando category es 'color' o vacío
        // Esto hace que .modifiers/Normal.json use la misma key que s-colors
        if ((category === 'color' || category === '') && (cleanKey.startsWith('color.light.') || cleanKey.startsWith('color.dark.'))) {
          cleanKey = cleanKey.replace(/^color\.(light|dark)\./, 'color.');
        }
        
        let fullPath = category ? `${category}.${cleanKey}` : cleanKey;
        // Normalizar: remover color.color. duplicado (puede aparecer múltiples veces)
        while (fullPath.startsWith('color.color.')) {
          fullPath = fullPath.replace(/^color\.color\./, 'color.');
        }
        const finalPath = fullPath;
        const cssVar = pathToCSSVar(finalPath);
        const tokenKey = `${mode}.${finalPath}`;
        
        // Solo agregar si no existe o si este archivo tiene mayor prioridad
        if (!allTokens[tokenKey] || priority > (allTokens[tokenKey]._priority || 0)) {
          allTokens[tokenKey] = {
            value: resolvedValue,
            type: token.type,
            description: token.description,
            path: finalPath,
            cssVar: cssVar,
            _priority: priority
          };
          resolved++;
        }
      }
    }
    
    console.log(`   ✅ ${resolved} tokens resueltos`);
    return resolved;
  } catch (error) {
    console.warn(`   ⚠️  Error: ${error.message}`);
    return 0;
  }
}

// Procesar todos los archivos
function processAllFiles() {
  const pColors = loadPColors();
  const allTokens = {};
  let total = 0;
  
  console.log('📦 Procesando TODOS los archivos de tokens de Figma...\n');
  
  // PRIMERO: .modifiers/Normal.json (tiene los valores base reales - MÁXIMA PRIORIDAD)
  const modifiersDir = path.join(FIGMA_DIR, '.modifiers');
  if (fs.existsSync(modifiersDir)) {
    const normalFile = path.join(modifiersDir, 'Normal.json');
    if (fs.existsSync(normalFile)) {
      // Prioridad 20 para Normal (más alta - tiene valores base reales)
      // Usar category vacío para que genere la misma key que s-colors
      console.log('📌 Procesando .modifiers/Normal.json PRIMERO (valores base)...');
      total += processFile(normalFile, pColors, allTokens, 'light', '', allTokens, 20);
    }
  }
  
  // SEGUNDO: .modifiers otros archivos (prioridad media - estos son variantes)
  if (fs.existsSync(modifiersDir)) {
    const files = fs.readdirSync(modifiersDir).filter(f => f.endsWith('.json') && f !== 'Normal.json');
    files.forEach(file => {
      const filePath = path.join(modifiersDir, file);
      const category = `modifiers.${file.replace('.json', '').toLowerCase().replace(/\s+/g, '-')}`;
      // Prioridad 10 para otros modifiers
      total += processFile(filePath, pColors, allTokens, 'light', category, allTokens, 10);
    });
  }
  
  // TERCERO: s-colors (prioridad baja - estos tienen referencias circulares)
  const sColorsDir = path.join(FIGMA_DIR, 's-colors');
  if (fs.existsSync(sColorsDir)) {
    const lightFile = path.join(sColorsDir, 'Light Mode.json');
    const darkFile = path.join(sColorsDir, 'Dark Mode.json');
    // Prioridad 5 para s-colors (baja - solo si no existe ya)
    total += processFile(lightFile, pColors, allTokens, 'light', 'color', allTokens, 5);
    total += processFile(darkFile, pColors, allTokens, 'dark', 'color', allTokens, 5);
  }
  
  // btn-tone
  const btnToneDir = path.join(FIGMA_DIR, 'btn-tone');
  if (fs.existsSync(btnToneDir)) {
    const files = fs.readdirSync(btnToneDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const filePath = path.join(btnToneDir, file);
      const category = `btn-tone.${file.replace('.json', '').toLowerCase()}`;
      total += processFile(filePath, pColors, allTokens, 'light', category, allTokens, 5);
    });
  }
  
  // button-tone
  const buttonToneDir = path.join(FIGMA_DIR, 'button-tone');
  if (fs.existsSync(buttonToneDir)) {
    const files = fs.readdirSync(buttonToneDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const filePath = path.join(buttonToneDir, file);
      const category = `button-tone.${file.replace('.json', '').toLowerCase().replace(/\s+/g, '-')}`;
      total += processFile(filePath, pColors, allTokens, 'light', category, allTokens, 5);
    });
  }
  
  console.log(`\n✅ Total: ${total} tokens procesados`);
  console.log(`✅ Únicos: ${Object.keys(allTokens).length} tokens únicos\n`);
  
  return allTokens;
}

// Generar JSON plano (más simple y robusto)
function generateJSON(tokens) {
  const output = {
    $schema: 'https://schemas.figma.com/tokens/v1',
    metadata: {
      description: 'Todos los tokens de Figma convertidos',
      totalTokens: Object.keys(tokens).length
    },
    tokens: {}
  };
  
  // Guardar todos los tokens en estructura plana
  for (const [key, token] of Object.entries(tokens)) {
    output.tokens[key] = {
      $type: token.type,
      $value: token.value,
      $description: token.description,
      $path: token.path,
      $cssVar: token.cssVar
    };
  }
  
  return output;
}

// Generar CSS
function generateCSS(tokens) {
  const lightVars = [];
  const darkVars = [];
  const seen = new Set();
  
  for (const [key, token] of Object.entries(tokens)) {
    const [mode] = key.split('.');
    const cssVar = token.cssVar;
    
    // Evitar duplicados de CSS vars
    if (seen.has(cssVar)) continue;
    seen.add(cssVar);
    
    if (mode === 'light') {
      lightVars.push(`  ${cssVar}: ${token.value};`);
    } else {
      darkVars.push(`  ${cssVar}: ${token.value};`);
    }
  }
  
  return `/* Tokens de Figma - Todos los tokens */
/* Generado automáticamente desde todos los archivos de Figma */
/* Total: ${Object.keys(tokens).length} tokens */

:root {
${lightVars.join('\n')}
}

[data-theme="dark"] {
${darkVars.join('\n')}
}
`;
}

// Main
function main() {
  console.log('🚀 Convirtiendo TODOS los tokens de Figma...\n');
  
  const tokens = processAllFiles();
  
  // Asegurar directorios
  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.mkdirSync(path.dirname(OUTPUT_CSS), { recursive: true });
  
  // Generar JSON
  const jsonOutput = generateJSON(tokens);
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonOutput, null, 2), 'utf8');
  console.log(`✅ JSON: ${OUTPUT_JSON}`);
  console.log(`   ${Object.keys(tokens).length} tokens guardados\n`);
  
  // Generar CSS
  const cssOutput = generateCSS(tokens);
  fs.writeFileSync(OUTPUT_CSS, cssOutput, 'utf8');
  console.log(`✅ CSS: ${OUTPUT_CSS}`);
  
  const cssVarCount = new Set(Object.values(tokens).map(t => t.cssVar)).size;
  console.log(`   ${cssVarCount} variables CSS generadas\n`);
  
  console.log('✅ ¡Completado!');
}

main();

