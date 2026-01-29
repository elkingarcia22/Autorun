# 🚨 Solución: Error "Couldn't find story matching 'navegacion-tabs--docs'"

## ⚠️ PROBLEMA IDENTIFICADO

**Error:**
```
Couldn't find story matching 'navegacion-tabs--docs'.
The component failed to render properly...
```

**Causas Raíz Identificadas:**

1. **ID incorrecto (sin acento):** Se estaba usando `navegacion-tabs` en lugar de `navegación-tabs` (con acento)
2. **Historia incorrecta:** Se estaba usando `--docs` en lugar de `--default`
3. **Mapeos desactualizados:** Los mapeos en varios archivos no estaban sincronizados con el inventario real de Storybook

---

## ✅ SOLUCIONES APLICADAS

### **1. Corrección de Mapeos** ✅

**Archivos corregidos:**
- ✅ `packages/autorun-core/src/helpers/storybookStories.ts` - `Tabs: 'navegación-tabs'`
- ✅ `packages/autorun-core/src/helpers/componentHelpers.ts` - `Tabs: 'navegación-tabs'`
- ✅ `packages/autorun-core/src/helpers/verifyStorybookStories.ts` - `'navegación-tabs'` y `'Navegación/Tabs': 'navegación-tabs'`
- ✅ `docs/referencia/componentes/tabs.md` - URLs actualizadas con acento

### **2. Verificación del ID Correcto** ✅

**ID correcto confirmado desde index.json de Storybook:**
- ✅ **ID correcto:** `navegación-tabs` (con acento)
- ✅ **Historia default existe:** `navegación-tabs--default`
- ✅ **Historia docs existe:** `navegación-tabs--docs` (pero debe usarse `--default` para navegación)

### **3. Sistema de Descubrimiento Automático** ✅

**El sistema ya tiene:**
- ✅ `getCorrectStorybookId()` - Descubre automáticamente el ID correcto
- ✅ `buildSafeStorybookUrl()` - Construye URLs verificadas
- ✅ `discoverStorybookComponents()` - Descubre todos los componentes desde index.json

---

## 🔍 VERIFICACIÓN

### **Verificar ID Correcto:**

```bash
# Verificar en index.json de Storybook
curl -s "https://ubits-storybook10.vercel.app/index.json" | grep -i "navegaci.*tabs" | head -5
```

**Resultado esperado:**
```
navegación-tabs--default: Navegación/Tabs - story
navegación-tabs--docs: Navegación/Tabs - docs
```

### **Verificar Mapeos:**

```typescript
// Verificar que el mapeo es correcto
import { mapComponentNameToStorybookId } from '@autorun/core/helpers/storybookStories';
const id = mapComponentNameToStorybookId('Tabs');
console.log(id); // Debe ser: 'navegación-tabs'
```

### **Verificar URL Construida:**

```typescript
// Verificar que la URL se construye correctamente
import { buildSafeStorybookUrl } from '@autorun/core/helpers/verifyStorybookStories';
const result = await buildSafeStorybookUrl('navegación-tabs', 'default');
console.log(result.url); // Debe ser: https://ubits-storybook10.vercel.app/?path=/story/navegación-tabs--default
```

---

## ⚠️ REGLAS CRÍTICAS

### **1. SIEMPRE usar el ID con acento:**
- ✅ **CORRECTO:** `navegación-tabs` (con acento)
- ❌ **INCORRECTO:** `navegacion-tabs` (sin acento)

### **2. SIEMPRE usar `--default` para navegación:**
- ✅ **CORRECTO:** `navegación-tabs--default`
- ❌ **INCORRECTO:** `navegación-tabs--docs` (solo para documentación, no para navegación)

### **3. SIEMPRE usar descubrimiento automático:**
- ✅ **CORRECTO:** `await getCorrectStorybookId('Tabs')`
- ❌ **INCORRECTO:** Usar mapeos hardcodeados sin verificar

### **4. SIEMPRE usar buildSafeStorybookUrl:**
- ✅ **CORRECTO:** `await buildSafeStorybookUrl(componentId, 'default')`
- ❌ **INCORRECTO:** Construir URLs manualmente sin verificar

---

## 📋 CHECKLIST DE VERIFICACIÓN

Antes de usar cualquier ID de Storybook:

- [ ] ✅ Verificar que el ID existe en el inventario: `docs/referencia/INVENTARIO-COMPONENTES-STORYBOOK.md`
- [ ] ✅ Verificar que el ID existe en index.json de Storybook
- [ ] ✅ Usar `getCorrectStorybookId()` para descubrir el ID automáticamente
- [ ] ✅ Usar `buildSafeStorybookUrl()` para construir URLs verificadas
- [ ] ✅ Usar `--default` para navegación (no `--docs`)
- [ ] ✅ Verificar que el ID tiene el acento correcto (`navegación-tabs`, no `navegacion-tabs`)

---

## 🔧 CÓMO EVITAR ESTE ERROR EN EL FUTURO

### **1. Usar Descubrimiento Automático SIEMPRE:**

```typescript
// ✅ CORRECTO - Descubrir automáticamente
const { getCorrectStorybookId } = await import('./storybookIdDiscovery');
const result = await getCorrectStorybookId('Tabs');
if (result.found) {
  console.log(`✅ ID encontrado: ${result.componentId}`);
  // Usar result.componentId (ya tiene el acento correcto)
}
```

### **2. Usar buildSafeStorybookUrl SIEMPRE:**

```typescript
// ✅ CORRECTO - Construir URL verificada
const urlResult = await buildSafeStorybookUrl('navegación-tabs', 'default');
if (urlResult.storyExists) {
  console.log(`✅ URL verificada: ${urlResult.url}`);
}
```

### **3. NO usar mapeos hardcodeados sin verificar:**

```typescript
// ❌ INCORRECTO - Mapeo hardcodeado sin verificar
const id = 'navegacion-tabs'; // Sin acento, puede estar incorrecto

// ✅ CORRECTO - Descubrir automáticamente
const result = await getCorrectStorybookId('Tabs');
const id = result.componentId; // Con acento correcto
```

---

## 📚 REFERENCIAS

- **Inventario de componentes:** `docs/referencia/INVENTARIO-COMPONENTES-STORYBOOK.md`
- **Guía de errores:** `docs/guias/implementacion/GUIA-ERROR-IDS-STORYBOOK-INEXISTENTES.md`
- **Sistema de descubrimiento:** `packages/autorun-core/src/helpers/storybookIdDiscovery.ts`
- **Verificación de historias:** `packages/autorun-core/src/helpers/verifyStorybookStories.ts`

---

**Última actualización:** 2025-12-11  
**Estado:** ✅ Problema identificado y solucionado
