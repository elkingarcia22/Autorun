#!/usr/bin/env node

/**
 * Wrapper personalizado para storybook-mcp que:
 * 1. Aumenta el timeout para la extracción de props (30s en lugar de 10s)
 * 2. Usa múltiples selectores alternativos
 * 3. Maneja mejor los errores
 * 4. Espera contenido dinámico (3s adicionales después de networkidle)
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { chromium } from "playwright";

const GetComponentListSchema = z.object({});
const GetComponentsPropsSchema = z.object({
  componentNames: z
    .array(z.string())
    .describe("Array of component names to get props information for"),
});

/**
 * Obtiene la lista de componentes desde index.json
 */
async function getComponentList(storybookUrl) {
  try {
    // ⚠️ CRÍTICO: Asegurar que la URL esté correctamente formateada
    // Si la URL incluye query parameters, extraer solo la URL base
    let urlToFetch = storybookUrl;
    try {
      const urlObj = new URL(storybookUrl);
      // Si la URL tiene query parameters, mantenerlos (pueden ser necesarios para bypass)
      urlToFetch = urlObj.toString();
    } catch (urlError) {
      // Si no es una URL válida, intentar usarla tal cual
      process.stderr.write(`[Storybook MCP] ⚠️ URL no válida, usando tal cual: ${storybookUrl}\n`);
    }
    
    process.stderr.write(`[Storybook MCP] 🔍 Fetching: ${urlToFetch}\n`);
    
    // ⚠️ CRÍTICO: Crear AbortController para timeout (compatible con todas las versiones de Node.js)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos
    
    const response = await fetch(urlToFetch, {
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Storybook data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.v === 5 && data.entries) {
      const entries = data.entries;
      const components = Object.values(entries)
        .filter((entry) => entry.type === "docs")
        .map((entry) => entry.title)
        .filter((title) => title)
        .sort();
      process.stderr.write(`[Storybook MCP] ✅ Componentes encontrados: ${components.length}\n`);
      return [...new Set(components)];
    }
    
    process.stderr.write(`[Storybook MCP] ⚠️ Formato de datos no reconocido o sin entries\n`);
    return [];
  } catch (error) {
    process.stderr.write(`[Storybook MCP] ❌ Error en getComponentList: ${error.message}\n`);
    process.stderr.write(`[Storybook MCP] Stack: ${error.stack}\n`);
    throw error;
  }
}

/**
 * Obtiene la URL de documentación de un componente
 * Usa la URL principal de docs en lugar de iframe.html para mejor compatibilidad
 */
function getComponentPropsDocUrl(data, componentName, storybookUrl) {
  if (!data || data.v !== 5 || !data.entries) {
    return null;
  }
  
  const entries = data.entries || {};
  const matchingEntry = Object.values(entries).find(
    (entry) => entry.type === "docs" && entry.title === componentName
  );
  
  if (!matchingEntry) {
    return null;
  }
  
  // ⚠️ CRÍTICO: Construir URL base correctamente usando URL object
  // Esto maneja correctamente URLs con query parameters
  const urlObj = new URL(storybookUrl);
  const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
  
  // ⚠️ CRÍTICO: Usar iframe.html porque las props están en el iframe
  // Formato: iframe.html?viewMode=docs&id={id}
  const componentUrl = `${baseUrl}/iframe.html?viewMode=${matchingEntry.type}&id=${encodeURIComponent(matchingEntry.id)}`;
  
  return componentUrl;
}

/**
 * ⭐ NUEVO: Activar subcomponentes interactivos
 * Detecta y activa componentes que requieren interacción (click, focus, etc.)
 * Ejemplo: Input tipo calendar → hacer clic para mostrar Calendar
 */
async function activateInteractiveSubcomponents(page, componentName) {
  try {
    process.stderr.write(`[Storybook MCP] 🔍 Detectando subcomponentes interactivos...\n`);
    
    // ESTRATEGIA 1: Buscar inputs tipo calendar y hacer clic para mostrar Calendar
    const calendarInputs = await page.$$eval(
      'input[type="text"][readonly], input.ubits-input[readonly]',
      (inputs) => {
        return inputs
          .map((input, index) => {
            // Verificar si tiene icono de calendario
            const container = input.closest('.ubits-input-container, .ubits-input');
            const hasCalendarIcon = container?.querySelector('.ubits-input-icon-right, [class*="calendar"]');
            
            if (hasCalendarIcon) {
              return {
                index,
                selector: `input[type="text"][readonly]:nth-of-type(${index + 1})`,
              };
            }
            return null;
          })
          .filter(Boolean);
      }
    ).catch(() => []);

    // Hacer clic en inputs de calendario para activar el Calendar
    for (const input of calendarInputs) {
      try {
        process.stderr.write(`[Storybook MCP]   📅 Activando Calendar en input ${input.index + 1}\n`);
        await page.click(input.selector);
        await page.waitForTimeout(1000); // Esperar a que se muestre el Calendar
        
        // Verificar si se mostró el Calendar
        const calendarVisible = await page.$('.ubits-calendar, [class*="calendar"]').catch(() => null);
        if (calendarVisible) {
          process.stderr.write(`[Storybook MCP]   ✅ Calendar detectado y activado\n`);
          
          // Extraer información del Calendar visible
          const calendarInfo = await page.$eval(
            '.ubits-calendar, [class*="calendar"]',
            (el) => ({
              html: el.outerHTML.substring(0, 500), // Primeros 500 caracteres
              classes: Array.from(el.classList).join(' '),
            })
          ).catch(() => null);
          
          if (calendarInfo) {
            process.stderr.write(`[Storybook MCP]   📋 Calendar HTML extraído (${calendarInfo.html.length} caracteres)\n`);
          }
        }
      } catch (error) {
        process.stderr.write(`[Storybook MCP]   ⚠️ Error activando Calendar: ${error.message}\n`);
      }
    }

    // ESTRATEGIA 2: Buscar selects y autocompletes y hacer clic para mostrar dropdowns
    const selects = await page.$$eval(
      'select, .ubits-input[data-type="select"], .ubits-input[data-type="autocomplete"]',
      (elements) => {
        return elements
          .map((el, index) => {
            const tagName = el.tagName.toLowerCase();
            const dataType = el.getAttribute('data-type');
            
            if (tagName === 'select' || dataType === 'select' || dataType === 'autocomplete') {
              return {
                index,
                selector: tagName === 'select' 
                  ? `select:nth-of-type(${index + 1})`
                  : `.ubits-input[data-type="${dataType}"]:nth-of-type(${index + 1})`,
              };
            }
            return null;
          })
          .filter(Boolean);
      }
    ).catch(() => []);

    // Hacer clic en selects para mostrar dropdowns
    for (const select of selects) {
      try {
        process.stderr.write(`[Storybook MCP]   📋 Activando Dropdown en select ${select.index + 1}\n`);
        await page.click(select.selector);
        await page.waitForTimeout(500); // Esperar a que se muestre el dropdown
      } catch (error) {
        // Continuar con siguiente
      }
    }

    process.stderr.write(`[Storybook MCP] ✅ Subcomponentes interactivos activados\n`);
  } catch (error) {
    process.stderr.write(`[Storybook MCP] ⚠️ Error activando subcomponentes: ${error.message}\n`);
    // Continuar aunque falle
  }
}

/**
 * Extrae props de una página con múltiples selectores y timeout aumentado
 * ⭐ MEJORADO: Expande automáticamente opciones colapsadas para obtener información completa
 * ⭐ MEJORADO: Activa subcomponentes interactivos (Calendar, Dropdowns, etc.)
 */
async function extractPropsFromPage(page, componentName) {
  // ⭐ NUEVO: PASO 1 - Expandir todas las opciones colapsadas primero
  // ⭐ NUEVO: PASO 1.5 - Detectar y activar subcomponentes interactivos
  try {
    process.stderr.write(`[Storybook MCP] 🔍 Expandiendo opciones colapsadas...\n`);
    
    // ⭐ NUEVO: Detectar y activar subcomponentes interactivos
    // Por ejemplo: Input tipo calendar → hacer clic para mostrar Calendar
    await activateInteractiveSubcomponents(page, componentName);
    
    // Buscar y hacer clic en todos los botones de expansión
    const expandButtons = await page.$$eval(
      'button',
      (buttons) => {
        return buttons
          .map((btn, index) => {
            const text = btn.textContent || '';
            const ariaLabel = btn.getAttribute('aria-label') || '';
            const className = btn.className || '';
            
            // Buscar botones que indiquen expansión
            const isExpandButton =
              text.toLowerCase().includes('show') &&
              (text.toLowerCase().includes('more') ||
                text.toLowerCase().includes('additional') ||
                text.toLowerCase().includes('hide'));
            
            if (isExpandButton) {
              return {
                index,
                text: text.trim(),
                selector: `button:nth-of-type(${index + 1})`,
              };
            }
            return null;
          })
          .filter(Boolean);
      }
    );

    // Hacer clic en todos los botones de expansión
    for (const button of expandButtons) {
      try {
        process.stderr.write(
          `[Storybook MCP]   📂 Expandiendo: "${button.text}"\n`
        );
        await page.click(`button:nth-of-type(${button.index + 1})`);
        await page.waitForTimeout(500); // Esperar a que se expanda
      } catch (error) {
        // Continuar con siguiente botón
        process.stderr.write(
          `[Storybook MCP]   ⚠️ No se pudo expandir: ${error.message}\n`
        );
      }
    }

    // Esperar un poco más para que todo se expanda
    await page.waitForTimeout(1000);
    process.stderr.write(
      `[Storybook MCP] ✅ Opciones expandidas: ${expandButtons.length} botones\n`
    );
  } catch (error) {
    process.stderr.write(
      `[Storybook MCP] ⚠️ Error expandiendo opciones: ${error.message}\n`
    );
    // Continuar con la extracción aunque falle la expansión
  }

  // Selectores alternativos para la tabla de props
  const selectors = [
    "table.docblock-argstable",
    "table[class*='argstable']",
    "table[class*='props']",
    ".docblock-argstable",
    "[class*='argstable']",
    "table",
  ];
  
  // Intentar cada selector con timeout aumentado
  for (const selector of selectors) {
    try {
      // Esperar hasta 30 segundos (aumentado desde 10)
      await page.waitForSelector(selector, {
        timeout: 30000,
        state: "visible",
      });
      
      // ⭐ NUEVO: Obtener HTML completo después de expandir
      // Esto garantiza que todas las opciones estén visibles
      const propsTableHTML = await page.$eval(selector, (element) => {
        // Asegurar que todas las filas estén visibles
        const rows = element.querySelectorAll('tr');
        rows.forEach((row) => {
          // Remover estilos que oculten contenido
          if (row.style.display === 'none') {
            row.style.display = '';
          }
        });
        
        return element.outerHTML;
      });
      
      if (propsTableHTML && propsTableHTML.trim().length > 0) {
        process.stderr.write(
          `[Storybook MCP] ✅ Tabla de props obtenida (${propsTableHTML.length} caracteres)\n`
        );
        return propsTableHTML;
      }
    } catch (error) {
      // Continuar con el siguiente selector
      continue;
    }
  }
  
  // ⭐ MEJORADO: Intentar extraer desde el HTML completo después de expandir
  try {
    // ⭐ NUEVO: Asegurar que todas las opciones estén expandidas antes de extraer
    await page.evaluate(() => {
      // Buscar y hacer clic en todos los botones de expansión
      const buttons = document.querySelectorAll('button');
      buttons.forEach((btn) => {
        const text = (btn.textContent || '').toLowerCase();
        const ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
        
        // Buscar botones que indiquen expansión
        if (
          (text.includes('show') && (text.includes('more') || text.includes('additional'))) ||
          ariaLabel.includes('expand') ||
          ariaLabel.includes('show more')
        ) {
          // Verificar si está colapsado
          const isCollapsed = btn.getAttribute('aria-expanded') === 'false' ||
                             btn.classList.contains('css-nufaeh') ||
                             !text.includes('hide');
          
          if (isCollapsed) {
            btn.click();
          }
        }
      });
    });
    
    // Esperar a que se expanda
    await page.waitForTimeout(1000);
    
    const bodyHTML = await page.evaluate(() => {
      // Buscar cualquier tabla que pueda contener props
      const tables = document.querySelectorAll("table");
      for (const table of tables) {
        // ⭐ NUEVO: Asegurar que todas las filas estén visibles
        const rows = table.querySelectorAll('tr');
        rows.forEach((row) => {
          if (row.style.display === 'none') {
            row.style.display = '';
          }
        });
        
        const text = table.textContent || "";
        // Verificar si parece una tabla de props (tiene headers como "Name", "Type", "Default")
        if (
          text.includes("Name") ||
          text.includes("Type") ||
          text.includes("Default") ||
          text.includes("Description") ||
          text.includes("Prop") ||
          text.includes("Argument")
        ) {
          return table.outerHTML;
        }
      }
      
      // Si no hay tabla, buscar en elementos con clases relacionadas a props
      const propsElements = document.querySelectorAll("[class*='prop'], [class*='arg'], [class*='control']");
      for (const elem of propsElements) {
        if (elem.tagName === "TABLE" || elem.querySelector("table")) {
          const table = elem.tagName === "TABLE" ? elem : elem.querySelector("table");
          if (table) {
            // ⭐ NUEVO: Asegurar que todas las filas estén visibles
            const rows = table.querySelectorAll('tr');
            rows.forEach((row) => {
              if (row.style.display === 'none') {
                row.style.display = '';
              }
            });
            return table.outerHTML;
          }
        }
      }
      
      return null;
    });
    
    if (bodyHTML) {
      process.stderr.write(
        `[Storybook MCP] ✅ HTML completo obtenido después de expandir (${bodyHTML.length} caracteres)\n`
      );
      return bodyHTML;
    }
    
    // ⭐ MEJORADO: Último intento - extraer todo el contenido después de expandir
    const pageContent = await page.evaluate(() => {
      // Buscar secciones que puedan contener información de props
      const sections = document.querySelectorAll("section, div[class*='doc'], div[class*='props']");
      let propsInfo = "";
      
      for (const section of sections) {
        const text = section.textContent || "";
        if (
          text.includes("variant") ||
          text.includes("size") ||
          text.includes("text") ||
          text.includes("icon") ||
          text.includes("disabled") ||
          text.includes("loading") ||
          text.includes("type") ||
          text.includes("state")
        ) {
          // Intentar encontrar una tabla dentro de esta sección
          const table = section.querySelector("table");
          if (table) {
            // ⭐ NUEVO: Asegurar que todas las filas estén visibles
            const rows = table.querySelectorAll('tr');
            rows.forEach((row) => {
              if (row.style.display === 'none') {
                row.style.display = '';
              }
            });
            return table.outerHTML;
          }
          // Si no hay tabla, extraer el texto estructurado
          propsInfo += section.outerHTML + "\n";
        }
      }
      
      return propsInfo || null;
    });
    
    if (pageContent && pageContent.trim().length > 0) {
      process.stderr.write(
        `[Storybook MCP] ✅ Contenido extraído después de expandir (${pageContent.length} caracteres)\n`
      );
      return `<div class="extracted-props">${pageContent}</div>`;
    }
  } catch (error) {
    console.error("Error en extracción fallback:", error);
  }
  
  throw new Error(
    `No se pudo encontrar la tabla de props para "${componentName}". La página puede estar cargando o el formato de documentación es diferente.`
  );
}

/**
 * Extrae código HTML/JS directamente desde la pestaña "Code" de Storybook
 * ⭐ NUEVO: Usa Playwright para navegar y extraer código sin necesidad de snapshot
 */
async function getComponentCode(componentId, storyName, storybookUrl) {
  process.stderr.write(`\n[Storybook MCP] ========================================\n`);
  process.stderr.write(`[Storybook MCP] 🔍 INICIANDO EXTRACCIÓN DE CÓDIGO\n`);
  process.stderr.write(`[Storybook MCP] Componente: ${componentId}\n`);
  process.stderr.write(`[Storybook MCP] Historia solicitada: ${storyName}\n`);
  process.stderr.write(`[Storybook MCP] Storybook URL: ${storybookUrl}\n`);
  
  // Construir URLs
  const urlObj = new URL(storybookUrl);
  const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
  
  // ⚠️ NUEVO: Priorizar historia "implementation" si existe
  // Estrategia:
  // 1. Intentar historia "implementation" primero (tiene código copy/paste)
  // 2. Si no funciona, intentar la historia solicitada
  // 3. Si no funciona, intentar página de docs con botón "Show code"
  
  // ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
  const encodedComponentId = encodeURIComponent(componentId);
  
  const implementationUrl = `${baseUrl}/?path=/story/${encodedComponentId}--implementation`;
  const storyUrl = storyName === 'implementation' ? implementationUrl : `${baseUrl}/?path=/story/${encodedComponentId}--${storyName}`;
  const docsUrl = `${baseUrl}/?path=/docs/${encodedComponentId}--docs`;
  
  process.stderr.write(`[Storybook MCP] 📚 URLs disponibles:\n`);
  process.stderr.write(`[Storybook MCP]   - Implementation: ${implementationUrl}\n`);
  process.stderr.write(`[Storybook MCP]   - Historia solicitada: ${storyUrl}\n`);
  process.stderr.write(`[Storybook MCP]   - Docs: ${docsUrl}\n`);
  process.stderr.write(`[Storybook MCP] ========================================\n\n`);
  
  let browser;
  let page;
  let extractedCode = null;
  let extractionMethod = null;
  let extractionSelector = null;
  
  try {
    // PASO 1: Iniciar navegador
    process.stderr.write(`[Storybook MCP] [PASO 1] Iniciando navegador Playwright...\n`);
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    process.stderr.write(`[Storybook MCP] ✅ Navegador iniciado correctamente\n\n`);
    
    // PASO 2: Crear nueva página
    process.stderr.write(`[Storybook MCP] [PASO 2] Creando nueva página...\n`);
    page = await browser.newPage();
    process.stderr.write(`[Storybook MCP] ✅ Página creada\n\n`);
    
    // Función auxiliar para extraer código de una página
    async function extractCodeFromPage(page, sourceName) {
      process.stderr.write(`[Storybook MCP] 🔍 Extrayendo código desde ${sourceName}...\n`);
      
      // Intentar cliquear botones de "Show code" o "Code" antes de extraer
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
        for (const btn of buttons) {
          const text = (btn.textContent || btn.innerText || '').toLowerCase();
          if (text.includes('show code') || text === 'code') {
            btn.click();
          }
        }
      });
      await page.waitForTimeout(1000);

      const codeResult = await page.evaluate(() => {
        // Helper para limpiar el texto
        const cleanText = (text) => (text || '').trim();
        
        // Estrategia 0: Buscar en DocBlocks de Storybook 7/8
        const modernSelectors = [
          '.docblock-code-chromatic pre',
          '.sb-docblock-source pre',
          '[data-testid="docblock-source"] pre',
          '.css-1m6m4a5 pre',
          '.prismjs pre',
          'code.language-html',
          'code.language-javascript',
          'code.language-typescript'
        ];
        
        for (const selector of modernSelectors) {
          const el = document.querySelector(selector);
          if (el && cleanText(el.textContent).length > 20) {
            return { code: el.textContent.trim(), method: 'modern_selector', selector };
          }
        }

        // Estrategia 1: Buscar botones de "Copy" (suelen tener el código completo)
        const buttons = Array.from(document.querySelectorAll('button'));
        for (const btn of buttons) {
          const btnText = (btn.textContent || '').toLowerCase();
          const btnTitle = (btn.getAttribute('title') || '').toLowerCase();
          if (btnText.includes('copy') || btnTitle.includes('copy')) {
            const dataCode = btn.getAttribute('data-copytext') || btn.getAttribute('data-clipboard-text');
            if (dataCode && dataCode.length > 20) {
              return { code: dataCode, method: 'copy_button_attr', selector: 'button[data-copytext]' };
            }
          }
        }

        // Estrategia 2: Buscar en elementos pre con contenido relevante
        const allPre = Array.from(document.querySelectorAll('pre'));
        for (let i = 0; i < allPre.length; i++) {
          const pre = allPre[i];
          const text = cleanText(pre.textContent || pre.innerText || '');
          if (text.length > 20) {
            const isRelevant = text.includes('window.UBITS') || 
                              text.includes('create(') || 
                              text.includes('render(') ||
                              text.includes('containerId') ||
                              (text.includes('<') && text.includes('>'));
            
            if (isRelevant) {
              return { code: text, method: 'pre_content', selector: `pre[${i}]` };
            }
          }
        }
        
        return null;
      });
      
      if (codeResult && codeResult.code) {
        const finalCleanCode = codeResult.code.trim();
        process.stderr.write(`[Storybook MCP] ✅ Código extraído (${finalCleanCode.length} caracteres) de ${sourceName}\n`);
        return { ...codeResult, code: finalCleanCode };
      }
      return null;
    }
    
    // ⚠️ ESTRATEGIA MEJORADA: Intentar múltiples fuentes
    
    // INTENTO 1: Historia "implementation" (prioridad alta - tiene código copy/paste)
    if (storyName !== 'implementation') {
      process.stderr.write(`[Storybook MCP] [INTENTO 1/3] Intentando historia "implementation"...\n`);
      try {
        await page.goto(implementationUrl, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(3000);
        
        const code = await extractCodeFromPage(page, 'implementation');
        if (code) {
          extractedCode = code.code;
          extractionMethod = code.method;
          extractionSelector = code.selector;
          process.stderr.write(`[Storybook MCP] ✅ Código extraído desde historia "implementation"\n\n`);
        }
      } catch (error) {
        process.stderr.write(`[Storybook MCP] ⚠️ Error en historia "implementation": ${error.message}\n`);
      }
    }
    
    // INTENTO 2: Historia solicitada (si no se encontró en implementation)
    if (!extractedCode) {
      process.stderr.write(`[Storybook MCP] [INTENTO 2/3] Intentando historia solicitada: ${storyName}...\n`);
      try {
        await page.goto(storyUrl, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(3000);
        
        const code = await extractCodeFromPage(page, storyName);
        if (code) {
          extractedCode = code.code;
          extractionMethod = code.method;
          extractionSelector = code.selector;
          process.stderr.write(`[Storybook MCP] ✅ Código extraído desde historia "${storyName}"\n\n`);
        }
      } catch (error) {
        process.stderr.write(`[Storybook MCP] ⚠️ Error en historia "${storyName}": ${error.message}\n`);
      }
    }
    
    // INTENTO 3: Página de Docs con botón "Show code" (último recurso)
    if (!extractedCode) {
      process.stderr.write(`[Storybook MCP] [INTENTO 3/3] Intentando página de Docs con botón "Show code"...\n`);
      try {
        await page.goto(docsUrl, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(3000);
        
        // Buscar y hacer clic en botón "Show code"
        const showCodeClicked = await page.evaluate(() => {
          // Buscar botón "Show code" en múltiples formatos
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
          process.stderr.write(`[Storybook MCP] ✅ Botón "Show code" clickeado\n`);
          await page.waitForTimeout(2000); // Esperar a que el código se muestre
        } else {
          process.stderr.write(`[Storybook MCP] ⚠️ No se encontró botón "Show code"\n`);
        }
        
        const code = await extractCodeFromPage(page, 'docs');
        if (code) {
          extractedCode = code.code;
          extractionMethod = code.method;
          extractionSelector = code.selector;
          process.stderr.write(`[Storybook MCP] ✅ Código extraído desde Docs\n\n`);
        }
      } catch (error) {
        process.stderr.write(`[Storybook MCP] ⚠️ Error en Docs: ${error.message}\n`);
      }
    }
    
    // Si no se encontró código en ninguna fuente, lanzar error
    if (!extractedCode) {
      throw new Error('No se pudo extraer código desde ninguna fuente (implementation, historia solicitada, o docs)');
    }
    
    process.stderr.write(`[Storybook MCP] ✅ Código extraído: ${extractedCode.length} caracteres\n`);
    process.stderr.write(`[Storybook MCP] Método de extracción: ${extractionMethod}\n`);
    process.stderr.write(`[Storybook MCP] Selector usado: ${extractionSelector}\n`);
    process.stderr.write(`[Storybook MCP] Primeros 200 caracteres: ${extractedCode.substring(0, 200)}...\n\n`);
    
    // PASO 3: Separar HTML y JS
    process.stderr.write(`[Storybook MCP] [PASO 3] Separando HTML y JS robustamente...\n`);
    
    let html = '';
    let js = '';
    
    // ⭐ NUEVA ESTRATEGIA: Detección multiformato
    const trimmedCode = extractedCode.trim();
    
    // Caso 1: El código ya viene con <script> tags
    const scriptMatch = trimmedCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    if (scriptMatch) {
      js = scriptMatch[1].trim();
      html = trimmedCode.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();
      process.stderr.write(`[Storybook MCP] ✅ Separado usando tags <script>\n`);
    } 
    // Caso 2: El código es puramente JS (empieza con comentarios JS, window, UBITS o tiene create)
    else if (trimmedCode.startsWith('//') || trimmedCode.startsWith('/*') || trimmedCode.startsWith('window.') || trimmedCode.startsWith('UBITS') || !trimmedCode.includes('<')) {
      js = trimmedCode;
      html = '';
      process.stderr.write(`[Storybook MCP] ✅ Detectado como puramente JavaScript\n`);
    }
    // Caso 3: Formato mixto (típico de UBITS: HTML + JS suelto)
    else {
      // Buscar el último cierre de tag HTML
      const lastTagIndex = trimmedCode.lastIndexOf('>');
      if (lastTagIndex !== -1) {
        // Intentar detectar si lo que sigue es JS
        const potentialJS = trimmedCode.substring(lastTagIndex + 1).trim();
        if (potentialJS.length > 5 && (potentialJS.includes('window') || potentialJS.includes('create(') || potentialJS.includes('tabs:'))) {
          // Es mixto: HTML primero, luego JS
          // Buscar el primer punto donde empieza el JS (generalmente después de un </div> o similar)
          const jsStartMatch = trimmedCode.match(/(?:window\.UBITS|UBITS|window\.create|create\w+\()/);
          if (jsStartMatch && jsStartMatch.index) {
            html = trimmedCode.substring(0, jsStartMatch.index).trim();
            js = trimmedCode.substring(jsStartMatch.index).trim();
            process.stderr.write(`[Storybook MCP] ✅ Separado formato mixto (HTML + JS suelto)\n`);
          }
        }
      }
    }

    // Fallback si no se pudo separar
    if (!html && !js) {
      html = trimmedCode;
      process.stderr.write(`[Storybook MCP] ⚠️ No se pudo separar, usando código completo como HTML\n`);
    }
    
    // Eliminar comentarios de Storybook o basura común
    if (js) js = js.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*/g, '$1').trim(); // Limpieza básica de comentarios
    
    process.stderr.write(`[Storybook MCP] ========================================\n`);
    process.stderr.write(`[Storybook MCP] ✅ EXTRACCIÓN COMPLETADA\n`);
    process.stderr.write(`[Storybook MCP] HTML: ${html.length} caracteres\n`);
    process.stderr.write(`[Storybook MCP] JS: ${js.length} caracteres\n`);
    process.stderr.write(`[Storybook MCP] ========================================\n\n`);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            html: html || extractedCode,
            js: js || undefined,
            componentId,
            storyName,
            codeLength: extractedCode.length,
            extractionMethod,
            extractionSelector,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    process.stderr.write(`\n[Storybook MCP] ========================================\n`);
    process.stderr.write(`[Storybook MCP] ❌ ERROR EN EXTRACCIÓN\n`);
    process.stderr.write(`[Storybook MCP] Mensaje: ${errorMessage}\n`);
    if (errorStack) {
      process.stderr.write(`[Storybook MCP] Stack:\n${errorStack}\n`);
    }
    process.stderr.write(`[Storybook MCP] ========================================\n\n`);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: false,
            error: errorMessage,
            componentId,
            storyName,
          }, null, 2),
        },
      ],
    };
  } finally {
    if (page) {
      await page.close();
    }
    await browser.close();
  }
}

