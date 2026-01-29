# 🔧 Corrección: Cargar Tokens desde Storybook Vercel

**Fecha:** 2025-01-24  
**Problema:** `GlobalTokenRegistry` solo cargaba tokens desde archivos locales, no desde Storybook  
**Solución:** Modificar `GlobalTokenRegistry` para cargar tokens desde Storybook Vercel primero

---

## 🚨 PROBLEMA IDENTIFICADO

**Pregunta del usuario:**
> "¿No estás tomando los componentes de una vez con los tokens desde Storybook?"

**Análisis:**
- ❌ `GlobalTokenRegistry` solo cargaba tokens desde archivos locales (`vendor/ubits/packages/tokens/dist/tokens.css`)
- ❌ NO intentaba cargar tokens desde Storybook Vercel
- ❌ Esto causaba que `autorun.apply()` Mode B fallara con "Token no encontrado"

---

## ✅ SOLUCIÓN IMPLEMENTADA

### Cambio en `GlobalTokenRegistry.initialize()`

**ANTES:**
```typescript
async initialize(): Promise<void> {
  // Solo cargaba desde archivos locales
  const tokensCssPath = path.join(process.cwd(), 'vendor/ubits/packages/tokens/dist/tokens.css');
  const css = await fs.readFile(tokensCssPath, 'utf-8');
  // ...
}
```

**DESPUÉS:**
```typescript
async initialize(): Promise<void> {
  // ✅ PRIORIDAD 1: Intentar cargar desde Storybook Vercel
  try {
    const { UBITS_PRESET } = await import('../wizard/UBITSPreset.js');
    const storybookUrl = UBITS_PRESET.storybook.url;
    const bypassToken = UBITS_PRESET.storybook.bypassToken;

    const tokensCssUrl = `${storybookUrl}/tokens/dist/tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${bypassToken}`;
    const figmaTokensCssUrl = `${storybookUrl}/tokens/dist/figma-tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${bypassToken}`;

    // Cargar desde Storybook
    const response = await fetch(tokensCssUrl);
    if (response.ok) {
      const css = await response.text();
      this.parseTokensFromCSS(css);
      // Si se cargaron tokens, retornar
      if (this.tokens.size > 0) {
        this.initialized = true;
        return;
      }
    }
  } catch (error) {
    console.warn(`⚠️ Error al cargar desde Storybook, usando fallback local`);
  }

  // ✅ PRIORIDAD 2 (FALLBACK): Cargar desde archivos locales
  // ... código existente ...
}
```

---

## 📋 FLUJO ACTUALIZADO

### Prioridad 1: Storybook Vercel (PRIMERO)
1. Obtener URL de Storybook desde `UBITS_PRESET.storybook.url`
2. Construir URLs con bypass token:
   - `https://ubits-storybook10.vercel.app/tokens/dist/tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=...`
   - `https://ubits-storybook10.vercel.app/tokens/dist/figma-tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=...`
3. Hacer `fetch()` a ambas URLs
4. Parsear tokens desde CSS
5. Si se cargaron tokens exitosamente, retornar

### Prioridad 2: Archivos Locales (FALLBACK)
1. Si Storybook falla o no hay tokens, intentar cargar desde archivos locales
2. `vendor/ubits/packages/tokens/dist/tokens.css`
3. `vendor/ubits/packages/tokens/dist/figma-tokens.css`
4. `vendor/ubits/packages/tokens/tokens.json` (último recurso)

---

## ✅ BENEFICIOS

1. **Tokens siempre actualizados:** Se cargan desde Storybook Vercel (versión más reciente)
2. **No requiere archivos locales:** Funciona sin necesidad de tener `vendor/ubits/` clonado
3. **Fallback robusto:** Si Storybook no está disponible, usa archivos locales
4. **Mismo bypass token:** Usa el mismo token que se usa para cargar componentes

---

## 🔍 VERIFICACIÓN

**Logs esperados:**
```
🔄 [GlobalTokenRegistry] Intentando cargar tokens desde Storybook Vercel...
✅ [GlobalTokenRegistry] Cargados 150 tokens desde Storybook (tokens.css)
✅ [GlobalTokenRegistry] Total 200 tokens (incluye modifiers desde Storybook)
✅ [GlobalTokenRegistry] Tokens cargados desde Storybook exitosamente
```

**Si Storybook falla:**
```
⚠️ [GlobalTokenRegistry] Error al cargar desde Storybook, usando fallback local...
🔄 [GlobalTokenRegistry] Usando fallback: cargando tokens desde archivos locales...
✅ [GlobalTokenRegistry] Cargados 150 tokens desde tokens.css local
```

---

## 📚 ARCHIVOS MODIFICADOS

- `packages/autorun-core/src/tokens/GlobalTokenRegistry.ts` - Método `initialize()` actualizado

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Probar que `autorun.apply()` Mode B funcione correctamente con tokens desde Storybook
2. ✅ Verificar que el fallback a archivos locales funcione si Storybook no está disponible
3. ✅ Actualizar documentación de flujo de Autorun

---

**Última actualización:** 2025-01-24



