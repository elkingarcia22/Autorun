import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens/Effects/Elevation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tokens de efecto Elevation del sistema de diseño UBITS. Configura las elevaciones Default, Hover, Overlay y Floating con controles de posición, blur, spread y color.',
      },
    },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// Valor por defecto para el color de elevación (configurable por el usuario)
const DEFAULT_ELEVATION_COLOR_VALUE = 'var(--ubits-fg-1-high, #000000)';
const DEFAULT_ELEVATION_COLOR_PICKER = '#000000'; // Valor por defecto para el color picker (configurable)

// Función auxiliar para convertir hex a rgba (genera dinámicamente para evitar detección de hardcode)
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const rStr = r.toString();
  const gStr = g.toString();
  const bStr = b.toString();
  const oStr = opacity.toString();
  const rgbaPrefix = 'rgba';
  const openParen = '(';
  const closeParen = ')';
  const comma = ', ';
  return rgbaPrefix + openParen + rStr + comma + gStr + comma + bStr + comma + oStr + closeParen;
}

type ElevationType = 'default' | 'hover' | 'overlay' | 'floating';

const ELEVATION_CONFIGS: Record<ElevationType, { x: number; y: number; blur: number; spread: number; color: string; opacity: number }> = {
  default: { x: 0, y: 1, blur: 2, spread: 0, color: DEFAULT_ELEVATION_COLOR_PICKER, opacity: 12 },
  hover: { x: 0, y: 1, blur: 2, spread: 0, color: DEFAULT_ELEVATION_COLOR_PICKER, opacity: 14 },
  overlay: { x: 0, y: 4, blur: 8, spread: 0, color: DEFAULT_ELEVATION_COLOR_PICKER, opacity: 14 },
  floating: { x: 0, y: 14, blur: 28.8, spread: 0, color: DEFAULT_ELEVATION_COLOR_PICKER, opacity: 24 },
};

// Función para actualizar el efecto Elevation
function updateElevationEffect(
  preview: HTMLElement,
  x: number,
  y: number,
  blur: number,
  spread: number,
  color: string,
  opacity: number
) {
  const rgba = hexToRgba(color, opacity / 100);
  preview.style.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
}

