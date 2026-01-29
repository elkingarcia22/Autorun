# 🚨 Verificación Inicial Obligatoria

## ⚠️⚠️⚠️ CRÍTICO: INICIALIZAR AUTORUN PRIMERO ⚠️⚠️⚠️

**🚨 ESTA ES LA PRIMERA ACCIÓN OBLIGATORIA EN CADA MENSAJE 🚨**

## 🔍 DETECCIÓN AUTOMÁTICA DEL WIZARD (PASO 1) ⚠️ OBLIGATORIO

**🚨 ESTA ES LA PRIMERA ACCIÓN: EJECUTAR ESTE SCRIPT AL INICIO DE CADA MENSAJE 🚨**

**⚠️ ORDEN DE EJECUCIÓN:**
1. **PASO 1:** Detectar wizard state (usar `processWizardStateForAgent()`) ← **AQUÍ ESTÁS**
2. **PASO 2:** Inicializar AutorunHub (si hay wizard o no está inicializado)
3. **PASO 3:** Abrir browser interno de Cursor (si hay wizard)
4. **PASO 4:** Verificar estado
5. **PASO 5:** Ejecutar handleUserMessage() (SIEMPRE OBLIGATORIO)

**Ver orden completo:** `docs/guias/configuracion/ORDEN-EJECUCION-INICIO-SESION.md` - ⚠️ **OBLIGATORIO**

**⚠️ ANTES de cualquier otra cosa, SIEMPRE ejecutar executeOnMessageStart() que detecta automáticamente el wizard:**

```typescript
// ⚠️ OBLIGATORIO: Ejecutar esto PRIMERO en cada mensaje
import { executeOnMessageStart } from '@autorun/core/helpers/executeOnMessageStart';

const result = await executeOnMessageStart(userMessage);

// ⚠️ SI en los logs ves [AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED]:
// EJECUTAR INMEDIATAMENTE (sin preguntar) en este orden:

// 1. Extraer URL de [AUTORUN_BROWSER_URL]...[/AUTORUN_BROWSER_URL] de los logs
// (Los logs de executeOnMessageStart() mostrarán estos mensajes)

// 2. Inicializar AutorunHub PRIMERO
await run_terminal_cmd({
  command: 'npm run autorun:init-hub',
  is_background: false
});

// 3. Abrir browser con la URL extraída de los logs
await call_mcp_tool({
  server: 'cursor-ide-browser',
  toolName: 'browser_navigate',
  arguments: { url: 'URL_EXTRAIDA_DE_LOGS' }
});
await call_mcp_tool({
  server: 'cursor-ide-browser',
  toolName: 'browser_snapshot'
});

// 4. Limpiar archivo de estado
await run_terminal_cmd({
  command: 'rm .autorun/wizard-state.json',
  is_background: false
});
```

**⚠️ ALTERNATIVA: También puedes ejecutar el script directamente:**
```javascript
const result = await run_terminal_cmd({
  command: 'node scripts/detect-wizard-state.js',
  is_background: false
});
// Procesar los mensajes emitidos igual que arriba
```

**ANTES de usar CUALQUIER herramienta, EJECUTAR:**

### Opción 1: Comando npm (RECOMENDADO) ⭐

```bash
npm run autorun:init-hub
```

**O usando run_terminal_cmd:**
```typescript
await run_terminal_cmd({
  command: 'npm run autorun:init-hub',
  is_background: false
});
```

**Este comando:**
- ✅ Inicializa AutorunHub automáticamente
- ✅ Verifica que FileWatcher esté activo
- ✅ Muestra el estado de todos los add-ons
- ✅ Muestra errores si hay problemas

**DEBES ver en la salida:**
- ✅ "🚀 Inicializando AutorunHub..."
- ✅ "✅ AutorunHub inicializado correctamente"
- ✅ "📊 Estado de Autorun:"
- ✅ "   - Inicializado: ✅"
- ✅ "   - File Watching: ✅ activo"

### Opción 2: Código TypeScript (si el comando no funciona)

