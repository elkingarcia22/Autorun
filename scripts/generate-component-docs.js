#!/usr/bin/env node

/**
 * Script para generar documentación de componentes desde archivos .stories.ts
 * 
 * Este script lee los archivos de stories y genera documentación markdown
 * con todas las historias, opciones y ejemplos de código.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storiesDir = path.join(__dirname, '../vendor/ubits/packages/storybook/stories');
const outputDir = path.join(__dirname, '../docs/referencia/componentes');

// Componentes prioritarios a documentar primero
const PRIORITY_COMPONENTS = [
  'DataTable',
  'Tabs',
  'Button',
  'Input',
  'Sidebar'
];

/**
 * Extrae información básica de un archivo .stories.ts
 */
function extractStoryInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const componentName = path.basename(filePath, '.stories.ts');
  
  // Extraer título del componente
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const title = titleMatch ? titleMatch[1] : componentName;
  
  // Extraer descripción
  const descMatch = content.match(/description:\s*{\s*component:\s*['"]([^'"]+)['"]/);
  const description = descMatch ? descMatch[1] : `Componente ${componentName} de UBITS`;
  
  // Extraer historias (export const ...)
  const storyMatches = content.matchAll(/export const (\w+):\s*Story\s*=/g);
  const stories = Array.from(storyMatches).map(match => match[1]);
  
  return {
    componentName,
    title,
    description,
    stories: stories.length > 0 ? stories : ['Default']
  };
}

/**
 * Genera markdown para un componente
 */
function generateMarkdown(componentInfo) {
  const { componentName, title, description, stories } = componentInfo;
  const kebabName = componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
  const storybookUrl = `https://ubits-storybook10.vercel.app/?path=/story/${kebabName}--default`;
  
  let markdown = `# 📦 ${componentName}\n\n`;
  markdown += `> **Componente UBITS:** \`${kebabName}\`  \n`;
  markdown += `> **API:** \`window.create${componentName}()\` o \`<ubits-${kebabName}>\`  \n`;
  markdown += `> **Storybook:** ${storybookUrl}\n\n`;
  markdown += `## 🎯 Descripción\n\n`;
  markdown += `${description}\n\n`;
  markdown += `## 🔗 Enlaces Rápidos\n\n`;
  markdown += `- **Storybook en Vercel:** ${storybookUrl}\n`;
  markdown += `- **Código fuente:** \`vendor/ubits/packages/components/${kebabName}/\`\n`;
  markdown += `- **Tipos TypeScript:** \`vendor/ubits/packages/components/${kebabName}/src/types/${componentName}Options.ts\`\n`;
  markdown += `- **Stories:** \`vendor/ubits/packages/storybook/stories/${componentName}.stories.ts\`\n\n`;
  markdown += `---\n\n`;
  markdown += `## 📚 Historias de Storybook\n\n`;
  
  // Agregar información de cada historia
  stories.forEach((storyName, index) => {
    const storyId = `${kebabName}--${storyName.toLowerCase()}`;
    const storyUrl = `https://ubits-storybook10.vercel.app/?path=/story/${storyId}`;
    
    markdown += `### Historia ${index + 1}: ${storyName}\n\n`;
    markdown += `**ID en Storybook:** \`${storyId}\`  \n`;
    markdown += `**URL:** ${storyUrl}\n\n`;
    markdown += `**Descripción:**\n`;
    markdown += `[Descripción de la historia - completar manualmente]\n\n`;
    markdown += `**Código de ejemplo:**\n`;
    markdown += `\`\`\`javascript\n`;
    markdown += `// Código de ejemplo - ver Storybook para código exacto\n`;
    markdown += `\`\`\`\n\n`;
    markdown += `---\n\n`;
  });
  
  markdown += `## ⚙️ Opciones y Props Completas\n\n`;
  markdown += `Ver archivo de tipos para opciones completas: \`vendor/ubits/packages/components/${kebabName}/src/types/${componentName}Options.ts\`\n\n`;
  markdown += `## 📖 Referencias\n\n`;
  markdown += `- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)\n`;
  markdown += `- [Guía de uso de componentes](../docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)\n\n`;
  markdown += `---\n\n`;
  markdown += `**Última actualización:** ${new Date().toISOString().split('T')[0]}\n`;
  markdown += `**Versión Storybook consultada:** ubits-storybook10.vercel.app\n`;
  
  return markdown;
}

/**
 * Proceso principal
 */
function main() {
  console.log('🔍 Generando documentación de componentes...\n');
  
  // Crear directorio de salida si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Leer todos los archivos .stories.ts
  const storyFiles = fs.readdirSync(storiesDir)
    .filter(file => file.endsWith('.stories.ts') && !file.includes('Template'))
    .sort((a, b) => {
      // Priorizar componentes importantes
      const aPriority = PRIORITY_COMPONENTS.indexOf(a.replace('.stories.ts', ''));
      const bPriority = PRIORITY_COMPONENTS.indexOf(b.replace('.stories.ts', ''));
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;
      return a.localeCompare(b);
    });
  
  console.log(`📚 Encontrados ${storyFiles.length} archivos de stories\n`);
  
  let generated = 0;
  let skipped = 0;
  
  storyFiles.forEach(file => {
    const filePath = path.join(storiesDir, file);
    const componentInfo = extractStoryInfo(filePath);
    const markdown = generateMarkdown(componentInfo);
    
    const outputPath = path.join(outputDir, `${componentInfo.componentName.toLowerCase()}.md`);
    
    // Solo generar si no existe o si es componente prioritario
    if (!fs.existsSync(outputPath) || PRIORITY_COMPONENTS.includes(componentInfo.componentName)) {
      fs.writeFileSync(outputPath, markdown);
      console.log(`✅ Generado: ${componentInfo.componentName}.md (${componentInfo.stories.length} historias)`);
      generated++;
    } else {
      console.log(`⏭️  Saltado: ${componentInfo.componentName}.md (ya existe)`);
      skipped++;
    }
  });
  
  console.log(`\n✅ Documentación generada:`);
  console.log(`   - Generados: ${generated}`);
  console.log(`   - Saltados: ${skipped}`);
  console.log(`   - Total: ${storyFiles.length}`);
  console.log(`\n📝 Nota: La documentación generada es un esqueleto.`);
  console.log(`   Completa manualmente con información detallada de cada historia.`);
}

main();

