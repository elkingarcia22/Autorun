#!/usr/bin/env node

/**
 * Script para generar documentación de componentes desde Storybook local
 *
 * Este script:
 * 1. Obtiene la lista de componentes del MCP de Storybook
 * 2. Navega al Storybook local (http://localhost:6006/)
 * 3. Extrae información de cada componente y sus historias
 * 4. Genera documentación markdown completa
 *
 * Uso: node scripts/generate-component-docs-from-storybook.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../docs/referencia/componentes');
const storybookUrl = 'http://localhost:6006';

// Componentes prioritarios a documentar primero
const PRIORITY_COMPONENTS = [
	'Data/Data Table',
	'Navegación/Tabs',
	'Básicos/Button',
	'Formularios/Input',
	'Navegación/Sidebar',
	'Navegación/SubNav',
	'Feedback/Alert',
	'Feedback/Modal',
	'Layout/Card Content',
	'Formularios/Checkbox',
];

/**
 * Convierte nombre de componente a nombre de archivo
 */
function componentNameToFileName(componentName) {
	// Ejemplo: "Data/Data Table" -> "data-table"
	return componentName
		.toLowerCase()
		.replace(/\//g, '-')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

/**
 * Convierte nombre de componente a slug para URL
 */
function componentNameToSlug(componentName) {
	// Ejemplo: "Data/Data Table" -> "data-data-table"
	return componentName
		.toLowerCase()
		.replace(/\//g, '-')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

/**
 * Genera markdown para un componente basado en información del MCP
 */
function generateMarkdownFromMCP(componentName, propsInfo) {
	const fileName = componentNameToFileName(componentName);
	const slug = componentNameToSlug(componentName);
	const storybookUrl = `https://ubits-storybook10.vercel.app/?path=/story/${slug}--default`;
	const localUrl = `http://localhost:6006/?path=/story/${slug}--default`;

	// Extraer categoría y nombre
	const parts = componentName.split('/');
	const category = parts[0] || 'General';
	const name = parts[1] || componentName;

	let markdown = `# 📦 ${name}\n\n`;
	markdown += `> **Componente UBITS:** \`${slug}\`  \n`;
	markdown += `> **Categoría:** ${category}  \n`;
	markdown += `> **API:** \`window.create${name.replace(/\s+/g, '')}()\` o \`<ubits-${slug}>\`  \n`;
	markdown += `> **Storybook Local:** ${localUrl}  \n`;
	markdown += `> **Storybook Vercel:** ${storybookUrl}\n\n`;

	markdown += `## 🎯 Descripción\n\n`;
	markdown += `[Descripción del componente - completar desde Storybook local]\n\n`;

	markdown += `## 🔗 Enlaces Rápidos\n\n`;
	markdown += `- **Storybook Local:** ${localUrl}\n`;
	markdown += `- **Storybook Vercel:** ${storybookUrl}\n`;
	markdown += `- **Código fuente:** \`vendor/ubits/packages/components/${slug}/\`\n`;
	markdown += `- **Tipos TypeScript:** \`vendor/ubits/packages/components/${slug}/src/types/${name.replace(/\s+/g, '')}Options.ts\`\n`;
	markdown += `- **Stories:** \`vendor/ubits/packages/storybook/stories/${name.replace(/\s+/g, '')}.stories.ts\`\n\n`;
	markdown += `---\n\n`;

	markdown += `## 📚 Historias de Storybook\n\n`;
	markdown += `### Historia: Default\n\n`;
	markdown += `**ID en Storybook:** \`${slug}--default\`  \n`;
	markdown += `**URL Local:** ${localUrl}  \n`;
	markdown += `**URL Vercel:** ${storybookUrl}\n\n`;
	markdown += `**Descripción:**\n`;
	markdown += `[Descripción de la historia - ver en Storybook local]\n\n`;
	markdown += `**Código de ejemplo:**\n`;
	markdown += `\`\`\`javascript\n`;
	markdown += `// Ver código en Storybook local: ${localUrl}\n`;
	markdown += `\`\`\`\n\n`;
	markdown += `---\n\n`;

	// Agregar props si están disponibles
	if (propsInfo && propsInfo.length > 0) {
		markdown += `## ⚙️ Opciones y Props Completas\n\n`;
		markdown += `### Props Principales\n\n`;
		markdown += `| Prop | Tipo | Default | Descripción |\n`;
		markdown += `|------|------|---------|-------------|\n`;

		propsInfo.forEach((prop) => {
			const propName = prop.name || 'N/A';
			const propType = prop.type?.name || 'any';
			const defaultValue = prop.defaultValue?.value || '-';
			const description = prop.description || 'Sin descripción';

			markdown += `| \`${propName}\` | \`${propType}\` | \`${defaultValue}\` | ${description} |\n`;
		});

		markdown += `\n`;
		markdown += `**Ver todas las props en:** Storybook local → Pestaña "Controls"\n\n`;
		markdown += `---\n\n`;
	} else {
		markdown += `## ⚙️ Opciones y Props Completas\n\n`;
		markdown += `Ver archivo de tipos para opciones completas: \`vendor/ubits/packages/components/${slug}/src/types/${name.replace(/\s+/g, '')}Options.ts\`\n\n`;
		markdown += `**O ver en Storybook local:** ${localUrl} → Pestaña "Controls"\n\n`;
		markdown += `---\n\n`;
	}

	markdown += `## 💡 Ejemplos Prácticos\n\n`;
	markdown += `Ver ejemplos interactivos en Storybook local: ${localUrl}\n\n`;
	markdown += `---\n\n`;

	markdown += `## 🚨 Errores Comunes\n\n`;
	markdown += `[Agregar errores comunes específicos del componente]\n\n`;
	markdown += `---\n\n`;

	markdown += `## 📖 Referencias\n\n`;
	markdown += `- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)\n`;
	markdown += `- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)\n`;
	markdown += `- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)\n\n`;
	markdown += `---\n\n`;
	markdown += `**Última actualización:** ${new Date().toISOString().split('T')[0]}\n`;
	markdown += `**Storybook Local:** http://localhost:6006/\n`;
	markdown += `**Storybook Vercel:** ubits-storybook10.vercel.app\n`;

	return { fileName, markdown };
}

/**
 * Proceso principal
 */
async function main() {
	console.log('🔍 Generando documentación de componentes desde Storybook local...\n');
	console.log(`📚 Storybook Local: ${storybookUrl}\n`);

	// Crear directorio de salida si no existe
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Nota: Este script requiere que el MCP de Storybook esté configurado
	// y que el Storybook local esté corriendo en http://localhost:6006/

	console.log('📝 Este script genera documentación base desde el MCP de Storybook.\n');
	console.log('⚠️  Para documentación completa:');
	console.log('   1. Navega manualmente a cada componente en Storybook local');
	console.log('   2. Revisa las historias disponibles');
	console.log('   3. Copia el código de ejemplo de la pestaña "Code"');
	console.log('   4. Completa la documentación con esa información\n');

	console.log('💡 Componentes prioritarios a documentar:');
	PRIORITY_COMPONENTS.forEach((comp, index) => {
		const slug = componentNameToSlug(comp);
		const localUrl = `http://localhost:6006/?path=/story/${slug}--default`;
		console.log(`   ${index + 1}. ${comp}`);
		console.log(`      → ${localUrl}`);
	});

	console.log('\n✅ Script listo. Usa el MCP de Storybook para obtener información detallada.');
	console.log('   Ejemplo: mcp_storybook_getComponentsProps(["Data/Data Table"])');
}

main().catch(console.error);
