import { ComponentCatalog } from '../registry/ComponentCatalog';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  componentId: string;
  factoryPath?: string;
  factory?: Function;
}

export class PreflightValidator {
  private catalog: ComponentCatalog;

  constructor(catalog: ComponentCatalog) {
    this.catalog = catalog;
  }

  /**
   * Validate component before mount
   *
   * @param componentId - Component ID (e.g., 'ubits/accordion')
   * @param props - Component props
   * @returns Validation result
   */
  validate(componentId: string, props: any = {}): ValidationResult {
    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
      componentId,
    };
    console.log(`[PreflightValidator] Validating ${componentId}...`);
    const manifest = this.catalog.getComponent(componentId);
    if (!manifest) {
      result.valid = false;
      result.errors.push(`Component "${componentId}" not found in catalog`);
      result.errors.push(
        `Available components: ${this.catalog
          .getAllComponents()
          .map((c) => c.id)
          .join(', ')}`
      );
      return result;
    }
    const factoryPath = manifest.metadata?.factoryPath;
    if (!factoryPath) {
      result.valid = false;
      result.errors.push(
        `No factoryPath defined in manifest for "${componentId}"`
      );
      result.errors.push(`Manifest location: ${manifest.manifestPath}`);
      return result;
    }
    result.factoryPath = factoryPath;
    const factory = this.resolveFactory(factoryPath);
    if (typeof factory !== 'function') {
      result.valid = false;
      result.errors.push(`Factory not found: ${factoryPath}`);
      result.errors.push(
        `Ensure UBITS bundle is loaded before mounting components`
      );
      const parts = factoryPath.split('.');
      let current =
        typeof window !== 'undefined' ? window : (globalThis as any);
      const path: string[] = [];
      for (const part of parts) {
        path.push(part);
        if (current && part in current) {
          current = current[part];
        } else {
          result.errors.push(
            `Path broken at: ${path.join('.')} (${part} not found)`
          );
          break;
        }
      }
      return result;
    }
    result.factory = factory;
    const schema = manifest.metadata?.propsSchema || {};
    const requiredProps = Object.keys(schema).filter(
      (key) => schema[key].required === true
    );
    for (const prop of requiredProps) {
      if (!(prop in props)) {
        result.valid = false;
        result.errors.push(`Missing required prop: "${prop}"`);
      }
    }
    for (const [propName, propValue] of Object.entries(props)) {
      if (schema[propName]) {
        const expectedType = schema[propName].type;
        const actualType = typeof propValue;
        if (expectedType === 'string' && actualType !== 'string') {
          result.warnings.push(
            `Prop "${propName}" expected string, got ${actualType}`
          );
        } else if (expectedType === 'boolean' && actualType !== 'boolean') {
          result.warnings.push(
            `Prop "${propName}" expected boolean, got ${actualType}`
          );
        } else if (
          expectedType === 'object' &&
          (actualType !== 'object' || propValue === null)
        ) {
          result.warnings.push(
            `Prop "${propName}" expected object, got ${actualType}`
          );
        }
      }
    }
    if (result.valid) {
      console.log(
        `[PreflightValidator] ✅ Validation passed for ${componentId}`
      );
      if (result.warnings.length > 0) {
        console.warn(
          `[PreflightValidator] ⚠️ ${result.warnings.length} warning(s):`,
          result.warnings
        );
      }
    } else {
      console.error(
        `[PreflightValidator] ❌ Validation failed for ${componentId}:`,
        result.errors
      );
    }
    return result;
  }

  /**
   * Resolve factory path (e.g., "window.UBITS.Modal.createModal")
   *
   * @param path - Dot-separated path to factory
   * @returns Factory function or undefined
   */
  resolveFactory(path: string): Function | undefined {
    const parts = path.split('.');
    let current = typeof window !== 'undefined' ? window : (globalThis as any);
    for (const part of parts) {
      if (current && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }
    return current;
  }

  /**
   * Check if a component is ready to mount
   *
   * @param componentId - Component ID
   * @returns True if component can be mounted
   */
  isReady(componentId: string): boolean {
    const result = this.validate(componentId, {});
    return (
      result.valid ||
      result.errors.every((e) => e.includes('Missing required prop'))
    );
  }

  /**
   * Get factory for a component
   *
   * @param componentId - Component ID
   * @returns Factory function or undefined
   */
  getFactory(componentId: string): Function | undefined {
    const manifest = this.catalog.getComponent(componentId);
    if (!manifest?.metadata?.factoryPath) {
      return undefined;
    }
    return this.resolveFactory(manifest.metadata.factoryPath);
  }
}
