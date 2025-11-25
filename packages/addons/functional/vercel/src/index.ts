/**
 * @autoframe/vercel
 * Export público del add-on Vercel
 */

export { VercelAddon } from './VercelAddon';
export { VercelService, VercelConfig, VercelProject, VercelDeployment, VercelDomain } from './VercelService';

// Export default para que AddonLoader pueda cargarlo
export { VercelAddon as default } from './VercelAddon';

