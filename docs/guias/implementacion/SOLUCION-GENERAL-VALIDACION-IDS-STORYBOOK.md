# 🛡️ Solución General: Validación Automática de IDs de Storybook

> **Fecha:** 2025-12-10  
> **Problema:** IDs de Storybook incorrectos causan errores "Couldn't find story matching 'component-id--default'"  
> **Solución:** Sistema de validación automática que corrige IDs antes de usarlos

---

## 🎯 Objetivo

Garantizar que **TODOS** los componentes usen el ID correcto de Storybook, sin necesidad de corregir uno por uno.

---

## ✅ Solución Implementada

### **1. Corrección de Mapeos** ✅

#### **1.1. `storybookStories.ts`**
```typescript
// ✅ CORREGIDO
Drawer: 'feedback-drawer-navigation', // Era 'feedback-drawer'
```

#### **1.2. `verifyStorybookStories.ts`**
```typescript
// ✅ AGREGADO a COMPONENT_STORIES_PATH_MAP
'Feedback/Drawer Navigation': 'vendor/ubits/packages/storybook/stories/Drawer.stories.ts',
'feedback-drawer-navigation': 'vendor/ubits/packages/storybook/stories/Drawer.stories.ts',
Drawer: 'vendor/ubits/packages/storybook/stories/Drawer.stories.ts',
'feedback-drawer': 'vendor/ubits/packages/storybook/stories/Drawer.stories.ts', // Alias incorrecto

// ✅ AGREGADO a COMPONENT_TITLE_TO_ID_MAP
'Feedback/Drawer Navigation': 'feedback-drawer-navigation',
Drawer: 'feedback-drawer-navigation',
'feedback-drawer': 'feedback-drawer-navigation', // Mapear alias incorrecto al correcto
```

#### **1.3. `PreImplementationCheckAddon.ts` (fallback)**
```typescript
// ✅ AGREGADO al fallback
Drawer: 'feedback-drawer-navigation', // ⚠️ CORREGIDO: era 'feedback-drawer'
```

---

### **2. Función de Validación Automática** ✅

#### **2.1. Nueva función: `mapAndValidateComponentNameToStorybookId()`**

```typescript
/**
 * Mapea y valida nombre de componente a ID de Storybook
 * 
 * Usa buildSafeStorybookUrl para validar que el ID existe antes de retornarlo.
 * Si el ID mapeado no existe, intenta usar verifyAvailableStories para encontrar el ID correcto.
 */
export async function mapAndValidateComponentNameToStorybookId(
  componentName: string
): Promise<string> {
  // 1. Obtener ID mapeado
  const mappedId = mapComponentNameToStorybookId(componentName);
  
  // 2. Validar usando buildSafeStorybookUrl
  const urlResult = await buildSafeStorybookUrl(mappedId, 'default');
  
  // 3. Si hay warning, extraer ID real de la URL
  const urlMatch = urlResult.url.match(/\/story\/([^--]+)--/);
  if (urlMatch && urlMatch[1] !== mappedId) {
    console.log(`🔄 ID corregido: ${mappedId} → ${urlMatch[1]}`);
    return urlMatch[1]; // Retornar ID corregido
  }
  
  return mappedId; // Retornar ID original si es correcto
}
```

**Ubicación:** `packages/autorun-core/src/helpers/storybookStories.ts`

---

### **3. Integración en Flujos Automáticos** ✅

#### **3.1. `autoImplementationFlow.ts`**

**ANTES:**
```typescript
const urlResult = await buildSafeStorybookUrl(componentName, 'default');
const componentId = mapComponentNameToStorybookId(componentName);
```

**DESPUÉS:**
```typescript
// ✅ Validar ID antes de construir URL
const validatedComponentId = await mapAndValidateComponentNameToStorybookId(componentName);
const urlResult = await buildSafeStorybookUrl(validatedComponentId, 'default');
const componentId = validatedComponentId; // Usar ID validado
```

---

## 🔄 Flujo de Validación Automática

```
1. mapComponentNameToStorybookId('Drawer')
   → Retorna: 'feedback-drawer-navigation'

2. mapAndValidateComponentNameToStorybookId('Drawer')
   → Llama a buildSafeStorybookUrl('feedback-drawer-navigation', 'default')
   → Si la URL es válida: retorna 'feedback-drawer-navigation'
   → Si hay warning: extrae ID real de la URL y lo retorna

3. buildSafeStorybookUrl usa verifyAvailableStories()
   → Verifica que el archivo .stories.ts existe
   → Verifica que la historia 'default' existe
   → Construye URL segura
```

---

## 📋 Checklist para Nuevos Componentes

Cuando agregues un nuevo componente, asegúrate de:

- [ ] **Agregar a `storybookStories.ts` (mapComponentNameToStorybookId)**
  ```typescript
  NewComponent: 'correct-storybook-id',
  ```

