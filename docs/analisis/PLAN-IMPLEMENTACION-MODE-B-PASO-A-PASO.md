# 📋 Plan de Implementación Mode B: Paso a Paso

**Fecha:** 2025-01-03  
**Objetivo:** Implementar Mode B sin romper wizard ni add-ons

---

## 🎯 Estrategia: Implementación Incremental con Tests

Cada fase se implementa, se prueba, y se valida antes de continuar.

---

## FASE 1: Fundación (Sin Romper Nada)

### Paso 1.1: Extender Tipos

**Archivo:** `packages/autorun-core/src/mcp-server/types.ts`

**Cambios:**

```typescript
// ✅ AGREGAR (no modificar existente)
export type AutorunMode = "strict" | "prototypeTokens" | "createComponent";

export interface DesignInput {
  figma?: { url: string; frameNodeId?: string };
  image?: { kind: "file" | "url"; value: string };
}

export interface AutorunAnchors {
  content: string;
  scripts: string;
}

// ✅ EXTENDER (no reemplazar)
export interface AutorunApplyInputExtended extends AutorunApplyInput {
  options?: AutorunApplyInput['options'] & {
    mode?: AutorunMode;
    requireStorybookMcp?: boolean;
    allowPrototypeTokens?: boolean;
    anchors?: AutorunAnchors;
  };
  design?: DesignInput;
}
```

**Verificación:**
```bash
# Compilar y verificar que no rompe nada
npm run build
npm run test -- types.test.ts
```

---

### Paso 1.2: Crear Watermark.ts

**Archivo:** `packages/autorun-core/src/verify/Watermark.ts` (NUEVO)

**Implementación:**

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
  startIndex: number;
  endIndex: number;
}

/**
 * Emite watermark mejorado (v2)
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
 * Parsea watermarks del contenido
 */
export function parseWatermarks(fileContent: string): WatermarkBlock[] {
  const blocks: WatermarkBlock[] = [];
  const regex = /<!--\s*AUTORUN:\s*({[\s\S]*?})\s*-->([\s\S]*?)<!--\s*\/AUTORUN\s*-->/gi;
  
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    try {
      const meta = JSON.parse(match[1]);
      const content = match[2].trim();
      blocks.push({
        meta,
        content,
        startIndex: match.index,
        endIndex: regex.lastIndex
      });
    } catch (error) {
      console.warn(`Error parseando watermark: ${error}`);
    }
  }
  
  return blocks;
}

/**
 * Calcula hash del contenido
 */
export function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
}

/**
 * Valida hash de un bloque
 */
export function validateHash(block: WatermarkBlock): boolean {
  const expectedHash = computeHash(block.content);
  return block.meta.hash === expectedHash;
}
```

**Tests:**

```typescript
// packages/autorun-core/src/verify/__tests__/Watermark.test.ts
describe('Watermark', () => {
  it('debe emitir y parsear watermark correctamente', () => {
    const meta = {
      v: 2,
      mode: 'prototypeTokens' as AutorunMode,
      components: ['Button'],
      widgets: [],
      deps: []
    };
    const content = '<div>Test</div>';
    
    const { wrappedContent, hash } = emitWatermark(meta, content);
    const blocks = parseWatermarks(wrappedContent);
    
    expect(blocks).toHaveLength(1);
    expect(blocks[0].meta.components).toEqual(['Button']);
    expect(validateHash(blocks[0])).toBe(true);
  });
});
```

---

### Paso 1.3: Crear HtmlPrototypeAdapter.ts

**Archivo:** `packages/autorun-core/src/adapters/HtmlPrototypeAdapter.ts` (NUEVO)

**Implementación:**

```typescript
import * as fs from 'fs/promises';
import * as path from 'path';
import { emitWatermark, type WatermarkMeta } from '../verify/Watermark';
import type { AutorunMode } from '../../mcp-server/types';

export class HtmlPrototypeAdapter {
  private defaultAnchors = {
    content: '<!-- AUTORUN:ANCHOR:CONTENT -->',
    scripts: '<!-- AUTORUN:ANCHOR:SCRIPTS -->'
  };

  /**
   * Inserta bloque de contenido con watermark
   */
  async insertContentBlock(
    filePath: string,
    htmlBlock: string,
    meta: Omit<WatermarkMeta, 'hash'>
  ): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');
    const anchors = this.findAnchors(content);
    
    if (!anchors.content) {
      await this.ensureAnchors(filePath);
      return this.insertContentBlock(filePath, htmlBlock, meta);
    }
    
    const { wrappedContent } = emitWatermark(meta, htmlBlock);
    const newContent = content.replace(
      anchors.content,
      `${anchors.content}\n${wrappedContent}`
    );
    
    await fs.writeFile(filePath, newContent, 'utf-8');
  }

  /**
   * Inserta bloque de scripts con watermark
   */
  async insertScriptBlock(
    filePath: string,
    scriptBlock: string,
    meta: Omit<WatermarkMeta, 'hash'>
  ): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');
    const anchors = this.findAnchors(content);
    
    if (!anchors.scripts) {
      await this.ensureAnchors(filePath);
      return this.insertScriptBlock(filePath, scriptBlock, meta);
    }
    
    const { wrappedContent } = emitWatermark(meta, scriptBlock);
    const newContent = content.replace(
      anchors.scripts,
      `${anchors.scripts}\n${wrappedContent}`
    );
    
    await fs.writeFile(filePath, newContent, 'utf-8');
  }

  /**
   * Crea anchors si no existen
   */
  async ensureAnchors(filePath: string): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');
    const anchors = this.findAnchors(content);
    
    let newContent = content;
    
    // Insertar CONTENT anchor dentro de <main> o antes de </body>
    if (!anchors.content) {
      const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      if (mainMatch) {
        newContent = content.replace(
          /<\/main>/i,
          `${this.defaultAnchors.content}\n</main>`
        );
      } else {
        newContent = content.replace(
          /<\/body>/i,
          `${this.defaultAnchors.content}\n</body>`
        );
      }
    }
    
    // Insertar SCRIPTS anchor antes de </body>
    if (!anchors.scripts) {
      newContent = newContent.replace(
        /<\/body>/i,
        `${this.defaultAnchors.scripts}\n</body>`
      );
    }
    
    await fs.writeFile(filePath, newContent, 'utf-8');
  }

  /**
   * Encuentra anchors en el contenido
   */
  private findAnchors(content: string): {
    content: string | null;
    scripts: string | null;
  } {
    const contentMatch = content.match(/<!--\s*AUTORUN:ANCHOR:CONTENT\s*-->/i);
    const scriptsMatch = content.match(/<!--\s*AUTORUN:ANCHOR:SCRIPTS\s*-->/i);
    
    return {
      content: contentMatch ? contentMatch[0] : null,
      scripts: scriptsMatch ? scriptsMatch[0] : null
    };
  }
}
```

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
    
    await fs.unlink(testFile);
  });
});
```

