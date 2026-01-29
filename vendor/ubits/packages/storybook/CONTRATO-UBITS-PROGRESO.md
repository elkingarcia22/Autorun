# Progreso: Contrato UBITS para Autorun

**Fecha inicio:** 2025-01-03  
**Objetivo:** Configurar todos los componentes de Storybook con contrato `parameters.ubits` completo

---

## ✅ Configuración Base Completada

- [x] Addon MCP instalado y configurado
- [x] Estructura de carpetas creada (`components/`, `recipes/`, `_shared/`)
- [x] Helper `ubitsContract.ts` creado
- [x] Parámetros globales UBITS en `preview.ts`
- [x] Plantilla de story completa creada
- [x] Button actualizado como ejemplo

---

## 📋 Componentes a Actualizar

### Básicos

- [x] **Button** ✅ - Completado (ver `stories/components/Button/Button.stories.ts`)
- [x] **Input** ✅ - Completado (ver `stories/components/Input/Input.stories.ts`)
- [x] **Checkbox** ✅ - Completado (ver `stories/components/Checkbox/Checkbox.stories.ts`)
- [x] **RadioButton** ✅ - Completado (ver `stories/components/RadioButton/RadioButton.stories.ts`)
- [x] **Select** ✅ - Cubierto por Input (tipo 'select')
- [x] **Toggle** ✅ - Completado (ver `stories/components/Toggle/Toggle.stories.ts`)
- [x] **FileUpload** ✅ - Completado (ver `stories/components/FileUpload/FileUpload.stories.ts`)
- [x] **Textarea** ✅ - Cubierto por Input (tipo 'textarea')
- [x] **Chip** ✅ - Completado (ver `stories/components/Chip/Chip.stories.ts`)
- [x] **SearchButton** ✅ - Completado (ver `stories/components/SearchButton/SearchButton.stories.ts`)

### Navegación

- [ ] **Sidebar** - Pendiente
- [ ] **TabBar** - Pendiente
- [ ] **SubNav** - Pendiente
- [ ] **Breadcrumb** - Pendiente
- [ ] **Menu** - Pendiente
- [ ] **TreeMenu** - Pendiente

### Feedback

- [x] **Modal** ✅ - Completado (ver `stories/components/Modal/Modal.stories.ts`)
- [x] **Drawer** ✅ - Completado (ver `stories/components/Drawer/Drawer.stories.ts`)
- [x] **Alert** ✅ - Completado (ver `stories/components/Alert/Alert.stories.ts`)
- [x] **Toast** ✅ - Completado (ver `stories/components/Toast/Toast.stories.ts`)
- [x] **Popover** ✅ - Completado (ver `stories/components/Popover/Popover.stories.ts`)
- [x] **Tooltip** ✅ - Completado (ver `stories/components/Tooltip/Tooltip.stories.ts`)
- [x] **EmptyState** ✅ - Completado (ver `stories/components/EmptyState/EmptyState.stories.ts`)

### Datos

- [x] **DataTable** ✅ - Completado (ver `stories/components/DataTable/DataTable.stories.ts`)
- [x] **List** ✅ - Completado (ver `stories/components/List/List.stories.ts`)
- [ ] **Card** - No existe como componente base (hay cards especializados)
- [x] **Badge** ✅ - Completado (ver `stories/components/Badge/Badge.stories.ts`)
- [x] **Chip** ✅ - Completado (ver `stories/components/Chip/Chip.stories.ts`)
- [x] **Avatar** ✅ - Completado (ver `stories/components/Avatar/Avatar.stories.ts`)
- [x] **Progress** ✅ - Completado (ver `stories/components/Progress/Progress.stories.ts`)
- [x] **StatusTag** ✅ - Completado (ver `stories/components/StatusTag/StatusTag.stories.ts`)
- [x] **Pagination** ✅ - Completado (ver `stories/components/Pagination/Pagination.stories.ts`)

### Layout

- [x] **Accordion** ✅ - Completado (ver `stories/components/Accordion/Accordion.stories.ts`)
- [ ] **Tabs** - Pendiente
- [ ] **Stepper** - Pendiente
- [ ] **SegmentControl** - Pendiente

### Otros

- [ ] **Calendar** - Pendiente
- [ ] **Carousel** - Pendiente
- [ ] **Gallery** - Pendiente
- [ ] **Pagination** - Pendiente
- [ ] **Slider** - Pendiente
- [ ] **ProgressBar** - Pendiente
- [ ] **Spinner** - Pendiente
- [ ] **Skeleton** - Pendiente

---

## 📝 Plantilla para Actualizar Componentes

### Paso 1: Identificar dependencias

```typescript
// ¿Qué componentes usa este componente?
dependsOn: {
  required: ["🧩-ux-button"], // Componentes que el consumidor DEBE componer
  optional: ["🧩-ux-icon"], // Componentes opcionales
}
internals: ["⚙️-functional-scroll"] // Componentes privados
```

### Paso 2: Identificar tokens usados

```typescript
tokensUsed: [
  '--ubits-accent-brand',
  '--ubits-spacing-md',
  // ... todos los tokens CSS usados
]
```

### Paso 3: Crear story "Implementation (Copy/Paste)"

```typescript
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    // Args explícitos (no defaults)
  },
  parameters: {
    docs: {
      source: {
        code: `window.UBITS.Componente.create({
  // Snippet exacto
});`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-componente');
    // ...
  },
};
```

---

## 🎯 Prioridad de Actualización

### Alta Prioridad (Componentes más usados)

1. **Modal** - Usado frecuentemente, requiere Button
2. **Drawer** - Usado frecuentemente, requiere Button
3. **Input** - Base para formularios
4. **DataTable** - Componente complejo, requiere múltiples dependencias
5. **Accordion** - Usado en listas y FAQs

### Media Prioridad

6. **Select** - Base para formularios
7. **Checkbox** - Base para formularios
8. **RadioButton** - Base para formularios
9. **Alert** - Feedback común
10. **Toast** - Feedback común

### Baja Prioridad

- Resto de componentes

---

## 📚 Recursos

- **Plantilla completa:** Ver `stories/components/Button/Button.stories.ts`
- **Helper de contrato:** `stories/_shared/ubitsContract.ts`
- **Guía completa:** `docs/guias/implementacion/GUIA-CONFIGURAR-STORYBOOK-PARA-AUTORUN.md`

---

**Última actualización:** 2025-01-03
