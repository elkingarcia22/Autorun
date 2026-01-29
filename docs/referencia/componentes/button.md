# 📦 Button - Ejemplo de Documentación

> **Componente UBITS:** `button`  
> **API:** `window.UBITS.Button.create()` o `<ubits-button>`  
> **Storybook:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default

## 🎯 Descripción

Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga. Componente base para acciones en la interfaz.

## 🔗 Enlaces Rápidos

- **Storybook en Vercel:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default
- **Código fuente:** `vendor/ubits/packages/components/button/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/button/src/types/ButtonOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Button.stories.ts`

---

## 📚 Historias de Storybook

### Historia 1: Default

**ID en Storybook:** `basicos-button--default`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default

**Descripción:**
Botón básico con variante primaria y tamaño mediano. Ejemplo estándar del componente.

**Variantes mostradas:**
- Variante: `primary`
- Tamaño: `md`

**Código de ejemplo:**
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Click me'
});
```

**Opciones utilizadas:**
- `variant`: `'primary'` - Variante primaria (azul)
- `size`: `'md'` - Tamaño mediano (default)
- `text`: `'Click me'` - Texto del botón

**Casos de uso:**
- Acción principal en formularios
- Botones de confirmación
- CTAs principales
- Acciones más importantes de la interfaz

---

### Historia 2: With Icon

**ID en Storybook:** `basicos-button--with-icon`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--with-icon

**Descripción:**
Botón con icono a la izquierda del texto. Muestra cómo agregar iconos FontAwesome.

**Variantes mostradas:**
- Variante: `primary`
- Tamaño: `md`
- Icono: `plus` (FontAwesome)
- Posición del icono: `left`

**Código de ejemplo:**
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Agregar',
  icon: 'plus',
  iconStyle: 'regular',
  iconPosition: 'left'
});
```

**Opciones utilizadas:**
- `icon`: `'plus'` - Nombre del icono FontAwesome (sin prefijos `fa-`)
- `iconStyle`: `'regular'` - Estilo del icono (regular o solid)
- `iconPosition`: `'left'` - Posición del icono (left, right, only)

**Casos de uso:**
- Botones de agregar/crear (icono `plus`)
- Botones de eliminar (icono `trash`)
- Acciones con iconos descriptivos
- Mejorar UX con iconos visuales

**⚠️ IMPORTANTE:**
- Usar solo el nombre del icono sin prefijos (`'plus'` no `'fa-plus'`)
- El componente automáticamente agrega los prefijos necesarios

---

### Historia 3: All Variants

**ID en Storybook:** `basicos-button--all-variants`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--all-variants

**Descripción:**
Muestra todas las variantes disponibles del botón en una vista comparativa.

**Variantes mostradas:**
- `primary` - Botón primario (azul)
- `secondary` - Botón secundario (gris)
- `tertiary` - Botón terciario (transparente)

**Código de ejemplo:**
```javascript
// Variante primary
window.UBITS.Button.create({
  variant: 'primary',
  text: 'Primary'
});

// Variante secondary
window.UBITS.Button.create({
  variant: 'secondary',
  text: 'Secondary'
});

// Variante tertiary
window.UBITS.Button.create({
  variant: 'tertiary',
  text: 'Tertiary'
});
```

**Casos de uso:**
- Ver todas las opciones disponibles
- Comparar variantes visualmente
- Elegir variante apropiada según jerarquía
- Entender diferencias entre variantes

---

### Historia 4: All Sizes

**ID en Storybook:** `basicos-button--all-sizes`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--all-sizes

**Descripción:**
Muestra todos los tamaños disponibles del botón.

**Tamaños mostrados:**
- `xs` - Extra pequeño
- `sm` - Pequeño
- `md` - Mediano (default)
- `lg` - Grande

**Código de ejemplo:**
```javascript
// Tamaño xs
window.UBITS.Button.create({
  variant: 'primary',
  size: 'xs',
  text: 'Extra Small'
});

// Tamaño sm
window.UBITS.Button.create({
  variant: 'primary',
  size: 'sm',
  text: 'Small'
});

// Tamaño md (default)
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Medium'
});

// Tamaño lg
window.UBITS.Button.create({
  variant: 'primary',
  size: 'lg',
  text: 'Large'
});
```