---

### Paso 1.4: Crear VerifyDiff.ts

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts` (NUEVO)

**Implementación:**

```typescript
import { spawn } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import { parseWatermarks, validateHash, type WatermarkBlock } from './Watermark';

export interface VerifyDiffOptions {
  strict?: boolean;
  checkWatermarks?: boolean;
  checkHash?: boolean;
  checkHardcodedColors?: boolean;
  checkContractRules?: boolean;
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
 * Verifica cambios usando git diff
 */
export async function verifyDiff(options: VerifyDiffOptions = {}): Promise<VerifyDiffOutput> {
  const changedFiles = await getChangedFilesInPrototypes();
  const results: VerifyDiffOutput = {
    valid: true,
    errors: [],
    warnings: [],
    files: []
  };

  for (const file of changedFiles) {
    const fileResult = await verifyFile(file, options);
    results.files.push(fileResult);
    
    if (!fileResult.isValid) {
      results.valid = false;
      results.errors.push(...fileResult.issues);
    }
  }

  return results;
}

/**
 * Obtiene archivos cambiados en prototypes/
 */
async function getChangedFilesInPrototypes(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['diff', '--name-only', 'HEAD']);
    let output = '';

    git.stdout.on('data', (data) => {
      output += data.toString();
    });

    git.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`git diff failed with code ${code}`));
        return;
      }

      const files = output
        .split('\n')
        .filter(line => line.trim().startsWith('prototypes/'))
        .map(line => line.trim());

      resolve(files);
    });
  });
}

/**
 * Verifica un archivo individual
 */
async function verifyFile(
  filePath: string,
  options: VerifyDiffOptions
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

    // Verificar watermarks
    if (options.checkWatermarks !== false) {
      if (watermarks.length === 0) {
        issues.push('No se encontraron watermarks');
        isValid = false;
      } else {
        hasWatermark = true;
        
        // Validar hash de cada bloque
        if (options.checkHash !== false) {
          for (const block of watermarks) {
            if (!validateHash(block)) {
              issues.push(`Hash mismatch en bloque: ${block.meta.hash}`);
              isValid = false;
            }
          }
        }
      }
    }

    // Verificar colores hardcodeados
    if (options.checkHardcodedColors !== false) {
      const hardcodedColors = detectHardcodedColors(content);
      if (hardcodedColors.length > 0) {
        issues.push(`Colores hardcodeados encontrados: ${hardcodedColors.join(', ')}`);
        isValid = false;
      }
    }

    // Verificar contenido fuera de watermarks
    const contentWithoutWatermarks = removeWatermarks(content);
    if (contentWithoutWatermarks.trim().length > 0) {
      issues.push('Contenido fuera de bloques watermark detectado');
      isValid = false;
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
 * Detecta colores hardcodeados
 */
function detectHardcodedColors(content: string): string[] {
  const colors: string[] = [];
  
  // Detectar #hex
  const hexRegex = /#[0-9a-fA-F]{3,8}/g;
  const hexMatches = content.match(hexRegex);
  if (hexMatches) {
    colors.push(...hexMatches);
  }
  
  // Detectar rgb()
  const rgbRegex = /rgb\s*\([^)]+\)/gi;
  const rgbMatches = content.match(rgbRegex);
  if (rgbMatches) {
    colors.push(...rgbMatches);
  }
  
  // Detectar hsl()
  const hslRegex = /hsl\s*\([^)]+\)/gi;
  const hslMatches = content.match(hslRegex);
  if (hslMatches) {
    colors.push(...hslMatches);
  }
  
  return [...new Set(colors)];
}

/**
 * Remueve watermarks del contenido
 */
function removeWatermarks(content: string): string {
  return content
    .replace(/<!--\s*AUTORUN:[\s\S]*?-->\s*/gi, '')
    .replace(/<!--\s*\/AUTORUN\s*-->\s*/gi, '');
}
```

**Tests:**

```typescript
// packages/autorun-core/src/verify/__tests__/VerifyDiff.test.ts
describe('VerifyDiff', () => {
  it('debe detectar colores hardcodeados', () => {
    const content = '<div style="color: #ff0000; background: rgb(255, 0, 0)">Test</div>';
    const colors = detectHardcodedColors(content);
    
    expect(colors).toContain('#ff0000');
    expect(colors.some(c => c.includes('rgb'))).toBe(true);
  });
  
  it('debe validar watermarks correctamente', async () => {
    // Test con archivo mock
  });
});
```

---

## FASE 2: Resolución UBITS

### Paso 2.1: Crear ContractStore.ts

**Archivo:** `packages/autorun-core/src/ubits/ContractStore.ts` (NUEVO)

**Implementación:**

```typescript
import * as fs from 'fs/promises';
import * as path from 'path';
import { createUBITSContract, type UBITSContract } from '../../../vendor/ubits/packages/storybook/stories/_shared/ubitsContract';

export class ContractStore {
  private contracts: Map<string, UBITSContract> = new Map();
  private contractsPath: string;

  constructor(contractsPath?: string) {
    this.contractsPath = contractsPath || this.findContractsPath();
  }

  /**
   * Encuentra ruta a contratos UBITS
   */
  private findContractsPath(): string {
    // Buscar en vendor/ubits primero
    const vendorPath = path.join(process.cwd(), 'vendor/ubits/packages/storybook/stories/_shared');
    if (require('fs').existsSync(vendorPath)) {
      return vendorPath;
    }
    
    // Fallback: buscar en Desktop/UBITS
    const desktopPath = path.join(process.env.HOME || '', 'Desktop/UBITS/packages/storybook/stories/_shared');
    if (require('fs').existsSync(desktopPath)) {
      return desktopPath;
    }
    
    throw new Error('No se encontró ruta a contratos UBITS');
  }

