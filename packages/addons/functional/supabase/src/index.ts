/**
 * @autorun/supabase
 * Export público del add-on Supabase
 *
 * @description
 * Add-on para integración con Supabase que permite gestionar base de datos,
 * autenticación, storage y funciones serverless.
 *
 * @features
 * - Gestión de base de datos PostgreSQL
 * - Autenticación y autorización
 * - Storage de archivos
 * - Funciones serverless
 * - Real-time subscriptions
 *
 * @mcp
 * Este add-on actualmente no tiene integración MCP disponible. Requiere
 * credenciales de Supabase (URL y anon key) para conectarse al proyecto.
 * En el futuro podría beneficiarse de integración MCP si hay un servidor MCP
 * disponible para Supabase que mejore la gestión de credenciales y acceso
 * a APIs avanzadas.
 */

export { SupabaseAddon } from './SupabaseAddon';
export { SupabaseService, SupabaseConfig, SupabaseUser, SupabaseSession } from './SupabaseService';

// Export default para que AddonLoader pueda cargarlo
export { SupabaseAddon as default } from './SupabaseAddon';
