# 🎯 Plan para Implementar Componentes a la Perfección

> **Fecha:** 2025-01-03  
> **Estado:** ✅ MCP Funcionando Correctamente

---

## ✅ Estado Actual

### Lo que YA funciona:

1. **✅ MCP Configurado y Funcionando**
   - Servidor: `storybook-ubits`
   - Herramientas: `getComponentList`, `getComponentsProps`
   - Wrapper personalizado con timeouts aumentados y múltiples selectores
   - URL correcta: `iframe.html?viewMode=docs&id=...`

2. **✅ Extracción de Props Funcionando**
   - Extrae correctamente desde Storybook
   - Pruebas exitosas con Button (17 props) y DataTable (65 props)
   - Tabla encontrada con selector `table.docblock-argstable`

3. **✅ Mapeo de Nombres Actualizado**
   - Usa nombres completos: `"Básicos/Button"` en lugar de `"Button"`
   - Mapeo de IDs a nombres completos implementado

---

## 🔧 Lo que Falta para Perfección

### 1. **Actualizar Mapeo de Nombres en Todo el Código** ⚠️ CRÍTICO

**Problema:** Algunos archivos aún usan nombres simples en lugar de nombres completos.

**Archivos a actualizar:**
- ✅ `packages/autorun-core/src/helpers/storybookMCPNameMapper.ts` - **YA ACTUALIZADO**
- ⚠️ Verificar que `autorunApply.ts` use correctamente el mapeo
- ⚠️ Verificar que `autoMessageHandler.ts` use nombres completos
- ⚠️ Verificar que `executeOnMessageStart.ts` use nombres completos

**Acción:**
```typescript
// ❌ INCORRECTO (nombre simple)
const componentName = 'Button';

// ✅ CORRECTO (nombre completo)
const componentName = 'Básicos/Button';
```

---

### 2. **Verificar Flujo Completo de `autorun.apply()`** ⚠️ IMPORTANTE

**Flujo esperado:**
1. ✅ `handleUserMessage()` detecta componente
2. ✅ Obtiene ID de Storybook (`basicos-button`)
3. ⚠️ Convierte ID a nombre completo (`Básicos/Button`)
4. ⚠️ Llama MCP con nombre completo
5. ✅ MCP extrae props correctamente
6. ✅ Extrae código desde Storybook
7. ✅ Valida estructura
8. ✅ Escribe con marcas Autorun

**Verificar:**
- [ ] `autorunApply.ts` línea 247: ¿Convierte correctamente el ID a nombre completo?
- [ ] `mcpClient.ts` línea 221: ¿Maneja correctamente `componentNames`?
- [ ] ¿El MCP recibe el nombre completo correcto?

---

### 3. **Probar Implementación Completa** ⚠️ OBLIGATORIO

**Prueba sugerida:**
```bash
# Desde Cursor, ejecutar:
autorun.apply({
  message: "Implementar un botón primario con texto 'Guardar'",
  targetFiles: ["prototypes/test-button.html"]
})
```

**Verificar:**
- [ ] ¿Se detecta el componente correctamente?
- [ ] ¿Se consulta el MCP con el nombre completo?
- [ ] ¿Se extraen las props correctamente?
- [ ] ¿Se extrae el código HTML desde Storybook?
- [ ] ¿Se valida la estructura antes de escribir?
- [ ] ¿Se escriben las marcas Autorun correctamente?

---

### 4. **Documentar Casos de Uso Comunes** 📚

**Crear guías para:**
- [ ] Implementar componente básico (Button, Input, etc.)
- [ ] Implementar componente complejo (DataTable, Modal, etc.)
- [ ] Implementar múltiples componentes en una página
- [ ] Implementar componente con variantes (Button con diferentes variants)

---

### 5. **Mejorar Manejo de Errores** 🛡️

**Errores comunes a manejar:**
- [ ] Componente no encontrado en Storybook
- [ ] MCP no disponible (timeout, conexión, etc.)
- [ ] Props no extraídas correctamente
- [ ] Código HTML no extraído desde Storybook
- [ ] Validación fallida

**Acción:**
- Agregar mensajes de error más descriptivos
- Agregar fallbacks cuando sea posible
- Logging detallado para debugging

---

## 🚀 Próximos Pasos Inmediatos

### Paso 1: Verificar Mapeo en `autorunApply.ts`

```typescript
// En autorunApply.ts línea 247
const componentName = storybookIdToComponentName(componentId) || componentId;

// Verificar que retorne "Básicos/Button" y no "Button"
console.log(`Componente convertido: ${componentId} → ${componentName}`);
```

### Paso 2: Probar MCP con Nombre Completo

```bash
# Desde terminal, probar directamente:
node -e "
import('./packages/autorun-core/src/helpers/mcpClient.js').then(async ({ callStorybookMCPTool }) => {
  const result = await callStorybookMCPTool('getComponentsProps', {
    componentNames: ['Básicos/Button']
  });
  console.log('Resultado:', JSON.stringify(result, null, 2));
});
"
```

### Paso 3: Probar Implementación Completa

```bash
# Desde Cursor, usar autorun.apply() con un componente simple
# Ejemplo: "Implementar un botón primario"
```

---

## 📋 Checklist Final

- [x] MCP configurado y funcionando
- [x] Wrapper personalizado con timeouts aumentados
- [x] Extracción de props funcionando
- [x] Mapeo de nombres actualizado
- [ ] Verificar flujo completo de `autorun.apply()`
- [ ] Probar implementación completa
- [ ] Documentar casos de uso
- [ ] Mejorar manejo de errores

---

## 🎯 Objetivo Final

**Implementar cualquier componente UBITS desde Storybook con:**
1. ✅ Props exactas extraídas automáticamente
2. ✅ Código HTML exacto desde Storybook
3. ✅ Validación de estructura antes de escribir
4. ✅ Marcas Autorun para verificación
5. ✅ Post-procesamiento automático (Prettier, ESLint, Auto-Reload)

---

**Última actualización:** 2025-01-03











































