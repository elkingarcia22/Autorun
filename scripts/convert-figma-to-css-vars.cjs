#!/usr/bin/env node
/**
 * Script para convertir tokens de Figma a CSS variables
 * Preserva la estructura, nomenclatura, agrupaciones y semántica de Figma
 */

const fs = require('fs');
const path = require('path');

const FIGMA_DIR = '/Users/elkinmac/Desktop/tokens';
const WORKSPACE_ROOT = path.resolve(__dirname, '../..');
const OUTPUT_JSON = path.join(WORKSPACE_ROOT, 'packages', 'tokens', 'figma-tokens.json');
const OUTPUT_CSS = path.join(WORKSPACE_ROOT, 'packages', 'tokens', 'dist', 'figma-tokens.css');

// Cargar p-colors (primitivos)
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
				if (key !== '$type' && key !== '$description') {
					extract(obj[key], prefix ? `${prefix}.${key}` : key, colors);
				}
			}
		}
	}

	extract(data);
	return colors;
}

// Construir mapa completo de tokens desde un archivo JSON
function buildTokenMap(data, prefix = '', map = {}) {
	if (typeof data === 'object' && data !== null) {
		if (data.$value !== undefined) {
			map[prefix] = {
				value: data.$value,
				type: data.$type,
				description: data.$description || '',
				path: prefix,
			};
		}

		for (const key in data) {
			if (key !== '$type' && key !== '$description') {
				const newPrefix = prefix ? `${prefix}.${key}` : key;
				buildTokenMap(data[key], newPrefix, map);
			}
		}
	}

	return map;
}

// Resolver referencia recursivamente
function resolveReference(
	ref,
	tokenMap,
	pColors,
	visited = new Set(),
	depth = 0,
	originalKey = null,
) {
	if (depth > 50) {
		return null;
	}

	if (!ref || typeof ref !== 'string') return null;

	// Si ya es un hex, retornarlo
	if (ref.startsWith('#')) {
		return ref.toLowerCase();
	}

	// Si es una referencia {token.path}
	if (ref.startsWith('{') && ref.endsWith('}')) {
		const key = ref.slice(1, -1);

		// Detectar referencia circular (apunta a sí mismo)
		if (originalKey && key === originalKey) {
			// Buscar en p-colors usando el nombre del token
			const tokenName = key.split('.').pop();
			const resolved = searchInPColorsByTokenName(tokenName, key, pColors);
			return resolved;
		}

		// Evitar referencias circulares
		if (visited.has(key)) {
			const tokenName = key.split('.').pop();
			const resolved = searchInPColorsByTokenName(tokenName, key, pColors);
			return resolved;
		}

		visited.add(key);

		// Buscar en tokenMap
		let tokenValue = null;

		// 1. Buscar exacto
		if (tokenMap[key]) {
			tokenValue = tokenMap[key].value;
		}

		// 2. Si la referencia tiene "color.light." o "color.dark.", removerlo y buscar
		if (!tokenValue && key.startsWith('color.light.')) {
			const shortKey = key.replace('color.light.', 'color.');
			if (tokenMap[shortKey]) {
				tokenValue = tokenMap[shortKey].value;
			}
		}

		if (!tokenValue && key.startsWith('color.dark.')) {
			const shortKey = key.replace('color.dark.', 'color.');
			if (tokenMap[shortKey]) {
				tokenValue = tokenMap[shortKey].value;
			}
		}

		// Si encontramos un valor en tokenMap, resolverlo recursivamente
		if (tokenValue && tokenValue !== ref) {
			const resolved = resolveReference(
				tokenValue,
				tokenMap,
				pColors,
				visited,
				depth + 1,
				originalKey || key,
			);
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
				if (k.endsWith(partial)) {
					visited.delete(key);
					return v;
				}
			}
		}

		visited.delete(key);
	}

	return null;
}

