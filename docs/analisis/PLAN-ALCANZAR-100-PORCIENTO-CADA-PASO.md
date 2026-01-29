# 🎯 Plan para Alcanzar 100% en Cada Paso

**Fecha:** 2025-01-03  
**Objetivo:** Llegar al 100% de implementación según el estado ideal

---

## 📊 ESTADO ACTUAL vs 100% IDEAL

### **PASO 1: Consultar Storybook** ⚠️ 90% → 🎯 100%

#### **Lo que falta (10%):**

1. **❌ Llamada directa a MCP desde Node.js**
   - **Problema:** `autorun.apply()` no puede llamar MCP directamente, requiere que el agente lo haga
   - **Solución:** Crear cliente MCP interno que pueda llamar a otros servidores MCP desde Node.js
   - **Archivo:** `packages/autorun-core/src/helpers/mcpClient.ts` (NUEVO)

2. **❌ Validación fail-closed real**
   - **Problema:** Si MCP falla, usa fallback pero no valida que las props sean correctas
   - **Solución:** Validar que props obtenidas sean válidas antes de continuar
   - **Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

#### **Acciones específicas:**

```typescript
// 1. Crear MCP Client interno
// packages/autorun-core/src/helpers/mcpClient.ts
export class MCPClient {
  async callTool(server: string, toolName: string, args: any): Promise<any> {
    // Conectar al servidor MCP de Storybook
    // Llamar tool directamente
    // Retornar resultado
  }
}

// 2. Integrar en autorun.apply()
// En autorunApplyStrict() y autorunApplyModeB():
const mcpClient = new MCPClient();
const props = await mcpClient.callTool(
  'storybook',
  'mcp_storybook_getComponentsProps',
  { componentIds: [componentId] }
);

if (!props || props.length === 0) {
  throw new Error('No se pudieron obtener props desde Storybook MCP');
}

// 3. Validar props obtenidas
if (!validatePropsStructure(props)) {
  throw new Error('Props obtenidas no son válidas');
}
```

**Tiempo estimado:** 4-6 horas

---

### **PASO 2: Resolver dependencias desde contratos** ✅ 100%

#### **Estado:**
- ✅ Resuelve dependencias desde contratos
- ✅ Valida tokens del contrato
- ✅ Valida que dependencias estén disponibles
- ✅ Incluye en watermark

**No requiere cambios adicionales.**

---

### **PASO 3: Generar código sin hardcodear** ⚠️ 95% → 🎯 100%

#### **Lo que falta (5%):**

1. **❌ Mapeo inteligente de colores a tokens**
   - **Problema:** `suggestTokenForColor()` retorna `null`, no mapea colores a tokens
   - **Solución:** Implementar mapeo basado en valores de tokens del registro
   - **Archivo:** `packages/autorun-core/src/helpers/codeSanitizer.ts`

2. **⚠️ PrototypeTokenKit limitado**
   - **Problema:** Solo genera algunos tipos de widgets (KPI, Filters, Empty, Simple Card)
   - **Solución:** Expandir con más tipos de widgets comunes
   - **Archivo:** `packages/autorun-core/src/fallback/PrototypeTokenKit.ts`

#### **Acciones específicas:**

```typescript
// 1. Mejorar mapeo de colores a tokens
// En codeSanitizer.ts:
async function suggestTokenForColor(
  color: string,
  registry: GlobalTokenRegistry
): Promise<string | null> {
  // 1. Cargar valores de tokens desde CSS
  const tokenValues = await loadTokenValuesFromCSS(registry);
  
  // 2. Normalizar color a formato comparable
  const normalizedColor = normalizeColorToRGB(color);
  
  // 3. Buscar token más cercano por distancia de color
  const closestToken = findClosestTokenByColor(normalizedColor, tokenValues);
  
  return closestToken;
}

// 2. Expandir PrototypeTokenKit
// Agregar métodos:
- generateTableShell()
- generateFormSection()
- generateMetricCard()
- generateChartContainer()
- generateActionBar()
```

**Tiempo estimado:** 6-8 horas

---

### **PASO 4: Insertar con Watermark v2** ✅ 100%

#### **Estado:**
- ✅ Watermark v2 con hash
- ✅ Metadata completa (tokens, storybookId, deps)
- ✅ Inserción en anchors correctos

**No requiere cambios adicionales.**

---

### **PASO 5: Verificar diff-based** ✅ 100%

#### **Estado:**
- ✅ Verificación diff-based completa
- ✅ Soporte staged/baseRef
- ✅ Detección de violaciones

**No requiere cambios adicionales.**

---

### **PASO 6: Enforcement** ⚠️ 80% → 🎯 100%

#### **Lo que falta (20%):**

1. **❌ CI workflow configurado**
   - **Problema:** No hay workflow de CI que ejecute `autorun.verify`
   - **Solución:** Crear workflow de GitHub Actions
   - **Archivo:** `.github/workflows/autorun-verify.yml` (NUEVO)

2. **⚠️ Mensajes de error mejorados**
   - **Problema:** Mensajes de error no guían al usuario claramente
   - **Solución:** Mejorar mensajes con instrucciones específicas
   - **Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

#### **Acciones específicas:**

```yaml
# 1. Crear CI workflow
# .github/workflows/autorun-verify.yml
name: Autorun Verify

on:
  pull_request:
    paths:
      - 'prototypes/**'
  push:
    branches: [main, develop]
    paths:
      - 'prototypes/**'

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run prototypes:verify -- --base=origin/${{ github.base_ref }}
```

```typescript
// 2. Mejorar mensajes de error
// En VerifyDiff.ts:
if (issues.length > 0) {
  const errorMessage = `
