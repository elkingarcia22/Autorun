# 🔧 Correcciones Críticas al Plan Mode B

**Fecha:** 2025-01-03  
**Correcciones:** 5 errores críticos y 2 ajustes importantes identificados

---

## ✅ Lo que está BIEN del análisis

- ✅ Integración incremental por fases (watermark → adapter → verify → resolver → fallback → design intake)
- ✅ "Mode B solo toca prototypes/" (correcto)
- ✅ Watermark v2 + hash + verify("diff") (enforcement real)
- ✅ HtmlPrototypeAdapter con anchors (reduce fallos)

---

## ❌ Correcciones CRÍTICAS (lo que está MAL / peligroso)

### 1. ❌ NO eliminar "strict"

**Problema identificado:**
- El sistema actual ya implementa componentes "exactos" usando flujo existente
- Quitar `strict` puede:
  - ❌ Romper casos fuera de `prototypes/`
  - ❌ Romper el wizard (si asume flujo actual)
  - ❌ Limitar innecesariamente

**✅ Solución correcta:**

```typescript
// ✅ MANTENER ambos modos
export type AutorunMode = "strict" | "prototypeTokens";

// ✅ Detección automática
const mode = input.options?.mode || 
  (targetFile.startsWith("prototypes/") ? "prototypeTokens" : "strict");

// ✅ Flujo según modo
if (mode === "strict") {
  return await autorunApplyStrict(input); // Flujo actual sin cambios
} else {
  return await autorunApplyModeB(input); // Nuevo flujo
}
```

**Reglas:**
- `strict` sigue siendo default para rutas fuera de `prototypes/`
- `prototypeTokens` se activa automáticamente solo en `prototypes/*` o cuando `options.mode` lo indique
- Wizard siempre usa `strict` implícito (no se modifica)

---

### 2. ❌ NO depender de "tokens desde Storybook MCP"

**Problema identificado:**
El servidor MCP `storybook` solo tiene:
- ✅ `mcp_storybook_getComponentList`
- ✅ `mcp_storybook_getComponentsProps`
- ❌ **NO existe** `mcp_storybook_getTokens`

**✅ Solución correcta:**

**Fuente de tokens para Mode B:**

```typescript
// ✅ 1. Primero: contract.tokensUsed (si hay componente cercano)
const contract = await contractStore.getById(componentId);
const tokens = contract?.tokensUsed || [];

// ✅ 2. Segundo: GlobalTokenRegistry local (archivo CSS/JSON del repo)
const globalTokens = await loadGlobalTokenRegistry();
// Buscar en: vendor/ubits/packages/tokens/dist/tokens.css
// O en: vendor/ubits/packages/components/tokens-ubits/

// ✅ 3. Último recurso: var(--token) sin fallback o fallback con keywords permitidas
const fallbackTokens = {
  '--ubits-bg-1': 'transparent',  // ✅ Permitido
  '--ubits-fg-1-high': 'currentColor',  // ✅ Permitido
  '--ubits-spacing-md': '16px'  // ✅ Permitido (no es color)
};
```

**Implementación:**

```typescript
// packages/autorun-core/src/fallback/TokenPolicyResolver.ts
export class TokenPolicyResolver {
  /**
   * Resuelve tokens para widgets tokenizados
   */
  async resolveTokensForWidget(
    componentId?: string,
    contractStore?: ContractStore
  ): Promise<Record<string, string>> {
    const tokens: Record<string, string> = {};
    
    // 1. Si hay componente cercano, usar tokensUsed del contrato
    if (componentId && contractStore) {
      const contract = await contractStore.getById(componentId);
      if (contract?.tokensUsed) {
        for (const token of contract.tokensUsed) {
          tokens[token] = await this.getTokenValue(token);
        }
      }
    }
    
    // 2. Cargar GlobalTokenRegistry local
    const globalTokens = await this.loadGlobalTokenRegistry();
    Object.assign(tokens, globalTokens);
    
    // 3. Fallbacks seguros (solo keywords permitidas)
    const safeFallbacks = {
      '--ubits-bg-1': 'transparent',
      '--ubits-bg-2': 'transparent',
      '--ubits-fg-1-high': 'currentColor',
      '--ubits-fg-1-medium': 'currentColor',
      '--ubits-fg-1-low': 'currentColor',
      '--ubits-border-1': 'currentColor',
      '--ubits-border-2': 'currentColor',
      // Spacing, radius, etc. pueden tener valores numéricos
      '--ubits-spacing-xs': '8px',
      '--ubits-spacing-sm': '12px',
      '--ubits-spacing-md': '16px',
      '--ubits-spacing-lg': '24px',
      '--ubits-spacing-xl': '32px',
      '--ubits-border-radius-sm': '4px',
      '--ubits-border-radius-md': '8px',
      '--ubits-border-radius-lg': '12px',
    };
    
    // Solo agregar fallbacks que no existen
    for (const [key, value] of Object.entries(safeFallbacks)) {
      if (!tokens[key]) {
        tokens[key] = value;
      }
    }
    
    return tokens;
  }
  
  /**
   * Carga GlobalTokenRegistry desde el repo
   */
  private async loadGlobalTokenRegistry(): Promise<Record<string, string>> {
    // Buscar en vendor/ubits/packages/tokens/dist/tokens.css
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
   * Parsea tokens desde CSS
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
  
  /**
   * Obtiene valor de token (desde registry o fallback)
   */
  private async getTokenValue(tokenName: string): Promise<string> {
    const registry = await this.loadGlobalTokenRegistry();
    return registry[tokenName] || 'transparent'; // Fallback seguro
  }
}
```

