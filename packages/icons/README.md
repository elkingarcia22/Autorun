# @ubits/icons

Sistema de iconos UBITS como add-on intercambiable.

## 🎯 Características

- ✅ **Add-on intercambiable**: Puedes cambiar FontAwesome por Lucide sin romper nada
- ✅ **Funciona sin token npm**: Usa archivos locales de FontAwesome
- ✅ **Búsqueda semántica**: "crear" encuentra automáticamente `fa-plus`
- ✅ **Tree-shaking**: Solo incluye iconos usados (futuro)
- ✅ **TypeScript**: Autocompletado y type safety

## 📦 Instalación

```bash
# Desde la raíz del monorepo
pnpm install
```

## 🚀 Uso

### Inicialización

```typescript
import { initializeIcons, renderIcon } from '@ubits/icons';

// Inicializar una vez al inicio de la app
await initializeIcons('fontawesome');
```

### Renderizar iconos

```typescript
import { renderIcon } from '@ubits/icons';

// Renderizar icono
const html = renderIcon('plus');
// → '<i class="far fa-plus"></i>'

// Con opciones
const html = renderIcon('plus', {
  style: 'solid',
  size: 'lg',
  class: 'mi-clase'
});
// → '<i class="fas fa-plus fa-lg mi-clase"></i>'
```

### Búsqueda semántica

```typescript
import { searchIcons } from '@ubits/icons';

const results = searchIcons('crear');
// → [{ name: 'plus', score: 10, keywords: [...] }, ...]
```

### Generar botón con icono

```typescript
import { generateButtonWithIcon } from '@ubits/icons';

const button = generateButtonWithIcon('crear', 'Crear', 'primary', 'md');
// → HTML completo del botón UBITS con icono
```

## 🔧 Desarrollo

### Generar catálogo

El catálogo se genera automáticamente desde `fontawesome-icons.css`:

```bash
npm run generate-catalog
```

Esto genera:
- `src/catalog/icons.json` - Catálogo completo
- `src/catalog/search-index.json` - Índice de búsqueda

### Build

```bash
npm run build
```

## 📁 Estructura

```
packages/icons/
├── src/
│   ├── core/
│   │   ├── IconProvider.ts    # Interfaz base
│   │   └── IconService.ts     # Factory/Singleton
│   ├── providers/
│   │   └── FontAwesomeProvider.ts  # Implementación FA
│   ├── catalog/
│   │   ├── icons.json         # Catálogo (generado)
│   │   └── search-index.json  # Índice (generado)
│   └── index.ts                # API pública
├── dist/
│   └── fontawesome.css        # CSS copiado
└── scripts/
    └── generate-catalog.js     # Genera catálogo
```

## 🔄 Cambiar de Proveedor

El sistema está diseñado para ser intercambiable:

```typescript
// Cambiar de FontAwesome a Lucide (cuando se implemente)
await switchIconProvider('lucide');

// Todos los componentes existentes siguen funcionando
renderIcon('plus'); // Ahora usa Lucide
```

## 📝 Notas

- Actualmente usa archivos locales de FontAwesome (sin token npm)
- Cuando tengas el token npm, puedes migrar fácilmente usando `@fortawesome/pro-*` packages
- El catálogo se genera desde el CSS existente en `template-ubits/fontawesome-icons.css`

