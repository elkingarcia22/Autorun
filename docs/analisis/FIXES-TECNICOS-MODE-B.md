# 🔧 Fixes Técnicos Críticos para Mode B

**Fecha:** 2025-01-03  
**Propósito:** Corregir 5 bugs técnicos identificados + mejorar enforcement

---

## ❌ Fix A: parseTokensFromJSON() está mal (BUG)

### Problema:
El flatten arma `light-background-ubits-bg-1` y ya no empieza con `ubits-`, entonces no lo agrega.

### ✅ Solución Correcta:

```typescript
/**
 * ✅ CORRECTO: Solo usar key cuando el value es leaf
 */
private parseTokensFromJSON(json: any): void {
  const walk = (obj: any): void => {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object') {
        // Es objeto anidado, seguir recorriendo
        walk(value);
      } else {
        // Es leaf (valor final), verificar si key empieza con ubits- o modifiers-
        if (key.startsWith('ubits-') || key.startsWith('modifiers-')) {
          this.tokens.add(`--${key}`);
        }
      }
    }
  };
  walk(json);
}
```

**Ejemplo:**
```json
{
  "light": {
    "background": {
      "ubits-bg-1": "#ffffff"  // ✅ key="ubits-bg-1" → agrega "--ubits-bg-1"
    }
  }
}
```

---

## ❌ Fix B: findSimilarTokens() no es accesible (BUG)

### Problema:
En `validateTokensUsed()` llamas `registry.findSimilarTokens?.(...)` pero lo definiste `private`.

### ✅ Solución Correcta:

```typescript
// ✅ En GlobalTokenRegistry.ts
export class GlobalTokenRegistry {
  // ... código existente ...

  /**
   * ✅ PÚBLICO: Sugiere tokens similares
   */
  public suggest(tokenName: string): string[] {
    return this.findSimilarTokens(tokenName);
  }

  /**
   * ✅ PRIVADO: Implementación interna
   */
  private findSimilarTokens(tokenName: string): string[] {
    // ... implementación existente ...
  }
}

// ✅ En VerifyDiff.ts
function validateTokensUsed(
  content: string,
  registry: Awaited<ReturnType<typeof getGlobalTokenRegistry>>
): string[] {
  const issues: string[] = [];
  const cssContent = extractRealCSS(content);
  
  const varRegex = /var\s*\(\s*(--(?:ubits|modifiers)[\w-]+)/g;
  let match;
  
  while ((match = varRegex.exec(cssContent)) !== null) {
    const tokenName = match[1];
    
    if (!registry.has(tokenName)) {
      // ✅ Usar método público suggest()
      const suggestions = registry.suggest(tokenName);
      const suggestionText = suggestions.length > 0
        ? ` ¿Quizás quisiste: ${suggestions.slice(0, 3).join(', ')}?`
        : '';
      
      issues.push(`Token no encontrado: ${tokenName}.${suggestionText}`);
    }
  }
  
  return issues;
}
```

---

## ❌ Fix C: verifyDiff pierde contexto con extractModifiedLines() (BUG)

### Problema:
`extractModifiedLines()` rompe la detección de `<style>...</style>` porque las líneas modificadas NO incluyen los tags de apertura/cierre.

### ✅ Solución Correcta (State Machine):

