# 📋 Plan Paso a Paso: Solución Extracción Completa desde Storybook

## 🎯 OBJETIVO

Extraer **TODO** lo necesario desde Storybook para implementar CardContent sin hardcodeo:
1. ✅ Código de la historia "implementation"
2. ✅ Funciones helper (`getProviderLogo`, `renderIconHelper`, `buildCardData`)
3. ✅ Configuraciones (PROVIDERS, LEVELS, STATUSES, CONTENT_TYPES, COMPETENCIES)
4. ✅ HTML exacto de `renderCardContent()`
5. ✅ Verificar disponibilidad real de APIs globales

---

## 📊 FASE 1: Extracción Completa desde Storybook

### **PASO 1.1: Extraer Código de la Historia "Implementation"** ✅ (YA FUNCIONA)

**Estado:** ✅ **COMPLETADO**

**Qué se extrae:**
- Código JavaScript de la historia "implementation"
- Estructura de datos
- Valores de ejemplo

**Herramienta:** `mcp_storybook_getComponentCode` con `storyName: "implementation"`

**Resultado esperado:**
```javascript
const cardElement = createCard({
  type: 'Curso',
  title: 'Segmenta la experiencia del cliente',
  // ... resto de props
});
```

---

### **PASO 1.2: Extraer Funciones Helper de la Historia "Implementation"** ❌ (NUEVO)

**Estado:** ❌ **PENDIENTE**

**Problema actual:**
- La historia "implementation" muestra código pero NO incluye las funciones helper completas
- `getProviderLogo()`, `buildCardData()` están en el archivo de stories pero no se extraen

**Solución:**
1. **Extraer código completo de la historia "implementation"** (incluyendo funciones helper)
2. **O extraer desde el archivo de stories directamente** (`CardContent.stories.ts`)

**Implementación:**
```typescript
// En storybookExactCodeExtractor.ts o similar
async function extractHelperFunctionsFromStorybook(
  componentId: string,
  storyName: string = 'implementation'
): Promise<{
  helperFunctions: string[];
  configs: Record<string, any>;
}> {
  // 1. Obtener código de la historia "implementation"
  const storyCode = await getComponentCode(componentId, storyName);
  
  // 2. Buscar funciones helper en el código extraído
  // - getProviderLogo
  // - buildCardData
  // - renderIconHelper (si está)
  
  // 3. Extraer configuraciones (PROVIDERS, LEVELS, STATUSES)
  
  return {
    helperFunctions: [...],
    configs: {...}
  };
}
```

**Archivo a modificar:**
- `packages/autorun-core/src/helpers/storybookExactCodeExtractor.ts`
- O crear nuevo: `packages/autorun-core/src/helpers/storybookHelperFunctionsExtractor.ts`

---

### **PASO 1.3: Extraer Configuraciones desde Storybook** ❌ (NUEVO)

**Estado:** ❌ **PENDIENTE**

**Problema actual:**
- PROVIDERS, LEVELS, STATUSES están hardcodeados
- Deberían venir de `cardConfigs.ts` o extraerse desde Storybook

**Solución:**
1. **Extraer desde la pestaña "Docs" de Storybook** (muestra todas las opciones)
2. **O extraer desde el código fuente** (`cardConfigs.ts`)

**Implementación:**
```typescript
// Opción 1: Extraer desde Docs de Storybook
async function extractConfigsFromStorybookDocs(
  componentId: string
): Promise<{
  providers: Record<string, string>;
  levels: Record<string, string>;
  statuses: Record<string, { class: string; text: string }>;
  contentTypes: string[];
  competencies: string[];
  durations: string[];
  languages: string[];
}> {
  // 1. Navegar a Docs
  const docsUrl = `${baseUrl}/?path=/docs/${componentId}--docs`;
  
  // 2. Extraer información de la tabla de props
  // - provider: options muestra Object.keys(PROVIDERS)
  // - level: options muestra ['Básico', 'Intermedio', 'Avanzado']
  // - status: options muestra ['default', 'progress', 'completed']
  
  // 3. O extraer desde el código fuente directamente
  const sourceCode = await fetchSourceFile('cardConfigs.ts');
  const configs = parseConfigsFromSource(sourceCode);
  
  return configs;
}
```

