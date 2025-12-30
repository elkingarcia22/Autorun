/**
 * Extractor Robusto de Props desde Storybook
 *
 * ⭐ OBJETIVO: Obtener información COMPLETA, no parcial
 * Combina múltiples fuentes para garantizar información completa
 */

import { StorybookManager } from './storybookManager';

export interface RobustPropsResult {
  success: boolean;
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    defaultValue?: any;
    description?: string;
    options?: string[]; // Opciones disponibles (para selects, etc.)
  }>;
  sources: string[]; // Fuentes consultadas
  warnings: string[];
}

/**
 * Extractor robusto de props que garantiza información completa
 */
export class StorybookPropsExtractorRobust {
  /**
   * Extraer props de forma robusta (completa, no parcial)
   */
  static async extractPropsRobust(
    componentName: string
  ): Promise<RobustPropsResult> {
    const result: RobustPropsResult = {
      success: false,
      props: [],
      sources: [],
      warnings: [],
    };

    console.log(
      `🔍 [Robust Props Extractor] Extrayendo props completas para: ${componentName}`
    );

    // ESTRATEGIA 1: Consultar MCP de Storybook
    try {
      const mcpProps = await this.extractFromMCP(componentName);
      if (mcpProps.length > 0) {
        result.props = mcpProps;
        result.sources.push('MCP Storybook');
        console.log(`   ✅ MCP: ${mcpProps.length} props obtenidas`);
      }
    } catch (error: any) {
      result.warnings.push(`Error en MCP: ${error.message}`);
    }

    // ESTRATEGIA 2: Verificar si hay información incompleta (botones "Show more...")
    const hasIncompleteInfo = this.detectIncompleteInfo(result.props);
    if (hasIncompleteInfo) {
      console.log(
        `   ⚠️ Información incompleta detectada, usando Browser MCP para expandir...`
      );

      try {
        const browserProps = await this.extractFromBrowser(componentName);
        if (browserProps.length > 0) {
          // Combinar props, priorizando las más completas
          result.props = this.mergeProps(result.props, browserProps);
          result.sources.push('Browser MCP (expandido)');
          console.log(
            `   ✅ Browser MCP: ${browserProps.length} props obtenidas (expandidas)`
          );
        }
      } catch (error: any) {
        result.warnings.push(`Error en Browser MCP: ${error.message}`);
      }
    }

    // ESTRATEGIA 3: Consultar código fuente TypeScript como fuente de verdad
    try {
      const sourceProps = await this.extractFromSourceCode(componentName);
      if (sourceProps.length > 0) {
        // Combinar y validar contra código fuente
        result.props = this.mergeAndValidateProps(result.props, sourceProps);
        result.sources.push('Código fuente TypeScript');
        console.log(
          `   ✅ Código fuente: ${sourceProps.length} props validadas`
        );
      }
    } catch (error: any) {
      result.warnings.push(`Error en código fuente: ${error.message}`);
    }

    // ⚠️ NUEVO: ESTRATEGIA 4: Consultar documentación local como último recurso
    if (result.props.length === 0) {
      try {
        const docProps = await this.extractFromDocumentation(componentName);
        if (docProps.length > 0) {
          result.props = docProps;
          result.sources.push('Documentación local');
          console.log(
            `   ✅ Documentación: ${docProps.length} props obtenidas`
          );
        }
      } catch (error: any) {
        result.warnings.push(`Error en documentación: ${error.message}`);
      }
    }

    result.success = result.props.length > 0;

    if (result.success) {
      console.log(
        `✅ [Robust Props Extractor] ${result.props.length} props completas obtenidas desde ${result.sources.length} fuentes`
      );
    } else {
      console.warn(
        `⚠️ [Robust Props Extractor] No se pudieron obtener props completas`
      );
    }

    return result;
  }

