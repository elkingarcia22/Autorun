# ✅ Solución General: Consultar Storybook para Todos los Inputs

## 🎯 OBJETIVO

Asegurar que cuando se consulta Storybook para cualquier componente Input (o cualquier componente en general), se use siempre `buildSafeStorybookUrl()` para construir URLs verificadas que eviten errores de historias inexistentes.

---

## ⚠️ REGLA CRÍTICA: SIEMPRE USAR buildSafeStorybookUrl()

**Para CUALQUIER consulta a Storybook, DEBES usar `buildSafeStorybookUrl()`:**

```typescript
// ✅ CORRECTO: Usar buildSafeStorybookUrl() para construir URL verificada
import { buildSafeStorybookUrl } from '@autorun/core/helpers/verifyStorybookStories';

// Para cualquier componente Input
const urlResult = await buildSafeStorybookUrl('Input', 'default');
// o
const urlResult = await buildSafeStorybookUrl('Formularios/Input', 'default');
// o
const urlResult = await buildSafeStorybookUrl('formularios-input', 'default');

// Verificar si hay advertencia
if (urlResult.warning) {
	console.warn(`⚠️ ${urlResult.warning}`);
}

// Usar la URL verificada
const url = urlResult.url; // Siempre será válida (usa 'default' si la historia no existe)
```

**⚠️ CRÍTICO:**
- NO construir URLs manualmente
- SIEMPRE usar `buildSafeStorybookUrl()`
- Verificar si hay `warning` en el resultado
- El sistema automáticamente usa 'default' si la historia no existe

---

## 📋 MAPEO DE COMPONENTES INPUT

### **Nombres Correctos del Componente Input:**

| Nombre | ID de Storybook | ¿Correcto? |
|--------|----------------|------------|
| `Formularios/Input` | `formularios-input` | ✅ Correcto (título oficial) |
| `formularios-input` | `formularios-input` | ✅ Correcto (ID oficial) |
| `Input` | `formularios-input` | ✅ Correcto (nombre corto) |
| `entrada-input` | `formularios-input` | ⚠️ Alias (funciona pero no es el nombre oficial) |
| `Entrada/Input` | `formularios-input` | ⚠️ Alias (funciona pero no es el nombre oficial) |

**⚠️ RECOMENDACIÓN:** Usar `Input`, `Formularios/Input`, o `formularios-input` (NO usar `entrada-input` aunque funcione).

---

### **Historias Disponibles:**

El componente Input solo tiene la historia **"Default"**:

| Historia | ¿Existe? | URL |
|----------|----------|-----|
| `default` | ✅ Sí | `formularios-input--default` |
| `calendar` | ❌ No | Se usa `default` automáticamente |
| `text` | ❌ No | Se usa `default` automáticamente |
| `password` | ❌ No | Se usa `default` automáticamente |
| Cualquier otra | ❌ No | Se usa `default` automáticamente |

**⚠️ CRÍTICO:** 
- El componente Input solo tiene la historia "Default"
- No hay historias específicas para tipos de input (calendar, text, etc.)
- Si se intenta usar una historia que no existe, `buildSafeStorybookUrl()` usa 'default' automáticamente
- Para ver diferentes tipos de input, usar la historia `default` y ajustar los controles en Storybook

---

## 🔧 IMPLEMENTACIÓN

### **PASO 1: Importar buildSafeStorybookUrl**

```typescript
import { buildSafeStorybookUrl } from '@autorun/core/helpers/verifyStorybookStories';
```

### **PASO 2: Construir URL Verificada**

```typescript
// Para cualquier input (calendar, text, password, etc.)
const urlResult = await buildSafeStorybookUrl('Input', 'default');

// Verificar si hay advertencia
if (urlResult.warning) {
	console.warn(`⚠️ ${urlResult.warning}`);
	// Ejemplo: "Historia 'calendar' no existe para Input. Usando 'default' en su lugar."
}

// Usar la URL verificada
const url = urlResult.url; // Siempre será válida
// Ejemplo: "https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default"
```

### **PASO 3: Navegar a Storybook**

```typescript
// Navegar a Storybook usando Browser MCP
await mcp_cursor-ide-browser_browser_navigate({ url: urlResult.url });
await mcp_cursor-ide-browser_browser_snapshot();
```

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: Construir URL Manualmente**

