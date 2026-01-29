# 🔍 Análisis: Error - Input Calendar en Drawer de Filtros Usa Input Genérico en lugar de Componente Calendar UBITS

## ⚠️ NOTA IMPORTANTE

**Este análisis documenta errores que YA NO DEBEN OCURRIR** porque el DataTableProvider implementa correctamente los inputs calendar automáticamente.

**✅ IMPLEMENTACIÓN CORRECTA:** Ver `docs/guias/implementacion/GUIA-IMPLEMENTACION-FILTROS-DATATABLE-CORRECTA.md`

**⚠️ CRÍTICO:** NO implementar inputs calendar manualmente - el DataTableProvider ya los implementa correctamente usando `createCalendar` de UBITS.

---

## ❌ PROBLEMA IDENTIFICADO (HISTÓRICO)

Al implementar filtros de tipo `calendar` en el drawer de filtros del DataTable manualmente, se presentaban múltiples problemas:

### **Problema 1: Generación Automática de Filtros con Tipo Incorrecto**
- Las columnas de tipo `fecha` generan filtros con `type: 'date'` en lugar de `type: 'calendar'`
- Esto causa que se use `createInput` en lugar de `createCalendar`

### **Problema 2: Usar createInput en lugar de createCalendar**
- Se está usando `createInput` con `type: 'calendar'` en lugar de usar el **componente Calendar de UBITS** (`createCalendar`)
- Causa:
  1. **Icono incorrecto:** El input muestra un icono de token genérico en lugar del icono correcto del componente Calendar
  2. **Calendario genérico:** Se despliega un calendario nativo del sistema en lugar del componente Calendar de UBITS
  3. **Inconsistencia visual:** El calendario no usa los tokens UBITS ni el diseño del componente Calendar
  4. **Funcionalidad limitada:** No se aprovechan las características del componente Calendar (modo single/range, estilos UBITS, etc.)

### **Problema 3: Posicionamiento Incorrecto del Calendario**
- El calendario se agrega dentro del drawer con `position: absolute` y `z-index: 1000`
- **Síntomas:**
  - El input se ve como una "caja" mal formada
  - El calendario no se muestra correctamente o queda oculto detrás del drawer
  - Problemas de z-index que impiden ver el calendario
  - El calendario se corta o no se posiciona correctamente

### **Problema 4: Estructura del Input Incorrecta**
- El input no tiene la estructura completa de UBITS Input
- Falta el wrapper correcto y los estilos necesarios

---

## 🎯 Comportamiento Esperado

**SIEMPRE que se implemente un filtro de tipo `calendar` en el drawer de filtros, DEBE usar el componente Calendar de UBITS:**

- ✅ **Usar `createCalendar`** de UBITS (NO `createInput` con `type: 'calendar'`)
- ✅ **Icono correcto:** El componente Calendar tiene su propio icono con tokens UBITS correctos
- ✅ **Calendario UBITS:** Se despliega el componente Calendar de Storybook, no un calendario genérico
- ✅ **Consistencia visual:** Usa tokens UBITS y diseño consistente con el resto de componentes

---

## 🔍 Causa Raíz del Error

### **1. Usar `createInput` para Tipo Calendar**

**Problema:**
```javascript
// ❌ INCORRECTO: Usar createInput con type: 'calendar'
if (filter.type === 'select' && filter.options) {
  inputOptions.type = 'select';
  // ...
} else {
  inputOptions.type = filter.type; // ❌ Si filter.type es 'calendar', pasa 'calendar' a createInput
}

createInput(inputOptions); // ❌ createInput no maneja correctamente type: 'calendar'
```

**Causa:**
- Se asume que `createInput` maneja todos los tipos, incluyendo `calendar`
- No se verifica que `calendar` requiere un componente diferente (`createCalendar`)
- Se sigue el mismo patrón para todos los tipos de filtros sin excepción

---

### **2. No Verificar Implementación Correcta en Celdas Editables**

**Problema:**
- El DataTable **SÍ implementa correctamente** el Calendar en celdas editables (líneas 5150-5446)
- Usa `createCalendar` de UBITS con importación dinámica
- Carga estilos CSS del calendario
- Maneja listeners y posicionamiento correctamente
- **PERO** no se aplica la misma lógica en el drawer de filtros

**Causa:**
- No se reutiliza la implementación correcta de celdas editables
- Se implementa el drawer de filtros de forma separada sin revisar cómo se hace en celdas editables
- Falta de consistencia en la implementación dentro del mismo componente

