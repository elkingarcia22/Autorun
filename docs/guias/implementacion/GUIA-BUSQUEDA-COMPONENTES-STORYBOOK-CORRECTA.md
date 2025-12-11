# 🔍 Guía: Búsqueda Correcta de Componentes en Storybook

> **⚠️ CRÍTICO:** Esta guía documenta cómo buscar componentes específicos en Storybook usando el sistema de descubrimiento automático y el catálogo, evitando búsquedas directas que siempre fallan.

---

## ❌ PROBLEMA IDENTIFICADO

**Síntomas:**
- Cuando se busca algo específico en Storybook directamente, siempre falla
- URLs de Storybook incorrectas o componentes no encontrados
- Búsquedas manuales que no funcionan

**Causa Raíz:**
- No usar el sistema de descubrimiento automático
- No consultar el catálogo primero
- Buscar directamente en Storybook sin validar IDs

---

## ✅ SOLUCIÓN CORRECTA

### **REGLA FUNDAMENTAL:**

**⚠️ CRÍTICO: SIEMPRE usar el sistema de descubrimiento automático y el catálogo ANTES de buscar en Storybook**

### **PASO 1: Consultar el Catálogo PRIMERO**

**Antes de buscar cualquier componente, SIEMPRE consultar:**

```markdown
docs/referencia/CATALOGO-COMPONENTES-UBITS.md
```

**El catálogo contiene:**
- ✅ Lista completa de componentes UBITS
- ✅ Cómo identificarlos visualmente
- ✅ IDs de Storybook correctos
- ✅ Ejemplos de uso

**Ejemplo:**
```markdown
# Buscar "DataTable" en el catálogo
# Encontrar: "DataTable" → ID: "components-datatable"
# Ver ejemplos y documentación
```

### **PASO 2: Usar Sistema de Descubrimiento Automático**

**⚠️ CRÍTICO: NO buscar directamente en Storybook. Usar el sistema de descubrimiento:**

```typescript
// ✅ CORRECTO - Usar descubrimiento automático
import { getCorrectStorybookId } from '@autorun/core/helpers/storybookIdDiscovery';

const { componentId, found, title, availableStories } = 
  await getCorrectStorybookId('DataTable', 'components-datatable');

if (found) {
  console.log(`✅ ID encontrado: ${componentId}`);
  console.log(`📚 Historias: ${availableStories?.join(', ')}`);
  // Usar componentId para construir URL de Storybook
} else {
  console.warn(`⚠️ Componente no encontrado`);
}
```

### **PASO 3: Usar mapAndValidateComponentNameToStorybookId**

**Para obtener el ID correcto automáticamente:**

```typescript
// ✅ CORRECTO - Validación automática
import { mapAndValidateComponentNameToStorybookId } from '@autorun/core/helpers/storybookStories';

const componentId = await mapAndValidateComponentNameToStorybookId('DataTable');
// Automáticamente descubre el ID correcto desde Storybook
// Valida que existe antes de retornarlo
```

### **PASO 4: Construir URL de Storybook Correctamente**

**Usar el ID descubierto para construir la URL:**

```typescript
// ✅ CORRECTO - Construir URL con ID descubierto
const componentId = await mapAndValidateComponentNameToStorybookId('DataTable');
const storybookUrl = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--default`;

// O para una historia específica:
const storybookUrl = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--expandable-rows`;
```

---

## 📋 FLUJO OBLIGATORIO PARA BUSCAR COMPONENTES

### **1. Consultar Catálogo PRIMERO** ⚠️ OBLIGATORIO

```bash
# Leer el catálogo
docs/referencia/CATALOGO-COMPONENTES-UBITS.md
```

**Buscar en el catálogo:**
- Nombre del componente
- Descripción visual
- ID de Storybook sugerido

### **2. Usar Descubrimiento Automático** ⚠️ OBLIGATORIO

```typescript
// NO buscar directamente en Storybook
// Usar descubrimiento automático
const { componentId, found } = await getCorrectStorybookId('ComponentName');
```

### **3. Validar ID** ⚠️ OBLIGATORIO

```typescript
// Validar que el ID existe
const componentId = await mapAndValidateComponentNameToStorybookId('ComponentName');
```

### **4. Construir URL** ⚠️ OBLIGATORIO

```typescript
// Construir URL con ID validado
const url = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--default`;
```

---

## 🚨 REGLAS CRÍTICAS

1. **✅ SIEMPRE consultar el catálogo PRIMERO:** `CATALOGO-COMPONENTES-UBITS.md`
2. **✅ SIEMPRE usar descubrimiento automático:** `getCorrectStorybookId()` o `mapAndValidateComponentNameToStorybookId()`
3. **✅ SIEMPRE validar que el ID existe:** Antes de construir URLs
4. **✅ SIEMPRE usar IDs descubiertos:** No inventar IDs
5. **❌ NUNCA buscar directamente en Storybook:** Sin usar descubrimiento automático
6. **❌ NUNCA inventar IDs:** Siempre usar IDs descubiertos
7. **❌ NUNCA usar URLs hardcodeadas:** Siempre construir con IDs validados

---

## 📚 EJEMPLOS PRÁCTICOS

### **Ejemplo 1: Buscar DataTable**

```typescript
// ✅ CORRECTO
// 1. Consultar catálogo (manual)
// 2. Usar descubrimiento automático
const { componentId, found } = await getCorrectStorybookId('DataTable');

if (found) {
  const url = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--expandable-rows`;
  // Navegar a Storybook
}
```

### **Ejemplo 2: Buscar Tabs**

```typescript
// ✅ CORRECTO
// 1. Consultar catálogo (manual)
// 2. Usar validación automática
const componentId = await mapAndValidateComponentNameToStorybookId('Tabs');
const url = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--default`;
```

### **Ejemplo 3: Buscar componente específico con historia**

```typescript
// ✅ CORRECTO
// 1. Consultar catálogo
// 2. Descubrir ID
const { componentId, availableStories } = await getCorrectStorybookId('DataTable');

// 3. Verificar que la historia existe
if (availableStories?.includes('expandable-rows')) {
  const url = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--expandable-rows`;
}
```

---

## 🔗 REFERENCIAS

- **Catálogo de componentes:** `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- **Sistema de descubrimiento:** `packages/autorun-core/src/helpers/storybookIdDiscovery.ts`
- **Validación de IDs:** `packages/autorun-core/src/helpers/storybookStories.ts`
- **Guía de errores:** `docs/guias/implementacion/GUIA-ERROR-IDS-STORYBOOK-INEXISTENTES.md`

---

## 📋 CHECKLIST OBLIGATORIO

Antes de buscar cualquier componente en Storybook:

- [ ] ✅ Consulté `CATALOGO-COMPONENTES-UBITS.md` primero
- [ ] ✅ Usé `getCorrectStorybookId()` o `mapAndValidateComponentNameToStorybookId()`
- [ ] ✅ Validé que el ID existe antes de usarlo
- [ ] ✅ Construí la URL con el ID descubierto
- [ ] ✅ Verifiqué que la historia existe (si es específica)
- [ ] ❌ NO busqué directamente en Storybook sin descubrimiento
- [ ] ❌ NO inventé IDs
- [ ] ❌ NO usé URLs hardcodeadas

---

**Última actualización:** Enero 2025  
**Versión:** 1.0.0

