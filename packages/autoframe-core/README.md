# @autoframe/core

Autoframe Hub - Orquestador central de add-ons

## Descripción

Este es el núcleo (core) de Autoframe que actúa como un hub central para orquestar todos los add-ons del sistema.

## Estado

🚧 **En desarrollo** - Estructura base creada, implementación en progreso.

## Uso

```typescript
import { AutoframeHub } from '@autoframe/core';

const hub = new AutoframeHub('.ubits/project-config.json');
await hub.initialize();
```

## Arquitectura

- `AutoframeHub` - Orquestador principal
- `AddonRegistry` - Registro de add-ons disponibles
- `AddonLoader` - Cargador de add-ons
- `ConfigManager` - Gestor de configuración

