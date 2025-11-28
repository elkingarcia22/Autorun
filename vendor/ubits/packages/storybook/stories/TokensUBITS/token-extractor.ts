/**
 * Extractor de tokens del CSS
 * 
 * Extrae todos los tokens relacionados con un color específico del CSS cargado
 */

/**
 * Extrae todos los tokens de un color específico del CSS
 */
export function extractColorTokens(colorName: string): string[] {
  const tokens: string[] = [];
  const colorLower = colorName.toLowerCase();

  // Intentar leer del CSS cargado
  try {
    const styleSheets = Array.from(document.styleSheets);
    
    styleSheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule instanceof CSSStyleRule) {
            const style = rule.style;
            for (let i = 0; i < style.length; i++) {
              const prop = style[i];
              if (prop.startsWith('--') && 
                  prop.toLowerCase().includes(colorLower) &&
                  !tokens.includes(prop)) {
                tokens.push(prop);
              }
            }
          }
        });
      } catch (e) {
        // Ignorar errores de CORS o acceso
      }
    });
  } catch (e) {
    // Error extrayendo tokens del CSS
  }

  return tokens.sort();
}

/**
 * Organiza tokens por categoría
 */
export function organizeTokensByCategory(tokens: string[]): Record<string, string[]> {
  const categories: Record<string, string[]> = {
    'accent': [],
    'fg': [],
    'bg': [],
    'border': [],
    'feedback': [],
    'chart': [],
    'button': [],
    'scroll-bar': [],
    'toggle': [],
    'Otros': [],
  };

  tokens.forEach(token => {
    const lower = token.toLowerCase();
    if (lower.includes('chart')) {
      categories['chart'].push(token);
    } else if (lower.includes('button')) {
      categories['button'].push(token);
    } else if (lower.includes('scroll-bar')) {
      categories['scroll-bar'].push(token);
    } else if (lower.includes('toggle')) {
      categories['toggle'].push(token);
    } else if (lower.includes('feedback')) {
      categories['feedback'].push(token);
    } else if (lower.includes('accent')) {
      categories['accent'].push(token);
    } else if (lower.includes('-fg-')) {
      categories['fg'].push(token);
    } else if (lower.includes('-bg-')) {
      categories['bg'].push(token);
    } else if (lower.includes('border')) {
      categories['border'].push(token);
    } else {
      categories['Otros'].push(token);
    }
  });

  // Eliminar categorías vacías
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });

  return categories;
}

/**
 * Organiza tokens por categoría y estado (default, hover, pressed)
 * Retorna una estructura: { categoria: { estado: [tokens] } }
 */
export function organizeTokensByCategoryAndState(tokens: string[]): Record<string, Record<string, string[]>> {
  const organized: Record<string, Record<string, string[]>> = {};

  tokens.forEach(token => {
    const lower = token.toLowerCase();
    
    // Determinar categoría
    let category = 'otros';
    if (lower.includes('chart')) {
      category = 'chart';
    } else if (lower.includes('button')) {
      category = 'button';
    } else if (lower.includes('scroll-bar')) {
      category = 'scroll-bar';
    } else if (lower.includes('toggle')) {
      category = 'toggle';
    } else if (lower.includes('feedback')) {
      category = 'feedback';
    } else if (lower.includes('accent')) {
      category = 'accent';
    } else if (lower.includes('-fg-')) {
      category = 'fg';
    } else if (lower.includes('-bg-')) {
      category = 'bg';
    } else if (lower.includes('border')) {
      category = 'border';
    }

    // Determinar estado
    let state = 'base';
    if (lower.includes('-pressed')) {
      state = 'pressed';
    } else if (lower.includes('-hover')) {
      state = 'hover';
    } else if (lower.includes('-default')) {
      state = 'default';
    }

    // Inicializar estructura si no existe
    if (!organized[category]) {
      organized[category] = {};
    }
    if (!organized[category][state]) {
      organized[category][state] = [];
    }

    organized[category][state].push(token);
  });

  // Ordenar tokens dentro de cada estado
  Object.keys(organized).forEach(category => {
    Object.keys(organized[category]).forEach(state => {
      organized[category][state].sort();
    });
  });

  return organized;
}

