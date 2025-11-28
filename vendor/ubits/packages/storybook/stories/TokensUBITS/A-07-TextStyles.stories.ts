/**
 * Tokens UBITS - Text Styles (Estilos de Texto Completos)
 * 
 * Estilos completos de texto que incluyen todas las propiedades tipograficas:
 * - Display (D1, D2, D3, D4) con regular, semibold, bold
 * - Heading (H1, H2) con regular, semibold, bold
 * - Body (lg, md, sm, xs) con regular, semibold, bold
 * 
 * Cada estilo incluye: fontfamily, fontweight, letterspacing, paragraphindent, textcase, textdecoration
 */

import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens UBITS/07. Text Styles',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Estilos completos de texto del sistema UBITS. Cada estilo incluye todas las propiedades tipograficas: font-family, font-weight, letter-spacing, paragraph-indent, text-case y text-decoration. Incluye Display (D1-D4), Heading (H1-H2) y Body (lg, md, sm, xs).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Obtiene el valor de un token CSS
 */
function getTokenValue(token: string): string {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  return value || 'N/A';
}

/**
 * Extrae tokens de display, heading y body del CSS
 */
function extractTextStyleTokens(): {
  display: Record<string, Record<string, string>>;
  heading: Record<string, Record<string, string>>;
  body: Record<string, Record<string, string>>;
} {
  const css = document.styleSheets;
  const allTokens: string[] = [];
  
  // Intentar leer desde figma-tokens.css
  try {
    const styleSheet = Array.from(css).find(sheet => {
      try {
        return sheet.href?.includes('figma-tokens.css') || false;
      } catch {
        return false;
      }
    });
    
    if (styleSheet) {
      const rules = Array.from(styleSheet.cssRules || []);
      rules.forEach(rule => {
        if (rule instanceof CSSStyleRule) {
          rule.style.cssText.split(';').forEach(decl => {
            const match = decl.match(/--[^:]+:/);
            if (match) {
              allTokens.push(match[0].replace(':', ''));
            }
          });
        }
      });
    }
  } catch (e) {
    // No se pudo leer tokens del CSS directamente
  }
  
  // Si no se pueden leer, usar lista predefinida basada en la estructura conocida
  const displayTokens: Record<string, Record<string, string>> = {};
  const headingTokens: Record<string, Record<string, string>> = {};
  const bodyTokens: Record<string, Record<string, string>> = {};
  
  // Generar tokens de display (D1-D4, regular/semibold/bold)
  ['d1', 'd2', 'd3', 'd4'].forEach(size => {
    ['regular', 'semibold', 'bold'].forEach(weight => {
      const key = `${size}-${weight}`;
      displayTokens[key] = {
        fontfamily: `--modifiers-normal-display-${size}-${weight}-fontfamily`,
        fontweight: `--modifiers-normal-display-${size}-${weight}-fontweight`,
        letterspacing: `--modifiers-normal-display-${size}-${weight}-letterspacing`,
        paragraphindent: `--modifiers-normal-display-${size}-${weight}-paragraphindent`,
        textcase: `--modifiers-normal-display-${size}-${weight}-textcase`,
        textdecoration: `--modifiers-normal-display-${size}-${weight}-textdecoration`,
      };
    });
  });
  
  // Generar tokens de heading (H1-H2) - No tienen variantes de peso, solo h1 y h2
  ['h1', 'h2'].forEach(size => {
    const key = size;
    headingTokens[key] = {
      fontfamily: `--modifiers-normal-heading-${size}-fontfamily`,
      fontweight: `--modifiers-normal-heading-${size}-fontweight`,
      lineheight: `--modifiers-normal-heading-${size}-lineheight`,
      letterspacing: `--modifiers-normal-heading-${size}-letterspacing`,
      paragraphindent: `--modifiers-normal-heading-${size}-paragraphindent`,
      textcase: `--modifiers-normal-heading-${size}-textcase`,
      textdecoration: `--modifiers-normal-heading-${size}-textdecoration`,
    };
  });
  
  // Generar tokens de body (lg/md/sm/xs, regular/semibold/bold)
  ['lg', 'md', 'sm', 'xs'].forEach(size => {
    ['regular', 'semibold', 'bold'].forEach(weight => {
      const key = `${size}-${weight}`;
      bodyTokens[key] = {
        fontfamily: `--modifiers-normal-body-${size}-${weight}-fontfamily`,
        fontweight: `--modifiers-normal-body-${size}-${weight}-fontweight`,
        letterspacing: `--modifiers-normal-body-${size}-${weight}-letterspacing`,
        paragraphindent: `--modifiers-normal-body-${size}-${weight}-paragraphindent`,
        textcase: `--modifiers-normal-body-${size}-${weight}-textcase`,
        textdecoration: `--modifiers-normal-body-${size}-${weight}-textdecoration`,
      };
    });
  });
  
  return { display: displayTokens, heading: headingTokens, body: bodyTokens };
}

