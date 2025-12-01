# 📚 Guía: Configuración de Storybook MCP para Autorun

Esta guía explica cómo configurar el servidor MCP de Storybook para que el asistente de Cursor pueda acceder a los componentes y plantillas de UBITS desde el Storybook.

## 🎯 ¿Qué es Storybook MCP?

El [Storybook MCP](https://github.com/mcpland/storybook-mcp) es un servidor MCP (Model Context Protocol) que permite al asistente de Cursor:
- **Listar todos los componentes** disponibles en el Storybook
- **Obtener props detallados** de componentes específicos
- **Extraer información** de plantillas y documentación
- **Usar herramientas personalizadas** para consultas específicas

## ✅ Verificación Previa

### 1. Storybook Local Funcionando

El Storybook local debe estar corriendo y accesible:

```bash
# Verificar que Storybook esté corriendo
curl http://localhost:6006/index.json | head -20

# Si no está corriendo, iniciarlo:
cd vendor/ubits/packages/storybook
npm run storybook
```

**URL Local:** `http://localhost:6006/index.json`

### 2. Storybook en Vercel (Opcional)

El Storybook desplegado en Vercel está protegido con autenticación. Para usarlo con MCP:

**Opción A: Usar URL Local (Recomendado)**
- Más rápido
- No requiere autenticación
- Funciona offline

**Opción B: Usar URL de Vercel**
- Requiere token de bypass de Vercel
- Más lento (depende de internet)
- Útil para compartir con otros

**URL Vercel:** `https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/index.json`

## 🔧 Configuración del MCP en Cursor

### Paso 1: Localizar Archivo de Configuración MCP

La configuración MCP de Cursor está en uno de estos lugares:

**macOS:**
```bash
~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json
```

**O en la configuración de Cursor:**
1. Abre Cursor
2. Ve a `Settings` → `Features` → `MCP`
3. O busca "MCP" en la configuración

### Paso 2: Agregar Configuración de Storybook MCP

Agrega la siguiente configuración al archivo MCP de Cursor:

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

### Paso 3: Configuración con URL de Vercel (Opcional)

Si quieres usar el Storybook de Vercel, necesitas un token de bypass:

```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10-q59fh1csi-elkin-garcias-projects-a0b1beb6.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=TU_TOKEN_AQUI"
      }
    }
  }
}
```

**Obtener Token de Bypass de Vercel:**
1. Ve a https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
2. Sigue las instrucciones para obtener el token
3. Reemplaza `TU_TOKEN_AQUI` con el token real

## 🛠️ Herramientas Personalizadas (Opcional)

Puedes agregar herramientas personalizadas para extraer información específica del Storybook:

```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "http://localhost:6006/index.json",
        "CUSTOM_TOOLS": "[{\"name\":\"getComponentTokens\",\"description\":\"Get design tokens used by a component\",\"parameters\":{\"type\":\"object\",\"properties\":{\"componentName\":{\"type\":\"string\"}},\"required\":[\"componentName\"]},\"page\":\"http://localhost:6006/?path=/docs/basicos-button--docs\",\"handler\":\"Array.from(document.querySelectorAll('.token-name')).map(el => el.textContent)\"},{\"name\":\"getTemplateStructure\",\"description\":\"Get structure of a template\",\"parameters\":{\"type\":\"object\",\"properties\":{\"templateName\":{\"type\":\"string\"}},\"required\":[\"templateName\"]},\"page\":\"http://localhost:6006/?path=/docs/templates-templates-ubits-desktop--docs\",\"handler\":\"document.querySelector('.template-structure')?.textContent || 'No structure found'\"}]"
      }
    }
  }
}
```

## 📋 Componentes Disponibles en el Storybook

El Storybook de UBITS incluye:

### Tokens
- Modificadores (.modifiers)
- Semánticos
- Componentes
- Effects
- Tipografía
- Spacing
- Text Styles
- Border Radius

### Componentes
- **Básicos:** Button, Input, Avatar, Badge, Chip, Skeleton, Spinner, Status Tag
- **Navegación:** Sidebar, SubNav, TabBar, Tabs, Breadcrumb, Menu, Segment Control
- **Layout:** Card, Accordion, Carousel, Gallery, Stepper, Timeline
- **Formularios:** Calendar, Checkbox, File Upload, Radio Button, Slider, Toggle, Search Button
- **Data:** DataTable, DataView, List, Pagination
- **Feedback:** Alert, Modal, Drawer, Toast, Tooltip, Popover, Empty State, Mask
- **Charts:** Bar Metric Card, CSAT Metric Card, Text Metric Card, NPS Card, Progress Bar, Circle Metric Card, Score Card Metrics

### Templates
- Templates UBITS Desktop
- Welcome Test

## 🚀 Uso del MCP

Una vez configurado, el asistente de Cursor puede:

1. **Listar componentes:**
   ```
   "¿Qué componentes están disponibles en el Storybook?"
   ```

2. **Obtener props de componentes:**
   ```
   "¿Cuáles son las props del componente Button?"
   ```

3. **Consultar plantillas:**
   ```
   "¿Cómo está estructurado el template desktop?"
   ```

4. **Extraer tokens:**
   ```
   "¿Qué tokens de spacing están disponibles?"
   ```

## 🔍 Verificación

Para verificar que el MCP está funcionando:

1. Reinicia Cursor después de agregar la configuración
2. Pregunta al asistente: "Lista los componentes disponibles en Storybook"
3. El asistente debería poder acceder al Storybook y listar los componentes

## ⚠️ Solución de Problemas

### Error: "Cannot connect to Storybook"

**Solución:**
- Verifica que Storybook esté corriendo: `curl http://localhost:6006/index.json`
- Verifica que la URL en la configuración MCP sea correcta
- Asegúrate de que no haya firewall bloqueando el puerto 6006

### Error: "Authentication Required" (Vercel)

**Solución:**
- Usa la URL local en su lugar: `http://localhost:6006/index.json`
- O configura el token de bypass de Vercel correctamente

### MCP no aparece en Cursor

**Solución:**
- Verifica que el archivo de configuración esté en la ubicación correcta
- Reinicia Cursor completamente
- Verifica la sintaxis JSON del archivo de configuración

## 📚 Referencias

- [Storybook MCP GitHub](https://github.com/mcpland/storybook-mcp)
- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- [Vercel Protection Bypass](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation)

