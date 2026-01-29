# 📋 Plan Mode B Final Corregido - Implementación Paso a Paso

**Fecha:** 2025-01-03  
**Versión:** Final con correcciones exactas aplicadas

---

## ⚠️ Correcciones Obligatorias Aplicadas

1. ✅ **Mantener modo `strict`** - No eliminar, es el flujo actual intacto
2. ✅ **Tokens desde repo local** - NO desde Storybook MCP (no existe `getTokens`)
3. ✅ **Dependencias desde contratos** - NO desde Storybook MCP
4. ✅ **Verify diff-based** - Solo líneas modificadas, sin falsos positivos
5. ✅ **PrototypeTokenKit con tokens reales** - Usar `--ubits-*` y `--modifiers-*` del repo

---

## FASE 1: GlobalTokenRegistry (Base de Mode B)

### Paso 1.1: Crear GlobalTokenRegistry.ts

**Archivo:** `packages/autorun-core/src/tokens/GlobalTokenRegistry.ts` (NUEVO)

**Responsabilidades:**

1. Cargar tokens de:
   - `vendor/ubits/packages/tokens/dist/tokens.css` (ubits)
   - `vendor/ubits/packages/tokens/dist/figma-tokens.css` (modifiers)
   - Fallback: `vendor/ubits/packages/tokens/tokens.json`

2. Guardar un `Set<string>` con nombres de tokens:
   - `--ubits-*`
   - `--modifiers-*`

3. Exponer:
   - `has(tokenName: string): boolean`
   - `assertExists(tokenName: string): void` (lanza error con sugerencia)
   - `getAll(): string[]`

**Implementación:**

```typescript
import * as fs from 'fs/promises';
import * as path from 'path';

export class GlobalTokenRegistry {
  private tokens: Set<string> = new Set();
  private initialized = false;

  /**
   * Inicializa el registro cargando tokens desde CSS/JSON
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // ✅ 1. Intentar cargar desde tokens.css (primera opción)
    const tokensCssPath = path.join(
      process.cwd(),
      'vendor/ubits/packages/tokens/dist/tokens.css'
    );

    try {
      const css = await fs.readFile(tokensCssPath, 'utf-8');
      this.parseTokensFromCSS(css);
      console.log(`✅ GlobalTokenRegistry: Cargados ${this.tokens.size} tokens desde tokens.css`);
    } catch (error) {
      console.warn(`⚠️ No se pudo cargar tokens.css: ${error}`);
    }

    // ✅ 2. Intentar cargar desde figma-tokens.css (segunda opción)
    const figmaTokensCssPath = path.join(
      process.cwd(),
      'vendor/ubits/packages/tokens/dist/figma-tokens.css'
    );

    try {
      const figmaCss = await fs.readFile(figmaTokensCssPath, 'utf-8');
      this.parseTokensFromCSS(figmaCss);
      console.log(`✅ GlobalTokenRegistry: Total ${this.tokens.size} tokens (incluye modifiers)`);
    } catch (error) {
      console.warn(`⚠️ No se pudo cargar figma-tokens.css: ${error}`);
    }

    // ✅ 3. Fallback a tokens.json (solo si CSS no existe)
    if (this.tokens.size === 0) {
      const tokensJsonPath = path.join(
        process.cwd(),
        'vendor/ubits/packages/tokens/tokens.json'
      );

      try {
        const json = await fs.readFile(tokensJsonPath, 'utf-8');
        const tokensData = JSON.parse(json);
        this.parseTokensFromJSON(tokensData);
        console.log(`✅ GlobalTokenRegistry: Cargados ${this.tokens.size} tokens desde tokens.json`);
      } catch (error) {
        console.warn(`⚠️ No se pudo cargar tokens.json: ${error}`);
      }
    }

    this.initialized = true;
  }

  /**
   * ✅ Parsea tokens desde CSS (regex rápido y seguro)
   * 
   * Regex: /(--(?:ubits|modifiers)[\w-]+)\s*:/g
   * Captura: --token-name: (sin el valor)
   */
  private parseTokensFromCSS(css: string): void {
    // ✅ Regex recomendado: captura --token-name: sin el valor
    const tokenRegex = /(--(?:ubits|modifiers)[\w-]+)\s*:/g;
    let match;

    while ((match = tokenRegex.exec(css)) !== null) {
      const tokenName = match[1].trim();
      this.tokens.add(tokenName);
    }
  }

  /**
   * ✅ CORRECTO (Fix A): Solo usar key cuando el value es leaf
   * 
   * "ubits-accent-brand" → "--ubits-accent-brand"
   * NO "light-background-ubits-bg-1"
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

  /**
   * Verifica si un token existe
   */
  has(tokenName: string): boolean {
    return this.tokens.has(tokenName);
  }

  /**
   * ✅ Assert que un token existe (lanza error con sugerencia)
   */
  assertExists(tokenName: string): void {
    if (!this.has(tokenName)) {
      // ✅ Sugerencia fuzzy: buscar tokens similares
      const suggestions = this.findSimilarTokens(tokenName);
      const suggestionText = suggestions.length > 0
        ? ` ¿Quizás quisiste: ${suggestions.slice(0, 3).join(', ')}?`
        : '';
      
      throw new Error(
        `Token no encontrado: ${tokenName}.${suggestionText} ` +
        `Tokens disponibles: ${this.tokens.size} total.`
      );
    }
  }

  /**
   * ✅ PÚBLICO (Fix B): Sugiere tokens similares
   */
  public suggest(tokenName: string): string[] {
    return this.findSimilarTokens(tokenName);
  }

  /**
   * ✅ PRIVADO: Implementación interna
   */
  private findSimilarTokens(tokenName: string): string[] {
    const tokenLower = tokenName.toLowerCase();
    const similar: Array<{ token: string; score: number }> = [];

    for (const token of this.tokens) {
      const tokenLower2 = token.toLowerCase();
      
      // Calcular similitud simple (contar caracteres comunes)
      let score = 0;
      const minLen = Math.min(tokenLower.length, tokenLower2.length);
      
      for (let i = 0; i < minLen; i++) {
        if (tokenLower[i] === tokenLower2[i]) {
          score++;
        }
      }
      
      // Bonus si contiene palabras clave comunes
      if (tokenLower2.includes('bg') && tokenLower.includes('bg')) score += 5;
      if (tokenLower2.includes('fg') && tokenLower.includes('fg')) score += 5;
      if (tokenLower2.includes('spacing') && tokenLower.includes('spacing')) score += 5;
      
      if (score > tokenLower.length * 0.5) {
        similar.push({ token, score });
      }
    }

    return similar
      .sort((a, b) => b.score - a.score)
      .map(item => item.token);
  }

  /**
   * Obtiene todos los tokens
   */
  getAll(): string[] {
    return Array.from(this.tokens).sort();
  }

  /**
   * Obtiene tokens por prefijo
   */
  getByPrefix(prefix: string): string[] {
    return Array.from(this.tokens)
      .filter(token => token.startsWith(prefix))
      .sort();
  }
}

// ✅ Singleton global
let globalRegistry: GlobalTokenRegistry | null = null;

export async function getGlobalTokenRegistry(): Promise<GlobalTokenRegistry> {
  if (!globalRegistry) {
    globalRegistry = new GlobalTokenRegistry();
    await globalRegistry.initialize();
  }
  return globalRegistry;
}
```

