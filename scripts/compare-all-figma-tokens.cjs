#!/usr/bin/env node
/**
 * Script mejorado para comparar TODOS los tokens de color de Figma con el proyecto
 * Lee todos los archivos JSON de colores y resuelve referencias
 */

const fs = require('fs');
const path = require('path');

// Rutas absolutas
const WORKSPACE_ROOT = '/Users/elkinmac/Desktop/Autoframe';
const FIGMA_DIR = '/Users/elkinmac/Desktop/tokens';
const PROJECT_TOKENS = path.join(WORKSPACE_ROOT, 'packages/tokens/tokens.json');
const OUTPUT_REPORT = path.join(WORKSPACE_ROOT, 'COMPARACION_TODOS_TOKENS.md');

// Cargar p-colors primero para resolver referencias
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

// Resolver referencias como {pec.blue.44}
function resolveReference(ref, pColors) {
	if (!ref || typeof ref !== 'string') return null;

	if (ref.startsWith('#')) {
		return ref.toLowerCase();
	}

	if (ref.startsWith('{') && ref.endsWith('}')) {
		const key = ref.slice(1, -1);

		// Buscar exacto
		if (pColors[key]) {
			return pColors[key];
		}

		// Buscar por partes
		const parts = key.split('.');
		for (let i = parts.length; i > 0; i--) {
			const partial = parts.slice(-i).join('.');
			for (const [k, v] of Object.entries(pColors)) {
				if (k.endsWith(partial)) {
					return v;
				}
			}
		}
	}

	return null;
}

// Extraer todos los tokens de color de Figma
function extractAllFigmaColors() {
	const pColors = loadPColors();
	const allColors = {};

	// Leer s-colors (Light y Dark)
	const lightFile = path.join(FIGMA_DIR, 's-colors', 'Light Mode.json');
	const darkFile = path.join(FIGMA_DIR, 's-colors', 'Dark Mode.json');

	function extractFromFile(filePath, mode) {
		if (!fs.existsSync(filePath)) {
			console.warn(`⚠️  No se encontró ${filePath}`);
			return;
		}

		const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

		function extract(obj, prefix = '') {
			if (typeof obj === 'object' && obj !== null) {
				if (obj.$value) {
					const resolved = resolveReference(obj.$value, pColors);
					if (resolved) {
						const key = prefix || 'root';
						allColors[`${mode}.${key}`] = resolved;
					}
				}
				for (const key in obj) {
					if (key !== '$type' && key !== '$description') {
						const newPrefix = prefix ? `${prefix}.${key}` : key;
						extract(obj[key], newPrefix);
					}
				}
			}
		}

		if (data.color) {
			extract(data.color);
		} else {
			extract(data);
		}
	}

	extractFromFile(lightFile, 'light');
	extractFromFile(darkFile, 'dark');

	// Leer btn-tone (Brand, Error, Info, Success, Warning)
	const btnToneDir = path.join(FIGMA_DIR, 'btn-tone');
	if (fs.existsSync(btnToneDir)) {
		const files = fs.readdirSync(btnToneDir).filter((f) => f.endsWith('.json'));
		for (const file of files) {
			const filePath = path.join(btnToneDir, file);
			const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
			const tone = file.replace('.json', '').toLowerCase();

			function extract(obj, prefix = '') {
				if (typeof obj === 'object' && obj !== null) {
					if (obj.$value) {
						const resolved = resolveReference(obj.$value, pColors);
						if (resolved) {
							const key = prefix || 'root';
							allColors[`btn-tone.${tone}.${key}`] = resolved;
						}
					}
					for (const key in obj) {
						if (key !== '$type' && key !== '$description') {
							const newPrefix = prefix ? `${prefix}.${key}` : key;
							extract(obj[key], newPrefix);
						}
					}
				}
			}

			extract(data);
		}
	}

	return allColors;
}

// Extraer todos los tokens del proyecto
function extractProjectColors() {
	const data = JSON.parse(fs.readFileSync(PROJECT_TOKENS, 'utf8'));
	const colors = {};

	function extract(obj, prefix = '') {
		if (typeof obj === 'object' && obj !== null) {
			for (const key in obj) {
				const newPrefix = prefix ? `${prefix}.${key}` : key;
				if (typeof obj[key] === 'string' && obj[key].match(/^#[0-9a-fA-F]{6}$/i)) {
					colors[newPrefix] = obj[key].toLowerCase();
				} else {
					extract(obj[key], newPrefix);
				}
			}
		}
	}

	extract(data.light, 'light');
	extract(data.dark, 'dark');

	return colors;
}

// Calcular similitud entre nombres
function similarity(a, b) {
	const longer = a.length > b.length ? a : b;
	const shorter = a.length > b.length ? b : a;
	if (longer.length === 0) return 1.0;
	return (longer.length - editDistance(longer, shorter)) / longer.length;
}

function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();
	const costs = [];
	for (let i = 0; i <= s2.length; i++) {
		let lastValue = i;
		for (let j = 0; j <= s1.length; j++) {
			if (i === 0) costs[j] = j;
			else if (j > 0) {
				let newValue = costs[j - 1];
				if (s1.charAt(j - 1) !== s2.charAt(i - 1))
					newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
				costs[j - 1] = lastValue;
				lastValue = newValue;
			}
		}
		if (i > 0) costs[s1.length] = lastValue;
	}
	return costs[s1.length];
}

