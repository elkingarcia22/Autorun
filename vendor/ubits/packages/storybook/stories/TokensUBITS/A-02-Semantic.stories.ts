/**
 * Tokens UBITS - Semánticos
 * 
 * Colores con significado semántico:
 * - Feedback (success, error, warning, info)
 * - Brand (marca UBITS)
 * - Chart (colores para gráficos)
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createLightDarkComparison, createColorSwatch } from './utils';
import { SEMANTIC_TOKENS } from './semantic-tokens';

const meta: Meta = {
  title: 'Tokens UBITS/02. Semánticos',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Colores semánticos del sistema UBITS. Incluye colores de feedback (success, error, warning, info), colores de marca (brand) y colores para gráficos (chart).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;


/**
 * Story principal que muestra todos los semánticos
 */
export const TodosLosSemanticos: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Semánticos - Todos los Tokens';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const feedbackCount = SEMANTIC_TOKENS.feedback.accent.light.length + 
                          SEMANTIC_TOKENS.feedback.border.light.length + 
                          SEMANTIC_TOKENS.feedback.chart.light.length;
    const brandCount = SEMANTIC_TOKENS.brand.light.length;
    const chartCount = SEMANTIC_TOKENS.chart.length;
    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#f3f4f6';
    summary.style.border = '1px solid #d1d5db';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    summary.innerHTML = `
      <strong>Resumen:</strong><br>
      • Feedback: ${feedbackCount} tokens (Light) + ${feedbackCount} tokens (Dark) = ${feedbackCount * 2} tokens total<br>
      • Brand: ${brandCount} tokens (Light) + ${brandCount} tokens (Dark) = ${brandCount * 2} tokens total<br>
      • Chart: ${chartCount} tokens<br>
      <strong>Total: ${feedbackCount * 2 + brandCount * 2 + chartCount} tokens</strong>
    `;
    container.appendChild(summary);

    // Sección Feedback
    const feedbackSection = document.createElement('div');
    feedbackSection.style.marginBottom = '40px';
    
    const feedbackTitle = document.createElement('h3');
    feedbackTitle.textContent = 'Feedback';
    feedbackTitle.style.fontSize = '20px';
    feedbackTitle.style.fontWeight = '600';
    feedbackTitle.style.marginBottom = '16px';
    feedbackTitle.style.paddingBottom = '8px';
    feedbackTitle.style.borderBottom = '2px solid #e5e7eb';
    feedbackSection.appendChild(feedbackTitle);

    // Feedback Accent
    const accentSection = document.createElement('div');
    accentSection.style.marginBottom = '24px';
    const accentTitle = document.createElement('h4');
    accentTitle.textContent = `Accent (${SEMANTIC_TOKENS.feedback.accent.light.length} tokens Light + ${SEMANTIC_TOKENS.feedback.accent.dark.length} tokens Dark)`;
    accentTitle.style.fontSize = '18px';
    accentTitle.style.fontWeight = '600';
    accentTitle.style.marginBottom = '12px';
    accentSection.appendChild(accentTitle);
    
    const accentComparison = document.createElement('div');
    accentComparison.style.display = 'grid';
    accentComparison.style.gridTemplateColumns = '1fr 1fr';
    accentComparison.style.gap = '16px';
    
    const accentLightCol = document.createElement('div');
    accentLightCol.style.background = '#ffffff';
    accentLightCol.style.border = '1px solid #e5e7eb';
    accentLightCol.style.borderRadius = '10px';
    accentLightCol.style.padding = '16px';
    const accentLightTitle = document.createElement('h5');
    accentLightTitle.textContent = 'Light Mode';
    accentLightTitle.style.fontSize = '14px';
    accentLightTitle.style.fontWeight = '600';
    accentLightTitle.style.marginBottom = '12px';
    accentLightCol.appendChild(accentLightTitle);
    SEMANTIC_TOKENS.feedback.accent.light.forEach(token => {
      accentLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    accentComparison.appendChild(accentLightCol);
    
    const accentDarkCol = document.createElement('div');
    accentDarkCol.style.background = '#0E1825';
    accentDarkCol.style.color = '#edeeef';
    accentDarkCol.style.border = '1px solid #0E1825';
    accentDarkCol.style.borderRadius = '10px';
    accentDarkCol.style.padding = '16px';
    const accentDarkTitle = document.createElement('h5');
    accentDarkTitle.textContent = 'Dark Mode';
    accentDarkTitle.style.fontSize = '14px';
    accentDarkTitle.style.fontWeight = '600';
    accentDarkTitle.style.marginBottom = '12px';
    accentDarkTitle.style.color = '#edeeef';
    accentDarkCol.appendChild(accentDarkTitle);
    SEMANTIC_TOKENS.feedback.accent.dark.forEach(token => {
      accentDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    accentComparison.appendChild(accentDarkCol);
    
    accentSection.appendChild(accentComparison);
    feedbackSection.appendChild(accentSection);

    // Feedback Border
    const borderSection = document.createElement('div');
    borderSection.style.marginBottom = '24px';
    const borderTitle = document.createElement('h4');
    borderTitle.textContent = `Border (${SEMANTIC_TOKENS.feedback.border.light.length} tokens Light + ${SEMANTIC_TOKENS.feedback.border.dark.length} tokens Dark)`;
    borderTitle.style.fontSize = '18px';
    borderTitle.style.fontWeight = '600';
    borderTitle.style.marginBottom = '12px';
    borderSection.appendChild(borderTitle);
    
    const borderComparison = document.createElement('div');
    borderComparison.style.display = 'grid';
    borderComparison.style.gridTemplateColumns = '1fr 1fr';
    borderComparison.style.gap = '16px';
    
    const borderLightCol = document.createElement('div');
    borderLightCol.style.background = '#ffffff';
    borderLightCol.style.border = '1px solid #e5e7eb';
    borderLightCol.style.borderRadius = '10px';
    borderLightCol.style.padding = '16px';
    const borderLightTitle = document.createElement('h5');
    borderLightTitle.textContent = 'Light Mode';
    borderLightTitle.style.fontSize = '14px';
    borderLightTitle.style.fontWeight = '600';
    borderLightTitle.style.marginBottom = '12px';
    borderLightCol.appendChild(borderLightTitle);
    SEMANTIC_TOKENS.feedback.border.light.forEach(token => {
      borderLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    borderComparison.appendChild(borderLightCol);
    
    const borderDarkCol = document.createElement('div');
    borderDarkCol.style.background = '#0E1825';
    borderDarkCol.style.color = '#edeeef';
    borderDarkCol.style.border = '1px solid #0E1825';
    borderDarkCol.style.borderRadius = '10px';
    borderDarkCol.style.padding = '16px';
    const borderDarkTitle = document.createElement('h5');
    borderDarkTitle.textContent = 'Dark Mode';
    borderDarkTitle.style.fontSize = '14px';
    borderDarkTitle.style.fontWeight = '600';
    borderDarkTitle.style.marginBottom = '12px';
    borderDarkTitle.style.color = '#edeeef';
    borderDarkCol.appendChild(borderDarkTitle);
    SEMANTIC_TOKENS.feedback.border.dark.forEach(token => {
      borderDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    borderComparison.appendChild(borderDarkCol);
    
    borderSection.appendChild(borderComparison);
    feedbackSection.appendChild(borderSection);

    // Feedback Chart
    const chartFeedbackSection = document.createElement('div');
    chartFeedbackSection.style.marginBottom = '24px';
    const chartFeedbackTitle = document.createElement('h4');
    chartFeedbackTitle.textContent = `Chart (${SEMANTIC_TOKENS.feedback.chart.light.length} tokens Light + ${SEMANTIC_TOKENS.feedback.chart.dark.length} tokens Dark)`;
    chartFeedbackTitle.style.fontSize = '18px';
    chartFeedbackTitle.style.fontWeight = '600';
    chartFeedbackTitle.style.marginBottom = '12px';
    chartFeedbackSection.appendChild(chartFeedbackTitle);
    
    const chartFeedbackComparison = document.createElement('div');
    chartFeedbackComparison.style.display = 'grid';
    chartFeedbackComparison.style.gridTemplateColumns = '1fr 1fr';
    chartFeedbackComparison.style.gap = '16px';
    
    const chartFeedbackLightCol = document.createElement('div');
    chartFeedbackLightCol.style.background = '#ffffff';
    chartFeedbackLightCol.style.border = '1px solid #e5e7eb';
    chartFeedbackLightCol.style.borderRadius = '10px';
    chartFeedbackLightCol.style.padding = '16px';
    const chartFeedbackLightTitle = document.createElement('h5');
    chartFeedbackLightTitle.textContent = 'Light Mode';
    chartFeedbackLightTitle.style.fontSize = '14px';
    chartFeedbackLightTitle.style.fontWeight = '600';
    chartFeedbackLightTitle.style.marginBottom = '12px';
    chartFeedbackLightCol.appendChild(chartFeedbackLightTitle);
    SEMANTIC_TOKENS.feedback.chart.light.forEach(token => {
      chartFeedbackLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    chartFeedbackComparison.appendChild(chartFeedbackLightCol);
    
    const chartFeedbackDarkCol = document.createElement('div');
    chartFeedbackDarkCol.style.background = '#0E1825';
    chartFeedbackDarkCol.style.color = '#edeeef';
    chartFeedbackDarkCol.style.border = '1px solid #0E1825';
    chartFeedbackDarkCol.style.borderRadius = '10px';
    chartFeedbackDarkCol.style.padding = '16px';
    const chartFeedbackDarkTitle = document.createElement('h5');
    chartFeedbackDarkTitle.textContent = 'Dark Mode';
    chartFeedbackDarkTitle.style.fontSize = '14px';
    chartFeedbackDarkTitle.style.fontWeight = '600';
    chartFeedbackDarkTitle.style.marginBottom = '12px';
    chartFeedbackDarkTitle.style.color = '#edeeef';
    chartFeedbackDarkCol.appendChild(chartFeedbackDarkTitle);
    SEMANTIC_TOKENS.feedback.chart.dark.forEach(token => {
      chartFeedbackDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    chartFeedbackComparison.appendChild(chartFeedbackDarkCol);
    
    chartFeedbackSection.appendChild(chartFeedbackComparison);
    feedbackSection.appendChild(chartFeedbackSection);

    container.appendChild(feedbackSection);

    // Sección Brand
    const brandSection = document.createElement('div');
    brandSection.style.marginBottom = '40px';
    
    const brandTitle = document.createElement('h3');
    brandTitle.textContent = `Brand (${SEMANTIC_TOKENS.brand.light.length} tokens Light + ${SEMANTIC_TOKENS.brand.dark.length} tokens Dark)`;
    brandTitle.style.fontSize = '20px';
    brandTitle.style.fontWeight = '600';
    brandTitle.style.marginBottom = '16px';
    brandTitle.style.paddingBottom = '8px';
    brandTitle.style.borderBottom = '2px solid #e5e7eb';
    brandSection.appendChild(brandTitle);

    const brandComparison = document.createElement('div');
    brandComparison.style.display = 'grid';
    brandComparison.style.gridTemplateColumns = '1fr 1fr';
    brandComparison.style.gap = '16px';
    
    const brandLightCol = document.createElement('div');
    brandLightCol.style.background = '#ffffff';
    brandLightCol.style.border = '1px solid #e5e7eb';
    brandLightCol.style.borderRadius = '10px';
    brandLightCol.style.padding = '16px';
    const brandLightTitle = document.createElement('h5');
    brandLightTitle.textContent = 'Light Mode';
    brandLightTitle.style.fontSize = '14px';
    brandLightTitle.style.fontWeight = '600';
    brandLightTitle.style.marginBottom = '12px';
    brandLightCol.appendChild(brandLightTitle);
    SEMANTIC_TOKENS.brand.light.forEach(token => {
      brandLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    brandComparison.appendChild(brandLightCol);
    
    const brandDarkCol = document.createElement('div');
    brandDarkCol.style.background = '#0E1825';
    brandDarkCol.style.color = '#edeeef';
    brandDarkCol.style.border = '1px solid #0E1825';
    brandDarkCol.style.borderRadius = '10px';
    brandDarkCol.style.padding = '16px';
    const brandDarkTitle = document.createElement('h5');
    brandDarkTitle.textContent = 'Dark Mode';
    brandDarkTitle.style.fontSize = '14px';
    brandDarkTitle.style.fontWeight = '600';
    brandDarkTitle.style.marginBottom = '12px';
    brandDarkTitle.style.color = '#edeeef';
    brandDarkCol.appendChild(brandDarkTitle);
    SEMANTIC_TOKENS.brand.dark.forEach(token => {
      brandDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    brandComparison.appendChild(brandDarkCol);
    
    brandSection.appendChild(brandComparison);

    container.appendChild(brandSection);

    // Sección Chart
    const chartSection = document.createElement('div');
    chartSection.style.marginBottom = '40px';
    
    const chartTitle = document.createElement('h3');
    chartTitle.textContent = `Chart (${SEMANTIC_TOKENS.chart.length} tokens)`;
    chartTitle.style.fontSize = '20px';
    chartTitle.style.fontWeight = '600';
    chartTitle.style.marginBottom = '16px';
    chartTitle.style.paddingBottom = '8px';
    chartTitle.style.borderBottom = '2px solid #e5e7eb';
    chartSection.appendChild(chartTitle);

    // Organizar Chart por tipo
    const organized: Record<string, string[]> = {
      'Foreground': [],
      'Blue': [],
      'Gray': [],
      'Yellow': [],
      'Green': [],
      'Teal': [],
      'Purple': [],
      'Pink': [],
      'Rose': [],
      'Neutral Blue': [],
      'Otros': [],
    };

    SEMANTIC_TOKENS.chart.forEach(token => {
      const lower = token.toLowerCase();
      if (lower.includes('fg')) {
        organized['Foreground'].push(token);
      } else if (lower.includes('neutral-blue')) {
        organized['Neutral Blue'].push(token);
      } else if (lower.includes('blue')) {
        organized['Blue'].push(token);
      } else if (lower.includes('gray')) {
        organized['Gray'].push(token);
      } else if (lower.includes('yellow')) {
        organized['Yellow'].push(token);
      } else if (lower.includes('green')) {
        organized['Green'].push(token);
      } else if (lower.includes('teal')) {
        organized['Teal'].push(token);
      } else if (lower.includes('purple')) {
        organized['Purple'].push(token);
      } else if (lower.includes('pink')) {
        organized['Pink'].push(token);
      } else if (lower.includes('rose')) {
        organized['Rose'].push(token);
      } else {
        organized['Otros'].push(token);
      }
    });

    Object.entries(organized).forEach(([categoryName, categoryTokens]) => {
      if (categoryTokens.length === 0) return;

      const section = document.createElement('div');
      section.style.marginBottom = '24px';

      const sectionTitle = document.createElement('h4');
      sectionTitle.textContent = `${categoryName} (${categoryTokens.length} tokens)`;
      sectionTitle.style.fontSize = '18px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '12px';
      section.appendChild(sectionTitle);

      const comparison = createLightDarkComparison(categoryTokens, categoryName);
      section.appendChild(comparison);

      chartSection.appendChild(section);
    });

    container.appendChild(chartSection);

    return container;
  },
};

/**
 * Story para Feedback
 */
export const Feedback: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Feedback Colors';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    // Accent
    const accentSection = document.createElement('div');
    accentSection.style.marginBottom = '32px';
    const accentTitle = document.createElement('h3');
    accentTitle.textContent = `Accent (${SEMANTIC_TOKENS.feedback.accent.light.length} tokens Light + ${SEMANTIC_TOKENS.feedback.accent.dark.length} tokens Dark)`;
    accentTitle.style.fontSize = '20px';
    accentTitle.style.fontWeight = '600';
    accentTitle.style.marginBottom = '16px';
    accentTitle.style.paddingBottom = '8px';
    accentTitle.style.borderBottom = '2px solid #e5e7eb';
    accentSection.appendChild(accentTitle);
    
    // Crear comparación manual con tokens light y dark correctos
    const accentComparison = document.createElement('div');
    accentComparison.style.display = 'grid';
    accentComparison.style.gridTemplateColumns = '1fr 1fr';
    accentComparison.style.gap = '16px';
    
    const accentLightCol = document.createElement('div');
    accentLightCol.style.background = '#ffffff';
    accentLightCol.style.border = '1px solid #e5e7eb';
    accentLightCol.style.borderRadius = '10px';
    accentLightCol.style.padding = '16px';
    const accentLightTitle = document.createElement('h4');
    accentLightTitle.textContent = 'Light Mode';
    accentLightTitle.style.fontSize = '16px';
    accentLightTitle.style.fontWeight = '600';
    accentLightTitle.style.marginBottom = '12px';
    accentLightCol.appendChild(accentLightTitle);
    SEMANTIC_TOKENS.feedback.accent.light.forEach(token => {
      accentLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    accentComparison.appendChild(accentLightCol);
    
    const accentDarkCol = document.createElement('div');
    accentDarkCol.style.background = '#0E1825';
    accentDarkCol.style.color = '#edeeef';
    accentDarkCol.style.border = '1px solid #0E1825';
    accentDarkCol.style.borderRadius = '10px';
    accentDarkCol.style.padding = '16px';
    const accentDarkTitle = document.createElement('h4');
    accentDarkTitle.textContent = 'Dark Mode';
    accentDarkTitle.style.fontSize = '16px';
    accentDarkTitle.style.fontWeight = '600';
    accentDarkTitle.style.marginBottom = '12px';
    accentDarkTitle.style.color = '#edeeef';
    accentDarkCol.appendChild(accentDarkTitle);
    SEMANTIC_TOKENS.feedback.accent.dark.forEach(token => {
      accentDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    accentComparison.appendChild(accentDarkCol);
    
    accentSection.appendChild(accentComparison);
    container.appendChild(accentSection);

    // Border
    const borderSection = document.createElement('div');
    borderSection.style.marginBottom = '32px';
    const borderTitle = document.createElement('h3');
    borderTitle.textContent = `Border (${SEMANTIC_TOKENS.feedback.border.light.length} tokens Light + ${SEMANTIC_TOKENS.feedback.border.dark.length} tokens Dark)`;
    borderTitle.style.fontSize = '20px';
    borderTitle.style.fontWeight = '600';
    borderTitle.style.marginBottom = '16px';
    borderTitle.style.paddingBottom = '8px';
    borderTitle.style.borderBottom = '2px solid #e5e7eb';
    borderSection.appendChild(borderTitle);
    
    const borderComparison = document.createElement('div');
    borderComparison.style.display = 'grid';
    borderComparison.style.gridTemplateColumns = '1fr 1fr';
    borderComparison.style.gap = '16px';
    
    const borderLightCol = document.createElement('div');
    borderLightCol.style.background = '#ffffff';
    borderLightCol.style.border = '1px solid #e5e7eb';
    borderLightCol.style.borderRadius = '10px';
    borderLightCol.style.padding = '16px';
    const borderLightTitle = document.createElement('h4');
    borderLightTitle.textContent = 'Light Mode';
    borderLightTitle.style.fontSize = '16px';
    borderLightTitle.style.fontWeight = '600';
    borderLightTitle.style.marginBottom = '12px';
    borderLightCol.appendChild(borderLightTitle);
    SEMANTIC_TOKENS.feedback.border.light.forEach(token => {
      borderLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    borderComparison.appendChild(borderLightCol);
    
    const borderDarkCol = document.createElement('div');
    borderDarkCol.style.background = '#0E1825';
    borderDarkCol.style.color = '#edeeef';
    borderDarkCol.style.border = '1px solid #0E1825';
    borderDarkCol.style.borderRadius = '10px';
    borderDarkCol.style.padding = '16px';
    const borderDarkTitle = document.createElement('h4');
    borderDarkTitle.textContent = 'Dark Mode';
    borderDarkTitle.style.fontSize = '16px';
    borderDarkTitle.style.fontWeight = '600';
    borderDarkTitle.style.marginBottom = '12px';
    borderDarkTitle.style.color = '#edeeef';
    borderDarkCol.appendChild(borderDarkTitle);
    SEMANTIC_TOKENS.feedback.border.dark.forEach(token => {
      borderDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    borderComparison.appendChild(borderDarkCol);
    
    borderSection.appendChild(borderComparison);
    container.appendChild(borderSection);

    // Chart
    const chartSection = document.createElement('div');
    chartSection.style.marginBottom = '32px';
    const chartTitle = document.createElement('h3');
    chartTitle.textContent = `Chart (${SEMANTIC_TOKENS.feedback.chart.light.length} tokens Light + ${SEMANTIC_TOKENS.feedback.chart.dark.length} tokens Dark)`;
    chartTitle.style.fontSize = '20px';
    chartTitle.style.fontWeight = '600';
    chartTitle.style.marginBottom = '16px';
    chartTitle.style.paddingBottom = '8px';
    chartTitle.style.borderBottom = '2px solid #e5e7eb';
    chartSection.appendChild(chartTitle);
    
    const chartComparison = document.createElement('div');
    chartComparison.style.display = 'grid';
    chartComparison.style.gridTemplateColumns = '1fr 1fr';
    chartComparison.style.gap = '16px';
    
    const chartLightCol = document.createElement('div');
    chartLightCol.style.background = '#ffffff';
    chartLightCol.style.border = '1px solid #e5e7eb';
    chartLightCol.style.borderRadius = '10px';
    chartLightCol.style.padding = '16px';
    const chartLightTitle = document.createElement('h4');
    chartLightTitle.textContent = 'Light Mode';
    chartLightTitle.style.fontSize = '16px';
    chartLightTitle.style.fontWeight = '600';
    chartLightTitle.style.marginBottom = '12px';
    chartLightCol.appendChild(chartLightTitle);
    SEMANTIC_TOKENS.feedback.chart.light.forEach(token => {
      chartLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    chartComparison.appendChild(chartLightCol);
    
    const chartDarkCol = document.createElement('div');
    chartDarkCol.style.background = '#0E1825';
    chartDarkCol.style.color = '#edeeef';
    chartDarkCol.style.border = '1px solid #0E1825';
    chartDarkCol.style.borderRadius = '10px';
    chartDarkCol.style.padding = '16px';
    const chartDarkTitle = document.createElement('h4');
    chartDarkTitle.textContent = 'Dark Mode';
    chartDarkTitle.style.fontSize = '16px';
    chartDarkTitle.style.fontWeight = '600';
    chartDarkTitle.style.marginBottom = '12px';
    chartDarkTitle.style.color = '#edeeef';
    chartDarkCol.appendChild(chartDarkTitle);
    SEMANTIC_TOKENS.feedback.chart.dark.forEach(token => {
      chartDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    chartComparison.appendChild(chartDarkCol);
    
    chartSection.appendChild(chartComparison);
    container.appendChild(chartSection);

    return container;
  },
};

/**
 * Story para Brand
 */
export const Brand: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Brand Colors';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const count = document.createElement('div');
    count.style.marginBottom = '16px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${SEMANTIC_TOKENS.brand.light.length} tokens Light + ${SEMANTIC_TOKENS.brand.dark.length} tokens Dark`;
    container.appendChild(count);

    const comparison = document.createElement('div');
    comparison.style.display = 'grid';
    comparison.style.gridTemplateColumns = '1fr 1fr';
    comparison.style.gap = '16px';
    
    const brandLightCol = document.createElement('div');
    brandLightCol.style.background = '#ffffff';
    brandLightCol.style.border = '1px solid #e5e7eb';
    brandLightCol.style.borderRadius = '10px';
    brandLightCol.style.padding = '16px';
    const brandLightTitle = document.createElement('h5');
    brandLightTitle.textContent = 'Light Mode';
    brandLightTitle.style.fontSize = '14px';
    brandLightTitle.style.fontWeight = '600';
    brandLightTitle.style.marginBottom = '12px';
    brandLightCol.appendChild(brandLightTitle);
    SEMANTIC_TOKENS.brand.light.forEach(token => {
      brandLightCol.appendChild(createColorSwatch(token, 'light', { showVariable: true, showValue: true, width: '100%' }));
    });
    comparison.appendChild(brandLightCol);
    
    const brandDarkCol = document.createElement('div');
    brandDarkCol.style.background = '#0E1825';
    brandDarkCol.style.color = '#edeeef';
    brandDarkCol.style.border = '1px solid #0E1825';
    brandDarkCol.style.borderRadius = '10px';
    brandDarkCol.style.padding = '16px';
    const brandDarkTitle = document.createElement('h5');
    brandDarkTitle.textContent = 'Dark Mode';
    brandDarkTitle.style.fontSize = '14px';
    brandDarkTitle.style.fontWeight = '600';
    brandDarkTitle.style.marginBottom = '12px';
    brandDarkTitle.style.color = '#edeeef';
    brandDarkCol.appendChild(brandDarkTitle);
    SEMANTIC_TOKENS.brand.dark.forEach(token => {
      brandDarkCol.appendChild(createColorSwatch(token, 'dark', { showVariable: true, showValue: true, width: '100%' }));
    });
    comparison.appendChild(brandDarkCol);
    
    container.appendChild(comparison);

    return container;
  },
};

/**
 * Story para Chart
 */
export const Chart: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Chart Colors';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const count = document.createElement('div');
    count.style.marginBottom = '16px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${SEMANTIC_TOKENS.chart.length} tokens`;
    container.appendChild(count);

    // Organizar por tipo
    const organized: Record<string, string[]> = {
      'Foreground': [],
      'Blue': [],
      'Gray': [],
      'Yellow': [],
      'Green': [],
      'Teal': [],
      'Purple': [],
      'Pink': [],
      'Rose': [],
      'Neutral Blue': [],
      'Otros': [],
    };

    SEMANTIC_TOKENS.chart.forEach(token => {
      const lower = token.toLowerCase();
      if (lower.includes('fg')) {
        organized['Foreground'].push(token);
      } else if (lower.includes('neutral-blue')) {
        organized['Neutral Blue'].push(token);
      } else if (lower.includes('blue')) {
        organized['Blue'].push(token);
      } else if (lower.includes('gray')) {
        organized['Gray'].push(token);
      } else if (lower.includes('yellow')) {
        organized['Yellow'].push(token);
      } else if (lower.includes('green')) {
        organized['Green'].push(token);
      } else if (lower.includes('teal')) {
        organized['Teal'].push(token);
      } else if (lower.includes('purple')) {
        organized['Purple'].push(token);
      } else if (lower.includes('pink')) {
        organized['Pink'].push(token);
      } else if (lower.includes('rose')) {
        organized['Rose'].push(token);
      } else {
        organized['Otros'].push(token);
      }
    });

    Object.entries(organized).forEach(([categoryName, categoryTokens]) => {
      if (categoryTokens.length === 0) return;

      const section = document.createElement('div');
      section.style.marginBottom = '32px';

      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = `${categoryName} (${categoryTokens.length} tokens)`;
      sectionTitle.style.fontSize = '20px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '16px';
      sectionTitle.style.paddingBottom = '8px';
      sectionTitle.style.borderBottom = '2px solid #e5e7eb';
      section.appendChild(sectionTitle);

      const comparison = createLightDarkComparison(categoryTokens, categoryName);
      section.appendChild(comparison);

      container.appendChild(section);
    });

    return container;
  },
};

