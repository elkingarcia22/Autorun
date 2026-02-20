import {
  getComponentCatalog,
  ComponentCatalog,
} from '../registry/ComponentCatalog';
import { getLogger, Logger } from './Logger';
import { PreflightValidator } from './PreflightValidator';
import { getRuntimeNormalizer } from './RuntimeNormalizer';
import { getAdapterRegistry } from './AdapterRegistry';
import { WRAPPER_PRESETS } from './WrapperPresets';
import { waitForDependencies } from './waitForDependencies';

export interface BootOptions {
  ubitsTimeout?: number;
  debug?: boolean;
  skipUbitsWait?: boolean;
  registryBaseUrl?: string;
}

export interface BootReport {
  timestamp: number;
  status: 'READY' | 'FAILED' | 'INCOMPLETE';
  catalogSize: number;
  schemaVersion: string;
  ubitsReady: boolean;
  validatorActive: boolean;
  normalizerActive: boolean;
  loggerActive: boolean;
  presetsAvailable: string[];
  adaptersAvailable: string[];
  prohibitionActive: boolean;
  rules: {
    noAdHocScripts: boolean;
    noStorybookAPIs: boolean;
    registryOnly: boolean;
  };
  errors: string[];
  warnings: string[];
}

export class AutorunBoot {
  private catalog: ComponentCatalog;
  private logger: Logger;

  constructor() {
    this.catalog = getComponentCatalog();
    this.logger = getLogger();
  }

  /**
   * Check if running on file protocol
   */
  isFileProtocol(): boolean {
    try {
      return window.location?.protocol === 'file:';
    } catch {
      return false;
    }
  }

  /**
   * Show file protocol blocking overlay
   */
  showFileProtocolOverlay() {
    if (document.getElementById('autorun-file-overlay')) return;
    const html = `
    <div id="autorun-file-overlay" style="
      position:fixed; inset:0; z-index:999999;
      background:#0b0b0c; color:#fff; font-family:ui-sans-serif,system-ui,sans-serif;
      display:flex; align-items:center; justify-content:center; padding:24px;">
      <div style="max-width:880px; width:100%; border:1px solid rgba(255,255,255,.15); border-radius:14px; padding:32px; background:#1a1a1c; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
        <div style="font-size:24px; font-weight:700; margin-bottom:16px; color: #ef4444;">⚠️ Autorun V2: Requires HTTP Server</div>
        
        <div style="font-size:16px; opacity:.9; margin-bottom:24px; line-height:1.6;">
          You are opening this template via <b>file://</b> protocol.<br>
          Modern browsers block <b>fetch()</b> requests to local files due to CORS security policies.<br>
          The <b>Component Registry</b> and <b>Catalog</b> cannot function in this environment.
        </div>

        <div style="margin:16px 0; font-weight:700; font-size:14px; text-transform:uppercase; letter-spacing:0.05em; opacity:0.7;">Solution: Run this command</div>
        
        <pre style="background:rgba(0,0,0,.3); padding:20px; border-radius:8px; overflow:auto; border:1px solid rgba(255,255,255,0.1); font-family:monospace; font-size:14px; color:#a5f3fc;">
# Start the official preview server
npm run autorun:preview -- ./prototypes/${window.location.pathname.split('/').pop() || 'YOUR_TEMPLATE.html'}
</pre>
        
        <div style="opacity:.7; margin-top:20px; font-size:14px;">
          Then open the URL shown in your terminal (usually <b>http://localhost:3000/...</b>).
        </div>
      </div>
    </div>`;
    document.documentElement.insertAdjacentHTML('beforeend', html);
  }

