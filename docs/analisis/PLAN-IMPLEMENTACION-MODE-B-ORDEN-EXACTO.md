# 📋 Plan de Implementación Mode B - Orden Exacto

**Fecha:** 2025-01-03  
**Versión:** Final con fixes técnicos aplicados

---

## ⚠️ Orden Obligatorio de Implementación

Sigue este orden exacto. Cada paso depende del anterior.

---

## Paso 1 — GlobalTokenRegistry (con Fix A + Fix B)

**Archivo:** `packages/autorun-core/src/tokens/GlobalTokenRegistry.ts` (NUEVO)

**Tareas:**

1. ✅ Crear clase `GlobalTokenRegistry`
2. ✅ Implementar `initialize()` que carga:
   - `vendor/ubits/packages/tokens/dist/tokens.css` (primera opción)
   - `vendor/ubits/packages/tokens/dist/figma-tokens.css` (segunda opción)
   - `vendor/ubits/packages/tokens/tokens.json` (fallback)
3. ✅ Implementar `parseTokensFromCSS()` con regex: `/(--(?:ubits|modifiers)[\w-]+)\s*:/g`
4. ✅ **Fix A:** Implementar `parseTokensFromJSON()` correcto (solo usar key cuando value es leaf)
5. ✅ Implementar `has(tokenName: string): boolean`
6. ✅ Implementar `assertExists(tokenName: string): void` (con sugerencias)
7. ✅ **Fix B:** Implementar `suggest(tokenName: string): string[]` (público)
8. ✅ Implementar `getAll(): string[]`
9. ✅ Crear singleton `getGlobalTokenRegistry()`

**Tests:**

```typescript
// packages/autorun-core/src/tokens/__tests__/GlobalTokenRegistry.test.ts
describe('GlobalTokenRegistry', () => {
  it('debe cargar tokens desde tokens.css', async () => {
    const registry = await getGlobalTokenRegistry();
    expect(registry.has('--ubits-bg-1')).toBe(true);
  });
  
  it('debe parsear JSON correctamente (Fix A)', async () => {
    // Mock JSON con estructura anidada
    const json = {
      light: {
        background: {
          'ubits-bg-1': '#ffffff'
        }
      }
    };
    // Verificar que agrega '--ubits-bg-1' (no '--light-background-ubits-bg-1')
  });
  
  it('debe sugerir tokens similares (Fix B)', async () => {
    const registry = await getGlobalTokenRegistry();
    const suggestions = registry.suggest('--ubits-bg-999');
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
```

---

## Paso 2 — Watermark v2

**Archivo:** `packages/autorun-core/src/verify/Watermark.ts` (NUEVO)

**Tareas:**

1. ✅ Crear `emitWatermark()` con formato v2
2. ✅ Crear `parseWatermarks()` con `startLine` y `endLine` (para verify diff-based)
3. ✅ Crear `computeHash()`
4. ✅ Crear `validateHash()`

**Tests:**

```typescript
// packages/autorun-core/src/verify/__tests__/Watermark.test.ts
describe('Watermark', () => {
  it('debe emitir y parsear watermark con números de línea', () => {
    const { wrappedContent } = emitWatermark({ v: 2, mode: 'prototypeTokens', ... }, 'content');
    const blocks = parseWatermarks(wrappedContent);
    expect(blocks[0].startLine).toBeGreaterThan(0);
    expect(blocks[0].endLine).toBeGreaterThan(blocks[0].startLine);
  });
});
```

---