---

### **3. No Consultar Storybook para Ver Implementación Correcta**

**Problema:**
- No se consulta el Storybook del Calendar para ver cómo debe implementarse
- No se verifica que el componente Calendar tiene su propia función `createCalendar`
- No se revisa que el Input con tipo calendar es diferente al componente Calendar

**Causa:**
- Asumir que `createInput` maneja todos los tipos
- No verificar la documentación del componente Calendar
- No consultar Storybook antes de implementar

---

### **4. Posicionamiento Incorrecto del Calendario (Dentro del Drawer)**

**Problema:**
```javascript
// ❌ INCORRECTO: Agregar calendario dentro del drawer
const calendarContainer = document.createElement('div');
calendarContainer.style.cssText = `
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000; // ❌ z-index insuficiente para estar sobre el drawer
  display: none;
`;
inputContainer.appendChild(calendarContainer); // ❌ Dentro del drawer
```

**Síntomas:**
- El input se ve como una "caja" mal formada
- El calendario no se muestra o queda oculto detrás del drawer
- Problemas de z-index que impiden ver el calendario
- El calendario se corta o no se posiciona correctamente

**Causa:**
- Agregar el calendario dentro del drawer en lugar de al `document.body`
- Usar `position: absolute` en lugar de `position: fixed`
- z-index insuficiente para estar por encima del drawer
- No usar `getBoundingClientRect()` para calcular la posición correcta

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Agregar calendario al body con position fixed
externalCalendarContainer = document.createElement('div');
const inputRect = inputContainerWrapper.getBoundingClientRect();
externalCalendarContainer.style.cssText = `
  position: fixed; // ✅ fixed en lugar de absolute
  top: ${inputRect.bottom + 4}px; // ✅ Usar getBoundingClientRect()
  left: ${inputRect.left}px;
  z-index: 10000; // ✅ z-index alto para estar sobre el drawer
  display: block;
`;
document.body.appendChild(externalCalendarContainer); // ✅ Al body, no al drawer
```

---

### **5. No Reutilizar la Implementación Correcta de Celdas Editables**

**Problema:**
- El DataTable **SÍ implementa correctamente** el Calendar en celdas editables (líneas 5150-5488)
- Usa `createCalendar` de UBITS con importación dinámica
- Agrega el calendario al `document.body` con `position: fixed` y `z-index: 99999`
- Usa `getBoundingClientRect()` para calcular la posición
- Maneja listeners correctamente (click fuera, Escape, scroll)
- **PERO** no se aplica la misma lógica en el drawer de filtros

**Causa:**
- No se reutiliza la implementación correcta de celdas editables
- Se implementa el drawer de filtros de forma separada sin revisar cómo se hace en celdas editables
- Falta de consistencia en la implementación dentro del mismo componente

---

## ✅ SOLUCIÓN COMPLETA Y CORRECTA

### **PASO 1: Detectar Tipo Calendar y Usar createCalendar**

**⚠️ OBLIGATORIO:** Cuando el tipo de filtro es `calendar`, usar `createCalendar` en lugar de `createInput`:

```javascript
// ✅ CORRECTO: Detectar tipo calendar y usar createCalendar
filters.forEach((filter) => {
  const containerId = `filter-input-${filter.id}`;
  const inputContainer = drawerInstance.element.querySelector(`#${containerId}`) as HTMLElement;
  if (inputContainer) {
    inputContainer.innerHTML = '';
    const currentValue = activeFilters[filter.id] || filter.value || '';

    if (filter.type === 'calendar') {
      // ✅ CORRECTO: Usar createCalendar para tipo calendar
      // Importar dinámicamente el componente Calendar
      import('../../calendar/src/index').then(({ createCalendar }) => {
        // Función para formatear fecha
        const formatDate = (date: Date): string => {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };

        // Función para parsear fecha
        const parseDate = (dateStr: string): Date | null => {
          if (!dateStr) return null;
          const [day, month, year] = dateStr.split('/');
          if (day && month && year) {
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          }
          try {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
              return date;
            }
          } catch (e) {
            // Ignorar error
          }
          return null;
        };

        // Crear input readonly para mostrar la fecha seleccionada
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.readOnly = true;
        inputElement.value = currentValue;
        inputElement.placeholder = `Filtrar por ${filter.label.toLowerCase()}...`;
        inputElement.className = 'ubits-input__input';
        inputElement.style.cursor = 'pointer';

        // Crear contenedor para el input y el calendario
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'ubits-input';
        inputWrapper.style.position = 'relative';

        // Crear label
        const label = document.createElement('label');
        label.className = 'ubits-input__label';
        label.textContent = filter.label;

        // Crear wrapper del input
        const inputContainerWrapper = document.createElement('div');
        inputContainerWrapper.className = 'ubits-input__wrapper';

        // Agregar icono de calendario (usando el icono correcto de UBITS)
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'ubits-input-icon-right';
        iconWrapper.innerHTML = '<i class="far fa-calendar"></i>';

        inputContainerWrapper.appendChild(inputElement);
        inputContainerWrapper.appendChild(iconWrapper);
        inputWrapper.appendChild(label);
        inputWrapper.appendChild(inputContainerWrapper);

        // Variables para mantener la instancia del calendario
        let calendarInstance: ReturnType<typeof createCalendar> | null = null;
        let externalCalendarContainer: HTMLElement | null = null;
        let handleOutsideClick: ((e: MouseEvent) => void) | null = null;
        let handleEscapeKey: ((e: KeyboardEvent) => void) | null = null;

        // Función para cerrar calendario y limpiar listeners
        const closeCalendar = () => {
          if (externalCalendarContainer) {
            externalCalendarContainer.style.display = 'none';
            if (externalCalendarContainer.parentElement) {
              externalCalendarContainer.remove();
            }
            externalCalendarContainer = null;
          }

          // Limpiar listeners
          if (handleOutsideClick) {
            document.removeEventListener('click', handleOutsideClick);
            handleOutsideClick = null;
          }
          if (handleEscapeKey) {
            document.removeEventListener('keydown', handleEscapeKey);
            handleEscapeKey = null;
          }
        };

        // Función para mostrar el calendario
        const showCalendar = async () => {
          // Si el calendario ya está visible, cerrarlo
          if (externalCalendarContainer && externalCalendarContainer.style.display !== 'none') {
            closeCalendar();
            return;
          }

          // Si el calendario ya existe, solo actualizar posición y mostrarlo
          if (calendarInstance && externalCalendarContainer) {
            const inputRect = inputContainerWrapper.getBoundingClientRect();
            externalCalendarContainer.style.top = `${inputRect.bottom + 4}px`;
            externalCalendarContainer.style.left = `${inputRect.left}px`;
            externalCalendarContainer.style.display = 'block';
            return;
          }

          try {
            // Cargar estilos CSS del calendario si no están cargados
            const stylesToLoad = [
              { id: 'ubits-calendar-styles', href: '../../addons/calendar/src/styles/calendar.css' },
              { id: 'ubits-button-styles', href: '../../addons/button/src/styles/button.css' },
              { id: 'ubits-input-styles', href: '../../addons/input/src/styles/input.css' },
              { id: 'ubits-list-styles', href: '../../addons/list/src/styles/list.css' },
            ];

            for (const style of stylesToLoad) {
              if (!document.getElementById(style.id)) {
                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.href = style.href;
                linkElement.id = style.id;
                document.head.appendChild(linkElement);
              }
            }

            // Parsear fecha actual
            const parsedDate = parseDate(currentValue);
            const initialDate = parsedDate || new Date();

            // Crear instancia del calendario UBITS
            calendarInstance = createCalendar({
              mode: 'single',
              selectedDate: parsedDate,
              initialDate: initialDate,
              onDateSelect: (date: Date) => {
                const formattedDate = formatDate(date);
                inputElement.value = formattedDate;
                activeFilters[filter.id] = formattedDate;
                closeCalendar();
                // Actualizar filtros y re-renderizar
                render();
              },
            });

            // ✅ CRÍTICO: Crear contenedor para el calendario (agregar al body para evitar problemas de z-index)
            externalCalendarContainer = document.createElement('div');
            externalCalendarContainer.className = 'ubits-calendar-container';
            const inputRect = inputContainerWrapper.getBoundingClientRect();
            externalCalendarContainer.style.cssText = `
              position: fixed; /* ✅ fixed en lugar de absolute */
              top: ${inputRect.bottom + 4}px; /* ✅ Usar getBoundingClientRect() */
              left: ${inputRect.left}px;
              z-index: 10000; /* ✅ z-index alto para estar sobre el drawer */
              display: block;
              background: var(--modifiers-normal-color-light-bg-1);
              border: 1px solid var(--modifiers-normal-color-light-border-1);
              border-radius: var(--ubits-border-radius-md);
              box-shadow: var(--ubits-shadow-lg);
            `;

            externalCalendarContainer.appendChild(calendarInstance.element);
            document.body.appendChild(externalCalendarContainer); // ✅ Al body, no al drawer

            // Agregar listeners para cerrar el calendario
            handleOutsideClick = (e: MouseEvent) => {
              if (
                externalCalendarContainer &&
                externalCalendarContainer.style.display !== 'none' &&
                !inputWrapper.contains(e.target as Node) &&
                !externalCalendarContainer.contains(e.target as Node)
              ) {
                closeCalendar();
              }
            };

            handleEscapeKey = (e: KeyboardEvent) => {
              if (e.key === 'Escape' && externalCalendarContainer && externalCalendarContainer.style.display !== 'none') {
                closeCalendar();
              }
            };

            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscapeKey);
          } catch (error) {
            console.error('❌ [DATA TABLE FILTERS] Error al mostrar Calendar:', error);
          }
        };

        // Event listeners para mostrar el calendario
        inputElement.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          showCalendar();
        });

        iconWrapper.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          showCalendar();
        });

        // Agregar elementos al contenedor (solo el input, NO el calendario)
        inputContainer.appendChild(inputWrapper);
      });
    } else if (filter.type === 'select' && filter.options) {
      // Implementación para select
      // ...
    } else {
      // Implementación para text, number, date usando createInput
      // ...
    }
  }
});
```

---

### **PASO 2: Cargar Estilos CSS del Calendar**

**⚠️ OBLIGATORIO:** Cargar los estilos CSS necesarios antes de crear el Calendar:

```javascript
// ✅ CORRECTO: Cargar estilos CSS del Calendar
const stylesToLoad = [
  { id: 'ubits-calendar-styles', href: '../../addons/calendar/src/styles/calendar.css' },
  { id: 'ubits-button-styles', href: '../../addons/button/src/styles/button.css' },
  { id: 'ubits-input-styles', href: '../../addons/input/src/styles/input.css' },
  { id: 'ubits-list-styles', href: '../../addons/list/src/styles/list.css' },
];

