# 🔍 Análisis Completo: Fuentes de Información del Storybook UBITS

> **Fecha:** 2025-01-23  
> **Repositorio:** https://github.com/elkingarcia22/UBITS  
> **Ubicación Local:** `vendor/ubits/packages/storybook/`

---

## ✅ Confirmación: Sí, Estamos Usando Este Storybook

**Repositorio:** https://github.com/elkingarcia22/UBITS  
**Ubicación Local:** `vendor/ubits/packages/storybook/`  
**URL Desplegada:** `https://ubits-storybook10.vercel.app/`

---

## 📋 Estructura Completa del Storybook UBITS

### **Ubicación de Archivos:**

```
vendor/ubits/packages/storybook/
├── stories/
│   ├── components/              # ✅ Historias de componentes
│   │   ├── Button/
│   │   │   └── Button.stories.ts
│   │   ├── DataTable/
│   │   │   └── DataTable.stories.ts
│   │   ├── Input/
│   │   │   └── Input.stories.ts
│   │   └── ...
│   ├── TokensUBITS/             # ✅ Historias de tokens
│   └── _shared/
│       └── ubitsContract.ts     # ✅ Helper para contratos UBITS
├── .storybook/
│   ├── main.ts                  # Configuración principal
│   └── preview.ts               # Preview y estilos globales
└── package.json
```

---

## 🎯 Fuentes de Información Disponibles

### **1. Archivos `.stories.ts` - Fuente Principal** ⭐

**Ubicación:** `vendor/ubits/packages/storybook/stories/components/{Component}/{Component}.stories.ts`

**Estructura Completa:**

```typescript
const meta: Meta<ComponentOptions> = {
  title: 'Categoría/Componente',        // ✅ Título y categoría
  tags: ['autodocs'],                    // ✅ Auto-documentación
  
  parameters: {
    docs: {
      description: {
        component: '...'                  // ✅ Descripción del componente
      }
    },
    
    // ⭐ CONTRATO UBITS COMPLETO
    ubits: createUBITSContract({
      componentId: '🧩-ux-button',        // ✅ ID único del componente
      
      api: {
        create: 'window.UBITS.Button.create',  // ✅ Función de creación
        tag: '<ubits-button>',                 // ✅ Web Component tag
      },
      
      dependsOn: {
        required: [],                    // ✅ Componentes requeridos
        optional: ['🧩-ux-icon'],        // ✅ Componentes opcionales
      },
      
      internals: [],                     // ✅ Componentes internos privados
      
      tokensUsed: [                      // ✅ Tokens CSS usados
        '--modifiers-normal-color-light-accent-brand',
        '--ubits-spacing-md',
      ],
      
      rules: {
        forbidHardcodedColors: true,     // ✅ Reglas de validación
        forbiddenPatterns: ['rgb(', '#'],
        requiredProps: ['variant', 'text'], // ✅ Props requeridas
      },
    }),
  },
  
  // ⭐ VALORES POR DEFECTO
  args: {
    variant: 'primary',                 // ✅ Default: 'primary'
    size: 'md',                          // ✅ Default: 'md'
    text: 'Guardar',                     // ✅ Default: 'Guardar'
    icon: undefined,                     // ✅ Default: undefined
    disabled: false,                      // ✅ Default: false
    // ... todos los defaults
  },
  
  // ⭐ TIPOS Y CONTROLES COMPLETOS
  argTypes: {
    variant: {
      control: { type: 'select' },      // ✅ Tipo de control
      options: ['primary', 'secondary', 'tertiary'], // ✅ Opciones (enum)
      description: 'Variante del botón', // ✅ Descripción
      table: {
        defaultValue: { summary: 'primary' }, // ✅ Default en tabla
        type: { summary: 'primary | secondary | tertiary' }, // ✅ Tipo en tabla
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'], // ✅ Enum completo
      description: 'Tamaño del botón',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    text: {
      control: { type: 'text' },         // ✅ Tipo: string
      description: 'Texto del botón',
    },
    disabled: {
      control: { type: 'boolean' },     // ✅ Tipo: boolean
      description: 'Deshabilitar el botón',
    },
    // ... todos los argTypes
  },
};

// ⭐ HISTORIAS ESPECÍFICAS
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',  // ✅ Historia de implementación
  args: { /* args explícitos */ },
  parameters: {
    docs: {
      source: {
        code: `window.UBITS.Button.create({...})`, // ✅ Código exacto
      },
    },
  },
};

export const Default: Story = {
  // ✅ Historia default con todos los controles
};
```

