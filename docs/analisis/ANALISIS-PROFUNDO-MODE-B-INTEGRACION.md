# 🔍 Análisis Profundo: Integración Mode B (prototypeTokens) en Autorun

**Fecha:** 2025-01-03  
**Objetivo:** Implementar Mode B sin dañar wizard ni add-ons existentes

---

## 📋 Resumen Ejecutivo

**Mode B (`prototypeTokens`)** permite que Autorun implemente con:
- ✅ Componentes UBITS cuando existen (desde contratos, determinístico)
- ✅ Widgets tokenizados solo cuando faltan componentes específicos (gaps)
- ✅ Solo en `prototypes/` (no afecta código fuente)
- ✅ Con enforcement real (watermark + verify diff-based fail-closed)

**⚠️ CRÍTICO:** 
- Modo `strict` se mantiene (flujo actual intacto)
- Tokens desde contratos/repo local (NO Storybook MCP)
- Dependencias desde contratos (NO Storybook MCP)
- Storybook MCP solo para cross-check de props/existencia

**Principio clave:** Extender, no reemplazar. El flujo actual sigue funcionando.

---

## 🏗️ Arquitectura Actual (Pre-Mode B)

### Flujo Actual de `autorun.apply()`

```
1. handleUserMessage() → Detección componente
2. Storybook MCP → Props exactas (OBLIGATORIO, fail-closed)
3. Extracción código exacto
4. Validación pre-implementación
5. Análisis componentes internos
6. Escritura con marcas Autorun (watermark básico)
7. Post-implementación (Prettier, ESLint, Auto-Reload, GitHub)
```

### Componentes Clave Existentes

1. **AutorunHub** (`packages/autorun-core/src/AutorunHub.ts`)
   - Orquesta add-ons
   - Gestiona ciclo de vida
   - NO se modifica para Mode B

2. **autorun.apply()** (`packages/autorun-core/src/mcp-server/tools/autorunApply.ts`)
   - Tool MCP principal
   - Flujo completo de implementación
   - **SE EXTIENDE** (no se reemplaza)

3. **Wizard** (`packages/autorun-core/src/wizard/InitializationWizard.ts`)
   - Crea templates iniciales
   - Configura proyecto
   - **NO SE MODIFICA** (Mode B solo afecta `prototypes/` después del wizard)

4. **Add-ons** (`packages/addons/functional/`)
   - Pre-Implementation Check
   - Auto-Reload
   - Problem Tracker
   - **NO SE MODIFICAN** (Mode B es transparente para ellos)

5. **Watermark Básico** (`packages/autorun-core/src/mcp-server/helpers/codeMarkGenerator.ts`)
   - Ya existe sistema de marcas
   - **SE MEJORA** (hash + verificación más robusta)

---

## 🎯 Estrategia de Integración: Extensión Incremental

### Principio: "Mode B es el Flujo Principal"

**✅ Flujo único basado en Storybook MCP:**
- Mode B (`prototypeTokens`) es el flujo PRINCIPAL y ÚNICO
- Storybook MCP es OBLIGATORIO siempre (fail-closed)
- No hay modo alternativo sin Storybook MCP
- Wizard sigue funcionando igual (solo crea templates iniciales)
- Add-ons siguen funcionando igual (agnósticos al modo)

**✅ Separación de responsabilidades:**
- Mode B solo afecta `prototypes/*.html`
- No afecta código fuente (`src/`, `packages/`)
- No afecta wizard (solo templates iniciales)
- No afecta add-ons (son agnósticos al modo)

---

## 📐 Diseño Detallado: Integración Mode B

### 1. Extensión de Tipos (Sin Romper Existentes)

**Archivo:** `packages/autorun-core/src/mcp-server/types.ts`

```typescript
// ✅ EXISTENTE (se mantiene)
export interface AutorunApplyInput {
  message: string;
  targetFiles?: string[];
  options?: {
    skipVerification?: boolean;
    dryRun?: boolean;
    // ... opciones existentes
  };
}

// ✅ Mode B es el único modo (siempre usa Storybook MCP)
export type AutorunMode = "prototypeTokens"; // Único modo disponible

export interface AutorunApplyInputExtended extends AutorunApplyInput {
  options?: AutorunApplyInput['options'] & {
    mode?: AutorunMode;                 // default: "prototypeTokens" (único modo)
    requireStorybookMcp?: boolean;      // default: true (SIEMPRE obligatorio, fail-closed)
    allowPrototypeTokens?: boolean;     // default: true (siempre permitido en Mode B)
    anchors?: { content: string; scripts: string }; // defaults
  };
  design?: {
    figma?: { url: string; frameNodeId?: string };
    image?: { kind: "file" | "url"; value: string };
  };
}
```