## Paso 3 — VerifyDiff Robusto (con Fix C/D/E)

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts` (NUEVO)

**Tareas:**

1. ✅ **Fix E:** Implementar `getGitDiffHunks()` correcto:
   - Filtrar `count === 0` (borrados)
   - Soportar multi-hunks por archivo
   - Usar `git diff -U0 -- prototypes/`
2. ✅ Implementar `verifyDiff()` principal
3. ✅ **Fix C:** Implementar `detectHardcodedColors()` con state machine:
   - Recorrer todas las líneas del archivo
   - Mantener `inStyleBlock`
   - Solo analizar líneas modificadas dentro de `<style>` o con `style=""`
4. ✅ **Fix D:** Actualizar safe keywords (sin white/black):
   - `['transparent', 'currentColor', 'inherit', 'initial', 'unset']`
5. ✅ Implementar `validateTokensUsed()` con state machine:
   - Solo validar tokens en líneas modificadas dentro de CSS real
   - Usar `registry.suggest()` (Fix B)
6. ✅ Implementar regla de watermark (diff-based):
   - Verificar que líneas modificadas están dentro de bloques AUTORUN

**Tests:**

```typescript
// packages/autorun-core/src/verify/__tests__/VerifyDiff.test.ts
describe('VerifyDiff', () => {
  it('debe filtrar count=0 (Fix E)', async () => {
    // Mock git diff con hunk +start,0
    // Verificar que no agrega líneas
  });
  
  it('debe detectar colores solo en CSS real (Fix C)', async () => {
    const content = `
      <link href="tokens.css" />
      <style>
        .test { background: #fff; }
      </style>
      <div style="color: rgb(0,0,0);">
    `;
    // Verificar que detecta #fff y rgb() pero NO en <link>
  });
  
  it('debe prohibir white/black en fallbacks (Fix D)', async () => {
    const content = 'background: var(--ubits-bg-1, white);';
    // Verificar que falla
  });
});
```

---

## Paso 4 — Conectar VerifyDiff a autorun.verify

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunVerify.ts`

**Tareas:**

1. ✅ Importar `verifyDiff` desde `../../verify/VerifyDiff`
2. ✅ En `autorunVerify()`, si `input.targetFiles === 'diff'`:
   - Llamar `verifyDiff()` con opciones
   - Retornar resultado formateado
3. ✅ Retornar `valid=false` y errores claros si falla

**Código:**

```typescript
import { verifyDiff } from '../../verify/VerifyDiff';

export async function autorunVerify(
  input: AutorunVerifyInput
): Promise<AutorunVerifyOutput> {
  // ✅ Si targetFiles es "diff", usar VerifyDiff
  if (input.targetFiles === 'diff') {
    const result = await verifyDiff({
      strict: input.options?.strict ?? true,
      checkWatermarks: true,
      checkHash: true,
      checkHardcodedColors: true,
      checkTokens: true
    });

    return {
      valid: result.valid,
      errors: result.errors,
      warnings: result.warnings,
      suggestions: [],
      files: result.files.map(f => ({
        path: f.path,
        hasAutorunMark: f.hasWatermark,
        isValid: f.isValid,
        issues: f.issues
      }))
    };
  }

  // ✅ Flujo existente (se mantiene)
  // ...
}
```

---

## Paso 5 — PrototypeTokenKit (Widgets)

**Archivo:** `packages/autorun-core/src/fallback/PrototypeTokenKit.ts` (NUEVO)

**Tareas:**

1. ✅ Crear clase `PrototypeTokenKit`
2. ✅ Constructor recibe `GlobalTokenRegistry`
3. ✅ Implementar `generateKpiCard()`:
   - Validar tokens con `registry.assertExists()` antes de generar
   - Usar solo tokens reales `--ubits-*`
   - NO usar fallbacks en colores (ideal)
   - Si usa fallback, solo keywords seguras
4. ✅ Implementar `generateFiltersRow()`
5. ✅ Implementar `generateEmptyState()`
6. ✅ Implementar `generateSectionHeader()`
7. ✅ Implementar `generatePanel()`
8. ✅ Implementar `generateSimpleCard()`
9. ✅ Implementar `generateTableShell()`

**Tests:**

```typescript
// packages/autorun-core/src/fallback/__tests__/PrototypeTokenKit.test.ts
describe('PrototypeTokenKit', () => {
  it('nunca debe emitir colores hardcodeados', () => {
    const registry = await getGlobalTokenRegistry();
    const kit = new PrototypeTokenKit(registry);
    const kpiCard = kit.generateKpiCard({ title: 'Test', value: '100' });

    expect(kpiCard).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    expect(kpiCard).not.toMatch(/rgb\s*\(/);
    expect(kpiCard).toMatch(/var\s*\(--ubits-/);
  });
});
```

---

