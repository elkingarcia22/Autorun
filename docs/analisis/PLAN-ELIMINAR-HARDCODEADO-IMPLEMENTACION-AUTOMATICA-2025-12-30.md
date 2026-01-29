# 🎯 Plan Paso a Paso: Eliminar Todo lo Hardcodeado - Implementación Automática Completa

## 📋 Objetivo

**Hacer que Autorun pueda implementar CUALQUIER componente de Storybook automáticamente, sin NADA hardcodeado.**

---

## 🔍 FASE 1: Análisis del Estado Actual

### **Problemas Identificados:**

1. **❌ Componentes no están en `components-loader.js`:**
   - Gallery no está incluido
   - Otros componentes pueden faltar
   - `window.UBITS.Gallery` nunca se expone

2. **❌ Código hardcodeado en el template:**
   - Función `createGallery()` hardcodeada
   - Lógica de espera hardcodeada
   - Integración con flujo hardcodeada
   - Registro en AUTORUN_PRESERVE_COMPONENTS hardcodeado

3. **❌ Snippets de Storybook no son ejecutables:**
   - Código viene como snippet de documentación
   - No está envuelto en `<script>`
   - No tiene lógica de espera para UBITS
   - No está integrado con el flujo de inicialización

4. **❌ No hay detección automática de componentes:**
   - No se verifica si el componente está disponible
   - No se carga dinámicamente si falta
   - No se genera código ejecutable automáticamente

---

## 🎯 FASE 2: Solución Propuesta - Sistema Automático Completo

### **Arquitectura del Sistema:**

```
┌─────────────────────────────────────────────────────────────┐
│ 1. DETECCIÓN AUTOMÁTICA DE COMPONENTE                       │
│    - Detectar componente en mensaje del usuario             │
│    - Obtener ID de Storybook                                │
│    - Verificar si está en components-loader.js              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. CARGA DINÁMICA DE COMPONENTE (si falta)                  │
│    - Cargar componente desde Storybook                      │
│    - Inicializar window.UBITS.ComponentName                 │
│    - Exponer API global automáticamente                     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. EXTRACCIÓN DE CÓDIGO DESDE STORYBOOK                     │
│    - Extraer snippet de historia "Implementation"            │
│    - Convertir snippet a código ejecutable                  │
│    - Generar función de inicialización automática           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. GENERACIÓN DE CÓDIGO EJECUTABLE                          │
│    - Envolver en <script> automáticamente                    │
│    - Agregar lógica de espera para UBITS                    │
│    - Integrar con flujo de inicialización                   │
│    - Registrar en AUTORUN_PRESERVE_COMPONENTS               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. INSERCIÓN AUTOMÁTICA EN TEMPLATE                         │
│    - Insertar contenedor en .content-area                    │
│    - Insertar script de inicialización                      │
│    - Integrar con flujo existente                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 PASO 1: Detección Automática de Componentes Disponibles

### **Objetivo:**
Detectar automáticamente qué componentes están disponibles en `components-loader.js` y cuáles faltan.

### **Implementación:**

**Archivo:** `packages/autorun-core/src/helpers/componentAvailabilityDetector.ts`

```typescript
/**
 * Detecta qué componentes están disponibles en components-loader.js
 * y cuáles faltan
 */
export async function detectComponentAvailability(componentName: string): Promise<{
  available: boolean;
  apiName: string; // ej: "window.UBITS.Gallery.create"
  needsLoad: boolean;
}> {
  // 1. Mapear nombre de componente a API esperada
  const componentAPIMap: Record<string, string> = {
    'gallery': 'window.UBITS.Gallery.create',
    'tabs': 'window.createTabs',
    'card': 'window.createCard',
    'simple-card': 'window.createSimpleCard',
    // ... más componentes
  };

  const apiName = componentAPIMap[componentName.toLowerCase()];
  if (!apiName) {
    return { available: false, apiName: '', needsLoad: true };
  }

  // 2. Verificar si la API existe en window
  if (typeof window !== 'undefined') {
    const apiPath = apiName.split('.');
    let current: any = window;
    for (const part of apiPath) {
      if (current[part] === undefined) {
        return { available: false, apiName, needsLoad: true };
      }
      current = current[part];
    }
    return { available: true, apiName, needsLoad: false };
  }

  // 3. Si no estamos en navegador, asumir que necesita carga
  return { available: false, apiName, needsLoad: true };
}
```

---

## 📝 PASO 2: Carga Dinámica de Componentes Faltantes

### **Objetivo:**
Cargar automáticamente componentes que no están en `components-loader.js`.

### **Implementación:**

**Archivo:** `packages/autorun-core/src/helpers/dynamicComponentLoader.ts`

```typescript
/**
 * Carga dinámicamente un componente desde Storybook si no está disponible
 */
