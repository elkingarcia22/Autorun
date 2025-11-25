#!/usr/bin/env node
/**
 * Script V2 - Rehecho desde cero
 * Procesa TODOS los tokens de Figma con lógica clara:
 * 1. .modifiers/Normal.json PRIMERO (valores reales)
 * 2. Resolver referencias a p-colors
 * 3. Normalizar paths correctamente
 * 4. s-colors después (solo si no existe)
 */

const fs = require('fs');
const path = require('path');

// WORKSPACE_ROOT: usar process.cwd() que debería estar en la raíz del proyecto
const WORKSPACE_ROOT = process.cwd();
const FIGMA_DIR = '/Users/elkinmac/Desktop/tokens';
const OUTPUT_JSON = path.resolve(WORKSPACE_ROOT, 'packages', 'tokens', 'figma-tokens.json');
const OUTPUT_CSS = path.resolve(WORKSPACE_ROOT, 'packages', 'tokens', 'dist', 'figma-tokens.css');

console.log('📁 Paths configurados:');
console.log(`   FIGMA_DIR: ${FIGMA_DIR}`);
console.log(`   WORKSPACE_ROOT: ${WORKSPACE_ROOT}`);
console.log(`   OUTPUT_JSON: ${OUTPUT_JSON}`);
console.log(`   OUTPUT_CSS: ${OUTPUT_CSS}\n`);

// ============================================
// 1. CARGAR p-colors (valores primitivos)
// ============================================
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
        if (key !== '$type' && key !== '$description' && key !== '$value') {
          extract(obj[key], prefix ? `${prefix}.${key}` : key);
        }
      }
    }
  }
  
  extract(data);
  console.log(`✅ Cargados ${Object.keys(colors).length} valores primitivos de p-colors\n`);
  return colors;
}

// ============================================
// 2. RESOLVER REFERENCIA (p-colors PRIMERO)
// ============================================
function resolveReference(ref, pColors, allTokens = {}, visited = new Set(), depth = 0) {
  if (depth > 50) return null;
  if (!ref || typeof ref !== 'string') return null;
  
  // Si ya es un hex, retornarlo
  if (ref.startsWith('#')) {
    return ref.toLowerCase();
  }
  
  // Si es una referencia {token.path}
  if (ref.startsWith('{') && ref.endsWith('}')) {
    const key = ref.slice(1, -1);
    
    // Evitar referencias circulares
    if (visited.has(key)) {
      // Buscar en p-colors como último recurso
      if (pColors[key]) return pColors[key];
      return null;
    }
    
    visited.add(key);
    
    // PRIMERO: Buscar en p-colors (valores primitivos)
    if (pColors[key]) {
      visited.delete(key);
      return pColors[key];
    }
    
    // Buscar por coincidencia parcial en p-colors
    const parts = key.split('.');
    for (let i = parts.length; i > 0; i--) {
      const partial = parts.slice(-i).join('.');
      for (const [k, v] of Object.entries(pColors)) {
        if (k === partial || k.endsWith('.' + partial)) {
          visited.delete(key);
          return v;
        }
      }
    }
    
    // SEGUNDO: Buscar en allTokens (tokens ya procesados)
    // Normalizar la key: color.light.bg.1 -> color.bg.1
    const normalizedKey = key.replace(/^color\.(light|dark)\./, 'color.');
    for (const [tokenKey, token] of Object.entries(allTokens)) {
      const tokenPath = tokenKey.split('.').slice(1).join('.'); // Remover mode.
      const normalizedTokenPath = tokenPath.replace(/^color\.(light|dark)\./, 'color.');
      
      if (normalizedTokenPath === normalizedKey || tokenPath === key) {
        const resolved = resolveReference(token.value, pColors, allTokens, visited, depth + 1);
        visited.delete(key);
        return resolved;
      }
    }
    
    visited.delete(key);
  }
  
  return null;
}

// ============================================
// 3. EXTRAER TOKENS DE UN ARCHIVO
// ============================================
function extractTokens(data, mode, category = '') {
  const tokens = {};
  
  function traverse(obj, currentPath = '') {
    if (typeof obj === 'object' && obj !== null) {
      if (obj.$value !== undefined) {
        // Normalizar path
        let normalizedPath = currentPath;
        
        // Remover color.light. o color.dark. del inicio
        if (normalizedPath.startsWith('color.light.') || normalizedPath.startsWith('color.dark.')) {
          normalizedPath = normalizedPath.replace(/^color\.(light|dark)\./, 'color.');
        }
        
        // Remover color.color. duplicado
        while (normalizedPath.startsWith('color.color.')) {
          normalizedPath = normalizedPath.replace(/^color\.color\./, 'color.');
        }
        
        // Construir finalPath: si category es 'color' y normalizedPath ya empieza con 'color.', usar solo normalizedPath
        let finalPath;
        if (category === 'color' && normalizedPath.startsWith('color.')) {
          finalPath = normalizedPath; // Ya tiene 'color.', no duplicar
        } else if (category) {
          finalPath = `${category}.${normalizedPath}`;
        } else {
          finalPath = normalizedPath;
        }
        
        // Asegurar que no haya color.color. duplicado al final
        while (finalPath.startsWith('color.color.')) {
          finalPath = finalPath.replace(/^color\.color\./, 'color.');
        }
        
        const tokenKey = `${mode}.${finalPath}`;
        
        tokens[tokenKey] = {
          value: obj.$value,
          type: obj.$type || 'color',
          description: obj.$description || '',
          path: finalPath
        };
      }
      
      for (const key in obj) {
        if (key !== '$type' && key !== '$description' && key !== '$value') {
          const newPath = currentPath ? `${currentPath}.${key}` : key;
          traverse(obj[key], newPath);
        }
      }
    }
  }
  
  traverse(data);
  return tokens;
}

