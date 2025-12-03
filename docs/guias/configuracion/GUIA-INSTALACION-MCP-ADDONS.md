# 🔌 Guía: Instalación de MCP con Add-ons

## 📋 Resumen

**Respuesta corta:** Los MCP **NO se instalan automáticamente** cuando instalas los add-ons. El sistema **detecta** si hay MCP disponible y **ofrece** instalarlo, pero el usuario debe **aceptar explícitamente**.

---

## 🎯 Cómo Funciona la Instalación de MCP

### Flujo Actual

1. **Usuario instala add-on** (ej: `github`, `vercel`, `clarity`)
2. **Usuario configura credenciales** (token, API key, etc.)
3. **Sistema detecta** si hay MCP disponible para ese servicio
4. **Sistema pregunta** al usuario si quiere instalar MCP
5. **Si el usuario acepta**, se instala y configura automáticamente
6. **Si el usuario rechaza**, el add-on funciona con implementación tradicional

### ⚠️ Importante

- **NO es automático** - El usuario debe aceptar explícitamente
- **NO bloquea** - Si rechazas, el add-on funciona igual
- **Opcional** - Los MCP mejoran la experiencia pero no son obligatorios

---

## ✅ Add-ons con Soporte MCP Automático

### 1. **GitHub Add-on** ✅

**Cuándo se ofrece:**
- Cuando configuras `repositoryUrl` o `GITHUB_TOKEN`
- Durante `initialize()` del add-on

**Qué hace:**
- Detecta si hay servidor MCP de GitHub disponible
- Muestra prompt interactivo preguntando si quieres instalar
- Si aceptas, configura MCP automáticamente con tu token

**Ejemplo:**
```typescript
await hub.activateAddon('github');
// Sistema detecta MCP disponible
// Muestra prompt: "¿Deseas instalar MCP para GitHub? (S/N/I)"
// Si respondes "S", instala automáticamente
```

---

### 2. **Vercel Add-on** ✅

**Cuándo se ofrece:**
- Cuando configuras `VERCEL_TOKEN`
- Durante `initialize()` del add-on

**Qué hace:**
- Detecta si hay servidor MCP de Vercel disponible
- Muestra prompt interactivo preguntando si quieres instalar
- Si aceptas, configura MCP automáticamente con tu token y teamId

**Ejemplo:**
```typescript
await hub.activateAddon('vercel');
// Sistema detecta MCP disponible
// Muestra prompt: "¿Deseas instalar MCP para Vercel? (S/N/I)"
// Si respondes "S", instala automáticamente
```

---

### 3. **Clarity Add-on** ✅

**Cuándo se ofrece:**
- Cuando configuras `projectId`
- Durante `initialize()` del add-on

**Qué hace:**
- Detecta si hay servidor MCP de Clarity disponible
- Muestra prompt interactivo preguntando si quieres instalar
- Si aceptas, configura MCP automáticamente con tu projectId y API key

**Ejemplo:**
```typescript
await hub.activateAddon('clarity');
// Sistema detecta MCP disponible
// Muestra prompt: "¿Deseas instalar MCP para Clarity? (S/N/I)"
// Si respondes "S", instala automáticamente
```

---

## 📚 Storybook MCP (Configuración Manual)

### ⚠️ Diferencia Importante

**Storybook MCP es diferente:**
- **NO se ofrece automáticamente** cuando instalas el add-on de Storybook
- **Requiere configuración manual** en Cursor
- **Es necesario** para que Cursor pueda acceder a los componentes desde Storybook

### ¿Por qué es diferente?

El add-on de Storybook no requiere MCP porque:
- Storybook es una herramienta **local** que se ejecuta en tu entorno
- No necesita APIs externas ni credenciales remotas
- El MCP de Storybook es para que **Cursor** pueda consultar componentes, no para que el add-on funcione

### Cómo Configurar Storybook MCP

**Ver guía completa:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`

**Resumen rápido:**
1. Asegúrate de que Storybook esté corriendo: `http://localhost:6006`
2. Agrega configuración MCP en Cursor:
   ```json
   {
     "mcpServers": {
       "storybook-ubits": {
         "command": "npx",
         "args": ["-y", "storybook-mcp@latest"],
         "env": {
           "STORYBOOK_URL": "http://localhost:6006/index.json"
         }
       }
     }
   }
   ```
3. Reinicia Cursor

---

## 🔍 Verificación: ¿Están Instalados los MCP?

### Verificar MCP Configurados

```typescript
import { MCPDetector } from '@autorun/core';

// Verificar un servicio específico
const githubInfo = await MCPDetector.detectMCPServer('github');
console.log(githubInfo);
// {
//   name: 'GitHub',
//   available: true,
//   configured: true,  // ✅ Configurado
//   configPath: '/Users/user/.config/mcp/config.json'
// }

// Verificar todos los servicios
const allInfo = await MCPDetector.getAllServerInfo();
allInfo.forEach(info => {
  console.log(`${info.name}: ${info.configured ? '✅' : '❌'}`);
});
```

