#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const TOKENS_PATH = path.resolve(__dirname, 'tokens.json');
const FIGMA_TOKENS_PATH = path.resolve(__dirname, 'figma-tokens.json');
const DIST_DIR = path.resolve(__dirname, 'dist');
const OUT_CSS = path.resolve(DIST_DIR, 'tokens.css');
const FIGMA_OUT_CSS = path.resolve(DIST_DIR, 'figma-tokens.css');

// Asegurar que el directorio dist existe
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      flatten(v, key, out);
    } else {
      out[key] = v;
    }
  }
  return out;
}

function emitScope(varsObj) {
  const lines = [];
  for (const [key, value] of Object.entries(varsObj)) {
    const name = key.split('.').pop();
    const cssVar = `--${name}`;
    lines.push(`  ${cssVar}: ${value};`);
  }
  return lines.join('\n');
}

// Construir mapa de valores primitivos (pec) para resolver referencias
function buildPrimitiveMap(figmaData) {
  const primitives = {};
  
  function extractPrimitives(obj, path = []) {
    if (typeof obj === 'object' && obj !== null) {
      // Si tiene $value y es un color directo (#...), guardarlo
      if (obj.$value && typeof obj.$value === 'string' && obj.$value.startsWith('#')) {
        const fullKey = path.join('.');
        primitives[fullKey] = obj.$value;
        
        // También guardar sin el prefijo "p-colors/Mode 1." para referencias como {pec.blue.44}
        // Buscar si la ruta contiene "pec" y guardar la parte después de "pec"
        const pecIndex = path.indexOf('pec');
        if (pecIndex >= 0) {
          const shortKey = path.slice(pecIndex).join('.');
          primitives[shortKey] = obj.$value;
        }
      }
      // Recursivamente buscar en todas las propiedades
      for (const key in obj) {
        if (key !== '$type' && key !== '$description' && key !== '$path' && key !== '$cssVar' && key !== '$schema' && key !== 'metadata') {
          extractPrimitives(obj[key], [...path, key]);
        }
      }
    }
  }
  
  extractPrimitives(figmaData);
  return primitives;
}

// Resolver referencias como {pec.blue.44} a valores reales
function resolveReference(value, primitives) {
  if (typeof value !== 'string') return value;
  
  // Si es una referencia {path.to.value}
  const refMatch = value.match(/^\{(.+)\}$/);
  if (refMatch) {
    const refPath = refMatch[1];
    return primitives[refPath] || value; // Retornar el valor resuelto o el original si no se encuentra
  }
  
  // Si ya es un valor directo (#... o otro)
  return value;
}

