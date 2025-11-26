# 📊 Bundle Analyzer Add-on

Add-on funcional de **Bundle Analyzer** para Autorun que proporciona análisis visual de bundles y optimización.

## 🎯 Características

- ✅ **Análisis de bundles de Storybook** - Analiza el build completo de Storybook
- ✅ **Análisis de componentes** - Analiza componentes extraídos por Standalone Mode
- ✅ **Análisis de tokens** - Analiza bundles de tokens (opcional)
- ✅ **Identificación de dependencias** - Detecta dependencias grandes y duplicadas
- ✅ **Detección de código duplicado** - Encuentra dependencias duplicadas entre bundles
- ✅ **Generación de reportes visuales** - Reportes HTML y JSON
- ✅ **Recomendaciones automáticas** - Sugerencias de optimización basadas en el análisis
- ✅ **Thresholds configurables** - Warnings y errores basados en tamaño
- ✅ **Integración automática** - Se ejecuta después de builds y deploys
- ✅ **Estimación de tamaño gzipped** - Calcula tamaño comprimido aproximado

## 📦 Instalación

El add-on ya está incluido en Autorun. Para funcionalidades avanzadas, instala dependencias opcionales:

```bash
# Para análisis avanzado con webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

# Para análisis de Rollup
npm install --save-dev rollup-plugin-visualizer
```

**Nota:** El add-on funcionará sin estas dependencias, pero con funcionalidades básicas.

## ⚙️ Configuración

