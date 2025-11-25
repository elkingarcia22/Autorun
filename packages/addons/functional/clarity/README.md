# 📊 Microsoft Clarity Analytics Add-on

Add-on funcional de **Microsoft Clarity** para Autorun que proporciona analytics, heatmaps y session recordings para tu aplicación.

## 🎯 Características

- ✅ **Analytics en tiempo real** - Tracking de eventos y comportamiento de usuarios
- ✅ **Heatmaps** - Visualización de clicks, scroll y interacciones
- ✅ **Session Recordings** - Grabación de sesiones de usuarios
- ✅ **Eventos personalizados** - Tracking de eventos específicos de tu aplicación
- ✅ **Identificación de usuarios** - Asociar eventos con usuarios específicos
- ✅ **Configuración flexible** - Máscaras de privacidad, consentimiento de cookies, etc.
- ✅ **Integración con Hub** - Hooks automáticos para cambios de archivos y deployments

## 📦 Instalación

El add-on ya está incluido en Autorun. Solo necesitas configurarlo en tu proyecto.

## ⚙️ Configuración

Agrega la configuración de Clarity en tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "clarity": {
          "projectId": "tu-project-id-de-clarity",
          "enabled": true,
          "cookieConsent": false,
          "trackClicks": true,
          "trackScroll": true,
          "trackHeatmaps": true,
          "trackRecordings": true,
          "maskText": false,
          "maskImages": false,
          "sampleRate": 1.0
        }
      }
    }
  }
}
```

### Parámetros de Configuración

| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `projectId` | `string` | **Requerido.** ID del proyecto de Clarity | - |
| `enabled` | `boolean` | Habilita o deshabilita Clarity | `true` |
| `cookieConsent` | `boolean` | Requiere consentimiento de cookies | `false` |
| `trackClicks` | `boolean` | Trackear clicks de usuarios | `true` |
| `trackScroll` | `boolean` | Trackear scroll de usuarios | `true` |
| `trackHeatmaps` | `boolean` | Habilitar heatmaps | `true` |
| `trackRecordings` | `boolean` | Habilitar session recordings | `true` |
| `maskText` | `boolean` | Enmascarar texto en recordings | `false` |
| `maskImages` | `boolean` | Enmascarar imágenes en recordings | `false` |
| `sampleRate` | `number` | Tasa de muestreo (0.0 - 1.0) | `1.0` |

## 🚀 Uso

### Activar el Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar Clarity
await hub.activateAddon('clarity');
```

### Usar Servicios del Add-on

```typescript
// Obtener servicio de tracking de eventos
const trackEvent = hub.getService('clarity', 'trackEvent');

// Trackear un evento personalizado
trackEvent('button_clicked', {
  buttonId: 'submit-button',
  page: '/checkout',
  timestamp: new Date().toISOString()
});

// Identificar un usuario
const identify = hub.getService('clarity', 'identify');
identify('user-123', {
  email: 'usuario@example.com',
  plan: 'premium'
});

// Obtener estado
const getStatus = hub.getService('clarity', 'getStatus');
const status = getStatus();
console.log('Clarity Status:', status);
```

### Tracking de Eventos Personalizados

```typescript
// En cualquier parte de tu aplicación
const clarityService = hub.getService('clarity', 'trackEvent');

// Evento de compra
clarityService('purchase_completed', {
  orderId: '12345',
  amount: 99.99,
  currency: 'USD',
  items: ['product-1', 'product-2']
});

// Evento de navegación
clarityService('page_view', {
  page: '/products',
  referrer: '/home'
});

// Evento de interacción
clarityService('form_submitted', {
  formId: 'contact-form',
  fields: ['name', 'email', 'message']
});
```

### Configuración Dinámica

```typescript
// Actualizar configuración en tiempo de ejecución
const updateConfig = hub.getService('clarity', 'updateConfig');
updateConfig({
  maskText: true,  // Enmascarar texto para privacidad
  maskImages: true // Enmascarar imágenes para privacidad
});

// Habilitar/deshabilitar
const setEnabled = hub.getService('clarity', 'setEnabled');
setEnabled(false); // Deshabilitar temporalmente
```

