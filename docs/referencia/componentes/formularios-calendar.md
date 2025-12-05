# 📦 Calendar

> **Componente UBITS:** `formularios-calendar`  
> **Categoría:** Formularios  
> **API:** `window.createCalendar()` o `<ubits-calendar>`  
> **Storybook Local:** http://localhost:6006/?path=/story/formularios-calendar--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-calendar--default

## 🎯 Descripción

Componente Calendar UBITS con selección única y por rango de fechas. Usa tokens UBITS, componentes Button, Input y List para una experiencia consistente.

**Características principales:**
- 2 modos: single (fecha única) y range (rango de fechas)
- Navegación por meses y años
- Fechas mínimas y máximas configurables
- Fecha inicial configurable
- Callbacks para selección de fecha y rango
- Estilo consistente con tokens UBITS

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/formularios-calendar--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-calendar--default
- **Código fuente:** `vendor/ubits/packages/components/calendar/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/calendar/src/index.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Calendar.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `formularios-calendar--default`  
**URL Local:** http://localhost:6006/?path=/story/formularios-calendar--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-calendar--default

**Descripción:**
Calendar con todos los controles disponibles. Permite configurar modo, fechas seleccionadas, fechas mínimas/máximas y fecha inicial.

**Características mostradas:**
- Modo configurable (single, range)
- Fecha seleccionada configurable
- Fecha de fin configurable (modo range)
- Fechas mínimas y máximas configurables
- Fecha inicial configurable

**Código de ejemplo:**
```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'single',
  selectedDate: new Date(),
  minDate: null,
  maxDate: null,
  initialDate: new Date(),
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
    handleDateSelection(date);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `mode`: `'single'` - Modo fecha única
- `selectedDate`: `null` - Sin fecha seleccionada inicialmente
- `initialDate`: `new Date()` - Fecha actual como inicial

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el calendario |
| `mode` | `string` | `'single'` | Modo de selección. Opciones: `single` (fecha única), `range` (rango de fechas) |
| `selectedDate` | `Date \| null` | `null` | Fecha seleccionada (modo single) o fecha de inicio (modo range) |
| `endDate` | `Date \| null` | `null` | Fecha de fin (solo para modo range) |
| `minDate` | `Date \| null` | `null` | Fecha mínima permitida |
| `maxDate` | `Date \| null` | `null` | Fecha máxima permitida |
| `initialDate` | `Date` | `new Date()` | Fecha inicial a mostrar (por defecto: fecha actual) |
| `onDateSelect` | `function` | - | Callback que se ejecuta cuando se selecciona una fecha (modo single) |
| `onRangeSelect` | `function` | - | Callback que se ejecuta cuando se selecciona un rango (modo range) |
| `className` | `string` | `''` | Clase CSS adicional para el contenedor |
| `style` | `string` | `''` | Estilos inline adicionales |

---

## 🎨 Modos

### Modo Single

Selección de una fecha única.

```javascript
mode: 'single',
onDateSelect: (date) => {
  console.log('Fecha seleccionada:', date);
}
```

### Modo Range

Selección de un rango de fechas (fecha de inicio y fecha de fin).

```javascript
mode: 'range',
onRangeSelect: (startDate, endDate) => {
  console.log('Rango seleccionado:', startDate, 'a', endDate);
}
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Calendar Básico

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'single',
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
  }
});
```

### Ejemplo 2: Calendar con Fecha Seleccionada

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'single',
  selectedDate: new Date(2024, 0, 15), // 15 de enero de 2024
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
  }
});
```

### Ejemplo 3: Calendar con Rango

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'range',
  selectedDate: new Date(2024, 0, 1),
  endDate: new Date(2024, 0, 31),
  onRangeSelect: (startDate, endDate) => {
    console.log('Rango seleccionado:', startDate, 'a', endDate);
  }
});
```

### Ejemplo 4: Calendar con Fecha Mínima

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'single',
  minDate: new Date(), // No permitir fechas pasadas
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
  }
});
```

### Ejemplo 5: Calendar con Fecha Máxima

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'single',
  maxDate: new Date(2024, 11, 31), // Hasta el 31 de diciembre de 2024
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
  }
});
```

### Ejemplo 6: Calendar con Rango de Fechas Permitidas

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'single',
  minDate: new Date(2024, 0, 1), // Desde 1 de enero de 2024
  maxDate: new Date(2024, 11, 31), // Hasta 31 de diciembre de 2024
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
  }
});
```

### Ejemplo 7: Calendar con Fecha Inicial

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'single',
  initialDate: new Date(2024, 5, 1), // Mostrar junio de 2024 inicialmente
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
  }
});
```