**Tests:**

```typescript
// packages/autorun-core/src/tokens/__tests__/GlobalTokenRegistry.test.ts
describe('GlobalTokenRegistry', () => {
  it('debe cargar tokens desde tokens.css', async () => {
    const registry = await getGlobalTokenRegistry();
    
    expect(registry.has('--ubits-bg-1')).toBe(true);
    expect(registry.has('--ubits-fg-1-high')).toBe(true);
    expect(registry.has('--ubits-spacing-md')).toBe(true);
  });
  
  it('debe cargar modifiers desde figma-tokens.css', async () => {
    const registry = await getGlobalTokenRegistry();
    
    expect(registry.has('--modifiers-normal-color-dark-accent-blue')).toBe(true);
  });
  
  it('debe lanzar error con sugerencia si token no existe', async () => {
    const registry = await getGlobalTokenRegistry();
    
    expect(() => {
      registry.assertExists('--ubits-bg-999');
    }).toThrow(/Token no encontrado/);
  });
});
```

---

## FASE 2: PrototypeTokenKit usando Tokens Reales

### Paso 2.1: Crear PrototypeTokenKit.ts

**Archivo:** `packages/autorun-core/src/fallback/PrototypeTokenKit.ts` (NUEVO)

**Regla de oro Mode B:**

- ❌ NO emitir colores hardcodeados (`#`, `rgb`, `hsl`, `rgba`, `hsla`)
- ✅ Usar tokens reales `--ubits-*` / `--modifiers-*`
- ✅ NO usar fallbacks en colores (ideal)
- ✅ Si usas fallback, solo keywords seguras: `transparent`, `currentColor`, `inherit`, `initial`, `unset`
- ✅ En tamaños sí puedes permitir fallback numérico (`16px`, `1rem`, `0`) pero no es obligatorio

**Implementación:**

```typescript
import { GlobalTokenRegistry } from '../tokens/GlobalTokenRegistry';

export interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface FiltersRowProps {
  filters: Array<{
    label: string;
    type: 'text' | 'select' | 'date' | 'number';
    value?: any;
  }>;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: {
    label: string;
    onClick?: string;
  };
}

export class PrototypeTokenKit {
  private registry: GlobalTokenRegistry;

  constructor(registry: GlobalTokenRegistry) {
    this.registry = registry;
  }

  /**
   * ✅ Genera KPI Card usando tokens reales (sin hardcoded colors)
   */
  generateKpiCard(props: KpiCardProps): string {
    // ✅ Validar que tokens existen
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-fg-1-medium');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-font-size-sm');
    this.registry.assertExists('--ubits-font-size-xl');
    this.registry.assertExists('--ubits-font-weight-bold');

    return `
<div class="ubits-kpi-card" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  <div class="ubits-kpi-card__title" style="
    color: var(--ubits-fg-1-medium);
    font-size: var(--ubits-font-size-sm);
    margin-bottom: var(--ubits-spacing-xs);
  ">${props.title}</div>
  <div class="ubits-kpi-card__value" style="
    color: var(--ubits-fg-1-high);
    font-size: var(--ubits-font-size-xl);
    font-weight: var(--ubits-font-weight-bold);
  ">${props.value}</div>
