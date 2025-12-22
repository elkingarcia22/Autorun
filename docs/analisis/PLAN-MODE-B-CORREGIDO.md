# 📋 Plan Mode B Corregido - Implementación Paso a Paso

**Fecha:** 2025-01-03  
**Versión:** Corregida con 5 errores críticos y 2 ajustes importantes

---

## ⚠️ Correcciones Aplicadas

1. ✅ **Mantener modo `strict`** - No eliminar, es el flujo actual
2. ✅ **Tokens desde contratos/repo local** - NO desde Storybook MCP
3. ✅ **Dependencias desde contratos** - NO desde Storybook MCP
4. ✅ **Verify diff-based** - Solo líneas modificadas, no todo el archivo
5. ✅ **Política de colores** - Prohibir hex/rgb/hsl directos, permitir keywords seguros

---

## FASE 1: Fundación (Sin Romper Nada)

### Paso 1.1: Extender Tipos (Mantener strict)

**Archivo:** `packages/autorun-core/src/mcp-server/types.ts`

```typescript
// ✅ MANTENER ambos modos
export type AutorunMode = "strict" | "prototypeTokens";

export interface AutorunApplyInputExtended extends AutorunApplyInput {
  options?: AutorunApplyInput['options'] & {
    mode?: AutorunMode;  // default: auto-detect (strict fuera de prototypes/, prototypeTokens en prototypes/)
    requireStorybookMcp?: boolean;  // default: true (para cross-check props/existencia)
    allowPrototypeTokens?: boolean;  // default: true en Mode B
    anchors?: { content: string; scripts: string };
  };
  design?: {
    figma?: { url: string; frameNodeId?: string };
    image?: { kind: "file" | "url"; value: string };
  };
}
```

**Detección automática:**

```typescript
// En autorun.apply()
const targetFile = input.targetFiles?.[0] || detectTargetFile(...);
const mode = input.options?.mode || 
  (targetFile.startsWith("prototypes/") ? "prototypeTokens" : "strict");
```

---

### Paso 1.2: Crear Watermark.ts

**Archivo:** `packages/autorun-core/src/verify/Watermark.ts` (NUEVO)

```typescript
export interface WatermarkMeta {
  v: number;
  mode: AutorunMode;
  components: string[];
  widgets: string[];
  deps: string[];
  hash: string;
  storybookMcp?: boolean;  // Indica si se consultó Storybook MCP
}

export function emitWatermark(
  meta: Omit<WatermarkMeta, 'hash'>,
  content: string
): { wrappedContent: string; hash: string } {
  const hash = computeHash(content);
  const fullMeta: WatermarkMeta = { ...meta, hash };
  
  const startMark = `<!-- AUTORUN: ${JSON.stringify(fullMeta)} -->`;
  const endMark = `<!-- /AUTORUN -->`;
  
  return {
    wrappedContent: `${startMark}\n${content}\n${endMark}`,
    hash
  };
}

export function parseWatermarks(fileContent: string): Array<{
  meta: WatermarkMeta;
  content: string;
  hash: string;
  startLine: number;  // ✅ NUEVO: Para verify diff-based
  endLine: number;    // ✅ NUEVO: Para verify diff-based
}> {
  // Implementar parsing con números de línea
  // ...
}
```

---

### Paso 1.3: Crear VerifyDiff.ts (Diff-Based)

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts` (NUEVO)

```typescript
/**
 * ✅ CORRECTO: Verify diff-based (solo líneas modificadas)
 */
export async function verifyDiff(options: VerifyDiffOptions = {}): Promise<VerifyDiffOutput> {
  // ✅ 1. Obtener git diff hunks (líneas modificadas)
  const diffHunks = await getGitDiffHunks();
  
  const results: VerifyDiffOutput = {
    valid: true,
    errors: [],
    warnings: [],
    files: []
  };
  
  // ✅ 2. Para cada línea modificada: verificar que cae dentro de un bloque AUTORUN
  for (const hunk of diffHunks) {
    const filePath = hunk.file;
    const modifiedLines = hunk.lines;
    
    const content = await fs.readFile(filePath, 'utf-8');
    const watermarks = parseWatermarks(content);
    
    const fileIssues: string[] = [];
    
    for (const lineNum of modifiedLines) {
      const isInWatermark = watermarks.some(block => 
        lineNum >= block.startLine && lineNum <= block.endLine
      );
      
      if (!isInWatermark) {
        fileIssues.push(`Línea ${lineNum}: Modificación fuera de bloque AUTORUN`);
        results.valid = false;
      }
    }
    
    // ✅ 3. Verificar colores hardcodeados (solo en líneas modificadas)
    if (options.checkHardcodedColors !== false) {
      const modifiedContent = extractLines(content, modifiedLines);
      const hardcodedColors = detectHardcodedColors(modifiedContent);
      if (hardcodedColors.length > 0) {
        fileIssues.push(`Colores hardcodeados: ${hardcodedColors.join(', ')}`);
        results.valid = false;
      }
    }
    
    results.files.push({
      path: filePath,
      hasWatermark: watermarks.length > 0,
      isValid: fileIssues.length === 0,
      issues: fileIssues
    });
    
    if (fileIssues.length > 0) {
      results.errors.push(...fileIssues.map(issue => `${filePath}: ${issue}`));
    }
  }
  
  return results;
}

