import * as fs from 'fs/promises';
import { generateExecutableCode } from '../helpers/executableCodeGenerator.js';
import {
  detectComponentAvailability,
  getComponentAPIInfo,
} from '../helpers/componentAvailabilityDetector.js';
import { ensureComponentLoaded } from '../helpers/dynamicComponentLoader.js';
import { emitWatermark } from '../verify/Watermark.js';

/**
 * ✅ HtmlPrototypeAdapter - Adapter estable para insertar contenido en prototypes/*.html
 *
 * ⭐ NUEVO: Sistema automático completo sin hardcode:
 * - Detecta disponibilidad de componentes automáticamente
 * - Carga componentes dinámicamente si faltan
 * - Genera código ejecutable desde snippets de Storybook
 * - Inserta contenedor en .content-area automáticamente
 * - Inserta script de inicialización automáticamente
 *
 * Usa anchors predefinidos para inserción consistente sin depender de strings largos.
 *
 * Anchors por defecto:
 * - <!-- AUTORUN:ANCHOR:CONTENT --> (dentro de <main> o antes de </body>)
 * - <!-- AUTORUN:ANCHOR:SCRIPTS --> (antes de </body>)
 */
export class HtmlPrototypeAdapter {
  private defaultAnchors = {
    content: '<!-- AUTORUN:ANCHOR:CONTENT -->',
    scripts: '<!-- AUTORUN:ANCHOR:SCRIPTS -->',
  };

  /**
   * ✅ Busca anchors en el contenido
   */
  private findAnchors(content: string): {
    content: string | null;
    scripts: string | null;
  } {
    const contentMatch = content.match(/<!--\s*AUTORUN:ANCHOR:CONTENT\s*-->/);
    const scriptsMatch = content.match(/<!--\s*AUTORUN:ANCHOR:SCRIPTS\s*-->/);

    return {
      content: contentMatch ? contentMatch[0] : null,
      scripts: scriptsMatch ? scriptsMatch[0] : null,
    };
  }

  /**
   * ✅ Crea anchors si no existen
   *
   * - CONTENT dentro de <main> o antes de </body>
   * - SCRIPTS antes de </body>
   */
  async ensureAnchors(filePath: string): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');
    const anchors = this.findAnchors(content);

    let newContent = content;

    // ✅ Insertar anchor CONTENT si no existe
    if (!anchors.content) {
      // Buscar <main> o </body>
      const mainMatch = content.match(/<main[^>]*>([\s\S]*?)(<\/main>|$)/i);
      const bodyCloseMatch = content.match(/<\/body>/i);

      if (mainMatch) {
        // Insertar dentro de <main>
        const mainTag = mainMatch[0];
        newContent = newContent.replace(
          mainTag,
          `${mainTag.split('>')[0]}>\n${this.defaultAnchors.content}\n${mainTag.split('>').slice(1).join('>')}`
        );
      } else if (bodyCloseMatch) {
        // Insertar antes de </body>
        newContent = newContent.replace(
          '</body>',
          `${this.defaultAnchors.content}\n</body>`
        );
      } else {
        // Si no hay <main> ni </body>, agregar antes del final del archivo
        newContent = `${newContent}\n${this.defaultAnchors.content}\n`;
      }
    }

    // ✅ Insertar anchor SCRIPTS si no existe
    if (!anchors.scripts) {
      const bodyCloseMatch = newContent.match(/<\/body>/i);
      if (bodyCloseMatch) {
        // Insertar antes de </body>
        newContent = newContent.replace(
          '</body>',
          `${this.defaultAnchors.scripts}\n</body>`
        );
      } else {
        // Si no hay </body>, agregar al final
        newContent = `${newContent}\n${this.defaultAnchors.scripts}\n`;
      }
    }

