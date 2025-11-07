/**
 * Ejemplos de uso: Aplicar tokens desde Storybook u otras fuentes
 * 
 * Este archivo muestra cómo usar las utilidades para cambiar tokens
 * y aplicarlos a todos los componentes automáticamente.
 */

import { applyTokensFromStorybook, createTokensAddonFromSource } from './createTokensAddon';

// ========================================
// EJEMPLO 1: Desde URL de Storybook
// ========================================

export async function ejemploDesdeStorybookURL() {
  await applyTokensFromStorybook({
    cssUrl: 'https://storybook.tu-empresa.com/tokens.css'
  });
  
  // Los componentes automáticamente usarán los nuevos tokens
  // porque todos usan var(--ubits-*)
}

// ========================================
// EJEMPLO 2: Desde JSON de Storybook
// ========================================

export async function ejemploDesdeStorybookJSON() {
  await applyTokensFromStorybook({
    jsonUrl: 'https://storybook.tu-empresa.com/tokens.json'
  });
}

// ========================================
// EJEMPLO 3: Desde CSS directo
// ========================================

export async function ejemploDesdeCSS() {
  // Ejemplo: tokens CSS (los valores reales vendrían de Storybook)
  // Nota: En uso real, estos valores vendrían directamente de Storybook
  const tokensCSS = `
    :root {
      --ubits-accent-brand-static-inverted: var(--ubits-accent-brand-static-inverted);
      --ubits-button-primary-bg-default: var(--ubits-accent-brand-static-inverted);
      --ubits-button-primary-hover: var(--ubits-accent-brand-static-inverted);
      --ubits-bg-1: var(--ubits-bg-1);
      --ubits-fg-1-high: var(--ubits-fg-1-high);
    }
  `;

  await applyTokensFromStorybook({
    css: tokensCSS
  });
}

// ========================================
// EJEMPLO 4: Desde JSON directo
// ========================================

export async function ejemploDesdeJSON() {
  // Ejemplo: tokens JSON (los valores reales vendrían de Storybook)
  // Nota: En uso real, estos valores vendrían directamente de Storybook
  const tokensJSON = {
    light: {
      brand: {
        'ubits-accent-brand': 'var(--ubits-accent-brand-static-inverted)',
        'ubits-accent-success': 'var(--ubits-accent-success)'
      },
      button: {
        'ubits-button-primary-bg-default': 'var(--ubits-accent-brand-static-inverted)',
        'ubits-button-primary-hover': 'var(--ubits-accent-brand-static-inverted)'
      },
      background: {
        'ubits-bg-1': 'var(--ubits-bg-1)',
        'ubits-bg-2': 'var(--ubits-bg-2)'
      }
    }
  };

  await applyTokensFromStorybook({
    json: tokensJSON
  });
}

// ========================================
// EJEMPLO 5: Usando API Global
// ========================================

export async function ejemploDesdeAPI() {
  // Si ya tienes window.UBITS.Tokens disponible
  if (typeof window !== 'undefined' && (window as any).UBITS?.Tokens) {
    // Crear add-on desde Storybook
    const addon = await createTokensAddonFromSource({
      cssUrl: 'https://storybook.tu-empresa.com/tokens.css'
    }, 'storybook-tokens');

    // Aplicar usando el manager
    const manager = (window as any).UBITS.Tokens.getManager();
    await manager.switchTokensAddon('/addons/tokens-storybook/manifest.json');
  }
}

// ========================================
// EJEMPLO 6: Script para aplicar desde Storybook
// ========================================

/**
 * Función helper que puedes llamar desde la consola del navegador
 * 
 * Uso:
 * ```javascript
 * await cambiarTokensDesdeStorybook('https://storybook.tu-empresa.com/tokens.css');
 * ```
 */
export async function cambiarTokensDesdeStorybook(
  storybookUrl: string,
  options: {
    validar?: boolean;
    reemplazar?: boolean;
  } = {}
) {
  console.log('🔄 Cambiando tokens desde Storybook...');
  
  try {
    await applyTokensFromStorybook(
      { cssUrl: storybookUrl },
      {
        validate: options.validar !== false,
        replaceExisting: options.reemplazar !== false
      }
    );
    
    console.log('✅ Tokens cambiados exitosamente');
    console.log('📦 Todos los componentes ahora usan los nuevos tokens');
    
    return true;
  } catch (error) {
    console.error('❌ Error cambiando tokens:', error);
    return false;
  }
}

// Exponer función global para uso fácil
if (typeof window !== 'undefined') {
  (window as any).cambiarTokensDesdeStorybook = cambiarTokensDesdeStorybook;
}

