/**
 * @autoframe/eslint
 * Export público del add-on ESLint
 */

export { ESLintAddon } from './ESLintAddon';
export { ESLintService, ESLintConfig, ESLintResult, ESLintReport } from './ESLintService';

// Export default para que AddonLoader pueda cargarlo
export { ESLintAddon as default } from './ESLintAddon';

