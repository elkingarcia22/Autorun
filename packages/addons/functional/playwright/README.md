# 🧪 Playwright Add-on

Add-on funcional de **Playwright** para Autorun que proporciona testing end-to-end (E2E).

## 🎯 Características

- ✅ **Testing E2E** - Tests end-to-end con Playwright
- ✅ **Ejecución automática** - Ejecuta tests antes de deploy
- ✅ **Generación de reportes** - Reportes HTML de resultados
- ✅ **Instalación automática** - Instala navegadores automáticamente
- ✅ **Configuración flexible** - Configuración completa de Playwright
- ✅ **Integración con CI/CD** - Ejecuta tests en pipelines
- ✅ **Múltiples navegadores** - Soporte para Chromium, Firefox, WebKit
- ✅ **Screenshots y videos** - Captura automática en fallos
- ✅ **Traces** - Traces para debugging

## 📦 Instalación

El add-on ya está incluido en Autorun. Para usar Playwright, instala la dependencia:

```bash
npm install --save-dev @playwright/test
```

Luego instala los navegadores:

```bash
npx playwright install
```

## ⚙️ Configuración

Agrega la configuración de Playwright en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "playwright": {
          "enabled": true,
          "testDir": "tests/e2e",
          "outputDir": "test-results",
          "timeout": 30000,
          "retries": 0,
          "workers": 1,
          "use": {
            "baseURL": "http://localhost:3000",
            "viewport": { "width": 1280, "height": 720 },
            "screenshot": "only-on-failure",
            "video": "retain-on-failure",
            "trace": "on-first-retry"
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
| `enabled` | `boolean` | Habilitar Playwright | `true` |
| `testDir` | `string` | Directorio de tests | `tests/e2e` |
| `outputDir` | `string` | Directorio de resultados | `test-results` |
| `timeout` | `number` | Timeout por test (ms) | `30000` |
| `retries` | `number` | Reintentos en fallos | `0` |
| `workers` | `number` | Número de workers | `1` |
| `use.baseURL` | `string` | URL base para tests | `http://localhost:3000` |
| `use.viewport` | `object` | Tamaño de viewport | `{ width: 1280, height: 720 }` |
| `use.screenshot` | `string` | Cuándo capturar screenshots | `only-on-failure` |
| `use.video` | `string` | Cuándo grabar videos | `retain-on-failure` |
| `use.trace` | `string` | Cuándo generar traces | `on-first-retry` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Playwright
await hub.activateAddon('playwright');
```

### Ejecutar Tests

```typescript
// Obtener servicio de Playwright
const runTests = hub.getService('playwright', 'runTests');

// Ejecutar todos los tests
const result = await runTests();

if (result.success) {
  console.log('✅ Todos los tests pasaron');
} else {
  console.error('❌ Tests fallaron:', result.error);
}

// Ejecutar con opciones
const result2 = await runTests({
  headed: false,      // Ejecutar headless
  ui: false,          // Sin UI mode
  project: 'chromium', // Solo Chromium
  workers: 2          // 2 workers paralelos
});
```

### Generar Reporte

```typescript
// Generar reporte HTML
const generateReport = hub.getService('playwright', 'generateReport');
const reportPath = await generateReport();

if (reportPath) {
  console.log(`📊 Reporte disponible en: ${reportPath}`);
}
```

### Instalar Navegadores

```typescript
// Instalar navegadores de Playwright
const installBrowsers = hub.getService('playwright', 'installBrowsers');
await installBrowsers();
```

## 🔄 Flujo Automático

### Tests Antes de Deploy

El add-on ejecuta tests automáticamente antes de cada deploy:

```typescript
await hub.activateAddon('playwright');
await hub.activateAddon('vercel');

// Trigger deploy
await hub.triggerEvent('beforeDeploy');
// Playwright ejecutará tests automáticamente
// Si los tests fallan, el deploy se cancela
```

## 📝 Estructura de Tests

Después de inicializar, tendrás:

```
tests/e2e/
├── example.spec.ts    # Test de ejemplo
└── ...

playwright.config.ts  # Configuración de Playwright
test-results/         # Resultados de tests
```

### Ejemplo de Test

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Autorun/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Add-ons');
  await expect(page).toHaveURL(/.*addons/);
});
```

## 🔗 Integración con Otros Add-ons

### Vercel Add-on

Tests automáticos antes de deploy:

```typescript
await hub.activateAddon('playwright');
await hub.activateAddon('vercel');

// Deploy automático con tests
await hub.triggerEvent('beforeDeploy');
// Tests se ejecutan antes del deploy
```

### GitHub Add-on

Commit de resultados de tests:

```typescript
hub.on('afterPlaywrightTests', async (testResult) => {
  if (testResult.reportPath) {
    await hub.getService('github', 'commit')({
      message: 'test: update test results',
      files: [testResult.reportPath]
    });
  }
});
```

## 📊 Ejemplo Completo

### Configuración Completa

```json
{
  "autorun": {
    "addons": {
      "active": ["playwright", "vercel"],
      "config": {
        "playwright": {
          "enabled": true,
          "testDir": "tests/e2e",
          "outputDir": "test-results",
          "timeout": 30000,
          "retries": 1,
          "workers": 2,
          "use": {
            "baseURL": "http://localhost:3000",
            "viewport": { "width": 1280, "height": 720 },
            "screenshot": "only-on-failure",
            "video": "retain-on-failure",
            "trace": "on-first-retry"
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
await hub.activateAddon('playwright');
await hub.activateAddon('vercel');

// Ejecutar tests manualmente
const runTests = hub.getService('playwright', 'runTests');
const result = await runTests({
  headed: false,
  workers: 2
});

if (result.success) {
  console.log('✅ Tests pasaron');
  
  // Generar reporte
  const generateReport = hub.getService('playwright', 'generateReport');
  const reportPath = await generateReport();
  console.log(`📊 Reporte: ${reportPath}`);
  
  // Deploy
  await hub.triggerEvent('beforeDeploy');
} else {
  console.error('❌ Tests fallaron, deploy cancelado');
}
```

## 🎯 Casos de Uso

### Caso 1: Tests en CI/CD

```typescript
// En CI/CD, ejecutar tests antes de deploy
hub.on('beforeDeploy', async () => {
  const runTests = hub.getService('playwright', 'runTests');
  const result = await runTests({
    workers: 4,
    retries: 1
  });
  
  if (!result.success) {
    throw new Error('Tests fallaron');
  }
});
```

### Caso 2: Tests Locales

```typescript
// Ejecutar tests localmente con UI
const runTests = hub.getService('playwright', 'runTests');
await runTests({
  ui: true,
  headed: true
});
```

### Caso 3: Tests en Múltiples Navegadores

```typescript
// Configurar múltiples proyectos
await hub.configureAddon('playwright', {
  projects: [
    { name: 'chromium' },
    { name: 'firefox' },
    { name: 'webkit' }
  ]
});

// Ejecutar en todos los navegadores
const runTests = hub.getService('playwright', 'runTests');
await runTests();
```

## 🐛 Troubleshooting

### Playwright no está instalado

1. Instala Playwright: `npm install --save-dev @playwright/test`
2. Instala navegadores: `npx playwright install`
3. Reinicia el Hub

### Tests no se ejecutan

1. Verifica que `enabled` está en `true`
2. Verifica que el directorio de tests existe
3. Verifica que `baseURL` es correcta
4. Revisa los logs para errores

### Navegadores no se encuentran

1. Ejecuta `npx playwright install`
2. Verifica que los navegadores están instalados
3. Revisa la configuración de `projects`

## 📚 Referencias

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API](https://playwright.dev/docs/api/class-playwright)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Compatibilidad**: Vercel, GitHub, CI/CD

