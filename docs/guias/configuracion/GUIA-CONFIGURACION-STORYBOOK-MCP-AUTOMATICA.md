# 🔧 Guía: Configuración Automática de Storybook MCP

## ⚡ Configuración Automática (Recomendado)

### **Opción 1: Usar el Script Automático** ⭐

El script detecta automáticamente si Storybook local está corriendo y configura el MCP correctamente:

```bash
npm run setup-storybook-mcp
```

**El script:**
1. ✅ Verifica si Storybook local está corriendo (`http://localhost:6006`)
2. ✅ Si está corriendo, usa la URL local
3. ✅ Si no está corriendo, usa Vercel con token de bypass automáticamente
4. ✅ Escribe la configuración en el archivo correcto de Cursor
5. ✅ Muestra instrucciones claras

**Después de ejecutar:**
1. Reinicia Cursor completamente
2. Verifica que funciona preguntando: "Lista los componentes disponibles en Storybook"

---

## 📋 Configuración Manual (Si el script no funciona)

### **Paso 1: Verificar Storybook Local**

```bash
# Verificar si Storybook local está corriendo
curl http://localhost:6006/index.json | head -20

# Si no está corriendo, iniciarlo:
cd vendor/ubits/packages/storybook
npm run storybook
```

### **Paso 2: Localizar Archivo de Configuración MCP**

**macOS:**
```
~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json
```

**Windows:**
```
%APPDATA%\Cursor\User\globalStorage\rooveterinaryinc.roo-cline\settings\cline_mcp_settings.json
```

**Linux:**
```
~/.config/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json
```

### **Paso 3: Agregar Configuración**

#### **Opción A: Storybook Local (Si está corriendo)**

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

#### **Opción B: Vercel (Si Storybook local no está corriendo)**

```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT"
      }
    }
  }
}
```

### **Paso 4: Reiniciar Cursor**

1. Cierra Cursor completamente
2. Vuelve a abrirlo
3. Verifica que el MCP funciona

---

## ✅ Verificación

### **Verificar que el MCP Funciona**

1. **Pregunta al asistente:**
   ```
   "Lista los componentes disponibles en Storybook"
   ```

2. **O pregunta:**
   ```
   "¿Cuáles son las props del componente Tabs?"
   ```

3. **Si funciona correctamente:**
   - ✅ El asistente debería poder listar componentes
   - ✅ Debería poder obtener props de componentes
   - ✅ No debería mostrar errores de conexión

---

## 🔍 Solución de Problemas

### **Error: "Failed to get component list: fetch failed"**

**Causas posibles:**
1. Storybook local no está corriendo
2. URL incorrecta en la configuración
3. Token de bypass incorrecto (si usas Vercel)

**Soluciones:**
1. **Verificar Storybook local:**
   ```bash
   curl http://localhost:6006/index.json
   ```

2. **Si Storybook local no está corriendo:**
   - Ejecuta: `npm run setup-storybook-mcp` (usa Vercel automáticamente)
   - O inicia Storybook local: `cd vendor/ubits/packages/storybook && npm run storybook`

3. **Verificar configuración:**
   - Asegúrate de que la URL en `STORYBOOK_URL` sea correcta
   - Si usas Vercel, verifica que el token de bypass sea correcto

### **Error: "MCP server not found"**

**Solución:**
1. Verifica que el archivo de configuración esté en la ubicación correcta
2. Verifica la sintaxis JSON (debe ser válido)
3. Reinicia Cursor completamente

### **El MCP no aparece en Cursor**

**Solución:**
1. Verifica que el archivo de configuración esté en la ubicación correcta
2. Verifica que Cursor tenga permisos para leer el archivo
3. Reinicia Cursor completamente
4. Verifica en Settings → Features → MCP que el servidor esté listado

---

## 🎯 Uso del Helper TypeScript

Si estás desarrollando y necesitas usar el helper programáticamente:

```typescript
import { 
  getStorybookMCPConfig, 
  getFullMCPConfig,
  getMCPSetupInstructions 
} from '@autorun/core/helpers/storybookMCPHelper';

// Obtener configuración
const config = await getStorybookMCPConfig();
console.log('URL:', config.url);
console.log('Local disponible:', config.localAvailable);

// Obtener configuración completa para MCP
const fullConfig = await getFullMCPConfig();
console.log(JSON.stringify(fullConfig, null, 2));

// Obtener instrucciones
const instructions = await getMCPSetupInstructions();
console.log(instructions);
```

---

## 📚 Referencias

- **Script automático:** `scripts/setup-storybook-mcp-auto.js`
- **Helper TypeScript:** `packages/autorun-core/src/helpers/storybookMCPHelper.ts`
- **Guía manual:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`
- **Token de bypass:** Ver `packages/autorun-core/src/wizard/UBITSPreset.ts`

---

**Última actualización:** 2025-12-10
**Versión:** 1.0.0
