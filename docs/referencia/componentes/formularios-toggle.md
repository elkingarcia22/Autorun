# 📦 Toggle

> **Componente UBITS:** `formularios-toggle`  
> **Categoría:** Formularios  
> **API:** `window.createToggle()` o `<ubits-toggle>`  
> **Storybook Local:** http://localhost:6006/?path=/story/formularios-toggle--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-toggle--default

## 🎯 Descripción

Componente Toggle/Switch UBITS para activar/desactivar opciones. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.

**Características principales:**
- 2 tamaños: sm (33x16px), md (36x20px)
- 4 estados: default, hover, active, disabled
- Label y texto complementario opcionales
- Activación/desactivación con animación
- Callback `onChange` para manejar cambios
- Soporte para agrupación con `name`

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/formularios-toggle--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-toggle--default
- **Código fuente:** `vendor/ubits/packages/components/toggle/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/toggle/src/types/ToggleOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Toggle.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `formularios-toggle--default`  
**URL Local:** http://localhost:6006/?path=/story/formularios-toggle--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-toggle--default

**Descripción:**
Toggle con todos los controles disponibles. Permite configurar label, texto complementario, tamaño, estado, checked y disabled.

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
window.createToggle({
  containerId: 'toggle-container',
  label: 'Label',
  complementaryText: undefined,
  value: '',
  name: '',
  checked: false,
  size: 'md',
  state: 'default',
  disabled: false,
  onChange: (event) => {
    console.log('Toggle cambiado:', event.target.checked);
  }
});
```

**Opciones utilizadas en la historia Default:**
- `label`: `'Label'` - Texto del label
- `size`: `'md'` - Tamaño mediano
- `state`: `'default'` - Estado por defecto
- `checked`: `false` - No activado
- `disabled`: `false` - No deshabilitado

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el toggle |
| `label` | `string` | - | Texto del label del toggle |
| `complementaryText` | `string` | - | Texto complementario opcional (se muestra debajo del label) |
| `value` | `string` | - | Valor del toggle |
| `name` | `string` | - | Nombre del toggle (para agrupar toggles) |
| `checked` | `boolean` | `false` | Si el toggle está activado |
| `size` | `string` | `'md'` | Tamaño del toggle. Opciones: `sm` (33x16px), `md` (36x20px) |
| `state` | `string` | `'default'` | Estado del toggle. Opciones: `default`, `hover`, `active`, `disabled` |
| `disabled` | `boolean` | `false` | Si el toggle está deshabilitado |
| `onChange` | `function` | - | Función a ejecutar cuando cambia el estado del toggle |
| `className` | `string` | `''` | Clases CSS adicionales |

---

## 🎨 Tamaños y Estados

### Tamaños

- **`sm`**: Pequeño (33x16px)
- **`md`**: Mediano (36x20px) - default

### Estados

- **`default`**: Estado normal
- **`hover`**: Estado hover (cursor sobre el toggle)
- **`active`**: Estado activo (click presionado)
- **`disabled`**: Estado deshabilitado (no interactivo)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Toggle Básico

```javascript
window.createToggle({
  containerId: 'toggle-container',
  label: 'Activar notificaciones',
  checked: false,
  onChange: (event) => {
    console.log('Notificaciones:', event.target.checked ? 'activadas' : 'desactivadas');
    updateNotifications(event.target.checked);
  }
});
```

### Ejemplo 2: Toggle con Texto Complementario

```javascript
window.createToggle({
  containerId: 'toggle-container',
  label: 'Modo oscuro',
  complementaryText: 'Cambia el tema de la aplicación',
  checked: false,
  onChange: (event) => {
    toggleDarkMode(event.target.checked);
  }
});
```

### Ejemplo 3: Toggle Pre-activado

```javascript
window.createToggle({
  containerId: 'toggle-container',
  label: 'Auto-guardado',
  checked: true, // Pre-activado
  onChange: (event) => {
    setAutoSave(event.target.checked);
  }
});
```

### Ejemplo 4: Toggle Deshabilitado

```javascript
window.createToggle({
  containerId: 'toggle-container',
  label: 'Función no disponible',
  checked: false,
  disabled: true,
  state: 'disabled'
});
```

### Ejemplo 5: Toggle Pequeño

```javascript
window.createToggle({
  containerId: 'toggle-container',
  label: 'Opción compacta',
  size: 'sm', // Tamaño pequeño
  checked: false
});
```

### Ejemplo 6: Grupo de Toggles

```javascript
const settings = [
  { label: 'Notificaciones por email', value: 'email', checked: true },
  { label: 'Notificaciones push', value: 'push', checked: false },
  { label: 'Notificaciones SMS', value: 'sms', checked: false }
];

settings.forEach((setting, index) => {
  window.createToggle({
    containerId: `toggle-container-${index}`,
    label: setting.label,
    value: setting.value,
    name: 'notifications', // Mismo name para agrupar
    checked: setting.checked,
    onChange: (event) => {
      updateNotificationSetting(setting.value, event.target.checked);
    }
  });
});
```