/**
 * Obtiene props de múltiples componentes
 */
async function getComponentsProps(componentNames, storybookUrl) {
  // Obtener datos del Storybook
  const response = await fetch(storybookUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Storybook data: ${response.statusText}`);
  }
  const data = await response.json();
  
  const results = {};
  const errors = {};
  
  // Usar Playwright para obtener contenido de las páginas
  const browser = await chromium.launch({ headless: true });
  
  try {
    for (const componentName of componentNames) {
      try {
        const componentUrl = getComponentPropsDocUrl(data, componentName, storybookUrl);
        
        if (!componentUrl) {
          errors[componentName] = `Component "${componentName}" not found in Storybook`;
          continue;
        }
        
        const page = await browser.newPage();
        
        try {
          // Navegar con timeout aumentado y esperar a que la red esté inactiva
          await page.goto(componentUrl, {
            waitUntil: "networkidle",
            timeout: 60000, // 60 segundos para cargar la página
          });
          
          // Esperar a que el contenido se renderice completamente
          await page.waitForTimeout(5000); // Aumentado a 5 segundos
          
          // ⚠️ CRÍTICO: La tabla está directamente en la página (iframe.html), no en un iframe anidado
          // Intentar esperar a que cualquier tabla aparezca
          try {
            await page.waitForSelector("table", { timeout: 10000, state: "attached" });
          } catch {
            // Continuar aunque no haya tabla visible todavía
          }
          
          // Extraer props con múltiples selectores
          const propsTableHTML = await extractPropsFromPage(page, componentName);
          results[componentName] = propsTableHTML;
        } catch (pageError) {
          errors[componentName] = `Failed to load component page or find props table: ${
            pageError instanceof Error ? pageError.message : String(pageError)
          }`;
        } finally {
          await page.close();
        }
      } catch (componentError) {
        errors[componentName] = `Failed to get component URL: ${
          componentError instanceof Error
            ? componentError.message
            : String(componentError)
        }`;
      }
    }
  } finally {
    await browser.close();
  }
  
  // Formatear resultados
  let resultText = "Props information for components:\n\n";
  for (const componentName of componentNames) {
    resultText += `### ${componentName}\n`;
    if (results[componentName]) {
      resultText += `${results[componentName]}\n\n`;
    } else if (errors[componentName]) {
      resultText += `Error: ${errors[componentName]}\n\n`;
    }
  }
  
  return {
    content: [
      {
        type: "text",
        text: resultText,
      },
    ],
  };
}