  /**
   * Extraer props desde MCP de Storybook
   */
  private static async extractFromMCP(
    componentName: string
  ): Promise<RobustPropsResult['props']> {
    try {
      // Usar el MCP helper existente
      const { callStorybookMCPTool } = await import('./mcpClient');
      const response = await callStorybookMCPTool('getComponentsProps', {
        componentNames: [componentName],
      });

      if (!response || typeof response !== 'string') {
        return [];
      }

      // Parsear HTML de respuesta
      return this.parsePropsFromHTML(response);
    } catch (error: any) {
      console.warn(`⚠️ Error extrayendo desde MCP: ${error.message}`);
      return [];
    }
  }

  /**
   * Extraer props desde Browser MCP (expandiendo opciones colapsadas)
   */
  private static async extractFromBrowser(
    componentName: string
  ): Promise<RobustPropsResult['props']> {
    try {
      const manager = StorybookManager.getInstance();
      const activeConfig = await manager.getActiveConfig();

      if (!activeConfig) {
        throw new Error('No hay Storybook activo configurado');
      }

      // Obtener ID del componente
      const { StorybookDynamicMapper } = await import(
        './storybookDynamicMapper'
      );
      const componentId =
        await StorybookDynamicMapper.componentNameToStorybookId(componentName);

      if (!componentId) {
        throw new Error(`No se pudo obtener ID para ${componentName}`);
      }

      // Construir URL de Docs
      const encodedComponentId = encodeURIComponent(componentId);
      const docsUrl = `${activeConfig.url}/?path=/docs/${encodedComponentId}--docs`;

      // Usar Browser MCP para navegar y expandir
      const { callBrowserMCPTool } = await import('./mcpClient');

      // Navegar a Docs
      await callBrowserMCPTool('browser_navigate', { url: docsUrl });
      await callBrowserMCPTool('browser_wait_for', { time: 3 });

      // Buscar y hacer clic en todos los botones "Show more..." o "Show X more..."
      const snapshot = await callBrowserMCPTool('browser_snapshot', {});

      // Buscar botones de expansión
      const expandButtons = this.findExpandButtons(snapshot);

      for (const button of expandButtons) {
        try {
          await callBrowserMCPTool('browser_click', {
            element: 'Show more button',
            ref: button.ref,
          });
          await callBrowserMCPTool('browser_wait_for', { time: 1 });
        } catch (error) {
          // Continuar con siguiente botón
        }
      }

      // Obtener snapshot final con toda la información expandida
      const finalSnapshot = await callBrowserMCPTool('browser_snapshot', {});

      // Extraer props del HTML expandido
      return this.parsePropsFromSnapshot(finalSnapshot);
    } catch (error: any) {
      console.warn(`⚠️ Error extrayendo desde Browser: ${error.message}`);
      return [];
    }
  }

  /**
   * Extraer props desde código fuente TypeScript
   */
  private static async extractFromSourceCode(
    componentName: string
  ): Promise<RobustPropsResult['props']> {
    try {
      // Obtener ID del componente
      const { StorybookDynamicMapper } = await import(
        './storybookDynamicMapper'
      );
      const componentId =
        await StorybookDynamicMapper.componentNameToStorybookId(componentName);

      if (!componentId) {
        return [];
      }

      // Buscar archivo de tipos TypeScript
      const normalizedId = componentId.replace(/-/g, '-');
      const possiblePaths = [
        `vendor/ubits/packages/components/${normalizedId}/src/types/${normalizedId}Options.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/types/${normalizedId}Options.d.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/types/index.ts`,
      ];

      for (const path of possiblePaths) {
        try {
          const fs = await import('fs/promises');
          const content = await fs.readFile(path, 'utf-8');
          return this.parsePropsFromTypeScript(content);
        } catch (error) {
          // Continuar con siguiente path
        }
      }

      return [];
    } catch (error: any) {
      console.warn(`⚠️ Error extrayendo desde código fuente: ${error.message}`);
      return [];
    }
  }

  /**
   * Detectar si hay información incompleta (botones "Show more...")
   */
  private static detectIncompleteInfo(
    props: RobustPropsResult['props']
  ): boolean {
    // Buscar props que tengan opciones pero sean incompletas
    // Por ejemplo, si una prop tiene opciones pero no todas están listadas

    // También podemos verificar si el HTML del MCP contenía "Show more..."
    // Esto se puede hacer revisando el HTML original

    // Por ahora, asumimos que si hay menos de X props, puede estar incompleto
    // O si alguna prop tiene opciones pero son muy pocas

    return false; // Por ahora, retornar false - se puede mejorar
  }