  /**
   * Execute boot sequence
   *
   * @param options - Boot options
   * @returns Boot report
   */
  async boot(options: BootOptions = {}): Promise<BootReport> {
    const {
      ubitsTimeout = 10000,
      debug = false,
      skipUbitsWait = false,
      registryBaseUrl = '/registry-providers',
    } = options;

    if (this.isFileProtocol()) {
      this.showFileProtocolOverlay();
      (window as any).__AUTORUN_BOOTED__ = false;
      const report: BootReport = {
        timestamp: Date.now(),
        status: 'FAILED',
        // Using FAILED to ensure it's treated as an error
        catalogSize: 0,
        schemaVersion: '2.0',
        ubitsReady: false,
        validatorActive: false,
        normalizerActive: false,
        loggerActive: true,
        presetsAvailable: [],
        adaptersAvailable: [],
        prohibitionActive: false,
        rules: {
          noAdHocScripts: true,
          noStorybookAPIs: true,
          registryOnly: true,
        },
        errors: [
          'FILE_PROTOCOL_BLOCKED: Golden Path requires HTTP server (CORS)',
        ],
        warnings: [],
      };
      this.logger.error(
        '[Autorun] ❌ BOOT ABORTED: file:// protocol blocked. Use preview server.'
      );
      (window as any).__AUTORUN_BOOT_REPORT__ = report;
      return report;
    }

    this.logger.info('🚀 Starting Autorun V2 boot sequence...');
    const report: BootReport = {
      timestamp: Date.now(),
      status: 'INCOMPLETE',
      catalogSize: 0,
      schemaVersion: '2.0',
      ubitsReady: false,
      validatorActive: false,
      normalizerActive: false,
      loggerActive: false,
      presetsAvailable: [],
      adaptersAvailable: [],
      prohibitionActive: false,
      rules: {
        noAdHocScripts: false,
        noStorybookAPIs: false,
        registryOnly: false,
      },
      errors: [],
      warnings: [],
    };

    if (debug) {
      this.logger.enableDebug();
    }
    report.loggerActive = true;

    if (!skipUbitsWait) {
      try {
        this.logger.debug('Waiting for UBITS...');
        await this.waitForUBITS(ubitsTimeout);
        report.ubitsReady = true;
        this.logger.info('✅ UBITS ready');
      } catch (error: any) {
        report.errors.push(`UBITS not ready: ${error.message}`);
        this.logger.error('❌ UBITS not ready:', error);
      }
    } else {
      report.ubitsReady = true;
      report.warnings.push('Skipped UBITS wait (testing mode)');
    }

    try {
      this.logger.debug('Loading component catalog...');
      this.logger.debug(`Registry base URL: ${registryBaseUrl}`);
      await this.catalog.loadFromRegistry(registryBaseUrl);
      report.catalogSize = this.catalog.getAllComponents().length;
      this.logger.info(`✅ Catalog loaded: ${report.catalogSize} components`);
    } catch (error: any) {
      report.errors.push(`Catalog load failed: ${error.message}`);
      this.logger.error('❌ Catalog load failed:', error);
    }

    try {
      const validator = new PreflightValidator(this.catalog);
      (window as any).__AUTORUN_VALIDATOR__ = validator;
      report.validatorActive = true;
      this.logger.info('✅ Preflight validator activated');
    } catch (error: any) {
      report.errors.push(`Validator activation failed: ${error.message}`);
      this.logger.error('❌ Validator activation failed:', error);
    }

    try {
      const normalizer = getRuntimeNormalizer();
      (window as any).__AUTORUN_NORMALIZER__ = normalizer;
      report.normalizerActive = true;
      this.logger.info('✅ Runtime normalizer activated');
    } catch (error: any) {
      report.errors.push(`Normalizer activation failed: ${error.message}`);
      this.logger.error('❌ Normalizer activation failed:', error);
    }

    try {
      report.presetsAvailable = Object.keys(WRAPPER_PRESETS);
      this.logger.info(
        `✅ Wrapper presets available: ${report.presetsAvailable.join(', ')}`
      );
    } catch (error: any) {
      report.errors.push(`Presets verification failed: ${error.message}`);
      this.logger.error('❌ Presets verification failed:', error);
    }

    try {
      const registry = getAdapterRegistry();
      (window as any).__AUTORUN_ADAPTERS__ = registry;
      report.adaptersAvailable = registry.getNames();
      this.logger.info(
        `✅ Adapters available: ${report.adaptersAvailable.join(', ')}`
      );
    } catch (error: any) {
      report.errors.push(`Adapters activation failed: ${error.message}`);
      this.logger.error('❌ Adapters activation failed:', error);
    }

    try {
      report.prohibitionActive = true;
      this.logger.info('✅ Script prohibition active (build-time)');
    } catch (error: any) {
      report.warnings.push(`Script prohibition not active: ${error.message}`);
    }

    report.rules.noAdHocScripts = true;
    report.rules.noStorybookAPIs = true;
    report.rules.registryOnly = true;

    if (
      report.errors.length === 0 &&
      report.ubitsReady &&
      report.catalogSize > 0 &&
      report.validatorActive &&
      report.normalizerActive
    ) {
      report.status = 'READY';
      (window as any).__AUTORUN_CATALOG__ = this.catalog;
      (window as any).__AUTORUN_BOOTED__ = true;
      (window as any).__AUTORUN_BOOT_STATE__ = { ready: true, ts: Date.now(), version: 'v2' };
      (window as any).__AUTORUN_BOOT_REPORT__ = report;
      this.logger.info('🎉 Boot complete - System READY');
    } else if (report.errors.length > 0) {
      report.status = 'FAILED';
      (window as any).__AUTORUN_BOOT_REPORT__ = report;
      this.logger.error('❌ Boot FAILED');
    } else {
      report.status = 'INCOMPLETE';
      (window as any).__AUTORUN_BOOT_REPORT__ = report;
      this.logger.warn('⚠️  Boot INCOMPLETE');
    }

    return report;
  }

