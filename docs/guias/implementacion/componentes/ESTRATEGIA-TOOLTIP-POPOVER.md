# 🎯 Estrategia de Implementación: Tooltip y Popover

> **⚠️ CRÍTICO:** Esta estrategia DEBE seguirse al implementar componentes Tooltip o Popover para evitar errores de posicionamiento y desbordamiento.

---

## 🎯 Objetivo

Garantizar que Tooltips y Popovers:
- ✅ Siempre permanezcan dentro de los límites visibles
- ✅ Se centren correctamente respecto al elemento de referencia
- ✅ Ajusten su ancho dinámicamente según el espacio disponible
- ✅ La flecha siempre apunte hacia el componente de referencia
- ✅ Respeten los límites del contenedor principal (no solo el viewport)

---

## 📋 Checklist Pre-Implementación

**ANTES de implementar Tooltip/Popover, verificar:**

- [ ] ✅ Consulté Storybook en Vercel para ver estructura exacta
- [ ] ✅ Consulté Storybook MCP para obtener props exactas
- [ ] ✅ Leí documentación: `docs/referencia/componentes/feedback-tooltip.md`
- [ ] ✅ Entendí correctamente el concepto de `tailPosition`
- [ ] ✅ Identifiqué el contenedor principal donde se mostrará el tooltip

---

## 🚨 Conceptos Críticos

### **1. Entender `tailPosition` Correctamente** ⚠️ CRÍTICO

**⚠️ ERROR COMÚN:** Asumir que `tailPosition` indica dónde está el tooltip.

**✅ CORRECTO:** `tailPosition` indica dónde está la **FLECHA** en el tooltip, NO dónde está el tooltip.

| `tailPosition` | Posición de la Flecha | Posición del Tooltip |
|----------------|----------------------|---------------------|
| `'top'` | Arriba del tooltip | **DEBAJO** del elemento |
| `'bottom'` | Abajo del tooltip | **ARRIBA** del elemento |
| `'left'` | Izquierda del tooltip | A la **DERECHA** del elemento |
| `'right'` | Derecha del tooltip | A la **IZQUIERDA** del elemento |

**Ejemplo:**
```javascript
// Si quieres que el tooltip aparezca DEBAJO del chip:
// ✅ CORRECTO: tailPosition: 'top' (flecha arriba del tooltip)
// ❌ INCORRECTO: tailPosition: 'bottom' (esto pondría el tooltip ARRIBA)
```

---

## 🛠️ Implementación Obligatoria

### **FASE 1: Detección de Contenedor** ⚠️ OBLIGATORIO

**Problema:** Si solo usas `window.innerWidth`, el tooltip puede invadir la sidebar o áreas fuera del contenido principal.

**Solución:** Detectar el contenedor principal usando `element.closest()`:

```javascript
// ⚠️ CRÍTICO: Encontrar el contenedor principal
let containerRect = null;
if (referenceElement) {
  // Buscar el contenedor principal (.main-content o .content-area)
  let container = referenceElement.closest('.main-content') || 
                 referenceElement.closest('.content-area') ||
                 referenceElement.closest('main') ||
                 referenceElement.parentElement;
  
  // Si encontramos un contenedor, usar sus límites
  if (container) {
    containerRect = container.getBoundingClientRect();
  }
}

// Si no hay contenedor, usar viewport como fallback
const bounds = containerRect || {
  left: 0,
  top: 0,
  right: window.innerWidth,
  bottom: window.innerHeight,
  width: window.innerWidth,
  height: window.innerHeight,
};

// ⚠️ CRÍTICO: Asegurar que todos los valores sean números válidos
const viewport = {
  width: bounds.width || window.innerWidth,
  height: bounds.height || window.innerHeight,
  left: bounds.left || 0,
  top: bounds.top || 0,
  right: bounds.right || window.innerWidth,
  bottom: bounds.bottom || window.innerHeight,
};

// ⚠️ DEBUG: Verificar valores del viewport
if (isNaN(viewport.width) || isNaN(viewport.height) || isNaN(viewport.left) || isNaN(viewport.right)) {
  console.error('❌ [Tooltip] Valores inválidos del viewport:', {
    containerRect,
    bounds,
    viewport,
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight
  });
  // Usar valores del window como fallback seguro
  viewport.width = window.innerWidth;
  viewport.height = window.innerHeight;
  viewport.left = 0;
  viewport.top = 0;
  viewport.right = window.innerWidth;
  viewport.bottom = window.innerHeight;
}
```

