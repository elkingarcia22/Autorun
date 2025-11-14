import type { Meta, StoryObj } from '@storybook/html';

const BUTTON_TOKENS = [
  '--ubits-button-primary-bg-default',
  '--ubits-button-primary-hover',
  '--ubits-button-primary-pressed',
  '--ubits-button-active-bg',
  '--ubits-button-focus-ring',
  '--ubits-button-badge',
  '--ubits-btn-primary-fg',
  '--ubits-bg-disabled-button',
  '--ubits-border-disabled-button',
  '--ubits-fg-on-disabled-button',
  '--ubits-btn-secondary-bg-default',
  '--ubits-btn-secondary-bg-hover',
  '--ubits-btn-secondary-bg-pressed',
  '--ubits-btn-secondary-fg-default',
  '--ubits-btn-secondary-border',
  '--ubits-btn-tertiary-fg',
  '--ubits-btn-tertiary-bg-hover',
  '--ubits-btn-tertiary-bg-pressed',
] as const;

const meta: Meta = {
  title: 'Tokens/Colors/Button',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

function rgbaToHex(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return rgba;
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const a = match[4] ? parseFloat(match[4]) : 1;
  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  if (a < 1) {
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
    return hex + alphaHex;
  }
  return hex;
}

function swatch(token: string, theme: 'light' | 'dark') {
  const root = document.documentElement;
  document.body.setAttribute('data-theme', theme);
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  const isWhite = /^(#fff(f)?|rgb\(255,\s*255,\s*255\))$/i.test(value);
  const hasOpacity = /rgba?\([^)]+\)/.test(value) && value.includes('0.');
  const bg1Value = theme === 'light' ? '#ffffff' : '#202837';
  let bg: string;
  if (isWhite) {
    bg = 'repeating-conic-gradient(#eee 0% 25%, var(--ubits-bg-1) 0% 50%) 50%/12px 12px';
  } else if (hasOpacity) {
    // Para colores con opacidad, mostrar sobre fondo bg1
    bg = `${value}, ${bg1Value}`;
  } else {
    bg = value;
  }
  // Convertir rgba a hex para mostrar
  const displayValue = /rgba?\([^)]+\)/.test(value) ? rgbaToHex(value) : value;
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = '320px 1fr';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '8px';
  wrap.style.padding = '6px 8px';
  wrap.style.border = '1px solid #e5e7eb';
  wrap.style.borderRadius = '8px';
  const nameEl = document.createElement('code');
  nameEl.textContent = token;
  const box = document.createElement('div');
  box.style.height = '28px';
  box.style.width = '120px';
  box.style.borderRadius = '6px';
  box.style.border = '1px solid #9ca3af';
  box.style.background = bg;
  const val = document.createElement('code');
  val.textContent = displayValue;
  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.gap = '8px';
  right.style.alignItems = 'center';
  right.appendChild(box);
  right.appendChild(val);
  wrap.appendChild(nameEl);
  wrap.appendChild(right);
  return wrap;
}

export const LightAndDark: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '1fr 1fr';
    container.style.gap = '16px';

    const lightCol = document.createElement('div');
    lightCol.style.background = '#ffffff';
    lightCol.style.border = '1px solid #e5e7eb';
    lightCol.style.borderRadius = '10px';
    lightCol.style.padding = '12px';
    const lightTitle = document.createElement('h4');
    lightTitle.textContent = 'Light';
    lightCol.appendChild(lightTitle);

    const darkCol = document.createElement('div');
    darkCol.style.background = '#0E1825';
    darkCol.style.color = '#edeeef';
    darkCol.style.border = '1px solid #0E1825';
    darkCol.style.borderRadius = '10px';
    darkCol.style.padding = '12px';
    const darkTitle = document.createElement('h4');
    darkTitle.textContent = 'Dark';
    darkCol.appendChild(darkTitle);

    BUTTON_TOKENS.forEach(t => {
      lightCol.appendChild(swatch(t, 'light'));
      darkCol.appendChild(swatch(t, 'dark'));
    });

    container.appendChild(lightCol);
    container.appendChild(darkCol);
    document.body.setAttribute('data-theme', 'light');
    return container;
  },
};
