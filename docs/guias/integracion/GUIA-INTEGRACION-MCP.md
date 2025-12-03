# 🔌 Guía de Integración MCP con Add-ons

## 📋 Resumen

Sistema automático que detecta cuando un add-on puede beneficiarse de MCP (Model Context Protocol) y ofrece al usuario instalarlo automáticamente para mejorar la experiencia.

---

## 🎯 Cómo Funciona

### Flujo Automático

1. **Usuario configura add-on** con credenciales/API keys
2. **Sistema detecta** si hay MCP disponible para ese servicio
3. **Sistema pregunta** al usuario si quiere instalar MCP
4. **Si acepta**, instala y configura MCP automáticamente
5. **Add-on usa MCP** si está disponible, sino usa implementación tradicional

---

## ✅ Add-ons con Soporte MCP

### 1. **GitHub Add-on**
- **Detecta**: Si hay servidor MCP de GitHub disponible
- **Pregunta**: Cuando configuras `repositoryUrl` o `token`
- **Instala**: Configuración de MCP con tu token de GitHub

### 2. **Vercel Add-on**
- **Detecta**: Si hay servidor MCP de Vercel disponible
- **Pregunta**: Cuando configuras `VERCEL_TOKEN`
- **Instala**: Configuración de MCP con tu token y teamId

### 3. **Clarity Add-on**
- **Detecta**: Si hay servidor MCP de Clarity disponible
- **Pregunta**: Cuando configuras `projectId`
- **Instala**: Configuración de MCP con tu projectId y API key

---

## 🚀 Ejemplo de Uso

### Escenario: Configurando GitHub Add-on

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();

// Activar GitHub add-on
await hub.activateAddon('github');

// El sistema automáticamente:
// 1. Detecta que hay MCP disponible
// 2. Muestra prompt interactivo:
//
// ======================================================================
// 🔌 Integración MCP Disponible para GitHub
// ======================================================================
//
// ✨ Beneficios de usar MCP:
//    • Mayor seguridad (no necesitas tokens locales)
//    • Funcionalidades avanzadas de la API
//    • Mejor integración y mantenimiento
//    • Acceso directo sin necesidad de CLI
//
// 📋 Opciones:
//    [S] Sí, instalar MCP automáticamente
//    [N] No, usar configuración tradicional
//    [I] Ver instrucciones de instalación manual
// ======================================================================
//
// ¿Deseas instalar y configurar MCP para mejorar la experiencia? (S/N/I): 
```

### Si el usuario responde "S":

```
✅ MCP para GitHub configurado exitosamente
🔄 Reinicia tu editor/IDE para que los cambios surtan efecto.
```

### Si el usuario responde "N":

```
ℹ️  Continuando con configuración tradicional de GitHub...
```

### Si el usuario responde "I":

```
📖 Instrucciones de Instalación Manual

Para instalar MCP de GitHub manualmente:

1. Instala el servidor MCP:
   npm install -g @modelcontextprotocol/server-github

2. Configura en tu archivo MCP (usualmente ~/.config/mcp/config.json):
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

3. Reinicia tu editor/IDE para que cargue la configuración MCP.
```

---

## 🔧 Componentes del Sistema

### 1. **MCPDetector**
Detecta si hay servidores MCP disponibles y configurados.

```typescript
import { MCPDetector } from '@autorun/core';

const info = await MCPDetector.detectMCPServer('github');
console.log(info);
// {
//   name: 'GitHub',
//   available: true,
//   configured: false,
//   configPath: undefined
// }
```

### 2. **MCPInstaller**
Instala y configura servidores MCP automáticamente.

```typescript
import { MCPInstaller } from '@autorun/core';

const result = await MCPInstaller.installMCPServer('github', {
  token: 'ghp_...'
});

console.log(result);
// {
//   success: true,
//   message: 'MCP para github configurado exitosamente',
//   configPath: '/Users/user/.config/mcp'
// }
```

### 3. **MCPPrompt**
Maneja la interacción con el usuario.

```typescript
import { MCPPrompt } from '@autorun/core';

const shouldInstall = await MCPPrompt.promptForMCP({
  serviceName: 'github',
  serviceDisplayName: 'GitHub',
  credentials: { token: 'ghp_...' }
});
```

---

## 📁 Ubicación de Configuración MCP

El sistema busca configuración MCP en estos lugares (en orden):

1. `process.env.MCP_CONFIG_PATH`
2. `~/.config/mcp/config.json`
3. `~/.mcp/config.json`
4. `./.mcp/config.json` (directorio del proyecto)

---

## 🎨 Personalización

### Deshabilitar Prompt MCP

Si no quieres que el sistema pregunte sobre MCP:

```json
{
  "autoframe": {
    "addons": {
      "config": {
        "github": {
          "mcp": {
            "autoPrompt": false
          }
        }
      }
    }
  }
}
```

### Forzar Uso de MCP

Si quieres usar MCP siempre que esté disponible:

```json
{
  "autoframe": {
    "addons": {
      "config": {
        "github": {
          "mcp": {
            "preferMCP": true
          }
        }
      }
    }
  }
}
```

---

## 🔍 Verificación Manual

### Verificar si MCP está configurado

```typescript
import { MCPDetector } from '@autorun/core';

const capabilities = await MCPDetector.detectAllCapabilities();
console.log(capabilities);
// {
//   github: true,
//   vercel: false,
//   clarity: true
// }
```

### Ver información detallada

```typescript
const allInfo = await MCPDetector.getAllServerInfo();
allInfo.forEach(info => {
  console.log(`${info.name}: ${info.configured ? '✅ Configurado' : '❌ No configurado'}`);
});
```

---

## 🐛 Troubleshooting

### MCP no se detecta

1. Verifica que MCP esté instalado en tu sistema
2. Verifica que la configuración esté en una de las rutas esperadas
3. Verifica permisos de lectura en el archivo de configuración

### Instalación falla

1. Verifica que tengas permisos de escritura en el directorio de configuración
2. Verifica que las credenciales sean válidas
3. Revisa los logs para errores específicos

### Prompt no aparece

1. Verifica que estés ejecutando en modo interactivo (no en CI/CD)
2. Verifica que MCP esté disponible en el entorno
3. Verifica que el add-on esté correctamente inicializado

---

## 📚 Referencias

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP GitHub Server](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- [MCP Vercel Server](https://github.com/modelcontextprotocol/servers/tree/main/src/vercel)
- [MCP Clarity Server](https://github.com/modelcontextprotocol/servers/tree/main/src/clarity)

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024