---

## 📊 Información Disponible por Fuente

### **A. Desde `meta.parameters.ubits` (Contrato UBITS)**

✅ **Información Disponible:**
- `componentId` - ID único del componente (ej: `'🧩-ux-button'`)
- `api.create` - Función de creación (ej: `'window.UBITS.Button.create'`)
- `api.tag` - Web Component tag (ej: `'<ubits-button>'`)
- `dependsOn.required` - Componentes requeridos
- `dependsOn.optional` - Componentes opcionales
- `internals` - Componentes internos privados
- `tokensUsed` - Lista completa de tokens CSS usados
- `rules.requiredProps` - Props requeridas
- `rules.forbiddenPatterns` - Patrones prohibidos

**Ejemplo:**
```typescript
ubits: {
  componentId: '🧩-ux-button',
  api: {
    create: 'window.UBITS.Button.create',
    tag: '<ubits-button>',
  },
  dependsOn: {
    required: [],
    optional: ['🧩-ux-icon', '🧩-ux-tooltip'],
  },
  tokensUsed: [
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-color-light-bg-active-button',
  ],
  rules: {
    requiredProps: ['variant', 'text'],
  },
}
```

---

### **B. Desde `meta.args` (Valores por Defecto)**

✅ **Información Disponible:**
- Todos los valores por defecto de cada prop
- Valores explícitos (no inferidos)

**Ejemplo:**
```typescript
args: {
  variant: 'primary',      // ✅ Default: 'primary'
  size: 'md',              // ✅ Default: 'md'
  text: 'Guardar',         // ✅ Default: 'Guardar'
  icon: undefined,          // ✅ Default: undefined
  disabled: false,          // ✅ Default: false
  loading: false,          // ✅ Default: false
}
```

---

### **C. Desde `meta.argTypes` (Tipos y Controles)**

✅ **Información Disponible:**
- **Tipo de control:** `'select'`, `'text'`, `'boolean'`, `'object'`, etc.
- **Opciones (enum):** Array completo de valores válidos
- **Descripción:** Descripción de cada prop
- **Tipo TypeScript:** En `table.type.summary`
- **Default:** En `table.defaultValue.summary`
- **Categoría:** En `table.category`

**Ejemplo:**
```typescript
argTypes: {
  variant: {
    control: { type: 'select' },                    // ✅ Tipo: select (enum)
    options: ['primary', 'secondary', 'tertiary'],  // ✅ Enum completo
    description: 'Variante del botón',              // ✅ Descripción
    table: {
      defaultValue: { summary: 'primary' },        // ✅ Default
      type: { summary: 'primary | secondary | tertiary' }, // ✅ Tipo TS
    },
  },
  size: {
    control: { type: 'select' },
    options: ['xs', 'sm', 'md', 'lg'],              // ✅ Enum
    table: {
      defaultValue: { summary: 'md' },
      type: { summary: 'xs | sm | md | lg' },
    },
  },
  text: {
    control: { type: 'text' },                      // ✅ Tipo: string
    description: 'Texto del botón',
  },
  disabled: {
    control: { type: 'boolean' },                   // ✅ Tipo: boolean
    description: 'Deshabilitar el botón',
  },
}
```

---

### **D. Desde `parameters.docs` (Documentación)**

✅ **Información Disponible:**
- Descripción completa del componente
- Documentación de uso
- Ejemplos

**Ejemplo:**
```typescript
parameters: {
  docs: {
    description: {
      component: 'Componente Button UBITS con múltiples variantes...',
    },
  },
}
```

---

### **E. Desde Historia `Implementation` (Código Exacto)**

✅ **Información Disponible:**
- Código exacto de implementación en `parameters.docs.source.code`
- Args explícitos (no depende de defaults)
- Estado estable (sin datos aleatorios)

**Ejemplo:**
```typescript
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    variant: 'secondary',
    size: 'md',
    text: 'Guardar',
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: `window.UBITS.Button.create({
  variant: 'secondary',
  size: 'md',
  text: 'Guardar',
  disabled: false
});`,  // ✅ Código exacto listo para copiar
      },
    },
  },
};
```

---

