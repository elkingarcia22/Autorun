import type { Meta, StoryObj } from '@storybook/html';

const GRID_CONTAINERS = [
  {
    name: '.dashboard-container',
    properties: ['display: flex', 'min-height: 100vh'],
    description: 'Contenedor principal con display flex y altura mínima de viewport.',
  },
  {
    name: '.main-content',
    properties: ['flex: 1', 'margin-left: 143px (sidebar)', 'gap: 20px', 'max-width: 1607px (≥ 1440px)'],
    description: 'Contenido principal. En pantallas ≥ 1440px se centra con max-width: 1607px.',
  },
  {
    name: '.content-area',
    properties: ['flex: 1', 'justify-content: center'],
    description: 'Área de contenido con flex 1 y contenido centrado.',
  },
  {
    name: '.content-sections',
    properties: ['display: flex', 'flex-direction: column', 'gap: 16px'],
    description: 'Contenedor de secciones con display flex en columna y gap de 16px.',
  },
] as const;

const GRID_SECTIONS = [
  {
    name: '.section-single',
    properties: ['display: flex', 'width: 100%'],
    description: 'Una columna. Widget ocupa 100% del ancho.',
  },
  {
    name: '.section-dual',
    properties: ['display: flex', 'gap: 20px', 'flex-direction: column (< 1024px)', 'gap: 16px (móvil)'],
    description: 'Dos columnas. En móvil (< 1024px) se apila verticalmente con gap reducido.',
  },
  {
    name: '.section-triple',
    properties: ['display: flex', 'gap: 20px', 'flex-direction: column (< 1024px)'],
    description: 'Tres columnas. En móvil se apila verticalmente.',
  },
  {
    name: '.section-quad',
    properties: ['display: flex', 'gap: 20px', 'flex-direction: column (< 1024px)'],
    description: 'Cuatro columnas. En móvil se apila verticalmente.',
  },
] as const;

const GRID_SPACING = [
  { name: 'Entre secciones', value: 'gap: 16px', note: '20px entre SubNav y Content Area' },
  { name: 'Entre widgets (desktop)', value: 'gap: 20px', note: '' },
  { name: 'Entre widgets (móvil)', value: 'gap: 16px', note: '' },
  { name: 'Sidebar', value: 'width: 143px', note: '24px + 96px + 23px gap' },
  { name: 'Max-width contenido', value: '1607px', note: 'En pantallas ≥ 1440px' },
] as const;

const meta: Meta = {
  title: 'Tokens/Grid y Breakpoints/Sistema de Grid',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

function gridItem(item: typeof GRID_CONTAINERS[number] | typeof GRID_SECTIONS[number]) {
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
  nameEl.textContent = item.name;
  nameEl.style.fontSize = '13px';
  nameEl.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  nameEl.style.fontWeight = '600';
  
  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.flexDirection = 'column';
  right.style.gap = '4px';
  
  const descEl = document.createElement('p');
  descEl.textContent = item.description;
  descEl.style.fontSize = '13px';
  descEl.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  descEl.style.margin = '0 0 8px 0';
  descEl.style.lineHeight = '1.5';
  
  const propsEl = document.createElement('div');
  propsEl.style.display = 'flex';
  propsEl.style.flexWrap = 'wrap';
  propsEl.style.gap = '6px';
  
  item.properties.forEach(prop => {
    const propCode = document.createElement('code');
    propCode.textContent = prop;
    propCode.style.fontSize = '11px';
    propCode.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    propCode.style.background = 'var(--ubits-bg-2, #f9fafb)';
    propCode.style.padding = '2px 6px';
    propCode.style.borderRadius = '4px';
    propsEl.appendChild(propCode);
  });
  
  right.appendChild(descEl);
  right.appendChild(propsEl);
  
  wrap.appendChild(nameEl);
  wrap.appendChild(right);
  
  return wrap;
}

function spacingItem(item: typeof GRID_SPACING[number]) {
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = '200px 1fr';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '16px';
  wrap.style.padding = '12px 16px';
  wrap.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  wrap.style.borderRadius = '8px';
  wrap.style.background = 'var(--ubits-bg-1, #ffffff)';
  
  const nameEl = document.createElement('strong');
  nameEl.textContent = item.name + ':';
  nameEl.style.fontSize = '13px';
  nameEl.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  
  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.alignItems = 'center';
  right.style.gap = '8px';
  
  const valueCode = document.createElement('code');
  valueCode.textContent = item.value;
  valueCode.style.fontSize = '12px';
  valueCode.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  valueCode.style.background = 'var(--ubits-bg-2, #f9fafb)';
  valueCode.style.padding = '2px 6px';
  valueCode.style.borderRadius = '4px';
  
  right.appendChild(valueCode);
  
  if (item.note) {
    const noteEl = document.createElement('span');
    noteEl.textContent = `(${item.note})`;
    noteEl.style.fontSize = '12px';
    noteEl.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    right.appendChild(noteEl);
  }
  
  wrap.appendChild(nameEl);
  wrap.appendChild(right);
  
  return wrap;
}

export const Contenedores: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';

    GRID_CONTAINERS.forEach(item => {
      container.appendChild(gridItem(item));
    });

    return container;
  },
};

export const Secciones: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';

    GRID_SECTIONS.forEach(item => {
      container.appendChild(gridItem(item));
    });

    return container;
  },
};

export const Espaciado: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '12px';
    container.style.padding = '16px';
    container.style.maxWidth = '900px';

    GRID_SPACING.forEach(item => {
      container.appendChild(spacingItem(item));
    });

    return container;
  },
};

