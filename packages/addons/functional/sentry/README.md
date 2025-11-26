# 🐛 Sentry Error Monitoring Add-on

Add-on funcional de **Sentry** para Autorun que proporciona monitoreo profesional de errores y performance.

## 🎯 Características

- ✅ **Captura automática de errores** - Detecta y reporta errores automáticamente
- ✅ **Monitoreo de performance** - Trazas de transacciones y rendimiento
- ✅ **Breadcrumbs** - Rastrea acciones del usuario para debugging
- ✅ **Contexto de usuario** - Identifica usuarios y sesiones
- ✅ **Tags y contexto personalizado** - Agrega metadata a los errores
- ✅ **Compatibilidad multiplataforma** - Funciona en navegador y Node.js
- ✅ **Soporte React** - Detecta y usa @sentry/react si está disponible
- ✅ **Integración con Hub** - Hooks automáticos para errores y deployments
- ✅ **Configuración flexible** - Múltiples opciones de configuración

## 📦 Instalación

### 1. Instalar el SDK de Sentry

El add-on requiere instalar el SDK de Sentry correspondiente según tu entorno:

#### Para Navegador (Vanilla JS):
```bash
npm install @sentry/browser
```

#### Para React:
```bash
npm install @sentry/react
```

#### Para Node.js:
```bash
npm install @sentry/node
```

### 2. Obtener DSN de Sentry

1. Crea una cuenta en [sentry.io](https://sentry.io)
2. Crea un nuevo proyecto
3. Copia el DSN que te proporcionan

## ⚙️ Configuración

Agrega la configuración de Sentry en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "sentry": {
          "dsn": "https://tu-dsn@sentry.io/proyecto-id",
          "environment": "production",
          "release": "1.0.0",
          "tracesSampleRate": 1.0,
          "sampleRate": 1.0,
          "enabled": true,
          "debug": false,
          "maxBreadcrumbs": 50,
          "user": {
            "id": "user-123",
            "email": "usuario@example.com"
          },
          "tags": {
            "version": "1.0.0",
            "environment": "production"
          },
          "extra": {
            "customData": "valor"
          }
        }
      }
    }
  }
}
```

### Variables de Entorno (Alternativa)

También puedes configurar Sentry usando variables de entorno:

```bash
export SENTRY_DSN="https://tu-dsn@sentry.io/proyecto-id"
export SENTRY_RELEASE="1.0.0"
export NODE_ENV="production"
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `dsn` | `string` | **Requerido** - DSN de Sentry | - |
| `environment` | `string` | Entorno (production, development, staging) | `production` |
| `release` | `string` | Versión del release | - |
| `tracesSampleRate` | `number` | Tasa de muestreo para performance (0-1) | `1.0` |
| `sampleRate` | `number` | Tasa de muestreo para errores (0-1) | `1.0` |
| `enabled` | `boolean` | Habilitar/deshabilitar Sentry | `true` |
| `debug` | `boolean` | Modo debug (más logs) | `false` |
| `attachStacktrace` | `boolean` | Adjuntar stack trace a errores | `true` |
| `maxBreadcrumbs` | `number` | Máximo de breadcrumbs | `50` |
| `user` | `object` | Información del usuario | - |
| `tags` | `object` | Tags personalizados | - |
| `extra` | `object` | Contexto adicional | - |
| `beforeSend` | `function` | Función para filtrar/modificar eventos | - |
| `integrations` | `array` | Integraciones personalizadas | - |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Sentry
await hub.activateAddon('sentry');
```

### Capturar Errores Manualmente

```typescript
// Obtener servicio de captura
const captureException = hub.getService('sentry', 'captureException');

try {
  // Tu código que puede fallar
  riskyOperation();
} catch (error) {
  // Capturar error en Sentry
  captureException(error, {
    userId: 'user-123',
    action: 'riskyOperation',
    metadata: { /* datos adicionales */ }
  });
}
```

### Capturar Mensajes

```typescript
const captureMessage = hub.getService('sentry', 'captureMessage');

// Mensaje informativo
captureMessage('Usuario completó acción importante', 'info', {
  userId: 'user-123',
  action: 'completed_checkout'
});

// Mensaje de advertencia
captureMessage('Límite de uso alcanzado', 'warning', {
  userId: 'user-123',
  limit: 1000
});

// Mensaje de error
captureMessage('Operación falló', 'error', {
  userId: 'user-123',
  operation: 'payment'
});
```

### Agregar Breadcrumbs

```typescript
const addBreadcrumb = hub.getService('sentry', 'addBreadcrumb');

// Rastrear acciones del usuario
addBreadcrumb({
  message: 'Usuario hizo clic en botón',
  category: 'user',
  level: 'info',
  data: {
    buttonId: 'checkout-button',
    page: '/checkout'
  }
});
```

### Establecer Usuario

```typescript
const setUser = hub.getService('sentry', 'setUser');

// Cuando el usuario hace login
setUser({
  id: 'user-123',
  email: 'usuario@example.com',
  username: 'johndoe',
  plan: 'premium'
});

// Cuando el usuario hace logout
setUser(null);
```

### Establecer Tags y Contexto

```typescript
const setTag = hub.getService('sentry', 'setTag');
const setContext = hub.getService('sentry', 'setContext');

