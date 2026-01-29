# 📦 Input

> **Componente UBITS:** `input`  
> **API:** `window.createInput()` o `<ubits-input>`  
> **Storybook:** https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default

## 🎯 Descripción

Componente Input UBITS con soporte para múltiples tipos (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar), 4 tamaños (xs, sm, md, lg), 6 estados (default, hover, focus, active, invalid, disabled), iconos, helpers, contadores, y opciones mandatory/optional.

## 🔗 Enlaces Rápidos

- **Storybook en Vercel:** https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default
- **Código fuente:** `vendor/ubits/packages/components/input/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/input/src/types/InputOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Input.stories.ts`

---

## 📚 Historia de Storybook

### Historia: Default

**ID en Storybook:** `formularios-input--default`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/formularios-input--default

**Descripción:**
Input completo con controles interactivos para configurar todos los aspectos del componente. Muestra panel de información con el estado actual.

**Características mostradas:**
- 11 tipos de input diferentes
- 4 tamaños configurables
- 6 estados visuales
- Iconos izquierdo y derecho
- Helper text y contador de caracteres
- Opciones mandatory/optional
- Barra de herramientas de texto enriquecido (textarea)

**Código de ejemplo básico:**
```javascript
window.createInput({
  containerId: 'input-container',
  label: 'Nombre',
  placeholder: 'Ingresa tu nombre',
  type: 'text',
  size: 'md',
  state: 'default',
  showLabel: true
});
```

---

## ⚙️ Opciones y Props Completas

### Opciones Principales

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `containerId` | `string` | **REQUERIDO** | ID del contenedor donde se renderizará el input |
| `label` | `string` | `''` | Texto del label |
| `placeholder` | `string` | `''` | Texto del placeholder |
| `helperText` | `string` | `''` | Texto de ayuda (helper text) |
| `type` | `InputType` | `'text'` | Tipo de input (ver tipos abajo) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del input |
| `state` | `InputState` | `'default'` | Estado del input (ver estados abajo) |
| `value` | `string` | `''` | Valor inicial del input |
| `showLabel` | `boolean` | `true` | Mostrar/ocultar label |
| `showHelper` | `boolean` | `false` | Mostrar/ocultar helper text |
| `showCounter` | `boolean` | `false` | Mostrar/ocultar contador de caracteres |
| `maxLength` | `number` | `50` | Máximo de caracteres para el contador |
| `mandatory` | `boolean` | `false` | Mostrar texto mandatory/optional |
| `mandatoryType` | `'obligatorio' \| 'opcional'` | `'obligatorio'` | Tipo de mandatory |
| `leftIcon` | `string` | `''` | Icono izquierdo (nombre FontAwesome sin prefijo) |
| `rightIcon` | `string` | `''` | Icono derecho (nombre FontAwesome sin prefijo) |
| `showRichTextToolbar` | `boolean` | `false` | Mostrar barra de herramientas (solo textarea) |
| `selectOptions` | `SelectOption[]` | `undefined` | Opciones para SELECT |
| `autocompleteOptions` | `AutocompleteOption[]` | `undefined` | Opciones para AUTOCOMPLETE |

### Tipos de Input Disponibles

| Tipo | Descripción | Uso |
|------|-------------|-----|
| `text` | Texto simple | Nombres, descripciones |
| `email` | Email | Direcciones de correo |
| `password` | Contraseña | Campos de contraseña (oculta texto) |
| `number` | Número | Valores numéricos |
| `tel` | Teléfono | Números telefónicos |
| `url` | URL | Enlaces web |
| `select` | Selector | Lista desplegable de opciones |
| `textarea` | Área de texto | Texto multilínea |
| `search` | Búsqueda | Campos de búsqueda |
| `autocomplete` | Autocompletado | Búsqueda con sugerencias |
| `calendar` | Calendario | Selección de fechas |

### Tamaños Disponibles

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano (default)
- **`lg`**: Grande

### Estados Disponibles

- **`default`**: Estado normal
- **`hover`**: Al pasar el mouse
- **`focus`**: Cuando tiene foco
- **`active`**: Cuando está activo
- **`invalid`**: Cuando hay error de validación
- **`disabled`**: Cuando está deshabilitado

### Estructura de Opciones para Select

```typescript
interface SelectOption {
  value: string;  // Valor de la opción
  text: string;   // Texto mostrado
}
```

**Ejemplo:**
```javascript
selectOptions: [
  { value: 'opt-1', text: 'Opción 1' },
  { value: 'opt-2', text: 'Opción 2' }
]
```

**Nota:** El select soporta scroll infinito automático con 50+ opciones.

### Estructura de Opciones para Autocomplete

```typescript
interface AutocompleteOption {
  value: string;  // Valor de la opción
  text: string;   // Texto mostrado
}
```