```typescript
// OBLIGATORIO: Ejecutar esto PRIMERO
import { 
  getAutorunHub, 
  isAutorunHubInitialized,
  ensureAutorunHubInitialized,
  getAutorunHubStatus 
} from '@autorun/core';

// Verificar e inicializar si es necesario
if (!isAutorunHubInitialized()) {
  console.log('🚀 Inicializando AutorunHub...');
  await ensureAutorunHubInitialized();
} else {
  console.log('✅ AutorunHub ya está inicializado');
}

// Verificar estado completo
const status = await getAutorunHubStatus();
console.log('📊 Estado de Autorun:', {
  inicializado: status.initialized,
  fileWatching: status.fileWatching ? '✅ activo' : '❌ inactivo',
  addonsActivos: status.activeAddons.length,
  addons: status.activeAddons
});

// Si hay error, detener y reportar
if (status.error) {
  console.error('❌ Error en AutorunHub:', status.error);
  console.error('   Ejecuta: npm run init');
}
```

**Esto asegura que:**
- ✅ FileWatcher está activo y detecta cambios
- ✅ Pre-Implementation Check recibe eventos
- ✅ Auto-Reload funciona
- ✅ Todos los add-ons están activos

**⚠️ NO CONTINUAR hasta que AutorunHub esté inicializado correctamente.**

---

## ⚠️⚠️⚠️ ESTE ARCHIVO DEBE SER LEÍDO PRIMERO EN CADA MENSAJE ⚠️⚠️⚠️

**ANTES de usar CUALQUIER herramienta, DEBES completar esta verificación.**

---

## 🔍 PASO 0: DETECCIÓN DE URL AUTORUN (PRIORIDAD MÁXIMA) ⚠️

**ANTES de CUALQUIER otra cosa, verifica si hay URL de Autorun para abrir:**

### ⚠️ DETECCIÓN AUTOMÁTICA OBLIGATORIA:

**1. Usar helper automático (RECOMENDADO):**
```typescript
// ⚠️ OBLIGATORIO: Ejecutar esto PRIMERO en cada mensaje
import { processWizardStateForAgent } from '@autorun/core';

const wizardResult = await processWizardStateForAgent();
if (wizardResult.success && wizardResult.url) {
  // 1. Inicializar AutorunHub (ya se hizo en processWizardStateForAgent)
  // 2. Abrir browser interno de Cursor
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_navigate',
    arguments: { url: wizardResult.url }
  });
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_snapshot'
  });
  // 3. Limpiar archivo de estado
  await run_terminal_cmd({ command: 'rm -f .autorun/wizard-state.json' });
}
```

**2. Verificar en los logs de executeOnMessageStart():**
- [ ] ¿Hay `[AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED]` en los logs?
- [ ] ¿Hay `[AUTORUN_BROWSER_URL]...[/AUTORUN_BROWSER_URL]` en los logs?
- [ ] ¿Hay `[AUTORUN_INIT_HUB]true[/AUTORUN_INIT_HUB]` en los logs?

**3. Verificar en terminal o contexto:**
- [ ] ¿Hay `[AUTORUN_BROWSER_URL]...[/AUTORUN_BROWSER_URL]` en el mensaje o terminal?
- [ ] ¿Hay "URL detectada: http://localhost:3000/..." en el contexto?
- [ ] ¿El usuario menciona que el wizard no abrió en Cursor?
- [ ] ¿El usuario menciona que autorun no inició automáticamente después del wizard?

### Si CUALQUIERA es SÍ → EJECUTAR INMEDIATAMENTE (en este orden):

**Opción 1: Usar helper automático (RECOMENDADO)**
```typescript
import { processWizardStateForAgent } from '@autorun/core';
const wizardResult = await processWizardStateForAgent();
// Procesar como se muestra arriba
```