**Checklist:**
- [ ] ✅ Detectar contenedor usando `closest('.main-content')` o `closest('main')`
- [ ] ✅ Usar límites del contenedor en lugar de solo `window.innerWidth`
- [ ] ✅ Validar que todos los valores sean números válidos (no `NaN`)
- [ ] ✅ Tener fallback seguro a `window.innerWidth` si no hay contenedor

---

### **FASE 2: Cálculo de Espacio Disponible** ⚠️ OBLIGATORIO

**Problema:** Si no calculas el espacio disponible correctamente, el tooltip puede ser demasiado ancho y salirse.

**Solución:** Calcular espacio disponible relativo al contenedor:

```javascript
const padding = 8; // Padding mínimo desde los bordes

// Calcular espacio disponible en cada dirección RELATIVO AL CONTENEDOR
// ⚠️ CRÍTICO: Asegurar que los cálculos no den NaN
const spaceAbove = Math.max(0, refRect.top - viewport.top - padding);
const spaceBelow = Math.max(0, viewport.bottom - refRect.bottom - padding);
const spaceLeft = Math.max(0, refRect.left - viewport.left - padding);
const spaceRight = Math.max(0, viewport.right - refRect.right - padding);

// ⚠️ CRÍTICO: Calcular ancho máximo disponible para centrar el tooltip
// Para centrar correctamente, el tooltip debe poder extenderse igualmente a ambos lados
// El ancho máximo es: 2 * (espacio más pequeño entre izquierda/derecha) + ancho del elemento
// O el ancho total del contenedor menos padding
const minSpace = Math.min(spaceLeft, spaceRight);
const maxWidthForCentering = (minSpace * 2) + refRect.width;
const maxWidthForContainer = viewport.width - (padding * 2);

// ⚠️ CRÍTICO: Validar que los valores sean números válidos antes de calcular
if (isNaN(minSpace) || isNaN(refRect.width) || isNaN(viewport.width)) {
  console.error('❌ [Tooltip] Valores inválidos en cálculo de ancho:', {
    minSpace,
    refRectWidth: refRect.width,
    viewportWidth: viewport.width,
    spaceLeft,
    spaceRight,
    viewport,
    containerRect
  });
  // Usar valores seguros como fallback
  const safeMaxWidth = Math.max(160, viewport.width - (padding * 4));
  return {
    top: refRect.bottom + padding,
    left: refRect.left + refRect.width / 2,
    transform: 'translateX(-50%)',
    tailPosition: preferredTailPosition,
    maxWidth: safeMaxWidth,
  };
}

const maxAvailableWidth = Math.min(maxWidthForCentering, maxWidthForContainer);

// ⚠️ DEBUG: Log para diagnóstico
if (isNaN(maxAvailableWidth)) {
  console.error('❌ [Tooltip] maxAvailableWidth es NaN:', {
    minSpace,
    maxWidthForCentering,
    maxWidthForContainer,
    viewport,
    spaceLeft,
    spaceRight,
    refRect
  });
  // Usar valores seguros como fallback
  const safeMaxWidth = Math.max(160, viewport.width - (padding * 4));
  return {
    top: refRect.bottom + padding,
    left: refRect.left + refRect.width / 2,
    transform: 'translateX(-50%)',
    tailPosition: preferredTailPosition,
    maxWidth: safeMaxWidth,
  };
}
```

