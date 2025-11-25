#!/usr/bin/env node
/**
 * Genera código TypeScript para el story de Storybook
 * con TODOS los tokens de Figma
 */

const fs = require('fs');
const path = require('path');

const FIGMA_TOKENS_JSON = path.resolve(__dirname, '../packages/tokens/figma-tokens.json');
const OUTPUT_FILE = path.resolve(__dirname, '../packages/docs-site/stories/TokensFigma.stories.ts');

function main() {
  const tokensData = JSON.parse(fs.readFileSync(FIGMA_TOKENS_JSON, 'utf8'));
  const allTokens = tokensData.tokens || {};
  
  console.log(`📦 Generando story con ${Object.keys(allTokens).length} tokens...\n`);
  
  // Convertir a array y agrupar por categoría
  const tokensArray = [];
  const seen = new Set();
  
  for (const [key, token] of Object.entries(allTokens)) {
    // Evitar duplicados por CSS var
    if (seen.has(token.$cssVar)) continue;
    seen.add(token.$cssVar);
    
    const pathParts = token.$path.split('.');
    const category = pathParts[0] || 'other';
    
    tokensArray.push({
      cssVar: token.$cssVar,
      value: token.$value,
      path: token.$path,
      description: token.$description || '',
      category: category
    });
  }
  
  // Agrupar por categoría
  const byCategory = {};
  tokensArray.forEach(token => {
    if (!byCategory[token.category]) {
      byCategory[token.category] = [];
    }
    byCategory[token.category].push(token);
  });
  
  // Generar código TypeScript
  let code = `import type { Meta, StoryObj } from '@storybook/html';

// Todos los tokens de Figma - Generado automáticamente
// Total: ${tokensArray.length} tokens únicos
const FIGMA_TOKENS: Array<{
  cssVar: string;
  value: string;
  path: string;
  description: string;
  category: string;
}> = [
`;

  Object.entries(byCategory).forEach(([category, tokens]) => {
    code += `  // ${category.charAt(0).toUpperCase() + category.slice(1)} (${tokens.length} tokens)\n`;
    tokens.forEach(token => {
      const desc = (token.description || '').replace(/'/g, "\\'").replace(/\n/g, ' ').substring(0, 200);
      code += `  { cssVar: '${token.cssVar}', value: '${token.value}', path: '${token.path}', description: '${desc}', category: '${token.category}' },\n`;
    });
  });
  
  code += `];

const meta: Meta = {
  title: 'Tokens/Figma/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Todos los tokens de Figma con estructura, nomenclatura y agrupaciones preservadas. Total: ${tokensArray.length} tokens únicos.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

function extractFigmaTokens() {
  return FIGMA_TOKENS;
}

function groupTokensByCategory(tokens: ReturnType<typeof extractFigmaTokens>) {
  const grouped: Record<string, typeof tokens> = {};
  tokens.forEach(token => {
    const category = token.category || 'other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(token);
  });
  return grouped;
}

function swatch(token: { cssVar: string; value: string; path: string; description: string }, theme: 'light' | 'dark') {
  const root = document.documentElement;
  document.body.setAttribute('data-theme', theme);
  const value = getComputedStyle(root).getPropertyValue(token.cssVar).trim() || token.value;
  const isWhite = /^(#fff(f)?|rgb\\(255,\\s*255,\\s*255\\))$/i.test(value);
  const bg = isWhite
    ? 'repeating-conic-gradient(#eee 0% 25%, var(--ubits-bg-1) 0% 50%) 50%/12px 12px'
    : value;
  
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = '280px 1fr auto';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '12px';
  wrap.style.padding = '8px 12px';
  wrap.style.border = '1px solid #e5e7eb';
  wrap.style.borderRadius = '8px';
  wrap.style.fontSize = '13px';
  
  const nameEl = document.createElement('code');
  nameEl.textContent = token.cssVar;
  nameEl.style.fontSize = '12px';
  nameEl.style.color = 'var(--ubits-fg-1-high, #303a47)';
  
  const pathEl = document.createElement('div');
  pathEl.style.display = 'flex';
  pathEl.style.flexDirection = 'column';
  pathEl.style.gap = '4px';
  
  const pathLabel = document.createElement('span');
  pathLabel.textContent = token.path;
  pathLabel.style.fontSize = '11px';
  pathLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  pathLabel.style.fontFamily = 'monospace';
  
  if (token.description) {
    const descEl = document.createElement('span');
    descEl.textContent = token.description;
    descEl.style.fontSize = '11px';
    descEl.style.color = 'var(--ubits-fg-1-low, #9ca3af)';
    descEl.style.fontStyle = 'italic';
    pathEl.appendChild(descEl);
  }
  
  pathEl.appendChild(pathLabel);
  
  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.gap = '8px';
  right.style.alignItems = 'center';
  
  const box = document.createElement('div');
  box.style.height = '32px';
  box.style.width = '80px';
  box.style.borderRadius = '6px';
  box.style.border = '1px solid #9ca3af';
  box.style.background = bg;
  
  const val = document.createElement('code');
  val.textContent = value;
  val.style.fontSize = '11px';
  val.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  
  right.appendChild(box);
  right.appendChild(val);
  
  wrap.appendChild(nameEl);
  wrap.appendChild(pathEl);
  wrap.appendChild(right);
  
  return wrap;
}

function categorySection(category: string, tokens: ReturnType<typeof extractFigmaTokens>, theme: 'light' | 'dark') {
  const section = document.createElement('div');
  section.style.marginBottom = '24px';
  
  const title = document.createElement('h3');
  title.textContent = \`\${category.charAt(0).toUpperCase() + category.slice(1)} (\${tokens.length} tokens)\`;
  title.style.fontSize = '16px';
  title.style.fontWeight = '600';
  title.style.margin = '0 0 12px 0';
  title.style.color = 'var(--ubits-fg-1-high, #303a47)';
  section.appendChild(title);
  
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.gap = '8px';
  
  tokens.forEach(token => {
    container.appendChild(swatch(token, theme));
  });
  
  section.appendChild(container);
  return section;
}

export const LightAndDark: Story = {
  render: () => {
    const tokens = extractFigmaTokens();
    const grouped = groupTokensByCategory(tokens);
    
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '1fr 1fr';
    container.style.gap = '24px';
    container.style.padding = '16px';

    const lightCol = document.createElement('div');
    lightCol.style.background = '#ffffff';
    lightCol.style.border = '1px solid #e5e7eb';
    lightCol.style.borderRadius = '10px';
    lightCol.style.padding = '16px';
    
    const lightTitle = document.createElement('h2');
    lightTitle.textContent = 'Light Mode';
    lightTitle.style.fontSize = '20px';
    lightTitle.style.fontWeight = '700';
    lightTitle.style.margin = '0 0 16px 0';
    lightTitle.style.color = '#1a1a1a';
    lightCol.appendChild(lightTitle);

    const darkCol = document.createElement('div');
    darkCol.style.background = '#0E1825';
    darkCol.style.color = '#edeeef';
    darkCol.style.border = '1px solid #0E1825';
    darkCol.style.borderRadius = '10px';
    darkCol.style.padding = '16px';
    
    const darkTitle = document.createElement('h2');
    darkTitle.textContent = 'Dark Mode';
    darkTitle.style.fontSize = '20px';
    darkTitle.style.fontWeight = '700';
    darkTitle.style.margin = '0 0 16px 0';
    darkTitle.style.color = '#edeeef';
    darkCol.appendChild(darkTitle);

    Object.entries(grouped).forEach(([category, categoryTokens]) => {
      lightCol.appendChild(categorySection(category, categoryTokens, 'light'));
      darkCol.appendChild(categorySection(category, categoryTokens, 'dark'));
    });

    container.appendChild(lightCol);
    container.appendChild(darkCol);
    
    document.body.setAttribute('data-theme', 'light');
    
    return container;
  },
};

export const ByCategory: Story = {
  render: () => {
    const tokens = extractFigmaTokens();
    const grouped = groupTokensByCategory(tokens);
    
    const container = document.createElement('div');
    container.style.padding = '16px';
    container.style.maxWidth = '1200px';

    const title = document.createElement('h2');
    title.textContent = 'Tokens de Figma por Categoría';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.margin = '0 0 24px 0';
    title.style.color = 'var(--ubits-fg-1-high, #303a47)';
    container.appendChild(title);

    const info = document.createElement('div');
    info.style.background = 'var(--ubits-bg-2, #f9fafb)';
    info.style.padding = '16px';
    info.style.borderRadius = '8px';
    info.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    info.style.marginBottom = '24px';
    
    const infoText = document.createElement('p');
    infoText.innerHTML = \`
      <strong>📊 Total tokens:</strong> \${tokens.length}<br>
      <strong>📁 Categorías:</strong> \${Object.keys(grouped).length}<br>
      <strong>✅ Estructura preservada:</strong> Nombres, semántica, primitivos, nomenclatura, agrupaciones
    \`;
    infoText.style.margin = '0';
    infoText.style.fontSize = '14px';
    infoText.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    info.appendChild(infoText);
    container.appendChild(info);

    Object.entries(grouped).forEach(([category, categoryTokens]) => {
      container.appendChild(categorySection(category, categoryTokens, 'light'));
    });

    return container;
  },
};
`;

  fs.writeFileSync(OUTPUT_FILE, code, 'utf8');
  console.log(`✅ Story generado: ${OUTPUT_FILE}`);
  console.log(`   ${tokensArray.length} tokens incluidos`);
  console.log(`   ${Object.keys(byCategory).length} categorías\n`);
}

main();

