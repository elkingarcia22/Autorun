import type { Meta, StoryObj } from '@storybook/html';

const BORDER_RADIUS_TOKENS = [
  '--ubits-border-radius-none',
  '--ubits-border-radius-xs',
  '--ubits-border-radius-sm',
  '--ubits-border-radius-md',
  '--ubits-border-radius-lg',
  '--ubits-border-radius-xl',
  '--ubits-border-radius-full',
] as const;

const meta: Meta = {
  title: 'Tokens/Border Radius',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

function borderRadiusItem(token: string) {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim() || '0';
  
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
  
  // Visual square with border radius applied
  const square = document.createElement('div');
  square.style.width = '48px';
  square.style.height = '48px';
  square.style.borderRadius = value;
  square.style.background = 'var(--ubits-accent-brand-static-inverted, #2563eb)';
  square.style.flexShrink = '0';
  
  const val = document.createElement('code');
  val.textContent = value;
  val.style.fontSize = '13px';
  val.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  
  right.appendChild(square);
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

    BORDER_RADIUS_TOKENS.forEach(t => {
      container.appendChild(borderRadiusItem(t));
    });

    return container;
  },
};