## Paso 6 — HtmlPrototypeAdapter + Anchors

**Archivo:** `packages/autorun-core/src/adapters/HtmlPrototypeAdapter.ts` (NUEVO)

**Tareas:**

1. ✅ Crear clase `HtmlPrototypeAdapter`
2. ✅ Implementar `ensureAnchors(filePath)`:
   - Buscar `<!-- AUTORUN:ANCHOR:CONTENT -->`
   - Buscar `<!-- AUTORUN:ANCHOR:SCRIPTS -->`
   - Si no existen, insertarlas:
     - CONTENT dentro de `<main>` o antes de `</body>`
     - SCRIPTS antes de `</body>`
3. ✅ Implementar `insertContentBlock(filePath, htmlBlockWithWatermark)`:
   - Buscar anchor CONTENT
   - Insertar después del anchor
4. ✅ Implementar `insertScriptBlock(filePath, scriptBlockWithWatermark)`:
   - Buscar anchor SCRIPTS
   - Insertar después del anchor

**Tests:**

```typescript
// packages/autorun-core/src/adapters/__tests__/HtmlPrototypeAdapter.test.ts
describe('HtmlPrototypeAdapter', () => {
  it('debe crear anchors si no existen', async () => {
    const adapter = new HtmlPrototypeAdapter();
    const testFile = 'test-prototype.html';
    const html = '<html><body></body></html>';
    
    await fs.writeFile(testFile, html, 'utf-8');
    await adapter.ensureAnchors(testFile);
    
    const content = await fs.readFile(testFile, 'utf-8');
    expect(content).toContain('AUTORUN:ANCHOR:CONTENT');
    expect(content).toContain('AUTORUN:ANCHOR:SCRIPTS');
  });
});
```

---

## Paso 7 — autorun.apply: Modo Automático + Mode B

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Tareas:**

1. ✅ Importar módulos necesarios:
   - `getGlobalTokenRegistry`
   - `PrototypeTokenKit`
   - `HtmlPrototypeAdapter`
   - `emitWatermark`
   - `ContractStore`
   - `DependencyResolver`
   - `CompositionPlanner` (nuevo)
2. ✅ **MANTENER** `autorunApplyStrict()` intacto (sin cambios)
3. ✅ En `autorunApply()`:
   - Detectar modo automático: `targetFile.startsWith("prototypes/") ? "prototypeTokens" : "strict"`
   - Si `mode === "strict"` → llamar `autorunApplyStrict()`
   - Si `mode === "prototypeTokens"` → llamar `autorunApplyModeB()`
4. ✅ Implementar `autorunApplyModeB()`:
   - Consultar Storybook MCP (solo para existencia/props cross-check)
   - Resolver dependencias desde contratos (NO desde Storybook MCP)
   - Cargar GlobalTokenRegistry
   - Si componente existe → generar código UBITS
   - Si componente NO existe → usar PrototypeTokenKit
   - Planificar composición con CompositionPlanner (profundidad)
   - Insertar con HtmlPrototypeAdapter + watermark v2
   - Recomendar `autorun.verify("diff")`

**Código:**

```typescript
export async function autorunApply(
  input: AutorunApplyInputExtended
): Promise<AutorunApplyOutput> {
  // ✅ Detección automática de modo (MANTENER strict)
  const targetFile = input.targetFiles?.[0] || await detectTargetFile(...);
  const mode = input.options?.mode || 
    (targetFile.startsWith("prototypes/") ? "prototypeTokens" : "strict");
  
  // ✅ Flujo según modo
  if (mode === "strict") {
    return await autorunApplyStrict(input); // ✅ Flujo actual sin cambios
  } else {
    return await autorunApplyModeB(input); // ✅ Nuevo flujo
  }
}

// ✅ MANTENER función existente (sin cambios)
async function autorunApplyStrict(
  input: AutorunApplyInputExtended
): Promise<AutorunApplyOutput> {
  // Flujo actual sin cambios
  // ...
}

// ✅ NUEVO: Flujo Mode B
async function autorunApplyModeB(
  input: AutorunApplyInputExtended
): Promise<AutorunApplyOutput> {
  // 1. Consultar Storybook MCP (solo para props/existencia)
  // 2. Resolver dependencias desde contratos
  // 3. Cargar GlobalTokenRegistry
  // 4. Planificar composición con CompositionPlanner
  // 5. Generar código UBITS o widgets tokenizados
  // 6. Insertar con HtmlPrototypeAdapter + watermark v2
  // 7. Recomendar verify("diff")
}
```