// Extraer tokens de Figma preservando estructura
function extractFigmaTokens(figmaData, mode, primitives) {
  const tokens = {};
  const unresolvedRefs = {}; // Guardar tokens con referencias sin resolver para resolver después
  
  function extract(obj, path = []) {
    if (typeof obj === 'object' && obj !== null) {
      // Si tiene $value y $type, es un token
      if (obj.$value !== undefined && obj.$type) {
        const resolvedValue = resolveReference(obj.$value, primitives);
        
        // Generar nombre de variable CSS desde la ruta
        // Filtrar solo "Light Mode" y "Dark Mode" del path, pero MANTENER "light" y "dark" en el nombre
        // para que los tokens tengan nombres como --modifiers-normal-color-light-feedback-...
        const cssVarName = path
          .filter(p => {
            if (!p) return false;
            const pLower = p.toLowerCase();
            // Solo filtrar "Light Mode" y "Dark Mode", NO filtrar "light" o "dark" individuales
            // porque estos son parte del nombre del token (indican el modo)
            return pLower !== 'light mode' && pLower !== 'dark mode';
          })
          .map(p => p.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-'))
          .join('-');
        
        if (cssVarName) {
          // Si el valor está resuelto (no es una referencia sin resolver), agregarlo directamente
          // Procesar tanto strings como números (para fontSize, lineHeight, etc.)
          if (resolvedValue !== undefined && resolvedValue !== null) {
            if (typeof resolvedValue === 'string' && !resolvedValue.match(/^\{[^}]+\}$/)) {
              tokens[`--${cssVarName}`] = resolvedValue;
            } else if (typeof resolvedValue === 'number') {
              // Para valores numéricos, agregar 'px' si es fontSize o lineHeight, o el valor directo
              const isSize = cssVarName.includes('fontsize') || cssVarName.includes('lineheight');
              tokens[`--${cssVarName}`] = isSize ? `${resolvedValue}px` : String(resolvedValue);
            } else if (typeof resolvedValue === 'string' && resolvedValue.match(/^\{[^}]+\}$/)) {
              // Guardar referencia sin resolver para intentar resolver después
              unresolvedRefs[`--${cssVarName}`] = resolvedValue;
            }
          }
        }
      }
      
      // Recursivamente buscar en todas las propiedades
      for (const key in obj) {
        if (key !== '$type' && key !== '$description' && key !== '$path' && key !== '$cssVar' && key !== '$schema' && key !== 'metadata') {
          extract(obj[key], [...path, key]);
        }
      }
    }
  }
  
  // Buscar recursivamente todos los objetos con "light" o "dark"
  // PERO también extraer tokens que NO tienen light/dark (como chart, brand, scroll-bar, etc.)
  function findModeNodes(obj, currentPath = []) {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        // Normalizar el nombre de la clave para comparar (case-insensitive, sin espacios)
        const normalizedKey = key.toLowerCase().replace(/\s+/g, '').replace(/\//g, '');
        const normalizedMode = mode.toLowerCase();
        
        // Buscar "Light Mode", "light", "Dark Mode", "dark", etc.
        const isLightMode = normalizedKey.includes('light') && (normalizedKey.includes('mode') || normalizedKey === 'light');
        const isDarkMode = normalizedKey.includes('dark') && (normalizedKey.includes('mode') || normalizedKey === 'dark');
        
        if (key === mode || (normalizedMode === 'light' && isLightMode) || (normalizedMode === 'dark' && isDarkMode)) {
          // Encontramos el modo correcto, extraer tokens desde aquí
          extract(obj[key], [...currentPath, key]);
        } else if ((key === 'light' && mode === 'light') || (key === 'dark' && mode === 'dark')) {
          // Si encontramos light/dark directamente Y coincide con el modo actual, extraer tokens
          extract(obj[key], [...currentPath, key]);
        } else if (isLightMode && mode === 'dark') {
          // Si encontramos "Light Mode" pero estamos en modo "dark", saltarlo completamente
          // No continuar buscando en este nodo
          continue;
        } else if (isDarkMode && mode === 'light') {
          // Si encontramos "Dark Mode" pero estamos en modo "light", saltarlo completamente
          // No continuar buscando en este nodo
          continue;
        } else {
          // Si el objeto tiene $value directamente (sin light/dark), también extraerlo
          if (obj[key] && typeof obj[key] === 'object' && obj[key].$value !== undefined && obj[key].$type) {
            extract(obj[key], [...currentPath, key]);
          }
          // Continuar buscando recursivamente
          findModeNodes(obj[key], [...currentPath, key]);
        }
      }
    }
  }
  
  // Buscar en la raíz primero (s-colors/Light Mode, s-colors/Dark Mode)
  if (figmaData[''] && figmaData['']['s-colors']) {
    const sColors = figmaData['']['s-colors'];
    const lightModeKey = Object.keys(sColors).find(k => k.toLowerCase().includes('light') && k.toLowerCase().includes('mode'));
    const darkModeKey = Object.keys(sColors).find(k => k.toLowerCase().includes('dark') && k.toLowerCase().includes('mode'));
    
    if (mode === 'light' && lightModeKey) {
      extract(sColors[lightModeKey], ['s-colors', lightModeKey]);
    } else if (mode === 'dark' && darkModeKey) {
      extract(sColors[darkModeKey], ['s-colors', darkModeKey]);
    }
  }
  
  findModeNodes(figmaData);
  
  // Resolver referencias cruzadas entre tokens (segundo paso)
  // Las referencias como {color.light.fg.1.high} necesitan resolverse a otros tokens ya extraídos
  function resolveCrossReferences(unresolved, resolved) {
    let changed = true;
    let iterations = 0;
    const maxIterations = 10; // Evitar loops infinitos
    
    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;
      
      for (const [tokenName, refValue] of Object.entries(unresolved)) {
        const refMatch = refValue.match(/^\{(.+)\}$/);
        if (refMatch) {
          const refPath = refMatch[1];
          // Intentar resolver la referencia
          // Las referencias pueden ser como: color.light.fg.1.high
          // Necesitamos convertirlas a nombres de tokens CSS
          const tokenPath = refPath.split('.').map(p => p.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-')).join('-');
          const possibleTokenName = `--modifiers-normal-${tokenPath}`;
          
          // Buscar el token en los tokens ya resueltos
          if (resolved[possibleTokenName]) {
            resolved[tokenName] = resolved[possibleTokenName];
            delete unresolved[tokenName];
            changed = true;
          }
        }
      }
    }
    
    // Si quedan referencias sin resolver, no las agregamos (se filtrarán)
    return resolved;
  }
  
  // Resolver referencias cruzadas
  const resolvedTokens = resolveCrossReferences(unresolvedRefs, tokens);
  // Agregar tokens resueltos al objeto tokens
  Object.assign(tokens, resolvedTokens);
  
  // También extraer tokens que NO tienen light/dark (como chart, brand, scroll-bar, toggle, button, etc.)
  // Estos están en el mismo nivel que "color" dentro de modifiers/Normal, etc.
  function extractNonModeTokens(obj, path = []) {
    if (typeof obj === 'object' && obj !== null) {
      // Si tiene $value y $type, es un token (sin light/dark)
      if (obj.$value !== undefined && obj.$type && path.length > 0) {
        const resolvedValue = resolveReference(obj.$value, primitives);
        // SOLO agregar si el valor está resuelto (no es una referencia sin resolver)
        // Las referencias sin resolver empiezan con { pero no son primitivos (pec.*)
        if (resolvedValue && typeof resolvedValue === 'string' && !resolvedValue.match(/^\{[^}]+\}$/)) {
          const cssVarName = path
            .filter(p => p && p !== 'light' && p !== 'dark')
            .map(p => p.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-'))
            .join('-');
          
          if (cssVarName) {
            tokens[`--${cssVarName}`] = resolvedValue;
          }
        }
      }
      
      // Recursivamente buscar en todas las propiedades
      for (const key in obj) {
        if (key !== '$type' && key !== '$description' && key !== '$path' && key !== '$cssVar' && key !== '$schema' && key !== 'metadata' && key !== 'light' && key !== 'dark') {
          extractNonModeTokens(obj[key], [...path, key]);
        }
      }
    }
  }
  
  // Extraer tokens sin light/dark de modifiers
  if (figmaData[''] && figmaData['']['modifiers/Normal']) {
    const normal = figmaData['']['modifiers/Normal'];
    // Extraer chart, brand, scroll-bar, toggle, button, etc. (sin light/dark)
    ['chart', 'brand', 'scroll-bar', 'toggle', 'button', 'ai-button', 'focus', 'elevation'].forEach(prop => {
      if (normal[prop]) {
        extractNonModeTokens(normal[prop], ['modifiers', 'normal', prop]);
      }
    });
  }
  
  // Hacer lo mismo para otros modificadores
  ['modifiers/Inverted', 'modifiers/Static', 'modifiers/Static inverted'].forEach(modifierKey => {
    if (figmaData[''] && figmaData[''][modifierKey]) {
      const modifier = figmaData[''][modifierKey];
      const modifierName = modifierKey.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-');
      ['chart', 'brand', 'scroll-bar', 'toggle', 'button', 'ai-button', 'focus', 'elevation'].forEach(prop => {
        if (modifier[prop]) {
          extractNonModeTokens(modifier[prop], ['modifiers', modifierName, prop]);
        }
      });
    }
  });
  
  return tokens;
}