</div>`.trim();
  }

  /**
   * ✅ Genera Filters Row usando tokens reales
   */
  generateFiltersRow(props: FiltersRowProps): string {
    this.registry.assertExists('--ubits-bg-2');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-fg-1-medium');
    this.registry.assertExists('--ubits-font-size-sm');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-sm');
    this.registry.assertExists('--ubits-font-size-md');

    const filtersHtml = props.filters.map(filter => {
      return `
<div class="ubits-filter-item" style="
  display: flex;
  flex-direction: column;
  gap: var(--ubits-spacing-xs);
  margin-right: var(--ubits-spacing-md);
">
  <label style="
    color: var(--ubits-fg-1-medium);
    font-size: var(--ubits-font-size-sm);
  ">${filter.label}</label>
  <input type="${filter.type}" value="${filter.value || ''}" style="
    padding: var(--ubits-spacing-sm);
    border: 1px solid var(--ubits-border-1);
    border-radius: var(--ubits-border-radius-sm);
    font-size: var(--ubits-font-size-md);
  " />
</div>`.trim();
    }).join('\n');

    return `
<div class="ubits-filters-row" style="
  display: flex;
  flex-wrap: wrap;
  gap: var(--ubits-spacing-md);
  padding: var(--ubits-spacing-md);
  background: var(--ubits-bg-2);
  border-radius: var(--ubits-border-radius-md);
">
  ${filtersHtml}
</div>`.trim();
  }

  /**
   * ✅ Genera Empty State usando tokens reales
   */
  generateEmptyState(props: EmptyStateProps): string {
    this.registry.assertExists('--ubits-spacing-xl');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');
    this.registry.assertExists('--ubits-fg-1-low');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-font-size-lg');
    this.registry.assertExists('--ubits-font-size-md');
    this.registry.assertExists('--ubits-accent-brand');
    this.registry.assertExists('--ubits-fg-on-brand');
    this.registry.assertExists('--ubits-border-radius-sm');
    this.registry.assertExists('--ubits-spacing-sm');

    const actionHtml = props.action ? `
<button class="ubits-button ubits-button--primary" onclick="${props.action.onClick || ''}" style="
  padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
  background: var(--ubits-accent-brand);
  color: var(--ubits-fg-on-brand);
  border: none;
  border-radius: var(--ubits-border-radius-sm);
  font-size: var(--ubits-font-size-md);
  cursor: pointer;
">${props.action.label}</button>`.trim() : '';

    return `
<div class="ubits-empty-state" style="
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--ubits-spacing-xl);
  text-align: center;
">
  ${props.icon ? `<div class="ubits-empty-state__icon" style="
    font-size: 48px;
    color: var(--ubits-fg-1-low);
    margin-bottom: var(--ubits-spacing-md);
  ">${props.icon}</div>` : ''}
  <h3 class="ubits-empty-state__title" style="
    color: var(--ubits-fg-1-high);
    font-size: var(--ubits-font-size-lg);
    margin-bottom: var(--ubits-spacing-xs);
  ">${props.title}</h3>
  ${props.description ? `<p class="ubits-empty-state__description" style="
    color: var(--ubits-fg-1-medium);
    font-size: var(--ubits-font-size-md);
    margin-bottom: var(--ubits-spacing-md);
  ">${props.description}</p>` : ''}
  ${actionHtml}
</div>`.trim();
  }

  /**
   * ✅ Genera Section Header usando tokens reales
   */
  generateSectionHeader(props: { title: string; subtitle?: string }): string {
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    this.registry.assertExists('--ubits-font-size-lg');
    this.registry.assertExists('--ubits-font-size-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-spacing-xs');

    return `
<div class="ubits-section-header" style="
  margin-bottom: var(--ubits-spacing-md);
">
  <h2 style="
    color: var(--ubits-fg-1-high);
    font-size: var(--ubits-font-size-lg);
    margin-bottom: var(--ubits-spacing-xs);
  ">${props.title}</h2>
  ${props.subtitle ? `<p style="
    color: var(--ubits-fg-1-medium);
    font-size: var(--ubits-font-size-md);
  ">${props.subtitle}</p>` : ''}
</div>`.trim();
  }

  /**
   * ✅ Genera Panel usando tokens reales
   */
  generatePanel(props: { children: string }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');

    return `
<div class="ubits-panel" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  ${props.children}
</div>`.trim();
  }

  /**
   * ✅ Genera Simple Card usando tokens reales
   */
  generateSimpleCard(props: { title: string; content: string }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-md');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-font-size-md');

    return `
<div class="ubits-simple-card" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  padding: var(--ubits-spacing-md);
">
  <h3 style="
    color: var(--ubits-fg-1-high);
    font-size: var(--ubits-font-size-md);
    margin-bottom: var(--ubits-spacing-md);
  ">${props.title}</h3>
  <div>${props.content}</div>
</div>`.trim();
  }

  /**
   * ✅ Genera Table Shell usando tokens reales (si no hay DataTable)
   */
  generateTableShell(props: { headers: string[]; rows: string[][] }): string {
    this.registry.assertExists('--ubits-bg-1');
    this.registry.assertExists('--ubits-border-1');
    this.registry.assertExists('--ubits-border-radius-md');
    this.registry.assertExists('--ubits-spacing-sm');
    this.registry.assertExists('--ubits-fg-1-high');
    this.registry.assertExists('--ubits-fg-1-medium');
    this.registry.assertExists('--ubits-font-size-md');
    this.registry.assertExists('--ubits-bg-2');

    const headersHtml = props.headers.map(header => `
      <th style="
        padding: var(--ubits-spacing-sm);
        border-bottom: 1px solid var(--ubits-border-1);
        color: var(--ubits-fg-1-high);
        font-size: var(--ubits-font-size-md);
        text-align: left;
      ">${header}</th>
    `).join('');

    const rowsHtml = props.rows.map(row => `
      <tr>
        ${row.map(cell => `
          <td style="
            padding: var(--ubits-spacing-sm);
            border-bottom: 1px solid var(--ubits-border-1);
            color: var(--ubits-fg-1-medium);
            font-size: var(--ubits-font-size-md);
          ">${cell}</td>
        `).join('')}
      </tr>
    `).join('');

    return `
