# 🚀 Vercel Deployment Add-on

Add-on funcional de **Vercel** para Autorun que proporciona deploy automático, gestión de proyectos y dominios.

## 🎯 Características

- ✅ **Deploy automático** - Deploy automático después de commits (opcional)
- ✅ **Gestión de proyectos** - Crear, listar y gestionar proyectos Vercel
- ✅ **Deployments** - Crear y gestionar deployments de producción y staging
- ✅ **Gestión de dominios** - Agregar y eliminar dominios personalizados
- ✅ **Integración con GitHub** - Deploy automático después de commits
- ✅ **Preview deployments** - Deployments de preview para pull requests
- ✅ **Configuración flexible** - Framework, build commands, output directory

## 📦 Instalación

El add-on ya está incluido en Autorun. Solo necesitas configurarlo en tu proyecto.

## ⚙️ Configuración

### 1. Obtener Token de Vercel

1. Ve a [Vercel Account Settings](https://vercel.com/account/tokens)
2. Crea un nuevo token con permisos de lectura y escritura
3. Copia el token generado

### 2. Configurar en el Proyecto

Agrega la configuración de Vercel en tu `.ubits/project-config.json`:

```json
{
  "autoframe": {
    "addons": {
      "config": {
        "vercel": {
          "token": "tu-vercel-token",
          "teamId": "tu-team-id-opcional",
          "autoDeploy": true,
          "projectName": "mi-proyecto",
          "framework": "nextjs",
          "buildCommand": "npm run build",
          "outputDirectory": ".next",
          "installCommand": "npm install"
        }
      }
    }
  }
}
```

**O usa variables de entorno:**

```bash
export VERCEL_TOKEN="tu-vercel-token"
export VERCEL_TEAM_ID="tu-team-id-opcional"
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `token` | `string` | **Requerido.** Token de acceso de Vercel | - |
| `teamId` | `string` | ID del equipo (opcional) | - |
| `autoDeploy` | `boolean` | Deploy automático después de commits | `true` |
| `projectName` | `string` | Nombre del proyecto | Nombre del proyecto |
| `framework` | `string` | Framework usado (nextjs, react, vue, etc.) | - |
| `buildCommand` | `string` | Comando de build | - |
| `outputDirectory` | `string` | Directorio de salida | - |
| `installCommand` | `string` | Comando de instalación | `npm install` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutoframeHub } from '@autoframe/core';

const hub = new AutoframeHub();
await hub.initialize();

// Activar Vercel
await hub.activateAddon('vercel');
```

### Deploy Manual

```typescript
// Obtener servicio de deploy
const deploy = hub.getService('vercel', 'deploy');

// Deploy a producción
const deployment = await deploy({
  target: 'production'
});

console.log('Deploy URL:', deployment.url);
```

### Deploy con Archivos Específicos

```typescript
const deploy = hub.getService('vercel', 'deploy');

const deployment = await deploy({
  files: {
    'index.html': '<html>...</html>',
    'package.json': JSON.stringify({ name: 'my-app' }),
    'dist/app.js': '// código de la app'
  },
  target: 'production'
});
```

### Gestión de Proyectos

```typescript
// Listar todos los proyectos
const listProjects = hub.getService('vercel', 'listProjects');
const projects = await listProjects();
console.log('Proyectos:', projects);

// Obtener un proyecto específico
const getProject = hub.getService('vercel', 'getProject');
const project = await getProject('mi-proyecto');

// Crear un nuevo proyecto
const createProject = hub.getService('vercel', 'createProject');
const newProject = await createProject('nuevo-proyecto', {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  gitRepository: {
    type: 'github',
    repo: 'usuario/repositorio'
  }
});
```

### Gestión de Deployments

```typescript
// Listar deployments de un proyecto
const listDeployments = hub.getService('vercel', 'listDeployments');
const deployments = await listDeployments(projectId, 10);

// Obtener información de un deployment
const getDeployment = hub.getService('vercel', 'getDeployment');
const deployment = await getDeployment(deploymentId);
console.log('Estado:', deployment.state);
console.log('URL:', deployment.url);
```

### Gestión de Dominios

```typescript
// Listar dominios de un proyecto
const listDomains = hub.getService('vercel', 'listDomains');
const domains = await listDomains(projectId);

// Agregar un dominio
const addDomain = hub.getService('vercel', 'addDomain');
await addDomain(projectId, 'mi-dominio.com', 'main');

// Eliminar un dominio
const removeDomain = hub.getService('vercel', 'removeDomain');
await removeDomain(projectId, 'mi-dominio.com');
```

## 🔌 Hooks Automáticos

El add-on de Vercel se integra automáticamente con el Hub:

### `onBeforeDeploy`
Se llama antes de hacer deploy:
```typescript
// Automáticamente prepara el deploy
```

### `onAfterDeploy`
Se llama después de hacer deploy:
```typescript
// Automáticamente trackea el deploy en Clarity (si está disponible)
```

### `onAfterCommit`
Se llama después de hacer commit (si `autoDeploy` está habilitado):
```typescript
// Automáticamente hace deploy después de cada commit
```

## 📊 Estados de Deployment

Los deployments pueden tener los siguientes estados:

- `BUILDING` - El deployment está siendo construido
- `ERROR` - El deployment falló
- `INITIALIZING` - El deployment está inicializando
- `QUEUED` - El deployment está en cola
- `READY` - El deployment está listo
- `CANCELED` - El deployment fue cancelado

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `deploy` | Hace deploy de un proyecto | `(options?: DeployOptions) => Promise<Deployment>` |
| `listProjects` | Lista todos los proyectos | `() => Promise<Project[]>` |
| `getProject` | Obtiene un proyecto por nombre | `(name: string) => Promise<Project>` |
| `createProject` | Crea un nuevo proyecto | `(name: string, options?) => Promise<Project>` |
| `listDeployments` | Lista deployments de un proyecto | `(projectId: string, limit?) => Promise<Deployment[]>` |
| `getDeployment` | Obtiene información de un deployment | `(deploymentId: string) => Promise<Deployment>` |
| `listDomains` | Lista dominios de un proyecto | `(projectId: string) => Promise<Domain[]>` |
| `addDomain` | Agrega un dominio a un proyecto | `(projectId: string, domain: string, gitBranch?) => Promise<Domain>` |
| `removeDomain` | Elimina un dominio de un proyecto | `(projectId: string, domain: string) => Promise<void>` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración actual | `() => VercelConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<VercelConfig>)` |

## 📝 Ejemplos de Uso

### Deploy Automático después de Commit

```typescript
// Configurar auto-deploy
await hub.configureAddon('vercel', {
  autoDeploy: true,
  projectName: 'mi-proyecto'
});

// Cuando hagas commit con GitHub add-on, Vercel hará deploy automáticamente
```

### Deploy de Staging

```typescript
const deploy = hub.getService('vercel', 'deploy');

// Deploy a staging
const stagingDeployment = await deploy({
  target: 'staging'
});
```

### Integración con GitHub

```typescript
// Activar ambos add-ons
await hub.activateAddon('github');
await hub.activateAddon('vercel');

// Configurar auto-deploy
await hub.configureAddon('vercel', {
  autoDeploy: true
});

// Cuando hagas commit, Vercel hará deploy automáticamente
const commit = hub.getService('github', 'commit');
await commit(['archivo.js'], 'Actualización');
// Vercel hará deploy automáticamente
```

## 🐛 Troubleshooting

### Error: "Vercel token es requerido"

1. Verifica que `token` esté configurado en `.ubits/project-config.json`
2. O configura la variable de entorno `VERCEL_TOKEN`
3. Obtén tu token en [Vercel Account Settings](https://vercel.com/account/tokens)

### Error: "Project name es requerido"

1. Configura `projectName` en la configuración del add-on
2. O el proyecto debe tener un nombre en `project-config.json`

### Deploy falla

1. Verifica que el proyecto exista en Vercel
2. Verifica que `buildCommand` y `outputDirectory` estén configurados correctamente
3. Revisa los logs del deployment en el dashboard de Vercel

### Auto-deploy no funciona

1. Verifica que `autoDeploy` esté en `true`
2. Verifica que el add-on esté activado
3. Verifica que GitHub add-on esté activado y haciendo commits

## 📚 Referencias

- [Vercel API Documentation](https://vercel.com/docs/rest-api)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel CLI](https://vercel.com/docs/cli)

## 🔗 Integración con Otros Add-ons

Vercel se integra automáticamente con:
- **GitHub Add-on**: Auto-deploy después de commits
- **Clarity Add-on**: Trackea deployments automáticamente

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024