  /**
   * Obtiene contrato por componentId
   */
  async getById(componentId: string): Promise<UBITSContract | null> {
    if (this.contracts.has(componentId)) {
      return this.contracts.get(componentId)!;
    }

    // Buscar en stories
    const contract = await this.loadContractFromStories(componentId);
    if (contract) {
      this.contracts.set(componentId, contract);
    }

    return contract || null;
  }

  /**
   * Busca por nombre aproximado
   */
  async findByNameLike(name: string): Promise<UBITSContract[]> {
    const results: UBITSContract[] = [];
    const searchName = name.toLowerCase();

    // Buscar en stories
    const storiesPath = path.join(this.contractsPath, '../components');
    const stories = await this.findStoriesWithComponent(storiesPath, searchName);

    for (const story of stories) {
      const contract = await this.loadContractFromStory(story);
      if (contract) {
        results.push(contract);
      }
    }

    return results;
  }

  /**
   * Valida que existe
   */
  async validateExists(componentId: string): Promise<boolean> {
    const contract = await this.getById(componentId);
    return contract !== null;
  }

  /**
   * Carga contrato desde story
   */
  private async loadContractFromStory(storyPath: string): Promise<UBITSContract | null> {
    try {
      const content = await fs.readFile(storyPath, 'utf-8');
      // Parsear parameters.ubits del story
      const ubitsMatch = content.match(/parameters:\s*\{[\s\S]*?ubits:\s*createUBITSContract\(({[\s\S]*?})\)/);
      if (ubitsMatch) {
        const contractConfig = eval(`(${ubitsMatch[1]})`); // Solo para parsing, no ejecución
        return createUBITSContract(contractConfig);
      }
    } catch (error) {
      console.warn(`Error cargando contrato desde ${storyPath}: ${error}`);
    }
    return null;
  }

  /**
   * Busca stories con componente
   */
  private async findStoriesWithComponent(storiesPath: string, searchName: string): Promise<string[]> {
    // Implementar búsqueda recursiva
    const stories: string[] = [];
    // ... implementación
    return stories;
  }

  /**
   * Carga contrato desde stories (buscar en todas)
   */
  private async loadContractFromStories(componentId: string): Promise<UBITSContract | null> {
    // Buscar en todas las stories
    const storiesPath = path.join(this.contractsPath, '../components');
    const stories = await this.findAllStories(storiesPath);
    
    for (const story of stories) {
      const contract = await this.loadContractFromStory(story);
      if (contract && contract.componentId === componentId) {
        return contract;
      }
    }
    
    return null;
  }

  /**
   * Encuentra todas las stories
   */
  private async findAllStories(storiesPath: string): Promise<string[]> {
    const stories: string[] = [];
    // Implementar búsqueda recursiva
    // ... implementación
    return stories;
  }
}
```

---

### Paso 2.2: Crear DependencyResolver.ts

**Archivo:** `packages/autorun-core/src/ubits/DependencyResolver.ts` (NUEVO)

**Implementación:**

```typescript
import { ContractStore } from './ContractStore';
import type { UBITSContract } from '../../../vendor/ubits/packages/storybook/stories/_shared/ubitsContract';

export interface DependencyGraph {
  root: string;
  publicDeps: string[];
  internals: string[];
  slotPlan: Record<string, string[]>;
}

export class DependencyResolver {
  private contractStore: ContractStore;
  private resolvedCache: Map<string, DependencyGraph> = new Map();

  constructor(contractStore: ContractStore) {
    this.contractStore = contractStore;
  }

  /**
   * Expande dependsOn.required recursivo
   */
  async expandRequired(componentId: string): Promise<string[]> {
    const visited = new Set<string>();
    const deps: string[] = [];

    await this.expandRequiredRecursive(componentId, visited, deps);

    return [...new Set(deps)];
  }

  /**
   * Expansión recursiva
   */
  private async expandRequiredRecursive(
    componentId: string,
    visited: Set<string>,
    deps: string[]
  ): Promise<void> {
    if (visited.has(componentId)) {
      return;
    }

    visited.add(componentId);
    const contract = await this.contractStore.getById(componentId);

    if (!contract || !contract.dependsOn) {
      return;
    }

    for (const required of contract.dependsOn.required || []) {
      deps.push(required);
      await this.expandRequiredRecursive(required, visited, deps);
    }
  }

  /**
   * Resuelve slots
   */
  async resolveSlots(componentId: string, slotName: string): Promise<string[]> {
    const contract = await this.contractStore.getById(componentId);
    if (!contract || !contract.slots) {
      return [];
    }

    return contract.slots[slotName] || [];
  }

  /**
   * Filtra internals (nunca se implementan)
   */
  filterInternals(componentIds: string[]): string[] {
    return componentIds.filter(id => {
      // Internals tienen prefijo especial o están en lista
      return !id.startsWith('⚙️-functional-');
    });
  }

  /**
   * Resuelve grafo completo
   */
  async resolveGraph(rootComponentId: string): Promise<DependencyGraph> {
    if (this.resolvedCache.has(rootComponentId)) {
      return this.resolvedCache.get(rootComponentId)!;
    }

    const publicDeps = await this.expandRequired(rootComponentId);
    const internals = this.extractInternals(rootComponentId);
    const slotPlan = await this.buildSlotPlan(rootComponentId);

    const graph: DependencyGraph = {
      root: rootComponentId,
      publicDeps: this.filterInternals(publicDeps),
      internals,
      slotPlan
    };

    this.resolvedCache.set(rootComponentId, graph);
    return graph;
  }

  /**
   * Extrae internals del componente raíz
   */
  private async extractInternals(componentId: string): Promise<string[]> {
    const contract = await this.contractStore.getById(componentId);
    if (!contract || !contract.internals) {
      return [];
    }

    return contract.internals;
  }