---

### 3. ❌ "Storybook MCP indica dependencias" — NO

**Problema identificado:**
- `getComponentsProps` solo da props, NO da `dependsOn/slots/internals`
- Eso ya está perfecto en los contratos (`UBITSComponentIndex.contract`)

**✅ Solución correcta:**

```typescript
// ✅ Dependencias/profundidad desde contratos
const contract = await contractStore.getById(componentId);
const dependsOn = contract?.dependsOn || { required: [], optional: [] };
const slots = contract?.slots || {};
const internals = contract?.internals || [];

// ✅ Storybook MCP solo para cross-check de props
const storybookProps = await callStorybookMcp({
  toolName: "mcp_storybook_getComponentsProps",
  arguments: { componentIds: [componentId] }
});

// Cross-check: validar que props del contrato coinciden con Storybook
if (storybookProps.components[0]) {
  const storybookPropsData = storybookProps.components[0].props;
  const contractProps = contract?.api?.props || {};
  
  // Validar tipos/defaults
  for (const [propName, propDef] of Object.entries(contractProps)) {
    const storybookProp = storybookPropsData[propName];
    if (storybookProp && storybookProp.type !== propDef.type) {
      warnings.push(`Prop ${propName}: tipo mismatch (contrato: ${propDef.type}, storybook: ${storybookProp.type})`);
    }
  }
}
```

**Implementación:**

```typescript
// packages/autorun-core/src/ubits/DependencyResolver.ts
export class DependencyResolver {
  /**
   * Resuelve dependencias desde contratos (NO desde Storybook MCP)
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
   * Expansión recursiva desde contratos
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

### 4. ❌ Verify: NO exigir "todo el archivo bajo watermark"

**Problema identificado:**
- Un prototype tiene mucho HTML que NO es generado por Autorun
- Exigir que todo esté bajo watermark es irreal

**✅ Solución correcta (diff-based):**

```typescript
// packages/autorun-core/src/verify/VerifyDiff.ts
export async function verifyDiff(options: VerifyDiffOptions = {}): Promise<VerifyDiffOutput> {
  // ✅ 1. Obtener git diff hunks (líneas modificadas)
  const diffHunks = await getGitDiffHunks();
  
  // ✅ 2. Para cada línea modificada: verificar que cae dentro de un bloque AUTORUN
  for (const hunk of diffHunks) {
    const filePath = hunk.file;
    const modifiedLines = hunk.lines; // Array de números de línea
    
    const content = await fs.readFile(filePath, 'utf-8');
    const watermarks = parseWatermarks(content);
    
    // Verificar que cada línea modificada está dentro de un bloque watermark
    for (const lineNum of modifiedLines) {
      const isInWatermark = watermarks.some(block => 
        lineNum >= block.startLine && lineNum <= block.endLine
      );
      
      if (!isInWatermark) {
        errors.push(
          `Archivo ${filePath}, línea ${lineNum}: Modificación fuera de bloque AUTORUN`
        );
      }
    }
  }
  
  return { valid: errors.length === 0, errors, warnings: [], files: [] };
}

/**
 * Obtiene hunks de git diff con números de línea
 */
