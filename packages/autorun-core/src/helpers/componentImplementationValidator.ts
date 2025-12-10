/**
 * Component Implementation Validator
 *
 * Valida implementaciones comunes de componentes para detectar errores antes de escribir código.
 * Este validador se ejecuta ANTES de write() para prevenir errores comunes.
 */

export interface ImplementationValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

/**
 * Valida implementación común de componentes antes de escribir
 */
export class ComponentImplementationValidator {
  /**
   * Valida que la implementación no tenga errores comunes
   */
  static validateImplementation(
    content: string,
    componentName?: string
  ): ImplementationValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // 1. Verificar formato de iconos
    const iconErrors = this.validateIconFormat(content);
    errors.push(...iconErrors);

    // 2. Verificar estilos automáticos
    const styleErrors = this.validateAutomaticStyles(content);
    errors.push(...styleErrors);

    // 3. Verificar dependencias de scripts
    const scriptWarnings = this.validateScriptDependencies(
      content,
      componentName
    );
    warnings.push(...scriptWarnings);

    // 4. Verificar manejo de estado (modales, componentes que se abren/cierran)
    const stateErrors = this.validateStateManagement(content, componentName);
    errors.push(...stateErrors);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  }

  /**
   * Valida formato de iconos
   */
  private static validateIconFormat(content: string): string[] {
    const errors: string[] = [];

    // Detectar iconos con prefijos incorrectos
    const iconPatterns = [
      /icon:\s*['"](fa-|far\s+fa-|fas\s+fa-)/g,
      /icon:\s*['"]fa-/g,
    ];

    iconPatterns.forEach((pattern) => {
      if (pattern.test(content)) {
        errors.push(
          '❌ Error #1: Formato de iconos incorrecto. Usar solo el nombre del icono sin prefijos (ej: icon: "home", NO icon: "far fa-home")'
        );
      }
    });

    return errors;
  }

  /**
   * Valida que no se agreguen estilos automáticamente
   */
  private static validateAutomaticStyles(content: string): string[] {
    const errors: string[] = [];

    // Detectar margin-top automático
    if (
      /style\s*=\s*['"][^'"]*margin-top[^'"]*['"]/i.test(content) ||
      /margin-top\s*:/i.test(content)
    ) {
      errors.push(
        '❌ Error #55: NO agregar margin-top automáticamente. El spacing debe venir del gap del contenedor padre.'
      );
    }

    // Detectar padding automático (solo si no hay contexto que lo justifique)
    // Nota: Este es más difícil de detectar automáticamente, se maneja en warnings

    return errors;
  }

  /**
   * Valida dependencias de scripts
   */
  private static validateScriptDependencies(
    content: string,
    componentName?: string
  ): string[] {
    const warnings: string[] = [];

    // Detectar uso de createModal sin verificación
    if (
      componentName?.toLowerCase().includes('modal') &&
      /createModal\(/i.test(content) &&
      !/typeof\s+createModal|window\.createModal|UBITSModal/i.test(content)
    ) {
      warnings.push(
        '⚠️ Advertencia: Verificar que createModal esté disponible antes de usar. components-loader.js puede no cargarlo.'
      );
    }

    return warnings;
  }

  /**
   * Valida manejo de estado (especialmente para modales, drawers, etc.)
   */
  private static validateStateManagement(
    content: string,
    componentName?: string
  ): string[] {
    const errors: string[] = [];

    // Detectar patrón común: if (instance) return; sin verificar estado real
    if (
      componentName?.toLowerCase().includes('modal') &&
      /if\s*\(\s*\w+Instance\s*\)\s*return/i.test(content) &&
      !/classList\.contains\(['"]ubits-modal-overlay--open['"]\)/i.test(content)
    ) {
      errors.push(
        '❌ Error: Verificar estado real del modal (clase ubits-modal-overlay--open) antes de prevenir apertura. NO solo verificar existencia de instancia.'
      );
    }

    return errors;
  }

  /**
   * Genera sugerencias de corrección
   */
  static generateSuggestions(
    errors: string[],
    componentName?: string
  ): string[] {
    const suggestions: string[] = [];

    errors.forEach((error) => {
      if (error.includes('iconos')) {
        suggestions.push(
          '💡 Sugerencia: Revisar formato de iconos en Storybook. Usar solo el nombre sin prefijos.'
        );
      }
      if (error.includes('margin-top')) {
        suggestions.push(
          '💡 Sugerencia: El spacing debe venir del gap del contenedor padre, NO del componente.'
        );
      }
      if (error.includes('estado')) {
        suggestions.push(
          '💡 Sugerencia: Verificar clase CSS (ubits-modal-overlay--open) antes de prevenir apertura, no solo existencia de instancia.'
        );
      }
    });

    return suggestions;
  }
}
