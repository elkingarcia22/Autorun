# 🔍 Análisis: ¿Qué está Hardcodeado vs Qué viene de Storybook?

**Fecha:** 2025-01-24  
**Componente de ejemplo:** RadioButton  
**Objetivo:** Identificar qué información está hardcodeada y qué viene realmente de Storybook

---

## 📊 Resumen Ejecutivo

### **✅ Viene de Storybook (Dinámico):**
1. **Listado de componentes** - `getComponentList()` → Storybook MCP
2. **Props del componente** - `getComponentsProps()` → Storybook MCP
3. **Código HTML/JS** - `getComponentCode()` → Storybook MCP (Playwright)
4. **Documentación** - Página Docs de Storybook
5. **Historias disponibles** - `index.json` de Storybook

### **❌ Está Hardcodeado (Estático):**
1. **Mapeos de nombres a IDs** - `storybookMCPNameMapper.ts`
2. **Patrones de detección** - `autoMessageHandler.ts`
3. **Clases CSS esperadas** - Validadores
4. **Rutas de archivos** - Helpers de implementación

---

## 🔍 Análisis Detallado

### **1. Mapeos de Nombres a IDs** ❌ HARDCODEADO

**Archivo:** `packages/autorun-core/src/helpers/storybookMCPNameMapper.ts`

**Hardcodeado:**
```typescript
const STORYBOOK_ID_TO_COMPONENT_NAME: Record<string, string> = {
  'formularios-radio-button': 'Formularios/Radio Button',
  // ... más mapeos
};

export const ADDITIONAL_COMPONENT_NAME_MAPPINGS: Record<string, string> = {
  RadioButton: 'Formularios/Radio Button',
  Radio: 'Formularios/Radio Button',
  // ... más mapeos
};
```

**¿Por qué está hardcodeado?**
- Necesario para mapear nombres cortos (`RadioButton`) a nombres completos (`Formularios/Radio Button`)
- El MCP de Storybook requiere nombres completos
- Permite detectar componentes desde mensajes del usuario

**¿Se puede obtener de Storybook?**
- ✅ **SÍ:** Se puede obtener el listado completo con `getComponentList()`
- ⚠️ **PERO:** Necesita mapeos para nombres cortos → nombres completos
- ⚠️ **PERO:** Necesita mapeos para IDs → nombres completos

**Solución actual:**
1. Obtener listado de Storybook (`getComponentList()`)
2. Buscar componente en el listado
3. Usar mapeos hardcodeados como fallback si no se encuentra

---

### **2. Patrones de Detección** ❌ HARDCODEADO

**Archivo:** `packages/autorun-core/src/helpers/autoMessageHandler.ts`

**Hardcodeado:**
```typescript
const componentPatterns: Record<string, RegExp[]> = {
  RadioButton: [
    /\bradio\s*button\b/i,
    /\bradio\s*bot[oó]n\b/i,
    /\bradiobutton\b/i,
    // ... más patrones
  ],
  // ... más componentes
};
```

**¿Por qué está hardcodeado?**
- Necesario para detectar componentes desde mensajes del usuario
- Permite detectar variaciones: "radio button", "radiobutton", "radio botón"
- Permite detectar en diferentes idiomas

**¿Se puede obtener de Storybook?**
- ❌ **NO:** Storybook no tiene información sobre cómo detectar componentes desde texto
- ❌ **NO:** Los patrones son específicos del sistema de detección de Autorun

**Conclusión:** ✅ **NECESARIO** - Debe estar hardcodeado

---

### **3. Props del Componente** ✅ VIENE DE STORYBOOK

**Herramienta:** `mcp_storybook_getComponentsProps(['Formularios/Radio Button'])`

**Resultado:**
```
✅ Props obtenidas dinámicamente desde Storybook
✅ Información actualizada automáticamente
✅ Sin hardcodeo
```

**Props obtenidas:**
- `label` (string, requerido)
- `complementaryText` (string, opcional)
- `value` (string, requerido)
- `name` (string, requerido)
- `checked` (boolean, default: false)
- `state` (string, default: "default")
- `disabled` (boolean, default: false)
- `size` (string, default: "md")
- `className` (string, opcional)

**Conclusión:** ✅ **100% DINÁMICO** - Viene de Storybook

---

### **4. Código HTML/JS** ✅ VIENE DE STORYBOOK

**Herramienta:** `getComponentCode()` del MCP de Storybook

**Proceso:**
1. Navega a Storybook con Playwright
2. Extrae código desde la pestaña "Code"
3. Prioriza historia "implementation" (código copy/paste)
4. Si falla, intenta historia solicitada
5. Si falla, intenta página Docs

**Resultado:**
```
✅ Código extraído dinámicamente desde Storybook
✅ Siempre actualizado con la versión más reciente
✅ Sin hardcodeo
```

**Conclusión:** ✅ **100% DINÁMICO** - Viene de Storybook

---

### **5. Clases CSS Esperadas** ❌ HARDCODEADO

**Archivos:**
- `packages/autorun-core/src/helpers/cssClassValidator.ts`
- `packages/autorun-core/src/helpers/verifyBeforeImplementation.ts`
- `packages/autorun-core/src/helpers/preImplementationVerification.ts`