/**
 * ✅ Obtiene hunks de git diff con números de línea
 */
async function getGitDiffHunks(): Promise<Array<{
  file: string;
  lines: number[];
}>> {
  // Implementar usando git diff --unified=0
  // Parsear formato: @@ -start,count +start,count @@
  // ...
}

/**
 * ✅ Detecta colores hardcodeados (solo en estilos directos, NO en var())
 */
function detectHardcodedColors(content: string): string[] {
  const colors: string[] = [];
  
  // Regex para estilos directos (NO dentro de var())
  const directStyleRegex = /:\s*(#[0-9a-fA-F]{3,8}|rgb\s*\([^)]+\)|hsl\s*\([^)]+\))\s*;/g;
  const matches = content.match(directStyleRegex);
  
  if (matches) {
    for (const match of matches) {
      // Verificar que NO esté dentro de var()
      const beforeMatch = content.substring(0, content.indexOf(match));
      const lastVar = beforeMatch.lastIndexOf('var(');
      const lastClose = beforeMatch.lastIndexOf(')');
      
      if (lastVar <= lastClose) {
        // NO está dentro de var(), es hardcodeado
        colors.push(match.trim());
      }
    }
  }
  
  return colors;
}

/**
 * ✅ Valida fallbacks de color en var() (solo keywords seguros)
 */
function validateColorFallbacks(content: string): string[] {
  const issues: string[] = [];
  const varRegex = /var\s*\(\s*--[\w-]+,\s*([^)]+)\s*\)/g;
  let match;
  
  const safeKeywords = ['transparent', 'currentColor', 'inherit', 'initial', 'white', 'black'];
  
  while ((match = varRegex.exec(content)) !== null) {
    const fallback = match[1].trim();
    
    if (safeKeywords.includes(fallback)) {
      continue; // OK
    }
    
    // ❌ Prohibir hex/rgb/hsl en fallbacks
    if (/^#[0-9a-fA-F]{3,8}$/.test(fallback) || 
        /^rgb\s*\(/.test(fallback) || 
        /^hsl\s*\(/.test(fallback)) {
      issues.push(`Fallback de color prohibido: ${fallback}`);
    }
  }
  
  return issues;
}
```

---

## FASE 2: Resolución UBITS (Desde Contratos)

### Paso 2.1: Crear ContractStore.ts

**Archivo:** `packages/autorun-core/src/ubits/ContractStore.ts` (NUEVO)

```typescript
export class ContractStore {
  /**
   * ✅ Obtiene contrato por componentId (desde UBITSComponentIndex)
   */
  async getById(componentId: string): Promise<UBITSContract | null> {
    // Buscar en packages/storybook/stories/_shared/componentIndex.ts
    // O parsear desde stories directamente
    // ...
  }
  
  /**
   * ✅ Obtiene tokensUsed del contrato (NO desde Storybook MCP)
   */
  async getTokensUsed(componentId: string): Promise<string[]> {
    const contract = await this.getById(componentId);
    return contract?.tokensUsed || [];
  }
  
  /**
   * ✅ Obtiene dependsOn del contrato (NO desde Storybook MCP)
   */
  async getDependsOn(componentId: string): Promise<{
    required: string[];
    optional: string[];
  }> {
    const contract = await this.getById(componentId);
    return contract?.dependsOn || { required: [], optional: [] };
  }
}
```

---

### Paso 2.2: Crear DependencyResolver.ts (Desde Contratos)

**Archivo:** `packages/autorun-core/src/ubits/DependencyResolver.ts` (NUEVO)

```typescript
export class DependencyResolver {
  /**
   * ✅ Resuelve dependencias desde contratos (NO desde Storybook MCP)
   */
  async resolveGraph(rootComponentId: string): Promise<DependencyGraph> {
    const contract = await this.contractStore.getById(rootComponentId);
    if (!contract) {
      throw new Error(`Contrato no encontrado para ${rootComponentId}`);
    }
    
    // ✅ Dependencias desde contrato
    const dependsOn = contract.dependsOn || { required: [], optional: [] };
    
    // ✅ Expandir dependsOn.required recursivo (desde contratos)
    const publicDeps: string[] = [];
    await this.expandRequiredRecursive(dependsOn.required, publicDeps);
    
    // ✅ Slots desde contrato
    const slotPlan = contract.slots || {};
    
    // ✅ Internals desde contrato (nunca se implementan)
    const internals = contract.internals || [];
    
    return {
      root: rootComponentId,
      publicDeps: [...new Set(publicDeps)],
      internals,
      slotPlan
    };
  }
  
  /**
   * ✅ Expansión recursiva desde contratos
   */
  private async expandRequiredRecursive(
    componentIds: string[],
    collected: string[]
  ): Promise<void> {
    for (const componentId of componentIds) {
      if (collected.includes(componentId)) {
        continue; // Evitar ciclos
      }
      
      collected.push(componentId);
      
      const contract = await this.contractStore.getById(componentId);
      if (contract?.dependsOn?.required) {
        await this.expandRequiredRecursive(
          contract.dependsOn.required,
          collected
        );
      }
    }
  }
}
```

---

## FASE 3: Fallback (Tokens desde Repo Local)

### Paso 3.1: Crear TokenPolicyResolver.ts

**Archivo:** `packages/autorun-core/src/fallback/TokenPolicyResolver.ts` (NUEVO)

```typescript
export class TokenPolicyResolver {
  /**
   * ✅ Resuelve tokens desde contratos/repo local (NO desde Storybook MCP)
   */
  async resolveTokensForWidget(
    componentId?: string,
    contractStore?: ContractStore
  ): Promise<Record<string, string>> {
    const tokens: Record<string, string> = {};
    
    // ✅ 1. Si hay componente cercano, usar tokensUsed del contrato
    if (componentId && contractStore) {
      const contractTokens = await contractStore.getTokensUsed(componentId);
      for (const token of contractTokens) {
        tokens[token] = await this.getTokenValue(token);
      }
    }
    
    // ✅ 2. Cargar GlobalTokenRegistry local
    const globalTokens = await this.loadGlobalTokenRegistry();
    Object.assign(tokens, globalTokens);
    
    // ✅ 3. Fallbacks seguros (solo keywords permitidas)
    const safeFallbacks = {
      '--ubits-bg-1': 'transparent',
      '--ubits-bg-2': 'transparent',
      '--ubits-fg-1-high': 'currentColor',
      '--ubits-fg-1-medium': 'currentColor',
      '--ubits-fg-1-low': 'currentColor',
      '--ubits-border-1': 'currentColor',
      '--ubits-border-2': 'currentColor',
      '--ubits-spacing-xs': '8px',
      '--ubits-spacing-sm': '12px',
      '--ubits-spacing-md': '16px',
      '--ubits-spacing-lg': '24px',
      '--ubits-spacing-xl': '32px',
      '--ubits-border-radius-sm': '4px',
      '--ubits-border-radius-md': '8px',
      '--ubits-border-radius-lg': '12px',
    };
    
    for (const [key, value] of Object.entries(safeFallbacks)) {
      if (!tokens[key]) {
        tokens[key] = value;
      }
    }
    
    return tokens;
  }
  
  /**
   * ✅ Carga GlobalTokenRegistry desde vendor/ubits/packages/tokens/
   */
  private async loadGlobalTokenRegistry(): Promise<Record<string, string>> {
    const tokensPath = path.join(
      process.cwd(),
      'vendor/ubits/packages/tokens/dist/tokens.css'
    );
    
    try {
      const css = await fs.readFile(tokensPath, 'utf-8');
      return this.parseTokensFromCSS(css);
    } catch {
      return {};
    }
  }
  
  /**
   * ✅ Parsea tokens desde CSS
   */
  private parseTokensFromCSS(css: string): Record<string, string> {
    const tokens: Record<string, string> = {};
    const regex = /--ubits-[\w-]+:\s*([^;]+);/g;
    let match;
    
    while ((match = regex.exec(css)) !== null) {
      const tokenName = match[0].split(':')[0].trim();
      const tokenValue = match[1].trim();
      tokens[tokenName] = tokenValue;
    }
    
    return tokens;
  }
}
```

---

### Paso 3.2: Crear PrototypeTokenKit.ts (Sin Hex/RGB/HSL)

**Archivo:** `packages/autorun-core/src/fallback/PrototypeTokenKit.ts` (NUEVO)

```typescript
export class PrototypeTokenKit {
  /**
   * ✅ Genera widgets tokenizados (sin hex/rgb/hsl, solo var(--token, keyword))
   */
  generateKpiCard(props: KpiCardProps, tokens: Record<string, string>): string {
    return `
<div class="ubits-kpi-card" style="
  background: var(--ubits-bg-1, ${tokens['--ubits-bg-1'] || 'transparent'});
  border: 1px solid var(--ubits-border-1, ${tokens['--ubits-border-1'] || 'currentColor'});
  border-radius: var(--ubits-border-radius-md, ${tokens['--ubits-border-radius-md'] || '8px'});
  padding: var(--ubits-spacing-md, ${tokens['--ubits-spacing-md'] || '16px'});
">
  <div class="ubits-kpi-card__title" style="
    color: var(--ubits-fg-1-medium, ${tokens['--ubits-fg-1-medium'] || 'currentColor'});
    font-size: var(--ubits-font-size-sm, ${tokens['--ubits-font-size-sm'] || '14px'});
    margin-bottom: var(--ubits-spacing-xs, ${tokens['--ubits-spacing-xs'] || '8px'});
  ">${props.title}</div>
  <div class="ubits-kpi-card__value" style="
    color: var(--ubits-fg-1-high, ${tokens['--ubits-fg-1-high'] || 'currentColor'});
    font-size: var(--ubits-font-size-xl, ${tokens['--ubits-font-size-xl'] || '24px'});
    font-weight: var(--ubits-font-weight-bold, ${tokens['--ubits-font-weight-bold'] || '700'});
  ">${props.value}</div>
</div>`.trim();
  }
  
  // ... más métodos para otros widgets
}
```

---

## FASE 4: Integración Final

### Paso 4.1: Extender autorun.apply() (Mantener strict)

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

```typescript
export async function autorunApply(
  input: AutorunApplyInputExtended
): Promise<AutorunApplyOutput> {
  // ✅ Detección automática de modo
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
  // 1. ✅ Consultar Storybook MCP (solo para props/existencia)
  const storybookResult = await callStorybookMcp({
    toolName: "mcp_storybook_getComponentsProps",
    arguments: { componentIds: [componentId] }
  });
  
  // 2. ✅ Resolver dependencias desde contratos (NO desde Storybook MCP)
  const contractStore = new ContractStore();
  const dependencyResolver = new DependencyResolver(contractStore);
  const resolvedDeps = await dependencyResolver.resolveGraph(componentId);
  
  // 3. ✅ Resolver tokens desde contratos/repo local (NO desde Storybook MCP)
  const tokenResolver = new TokenPolicyResolver();
  const tokens = await tokenResolver.resolveTokensForWidget(componentId, contractStore);
  
  // 4. ✅ Generar código UBITS o widgets tokenizados
  // ...
  
  // 5. ✅ Insertar con watermark
  // ...
}
```

---

## ✅ Checklist Final

- [x] Modo `strict` se mantiene (flujo actual intacto)
- [x] `prototypeTokens` solo en `prototypes/` o cuando se solicita
- [x] Tokens desde contratos/repo local (NO Storybook MCP)
- [x] Dependencias desde contratos (NO Storybook MCP)
- [x] Storybook MCP solo para cross-check de props/existencia
- [x] Verify diff-based (solo líneas modificadas)
- [x] Política de colores: prohibir hex/rgb/hsl directos, permitir keywords seguros
- [x] `autorun.apply` escribe `prototypes/` solo con blocks watermarked
- [x] `autorun.verify("diff")` falla si el agente tocó algo fuera de watermark
- [x] Mode B genera widgets sin hex/rgb/hsl y usando tokens del repo/contrato

---

## 🎯 Conclusión

**Mode B corregido implementa:**

1. ✅ Mantiene modo `strict` para flujo actual
2. ✅ `prototypeTokens` solo en `prototypes/` o cuando se solicita
3. ✅ Tokens desde contratos/repo local (NO Storybook MCP)
4. ✅ Dependencias desde contratos (NO Storybook MCP)
5. ✅ Storybook MCP solo para cross-check de props/existencia
6. ✅ Verify diff-based (solo líneas modificadas)
7. ✅ Política de colores: prohibir hex/rgb/hsl directos, permitir keywords seguros

**Implementación recomendada:** Por fases, con tests en cada fase, aplicando estas correcciones.