/**
 * Servidor MCP personalizado
 */
class CustomStorybookMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "storybook-mcp-wrapper",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    
    if (!process.env.STORYBOOK_URL) {
      throw new Error("STORYBOOK_URL environment variable is required");
    }
    
    this.storybookUrl = process.env.STORYBOOK_URL;
    this.setupToolHandlers();
  }
  
  setupToolHandlers() {
    // Listar herramientas disponibles
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "getComponentList",
            description: "Get a list of all components from the configured Storybook",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "getComponentsProps",
            description: "Get props information for multiple components (with improved timeout and selectors)",
            inputSchema: {
              type: "object",
              properties: {
                componentNames: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "Array of component names to get props information for",
                },
              },
              required: ["componentNames"],
            },
          },
          {
            name: "getComponentCode",
            description: "Extract HTML/JS code directly from Storybook Code tab using Playwright (no snapshot needed)",
            inputSchema: {
              type: "object",
              properties: {
                componentId: {
                  type: "string",
                  description: "Component ID in Storybook (e.g., 'data-data-table')",
                },
                storyName: {
                  type: "string",
                  description: "Story name (default: 'default')",
                  default: "default",
                },
              },
              required: ["componentId"],
            },
          },
        ],
      };
    });
    
    // Manejar llamadas a herramientas
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      process.stderr.write(`[Storybook MCP] 🔧 Tool llamado: ${name}\n`);
      process.stderr.write(`[Storybook MCP] 📋 Args: ${JSON.stringify(args, null, 2)}\n`);
      
      try {
        switch (name) {
          case "getComponentList":
            try {
              const components = await getComponentList(this.storybookUrl);
              return {
                content: [
                  {
                    type: "text",
                    text: `Available components:\n${components.join("\n")}`,
                  },
                ],
              };
            } catch (error) {
              // ⚠️ CRÍTICO: Si falla, retornar error en formato JSON para que el cliente pueda parsearlo
              const errorMessage = error instanceof Error ? error.message : String(error);
              const errorStack = error instanceof Error ? error.stack : undefined;
              
              process.stderr.write(`[Storybook MCP] ❌ Error en getComponentList: ${errorMessage}\n`);
              
              return {
                content: [
                  {
                    type: "text",
                    text: JSON.stringify({
                      success: false,
                      error: errorMessage,
                      tool: "getComponentList",
                      stack: errorStack,
                    }, null, 2),
                  },
                ],
              };
            }
            
          case "getComponentsProps":
            const parsed = GetComponentsPropsSchema.parse(args);
            return await getComponentsProps(parsed.componentNames, this.storybookUrl);
            
          case "getComponentCode":
            const GetComponentCodeSchema = z.object({
              componentId: z.string(),
              storyName: z.string().optional().default("default"),
            });
            const codeParsed = GetComponentCodeSchema.parse(args);
            return await getComponentCode(codeParsed.componentId, codeParsed.storyName, this.storybookUrl);
            
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;
        
        process.stderr.write(`[Storybook MCP] ❌ Error en tool ${name}: ${errorMessage}\n`);
        if (errorStack) {
          process.stderr.write(`[Storybook MCP] Stack: ${errorStack}\n`);
        }
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: errorMessage,
                tool: name,
                stack: errorStack,
              }, null, 2),
            },
          ],
        };
      }
    });
  }
  
  async startStdio() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// ⚠️ CRÍTICO: Agregar logging detallado para debugging
process.stderr.write(`[Storybook MCP] Iniciando servidor...\n`);
process.stderr.write(`[Storybook MCP] STORYBOOK_URL: ${process.env.STORYBOOK_URL || 'NO CONFIGURADO'}\n`);

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  process.stderr.write(`[Storybook MCP] ❌ Error no capturado: ${error.message}\n`);
  process.stderr.write(`[Storybook MCP] Stack: ${error.stack}\n`);
  // NO cerrar el proceso inmediatamente - permitir que el SDK maneje el error
});

process.on('unhandledRejection', (reason, promise) => {
  process.stderr.write(`[Storybook MCP] ❌ Promise rechazada: ${reason}\n`);
  // NO cerrar el proceso inmediatamente
});

// Iniciar servidor
const server = new CustomStorybookMCPServer();
server.startStdio().catch((error) => {
  process.stderr.write(`[Storybook MCP] ❌ Error iniciando servidor: ${error.message}\n`);
  process.stderr.write(`[Storybook MCP] Stack: ${error.stack}\n`);
  process.exit(1);
});

process.stderr.write(`[Storybook MCP] ✅ Servidor iniciado correctamente\n`);

