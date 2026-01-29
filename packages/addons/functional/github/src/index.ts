/**
 * @autorun/github
 * Export público del add-on GitHub
 *
 * @description
 * Add-on para integración con GitHub que permite gestionar repositorios,
 * commits, pull requests, issues y más operaciones de Git/GitHub.
 *
 * @features
 * - Gestión de repositorios y branches
 * - Creación y gestión de commits
 * - Pull requests y code reviews
 * - Issues y proyectos
 * - Webhooks y eventos
 *
 * @mcp
 * Este add-on soporta integración con MCP (Model Context Protocol) para mejorar
 * la experiencia y seguridad:
 * - Detección automática de servidor MCP GitHub disponible
 * - Instalación guiada de MCP si el usuario lo desea
 * - Uso de APIs avanzadas de GitHub sin necesidad de tokens locales
 * - Mejor gestión de credenciales y seguridad
 *
 * El add-on detectará automáticamente si hay un servidor MCP configurado
 * y ofrecerá instalarlo durante la inicialización si está disponible pero
 * no configurado. Si el usuario acepta, se configurará automáticamente.
 *
 * @example
 * ```typescript
 * import { GitHubAddon } from '@autorun/github';
 *
 * const addon = new GitHubAddon();
 * await addon.initialize(context);
 * // El add-on preguntará automáticamente sobre MCP si está disponible
 * ```
 */

export { GitHubAddon } from './GitHubAddon';
export { GitHubService, GitHubConfig, CommitInfo } from './GitHubService';

// Export default para que AddonLoader pueda cargarlo
export { GitHubAddon as default } from './GitHubAddon';
