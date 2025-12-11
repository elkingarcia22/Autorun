# 🛡️ Estrategia General: Implementación Sin Errores Comunes

> **⚠️ CRÍTICO:** Esta estrategia **GENERAL** DEBE seguirse en CADA implementación para evitar errores comunes que requieren correcciones posteriores.
>
> **📚 Para estrategias específicas por componente:** Ver `docs/guias/implementacion/componentes/`

---

## 🎯 Objetivo

Garantizar que cada implementación de componente UBITS se haga correctamente desde el inicio, evitando:
- ❌ Bugs funcionales (componentes que no funcionan)
- ❌ Errores de estilo (margins, paddings incorrectos)
- ❌ Componentes que solo funcionan una vez
- ❌ Dependencias faltantes (scripts no cargados)
- ❌ Estructura incorrecta
- ❌ Componentes que se salen de la pantalla/contenedor
- ❌ Valores `NaN` en cálculos
- ❌ Aplicación incorrecta de estilos con `!important`

---

## 📋 Estrategia en 5 Fases

### **FASE 1: Análisis y Consulta** ⚠️ OBLIGATORIO

#### 1.1. **Consultar Storybook en Vercel** ⚠️ PRIMERO
```bash
# URL: https://ubits-storybook10.vercel.app/
# Buscar componente específico
# Revisar:
#   - Pestaña "Code" → Estructura exacta
#   - Pestaña "Controls" → Props disponibles
#   - Pestaña "Docs" → Documentación
```

**Checklist:**
- [ ] Abrir Storybook en Vercel
- [ ] Buscar componente específico
- [ ] Revisar estructura HTML exacta
- [ ] Revisar props y opciones
- [ ] Anotar estilos por defecto (margins, paddings)
- [ ] **Volver al template después de consultar**

#### 1.2. **Consultar Storybook MCP** ⚠️ OBLIGATORIO
```typescript
// Usar MCP para obtener props exactas
const props = await mcp_storybook_getComponentsProps(['component-id']);
// Verificar estructura, tokens, variantes
```

**Checklist:**
- [ ] Listar componentes disponibles
- [ ] Obtener props del componente específico
- [ ] Verificar estructura exacta
- [ ] Verificar tokens usados

#### 1.3. **Consultar Documentación** ⚠️ OBLIGATORIO
```bash
# Leer: docs/referencia/componentes/[componente].md
# Leer: docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md
```

**Checklist:**
- [ ] Leer documentación del componente
- [ ] Revisar errores comunes relacionados
- [ ] Verificar ejemplos de uso

---

### **FASE 2: Verificación de Errores Comunes** ⚠️ OBLIGATORIO

#### 2.1. **Verificar Formato de Iconos**
```typescript
// ✅ CORRECTO
icon: 'home'
icon: 'chart-pie-simple' // Si el icono tiene sufijo, usar completo

// ❌ INCORRECTO
icon: 'far fa-home'
icon: 'fa-home'
```

**Checklist:**
- [ ] Verificar formato de iconos en Storybook
- [ ] NO usar prefijos `fa-`, `far`, `fas`
- [ ] Usar nombre completo si tiene sufijo (ej: `chart-pie-simple`)

#### 2.2. **Verificar NO Agregar Estilos Automáticamente**
```typescript
// ❌ INCORRECTO - Agregar margin-top automáticamente
<div id="container" style="margin-top: 16px;">

// ✅ CORRECTO - El spacing viene del gap del padre
<div id="container"> // Sin estilos extra
```

**Checklist:**
- [ ] NO agregar `margin-top` automáticamente
- [ ] NO agregar `padding` automáticamente
- [ ] NO agregar `background` automáticamente
- [ ] Solo agregar estilos si el usuario lo solicita EXPLÍCITAMENTE

#### 2.3. **Verificar Dependencias de Scripts**
```typescript
// Verificar que scripts necesarios estén cargados
if (typeof window.createModal !== 'function') {
  // Implementar manualmente o esperar carga
}
```

**Checklist:**
- [ ] Verificar que `components-loader.js` carga el componente
- [ ] Si no carga, implementar manualmente
- [ ] Verificar disponibilidad antes de usar

---

### **FASE 3: Implementación Correcta** ⚠️ OBLIGATORIO