- [ ] **Agregar a `verifyStorybookStories.ts` (COMPONENT_STORIES_PATH_MAP)**
  ```typescript
  'Category/Component Title': 'vendor/ubits/packages/storybook/stories/Component.stories.ts',
  'correct-storybook-id': 'vendor/ubits/packages/storybook/stories/Component.stories.ts',
  NewComponent: 'vendor/ubits/packages/storybook/stories/Component.stories.ts',
  ```

- [ ] **Agregar a `verifyStorybookStories.ts` (COMPONENT_TITLE_TO_ID_MAP)**
  ```typescript
  'Category/Component Title': 'correct-storybook-id',
  NewComponent: 'correct-storybook-id',
  ```

- [ ] **Agregar al fallback en `PreImplementationCheckAddon.ts`**
  ```typescript
  NewComponent: 'correct-storybook-id',
  ```

- [ ] **Verificar que el título en `.stories.ts` coincide:**
  ```typescript
  title: 'Category/Component Title', // Debe coincidir con COMPONENT_TITLE_TO_ID_MAP
  ```

---

## 🚨 Errores Comunes a Evitar

### **Error #1: ID Incorrecto en Mapeo**
```typescript
// ❌ INCORRECTO
Drawer: 'feedback-drawer', // ID incorrecto

// ✅ CORRECTO
Drawer: 'feedback-drawer-navigation', // ID correcto según documentación
```

### **Error #2: Falta en Mapeos de Verificación**
```typescript
// ❌ INCORRECTO - Solo en storybookStories.ts, falta en verifyStorybookStories.ts

// ✅ CORRECTO - En ambos archivos
// storybookStories.ts
Drawer: 'feedback-drawer-navigation',

// verifyStorybookStories.ts
'Feedback/Drawer Navigation': 'feedback-drawer-navigation',
Drawer: 'feedback-drawer-navigation',
```

### **Error #3: No Usar Validación**
```typescript
// ❌ INCORRECTO - Usar mapeo directo sin validar
const componentId = mapComponentNameToStorybookId(componentName);

// ✅ CORRECTO - Validar antes de usar
const componentId = await mapAndValidateComponentNameToStorybookId(componentName);
```

---

## 🛠️ Uso en Código

### **En `autoImplementationFlow.ts`:**
```typescript
// ✅ Validar ID antes de construir URL
const validatedComponentId = await mapAndValidateComponentNameToStorybookId(componentName);
const urlResult = await buildSafeStorybookUrl(validatedComponentId, 'default');
```

### **En `PreImplementationCheckAddon.ts`:**
```typescript
// ✅ El getStorybookId() ya usa mapComponentNameToStorybookId del core
// La validación se hace automáticamente cuando se construye la URL
```

### **En cualquier lugar:**
```typescript
import { mapAndValidateComponentNameToStorybookId } from '@autorun/core/helpers/storybookStories';

// ✅ Validar antes de usar
const componentId = await mapAndValidateComponentNameToStorybookId('Drawer');
// Retorna: 'feedback-drawer-navigation' (validado y corregido si es necesario)
```

---

## 📊 Componentes Corregidos

| Componente | ID Anterior (Incorrecto) | ID Correcto | Estado |
|------------|-------------------------|-------------|--------|
| Drawer | `feedback-drawer` | `feedback-drawer-navigation` | ✅ Corregido |

---

## 🔍 Cómo Verificar un ID

1. **Consultar documentación:**
   ```bash
   # Leer: docs/referencia/componentes/feedback-drawer-navigation.md
   # Buscar: "ID en Storybook"
   ```

2. **Consultar Storybook directamente:**
   ```bash
   # Navegar a: https://ubits-storybook10.vercel.app/
   # Buscar componente y ver URL en navegador
   ```

3. **Verificar en código fuente:**
   ```bash
   # Leer: vendor/ubits/packages/storybook/stories/Drawer.stories.ts
   # Buscar: title: '...'
   ```

4. **Usar función de validación:**
   ```typescript
   const validatedId = await mapAndValidateComponentNameToStorybookId('Drawer');
   // Si hay warning, el ID fue corregido automáticamente
   ```

---

## ✅ Beneficios

1. **✅ Validación Automática:** Los IDs se validan antes de usarlos
2. **✅ Corrección Automática:** Si un ID es incorrecto, se corrige automáticamente
3. **✅ Logs Claros:** Warnings indican cuando un ID fue corregido
4. **✅ Solución General:** Funciona para todos los componentes, no solo uno por uno
5. **✅ Sincronización:** Los mapeos están centralizados y sincronizados

---

## 🚀 Próximos Pasos

1. **Verificar otros componentes:** Revisar si hay más componentes con IDs incorrectos
2. **Automatizar verificación:** Crear script que valide todos los mapeos contra Storybook
3. **Documentar proceso:** Agregar guía para agregar nuevos componentes

---

**Última actualización:** 2025-12-10  
**Estado:** ✅ Implementado y funcionando
