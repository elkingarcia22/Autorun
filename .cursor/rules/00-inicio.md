# 🚨 Verificación Inicial Obligatoria

## ⚠️⚠️⚠️ CRÍTICO: INICIALIZAR AUTORUN PRIMERO ⚠️⚠️⚠️

**🚨 ESTA ES LA PRIMERA ACCIÓN OBLIGATORIA EN CADA MENSAJE 🚨**

## 🔍 DETECCIÓN AUTOMÁTICA DEL WIZARD (EJECUTAR PRIMERO) ⚠️ OBLIGATORIO

**🚨 ESTA ES LA PRIMERA ACCIÓN: EJECUTAR ESTE SCRIPT AL INICIO DE CADA MENSAJE 🚨**

**⚠️ ANTES de cualquier otra cosa, SIEMPRE ejecutar el script de detección:**

```javascript
// ⚠️ OBLIGATORIO: Ejecutar esto PRIMERO en cada mensaje
const result = await run_terminal_cmd({
  command: 'node scripts/detect-wizard-state.js',
  is_background: false
});

// ⚠️ SI el output contiene [AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED]:
// EJECUTAR INMEDIATAMENTE (sin preguntar) en este orden:

// 1. Extraer URL de [AUTORUN_BROWSER_URL]...[/AUTORUN_BROWSER_URL] del output
const urlMatch = result.stdout.match(/\[AUTORUN_BROWSER_URL\](.+?)\[\/AUTORUN_BROWSER_URL\]/);
const url = urlMatch ? urlMatch[1] : null;

// 2. Inicializar AutorunHub PRIMERO
if (url) {
  await run_terminal_cmd({
    command: 'npm run autorun:init-hub',
    is_background: false
  });
  
  // 3. Abrir browser con la URL
  await mcp_cursor-ide-browser_browser_navigate({ url });
  await mcp_cursor-ide-browser_browser_snapshot();
  
  // 4. Limpiar archivo de estado
  await run_terminal_cmd({
    command: 'rm .autorun/wizard-state.json',
    is_background: false
  });
}
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

**1. Verificar archivo de estado del wizard (PRIMERO):**
```javascript
// Usar helper para detectar estado del wizard
const { readWizardState, hasWizardState, detectWizardProblemInMessage } = await import('@autorun/core/helpers');
const hasState = await hasWizardState();
if (hasState) {
  const state = await readWizardState();
  if (state && state.initHub) {
    // EJECUTAR INMEDIATAMENTE: inicializar AutorunHub y abrir browser
  }
}
```

**2. Verificar en el mensaje del usuario:**
```javascript
// Detectar si el usuario menciona problemas con el wizard
const userMessage = "mensaje del usuario"; // obtener del contexto
if (detectWizardProblemInMessage(userMessage)) {
  // EJECUTAR INMEDIATAMENTE: inicializar AutorunHub
}
```

**3. Verificar en terminal o contexto:**
- [ ] ¿Hay `[AUTORUN_BROWSER_URL]...[/AUTORUN_BROWSER_URL]` en el mensaje o terminal?
- [ ] ¿Hay "URL detectada: http://localhost:3000/..." en el contexto?
- [ ] ¿El usuario menciona que el wizard no abrió en Cursor?
- [ ] ¿El usuario menciona que autorun no inició automáticamente después del wizard?

### Si CUALQUIERA es SÍ → EJECUTAR INMEDIATAMENTE (en este orden):

**Paso 0.5: Leer archivo de estado del wizard (si existe)**
```javascript
// Usar helper para leer estado del wizard
const { readWizardState, clearWizardState } = await import('@autorun/core/helpers');
const state = await readWizardState();
if (state && state.initHub) {
  // Usar state.url como URL
  // state.initHub indica que debe inicializarse AutorunHub
  // Después de procesar, limpiar el archivo de estado:
  await clearWizardState();
}
```

**Paso 1: Inicializar AutorunHub PRIMERO** ⚠️ OBLIGATORIO
```javascript
// Verificar si también hay [AUTORUN_INIT_HUB]true[/AUTORUN_INIT_HUB] o es después del wizard
// O si el archivo de estado indica que debe inicializarse
await run_terminal_cmd({
  command: 'npm run autorun:init-hub',
  is_background: false
});
// Verificar que veas: "✅ AutorunHub inicializado correctamente"
```

**Paso 2: Extraer la URL y abrir el browser**
1. **Extraer la URL** del patrón `[AUTORUN_BROWSER_URL]URL[/AUTORUN_BROWSER_URL]`, de "URL detectada: URL", o del archivo de estado
2. **Ejecutar SIN PREGUNTAR:**
   ```javascript
   mcp_cursor-ide-browser_browser_navigate({ url: "URL_EXTRAIDA" })
   mcp_cursor-ide-browser_browser_snapshot()
   ```

**⚠️ CRÍTICO:**
- Inicializar AutorunHub ANTES de abrir el browser para que file watching y auto-reload funcionen desde el inicio
- Esto tiene PRIORIDAD sobre cualquier otra acción

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

## 📋 PASO 2: CHECKLIST ANTES DE CUALQUIER ACCIÓN

**ANTES de usar CUALQUIER herramienta de escritura/edición, verifica:**

- [ ] ¿He detectado triggers de imagen? → Si SÍ, leer `.cursor/rules/01-deteccion-imagen.md` primero
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


