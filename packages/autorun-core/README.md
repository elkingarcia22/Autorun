# @autorun/core

Autorun Hub - Orquestador central de add-ons

## Descripción

Este es el núcleo (core) de Autorun que actúa como un hub central para orquestar todos los add-ons del sistema.

## Estado

🚧 **En desarrollo** - Estructura base creada, implementación en progreso.

## Uso

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub('autorun.config.json');
await hub.initialize();
```

## Arquitectura

- `AutorunHub` - Orquestador principal
- `AddonRegistry` - Registro de add-ons disponibles
- `AddonLoader` - Cargador de add-ons
- `ConfigManager` - Gestor de configuración