**⚠️ CRÍTICO:**
- `mode` siempre es `"prototypeTokens"` (único modo)
- `requireStorybookMcp` siempre es `true` (obligatorio, fail-closed)
- Si `design` no se especifica → funciona con texto (pero siempre consulta Storybook MCP primero)

---

### 2. Watermark Mejorado (Extiende el Existente)

**Archivo:** `packages/autorun-core/src/verify/Watermark.ts` (NUEVO)

**Relación con existente:**
- `codeMarkGenerator.ts` sigue funcionando (usado por modo `strict`)
- `Watermark.ts` es versión mejorada para Mode B
- Ambos pueden coexistir

**Funciones:**

```typescript
// ✅ NUEVO: Watermark mejorado para Mode B
export function emitWatermark(
  meta: {
    v: number;              // versión watermark (2 para Mode B)
    mode: AutorunMode;
    components: string[];    // componentes UBITS usados
    widgets: string[];       // widgets tokenizados usados
    deps: string[];          // dependencias resueltas
  },
  content: string
): { wrappedContent: string; hash: string }

// ✅ NUEVO: Parse mejorado
export function parseWatermarks(fileContent: string): Array<{
  meta: any;
  content: string;
  hash: string;
  startIndex: number;
  endIndex: number;
}>

// ✅ NUEVO: Hash robusto
export function computeHash(content: string): string
```

**Formato:**

```html
<!-- AUTORUN: {"v":2,"mode":"prototypeTokens","components":["Button","Input"],"widgets":["KpiCard"],"deps":["Button"],"hash":"abc123..."} -->
<div class="ubits-button">...</div>
<!-- /AUTORUN -->
```

**Compatibilidad:**
- Watermark v1 (existente) sigue funcionando
- Watermark v2 (nuevo) es para Mode B
- `parseAutorunMarks()` puede detectar ambos

---

### 3. HtmlPrototypeAdapter (Nuevo, No Interfiere)

**Archivo:** `packages/autorun-core/src/adapters/HtmlPrototypeAdapter.ts` (NUEVO)

**Propósito:** Insertar bloques en HTML de forma estable (sin `search_replace` frágil)

**Anchors por defecto:**

```html
<!-- AUTORUN:ANCHOR:CONTENT -->
<!-- Contenido aquí -->
<!-- AUTORUN:ANCHOR:SCRIPTS -->
<!-- Scripts aquí -->
```

**Funciones:**

```typescript
export class HtmlPrototypeAdapter {
  // Inserta bloque de contenido con watermark
  insertContentBlock(filePath: string, htmlBlockWithWatermark: string): Promise<void>
  
  // Inserta bloque de scripts con watermark
  insertScriptBlock(filePath: string, scriptBlockWithWatermark: string): Promise<void>
  
  // Crea anchors si no existen
  ensureAnchors(filePath: string): Promise<void>
}
```

**⚠️ CRÍTICO:** Todo el código insertado viene de Storybook MCP primero. Los widgets tokenizados solo se usan si Storybook MCP indica que falta algo específico.

**Integración:**
- Se usa siempre (Mode B es el único modo)
- Todo el código viene de Storybook MCP primero
- No afecta wizard (wizard crea templates iniciales, no los modifica)

---

