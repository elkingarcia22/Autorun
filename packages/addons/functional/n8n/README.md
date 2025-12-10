# @autorun/n8n

Add-on funcional para integración con n8n - Automatización de workflows con acceso a 525+ nodos de n8n mediante MCP.

## 📋 Descripción

Este add-on proporciona integración completa con n8n, permitiendo:

- ✅ Acceso a 525+ nodos de n8n con 99% de cobertura de propiedades
- ✅ Creación y gestión de workflows
- ✅ Ejecución de workflows desde Autorun
- ✅ Validación automática de configuración
- ✅ Integración con MCP (Model Context Protocol) para mejor experiencia
- ✅ Documentación completa de nodos y propiedades

## 🚀 Características

### Integración MCP Automática

El add-on detecta automáticamente si el servidor MCP de n8n está disponible y ofrece instalarlo durante la inicialización. El MCP proporciona:

- **Smart Node Discovery**: Búsqueda y descubrimiento de todos los nodos de n8n con documentación completa
- **Workflow Validation**: Validación de configuración y verificación de propiedades
- **Lightning Fast**: Consultas SQLite con tiempo de respuesta promedio de 12ms
- **n8n Management Tools**: Crear, actualizar y gestionar workflows directamente desde AI assistants
- **Powerful Diff-Edit**: Ahorra 80-90% de tokens con actualizaciones inteligentes basadas en diff
- **Real-time Execution**: Monitorear y gestionar ejecuciones de workflows con seguimiento completo de estado

### Funcionalidades del Servicio

- **Verificación de conexión**: Valida automáticamente la conexión con tu instancia de n8n
- **Gestión de workflows**: Obtener lista de workflows y ejecutarlos
- **Configuración flexible**: Soporta modo stdio y HTTP
- **Logging configurable**: Controla el nivel de logs según tus necesidades

## 📦 Instalación

El add-on se instala automáticamente cuando se agrega a la configuración de Autorun. No requiere instalación manual de paquetes.

### Configuración

Agrega el add-on a tu `autorun.config.json`:

```json
{
  "autorun": {
    "addons": {
      "active": ["n8n"],
      "config": {
        "n8n": {
          "n8nApiUrl": "https://your-n8n-instance.com",
          "n8nApiKey": "your-api-key",
          "mode": "stdio",
          "logLevel": "error",
          "disableConsoleOutput": true
        }
      }
    }
  }
}
```

### Variables de Entorno

También puedes configurar mediante variables de entorno:

```bash
export N8N_API_URL="https://your-n8n-instance.com"
export N8N_API_KEY="your-api-key"
```

## ⚙️ Configuración

### Opciones de Configuración

| Opción | Tipo | Descripción | Requerido | Default |
|--------|------|-------------|-----------|---------|
| `n8nApiUrl` | `string` | URL de tu instancia de n8n | Opcional* | - |
| `n8nApiKey` | `string` | API Key de n8n | Opcional* | - |
| `mode` | `'stdio' \| 'http'` | Modo de operación del MCP | No | `'stdio'` |
| `logLevel` | `'error' \| 'warn' \| 'info' \| 'debug'` | Nivel de logging | No | `'error'` |
| `disableConsoleOutput` | `boolean` | Deshabilitar output en consola | No | `true` |

\* **Nota**: `n8nApiUrl` y `n8nApiKey` son opcionales si solo quieres usar las herramientas de documentación del MCP. Si los proporcionas, tendrás acceso completo a gestión de workflows y ejecuciones.

## 🔌 Integración MCP

### Instalación Automática

El add-on detecta automáticamente si el servidor MCP de n8n está disponible y ofrece instalarlo durante la inicialización. Si aceptas, se configurará automáticamente en tu archivo MCP.

### Instalación Manual

Si prefieres instalar manualmente, agrega la siguiente configuración a tu archivo MCP (usualmente `~/.cursor/mcp.json` o `~/.config/mcp/config.json`):

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "N8N_API_URL": "https://your-n8n-instance.com",
        "N8N_API_KEY": "your-api-key"
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
3. Si hay configuración de API, verifica la conexión con n8n
4. Inicializa el servicio

### Servicios Disponibles

Una vez inicializado, puedes acceder a los servicios del add-on:

```typescript
import { AutorunHub } from '@autorun/core';

const hub = AutorunHub.getInstance();
const n8nAddon = hub.getAddon('n8n');

if (n8nAddon) {
  const services = n8nAddon.getServices();
  
  // Obtener lista de workflows
  const workflows = await services.getWorkflows();
  
  // Ejecutar un workflow
  const result = await services.executeWorkflow('workflow-id', { input: 'data' });
  
  // Verificar conexión
  await services.verifyConnection();
  
  // Obtener configuración
  const config = services.getConfig();
}
```

## 🎯 Casos de Uso

### 1. Documentación de Nodos

Usa el MCP para obtener documentación completa de cualquier nodo de n8n:

```
¿Cómo configuro el nodo HTTP Request?
```

El MCP proporcionará documentación completa con todas las propiedades disponibles.

### 2. Creación de Workflows

Crea workflows de n8n directamente desde Autorun usando el MCP:

```
Crea un workflow que envíe un email cuando se cree un issue en GitHub
```

### 3. Validación de Workflows

Valida la configuración de workflows antes de ejecutarlos:

```
Valida este workflow de n8n: [workflow JSON]
```

### 4. Ejecución de Workflows

Ejecuta workflows existentes desde Autorun:

```typescript
const result = await services.executeWorkflow('workflow-id', {
  input: 'data'
});
```

## 🔍 Detección y Diagnóstico

### Verificar Estado del MCP

El add-on registra información sobre el estado del MCP en los logs:

- ✅ `MCP detectado y configurado`: El MCP está listo para usar
- ⚠️ `MCP disponible pero no configurado`: El add-on ofrecerá instalarlo
- ℹ️ `Continuando sin MCP`: El add-on funcionará sin MCP (solo funcionalidades básicas)

### Verificar Conexión con n8n

Si configuraste `n8nApiUrl` y `n8nApiKey`, el add-on verificará automáticamente la conexión durante la inicialización. Si hay problemas, verás un warning en los logs.

## 🛠️ Desarrollo

### Estructura del Add-on

```
packages/addons/functional/n8n/
├── src/
│   ├── N8nAddon.ts      # Clase principal del add-on
│   ├── N8nService.ts     # Servicio de integración con n8n
│   └── index.ts         # Exportaciones públicas
├── manifest.json         # Metadatos del add-on
├── package.json          # Configuración del paquete
├── tsconfig.json         # Configuración TypeScript
└── README.md             # Esta documentación
```

### Compilar

```bash
cd packages/addons/functional/n8n
npm run build
```

### Desarrollo con Watch

```bash
npm run dev
```

## 📖 Referencias

- [n8n MCP Documentation](https://www.n8n-mcp.com/)
- [n8n Documentation](https://docs.n8n.io/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 🤝 Contribuir

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.

## 📝 Licencia

MIT
