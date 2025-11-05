/**
 * Plugin de Vite para evitar errores con tsconfig.node.json y rutas con espacios
 * Intercepta las llamadas a buscar tsconfig.node.json y las ignora silenciosamente
 */
import type { Plugin } from 'vite';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';

export function ignoreTsconfigNodeJsonPlugin(): Plugin {
  return {
    name: 'ignore-tsconfig-node-json',
    enforce: 'pre',
    configResolved(config) {
      // Interceptar el proceso de búsqueda de tsconfig.node.json
      const originalResolveId = config.resolve?.alias;
    },
    resolveId(id, importer) {
      // Si alguien intenta resolver tsconfig.node.json, devolver un módulo vacío
      if (id.includes('tsconfig.node.json') || id.endsWith('tsconfig.node.json')) {
        return {
          id: 'virtual:tsconfig-node-json',
          moduleSideEffects: false,
        };
      }
      return null;
    },
    load(id) {
      // Devolver un objeto vacío cuando se carga el módulo virtual
      if (id === 'virtual:tsconfig-node-json') {
        return 'export default {};';
      }
      return null;
    },
  };
}

