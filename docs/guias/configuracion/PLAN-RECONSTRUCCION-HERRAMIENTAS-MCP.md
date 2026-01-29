# 🔧 Plan de Reconstrucción de Herramientas MCP - Paso a Paso

**Fecha:** 2025-01-24  
**Objetivo:** Reconstruir las herramientas del MCP una por una con logs detallados para identificar y corregir errores

---

## 📋 Estrategia General

1. **Herramienta de Prueba Simple** (`autorun.test`) - ✅ CREADA
2. **Probar cada herramienta individualmente** antes de continuar
3. **Agregar logs detallados** en cada paso
4. **Verificar que no cause errores** antes de pasar a la siguiente

---

## 🧪 FASE 1: Herramienta de Prueba Simple

### ✅ Herramienta: `autorun.test`

**Estado:** ✅ CREADA

**Propósito:** Verificar que el MCP funciona sin errores básicos

**Prueba:**
```bash
# Usar desde Cursor:
autorun.test con mensaje "prueba"
```

**Verificación:**
- ✅ El MCP no se pone rojo
- ✅ Retorna JSON válido
- ✅ Los logs aparecen en stderr
- ✅ No hay errores en la consola

**Si falla:** El problema está en el servidor base, no en las herramientas

---

## 🔧 FASE 2: Herramientas Simples (Sin Dependencias Externas)

### 2.1 Herramienta: `autorun.plan`

**Dependencias:** `handleUserMessage`, `detectComponentFromMessage`

**Plan de Reconstrucción:**
1. Crear versión simplificada que solo retorne un plan básico
2. Agregar logs detallados en cada paso
3. Probar con mensaje simple: "implementar Button"
4. Verificar que no cause errores
5. Agregar funcionalidad completa paso a paso

**Logs a agregar:**
```typescript
console.error('📋 [autorun.plan] Paso 1: Validar input');
console.error('📋 [autorun.plan] Paso 2: Detectar componente');
console.error('📋 [autorun.plan] Paso 3: Generar plan');
console.error('📋 [autorun.plan] Paso 4: Retornar resultado');
```

**Prueba:**
```bash
autorun.plan con mensaje "implementar Button"
```

---

### 2.2 Herramienta: `autorun.checklist`

**Dependencias:** `PreImplementationCheckAddon`

**Plan de Reconstrucción:**
1. Crear versión simplificada que solo retorne checklist básico
2. Agregar logs detallados
3. Probar con componente simple
4. Verificar que no cause errores
5. Agregar funcionalidad completa

**Logs a agregar:**
```typescript
console.error('✅ [autorun.checklist] Paso 1: Validar input');
console.error('✅ [autorun.checklist] Paso 2: Obtener AutorunHub');
console.error('✅ [autorun.checklist] Paso 3: Obtener checklist');
console.error('✅ [autorun.checklist] Paso 4: Retornar resultado');
```

---

### 2.3 Herramienta: `autorun.verify`

**Dependencias:** `autorunVerify` del MCP anterior

**Plan de Reconstrucción:**
1. Crear versión simplificada que solo verifique archivos básicos
2. Agregar logs detallados
3. Probar con archivo simple
4. Verificar que no cause errores
5. Agregar funcionalidad completa

---

## 🚀 FASE 3: Herramienta Compleja (autorun.apply)

### 3.1 Herramienta: `autorun.apply` - Reconstrucción Completa

**Dependencias:** Múltiples (handleUserMessage, Storybook MCP, etc.)

**Plan de Reconstrucción Paso a Paso:**

#### Paso 1: Validación Básica
```typescript
console.error('🚀 [autorun.apply] Paso 1: Validar input');
// Validar que message no esté vacío
// Retornar error si está vacío (sin throw)
```

#### Paso 2: Detección de Componente
```typescript
console.error('🚀 [autorun.apply] Paso 2: Detectar componente');
// Llamar detectComponentFromMessage
// Log del componente detectado
// Si no se detecta, retornar error (sin throw)
```

#### Paso 3: Consultar Storybook MCP (Opcional)
```typescript
console.error('🚀 [autorun.apply] Paso 3: Consultar Storybook MCP');
// Intentar consultar Storybook MCP
// Si falla, log del error pero continuar
// No lanzar excepciones
```

#### Paso 4: Extraer HTML (Opcional)
```typescript
console.error('🚀 [autorun.apply] Paso 4: Extraer HTML');
// Intentar extraer HTML
// Si falla, log del error pero continuar
// No lanzar excepciones
```

#### Paso 5: Retornar Resultado
```typescript
console.error('🚀 [autorun.apply] Paso 5: Retornar resultado');
// Retornar resultado en formato JSON
// Incluir errores si los hay, pero success=false
// NUNCA lanzar excepciones
```

**Reglas Críticas:**
- ❌ **NUNCA usar `throw`** - siempre retornar errores en el objeto de respuesta
- ✅ **SIEMPRE usar `console.error`** para logs (stdout es para comunicación MCP)
- ✅ **SIEMPRE envolver en try-catch** cada paso crítico
- ✅ **SIEMPRE retornar JSON válido** incluso en caso de error

---

## 📝 Template de Herramienta Segura

```typescript
export async function autorunToolName(
  input: AutorunToolInput
): Promise<AutorunToolOutput> {
  console.error('🔧 [autorun.toolName] ========================================');
  console.error('🔧 [autorun.toolName] Iniciando...');
  console.error(`   📝 Input: ${JSON.stringify(input, null, 2)}`);
  console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);

  try {
    // Paso 1: Validar input
    console.error('   ✅ [PASO 1] Validando input...');
    if (!input.requiredField) {
      return {
        success: false,
        error: 'Campo requerido faltante',
        // ... otros campos
      };
    }

    // Paso 2: Procesar
    console.error('   ✅ [PASO 2] Procesando...');
    // ... lógica aquí

    // Paso 3: Retornar resultado
    console.error('   ✅ [PASO 3] Retornando resultado...');
    return {
      success: true,
      // ... resultado
    };
  } catch (error: any) {
    console.error('❌ [autorun.toolName] ERROR:', error);
    console.error(`   📋 Stack: ${error.stack}`);
    
    return {
      success: false,
      error: error.message,
      // ... otros campos
    };
  } finally {
    console.error('🔧 [autorun.toolName] ========================================');
  }
}
```

---

## ✅ Checklist de Verificación por Herramienta

Para cada herramienta, verificar:

- [ ] ✅ El MCP no se pone rojo al usar la herramienta
- [ ] ✅ Retorna JSON válido siempre (incluso en errores)
- [ ] ✅ Los logs aparecen en stderr (no stdout)
- [ ] ✅ No hay errores en la consola del MCP
- [ ] ✅ Los errores se manejan correctamente (sin throw)
- [ ] ✅ La herramienta funciona con input válido
- [ ] ✅ La herramienta maneja input inválido correctamente

---

## 🚨 Orden de Prioridad

1. **autorun.test** - ✅ CREADA (verificar primero)
2. **autorun.plan** - Herramienta simple, buena para probar
3. **autorun.checklist** - Herramienta simple
4. **autorun.verify** - Herramienta simple
5. **autorun.apply** - Herramienta compleja (reconstruir paso a paso)

---

## 📚 Referencias

- **Servidor MCP:** `packages/autorun-core/src/mcp-server-v2/server.ts`
- **Tools:** `packages/autorun-core/src/mcp-server-v2/tools/`
- **Tipos:** `packages/autorun-core/src/mcp-server-v2/types.ts`

---

**Última actualización:** 2025-01-24



