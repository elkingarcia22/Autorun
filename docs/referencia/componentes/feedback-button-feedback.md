# 📦 Button Feedback

> **Componente UBITS:** `feedback-button-feedback`  
> **Categoría:** Feedback  
> **API:** `window.createButtonFeedback()` o `<ubits-button-feedback>`  
> **Storybook Local:** http://localhost:6006/?path=/story/feedback-button-feedback--default  
> **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-button-feedback--default

## 🎯 Descripción

Botón flotante para obtener feedback de clientes. Al hacer clic, abre un modal con un formulario que permite seleccionar la sección actual y dejar un comentario. El feedback se puede enviar a un webhook de n8n.

**Características principales:**
- Botón flotante con posición configurable
- Modal con formulario de feedback
- Select de sección configurable
- Textarea para comentarios
- Integración con webhook de n8n
- Callbacks para eventos del formulario
- Visible/oculto configurable

## 🔗 Enlaces Rápidos

- **Storybook Local:** http://localhost:6006/?path=/story/feedback-button-feedback--default
- **Storybook Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-button-feedback--default
- **Código fuente:** `vendor/ubits/packages/components/button-feedback/`
- **Tipos TypeScript:** `vendor/ubits/packages/components/button-feedback/src/types/ButtonFeedbackOptions.ts`
- **Stories:** `vendor/ubits/packages/storybook/stories/ButtonFeedback.stories.ts`

---

## 📚 Historias de Storybook

### Historia: Default

**ID en Storybook:** `feedback-button-feedback--default`  
**URL Local:** http://localhost:6006/?path=/story/feedback-button-feedback--default  
**URL Vercel:** https://ubits-storybook10.vercel.app/?path=/story/feedback-button-feedback--default

**Descripción:**
Botón flotante de feedback con todos los controles disponibles. Permite configurar texto, icono, posición, offset, título del modal, opciones de sección, placeholder de comentarios y URL del webhook.

**Características mostradas:**
- Botón flotante con texto e icono
- 4 posiciones disponibles
- Offset configurable
- Modal con formulario
- Select de sección con opciones
- Textarea para comentarios
- Integración con webhook

**Código de ejemplo:**
```javascript
window.createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  offset: 24,
  modalTitle: 'Deja tu Feedback',
  sectionOptions: [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' },
    { value: 'aprendizaje', text: 'Aprendizaje' }
  ],
  defaultSection: 'home',
  commentPlaceholder: '¿Qué funciona bien? ¿Qué falta?',
  n8nWebhookUrl: 'https://tu-webhook.n8n.io/webhook/feedback',
  visible: true,
  onFeedbackSent: (data) => {
    console.log('Feedback enviado:', data);
  },
  onCancel: () => {
    console.log('Feedback cancelado');
  },
  onClose: () => {
    console.log('Modal cerrado');
  }
});
```

**Opciones utilizadas en la historia Default:**
- `text`: `'Feedback'` - Texto del botón
- `icon`: `'comment-dots'` - Icono del botón
- `position`: `'bottom-right'` - Posición inferior derecha
- `offset`: `24` - Offset de 24px desde el borde
- `modalTitle`: `'Deja tu Feedback'` - Título del modal
- `sectionOptions`: Array de opciones para el select
- `defaultSection`: `'home'` - Sección por defecto
- `commentPlaceholder`: Placeholder del textarea
- `n8nWebhookUrl`: URL del webhook (vacío por defecto)
- `visible`: `true` - Botón visible

---

## ⚙️ Opciones y Props Completas

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `text` | `string` | `''` | Texto del botón flotante (opcional) |
| `icon` | `string` | `'comment-dots'` | Icono del botón flotante (FontAwesome, sin prefijo `fa-`) |
| `position` | `string` | `'bottom-right'` | Posición del botón flotante. Opciones: `bottom-right`, `bottom-left`, `top-right`, `top-left` |
| `offset` | `number` | `24` | Offset desde el borde (en píxeles) |
| `modalTitle` | `string` | `'Deja tu Feedback'` | Título del modal de feedback |
| `sectionOptions` | `Array<{value: string, text: string}>` | `[]` | Opciones para el select de sección |
| `defaultSection` | `string` | `''` | Valor por defecto del select de sección |
| `commentPlaceholder` | `string` | `''` | Placeholder del textarea de comentarios |
| `n8nWebhookUrl` | `string` | `''` | URL del endpoint de n8n para enviar el feedback |
| `visible` | `boolean` | `true` | Si el botón está visible inicialmente |
| `onFeedbackSent` | `function` | - | Callback que se ejecuta cuando se envía el feedback |
| `onCancel` | `function` | - | Callback que se ejecuta cuando se cancela el feedback |
| `onClose` | `function` | - | Callback que se ejecuta cuando se cierra el modal |

### Posiciones

| Posición | Descripción |
|----------|-------------|
| `bottom-right` | Esquina inferior derecha (default) |
| `bottom-left` | Esquina inferior izquierda |
| `top-right` | Esquina superior derecha |
| `top-left` | Esquina superior izquierda |

### Estructura de sectionOptions