**Hardcodeado:**
```typescript
const expectedClasses = {
  'radio-button': [
    'ubits-radio-button',
    'ubits-radio-button__input',
    'ubits-radio-button__circle',
    'ubits-radio-button__text-content',
  ],
};
```

**¿Por qué está hardcodeado?**
- Necesario para validar que el código generado usa las clases correctas
- Permite verificar que no se usen clases incorrectas
- Permite detectar errores de implementación

**¿Se puede obtener de Storybook?**
- ⚠️ **PARCIALMENTE:** Se puede extraer desde el código HTML de Storybook
- ⚠️ **PERO:** Necesita validación para asegurar que son las clases correctas
- ⚠️ **PERO:** Algunas clases son internas y no aparecen en el código visible

**Conclusión:** ⚠️ **PARCIALMENTE NECESARIO** - Puede mejorarse extrayendo desde Storybook

---

### **6. Listado de Componentes** ✅ VIENE DE STORYBOOK

**Herramienta:** `mcp_storybook_getComponentList()`

**Resultado:**
```
✅ Listado obtenido dinámicamente desde Storybook
✅ Siempre actualizado con componentes disponibles
✅ Sin hardcodeo
```

**Componentes obtenidos:**
- `Básicos/Button`
- `Formularios/Radio Button`
- `Feedback/Modal`
- ... 50+ componentes

**Conclusión:** ✅ **100% DINÁMICO** - Viene de Storybook

---

### **7. IDs de Storybook** ⚠️ HARDCODEADO (con fallback dinámico)

**Archivo:** `packages/autorun-core/src/helpers/storybookMCPNameMapper.ts`

**Hardcodeado:**
```typescript
'formularios-radio-button': 'Formularios/Radio Button',
```

**Proceso actual:**
1. **Intento 1:** Usar mapeo hardcodeado
2. **Intento 2:** Obtener listado de Storybook (`getComponentList()`)
3. **Intento 3:** Buscar componente en el listado
4. **Intento 4:** Construir ID desde el nombre

**¿Se puede obtener de Storybook?**
- ✅ **SÍ:** Se puede obtener desde `index.json` de Storybook
- ✅ **SÍ:** Se puede obtener desde el listado de componentes
- ⚠️ **PERO:** Necesita mapeos para nombres cortos → IDs

**Conclusión:** ⚠️ **PARCIALMENTE HARDCODEADO** - Tiene fallback dinámico

---

## 📊 Tabla Comparativa

| Información | Fuente | Hardcodeado | Dinámico | Actualizable |
|------------|--------|-------------|----------|--------------|
| **Listado de componentes** | Storybook MCP | ❌ | ✅ | ✅ Automático |
| **Props del componente** | Storybook MCP | ❌ | ✅ | ✅ Automático |
| **Código HTML/JS** | Storybook MCP | ❌ | ✅ | ✅ Automático |
| **Documentación** | Storybook Docs | ❌ | ✅ | ✅ Automático |
| **Historias disponibles** | Storybook index.json | ❌ | ✅ | ✅ Automático |
| **Mapeos nombres → IDs** | Código | ✅ | ⚠️ Parcial | ⚠️ Manual |
| **Patrones de detección** | Código | ✅ | ❌ | ⚠️ Manual |
| **Clases CSS esperadas** | Código | ✅ | ⚠️ Parcial | ⚠️ Manual |
| **Rutas de archivos** | Código | ✅ | ❌ | ⚠️ Manual |

---

## ✅ Conclusión

### **Lo que viene de Storybook (Dinámico):**
1. ✅ **Listado de componentes** - Siempre actualizado
2. ✅ **Props del componente** - Siempre actualizado
3. ✅ **Código HTML/JS** - Siempre actualizado
4. ✅ **Documentación** - Siempre actualizado
5. ✅ **Historias disponibles** - Siempre actualizado

### **Lo que está hardcodeado (Necesario):**
1. ⚠️ **Mapeos nombres → IDs** - Necesario para traducción, pero tiene fallback dinámico
2. ✅ **Patrones de detección** - Necesario para detectar componentes desde texto
3. ⚠️ **Clases CSS esperadas** - Puede mejorarse extrayendo desde Storybook

### **Mejoras Posibles:**
1. **Extraer clases CSS desde Storybook** - Reducir hardcodeo
2. **Mejorar descubrimiento automático de IDs** - Reducir dependencia de mapeos
3. **Extraer información de estructura desde Storybook** - Reducir hardcodeo

---

## 🎯 Respuesta Directa

**¿Hay información hardcodeada?**
- ✅ **SÍ:** Mapeos, patrones de detección, clases CSS esperadas

**¿Todo viene de Storybook?**
- ⚠️ **NO:** La información crítica (props, código, documentación) SÍ viene de Storybook
- ⚠️ **PERO:** Los mapeos y patrones están hardcodeados (necesarios para el funcionamiento)

**¿Se puede reducir el hardcodeo?**
- ✅ **SÍ:** Mejorando el descubrimiento automático desde Storybook
- ✅ **SÍ:** Extrayendo más información desde Storybook (clases CSS, estructura)
- ⚠️ **PERO:** Algunos hardcodeos son necesarios (patrones de detección)

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ **ANÁLISIS COMPLETO** - Información crítica viene de Storybook, mapeos necesarios están hardcodeados

