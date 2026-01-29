#!/usr/bin/env node
/**
 * Script para extraer todos los tokens de Figma y generar código TypeScript
 * para el story de Storybook
 */

const fs = require('fs');
const path = require('path');

const FIGMA_TOKENS_JSON = path.resolve(__dirname, '../packages/tokens/figma-tokens.json');

function extractAllTokens(obj, prefix = '', result = []) {
	if (typeof obj === 'object' && obj !== null) {
		if (obj.$cssVar && obj.$value) {
			const pathParts = (obj.$path || prefix).split('.');
			const category = pathParts[0] || 'other';

			result.push({
				cssVar: obj.$cssVar,
				value: obj.$value,
				path: obj.$path || prefix,
				description: obj.$description || '',
				category: category,
			});
		}
		for (const key in obj) {
			if (
				key !== '$type' &&
				key !== '$description' &&
				key !== '$path' &&
				key !== '$cssVar' &&
				key !== '$schema' &&
				key !== 'metadata'
			) {
				extractAllTokens(obj[key], prefix ? `${prefix}.${key}` : key, result);
			}
		}
	}
	return result;
}

function main() {
	const tokensData = JSON.parse(fs.readFileSync(FIGMA_TOKENS_JSON, 'utf8'));

	const lightTokens = extractAllTokens(tokensData.light, 'light', []);
	const darkTokens = extractAllTokens(tokensData.dark, 'dark', []);

	// Combinar y eliminar duplicados (mismo cssVar)
	const allTokens = [];
	const seen = new Set();

	[...lightTokens, ...darkTokens].forEach((token) => {
		if (!seen.has(token.cssVar)) {
			seen.add(token.cssVar);
			allTokens.push(token);
		}
	});

	// Generar código TypeScript
	let code = 'const FIGMA_TOKENS: Array<{\n';
	code += '  cssVar: string;\n';
	code += '  value: string;\n';
	code += '  path: string;\n';
	code += '  description: string;\n';
	code += '  category: string;\n';
	code += '}> = [\n';

	// Agrupar por categoría para mejor organización
	const byCategory = {};
	allTokens.forEach((token) => {
		if (!byCategory[token.category]) {
			byCategory[token.category] = [];
		}
		byCategory[token.category].push(token);
	});

	Object.entries(byCategory).forEach(([category, tokens]) => {
		code += `  // ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
		tokens.forEach((token) => {
			const desc = token.description.replace(/'/g, "\\'").replace(/\n/g, ' ');
			code += `  { cssVar: '${token.cssVar}', value: '${token.value}', path: '${token.path}', description: '${desc}', category: '${token.category}' },\n`;
		});
	});

	code += '];\n';

	console.log(code);
	console.error(`\n✅ Total tokens: ${allTokens.length}`);
	console.error(`📁 Categorías: ${Object.keys(byCategory).length}`);
}

main();