/**
 * Crea una tabla para mostrar un estilo de texto completo
 */
function createTextStyleTable(
  styleName: string,
  tokens: Record<string, string>
): HTMLElement {
  const container = document.createElement('div');
  container.style.marginBottom = '24px';
  container.style.padding = '16px';
  container.style.backgroundColor = '#ffffff';
  container.style.border = '1px solid #e5e7eb';
  container.style.borderRadius = '8px';
  
  const title = document.createElement('h4');
  title.textContent = styleName;
  title.style.fontSize = '16px';
  title.style.fontWeight = '600';
  title.style.marginBottom = '12px';
  title.style.color = '#303a47';
  container.appendChild(title);
  
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  
  const properties = [
    { key: 'fontfamily', label: 'Font Family' },
    { key: 'fontweight', label: 'Font Weight' },
    { key: 'lineheight', label: 'Line Height' },
    { key: 'letterspacing', label: 'Letter Spacing' },
    { key: 'paragraphindent', label: 'Paragraph Indent' },
    { key: 'textcase', label: 'Text Case' },
    { key: 'textdecoration', label: 'Text Decoration' },
  ].filter(prop => tokens[prop.key]); // Solo mostrar propiedades que existen
  
  properties.forEach(prop => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #e5e7eb';
    
    const labelCell = document.createElement('td');
    labelCell.style.padding = '8px 12px';
    labelCell.style.fontSize = '14px';
    labelCell.style.fontWeight = '500';
    labelCell.style.color = '#303a47';
    labelCell.style.width = '180px';
    labelCell.textContent = prop.label;
    row.appendChild(labelCell);
    
    const tokenCell = document.createElement('td');
    tokenCell.style.padding = '8px 12px';
    tokenCell.style.fontFamily = 'monospace';
    tokenCell.style.fontSize = '12px';
    tokenCell.style.color = '#6b7280';
    tokenCell.textContent = tokens[prop.key] || 'N/A';
    row.appendChild(tokenCell);
    
    const valueCell = document.createElement('td');
    valueCell.style.padding = '8px 12px';
    valueCell.style.fontSize = '14px';
    valueCell.style.color = '#303a47';
    if (tokens[prop.key]) {
      const value = getTokenValue(tokens[prop.key]);
      valueCell.textContent = value;
    } else {
      valueCell.textContent = 'N/A';
    }
    row.appendChild(valueCell);
    
    table.appendChild(row);
  });
  
  container.appendChild(table);
  return container;
}

/**
 * Story principal - Todos los Text Styles
 */
export const TodosLosTextStyles: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Text Styles - Estilos Completos de Texto';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'Estilos completos de texto que incluyen todas las propiedades tipograficas: font-family, font-weight, letter-spacing, paragraph-indent, text-case y text-decoration.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);
    
    const { display, heading, body } = extractTextStyleTokens();
    
    // Sección Display
    const displaySection = document.createElement('div');
    displaySection.style.marginBottom = '40px';
    
    const displayTitle = document.createElement('h3');
    displayTitle.textContent = `Display (${Object.keys(display).length} estilos)`;
    displayTitle.style.fontSize = '20px';
    displayTitle.style.fontWeight = '600';
    displayTitle.style.marginBottom = '16px';
    displayTitle.style.paddingBottom = '8px';
    displayTitle.style.borderBottom = '2px solid #e5e7eb';
    displaySection.appendChild(displayTitle);
    
    Object.entries(display).forEach(([styleName, tokens]) => {
      displaySection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    container.appendChild(displaySection);
    
    // Sección Heading
    const headingSection = document.createElement('div');
    headingSection.style.marginBottom = '40px';
    
    const headingTitle = document.createElement('h3');
    headingTitle.textContent = `Heading (${Object.keys(heading).length} estilos)`;
    headingTitle.style.fontSize = '20px';
    headingTitle.style.fontWeight = '600';
    headingTitle.style.marginBottom = '16px';
    headingTitle.style.paddingBottom = '8px';
    headingTitle.style.borderBottom = '2px solid #e5e7eb';
    headingSection.appendChild(headingTitle);
    
    Object.entries(heading).forEach(([styleName, tokens]) => {
      headingSection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    container.appendChild(headingSection);
    
    // Sección Body
    const bodySection = document.createElement('div');
    bodySection.style.marginBottom = '40px';
    
    const bodyTitle = document.createElement('h3');
    bodyTitle.textContent = `Body (${Object.keys(body).length} estilos)`;
    bodyTitle.style.fontSize = '20px';
    bodyTitle.style.fontWeight = '600';
    bodyTitle.style.marginBottom = '16px';
    bodyTitle.style.paddingBottom = '8px';
    bodyTitle.style.borderBottom = '2px solid #e5e7eb';
    bodySection.appendChild(bodyTitle);
    
    Object.entries(body).forEach(([styleName, tokens]) => {
      bodySection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    container.appendChild(bodySection);
    
    return container;
  },
};

/**
 * Story - Display
 */
export const Display: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Display Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const { display } = extractTextStyleTokens();
    
    Object.entries(display).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    return container;
  },
};

/**
 * Story - Heading
 */
export const Heading: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Heading Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const { heading } = extractTextStyleTokens();
    
    Object.entries(heading).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    return container;
  },
};

