# 🧪 Jest Testing Add-on

Add-on funcional de **Jest** para Autorun que proporciona testing unitario.

## 🎯 Características

- ✅ **Ejecución de tests** - Ejecuta tests unitarios con Jest
- ✅ **Watch mode** - Modo watch para desarrollo
- ✅ **Coverage reports** - Reportes de cobertura de código
- ✅ **Configuración automática** - Genera configuración de Jest automáticamente
- ✅ **Múltiples entornos** - Soporte para Node.js y jsdom
- ✅ **Integración con Hub** - Hooks automáticos para tracking
- ✅ **Thresholds de coverage** - Configuración de umbrales mínimos

## 📦 Instalación

El add-on ya está incluido en Autorun. Necesitas instalar Jest en tu proyecto:

```bash
npm install --save-dev jest @types/jest
```

Para proyectos React/Vue:
```bash
npm install --save-dev jest @types/jest @testing-library/react @testing-library/jest-dom
```

## ⚙️ Configuración

Agrega la configuración de Jest en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "jest": {
          "testMatch": ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
          "testEnvironment": "node",
          "coverage": true,
          "coverageDirectory": "coverage",
          "coverageThreshold": {
            "global": {
              "branches": 80,
              "functions": 80,
              "lines": 80,
              "statements": 80
            }
          },
          "verbose": true,
          "watch": false,
          "bail": false,
          "testTimeout": 5000
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `testMatch` | `string[]` | Patrones de archivos de test | `['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']` |
| `testEnvironment` | `string` | Entorno de test (`node`, `jsdom`) | `node` |
| `coverage` | `boolean` | Generar reportes de cobertura | `false` |
| `coverageDirectory` | `string` | Directorio de reportes | `coverage` |
| `coverageThreshold` | `object` | Umbrales mínimos de cobertura | - |
| `verbose` | `boolean` | Salida detallada | `true` |
| `watch` | `boolean` | Modo watch | `false` |
| `bail` | `boolean` | Detener en primer error | `false` |
| `testTimeout` | `number` | Timeout de tests (ms) | `5000` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Jest
await hub.activateAddon('jest');
```

### Ejecutar Tests

```typescript
// Obtener servicio de Jest
const run = hub.getService('jest', 'run');

// Ejecutar todos los tests
const result = await run();

console.log(`Tests pasados: ${result.numPassedTests}`);
console.log(`Tests fallidos: ${result.numFailedTests}`);
console.log(`Total: ${result.numTotalTests}`);
```

### Ejecutar Test Específico

```typescript
const runTest = hub.getService('jest', 'runTest');

// Ejecutar un test específico
const result = await runTest('src/components/Button.test.tsx');
```

### Modo Watch

```typescript
const watch = hub.getService('jest', 'watch');

// Iniciar modo watch
const process = await watch();
// Los tests se ejecutan automáticamente cuando cambian los archivos

// Detener watch
const stop = hub.getService('jest', 'stop');
stop();
```

### Con Coverage

```typescript
const run = hub.getService('jest', 'run');

// Ejecutar tests con coverage
const result = await run({
  coverage: true,
  coverageDirectory: 'coverage'
});

if (result.coverage) {
  console.log(`Coverage: ${result.coverage.lines}% líneas`);
  console.log(`Branches: ${result.coverage.branches}%`);
  console.log(`Functions: ${result.coverage.functions}%`);
}
```

## 📝 Ejemplo de Test

**`src/components/Button.test.tsx`:**
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 🔌 Hooks Automáticos

El add-on de Jest se integra automáticamente con el Hub:

### `onTestRun`
Se llama cuando se ejecutan tests:
```typescript
// Automáticamente trackea resultados en Clarity (si está disponible)
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `run` | Ejecuta todos los tests | `(options?) => Promise<JestResult>` |
| `runTest` | Ejecuta un test específico | `(testPath: string, options?) => Promise<JestResult>` |
| `watch` | Inicia modo watch | `() => Promise<ChildProcess>` |
| `stop` | Detiene modo watch | `() => void` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración | `() => JestConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<JestConfig>)` |

## 📊 Coverage Thresholds

Configura umbrales mínimos de cobertura:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

Si el coverage está por debajo de los umbrales, Jest fallará.

## 📝 Ejemplos de Uso

### CI/CD Integration

```typescript
// En tu pipeline de CI/CD
const run = hub.getService('jest', 'run');

const result = await run({
  coverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
});

if (!result.success) {
  throw new Error(`Tests fallaron: ${result.numFailedTests} de ${result.numTotalTests}`);
}
```

### Desarrollo con Watch

```typescript
// Activar modo watch durante desarrollo
await hub.activateAddon('jest');

const watch = hub.getService('jest', 'watch');
await watch();
// Los tests se ejecutan automáticamente cuando cambias archivos
```

### Testing de Add-ons

```typescript
// Ejecutar tests de un add-on específico
const runTest = hub.getService('jest', 'runTest');

const result = await runTest('packages/addons/functional/clarity/**/*.test.ts', {
  testEnvironment: 'node'
});
```

## 🐛 Troubleshooting

### Error: "Jest no está instalado"

1. Instala Jest:
```bash
npm install --save-dev jest @types/jest
```

2. Verifica que esté en `package.json`

### Tests no se encuentran

1. Verifica que `testMatch` incluya tus archivos de test
2. Verifica que los archivos tengan extensión `.test.ts` o `.spec.ts`
3. Verifica que estén en los directorios correctos

### Coverage no se genera

1. Verifica que `coverage: true` esté configurado
2. Verifica que `collectCoverageFrom` incluya tus archivos
3. Verifica permisos de escritura en el directorio de coverage

### Watch mode no funciona

1. Verifica que no haya otro proceso de Jest ejecutándose
2. Verifica que los archivos estén siendo observados
3. Revisa los logs de Jest para errores

## 📚 Referencias

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest API](https://jestjs.io/docs/api)
- [Testing Library](https://testing-library.com/)

## 🔗 Integración con Otros Add-ons

Jest se integra automáticamente con:
- **Clarity Add-on**: Trackea resultados de tests
- **GitHub Add-on**: Puede ejecutar tests antes de commits
- **Vercel Add-on**: Puede ejecutar tests antes de deploy

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024


