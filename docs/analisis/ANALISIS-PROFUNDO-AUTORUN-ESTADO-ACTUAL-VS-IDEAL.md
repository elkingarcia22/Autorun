# 🔍 Análisis Profundo: Estado Actual de Autorun vs Estado Ideal

**Fecha:** 2025-01-03  
**Objetivo:** Analizar qué está implementado y qué falta para llegar al flujo ideal descrito

---

## 📊 Resumen Ejecutivo

### ✅ **LO QUE ESTÁ IMPLEMENTADO (80%)**

1. ✅ **GlobalTokenRegistry** - Carga tokens desde repo local
2. ✅ **PrototypeTokenKit** - Genera widgets tokenizados sin hardcoded colors
3. ✅ **autorun.verify("diff")** - Verificación diff-based con soporte staged/baseRef
4. ✅ **Watermark v2** - Sistema completo de watermarks con hash
5. ✅ **autorun.apply() Mode B** - Flujo para prototypes/ con tokens
6. ✅ **HtmlPrototypeAdapter** - Inserción en anchors (CONTENT/SCRIPTS)

### ⚠️ **LO QUE FALTA O NECESITA MEJORA (20%)**

1. ⚠️ **Paso 1: Consultar Storybook** - Requiere intervención manual del agente
2. ⚠️ **Paso 2: Resolver dependencias desde contratos** - Implementado pero no integrado completamente
3. ⚠️ **Paso 3: Generar código sin hardcodear** - Funciona pero puede mejorar
4. ⚠️ **Paso 6: Enforcement** - Pre-commit existe pero puede mejorar

---

## 🔍 ANÁLISIS DETALLADO POR PASO

### **PASO 1: Elegir componente y consultar Storybook**

#### **Estado Ideal:**
```
1. Autorun consulta Storybook para:
   - Confirmar que existe
   - Leer props / API
   - Entender cómo se instancia correctamente (patrones de uso)
2. Resultado: Autorun sabe "qué renderizar" y "con qué props"
```

#### **Estado Actual:**
```typescript
// En autorunApply.ts línea 193-230
// ⚠️ PROBLEMA: Requiere que el agente consulte Storybook MCP ANTES
console.log(`   ⚠️ FAIL-CLOSED: El agente DEBE consultar Storybook MCP para cada componente:`);
for (const msg of result.mcpMessages) {
  console.log(`   📚 Componente: ${msg.componentName} (${msg.storybookId})`);
  console.log(`   ⚠️ OBLIGATORIO ejecutar:`);
  console.log(`      call_mcp_tool({`);
  console.log(`        server: "storybook",`);
  console.log(`        toolName: "mcp_storybook_getComponentsProps",`);
  console.log(`        arguments: { componentIds: ["${msg.storybookId}"] }`);
  console.log(`      })`);
}
```

**Problemas identificados:**
1. ❌ **No es automático** - El agente debe consultar manualmente
2. ❌ **No valida que se consultó** - Solo emite mensajes de advertencia
3. ⚠️ **Extracción de código** - Sí extrae desde Storybook pero sin validar props primero

**Solución necesaria:**
- Integrar consulta automática de Storybook MCP dentro de `autorun.apply()`
- Validar que se obtuvieron props antes de continuar (fail-closed real)
- Usar props obtenidas para validar estructura del código extraído

---

### **PASO 2: Resolver dependencias desde contratos**

#### **Estado Ideal:**
```
1. Autorun usa contratos (no Storybook) para:
   - Dependencias públicas necesarias (deps)
   - Tokens esperados (si están en el contrato)
2. Resultado: El bloque queda completo y consistente
```

#### **Estado Actual:**
```typescript
// En autorunApply.ts línea 748-784 (Mode B)
// ✅ 4. Resolver dependencias desde contratos (NO desde Storybook MCP)
console.log(`   [4] Resolviendo dependencias desde contratos...`);
const contractStore = new ContractStore();
const dependencyResolver = new DependencyResolver(contractStore);
const compositionPlanner = new CompositionPlanner(contractStore);

// Intentar obtener contrato del componente
let contract = null;
try {
  contract = await contractStore.getContract(componentName);
  if (contract) {
    console.log(`   ✅ Contrato encontrado para ${componentName}`);
    console.log(`   - Dependencias: ${contract.dependencies?.join(', ') || 'ninguna'}`);
    console.log(`   - Tokens esperados: ${contract.tokens?.join(', ') || 'ninguno'}`);
  }
} catch (error: any) {
  console.warn(`   ⚠️ No se pudo obtener contrato: ${error.message}`);
}

// Resolver dependencias
let resolvedDeps: string[] = [];
if (contract && contract.dependencies) {
  try {
    resolvedDeps = await dependencyResolver.resolve(contract.dependencies);
    console.log(`   ✅ Dependencias resueltas: ${resolvedDeps.join(', ')}`);
  } catch (error: any) {
    console.warn(`   ⚠️ Error resolviendo dependencias: ${error.message}`);
  }
}
```

