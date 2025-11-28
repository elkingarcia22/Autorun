/**
 * Tokens UBITS - Modificadores (.modifiers)
 * 
 * TODOS los colores del sistema con modificadores.
 * Esta es la categoría principal que contiene todos los tokens con Light/Dark mode.
 * 
 * Estructura:
 * - Normal (Light/Dark)
 * - Inverted (Light/Dark)
 * - Static (Light/Dark)
 * - Static Inverted (Light/Dark)
 * 
 * Cada modificador contiene TODOS los colores: accent, fg, bg, border, feedback, chart, button, etc.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createColorSwatch, createLightDarkComparison } from './utils';
import { extractColorTokens, organizeTokensByCategory, organizeTokensByCategoryAndState } from './token-extractor';

const meta: Meta = {
  title: 'Tokens UBITS/01. Modificadores (.modifiers)',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Todos los colores del sistema organizados por modificador. Cada modificador (Normal, Inverted, Static, Static Inverted) contiene todos los colores (accent, fg, bg, border, feedback, chart, button) organizados por modo Light/Dark. Esta es la categoría principal con 1296 tokens totales.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Extraer tokens de un modificador específico
 */
function getModifierTokens(modifier: 'normal' | 'inverted' | 'static' | 'static-inverted'): {
  light: string[];
  dark: string[];
} {
  // Intentar extraer dinámicamente
  let allTokens = extractColorTokens('modifiers');
  
  // Si no se pueden extraer, usar lista predefinida (se generará después)
  if (allTokens.length === 0) {
    // Por ahora retornar arrays vacíos, se llenarán con la extracción real
    return { light: [], dark: [] };
  }

  const lightTokens = allTokens.filter(t => 
    t.includes(`modifiers-${modifier}-color-light`)
  );
  
  const darkTokens = allTokens.filter(t => 
    t.includes(`modifiers-${modifier}-color-dark`)
  );

  return { light: lightTokens.sort(), dark: darkTokens.sort() };
}

/**
 * Story principal que muestra todos los modificadores
 */
