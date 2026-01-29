# 🔄 Corrección: Mode B es el Flujo Principal Único

**Fecha:** 2025-01-03  
**Corrección:** Mode B NO es un fallback. Es el flujo PRINCIPAL y ÚNICO que siempre usa Storybook MCP.

---

## ⚠️ Corrección Crítica

### ❌ Entendimiento Incorrecto (Anterior)

- Mode B era un "fallback" cuando Storybook no funcionaba
- Había modo "strict" como alternativa
- Storybook MCP era opcional en Mode B

### ✅ Entendimiento Correcto (Actual)

- **Mode B es el flujo PRINCIPAL y ÚNICO**
- **Storybook MCP es SIEMPRE obligatorio** (fail-closed)
- **No hay modo alternativo** sin Storybook MCP
- Los widgets tokenizados solo se usan cuando Storybook MCP indica que falta algo específico
- Los widgets tokenizados siempre usan tokens de Storybook MCP

---

## 🎯 Flujo Correcto de Mode B

```
Usuario: "Implementa un DataTable"
↓
autorun.apply() con mode: "prototypeTokens"
↓
1. CONSULTAR STORYBOOK MCP (OBLIGATORIO, fail-closed)
   ├─ Obtener props exactas
   ├─ Obtener código exacto
   ├─ Obtener dependencias (dependsOn.required)
   ├─ Obtener tokens usados
   └─ Obtener ejemplos disponibles
↓
2. Si componente existe en Storybook MCP:
   └─ Extraer código exacto desde Storybook MCP
↓
3. Si componente NO existe en Storybook MCP:
   ├─ Consultar Storybook MCP para tokens base
   └─ Generar widget tokenizado usando tokens de Storybook MCP
↓
4. Resolver dependencias (consultando Storybook MCP recursivamente)
↓
5. Insertar en HTML con watermark (storybookMcp: true)
↓
6. Post-procesamiento
```

---

## 🔒 Reglas Críticas

### 1. Storybook MCP es SIEMPRE Obligatorio

```typescript
// ✅ CORRECTO
const result = await autorunApply({
  message: "Implementa un DataTable",
  options: {
    mode: "prototypeTokens",  // Único modo disponible
    requireStorybookMcp: true  // SIEMPRE true (default)
  }
});

// ❌ INCORRECTO - No existe modo sin Storybook MCP
const result = await autorunApply({
  message: "Implementa un DataTable",
  options: {
    mode: "strict",  // ❌ No existe este modo
    requireStorybookMcp: false  // ❌ No permitido
  }
});
```

### 2. Widgets Tokenizados Solo Cuando Storybook MCP Indica Falta

```typescript
// ✅ CORRECTO
// 1. Consultar Storybook MCP primero
const storybookResult = await call_mcp_tool({
  server: "storybook",
  toolName: "mcp_storybook_getComponentsProps",
  arguments: { componentIds: ["data-data-table"] }
});

// 2. Si Storybook MCP retorna componente → usar código de Storybook MCP
if (storybookResult.components.length > 0) {
  return storybookResult.components[0].code;
}

// 3. Si Storybook MCP NO retorna componente → consultar tokens base
const tokens = await call_mcp_tool({
  server: "storybook",
  toolName: "mcp_storybook_getTokens",  // Obtener tokens base
  arguments: {}
});

// 4. Generar widget tokenizado usando tokens de Storybook MCP
return generateTokenizedWidget("DataTable", tokens);
```

### 3. Todos los Tokens Vienen de Storybook MCP

```css
/* ✅ CORRECTO - Token de Storybook MCP */
background: var(--ubits-bg-1, #ffffff);

/* ❌ INCORRECTO - Hardcodeado */
background: #ffffff;
```

---

## 📋 Cambios Necesarios en la Implementación

### 1. Eliminar Modo "strict"

```typescript
// ❌ ANTES (incorrecto)
export type AutorunMode = "strict" | "prototypeTokens";

// ✅ DESPUÉS (correcto)
export type AutorunMode = "prototypeTokens"; // Único modo
```

### 2. Storybook MCP Siempre Obligatorio

```typescript
// ✅ CORRECTO
export interface AutorunApplyInputExtended {
  options?: {
    mode?: AutorunMode;  // default: "prototypeTokens"
    requireStorybookMcp?: boolean;  // default: true (SIEMPRE obligatorio)
  };
}

// En autorun.apply()
if (!input.options?.requireStorybookMcp !== false) {
  // Storybook MCP es obligatorio
  const storybookResult = await callStorybookMcp(...);
  if (!storybookResult) {
    throw new Error("Storybook MCP es obligatorio y falló");
  }
}
```

### 3. Widgets Tokenizados Solo con Tokens de Storybook MCP

```typescript
// ✅ CORRECTO
async function generateTokenizedWidget(componentName: string) {
  // 1. Consultar Storybook MCP para tokens base
  const tokens = await callStorybookMcp({
    toolName: "mcp_storybook_getTokens",
    arguments: {}
  });
  
  // 2. Generar widget usando tokens de Storybook MCP
  return `
    <div style="
      background: var(--ubits-bg-1, ${tokens.bg1});
      color: var(--ubits-fg-1-high, ${tokens.fg1High});
      padding: var(--ubits-spacing-md, ${tokens.spacingMd});
    ">
      ${componentName}
    </div>
  `;
}
```

---

## ✅ Checklist de Corrección

- [x] Mode B es el flujo principal único
- [x] Storybook MCP es siempre obligatorio
- [x] No hay modo "strict" alternativo
- [x] Widgets tokenizados solo cuando Storybook MCP indica falta
- [x] Widgets tokenizados siempre usan tokens de Storybook MCP
- [x] Watermark incluye `storybookMcp: true`
- [x] Todos los tokens vienen de Storybook MCP

---

## 🎯 Conclusión

**Mode B (`prototypeTokens`) es el flujo PRINCIPAL y ÚNICO que:**

1. ✅ **SIEMPRE consulta Storybook MCP primero** (obligatorio, fail-closed)
2. ✅ Usa componentes UBITS cuando Storybook MCP los tiene
3. ✅ Genera widgets tokenizados solo cuando Storybook MCP indica que falta algo específico
4. ✅ Los widgets tokenizados siempre usan tokens de Storybook MCP
5. ✅ Todo el código tiene origen en Storybook MCP

**No hay modo alternativo sin Storybook MCP.**
