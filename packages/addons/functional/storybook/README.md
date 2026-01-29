# 📚 Storybook Development Add-on

Add-on funcional de **Storybook** para Autorun que proporciona desarrollo y documentación de componentes.

## 🎯 Características

- ✅ **Servidor de desarrollo** - Iniciar/detener Storybook automáticamente
- ✅ **Build estático** - Generar build de Storybook para producción
- ✅ **Generación automática de stories** - Crear stories para componentes automáticamente
- ✅ **Configuración automática** - Generar configuración básica de Storybook
- ✅ **Hot reload** - Recarga automática durante desarrollo
- ✅ **Integración con Hub** - Hooks automáticos para cambios y deployments
- ✅ **Múltiples frameworks** - Soporte para React, Vue, Angular, Web Components, HTML

## 📦 Instalación

El add-on ya está incluido en Autorun. Necesitas instalar Storybook en tu proyecto:

```bash
# Para React (incluyendo React 19)
npm install --save-dev react@^19.0.0 react-dom@^19.0.0
npm install --save-dev @storybook/react-webpack5@^8.0.0 @storybook/addon-essentials@^8.0.0

# Para Vue
npm install --save-dev @storybook/vue3 @storybook/addon-essentials

# Para Angular
npm install --save-dev @storybook/angular @storybook/addon-essentials

# Para Web Components
npm install --save-dev @storybook/web-components @storybook/addon-essentials

# Para HTML
npm install --save-dev @storybook/html @storybook/addon-essentials
```

## ⚙️ Configuración