```typescript
interface SectionOption {
  value: string;  // Valor de la opción
  text: string;    // Texto visible de la opción
}
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Button Feedback Básico

```javascript
window.createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  visible: true
});
```

### Ejemplo 2: Button Feedback con Webhook

```javascript
window.createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  modalTitle: 'Deja tu Feedback',
  sectionOptions: [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' },
    { value: 'aprendizaje', text: 'Aprendizaje' }
  ],
  defaultSection: 'home',
  commentPlaceholder: '¿Qué funciona bien? ¿Qué falta?',
  n8nWebhookUrl: 'https://tu-webhook.n8n.io/webhook/feedback',
  onFeedbackSent: (data) => {
    console.log('Feedback enviado:', data);
    // Mostrar notificación de éxito
    showSuccessNotification('¡Gracias por tu feedback!');
  }
});
```

### Ejemplo 3: Button Feedback en Diferentes Posiciones

```javascript
// Inferior derecha
window.createButtonFeedback({
  text: 'Feedback',
  position: 'bottom-right'
});

// Inferior izquierda
window.createButtonFeedback({
  text: 'Feedback',
  position: 'bottom-left'
});

// Superior derecha
window.createButtonFeedback({
  text: 'Feedback',
  position: 'top-right'
});

// Superior izquierda
window.createButtonFeedback({
  text: 'Feedback',
  position: 'top-left'
});
```

### Ejemplo 4: Button Feedback con Offset Personalizado

```javascript
window.createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  offset: 40, // 40px desde el borde
  visible: true
});
```

### Ejemplo 5: Button Feedback Solo Icono

```javascript
window.createButtonFeedback({
  text: '', // Sin texto
  icon: 'comment-dots',
  position: 'bottom-right',
  visible: true
});
```

### Ejemplo 6: Button Feedback con Múltiples Secciones

```javascript
window.createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  modalTitle: 'Deja tu Feedback',
  sectionOptions: [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' },
    { value: 'aprendizaje', text: 'Aprendizaje' },
    { value: 'desempeno', text: 'Desempeño' },
    { value: 'diagnostico', text: 'Diagnóstico' },
    { value: 'reportes', text: 'Reportes' },
    { value: 'configuracion', text: 'Configuración' }
  ],
  defaultSection: 'home',
  commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
  n8nWebhookUrl: 'https://tu-webhook.n8n.io/webhook/feedback'
});
```

### Ejemplo 7: Button Feedback Oculto Inicialmente

```javascript
window.createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  visible: false, // Oculto inicialmente
  onFeedbackSent: (data) => {
    console.log('Feedback enviado:', data);
  }
});

// Mostrar después de 5 segundos
setTimeout(() => {
  // Mostrar el botón (requiere método adicional si está disponible)
  showFeedbackButton();
}, 5000);
```

### Ejemplo 8: Button Feedback con Callbacks Completos

```javascript
window.createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  modalTitle: 'Deja tu Feedback',
  sectionOptions: [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' }
  ],
  defaultSection: 'home',
  commentPlaceholder: '¿Qué funciona bien? ¿Qué falta?',
  n8nWebhookUrl: 'https://tu-webhook.n8n.io/webhook/feedback',
  onFeedbackSent: (data) => {
    console.log('Feedback enviado:', data);
    // Enviar a analytics
    trackEvent('feedback_sent', {
      section: data.section,
      commentLength: data.comment.length
    });
    // Mostrar notificación
    showSuccessNotification('¡Gracias por tu feedback!');
  },
  onCancel: () => {
    console.log('Feedback cancelado');
    // Enviar a analytics
    trackEvent('feedback_cancelled');
  },
  onClose: () => {
    console.log('Modal cerrado');
    // Enviar a analytics
    trackEvent('feedback_modal_closed');
  }
});
```

### Ejemplo 9: Button Feedback Dinámico

```javascript
let feedbackButtonInstance = null;

function initFeedbackButton() {
  // Destruir instancia anterior si existe
  if (feedbackButtonInstance) {
    feedbackButtonInstance.destroy();
  }
  
  // Crear nueva instancia
  feedbackButtonInstance = window.createButtonFeedback({
    text: 'Feedback',
    icon: 'comment-dots',
    position: 'bottom-right',
    modalTitle: 'Deja tu Feedback',
    sectionOptions: getCurrentSections(),
    defaultSection: getCurrentSection(),
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta?',
    n8nWebhookUrl: 'https://tu-webhook.n8n.io/webhook/feedback',
    onFeedbackSent: (data) => {
      console.log('Feedback enviado:', data);
      // Recargar opciones si es necesario
      initFeedbackButton();
    }
  });
}

// Obtener secciones actuales
function getCurrentSections() {
  // Lógica para obtener secciones dinámicamente
  return [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' }
  ];
}

// Obtener sección actual
function getCurrentSection() {
  // Lógica para obtener sección actual
  return window.location.pathname.split('/')[1] || 'home';
}

