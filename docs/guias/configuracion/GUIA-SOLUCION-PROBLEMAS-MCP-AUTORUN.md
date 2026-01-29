# Guía: Solución de Problemas del MCP de Autorun

**Fecha:** 2025-01-24  
**Objetivo:** Resolver problemas comunes con el MCP Server de Autorun

---

## 🔍 Verificación Inicial

### **Paso 1: Ejecutar Verificación Completa**

```bash
node scripts/verify-autorun-mcp-complete.js
```

Este script verifica:
- ✅ Archivos necesarios
- ✅ Dependencias instaladas
- ✅ Configuración del MCP
- ✅ Capacidad de iniciar el servidor
- ✅ Disponibilidad de tools

---

## 🚨 Problemas Comunes y Soluciones

### **Problema 1: "Error al cargar el MCP"**

**Síntomas:**
- El MCP aparece en error en Cursor
- No se pueden usar los tools de autorun

**Soluciones:**

1. **Verificar configuración:**
   ```bash
   cat ~/.cursor/mcp.json | grep -A 10 "autorun"
   ```

2. **Reinstalar el MCP:**
   ```bash
   npm run autorun:install-mcp
   ```

3. **Reiniciar Cursor completamente:**
   - Cerrar todas las ventanas de Cursor
   - Abrir Cursor nuevamente

4. **Verificar que no hay procesos antiguos:**
   ```bash
   ps aux | grep autorun-mcp
   # Si hay procesos, matarlos:
   killall -9 node
   ```

---

### **Problema 2: "targetFiles.join is not a function"**

**Síntomas:**
- Error al usar `autorun.verify()` o `autorun.apply()`
- El servidor se cierra inesperadamente

**Solución:**
✅ **RESUELTO** - Este error ha sido corregido en la versión actual. Si aún ocurre:

1. **Verificar que estás usando la versión más reciente:**
   ```bash
   git pull
   npm install
   ```

2. **Reinstalar el MCP:**
   ```bash
   npm run autorun:install-mcp
   ```

---

### **Problema 3: "El servidor se cierra inesperadamente"**

**Síntomas:**
- El servidor MCP se desconecta después de un error
- Requiere reactivación manual

**Soluciones:**

1. **Verificar logs en Cursor:**
   - Abrir: `View > Output > MCP`
   - Buscar errores específicos

2. **Mejorar manejo de errores:**
   - El servidor ahora NO se cierra por errores recuperables
   - Solo se cierra por errores críticos (FATAL, CRITICAL)

3. **Verificar que el servidor se puede iniciar manualmente:**
   ```bash
   npx tsx packages/autorun-core/src/cli/autorun-mcp-server.ts
   ```
   
   Si hay errores, verificar:
   - Dependencias instaladas: `npm install`
   - Archivos TypeScript compilados (si es necesario)

---

### **Problema 4: "Tool no encontrado"**

**Síntomas:**
- Error: "Tool desconocido: autorun.xxx"
- Los tools no aparecen en la lista

**Soluciones:**

1. **Verificar que todos los tools están exportados:**
   ```bash
   node scripts/verify-autorun-mcp-complete.js
   ```

2. **Verificar normalización de nombres:**
   - El servidor normaliza `autorun_apply` → `autorun.apply`
   - Si el error persiste, verificar el nombre exacto del tool

3. **Reiniciar el servidor MCP:**
   - Reiniciar Cursor completamente

---

### **Problema 5: "Error de importación"**

**Síntomas:**
- Error: "Cannot find module"
- Error: "Unknown file extension .ts"

**Soluciones:**

1. **Verificar que tsx está instalado:**
   ```bash
   npm list tsx
   ```

2. **Instalar tsx si falta:**
   ```bash
   npm install tsx --save-dev
   ```

3. **Verificar que la configuración usa tsx:**
   ```json
   {
     "mcpServers": {
       "autorun": {
         "command": "/ruta/absoluta/node_modules/.bin/tsx",
         "args": ["/ruta/absoluta/packages/autorun-core/src/cli/autorun-mcp-server.ts"]
       }
     }
   }
   ```

---

## 🔧 Correcciones Aplicadas

### **1. Corrección de `.join()` sin verificación**

**Archivos corregidos:**
- ✅ `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`
- ✅ `packages/autorun-core/src/mcp-server/tools/autorunLint.ts`
- ✅ `packages/autorun-core/src/mcp-server/tools/autorunGitHubCommit.ts`

**Cambio:**
- Ahora se verifica que el valor es un array antes de usar `.join()`
- Se agregan validaciones para prevenir errores

---

### **2. Mejora del Manejo de Errores**

**Archivo:** `packages/autorun-core/src/cli/autorun-mcp-server.ts`

**Cambios:**
- ✅ El servidor NO se cierra por errores recuperables
- ✅ Solo se cierra por errores críticos (FATAL, CRITICAL)
- ✅ Logging detallado de errores

---

### **3. Normalización de `targetFiles`**

**Archivo:** `packages/autorun-core/src/mcp-server/autorunMCPServer.ts`

**Cambios:**
- ✅ Normalización de `targetFiles` antes de pasar a los tools
- ✅ Soporte para array `['diff']` y string `'diff'`
- ✅ Validación de tipos antes de procesar

---

## 📋 Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Ejecutaste `node scripts/verify-autorun-mcp-complete.js`
- [ ] Reinstalaste el MCP: `npm run autorun:install-mcp`
- [ ] Reiniciaste Cursor completamente
- [ ] Verificaste logs en `View > Output > MCP`
- [ ] Verificaste que no hay procesos antiguos: `ps aux | grep autorun-mcp`
- [ ] Verificaste la configuración: `cat ~/.cursor/mcp.json`

---

## 🆘 Si Nada Funciona

1. **Limpiar completamente:**
   ```bash
   # Matar procesos
   killall -9 node
   
   # Reinstalar dependencias
   rm -rf node_modules
   npm install
   
   # Reinstalar MCP
   npm run autorun:install-mcp
   ```

2. **Verificar versión de Node.js:**
   ```bash
   node --version  # Debe ser >= 18
   ```

3. **Verificar versión de Cursor:**
   - Debe ser la versión más reciente
   - Verificar en `Help > About`

4. **Reportar el problema:**
   - Incluir salida de `node scripts/verify-autorun-mcp-complete.js`
   - Incluir logs de `View > Output > MCP`
   - Incluir versión de Node.js y Cursor

---

**Última actualización:** 2025-01-24

