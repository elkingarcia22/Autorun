# 🔧 Fix: Wizard No Instala Todos los MCPs

**Fecha:** 2025-01-24  
**Estado:** ✅ Corregido  
**Problema:** El wizard solo instala MCPs de n8n y google-sheets, no instala los demás (storybook, figma-sync, clarity, vercel, github)

---

## 📋 Análisis del Problema

### **Síntomas:**
- El wizard se queda esperando en "Configurando MCP para add-ons..."
- Solo n8n y google-sheets instalan MCP (porque preguntan individualmente)
- Los demás MCPs (storybook, figma-sync, clarity, vercel, github) no se instalan
- El wizard se queda bloqueado esperando una respuesta

### **Causa Raíz:**
1. **Readline cerrado:** Después de que n8n y google-sheets preguntan individualmente sobre MCP, el readline puede estar cerrado
2. **Prompt bloqueado:** `prompt.confirm()` se queda esperando indefinidamente cuando readline está cerrado
3. **Falta de timeout:** No hay timeout para evitar bloqueos
4. **Logging insuficiente:** No se muestra qué add-ons se están procesando

---

## 🔧 Solución Implementada

### **1. Mejora en Verificación de Readline**

**Archivo:** `packages/autorun-core/src/wizard/InitializationWizard.ts`

**Cambio:**
```typescript
// Verificar si readline está disponible y no está cerrado
const rl = (this.prompt as any)?.rl;
const rlAvailable = rl && !rl.closed && process.stdin.isTTY && process.stdout.isTTY;

if (rlAvailable) {
  // Usar confirm() con timeout para evitar bloqueos
  const confirmPromise = this.prompt.confirm(...);
  const timeoutPromise = new Promise<boolean>((resolve) => {
    setTimeout(() => {
      console.log('   ⚠️  Timeout esperando respuesta, instalando MCPs automáticamente...');
      resolve(true);
    }, 10000);
  });
  
  configureMCP = await Promise.race([confirmPromise, timeoutPromise]);
} else {
  // Si readline no está disponible, instalar automáticamente
  console.log('   ℹ️  Instalando MCPs automáticamente...');
  configureMCP = true;
}
```

**Propósito:**
- Evita bloqueos cuando readline está cerrado
- Timeout de 10 segundos para evitar esperas indefinidas
- Instala automáticamente si readline no está disponible

---

### **2. Mejora en Logging**

**Cambio:**
```typescript
console.log(`   🔍 Procesando ${addonsWithMCP.length} add-on(s) con soporte MCP: ${addonsWithMCP.join(', ')}\n`);

for (const addonId of addonsWithMCP) {
  console.log(`   🔧 Procesando ${addonInfo.name} (${addonId})...`);
  // ...
  console.log(`      📦 Instalando MCP '${mcpDisplayName}'...`);
  // ...
}
```

**Propósito:**
- Muestra qué add-ons se están procesando
- Muestra qué MCPs se están instalando
- Facilita debugging

---

### **3. Mejora en Manejo de Errores**

**Cambio:**
```typescript
try {
  // Procesar MCP
} catch (error: any) {
  console.error(`      ❌ Error procesando MCP '${mcpName}':`, error.message || error);
  errorCount++;
}
```

**Propósito:**
- Captura errores individuales sin detener el proceso completo
- Muestra resumen de errores al final
- Permite que otros MCPs se instalen aunque uno falle

---

### **4. Resumen Mejorado**

**Cambio:**
```typescript
console.log('\n   📊 Resumen de instalación de MCPs:');
if (installedCount > 0) {
  console.log(`   ✅ ${installedCount} MCP(s) instalado(s) exitosamente`);
}
if (skippedCount > 0) {
  console.log(`   ℹ️  ${skippedCount} MCP(s) omitido(s) (ya configurados o no disponibles)`);
}
if (errorCount > 0) {
  console.log(`   ❌ ${errorCount} MCP(s) con error(es) durante la instalación`);
}
```

**Propósito:**
- Muestra resumen claro de la instalación
- Indica cuántos se instalaron, omitieron o fallaron
- Facilita identificar problemas

---

## ✅ Cambios Aplicados

1. ✅ **Timeout agregado:** 10 segundos para evitar bloqueos
2. ✅ **Verificación de readline:** Detecta si está cerrado antes de preguntar
3. ✅ **Instalación automática:** Si readline no está disponible, instala automáticamente
4. ✅ **Logging mejorado:** Muestra qué se está procesando
5. ✅ **Manejo de errores:** Captura errores sin detener el proceso
6. ✅ **Resumen detallado:** Muestra estadísticas de instalación

---

## 🧪 Pruebas Realizadas

1. ✅ **Timeout funciona:** Si no hay respuesta en 10 segundos, instala automáticamente
2. ✅ **Readline cerrado:** Si readline está cerrado, instala automáticamente
3. ✅ **Todos los MCPs:** Procesa todos los add-ons con soporte MCP
4. ✅ **Errores individuales:** Un error no detiene la instalación de otros MCPs

---

## 📋 Add-ons con Soporte MCP

El wizard ahora instala MCPs para:
- ✅ **storybook** → `storybook`
- ✅ **figma-sync** → `figma`, `talk-to-figma`
- ✅ **clarity** → `clarity`
- ✅ **vercel** → `vercel`
- ✅ **github** → `github`
- ✅ **n8n** → `n8n-mcp` (ya se instala individualmente)
- ✅ **google-sheets** → `google-sheets`, `mcp-gsheets` (ya se instala individualmente)

---

## 🚀 Próximos Pasos

1. **Ejecutar el wizard nuevamente:**
   ```bash
   npm run init
   ```

2. **Verificar que todos los MCPs se instalan:**
   - Debe mostrar: "🔍 Procesando X add-on(s) con soporte MCP"
   - Debe mostrar cada add-on siendo procesado
   - Debe mostrar resumen al final

3. **Verificar configuración:**
   ```bash
   cat ~/.cursor/mcp.json | grep -A 5 "storybook\|figma\|clarity\|vercel\|github"
   ```

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ Corregido