export const TodosLosModificadores: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Modificadores (.modifiers) - Resumen';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#dbeafe';
    summary.style.border = '1px solid #3b82f6';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    summary.style.color = '#1e40af';
    summary.innerHTML = `
      <strong>📊 Resumen de Modificadores:</strong><br><br>
      • <strong>Normal</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Inverted</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Static</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br>
      • <strong>Static Inverted</strong>: 162 tokens Light + 162 tokens Dark = 324 tokens<br><br>
      <strong>Total: 1296 tokens</strong><br><br>
      Cada modificador contiene TODOS los colores del sistema: accent, fg, bg, border, feedback, chart, button, etc.
    `;
    container.appendChild(summary);

    const modifiers = ['normal', 'inverted', 'static', 'static-inverted'] as const;

    modifiers.forEach(modifier => {
      const section = document.createElement('div');
      section.style.marginBottom = '40px';
      section.style.padding = '20px';
      section.style.border = '1px solid #e5e7eb';
      section.style.borderRadius = '12px';
      section.style.backgroundColor = '#f9fafb';

      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = `${modifier.charAt(0).toUpperCase() + modifier.slice(1).replace('-', ' ')}`;
      sectionTitle.style.fontSize = '20px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '16px';
      sectionTitle.style.textTransform = 'capitalize';
      section.appendChild(sectionTitle);

      const tokens = getModifierTokens(modifier);
      const totalCount = tokens.light.length + tokens.dark.length;

      const count = document.createElement('div');
      count.style.marginBottom = '16px';
      count.style.fontSize = '16px';
      count.style.fontWeight = '600';
      count.textContent = `Total: ${totalCount} tokens (${tokens.light.length} Light + ${tokens.dark.length} Dark)`;
      section.appendChild(count);

      if (totalCount > 0) {
        // Organizar por categoría y estado (default, hover, pressed)
        const organizedLight = organizeTokensByCategoryAndState(tokens.light);
        const organizedDark = organizeTokensByCategoryAndState(tokens.dark);
        
        // Obtener todas las categorías únicas
        const allCategories = new Set([
          ...Object.keys(organizedLight),
          ...Object.keys(organizedDark)
        ]);

        allCategories.forEach(categoryName => {
          const lightCategory = organizedLight[categoryName] || {};
          const darkCategory = organizedDark[categoryName] || {};
          
          // Obtener todos los estados únicos
          const allStates = new Set([
            ...Object.keys(lightCategory),
            ...Object.keys(darkCategory)
          ]);

          if (allStates.size === 0) return;

          const categorySection = document.createElement('div');
          categorySection.style.marginBottom = '32px';

          // Calcular total de tokens en esta categoría
          const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
          const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);

          const categoryTitle = document.createElement('h4');
          categoryTitle.textContent = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (${lightTotal} Light + ${darkTotal} Dark = ${lightTotal + darkTotal} tokens)`;
          categoryTitle.style.fontSize = '16px';
          categoryTitle.style.fontWeight = '600';
          categoryTitle.style.marginBottom = '16px';
          categoryTitle.style.paddingBottom = '8px';
          categoryTitle.style.borderBottom = '2px solid #e5e7eb';
          categorySection.appendChild(categoryTitle);

          // Ordenar estados: base/default primero, luego hover, luego pressed
          const stateOrder = ['base', 'default', 'hover', 'pressed'];
          const sortedStates = Array.from(allStates).sort((a, b) => {
            const aIndex = stateOrder.indexOf(a);
            const bIndex = stateOrder.indexOf(b);
            if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
          });

          sortedStates.forEach(stateName => {
            const lightStateTokens = lightCategory[stateName] || [];
            const darkStateTokens = darkCategory[stateName] || [];
            
            if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;

            const stateSection = document.createElement('div');
            stateSection.style.marginBottom = '24px';
            stateSection.style.padding = '12px';
            stateSection.style.backgroundColor = '#f9fafb';
            stateSection.style.border = '1px solid #e5e7eb';
            stateSection.style.borderRadius = '8px';

            const stateTitle = document.createElement('h5');
            const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
            stateTitle.textContent = `${stateLabel} (${lightStateTokens.length} Light + ${darkStateTokens.length} Dark)`;
            stateTitle.style.fontSize = '14px';
            stateTitle.style.fontWeight = '600';
            stateTitle.style.marginBottom = '12px';
            stateTitle.style.color = '#303a47';
            stateSection.appendChild(stateTitle);

            // Crear comparación Light/Dark en dos columnas
            const comparison = document.createElement('div');
            comparison.style.display = 'grid';
            comparison.style.gridTemplateColumns = '1fr 1fr';
            comparison.style.gap = '12px';

            // Columna Light
            const lightCol = document.createElement('div');
            lightCol.style.background = '#ffffff';
            lightCol.style.border = '1px solid #e5e7eb';
            lightCol.style.borderRadius = '8px';
            lightCol.style.padding = '12px';

            const lightGrid = document.createElement('div');
            lightGrid.style.display = 'flex';
            lightGrid.style.flexDirection = 'column';
            lightGrid.style.gap = '6px';
            lightGrid.style.maxHeight = '400px';
            lightGrid.style.overflowY = 'auto';
            lightGrid.style.paddingRight = '8px';

            lightStateTokens.forEach(token => {
              lightGrid.appendChild(createColorSwatch(token, 'light', { 
                showVariable: true, 
                showValue: true,
                width: '100%'
              }));
            });

            if (lightStateTokens.length === 0) {
              const empty = document.createElement('div');
              empty.style.padding = '8px';
              empty.style.textAlign = 'center';
              empty.style.color = '#9ca3af';
              empty.style.fontSize = '12px';
              empty.textContent = 'No hay tokens';
              lightGrid.appendChild(empty);
            }

            lightCol.appendChild(lightGrid);
            comparison.appendChild(lightCol);

            // Columna Dark
            const darkCol = document.createElement('div');
            darkCol.style.background = '#0E1825';
            darkCol.style.color = '#edeeef';
            darkCol.style.border = '1px solid #0E1825';
            darkCol.style.borderRadius = '8px';
            darkCol.style.padding = '12px';

            const darkGrid = document.createElement('div');
            darkGrid.style.display = 'flex';
            darkGrid.style.flexDirection = 'column';
            darkGrid.style.gap = '6px';
            darkGrid.style.maxHeight = '400px';
            darkGrid.style.overflowY = 'auto';
            darkGrid.style.paddingRight = '8px';

            darkStateTokens.forEach(token => {
              darkGrid.appendChild(createColorSwatch(token, 'dark', { 
                showVariable: true, 
                showValue: true,
                width: '100%'
              }));
            });

            if (darkStateTokens.length === 0) {
              const empty = document.createElement('div');
              empty.style.padding = '8px';
              empty.style.textAlign = 'center';
              empty.style.color = '#9ca3af';
              empty.style.fontSize = '12px';
              empty.textContent = 'No hay tokens';
              darkGrid.appendChild(empty);
            }

            darkCol.appendChild(darkGrid);
            comparison.appendChild(darkCol);

            stateSection.appendChild(comparison);
            categorySection.appendChild(stateSection);
          });

          section.appendChild(categorySection);
        });
      } else {
        const note = document.createElement('div');
        note.style.padding = '12px';
        note.style.backgroundColor = '#fef3c7';
        note.style.border = '1px solid #fbbf24';
        note.style.borderRadius = '8px';
        note.style.fontSize = '14px';
        note.style.color = '#92400e';
        note.textContent = 'Los tokens se cargarán dinámicamente desde el CSS. Si no aparecen, verifica que figma-tokens.css esté importado.';
        section.appendChild(note);
      }

      container.appendChild(section);
    });

    return container;
  },
};

/**
 * Story para Normal
 */
export const Normal: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Normal - Todos los Colores';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const tokens = getModifierTokens('normal');
    const totalCount = tokens.light.length + tokens.dark.length;

    const count = document.createElement('div');
    count.style.marginBottom = '24px';
    count.style.padding = '12px';
    count.style.backgroundColor = '#f3f4f6';
    count.style.border = '1px solid #d1d5db';
    count.style.borderRadius = '8px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${totalCount} tokens (${tokens.light.length} Light + ${tokens.dark.length} Dark)`;
    container.appendChild(count);

    if (totalCount > 0) {
      // Organizar por categoría y estado (default, hover, pressed)
      const organizedLight = organizeTokensByCategoryAndState(tokens.light);
      const organizedDark = organizeTokensByCategoryAndState(tokens.dark);
      
      // Obtener todas las categorías únicas
      const allCategories = new Set([
        ...Object.keys(organizedLight),
        ...Object.keys(organizedDark)
      ]);

      allCategories.forEach(categoryName => {
        const lightCategory = organizedLight[categoryName] || {};
        const darkCategory = organizedDark[categoryName] || {};
        
        // Obtener todos los estados únicos
        const allStates = new Set([
          ...Object.keys(lightCategory),
          ...Object.keys(darkCategory)
        ]);

        if (allStates.size === 0) return;

        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';

        // Calcular total de tokens en esta categoría
        const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);

        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (${lightTotal} Light + ${darkTotal} Dark)`;
        sectionTitle.style.fontSize = '20px';
        sectionTitle.style.fontWeight = '600';
        sectionTitle.style.marginBottom = '16px';
        sectionTitle.style.paddingBottom = '8px';
        sectionTitle.style.borderBottom = '2px solid #e5e7eb';
        categorySection.appendChild(sectionTitle);

        // Ordenar estados: base/default primero, luego hover, luego pressed
        const stateOrder = ['base', 'default', 'hover', 'pressed'];
        const sortedStates = Array.from(allStates).sort((a, b) => {
          const aIndex = stateOrder.indexOf(a);
          const bIndex = stateOrder.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        sortedStates.forEach(stateName => {
          const lightStateTokens = lightCategory[stateName] || [];
          const darkStateTokens = darkCategory[stateName] || [];
          
          if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;

          const stateSection = document.createElement('div');
          stateSection.style.marginBottom = '24px';
          stateSection.style.padding = '12px';
          stateSection.style.backgroundColor = '#f9fafb';
          stateSection.style.border = '1px solid #e5e7eb';
          stateSection.style.borderRadius = '8px';

          const stateTitle = document.createElement('h4');
          const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
          stateTitle.textContent = `${stateLabel} (${lightStateTokens.length} Light + ${darkStateTokens.length} Dark)`;
          stateTitle.style.fontSize = '16px';
          stateTitle.style.fontWeight = '600';
          stateTitle.style.marginBottom = '12px';
          stateTitle.style.color = '#303a47';
          stateSection.appendChild(stateTitle);

          // Crear comparación Light/Dark en dos columnas
          const comparison = document.createElement('div');
          comparison.style.display = 'grid';
          comparison.style.gridTemplateColumns = '1fr 1fr';
          comparison.style.gap = '12px';

          // Columna Light
          const lightCol = document.createElement('div');
          lightCol.style.background = '#ffffff';
          lightCol.style.border = '1px solid #e5e7eb';
          lightCol.style.borderRadius = '8px';
          lightCol.style.padding = '12px';

          const lightGrid = document.createElement('div');
          lightGrid.style.display = 'flex';
          lightGrid.style.flexDirection = 'column';
          lightGrid.style.gap = '6px';
          lightGrid.style.maxHeight = '400px';
          lightGrid.style.overflowY = 'auto';
          lightGrid.style.paddingRight = '8px';

          lightStateTokens.forEach(token => {
            lightGrid.appendChild(createColorSwatch(token, 'light', { 
              showVariable: true, 
              showValue: true,
              width: '100%'
            }));
          });

          if (lightStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            lightGrid.appendChild(empty);
          }

          lightCol.appendChild(lightGrid);
          comparison.appendChild(lightCol);

          // Columna Dark
          const darkCol = document.createElement('div');
          darkCol.style.background = '#0E1825';
          darkCol.style.color = '#edeeef';
          darkCol.style.border = '1px solid #0E1825';
          darkCol.style.borderRadius = '8px';
          darkCol.style.padding = '12px';

          const darkGrid = document.createElement('div');
          darkGrid.style.display = 'flex';
          darkGrid.style.flexDirection = 'column';
          darkGrid.style.gap = '6px';
          darkGrid.style.maxHeight = '400px';
          darkGrid.style.overflowY = 'auto';
          darkGrid.style.paddingRight = '8px';

          darkStateTokens.forEach(token => {
            darkGrid.appendChild(createColorSwatch(token, 'dark', { 
              showVariable: true, 
              showValue: true,
              width: '100%'
            }));
          });

          if (darkStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            darkGrid.appendChild(empty);
          }

          darkCol.appendChild(darkGrid);
          comparison.appendChild(darkCol);

          stateSection.appendChild(comparison);
          categorySection.appendChild(stateSection);
        });

        container.appendChild(categorySection);
      });
    }

    return container;
  },
};

/**
 * Story para Inverted
 */
export const Inverted: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Inverted - Todos los Colores';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const tokens = getModifierTokens('inverted');
    const totalCount = tokens.light.length + tokens.dark.length;

    const count = document.createElement('div');
    count.style.marginBottom = '24px';
    count.style.padding = '12px';
    count.style.backgroundColor = '#f3f4f6';
    count.style.border = '1px solid #d1d5db';
    count.style.borderRadius = '8px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${totalCount} tokens (${tokens.light.length} Light + ${tokens.dark.length} Dark)`;
    container.appendChild(count);

    if (totalCount > 0) {
      // Organizar por categoría y estado (default, hover, pressed)
      const organizedLight = organizeTokensByCategoryAndState(tokens.light);
      const organizedDark = organizeTokensByCategoryAndState(tokens.dark);
      
      const allCategories = new Set([
        ...Object.keys(organizedLight),
        ...Object.keys(organizedDark)
      ]);

      allCategories.forEach(categoryName => {
        const lightCategory = organizedLight[categoryName] || {};
        const darkCategory = organizedDark[categoryName] || {};
        
        // Obtener todos los estados únicos
        const allStates = new Set([
          ...Object.keys(lightCategory),
          ...Object.keys(darkCategory)
        ]);

        if (allStates.size === 0) return;

        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';

        // Calcular total de tokens en esta categoría
        const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);

        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (${lightTotal} Light + ${darkTotal} Dark)`;
        sectionTitle.style.fontSize = '20px';
        sectionTitle.style.fontWeight = '600';
        sectionTitle.style.marginBottom = '16px';
        sectionTitle.style.paddingBottom = '8px';
        sectionTitle.style.borderBottom = '2px solid #e5e7eb';
        categorySection.appendChild(sectionTitle);

        // Ordenar estados: base/default primero, luego hover, luego pressed
        const stateOrder = ['base', 'default', 'hover', 'pressed'];
        const sortedStates = Array.from(allStates).sort((a, b) => {
          const aIndex = stateOrder.indexOf(a);
          const bIndex = stateOrder.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        sortedStates.forEach(stateName => {
          const lightStateTokens = lightCategory[stateName] || [];
          const darkStateTokens = darkCategory[stateName] || [];
          
          if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;

          const stateSection = document.createElement('div');
          stateSection.style.marginBottom = '24px';
          stateSection.style.padding = '12px';
          stateSection.style.backgroundColor = '#f9fafb';
          stateSection.style.border = '1px solid #e5e7eb';
          stateSection.style.borderRadius = '8px';

          const stateTitle = document.createElement('h4');
          const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
          stateTitle.textContent = `${stateLabel} (${lightStateTokens.length} Light + ${darkStateTokens.length} Dark)`;
          stateTitle.style.fontSize = '16px';
          stateTitle.style.fontWeight = '600';
          stateTitle.style.marginBottom = '12px';
          stateTitle.style.color = '#303a47';
          stateSection.appendChild(stateTitle);

          // Crear comparación Light/Dark en dos columnas
          const comparison = document.createElement('div');
          comparison.style.display = 'grid';
          comparison.style.gridTemplateColumns = '1fr 1fr';
          comparison.style.gap = '12px';

          // Columna Light
          const lightCol = document.createElement('div');
          lightCol.style.background = '#ffffff';
          lightCol.style.border = '1px solid #e5e7eb';
          lightCol.style.borderRadius = '8px';
          lightCol.style.padding = '12px';

          const lightGrid = document.createElement('div');
          lightGrid.style.display = 'flex';
          lightGrid.style.flexDirection = 'column';
          lightGrid.style.gap = '6px';
          lightGrid.style.maxHeight = '400px';
          lightGrid.style.overflowY = 'auto';
          lightGrid.style.paddingRight = '8px';

          lightStateTokens.forEach(token => {
            lightGrid.appendChild(createColorSwatch(token, 'light', { 
              showVariable: true, 
              showValue: true,
              width: '100%'
            }));
          });

          if (lightStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            lightGrid.appendChild(empty);
          }

          lightCol.appendChild(lightGrid);
          comparison.appendChild(lightCol);

          // Columna Dark
          const darkCol = document.createElement('div');
          darkCol.style.background = '#0E1825';
          darkCol.style.color = '#edeeef';
          darkCol.style.border = '1px solid #0E1825';
          darkCol.style.borderRadius = '8px';
          darkCol.style.padding = '12px';

          const darkGrid = document.createElement('div');
          darkGrid.style.display = 'flex';
          darkGrid.style.flexDirection = 'column';
          darkGrid.style.gap = '6px';
          darkGrid.style.maxHeight = '400px';
          darkGrid.style.overflowY = 'auto';
          darkGrid.style.paddingRight = '8px';

          darkStateTokens.forEach(token => {
            darkGrid.appendChild(createColorSwatch(token, 'dark', { 
              showVariable: true, 
              showValue: true,
              width: '100%'
            }));
          });

          if (darkStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            darkGrid.appendChild(empty);
          }

          darkCol.appendChild(darkGrid);
          comparison.appendChild(darkCol);

          stateSection.appendChild(comparison);
          categorySection.appendChild(stateSection);
        });

        container.appendChild(categorySection);
      });
    }

    return container;
  },
};

/**
 * Story para Static
 */
export const Static: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Static - Todos los Colores';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const tokens = getModifierTokens('static');
    const totalCount = tokens.light.length + tokens.dark.length;

    const count = document.createElement('div');
    count.style.marginBottom = '24px';
    count.style.padding = '12px';
    count.style.backgroundColor = '#f3f4f6';
    count.style.border = '1px solid #d1d5db';
    count.style.borderRadius = '8px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${totalCount} tokens (${tokens.light.length} Light + ${tokens.dark.length} Dark)`;
    container.appendChild(count);

    if (totalCount > 0) {
      // Organizar por categoría y estado (default, hover, pressed)
      const organizedLight = organizeTokensByCategoryAndState(tokens.light);
      const organizedDark = organizeTokensByCategoryAndState(tokens.dark);
      
      const allCategories = new Set([
        ...Object.keys(organizedLight),
        ...Object.keys(organizedDark)
      ]);

      allCategories.forEach(categoryName => {
        const lightCategory = organizedLight[categoryName] || {};
        const darkCategory = organizedDark[categoryName] || {};
        
        // Obtener todos los estados únicos
        const allStates = new Set([
          ...Object.keys(lightCategory),
          ...Object.keys(darkCategory)
        ]);

        if (allStates.size === 0) return;

        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';

        // Calcular total de tokens en esta categoría
        const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);

        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (${lightTotal} Light + ${darkTotal} Dark)`;
        sectionTitle.style.fontSize = '20px';
        sectionTitle.style.fontWeight = '600';
        sectionTitle.style.marginBottom = '16px';
        sectionTitle.style.paddingBottom = '8px';
        sectionTitle.style.borderBottom = '2px solid #e5e7eb';
        categorySection.appendChild(sectionTitle);

        // Ordenar estados: base/default primero, luego hover, luego pressed
        const stateOrder = ['base', 'default', 'hover', 'pressed'];
        const sortedStates = Array.from(allStates).sort((a, b) => {
          const aIndex = stateOrder.indexOf(a);
          const bIndex = stateOrder.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        sortedStates.forEach(stateName => {
          const lightStateTokens = lightCategory[stateName] || [];
          const darkStateTokens = darkCategory[stateName] || [];
          
          if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;

          const stateSection = document.createElement('div');
          stateSection.style.marginBottom = '24px';
          stateSection.style.padding = '12px';
          stateSection.style.backgroundColor = '#f9fafb';
          stateSection.style.border = '1px solid #e5e7eb';
          stateSection.style.borderRadius = '8px';

          const stateTitle = document.createElement('h4');
          const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
          stateTitle.textContent = `${stateLabel} (${lightStateTokens.length} Light + ${darkStateTokens.length} Dark)`;
          stateTitle.style.fontSize = '16px';
          stateTitle.style.fontWeight = '600';
          stateTitle.style.marginBottom = '12px';
          stateTitle.style.color = '#303a47';
          stateSection.appendChild(stateTitle);

          // Crear comparación Light/Dark en dos columnas
          const comparison = document.createElement('div');
          comparison.style.display = 'grid';
          comparison.style.gridTemplateColumns = '1fr 1fr';
          comparison.style.gap = '12px';

          // Columna Light
          const lightCol = document.createElement('div');
          lightCol.style.background = '#ffffff';
          lightCol.style.border = '1px solid #e5e7eb';
          lightCol.style.borderRadius = '8px';
          lightCol.style.padding = '12px';

          const lightGrid = document.createElement('div');
          lightGrid.style.display = 'flex';
          lightGrid.style.flexDirection = 'column';
          lightGrid.style.gap = '6px';
          lightGrid.style.maxHeight = '400px';
          lightGrid.style.overflowY = 'auto';
          lightGrid.style.paddingRight = '8px';

          lightStateTokens.forEach(token => {
            lightGrid.appendChild(createColorSwatch(token, 'light', { 
              showVariable: true, 
              showValue: true,
              width: '100%'
            }));
          });

          if (lightStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            lightGrid.appendChild(empty);
          }

          lightCol.appendChild(lightGrid);
          comparison.appendChild(lightCol);

          // Columna Dark
          const darkCol = document.createElement('div');
          darkCol.style.background = '#0E1825';
          darkCol.style.color = '#edeeef';
          darkCol.style.border = '1px solid #0E1825';
          darkCol.style.borderRadius = '8px';
          darkCol.style.padding = '12px';

          const darkGrid = document.createElement('div');
          darkGrid.style.display = 'flex';
          darkGrid.style.flexDirection = 'column';
          darkGrid.style.gap = '6px';
          darkGrid.style.maxHeight = '400px';
          darkGrid.style.overflowY = 'auto';
          darkGrid.style.paddingRight = '8px';

          darkStateTokens.forEach(token => {
            darkGrid.appendChild(createColorSwatch(token, 'dark', { 
              showVariable: true, 
              showValue: true,
              width: '100%'
            }));
          });

          if (darkStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            darkGrid.appendChild(empty);
          }

          darkCol.appendChild(darkGrid);
          comparison.appendChild(darkCol);

          stateSection.appendChild(comparison);
          categorySection.appendChild(stateSection);
        });

        container.appendChild(categorySection);
      });
    }

    return container;
  },
};

/**
 * Story para Static Inverted
 */
export const StaticInverted: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Static Inverted - Todos los Colores';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const tokens = getModifierTokens('static-inverted');
    const totalCount = tokens.light.length + tokens.dark.length;

    const count = document.createElement('div');
    count.style.marginBottom = '24px';
    count.style.padding = '12px';
    count.style.backgroundColor = '#f3f4f6';
    count.style.border = '1px solid #d1d5db';
    count.style.borderRadius = '8px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${totalCount} tokens (${tokens.light.length} Light + ${tokens.dark.length} Dark)`;
    container.appendChild(count);

    if (totalCount > 0) {
      // Organizar por categoría y estado (default, hover, pressed)
      const organizedLight = organizeTokensByCategoryAndState(tokens.light);
      const organizedDark = organizeTokensByCategoryAndState(tokens.dark);
      
      const allCategories = new Set([
        ...Object.keys(organizedLight),
        ...Object.keys(organizedDark)
      ]);

      allCategories.forEach(categoryName => {
        const lightCategory = organizedLight[categoryName] || {};
        const darkCategory = organizedDark[categoryName] || {};
        
        // Obtener todos los estados únicos
        const allStates = new Set([
          ...Object.keys(lightCategory),
          ...Object.keys(darkCategory)
        ]);

        if (allStates.size === 0) return;

        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';

        // Calcular total de tokens en esta categoría
        const lightTotal = Object.values(lightCategory).reduce((sum, tokens) => sum + tokens.length, 0);
        const darkTotal = Object.values(darkCategory).reduce((sum, tokens) => sum + tokens.length, 0);

        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} (${lightTotal} Light + ${darkTotal} Dark)`;
        sectionTitle.style.fontSize = '20px';
        sectionTitle.style.fontWeight = '600';
        sectionTitle.style.marginBottom = '16px';
        sectionTitle.style.paddingBottom = '8px';
        sectionTitle.style.borderBottom = '2px solid #e5e7eb';
        categorySection.appendChild(sectionTitle);

        // Ordenar estados: base/default primero, luego hover, luego pressed
        const stateOrder = ['base', 'default', 'hover', 'pressed'];
        const sortedStates = Array.from(allStates).sort((a, b) => {
          const aIndex = stateOrder.indexOf(a);
          const bIndex = stateOrder.indexOf(b);
          if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        sortedStates.forEach(stateName => {
          const lightStateTokens = lightCategory[stateName] || [];
          const darkStateTokens = darkCategory[stateName] || [];
          
          if (lightStateTokens.length === 0 && darkStateTokens.length === 0) return;

          const stateSection = document.createElement('div');
          stateSection.style.marginBottom = '24px';
          stateSection.style.padding = '12px';
          stateSection.style.backgroundColor = '#f9fafb';
          stateSection.style.border = '1px solid #e5e7eb';
          stateSection.style.borderRadius = '8px';

          const stateTitle = document.createElement('h4');
          const stateLabel = stateName === 'base' ? 'Base' : stateName.charAt(0).toUpperCase() + stateName.slice(1);
          stateTitle.textContent = `${stateLabel} (${lightStateTokens.length} Light + ${darkStateTokens.length} Dark)`;
          stateTitle.style.fontSize = '16px';
          stateTitle.style.fontWeight = '600';
          stateTitle.style.marginBottom = '12px';
          stateTitle.style.color = '#303a47';
          stateSection.appendChild(stateTitle);

          // Crear comparación Light/Dark en dos columnas
          const comparison = document.createElement('div');
          comparison.style.display = 'grid';
          comparison.style.gridTemplateColumns = '1fr 1fr';
          comparison.style.gap = '12px';

          // Columna Light
          const lightCol = document.createElement('div');
          lightCol.style.background = '#ffffff';
          lightCol.style.border = '1px solid #e5e7eb';
          lightCol.style.borderRadius = '8px';
          lightCol.style.padding = '12px';

          const lightGrid = document.createElement('div');
          lightGrid.style.display = 'flex';
          lightGrid.style.flexDirection = 'column';
          lightGrid.style.gap = '6px';
          lightGrid.style.maxHeight = '400px';
          lightGrid.style.overflowY = 'auto';
          lightGrid.style.paddingRight = '8px';

          lightStateTokens.forEach(token => {
            lightGrid.appendChild(createColorSwatch(token, 'light', { 
              showVariable: true, 
              showValue: true,
              width: '100%'
            }));
          });

          if (lightStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            lightGrid.appendChild(empty);
          }

          lightCol.appendChild(lightGrid);
          comparison.appendChild(lightCol);

          // Columna Dark
          const darkCol = document.createElement('div');
          darkCol.style.background = '#0E1825';
          darkCol.style.color = '#edeeef';
          darkCol.style.border = '1px solid #0E1825';
          darkCol.style.borderRadius = '8px';
          darkCol.style.padding = '12px';

          const darkGrid = document.createElement('div');
          darkGrid.style.display = 'flex';
          darkGrid.style.flexDirection = 'column';
          darkGrid.style.gap = '6px';
          darkGrid.style.maxHeight = '400px';
          darkGrid.style.overflowY = 'auto';
          darkGrid.style.paddingRight = '8px';

          darkStateTokens.forEach(token => {
            darkGrid.appendChild(createColorSwatch(token, 'dark', { 
              showVariable: true, 
              showValue: true,
              width: '100%'
            }));
          });

          if (darkStateTokens.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '8px';
            empty.style.textAlign = 'center';
            empty.style.color = '#9ca3af';
            empty.style.fontSize = '12px';
            empty.textContent = 'No hay tokens';
            darkGrid.appendChild(empty);
          }

          darkCol.appendChild(darkGrid);
          comparison.appendChild(darkCol);

          stateSection.appendChild(comparison);
          categorySection.appendChild(stateSection);
        });

        container.appendChild(categorySection);
      });
    }

    return container;
  },
};