## 🔌 Hooks Automáticos

El add-on de Clarity se integra automáticamente con el Hub y reacciona a eventos:

### `onFileChange`
Se llama cuando un archivo cambia (solo en desarrollo):
```typescript
// Automáticamente trackea cambios de archivos en desarrollo
```

### `onAfterDeploy`
Se llama después de un deployment:
```typescript
// Automáticamente trackea deployments con la URL
```

## 📊 Dashboard de Clarity

Una vez configurado, puedes ver tus analytics en:
- **Dashboard**: https://clarity.microsoft.com/
- **Heatmaps**: Visualización de clicks y scroll
- **Recordings**: Sesiones grabadas de usuarios
- **Insights**: Análisis automático de comportamiento

## 🔒 Privacidad y Cumplimiento

### Máscaras de Privacidad

Para cumplir con regulaciones de privacidad (GDPR, CCPA), puedes enmascarar datos sensibles:

```json
{
  "clarity": {
    "maskText": true,    // Enmascarar todo el texto
    "maskImages": true   // Enmascarar todas las imágenes
  }
}
```

### Consentimiento de Cookies

```json
{
  "clarity": {
    "cookieConsent": true  // Requiere consentimiento antes de trackear
  }
}
```

## 🛠️ Servicios Disponibles

| Servicio | Descripción | Parámetros |
|----------|-------------|------------|
| `trackEvent` | Trackea un evento personalizado | `(eventName: string, properties?: Record<string, any>)` |
| `identify` | Identifica un usuario | `(userId: string, properties?: Record<string, any>)` |
| `getStatus` | Obtiene el estado actual | `() => Status` |
| `getConfig` | Obtiene la configuración actual | `() => ClarityConfig` |
| `updateConfig` | Actualiza la configuración | `(config: Partial<ClarityConfig>)` |
| `setEnabled` | Habilita/deshabilita Clarity | `(enabled: boolean)` |

## 📝 Ejemplos de Uso

### E-commerce

```typescript
// Trackear evento de agregar al carrito
clarityService.trackEvent('add_to_cart', {
  productId: 'prod-123',
  productName: 'Producto Ejemplo',
  price: 29.99,
  quantity: 1
});

// Trackear evento de checkout
clarityService.trackEvent('checkout_started', {
  cartValue: 99.99,
  itemCount: 3
});
```

### SaaS

```typescript
// Identificar usuario al hacer login
clarityService.identify('user-123', {
  email: 'usuario@example.com',
  plan: 'premium',
  signupDate: '2024-01-15'
});

// Trackear evento de feature usage
clarityService.trackEvent('feature_used', {
  feature: 'export_data',
  userId: 'user-123'
});
```

## 🐛 Troubleshooting

### Clarity no se inicializa

1. Verifica que `projectId` esté configurado correctamente
2. Verifica que estés en un entorno de navegador (no Node.js)
3. Revisa la consola del navegador para errores

### Eventos no se trackean

1. Verifica que Clarity esté activado: `hub.getService('clarity', 'getStatus')`
2. Verifica que `enabled` sea `true` en la configuración
3. Verifica que el script de Clarity se haya cargado correctamente

### Problemas de privacidad

1. Configura `maskText: true` y `maskImages: true` si es necesario
2. Configura `cookieConsent: true` para cumplir con GDPR
3. Revisa la documentación de Clarity sobre privacidad

## 📚 Referencias

- [Microsoft Clarity Documentation](https://docs.microsoft.com/en-us/clarity/)
- [Clarity Dashboard](https://clarity.microsoft.com/)
- [Clarity API Reference](https://docs.microsoft.com/en-us/clarity/setup-and-installation/clarity-api)

## 🔗 Integración con Otros Add-ons

Clarity se integra automáticamente con:
- **GitHub Add-on**: Trackea deployments automáticamente
- **Vercel Add-on**: Trackea deployments de Vercel
- Cualquier add-on que use `onAfterDeploy`

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024