### Verificar en Archivo de Configuración

**Ubicación del archivo:**
- `~/.config/mcp/config.json` (preferido)
- `~/.mcp/config.json`
- `./.mcp/config.json` (proyecto local)

**Contenido esperado:**
```json
{
  "servers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    },
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_TOKEN": "...",
        "VERCEL_TEAM_ID": "..."
      }
    },
    "clarity": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-clarity"],
      "env": {
        "CLARITY_PROJECT_ID": "...",
        "CLARITY_API_KEY": "..."
      }
    }
  }
}
```

---

## 📊 Tabla Resumen

| Add-on | MCP Disponible | Instalación Automática | Cuándo se Ofrece | Configuración Manual |
|--------|----------------|------------------------|-------------------|---------------------|
| **GitHub** | ✅ Sí | ⚠️ Solo si aceptas | Al configurar token/repo | ❌ No necesaria |
| **Vercel** | ✅ Sí | ⚠️ Solo si aceptas | Al configurar token | ❌ No necesaria |
| **Clarity** | ✅ Sí | ⚠️ Solo si aceptas | Al configurar projectId | ❌ No necesaria |
| **Storybook** | ✅ Sí | ❌ No | N/A | ✅ **Sí, obligatoria** |

---

## 🚨 MCP Necesarios para Autorun

### MCP Opcionales (Mejoran la Experiencia)

- **GitHub MCP** - Mejora integración con repositorios
- **Vercel MCP** - Mejora despliegues y gestión
- **Clarity MCP** - Mejora analytics y session recordings

**Estos NO son obligatorios.** Los add-ons funcionan sin ellos usando implementación tradicional.

### MCP Recomendado (Para Mejor Experiencia con Cursor)

- **Storybook MCP** - Permite que Cursor consulte componentes desde Storybook

**Este es recomendado** si quieres que Cursor pueda:
- Listar componentes disponibles
- Obtener props de componentes
- Consultar plantillas
- Extraer tokens

**Sin Storybook MCP:**
- Cursor no puede acceder a información del Storybook
- Debes consultar manualmente el Storybook en el navegador
- No hay integración entre Cursor y Storybook

---

## 🔧 Instalación Manual de MCP

Si rechazaste la instalación automática o quieres instalarlo después:

### GitHub MCP

```bash
# 1. Instalar servidor MCP
npm install -g @modelcontextprotocol/server-github

# 2. Agregar a configuración MCP (~/.config/mcp/config.json)
{
  "servers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "tu-token-aqui"
      }
    }
  }
}

# 3. Reiniciar Cursor
```

### Vercel MCP

```bash
# 1. Instalar servidor MCP
npm install -g @modelcontextprotocol/server-vercel

# 2. Agregar a configuración MCP
{
  "servers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_TOKEN": "tu-token",
        "VERCEL_TEAM_ID": "tu-team-id"
      }
    }
  }
}

# 3. Reiniciar Cursor
```

### Clarity MCP

```bash
# 1. Instalar servidor MCP
npm install -g @modelcontextprotocol/server-clarity

# 2. Agregar a configuración MCP
{
  "servers": {
    "clarity": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-clarity"],
      "env": {
        "CLARITY_PROJECT_ID": "tu-project-id",
        "CLARITY_API_KEY": "tu-api-key"
      }
    }
  }
}

# 3. Reiniciar Cursor
```

---

## ❓ Preguntas Frecuentes

### ¿Los MCP se instalan automáticamente cuando ejecuto `npm run init`?

**No.** Los MCP se **ofrecen** cuando configuras credenciales para los add-ons, pero debes **aceptar explícitamente**.

### ¿Puedo usar los add-ons sin MCP?

**Sí.** Todos los add-ons funcionan sin MCP usando implementación tradicional. Los MCP solo mejoran la experiencia.

### ¿Storybook MCP se instala automáticamente?

**No.** Storybook MCP requiere configuración manual en Cursor. Ver: `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`

### ¿Qué pasa si rechazo instalar MCP?

**Nada malo.** El add-on funciona normalmente con implementación tradicional. Puedes instalar MCP después si cambias de opinión.

### ¿Cómo sé si MCP está instalado?

Usa `MCPDetector.detectMCPServer('servicio')` o verifica el archivo de configuración MCP.

---

## 📚 Referencias

- **Integración MCP con Add-ons:** `docs/guias/integracion/GUIA-INTEGRACION-MCP.md`
- **Configuración Storybook MCP:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`
- **Resumen de Integración MCP:** `docs/analisis/RESUMEN-INTEGRACION-MCP.md`
- **Implementación Completa:** `IMPLEMENTACION-MCP-COMPLETA.md`

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2025

