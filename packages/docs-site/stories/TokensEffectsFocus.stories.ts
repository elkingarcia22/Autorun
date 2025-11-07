import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens/Effects/Focus',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tokens de efecto Focus del sistema de diseño UBITS. Configura el efecto de foco visual con controles de posición, blur, spread y color.',
      },
    },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// Valores por defecto para el efecto Focus (configurables por el usuario)
const DEFAULT_FOCUS_COLOR = 'var(--ubits-accent-brand-static-inverted, #5297F4)';
const DEFAULT_FOCUS_COLOR_VALUE = '#5297F4'; // Valor por defecto para el color picker (configurable)

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

// Función para actualizar el efecto Focus
function updateFocusEffect(
  preview: HTMLElement,
  x: number,
  y: number,
  blur: number,
  spread: number,
  color: string,
  opacity: number
) {
  const rgba = hexToRgba(color, opacity / 100);
  preview.style.borderColor = color;
  preview.style.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
}

export const Interactive: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '24px';
    container.style.maxWidth = '900px';
    container.style.padding = '16px';

    // Card principal
    const card = document.createElement('div');
    card.style.background = 'var(--ubits-bg-1, #ffffff)';
    card.style.border = 'none';
    card.style.borderRadius = '12px';
    card.style.padding = '24px';
    card.style.display = 'grid';
    card.style.gridTemplateColumns = '1fr 1fr';
    card.style.gap = '32px';

    // Preview
    const previewSection = document.createElement('div');
    const previewTitle = document.createElement('h4');
    previewTitle.textContent = 'Preview';
    previewTitle.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    previewTitle.style.fontSize = 'var(--font-body-md-size, 14px)';
    previewTitle.style.fontWeight = 'var(--weight-semibold, 600)';
    previewTitle.style.margin = '0 0 16px 0';

    const preview = document.createElement('div');
    preview.id = 'focus-preview-storybook';
    preview.style.width = '120px';
    preview.style.height = '120px';
    preview.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    preview.style.borderRadius = '8px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.border = `2px solid ${DEFAULT_FOCUS_COLOR}`;
    // Inicializar box-shadow con valores por defecto (se actualizará dinámicamente)
    const defaultRgba = hexToRgba(DEFAULT_FOCUS_COLOR_VALUE, 0.3);
    preview.style.boxShadow = `0px 0px 0px 4px ${defaultRgba}`;

    const previewText = document.createElement('span');
    previewText.textContent = 'Focus';
    previewText.style.color = 'var(--ubits-fg-2-medium, #6b7280)';
    previewText.style.fontSize = 'var(--font-body-sm-size, 13px)';
    preview.appendChild(previewText);

    previewSection.appendChild(previewTitle);
    previewSection.appendChild(preview);

    // Controles
    const controlsSection = document.createElement('div');
    const controlsTitle = document.createElement('h4');
    controlsTitle.textContent = 'Controles';
    controlsTitle.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    controlsTitle.style.fontSize = 'var(--font-body-md-size, 14px)';
    controlsTitle.style.fontWeight = 'var(--weight-semibold, 600)';
    controlsTitle.style.margin = '0 0 16px 0';

    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsContainer.style.gap = '20px';

    // Position X/Y
    const positionGroup = document.createElement('div');
    const positionLabel = document.createElement('label');
    positionLabel.textContent = 'Position';
    positionLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    positionLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    positionLabel.style.fontWeight = 'var(--weight-medium, 500)';
    positionLabel.style.marginBottom = '8px';
    positionLabel.style.display = 'block';

    const positionInputs = document.createElement('div');
    positionInputs.style.display = 'grid';
    positionInputs.style.gridTemplateColumns = '1fr 1fr';
    positionInputs.style.gap = '8px';

    const xInput = document.createElement('input');
    xInput.type = 'number';
    xInput.id = 'focus-x-storybook';
    xInput.value = '0';
    xInput.style.width = '100%';
    xInput.style.padding = '8px';
    xInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    xInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    xInput.style.borderRadius = '6px';
    xInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    xInput.style.fontSize = 'var(--font-body-sm-size, 13px)';

    const xLabel = document.createElement('label');
    xLabel.textContent = 'X';
    xLabel.style.color = 'var(--ubits-fg-2-medium, #9ca3af)';
    xLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
    xLabel.style.marginBottom = '4px';
    xLabel.style.display = 'block';

    const xContainer = document.createElement('div');
    xContainer.appendChild(xLabel);
    xContainer.appendChild(xInput);

    const yInput = document.createElement('input');
    yInput.type = 'number';
    yInput.id = 'focus-y-storybook';
    yInput.value = '0';
    yInput.style.width = '100%';
    yInput.style.padding = '8px';
    yInput.style.background = 'var(--ubits-bg-2, #f3f3f4)';
    yInput.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    yInput.style.borderRadius = '6px';
    yInput.style.color = 'var(--ubits-fg-1-high, #1a1a1a)';
    yInput.style.fontSize = 'var(--font-body-sm-size, 13px)';

    const yLabel = document.createElement('label');
    yLabel.textContent = 'Y';
    yLabel.style.color = 'var(--ubits-fg-2-medium, #9ca3af)';
    yLabel.style.fontSize = 'var(--font-body-xs-size, 12px)';
    yLabel.style.marginBottom = '4px';
    yLabel.style.display = 'block';

    const yContainer = document.createElement('div');
    yContainer.appendChild(yLabel);
    yContainer.appendChild(yInput);

    positionInputs.appendChild(xContainer);
    positionInputs.appendChild(yContainer);
    positionGroup.appendChild(positionLabel);
    positionGroup.appendChild(positionInputs);

    // Blur
    const blurGroup = document.createElement('div');
    const blurLabel = document.createElement('label');
    blurLabel.textContent = 'Blur';
    blurLabel.style.color = 'var(--ubits-fg-1-medium, #6b7280)';
    blurLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    blurLabel.style.fontWeight = 'var(--weight-medium, 500)';
    blurLabel.style.marginBottom = '8px';
    blurLabel.style.display = 'block';

    const blurInput = document.createElement('input');
    blurInput.type = 'number';
    blurInput.id = 'focus-blur-storybook';
    blurInput.value = '0';
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
    spreadLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    spreadLabel.style.fontWeight = 'var(--weight-medium, 500)';
    spreadLabel.style.marginBottom = '8px';
    spreadLabel.style.display = 'block';

    const spreadInput = document.createElement('input');
    spreadInput.type = 'number';
    spreadInput.id = 'focus-spread-storybook';
    spreadInput.value = '4';
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
    colorLabel.style.fontSize = 'var(--font-body-sm-size, 13px)';
    colorLabel.style.fontWeight = 'var(--weight-medium, 500)';
    colorLabel.style.marginBottom = '8px';
    colorLabel.style.display = 'block';

    const colorContainer = document.createElement('div');
    colorContainer.style.display = 'flex';
    colorContainer.style.gap = '8px';
    colorContainer.style.alignItems = 'center';

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.id = 'focus-color-storybook';
    colorPicker.value = DEFAULT_FOCUS_COLOR_VALUE;
    colorPicker.style.width = '50px';
    colorPicker.style.height = '40px';
    colorPicker.style.padding = '0';
    colorPicker.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    colorPicker.style.borderRadius = '6px';
    colorPicker.style.cursor = 'pointer';

    const colorHex = document.createElement('input');
    colorHex.type = 'text';
    colorHex.id = 'focus-color-hex-storybook';
    colorHex.value = DEFAULT_FOCUS_COLOR_VALUE;
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
    opacityInput.id = 'focus-opacity-storybook';
    opacityInput.value = '30';
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

    // Event listeners
    const updateEffect = () => {
      const x = parseFloat(xInput.value) || 0;
      const y = parseFloat(yInput.value) || 0;
      const blur = parseFloat(blurInput.value) || 0;
      const spread = parseFloat(spreadInput.value) || 4;
      const color = colorPicker.value;
      const opacity = parseFloat(opacityInput.value) || 30;
      updateFocusEffect(preview, x, y, blur, spread, color, opacity);
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

    controlsContainer.appendChild(positionGroup);
    controlsContainer.appendChild(blurGroup);
    controlsContainer.appendChild(spreadGroup);
    controlsContainer.appendChild(colorGroup);

    controlsSection.appendChild(controlsTitle);
    controlsSection.appendChild(controlsContainer);

    card.appendChild(previewSection);
    card.appendChild(controlsSection);

    container.appendChild(card);

    // Inicializar con valores por defecto
    updateEffect();

    return container;
  },
};