**Checklist:**
- [ ] ✅ Calcular espacio disponible relativo al contenedor (no solo viewport)
- [ ] ✅ Usar `Math.max(0, ...)` para evitar valores negativos
- [ ] ✅ Calcular `maxWidthForCentering` para permitir centrado simétrico
- [ ] ✅ Validar que valores no sean `NaN` antes de usar
- [ ] ✅ Tener fallback seguro si hay errores

---

### **FASE 3: Ajuste Dinámico de Ancho** ⚠️ OBLIGATORIO

**Problema:** Si el tooltip tiene un `min-width` o `max-width` fijo, no se ajustará al espacio disponible.

**Solución:** Ajustar el ancho dinámicamente ANTES de calcular la posición:

```javascript
// ⚠️ CRÍTICO: Ajustar ancho del tooltip ANTES de calcular la posición
// Esto asegura que el tooltip se ajuste al espacio disponible y se mantenga centrado
const currentMaxWidth = parseInt(window.getComputedStyle(tooltipElement).maxWidth) || 320;
const currentWidth = tooltipRect.width;

// Calcular nuevo maxWidth: usar el espacio disponible menos padding adicional
// Asegurar que el tooltip quepa centrado sin salirse
// ⚠️ IMPORTANTE: El ancho debe ser menor que el espacio disponible para que quepa centrado
const newMaxWidth = Math.max(160, Math.floor(maxAvailableWidth - (padding * 2)));

// ⚠️ CRÍTICO: SIEMPRE ajustar el ancho para mantener el centrado
// Aplicar el nuevo ancho SIEMPRE que sea diferente al actual o si el tooltip es más ancho
const needsAdjustment = newMaxWidth !== currentMaxWidth || 
                       currentWidth > maxAvailableWidth ||
                       tooltipRect.width > maxAvailableWidth;

if (needsAdjustment) {
  finalMaxWidth = newMaxWidth;
  // ⚠️ CRÍTICO: Aplicar el nuevo maxWidth y asegurar que se respete
  // Usar setProperty para aplicar !important correctamente
  tooltipElement.style.setProperty('max-width', `${newMaxWidth}px`, 'important');
  
  // ⚠️ CRÍTICO: Remover o ajustar min-width para permitir que el tooltip se reduzca
  const computedMinWidth = window.getComputedStyle(tooltipElement).minWidth;
  const minWidthValue = parseInt(computedMinWidth) || 0;
  if (minWidthValue > newMaxWidth) {
    // Si el min-width es mayor que el nuevo max-width, reducirlo
    tooltipElement.style.setProperty('min-width', `${Math.min(120, newMaxWidth)}px`, 'important');
  } else {
    tooltipElement.style.setProperty('min-width', 'auto', 'important');
  }
  
  tooltipElement.style.setProperty('width', 'auto', 'important'); // Permitir que se ajuste al contenido pero respetando maxWidth
  
  // Forzar recálculo del layout
  tooltipElement.offsetHeight; // Trigger reflow
  
  // Recalcular dimensiones después de cambiar el ancho
  tooltipRect = tooltipElement.getBoundingClientRect();
  
  // ⚠️ DEBUG: Log para verificar el ajuste
  console.log('🔧 [Tooltip] Ajustando ancho:', {
    maxAvailableWidth: Math.round(maxAvailableWidth),
    newMaxWidth,
    currentMaxWidth,
    currentWidth: Math.round(currentWidth),
    tooltipRectWidth: Math.round(tooltipRect.width),
    spaceLeft: Math.round(spaceLeft),
    spaceRight: Math.round(spaceRight),
    minSpace: Math.round(minSpace),
    appliedMaxWidth: tooltipElement.style.getPropertyValue('max-width'),
    computedMaxWidth: window.getComputedStyle(tooltipElement).maxWidth,
    computedMinWidth: window.getComputedStyle(tooltipElement).minWidth
  });
}
```

