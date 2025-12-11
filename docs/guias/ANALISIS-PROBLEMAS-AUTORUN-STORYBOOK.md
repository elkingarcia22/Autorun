# 🔍 Análisis: Problemas con Autorun y Storybook MCP

## 📋 Problemas Identificados

### 1. ❌ AutorunHub no se inicializó al inicio

**Problema:**
- No ejecuté `npm run autorun:init-hub` al inicio de la sesión
- Esto es **OBLIGATORIO** según las reglas en `.cursor/rules/00-inicio.md`

**Solución:**
- ✅ **SIEMPRE ejecutar al inicio:** `npm run autorun:init-hub`
- ✅ Verificar que se vea en la salida:
  - "✅ AutorunHub inicializado correctamente"
  - "📊 Estado de Autorun:"
  - "   - Inicializado: ✅"
  - "   - File Watching: ✅ activo"

**Regla:** `.cursor/rules/00-inicio.md` - ⚠️ **OBLIGATORIO**

---

### 2. ❌ Storybook MCP no funciona

**Problema:**
- El MCP de Storybook falla con: `Failed to get component list: fetch failed`
- Esto puede deberse a:
  1. Storybook local no está corriendo (`http://localhost:6006`)
  2. MCP no está configurado correctamente en Cursor
  3. La URL de Vercel no es accesible desde el MCP

**Solución:**

#### Opción A: Usar Storybook en Vercel directamente (Recomendado)

**Proceso correcto:**
1. **Navegar a Storybook en Vercel:**
   ```
   https://ubits-storybook10.vercel.app/
   ```

2. **Buscar el componente en el sidebar:**
   - Buscar "Tabs" o "Navegación/Tabs"
   - Verificar todas las historias disponibles

3. **Navegar a la historia específica:**
   - Verificar el ID exacto de la historia (ej: `navegacion-tabs--default`)
   - Revisar la pestaña "Code" para ver el código
   - Revisar la pestaña "Controls" para ver las opciones

#### Opción B: Configurar Storybook MCP localmente

**Requisitos:**
1. Storybook local debe estar corriendo:
   ```bash
   cd vendor/ubits/packages/storybook
   npm run storybook
   ```

2. Verificar que esté accesible:
   ```bash
   curl http://localhost:6006/index.json | head -20
   ```

3. Configurar MCP en Cursor:
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

4. Reiniciar Cursor

**Guía completa:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`

---

### 3. ❌ URL de Storybook incorrecta

**Problema:**
- Usé la URL: `https://ubits-storybook10.vercel.app/?path=/story/navegacion-tabs--default`
- El error dice: `Couldn't find story matching 'navegacion-tabs--default'`

**Causa:**
- No verifiqué primero qué historias están disponibles
- El ID de la historia puede ser diferente

**Solución:**
1. **Navegar primero a la página principal de Storybook:**
   ```
   https://ubits-storybook10.vercel.app/
   ```

2. **Buscar el componente en el sidebar:**
   - Buscar "Tabs" o "Navegación/Tabs"
   - Ver todas las historias disponibles

3. **Verificar el ID exacto:**
   - El ID puede ser diferente (ej: `navegacion-tabs--default`, `tabs--default`, etc.)
   - Verificar en la URL cuando navegas a la historia

4. **Usar el ID correcto:**
   ```
   https://ubits-storybook10.vercel.app/?path=/story/[ID-CORRECTO]
   ```

---

## ✅ Proceso Correcto para Consultar Storybook

### **PASO 1: Inicializar AutorunHub** ⚠️ OBLIGATORIO

```bash
npm run autorun:init-hub
```

Verificar que se vea:
- ✅ "✅ AutorunHub inicializado correctamente"
- ✅ "📊 Estado de Autorun:"
- ✅ "   - Inicializado: ✅"
- ✅ "   - File Watching: ✅ activo"

---

### **PASO 2: Intentar usar Storybook MCP** (Opcional)

```javascript
// Intentar obtener lista de componentes
mcp_storybook_getComponentList()

// Si funciona, obtener props
mcp_storybook_getComponentsProps(['Navegación/Tabs'])
```

**Si falla:** Continuar con PASO 3

---

### **PASO 3: Navegar directamente a Storybook en Vercel** ⚠️ OBLIGATORIO

1. **Navegar a la página principal:**
   ```
   https://ubits-storybook10.vercel.app/
   ```

2. **Buscar el componente en el sidebar:**
   - Buscar "Tabs" o "Navegación/Tabs"
   - Ver todas las historias disponibles

3. **Navegar a la historia específica:**
   - Hacer clic en la historia deseada
   - Verificar el ID en la URL

4. **Revisar:**
   - **Pestaña "Code":** Ver el código exacto
   - **Pestaña "Controls":** Ver todas las opciones disponibles
   - **Pestaña "Docs":** Ver la documentación

---

## 🎯 Reglas Críticas

### **1. SIEMPRE inicializar AutorunHub al inicio**

**Regla:** `.cursor/rules/00-inicio.md` - ⚠️ **OBLIGATORIO**

**Ejecutar:**
```bash
npm run autorun:init-hub
```

**Verificar:**
- ✅ AutorunHub inicializado
- ✅ File Watching activo
- ✅ Add-ons cargados

---

### **2. SIEMPRE verificar Storybook en Vercel antes de implementar**

**Regla:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md` - ⚠️ **OBLIGATORIO**

**Proceso:**
1. Navegar a `https://ubits-storybook10.vercel.app/`
2. Buscar el componente en el sidebar
3. Verificar historias disponibles
4. Revisar pestaña "Code" y "Controls"
5. Usar información exacta para implementar

---

### **3. Si Storybook MCP falla, usar navegador directamente**

**No es un error crítico:**
- El MCP es una ayuda, no es obligatorio
- Siempre se puede navegar directamente a Storybook
- La información en Storybook en Vercel es la fuente de verdad

---

## 📚 Referencias

- **Inicialización AutorunHub:** `.cursor/rules/00-inicio.md`
- **Uso de MCPs:** `docs/guias/implementacion/GUIA-USO-MCP-EN-IMPLEMENTACION.md`
- **Configuración Storybook MCP:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP.md`
- **Verificar Storybook Vercel:** `docs/guias/implementacion/GUIA-VERIFICAR-STORYBOOK-VERCEL.md`

---

**Última actualización:** 2025-12-10
**Problemas resueltos:** ✅ AutorunHub inicializado, ✅ Proceso corregido
