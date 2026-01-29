# 📝 Feedback Automatizado Add-on

Sistema completo de recopilación de feedback con overlay de bienvenida, botón flotante, modal interactivo y sistema de mask/onboarding.

## ✨ Características

- ✅ **Overlay de Bienvenida**: Pantalla de bienvenida personalizable al iniciar
- ✅ **Botón Flotante**: Botón siempre visible para dejar feedback
- ✅ **Modal Interactivo**: Formulario de feedback con detección automática de sección
- ✅ **Indicador de Sección**: Muestra la sección actual en tiempo real
- ✅ **Tracking Automático**: Detecta automáticamente la sección por URL o scroll
- ✅ **Sistema de Mask/Onboarding**: Guía interactiva tipo Userpilot (opcional)
- ✅ **Persistencia Local**: Guarda feedback localmente si falla el envío
- ✅ **Metadata Automática**: Captura información del navegador, resolución, etc.
- ✅ **Reintentos Automáticos**: Reintenta envío de feedback pendiente

## 📦 Instalación

El add-on ya está incluido en el proyecto. Solo necesitas activarlo:

```bash
npm run addon:activate feedback-automatizado
```

## 🚀 Setup Completo (n8n + Google Sheets)

### Opción 1: Setup Automático (Recomendado)

Ejecuta el script de setup que genera todo lo necesario:

```bash
cd packages/addons/functional/feedback
npm install
npm run setup-feedback setup
```

Esto generará:
- ✅ Flujo de n8n como JSON (`n8n-feedback-workflow.json`)
- ✅ Instrucciones para crear Google Sheet
- ✅ Configuración de ejemplo

### Opción 2: Setup Manual

#### Paso 1: Generar Flujo de n8n

```bash
npm run setup-feedback generate-n8n "Mi Proyecto" ./n8n-workflow.json
```

Esto crea un archivo JSON que puedes importar directamente en n8n:

1. Abre tu instancia de n8n
2. Ve a **Workflows** > **Import from File**
3. Selecciona el archivo `n8n-workflow.json`
4. Configura las credenciales de Google Sheets
5. Actualiza el ID del Google Sheet en el nodo "Append row in sheet"
6. Activa el workflow
7. Copia el **Webhook URL** que n8n te proporciona

#### Paso 2: Crear Google Sheet

**Opción A: Manual (Más fácil)**

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo documento
3. Nombra la primera fila con estos encabezados:
   ```
   user | section | comment | timestamp | ts_recibido
   ```
4. Copia el ID del documento desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```
5. Comparte el documento con el email de tu cuenta de servicio de Google (si usas OAuth en n8n)

**Opción B: Usando API de Google Sheets**

Si tienes credenciales de servicio de Google, puedes usar la API:

```typescript
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: 'tu-service-account@...',
    private_key: '-----BEGIN PRIVATE KEY-----...',
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const response = await sheets.spreadsheets.create({
  requestBody: {
    properties: {
      title: 'Feedback',
    },
    sheets: [
      {
        properties: {
          title: 'Hoja 1',
        },
      },
    ],
  },
});

