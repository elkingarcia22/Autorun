/**
 * Tokens UBITS - Effects (Elevation, Focus y Floating)
 * 
 * Tokens para efectos visuales como sombras (elevation), focus rings y elevacion flotante.
 * 
 * Estructura:
 * - Elevation: Sombras con estados Default y Hover
 * - Focus: Anillos de enfoque con propiedades configurables
 * - Floating: Elevacion flotante construida con tokens de Figma (elevation-floating-0 y -1)
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createColorSwatch } from './utils';

const meta: Meta = {
  title: 'Tokens UBITS/04. Effects',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tokens para efectos visuales: elevation (sombras), focus (anillos de enfoque) y floating (elevacion flotante). Los efectos de elevation tienen estados Default y Hover, focus tiene propiedades configurables (position, blur, spread, color), y floating usa tokens de Figma con dos sombras combinadas.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Extraer valor de token CSS
 */
function getTokenValue(token: string): string {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  return value || '#cccccc';
}

/**
 * Crear preview de sombra
 */
function createShadowPreview(
  label: string,
  shadowValue: string,
  positionX: number = 0,
  positionY: number = 1,
  blur: number = 2,
  spread: number = 0,
  color: string = 'rgba(0, 0, 0, 0.12)'
): HTMLElement {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.gap = '24px';
  container.style.marginBottom = '32px';
  container.style.padding = '20px';
  container.style.backgroundColor = '#f9fafb';
  container.style.border = '1px solid #e5e7eb';
  container.style.borderRadius = '12px';

  // Preview
  const previewSection = document.createElement('div');
  previewSection.style.flex = '0 0 200px';

  const previewTitle = document.createElement('h4');
  previewTitle.textContent = 'Preview';
  previewTitle.style.fontSize = '16px';
  previewTitle.style.fontWeight = '600';
  previewTitle.style.marginBottom = '12px';
  previewTitle.style.color = '#303a47';
  previewSection.appendChild(previewTitle);

  const previewBox = document.createElement('div');
  previewBox.textContent = label;
  previewBox.style.width = '120px';
  previewBox.style.height = '120px';
  previewBox.style.backgroundColor = '#f3f3f4';
  previewBox.style.border = '1px solid #d0d2d5';
  previewBox.style.borderRadius = '8px';
  previewBox.style.display = 'flex';
  previewBox.style.alignItems = 'center';
  previewBox.style.justifyContent = 'center';
  previewBox.style.fontSize = '14px';
  previewBox.style.fontWeight = '500';
  previewBox.style.color = '#303a47';
  
  // Aplicar sombra
  const shadow = `${positionX}px ${positionY}px ${blur}px ${spread}px ${color}`;
  previewBox.style.boxShadow = shadow;
  
  previewSection.appendChild(previewBox);

  // Controles
  const controlsSection = document.createElement('div');
  controlsSection.style.flex = '1';

  const controlsTitle = document.createElement('h4');
  controlsTitle.textContent = 'Controles';
  controlsTitle.style.fontSize = '16px';
  controlsTitle.style.fontWeight = '600';
  controlsTitle.style.marginBottom = '12px';
  controlsTitle.style.color = '#303a47';
  controlsSection.appendChild(controlsTitle);

  // Position
  const positionGroup = document.createElement('div');
  positionGroup.style.marginBottom = '16px';

  const positionLabel = document.createElement('label');
  positionLabel.textContent = 'Position';
  positionLabel.style.display = 'block';
  positionLabel.style.fontSize = '14px';
  positionLabel.style.fontWeight = '500';
  positionLabel.style.marginBottom = '8px';
  positionLabel.style.color = '#303a47';
  positionGroup.appendChild(positionLabel);

  const positionInputs = document.createElement('div');
  positionInputs.style.display = 'flex';
  positionInputs.style.gap = '12px';

  const xInput = document.createElement('input');
  xInput.type = 'number';
  xInput.value = positionX.toString();
  xInput.style.width = '80px';
  xInput.style.padding = '6px 8px';
  xInput.style.border = '1px solid #d0d2d5';
  xInput.style.borderRadius = '6px';
  xInput.style.fontSize = '14px';
  xInput.addEventListener('input', () => {
    const newX = parseFloat(xInput.value) || 0;
    const newY = parseFloat(yInput.value) || 0;
    const newBlur = parseFloat(blurInput.value) || 0;
    const newSpread = parseFloat(spreadInput.value) || 0;
    const newColor = colorInput.value;
    const newShadow = `${newX}px ${newY}px ${newBlur}px ${newSpread}px ${newColor}`;
    previewBox.style.boxShadow = newShadow;
  });

  const xLabel = document.createElement('label');
  xLabel.textContent = 'X';
  xLabel.style.fontSize = '12px';
  xLabel.style.color = '#5c646f';
  xLabel.style.marginRight = '4px';
  positionInputs.appendChild(xLabel);
  positionInputs.appendChild(xInput);

  const yInput = document.createElement('input');
  yInput.type = 'number';
  yInput.value = positionY.toString();
  yInput.style.width = '80px';
  yInput.style.padding = '6px 8px';
  yInput.style.border = '1px solid #d0d2d5';
  yInput.style.borderRadius = '6px';
  yInput.style.fontSize = '14px';
  yInput.addEventListener('input', () => {
    const newX = parseFloat(xInput.value) || 0;
    const newY = parseFloat(yInput.value) || 0;
    const newBlur = parseFloat(blurInput.value) || 0;
    const newSpread = parseFloat(spreadInput.value) || 0;
    const newColor = colorInput.value;
    const newShadow = `${newX}px ${newY}px ${newBlur}px ${newSpread}px ${newColor}`;
    previewBox.style.boxShadow = newShadow;
  });

  const yLabel = document.createElement('label');
  yLabel.textContent = 'Y';
  yLabel.style.fontSize = '12px';
  yLabel.style.color = '#5c646f';
  yLabel.style.marginLeft = '12px';
  yLabel.style.marginRight = '4px';
  positionInputs.appendChild(yLabel);
  positionInputs.appendChild(yInput);

  positionGroup.appendChild(positionInputs);

  // Blur
  const blurGroup = document.createElement('div');
  blurGroup.style.marginBottom = '16px';

  const blurLabel = document.createElement('label');
  blurLabel.textContent = 'Blur';
  blurLabel.style.display = 'block';
  blurLabel.style.fontSize = '14px';
  blurLabel.style.fontWeight = '500';
  blurLabel.style.marginBottom = '8px';
  blurLabel.style.color = '#303a47';
  blurGroup.appendChild(blurLabel);

  const blurInput = document.createElement('input');
  blurInput.type = 'number';
  blurInput.value = blur.toString();
  blurInput.style.width = '100px';
  blurInput.style.padding = '6px 8px';
  blurInput.style.border = '1px solid #d0d2d5';
  blurInput.style.borderRadius = '6px';
  blurInput.style.fontSize = '14px';
  blurInput.addEventListener('input', () => {
    const newX = parseFloat(xInput.value) || 0;
    const newY = parseFloat(yInput.value) || 0;
    const newBlur = parseFloat(blurInput.value) || 0;
    const newSpread = parseFloat(spreadInput.value) || 0;
    const newColor = colorInput.value;
    const newShadow = `${newX}px ${newY}px ${newBlur}px ${newSpread}px ${newColor}`;
    previewBox.style.boxShadow = newShadow;
  });
  blurGroup.appendChild(blurInput);

  // Spread
  const spreadGroup = document.createElement('div');
  spreadGroup.style.marginBottom = '16px';

  const spreadLabel = document.createElement('label');
  spreadLabel.textContent = 'Spread';
  spreadLabel.style.display = 'block';
  spreadLabel.style.fontSize = '14px';
  spreadLabel.style.fontWeight = '500';
  spreadLabel.style.marginBottom = '8px';
  spreadLabel.style.color = '#303a47';
  spreadGroup.appendChild(spreadLabel);

  const spreadInput = document.createElement('input');
  spreadInput.type = 'number';
  spreadInput.value = spread.toString();
  spreadInput.style.width = '100px';
  spreadInput.style.padding = '6px 8px';
  spreadInput.style.border = '1px solid #d0d2d5';
  spreadInput.style.borderRadius = '6px';
  spreadInput.style.fontSize = '14px';
  spreadInput.addEventListener('input', () => {
    const newX = parseFloat(xInput.value) || 0;
    const newY = parseFloat(yInput.value) || 0;
    const newBlur = parseFloat(blurInput.value) || 0;
    const newSpread = parseFloat(spreadInput.value) || 0;
    const newColor = colorInput.value;
    const newShadow = `${newX}px ${newY}px ${newBlur}px ${newSpread}px ${newColor}`;
    previewBox.style.boxShadow = newShadow;
  });
  spreadGroup.appendChild(spreadInput);

  // Color
  const colorGroup = document.createElement('div');
  colorGroup.style.marginBottom = '16px';

  const colorLabel = document.createElement('label');
  colorLabel.textContent = 'Color';
  colorLabel.style.display = 'block';
  colorLabel.style.fontSize = '14px';
  colorLabel.style.fontWeight = '500';
  colorLabel.style.marginBottom = '8px';
  colorLabel.style.color = '#303a47';
  colorGroup.appendChild(colorLabel);

  const colorContainer = document.createElement('div');
  colorContainer.style.display = 'flex';
  colorContainer.style.alignItems = 'center';
  colorContainer.style.gap = '8px';

  const colorSwatch = document.createElement('div');
  colorSwatch.style.width = '32px';
  colorSwatch.style.height = '32px';
  colorSwatch.style.borderRadius = '4px';
  colorSwatch.style.border = '1px solid #d0d2d5';
  colorSwatch.style.backgroundColor = color;
  colorContainer.appendChild(colorSwatch);

  const colorInput = document.createElement('input');
  colorInput.type = 'text';
  colorInput.value = color;
  colorInput.style.flex = '1';
  colorInput.style.padding = '6px 8px';
  colorInput.style.border = '1px solid #d0d2d5';
  colorInput.style.borderRadius = '6px';
  colorInput.style.fontSize = '14px';
  colorInput.style.fontFamily = 'monospace';
  colorInput.addEventListener('input', () => {
    colorSwatch.style.backgroundColor = colorInput.value;
    const newX = parseFloat(xInput.value) || 0;
    const newY = parseFloat(yInput.value) || 0;
    const newBlur = parseFloat(blurInput.value) || 0;
    const newSpread = parseFloat(spreadInput.value) || 0;
    const newColor = colorInput.value;
    const newShadow = `${newX}px ${newY}px ${newBlur}px ${newSpread}px ${newColor}`;
    previewBox.style.boxShadow = newShadow;
  });

  colorContainer.appendChild(colorInput);

  const opacityInput = document.createElement('input');
  opacityInput.type = 'number';
  opacityInput.value = '30';
  opacityInput.style.width = '60px';
  opacityInput.style.padding = '6px 8px';
  opacityInput.style.border = '1px solid #d0d2d5';
  opacityInput.style.borderRadius = '6px';
  opacityInput.style.fontSize = '14px';
  opacityInput.style.marginLeft = '8px';
  colorContainer.appendChild(opacityInput);

  const opacityLabel = document.createElement('label');
  opacityLabel.textContent = '%';
  opacityLabel.style.fontSize = '14px';
  opacityLabel.style.color = '#5c646f';
  colorContainer.appendChild(opacityLabel);

  colorGroup.appendChild(colorContainer);

  controlsSection.appendChild(positionGroup);
  controlsSection.appendChild(blurGroup);
  controlsSection.appendChild(spreadGroup);
  controlsSection.appendChild(colorGroup);

  container.appendChild(previewSection);
  container.appendChild(controlsSection);

  return container;
}

