# 📦 Button AI

> **Componente UBITS:** `básicos-button-ai`  
> **Categoría:** Básicos  
> **API:** `window.createButtonAI()` o `<ubits-button-ai>`  
> **Storybook Local:** http://localhost:6006/?path=/story/bsicos-button-ai--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-button-ai--default

## 🎯 Descripción

Componente Button AI UBITS con estilo redondeado y gradación. Basado en Button de UBITS pero con bordes más redondeados y gradientes. Solo incluye variantes primary y secondary.

**Características principales:**
- 2 variantes: primary, secondary
- 5 tamaños: xs, sm, md, lg, xl
- Icono opcional (FontAwesome)
- Modo solo icono (iconOnly)
- Badge de notificación opcional
- Estado activo (active)
- Estado deshabilitado (disabled)
- Bordes más redondeados que Button estándar
- Gradientes en las variantes

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/bsicos-button-ai--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-button-ai--default
- **Código fuente:** `vendor/ubits/packages/components/button-ai/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/button-ai/src/types/ButtonAIOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/ButtonAI.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `básicos-button-ai--default`  
**URL Local:** http://localhost:6006/?path=/story/bsicos-button-ai--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/bsicos-button-ai--default

**Descripción:**
Button AI con todos los controles disponibles. Permite configurar variante, tamaño, texto, icono, modo solo icono, badge, estado activo y deshabilitado.

**Características mostradas:**
- Variante primary o secondary
- 5 tamaños disponibles
- Icono opcional (FontAwesome)
- Modo solo icono
- Badge de notificación
- Estado activo
- Estado deshabilitado

**Código de ejemplo:**
```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI button',
  icon: 'sparkles',
  iconStyle: 'regular',
  iconOnly: false,
  disabled: false,
  badge: false,
  active: false,
  onClick: (e) => {
    console.log('Button AI clicked');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `variant`: `'primary'` - Variante primary por defecto
- `size`: `'md'` - Tamaño mediano por defecto
- `text`: `'AI button'` - Texto del botón
- `icon`: `'sparkles'` - Icono FontAwesome
- `iconStyle`: `'regular'` - Estilo regular del icono
- `iconOnly`: `false` - Mostrar texto e icono
- `disabled`: `false` - Botón habilitado
- `badge`: `false` - Sin badge
- `active`: `false` - Estado normal

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `string` | `'primary'` | Variante del botón. Opciones: `primary`, `secondary` |
| `size` | `string` | `'md'` | Tamaño del botón. Opciones: `xs`, `sm`, `md`, `lg`, `xl` |
| `text` | `string` | - | Texto del botón |
| `icon` | `string` | - | Nombre del icono FontAwesome (sin prefijo `fa-`) |
| `iconStyle` | `string` | `'regular'` | Estilo del icono FontAwesome. Opciones: `regular`, `solid` |
| `iconOnly` | `boolean` | `false` | Mostrar solo el icono, sin texto |
| `disabled` | `boolean` | `false` | Deshabilitar el botón |
| `badge` | `boolean` | `false` | Mostrar badge de notificación |
| `active` | `boolean` | `false` | Modificador active/outline |
| `className` | `string` | - | Clases CSS adicionales |
| `onClick` | `function` | - | Callback que se ejecuta al hacer click |

### Variantes

| Variante | Descripción |
|----------|-------------|
| `primary` | Botón principal con gradiente (default) |
| `secondary` | Botón secundario con gradiente |

### Tamaños

| Tamaño | Descripción |
|--------|-------------|
| `xs` | Extra pequeño |
| `sm` | Pequeño |
| `md` | Mediano (default) |
| `lg` | Grande |
| `xl` | Extra grande |

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Button AI Básico

```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI button',
  onClick: (e) => {
    console.log('Button clicked');
  }
});
```

### Ejemplo 2: Button AI con Icono

```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI button',
  icon: 'sparkles',
  iconStyle: 'regular',
  onClick: (e) => {
    console.log('Button clicked');
  }
});
```

### Ejemplo 3: Button AI Solo Icono

```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  icon: 'sparkles',
  iconStyle: 'regular',
  iconOnly: true,
  onClick: (e) => {
    console.log('Button clicked');
  }
});
```

### Ejemplo 4: Button AI Secondary

```javascript
window.createButtonAI({
  variant: 'secondary',
  size: 'md',
  text: 'AI button',
  icon: 'sparkles',
  onClick: (e) => {
    console.log('Button clicked');
  }
});
```

### Ejemplo 5: Button AI con Badge

```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI button',
  icon: 'sparkles',
  badge: true,
  onClick: (e) => {
    console.log('Button clicked');
  }
});
```

### Ejemplo 6: Button AI Activo

```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI button',
  icon: 'sparkles',
  active: true,
  onClick: (e) => {
    console.log('Button clicked');
  }
});
```

### Ejemplo 7: Button AI Deshabilitado

```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI button',
  icon: 'sparkles',
  disabled: true,
  onClick: (e) => {
    // No se ejecutará porque está deshabilitado
  }
});
```

### Ejemplo 8: Button AI Diferentes Tamaños

```javascript
// Extra pequeño
window.createButtonAI({
  variant: 'primary',
  size: 'xs',
  text: 'XS',
  icon: 'sparkles'
});

// Pequeño
window.createButtonAI({
  variant: 'primary',
  size: 'sm',
  text: 'SM',
  icon: 'sparkles'
});

// Mediano
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'MD',
  icon: 'sparkles'
});

// Grande
window.createButtonAI({
  variant: 'primary',
  size: 'lg',
  text: 'LG',
  icon: 'sparkles'
});

// Extra grande
window.createButtonAI({
  variant: 'primary',
  size: 'xl',
  text: 'XL',
  icon: 'sparkles'
});
```

### Ejemplo 9: Button AI con Icono Solid

```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI button',
  icon: 'sparkles',
  iconStyle: 'solid',
  onClick: (e) => {
    console.log('Button clicked');
  }
});
```

### Ejemplo 10: Button AI Completo

```javascript
window.createButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI Assistant',
  icon: 'sparkles',
  iconStyle: 'regular',
  iconOnly: false,
  badge: true,
  active: false,
  disabled: false,
  className: 'custom-button-ai',
  onClick: (e) => {
    console.log('AI Assistant clicked');
    openAIAssistant();
  }
});
```

---

## 🔄 Callbacks y Eventos

### onClick

Se ejecuta cuando se hace click en el botón (si no está deshabilitado).

```javascript
onClick: (e) => {
  console.log('Button AI clicked', e);
  // Abrir asistente AI
  openAIAssistant();
  
  // Enviar evento
  trackEvent('button_ai_clicked');
  
  // Navegar
  navigateToAIPage();
}
```

**Parámetros:**
- `e` (Event): Evento de click del botón

---

## 🎨 Características Visuales

### Diferencias con Button Estándar

- **Bordes más redondeados:** Bordes más redondeados que el Button estándar
- **Gradientes:** Usa gradientes en las variantes primary y secondary
- **Solo 2 variantes:** No incluye la variante tertiary
- **Estilo AI:** Diseñado específicamente para funciones de AI

### Estados

- **Default:** Estado normal del botón
- **Active:** Estado activo/outline
- **Disabled:** Estado deshabilitado (no clickeable)
- **Hover:** Efecto hover al pasar el mouse
- **Focus:** Efecto focus al recibir foco

### Badge

- Badge de notificación en la esquina superior derecha
- Se muestra cuando `badge: true`
- Usa tokens UBITS para colores

---

## 🚨 Errores Comunes

### Error 1: Variante Inválida
**Problema:** Usar una variante que no existe (ej: tertiary)  
**Solución:** Usar solo primary o secondary

```javascript
// ❌ Incorrecto - variante inválida
variant: 'tertiary'

// ✅ Correcto - variante válida
variant: 'primary'
// O
variant: 'secondary'
```

### Error 2: Icono sin Nombre
**Problema:** Proporcionar icono con prefijo `fa-`  
**Solución:** Proporcionar solo el nombre del icono sin prefijo

```javascript
// ❌ Incorrecto - con prefijo
icon: 'fa-sparkles'

// ✅ Correcto - sin prefijo
icon: 'sparkles'
```

### Error 3: IconOnly sin Icono
**Problema:** Activar `iconOnly: true` sin proporcionar icono  
**Solución:** Proporcionar icono cuando se usa iconOnly

```javascript
// ❌ Incorrecto - iconOnly sin icono
iconOnly: true
// Falta icon

// ✅ Correcto - iconOnly con icono
iconOnly: true,
icon: 'sparkles'
```

### Error 4: Texto e IconOnly Simultáneos
**Problema:** Activar `iconOnly: true` y proporcionar texto  
**Solución:** Cuando iconOnly está activo, el texto se ignora

```javascript
// ⚠️ Funciona pero el texto se ignora
iconOnly: true,
text: 'AI button', // Se ignora
icon: 'sparkles'

// ✅ Correcto - solo icono
iconOnly: true,
icon: 'sparkles'
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Button](./bsicos-button.md) - Componente relacionado (Button estándar)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

