# 📚 Guía de Configuración de Storybook UBITS

Este documento contiene toda la información necesaria para configurar y ejecutar Storybook correctamente en el proyecto UBITS.

## 🎯 Configuración Completa

### Estructura de Archivos Requerida

```
packages/storybook/
├── .storybook/
│   ├── main.ts                    # Configuración principal
│   ├── preview.ts                 # Configuración de preview y estilos globales
│   └── plugins/
│       └── ignore-tsconfig-node-json.ts  # Plugin para ignorar errores de tsconfig
├── stories/                       # Stories de componentes
│   ├── *.stories.ts
│   └── assets/
│       ├── images/                # Imágenes para stories
│       └── webfonts/              # Fuentes de FontAwesome
├── docs-site/
│   └── .storybook/
│       └── fontawesome-icons.css  # CSS de FontAwesome Pro
└── package.json
```

## 📋 Pasos de Configuración

### 1. Instalar Dependencias

```bash
cd packages/storybook
npm install
```

**Dependencias requeridas:**
- `@storybook/html-vite@^10.0.8`
- `@storybook/addon-docs@^10.0.8`
- `storybook@^10.0.8`

### 2. Verificar Configuración de Tokens

Antes de iniciar Storybook, asegúrate de que los tokens estén generados:

```bash
# Desde la raíz del proyecto
npm run build:tokens
```

Esto genera `packages/tokens/dist/tokens.css` con todos los tokens UBITS.

### 3. Verificar Archivos de Configuración

#### `.storybook/main.ts`

Este archivo debe contener:
- Configuración de `staticDirs` para servir imágenes y fuentes
- Alias para mapear `../../addons` a `packages/components`
- Plugin para ignorar errores de tsconfig.node.json
- Configuración de Vite para resolver módulos TypeScript

#### `.storybook/preview.ts`

Este archivo debe importar:
- Tokens UBITS (`../../tokens/dist/tokens.css`)
- Tipografía UBITS (`../../typography/fonts.css`, `../../typography/tokens-typography.css`)
- CSS de todos los componentes
- FontAwesome Pro (`../docs-site/.storybook/fontawesome-icons.css`)
- Decorators para el tema

### 4. Verificar Assets Estáticos

Asegúrate de que existan:
- `stories/assets/images/` - Imágenes para las stories
- `stories/assets/webfonts/` - Fuentes de FontAwesome
- `docs-site/.storybook/fontawesome-icons.css` - CSS de FontAwesome

## 🚀 Iniciar Storybook

```bash
# Desde la raíz del proyecto
npm run storybook

# O desde packages/storybook
cd packages/storybook
npm run storybook
```

Storybook se iniciará en `http://localhost:6006`

## 🔧 Problemas Comunes y Soluciones

### Problema 1: "No configuration files have been found"

**Solución:** Verifica que exista `.storybook/main.ts` con la configuración correcta.

### Problema 2: Imágenes no cargan (404 en /images/...)

**Solución:** Verifica que `staticDirs` esté configurado en `main.ts`:
```typescript
staticDirs: [
  { 
    from: resolve(dirname(fileURLToPath(import.meta.url)), '../stories/assets/images'), 
    to: '/images' 
  },
  { 
    from: resolve(dirname(fileURLToPath(import.meta.url)), '../stories/assets/webfonts'), 
    to: '/webfonts' 
  }
]
```

### Problema 3: Iconos de FontAwesome no aparecen

**Solución:** 
1. Verifica que `fontawesome-icons.css` esté importado en `preview.ts`
2. Verifica que las fuentes estén en `stories/assets/webfonts/`
3. Verifica que `staticDirs` incluya `/webfonts`

### Problema 4: Componentes sin estilos

**Solución:** 
1. Verifica que todos los CSS de componentes estén importados en `preview.ts`
2. Verifica que el alias `../../addons` esté mapeado correctamente a `packages/components`
3. Regenera los tokens: `npm run build:tokens`

### Problema 5: Colores de feedback incorrectos