/**
 * Story principal - Todos los efectos
 */
export const Docs: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Effects - Elevation y Focus';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const description = document.createElement('p');
    description.textContent = 'Tokens para efectos visuales: elevation (sombras) y focus (anillos de enfoque). Los efectos de elevation tienen estados Default y Hover, mientras que focus tiene propiedades configurables.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);

    return container;
  },
};

/**
 * Story - Elevation
 */
export const Elevation: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Elevation - Sombras';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '24px';
    container.appendChild(title);

    // Default state
    const defaultSection = document.createElement('div');
    defaultSection.style.marginBottom = '40px';

    const defaultTitle = document.createElement('h3');
    defaultTitle.textContent = 'Default';
    defaultTitle.style.fontSize = '20px';
    defaultTitle.style.fontWeight = '600';
    defaultTitle.style.marginBottom = '16px';
    defaultTitle.style.color = '#303a47';
    defaultSection.appendChild(defaultTitle);

    // Default shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.12)
    const defaultPreview = createShadowPreview('Default', '0px 1px 2px 0px rgba(0, 0, 0, 0.12)', 0, 1, 2, 0, 'rgba(0, 0, 0, 0.12)');
    defaultSection.appendChild(defaultPreview);

    container.appendChild(defaultSection);

    // Hover state
    const hoverSection = document.createElement('div');
    hoverSection.style.marginBottom = '40px';

    const hoverTitle = document.createElement('h3');
    hoverTitle.textContent = 'Hover';
    hoverTitle.style.fontSize = '20px';
    hoverTitle.style.fontWeight = '600';
    hoverTitle.style.marginBottom = '16px';
    hoverTitle.style.color = '#303a47';
    hoverSection.appendChild(hoverTitle);

    // Hover shadow: similar pero más pronunciada
    const hoverPreview = createShadowPreview('Hover', '0px 2px 4px 0px rgba(0, 0, 0, 0.16)', 0, 2, 4, 0, 'rgba(0, 0, 0, 0.16)');
    hoverSection.appendChild(hoverPreview);

    container.appendChild(hoverSection);

    // Tokens existentes
    const tokensSection = document.createElement('div');
    tokensSection.style.marginTop = '40px';
    tokensSection.style.padding = '20px';
    tokensSection.style.backgroundColor = '#f9fafb';
    tokensSection.style.border = '1px solid #e5e7eb';
    tokensSection.style.borderRadius = '12px';

    const tokensTitle = document.createElement('h3');
    tokensTitle.textContent = 'Tokens Existentes';
    tokensTitle.style.fontSize = '18px';
    tokensTitle.style.fontWeight = '600';
    tokensTitle.style.marginBottom = '16px';
    tokensTitle.style.color = '#303a47';
    tokensSection.appendChild(tokensTitle);

    const tokensList = document.createElement('div');
    tokensList.style.display = 'flex';
    tokensList.style.flexDirection = 'column';
    tokensList.style.gap = '12px';

    // Token de shadow opacity
    const shadowToken = createColorSwatch('--modifiers-normal-effects-elevation-overlay', 'light', {
      showVariable: true,
      showValue: true,
      width: '100%'
    });
    tokensList.appendChild(shadowToken);

    tokensSection.appendChild(tokensList);
    container.appendChild(tokensSection);

    return container;
  },
};