// ============================================
// 4. PROCESAR ARCHIVO
// ============================================
function processFile(filePath, pColors, allTokens, mode, category = '', priority = 0) {
  if (!fs.existsSync(filePath)) {
    return 0;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const fileTokens = extractTokens(data, mode, category);
    
    const fileRelPath = path.relative(FIGMA_DIR, filePath);
    console.log(`📄 ${fileRelPath}...`);
    
    let resolved = 0;
    for (const [tokenKey, token] of Object.entries(fileTokens)) {
      // Resolver referencia
      const resolvedValue = resolveReference(token.value, pColors, allTokens);
      
      if (resolvedValue) {
        // Solo agregar si no existe o si tiene mayor prioridad
        const existing = allTokens[tokenKey];
        if (!existing || priority > (existing._priority || 0)) {
          allTokens[tokenKey] = {
            value: resolvedValue,
            type: token.type,
            description: token.description,
            path: token.path,
            cssVar: `--${token.path.replace(/\./g, '-')}`,
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

// ============================================
// 5. PROCESAR TODOS LOS ARCHIVOS
// ============================================
function processAllFiles() {
  const pColors = loadPColors();
  const allTokens = {};
  let total = 0;
  
  console.log('📦 Procesando TODOS los archivos de tokens de Figma...\n');
  
  // PRIMERO: .modifiers/Normal.json (MÁXIMA PRIORIDAD - valores reales)
  const modifiersDir = path.join(FIGMA_DIR, '.modifiers');
  if (fs.existsSync(modifiersDir)) {
    const normalFile = path.join(modifiersDir, 'Normal.json');
    if (fs.existsSync(normalFile)) {
      console.log('📌 Procesando .modifiers/Normal.json PRIMERO (valores base)...');
      // Usar category 'color' para que genere la misma key que s-colors
      total += processFile(normalFile, pColors, allTokens, 'light', 'color', 20);
    }
  }
  
  // SEGUNDO: .modifiers otros archivos
  if (fs.existsSync(modifiersDir)) {
    const files = fs.readdirSync(modifiersDir).filter(f => f.endsWith('.json') && f !== 'Normal.json');
    files.forEach(file => {
      const filePath = path.join(modifiersDir, file);
      const category = `modifiers.${file.replace('.json', '').toLowerCase().replace(/\s+/g, '-')}`;
      total += processFile(filePath, pColors, allTokens, 'light', category, 10);
    });
  }
  
  // TERCERO: s-colors (baja prioridad - solo si no existe)
  // s-colors ya tiene paths que empiezan con 'color.', no agregar category
  const sColorsDir = path.join(FIGMA_DIR, 's-colors');
  if (fs.existsSync(sColorsDir)) {
    const lightFile = path.join(sColorsDir, 'Light Mode.json');
    const darkFile = path.join(sColorsDir, 'Dark Mode.json');
    total += processFile(lightFile, pColors, allTokens, 'light', '', 5);
    total += processFile(darkFile, pColors, allTokens, 'dark', '', 5);
  }
  
  // CUARTO: btn-tone y button-tone
  const btnToneDir = path.join(FIGMA_DIR, 'btn-tone');
  if (fs.existsSync(btnToneDir)) {
    const files = fs.readdirSync(btnToneDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const filePath = path.join(btnToneDir, file);
      const category = `btn-tone.${file.replace('.json', '').toLowerCase()}`;
      total += processFile(filePath, pColors, allTokens, 'light', category, 5);
    });
  }
  
  const buttonToneDir = path.join(FIGMA_DIR, 'button-tone');
  if (fs.existsSync(buttonToneDir)) {
    const files = fs.readdirSync(buttonToneDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const filePath = path.join(buttonToneDir, file);
      const category = `button-tone.${file.replace('.json', '').toLowerCase().replace(/\s+/g, '-')}`;
      total += processFile(filePath, pColors, allTokens, 'light', category, 5);
    });
  }
  
  console.log(`\n✅ Total: ${total} tokens procesados`);
  console.log(`✅ Únicos: ${Object.keys(allTokens).length} tokens únicos\n`);
  
  return allTokens;
}

// ============================================
// 6. GENERAR JSON
// ============================================
function generateJSON(tokens) {
  const output = {
    $schema: 'https://schemas.figma.com/tokens/v1',
    metadata: {
      description: 'Todos los tokens de Figma convertidos',
      totalTokens: Object.keys(tokens).length
    },
    tokens: {}
  };
  
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

// ============================================
// 7. GENERAR CSS
// ============================================
function generateCSS(tokens) {
  const lightVars = [];
  const darkVars = [];
  const seen = new Set();
  
  for (const [key, token] of Object.entries(tokens)) {
    const [mode] = key.split('.');
    const cssVar = token.cssVar;
    
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

// ============================================
// MAIN
// ============================================
function main() {
  console.log('🚀 Convirtiendo TODOS los tokens de Figma (V2)...\n');
  
  const tokens = processAllFiles();
  
  // Generar JSON
  const json = generateJSON(tokens);
  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(json, null, 2), 'utf8');
  console.log(`✅ JSON: ${OUTPUT_JSON}`);
  console.log(`   ${Object.keys(tokens).length} tokens guardados\n`);
  
  // Generar CSS
  const css = generateCSS(tokens);
  fs.mkdirSync(path.dirname(OUTPUT_CSS), { recursive: true });
  fs.writeFileSync(OUTPUT_CSS, css, 'utf8');
  console.log(`✅ CSS: ${OUTPUT_CSS}`);
  console.log(`   ${css.match(/^  --/gm)?.length || 0} variables CSS generadas\n`);
  
  console.log('✅ ¡Completado!\n');
}

main();

