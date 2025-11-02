#!/usr/bin/env node

/**
 * UBITS Validation Script
 * 
 * Valida que el código use tokens UBITS y componentes existentes
 * Ejecutar antes de commits: npm run validate
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
  // Colores hardcodeados
  hardcodedColors: [
    /#[0-9a-fA-F]{3,6}/gi,
    /rgb\([^)]+\)/gi,
    /rgba\([^)]+\)/gi,
    /hsl\([^)]+\)/gi,
    /hsla\([^)]+\)/gi,
    /\b(white|black|red|blue|green|yellow|gray|grey)\b/gi
  ],
  
  // Clases de tipografía prohibidas
  prohibitedTypography: inventory.tokens.typography.prohibitedClasses.map(c => new RegExp(`\\b${c}\\b`, 'g')),
  
  // Componentes custom cuando existen oficiales
  customButtons: /<button[^>]*(?!class="[^"]*ubits-button)[^>]*>/gi,
  customInputs: /<input[^>]*(?!class="[^"]*ubits-input)[^>]*>/gi
};

/**
 * Obtener archivos modificados en el staging area
 */
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return output.split('\n').filter(Boolean);
  } catch (error) {
    console.log(`${colors.yellow}⚠️  No es un repositorio Git o no hay archivos en staging${colors.reset}`);
    return [];
  }
}

/**
 * Obtener archivos modificados en el directorio de trabajo
 */
function getWorkingFiles(extensions = ['.ts', '.tsx', '.js', '.jsx', '.html', '.css']) {
  const files = [];
  const rootDir = path.join(__dirname, '..');
  
  function walkDir(dir, baseDir = rootDir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);
      
      // Ignorar node_modules, dist, .git
      if (entry.name.startsWith('.') || 
          entry.name === 'node_modules' || 
          entry.name === 'dist' ||
          entry.name === '.git') {
        continue;
      }
      
      if (entry.isDirectory()) {
        walkDir(fullPath, baseDir);
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  walkDir(rootDir);
  return files;
}

/**
 * Validar un archivo
 */
function validateFile(filePath) {
  const errors = [];
  const warnings = [];
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  
  // 1. Validar colores hardcodeados
  patterns.hardcodedColors.forEach((pattern, index) => {
    const matches = content.match(pattern);
    if (matches) {
      // Filtrar falsos positivos (comentarios, URLs, etc.)
      const realMatches = matches.filter(match => {
        const matchIndex = content.indexOf(match);
        const before = content.substring(Math.max(0, matchIndex - 50), matchIndex);
        // Ignorar si está en comentario, URL, o es parte de un token CSS
        return !before.includes('//') && 
               !before.includes('/*') && 
               !before.includes('http') &&
               !match.includes('var(--ubits-');
      });
      
      if (realMatches.length > 0) {
        errors.push({
          type: 'hardcoded-color',
          message: `Colores hardcodeados encontrados: ${realMatches.slice(0, 3).join(', ')}${realMatches.length > 3 ? '...' : ''}`,
          file: relativePath,
          count: realMatches.length
        });
      }
    }
  });
  
  // 2. Validar clases de tipografía prohibidas
  patterns.prohibitedTypography.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      errors.push({
        type: 'prohibited-typography',
        message: `Clase de tipografía prohibida encontrada: ${matches[0]}`,
        file: relativePath,
        count: matches.length
      });
    }
  });
  
  // 3. Validar uso de componentes existentes
  // Buscar si se está creando un componente custom cuando existe uno oficial
  const componentNames = Object.keys(inventory.components).map(key => 
    inventory.components[key].name.toLowerCase()
  );
  
  componentNames.forEach(compName => {
    // Buscar definiciones de componentes custom (simplificado)
    const customPattern = new RegExp(`class\\s+${compName}|function\\s+${compName}|const\\s+${compName}\\s*=`, 'gi');
    const matches = content.match(customPattern);
    if (matches && !filePath.includes(inventory.components[compName.replace(' ', '-')]?.path || '')) {
      warnings.push({
        type: 'custom-component',
        message: `Posible componente custom "${compName}" cuando existe componente oficial`,
        file: relativePath,
        suggestion: `Usar ${inventory.components[compName.replace(' ', '-')]?.provider || compName}`
      });
    }
  });
  
  // 4. Validar importaciones de CSS de componentes
  Object.values(inventory.components).forEach(comp => {
    if (content.includes(comp.provider) || content.includes(comp.globalFunction)) {
      const cssImport = comp.cssFile.split('/').pop();
      const cssPattern = new RegExp(`['"]\\.\\./.*${cssImport.replace('.css', '')}['"]`, 'gi');
      
      if (!cssPattern.test(content) && !content.includes(`packages/addons/${comp.package.split('/')[1]}`)) {
        warnings.push({
          type: 'missing-css',
          message: `Componente "${comp.name}" usado pero CSS no importado`,
          file: relativePath,
          suggestion: `Importar: ${comp.cssFile}`
        });
      }
    }
  });
  
  // 5. Validar que se usen tokens de color
  const hasColorUsage = content.includes('var(--ubits-') || content.includes('--ubits-');
  const hasHardcoded = patterns.hardcodedColors.some(p => {
    const matches = content.match(p);
    return matches && matches.length > 0;
  });
  
  if (hasHardcoded && !hasColorUsage && (filePath.endsWith('.css') || filePath.endsWith('.ts') || filePath.endsWith('.tsx'))) {
    warnings.push({
      type: 'no-tokens',
      message: 'No se detectó uso de tokens UBITS',
      file: relativePath,
      suggestion: 'Usar tokens: var(--ubits-fg-1-high), var(--ubits-bg-1), etc.'
    });
  }
  
  return { errors, warnings };
}

