# 🔐 Guía: Google Sheets MCP con OAuth 2.0 (Como Figma/Vercel)

**Fecha:** 2025-01-24  
**Objetivo:** Configurar Google Sheets MCP usando OAuth 2.0 con autorización web, similar a Figma y Vercel

---

## 🎯 Diferencia con Service Account

### **Service Account (Método Actual)**
- ❌ Requiere crear Service Account manualmente
- ❌ Requiere descargar archivo JSON
- ❌ Requiere compartir hojas de cálculo con email del Service Account
- ✅ Funciona sin interacción del usuario

### **OAuth 2.0 (Método Propuesto - Como Figma/Vercel)**
- ✅ Autorización web automática
- ✅ No requiere Service Account
- ✅ Acceso directo a tus hojas de cálculo personales
- ✅ Similar a cómo funcionan Figma y Vercel MCP
- ⚠️ Requiere autorización inicial (una vez)

---

## 📋 Paso 1: Crear Credenciales OAuth 2.0 en Google Cloud

1. **Ve a Google Cloud Console:**
   - https://console.cloud.google.com/

2. **Crea o selecciona un proyecto**

3. **Habilita Google Sheets API:**
   - Ve a "APIs & Services" → "Library"
   - Busca "Google Sheets API"
   - Haz clic en "Enable"

4. **Configura Pantalla de Consentimiento OAuth:**
   - Ve a "APIs & Services" → "OAuth consent screen"
   - Selecciona "External" (o "Internal" si es para tu organización)
   - Completa:
     - App name: "Autorun Google Sheets MCP"
     - User support email: Tu email
     - Developer contact: Tu email
   - Haz clic en "Save and Continue"
   - En "Scopes", agrega:
     - `https://www.googleapis.com/auth/spreadsheets`
     - `https://www.googleapis.com/auth/drive.readonly`
   - Haz clic en "Save and Continue"
   - En "Test users", agrega tu email (si es External)
   - Haz clic en "Save and Continue"

5. **Crea Credenciales OAuth 2.0:**
   - Ve a "APIs & Services" → "Credentials"
   - Haz clic en "Create Credentials" → "OAuth client ID"
   - Application type: **"Desktop app"** (importante)
   - Name: "Autorun Google Sheets MCP"
   - Haz clic en "Create"
   - **Descarga el archivo JSON** o copia:
     - Client ID
     - Client Secret (si está disponible)

---

## 📋 Paso 2: Instalar Dependencias

```bash
npm install googleapis open
```

---

## 📋 Paso 3: Configurar MCP con OAuth

Edita `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "node",
      "args": ["scripts/google-sheets-mcp-oauth-wrapper.mjs"],
      "env": {
        "GOOGLE_CLIENT_ID": "tu-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "tu-client-secret",
        "GOOGLE_REDIRECT_URI": "http://localhost:3000/oauth2callback"
      }
    }
  }
}
```

**⚠️ IMPORTANTE:**
- `GOOGLE_CLIENT_ID`: Tu Client ID de OAuth 2.0
- `GOOGLE_CLIENT_SECRET`: Tu Client Secret (opcional para Desktop App)
- `GOOGLE_REDIRECT_URI`: Debe coincidir con el configurado en Google Cloud

---

## 📋 Paso 4: Primera Autorización

1. **Reinicia Cursor completamente**

2. **El MCP iniciará automáticamente el flujo OAuth:**
   - Se abrirá tu navegador
   - Te pedirá autorizar la aplicación
   - Selecciona tu cuenta de Google
   - Otorga los permisos necesarios

3. **Después de autorizar:**
   - Verás una página de confirmación
   - El script mostrará tokens en la consola
   - **Copia los tokens** y agrégalos a `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "node",
      "args": ["scripts/google-sheets-mcp-oauth-wrapper.mjs"],
      "env": {
        "GOOGLE_CLIENT_ID": "tu-client-id",
        "GOOGLE_CLIENT_SECRET": "tu-client-secret",
        "GOOGLE_REDIRECT_URI": "http://localhost:3000/oauth2callback",
        "GOOGLE_OAUTH_TOKENS": "{\"access_token\":\"...\",\"refresh_token\":\"...\",\"expiry_date\":...}"
      }
    }
  }
}
```

4. **Reinicia Cursor nuevamente**

---

## ✅ Verificación

Después de configurar, el MCP debería:
- ✅ Inicializarse sin errores
- ✅ Mostrar herramientas disponibles: `list_sheets`, `read_sheet`, `write_sheet`
- ✅ No mostrar error de autenticación

---

## 🔄 Renovar Tokens

Los tokens OAuth expiran después de un tiempo. El wrapper automáticamente:
- ✅ Detecta cuando el token expira
- ✅ Usa el refresh token para obtener un nuevo token
- ✅ Si no hay refresh token, te pedirá re-autorizar

---

## 🆚 Comparación: OAuth vs Service Account

| Característica | OAuth 2.0 | Service Account |
|----------------|-----------|-----------------|
| **Autorización** | Web (una vez) | Manual (archivo JSON) |
| **Acceso** | Tus hojas personales | Hojas compartidas con Service Account |
| **Configuración** | Más simple | Más compleja |
| **Seguridad** | Tokens temporales | Clave permanente |
| **Similar a** | Figma, Vercel | - |

---

## 🔧 Solución de Problemas

### **Error: "GOOGLE_CLIENT_ID no está configurado"**
- ✅ Verifica que `GOOGLE_CLIENT_ID` está en `~/.cursor/mcp.json`
- ✅ Verifica que el Client ID es correcto

### **Error: "redirect_uri_mismatch"**
- ✅ Verifica que `GOOGLE_REDIRECT_URI` en `mcp.json` coincide con el configurado en Google Cloud
- ✅ En Google Cloud, agrega `http://localhost:3000/oauth2callback` a "Authorized redirect URIs"

### **Error: "Token expirado"**
- ✅ El wrapper debería refrescar automáticamente
- ✅ Si falla, elimina `GOOGLE_OAUTH_TOKENS` y re-autoriza

### **El navegador no se abre automáticamente**
- ✅ Copia la URL de autorización de los logs
- ✅ Ábrela manualmente en tu navegador

---

## 📚 Referencias

- **Google OAuth 2.0:** https://developers.google.com/identity/protocols/oauth2
- **Google Sheets API:** https://developers.google.com/sheets/api
- **Wrapper Script:** `scripts/google-sheets-mcp-oauth-wrapper.mjs`

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ Implementado