Agrega la configuración de Bundle Analyzer en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "bundle-analyzer": {
          "analyzeStorybook": true,
          "analyzeComponents": true,
          "analyzeTokens": false,
          "outputDir": "dist/bundle-analysis",
          "format": "all",
          "openBrowser": false,
          "generateReport": true,
          "threshold": {
            "warning": 500,
            "error": 1000
          },
          "exclude": ["node_modules", ".git"]
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `analyzeStorybook` | `boolean` | Analizar build de Storybook | `true` |
| `analyzeComponents` | `boolean` | Analizar componentes extraídos | `true` |
| `analyzeTokens` | `boolean` | Analizar tokens | `false` |
| `outputDir` | `string` | Directorio de salida para reportes | `dist/bundle-analysis` |
| `format` | `string` | Formato de reporte (`html`, `json`, `all`) | `all` |
| `openBrowser` | `boolean` | Abrir navegador automáticamente | `false` |
| `generateReport` | `boolean` | Generar reporte visual | `true` |
| `threshold.warning` | `number` | Tamaño en KB para warning | `500` |
| `threshold.error` | `number` | Tamaño en KB para error | `1000` |
| `exclude` | `string[]` | Directorios/archivos a excluir | `["node_modules", ".git"]` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Bundle Analyzer
await hub.activateAddon('bundle-analyzer');
```

### Análisis Manual

```typescript
// Obtener servicio de análisis
const analyze = hub.getService('bundle-analyzer', 'analyze');

// Ejecutar análisis completo
const result = await analyze({
  analyzeStorybook: true,
  analyzeComponents: true,
  generateReport: true
});

console.log('Análisis completado:', result.success);
console.log('Total de bundles:', result.bundles.length);
console.log('Tamaño total:', (result.totalSize / (1024 * 1024)).toFixed(2), 'MB');
console.log('Bundles más grandes:', result.largestBundles);
console.log('Warnings:', result.warnings);
console.log('Errores:', result.errors);
console.log('Recomendaciones:', result.recommendations);
console.log('Reporte:', result.reportPath);
```

### Análisis Automático (Recomendado)

El add-on se ejecuta automáticamente después de cada deploy:

```typescript
// Activar add-ons necesarios
await hub.activateAddon('storybook');
await hub.activateAddon('standalone');
await hub.activateAddon('bundle-analyzer');
await hub.activateAddon('vercel');

// Trigger deploy (análisis se ejecuta automáticamente después)
await hub.triggerEvent('afterDeploy');

// El sistema automáticamente:
// 1. Build de Storybook (Standalone Mode)
// 2. Deploy a Vercel
// 3. Análisis de bundles (Bundle Analyzer)
// 4. Generación de reporte
```

## 🔌 Integración con Standalone Mode

Bundle Analyzer se integra perfectamente con Standalone Mode:

```typescript
// Flujo completo optimizado
await hub.activateAddon('storybook');
await hub.activateAddon('standalone');
await hub.activateAddon('bundle-analyzer');

// Build standalone
const build = hub.getService('standalone', 'build');
const buildResult = await build({
  optimizeStorybookBuild: true,
  extractComponents: true
});

// Analizar bundles generados
const analyze = hub.getService('bundle-analyzer', 'analyze');
const analysisResult = await analyze({
  analyzeStorybook: true,
  analyzeComponents: true
});

// Usar recomendaciones para optimizar
if (analysisResult.recommendations) {
  analysisResult.recommendations.forEach(rec => {
    console.log('💡', rec);
  });
}
```

## 📊 Resultado del Análisis

Después de ejecutar un análisis, obtendrás:

```
dist/bundle-analysis/
├── bundle-analysis.json    # Reporte JSON completo
└── bundle-analysis.html    # Reporte HTML visual
```

### Estructura del Reporte JSON

```json
{
  "generatedAt": "2024-12-XX",
  "totalBundles": 15,
  "totalSize": 5242880,
  "totalGzippedSize": 1572864,
  "largestBundles": [
    {
      "name": "storybook-main.js",
      "size": 1048576,
      "sizeKB": "1024.00",
      "gzippedSize": 314572,
      "dependencies": ["react", "react-dom", "storybook"]
    }
  ],
  "warnings": [
    "Bundle \"storybook-main.js\" es grande: 1024.00 KB (advertencia: 500 KB)"
  ],
  "errors": [],
  "recommendations": [
    "Considera code splitting para: storybook-main.js",
    "Bundles con muchas dependencias: storybook-main.js. Considera tree-shaking."
  ],
  "allBundles": [...]
}
```

## 🎯 Casos de Uso

### Caso 1: Análisis Post-Build

```typescript
// Después de cada build, analizar bundles
hub.on('afterStandaloneBuild', async (buildInfo) => {
  const analyze = hub.getService('bundle-analyzer', 'analyze');
  const result = await analyze();
  
  if (result.errors.length > 0) {
    console.error('❌ Bundles muy grandes detectados!');
    // Notificar o fallar el build
  }
});
```

### Caso 2: Optimización Continua

```typescript
// Analizar y optimizar iterativamente
const analyze = hub.getService('bundle-analyzer', 'analyze');
const result = await analyze();

// Aplicar recomendaciones
if (result.recommendations) {
  // Implementar code splitting
  // Aplicar tree-shaking
  // Optimizar imports
}
```

### Caso 3: CI/CD Integration

```typescript
// En CI/CD, fallar si bundles son muy grandes
const result = await analyze({
  threshold: {
    warning: 500,
    error: 1000
  }
});

if (result.errors.length > 0) {
  throw new Error('Bundles exceden el tamaño máximo permitido');
}
```

## 🔗 Integración con Otros Add-ons

### Standalone Mode

Bundle Analyzer complementa Standalone Mode:

```typescript
// Build optimizado + Análisis
await hub.activateAddon('standalone');
await hub.activateAddon('bundle-analyzer');

const buildResult = await hub.getService('standalone', 'build')();
const analysisResult = await hub.getService('bundle-analyzer', 'analyze')();

// Comparar tamaños antes/después de optimización
console.log('Tamaño original:', buildResult.optimizations?.originalSize);
console.log('Tamaño optimizado:', buildResult.optimizations?.optimizedSize);
console.log('Análisis detallado:', analysisResult.bundles);
```

### Vercel Add-on

Análisis automático después de deploy:

```typescript
// Deploy + Análisis automático
await hub.activateAddon('vercel');
await hub.activateAddon('bundle-analyzer');

// El análisis se ejecuta automáticamente después del deploy
await hub.triggerEvent('afterDeploy');
```

### GitHub Add-on

Commit de reportes de análisis:

```typescript
hub.on('afterBundleAnalysis', async (analysisResult) => {
  if (analysisResult.reportPath) {
    await hub.getService('github', 'commit')({
      message: 'chore: bundle analysis report',
      files: [analysisResult.reportPath]
    });
  }
});
```

## 📝 Ejemplo Completo

### Configuración Completa

```json
{
  "autorun": {
    "addons": {
      "active": ["storybook", "standalone", "bundle-analyzer", "vercel"],
      "config": {
        "standalone": {
          "optimizeStorybookBuild": true,
          "extractComponents": true,
          "targets": ["storybook", "components"]
        },
        "bundle-analyzer": {
          "analyzeStorybook": true,
          "analyzeComponents": true,
          "generateReport": true,
          "threshold": {
            "warning": 500,
            "error": 1000
          }
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
await hub.activateAddon('bundle-analyzer');

// Build y análisis
const buildService = hub.getService('standalone', 'build');
const buildResult = await buildService({
  optimizeStorybookBuild: true,
  extractComponents: true
});

const analyzeService = hub.getService('bundle-analyzer', 'analyze');
const analysisResult = await analyzeService({
  analyzeStorybook: true,
  analyzeComponents: true,
  generateReport: true
});

// Mostrar resultados
console.log('📊 Análisis de Bundles:');
console.log(`   Total: ${analysisResult.bundles.length} bundles`);
console.log(`   Tamaño: ${(analysisResult.totalSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`   Gzipped: ${analysisResult.totalGzippedSize ? (analysisResult.totalGzippedSize / (1024 * 1024)).toFixed(2) : 'N/A'} MB`);

if (analysisResult.largestBundles.length > 0) {
  console.log('\n📦 Bundles Más Grandes:');
  analysisResult.largestBundles.forEach(bundle => {
    console.log(`   ${bundle.name}: ${(bundle.size / 1024).toFixed(2)} KB`);
  });
}

if (analysisResult.recommendations && analysisResult.recommendations.length > 0) {
  console.log('\n💡 Recomendaciones:');
  analysisResult.recommendations.forEach(rec => {
    console.log(`   - ${rec}`);
  });
}

if (analysisResult.reportPath) {
  console.log(`\n📄 Reporte disponible en: ${analysisResult.reportPath}`);
}
```

## 🐛 Troubleshooting

### No se encuentran bundles

1. Verifica que Standalone Mode haya generado los builds
2. Verifica las rutas de configuración (`storybookBuildDir`, `componentsOutputDir`)
3. Revisa los logs para errores de acceso a archivos

### Reporte no se genera

1. Verifica que `generateReport` esté en `true`
2. Verifica que el directorio `outputDir` sea escribible
3. Revisa los logs para errores de escritura

### Análisis muy lento

1. Excluye directorios grandes en `exclude`
2. Desactiva análisis de tokens si no es necesario
3. Usa análisis incremental (solo bundles nuevos)

## 📚 Referencias

- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)
- [Bundle Size Optimization](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Compatibilidad**: Standalone Mode, Storybook, Vercel

