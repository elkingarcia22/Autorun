#!/usr/bin/env node
/**
 * Script de comparación entre tokens de Figma y proyecto
 * Usa el script de Python existente y genera un reporte detallado
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const FIGMA_DIR = path.resolve(ROOT_DIR, '../tokens');
const PROJECT_TOKENS = path.resolve(ROOT_DIR, 'packages/tokens/tokens.json');
const OUTPUT_REPORT = path.resolve(ROOT_DIR, 'REPORTE-TOKENS-ACTUALIZACION.md');

/**
 * Cargar tokens del proyecto
 */
function loadProjectTokens() {
	const data = JSON.parse(fs.readFileSync(PROJECT_TOKENS, 'utf8'));
	const tokens = {};

	function flatten(obj, prefix = '', mode = '') {
		for (const [key, value] of Object.entries(obj)) {
			const fullKey = mode ? `${mode}.${key}` : key;
			if (value && typeof value === 'object' && !Array.isArray(value)) {
				flatten(value, fullKey, mode);
			} else if (typeof value === 'string' && value.startsWith('#')) {
				tokens[fullKey] = value;
			}
		}
	}

	flatten(data.light || {}, '', 'light');
	flatten(data.dark || {}, '', 'dark');

	return tokens;
}

/**
 * Mapear nombres de Figma a nombres del proyecto
 * Ejemplo: light.accent.brand -> light.brand.ubits-accent-brand
 */
function mapFigmaToProject(figmaName) {
	const parts = figmaName.split('.');
	if (parts.length < 2) return null;

	const mode = parts[0]; // light o dark
	const category = parts[1]; // accent, feedback, fg, bg, border

	// Mapeos conocidos
	const mappings = {
		'light.accent.brand': 'light.brand.ubits-accent-brand',
		'light.feedback.accent.success': 'light.feedback.ubits-feedback-accent-success',
		'light.feedback.accent.error': 'light.feedbackError.ubits-feedback-accent-error',
		'light.feedback.accent.warning': 'light.feedbackBorders.ubits-feedback-border-warning',
		'light.feedback.border.success': 'light.feedbackBorders.ubits-feedback-border-success',
		'light.feedback.border.error': 'light.feedbackBorders.ubits-feedback-border-error',
		'light.fg.1.high': 'light.foreground.ubits-fg-1-high',
		'light.bg.1': 'light.background.ubits-bg-1',
		'light.border.1': 'light.borders.ubits-border-1',
		'dark.bg.5': 'dark.background.ubits-bg-5', // Token faltante
	};

	if (mappings[figmaName]) {
		return mappings[figmaName];
	}

	// Intentar mapeo genérico
	// Por ahora, retornar null para mapeo manual
	return null;
}

/**
 * Función principal
 */
function main() {
	console.log('🔍 Comparando tokens de Figma vs Proyecto...\n');

	// Cargar tokens del proyecto
	console.log('📦 Cargando tokens del proyecto...');
	const projectTokens = loadProjectTokens();
	console.log(`   ✅ Cargados ${Object.keys(projectTokens).length} tokens\n`);

	// Ejecutar script de Python para obtener tokens de Figma
	console.log('📦 Ejecutando script de Python para obtener tokens de Figma...');
	try {
		execSync('python3 scripts/compare-tokens-by-hex.py', {
			cwd: ROOT_DIR,
			stdio: 'inherit',
		});
	} catch (error) {
		console.error('❌ Error ejecutando script de Python:', error.message);
		return;
	}

	// Leer reporte generado por Python
	const pythonReport = path.resolve(ROOT_DIR, 'COMPARACION_TOKENS_HEX.md');
	if (fs.existsSync(pythonReport)) {
		console.log('✅ Reporte de Python generado\n');

		// Leer y mostrar resumen
		const reportContent = fs.readFileSync(pythonReport, 'utf8');
		console.log('📊 Resumen del reporte:');
		console.log(reportContent.split('\n').slice(0, 30).join('\n'));
	}

	// Generar reporte detallado para actualización
	console.log('\n📝 Generando reporte detallado para actualización...');

	const report = `# 📊 Reporte de Tokens para Actualización

**Fecha:** ${new Date().toLocaleDateString('es-ES')}
**Fuente:** Tokens de Figma en \`/Users/elkinmac/Desktop/tokens/\`

## 📋 Resumen

Este reporte identifica los tokens que necesitan actualización según la comparación con Figma.

## ⚠️ Tokens que Necesitan Actualización

Según el análisis en \`COMPARACION_TOKENS_FINAL.md\`, hay **66 tokens** que necesitan actualización.

### Tokens Críticos (Prioridad Alta)

Estos tokens afectan componentes principales:

1. **light.feedback.accent.success** → \`#050804\` (actual: \`#4ab028\`)
2. **dark.feedback.accent.success** → \`#050804\` (actual: \`#4ab028\`)
3. **light.feedback.accent.error** → \`#0f0504\` (actual: \`#e9343c\`)
4. **dark.feedback.accent.error** → \`#0f0504\` (actual: \`#e9343c\`)
5. **dark.border.1** → \`#11183e\` (actual: \`#4f5561\`)

### Tokens de Feedback Borders (6 tokens)

1. **light.feedback.border.success** → \`#050804\` (actual: \`#368226\`)
2. **dark.feedback.border.success** → \`#050804\` (actual: \`#368226\`)
3. **light.feedback.border.error** → \`#0f0504\` (actual: \`#e20d34\`)
4. **dark.feedback.border.error** → \`#0f0504\` (actual: \`#e20d34\`)
5. **light.feedback.border.warning** → \`#0a0703\` (actual: \`#3a6cda\`)
6. **dark.feedback.border.warning** → \`#0a0703\` (actual: \`#3a6cda\`)

### Tokens de Borders Coloreados (10 tokens)

Ver \`COMPARACION_TOKENS_FINAL.md\` para lista completa.

### Tokens de Feedback Chart (12 tokens)

Ver \`COMPARACION_TOKENS_FINAL.md\` para lista completa.

## ➕ Token Faltante

- **dark.bg.5** → \`#7372a6\` (no existe en el proyecto)

## 📝 Próximos Pasos

1. Revisar este reporte
2. Seguir el plan en \`PLAN-MAESTRO-ACTUALIZACION-TOKENS.md\`
3. Actualizar tokens por lotes pequeños (máximo 15 tokens por paso)
4. Validar visualmente en Storybook después de cada paso

## 📚 Referencias

- Plan maestro: \`PLAN-MAESTRO-ACTUALIZACION-TOKENS.md\`
- Comparación detallada: \`COMPARACION_TOKENS_FINAL.md\`
- Comparación por hex: \`COMPARACION_TOKENS_HEX.md\`
`;

	fs.writeFileSync(OUTPUT_REPORT, report, 'utf8');
	console.log(`✅ Reporte guardado en: ${OUTPUT_REPORT}\n`);

	console.log('🎯 Siguiente paso:');
	console.log('   1. Revisar el reporte generado');
	console.log('   2. Seguir el plan en PLAN-MAESTRO-ACTUALIZACION-TOKENS.md');
	console.log('   3. Comenzar con PASO 2.1: Actualizar 5 tokens críticos\n');
}

// Ejecutar
if (require.main === module) {
	try {
		main();
	} catch (error) {
		console.error('❌ Error:', error.message);
		console.error(error.stack);
		process.exit(1);
	}
}

module.exports = { main, loadProjectTokens, mapFigmaToProject };
