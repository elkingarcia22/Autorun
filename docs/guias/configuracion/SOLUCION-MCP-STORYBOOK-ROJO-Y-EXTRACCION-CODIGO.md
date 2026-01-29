# Solución: MCP de Storybook se pone rojo y extracción de código HTML

**Fecha:** 2025-01-24  
**Problema:** El MCP de Storybook se pone rojo y no puede extraer código HTML directamente

---

## 🔍 Problemas Identificados

1. **MCP de Storybook se pone rojo:**
   - Falta de logging detallado
   - Errores no capturados cierran el proceso
   - No hay manejo robusto de errores

2. **No puede extraer código HTML directamente:**
   - El tool `autorun.storybook.extract` requiere Browser MCP
   - No hay tool en el MCP de Storybook para extraer código HTML
   - Requiere hacer clic en pestaña "Code" manualmente

---

## ✅ Soluciones Aplicadas

### **1. Agregado Tool `getComponentCode` al MCP de Storybook** ⭐ NUEVO

**Archivo:** `scripts/storybook-mcp-wrapper.mjs`

**Funcionalidad:**
- ✅ Extrae código HTML/JS directamente desde la pestaña "Code" de Storybook
- ✅ Usa Playwright para navegar y hacer clic automáticamente
- ✅ NO requiere Browser MCP ni snapshots
- ✅ Funciona completamente en el servidor MCP

**Uso:**
```typescript
await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentCode',
  arguments: {
    componentId: 'data-data-table',
    storyName: 'default' // opcional
  }
});
```

**Retorna:**
```json
{
  "success": true,
  "html": "<div id=\"table-container\">...</div>",
  "js": "window.UBITS.DataTable.create({...})",
  "componentId": "data-data-table",
  "storyName": "default",
  "codeLength": 1234
}
```

---

### **2. Logging Detallado Agregado** ✅

**Mejoras:**
- ✅ Logging de inicio del servidor
- ✅ Logging de cada tool llamado
- ✅ Logging de argumentos recibidos
- ✅ Logging de errores con stack traces
- ✅ Logging de pasos de extracción de código

**Ejemplo de logs:**
```
[Storybook MCP] Iniciando servidor...
[Storybook MCP] STORYBOOK_URL: https://ubits-storybook10.vercel.app/...
[Storybook MCP] ✅ Servidor iniciado correctamente
[Storybook MCP] 🔧 Tool llamado: getComponentCode
[Storybook MCP] 📋 Args: {"componentId":"data-data-table","storyName":"default"}
[Storybook MCP] 🔍 Extrayendo código para: data-data-table--default
[Storybook MCP] 📚 URL: https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default
[Storybook MCP] 🌐 Navegando a Storybook...
[Storybook MCP] 🔍 Buscando pestaña "Code"...
[Storybook MCP] ✅ Pestaña Code encontrada
[Storybook MCP] 📋 Extrayendo código...
[Storybook MCP] ✅ Código extraído: 1234 caracteres
```

---

### **3. Manejo Robusto de Errores** ✅

**Mejoras:**
- ✅ Errores no capturados NO cierran el proceso
- ✅ Errores en tools retornan JSON estructurado
- ✅ Stack traces incluidos en respuestas de error
- ✅ El servidor continúa funcionando después de errores

**Formato de error:**
```json
{
  "success": false,
  "error": "Error message",
  "tool": "getComponentCode",
  "stack": "Error stack trace..."
}
```

---

## 📋 Cómo Usar el Nuevo Tool

### **Desde el Agente:**

```typescript
// Extraer código HTML del DataTable
const result = await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentCode',
  arguments: {
    componentId: 'data-data-table',
    storyName: 'default'
  }
});

const codeData = JSON.parse(result.content[0].text);
if (codeData.success) {
  console.log('HTML:', codeData.html);
  console.log('JS:', codeData.js);
} else {
  console.error('Error:', codeData.error);
}
```

---

## 🔧 Verificación

### **Paso 1: Reiniciar Cursor**

1. **Cerrar TODAS las ventanas de Cursor**
2. **Esperar 5 segundos**
3. **Abrir Cursor nuevamente**

### **Paso 2: Verificar Logs**

1. **Abrir:** `View > Output > MCP`
2. **Buscar:** `[Storybook MCP]` en los logs
3. **Verificar:**
   - ✅ "✅ Servidor iniciado correctamente"
   - ✅ No hay errores rojos

### **Paso 3: Probar el Tool**

```typescript
// Probar extracción de código
await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentCode',
  arguments: {
    componentId: 'data-data-table'
  }
});
```

---

## ⚠️ Notas Importantes

1. **El tool usa Playwright:**
   - Requiere que Playwright esté instalado
   - Usa navegador headless
   - Timeout de 60 segundos para cargar página

2. **Múltiples selectores:**
   - El tool intenta múltiples selectores para encontrar la pestaña "Code"
   - Si falla, intenta extraer código directamente

3. **Logging en stderr:**
   - Todos los logs van a `stderr` para no interferir con el protocolo MCP
   - Ver logs en `View > Output > MCP` en Cursor

---

## 📚 Referencias

- **Wrapper:** `scripts/storybook-mcp-wrapper.mjs`
- **Tool Autorun:** `packages/autorun-core/src/mcp-server/tools/autorunStorybookExtract.ts`
- **Guía MCP Storybook:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`

---

**Última actualización:** 2025-01-24


