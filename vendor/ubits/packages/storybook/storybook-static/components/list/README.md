# @ubits/list

Componente List UBITS como add-on intercambiable.

## Instalación

```bash
pnpm add @ubits/list
```

## Uso

### Como Web Component

```html
<ubits-list id="my-list" max-height="400px" items='[
  {"label": "Label 1", "state": "default"},
  {"label": "Label 2", "state": "active"},
  {"label": "Label 3", "state": "disabled"},
  {"label": "Label 4", "state": "default"}
]'></ubits-list>
```

### Programáticamente

```typescript
import { createList } from '@ubits/list';

createList({
  containerId: 'my-list-container',
  items: [
    { label: 'Label 1', state: 'default' },
    { label: 'Label 2', state: 'active' },
    { label: 'Label 3', state: 'disabled' },
    { label: 'Label 4', state: 'default' }
  ],
  maxHeight: '400px',
  onSelectionChange: (item, index) => {
    console.log('Selected:', item, index);
  }
});
```

## Estados

- **default**: Estado por defecto (texto oscuro, fondo blanco)
- **hover**: Estado hover (texto azul, fondo azul claro)
- **active**: Estado activo/seleccionado (texto azul, fondo azul claro)
- **disabled**: Estado deshabilitado (texto gris claro, fondo gris muy claro)

## Características

- ✅ Soporte para scrollbar personalizado
- ✅ Navegación por teclado (Arrow keys, Home, End, Enter, Space)
- ✅ Selección simple o múltiple
- ✅ Accesibilidad completa (ARIA roles y states)
- ✅ Soporte para modo oscuro
- ✅ Transiciones suaves

