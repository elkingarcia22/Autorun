/**
 * Tests para TokensManager
 */

import { TokensManager, getTokensManager, initializeTokensManager } from './TokensManager';

describe('TokensManager', () => {
  let manager: TokensManager;

  beforeEach(() => {
    // Limpiar DOM
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    manager = new TokensManager();
  });

  afterEach(() => {
    manager.destroy();
  });

  test('debe detectar tokens estáticos ya cargados', async () => {
    // Simular tokens estáticos
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    await manager.initialize();

    const info = manager.getTokensInfo();
    expect(info.source).toBe('static');
  });

  test('debe cargar tokens estáticos si no hay add-on configurado', async () => {
    const managerWithStatic = new TokensManager({
      autoLoadStatic: true,
      staticTokensPath: '../../tokens/dist/tokens.css'
    });

    // Mock de carga exitosa
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    await managerWithStatic.initialize();

    const info = managerWithStatic.getTokensInfo();
    expect(info.source).toBe('static');
  });

  test('debe intentar cargar add-on si está configurado', async () => {
    const managerWithAddon = new TokensManager({
      tokensAddonManifestPath: '/addons/tokens-ubits/manifest.json',
      autoLoadStatic: true
    });

    // Simular que no hay tokens estáticos
    // El manager intentará cargar el add-on

    await expect(managerWithAddon.initialize()).resolves.not.toThrow();
  });

  test('getTokensInfo debe retornar información correcta', async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    await manager.initialize();

    const info = manager.getTokensInfo();
    expect(info).toHaveProperty('source');
    expect(info).toHaveProperty('isValid');
    expect(['static', 'addon', 'unknown']).toContain(info.source);
  });

  test('debe poder cambiar a otro add-on', async () => {
    // Primero inicializar con tokens estáticos
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    await manager.initialize();

    // Cambiar a add-on
    await expect(manager.switchTokensAddon('/addons/tokens-custom/manifest.json')).resolves.not.toThrow();
  });
});

describe('TokensManager - Global', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  test('getTokensManager debe crear instancia global', () => {
    const manager1 = getTokensManager();
    const manager2 = getTokensManager();
    
    expect(manager1).toBe(manager2);
  });

  test('initializeTokensManager debe inicializar el manager global', async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../tokens/dist/tokens.css';
    document.head.appendChild(link);

    await expect(initializeTokensManager()).resolves.not.toThrow();
  });
});

