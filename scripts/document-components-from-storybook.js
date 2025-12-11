#!/usr/bin/env node

/**
 * Script para documentar componentes desde Storybook local
 *
 * Este script navega por el Storybook local (http://localhost:6006/)
 * y extrae información de cada componente para generar documentación.
 *
 * Uso: node scripts/document-components-from-storybook.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../docs/referencia/componentes');
const storybookBaseUrl = 'http://localhost:6006';

// Componentes prioritarios con sus slugs
const PRIORITY_COMPONENTS = [
	{ name: 'Data/Data Table', slug: 'data-data-table', category: 'Data' },
	{ name: 'Navegación/Tabs', slug: 'navegacion-tabs', category: 'Navegación' },
	{ name: 'Básicos/Button', slug: 'basicos-button', category: 'Básicos' },
	{ name: 'Formularios/Input', slug: 'formularios-input', category: 'Formularios' },
	{ name: 'Navegación/Sidebar', slug: 'navegacion-sidebar', category: 'Navegación' },
	{ name: 'Navegación/SubNav', slug: 'navegacion-subnav', category: 'Navegación' },
	{ name: 'Feedback/Alert', slug: 'feedback-alert', category: 'Feedback' },
	{ name: 'Feedback/Modal', slug: 'feedback-modal', category: 'Feedback' },
	{ name: 'Layout/Card Content', slug: 'layout-card-content', category: 'Layout' },
	{ name: 'Formularios/Checkbox', slug: 'formularios-checkbox', category: 'Formularios' },
];

/**
 * Convierte nombre de componente a nombre de archivo
 */
