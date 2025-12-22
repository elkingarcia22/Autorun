# 📋 Información de Tokens Globales para Mode B

**Fecha:** 2025-01-03  
**Propósito:** Documentar ubicación y estructura de tokens para GlobalTokenRegistry y verify

---

## 📁 Archivos de Tokens

### 1. **CSS Principal (Tokens UBITS)**

**Ruta:** `vendor/ubits/packages/tokens/dist/tokens.css`

**Formato:**
```css
:root {
  --ubits-accent-brand: #0c5bef;
  --ubits-accent-brand-inverted: #3865f5;
  --ubits-accent-brand-static: #0c5bef;
  --ubits-fg-1-high: #303a47;
  --ubits-fg-1-medium: #5c646f;
  --ubits-bg-1: #ffffff;
  --ubits-bg-2: #F3F3F4;
  --ubits-spacing-xs: 8px;
  --ubits-spacing-sm: 12px;
  --ubits-spacing-md: 16px;
  --ubits-border-radius-sm: 4px;
  --ubits-border-radius-md: 8px;
  /* ... más tokens ... */
}
```

**Patrón de nombres:**
- `--ubits-{categoria}-{variante}` (ej: `--ubits-fg-1-high`)
- Sufijos: `-inverted`, `-static`, `-static-inverted`
- Colores: `accent-brand`, `fg-1-high`, `bg-1`, etc.
- Spacing: `spacing-xs`, `spacing-sm`, `spacing-md`, `spacing-lg`, `spacing-xl`
- Border radius: `border-radius-sm`, `border-radius-md`, `border-radius-lg`
- Font sizes: `font-size-sm`, `font-size-md`, `font-size-lg`, `font-size-xl`
- Font weights: `font-weight-normal`, `font-weight-bold`

---

### 2. **CSS Modifiers (Tokens de Figma)**

**Ruta:** `vendor/ubits/packages/tokens/dist/figma-tokens.css`

**Formato:**
```css
:root {
  --modifiers-normal-color-dark-accent-blue: #8c91fa;
  --modifiers-normal-color-light-accent-blue: #5470fa;
  /* ... más modifiers ... */
}
```

**Patrón de nombres:**
- `--modifiers-{tipo}-{categoria}-{variante}` (ej: `--modifiers-normal-color-dark-accent-blue`)

---

### 3. **JSON de Tokens**

**Ruta:** `vendor/ubits/packages/tokens/tokens.json`

**Estructura:**
```json
{
  "light": {
    "brand": {
      "ubits-accent-brand": "#0c5bef",
      "ubits-accent-brand-inverted": "#3865f5",
      "ubits-accent-brand-static": "#0c5bef"
    },
    "foreground": {
      "ubits-fg-1-high": "#303a47",
      "ubits-fg-1-medium": "#5c646f"
    },
    "background": {
      "ubits-bg-1": "#ffffff",
      "ubits-bg-2": "#F3F3F4",
      "ubits-bg-active": "rgba(12, 91, 239, 0.15)"
    },
    "spacing": {
      "ubits-spacing-xs": "8px",
      "ubits-spacing-sm": "12px",
      "ubits-spacing-md": "16px"
    }
  },
  "dark": {
    /* ... mismos tokens con valores diferentes ... */
  }
}
```

---

## 🔗 Cómo se Cargar en Prototypes

### **En HTML generado:**

```html
<!-- Cargado automáticamente por CanvasCreator.ts -->
<link rel="stylesheet" href="../vendor/ubits/packages/tokens/dist/tokens.css" />
<link rel="stylesheet" href="../vendor/ubits/packages/tokens/dist/figma-tokens.css" />
```

### **Rutas posibles:**

1. **Relativa (preferida):** `../vendor/ubits/packages/tokens/dist/tokens.css`
2. **Vercel URL:** `https://ubits-storybook10.vercel.app/tokens/dist/tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass={token}`
3. **Absoluta legacy:** `file:///Users/.../UBITS/packages/tokens/dist/tokens.css`

### **Código que carga tokens:**

**Archivo:** `packages/autorun-core/src/wizard/CanvasCreator.ts`

**Método:** `adjustTemplatePaths()` (líneas 465-667)

**Lógica:**
- Reemplaza rutas relativas `../tokens/dist/tokens.css` por ruta base
- Agrega automáticamente `figma-tokens.css` después de `tokens.css`
- Soporta rutas relativas, URLs de Vercel, y rutas absolutas `file://`

---

## 📊 Estructura de Tokens (Ejemplos)

### **Tokens de Color:**

```css
/* Brand */
--ubits-accent-brand: #0c5bef;
--ubits-accent-brand-inverted: #3865f5;
--ubits-accent-brand-static: #0c5bef;

/* Foreground */
--ubits-fg-1-high: #303a47;
--ubits-fg-1-medium: #5c646f;
--ubits-fg-1-low: #a2a6ad;
--ubits-fg-2-high: #2a303f;
--ubits-fg-2-medium: #5a5e6a;
--ubits-fg-disabled: #a2a6ad;

/* Background */
--ubits-bg-1: #ffffff;
--ubits-bg-2: #F3F3F4;
--ubits-bg-3: #e7e8ea;
--ubits-bg-4: #0e0c1d;
--ubits-bg-active: rgba(12, 91, 239, 0.15);
--ubits-bg-active-button: rgba(12, 91, 239, 0.15);

/* Border */
--ubits-border-1: #e5e5e5;
--ubits-border-2: #d0d2d5;
```

