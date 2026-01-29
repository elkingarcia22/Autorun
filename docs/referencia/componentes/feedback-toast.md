# 📦 Toast

> **Componente UBITS:** `feedback-toast`  
> **Categoría:** Feedback  
> **API:** `window.showToast()` o `<ubits-toast>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-toast--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-toast--default

## 🎯 Descripción

Componente Toast UBITS para mostrar notificaciones flotantes. Se posiciona en la parte superior central, tiene auto-cierre, pausa en hover, apilado máximo de 3, y soporta título, cuerpo y botón de acción opcional.

**Características principales:**
- 4 tipos: success, info, warning, error
- Posición fija superior central
- Auto-cierre configurable
- Pausa en hover/focus
- Apilado máximo de 3 toasts
- Título opcional
- Botón de acción opcional
- Botón cerrar opcional
- Animaciones de entrada y salida

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-toast--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-toast--default
- **Código fuente:** `vendor/ubits/packages/components/toast/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/toast/src/types/ToastOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Toast.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-toast--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-toast--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-toast--default

**Descripción:**
Toast con todos los controles disponibles. Permite configurar tipo, título, mensaje, duración, botón cerrar, pausa en hover y botón de acción.

**Características mostradas:**
- Tipo configurable (success, info, warning, error)
- Título opcional
- Mensaje configurable
- Duración configurable
- Botón cerrar opcional
- Pausa en hover configurable
- Botón de acción opcional

**Código de ejemplo:**
```javascript
window.showToast('success', 'Los cambios se han guardado correctamente.', {
  title: 'Operación completada',
  duration: 3500,
  noClose: false,
  pauseOnHover: true,
  action: {
    label: 'Deshacer',
    onClick: () => {
      console.log('Acción ejecutada');
    }
  }
});
```

**Opciones utilizadas en la historia Default:**
- `type`: `'success'` - Tipo success
- `title`: `'Operación completada'` - Título del toast
- `message`: Mensaje largo de ejemplo
- `duration`: `3500` - 3.5 segundos
- `noClose`: `false` - Mostrar botón cerrar
- `pauseOnHover`: `true` - Pausar en hover

---

## ⚙️ Opciones y Props Completas

### Función Principal

```javascript
window.showToast(type, message, options?)
```

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `type` | `string` | Tipo de toast. Opciones: `success`, `info`, `warning`, `error` |
| `message` | `string` | Mensaje del toast (cuerpo) |
| `options` | `ToastOptions` | Opciones adicionales (opcional) |

### Opciones (ToastOptions)

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `title` | `string` | `''` | Título del toast (opcional, se muestra arriba alineado con el botón X) |
| `duration` | `number` | - | Duración en milisegundos antes de auto-cerrar (0 = persistente). Por defecto: success/info (3500ms), warning (5000ms), error (6500ms) |
| `noClose` | `boolean` | `false` | Si el toast NO tiene botón de cerrar |
| `pauseOnHover` | `boolean` | `true` | Si el timer se pausa cuando el usuario hace hover o focus |
| `action` | `object` | - | Botón de acción opcional |

### Estructura de action

```typescript
interface ToastAction {
  label: string;      // Texto del botón
  onClick: () => void; // Callback al hacer click
}
```

---

## 🎨 Tipos de Toast

### Success (Éxito)

- **Color:** Verde
- **Duración default:** 3500ms
- **Uso:** Confirmaciones, operaciones exitosas
- **Ejemplo:** "Los cambios se han guardado correctamente."

### Info (Información)

- **Color:** Azul
- **Duración default:** 3500ms
- **Uso:** Información general, tips
- **Ejemplo:** "Nueva actualización disponible."

### Warning (Advertencia)

- **Color:** Amarillo/Naranja
- **Duración default:** 5000ms
- **Uso:** Advertencias, precauciones
- **Ejemplo:** "Por favor, revisa los datos antes de continuar."

### Error (Error)

- **Color:** Rojo
- **Duración default:** 6500ms
- **Uso:** Errores, validaciones fallidas
- **Ejemplo:** "No se pudo guardar los cambios."

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Toast Básico Success

```javascript
window.showToast('success', 'Operación completada exitosamente.');
```

### Ejemplo 2: Toast con Título

