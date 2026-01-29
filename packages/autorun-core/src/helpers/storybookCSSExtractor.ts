/**
 * Extraer clases CSS usadas en componentes desde Storybook
 * 
 * ⭐ OBJETIVO: Eliminar TODO el hardcodeo de clases CSS
 * Todo se extrae dinámicamente desde el código HTML de Storybook
 */

import { StorybookDynamicMapper } from './storybookDynamicMapper';
import { extractExactCodeFromStorybookWithBrowser } from './storybookExactCodeExtractorWithBrowser';

export interface ComponentCSSClasses {
  componentId: string;
  fullName: string;
  classes: string[];
  mainClass?: string; // Clase principal del componente (ej: "ubits-radio-button")
  modifierClasses: string[]; // Clases modificadoras (ej: "ubits-radio-button--checked")
  elementClasses: string[]; // Clases de elementos internos (ej: "ubits-radio-button__input")
  lastUpdate: number;
}

interface CSSCache {
  classesByComponent: Map<string, ComponentCSSClasses>;
  lastUpdate: number;
}

/**
 * Extractor de clases CSS desde Storybook
 */
export class StorybookCSSExtractor {
  private static cache: CSSCache = {
    classesByComponent: new Map(),
    lastUpdate: 0,
  };
  private static readonly CACHE_DURATION = 3600000; // 1 hora

  /**
   * Extraer clases CSS desde código HTML de Storybook
   */
  static async extractCSSClasses(
    componentId: string
  ): Promise<ComponentCSSClasses> {
    // Si hay cache válido, usar cache
    const cached = this.cache.classesByComponent.get(componentId);
    if (
      cached &&
      Date.now() - cached.lastUpdate < this.CACHE_DURATION
    ) {
      return cached;
    }

    console.log(
      `📚 [CSS Extractor] Extrayendo clases CSS para: ${componentId}`
    );

    try {
      // Obtener información del componente
      const componentInfo = await StorybookDynamicMapper.getComponentInfo(
        componentId
      );
      const fullName = componentInfo?.fullName || componentId;

      // Obtener código HTML desde historia "implementation"
      const codeResult = await extractExactCodeFromStorybookWithBrowser(
        componentId,
        'implementation'
      );

      if (!codeResult.html) {
        console.warn(
          `⚠️ [CSS Extractor] No se pudo obtener código HTML para ${componentId}`
        );
        // Retornar estructura vacía
        const emptyResult: ComponentCSSClasses = {
          componentId,
          fullName,
          classes: [],
          modifierClasses: [],
          elementClasses: [],
          lastUpdate: Date.now(),
        };
        this.cache.classesByComponent.set(componentId, emptyResult);
        return emptyResult;
      }

      // Parsear HTML para encontrar clases CSS
      const classes = this.parseCSSClassesFromHTML(codeResult.html);

      // Categorizar clases
      const mainClass = this.findMainClass(classes, componentId);
      const modifierClasses = classes.filter((cls) =>
        cls.includes('--')
      );
      const elementClasses = classes.filter((cls) => cls.includes('__'));

      const result: ComponentCSSClasses = {
        componentId,
        fullName,
        classes,
        mainClass,
        modifierClasses,
        elementClasses,
        lastUpdate: Date.now(),
      };

      // Actualizar cache
      this.cache.classesByComponent.set(componentId, result);
      this.cache.lastUpdate = Date.now();

      console.log(
        `✅ [CSS Extractor] ${classes.length} clases extraídas para ${componentId}`
      );
      console.log(
        `   - Clase principal: ${mainClass || 'N/A'}`
      );
      console.log(
        `   - Clases modificadoras: ${modifierClasses.length}`
      );
      console.log(
        `   - Clases de elementos: ${elementClasses.length}`
      );

      return result;
    } catch (error: any) {
      console.error(
        `❌ [CSS Extractor] Error extrayendo clases para ${componentId}: ${error.message}`
      );
      // Retornar estructura vacía en caso de error
      const emptyResult: ComponentCSSClasses = {
        componentId,
        fullName: componentId,
        classes: [],
        modifierClasses: [],
        elementClasses: [],
        lastUpdate: Date.now(),
      };
      return emptyResult;
    }
  }