**Checklist:**
- [ ] ✅ Ajustar `maxWidth` ANTES de calcular la posición final
- [ ] ✅ Usar `setProperty('max-width', value, 'important')` (NO `style.maxWidth = '... !important'`)
- [ ] ✅ Ajustar `min-width` si es mayor que el nuevo `max-width`
- [ ] ✅ Forzar reflow con `offsetHeight` después de cambiar estilos
- [ ] ✅ Recalcular `tooltipRect` después del ajuste
- [ ] ✅ Agregar logs de debug para diagnóstico

---

### **FASE 4: Cálculo de Posición Óptima** ⚠️ OBLIGATORIO

**Problema:** Si no calculas la posición correctamente, el tooltip puede salirse o la flecha puede apuntar en la dirección incorrecta.

**Solución:** Implementar función `calculateOptimalPosition()` completa:

```javascript
const calculateOptimalPosition = (refRect, tooltipElement, preferredTailPosition, referenceElement) => {
  // ⚠️ CRÍTICO: Verificar que tooltipElement sea un elemento válido
  if (!tooltipElement || typeof tooltipElement.getBoundingClientRect !== 'function') {
    console.error('❌ [Tooltip] tooltipElement no es un elemento válido:', tooltipElement);
    return {
      top: refRect.bottom + 8,
      left: refRect.left + refRect.width / 2,
      transform: 'translateX(-50%)',
      tailPosition: preferredTailPosition,
      maxWidth: null,
    };
  }
  
  // ... (FASE 1: Detección de contenedor)
  // ... (FASE 2: Cálculo de espacio disponible)
  // ... (FASE 3: Ajuste dinámico de ancho)
  
  // FASE 4: Calcular posición final con centrado correcto
  
  let finalTailPosition = preferredTailPosition;
  let finalTop = 0;
  let finalLeft = 0;
  let finalTransform = '';
  
  // Intentar posición preferida primero
  if (preferredTailPosition === 'top') {
    // ⚠️ CORREGIDO: 'top' significa flecha arriba → tooltip DEBAJO del elemento
    finalTop = refRect.bottom + padding;
    finalLeft = refRect.left + refRect.width / 2;
    finalTransform = 'translateX(-50%)';
    
    // ⚠️ CRÍTICO: Verificar si se sale por abajo
    if (finalTop + tooltipRect.height > viewport.bottom - padding) {
      // Cambiar a arriba automáticamente (flecha abajo)
      finalTailPosition = 'bottom';
      finalTop = refRect.top - tooltipRect.height - padding;
    }
    
    // ⚠️ CRÍTICO: Centrar horizontalmente dentro de los límites del contenedor
    const idealLeft = refRect.left + refRect.width / 2;
    const tooltipHalfWidth = tooltipRect.width / 2;
    const containerLeftBound = viewport.left + padding;
    const containerRightBound = viewport.right - padding;
    
    let calculatedLeft = idealLeft;
    if (calculatedLeft - tooltipHalfWidth < containerLeftBound) {
      calculatedLeft = containerLeftBound + tooltipHalfWidth;
    }
    if (calculatedLeft + tooltipHalfWidth > containerRightBound) {
      calculatedLeft = containerRightBound - tooltipHalfWidth;
    }
    finalLeft = calculatedLeft;
    
  } else if (preferredTailPosition === 'bottom') {
    // ⚠️ CORREGIDO: 'bottom' significa flecha abajo → tooltip ARRIBA del elemento
    finalTop = refRect.top - tooltipRect.height - padding;
    finalLeft = refRect.left + refRect.width / 2;
    finalTransform = 'translateX(-50%)';
    
    // ⚠️ CRÍTICO: Verificar si se sale por arriba
    if (finalTop < viewport.top + padding) {
      // Cambiar a debajo automáticamente (flecha arriba)
      finalTailPosition = 'top';
      finalTop = refRect.bottom + padding;
    }
    
    // ⚠️ CRÍTICO: Centrar horizontalmente dentro de los límites del contenedor
    const idealLeft = refRect.left + refRect.width / 2;
    const tooltipHalfWidth = tooltipRect.width / 2;
    const containerLeftBound = viewport.left + padding;
    const containerRightBound = viewport.right - padding;
    
    let calculatedLeft = idealLeft;
    if (calculatedLeft - tooltipHalfWidth < containerLeftBound) {
      calculatedLeft = containerLeftBound + tooltipHalfWidth;
    }
    if (calculatedLeft + tooltipHalfWidth > containerRightBound) {
      calculatedLeft = containerRightBound - tooltipHalfWidth;
    }
    finalLeft = calculatedLeft;
  }
  // ... (similar para left, right)
  
  return {
    top: finalTop,
    left: finalLeft,
    transform: finalTransform,
    tailPosition: finalTailPosition, // ⚠️ Puede cambiar si se sale de la pantalla
    maxWidth: finalMaxWidth, // ⚠️ Ancho máximo ajustado dinámicamente
  };
};
```

