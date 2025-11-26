# ⚡ Vitest Add-on

Add-on funcional de **Vitest** para Autorun que proporciona testing rápido con Vite.

## 🎯 Características

- ✅ **Testing rápido** - Más rápido que JEST
- ✅ **ESM nativo** - Soporte completo para ESM
- ✅ **Watch mode mejorado** - Hot reload de tests
- ✅ **TypeScript nativo** - Sin configuración adicional
- ✅ **Coverage** - Integración con coverage

## 📦 Instalación

```bash
npm install --save-dev vitest
```

## ⚙️ Configuración

```json
{
  "autorun": {
    "addons": {
      "config": {
        "vitest": {
          "enabled": true,
          "testDir": "src",
          "coverage": false,
          "watch": false,
          "ui": false
        }
      }
    }
  }
}
```

## 🚀 Uso

```typescript
await hub.activateAddon('vitest');
const runTests = hub.getService('vitest', 'runTests');
const result = await runTests({ coverage: true });
```

---

**Versión**: 1.0.0  
**Compatibilidad**: Vite, CI/CD

