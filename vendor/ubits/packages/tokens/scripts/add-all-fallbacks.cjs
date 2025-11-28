#!/usr/bin/env node

/**
 * Script para agregar fallbacks a TODOS los tokens migrados en button.css
 */

const fs = require('fs');
const path = require('path');

const buttonCssPath = path.resolve(__dirname, '../../components/button/src/styles/button.css');
let css = fs.readFileSync(buttonCssPath, 'utf8');

// Mapeo de tokens nuevos -> tokens antiguos -> valores hardcodeados
const fallbacks = {
  // Primary
  '--modifiers-normal-button-color-light-brand-primary-bg-default': ['--ubits-button-primary-bg-default', '#0c5bef'],
  '--modifiers-normal-button-color-light-brand-primary-bg-hover': ['--ubits-button-primary-hover', '#223a91'],
  '--modifiers-normal-button-color-light-brand-primary-bg-pressed': ['--ubits-button-primary-pressed', '#1e4abf'],
  
  // Secondary
  '--modifiers-normal-button-color-light-brand-secondary-bg-default': ['--ubits-btn-secondary-bg-default', '#202837'],
  '--modifiers-normal-button-color-light-brand-secondary-bg-hover': ['--ubits-btn-secondary-bg-hover', '#0e1825'],
  '--modifiers-normal-button-color-light-brand-secondary-bg-pressed': ['--ubits-btn-secondary-bg-pressed', '#0c121c'],
  '--modifiers-normal-button-color-light-brand-secondary-fg-default': ['--ubits-btn-secondary-fg-default', '#edeeef'],
  '--modifiers-normal-button-color-light-brand-secondary-border': ['--ubits-btn-secondary-border', '#4f5561'],
  
  // Tertiary
  '--modifiers-normal-button-color-light-brand-tertiary-fg': ['--ubits-btn-tertiary-fg', '#5c646f'],
  '--modifiers-normal-button-color-light-brand-tertiary-bg-hover': ['--ubits-btn-tertiary-bg-hover', 'rgba(231, 232, 234, 0.5)'],
  '--modifiers-normal-button-color-light-brand-tertiary-bg-pressed': ['--ubits-btn-tertiary-bg-pressed', 'rgba(231, 232, 234, 0.7)'],
  
  // Disabled
  '--modifiers-normal-color-light-bg-disabled': ['--ubits-bg-disabled-button', '#edeeef'],
  '--modifiers-normal-color-light-fg-on-disabled': ['--ubits-fg-on-disabled-button', '#828690'],
  '--modifiers-normal-color-light-border-disabled': ['--ubits-border-disabled-button', '#545a66'],
  
  // Otros
  '--modifiers-normal-color-light-bg-1': ['--ubits-bg-1', '#ffffff'],
  '--modifiers-normal-color-light-accent-brand': ['--ubits-accent-brand', '#0c5bef'],
  '--modifiers-normal-color-light-bg-active': ['--ubits-bg-active-button', 'rgba(12, 91, 239, 0.15)'],
  '--modifiers-normal-color-light-feedback-accent-error': ['--ubits-button-badge', '#cf0e34'],
};

let totalChanges = 0;

// Agregar fallbacks a cada token
Object.entries(fallbacks).forEach(([tokenNew, [tokenOld, hardcoded]]) => {
  // Buscar el token sin fallback (solo el token nuevo)
  const pattern = new RegExp(`var\\(${tokenNew.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
  const matches = css.match(pattern);
  
  if (matches) {
    const replacement = `var(${tokenNew}, var(${tokenOld}, ${hardcoded}))`;
    css = css.replace(pattern, replacement);
    totalChanges += matches.length;
    console.log(`✅ ${tokenNew}: ${matches.length} reemplazos`);
  }
});

// También buscar tokens que ya tienen un fallback pero no tienen el segundo
Object.entries(fallbacks).forEach(([tokenNew, [tokenOld, hardcoded]]) => {
  // Buscar var(tokenNew, algo) pero sin el segundo fallback
  const pattern = new RegExp(`var\\(${tokenNew.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')},([^,)]+)\\)`, 'g');
  const matches = [...css.matchAll(pattern)];
  
  matches.forEach(match => {
    const existingFallback = match[1].trim();
    // Si el fallback existente no es el token antiguo, agregarlo
    if (!existingFallback.includes(tokenOld)) {
      const newReplacement = `var(${tokenNew}, var(${tokenOld}, ${hardcoded}))`;
      css = css.replace(match[0], newReplacement);
      totalChanges++;
      console.log(`✅ ${tokenNew}: Agregado segundo fallback`);
    }
  });
});

// Escribir archivo
fs.writeFileSync(buttonCssPath, css, 'utf8');

console.log(`\n📊 Total cambios: ${totalChanges}`);
console.log(`✅ Archivo actualizado: ${buttonCssPath}`);

