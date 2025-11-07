import type { Meta, StoryObj } from '@storybook/html';

const SPACING_EXTENDED_TOKENS = [
  '--ubits-spacing-3xl',
  '--ubits-spacing-4xl',
  '--ubits-spacing-5xl',
  '--ubits-spacing-6xl',
] as const;

const meta: Meta = {
  title: 'Tokens/Spacing/Extended',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

function spacingItem(token: string) {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim() || '0';
  const pxValue = parseInt(value) || 0;
  
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = '300px 1fr';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '16px';
  wrap.style.padding = '12px 16px';
  wrap.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  wrap.style.borderRadius = '8px';
  wrap.style.background = 'var(--ubits-bg-1, #ffffff)';
  
  const nameEl = document.createElement('code');
  nameEl.textContent = token;
  nameEl.style.fontSize = '13px';
  nameEl.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  
  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.alignItems = 'center';
  right.style.gap = '12px';
  
  // Visual bar representing the spacing
  const bar = document.createElement('div');
  const maxWidth = 200;
  const scaleFactor = Math.min(1, maxWidth / Math.max(pxValue, 1));
  bar.style.width = `${pxValue * scaleFactor}px`;
  bar.style.height = '24px';
  bar.style.minWidth = pxValue === 0 ? '0px' : '4px';
  bar.style.background = 'var(--ubits-accent-brand-static-inverted, #2563eb)';
  bar.style.borderRadius = '4px';
  
  const val = document.createElement('code');
  val.textContent = value;
  val.style.fontSize = '13px';
  val.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  
  right.appendChild(bar);
  right.appendChild(val);
  
  wrap.appendChild(nameEl);
  wrap.appendChild(right);
  
  return wrap;
}

export const Tokens: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';

    SPACING_EXTENDED_TOKENS.forEach(t => {
      container.appendChild(spacingItem(t));
    });

    return container;
  },
};

