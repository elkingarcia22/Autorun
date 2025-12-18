/**
 * Autorun MCP Server
 *
 * Exportaciones principales del servidor MCP de Autorun
 */

export { startAutorunMCPServer } from './autorunMCPServer';
export * from './types';
export { AddonOrchestrator } from './helpers/addonOrchestrator';
export { generateCodeWithAutorunMarks, parseAutorunMarks, hasAutorunMark, validateAutorunMark } from './helpers/codeMarkGenerator';