### **F. Desde Historia `Default` (Todos los Controles)**

✅ **Información Disponible:**
- Todos los props con valores de ejemplo
- Renderizado completo con todos los controles
- Vista previa interactiva

---

### **G. Desde Archivos de Tipos TypeScript**

**Ubicación:** `vendor/ubits/packages/components/{component}/src/types/{Component}Options.ts`

✅ **Información Disponible:**
- Tipos TypeScript completos
- JSDoc con descripciones
- `@default` en comentarios
- Tipos union (ej: `'primary' | 'secondary' | 'tertiary'`)

**Ejemplo:**
```typescript
export interface ButtonOptions {
  /**
   * Variante del botón
   * @default 'primary'
   */
  variant?: ButtonVariant;  // ✅ Tipo: ButtonVariant = 'primary' | 'secondary' | 'tertiary'
  
  /**
   * Tamaño del botón
   * @default 'md'
   */
  size?: ButtonSize;  // ✅ Tipo: ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  text?: string;  // ✅ Tipo: string
  disabled?: boolean;  // ✅ Tipo: boolean
}
```

---

### **H. Desde README.md**

**Ubicación:** `vendor/ubits/packages/components/{component}/README.md`

✅ **Información Disponible:**
- Ejemplos de código HTML
- Ejemplos de uso JavaScript
- Documentación completa
- Lista de dependencias CSS/JS

---

### **I. Desde Provider.ts**

**Ubicación:** `vendor/ubits/packages/components/{component}/src/{Component}Provider.ts`

✅ **Información Disponible:**
- Función `render{Component}()` - Genera HTML
- Función `create{Component}()` - Crea elemento DOM
- Lógica de renderizado
- Valores por defecto en código

---

## 🎯 Mapeo Completo: Qué Información Obtener de Dónde

| Información | Fuente Principal | Fuente Secundaria |
|-------------|------------------|-------------------|
| **ID del Componente** | `meta.parameters.ubits.componentId` | - |
| **API (create/tag)** | `meta.parameters.ubits.api` | - |
| **Props Requeridas** | `meta.parameters.ubits.rules.requiredProps` | `{Component}Options.ts` (sin `?`) |
| **Props Opcionales** | `meta.argTypes` (todas excepto required) | `{Component}Options.ts` (con `?`) |
| **Tipos de Props** | `meta.argTypes[prop].control.type` + `table.type.summary` | `{Component}Options.ts` |
| **Enums/Opciones** | `meta.argTypes[prop].options` | `{Component}Options.ts` (tipos union) |
| **Defaults** | `meta.args[prop]` | `meta.argTypes[prop].table.defaultValue` |
| **Descripciones** | `meta.argTypes[prop].description` | `{Component}Options.ts` (JSDoc) |
| **Tokens Usados** | `meta.parameters.ubits.tokensUsed` | - |
| **Dependencias** | `meta.parameters.ubits.dependsOn` | - |
| **Código Exacto** | `Implementation.parameters.docs.source.code` | README.md (ejemplos) |
| **Documentación** | `meta.parameters.docs.description` | README.md |
| **Ejemplos HTML** | README.md | `Implementation` story |
| **Función Render** | Provider.ts (`render{Component}()`) | - |

---

## 📋 Checklist: Qué Extraer de Cada Componente

### **Desde `.stories.ts`:**

- [ ] ✅ `meta.parameters.ubits.componentId`
- [ ] ✅ `meta.parameters.ubits.api.create`
- [ ] ✅ `meta.parameters.ubits.api.tag`
- [ ] ✅ `meta.parameters.ubits.dependsOn.required`
- [ ] ✅ `meta.parameters.ubits.dependsOn.optional`
- [ ] ✅ `meta.parameters.ubits.tokensUsed`
- [ ] ✅ `meta.parameters.ubits.rules.requiredProps`
- [ ] ✅ `meta.args` (todos los defaults)
- [ ] ✅ `meta.argTypes` (todos los tipos y controles)
- [ ] ✅ `Implementation.parameters.docs.source.code` (código exacto)
- [ ] ✅ `meta.parameters.docs.description` (documentación)

### **Desde `{Component}Options.ts`:**

- [ ] ✅ Tipos TypeScript completos
- [ ] ✅ JSDoc con descripciones
- [ ] ✅ `@default` en comentarios
- [ ] ✅ Tipos union (enums)