```javascript
window.showToast('info', 'Nueva versión disponible.', {
  title: 'Actualización'
});
```

### Ejemplo 3: Toast con Botón de Acción

```javascript
window.showToast('success', 'Cambios guardados correctamente.', {
  title: 'Guardado',
  action: {
    label: 'Deshacer',
    onClick: () => {
      undoLastAction();
    }
  }
});
```

### Ejemplo 4: Toast Persistente (Sin Auto-cierre)

```javascript
window.showToast('warning', 'Esta acción no se puede deshacer.', {
  title: 'Advertencia',
  duration: 0, // Persistente
  noClose: false // Permitir cerrar manualmente
});
```

### Ejemplo 5: Toast sin Botón Cerrar

```javascript
window.showToast('info', 'Procesando...', {
  duration: 2000,
  noClose: true // Sin botón cerrar
});
```

### Ejemplo 6: Toast sin Pausa en Hover

```javascript
window.showToast('success', 'Mensaje breve.', {
  duration: 2000,
  pauseOnHover: false // No pausar en hover
});
```

### Ejemplo 7: Toast Error con Duración Personalizada

```javascript
window.showToast('error', 'Error al guardar los cambios.', {
  title: 'Error',
  duration: 10000, // 10 segundos (más tiempo para errores)
  action: {
    label: 'Reintentar',
    onClick: () => {
      retrySave();
    }
  }
});
```

### Ejemplo 8: Múltiples Toasts

```javascript
// Mostrar varios toasts (se apilan automáticamente, máximo 3)
window.showToast('success', 'Primer mensaje');
setTimeout(() => {
  window.showToast('info', 'Segundo mensaje');
}, 500);
setTimeout(() => {
  window.showToast('warning', 'Tercer mensaje');
}, 1000);
```

---

## 🎨 Características Visuales

### Posicionamiento

- **Posición:** Fija en la parte superior central
- **Ancho máximo:** 560px
- **Ancho mínimo:** 320px
- **Z-index:** 10000 (por encima de todo)

### Apilado

- Máximo 3 toasts visibles simultáneamente
- Los toasts se apilan verticalmente
- Espaciado entre toasts: `--p-spacing-mode-1-md` (12px)

### Animaciones

- **Entrada:** Slide down + fade in
- **Salida:** Fade out (180ms)
- **Transiciones:** Suaves y fluidas

---

## 🚨 Errores Comunes

### Error 1: No Proporcionar Mensaje
**Problema:** Llamar `showToast` sin mensaje  
**Solución:** Siempre proporcionar un mensaje

```javascript
// ❌ Incorrecto
window.showToast('success');

// ✅ Correcto
window.showToast('success', 'Mensaje aquí');
```

### Error 2: Usar duration: 0 sin noClose: false
**Problema:** Toast persistente sin forma de cerrarlo  
**Solución:** Si usas `duration: 0`, asegurar que `noClose: false`

```javascript
// ❌ Incorrecto - no se puede cerrar
duration: 0,
noClose: true

// ✅ Correcto - se puede cerrar manualmente
duration: 0,
noClose: false
```

### Error 3: Múltiples Toasts sin Control
**Problema:** Mostrar muchos toasts sin límite  
**Solución:** El componente limita automáticamente a 3, pero es mejor controlar manualmente

```javascript
// ❌ Incorrecto - puede saturar la UI
for (let i = 0; i < 10; i++) {
  window.showToast('info', `Mensaje ${i}`);
}

// ✅ Correcto - controlar cantidad
let toastCount = 0;
function showControlledToast(message) {
  if (toastCount < 3) {
    window.showToast('info', message);
    toastCount++;
  }
}
```

### Error 4: No Limpiar Toasts Anteriores
**Problema:** Acumular toasts sin limpiar  
**Solución:** Limpiar toasts cuando sea necesario

```javascript
// Limpiar todos los toasts
function clearAllToasts() {
  const container = document.getElementById('ubits-toast-container');
  if (container) {
    const toasts = container.querySelectorAll('.ubits-toast');
    toasts.forEach(toast => {
      toast.classList.add('ubits-toast--exit');
      setTimeout(() => toast.remove(), 180);
    });
  }
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

