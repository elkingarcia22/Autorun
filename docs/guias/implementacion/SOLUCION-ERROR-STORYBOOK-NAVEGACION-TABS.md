# 🚨 Solución: Error "Couldn't find story matching 'navegacion-tabs--default'"

## ⚠️ PROBLEMA IDENTIFICADO

**Error:**
```
Couldn't find story matching 'navegacion-tabs--default'.
The component failed to render properly...
```

**Causa Raíz:**
- Se está usando el ID **sin acento**: `navegacion-tabs--default`
- El ID correcto en Storybook es **con acento**: `navegación-tabs--default`

---

## ✅ SOLUCIÓN

### **ID Correcto Verificado:**

```bash
# Verificar en index.json de Storybook
curl -s "https://ubits-storybook10.vercel.app/index.json" | python3 -c "import sys, json; data = json.load(sys.stdin); entries = data.get('entries', {}); matches = [k for k in entries.keys() if 'navegaci' in k.lower() and 'tabs' in k.lower()]; print('\n'.join(matches[:5]))"
```

**Resultado:**
```
navegación-tabs--default
navegación-tabs--docs
navegación-tabs--with-icons
navegación-tabs--without-icons
...
```

### **URLs Correctas:**

- ✅ **CORRECTO:** `https://ubits-storybook10.vercel.app/?path=/story/navegación-tabs--default`
- ❌ **INCORRECTO:** `https://ubits-storybook10.vercel.app/?path=/story/navegacion-tabs--default`

---

## 🔧 CÓMO USAR CORRECTAMENTE

### **1. Usar el Sistema de Descubrimiento Automático:**

```typescript
import { getCorrectStorybookId } from '@autorun/core/helpers/storybookIdDiscovery';

// ✅ CORRECTO - Descubrir automáticamente
const result = await getCorrectStorybookId('Tabs');
if (result.found) {
  console.log(`✅ ID encontrado: ${result.componentId}`); // navegación-tabs
  // Usar result.componentId (ya tiene el acento correcto)
}
```

### **2. Usar buildSafeStorybookUrl:**

```typescript
import { buildSafeStorybookUrl } from '@autorun/core/helpers/verifyStorybookStories';

// ✅ CORRECTO - Construir URL verificada
const urlResult = await buildSafeStorybookUrl('navegación-tabs', 'default');
if (urlResult.storyExists) {
  console.log(`✅ URL verificada: ${urlResult.url}`);
  // Navegar a urlResult.url
}
```

### **3. NO usar IDs hardcodeados sin acento:**

```typescript
// ❌ INCORRECTO - ID sin acento
const id = 'navegacion-tabs'; // Falla en Storybook

// ✅ CORRECTO - Usar descubrimiento automático
const { componentId } = await getCorrectStorybookId('Tabs');
// componentId = 'navegación-tabs' (con acento)
```

---

## 📋 CHECKLIST DE VERIFICACIÓN

Antes de navegar a Storybook para Tabs:

- [ ] ✅ Usar `getCorrectStorybookId('Tabs')` para obtener el ID correcto
- [ ] ✅ Verificar que el ID tiene el acento: `navegación-tabs` (no `navegacion-tabs`)
- [ ] ✅ Usar `buildSafeStorybookUrl()` para construir la URL
- [ ] ✅ Verificar que la URL funciona antes de navegar

---

## 🔍 VERIFICACIÓN RÁPIDA

```bash
# Verificar que el ID existe en Storybook
curl -s "https://ubits-storybook10.vercel.app/index.json" | grep "navegación-tabs--default"
```

**Resultado esperado:**
```json
"navegación-tabs--default": {...}
```

---

## 📚 REFERENCIAS

- **Sistema de descubrimiento:** `packages/autorun-core/src/helpers/storybookIdDiscovery.ts`
- **Mapeos:** `packages/autorun-core/src/helpers/storybookStories.ts` (línea 285: `Tabs: 'navegación-tabs'`)
- **Documentación del componente:** `docs/referencia/componentes/tabs.md`
- **Guía de errores:** `docs/guias/implementacion/GUIA-ERROR-IDS-STORYBOOK-INEXISTENTES.md`

---

**Última actualización:** 2025-12-11  
**Estado:** ✅ Problema identificado y solucionado  
**ID Correcto:** `navegación-tabs--default` (CON ACENTO)
