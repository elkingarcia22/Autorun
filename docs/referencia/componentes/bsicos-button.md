# 📦 Button

> **Componente UBITS:** `basicos-button`  
> **Categoría:** Básicos  
> **API:** `window.createButton()` o `<ubits-button>`  
> **Storybook Local:** http://localhost:6006/?path=/story/basicos-button--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default

## 🎯 Descripción

Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga. Componente base para acciones en la interfaz.

**Características principales:**
- Tres variantes: `primary`, `secondary`, `tertiary`
- Cuatro tamaños: `xs`, `sm`, `md`, `lg`
- Soporte para iconos FontAwesome (izquierda, derecha, solo icono)
- Estados: normal, disabled, loading, active
- Modificadores: floating, fullWidth, block
- Soporte para tooltips (botones icon-only)
- Funcionalidad dropdown opcional
- Badge de notificación opcional

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/basicos-button--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default
- **Código fuente:** `vendor/ubits/packages/components/button/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/button/src/types/ButtonOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Button.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `basicos-button--default`  
**URL Local:** http://localhost:6006/?path=/story/basicos-button--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default

**Descripción:**
Botón con todos los controles disponibles. Permite configurar variante, tamaño, iconos, estados y modificadores.

**Características mostradas:**
- Variante configurable (primary, secondary, tertiary)
- Tamaño configurable (xs, sm, md, lg)
- Icono opcional con posición configurable
- Estados: disabled, loading, active
- Modificadores: floating, fullWidth, block
- Tooltip opcional para botones icon-only
- Dropdown opcional

**Código de ejemplo:**
```javascript
window.createButton({
  containerId: 'button-container',
  variant: 'primary',
  size: 'md',
  text: 'Botón de ejemplo',
  icon: 'check',
  iconStyle: 'regular',
  iconPosition: 'left',
  onClick: () => {
    console.log('Botón clickeado');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `variant`: `'primary'` - Variante primaria
- `size`: `'md'` - Tamaño mediano
- `text`: `'Botón de ejemplo'` - Texto del botón
- `icon`: `'check'` - Icono FontAwesome
- `iconStyle`: `'regular'` - Estilo del icono
- `iconPosition`: `'left'` - Posición del icono

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el botón |
| `variant` | `string` | `'primary'` | Variante del botón. Opciones: `primary`, `secondary`, `tertiary` |
| `size` | `string` | `'md'` | Tamaño del botón. Opciones: `xs`, `sm`, `md`, `lg` |
| `text` | `string` | - | Texto del botón |
| `icon` | `string` | - | Nombre del icono FontAwesome (sin prefijo `fa-`, ej: `'check'`, `'plus'`) |
| `iconStyle` | `string` | `'regular'` | Estilo del icono FontAwesome. Opciones: `regular`, `solid` |
| `iconPosition` | `string` | `'left'` | Posición del icono. Opciones: `left`, `right`, `only` |
| `iconOnly` | `boolean` | `false` | Mostrar solo el icono, sin texto |
| `disabled` | `boolean` | `false` | Deshabilitar el botón |
| `loading` | `boolean` | `false` | Estado de carga (muestra spinner) |
| `badge` | `boolean` | `false` | Mostrar badge de notificación |
| `active` | `boolean` | `false` | Modificador active/outline (fondo transparente + overlay azul). IMPORTANTE: Esto es diferente del estado "active" del controlador de estados (que simula "pressed") |
| `floating` | `boolean` | `false` | Modificador floating (botón flotante con sombra del sistema de diseño) |
| `fullWidth` | `boolean` | `false` | Ancho completo |
| `block` | `boolean` | `false` | Display block |
| `dropdown` | `boolean` | `false` | Activar funcionalidad dropdown (muestra lista al hacer click) |
| `dropdownOptions` | `array` | `[]` | Opciones del dropdown. Array de objetos con `label` y `value` |
| `onClick` | `function` | - | Callback que se ejecuta al hacer click en el botón |
| `showTooltip` | `boolean` | `false` | Mostrar tooltip al hacer hover (solo para botones icon-only) |
| `tooltipText` | `string` | - | Texto del tooltip (solo para botones icon-only) |

### Estructura de dropdownOptions

```typescript
interface DropdownOption {
  label: string;  // Texto visible
  value: string; // Valor de la opción
}
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Botón Básico

```javascript
window.createButton({
  containerId: 'button-container',
  variant: 'primary',
  size: 'md',
  text: 'Click me',
  onClick: () => {
    console.log('Botón clickeado');
  }
});
```

### Ejemplo 2: Botón con Icono

```javascript
window.createButton({
  containerId: 'button-container',
  variant: 'primary',
  size: 'md',
  text: 'Agregar',
  icon: 'plus',
  iconStyle: 'regular',
  iconPosition: 'left',
  onClick: () => {
    console.log('Agregar elemento');
  }
});
```

### Ejemplo 3: Botón Solo Icono con Tooltip

```javascript
window.createButton({
  containerId: 'button-container',
  variant: 'primary',
  size: 'md',
  icon: 'settings',
  iconStyle: 'regular',
  iconPosition: 'only',
  iconOnly: true,
  showTooltip: true,
  tooltipText: 'Configuración',
  onClick: () => {
    console.log('Abrir configuración');
  }
});
```

### Ejemplo 4: Botón con Estado Loading

```javascript
window.createButton({
  containerId: 'button-container',
  variant: 'primary',
  size: 'md',
  text: 'Guardar',
  loading: true,
  disabled: true, // Deshabilitar mientras carga
  onClick: () => {
    // Esta función no se ejecutará mientras loading es true
  }
});
```

### Ejemplo 5: Botón con Dropdown

```javascript
window.createButton({
  containerId: 'button-container',
  variant: 'primary',
  size: 'md',
  text: 'Opciones',
  icon: 'chevron-down',
  iconPosition: 'right',
  dropdown: true,
  dropdownOptions: [
    { label: 'Opción 1', value: 'opt1' },
    { label: 'Opción 2', value: 'opt2' },
    { label: 'Opción 3', value: 'opt3' }
  ],
  onClick: (option) => {
    console.log('Opción seleccionada:', option);
  }
});
```

### Ejemplo 6: Botón Flotante

```javascript
window.createButton({
  containerId: 'button-container',
  variant: 'primary',
  size: 'lg',
  icon: 'plus',
  iconPosition: 'only',
  iconOnly: true,
  floating: true,
  onClick: () => {
    console.log('Botón flotante clickeado');
  }
});
```

---

## 🎨 Variantes y Tamaños

### Variantes

- **`primary`**: Botón principal (azul). Usar para acciones principales.
- **`secondary`**: Botón secundario (gris). Usar para acciones secundarias.
- **`tertiary`**: Botón terciario (transparente). Usar para acciones menos importantes.

### Tamaños

- **`xs`**: Extra pequeño
- **`sm`**: Pequeño
- **`md`**: Mediano (default)
- **`lg`**: Grande

---

## 🚨 Errores Comunes

### Error 1: Usar Prefijo `fa-` en Iconos
**Problema:** Usar `icon: 'fa-check'` en lugar de `icon: 'check'`  
**Solución:** Siempre usar solo el nombre del icono sin prefijos

```javascript
// ❌ Incorrecto
icon: 'fa-check'

// ✅ Correcto
icon: 'check'
```

### Error 2: Confundir `active` con Estado de Click
**Problema:** Usar `active: true` esperando que simule un click  
**Solución:** `active` es un modificador visual (outline), no un estado de interacción

```javascript
// ❌ Incorrecto - active no simula click
active: true  // Esto solo cambia el estilo visual

// ✅ Correcto - usar onClick para manejar clicks
onClick: () => {
  // Manejar click aquí
}
```

### Error 3: No Deshabilitar Botón en Estado Loading
**Problema:** Permitir clicks mientras el botón está en estado `loading`  
**Solución:** Siempre deshabilitar el botón cuando `loading: true`

```javascript
// ❌ Incorrecto
loading: true,
disabled: false  // Permite clicks durante carga

// ✅ Correcto
loading: true,
disabled: true  // Previene clicks durante carga
```

### Error 4: Tooltip sin `iconOnly`
**Problema:** Usar `showTooltip: true` en botones con texto  
**Solución:** Los tooltips solo funcionan en botones `iconOnly: true`

```javascript
// ❌ Incorrecto
text: 'Botón',
showTooltip: true  // No funcionará

// ✅ Correcto
iconOnly: true,
icon: 'settings',
showTooltip: true,
tooltipText: 'Configuración'
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
