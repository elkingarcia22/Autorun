# 📋 Instrucción Final para Cursor - Mode B

**Copia y pega esto tal cual al agente de Cursor:**

---

Implementa Mode B siguiendo el plan en `docs/analisis/PLAN-IMPLEMENTACION-MODE-B-ORDEN-EXACTO.md`. 

**OBLIGATORIO:**

**A)** `autorun-verify.ts` se ejecuta con `tsx` (NO `node` directo con TS). Script: `"prototypes:verify": "tsx packages/autorun-core/src/cli/autorun-verify.ts diff"`.

**B)** `verifyDiff` soporta `--staged` y `--base <ref>`. `getGitDiffHunks()` usa `--cached` para staged o `base...HEAD` para CI. Pre-commit usa `--staged`, CI usa `--base origin/main`.

**C)** `detectHardcodedColorsInLine()` usa exec loop (NO `indexOf`). Usa el mismo regex y resetea `regex.lastIndex = 0` antes del loop.

**D)** Fix D real: detecta `white|black` como hardcoded (directo y fallback). Prohibir explícitamente con regex `/\b(white|black)\b/i` tanto en valores directos como en fallbacks de `var()`. (Opcional: evitar doble reporte si matched fallback, no emitas keyword directo).

**E)** `verifyDiff` debe ser fail-closed: si hubo cambios en `prototypes/` y `parseWatermarks(content).length === 0` → falla con error claro.

**F)** DoD: `startLine`/`endLine` son derivados del parse (NO parte del meta). El meta solo incluye `v/mode/components/widgets/deps/hash`.

**G)** Maneja `<style>...</style>` inline en una sola línea. Si una línea contiene ambos tags, extrae el contenido CSS entre tags y lo analiza. Aplica esto TANTO en `detectHardcodedColors()` COMO en `validateTokensUsed()`.

**I)** **Patch 1:** Hunk count omitido (`@@ -10 +10 @@` sin tercer número) debe tratarse como `count=1` (NO `0`). Si `count === 0` (solo borrados), igual marcar `startLine` como punto de cambio para detectar borrados de watermarks.

**J)** **Patch 2:** `VerifyDiffOptions` interface DEBE incluir `staged?: boolean` y `baseRef?: string` (si no, compila con error porque `getGitDiffHunks()` los usa).

**K)** **Patch 3:** `validateTokensUsed()` DEBE manejar `<style>...</style>` inline igual que `detectHardcodedColors()` (extraer CSS entre tags y validar tokens ahí).

**H)** Añade tests mínimos:
- JSON parse Fix A (verificar que agrega `--ubits-bg-1` no `--light-background-ubits-bg-1`)
- `suggest` Fix B (método público funciona)
- State machine Fix C (detecta colores solo en CSS real, no en `<link>`)
- Safe keywords Fix D (detecta `white`/`black` explícitamente, tanto directo como fallback)
- Hunks Fix E (filtra `count=0`, soporta multi-hunks)
- Fail-closed watermark roto (si hay cambios y no se pueden parsear watermarks → fail)
- **Patch 1:** Hunk count omitido (`@@ -1 +1 @@`) debe tratarse como count=1
- **Patch 1:** Delete-only (borrar `<!-- /AUTORUN -->`) debe fallar (count=0 marca punto de cambio)

**L)** **Micro-Hardening opcional (recomendado):**
- safeKeywords case-insensitive: usar `Set` con `toLowerCase()` para comparar `transparent`, `Transparent`, `CURRENTCOLOR`, etc.
- fallback rgb/hsl case-insensitive: usar flag `/i` en regex para detectar `RGB()`, `HSL()`, etc.
- var() detection case-insensitive: usar `toLowerCase()` en `beforeMatch` para detectar `VAR(`.

**M)** **Señal de "DONE" real (los 4 casos críticos):**
- ✅ Caso 1: Cambio válido dentro de watermark → verify OK
- ✅ Caso 2: Cambio fuera de watermark → verify FAIL
- ✅ Caso 3: Hardcoded color en CSS real → verify FAIL
- ✅ Caso 4: Token inexistente en CSS real → verify FAIL
- ✅ Al menos un enforcement activo (pre-commit o CI)

**No está terminado hasta que:**
- Los 4 casos críticos pasan (verificar con matriz de smoke tests)
- Al menos un enforcement está activo y funcionando
- Smoke tests pasan en local, pre-commit y CI

**Verificar:**
- Definition of Done: `docs/analisis/DEFINITION-OF-DONE-MODE-B.md`
- Matriz de Smoke Tests: `docs/analisis/MATRIZ-SMOKE-TESTS-MODE-B.md`
- Señal de DONE Real: `docs/analisis/SENAL-DONE-REAL-MODE-B.md`

---