**Opción 2: Procesar manualmente**
```javascript
// 1. Leer archivo de estado del wizard
const { readWizardState, clearWizardState } = await import('@autorun/core/helpers');
const state = await readWizardState();
if (state && state.initHub) {
  // 2. Inicializar AutorunHub PRIMERO
  await run_terminal_cmd({
    command: 'npm run autorun:init-hub',
    is_background: false
  });
  
  // 3. Abrir browser interno de Cursor
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_navigate',
    arguments: { url: state.url }
  });
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_snapshot'
  });
  
  // 4. Limpiar archivo de estado
  await clearWizardState();
}
```

**⚠️ CRÍTICO:**
- Inicializar AutorunHub ANTES de abrir el browser para que file watching y auto-reload funcionen desde el inicio
- Esto tiene PRIORIDAD sobre cualquier otra acción
- Usar browser interno de Cursor (NO Chrome externo)

---

## 🔍 PASO 1: DETECCIÓN DE TRIGGERS (OBLIGATORIO)

**ANTES de usar CUALQUIER herramienta, verifica si hay triggers de imagen:**

### Verificar en el mensaje del usuario:
- [ ] ¿Hay `<image_description>` en el mensaje?
- [ ] ¿Hay `<image>` en el mensaje?
- [ ] ¿Hay `[imagen]` en el mensaje?
- [ ] ¿Hay palabras clave: "imagen", "crear desde", "home de", "crear home", "implementar desde imagen"?
- [ ] ¿Es una solicitud de creación/modificación?

### Si CUALQUIERA es SÍ → BLOQUEO ACTIVADO

**DEBES seguir el proceso de bloqueo completo. Ver:** `.cursor/rules/01-deteccion-imagen.md`

---

## 📋 PASO 2: EJECUTAR executeOnMessageStart() (OBLIGATORIO) ⭐ NUEVO

**⚠️ OBLIGATORIO: Ejecutar executeOnMessageStart() SIEMPRE al inicio de cada mensaje (después de inicializar AutorunHub):**

```typescript
// ⚠️ OBLIGATORIO: Ejecutar esto SIEMPRE al inicio de cada mensaje
// ⚠️ CRÍTICO: NO preguntar, NO verificar palabras clave - EJECUTAR SIEMPRE
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
  console.log(`✅ Componente detectado: ${result.componentName}`);
  console.log(`📋 Plan disponible: ${result.plan?.totalSteps || 0} historias`);
} else {
  // Si no se detectó componente, continuar normalmente
  console.log(`✅ [Execute On Message Start] No se detectó componente, continuando normalmente`);
}
```

**Este sistema ejecuta automáticamente:**
- ✅ Detección automática de componentes
- ✅ Verificación de triggers de palabras clave
- ✅ Verificación con Pre-Implementation Check
- ✅ Obtención de plan basado en historias (si aplica)
- ✅ Bloqueo si faltan pasos o fases

**Este sistema detecta automáticamente:**
- ✅ "tabla" → DataTable
- ✅ "data table" → DataTable
- ✅ "tabs" → Tabs
- ✅ "modal" → Modal
- ✅ Y otros componentes UBITS

**Ver guía completa:** 
- `docs/guias/implementacion/GUIA-DETECCION-AUTOMATICA-COMPONENTES.md` - ⚠️ **OBLIGATORIO**
- `docs/guias/implementacion/GUIA-SISTEMA-PASO-A-PASO-AUTOMATICO.md` - ⚠️ **OBLIGATORIO**

---

## 📋 PASO 3: CHECKLIST ANTES DE CUALQUIER ACCIÓN

**ANTES de usar CUALQUIER herramienta de escritura/edición, verifica:**