/**
 * Función principal
 */
function main() {
  console.log(`${colors.cyan}🔍 Validando código UBITS...${colors.reset}\n`);
  
  let totalErrors = 0;
  let totalWarnings = 0;
  const allErrors = [];
  const allWarnings = [];
  
  // Obtener archivos a validar
  const stagedFiles = getStagedFiles();
  const filesToValidate = stagedFiles.length > 0 ? stagedFiles : getWorkingFiles();
  
  // Filtrar solo archivos relevantes
  const relevantFiles = filesToValidate.filter(file => {
    const ext = path.extname(file);
    return ['.ts', '.tsx', '.js', '.jsx', '.html', '.css'].includes(ext) &&
           !file.includes('node_modules') &&
           !file.includes('dist') &&
           !file.includes('.ubits');
  });
  
  console.log(`${colors.blue}📁 Archivos a validar: ${relevantFiles.length}${colors.reset}\n`);
  
  // Validar cada archivo
  relevantFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    try {
      const { errors, warnings } = validateFile(file);
      allErrors.push(...errors);
      allWarnings.push(...warnings);
      totalErrors += errors.length;
      totalWarnings += warnings.length;
    } catch (error) {
      console.error(`${colors.red}❌ Error validando ${file}: ${error.message}${colors.reset}`);
    }
  });
  
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
    allErrors.forEach((err, idx) => {
      console.log(`${colors.red}  ${idx + 1}. ${err.file}${colors.reset}`);
      console.log(`     ${err.message}`);
      if (err.count) console.log(`     Encontrado ${err.count} vez(es)\n`);
    });
  }
  
  // Mostrar advertencias
  if (totalWarnings > 0) {
    console.log(`${colors.yellow}⚠️  ADVERTENCIAS (${totalWarnings}):${colors.reset}\n`);
    allWarnings.forEach((warn, idx) => {
      console.log(`${colors.yellow}  ${idx + 1}. ${warn.file}${colors.reset}`);
      console.log(`     ${warn.message}`);
      if (warn.suggestion) console.log(`     💡 Sugerencia: ${warn.suggestion}\n`);
    });
  }
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  
  // Salir con código de error si hay errores críticos
  if (totalErrors > 0) {
    console.log(`\n${colors.red}❌ Validación falló. Corrige los errores antes de continuar.${colors.reset}`);
    console.log(`${colors.yellow}💡 Usa: npm run validate:fix${colors.reset}\n`);
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

module.exports = { validateFile, patterns, inventory };

