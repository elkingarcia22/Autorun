import type { StorybookConfig } from '@storybook/html-vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { ignoreTsconfigNodeJsonPlugin } from './plugins/ignore-tsconfig-node-json.ts';

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {}
  },
  staticDirs: [
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../stories/assets/images'), 
      to: '/images' 
    },
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../stories/assets/webfonts'), 
      to: '/webfonts' 
    }
  ],
  viteFinal: async (config) => {
    // Resolver alias para @ubits/icons
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const rootDir = resolve(currentDir, '../..');
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ubits/icons': resolve(rootDir, 'icons/src/index.ts'),
      '@ubits/calendar': resolve(rootDir, 'addons/calendar/src/index.ts'),
    };
    
    // Agregar plugin personalizado para ignorar tsconfig.node.json
    config.plugins = config.plugins || [];
    config.plugins.push(ignoreTsconfigNodeJsonPlugin());
    
    // Asegurar que Vite puede resolver módulos TypeScript correctamente
    config.resolve.conditions = config.resolve.conditions || [];
    if (!config.resolve.conditions.includes('import')) {
      config.resolve.conditions.push('import');
    }
    
    // Configurar server para manejar mejor las rutas con espacios
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = config.server.fs.allow || [];
    // Permitir acceso al directorio raíz completo
    config.server.fs.allow.push(rootDir);
    // También permitir acceso a directorios padre por si acaso
    config.server.fs.allow.push(resolve(rootDir, '..'));
    
    // Deshabilitar overlay de errores completamente para evitar problemas intermitentes
    config.server.hmr = config.server.hmr || {};
    config.server.hmr.overlay = false;
    
    // También deshabilitar errores en la consola del servidor
    config.logLevel = 'warn';
    
    // Configurar esbuild para evitar buscar tsconfig.node.json
    config.esbuild = config.esbuild || {};
    config.esbuild.tsconfigRaw = {
      compilerOptions: {
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
      },
    };
    
    // Configurar optimización para mejorar la resolución de módulos
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = config.optimizeDeps.include || [];
    
    // Asegurar que Vite puede resolver extensiones .ts
    config.resolve.extensions = config.resolve.extensions || ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'];
    if (!config.resolve.extensions.includes('.ts')) {
      config.resolve.extensions.push('.ts');
    }
    
    return config;
  },
};

export default config;