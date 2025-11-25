# 🔍 Lighthouse Audit Add-on

Add-on funcional de **Lighthouse** para Autorun que proporciona auditorías de performance, accesibilidad, SEO y best practices.

## 🎯 Características

- ✅ **Auditoría de Performance** - Métricas Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- ✅ **Auditoría de Accesibilidad** - Verificación de estándares WCAG
- ✅ **Auditoría de SEO** - Análisis de optimización para motores de búsqueda
- ✅ **Best Practices** - Verificación de mejores prácticas web
- ✅ **Reportes HTML/JSON** - Reportes detallados y exportables
- ✅ **Auditoría múltiple** - Ejecutar auditorías en múltiples URLs
- ✅ **Comparación de resultados** - Comparar antes/después de cambios
- ✅ **Integración automática** - Auditoría automática después de deploy

## 📦 Instalación

El add-on ya está incluido en Autorun. Necesitas instalar Lighthouse en tu proyecto:

```bash
npm install --save-dev lighthouse
```

**Nota**: Lighthouse requiere Chrome/Chromium instalado en el sistema.

## ⚙️ Configuración

Agrega la configuración de Lighthouse en tu `.ubits/project-config.json`:

```json
{
  "autoframe": {
    "addons": {
      "config": {
        "lighthouse": {
          "port": 9222,
          "chromeFlags": ["--headless", "--no-sandbox"],
          "output": "html",
          "outputPath": "lighthouse-reports",
          "categories": ["performance", "accessibility", "best-practices", "seo"],
          "emulatedFormFactor": "mobile",
          "locale": "es",
          "throttling": {
            "rttMs": 150,
            "throughputKbps": 1638.4,
            "cpuSlowdownMultiplier": 4
          }
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `port` | `number` | Puerto de Chrome | `9222` |
| `chromeFlags` | `string[]` | Flags de Chrome | `['--headless', '--no-sandbox']` |
| `output` | `string` | Formato de salida (`html`, `json`, `csv`) | `html` |
| `outputPath` | `string` | Directorio de reportes | `lighthouse-reports` |
| `categories` | `string[]` | Categorías a auditar | `['performance', 'accessibility', 'best-practices', 'seo']` |
| `emulatedFormFactor` | `string` | Dispositivo emulado (`mobile`, `desktop`, `none`) | `mobile` |
| `locale` | `string` | Idioma del reporte | `es` |
| `throttling` | `object` | Configuración de throttling | - |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutoframeHub } from '@autoframe/core';

const hub = new AutoframeHub();
await hub.initialize();

// Activar Lighthouse
await hub.activateAddon('lighthouse');
```

### Ejecutar Auditoría

```typescript
// Obtener servicio de auditoría
const audit = hub.getService('lighthouse', 'audit');

// Ejecutar auditoría en una URL
const result = await audit('https://example.com');

console.log('Performance:', result.performance);
console.log('Accessibility:', result.accessibility);
console.log('SEO:', result.seo);
console.log('Reporte:', result.report);
```

### Auditoría Múltiple

```typescript
const auditMultiple = hub.getService('lighthouse', 'auditMultiple');

// Ejecutar auditoría en múltiples URLs
const results = await auditMultiple([
  'https://example.com',
  'https://example.com/about',
  'https://example.com/contact'
]);

results.forEach(result => {
  console.log(`${result.url}: ${result.performance}% performance`);
});
```

### Comparar Resultados

```typescript
const compareResults = hub.getService('lighthouse', 'compareResults');

// Ejecutar auditoría antes de cambios
const before = await audit('https://example.com');

// ... hacer cambios ...

// Ejecutar auditoría después de cambios
const after = await audit('https://example.com');

// Comparar resultados
const comparison = compareResults(before, after);

console.log('Mejora de performance:', comparison.performance);
console.log('Mejoró:', comparison.improved);
```

### Opciones de Auditoría

```typescript
// Auditoría solo de performance
const result = await audit('https://example.com', {
  categories: ['performance'],
  emulatedFormFactor: 'desktop'
});

// Auditoría con throttling personalizado
const result = await audit('https://example.com', {
  throttling: {
    rttMs: 200,
    throughputKbps: 1000,
    cpuSlowdownMultiplier: 2
  }
});

// Reporte en JSON
const result = await audit('https://example.com', {
  output: 'json',
  outputPath: 'reports'
});
```

