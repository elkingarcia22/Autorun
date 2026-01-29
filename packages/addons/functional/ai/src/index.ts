/**
 * @autorun/ai
 * Export público del add-on AI
 *
 * @description
 * Add-on para integración con asistentes de IA (Ollama, Gemini) que permite
 * generar código, analizar código y obtener asistencia inteligente.
 *
 * @features
 * - Completado de código con IA
 * - Análisis de código
 * - Generación de código
 * - Soporte para múltiples proveedores (Ollama, Gemini)
 * - Configuración flexible
 *
 * @mcp
 * Este add-on actualmente no tiene integración MCP disponible. Requiere
 * configuración de endpoints y credenciales para los proveedores de IA.
 * En el futuro podría beneficiarse de integración MCP si hay servidores MCP
 * disponibles para los proveedores de IA que mejoren la gestión de credenciales
 * y acceso a APIs avanzadas.
 */

export { AIAddon } from './AIAddon';
export { AIService, AIConfig, AICompletion, AICodeAnalysis } from './AIService';

// Export default para que AddonLoader pueda cargarlo
export { AIAddon as default } from './AIAddon';
