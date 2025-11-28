# Button Feedback Component

Botón flotante para obtener feedback de clientes con modal de formulario integrado. El componente permite a los usuarios enviar comentarios sobre la aplicación directamente desde cualquier página, y puede integrarse con webhooks de n8n para procesar el feedback automáticamente.

## Características

- ✅ Botón flotante con posicionamiento configurable (4 esquinas)
- ✅ Modal con formulario de feedback
- ✅ Select para seleccionar la sección actual
- ✅ Textarea para comentarios
- ✅ Integración con webhooks de n8n
- ✅ Callbacks personalizables
- ✅ Usa tokens UBITS exclusivamente
- ✅ Soporte para modo oscuro

## Instalación

```bash
npm install @ubits/button-feedback
```

## Uso Básico

```typescript
import { createButtonFeedback } from '@ubits/button-feedback';

const feedbackButton = createButtonFeedback({
  text: '', // Opcional: texto del botón
  icon: 'comment-dots', // Icono del botón
  position: 'bottom-right', // Posición del botón
  offset: 24, // Offset desde el borde
  modalTitle: 'Deja tu Feedback',
  sectionOptions: [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' },
  ],
  defaultSection: 'home',
  commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
  n8nWebhookUrl: 'https://tu-webhook-n8n.com/webhook',
  onFeedbackSent: (data) => {
    console.log('Feedback enviado:', data);
  },
});
```

## Opciones

### ButtonFeedbackOptions

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `containerId` | `string?` | `document.body` | ID del contenedor donde se renderizará el botón |
| `text` | `string?` | `''` | Texto del botón flotante (opcional) |
| `icon` | `string?` | `'comment-dots'` | Icono del botón flotante |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Posición del botón flotante |
| `offset` | `number?` | `24` | Offset desde el borde (en píxeles) |
| `modalTitle` | `string?` | `'Deja tu Feedback'` | Título del modal de feedback |
| `sectionOptions` | `Array<{value: string, text: string}>?` | `[]` | Opciones para el select de sección |
| `defaultSection` | `string?` | `''` | Valor por defecto del select de sección |
| `commentPlaceholder` | `string?` | `''` | Placeholder del textarea de comentarios |
| `n8nWebhookUrl` | `string?` | `''` | URL del endpoint de n8n para enviar el feedback |
| `onFeedbackSent` | `(data: {section: string, comment: string}) => void?` | `undefined` | Callback cuando se envía el feedback exitosamente |
| `onCancel` | `() => void?` | `undefined` | Callback cuando se cancela el feedback |
| `onClose` | `() => void?` | `undefined` | Callback cuando se cierra el modal |
| `visible` | `boolean?` | `true` | Si el botón está visible inicialmente |
| `className` | `string?` | `''` | Clases CSS adicionales |

## Métodos

El objeto retornado por `createButtonFeedback` incluye los siguientes métodos:

- `element`: El elemento HTML del botón flotante
- `show()`: Muestra el botón flotante
- `hide()`: Oculta el botón flotante
- `open()`: Abre el modal de feedback
- `close()`: Cierra el modal de feedback
- `destroy()`: Destruye el componente y limpia los recursos

## Integración con n8n

Para integrar el componente con n8n, simplemente proporciona la URL del webhook:

```typescript
createButtonFeedback({
  n8nWebhookUrl: 'https://tu-instancia-n8n.com/webhook/feedback',
  // ... otras opciones
});
```

El componente enviará un POST request con el siguiente payload:

```json
{
  "section": "home",
  "comment": "El usuario dejó este comentario...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "url": "https://tu-app.com/pagina-actual"
}
```

## Ejemplo Completo

```typescript
import { createButtonFeedback } from '@ubits/button-feedback';

const feedbackButton = createButtonFeedback({
  text: 'Feedback',
  icon: 'comment-dots',
  position: 'bottom-right',
  offset: 24,
  modalTitle: 'Deja tu Feedback',
  sectionOptions: [
    { value: 'home', text: 'Home' },
    { value: 'encuestas', text: 'Encuestas' },
    { value: 'aprendizaje', text: 'Aprendizaje' },
    { value: 'desempeno', text: 'Desempeño' },
    { value: 'diagnostico', text: 'Diagnóstico' },
  ],
  defaultSection: 'home',
  commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?',
  n8nWebhookUrl: 'https://tu-webhook-n8n.com/webhook',
  onFeedbackSent: (data) => {
    console.log('Feedback enviado:', data);
    // Aquí puedes mostrar un toast de éxito, etc.
  },
  onCancel: () => {
    console.log('Feedback cancelado');
  },
  onClose: () => {
    console.log('Modal cerrado');
  },
});

// Controlar visibilidad
feedbackButton.hide(); // Ocultar
feedbackButton.show(); // Mostrar
feedbackButton.open(); // Abrir modal manualmente
feedbackButton.destroy(); // Limpiar recursos
```

## Estilos

El componente usa tokens UBITS exclusivamente. Los estilos se cargan automáticamente al importar el componente.

### Tokens Utilizados

- `--modifiers-normal-color-light-accent-brand`: Color de fondo del botón
- `--modifiers-normal-color-light-fg-on-accent`: Color del texto/icono del botón
- `--ubits-spacing-*`: Espaciado
- `--ubits-border-radius-*`: Bordes redondeados
- `--ubits-body-*-font-size`: Tamaños de fuente

## Modo Oscuro

El componente soporta modo oscuro automáticamente usando los tokens UBITS. No se requiere configuración adicional.

## Accesibilidad

- El botón incluye `aria-label="Deja tu feedback"`
- El modal es accesible mediante teclado (ESC para cerrar)
- Los inputs del formulario siguen las mejores prácticas de accesibilidad

## Dependencias

- `@ubits/button`: Para los botones del modal
- `@ubits/input`: Para el select y textarea del formulario
- `@ubits/modal`: Para el modal de feedback