### Ejemplo 8: Calendar Completo

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'single',
  selectedDate: new Date(2024, 0, 15),
  minDate: new Date(2024, 0, 1),
  maxDate: new Date(2024, 11, 31),
  initialDate: new Date(2024, 0, 1),
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
    updateSelectedDate(date);
  },
  className: 'custom-calendar',
  style: 'max-width: 400px;'
});
```

### Ejemplo 9: Calendar con Rango Completo

```javascript
window.createCalendar({
  containerId: 'calendar-container',
  mode: 'range',
  selectedDate: new Date(2024, 0, 1),
  endDate: new Date(2024, 0, 31),
  minDate: new Date(2024, 0, 1),
  maxDate: new Date(2024, 11, 31),
  initialDate: new Date(2024, 0, 1),
  onRangeSelect: (startDate, endDate) => {
    console.log('Rango seleccionado:', startDate, 'a', endDate);
    updateDateRange(startDate, endDate);
  }
});
```

### Ejemplo 10: Calendar Dinámico

```javascript
let selectedDate = null;

function updateCalendar() {
  window.createCalendar({
    containerId: 'calendar-container',
    mode: 'single',
    selectedDate: selectedDate,
    minDate: new Date(), // Solo fechas futuras
    onDateSelect: (date) => {
      selectedDate = date;
      console.log('Fecha seleccionada:', date);
      updateCalendar(); // Actualizar calendario
    }
  });
}

// Inicializar
updateCalendar();
```

---

## 🔄 Callbacks y Eventos

### onDateSelect

Se ejecuta cuando se selecciona una fecha (modo single).

```javascript
onDateSelect: (date) => {
  console.log('Fecha seleccionada:', date);
  // Actualizar estado
  updateSelectedDate(date);
  
  // Guardar en base de datos
  saveDate(date);
  
  // Mostrar feedback
  showToast('Fecha seleccionada');
}
```

**Parámetros:**
- `date` (Date): Fecha seleccionada

### onRangeSelect

Se ejecuta cuando se selecciona un rango de fechas (modo range).

```javascript
onRangeSelect: (startDate, endDate) => {
  console.log('Rango seleccionado:', startDate, 'a', endDate);
  // Actualizar estado
  updateDateRange(startDate, endDate);
  
  // Calcular días
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  console.log('Días seleccionados:', days);
  
  // Guardar en base de datos
  saveDateRange(startDate, endDate);
}
```

**Parámetros:**
- `startDate` (Date): Fecha de inicio del rango
- `endDate` (Date): Fecha de fin del rango

---

## 🎨 Características Visuales

### Navegación

- Botones para navegar entre meses
- Botones para navegar entre años
- Vista de mes actual destacada

### Selección

- **Modo Single:** Una fecha seleccionada destacada
- **Modo Range:** Rango de fechas destacado con inicio y fin
- Fechas deshabilitadas (fuera de minDate/maxDate) con estilo diferente

### Días de la Semana

- Encabezados con nombres de días
- Estilo según tokens UBITS

### Fechas

- Fecha actual destacada
- Fechas seleccionadas destacadas
- Fechas deshabilitadas con opacidad reducida

---

## 🚨 Errores Comunes

### Error 1: endDate sin mode range
**Problema:** Proporcionar `endDate` en modo `single`  
**Solución:** Usar `endDate` solo en modo `range`

```javascript
// ❌ Incorrecto - endDate en modo single
mode: 'single',
endDate: new Date()

// ✅ Correcto - endDate solo en modo range
mode: 'range',
selectedDate: new Date(2024, 0, 1),
endDate: new Date(2024, 0, 31)
```

### Error 2: maxDate Menor que minDate
**Problema:** `maxDate` menor que `minDate`  
**Solución:** Asegurar que `maxDate` sea mayor o igual que `minDate`

```javascript
// ❌ Incorrecto - maxDate menor que minDate
minDate: new Date(2024, 11, 31),
maxDate: new Date(2024, 0, 1)

// ✅ Correcto - maxDate mayor que minDate
minDate: new Date(2024, 0, 1),
maxDate: new Date(2024, 11, 31)
```

### Error 3: selectedDate Fuera de Rango
**Problema:** `selectedDate` fuera del rango permitido  
**Solución:** Asegurar que `selectedDate` esté dentro de minDate/maxDate

```javascript
// ❌ Incorrecto - selectedDate fuera de rango
minDate: new Date(2024, 0, 1),
maxDate: new Date(2024, 11, 31),
selectedDate: new Date(2023, 11, 31) // Fuera de rango

// ✅ Correcto - selectedDate dentro de rango
minDate: new Date(2024, 0, 1),
maxDate: new Date(2024, 11, 31),
selectedDate: new Date(2024, 5, 15) // Dentro de rango
```

### Error 4: onRangeSelect sin mode range
**Problema:** Proporcionar `onRangeSelect` en modo `single`  
**Solución:** Usar `onRangeSelect` solo en modo `range`

```javascript
// ❌ Incorrecto - onRangeSelect en modo single
mode: 'single',
onRangeSelect: (start, end) => {}

// ✅ Correcto - onRangeSelect solo en modo range
mode: 'range',
onRangeSelect: (start, end) => {}
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