```typescript
/**
 * ✅ CORRECTO: Usar archivo completo con state machine
 */
function detectHardcodedColors(
  content: string,
  modifiedLines: Set<number>
): string[] {
  const colors: string[] = [];
  const lines = content.split('\n');
  
  // ✅ State machine para <style> blocks
  let inStyleBlock = false;
  let styleBlockStart = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1; // 1-indexed
    const line = lines[i];
    
    // Detectar inicio de <style>
    if (/<style[^>]*>/i.test(line)) {
      inStyleBlock = true;
      styleBlockStart = lineNum;
    }
    
    // Detectar fin de </style>
    if (/<\/style>/i.test(line)) {
      inStyleBlock = false;
    }
    
    // ✅ Solo analizar si:
    // 1. La línea está modificada Y
    // 2. Está dentro de <style> O contiene style="..."
    const isModified = modifiedLines.has(lineNum);
    const hasInlineStyle = /style\s*=\s*["']/.test(line);
    
    if (isModified && (inStyleBlock || hasInlineStyle)) {
      // Analizar esta línea específica
      const lineColors = detectHardcodedColorsInLine(line);
      if (lineColors.length > 0) {
        colors.push(...lineColors.map(c => `Línea ${lineNum}: ${c}`));
      }
    }
  }
  
  return colors;
}

/**
 * ✅ Detecta colores hardcodeados en una línea específica
 */
function detectHardcodedColorsInLine(line: string): string[] {
  const colors: string[] = [];
  
  // ✅ Patrones prohibidos
  const prohibitedPatterns = [
    { regex: /#[0-9a-fA-F]{3,8}/g, name: 'hex' },
    { regex: /\brgb\s*\(/gi, name: 'rgb' },
    { regex: /\brgba\s*\(/gi, name: 'rgba' },
    { regex: /\bhsl\s*\(/gi, name: 'hsl' },
    { regex: /\bhsla\s*\(/gi, name: 'hsla' }
  ];
  
  for (const pattern of prohibitedPatterns) {
    const matches = line.match(pattern.regex);
    if (matches) {
      for (const match of matches) {
        // ✅ Verificar que NO esté dentro de var() con fallback seguro
        const matchIndex = line.indexOf(match);
        const beforeMatch = line.substring(0, matchIndex);
        const lastVar = beforeMatch.lastIndexOf('var(');
        const lastClose = beforeMatch.lastIndexOf(')');
        
        // Si está dentro de var(), verificar fallback
        if (lastVar > lastClose) {
          const varContent = line.substring(lastVar);
          const varMatch = varContent.match(/var\s*\(\s*--[\w-]+,\s*([^)]+)\s*\)/);
          
          if (varMatch) {
            const fallback = varMatch[1].trim();
            const safeKeywords = ['transparent', 'currentColor', 'inherit', 'initial', 'unset'];
            
            // Si el fallback es seguro, permitir
            if (safeKeywords.includes(fallback)) {
              continue;
            }
            
            // Si el fallback contiene hex/rgb/hsl, es error
            if (/^#[0-9a-fA-F]{3,8}$/.test(fallback) ||
                /^rgb\s*\(/.test(fallback) ||
                /^rgba\s*\(/.test(fallback) ||
                /^hsl\s*\(/.test(fallback) ||
                /^hsla\s*\(/.test(fallback)) {
              colors.push(`Fallback prohibido en var(): ${fallback}`);
            }
          }
        } else {
          // No está dentro de var(), es hardcoded directo
          colors.push(`${pattern.name}: ${match}`);
        }
      }
    }
  }
  
  return colors;
}
```

---

## ❌ Fix D: Quitar white/black de safe keywords

### Problema:
Si permites `white`/`black`, el agente puede meter colores "hardcoded" sin hex/rgb/hsl.

### ✅ Solución Correcta:

```typescript
// ✅ CORRECTO: Solo no-colores
const safeKeywords = ['transparent', 'currentColor', 'inherit', 'initial', 'unset'];

// ❌ INCORRECTO (antes):
// const safeKeywords = ['transparent', 'currentColor', 'inherit', 'initial', 'white', 'black'];
```

**Razón:** `white` y `black` son colores reales, no keywords seguras. Si el agente quiere usar un color, debe usar un token `--ubits-*`.

---

## ❌ Fix E: getGitDiffHunks() filtrar count=0 y soportar multi-hunks

### Problema:
Con `-U0` puedes tener hunks con `+start,0` (borrados). Si `count === 0`, no agregues líneas.

### ✅ Solución Correcta:

