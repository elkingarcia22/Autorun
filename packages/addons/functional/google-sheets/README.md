# @autorun/google-sheets

Add-on funcional para integración con Google Sheets - Creación y gestión de hojas de cálculo con acceso completo mediante MCP.

## 📋 Descripción

Este add-on proporciona integración completa con Google Sheets, permitiendo:

- ✅ Crear hojas de cálculo nuevas
- ✅ Leer y escribir datos en celdas y rangos
- ✅ Formatear celdas (colores, fuentes, bordes)
- ✅ Crear gráficos y aplicar formato condicional
- ✅ Operaciones batch para mejor rendimiento
- ✅ Integración con MCP (Model Context Protocol) para mejor experiencia
- ✅ API completamente gratuita con límites generosos

## 🚀 Características

### Integración MCP Automática

El add-on detecta automáticamente si el servidor MCP de Google Sheets está disponible y ofrece instalarlo durante la inicialización. El MCP proporciona:

- **Operaciones Completas**: Crear, leer, escribir y gestionar hojas de cálculo
- **Formato Avanzado**: Colores, fuentes, bordes, alineación
- **Gráficos y Visualización**: Crear gráficos directamente desde el MCP
- **Operaciones Batch**: Procesar múltiples celdas eficientemente
- **Autenticación Flexible**: Service Account, OAuth, o Private Key

### Funcionalidades del Servicio

- **Creación de hojas**: Crea nuevas hojas de cálculo con múltiples pestañas
- **Lectura de datos**: Lee datos de rangos específicos o hojas completas
- **Escritura de datos**: Escribe datos en celdas individuales o rangos
- **Formateo**: Aplica formatos a celdas (colores, fuentes, estilos)
- **Configuración flexible**: Soporta múltiples métodos de autenticación

## 📦 Instalación

El add-on se instala automáticamente cuando se agrega a la configuración de Autorun. No requiere instalación manual de paquetes.

### Configuración

Agrega el add-on a tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "active": ["google-sheets"],
      "config": {
        "google-sheets": {
          "googleProjectId": "your-project-id",
          "googleApplicationCredentials": "/path/to/service-account-key.json"
        }
      }
    }
  }
}
```

### Variables de Entorno

También puedes configurar mediante variables de entorno:

```bash
export GOOGLE_PROJECT_ID="your-project-id"
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
```

## ⚙️ Configuración

### Opciones de Configuración

| Opción | Tipo | Descripción | Requerido | Default |
|--------|------|-------------|-----------|---------|
| `googleProjectId` | `string` | ID del proyecto de Google Cloud | Sí* | - |
| `googleApplicationCredentials` | `string` | Ruta al archivo JSON del Service Account | Sí* | - |
| `googleServiceAccountKey` | `string` | JSON string completo del Service Account | Sí* | - |
| `googlePrivateKey` | `string` | Private Key del Service Account | Sí* | - |
| `googleClientEmail` | `string` | Email del Service Account | Sí* | - |

\* **Nota**: Necesitas al menos uno de estos métodos de autenticación:
- `googleApplicationCredentials` (archivo JSON)
- `googleServiceAccountKey` (JSON string)
- `googlePrivateKey` + `googleClientEmail` (método simplificado)

### Métodos de Autenticación

#### Método 1: Archivo de Credenciales (Recomendado)

```json
{
  "googleProjectId": "your-project-id",
  "googleApplicationCredentials": "/absolute/path/to/service-account-key.json"
}
```

#### Método 2: JSON String

```json
{
  "googleProjectId": "your-project-id",
  "googleServiceAccountKey": "{\"type\":\"service_account\",\"project_id\":\"...\",...}"
}
```

#### Método 3: Private Key + Email (Más Simple)

```json
{
  "googleProjectId": "your-project-id",
  "googlePrivateKey": "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n",
  "googleClientEmail": "service-account@project.iam.gserviceaccount.com"
}
```

## 🔌 Integración MCP

### Instalación Automática

El add-on detecta automáticamente si el servidor MCP de Google Sheets está disponible y ofrece instalarlo durante la inicialización. Si aceptas, se configurará automáticamente en tu archivo MCP.

### Instalación Manual

Si prefieres instalar manualmente, agrega la siguiente configuración a tu archivo MCP (usualmente `~/.cursor/mcp.json` o `~/.config/mcp/config.json`):

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["-y", "mcp-gsheets@latest"],
      "env": {
        "GOOGLE_PROJECT_ID": "your-project-id",
        "GOOGLE_APPLICATION_CREDENTIALS": "/absolute/path/to/service-account-key.json"
      }
    }
  }
}
```

**Nota**: Después de agregar la configuración, reinicia Cursor para que cargue el servidor MCP.

## 📚 Uso

### Inicialización

El add-on se inicializa automáticamente cuando Autorun se inicia. Durante la inicialización:

1. Detecta si el servidor MCP está configurado
2. Si no está configurado pero está disponible, ofrece instalarlo
3. Si hay configuración de credenciales, verifica la conexión con Google Sheets
4. Inicializa el servicio

