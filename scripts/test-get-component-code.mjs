#!/usr/bin/env node

/**
 * Script de prueba para getComponentCode
 * Simula la llamada al MCP de Storybook
 */

import { chromium } from 'playwright';

const componentId = process.argv[2] || 'formularios-radio-button';
const storyName = process.argv[3] || 'default';
const storybookUrl = process.env.STORYBOOK_URL || 'https://ubits-storybook10.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';

console.error(`\n[TEST] ========================================`);
console.error(`[TEST] 🔍 PRUEBA DE getComponentCode`);
console.error(`[TEST] Componente: ${componentId}`);
console.error(`[TEST] Historia: ${storyName}`);
console.error(`[TEST] ========================================\n`);

const urlObj = new URL(storybookUrl);
const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
const storyUrl = `${baseUrl}/?path=/story/${componentId}--${storyName}`;

console.error(`[TEST] 📚 URLs disponibles:\n`);
console.error(`[TEST]   - Implementation: ${implementationUrl}\n`);
console.error(`[TEST]   - Historia solicitada: ${storyUrl}\n`);
console.error(`[TEST]   - Docs: ${docsUrl}\n`);

let browser;
let page;

try {
  // PASO 1: Iniciar navegador
  console.error(`[TEST] [PASO 1/7] Iniciando navegador...`);
  browser = await chromium.launch({ headless: true });
  console.error(`[TEST] ✅ Navegador iniciado\n`);

  // PASO 2: Crear página
  console.error(`[TEST] [PASO 2/7] Creando página...`);
  page = await browser.newPage();
  console.error(`[TEST] ✅ Página creada\n`);

  // ⚠️ ESTRATEGIA MEJORADA: Intentar múltiples fuentes
  let codeResult = null;
  
  // INTENTO 1: Historia "implementation"
  if (storyName !== 'implementation') {
    console.error(`[TEST] [INTENTO 1/3] Intentando historia "implementation"...\n`);
    try {
      await page.goto(implementationUrl, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      
      codeResult = await extractCodeFromPage(page, 'implementation');
      if (codeResult) {
        console.error(`[TEST] ✅ Código extraído desde historia "implementation"\n\n`);
      }
    } catch (error) {
      console.error(`[TEST] ⚠️ Error en historia "implementation": ${error.message}\n`);
    }
  }
  
  // INTENTO 2: Historia solicitada
  if (!codeResult) {
    console.error(`[TEST] [INTENTO 2/3] Intentando historia solicitada: ${storyName}...\n`);
    try {
      await page.goto(storyUrl, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      
      codeResult = await extractCodeFromPage(page, storyName);
      if (codeResult) {
        console.error(`[TEST] ✅ Código extraído desde historia "${storyName}"\n\n`);
      }
    } catch (error) {
      console.error(`[TEST] ⚠️ Error en historia "${storyName}": ${error.message}\n`);
    }
  }
  
  // INTENTO 3: Docs con botón "Show code"
  if (!codeResult) {
    console.error(`[TEST] [INTENTO 3/3] Intentando página de Docs con botón "Show code"...\n`);
    try {
      await page.goto(docsUrl, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      
      // Buscar y hacer clic en botón "Show code"
      const showCodeClicked = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, [role="button"], a[class*="button"]'));
        for (const btn of buttons) {
          const text = btn.textContent || btn.innerText || '';
          const ariaLabel = btn.getAttribute('aria-label') || '';
          if (text.toLowerCase().includes('show code') || 
              text.toLowerCase().includes('showcode') ||
              ariaLabel.toLowerCase().includes('show code')) {
            btn.click();
            return true;
          }
        }
        return false;
      });
      
      if (showCodeClicked) {
        console.error(`[TEST] ✅ Botón "Show code" clickeado\n`);
        await page.waitForTimeout(2000);
      }
      
      codeResult = await extractCodeFromPage(page, 'docs');
      if (codeResult) {
        console.error(`[TEST] ✅ Código extraído desde Docs\n\n`);
      }
    } catch (error) {
      console.error(`[TEST] ⚠️ Error en Docs: ${error.message}\n`);
    }
  }
  
  if (!codeResult) {
    console.error(`[TEST] ❌ No se encontró código en ninguna fuente\n`);
    console.log(JSON.stringify({
      success: false,
      error: 'No se pudo extraer código desde ninguna fuente (implementation, historia solicitada, o docs)',
      componentId,
      storyName,
    }, null, 2));
    await browser.close();
    process.exit(1);
  }
  
  // Función auxiliar para extraer código
  async function extractCodeFromPage(page, sourceName) {
    const result = await page.evaluate(() => {
      const allPre = document.querySelectorAll('pre');
      for (let i = 0; i < allPre.length; i++) {
        const pre = allPre[i];
        const text = pre.textContent || pre.innerText || '';
        if (text.trim().length > 20) {
          if (text.includes('window.UBITS') || 
              text.includes('create(') || 
              text.includes('containerId') ||
              (text.includes('<') && text.includes('>'))) {
            return { code: text, method: 'pre_search', selector: `pre[${i}]` };
          }
        }
      }
      return null;
    });
    
    if (!result) {
      const iframes = await page.$$('iframe');
      for (let i = 0; i < iframes.length; i++) {
        try {
          const frame = await iframes[i].contentFrame();
          if (frame) {
            const iframePre = await frame.$$('pre');
            if (iframePre.length > 0) {
              const text = await iframePre[0].textContent();
              if (text && text.length > 20) {
                return { code: text, method: 'iframe', selector: `iframe[${i}] pre` };
              }
            }
          }
        } catch (e) {
          // Continuar
        }
      }
    }
    
    return result;
  }
  
  // Continuar con el código extraído...

  // El código ya se extrajo arriba, continuar con procesamiento...
  console.error(`[TEST] [PASO 5/7] Buscando pestaña Code...`);
  const tabsInfo = await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('[role="tab"], button[aria-label], [role="tablist"] button, [role="tablist"] [role="tab"]'));
    return tabs.map((tab, index) => ({
      index,
      text: tab.textContent || tab.innerText || '',
      ariaLabel: tab.getAttribute('aria-label') || '',
      role: tab.getAttribute('role') || '',
    }));
  });

  console.error(`[TEST] 📋 Pestañas encontradas: ${tabsInfo.length}`);
  tabsInfo.forEach((tab) => {
    console.error(`[TEST]   Tab ${tab.index}: text="${tab.text}", aria-label="${tab.ariaLabel}"`);
  });
  console.error(`\n`);

  const codeTabResult = await page.evaluate(() => {
    // ⚠️ CRÍTICO: La pestaña "Code" está en el panel de addons (sidebar derecho)
    // Buscar TODOS los tablists en la página
    const allTabLists = document.querySelectorAll('[role="tablist"]');
    console.error(`[TEST] 📋 Tablists encontrados: ${allTabLists.length}`);
    
    for (let listIndex = 0; listIndex < allTabLists.length; listIndex++) {
      const tabList = allTabLists[listIndex];
      const tabs = Array.from(tabList.querySelectorAll('[role="tab"], button'));
      console.error(`[TEST]   Tablist ${listIndex}: ${tabs.length} pestañas`);
      
      // Buscar pestaña "Code" en este tablist
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        const text = tab.textContent || tab.innerText || '';
        const ariaLabel = tab.getAttribute('aria-label') || '';
        const id = tab.id || '';
        const ariaControls = tab.getAttribute('aria-controls') || '';
        const combinedText = `${text} ${ariaLabel} ${id} ${ariaControls}`.toLowerCase();
        
        console.error(`[TEST]     Tab ${i}: text="${text}", aria-label="${ariaLabel}", id="${id}", aria-controls="${ariaControls}"`);
        
        // Buscar "code" en cualquier parte
        if (combinedText.includes('code') || 
            text.toLowerCase() === 'code' ||
            ariaLabel.toLowerCase().includes('code') ||
            id.toLowerCase().includes('code') ||
            ariaControls.toLowerCase().includes('code')) {
          console.error(`[TEST] ✅ Pestaña Code encontrada en tablist ${listIndex}, tab ${i}`);
          tab.click();
          return { found: true, index: i, method: 'addon_panel_text_match', tablistIndex: listIndex };
        }
      }
    }
    
    console.error(`[TEST] ⚠️ No se encontró pestaña Code en ningún tablist`);
    return { found: false, index: -1, method: 'none' };
  });

  if (codeTabResult.found) {
    console.error(`[TEST] ✅ Pestaña Code encontrada (método: ${codeTabResult.method})\n`);
  } else {
    console.error(`[TEST] ⚠️ No se pudo clickear pestaña Code\n`);
  }

  // PASO 6: Esperar código
  console.error(`[TEST] [PASO 6/7] Esperando código...`);
  await page.waitForTimeout(2000);
  console.error(`[TEST] ✅ Espera completada\n`);

  // PASO 7: Extraer código
  console.error(`[TEST] [PASO 7/7] Extrayendo código...`);
  
  // Verificar estado de la página después del click
  const pageState = await page.evaluate(() => {
    return {
      url: window.location.href,
      tabPanels: document.querySelectorAll('[role="tabpanel"]').length,
      tabPanelsVisible: Array.from(document.querySelectorAll('[role="tabpanel"]')).filter(p => !p.hasAttribute('hidden') && p.style.display !== 'none').length,
      preElements: document.querySelectorAll('pre').length,
      codeElements: document.querySelectorAll('code').length,
      iframes: document.querySelectorAll('iframe').length,
      activeTab: document.querySelector('[role="tab"][aria-selected="true"]')?.textContent || 'none',
    };
  });
  
  console.error(`[TEST] 📊 Estado de la página:`);
  console.error(`[TEST]   URL: ${pageState.url}`);
  console.error(`[TEST]   Tabpanels: ${pageState.tabPanels} (${pageState.tabPanelsVisible} visibles)`);
  console.error(`[TEST]   Elementos pre: ${pageState.preElements}`);
  console.error(`[TEST]   Elementos code: ${pageState.codeElements}`);
  console.error(`[TEST]   Iframes: ${pageState.iframes}`);
  console.error(`[TEST]   Tab activo: "${pageState.activeTab}"`);
  console.error(`\n`);
  
  let codeResult = null;
  
  // Si hay iframes, buscar código en ellos
  if (pageState.iframes > 0) {
    console.error(`[TEST] 🔍 Buscando código en iframes...`);
    const iframes = await page.$$('iframe');
    for (let i = 0; i < iframes.length; i++) {
      try {
        const frame = await iframes[i].contentFrame();
        if (frame) {
          console.error(`[TEST]   Iframe ${i}: Frame accesible`);
          const iframePre = await frame.$$('pre');
          console.error(`[TEST]   Iframe ${i}: ${iframePre.length} elementos pre`);
          
          if (iframePre.length > 0) {
            // Intentar obtener texto de todos los pre
            for (let j = 0; j < iframePre.length; j++) {
              try {
                const text = await iframePre[j].textContent();
                console.error(`[TEST]   Iframe ${i}, Pre ${j}: longitud=${text ? text.length : 0}`);
                if (text && text.length > 20) {
                  console.error(`[TEST]   ✅ Código encontrado en iframe ${i}, pre ${j}`);
                  codeResult = { code: text, method: 'iframe', selector: `iframe[${i}] pre[${j}]` };
                  break;
                }
              } catch (e) {
                console.error(`[TEST]   ⚠️ Error obteniendo texto de pre ${j}: ${e.message}`);
              }
            }
            
            if (codeResult) break;
          } else {
            // Si no hay pre, buscar cualquier elemento con código
            const allElements = await frame.$$('*');
            console.error(`[TEST]   Iframe ${i}: ${allElements.length} elementos totales`);
            
            // Buscar en elementos code
            const codeElements = await frame.$$('code');
            console.error(`[TEST]   Iframe ${i}: ${codeElements.length} elementos code`);
            for (let j = 0; j < codeElements.length; j++) {
              try {
                const text = await codeElements[j].textContent();
                if (text && text.length > 20) {
                  console.error(`[TEST]   ✅ Código encontrado en iframe ${i}, code ${j}`);
                  codeResult = { code: text, method: 'iframe_code', selector: `iframe[${i}] code[${j}]` };
                  break;
                }
              } catch (e) {
                console.error(`[TEST]   ⚠️ Error obteniendo texto de code ${j}: ${e.message}`);
              }
            }
            
            if (codeResult) break;
          }
        }
      } catch (e) {
        console.error(`[TEST]   ⚠️ No se pudo acceder a iframe ${i}: ${e.message}`);
      }
    }
  }
  
  // Si no se encontró en iframes, buscar en la página principal
  if (!codeResult) {
    // Esperar a que el código se cargue (puede tardar más)
    console.error(`[TEST] Esperando 5 segundos adicionales para que el código se cargue...`);
    await page.waitForTimeout(5000);
    
    // Intentar esperar a que aparezca un elemento pre
    try {
      await page.waitForSelector('pre', { timeout: 10000, state: 'attached' });
      console.error(`[TEST] ✅ Elemento pre encontrado`);
    } catch (e) {
      console.error(`[TEST] ⚠️ No se encontró elemento pre con waitForSelector`);
    }
    
    codeResult = await page.evaluate(() => {
    console.error(`[TEST] 🔍 Buscando código en la página...`);
    
    // Obtener información de todos los elementos pre
    const allPre = document.querySelectorAll('pre');
    console.error(`[TEST] 📋 Elementos pre encontrados: ${allPre.length}`);
    
    for (let i = 0; i < allPre.length; i++) {
      const pre = allPre[i];
      const text = pre.textContent || pre.innerText || '';
      const className = pre.className || '';
      const id = pre.id || '';
      console.error(`[TEST]   Pre ${i}: longitud=${text.length}, class="${className}", id="${id}"`);
      console.error(`[TEST]   Primeros 100 caracteres: ${text.substring(0, 100)}`);
      
      if (text.trim().length > 20) {
        // Verificar si contiene código relevante
        if (text.includes('window.UBITS') || 
            text.includes('create(') || 
            text.includes('createRadioButton') ||
            text.includes('containerId') ||
            text.includes('RadioButton') ||
            (text.includes('<') && text.includes('>'))) {
          console.error(`[TEST]   ✅ Código relevante encontrado en pre ${i}`);
          return { code: text, method: 'pre_search', selector: `pre[${i}]` };
        }
      }
    }
    
    // Buscar en tabpanels
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    console.error(`[TEST] 📋 Tabpanels encontrados: ${tabPanels.length}`);
    
    for (let i = 0; i < tabPanels.length; i++) {
      const panel = tabPanels[i];
      const isHidden = panel.hasAttribute('hidden') || panel.style.display === 'none';
      console.error(`[TEST]   Tabpanel ${i}: hidden=${isHidden}`);
      
      if (!isHidden) {
        const preInPanel = panel.querySelector('pre');
        if (preInPanel) {
          const text = preInPanel.textContent || preInPanel.innerText || '';
          console.error(`[TEST]   ✅ Pre encontrado en tabpanel ${i}, longitud=${text.length}`);
          if (text.trim().length > 20) {
            return { code: text, method: 'tabpanel', selector: `tabpanel[${i}] pre` };
          }
        }
      }
    }
    
    // Buscar con selectores específicos
    const codeSelectors = [
      'pre.sb-code',
      'pre[class*="code"]',
      'pre[class*="Code"]',
      'pre[class*="sb-code"]',
      '.sb-code pre',
      '[class*="code"] pre',
      '[role="tabpanel"] pre',
      '[role="tabpanel"] code',
    ];

    console.error(`[TEST] 🔍 Intentando ${codeSelectors.length} selectores específicos...`);
    for (let i = 0; i < codeSelectors.length; i++) {
      const selector = codeSelectors[i];
      const codeElement = document.querySelector(selector);
      if (codeElement) {
        const text = codeElement.textContent || codeElement.innerText || '';
        console.error(`[TEST]   Selector ${i} ("${selector}"): longitud=${text.length}`);
        if (text.trim().length > 20) {
          console.error(`[TEST]   ✅ Código encontrado con selector "${selector}"`);
          return { code: text, method: `selector_${i}`, selector };
        }
      }
    }

    console.error(`[TEST] ❌ No se encontró código en ninguna ubicación`);
    return null;
    });
  }

  // Procesar código extraído
  const extractedCode = codeResult.code;
  const extractionMethod = codeResult.method;
  const extractionSelector = codeResult.selector;
  
  if (extractedCode) {
    console.error(`[TEST] ✅ Código extraído: ${extractedCode.length} caracteres`);
    console.error(`[TEST] Método: ${extractionMethod}`);
    console.error(`[TEST] Selector: ${extractionSelector}`);
    console.error(`[TEST] Primeros 500 caracteres:\n${extractedCode.substring(0, 500)}...\n`);
    
    // Separar HTML y JS
    let html = '';
    let js = '';
    
    if (extractedCode.includes('<') && extractedCode.includes('>')) {
      const htmlMatch = extractedCode.match(/<[^>]+>[\s\S]*?<\/[^>]+>/);
      if (htmlMatch) {
        html = htmlMatch[0];
      } else {
        html = extractedCode;
      }
    }
    
    if (extractedCode.includes('window.UBITS') || extractedCode.includes('create(')) {
      const jsMatch = extractedCode.match(/(window\.UBITS\.[\s\S]*?create\([\s\S]*?\)|window\.create\w+\([\s\S]*?\))/);
      if (jsMatch) {
        js = jsMatch[0];
      } else {
        js = extractedCode;
      }
    }
    
    console.error(`[TEST] ========================================`);
    console.error(`[TEST] ✅ RESULTADO FINAL`);
    console.error(`[TEST] HTML: ${html.length} caracteres`);
    console.error(`[TEST] JS: ${js.length} caracteres`);
    console.error(`[TEST] ========================================\n`);
    
    console.log(JSON.stringify({
      success: true,
      html: html || extractedCode,
      js: js || undefined,
      componentId,
      storyName,
      codeLength: extractedCode.length,
      extractionMethod,
      extractionSelector,
    }, null, 2));
  } else {
    console.error(`[TEST] ❌ No se encontró código\n`);
    console.log(JSON.stringify({
      success: false,
      error: 'No se encontró código en la pestaña Code',
      componentId,
      storyName,
    }, null, 2));
  }

} catch (error) {
  console.error(`[TEST] ❌ ERROR: ${error.message}`);
  console.error(`[TEST] Stack: ${error.stack}\n`);
  console.log(JSON.stringify({
    success: false,
    error: error.message,
    componentId,
    storyName,
    stack: error.stack,
  }, null, 2));
  process.exit(1);
} finally {
  if (page) {
    await page.close();
  }
  if (browser) {
    await browser.close();
  }
}

