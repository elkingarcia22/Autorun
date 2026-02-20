// INJECTED: Global Bridge
import { initTemplateGlobalsBridge } from './TemplateGlobalsBridge';

// Standard imports
import { UBITSInterceptor } from '../interceptors/UBITSInterceptor';
import { AutorunBoot, boot, getAutorunBoot } from './AutorunBoot';
import { Logger, getLogger, configureLogger } from './Logger';
import {
  RuntimeDependencyRegistry,
  getRuntimeRegistry,
} from './RuntimeDependencyRegistry';
import {
  WrapperPresets,
  getWrapperPresetsCSS,
  injectWrapperPresetsCSS,
  getRecommendedPreset,
  createWrapper,
  WRAPPER_PRESETS,
} from './WrapperPresets';
import { RuntimeNormalizer, getRuntimeNormalizer } from './RuntimeNormalizer';
import { PreflightValidator } from './PreflightValidator';
import {
  ComponentCatalog,
  getComponentCatalog,
} from '../registry/ComponentCatalog';
import {
  AdapterRegistry,
  getAdapterRegistry,
  registerAdapter,
  getAdapter,
} from './AdapterRegistry';
import { RegistryLoader, initializeRegistry } from './RegistryLoader';
import { UniversalMount } from './UniversalMount';
import {
  waitForDependencies,
  waitForDependency,
  checkDependencyAvailable,
} from './waitForDependencies';

// --- INJECTION START ---
// Initialize the template globals bridge IMMEDIATELY
initTemplateGlobalsBridge({ debug: (window as any).AUTORUN_DEBUG === true });
// --- INJECTION END ---

try {
  UBITSInterceptor.initialize();
} catch (error) {
  console.error('❌ Failed to initialize UBITS Interceptor:', error);
}

if (typeof window !== 'undefined') {
  const initAutorun = async () => {
    console.log('🚀 Autorun V2 Runtime initializing...');
    try {
      const config = (window as any).__AUTORUN_CONFIG__ || {};
      const report = await boot({
        debug: true,
        ubitsTimeout: config.ubitsTimeout || 10000,
      });
      (window as any).__AUTORUN_BOOT_REPORT__ = report;
      if (report.status !== 'READY') {
        console.error('❌ Autorun V2 Runtime failed to initialize');
        console.error('Boot report:', report);
      } else {
        console.log('✅ Autorun V2 Runtime initialized successfully');
      }
    } catch (error) {
      console.error(
        '❌ Fatal error during Autorun V2 Runtime initialization:',
        error
      );
      (window as any).__AUTORUN_BOOT_ERROR__ = error;
    }
  };

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initAutorun);
  } else {
    // Si se inyecta deferido o al final del body, el DOM ya puede estar listo
    initAutorun();
  }
}

// Export everything
export {
  AutorunBoot,
  boot,
  getAutorunBoot,
  Logger,
  getLogger,
  configureLogger,
  RuntimeDependencyRegistry,
  getRuntimeRegistry, // Note: exported as getRuntimeRegistry, class is internal mostly
  WrapperPresets,
  getWrapperPresetsCSS,
  injectWrapperPresetsCSS,
  getRecommendedPreset,
  createWrapper,
  WRAPPER_PRESETS,
  RuntimeNormalizer,
  getRuntimeNormalizer,
  PreflightValidator,
  ComponentCatalog,
  getComponentCatalog,
  AdapterRegistry,
  getAdapterRegistry,
  registerAdapter,
  getAdapter,
  RegistryLoader,
  initializeRegistry,
  UniversalMount,
  waitForDependencies,
  waitForDependency,
  checkDependencyAvailable,
};
