# 🔍 Análisis en Profundidad: Fallos en autorun.apply con Avatar

**Fecha:** 2025-12-27  
**Componente:** Avatar  
**Herramienta:** autorun.apply (Mode B - prototypeTokens)

---

## 📊 Resumen Ejecutivo

### ✅ Lo que Funcionó:
1. **Detección de componente:** `handleUserMessage()` detectó "Avatar" correctamente
2. **Modo autorun.apply():** Se activó globalmente correctamente
3. **Inicialización AutorunHub:** Todos los add-ons se inicializaron correctamente
4. **Detección de modo:** Se detectó correctamente "prototypeTokens" para archivos en `prototypes/`

### ⚠️ Puntos Críticos Identificados:

#### 1. **Extracción de código desde Storybook**
**Ubicación:** `extractExactCodeFromStorybookWithBrowser()`

**Posibles fallos:**
- `getComponentCode` del Storybook MCP puede fallar si:
  - El componente no existe en Storybook
  - El Storybook MCP no está disponible
  - El ID del componente es incorrecto
- `fetchStorybookPage` puede fallar si:
  - La URL de Storybook no es accesible
  - El contenido se carga dinámicamente y requiere Browser MCP
  - El selector para extraer código no encuentra el elemento

**Evidencia en logs:**
```
✅ [Auto Component Detection] Componente detectado: Avatar (confianza: high)
```

**Siguiente paso esperado:**
```
extractExactCodeFromStorybookWithBrowser('basicos-avatar', 'default')
```

#### 2. **Mapeo de componente a Storybook ID**
**Ubicación:** `mapAndValidateComponentNameToStorybookId()`

**Posibles fallos:**
- El mapeo "Avatar" → "basicos-avatar" puede no existir
- El ID puede estar incorrecto
- El componente puede no estar en el Storybook activo

**Verificación necesaria:**
```typescript
// Verificar que el mapeo existe:
const storybookId = await mapAndValidateComponentNameToStorybookId('Avatar');
// Debería retornar: 'basicos-avatar'
```

#### 3. **Consulta Storybook MCP**
**Ubicación:** `storybookExactCodeExtractorWithBrowser.ts`

**Posibles fallos:**
- El Storybook MCP puede no estar disponible
- `getComponentCode` puede retornar error
- El componente puede no tener historia "default" o "implementation"

**Flujo esperado:**
```typescript
1. Consultar Storybook MCP: getComponentCode('basicos-avatar', 'default')
2. Si falla, intentar: getComponentCode('basicos-avatar', 'implementation')
3. Si falla, usar Browser MCP para extraer desde Docs
```

#### 4. **Detección de archivo objetivo**
**Ubicación:** `detectTargetFile()`

**Posibles fallos:**
- El archivo puede no existir
- El archivo puede estar en una ruta diferente
- El sistema puede detectar el archivo incorrecto

**Evidencia en logs:**
```
✅ Modo detectado: prototypeTokens
📁 Archivo objetivo: prototypes/canvas-administrador-encuestas-2025-12-26.html
```

---

## 🔍 Análisis del Flujo Real

### Flujo Esperado:
```
1. autorun.apply() llamado
   ↓
2. Detección de modo: prototypeTokens (porque está en prototypes/)
   ↓
3. handleUserMessage() → Detecta Avatar ✅
   ↓
4. mapAndValidateComponentNameToStorybookId('Avatar') → 'basicos-avatar'
   ↓
5. extractExactCodeFromStorybookWithBrowser('basicos-avatar', 'default')
   ↓
6. Consultar Storybook MCP: getComponentCode('basicos-avatar', 'default')
   ↓
7. Si falla, usar Browser MCP para extraer desde Docs
   ↓
8. Insertar código en archivo HTML
   ↓
9. Post-implementación (Prettier, ESLint, Auto-Reload)
```

### Flujo Real (basado en logs):
```
1. autorun.apply() llamado ✅
   ↓
2. Modo detectado: prototypeTokens ✅
   ↓
3. handleUserMessage() → Detecta Avatar ✅
   ↓
4. AutorunHub inicializado ✅
   ↓
5. [CORTADO - No se ve el resultado final]
```

---

## 🎯 Problemas Críticos Identificados

### 1. **Logs se cortan antes del resultado final**
**Problema:** El script de prueba se corta antes de mostrar el resultado final de `autorun.apply()`.

**Solución:**
- Ejecutar el script con más tiempo de espera
- Revisar logs del MCP directamente en Cursor
- Agregar más logs en puntos críticos

### 2. **Falta de logs en puntos críticos**
**Problema:** No hay suficientes logs en:
- `extractExactCodeFromStorybookWithBrowser()`
- `mapAndValidateComponentNameToStorybookId()`
- `getComponentCode()` del Storybook MCP

**Solución:**
- Agregar logs detallados en cada paso de extracción
- Loggear el resultado de cada consulta al Storybook MCP
- Loggear el código extraído (primeros 200 caracteres)

### 3. **Manejo de errores silencioso**
**Problema:** Si `extractExactCodeFromStorybookWithBrowser()` falla, el error puede no propagarse correctamente.

**Solución:**
- Asegurar que todos los errores se capturen y retornen en el resultado
- No usar `throw` que puede cerrar el servidor MCP
- Retornar errores estructurados en el `AutorunApplyOutput`

---

## 📋 Recomendaciones

### 1. **Agregar más logs detallados**
```typescript
// En extractExactCodeFromStorybookWithBrowser():
console.error(`🔍 [Extract Code] Iniciando extracción para ${componentId}`);
console.error(`🔍 [Extract Code] Story name: ${storyName}`);
console.error(`🔍 [Extract Code] Intentando Storybook MCP...`);
// ... después de cada intento
console.error(`🔍 [Extract Code] Resultado: ${result ? 'ÉXITO' : 'FALLO'}`);
```

### 2. **Verificar mapeo de componentes**
```typescript
// Verificar que el mapeo existe:
const storybookId = await mapAndValidateComponentNameToStorybookId('Avatar');
console.error(`🔍 [Map Component] Avatar → ${storybookId}`);
if (!storybookId) {
  console.error(`❌ [Map Component] No se encontró mapeo para Avatar`);
}
```

### 3. **Probar directamente desde Cursor**
En lugar de usar el script de prueba, probar directamente desde Cursor usando el MCP tool:
```
"implementa un avatar usando autorun.apply"
```

Esto permitirá ver los logs completos del MCP en tiempo real.

---

## 🔧 Próximos Pasos

1. ✅ Ejecutar prueba desde Cursor (no desde script)
2. ✅ Revisar logs completos del MCP
3. ✅ Identificar el punto exacto donde falla
4. ✅ Agregar logs detallados en puntos críticos
5. ✅ Corregir el problema identificado

---

**Última actualización:** 2025-12-27