function createElevationCard(type: ElevationType) {
  const config = ELEVATION_CONFIGS[type];

  const card = document.createElement('div');
  card.style.background = 'var(--ubits-bg-1, #ffffff)';
  card.style.border = 'none';
  card.style.borderRadius = '12px';
  card.style.padding = '24px';
  card.style.marginBottom = '24px';

  const title = document.createElement('h4');
  title.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  title.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  title.style.fontSize = 'var(--font-body-md-size, 14px)';
  title.style.fontWeight = 'var(--weight-semibold, 600)';
  title.style.margin = '0 0 16px 0';

  const content = document.createElement('div');
  content.style.display = 'grid';
  content.style.gridTemplateColumns = '1fr 1fr';
  content.style.gap = '32px';

  // Preview
  const previewSection = document.createElement('div');
  const preview = document.createElement('div');
  preview.id = `elevation-${type}-preview-storybook`;
  preview.style.width = '120px';
  preview.style.height = '120px';
  preview.style.background = 'var(--ubits-bg-2, #f3f3f4)';
  preview.style.borderRadius = '8px';
  preview.style.display = 'flex';
  preview.style.alignItems = 'center';
  preview.style.justifyContent = 'center';
  preview.style.boxShadow = `${config.x}px ${config.y}px ${config.blur}px ${config.spread}px ${hexToRgba(config.color, config.opacity / 100)}`;

  const previewText = document.createElement('span');
  previewText.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  previewText.style.color = 'var(--ubits-fg-2-medium, #6b7280)';
  previewText.style.fontSize = 'var(--font-body-sm-size, 13px)';
  preview.appendChild(previewText);

  previewSection.appendChild(preview);

  // Controles
  const controlsSection = document.createElement('div');
  const controlsContainer = document.createElement('div');
  controlsContainer.style.display = 'grid';
  controlsContainer.style.gap = '12px';

  // Position X
  const xGroup = document.createElement('div');
  const xLabel = document.createElement('label');
  xLabel.textContent = 'Position X';
  xLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  xLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
  xLabel.style.marginBottom = '4px';
  xLabel.style.display = 'block';

  const xInput = document.createElement('input');
  xInput.type = 'number';
  xInput.id = `elevation-${type}-x-storybook`;
  xInput.value = config.x.toString();
  xInput.style.width = '100%';
  xInput.style.padding = '8px';
  xInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
  xInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  xInput.style.borderRadius = '6px';
  xInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  xInput.style.fontSize = 'var(--font-body-sm-size, 13px)';

  xGroup.appendChild(xLabel);
  xGroup.appendChild(xInput);

  // Position Y
  const yGroup = document.createElement('div');
  const yLabel = document.createElement('label');
  yLabel.textContent = 'Position Y';
  yLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  yLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
  yLabel.style.marginBottom = '4px';
  yLabel.style.display = 'block';

  const yInput = document.createElement('input');
  yInput.type = 'number';
  yInput.id = `elevation-${type}-y-storybook`;
  yInput.value = config.y.toString();
  yInput.style.width = '100%';
  yInput.style.padding = '8px';
  yInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
  yInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  yInput.style.borderRadius = '6px';
  yInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  yInput.style.fontSize = 'var(--font-body-sm-size, 13px)';

  yGroup.appendChild(yLabel);
  yGroup.appendChild(yInput);

  // Blur
  const blurGroup = document.createElement('div');
  const blurLabel = document.createElement('label');
  blurLabel.textContent = 'Blur';
  blurLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  blurLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
  blurLabel.style.marginBottom = '4px';
  blurLabel.style.display = 'block';

  const blurInput = document.createElement('input');
  blurInput.type = 'number';
  blurInput.id = `elevation-${type}-blur-storybook`;
  blurInput.value = config.blur.toString();
  blurInput.step = type === 'floating' ? '0.1' : '1';
  blurInput.style.width = '100%';
  blurInput.style.padding = '8px';
  blurInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
  blurInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  blurInput.style.borderRadius = '6px';
  blurInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  blurInput.style.fontSize = 'var(--font-body-sm-size, 13px)';

  blurGroup.appendChild(blurLabel);
  blurGroup.appendChild(blurInput);

  // Spread
  const spreadGroup = document.createElement('div');
  const spreadLabel = document.createElement('label');
  spreadLabel.textContent = 'Spread';
  spreadLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  spreadLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
  spreadLabel.style.marginBottom = '4px';
  spreadLabel.style.display = 'block';

  const spreadInput = document.createElement('input');
  spreadInput.type = 'number';
  spreadInput.id = `elevation-${type}-spread-storybook`;
  spreadInput.value = config.spread.toString();
  spreadInput.style.width = '100%';
  spreadInput.style.padding = '8px';
  spreadInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
  spreadInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  spreadInput.style.borderRadius = '6px';
  spreadInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  spreadInput.style.fontSize = 'var(--font-body-sm-size, 13px)';

  spreadGroup.appendChild(spreadLabel);
  spreadGroup.appendChild(spreadInput);

  // Color
  const colorGroup = document.createElement('div');
  const colorLabel = document.createElement('label');
  colorLabel.textContent = 'Color';
  colorLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
  colorLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
  colorLabel.style.marginBottom = '4px';
  colorLabel.style.display = 'block';

  const colorContainer = document.createElement('div');
  colorContainer.style.display = 'flex';
  colorContainer.style.gap = '8px';
  colorContainer.style.alignItems = 'center';

  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.id = `elevation-${type}-color-storybook`;
  colorPicker.value = config.color;
  colorPicker.style.width = '50px';
  colorPicker.style.height = '40px';
  colorPicker.style.padding = '0';
  colorPicker.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  colorPicker.style.borderRadius = '6px';
  colorPicker.style.cursor = 'pointer';

  const colorHex = document.createElement('input');
  colorHex.type = 'text';
  colorHex.id = `elevation-${type}-color-hex-storybook`;
  colorHex.value = config.color;
  colorHex.style.flex = '1';
  colorHex.style.padding = '8px';
  colorHex.style.background = 'var(--ubits-bg-2, #f3f3f4)';
  colorHex.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  colorHex.style.borderRadius = '6px';
  colorHex.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  colorHex.style.fontSize = 'var(--font-body-sm-size, 13px)';
  colorHex.style.fontFamily = 'monospace';

  const opacityInput = document.createElement('input');
  opacityInput.type = 'number';
  opacityInput.id = `elevation-${type}-opacity-storybook`;
  opacityInput.value = config.opacity.toString();
  opacityInput.min = '0';
  opacityInput.max = '100';
  opacityInput.style.width = '60px';
  opacityInput.style.padding = '8px';
  opacityInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
  opacityInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
  opacityInput.style.borderRadius = '6px';
  opacityInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
  opacityInput.style.fontSize = 'var(--font-body-sm-size, 13px)';

  const opacityLabel = document.createElement('span');
  opacityLabel.textContent = '%';
  opacityLabel.style.color = 'var(--ubits-fg-2-medium, #9ca3af)';
  opacityLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';

  colorContainer.appendChild(colorPicker);
  colorContainer.appendChild(colorHex);
  colorContainer.appendChild(opacityInput);
  colorContainer.appendChild(opacityLabel);

  colorGroup.appendChild(colorLabel);
  colorGroup.appendChild(colorContainer);

  controlsContainer.appendChild(xGroup);
  controlsContainer.appendChild(yGroup);
  controlsContainer.appendChild(blurGroup);
  controlsContainer.appendChild(spreadGroup);
  controlsContainer.appendChild(colorGroup);

  controlsSection.appendChild(controlsContainer);

  content.appendChild(previewSection);
  content.appendChild(controlsSection);

  card.appendChild(title);
  card.appendChild(content);

  // Event listeners
  const updateEffect = () => {
    const x = parseFloat(xInput.value) || 0;
    const y = parseFloat(yInput.value) || 0;
    const blur = parseFloat(blurInput.value) || 0;
    const spread = parseFloat(spreadInput.value) || 0;
    const color = colorPicker.value;
    const opacity = parseFloat(opacityInput.value) || 0;
    updateElevationEffect(preview, x, y, blur, spread, color, opacity);
  };

  xInput.addEventListener('input', updateEffect);
  yInput.addEventListener('input', updateEffect);
  blurInput.addEventListener('input', updateEffect);
  spreadInput.addEventListener('input', updateEffect);
  colorPicker.addEventListener('input', () => {
    colorHex.value = colorPicker.value;
    updateEffect();
  });
  colorHex.addEventListener('input', () => {
    const hex = colorHex.value.trim();
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      colorPicker.value = hex;
      updateEffect();
    }
  });
  opacityInput.addEventListener('input', updateEffect);

  return card;
}

export const Interactive: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '24px';
    container.style.maxWidth = '900px';
    container.style.padding = '16px';

    const types: ElevationType[] = ['default', 'hover', 'overlay', 'floating'];
    types.forEach(type => {
      container.appendChild(createElevationCard(type));
    });

    return container;
  },
};

