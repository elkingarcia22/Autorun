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
  const response = await fetch(storybookUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Storybook data: ${response.statusText}`);
  }
  const data = await response.json();
  
  if (data.v === 5 && data.entries) {
    const entries = data.entries;
    const components = Object.values(entries)
      .filter((entry) => entry.type === "docs")
      .map((entry) => entry.title)
      .filter((title) => title)
      .sort();
    return [...new Set(components)];
  }
  
  return [];
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
 * Extrae props de una página con múltiples selectores y timeout aumentado
 */
async function extractPropsFromPage(page, componentName) {
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
      
      // Intentar obtener la tabla
      const propsTableHTML = await page.$eval(selector, (element) => {
        return element.outerHTML;
      });
      
      if (propsTableHTML && propsTableHTML.trim().length > 0) {
        return propsTableHTML;
      }
    } catch (error) {
      // Continuar con el siguiente selector
      continue;
    }
  }
  
  // Si ningún selector funcionó, intentar extraer desde el HTML completo
  try {
    const bodyHTML = await page.evaluate(() => {
      // Buscar cualquier tabla que pueda contener props
      const tables = document.querySelectorAll("table");
      for (const table of tables) {
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
            return table.outerHTML;
          }
        }
      }
      
      return null;
    });
    
    if (bodyHTML) {
      return bodyHTML;
    }
    
    // Último intento: extraer todo el contenido de la página y buscar información de props
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
          text.includes("loading")
        ) {
          // Intentar encontrar una tabla dentro de esta sección
          const table = section.querySelector("table");
          if (table) {
            return table.outerHTML;
          }
          // Si no hay tabla, extraer el texto estructurado
          propsInfo += section.outerHTML + "\n";
        }
      }
      
      return propsInfo || null;
    });
    
    if (pageContent && pageContent.trim().length > 0) {
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
        ],
      };
    });
    
    // Manejar llamadas a herramientas
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        switch (name) {
          case "getComponentList":
            const components = await getComponentList(this.storybookUrl);
            return {
              content: [
                {
                  type: "text",
                  text: `Available components:\n${components.join("\n")}`,
                },
              ],
            };
            
          case "getComponentsProps":
            const parsed = GetComponentsPropsSchema.parse(args);
            return await getComponentsProps(parsed.componentNames, this.storybookUrl);
            
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
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

// Iniciar servidor
const server = new CustomStorybookMCPServer();
server.startStdio().catch((error) => {
  console.error("Failed to start MCP server:", error);
  process.exit(1);
});