**Casos de uso:**
- Elegir tamaño apropiado según contexto
- Botones pequeños para acciones secundarias
- Botones grandes para CTAs principales

---

### Historia 5: With Loading State

**ID en Storybook:** `basicos-button--with-loading-state`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--with-loading-state

**Descripción:**
Botón con estado de carga. Muestra un spinner mientras se procesa la acción.

**Características:**
- Estado: `loading: true`
- Muestra spinner automáticamente
- Deshabilita el botón durante la carga

**Código de ejemplo:**
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Guardar',
  loading: true
});
```

**Opciones utilizadas:**
- `loading`: `true` - Activa estado de carga (muestra spinner)

**Casos de uso:**
- Envío de formularios
- Acciones asíncronas
- Guardado de datos
- Procesamiento de peticiones

**Implementación típica:**
```javascript
const button = window.UBITS.Button.create({
  variant: 'primary',
  text: 'Guardar',
  onClick: async () => {
    // Activar loading
    button.setAttribute('loading', 'true');
    
    try {
      await saveData();
    } finally {
      // Desactivar loading
      button.removeAttribute('loading');
    }
  }
});
```

---

### Historia 6: Disabled State

**ID en Storybook:** `basicos-button--disabled-state`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--disabled-state

**Descripción:**
Botón deshabilitado. No es clickeable y tiene estilo visual diferente.

**Características:**
- Estado: `disabled: true`
- No es clickeable
- Estilo visual atenuado

**Código de ejemplo:**
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Guardar',
  disabled: true
});
```

**Opciones utilizadas:**
- `disabled`: `true` - Deshabilita el botón

**Casos de uso:**
- Formularios no válidos
- Acciones no disponibles
- Permisos insuficientes
- Estados donde la acción no aplica

---

### Historia 7: With Badge

**ID en Storybook:** `basicos-button--with-badge`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--with-badge

**Descripción:**
Botón con badge de notificación. Muestra un indicador numérico o de estado.

**Características:**
- Badge: `badge: true`
- Muestra indicador visual
- Útil para notificaciones

**Código de ejemplo:**
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Notificaciones',
  badge: true
});
```

**Opciones utilizadas:**
- `badge`: `true` - Muestra badge de notificación

**Casos de uso:**
- Botones de notificaciones
- Indicadores de cantidad
- Alertas visuales
- Contadores

---

### Historia 8: Icon Only

**ID en Storybook:** `basicos-button--icon-only`  
**URL:** https://ubits-storybook10.vercel.app/?path=/story/basicos-button--icon-only

**Descripción:**
Botón que muestra solo el icono, sin texto. Útil para ahorrar espacio.

**Características:**
- `iconOnly: true` o `iconPosition: 'only'`
- Solo muestra el icono
- Tooltip recomendado para accesibilidad

**Código de ejemplo:**
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  icon: 'plus',
  iconOnly: true
});
```

**Opciones utilizadas:**
- `iconOnly`: `true` - Muestra solo el icono
- `icon`: `'plus'` - Icono a mostrar

**Casos de uso:**
- Botones de acción rápida
- Toolbars compactas
- Ahorrar espacio en UI
- Iconos universales (como `plus`, `trash`, `edit`)

**⚠️ IMPORTANTE:**
- Agregar `title` o `aria-label` para accesibilidad
- Usar iconos universalmente reconocidos

---

## ⚙️ Opciones y Props Completas

### Opciones Principales

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Variante visual del botón |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `text` | `string` | `''` | Texto del botón |
| `icon` | `string` | `undefined` | Nombre del icono FontAwesome (sin prefijos) |
| `iconStyle` | `'regular' \| 'solid'` | `'regular'` | Estilo del icono FontAwesome |
| `iconPosition` | `'left' \| 'right' \| 'only'` | `'left'` | Posición del icono |
| `iconOnly` | `boolean` | `false` | Mostrar solo el icono, sin texto |
| `disabled` | `boolean` | `false` | Deshabilitar el botón |
| `loading` | `boolean` | `false` | Estado de carga (muestra spinner) |
| `badge` | `boolean` | `false` | Mostrar badge de notificación |
| `active` | `boolean` | `false` | Modificador active/outline |

### Variantes Disponibles