for (const style of stylesToLoad) {
  if (!document.getElementById(style.id)) {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = style.href;
    linkElement.id = style.id;
    document.head.appendChild(linkElement);
  }
}
```

---

### **PASO 3: Implementar Input Readonly con Icono Correcto**

**⚠️ OBLIGATORIO:** Crear un input readonly que muestre la fecha y tenga el icono correcto:

```javascript
// ✅ CORRECTO: Input readonly con icono de calendario
const inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.readOnly = true;
inputElement.value = currentValue;
inputElement.placeholder = `Filtrar por ${filter.label.toLowerCase()}...`;
inputElement.className = 'ubits-input__input';
inputElement.style.cursor = 'pointer';

// Icono de calendario (usando FontAwesome correcto)
const iconWrapper = document.createElement('div');
iconWrapper.className = 'ubits-input-icon-right';
iconWrapper.innerHTML = '<i class="far fa-calendar"></i>'; // ✅ Icono correcto
```

---

## 📋 PROCESO OBLIGATORIO AL IMPLEMENTAR FILTRO CALENDAR

### **⚠️ CHECKLIST OBLIGATORIO:**

1. **✅ Detectar tipo calendar:**
   - [ ] Verificar si `filter.type === 'calendar'`
   - [ ] NO usar `createInput` con `type: 'calendar'`

2. **✅ Usar componente Calendar:**
   - [ ] Importar `createCalendar` de `'../../calendar/src/index'`
   - [ ] Crear instancia con `createCalendar({ mode: 'single', ... })`
   - [ ] Configurar `onDateSelect` callback

3. **✅ Cargar estilos CSS:**
   - [ ] Cargar `calendar.css`
   - [ ] Cargar `button.css`
   - [ ] Cargar `input.css`
   - [ ] Cargar `list.css`

4. **✅ Implementar input readonly:**
   - [ ] Crear input `type="text"` con `readOnly: true`
   - [ ] Agregar icono `far fa-calendar` (NO usar icono de token genérico)
   - [ ] Agregar event listeners para mostrar calendario

5. **✅ Manejar calendario como dropdown (CRÍTICO - Posicionamiento):**
   - [ ] **AGREGAR AL BODY:** Crear contenedor para el calendario y agregarlo al `document.body` (NO al drawer)
   - [ ] **POSITION FIXED:** Usar `position: fixed` en lugar de `position: absolute`
   - [ ] **Z-INDEX ALTO:** Usar `z-index: 10000` o superior para estar sobre el drawer
   - [ ] **GETBOUNDINGCLIENTRECT:** Usar `getBoundingClientRect()` para calcular la posición correcta
   - [ ] Mostrar/ocultar calendario al hacer click en input o icono
   - [ ] Cerrar calendario al hacer click fuera o presionar Escape
   - [ ] Limpiar listeners correctamente al cerrar
   - [ ] Actualizar filtros cuando se selecciona fecha

---

## 🚨 ERRORES COMUNES A EVITAR

### **❌ ERROR 1: Usar createInput con type: 'calendar'**

**Problema:**
```javascript
// ❌ INCORRECTO: Usar createInput para calendar
inputOptions.type = filter.type; // Si es 'calendar', pasa 'calendar' a createInput
createInput(inputOptions);
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Detectar calendar y usar createCalendar
if (filter.type === 'calendar') {
  // Usar createCalendar
} else {
  // Usar createInput
}
```

---

### **❌ ERROR 2: No Cargar Estilos CSS del Calendar**

**Problema:**
```javascript
// ❌ INCORRECTO: Crear Calendar sin cargar estilos
const calendarInstance = createCalendar({ ... });
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Cargar estilos antes de crear Calendar
await loadCalendarStyles();
const calendarInstance = createCalendar({ ... });
```

---

### **❌ ERROR 3: Usar Icono de Token Genérico**

**Problema:**
```javascript
// ❌ INCORRECTO: Icono de token genérico
iconWrapper.innerHTML = '<i class="token-icon-calendar"></i>';
```

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Icono FontAwesome correcto
iconWrapper.innerHTML = '<i class="far fa-calendar"></i>';
```