**Estado:**
- ✅ **Implementado** - ContractStore, DependencyResolver, CompositionPlanner existen
- ⚠️ **No integrado completamente** - Se resuelve pero no se valida que todas las deps estén disponibles
- ⚠️ **Tokens del contrato** - Se obtienen pero no se validan contra GlobalTokenRegistry

**Solución necesaria:**
- Validar que todas las dependencias resueltas estén disponibles
- Validar tokens del contrato contra GlobalTokenRegistry
- Incluir deps y tokens en el watermark para auditoría

---

### **PASO 3: Generar código sin hardcodear estilos**

#### **Estado Ideal:**
```
1. Si existe componente → genera implementación "real" UBITS (o wrapper correcto)
2. Si NO existe → cae a PrototypeTokenKit (widget tokenizado)
3. Resultado: Visualmente coherente y sin violar reglas de tokens
```

#### **Estado Actual:**
```typescript
// En autorunApply.ts línea 786-828 (Mode B)
let codeToInsert = '';
let componentExists = false;

try {
  const exactCode = await extractExactCodeFromStorybookWithBrowser(componentId, 'default');
  if (exactCode && exactCode.html) {
    codeToInsert = exactCode.html;
    componentExists = true;
    console.log(`   ✅ Código UBITS extraído: ${codeToInsert.length} caracteres`);
  }
} catch (error: any) {
  console.warn(`   ⚠️ No se pudo extraer desde Storybook: ${error.message}`);
  console.log(`   📦 Usando PrototypeTokenKit como fallback...`);
}

// ✅ 6. Si no existe, generar widget tokenizado
if (!componentExists) {
  const tokenKit = new PrototypeTokenKit(tokenRegistry);
  // ... genera según tipo detectado
}
```

**Estado:**
- ✅ **Funciona** - Extrae desde Storybook o usa PrototypeTokenKit
- ⚠️ **No valida tokens en código extraído** - Si Storybook retorna código con hardcoded colors, no se detecta
- ⚠️ **PrototypeTokenKit limitado** - Solo genera algunos tipos de widgets

**Solución necesaria:**
- Validar código extraído de Storybook para detectar hardcoded colors
- Expandir PrototypeTokenKit para más tipos de widgets
- Sanitizar código extraído para reemplazar hardcoded colors con tokens

---

### **PASO 4: Insertar con Watermark v2**

#### **Estado Ideal:**
```
1. Todo va dentro del watermark + hash
2. Resultado: El sistema puede auditar exactamente qué fue generado
```

#### **Estado Actual:**
```typescript
// En autorunApply.ts línea 864-882 (Mode B)
// ✅ 8. Insertar con watermark v2 usando HtmlPrototypeAdapter
console.log(`   [8] Insertando código con watermark v2...`);

const adapter = new HtmlPrototypeAdapter(targetFile);
const anchors = await adapter.findAnchors();

const { wrappedContent } = emitWatermark(
  {
    v: 2,
    mode: 'prototypeTokens',
    components: [componentName],
    widgets: componentExists ? [] : [componentName],
    deps: resolvedDeps,
  },
  codeToInsert
);

if (anchors.content) {
  await adapter.insertContent(wrappedContent);
  console.log(`   ✅ Código insertado con watermark v2`);
}
```

**Estado:**
- ✅ **Implementado correctamente** - Watermark v2 con hash, componentes, deps
- ✅ **HtmlPrototypeAdapter** - Inserta en anchors correctos
- ⚠️ **Metadata incompleta** - No incluye tokens esperados del contrato

**Solución necesaria:**
- Incluir tokens esperados en metadata del watermark
- Incluir storybookId en metadata para auditoría

---

### **PASO 5: Verificar diff-based**

#### **Estado Ideal:**
```
1. autorun.verify("diff") asegura:
   - Nadie tocó fuera de watermark
   - No hay colores hardcodeados
   - No hay tokens inválidos
   - Hash correcto
2. Resultado: "Perfecto" = implementado + no degradable
```

#### **Estado Actual:**
```typescript
// En VerifyDiff.ts
// ✅ Verifica solo líneas modificadas (git diff hunks)
// ✅ Soporte para --staged y --baseRef
// ✅ Valida watermarks, hash, colores hardcodeados, tokens
```

