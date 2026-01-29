# 🚨 Error: IDs de Storybook Inexistentes

> **Problema:** Error "Couldn't find story matching 'component-id--default'"  
> **Solución:** Sistema de descubrimiento automático de IDs + Inventario completo

---

## ⚠️ PROBLEMA

**Síntomas:**
- Error: `Couldn't find story matching 'navegacion-tabs--default'`
- El componente no se renderiza en Storybook
- URLs de Storybook no funcionan

**Causa Raíz:**
- IDs de Storybook incorrectos o desactualizados
- Mapeos no sincronizados con Storybook real
- No se verifica que el ID existe antes de usarlo

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **1. Sistema de Descubrimiento Automático** ⭐ NUEVO

**El sistema ahora descubre automáticamente los IDs correctos:**

```typescript
import { getCorrectStorybookId } from '@autorun/core/helpers/storybookIdDiscovery';

// Descubrir ID correcto automáticamente
const { componentId, found, title, availableStories } = 
  await getCorrectStorybookId('Tabs', 'navegacion-tabs');

if (found) {
  console.log(`✅ ID encontrado: ${componentId}`);
  console.log(`📚 Historias: ${availableStories?.join(', ')}`);
} else {
  console.warn(`⚠️ ID no encontrado, usando fallback`);
}
```

### **2. Validación Mejorada** ⭐ NUEVO

**`mapAndValidateComponentNameToStorybookId()` ahora:**

1. ✅ **Descubre automáticamente** el ID correcto desde Storybook
2. ✅ **Valida que existe** antes de retornarlo
3. ✅ **Busca alternativas** si el ID mapeado no existe
4. ✅ **Retorna ID correcto** o fallback seguro

```typescript
// ✅ CORRECTO - Usar validación mejorada
const componentId = await mapAndValidateComponentNameToStorybookId('Tabs');
// Automáticamente descubre el ID correcto si el mapeo falla
```

### **3. Inventario Automático** ⭐ NUEVO

**Generar inventario completo de componentes:**

```typescript
import { generateComponentInventory } from '@autorun/core/helpers/storybookIdDiscovery';

const inventory = await generateComponentInventory();
console.log(inventory);
// Muestra todos los componentes con sus IDs correctos
```

---

## 📋 PROCESO CORRECTO

### **PASO 1: Usar Validación Automática** ⚠️ OBLIGATORIO

**SIEMPRE usar `mapAndValidateComponentNameToStorybookId()`:**

```typescript
// ❌ INCORRECTO - Mapeo directo sin validar
const componentId = mapComponentNameToStorybookId('Tabs');

// ✅ CORRECTO - Validación automática con descubrimiento
const componentId = await mapAndValidateComponentNameToStorybookId('Tabs');
```

### **PASO 2: Verificar que el ID Existe** ⚠️ OBLIGATORIO

**Antes de construir URLs, verificar:**

```typescript
import { verifyStorybookIdExists } from '@autorun/core/helpers/storybookIdDiscovery';

const exists = await verifyStorybookIdExists(componentId);
if (!exists) {
  // Buscar alternativa
  const { componentId: correctId } = await getCorrectStorybookId('Tabs');
  componentId = correctId;
}
```

### **PASO 3: Usar buildSafeStorybookUrl** ⚠️ OBLIGATORIO

**SIEMPRE usar `buildSafeStorybookUrl()` para construir URLs:**

```typescript
import { buildSafeStorybookUrl } from './verifyStorybookStories';

const urlResult = await buildSafeStorybookUrl(componentId, 'default');
if (urlResult.warning) {
  console.warn(`⚠️ ${urlResult.warning}`);
}
// Usar urlResult.url (siempre seguro)
```

---

## 🔧 Cómo Funciona el Descubrimiento

### **1. Consulta index.json de Storybook**

