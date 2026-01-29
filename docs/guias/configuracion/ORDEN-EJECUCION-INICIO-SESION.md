# 📋 Orden de Ejecución al Inicio de Sesión

> **⚠️ CRÍTICO:** Este es el orden EXACTO que debe seguirse al inicio de cada sesión o cuando el usuario dice "activa el autorun".

---

## 🎯 Objetivo

Garantizar que Autorun se inicialice correctamente siguiendo un orden claro y verificable.

---

## 📋 Orden de Ejecución (Numerado)

### **PASO 1: Detectar Wizard** ⚠️ OBLIGATORIO

**Cuándo:** SIEMPRE al inicio de cada mensaje

**Qué hacer:**
```javascript
// Ejecutar script de detección
const result = await run_terminal_cmd({
  command: 'node scripts/detect-wizard-state.js',
  is_background: false
});

// Verificar si hay wizard
const hasWizard = result.stdout.includes('[AUTORUN_WIZARD_STATE_DETECTED]true');
const urlMatch = result.stdout.match(/\[AUTORUN_BROWSER_URL\](.+?)\[\/AUTORUN_BROWSER_URL\]/);
const url = urlMatch ? urlMatch[1] : null;
```

**Resultado:**
- `hasWizard = true/false`
- `url = URL del template o null`

**Siguiente paso:**
- Si `hasWizard === true` → Ir a PASO 2
- Si `hasWizard === false` → Ir a PASO 3

---

### **PASO 2: Inicializar AutorunHub (si hay wizard)** ⚠️ OBLIGATORIO

**Cuándo:** Solo si `hasWizard === true` y `url !== null`

**Qué hacer:**
```javascript
// Inicializar AutorunHub PRIMERO
await run_terminal_cmd({
  command: 'npm run autorun:init-hub',
  is_background: false
});

// Verificar que se inicializó correctamente
// Debe ver en la salida:
// - ✅ "🚀 Inicializando AutorunHub..."
// - ✅ "✅ AutorunHub inicializado correctamente"
// - ✅ "📊 Estado de Autorun:"
// - ✅ "   - Inicializado: ✅"
// - ✅ "   - File Watching: ✅ activo"
```

**Siguiente paso:** → Ir a PASO 4

---

### **PASO 3: Inicializar AutorunHub (si NO hay wizard)** ⚠️ OBLIGATORIO

**Cuándo:** Si `hasWizard === false` O si AutorunHub no está inicializado

**Qué hacer:**
```javascript
// Verificar si AutorunHub está inicializado
import { isAutorunHubInitialized } from '@autorun/core';

if (!isAutorunHubInitialized()) {
  // Inicializar AutorunHub
  await run_terminal_cmd({
    command: 'npm run autorun:init-hub',
    is_background: false
  });
  
  // Verificar que se inicializó correctamente
  // (mismo check que PASO 2)
}
```

**Siguiente paso:** → Ir a PASO 5

---

### **PASO 4: Abrir Browser (si hay wizard)** ⚠️ OBLIGATORIO

**Cuándo:** Solo si `hasWizard === true` y `url !== null`

**Qué hacer:**
```javascript
// Abrir browser con la URL del wizard
await mcp_cursor-ide-browser_browser_navigate({ url });
await mcp_cursor-ide-browser_browser_snapshot();

// Limpiar archivo de estado
await run_terminal_cmd({
  command: 'rm .autorun/wizard-state.json',
  is_background: false
});
```

**Siguiente paso:** → Ir a PASO 5

---

### **PASO 5: Verificar Estado Final** ⚠️ OBLIGATORIO

**Cuándo:** SIEMPRE después de inicializar AutorunHub

**Qué hacer:**
```typescript
// Verificar estado completo
import { getAutorunHubStatus } from '@autorun/core';

const status = await getAutorunHubStatus();

console.log('📊 Estado de Autorun:');
console.log(`   - Inicializado: ${status.initialized ? '✅' : '❌'}`);
console.log(`   - File Watching: ${status.fileWatching ? '✅ activo' : '❌ inactivo'}`);
console.log(`   - Add-ons activos: ${status.activeAddons.length}`);

// Si hay error, detener y reportar
if (status.error && !status.initialized) {
  console.error('❌ Error en AutorunHub:', status.error);
  console.error('   Ejecuta: npm run init');
  throw new Error('AutorunHub no se pudo inicializar');
}
```

**Siguiente paso:** → Ir a PASO 6

---

### **PASO 6: Ejecutar executeOnMessageStart() (OBLIGATORIO)** ⚠️ OBLIGATORIO

**Cuándo:** SIEMPRE al inicio de cada mensaje (sin excepción)

**⚠️ CRÍTICO:** Este paso DEBE ejecutarse SIEMPRE, no importa el contenido del mensaje. Esto garantiza:
- ✅ Detección automática de componentes
- ✅ Verificación de triggers de palabras clave
- ✅ Verificación con Pre-Implementation Check
- ✅ Obtención de plan basado en historias (si aplica)
- ✅ Bloqueo si faltan pasos o fases