- **`primary`**: Botón primario (azul) - Usar para acciones principales
  - Color: `--ubits-accent-brand-static` (#0c5bef)
  - Uso: CTAs, acciones principales, confirmaciones

- **`secondary`**: Botón secundario (gris) - Usar para acciones secundarias
  - Color: Gris neutro
  - Uso: Acciones menos importantes, alternativas

- **`tertiary`**: Botón terciario (transparente) - Usar para acciones terciarias
  - Color: Transparente con borde
  - Uso: Acciones menos visibles, opciones adicionales

### Tamaños Disponibles

- **`xs`**: Extra pequeño (24px altura) - Para espacios muy reducidos
- **`sm`**: Pequeño (32px altura) - Para acciones secundarias
- **`md`**: Mediano (40px altura) - Default, uso general
- **`lg`**: Grande (48px altura) - Para CTAs principales

### Callbacks y Eventos

- **`onClick`**: Se dispara cuando se hace click en el botón
  ```javascript
  window.UBITS.Button.create({
    text: 'Click me',
    onClick: (event) => {
      console.log('Button clicked!', event);
    }
  });
  ```

---

## 🎨 Tokens Utilizados

- **`--ubits-accent-brand-static`**: Color azul primario (#0c5bef)
- **`--ubits-spacing-xs`**: Espaciado extra pequeño (4px)
- **`--ubits-spacing-sm`**: Espaciado pequeño (8px)
- **`--ubits-spacing-md`**: Espaciado mediano (12px)
- **`--ubits-spacing-lg`**: Espaciado grande (16px)
- **`--ubits-border-radius-sm`**: Radio de borde pequeño
- **`--ubits-border-radius-md`**: Radio de borde mediano

---

## 🚨 Errores Comunes

### Error 1: Usar Prefijos en Iconos
**Problema:** Usar `'far fa-plus'` o `'fa-plus'` en lugar de `'plus'`  
**Solución:** Usar solo el nombre del icono sin prefijos  
**Ejemplo:**
```javascript
// ❌ INCORRECTO
icon: 'far fa-plus'
icon: 'fa-plus'

// ✅ CORRECTO
icon: 'plus'
```
**Ver:** `docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md`

### Error 2: No Especificar Variante
**Problema:** Asumir que el botón es primario por defecto sin especificar  
**Solución:** Siempre especificar `variant` explícitamente para claridad  
**Ejemplo:**
```javascript
// ⚠️ Funciona pero no es explícito
window.UBITS.Button.create({ text: 'Click me' });

// ✅ Mejor: explícito
window.UBITS.Button.create({ 
  variant: 'primary',
  text: 'Click me' 
});
```

### Error 3: Confundir `active` con Estado de Click
**Problema:** `active` es un modificador visual, no un estado de click  
**Solución:** Usar `active` solo para estilo visual, no para lógica  
**Ver:** Documentación de `active` en tipos TypeScript

---

## 📖 Referencias

- [Guía de uso de componentes](docs/guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Catálogo de componentes](../catalogo-componentes.md)
- [Errores comunes](docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md)
- [Análisis de iconos](docs/guias/analisis/GUIA-ANALISIS-ICONOS-DETALLADO.md)

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Botón de Guardar con Loading
```javascript
const saveButton = window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Guardar',
  onClick: async () => {
    saveButton.setAttribute('loading', 'true');
    try {
      await saveData();
      showSuccess('Guardado exitosamente');
    } catch (error) {
      showError('Error al guardar');
    } finally {
      saveButton.removeAttribute('loading');
    }
  }
});
```

### Ejemplo 2: Botón con Icono y Badge
```javascript
window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Notificaciones',
  icon: 'bell',
  iconPosition: 'left',
  badge: true,
  onClick: () => {
    openNotifications();
  }
});
```

### Ejemplo 3: Botón Deshabilitado Condicional
```javascript
const submitButton = window.UBITS.Button.create({
  variant: 'primary',
  text: 'Enviar',
  disabled: !isFormValid
});

// Actualizar cuando cambie la validación
form.addEventListener('input', () => {
  submitButton.disabled = !isFormValid;
});
```

---

**Última actualización:** 2025-01-03  
**Versión Storybook consultada:** ubits-storybook10.vercel.app

