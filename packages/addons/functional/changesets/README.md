# 📦 Changesets Add-on

Add-on funcional de **Changesets** para Autorun que proporciona versionado semántico automático y generación de changelog.

## 🎯 Características

- ✅ **Versionado semántico automático** - Versionado basado en cambios
- ✅ **Creación de changesets** - Gestión de cambios por versión
- ✅ **Generación de CHANGELOG.md** - Changelog automático
- ✅ **Gestión de releases** - Release automático después de deploy
- ✅ **Integración con GitHub** - Creación automática de releases en GitHub
- ✅ **Versionado antes de deploy** - Versionado automático antes de cada deploy
- ✅ **Commit automático** - Commits automáticos de changesets
- ✅ **Integración con el Hub** - Hooks automáticos en el ciclo de vida

## 📦 Instalación

El add-on ya está incluido en Autorun. Para usar Changesets, instala la dependencia:

```bash
npm install --save-dev @changesets/cli
```

## ⚙️ Configuración

Agrega la configuración de Changesets en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "changesets": {
          "enabled": true,
          "autoVersion": true,
          "autoRelease": false,
          "commitChangesets": true,
          "createGitHubRelease": false,
          "releaseType": "auto",
          "changelogPath": "CHANGELOG.md",
          "changesetsPath": ".changeset"
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `enabled` | `boolean` | Habilitar Changesets | `true` |
| `autoVersion` | `boolean` | Versionar automáticamente antes de deploy | `true` |
| `autoRelease` | `boolean` | Hacer release automáticamente después de deploy | `false` |
| `commitChangesets` | `boolean` | Commitear changesets automáticamente | `true` |
| `createGitHubRelease` | `boolean` | Crear GitHub release automáticamente | `false` |
| `releaseType` | `string` | Tipo de release (`major`, `minor`, `patch`, `auto`) | `auto` |
| `changelogPath` | `string` | Ruta del CHANGELOG.md | `CHANGELOG.md` |
| `changesetsPath` | `string` | Directorio de changesets | `.changeset` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Changesets
await hub.activateAddon('changesets');
```

### Crear un Changeset

```typescript
// Obtener servicio de changesets
const createChangeset = hub.getService('changesets', 'createChangeset');

// Crear changeset manual
const result = await createChangeset(
  'Nueva funcionalidad agregada',
  'minor' // 'major' | 'minor' | 'patch'
);

if (result.success) {
  console.log('Changeset creado:', result.changesetId);
}
```

### Versionar Manualmente

```typescript
// Obtener servicio de versionado
const version = hub.getService('changesets', 'version');

// Versionar según changesets pendientes
const result = await version();

if (result.success) {
  console.log('Versión actualizada a:', result.version);
  console.log('CHANGELOG actualizado:', result.changelogUpdated);
}
```

### Hacer Release

```typescript
// Obtener servicio de release
const release = hub.getService('changesets', 'release');

// Hacer release completo (version + publish)
const result = await release();

if (result.success) {
  console.log('Release completado:', result.version);
  if (result.gitHubReleaseCreated) {
    console.log('GitHub release creado');
  }
}
```

### Obtener Información de Versión

```typescript
// Obtener versión actual
const getCurrentVersion = hub.getService('changesets', 'getCurrentVersion');
const version = await getCurrentVersion();
console.log('Versión actual:', version);

// Obtener información completa
const getVersionInfo = hub.getService('changesets', 'getVersionInfo');
const info = await getVersionInfo();
console.log('Versión actual:', info.current);
console.log('Tipo de próxima versión:', info.type);
```

### Verificar Changesets Pendientes

```typescript
// Verificar si hay changesets pendientes
const hasPendingChangesets = hub.getService('changesets', 'hasPendingChangesets');
const hasPending = await hasPendingChangesets();

if (hasPending) {
  console.log('Hay changesets pendientes de versionar');
}
```

## 🔄 Flujo Automático

### Versionado Automático Antes de Deploy

Si `autoVersion` está habilitado, el add-on versionará automáticamente antes de cada deploy:

```typescript
await hub.activateAddon('changesets');
await hub.activateAddon('vercel');

// Trigger deploy
await hub.triggerEvent('beforeDeploy');
// Changesets versionará automáticamente si hay changesets pendientes
```

### Release Automático Después de Deploy

Si `autoRelease` está habilitado, el add-on hará release automáticamente después de cada deploy:

```typescript
await hub.activateAddon('changesets');
await hub.activateAddon('vercel');

// Configurar autoRelease
await hub.configureAddon('changesets', {
  autoRelease: true,
  createGitHubRelease: true
});

// Trigger deploy
await hub.triggerEvent('afterDeploy');
// Changesets hará release automáticamente
```

## 📝 Estructura de Changesets

Después de crear changesets, tendrás:

```
.changeset/
├── config.json          # Configuración de Changesets
└── [id].md             # Changesets individuales

# Ejemplo de changeset:
---
"@autorun/core": minor
---

Nueva funcionalidad agregada al Hub
```

## 🔗 Integración con Otros Add-ons

### GitHub Add-on

Creación automática de releases:

```typescript
await hub.activateAddon('changesets');
await hub.activateAddon('github');

// Configurar para crear GitHub releases
await hub.configureAddon('changesets', {
  createGitHubRelease: true
});

// Al hacer release, se creará automáticamente en GitHub
const release = hub.getService('changesets', 'release');
await release();
```

### Vercel Add-on

Versionado automático antes de deploy:

```typescript
await hub.activateAddon('changesets');
await hub.activateAddon('vercel');

// Versionado automático antes de deploy
await hub.triggerEvent('beforeDeploy');
// Changesets versionará automáticamente
```

## 📊 Ejemplo Completo

### Configuración Completa

```json
{
  "autorun": {
    "addons": {
      "active": ["changesets", "github", "vercel"],
      "config": {
        "changesets": {
          "enabled": true,
          "autoVersion": true,
          "autoRelease": false,
          "commitChangesets": true,
          "createGitHubRelease": true,
          "releaseType": "auto"
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
await hub.activateAddon('changesets');
await hub.activateAddon('github');
await hub.activateAddon('vercel');

// Crear changeset para nueva funcionalidad
const createChangeset = hub.getService('changesets', 'createChangeset');
await createChangeset('Agregado nuevo add-on de Bundle Analyzer', 'minor');

// Versionar antes de deploy
const version = hub.getService('changesets', 'version');
const versionResult = await version();

if (versionResult.success) {
  console.log(`✅ Versión actualizada a ${versionResult.version}`);
  
  // Deploy
  await hub.triggerEvent('beforeDeploy');
  
  // Release después de deploy
  const release = hub.getService('changesets', 'release');
  const releaseResult = await release();
  
  if (releaseResult.success && releaseResult.gitHubReleaseCreated) {
    console.log('✅ GitHub release creado');
  }
}
```

## 🎯 Casos de Uso

### Caso 1: Versionado Manual

```typescript
// Después de hacer cambios importantes
const createChangeset = hub.getService('changesets', 'createChangeset');
await createChangeset('Breaking change: nueva API', 'major');

// Versionar cuando estés listo
const version = hub.getService('changesets', 'version');
await version();
```

### Caso 2: CI/CD Integration

```typescript
// En CI/CD, versionar automáticamente
hub.on('afterCommit', async (commitHash) => {
  const hasPending = await hub.getService('changesets', 'hasPendingChangesets')();
  if (hasPending) {
    await hub.getService('changesets', 'version')();
  }
});
```

### Caso 3: Release Automático

```typescript
// Configurar release automático
await hub.configureAddon('changesets', {
  autoRelease: true,
  createGitHubRelease: true
});

// Después de cada deploy exitoso, se hace release automáticamente
hub.on('afterDeploy', async (url) => {
  // Release se ejecuta automáticamente
});
```

## 🐛 Troubleshooting

### Changesets no está instalado

1. Instala `@changesets/cli`: `npm install --save-dev @changesets/cli`
2. Reinicia el Hub

### No se crean changesets

1. Verifica que el directorio `.changeset` existe
2. Verifica que `enabled` está en `true`
3. Revisa los logs para errores

### Versionado no funciona

1. Verifica que hay changesets pendientes
2. Verifica que `autoVersion` está habilitado
3. Revisa los logs para errores de ejecución

## 📚 Referencias

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Compatibilidad**: GitHub, Vercel, CI/CD