```typescript
/**
 * ✅ CORRECTO: Filtrar count=0 y soportar multi-hunks por archivo
 */
async function getGitDiffHunks(): Promise<Array<{
  file: string;
  lines: number[];
}>> {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['diff', '-U0', '--', 'prototypes/']);
    let output = '';

    git.stdout.on('data', (data) => {
      output += data.toString();
    });

    git.on('close', (code) => {
      if (code !== 0 && code !== 1) {
        reject(new Error(`git diff failed with code ${code}`));
        return;
      }

      const hunks: Array<{ file: string; lines: number[] }> = [];
      const hunksByFile: Map<string, number[]> = new Map();
      
      let currentFile = '';

      for (const line of output.split('\n')) {
        // Detectar archivo (+++ b/prototypes/file.html)
        if (line.startsWith('+++')) {
          currentFile = line.substring(4).trim().replace(/^b\//, '');
          if (!hunksByFile.has(currentFile)) {
            hunksByFile.set(currentFile, []);
          }
        }

        // Detectar rango de líneas (@@ -start,count +start,count @@)
        const hunkMatch = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
        if (hunkMatch && currentFile) {
          const startLine = parseInt(hunkMatch[2]);
          const count = parseInt(hunkMatch[3] || '0'); // ✅ Default 0 si no hay count
          
          // ✅ Fix E: Si count === 0, no agregar líneas (son borrados)
          if (count > 0) {
            const fileLines = hunksByFile.get(currentFile) || [];
            
            // ✅ Generar array de líneas modificadas
            for (let i = 0; i < count; i++) {
              fileLines.push(startLine + i);
            }
            
            hunksByFile.set(currentFile, fileLines);
          }
        }
      }

      // ✅ Convertir Map a Array (soporta multi-hunks por archivo)
      for (const [file, lines] of hunksByFile.entries()) {
        if (lines.length > 0) {
          hunks.push({ file, lines: [...new Set(lines)].sort((a, b) => a - b) });
        }
      }

      resolve(hunks.filter(h => h.file.startsWith('prototypes/')));
    });
  });
}
```

---

## ✅ VerifyDiff Robusto (Versión Final)

### Regla Watermark (diff-based):

```typescript
// ✅ Para cada lineNum modificada en prototypes/, debe estar dentro de un bloque AUTORUN
for (const lineNum of modifiedLines) {
  const isInWatermark = watermarks.some(block => 
    lineNum >= block.startLine && lineNum <= block.endLine
  );

  if (!isInWatermark) {
    issues.push(`Línea ${lineNum}: Modificación fuera de bloques AUTORUN`);
    isValid = false;
  }
}
```

### Regla de Colores (diff-based + context-aware):

```typescript
// ✅ Solo revisar líneas modificadas que estén:
// - dentro de <style> (state machine), o
// - contengan style="..." o style='...'

function detectHardcodedColors(
  content: string,
  modifiedLines: Set<number>
): string[] {
  // ✅ Usar state machine (ver Fix C)
  // ...
}
```

### Regla de Tokens:

```typescript
// ✅ En esas mismas líneas, cualquier var(--ubits-*|--modifiers-*) debe existir en GlobalTokenRegistry

function validateTokensUsed(
  content: string,
  modifiedLines: Set<number>,
  registry: GlobalTokenRegistry
): string[] {
  const issues: string[] = [];
  const lines = content.split('\n');
  
  let inStyleBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    
    // State machine para <style>
    if (/<style[^>]*>/i.test(line)) {
      inStyleBlock = true;
    }
    if (/<\/style>/i.test(line)) {
      inStyleBlock = false;
    }
    
    const isModified = modifiedLines.has(lineNum);
    const hasInlineStyle = /style\s*=\s*["']/.test(line);
    
    // ✅ Solo validar tokens en líneas modificadas dentro de CSS real
    if (isModified && (inStyleBlock || hasInlineStyle)) {
      const varRegex = /var\s*\(\s*(--(?:ubits|modifiers)[\w-]+)/g;
      let match;
      
      while ((match = varRegex.exec(line)) !== null) {
        const tokenName = match[1];
        
        if (!registry.has(tokenName)) {
          const suggestions = registry.suggest(tokenName);
          const suggestionText = suggestions.length > 0
            ? ` ¿Quizás quisiste: ${suggestions.slice(0, 3).join(', ')}?`
            : '';
          
          issues.push(`Línea ${lineNum}: Token no encontrado: ${tokenName}.${suggestionText}`);
        }
      }
    }
  }
  
  return issues;
}
```

---

## 🔒 Enforcement REAL (Aunque el agente se salte autorun)

### Enforcement 1: Auto-Reload Add-on

**Archivo:** `packages/addons/functional/auto-reload/src/AutoReloadAddon.ts`

**Integración:**

```typescript
import { verifyDiff } from '@autorun/core/verify/VerifyDiff';

export class AutoReloadAddon implements IFunctionalAddon {
  // ... código existente ...

  /**
   * ✅ NUEVO: Verificar antes de recargar
   */
  async onFileChange(filePath: string): Promise<void> {
    // Si es prototype, verificar antes de recargar
    if (filePath.startsWith('prototypes/')) {
      const verification = await verifyDiff({
        checkWatermarks: true,
        checkHardcodedColors: true,
        checkTokens: true
      });

      if (!verification.valid) {
        // ✅ Mostrar error claro y NO recargar
        console.error('❌ [Auto-Reload] Violación de Autorun detectada:');
        verification.errors.forEach(error => {
          console.error(`   - ${error}`);
        });
        
        // Opción 1: NO recargar
        return;
        
        // Opción 2: Recargar con overlay de error
        // await this.showErrorOverlay(verification.errors);
        // await this.reload();
      }
    }

    // Si pasa verificación, recargar normalmente
    await this.reload();
  }
}
```