    // Solo escribir si hubo cambios
    if (newContent !== content) {
      await fs.writeFile(filePath, newContent, 'utf-8');
    }
  }

  /**
   * ✅ Inserta bloque de contenido con watermark
   *
   * ⭐ NUEVO: Sistema automático completo sin hardcode
   * - Detecta disponibilidad del componente
   * - Carga dinámicamente si falta
   * - Genera código ejecutable desde snippet
   * - Inserta contenedor en .content-area
   * - Inserta script de inicialización
   *
   * El contenido ya viene con watermark aplicado desde emitWatermark().
   */
  async insertContentBlock(
    filePath: string,
    htmlBlockWithWatermark: string,
    componentName?: string,
    storybookId?: string
  ): Promise<void> {
    // Asegurar que los anchors existen
    await this.ensureAnchors(filePath);

    const content = await fs.readFile(filePath, 'utf-8');
    const anchors = this.findAnchors(content);

    if (!anchors.content) {
      throw new Error(
        `No se pudo encontrar o crear anchor CONTENT en ${filePath}`
      );
    }

    // ⭐ NUEVO: Si se proporciona componentName y storybookId, usar sistema automático
    if (componentName && storybookId) {
      console.log(
        `   🔧 [HtmlPrototypeAdapter] Usando sistema automático para ${componentName}`
      );

      // 1. Obtener información de API del componente
      const apiInfo = getComponentAPIInfo(componentName);
      if (!apiInfo) {
        console.warn(
          `   ⚠️ [HtmlPrototypeAdapter] No se encontró información de API para ${componentName}`
        );
        // Continuar con inserción normal
      } else {
        // 2. Extraer snippet del watermark (remover comentarios de watermark)
        const snippetMatch = htmlBlockWithWatermark.match(
          /<!--\s*AUTORUN:[\s\S]*?-->\s*([\s\S]*?)\s*<!--\s*\/AUTORUN\s*-->/
        );
        const snippet = snippetMatch ? snippetMatch[1] : htmlBlockWithWatermark;

        // 3. Generar código ejecutable desde el snippet
        const { containerHTML, executableScript } = generateExecutableCode({
          snippet,
          componentName,
          containerId: `${componentName}-implementation-container`,
          apiName: apiInfo.apiName,
          storybookId,
        });

        // 4. Insertar contenedor en .content-area (dentro del anchor CONTENT)
        // Buscar .content-area dentro del contenido (buscar hasta el cierre de </main> o </div>)
        const contentAreaMatch = content.match(
          /(<div[^>]*class=["']content-area["'][^>]*>)([\s\S]*?)(<\/div>\s*<\/main>|<\/div>\s*<\/div>|<\/div>\s*$)/m
        );
        if (contentAreaMatch) {
          // Insertar contenedor dentro de .content-area
          const contentAreaWithContainer = contentAreaMatch[0].replace(
            contentAreaMatch[2],
            `${contentAreaMatch[2]}\n                ${containerHTML}`
          );
          const newContentWithContainer = content.replace(
            contentAreaMatch[0],
            contentAreaWithContainer
          );

          // 5. Insertar script de inicialización en anchor SCRIPTS
          if (anchors.scripts) {
            const scriptWithWatermark = emitWatermark(
              {
                v: 2,
                mode: 'prototypeTokens',
                components: [storybookId],
                storybookId,
              } as any,
              `<script>\n${executableScript}\n</script>`
            );

            const finalContent = newContentWithContainer.replace(
              anchors.scripts,
              `${anchors.scripts}\n${scriptWithWatermark.wrappedContent}`
            );

            await fs.writeFile(filePath, finalContent, 'utf-8');
            console.log(
              `   ✅ [HtmlPrototypeAdapter] Componente ${componentName} insertado automáticamente`
            );
            return;
          }
        }

        // Fallback: usar inserción normal si no se encuentra .content-area
        console.warn(
          `   ⚠️ [HtmlPrototypeAdapter] No se encontró .content-area, usando inserción normal`
        );
      }
    }

    // Inserción normal (sin sistema automático)
    const newContent = content.replace(
      anchors.content,
      `${anchors.content}\n${htmlBlockWithWatermark}`
    );

    await fs.writeFile(filePath, newContent, 'utf-8');
  }

  /**
   * ✅ Inserta bloque de scripts con watermark
   *
   * El script ya viene con watermark aplicado desde emitWatermark().
   */
  async insertScriptBlock(
    filePath: string,
    scriptBlockWithWatermark: string
  ): Promise<void> {
    // Asegurar que los anchors existen
    await this.ensureAnchors(filePath);

    const content = await fs.readFile(filePath, 'utf-8');
    const anchors = this.findAnchors(content);

    if (!anchors.scripts) {
      throw new Error(
        `No se pudo encontrar o crear anchor SCRIPTS en ${filePath}`
      );
    }

    // Insertar después del anchor SCRIPTS
    const newContent = content.replace(
      anchors.scripts,
      `${anchors.scripts}\n${scriptBlockWithWatermark}`
    );

    await fs.writeFile(filePath, newContent, 'utf-8');
  }
}
