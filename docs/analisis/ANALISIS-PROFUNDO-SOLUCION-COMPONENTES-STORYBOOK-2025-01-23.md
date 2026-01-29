# 🔍 Análisis Profundo: Solución para Componentes Idénticos a Storybook

> **Fecha:** 2025-01-23  
> **Problema:** Los componentes implementados manualmente no son exactamente iguales a los de Storybook  
> **Objetivo:** Encontrar la mejor solución usando MCPs disponibles (Storybook MCP + Autorun MCP)

---

## 🚨 Problema Actual

### **Síntomas:**
1. ❌ Los componentes manuales no coinciden visualmente con Storybook
2. ❌ Los componentes no aparecen (contenedor en blanco)
3. ❌ Los componentes no son funcionales (no clickeables)
4. ❌ `components-loader.js` no está cargando `window.UBITS.Button` ni `window.UBITS.Modal`

### **Causa Raíz:**
- Estamos creando HTML manual en lugar de usar los componentes reales de UBITS
- Los componentes reales requieren:
  - Carga correcta de `components-loader.js`
  - Registro de Web Components (`customElements.define`)
  - APIs globales (`window.UBITS.Button.create()`)
  - CSS correcto de los componentes

---

## 🎯 MCPs Disponibles

### **1. Storybook MCP** ⭐

**Herramientas:**
- `mcp_storybook_getComponentList` - Lista todos los componentes
- `mcp_storybook_getComponentsProps` - Obtiene props exactas de componentes

**Capacidades:**
- ✅ Obtiene props estructuradas (tipos, defaults, descripciones)
- ✅ Obtiene controles disponibles
- ❌ **NO obtiene código HTML** (solo props)

**Limitación crítica:**
- Storybook MCP solo retorna props, NO código de implementación
- Necesitamos código HTML/JS exacto, no solo props

---

### **2. Autorun MCP** ⭐⭐

**Herramientas:**
- `autorun.apply` - Implementa componentes automáticamente
- `autorun.verify` - Verifica implementación
- `autorun.plan` - Genera plan de implementación

**Capacidades de `autorun.apply()`:**
1. ✅ Detecta componentes automáticamente
2. ✅ Consulta Storybook MCP automáticamente (props)
3. ✅ **Extrae código exacto desde Storybook** usando Browser MCP
4. ✅ Valida estructura antes de implementar
5. ✅ Implementa con watermark de Autorun
6. ✅ Post-procesamiento (Prettier, ESLint, Auto-Reload)

**Flujo completo de `autorun.apply()`:**
```
1. handleUserMessage() → Detecta componente
   ↓
2. Storybook MCP → Obtiene props exactas
   ↓
3. Browser MCP → Extrae código exacto desde Storybook
   ↓
4. Validación pre-implementación → Verifica estructura
   ↓
5. Análisis componentes internos → Detecta dependencias
   ↓
6. Escritura con watermark → Implementa código exacto
   ↓
7. Post-procesamiento → Prettier, ESLint, Auto-Reload
```

---

## 🔍 Análisis de Soluciones

### **Opción 1: Usar `autorun.apply()` Directamente** ⭐⭐⭐ RECOMENDADA

**Ventajas:**
- ✅ **Extrae código exacto** desde Storybook usando Browser MCP
- ✅ **Consulta Storybook MCP** automáticamente para props
- ✅ **Implementa con watermark** para verificación
- ✅ **Fail-closed:** Si Storybook MCP falla → NO escribe nada
- ✅ **Post-procesamiento automático** (Prettier, ESLint, Auto-Reload)
- ✅ **Sistema completo** ya implementado y funcionando

**Cómo funciona:**
```typescript
// 1. Llamar autorun.apply() con el mensaje del usuario
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: 'Implementar un botón que abre un modal',
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-23.html']
  }
});

// autorun.apply() automáticamente:
// - Detecta "Button" y "Modal"
// - Consulta Storybook MCP para props
// - Extrae código exacto desde Storybook usando Browser MCP
// - Implementa con código exacto + watermark
// - Verifica después con autorun.verify()
```

**Desventajas:**
- ⚠️ Requiere que Browser MCP esté disponible para extraer código
- ⚠️ Puede ser más lento que implementación manual (pero más preciso)

---

### **Opción 2: Consultar Storybook MCP + Browser MCP Manualmente**

**Ventajas:**
- ✅ Control total sobre el proceso
- ✅ Puede ser más rápido para casos simples

**Desventajas:**
- ❌ Requiere múltiples pasos manuales
- ❌ Más propenso a errores
- ❌ No tiene watermark ni verificación automática
- ❌ No tiene post-procesamiento automático

**Cómo funcionaría:**
```typescript
// 1. Consultar Storybook MCP para props
const props = await mcp_storybook_getComponentsProps(['Button', 'Modal']);

// 2. Navegar a Storybook con Browser MCP
await browser_navigate({ 
  url: 'https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default' 
});

// 3. Extraer código desde pestaña "Code"
const code = await extractCodeFromStorybook();

// 4. Implementar manualmente (sin autorun.apply())
// ❌ Problema: No tiene watermark ni verificación
```

