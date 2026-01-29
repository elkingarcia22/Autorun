# @autorun/github

Add-on funcional de GitHub para Autorun Hub

## Características

- ✅ **Auto-commit** - Guarda cambios automáticamente
- ✅ **Gestión de ramas** - Crear, cambiar, mergear ramas
- ✅ **Estados anteriores** - Volver a commits anteriores
- ✅ **Conexión automática** - Se conecta al repositorio al inicializar
- ✅ **Orquestación** - Integrado con el sistema de eventos del Hub

## Configuración

```json
{
  "github": {
    "enabled": true,
    "repositoryUrl": "https://github.com/user/repo",
    "autoCommit": true,
    "autoCommitDelay": 5000,
    "branch": "main",
    "commitMessage": "Auto-commit: {file}",
    "pushOnCommit": false
  }
}
```