/**
 * Story - Focus
 */
export const Focus: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Focus - Anillos de Enfoque';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '24px';
    container.appendChild(title);

    // Focus preview
    const focusSection = document.createElement('div');
    focusSection.style.marginBottom = '40px';

    const focusPreview = createShadowPreview('Focus', '0px 0px 0px 4px rgba(82, 151, 244, 0.3)', 0, 0, 0, 4, 'rgba(82, 151, 244, 0.3)');
    focusSection.appendChild(focusPreview);

    container.appendChild(focusSection);

    // Token existente
    const tokensSection = document.createElement('div');
    tokensSection.style.marginTop = '40px';
    tokensSection.style.padding = '20px';
    tokensSection.style.backgroundColor = '#f9fafb';
    tokensSection.style.border = '1px solid #e5e7eb';
    tokensSection.style.borderRadius = '12px';

    const tokensTitle = document.createElement('h3');
    tokensTitle.textContent = 'Tokens Existentes';
    tokensTitle.style.fontSize = '18px';
    tokensTitle.style.fontWeight = '600';
    tokensTitle.style.marginBottom = '16px';
    tokensTitle.style.color = '#303a47';
    tokensSection.appendChild(tokensTitle);

    const tokensList = document.createElement('div');
    tokensList.style.display = 'flex';
    tokensList.style.flexDirection = 'column';
    tokensList.style.gap = '12px';

    // Token de focus ring
    const focusToken = createColorSwatch('--modifiers-normal-focus-color', 'light', {
      showVariable: true,
      showValue: true,
      width: '100%'
    });
    tokensList.appendChild(focusToken);

    tokensSection.appendChild(tokensList);
    container.appendChild(tokensSection);

    return container;
  },
};