---

## Paso 8 — Enforcement REAL (Elige mínimo 1)

### Opción A: Auto-Reload Add-on

**Archivo:** `packages/addons/functional/auto-reload/src/AutoReloadAddon.ts`

**Tareas:**

1. ✅ **Ajuste 2:** Llamar MCP tool `autorun.verify("diff")` en vez de importar directamente (evita circular deps)
2. ✅ En `onFileChange()`:
   - Si `filePath.startsWith("prototypes/")`:
     - Llamar MCP tool `autorun.verify({ targetFiles: "diff" })`
     - Si falla → mostrar error y NO recargar (fail-closed)
     - Si pasa → recargar normalmente

**Código:**

```typescript
export class AutoReloadAddon implements IFunctionalAddon {
  async onFileChange(filePath: string): Promise<void> {
    if (filePath.startsWith('prototypes/')) {
      // ✅ Ajuste 2: Llamar MCP tool (evita circular deps)
      try {
        const verification = await this.callAutorunMcpTool({
          toolName: 'autorun.verify',
          arguments: {
            targetFiles: 'diff',
            options: {
              strict: true,
              checkWatermarks: true,
              checkHash: true,
              checkHardcodedColors: true,
              checkTokens: true
            }
          }
        });

        if (!verification.valid) {
          console.error('❌ [Auto-Reload] Violación de Autorun:');
          verification.errors.forEach(error => console.error(`   - ${error}`));
          return; // NO recargar (fail-closed)
        }
      } catch (error) {
        console.error('❌ [Auto-Reload] Error verificando:', error);
        return; // Fail-closed: NO recargar si no se puede verificar
      }
    }

    await this.reload();
  }

  /**
   * ✅ Helper para llamar MCP tool de Autorun
   */
  private async callAutorunMcpTool(params: {
    toolName: string;
    arguments: any;
  }): Promise<any> {
    // Implementación depende de cómo se llame al MCP server
    // Ejemplo con MCP SDK o fetch:
    const response = await fetch('http://localhost:3000/mcp/autorun', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: params.toolName,
        arguments: params.arguments
      })
    });
    
    return await response.json();
  }
}
```

### Opción B: Husky Pre-Commit + CI

**Archivo:** `.husky/pre-commit` (NUEVO)

**Tareas:**

1. ✅ Crear script `npm run prototypes:verify`
2. ✅ Crear `.husky/pre-commit` que ejecuta el script
3. ✅ Si falla → bloquear commit

**Opción A (Recomendada): CLI Interna**

**Archivo:** `packages/autorun-core/src/cli/autorun-verify.ts` (NUEVO)

```typescript
#!/usr/bin/env node
import { verifyDiff } from '../verify/VerifyDiff';

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] === 'diff' ? 'diff' : 'full';
  
  if (mode === 'diff') {
    const result = await verifyDiff({
      checkWatermarks: true,
      checkHash: true,
      checkHardcodedColors: true,
      checkTokens: true
    });
    
    if (!result.valid) {
      console.error('❌ Verificación de prototypes falló:');
      result.errors.forEach(error => console.error(`   - ${error}`));
      process.exit(1);
    }
    
    console.log('✅ Verificación de prototypes pasó');
    process.exit(0);
  }
  
  // ... otros modos ...
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
```

**package.json:**
```json
{
  "scripts": {
    "prototypes:verify": "tsx packages/autorun-core/src/cli/autorun-verify.ts diff"
  },
  "devDependencies": {
    "tsx": "^4.0.0"
  }
}
```

**Opción B: Usar tsx directamente**

**Archivo:** `packages/autorun-core/src/verify/verifyDiffRunner.ts` (NUEVO)

