/**
 * Storybook Loader
 * Utilidades para cargar tokens y componentes desde Storybook
 * Se integra con el sistema de add-ons de UBITS
 */

// Esperar a que UBITS esté disponible
function waitForUBITS() {
  return new Promise((resolve) => {
    if (window.UBITS && window.UBITS.Tokens && window.UBITS.Components) {
      resolve();
    } else {
      const checkInterval = setInterval(() => {
        if (window.UBITS && window.UBITS.Tokens && window.UBITS.Components) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    }
  });
}

/**
 * Cargar tokens desde Storybook
 */
async function loadTokensFromStorybook(url) {
  try {
    await waitForUBITS();
    
    console.log('🔄 Cargando tokens desde Storybook...');
    await window.UBITS.Tokens.applyFromSource({ cssUrl: url });
    
    console.log('✅ Tokens cargados exitosamente');
    
    // Verificar
    const info = window.UBITS.Tokens.getInfo();
    console.log('📊 Información de tokens:', info);
    
    return { success: true, info };
  } catch (error) {
    console.error('❌ Error cargando tokens:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Cargar componente desde Storybook
 */
async function loadComponentFromStorybook(manifestUrl) {
  try {
    await waitForUBITS();
    
    console.log('🔄 Cargando componente desde Storybook...');
    await window.UBITS.Components.loadFromStorybook({ manifestUrl });
    
    console.log('✅ Componente cargado exitosamente');
    
    // Verificar
    const loaded = window.UBITS.Components.getLoadedComponents();
    console.log('📊 Componentes cargados:', loaded);
    
    return { success: true, loaded };
  } catch (error) {
    console.error('❌ Error cargando componente:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Crear panel de control para Storybook
 */
function createStorybookPanel() {
  const panel = document.createElement('div');
  panel.id = 'storybook-panel';
  panel.innerHTML = `
    <div class="storybook-panel-container">
      <div class="storybook-panel-header">
        <h3>🎨 Storybook Loader</h3>
        <button class="storybook-panel-close" onclick="this.closest('#storybook-panel').style.display='none'">×</button>
      </div>
      
      <div class="storybook-panel-content">
        <div class="storybook-section">
          <h4>Tokens</h4>
          <div class="storybook-input-group">
            <label>URL de Tokens CSS:</label>
            <input type="text" id="tokens-url" placeholder="https://storybook.tu-empresa.com/tokens.css" />
            <button onclick="loadTokensFromInput()">Cargar Tokens</button>
          </div>
          <div id="tokens-status" class="storybook-status"></div>
        </div>
        
        <div class="storybook-section">
          <h4>Componentes</h4>
          <div class="storybook-input-group">
            <label>URL de Manifest:</label>
            <input type="text" id="component-manifest-url" placeholder="https://storybook.tu-empresa.com/button/manifest.json" />
            <button onclick="loadComponentFromInput()">Cargar Componente</button>
          </div>
          <div id="component-status" class="storybook-status"></div>
        </div>
        
        <div class="storybook-section">
          <h4>Estado</h4>
          <div id="storybook-info" class="storybook-info"></div>
        </div>
      </div>
    </div>
  `;
  
  // Estilos
  const style = document.createElement('style');
  style.textContent = `
    #storybook-panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 400px;
      max-height: 80vh;
      background: var(--ubits-bg-1);
      border: 1px solid var(--ubits-border-1);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      overflow-y: auto;
      font-family: var(--font-sans);
    }
    
    .storybook-panel-container {
      padding: 16px;
    }
    
    .storybook-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--ubits-border-1);
    }
    
    .storybook-panel-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--ubits-fg-1-high);
    }
    
    .storybook-panel-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--ubits-fg-1-medium);
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .storybook-panel-close:hover {
      color: var(--ubits-fg-1-high);
    }
    
    .storybook-section {
      margin-bottom: 24px;
    }
    
    .storybook-section h4 {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--ubits-fg-1-high);
    }
    
    .storybook-input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .storybook-input-group label {
      font-size: 12px;
      color: var(--ubits-fg-1-medium);
      font-weight: 500;
    }
    
    .storybook-input-group input {
      padding: 8px 12px;
      border: 1px solid var(--ubits-border-1);
      border-radius: 6px;
      font-size: 14px;
      font-family: var(--font-sans);
      background: var(--ubits-bg-1);
      color: var(--ubits-fg-1-high);
    }
    
    .storybook-input-group input:focus {
      outline: none;
      border-color: var(--ubits-accent-brand-static-inverted);
      box-shadow: 0 0 0 3px var(--ubits-button-focus-ring);
    }
    
    .storybook-input-group button {
      padding: 8px 16px;
      background: var(--ubits-button-primary-bg-default);
      color: var(--ubits-btn-primary-fg);
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      font-family: var(--font-sans);
      transition: background 0.2s;
    }
    
    .storybook-input-group button:hover {
      background: var(--ubits-button-primary-hover);
    }
    
    .storybook-input-group button:active {
      background: var(--ubits-button-primary-pressed);
    }
    
    .storybook-status {
      margin-top: 8px;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      min-height: 20px;
    }
    
    .storybook-status.success {
      background: var(--ubits-accent-success);
      color: var(--ubits-bg-1);
    }
    
    .storybook-status.error {
      background: var(--ubits-accent-error);
      color: var(--ubits-bg-1);
    }
    
    .storybook-info {
      padding: 12px;
      background: var(--ubits-bg-2);
      border-radius: 6px;
      font-size: 12px;
      color: var(--ubits-fg-1-medium);
      line-height: 1.6;
    }
    
    .storybook-info strong {
      color: var(--ubits-fg-1-high);
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(panel);
  
  // Actualizar información
  updateStorybookInfo();
  
  return panel;
}

/**
 * Actualizar información del panel
 */
async function updateStorybookInfo() {
  await waitForUBITS();
  
  const infoDiv = document.getElementById('storybook-info');
  if (!infoDiv) return;
  
  try {
    const tokensInfo = window.UBITS.Tokens.getInfo();
    const componentsInfo = window.UBITS.Components.getLoadedComponents();
    
    infoDiv.innerHTML = `
      <div><strong>Tokens:</strong> ${tokensInfo.source} ${tokensInfo.isValid ? '✅' : '⚠️'}</div>
      <div><strong>Componentes:</strong> ${componentsInfo.length} cargados</div>
      ${componentsInfo.length > 0 ? `<div style="margin-top: 8px; font-size: 11px;">${componentsInfo.map(c => c.name).join(', ')}</div>` : ''}
    `;
  } catch (error) {
    infoDiv.innerHTML = `<div style="color: var(--ubits-accent-error);">Error: ${error.message}</div>`;
  }
}

/**
 * Cargar tokens desde input
 */
async function loadTokensFromInput() {
  const input = document.getElementById('tokens-url');
  const status = document.getElementById('tokens-status');
  
  if (!input.value.trim()) {
    status.className = 'storybook-status error';
    status.textContent = 'Por favor ingresa una URL';
    return;
  }
  
  status.className = 'storybook-status';
  status.textContent = 'Cargando...';
  
  const result = await loadTokensFromStorybook(input.value);
  
  if (result.success) {
    status.className = 'storybook-status success';
    status.textContent = '✅ Tokens cargados exitosamente';
    updateStorybookInfo();
  } else {
    status.className = 'storybook-status error';
    status.textContent = `❌ Error: ${result.error}`;
  }
}

/**
 * Cargar componente desde input
 */
async function loadComponentFromInput() {
  const input = document.getElementById('component-manifest-url');
  const status = document.getElementById('component-status');
  
  if (!input.value.trim()) {
    status.className = 'storybook-status error';
    status.textContent = 'Por favor ingresa una URL';
    return;
  }
  
  status.className = 'storybook-status';
  status.textContent = 'Cargando...';
  
  const result = await loadComponentFromStorybook(input.value);
  
  if (result.success) {
    status.className = 'storybook-status success';
    status.textContent = '✅ Componente cargado exitosamente';
    updateStorybookInfo();
  } else {
    status.className = 'storybook-status error';
    status.textContent = `❌ Error: ${result.error}`;
  }
}

/**
 * Inicializar panel de Storybook
 */
function initStorybookPanel() {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        createStorybookPanel();
        // Actualizar cada 5 segundos
        setInterval(updateStorybookInfo, 5000);
      }, 1000);
    });
  } else {
    setTimeout(() => {
      createStorybookPanel();
      setInterval(updateStorybookInfo, 5000);
    }, 1000);
  }
  
  // Agregar botón flotante para abrir panel
  const toggleButton = document.createElement('button');
  toggleButton.innerHTML = '🎨';
  toggleButton.className = 'storybook-toggle-button';
  toggleButton.onclick = () => {
    const panel = document.getElementById('storybook-panel');
    if (panel) {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
  };
  
  const toggleStyle = document.createElement('style');
  toggleStyle.textContent = `
    .storybook-toggle-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--ubits-button-primary-bg-default);
      color: var(--ubits-btn-primary-fg);
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      transition: transform 0.2s;
    }
    
    .storybook-toggle-button:hover {
      transform: scale(1.1);
      background: var(--ubits-button-primary-hover);
    }
  `;
  
  document.head.appendChild(toggleStyle);
  document.body.appendChild(toggleButton);
}

// Auto-inicializar
initStorybookPanel();

// Exportar funciones globales
window.loadTokensFromStorybook = loadTokensFromStorybook;
window.loadComponentFromStorybook = loadComponentFromStorybook;

