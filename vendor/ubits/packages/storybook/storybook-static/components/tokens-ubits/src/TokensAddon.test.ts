/**
 * Tests básicos de estructura para TokensAddon
 * Verifica que la estructura esté correcta antes de continuar
 */

import { UBITSTokensAddon } from './TokensAddon';
import type { TokensAddon } from './types/TokensAddon';

describe('TokensAddon - Estructura', () => {
  let addon: TokensAddon;

  beforeEach(() => {
    addon = new UBITSTokensAddon();
  });

  test('debe tener nombre y versión', () => {
    expect(addon.name).toBe('@ubits/tokens-ubits');
    expect(addon.version).toBe('1.0.0');
  });

  test('debe implementar todos los métodos de la interfaz', () => {
    expect(typeof addon.initialize).toBe('function');
    expect(typeof addon.destroy).toBe('function');
    expect(typeof addon.getTokensCSS).toBe('function');
    expect(typeof addon.getTokensJS).toBe('function');
    expect(typeof addon.validate).toBe('function');
    expect(typeof addon.getTokenList).toBe('function');
    expect(typeof addon.hasToken).toBe('function');
  });

  test('debe poder inicializarse sin errores', async () => {
    await expect(addon.initialize({})).resolves.not.toThrow();
  });

  test('debe poder destruirse sin errores', () => {
    expect(() => addon.destroy()).not.toThrow();
  });

  test('getTokensCSS debe retornar string', () => {
    const css = addon.getTokensCSS();
    expect(typeof css).toBe('string');
  });

  test('getTokensJS debe retornar objeto', () => {
    const js = addon.getTokensJS();
    expect(typeof js).toBe('object');
  });

  test('getTokenList debe retornar array', () => {
    const list = addon.getTokenList();
    expect(Array.isArray(list)).toBe(true);
  });

  test('hasToken debe retornar boolean', () => {
    const has = addon.hasToken('--ubits-test');
    expect(typeof has).toBe('boolean');
  });
});

describe('TokensAddon - Carga y Validación', () => {
  let addon: UBITSTokensAddon;

  beforeEach(() => {
    // Limpiar DOM antes de cada test
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    addon = new UBITSTokensAddon();
  });

  afterEach(() => {
    addon.destroy();
  });

  test('debe detectar tokens estáticos ya cargados', async () => {
    // Simular tokens estáticos cargados
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    await addon.initialize({});
    
    // Debe detectar que ya están cargados
    expect(addon.getTokensCSS()).toBeTruthy();
  });

  test('debe validar tokens después de inicializar', async () => {
    // Inyectar algunos tokens de prueba en el DOM
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --ubits-button-primary-bg-default: var(--ubits-accent-brand-static-inverted);
        --ubits-bg-1: var(--ubits-bg-1);
        --ubits-fg-1-high: var(--ubits-fg-1-high);
      }
    `;
    document.head.appendChild(style);

    await addon.initialize({});
    
    // La validación debe ejecutarse (aunque algunos tokens falten)
    const validation = (addon as any).validateDetailed();
    expect(validation).toBeDefined();
    expect(validation.totalRequired).toBeGreaterThan(0);
  });

  test('validateDetailed debe retornar estructura correcta', () => {
    // Inyectar algunos tokens
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --ubits-button-primary-bg-default: var(--ubits-accent-brand-static-inverted);
        --ubits-bg-1: var(--ubits-bg-1);
      }
    `;
    document.head.appendChild(style);

    const validation = (addon as any).validateDetailed();
    
    expect(validation).toHaveProperty('isValid');
    expect(validation).toHaveProperty('missingTokens');
    expect(validation).toHaveProperty('presentTokens');
    expect(validation).toHaveProperty('totalRequired');
    expect(Array.isArray(validation.missingTokens)).toBe(true);
    expect(Array.isArray(validation.presentTokens)).toBe(true);
    expect(typeof validation.isValid).toBe('boolean');
    expect(typeof validation.totalRequired).toBe('number');
  });

  test('debe poder verificar tokens individuales', () => {
    // Inyectar un token específico
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --ubits-accent-brand-static-inverted: var(--ubits-accent-brand-static-inverted);
      }
    `;
    document.head.appendChild(style);

    expect(addon.hasToken('--ubits-accent-brand-static-inverted')).toBe(true);
    expect(addon.hasToken('--ubits-token-inexistente')).toBe(false);
  });

  test('getTokenList debe incluir tokens requeridos', () => {
    const list = addon.getTokenList();
    
    // Debe incluir al menos los tokens requeridos
    expect(list.length).toBeGreaterThan(0);
    expect(list).toContain('--ubits-button-primary-bg-default');
    expect(list).toContain('--ubits-bg-1');
  });

  test('debe limpiar recursos al destruir', () => {
    const style = document.createElement('style');
    style.id = 'ubits-tokens-addon';
    document.head.appendChild(style);

    addon.destroy();
    
    // El elemento debe ser removido
    expect(document.getElementById('ubits-tokens-addon')).toBeNull();
  });
});

