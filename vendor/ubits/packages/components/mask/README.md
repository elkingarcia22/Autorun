# Mask Component

Componente de máscara para onboarding que destaca elementos específicos de la interfaz con un overlay oscuro y un Popover integrado.

## Características

- ✅ Overlay oscuro con "agujero" que destaca el elemento objetivo
- ✅ Popover integrado para mostrar información o instrucciones
- ✅ Posicionamiento automático del popover
- ✅ Soporte para scroll y resize dinámico
- ✅ Usa tokens UBITS exclusivamente
- ✅ Compatible con modo claro y oscuro

## Uso Básico

```typescript
import { createMask } from '@ubits/mask';

const maskInstance = createMask({
  targetElement: '#mi-elemento',
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es el contenido del popover',
    width: 'md',
    footerButtons: {
      primary: {
        label: 'Siguiente',
        onClick: () => {
          maskInstance.close();
        },
      },
    },
  },
  popoverPosition: 'auto',
  popoverOffset: 12,
  padding: 8,
  open: true,
});
```

## API

### `createMask(options: MaskOptions)`

Crea una instancia de máscara.

#### Opciones

- `targetElement`: Selector CSS o elemento HTML que se quiere destacar
- `popover`: Configuración del Popover (ver `PopoverOptions`)
- `padding`: Padding adicional alrededor del elemento destacado (por defecto: 8px)
- `closeOnOverlayClick`: Si se debe cerrar al hacer clic en el overlay (por defecto: true)
- `onClose`: Callback cuando se cierra la máscara
- `open`: Si la máscara está abierta inicialmente (por defecto: false)
- `popoverPosition`: Posición del popover ('auto', 'top', 'bottom', 'left', 'right')
- `popoverOffset`: Offset del popover desde el elemento destacado (por defecto: 12px)

#### Retorna

- `element`: Elemento HTML de la máscara
- `open()`: Abre la máscara
- `close()`: Cierra la máscara
- `updateTarget(newTarget)`: Actualiza el elemento objetivo
- `destroy()`: Destruye la máscara y limpia recursos

## Ejemplos

Ver las stories en Storybook para más ejemplos de uso.

