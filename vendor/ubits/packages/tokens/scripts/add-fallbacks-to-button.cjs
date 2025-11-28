#!/usr/bin/env node

/**
 * Script para agregar fallbacks a todos los tokens migrados en button.css
 * 
 * Agrega fallbacks del tipo:
 * var(--token-nuevo, var(--token-antiguo, valor-hardcodeado))
 */

const fs = require('fs');
const path = require('path');

const mappingPath = path.resolve(__dirname, '../token-mapping.json');
const buttonCssPath = path.resolve(__dirname, '../../components/button/src/styles/button.css');

// Cargar mapeo
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
const mappingMap = {};
mapping.forEach(m => {
  mappingMap[m.new] = m.old;
});

// Cargar button.css
let css = fs.readFileSync(buttonCssPath, 'utf8');

// Valores hardcodeados como último fallback
const hardcodedValues = {
  '--modifiers-normal-button-color-light-brand-primary-bg-default': '#0c5bef',
  '--modifiers-normal-button-color-light-brand-primary-bg-hover': '#223a91',
  '--modifiers-normal-button-color-light-brand-primary-bg-pressed': '#1e4abf',
  '--modifiers-normal-button-color-light-brand-secondary-bg-default': '#202837',
  '--modifiers-normal-button-color-light-brand-secondary-bg-hover': '#0e1825',
  '--modifiers-normal-button-color-light-brand-secondary-bg-pressed': '#0c121c',
  '--modifiers-normal-button-color-light-brand-secondary-fg-default': '#edeeef',
  '--modifiers-normal-button-color-light-brand-secondary-border': '#4f5561',
  '--modifiers-normal-button-color-light-brand-tertiary-fg': '#5c646f',
  '--modifiers-normal-button-color-light-brand-tertiary-bg-hover': 'rgba(231, 232, 234, 0.5)',
  '--modifiers-normal-button-color-light-brand-tertiary-bg-pressed': 'rgba(231, 232, 234, 0.7)',
  '--modifiers-normal-color-light-bg-disabled': '#edeeef',
  '--modifiers-normal-color-light-fg-on-disabled': '#828690',
  '--modifiers-normal-color-light-border-disabled': '#545a66',
  '--modifiers-normal-color-light-bg-1': '#ffffff',
  '--modifiers-normal-color-light-accent-brand': '#0c5bef',
  '--modifiers-normal-color-light-bg-active': 'rgba(12, 91, 239, 0.15)',
  '--modifiers-normal-color-light-feedback-accent-error': '#cf0e34',
};

let changes = 0;

// Función para agregar fallback a un token
function addFallback(tokenNew, tokenOld, hardcoded) {
  // Buscar el token sin fallback
  const patterns = [
    // En var() sin fallback
    new RegExp(`var\\(${tokenNew.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
    // Directo sin fallback (dentro de var())
    new RegExp(`var\\(${tokenNew.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
  ];
  
  patterns.forEach(pattern => {
    const matches = css.match(pattern);
    if (matches) {
      let replacement;
      if (tokenOld && hardcoded) {
        replacement = `var(${tokenNew}, var(${tokenOld}, ${hardcoded}))`;
      } else if (tokenOld) {
        replacement = `var(${tokenNew}, var(${tokenOld}))`;
      } else if (hardcoded) {
        replacement = `var(${tokenNew}, ${hardcoded})`;
      } else {
        return; // No hay fallback disponible
      }
      
      css = css.replace(pattern, replacement);
      changes += matches.length;
    }
  });
}

// Agregar fallbacks a todos los tokens del mapeo
Object.entries(mappingMap).forEach(([tokenNew, tokenOld]) => {
  const hardcoded = hardcodedValues[tokenNew];
  addFallback(tokenNew, tokenOld, hardcoded);
});

// También agregar fallbacks a tokens que no están en el mapeo pero están en hardcodedValues
Object.keys(hardcodedValues).forEach(tokenNew => {
  if (!mappingMap[tokenNew]) {
    const hardcoded = hardcodedValues[tokenNew];
    addFallback(tokenNew, null, hardcoded);
  }
});

// Escribir archivo
fs.writeFileSync(buttonCssPath, css, 'utf8');

console.log(`✅ Fallbacks agregados: ${changes} reemplazos`);
console.log(`📝 Archivo actualizado: ${buttonCssPath}`);

