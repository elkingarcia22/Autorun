# 🔧 Fix Completo: Problemas del Wizard con MCPs

**Fecha:** 2025-01-24  
**Estado:** ✅ Corregido  
**Problemas:** 
1. Wizard se detiene en configuración de GitHub
2. n8n-mcp instala pero da errores
3. Se instalan 2 MCPs de Google Sheets (duplicados)
4. MCP de autorun no se instala

---

## 📋 Problemas Identificados y Corregidos

### **1. Wizard se detiene en configuración de GitHub** ✅ CORREGIDO

**Problema:** El wizard se quedaba esperando indefinidamente en `askAndConfigureGitHub()` y `configureGitHub()`.

**Solución:**
- Agregado timeout de 10 segundos para `confirm()`
- Agregado timeout de 30 segundos para `question()`
- Verificación de readline antes de preguntar
- Omitir automáticamente si readline no está disponible

**Archivo:** `packages/autorun-core/src/wizard/InitializationWizard.ts`

---

### **2. n8n-mcp instala pero da errores** ⚠️ PARCIALMENTE CORREGIDO

**Problemas observados:**
- `ENOTEMPTY: directory not empty` - Problema con cache de npm
- `Permission denied` - Problema de permisos en `.npm/_npx`
- `command not found` - n8n-mcp no se encuentra después de instalar

**Soluciones aplicadas:**
- Limpieza de cache de npx: `rm -rf ~/.npm/_npx`
- El wizard ahora maneja errores sin detener el proceso
- Se muestra mensaje de error pero continúa con otros MCPs

**Recomendación:**
```bash
# Limpiar cache de npm manualmente si persisten errores
rm -rf ~/.npm/_npx
npm cache clean --force
```

---

### **3. Se instalan 2 MCPs de Google Sheets (duplicados)** ✅ CORREGIDO

**Problema:** Google Sheets tenía `mcpNames: ['google-sheets', 'mcp-gsheets']` pero ambos apuntan al mismo paquete.

**Solución:**
- Removido `'mcp-gsheets'` de la lista
- Ahora solo instala `'google-sheets'`
- Ambos casos en `getServerConfig` apuntan al mismo paquete `mcp-gsheets@latest`

**Archivo:** `packages/autorun-core/src/wizard/InitializationWizard.ts` (línea 2340)

---

### **4. MCP de autorun no se instala** ✅ CORREGIDO

**Problema:** El MCP de autorun no estaba en la lista de `mcpSupportedAddons` y no se agregaba automáticamente.

**Solución:**
- Agregado `'autorun'` a la lista de `mcpSupportedAddons`
- Agregado `'autorun'` automáticamente a la lista de add-ons cuando se llama `configureMCPForAddons()`
- El MCP de autorun ahora se instala automáticamente durante el wizard

**Archivo:** `packages/autorun-core/src/wizard/InitializationWizard.ts`
- Línea 2370: Agregado a `mcpSupportedAddons`
- Línea 630: Agregado automáticamente a la lista de add-ons

---

## 🔧 Cambios Técnicos Aplicados

### **1. Timeout para GitHub**

```typescript
// Timeout de 10 segundos para confirm()
const confirmPromise = this.prompt.confirm(...);
const timeoutPromise = new Promise<boolean>((resolve) => {
  setTimeout(() => {
    console.log('   ⚠️  Timeout esperando respuesta, omitiendo...');
    resolve(false);
  }, 10000);
});
wantsToConfigure = await Promise.race([confirmPromise, timeoutPromise]);

// Timeout de 30 segundos para question()
const questionPromise = this.prompt.question(...);
const timeoutPromise = new Promise<string>((resolve) => {
  setTimeout(() => {
    console.log('   ⚠️  Timeout esperando URL, omitiendo...');
    resolve('');
  }, 30000);
});
githubUrl = await Promise.race([questionPromise, timeoutPromise]);
```

---

### **2. MCP de Autorun Agregado**

```typescript
'autorun': {
  name: 'Autorun',
  mcpNames: ['autorun'],
  getCredentials: async () => {
    // Autorun MCP no requiere credenciales
    return {};
  },
},
```

Y agregado automáticamente:
```typescript
const addonsWithAutorun = [...addons, 'autorun'];
await this.configureMCPForAddons(addonsWithAutorun);
```

---

### **3. Google Sheets - Solo un MCP**

```typescript
'google-sheets': {
  name: 'Google Sheets',
  mcpNames: ['google-sheets'], // Removido 'mcp-gsheets' para evitar duplicados
  // ...
}
```

---

## ✅ Verificaciones Realizadas

1. ✅ **GitHub:** Timeout agregado, no se queda bloqueado
2. ✅ **Autorun MCP:** Agregado a la lista, se instala automáticamente
3. ✅ **Google Sheets:** Solo instala un MCP (no duplicados)
4. ⚠️ **n8n-mcp:** Errores de permisos requieren limpieza manual de cache

---

## 🚀 Próximos Pasos

1. **Ejecutar el wizard nuevamente:**
   ```bash
   npm run init
   ```

2. **Si n8n-mcp sigue dando errores, limpiar cache:**
   ```bash
   rm -rf ~/.npm/_npx
   npm cache clean --force
   ```

3. **Verificar que todos los MCPs se instalaron:**
   ```bash
   cat ~/.cursor/mcp.json | grep -A 5 "autorun\|n8n\|google-sheets"
   ```

---

## 📊 MCPs que se Instalan Ahora

1. ✅ **storybook** → `storybook`
2. ✅ **figma-sync** → `figma`, `talk-to-figma`
3. ✅ **clarity** → `clarity`
4. ✅ **vercel** → `vercel`
5. ✅ **github** → `github`
6. ✅ **n8n** → `n8n-mcp` (puede requerir limpieza de cache)
7. ✅ **google-sheets** → `google-sheets` (solo uno, no duplicados)
8. ✅ **autorun** → `autorun` ⭐ NUEVO

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ Corregido (n8n-mcp puede requerir limpieza manual de cache)


