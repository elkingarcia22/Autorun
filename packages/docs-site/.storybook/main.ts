import type { StorybookConfig } from '@storybook/html-vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

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
    };
    
    // Asegurar que Vite puede resolver módulos TypeScript correctamente
    config.resolve.conditions = config.resolve.conditions || [];
    if (!config.resolve.conditions.includes('import')) {
      config.resolve.conditions.push('import');
    }
    
    // Configurar server para manejar mejor las rutas con espacios
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = config.server.fs.allow || [];
    config.server.fs.allow.push(rootDir);
    
    // Configurar optimización para mejorar la resolución de módulos
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = config.optimizeDeps.include || [];
    
    return config;
  },
};

export default config;