function main() {
  // Generar tokens actuales (ubits-*)
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
  const lightFlat = flatten(tokens.light);
  const darkFlat = flatten(tokens.dark);
  const content = `/* Tokens UBITS actuales */
:root{\n${emitScope(lightFlat)}\n}\n\n[data-theme="dark"]{\n${emitScope(darkFlat)}\n}\n`;
  fs.writeFileSync(OUT_CSS, content);
  console.log(`✅ Tokens UBITS generados: ${OUT_CSS}`);
  
  // Generar tokens de Figma si existen
  if (fs.existsSync(FIGMA_TOKENS_PATH)) {
    const figmaTokens = JSON.parse(fs.readFileSync(FIGMA_TOKENS_PATH, 'utf8'));
    
    // Construir mapa de primitivos primero
    const primitives = buildPrimitiveMap(figmaTokens);
    console.log(`📦 Primitivos encontrados: ${Object.keys(primitives).length}`);
    
    // Extraer tokens para light y dark
    const lightFigma = extractFigmaTokens(figmaTokens, 'light', primitives);
    const darkFigma = extractFigmaTokens(figmaTokens, 'dark', primitives);
    
    const figmaContent = `/* Tokens de Figma - Estructura preservada */
/* Preserva: nombres, semántica, primítivos, nomenclatura, estructura, agrupaciones */
/* Generado desde figma-tokens.json */
:root{\n${Object.entries(lightFigma).map(([cssVar, val]) => `  ${cssVar}: ${val};`).join('\n')}\n}\n\n[data-theme="dark"]{\n${Object.entries(darkFigma).map(([cssVar, val]) => `  ${cssVar}: ${val};`).join('\n')}\n}\n`;
    
    fs.writeFileSync(FIGMA_OUT_CSS, figmaContent);
    console.log(`✅ Tokens de Figma generados: ${FIGMA_OUT_CSS}`);
    console.log(`   Total tokens Light: ${Object.keys(lightFigma).length}`);
    console.log(`   Total tokens Dark: ${Object.keys(darkFigma).length}`);
    console.log(`   Total tokens Figma: ${Object.keys(lightFigma).length + Object.keys(darkFigma).length}`);
  } else {
    console.log(`⚠️  Archivo ${FIGMA_TOKENS_PATH} no encontrado. Ejecuta scripts/convert-figma-to-css-vars.cjs primero.`);
  }
}

main();
