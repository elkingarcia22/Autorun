# 🚀 Standalone Mode Add-on

Add-on funcional de **Standalone Mode** para Autorun que proporciona builds optimizados y extracción de componentes desde Storybook.

## 🎯 Características

- ✅ **Build optimizado de Storybook** - Builds estáticos optimizados para producción
- ✅ **Extracción de componentes** - Componentes individuales desde Storybook
- ✅ **Generación de manifest** - Catálogo de componentes disponibles
- ✅ **Optimización de assets** - Minificación y compresión automática
- ✅ **Multi-target builds** - Storybook, componentes, tokens
- ✅ **Integración automática** - Hooks con el Hub para deployments
- ✅ **CDN-ready** - Builds listos para deploy en cualquier hosting estático

## 📦 Instalación

El add-on ya está incluido en Autorun. Para funcionalidades avanzadas, instala las dependencias opcionales:

```bash
# Para minificación avanzada
npm install --save-dev terser esbuild

# Para compresión de imágenes
npm install --save-dev sharp
```

**Nota:** El add-on funcionará sin estas dependencias, pero con funcionalidades limitadas.

## ⚙️ Configuración

Agrega la configuración de Standalone Mode en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "standalone": {
          "optimizeStorybookBuild": true,
          "extractComponents": true,
          "componentsOutputDir": "dist/components",
          "generateManifest": true,
          "minify": true,
          "compress": true,
          "treeShake": true,
          "targets": ["storybook", "components"],
          "storybookBuildDir": "storybook-static"
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `optimizeStorybookBuild` | `boolean` | Optimizar build de Storybook | `true` |
| `extractComponents` | `boolean` | Extraer componentes individuales | `false` |
| `componentsOutputDir` | `string` | Directorio de salida para componentes | `dist/components` |
| `generateManifest` | `boolean` | Generar manifest de componentes | `true` |
| `minify` | `boolean` | Minificar assets JS/CSS | `true` |
| `compress` | `boolean` | Comprimir assets grandes | `true` |
| `treeShake` | `boolean` | Tree-shaking de código no usado | `true` |
| `targets` | `string[]` | Targets a construir (`storybook`, `components`, `tokens`) | `["storybook"]` |
| `storybookBuildDir` | `string` | Directorio de build de Storybook | `storybook-static` |
| `tokensOutputDir` | `string` | Directorio de salida para tokens | `dist/tokens` |
| `tokensSourcePath` | `string` | Ruta de origen de tokens | `packages/tokens` |
| `minifier` | `string` | Minificador a usar (`terser`, `esbuild`, `both`) | `both` |
| `imageCompression` | `boolean` | Comprimir imágenes con sharp | `true` |
| `imageQuality` | `number` | Calidad de compresión de imágenes (0-100) | `80` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Standalone Mode
await hub.activateAddon('standalone');
```

### Build Standalone Manual

```typescript
// Obtener servicio de build
const build = hub.getService('standalone', 'build');

// Ejecutar build completo
const result = await build({
  optimizeStorybookBuild: true,
  extractComponents: true,
  generateManifest: true,
  targets: ['storybook', 'components']
});

console.log('Build completado:', result.success);
console.log('Storybook build:', result.storybookBuildPath);
console.log('Componentes:', result.componentsPath);
console.log('Manifest:', result.manifestPath);
```

### Build Automático (Recomendado)

El add-on se ejecuta automáticamente antes de cada deploy:

```typescript
// Activar add-ons necesarios
await hub.activateAddon('storybook');
await hub.activateAddon('standalone');
await hub.activateAddon('vercel');

// Trigger deploy (build standalone se ejecuta automáticamente)
await hub.triggerEvent('beforeDeploy');

// El sistema automáticamente:
// 1. Hace build de Storybook
// 2. Optimiza el build
// 3. Extrae componentes (si está habilitado)
// 4. Genera manifest
// 5. Deploya a Vercel
```

## 🔌 Hooks Automáticos

El add-on de Standalone Mode se integra automáticamente con el Hub:

### `onBeforeDeploy`
Se ejecuta automáticamente antes de cada deploy:
```typescript
// Build standalone se ejecuta automáticamente
// Optimiza Storybook y extrae componentes
```

### `onAfterDeploy`
Se ejecuta después de cada deploy:
```typescript
// Logs de confirmación del deploy
```

## 📊 Resultado del Build

Después de ejecutar un build standalone, obtendrás:

```
dist/
├── standalone-manifest.json    # Catálogo de componentes
└── components/                 # Componentes extraídos (si está habilitado)
    ├── Button.component.js
    ├── Input.component.js
    └── ...

storybook-static/               # Build optimizado de Storybook
├── index.html
├── assets/
│   ├── *.js (minificado)
│   ├── *.css (minificado)
│   └── ...
└── ...
```

### Manifest de Componentes

El manifest generado contiene:

```json
{
  "version": "1.0.0",
  "components": [
    {
      "name": "Button",
      "path": "dist/components/Button.component.js",
      "bundle": "Button.component.js",
      "description": "Botón reutilizable"
    }
  ],
  "buildDate": "2024-12-XX",
  "storybookVersion": "^8.0.0"
}
```

## 🎯 Casos de Uso

### Caso 1: Storybook como Documentación Pública

```typescript
// Configuración
{
  "standalone": {
    "targets": ["storybook"],
    "optimizeStorybookBuild": true
  }
}

// Resultado: storybook-static/ listo para deploy
// Deploy a Vercel → storybook.tuapp.com
```

### Caso 2: Componentes para Producción

```typescript
// Configuración
{
  "standalone": {
    "targets": ["storybook", "components"],
    "extractComponents": true,
    "componentsOutputDir": "dist/components"
  }
}

// Resultado: Componentes extraídos y listos para usar
// Import en tu app: import Button from './dist/components/Button.component.js'
```

### Caso 3: Design System Completo

```typescript
// Configuración
{
  "standalone": {
    "targets": ["storybook", "components", "tokens"],
    "extractComponents": true,
    "generateManifest": true
  }
}

// Resultado: Design System completo deployable
```

## 🔗 Integración con Otros Add-ons

### Storybook Add-on

Standalone Mode extiende Storybook:

```typescript
// Activar ambos add-ons
await hub.activateAddon('storybook');
await hub.activateAddon('standalone');

// Build optimizado automáticamente antes de deploy
```

### Vercel Add-on

Deploy automático del build standalone:

```typescript
await hub.activateAddon('vercel');

// El build standalone se ejecuta automáticamente antes del deploy
// Vercel deploya el directorio storybook-static/
```

### GitHub Add-on

Commit automático del build:

```typescript
await hub.activateAddon('github');

// El build standalone se commitea automáticamente
hub.on('afterStandaloneBuild', async (buildInfo) => {
  await hub.getService('github', 'commit')({
    message: 'chore: build standalone',
    files: [buildInfo.outputDir]
  });
});
```

## 📝 Ejemplo Completo

### Configuración Completa

```json
{
  "autorun": {
    "addons": {
      "active": ["storybook", "standalone", "vercel"],
      "config": {
        "storybook": {
          "port": 6006,
          "buildDir": "storybook-static"
        },
        "standalone": {
          "optimizeStorybookBuild": true,
          "extractComponents": true,
          "componentsOutputDir": "dist/components",
          "generateManifest": true,
          "targets": ["storybook", "components"]
        },
        "vercel": {
          "outputDirectory": "storybook-static",
          "autoDeploy": true
        }
      }
    }
  }
}
```

### Uso en Código

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar add-ons
await hub.activateAddon('storybook');
await hub.activateAddon('standalone');
await hub.activateAddon('vercel');

// Build standalone manual
const buildService = hub.getService('standalone', 'build');
const result = await buildService({
  optimizeStorybookBuild: true,
  extractComponents: true,
  generateManifest: true
});

if (result.success) {
  console.log('✅ Build completado');
  console.log('📦 Storybook:', result.storybookBuildPath);
  console.log('🔧 Componentes:', result.componentsPath);
  console.log('📋 Manifest:', result.manifestPath);
  
  if (result.optimizations) {
    console.log(
      `📊 Optimización: ${result.optimizations.savings} bytes ahorrados`
    );
  }
}
```

## 🐛 Troubleshooting

### Build de Storybook falla

1. Verifica que Storybook esté instalado: `npm list @storybook/react`
2. Verifica que el proyecto tenga configuración de Storybook (`.storybook/`)
3. Revisa los logs del build para errores específicos

### Componentes no se extraen

1. Verifica que `extractComponents` esté en `true`
2. Verifica que el build de Storybook se haya completado correctamente
3. Revisa que existan stories en el directorio `stories/`

### Optimización no funciona

1. Las optimizaciones básicas están implementadas
2. Para optimizaciones avanzadas (minificación real), se requiere instalar herramientas adicionales:
   ```bash
   npm install --save-dev terser esbuild
   ```

### Manifest no se genera

1. Verifica que `generateManifest` esté en `true`
2. Verifica que el directorio `dist/` sea escribible
3. Revisa los logs para errores de escritura

## 📚 Referencias

- [Storybook Build Documentation](https://storybook.js.org/docs/react/builders/overview)
- [Vercel Static Deployments](https://vercel.com/docs/deployments/static-deployments)
- [Component Extraction Patterns](https://storybook.js.org/docs/react/sharing/exporting)

## 🎯 Optimizaciones Avanzadas (Fase 2) ✅

### Minificación Real

El add-on ahora soporta minificación real con **terser** y **esbuild**:

```json
{
  "standalone": {
    "minify": true,
    "minifier": "both"  // o "terser" o "esbuild"
  }
}
```

**Resultado:**
- ✅ Archivos JS minificados con terser/esbuild
- ✅ Archivos CSS minificados
- ✅ Reporte de ahorro por archivo

### Compresión de Imágenes

Compresión automática de imágenes con **sharp**:

```json
{
  "standalone": {
    "imageCompression": true,
    "imageQuality": 80  // 0-100
  }
}
```

**Resultado:**
- ✅ Imágenes convertidas a WebP
- ✅ Compresión optimizada
- ✅ Reporte de ahorro por imagen

### Tree-shaking Avanzado

Tree-shaking automático durante la minificación:
- ✅ Eliminación de código no usado
- ✅ Optimización de imports
- ✅ Reducción de bundle size

## 🎨 Multi-target Builds (Fase 3) ✅

### Build de Tokens Independiente

Construye tokens como build independiente:

```json
{
  "standalone": {
    "targets": ["storybook", "components", "tokens"]
  }
}
```

**Resultado:**
```
dist/tokens/
├── tokens.json          # Tokens en formato JSON
├── tokens.css           # Tokens en formato CSS (minificado)
└── manifest.json        # Manifest de tokens
```

**Características:**
- ✅ Copia tokens.json y tokens.css
- ✅ Minificación automática de CSS
- ✅ Generación de manifest con metadata
- ✅ Conteo de tokens y categorías

## 🔮 Roadmap

### Fase 1: Mejoras Básicas ✅
- ✅ Build optimizado de Storybook
- ✅ Extracción básica de componentes
- ✅ Generación de manifest

### Fase 2: Optimizaciones Avanzadas ✅
- ✅ Minificación real con terser/esbuild
- ✅ Compresión de imágenes con sharp
- ✅ Tree-shaking avanzado
- ✅ Minificación de CSS

### Fase 3: Multi-target Builds ✅
- ✅ Build de tokens independiente
- ✅ Manifest de tokens
- ⏳ Build de componentes sin Storybook (Futuro)
- ⏳ Builds separados por target (Futuro)

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Compatibilidad**: Storybook v8.0.0+

