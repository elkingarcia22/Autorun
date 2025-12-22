# Guía: Configurar Storybook para Autorun

**Fecha:** 2025-01-03  
**Propósito:** Configurar Storybook de UBITS como fuente de verdad determinística para Autorun

---

## 🎯 Objetivo

Para que Autorun + Cursor puedan implementar exacto "como en Storybook" (incluyendo subcomponentes, funcionalidades y subfuncionalidades), Storybook debe convertirse en una fuente de verdad determinística que exponga:

1. **Qué existe** - Lista de componentes disponibles
2. **Cómo se usa** - Snippet copiable exacto
3. **Qué depende de qué** - Profundidad (dependsOn/internals)
4. **Qué está permitido/prohibido** - Reglas de enforcement

---

## ✅ Checklist de Configuración

### 1. Configuración Base de Storybook

- [x] ✅ Addon MCP instalado (`@storybook/addon-mcp`)
- [x] ✅ Addon MCP agregado en `.storybook/main.ts`
- [x] ✅ Decoradores globales en `.storybook/preview.ts`
- [x] ✅ Parámetros globales UBITS en `.storybook/preview.ts`

### 2. Estructura de Carpetas

- [x] ✅ `stories/components/` - Componentes aislados
- [x] ✅ `stories/recipes/` - Composiciones reales
- [x] ✅ `stories/_shared/` - Helpers compartidos

### 3. Helper de Contrato

- [x] ✅ `stories/_shared/ubitsContract.ts` - Helper para crear `parameters.ubits`

### 4. Por Componente (Checklist)

Para cada componente, debe tener:

- [ ] ✅ Story "Implementation (Copy/Paste)" con snippet exacto
- [ ] ✅ `docs.source.code` o `docs.source.transform` definido
- [ ] ✅ `args` + `argTypes` completos
- [ ] ✅ `parameters.ubits` con: componentId, api, dependsOn, internals, tokensUsed, rules
- [ ] ✅ (Complejos) Recipes para composiciones reales
- [ ] ✅ (Ideal) `data-ubits-id` en DOM para árbol real

---

## 📋 Plantilla de Story Completa

```typescript
import type { Meta, StoryObj } from '@storybook/html';
import { createUBITSContract, createExactSnippet } from '../../_shared/ubitsContract';

const meta: Meta<ComponentOptions> = {
  title: 'Categoría/Componente',
  tags: ['autodocs'],
  parameters: {
    ubits: createUBITSContract({
      componentId: '🧩-ux-componente',
      api: {
        create: 'window.UBITS.Componente.create',
        tag: '<ubits-componente>',
      },
      dependsOn: {
        required: ['🧩-ux-button'], // Componentes requeridos
        optional: ['🧩-ux-icon'], // Componentes opcionales
      },
      internals: ['⚙️-functional-scroll'], // Componentes privados
      tokensUsed: ['--ubits-accent-brand', '--ubits-spacing-md'],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'hsl(', '#'],
        requiredProps: ['variant', 'label'],
      },
    }),
  },
  args: {
    // Args explícitos (no defaults)
  },
  argTypes: {
    // ArgTypes completos
  },
};

export default meta;
type Story = StoryObj<ComponentOptions>;

// ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    variant: 'secondary',
    size: 'md',
    label: 'Guardar',
  },
  parameters: {
    docs: {
      source: {
        code: `window.UBITS.Componente.create({
  variant: 'secondary',
  size: 'md',
  label: 'Guardar'
});`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-componente');
    container.setAttribute('data-ubits-component', 'Componente');
    
    const component = createComponent(args);
    container.appendChild(component);
    
    return container;
  },
};
```

---

## 🔄 Proceso de Actualización

### Paso 1: Crear estructura de carpetas

```bash
cd vendor/ubits/packages/storybook
mkdir -p stories/components/Button
mkdir -p stories/recipes/Forms
mkdir -p stories/_shared
```

### Paso 2: Crear helper de contrato

Ya creado: `stories/_shared/ubitsContract.ts`

### Paso 3: Actualizar componente por componente

Para cada componente:

1. **Mover story a estructura nueva** (opcional, puede quedarse en `stories/`)
2. **Agregar contrato `parameters.ubits`** usando `createUBITSContract()`
3. **Crear story "Implementation (Copy/Paste)"** con snippet exacto
4. **Agregar `data-ubits-id` en render** para árbol real

### Paso 4: Crear recipes para componentes complejos

Para Modal, DataTable, Drawer, etc., crear stories de recipe:

```
stories/recipes/Forms/RegisterForm.stories.ts
stories/recipes/DataTable/WithToolbarAndLoading.stories.ts
```

---

## 📝 Ejemplo: Button (Completado)

Ver: `stories/components/Button/Button.stories.ts`

**Incluye:**
- ✅ Contrato `parameters.ubits` completo
- ✅ Story "Implementation (Copy/Paste)" con snippet exacto
- ✅ `data-ubits-id` en DOM
- ✅ Args explícitos
- ✅ ArgTypes completos

---

## 🎯 Próximos Componentes a Actualizar

1. **Modal** - Requiere dependsOn: ["🧩-ux-button"]
2. **Drawer** - Requiere dependsOn: ["🧩-ux-button"]
3. **DataTable** - Requiere dependsOn: ["🧩-ux-button", "🧩-ux-input"]
4. **Input** - Requiere dependsOn: []
5. **Accordion** - Requiere dependsOn: []

---

## ⚠️ Notas Importantes

### Snippet Exacto

**CRÍTICO:** El snippet en `docs.source.code` debe ser:
- ✅ Código exacto que funciona
- ✅ Sin placeholders o variables
- ✅ Con valores reales de ejemplo
- ✅ Formato consistente

### DependsOn vs Internals

- **dependsOn.required:** Componentes que el consumidor DEBE componer (Button, Input, etc.)
- **dependsOn.optional:** Componentes opcionales que el consumidor puede componer
- **internals:** Componentes privados que NO debes re-implementar (overlay, scrollbar, etc.)

### Tokens

**CRÍTICO:** Lista todos los tokens usados en `tokensUsed` para que Autorun pueda validar que no se usen colores hardcodeados.

---

**Última actualización:** 2025-01-03