## 🔌 Hooks Automáticos

El add-on de Lighthouse se integra automáticamente con el Hub:

### `onAfterDeploy`
Se llama después de hacer deploy:
```typescript
// Automáticamente ejecuta auditoría después de deploy
// Trackea resultados en Clarity (si está disponible)
```

## 📊 Core Web Vitals

Lighthouse mide los Core Web Vitals:

- **LCP (Largest Contentful Paint)** - Tiempo de carga del contenido principal
- **FID (First Input Delay)** - Tiempo hasta la primera interacción
- **CLS (Cumulative Layout Shift)** - Estabilidad visual
- **FCP (First Contentful Paint)** - Tiempo hasta el primer contenido
- **TTFB (Time to First Byte)** - Tiempo de respuesta del servidor

```typescript
const result = await audit('https://example.com');

console.log('LCP:', result.coreWebVitals.lcp, 'ms');
console.log('FID:', result.coreWebVitals.fid, 'ms');
console.log('CLS:', result.coreWebVitals.cls);
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `audit` | Ejecuta auditoría en una URL | `(url: string, options?) => Promise<LighthouseResult>` |
| `auditMultiple` | Ejecuta auditoría en múltiples URLs | `(urls: string[], options?) => Promise<LighthouseResult[]>` |
| `compareResults` | Compara dos resultados | `(before: LighthouseResult, after: LighthouseResult) => Comparison` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración actual | `() => LighthouseConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<LighthouseConfig>)` |

## 📝 Ejemplos de Uso

### Auditoría Automática después de Deploy

```typescript
// Configurar Lighthouse
await hub.activateAddon('lighthouse');

// Cuando hagas deploy con Vercel, Lighthouse ejecuta auditoría automáticamente
const deploy = hub.getService('vercel', 'deploy');
await deploy({ target: 'production' });
// Lighthouse ejecuta auditoría automáticamente después del deploy
```

### CI/CD Integration

```typescript
// En tu pipeline de CI/CD
const audit = hub.getService('lighthouse', 'audit');

const result = await audit(process.env.DEPLOYMENT_URL, {
  output: 'json',
  categories: ['performance']
});

// Fallar si performance es menor a 80
if (result.performance < 80) {
  throw new Error(`Performance score ${result.performance} es menor a 80`);
}
```

### Monitoreo Continuo

```typescript
// Ejecutar auditorías periódicamente
const urls = [
  'https://example.com',
  'https://example.com/products',
  'https://example.com/about'
];

setInterval(async () => {
  const results = await auditMultiple(urls);
  
  // Enviar resultados a un servicio de monitoreo
  results.forEach(result => {
    console.log(`${result.url}: ${result.performance}%`);
  });
}, 3600000); // Cada hora
```

## 🐛 Troubleshooting

### Error: "Lighthouse no está instalado"

1. Instala Lighthouse:
```bash
npm install --save-dev lighthouse
```

2. Verifica que Chrome/Chromium esté instalado

### Error: "Chrome no encontrado"

1. Instala Chrome o Chromium
2. O configura la ruta de Chrome:
```json
{
  "lighthouse": {
    "chromeFlags": ["--headless", "--no-sandbox", "--chrome-executable=/path/to/chrome"]
  }
}
```

### Auditoría muy lenta

1. Usa throttling menos agresivo
2. Ejecuta solo categorías necesarias
3. Usa `emulatedFormFactor: 'desktop'` para auditorías más rápidas

### Reportes no se generan

1. Verifica que el directorio de salida tenga permisos de escritura
2. Verifica que haya espacio en disco suficiente
3. Revisa los logs de error

## 📚 Referencias

- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Lighthouse Scoring Guide](https://developer.chrome.com/docs/lighthouse/performance/scoring/)
- [Core Web Vitals](https://web.dev/vitals/)

## 🔗 Integración con Otros Add-ons

Lighthouse se integra automáticamente con:
- **Vercel Add-on**: Auditoría automática después de deploy
- **Clarity Add-on**: Trackea resultados de auditorías
- **GitHub Add-on**: Puede commitear reportes automáticamente

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024

