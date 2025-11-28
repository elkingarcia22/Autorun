/**
 * Tokens UBITS - Componentes
 * 
 * Tokens especificos de componentes:
 * - Button Tone (brand, success, error, warning, info) - Usa modificadores con valores correctos
 * - AI Button - Tokens para botones de IA con gradientes
 * - Scroll Bar
 * - Toggle
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createLightDarkComparison, createColorSwatch } from './utils';

const meta: Meta = {
  title: 'Tokens UBITS/03. Componentes',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tokens específicos de componentes del sistema UBITS. Incluye tokens para botones (button-tone), scroll bar y toggle. Los tokens de button-tone usan modificadores con valores correctos.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Tokens de componentes organizados por categoria
// NOTA: Los tokens de button-tone usan los modificadores porque los tokens base tienen valores casi negros
const COMPONENT_TOKENS = {
  'button-tone': {
    brand: {
      primary: {
        light: [
          '--modifiers-normal-button-color-light-brand-primary-bg-default',
          '--modifiers-normal-button-color-light-brand-primary-bg-hover',
          '--modifiers-normal-button-color-light-brand-primary-bg-pressed',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-brand-primary-bg-default',
          '--modifiers-normal-button-color-dark-brand-primary-bg-hover',
          '--modifiers-normal-button-color-dark-brand-primary-bg-pressed',
        ],
      },
      secondary: {
        light: [
          '--modifiers-normal-button-color-light-brand-secondary-fg-default',
          '--modifiers-normal-button-color-light-brand-secondary-fg-hover',
          '--modifiers-normal-button-color-light-brand-secondary-bg-default',
          '--modifiers-normal-button-color-light-brand-secondary-bg-hover',
          '--modifiers-normal-button-color-light-brand-secondary-bg-pressed',
          '--modifiers-normal-button-color-light-brand-secondary-border',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-brand-secondary-fg-default',
          '--modifiers-normal-button-color-dark-brand-secondary-fg-hover',
          '--modifiers-normal-button-color-dark-brand-secondary-bg-default',
          '--modifiers-normal-button-color-dark-brand-secondary-bg-hover',
          '--modifiers-normal-button-color-dark-brand-secondary-bg-pressed',
          '--modifiers-normal-button-color-dark-brand-secondary-border',
        ],
      },
      tertiary: {
        light: [
          '--modifiers-normal-button-color-light-brand-tertiary-fg',
          '--modifiers-normal-button-color-light-brand-tertiary-bg-hover',
          '--modifiers-normal-button-color-light-brand-tertiary-bg-pressed',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-brand-tertiary-fg',
          '--modifiers-normal-button-color-dark-brand-tertiary-bg-hover',
          '--modifiers-normal-button-color-dark-brand-tertiary-bg-pressed',
        ],
      },
    },
    success: {
      secondary: {
        light: [
          '--modifiers-normal-button-color-light-success-secondary-fg-default',
          '--modifiers-normal-button-color-light-success-secondary-fg-hover',
          '--modifiers-normal-button-color-light-success-secondary-bg-default',
          '--modifiers-normal-button-color-light-success-secondary-bg-hover',
          '--modifiers-normal-button-color-light-success-secondary-bg-pressed',
          '--modifiers-normal-button-color-light-success-secondary-border',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-success-secondary-fg-default',
          '--modifiers-normal-button-color-dark-success-secondary-fg-hover',
          '--modifiers-normal-button-color-dark-success-secondary-bg-default',
          '--modifiers-normal-button-color-dark-success-secondary-bg-hover',
          '--modifiers-normal-button-color-dark-success-secondary-bg-pressed',
          '--modifiers-normal-button-color-dark-success-secondary-border',
        ],
      },
      tertiary: {
        light: [
          '--modifiers-normal-button-color-light-success-tertiary-fg',
          '--modifiers-normal-button-color-light-success-tertiary-bg-hover',
          '--modifiers-normal-button-color-light-success-tertiary-bg-pressed',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-success-tertiary-fg',
          '--modifiers-normal-button-color-dark-success-tertiary-bg-hover',
          '--modifiers-normal-button-color-dark-success-tertiary-bg-pressed',
        ],
      },
    },
    error: {
      secondary: {
        light: [
          '--modifiers-normal-button-color-light-error-secondary-fg-default',
          '--modifiers-normal-button-color-light-error-secondary-fg-hover',
          '--modifiers-normal-button-color-light-error-secondary-bg-default',
          '--modifiers-normal-button-color-light-error-secondary-bg-hover',
          '--modifiers-normal-button-color-light-error-secondary-bg-pressed',
          '--modifiers-normal-button-color-light-error-secondary-border',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-error-secondary-fg-default',
          '--modifiers-normal-button-color-dark-error-secondary-fg-hover',
          '--modifiers-normal-button-color-dark-error-secondary-bg-default',
          '--modifiers-normal-button-color-dark-error-secondary-bg-hover',
          '--modifiers-normal-button-color-dark-error-secondary-bg-pressed',
          '--modifiers-normal-button-color-dark-error-secondary-border',
        ],
      },
      tertiary: {
        light: [
          '--modifiers-normal-button-color-light-error-tertiary-fg',
          '--modifiers-normal-button-color-light-error-tertiary-bg-hover',
          '--modifiers-normal-button-color-light-error-tertiary-bg-pressed',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-error-tertiary-fg',
          '--modifiers-normal-button-color-dark-error-tertiary-bg-hover',
          '--modifiers-normal-button-color-dark-error-tertiary-bg-pressed',
        ],
      },
    },
    warning: {
      secondary: {
        light: [
          '--modifiers-normal-button-color-light-warning-secondary-fg-default',
          '--modifiers-normal-button-color-light-warning-secondary-fg-hover',
          '--modifiers-normal-button-color-light-warning-secondary-bg-default',
          '--modifiers-normal-button-color-light-warning-secondary-bg-hover',
          '--modifiers-normal-button-color-light-warning-secondary-bg-pressed',
          '--modifiers-normal-button-color-light-warning-secondary-border',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-warning-secondary-fg-default',
          '--modifiers-normal-button-color-dark-warning-secondary-fg-hover',
          '--modifiers-normal-button-color-dark-warning-secondary-bg-default',
          '--modifiers-normal-button-color-dark-warning-secondary-bg-hover',
          '--modifiers-normal-button-color-dark-warning-secondary-bg-pressed',
          '--modifiers-normal-button-color-dark-warning-secondary-border',
        ],
      },
      tertiary: {
        light: [
          '--modifiers-normal-button-color-light-warning-tertiary-fg',
          '--modifiers-normal-button-color-light-warning-tertiary-bg-hover',
          '--modifiers-normal-button-color-light-warning-tertiary-bg-pressed',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-warning-tertiary-fg',
          '--modifiers-normal-button-color-dark-warning-tertiary-bg-hover',
          '--modifiers-normal-button-color-dark-warning-tertiary-bg-pressed',
        ],
      },
    },
    info: {
      secondary: {
        light: [
          '--modifiers-normal-button-color-light-info-secondary-fg-default',
          '--modifiers-normal-button-color-light-info-secondary-fg-hover',
          '--modifiers-normal-button-color-light-info-secondary-bg-default',
          '--modifiers-normal-button-color-light-info-secondary-bg-hover',
          '--modifiers-normal-button-color-light-info-secondary-bg-pressed',
          '--modifiers-normal-button-color-light-info-secondary-border',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-info-secondary-fg-default',
          '--modifiers-normal-button-color-dark-info-secondary-fg-hover',
          '--modifiers-normal-button-color-dark-info-secondary-bg-default',
          '--modifiers-normal-button-color-dark-info-secondary-bg-hover',
          '--modifiers-normal-button-color-dark-info-secondary-bg-pressed',
          '--modifiers-normal-button-color-dark-info-secondary-border',
        ],
      },
      tertiary: {
        light: [
          '--modifiers-normal-button-color-light-info-tertiary-fg',
          '--modifiers-normal-button-color-light-info-tertiary-bg-hover',
          '--modifiers-normal-button-color-light-info-tertiary-bg-pressed',
        ],
        dark: [
          '--modifiers-normal-button-color-dark-info-tertiary-fg',
          '--modifiers-normal-button-color-dark-info-tertiary-bg-hover',
          '--modifiers-normal-button-color-dark-info-tertiary-bg-pressed',
        ],
      },
    },
  },
  'ai-button': {
    light: [
      '--modifiers-normal-ai-button-color-light-secondary-accent-gradient-start',
      '--modifiers-normal-ai-button-color-light-secondary-accent-gradient-end',
      '--modifiers-normal-ai-button-primary-color-bg',
      '--modifiers-normal-ai-button-secondary-color-accent',
    ],
    dark: [
      '--modifiers-normal-ai-button-color-dark-secondary-accent-gradient-start',
      '--modifiers-normal-ai-button-color-dark-secondary-accent-gradient-end',
      '--modifiers-normal-ai-button-primary-color-bg',
      '--modifiers-normal-ai-button-secondary-color-accent',
    ],
  },
  'scroll-bar': [
    '--color-scroll-bar-color-bg-default',
    '--color-scroll-bar-color-bg-hover',
    '--color-scroll-bar-color-bg-dragged',
  ],
  'toggle': [
    '--modifiers-normal-toggle-color-light-bg-active',
    '--modifiers-normal-toggle-color-dark-bg-active',
  ],
} as const;

// Función helper para contar tokens de button-tone
function countButtonToneTokens(): number {
  let count = 0;
  Object.values(COMPONENT_TOKENS['button-tone']).forEach(tone => {
    Object.values(tone).forEach(variant => {
      count += variant.light.length + variant.dark.length;
    });
  });
  return count;
}

/**
 * Story principal que muestra todos los componentes
 */