**Archivo a modificar:**
- `packages/autorun-core/src/helpers/storybookPropsExtractorRobust.ts`
- O crear nuevo: `packages/autorun-core/src/helpers/storybookConfigsExtractor.ts`

---

### **PASO 1.4: Extraer HTML Exacto de `renderCardContent()`** ❌ (NUEVO)

**Estado:** ❌ **PENDIENTE**

**Problema actual:**
- HTML del fallback está hardcodeado y no es exacto
- Debería venir de `renderCardContent()` del código fuente

**Solución:**
1. **Extraer función `renderCardContent()` completa desde el código fuente**
2. **O extraer HTML desde la pestaña "Code" de Storybook** (si muestra el HTML renderizado)

**Implementación:**
```typescript
// Opción 1: Extraer desde código fuente
async function extractRenderFunctionFromSource(
  componentId: string
): Promise<{
  renderFunction: string;
  helperFunctions: string[];
}> {
  // 1. Identificar archivo fuente
  const sourceFile = `vendor/ubits/packages/components/card/src/CardContentProvider.ts`;
  
  // 2. Leer archivo
  const sourceCode = await readFile(sourceFile);
  
  // 3. Extraer función renderCardContent
  const renderFunction = extractFunction(sourceCode, 'renderCardContent');
  
  // 4. Extraer funciones helper (renderIconHelper)
  const helperFunctions = extractHelperFunctions(sourceCode);
  
  return {
    renderFunction,
    helperFunctions
  };
}

// Opción 2: Extraer desde Storybook "Code" tab
async function extractHTMLFromStorybookCodeTab(
  componentId: string
): Promise<string> {
  // 1. Navegar a historia "implementation"
  const storyUrl = `${baseUrl}/?path=/story/${componentId}--implementation`;
  
  // 2. Hacer click en pestaña "Code"
  // 3. Extraer HTML renderizado
  
  return html;
}
```

**Archivo a modificar:**
- `packages/autorun-core/src/helpers/storybookExactCodeExtractor.ts`
- O crear nuevo: `packages/autorun-core/src/helpers/sourceCodeExtractor.ts`

---

### **PASO 1.5: Verificar Disponibilidad Real de APIs Globales** ❌ (NUEVO)

**Estado:** ❌ **PENDIENTE**

**Problema actual:**
- Se intenta usar `window.createCard` pero no existe
- No se verifica qué APIs están realmente disponibles

**Solución:**
1. **Verificar qué APIs están disponibles** desde `components-loader.js`
2. **O verificar desde el código fuente** (CardAddon si existe)

**Implementación:**
```typescript
async function detectAvailableCardAPI(): Promise<{
  createCard?: string; // 'window.createCard' | 'window.UBITS.Card.create' | null
  renderCardContent?: string;
  available: boolean;
}> {
  // 1. Verificar window.createCard
  if (typeof window !== 'undefined' && (window as any).createCard) {
    return { createCard: 'window.createCard', available: true };
  }
  
  // 2. Verificar window.UBITS.Card.create
  if (typeof window !== 'undefined' && (window as any).UBITS?.Card?.create) {
    return { createCard: 'window.UBITS.Card.create', available: true };
  }
  
  // 3. Verificar si está disponible desde components-loader.js
  // (necesita ejecutarse en el browser)
  
  // 4. Si no está disponible, usar renderCardContent directamente
  return {
    createCard: null,
    renderCardContent: 'renderCardContent (directo)',
    available: false
  };
}
```

**Archivo a modificar:**
- `packages/autorun-core/src/helpers/componentAvailabilityDetector.ts`
- O crear nuevo: `packages/autorun-core/src/helpers/cardAPIDetector.ts`