// Buscar en p-colors usando el nombre del token
function searchInPColorsByTokenName(tokenName, fullPath, pColors) {
	const pathParts = fullPath.split('.');
	const lastPart = pathParts[pathParts.length - 1];
	const secondLastPart = pathParts[pathParts.length - 2];

	// Búsqueda especial para tokens conocidos
	const specialMappings = {
		'color.light.accent.brand': ['pec.blue.44', 'pec.blue.48'],
		'color.dark.accent.brand': ['pec.blue.44', 'pec.blue.48'],
		'color.accent.brand': ['pec.blue.44', 'pec.blue.48'],
		'color.light.feedback.accent.success': ['pec.green.44', 'pec.green.48'],
		'color.dark.feedback.accent.success': ['pec.green.44', 'pec.green.48'],
		'color.feedback.accent.success': ['pec.green.44', 'pec.green.48'],
		'color.light.feedback.accent.error': ['pec.red.44', 'pec.red.48'],
		'color.dark.feedback.accent.error': ['pec.red.44', 'pec.red.48'],
		'color.feedback.accent.error': ['pec.red.44', 'pec.red.48'],
		'color.light.feedback.accent.warning': ['pec.yellow.44', 'pec.yellow.48'],
		'color.dark.feedback.accent.warning': ['pec.yellow.44', 'pec.yellow.48'],
		'color.feedback.accent.warning': ['pec.yellow.44', 'pec.yellow.48'],
		'color.light.feedback.accent.info': ['pec.blue.44', 'pec.blue.48'],
		'color.dark.feedback.accent.info': ['pec.blue.44', 'pec.blue.48'],
		'color.feedback.accent.info': ['pec.blue.44', 'pec.blue.48'],
	};

	if (specialMappings[fullPath]) {
		for (const mapping of specialMappings[fullPath]) {
			if (pColors[mapping]) {
				return pColors[mapping];
			}
		}
	}

	const shortPath = fullPath.replace(/^color\.(light|dark)\./, 'color.');
	if (specialMappings[shortPath]) {
		for (const mapping of specialMappings[shortPath]) {
			if (pColors[mapping]) {
				return pColors[mapping];
			}
		}
	}

	const colorTypeMap = {
		brand: 'blue',
		success: 'green',
		error: 'red',
		warning: 'yellow',
		info: 'blue',
	};

	const colorType = colorTypeMap[lastPart] || colorTypeMap[secondLastPart];
	if (colorType) {
		for (const num of ['44', '48', '40', '50']) {
			const key = `pec.${colorType}.${num}`;
			if (pColors[key]) {
				return pColors[key];
			}
		}
	}

	return null;
}

// Convertir path de Figma a nombre de CSS variable
// Preserva la estructura completa: color.light.accent.brand -> --color-light-accent-brand
function figmaPathToCSSVar(path) {
	// Remover prefijo "color." si existe (ya que todos son colores)
	const cleanPath = path.replace(/^color\./, '');
	// Convertir puntos a guiones y agregar prefijo
	return `--${cleanPath.replace(/\./g, '-')}`;
}

// Procesar un archivo de tokens
function processTokenFile(filePath, pColors, allTokens, mode, basePath) {
	if (!fs.existsSync(filePath)) {
		return 0;
	}

	try {
		const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		const tokenMap = buildTokenMap(data);

		const fileRelPath = path.relative(FIGMA_DIR, filePath);
		console.log(`📄 Procesando ${fileRelPath}...`);
		console.log(`   Encontrados ${Object.keys(tokenMap).length} tokens en el archivo`);

		let resolved = 0;
		for (const [key, token] of Object.entries(tokenMap)) {
			const resolvedValue = resolveReference(token.value, tokenMap, pColors, new Set(), 0, key);
			if (resolvedValue) {
				const fullKey = basePath ? `${mode}.${basePath}.${key}` : `${mode}.${key}`;
				allTokens[fullKey] = {
					value: resolvedValue,
					type: token.type,
					description: token.description,
					path: basePath ? `${basePath}.${key}` : key,
					cssVar: figmaPathToCSSVar(basePath ? `${basePath}.${key}` : key),
				};
				resolved++;
			}
		}

		console.log(`   ✅ Resueltos ${resolved} tokens\n`);
		return resolved;
	} catch (error) {
		console.warn(`   ⚠️  Error procesando ${filePath}:`, error.message);
		return 0;
	}
}

// Extraer y resolver todos los tokens de Figma
function extractAndResolveFigmaTokens() {
	const pColors = loadPColors();
	const allTokens = {};
	let totalResolved = 0;

	console.log('📦 Cargando y resolviendo TODOS los tokens de Figma...\n');

	// Procesar s-colors (Light y Dark)
	const lightFile = path.join(FIGMA_DIR, 's-colors', 'Light Mode.json');
	const darkFile = path.join(FIGMA_DIR, 's-colors', 'Dark Mode.json');

	totalResolved += processTokenFile(lightFile, pColors, allTokens, 'light', 'color');
	totalResolved += processTokenFile(darkFile, pColors, allTokens, 'dark', 'color');

	// Procesar .modifiers (Normal, Inverted, Static, Static inverted)
	const modifiersDir = path.join(FIGMA_DIR, '.modifiers');
	if (fs.existsSync(modifiersDir)) {
		const modifierFiles = [
			{ file: 'Normal.json', path: 'modifiers.normal' },
			{ file: 'Inverted.json', path: 'modifiers.inverted' },
			{ file: 'Static.json', path: 'modifiers.static' },
			{ file: 'Static inverted.json', path: 'modifiers.static-inverted' },
		];

		modifierFiles.forEach(({ file, path: basePath }) => {
			const filePath = path.join(modifiersDir, file);
			totalResolved += processTokenFile(filePath, pColors, allTokens, 'light', basePath);
		});
	}

	// Procesar btn-tone
	const btnToneDir = path.join(FIGMA_DIR, 'btn-tone');
	if (fs.existsSync(btnToneDir)) {
		const files = fs.readdirSync(btnToneDir).filter((f) => f.endsWith('.json'));
		files.forEach((file) => {
			const filePath = path.join(btnToneDir, file);
			const baseName = file.replace('.json', '').toLowerCase();
			totalResolved += processTokenFile(
				filePath,
				pColors,
				allTokens,
				'light',
				`btn-tone.${baseName}`,
			);
		});
	}

	// Procesar button-tone
	const buttonToneDir = path.join(FIGMA_DIR, 'button-tone');
	if (fs.existsSync(buttonToneDir)) {
		const files = fs.readdirSync(buttonToneDir).filter((f) => f.endsWith('.json'));
		files.forEach((file) => {
			const filePath = path.join(buttonToneDir, file);
			const baseName = file.replace('.json', '').toLowerCase().replace(/\s+/g, '-');
			totalResolved += processTokenFile(
				filePath,
				pColors,
				allTokens,
				'light',
				`button-tone.${baseName}`,
			);
		});
	}

	console.log(`\n✅ Total tokens resueltos: ${totalResolved}`);
	console.log(`✅ Tokens únicos: ${Object.keys(allTokens).length}\n`);

	return allTokens;
}