export const TodosLosComponentes: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Componentes - Todos los Tokens';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const buttonToneCount = countButtonToneTokens();
    const aiButtonCount = COMPONENT_TOKENS['ai-button'].light.length + COMPONENT_TOKENS['ai-button'].dark.length;
    const totalCount = buttonToneCount + aiButtonCount + COMPONENT_TOKENS['scroll-bar'].length + COMPONENT_TOKENS['toggle'].length;

    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#f3f4f6';
    summary.style.border = '1px solid #d1d5db';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    
    const tones = Object.keys(COMPONENT_TOKENS['button-tone']);
    const toneCounts = tones.map(tone => {
      const toneData = COMPONENT_TOKENS['button-tone'][tone as keyof typeof COMPONENT_TOKENS['button-tone']];
      const primaryCount = (toneData.primary?.light.length || 0) + (toneData.primary?.dark.length || 0);
      const secondaryCount = (toneData.secondary?.light.length || 0) + (toneData.secondary?.dark.length || 0);
      const tertiaryCount = (toneData.tertiary?.light.length || 0) + (toneData.tertiary?.dark.length || 0);
      return `${tone}: ${primaryCount + secondaryCount + tertiaryCount} (primary: ${primaryCount}, secondary: ${secondaryCount}, tertiary: ${tertiaryCount})`;
    }).join(', ');
    
    summary.innerHTML = `
      <strong>Resumen:</strong><br>
      • Button Tone: ${buttonToneCount} tokens (${toneCounts})<br>
      • AI Button: ${aiButtonCount} tokens (${COMPONENT_TOKENS['ai-button'].light.length} Light + ${COMPONENT_TOKENS['ai-button'].dark.length} Dark)<br>
      • Scroll Bar: ${COMPONENT_TOKENS['scroll-bar'].length} tokens<br>
      • Toggle: ${COMPONENT_TOKENS['toggle'].length} tokens<br>
      <strong>Total: ${totalCount} tokens</strong>
    `;
    container.appendChild(summary);

    // Sección Button Tone
    const buttonToneSection = document.createElement('div');
    buttonToneSection.style.marginBottom = '40px';
    
    const buttonToneTitle = document.createElement('h3');
    buttonToneTitle.textContent = `Button Tone (${buttonToneCount} tokens)`;
    buttonToneTitle.style.fontSize = '20px';
    buttonToneTitle.style.fontWeight = '600';
    buttonToneTitle.style.marginBottom = '16px';
    buttonToneTitle.style.paddingBottom = '8px';
    buttonToneTitle.style.borderBottom = '2px solid #e5e7eb';
    buttonToneSection.appendChild(buttonToneTitle);

    Object.entries(COMPONENT_TOKENS['button-tone']).forEach(([tone, variants]) => {
      const toneSection = document.createElement('div');
      toneSection.style.marginBottom = '32px';

      const toneTitle = document.createElement('h4');
      const toneCount = Object.values(variants).reduce((sum, variant) => sum + variant.light.length + variant.dark.length, 0);
      toneTitle.textContent = `${tone.charAt(0).toUpperCase() + tone.slice(1)} (${toneCount} tokens)`;
      toneTitle.style.fontSize = '18px';
      toneTitle.style.fontWeight = '600';
      toneTitle.style.marginBottom = '16px';
      toneTitle.style.paddingBottom = '8px';
      toneTitle.style.borderBottom = '1px solid #e5e7eb';
      toneSection.appendChild(toneTitle);

      Object.entries(variants).forEach(([variant, modes]) => {
        const variantSection = document.createElement('div');
        variantSection.style.marginBottom = '24px';

        const variantTitle = document.createElement('h5');
        variantTitle.textContent = `${variant.charAt(0).toUpperCase() + variant.slice(1)} (${modes.light.length} Light + ${modes.dark.length} Dark)`;
        variantTitle.style.fontSize = '16px';
        variantTitle.style.fontWeight = '600';
        variantTitle.style.marginBottom = '12px';
        variantSection.appendChild(variantTitle);

        const comparison = document.createElement('div');
        comparison.style.display = 'grid';
        comparison.style.gridTemplateColumns = '1fr 1fr';
        comparison.style.gap = '16px';

        const lightCol = document.createElement('div');
        lightCol.style.background = '#ffffff';
        lightCol.style.border = '1px solid #e5e7eb';
        lightCol.style.borderRadius = '10px';
        lightCol.style.padding = '16px';
        const lightTitle = document.createElement('h6');
        lightTitle.textContent = 'Light Mode';
        lightTitle.style.fontSize = '14px';
        lightTitle.style.fontWeight = '600';
        lightTitle.style.marginBottom = '12px';
        lightCol.appendChild(lightTitle);
        modes.light.forEach(token => {
          lightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
        });
        comparison.appendChild(lightCol);

        const darkCol = document.createElement('div');
        darkCol.style.background = '#0E1825';
        darkCol.style.color = '#edeeef';
        darkCol.style.border = '1px solid #0E1825';
        darkCol.style.borderRadius = '10px';
        darkCol.style.padding = '16px';
        const darkTitle = document.createElement('h6');
        darkTitle.textContent = 'Dark Mode';
        darkTitle.style.fontSize = '14px';
        darkTitle.style.fontWeight = '600';
        darkTitle.style.marginBottom = '12px';
        darkTitle.style.color = '#edeeef';
        darkCol.appendChild(darkTitle);
        modes.dark.forEach(token => {
          darkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
        });
        comparison.appendChild(darkCol);

        variantSection.appendChild(comparison);
        toneSection.appendChild(variantSection);
      });

      buttonToneSection.appendChild(toneSection);
    });

    container.appendChild(buttonToneSection);

    // Sección AI Button
    const aiButtonSection = document.createElement('div');
    aiButtonSection.style.marginBottom = '40px';
    
    const aiButtonTitle = document.createElement('h3');
    aiButtonTitle.textContent = `AI Button (${aiButtonCount} tokens)`;
    aiButtonTitle.style.fontSize = '20px';
    aiButtonTitle.style.fontWeight = '600';
    aiButtonTitle.style.marginBottom = '16px';
    aiButtonTitle.style.paddingBottom = '8px';
    aiButtonTitle.style.borderBottom = '2px solid #e5e7eb';
    aiButtonSection.appendChild(aiButtonTitle);

    const aiButtonComparison = document.createElement('div');
    aiButtonComparison.style.display = 'grid';
    aiButtonComparison.style.gridTemplateColumns = '1fr 1fr';
    aiButtonComparison.style.gap = '16px';
    
    const aiButtonLightCol = document.createElement('div');
    aiButtonLightCol.style.background = '#ffffff';
    aiButtonLightCol.style.border = '1px solid #e5e7eb';
    aiButtonLightCol.style.borderRadius = '10px';
    aiButtonLightCol.style.padding = '16px';
    const aiButtonLightTitle = document.createElement('h5');
    aiButtonLightTitle.textContent = 'Light Mode';
    aiButtonLightTitle.style.fontSize = '14px';
    aiButtonLightTitle.style.fontWeight = '600';
    aiButtonLightTitle.style.marginBottom = '12px';
    aiButtonLightCol.appendChild(aiButtonLightTitle);
    COMPONENT_TOKENS['ai-button'].light.forEach(token => {
      aiButtonLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    aiButtonComparison.appendChild(aiButtonLightCol);
    
    const aiButtonDarkCol = document.createElement('div');
    aiButtonDarkCol.style.background = '#0E1825';
    aiButtonDarkCol.style.color = '#edeeef';
    aiButtonDarkCol.style.border = '1px solid #0E1825';
    aiButtonDarkCol.style.borderRadius = '10px';
    aiButtonDarkCol.style.padding = '16px';
    const aiButtonDarkTitle = document.createElement('h5');
    aiButtonDarkTitle.textContent = 'Dark Mode';
    aiButtonDarkTitle.style.fontSize = '14px';
    aiButtonDarkTitle.style.fontWeight = '600';
    aiButtonDarkTitle.style.marginBottom = '12px';
    aiButtonDarkTitle.style.color = '#edeeef';
    aiButtonDarkCol.appendChild(aiButtonDarkTitle);
    COMPONENT_TOKENS['ai-button'].dark.forEach(token => {
      aiButtonDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    aiButtonComparison.appendChild(aiButtonDarkCol);
    
    aiButtonSection.appendChild(aiButtonComparison);
    container.appendChild(aiButtonSection);

    // Sección Scroll Bar
    const scrollBarSection = document.createElement('div');
    scrollBarSection.style.marginBottom = '40px';
    
    const scrollBarTitle = document.createElement('h3');
    scrollBarTitle.textContent = `Scroll Bar (${COMPONENT_TOKENS['scroll-bar'].length} tokens)`;
    scrollBarTitle.style.fontSize = '20px';
    scrollBarTitle.style.fontWeight = '600';
    scrollBarTitle.style.marginBottom = '16px';
    scrollBarTitle.style.paddingBottom = '8px';
    scrollBarTitle.style.borderBottom = '2px solid #e5e7eb';
    scrollBarSection.appendChild(scrollBarTitle);

    const scrollBarComparison = createLightDarkComparison(COMPONENT_TOKENS['scroll-bar'], 'Scroll Bar');
    scrollBarSection.appendChild(scrollBarComparison);

    container.appendChild(scrollBarSection);

    // Sección Toggle
    const toggleSection = document.createElement('div');
    toggleSection.style.marginBottom = '40px';
    
    const toggleTitle = document.createElement('h3');
    toggleTitle.textContent = `Toggle (${COMPONENT_TOKENS['toggle'].length} tokens)`;
    toggleTitle.style.fontSize = '20px';
    toggleTitle.style.fontWeight = '600';
    toggleTitle.style.marginBottom = '16px';
    toggleTitle.style.paddingBottom = '8px';
    toggleTitle.style.borderBottom = '2px solid #e5e7eb';
    toggleSection.appendChild(toggleTitle);

    const toggleComparison = createLightDarkComparison(COMPONENT_TOKENS['toggle'], 'Toggle');
    toggleSection.appendChild(toggleComparison);

    container.appendChild(toggleSection);

    return container;
  },
};

/**
 * Story para Button Tone
 */
export const ButtonTone: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Button Tone';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    Object.entries(COMPONENT_TOKENS['button-tone']).forEach(([tone, variants]) => {
      const toneSection = document.createElement('div');
      toneSection.style.marginBottom = '32px';

      const toneTitle = document.createElement('h3');
      const toneCount = Object.values(variants).reduce((sum, variant) => sum + variant.light.length + variant.dark.length, 0);
      toneTitle.textContent = `${tone.charAt(0).toUpperCase() + tone.slice(1)} (${toneCount} tokens)`;
      toneTitle.style.fontSize = '20px';
      toneTitle.style.fontWeight = '600';
      toneTitle.style.marginBottom = '16px';
      toneTitle.style.paddingBottom = '8px';
      toneTitle.style.borderBottom = '2px solid #e5e7eb';
      toneSection.appendChild(toneTitle);

      Object.entries(variants).forEach(([variant, modes]) => {
        const variantSection = document.createElement('div');
        variantSection.style.marginBottom = '24px';

        const variantTitle = document.createElement('h4');
        variantTitle.textContent = `${variant.charAt(0).toUpperCase() + variant.slice(1)} (${modes.light.length} Light + ${modes.dark.length} Dark)`;
        variantTitle.style.fontSize = '18px';
        variantTitle.style.fontWeight = '600';
        variantTitle.style.marginBottom = '12px';
        variantSection.appendChild(variantTitle);

        const comparison = document.createElement('div');
        comparison.style.display = 'grid';
        comparison.style.gridTemplateColumns = '1fr 1fr';
        comparison.style.gap = '16px';

        const lightCol = document.createElement('div');
        lightCol.style.background = '#ffffff';
        lightCol.style.border = '1px solid #e5e7eb';
        lightCol.style.borderRadius = '10px';
        lightCol.style.padding = '16px';
        const lightTitle = document.createElement('h5');
        lightTitle.textContent = 'Light Mode';
        lightTitle.style.fontSize = '16px';
        lightTitle.style.fontWeight = '600';
        lightTitle.style.marginBottom = '12px';
        lightCol.appendChild(lightTitle);
        modes.light.forEach(token => {
          lightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
        });
        comparison.appendChild(lightCol);

        const darkCol = document.createElement('div');
        darkCol.style.background = '#0E1825';
        darkCol.style.color = '#edeeef';
        darkCol.style.border = '1px solid #0E1825';
        darkCol.style.borderRadius = '10px';
        darkCol.style.padding = '16px';
        const darkTitle = document.createElement('h5');
        darkTitle.textContent = 'Dark Mode';
        darkTitle.style.fontSize = '16px';
        darkTitle.style.fontWeight = '600';
        darkTitle.style.marginBottom = '12px';
        darkTitle.style.color = '#edeeef';
        darkCol.appendChild(darkTitle);
        modes.dark.forEach(token => {
          darkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
        });
        comparison.appendChild(darkCol);

        variantSection.appendChild(comparison);
        toneSection.appendChild(variantSection);
      });

      container.appendChild(toneSection);
    });

    return container;
  },
};

