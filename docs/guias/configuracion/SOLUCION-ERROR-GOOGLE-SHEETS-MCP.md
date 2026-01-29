# 🔧 Solución: Error "show outputs" en MCP de Google Sheets

## 🔍 Problema

El error "show outputs" en el MCP de Google Sheets generalmente ocurre cuando:

1. **El servidor MCP está configurado pero sin credenciales**: El archivo `~/.cursor/mcp.json` tiene el servidor configurado pero el objeto `env` está vacío.

2. **Credenciales faltantes o incorrectas**: Las variables de entorno requeridas (`GOOGLE_PROJECT_ID`, `GOOGLE_APPLICATION_CREDENTIALS`) no están configuradas.

3. **Ruta incorrecta a las credenciales**: El archivo JSON del Service Account no existe o la ruta es incorrecta.

## ✅ Solución

### Paso 1: Verificar Configuración Actual

Revisa tu archivo de configuración MCP:

```bash
cat ~/.cursor/mcp.json
```

Si ves algo como esto (con `env` vacío):

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["-y", "mcp-gsheets@latest"],
      "env": {}
    }
  }
}
```

Necesitas agregar las credenciales.

### Paso 2: Obtener Credenciales de Google Cloud

Si aún no tienes credenciales:

1. **Crear Proyecto en Google Cloud**:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Anota el **Project ID**

2. **Habilitar Google Sheets API**:
   - Ve a "APIs & Services" → "Library"
   - Busca "Google Sheets API"
   - Haz clic en "Enable"

3. **Crear Service Account**:
   - Ve a "APIs & Services" → "Credentials"
   - Haz clic en "Create Credentials" → "Service Account"
   - Completa el formulario y crea el Service Account
   - Haz clic en el Service Account creado
   - Ve a la pestaña "Keys"
   - Haz clic en "Add Key" → "Create new key"
   - Selecciona "JSON" y descarga el archivo

4. **Compartir Hojas de Cálculo**:
   - Abre tu Google Sheet
   - Haz clic en "Share" (Compartir)
   - Agrega el email del Service Account (está en el archivo JSON: `client_email`)
   - Dale permisos de "Editor"

### Paso 3: Configurar Credenciales en MCP

Tienes **3 opciones** para configurar las credenciales:

#### Opción 1: Archivo de Credenciales (Recomendado)

Actualiza `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["-y", "mcp-gsheets@latest"],
      "env": {
        "GOOGLE_PROJECT_ID": "tu-project-id",
        "GOOGLE_APPLICATION_CREDENTIALS": "/ruta/absoluta/al/service-account-key.json"
      }
    }
  }
}
```

**⚠️ IMPORTANTE**: 
- Usa la **ruta absoluta** al archivo JSON (no relativa)
- En macOS/Linux: `/Users/tu-usuario/ruta/al/archivo.json`
- En Windows: `C:\\Users\\tu-usuario\\ruta\\al\\archivo.json`

#### Opción 2: JSON String Completo

Si prefieres no usar un archivo:

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["-y", "mcp-gsheets@latest"],
      "env": {
        "GOOGLE_PROJECT_ID": "tu-project-id",
        "GOOGLE_SERVICE_ACCOUNT_KEY": "{\"type\":\"service_account\",\"project_id\":\"...\",...}"
      }
    }
  }
}
```

#### Opción 3: Private Key + Email (Más Simple)

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["-y", "mcp-gsheets@latest"],
      "env": {
        "GOOGLE_PROJECT_ID": "tu-project-id",
        "GOOGLE_PRIVATE_KEY": "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n",
        "GOOGLE_CLIENT_EMAIL": "service-account@project.iam.gserviceaccount.com"
      }
    }
  }
}
```

### Paso 4: Reiniciar Cursor

**⚠️ CRÍTICO**: Después de actualizar la configuración, **debes reiniciar Cursor completamente** para que los cambios surtan efecto.

1. Cierra Cursor completamente
2. Vuelve a abrirlo
3. El servidor MCP debería inicializarse correctamente

### Paso 5: Verificar que Funciona

Después de reiniciar, puedes verificar que el MCP funciona:

1. Abre la consola de Cursor (si está disponible)
2. Busca mensajes como:
   - ✅ `MCP server 'google-sheets' initialized`
   - ✅ `Google Sheets MCP ready`

Si sigues viendo el error "show outputs", verifica:

1. **Ruta del archivo JSON**: Asegúrate de que la ruta sea absoluta y que el archivo exista
2. **Permisos del archivo**: El archivo JSON debe ser legible
3. **Formato JSON**: Si usas `GOOGLE_SERVICE_ACCOUNT_KEY`, asegúrate de que el JSON esté correctamente escapado
4. **Project ID**: Verifica que el `GOOGLE_PROJECT_ID` sea correcto

## 🔍 Diagnóstico Adicional

### Verificar que el Servidor MCP se Ejecuta

Prueba ejecutar el servidor MCP manualmente:

```bash
npx -y mcp-gsheets@latest
```

Si hay errores, los verás en la salida.

### Verificar Variables de Entorno

Puedes verificar si las variables están configuradas:

```bash
# En el contexto del servidor MCP
echo $GOOGLE_PROJECT_ID
echo $GOOGLE_APPLICATION_CREDENTIALS
```

### Logs de Cursor

Revisa los logs de Cursor para ver errores específicos del servidor MCP. Los logs generalmente están en:

- macOS: `~/Library/Logs/Cursor/`
- Linux: `~/.config/Cursor/logs/`
- Windows: `%APPDATA%\Cursor\logs\`

## 📚 Referencias

- [mcp-gsheets GitHub](https://github.com/freema/mcp-gsheets)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 💡 Notas

- La API de Google Sheets es **completamente gratuita** con límites generosos:
  - 300 requests/min por proyecto
  - 60 requests/min por usuario
- No necesitas pagar nada, incluso si excedes los límites (solo se bloquea temporalmente)
- El error "show outputs" generalmente desaparece una vez que las credenciales están correctamente configuradas

