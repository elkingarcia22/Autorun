#!/usr/bin/env node
/**
 * Script para agregar reglas [data-theme="dark"] a componentes migrados
 * Reemplaza tokens -light- con -dark- en dark mode
 */

const fs = require('fs');
const path = require('path');

// Componentes migrados que necesitan dark mode
const COMPONENTS = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'bar-metric-card',
  'breadcrumb',
  'button',
  'calendar',
  'csat-metric-card',
];

function fixDarkModeTokens(cssFile) {
  const content = fs.readFileSync(cssFile, 'utf8');
  
  // Buscar todos los tokens con -light- que se usan
  const lightTokenRegex = /var\((--modifiers-[^)]+-light-[^)]+)\)/g;
  const lightTokens = new Set();
  let match;
  
  while ((match = lightTokenRegex.exec(content)) !== null) {
    lightTokens.add(match[1]);
  }
  
  if (lightTokens.size === 0) {
    console.log(`  ⚠️  No se encontraron tokens -light- en ${cssFile}`);
    return false;
  }
  
  // Verificar si ya existe una regla [data-theme="dark"]
  const hasDarkRule = /\[data-theme="dark"\]/.test(content);
  
  // Crear mapeo de tokens light a dark
  const tokenMappings = [];
  lightTokens.forEach(lightToken => {
    const darkToken = lightToken.replace(/-light-/g, '-dark-');
    tokenMappings.push({ light: lightToken, dark: darkToken });
  });
  
  // Generar reglas CSS para dark mode
  const darkRules = tokenMappings.map(({ light, dark }) => {
    // Crear selector que reemplace el token light con dark
    // Necesitamos reemplazar todas las ocurrencias del token light con dark
    return `  ${light.replace(/^--/, '--')}: var(${dark});`;
  }).join('\n');
  
  // Si ya existe una regla [data-theme="dark"], agregar las reglas ahí
  // Si no, crear una nueva
  let newContent = content;
  
  if (hasDarkRule) {
    // Buscar la regla [data-theme="dark"] existente y agregar las nuevas reglas antes del cierre
    const darkRuleRegex = /(\[data-theme="dark"\]\s*\{[^}]*)(\})/s;
    const darkRuleMatch = content.match(darkRuleRegex);
    
    if (darkRuleMatch) {
      const before = darkRuleMatch[1];
      const after = darkRuleMatch[2];
      newContent = content.replace(
        darkRuleRegex,
        `${before}\n${darkRules}\n${after}`
      );
    } else {
      // Si no se puede encontrar, agregar al final del archivo
      newContent = content + `\n\n[data-theme="dark"] {\n${darkRules}\n}\n`;
    }
  } else {
    // Agregar nueva regla [data-theme="dark"] al final del archivo
    newContent = content + `\n\n/* ========================================\n   DARK MODE\n   ======================================== */\n\n[data-theme="dark"] {\n${darkRules}\n}\n`;
  }
  
  // Reemplazar todos los tokens -light- con -dark- dentro de [data-theme="dark"]
  // Pero solo dentro de la regla dark, no en todo el archivo
  const darkRuleContent = newContent.match(/\[data-theme="dark"\]\s*\{([^}]+)\}/s);
  if (darkRuleContent) {
    let darkContent = darkRuleContent[1];
    tokenMappings.forEach(({ light, dark }) => {
      // Reemplazar var(--token-light) con var(--token-dark) dentro de la regla dark
      const regex = new RegExp(`var\\(${light.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
      darkContent = darkContent.replace(regex, `var(${dark})`);
    });
    
    newContent = newContent.replace(
      /\[data-theme="dark"\]\s*\{[^}]+\}/s,
      `[data-theme="dark"] {\n${darkContent}\n}`
    );
  }
  
  fs.writeFileSync(cssFile, newContent, 'utf8');
  console.log(`  ✅ Agregadas ${tokenMappings.length} reglas dark mode en ${path.basename(cssFile)}`);
  return true;
}

// Procesar cada componente
console.log('🔧 Corrigiendo tokens de dark mode en componentes migrados...\n');

let fixedCount = 0;
COMPONENTS.forEach(component => {
  const cssFile = path.resolve(__dirname, '../../components', component, 'src/styles', `${component}.css`);
  
  if (fs.existsSync(cssFile)) {
    console.log(`📝 Procesando ${component}...`);
    if (fixDarkModeTokens(cssFile)) {
      fixedCount++;
    }
  } else {
    console.log(`  ⚠️  Archivo no encontrado: ${cssFile}`);
  }
});

console.log(`\n✅ Proceso completado: ${fixedCount} componentes corregidos`);

