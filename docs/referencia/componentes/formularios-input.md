# 📦 Input

> **Componente UBITS:** `formularios-input`  
> **Categoría:** Formularios  
> **API:** `window.createInput()` o `<ubits-input>`  
> **Storybook Local:** http://localhost:6006/?path=/story/formularios-input--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default

## 🎯 Descripción

Componente Input UBITS con soporte para múltiples tipos (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar), 4 tamaños (xs, sm, md, lg), 6 estados (default, hover, focus, active, invalid, disabled), iconos, helpers, contadores, y opciones mandatory/optional.

**Características principales:**
- 11 tipos de input diferentes
- 4 tamaños configurables
- 6 estados visuales
- Iconos izquierdo y derecho (FontAwesome)
- Helper text y contador de caracteres
- Indicador mandatory/optional
- Soporte para select con opciones
- Autocomplete con sugerencias
- Textarea con barra de herramientas de texto enriquecido (opcional)
- Calendar picker

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/formularios-input--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default
- **Código fuente:** `vendor/ubits/packages/components/input/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/input/src/types/InputOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Input.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `formularios-input--default`  
**URL Local:** http://localhost:6006/?path=/story/formularios-input--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default

**Descripción:**
Input con todos los controles disponibles. Permite configurar tipo, tamaño, estado, iconos, helpers y todas las opciones del componente.

**Características mostradas:**
- Tipo configurable (11 tipos disponibles)
- Tamaño configurable (xs, sm, md, lg)
- Estado configurable (default, hover, focus, active, invalid, disabled)
- Label y placeholder configurables
- Helper text opcional
- Contador de caracteres opcional
- Iconos izquierdo y derecho opcionales
- Indicador mandatory/optional

**Código de ejemplo:**
```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Label',
  placeholder: 'Placeholder',
  type: 'text',
  size: 'md',
  state: 'default',
  showLabel: true,
  showHelper: false,
  value: ''
});
```

**Opciones utilizadas en la historia Default:**
- `label`: `'Label'` - Texto del label
- `placeholder`: `'Placeholder'` - Texto del placeholder
- `type`: `'text'` - Tipo de input
- `size`: `'md'` - Tamaño mediano
- `state`: `'default'` - Estado por defecto
- `showLabel`: `true` - Mostrar label
- `showHelper`: `false` - Ocultar helper text

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el input |
| `label` | `string` | `''` | Texto del label |
| `placeholder` | `string` | `''` | Texto del placeholder |
| `helperText` | `string` | `''` | Texto de ayuda (helper text) |
| `type` | `string` | `'text'` | Tipo de input. Opciones: `text`, `email`, `password`, `number`, `tel`, `url`, `select`, `textarea`, `search`, `autocomplete`, `calendar` |
| `size` | `string` | `'md'` | Tamaño del input. Opciones: `xs`, `sm`, `md`, `lg` |
| `state` | `string` | `'default'` | Estado del input. Opciones: `default`, `hover`, `focus`, `active`, `invalid`, `disabled` |
| `showLabel` | `boolean` | `true` | Mostrar/ocultar label |
| `showHelper` | `boolean` | `false` | Mostrar/ocultar helper text |
| `showCounter` | `boolean` | `false` | Mostrar/ocultar contador de caracteres |
| `maxLength` | `number` | `50` | Máximo de caracteres para el contador |
| `mandatory` | `boolean` | `false` | Mostrar texto mandatory/optional |
| `mandatoryType` | `string` | `'obligatorio'` | Tipo de mandatory. Opciones: `obligatorio`, `opcional` |
| `leftIcon` | `string` | `''` | Icono izquierdo (nombre FontAwesome sin prefijo, ej: `user`) |
| `rightIcon` | `string` | `''` | Icono derecho (nombre FontAwesome sin prefijo, ej: `check`) |
| `value` | `string` | `''` | Valor inicial del input |
| `selectOptions` | `SelectOption[]` | - | Opciones para input tipo `select` |
| `autocompleteOptions` | `AutocompleteOption[]` | - | Opciones para input tipo `autocomplete` |
| `showRichTextToolbar` | `boolean` | `false` | Mostrar/ocultar barra de herramientas de texto enriquecido (solo para textarea) |
| `onChange` | `function` | - | Callback que se ejecuta cuando cambia el valor |
| `onFocus` | `function` | - | Callback que se ejecuta cuando el input recibe focus |
| `onBlur` | `function` | - | Callback que se ejecuta cuando el input pierde focus |

### Estructura de SelectOption

```typescript
interface SelectOption {
  value: string;  // Valor de la opción
  text: string;  // Texto visible
}
```

### Estructura de AutocompleteOption

```typescript
interface AutocompleteOption {
  value: string;  // Valor de la opción
  text: string;  // Texto visible
}
```

---

## 📊 Tipos de Input Disponibles

### Tipos Básicos

- **`text`**: Campo de texto simple
- **`email`**: Campo de email con validación
- **`password`**: Campo de contraseña (oculta caracteres)
- **`number`**: Campo numérico
- **`tel`**: Campo de teléfono
- **`url`**: Campo de URL

### Tipos Avanzados

- **`select`**: Dropdown con opciones predefinidas
- **`textarea`**: Área de texto multilínea
- **`search`**: Campo de búsqueda
- **`autocomplete`**: Campo con autocompletado y sugerencias
- **`calendar`**: Selector de fecha

---

## 🎨 Tamaños y Estados

### Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano (default)
- **`lg`**: Grande

### Estados

- **`default`**: Estado normal
- **`hover`**: Estado hover (cursor sobre el input)
- **`focus`**: Estado focus (input activo)
- **`active`**: Estado activo
- **`invalid`**: Estado inválido (error de validación)
- **`disabled`**: Estado deshabilitado

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Input Básico

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Nombre',
  placeholder: 'Ingresa tu nombre',
  type: 'text',
  size: 'md',
  showLabel: true
});
```

