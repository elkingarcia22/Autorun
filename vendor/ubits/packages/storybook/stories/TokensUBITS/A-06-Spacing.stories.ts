/**
 * Tokens UBITS - Spacing
 * 
 * Tokens de espaciado del sistema UBITS:
 * - Spacing básico (xs, sm, md, lg, xl, 2xl)
 * - Spacing extendido (valores numéricos)
 */

import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens UBITS/06. Spacing',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tokens de espaciado del sistema UBITS. Incluye valores básicos (xs, sm, md, lg, xl, 2xl) y valores extendidos (numéricos).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Tokens de espaciado básico (UBITS)
const SPACING_BASIC_TOKENS = [
  '--ubits-spacing-none',
  '--ubits-spacing-xs',
  '--ubits-spacing-sm',
  '--ubits-spacing-md',
  '--ubits-spacing-lg',
  '--ubits-spacing-xl',
  '--ubits-spacing-2xl',
] as const;

// Tokens de espaciado extendido (Figma - p-spacing-mode-1)
const SPACING_EXTENDED_TOKENS = [
  '--p-spacing-mode-1-space-0',
  '--p-spacing-mode-1-space-1',
  '--p-spacing-mode-1-space-2',
  '--p-spacing-mode-1-space-3',
  '--p-spacing-mode-1-space-4',
  '--p-spacing-mode-1-space-5',
  '--p-spacing-mode-1-space-6',
  '--p-spacing-mode-1-space-7',
  '--p-spacing-mode-1-space-8',
  '--p-spacing-mode-1-space-9',
  '--p-spacing-mode-1-space-10',
  '--p-spacing-mode-1-space-11',
  '--p-spacing-mode-1-space-12',
  '--p-spacing-mode-1-space-14',
  '--p-spacing-mode-1-space-16',
  '--p-spacing-mode-1-space-20',
  '--p-spacing-mode-1-space-24',
  '--p-spacing-mode-1-space-28',
  '--p-spacing-mode-1-space-32',
  '--p-spacing-mode-1-space-36',
  '--p-spacing-mode-1-space-40',
  '--p-spacing-mode-1-space-44',
  '--p-spacing-mode-1-space-48',
  '--p-spacing-mode-1-space-52',
  '--p-spacing-mode-1-space-56',
  '--p-spacing-mode-1-space-60',
  '--p-spacing-mode-1-space-64',
  '--p-spacing-mode-1-space-72',
  '--p-spacing-mode-1-space-80',
  '--p-spacing-mode-1-space-96',
] as const;

function createSpacingItem(token: string) {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim() || '0';
  
  // Para tokens Figma que son números sin px, necesitamos agregar px
  let pxValue: number;
  let displayValue: string;
  
  if (token.startsWith('--p-spacing-mode-1-')) {
    // Tokens Figma son números sin unidades
    const numValue = parseFloat(value) || 0;
    pxValue = numValue;
    displayValue = numValue > 0 ? `${numValue}px` : '0';
  } else {
    // Tokens UBITS ya tienen px
    pxValue = parseFloat(value) || 0;
    displayValue = value || '0';
  }
  
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = '300px 1fr';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '16px';
  wrap.style.padding = '12px 16px';
  wrap.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
  wrap.style.borderRadius = 'var(--ubits-border-radius-sm, 8px)';
  wrap.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  
  const nameEl = document.createElement('code');
  nameEl.textContent = token;
  nameEl.style.fontSize = '13px';
  nameEl.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
  nameEl.style.fontFamily = 'Monaco, Menlo, monospace';
  
  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.alignItems = 'center';
  right.style.gap = '12px';
  
  // Visual bar representing the spacing
  const bar = document.createElement('div');
  const maxWidth = 200;
  const scaleFactor = Math.min(1, maxWidth / Math.max(pxValue, 1));
  const barWidth = pxValue > 0 ? Math.max(pxValue * scaleFactor, 2) : 0;
  
  bar.style.width = `${barWidth}px`;
  bar.style.height = '24px';
  bar.style.background = 'var(--modifiers-normal-color-light-accent-brand)';
  bar.style.borderRadius = 'var(--ubits-border-radius-sm, 8px)';
  bar.style.minWidth = pxValue > 0 ? '2px' : '0';
  
  const valueEl = document.createElement('span');
  valueEl.textContent = displayValue;
  valueEl.style.fontSize = '13px';
  valueEl.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
  valueEl.style.fontFamily = 'Monaco, Menlo, monospace';
  valueEl.style.minWidth = '60px';
  valueEl.style.textAlign = 'right';
  
  right.appendChild(bar);
  right.appendChild(valueEl);
  
  wrap.appendChild(nameEl);
  wrap.appendChild(right);
  
  return wrap;
}

export const Basic: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.style.padding = '24px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    
    const title = document.createElement('h2');
    title.textContent = 'Spacing Básico (UBITS)';
    title.style.margin = '0 0 16px 0';
    title.style.fontSize = '18px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    
    container.appendChild(title);
    
    SPACING_BASIC_TOKENS.forEach(token => {
      container.appendChild(createSpacingItem(token));
    });
    
    return container;
  },
};

export const Extended: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.style.padding = '24px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    
    const title = document.createElement('h2');
    title.textContent = 'Spacing Extendido (Figma - p-spacing-mode-1)';
    title.style.margin = '0 0 16px 0';
    title.style.fontSize = '18px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    
    const note = document.createElement('p');
    note.textContent = 'Nota: Los tokens de Figma son valores numéricos sin unidades. Se muestran con "px" para referencia visual.';
    note.style.margin = '0 0 16px 0';
    note.style.fontSize = '13px';
    note.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    note.style.fontStyle = 'italic';
    
    container.appendChild(title);
    container.appendChild(note);
    
    SPACING_EXTENDED_TOKENS.forEach(token => {
      container.appendChild(createSpacingItem(token));
    });
    
    return container;
  },
};