❌ Verificación de Autorun falló

Problemas encontrados:
${issues.map(i => `  - ${i}`).join('\n')}

💡 Soluciones:
${issues.map(issue => getSolutionForIssue(issue)).join('\n')}

📚 Documentación:
- Guía de implementación: docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md
- Errores comunes: docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md
`;
}
```

**Tiempo estimado:** 2-3 horas

---

## 📋 CHECKLIST COMPLETO PARA 100%

### **PASO 1: Storybook (90% → 100%)**

- [ ] Crear `MCPClient` para llamar MCP desde Node.js
- [ ] Integrar llamada directa a Storybook MCP en `autorun.apply()`
- [ ] Validar props obtenidas antes de continuar (fail-closed real)
- [ ] Usar props para validar estructura del código extraído
- [ ] Eliminar dependencia del agente para consultar MCP

**Archivos a crear/modificar:**
- `packages/autorun-core/src/helpers/mcpClient.ts` (NUEVO)
- `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` (MODIFICAR)

---

### **PASO 2: Contratos (100%)**

✅ **Completo - No requiere cambios**

---

### **PASO 3: Generación (95% → 100%)**

- [ ] Implementar mapeo inteligente de colores a tokens
- [ ] Cargar valores de tokens desde CSS para comparación
- [ ] Implementar algoritmo de distancia de color (RGB/Euclidean)
- [ ] Expandir PrototypeTokenKit con más tipos de widgets:
  - [ ] `generateTableShell()`
  - [ ] `generateFormSection()`
  - [ ] `generateMetricCard()`
  - [ ] `generateChartContainer()`
  - [ ] `generateActionBar()`
  - [ ] `generateDataGrid()`
  - [ ] `generateFilterPanel()`

**Archivos a crear/modificar:**
- `packages/autorun-core/src/helpers/codeSanitizer.ts` (MODIFICAR)
- `packages/autorun-core/src/fallback/PrototypeTokenKit.ts` (MODIFICAR)
- `packages/autorun-core/src/tokens/GlobalTokenRegistry.ts` (MODIFICAR - agregar método para obtener valores)

---

### **PASO 4: Watermark (100%)**

✅ **Completo - No requiere cambios**

---

### **PASO 5: Verificación (100%)**

✅ **Completo - No requiere cambios**

---

### **PASO 6: Enforcement (80% → 100%)**

- [ ] Crear workflow de GitHub Actions para CI
- [ ] Configurar para ejecutar en PRs y pushes a main/develop
- [ ] Mejorar mensajes de error con instrucciones específicas
- [ ] Agregar enlaces a documentación en mensajes de error
- [ ] Crear función `getSolutionForIssue()` para guiar al usuario

**Archivos a crear/modificar:**
- `.github/workflows/autorun-verify.yml` (NUEVO)
- `packages/autorun-core/src/verify/VerifyDiff.ts` (MODIFICAR)
- `packages/autorun-core/src/verify/errorMessages.ts` (NUEVO - mensajes mejorados)

---

## ⏱️ TIEMPO TOTAL ESTIMADO

- **Paso 1 (Storybook):** 4-6 horas
- **Paso 3 (Generación):** 6-8 horas
- **Paso 6 (Enforcement):** 2-3 horas
- **Total:** 12-17 horas (1.5-2 días de desarrollo)

---

## 🎯 PRIORIDAD DE IMPLEMENTACIÓN

### **Prioridad CRÍTICA (Hacer primero):**

1. **Paso 1: MCP Client interno** - Permite consulta automática real
2. **Paso 6: CI workflow** - Bloquea PRs malos automáticamente

### **Prioridad ALTA (Hacer después):**

3. **Paso 3: Mapeo de colores** - Mejora calidad del código generado
4. **Paso 3: Expandir PrototypeTokenKit** - Más widgets disponibles

### **Prioridad MEDIA (Mejoras):**

5. **Paso 6: Mensajes de error mejorados** - Mejor UX

---

## 📝 NOTAS TÉCNICAS

### **MCP Client Interno:**

El MCP Client debe:
- Conectarse al servidor MCP de Storybook usando stdio
- Enviar requests en formato MCP
- Parsear respuestas
- Manejar errores gracefully

**Desafío:** Los servidores MCP se ejecutan como procesos separados. Necesitamos:
- Obtener configuración del servidor MCP desde `.cursor/mcp.json`
- Iniciar proceso del servidor si no está corriendo
- Comunicarse vía stdio o socket

**Alternativa más simple:** Usar fetch/HTTP si el servidor MCP expone HTTP endpoint (no es estándar).

**Solución recomendada:** Crear wrapper que use el mismo mecanismo que Cursor usa para comunicarse con MCP servers.

---

### **Mapeo de Colores a Tokens:**

1. Cargar valores de tokens desde CSS:
   ```typescript
   async function loadTokenValuesFromCSS(registry: GlobalTokenRegistry): Promise<Map<string, string>> {
     // Leer tokens.css
     // Parsear valores de tokens
     // Retornar mapa token -> valor
   }
   ```

2. Normalizar colores a RGB:
   ```typescript
   function normalizeColorToRGB(color: string): { r: number; g: number; b: number } {
     // Convertir hex/rgb/hsl a RGB
   }
   ```

3. Calcular distancia de color:
   ```typescript
   function colorDistance(color1: RGB, color2: RGB): number {
     // Euclidean distance en espacio RGB
     return Math.sqrt(
       Math.pow(color1.r - color2.r, 2) +
       Math.pow(color1.g - color2.g, 2) +
       Math.pow(color1.b - color2.b, 2)
     );
   }
   ```

---

**Última actualización:** 2025-01-03

