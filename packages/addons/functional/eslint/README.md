# 🔍 ESLint Add-on

Add-on funcional de **ESLint** para Autorun que proporciona linting automático de código.

## 🎯 Características

- ✅ **Linting automático** - Verifica código por errores y problemas
- ✅ **Auto-fix** - Corrige errores automáticamente cuando es posible
- ✅ **Múltiples formatos** - Reportes en stylish, compact, JSON, HTML
- ✅ **Pre-commit hooks** - Linting automático antes de commits
- ✅ **Configuración automática** - Genera configuración básica si no existe
- ✅ **Múltiples extensiones** - Soporta JS, JSX, TS, TSX

## 📦 Instalación

El add-on ya está incluido en Autorun. Necesitas instalar ESLint en tu proyecto:

```bash
npm install --save-dev eslint
```

Para TypeScript:
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Para React:
```bash
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks
```

## ⚙️ Configuración

Agrega la configuración de ESLint en tu `.ubits/project-config.json`:

```json
{
  "autoframe": {
    "addons": {
      "config": {
        "eslint": {
          "configFile": ".eslintrc.json",
          "extensions": [".js", ".jsx", ".ts", ".tsx"],
          "fix": false,
          "format": "stylish",
          "maxWarnings": 0,
          "ignorePath": ".eslintignore"
        }
      }
    }
  }
}
```

**Nota**: Este proyecto usa **Biome** en lugar de ESLint. Este add-on es opcional.

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutoframeHub } from '@autoframe/core';

const hub = new AutoframeHub();
await hub.initialize();

// Activar ESLint
await hub.activateAddon('eslint');
```

### Lintear Archivos

```typescript
// Obtener servicio de linting
const lint = hub.getService('eslint', 'lint');

// Lintear archivos específicos
const report = await lint([
  'src/utils.ts',
  'src/components/Button.tsx'
]);

console.log(`Errores: ${report.errorCount}`);
console.log(`Warnings: ${report.warningCount}`);

// Ver resultados por archivo
report.results.forEach(result => {
  if (result.errorCount > 0) {
    console.log(`${result.filePath}:`);
    result.messages.forEach(msg => {
      console.log(`  ${msg.line}:${msg.column} - ${msg.message}`);
    });
  }
});
```

### Auto-fix

```typescript
const fix = hub.getService('eslint', 'fix');

// Corregir errores automáticamente
const report = await fix(['src/utils.ts']);

console.log(`Errores corregidos: ${report.fixableErrorCount}`);
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `lint` | Lintea archivos | `(files: string[], options?) => Promise<ESLintReport>` |
| `fix` | Auto-fix de errores | `(files: string[], options?) => Promise<ESLintReport>` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración | `() => ESLintConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<ESLintConfig>)` |

## 🔌 Hooks Automáticos

El add-on de ESLint se integra automáticamente con el Hub:

### `onFileChange`
Se llama cuando un archivo cambia:
```typescript
// Automáticamente lintea archivos soportados
```

### `onBeforeCommit`
Se llama antes de hacer commit:
```typescript
// Automáticamente lintea archivos antes de commit
```

## 📝 Ejemplos de Uso

### Pre-commit Hook

```typescript
// Configurar linting antes de commit
await hub.activateAddon('eslint');

// Cuando hagas commit con GitHub add-on, ESLint se ejecuta automáticamente
const commit = hub.getService('github', 'commit');
await commit(['src/utils.ts'], 'Actualización');
// ESLint se ejecuta automáticamente antes del commit
```

### CI/CD Integration

```typescript
// En tu pipeline de CI/CD
const lint = hub.getService('eslint', 'lint');

const report = await lint(['src/**/*.{ts,tsx}'], {
  format: 'json',
  maxWarnings: 0
});

if (report.errorCount > 0) {
  throw new Error(`ESLint encontró ${report.errorCount} errores`);
}
```

## 🐛 Troubleshooting

### Error: "ESLint no está instalado"

1. Instala ESLint:
```bash
npm install --save-dev eslint
```

2. Verifica que esté en `package.json`

### Configuración no se genera

1. Verifica permisos de escritura en el directorio del proyecto
2. Verifica que no exista ya una configuración de ESLint
3. Revisa los logs para errores

### Auto-fix no funciona

1. Verifica que `fix: true` esté configurado
2. Algunos errores no son auto-fixables
3. Revisa la configuración de ESLint

## 📚 Referencias

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [TypeScript ESLint](https://typescript-eslint.io/)

## 🔗 Integración con Otros Add-ons

ESLint se integra automáticamente con:
- **GitHub Add-on**: Linting antes de commits
- **JEST Add-on**: Puede ejecutar linting antes de tests
- **Vercel Add-on**: Puede ejecutar linting antes de deploy

**Nota**: Este proyecto usa **Biome** que incluye linting y formateo. Este add-on es opcional si prefieres usar ESLint.

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024