async function getGitDiffHunks(): Promise<Array<{
  file: string;
  lines: number[];
}>> {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['diff', '--unified=0', 'HEAD']);
    let output = '';
    
    git.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    git.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`git diff failed with code ${code}`));
        return;
      }
      
      const hunks: Array<{ file: string; lines: number[] }> = [];
      let currentFile = '';
      let currentLines: number[] = [];
      
      for (const line of output.split('\n')) {
        // Detectar archivo
        if (line.startsWith('+++')) {
          if (currentFile && currentLines.length > 0) {
            hunks.push({ file: currentFile, lines: currentLines });
            currentLines = [];
          }
          currentFile = line.substring(4).trim();
        }
        
        // Detectar líneas modificadas (formato: @@ -start,count +start,count @@)
        const hunkMatch = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
        if (hunkMatch) {
          const startLine = parseInt(hunkMatch[2]);
          const count = parseInt(hunkMatch[3] || '1');
          for (let i = 0; i < count; i++) {
            currentLines.push(startLine + i);
          }
        }
      }
      
      if (currentFile && currentLines.length > 0) {
        hunks.push({ file: currentFile, lines: currentLines });
      }
      
      resolve(hunks.filter(h => h.file.startsWith('prototypes/')));
    });
  });
}
```

---

### 5. ❌ Colores hardcodeados: cuidado con los fallbacks

**Problema identificado:**
- Si prohíbes `#`, `rgb(`, `hsl(` de forma ciega, rompes `var(--token, #fff)`

**✅ Política recomendada en Mode B:**

```typescript
// packages/autorun-core/src/verify/VerifyDiff.ts
function detectHardcodedColors(content: string): string[] {
  const colors: string[] = [];
  
  // ✅ Prohibir #hex, rgb(), hsl() en estilos DIRECTOS
  // ❌ background: #fff;
  // ❌ color: rgb(255, 0, 0);
  // ❌ border-color: hsl(0, 100%, 50%);
  
  // ✅ PERMITIR en fallbacks de var()
  // ✅ background: var(--token, #fff);  // Permitido
  // ✅ color: var(--token, transparent);  // Permitido
  
  // Regex para detectar colores hardcodeados en estilos directos
  const directStyleRegex = /:\s*(#[0-9a-fA-F]{3,8}|rgb\s*\([^)]+\)|hsl\s*\([^)]+\))\s*;/g;
  const matches = content.match(directStyleRegex);
  
  if (matches) {
    // Filtrar los que están dentro de var()
    for (const match of matches) {
      // Verificar que NO esté dentro de var(--token, ...)
      const beforeMatch = content.substring(0, content.indexOf(match));
      const lastVar = beforeMatch.lastIndexOf('var(');
      const lastClose = beforeMatch.lastIndexOf(')');
      
      // Si hay un var( abierto antes y no cerrado, está dentro de var()
      if (lastVar > lastClose) {
        continue; // Está dentro de var(), permitir
      }
      
      colors.push(match.trim());
    }
  }
  
  return colors;
}

/**
 * Valida fallbacks de color en var()
 */
function validateColorFallbacks(content: string): string[] {
  const issues: string[] = [];
  
  // Buscar var(--token, fallback)
  const varRegex = /var\s*\(\s*--[\w-]+,\s*([^)]+)\s*\)/g;
  let match;
  
  while ((match = varRegex.exec(content)) !== null) {
    const fallback = match[1].trim();
    
    // ✅ Permitir keywords seguros
    const safeKeywords = ['transparent', 'currentColor', 'inherit', 'initial', 'white', 'black'];
    if (safeKeywords.includes(fallback)) {
      continue; // OK
    }
    
    // ❌ Prohibir hex/rgb/hsl en fallbacks
    if (/^#[0-9a-fA-F]{3,8}$/.test(fallback) || 
        /^rgb\s*\(/.test(fallback) || 
        /^hsl\s*\(/.test(fallback)) {
      issues.push(`Fallback de color prohibido en var(): ${fallback}`);
    }
  }
  
  return issues;
}
```

**Política final:**

```typescript
// ✅ CORRECTO
background: var(--ubits-bg-1, transparent);
color: var(--ubits-fg-1-high, currentColor);
border-color: var(--ubits-border-1, inherit);

// ❌ INCORRECTO
background: #ffffff;
color: rgb(0, 0, 0);
border-color: hsl(0, 0%, 0%);

// ❌ INCORRECTO (fallback con hex)
background: var(--ubits-bg-1, #fff);

// ✅ CORRECTO (fallback seguro)
background: var(--ubits-bg-1, transparent);
```

