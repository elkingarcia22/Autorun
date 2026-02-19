import { ComponentCatalog } from '../registry/ComponentCatalog';
import { getRuntimeNormalizer, RuntimeNormalizer } from './RuntimeNormalizer';
import { getLogger, Logger } from './Logger';
import { PreflightValidator, ValidationResult } from './PreflightValidator';
import {
  createWrapper,
  getRecommendedPreset,
  WrapperPresetName,
} from './WrapperPresets';
import { getAdapter } from './AdapterRegistry';

export interface MountOptions {
  componentId: string;
  containerId: string;
  props?: any;
  preset?: WrapperPresetName;
  mode?: string;
  slot?: string;
}

export interface MountResult {
  success: boolean;
  element: HTMLElement;
  preflight: ValidationResult;
  mode?: string;
  error?: string;
}

export class UniversalMount {
  private normalizer: RuntimeNormalizer;
  private logger: Logger;
  private catalog: ComponentCatalog;
  private validator: PreflightValidator;

  constructor(catalog: ComponentCatalog) {
    this.normalizer = getRuntimeNormalizer();
    this.logger = getLogger();
    this.catalog = catalog;
    this.validator = new PreflightValidator(catalog);
  }

  /**
   * Mount component with preflight validation
   *
   * @param options - Mount options
   * @returns Mount result
   */
  mount(options: MountOptions): MountResult {
    this.logger.debug(`Mounting ${options.componentId}...`);
    const normalizedProps = this.normalizer.sanitizeUrlsDeep(
      options.props || {}
    );
    this.logger.debug('Props normalized');
    const preflight = this.validator.validate(
      options.componentId,
      normalizedProps
    );
    if (!preflight.valid) {
      this.logger.error(
        `Preflight failed for ${options.componentId}:`,
        preflight.errors
      );
      return this.createPlaceholder(options, preflight);
    }
    const mode = this.determineMode(options, preflight);
    this.logger.debug(`Using mode: ${mode}`);
    const preset = options.preset || getRecommendedPreset(options.componentId);
    this.logger.debug(`Using preset: ${preset}`);
    const wrapper = createWrapper(
      options.containerId,
      preset,
      options.componentId
    );
    const container = wrapper.querySelector(
      `#${options.containerId}`
    ) as HTMLElement;
    if (!container) {
      this.logger.error(`Container not found in wrapper`);
      return this.createPlaceholder(options, preflight, [
        'Container element not created',
      ]);
    }
    try {
      this.mountByMode(mode, container, normalizedProps, preflight, options);
      this.logger.info(`✅ Successfully mounted ${options.componentId}`);
      return {
        success: true,
        element: wrapper,
        preflight,
        mode,
      };
    } catch (error: any) {
      this.logger.error(`Mount failed for ${options.componentId}:`, error);
      return this.createPlaceholder(options, preflight, [
        error.message || String(error),
      ]);
    }
  }

  /**
   * Determine component mode
   *
   * @param options - Mount options
   * @param preflight - Preflight result
   * @returns Component mode
   */
  determineMode(options: MountOptions, preflight: ValidationResult): string {
    if (options.mode) {
      return options.mode;
    }
    const componentName = options.componentId.split('/')[1];
    if (getAdapter(componentName)) {
      return 'adapter';
    }
    const component = this.catalog.getComponent(options.componentId);
    if (component?.metadata?.mode) {
      return component.metadata.mode;
    }
    return 'container';
  }

  /**
   * Mount component by mode
   *
   * @param mode - Component mode
   * @param container - Container element
   * @param props - Normalized props
   * @param preflight - Preflight result
   * @param options - Mount options
   */
  mountByMode(
    mode: string,
    container: HTMLElement,
    props: any,
    preflight: ValidationResult,
    options: MountOptions
  ) {
    const factory = preflight.factory!;
    const componentName = options.componentId.split('/')[1];
    switch (mode) {
      case 'pure':
        this.logger.debug(
          `Calling factory (pure mode): ${preflight.factoryPath}`
        );
        const element = factory(props);
        if (element && element instanceof HTMLElement) {
          container.appendChild(element);
        } else {
          throw new Error('Pure mode factory did not return HTMLElement');
        }
        break;
      case 'container':
        this.logger.debug(
          `Calling factory (container mode): ${preflight.factoryPath}`
        );
        const result = factory(container, props);
        if (result && result.element) {
          if (!container.contains(result.element)) {
            container.appendChild(result.element);
          }
        } else if (result && result instanceof HTMLElement) {
          if (!container.contains(result)) {
            container.appendChild(result);
          }
        }
        break;
      case 'legacy-id':
        this.logger.debug(
          `Calling factory (legacy-id mode): ${preflight.factoryPath}`
        );
        const propsWithId = { ...props, containerId: container.id };
        factory(propsWithId);
        break;
      case 'adapter':
        const adapter = getAdapter(componentName);
        if (!adapter) {
          throw new Error(`Adapter not found for ${componentName}`);
        }
        this.logger.debug(`Calling adapter for ${componentName}`);
        adapter(container, props);
        break;
      default:
        throw new Error(`Unknown mode: ${mode}`);
    }
  }

  /**
   * Create placeholder for failed mount
   *
   * @param options - Mount options
   * @param preflight - Preflight result
   * @param runtimeErrors - Additional runtime errors
   * @returns Mount result with placeholder
   */
  createPlaceholder(
    options: MountOptions,
    preflight: ValidationResult,
    runtimeErrors: string[] = []
  ): MountResult {
    const wrapper = document.createElement('div');
    wrapper.className = 'autorun-mount autorun-mount-failed';
    wrapper.dataset.componentId = options.componentId;
    wrapper.dataset.containerId = options.containerId;
    const allErrors = [...preflight.errors, ...runtimeErrors];
    wrapper.innerHTML = `
      <strong>⚠️ Component Mount Failed</strong>
      <strong>Component:</strong> ${options.componentId}
      <strong>Container:</strong> ${options.containerId}
      ${preflight.factoryPath ? `<strong>Factory:</strong> ${preflight.factoryPath}` : ''}
      <strong>Errors:</strong>
      ${allErrors.map((e) => `• ${this.escapeHtml(e)}`).join('<br>')}
      ${
        preflight.warnings.length > 0
          ? `
        <strong>Warnings:</strong>
        ${preflight.warnings.map((w) => `• ${this.escapeHtml(w)}`).join('<br>')}
      `
          : ''
      }
    `;
    this.logger.debug(`Created placeholder for ${options.componentId}`);
    return {
      success: false,
      element: wrapper,
      error: allErrors.join('; '),
      preflight,
    };
  }

  /**
   * Escape HTML to prevent XSS in error messages
   */
  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Mount multiple components
   *
   * @param optionsArray - Array of mount options
   * @returns Array of mount results
   */
  mountAll(optionsArray: MountOptions[]): MountResult[] {
    this.logger.info(`Mounting ${optionsArray.length} components...`);
    const results: MountResult[] = [];
    for (const options of optionsArray) {
      const result = this.mount(options);
      results.push(result);
    }
    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;
    this.logger.info(`✅ ${successCount} succeeded, ❌ ${failCount} failed`);
    return results;
  }
}
