# ⚡ Turborepo Add-on

Add-on funcional de **Turborepo** para Autorun que proporciona monorepo management.

## 🎯 Características

- ✅ **Builds paralelos** - Ejecución paralela de tasks
- ✅ **Caché inteligente** - Caché entre builds
- ✅ **Task orchestration** - Gestión de dependencias
- ✅ **Optimización de builds** - Builds más rápidos

## 📦 Instalación

```bash
npm install --save-dev turbo
```

## ⚙️ Configuración

```json
{
  "autorun": {
    "addons": {
      "config": {
        "turborepo": {
          "enabled": true,
          "cache": true,
          "parallel": true,
          "filter": ""
        }
      }
    }
  }
}
```

## 🚀 Uso

```typescript
await hub.activateAddon('turborepo');
const run = hub.getService('turborepo', 'run');
await run('build', { cache: true, parallel: true });
```

---

**Versión**: 1.0.0  
**Compatibilidad**: Monorepos, CI/CD

