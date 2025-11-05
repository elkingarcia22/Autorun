/**
 * Plugin de Vite para evitar errores con tsconfig.node.json y rutas con espacios
 * Intercepta errores de esbuild relacionados con tsconfig.node.json y los suprime
 */
import type { Plugin } from 'vite';

export function ignoreTsconfigNodeJsonPlugin(): Plugin {
  let originalOnError: ((err: Error) => void) | undefined;
  
  return {
    name: 'ignore-tsconfig-node-json',
    enforce: 'pre',
    buildStart() {
      // Guardar el handler de errores original
      const context = this;
      
      // Interceptar console.error
      const originalConsoleError = console.error;
      console.error = (...args: any[]) => {
        const message = String(args[0] || '');
        if (message.includes('tsconfig.node.json') && (message.includes('ENOENT') || message.includes('failed'))) {
          // Suprimir el error silenciosamente
          return;
        }
        originalConsoleError.apply(console, args);
      };
      
      // Interceptar errores de Vite
      if (this.error) {
        const originalError = this.error.bind(this);
        this.error = (err: Error | string) => {
          const errorMessage = err instanceof Error ? err.message : String(err);
          if (errorMessage.includes('tsconfig.node.json') && (errorMessage.includes('ENOENT') || errorMessage.includes('failed'))) {
            // Suprimir el error silenciosamente
            return null;
          }
          return originalError(err);
        };
      }
    },
    configureServer(server) {
      // Interceptar errores en el servidor de desarrollo
      if (server.config.logger) {
        const originalError = server.config.logger.error.bind(server.config.logger);
        server.config.logger.error = (msg: string, options?: any) => {
          if (msg.includes('tsconfig.node.json') && (msg.includes('ENOENT') || msg.includes('failed'))) {
            // Suprimir el error silenciosamente
            return;
          }
          originalError(msg, options);
        };
      }
      
      // Interceptar errores de esbuild en el servidor
      server.ws.on('error', (err: Error) => {
        if (err.message.includes('tsconfig.node.json') && (err.message.includes('ENOENT') || err.message.includes('failed'))) {
          // Suprimir el error silenciosamente
          return;
        }
      });
    },
    handleHotUpdate(ctx) {
      // Interceptar errores durante HMR
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const message = String(args[0] || '');
        if (message.includes('tsconfig.node.json') && (message.includes('ENOENT') || message.includes('failed'))) {
          // Suprimir el error silenciosamente
          return;
        }
        originalError.apply(console, args);
      };
    },
  };
}