**Problema:**
```typescript
// ❌ INCORRECTO: Construir URL manualmente sin verificar
const url = `https://ubits-storybook10.vercel.app/?path=/story/entrada-input--calendar`;
// Error: "Couldn't find story matching 'entrada-input--calendar'"
```

**✅ SOLUCIÓN:**
```typescript
// ✅ CORRECTO: Usar buildSafeStorybookUrl()
const urlResult = await buildSafeStorybookUrl('Input', 'calendar');
const url = urlResult.url; // Siempre será válida (usa 'default' si 'calendar' no existe)
```

---

### **❌ ERROR 2: Usar Nombre Incorrecto del Componente**

**Problema:**
```typescript
// ❌ INCORRECTO: Usar "entrada-input" (aunque funciona, no es el nombre oficial)
const urlResult = await buildSafeStorybookUrl('entrada-input', 'default');
```

**✅ SOLUCIÓN:**
```typescript
// ✅ CORRECTO: Usar nombre correcto del componente
const urlResult = await buildSafeStorybookUrl('Input', 'default');
// o
const urlResult = await buildSafeStorybookUrl('Formularios/Input', 'default');
// o
const urlResult = await buildSafeStorybookUrl('formularios-input', 'default');
```

---

### **❌ ERROR 3: Intentar Usar Historia Específica que No Existe**

**Problema:**
```typescript
// ❌ INCORRECTO: Intentar usar historia "calendar" que no existe
const urlResult = await buildSafeStorybookUrl('Input', 'calendar');
// Aunque buildSafeStorybookUrl() maneja esto automáticamente, es mejor usar 'default'
```

**✅ SOLUCIÓN:**
```typescript
// ✅ CORRECTO: Usar 'default' (única historia disponible)
const urlResult = await buildSafeStorybookUrl('Input', 'default');
// El componente Input solo tiene la historia "Default"
// Para ver diferentes tipos de input, usar la historia `default` y ajustar los controles en Storybook
```

---

## 📋 CHECKLIST OBLIGATORIO

Al consultar Storybook para cualquier componente Input:

### **Construcción de URL:**
- [ ] **Usar buildSafeStorybookUrl():** SIEMPRE usar `buildSafeStorybookUrl()` para construir URLs
- [ ] **Usar nombre correcto:** Usar "Input", "Formularios/Input", o "formularios-input" (NO "entrada-input")
- [ ] **Usar historia 'default':** El componente Input solo tiene la historia "Default"
- [ ] **Verificar warning:** Verificar si hay `warning` en el resultado de `buildSafeStorybookUrl()`
- [ ] **NO construir manualmente:** NO construir URLs manualmente sin verificar

### **Verificación:**
- [ ] **URL es válida:** Verificar que la URL construida es válida
- [ ] **Historia existe:** Verificar que la historia usada existe (siempre será 'default' para Input)
- [ ] **No hay errores:** Verificar que no hay errores al abrir la URL en Storybook

---

## 📚 REFERENCIAS

- **Código de verificación:** `packages/autorun-core/src/helpers/verifyStorybookStories.ts`
- **Mapeo de componentes:** `packages/autorun-core/src/helpers/verifyStorybookStories.ts` (líneas 27-46)
- **Mapeo de títulos a IDs:** `packages/autorun-core/src/helpers/verifyStorybookStories.ts` (líneas 49-62)
- **Archivo de historias:** `vendor/ubits/packages/storybook/stories/Input.stories.ts`
- **Guía de verificación automática:** `docs/guias/implementacion/GUIA-VERIFICAR-HISTORIAS-STORYBOOK-AUTOMATICO.md`
- **Guía de error específica:** `docs/guias/implementacion/GUIA-ERROR-CONSULTAR-HISTORIA-STORYBOOK-INEXISTENTE-INPUT.md`

---

## ✅ VERIFICACIÓN

Después de implementar la solución, verificar:

1. **URL se construye correctamente:**
   - Usar `buildSafeStorybookUrl('Input', 'default')`
   - Verificar que la URL es `https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default`
   - Verificar que no hay errores al abrir la URL

2. **Alias se mapean correctamente:**
   - Usar `buildSafeStorybookUrl('entrada-input', 'default')`
   - Verificar que se mapea correctamente a "formularios-input"
   - Verificar que la URL es válida

3. **Historia inexistente se maneja correctamente:**
   - Usar `buildSafeStorybookUrl('Input', 'calendar')`
   - Verificar que se usa 'default' automáticamente
   - Verificar que hay un `warning` en el resultado

---

**Última actualización:** 2025-12-09  
**Versión:** 1.0.0