### **Desde `README.md`:**

- [ ] ✅ Ejemplos HTML
- [ ] ✅ Ejemplos JavaScript
- [ ] ✅ Dependencias CSS/JS
- [ ] ✅ Documentación adicional

### **Desde `{Component}Provider.ts`:**

- [ ] ✅ Función `render{Component}()`
- [ ] ✅ Función `create{Component}()`
- [ ] ✅ Valores por defecto en código

---

## 🚀 Plan de Actualización de la POC

### **Actualizar File Extractor:**

1. ✅ Buscar archivos `.stories.ts` en `vendor/ubits/packages/storybook/stories/components/`
2. ✅ Buscar archivos `{Component}Options.ts` en `vendor/ubits/packages/components/`
3. ✅ Buscar `README.md` en `vendor/ubits/packages/components/`
4. ✅ Buscar `{Component}Provider.ts` en `vendor/ubits/packages/components/`

### **Actualizar Code Parser:**

1. ✅ Parsear `meta.parameters.ubits` (contrato completo)
2. ✅ Parsear `meta.args` (defaults)
3. ✅ Parsear `meta.argTypes` (tipos, enums, descripciones)
4. ✅ Parsear `Implementation.parameters.docs.source.code` (código exacto)
5. ✅ Parsear tipos desde `{Component}Options.ts`

### **Actualizar HTML Generator:**

1. ✅ Usar código exacto de `Implementation` story
2. ✅ Usar ejemplos de README como fallback
3. ✅ Incluir tokens desde `tokensUsed`
4. ✅ Incluir dependencias desde `dependsOn`

---

## 📊 Ejemplo Completo: Button

### **Información Extraída:**

**Desde `Button.stories.ts`:**
- ✅ ComponentId: `'🧩-ux-button'`
- ✅ API Create: `'window.UBITS.Button.create'`
- ✅ API Tag: `'<ubits-button>'`
- ✅ Props Requeridas: `['variant', 'text']`
- ✅ Tokens: `['--modifiers-normal-color-light-accent-brand', ...]`
- ✅ Dependencias: `{ required: [], optional: ['🧩-ux-icon', '🧩-ux-tooltip'] }`

**Desde `meta.args`:**
- ✅ Defaults: `{ variant: 'primary', size: 'md', text: 'Guardar', ... }`

**Desde `meta.argTypes`:**
- ✅ `variant`: `{ type: 'select', options: ['primary', 'secondary', 'tertiary'], default: 'primary' }`
- ✅ `size`: `{ type: 'select', options: ['xs', 'sm', 'md', 'lg'], default: 'md' }`
- ✅ `text`: `{ type: 'text' }`
- ✅ `disabled`: `{ type: 'boolean', default: false }`

**Desde `Implementation` story:**
- ✅ Código exacto: `window.UBITS.Button.create({ variant: 'secondary', size: 'md', text: 'Guardar', disabled: false });`

**Desde `ButtonOptions.ts`:**
- ✅ Tipos: `ButtonVariant = 'primary' | 'secondary' | 'tertiary'`
- ✅ JSDoc: Descripciones completas
- ✅ `@default`: Valores por defecto

---

## ✅ Conclusión

**Sí, estamos usando el Storybook de https://github.com/elkingarcia22/UBITS**

**Todas las fuentes de información están disponibles:**
- ✅ Tokens listados → `meta.parameters.ubits.tokensUsed`
- ✅ Componentes → `meta.parameters.ubits.componentId`
- ✅ Historias → `export const Implementation`, `export const Default`
- ✅ Nombres de props → `meta.argTypes` (keys)
- ✅ Tipos → `meta.argTypes[prop].control.type` + `table.type.summary`
- ✅ Defaults → `meta.args[prop]` + `meta.argTypes[prop].table.defaultValue`
- ✅ Docs → `meta.parameters.docs.description`
- ✅ Implementation (Copy/Paste) → `Implementation.parameters.docs.source.code`
- ✅ Historia Default → `export const Default`
- ✅ Otras historias → Todas las `export const` en el archivo

**Próximo paso:** Actualizar la POC para usar estas fuentes de información completas.

---

**Última actualización:** 2025-01-23  
**Estado:** ✅ Análisis Completo  
**Siguiente Paso:** 🔄 Actualizar POC con estas fuentes