### 4. autorun.verify("diff") (Extiende Existente)

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts` (NUEVO)

**Relación con existente:**
- `autorun.verify()` ya existe en MCP server
- `VerifyDiff.ts` agrega modo `"diff"` específico
- No reemplaza verificación existente

**Funciones:**

```typescript
export async function verifyDiff(options: {
  strict?: boolean;
  checkWatermarks?: boolean;
  checkHash?: boolean;
  checkHardcodedColors?: boolean;
  checkContractRules?: boolean;
}): Promise<VerifyDiffOutput>
```

**Reglas Mode B:**

```typescript
// Para cada archivo cambiado en prototypes/:
if (mode === "prototypeTokens") {
  // FALLA si:
  // 1. Hay cambios sin watermark
  // 2. Hash mismatch en bloque
  // 3. Colores hardcodeados (#hex, rgb(), hsl())
  // 4. Implementación de internals
  // 5. Props requeridas faltantes
}
```

**Compatibilidad:**
- Verificación existente sigue funcionando
- `verify("diff")` es opción adicional
- No afecta verificación pre-implementación (add-ons)

---

### 5. ContractStore (Nuevo, Usa Fuente Existente)

**Archivo:** `packages/autorun-core/src/ubits/ContractStore.ts` (NUEVO)

**Fuente de datos:**
- `packages/storybook/stories/_shared/componentIndex.ts` (si existe)
- O `packages/storybook/stories/_shared/ubitsContract.ts` (ya copiado)
- O parsea stories directamente

**Funciones:**

```typescript
export class ContractStore {
  // Obtiene contrato por componentId
  getById(componentId: string): Promise<UBITSContract | null>
  
  // Busca por nombre aproximado
  findByNameLike(name: string): Promise<UBITSContract[]>
  
  // Valida que existe
  validateExists(componentId: string): Promise<boolean>
}
```

**Integración:**
- Solo se usa en Mode B
- Modo `strict` sigue usando Storybook MCP directamente
- No afecta flujo actual

---

### 6. DependencyResolver (Nuevo, Complementa Existente)

**Archivo:** `packages/autorun-core/src/ubits/DependencyResolver.ts` (NUEVO)

**Propósito:** Resolver dependencias UBITS de forma recursiva

**Funciones:**

```typescript
export class DependencyResolver {
  // Expande dependsOn.required recursivo
  expandRequired(componentId: string): Promise<string[]>
  
  // Ubica hijos por slots
  resolveSlots(componentId: string, slotName: string): Promise<string[]>
  
  // Nunca implementa internals
  filterInternals(componentIds: string[]): string[]
  
  // Resuelve grafo completo
  resolveGraph(rootComponentId: string): Promise<{
    root: string;
    publicDeps: string[];
    internals: string[];
    slotPlan: Record<string, string[]>;
  }>
}
```

**⚠️ CRÍTICO:** Todas las dependencias se resuelven desde Storybook MCP primero.

**Integración:**
- Se usa siempre (Mode B es el único modo)
- Siempre consulta Storybook MCP para resolver dependencias recursivamente
- Complementa `analyzeComponentInternals()` existente (ambos consultan Storybook MCP)

---

### 7. ExampleSelector + ExampleParser (Nuevo, Sin Eval)

**Archivos:**
- `packages/autorun-core/src/ubits/ExampleSelector.ts` (NUEVO)
- `packages/autorun-core/src/ubits/ExampleParser.ts` (NUEVO)

**Propósito:** Convertir `contract.examples.*` en código insertable de forma segura

**Funciones:**

```typescript
// ExampleSelector
export class ExampleSelector {
  selectCanonical(contract: UBITSContract): string | null
  selectBasic(contract: UBITSContract): string | null
  selectByIntent(intent: string, contract: UBITSContract): string | null
}

// ExampleParser (SIN eval)
export class ExampleParser {
  // Parsea window.UBITS.X.create({ ... })
  parseCreateCall(code: string): {
    componentName: string;
    props: Record<string, any>;
  }
  
  // Valida props con requiredProps y variants
  validateProps(props: Record<string, any>, contract: UBITSContract): boolean
  