**Solución:** 
1. Verifica que los tokens en `packages/tokens/tokens.json` tengan los valores correctos:
   - `ubits-feedback-accent-success`: `#41c433` (verde)
   - `ubits-feedback-accent-error`: `#e20d34` (rojo)
   - `ubits-feedback-accent-warning`: `#d68b0d` (naranja)
   - `ubits-feedback-accent-info`: `#7397fe` (azul)
   - `ubits-feedback-bg-success-subtle`: `#e8f8e4` (verde claro)
   - `ubits-feedback-bg-error-subtle`: `#fff0ee` (rojo claro)
   - `ubits-feedback-bg-warning-subtle`: `#fff1e0` (naranja claro)
   - `ubits-feedback-bg-info-subtle`: `rgba(12, 91, 239, 0.15)` (azul claro)
2. Regenera los tokens: `npm run build:tokens`
3. Reinicia Storybook

## 📝 Checklist de Verificación

Antes de iniciar Storybook, verifica:

- [ ] Dependencias instaladas (`npm install` en `packages/storybook`)
- [ ] Tokens generados (`npm run build:tokens` desde la raíz)
- [ ] Archivo `.storybook/main.ts` existe y está configurado
- [ ] Archivo `.storybook/preview.ts` existe y importa todos los CSS
- [ ] Plugin `ignore-tsconfig-node-json.ts` existe en `.storybook/plugins/`
- [ ] Directorio `stories/assets/images/` existe con imágenes
- [ ] Directorio `stories/assets/webfonts/` existe con fuentes
- [ ] Archivo `docs-site/.storybook/fontawesome-icons.css` existe
- [ ] Alias `../../addons` está mapeado a `packages/components` en `main.ts`

## 🎨 Tokens de Feedback Correctos

Los siguientes tokens deben tener estos valores para que los colores funcionen correctamente:

### Success (Verde)
- `ubits-feedback-accent-success`: `#41c433`
- `ubits-feedback-bg-success-subtle`: `#e8f8e4`
- `ubits-feedback-fg-success-subtle`: `#223b16`
- `ubits-feedback-border-success`: `#41c433`
- `ubits-feedback-success-bg`: `#e8f8e4`
- `ubits-feedback-success-text`: `#223b16`
- `ubits-feedback-success-border`: `#41c433`

### Error (Rojo)
- `ubits-feedback-accent-error`: `#e20d34`
- `ubits-feedback-bg-error-subtle`: `#fff0ee`
- `ubits-feedback-fg-error-subtle`: `#65181e`
- `ubits-feedback-border-error`: `#e20d34`
- `ubits-feedback-error-bg`: `#fff0ee`
- `ubits-feedback-error-text`: `#65181e`
- `ubits-feedback-error-border`: `#fd8a82`

### Warning (Naranja)
- `ubits-feedback-accent-warning`: `#d68b0d`
- `ubits-feedback-bg-warning-subtle`: `#fff1e0`
- `ubits-feedback-fg-warning-subtle`: `#4c2e15`
- `ubits-feedback-border-warning`: `#ec9907`
- `ubits-feedback-warning-bg`: `#fff1e0`
- `ubits-feedback-warning-text`: `#4c2e15`
- `ubits-feedback-warning-border`: `#ec9907`

### Info (Azul)
- `ubits-feedback-accent-info`: `#7397fe`
- `ubits-feedback-bg-info-subtle`: `rgba(12, 91, 239, 0.15)`
- `ubits-feedback-fg-info-subtle`: `#212f70`
- `ubits-feedback-border-info`: `#0c5bef`
- `ubits-feedback-info-bg`: `rgba(12, 91, 239, 0.15)`
- `ubits-feedback-info-text`: `#212f70`
- `ubits-feedback-info-border`: `#0c5bef`

## 🔄 Comandos Útiles

```bash
# Regenerar tokens
npm run build:tokens

# Iniciar Storybook
npm run storybook

# Build estático de Storybook
npm run build:storybook

# Detener Storybook
pkill -f "storybook dev"
```

## 📚 Archivos de Configuración Completos

