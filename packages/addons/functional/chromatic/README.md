# 🎨 Chromatic Add-on

Add-on funcional de **Chromatic** para Autorun que proporciona visual testing de componentes.

## 🎯 Características

- ✅ **Visual testing** - Detección de cambios visuales en componentes
- ✅ **Integración con Storybook** - Testing visual de stories
- ✅ **Review visual de PRs** - Comentarios automáticos en PRs
- ✅ **Screenshot testing** - Comparación de screenshots
- ✅ **Auto-accept changes** - Aceptación automática de cambios
- ✅ **Integración con GitHub** - Comentarios en PRs

## 📦 Instalación

```bash
npm install --save-dev chromatic
```

## ⚙️ Configuración

```json
{
  "autorun": {
    "addons": {
      "config": {
        "chromatic": {
          "enabled": true,
          "projectToken": "tu-project-token",
          "buildScriptName": "build-storybook",
          "storybookBuildDir": "storybook-static",
          "onlyChanged": false,
          "exitZeroOnChanges": false,
          "autoAcceptChanges": false
        }
      }
    }
  }
}
```

## 🚀 Uso

```typescript
await hub.activateAddon('chromatic');
const run = hub.getService('chromatic', 'run');
const result = await run();
```

---

**Versión**: 1.0.0  
**Compatibilidad**: Storybook, GitHub

