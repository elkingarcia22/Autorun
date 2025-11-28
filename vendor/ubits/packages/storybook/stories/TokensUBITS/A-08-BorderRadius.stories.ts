/**
 * Tokens UBITS - Border Radius
 * 
 * Tokens de border-radius del sistema UBITS.
 */

import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens UBITS/08. Border Radius',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tokens de border-radius del sistema UBITS. Incluye valores desde none hasta full (circulo completo).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const BORDER_RADIUS_TOKENS = [
  '--ubits-border-radius-none',
  '--ubits-border-radius-xs',
  '--ubits-border-radius-sm',
  '--ubits-border-radius-md',
  '--ubits-border-radius-lg',
  '--ubits-border-radius-xl',
  '--ubits-border-radius-full',
] as const;

function borderRadiusItem(token: string) {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim();

  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = '300px 1fr';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '16px';
  wrap.style.padding = '12px 16px';
  wrap.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
  wrap.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
  wrap.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  wrap.style.fontFamily = 'var(--modifiers-normal-body-md-regular-fontfamily)';
  wrap.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';

  const nameEl = document.createElement('code');
  nameEl.textContent = token;
  nameEl.style.fontSize = '13px';
  nameEl.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';

  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.alignItems = 'center';
  right.style.gap = '12px';

  // Visual box representing the border-radius
  const box = document.createElement('div');
  const pxValue = parseInt(value) || 0;
  box.style.width = '80px';
  box.style.height = '80px';
  box.style.borderRadius = value || '0';
  box.style.background = 'var(--modifiers-normal-color-light-accent-brand)';
  box.style.border = '2px solid var(--modifiers-normal-color-light-border-1)';
  box.style.display = 'flex';
  box.style.alignItems = 'center';
  box.style.justifyContent = 'center';
  box.style.flexShrink = '0';

  const valueEl = document.createElement('span');
  valueEl.textContent = value || '0';
  valueEl.style.fontSize = '14px';
  valueEl.style.fontWeight = 'var(--weight-semibold, 600)';

  right.appendChild(box);
  right.appendChild(valueEl);
  wrap.appendChild(nameEl);
  wrap.appendChild(right);

  return wrap;
}

export const TodosLosBorderRadius: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';

    const title = document.createElement('h3');
    title.textContent = 'Border Radius - Todos los Tokens';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    title.style.fontFamily = 'var(--modifiers-normal-heading-h3-fontfamily)';
    title.style.fontSize = 'var(--modifiers-normal-heading-h3-fontsize)';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    BORDER_RADIUS_TOKENS.forEach(token => {
      container.appendChild(borderRadiusItem(token));
    });

    return container;
  },
};

export const EjemplosDeUso: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '24px';
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';

    const title = document.createElement('h3');
    title.textContent = 'Ejemplos de Uso';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    title.style.fontFamily = 'var(--modifiers-normal-heading-h3-fontfamily)';
    title.style.fontSize = 'var(--modifiers-normal-heading-h3-fontsize)';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const examples = [
      { token: '--ubits-border-radius-none', label: 'Sin borde redondeado', use: 'Elementos con esquinas rectas' },
      { token: '--ubits-border-radius-xs', label: 'Extra pequeño (4px)', use: 'Elementos pequeños, badges' },
      { token: '--ubits-border-radius-sm', label: 'Pequeño (8px)', use: 'Botones pequeños, inputs' },
      { token: '--ubits-border-radius-md', label: 'Mediano (12px)', use: 'Cards, contenedores, botones estándar' },
      { token: '--ubits-border-radius-lg', label: 'Grande (16px)', use: 'Modales, paneles grandes' },
      { token: '--ubits-border-radius-xl', label: 'Extra grande (20px)', use: 'Elementos destacados, hero sections' },
      { token: '--ubits-border-radius-full', label: 'Completo (1000px)', use: 'Circulos perfectos, avatares, pills' },
    ];

    examples.forEach(example => {
      const exampleBox = document.createElement('div');
      exampleBox.style.padding = '16px';
      exampleBox.style.background = 'var(--modifiers-normal-color-light-bg-1)';
      exampleBox.style.borderRadius = 'var(--ubits-border-radius-md, 8px)';
      exampleBox.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';

      const tokenName = document.createElement('code');
      tokenName.textContent = example.token;
      tokenName.style.display = 'block';
      tokenName.style.marginBottom = '8px';
      tokenName.style.fontSize = '13px';
      tokenName.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';

      const label = document.createElement('strong');
      label.textContent = example.label;
      label.style.display = 'block';
      label.style.marginBottom = '4px';
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';

      const use = document.createElement('span');
      use.textContent = example.use;
      use.style.display = 'block';
      use.style.fontSize = '13px';
      use.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';

      const preview = document.createElement('div');
      preview.style.width = '100px';
      preview.style.height = '100px';
      preview.style.background = 'var(--modifiers-normal-color-light-accent-brand)';
      preview.style.borderRadius = `var(${example.token})`;
      preview.style.marginTop = '12px';
      preview.style.border = '2px solid var(--modifiers-normal-color-light-border-1)';

      exampleBox.appendChild(tokenName);
      exampleBox.appendChild(label);
      exampleBox.appendChild(use);
      exampleBox.appendChild(preview);

      container.appendChild(exampleBox);
    });

    return container;
  },
};