  /**
   * Parsear clases CSS desde HTML
   */
  private static parseCSSClassesFromHTML(html: string): string[] {
    const classes = new Set<string>();

    // Patrón 1: class="clase1 clase2 clase3"
    const classRegex1 = /class=["']([^"']+)["']/gi;
    let match;
    while ((match = classRegex1.exec(html)) !== null) {
      const classList = match[1].split(/\s+/);
      classList.forEach((cls) => {
        const trimmed = cls.trim();
        if (trimmed) {
          classes.add(trimmed);
        }
      });
    }

    // Patrón 2: className="clase1 clase2 clase3" (React)
    const classRegex2 = /className=["']([^"']+)["']/gi;
    while ((match = classRegex2.exec(html)) !== null) {
      const classList = match[1].split(/\s+/);
      classList.forEach((cls) => {
        const trimmed = cls.trim();
        if (trimmed) {
          classes.add(trimmed);
        }
      });
    }

    // Filtrar clases que no son de UBITS (opcional, puede ser configurable)
    const ubitsClasses = Array.from(classes).filter((cls) =>
      cls.includes('ubits-')
    );

    return ubitsClasses.length > 0 ? ubitsClasses : Array.from(classes);
  }

  /**
   * Encontrar clase principal del componente
   */
  private static findMainClass(
    classes: string[],
    componentId: string
  ): string | undefined {
    // Intentar encontrar clase que coincida con el componentId
    const kebabCaseId = componentId.toLowerCase().replace(/_/g, '-');
    const mainClass = classes.find(
      (cls) =>
        cls === `ubits-${kebabCaseId}` ||
        cls === kebabCaseId ||
        cls.includes(kebabCaseId)
    );

    if (mainClass) {
      return mainClass;
    }

    // Si no se encuentra, buscar la clase más común (sin modificadores ni elementos)
    const baseClasses = classes.filter(
      (cls) => !cls.includes('--') && !cls.includes('__')
    );
    if (baseClasses.length > 0) {
      return baseClasses[0];
    }

    return undefined;
  }

  /**
   * Obtener clases esperadas para un componente (para validadores)
   */
  static async getExpectedClasses(
    componentId: string
  ): Promise<string[]> {
    const cssInfo = await this.extractCSSClasses(componentId);
    return cssInfo.classes;
  }

  /**
   * Obtener clase principal de un componente
   */
  static async getMainClass(componentId: string): Promise<string | null> {
    const cssInfo = await this.extractCSSClasses(componentId);
    return cssInfo.mainClass || null;
  }

  /**
   * Verificar si una clase es válida para un componente
   */
  static async isValidClass(
    componentId: string,
    className: string
  ): Promise<boolean> {
    const cssInfo = await this.extractCSSClasses(componentId);
    return cssInfo.classes.includes(className);
  }

  /**
   * Invalidar cache (forzar actualización)
   */
  static invalidateCache(componentId?: string): void {
    if (componentId) {
      this.cache.classesByComponent.delete(componentId);
      console.log(
        `🔄 [CSS Extractor] Cache invalidado para: ${componentId}`
      );
    } else {
      this.cache.classesByComponent.clear();
      this.cache.lastUpdate = 0;
      console.log('🔄 [CSS Extractor] Cache completamente invalidado');
    }
  }

  /**
   * Obtener todas las clases de todos los componentes (para análisis)
   */
  static async getAllComponentsClasses(): Promise<
    Map<string, ComponentCSSClasses>
  > {
    // Esto requeriría extraer clases de todos los componentes
    // Por ahora, retornar cache
    return this.cache.classesByComponent;
  }
}