---

### **❌ ERROR 4: Posicionamiento Incorrecto del Calendario**

**Problema:**
```javascript
// ❌ INCORRECTO: Agregar calendario dentro del drawer
const calendarContainer = document.createElement('div');
calendarContainer.style.cssText = `
  position: absolute; // ❌ absolute no funciona bien dentro del drawer
  top: 100%;
  left: 0;
  z-index: 1000; // ❌ z-index insuficiente
`;
inputContainer.appendChild(calendarContainer); // ❌ Dentro del drawer
```

**Síntomas:**
- El input se ve como una "caja" mal formada
- El calendario no se muestra o queda oculto detrás del drawer
- Problemas de z-index que impiden ver el calendario

**✅ SOLUCIÓN:**
```javascript
// ✅ CORRECTO: Agregar calendario al body con position fixed
externalCalendarContainer = document.createElement('div');
const inputRect = inputContainerWrapper.getBoundingClientRect();
externalCalendarContainer.style.cssText = `
  position: fixed; // ✅ fixed en lugar de absolute
  top: ${inputRect.bottom + 4}px; // ✅ Usar getBoundingClientRect()
  left: ${inputRect.left}px;
  z-index: 10000; // ✅ z-index alto para estar sobre el drawer
`;
document.body.appendChild(externalCalendarContainer); // ✅ Al body, no al drawer
```

