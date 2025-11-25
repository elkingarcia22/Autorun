/**
 * @autoframe/supabase
 * Export público del add-on Supabase
 */

export { SupabaseAddon } from './SupabaseAddon';
export { SupabaseService, SupabaseConfig, SupabaseUser, SupabaseSession } from './SupabaseService';

// Export default para que AddonLoader pueda cargarlo
export { SupabaseAddon as default } from './SupabaseAddon';

