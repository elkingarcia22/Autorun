import type { StorybookConfig } from '@storybook/html-vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { ignoreTsconfigNodeJsonPlugin } from './plugins/ignore-tsconfig-node-json';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
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
    },
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../../tokens/dist'), 
      to: '/tokens/dist' 
    },
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../../typography'), 
      to: '/typography' 
    },
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../../components'), 
      to: '/components' 
    },
    { 
      from: resolve(dirname(fileURLToPath(import.meta.url)), '../../templates'), 
      to: '/templates' 
    }
  ],
  viteFinal: async (config) => {
    // Configurar alias para que 'addons' apunte a 'components'
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const rootDir = resolve(currentDir, '../..');
    const projectRoot = resolve(rootDir, '..');
    
    // Agregar directorios estáticos adicionales usando projectRoot
    const tokensDir = resolve(projectRoot, 'packages/tokens/dist');
    const typographyDir = resolve(projectRoot, 'packages/typography');
    const componentsDir = resolve(projectRoot, 'packages/components');
    
    // Agregar a staticDirs dinámicamente (no se puede hacer en la configuración inicial)
    // En su lugar, usaremos middleware de Vite
    
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Mapear addons a components - esto permite que las stories usen '../../addons/...'
      '../../addons': resolve(projectRoot, 'packages/components'),
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
    config.server.fs.allow.push(projectRoot);
    // También permitir acceso a directorios padre por si acaso
    config.server.fs.allow.push(resolve(projectRoot, '..'));
    config.server.fs.allow.push(tokensDir);
    config.server.fs.allow.push(typographyDir);
    config.server.fs.allow.push(componentsDir);
    
    // Agregar middleware para servir recursos y modificar las rutas de los templates
    config.plugins.push({
      name: 'serve-template-resources',
      configureServer(server: any) {
        const fs = require('fs');
        const path = require('path');
        
        
        // Servir tokens - IMPORTANTE: manejar /tokens/dist/ primero (más específico)
        // Las URLs vienen como /tokens/dist/tokens.css
        // Usar un middleware que se ejecute ANTES que otros middlewares
        server.middlewares.use((req: any, res: any, next: any) => {
          // Interceptar solo rutas que empiecen con /tokens/dist
          if (req.url && req.url.startsWith('/tokens/dist')) {
            // req.url viene como "/tokens/dist/tokens.css" completo
            const relativePath = req.url.replace('/tokens/dist/', '');
            const filePath = path.resolve(tokensDir, relativePath);
            
            console.log(`🔍 [Middleware Tokens/dist] URL original: ${req.url}`);
            console.log(`🔍 [Middleware Tokens/dist] relativePath: ${relativePath}`);
            console.log(`🔍 [Middleware Tokens/dist] tokensDir: ${tokensDir}`);
            console.log(`🔍 [Middleware Tokens/dist] filePath completo: ${filePath}`);
            console.log(`🔍 [Middleware Tokens/dist] File exists: ${fs.existsSync(filePath)}`);
            
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css' : 'text/plain');
              res.end(fs.readFileSync(filePath));
              console.log(`✅ [Middleware Tokens/dist] Token servido: ${req.url}`);
              return;
            } else {
              console.error(`❌ [Middleware Tokens/dist] Token NO encontrado: ${req.url} -> ${filePath}`);
            }
          }
          next();
        });
        
        // Servir tokens sin /dist/ (fallback)
        // IMPORTANTE: tokensDir ya apunta a packages/tokens/dist
        server.middlewares.use('/tokens', (req: any, res: any, next: any) => {
          // req.url viene como "/tokens.css" después del middleware
          const relativePath = req.url.replace(/^\//, '');
          const filePath = path.resolve(tokensDir, relativePath);
          
          console.log(`🔍 [Middleware Tokens] URL original: ${req.originalUrl || req.url}`);
          console.log(`🔍 [Middleware Tokens] req.url después de Express: ${req.url}`);
          console.log(`🔍 [Middleware Tokens] relativePath: ${relativePath}`);
          console.log(`🔍 [Middleware Tokens] tokensDir: ${tokensDir}`);
          console.log(`🔍 [Middleware Tokens] filePath completo: ${filePath}`);
          console.log(`🔍 [Middleware Tokens] File exists: ${fs.existsSync(filePath)}`);
          
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css' : 'text/plain');
            res.end(fs.readFileSync(filePath));
            console.log(`✅ [Middleware Tokens] Token servido: ${req.url}`);
            return;
          } else {
            console.error(`❌ [Middleware Tokens] Token NO encontrado: ${req.url} -> ${filePath}`);
            next();
          }
        });
        
        // Servir typography
        server.middlewares.use('/typography', (req: any, res: any, next: any) => {
          const filePath = path.resolve(typographyDir, req.url.replace(/^\//, ''));
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css' : 'text/plain');
            res.end(fs.readFileSync(filePath));
          } else {
            next();
          }
        });
        
        // Servir components
        server.middlewares.use('/components', (req: any, res: any, next: any) => {
          const filePath = path.resolve(componentsDir, req.url.replace(/^\//, ''));
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', filePath.endsWith('.css') ? 'text/css' : 'text/plain');
            res.end(fs.readFileSync(filePath));
          } else {
            next();
          }
        });
        
        // Servir templates y sus recursos
        const templatesDir = resolve(projectRoot, 'packages/templates');
        server.middlewares.use('/templates', (req: any, res: any, next: any) => {
          const relativePath = req.url.replace(/^\//, '');
          const filePath = path.resolve(templatesDir, relativePath);
          
          if (fs.existsSync(filePath)) {
            if (fs.statSync(filePath).isFile()) {
              // Determinar Content-Type según extensión
              let contentType = 'text/html';
              if (filePath.endsWith('.css')) contentType = 'text/css';
              else if (filePath.endsWith('.js')) contentType = 'application/javascript';
              else if (filePath.endsWith('.json')) contentType = 'application/json';
              else if (filePath.endsWith('.png')) contentType = 'image/png';
              else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
              else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
              else if (filePath.endsWith('.woff2')) contentType = 'font/woff2';
              else if (filePath.endsWith('.woff')) contentType = 'font/woff';
              
              res.setHeader('Content-Type', contentType);
              res.end(fs.readFileSync(filePath));
              return;
            } else {
              next();
            }
          } else {
            next();
          }
        });
        
        // Servir assets de templates (FontAwesome, imágenes, etc.)
        // Las rutas relativas desde templates como "assets/fontawesome/css/all.min.css"
        // se resolverán desde /templates/assets/...
        // Esto ya está cubierto por el middleware de /templates arriba
      }
    });
    
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
  docs: {
    autodocs: 'tag',
  },
};

export default config;

