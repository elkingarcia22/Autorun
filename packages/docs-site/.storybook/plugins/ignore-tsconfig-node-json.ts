/**
 * Plugin de Vite para evitar errores con tsconfig.node.json y rutas con espacios
 * Intercepta errores de esbuild relacionados con tsconfig.node.json y los suprime
 */
import type { Plugin } from 'vite';

export function ignoreTsconfigNodeJsonPlugin(): Plugin {
  return {
    name: 'ignore-tsconfig-node-json',
    enforce: 'pre',
    buildStart() {
      // Interceptar errores de esbuild antes de que se muestren
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const message = args.join(' ');
        // Filtrar mensajes relacionados con tsconfig.node.json
        if (message.includes('tsconfig.node.json') && message.includes('ENOENT')) {
          return; // Suprimir el error
        }
        originalError.apply(console, args);
      };
    },
    configureServer(server) {
      // Interceptar errores en el servidor de desarrollo
      const originalError = server.config.logger.error;
      if (originalError) {
        server.config.logger.error = (msg: string, options?: any) => {
          if (msg.includes('tsconfig.node.json') && msg.includes('ENOENT')) {
            return; // Suprimir el error
          }
          originalError.call(server.config.logger, msg, options);
        };
      }
    },
    handleHotUpdate(ctx) {
      // Interceptar errores durante HMR
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const message = args.join(' ');
        if (message.includes('tsconfig.node.json') && message.includes('ENOENT')) {
          return; // Suprimir el error
        }
        originalError.apply(console, args);
      };
    },
  };
}


