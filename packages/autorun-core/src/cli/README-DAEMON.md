# 🚀 AutorunHub Daemon

Script para mantener AutorunHub corriendo en background para que el auto-commit de GitHub funcione correctamente.

## 📋 Uso

### Iniciar el daemon:

```bash
npm run autorun:daemon
```

### Detener el daemon:

Presiona `Ctrl+C` en la terminal donde está corriendo.

O si está corriendo en background:

```bash
# Encontrar el proceso
ps aux | grep autorun-daemon

# Detener el proceso
kill <PID>
```

## 🔧 Cómo Funciona

1. **Inicializa AutorunHub** con todos los add-ons configurados
2. **Activa FileWatcher** para monitorear cambios en:
   - `prototypes/`
   - `src/`
   - `packages/`
3. **Mantiene el proceso vivo** para que FileWatcher siga funcionando
4. **Detecta cambios automáticamente** y los envía al add-on de GitHub
5. **GitHub add-on hace commit automático** después de 5 segundos de inactividad

## ⚙️ Configuración

El daemon usa la configuración en `.ubits/project-config.json`:

```json
{
  "autorun": {
    "fileWatching": {
      "enabled": true,
      "paths": ["prototypes/", "src/", "packages/"],
      "ignored": ["node_modules/", ".git/", "dist/", ".next/"]
    },
    "addons": {
      "config": {
        "github": {
          "repositoryUrl": "https://github.com/user/repo.git",
          "autoCommit": true,
          "autoCommitDelay": 5000,
          "commitMessage": "Auto-commit: {file}",
          "pushOnCommit": false
        }
      }
    }
  }
}
```

## 📝 Notas

- El daemon debe estar corriendo para que el auto-commit funcione
- Los cambios se agrupan durante 5 segundos antes de hacer commit
- Solo se hacen commits, no push automático (configurable)
- El daemon verifica el estado cada 30 segundos y se reinicia si es necesario

## 🔍 Verificar que Funciona

1. Inicia el daemon: `npm run autorun:daemon`
2. Haz un cambio en un archivo dentro de `prototypes/`, `src/` o `packages/`
3. Espera 5-8 segundos
4. Verifica: `git log --oneline -1` debería mostrar un commit automático



