#!/usr/bin/env node

/**
 * UBITS Validation Script with Auto-Fix
 * 
 * Valida y corrige automáticamente código para usar tokens UBITS
 * Ejecutar: npm run validate (solo validar)
 *          npm run validate:fix (validar y corregir automáticamente)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Cargar inventario de componentes
const inventoryPath = path.join(__dirname, '..', '.ubits', 'component-inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

// Patrones de validación
const patterns = {
  // Colores hardcodeados con sus reemplazos
  hardcodedColors: [
    { pattern: /#[0-9a-fA-F]{3,6}/gi, type: 'hex' },
    { pattern: /rgb\([^)]+\)/gi, type: 'rgb' },
    { pattern: /rgba\([^)]+\)/gi, type: 'rgba' },
    { pattern: /hsl\([^)]+\)/gi, type: 'hsl' },
    { pattern: /hsla\([^)]+\)/gi, type: 'hsla' },
    { pattern: /\b(white|black|red|blue|green|yellow|gray|grey)(?!-|-space|-collapse|-smoke|-noise|Space|Collapse)/gi, type: 'named' }
  ],
  
  // Clases de tipografía prohibidas con sus reemplazos
  prohibitedTypography: [
    { pattern: /\bubits-h1\b/gi, replace: 'ubits-heading-h1' },
    { pattern: /\bubits-h2\b/gi, replace: 'ubits-heading-h2' },
    { pattern: /\bubits-title\b/gi, replace: 'ubits-body-md-bold' },
    { pattern: /\bubits-subtitle\b/gi, replace: 'ubits-body-sm-bold' },
    { pattern: /\bubits-text\b/gi, replace: 'ubits-body-md-regular' },
    { pattern: /\bubits-paragraph\b/gi, replace: 'ubits-body-md-regular' },
    { pattern: /\bubits-body-lg-bold\b/gi, replace: 'ubits-heading-h1' }
  ]
};

// Mapa de colores comunes a tokens UBITS
const colorToTokenMap = {
  'white': 'var(--ubits-bg-1)',
  'black': 'var(--ubits-fg-1-high)',
  '#ffffff': 'var(--ubits-bg-1)',
  '#fff': 'var(--ubits-bg-1)',
  '#000000': 'var(--ubits-fg-1-high)',
  '#000': 'var(--ubits-fg-1-high)',
  '#f9fafb': 'var(--ubits-bg-1)',
  '#1a1a1a': 'var(--ubits-fg-1-high)',
  '#303a47': 'var(--ubits-fg-1-high)',
  '#5c646f': 'var(--ubits-fg-1-medium)',
  '#e5e7eb': 'var(--ubits-border-1)'
};

/**
 * Obtener archivos modificados en staging
 */
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return output.split('\n').filter(Boolean);
  } catch (error) {
    return [];
  }
}

/**
 * Obtener archivos modificados
 */
