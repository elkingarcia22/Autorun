# 🔧 Solución: Error Google Sheets MCP sin Credenciales

**Fecha:** 2025-01-24  
**Error:** `Authentication Error: No authentication method provided`

---

## 🔍 Problema

El MCP de Google Sheets está intentando iniciarse pero no tiene credenciales configuradas. Esto causa el error:

```
Authentication Error: No authentication method provided. Please set one of:
- GOOGLE_APPLICATION_CREDENTIALS to the path of your service account key file
- GOOGLE_SERVICE_ACCOUNT_KEY to the JSON string of your service account credentials
- GOOGLE_PRIVATE_KEY and GOOGLE_CLIENT_EMAIL for direct private key authentication
```

---

## ✅ Solución Rápida: Deshabilitar MCP Temporalmente

Si no necesitas Google Sheets MCP ahora, puedes **eliminarlo temporalmente**:

1. **Edita `~/.cursor/mcp.json`**
2. **Elimina la entrada `google-sheets`** (si existe)
3. **Reinicia Cursor**

---

## ✅ Solución Completa: Configurar OAuth 2.0 (Recomendado)

### **Opción 1: Script Automático (Más Fácil)**

```bash
node scripts/configure-google-sheets-mcp-oauth.js
```

Este script te guiará paso a paso para:
- ✅ Configurar OAuth 2.0 (similar a Figma/Vercel)
- ✅ Autorización web automática
- ✅ No requiere Service Account

### **Opción 2: Configuración Manual**

1. **Obtén credenciales OAuth 2.0:**
   - Ve a https://console.cloud.google.com/
   - Crea OAuth Client ID (tipo: Desktop app)
   - Copia el Client ID

2. **Edita `~/.cursor/mcp.json`:**

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "node",
      "args": ["scripts/google-sheets-mcp-oauth-wrapper.mjs"],
      "env": {
        "GOOGLE_CLIENT_ID": "tu-client-id.apps.googleusercontent.com",
        "GOOGLE_REDIRECT_URI": "http://localhost:3000/oauth2callback"
      }
    }
  }
}
```

3. **Reinicia Cursor**
4. **Autoriza en el navegador** (se abrirá automáticamente)

---

## ✅ Solución Alternativa: Service Account (Tradicional)

Si prefieres usar Service Account en lugar de OAuth:

1. **Crea Service Account en Google Cloud**
2. **Descarga el archivo JSON**
3. **Edita `~/.cursor/mcp.json`:**

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["-y", "mcp-gsheets@latest"],
      "env": {
        "GOOGLE_PROJECT_ID": "tu-project-id",
        "GOOGLE_APPLICATION_CREDENTIALS": "/ruta/absoluta/al/archivo.json"
      }
    }
  }
}
```

4. **Reinicia Cursor**

---

## 🆚 Comparación: OAuth vs Service Account

| Característica | OAuth 2.0 ⭐ | Service Account |
|----------------|--------------|-----------------|
| **Autorización** | Web automática | Manual (archivo JSON) |
| **Acceso** | Hojas personales | Hojas compartidas |
| **Configuración** | Más simple | Más compleja |
| **Similar a** | Figma, Vercel | - |

---

## 🔍 Verificar Configuración

Después de configurar, verifica:

```bash
cat ~/.cursor/mcp.json | grep -A 10 "google-sheets"
```

Deberías ver la configuración correcta.

---

## 📚 Guías Relacionadas

- **OAuth 2.0:** `docs/guias/configuracion/GUIA-GOOGLE-SHEETS-MCP-OAUTH.md`
- **Service Account:** `docs/guias/configuracion/GUIA-CONFIGURAR-GOOGLE-SHEETS-MCP-RAPIDO.md`

---

**Última actualización:** 2025-01-24