  /**
   * Construye plan de slots
   */
  private async buildSlotPlan(componentId: string): Promise<Record<string, string[]>> {
    const contract = await this.contractStore.getById(componentId);
    if (!contract || !contract.slots) {
      return {};
    }

    const plan: Record<string, string[]> = {};
    for (const [slotName, slotComponents] of Object.entries(contract.slots)) {
      plan[slotName] = slotComponents;
    }

    return plan;
  }
}
```

---

## FASE 3: Fallback (Solo Mode B)

### Paso 3.1: Crear PrototypeTokenKit.ts

**Archivo:** `packages/autorun-core/src/fallback/PrototypeTokenKit.ts` (NUEVO)

**Implementación:**

```typescript
export interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  variant?: 'primary' | 'secondary';
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
  /**
   * Genera KPI Card tokenizado
   */
  generateKpiCard(props: KpiCardProps): string {
    return `
<div class="ubits-kpi-card" style="
  background: var(--ubits-bg-1, #ffffff);
  border: 1px solid var(--ubits-border-1, #e0e0e0);
  border-radius: var(--ubits-border-radius-md, 8px);
  padding: var(--ubits-spacing-md, 16px);
">
  <div class="ubits-kpi-card__title" style="
    color: var(--ubits-fg-1-medium, #666666);
    font-size: var(--ubits-font-size-sm, 14px);
    margin-bottom: var(--ubits-spacing-xs, 8px);
  ">${props.title}</div>
  <div class="ubits-kpi-card__value" style="
    color: var(--ubits-fg-1-high, #000000);
    font-size: var(--ubits-font-size-xl, 24px);
    font-weight: var(--ubits-font-weight-bold, 700);
  ">${props.value}</div>
</div>`.trim();
  }

  /**
   * Genera Filters Row tokenizado
   */
  generateFiltersRow(props: FiltersRowProps): string {
    const filtersHtml = props.filters.map(filter => {
      return `
<div class="ubits-filter-item" style="
  display: flex;
  flex-direction: column;
  gap: var(--ubits-spacing-xs, 8px);
  margin-right: var(--ubits-spacing-md, 16px);
">
  <label style="
    color: var(--ubits-fg-1-medium, #666666);
    font-size: var(--ubits-font-size-sm, 14px);
  ">${filter.label}</label>
  <input type="${filter.type}" value="${filter.value || ''}" style="
    padding: var(--ubits-spacing-sm, 12px);
    border: 1px solid var(--ubits-border-1, #e0e0e0);
    border-radius: var(--ubits-border-radius-sm, 4px);
    font-size: var(--ubits-font-size-md, 16px);
  " />
</div>`.trim();
    }).join('\n');

    return `
<div class="ubits-filters-row" style="
  display: flex;
  flex-wrap: wrap;
  gap: var(--ubits-spacing-md, 16px);
  padding: var(--ubits-spacing-md, 16px);
  background: var(--ubits-bg-2, #f5f5f5);
  border-radius: var(--ubits-border-radius-md, 8px);
">
  ${filtersHtml}
</div>`.trim();
  }