### Ejemplo 2: Input con Icono

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Email',
  placeholder: 'correo@ejemplo.com',
  type: 'email',
  size: 'md',
  leftIcon: 'envelope',
  showLabel: true
});
```

### Ejemplo 3: Input con Helper y Contador

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Descripción',
  placeholder: 'Escribe una descripción',
  type: 'text',
  size: 'md',
  helperText: 'Máximo 100 caracteres',
  showHelper: true,
  showCounter: true,
  maxLength: 100,
  showLabel: true
});
```

### Ejemplo 4: Input Select

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'País',
  type: 'select',
  size: 'md',
  selectOptions: [
    { value: 'co', text: 'Colombia' },
    { value: 'mx', text: 'México' },
    { value: 'ar', text: 'Argentina' },
    { value: 'cl', text: 'Chile' }
  ],
  showLabel: true
});
```

### Ejemplo 5: Input Autocomplete

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Fruta',
  placeholder: 'Busca una fruta...',
  type: 'autocomplete',
  size: 'md',
  autocompleteOptions: [
    { value: 'apple', text: 'Manzana' },
    { value: 'banana', text: 'Banana' },
    { value: 'orange', text: 'Naranja' },
    { value: 'grape', text: 'Uva' }
  ],
  showLabel: true
});
```

### Ejemplo 6: Input Textarea con Rich Text

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Contenido',
  placeholder: 'Escribe aquí...',
  type: 'textarea',
  size: 'md',
  showRichTextToolbar: true,
  showLabel: true
});
```

### Ejemplo 7: Input con Mandatory

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Nombre completo',
  placeholder: 'Ingresa tu nombre',
  type: 'text',
  size: 'md',
  mandatory: true,
  mandatoryType: 'obligatorio',
  showLabel: true
});
```

### Ejemplo 8: Input con Estado Invalid

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Email',
  placeholder: 'correo@ejemplo.com',
  type: 'email',
  size: 'md',
  state: 'invalid',
  helperText: 'Por favor ingresa un email válido',
  showHelper: true,
  showLabel: true
});
```

### Ejemplo 9: Input Disabled

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Campo deshabilitado',
  placeholder: 'No disponible',
  type: 'text',
  size: 'md',
  state: 'disabled',
  value: 'Valor fijo',
  showLabel: true
});
```

### Ejemplo 10: Input Calendar

```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Fecha de nacimiento',
  type: 'calendar',
  size: 'md',
  showLabel: true,
  onChange: (value) => {
    console.log('Fecha seleccionada:', value);
  }
});
```

---

## 🔄 Callbacks y Eventos

### onChange

Se ejecuta cuando el valor del input cambia.

```javascript
onChange: (value) => {
  console.log('Nuevo valor:', value);
  // Validar o procesar el valor
}
```

**Parámetros:**
- `value` (string): Nuevo valor del input

### onFocus

Se ejecuta cuando el input recibe focus.

```javascript
onFocus: () => {
  console.log('Input recibió focus');
  // Mostrar ayuda adicional, etc.
}
```

### onBlur

Se ejecuta cuando el input pierde focus.

```javascript
onBlur: () => {
  console.log('Input perdió focus');
  // Validar valor, etc.
}
```

---

## 🚨 Errores Comunes

### Error 1: Usar Prefijo `fa-` en Iconos
**Problema:** Usar `leftIcon: 'fa-user'` en lugar de `leftIcon: 'user'`  
**Solución:** Siempre usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
leftIcon: 'fa-user'

// ✅ Correcto
leftIcon: 'user'
```

### Error 2: Usar Iconos en Textarea
**Problema:** Intentar usar `leftIcon` o `rightIcon` en input tipo `textarea`  
**Solución:** Los iconos no están disponibles para textarea

```javascript
// ❌ Incorrecto
type: 'textarea',
leftIcon: 'user'  // No funcionará

// ✅ Correcto
type: 'textarea',
// No usar iconos
```

### Error 3: No Proporcionar Opciones para Select/Autocomplete
**Problema:** Usar `type: 'select'` sin proporcionar `selectOptions`  
**Solución:** Siempre proporcionar las opciones necesarias

```javascript
// ❌ Incorrecto
type: 'select',
// Falta selectOptions

// ✅ Correcto
type: 'select',
selectOptions: [
  { value: 'opt1', text: 'Opción 1' },
  { value: 'opt2', text: 'Opción 2' }
]
```

### Error 4: Confundir `state` con Validación
**Problema:** Usar `state: 'invalid'` esperando validación automática  
**Solución:** `state` es solo visual, la validación debe hacerse manualmente

```javascript
// ❌ Incorrecto - state no valida automáticamente
state: 'invalid'  // Solo cambia el estilo visual

// ✅ Correcto - validar manualmente y luego cambiar state
const value = inputElement.value;
if (!isValidEmail(value)) {
  // Cambiar state a invalid
  updateInputState('invalid');
}
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
