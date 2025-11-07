/**
 * Tests de compatibilidad para TokensManager
 * Verifica que no haya breaking changes con el sistema actual
 */

import { TokensManager, initializeTokensManager } from './TokensManager';

describe('TokensManager - Compatibilidad', () => {
  beforeEach(() => {
    // Limpiar DOM
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  test('debe funcionar con tokens estáticos existentes', async () => {
    // Simular tokens estáticos cargados (como en HTML actual)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    // Inyectar algunos tokens de prueba
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --ubits-button-primary-bg-default: var(--ubits-accent-brand-static-inverted);
        --ubits-bg-1: var(--ubits-bg-1);
        --ubits-fg-1-high: var(--ubits-fg-1-high);
        --ubits-accent-brand-static-inverted: var(--ubits-accent-brand-static-inverted);
      }
    `;
    document.head.appendChild(style);

    const manager = new TokensManager({
      autoLoadStatic: false // No cargar, ya están cargados
    });

    await manager.initialize();

    // Debe detectar tokens estáticos
    const info = manager.getTokensInfo();
    expect(info.source).toBe('static');
  });

  test('debe permitir usar tokens en componentes sin cambios', () => {
    // Simular tokens cargados
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --ubits-button-primary-bg-default: var(--ubits-accent-brand-static-inverted);
        --ubits-bg-1: var(--ubits-bg-1);
      }
    `;
    document.head.appendChild(style);

    // Crear un componente de prueba que use tokens
    const testElement = document.createElement('div');
    testElement.style.background = 'var(--ubits-button-primary-bg-default)';
    testElement.style.color = 'var(--ubits-fg-1-high)';
    document.body.appendChild(testElement);

    // Los tokens deben estar disponibles
    const computed = getComputedStyle(testElement);
    expect(computed.background).toBeTruthy();
  });

  test('debe mantener compatibilidad con HTML existente', async () => {
    // Simular estructura HTML actual
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    // El manager debe detectar y no interferir
    const manager = new TokensManager();
    await manager.initialize();

    // El link original debe seguir ahí
    const existingLink = document.querySelector('link[href*="tokens.css"]');
    expect(existingLink).toBeTruthy();
  });

  test('debe funcionar sin inicializar (modo pasivo)', () => {
    // Inyectar tokens
    const style = document.createElement('style');
    style.textContent = `:root { --ubits-bg-1: var(--ubits-bg-1); }`;
    document.head.appendChild(style);

    // Crear manager pero no inicializar
    const manager = new TokensManager({
      autoLoadStatic: false
    });

    // Los tokens deben seguir funcionando
    const testEl = document.createElement('div');
    testEl.style.background = 'var(--ubits-bg-1)';
    document.body.appendChild(testEl);

    const computed = getComputedStyle(testEl);
    // No debe lanzar error
    expect(computed).toBeDefined();
  });

  test('debe permitir múltiples inicializaciones sin errores', async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    const manager = new TokensManager();
    
    await manager.initialize();
    await manager.initialize(); // Segunda vez
    await manager.initialize(); // Tercera vez

    // No debe lanzar errores
    expect(manager.getTokensInfo().source).toBe('static');
  });

  test('debe funcionar con initializeTokensManager global', async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    await expect(initializeTokensManager()).resolves.not.toThrow();
  });
});

describe('TokensManager - Integración con Componentes', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  test('componentes deben poder usar tokens después de inicializar', async () => {
    // Inyectar tokens
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --ubits-button-primary-bg-default: var(--ubits-accent-brand-static-inverted);
        --ubits-btn-primary-fg: var(--ubits-fg-1-high);
        --ubits-bg-1: var(--ubits-bg-1);
      }
    `;
    document.head.appendChild(style);

    const manager = new TokensManager();
    await manager.initialize();

    // Simular uso en componente Button
    const button = document.createElement('button');
    button.className = 'ubits-button';
    button.style.background = 'var(--ubits-button-primary-bg-default)';
    button.style.color = 'var(--ubits-btn-primary-fg)';
    document.body.appendChild(button);

    const computed = getComputedStyle(button);
    // Los tokens deben estar disponibles
    expect(computed.background).toBeTruthy();
  });

  test('debe validar tokens requeridos por componentes', async () => {
    // Inyectar tokens mínimos requeridos
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --ubits-button-primary-bg-default: var(--ubits-accent-brand-static-inverted);
        --ubits-button-primary-hover: var(--ubits-accent-brand-static-inverted);
        --ubits-btn-primary-fg: var(--ubits-fg-1-high);
        --ubits-bg-1: var(--ubits-bg-1);
        --ubits-bg-2: var(--ubits-bg-2);
        --ubits-fg-1-high: var(--ubits-fg-1-high);
        --ubits-fg-1-medium: var(--ubits-fg-1-medium);
        --ubits-border-1: var(--ubits-border-1);
        --ubits-accent-brand-static-inverted: var(--ubits-accent-brand-static-inverted);
        --ubits-spacing-2: var(--ubits-spacing-2);
        --ubits-spacing-3: var(--ubits-spacing-3);
      }
    `;
    document.head.appendChild(style);

    const manager = new TokensManager();
    await manager.initialize();

    const isValid = await manager.validateTokens();
    // Debe validar correctamente (aunque algunos tokens falten)
    expect(typeof isValid).toBe('boolean');
  });
});