  /**
   * Genera Empty State tokenizado
   */
  generateEmptyState(props: EmptyStateProps): string {
    const actionHtml = props.action ? `
<button class="ubits-button ubits-button--primary" onclick="${props.action.onClick || ''}" style="
  padding: var(--ubits-spacing-sm, 12px) var(--ubits-spacing-md, 16px);
  background: var(--ubits-accent-brand, #007bff);
  color: var(--ubits-fg-on-brand, #ffffff);
  border: none;
  border-radius: var(--ubits-border-radius-sm, 4px);
  font-size: var(--ubits-font-size-md, 16px);
  cursor: pointer;
">${props.action.label}</button>`.trim() : '';

    return `
<div class="ubits-empty-state" style="
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--ubits-spacing-xl, 32px);
  text-align: center;
">
  ${props.icon ? `<div class="ubits-empty-state__icon" style="
    font-size: 48px;
    color: var(--ubits-fg-1-low, #999999);
    margin-bottom: var(--ubits-spacing-md, 16px);
  ">${props.icon}</div>` : ''}
  <h3 class="ubits-empty-state__title" style="
    color: var(--ubits-fg-1-high, #000000);
    font-size: var(--ubits-font-size-lg, 18px);
    margin-bottom: var(--ubits-spacing-xs, 8px);
  ">${props.title}</h3>
  ${props.description ? `<p class="ubits-empty-state__description" style="
    color: var(--ubits-fg-1-medium, #666666);
    font-size: var(--ubits-font-size-md, 16px);
    margin-bottom: var(--ubits-spacing-md, 16px);
  ">${props.description}</p>` : ''}
  ${actionHtml}
</div>`.trim();
  }

  // ... más métodos para otros widgets
}
```

---

### Paso 3.2: Crear TokenPolicyResolver.ts

**Archivo:** `packages/autorun-core/src/fallback/TokenPolicyResolver.ts` (NUEVO)

**Implementación:**

```typescript
import { ContractStore } from '../ubits/ContractStore';

export class TokenPolicyResolver {
  private contractStore: ContractStore;
  private baseTokens: Set<string> = new Set([
    '--ubits-bg-1',
    '--ubits-bg-2',
    '--ubits-fg-1-high',
    '--ubits-fg-1-medium',
    '--ubits-fg-1-low',
    '--ubits-border-1',
    '--ubits-border-2',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-spacing-xl',
    '--ubits-border-radius-sm',
    '--ubits-border-radius-md',
    '--ubits-border-radius-lg',
    '--ubits-font-size-sm',
    '--ubits-font-size-md',
    '--ubits-font-size-lg',
    '--ubits-font-size-xl',
    '--ubits-font-weight-normal',
    '--ubits-font-weight-bold',
    '--ubits-accent-brand',
    '--ubits-fg-on-brand'
  ]);

  constructor(contractStore: ContractStore) {
    this.contractStore = contractStore;
  }

  /**
   * Resuelve tokens preferidos para un componente
   */
  async resolveTokensForComponent(componentId: string): Promise<Set<string>> {
    const contract = await this.contractStore.getById(componentId);
    
    if (contract && contract.tokensUsed && contract.tokensUsed.length > 0) {
      return new Set(contract.tokensUsed);
    }

    return this.baseTokens;
  }

  /**
   * Resuelve fallback para un token
   */
  resolveFallback(token: string): string {
    // Mapeo de tokens a fallbacks
    const fallbacks: Record<string, string> = {
      '--ubits-bg-1': '#ffffff',
      '--ubits-bg-2': '#f5f5f5',
      '--ubits-fg-1-high': '#000000',
      '--ubits-fg-1-medium': '#666666',
      '--ubits-fg-1-low': '#999999',
      '--ubits-border-1': '#e0e0e0',
      '--ubits-border-2': '#cccccc',
      '--ubits-spacing-xs': '8px',
      '--ubits-spacing-sm': '12px',
      '--ubits-spacing-md': '16px',
      '--ubits-spacing-lg': '24px',
      '--ubits-spacing-xl': '32px',
      '--ubits-border-radius-sm': '4px',
      '--ubits-border-radius-md': '8px',
      '--ubits-border-radius-lg': '12px',
      '--ubits-font-size-sm': '14px',
      '--ubits-font-size-md': '16px',
      '--ubits-font-size-lg': '18px',
      '--ubits-font-size-xl': '24px',
      '--ubits-font-weight-normal': '400',
      '--ubits-font-weight-bold': '700',
      '--ubits-accent-brand': '#007bff',
      '--ubits-fg-on-brand': '#ffffff'
    };

    return fallbacks[token] || '';
  }

  /**
   * Valida que un valor CSS use tokens
   */
  validateTokenUsage(cssValue: string): boolean {
    // Debe ser var(--token, fallback) o solo var(--token)
    const tokenRegex = /var\s*\(\s*--[^,)]+(?:\s*,\s*[^)]+)?\s*\)/;
    return tokenRegex.test(cssValue);
  }

  /**
   * Convierte valor hardcodeado a tokenizado
   */
  convertToTokenized(hardcodedValue: string, token: string): string {
    const fallback = this.resolveFallback(token);
    return `var(${token}, ${fallback})`;
  }
}
```

---

## FASE 4: Design Intake (Opcional)

### Paso 4.1: Crear FigmaIngestor.ts

**Archivo:** `packages/autorun-core/src/design/figma/FigmaIngestor.ts` (NUEVO)

**Implementación:**

```typescript
export interface DesignModel {
  layout: LayoutNode;
  texts: TextNode[];
  styles: StyleNode[];
  instances: InstanceNode[];
}

export interface LayoutNode {
  type: 'frame' | 'group' | 'component' | 'instance';
  id: string;
  name: string;
  children: LayoutNode[];
  bounds: { x: number; y: number; width: number; height: number };
}

export interface TextNode {
  id: string;
  text: string;
  style: TextStyle;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface StyleNode {
  id: string;
  type: 'fill' | 'stroke' | 'text';
  value: string;
  token?: string;
}

export interface InstanceNode {
  id: string;
  componentName: string;
  props: Record<string, any>;
}

export class FigmaIngestor {
  /**
   * Obtiene árbol del frame desde Figma MCP
   */
  async ingestFigmaDesign(
    url: string,
    frameNodeId?: string
  ): Promise<DesignModel> {
    // Detectar tools disponibles de Figma MCP
    const tools = await this.detectFigmaTools();
    
    // Usar tool apropiado para obtener árbol
    const treeTool = tools.find(t => t.name.includes('tree') || t.name.includes('node'));
    if (!treeTool) {
      throw new Error('No se encontró tool de Figma para obtener árbol');
    }

    // Llamar MCP tool
    const result = await this.callFigmaMcpTool(treeTool.name, {
      url,
      nodeId: frameNodeId
    });

    // Convertir a DesignModel
    return this.convertToDesignModel(result);
  }

  /**
   * Detecta tools disponibles de Figma MCP
   */
  private async detectFigmaTools(): Promise<Array<{ name: string; description: string }>> {
    // Listar tools del servidor MCP de Figma
    // Esto depende de cómo esté configurado el MCP server
    // Por ahora, retornar lista hardcodeada conocida
    return [
      { name: 'get_design_context', description: 'Obtiene contexto de diseño' },
      { name: 'get_screenshot', description: 'Obtiene screenshot' },
      { name: 'get_variable_defs', description: 'Obtiene definiciones de variables' }
    ];
  }

  /**
   * Llama tool de Figma MCP
   */
  private async callFigmaMcpTool(toolName: string, args: any): Promise<any> {
    // Implementar llamada a MCP tool
    // Esto requiere integración con el sistema MCP de Cursor
    throw new Error('Not implemented: requiere integración con MCP system');
  }

  /**
   * Convierte resultado de Figma a DesignModel
   */
  private convertToDesignModel(figmaResult: any): DesignModel {
    // Convertir estructura de Figma a DesignModel normalizado
    return {
      layout: this.extractLayout(figmaResult),
      texts: this.extractTexts(figmaResult),
      styles: this.extractStyles(figmaResult),
      instances: this.extractInstances(figmaResult)
    };
  }

  private extractLayout(result: any): LayoutNode {
    // Implementar extracción de layout
    return { type: 'frame', id: '', name: '', children: [], bounds: { x: 0, y: 0, width: 0, height: 0 } };
  }

  private extractTexts(result: any): TextNode[] {
    // Implementar extracción de textos
    return [];
  }

  private extractStyles(result: any): StyleNode[] {
    // Implementar extracción de estilos
    return [];
  }

  private extractInstances(result: any): InstanceNode[] {
    // Implementar extracción de instancias
    return [];
  }
}
```

---

### Paso 4.2: Crear ImageIngestor.ts

**Archivo:** `packages/autorun-core/src/design/image/ImageIngestor.ts` (NUEVO)

**Implementación:**

```typescript
export interface LayoutModel {
  sections: Section[];
  components: ComponentCandidate[];
  confidence: number;
}

export interface Section {
  type: 'header' | 'filters' | 'kpis' | 'main' | 'empty' | 'loading';
  bounds: { x: number; y: number; width: number; height: number };
  confidence: number;
}

export interface ComponentCandidate {
  type: string;
  bounds: { x: number; y: number; width: number; height: number };
  confidence: number;
  props?: Record<string, any>;
}

export class ImageIngestor {
  /**
   * Procesa imagen y genera LayoutModel
   */
  async ingestImage(
    kind: 'file' | 'url',
    value: string
  ): Promise<LayoutModel> {
    // Cargar imagen
    const imageData = await this.loadImage(kind, value);
    
    // Analizar imagen (usar visión o heurísticas)
    const analysis = await this.analyzeImage(imageData);
    
    // Generar LayoutModel
    return this.generateLayoutModel(analysis);
  }

  /**
   * Carga imagen desde file o url
   */
  private async loadImage(kind: 'file' | 'url', value: string): Promise<Buffer> {
    if (kind === 'file') {
      return await require('fs').promises.readFile(value);
    } else {
      const response = await fetch(value);
      return Buffer.from(await response.arrayBuffer());
    }
  }

  /**
   * Analiza imagen para detectar secciones y componentes
   */
  private async analyzeImage(imageData: Buffer): Promise<ImageAnalysis> {
    // Por ahora, usar heurísticas básicas
    // En el futuro, podría usar visión por computadora
    
    return {
      sections: this.detectSections(imageData),
      components: this.detectComponents(imageData),
      confidence: 0.7 // Confianza media por defecto
    };
  }

  /**
   * Detecta secciones en la imagen
   */
  private detectSections(imageData: Buffer): Section[] {
    // Implementar detección de secciones usando heurísticas
    // Por ahora, retornar estructura básica
    return [
      {
        type: 'header',
        bounds: { x: 0, y: 0, width: 0, height: 60 },
        confidence: 0.8
      }
    ];
  }

  /**
   * Detecta componentes probables
   */
  private detectComponents(imageData: Buffer): ComponentCandidate[] {
    // Implementar detección de componentes
    return [];
  }

  /**
   * Genera LayoutModel desde análisis
   */
  private generateLayoutModel(analysis: ImageAnalysis): LayoutModel {
    return {
      sections: analysis.sections,
      components: analysis.components,
      confidence: analysis.confidence
    };
  }
}

interface ImageAnalysis {
  sections: Section[];
  components: ComponentCandidate[];
  confidence: number;
}
```

---

### Paso 4.3: Crear BlueprintFromDesign.ts

**Archivo:** `packages/autorun-core/src/design/BlueprintFromDesign.ts` (NUEVO)

**Implementación:**

```typescript
import type { DesignModel } from './figma/FigmaIngestor';
import type { LayoutModel } from './image/ImageIngestor';

export interface Blueprint {
  sections: BlueprintSection[];
  intent: string;
  confidence: number;
}

export interface BlueprintSection {
  type: 'header' | 'filters' | 'kpis' | 'main' | 'empty' | 'loading';
  intent: string;
  components: string[];
  confidence: number;
}

export class BlueprintFromDesign {
  /**
   * Convierte DesignModel a Blueprint
   */
  fromFigmaDesign(design: DesignModel): Blueprint {
    const sections: BlueprintSection[] = [];

    // Mapear instancias a secciones
    for (const instance of design.instances) {
      const section = this.mapInstanceToSection(instance);
      if (section) {
        sections.push(section);
      }
    }

    return {
      sections,
      intent: this.inferIntent(design),
      confidence: 0.8
    };
  }

  /**
   * Convierte LayoutModel a Blueprint
   */
  fromImageLayout(layout: LayoutModel): Blueprint {
    const sections: BlueprintSection[] = [];

    // Mapear secciones detectadas
    for (const section of layout.sections) {
      sections.push({
        type: section.type,
        intent: this.inferIntentForSection(section),
        components: this.mapComponentsToSection(section, layout.components),
        confidence: section.confidence
      });
    }

    return {
      sections,
      intent: this.inferIntentFromLayout(layout),
      confidence: layout.confidence
    };
  }

  /**
   * Mapea instancia a sección
   */
  private mapInstanceToSection(instance: any): BlueprintSection | null {
    // Implementar mapeo
    return null;
  }

  /**
   * Infiere intent desde diseño
   */
  private inferIntent(design: DesignModel): string {
    // Implementar inferencia
    return 'unknown';
  }

  /**
   * Infiere intent para sección
   */
  private inferIntentForSection(section: any): string {
    // Implementar inferencia
    return 'unknown';
  }

  /**
   * Mapea componentes a sección
   */
  private mapComponentsToSection(section: any, components: any[]): string[] {
    // Implementar mapeo
    return [];
  }

  /**
   * Infiere intent desde layout
   */
  private inferIntentFromLayout(layout: LayoutModel): string {
    // Implementar inferencia
    return 'unknown';
  }
}
```

---

### Paso 4.4: Crear BlueprintMapper.ts

**Archivo:** `packages/autorun-core/src/design/BlueprintMapper.ts` (NUEVO)

**Implementación:**

```typescript
import type { Blueprint } from './BlueprintFromDesign';
import { ContractStore } from '../ubits/ContractStore';
import { PrototypeTokenKit } from '../fallback/PrototypeTokenKit';

export interface ComponentMapping {
  ubitsComponents: string[];
  tokenWidgets: string[];
  missingComponents: string[];
}

export class BlueprintMapper {
  private contractStore: ContractStore;
  private tokenKit: PrototypeTokenKit;

  constructor(contractStore: ContractStore, tokenKit: PrototypeTokenKit) {
    this.contractStore = contractStore;
    this.tokenKit = tokenKit;
  }

  /**
   * Mapea Blueprint a UBITS/Widgets
   */
  async mapBlueprint(blueprint: Blueprint): Promise<ComponentMapping> {
    const ubitsComponents: string[] = [];
    const tokenWidgets: string[] = [];
    const missingComponents: string[] = [];

    for (const section of blueprint.sections) {
      // Intentar mapear a UBITS primero
      const ubitsMapping = await this.mapToUBITS(section);
      
      if (ubitsMapping.confidence >= 0.8) {
        ubitsComponents.push(...ubitsMapping.components);
      } else {
        // Si confianza baja, usar widget tokenizado
        const widget = this.mapToTokenWidget(section);
        tokenWidgets.push(widget);
        missingComponents.push(...ubitsMapping.components);
      }
    }

    return {
      ubitsComponents: [...new Set(ubitsComponents)],
      tokenWidgets: [...new Set(tokenWidgets)],
      missingComponents: [...new Set(missingComponents)]
    };
  }

  /**
   * Mapea sección a componentes UBITS
   */
  private async mapToUBITS(section: any): Promise<{
    components: string[];
    confidence: number;
  }> {
    // Intentar encontrar componente UBITS que coincida
    const candidates = await this.findUBITSCandidates(section.intent);
    
    if (candidates.length === 0) {
      return { components: [], confidence: 0 };
    }

    // Validar que existe en ContractStore
    const validComponents = [];
    for (const candidate of candidates) {
      const exists = await this.contractStore.validateExists(candidate);
      if (exists) {
        validComponents.push(candidate);
      }
    }

    const confidence = validComponents.length > 0 ? 0.9 : 0.3;

    return {
      components: validComponents,
      confidence
    };
  }

  /**
   * Mapea sección a widget tokenizado
   */
  private mapToTokenWidget(section: any): string {
    // Mapear tipo de sección a widget
    const widgetMap: Record<string, string> = {
      'header': 'SectionHeader',
      'filters': 'FiltersRow',
      'kpis': 'KpiCard',
      'main': 'Panel',
      'empty': 'EmptyState',
      'loading': 'Skeleton'
    };

    return widgetMap[section.type] || 'Panel';
  }

  /**
   * Encuentra candidatos UBITS por intent
   */
  private async findUBITSCandidates(intent: string): Promise<string[]> {
    // Buscar en ContractStore por nombre aproximado
    return await this.contractStore.findByNameLike(intent);
  }
}
```

---

## FASE 5: Integración Final

### Paso 5.1: Extender autorun.apply()

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

**Cambios:**

```typescript
// ✅ AGREGAR al inicio del archivo
import type { AutorunApplyInputExtended, AutorunMode } from '../types';
import { HtmlPrototypeAdapter } from '../../adapters/HtmlPrototypeAdapter';
import { ContractStore } from '../../ubits/ContractStore';
import { DependencyResolver } from '../../ubits/DependencyResolver';
import { PrototypeTokenKit } from '../../fallback/PrototypeTokenKit';
import { TokenPolicyResolver } from '../../fallback/TokenPolicyResolver';
import { FigmaIngestor } from '../../design/figma/FigmaIngestor';
import { ImageIngestor } from '../../design/image/ImageIngestor';
import { BlueprintFromDesign } from '../../design/BlueprintFromDesign';
import { BlueprintMapper } from '../../design/BlueprintMapper';

// ✅ MODIFICAR función principal (extender, no reemplazar)
export async function autorunApply(
  input: AutorunApplyInputExtended
): Promise<AutorunApplyOutput> {
  // ✅ DETECCIÓN DE MODO (nuevo)
  const mode = input.options?.mode || "strict";
  const isModeB = mode === "prototypeTokens";

  // ✅ FLUJO ACTUAL (se mantiene para modo strict)
  if (mode === "strict") {
    return await autorunApplyStrict(input);
  }

  // ✅ FLUJO MODE B (nuevo)
  if (isModeB) {
    return await autorunApplyModeB(input);
  }

  // Fallback (no debería llegar aquí)
  return await autorunApplyStrict(input);
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
    // 1. Construir Blueprint
    let blueprint;
    if (input.design?.figma) {
      const figmaIngestor = new FigmaIngestor();
      const designModel = await figmaIngestor.ingestFigmaDesign(
        input.design.figma.url,
        input.design.figma.frameNodeId
      );
      const blueprintBuilder = new BlueprintFromDesign();
      blueprint = blueprintBuilder.fromFigmaDesign(designModel);
    } else if (input.design?.image) {
      const imageIngestor = new ImageIngestor();
      const layoutModel = await imageIngestor.ingestImage(
        input.design.image.kind,
        input.design.image.value
      );
      const blueprintBuilder = new BlueprintFromDesign();
      blueprint = blueprintBuilder.fromImageLayout(layoutModel);
    } else {
      // Sin design → usar flujo texto (como ahora)
      blueprint = await buildBlueprintFromText(input.message);
    }

    // 2. Mapear blueprint a UBITS/Widgets
    const contractStore = new ContractStore();
    const tokenKit = new PrototypeTokenKit();
    const mapper = new BlueprintMapper(contractStore, tokenKit);
    const mapping = await mapper.mapBlueprint(blueprint);

    // 3. Resolver deps UBITS
    const dependencyResolver = new DependencyResolver(contractStore);
    const resolvedDeps = await Promise.all(
      mapping.ubitsComponents.map(id => dependencyResolver.resolveGraph(id))
    );

    // 4. Seleccionar examples
    const examples = await selectExamples(resolvedDeps, contractStore);

    // 5. Generar código UBITS
    const ubitsCode = await generateUBITSCode(examples);

    // 6. Generar widgets (fallback)
    const widgetsCode = await generateWidgets(mapping.missingComponents, tokenKit);

    // 7. Insertar en HTML con watermark
    const adapter = new HtmlPrototypeAdapter();
    const targetFile = input.targetFiles?.[0] || 'prototypes/canvas-default.html';
    
    await adapter.insertContentBlock(
      targetFile,
      ubitsCode + widgetsCode,
      {
        v: 2,
        mode: 'prototypeTokens',
        components: mapping.ubitsComponents,
        widgets: mapping.tokenWidgets,
        deps: resolvedDeps.flatMap(d => d.publicDeps)
      }
    );

    filesWritten.push(targetFile);

    // 8. Retornar reporte
    return {
      success: true,
      filesWritten,
      verification: {
        preImplementation: true,
        postImplementation: true,
        errors: [],
        warnings
      },
      components: mapping.ubitsComponents.map(id => ({
        name: id,
        storybookId: id,
        implemented: true
      })),
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

// ✅ MANTENER función existente (sin cambios)
async function autorunApplyStrict(
  input: AutorunApplyInputExtended
): Promise<AutorunApplyOutput> {
  // Flujo actual sin cambios
  // ... código existente ...
}
```

---

### Paso 5.2: Actualizar Schema MCP

**Archivo:** `packages/autorun-core/src/mcp-server/autorunMCPServer.ts`

**Cambios:**

```typescript
// ✅ ACTUALIZAR schema de autorun.apply
{
  name: 'autorun.apply',
  description: 'Ejecuta TODO el flujo de implementación automáticamente',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Mensaje del usuario describiendo qué implementar',
      },
      targetFiles: {
        type: 'array',
        items: { type: 'string' },
        description: 'Archivos objetivo (opcional, se detecta automáticamente si no se especifica)',
      },
      options: {
        type: 'object',
        properties: {
          // ✅ OPCIONES EXISTENTES (se mantienen)
          skipVerification: { type: 'boolean' },
          dryRun: { type: 'boolean' },
          skipFormatting: { type: 'boolean' },
          skipLinting: { type: 'boolean' },
          skipAutoReload: { type: 'boolean' },
          skipAutoCommit: { type: 'boolean' },
          runVisualTests: { type: 'boolean' },
          
          // ✅ NUEVAS OPCIONES (se agregan)
          mode: {
            type: 'string',
            enum: ['strict', 'prototypeTokens', 'createComponent'],
            description: 'Modo de implementación (default: strict)',
            default: 'strict'
          },
          requireStorybookMcp: {
            type: 'boolean',
            description: 'Requerir Storybook MCP (default: true, fail-closed)',
            default: true
          },
          allowPrototypeTokens: {
            type: 'boolean',
            description: 'Permitir tokens de prototipo (default: mode==="prototypeTokens")'
          },
          anchors: {
            type: 'object',
            properties: {
              content: { type: 'string' },
              scripts: { type: 'string' }
            }
          }
        }
      },
      // ✅ NUEVO: design
      design: {
        type: 'object',
        properties: {
          figma: {
            type: 'object',
            properties: {
              url: { type: 'string' },
              frameNodeId: { type: 'string' }
            }
          },
          image: {
            type: 'object',
            properties: {
              kind: {
                type: 'string',
                enum: ['file', 'url']
              },
              value: { type: 'string' }
            }
          }
        }
      }
    },
    required: ['message'],
  },
}
```

---

### Paso 5.3: Actualizar autorun.verify()

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunVerify.ts`

**Cambios:**

```typescript
// ✅ AGREGAR import
import { verifyDiff } from '../../verify/VerifyDiff';

// ✅ EXTENDER función existente
export async function autorunVerify(
  input: AutorunVerifyInput
): Promise<AutorunVerifyOutput> {
  // ✅ NUEVO: Si targetFiles es "diff", usar VerifyDiff
  if (input.targetFiles === 'diff') {
    return await verifyDiffMode(input);
  }

  // ✅ FLUJO EXISTENTE (se mantiene)
  return await verifyStandard(input);
}

// ✅ NUEVO: Modo diff
async function verifyDiffMode(
  input: AutorunVerifyInput
): Promise<AutorunVerifyOutput> {
  const result = await verifyDiff({
    strict: input.options?.strict ?? true,
    checkWatermarks: true,
    checkHash: true,
    checkHardcodedColors: true,
    checkContractRules: input.options?.strict ?? true
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
```

---

## FASE 6: Reglas y Tests

### Paso 6.1: Actualizar Reglas de Cursor

**Archivo:** `.cursorrules`

**Cambios:**

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
    options: { 
      mode: "prototypeTokens"  // Opcional: usar Mode B
    }
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

---

### Paso 6.2: Crear Tests

**Archivos de test:**

1. `packages/autorun-core/src/verify/__tests__/Watermark.test.ts`
2. `packages/autorun-core/src/verify/__tests__/VerifyDiff.test.ts`
3. `packages/autorun-core/src/ubits/__tests__/DependencyResolver.test.ts`
4. `packages/autorun-core/src/fallback/__tests__/PrototypeTokenKit.test.ts`

**Ejemplo de test:**

```typescript
// packages/autorun-core/src/fallback/__tests__/PrototypeTokenKit.test.ts
describe('PrototypeTokenKit', () => {
  it('nunca debe emitir colores hardcodeados', () => {
    const kit = new PrototypeTokenKit();
    const kpiCard = kit.generateKpiCard({
      title: 'Test',
      value: '100'
    });

    // Verificar que no hay #hex, rgb(), hsl()
    expect(kpiCard).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    expect(kpiCard).not.toMatch(/rgb\s*\(/);
    expect(kpiCard).not.toMatch(/hsl\s*\(/);

    // Verificar que usa var(--token, fallback)
    expect(kpiCard).toMatch(/var\s*\(--ubits-/);
  });
});
```

---

## ✅ Checklist de Implementación

### Fase 1: Fundación
- [ ] Extender tipos sin romper existentes
- [ ] Crear Watermark.ts con tests
- [ ] Crear HtmlPrototypeAdapter.ts con tests
- [ ] Crear VerifyDiff.ts con tests
- [ ] Validar que modo strict sigue funcionando

### Fase 2: Resolución UBITS
- [ ] Crear ContractStore.ts
- [ ] Crear DependencyResolver.ts con tests
- [ ] Crear ExampleSelector.ts + ExampleParser.ts
- [ ] Validar que no afecta flujo Storybook MCP

### Fase 3: Fallback
- [ ] Crear PrototypeTokenKit.ts con tests
- [ ] Crear TokenPolicyResolver.ts
- [ ] Crear StorybookMcpClient.ts
- [ ] Validar que solo se usa en Mode B

### Fase 4: Design Intake
- [ ] Crear FigmaIngestor.ts
- [ ] Crear ImageIngestor.ts
- [ ] Crear BlueprintFromDesign.ts + BlueprintMapper.ts
- [ ] Validar que solo se usa si design está presente

### Fase 5: Integración
- [ ] Extender autorun.apply() con detección de modo
- [ ] Implementar autorunApplyModeB()
- [ ] Actualizar schema MCP
- [ ] Actualizar autorun.verify() con modo diff
- [ ] Validar que modo strict funciona igual

### Fase 6: Reglas y Tests
- [ ] Actualizar .cursorrules
- [ ] Crear todos los tests
- [ ] Validar enforcement real
- [ ] Documentar en docs/autorun/ModeB.md

---

## 🎯 Conclusión

Este plan implementa Mode B de forma incremental y segura:

1. ✅ No rompe nada existente
2. ✅ Es opcional (modo strict por defecto)
3. ✅ Solo afecta prototypes/ (no código fuente)
4. ✅ Wizard y add-ons siguen funcionando igual
5. ✅ Enforcement real con watermark + verify

**Siguiente paso:** Comenzar con Fase 1, implementar y probar cada paso antes de continuar.
