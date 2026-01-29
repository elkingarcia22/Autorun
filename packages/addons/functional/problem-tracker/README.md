# Problem Tracker Add-on

Sistema automático de captura y tracking de problemas y soluciones durante el desarrollo con Autorun.

## 🎯 Características

- ✅ **Detección Automática:** Detecta problemas comunes automáticamente
- ✅ **Registro Manual:** Registra problemas y soluciones manualmente
- ✅ **Búsqueda Inteligente:** Busca problemas similares y soluciones anteriores
- ✅ **Sugerencias Automáticas:** Sugiere soluciones basadas en problemas anteriores
- ✅ **Almacenamiento Local:** Guarda problemas y soluciones en formato Markdown
- ✅ **Índice JSON:** Mantiene un índice actualizado de todos los problemas y soluciones

## 📦 Instalación

El add-on se instala automáticamente cuando se activa en el wizard de inicialización o manualmente:

```bash
# Activar en el wizard
npm run autorun-init
# Seleccionar "problem-tracker" en la lista de add-ons
```

## ⚙️ Configuración

### Configuración Básica

```json
{
  "autorun": {
    "addons": {
      "active": ["problem-tracker"],
      "config": {
        "problem-tracker": {
          "enabled": true,
          "persistLocally": true,
          "problemsDirectory": "docs/problems-solutions",
          "indexFile": "docs/problems-solutions/index.json",
          "autoDetectProblems": true,
          "autoSuggestSolutions": true,
          "autoUpdateGuides": false,
          "categories": [
            "headersection",
            "contentmanager",
            "datatable",
            "componentes",
            "otros"
          ]
        }
      }
    }
  }
}
```

### Opciones de Configuración

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Habilita/deshabilita el add-on |
| `persistLocally` | `boolean` | `true` | Guarda problemas y soluciones en archivos locales |
| `problemsDirectory` | `string` | `"docs/problems-solutions"` | Directorio donde se guardan los problemas y soluciones |
| `indexFile` | `string` | `"docs/problems-solutions/index.json"` | Archivo del índice JSON |
| `autoDetectProblems` | `boolean` | `true` | Detecta problemas automáticamente |
| `autoSuggestSolutions` | `boolean` | `true` | Sugiere soluciones automáticamente |
| `autoUpdateGuides` | `boolean` | `false` | Actualiza guías automáticamente (futuro) |
| `categories` | `string[]` | `["headersection", "contentmanager", "datatable", "componentes", "otros"]` | Categorías disponibles |

## 🚀 Uso

### Uso Programático

```typescript
import { AutorunHub } from '@autorun/core';

const hub = new AutorunHub();
await hub.initialize();
await hub.activateAddon('problem-tracker');

// Obtener servicio
const tracker = hub.getService('problem-tracker', 'registerProblem');

// Registrar un problema
const problem = await tracker.registerProblem({
  categoria: 'ContentManager',
  titulo: 'HeaderSection Aparece Cuando No Debería',
  descripcion: 'ContentManager crea HeaderSection automáticamente...',
  contexto: {
    donde_ocurre: 'content-manager.js',
    cuando_ocurre: 'Al actualizar contenido',
  },
  estado: 'pendiente',
});

// Registrar una solución
const solution = await tracker.registerSolution({
  problema_id: problem.id,
  categoria: 'ContentManager',
  titulo: 'Interceptar ContentManager.updateContent',
  descripcion: 'Interceptar ContentManager.updateContent para eliminar HeaderSection...',
  verificado: true,
});

// Buscar problemas similares
const similarProblems = tracker.searchSimilarProblems('HeaderSection', 'ContentManager');

// Sugerir soluciones
const suggestions = tracker.suggestSolutions(problem);
```

### Detección Automática

El add-on detecta automáticamente problemas comunes usando patrones:

- **HeaderSection aparece cuando no debería**
- **ContentManager elimina elementos**
- **DataTable no renderiza**
- **Componente no funciona**

### Estructura de Archivos

```
docs/problems-solutions/
├── index.json (índice de todos los problemas y soluciones)
├── headersection/
│   ├── issue-001.md
│   └── solution-001.md
├── contentmanager/
│   ├── issue-001.md
│   └── solution-001.md
└── ...
```

## 📋 API

### Servicios Disponibles

#### `registerProblem(problem)`
Registra un problema manualmente.

#### `registerSolution(solution)`
Registra una solución manualmente.

#### `detectProblem(description, context?)`
Detecta un problema automáticamente basado en la descripción.

#### `searchSimilarProblems(query, category?)`
Busca problemas similares.

#### `searchSolutions(problemId)`
Busca soluciones para un problema específico.

#### `suggestSolutions(problem)`
Sugiere soluciones para un problema.

#### `getStatus()`
Obtiene el estado del servicio.

#### `getConfig()`
Obtiene la configuración actual.

#### `updateConfig(config)`
Actualiza la configuración.

#### `setEnabled(enabled)`
Habilita/deshabilita el servicio.

## 🔍 Ejemplos

### Ejemplo 1: Registrar Problema y Solución

```typescript
// Registrar problema
const problem = await tracker.registerProblem({
  categoria: 'ContentManager',
  titulo: 'HeaderSection Aparece Cuando No Debería',
  descripcion: 'ContentManager crea HeaderSection automáticamente...',
  contexto: {
    donde_ocurre: 'content-manager.js línea 728',
    cuando_ocurre: 'Al llamar updateContent()',
  },
  codigo_problematico: 'if (section !== "admin") { ... }',
  estado: 'pendiente',
  tags: ['HeaderSection', 'ContentManager'],
});

// Registrar solución
const solution = await tracker.registerSolution({
  problema_id: problem.id,
  categoria: 'ContentManager',
  titulo: 'Interceptar ContentManager.updateContent',
  descripcion: 'Interceptar ContentManager.updateContent para eliminar HeaderSection...',
  codigo_antes: '// Código antes',
  codigo_despues: '// Código después',
  verificado: true,
  guia: 'docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md',
});
```

### Ejemplo 2: Buscar Soluciones Anteriores

```typescript
// Buscar problemas similares
const similarProblems = tracker.searchSimilarProblems('HeaderSection');

// Buscar soluciones para un problema
const solutions = tracker.searchSolutions(problem.id);

// Sugerir soluciones automáticamente
const suggestions = tracker.suggestSolutions(problem);
```

## 🔗 Referencias

- **Guía de uso:** `docs/guias/implementacion/GUIA-SISTEMA-AUTOMATICO-PROBLEMAS-SOLUCIONES.md`
- **Propuesta:** `docs/guias/implementacion/PROPUESTA-SISTEMA-AUTOMATICO-PROBLEMAS-SOLUCIONES.md`
- **Problemas y soluciones:** `docs/problems-solutions/`

## 📝 Notas

- El add-on guarda problemas y soluciones en formato Markdown para fácil lectura
- El índice JSON se actualiza automáticamente
- Las sugerencias se basan en problemas similares resueltos anteriormente
- La detección automática usa patrones predefinidos (se puede extender)

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0