**Checklist:**
- [ ] ✅ Pasar `tooltipElement` (no `tooltipRect`) para poder ajustar ancho
- [ ] ✅ Pasar `referenceElement` para detectar contenedor
- [ ] ✅ Calcular posición relativa al contenedor (no solo viewport)
- [ ] ✅ Centrar tooltip respecto al elemento de referencia
- [ ] ✅ Verificar límites del contenedor al centrar
- [ ] ✅ Cambiar `tailPosition` automáticamente si se sale
- [ ] ✅ Retornar `maxWidth` ajustado dinámicamente

---

### **FASE 5: Aplicación de Estilos** ⚠️ OBLIGATORIO

**Problema:** Si aplicas `maxWidth` incorrectamente, el tooltip no se redimensionará.

**Solución:** Usar `setProperty` con `'important'` y aplicar en `openTooltip()`:

```javascript
// En openTooltip()
const optimal = calculateOptimalPosition(rect, tooltip, preferredTailPosition, referenceElement);

// ⚠️ CRÍTICO: Aplicar ancho máximo si se ajustó dinámicamente
if (optimal.maxWidth !== null) {
  // ⚠️ CRÍTICO: Aplicar maxWidth con !important usando setProperty
  tooltip.style.setProperty('max-width', `${optimal.maxWidth}px`, 'important');
  
  // Asegurar que el min-width no sea mayor que el max-width
  const computedMinWidth = window.getComputedStyle(tooltip).minWidth;
  const minWidthValue = parseInt(computedMinWidth) || 0;
  if (minWidthValue > optimal.maxWidth) {
    tooltip.style.setProperty('min-width', `${Math.min(120, optimal.maxWidth)}px`, 'important');
  }
  
  // Forzar recálculo para asegurar que el ancho se aplique
  tooltip.offsetHeight; // Trigger reflow
}

// Aplicar posición
tooltip.style.position = 'fixed';
tooltip.style.top = `${optimal.top}px`;
tooltip.style.left = `${optimal.left}px`;
tooltip.style.transform = optimal.transform;
tooltip.style.zIndex = '9999';

// ⚠️ CRÍTICO: Actualizar clase de tail si cambió
const currentTailClass = tooltip.className.match(/ubits-tooltip--tail-\w+/);
if (currentTailClass) {
  tooltip.classList.remove(currentTailClass[0]);
}
tooltip.classList.add(`ubits-tooltip--tail-${optimal.tailPosition}`);
```

**Checklist:**
- [ ] ✅ Usar `setProperty('max-width', value, 'important')` (NO `style.maxWidth = '... !important'`)
- [ ] ✅ Aplicar `maxWidth` ANTES de aplicar posición
- [ ] ✅ Ajustar `min-width` si es necesario
- [ ] ✅ Forzar reflow con `offsetHeight` después de aplicar estilos
- [ ] ✅ Actualizar clase CSS de `tailPosition` si cambió automáticamente

