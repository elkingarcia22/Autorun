# 📦 Checkbox

> **Componente UBITS:** `formularios-checkbox`  
> **Categoría:** Formularios  
> **API:** `window.createCheckbox()` o `<ubits-checkbox>`  
> **Storybook Local:** http://localhost:6006/?path=/story/formularios-checkbox--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-checkbox--default

## 🎯 Descripción

Componente Checkbox UBITS para selección múltiple. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.

**Características principales:**
- 2 tamaños: sm (16px), md (20px)
- 5 estados: default, hover, active, disabled, indeterminate
- Label y texto complementario opcionales
- Estado indeterminado (para "seleccionar todo")
- Soporte para agrupación con `name`
- Callback `onChange` para manejar cambios

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/formularios-checkbox--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-checkbox--default
- **Código fuente:** `vendor/ubits/packages/components/checkbox/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/checkbox/src/types/CheckboxOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Checkbox.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `formularios-checkbox--default`  
**URL Local:** http://localhost:6006/?path=/story/formularios-checkbox--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-checkbox--default

**Descripción:**
Checkbox con todos los controles disponibles. Permite configurar label, texto complementario, tamaño, estado, checked, indeterminate y disabled.

**Características mostradas:**
- Label configurable
- Texto complementario opcional
- Tamaño configurable (sm, md)
- Estado configurable (default, hover, active, disabled, indeterminate)
- Checked configurable
- Indeterminate configurable
- Disabled configurable

**Código de ejemplo:**
```javascript
window.createCheckbox({
  containerId: 'checkbox-container',
  label: 'Label',
  complementaryText: undefined,
  value: 'checkbox-value',
  name: 'checkbox-group',
  checked: false,
  indeterminate: false,
  size: 'md',
  state: 'default',
  disabled: false,
  onChange: (event) => {
    console.log('Checkbox cambiado:', event.target.checked);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `label`: `'Label'` - Texto del label
- `size`: `'md'` - Tamaño mediano
- `state`: `'default'` - Estado por defecto
- `checked`: `false` - No seleccionado
- `indeterminate`: `false` - No indeterminado
- `disabled`: `false` - No deshabilitado

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el checkbox |
| `label` | `string` | `'Label'` | Texto del label del checkbox |
| `complementaryText` | `string` | - | Texto complementario opcional (se muestra debajo del label) |
| `value` | `string` | - | Valor del checkbox (para formularios) |
| `name` | `string` | - | Nombre del checkbox (para agrupar checkboxes) |
| `checked` | `boolean` | `false` | Si el checkbox está seleccionado |
| `indeterminate` | `boolean` | `false` | Si el checkbox está en estado indeterminado (muestra línea horizontal en vez de check) |
| `size` | `string` | `'md'` | Tamaño del checkbox. Opciones: `sm` (16px), `md` (20px) |
| `state` | `string` | `'default'` | Estado del checkbox. Opciones: `default`, `hover`, `active`, `disabled`, `indeterminate` |
| `disabled` | `boolean` | `false` | Si el checkbox está deshabilitado |
| `onChange` | `function` | - | Función a ejecutar cuando cambia el estado del checkbox |
| `className` | `string` | `''` | Clases CSS adicionales |

---

## 🎨 Tamaños y Estados

### Tamaños

- **`sm`**: Pequeño (16px)
- **`md`**: Mediano (20px) - default

### Estados

- **`default`**: Estado normal
- **`hover`**: Estado hover (cursor sobre el checkbox)
- **`active`**: Estado activo (click presionado)
- **`disabled`**: Estado deshabilitado (no interactivo)
- **`indeterminate`**: Estado indeterminado (línea horizontal, útil para "seleccionar todo")

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Checkbox Básico

```javascript
window.createCheckbox({
  containerId: 'checkbox-container',
  label: 'Acepto los términos y condiciones',
  checked: false,
  onChange: (event) => {
    console.log('Checkbox:', event.target.checked);
  }
});
```

### Ejemplo 2: Checkbox con Texto Complementario

```javascript
window.createCheckbox({
  containerId: 'checkbox-container',
  label: 'Recibir notificaciones por email',
  complementaryText: 'Te enviaremos actualizaciones importantes',
  checked: false,
  onChange: (event) => {
    updateNotificationPreference(event.target.checked);
  }
});
```

### Ejemplo 3: Checkbox Pequeño

```javascript
window.createCheckbox({
  containerId: 'checkbox-container',
  label: 'Opción',
  size: 'sm',
  checked: false
});
```

### Ejemplo 4: Checkbox Deshabilitado

```javascript
window.createCheckbox({
  containerId: 'checkbox-container',
  label: 'Opción no disponible',
  checked: false,
  disabled: true,
  state: 'disabled'
});
```

### Ejemplo 5: Checkbox Indeterminado (Seleccionar Todo)

```javascript
window.createCheckbox({
  containerId: 'checkbox-container',
  label: 'Seleccionar todos',
  checked: false,
  indeterminate: true,
  onChange: (event) => {
    // Seleccionar/deseleccionar todos los checkboxes
    const allCheckboxes = document.querySelectorAll('[name="items"]');
    allCheckboxes.forEach(cb => {
      cb.checked = event.target.checked;
    });
  }
});
```

### Ejemplo 6: Grupo de Checkboxes

```javascript
const options = ['Opción 1', 'Opción 2', 'Opción 3'];

options.forEach((option, index) => {
  window.createCheckbox({
    containerId: `checkbox-container-${index}`,
    label: option,
    name: 'options-group',
    value: `option-${index}`,
    checked: false,
    onChange: (event) => {
      console.log(`${option}:`, event.target.checked);
      updateSelectedOptions();
    }
  });
});
```

### Ejemplo 7: Checkbox Pre-seleccionado

```javascript
window.createCheckbox({
  containerId: 'checkbox-container',
  label: 'Suscripción activa',
  checked: true, // Pre-seleccionado
  onChange: (event) => {
    if (!event.target.checked) {
      // Mostrar confirmación si se deselecciona
      if (confirm('¿Deseas cancelar la suscripción?')) {
        cancelSubscription();
      } else {
        event.target.checked = true; // Mantener seleccionado
      }
    }
  }
});
```

### Ejemplo 8: Checkbox con Estado Hover

```javascript
window.createCheckbox({
  containerId: 'checkbox-container',
  label: 'Opción interactiva',
  state: 'hover', // Para demostración (normalmente se aplica automáticamente)
  checked: false
});
```

---

## 🔄 Callbacks y Eventos

### onChange

Se ejecuta cuando el estado del checkbox cambia (checked/unchecked).

```javascript
onChange: (event) => {
  const checkbox = event.target;
  console.log('Checkbox:', checkbox.checked);
  console.log('Valor:', checkbox.value);
  console.log('Nombre:', checkbox.name);
  
  // Actualizar estado
  updateFormState(checkbox.name, checkbox.checked);
  
  // Validar formulario
  validateForm();
}
```

**Parámetros:**
- `event` (Event): Evento nativo del input checkbox
  - `event.target.checked` (boolean): Estado del checkbox
  - `event.target.value` (string): Valor del checkbox
  - `event.target.name` (string): Nombre del checkbox

---

## 🎨 Estados Visuales

### Estado Indeterminado

El estado `indeterminate` muestra una línea horizontal en lugar de un check. Útil para:
- "Seleccionar todo" cuando algunos items están seleccionados
- Estados parciales
- Indicar que hay una selección mixta

**Implementación:**
```javascript
// Para usar indeterminate, debes establecerlo en el input nativo
const checkbox = document.querySelector('.ubits-checkbox__input');
if (checkbox) {
  checkbox.indeterminate = true;
}
```

---

## 🚨 Errores Comunes

### Error 1: Confundir `indeterminate` con `checked`
**Problema:** Usar `checked: true` esperando estado indeterminado  
**Solución:** Usar `indeterminate: true` para estado indeterminado

```javascript
// ❌ Incorrecto
checked: true,  // Esto muestra un check, no una línea
indeterminate: false

// ✅ Correcto
checked: false,
indeterminate: true  // Muestra línea horizontal
```

### Error 2: No Agrupar Checkboxes con `name`
**Problema:** Crear múltiples checkboxes sin agruparlos  
**Solución:** Usar el mismo `name` para agrupar checkboxes relacionados

```javascript
// ❌ Incorrecto - no agrupados
window.createCheckbox({ label: 'Opción 1' });
window.createCheckbox({ label: 'Opción 2' });

// ✅ Correcto - agrupados
window.createCheckbox({ label: 'Opción 1', name: 'options' });
window.createCheckbox({ label: 'Opción 2', name: 'options' });
```

### Error 3: No Manejar Cambios de Estado
**Problema:** No implementar `onChange` para actualizar estado  
**Solución:** Siempre implementar el callback para manejar cambios

```javascript
// ❌ Incorrecto - no maneja cambios
window.createCheckbox({
  label: 'Opción',
  checked: false
  // Falta onChange
});

// ✅ Correcto - maneja cambios
window.createCheckbox({
  label: 'Opción',
  checked: false,
  onChange: (event) => {
    updateState(event.target.checked);
  }
});
```

### Error 4: Usar `state` en lugar de `disabled`
**Problema:** Usar `state: 'disabled'` sin `disabled: true`  
**Solución:** Siempre usar `disabled: true` para deshabilitar el checkbox

```javascript
// ❌ Incorrecto
state: 'disabled',
disabled: false  // Aún es clickeable

// ✅ Correcto
state: 'disabled',
disabled: true  // No es clickeable
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