---

### **❌ ERROR 5: No Reutilizar Implementación de Celdas Editables**

**Problema:**
- Implementar el drawer de filtros sin revisar cómo se hace en celdas editables
- No reutilizar la lógica correcta que ya existe
- No usar el mismo patrón de posicionamiento (body + fixed)

**✅ SOLUCIÓN:**
- Revisar la implementación de celdas editables (líneas 5150-5488 en DataTableProvider.ts)
- Reutilizar la misma lógica para el drawer de filtros:
  - Agregar calendario al `document.body`
  - Usar `position: fixed` con `z-index: 10000`
  - Usar `getBoundingClientRect()` para calcular posición
  - Manejar listeners correctamente (click fuera, Escape)
- Mantener consistencia en la implementación

---

## 📝 REGLA DE ORO

**SIEMPRE que implementes un filtro de tipo `calendar`:**

1. ✅ **NO usar `createInput` con `type: 'calendar'`**
   - El tipo `calendar` requiere el componente Calendar de UBITS
   - `createInput` no maneja correctamente el tipo `calendar`

2. ✅ **Usar `createCalendar` de UBITS:**
   - Importar `createCalendar` de `'../../calendar/src/index'`
   - Crear instancia con configuración correcta
   - Configurar callbacks para manejar selección de fecha

3. ✅ **Cargar estilos CSS:**
   - Cargar `calendar.css`, `button.css`, `input.css`, `list.css`
   - Verificar que no estén duplicados antes de cargar

