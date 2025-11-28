# @ubits/input

Componente Input UBITS como add-on intercambiable con todos los tipos, estados, tamaños y funcionalidades.

## Características

- ✅ 11 tipos de input: text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar
- ✅ 4 tamaños: XS (28px), SM (32px), MD (40px), LG (48px)
- ✅ 6 estados: default, hover, focus, active, invalid, disabled
- ✅ Iconos izquierdo/derecho con padding dinámico
- ✅ Helper text y contador de caracteres (independientes)
- ✅ Texto mandatory/optional
- ✅ Funcionalidades especiales: password toggle, search clear, autocomplete, select scroll infinito, calendar date picker

## Instalación

```bash
pnpm add @ubits/input
```

## Uso

### JavaScript/TypeScript

```typescript
import { createInput } from '@ubits/input';

const input = createInput({
  containerId: 'my-input',
  label: 'Nombre',
  placeholder: 'Escribe tu nombre',
  size: 'md',
  type: 'text'
});
```

### Web Component

```html
<ubits-input
  container-id="my-input"
  label="Nombre"
  placeholder="Escribe tu nombre"
  size="md"
  type="text"
></ubits-input>
```

## API

Ver documentación completa en `docs/ANALISIS-INPUT-COMPLETO.md`.

