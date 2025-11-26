# 🤖 Setup Automatizado Robusto desde Cursor

Este documento explica cómo usar el script robusto que **automatiza TODO** si se proporcionan las APIs y credenciales, o **guía paso a paso** para hacerlo manualmente descargando el JSON completo.

## 🎯 ¿Qué se puede automatizar?

### ✅ **Totalmente Automatizable:**

1. **Crear Google Sheet** - Si tienes credenciales de Service Account
2. **Generar workflow de n8n** - Siempre automático
3. **Actualizar configuración del proyecto** - Siempre automático
4. **Importar workflow en n8n** - Si tienes acceso a la API de n8n

### ⚠️ **Parcialmente Automatizable:**

1. **Configurar credenciales en n8n** - Requiere intervención manual (OAuth)
2. **Obtener Webhook URL** - Se puede automatizar si usas API de n8n

### ❌ **Requiere Intervención Manual:**

1. **Autorizar Google Sheets OAuth en n8n** - Primera vez requiere navegador
2. **Configurar Slack OAuth en n8n** - Requiere autorización manual

## 🚀 Uso del Script Automatizado Robusto

### Características del Script

El script es **inteligente y robusto**:

✅ **Si proporcionas todas las credenciales:**
- Crea Google Sheet automáticamente
- Genera workflow completo con IA y Slack
- Importa workflow en n8n automáticamente
- Activa el workflow
- Obtiene Webhook URL
- Actualiza configuración del proyecto
- **TODO automático, sin intervención manual**

⚠️ **Si faltan credenciales:**
- Genera el workflow JSON completo (siempre)
- Te guía paso a paso para cada proceso manual
- Genera guía detallada con todos los pasos
- Guarda resumen en `feedback-setup-summary.json`

### Opción 1: Setup Interactivo Completo (Recomendado)

```bash
cd packages/addons/functional/feedback
npm install
npm run auto-setup
```

El script:
1. **Pregunta por información básica** (nombre del proyecto, secciones)
2. **Intenta automatizar Google Sheets** (si tienes credenciales)
3. **Genera workflow completo** (siempre, con IA y Slack)
4. **Intenta importar en n8n** (si tienes API)
5. **Actualiza configuración** (si todo está listo)
6. **Genera guía manual** (si algo falta)

### Opción 2: Setup con Variables de Entorno

```bash
# Configurar variables
export GOOGLE_CREDENTIALS_PATH="./path/to/service-account.json"
export N8N_API_URL="https://tu-n8n.app.n8n.cloud"
export N8N_API_KEY="tu-api-key"
export GEMINI_API_KEY="tu-gemini-key"
export SLACK_CHANNEL_ID="C09MZ8E2EER"

# Ejecutar setup
npm run auto-setup
```

## 📋 Requisitos para Automatización Completa

### 1. Google Sheets - Service Account

**Para automatizar la creación del Google Sheet:**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o selecciona uno existente
3. Habilita la **Google Sheets API**
4. Crea una **Service Account**:
   - Ve a **IAM & Admin** > **Service Accounts**
   - Clic en **Create Service Account**
   - Dale un nombre y crea una clave JSON
5. Descarga el archivo JSON de credenciales
6. Comparte el Google Sheet (que crees manualmente o automáticamente) con el email del Service Account

**Ejemplo de uso:**
```bash
npm run auto-setup
# Cuando pregunte por credenciales, proporciona la ruta al JSON
```

### 2. n8n API Access

**Para automatizar la importación del workflow:**

1. Si usas **n8n Cloud**:
   - Ve a tu perfil > **API**
   - Genera una nueva API Key
   - Copia la URL de tu instancia (ej: `https://tu-n8n.app.n8n.cloud`)

2. Si usas **n8n Self-hosted**:
   - Configura la API en tu instancia
   - Asegúrate de tener `N8N_API_KEY` configurado
   - La URL será tu dominio (ej: `https://n8n.tudominio.com`)

**Nota:** La API de n8n puede requerir configuración adicional dependiendo de tu versión.

## 🔧 Configuración Manual Necesaria

Aunque el script automatiza mucho, algunos pasos requieren intervención manual:

### 1. Configurar OAuth en n8n (Primera vez)

Después de importar el workflow:

1. Abre el workflow en n8n
2. Haz clic en el nodo **"Append row in sheet"**
3. Configura las credenciales de **Google Sheets OAuth2**:
   - Clic en **"Create New Credential"**
   - Autoriza el acceso a Google Sheets
   - Guarda las credenciales

4. Haz clic en el nodo **"Send a message"** (Slack)
5. Configura las credenciales de **Slack OAuth2**:
   - Clic en **"Create New Credential"**
   - Autoriza el acceso a Slack
   - Guarda las credenciales

### 2. Actualizar Google Sheet ID (si no se creó automáticamente)

Si el script no pudo crear el Google Sheet automáticamente:

1. Crea el Google Sheet manualmente
2. Copia el ID de la URL
3. En n8n, actualiza los nodos:
   - **"Get row(s) in sheet"**
   - **"Append row in sheet1"**
4. Reemplaza `{{GOOGLE_SHEET_ID}}` con el ID real

## 📝 Ejemplo de Flujo Completo

```bash
# 1. Instalar dependencias
cd packages/addons/functional/feedback
npm install

# 2. Ejecutar setup automatizado
npm run auto-setup

# El script preguntará:
# - Nombre del proyecto: "Mi Proyecto"
# - Secciones: "Inicio,Productos,Contacto,Otra"
# - ¿Tienes credenciales de Service Account? (s/n): s
# - Ruta a credenciales: ./credentials.json
# - API Key de Gemini: (opcional)
# - ID del canal de Slack: (opcional)
# - ¿Tienes acceso a API de n8n? (s/n): s
# - URL de n8n: https://tu-n8n.app.n8n.cloud
# - API Key de n8n: tu-api-key

# 3. El script hará:
# ✅ Crear Google Sheet
# ✅ Generar workflow
# ✅ Importar en n8n
# ✅ Actualizar configuración del proyecto

# 4. Pasos manuales restantes:
# - Configurar OAuth en n8n (una sola vez)
# - Activar el workflow si no se activó automáticamente
```

## 🎨 Personalización Avanzada

### Usar el script programáticamente

```typescript
import { FeedbackSetupService } from './src/FeedbackSetupService';
import { google } from 'googleapis';

// Crear Google Sheet
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
    properties: { title: 'Feedback' },
    sheets: [{ properties: { title: 'Hoja 1' } }],
  },
});

const sheetId = response.data.spreadsheetId!;

// Generar workflow con el sheet ID
const workflow = FeedbackSetupService.generateN8nWorkflow({
  projectName: 'Mi Proyecto',
  googleSheetId: sheetId,
  geminiApiKey: 'tu-api-key',
  slackChannelId: 'C09MZ8E2EER',
});
```

## 🐛 Troubleshooting

### Error: "Google Sheets API no habilitada"
- Ve a Google Cloud Console
- Habilita la Google Sheets API para tu proyecto

### Error: "n8n API no disponible"
- Verifica que tu instancia de n8n tenga la API habilitada
- Revisa que la API Key sea correcta
- Si usas n8n self-hosted, verifica la configuración de CORS

### El workflow se importa pero no se activa
- Actívalo manualmente desde la UI de n8n
- Verifica que no haya errores en los nodos

## 📚 Recursos

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [n8n API Documentation](https://docs.n8n.io/api/)
- [Service Account Setup](https://cloud.google.com/iam/docs/service-accounts)