4. ✅ **Implementar input readonly:**
   - Input `type="text"` con `readOnly: true`
   - Icono `far fa-calendar` (NO icono de token genérico)
   - Event listeners para mostrar calendario

5. ✅ **Posicionamiento correcto del calendario (CRÍTICO):**
   - Agregar el calendario al `document.body` (NO dentro del drawer)
   - Usar `position: fixed` con `z-index: 10000` o superior
   - Usar `getBoundingClientRect()` para calcular la posición del input
   - Limpiar el contenedor del calendario al cerrar

6. ✅ **Manejar listeners correctamente:**
   - Agregar listener para click fuera del calendario
   - Agregar listener para tecla Escape
   - Limpiar listeners al cerrar el calendario
   - Evitar memory leaks

7. ✅ **Revisar implementación existente:**
   - Revisar cómo se implementa en celdas editables del DataTable (líneas 5150-5488)
   - Reutilizar la misma lógica y patrones
   - Mantener consistencia en toda la aplicación

---

## 🔗 Referencias

- **Implementación correcta en celdas editables:** `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` (líneas 5150-5446)
- **Componente Calendar:** `vendor/ubits/packages/components/calendar/src/CalendarProvider.ts`
- **Storybook Calendar:** `vendor/ubits/packages/storybook/stories/Calendar.stories.ts`
- **Input Provider (implementación incorrecta):** `vendor/ubits/packages/components/input/src/InputProvider.ts` (líneas 817-926) - Ver cómo NO debe hacerse
- **Errores comunes:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

---

---

## 🔧 PROBLEMAS ENCONTRADOS DURANTE LA IMPLEMENTACIÓN

### **Problema 1: Generación Automática de Filtros con Tipo Incorrecto**

**Síntoma:**
- Los logs mostraban: `🔵 [DATA TABLE FILTERS] Filtro inicio es de tipo date, usando createInput`
- Los filtros de fecha no usaban el componente Calendar

**Causa:**
- En `DataTableProvider.ts` línea ~5924, la generación automática de filtros usaba:
  ```typescript
  } else if (col.type === 'fecha') {
    filterType = 'date'; // ❌ INCORRECTO
  }
  ```

**Solución:**
- Cambiar a `filterType = 'calendar'` para columnas tipo `fecha`
- Ubicación: `vendor/ubits/packages/components/data-table/src/DataTableProvider.ts` línea ~5924

---

### **Problema 2: Input se Veía como "Caja" y Calendario No se Mostraba**

**Síntoma:**
- El input se veía como una "caja" mal formada
- El calendario no se desplegaba al hacer click
- El calendario quedaba oculto detrás del drawer

**Causa:**
- El calendario se agregaba dentro del drawer con `position: absolute` y `z-index: 1000`
- El z-index era insuficiente para estar por encima del drawer
- El posicionamiento relativo al drawer causaba problemas de visualización

**Solución:**
- Agregar el calendario al `document.body` en lugar del drawer
- Usar `position: fixed` con `z-index: 10000`
- Usar `getBoundingClientRect()` para calcular la posición correcta del input
- Implementar función `closeCalendar()` para limpiar listeners y remover el contenedor

---

### **Problema 3: No Limpiar Listeners Correctamente**

**Síntoma:**
- Memory leaks al abrir/cerrar el calendario múltiples veces
- Listeners duplicados causando comportamiento inesperado

**Causa:**
- No se removían los event listeners al cerrar el calendario
- El contenedor del calendario no se removía del DOM

**Solución:**
- Implementar función `closeCalendar()` que:
  - Oculta y remueve el contenedor del calendario
  - Remueve todos los event listeners
  - Limpia las referencias

---

## 📝 LECCIONES APRENDIDAS

1. **Siempre revisar la implementación existente:** El DataTable ya tenía una implementación correcta del Calendar en celdas editables que debía reutilizarse.

2. **Posicionamiento crítico:** Los elementos que deben aparecer sobre otros (como el drawer) deben agregarse al `document.body` con `position: fixed` y z-index alto.

3. **Generación automática:** Verificar que la generación automática de filtros use los tipos correctos (`calendar` en lugar de `date` para columnas `fecha`).

4. **Limpieza de recursos:** Siempre limpiar listeners y remover elementos del DOM al cerrar componentes dinámicos.

---

**Última actualización:** Diciembre 2024  
**Versión:** 2.0.0