#### 3.1. **Estructura Correcta**
```html
<!-- Contenedor externo (con padding si se solicita) -->
<div id="component-container" style="padding: var(--ubits-spacing-lg, 16px);">
  <!-- Componente se crea aquí -->
</div>
```

**Checklist:**
- [ ] Crear contenedor externo
- [ ] Aplicar padding SOLO si se solicita explícitamente
- [ ] NO agregar margin-top al contenedor

#### 3.2. **Inicialización Correcta**
```javascript
// Verificar disponibilidad antes de usar
const createComponent = window.createComponent || window.UBITSComponent?.create;
if (typeof createComponent !== 'function') {
  // Implementar manualmente o esperar
}
```

**Checklist:**
- [ ] Verificar disponibilidad de funciones
- [ ] Implementar manualmente si no está disponible
- [ ] Agregar retry logic con timeout

#### 3.3. **Manejo de Estado Correcto**
```javascript
// Verificar estado real, no solo existencia de instancia
const isOpen = modalInstance?.element?.classList.contains('ubits-modal-overlay--open');
if (isOpen) {
  return; // Ya está abierto
}
// Limpiar si está cerrado
if (modalInstance && !isOpen) {
  modalInstance.element.remove();
  modalInstance = null;
}
```

**Checklist:**
- [ ] Verificar estado real (clases CSS, visibilidad)
- [ ] Limpiar instancias cerradas del DOM
- [ ] Resetear variables cuando se cierra

#### 3.4. **Validación de Valores y Cálculos** ⚠️ CRÍTICO
```javascript
// ⚠️ CRÍTICO: Validar que valores no sean NaN antes de usar
const calculatedValue = someCalculation();
if (isNaN(calculatedValue)) {
  console.error('❌ Valor inválido:', calculatedValue);
  // Usar fallback seguro
  const safeValue = defaultValue || 0;
  return safeValue;
}
```

**Checklist:**
- [ ] Validar que cálculos no den `NaN`
- [ ] Tener fallback seguro si hay errores
- [ ] Loggear errores para diagnóstico
- [ ] Verificar valores antes de aplicar estilos

#### 3.5. **Aplicación Correcta de Estilos con `!important`** ⚠️ CRÍTICO
```javascript
// ❌ INCORRECTO - No funciona
element.style.maxWidth = '160px !important';

// ✅ CORRECTO - Usar setProperty
element.style.setProperty('max-width', '160px', 'important');
```

**Checklist:**
- [ ] Usar `setProperty(property, value, 'important')` para aplicar `!important`
- [ ] NO usar `style.property = 'value !important'` (no funciona)
- [ ] Forzar reflow con `element.offsetHeight` después de cambiar estilos

---

### **FASE 4: Validación Pre-Escritura** ⚠️ OBLIGATORIO

#### 4.1. **Usar interceptedWrite() o interceptedSearchReplace()**
```typescript
// ⚠️ OBLIGATORIO: Usar interceptores
import { interceptedWrite, interceptedSearchReplace } from '@autorun/core/interceptors/toolInterceptors';

// En lugar de write() directo
await interceptedWrite(filePath, content, { componentName: 'Modal' });
```

**Checklist:**
- [ ] Usar `interceptedWrite()` en lugar de `write()`
- [ ] Usar `interceptedSearchReplace()` en lugar de `search_replace()`
- [ ] Proporcionar `componentName` en contexto

#### 4.2. **Verificar PreWriteValidator**
```typescript
import { PreWriteValidator } from '@autorun/core/validation/PreWriteValidator';

const validation = await PreWriteValidator.validateBeforeWrite(
  filePath,
  content,
  { componentName: 'Modal' }
);

if (!validation.valid) {
  // Completar pasos faltantes
}
```

**Checklist:**
- [ ] Ejecutar PreWriteValidator antes de escribir
- [ ] Completar pasos faltantes si hay errores
- [ ] Solo escribir si `validation.valid === true`

---

### **FASE 5: Post-Implementación** ⚠️ OBLIGATORIO

#### 5.1. **Interceptar Auto-Reload**
```typescript
// Detectar mensaje [AUTORUN_AUTO_RELOAD] en logs
// Ejecutar: mcp_cursor-ide-browser_browser_navigate({ url })
```

