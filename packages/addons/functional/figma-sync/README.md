# 🎨 Figma Sync Add-on

Add-on funcional de **Figma Sync** para Autorun que proporciona sincronización de tokens y componentes desde Figma.

## 🎯 Características

- ✅ **Sincronización de tokens** - Sincroniza tokens de diseño desde Figma
- ✅ **Comparación inteligente** - Compara tokens de Figma vs proyecto
- ✅ **Actualización automática** - Actualiza tokens automáticamente
- ✅ **Backup automático** - Crea backups antes de sincronizar
- ✅ **Modos de sincronización** - Full, selective o manual
- ✅ **Mapeo personalizado** - Configuración de mapeo de tokens
- ✅ **Reportes detallados** - Genera reportes de sincronización
- ✅ **Auto-sync** - Sincronización automática cuando cambian tokens de Figma

## 📦 Instalación

El add-on ya está incluido en Autorun. No requiere dependencias adicionales.

## ⚙️ Configuración

Agrega la configuración de Figma Sync en tu `.ubits/project-config.json`:

```json
{
  "autoframe": {
    "addons": {
      "config": {
        "figma-sync": {
          "figmaTokensPath": "../tokens",
          "projectTokensPath": "packages/tokens/tokens.json",
          "autoSync": false,
          "backupBeforeSync": true,
          "syncMode": "selective",
          "tokenMapping": {
            "figma.light.color.accent.brand": "light.brand.ubits-accent-brand",
            "figma.dark.color.accent.brand": "dark.brand.ubits-accent-brand"
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
| `figmaTokensPath` | `string` | Ruta a tokens de Figma | `../tokens` |
| `projectTokensPath` | `string` | Ruta a tokens del proyecto | `packages/tokens/tokens.json` |
| `autoSync` | `boolean` | Sincronización automática | `false` |
| `backupBeforeSync` | `boolean` | Crear backup antes de sync | `true` |
| `syncMode` | `string` | Modo de sync (`full`, `selective`, `manual`) | `selective` |
| `tokenMapping` | `object` | Mapeo personalizado de tokens | `{}` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutoframeHub } from '@autoframe/core';

const hub = new AutoframeHub();
await hub.initialize();

// Activar Figma Sync
await hub.activateAddon('figma-sync');
```

### Comparar Tokens

```typescript
// Obtener servicio de comparación
const compare = hub.getService('figma-sync', 'compare');

// Comparar tokens de Figma con proyecto
const comparison = await compare();

console.log(`Tokens sincronizados: ${comparison.synced.length}`);
console.log(`Tokens diferentes: ${comparison.different.length}`);
console.log(`Tokens faltantes: ${comparison.missing.length}`);
console.log(`Tokens extra: ${comparison.extra.length}`);
```

### Sincronizar Tokens

```typescript
// Obtener servicio de sincronización
const sync = hub.getService('figma-sync', 'sync');

// Sincronización selectiva (solo tokens conocidos)
const result = await sync({
  mode: 'selective',
  updateDifferent: true,
  addMissing: true,
  removeExtra: false
});

console.log(`Tokens actualizados: ${result.tokensUpdated}`);
console.log(`Tokens agregados: ${result.tokensAdded}`);
console.log(`Reporte: ${result.reportPath}`);
```

### Modos de Sincronización

#### Selective (Recomendado)
Solo sincroniza tokens conocidos y mapeados:
```typescript
const result = await sync({
  mode: 'selective',
  updateDifferent: true,
  addMissing: true
});
```

#### Full
Sincroniza todos los tokens, incluyendo remover tokens extra:
```typescript
const result = await sync({
  mode: 'full',
  updateDifferent: true,
  addMissing: true,
  removeExtra: true
});
```

#### Manual
Solo compara, no actualiza nada:
```typescript
const comparison = await compare();
// Revisar comparison y decidir qué actualizar manualmente
```

## 📊 Estructura de Tokens de Figma

El add-on espera tokens de Figma en la siguiente estructura:

