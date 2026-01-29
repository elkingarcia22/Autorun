# Análisis: Error en Validación de IDs de Storybook

**Fecha:** 2025-01-03  
**Error:** `Couldn't find story matching 'basicos-button--default'`

---

## 🔍 Problema Identificado

### **Error Principal:**
El sistema está intentando usar `basicos-button` (ID de UBITS Storybook) cuando el Storybook activo es **Libraries UI** que usa `🧩-ux-button`.

### **Causa Raíz:**

1. **Storybook Activo:** Libraries UI (`libraries-ui-ubitslearning-com`)
   - Mapeo correcto: `"Button": "🧩-ux-button"` ✅

2. **Flujo de Mapeo:**
   ```
   mapComponentNameToStorybookId("Button")
   → StorybookManager.mapComponentToStorybookId("Button")
   → Debería retornar "🧩-ux-button" desde .autorun/storybooks.json
   → PERO está retornando null o fallando
   → Cae al mapeo estático de UBITS: "basicos-button" ❌
   ```

3. **Mapeo Estático de Fallback (INCORRECTO):**
   ```typescript
   // En storybookStories.ts línea 356
   Button: 'basicos-button', // ❌ Este es para UBITS, no Libraries UI
   ```

---

## 🔧 Problemas Específicos

### **1. StorybookManager no está retornando el mapeo correcto**

**Archivo:** `packages/autorun-core/src/helpers/storybookManager.ts`

**Problema:**
- `mapComponentToStorybookId()` debería encontrar `"Button": "🧩-ux-button"` en `config.componentMapping`
- Pero está retornando `null` o no encuentra el mapeo
- Luego cae al fallback: `componentName.toLowerCase().replace(/\s+/g, '-')` → `"button"`

### **2. Mapeo Estático de Fallback es para UBITS**

**Archivo:** `packages/autorun-core/src/helpers/storybookStories.ts` línea 353-376

**Problema:**
- El mapeo estático está hardcodeado para UBITS Storybook
- No debería usarse cuando hay un Storybook activo diferente
- Debería usar el mapeo dinámico del Storybook activo

### **3. Validación no se ejecuta antes del fallback**

**Problema:**
- La validación se ejecuta DESPUÉS de obtener el ID mapeado
- Pero si el mapeo falla y cae al estático, la validación recibe `"basicos-button"` que no existe en Libraries UI
- La validación debería ejecutarse ANTES de usar el fallback estático

---

## ✅ Soluciones Propuestas

### **Solución 1: Corregir StorybookManager para usar mapeo dinámico**

**Cambio en `storybookManager.ts`:**
```typescript
async mapComponentToStorybookId(componentName: string, storybookId?: string): Promise<string | null> {
  await this.ensureConnectionsLoaded();
  
  const config = storybookId
    ? this.connections.get(storybookId)?.config
    : await this.getActiveConfig();

  if (!config) {
    // ⚠️ CRÍTICO: Si no hay config, NO usar fallback estático
    // Retornar null y dejar que el sistema de validación lo maneje
    return null;
  }

  // Buscar en el mapeo del Storybook activo
  let mappedId: string | undefined;
  if (config.componentMapping) {
    mappedId = config.componentMapping[componentName];
  }

  // ⚠️ NUEVO: Si no se encuentra, intentar búsqueda case-insensitive
  if (!mappedId && config.componentMapping) {
    const lowerComponentName = componentName.toLowerCase();
    for (const [key, value] of Object.entries(config.componentMapping)) {
      if (key.toLowerCase() === lowerComponentName) {
        mappedId = value;
        break;
      }
    }
  }

  // ⚠️ CRÍTICO: NO usar fallback genérico aquí
  // Dejar que el sistema de validación lo maneje
  if (!mappedId) {
    return null; // El sistema de validación buscará automáticamente
  }

  // Validar y corregir el ID
  // ... (resto del código de validación)
}
```

### **Solución 2: Eliminar mapeo estático de UBITS cuando hay Storybook activo**

**Cambio en `storybookStories.ts`:**
```typescript
export async function mapComponentNameToStorybookId(componentName: string): Promise<string> {
  try {
    const { StorybookManager } = await import('./storybookManager');
    const manager = StorybookManager.getInstance();
    const mappedId = await manager.mapComponentToStorybookId(componentName);

    if (mappedId) {
      // Validar el ID
      // ... (código de validación existente)
      return validation.componentId;
    }
  } catch (error) {
    console.warn(`⚠️ [Storybook Stories] Error usando StorybookManager:`, error);
  }

  // ⚠️ CRÍTICO: NO usar mapeo estático de UBITS como fallback
  // En su lugar, usar el sistema de validación para descubrir el ID automáticamente
  try {
    const { getCorrectStorybookId } = await import('./storybookIdDiscovery');
    const discoveryResult = await getCorrectStorybookId(componentName, null);
    
    if (discoveryResult.found) {
      return discoveryResult.componentId;
    }
  } catch (error) {
    console.warn(`⚠️ [Storybook Stories] Error en descubrimiento automático:`, error);
  }

  // Último recurso: fallback genérico
  return componentName.toLowerCase().replace(/\s+/g, '-');
}
```

### **Solución 3: Mejorar validación para consultar Storybook activo**

**Cambio en `storybookIdValidator.ts`:**
```typescript
export async function validateAndCorrectStorybookId(
  componentName: string,
  componentId: string
): Promise<ValidationResult> {
  // ⚠️ NUEVO: Verificar Storybook activo primero
  try {
    const { StorybookManager } = await import('./storybookManager');
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();
    
    if (activeConfig && activeConfig.componentMapping) {
      // Buscar en el mapeo del Storybook activo
      const activeMapping = activeConfig.componentMapping[componentName];
      if (activeMapping) {
        // Validar que el ID del mapeo activo existe
        const component = await findComponentByIdOrName(activeMapping);
        if (component) {
          return {
            valid: true,
            componentId: component.componentId,
            corrected: component.componentId !== componentId,
            originalId: componentId,
            foundBy: 'active-storybook-mapping',
          };
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️ [Storybook ID Validator] Error verificando Storybook activo:`, error);
  }

  // Continuar con validación normal...
  // ... (resto del código)
}
```

---

## 🎯 Plan de Implementación

1. **Paso 1:** Corregir `StorybookManager.mapComponentToStorybookId()` para usar mapeo dinámico correctamente
2. **Paso 2:** Eliminar dependencia del mapeo estático de UBITS cuando hay Storybook activo
3. **Paso 3:** Mejorar validación para consultar Storybook activo primero
4. **Paso 4:** Probar con Libraries UI y UBITS Storybook

---

## 📋 Archivos a Modificar

1. `packages/autorun-core/src/helpers/storybookManager.ts`
   - Mejorar `mapComponentToStorybookId()` para usar mapeo dinámico
   - Agregar búsqueda case-insensitive
   - NO usar fallback genérico

2. `packages/autorun-core/src/helpers/storybookStories.ts`
   - Eliminar dependencia del mapeo estático de UBITS
   - Usar descubrimiento automático como fallback

3. `packages/autorun-core/src/helpers/storybookIdValidator.ts`
   - Verificar Storybook activo primero
   - Usar mapeo del Storybook activo antes de buscar

---

## ✅ Estado

- ⏳ **Pendiente:** Implementar correcciones
- ⏳ **Pendiente:** Probar con Libraries UI
- ⏳ **Pendiente:** Probar con UBITS Storybook
