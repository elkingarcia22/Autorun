import type { Meta, StoryObj } from '@storybook/html';

const BREAKPOINTS = [
  { name: 'Mobile', value: '< 480px', description: 'Pantallas pequeñas. TabBar visible, Sidebar oculta. Padding reducido (12px).' },
  { name: 'Tablet', value: '480px - 767px', description: 'Pantallas medianas. TabBar visible, Sidebar oculta. Layout adaptativo.' },
  { name: 'Desktop', value: '768px - 1023px', description: 'Pantallas grandes. TabBar visible, Sidebar oculta. Transición hacia Wide.' },
  { name: 'Wide', value: '≥ 1024px', description: 'Pantallas extra grandes. Sidebar visible, TabBar oculta. Contenido centrado con max-width: 1607px (≥ 1440px).' },
] as const;

const meta: Meta = {
  title: 'Tokens/Grid y Breakpoints/Breakpoints',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

function breakpointItem(breakpoint: typeof BREAKPOINTS[number]) {
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = '300px 1fr';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '16px';
  wrap.style.padding = '12px 16px';
  wrap.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  wrap.style.borderRadius = '8px';
  wrap.style.background = 'var(--ubits-bg-1, #ffffff)';
  
  const left = document.createElement('div');
  left.style.display = 'flex';
  left.style.alignItems = 'center';
  left.style.gap = '12px';
  
  // Visual indicator bar
  const bar = document.createElement('div');
  const barWidth = breakpoint.name === 'Mobile' ? 4 : 
                   breakpoint.name === 'Tablet' ? 8 :
                   breakpoint.name === 'Desktop' ? 12 : 16;
  bar.style.width = `${barWidth}px`;
  bar.style.height = '32px';
  bar.style.background = 'var(--ubits-accent-brand-static-inverted, #2563eb)';
  bar.style.borderRadius = '2px';
  bar.style.flexShrink = '0';
  
  const nameEl = document.createElement('div');
  nameEl.style.display = 'flex';
  nameEl.style.flexDirection = 'column';
  nameEl.style.gap = '4px';
  
  const nameTitle = document.createElement('strong');
  nameTitle.textContent = breakpoint.name;
  nameTitle.style.fontSize = '14px';
  nameTitle.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  nameTitle.style.fontWeight = '600';
  
  const nameCode = document.createElement('code');
  nameCode.textContent = breakpoint.value;
  nameCode.style.fontSize = '12px';
  nameCode.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  nameCode.style.background = 'var(--ubits-bg-2, #f9fafb)';
  nameCode.style.padding = '2px 6px';
  nameCode.style.borderRadius = '4px';
  
  nameEl.appendChild(nameTitle);
  nameEl.appendChild(nameCode);
  
  left.appendChild(bar);
  left.appendChild(nameEl);
  
  const descEl = document.createElement('p');
  descEl.textContent = breakpoint.description;
  descEl.style.fontSize = '13px';
  descEl.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  descEl.style.margin = '0';
  descEl.style.lineHeight = '1.5';
  
  wrap.appendChild(left);
  wrap.appendChild(descEl);
  
  return wrap;
}

export const Tokens: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';
    
    // Add critical point note
    const noteCard = document.createElement('div');
    noteCard.style.background = 'var(--ubits-bg-2, #f9fafb)';
    noteCard.style.padding = '16px';
    noteCard.style.borderRadius = '8px';
    noteCard.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    noteCard.style.marginBottom = '12px';
    
    const noteTitle = document.createElement('h5');
    noteTitle.textContent = '🔑 Punto crítico';
    noteTitle.style.fontSize = '14px';
    noteTitle.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    noteTitle.style.fontWeight = '600';
    noteTitle.style.margin = '0 0 8px 0';
    
    const noteText = document.createElement('p');
    noteText.innerHTML = 'El breakpoint de <strong>1024px</strong> es crítico: define el cambio entre Sidebar y TabBar. En <code style="background: var(--ubits-bg-1); padding: 2px 6px; border-radius: 4px; font-size: 11px;">max-width: 1023px</code> se muestra TabBar, en <code style="background: var(--ubits-bg-1); padding: 2px 6px; border-radius: 4px; font-size: 11px;">min-width: 1024px</code> se muestra Sidebar.';
    noteText.style.fontSize = '13px';
    noteText.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    noteText.style.margin = '0';
    noteText.style.lineHeight = '1.5';
    
    noteCard.appendChild(noteTitle);
    noteCard.appendChild(noteText);
    container.appendChild(noteCard);

    BREAKPOINTS.forEach(bp => {
      container.appendChild(breakpointItem(bp));
    });

    return container;
  },
};