function getModifiedFiles() {
  try {
    const output = execSync('git diff --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return output.split('\n').filter(Boolean);
  } catch (error) {
    return [];
  }
}

/**
 * Auto-corregir archivo
 */
function autoFixFile(filePath, content) {
  let fixedContent = content;
  let fixes = [];
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  
  // 1. Corregir clases de tipografía prohibidas
  patterns.prohibitedTypography.forEach(({ pattern, replace }) => {
    const matches = fixedContent.match(pattern);
    if (matches) {
      fixedContent = fixedContent.replace(pattern, replace);
      fixes.push({
        type: 'typography',
        message: `Reemplazado clase prohibida → ${replace}`,
        count: matches.length
      });
    }
  });
  
  // 2. Corregir colores nombrados comunes
  Object.entries(colorToTokenMap).forEach(([color, token]) => {
    // Solo reemplazar si es un valor de color (después de : o =)
    const colorPattern = new RegExp(`(:|\\s|;|=)${color.replace('#', '\\#')}(\\s|;|\\}|,|$)`, 'gi');
    const matches = fixedContent.match(colorPattern);
    if (matches) {
      fixedContent = fixedContent.replace(colorPattern, (match, before, after) => {
        // Verificar que no sea parte de una propiedad CSS válida
        const beforeContext = fixedContent.substring(0, fixedContent.indexOf(match));
        if (beforeContext.includes('white-space') || beforeContext.includes('background-image')) {
          return match; // No reemplazar
        }
        return `${before}${token}${after}`;
      });
      fixes.push({
        type: 'color',
        message: `Reemplazado ${color} → ${token}`,
        count: matches.length
      });
    }
  });
  
  return { fixedContent, fixes };
}

/**
 * Verificar si un archivo debe ser ignorado
 */
function shouldIgnoreFile(filePath) {
  const ignorePatterns = [
    /node_modules/,
    /\.git/,
    /\.husky/,
    /\.ubits\/component-inventory\.json/,
    /fontawesome.*\.css$/,  // Archivos CSS de Font Awesome (terceros)
    /fontawesome.*\.woff/,  // Archivos de fuentes de Font Awesome
    /packages\/playground-app\/tokens\/index\.html$/,  // Archivo de demostración de tokens
    /\.min\.(css|js)$/  // Archivos minificados de terceros
  ];
  
  return ignorePatterns.some(pattern => pattern.test(filePath));
}

/**
 * Validar un archivo
 */
function validateFile(filePath, autoFix = false) {
  // Ignorar archivos de terceros y demostración
  if (shouldIgnoreFile(filePath)) {
    return { errors: [], warnings: [], fixes: [] };
  }
  
  const errors = [];
  const warnings = [];
  let fixes = [];
  let content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  
  // Auto-corregir si está habilitado
  if (autoFix) {
    const { fixedContent, fixes: fileFixes } = autoFixFile(filePath, content);
    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      fixes = fileFixes;
      content = fixedContent; // Usar contenido corregido para validar
    }
  }
  
  // 1. Validar colores hardcodeados (después de auto-fix)
  patterns.hardcodedColors.forEach(({ pattern, type }) => {
    const matches = content.match(pattern);
    if (matches) {
      const realMatches = matches.filter(match => {
        const matchIndex = content.indexOf(match);
        const before = content.substring(Math.max(0, matchIndex - 50), matchIndex);
        const after = content.substring(matchIndex + match.length, matchIndex + match.length + 50);
        
        if (before.includes('//') || before.includes('/*') || before.includes('http')) {
          return false;
        }
        if (match.includes('var(--ubits-') || before.includes('var(--ubits-')) {
          return false;
        }
        if (filePath.endsWith('.css') && match.startsWith('rgba(')) {
          const context = before + match + after;
          const fullLine = content.substring(Math.max(0, content.lastIndexOf('\n', matchIndex) + 1), Math.min(content.length, content.indexOf('\n', matchIndex + match.length) || content.length));
          if (fullLine.includes('box-shadow') || fullLine.includes('text-shadow') || 
              context.includes('box-shadow') || context.includes('text-shadow') || 
              context.includes('backdrop-filter') || (context.includes('background:') && context.includes('rgba'))) {
            return false;
          }
        }
        if (filePath.includes('stories/') && (match === '#ffffff' || match === '#f9fafb' || match === 'white')) {
          return false;
        }
        if (match.toLowerCase() === 'white') {
          const context = before.toLowerCase();
          if (context.includes('white-space') || context.includes('white-') || context.includes(':white')) {
            return false;
          }
        }
        if (match.toLowerCase() === 'gray' || match.toLowerCase() === 'grey') {
          const context = (before + match + after).toLowerCase();
          if (context.includes('grayscale') || context.includes('filter:') || context.includes('filter :')) {
            return false;
          }
        }
        if (match.startsWith('rgba(') && (before.includes('box-shadow') || before.includes('text-shadow'))) {
          return false;
        }
        // Ignorar colores dentro de arrays de opciones o keys de objetos de mapeo (ej: options: ['green', 'red'], o green: 'success')
        if (match.toLowerCase() === 'green' || match.toLowerCase() === 'red' || match.toLowerCase() === 'blue' || 
            match.toLowerCase() === 'orange' || match.toLowerCase() === 'gray' || match.toLowerCase() === 'grey' ||
            match.toLowerCase() === 'yellow' || match.toLowerCase() === 'black' || match.toLowerCase() === 'white') {
          const context = (before + match + after).toLowerCase();
          const afterTrimmed = after.trim();
          const beforeTrimmed = before.trim();
          // Ignorar si está dentro de un array de opciones o como key de objeto
          if (context.includes('options:') || context.includes('options =') || 
              context.includes('badgecolor') || context.includes('badge_color') ||
              context.includes('variants:') || context.includes('_variants') ||
              context.includes('badge_variants') || context.includes('badgevariants') ||
              context.includes('color_tokens') || context.includes('colorTokens') ||
              context.includes('color_map') || context.includes('colorMap') ||
              context.includes('segments') || context.includes('segment') ||
              (beforeTrimmed.endsWith(':') && (afterTrimmed.startsWith(':') || afterTrimmed.startsWith("'") || afterTrimmed.startsWith('"'))) ||
              (before.includes("['") && after.includes("']")) ||
              (before.includes('["') && after.includes('"]')) ||
              (afterTrimmed.startsWith(':') && (afterTrimmed.includes("'") || afterTrimmed.includes('"'))) ||
              (before.includes("'") && after.includes("'")) ||
              (before.includes('"') && after.includes('"')) ||
              (before.includes(',') && after.includes(',')) ||
              (before.includes('[') && after.includes(']'))) {
            return false;
          }
        }
        return true;
      });
      
      if (realMatches.length > 0) {
        errors.push({
          type: 'hardcoded-color',
          message: `Colores hardcodeados: ${realMatches.slice(0, 3).join(', ')}${realMatches.length > 3 ? '...' : ''}`,
          file: relativePath,
          count: realMatches.length
        });
      }
    }
  });
  
  // 2. Validar clases de tipografía prohibidas
  patterns.prohibitedTypography.forEach(({ pattern }) => {
    const matches = content.match(pattern);
    if (matches) {
      errors.push({
        type: 'prohibited-typography',
        message: `Clase prohibida encontrada: ${matches[0]}`,
        file: relativePath,
        count: matches.length
      });
    }
  });
  
  return { errors, warnings, fixes };
}

