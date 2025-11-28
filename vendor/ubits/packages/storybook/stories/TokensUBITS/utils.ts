/**
 * Utilidades para visualización de tokens en Storybook
 */

/**
 * Convierte rgba a hex
 */
export function rgbaToHex(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return rgba;
  
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = match[4] ? parseFloat(match[4]) : 1;
  
  const hex = `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
  
  if (a < 1) {
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
    return hex + alphaHex;
  }
  return hex;
}

/**
 * Obtiene el valor de un token CSS
 * Si el token contiene -light- o -dark- en el nombre, usa ese modo específico
 */
export function getTokenValue(token: string, theme: 'light' | 'dark' = 'light'): string {
  const root = document.documentElement;
  const originalTheme = document.body.getAttribute('data-theme');
  
  // Si el token ya especifica el modo en el nombre, usar ese modo
  let targetTheme = theme;
  if (token.includes('-light-')) {
    targetTheme = 'light';
  } else if (token.includes('-dark-')) {
    targetTheme = 'dark';
  }
  
  document.body.setAttribute('data-theme', targetTheme);
  document.documentElement.setAttribute('data-theme', targetTheme);
  
  let value = '';
  try {
    value = getComputedStyle(root).getPropertyValue(token).trim();
  } catch (e) {
    // Error getting value for token
  }
  
  if (originalTheme) {
    document.body.setAttribute('data-theme', originalTheme);
    document.documentElement.setAttribute('data-theme', originalTheme);
  }
  
  // Si aún no hay valor, usar un fallback
  if (!value) {
    value = '#cccccc'; // Color gris de fallback
  }
  
  return value;
}

/**
 * Crea un swatch de color para un token
 */
export function createColorSwatch(
  token: string,
  theme: 'light' | 'dark' = 'light',
  options: {
    showValue?: boolean;
    showVariable?: boolean;
    width?: string;
    height?: string;
  } = {}
): HTMLElement {
  const {
    showValue = true,
    showVariable = true,
    width = '120px',
    height = '28px'
  } = options;

  const root = document.documentElement;
  const originalTheme = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', theme);
  
  // Esperar un momento para que el CSS se aplique
  let value = getComputedStyle(root).getPropertyValue(token).trim();
  
  // Si el valor está vacío, intentar sin el prefijo --
  if (!value && token.startsWith('--')) {
    value = getComputedStyle(root).getPropertyValue(token.substring(2)).trim();
  }
  
  // Si aún está vacío, intentar leer directamente del CSS
  if (!value) {
    const styleSheets = Array.from(document.styleSheets);
    for (const sheet of styleSheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        for (const rule of rules) {
          if (rule instanceof CSSStyleRule) {
            const style = rule.style;
            if (style.getPropertyValue(token) || style.getPropertyValue(token.substring(2))) {
              value = style.getPropertyValue(token) || style.getPropertyValue(token.substring(2));
              break;
            }
          }
        }
        if (value) break;
      } catch (e) {
        // Ignorar errores de CORS
      }
    }
  }
  
  if (originalTheme) {
    document.body.setAttribute('data-theme', originalTheme);
  }

  // Si aún no hay valor, usar un fallback
  if (!value) {
    value = '#cccccc'; // Color gris de fallback
  }

  const isWhite = /^(#fff(f)?|rgb\(255,\s*255,\s*255\))$/i.test(value);
  const hasOpacity = /rgba?\([^)]+\)/.test(value) && value.includes('0.');
  const bg1Value = theme === 'light' ? '#ffffff' : '#202837';
  
  let bg: string;
  if (isWhite) {
    bg = 'repeating-conic-gradient(#eee 0% 25%, var(--modifiers-normal-color-light-bg-1) 0% 50%) 50%/12px 12px';
  } else if (hasOpacity) {
    bg = `${value}, ${bg1Value}`;
  } else {
    bg = value;
  }

  const displayValue = /rgba?\([^)]+\)/.test(value) ? rgbaToHex(value) : value;

  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'row';
  wrap.style.alignItems = 'center';
  wrap.style.gap = '12px';
  wrap.style.padding = '8px 12px';
  wrap.style.border = '1px solid #e5e7eb';
  wrap.style.borderRadius = '8px';
  wrap.style.minHeight = '44px';
  wrap.style.width = width === '100%' ? '100%' : 'auto';

  if (showVariable) {
    const nameEl = document.createElement('code');
    nameEl.textContent = token;
    nameEl.style.fontSize = '12px';
    nameEl.style.fontFamily = 'monospace';
    nameEl.style.flex = '1';
    nameEl.style.minWidth = '0';
    nameEl.style.overflow = 'hidden';
    nameEl.style.textOverflow = 'ellipsis';
    nameEl.style.whiteSpace = 'nowrap';
    wrap.appendChild(nameEl);
  }

  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.gap = '12px';
  right.style.alignItems = 'center';
  right.style.flexShrink = '0';

  const box = document.createElement('div');
  box.style.height = height;
  // Siempre usar un ancho fijo para la barrita de color, nunca 100%
  const boxWidth = width === '100%' ? '80px' : width;
  box.style.width = boxWidth;
  box.style.minWidth = '60px'; // Ancho mínimo garantizado
  box.style.maxWidth = '120px'; // Ancho máximo para evitar que se estire demasiado
  box.style.borderRadius = '6px';
  box.style.border = '1px solid #9ca3af';
  box.style.background = bg || '#cccccc'; // Fallback si no hay valor
  box.style.flexShrink = '0'; // No encoger
  box.style.display = 'block'; // Asegurar que se muestre
  box.style.boxSizing = 'border-box'; // Incluir border en el ancho
  box.style.cursor = 'pointer'; // Cursor pointer para indicar que es interactivo
  
  // Agregar título con el valor para debugging
  box.title = `Token: ${token}\nValor: ${value}\nBackground: ${bg}`;
  
  right.appendChild(box);

  if (showValue) {
    const val = document.createElement('code');
    val.textContent = displayValue;
    val.style.fontSize = '12px';
    val.style.fontFamily = 'monospace';
    val.style.color = theme === 'dark' ? '#edeeef' : '#303a47';
    right.appendChild(val);
  }

  wrap.appendChild(right);
  return wrap;
}

/**
 * Crea un grid de colores para primitivos
 */
export function createColorGrid(
  tokens: string[],
  theme: 'light' | 'dark' = 'light',
  columns: number = 8
): HTMLElement {
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  container.style.gap = '8px';
  container.style.padding = '16px';

  tokens.forEach(token => {
    const swatch = createColorSwatch(token, theme, {
      showValue: false,
      showVariable: false,
      width: '100%',
      height: '60px'
    });
    
    // Agregar label con el nombre del token
    const label = document.createElement('div');
    label.style.fontSize = '10px';
    label.style.fontFamily = 'monospace';
    label.style.textAlign = 'center';
    label.style.marginTop = '4px';
    label.style.color = theme === 'dark' ? '#edeeef' : '#303a47';
    label.textContent = token.replace('--', '').split('-').pop() || '';
    
    const item = document.createElement('div');
    item.appendChild(swatch.querySelector('div') || swatch);
    item.appendChild(label);
    container.appendChild(item);
  });

  return container;
}

/**
 * Crea un contenedor con comparación Light/Dark
 */
export function createLightDarkComparison(
  tokens: string[],
  title?: string
): HTMLElement {
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = '1fr 1fr';
  container.style.gap = '16px';
  container.style.padding = '16px';

  const lightCol = document.createElement('div');
  lightCol.style.background = '#ffffff';
  lightCol.style.border = '1px solid #e5e7eb';
  lightCol.style.borderRadius = '10px';
  lightCol.style.padding = '12px';

  if (title) {
    const lightTitle = document.createElement('h4');
    lightTitle.textContent = `${title} - Light`;
    lightTitle.style.margin = '0 0 12px 0';
    lightTitle.style.fontSize = '16px';
    lightTitle.style.fontWeight = '600';
    lightCol.appendChild(lightTitle);
  }

  const darkCol = document.createElement('div');
  darkCol.style.background = '#0E1825';
  darkCol.style.color = '#edeeef';
  darkCol.style.border = '1px solid #0E1825';
  darkCol.style.borderRadius = '10px';
  darkCol.style.padding = '12px';

  if (title) {
    const darkTitle = document.createElement('h4');
    darkTitle.textContent = `${title} - Dark`;
    darkTitle.style.margin = '0 0 12px 0';
    darkTitle.style.fontSize = '16px';
    darkTitle.style.fontWeight = '600';
    darkCol.appendChild(darkTitle);
  }

  tokens.forEach(token => {
    // Si el token contiene -light-, solo mostrarlo en la columna light
    // Si el token contiene -dark-, solo mostrarlo en la columna dark
    // Si no contiene ninguno, mostrarlo en ambas columnas
    if (token.includes('-light-')) {
      lightCol.appendChild(createColorSwatch(token, 'light'));
    } else if (token.includes('-dark-')) {
      darkCol.appendChild(createColorSwatch(token, 'dark'));
    } else {
      lightCol.appendChild(createColorSwatch(token, 'light'));
      darkCol.appendChild(createColorSwatch(token, 'dark'));
    }
  });

  container.appendChild(lightCol);
  container.appendChild(darkCol);
  document.body.setAttribute('data-theme', 'light');
  
  return container;
}

/**
 * Crea una tabla de tokens
 */
export function createTokenTable(
  tokens: Array<{ name: string; value: string; description?: string }>,
  theme: 'light' | 'dark' = 'light'
): HTMLElement {
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.fontSize = '14px';

  // Header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.style.borderBottom = '2px solid #e5e7eb';
  headerRow.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#f9fafb';

  ['Token', 'Valor', 'Muestra', 'Descripción'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    th.style.padding = '12px';
    th.style.textAlign = 'left';
    th.style.fontWeight = '600';
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  tokens.forEach((token, index) => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #e5e7eb';

    // Token name
    const nameCell = document.createElement('td');
    nameCell.style.padding = '12px';
    const nameCode = document.createElement('code');
    nameCode.textContent = token.name;
    nameCode.style.fontSize = '12px';
    nameCode.style.fontFamily = 'monospace';
    nameCell.appendChild(nameCode);
    row.appendChild(nameCell);

    // Value
    const valueCell = document.createElement('td');
    valueCell.style.padding = '12px';
    const valueCode = document.createElement('code');
    valueCode.textContent = token.value;
    valueCode.style.fontSize = '12px';
    valueCode.style.fontFamily = 'monospace';
    valueCell.appendChild(valueCode);
    row.appendChild(valueCell);

    // Swatch
    const swatchCell = document.createElement('td');
    swatchCell.style.padding = '12px';
    const swatch = createColorSwatch(token.name, theme, {
      showValue: false,
      showVariable: false,
      width: '60px',
      height: '24px'
    });
    swatchCell.appendChild(swatch);
    row.appendChild(swatchCell);

    // Description
    const descCell = document.createElement('td');
    descCell.style.padding = '12px';
    descCell.textContent = token.description || '-';
    row.appendChild(descCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table;
}