**Ejemplo:**
```javascript
autocompleteOptions: [
  { value: 'apple', text: 'Manzana' },
  { value: 'banana', text: 'Banana' }
]
```

---

## 🎨 Iconos

### Formato de Iconos

**⚠️ IMPORTANTE:** Usar SOLO el nombre del icono FontAwesome sin prefijos (`fa-`, `far`, `fas`).

**Ejemplos:**
```javascript
// ✅ CORRECTO
leftIcon: 'user'      // Se convierte en 'far fa-user'
rightIcon: 'check'    // Se convierte en 'far fa-check'

// ❌ INCORRECTO
leftIcon: 'fa-user'   // NO usar prefijo
leftIcon: 'far fa-user' // NO usar prefijo y estilo
```

**Nota:** Los iconos se agregan automáticamente con el estilo `far` (regular).

### Restricciones

- **Textarea:** No muestra iconos (se ignoran `leftIcon` y `rightIcon`)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Input Básico
```javascript
window.createInput({
  containerId: 'input-nombre',
  label: 'Nombre completo',
  placeholder: 'Ingresa tu nombre',
  type: 'text',
  size: 'md'
});
```

### Ejemplo 2: Input con Iconos y Helper
```javascript
window.createInput({
  containerId: 'input-email',
  label: 'Correo electrónico',
  placeholder: 'ejemplo@correo.com',
  type: 'email',
  leftIcon: 'envelope',
  helperText: 'Ingresa un correo válido',
  showHelper: true,
  mandatory: true,
  mandatoryType: 'obligatorio'
});
```

### Ejemplo 3: Input con Contador
```javascript
window.createInput({
  containerId: 'input-descripcion',
  label: 'Descripción',
  placeholder: 'Escribe una descripción',
  type: 'text',
  showCounter: true,
  maxLength: 100,
  value: 'Texto inicial'
});
```

### Ejemplo 4: Select con Opciones
```javascript
window.createInput({
  containerId: 'input-select',
  label: 'Selecciona una opción',
  type: 'select',
  selectOptions: [
    { value: 'opt-1', text: 'Opción 1' },
    { value: 'opt-2', text: 'Opción 2' },
    { value: 'opt-3', text: 'Opción 3' }
  ]
});
```

### Ejemplo 5: Autocomplete
```javascript
window.createInput({
  containerId: 'input-autocomplete',
  label: 'Buscar fruta',
  placeholder: 'Escribe para buscar...',
  type: 'autocomplete',
  autocompleteOptions: [
    { value: 'apple', text: 'Manzana' },
    { value: 'banana', text: 'Banana' },
    { value: 'orange', text: 'Naranja' }
  ]
});
```

### Ejemplo 6: Textarea con Barra de Herramientas
```javascript
window.createInput({
  containerId: 'input-textarea',
  label: 'Comentario',
  placeholder: 'Escribe tu comentario...',
  type: 'textarea',
  showRichTextToolbar: true,
  showCounter: true,
  maxLength: 500
});
```

### Ejemplo 7: Input con Estado Invalid
```javascript
window.createInput({
  containerId: 'input-error',
  label: 'Email',
  placeholder: 'ejemplo@correo.com',
  type: 'email',
  state: 'invalid',
  helperText: 'Este correo no es válido',
  showHelper: true
});
```

### Ejemplo 8: Input Deshabilitado
```javascript
window.createInput({
  containerId: 'input-disabled',
  label: 'Campo deshabilitado',
  placeholder: 'No puedes editar esto',
  type: 'text',
  state: 'disabled',
  value: 'Valor fijo'
});
```

---

## 🚨 Errores Comunes

### Error 1: Usar Prefijos en Iconos
**Problema:** Usar `'fa-user'` o `'far fa-user'` en lugar de `'user'`  
**Solución:** Usar solo el nombre del icono sin prefijos  
**Ver ejemplos arriba**

### Error 2: No Especificar containerId
**Problema:** Olvidar especificar `containerId` (es requerido)  
**Solución:** Siempre incluir `containerId` al crear el input

### Error 3: Usar Iconos en Textarea
**Problema:** Intentar usar iconos en textarea  
**Solución:** Los iconos se ignoran automáticamente en textarea

### Error 4: No Proporcionar Opciones para Select/Autocomplete
**Problema:** Usar `type: 'select'` sin `selectOptions`  
**Solución:** Siempre proporcionar las opciones correspondientes

---

## 🎨 Tokens Utilizados

- **`--ubits-spacing-*`**: Espaciado entre elementos
- **`--ubits-border-*`**: Bordes del input
- **`--ubits-bg-*`**: Fondos (light/dark mode)
- **`--ubits-fg-*`**: Colores de texto (light/dark mode)
- **`--modifiers-normal-color-*`**: Colores del sistema de modifiers

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)

---

**Última actualización:** 2025-01-03  
**Versión Storybook consultada:** ubits-storybook10.vercel.app