/**
 * Story para AI Button
 */
export const AIButton: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'AI Button';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const aiButtonCount = COMPONENT_TOKENS['ai-button'].light.length + COMPONENT_TOKENS['ai-button'].dark.length;
    const count = document.createElement('div');
    count.style.marginBottom = '16px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${aiButtonCount} tokens (${COMPONENT_TOKENS['ai-button'].light.length} Light + ${COMPONENT_TOKENS['ai-button'].dark.length} Dark)`;
    container.appendChild(count);

    const aiButtonComparison = document.createElement('div');
    aiButtonComparison.style.display = 'grid';
    aiButtonComparison.style.gridTemplateColumns = '1fr 1fr';
    aiButtonComparison.style.gap = '16px';
    
    const aiButtonLightCol = document.createElement('div');
    aiButtonLightCol.style.background = '#ffffff';
    aiButtonLightCol.style.border = '1px solid #e5e7eb';
    aiButtonLightCol.style.borderRadius = '10px';
    aiButtonLightCol.style.padding = '16px';
    const aiButtonLightTitle = document.createElement('h3');
    aiButtonLightTitle.textContent = 'Light Mode';
    aiButtonLightTitle.style.fontSize = '18px';
    aiButtonLightTitle.style.fontWeight = '600';
    aiButtonLightTitle.style.marginBottom = '12px';
    aiButtonLightCol.appendChild(aiButtonLightTitle);
    COMPONENT_TOKENS['ai-button'].light.forEach(token => {
      aiButtonLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    aiButtonComparison.appendChild(aiButtonLightCol);
    
    const aiButtonDarkCol = document.createElement('div');
    aiButtonDarkCol.style.background = '#0E1825';
    aiButtonDarkCol.style.color = '#edeeef';
    aiButtonDarkCol.style.border = '1px solid #0E1825';
    aiButtonDarkCol.style.borderRadius = '10px';
    aiButtonDarkCol.style.padding = '16px';
    const aiButtonDarkTitle = document.createElement('h3');
    aiButtonDarkTitle.textContent = 'Dark Mode';
    aiButtonDarkTitle.style.fontSize = '18px';
    aiButtonDarkTitle.style.fontWeight = '600';
    aiButtonDarkTitle.style.marginBottom = '12px';
    aiButtonDarkTitle.style.color = '#edeeef';
    aiButtonDarkCol.appendChild(aiButtonDarkTitle);
    COMPONENT_TOKENS['ai-button'].dark.forEach(token => {
      aiButtonDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    aiButtonComparison.appendChild(aiButtonDarkCol);
    
    container.appendChild(aiButtonComparison);

    return container;
  },
};

/**
 * Story para Scroll Bar
 */
export const ScrollBar: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Scroll Bar';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const count = document.createElement('div');
    count.style.marginBottom = '16px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${COMPONENT_TOKENS['scroll-bar'].length} tokens`;
    container.appendChild(count);

    const comparison = createLightDarkComparison(COMPONENT_TOKENS['scroll-bar'], 'Scroll Bar');
    container.appendChild(comparison);

    return container;
  },
};

/**
 * Story para Toggle
 */
export const Toggle: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Toggle';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const count = document.createElement('div');
    count.style.marginBottom = '16px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${COMPONENT_TOKENS['toggle'].length} tokens`;
    container.appendChild(count);

    const comparison = createLightDarkComparison(COMPONENT_TOKENS['toggle'], 'Toggle');
    container.appendChild(comparison);

    return container;
  },
};