const sheetId = response.data.spreadsheetId;
console.log('Sheet creado:', sheetId);
```

#### Paso 3: Configurar el Add-on

Agrega la configuración en `.ubits/project-config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "feedback-automatizado": {
          "enabled": true,
          "webhookUrl": "https://tu-n8n.app.n8n.cloud/webhook/feedback",
          "sectionOptions": ["Inicio", "Productos", "Contacto", "Otra"]
        }
      }
    }
  }
}
```

**Nota:** Reemplaza `webhookUrl` con el URL que te dio n8n después de activar el workflow.

## ⚙️ Configuración

Agrega la configuración en `.ubits/project-config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "feedback-automatizado": {
          "enabled": true,
          "webhookUrl": "https://tu-n8n.app.n8n.cloud/webhook/feedback",
          "showWelcome": true,
          "showFeedbackButton": true,
          "showSectionIndicator": true,
          "enableOnboarding": false,
          "welcomeTitle": "¡Bienvenido!",
          "welcomeSubtitle": "Estás a punto de probar esta aplicación. Usa el botón de feedback (💬) para dejar tus comentarios.",
          "welcomeFeatures": [
            "Funcionalidad 1",
            "Funcionalidad 2",
            "Funcionalidad 3"
          ],
          "feedbackButtonPosition": "bottom-right",
          "feedbackButtonIcon": "💬",
          "sectionOptions": [
            "Inicio",
            "Sección A",
            "Sección B",
            "Otra"
          ],
          "autoDetectSection": true,
          "collectMetadata": true,
          "persistLocally": true
        }
      }
    }
  }
}
```

### 🔗 Integración con n8n

El add-on está diseñado para funcionar con un flujo de n8n que:
1. **Recibe el feedback** vía webhook POST
2. **Guarda en Google Sheets** con las columnas: `user`, `section`, `comment`, `timestamp`, `ts_recibido`
3. **Analiza con Gemini** (opcional, programado)
4. **Envía a Slack** como boletín (opcional, programado)

**Estructura esperada por n8n:**
```json
{
  "user": "Usuario_1234567890_abc123",
  "section": "Inicio",
  "comment": "El diseño está muy bien, pero falta mejorar la navegación",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Nota:** n8n agregará automáticamente `ts_recibido` con la fecha/hora de recepción.

## 🎯 Uso

### Activar el add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();
await hub.activateAddon('feedback-automatizado');
```

### Usar los servicios

```typescript
const feedbackServices = hub.getAddonServices('feedback-automatizado');

// Abrir modal de feedback
feedbackServices.openFeedbackModal();

// Cerrar modal
feedbackServices.closeFeedbackModal();

// Actualizar sección manualmente
feedbackServices.updateCurrentSection('Nueva Sección');

// Obtener estado
const status = feedbackServices.getStatus();
console.log(status);
// → {
//     initialized: true,
//     enabled: true,
//     webhookUrl: "https://...",
//     currentSection: "Dashboard Principal",
//     pendingFeedback: 0
//   }
```

## 📋 Opciones de Configuración

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `webhookUrl` | `string` | `''` | URL del webhook para enviar feedback |
| `enabled` | `boolean` | `true` | Habilitar/deshabilitar el sistema |
| `showWelcome` | `boolean` | `true` | Mostrar overlay de bienvenida |
| `showFeedbackButton` | `boolean` | `true` | Mostrar botón flotante |
| `showSectionIndicator` | `boolean` | `true` | Mostrar indicador de sección |
| `enableOnboarding` | `boolean` | `false` | Habilitar sistema de onboarding/mask |
| `welcomeTitle` | `string` | `'¡Bienvenido!'` | Título del overlay de bienvenida |
| `welcomeSubtitle` | `string` | `'...'` | Subtítulo del overlay |
| `welcomeFeatures` | `string[]` | `[]` | Lista de características a mostrar |
| `feedbackButtonPosition` | `string` | `'bottom-right'` | Posición del botón (`bottom-right`, `bottom-left`, `top-right`, `top-left`) |
| `feedbackButtonIcon` | `string` | `'💬'` | Icono del botón de feedback |
| `sectionOptions` | `string[]` | `[...]` | Opciones de sección en el formulario |
| `autoDetectSection` | `boolean` | `true` | Detectar sección automáticamente |
| `collectMetadata` | `boolean` | `true` | Capturar metadata del navegador |
| `persistLocally` | `boolean` | `true` | Guardar feedback en localStorage |

## 🔄 Flujo de Funcionamiento

1. **Inicialización**: Se crea el overlay de bienvenida (si está habilitado)
2. **Bienvenida**: Usuario hace clic en "Comenzar" → se oculta el overlay
3. **Botón Flotante**: Aparece el botón 💬 en la esquina
4. **Click en Botón**: Se abre el modal de feedback
5. **Detección de Sección**: Se detecta automáticamente la sección actual
6. **Envío**: Usuario escribe comentario y envía
7. **Procesamiento**: 
   - Se guarda localmente (si está habilitado)
   - Se envía al webhook
   - Se muestra confirmación

## 📊 Datos Enviados

El feedback se envía al webhook con la siguiente estructura (campos mínimos requeridos por n8n):

```json
{
  "user": "Usuario_1234567890_abc123",
  "section": "Inicio",
  "comment": "El diseño está muy bien, pero falta mejorar la navegación",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "url": "https://ejemplo.com/dashboard"
}
```

**Campos adicionales** (si `collectMetadata: true`):
- `userAgent`: Información del navegador
- `screenResolution`: Resolución de pantalla
- `viewport`: Tamaño del viewport
- `referrer`: URL de origen
- `sessionId`: ID de sesión único

**Nota:** n8n agregará automáticamente `ts_recibido` cuando reciba el feedback.

## 🎨 Personalización

### Ejemplo: Configuración para NOM-035

```json
{
  "autorun": {
    "addons": {
      "config": {
        "feedback-automatizado": {
          "enabled": true,
          "webhookUrl": "https://egarcia.app.n8n.cloud/webhook/feedback",
          "showWelcome": true,
          "welcomeTitle": "¡Bienvenido al Prototipo NOM-035!",
          "welcomeSubtitle": "Estás a punto de probar esta aplicación.",
          "welcomeFeatures": [
            "Resultados de Acontecimientos traumáticos",
            "Resultados Riesgo psicosocial",
            "Vista General",
            "Descarga de Reportes"
          ],
          "sectionOptions": [
            "Dashboard Principal",
            "Resultados de Acontecimientos traumáticos",
            "Resultados Riesgo psicosocial",
            "Vista General",
            "Descarga de Reportes",
            "Otra"
          ],
          "autoDetectSection": true
        }
      }
    }
  }
}
```

### Cambiar posición del botón

```json
{
  "feedbackButtonPosition": "bottom-left"
}
```

### Cambiar icono del botón

```json
{
  "feedbackButtonIcon": "📝"
}
```

### Personalizar bienvenida

```json
{
  "welcomeTitle": "¡Bienvenido a Mi App!",
  "welcomeSubtitle": "Estás a punto de explorar todas las funcionalidades.",
  "welcomeFeatures": [
    "Funcionalidad 1",
    "Funcionalidad 2",
    "Funcionalidad 3"
  ]
}
```

## 🐛 Troubleshooting

### El botón no aparece

- Verifica que `showFeedbackButton: true` en la configuración
- Verifica que el overlay de bienvenida se haya cerrado
- Revisa la consola del navegador para errores

### El feedback no se envía

- Verifica que `webhookUrl` esté configurado correctamente
- Revisa la consola del navegador para errores de red
- El feedback se guarda localmente como respaldo

### La sección no se detecta automáticamente

- Verifica que `autoDetectSection: true`
- Agrega atributos `data-section` a los elementos
- Usa `updateCurrentSection()` manualmente si es necesario

## 📝 Licencia

Este add-on es parte del proyecto Autorun y está bajo la misma licencia.