  /**
   * Wait for UBITS to be available
   *
   * @param timeout - Timeout in milliseconds
   */
  async waitForUBITS(timeout: number) {
    const isReady = () => {
      const w = window as any;
      const ubits = w.UBITS;
      const isUbitsPopulated = ubits && (Object.keys(ubits).length > 0 || ubits.Accordion || ubits.Card);
      const areGlobalsExposed = typeof w.createSidebar === 'function' && typeof w.createTabBar === 'function';
      return isUbitsPopulated || areGlobalsExposed;
    };

    const startTime = Date.now();
    return new Promise<void>((resolve, reject) => {
      const check = () => {
        if (isReady()) {
          resolve();
          return;
        }
        if (Date.now() - startTime > timeout) {
          reject(new Error(`UBITS or globals not ready after ${timeout}ms`));
          return;
        }
        setTimeout(check, 100);
      };
      check();
    });
  }

  /**
   * Print boot report to console
   *
   * @param report - Boot report
   */
  printReport(report: BootReport) {
    const statusIcon =
      report.status === 'READY'
        ? '✅'
        : report.status === 'FAILED'
          ? '❌'
          : '⚠️';
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 AUTORUN V2 BOOT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: ${statusIcon} ${report.status}
Time: ${new Date(report.timestamp).toISOString()}
Schema Version: ${report.schemaVersion}

📦 Component Catalog
  - Size: ${report.catalogSize} components

🔧 Runtime Components
  - UBITS ready: ${report.ubitsReady ? '✅' : '❌'}
  - Preflight Validator: ${report.validatorActive ? '✅' : '❌'}
  - Runtime Normalizer: ${report.normalizerActive ? '✅' : '❌'}
  - Logger: ${report.loggerActive ? '✅' : '❌'}
  - Script Prohibition: ${report.prohibitionActive ? '✅' : '❌'}

🎨 Wrapper Presets
  - Available: ${report.presetsAvailable.join(', ')}

🔌 Adapters
  - Available: ${report.adaptersAvailable.join(', ')}

📋 Rules
  - No ad-hoc scripts: ${report.rules.noAdHocScripts ? '✅ ON' : '❌ OFF'}
  - No Storybook APIs: ${report.rules.noStorybookAPIs ? '✅ ON' : '❌ OFF'}
  - Registry only: ${report.rules.registryOnly ? '✅ ON' : '❌ OFF'}

${report.warnings.length > 0
        ? `
⚠️  Warnings:
${report.warnings.map((w) => `  • ${w}`).join('\n')}
`
        : ''
      }

${report.errors.length > 0
        ? `
❌ Errors:
${report.errors.map((e) => `  • ${e}`).join('\n')}
`
        : ''
      }
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  }

  /**
   * Check if system is booted
   *
   * @returns True if booted
   */
  static isBooted(): boolean {
    return !!(window as any).__AUTORUN_BOOTED__;
  }

  /**
   * Require boot before proceeding
   *
   * Throws error if not booted and boot is required.
   */
  static requireBoot() {
    const required = (window as any).AUTORUN_BOOT_REQUIRED;
    const booted = AutorunBoot.isBooted();
    if (required && !booted) {
      throw new Error(
        'BOOT REQUIRED: Autorun V2 requires boot before loading components. Run: await AutorunBoot.boot()'
      );
    }
  }
}

let globalBoot: AutorunBoot | null = null;
export function getAutorunBoot(): AutorunBoot {
  if (!globalBoot) {
    globalBoot = new AutorunBoot();
  }
  return globalBoot;
}

export async function boot(options: BootOptions) {
  return getAutorunBoot().boot(options);
}