### **Tokens de Spacing:**

```css
--ubits-spacing-xs: 8px;
--ubits-spacing-sm: 12px;
--ubits-spacing-md: 16px;
--ubits-spacing-lg: 24px;
--ubits-spacing-xl: 32px;
```

### **Tokens de Border Radius:**

```css
--ubits-border-radius-sm: 4px;
--ubits-border-radius-md: 8px;
--ubits-border-radius-lg: 12px;
```

### **Tokens de Typography:**

```css
--ubits-font-size-sm: 14px;
--ubits-font-size-md: 16px;
--ubits-font-size-lg: 18px;
--ubits-font-size-xl: 24px;
--ubits-font-weight-normal: 400;
--ubits-font-weight-bold: 700;
```

### **Tokens de Modifiers:**

```css
--modifiers-normal-color-dark-accent-blue: #8c91fa;
--modifiers-normal-color-light-accent-blue: #5470fa;
```

---

## 🎯 Información para GlobalTokenRegistry

### **Rutas a usar:**

1. **Primera opción (portable):**
   ```typescript
   const tokensPath = path.join(
     process.cwd(),
     'vendor/ubits/packages/tokens/dist/tokens.css'
   );
   ```

2. **Segunda opción (fallback):**
   ```typescript
   const tokensPath = path.join(
     process.cwd(),
     'vendor/ubits/packages/tokens/tokens.json'
   );
   ```

### **Formato de parsing:**

**Desde CSS:**
```typescript
// Regex para tokens CSS
const cssRegex = /--ubits-[\w-]+:\s*([^;]+);/g;
// Ejemplo: --ubits-bg-1: #ffffff; → { '--ubits-bg-1': '#ffffff' }
```

**Desde JSON:**
```typescript
// Estructura anidada: light.brand.ubits-accent-brand
// Necesita flattening: { '--ubits-accent-brand': '#0c5bef' }
```

---

## 🔍 Información para Verify (Evitar Falsos Positivos)

### **Contextos donde NO debe fallar:**

1. **En `<link>` tags:**
   ```html
   <!-- ✅ NO debe fallar -->
   <link rel="stylesheet" href="../vendor/ubits/packages/tokens/dist/tokens.css" />
   ```

2. **En comentarios:**
   ```html
   <!-- ✅ NO debe fallar -->
   <!-- Token: --ubits-bg-1: #ffffff -->
   ```

3. **En atributos HTML (no estilos):**
   ```html
   <!-- ✅ NO debe fallar -->
   <div data-color="#ffffff">
   ```

4. **En JavaScript (strings):**
   ```javascript
   // ✅ NO debe fallar
   const color = "#ffffff";
   const token = "--ubits-bg-1: #ffffff";
   ```

5. **En fallbacks de var() (solo keywords seguros):**
   ```css
   /* ✅ NO debe fallar */
   background: var(--ubits-bg-1, transparent);
   color: var(--ubits-fg-1-high, currentColor);
   border-color: var(--ubits-border-1, inherit);
   ```

### **Contextos donde SÍ debe fallar:**

1. **En estilos inline directos:**
   ```html
   <!-- ❌ DEBE fallar -->
   <div style="background: #ffffff;">
   <div style="color: rgb(0, 0, 0);">
   <div style="border-color: hsl(0, 0%, 0%);">
   ```

2. **En `<style>` tags (estilos directos):**
   ```html
   <!-- ❌ DEBE fallar -->
   <style>
     .test { background: #ffffff; }
   </style>
   ```

3. **En fallbacks de var() con hex/rgb/hsl:**
   ```css
   /* ❌ DEBE fallar */
   background: var(--ubits-bg-1, #fff);
   color: var(--ubits-fg-1-high, rgb(0, 0, 0));
   ```

---

## 📋 Resumen para Implementación

### **GlobalTokenRegistry debe:**

1. ✅ Cargar desde `vendor/ubits/packages/tokens/dist/tokens.css` (primera opción)
2. ✅ Fallback a `vendor/ubits/packages/tokens/tokens.json` (segunda opción)
3. ✅ Parsear formato CSS: `--ubits-{nombre}: {valor};`
4. ✅ Parsear formato JSON: `light.brand.ubits-accent-brand` → `--ubits-accent-brand`
5. ✅ Incluir tokens de modifiers: `--modifiers-*` (desde `figma-tokens.css`)

### **Verify debe:**

1. ✅ Solo verificar líneas modificadas (diff-based)
2. ✅ Ignorar `<link>` tags, comentarios, atributos HTML, strings JavaScript
3. ✅ Detectar hex/rgb/hsl solo en estilos directos (no en fallbacks de var())
4. ✅ Permitir keywords seguros en fallbacks: `transparent`, `currentColor`, `inherit`, `initial`, `white`, `black`
5. ✅ Prohibir hex/rgb/hsl en fallbacks de var()

---

## 🎯 Próximos Pasos

Con esta información, puedes definir:

1. **GlobalTokenRegistry exacto:**
   - Rutas de carga
   - Formato de parsing (CSS vs JSON)
   - Estructura de datos de retorno

2. **Reglas de verify exactas:**
   - Qué ignorar (falsos positivos)
   - Qué detectar (violaciones reales)
   - Política de fallbacks en var()