export async function loadComponentDynamically(
  componentName: string,
  storybookId: string
): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  // 1. Mapear componente a su add-on
  const componentAddonMap: Record<string, string> = {
    'gallery': '@ubits/gallery',
    'tabs': '@ubits/tabs',
    // ... más componentes
  };

  const addonName = componentAddonMap[componentName.toLowerCase()];
  if (!addonName) {
    console.warn(`⚠️ [Dynamic Loader] No se encontró add-on para: ${componentName}`);
    return false;
  }

  // 2. Cargar componente desde Storybook
  try {
    // Opción A: Cargar desde manifest.json de Storybook
    const manifestUrl = `https://ubits-storybook10.vercel.app/components/${storybookId}/manifest.json`;
    const manifest = await fetch(manifestUrl).then(r => r.json());

    // Opción B: Cargar directamente el add-on
    const addonUrl = `https://ubits-storybook10.vercel.app/components/${storybookId}/addon.js`;
    
    // 3. Ejecutar script dinámicamente
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = addonUrl;
      script.onload = () => {
        console.log(`✅ [Dynamic Loader] Componente ${componentName} cargado`);
        resolve(true);
      };
      script.onerror = () => {
        console.error(`❌ [Dynamic Loader] Error cargando ${componentName}`);
        reject(new Error(`Failed to load ${componentName}`));
      };
      document.head.appendChild(script);
    });

    return true;
  } catch (error) {
    console.error(`❌ [Dynamic Loader] Error cargando componente:`, error);
    return false;
  }
}
```

---

## 📝 PASO 3: Generación Automática de Código Ejecutable

### **Objetivo:**
Convertir snippets de Storybook en código ejecutable completo.

### **Implementación:**

**Archivo:** `packages/autorun-core/src/helpers/executableCodeGenerator.ts`

```typescript
/**
 * Convierte un snippet de Storybook en código ejecutable completo
 */
export function generateExecutableCode(
  snippet: string,
  componentName: string,
  containerId: string,
  apiName: string
): string {
  // 1. Extraer contenedor HTML del snippet
  const containerMatch = snippet.match(/<div[^>]*id=["']([^"']+)["'][^>]*>/);
  const extractedContainerId = containerMatch ? containerMatch[1] : containerId;

  // 2. Extraer código JavaScript del snippet
  const jsCode = snippet
    .replace(/\/\/\s*1\.\s*Crear contenedor HTML[\s\S]*?<\/div>/g, '')
    .replace(/\/\/\s*[0-9]+\.\s*/g, '')
    .trim();

  // 3. Generar función de inicialización automática
  const functionName = `create${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`;
  
  const executableCode = `
// ========================================
// CREAR ${componentName.toUpperCase()} - GENERADO AUTOMÁTICAMENTE POR AUTORUN
// ========================================
function ${functionName}() {
  const container = document.getElementById('${extractedContainerId}');
  if (!container) {
    console.warn('⚠️ [${componentName}] Contenedor no encontrado');
    return;
  }
  
  // Verificar que la API esté disponible
  const apiPath = '${apiName}'.split('.');
  let api = window;
  for (const part of apiPath) {
    if (api[part] === undefined) {
      console.warn('⚠️ [${componentName}] ${apiName} no está disponible, esperando...');
      setTimeout(${functionName}, 500);
      return;
    }
    api = api[part];
  }
  
  try {
    // Código extraído de Storybook
    ${jsCode}
    
    console.log('✅ [${componentName}] ${componentName} creado exitosamente');
    
    // Registrar para preservación automática
    if (window.AUTORUN_PRESERVE_COMPONENTS) {
      window.AUTORUN_PRESERVE_COMPONENTS.register('${componentName}', '${extractedContainerId}', {
        onClick: (e) => {
          console.log('📋 [${componentName}] ${componentName} clickeado');
        }
      });
    }
  } catch (error) {
    console.error('❌ [${componentName}] Error al crear ${componentName}:', error);
  }
}

// Ejecutar después de que los componentes estén cargados
setTimeout(${functionName}, 500);
`;

  return executableCode;
}
```

---

## 📝 PASO 4: Integración Automática con HtmlPrototypeAdapter

### **Objetivo:**
Modificar `HtmlPrototypeAdapter` para generar código ejecutable automáticamente.

### **Implementación:**

**Archivo:** `packages/autorun-core/src/adapters/HtmlPrototypeAdapter.ts`

```typescript
import { generateExecutableCode } from '../helpers/executableCodeGenerator.js';
import { detectComponentAvailability } from '../helpers/componentAvailabilityDetector.js';
import { loadComponentDynamically } from '../helpers/dynamicComponentLoader.js';

