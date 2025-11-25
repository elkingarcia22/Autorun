# 📚 Docusaurus Add-on

Add-on funcional de **Docusaurus** para Autorun que proporciona generación y gestión de documentación.

## 🎯 Características

- ✅ **Servidor de desarrollo** - Iniciar servidor de documentación
- ✅ **Build estático** - Generar build de documentación para producción
- ✅ **Generación automática** - Genera páginas de documentación automáticamente
- ✅ **Configuración automática** - Genera configuración básica si no existe
- ✅ **Múltiples temas** - Soporte para temas classic y modern
- ✅ **Blog integrado** - Sistema de blog incluido
- ✅ **Búsqueda** - Búsqueda integrada en la documentación

## 📦 Instalación

El add-on ya está incluido en Autorun. Necesitas instalar Docusaurus en tu proyecto:

```bash
npm install --save-dev @docusaurus/core @docusaurus/preset-classic
npm install react react-dom
```

## ⚙️ Configuración

Agrega la configuración de Docusaurus en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "docusaurus": {
          "port": 3000,
          "host": "localhost",
          "buildDir": "build",
          "configFile": "docusaurus.config.js",
          "autoStart": false,
          "theme": "classic",
          "docsDir": "docs",
          "blogDir": "blog",
          "staticDir": "static"
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `port` | `number` | Puerto del servidor | `3000` |
| `host` | `string` | Host del servidor | `localhost` |
| `buildDir` | `string` | Directorio de build | `build` |
| `configFile` | `string` | Archivo de configuración | `docusaurus.config.js` |
| `autoStart` | `boolean` | Iniciar automáticamente | `false` |
| `theme` | `string` | Tema (`classic`, `modern`) | `classic` |
| `docsDir` | `string` | Directorio de docs | `docs` |
| `blogDir` | `string` | Directorio de blog | `blog` |
| `staticDir` | `string` | Directorio estático | `static` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Docusaurus
await hub.activateAddon('docusaurus');
```

### Iniciar Servidor de Desarrollo

```typescript
// Obtener servicio de Docusaurus
const start = hub.getService('docusaurus', 'start');

// Iniciar servidor
const process = await start();
console.log('Docusaurus disponible en:', process.url);
// http://localhost:3000
```

### Build Estático

```typescript
const build = hub.getService('docusaurus', 'build');

// Hacer build
const buildPath = await build();
console.log('Build completado en:', buildPath);
```

### Generar Documentación

```typescript
const generateDoc = hub.getService('docusaurus', 'generateDoc');

// Generar página de documentación
await generateDoc(
  'Guía de Inicio',
  '# Guía de Inicio\n\nEsta es una guía...',
  'getting-started'
);
```

### Generar Configuración

```typescript
const generateConfig = hub.getService('docusaurus', 'generateConfig');

// Generar configuración básica
await generateConfig();
// Crea docusaurus.config.js
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `start` | Inicia el servidor de desarrollo | `() => Promise<DocusaurusProcess>` |
| `stop` | Detiene el servidor | `() => void` |
| `build` | Hace build estático | `() => Promise<string>` |
| `generateDoc` | Genera página de documentación | `(title: string, content: string, id?) => Promise<string>` |
| `generateConfig` | Genera configuración básica | `() => Promise<void>` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración | `() => DocusaurusConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<DocusaurusConfig>)` |

## 🔌 Hooks Automáticos

El add-on de Docusaurus se integra automáticamente con el Hub:

### `onBeforeDeploy`
Se llama antes de hacer deploy:
```typescript
// Automáticamente hace build de Docusaurus antes de deploy
```

## 📝 Ejemplos de Uso

### Desarrollo con Auto-start

```typescript
// Configurar auto-start
await hub.configureAddon('docusaurus', {
  autoStart: true,
  port: 3000
});

// Activar add-on (inicia automáticamente)
await hub.activateAddon('docusaurus');
// Docusaurus se inicia automáticamente en http://localhost:3000
```

### Generar Documentación desde Add-ons

```typescript
// Generar documentación para cada add-on
const addons = ['clarity', 'vercel', 'storybook'];

for (const addonId of addons) {
  const addon = hub.getAddon(addonId);
  await generateDoc(
    `${addon.name} - Documentación`,
    `# ${addon.name}\n\n${addon.description}\n\n...`,
    addonId
  );
}
```

## 🐛 Troubleshooting

### Error: "Docusaurus no está instalado"

1. Instala Docusaurus:
```bash
npm install --save-dev @docusaurus/core @docusaurus/preset-classic
npm install react react-dom
```

2. Verifica que esté en `package.json`

### Error al iniciar servidor

1. Verifica que el puerto esté disponible:
```bash
lsof -i :3000
```

2. Cambia el puerto en la configuración:
```json
{
  "docusaurus": {
    "port": 3001
  }
}
```

### Build falla

1. Verifica que tengas todas las dependencias instaladas
2. Verifica que la configuración de Docusaurus sea correcta
3. Ejecuta manualmente: `npx docusaurus build` para ver errores detallados

## 📚 Referencias

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Docusaurus API](https://docusaurus.io/docs/api)
- [Docusaurus Themes](https://docusaurus.io/docs/styling-layout)

## 🔗 Integración con Otros Add-ons

Docusaurus se integra automáticamente con:
- **Vercel Add-on**: Build automático antes de deploy
- **GitHub Add-on**: Puede commitear documentación generada
- **i18n Add-on**: Soporte para múltiples idiomas en docs

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024


