/**
 * Tokens UBITS - Tipografía
 * 
 * Tokens de tipografía:
 * - Font Family
 * - Font Size
 * - Font Weight
 * - Line Height
 * - Letter Spacing
 */

import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens UBITS/05. Tipografía',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tokens de tipografía del sistema UBITS. Incluye font-family, font-size, font-weight, line-height y letter-spacing.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Tokens de tipografía organizados por categoría
const TYPOGRAPHY_TOKENS = {
  'font-family': [
    '--font-sans',
  ],
  'font-size': [
    '--font-d1-size',
    '--font-d2-size',
    '--font-d3-size',
    '--font-d4-size',
    '--font-h1-size',
    '--font-h2-size',
    '--font-body-lg-size',
    '--font-body-md-size',
    '--font-body-sm-size',
    '--font-body-xs-size',
  ],
  'font-weight': [
    '--weight-regular',
    '--weight-semibold',
    '--weight-bold',
  ],
  'line-height': [
    '--font-d1-line',
    '--font-d2-line',
    '--font-d3-line',
    '--font-d4-line',
    '--font-h1-line',
    '--font-h2-line',
    '--font-body-lg-line',
    '--font-body-md-line',
    '--font-body-sm-line',
    '--font-body-xs-line',
  ],
  'letter-spacing': [
    // Los tokens de letter-spacing están dentro de los estilos completos (Display, Heading, Body)
    // Ver sección "Text Styles" para ver letter-spacing junto con otros estilos
  ],
} as const;

/**
 * Obtiene el valor de un token CSS
 */
function getTokenValue(token: string): string {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  return value || 'N/A';
}

/**
 * Crea una fila de tabla para mostrar un token
 */
function createTokenRow(token: string, category: string): HTMLElement {
  const row = document.createElement('tr');
  row.style.borderBottom = '1px solid #e5e7eb';

  const tokenCell = document.createElement('td');
  tokenCell.style.padding = '12px';
  tokenCell.style.fontFamily = 'monospace';
  tokenCell.style.fontSize = '13px';
  tokenCell.style.color = '#303a47';
  tokenCell.textContent = token;
  row.appendChild(tokenCell);

  const valueCell = document.createElement('td');
  valueCell.style.padding = '12px';
  valueCell.style.fontSize = '14px';
  valueCell.style.color = '#6b7280';
  
  const value = getTokenValue(token);
  
  // Si es font-family, mostrar el valor completo
  if (category === 'font-family') {
    valueCell.textContent = value;
  } 
  // Si es font-size o line-height, mostrar con preview
  else if (category === 'font-size' || category === 'line-height') {
    const preview = document.createElement('span');
    preview.textContent = value;
    preview.style.marginRight = '12px';
    valueCell.appendChild(preview);
    
    if (category === 'font-size') {
      const sample = document.createElement('span');
      sample.textContent = 'Aa';
      sample.style.fontSize = value;
      sample.style.color = '#303a47';
      valueCell.appendChild(sample);
    }
  }
  // Si es font-weight, mostrar con preview
  else if (category === 'font-weight') {
    const preview = document.createElement('span');
    preview.textContent = value;
    preview.style.marginRight = '12px';
    valueCell.appendChild(preview);
    
    const sample = document.createElement('span');
    sample.textContent = 'Aa';
    sample.style.fontWeight = value;
    sample.style.color = '#303a47';
    valueCell.appendChild(sample);
  }
  else {
    valueCell.textContent = value;
  }
  
  row.appendChild(valueCell);

  return row;
}

/**
 * Story principal que muestra todos los tokens de tipografía
 */