**Estado:**
- ✅ **Implementado correctamente** - Verificación diff-based completa
- ✅ **Fail-closed** - Si hay cambios sin watermark, falla
- ✅ **Detección de colores** - Detecta hex/rgb/hsl en CSS real
- ✅ **Validación de tokens** - Valida contra GlobalTokenRegistry

**Solución necesaria:**
- ✅ Ya está perfecto - No necesita cambios

---

### **PASO 6: Enforcement**

#### **Estado Ideal:**
```
1. Pre-commit bloquea commits malos
2. CI bloquea PRs malos
3. Resultado: la perfección se mantiene en el tiempo
```

#### **Estado Actual:**
```typescript
// En verifyDiffRunner.ts
// ✅ Soporte para --staged (pre-commit)
// ✅ Soporte para --baseRef (CI)
```

**Estado:**
- ✅ **Pre-commit hook** - Existe y usa verifyDiffRunner
- ⚠️ **CI workflow** - Necesita verificación
- ⚠️ **Mensajes de error** - Pueden mejorar para guiar al usuario

**Solución necesaria:**
- Verificar que CI workflow ejecuta autorun.verify
- Mejorar mensajes de error con instrucciones claras

---

## 🎯 PLAN DE ACCIÓN PARA LLEGAR AL ESTADO IDEAL

### **PRIORIDAD ALTA (Crítico)**

1. **Integrar consulta automática de Storybook MCP en autorun.apply()**
   - Hacer que autorun.apply() consulte Storybook MCP automáticamente
   - Validar que se obtuvieron props antes de continuar (fail-closed real)
   - Usar props para validar estructura del código extraído

2. **Validar código extraído de Storybook para hardcoded colors**
   - Detectar colores hardcodeados en código extraído
   - Sanitizar reemplazando con tokens cuando sea posible
   - Fallar si no se puede sanitizar

3. **Completar integración de contratos**
   - Validar que todas las dependencias resueltas estén disponibles
   - Validar tokens del contrato contra GlobalTokenRegistry
   - Incluir deps y tokens en metadata del watermark

### **PRIORIDAD MEDIA (Importante)**

4. **Expandir PrototypeTokenKit**
   - Agregar más tipos de widgets
   - Mejorar detección automática del tipo de widget

5. **Mejorar metadata del watermark**
   - Incluir tokens esperados
   - Incluir storybookId
   - Incluir versión del componente si está disponible

6. **Verificar CI workflow**
   - Asegurar que ejecuta autorun.verify
   - Mejorar mensajes de error

### **PRIORIDAD BAJA (Mejoras)**

7. **Mejorar mensajes de error**
   - Guías claras para corregir problemas
   - Enlaces a documentación

8. **Optimizaciones de rendimiento**
   - Cachear consultas a Storybook MCP
   - Cachear tokens cargados

---

## 📋 CHECKLIST DE VERIFICACIÓN

### **Para verificar que Autorun funciona como debe:**

- [ ] **Paso 1: Storybook**
  - [ ] Consulta automática de Storybook MCP
  - [ ] Validación de props obtenidas
  - [ ] Extracción de código exacto

- [ ] **Paso 2: Contratos**
  - [ ] Resolución de dependencias
  - [ ] Validación de tokens del contrato
  - [ ] Inclusión en watermark

- [ ] **Paso 3: Generación**
  - [ ] Código UBITS real o PrototypeTokenKit
  - [ ] Sin hardcoded colors
  - [ ] Validación de tokens usados

- [ ] **Paso 4: Watermark**
  - [ ] Watermark v2 con hash
  - [ ] Metadata completa
  - [ ] Inserción en anchors correctos

- [ ] **Paso 5: Verificación**
  - [ ] Diff-based verification
  - [ ] Soporte staged/baseRef
  - [ ] Detección de violaciones

- [ ] **Paso 6: Enforcement**
  - [ ] Pre-commit hook activo
  - [ ] CI workflow configurado
  - [ ] Mensajes de error claros

---

## 🎯 CONCLUSIÓN

**Estado actual:** 80% implementado, 20% necesita mejoras

**Principales gaps:**
1. Consulta automática de Storybook MCP (requiere intervención manual)
2. Validación de código extraído para hardcoded colors
3. Integración completa de contratos (validación de deps y tokens)

**Próximos pasos:**
1. Implementar consulta automática de Storybook MCP
2. Agregar validación y sanitización de código extraído
3. Completar integración de contratos

**Tiempo estimado:** 2-3 días de desarrollo

---

**Última actualización:** 2025-01-03

