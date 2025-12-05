# 📦 Alert

> **Componente UBITS:** `feedback-alert`  
> **Categoría:** Feedback  
> **API:** `window.createAlert()` o `<ubits-alert>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-alert--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-alert--default

## 🎯 Descripción

Componente Alert UBITS para mostrar notificaciones del sistema. Soporta múltiples variantes (success, info, warning, error), botón cerrar opcional y animaciones.

**Características principales:**
- 4 tipos de alert: success, info, warning, error
- Botón cerrar opcional
- Auto-cierre configurable
- Soporte para HTML básico en el mensaje
- Animaciones de entrada y salida
- Clases CSS personalizables

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-alert--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-alert--default
- **Código fuente:** `vendor/ubits/packages/components/alert/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/alert/src/types/AlertOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/Alert.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-alert--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-alert--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-alert--default

**Descripción:**
Alert con todos los controles disponibles. Permite configurar tipo, mensaje, botón cerrar y auto-cierre.

**Características mostradas:**
- Tipo configurable (success, info, warning, error)
- Mensaje configurable (soporta HTML básico)
- Botón cerrar opcional
- Auto-cierre configurable

**Código de ejemplo:**
```javascript
window.createAlert({
  containerId: 'alert-container',
  type: 'success',
  message: 'Los cambios se han guardado correctamente.',
  closable: true,
  duration: 0
});
```

**Opciones utilizadas en la historia Default:**
- `type`: `'success'` - Tipo success
- `message`: `'Los cambios se han guardado correctamente.'` - Mensaje del alert
- `closable`: `true` - Mostrar botón cerrar
- `duration`: `0` - Sin auto-cierre

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `containerId` | `string` | - | ID del contenedor donde se renderizará el alert |
| `type` | `string` | `'success'` | Tipo de alert. Opciones: `success`, `info`, `warning`, `error` |
| `message` | `string` | `''` | Mensaje del alert (puede incluir HTML básico) |
| `closable` | `boolean` | `true` | Si el alert tiene botón de cerrar |
| `duration` | `number` | `0` | Duración en milisegundos antes de auto-cerrar (0 = no auto-close) |
| `className` | `string` | `''` | Clases CSS adicionales |
| `onClose` | `function` | - | Callback que se ejecuta cuando se cierra el alert |

---

## 🎨 Tipos de Alert

### Success (Éxito)

- **Color:** Verde
- **Uso:** Confirmaciones, operaciones exitosas
- **Ejemplo:** "Los cambios se han guardado correctamente."

### Info (Información)

- **Color:** Azul
- **Uso:** Información general, tips
- **Ejemplo:** "Nueva actualización disponible."

### Warning (Advertencia)

- **Color:** Amarillo/Naranja
- **Uso:** Advertencias, precauciones
- **Ejemplo:** "Por favor, revisa los datos antes de continuar."

### Error (Error)

- **Color:** Rojo
- **Uso:** Errores, validaciones fallidas
- **Ejemplo:** "No se pudo guardar los cambios."

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Alert Básico Success

```javascript
window.createAlert({
  containerId: 'alert-container',
  type: 'success',
  message: 'Operación completada exitosamente.',
  closable: true
});
```

### Ejemplo 2: Alert Info con HTML

```javascript
window.createAlert({
  containerId: 'alert-container',
  type: 'info',
  message: 'Nueva versión disponible. <a href="/update">Actualizar ahora</a>',
  closable: true
});
```

### Ejemplo 3: Alert Warning

```javascript
window.createAlert({
  containerId: 'alert-container',
  type: 'warning',
  message: 'Por favor, revisa los datos antes de continuar.',
  closable: true
});
```

### Ejemplo 4: Alert Error

```javascript
window.createAlert({
  containerId: 'alert-container',
  type: 'error',
  message: 'No se pudo guardar los cambios. Por favor, intenta nuevamente.',
  closable: true
});
```

### Ejemplo 5: Alert con Auto-cierre

