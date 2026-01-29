# 🔍 Análisis Profundo: Fallos en autorun.apply() - Implementación Botón + Drawer + Inputs

**Fecha:** 2025-01-23  
**Problema:** `autorun.apply()` falló completamente al implementar botón secundario con icono de filtro que abre drawer con inputs UBITS.

---

## 📋 Resumen Ejecutivo

**Resultado:** ❌ **FALLO COMPLETO**
- Botón implementado incorrectamente (icono blanco, no cuadrado)
- Drawer no se abría
- Inputs genéricos HTML en lugar de componentes UBITS Input
- No se consultó la historia "implementation" de Storybook
- No se analizaron componentes internos del drawer

**Causa Raíz:** `autorun.apply()` Mode B (`prototypeTokens`) tiene **3 fallos críticos**:
1. ❌ **No busca historia "implementation"** - Usa `'default'` hardcodeado
2. ❌ **No analiza componentes internos** - No detecta que el drawer necesita Inputs
3. ❌ **Extracción superficial** - Solo extrae código del componente principal, no de sus dependencias

---

## 🔍 Análisis Detallado del Flujo

### 1. Detección de Modo

**Archivo objetivo:** `prototypes/canvas-administrador-encuestas-2025-12-23.html`

```typescript
// autorunApply.ts línea 80-84
const mode: AutorunMode =
  input.options?.mode ||
  (targetFile && targetFile.startsWith('prototypes/')
    ? 'prototypeTokens'  // ✅ CORRECTO: Detecta modo prototypeTokens
    : 'strict');
```

**✅ CORRECTO:** El modo se detectó correctamente como `prototypeTokens` (Mode B).

---

### 2. Flujo Mode B - Extracción de Código

**Problema crítico #1: Historia "implementation" no se busca**

```typescript
// autorunApply.ts línea 1775-1778 (Mode B)
const exactCode = await extractExactCodeFromStorybookWithBrowser(
  componentId,
  'default'  // ❌ HARDCODEADO A 'default' - NO BUSCA "implementation"
);
```

**❌ FALLO CRÍTICO:** En Mode B, la historia está hardcodeada a `'default'` en lugar de buscar primero `'implementation'`.

**Comparación con Mode Strict:**
```typescript
// autorunApply.ts línea 744-753 (Mode Strict)
let storyName = 'default';
try {
  storyName = await findImplementationStory(componentId);  // ✅ BUSCA "implementation"
  console.log(`   ✅ Historia seleccionada: ${storyName}`);
} catch (error: any) {
  console.warn(`   ⚠️ Error buscando historia "implementation": ${error.message}, usando "default"`);
  storyName = 'default';
}
```

**✅ Mode Strict:** Busca `'implementation'` primero  
**❌ Mode B:** Usa `'default'` directamente

**Impacto:**
- La historia `'default'` del Button solo muestra el botón básico
- La historia `'implementation'` muestra el botón con todos los componentes relacionados (drawer, inputs, etc.)
- Al usar `'default'`, solo se extrajo el código del botón, no del drawer ni de los inputs

---

### 3. Análisis de Componentes Internos

**Problema crítico #2: No se analizan componentes internos**

**En Mode Strict:**
```typescript
// autorunApply.ts línea 950-980 (Mode Strict)
// 2.4 Analizar componentes internos (OBLIGATORIO)
console.log(`   [2.4] Analizando componentes internos...`);
let internalAnalysis;
try {
  internalAnalysis = await analyzeComponentInternals(
    componentId,
    storyName
  );
  // ... procesa componentes internos detectados
}
```

**En Mode B:**
```typescript
// autorunApply.ts línea 1770-1839 (Mode B)
// ❌ NO HAY ANÁLISIS DE COMPONENTES INTERNOS
// Solo extrae código y lo inserta directamente
```

**❌ FALLO CRÍTICO:** Mode B **NO analiza componentes internos**, por lo que:
- No detecta que el drawer necesita Inputs
- No consulta Storybook MCP para los Inputs
- No extrae código de los Inputs desde Storybook
- Genera inputs HTML genéricos en lugar de componentes UBITS

**Impacto:**
- El drawer se implementó con inputs HTML genéricos (`<input type="text">`)
- No se consultó Storybook para obtener los componentes Input de UBITS
- No se incluyeron los scripts necesarios (`input.umd.js`)

---

### 4. Extracción de Código desde Storybook

**Problema crítico #3: Extracción superficial**

**Lo que debería hacer:**
1. ✅ Extraer código del Button desde historia "implementation"
2. ✅ Detectar que el Button abre un Drawer
3. ✅ Extraer código del Drawer desde su historia "implementation"
4. ✅ Detectar que el Drawer contiene Inputs
5. ✅ Extraer código de los Inputs desde su historia "implementation"
6. ✅ Combinar todo el código con las dependencias correctas