/**
 * Story - Body
 */
export const Body: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Body Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const { body } = extractTextStyleTokens();
    
    Object.entries(body).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    return container;
  },
};

/**
 * Story - Uso Práctico: Text Styles Combinados
 * 
 * Muestra cómo aplicar los text styles combinados en CSS
 * aplicando los tokens individuales al mismo tiempo
 */
export const UsoPractico: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Uso Práctico: Text Styles Combinados';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const description = document.createElement('p');
    description.innerHTML = `
      <strong>Importante:</strong> No creamos tokens CSS nuevos combinados. 
      Aplicamos los tokens individuales de Figma al mismo tiempo en CSS.
      <br><br>
      Los text styles se construyen combinando:
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><code>font-size</code>: Token de Figma (ej: <code>--modifiers-normal-body-md-semibold-fontsize</code>)</li>
        <li><code>font-weight</code>: Token numérico UBITS (ej: <code>--weight-semibold, 600</code>)</li>
        <li><code>line-height</code>: Token de Figma (ej: <code>--modifiers-normal-body-md-semibold-lineheight</code>)</li>
      </ul>
    `;
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    description.style.padding = '16px';
    description.style.backgroundColor = '#f9fafb';
    description.style.border = '1px solid #e5e7eb';
    description.style.borderRadius = '8px';
    container.appendChild(description);
    
    // Text styles más usados
    const textStyles = [
      {
        name: 'Body MD Semibold',
        description: 'Usado en títulos de acordeones, botones (MD), labels importantes',
        css: `
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-md-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-md-semibold-lineheight);
        `.trim(),
        preview: 'Texto de ejemplo con Body MD Semibold'
      },
      {
        name: 'Body SM Semibold',
        description: 'Usado en badges, botones (SM, XS), labels pequeños',
        css: `
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-sm-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-sm-semibold-lineheight);
        `.trim(),
        preview: 'Texto de ejemplo con Body SM Semibold'
      },
      {
        name: 'Body MD Regular',
        description: 'Usado en párrafos, descripciones, contenido general',
        css: `
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-md-regular-fontsize);
font-weight: var(--weight-regular, 400);
line-height: var(--modifiers-normal-body-md-regular-lineheight);
        `.trim(),
        preview: 'Texto de ejemplo con Body MD Regular para párrafos y descripciones largas.'
      },
      {
        name: 'Body SM Regular',
        description: 'Usado en subheaders, helper text, metadatos',
        css: `
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-sm-regular-fontsize);
font-weight: var(--weight-regular, 400);
line-height: var(--modifiers-normal-body-sm-regular-lineheight);
        `.trim(),
        preview: 'Texto de ejemplo con Body SM Regular'
      },
      {
        name: 'Body XS Semibold',
        description: 'Usado en botones extra pequeños (XS)',
        css: `
font-family: var(--font-family-noto-sans-font-family);
font-size: var(--modifiers-normal-body-xs-semibold-fontsize);
font-weight: var(--weight-semibold, 600);
line-height: var(--modifiers-normal-body-xs-semibold-lineheight);
        `.trim(),
        preview: 'XS Semibold'
      }
    ];
    
    textStyles.forEach((style, index) => {
      const styleCard = document.createElement('div');
      styleCard.style.marginBottom = '32px';
      styleCard.style.padding = '20px';
      styleCard.style.border = '1px solid #e5e7eb';
      styleCard.style.borderRadius = '12px';
      styleCard.style.backgroundColor = '#ffffff';
      
      const styleName = document.createElement('h3');
      styleName.textContent = style.name;
      styleName.style.fontSize = '18px';
      styleName.style.fontWeight = '600';
      styleName.style.marginBottom = '8px';
      styleName.style.color = '#303a47';
      styleCard.appendChild(styleName);
      
      const styleDesc = document.createElement('p');
      styleDesc.textContent = style.description;
      styleDesc.style.fontSize = '14px';
      styleDesc.style.color = '#6b7280';
      styleDesc.style.marginBottom = '16px';
      styleCard.appendChild(styleDesc);
      
      // Preview
      const previewContainer = document.createElement('div');
      previewContainer.style.marginBottom = '16px';
      previewContainer.style.padding = '16px';
      previewContainer.style.backgroundColor = '#f9fafb';
      previewContainer.style.border = '1px solid #e5e7eb';
      previewContainer.style.borderRadius = '8px';
      
      const previewLabel = document.createElement('div');
      previewLabel.textContent = 'Preview:';
      previewLabel.style.fontSize = '12px';
      previewLabel.style.fontWeight = '600';
      previewLabel.style.color = '#6b7280';
      previewLabel.style.marginBottom = '8px';
      previewLabel.style.textTransform = 'uppercase';
      previewLabel.style.letterSpacing = '0.5px';
      previewContainer.appendChild(previewLabel);
      
      const preview = document.createElement('div');
      preview.textContent = style.preview;
      preview.style.fontFamily = 'var(--font-family-noto-sans-font-family)';
      preview.style.fontSize = 'var(--modifiers-normal-body-md-semibold-fontsize)';
      preview.style.fontWeight = 'var(--weight-semibold, 600)';
      preview.style.lineHeight = 'var(--modifiers-normal-body-md-semibold-lineheight)';
      preview.style.color = '#303a47';
      
      // Aplicar estilos específicos según el text style
      if (style.name.includes('SM')) {
        preview.style.fontSize = 'var(--modifiers-normal-body-sm-semibold-fontsize)';
        preview.style.lineHeight = 'var(--modifiers-normal-body-sm-semibold-lineheight)';
        if (style.name.includes('Regular')) {
          preview.style.fontWeight = 'var(--weight-regular, 400)';
        }
      } else if (style.name.includes('XS')) {
        preview.style.fontSize = 'var(--modifiers-normal-body-xs-semibold-fontsize)';
        preview.style.lineHeight = 'var(--modifiers-normal-body-xs-semibold-lineheight)';
      } else if (style.name.includes('Regular')) {
        preview.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize)';
        preview.style.fontWeight = 'var(--weight-regular, 400)';
        preview.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight)';
      }
      
      previewContainer.appendChild(preview);
      styleCard.appendChild(previewContainer);
      
      // CSS Code
      const codeLabel = document.createElement('div');
      codeLabel.textContent = 'CSS:';
      codeLabel.style.fontSize = '12px';
      codeLabel.style.fontWeight = '600';
      codeLabel.style.color = '#6b7280';
      codeLabel.style.marginBottom = '8px';
      codeLabel.style.textTransform = 'uppercase';
      codeLabel.style.letterSpacing = '0.5px';
      styleCard.appendChild(codeLabel);
      
      const codeBlock = document.createElement('pre');
      codeBlock.style.margin = '0';
      codeBlock.style.padding = '12px';
      codeBlock.style.backgroundColor = '#1e293b';
      codeBlock.style.borderRadius = '6px';
      codeBlock.style.overflow = 'auto';
      
      const code = document.createElement('code');
      code.textContent = style.css;
      code.style.fontFamily = 'monospace';
      code.style.fontSize = '13px';
      code.style.color = '#e2e8f0';
      code.style.lineHeight = '1.6';
      codeBlock.appendChild(code);
      styleCard.appendChild(codeBlock);
      
      container.appendChild(styleCard);
    });
    
    // Nota sobre font-weight
    const note = document.createElement('div');
    note.style.marginTop = '32px';
    note.style.padding = '16px';
    note.style.backgroundColor = '#fef3c7';
    note.style.border = '1px solid #fbbf24';
    note.style.borderRadius = '8px';
    note.innerHTML = `
      <strong>⚠️ Nota sobre font-weight:</strong><br>
      Los tokens de Figma devuelven strings ("Regular", "SemiBold", "Bold") en lugar de números.
      Por eso usamos tokens numéricos UBITS en <code>tokens-typography.css</code>:
      <ul style="margin-left: 20px; margin-top: 8px;">
        <li><code>--weight-regular: 400</code></li>
        <li><code>--weight-semibold: 600</code></li>
        <li><code>--weight-bold: 700</code></li>
      </ul>
      Estos tokens se usan junto con los tokens de Figma para construir los text styles completos.
    `;
    note.style.fontSize = '14px';
    note.style.color = '#92400e';
    note.style.lineHeight = '1.6';
    container.appendChild(note);
    
    return container;
  },
};