---

## 📊 FASE 2: Integración en `autorun.apply()`

### **PASO 2.1: Modificar `autorun.apply()` para Usar Extracción Completa**

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Cambios necesarios:**

1. **Después de extraer código de "implementation":**
   ```typescript
   // FASE 2.1: Extraer código de "implementation"
   const implementationCode = await extractCodeFromStorybook(componentId, 'implementation');
   
   // FASE 2.2: Extraer funciones helper
   const helperFunctions = await extractHelperFunctionsFromStorybook(componentId);
   
   // FASE 2.3: Extraer configuraciones
   const configs = await extractConfigsFromStorybookDocs(componentId);
   
   // FASE 2.4: Extraer función renderCardContent
   const renderFunction = await extractRenderFunctionFromSource(componentId);
   
   // FASE 2.5: Verificar APIs disponibles
   const apiInfo = await detectAvailableCardAPI();
   ```

2. **Generar código completo con todo extraído:**
   ```typescript
   const completeCode = generateCompleteCode({
     implementationCode,
     helperFunctions,
     configs,
     renderFunction,
     apiInfo
   });
   ```

---

## 📊 FASE 3: Pruebas

### **PASO 3.1: Probar Extracción Completa**

1. Ejecutar `handleUserMessage('implementa la contentcard')`
2. Verificar que se extrae:
   - ✅ Código de "implementation"
   - ✅ Funciones helper
   - ✅ Configuraciones
   - ✅ Función renderCardContent
   - ✅ Información de APIs disponibles

### **PASO 3.2: Verificar que No Hay Hardcodeo**

1. Buscar en el código generado:
   - ❌ No debe haber PROVIDERS hardcodeados
   - ❌ No debe haber LEVELS hardcodeados
   - ❌ No debe haber STATUSES hardcodeados
   - ❌ No debe haber funciones helper hardcodeadas

---

## 🎯 PRIORIDADES

### **ALTA PRIORIDAD (Empezar aquí):**

1. ✅ **PASO 1.1:** Ya funciona - Extraer código de "implementation"
2. 🔄 **PASO 1.2:** Extraer funciones helper desde stories
3. 🔄 **PASO 1.3:** Extraer configuraciones desde Docs o código fuente
4. 🔄 **PASO 1.5:** Verificar APIs disponibles

### **MEDIA PRIORIDAD:**

5. 🔄 **PASO 1.4:** Extraer HTML exacto de renderCardContent
6. 🔄 **PASO 2.1:** Integrar en autorun.apply()

### **BAJA PRIORIDAD:**

7. 🔄 **PASO 3.1:** Pruebas completas
8. 🔄 **PASO 3.2:** Verificación de hardcodeo

---

## 📝 NOTAS IMPORTANTES

1. **Orden de navegación:** implementation → docs → default (ya corregido)
2. **Rutas de PROVIDERS:** Hay 3 rutas diferentes, necesitamos usar la correcta
3. **window.createCard:** No existe, necesitamos verificar qué API está disponible
4. **HTML exacto:** Debe venir de `renderCardContent()`, no hardcodeado

---

## ✅ CHECKLIST DE COMPLETACIÓN

- [ ] PASO 1.1: Extraer código de "implementation" ✅ (YA FUNCIONA)
- [ ] PASO 1.2: Extraer funciones helper desde stories
- [ ] PASO 1.3: Extraer configuraciones desde Docs/código fuente
- [ ] PASO 1.4: Extraer HTML exacto de renderCardContent
- [ ] PASO 1.5: Verificar APIs disponibles
- [ ] PASO 2.1: Integrar en autorun.apply()
- [ ] PASO 3.1: Probar extracción completa
- [ ] PASO 3.2: Verificar que no hay hardcodeo

---

**Siguiente paso:** Implementar PASO 1.2 (Extraer funciones helper desde stories)