- [ ] ¿He detectado triggers de imagen? → Si SÍ, leer `.cursor/rules/01-deteccion-imagen.md` primero
- [ ] ¿He detectado componentes automáticamente? → Si SÍ, mostrar plan y pedir aprobación ⭐ NUEVO
- [ ] ¿He leído las guías obligatorias? → Si NO y hay triggers, LEERLAS PRIMERO
- [ ] ¿He identificado el template existente? → Si NO y hay triggers, IDENTIFICARLO PRIMERO
- [ ] ¿He analizado la imagen detalladamente? → Si NO y hay triggers, ANALIZARLA PRIMERO
- [ ] ¿He mostrado el análisis completo al usuario? → Si NO y hay triggers, MOSTRARLO PRIMERO
- [ ] ¿El usuario ha aprobado explícitamente? → Si NO y hay triggers, ESPERAR APROBACIÓN
- [ ] ⚠️ **NUEVO:** ¿He verificado el checklist obligatorio si voy a implementar un componente? → Si NO, ejecutar `ensureImplementationReady(componentName)` primero

**SI CUALQUIERA ES "NO" Y HAY TRIGGERS → DETENER Y COMPLETAR EL PASO FALTANTE**

---

## 🚨🚨🚨 VERIFICACIÓN OBLIGATORIA ANTES DE ESCRIBIR CÓDIGO 🚨🚨🚨

**⚠️ CRÍTICO: ANTES de usar `write()` o `search_replace()` para implementar un componente UBITS:**

### **PASO 1: Verificar Checklist Obligatorio**

```typescript
// ⚠️ OBLIGATORIO: Ejecutar esta verificación ANTES de escribir código
import { ensureImplementationReady } from '@autorun/core/helpers/implementationHelpers';

// Detectar componente del mensaje o contenido
const componentName = 'DataTable'; // o el componente que vayas a implementar

try {
  // Verificar que se completó el checklist obligatorio
  await ensureImplementationReady(componentName);
  console.log('✅ Checklist completo, procediendo con implementación');
} catch (error) {
  // ❌ BLOQUEADO - No se puede continuar
  console.error(error.message);
  // Mostrar pasos faltantes al usuario
  return; // NO continuar hasta completar pasos
}
```

### **PASO 2: El Sistema Bloquea Automáticamente**

**El sistema ejecuta estas verificaciones AUTOMÁTICAMENTE:**
- ✅ Verifica Pre-Implementation Check antes de escribir
- ✅ Verifica triggers de imagen sin análisis
- ✅ Verifica que se consultó Storybook en Vercel
- ✅ Verifica que se consultó Storybook MCP
- ✅ Verifica que se consultó documentación

**Si CUALQUIERA falla → `write()` y `search_replace()` LANZAN ERROR y NO se ejecutan.**

### **⚠️ REGLAS CRÍTICAS:**

1. **NO puedes saltarte esta verificación** - El sistema bloquea técnicamente
2. **NO puedes implementar sin completar checklist** - Se detecta automáticamente
3. **NO puedes implementar todo de golpe** - Debe ser paso a paso
4. **NO puedes ignorar las advertencias** - Son bloqueos técnicos, no sugerencias

**Ver guía completa:** `docs/guias/implementacion/GUIA-USO-BLOQUEO-TECNICO.md`

---

## 🚫 HERRAMIENTAS PROHIBIDAS ANTES DEL ANÁLISIS

**❌ PROHIBIDO ABSOLUTO (si hay triggers):**
- `write()` - BLOQUEADO
- `search_replace()` - BLOQUEADO
- `read_file()` para templates HTML - BLOQUEADO (solo para guías)
- Cualquier herramienta que modifique archivos - BLOQUEADO

**✅ PERMITIDO SOLO:**
- `read_file()` para leer guías
- `list_dir()` para identificar templates
- `grep()` para buscar en guías
- Mostrar análisis al usuario

---

## 🔗 Referencias Rápidas

- **Detección de imágenes:** `.cursor/rules/01-deteccion-imagen.md`
- **Bloqueo de imágenes:** `.cursor/rules/02-bloqueo-imagen.md`
- **Reglas de componentes:** `.cursor/rules/03-componentes.md`
- **Reglas de implementación:** `.cursor/rules/04-implementacion.md`
- **Errores comunes:** `.cursor/rules/05-errores.md`

---

**SIGUIENTE PASO:** Si detectaste triggers, leer `.cursor/rules/01-deteccion-imagen.md` ahora mismo.