/**
 * Lista predefinida de tokens de blue (para cuando no se pueden extraer dinámicamente)
 * Esta lista se genera desde el CSS y se actualiza cuando sea necesario
 */
export const BLUE_TOKENS_PREDEFINED = [
  // NOTA: --color-color-accent-blue y --color-color-border-blue tienen valores casi negros (#050710)
  // Se omiten y se usan los tokens de modificadores en su lugar
  '--color-chart-color-bg-blue-subtle',
  '--color-chart-color-bg-blue-bold',
  '--color-chart-color-bg-neutral-blue-1',
  '--color-chart-color-bg-neutral-blue-2',
  '--color-chart-color-bg-neutral-blue-3',
  '--color-chart-color-bg-neutral-blue-4',
  '--color-chart-color-bg-neutral-blue-5',
  '--color-chart-color-bg-neutral-blue-6',
  '--color-chart-color-bg-neutral-blue-7',
  '--color-chart-color-bg-neutral-blue-8',
  '--color-chart-color-bg-neutral-blue-9',
  '--color-chart-color-bg-neutral-blue-10',
  '--color-chart-color-bg-neutral-blue-11',
  '--color-chart-color-bg-neutral-blue-12',
  '--color-chart-color-bg-neutral-blue-13',
  '--color-chart-color-bg-neutral-blue-14',
  '--color-chart-color-bg-neutral-blue-base',
  // Modifiers - Inverted
  '--modifiers-inverted-color-light-accent-blue',
  '--modifiers-inverted-color-light-fg-blue-subtle-default',
  '--modifiers-inverted-color-light-fg-blue-subtle-hover',
  '--modifiers-inverted-color-light-bg-blue-subtle-default',
  '--modifiers-inverted-color-light-bg-blue-subtle-hover',
  '--modifiers-inverted-color-light-bg-blue-subtle-pressed',
  '--modifiers-inverted-color-light-bg-blue-bold-default',
  '--modifiers-inverted-color-light-bg-blue-bold-hover',
  '--modifiers-inverted-color-light-bg-blue-bold-pressed',
  '--modifiers-inverted-color-light-border-blue',
  '--modifiers-inverted-color-dark-fg-blue-subtle-default',
  '--modifiers-inverted-color-dark-fg-blue-subtle-hover',
  '--modifiers-inverted-color-dark-accent-blue',
  '--modifiers-inverted-color-dark-bg-blue-subtle-default',
  '--modifiers-inverted-color-dark-bg-blue-subtle-hover',
  '--modifiers-inverted-color-dark-bg-blue-subtle-pressed',
  '--modifiers-inverted-color-dark-bg-blue-bold-default',
  '--modifiers-inverted-color-dark-bg-blue-bold-hover',
  '--modifiers-inverted-color-dark-bg-blue-bold-pressed',
  '--modifiers-inverted-color-dark-border-blue',
  '--modifiers-inverted-chart-color-bg-neutral-blue-1',
  '--modifiers-inverted-chart-color-bg-neutral-blue-2',
  '--modifiers-inverted-chart-color-bg-neutral-blue-3',
  '--modifiers-inverted-chart-color-bg-neutral-blue-4',
  '--modifiers-inverted-chart-color-bg-neutral-blue-5',
  '--modifiers-inverted-chart-color-bg-neutral-blue-6',
  '--modifiers-inverted-chart-color-bg-neutral-blue-7',
  '--modifiers-inverted-chart-color-bg-neutral-blue-8',
  '--modifiers-inverted-chart-color-bg-neutral-blue-9',
  '--modifiers-inverted-chart-color-bg-neutral-blue-10',
  '--modifiers-inverted-chart-color-bg-neutral-blue-11',
  '--modifiers-inverted-chart-color-bg-neutral-blue-12',
  '--modifiers-inverted-chart-color-bg-neutral-blue-13',
  '--modifiers-inverted-chart-color-bg-neutral-blue-14',
  '--modifiers-inverted-chart-color-bg-neutral-blue-base',
  '--modifiers-inverted-chart-color-bg-blue-subtle',
  '--modifiers-inverted-chart-color-bg-blue-bold',
  // Modifiers - Normal
  '--modifiers-normal-color-light-accent-blue',
  '--modifiers-normal-color-light-fg-blue-subtle-default',
  '--modifiers-normal-color-light-fg-blue-subtle-hover',
  '--modifiers-normal-color-light-bg-blue-subtle-default',
  '--modifiers-normal-color-light-bg-blue-subtle-hover',
  '--modifiers-normal-color-light-bg-blue-subtle-pressed',
  '--modifiers-normal-color-light-bg-blue-bold-default',
  '--modifiers-normal-color-light-bg-blue-bold-hover',
  '--modifiers-normal-color-light-bg-blue-bold-pressed',
  '--modifiers-normal-color-light-border-blue',
  '--modifiers-normal-color-dark-fg-blue-subtle-default',
  '--modifiers-normal-color-dark-fg-blue-subtle-hover',
  '--modifiers-normal-color-dark-accent-blue',
  '--modifiers-normal-color-dark-bg-blue-subtle-default',
  '--modifiers-normal-color-dark-bg-blue-subtle-hover',
  '--modifiers-normal-color-dark-bg-blue-subtle-pressed',
  '--modifiers-normal-color-dark-bg-blue-bold-default',
  '--modifiers-normal-color-dark-bg-blue-bold-hover',
  '--modifiers-normal-color-dark-bg-blue-bold-pressed',
  '--modifiers-normal-color-dark-border-blue',
  '--modifiers-normal-chart-color-bg-neutral-blue-1',
  '--modifiers-normal-chart-color-bg-neutral-blue-2',
  '--modifiers-normal-chart-color-bg-neutral-blue-3',
  '--modifiers-normal-chart-color-bg-neutral-blue-4',
  '--modifiers-normal-chart-color-bg-neutral-blue-5',
  '--modifiers-normal-chart-color-bg-neutral-blue-6',
  '--modifiers-normal-chart-color-bg-neutral-blue-7',
  '--modifiers-normal-chart-color-bg-neutral-blue-8',
  '--modifiers-normal-chart-color-bg-neutral-blue-9',
  '--modifiers-normal-chart-color-bg-neutral-blue-10',
  '--modifiers-normal-chart-color-bg-neutral-blue-11',
  '--modifiers-normal-chart-color-bg-neutral-blue-12',
  '--modifiers-normal-chart-color-bg-neutral-blue-13',
  '--modifiers-normal-chart-color-bg-neutral-blue-14',
  '--modifiers-normal-chart-color-bg-neutral-blue-base',
  '--modifiers-normal-chart-color-bg-blue-subtle',
  '--modifiers-normal-chart-color-bg-blue-bold',
  // Modifiers - Static Inverted
  '--modifiers-static-inverted-color-light-accent-blue',
  '--modifiers-static-inverted-color-light-fg-blue-subtle-default',
  '--modifiers-static-inverted-color-light-fg-blue-subtle-hover',
  '--modifiers-static-inverted-color-light-bg-blue-subtle-default',
  '--modifiers-static-inverted-color-light-bg-blue-subtle-hover',
  '--modifiers-static-inverted-color-light-bg-blue-subtle-pressed',
  '--modifiers-static-inverted-color-light-bg-blue-bold-default',
  '--modifiers-static-inverted-color-light-bg-blue-bold-hover',
  '--modifiers-static-inverted-color-light-bg-blue-bold-pressed',
  '--modifiers-static-inverted-color-light-border-blue',
  '--modifiers-static-inverted-color-dark-fg-blue-subtle-default',
  '--modifiers-static-inverted-color-dark-fg-blue-subtle-hover',
  '--modifiers-static-inverted-color-dark-accent-blue',
  '--modifiers-static-inverted-color-dark-bg-blue-subtle-default',
  '--modifiers-static-inverted-color-dark-bg-blue-subtle-hover',
  '--modifiers-static-inverted-color-dark-bg-blue-subtle-pressed',
  '--modifiers-static-inverted-color-dark-bg-blue-bold-default',
  '--modifiers-static-inverted-color-dark-bg-blue-bold-hover',
  '--modifiers-static-inverted-color-dark-bg-blue-bold-pressed',
  '--modifiers-static-inverted-color-dark-border-blue',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-1',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-2',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-3',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-4',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-5',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-6',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-7',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-8',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-9',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-10',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-11',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-12',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-13',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-14',
  '--modifiers-static-inverted-chart-color-bg-neutral-blue-base',
  '--modifiers-static-inverted-chart-color-bg-blue-subtle',
  '--modifiers-static-inverted-chart-color-bg-blue-bold',
  // Modifiers - Static
  '--modifiers-static-color-light-accent-blue',
  '--modifiers-static-color-light-fg-blue-subtle-default',
  '--modifiers-static-color-light-fg-blue-subtle-hover',
  '--modifiers-static-color-light-bg-blue-subtle-default',
  '--modifiers-static-color-light-bg-blue-subtle-hover',
  '--modifiers-static-color-light-bg-blue-subtle-pressed',
  '--modifiers-static-color-light-bg-blue-bold-default',
  '--modifiers-static-color-light-bg-blue-bold-hover',
  '--modifiers-static-color-light-bg-blue-bold-pressed',
  '--modifiers-static-color-light-border-blue',
  '--modifiers-static-color-dark-fg-blue-subtle-default',
  '--modifiers-static-color-dark-fg-blue-subtle-hover',
  '--modifiers-static-color-dark-accent-blue',
  '--modifiers-static-color-dark-bg-blue-subtle-default',
  '--modifiers-static-color-dark-bg-blue-subtle-hover',
  '--modifiers-static-color-dark-bg-blue-subtle-pressed',
  '--modifiers-static-color-dark-bg-blue-bold-default',
  '--modifiers-static-color-dark-bg-blue-bold-hover',
  '--modifiers-static-color-dark-bg-blue-bold-pressed',
  '--modifiers-static-color-dark-border-blue',
  '--modifiers-static-chart-color-bg-neutral-blue-1',
  '--modifiers-static-chart-color-bg-neutral-blue-2',
  '--modifiers-static-chart-color-bg-neutral-blue-3',
  '--modifiers-static-chart-color-bg-neutral-blue-4',
  '--modifiers-static-chart-color-bg-neutral-blue-5',
  '--modifiers-static-chart-color-bg-neutral-blue-6',
  '--modifiers-static-chart-color-bg-neutral-blue-7',
  '--modifiers-static-chart-color-bg-neutral-blue-8',
  '--modifiers-static-chart-color-bg-neutral-blue-9',
  '--modifiers-static-chart-color-bg-neutral-blue-10',
  '--modifiers-static-chart-color-bg-neutral-blue-11',
  '--modifiers-static-chart-color-bg-neutral-blue-12',
  '--modifiers-static-chart-color-bg-neutral-blue-13',
  '--modifiers-static-chart-color-bg-neutral-blue-14',
  '--modifiers-static-chart-color-bg-neutral-blue-base',
  '--modifiers-static-chart-color-bg-blue-subtle',
  '--modifiers-static-chart-color-bg-blue-bold',
] as const;