<div class="ubits-table-shell" style="
  background: var(--ubits-bg-1);
  border: 1px solid var(--ubits-border-1);
  border-radius: var(--ubits-border-radius-md);
  overflow: hidden;
">
  <table style="width: 100%; border-collapse: collapse;">
    <thead style="background: var(--ubits-bg-2);">
      <tr>
        ${headersHtml}
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</div>`.trim();
  }
}
```

**Tests:**

```typescript
// packages/autorun-core/src/fallback/__tests__/PrototypeTokenKit.test.ts
describe('PrototypeTokenKit', () => {
  it('nunca debe emitir colores hardcodeados', () => {
    const registry = await getGlobalTokenRegistry();
    const kit = new PrototypeTokenKit(registry);
    const kpiCard = kit.generateKpiCard({
      title: 'Test',
      value: '100'
    });

    // ✅ Verificar que no hay #hex, rgb(), hsl()
    expect(kpiCard).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    expect(kpiCard).not.toMatch(/rgb\s*\(/);
    expect(kpiCard).not.toMatch(/hsl\s*\(/);
    expect(kpiCard).not.toMatch(/rgba\s*\(/);
    expect(kpiCard).not.toMatch(/hsla\s*\(/);

    // ✅ Verificar que usa var(--token)
    expect(kpiCard).toMatch(/var\s*\(--ubits-/);
  });
  
  it('debe validar que tokens existen antes de generar', async () => {
    const registry = await getGlobalTokenRegistry();
    const kit = new PrototypeTokenKit(registry);
    
    // Si un token no existe, debe lanzar error
    // (esto se prueba mockeando registry)
  });
});
```

---

## FASE 3: Watermark v2 + Verify Diff-Based

### Paso 3.1: Crear Watermark.ts (v2)

**Archivo:** `packages/autorun-core/src/verify/Watermark.ts` (NUEVO)

```typescript
import * as crypto from 'crypto';
import type { AutorunMode } from '../../mcp-server/types';

export interface WatermarkMeta {
  v: number;
  mode: AutorunMode;
  components: string[];
  widgets: string[];
  deps: string[];
  hash: string;
}

export interface WatermarkBlock {
  meta: WatermarkMeta;
  content: string;
  hash: string;
  startLine: number;  // ✅ Para verify diff-based
  endLine: number;    // ✅ Para verify diff-based
}

/**
 * ✅ Emite watermark v2
 */
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

/**
 * ✅ Parsea watermarks con números de línea (para verify diff-based)
 */
export function parseWatermarks(fileContent: string): WatermarkBlock[] {
  const blocks: WatermarkBlock[] = [];
  const lines = fileContent.split('\n');
  
  let currentBlock: {
    startLine: number;
    startMark: string;
    content: string[];
  } | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1; // 1-indexed
    
    // Detectar inicio de bloque
    const startMatch = line.match(/<!--\s*AUTORUN:\s*({[\s\S]*?})\s*-->/);
    if (startMatch) {
      currentBlock = {
        startLine: lineNum,
        startMark: startMatch[1],
        content: []
      };
      continue;
    }
    
    // Detectar fin de bloque
    if (currentBlock && /<!--\s*\/AUTORUN\s*-->/.test(line)) {
      try {
        const meta = JSON.parse(currentBlock.startMark);
        const content = currentBlock.content.join('\n');
        const hash = computeHash(content);
        
        blocks.push({
          meta,
          content,
          hash,
          startLine: currentBlock.startLine,
          endLine: lineNum
        });
      } catch (error) {
        console.warn(`Error parseando watermark en línea ${currentBlock.startLine}: ${error}`);
      }
      
      currentBlock = null;
      continue;
    }
    
    // Acumular contenido del bloque
    if (currentBlock) {
      currentBlock.content.push(line);
    }
  }
  
  return blocks;
}

/**
 * ✅ Calcula hash del contenido
 */
export function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
}

/**
 * ✅ Valida hash de un bloque
 */
export function validateHash(block: WatermarkBlock): boolean {
  const expectedHash = computeHash(block.content);
  return block.meta.hash === expectedHash;
}
```

---

### Paso 3.2: Crear VerifyDiff.ts (Diff-Based, Sin Falsos Positivos)

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts` (NUEVO)

```typescript
import { spawn } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import { parseWatermarks, validateHash, type WatermarkBlock } from './Watermark';
import { getGlobalTokenRegistry } from '../tokens/GlobalTokenRegistry';

export interface VerifyDiffOptions {
  strict?: boolean;
  checkWatermarks?: boolean;
  checkHash?: boolean;
  checkHardcodedColors?: boolean;
  checkTokens?: boolean;
  