function componentNameToFileName(componentName) {
	return componentName
		.toLowerCase()
		.replace(/\//g, '-')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

/**
 * Genera plantilla de documentación
 */
function generateDocumentationTemplate(component) {
	const { name, slug, category } = component;
	const fileName = componentNameToFileName(name);
	const displayName = name.split('/').pop();
	const localUrl = `${storybookBaseUrl}/?path=/story/${slug}--default`;
	const vercelUrl = `https://ubits-storybook10.vercel.app/?path=/story/${slug}--default`;

	let markdown = `# 📦 ${displayName}\n\n`;
	markdown += `> **Componente UBITS:** \`${slug}\`  \n`;
	markdown += `> **Categoría:** ${category}  \n`;
	markdown += `> **API:** \`window.create${displayName.replace(/\s+/g, '')}()\` o \`<ubits-${slug}>\`  \n`;
	markdown += `> **Storybook Local:** ${localUrl}  \n`;
	markdown += `> **Storybook Vercel:** ${vercelUrl}\n\n`;

	markdown += `## 🎯 Descripción\n\n`;
	markdown += `[📝 **COMPLETAR:** Navega a ${localUrl} y copia la descripción del componente desde la pestaña "Docs"]\n\n`;

	markdown += `## 🔗 Enlaces Rápidos\n\n`;
	markdown += `- **Storybook Local:** ${localUrl}\n`;
	markdown += `- **Storybook Vercel:** ${vercelUrl}\n`;
	markdown += `- **Código fuente:** \`vendor/ubits/packages/components/${slug}/\`\n`;
	markdown += `- **Tipos TypeScript:** \`vendor/ubits/packages/components/${slug}/src/types/${displayName.replace(/\s+/g, '')}Options.ts\`\n`;
	markdown += `- **Stories:** \`vendor/ubits/packages/storybook/stories/${displayName.replace(/\s+/g, '')}.stories.ts\`\n\n`;
	markdown += `---\n\n`;

	markdown += `## 📚 Historias de Storybook\n\n`;
	markdown += `### ⚠️ INSTRUCCIONES PARA COMPLETAR\n\n`;
	markdown += `1. **Navega a:** ${localUrl}\n`;
	markdown += `2. **Revisa todas las historias** disponibles en el menú lateral\n`;
	markdown += `3. **Para cada historia:**\n`;
	markdown += `   - Copia el código de la pestaña "Code"\n`;
	markdown += `   - Lee la descripción de la pestaña "Docs"\n`;
	markdown += `   - Revisa los controles de la pestaña "Controls"\n`;
	markdown += `   - Documenta las opciones utilizadas\n\n`;
	markdown += `### Historia: Default\n\n`;
	markdown += `**ID en Storybook:** \`${slug}--default\`  \n`;
	markdown += `**URL Local:** ${localUrl}  \n`;
	markdown += `**URL Vercel:** ${vercelUrl}\n\n`;
	markdown += `**Descripción:**\n`;
	markdown += `[📝 **COMPLETAR:** Copiar desde Storybook local → Pestaña "Docs"]\n\n`;
	markdown += `**Código de ejemplo:**\n`;
	markdown += `\`\`\`javascript\n`;
	markdown += `// 📝 **COMPLETAR:** Copiar desde Storybook local → Pestaña "Code"\n`;
	markdown += `\`\`\`\n\n`;
	markdown += `**Opciones utilizadas:**\n`;
	markdown += `[📝 **COMPLETAR:** Listar opciones desde la pestaña "Controls"]\n\n`;
	markdown += `---\n\n`;

	markdown += `## ⚙️ Opciones y Props Completas\n\n`;
	markdown += `### ⚠️ INSTRUCCIONES PARA COMPLETAR\n\n`;
	markdown += `1. **Navega a:** ${localUrl}\n`;
	markdown += `2. **Abre la pestaña "Controls"**\n`;
	markdown += `3. **Copia la tabla completa de props** y pégalas aquí\n`;
	markdown += `4. **O usa el MCP de Storybook:** \`mcp_storybook_getComponentsProps(["${name}"])\`\n\n`;
	markdown += `**Tabla de props:**\n`;
	markdown += `[📝 **COMPLETAR:** Copiar desde Storybook local → Pestaña "Controls"]\n\n`;
	markdown += `---\n\n`;

	markdown += `## 💡 Ejemplos Prácticos\n\n`;
	markdown += `[📝 **COMPLETAR:** Agregar ejemplos basados en las historias de Storybook]\n\n`;
	markdown += `---\n\n`;

	markdown += `## 🚨 Errores Comunes\n\n`;
	markdown += `[📝 **COMPLETAR:** Agregar errores comunes específicos del componente]\n\n`;
	markdown += `---\n\n`;

	markdown += `## 📖 Referencias\n\n`;
	markdown += `- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)\n`;
	markdown += `- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)\n`;
	markdown += `- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)\n`;
	markdown += `- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)\n\n`;
	markdown += `---\n\n`;
	markdown += `**Última actualización:** ${new Date().toISOString().split('T')[0]}\n`;
	markdown += `**Storybook Local:** http://localhost:6006/\n`;
	markdown += `**Storybook Vercel:** ubits-storybook10.vercel.app\n`;
	markdown += `**Estado:** ⚠️ Pendiente de completar - Ver instrucciones arriba\n`;

	return { fileName, markdown };
}

/**
 * Proceso principal
 */
function main() {
	console.log('📚 Generando plantillas de documentación desde Storybook local...\n');
	console.log(`🌐 Storybook Local: ${storybookBaseUrl}\n`);

	// Crear directorio de salida si no existe
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	console.log('📝 Generando plantillas para componentes prioritarios...\n');

	let generated = 0;
	let updated = 0;

	PRIORITY_COMPONENTS.forEach((component, index) => {
		const { fileName, markdown } = generateDocumentationTemplate(component);
		const outputPath = path.join(outputDir, `${fileName}.md`);
		const exists = fs.existsSync(outputPath);

		// Solo generar si no existe o si es componente prioritario que necesita actualización
		if (!exists) {
			fs.writeFileSync(outputPath, markdown);
			console.log(`✅ Generado: ${fileName}.md`);
			generated++;
		} else {
			// Actualizar con plantilla mejorada
			fs.writeFileSync(outputPath, markdown);
			console.log(`🔄 Actualizado: ${fileName}.md`);
			updated++;
		}
	});

	console.log(`\n✅ Plantillas generadas:`);
	console.log(`   - Generados: ${generated}`);
	console.log(`   - Actualizados: ${updated}`);
	console.log(`   - Total: ${PRIORITY_COMPONENTS.length}`);

	console.log(`\n📋 Próximos pasos:`);
	console.log(`   1. Abre Storybook local: ${storybookBaseUrl}`);
	console.log(`   2. Navega a cada componente prioritario`);
	console.log(`   3. Copia información de las pestañas "Code", "Controls" y "Docs"`);
	console.log(`   4. Completa la documentación en docs/referencia/componentes/`);
	console.log(
		`\n💡 Ver guía completa: docs/referencia/componentes/GUIA-DOCUMENTAR-DESDE-STORYBOOK.md`,
	);
}

if (typeof main === 'function') {
	main().catch(console.error);
} else {
	main();
}