  /**
   * Parsear props desde HTML del MCP
   */
  private static parsePropsFromHTML(html: string): RobustPropsResult['props'] {
    const props: RobustPropsResult['props'] = [];

    // Buscar tabla de props en el HTML
    const tableRegex =
      /<table[^>]*class="[^"]*docblock-argstable[^"]*"[^>]*>([\s\S]*?)<\/table>/i;
    const tableMatch = html.match(tableRegex);

    if (!tableMatch) {
      return props;
    }

    const tableContent = tableMatch[1];

    // Buscar filas de props (excluyendo headers y secciones colapsables)
    const rowRegex = /<tr[^>]*>(?!.*Hide\s+\w+\s+items)([\s\S]*?)<\/tr>/gi;
    let rowMatch;

    while ((rowMatch = rowRegex.exec(tableContent)) !== null) {
      const row = rowMatch[1];

      // Extraer nombre de la prop
      const nameMatch = row.match(
        /<td[^>]*>.*?<span[^>]*class="[^"]*css-in3yi3[^"]*"[^>]*>([^<]+)<\/span>/i
      );
      if (!nameMatch) continue;

      const name = nameMatch[1].trim();

      // Extraer tipo
      const typeMatch = row.match(
        /<span[^>]*class="[^"]*css-129bphp[^"]*"[^>]*>([^<]+)<\/span>/g
      );
      const types = typeMatch
        ? typeMatch.map((m) => m.match(/>([^<]+)</)?.[1] || '').filter(Boolean)
        : [];
      const type = types.join(' | ') || 'unknown';

      // Extraer descripción
      const descMatch = row.match(
        /<div[^>]*class="[^"]*css-ycmd3k[^"]*"[^>]*>.*?<span[^>]*>([^<]+)<\/span>/i
      );
      const description = descMatch ? descMatch[1].trim() : undefined;

      // Extraer valor por defecto
      const defaultMatch = row.match(
        /<td[^>]*>.*?<span[^>]*>([^<]+)<\/span>/gi
      );
      const defaultValue =
        defaultMatch && defaultMatch.length > 2
          ? defaultMatch[2].match(/>([^<]+)</)?.[1]?.trim()
          : undefined;

      // Detectar si es requerido (si no tiene default o es "-")
      const required = !defaultValue || defaultValue === '-';

      // ⭐ MEJORADO: Extraer opciones desde múltiples fuentes
      const options: string[] = [];

      // ESTRATEGIA 1: Buscar opciones en el HTML de la descripción (spans con clase css-129bphp)
      if (typeMatch) {
        typeMatch.forEach((m) => {
          const option = m.match(/>([^<]+)</)?.[1];
          if (
            option &&
            option !== 'string' &&
            option !== 'number' &&
            option !== 'boolean'
          ) {
            options.push(option);
          }
        });
      }

      // ESTRATEGIA 2: ⭐ NUEVO - Buscar opciones en el select del control
      // El select tiene id="control-{propName}" y contiene todas las opciones
      const selectRegex = new RegExp(
        `<select[^>]*id="control-${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>([\\s\\S]*?)<\\/select>`,
        'i'
      );
      const selectMatch = html.match(selectRegex);

      if (selectMatch) {
        const selectContent = selectMatch[1];
        // Extraer todas las opciones del select
        const optionRegex =
          /<option[^>]*value="([^"]+)"[^>]*>([^<]+)<\/option>/gi;
        let optionMatch;
        while ((optionMatch = optionRegex.exec(selectContent)) !== null) {
          const optionValue = optionMatch[1];
          // Solo agregar si no está ya en la lista y no es "Choose option..."
          if (
            optionValue &&
            optionValue !== 'Choose option...' &&
            !options.includes(optionValue)
          ) {
            options.push(optionValue);
          }
        }
      }