**Checklist:**
- [ ] Detectar `[AUTORUN_AUTO_RELOAD]` en logs
- [ ] Recargar página automáticamente
- [ ] Verificar que cambios se reflejen

#### 5.2. **Interceptar Storybook MCP**
```typescript
// Detectar mensaje [AUTORUN_STORYBOOK_MCP] en logs
// Ejecutar: mcp_storybook_getComponentsProps(['component-id'])
```

**Checklist:**
- [ ] Detectar `[AUTORUN_STORYBOOK_MCP]` en logs
- [ ] Consultar Storybook MCP automáticamente
- [ ] Usar props obtenidas en implementación

#### 5.3. **Verificar Funcionalidad**
```typescript
// Probar que el componente funciona múltiples veces
// Verificar que no hay errores en consola
```

**Checklist:**
- [ ] Probar funcionalidad básica
- [ ] Verificar que funciona múltiples veces (no solo una vez)
- [ ] Revisar consola del navegador
- [ ] Verificar que no hay errores JavaScript

---

## 🛠️ Herramientas Disponibles

### **1. interceptedWrite() / interceptedSearchReplace()**
```typescript
// Automáticamente ejecuta PreWriteValidator y autoImplementationFlow
await interceptedWrite(filePath, content, { componentName: 'Modal' });
```

### **2. PreWriteValidator**
```typescript
// Valida checklist antes de escribir
const validation = await PreWriteValidator.validateBeforeWrite(...);
```

### **3. autoImplementationFlow()**
```typescript
// Genera plan, URLs de Storybook, verifica checklist
const flow = await autoImplementationFlow(filePath, content, undefined, context);
```

### **4. ensureImplementationReady()**
```typescript
// Verifica que AutorunHub esté inicializado
await ensureImplementationReady(componentName);
```

---

## 📝 Template de Implementación

```typescript
// PASO 1: Consultar Storybook en Vercel
// - Navegar a: https://ubits-storybook10.vercel.app/?path=/story/component-id--default
// - Revisar Code, Controls, Docs
// - Volver al template

// PASO 2: Consultar Storybook MCP
const props = await mcp_storybook_getComponentsProps(['component-id']);

// PASO 3: Consultar Documentación
// - Leer: docs/referencia/componentes/component.md
// - Leer: docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md

// PASO 4: Verificar Errores Comunes
// - Verificar formato de iconos
// - Verificar NO agregar estilos automáticamente
// - Verificar dependencias de scripts

// PASO 5: Implementar usando interceptedWrite()
await interceptedWrite(filePath, content, { componentName: 'Component' });

// PASO 6: Interceptar Auto-Reload
// - Detectar [AUTORUN_AUTO_RELOAD] en logs
// - Recargar página

// PASO 7: Verificar Funcionalidad
// - Probar múltiples veces
// - Verificar consola
```

---

## 🚨 Errores Comunes a Evitar (Generales)

### **Error #1: Formato de Iconos**
- ❌ `icon: 'far fa-home'`
- ✅ `icon: 'home'`

### **Error #53: Estilos Automáticos**
- ❌ Agregar `padding`, `margin`, `background` automáticamente
- ✅ Solo agregar si se solicita explícitamente

### **Error #55: margin-top en Contenedor**
- ❌ `<div id="container" style="margin-top: 16px;">`
- ✅ El spacing viene del `gap` del padre

### **Error: Componente Solo Funciona Una Vez**
- ❌ `if (instance) return;` sin verificar estado real
- ✅ Verificar clase CSS `ubits-modal-overlay--open` antes de prevenir

### **Error: Scripts No Cargados**
- ❌ Asumir que `components-loader.js` carga todo
- ✅ Implementar manualmente si no está disponible

### **Error: Valores NaN en Cálculos** ⚠️ CRÍTICO
- ❌ Usar valores `NaN` directamente en cálculos
- ✅ Validar con `isNaN()` y tener fallback seguro
```javascript
// ❌ INCORRECTO
const result = value1 + value2; // Si value1 es NaN, result será NaN

// ✅ CORRECTO
if (isNaN(value1) || isNaN(value2)) {
  console.error('❌ Valores inválidos:', { value1, value2 });
  return defaultValue;
}
const result = value1 + value2;
```