```typescript
import { verifyDiff } from './VerifyDiff';

(async () => {
  const result = await verifyDiff({
    checkWatermarks: true,
    checkHash: true,
    checkHardcodedColors: true,
    checkTokens: true
  });

  if (!result.valid) {
    console.error('❌ Verificación de prototypes falló:');
    result.errors.forEach(error => console.error(`   - ${error}`));
    process.exit(1);
  }

  console.log('✅ Verificación de prototypes pasó');
})();
```

**package.json:**
```json
{
  "scripts": {
    "prototypes:verify": "tsx packages/autorun-core/src/verify/verifyDiffRunner.ts"
  }
}
```

**Archivo:** `.husky/pre-commit`

```bash
#!/bin/sh
npm run prototypes:verify
```

**CI:** `.github/workflows/verify-prototypes.yml` (NUEVO)

```yaml
name: Verify Prototypes

on:
  pull_request:
    paths:
      - 'prototypes/**'

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run prototypes:verify
```

---

## Paso 9 — CompositionPlanner (Profundidad Real)

**Archivo:** `packages/autorun-core/src/ubits/CompositionPlanner.ts` (NUEVO)

**Tareas:**

1. ✅ Crear clase `CompositionPlanner`
2. ✅ Implementar `planComposition()`:
   - Input: `rootComponentId`, `intent`, `maxDepth`
   - Usa `contract.slots` para saber qué puede ir en cada slot
   - Usa `dependsOn.required` recursivo
   - Usa `internals` para NO implementar lo interno
   - Output: `CompositionPlan` con árbol de slots y deps
3. ✅ Integrar en `autorunApplyModeB()`:
   - Planificar composición antes de generar código
   - Implementar siguiendo el plan

**Código:**

```typescript
export class CompositionPlanner {
  async planComposition(
    rootComponentId: string,
    intent: string,
    maxDepth: number = 3
  ): Promise<CompositionPlan> {
    const contract = await this.contractStore.getById(rootComponentId);
    const graph = await this.dependencyResolver.resolveGraph(rootComponentId);
    
    const slots: Record<string, Array<{
      componentId: string;
      props: any;
      children?: CompositionPlan;
    }>> = {};

    if (contract.slots) {
      for (const [slotName, slotComponents] of Object.entries(contract.slots)) {
        slots[slotName] = [];
        
        for (const slotComponentId of slotComponents) {
          let children: CompositionPlan | undefined;
          if (maxDepth > 0) {
            try {
              children = await this.planComposition(slotComponentId, intent, maxDepth - 1);
            } catch {
              // Continuar sin hijos
            }
          }
          
          slots[slotName].push({
            componentId: slotComponentId,
            props: {},
            children
          });
        }
      }
    }

    return {
      root: rootComponentId,
      slots,
      deps: graph.publicDeps
    };
  }
}
```

---

## ✅ Checklist Final de Implementación

### Fase 1: Fundación
- [x] Paso 1: GlobalTokenRegistry (con Fix A + Fix B)
- [x] Paso 2: Watermark v2
- [x] Paso 3: VerifyDiff robusto (con Fix C/D/E)

### Fase 2: Integración
- [x] Paso 4: Conectar VerifyDiff a autorun.verify
- [x] Paso 5: PrototypeTokenKit
- [x] Paso 6: HtmlPrototypeAdapter

### Fase 3: Flujo Completo
- [x] Paso 7: autorun.apply con modo automático + Mode B
- [x] Paso 8: Enforcement REAL (Auto-Reload o Husky)
- [x] Paso 9: CompositionPlanner (profundidad real)

---

## 🎯 Conclusión

**Orden exacto de implementación:**

1. ✅ GlobalTokenRegistry (base de todo)
2. ✅ Watermark v2 (enforcement)
3. ✅ VerifyDiff robusto (validación)
4. ✅ Integración en autorun.verify
5. ✅ PrototypeTokenKit (widgets)
6. ✅ HtmlPrototypeAdapter (inserción)
7. ✅ autorun.apply Mode B (flujo completo)
8. ✅ Enforcement REAL (bloqueo automático)
9. ✅ CompositionPlanner (profundidad)

**Con estos fixes, Mode B queda robusto "de verdad" y bloquea incluso si el agente se salta autorun.**