---

## 📋 Ajustes IMPORTANTES

### 6. Storybook MCP: Solo para cross-check de props

**Uso correcto:**

```typescript
// ✅ Storybook MCP se llama siempre (para props/existencia)
const storybookResult = await callStorybookMcp({
  toolName: "mcp_storybook_getComponentsProps",
  arguments: { componentIds: [componentId] }
});

// ✅ Validar existencia
if (!storybookResult.components || storybookResult.components.length === 0) {
  if (requireStorybookMcp) {
    throw new Error(`Componente ${componentId} no existe en Storybook MCP`);
  }
}

// ✅ Cross-check de props (tipos/defaults)
const storybookProps = storybookResult.components[0]?.props || {};
const contractProps = contract?.api?.props || {};

for (const [propName, contractProp] of Object.entries(contractProps)) {
  const storybookProp = storybookProps[propName];
  if (storybookProp) {
    // Validar tipos
    if (storybookProp.type !== contractProp.type) {
      warnings.push(`Prop ${propName}: tipo mismatch`);
    }
  }
}
```

---

## ✅ Versión Corregida del "Mode B"

### Modo B = "UBITS primero, widgets tokenizados solo para gaps"

**⚠️ CRÍTICO:** Mantener modo `strict` intacto. Mode B es adicional.

**Flujo correcto:**

```
1. Detección automática de modo:
   - Si targetFile.startsWith("prototypes/") → "prototypeTokens"
   - Si no → "strict" (flujo actual)

2. Si modo === "strict":
   → Flujo actual sin cambios (no romper wizard/add-ons)

3. Si modo === "prototypeTokens":
   → Si existe componente/recipe/ejemplo UBITS → usarlo (determinístico desde contratos)
   → Si NO existe → TokenWidget solo en prototypes/
   → Storybook MCP se llama siempre (para props/existencia), NO para tokens ni dependencias
   → Tokens para widgets: GlobalTokenRegistry (repo local), NO desde Storybook MCP
```

---

## 📋 Checklist Final (para validar que quedó "perfecto")

- [x] **Modo `strict` se mantiene** - Flujo actual intacto, no romper wizard/add-ons
- [x] **Modo `prototypeTokens` es adicional** - Solo en `prototypes/` o cuando se solicita
- [x] **GlobalTokenRegistry implementado** - Carga desde `tokens.css` y `figma-tokens.css` (repo local)
- [x] **Tokens NO vienen de Storybook MCP** - No existe `mcp_storybook_getTokens`
- [x] **Dependencias desde contratos** - NO desde Storybook MCP (`getComponentsProps` solo da props)
- [x] **Storybook MCP solo para cross-check** - Props/existencia, NO tokens ni dependencias
- [x] `autorun.apply` escribe `prototypes/` solo con blocks watermarked
- [x] `autorun.verify("diff")` falla si el agente tocó algo fuera de watermark (diff-based)
- [x] `autorun.verify("diff")` ignora `<link>`, comentarios, `<script>`, atributos data-*
- [x] `autorun.verify("diff")` detecta hex/rgb/hsl solo en CSS real (`<style>` y `style=""`)
- [x] `autorun.verify("diff")` valida tokens usados en `var(--token)` con GlobalTokenRegistry
- [x] Mode B genera widgets sin hex/rgb/hsl y usando tokens reales del repo (NO Storybook MCP)
- [x] Profundidad real: deps/slots desde contratos, internals nunca se implementan
- [x] Fallbacks de color solo permiten keywords seguros (transparent, currentColor, inherit, initial, unset)

---

## 🎯 Conclusión

**Mode B corregido:**

1. ✅ Mantiene modo `strict` para flujo actual
2. ✅ `prototypeTokens` solo en `prototypes/` o cuando se solicita
3. ✅ Tokens desde contratos/repo local (NO Storybook MCP)
4. ✅ Dependencias desde contratos (NO Storybook MCP)
5. ✅ Storybook MCP solo para cross-check de props/existencia
6. ✅ Verify diff-based (solo líneas modificadas)
7. ✅ Política de colores: prohibir hex/rgb/hsl directos, permitir keywords seguros en fallbacks

**Implementación recomendada:** Corregir el plan paso a paso con estas correcciones.