/**
 * Función principal
 */
function main() {
  const args = process.argv.slice(2);
  const autoFix = args.includes('--fix') || args.includes('-f');
  const onlyStaged = args.includes('--staged') || args.includes('-s');
  
  console.log(`${colors.cyan}🔍 Validando código UBITS...${autoFix ? ' (modo auto-fix)' : ''}${colors.reset}\n`);
  
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFixes = 0;
  const allErrors = [];
  const allWarnings = [];
  const allFixes = [];
  
  // Obtener archivos
  let filesToValidate = [];
  if (onlyStaged) {
    filesToValidate = getStagedFiles();
  } else {
    const staged = getStagedFiles();
    const modified = getModifiedFiles();
    filesToValidate = [...new Set([...staged, ...modified])];
  }
  
  // Si no hay archivos en Git, validar todos los archivos relevantes
  if (filesToValidate.length === 0) {
    const rootDir = path.join(__dirname, '..');
    function walkDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') {
          continue;
        }
        if (entry.isDirectory()) {
          walkDir(fullPath);
        } else if (['.ts', '.tsx', '.js', '.jsx', '.html', '.css'].some(ext => entry.name.endsWith(ext))) {
          filesToValidate.push(fullPath);
        }
      }
    }
    walkDir(rootDir);
  }
  
  // Filtrar archivos relevantes
  const relevantFiles = filesToValidate.filter(file => {
    const ext = path.extname(file);
    return ['.ts', '.tsx', '.js', '.jsx', '.html', '.css'].includes(ext) &&
           !file.includes('node_modules') &&
           !file.includes('dist') &&
           !file.includes('.ubits') &&
           fs.existsSync(file);
  });
  
  console.log(`${colors.blue}📁 Archivos a validar: ${relevantFiles.length}${colors.reset}\n`);
  
  // Validar cada archivo
  relevantFiles.forEach(file => {
    try {
      const { errors, warnings, fixes } = validateFile(file, autoFix);
      allErrors.push(...errors.map(e => ({ ...e, file: path.relative(path.join(__dirname, '..'), file) })));
      allWarnings.push(...warnings.map(w => ({ ...w, file: path.relative(path.join(__dirname, '..'), file) })));
      if (fixes.length > 0) {
        allFixes.push(...fixes.map(f => ({ ...f, file: path.relative(path.join(__dirname, '..'), file) })));
        totalFixes += fixes.reduce((sum, f) => sum + (f.count || 1), 0);
        console.log(`${colors.green}✅ ${path.relative(path.join(__dirname, '..'), file)}: ${fixes.length} corrección(es) aplicada(s)${colors.reset}`);
      }
      totalErrors += errors.length;
      totalWarnings += warnings.length;
    } catch (error) {
      console.error(`${colors.red}❌ Error validando ${file}: ${error.message}${colors.reset}`);
    }
  });
  
  // Mostrar correcciones aplicadas
  if (totalFixes > 0) {
    console.log(`\n${colors.green}✅ ${totalFixes} corrección(es) aplicada(s) automáticamente${colors.reset}\n`);
  }
  
  // Mostrar resultados
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}📊 RESULTADOS DE VALIDACIÓN${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);
  
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log(`${colors.green}✅ Todo correcto! El código cumple con los estándares UBITS${colors.reset}\n`);
    process.exit(0);
  }
  
  // Mostrar errores
  if (totalErrors > 0) {
    console.log(`${colors.red}❌ ERRORES (${totalErrors}):${colors.reset}\n`);
    allErrors.slice(0, 10).forEach((err, idx) => {
      console.log(`${colors.red}  ${idx + 1}. ${err.file}${colors.reset}`);
      console.log(`     ${err.message}`);
      if (err.count) console.log(`     Encontrado ${err.count} vez(es)\n`);
    });
    if (allErrors.length > 10) {
      console.log(`${colors.yellow}  ... y ${allErrors.length - 10} error(es) más${colors.reset}\n`);
    }
  }
  
  // Mostrar advertencias
  if (totalWarnings > 0) {
    console.log(`${colors.yellow}⚠️  ADVERTENCIAS (${totalWarnings}):${colors.reset}\n`);
    allWarnings.slice(0, 5).forEach((warn, idx) => {
      console.log(`${colors.yellow}  ${idx + 1}. ${warn.file}${colors.reset}`);
      console.log(`     ${warn.message}`);
      if (warn.suggestion) console.log(`     💡 Sugerencia: ${warn.suggestion}\n`);
    });
    if (allWarnings.length > 5) {
      console.log(`${colors.yellow}  ... y ${allWarnings.length - 5} advertencia(s) más${colors.reset}\n`);
    }
  }
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  
  // Salir con código de error si hay errores críticos
  if (totalErrors > 0 && !autoFix) {
    console.log(`\n${colors.yellow}💡 Ejecuta: npm run validate:fix para corregir automáticamente${colors.reset}\n`);
    process.exit(1);
  } else if (totalErrors > 0 && autoFix) {
    console.log(`\n${colors.yellow}⚠️  Algunos errores requieren corrección manual${colors.reset}\n`);
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log(`\n${colors.yellow}⚠️  Hay advertencias. Revisa antes de hacer commit.${colors.reset}\n`);
    process.exit(0);
  }
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { validateFile, autoFixFile, patterns, inventory };