```javascript
window.createAlert({
  containerId: 'alert-container',
  type: 'success',
  message: 'Cambios guardados correctamente.',
  closable: true,
  duration: 3000, // Auto-cerrar después de 3 segundos
  onClose: () => {
    console.log('Alert cerrado');
  }
});
```

### Ejemplo 6: Alert sin Botón Cerrar

```javascript
window.createAlert({
  containerId: 'alert-container',
  type: 'info',
  message: 'Esta es una notificación importante.',
  closable: false,
  duration: 5000 // Solo se cierra automáticamente
});
```

### Ejemplo 7: Alert con Clase Personalizada

```javascript
window.createAlert({
  containerId: 'alert-container',
  type: 'success',
  message: 'Mensaje personalizado.',
  closable: true,
  className: 'custom-alert-class'
});
```

### Ejemplo 8: Múltiples Alerts

```javascript
// Crear varios alerts en secuencia
const alerts = [
  { type: 'success', message: 'Primer mensaje' },
  { type: 'info', message: 'Segundo mensaje' },
  { type: 'warning', message: 'Tercer mensaje' }
];

alerts.forEach((alert, index) => {
  setTimeout(() => {
    window.createAlert({
      containerId: 'alert-container',
      ...alert,
      closable: true,
      duration: 3000
    });
  }, index * 1000);
});
```

---

## 🔄 Callbacks y Eventos

### onClose

Se ejecuta cuando el alert se cierra (manual o automático).

```javascript
onClose: () => {
  console.log('Alert cerrado');
  
  // Limpiar estado
  clearAlertState();
  
  // Ocultar contenedor si es necesario
  const container = document.getElementById('alert-container');
  if (container && container.children.length === 0) {
    container.style.display = 'none';
  }
}
```

---

## 🎨 Características Visuales

### Colores por Tipo

- **Success:** Verde (`--ubits-feedback-success`)
- **Info:** Azul (`--ubits-feedback-info`)
- **Warning:** Amarillo/Naranja (`--ubits-feedback-warning`)
- **Error:** Rojo (`--ubits-feedback-error`)

### Animaciones

- **Entrada:** Fade in suave
- **Salida:** Fade out suave (300ms)
- **Auto-cierre:** Transición suave antes de desaparecer

### Botón Cerrar

- Icono "X" en la esquina superior derecha
- Hover effect
- Click cierra el alert con animación

---

## 🚨 Errores Comunes

### Error 1: No Proporcionar containerId
**Problema:** Crear alert sin especificar `containerId`  
**Solución:** Siempre proporcionar un `containerId` válido

```javascript
// ❌ Incorrecto
window.createAlert({
  type: 'success',
  message: 'Mensaje'
  // Falta containerId
});

// ✅ Correcto
window.createAlert({
  containerId: 'alert-container',
  type: 'success',
  message: 'Mensaje'
});
```

### Error 2: Usar duration sin closable
**Problema:** Usar `duration` sin `closable: true` puede causar problemas  
**Solución:** Si usas auto-cierre, asegurar que el alert pueda cerrarse

```javascript
// ❌ Incorrecto - puede no cerrarse correctamente
duration: 3000,
closable: false

// ✅ Correcto
duration: 3000,
closable: true  // Permite cierre manual y automático
```

### Error 3: HTML Complejo en Mensaje
**Problema:** Usar HTML complejo que puede romper el layout  
**Solución:** Usar solo HTML básico (enlaces, texto en negrita, etc.)

```javascript
// ❌ Incorrecto - HTML complejo
message: '<div><span>Texto</span></div>'

// ✅ Correcto - HTML básico
message: 'Texto con <strong>negrita</strong> y <a href="/link">enlace</a>'
```

### Error 4: No Limpiar Alerts Anteriores
**Problema:** Crear múltiples alerts sin limpiar los anteriores  
**Solución:** Limpiar el contenedor antes de crear nuevos alerts

```javascript
// ❌ Incorrecto - se acumulan alerts
window.createAlert({ ... });
window.createAlert({ ... }); // Se apila

// ✅ Correcto - limpiar primero
const container = document.getElementById('alert-container');
container.innerHTML = '';
window.createAlert({ ... });
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
