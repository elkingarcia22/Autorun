# 🐳 Docker Add-on

Add-on funcional de **Docker** para Autorun que proporciona containerización.

## 🎯 Características

- ✅ **Build de imágenes** - Construcción de containers
- ✅ **Push a registries** - Subida a Docker Hub/registries
- ✅ **Multi-stage builds** - Builds optimizados
- ✅ **Integración con CI/CD** - Deploy de containers

## 📦 Instalación

Docker debe estar instalado y corriendo.

## ⚙️ Configuración

```json
{
  "autorun": {
    "addons": {
      "config": {
        "docker": {
          "enabled": true,
          "imageName": "app",
          "tag": "latest",
          "registry": "",
          "dockerfile": "Dockerfile",
          "context": "."
        }
      }
    }
  }
}
```

## 🚀 Uso

```typescript
await hub.activateAddon('docker');
const build = hub.getService('docker', 'build');
await build({ imageName: 'myapp', tag: 'v1.0.0' });

const push = hub.getService('docker', 'push');
await push({ registry: 'docker.io/username' });
```

---

**Versión**: 1.0.0  
**Compatibilidad**: CI/CD, Registries

