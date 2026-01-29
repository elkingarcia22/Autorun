# 🔍 Análisis: Errores en Filtros - Inputs y Calendario

## ❌ PROBLEMA IDENTIFICADO

Al implementar los filtros del DataTable, se cometieron los siguientes errores:

1. **Inputs de fecha usaban `type: 'date'`** en lugar de `type: 'calendar'`
2. **El icono del calendario no tenía el token correcto** (usaba el calendario nativo del sistema)
3. **El calendario desplegado era genérico del sistema** en lugar del componente Calendar de UBITS
4. **No se verificó cómo se implementan los inputs de fecha en el Storybook**

## 🎯 Comportamiento Esperado

**Los inputs de fecha en los filtros deben:**
- Usar `type: 'calendar'` (no `type: 'date'`)
- Mostrar un icono de calendario con tokens UBITS correctos
- Abrir el componente Calendar de UBITS (no el calendario nativo del sistema)
- Tener estilos que coincidan exactamente con el Storybook

## 🔍 Causa Raíz

### **1. No Verificar el Tipo Correcto en el Storybook**

**Problema:**
- Se asumió que `type: 'date'` era correcto porque es un input de fecha
- No se verificó en el Storybook qué tipo usa realmente el componente Input para fechas
- No se consultó la documentación del componente Input

**Causa:**
- Falta de verificación sistemática del Storybook antes de implementar
- Asumir que el tipo HTML5 nativo (`date`) es el correcto
- No consultar el código fuente del componente Input

### **2. No Entender la Diferencia Entre Tipos**

**Problema:**
- `type: 'date'` → Input HTML5 nativo que muestra calendario genérico del sistema
- `type: 'calendar'` → Input con componente Calendar de UBITS que muestra calendario personalizado

**Diferencia clave:**
```typescript
// ❌ INCORRECTO: type: 'date'
// - Usa <input type="date"> nativo
// - Muestra calendario genérico del sistema operativo
// - No tiene icono personalizado con tokens UBITS
// - No coincide con el Storybook

// ✅ CORRECTO: type: 'calendar'
// - Usa <input type="text" readonly> con componente Calendar de UBITS
// - Muestra calendario personalizado de UBITS
// - Tiene icono 'fa-calendar' con tokens UBITS correctos
// - Coincide exactamente con el Storybook
```

### **3. No Consultar el Código del Componente Input**

**Problema:**
- No se revisó `InputProvider.ts` para ver cómo se implementa el tipo `calendar`
- No se verificó qué hace `createCalendarPicker()` cuando el tipo es `calendar`
- No se revisó qué icono y tokens se usan para el tipo `calendar`

**Código relevante en InputProvider.ts:**
```typescript
} else if (type === 'calendar') {
  // CALENDAR - input con date picker
  // Agregar rightIcon de calendario solo si no hay rightIcon personalizado
  if (!hasRightIcon) {
    finalRightIcon = 'fa-calendar'; // ✅ Icono con token correcto
    finalHasRightIcon = true;
    // ... padding correcto para el icono
  }
  // Input type="text" readonly (NO type="date")
  inputHTML += `<input type="text" ... readonly>`;
}

// Luego en createInput():
if (type === 'calendar') {
  createCalendarPicker(container, inputElement, onChange); // ✅ Usa Calendar de UBITS
}
```

## ✅ Solución

### **Paso 1: Verificar el Tipo Correcto en el Storybook**

**ANTES de implementar, SIEMPRE:**
1. ✅ Abrir el Storybook del componente Input
2. ✅ Verificar qué tipo usa para inputs de fecha
3. ✅ Revisar los controles y ejemplos
4. ✅ Verificar qué icono y tokens se usan

### **Paso 2: Usar el Tipo Correcto**

**Cambiar de `type: 'date'` a `type: 'calendar'`:**

```javascript
// ❌ INCORRECTO
{
  id: 'filtro-inicio',
  label: 'Fecha de inicio',
  columnId: 'inicio',
  type: 'date' // ❌ Usa calendario nativo del sistema
}

// ✅ CORRECTO
{
  id: 'filtro-inicio',
  label: 'Fecha de inicio',
  columnId: 'inicio',
  type: 'calendar' // ✅ Usa calendario UBITS con icono correcto
}
```

### **Paso 3: Actualizar el DataTable para Soportar 'calendar'**

**Agregar soporte para `type: 'calendar'` en el DataTable:**

```typescript
// En DataTableOptions.ts
type: 'text' | 'select' | 'date' | 'number' | 'calendar'; // ✅ Agregar 'calendar'

// En DataTableProvider.ts
switch (filter.type) {
  case 'text':
  case 'number':
  case 'date':
  case 'calendar': // ✅ Agregar caso para 'calendar'
    inputHTML = renderInput({
      containerId: containerId,
      label: filter.label,
      type: filter.type, // ✅ Pasar 'calendar' directamente
      value: currentValue,
      placeholder: `Filtrar por ${filter.label.toLowerCase()}...`,
      size: 'md',
    });
    break;
}
```

## 🔑 Puntos Clave

1. **Verificar siempre el Storybook**: Antes de implementar, verificar qué tipo/opciones usa el componente en el Storybook
2. **Consultar el código fuente**: Revisar el código del componente para entender cómo funciona
3. **No asumir tipos HTML5 nativos**: Los componentes UBITS pueden usar tipos personalizados
4. **Diferencia entre tipos**: `date` es nativo, `calendar` es componente UBITS

## 📝 Regla de Oro

**SIEMPRE que implementes inputs de fecha:**
1. ✅ Verificar en el Storybook qué tipo usa el componente Input para fechas
2. ✅ Usar `type: 'calendar'` (no `type: 'date'`)
3. ✅ Verificar que el icono tenga el token correcto (`fa-calendar`)
4. ✅ Verificar que el calendario sea el componente Calendar de UBITS (no nativo)
5. ✅ Comparar con el Storybook para asegurar que coincida

## 🔗 Referencias

- **Código del Input:** `vendor/ubits/packages/components/input/src/InputProvider.ts`
- **Tipo Calendar:** Líneas 273-296 (renderInput) y 955-1085 (createCalendarPicker)
- **Estilos del Input:** `vendor/ubits/packages/components/input/src/styles/input.css`
- **Componente Calendar:** `vendor/ubits/packages/components/calendar/src/CalendarProvider.ts`

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0












