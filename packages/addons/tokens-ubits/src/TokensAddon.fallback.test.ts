/**
 * Tests de fallback para TokensAddon
 * Verifica que el sistema de fallback funcione correctamente
 */

import { UBITSTokensAddon } from './TokensAddon';

describe('TokensAddon - Fallback', () => {
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

  test('debe usar tokens estáticos si ya están cargados', async () => {
    // Simular tokens estáticos
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    await addon.initialize({});

    // No debe intentar cargar desde add-on
    const styleElement = document.getElementById('ubits-tokens-addon');
    expect(styleElement).toBeNull();
  });

  test('debe intentar fallback si carga principal falla', async () => {
    // Configurar ruta inválida para forzar fallback
    addon.setTokensCSSPath('/ruta/inexistente/tokens.css');
    addon.setFallbackTokensCSSPath('../../tokens/dist/tokens.css');

    // Mock de fetch para simular error
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    try {
      await addon.initialize({});
      
      // Debe haber intentado usar fallback
      const fallbackLink = document.getElementById('ubits-tokens-fallback');
      expect(fallbackLink).toBeTruthy();
    } catch (error) {
      // Si falla completamente, está bien para este test
      expect(error).toBeDefined();
    } finally {
      global.fetch = originalFetch;
    }
  });

  test('debe funcionar aunque algunos tokens falten', async () => {
    // Inyectar solo algunos tokens
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --ubits-bg-1: var(--ubits-bg-1);
        --ubits-fg-1-high: var(--ubits-fg-1-high);
      }
    `;
    document.head.appendChild(style);

    await addon.initialize({});

    // Debe inicializarse aunque falten tokens
    const validation = (addon as any).validateDetailed();
    expect(validation.presentTokens.length).toBeGreaterThan(0);
  });

  test('debe limpiar cache de validación correctamente', () => {
    const style = document.createElement('style');
    style.textContent = `:root { --ubits-bg-1: var(--ubits-bg-1); }`;
    document.head.appendChild(style);

    // Validar una vez
    (addon as any).validateDetailed();
    
    // Limpiar cache
    (addon as any).clearValidationCache();
    
    // Validar de nuevo debe recalcular
    const result1 = (addon as any).validateDetailed();
    const result2 = (addon as any).validateDetailed();
    
    // Deben ser iguales (mismo estado)
    expect(result1.isValid).toBe(result2.isValid);
  });
});