```typescript
// Obtiene todos los componentes desde index.json
const indexUrl = 'https://ubits-storybook10.vercel.app/index.json';
const indexData = await fetch(indexUrl).then(r => r.json());

// Extrae IDs reales de todas las historias
for (const [storyId, entry] of Object.entries(indexData.entries)) {
  // storyId formato: "component-id--story-name"
  const componentId = storyId.split('--')[0];
  // ...
}
```

### **2. Busca por Nombre o ID**

```typescript
// Busca por:
// 1. ID exacto
// 2. Título del componente
// 3. ID parcial
const component = await findComponentByIdOrName('Tabs');
// Encuentra: { componentId: 'navegacion-tabs', title: 'Navegación/Tabs', ... }
```

### **3. Retorna ID Correcto**

```typescript
// Si encuentra el componente, retorna el ID real
// Si no, usa fallback seguro
const { componentId, found } = await getCorrectStorybookId('Tabs');
```

---

## 📚 Inventario de Componentes

**Para ver todos los componentes disponibles:**

```typescript
import { discoverStorybookComponents } from '@autorun/core/helpers/storybookIdDiscovery';

const discovery = await discoverStorybookComponents();
console.log(`Total: ${discovery.totalComponents} componentes`);
discovery.components.forEach(c => {
  console.log(`${c.title}: ${c.componentId}`);
  console.log(`  Historias: ${c.stories.join(', ')}`);
});
```

---

## 🚨 Errores a Evitar

### **Error #1: Asumir ID sin Verificar**

```typescript
// ❌ INCORRECTO
const componentId = 'navegacion-tabs'; // Puede no existir

// ✅ CORRECTO
const { componentId } = await getCorrectStorybookId('Tabs');
```

### **Error #2: No Usar Descubrimiento Automático**

```typescript
// ❌ INCORRECTO
const componentId = mapComponentNameToStorybookId('Tabs');

// ✅ CORRECTO
const componentId = await mapAndValidateComponentNameToStorybookId('Tabs');
```

### **Error #3: Construir URLs sin Validar**

```typescript
// ❌ INCORRECTO
const url = `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--default`;

// ✅ CORRECTO
const urlResult = await buildSafeStorybookUrl(componentId, 'default');
const url = urlResult.url; // Siempre seguro
```

---

## ✅ Checklist de Prevención

**ANTES de usar un ID de Storybook:**

- [ ] ✅ Usar `mapAndValidateComponentNameToStorybookId()` en lugar de mapeo directo
- [ ] ✅ Verificar que el ID existe con `verifyStorybookIdExists()`
- [ ] ✅ Usar `buildSafeStorybookUrl()` para construir URLs
- [ ] ✅ Revisar inventario si hay dudas sobre el ID correcto
- [ ] ✅ Consultar Storybook directamente si el ID no funciona

---

## 📝 Agregar Nuevo Componente

**El sistema descubre automáticamente nuevos componentes. No es necesario agregar manualmente.**

**Si un componente no se descubre:**
1. Verificar que existe en Storybook
2. Ejecutar `discoverStorybookComponents()` para actualizar
3. El sistema lo descubrirá automáticamente

---

## 🔍 Verificación Manual

**Para verificar un ID específico:**

```typescript
import { 
  verifyStorybookIdExists,
  getAvailableStoriesForComponent 
} from '@autorun/core/helpers/storybookIdDiscovery';

const exists = await verifyStorybookIdExists('navegacion-tabs');
const stories = await getAvailableStoriesForComponent('navegacion-tabs');
console.log(`Existe: ${exists}, Historias: ${stories.join(', ')}`);
```

---

## 📚 Referencias

- **Sistema de descubrimiento:** `packages/autorun-core/src/helpers/storybookIdDiscovery.ts`
- **Validación mejorada:** `packages/autorun-core/src/helpers/storybookStories.ts`
- **Inventario:** `docs/referencia/INVENTARIO-COMPONENTES-STORYBOOK.md`

---

**Última actualización:** 2025-01-10  
**Estado:** ✅ Sistema de descubrimiento automático implementado  
**Prioridad:** ⚠️ CRÍTICA - Previene errores de IDs inexistentes