---

### **Opción 3: Mejorar `components-loader.js` para Cargar Componentes**

**Ventajas:**
- ✅ Los componentes estarían disponibles globalmente
- ✅ Podríamos usar `window.UBITS.Button.create()` directamente

**Desventajas:**
- ❌ Requiere modificar `components-loader.js` (archivo externo en Storybook)
- ❌ No garantiza que los componentes se carguen correctamente
- ❌ No resuelve el problema de extraer código exacto

---

## 🎯 Solución Recomendada: Usar `autorun.apply()`

### **Por qué es la mejor opción:**

1. **✅ Extrae código exacto desde Storybook**
   - Usa Browser MCP para navegar a Storybook
   - Extrae código desde la pestaña "Code"
   - Garantiza que el código sea idéntico a Storybook

2. **✅ Consulta Storybook MCP automáticamente**
   - Obtiene props exactas antes de implementar
   - Valida que las props sean correctas
   - Combina código con props para implementación perfecta

3. **✅ Sistema completo y probado**
   - Ya está implementado y funcionando
   - Tiene watermark para verificación
   - Tiene post-procesamiento automático
   - Tiene verificación después de implementar

4. **✅ Fail-closed (seguro)**
   - Si Storybook MCP falla → NO escribe nada
   - Si Browser MCP falla → NO escribe nada
   - Solo implementa si todo está correcto

---

## 📋 Plan de Implementación

### **Paso 1: Usar `autorun.apply()` para Implementar Componentes**

```typescript
// En lugar de crear HTML manual, usar autorun.apply()
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: 'Implementar un botón que abre un modal en el template canvas-administrador-encuestas-2025-12-23.html',
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-23.html']
  }
});
```

### **Paso 2: Verificar Implementación**

```typescript
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: {
    targetFiles: 'diff' // Verifica todos los cambios
  }
});
```

### **Paso 3: Si `autorun.apply()` Falla**

**Opción A: Consultar Storybook MCP + Browser MCP Manualmente**
```typescript
// 1. Consultar Storybook MCP para props
const buttonProps = await mcp_storybook_getComponentsProps(['Button']);
const modalProps = await mcp_storybook_getComponentsProps(['Modal']);

// 2. Navegar a Storybook con Browser MCP
await browser_navigate({ 
  url: 'https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default' 
});
await browser_snapshot();

// 3. Hacer clic en pestaña "Code"
await browser_click({ element: 'Code tab', ref: 'code-tab-ref' });
await browser_snapshot();

// 4. Extraer código exacto
const code = await extractCodeFromSnapshot();

// 5. Implementar usando código exacto
// (pero aún mejor usar autorun.apply() que hace todo esto automáticamente)
```

**Opción B: Usar Historia "Implementation (Copy/Paste)"**
```typescript
// Navegar directamente a la historia "implementation"
await browser_navigate({ 
  url: 'https://ubits-storybook10.vercel.app/?path=/story/basicos-button--implementation-copy-paste' 
});

// Extraer código desde esta historia específica
// Esta historia está diseñada para ser copiada y pegada directamente
```

---

## ✅ Conclusión

**La mejor solución es usar `autorun.apply()` porque:**

1. ✅ **Extrae código exacto** desde Storybook usando Browser MCP
2. ✅ **Consulta Storybook MCP** automáticamente para props
3. ✅ **Implementa con watermark** para verificación
4. ✅ **Sistema completo** ya implementado y funcionando
5. ✅ **Fail-closed** (seguro, no escribe si falla)

**Si `autorun.apply()` no está disponible o falla:**
- Consultar Storybook MCP + Browser MCP manualmente
- Extraer código desde historia "Implementation (Copy/Paste)"
- Implementar usando código exacto extraído

**NO usar:**
- ❌ HTML manual (no coincide con Storybook)
- ❌ Intentar cargar `components-loader.js` manualmente (no garantiza carga correcta)
- ❌ Inventar código sin consultar Storybook

---

## 🚀 Próximos Pasos

1. **Implementar usando `autorun.apply()`:**
   ```typescript
   await call_mcp_tool({
     server: 'autorun',
     toolName: 'autorun.apply',
     arguments: {
       message: 'Implementar un botón que abre un modal',
       targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-23.html']
     }
   });
   ```

2. **Verificar implementación:**
   ```typescript
   await call_mcp_tool({
     server: 'autorun',
     toolName: 'autorun.verify',
     arguments: { targetFiles: 'diff' }
   });
   ```

3. **Si falla, usar fallback manual:**
   - Consultar Storybook MCP para props
   - Navegar a Storybook con Browser MCP
   - Extraer código desde pestaña "Code"
   - Implementar usando código exacto

---

**Última actualización:** 2025-01-23


