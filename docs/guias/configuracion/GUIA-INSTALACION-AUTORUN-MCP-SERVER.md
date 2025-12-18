# Guía: Instalación del Autorun MCP Server

**Fecha:** 2025-01-03  
**Objetivo:** Instalar y configurar el Autorun MCP Server para uso con Cursor

---

## 🎯 ¿Qué es el Autorun MCP Server?

El **Autorun MCP Server** es un servidor MCP (Model Context Protocol) que expone tools para implementar componentes desde Storybook de forma **forzosa y automática**.

**Ventajas:**
- ✅ **Enforcement real:** El agente NO puede saltarse el flujo
- ✅ **Único camino válido:** Solo puede implementar usando `autorun.apply()`
- ✅ **Orquestación automática:** Integra todos los add-ons automáticamente
- ✅ **Flujo completo:** Ejecuta TODO el proceso de implementación

---

## 📋 Requisitos Previos

1. ✅ Autorun inicializado (`npm run autorun:init-hub`)
2. ✅ Node.js instalado
3. ✅ Cursor IDE instalado
4. ✅ Proyecto compilado (`npm run build` en `packages/autorun-core`)

---

## 🚀 Instalación Automática (Recomendado)

### **Paso 1: Compilar el Proyecto**

```bash
# Desde la raíz del proyecto
cd packages/autorun-core
npm run build
cd ../..
```

### **Paso 2: Instalar MCP Server**

```bash
# Desde la raíz del proyecto
npm run autorun:install-mcp
```

**Qué hace:**
- ✅ Detecta si estás usando Cursor
- ✅ Crea/actualiza `.cursor/mcp.json`
- ✅ Configura el servidor MCP de Autorun
- ✅ Verifica que todo esté correcto

### **Paso 3: Reiniciar Cursor**

**⚠️ IMPORTANTE:** Debes reiniciar Cursor completamente para que cargue el nuevo servidor MCP.

---

## 🔧 Instalación Manual

Si prefieres instalar manualmente:

### **Paso 1: Compilar el Proyecto**

```bash
cd packages/autorun-core
npm run build
cd ../..
```

### **Paso 2: Configurar `.cursor/mcp.json`**

Crea o edita `.cursor/mcp.json` en la raíz del proyecto:

```json
{
  "mcpServers": {
    "autorun": {
      "command": "node",
      "args": [
        "packages/autorun-core/dist/cli/autorun-mcp-server.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

**Nota:** Si el archivo compilado no existe, usa `tsx`:

```json
{
  "mcpServers": {
    "autorun": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "packages/autorun-core/src/cli/autorun-mcp-server.ts"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### **Paso 3: Reiniciar Cursor**

Reinicia Cursor completamente.

---

## ✅ Verificación

### **Verificar que el Servidor Está Configurado**

```bash
# Verificar configuración
cat .cursor/mcp.json | grep -A 5 "autorun"
```

Deberías ver la configuración del servidor.

### **Probar el Servidor Manualmente**

```bash
# Ejecutar el servidor directamente (debe iniciar sin errores)
npm run autorun:mcp-server
```

Si ves `✅ [Autorun MCP Server] Servidor iniciado y listo`, está funcionando correctamente.

**⚠️ NOTA:** El servidor se ejecuta en modo stdio, así que no verás output normal. Los mensajes van a `stderr`.

---

## 🛠️ Tools Disponibles

Una vez instalado, el agente puede usar estos tools:

### **Tools Principales:**

1. **`autorun.plan(message)`**
   - Genera plan de implementación sin ejecutar
   - Útil para previsualizar qué se va a hacer

2. **`autorun.apply({ message, targetFiles?, options? })`** ⭐ CRÍTICO
   - Ejecuta TODO el flujo de implementación
   - Único camino válido para implementar componentes

3. **`autorun.verify({ targetFiles | 'diff', options? })`**
   - Verifica que archivos fueron generados correctamente

### **Tools de Add-ons:**

4. **`autorun.checklist({ componentName })`**
   - Obtiene checklist de implementación

5. **`autorun.storybook.start({ port?, host? })`**
   - Inicia servidor de Storybook local

6. **`autorun.storybook.build({ outputDir? })`**
   - Construye Storybook estático

7. **`autorun.problems.list({ category?, severity?, limit? })`**
   - Lista problemas detectados

8. **`autorun.github.commit({ files, message, push? })`**
   - Hace commit manual

9. **`autorun.lint({ files, fix? })`**
   - Ejecuta ESLint

10. **`autorun.visual.test({ componentId?, storyId? })`**
    - Ejecuta tests visuales

---

## 📝 Ejemplo de Uso

### **Desde el Agente (Cursor):**

```typescript
// El agente puede llamar:
const result = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.apply",
  arguments: {
    message: "implementa un botón secundario solo icono que abra un drawer",
    targetFiles: ["prototypes/template.html"]
  }
});

// Autorun ejecuta automáticamente:
// ✅ Detección → Storybook MCP → Extracción → Validación → Implementación
// ✅ Prettier → ESLint → Auto-Reload → GitHub (si está configurado)
```

---

## 🔍 Solución de Problemas

### **Problema: "Tool desconocido: autorun.apply"**

**Causa:** El servidor MCP no está cargado en Cursor.

**Solución:**
1. Verifica que `.cursor/mcp.json` existe y tiene la configuración correcta
2. Reinicia Cursor completamente
3. Verifica que el servidor puede ejecutarse: `npm run autorun:mcp-server`

### **Problema: "Error: Cannot find module"**

**Causa:** El proyecto no está compilado o las rutas son incorrectas.

**Solución:**
1. Compila el proyecto: `cd packages/autorun-core && npm run build`
2. Verifica que existe `dist/cli/autorun-mcp-server.js`
3. Si no existe, usa la versión con `tsx` en `mcp.json`

### **Problema: "AutorunHub no está inicializado"**

**Causa:** AutorunHub no se ha inicializado antes de usar el MCP server.

**Solución:**
1. Inicializa AutorunHub: `npm run autorun:init-hub`
2. El MCP server intentará inicializarlo automáticamente, pero es mejor hacerlo manualmente primero

---

## 📚 Referencias

- **Plan de Implementación:** `docs/analisis/PLAN-IMPLEMENTACION-AUTORUN-MCP-SERVER-2025-01-03.md`
- **Integración con Add-ons:** `docs/analisis/PLAN-INTEGRACION-MCP-SERVER-CON-ADDONS-2025-01-03.md`
- **Análisis de ChatGPT:** `docs/analisis/ANALISIS-PROFUNDO-RESPUESTA-GPT-2025-01-03.md`

---

**Última actualización:** 2025-01-03
