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

