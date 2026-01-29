# 🔧 Ajustes Finales Imprescindibles para Mode B

**Fecha:** 2025-01-03  
**Propósito:** Ajustes críticos para evitar fallos en runtime/CI y falsos positivos

---

## ⚠️ Ajuste 1: VerifyDiff NO debe depender de dist/ en hooks

### Problema:
```typescript
// ❌ INCORRECTO: Falla si el repo no compila antes del hook
require('../packages/autorun-core/dist/verify/VerifyDiff')
```

### ✅ Solución A (Recomendada): CLI Interna

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
    "prototypes:verify": "node packages/autorun-core/src/cli/autorun-verify.ts diff"
  },
  "bin": {
    "autorun-verify": "./packages/autorun-core/src/cli/autorun-verify.ts"
  }
}
```

### ✅ Solución B: Usar tsx/ts-node

**package.json:**
```json
{
  "scripts": {
    "prototypes:verify": "tsx packages/autorun-core/src/verify/verifyDiffRunner.ts"
  },
  "devDependencies": {
    "tsx": "^4.0.0"
  }
}
```

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

---

## ⚠️ Ajuste 2: Auto-Reload Addon mejor usar MCP tool

### Problema:
```typescript
// ❌ Puede crear circular deps o problemas de packaging/workspaces
import { verifyDiff } from '@autorun/core/verify/VerifyDiff';
```

### ✅ Solución Recomendada: Llamar MCP tool

**Archivo:** `packages/addons/functional/auto-reload/src/AutoReloadAddon.ts`

```typescript
export class AutoReloadAddon implements IFunctionalAddon {
  async onFileChange(filePath: string): Promise<void> {
    if (filePath.startsWith('prototypes/')) {
      // ✅ Llamar MCP tool del mismo server
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
          return; // NO recargar
        }
      } catch (error) {
        console.error('❌ [Auto-Reload] Error verificando:', error);
        // Opción: fallar abierto o cerrar
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
    // Ejemplo con MCP SDK:
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

### ✅ Solución Alternativa: Import desde entrypoint estable

**Archivo:** `packages/autorun-core/src/index.ts`

```typescript
// ✅ Exportar desde entrypoint estable
export { verifyDiff } from './verify/VerifyDiff';
export type { VerifyDiffOptions, VerifyDiffOutput } from './verify/VerifyDiff';
```

**package.json del addon:**
```json
{
  "dependencies": {
    "@autorun/core": "workspace:*"
  }
}
```

---

## ⚠️ Ajuste 3: Regex de colors con exec loop (no indexOf)

### Problema:
```typescript
// ❌ INCORRECTO: indexOf siempre da el primer índice
const matches = line.match(/#[0-9a-fA-F]{3,8}/g);
for (const match of matches) {
  const matchIndex = line.indexOf(match); // ❌ Siempre el primero
}
```

### ✅ Solución Correcta: Usar regex.exec en loop

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

```typescript
/**
 * ✅ CORRECTO: Detecta colores hardcodeados en una línea específica
 * Usa regex.exec loop para obtener índices reales
 */
function detectHardcodedColorsInLine(line: string): string[] {
  const colors: string[] = [];
  
  // ✅ Patrones prohibidos con exec loop
  const patterns = [
    { regex: /#[0-9a-fA-F]{3,8}/g, name: 'hex' },
    { regex: /\brgb\s*\(/gi, name: 'rgb' },
    { regex: /\brgba\s*\(/gi, name: 'rgba' },
    { regex: /\bhsl\s*\(/gi, name: 'hsl' },
    { regex: /\bhsla\s*\(/gi, name: 'hsla' }
  ];
  
  for (const pattern of patterns) {
    const re = new RegExp(pattern.regex.source, pattern.regex.flags);
    let m: RegExpExecArray | null;
    
    // ✅ Loop con exec para obtener índices reales
    while ((m = re.exec(line)) !== null) {
      const matchIndex = m.index;
      const match = m[0];
      
      // ✅ Verificar si está dentro de var() con fallback seguro
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
  
  return colors;
}
```

---

## ⚠️ Ajuste 4: getGitDiffHunks() manejar /dev/null y archivos nuevos

### Problema:
```typescript
// ❌ Puede fallar con archivos nuevos (/dev/null) o borrados
if (line.startsWith('+++')) {
  currentFile = line.substring(4).trim().replace(/^b\//, '');
}
```

### ✅ Solución Correcta: Guardas para /dev/null

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

```typescript
/**
 * ✅ CORRECTO: Obtiene hunks de git diff con manejo de /dev/null
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
        // Detectar archivo (+++ b/prototypes/file.html o +++ /dev/null)
        if (line.startsWith('+++')) {
          const fileCandidate = line.substring(4).trim().replace(/^b\//, '');
          
          // ✅ Guarda 1: Ignorar /dev/null (archivos borrados)
          if (fileCandidate === '/dev/null') {
            currentFile = '';
            continue;
          }
          
          // ✅ Guarda 2: Solo procesar archivos en prototypes/
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
          const startLine = parseInt(hunkMatch[2]);
          const count = parseInt(hunkMatch[3] || '0');
          
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

## ⚠️ Ajuste 5: Watermark fail-closed si no se puede parsear

### Problema:
Si alguien borra `<!-- /AUTORUN -->`, `parseWatermarks()` no cierra bloque y se pierde enforcement.

### ✅ Solución: Fail-closed si hay cambios y no se pueden parsear watermarks

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

```typescript
/**
 * ✅ Verifica un archivo individual (diff-based) con fail-closed
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

    // ✅ Ajuste 5: Fail-closed si hay cambios y no se pueden parsear watermarks
    const allModifiedLines = new Set<number>();
    for (const hunk of hunks) {
      hunk.lines.forEach(line => allModifiedLines.add(line));
    }

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
    if (options.checkHardcodedColors !== false && allModifiedLines.size > 0) {
      const hardcodedColors = detectHardcodedColors(content, allModifiedLines);
      
      if (hardcodedColors.length > 0) {
        issues.push(...hardcodedColors);
        isValid = false;
      }
    }

    // ✅ Regla 3: Validar tokens usados (Fix B + Fix C)
    if (options.checkTokens !== false && allModifiedLines.size > 0) {
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
```

---

## ✅ Checklist de Ajustes Aplicados

- [x] Ajuste 1: VerifyDiff NO depende de dist/ (CLI interna o tsx)
- [x] Ajuste 2: Auto-Reload usa MCP tool (no import directo)
- [x] Ajuste 3: Regex de colors usa exec loop (no indexOf)
- [x] Ajuste 4: getGitDiffHunks maneja /dev/null y archivos nuevos
- [x] Ajuste 5: Watermark fail-closed si no se puede parsear

---

## 🎯 Conclusión

**Con estos ajustes finales, Mode B queda 100% implementable sin sorpresas:**

1. ✅ No falla en hooks/CI por dependencias de dist/
2. ✅ No crea circular deps en Auto-Reload
3. ✅ Detecta múltiples matches correctamente en una línea
4. ✅ Maneja archivos nuevos/borrados sin romper
5. ✅ Fail-closed si watermark está roto