// Tags para filtrar en Sentry
setTag('version', '1.0.0');
setTag('environment', 'production');
setTag('feature', 'checkout');

// Contexto adicional
setContext('checkout', {
  cartValue: 99.99,
  itemCount: 3,
  paymentMethod: 'credit_card'
});
```

### Monitoreo de Performance

```typescript
const startTransaction = hub.getService('sentry', 'startTransaction');

// Iniciar transacción
const transaction = startTransaction('checkout-process', 'navigation');

// Tu código aquí
await processCheckout();

// Finalizar transacción
transaction.finish();
```

## 🔌 Hooks Automáticos

El add-on de Sentry se integra automáticamente con el Hub:

### `onError`
Se llama cuando ocurre un error:
```typescript
// El add-on captura automáticamente los errores
```

### `onFileChange`
Se llama cuando un archivo cambia:
```typescript
// Agrega breadcrumb automáticamente
```

### `onBeforeDeploy` / `onAfterDeploy`
Se llama antes y después de deployments:
```typescript
// Rastrea deployments automáticamente
// Establece tags de release
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `captureException` | Captura una excepción | `(error: Error, context?: object) => string\|undefined` |
| `captureMessage` | Captura un mensaje | `(message: string, level?: 'info'\|'warning'\|'error', context?: object) => string\|undefined` |
| `addBreadcrumb` | Agrega un breadcrumb | `(breadcrumb: object) => void` |
| `setUser` | Establece el usuario actual | `(user: object\|null) => void` |
| `setTag` | Establece un tag | `(key: string, value: string) => void` |
| `setContext` | Establece contexto adicional | `(name: string, context: object) => void` |
| `startTransaction` | Inicia transacción de performance | `(name: string, op: string) => Transaction` |
| `getStatus` | Obtiene el estado actual | `() => SentryStatus` |
| `getConfig` | Obtiene la configuración | `() => SentryConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<SentryConfig>) => void` |

## 📝 Ejemplos de Uso

### Integración con Otros Add-ons

```typescript
// Capturar errores de GitHub
try {
  await githubService.commit();
} catch (error) {
  const captureException = hub.getService('sentry', 'captureException');
  captureException(error, {
    service: 'github',
    operation: 'commit'
  });
}

// Rastrear deployments de Vercel
hub.on('afterDeploy', async (deployInfo) => {
  const addBreadcrumb = hub.getService('sentry', 'addBreadcrumb');
  addBreadcrumb({
    message: 'Deploy completado en Vercel',
    category: 'deploy',
    level: 'info',
    data: deployInfo
  });
});
```

### Filtrado de Errores

```typescript
// Configurar beforeSend para filtrar errores
await hub.configureAddon('sentry', {
  beforeSend: (event) => {
    // Ignorar errores de extensiones del navegador
    if (event.exception?.values?.[0]?.type === 'ChromeExtensionError') {
      return null;
    }
    
    // Modificar evento antes de enviarlo
    event.tags = {
      ...event.tags,
      filtered: true
    };
    
    return event;
  }
});
```

### Monitoreo de Performance

```typescript
const startTransaction = hub.getService('sentry', 'startTransaction');

// Monitorear carga de página
const pageLoad = startTransaction('page-load', 'navigation');

window.addEventListener('load', () => {
  pageLoad.finish();
});

// Monitorear operaciones específicas
const apiCall = startTransaction('api-call', 'http.client');
try {
  const response = await fetch('/api/data');
  apiCall.setData('status', response.status);
} catch (error) {
  apiCall.setStatus('internal_error');
  throw error;
} finally {
  apiCall.finish();
}
```

## 🐛 Troubleshooting

### Sentry no se inicializa

1. Verifica que `dsn` esté configurado correctamente
2. Verifica que hayas instalado el SDK correspondiente (`@sentry/browser`, `@sentry/react`, o `@sentry/node`)
3. Revisa la consola para errores de inicialización
4. Verifica que `enabled` sea `true` en la configuración

### Errores no se capturan

1. Verifica que Sentry esté activado: `hub.getService('sentry', 'getStatus')`
2. Verifica que `dsn` sea válido
3. Verifica que no haya un `beforeSend` que esté filtrando todos los errores
4. Revisa la consola del navegador para errores de Sentry

### Performance monitoring no funciona

1. Verifica que `tracesSampleRate` sea mayor que 0
2. Verifica que las transacciones se estén finalizando correctamente con `.finish()`
3. Revisa la configuración de `tracesSampleRate` (debe estar entre 0 y 1)

### Errores en Node.js

1. Asegúrate de instalar `@sentry/node` en lugar de `@sentry/browser`
2. Verifica que estés usando el add-on en un contexto de Node.js
3. Revisa la configuración de `environment` y `release`

## 📚 Referencias

- [Sentry Documentation](https://docs.sentry.io/)
- [Sentry for JavaScript](https://docs.sentry.io/platforms/javascript/)
- [Sentry for React](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry for Node.js](https://docs.sentry.io/platforms/node/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)

## 🔗 Integración con Otros Add-ons

Sentry se integra automáticamente con:
- **GitHub Add-on**: Captura errores de operaciones Git
- **Vercel Add-on**: Rastrea deployments y errores de build
- **Clarity Add-on**: Complementa analytics con monitoreo de errores técnicos
- **Todos los add-ons**: Captura errores automáticamente mediante hooks

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024