// Inicializar
initFeedbackButton();
```

### Ejemplo 10: Button Feedback con Validación

```javascript
window.createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  modalTitle: 'Deja tu Feedback',
  sectionOptions: [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' }
  ],
  defaultSection: 'home',
  commentPlaceholder: '¿Qué funciona bien? ¿Qué falta?',
  n8nWebhookUrl: 'https://tu-webhook.n8n.io/webhook/feedback',
  onFeedbackSent: (data) => {
    // Validar datos antes de enviar
    if (!data.section) {
      showErrorNotification('Por favor selecciona una sección');
      return;
    }
    
    if (!data.comment || data.comment.trim().length < 10) {
      showErrorNotification('Por favor escribe un comentario de al menos 10 caracteres');
      return;
    }
    
    // Enviar feedback
    console.log('Feedback enviado:', data);
    showSuccessNotification('¡Gracias por tu feedback!');
  }
});
```

---

## 🔄 Callbacks y Eventos

### onFeedbackSent

Se ejecuta cuando se envía el feedback exitosamente.

```javascript
onFeedbackSent: (data) => {
  console.log('Feedback enviado:', data);
  // data contiene:
  // - section: string (sección seleccionada)
  // - comment: string (comentario escrito)
  
  // Enviar a analytics
  trackEvent('feedback_sent', {
    section: data.section,
    commentLength: data.comment.length
  });
  
  // Mostrar notificación
  showSuccessNotification('¡Gracias por tu feedback!');
}
```

**Parámetros:**
- `data` (object): Objeto con `section` y `comment`

### onCancel

Se ejecuta cuando se cancela el feedback (botón cancelar o cerrar sin enviar).

```javascript
onCancel: () => {
  console.log('Feedback cancelado');
  // Enviar a analytics
  trackEvent('feedback_cancelled');
}
```

### onClose

Se ejecuta cuando se cierra el modal (cualquier forma de cerrar).

```javascript
onClose: () => {
  console.log('Modal cerrado');
  // Enviar a analytics
  trackEvent('feedback_modal_closed');
}
```

---

## 🎨 Características Visuales

### Botón Flotante

- Posición fija en la pantalla
- 4 posiciones disponibles (esquinas)
- Offset configurable desde el borde
- Icono y texto opcionales
- Estilo flotante con sombra

### Modal

- Modal centrado con formulario
- Título configurable
- Select de sección
- Textarea para comentarios
- Botones de acción (enviar, cancelar)
- Cierre con overlay o botón X

### Integración con n8n

- Envío automático a webhook de n8n
- Datos enviados: sección y comentario
- Manejo de errores de red

---

## 🚨 Errores Comunes

### Error 1: Webhook URL Inválida
**Problema:** Proporcionar una URL de webhook inválida  
**Solución:** Verificar que la URL sea válida y accesible

```javascript
// ❌ Incorrecto - URL inválida
n8nWebhookUrl: 'webhook-invalido'

// ✅ Correcto - URL válida
n8nWebhookUrl: 'https://tu-webhook.n8n.io/webhook/feedback'
```

### Error 2: SectionOptions sin Estructura Correcta
**Problema:** Proporcionar sectionOptions sin la estructura correcta  
**Solución:** Usar array de objetos con `value` y `text`

```javascript
// ❌ Incorrecto - estructura incorrecta
sectionOptions: ['home', 'encuestas']

// ✅ Correcto - estructura correcta
sectionOptions: [
  { value: 'home', text: 'Home' },
  { value: 'encuestas', text: 'Encuestas' }
]
```

### Error 3: Múltiples Instancias
**Problema:** Crear múltiples instancias del botón sin destruir las anteriores  
**Solución:** Destruir instancia anterior antes de crear una nueva

```javascript
// ❌ Incorrecto - múltiples instancias
window.createButtonFeedback({ text: 'Feedback 1' });
window.createButtonFeedback({ text: 'Feedback 2' }); // Duplicado

// ✅ Correcto - una sola instancia
let feedbackButton = window.createButtonFeedback({ text: 'Feedback' });
// Si necesitas recrear:
feedbackButton.destroy();
feedbackButton = window.createButtonFeedback({ text: 'Feedback' });
```

### Error 4: Offset Negativo o Muy Grande
**Problema:** Usar offset negativo o muy grande  
**Solución:** Usar valores positivos razonables (0-100px)

```javascript
// ❌ Incorrecto - offset negativo
offset: -10

// ✅ Correcto - offset positivo
offset: 24
```

---

## 📖 Referencias

- [Catálogo de componentes](../CATALOGO-COMPONENTES-UBITS.md)
- [Guía de uso de componentes](../../guias/referencia/GUIA-USO-COMPONENTES-UBITS.md)
- [Guía de identificación de componentes](../../guias/referencia/GUIA-IDENTIFICACION-COMPONENTES.md)
- [Guía para documentar desde Storybook](./GUIA-DOCUMENTAR-DESDE-STORYBOOK.md)
- [Modal](./feedback-modal.md) - Componente relacionado
- [Toast](./feedback-toast.md) - Componente relacionado (para notificaciones)

---

**Última actualización:** 2025-12-05  
**Storybook Local:** http://localhost:6006/  
**Storybook Vercel:** ubits-storybook10.vercel.app  
**Estado:** ✅ Documentación completa desde Storybook local