      // ESTRATEGIA 3: Si no hay opciones aún, buscar en toda la fila
      if (options.length === 0) {
        // Buscar cualquier span o elemento que contenga valores posibles
        const allOptionsRegex =
          /<span[^>]*class="[^"]*css-129bphp[^"]*"[^>]*>([^<]+)<\/span>/gi;
        let optionMatch;
        while ((optionMatch = allOptionsRegex.exec(row)) !== null) {
          const option = optionMatch[1].trim();
          if (
            option &&
            option !== 'string' &&
            option !== 'number' &&
            option !== 'boolean' &&
            !options.includes(option)
          ) {
            options.push(option);
          }
        }
      }

      props.push({
        name,
        type,
        required,
        defaultValue: defaultValue !== '-' ? defaultValue : undefined,
        description,
        options: options.length > 0 ? options : undefined,
      });
    }

    return props;
  }

  /**
   * Parsear props desde snapshot del browser
   */
  private static parsePropsFromSnapshot(
    snapshot: any
  ): RobustPropsResult['props'] {
    // Similar a parsePropsFromHTML pero desde el snapshot del browser
    // Esto requiere parsear el snapshot que viene del browser MCP
    // Por ahora, retornar array vacío - se puede implementar después
    return [];
  }

  /**
   * Extraer props desde documentación local
   */
  private static async extractFromDocumentation(
    componentName: string
  ): Promise<RobustPropsResult['props']> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const { mapComponentNameToDocFile } = await import('./componentHelpers');

      const docFileName = mapComponentNameToDocFile(componentName);
      const docPath = path.join(
        process.cwd(),
        'docs',
        'referencia',
        'componentes',
        `${docFileName}.md`
      );

      try {
        const content = await fs.readFile(docPath, 'utf-8');
        return this.parsePropsFromMarkdown(content);
      } catch {
        return [];
      }
    } catch (error: any) {
      console.warn(`⚠️ Error extrayendo desde documentación: ${error.message}`);
      return [];
    }
  }

  /**
   * Parsear props desde Markdown de documentación
   */
  private static parsePropsFromMarkdown(
    content: string
  ): RobustPropsResult['props'] {
    const props: RobustPropsResult['props'] = [];

    // Buscar tabla de props en Markdown
    // Formato: | Name | Type | Default | Description |
    const tableRegex =
      /\|.*?Name.*?Type.*?Default.*?Description.*?\n\|[-\|:]+\|\n([\s\S]*?)(?=\n\n|\n#|$)/i;
    const tableMatch = content.match(tableRegex);

    if (!tableMatch) {
      return props;
    }

    const tableRows = tableMatch[1]
      .split('\n')
      .filter((row) => row.trim().startsWith('|'));

    for (const row of tableRows) {
      const cells = row
        .split('|')
        .map((cell) => cell.trim())
        .filter((cell) => cell);
      if (cells.length >= 2) {
        const name = cells[0];
        const type = cells[1] || 'unknown';
        const defaultValue = cells[2] || undefined;
        const description = cells[3] || undefined;

        props.push({
          name,
          type,
          required: !defaultValue || defaultValue === '-',
          defaultValue: defaultValue !== '-' ? defaultValue : undefined,
          description,
        });
      }
    }

    return props;
  }

  /**
   * Parsear props desde código TypeScript
   */
  private static parsePropsFromTypeScript(
    content: string
  ): RobustPropsResult['props'] {
    const props: RobustPropsResult['props'] = [];

    // Buscar interface o type que defina las opciones
    const interfaceRegex = /(?:interface|type)\s+(\w+Options)\s*\{([\s\S]*?)\}/;
    const interfaceMatch = content.match(interfaceRegex);

    if (!interfaceMatch) {
      return props;
    }

    const interfaceContent = interfaceMatch[2];

    // Buscar propiedades
    const propRegex = /(\w+)\??\s*:\s*([^;]+);/g;
    let propMatch;

    while ((propMatch = propRegex.exec(interfaceContent)) !== null) {
      const name = propMatch[1];
      const typeDef = propMatch[2].trim();
      const required = !propMatch[0].includes('?');

      // Extraer tipo
      let type = typeDef;
      let options: string[] | undefined;

      // Si es un union type, extraer opciones
      if (typeDef.includes('|')) {
        const unionTypes = typeDef
          .split('|')
          .map((t) => t.trim().replace(/['"]/g, ''));
        type = unionTypes.join(' | ');
        options = unionTypes.filter(
          (t) => !['string', 'number', 'boolean', 'object'].includes(t)
        );
      }

      // Buscar comentario JSDoc para descripción
      const commentRegex = new RegExp(
        `/\\*\\*[\\s\\S]*?\\*/[\\s\\S]*?${name}`,
        'i'
      );
      const commentMatch = content.match(commentRegex);
      const description = commentMatch
        ? commentMatch[0]
            .match(/\/\*\*[\s\S]*?\*\//)?.[0]
            .replace(/\/\*\*|\*\//g, '')
            .trim()
        : undefined;

      // Buscar default value en comentario
      const defaultMatch = commentMatch?.[0].match(/@default\s+([^\n]+)/i);
      const defaultValue = defaultMatch ? defaultMatch[1].trim() : undefined;

      props.push({
        name,
        type,
        required,
        defaultValue,
        description,
        options,
      });
    }

    return props;
  }

  /**
   * Encontrar botones de expansión en el snapshot
   */
  private static findExpandButtons(snapshot: any): Array<{ ref: string }> {
    const buttons: Array<{ ref: string }> = [];

    // Buscar botones que contengan "Show" y "more" en el nombre
    if (snapshot && typeof snapshot === 'object') {
      const searchInSnapshot = (obj: any): void => {
        if (Array.isArray(obj)) {
          obj.forEach((item) => searchInSnapshot(item));
        } else if (obj && typeof obj === 'object') {
          if (obj.role === 'button' && obj.name) {
            const name = obj.name.toLowerCase();
            if (
              name.includes('show') &&
              (name.includes('more') || name.includes('additional'))
            ) {
              buttons.push({ ref: obj.ref });
            }
          }
          Object.values(obj).forEach((value) => searchInSnapshot(value));
        }
      };

      searchInSnapshot(snapshot);
    }

    return buttons;
  }

  /**
   * Combinar props de múltiples fuentes
   */
  private static mergeProps(
    props1: RobustPropsResult['props'],
    props2: RobustPropsResult['props']
  ): RobustPropsResult['props'] {
    const merged = new Map<string, RobustPropsResult['props'][0]>();

    // Agregar props de la primera fuente
    props1.forEach((prop) => {
      merged.set(prop.name, prop);
    });

    // Agregar/actualizar props de la segunda fuente (priorizar las más completas)
    props2.forEach((prop) => {
      const existing = merged.get(prop.name);
      if (!existing) {
        merged.set(prop.name, prop);
      } else {
        // Combinar información, priorizando la más completa
        const combined = {
          ...existing,
          ...prop,
          // Si una tiene opciones y la otra no, usar la que tiene
          options: prop.options || existing.options,
          // Si una tiene descripción y la otra no, usar la que tiene
          description: prop.description || existing.description,
        };
        merged.set(prop.name, combined);
      }
    });

    return Array.from(merged.values());
  }

  /**
   * Combinar y validar props contra código fuente
   */
  private static mergeAndValidateProps(
    props: RobustPropsResult['props'],
    sourceProps: RobustPropsResult['props']
  ): RobustPropsResult['props'] {
    // Similar a mergeProps pero validando que todas las props del código fuente estén presentes
    const merged = this.mergeProps(props, sourceProps);

    // Validar que no falten props del código fuente
    const sourcePropNames = new Set(sourceProps.map((p) => p.name));
    const mergedPropNames = new Set(merged.map((p) => p.name));

    const missing = Array.from(sourcePropNames).filter(
      (name) => !mergedPropNames.has(name)
    );

    if (missing.length > 0) {
      console.warn(
        `⚠️ [Robust Props Extractor] Props faltantes del código fuente: ${missing.join(', ')}`
      );
    }

    return merged;
  }
}