// Comparar tokens
function compareTokens() {
	console.log('📦 Cargando tokens...');
	const figmaColors = extractAllFigmaColors();
	const projectColors = extractProjectColors();

	console.log(`✅ Tokens de Figma: ${Object.keys(figmaColors).length}`);
	console.log(`✅ Tokens del Proyecto: ${Object.keys(projectColors).length}`);

	// Agrupar por valor hex
	const figmaByHex = {};
	const projectByHex = {};

	for (const [key, value] of Object.entries(figmaColors)) {
		if (!figmaByHex[value]) figmaByHex[value] = [];
		figmaByHex[value].push(key);
	}

	for (const [key, value] of Object.entries(projectColors)) {
		if (!projectByHex[value]) projectByHex[value] = [];
		projectByHex[value].push(key);
	}

	// Encontrar coincidencias y diferencias
	const exactMatches = [];
	const figmaOnly = [];
	const projectOnly = [];
	const differentValues = [];

	// Tokens de Figma que no están en el proyecto
	for (const [figmaKey, figmaValue] of Object.entries(figmaColors)) {
		let found = false;
		let bestMatch = null;
		let bestSimilarity = 0;

		for (const [projectKey, projectValue] of Object.entries(projectColors)) {
			const sim = similarity(figmaKey, projectKey);
			if (figmaValue === projectValue && sim > 0.5) {
				if (sim > bestSimilarity) {
					bestMatch = projectKey;
					bestSimilarity = sim;
				}
				found = true;
			}
		}

		if (found && bestMatch) {
			exactMatches.push({
				figma: figmaKey,
				project: bestMatch,
				value: figmaValue,
				similarity: bestSimilarity,
			});
		} else {
			// Buscar si existe el valor pero con nombre diferente
			const projectKeysWithSameValue = projectByHex[figmaValue] || [];
			if (projectKeysWithSameValue.length > 0) {
				differentValues.push({
					figma: figmaKey,
					figmaValue: figmaValue,
					project: projectKeysWithSameValue[0],
					projectValue: figmaValue,
					note: 'Mismo valor, nombre diferente',
				});
			} else {
				figmaOnly.push({ key: figmaKey, value: figmaValue });
			}
		}
	}

	// Tokens del proyecto que no están en Figma
	for (const [projectKey, projectValue] of Object.entries(projectColors)) {
		let found = false;
		for (const [figmaKey, figmaValue] of Object.entries(figmaColors)) {
			if (projectValue === figmaValue && similarity(projectKey, figmaKey) > 0.5) {
				found = true;
				break;
			}
		}
		if (!found) {
			projectOnly.push({ key: projectKey, value: projectValue });
		}
	}

	// Generar reporte
	let report = `# 📊 Comparación Completa de Tokens: Figma vs Proyecto\n\n`;
	report += `**Fecha:** ${new Date().toISOString()}\n\n`;
	report += `**Tokens de Figma:** ${Object.keys(figmaColors).length}\n`;
	report += `**Tokens del Proyecto:** ${Object.keys(projectColors).length}\n\n`;

	report += `## ✅ Coincidencias Exactas\n\n`;
	report += `Total: **${exactMatches.length}**\n\n`;
	exactMatches.sort((a, b) => b.similarity - a.similarity);
	exactMatches.slice(0, 30).forEach((match) => {
		report += `- \`${match.figma}\` ↔ \`${match.project}\` → \`${match.value}\` (similitud: ${(match.similarity * 100).toFixed(2)}%)\n`;
	});
	if (exactMatches.length > 30) {
		report += `\n... y ${exactMatches.length - 30} más\n`;
	}

	report += `\n## ⚠️ Tokens de Figma que Necesitan Actualización\n\n`;
	report += `Total: **${differentValues.length}**\n\n`;
	differentValues.slice(0, 50).forEach((item) => {
		report += `### \`${item.figma}\` ↔ \`${item.project}\`\n`;
		report += `- **Figma:** \`${item.figmaValue}\`\n`;
		report += `- **Proyecto:** \`${item.projectValue}\`\n`;
		report += `- **Nota:** ${item.note}\n\n`;
	});

	report += `\n## ➕ Tokens Solo en Figma (No en Proyecto)\n\n`;
	report += `Total: **${figmaOnly.length}**\n\n`;
	figmaOnly.slice(0, 30).forEach((item) => {
		report += `- \`${item.key}\` → \`${item.value}\`\n`;
	});

	report += `\n## ➖ Tokens Solo en Proyecto (No en Figma)\n\n`;
	report += `Total: **${projectOnly.length}**\n\n`;
	projectOnly.slice(0, 30).forEach((item) => {
		report += `- \`${item.key}\` → \`${item.value}\`\n`;
	});

	fs.writeFileSync(OUTPUT_REPORT, report, 'utf8');

	console.log('\n📊 Resultados:');
	console.log(`   ✅ Coincidencias exactas: ${exactMatches.length}`);
	console.log(`   ⚠️  Necesitan actualización: ${differentValues.length}`);
	console.log(`   ➕ Solo en Figma: ${figmaOnly.length}`);
	console.log(`   ➖ Solo en Proyecto: ${projectOnly.length}`);
	console.log(`\n✅ Reporte guardado en: ${OUTPUT_REPORT}`);
}

compareTokens();
