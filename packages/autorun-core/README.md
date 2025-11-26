# @autorun/core

Autorun Hub - Orquestador central de add-ons

## Descripción

Este es el núcleo (core) de Autorun que actúa como un hub central para orquestar todos los add-ons del sistema. Proporciona un sistema modular y extensible para gestionar componentes UI, add-ons funcionales, tokens de diseño y más.

## Estado

✅ **Funcional** - El hub está completo y listo para usar.

## Uso Básico

```typescript
import { AutorunHub } from '@autorun/core';

// Crear instancia del hub
const hub = new AutorunHub('autorun.config.json');

// Inicializar (carga add-ons configurados)
await hub.initialize();

// Activar un add-on
await hub.activateAddon('github');

// Obtener servicio de un add-on
const commitService = hub.getService('github', 'commit');
await commitService(['archivo1.ts', 'archivo2.ts']);

// Emitir evento a todos los add-ons
await hub.emitEvent('fileChange', { path: 'src/App.tsx' });
```

## Inicialización con Wizard

```typescript
import { InitializationWizard, AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
const wizard = new InitializationWizard(hub);

// Ejecutar wizard interactivo
const result = await wizard.start();
// El wizard guía al usuario para configurar el proyecto
```

## Arquitectura

### Clases Principales

- **`AutorunHub`** - Orquestador principal que gestiona todos los add-ons
- **`AddonRegistry`** - Registro de add-ons disponibles
- **`AddonLoader`** - Cargador dinámico de add-ons
- **`ConfigManager`** - Gestor de configuración del proyecto
- **`AddonConflictDetector`** - Detecta conflictos entre add-ons

### Sistema de Componentes

- **`ComponentLoader`** - Carga componentes desde Storybook
- **`ComponentManager`** - Gestiona componentes cargados
- **`initComponents`** - Inicializa sistema global de componentes

### Wizard de Inicialización

- **`InitializationWizard`** - Wizard interactivo para setup
- **`UBITSPreset`** - Preset predefinido para proyectos UBITS
- **`ModuleManager`** - Gestión de módulos y sidebar
- **`SubNavManager`** - Gestión de sub-navegación
- **`CanvasCreator`** - Crea lienzos de prototipado
- **`ComponentValidator`** - Valida componentes contra estándares UBITS

## Características

- ✅ **Gestión de Add-ons**: Activar, desactivar, registrar add-ons
- ✅ **Detección de Conflictos**: Previene activar add-ons que se solapan
- ✅ **Sistema de Eventos**: Emite eventos a add-ons funcionales
- ✅ **Dependencias**: Resuelve orden de carga automáticamente
- ✅ **Servicios**: Acceso a servicios proporcionados por add-ons
- ✅ **Wizard Interactivo**: Setup guiado para proyectos UBITS
- ✅ **Validación de Componentes**: Asegura estándares UBITS

## Documentación

- [Revisión Estado del Hub](../../docs/REVISION-ESTADO-HUB.md)
- [Detección de Conflictos](../../docs/DETECCION-CONFLICTOS-ADDONS.md)
- [Preset UBITS Optimizado](../../docs/PRESET-UBITS-OPTIMIZADO.md)
- [Guía Setup UBITS](../../docs/GUIA-SETUP-UBITS.md)

