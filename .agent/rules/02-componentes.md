# 🎯 Reglas de Componentes UBITS

## ✅ Uso de Componentes

### Consultar Catálogo PRIMERO

**ANTES de implementar cualquier componente:**

```markdown
1. ✅ Leer: `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
2. ✅ Buscar componente por nombre
3. ✅ Obtener ID de Storybook
4. ✅ Consultar Storybook en Vercel
5. ✅ Consultar Storybook MCP
```

### Componentes Disponibles (80+)

#### Componentes Básicos:
Button, ButtonAI, ButtonGroup, Avatar, Badge, Chip, Skeleton, Spinner, StatusTag, Tag, Scrollbar

#### Componentes de Feedback:
Modal, Popover, Drawer, Toast, Alert, Tooltip, EmptyState, Mask, ButtonFeedback, Tour

#### Componentes de Formularios:
Input, Select, Checkbox, Radio, DatePicker, Calendar, FileUpload, Toggle, Switch, Slider, SearchButton, Label

#### Componentes de Datos:
DataTable, Table, List, Pagination, DataView

#### Componentes de Navegación:
Tabs, Sidebar, SubNav, TabBar, Menu, Breadcrumb, TreeMenu, SegmentControl, MenuParticipantes, ContextMenu, Dropdown

#### Componentes de Layout:
Card, SimpleCard, SelectionCard, CardContent, Accordion, Carousel, Gallery, Stepper, Timeline, HeaderSection

## ⚠️ Reglas Críticas

### 1. NO Agregar Estilos Extra

```css
/* ❌ PROHIBIDO */
.ubits-button {
  margin-top: 20px; /* NO agregar margin/padding */
  padding: 10px;     /* NO modificar estilos */
}
```

```css
/* ✅ CORRECTO */
.container {
  display: flex;
  gap: var(--spacing-md); /* Usar gap del contenedor */
}
```

### 2. Formato Correcto de Iconos

```html
<!-- ❌ INCORRECTO -->
<i class="fa-solid fa-user"></i>

<!-- ✅ CORRECTO -->
<i class="fa-solid user"></i>
```

### 3. Usar Tokens UBITS

```css
/* ✅ SIEMPRE usar tokens */
color: var(--text-primary);
background: var(--surface-secondary);
padding: var(--spacing-md);
```

## 🔗 Ver También

- Catálogo completo: `docs/referencia/CATALOGO-COMPONENTES-UBITS.md`
- Errores comunes: [04-errores.md](04-errores.md)
- Implementación: [03-implementacion.md](03-implementacion.md)
