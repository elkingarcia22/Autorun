# 🔧 Solución: Error "Dynamic require of fs" en Google Sheets MCP

**Fecha:** 2025-01-24  
**Problema:** Error `Dynamic require of "fs" is not supported` al cargar Google Sheets MCP

---

## 🔍 Problema

El MCP de Google Sheets (`mcp-gsheets`) está intentando cargar un archivo `.env` usando `require('fs')` dinámicamente, lo cual no funciona en ESM (ES Modules). Este es un problema conocido del paquete `mcp-gsheets`.

**Error completo:**
```
⚠️ Failed to load .env file: Error: Dynamic require of "fs" is not supported
    at file:///Users/elkinmac/.npm/_npx/bf8ea422524e34d4/node_modules/mcp-gsheets/dist/index.js:12:9
```

**Segundo error (esperado si no hay credenciales):**
```
Authentication Error: No authentication method provided. Please set one of:
- GOOGLE_APPLICATION_CREDENTIALS to the path of your service account key file
- GOOGLE_SERVICE_ACCOUNT_KEY to the JSON string of your service account credentials
- GOOGLE_PRIVATE_KEY and GOOGLE_CLIENT_EMAIL for direct private key authentication
```

---

## ✅ Solución

### **Opción 1: Ignorar el Error de .env (Recomendado)**

El error de `.env` es **no crítico**. El MCP puede funcionar sin cargar el archivo `.env` si las credenciales se pasan directamente como variables de entorno en la configuración de MCP.

**Pasos:**

1. **Configurar credenciales en `~/.cursor/mcp.json`** (ver guía completa abajo)
2. **El error de `.env` puede ignorarse** - el MCP funcionará con las credenciales de `env`

### **Opción 2: Configurar Credenciales Correctamente**

El error de autenticación es el **real problema**. Necesitas configurar las credenciales de Google Cloud.

#### **Paso 1: Obtener Credenciales de Google Cloud**

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

#### **Paso 2: Configurar Credenciales en MCP**

Tienes **3 opciones** para configurar las credenciales en `~/.cursor/mcp.json`:

##### **Opción A: Archivo de Credenciales (Recomendado)**

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

##### **Opción B: JSON String Completo**

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

##### **Opción C: Private Key + Email (Más Simple)**

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

**⚠️ IMPORTANTE**: En el JSON, los saltos de línea en `GOOGLE_PRIVATE_KEY` deben ser `\\n` (doble backslash + n).

#### **Paso 3: Reiniciar Cursor**

**⚠️ CRÍTICO**: Después de actualizar la configuración, **debes reiniciar Cursor completamente** para que los cambios surtan efecto.

1. Cierra Cursor completamente
2. Vuelve a abrirlo
3. El servidor MCP debería inicializarse correctamente

---

## 🔍 Verificación

Después de reiniciar, puedes verificar que el MCP funciona:

1. Abre la consola de Cursor (si está disponible)
2. Busca mensajes como:
   - ✅ `MCP server 'google-sheets' initialized`
   - ✅ `Google Sheets MCP ready`

Si sigues viendo el error de autenticación, verifica:
- ✅ Las credenciales están correctamente configuradas en `~/.cursor/mcp.json`
- ✅ La ruta al archivo JSON es absoluta y el archivo existe
- ✅ El Service Account tiene permisos en la hoja de cálculo
- ✅ Google Sheets API está habilitada en el proyecto

---

## 📝 Notas Técnicas

### **Sobre el Error de .env**

El error `Dynamic require of "fs" is not supported` es un problema conocido del paquete `mcp-gsheets`. El paquete intenta cargar un archivo `.env` usando `require('fs')` dinámicamente, lo cual no funciona en ESM.

**Esto NO afecta la funcionalidad** si las credenciales se pasan directamente como variables de entorno en la configuración de MCP. El error puede ignorarse.

### **Sobre Variables de Entorno Vacías**

El sistema ahora **no agrega variables de entorno vacías** al MCP. Si no hay credenciales configuradas, el objeto `env` estará vacío, y el MCP mostrará el error de autenticación (esperado).

---

## 🔗 Referencias

- **Guía completa de configuración:** `docs/guias/configuracion/SOLUCION-ERROR-GOOGLE-SHEETS-MCP.md`
- **Repositorio mcp-gsheets:** https://github.com/freema/mcp-gsheets
- **Google Cloud Console:** https://console.cloud.google.com/

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ Solución documentada

