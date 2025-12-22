import * as fs from 'fs/promises';

/**
 * ✅ HtmlPrototypeAdapter - Adapter estable para insertar contenido en prototypes/*.html
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
    scripts: '<!-- AUTORUN:ANCHOR:SCRIPTS -->'
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
      scripts: scriptsMatch ? scriptsMatch[0] : null
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
   * El contenido ya viene con watermark aplicado desde emitWatermark().
   */
  async insertContentBlock(
    filePath: string,
    htmlBlockWithWatermark: string
  ): Promise<void> {
    // Asegurar que los anchors existen
    await this.ensureAnchors(filePath);

    const content = await fs.readFile(filePath, 'utf-8');
    const anchors = this.findAnchors(content);

    if (!anchors.content) {
      throw new Error(`No se pudo encontrar o crear anchor CONTENT en ${filePath}`);
    }

    // Insertar después del anchor CONTENT
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
      throw new Error(`No se pudo encontrar o crear anchor SCRIPTS en ${filePath}`);
    }

    // Insertar después del anchor SCRIPTS
    const newContent = content.replace(
      anchors.scripts,
      `${anchors.scripts}\n${scriptBlockWithWatermark}`
    );

    await fs.writeFile(filePath, newContent, 'utf-8');
  }
}

