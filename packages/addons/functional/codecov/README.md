# 📊 Codecov Add-on

Add-on funcional de **Codecov** para Autorun que proporciona code coverage tracking.

## 🎯 Características

- ✅ **Tracking de coverage** - Monitoreo de coverage
- ✅ **Reportes visuales** - Dashboard de coverage
- ✅ **Coverage por archivo** - Análisis detallado
- ✅ **Integración con PRs** - Comentarios automáticos
- ✅ **Coverage thresholds** - Límites configurables

## 📦 Instalación

```bash
npm install --save-dev @codecov/vite-plugin
```

## ⚙️ Configuración

```json
{
  "autorun": {
    "addons": {
      "config": {
        "codecov": {
          "enabled": true,
          "token": "tu-codecov-token",
          "coverageDir": "coverage",
          "failOnError": false
        }
      }
    }
  }
}
```

## 🚀 Uso

```typescript
await hub.activateAddon('codecov');
const uploadCoverage = hub.getService('codecov', 'uploadCoverage');
await uploadCoverage();
```

---

**Versión**: 1.0.0  
**Compatibilidad**: Vitest, JEST, CI/CD