**Qué hacer:**
```typescript
// ⚠️ OBLIGATORIO: Ejecutar SIEMPRE - No verificar palabras clave
import { executeOnMessageStart } from '@autorun/core';

// EJECUTAR SIEMPRE - No importa el contenido del mensaje
const result = await executeOnMessageStart(userMessage);

// Verificar resultado
if (result.blocked) {
  // ❌ NO continuar
  throw new Error(`❌ BLOQUEADO: ${result.reason}`);
}

// Si se detectó un componente
if (result.detected && result.componentName) {
  // ✅ Componente detectado
  console.log(`✅ Componente detectado: ${result.componentName}`);
  console.log(`📋 Plan disponible: ${result.plan?.totalSteps || 0} historias`);
} else {
  // Si no se detectó componente, continuar normalmente
  console.log(`✅ [Execute On Message Start] No se detectó componente, continuando normalmente`);
}
```

**⚠️ IMPORTANTE:** 
- NO verificar si hay palabras clave antes de ejecutar
- NO preguntar al usuario si debe ejecutarse
- EJECUTAR SIEMPRE automáticamente
- Si no hay componente detectado, simplemente continuar normalmente

**Siguiente paso:** → Continuar con implementación si hay componente detectado, o continuar normalmente si no hay

---

## 🔄 Flujo Completo Visual

```
Usuario: "activa el autorun"
  ↓
[PASO 1] Detectar wizard
  ├─ Si hay wizard → [PASO 2] → [PASO 4] → [PASO 5] → [PASO 6] (SIEMPRE)
  └─ Si NO hay wizard → [PASO 3] → [PASO 5] → [PASO 6] (SIEMPRE)

Usuario: "implementa un modal"
  ↓
[PASO 1] Detectar wizard
  ├─ Si hay wizard → [PASO 2] → [PASO 4] → [PASO 5] → [PASO 6] (SIEMPRE)
  └─ Si NO hay wizard → [PASO 3] → [PASO 5] → [PASO 6] (SIEMPRE)
```

---

## 📋 Checklist de Verificación

### **Después de Inicializar:**

- [ ] ✅ AutorunHub está inicializado (`status.initialized === true`)
- [ ] ✅ FileWatcher está activo (`status.fileWatching === true`)
- [ ] ✅ Add-ons están activos (`status.activeAddons.length > 0`)
- [ ] ✅ Browser está abierto (si había wizard)
- [ ] ✅ Archivo de estado del wizard fue limpiado (si había wizard)
- [ ] ✅ `executeOnMessageStart()` se ejecutó (SIEMPRE OBLIGATORIO)

---

## 🚨 Errores Comunes a Evitar

### **Error #1: Saltarse Pasos**

**❌ INCORRECTO:**
```javascript
// Saltarse detección del wizard
await run_terminal_cmd({ command: 'npm run autorun:init-hub' });
```

**✅ CORRECTO:**
```javascript
// Seguir orden completo
// PASO 1: Detectar wizard
// PASO 2 o 3: Inicializar AutorunHub
// PASO 4: Abrir browser (si aplica)
// PASO 5: Verificar estado
```

---

### **Error #2: NO Ejecutar executeOnMessageStart() Siempre**

**❌ INCORRECTO:**
```javascript
// Verificar palabras clave antes de ejecutar
const hasKeywords = /implementar|crear|agregar/i.test(userMessage);
if (hasKeywords) {
  const result = await executeOnMessageStart(userMessage);
}
```

**✅ CORRECTO:**
```javascript
// Ejecutar SIEMPRE - No importa el contenido del mensaje
const result = await executeOnMessageStart(userMessage);
// La función maneja internamente si hay palabras clave o no
```

---

### **Error #3: No Verificar Estado**

**❌ INCORRECTO:**
```javascript
// Asumir que se inicializó correctamente
await run_terminal_cmd({ command: 'npm run autorun:init-hub' });
// Continuar sin verificar
```

**✅ CORRECTO:**
```javascript
// Verificar estado después de inicializar
await run_terminal_cmd({ command: 'npm run autorun:init-hub' });
const status = await getAutorunHubStatus();
if (!status.initialized) {
  throw new Error('AutorunHub no se inicializó correctamente');
}
```

---

## 📚 Referencias

- **Reglas principales:** `.cursorrules`
- **Reglas de inicio:** `.cursor/rules/00-inicio.md`
- **Sistema paso a paso:** `docs/guias/implementacion/GUIA-SISTEMA-PASO-A-PASO-AUTOMATICO.md`
- **Detección automática:** `docs/guias/implementacion/GUIA-DETECCION-AUTOMATICA-COMPONENTES.md`

---

**Última actualización:** 2025-12-16  
**Estado:** ✅ **DOCUMENTADO** - Orden claro y verificable