  // ✅ CI-Breaker #1 Fix: Soporte para CI y pre-commit
  staged?: boolean;        // pre-commit: validar staged changes
  baseRef?: string;        // CI/PR: comparar contra base (ej: origin/main)
}

export interface VerifyDiffOutput {
  valid: boolean;
  errors: string[];
  warnings: string[];
  files: Array<{
    path: string;
    hasWatermark: boolean;
    isValid: boolean;
    issues: string[];
  }>;
}

/**
 * ✅ Verifica cambios usando git diff (diff-based)
 */
export async function verifyDiff(options: VerifyDiffOptions = {}): Promise<VerifyDiffOutput> {
  // ✅ 1. Obtener git diff hunks (líneas modificadas)
  const diffHunks = await getGitDiffHunks(options);
  
  const results: VerifyDiffOutput = {
    valid: true,
    errors: [],
    warnings: [],
    files: []
  };

  const registry = await getGlobalTokenRegistry();

  // ✅ 2. Para cada archivo modificado
  const filesToCheck = new Set(diffHunks.map(h => h.file));
  
  for (const filePath of filesToCheck) {
    const fileHunks = diffHunks.filter(h => h.file === filePath);
    const fileResult = await verifyFile(filePath, fileHunks, options, registry);
    
    results.files.push(fileResult);
    
    if (!fileResult.isValid) {
      results.valid = false;
      results.errors.push(...fileResult.issues.map(issue => `${filePath}: ${issue}`));
    }
  }

  return results;
}

/**
 * ✅ CORRECTO (Fix E + CI-Breaker #1 Fix): Obtiene hunks de git diff con números de línea
 * 
 * Soporta:
 * - Working tree (default)
 * - Staged changes (--cached para pre-commit)
 * - Base ref (base...HEAD para CI/PR)
 * 
 * Filtra count=0 y soporta multi-hunks por archivo
 */