---

## ✅ Checklist Completo de Implementación

### **Pre-Implementación:**
- [ ] ✅ Consulté Storybook en Vercel
- [ ] ✅ Consulté Storybook MCP
- [ ] ✅ Leí documentación del componente
- [ ] ✅ Entendí correctamente `tailPosition`

### **Implementación:**
- [ ] ✅ Implementé detección de contenedor principal
- [ ] ✅ Implementé cálculo de espacio disponible relativo al contenedor
- [ ] ✅ Implementé ajuste dinámico de ancho ANTES de calcular posición
- [ ] ✅ Implementé función `calculateOptimalPosition()` completa
- [ ] ✅ Pasé `tooltipElement` (no `tooltipRect`) a `calculateOptimalPosition()`
- [ ] ✅ Pasé `referenceElement` para detectar contenedor
- [ ] ✅ Validé que valores no sean `NaN` antes de usar
- [ ] ✅ Usé `setProperty('max-width', value, 'important')` correctamente
- [ ] ✅ Ajusté `min-width` si es mayor que `max-width`
- [ ] ✅ Forcé reflow después de cambiar estilos
- [ ] ✅ Recalculé `tooltipRect` después del ajuste
- [ ] ✅ Centré tooltip respecto al elemento dentro de límites del contenedor
- [ ] ✅ Cambié `tailPosition` automáticamente si se sale
- [ ] ✅ Actualicé clase CSS de `tailPosition` si cambió

### **Post-Implementación:**
- [ ] ✅ Probé con elemento cerca de cada borde de la pantalla
- [ ] ✅ Verifiqué que tooltip siempre esté completamente visible
- [ ] ✅ Verifiqué que la flecha siempre apunte hacia el componente
- [ ] ✅ Verifiqué que el ancho se ajuste al contenido y espacio disponible
- [ ] ✅ Verifiqué que tooltip respete límites del contenedor (no solo viewport)
- [ ] ✅ Revisé consola para verificar que no hay valores `NaN`
- [ ] ✅ Revisé logs de debug para verificar cálculos

---

## 🚨 Errores Comunes a Evitar

### **Error #1: No Detectar Contenedor**
- ❌ Usar solo `window.innerWidth` como límite
- ✅ Detectar contenedor con `element.closest('.main-content')`

### **Error #2: No Ajustar Ancho Dinámicamente**
- ❌ Usar `maxWidth` fijo del HTML
- ✅ Calcular `maxAvailableWidth` y ajustar dinámicamente

### **Error #3: Usar `style.maxWidth = '... !important'`**
- ❌ `tooltip.style.maxWidth = '160px !important';` (no funciona)
- ✅ `tooltip.style.setProperty('max-width', '160px', 'important');`

### **Error #4: No Validar Valores NaN**
- ❌ Usar valores `NaN` en cálculos
- ✅ Validar con `isNaN()` y tener fallback seguro

### **Error #5: Pasar `tooltipRect` en lugar de `tooltipElement`**
- ❌ `calculateOptimalPosition(refRect, tooltipRect, ...)`
- ✅ `calculateOptimalPosition(refRect, tooltipElement, ..., referenceElement)`

### **Error #6: No Forzar Reflow**
- ❌ Cambiar estilos sin forzar reflow
- ✅ Usar `tooltipElement.offsetHeight;` después de cambiar estilos

### **Error #7: No Recalcular Dimensiones**
- ❌ Usar `tooltipRect` antiguo después de ajustar ancho
- ✅ Recalcular con `tooltipElement.getBoundingClientRect()` después del ajuste

---

## 📚 Referencias

- **Documentación del componente:** `docs/referencia/componentes/feedback-tooltip.md`
- **Estrategia general:** `docs/guias/implementacion/ESTRATEGIA-IMPLEMENTACION-SIN-ERRORES.md`
- **Errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

---

**Última actualización:** 2025-12-10
