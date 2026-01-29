# 🔄 Renovate Add-on

Add-on funcional de **Renovate** para Autorun que proporciona actualización automática de dependencias.

## 🎯 Características

- ✅ **Detección de actualizaciones** - Detecta actualizaciones disponibles en dependencias
- ✅ **Creación de PRs automáticos** - Crea PRs automáticamente para actualizaciones
- ✅ **Configuración de Renovate** - Gestiona renovate.json automáticamente
- ✅ **Gestión de dependencias** - Monitorea y actualiza dependencias
- ✅ **Integración con GitHub** - Crea PRs directamente en GitHub
- ✅ **Verificación periódica** - Verifica actualizaciones según schedule configurado
- ✅ **Package rules** - Reglas personalizadas por paquete
- ✅ **Labels y assignees** - Configuración de PRs automáticos

## 📦 Instalación

El add-on ya está incluido en Autorun. Para usar Renovate completamente, tienes dos opciones:

### Opción 1: GitHub App (Recomendado)

Instala la GitHub App de Renovate desde [renovateapp.com](https://renovateapp.com/). Es la forma más fácil y no requiere instalación local.

### Opción 2: Instalación Local

```bash
npm install -g renovate
```

O para uso en proyecto:

```bash
npm install --save-dev renovate
```

## ⚙️ Configuración

Agrega la configuración de Renovate en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "renovate": {
          "enabled": true,
          "autoUpdate": false,
          "createPRs": true,
          "schedule": "at any time",
          "labels": ["renovate", "dependencies"],
          "assignees": [],
          "reviewers": [],
          "packageRules": [],
          "extends": ["config:recommended"]
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `enabled` | `boolean` | Habilitar Renovate | `true` |
| `autoUpdate` | `boolean` | Actualizar automáticamente | `false` |
| `createPRs` | `boolean` | Crear PRs automáticamente | `true` |
| `schedule` | `string` | Schedule de verificación (cron) | `at any time` |
| `labels` | `string[]` | Labels para PRs | `["renovate", "dependencies"]` |
| `assignees` | `string[]` | Assignees para PRs | `[]` |
| `reviewers` | `string[]` | Reviewers para PRs | `[]` |
| `packageRules` | `PackageRule[]` | Reglas por paquete | `[]` |
| `extends` | `string[]` | Configuraciones base | `["config:recommended"]` |

### Ejemplo de Package Rules

```json
{
  "packageRules": [
    {
      "matchPackageNames": ["react", "react-dom"],
      "updateTypes": ["minor", "patch"],
      "enabled": true
    },
    {
      "matchPackagePatterns": ["^@types/"],
      "updateTypes": ["patch"],
      "enabled": true
    }
  ]
}
```

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Renovate
await hub.activateAddon('renovate');
```

### Verificar Actualizaciones

```typescript
// Obtener servicio de Renovate
const checkUpdates = hub.getService('renovate', 'checkUpdates');

// Verificar actualizaciones disponibles
const result = await checkUpdates();

if (result.success) {
  console.log(`Actualizaciones encontradas: ${result.updatesFound}`);
  if (result.updates) {
    result.updates.forEach(update => {
      console.log(`${update.packageName}: ${update.currentVersion} -> ${update.newVersion} (${update.updateType})`);
    });
  }
}
```

### Ejecutar Renovate

```typescript
// Ejecutar Renovate (requiere instalación local o GitHub App)
const run = hub.getService('renovate', 'run');

const result = await run();

if (result.success) {
  console.log('Renovate ejecutado correctamente');
  if (result.prsCreated) {
    console.log(`PRs creados: ${result.prsCreated}`);
  }
}
```

### Configurar Renovate

```typescript
// Obtener configuración actual
const getRenovateConfig = hub.getService('renovate', 'getRenovateConfig');
const config = await getRenovateConfig();
console.log('Configuración de Renovate:', config);

// Actualizar configuración
const updateRenovateConfig = hub.getService('renovate', 'updateRenovateConfig');
await updateRenovateConfig({
  labels: ['renovate', 'dependencies', 'auto-update'],
  schedule: 'before 10am on monday',
  packageRules: [
    {
      matchPackageNames: ['react'],
      updateTypes: ['minor', 'patch']
    }
  ]
});
```

## 🔄 Flujo Automático

### Verificación Periódica

Si `autoUpdate` está habilitado, el add-on verificará actualizaciones periódicamente:

```typescript
await hub.activateAddon('renovate');

// Configurar verificación automática
await hub.configureAddon('renovate', {
  autoUpdate: true,
  schedule: 'at any time',
  createPRs: true
});

// El add-on verificará actualizaciones según el schedule
```

## 📝 Estructura de renovate.json

Después de inicializar, tendrás:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended"],
  "schedule": ["at any time"],
  "labels": ["renovate", "dependencies"],
  "assignees": [],
  "reviewers": [],
  "packageRules": [],
  "prConcurrentLimit": 5,
  "prHourlyLimit": 2,
  "onboarding": true
}
```

## 🔗 Integración con GitHub

Renovate funciona mejor con GitHub App:

```typescript
// Con GitHub App configurada, Renovate creará PRs automáticamente
await hub.activateAddon('renovate');
await hub.activateAddon('github');

// Configurar Renovate para crear PRs
await hub.configureAddon('renovate', {
  createPRs: true,
  labels: ['renovate', 'dependencies'],
  assignees: ['@team-lead'],
  reviewers: ['@team-lead']
});

// Renovate creará PRs automáticamente cuando detecte actualizaciones
```

## 📊 Ejemplo Completo

### Configuración Completa

```json
{
  "autorun": {
    "addons": {
      "active": ["renovate", "github"],
      "config": {
        "renovate": {
          "enabled": true,
          "autoUpdate": false,
          "createPRs": true,
          "schedule": "before 10am on monday",
          "labels": ["renovate", "dependencies", "auto-update"],
          "assignees": ["@team-lead"],
          "reviewers": ["@team-lead"],
          "packageRules": [
            {
              "matchPackageNames": ["react", "react-dom"],
              "updateTypes": ["minor", "patch"],
              "enabled": true
            },
            {
              "matchPackagePatterns": ["^@types/"],
              "updateTypes": ["patch"],
              "enabled": true
            }
          ],
          "extends": ["config:recommended"]
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
await hub.activateAddon('renovate');
await hub.activateAddon('github');

// Verificar actualizaciones manualmente
const checkUpdates = hub.getService('renovate', 'checkUpdates');
const result = await checkUpdates();

if (result.success && result.updatesFound && result.updatesFound > 0) {
  console.log(`✅ ${result.updatesFound} actualizaciones encontradas`);
  
  if (result.updates) {
    result.updates.forEach(update => {
      console.log(`  ${update.packageName}: ${update.currentVersion} -> ${update.newVersion} (${update.updateType})`);
    });
  }
  
  // Ejecutar Renovate para crear PRs
  if (result.createPRs) {
    const run = hub.getService('renovate', 'run');
    await run();
  }
}
```

## 🎯 Casos de Uso

### Caso 1: Verificación Manual

```typescript
// Verificar actualizaciones antes de hacer cambios importantes
const checkUpdates = hub.getService('renovate', 'checkUpdates');
const result = await checkUpdates();

if (result.updatesFound && result.updatesFound > 0) {
  console.log('Hay actualizaciones disponibles');
  // Decidir si actualizar ahora o después
}
```

### Caso 2: CI/CD Integration

```typescript
// En CI/CD, verificar actualizaciones semanalmente
hub.on('schedule', async () => {
  const checkUpdates = hub.getService('renovate', 'checkUpdates');
  const result = await checkUpdates();
  
  if (result.updatesFound && result.updatesFound > 0) {
    // Notificar al equipo
    console.log(`${result.updatesFound} actualizaciones disponibles`);
  }
});
```

### Caso 3: Actualización Automática

```typescript
// Configurar actualización automática para patches
await hub.configureAddon('renovate', {
  autoUpdate: true,
  createPRs: true,
  packageRules: [
    {
      matchPackagePatterns: ['.*'],
      updateTypes: ['patch'],
      enabled: true
    }
  ]
});
```

## 🐛 Troubleshooting

### Renovate no está instalado

1. Instala Renovate: `npm install -g renovate` o usa GitHub App
2. Verifica la instalación: `npx renovate --version`
3. Reinicia el Hub

### No se crean PRs

1. Verifica que `createPRs` está en `true`
2. Verifica que GitHub App está configurada (si usas GitHub App)
3. Verifica que tienes permisos para crear PRs
4. Revisa los logs para errores

### Actualizaciones no detectadas

1. Verifica que `enabled` está en `true`
2. Verifica que el schedule está configurado correctamente
3. Revisa los logs para errores de conexión

## 📚 Referencias

- [Renovate Documentation](https://docs.renovatebot.com/)
- [Renovate GitHub App](https://renovateapp.com/)
- [Renovate Configuration](https://docs.renovatebot.com/configuration-options/)

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Compatibilidad**: GitHub, CI/CD