### Enforcement 2: Husky Pre-Commit + CI

**Archivo:** `.husky/pre-commit` (NUEVO)

```bash
#!/bin/sh
# Verificar prototypes/ antes de commit

echo "🔍 Verificando prototypes/..."

npm run prototypes:verify

if [ $? -ne 0 ]; then
  echo "❌ Verificación falló. No se puede hacer commit."
  exit 1
fi
```

**Script:** `package.json`

```json
{
  "scripts": {
    "prototypes:verify": "node -e \"require('./packages/autorun-core/dist/verify/verifyDiff.js').verifyDiff().then(r => { if (!r.valid) { console.error('Errores:', r.errors); process.exit(1); } })\""
  }
}
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

## 📋 CompositionPlanner (Profundidad Real)

### Paso: Crear CompositionPlanner.ts

**Archivo:** `packages/autorun-core/src/ubits/CompositionPlanner.ts` (NUEVO)

```typescript
import { ContractStore } from './ContractStore';
import { DependencyResolver } from './DependencyResolver';

export interface CompositionPlan {
  root: string;
  slots: Record<string, Array<{
    componentId: string;
    props: any;
    children?: CompositionPlan;
  }>>;
  deps: string[];
}

export class CompositionPlanner {
  private contractStore: ContractStore;
  private dependencyResolver: DependencyResolver;

  constructor(contractStore: ContractStore, dependencyResolver: DependencyResolver) {
    this.contractStore = contractStore;
    this.dependencyResolver = dependencyResolver;
  }

  /**
   * ✅ Planifica composición completa con profundidad
   */
  async planComposition(
    rootComponentId: string,
    intent: string,
    maxDepth: number = 3
  ): Promise<CompositionPlan> {
    const contract = await this.contractStore.getById(rootComponentId);
    if (!contract) {
      throw new Error(`Contrato no encontrado para ${rootComponentId}`);
    }

    // ✅ Resolver dependencias requeridas
    const graph = await this.dependencyResolver.resolveGraph(rootComponentId);
    
    // ✅ Planificar slots
    const slots: Record<string, Array<{
      componentId: string;
      props: any;
      children?: CompositionPlan;
    }>> = {};

    if (contract.slots) {
      for (const [slotName, slotComponents] of Object.entries(contract.slots)) {
        slots[slotName] = [];
        
        for (const slotComponentId of slotComponents) {
          // ✅ Planificar hijos recursivamente (si no excede maxDepth)
          let children: CompositionPlan | undefined;
          if (maxDepth > 0) {
            try {
              children = await this.planComposition(slotComponentId, intent, maxDepth - 1);
            } catch {
              // Si falla, continuar sin hijos
            }
          }
          
          slots[slotName].push({
            componentId: slotComponentId,
            props: {}, // Props se obtienen desde Storybook MCP después
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

## ✅ Checklist de Fixes Aplicados

- [x] Fix A: parseTokensFromJSON() corregido (solo usar key cuando value es leaf)
- [x] Fix B: findSimilarTokens() hecho público como suggest()
- [x] Fix C: verifyDiff con state machine para <style> blocks
- [x] Fix D: white/black removidos de safe keywords
- [x] Fix E: getGitDiffHunks() filtra count=0 y soporta multi-hunks
- [x] VerifyDiff robusto con reglas exactas
- [x] Enforcement REAL (Auto-Reload add-on o Husky pre-commit)
- [x] CompositionPlanner para profundidad real

---

## 🎯 Conclusión

Con estos fixes, Mode B queda robusto "de verdad":

1. ✅ GlobalTokenRegistry funciona correctamente (Fix A)
2. ✅ VerifyDiff no tiene falsos positivos (Fix C)
3. ✅ Enforcement real bloquea aunque el agente se salte autorun (Enforcement 1/2)
4. ✅ Profundidad real con CompositionPlanner
5. ✅ Política de fallbacks correcta (sin white/black)