### `.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/html-vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { ignoreTsconfigNodeJsonPlugin } from './plugins/ignore-tsconfig-node-json';

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
    }
  ],
  viteFinal: async (config) => {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const rootDir = resolve(currentDir, '../..');
    const projectRoot = resolve(rootDir, '..');
    
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '../../addons': resolve(projectRoot, 'packages/components'),
    };
    
    config.plugins = config.plugins || [];
    config.plugins.push(ignoreTsconfigNodeJsonPlugin());
    
    config.resolve.conditions = config.resolve.conditions || [];
    if (!config.resolve.conditions.includes('import')) {
      config.resolve.conditions.push('import');
    }
    
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = config.server.fs.allow || [];
    config.server.fs.allow.push(projectRoot);
    config.server.fs.allow.push(resolve(projectRoot, '..'));
    
    config.server.hmr = config.server.hmr || {};
    config.server.hmr.overlay = false;
    
    config.logLevel = 'warn';
    
    config.esbuild = config.esbuild || {};
    config.esbuild.tsconfigRaw = {
      compilerOptions: {
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
      },
    };
    
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = config.optimizeDeps.include || [];
    
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
```

### `.storybook/preview.ts`

```typescript
import type { Preview } from '@storybook/html-vite'
import '../../tokens/dist/tokens.css'
import '../../typography/fonts.css'
import '../../typography/tokens-typography.css'
import '../../addons/status-tag/src/styles/status-tag.css'
import '../../addons/avatar/src/styles/avatar.css'
import '../../addons/drawer/src/styles/drawer.css'
import '../../addons/modal/src/styles/modal.css'
import '../../addons/scroll/src/styles/scroll.css'
import '../../addons/progress/src/styles/progress.css'
import '../../addons/file-upload/src/styles/file-upload.css'
import '../../addons/button/src/styles/button.css'
import '../../addons/badge/src/styles/badge.css'
import '../../addons/alert/src/styles/alert.css'
import '../../addons/toast/src/styles/toast.css'
import '../../addons/list/src/styles/list.css'
import '../../addons/input/src/styles/input.css'
import '../../addons/sidebar/src/styles/sidebar.css'
import '../../addons/subnav/src/styles/subnav.css'
import '../../addons/tabbar/src/styles/tabbar.css'
import '../../addons/card/src/styles/card.css'
import '../../addons/data-table/src/styles/data-table.css'
import '../../addons/pagination/src/styles/pagination.css'
import '../../addons/checkbox/src/styles/checkbox.css'
import '../../addons/toggle/src/styles/toggle.css'
import '../../addons/radio-button/src/styles/radio-button.css'
import '../../addons/selection-card/src/styles/selection-card.css'
import '../../addons/empty-state/src/styles/empty-state.css'
import '../../addons/tooltip/src/styles/tooltip.css'
import '../../addons/spinner/src/styles/spinner.css'
import '../../addons/calendar/src/styles/calendar.css'
import '../../addons/tabs/src/styles/tabs.css'
import '../../addons/segment-control/src/styles/segment-control.css'
import '../../addons/breadcrumb/src/styles/breadcrumb.css'
import '../../addons/stepper/src/styles/stepper.css'
import '../../addons/participants-menu/src/styles/participants-menu.css'
import '../../addons/metric-card/src/styles/metric-card.css'
import '../docs-site/.storybook/fontawesome-icons.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      title: 'Theme',
      description: 'Select light or dark theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, ctx) => {
      const theme = ctx.globals.theme || 'light'
      document.body.setAttribute('data-theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
      document.body.style.backgroundColor = 'var(--ubits-bg-2)'
      
      const style = document.createElement('style')
      style.textContent = `
        .sb-previewBlock {
          background: transparent !important;
          border: none !important;
        }
        .sb-wrapper {
          background: transparent !important;
        }
        #storybook-root {
          background: transparent !important;
        }
      `
      document.head.appendChild(style)
      
      return story()
    },
  ],
}

export default preview
```

## ⚠️ Notas Importantes

1. **Siempre regenera los tokens** antes de iniciar Storybook si has modificado `tokens.json`
2. **El alias `../../addons`** es crítico para que las stories funcionen sin cambios
3. **Los CSS de componentes** deben estar importados en `preview.ts` para que los estilos funcionen
4. **FontAwesome** requiere tanto el CSS como las fuentes web en `webfonts/`
5. **Los tokens de feedback** deben tener valores correctos para que los colores se muestren bien

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Storybook no inicia | Verifica `.storybook/main.ts` existe |
| Imágenes 404 | Verifica `staticDirs` en `main.ts` |
| Sin iconos | Verifica FontAwesome CSS y webfonts |
| Sin estilos | Verifica imports en `preview.ts` |
| Colores incorrectos | Regenera tokens con `npm run build:tokens` |

---

**Última actualización:** Noviembre 2024  
**Versión de Storybook:** 10.0.8