export class HtmlPrototypeAdapter {
  async insertContentBlock(
    htmlBlock: string,
    componentName: string,
    storybookId: string
  ): Promise<void> {
    // 1. Detectar disponibilidad del componente
    const availability = await detectComponentAvailability(componentName);
    
    // 2. Cargar componente si falta
    if (availability.needsLoad) {
      console.log(`📦 [Autorun] Cargando componente ${componentName} dinámicamente...`);
      await loadComponentDynamically(componentName, storybookId);
    }

    // 3. Generar código ejecutable desde el snippet
    const executableCode = generateExecutableCode(
      htmlBlock,
      componentName,
      `{componentName}-implementation-container`,
      availability.apiName
    );

    // 4. Extraer contenedor HTML del snippet
    const containerMatch = htmlBlock.match(/<div[^>]*id=["']([^"']+)["'][^>]*>/);
    const containerId = containerMatch ? containerMatch[1] : `${componentName}-implementation-container`;
    const containerHTML = containerMatch ? containerMatch[0] : `<div id="${containerId}"></div>`;

    // 5. Insertar contenedor en .content-area
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      const containerDiv = document.createElement('div');
      containerDiv.innerHTML = containerHTML;
      contentArea.appendChild(containerDiv.firstElementChild!);
    }

    // 6. Insertar script de inicialización
    const scriptTag = document.createElement('script');
    scriptTag.textContent = executableCode;
    document.body.appendChild(scriptTag);
  }
}
```

---

## 📝 PASO 5: Modificar autorunApply para Usar el Sistema Automático

### **Objetivo:**
Modificar `autorunApply` para usar el nuevo sistema automático.

### **Implementación:**

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

```typescript
import { HtmlPrototypeAdapter } from '../../adapters/HtmlPrototypeAdapter.js';
import { detectComponentAvailability } from '../../helpers/componentAvailabilityDetector.js';
import { loadComponentDynamically } from '../../helpers/dynamicComponentLoader.js';

