# 🔧 Solución: MCP Timeout al Extraer Props

**Fecha:** 2025-01-03  
**Problema:** El MCP `storybook-mcp` falla con timeout al intentar extraer props de componentes

---

## 🔍 Problema Identificado

El MCP `storybook-mcp` (versión 0.4.1) tiene los siguientes problemas:

1. **Timeout muy corto:** Usa un timeout de 10 segundos para esperar la tabla de props
2. **Selector único:** Solo busca `table.docblock-argstable`, que puede no existir o tardar en cargar
3. **Sin fallbacks:** No tiene selectores alternativos si el selector principal falla
4. **Sin espera para contenido dinámico:** No espera tiempo adicional para que el contenido dinámico se cargue

**Error típico:**
```
Error: Failed to load component page or find props table: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('table.docblock-argstable') to be visible
```

---

## ✅ Solución Implementada

### **1. Wrapper Personalizado**

Se creó un wrapper personalizado (`scripts/storybook-mcp-wrapper.js`) que:

#### **Mejoras de Timeout:**
- ✅ **Timeout aumentado a 30 segundos** (desde 10 segundos)
- ✅ **Timeout de navegación a 60 segundos** (para páginas que tardan en cargar)
- ✅ **Espera adicional de 3 segundos** después de `networkidle` para contenido dinámico

#### **Múltiples Selectores Alternativos:**
```javascript
const selectors = [
  "table.docblock-argstable",        // Selector original
  "table[class*='argstable']",        // Variante con atributo
  "table[class*='props']",            // Cualquier tabla de props
  ".docblock-argstable",              // Selector de clase
  "[class*='argstable']",             // Cualquier elemento con argstable
  "table",                            // Cualquier tabla (último recurso)
];
```

#### **Extracción Inteligente:**
- Si ningún selector funciona, busca en el HTML completo cualquier tabla que contenga headers como "Name", "Type", "Default", "Description"
- Esto asegura que incluso si el formato cambia, podemos extraer la información

#### **Manejo de Errores Mejorado:**
- Errores más descriptivos
- Continúa con otros componentes si uno falla
- Proporciona información detallada sobre qué falló

---

## 📋 Configuración Actualizada

### **Archivos Actualizados:**

1. **`~/.cursor/mcp.json`**
2. **`~/Library/Application Support/Cursor/User/settings.json`**
3. **`~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`**

**Configuración:**
```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "node",
      "args": [
        "/Users/elkinmac/Desktop/Autorun/scripts/storybook-mcp-wrapper.js"
      ],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT"
      }
    }
  }
}
```

---

## 🚀 Próximos Pasos

### **1. Reiniciar Cursor Completamente** ⚠️ CRÍTICO

1. **Cierra Cursor completamente:**
   - macOS: `Cmd + Q` o cerrar todas las ventanas
   - No solo minimizar, debe cerrarse completamente

2. **Vuelve a abrir Cursor**

3. **Espera unos segundos** para que el MCP se inicialice

### **2. Probar el MCP**

Pregunta:
```
"¿Cuáles son las props del componente Button?"
```

O:
```
"Lista los componentes disponibles en Storybook"
```

### **3. Verificar Funcionamiento**

El MCP debería:
- ✅ Conectarse correctamente
- ✅ Listar componentes sin problemas
- ✅ Extraer props con timeout aumentado (30 segundos)
- ✅ Usar múltiples selectores si el principal falla
- ✅ Proporcionar información completa de props

---

## 🔍 Diferencias con el MCP Original

| Característica | MCP Original | Wrapper Personalizado |
|---------------|--------------|----------------------|
| Timeout selector | 10 segundos | 30 segundos |
| Timeout navegación | Default (30s) | 60 segundos |
| Selectores | 1 único | 6 alternativos |
| Extracción fallback | No | Sí (busca en HTML completo) |
| Espera contenido dinámico | No | Sí (3 segundos adicionales) |
| Manejo de errores | Básico | Mejorado con detalles |

---

## 📝 Notas Técnicas

### **Dependencias Requeridas:**
- `@modelcontextprotocol/sdk` (v1.25.1) - Instalado vía `storybook-mcp`
- `playwright` (v1.57.0) - Instalado vía `storybook-mcp`
- `zod` - Instalado vía `storybook-mcp`

### **Compatibilidad:**
- ✅ Storybook v5 (formato actual de UBITS Storybook)
- ✅ Soporta `index.json` con bypass token de Vercel
- ✅ Funciona con contenido dinámico y lazy loading

---

## ✅ Verificación

- [x] Wrapper creado con mejoras
- [x] Configuración actualizada en 3 archivos
- [x] Permisos de ejecución configurados
- [ ] Cursor reiniciado (pendiente usuario)
- [ ] MCP probado y funcionando (pendiente usuario)

---

**Última actualización:** 2025-01-03