// Generar JSON con estructura preservada
function generateJSON(tokens) {
	const output = {
		$schema: 'https://schemas.figma.com/tokens/v1',
		metadata: {
			description:
				'Tokens de Figma convertidos preservando estructura, nomenclatura y agrupaciones originales',
			totalTokens: Object.keys(tokens).length,
		},
		light: {},
		dark: {},
	};

	// Reconstruir estructura anidada
	for (const [key, token] of Object.entries(tokens)) {
		const [mode, ...pathParts] = key.split('.');
		const path = pathParts.join('.');

		let current = mode === 'light' ? output.light : output.dark;
		const parts = path.split('.');

		// Crear estructura anidada
		for (let i = 0; i < parts.length - 1; i++) {
			if (!current[parts[i]]) {
				current[parts[i]] = {};
			}
			current = current[parts[i]];
		}

		// Si ya existe un token en esta posición, crear un array o agregar sufijo único
		const lastPart = parts[parts.length - 1];
		if (current[lastPart] && typeof current[lastPart] === 'object' && current[lastPart].$cssVar) {
			// Ya existe un token aquí, crear un objeto con sufijo único basado en el path completo
			const uniqueKey = `${lastPart}_${path.replace(/\./g, '_')}`;
			current[uniqueKey] = {
				$type: token.type,
				$value: token.value,
				$description: token.description,
				$path: token.path,
				$cssVar: token.cssVar,
				$originalPath: key,
			};
		} else {
			current[lastPart] = {
				$type: token.type,
				$value: token.value,
				$description: token.description,
				$path: token.path,
				$cssVar: token.cssVar,
			};
		}
	}

	return output;
}

// Generar CSS preservando estructura en nombres
function generateCSS(tokens) {
	const lightVars = [];
	const darkVars = [];

	for (const [key, token] of Object.entries(tokens)) {
		const [mode] = key.split('.');
		const cssVar = token.cssVar;
		const value = token.value;

		if (mode === 'light') {
			lightVars.push(`  ${cssVar}: ${value};`);
		} else {
			darkVars.push(`  ${cssVar}: ${value};`);
		}
	}

	return `/* Tokens de Figma - Estructura preservada */
/* Generado automáticamente desde s-colors de Figma */
/* Preserva: nombres, semántica, primitivos, nomenclatura, estructura, agrupaciones */

:root {
${lightVars.join('\n')}
}

[data-theme="dark"] {
${darkVars.join('\n')}
}
`;
}

// Función principal
function main() {
	console.log('🚀 Convirtiendo tokens de Figma a CSS variables...\n');

	const tokens = extractAndResolveFigmaTokens();

	// Asegurar que el directorio existe
	const outputDir = path.dirname(OUTPUT_JSON);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}
	const cssDir = path.dirname(OUTPUT_CSS);
	if (!fs.existsSync(cssDir)) {
		fs.mkdirSync(cssDir, { recursive: true });
	}

	// Generar JSON con estructura preservada
	const jsonOutput = generateJSON(tokens);
	fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonOutput, null, 2), 'utf8');
	console.log(`✅ JSON generado: ${OUTPUT_JSON}`);
	console.log(`   Total tokens: ${Object.keys(tokens).length}`);

	// Generar CSS
	const cssOutput = generateCSS(tokens);
	fs.writeFileSync(OUTPUT_CSS, cssOutput, 'utf8');
	console.log(`✅ CSS generado: ${OUTPUT_CSS}`);

	// Mostrar ejemplos
	console.log('\n📋 Ejemplos de tokens convertidos:');
	const examples = Object.entries(tokens).slice(0, 5);
	examples.forEach(([key, token]) => {
		console.log(`   ${key}`);
		console.log(`     Path: ${token.path}`);
		console.log(`     CSS Var: ${token.cssVar}`);
		console.log(`     Value: ${token.value}`);
		console.log('');
	});

	console.log('✅ Conversión completada!');
}

main();