  // Re-emite con formato determinístico
  reemit(props: Record<string, any>, contract: UBITSContract): string
}
```

**Integración:**
- Solo se usa en Mode B cuando hay ejemplos en contratos
- Modo `strict` sigue usando extracción directa de Storybook
- No afecta `extractExactCodeFromStorybookWithBrowser()` existente

---

### 8. PrototypeTokenKit (Nuevo, Solo Fallback)

**Archivo:** `packages/autorun-core/src/fallback/PrototypeTokenKit.ts` (NUEVO)

**Propósito:** Generar widgets tokenizados cuando falta componente UBITS

**Widgets soportados:**

```typescript
export class PrototypeTokenKit {
  generateKpiCard(props: KpiCardProps): string
  generateFiltersRow(props: FiltersRowProps): string
  generateEmptyState(props: EmptyStateProps): string
  generateSectionHeader(props: SectionHeaderProps): string
  generatePanel(props: PanelProps): string
  generateSimpleCard(props: SimpleCardProps): string
  generateTableShell(props: TableShellProps): string  // Si no hay DataTable
}
```

**Reglas CSS (obligatorias):**

```css
/* ✅ CORRECTO */
background: var(--ubits-bg-1, #ffffff);
color: var(--ubits-fg-1-high, #000000);
padding: var(--ubits-spacing-md, 16px);

/* ❌ PROHIBIDO */
background: #ffffff;
color: rgb(0, 0, 0);
padding: 16px;
```

**Integración:**
- Solo se usa cuando `mode === "prototypeTokens"` Y falta componente
- Modo `strict` falla si falta componente (comportamiento actual)
- No afecta generación de código UBITS existente

---

### 9. StorybookMcpClient (Nuevo, Cross-Check)

**Archivo:** `packages/autorun-core/src/storybook/StorybookMcpClient.ts` (NUEVO)

**Propósito:** Cross-check de props entre ContractStore y Storybook MCP

**Funciones:**

```typescript
export class StorybookMcpClient {
  // Cross-check props
  crossCheckProps(
    componentId: string,
    contractProps: Record<string, any>,
    storybookProps: Record<string, any>
  ): { match: boolean; differences: string[] }
  
  // Obtiene props desde Storybook MCP
  getPropsFromStorybook(componentId: string): Promise<Record<string, any>>
}
```

**Integración:**
- Se usa en Mode B para validación adicional
- Modo `strict` sigue usando Storybook MCP directamente (como ahora)
- No reemplaza `extractExactCodeFromStorybookWithBrowser()` existente

---

### 10. Design Intake (Nuevo, Opcional)

**Archivos:**
- `packages/autorun-core/src/design/figma/FigmaIngestor.ts` (NUEVO)
- `packages/autorun-core/src/design/image/ImageIngestor.ts` (NUEVO)
- `packages/autorun-core/src/design/BlueprintFromDesign.ts` (NUEVO)
- `packages/autorun-core/src/design/BlueprintMapper.ts` (NUEVO)

**Propósito:** Convertir diseño (Figma/imagen) → Blueprint → UBITS/Widgets

**Integración:**
- Solo se usa si `design.figma` o `design.image` está presente
- Si no hay `design` → funciona como ahora (solo texto)
- No afecta flujo actual de detección por texto

---

### 11. Integración en autorun.apply() (Extensión Incremental)

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Cambios:**

```typescript
export async function autorunApply(input: AutorunApplyInputExtended): Promise<AutorunApplyOutput> {
  // ✅ DETECCIÓN DE MODO (nuevo)
  const mode = input.options?.mode || "strict";
  const isModeB = mode === "prototypeTokens";
  
  // ✅ FLUJO ACTUAL (se mantiene para modo strict)
  if (mode === "strict") {
    // Flujo existente sin cambios
    return await autorunApplyStrict(input);
  }
  
  // ✅ FLUJO MODE B (nuevo)
  if (isModeB) {
    return await autorunApplyModeB(input);
  }
  
  // ... resto igual
}

// ✅ NUEVO: Flujo Mode B
async function autorunApplyModeB(input: AutorunApplyInputExtended): Promise<AutorunApplyOutput> {
  // 1. Construir Blueprint (si hay design)
  let blueprint;
  if (input.design?.figma) {
    blueprint = await buildBlueprintFromFigma(input.design.figma);
  } else if (input.design?.image) {
    blueprint = await buildBlueprintFromImage(input.design.image);
  } else {
    // Sin design → usar flujo texto (como ahora)
    blueprint = await buildBlueprintFromText(input.message);
  }
  
  // 2. Mapear blueprint a UBITS/Widgets
  const mapping = await mapBlueprintToComponents(blueprint);
  
  // 3. Resolver deps UBITS
  const resolvedDeps = await resolveUBITSDependencies(mapping.ubitsComponents);
  
  // 4. Seleccionar examples
  const examples = await selectExamples(resolvedDeps);
  
  // 5. Generar código UBITS
  const ubitsCode = await generateUBITSCode(examples);
  
  // 6. Generar widgets (fallback)
  const widgetsCode = await generateWidgets(mapping.missingComponents);
  
  // 7. Insertar en HTML con watermark
  await insertIntoHTML(input.targetFiles[0], ubitsCode + widgetsCode);
  
  // 8. Retornar reporte
  return { ... };
}
```

**Compatibilidad:**
- Modo `strict` → flujo actual sin cambios
- Modo `prototypeTokens` → nuevo flujo
- Wizard no se afecta (solo crea templates iniciales)

---

## 🔒 Enforcement: Cómo Garantizar que Funcione

### 1. Reglas de Cursor (Actualización)

**Archivo:** `.cursorrules`

```markdown
## 🚨 PROHIBIDO: write/search_replace en prototypes/

**❌ PROHIBIDO:**
```typescript
await write("prototypes/canvas-*.html", content);
await search_replace("prototypes/canvas-*.html", old, new);
```

**✅ OBLIGATORIO:**
```typescript
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: userMessage,
    targetFiles: ["prototypes/canvas-*.html"],
    options: { mode: "prototypeTokens" }  // Opcional
  }
});
```

**✅ VERIFICACIÓN OBLIGATORIA:**
```typescript
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: {
    targetFiles: "diff",
    options: { strict: true }
  }
});
```
```

### 2. Watermark Enforcement

**Cómo funciona:**
1. `autorun.apply()` SIEMPRE inserta watermark
2. `autorun.verify("diff")` detecta cambios sin watermark
3. Si hay cambios sin watermark → FALLA

**Implementación:**

```typescript
// En autorun.verify("diff")
const changedFiles = await getChangedFiles("prototypes/");
for (const file of changedFiles) {
  const content = await fs.readFile(file, 'utf-8');
  const watermarks = parseWatermarks(content);
  
  // Verificar que TODO el contenido esté dentro de bloques watermark
  const contentWithoutWatermarks = removeWatermarks(content);
  if (contentWithoutWatermarks.trim().length > 0) {
    // ❌ FALLA: Hay contenido fuera de bloques watermark
    errors.push(`Archivo ${file} tiene contenido sin watermark`);
  }
}
```

---

## 🧪 Plan de Implementación Incremental

### Fase 1: Fundación (Sin Romper Nada)

1. ✅ Extender tipos (`AutorunApplyInputExtended`)
2. ✅ Crear `Watermark.ts` (nuevo módulo)
3. ✅ Crear `HtmlPrototypeAdapter.ts` (nuevo módulo)
4. ✅ Crear `VerifyDiff.ts` (nuevo módulo)

**Verificación:** Modo `strict` sigue funcionando igual

---

### Fase 2: Resolución UBITS (Complementa Existente)

5. ✅ Crear `ContractStore.ts`
6. ✅ Crear `DependencyResolver.ts`
7. ✅ Crear `ExampleSelector.ts` + `ExampleParser.ts`

**Verificación:** No afecta flujo actual de Storybook MCP

---

### Fase 3: Fallback (Solo Mode B)

8. ✅ Crear `PrototypeTokenKit.ts`
9. ✅ Crear `TokenPolicyResolver.ts`
10. ✅ Crear `StorybookMcpClient.ts`

**Verificación:** Solo se usa cuando `mode === "prototypeTokens"`

---

### Fase 4: Design Intake (Opcional)

11. ✅ Crear `FigmaIngestor.ts`
12. ✅ Crear `ImageIngestor.ts`
13. ✅ Crear `BlueprintFromDesign.ts` + `BlueprintMapper.ts`

**Verificación:** Solo se usa si `design` está presente

---

### Fase 5: Integración (Extensión)

14. ✅ Extender `autorun.apply()` con detección de modo
15. ✅ Implementar `autorunApplyModeB()`
16. ✅ Actualizar reglas de Cursor

**Verificación:** Modo `strict` funciona igual, Mode B funciona nuevo

---

### Fase 6: Tests (Validación)

17. ✅ Tests para Watermark
18. ✅ Tests para VerifyDiff
19. ✅ Tests para DependencyResolver
20. ✅ Tests para PrototypeTokenKit

---

## 🛡️ Protecciones: Cómo Evitar Romper lo Existente

### 1. Defaults Seguros

```typescript
// ✅ Mode B es el único modo (siempre usa Storybook MCP)
const mode = input.options?.mode || "prototypeTokens"; // Único modo

// ✅ SIEMPRE default a requireStorybookMcp=true (fail-closed, obligatorio)
const requireStorybookMcp = input.options?.requireStorybookMcp ?? true;
```

### 2. Feature Flags

```typescript
// En configuración
const ENABLE_MODE_B = process.env.AUTORUN_ENABLE_MODE_B === 'true';

if (mode === "prototypeTokens" && !ENABLE_MODE_B) {
  throw new Error("Mode B no está habilitado. Usa AUTORUN_ENABLE_MODE_B=true");
}
```

### 3. Validación de Rutas

```typescript
// ✅ SOLO permitir Mode B en prototypes/
if (mode === "prototypeTokens") {
  const isPrototype = targetFile.startsWith("prototypes/");
  if (!isPrototype) {
    throw new Error("Mode B solo está permitido en prototypes/");
  }
}
```

### 4. Wizard Protection

```typescript
// ✅ Wizard NO usa Mode B (solo crea templates iniciales)
// En InitializationWizard.ts - NO se modifica
// Wizard siempre usa modo strict implícito
```

### 5. Add-ons Protection

```typescript
// ✅ Add-ons son agnósticos al modo
// En AddonOrchestrator - NO se modifica
// Add-ons reciben contexto sin saber el modo
```

---

## 📊 Comparación: Antes vs Después

### Antes (Flujo Actual)

```
Usuario: "Implementa un DataTable"
→ autorun.apply() detecta componente
→ Storybook MCP (OBLIGATORIO)
→ Extrae código exacto
→ Escribe con watermark básico
→ Post-procesamiento
```

**Si falta componente:** ❌ FALLA (fail-closed)

---

### Después (Mode B - Flujo Principal Único)

```
Usuario: "Implementa un DataTable"
→ autorun.apply() detecta componente
→ Storybook MCP (SIEMPRE OBLIGATORIO - único flujo)
→ Consulta Storybook MCP para obtener:
   - Props exactas
   - Código exacto
   - Dependencias (dependsOn.required)
   - Tokens usados
   - Ejemplos disponibles
→ Si componente existe en Storybook MCP:
   → Extrae código exacto desde Storybook MCP
→ Si componente NO existe en Storybook MCP:
   → Consulta Storybook MCP para tokens base
   → Genera widget tokenizado usando tokens de Storybook MCP
→ Escribe con watermark mejorado (incluye storybookMcp: true)
→ Post-procesamiento
```

**⚠️ CRÍTICO:** 
- Storybook MCP es SIEMPRE obligatorio (único flujo)
- Los widgets tokenizados solo se usan si Storybook MCP indica que falta algo específico
- Los widgets tokenizados siempre usan tokens de Storybook MCP

---

## ✅ Checklist de Compatibilidad

- [x] Modo `strict` funciona igual que ahora
- [x] Wizard no se modifica
- [x] Add-ons no se modifican
- [x] Flujo actual de Storybook MCP sigue funcionando
- [x] Watermark existente sigue funcionando
- [x] Verificación existente sigue funcionando
- [x] Mode B solo afecta `prototypes/`
- [x] Mode B es opcional (feature flag)

---

## 🎯 Conclusión

**Mode B es el flujo PRINCIPAL y ÚNICO:**

1. ✅ Siempre consulta Storybook MCP primero (obligatorio, fail-closed)
2. ✅ Usa componentes UBITS cuando Storybook MCP los tiene
3. ✅ Genera widgets tokenizados solo cuando Storybook MCP indica que falta algo específico
4. ✅ Los widgets tokenizados siempre usan tokens de Storybook MCP
5. ✅ Solo afecta `prototypes/` (no código fuente)
6. ✅ Wizard y add-ons siguen funcionando igual
7. ✅ Enforcement real con watermark + verify

**⚠️ CRÍTICO:** No hay modo alternativo sin Storybook MCP. Mode B es el único flujo.

**Implementación recomendada:** Por fases, con tests en cada fase.