### Ejemplo 7: Toggle con Validación

```javascript
let toggleState = false;

window.createToggle({
  containerId: 'toggle-container',
  label: 'Aceptar términos y condiciones',
  checked: false,
  onChange: (event) => {
    toggleState = event.target.checked;
    validateForm();
  }
});

function validateForm() {
  if (!toggleState) {
    showError('Debes aceptar los términos y condiciones');
  } else {
    clearError();
    enableSubmitButton();
  }
}
```

### Ejemplo 8: Toggle con Estado Persistente

```javascript
// Cargar estado desde localStorage
const savedState = localStorage.getItem('darkMode') === 'true';

window.createToggle({
  containerId: 'toggle-container',
  label: 'Modo oscuro',
  checked: savedState,
  onChange: (event) => {
    const isEnabled = event.target.checked;
    localStorage.setItem('darkMode', isEnabled.toString());
    applyDarkMode(isEnabled);
  }
});
```

---

## 🔄 Callbacks y Eventos

### onChange

Se ejecuta cuando el estado del toggle cambia (activación/desactivación).

```javascript
onChange: (event) => {
  const toggle = event.target;
  console.log('Toggle activado:', toggle.checked);
  console.log('Valor:', toggle.value);
  console.log('Nombre:', toggle.name);
  
  // Actualizar estado
  updateSetting(toggle.name, toggle.checked);
  
  // Guardar preferencia
  savePreference(toggle.name, toggle.checked);
  
  // Aplicar cambios
  applyChanges();
}
```

**Parámetros:**
- `event` (Event): Evento nativo del input checkbox
  - `event.target.checked` (boolean): Estado del toggle (true = activado, false = desactivado)
  - `event.target.value` (string): Valor del toggle
  - `event.target.name` (string): Nombre del toggle

---

## 🎨 Características Visuales

### Animación

El toggle tiene una animación suave al cambiar de estado:
- **Desactivado → Activado:** El círculo se desliza hacia la derecha
- **Activado → Desactivado:** El círculo se desliza hacia la izquierda

### Estados Visuales

- **Activado:** Fondo coloreado (verde/azul según tema), círculo a la derecha
- **Desactivado:** Fondo gris, círculo a la izquierda
- **Hover:** Efecto visual al pasar el cursor
- **Disabled:** Opacidad reducida, no interactivo

---

## 🚨 Errores Comunes

### Error 1: No Manejar Cambios de Estado
**Problema:** No implementar `onChange` para actualizar estado  
**Solución:** Siempre implementar el callback para manejar cambios

```javascript
// ❌ Incorrecto - no maneja cambios
window.createToggle({
  label: 'Opción',
  checked: false
  // Falta onChange
});

// ✅ Correcto - maneja cambios
window.createToggle({
  label: 'Opción',
  checked: false,
  onChange: (event) => {
    updateState(event.target.checked);
  }
});
```

### Error 2: Usar `state` en lugar de `disabled`
**Problema:** Usar `state: 'disabled'` sin `disabled: true`  
**Solución:** Siempre usar `disabled: true` para deshabilitar el toggle

```javascript
// ❌ Incorrecto
state: 'disabled',
disabled: false  // Aún es clickeable

// ✅ Correcto
state: 'disabled',
disabled: true  // No es clickeable
```

### Error 3: No Sincronizar Estado con UI
**Problema:** Cambiar estado externamente sin actualizar el toggle  
**Solución:** Actualizar el toggle cuando cambia el estado externo

```javascript
// ❌ Incorrecto - estado desincronizado
let isEnabled = false;
window.createToggle({
  label: 'Opción',
  checked: isEnabled
});
// Cambiar estado externamente
isEnabled = true; // El toggle no se actualiza

// ✅ Correcto - sincronizar estado
let isEnabled = false;
const toggleElement = window.createToggle({
  label: 'Opción',
  checked: isEnabled,
  onChange: (event) => {
    isEnabled = event.target.checked;
  }
});
// Actualizar toggle cuando cambia estado externo
function updateToggleState(newState) {
  isEnabled = newState;
  const input = document.querySelector('#toggle-container .ubits-toggle__input');
  if (input) {
    input.checked = newState;
  }
}
```

### Error 4: Múltiples Toggles sin Agrupar
**Problema:** Crear múltiples toggles sin usar `name` para agruparlos  
**Solución:** Usar `name` para agrupar toggles relacionados

```javascript
// ❌ Incorrecto - no agrupados
window.createToggle({ label: 'Opción 1' });
window.createToggle({ label: 'Opción 2' });

// ✅ Correcto - agrupados
window.createToggle({ label: 'Opción 1', name: 'group' });
window.createToggle({ label: 'Opción 2', name: 'group' });
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