```
tokens/
├── p-colors/
│   └── Mode 1.json          # Valores primitivos/base
├── s-colors/
│   ├── Light Mode.json      # Tokens semánticos light
│   └── Dark Mode.json       # Tokens semánticos dark
```

**Ejemplo de token de Figma:**
```json
{
  "color": {
    "light": {
      "accent": {
        "brand": {
          "$type": "color",
          "$value": "{pec.blue.44}"
        }
      }
    }
  }
}
```

## 🔄 Mapeo de Tokens

El add-on mapea automáticamente tokens de Figma a tokens del proyecto:

```typescript
// Mapeo por defecto
'figma.light.color.accent.brand' → 'light.brand.ubits-accent-brand'
'figma.light.color.fg.1.high' → 'light.foreground.ubits-fg-1-high'
'figma.light.color.bg.1' → 'light.background.ubits-bg-1'
```

Puedes personalizar el mapeo en la configuración:
```json
{
  "tokenMapping": {
    "figma.light.color.accent.brand": "light.brand.custom-brand-color",
    "figma.dark.color.accent.brand": "dark.brand.custom-brand-color"
  }
}
```

## 🔌 Hooks Automáticos

El add-on de Figma Sync se integra automáticamente con el Hub:

### `onFileChange`
Se llama cuando un archivo cambia:
```typescript
// Si autoSync está habilitado, sincroniza automáticamente
// cuando cambian tokens de Figma
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `compare` | Compara tokens de Figma con proyecto | `() => Promise<TokenComparison>` |
| `sync` | Sincroniza tokens de Figma al proyecto | `(options?) => Promise<SyncResult>` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración | `() => FigmaSyncConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<FigmaSyncConfig>)` |

## 📝 Ejemplos de Uso

### Sincronización Automática

```typescript
// Configurar auto-sync
await hub.configureAddon('figma-sync', {
  autoSync: true,
  syncMode: 'selective'
});

// Cuando cambien tokens de Figma, se sincronizan automáticamente
```

### Workflow de Sincronización

```typescript
// 1. Comparar primero
const comparison = await compare();

// 2. Revisar diferencias
console.log('Tokens diferentes:', comparison.different);
console.log('Tokens faltantes:', comparison.missing);

// 3. Sincronizar selectivamente
const result = await sync({
  mode: 'selective',
  updateDifferent: true,
  addMissing: true
});

// 4. Revisar reporte
console.log('Reporte generado en:', result.reportPath);
```

### Integración con GitHub

```typescript
// Sincronizar tokens antes de commit
const sync = hub.getService('figma-sync', 'sync');
const result = await sync({ mode: 'selective' });

if (result.tokensUpdated > 0) {
  const commit = hub.getService('github', 'commit');
  await commit(['packages/tokens/tokens.json'], 'Sync tokens from Figma');
}
```

## 🐛 Troubleshooting

### Error: "Ruta de tokens de Figma no encontrada"

1. Verifica que `figmaTokensPath` esté configurado correctamente
2. Verifica que los tokens de Figma estén exportados en la ruta especificada
3. Verifica la estructura de directorios de Figma

### Tokens no se mapean correctamente

1. Revisa el mapeo por defecto en el código
2. Configura `tokenMapping` personalizado en la configuración
3. Verifica que los nombres de tokens coincidan

### Sincronización no actualiza tokens

1. Verifica que `syncMode` no sea `'manual'`
2. Verifica que `updateDifferent` o `addMissing` estén en `true`
3. Revisa los logs para errores

### Backup no se crea

1. Verifica que `backupBeforeSync` esté en `true`
2. Verifica permisos de escritura en el directorio del proyecto
3. Revisa los logs para errores

## 📚 Referencias

- [Figma Tokens Plugin](https://www.figma.com/community/plugin/888356646278934516)
- [Design Tokens Format](https://tr.designtokens.org/format/)
- [Figma API](https://www.figma.com/developers/api)

## 🔗 Integración con Otros Add-ons

Figma Sync se integra automáticamente con:
- **GitHub Add-on**: Puede commitear tokens sincronizados
- **Clarity Add-on**: Trackea sincronizaciones
- **Tokens Add-on**: Actualiza tokens del sistema

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024