### **Error: Aplicación Incorrecta de `!important`** ⚠️ CRÍTICO
- ❌ `element.style.maxWidth = '160px !important';` (no funciona)
- ✅ `element.style.setProperty('max-width', '160px', 'important');`
```javascript
// ❌ INCORRECTO - No funciona
tooltip.style.maxWidth = '160px !important';

// ✅ CORRECTO - Funciona
tooltip.style.setProperty('max-width', '160px', 'important');
```

### **Error: No Detectar Contenedor Principal** ⚠️ CRÍTICO
- ❌ Usar solo `window.innerWidth` como límite (ignora sidebar)
- ✅ Detectar contenedor con `element.closest('.main-content')`
```javascript
// ❌ INCORRECTO
const viewport = { width: window.innerWidth, height: window.innerHeight };

// ✅ CORRECTO
let container = referenceElement.closest('.main-content') || 
               referenceElement.closest('main');
const containerRect = container?.getBoundingClientRect();
const viewport = containerRect || {
  width: window.innerWidth,
  height: window.innerHeight,
  left: 0,
  top: 0,
  right: window.innerWidth,
  bottom: window.innerHeight,
};
```

### **Error: Tooltip/Popover se Sale de la Pantalla** ⚠️ CRÍTICO
- ❌ Posicionar tooltip sin verificar bordes de la pantalla/contenedor
- ❌ No ajustar `tailPosition` cuando se sale de la pantalla
- ❌ No calcular posición óptima antes de mostrar
- ❌ No detectar contenedor principal (`.main-content`, `main`)
- ❌ No ajustar ancho dinámicamente según espacio disponible
- ❌ Usar `style.maxWidth = '... !important'` (no funciona)
- ❌ No validar valores NaN en cálculos

**✅ SOLUCIÓN OBLIGATORIA:**
> **📚 Ver estrategia específica completa:** `docs/guias/implementacion/componentes/ESTRATEGIA-TOOLTIP-POPOVER.md`

**Resumen de puntos críticos:**
1. **Detección de contenedor:** Usar `element.closest('.main-content')` para respetar límites del área de contenido
2. **Ajuste dinámico de ancho:** Calcular `maxAvailableWidth` y aplicar con `setProperty('max-width', value, 'important')`
3. **Validación de valores:** Verificar que cálculos no den `NaN` antes de aplicar
4. **Pasar elemento, no rect:** Pasar `tooltipElement` para poder ajustar estilos dinámicamente
5. **Centrado correcto:** Centrar tooltip respecto al elemento de referencia dentro de los límites del contenedor
6. **Entender `tailPosition`:** Indica dónde está la FLECHA, no dónde está el tooltip

---

## 📚 Estrategias Específicas por Componente

**Para componentes específicos, consultar estrategias detalladas:**

- **Tooltip/Popover:** `docs/guias/implementacion/componentes/ESTRATEGIA-TOOLTIP-POPOVER.md`
  - Detección de contenedor principal
  - Ajuste dinámico de ancho
  - Cálculo de posición óptima
  - Entender `tailPosition` correctamente

**Ver índice completo:** `docs/guias/implementacion/componentes/README.md`

---

## ✅ Checklist Final Antes de Escribir

### **Checklist General:**
- [ ] ✅ Consulté Storybook en Vercel
- [ ] ✅ Consulté Storybook MCP
- [ ] ✅ Consulté documentación
- [ ] ✅ Verifiqué formato de iconos
- [ ] ✅ Verifiqué NO agregar estilos automáticamente
- [ ] ✅ Verifiqué dependencias de scripts
- [ ] ✅ Usaré `interceptedWrite()` o `interceptedSearchReplace()`
- [ ] ✅ Verificaré funcionalidad múltiples veces
- [ ] ✅ Interceptaré auto-reload si aparece en logs
- [ ] ✅ Interceptaré Storybook MCP si aparece en logs

### **Checklist Específico del Componente:**
- [ ] ✅ Consulté estrategia específica del componente (si existe)
- [ ] ✅ Revisé errores comunes específicos del componente
- [ ] ✅ Seguí checklist específico del componente

---

**Última actualización:** 2025-12-10