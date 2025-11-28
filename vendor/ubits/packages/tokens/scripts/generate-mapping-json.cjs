#!/usr/bin/env node

/**
 * Genera token-mapping.json desde token-mapping.ts
 * 
 * Este script lee el archivo TypeScript y genera un JSON
 * que puede ser usado por scripts CommonJS.
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo TS y extraer el mapeo
const mappingPath = path.resolve(__dirname, '../token-mapping.ts');
const content = fs.readFileSync(mappingPath, 'utf8');

// Extraer el array TOKEN_MAPPING usando regex
const arrayMatch = content.match(/export const TOKEN_MAPPING: TokenMapping\[\] = \[([\s\S]*?)\];/);

if (!arrayMatch) {
  console.error('❌ No se pudo extraer TOKEN_MAPPING del archivo TypeScript');
  process.exit(1);
}

// Parsear manualmente los objetos del array
const arrayContent = arrayMatch[1];
const mappings = [];

// Buscar objetos en el array
const objectRegex = /\{\s*old:\s*['"]([^'"]+)['"],\s*new:\s*['"]([^'"]+)['"],\s*category:\s*['"]([^'"]+)['"](?:,\s*notes:\s*['"]([^'"]*)['"])?\s*\}/g;

let match;
while ((match = objectRegex.exec(arrayContent)) !== null) {
  mappings.push({
    old: match[1],
    new: match[2],
    category: match[3],
    notes: match[4] || ''
  });
}

// Escribir JSON
const jsonPath = path.resolve(__dirname, '../token-mapping.json');
fs.writeFileSync(jsonPath, JSON.stringify(mappings, null, 2), 'utf8');

console.log(`✅ Generado token-mapping.json con ${mappings.length} mapeos`);