**Lo que realmente hizo:**
1. ✅ Extrajo código del Button desde historia "default"
2. ❌ No detectó el Drawer
3. ❌ No extrajo código del Drawer
4. ❌ No detectó los Inputs
5. ❌ No extrajo código de los Inputs
6. ❌ Insertó código incompleto sin dependencias

**Código extraído (incorrecto):**
```html
<!-- Solo el botón básico, sin drawer ni inputs -->
<button class="ubits-button ubits-button--secondary">
  <i class="far fa-filter"></i>
</button>
```

**Código que debería haberse extraído:**
```html
<!-- Botón que abre drawer -->
<button class="ubits-button ubits-button--secondary" onclick="openFilterDrawer()">
  <i class="far fa-filter"></i>
</button>

<!-- Drawer con Inputs UBITS -->
<ubits-drawer id="filter-drawer">
  <div class="drawer-body">
    <div id="filter-input-1-container"></div>
    <div id="filter-input-2-container"></div>
  </div>
</ubits-drawer>

<script>
  // Código para crear Inputs UBITS usando window.createInput
  function createFilterInputs() {
    window.createInput({
      container: 'filter-input-1-container',
      // ... props exactas desde Storybook
    });
  }
</script>
```

---

## 🔍 Análisis de Componentes Específicos

### Botón

**Problema:** Icono blanco, botón no cuadrado

**Causa:**
- El código extraído desde historia "default" no incluía los estilos necesarios
- La historia "implementation" tiene los estilos correctos (`width: 40px; height: 40px;`)

**Solución requerida:**
- Usar historia "implementation" del Button
- Extraer código completo con estilos inline o clases CSS correctas

### Drawer

**Problema:** Drawer no se abría

**Causa:**
- No se extrajo código del Drawer desde Storybook
- No se incluyó el JavaScript necesario para abrir el drawer
- No se incluyó el script `drawer.umd.js`

**Solución requerida:**
- Detectar que el Button abre un Drawer (análisis de componentes internos)
- Extraer código del Drawer desde su historia "implementation"
- Incluir scripts necesarios (`drawer.umd.js`)

### Inputs

**Problema:** Inputs HTML genéricos en lugar de componentes UBITS Input

**Causa:**
- No se detectaron los Inputs como componentes internos del Drawer
- No se consultó Storybook MCP para obtener props de Input
- No se extrajo código de los Inputs desde Storybook
- No se incluyó el script `input.umd.js`

**Solución requerida:**
- Analizar componentes internos del Drawer
- Detectar que el Drawer contiene Inputs
- Consultar Storybook MCP para Input (`mcp_storybook_getComponentsProps(['básicos-input'])`)
- Extraer código de los Inputs desde su historia "implementation"
- Incluir scripts necesarios (`input.umd.js`)

---

## 🔍 Comparación: Mode Strict vs Mode B

| Aspecto | Mode Strict | Mode B (prototypeTokens) |
|---------|-------------|-------------------------|
| **Busca historia "implementation"** | ✅ Sí (línea 746) | ❌ No (hardcodeado a 'default') |
| **Analiza componentes internos** | ✅ Sí (línea 950) | ❌ No |
| **Extrae dependencias** | ✅ Sí | ❌ No |
| **Consulta Storybook MCP** | ✅ Sí (línea 680) | ⚠️ Parcial (solo componente principal) |
| **Combina código con props** | ✅ Sí (línea 802) | ❌ No |
| **Valida estructura completa** | ✅ Sí (línea 840) | ❌ No |

**Conclusión:** Mode B es **incompleto** comparado con Mode Strict. Falta:
1. Búsqueda de historia "implementation"
2. Análisis de componentes internos
3. Extracción de dependencias
4. Validación completa

---

## 🔧 Soluciones Requeridas

### Solución 1: Buscar historia "implementation" en Mode B

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Línea actual (1775-1778):**
```typescript
const exactCode = await extractExactCodeFromStorybookWithBrowser(
  componentId,
  'default'  // ❌ HARDCODEADO
);
```

**Cambio requerido:**
```typescript
// Buscar historia "implementation" primero (igual que Mode Strict)
let storyName = 'default';
try {
  storyName = await findImplementationStory(componentId);
  console.log(`   ✅ Historia seleccionada: ${storyName}`);
} catch (error: any) {
  console.warn(`   ⚠️ Error buscando historia "implementation": ${error.message}, usando "default"`);
  storyName = 'default';
}

const exactCode = await extractExactCodeFromStorybookWithBrowser(
  componentId,
  storyName  // ✅ USAR HISTORIA ENCONTRADA
);
```

---

