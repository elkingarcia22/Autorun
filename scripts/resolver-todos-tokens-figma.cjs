#!/usr/bin/env node
/**
 * Script mejorado para resolver TODOS los tokens de Figma
 * Resuelve referencias circulares y anidadas correctamente
 */

const fs = require('fs');
const path = require('path');

const FIGMA_DIR = '/Users/elkinmac/Desktop/tokens';
const PROJECT_TOKENS = '/Users/elkinmac/Desktop/Autoframe/packages/tokens/tokens.json';
const OUTPUT_REPORT = '/Users/elkinmac/Desktop/Autoframe/COMPARACION_COMPLETA_TOKENS_FIGMA.md';

// Cargar p-colors primero
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
					extract(obj[key], prefix ? `${prefix}.${key}` : key);
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
			// Guardar el token con su ruta completa
			map[prefix] = {
				value: data.$value,
				type: data.$type,
				description: data.$description,
				path: prefix, // Guardar la ruta completa para referencia
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
		console.warn(`⚠️  Profundidad máxima alcanzada para: ${ref}`);
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
			// Referencia circular directa - buscar en p-colors usando el nombre del token y descripción
			const tokenInfo = tokenMap[originalKey];
			const tokenName = key.split('.').pop(); // Última parte del path
			const resolved = searchInPColorsByTokenName(tokenName, key, pColors, tokenInfo);
			if (resolved) {
				return resolved;
			}
			// No mostrar warning para no saturar la salida
			return null;
		}

		// Evitar referencias circulares
		if (visited.has(key)) {
			// Si es una referencia circular pero no directa, intentar buscar en p-colors
			const tokenInfo = tokenMap[key] || tokenMap[originalKey];
			const tokenName = key.split('.').pop();
			const resolved = searchInPColorsByTokenName(tokenName, key, pColors, tokenInfo);
			if (resolved) {
				return resolved;
			}
			// No mostrar warning para no saturar la salida
			return null;
		}

		visited.add(key);

		// Buscar en tokenMap - intentar diferentes variaciones de la clave
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

		// 3. Buscar sin el prefijo "color."
		if (!tokenValue && key.startsWith('color.')) {
			const shortKey = key.replace('color.', '');
			if (tokenMap[shortKey]) {
				tokenValue = tokenMap[shortKey].value;
			}
		}

		// 4. Buscar por coincidencia parcial (últimas partes de la ruta)
		if (!tokenValue) {
			const parts = key.split('.');
			// Intentar desde el final hacia atrás
			for (let i = parts.length; i > 0; i--) {
				const partial = parts.slice(-i).join('.');
				// Buscar tokens que terminen con esta parte
				for (const [mapKey, mapToken] of Object.entries(tokenMap)) {
					if (mapKey.endsWith('.' + partial) || mapKey === partial) {
						tokenValue = mapToken.value;
						break;
					}
				}
				if (tokenValue) break;
			}
		}

		// 5. Buscar por coincidencia de nombre (sin prefijos)
		if (!tokenValue) {
			const keyParts = key.split('.');
			const lastParts = keyParts.slice(-3); // Últimas 3 partes
			const searchKey = lastParts.join('.');
			for (const [mapKey, mapToken] of Object.entries(tokenMap)) {
				const mapParts = mapKey.split('.');
				const mapLastParts = mapParts.slice(-3);
				if (mapLastParts.join('.') === searchKey) {
					tokenValue = mapToken.value;
					break;
				}
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

// Buscar en p-colors usando el nombre del token y descripción
function searchInPColorsByTokenName(tokenName, fullPath, pColors, tokenInfo = null) {
	// Extraer partes relevantes del path
	const pathParts = fullPath.split('.');
	const lastPart = pathParts[pathParts.length - 1];
	const secondLastPart = pathParts[pathParts.length - 2];
	const thirdLastPart = pathParts[pathParts.length - 3];

	// Extraer información de la descripción si está disponible
	const description = tokenInfo?.description || '';

	// Buscar números en la descripción (ej: "blue 44 and 48")
	const numberMatches = description.match(/(\d+)/g);
	const colorMatches = description.match(
		/(blue|green|red|yellow|purple|pink|teal|rose|gray|indigo)/gi,
	);

	// Si la descripción menciona un color y números, buscar directamente
	if (colorMatches && numberMatches) {
		const colorType = colorMatches[0].toLowerCase();
		for (const num of numberMatches) {
			const key = `pec.${colorType}.${num}`;
			if (pColors[key]) {
				return pColors[key];
			}
		}
	}

	// Búsqueda especial para tokens conocidos basada en el path completo
	const specialMappings = {
		// Tokens de accent
		'color.light.accent.brand': ['pec.blue.44', 'pec.blue.48'],
		'color.dark.accent.brand': ['pec.blue.44', 'pec.blue.48'],
		'color.accent.brand': ['pec.blue.44', 'pec.blue.48'],
		// Tokens de feedback
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

	// Buscar mapeo especial primero
	if (specialMappings[fullPath]) {
		for (const mapping of specialMappings[fullPath]) {
			if (pColors[mapping]) {
				return pColors[mapping];
			}
		}
	}

	// Buscar sin el prefijo "color.light." o "color.dark."
	const shortPath = fullPath.replace(/^color\.(light|dark)\./, 'color.');
	if (specialMappings[shortPath]) {
		for (const mapping of specialMappings[shortPath]) {
			if (pColors[mapping]) {
				return pColors[mapping];
			}
		}
	}

	// Búsqueda genérica por nombre del token
	const searchPatterns = [lastPart, secondLastPart, thirdLastPart, `${secondLastPart}.${lastPart}`];

	// Buscar en p-colors por coincidencia parcial
	for (const pattern of searchPatterns) {
		if (!pattern) continue;

		for (const [pKey, pValue] of Object.entries(pColors)) {
			// Buscar coincidencias exactas o parciales
			if (
				pKey === pattern ||
				pKey.endsWith('.' + pattern) ||
				pKey.includes('.' + pattern + '.') ||
				pattern.includes(pKey.split('.').pop())
			) {
				return pValue;
			}
		}
	}

	// Búsqueda por tipo de color basada en el nombre
	const colorTypeMap = {
		brand: 'blue',
		success: 'green',
		error: 'red',
		warning: 'yellow',
		info: 'blue',
	};

	const colorType = colorTypeMap[lastPart] || colorTypeMap[secondLastPart];
	if (colorType) {
		// Buscar en p-colors por tipo de color (últimos valores: 44, 48)
		for (const num of ['44', '48', '40', '50']) {
			const key = `pec.${colorType}.${num}`;
			if (pColors[key]) {
				return pColors[key];
			}
		}
	}

	return null;
}

// Extraer y resolver todos los tokens de s-colors
function extractAndResolveFigmaTokens() {
	const pColors = loadPColors();
	const allTokens = {};

	console.log('📦 Cargando y resolviendo tokens de Figma...\n');

	// Procesar Light Mode
	const lightFile = path.join(FIGMA_DIR, 's-colors', 'Light Mode.json');
	if (fs.existsSync(lightFile)) {
		console.log('📄 Procesando s-colors/Light Mode.json...');
		const data = JSON.parse(fs.readFileSync(lightFile, 'utf8'));
		const tokenMap = buildTokenMap(data);

		console.log(`   Encontrados ${Object.keys(tokenMap).length} tokens en el archivo`);

		// Resolver cada token
		let resolved = 0;
		let unresolved = 0;
		for (const [key, token] of Object.entries(tokenMap)) {
			const resolvedValue = resolveReference(token.value, tokenMap, pColors, new Set(), 0, key);
			if (resolvedValue) {
				allTokens[`light.${key}`] = resolvedValue;
				resolved++;
			} else {
				unresolved++;
			}
		}

		if (unresolved > 0) {
			console.log(`   ⚠️  No resueltos: ${unresolved} tokens`);
		}

		console.log(`   ✅ Resueltos ${resolved} tokens\n`);
	}

	// Procesar Dark Mode
	const darkFile = path.join(FIGMA_DIR, 's-colors', 'Dark Mode.json');
	if (fs.existsSync(darkFile)) {
		console.log('📄 Procesando s-colors/Dark Mode.json...');
		const data = JSON.parse(fs.readFileSync(darkFile, 'utf8'));
		const tokenMap = buildTokenMap(data);

		console.log(`   Encontrados ${Object.keys(tokenMap).length} tokens en el archivo`);

		// Resolver cada token
		let resolved = 0;
		let unresolved = 0;
		for (const [key, token] of Object.entries(tokenMap)) {
			const resolvedValue = resolveReference(token.value, tokenMap, pColors, new Set(), 0, key);
			if (resolvedValue) {
				allTokens[`dark.${key}`] = resolvedValue;
				resolved++;
			} else {
				unresolved++;
			}
		}

		if (unresolved > 0) {
			console.log(`   ⚠️  No resueltos: ${unresolved} tokens`);
		}

		console.log(`   ✅ Resueltos ${resolved} tokens\n`);
	}

	return allTokens;
}

// Extraer tokens del proyecto
function extractProjectTokens() {
	const data = JSON.parse(fs.readFileSync(PROJECT_TOKENS, 'utf8'));
	const tokens = {};

	function extract(obj, prefix = '') {
		if (typeof obj === 'object' && obj !== null) {
			for (const key in obj) {
				const newPrefix = prefix ? `${prefix}.${key}` : key;
				if (typeof obj[key] === 'string' && obj[key].match(/^#[0-9a-fA-F]{6}$/i)) {
					tokens[newPrefix] = obj[key].toLowerCase();
				} else {
					extract(obj[key], newPrefix);
				}
			}
		}
	}

	extract(data.light, 'light');
	extract(data.dark, 'dark');

	return tokens;
}

// Comparar tokens
function compareTokens() {
	console.log('🔍 Comparando tokens...\n');

	const figmaTokens = extractAndResolveFigmaTokens();
	const projectTokens = extractProjectTokens();

	// Contar valores únicos
	const figmaUnique = new Set(Object.values(figmaTokens));
	const projectUnique = new Set(Object.values(projectTokens));

	console.log('📊 RESULTADOS:\n');
	console.log(`✅ Tokens en Figma (resueltos): ${Object.keys(figmaTokens).length}`);
	console.log(`   Valores únicos: ${figmaUnique.size}`);
	console.log(`\n✅ Tokens en Proyecto: ${Object.keys(projectTokens).length}`);
	console.log(`   Valores únicos: ${projectUnique.size}`);

	// Encontrar diferencias
	const missingInProject = [];
	const differentValues = [];
	const matchingTokens = [];

	// Comparar por valor hex (no por nombre, ya que los nombres pueden diferir)
	const figmaByValue = {};
	const projectByValue = {};

	for (const [key, value] of Object.entries(figmaTokens)) {
		if (!figmaByValue[value]) figmaByValue[value] = [];
		figmaByValue[value].push(key);
	}

	for (const [key, value] of Object.entries(projectTokens)) {
		if (!projectByValue[value]) projectByValue[value] = [];
		projectByValue[value].push(key);
	}

	// Encontrar valores que están en Figma pero no en proyecto
	for (const [value, figmaKeys] of Object.entries(figmaByValue)) {
		if (!projectByValue[value]) {
			missingInProject.push({
				value: value,
				figmaKeys: figmaKeys,
			});
		} else {
			matchingTokens.push({
				value: value,
				figmaKeys: figmaKeys,
				projectKeys: projectByValue[value],
			});
		}
	}

	// Encontrar valores que están en proyecto pero no en Figma
	const onlyInProject = [];
	for (const [value, projectKeys] of Object.entries(projectByValue)) {
		if (!figmaByValue[value]) {
			onlyInProject.push({
				value: value,
				projectKeys: projectKeys,
			});
		}
	}

	// Generar reporte
	let report = `# 📊 Comparación Completa: Tokens Figma vs Proyecto\n\n`;
	report += `**Fecha:** ${new Date().toISOString()}\n\n`;

	report += `## 📈 Resumen General\n\n`;
	report += `### Figma (s-colors resueltos)\n`;
	report += `- **Total tokens:** ${Object.keys(figmaTokens).length}\n`;
	report += `- **Valores únicos:** ${figmaUnique.size}\n\n`;

	report += `### Proyecto (tokens.json)\n`;
	report += `- **Total tokens:** ${Object.keys(projectTokens).length}\n`;
	report += `- **Valores únicos:** ${projectUnique.size}\n\n`;

	report += `### Coincidencias\n`;
	report += `- **Valores que coinciden:** ${matchingTokens.length}\n`;
	report += `- **Valores solo en Figma:** ${missingInProject.length}\n`;
	report += `- **Valores solo en Proyecto:** ${onlyInProject.length}\n\n`;

	if (missingInProject.length > 0) {
		report += `## ⚠️ Valores de Color en Figma que NO están en el Proyecto\n\n`;
		report += `Total: **${missingInProject.length}** valores únicos\n\n`;

		missingInProject.slice(0, 50).forEach((item, i) => {
			report += `### ${i + 1}. Color: \`${item.value}\`\n\n`;
			report += `**Tokens en Figma:**\n`;
			item.figmaKeys.forEach((key) => {
				report += `- \`${key}\`\n`;
			});
			report += `\n`;
		});

		if (missingInProject.length > 50) {
			report += `\n... y ${missingInProject.length - 50} valores más\n\n`;
		}
	}

	if (onlyInProject.length > 0) {
		report += `## ➕ Valores de Color Solo en el Proyecto (No en Figma)\n\n`;
		report += `Total: **${onlyInProject.length}** valores únicos\n\n`;

		onlyInProject.slice(0, 30).forEach((item, i) => {
			report += `### ${i + 1}. Color: \`${item.value}\`\n\n`;
			report += `**Tokens en Proyecto:**\n`;
			item.projectKeys.forEach((key) => {
				report += `- \`${key}\`\n`;
			});
			report += `\n`;
		});

		if (onlyInProject.length > 30) {
			report += `\n... y ${onlyInProject.length - 30} valores más\n\n`;
		}
	}

	report += `## ✅ Conclusión\n\n`;

	if (missingInProject.length === 0 && onlyInProject.length === 0) {
		report += `✅ **Todos los valores de color coinciden entre Figma y el Proyecto.**\n\n`;
	} else {
		report += `⚠️ **Hay diferencias entre Figma y el Proyecto.**\n\n`;
		report += `**Acción requerida:**\n`;
		if (missingInProject.length > 0) {
			report += `- Agregar ${missingInProject.length} valores de color que están en Figma pero no en el proyecto\n`;
		}
		if (onlyInProject.length > 0) {
			report += `- Revisar ${onlyInProject.length} valores de color que están en el proyecto pero no en Figma\n`;
		}
	}

	fs.writeFileSync(OUTPUT_REPORT, report, 'utf8');

	console.log(`\n✅ Reporte guardado en: ${OUTPUT_REPORT}`);
	console.log(`\n📋 Resumen:`);
	console.log(`   - Tokens en Figma: ${Object.keys(figmaTokens).length}`);
	console.log(`   - Tokens en Proyecto: ${Object.keys(projectTokens).length}`);
	console.log(`   - Valores únicos Figma: ${figmaUnique.size}`);
	console.log(`   - Valores únicos Proyecto: ${projectUnique.size}`);
	console.log(`   - Valores que coinciden: ${matchingTokens.length}`);
	console.log(`   - Valores solo en Figma: ${missingInProject.length}`);
	console.log(`   - Valores solo en Proyecto: ${onlyInProject.length}`);
}

compareTokens();
