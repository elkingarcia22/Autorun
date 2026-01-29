# 🚨 Error: Consultar Historia de Storybook Inexistente para Input

## ❌ PROBLEMA IDENTIFICADO

**Fecha:** 2025-12-09  
**Componente afectado:** Input - Consulta de Storybook  
**Síntoma:** Error "Couldn't find story matching 'entrada-input--calendar'" al consultar Storybook para inputs.

### **Síntomas Específicos:**
1. **Error al consultar Storybook:** "Couldn't find story matching 'entrada-input--calendar'"
2. **URL incorrecta:** Se está usando "entrada-input" en lugar de "formularios-input"
3. **Historia inexistente:** Se está intentando usar historia "calendar" que no existe (solo existe "default")

---

## 🔍 CAUSA RAÍZ DEL ERROR

### **Error Principal: URL Incorrecta y Historia Inexistente**

**Problema:**
1. **Nombre de componente incorrecto:** Se está usando "entrada-input" en lugar de "formularios-input"
2. **Historia inexistente:** Se está intentando usar historia "calendar" que no existe en Input.stories.ts
3. **No se usa buildSafeStorybookUrl:** Se está construyendo la URL manualmente sin verificar que la historia existe

**Causa:**
- El componente Input en Storybook tiene título "Formularios/Input" e ID "formularios-input"
- Solo existe la historia "Default" (no hay historia específica para "calendar")
- Se está construyendo la URL manualmente sin usar `buildSafeStorybookUrl()`

**Síntomas:**
- Error "Couldn't find story matching 'entrada-input--calendar'"
- Storybook no puede renderizar el componente
- El agente no puede consultar la información del componente

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **1. Agregar Mapeo del Componente Input**

**✅ CORRECTO:**
Agregar el mapeo del componente Input en `verifyStorybookStories.ts`:

```typescript
const COMPONENT_STORIES_PATH_MAP: Record<string, string> = {
	// ... otros componentes ...
	'Formularios/Input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts',
	'formularios-input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts',
	'Input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts',
	'entrada-input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts', // ⚠️ Alias común pero incorrecto
	'Entrada/Input': 'vendor/ubits/packages/storybook/stories/Input.stories.ts', // ⚠️ Alias común pero incorrecto
};

const COMPONENT_TITLE_TO_ID_MAP: Record<string, string> = {
	// ... otros componentes ...
	'Formularios/Input': 'formularios-input',
	'Input': 'formularios-input',
	'entrada-input': 'formularios-input', // ⚠️ Mapear alias incorrecto al ID correcto
	'Entrada/Input': 'formularios-input', // ⚠️ Mapear alias incorrecto al ID correcto
};
```

**⚠️ CRÍTICO:**
- El título correcto es "Formularios/Input"
- El ID correcto es "formularios-input"
- Se mapean alias comunes ("entrada-input", "Entrada/Input") al ID correcto

---

### **2. Usar buildSafeStorybookUrl() Siempre**

**✅ CORRECTO:**
Siempre usar `buildSafeStorybookUrl()` para construir URLs de Storybook:

```typescript
// ✅ CORRECTO: Usar buildSafeStorybookUrl() para construir URL verificada
import { buildSafeStorybookUrl } from '@autorun/core/helpers/verifyStorybookStories';

// Para cualquier input (calendar, text, etc.)
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

### **3. Verificar Historias Disponibles**

**✅ CORRECTO:**
El componente Input solo tiene la historia "Default":

```typescript
// ✅ CORRECTO: Verificar historias disponibles
import { getAvailableStoryNames } from '@autorun/core/helpers/verifyStorybookStories';

const stories = await getAvailableStoryNames('Input');
// Resultado: ['default']

// Si se intenta usar una historia que no existe, buildSafeStorybookUrl() usa 'default' automáticamente
const urlResult = await buildSafeStorybookUrl('Input', 'calendar');
// Resultado: { url: '...formularios-input--default', storyUsed: 'default', storyExists: false, warning: '...' }
```

**⚠️ CRÍTICO:**
- El componente Input solo tiene la historia "Default"
- No hay historias específicas para tipos de input (calendar, text, etc.)
- Si se intenta usar una historia que no existe, se usa 'default' automáticamente

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
// ❌ INCORRECTO: Usar "entrada-input" (nombre incorrecto)
const urlResult = await buildSafeStorybookUrl('entrada-input', 'default');
// Aunque funciona (está mapeado), es mejor usar el nombre correcto
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
// Para ver diferentes tipos de input, usar los controles en Storybook
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