export async function autorunApplyModeB(
  message: string,
  targetFiles: string[]
): Promise<ApplyResult> {
  // 1. Detectar componente del mensaje
  const componentName = detectComponentFromMessage(message);
  const storybookId = getStorybookId(componentName);

  // 2. Extraer código de Storybook
  const snippet = await extractCodeFromStorybook(storybookId);

  // 3. Verificar disponibilidad y cargar si falta
  const availability = await detectComponentAvailability(componentName);
  if (availability.needsLoad) {
    await loadComponentDynamically(componentName, storybookId);
  }

  // 4. Usar HtmlPrototypeAdapter con sistema automático
  const adapter = new HtmlPrototypeAdapter();
  await adapter.insertContentBlock(snippet, componentName, storybookId);

  return {
    success: true,
    filesWritten: targetFiles,
    warnings: []
  };
}
```

---

## 📝 PASO 6: Eliminar Todo el Código Hardcodeado del Template

### **Objetivo:**
Eliminar todas las funciones hardcodeadas del template.

### **Acciones:**

1. **Eliminar funciones hardcodeadas:**
   - `createGallery()` (línea 1459)
   - `createCardContent()` (línea 1289)
   - `createTabs()` (línea 1341)
   - `createSimpleCard()` (línea 1411)

2. **Eliminar llamadas hardcodeadas:**
   - `setTimeout(createGallery, 500)`
   - `setTimeout(createCardContent, 1000)`
   - `setTimeout(createTabs, 1500)`
   - `setTimeout(createSimpleCard, 2000)`

3. **Mantener solo:**
   - Sistema de preservación automática (`AUTORUN_PRESERVE_COMPONENTS`)
   - Interceptores de `ContentManager.updateContent`
   - Flujo de inicialización del template

---

## 📝 PASO 7: Sistema de Mapeo Automático de Componentes

### **Objetivo:**
Crear un sistema que mapee automáticamente nombres de componentes a sus APIs.

### **Implementación:**

**Archivo:** `packages/autorun-core/src/helpers/componentAPIMapper.ts`

```typescript
/**
 * Mapea nombres de componentes a sus APIs en window.UBITS
 */
export const COMPONENT_API_MAP: Record<string, {
  apiName: string;
  addonName: string;
  storybookId: string;
}> = {
  'gallery': {
    apiName: 'window.UBITS.Gallery.create',
    addonName: '@ubits/gallery',
    storybookId: 'layout-gallery'
  },
  'tabs': {
    apiName: 'window.createTabs',
    addonName: '@ubits/tabs',
    storybookId: 'navegación-tabs'
  },
  'card': {
    apiName: 'window.createCard',
    addonName: '@ubits/card',
    storybookId: 'layout-card'
  },
  'simple-card': {
    apiName: 'window.createSimpleCard',
    addonName: '@ubits/simple-card',
    storybookId: 'layout-simple-card'
  },
  // ... más componentes
};

/**
 * Obtiene información de API para un componente
 */
export function getComponentAPIInfo(componentName: string) {
  const normalized = componentName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return COMPONENT_API_MAP[normalized] || null;
}
```

---

## 📝 PASO 8: Testing y Validación

### **Objetivos:**

1. **Probar con Gallery:**
   - Verificar que se detecta que falta
   - Verificar que se carga dinámicamente
   - Verificar que se genera código ejecutable
   - Verificar que funciona sin hardcode

2. **Probar con otros componentes:**
   - Tabs
   - Card
   - Simple Card
   - Cualquier otro componente

3. **Verificar que no hay hardcode:**
   - No hay funciones hardcodeadas
   - No hay llamadas hardcodeadas
   - Todo se genera automáticamente

---

## 🎯 Resumen del Plan

### **Fases de Implementación:**

1. ✅ **FASE 1:** Crear sistema de detección de disponibilidad
2. ✅ **FASE 2:** Crear sistema de carga dinámica
3. ✅ **FASE 3:** Crear generador de código ejecutable
4. ✅ **FASE 4:** Integrar con HtmlPrototypeAdapter
5. ✅ **FASE 5:** Modificar autorunApply
6. ✅ **FASE 6:** Eliminar código hardcodeado
7. ✅ **FASE 7:** Crear mapeo automático
8. ✅ **FASE 8:** Testing completo

### **Resultado Esperado:**

- ✅ Autorun puede implementar CUALQUIER componente automáticamente
- ✅ No hay NADA hardcodeado
- ✅ Los componentes se cargan dinámicamente si faltan
- ✅ El código se genera automáticamente desde Storybook
- ✅ Todo funciona sin intervención manual

---

## 🚀 Próximos Pasos

1. **Implementar FASE 1-3** (sistemas base)
2. **Implementar FASE 4-5** (integración)
3. **Implementar FASE 6** (limpieza)
4. **Implementar FASE 7** (mapeo)
5. **Testing FASE 8** (validación)

¿Quieres que empiece a implementar estas fases?