### Servicios Disponibles

Una vez inicializado, puedes acceder a los servicios del add-on:

```typescript
import { AutorunHub } from '@autorun/core';

const hub = AutorunHub.getInstance();
const googleSheetsAddon = hub.getAddon('google-sheets');

if (googleSheetsAddon) {
  const services = googleSheetsAddon.getServices();
  
  // Crear nueva hoja de cálculo
  const spreadsheet = await services.createSpreadsheet('Mi Hoja', [
    { name: 'Datos', headers: ['Nombre', 'Email', 'Edad'] },
    { name: 'Resumen' }
  ]);
  
  // Escribir datos
  await services.writeRange(spreadsheet.id, 'A2:C3', [
    ['Juan', 'juan@email.com', 25],
    ['María', 'maria@email.com', 30]
  ]);
  
  // Leer datos
  const data = await services.readRange(spreadsheet.id, 'A1:C3');
  
  // Formatear celdas
  await services.formatCells(spreadsheet.id, 'A1:C1', {
    backgroundColor: '#4285F4',
    textColor: '#FFFFFF',
    bold: true
  });
}
```

## 🎯 Casos de Uso

### 1. Crear Hoja de Cálculo desde Código

```typescript
const spreadsheet = await services.createSpreadsheet('Reporte Mensual', [
  { name: 'Enero', headers: ['Fecha', 'Ventas', 'Gastos'] },
  { name: 'Febrero', headers: ['Fecha', 'Ventas', 'Gastos'] }
]);
```

### 2. Exportar Datos a Google Sheets

```typescript
// Exportar datos de una base de datos a Google Sheets
const users = await db.getUsers();
const rows = users.map(user => [user.name, user.email, user.role]);
await services.writeRange(spreadsheetId, 'A1', [['Nombre', 'Email', 'Rol'], ...rows]);
```

### 3. Generar Reportes Formateados

```typescript
// Crear reporte con formato
await services.createSpreadsheet('Reporte Q1 2024');
await services.writeRange(spreadsheetId, 'A1', reportData);
await services.formatCells(spreadsheetId, 'A1:D1', {
  backgroundColor: '#0F9D58',
  textColor: '#FFFFFF',
  bold: true,
  fontSize: 14
});
```

## 🔍 Detección y Diagnóstico

### Verificar Estado del MCP

El add-on registra información sobre el estado del MCP en los logs:

- ✅ `MCP detectado y configurado`: El MCP está listo para usar
- ⚠️ `MCP disponible pero no configurado`: El add-on ofrecerá instalarlo
- ℹ️ `Continuando sin MCP`: El add-on funcionará sin MCP (solo funcionalidades básicas)

### Verificar Conexión con Google Sheets

Si configuraste `googleProjectId` y credenciales, el add-on verificará automáticamente la conexión durante la inicialización. Si hay problemas, verás un warning en los logs.

## 🛠️ Setup de Google Cloud

### Paso 1: Crear Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el **Project ID**

### Paso 2: Habilitar Google Sheets API

1. Ve a "APIs & Services" → "Library"
2. Busca "Google Sheets API"
3. Haz clic en "Enable"

### Paso 3: Crear Service Account

1. Ve a "APIs & Services" → "Credentials"
2. Haz clic en "Create Credentials" → "Service Account"
3. Completa el formulario y crea el Service Account
4. Haz clic en el Service Account creado
5. Ve a la pestaña "Keys"
6. Haz clic en "Add Key" → "Create new key"
7. Selecciona "JSON" y descarga el archivo

### Paso 4: Compartir Hojas de Cálculo

1. Abre tu Google Sheet
2. Haz clic en "Share" (Compartir)
3. Agrega el email del Service Account (está en el archivo JSON: `client_email`)
4. Dale permisos de "Editor"
5. Guarda

## 📊 Límites de la API

La API de Google Sheets es **completamente gratuita** con los siguientes límites:

- **300 requests/min** por proyecto
- **60 requests/min** por usuario
- **Sin límite diario** (respetando límites por minuto)
- **Sin costos adicionales** (incluso si excedes los límites, solo se bloquea temporalmente)

Estos límites son más que suficientes para la mayoría de casos de uso.

## 🛠️ Desarrollo

### Estructura del Add-on

```
packages/addons/functional/google-sheets/
├── src/
│   ├── GoogleSheetsAddon.ts      # Clase principal del add-on
│   ├── GoogleSheetsService.ts    # Servicio de integración con Google Sheets
│   └── index.ts                  # Exportaciones públicas
├── manifest.json                  # Metadatos del add-on
├── package.json                   # Configuración del paquete
├── tsconfig.json                  # Configuración TypeScript
└── README.md                      # Esta documentación
```

### Compilar

```bash
cd packages/addons/functional/google-sheets
npm run build
```

### Desarrollo con Watch

```bash
npm run dev
```

## 📖 Referencias

- [mcp-gsheets GitHub](https://github.com/freema/mcp-gsheets)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 🤝 Contribuir

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.

## 📝 Licencia

MIT