### Solución 2: Analizar componentes internos en Mode B

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Agregar después de extraer código (después de línea 1833):**
```typescript
// ✅ NUEVO: Analizar componentes internos (igual que Mode Strict)
console.log(`   [5.2] Analizando componentes internos...`);
let internalAnalysis;
try {
  internalAnalysis = await analyzeComponentInternals(
    componentId,
    storyName
  );

  if (internalAnalysis && internalAnalysis.components.length > 0) {
    console.log(`   ✅ Componentes internos detectados: ${internalAnalysis.components.length}`);
    
    // Para cada componente interno:
    for (const internalComponent of internalAnalysis.components) {
      console.log(`   📦 Componente interno: ${internalComponent.name} (${internalComponent.id})`);
      
      // 1. Consultar Storybook MCP
      // 2. Extraer código desde historia "implementation"
      // 3. Agregar a codeToInsert
      // 4. Agregar scripts necesarios a resolvedDeps
    }
  }
} catch (error: any) {
  console.warn(`   ⚠️ Error analizando componentes internos: ${error.message}`);
}
```

---

### Solución 3: Extraer dependencias recursivamente

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Crear función recursiva:**
```typescript
async function extractComponentWithDependencies(
  componentId: string,
  storyName: string = 'default',
  visited: Set<string> = new Set()
): Promise<{
  code: string;
  scripts: string[];
  css: string[];
}> {
  // Evitar loops infinitos
  if (visited.has(componentId)) {
    return { code: '', scripts: [], css: [] };
  }
  visited.add(componentId);

  // 1. Buscar historia "implementation"
  let finalStoryName = storyName;
  if (storyName === 'default') {
    try {
      finalStoryName = await findImplementationStory(componentId);
    } catch {
      finalStoryName = 'default';
    }
  }

  // 2. Extraer código del componente
  const exactCode = await extractExactCodeFromStorybookWithBrowser(
    componentId,
    finalStoryName
  );

  // 3. Analizar componentes internos
  const internalAnalysis = await analyzeComponentInternals(
    componentId,
    finalStoryName
  );

  // 4. Extraer dependencias recursivamente
  let allCode = exactCode.html;
  let allScripts = exactCode.scripts || [];
  let allCss = exactCode.css || [];

  if (internalAnalysis && internalAnalysis.components.length > 0) {
    for (const dep of internalAnalysis.components) {
      const depResult = await extractComponentWithDependencies(
        dep.id,
        'default',
        visited
      );
      allCode += '\n' + depResult.code;
      allScripts.push(...depResult.scripts);
      allCss.push(...depResult.css);
    }
  }

  return {
    code: allCode,
    scripts: allScripts,
    css: allCss,
  };
}
```

**Usar en Mode B:**
```typescript
// Reemplazar línea 1775-1833
const { code: codeToInsert, scripts: depScripts, css: depCss } = 
  await extractComponentWithDependencies(componentId, 'default');
```

---

## 📊 Resumen de Fallos

| # | Fallo | Impacto | Solución |
|---|-------|---------|----------|
| 1 | No busca historia "implementation" | Código incompleto | Buscar `findImplementationStory()` antes de extraer |
| 2 | No analiza componentes internos | No detecta dependencias | Agregar `analyzeComponentInternals()` en Mode B |
| 3 | Extracción superficial | No extrae código de dependencias | Implementar extracción recursiva |
| 4 | No consulta Storybook MCP para dependencias | Props incorrectas | Consultar MCP para cada componente interno |
| 5 | No incluye scripts de dependencias | Componentes no funcionan | Agregar scripts de dependencias a `resolvedDeps` |

---

## ✅ Plan de Acción

1. **Corregir búsqueda de historia "implementation" en Mode B**
   - Agregar `findImplementationStory()` antes de extraer código
   - Usar la historia encontrada en lugar de `'default'`

2. **Agregar análisis de componentes internos en Mode B**
   - Llamar `analyzeComponentInternals()` después de extraer código
   - Procesar cada componente interno detectado

3. **Implementar extracción recursiva de dependencias**
   - Crear función `extractComponentWithDependencies()`
   - Extraer código de componentes internos recursivamente
   - Incluir scripts y CSS de dependencias

4. **Consultar Storybook MCP para cada componente**
   - Consultar MCP para componente principal
   - Consultar MCP para cada componente interno
   - Combinar props correctamente

5. **Validar estructura completa**
   - Validar componente principal
   - Validar componentes internos
   - Validar dependencias

---

## 🎯 Conclusión

**Causa raíz:** Mode B (`prototypeTokens`) es **incompleto** comparado con Mode Strict. Le faltan 3 funcionalidades críticas:
1. Búsqueda de historia "implementation"
2. Análisis de componentes internos
3. Extracción recursiva de dependencias

**Solución:** Implementar las 3 funcionalidades faltantes en Mode B para que tenga la misma capacidad que Mode Strict.

**Prioridad:** 🔴 **CRÍTICA** - Sin estas correcciones, Mode B seguirá fallando en implementaciones complejas con múltiples componentes.

