
import { chromium, Browser, Page } from 'playwright';

/**
 * Serializa un nodo incluyendo shadow roots (si existen).
 * Permite obtener el "Light DOM" + "Shadow DOM" expandido.
 */
const SHADOW_SERIALIZER = `
(node) => {
  const voidElements = new Set(["AREA","BASE","BR","COL","EMBED","HR","IMG","INPUT","LINK","META","PARAM","SOURCE","TRACK","WBR"]);

  function attrs(el) {
    return Array.from(el.attributes)
      .map(a => \` \${a.name}="\${a.value.replaceAll('"','&quot;')}"\`)
      .join("");
  }

  function serialize(n) {
    if (n.nodeType === Node.TEXT_NODE) return n.textContent ?? "";
    if (n.nodeType === Node.COMMENT_NODE) return \`<!--\${n.textContent ?? ""}-->\`;
    if (!(n instanceof Element)) return "";

    const tag = n.tagName.toLowerCase();
    const a = attrs(n);

    // shadow root
    const shadow = n.shadowRoot;
    const shadowHtml = shadow
      ? \`<template data-shadowroot="open">\${Array.from(shadow.childNodes).map(serialize).join("")}</template>\`
      : "";

    const children = Array.from(n.childNodes).map(serialize).join("");

    if (voidElements.has(n.tagName)) {
      return \`<\${tag}\${a} />\`;
    }
    return \`<\${tag}\${a}>\${shadowHtml}\${children}</\${tag}>\`;
  }

  return serialize(node);
}
`;

export interface PlaywrightExtractionResult {
  html: string;
  headStyles?: {
    styles: string[];
    links: string[];
  };
  error?: string;
}

export interface PlaywrightExtractionOptions {
  storybookUrl: string;
  componentId: string;
  storyName?: string;
  viewMode?: 'story' | 'docs';
  rootSelector?: string;
  includeHeadStyles?: boolean;
  includeShadowDom?: boolean;
  timeoutMs?: number;
  args?: Record<string, string | number | boolean>;
}

/**
 * Helper para construir query string de args
 */
function buildArgsQuery(args?: Record<string, string | number | boolean>) {
  if (!args) return "";
  const parts: string[] = [];
  for (const [k, v] of Object.entries(args)) {
    parts.push(`${encodeURIComponent(k)}:${encodeURIComponent(String(v))}`);
  }
  return parts.join(";");
}

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

/**
 * Extrae el HTML renderizado de un componente Storybook usando Playwright
 */
export async function extractStoryWithPlaywright(
  options: PlaywrightExtractionOptions
): Promise<PlaywrightExtractionResult> {
  const {
    storybookUrl,
    componentId,
    storyName = 'default',
    viewMode = 'story',
    rootSelector = '#storybook-root, #root',
    includeHeadStyles = false,
    includeShadowDom = true, // Recomendado true por defecto para web components
    timeoutMs = 20000,
    args
  } = options;

  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    console.log(`🔍 [Playwright] Iniciando extracción para ${componentId}--${storyName}`);
    
    // Lanzar browser headless
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    page.setDefaultTimeout(timeoutMs);

    // Construir URL del iframe
    // Formato estándar: /iframe.html?id=<componentId>--<storyId>&viewMode=story
    const base = normalizeBaseUrl(storybookUrl);
    const iframeUrl = new URL(`${base}/iframe.html`);
    
    // Construir ID completo (ej: button--primary)
    // Asumimos que componentId ya viene limpio o formateado, pero 
    // Storybook a veces requiere <carpeta>-<componente>--<historia>
    // Aquí asumiremos que el caller pasa el ID correcto del componente.
    const fullStoryId = `${componentId}--${storyName}`;
    
    iframeUrl.searchParams.set("id", fullStoryId);
    iframeUrl.searchParams.set("viewMode", viewMode);

    const argsQuery = buildArgsQuery(args);
    if (argsQuery) iframeUrl.searchParams.set("args", argsQuery);

    console.log(`   🔗 URL: ${iframeUrl.toString()}`);

    // Navegar
    await page.goto(iframeUrl.toString(), { waitUntil: "domcontentloaded" });

    // Esperar al selector root
    console.log(`   ⏳ Esperando selector: ${rootSelector}`);
    try {
      await page.waitForSelector(rootSelector, { state: "attached", timeout: timeoutMs });
    } catch (e) {
      console.warn(`   ⚠️ Timeout esperando ${rootSelector}, intentando continuar...`);
    }

    // Pequeña espera para hidratación/animaciones
    await page.waitForTimeout(500);

    // Inyectar serializer si es necesario
    if (includeShadowDom) {
      await page.addInitScript(`window.__shadowSerialize__ = ${SHADOW_SERIALIZER};`);
    }

    // Extraer HTML
    const html = await page.evaluate(
      async ({ rootSelector, includeShadowDom }) => {
        const root = document.querySelector(rootSelector);
        if (!root) return null;

        if (includeShadowDom) {
          // @ts-ignore
          if (window.__shadowSerialize__) {
             // @ts-ignore
            return (window.__shadowSerialize__)(root);
          }
        }
        return (root as HTMLElement).outerHTML;
      },
      {
        rootSelector: rootSelector.split(",")[0].trim() || rootSelector,
        includeShadowDom,
      }
    );

    if (!html) {
      throw new Error(`No se encontró elemento root (${rootSelector}) en ${iframeUrl.toString()}`);
    }

    // Extraer estilos del head si se pide
    let headStyles;
    if (includeHeadStyles) {
      headStyles = await page.evaluate(() => {
        const styles = Array.from(document.querySelectorAll("style"))
          .map((s) => s.textContent || "")
          .filter(Boolean);

        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
          .map((l) => (l as HTMLLinkElement).href)
          .filter(Boolean);

        return { styles, links };
      });
    }

    console.log(`   ✅ Extracción completada (${html.length} chars)`);

    return {
      html,
      headStyles
    };

  } catch (error: any) {
    console.error(`   ❌ Error Playwright: ${error.message}`);
    return {
      html: '',
      error: error.message
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