Agrega la configuración de Storybook en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "storybook": {
          "port": 6006,
          "host": "localhost",
          "buildDir": "storybook-static",
          "configDir": ".storybook",
          "storiesDir": "stories",
          "autoStart": false,
          "framework": "react",
          "staticDirs": ["../public"],
          "addons": []
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `port` | `number` | Puerto del servidor de desarrollo | `6006` |
| `host` | `string` | Host del servidor | `localhost` |
| `buildDir` | `string` | Directorio de build estático | `storybook-static` |
| `configDir` | `string` | Directorio de configuración | `.storybook` |
| `storiesDir` | `string` | Directorio de stories | `stories` |
| `autoStart` | `boolean` | Iniciar automáticamente al activar | `false` |
| `framework` | `string` | Framework usado | `react` |
| `staticDirs` | `string[]` | Directorios estáticos | `[]` |
| `addons` | `string[]` | Add-ons adicionales | `[]` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Storybook
await hub.activateAddon('storybook');
```

### Iniciar Servidor de Desarrollo

```typescript
// Obtener servicio de Storybook
const start = hub.getService('storybook', 'start');

// Iniciar servidor
const process = await start();
console.log('Storybook disponible en:', process.url);
// http://localhost:6006
```

### Detener Servidor

```typescript
const stop = hub.getService('storybook', 'stop');
stop();
```

### Build Estático

```typescript
const build = hub.getService('storybook', 'build');

// Hacer build
const buildPath = await build();
console.log('Build completado en:', buildPath);
```

### Generar Story para un Componente

```typescript
const generateStory = hub.getService('storybook', 'generateStory');

// Generar story básica
await generateStory('Button', {
  componentPath: '../components/Button',
  category: 'Components',
  args: {
    label: 'Click me',
    variant: 'primary'
  }
});
```

### Generar Configuración de Storybook

```typescript
const generateConfig = hub.getService('storybook', 'generateConfig');

// Generar configuración básica
await generateConfig();
// Crea .storybook/main.ts y .storybook/preview.ts
```

## 🔌 Hooks Automáticos

El add-on de Storybook se integra automáticamente con el Hub:

### `onFileChange`
Se llama cuando un archivo cambia:
```typescript
// Storybook tiene hot reload automático
// Trackea cambios de stories en Clarity (si está disponible)
```

### `onBeforeDeploy`
Se llama antes de hacer deploy:
```typescript
// Automáticamente hace build de Storybook antes de deploy
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `start` | Inicia el servidor de desarrollo | `() => Promise<StorybookProcess>` |
| `stop` | Detiene el servidor | `() => void` |
| `build` | Hace build estático | `() => Promise<string>` |
| `generateStory` | Genera una story para un componente | `(componentName: string, options?) => Promise<string>` |
| `generateConfig` | Genera configuración básica | `() => Promise<void>` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración actual | `() => StorybookConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<StorybookConfig>)` |

## 📝 Ejemplos de Uso

### Desarrollo con Auto-start

```typescript
// Configurar auto-start
await hub.configureAddon('storybook', {
  autoStart: true,
  port: 6006
});

// Activar add-on (inicia automáticamente)
await hub.activateAddon('storybook');
// Storybook se inicia automáticamente en http://localhost:6006
```

### Build antes de Deploy

```typescript
// Configurar para hacer build antes de deploy
await hub.activateAddon('storybook');

// Cuando hagas deploy con Vercel, Storybook hace build automáticamente
const deploy = hub.getService('vercel', 'deploy');
await deploy({ target: 'production' });
// Storybook build se ejecuta automáticamente antes del deploy
```

### Generar Stories para Múltiples Componentes

```typescript
const generateStory = hub.getService('storybook', 'generateStory');

const components = ['Button', 'Input', 'Card', 'Modal'];

for (const component of components) {
  await generateStory(component, {
    componentPath: `../components/${component}`,
    category: 'Components'
  });
}
```

### Integración con Componentes del Hub

```typescript
// Generar story para un componente del Hub
const components = hub.getRegisteredComponents();

for (const component of components) {
  await generateStory(component.name, {
    componentPath: component.path,
    category: 'Hub Components'
  });
}
```

## 🐛 Troubleshooting

### Error: "Storybook no está instalado"

1. Instala Storybook en tu proyecto:
```bash
npm install --save-dev @storybook/react-webpack5 @storybook/addon-essentials
```

2. O instala el framework que necesites (Vue, Angular, etc.)

### Error al iniciar servidor

1. Verifica que el puerto esté disponible:
```bash
lsof -i :6006
```

2. Cambia el puerto en la configuración:
```json
{
  "storybook": {
    "port": 6007
  }
}
```

### Build falla

1. Verifica que tengas todas las dependencias instaladas
2. Verifica que la configuración de Storybook sea correcta
3. Ejecuta manualmente: `npx storybook build` para ver errores detallados

### Stories no se generan

1. Verifica que el directorio `stories` exista
2. Verifica que tengas permisos de escritura
3. Verifica que el componente exista en la ruta especificada

## 📚 Referencias

- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook API](https://storybook.js.org/docs/api)
- [Storybook Addons](https://storybook.js.org/addons)

## ⚛️ React 19 Support

Este add-on soporta **React 19** completamente. Puedes usar todas las nuevas características de React 19 en tus componentes y stories:

### Características Disponibles

- ✅ **Server Components** - Componentes del servidor
- ✅ **Actions** - Nuevo sistema de acciones
- ✅ **use() Hook** - Hook para promises y contextos
- ✅ **Mejoras en Suspense** - Mejor manejo de estados asíncronos
- ✅ **Optimizaciones de Rendering** - Mejor performance

### Ejemplo con React 19

```typescript
// stories/MyComponent.stories.tsx
import { use } from 'react';
import { MyComponent } from './MyComponent';

// Usando use() hook con promises
function AsyncWrapper() {
  const data = use(fetchData());
  return <MyComponent data={data} />;
}

export default {
  component: AsyncWrapper,
  title: 'Components/MyComponent',
};
```

### Nota Importante

**El Hub de Autorun permanece agnóstico de React** - Solo Storybook usa React 19. Esto significa:
- ✅ El Hub no requiere React como dependencia
- ✅ Puedes usar React 19 en Storybook sin afectar el Hub
- ✅ Otros proyectos pueden usar Vue, Angular, etc.
- ✅ Máxima flexibilidad y compatibilidad

Ver `ANALISIS-REACT-19.md` en la raíz del proyecto para más detalles sobre la arquitectura.

## 🔗 Integración con Otros Add-ons

Storybook se integra automáticamente con:
- **Vercel Add-on**: Build automático antes de deploy
- **Clarity Add-on**: Trackea cambios de stories
- **Component Add-ons**: Genera stories automáticamente para componentes del Hub

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**React 19**: ✅ Soportado

