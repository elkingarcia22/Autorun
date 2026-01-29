# 🚀 Setup Completo del Sistema de Feedback

Esta guía te explica cómo configurar todo el sistema de feedback automatizado desde cero.

## 📋 Resumen del Flujo

```
Frontend (Add-on) 
    ↓
n8n Webhook 
    ↓
Google Sheets (Almacenamiento)
    ↓
Gemini AI (Análisis - opcional)
    ↓
Slack (Boletín - opcional)
```

## 🎯 Paso 1: Setup del Frontend (Add-on)

### 1.1 Activar el Add-on

```bash
# En tu proyecto
npm run addon:activate feedback-automatizado
```

### 1.2 Configurar el Add-on

Edita `.ubits/project-config.json`:

```json
{
  "autorun": {
    "addons": {
      "config": {
        "feedback-automatizado": {
          "enabled": true,
          "webhookUrl": "{{TU_WEBHOOK_URL}}",  // Lo obtendrás después del paso 2
          "showWelcome": true,
          "showFeedbackButton": true,
          "sectionOptions": [
            "Inicio",
            "Sección A",
            "Sección B",
            "Otra"
          ]
        }
      }
    }
  }
}
```

## 🔗 Paso 2: Setup de n8n

### 2.1 Generar el Flujo de n8n

```bash
cd packages/addons/functional/feedback
npm install
npm run setup-feedback generate-n8n "Mi Proyecto" ./n8n-workflow.json
```

### 2.2 Importar en n8n

1. Abre tu instancia de n8n (local o cloud)
2. Ve a **Workflows** > **Import from File**
3. Selecciona el archivo `n8n-workflow.json` generado
4. El workflow se importará con estos nodos:
   - **Webhook**: Recibe el feedback del frontend
   - **Edit Fields**: Formatea los datos
   - **Append row in sheet**: Guarda en Google Sheets
   - **Respond to Webhook**: Responde al frontend

### 2.3 Configurar Credenciales

1. **Google Sheets OAuth2**:
   - Haz clic en el nodo "Append row in sheet"
   - Configura las credenciales de Google Sheets
   - Autoriza el acceso a Google Sheets

2. **Actualizar Google Sheet ID**:
   - En el nodo "Append row in sheet", reemplaza `{{GOOGLE_SHEET_ID}}` con el ID de tu Google Sheet
   - (El ID lo obtendrás en el Paso 3)

### 2.4 Activar el Workflow

1. Haz clic en el botón **Active** en la esquina superior derecha
2. Copia el **Webhook URL** que aparece
3. Actualiza `webhookUrl` en tu configuración del add-on (Paso 1.2)

## 📊 Paso 3: Crear Google Sheet

### Opción A: Manual (Recomendado para empezar)

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
5. Comparte el documento con el email de tu cuenta de servicio de Google
   - Si usas OAuth en n8n, comparte con el email de esa cuenta
   - Si usas Service Account, comparte con el email del service account

### Opción B: Usando API de Google Sheets

Si tienes credenciales de servicio de Google:

```bash
npm install googleapis
```

```typescript
import { google } from 'googleapis';
import { readFileSync } from 'fs';

// Cargar credenciales
const credentials = JSON.parse(
  readFileSync('./path/to/service-account-key.json', 'utf-8')
);

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Crear el sheet
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
console.log('✅ Sheet creado:', sheetId);
console.log('URL:', `https://docs.google.com/spreadsheets/d/${sheetId}/edit`);

// Agregar encabezados
await sheets.spreadsheets.values.update({
  spreadsheetId: sheetId,
  range: 'Hoja 1!A1:E1',
  valueInputOption: 'RAW',
  requestBody: {
    values: [['user', 'section', 'comment', 'timestamp', 'ts_recibido']],
  },
});

console.log('✅ Encabezados agregados');
```

## 🤖 Paso 4: Análisis con Gemini (Opcional)

El flujo de n8n incluye un análisis automático con Gemini que se ejecuta cada viernes a las 8am.

### 4.1 Configurar Gemini API Key

1. Obtén tu API Key de [Google AI Studio](https://makersuite.google.com/app/apikey)
2. En n8n, agrega la variable de entorno `GEMINI_API_KEY`
3. O actualiza el nodo "HTTP Request" con tu API key

### 4.2 Configurar el Schedule Trigger

El nodo "Schedule Trigger" está configurado para ejecutarse cada viernes a las 8am. Puedes ajustarlo según tus necesidades.

## 📢 Paso 5: Notificaciones en Slack (Opcional)

### 5.1 Configurar Slack

1. En n8n, configura las credenciales de Slack OAuth2
2. Actualiza el `channelId` en el nodo "Send a message"
3. El boletín se enviará automáticamente después del análisis de Gemini

## ✅ Verificación

### Probar el Sistema

1. **Frontend**: Abre tu aplicación y haz clic en el botón de feedback 💬
2. **Enviar Feedback**: Completa el formulario y envía
3. **Verificar n8n**: Revisa la ejecución del workflow en n8n
4. **Verificar Google Sheets**: Abre tu Google Sheet y verifica que el feedback se guardó

### Estructura de Datos en Google Sheets

Cada fila debería tener:
- `user`: ID del usuario (ej: "Usuario_1234567890_abc123")
- `section`: Sección donde se dejó el feedback (ej: "Inicio")
- `comment`: El comentario del usuario
- `timestamp`: Timestamp ISO del frontend
- `ts_recibido`: Timestamp cuando n8n recibió el feedback

## 🔧 Troubleshooting

### El feedback no llega a n8n

- Verifica que el `webhookUrl` esté correcto
- Verifica que el workflow esté activo en n8n
- Revisa los logs de n8n para ver errores

### El feedback no se guarda en Google Sheets

- Verifica las credenciales de Google Sheets en n8n
- Verifica que el Google Sheet ID sea correcto
- Verifica que el documento esté compartido con la cuenta correcta

### El análisis de Gemini no funciona

- Verifica que la API Key de Gemini sea válida
- Verifica que el Schedule Trigger esté configurado correctamente
- Revisa los logs de n8n

## 📚 Recursos Adicionales

- [Documentación de n8n](https://docs.n8n.io/)
- [API de Google Sheets](https://developers.google.com/sheets/api)
- [API de Google Gemini](https://ai.google.dev/docs)