/**
 * Story - Interactive (Elevation con estados Default y Hover)
 */
export const Interactive: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Interactive - Elevation States';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '24px';
    container.appendChild(title);

    const description = document.createElement('p');
    description.textContent = 'Estados interactivos de elevation: Default y Hover. Cada estado tiene sus propias propiedades de sombra configurables.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);

    // Default state
    const defaultSection = document.createElement('div');
    defaultSection.style.marginBottom = '40px';

    const defaultTitle = document.createElement('h3');
    defaultTitle.textContent = 'Default';
    defaultTitle.style.fontSize = '20px';
    defaultTitle.style.fontWeight = '600';
    defaultTitle.style.marginBottom = '16px';
    defaultTitle.style.color = '#303a47';
    defaultSection.appendChild(defaultTitle);

    const defaultPreview = createShadowPreview('Default', '0px 1px 2px 0px rgba(0, 0, 0, 0.12)', 0, 1, 2, 0, 'rgba(0, 0, 0, 0.12)');
    defaultSection.appendChild(defaultPreview);

    container.appendChild(defaultSection);

    // Hover state
    const hoverSection = document.createElement('div');
    hoverSection.style.marginBottom = '40px';

    const hoverTitle = document.createElement('h3');
    hoverTitle.textContent = 'Hover';
    hoverTitle.style.fontSize = '20px';
    hoverTitle.style.fontWeight = '600';
    hoverTitle.style.marginBottom = '16px';
    hoverTitle.style.color = '#303a47';
    hoverSection.appendChild(hoverTitle);

    const hoverPreview = createShadowPreview('Hover', '0px 2px 4px 0px rgba(0, 0, 0, 0.16)', 0, 2, 4, 0, 'rgba(0, 0, 0, 0.16)');
    hoverSection.appendChild(hoverPreview);

    container.appendChild(hoverSection);

    return container;
  },
};

