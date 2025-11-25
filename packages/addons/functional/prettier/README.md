# 💅 Prettier Add-on

Add-on funcional de **Prettier** para Autorun que proporciona formateo automático de código.

## 🎯 Características

- ✅ **Formateo automático** - Formatea código automáticamente
- ✅ **Múltiples lenguajes** - Soporta JS, TS, JSON, CSS, Markdown, etc.
- ✅ **Configuración flexible** - Personaliza todas las opciones de formato
- ✅ **Pre-commit hooks** - Formateo automático antes de commits
- ✅ **Verificación de formato** - Verifica si archivos están formateados
- ✅ **Configuración automática** - Genera configuración básica si no existe

## 📦 Instalación

El add-on ya está incluido en Autorun. Necesitas instalar Prettier en tu proyecto:

```bash
npm install --save-dev prettier
```

**Nota**: Este proyecto usa **Biome** que incluye formateo. Este add-on es opcional si prefieres usar Prettier.

## ⚙️ Configuración

Agrega la configuración de Prettier en tu `.ubits/project-config.json`:

```json
{
  "autoframe": {
    "addons": {
      "config": {
        "prettier": {
          "semi": true,
          "singleQuote": true,
          "tabWidth": 2,
          "trailingComma": "es5",
          "printWidth": 80,
          "useTabs": false,
          "arrowParens": "always",
          "endOfLine": "lf"
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `semi` | `boolean` | Usar punto y coma | `true` |
| `singleQuote` | `boolean` | Usar comillas simples | `true` |
| `tabWidth` | `number` | Ancho de tabulación | `2` |
| `trailingComma` | `string` | Comas finales (`none`, `es5`, `all`) | `es5` |
| `printWidth` | `number` | Ancho máximo de línea | `80` |
| `useTabs` | `boolean` | Usar tabs en lugar de espacios | `false` |
| `arrowParens` | `string` | Paréntesis en arrow functions (`always`, `avoid`) | `always` |
| `endOfLine` | `string` | Tipo de fin de línea (`lf`, `crlf`, `cr`, `auto`) | `lf` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutoframeHub } from '@autoframe/core';

const hub = new AutoframeHub();
await hub.initialize();

// Activar Prettier
await hub.activateAddon('prettier');
```

### Formatear Archivos

```typescript
// Obtener servicio de formateo
const format = hub.getService('prettier', 'format');

// Formatear archivos específicos
const results = await format([
  'src/utils.ts',
  'src/components/Button.tsx'
]);

results.forEach(result => {
  if (result.formatted) {
    console.log(`✅ ${result.filePath} formateado`);
  }
});
```

### Verificar Formato

```typescript
const check = hub.getService('prettier', 'check');

// Verificar si archivos están formateados
const { formatted, unformatted } = await check(['src/**/*.ts']);

if (unformatted.length > 0) {
  console.log(`⚠️  ${unformatted.length} archivos sin formatear`);
  // Formatear automáticamente
  await format(unformatted);
}
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `format` | Formatea archivos | `(files: string[], options?) => Promise<PrettierResult[]>` |
| `check` | Verifica formato | `(files: string[], options?) => Promise<CheckResult>` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración | `() => PrettierConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<PrettierConfig>)` |

## 🔌 Hooks Automáticos

El add-on de Prettier se integra automáticamente con el Hub:

### `onFileChange`
Se llama cuando un archivo cambia:
```typescript
// Automáticamente formatea archivos soportados
```

### `onBeforeCommit`
Se llama antes de hacer commit:
```typescript
// Automáticamente formatea archivos antes de commit
```

## 📝 Ejemplos de Uso

### Pre-commit Hook

```typescript
// Configurar formateo antes de commit
await hub.activateAddon('prettier');

// Cuando hagas commit, Prettier formatea automáticamente
const commit = hub.getService('github', 'commit');
await commit(['src/utils.ts'], 'Actualización');
// Prettier formatea automáticamente antes del commit
```

### CI/CD Integration

```typescript
// En tu pipeline de CI/CD
const check = hub.getService('prettier', 'check');

const { unformatted } = await check(['src/**/*.{ts,tsx}']);

if (unformatted.length > 0) {
  throw new Error(`Archivos sin formatear: ${unformatted.join(', ')}`);
}
```

## 🐛 Troubleshooting

### Error: "Prettier no está instalado"

1. Instala Prettier:
```bash
npm install --save-dev prettier
```

2. Verifica que esté en `package.json`

### Formateo no funciona

1. Verifica que Prettier esté instalado
2. Verifica que los archivos tengan extensiones soportadas
3. Revisa la configuración de Prettier

## 📚 Referencias

- [Prettier Documentation](https://prettier.io/docs/en/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## 🔗 Integración con Otros Add-ons

Prettier se integra automáticamente con:
- **GitHub Add-on**: Formateo antes de commits
- **ESLint Add-on**: Puede ejecutarse después de ESLint

**Nota**: Este proyecto usa **Biome** que incluye formateo y linting. Este add-on es opcional si prefieres usar Prettier.

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024