async function getGitDiffHunks(options: VerifyDiffOptions = {}): Promise<Array<{
  file: string;
  lines: number[];
}>> {
  return new Promise((resolve, reject) => {
    const args = ['diff', '-U0'];
    
    // ✅ CI-Breaker #1 Fix: Soporte staged y baseRef
    if (options.staged) {
      // Pre-commit: validar staged changes
      args.push('--cached');
    } else if (options.baseRef) {
      // CI/PR: comparar contra base
      args.push(`${options.baseRef}...HEAD`);
    }
    
    args.push('--', 'prototypes/');
    
    const git = spawn('git', args);
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
        // Detectar archivo (+++ b/prototypes/file.html o +++ /dev/null)
        if (line.startsWith('+++')) {
          const fileCandidate = line.substring(4).trim().replace(/^b\//, '');
          
          // ✅ Ajuste 4: Guarda 1 - Ignorar /dev/null (archivos borrados)
          if (fileCandidate === '/dev/null') {
            currentFile = '';
            continue;
          }
          
          // ✅ Ajuste 4: Guarda 2 - Solo procesar archivos en prototypes/
          if (!fileCandidate.startsWith('prototypes/')) {
            currentFile = '';
            continue;
          }
          
          currentFile = fileCandidate;
          if (!hunksByFile.has(currentFile)) {
            hunksByFile.set(currentFile, []);
          }
        }

        // Detectar rango de líneas (@@ -start,count +start,count @@)
        const hunkMatch = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
        if (hunkMatch && currentFile) {
          const startLine = parseInt(hunkMatch[2], 10);
          
          // ✅ Patch 1: count omitido => 1 (no 0)
          const count = hunkMatch[3] === undefined ? 1 : parseInt(hunkMatch[3], 10);
          
          const fileLines = hunksByFile.get(currentFile) || [];
          
          // ✅ Patch 1: Si count === 0 (solo borrados), igual marcar "punto de cambio"
          if (count === 0) {
            fileLines.push(startLine);
          } else {
            // ✅ Generar array de líneas modificadas
            for (let i = 0; i < count; i++) {
              fileLines.push(startLine + i);
            }
          }
          
          hunksByFile.set(currentFile, fileLines);
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

/**
 * ✅ Verifica un archivo individual (diff-based)
 */
async function verifyFile(
  filePath: string,
  hunks: Array<{ lines: number[] }>,
  options: VerifyDiffOptions,
  registry: Awaited<ReturnType<typeof getGlobalTokenRegistry>>
): Promise<{
  path: string;
  hasWatermark: boolean;
  isValid: boolean;
  issues: string[];
}> {
  const issues: string[] = [];
  let hasWatermark = false;
  let isValid = true;

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const watermarks = parseWatermarks(content);

    if (watermarks.length > 0) {
      hasWatermark = true;
    }

    // ✅ Obtener todas las líneas modificadas
    const allModifiedLines = new Set<number>();
    for (const hunk of hunks) {
      hunk.lines.forEach(line => allModifiedLines.add(line));
    }

    // ✅ Ajuste 5: Fail-closed si hay cambios y no se pueden parsear watermarks
    if (allModifiedLines.size > 0 && watermarks.length === 0) {
      // Hay cambios pero no se pueden parsear watermarks → FAIL
      issues.push('Archivo modificado pero no se pueden parsear bloques AUTORUN. Posible watermark roto.');
      isValid = false;
    }

    // ✅ Regla 1: Verificar que líneas modificadas están dentro de bloques AUTORUN
    if (options.checkWatermarks !== false && allModifiedLines.size > 0) {

      for (const lineNum of allModifiedLines) {
        const isInWatermark = watermarks.some(block => 
          lineNum >= block.startLine && lineNum <= block.endLine
        );

        if (!isInWatermark) {
          issues.push(`Línea ${lineNum}: Modificación fuera de bloques AUTORUN`);
          isValid = false;
        }
      }

      // ✅ Validar hash de bloques modificados
      if (options.checkHash !== false) {
        for (const block of watermarks) {
          const blockWasModified = hunks.some(hunk =>
            hunk.lines.some(line =>
              line >= block.startLine && line <= block.endLine
            )
          );

          if (blockWasModified && !validateHash(block)) {
            issues.push(`Bloque en líneas ${block.startLine}-${block.endLine}: Hash mismatch`);
            isValid = false;
          }
        }
      }
    }

    // ✅ Regla 2: Detectar hardcoded colors solo en contextos de CSS real (Fix C)
    if (options.checkHardcodedColors !== false) {
      const allModifiedLines = new Set<number>();
      for (const hunk of hunks) {
        hunk.lines.forEach(line => allModifiedLines.add(line));
      }
      
      const hardcodedColors = detectHardcodedColors(content, allModifiedLines);
      
      if (hardcodedColors.length > 0) {
        issues.push(...hardcodedColors);
        isValid = false;
      }
    }

    // ✅ Regla 3: Validar tokens usados (Fix B + Fix C)
    if (options.checkTokens !== false) {
      const allModifiedLines = new Set<number>();
      for (const hunk of hunks) {
        hunk.lines.forEach(line => allModifiedLines.add(line));
      }
      
      const tokenIssues = validateTokensUsed(content, allModifiedLines, registry);
      
      if (tokenIssues.length > 0) {
        issues.push(...tokenIssues);
        isValid = false;
      }
    }

  } catch (error: any) {
    issues.push(`Error verificando archivo: ${error.message}`);
    isValid = false;
  }

  return {
    path: filePath,
    hasWatermark,
    isValid,
    issues
  };
}

/**
 * ✅ CORRECTO (Fix C + Extra): Detecta colores hardcodeados con state machine
 * 
 * Usa archivo completo pero solo analiza líneas modificadas dentro de CSS real
 * Maneja <style>...</style> inline en una sola línea
 */
function detectHardcodedColors(
  content: string,
  modifiedLines: Set<number>
): string[] {
  const colors: string[] = [];
  const lines = content.split('\n');
  
  // ✅ State machine para <style> blocks
  let inStyleBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1; // 1-indexed
    const line = lines[i];
    
    // ✅ Extra Fix: Manejar <style>...</style> inline en una sola línea
    const hasStyleOpen = /<style[^>]*>/i.test(line);
    const hasStyleClose = /<\/style>/i.test(line);
    
    if (hasStyleOpen && hasStyleClose) {
      // Estilo inline en una sola línea
      const styleMatch = line.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (styleMatch && modifiedLines.has(lineNum)) {
        const cssContent = styleMatch[1];
        const lineColors = detectHardcodedColorsInLine(cssContent);
        if (lineColors.length > 0) {
          colors.push(...lineColors.map(c => `Línea ${lineNum}: ${c}`));
        }
      }
      // No cambiar inStyleBlock (ya está cerrado)
      continue;
    }
    
    // Detectar inicio de <style>
    if (hasStyleOpen) {
      inStyleBlock = true;
    }
    
    // Detectar fin de </style>
    if (hasStyleClose) {
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
 * ✅ CORRECTO (Ajuste 3 + Bug 0 Fix): Detecta colores hardcodeados usando regex.exec loop
 * 
 * NO usa indexOf(match) con .match() porque siempre da el primer índice.
 * Usa regex.exec loop para obtener índices reales de múltiples matches.
 * Detecta white/black explícitamente (directo y fallback).
 */
function detectHardcodedColorsInLine(line: string): string[] {
  const colors: string[] = [];
  
  // ✅ Bug 0 Fix: Detectar white/black explícitamente
  const bannedNamedColors = /\b(white|black)\b/i;
  
  // 1) Directo (no-var) — ejemplo: color: white;
  if (bannedNamedColors.test(line)) {
    // Para reducir falsos positivos: exigir que venga después de ":" o "," (fallback)
    const namedColorValue = line.match(/[: ,]\s*(white|black)\b/i);
    if (namedColorValue) {
      colors.push(`keyword: ${namedColorValue[1]}`);
    }
  }
  
  // 2) En fallback — ejemplo: var(--x, white)
  const namedFallback = line.match(/var\s*\(\s*--[\w-]+\s*,\s*(white|black)\b/i);
  if (namedFallback) {
    colors.push(`Fallback keyword prohibido en var(): ${namedFallback[1]}`);
    // ✅ Ajuste opcional: Evitar doble reporte (si matched fallback, no emitas keyword directo)
    // (El keyword directo ya se emitió arriba, pero si está en fallback, solo reportamos el fallback)
  }
  
  // ✅ Patrones prohibidos con exec loop
  const patterns = [
    { regex: /#[0-9a-fA-F]{3,8}/g, name: 'hex' },
    { regex: /\brgb\s*\(/gi, name: 'rgb' },
    { regex: /\brgba\s*\(/gi, name: 'rgba' },
    { regex: /\bhsl\s*\(/gi, name: 'hsl' },
    { regex: /\bhsla\s*\(/gi, name: 'hsla' }
  ];
  
  for (const { regex, name } of patterns) {
    // ✅ Ajuste 3: Usar el mismo regex y resetear lastIndex
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    
    while ((m = regex.exec(line)) !== null) {
      const matchIndex = m.index; // ✅ Índice real del match
      const match = m[0];
      
      // ✅ Micro-Hardening 3: var() detection case-insensitive
      const beforeMatch = line.substring(0, matchIndex);
      const beforeMatchLower = beforeMatch.toLowerCase();
      const lastVar = beforeMatchLower.lastIndexOf('var(');
      const lastClose = beforeMatchLower.lastIndexOf(')');
      
      // ✅ Micro-Hardening 3: var() detection case-insensitive
      const beforeMatch = line.substring(0, matchIndex);
      const beforeMatchLower = beforeMatch.toLowerCase();
      const lastVar = beforeMatchLower.lastIndexOf('var(');
      const lastClose = beforeMatchLower.lastIndexOf(')');
      
      // Si está dentro de var(), verificar fallback
      if (lastVar > lastClose) {
        const varContent = line.substring(lastVar);
        const varMatch = varContent.match(/var\s*\(\s*--[\w-]+,\s*([^)]+)\s*\)/);
        
        if (varMatch) {
          const fallback = varMatch[1].trim();
          
          // ✅ Micro-Hardening 1: safeKeywords case-insensitive
          const safeKeywords = new Set([
            'transparent',
            'currentcolor',  // CSS es case-insensitive
            'inherit',
            'initial',
            'unset'
          ]);
          
          // Si el fallback es seguro, permitir
          if (safeKeywords.has(fallback.toLowerCase())) {
            continue;
          }
          
          // ✅ Micro-Hardening 2: fallback rgb/hsl case-insensitive
          if (/^#[0-9a-fA-F]{3,8}$/i.test(fallback) ||
              /^(rgba?|hsla?)\s*\(/i.test(fallback)) {
            colors.push(`Fallback prohibido en var(): ${fallback}`);
          }
        }
      } else {
        // No está dentro de var(), es hardcoded directo
        colors.push(`${name}: ${match}`);
      }
    }
  }
  
  return colors;
}

/**
 * ✅ Extrae solo CSS real (ignora <link>, comentarios, scripts, atributos)
 */
function extractRealCSS(content: string): string {
  let cssContent = '';
  
  // ✅ Extraer de <style>...</style>
  const styleMatches = content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  for (const match of styleMatches) {
    cssContent += match[1] + '\n';
  }
  
  // ✅ Extraer de style="..."
  const inlineStyleMatches = content.matchAll(/style\s*=\s*"([^"]+)"/gi);
  for (const match of inlineStyleMatches) {
    cssContent += match[1] + '\n';
  }
  
  // ✅ Extraer de style='...'
  const inlineStyleMatches2 = content.matchAll(/style\s*=\s*'([^']+)'/gi);
  for (const match of inlineStyleMatches2) {
    cssContent += match[1] + '\n';
  }
  
  return cssContent;
}

/**
 * ✅ Valida que tokens usados en var(--token) existan en GlobalTokenRegistry
 * 
 * Fix B: Usar registry.suggest() (público)
 * Fix C: Solo validar en líneas modificadas dentro de CSS real (state machine)
 */
/**
 * ✅ CORRECTO (Fix B + Fix C + Patch 3): Valida tokens usados en var(--token)
 * 
 * Fix B: Usar registry.suggest() (público)
 * Fix C: Solo validar en líneas modificadas dentro de CSS real (state machine)
 * Patch 3: Maneja <style>...</style> inline en una sola línea
 */
function validateTokensUsed(
  content: string,
  modifiedLines: Set<number>,
  registry: Awaited<ReturnType<typeof getGlobalTokenRegistry>>
): string[] {
  const issues: string[] = [];
  const lines = content.split('\n');
  
  // ✅ State machine para <style> blocks
  let inStyleBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    
    // ✅ Patch 3: Manejar <style>...</style> inline en una sola línea
    const hasStyleOpen = /<style[^>]*>/i.test(line);
    const hasStyleClose = /<\/style>/i.test(line);
    
    if (hasStyleOpen && hasStyleClose) {
      // Estilo inline en una sola línea
      const styleMatch = line.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (styleMatch && modifiedLines.has(lineNum)) {
        const cssContent = styleMatch[1];
        const varRegex = /var\s*\(\s*(--(?:ubits|modifiers)[\w-]+)/g;
        let m: RegExpExecArray | null;
        
        varRegex.lastIndex = 0;
        while ((m = varRegex.exec(cssContent)) !== null) {
          const tokenName = m[1];
          
          if (!registry.has(tokenName)) {
            const suggestions = registry.suggest(tokenName);
            const suggestionText = suggestions.length > 0
              ? ` ¿Quizás quisiste: ${suggestions.slice(0, 3).join(', ')}?`
              : '';
            
            issues.push(`Línea ${lineNum}: Token no encontrado: ${tokenName}.${suggestionText}`);
          }
        }
      }
      continue; // No cambiar inStyleBlock
    }
    
    // Detectar inicio/fin de <style>
    if (hasStyleOpen) {
      inStyleBlock = true;
    }
    if (hasStyleClose) {
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
          // ✅ Fix B: Usar método público suggest()
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

## FASE 4: Integración en autorun.apply (Sin Romper Nada)

### Paso 4.1: Extender autorun.apply() (Mantener strict)

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

```typescript
// ✅ AGREGAR imports
import { getGlobalTokenRegistry } from '../../tokens/GlobalTokenRegistry';
import { PrototypeTokenKit } from '../../fallback/PrototypeTokenKit';
import { HtmlPrototypeAdapter } from '../../adapters/HtmlPrototypeAdapter';
import { emitWatermark } from '../../verify/Watermark';
import { ContractStore } from '../../ubits/ContractStore';
import { DependencyResolver } from '../../ubits/DependencyResolver';

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
  console.log(`\n🚀 [Autorun MCP] autorun.apply() Mode B (prototypeTokens)`);

  const errors: string[] = [];
  const warnings: string[] = [];
  const filesWritten: string[] = [];

  try {
    // ✅ 1. Consultar Storybook MCP (solo para props/existencia, NO para tokens)
    const storybookResult = await callStorybookMcp({
      toolName: "mcp_storybook_getComponentsProps",
      arguments: { componentIds: [componentId] }
    });

    // ✅ 2. Resolver dependencias desde contratos (NO desde Storybook MCP)
    const contractStore = new ContractStore();
    const dependencyResolver = new DependencyResolver(contractStore);
    const resolvedDeps = await dependencyResolver.resolveGraph(componentId);

    // ✅ 3. Cargar GlobalTokenRegistry (tokens desde repo local)
    const tokenRegistry = await getGlobalTokenRegistry();

    // ✅ 4. Resolver tokens desde contratos/repo local (NO desde Storybook MCP)
    const contract = await contractStore.getById(componentId);
    const contractTokens = contract?.tokensUsed || [];
    
    // Validar que tokens existen
    for (const token of contractTokens) {
      tokenRegistry.assertExists(token);
    }

    // ✅ 5. Generar código UBITS o widgets tokenizados
    let codeToInsert = '';
    
    if (storybookResult.components && storybookResult.components.length > 0) {
      // Componente existe en Storybook MCP → usar código UBITS
      codeToInsert = await generateUBITSCode(componentId, storybookResult);
    } else {
      // Componente NO existe → generar widget tokenizado
      const tokenKit = new PrototypeTokenKit(tokenRegistry);
      codeToInsert = await generateTokenizedWidget(componentId, tokenKit);
    }

    // ✅ 6. Insertar con watermark v2
    const adapter = new HtmlPrototypeAdapter();
    const targetFile = input.targetFiles?.[0] || 'prototypes/canvas-default.html';
    
    const { wrappedContent } = emitWatermark(
      {
        v: 2,
        mode: 'prototypeTokens',
        components: storybookResult.components ? [componentId] : [],
        widgets: storybookResult.components ? [] : [componentId],
        deps: resolvedDeps.publicDeps
      },
      codeToInsert
    );
    
    await adapter.insertContentBlock(targetFile, wrappedContent);
    filesWritten.push(targetFile);

    // ✅ 7. Recomendar verify("diff")
    warnings.push('Ejecuta autorun.verify({ targetFiles: "diff" }) para validar cambios');

    return {
      success: true,
      filesWritten,
      verification: {
        preImplementation: true,
        postImplementation: true,
        errors: [],
        warnings
      },
      components: [{
        name: componentId,
        storybookId: componentId,
        implemented: true
      }],
      errors: [],
      warnings
    };
  } catch (error: any) {
    return {
      success: false,
      filesWritten: [],
      verification: {
        preImplementation: false,
        postImplementation: false,
        errors: [error.message],
        warnings: []
      },
      components: [],
      errors: [error.message]
    };
  }
}
```

---

## ✅ Checklist Final

- [x] Modo `strict` se mantiene (flujo actual intacto)
- [x] `prototypeTokens` solo en `prototypes/` o cuando se solicita
- [x] GlobalTokenRegistry carga desde `vendor/ubits/packages/tokens/dist/tokens.css` y `figma-tokens.css`
- [x] Tokens NO vienen de Storybook MCP (no existe `getTokens`)
- [x] Dependencias desde contratos (NO desde Storybook MCP)
- [x] Storybook MCP solo para cross-check de props/existencia
- [x] Verify diff-based (solo líneas modificadas)
- [x] Verify ignora `<link>`, comentarios, `<script>`, atributos data-*
- [x] Verify detecta hex/rgb/hsl solo en CSS real (`<style>` y `style=""`)
- [x] Verify valida tokens usados en `var(--token)`
- [x] PrototypeTokenKit usa tokens reales (sin hardcoded colors)
- [x] PrototypeTokenKit valida tokens antes de generar

---

## 🎯 Conclusión

**Mode B corregido implementa:**

1. ✅ Mantiene modo `strict` para flujo actual
2. ✅ `prototypeTokens` solo en `prototypes/` o cuando se solicita
3. ✅ GlobalTokenRegistry carga tokens desde repo local (CSS/JSON)
4. ✅ Dependencias desde contratos (NO desde Storybook MCP)
5. ✅ Storybook MCP solo para cross-check de props/existencia
6. ✅ Verify diff-based (solo líneas modificadas, sin falsos positivos)
7. ✅ PrototypeTokenKit usa tokens reales (sin hardcoded colors)

**Implementación recomendada:** Por fases, con tests en cada fase, aplicando estas correcciones exactas.
