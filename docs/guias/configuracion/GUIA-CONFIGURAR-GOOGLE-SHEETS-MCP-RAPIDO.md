# 🚀 Guía Rápida: Configurar Google Sheets MCP

**Tiempo estimado:** 5-10 minutos

---

## ⚠️ Problema Actual

El MCP de Google Sheets está instalado pero **sin credenciales**, por eso muestra estos errores:

1. **Error de `.env`** (no crítico, puede ignorarse):
   ```
   ⚠️ Failed to load .env file: Error: Dynamic require of "fs" is not supported
   ```

2. **Error de autenticación** (crítico, debe resolverse):
   ```
   Authentication Error: No authentication method provided
   ```

---

## ✅ Solución Rápida

### **Opción 1: Script Automático (Recomendado)** ⭐

Ejecuta el script de configuración:

```bash
node scripts/configure-google-sheets-mcp.js
```

El script te guiará paso a paso:
1. Te pedirá el **Google Project ID**
2. Te pedirá elegir un método de autenticación
3. Te pedirá las credenciales según el método elegido
4. Guardará la configuración automáticamente

**Con argumentos:**
```bash
node scripts/configure-google-sheets-mcp.js --project-id=mi-proyecto --credentials=/ruta/al/archivo.json
```

---

### **Opción 2: Configuración Manual**

#### **Paso 1: Obtener Credenciales de Google Cloud**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o selecciona uno existente
3. Anota el **Project ID**
4. Ve a "APIs & Services" → "Library"
5. Busca "Google Sheets API" y habilítala
6. Ve a "APIs & Services" → "Credentials"
7. Crea un Service Account:
   - Haz clic en "Create Credentials" → "Service Account"
   - Completa el formulario
   - Ve a "Keys" → "Add Key" → "Create new key"
   - Selecciona "JSON" y descarga el archivo

#### **Paso 2: Editar `~/.cursor/mcp.json`**

Abre el archivo `~/.cursor/mcp.json` y agrega/actualiza la configuración:

**Método A: Archivo de Credenciales (Recomendado)**

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

**⚠️ IMPORTANTE:**
- Usa la **ruta absoluta** al archivo JSON
- En macOS: `/Users/tu-usuario/ruta/al/archivo.json`
- En Windows: `C:\\Users\\tu-usuario\\ruta\\al\\archivo.json`

**Método B: JSON String Completo**

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

**Método C: Private Key + Email**

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

#### **Paso 3: Reiniciar Cursor**

**⚠️ CRÍTICO:** Después de actualizar la configuración, **debes reiniciar Cursor completamente**:

1. Cierra Cursor completamente (no solo la ventana)
2. Vuelve a abrirlo
3. El MCP debería inicializarse correctamente

---

## ✅ Verificación

Después de reiniciar, verifica que funciona:

1. Abre la consola de Cursor (si está disponible)
2. Busca mensajes como:
   - ✅ `MCP server 'google-sheets' initialized`
   - ✅ `Google Sheets MCP ready`
3. El error de autenticación debería desaparecer

---

## 🔍 Solución de Problemas

### **Error: "No authentication method provided"**

- ✅ Verifica que las credenciales están en `~/.cursor/mcp.json`
- ✅ Verifica que la ruta al archivo JSON es absoluta y el archivo existe
- ✅ Verifica que el JSON es válido (puedes probarlo con `cat archivo.json | jq .`)
- ✅ Reinicia Cursor completamente

### **Error: "Dynamic require of fs is not supported"**

- ⚠️ Este error es **no crítico** y puede ignorarse
- El MCP funcionará si las credenciales están configuradas correctamente
- Es un problema conocido del paquete `mcp-gsheets`

### **El MCP sigue sin funcionar después de configurar**

1. Verifica que el archivo `~/.cursor/mcp.json` tiene la estructura correcta:
   ```bash
   cat ~/.cursor/mcp.json | jq '.mcpServers["google-sheets"]'
   ```

2. Verifica que las credenciales son válidas:
   ```bash
   # Si usas archivo de credenciales
   cat /ruta/al/archivo.json | jq '.type'  # Debe ser "service_account"
   ```

3. Verifica que el Service Account tiene permisos:
   - Abre tu Google Sheet
   - Haz clic en "Share" (Compartir)
   - Agrega el email del Service Account (está en el JSON: `client_email`)
   - Dale permisos de "Editor"

---

## 📚 Referencias

- **Guía completa:** `docs/guias/configuracion/SOLUCION-ERROR-GOOGLE-SHEETS-MCP.md`
- **Error de .env:** `docs/guias/configuracion/SOLUCION-ERROR-GOOGLE-SHEETS-MCP-ENV.md`
- **Google Cloud Console:** https://console.cloud.google.com/
- **Repositorio mcp-gsheets:** https://github.com/freema/mcp-gsheets

---

**Última actualización:** 2025-01-24