/**
 * Story - Floating (Elevation flotante con tokens de Figma)
 */
export const Floating: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Floating - Elevacion Flotante';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '24px';
    container.appendChild(title);

    const description = document.createElement('p');
    description.textContent = 'Elevacion flotante construida con tokens de Figma. Usa dos sombras combinadas (floating-0 y floating-1) para crear un efecto de profundidad.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);

    // Obtener valores de tokens de Figma
    const root = document.documentElement;
    const getToken = (token: string): string => {
      return getComputedStyle(root).getPropertyValue(token).trim();
    };

    const floating0X = parseFloat(getToken('--modifiers-normal-elevation-floating-0-x')) || 0;
    const floating0Y = parseFloat(getToken('--modifiers-normal-elevation-floating-0-y')) || 14;
    const floating0Blur = parseFloat(getToken('--modifiers-normal-elevation-floating-0-blur')) || 28.8;
    const floating0Spread = parseFloat(getToken('--modifiers-normal-elevation-floating-0-spread')) || 0;
    const floating0Color = getToken('--modifiers-normal-elevation-floating-0-color') || '#0000003d';

    const floating1X = parseFloat(getToken('--modifiers-normal-elevation-floating-1-x')) || 0;
    const floating1Y = parseFloat(getToken('--modifiers-normal-elevation-floating-1-y')) || 0;
    const floating1Blur = parseFloat(getToken('--modifiers-normal-elevation-floating-1-blur')) || 8;
    const floating1Spread = parseFloat(getToken('--modifiers-normal-elevation-floating-1-spread')) || 0;
    const floating1Color = getToken('--modifiers-normal-elevation-floating-1-color') || '#00000033';

    // Construir sombra combinada
    const shadow0 = `${floating0X}px ${floating0Y}px ${floating0Blur}px ${floating0Spread}px ${floating0Color}`;
    const shadow1 = `${floating1X}px ${floating1Y}px ${floating1Blur}px ${floating1Spread}px ${floating1Color}`;
    const combinedShadow = `${shadow0}, ${shadow1}`;

    // Preview principal
    const floatingSection = document.createElement('div');
    floatingSection.style.marginBottom = '40px';

    const floatingTitle = document.createElement('h3');
    floatingTitle.textContent = 'Floating';
    floatingTitle.style.fontSize = '20px';
    floatingTitle.style.fontWeight = '600';
    floatingTitle.style.marginBottom = '16px';
    floatingTitle.style.color = '#303a47';
    floatingSection.appendChild(floatingTitle);

    // Crear preview con los valores de los tokens
    const floatingPreview = createShadowPreview('Floating', combinedShadow, floating0X, floating0Y, floating0Blur, floating0Spread, floating0Color);
    floatingSection.appendChild(floatingPreview);

    container.appendChild(floatingSection);

    // Tokens de Figma
    const tokensSection = document.createElement('div');
    tokensSection.style.marginTop = '40px';
    tokensSection.style.padding = '20px';
    tokensSection.style.backgroundColor = '#f9fafb';
    tokensSection.style.border = '1px solid #e5e7eb';
    tokensSection.style.borderRadius = '12px';

    const tokensTitle = document.createElement('h3');
    tokensTitle.textContent = 'Tokens de Figma';
    tokensTitle.style.fontSize = '18px';
    tokensTitle.style.fontWeight = '600';
    tokensTitle.style.marginBottom = '16px';
    tokensTitle.style.color = '#303a47';
    tokensSection.appendChild(tokensTitle);

    const tokensList = document.createElement('div');
    tokensList.style.display = 'flex';
    tokensList.style.flexDirection = 'column';
    tokensList.style.gap = '12px';

    // Tokens floating-0
    const floating0Tokens = [
      '--modifiers-normal-elevation-floating-0-x',
      '--modifiers-normal-elevation-floating-0-y',
      '--modifiers-normal-elevation-floating-0-blur',
      '--modifiers-normal-elevation-floating-0-spread',
      '--modifiers-normal-elevation-floating-0-color'
    ];

    floating0Tokens.forEach(token => {
      const tokenElement = createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      });
      tokensList.appendChild(tokenElement);
    });

    // Tokens floating-1
    const floating1Tokens = [
      '--modifiers-normal-elevation-floating-1-x',
      '--modifiers-normal-elevation-floating-1-y',
      '--modifiers-normal-elevation-floating-1-blur',
      '--modifiers-normal-elevation-floating-1-spread',
      '--modifiers-normal-elevation-floating-1-color'
    ];

    floating1Tokens.forEach(token => {
      const tokenElement = createColorSwatch(token, 'light', {
        showVariable: true,
        showValue: true,
        width: '100%'
      });
      tokensList.appendChild(tokenElement);
    });

    tokensSection.appendChild(tokensList);
    container.appendChild(tokensSection);

    return container;
  },
};

