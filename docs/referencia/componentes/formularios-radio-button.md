# 📦 Radio Button

> **Componente UBITS:** `formularios-radio-button`  
> **Categoría:** Formularios  
> **API:** `window.createRadioButton()` o `<ubits-radio-button>`  
> **Storybook Local:** http://localhost:6006/?path=/story/formularios-radio-button--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-radio-button--default

## 🎯 Descripción

Componente Radio Button UBITS para selección única en grupos. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.

**Características principales:**
- 2 tamaños: sm (16px), md (20px)
- 4 estados: default, hover, active, disabled
- Label y texto complementario opcionales
- Agrupación con `name` para selección única
- Callback `onChange` para manejar cambios
- Selección única automática en grupos

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/formularios-radio-button--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-radio-button--default
- **Código fuente:** `vendor/ubits/packages/components/radio-button/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/radio-button/src/types/RadioButtonOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/RadioButton.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `formularios-radio-button--default`  
**URL Local:** http://localhost:6006/?path=/story/formularios-radio-button--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-radio-button--default

**Descripción:**
Radio Button con todos los controles disponibles. Permite configurar label, texto complementario, tamaño, estado, checked y disabled.

**Características mostradas:**
- Label configurable
- Texto complementario opcional
- Tamaño configurable (sm, md)
- Estado configurable (default, hover, active, disabled)
- Checked configurable
- Disabled configurable
- Agrupación con `name`

**Código de ejemplo:**
```javascript
window.createRadioButton({
  containerId: 'radio-container',
  label: 'Label',
  complementaryText: undefined,
  value: 'option1',
  name: 'group',
  checked: false,
  size: 'md',
  state: 'default',
  disabled: false,
  onChange: (event) => {
    console.log('Radio cambiado:', event.target.value);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `label`: `'Label'` - Texto del label
- `value`: `'option1'` - Valor del radio
- `name`: `'group'` - Nombre del grupo
- `size`: `'md'` - Tamaño mediano
- `state`: `'default'` - Estado por defecto
- `checked`: `false` - No seleccionado
- `disabled`: `false` - No deshabilitado

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el radio button |
| `label` | `string` | `'Label'` | Texto del label del radio button |
| `complementaryText` | `string` | - | Texto complementario opcional (se muestra debajo del label) |
| `value` | `string` | `'option1'` | Valor del radio button (para agrupar radio buttons) |
| `name` | `string` | `'group'` | Nombre del grupo de radio buttons (para agrupar) |
| `checked` | `boolean` | `false` | Si el radio button está seleccionado |
| `size` | `string` | `'md'` | Tamaño del radio button. Opciones: `sm` (16px), `md` (20px) |
| `state` | `string` | `'default'` | Estado del radio button. Opciones: `default`, `hover`, `active`, `disabled` |
| `disabled` | `boolean` | `false` | Si el radio button está deshabilitado |
| `onChange` | `function` | - | Función a ejecutar cuando cambia el estado del radio button |
| `className` | `string` | `''` | Clases CSS adicionales |

---

## 🎨 Tamaños y Estados

### Tamaños

- **`sm`**: Pequeño (16px)
- **`md`**: Mediano (20px) - default

### Estados

- **`default`**: Estado normal
- **`hover`**: Estado hover (cursor sobre el radio)
- **`active`**: Estado activo (click presionado)
- **`disabled`**: Estado deshabilitado (no interactivo)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Radio Button Básico

```javascript
window.createRadioButton({
  containerId: 'radio-container',
  label: 'Opción 1',
  value: 'option1',
  name: 'options',
  checked: false,
  onChange: (event) => {
    console.log('Seleccionado:', event.target.value);
  }
});
```

### Ejemplo 2: Grupo de Radio Buttons

```javascript
const options = [
  { label: 'Opción 1', value: 'opt1' },
  { label: 'Opción 2', value: 'opt2' },
  { label: 'Opción 3', value: 'opt3' }
];

options.forEach((option, index) => {
  window.createRadioButton({
    containerId: `radio-container-${index}`,
    label: option.label,
    value: option.value,
    name: 'options-group', // Mismo name para agrupar
    checked: index === 0, // Primera opción seleccionada
    onChange: (event) => {
      console.log('Opción seleccionada:', event.target.value);
      updateSelection(event.target.value);
    }
  });
});
```

### Ejemplo 3: Radio Button con Texto Complementario

```javascript
window.createRadioButton({
  containerId: 'radio-container',
  label: 'Plan Básico',
  complementaryText: 'Ideal para usuarios individuales',
  value: 'basic',
  name: 'plan',
  checked: false
});
```

### Ejemplo 4: Radio Button Pre-seleccionado

```javascript
window.createRadioButton({
  containerId: 'radio-container',
  label: 'Opción por defecto',
  value: 'default',
  name: 'options',
  checked: true, // Pre-seleccionado
  onChange: (event) => {
    console.log('Opción:', event.target.value);
  }
});
```

### Ejemplo 5: Radio Button Deshabilitado

```javascript
window.createRadioButton({
  containerId: 'radio-container',
  label: 'Opción no disponible',
  value: 'disabled',
  name: 'options',
  checked: false,
  disabled: true,
  state: 'disabled'
});
```

### Ejemplo 6: Radio Button Pequeño

```javascript
window.createRadioButton({
  containerId: 'radio-container',
  label: 'Opción compacta',
  value: 'compact',
  name: 'options',
  size: 'sm', // Tamaño pequeño
  checked: false
});
```

### Ejemplo 7: Grupo con Validación

```javascript
let selectedValue = null;

const options = ['Opción A', 'Opción B', 'Opción C'];
options.forEach((label, index) => {
  window.createRadioButton({
    containerId: `radio-${index}`,
    label: label,
    value: `option-${index}`,
    name: 'validated-group',
    checked: false,
    onChange: (event) => {
      selectedValue = event.target.value;
      validateSelection();
    }
  });
});

function validateSelection() {
  if (!selectedValue) {
    showError('Por favor selecciona una opción');
  } else {
    clearError();
  }
}
```

---

## 🔄 Callbacks y Eventos

### onChange

Se ejecuta cuando el estado del radio button cambia (selección/deselección).

```javascript
onChange: (event) => {
  const radio = event.target;
  console.log('Radio seleccionado:', radio.value);
  console.log('Nombre del grupo:', radio.name);
  console.log('Está seleccionado:', radio.checked);
  
  // Actualizar estado
  updateFormState(radio.name, radio.value);
  
  // Validar formulario
  validateForm();
}
```

**Parámetros:**
- `event` (Event): Evento nativo del input radio
  - `event.target.value` (string): Valor del radio seleccionado
  - `event.target.name` (string): Nombre del grupo
  - `event.target.checked` (boolean): Estado del radio

---

## 🎨 Características Visuales

### Selección Única

Los radio buttons con el mismo `name` forman un grupo donde solo uno puede estar seleccionado a la vez. Al seleccionar uno, los demás se deseleccionan automáticamente.

### Estados Visuales

- **Seleccionado:** Círculo relleno con punto central
- **No seleccionado:** Círculo vacío
- **Hover:** Efecto visual al pasar el cursor
- **Disabled:** Opacidad reducida, no interactivo

---

## 🚨 Errores Comunes

### Error 1: No Agrupar Radio Buttons con `name`
**Problema:** Crear múltiples radio buttons sin agruparlos  
**Solución:** Usar el mismo `name` para agrupar radio buttons relacionados

```javascript
// ❌ Incorrecto - no agrupados, permite selección múltiple
window.createRadioButton({ label: 'Opción 1' });
window.createRadioButton({ label: 'Opción 2' });

// ✅ Correcto - agrupados, solo uno seleccionable
window.createRadioButton({ label: 'Opción 1', name: 'options' });
window.createRadioButton({ label: 'Opción 2', name: 'options' });
```

### Error 2: Múltiples Radio Buttons Seleccionados en el Mismo Grupo
**Problema:** Marcar múltiples radio buttons como `checked: true` en el mismo grupo  
**Solución:** Solo un radio button por grupo debe tener `checked: true`

```javascript
// ❌ Incorrecto - múltiples seleccionados
window.createRadioButton({ name: 'group', value: 'opt1', checked: true });
window.createRadioButton({ name: 'group', value: 'opt2', checked: true });

// ✅ Correcto - solo uno seleccionado
window.createRadioButton({ name: 'group', value: 'opt1', checked: true });
window.createRadioButton({ name: 'group', value: 'opt2', checked: false });
```

### Error 3: No Manejar Cambios de Selección
**Problema:** No implementar `onChange` para actualizar estado  
**Solución:** Siempre implementar el callback para manejar cambios

```javascript
// ❌ Incorrecto - no maneja cambios
window.createRadioButton({
  label: 'Opción',
  name: 'group',
  value: 'opt1'
  // Falta onChange
});

// ✅ Correcto - maneja cambios
window.createRadioButton({
  label: 'Opción',
  name: 'group',
  value: 'opt1',
  onChange: (event) => {
    updateSelection(event.target.value);
  }
});
```

### Error 4: Usar `state` en lugar de `disabled`
**Problema:** Usar `state: 'disabled'` sin `disabled: true`  
**Solución:** Siempre usar `disabled: true` para deshabilitar el radio

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