export const TodosLosTokens: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Tipografía - Todos los Tokens';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const totalCount = Object.values(TYPOGRAPHY_TOKENS).reduce((sum, tokens) => sum + tokens.length, 0);
    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#f3f4f6';
    summary.style.border = '1px solid #d1d5db';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    summary.innerHTML = `
      <strong>Resumen:</strong><br>
      • Font Family: ${TYPOGRAPHY_TOKENS['font-family'].length} tokens<br>
      • Font Size: ${TYPOGRAPHY_TOKENS['font-size'].length} tokens<br>
      • Font Weight: ${TYPOGRAPHY_TOKENS['font-weight'].length} tokens<br>
      • Line Height: ${TYPOGRAPHY_TOKENS['line-height'].length} tokens<br>
      • Letter Spacing: ${TYPOGRAPHY_TOKENS['letter-spacing'].length} tokens<br>
      <strong>Total: ${totalCount} tokens</strong>
    `;
    container.appendChild(summary);

    // Renderizar cada categoría
    Object.entries(TYPOGRAPHY_TOKENS).forEach(([category, tokens]) => {
      if (tokens.length === 0) return;

      const section = document.createElement('div');
      section.style.marginBottom = '40px';

      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} (${tokens.length} tokens)`;
      sectionTitle.style.fontSize = '20px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '16px';
      sectionTitle.style.paddingBottom = '8px';
      sectionTitle.style.borderBottom = '2px solid #e5e7eb';
      section.appendChild(sectionTitle);

      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.backgroundColor = '#ffffff';
      table.style.border = '1px solid #e5e7eb';
      table.style.borderRadius = '8px';
      table.style.overflow = 'hidden';

      const thead = document.createElement('thead');
      thead.style.backgroundColor = '#f9fafb';
      const headerRow = document.createElement('tr');
      
      const tokenHeader = document.createElement('th');
      tokenHeader.textContent = 'Token';
      tokenHeader.style.padding = '12px';
      tokenHeader.style.textAlign = 'left';
      tokenHeader.style.fontSize = '14px';
      tokenHeader.style.fontWeight = '600';
      tokenHeader.style.color = '#303a47';
      tokenHeader.style.borderBottom = '2px solid #e5e7eb';
      headerRow.appendChild(tokenHeader);

      const valueHeader = document.createElement('th');
      valueHeader.textContent = 'Valor';
      valueHeader.style.padding = '12px';
      valueHeader.style.textAlign = 'left';
      valueHeader.style.fontSize = '14px';
      valueHeader.style.fontWeight = '600';
      valueHeader.style.color = '#303a47';
      valueHeader.style.borderBottom = '2px solid #e5e7eb';
      headerRow.appendChild(valueHeader);

      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      tokens.forEach(token => {
        tbody.appendChild(createTokenRow(token, category));
      });
      table.appendChild(tbody);

      section.appendChild(table);
      container.appendChild(section);
    });

    return container;
  },
};

/**
 * Story para Font Family
 */
export const FontFamily: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Font Family';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';

    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);

    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    TYPOGRAPHY_TOKENS['font-family'].forEach(token => {
      tbody.appendChild(createTokenRow(token, 'font-family'));
    });
    table.appendChild(tbody);

    container.appendChild(table);

    return container;
  },
};

/**
 * Story para Font Size
 */
export const FontSize: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Font Size';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';

    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);

    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    TYPOGRAPHY_TOKENS['font-size'].forEach(token => {
      tbody.appendChild(createTokenRow(token, 'font-size'));
    });
    table.appendChild(tbody);

    container.appendChild(table);

    return container;
  },
};

/**
 * Story para Font Weight
 */
export const FontWeight: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Font Weight';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';

    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);

    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    TYPOGRAPHY_TOKENS['font-weight'].forEach(token => {
      tbody.appendChild(createTokenRow(token, 'font-weight'));
    });
    table.appendChild(tbody);

    container.appendChild(table);

    return container;
  },
};

/**
 * Story para Line Height
 */
export const LineHeight: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Line Height';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';

    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);

    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    TYPOGRAPHY_TOKENS['line-height'].forEach(token => {
      tbody.appendChild(createTokenRow(token, 'line-height'));
    });
    table.appendChild(tbody);

    container.appendChild(table);

    return container;
  },
};

